import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion, animate } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

// Words that get the accent colour once the text "lights up".
const KEYWORDS = new Set([
  'java', 'spring', 'boot', 'react', 'node.js', 'sql', 'mysql', 'git', 'scrum',
  'c#', 'mudblazor', 'prolec', 'hackathon', 'tech+saúde', 'full-stack', 'restful', 'saas',
]);

const isKeyword = (word) => KEYWORDS.has(word.toLowerCase().replace(/^[^\p{L}\p{N}#+]+|[^\p{L}\p{N}#+]+$/gu, ''));

// One word: fades from dim to full as the scroll progress crosses its slice of the text.
const Word = ({ children, progress, range, highlight }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={highlight ? 'text-accent' : 'text-paper'}>
      {children}
    </motion.span>
  );
};

const StaticWord = ({ children, highlight }) => (
  <span className={highlight ? 'text-accent' : 'text-paper'}>{children}</span>
);

const Stat = ({ stat, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const numRef = useRef(null);
  const isNumber = typeof stat.value === 'number';

  useEffect(() => {
    if (!isNumber || !numRef.current) return undefined;
    if (!inView || reduced) {
      numRef.current.textContent = inView || reduced ? String(stat.value) : '0';
      return undefined;
    }
    const controls = animate(0, stat.value, {
      duration: 1.4,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduced, isNumber, stat.value, delay]);

  return (
    <div ref={ref} className="bg-ink p-6 text-left">
      <p className="font-extrabold text-3xl md:text-4xl text-accent leading-none whitespace-nowrap">
        {isNumber ? (
          <>
            <span ref={numRef}>0</span>
            {stat.suffix}
          </>
        ) : (
          stat.text
        )}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-muted leading-snug">{stat.label}</p>
    </div>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const textRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.85', 'end 0.55'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const paragraphs = [t.about.p1, t.about.p2, t.about.p3].map((p) => p.split(/\s+/));
  const total = paragraphs.reduce((sum, words) => sum + words.length, 0);
  let cursor = 0;

  return (
    <section id="sobre" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="section-index">{t.about.index}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper mb-10">
            {t.about.title}
          </h2>
        </motion.div>

        <div ref={textRef} className="relative border-l border-line pl-6 md:pl-10">
          {/* accent line that fills as you read */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute -left-px top-0 h-full w-px bg-accent origin-top"
              style={{ scaleY: lineScale }}
            />
          )}

          <div className="text-base md:text-lg leading-relaxed space-y-6">
            {paragraphs.map((words, pi) => (
              <p key={pi}>
                {words.map((word, wi) => {
                  const start = cursor / total;
                  cursor += 1;
                  const end = cursor / total;
                  // each word lights up over a window slightly wider than its own slice
                  const range = [Math.max(0, start - 0.04), Math.min(1, end + 0.02)];
                  const highlight = isKeyword(word);
                  return (
                    <React.Fragment key={wi}>
                      {reduced ? (
                        <StaticWord highlight={highlight}>{word}</StaticWord>
                      ) : (
                        <Word progress={scrollYProgress} range={range} highlight={highlight}>
                          {word}
                        </Word>
                      )}{' '}
                    </React.Fragment>
                  );
                })}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {t.about.stats.map((stat, i) => (
            <Stat key={stat.label} stat={stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
