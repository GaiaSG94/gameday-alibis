export const SUSPECTS = [
  { name: 'Iris', role: 'librarian' },
  { name: 'Otto', role: 'night guard' },
  { name: 'Nadia', role: 'chef' },
  { name: 'Pavel', role: 'courier' },
];

export const ROOMS = ['archive', 'kitchen', 'loading bay', 'rooftop'];

export type Clue =
  | { kind: 'scene'; room: number }
  | { kind: 'seen'; suspect: number; room: number; broken: boolean };

export type CasePuzzle = {
  day: string;
  clues: Clue[];
  culprit: number;
  room: number;
};

export const dayKeyUTC = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

export const dailySeed = (day: string): number => {
  let hash = 2166136261;
  const input = 'alibis:' + day;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const clueText = (clue: Clue): string => {
  if (clue.kind === 'scene') {
    return `The scene was the ${ROOMS[clue.room] ?? 'unknown room'}, locked from the inside.`;
  }
  const who = SUSPECTS[clue.suspect]?.name ?? 'someone';
  const room = ROOMS[clue.room] ?? 'somewhere';
  return `${who} was seen in the ${room}.`;
};

export const generateCase = (day: string): CasePuzzle => {
  const rand = mulberry32(dailySeed(day));
  const culprit = Math.floor(rand() * SUSPECTS.length);
  const room = Math.floor(rand() * ROOMS.length);
  const otherRooms = ROOMS.map((_, i) => i).filter((i) => i !== room);
  const innocents = SUSPECTS.map((_, i) => i).filter((i) => i !== culprit);
  const clues: Clue[] = [{ kind: 'scene', room }];
  clues.push({ kind: 'seen', suspect: culprit, room, broken: true });
  innocents.forEach((suspect, index) => {
    const target = otherRooms[index % otherRooms.length] ?? 0;
    clues.push({ kind: 'seen', suspect, room: target, broken: false });
  });
  const shuffled = [...clues].sort(() => rand() - 0.5);
  return { day, clues: shuffled, culprit, room };
};

export const isCorrectCase = (puzzle: CasePuzzle, suspect: number, room: number): boolean =>
  suspect === puzzle.culprit && room === puzzle.room;
