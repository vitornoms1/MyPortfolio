import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

// Slim top bar: logo + language toggle. Section navigation lives in the floating NavBar.
const LangToggle = () => {
  const { lang, setLang } = useLanguage();

  const buttonClass = (code) =>
    `px-2 py-1 border transition-colors ${
      lang === code
        ? 'border-accent text-accent'
        : 'border-line text-muted hover:text-paper hover:border-paper/40'
    }`;

  return (
    <div className="flex items-center gap-1 font-mono text-xs tracking-widest">
      <button onClick={() => setLang('pt')} aria-pressed={lang === 'pt'} aria-label="Português" lang="pt-BR" className={buttonClass('pt')}>
        PT
      </button>
      <span className="text-muted" aria-hidden="true">|</span>
      <button onClick={() => setLang('en')} aria-pressed={lang === 'en'} aria-label="English" lang="en" className={buttonClass('en')}>
        EN
      </button>
    </div>
  );
};

const Header = () => (
  <header
    className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between px-6 md:px-16
               bg-ink/80 backdrop-blur-md border-b border-line z-40"
  >
    <a href="#home" className="flex items-center gap-2 font-mono text-sm tracking-widest text-paper uppercase">
      <span className="text-accent">/</span> Vitor Noms Kuhn
    </a>

    <LangToggle />
  </header>
);

export default Header;
