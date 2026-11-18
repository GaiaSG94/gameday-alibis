import assert from 'node:assert/strict';
import { test } from 'node:test';

import { clueText, dailySeed, generateCase, isCorrectCase, ROOMS } from './puzzle.ts';

test('seed deterministe', () => {
  assert.equal(dailySeed('2026-12-01'), dailySeed('2026-12-01'));
});

test("l'affaire du jour est deterministe", () => {
  const a = generateCase('2026-12-01');
  const b = generateCase('2026-12-01');
  assert.deepEqual(a.clues, b.clues);
  assert.equal(a.culprit, b.culprit);
  assert.equal(a.room, b.room);
});

test('une seule preuve est fausse : celle qui nomme la scene', () => {
  for (const day of ['2026-12-01', '2026-12-04', '2026-12-09']) {
    const puzzle = generateCase(day);
    const broken = puzzle.clues.filter((c) => c.kind === 'seen' && c.broken);
    assert.equal(broken.length, 1, day);
    assert.equal(broken[0]?.kind === 'seen' ? broken[0].room : -1, puzzle.room, day);
    assert.equal(puzzle.clues.filter((c) => c.kind === 'scene').length, 1, day);
  }
});

test('les autres suspects occupent des pieces distinctes hors scene', () => {
  const puzzle = generateCase('2026-12-02');
  const rooms = puzzle.clues
    .filter((c) => c.kind === 'seen' && !c.broken)
    .map((c) => (c.kind === 'seen' ? c.room : -1));
  assert.equal(new Set(rooms).size, rooms.length);
  assert.ok(rooms.every((r) => r !== puzzle.room));
  assert.equal(ROOMS.length, 4);
});

test('la bonne accusation est acceptee', () => {
  const puzzle = generateCase('2026-12-03');
  assert.ok(isCorrectCase(puzzle, puzzle.culprit, puzzle.room));
  assert.ok(!isCorrectCase(puzzle, (puzzle.culprit + 1) % 4, puzzle.room));
});

test('les preuves sont lisibles', () => {
  const puzzle = generateCase('2026-12-05');
  const clue = puzzle.clues[0];
  if (!clue) return;
  assert.match(clueText(clue), /scene|was seen in the/);
});
