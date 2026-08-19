import React from 'react';
import { motion } from 'framer-motion';
import { SiSpringboot, SiGitlab, SiBlazor, SiMysql, SiPostgresql, SiSqlite } from 'react-icons/si';
import { useLanguage } from '../i18n/LanguageContext';

import HtmlIcon from '../assets/icons/html5.svg?react';
import CssIcon from '../assets/icons/css3.svg?react';
import JsIcon from '../assets/icons/javascript.svg?react';
import FigmaIcon from '../assets/icons/figma.svg?react';
import NodeIcon from '../assets/icons/nodedotjs.svg?react';
import PythonIcon from '../assets/icons/python.svg?react';
import ReactIcon from '../assets/icons/react.svg?react';
import GithubIcon from '../assets/icons/github.svg?react';
import GitIcon from '../assets/icons/git.svg?react';
import TailwindIcon from '../assets/icons/tailwind.svg?react';
import CsharpIcon from '../assets/icons/csharp.svg?react';
import JavaIcon from '../assets/icons/java.svg?react';
import SpringIcon from '../assets/icons/springboot.svg?react';

const skillsData = [
  { name: 'Java', icon: <JavaIcon /> },
  { name: 'Spring Boot', icon: <SiSpringboot /> },
  { name: 'HTML5', icon: <HtmlIcon /> },
  { name: 'CSS3', icon: <CssIcon /> },
  { name: 'JavaScript', icon: <JsIcon /> },
  { name: 'React.js', icon: <ReactIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { name: 'Node.js', icon: <NodeIcon /> },
  { name: 'C#', icon: <CsharpIcon /> },
  { name: 'Python', icon: <PythonIcon /> },
  { name: 'Git', icon: <GitIcon /> },
  { name: 'GitHub', icon: <GithubIcon /> },
  { name: 'GitLab', icon: <SiGitlab /> },
  { name: 'MudBlazor', icon: <SiBlazor /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'SQLite', icon: <SiSqlite /> },
  { name: 'Figma', icon: <FigmaIcon /> },
];

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

  return (
    <section id="habilidades" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="section-index">{t.skills.index}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper mb-10">
            {t.skills.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-px bg-line border border-line"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
    </section>
  );
};

export default SkillsSection;
