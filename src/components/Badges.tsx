import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { BADGES_DATA, Badge } from '../data/portfolioData';
import { ExternalLink, X, Award } from 'lucide-react';

export const Badges: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (!selectedBadge) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBadge(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBadge]);

  const badges = BADGES_DATA;

  return (
    <div id="badges" className="mt-8 pt-8 pb-10 border-t border-zinc-800/60">
      {/* Subordinate Compact Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-200 tracking-tight">
              Skill Badges
            </h3>
            <p className="text-[11px] text-zinc-400">
              Lab tracks completed across Google Developers, Cisco, and Microsoft.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 self-start sm:self-auto shrink-0">
          {badges.length} Verified Badges
        </span>
      </motion.div>

      {/* Streamlined Compact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.3,
              delay: (index % 4) * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => setSelectedBadge(badge)}
            className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-900/80 border border-zinc-800/70 hover:border-teal-500/40 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedBadge(badge);
              }
            }}
          >
            {/* Compact Badge Icon */}
            <div className="w-11 h-11 rounded-lg bg-zinc-900/90 border border-zinc-800/90 group-hover:border-teal-500/30 p-1.5 shrink-0 flex items-center justify-center transition-colors duration-200">
              <img
                src={badge.img}
                alt={badge.title}
                className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Badge Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-mono text-teal-400 font-semibold truncate">
                  {badge.issuerType}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 tabular-nums shrink-0">
                  {badge.date}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-teal-300 truncate transition-colors duration-200">
                {badge.title}
              </h4>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5 group-hover:text-zinc-300 transition-colors duration-200">
                {badge.skills}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge Modal Dialog */}
      {selectedBadge &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
            onClick={() => setSelectedBadge(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="badge-modal-title"
          >
            <div
              className="relative w-full max-w-sm my-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 text-center shadow-2xl overflow-hidden max-h-[90dvh] sm:max-h-[88dvh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-zinc-900/80 border border-zinc-800 p-3 flex items-center justify-center mb-3.5">
                <img
                  src={selectedBadge.img}
                  alt={selectedBadge.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h4 id="badge-modal-title" className="text-base sm:text-lg font-bold text-white mb-1 pr-6 pl-6">
                {selectedBadge.title}
              </h4>

              <div className="text-xs text-zinc-400 mb-4">
                <strong>{selectedBadge.issuer}</strong> · <span className="font-mono">{selectedBadge.date}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 leading-relaxed mb-5 text-left">
                <div className="text-[10px] font-mono uppercase text-teal-400 font-semibold mb-1">
                  Validated Competencies:
                </div>
                {selectedBadge.skills}
              </div>

              <a
                href={selectedBadge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm min-h-[44px]"
              >
                <span>Verify Official Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
