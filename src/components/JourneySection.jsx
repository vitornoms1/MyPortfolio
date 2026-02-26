import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    date: "Feb 2022",
    title: "Technical High School Start",
    location: "SENAC - São Leopoldo",
    description: "Initiated the technical journey in IT, learning the fundamentals of programming, logic, and database management."
  },
  {
    date: "Nov 2024",
    title: "Hackathon Winner",
    location: "SENAC RS / Unimed",
    description: "First place in the Tech+Saúde Hackathon 2024. Developed innovative solutions for the healthcare industry during an intensive 48-hour challenge.",
    highlight: true
  },
  {
    date: "Dec 2024",
    title: "IT Technical Degree Completion",
    location: "SENAC - São Leopoldo",
    description: "Successfully completed the Technical High School program focused on Internet IT, providing a strong foundation in web development.",
  },
  {
    date: "Feb 2025",
    title: "Software Engineering Degree",
    location: "Unilasalle - Canoas",
    description: "Started Bachelor's Degree in Software Engineering at Unilasalle to deepen theoretical and practical knowledge in complex systems.",
  },
  {
    date: "June 2025 - Present",
    title: "Software Development Intern",
    location: "Prolec - Canoas, Brazil",
    description: "Contributing to the development and maintenance of internal and client-facing applications using C#, JavaScript, and MudBlazor in an agile environment.",
    highlight: true
  }
];

const JourneySection = () => {
  return (
    <section id="journey" className="py-20 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-white mb-4">My Journey</h2>
        <p className="text-gray-400">A timeline of my professional and academic growth.</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Linha vertical central */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-600/30"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Círculo na linha do tempo com a lógica de piscar corrigida */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex w-8 h-8 rounded-full bg-[#1a1a2e] border-4 border-purple-600 z-10 items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${exp.highlight ? 'bg-purple-400 animate-ping' : 'bg-gray-600'}`}></div>
              </div>

              <div className="w-full md:w-[45%]">
                <div className={`p-6 rounded-xl bg-[#1a1a2e] border ${exp.highlight ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-gray-800'} hover:border-purple-500 transition-colors`}>
                  <span className="text-purple-500 font-bold text-sm">{exp.date}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{exp.title}</h3>
                  <p className="text-purple-300 text-sm mb-3">{exp.location}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>

              <div className="hidden md:block w-[45%]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;