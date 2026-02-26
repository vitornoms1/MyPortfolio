import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // Seus IDs reais configurados conforme solicitado
    const serviceID = 'service_udwawxm';
    const templateID = 'template_zuyanou';
    const publicKey = 'vpOjgS6L4VMeTpfcx';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setStatus('Message sent successfully!');
          e.target.reset(); // Limpa o formulário após o envio
          
          // Remove a mensagem de sucesso após 5 segundos
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('Failed to send. Please try again.');
      });
  };

  const contactLinks = [
    { icon: <FaWhatsapp />, title: 'WhatsApp', detail: '(51) 98349-4411', link: 'https://wa.me/5551983494411' },
    { icon: <FaLinkedin />, title: 'LinkedIn', detail: 'vitornoms-dev', link: 'https://www.linkedin.com/in/vitornoms-dev' },
    { icon: <FaGithub />, title: 'Github', detail: 'vitornoms1', link: 'https://github.com/vitornoms1' }
  ];

  return (
    <section id="contatos" className="py-20 px-4 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">Contact Me</h2>
        <p className="text-gray-400 mb-12">Send me a message directly!</p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Lado Esquerdo: Cards de Contato Rápido */}
          <div className="flex flex-col gap-6 justify-center">
            {contactLinks.map((contact) => (
              <a 
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-4 bg-[#1a1a2e] rounded-xl border border-gray-800 hover:border-purple-500 transition-all group"
              >
                <div className="w-14 h-14 bg-[#13131F] rounded-full flex items-center justify-center text-purple-400 text-2xl group-hover:scale-110 transition-transform">
                  {contact.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold">{contact.title}</h4>
                  <p className="text-gray-400 text-sm">{contact.detail}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Lado Direito: Formulário de E-mail Real */}
          <div className="bg-[#1a1a2e] p-8 rounded-2xl border border-gray-800 shadow-xl">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  name="user_name" 
                  placeholder="Your Name" 
                  required
                  className="flex-1 bg-[#13131F] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-colors"
                />
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder="Your Email" 
                  required
                  className="flex-1 bg-[#13131F] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-colors"
                />
              </div>
              <textarea 
                name="message" 
                rows="5" 
                placeholder="Your Message" 
                required
                className="w-full bg-[#13131F] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-colors resize-none"
              ></textarea>
              
              <button 
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:scale-[1.02] transition-transform active:scale-95"
              >
                Send Message <FaPaperPlane className="text-sm" />
              </button>
              
              {status && (
                <p className={`mt-2 text-sm animate-pulse ${status.includes('successfully') ? 'text-green-400' : 'text-purple-400'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;