import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import { dayKeyUTC, generateCase, isCorrectCase, ROOMS, SUSPECTS } from '../../shared/puzzle';
import type { Context } from 'hono';
import type { ErrorResponse } from '../../shared/api';

export const api = new Hono();

const DAY_MS = 24 * 60 * 60 * 1000;

const yesterdayKeyUTC = (): string => dayKeyUTC(new Date(Date.now() - DAY_MS));

const readStreak = async (username: string): Promise<number> => {
  const [streakRaw, lastDayRaw] = await Promise.all([
    redis.get(`streak:${username}`),
    redis.get(`lastday:${username}`),
  ]);
  const streak = streakRaw ? parseInt(streakRaw, 10) : 0;
  return lastDayRaw === yesterdayKeyUTC() ? streak : 0;
};

const error = (c: Context, message: string): Response =>
  c.json<ErrorResponse>({ status: 'error', message }, 400);

const handleInit = async (c: Context): Promise<Response> => {
  const { postId } = context;
  if (!postId) return error(c, 'postId is required');
  try {
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    const day = dayKeyUTC();
    const puzzle = generateCase(day);
    const [solvedRaw, streak] = await Promise.all([
      redis.get(`solved:${username}:${day}`),
      readStreak(username),
    ]);
    return c.json({
      type: 'init',
      day,
      username,
      streak,
      solvedToday: solvedRaw === '1',
      startedAt: Date.now(),
      suspects: SUSPECTS,
      rooms: ROOMS,
      clues: puzzle.clues,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return error(c, `init failed: ${message}`);
  }
};

const handleSubmit = async (c: Context): Promise<Response> => {
  const { postId } = context;
  if (!postId) return error(c, 'postId is required');
  const body = await c.req.json<{ suspect?: number; room?: number; elapsedSeconds?: number }>();
  const day = dayKeyUTC();
  const puzzle = generateCase(day);
  const suspect = typeof body.suspect === 'number' ? body.suspect : -1;
  const room = typeof body.room === 'number' ? body.room : -1;
  const won = isCorrectCase(puzzle, suspect, room);
  const elapsedMs = typeof body.elapsedSeconds === 'number' ? body.elapsedSeconds * 1000 : 0;
  let streak = 0;
  if (won) {
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    streak = (await readStreak(username)) + 1;
    await Promise.all([
      redis.set(`streak:${username}`, String(streak)),
      redis.set(`lastday:${username}`, day),
      redis.set(`solved:${username}:${day}`, '1'),
    ]);
  }
  return c.json({ type: 'submit', won, streak, elapsedMs, culprit: puzzle.culprit, room: puzzle.room });
};

api.get('/init', handleInit);
api.post('/submit', handleSubmit);
