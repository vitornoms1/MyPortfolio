// src/components/ContactSection.jsx

import React from 'react';
import { motion } from 'framer-motion';

import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

const contactData = [
  { icon: <FaEnvelope />, title: 'E-mail', detail: 'vitornoms@gmail.com' },
  { icon: <FaPhone />, title: 'Telephone', detail: '(51) 98349-4411' },
  { icon: <FaLinkedin />, title: 'LinkedIn', detail: '@vitornoms-dev' },
  { icon: <FaGithub />, title: 'Github', detail: '@vitornoms1' }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
    }
  }
};

const ContactSection = () => {
  return (
    <motion.section 
      id="contatos" 
      className="py-20 px-4 text-center overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-white mb-12">
        Contacts
      </h2>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
        {contactData.map((contact) => (
          <div 
            key={contact.title}
            className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
          >
            <div className="w-20 h-20 bg-[#1a1a2e] rounded-full flex items-center justify-center mb-4 border-2 border-transparent hover:border-purple-500 transition-colors">
              <span className="text-purple-400 text-4xl">
                {contact.icon}
              </span>
            </div>
            <h4 className="text-xl font-bold text-white">{contact.title}</h4>
            <p className="text-gray-400">{contact.detail}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ContactSection;