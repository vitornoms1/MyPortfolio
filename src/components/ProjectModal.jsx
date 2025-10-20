import React from 'react';
import { motion } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#1a1a2e] text-white rounded-xl w-full max-w-3xl flex flex-col md:flex-row gap-8 p-8 relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
        
        <img 
          src={project.image} 
          alt={`${project.title} screenshot`}
          className="w-full md:w-1/2 h-auto max-h-80 object-contain rounded-lg self-center" 
        />
        
        <div className="flex flex-col flex-1">
          <h3 className="text-3xl font-bold text-purple-400 mb-4">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => ( <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span> ))}
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto py-2 px-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold self-start hover:scale-105 transition-transform">
            Access Website
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;