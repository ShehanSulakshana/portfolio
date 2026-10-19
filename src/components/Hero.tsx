import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
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

const kickerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
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
  const lines = PROFILE_INFO.terminalLines;

  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = lines[currentLine];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex <= text.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentLine((prev) => (prev + 1) % lines.length);
        }
      }
    }, isDeleting ? 30 : 65);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentLine, lines]);

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-16">
          
          {/* Left Column: Heading, Terminal, Career Trajectory, CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0"
          >
            
            {/* Career Path Kicker without overemphasis */}
            <motion.div
              variants={kickerVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-zinc-400 mb-3 sm:mb-4"
            >
              <span className="text-teal-400 font-semibold">Mobile Developer</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-300">Cybersecurity Enthusiast</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">OUSL IT Undergraduate</span>
            </motion.div>

            {/* Display Headline with balanced wrap and polished typography */}
            <motion.h1
              variants={headlineVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 [text-wrap:balance] leading-[1.14]"
            >
              Hey, I'm <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">Shehan Sulakshana</span>
            </motion.h1>

            {/* Interactive Terminal Cycler */}
            <motion.div
              variants={terminalVariants}
              className="w-full max-w-full sm:max-w-lg mx-auto lg:mx-0 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden mb-5 sm:mb-6 text-left shadow-2xl"
            >
              <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 bg-zinc-900 border-b border-zinc-800 text-[10px] sm:text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-1.5 sm:ml-2 text-zinc-400 truncate">shehanss@terminal:~</span>
                </div>
                <span className="text-zinc-600 hidden sm:inline">bash</span>
              </div>
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-xs sm:text-sm flex items-center min-h-[40px] sm:min-h-[44px]">
                <span className="text-teal-400 mr-2 select-none">$</span>
                <span className="text-zinc-100 font-medium truncate">
                  {lines[currentLine].substring(0, charIndex)}
                </span>
                <span className="w-2 h-4 bg-teal-400 animate-pulse ml-0.5 shrink-0" />
              </div>
            </motion.div>

            {/* Editorial Bio */}
            <motion.p
              variants={bioVariants}
              className="text-xs sm:text-sm md:text-base text-zinc-300 sm:text-zinc-400 leading-relaxed max-w-xl mb-6 sm:mb-8 mx-auto lg:mx-0"
            >
              Building cross-platform mobile apps with Flutter &amp; Firebase, and exploring cybersecurity &amp; networking. Open to freelance projects and internships.
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

          {/* Right Column: Orbiting Tech Stack & Avatar Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-auto flex flex-col items-center justify-center shrink-0"
          >
            <HeroOrbitVisual />
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
