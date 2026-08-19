import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../i18n/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  const form = useRef();
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = 'service_udwawxm';
    const templateID = 'template_zuyanou';
    const publicKey = 'vpOjgS6L4VMeTpfcx';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          e.target.reset();
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      });
  };

  const contactLinks = [
    { icon: <FaWhatsapp />, title: 'WhatsApp', detail: '(51) 98349-4411', link: 'https://wa.me/5551983494411' },
    { icon: <FaLinkedin />, title: 'LinkedIn', detail: 'vitornoms-dev', link: 'https://www.linkedin.com/in/vitornoms-dev' },
    { icon: <FaGithub />, title: 'Github', detail: 'vitornoms1', link: 'https://github.com/vitornoms1' }
  ];

  const statusText = {
    sending: t.contact.sending,
    success: t.contact.success,
    error: t.contact.error,
  }[status];

  return (
    <section id="contatos" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-index">{t.contact.index}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-paper mb-3">{t.contact.title}</h2>
          <p className="text-muted max-w-lg">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line">

          <div className="flex flex-col bg-ink">
            {contactLinks.map((contact) => (
              <a
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 border-b border-line last:border-b-0 hover:bg-surface transition-colors"
              >
                <div className="w-11 h-11 border border-line flex items-center justify-center text-muted text-xl group-hover:text-accent group-hover:border-accent transition-colors">
                  {contact.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-paper font-semibold">{contact.title}</h4>
                  <p className="text-muted text-sm font-mono">{contact.detail}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-ink p-6 md:p-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder={t.contact.namePlaceholder}
                  required
                  className="flex-1 bg-transparent border border-line p-3 text-paper placeholder:text-muted focus:border-accent outline-none transition-colors"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder={t.contact.emailPlaceholder}
                  required
                  className="flex-1 bg-transparent border border-line p-3 text-paper placeholder:text-muted focus:border-accent outline-none transition-colors"
                />
              </div>
              <textarea
                name="message"
                rows="5"
                placeholder={t.contact.messagePlaceholder}
                required
                className="w-full bg-transparent border border-line p-3 text-paper placeholder:text-muted focus:border-accent outline-none transition-colors resize-none"
              ></textarea>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-accent text-ink font-mono text-sm font-semibold uppercase tracking-wide py-3 hover:bg-paper transition-colors"
              >
                {t.contact.send} <FaPaperPlane className="text-sm" />
              </button>

              {statusText && (
                <p className={`mt-1 text-sm font-mono ${status === 'success' ? 'text-accent' : 'text-muted'}`}>
                  {statusText}
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
