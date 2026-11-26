import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

// New key on purpose: the old "lang" key was written automatically from the browser
// language, so it can't be trusted as a real choice by the visitor.
const STORAGE_KEY = 'portfolio-lang';

// English is the default; Portuguese only when the visitor picked it with the toggle.
const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem(STORAGE_KEY) === 'pt' ? 'pt' : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(getInitialLanguage);

  // only an explicit choice is remembered
  const setLang = (next) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
