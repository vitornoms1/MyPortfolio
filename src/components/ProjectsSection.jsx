import React from 'react';
import { motion } from 'framer-motion';
import ProjectFlipCard from './ProjectFlipCard';
import { useLanguage } from '../i18n/LanguageContext';

import financeImg from '../assets/images/finance.png';
import animeDexImg from '../assets/images/animedex.png';
import alecrimImg from '../assets/images/alecrim.png';
import barbearia from '../assets/images/barbearia.png';
// Imagem do novo projeto Java
import javaProjectImg from '../assets/images/javaproject.png';
import partyManagerImg from '../assets/images/partymanager.png';
import floriculturaImg from '../assets/images/floricultura.webp';

import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaDatabase, FaJava, FaNodeJs } from 'react-icons/fa';
import { SiSpringboot, SiTypescript, SiPostgresql } from 'react-icons/si';
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
  'Spring Boot': <SiSpringboot className="w-5 h-5" />,
  'TypeScript': <SiTypescript />,
  'Node.js': <FaNodeJs />,
  'PostgreSQL': <SiPostgresql />
};

// Static, language-independent data (images, links, tags). Titles/summary/description
// come from translations so the language toggle can switch them.
const projectsData = [
    {
        id: "PartyManager",
        title: "Party Manager (Full Stack)",
        image: partyManagerImg,
        link: "https://github.com/vitornoms1/PartyManager",
        live: "https://party-manager-three.vercel.app/",
        tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS']
    },
    {
        id: "Floricultura",
        title: "Kalanchoê Floricultura",
        image: floriculturaImg,
        link: "https://github.com/vitornoms1/catalogoFloricultura",
        live: "https://catalogofloricultura.vercel.app/",
        tags: ['React', 'TailwindCSS']
    },
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

const ProjectsSection = () => {
    const { t } = useLanguage();

    const mergedProjects = projectsData.map((project) => ({
        ...project,
        summary: t.projects.items[project.id]?.summary,
        description: t.projects.items[project.id]?.description,
    }));

    return (
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
                            className="bg-ink flex-1 min-w-[280px] basis-full md:basis-[calc(50%-1px)] lg:basis-[calc(33.333%-1px)]"
                            variants={cardVariants}
                        >
                            <ProjectFlipCard
                                project={project}
                                index={i}
                                labels={t.projects.flip}
                                icons={techIconMap}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
