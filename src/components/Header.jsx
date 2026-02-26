import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: 'About', href: '#sobre' },
    { name: 'Skills', href: '#habilidades' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projetos' },
    { name: 'Contact', href: '#contatos' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between px-8 md:px-16 
                 bg-[#13131F] border-b-[1px] border-[#404ad8] z-50"
    >
      <a href="#home" className="text-2xl font-bold text-white">
        Vitor Noms
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8">
        {menuLinks.map((link) => (
          <a key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
            {link.name}
          </a>
        ))}
      </nav>

      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden text-white text-2xl z-[60] relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop: Escurece o fundo para destacar o menu lateral */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[51] md:hidden"
            />

            {/* Menu Lateral (Drawer) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[70%] h-screen bg-[#13131F] border-l border-[#404ad8] flex flex-col pt-24 px-8 gap-6 z-[55] md:hidden shadow-2xl"
            >
              {menuLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xl text-gray-300 hover:text-purple-400 transition-colors font-medium border-b border-gray-800 pb-2"
                  onClick={() => setIsOpen(false)}
                >
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