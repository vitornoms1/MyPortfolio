import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const ProjectModal = ({ project, onClose }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-surface border border-line text-paper w-full max-w-3xl flex flex-col md:flex-row gap-8 p-8 relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-accent text-2xl leading-none">&times;</button>

        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full md:w-1/2 h-auto max-h-80 object-contain self-center border border-line"
        />

        <div className="flex flex-col flex-1">
          <h3 className="text-2xl font-bold text-paper mb-4">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4 font-mono text-[11px] uppercase tracking-wide">
            {project.tags.map(tag => ( <span key={tag} className="border border-line text-muted px-2.5 py-1">{tag}</span> ))}
          </div>
          <p className="text-muted leading-relaxed mb-6 text-sm">{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto py-2.5 px-6 bg-accent text-ink font-mono text-sm font-semibold uppercase tracking-wide self-start hover:bg-paper transition-colors">
            {t.projects.viewCode}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
