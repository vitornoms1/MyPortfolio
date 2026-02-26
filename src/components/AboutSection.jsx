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

        <div className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed space-y-6 text-justify md:text-center">
          <p>
            I am a Software Engineering student at <strong>Unilasalle</strong> with a solid technical foundation from <strong>SENAC</strong>. Currently, I work as a <strong>Software Development Intern</strong> at Prolec, where I contribute to the development of internal and client-facing applications using C#, JavaScript, and MudBlazor within an Agile environment.
          </p>
          
          <p>
            My expertise spans from crafting responsive, high-performance front-end interfaces with React to developing robust back-end systems. Recently, I have been deepening my focus on enterprise-grade technologies, mastering <strong>Java</strong> and <strong>Spring Boot</strong> to build scalable RESTful APIs, implementing automated testing, and ensuring data integrity through clean architecture.
          </p>

          <p>
            As a <strong>Hackathon Tech+Saúde winner</strong>, I thrive on solving complex technical challenges with creative and efficient solutions. I am passionate about continuous learning, clean code, and version control, always seeking to deliver high-quality software that balances technical excellence with great user experience.
          </p>
        </div>
      </motion.div>

    </section>
  );
};

export default AboutSection;