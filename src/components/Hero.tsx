import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

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
      className="relative pt-28 pb-16 md:pt-40 md:pb-28"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
          
          {/* Left Column: Heading, Terminal, Career Trajectory, CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left w-full"
          >
            
            {/* Career Path Kicker without overemphasis */}
            <motion.div
              variants={kickerVariants}
              className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono text-zinc-400 mb-4"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 [text-wrap:balance] leading-[1.12]"
            >
              Hey, I'm <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">Shehan Sulakshana</span>
            </motion.h1>

            {/* Interactive Terminal Cycler */}
            <motion.div
              variants={terminalVariants}
              className="w-full max-w-lg mx-auto md:mx-0 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden mb-6 text-left shadow-2xl"
            >
              <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-zinc-400">shehanss@terminal:~</span>
                </div>
                <span className="text-zinc-600 hidden sm:inline">bash</span>
              </div>
              <div className="px-4 py-3 font-mono text-sm flex items-center min-h-[44px]">
                <span className="text-teal-400 mr-2 select-none">$</span>
                <span className="text-zinc-100 font-medium">
                  {lines[currentLine].substring(0, charIndex)}
                </span>
                <span className="w-2 h-4 bg-teal-400 animate-pulse ml-0.5" />
              </div>
            </motion.div>

            {/* Editorial Bio */}
            <motion.p
              variants={bioVariants}
              className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8 mx-auto md:mx-0"
            >
              Building cross-platform mobile apps with Flutter &amp; Firebase, and exploring cybersecurity &amp; networking. Open to freelance projects and internships.
            </motion.p>

            {/* Primary Action Row with rich tactile hover animations */}
            <motion.div
              variants={ctaVariants}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3.5"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all duration-300 shadow-md shadow-teal-500/15 hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ease-out" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/60 active:translate-y-0 whitespace-nowrap cursor-pointer"
              >
                <span>Get in Touch</span>
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Portrait Photo Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-auto flex flex-col items-center justify-center shrink-0"
          >
            <div className="relative flex flex-col items-center text-center">
              
              {/* Viewport Frame Container */}
              <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl p-1 bg-gradient-to-tr from-teal-500/30 via-zinc-800/80 to-zinc-900 border border-zinc-800 shadow-2xl shadow-black/80 hover:border-teal-500/50 transition-all duration-500 flex items-center justify-center overflow-hidden group">
                {/* Subtle ambient backglow */}
                <div className="absolute -inset-1 rounded-3xl bg-teal-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <img
                  src={PROFILE_INFO.profilePhoto}
                  alt={PROFILE_INFO.fullName}
                  className="w-full h-full object-cover rounded-[22px] transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Status footer tag centered below showcase with hover glow */}
              <div className="mt-4 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 hover:border-teal-500/40 hover:bg-zinc-900 text-[11px] font-mono text-zinc-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open to Freelance Projects &amp; Internships</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
