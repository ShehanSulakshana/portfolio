import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Smartphone, Network, Server, Code, CheckCircle } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

export const Timeline: React.FC = () => {
  const milestoneIcons: Record<number, React.ReactNode> = {
    0: <BookOpen className="w-4 h-4 text-teal-400" />,
    1: <Smartphone className="w-4 h-4 text-teal-400" />,
    2: <Network className="w-4 h-4 text-teal-400" />,
    3: <Server className="w-4 h-4 text-teal-400" />,
    4: <Code className="w-4 h-4 text-teal-400" />,
    5: <Award className="w-4 h-4 text-amber-300" />,
  };

  return (
    <motion.section
      id="journey"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px', amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-20"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Section Header with scroll-triggered fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2">
            Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Experience &amp; Education
          </h2>
          <p className="text-sm text-zinc-400">
            Key academic milestones, project builds, and technical certifications.
          </p>
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {TIMELINE_DATA.map((item, index) => {
            const isHighlight = item.highlight;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Node indicator with scale and glow on hover */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isHighlight
                      ? 'bg-amber-950/80 border-amber-400/80 shadow-md shadow-amber-500/20 group-hover:scale-110 group-hover:shadow-amber-500/40'
                      : 'bg-zinc-950 border-zinc-800 group-hover:border-teal-400/80 group-hover:scale-115 group-hover:shadow-lg group-hover:shadow-teal-500/20'
                  }`}
                >
                  {milestoneIcons[index] || <Code className="w-4 h-4 text-zinc-400" />}
                </div>

                {/* Milestone Card with hover elevation and border glow */}
                <div
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 ${
                    isHighlight
                      ? 'bg-zinc-950 border-amber-500/40 hover:border-amber-400/70 shadow-lg shadow-black/60 hover:shadow-2xl hover:shadow-amber-950/30'
                      : 'bg-zinc-950/70 hover:bg-zinc-950 border-zinc-800/90 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-950/20'
                  }`}
                >
                  {/* Date & Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-teal-400 group-hover:text-teal-300 transition-colors duration-200">
                      {item.date}
                    </span>
                    {isHighlight && (
                      <span className="text-[11px] font-mono text-amber-300 flex items-center gap-1 font-semibold">
                        <Award className="w-3.5 h-3.5" />
                        <span>Highest Academic Distinction</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors duration-200 mb-1">
                    {item.title}
                  </h3>

                  <div className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 mb-3">
                    {item.institution}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};
