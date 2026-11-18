import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#fdf6e3] px-6 text-center text-[#2f2a20]">
      <div className="text-3xl">🕵️</div>
      <h1 className="text-3xl font-black tracking-[0.3em] text-[#8c2f39]">ALIBIS</h1>
      <p className="max-w-[240px] text-[13px] leading-snug text-[#a2947a]">
        Four suspects, one locked room, one false report. Hi {context.username ?? 'detective'}.
      </p>
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="mt-2 rounded-full bg-[#8c2f39] px-8 py-2.5 text-sm font-black uppercase tracking-widest text-white transition-transform active:scale-[0.98]"
      >
        Open the file
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
