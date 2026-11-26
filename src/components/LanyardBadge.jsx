import React, { useState, useRef, useEffect, useLayoutEffect, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaRedoAlt, FaArrowLeft } from 'react-icons/fa';
import profileImage from '../assets/images/vitor.jpeg';
import { useLanguage } from '../i18n/LanguageContext';

const CARD_W = 264;
const CARD_H = 392;
const HOLE_Y = 22; // where the strap passes through the card, measured from its top edge
const SEGMENTS = 8;
const GRAVITY = 0.55;
const DAMPING = 0.992;
const ITERATIONS = 8;
const DRAG_THRESHOLD = 5; // px: below this a press counts as a click (flip), not a drag
const MIN_STRAP = 140;

const contactLinks = [
  { icon: FaWhatsapp, title: 'WhatsApp', detail: '(51) 98349-4411', href: 'https://wa.me/5551983494411' },
  { icon: FaLinkedin, title: 'LinkedIn', detail: 'vitornoms-dev', href: 'https://www.linkedin.com/in/vitornoms-dev/' },
  { icon: FaGithub, title: 'GitHub', detail: 'vitornoms1', href: 'https://github.com/vitornoms1' },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/**
 * Physics lanyard ID badge.
 * A Verlet rope hangs from the top of the hero; the card is pinned to the rope's free end.
 * Drag the card and let go to make it swing; click it (or press the buttons) to flip.
 */
const LanyardBadge = ({ introDone }) => {
  const { t } = useLanguage();
  const b = t.hero.badge;
  const reduced = useReducedMotion();

  const [flipped, setFlipped] = useState(false);
  const backId = useId();

  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const strapRef = useRef(null);
  const stitchRef = useRef(null);
  const frontBtn = useRef(null);
  const backBtn = useRef(null);
  const shouldMoveFocus = useRef(false);

  // Everything the simulation touches lives in refs, so a swinging card never re-renders React.
  const sim = useRef({
    pts: [],
    seg: 0,
    anchor: { x: CARD_W / 2, y: 0 },
    rest: { x: CARD_W / 2, y: HOLE_Y },
    rot: 0,
    running: false,
    raf: 0,
    last: 0,
    acc: 0,
    drag: null, // { dx, dy, tx, ty, vx, vy, lastT, startX, startY, moved }
  });
  const api = useRef({});

  useLayoutEffect(() => {
    const container = containerRef.current;
    const s = sim.current;

    const render = () => {
      const { pts } = s;
      const n = pts.length - 1;
      // smooth strap through the rope points
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < n; i += 1) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
      }
      d += ` L ${pts[n].x} ${pts[n].y}`;
      strapRef.current?.setAttribute('d', d);
      stitchRef.current?.setAttribute('d', d);

      const tail = pts[Math.max(0, n - 3)];
      const target = Math.max(-65, Math.min(65, (-Math.atan2(pts[n].x - tail.x, pts[n].y - tail.y) * 180) / Math.PI));
      s.rot += (target - s.rot) * 0.3;

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${pts[n].x - CARD_W / 2}px, ${pts[n].y - HOLE_Y}px, 0) rotate(${s.rot}deg)`;
      }
    };

    const reset = () => {
      const containerRect = container.getBoundingClientRect();
      const section = container.closest('section');
      const above = section ? containerRect.top - section.getBoundingClientRect().top : 0;
      const extend = Math.max(MIN_STRAP, above);
      const length = extend + HOLE_Y;

      s.anchor = { x: CARD_W / 2, y: -extend };
      s.rest = { x: CARD_W / 2, y: HOLE_Y };
      s.seg = length / SEGMENTS;
      s.pts = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
        const y = s.anchor.y + i * s.seg;
        return { x: s.anchor.x, y, px: s.anchor.x, py: y };
      });
      s.rot = 0;
      s.drag = null;
      render();
    };

    const step = () => {
      const { pts, seg, drag } = s;
      const n = pts.length - 1;

      for (let i = 1; i <= n; i += 1) {
        const p = pts[i];
        if (i === n && drag) {
          p.x = drag.tx;
          p.y = drag.ty;
          p.px = p.x;
          p.py = p.y;
        } else {
          const vx = (p.x - p.px) * DAMPING;
          const vy = (p.y - p.py) * DAMPING;
          p.px = p.x;
          p.py = p.y;
          p.x += vx;
          p.y += vy + GRAVITY;
        }
      }

      for (let k = 0; k < ITERATIONS; k += 1) {
        for (let i = 0; i < n; i += 1) {
          const a = pts[i];
          const c = pts[i + 1];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const dist = Math.hypot(dx, dy) || 1e-6;
          const diff = (dist - seg) / dist;
          const aFixed = i === 0;
          const cPinned = i + 1 === n && drag;
          if (aFixed && cPinned) continue;
          if (aFixed) {
            c.x -= dx * diff;
            c.y -= dy * diff;
          } else if (cPinned) {
            a.x += dx * diff;
            a.y += dy * diff;
          } else {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            c.x -= dx * diff * 0.5;
            c.y -= dy * diff * 0.5;
          }
        }
      }
    };

    const isSettled = () => {
      if (s.drag) return false;
      const { pts } = s;
      let movement = 0;
      for (let i = 1; i < pts.length; i += 1) {
        movement += Math.abs(pts[i].x - pts[i].px) + Math.abs(pts[i].y - pts[i].py);
      }
      return movement < 0.4 && Math.abs(pts[pts.length - 1].x - s.rest.x) < 0.6 && Math.abs(s.rot) < 0.1;
    };

    const frame = (now) => {
      // fixed 60 Hz steps so swing speed doesn't depend on the monitor's refresh rate
      s.acc += Math.min(now - s.last, 64);
      s.last = now;
      while (s.acc >= 1000 / 60) {
        step();
        s.acc -= 1000 / 60;
      }
      render();

      if (isSettled()) {
        s.running = false;
        return;
      }
      s.raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (s.running) return;
      s.running = true;
      s.last = performance.now();
      s.acc = 0;
      s.raf = requestAnimationFrame(frame);
    };

    const kick = (dx) => {
      if (reduced) return;
      const end = s.pts[s.pts.length - 1];
      end.px -= dx;
      wake();
    };

    api.current = { wake, kick, reset, render };

    reset();
    const section = container.closest('section');
    const ro = new ResizeObserver(() => reset());
    if (section) ro.observe(section);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.running = false;
    };
  }, [reduced]);

  // swing in when the intro animation ends
  useEffect(() => {
    if (!introDone || reduced) return;
    const s = sim.current;
    const end = s.pts[s.pts.length - 1];
    end.x += 130;
    end.y -= 30;
    api.current.wake();
  }, [introDone, reduced]);

  // after a flip, move focus to the control that is on the visible face
  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    (flipped ? backBtn : frontBtn).current?.focus({ preventScroll: true });
  }, [flipped]);

  const toggle = () => {
    shouldMoveFocus.current = true;
    setFlipped((v) => !v);
    api.current.kick(5);
  };

  const localPoint = (e) => {
    const r = containerRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('a, button')) return;
    const s = sim.current;
    const end = s.pts[s.pts.length - 1];
    const p = localPoint(e);
    e.currentTarget.setPointerCapture(e.pointerId);
    s.drag = {
      dx: end.x - p.x,
      dy: end.y - p.y,
      tx: end.x,
      ty: end.y,
      vx: 0,
      vy: 0,
      lastT: performance.now(),
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    api.current.wake();
  };

  const onPointerMove = (e) => {
    const s = sim.current;
    const d = s.drag;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > DRAG_THRESHOLD) d.moved = true;

    const p = localPoint(e);
    let tx = p.x + d.dx;
    let ty = p.y + d.dy;

    // the strap can't stretch: keep the card within one rope length of the anchor
    const length = s.seg * SEGMENTS;
    const ax = tx - s.anchor.x;
    const ay = ty - s.anchor.y;
    const dist = Math.hypot(ax, ay);
    if (dist > length) {
      tx = s.anchor.x + (ax / dist) * length;
      ty = s.anchor.y + (ay / dist) * length;
    }

    const now = performance.now();
    const frames = Math.max((now - d.lastT) / (1000 / 60), 0.5);
    d.vx = d.vx * 0.6 + ((tx - d.tx) / frames) * 0.4;
    d.vy = d.vy * 0.6 + ((ty - d.ty) / frames) * 0.4;
    d.lastT = now;
    d.tx = tx;
    d.ty = ty;
  };

  const endDrag = (e, cancelled) => {
    const s = sim.current;
    const d = s.drag;
    if (!d) return;
    s.drag = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);

    if (!d.moved && !cancelled) {
      toggle(); // a press without movement is a click
      return;
    }

    const end = s.pts[s.pts.length - 1];
    if (reduced) {
      api.current.reset();
      return;
    }
    // hand the pointer's velocity to the card so it keeps swinging
    const cap = (v) => Math.max(-40, Math.min(40, v));
    end.px = end.x - cap(d.vx);
    end.py = end.y - cap(d.vy);
    api.current.wake();
  };

  return (
    <motion.div
      className="relative flex-shrink-0 z-20 pt-20 md:pt-0"
      style={{ width: CARD_W }}
      initial={{ opacity: 0 }}
      animate={introDone ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div ref={containerRef} className="relative" style={{ width: CARD_W, height: CARD_H + HOLE_Y }}>
        {/* strap (decorative) */}
        <svg
          aria-hidden="true"
          className="absolute left-0 top-0 pointer-events-none"
          width={CARD_W}
          height={CARD_H + HOLE_Y}
          style={{ overflow: 'visible' }}
        >
          <path ref={strapRef} fill="none" stroke="#D7FF3D" strokeWidth="16" strokeLinecap="butt" strokeLinejoin="round" />
          <path ref={stitchRef} fill="none" stroke="#0A0A0C" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3 7" />
        </svg>

        {/* the badge */}
        <div
          ref={cardRef}
          role="group"
          aria-label={b.groupLabel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e, false)}
          onPointerCancel={(e) => endDrag(e, true)}
          className="absolute left-0 top-0 select-none cursor-grab active:cursor-grabbing will-change-transform"
          style={{ width: CARD_W, height: CARD_H, transformOrigin: `50% ${HOLE_Y}px`, touchAction: 'pan-y' }}
        >
          <div className="flip-scene">
            <div className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
              {/* FRONT */}
              <div
                className="flip-face group relative flex flex-col bg-ink border border-paper/15 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
                inert={flipped}
                aria-hidden={flipped}
              >
                <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-[14px] w-12 h-2.5 rounded-full bg-surface border border-line" />

                <div className="px-5 pt-9">
                  <div className="relative w-full aspect-square">
                    <div className="absolute -top-2 -left-2 w-full h-full border border-accent/60" aria-hidden="true" />
                    <img
                      src={profileImage}
                      alt="Vitor Noms"
                      draggable={false}
                      className="relative w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                    />
                  </div>
                </div>

                <div className="px-5 pt-5 flex-1">
                  <p className="font-mono text-[10px] tracking-widest text-accent/80">{b.index}</p>
                  <p className="mt-1 text-xl font-extrabold text-paper leading-tight">Vitor Noms Kuhn</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{b.role}</p>
                </div>

                <div className="px-5 pb-4 flex items-end justify-between gap-2">
                  <span className="font-mono text-[10px] text-muted">{b.place}</span>
                  <button
                    ref={frontBtn}
                    type="button"
                    onClick={toggle}
                    aria-expanded={flipped}
                    aria-controls={backId}
                    aria-label={b.flipLabel}
                    className={`inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wide text-paper hover:border-accent hover:text-accent transition-colors ${focusRing}`}
                  >
                    {b.flip} <FaRedoAlt className="text-[9px]" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* BACK */}
              <div
                id={backId}
                className="flip-face flip-back relative flex flex-col bg-surface border border-accent/40 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
                inert={!flipped}
                aria-hidden={!flipped}
              >
                <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-[14px] w-12 h-2.5 rounded-full bg-ink border border-line" />

                <div className="px-5 pt-9 flex-1 flex flex-col">
                  <p className="font-mono text-[10px] tracking-widest text-accent/80">{b.contact}</p>
                  <p className="mt-1 text-lg font-extrabold text-paper">Vitor Noms Kuhn</p>

                  <ul className="mt-4 flex flex-col gap-2">
                    {contactLinks.map(({ icon: Icon, title, detail, href }) => (
                      <li key={title}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group/link flex items-center gap-3 border border-line bg-ink px-3 py-2 hover:border-accent transition-colors ${focusRing}`}
                        >
                          <Icon className="text-lg text-muted group-hover/link:text-accent transition-colors" aria-hidden="true" />
                          <span className="min-w-0 text-left">
                            <span className="block text-xs font-semibold text-paper">{title}</span>
                            <span className="block truncate font-mono text-[10px] text-muted">{detail}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-5 pb-4 pt-3 flex items-center justify-between gap-3">
                  {/* decorative barcode */}
                  <span
                    aria-hidden="true"
                    className="h-6 flex-1 opacity-60"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #F5F5F0 0 2px, transparent 2px 5px, #F5F5F0 5px 6px, transparent 6px 10px)',
                    }}
                  />
                  <button
                    ref={backBtn}
                    type="button"
                    onClick={toggle}
                    aria-label={b.backLabel}
                    className={`inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wide text-paper hover:border-accent hover:text-accent transition-colors ${focusRing}`}
                  >
                    <FaArrowLeft className="text-[9px]" aria-hidden="true" /> {b.back}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted">{b.hint}</p>
    </motion.div>
  );
};

export default LanyardBadge;
