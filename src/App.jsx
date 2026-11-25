import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { useLanguage } from './i18n/LanguageContext';

import IntroAnimation from './components/IntroAnimation';
import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import JourneySection from './components/JourneySection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import NavBar from './components/NavBar';
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
  const { t } = useLanguage();

  return (
    // reducedMotion="user": framer-motion animations follow the OS "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col relative pb-24 lg:pb-0">
        <IntroAnimation onFinish={() => setIntroDone(true)} />

        <Backdrop />

        {/* the page behind the intro gate is inert: no Tab stops, no screen-reader access until you enter */}
        <div inert={!introDone} className="contents">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-ink"
          >
            {t.nav.skip}
          </a>

          <Header />
          <NavBar />
          <ScrollProgress />

          <main id="main" tabIndex={-1} className="flex-1 pt-[70px] focus:outline-none">
            <HeroSection introDone={introDone} />
            <AboutSection />
            <SkillsSection />
            <JourneySection />
            <ProjectsSection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
