import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 text-center text-gray-400 bg-black">
      <p>&copy; {currentYear} Vitor Noms. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;