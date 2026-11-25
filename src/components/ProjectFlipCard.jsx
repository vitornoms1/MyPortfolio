import React, { useState, useRef, useEffect, useId } from 'react';
import { FaGithub, FaRedoAlt, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-52 overflow-hidden bg-surface">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-line/40" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-52 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03] ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/**
 * Two-face flip card. Both faces live in the same grid cell, so the card is always as
 * tall as its tallest face (no clipping, no layout shift). The hidden face is `inert`,
 * which removes its links/buttons from Tab order and blocks clicks on it.
 */
const ProjectFlipCard = ({ project, index, labels, icons }) => {
  const [flipped, setFlipped] = useState(false);
  const backId = useId();
  const frontToggle = useRef(null);
  const backToggle = useRef(null);
  const shouldMoveFocus = useRef(false);

  const toggle = () => {
    shouldMoveFocus.current = true;
    setFlipped((value) => !value);
  };

  // After the state change commits (and `inert` has moved), focus the control on the visible face.
  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    (flipped ? backToggle : frontToggle).current?.focus({ preventScroll: true });
  }, [flipped]);

  const number = String(index + 1).padStart(2, '0');

  return (
    <div className="flip-scene">
      <div className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* FRONT */}
        <div
          className="flip-face group relative bg-ink hover:bg-surface transition-colors cursor-pointer flex flex-col"
          inert={flipped}
          aria-hidden={flipped}
        >
          {/* hover accent line across the whole card */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 z-10 h-0.5 w-0 bg-accent transition-[width] duration-500 group-hover:w-full"
          />
          <div className="overflow-hidden relative">
            <ProjectImage src={project.image} alt={`${project.title} screenshot`} />
            <span className="absolute top-3 left-3 font-mono text-[10px] text-ink bg-accent px-2 py-0.5">
              {number}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — GitHub`}
              className={`absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center bg-ink/70 backdrop-blur-sm text-paper hover:text-accent hover:bg-ink transition-colors ${focusRing}`}
            >
              <FaGithub className="text-sm" />
            </a>
          </div>

          <div className="p-6 text-left flex flex-col flex-1">
            <h3 className="text-lg font-bold text-paper mb-2 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 mb-4 text-muted text-lg">
              {project.tags.map((tag) => (
                <div key={tag} title={tag}>
                  {icons[tag] || tag}
                </div>
              ))}
            </div>
            <p className="text-muted text-sm leading-relaxed min-h-16 mb-5">{project.summary}</p>

            <button
              ref={frontToggle}
              type="button"
              onClick={toggle}
              aria-expanded={flipped}
              aria-controls={backId}
              aria-label={labels.flipLabel(project.title)}
              // the ::after stretches this button over the whole face, so the entire card flips on click
              className={`mt-auto self-start inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wide text-paper group-hover:border-accent group-hover:text-accent transition-colors after:content-[''] after:absolute after:inset-0 after:z-10 ${focusRing}`}
            >
              {labels.details} <FaRedoAlt className="text-[10px]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* BACK */}
        <div
          id={backId}
          className="flip-face flip-back bg-surface p-6 text-left flex flex-col"
          inert={!flipped}
          aria-hidden={!flipped}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="text-lg font-bold text-accent">{project.title}</h3>
            <span className="font-mono text-[10px] text-ink bg-accent px-2 py-0.5 shrink-0">{number}</span>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">{labels.stack}</p>
          <ul className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-2 border border-line px-2 py-1 font-mono text-[11px] text-paper"
              >
                <span className="text-muted text-sm leading-none">{icons[tag]}</span>
                {tag}
              </li>
            ))}
          </ul>

          <p className="text-muted text-[13px] leading-relaxed break-words mb-6">{project.description}</p>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 bg-accent text-ink px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-paper transition-colors ${focusRing}`}
              >
                <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" /> {labels.live}
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={
                project.live
                  ? `inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wide text-paper hover:border-accent hover:text-accent transition-colors ${focusRing}`
                  : `inline-flex items-center gap-2 bg-accent text-ink px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-paper transition-colors ${focusRing}`
              }
            >
              <FaGithub aria-hidden="true" /> {labels.github}
            </a>
            <button
              ref={backToggle}
              type="button"
              onClick={toggle}
              aria-label={labels.backLabel(project.title)}
              className={`inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wide text-paper hover:border-accent hover:text-accent transition-colors ${focusRing}`}
            >
              <FaArrowLeft className="text-[10px]" aria-hidden="true" /> {labels.back}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFlipCard;
