import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full py-4 sm:py-6 flex items-center justify-center pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Soft, animated ambient glow wash centered behind the divider */}
        <motion.div
          animate={{
            opacity: [0.35, 0.6, 0.35],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-x-8 sm:inset-x-20 -top-3 h-8 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 45% 100% at 50% 50%, rgba(45, 212, 191, 0.18), transparent 75%)',
          }}
        />

        {/* Precision Architectural Hairline with graceful animated edge expansion */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.85 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[1px]"
        >
          {/* Base structural track fading out at edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />

          {/* Luminous center accent: soft teal sheen with gentle ambient glow */}
          <div className="absolute inset-y-0 left-1/4 right-1/4 bg-gradient-to-r from-transparent via-teal-400/25 to-transparent" />
          <div className="absolute inset-y-0 left-[38%] right-[38%] bg-gradient-to-r from-transparent via-teal-200/40 to-transparent shadow-[0_0_8px_rgba(45,212,191,0.25)]" />

          {/* Subtle animated traveling shimmer beam */}
          <motion.div
            className="absolute -top-[1px] h-[3px] w-24 sm:w-36 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/60 to-transparent blur-[0.5px]"
            animate={{
              left: ['25%', '75%', '25%'],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Minimalist central accent node */}
          <div className="absolute left-1/2 -top-[1.5px] -translate-x-1/2 w-1 h-1 rounded-full bg-teal-300/80 shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
        </motion.div>

      </div>
    </div>
  );
};

