import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring physics for organic, stutter-free progress tracking
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-zinc-900/30 backdrop-blur-[1px] pointer-events-none"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 origin-left shadow-[0_0_8px_rgba(45,212,191,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};
