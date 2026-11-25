import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCode, FaRoute, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * "Tubelight" navbar: a floating pill with a glowing lamp that slides to the active section.
 * Desktop (lg+): centred at the top, with text labels.
 * Smaller screens: floating at the bottom, with icons only.
 * The active item follows the scroll position, and clicking an item jumps to its section.
 */
const NavBar = () => {
  const { t } = useLanguage();

  const items = [
    { id: 'sobre', name: t.nav.about, icon: FaUser },
    { id: 'habilidades', name: t.nav.skills, icon: FaCode },
    { id: 'journey', name: t.nav.journey, icon: FaRoute },
    { id: 'projetos', name: t.nav.projects, icon: FaBriefcase },
    { id: 'contatos', name: t.nav.contact, icon: FaEnvelope },
  ];

  const [active, setActive] = useState(null); // null while the hero is on screen

  // scroll-spy: the section crossing the middle of the viewport is the active one
  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    const hero = document.getElementById('home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(entry.target.id === 'home' ? null : entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((el) => observer.observe(el));
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 lg:bottom-auto lg:top-[13px] left-1/2 -translate-x-1/2 z-50 mb-6 lg:mb-0"
    >
      <ul className="flex items-center gap-1 lg:gap-2 bg-ink/70 border border-line backdrop-blur-lg p-1 rounded-full shadow-lg shadow-black/40">
        {items.map(({ id, name, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActive(id)}
                aria-label={name}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex items-center justify-center rounded-full px-4 lg:px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                  isActive ? 'text-accent' : 'text-muted hover:text-paper'
                }`}
              >
                <span className="hidden lg:inline">{name}</span>
                <span className="lg:hidden">
                  <Icon size={17} aria-hidden="true" />
                </span>

                {isActive && (
                  <motion.span
                    layoutId="lamp"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <span className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
                      <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/25 blur-md" />
                      <span className="absolute -top-1 h-6 w-8 rounded-full bg-accent/25 blur-md" />
                      <span className="absolute left-2 top-0 h-4 w-4 rounded-full bg-accent/25 blur-sm" />
                    </span>
                  </motion.span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
