import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';

import financeImg from '../assets/images/finance.png';
import animeDexImg from '../assets/images/animedex.png';
import goldenMugImg from '../assets/images/pub.png';
import cryptoDashImg from '../assets/images/dash.png';
import reactUiImg from '../assets/images/UX.png'; 
import alecrimImg from '../assets/images/alecrim.png';

import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaDatabase } from 'react-icons/fa';
import TailwindIcon from '../assets/icons/tailwind.svg?react';
import FramerIcon from '../assets/icons/framer.svg?react';
import ApexChartsIcon from '../assets/icons/apex.svg?react';

const techIconMap = {
  'React': <FaReact />,
  'TailwindCSS': <TailwindIcon className="w-6 h-6" />,
  'Framer Motion': <FramerIcon className="w-5 h-5" />,
  'JavaScript': <FaJsSquare />,
  'HTML': <FaHtml5 />,
  'CSS': <FaCss3Alt />,
  'API': <FaDatabase />,
  'ApexCharts': <ApexChartsIcon className="w-5 h-5" />
};

const projectsData = [
    { 
        id: "FinanceManager", 
        title: "Finance Manager (Full Stack)", 
        image: financeImg, 
        summary: "A complete SaaS for personal finance with Auth, MySQL, and recurring payments logic.",
        description: "A robust Full Stack application developed to manage personal finances. Built with React (Vite) on the frontend and Node.js (Express) on the backend, integrated with a MySQL database hosted on Railway. It features secure JWT authentication, complex business logic for handling recurring bill installments (preventing double payments), monthly/yearly data filtering, and dashboard visualization. This project demonstrates mastery of CRUD operations, relational database modeling, and solving production deployment challenges like CORS and Environment Variables.", 
        link: "https://github.com/vitornoms1/FinanceManager", 
        tags: ['React', 'TailwindCSS', 'API', 'JavaScript'] 
    },
    { 
        id: "ReactUIUX", 
        title: "React UI/UX Project", 
        image: reactUiImg, 
        summary: "A modern UI/UX landing page built with React, Tailwind, and Framer Motion.",
        description: "A fully responsive, modern landing page built from scratch to showcase advanced UI/UX concepts. Developed with React and Vite for high performance, and styled with Tailwind CSS. It features a seamless light/dark mode toggle managed by Context API, complex animations powered by Framer Motion, and interactive data visualization using Recharts. This project demonstrates a strong command of modern front-end libraries and a keen eye for design.", 
        link: "https://github.com/vitornoms1/React-UX-UI-Project", 
        tags: ['React', 'TailwindCSS', 'Framer Motion'] 
    },
    { 
        id: "Alecrim", 
        title: "Alecrim Casa de Festas", 
        image: alecrimImg,
        summary: "A responsive SPA for an event venue, featuring interactive modals and a backend-less WhatsApp contact form.",
        description: "A responsive SPA for a local event venue, built with React (Vite) and Tailwind CSS. This project focuses on lead conversion, featuring subtle scroll animations (react-awesome-reveal) and a dynamic modal for event packages. The modal displays responsive tables (with horizontal scroll) and utilizes a `useEffect` hook to lock page scrolling when open. The primary feature is a backend-less contact form that formats user input and opens the WhatsApp API for an instant, direct line to the client.", 
        link: "https://github.com/vitornoms1/alecrim",
        tags: ['React', 'TailwindCSS', 'JavaScript'] 
    },
    { 
        id: "AnimeDex", 
        title: "AnimeDex", 
        image: animeDexImg, 
        summary: "An anime discovery platform using the Jikan API with search and filtering.",
        description: "A feature-rich discovery platform for anime enthusiasts, powered by the Jikan API. Users can dynamically search, filter by genre, and sort titles across multiple pages. The application includes a detailed modal view with character data and utilizes URL-based state management, making user sessions shareable and refresh-proof.", 
        link: "https://github.com/vitornoms1/animedex-project", 
        tags: ['JavaScript', 'HTML', 'CSS'] 
    },
    { 
        id: "TheGoldenMug", 
        title: "The Golden Mug", 
        image: goldenMugImg, 
        summary: "A front-end concept for a pub website with a shopping cart simulation.",
        description: "A complete front-end concept for a modern pub, built with TailwindCSS. This project features a dynamic menu with filtering, a fully functional shopping cart, user login/registration simulation using LocalStorage, and interactive modals. It's designed to showcase a clean UI and essential e-commerce functionalities.", 
        link: "https://github.com/vitornoms1/PubsProject", 
        tags: ['JavaScript', 'TailwindCSS', 'HTML'] 
    },
    { 
        id: "CryptoDash", 
        title: "CryptoDash", 
        image: cryptoDashImg, 
        summary: "A real-time cryptocurrency dashboard using the CoinGecko API.",
        description: "A real-time cryptocurrency dashboard that fetches and displays data directly from the CoinGecko API. Features include dynamic and interactive charts with ApexCharts, a live search function, a top movers list, and a light/dark theme toggle. Built with vanilla JavaScript, HTML, and CSS.", 
        link: "https://github.com/vitornoms1/Dashboard", 
        tags: ['JavaScript', 'API', 'ApexCharts'] 
    }
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};


const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <section id="projetos" className="py-20 px-4 text-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Projects
                    </h2>
                    <p className="text-lg text-gray-400 mb-12">Here are some of the projects I'm proud of.</p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.id}
                            className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 cursor-pointer 
                                        transition-all duration-300 ease-in-out 
                                        brightness-50 
                                        hover:scale-[1.05] 
                                        hover:shadow-purple-500/40 
                                        hover:brightness-100"
                            onClick={() => setSelectedProject(project)}
                            variants={cardVariants}
                        >
                            <div className="overflow-hidden">
                                <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-56 object-cover" />
                            </div>
                            <div className="p-6 text-left">
                                <h3 className="text-2xl font-bold text-purple-400 mb-2">{project.title}</h3>
                                <div className="flex items-center gap-3 mb-4 text-purple-400 text-2xl">
                                    {project.tags.map(tag => (
                                        <div key={tag} title={tag}>
                                            {techIconMap[tag] || tag}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-400 mb-4 h-16">{project.summary}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </>
    );
};

export default ProjectsSection;