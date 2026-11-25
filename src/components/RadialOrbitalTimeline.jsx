import React, { useState, useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const MAX_RADIUS = 200;
const DEG_PER_SECOND = 6;
const TOP_ANGLE = 270; // a selected node rotates to the top of the orbit

const normalize = (deg) => ((deg % 360) + 360) % 360;

/**
 * Radial orbital timeline.
 * items: [{ id, title, date, location, content, icon, relatedIds, status, highlight }]
 * labels: { completed, inProgress, related }
 */
const RadialOrbitalTimeline = ({ items, labels }) => {
  const [activeId, setActiveId] = useState(null);
  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(MAX_RADIUS);

  const containerRef = useRef(null);
  const angleRef = useRef(0);
  const targetRef = useRef(null);

  const reduced = useReducedMotion();
  const inView = useInView(containerRef, { margin: '-10% 0px' });
  const autoRotate = activeId === null;

  // Keep the orbit inside narrow screens.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const update = () => setRadius(Math.max(90, Math.min(MAX_RADIUS, (el.clientWidth - 120) / 2)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Single rAF loop: idle spin, or ease toward the selected node. Pauses off-screen.
  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      let a = angleRef.current;

      if (targetRef.current !== null) {
        const diff = ((targetRef.current - a + 540) % 360) - 180; // shortest path
        if (reduced || Math.abs(diff) < 0.05) {
          a = targetRef.current;
          targetRef.current = null;
        } else {
          a += diff * (1 - Math.exp(-dt * 7));
        }
      } else if (autoRotate && !reduced) {
        a += DEG_PER_SECOND * dt;
      }

      a = normalize(a);
      if (a !== angleRef.current) {
        angleRef.current = a;
        setAngle(a);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, autoRotate, reduced]);

  const clearSelection = () => {
    setActiveId(null);
    targetRef.current = null;
  };

  useEffect(() => {
    if (activeId === null) return undefined;
    const onKey = (e) => e.key === 'Escape' && clearSelection();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  const select = (id) => {
    if (activeId === id) {
      clearSelection();
      return;
    }
    const index = items.findIndex((item) => item.id === id);
    setActiveId(id);
    targetRef.current = normalize(TOP_ANGLE - (index / items.length) * 360);
  };

  const activeItem = items.find((item) => item.id === activeId);
  const relatedToActive = activeItem ? activeItem.relatedIds : [];

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.target === e.currentTarget && clearSelection()}
      className="relative w-full h-[620px] sm:h-[680px] flex items-center justify-center"
    >
      {/* decorative orbit + core (pointer-events-none so empty clicks reach the container) */}
      <div className="absolute w-px h-px pointer-events-none" style={{ left: '50%', top: '50%' }}>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
          style={{ width: radius * 2, height: radius * 2 }}
        />
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line opacity-60"
          style={{ width: radius * 2 + 56, height: radius * 2 + 56 }}
        />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center motion-safe:animate-pulse">
          <span className="absolute w-20 h-20 rounded-full border border-accent/30 motion-safe:animate-ping" />
          <span className="w-6 h-6 rounded-full bg-ink" />
        </div>
      </div>

      {items.map((item, index) => {
        const nodeAngle = normalize((index / items.length) * 360 + angle);
        const rad = (nodeAngle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);

        const isActive = activeId === item.id;
        const isRelated = relatedToActive.includes(item.id);
        const zIndex = isActive ? 200 : Math.round(100 + 50 * Math.cos(rad));
        const opacity = isActive ? 1 : Math.max(0.6, 0.6 + 0.4 * ((1 + Math.sin(rad)) / 2));
        const Icon = item.icon;
        const done = item.status === 'completed';

        return (
          <div
            key={item.id}
            className="absolute left-1/2 top-1/2 w-10 h-10"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              zIndex,
              opacity,
            }}
          >
            <button
              type="button"
              onClick={() => select(item.id)}
              aria-expanded={isActive}
              aria-label={`${item.title} — ${item.date}`}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-[transform,background-color,border-color,color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                isActive
                  ? 'scale-150 bg-accent text-ink border-accent'
                  : isRelated
                  ? 'bg-accent/30 text-paper border-accent motion-safe:animate-pulse'
                  : 'bg-ink text-paper border-paper/30 hover:border-accent hover:text-accent'
              } ${item.highlight && !isActive ? 'shadow-[0_0_18px_rgba(215,255,61,0.3)]' : ''}`}
            >
              <Icon size={16} aria-hidden="true" />
              {!isActive && (
                <span className="absolute top-12 left-1/2 -translate-x-1/2 w-28 text-center text-[10px] leading-tight font-mono uppercase tracking-wide text-muted pointer-events-none">
                  {item.title}
                </span>
              )}
            </button>

            {isActive && (
              <div
                role="group"
                aria-label={item.title}
                className="absolute top-16 left-1/2 -translate-x-1/2 w-[min(16rem,80vw)] border border-line bg-ink/95 backdrop-blur-lg text-left shadow-xl shadow-black/40"
              >
                <span className="absolute -top-3 left-1/2 w-px h-3 bg-accent/50" />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] tracking-wide ${
                        done ? 'border border-line text-muted' : 'bg-accent text-ink font-semibold'
                      }`}
                    >
                      {done ? labels.completed : labels.inProgress}
                    </span>
                    <span className="font-mono text-[10px] text-muted">{item.date}</span>
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-paper leading-snug">{item.title}</h3>
                  <p className="mt-1 font-mono text-[11px] text-accent/80">{item.location}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">{item.content}</p>

                  {item.relatedIds.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-line">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                        {labels.related}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.relatedIds.map((relId) => {
                          const rel = items.find((i) => i.id === relId);
                          return (
                            <button
                              key={relId}
                              type="button"
                              onClick={() => select(relId)}
                              className="flex items-center gap-1 border border-line px-2 py-1 text-left text-[10px] text-muted hover:text-accent hover:border-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                            >
                              {rel?.title}
                              <FaArrowRight size={8} aria-hidden="true" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RadialOrbitalTimeline;
