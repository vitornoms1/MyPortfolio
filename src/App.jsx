import React from 'react';
import { motion } from 'framer-motion';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import JourneySection from './components/JourneySection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * NeonMistBackground Component
 * Creates a modern, immersive feel using floating colorful mists.
 */
const NeonMistBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#13131F]">
      {/* 1. Floating Purple Mist (Top Left) */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[15%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[120px]"
      />
      
      {/* 2. Floating Indigo/Blue Mist (Bottom Right) */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[0%] -right-[10%] w-[65%] h-[65%] rounded-full bg-indigo-600/10 blur-[150px]"
      />
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen flex flex-col relative text-white">
      {/* Background layer */}
      <NeonMistBackground />

      <Header />

      {/* Main content area */}
      <main className="flex-1 pt-[70px]">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <JourneySection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;