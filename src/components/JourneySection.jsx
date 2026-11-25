import React from 'react';
import { motion } from 'framer-motion';
import { FaLanguage, FaGraduationCap, FaTrophy, FaUniversity, FaBriefcase } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import RadialOrbitalTimeline from './RadialOrbitalTimeline';

// Language-independent metadata, matched to translations.journey.items by index.
const itemMeta = [
  { icon: FaLanguage, status: 'completed' },
  { icon: FaGraduationCap, status: 'completed' },
  { icon: FaTrophy, status: 'completed' },
  { icon: FaUniversity, status: 'in-progress' },
  { icon: FaBriefcase, status: 'in-progress' },
];

const JourneySection = () => {
  const { t } = useLanguage();

  const items = t.journey.items.map((exp, index) => ({
    id: index + 1,
    title: exp.title,
    date: exp.date,
    location: exp.location,
    content: exp.description,
    highlight: Boolean(exp.highlight),
    icon: itemMeta[index]?.icon ?? FaBriefcase,
    status: itemMeta[index]?.status ?? 'completed',
    // connected to the previous and next milestone
    relatedIds: [index, index + 2].filter((id) => id >= 1 && id <= t.journey.items.length),
  }));

  const labels = {
    completed: t.journey.status.completed,
    inProgress: t.journey.status.inProgress,
    related: t.journey.related,
  };

  return (
    <section id="journey" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="section-index">{t.journey.index}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper">{t.journey.title}</h2>
          <p className="mt-3 font-mono text-xs text-muted">{t.journey.hint}</p>
        </motion.div>

        <RadialOrbitalTimeline items={items} labels={labels} />
      </div>
    </section>
  );
};

export default JourneySection;
