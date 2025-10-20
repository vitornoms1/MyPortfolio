// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header 
      className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between px-8 md:px-16 
                 bg-[#13131F] border-b-[1px] border-[#404ad8] z-50"
    >
      <a href="#home" className="text-2xl font-bold text-white">
        Vitor Noms
      </a>

      <nav className="hidden md:flex gap-8">
        <a href="#sobre" className="text-gray-300 hover:text-white transition-colors">About</a>
        <a href="#habilidades" className="text-gray-300 hover:text-white transition-colors">Skills</a>
        <a href="#projetos" className="text-gray-300 hover:text-white transition-colors">Projects</a>
        <a href="#contatos" className="text-gray-300 hover:text-white transition-colors">Contact</a>
      </nav>
    </header>
  );
};

export default Header;