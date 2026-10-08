import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenStarfield?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStarfield }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['home', 'about', 'projects', 'certificates', 'journey', 'skills', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Credentials', href: '#certificates', id: 'certificates' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-xl shadow-black/50 py-3 sm:py-3.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark with hover interaction */}
        <a
          href="#home"
          className="group text-base sm:text-lg font-bold tracking-tight text-white hover:text-teal-300 transition-all duration-200 whitespace-nowrap"
        >
          <span className="inline-block transition-transform duration-200 group-hover:scale-[1.02]">
            {PROFILE_INFO.fullName}
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links with hover micro-animations (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-zinc-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-all duration-200 hover:text-white hover:-translate-y-0.5 whitespace-nowrap group ${
                  isActive ? 'text-teal-300 font-semibold' : ''
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full shadow-sm shadow-teal-400/50" />
                ) : (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400/0 rounded-full transition-all duration-200 group-hover:bg-teal-400/60 group-hover:shadow-sm" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action with hover micro-animation */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {onOpenStarfield && (
            <button
              type="button"
              onClick={onOpenStarfield}
              className="group inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-teal-500/40 rounded-lg transition-all duration-200 cursor-pointer"
              title="Open Visitor Starfield Canvas"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Starfield</span>
            </button>
          )}

          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </header>
  );
};
