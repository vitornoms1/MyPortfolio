import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/images/vitor.jpeg'; 

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
        
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-4xl md:text-5xl text-white">Hello, I'm</p>
          <p className="text-4xl md:text-5xl font-bold text-purple-500 my-1">Vitor Noms</p>
          <p className="text-lg text-gray-400 mb-6">
            Full Stack Developer | JS | CSS | Node.js | Java | Spring Boot | C# | React | Tailwind CSS
          </p>
          
          <div className="flex justify-center md:justify-start gap-4">
            <a 
              href="https://github.com/vitornoms1" 
              target="_blank" 
              className="py-2 px-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/vitornoms-dev/" 
              target="_blank"
              className="py-2 px-6 rounded-full border border-purple-500 text-white font-bold hover:bg-purple-500/10 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="w-64 h-64 md:w-72 md:h-72 p-2 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <img 
            src={profileImage} 
            alt="Vitor Noms profile" 
            className="w-full h-full object-cover rounded-full" 
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;