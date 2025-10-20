import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 px-4 text-center overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-white mb-8">
          About Me
        </h2>

        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
          Developer Front End with solid experience in developing modern web applications, combining performance, scalability and usability. I am proficient in JavaScript, CSS and relational and non-relational databases, with practical experience in both the front-end and back-end. On the front-end, I focus on creating responsive, reusable and accessible interfaces; on the back-end, I develop robust and secure APIs. I am enthusiastic about best practices, versioning with Git and clean architecture. I am passionate about programming and I constantly seek to evolve my skills, exploring new technologies and improving the quality of the solutions I develop.
        </p>
      </motion.div>

    </section>
  );
};

export default AboutSection;