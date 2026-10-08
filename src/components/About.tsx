import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { CAREER_PATHS } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px', amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2">
            About
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            I'm an Information Technology undergraduate at the Open University of Sri Lanka. I focus on practical learning through building—developing cross-platform Flutter applications while studying computer networking and hands-on system defense.
          </p>
        </motion.div>

        {/* Career Paths Breakdown */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Career Focus Areas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREER_PATHS.map((path, idx) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-teal-500/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-teal-950/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono text-teal-400 font-semibold">
                      {path.stage}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
                      {path.focus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors duration-200 mb-2">
                    {path.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {path.description}
                  </p>

                  {/* Skills pill-free unboxed metadata */}
                  <div className="pt-3 border-t border-zinc-800/70 text-xs font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 mb-4">
                    Stack: {path.currentSkills.join(' · ')}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/50 group-hover:bg-zinc-900/80 border border-zinc-800/70 group-hover:border-teal-500/30 text-xs text-zinc-300 leading-relaxed transition-all duration-300">
                  <span className="text-[10px] font-mono uppercase text-teal-400 block mb-0.5">Where I'm heading:</span>
                  {path.aspirations}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Grounded Metric Cards with hover lift and glowing borders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { metric: '09', title: 'Shipped Projects', subtitle: 'Flutter, Python & Systems', color: 'text-white' },
            { metric: '13', title: 'Verified Credentials', subtitle: 'Google, Cisco & Microsoft', color: 'text-teal-400' },
            { metric: '4.0', title: 'Current GPA', subtitle: 'OUSL Year 1 IT Modules', color: 'text-white' },
            { metric: '2025', title: 'Degree Commenced', subtitle: 'BSc (Hons) in Information Tech', color: 'text-teal-400' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-teal-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-teal-950/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className={`text-2xl sm:text-3xl font-extrabold ${card.color} tabular-nums mb-1 transition-transform duration-300 group-hover:scale-105 origin-left`}>
                {card.metric}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-teal-300 transition-colors duration-200">{card.title}</div>
                <div className="text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 mt-0.5">{card.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};
