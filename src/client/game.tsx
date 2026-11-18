import './index.css';

import { useCallback, useEffect, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { clueText } from '../shared/puzzle';
import type { Clue } from '../shared/puzzle';

type Suspect = { name: string; role: string };

type Init = {
  day: string;
  username: string;
  streak: number;
  solvedToday: boolean;
  startedAt: number;
  suspects: Suspect[];
  rooms: string[];
  clues: Clue[];
};

type Result = { won: boolean; streak: number; elapsedMs: number; culprit: number; room: number };

const App = () => {
  const [init, setInit] = useState<Init | null>(null);
  const [suspect, setSuspect] = useState<number | null>(null);
  const [room, setRoom] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/init');
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setInit(data);
      setSuspect(null);
      setRoom(null);
      setResult(null);
      setSeconds(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const send = async () => {
    if (suspect === null || room === null) return;
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suspect, room, elapsedSeconds: seconds }),
      });
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'submit failed');
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf6e3] text-[#2f2a20]">
        <p>{error}</p>
      </div>
    );
  }
  if (!init) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf6e3] text-[#a2947a]">
        <p className="animate-pulse">Opening the case file…</p>
      </div>
    );
  }

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-[#fdf6e3] px-4 py-6 text-[#2f2a20]">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-black tracking-[0.3em] text-[#8c2f39]">ALIBIS</h1>
        <div className="text-sm font-semibold text-[#a2947a]">
          <span className="mr-3">{clock}</span>
          <span>🔥 {result ? result.streak : init.streak}</span>
        </div>
      </header>
      <p className="max-w-md text-center text-[13px] leading-snug text-[#a2947a]">
        One room was locked from the inside. One report is false. Name the culprit and the
        room.
      </p>
      <ul className="w-full max-w-md space-y-1.5">
        {init.clues.map((clue, i) => (
          <li
            key={i}
            className="rounded-lg border-2 border-[#e6dcc2] bg-white px-3 py-2 text-[13px]"
          >
            {clueText(clue)}
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md">
        <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-[#a2947a]">culprit</p>
        <div className="flex flex-wrap gap-2">
          {init.suspects.map((person, i) => (
            <button
              key={person.name}
              onClick={() => setSuspect(i)}
              className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold ${
                suspect === i
                  ? 'border-[#8c2f39] bg-[#8c2f39] text-white'
                  : 'border-[#e6dcc2] bg-white text-[#2f2a20]'
              }`}
            >
              {person.name} · {person.role}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md">
        <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-[#a2947a]">room</p>
        <div className="flex flex-wrap gap-2">
          {init.rooms.map((name, i) => (
            <button
              key={name}
              onClick={() => setRoom(i)}
              className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold capitalize ${
                room === i
                  ? 'border-[#8c2f39] bg-[#8c2f39] text-white'
                  : 'border-[#e6dcc2] bg-white text-[#2f2a20]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {!result ? (
        <button
          onClick={() => void send()}
          disabled={suspect === null || room === null}
          className="w-full max-w-md rounded-full bg-[#8c2f39] py-3 text-base font-black uppercase tracking-widest text-white transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          Close the case
        </button>
      ) : (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border-2 border-[#e6dcc2] bg-white p-5 text-center">
          <p className="text-2xl font-black tracking-widest">
            {result.won ? 'CASE CLOSED' : 'CASE UNSOLVED'}
          </p>
          <p className="text-sm text-[#a2947a]">
            {result.won
              ? `Solved in ${clock} — streak 🔥 ${result.streak}. A new file tomorrow.`
              : `It was ${init.suspects[result.culprit]?.name ?? '?'} in the ${init.rooms[result.room] ?? '?'}.`}
          </p>
          <button
            onClick={() => setResult(null)}
            className="rounded-full border-2 border-[#8c2f39] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#8c2f39]"
          >
            Back to the file
          </button>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
