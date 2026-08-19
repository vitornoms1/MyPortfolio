import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const menuLinks = [
    { name: t.nav.about, href: '#sobre' },
    { name: t.nav.skills, href: '#habilidades' },
    { name: t.nav.journey, href: '#journey' },
    { name: t.nav.projects, href: '#projetos' },
    { name: t.nav.contact, href: '#contatos' },
  ];

  const LangToggle = ({ className = '' }) => (
    <div className={`flex items-center gap-1 font-mono text-xs tracking-widest ${className}`}>
      <button
        onClick={() => setLang('pt')}
        aria-pressed={lang === 'pt'}
        className={`px-2 py-1 border transition-colors ${
          lang === 'pt'
            ? 'border-accent text-accent'
            : 'border-line text-muted hover:text-paper hover:border-paper/40'
        }`}
      >
        PT
      </button>
      <span className="text-muted">|</span>
      <button
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-2 py-1 border transition-colors ${
          lang === 'en'
            ? 'border-accent text-accent'
            : 'border-line text-muted hover:text-paper hover:border-paper/40'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <header
      className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between px-6 md:px-16
                 bg-ink/80 backdrop-blur-md border-b border-line z-50"
    >
      <a href="#home" className="flex items-center gap-2 font-mono text-sm tracking-widest text-paper uppercase">
        <span className="text-accent">/</span> Vitor Noms Kuhn
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {menuLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="group flex items-center gap-2 text-muted hover:text-paper transition-colors text-sm font-medium"
          >
            <span className="font-mono text-[10px] text-accent/70 group-hover:text-accent transition-colors">
              {String(i + 1).padStart(2, '0')}
            </span>
            {link.name}
          </a>
        ))}
        <LangToggle />
      </nav>

      {/* Mobile: lang toggle + hamburger */}
      <div className="flex items-center gap-4 md:hidden">
        <LangToggle />
        <button
          className="text-paper text-2xl z-[60] relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-[51] md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[75%] h-screen bg-surface border-l border-line flex flex-col pt-24 px-8 gap-6 z-[55] md:hidden shadow-2xl"
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-xl text-muted hover:text-accent transition-colors font-medium border-b border-line pb-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-mono text-xs text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                  {link.name}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
