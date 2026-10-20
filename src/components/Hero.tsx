import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeroOrbitVisual } from './HeroOrbitVisual';

interface HeroProps {
  onOpenResume?: () => void;
}

// Subtle, high-end entrance animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const terminalVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bioVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Hero: React.FC<HeroProps> = () => {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-3 sm:gap-4 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          
          {/* Section 1 (Top Priority): Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 lg:row-start-1 text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0"
          >
            {/* Display Headline: Greeting and Name split into separate prominent lines */}
            <motion.h1
              variants={headlineVariants}
              className="text-white mb-1.5 sm:mb-2 lg:mb-5"
            >
              <span className="block text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold text-zinc-300 tracking-tight leading-tight mb-1 sm:mb-1.5">
                Hey, I'm
              </span>
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem] font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent leading-[1.05] [text-wrap:balance]">
                Shehan Sulakshana
              </span>
            </motion.h1>
          </motion.div>

          {/* Section 2: Orbiting Tech Stack & Avatar Showcase (In Middle on Responsive Screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 w-full flex flex-col items-center justify-center shrink-0 my-0"
          >
            <HeroOrbitVisual />
          </motion.div>

          {/* Section 3: Rest of Text Side (Slogan, Editorial Bio, Action CTAs) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 lg:row-start-2 text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0 mt-1 sm:mt-2 lg:mt-0"
          >
            {/* Dynamic Slogan: "Code. Secure. Deploy." with high-end UI/UX */}
            <motion.div
              variants={terminalVariants}
              className="flex items-center justify-center lg:justify-start mb-3 sm:mb-4"
            >
              {/* Code-comment slogan: // Code. Secure. Deploy. */}
              <div className="font-mono text-xs sm:text-sm tracking-wide select-none">
                <span className="text-zinc-500 mr-2 font-normal">//</span>
                <span className="text-zinc-400 font-medium">Code. Secure. Deploy.</span>
              </div>
            </motion.div>

            {/* Minimalist, clear bio conveying core skills at first glance */}
            <motion.p
              variants={bioVariants}
              className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg mb-6 sm:mb-7 mx-auto lg:mx-0"
            >
              Mobile developer building clean, secure apps with{' '}
              <span className="text-zinc-100 font-medium">Flutter</span> &amp;{' '}
              <span className="text-zinc-100 font-medium">Firebase</span>, with a strong focus on{' '}
              <span className="text-teal-300 font-medium">cybersecurity</span>.
            </motion.p>

            {/* Primary Action Row with mobile-friendly buttons */}
            <motion.div
              variants={ctaVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto lg:mx-0"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all duration-300 shadow-md shadow-teal-500/15 hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer min-h-[44px]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ease-out" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/60 active:translate-y-0 whitespace-nowrap cursor-pointer min-h-[44px]"
              >
                <span>Get in Touch</span>
              </a>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
