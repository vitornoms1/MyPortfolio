import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DRAW_DURATION = 1.4;

const IntroAnimation = ({ onFinish }) => {
  const [phase, setPhase] = useState('draw'); // draw -> fill -> exit -> done
  const [visible, setVisible] = useState(true);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fill'), 1900);
    const t2 = setTimeout(() => setPhase('exit'), 2700);
    const t3 = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: phase === 'exit' ? -40 : 0, opacity: phase === 'exit' ? 0 : 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-5"
          >
            <div className="relative inline-block">
              {/* Faint full signature underneath, so the reveal has something to "arrive" on */}
              <span
                ref={textRef}
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
                className="text-7xl md:text-9xl text-paper/10 select-none"
              >
                Vitor
              </span>

              {/* Revealed signature, wiped in left-to-right like it's being written */}
              <motion.span
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
                className="absolute inset-0 text-7xl md:text-9xl text-accent select-none"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 -15% 0 0)' }}
                transition={{ duration: DRAW_DURATION, ease: [0.65, 0, 0.35, 1] }}
              >
                Vitor
              </motion.span>

              {/* Pen tip riding the reveal edge */}
              {textWidth > 0 && (
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(215,255,61,0.6)]"
                  initial={{ left: 0, opacity: 1 }}
                  animate={{ left: textWidth, opacity: 0 }}
                  transition={{
                    left: { duration: DRAW_DURATION, ease: [0.65, 0, 0.35, 1] },
                    opacity: { duration: 0.3, delay: DRAW_DURATION - 0.05 },
                  }}
                />
              )}
            </div>

            <motion.p
              className="font-mono text-xs tracking-[0.3em] text-muted uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase !== 'draw' ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              Vitor Noms Kuhn — Dev
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
