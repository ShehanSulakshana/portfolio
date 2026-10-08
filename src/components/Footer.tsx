import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, MessageSquare } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px 0px', amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-zinc-800/80 bg-zinc-950 pt-12 pb-28 md:py-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/70">
          
          {/* Brand & Editorial Description */}
          <div className="text-center md:text-left">
            <span className="text-base font-bold text-white tracking-tight">
              {PROFILE_INFO.fullName}
            </span>
            <p className="text-xs text-zinc-400 mt-1 max-w-md">
              BSc (Hons) Information Technology Undergraduate at OUSL · Mobile Developer &amp; Cybersecurity Enthusiast
            </p>
          </div>

          {/* Quick Section Anchors with hover animations */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <a href="#about" className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block">About</a>
            <a href="#projects" className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block">Projects</a>
            <a href="#certificates" className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block">Credentials</a>
            <a href="#journey" className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block">Journey</a>
            <a href="#skills" className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block">Skills</a>
            <a href="#contact" className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block">Contact</a>
          </div>

          {/* Back to top with hover animation */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group p-2.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-teal-500/40 text-zinc-400 hover:text-white hover:-translate-y-1 hover:shadow-md hover:shadow-teal-500/20 transition-all duration-200 flex items-center gap-1.5 text-xs cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Copyright notice & Verified Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© 2026 Shehan Sulakshana. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              GitHub
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              WhatsApp
            </a>
            <a
              href={PROFILE_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
