import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import profileImage from '../assets/images/vitor.jpeg';
import { useLanguage } from '../i18n/LanguageContext';

const HeroSection = ({ introDone }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-14 md:gap-10">

        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="section-index">{t.hero.index}</span>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.05] text-paper">
            Vitor Noms Kuhn
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] text-muted uppercase tracking-wide">
            {['JavaScript', 'React', 'Node.js', 'Java', 'Spring Boot', 'C#'].map((tag) => (
              <span key={tag} className="px-2.5 py-1 border border-line rounded-sm">{tag}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/vitornoms1"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 bg-accent text-ink font-mono text-sm font-semibold uppercase tracking-wide hover:bg-paper transition-colors"
            >
              {t.hero.github}
            </a>
            <a
              href="https://www.linkedin.com/in/vitornoms-dev/"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 border border-line text-paper font-mono text-sm font-semibold uppercase tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              {t.hero.linkedin}
            </a>
            <a
              href="/Vitor-Noms-Kuhn-CV.pdf"
              download
              className="flex items-center gap-2 py-3 px-6 border border-line text-paper font-mono text-sm font-semibold uppercase tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              <FaDownload className="text-xs" /> {t.hero.resume}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={introDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="absolute -top-3 -left-3 w-full h-full border border-accent/60" />
          <img
            src={profileImage}
            alt="Vitor Noms"
            className="relative w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
