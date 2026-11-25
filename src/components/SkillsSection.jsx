import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaThLarge, FaStream } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { skillsData } from '../data/skills';
import TechMarquee from './TechMarquee';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SkillsSection = () => {
  const { t } = useLanguage();
  const [staticView, setStaticView] = useState(false);

  return (
    <section id="habilidades" className="py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-wrap items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="section-index">{t.skills.index}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper">
              {t.skills.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setStaticView((v) => !v)}
            className="inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wide text-paper hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {staticView ? <FaStream aria-hidden="true" /> : <FaThLarge aria-hidden="true" />}
            {staticView ? t.skills.showMotion : t.skills.showGrid}
          </button>
        </motion.div>
      </div>

      {staticView ? (
        <div className="max-w-5xl mx-auto px-6 md:px-16">
          <motion.div
            key="grid"
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-px bg-line border border-line"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((skill) => (
              <motion.div
                key={skill.name}
                className="group bg-ink flex flex-col items-center justify-center gap-3 aspect-square p-4 hover:bg-surface transition-colors cursor-default"
                variants={cardVariants}
              >
                <div className="w-8 h-8 flex items-center justify-center text-muted group-hover:text-accent transition-colors">
                  {React.cloneElement(skill.icon, { className: 'w-full h-full' })}
                </div>
                <span className="text-paper font-mono text-[10px] uppercase tracking-wide text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <>
          {/* full-bleed marquee; the icons are decorative, so list the names for screen readers */}
          <TechMarquee />
          <ul className="sr-only">
            {skillsData.map((skill) => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default SkillsSection;
