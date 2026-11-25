import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp, FaPaperPlane, FaCheck } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../i18n/LanguageContext';

const MAX_MESSAGE = 1000;

const fieldClass =
  'w-full bg-transparent border border-line p-3 text-paper placeholder:text-muted hover:border-paper/20 focus:border-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent transition-colors';
const labelClass = 'block mb-2 font-mono text-[11px] uppercase tracking-widest text-muted';

// visible "*" for sighted users + "(required)" for screen readers
const Required = ({ label }) => (
  <>
    <span aria-hidden="true" className="text-accent"> *</span>
    <span className="sr-only"> ({label})</span>
  </>
);

const contactLinks = [
  { icon: <FaWhatsapp />, title: 'WhatsApp', detail: '(51) 98349-4411', link: 'https://wa.me/5551983494411' },
  { icon: <FaLinkedin />, title: 'LinkedIn', detail: 'vitornoms-dev', link: 'https://www.linkedin.com/in/vitornoms-dev' },
  { icon: <FaGithub />, title: 'Github', detail: 'vitornoms1', link: 'https://github.com/vitornoms1' },
];

const ContactSection = () => {
  const { t } = useLanguage();
  const form = useRef(null);
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [messageLength, setMessageLength] = useState(0);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = 'service_udwawxm';
    const templateID = 'template_zuyanou';
    const publicKey = 'vpOjgS6L4VMeTpfcx';

    const data = new FormData(form.current);
    const topics = data.getAll('topics');
    const message = String(data.get('message') || '');

    // The EmailJS template only knows user_name / user_email / message, so the
    // selected topics are folded into the message body.
    const params = {
      user_name: data.get('user_name'),
      user_email: data.get('user_email'),
      message: topics.length ? `[${t.contact.topicsPrefix}: ${topics.join(', ')}]\n\n${message}` : message,
    };

    emailjs.send(serviceID, templateID, params, publicKey).then(
      () => {
        setStatus('success');
        form.current.reset();
        setMessageLength(0);
        setTimeout(() => setStatus(''), 5000);
      },
      () => setStatus('error')
    );
  };

  const statusText = {
    sending: t.contact.sending,
    success: t.contact.success,
    error: t.contact.error,
  }[status];

  return (
    <section id="contatos" className="relative py-24 px-6 md:px-16 overflow-hidden">
      {/* animated background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="contact-glow -top-32 -left-40" />
        <div className="contact-glow -bottom-40 -right-32" style={{ animationDirection: 'alternate-reverse', animationDuration: '22s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-px bg-line border border-line"
        >
          <div className="flex flex-col bg-ink/90 backdrop-blur-sm">
            <p className="px-6 pt-6 pb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.contact.channels}
            </p>
            {contactLinks.map((contact) => (
              <a
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 border-b border-line last:border-b-0 hover:bg-surface focus-visible:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent transition-colors"
              >
                <div className="w-11 h-11 border border-line flex items-center justify-center text-muted text-xl group-hover:text-accent group-hover:border-accent transition-colors">
                  {contact.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-paper font-semibold">{contact.title}</h3>
                  <p className="text-muted text-sm font-mono">{contact.detail}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-ink/90 backdrop-blur-sm p-6 md:p-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>{t.contact.nameLabel}<Required label={t.contact.required} /></label>
                  <input
                    id="contact-name"
                    type="text"
                    name="user_name"
                    autoComplete="name"
                    placeholder={t.contact.namePlaceholder}
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>{t.contact.emailLabel}<Required label={t.contact.required} /></label>
                  <input
                    id="contact-email"
                    type="email"
                    name="user_email"
                    autoComplete="email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>{t.contact.topicsLegend}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.contact.topics.map((topic) => (
                    <label
                      key={topic}
                      className="group flex items-center gap-3 border border-line px-3 py-2.5 cursor-pointer hover:border-paper/20 has-[:checked]:border-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent transition-colors"
                    >
                      <input type="checkbox" name="topics" value={topic} className="peer sr-only" />
                      <span
                        aria-hidden="true"
                        className="w-4 h-4 shrink-0 border border-muted flex items-center justify-center text-ink text-[9px] peer-checked:bg-accent peer-checked:border-accent [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 transition-colors"
                      >
                        <FaCheck />
                      </span>
                      <span className="text-sm text-muted peer-checked:text-paper transition-colors">{topic}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <div className="flex items-end justify-between">
                  <label htmlFor="contact-message" className={labelClass}>{t.contact.messageLabel}<Required label={t.contact.required} /></label>
                  <span className="mb-2 font-mono text-[10px] text-muted" aria-hidden="true">
                    {messageLength}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  maxLength={MAX_MESSAGE}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 bg-accent text-ink font-mono text-sm font-semibold uppercase tracking-wide py-3 hover:bg-paper disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {t.contact.send} <FaPaperPlane className="text-sm" aria-hidden="true" />
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`min-h-5 text-sm font-mono ${status === 'success' ? 'text-accent' : 'text-muted'}`}
              >
                {statusText}
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
