import React, { useState } from 'react';

import IntroAnimation from './components/IntroAnimation';
import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import JourneySection from './components/JourneySection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * Backdrop: flat ink background with a faint grid + film grain,
 * instead of the generic blurred purple/indigo blobs.
 */
const Backdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink noise-bg">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F5F5F0 1px, transparent 1px), linear-gradient(to bottom, #F5F5F0 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-line" />
    </div>
  );
};

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <IntroAnimation onFinish={() => setIntroDone(true)} />

      <Backdrop />

      <Header />
      <ScrollProgress />

      <main className="flex-1 pt-[70px]">
        <HeroSection introDone={introDone} />
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
