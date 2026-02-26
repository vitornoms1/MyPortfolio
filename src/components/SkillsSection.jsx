import React from 'react';
import { motion } from 'framer-motion';
import { SiSpringboot } from 'react-icons/si';

import HtmlIcon from '../assets/icons/html5.svg?react';
import CssIcon from '../assets/icons/css3.svg?react';
import JsIcon from '../assets/icons/javascript.svg?react';
import FigmaIcon from '../assets/icons/figma.svg?react';
import NodeIcon from '../assets/icons/nodedotjs.svg?react';
import PythonIcon from '../assets/icons/python.svg?react';
import ReactIcon from '../assets/icons/react.svg?react';
import GithubIcon from '../assets/icons/github.svg?react';
import GitIcon from '../assets/icons/git.svg?react';
import DbIcon from '../assets/icons/database-solid-full.svg?react';
import TailwindIcon from '../assets/icons/tailwind.svg?react';
import CsharpIcon from '../assets/icons/csharp.svg?react';

// Certifique-se de adicionar esses ícones na sua pasta de icons
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
  { name: 'Figma', icon: <FigmaIcon /> },
  { name: 'DataBase', icon: <DbIcon /> },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const SkillsSection = () => {
  return (
    <section id="habilidades" className="py-20 px-4 text-center overflow-hidden">
      <motion.h2 
        className="text-4xl font-bold text-white mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Skills
      </motion.h2>

      <motion.div 
        className="flex flex-wrap gap-8 justify-center max-w-4xl mx-auto"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillsData.map((skill) => (
          <motion.div 
            key={skill.name} 
            className="bg-[#1f1f2e] rounded-t-xl w-32 flex flex-col items-center p-6 shadow-[0_4px_0_#404ad8] hover:-translate-y-2 transition-transform cursor-pointer"
            variants={cardVariants}
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center text-white">
              {React.cloneElement(skill.icon, {
                className: "w-full h-full"
              })}
            </div>
            <span className="text-white font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;