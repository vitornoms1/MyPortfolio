import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

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

          <div className="text-muted text-base md:text-lg leading-relaxed space-y-6 border-l border-line pl-6 md:pl-10">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
