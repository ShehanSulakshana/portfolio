import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Layers, Award, Compass, Cpu, Send } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenResume?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'credentials', 'journey', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'about') {
              setActiveTab('home');
            } else if (id === 'certificates') {
              setActiveTab('credentials');
            } else {
              setActiveTab(id);
            }
          }
        }
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: User, href: '#home' },
    { id: 'projects', label: 'Projects', icon: Layers, href: '#projects' },
    { id: 'credentials', label: 'Credentials', icon: Award, href: '#credentials' },
    { id: 'journey', label: 'Journey', icon: Compass, href: '#journey' },
    { id: 'skills', label: 'Skills', icon: Cpu, href: '#skills' },
    { id: 'contact', label: 'Contact', icon: Send, href: '#contact' },
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveTab(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom App Navigation"
      className="md:hidden fixed bottom-4 inset-x-2.5 sm:inset-x-4 z-40 max-w-md mx-auto pointer-events-auto"
    >
      <div className="relative p-1 sm:p-1.5 rounded-2xl bg-[#090b10]/90 backdrop-blur-2xl border border-zinc-800/90 shadow-2xl shadow-black/95 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href, item.id);
              }}
              className={`relative flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all active:scale-95 ${
                isActive ? 'text-teal-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {/* Active highlighted ambient background */}
              {isActive && (
                <motion.div
                  layoutId="active-mobile-pill"
                  className="absolute inset-0 bg-zinc-800/70 border border-zinc-700/60 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon & indicator */}
              <div className="relative z-10 flex items-center justify-center">
                <Icon
                  className={`w-[17px] h-[17px] transition-colors duration-200 ${
                    isActive ? 'text-teal-400' : 'text-zinc-400'
                  }`}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-[9.5px] sm:text-[10px] tracking-tight mt-0.5 leading-none transition-colors whitespace-nowrap ${
                  isActive ? 'text-teal-300 font-bold' : 'text-zinc-400 font-medium'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
