import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { useLanguage } from '../i18n/LanguageContext';

import financeImg from '../assets/images/finance.png';
import animeDexImg from '../assets/images/animedex.png';
import alecrimImg from '../assets/images/alecrim.png';
import barbearia from '../assets/images/barbearia.png';
// Imagem do novo projeto Java
import javaProjectImg from '../assets/images/javaproject.png';

import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaDatabase, FaJava, FaGithub } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';
import TailwindIcon from '../assets/icons/tailwind.svg?react';
import FramerIcon from '../assets/icons/framer.svg?react';

const techIconMap = {
  'React': <FaReact />,
  'TailwindCSS': <TailwindIcon className="w-6 h-6" />,
  'Framer Motion': <FramerIcon className="w-5 h-5" />,
  'JavaScript': <FaJsSquare />,
  'HTML': <FaHtml5 />,
  'CSS': <FaCss3Alt />,
  'API': <FaDatabase />,
  'Java': <FaJava />,
  'Spring Boot': <SiSpringboot className="w-5 h-5" />
};

// Static, language-independent data (images, links, tags). Titles/summary/description
// come from translations so the language toggle can switch them.
const projectsData = [
    {
        id: "JavaERP",
        title: "Inventory ERP (Backend)",
        image: javaProjectImg,
        link: "https://github.com/vitornoms1/mini-erp-java",
        tags: ['Java', 'Spring Boot', 'API']
    },
    {
        id: "FinanceManager",
        title: "Finance Manager (Full Stack)",
        image: financeImg,
        link: "https://github.com/vitornoms1/FinanceManager",
        tags: ['React', 'TailwindCSS', 'API', 'JavaScript']
    },
    {
        id: "Alecrim",
        title: "Alecrim Casa de Festas",
        image: alecrimImg,
        link: "https://github.com/vitornoms1/alecrim",
        tags: ['React', 'TailwindCSS', 'JavaScript']
    },
    {
        id: "BarbeariaGustavo",
        title: "Barbearia do Gustavo",
        image: barbearia,
        link: "https://github.com/vitornoms1/GustavoBarber.git",
        tags: ['React', 'TailwindCSS', 'Framer Motion', 'JavaScript']
    },
    {
        id: "AnimeDex",
        title: "AnimeDex",
        image: animeDexImg,
        link: "https://github.com/vitornoms1/animedex-project",
        tags: ['JavaScript', 'HTML', 'CSS']
    },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const ProjectImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-52 overflow-hidden bg-surface">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-line/40" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-52 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03] ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const ProjectsSection = () => {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(null);

    const mergedProjects = projectsData.map((project) => ({
        ...project,
        summary: t.projects.items[project.id]?.summary,
        description: t.projects.items[project.id]?.description,
    }));

    return (
        <>
            <section id="projetos" className="py-24 px-6 md:px-16 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mb-14"
                    >
                        <span className="section-index">{t.projects.index}</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper mb-3">
                            {t.projects.title}
                        </h2>
                        <p className="text-muted max-w-lg">{t.projects.subtitle(mergedProjects.length)}</p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-px bg-line border border-line"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {mergedProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="group bg-ink overflow-hidden cursor-pointer transition-colors flex-1 min-w-[280px] basis-full md:basis-[calc(50%-1px)] lg:basis-[calc(33.333%-1px)]"
                                onClick={() => setSelectedProject(project)}
                                variants={cardVariants}
                            >
                                <div className="overflow-hidden relative">
                                    <ProjectImage src={project.image} alt={`${project.title} screenshot`} />
                                    <span className="absolute top-3 left-3 font-mono text-[10px] text-ink bg-accent px-2 py-0.5">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Open on GitHub"
                                        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-ink/70 backdrop-blur-sm text-paper hover:text-accent hover:bg-ink transition-colors"
                                    >
                                        <FaGithub className="text-sm" />
                                    </a>
                                </div>
                                <div className="p-6 text-left">
                                    <h3 className="text-lg font-bold text-paper mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                                    <div className="flex items-center gap-3 mb-4 text-muted text-lg">
                                        {project.tags.map(tag => (
                                            <div key={tag} title={tag}>
                                                {techIconMap[tag] || tag}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-muted text-sm leading-relaxed h-16">{project.summary}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </>
    );
};

export default ProjectsSection;
