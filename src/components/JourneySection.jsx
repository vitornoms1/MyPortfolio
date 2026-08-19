import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const JourneySection = () => {
  const { t } = useLanguage();
  const experiences = t.journey.items;

  return (
    <section id="journey" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-index">{t.journey.index}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper">{t.journey.title}</h2>
        </motion.div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-8 py-7 border-t border-line first:border-t-0"
            >
              <span className="font-mono text-xs md:text-sm text-muted pt-1">{exp.date}</span>

              <div>
                <div className="flex items-center gap-3">
                  {exp.highlight && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  <h3 className="text-lg md:text-xl font-bold text-paper">{exp.title}</h3>
                </div>
                <p className="text-accent/80 font-mono text-xs mt-1 mb-3">{exp.location}</p>
                <p className="text-muted text-sm leading-relaxed max-w-2xl">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
