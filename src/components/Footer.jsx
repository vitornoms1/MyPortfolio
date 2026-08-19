import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 md:px-16 border-t border-line flex items-center justify-center text-muted text-sm font-mono">
      <p>© {currentYear} Vitor Noms Kuhn</p>
    </footer>
  );
};

export default Footer;
