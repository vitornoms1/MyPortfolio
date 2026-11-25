import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

// ---- Timeline (seconds) -----------------------------------------------------
const ROWS_DURATION = 2.5; // tilted letter rows slide sideways, then fly off
const REEL_START = 2.1; // giant PORTFOLIO letters start scrambling in (while the rows are leaving)
const LINES_START = 2.8; // top/bottom rules + stamp draw themselves
const PROMPT_AT = 3.4; // "click to enter" button appears and gets focus

const LETTERS = 'ABCDEFGHIJKLMNOPRSTUVWXYZ';

// Small seeded PRNG so the rows look random but are identical on every render.
const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const rand = mulberry32(2024);

// Rows of random letters; three looks cycle: solid lime, outlined paper, outlined lime.
const ROWS = Array.from({ length: 15 }, (_, i) => ({
  text: Array.from({ length: 70 }, () => LETTERS[Math.floor(rand() * LETTERS.length)]).join(''),
  variant: i % 3,
  dir: i % 2 === 0 ? 1 : -1,
  delay: i * 0.03,
}));

const ROW_STYLES = [
  { color: '#D7FF3D' },
  { color: 'transparent', WebkitTextStroke: '1.5px #F5F5F0' },
  { color: 'transparent', WebkitTextStroke: '1.5px #D7FF3D' },
];

/** Tilted rows of letters sliding in opposite directions, then flying off to reveal the poster. */
const LetterRows = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
    <div className="flex w-full flex-col text-[10vh] font-extrabold leading-[0.95]" style={{ transform: 'rotate(-11deg) scale(1.55)' }}>
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center">
          <motion.div
            className="w-max whitespace-nowrap tracking-tight will-change-transform"
            style={ROW_STYLES[row.variant]}
            initial={{ x: `${-row.dir * 8}%`, opacity: 0 }}
            animate={{
              x: [`${-row.dir * 8}%`, `${row.dir * 10}%`, `${row.dir * 70}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: ROWS_DURATION,
              delay: row.delay,
              times: [0, 0.72, 1],
              ease: ['linear', 'easeIn'],
              opacity: { duration: ROWS_DURATION, delay: row.delay, times: [0, 0.12, 0.8, 1] },
            }}
          >
            {row.text}
          </motion.div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * One poster letter. It flickers through random letters very quickly, then snaps back to the real one.
 * Hovering it replays the flicker.
 */
const ScrambleChar = ({ ch, delay, reduced }) => {
  const [shown, setShown] = useState(reduced ? ch : '');
  const timers = useRef([]);
  // hovering only replays the flicker once the letter has finished its own entrance,
  // otherwise moving the mouse over the screen would reveal letters before their turn
  const settled = useRef(reduced);

  const clear = () => {
    timers.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timers.current = [];
  };

  const scramble = useCallback(
    (startAfter = 0, duration = 650) => {
      clear();
      if (reduced) {
        setShown(ch);
        return;
      }
      const start = setTimeout(() => {
        const tick = setInterval(() => setShown(LETTERS[Math.floor(Math.random() * LETTERS.length)]), 55);
        const stop = setTimeout(() => {
          clearInterval(tick);
          setShown(ch);
          settled.current = true;
        }, duration);
        timers.current.push(tick, stop);
      }, startAfter * 1000);
      timers.current.push(start);
    },
    [ch, reduced]
  );

  useEffect(() => {
    scramble(delay);
    return clear;
  }, [scramble, delay]);

  return (
    <span
      className="relative inline-block h-[1em] cursor-default select-none leading-none"
      onPointerEnter={() => settled.current && scramble(0, 450)}
    >
      <span className="invisible block leading-none">{ch}</span>
      <span className="absolute inset-0 flex items-center justify-center leading-none">{shown}</span>
    </span>
  );
};

const Rule = ({ left, right, delay, reduced, hideRightOnMobile = false }) => (
  <div className="flex items-center gap-3 font-mono text-[10px] md:text-sm font-bold uppercase tracking-[0.18em] text-accent">
    <span className="whitespace-nowrap">{left}</span>
    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
    <motion.span
      aria-hidden="true"
      className="h-px flex-1 origin-left bg-accent"
      initial={reduced ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay, duration: 0.9, ease: 'easeInOut' }}
    />
    <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full bg-accent ${hideRightOnMobile ? 'hidden md:block' : ''}`} />
    <span className={`whitespace-nowrap ${hideRightOnMobile ? 'hidden md:inline' : ''}`}>{right}</span>
  </div>
);

const IntroAnimation = ({ onFinish }) => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const intro = t.intro;

  const [visible, setVisible] = useState(true);
  const [promptReady, setPromptReady] = useState(false);
  const [rowsGone, setRowsGone] = useState(false);

  const finished = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;
  const enterBtn = useRef(null);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setVisible(false);
    onFinishRef.current?.();
  }, []);

  // show the "click to enter" button (and focus it so Enter works); drop the rows once they've left
  useEffect(() => {
    const ready = setTimeout(() => {
      setPromptReady(true);
      enterBtn.current?.focus({ preventScroll: true });
    }, (reduced ? 0.3 : PROMPT_AT) * 1000);
    const rows = setTimeout(() => setRowsGone(true), (ROWS_DURATION + 0.6) * 1000);
    return () => {
      clearTimeout(ready);
      clearTimeout(rows);
    };
  }, [reduced]);

  // keyboard: Enter or Esc continues
  useEffect(() => {
    const onKey = (e) => (e.key === 'Escape' || e.key === 'Enter') && finish();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  const [leftWord, rightWord] = intro.poster;
  const letterClass = 'inline-flex text-accent font-extrabold leading-none tracking-tighter';
  const year = new Date().getFullYear();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink cursor-pointer"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          role="dialog"
          aria-modal="true"
          aria-label={`Vitor Noms Kuhn — ${intro.rolesLeft}`}
          onClick={finish}
        >
          {/* 1. tilted letter rows sliding sideways, then flying off */}
          {!reduced && !rowsGone && <LetterRows />}

          <div className="relative flex h-full w-full max-w-[1400px] flex-col px-5 md:px-12 py-6 md:py-8">
            <h1 className="sr-only">Vitor Noms Kuhn</h1>

            <Rule left="Vitor Noms Kuhn" right={String(year)} delay={LINES_START} reduced={reduced} />

            {/* 2. giant poster word: every letter scrambles quickly, then settles */}
            <div className="relative my-3 md:my-5 flex flex-1 items-center justify-center overflow-hidden">
              <div
                aria-hidden="true"
                className="flex flex-col md:flex-row items-center justify-center text-[min(24vw,17vh)] md:text-[min(14vw,30vh)]"
              >
                <span className={letterClass}>
                  {leftWord.split('').map((ch, i) => (
                    <ScrambleChar key={`l${i}${ch}`} ch={ch} delay={REEL_START + i * 0.07} reduced={reduced} />
                  ))}
                </span>
                <span className={letterClass}>
                  {rightWord.split('').map((ch, i) => (
                    <ScrambleChar key={`r${i}${ch}`} ch={ch} delay={REEL_START + (i + leftWord.length) * 0.07} reduced={reduced} />
                  ))}
                </span>
              </div>
            </div>

            <Rule left={intro.rolesLeft} right={intro.rolesRight} delay={LINES_START + 0.15} reduced={reduced} hideRightOnMobile />

            {/* footer: the enter button */}
            <div className="mt-5 md:mt-6 flex flex-col items-center">
              <motion.button
                ref={enterBtn}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  finish();
                }}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={promptReady ? { opacity: 1, y: 0 } : { opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-paper hover:border-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
              >
                {intro.enter}
                <motion.span aria-hidden="true" animate={reduced ? undefined : { x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
