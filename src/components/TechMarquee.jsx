import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

const MID = Math.ceil(skillsData.length / 2);
const ROW_ONE = skillsData.slice(0, MID);
const ROW_TWO = skillsData.slice(MID);

// Each half of the track repeats the list so it always overflows wide screens.
// The track is two identical halves, so translating by -50% loops seamlessly.
const HALF_REPEAT = 3;

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="marquee-row">
    <ul className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
      {[0, 1].map((half) =>
        Array.from({ length: HALF_REPEAT }).flatMap((_, rep) =>
          items.map((skill) => (
            <li
              key={`${half}-${rep}-${skill.name}`}
              className="group mr-6 shrink-0 w-14 h-14 border border-line bg-surface flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
              title={skill.name}
            >
              <span className="w-7 h-7 flex items-center justify-center">
                {React.cloneElement(skill.icon, { className: 'w-full h-full' })}
              </span>
            </li>
          ))
        )
      )}
    </ul>
  </div>
);

/**
 * Decorative two-row icon marquee (rows scroll in opposite directions).
 * Hidden from assistive tech: the Skills section already lists every tool.
 */
const TechMarquee = () => (
  <motion.div
    aria-hidden="true"
    className="space-y-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9 }}
  >
    <MarqueeRow items={ROW_ONE} />
    <MarqueeRow items={ROW_TWO} reverse />
  </motion.div>
);

export default TechMarquee;
