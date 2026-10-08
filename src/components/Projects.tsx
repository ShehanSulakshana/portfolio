import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, Eye, X, Layers, Code, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'development' | 'security' | 'systems'>('all');
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const projects = PROJECTS_DATA;
  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const visibleProjects = expanded || activeCategory !== 'all' ? filtered : filtered.slice(0, 6);

  const categoryCounts = {
    all: projects.length,
    development: projects.filter((p) => p.category === 'development').length,
    security: projects.filter((p) => p.category === 'security').length,
    systems: projects.filter((p) => p.category === 'systems').length,
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px', amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header with scroll-triggered fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2">
              Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Mobile applications, cryptographic tools, and network utilities.
            </p>
          </div>

          {/* Clean Segmented Filter Controls with responsive layout and clear labels */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-1 p-1.5 sm:p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl w-full md:w-auto">
            {(
              [
                { key: 'all', label: 'All Projects', count: categoryCounts.all },
                { key: 'development', label: 'Mobile Apps', count: categoryCounts.development },
                { key: 'security', label: 'Security', count: categoryCounts.security },
                { key: 'systems', label: 'Web & Software', count: categoryCounts.systems },
              ] as const
            ).map((tab) => {
              const isSelected = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab.key);
                    setExpanded(false);
                  }}
                  className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-zinc-800 text-teal-300 shadow-sm border border-zinc-700/60 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 hover:-translate-y-0.5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] tabular-nums ${
                      isSelected ? 'text-teal-400/90 font-mono font-medium' : 'text-zinc-500'
                    }`}
                  >
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid with staggered scroll-triggered fade-in animations and hover lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: (index % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col bg-zinc-950/70 border border-zinc-800/90 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-950/20"
            >
              {/* Media Thumbnail Container with zero broken images policy */}
              <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden border-b border-zinc-800/80">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    if (el.parentElement) {
                      const fallback = el.parentElement.querySelector('.image-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />

                {/* Resilient fallback if remote or asset preview fails */}
                <div
                  className="image-fallback absolute inset-0 hidden items-center justify-center p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 text-center"
                >
                  <div>
                    <Code className="w-8 h-8 text-teal-400/60 mx-auto mb-2" />
                    <span className="text-xs font-mono text-zinc-400">{project.title}</span>
                  </div>
                </div>

                {/* Discrete status text overlay */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 group-hover:border-teal-500/30 text-[10px] font-mono text-zinc-300 transition-colors duration-200">
                  {project.status}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Clean unboxed category kicker without pill */}
                <div className="text-[11px] font-mono text-teal-400 uppercase tracking-wider mb-1">
                  {project.categoryLabel}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors duration-200 mb-1.5">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech stack metadata rendered as clean unboxed text with typographic separators */}
                <div className="mt-auto pt-3 border-t border-zinc-800/70 text-[11px] font-mono text-zinc-400 truncate group-hover:text-zinc-300 transition-colors">
                  {project.techs.join(' · ')}
                </div>

                {/* Interactive Card Action Links with hover interactions */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-800/50">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-teal-300 transition-all duration-200 hover:translate-x-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:scale-110 text-teal-400" />
                    <span>Architecture Details</span>
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-teal-400 hover:text-teal-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    title="View GitHub repository"
                  >
                    <span>Code</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More toggle for initial preview */}
        {activeCategory === 'all' && projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-center"
          >
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-teal-500/40 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-850 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 cursor-pointer"
            >
              <span>{expanded ? 'Collapse Project Index' : `View All ${projects.length} Projects`}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  expanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>
          </motion.div>
        )}

        {/* Project Architecture & Inspection Modal */}
        {selectedProject &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
            >
              <div
                className="relative w-full max-w-xl sm:max-w-2xl my-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90dvh] sm:max-h-[88dvh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Pinned Header */}
                <div className="flex items-start justify-between p-4 sm:p-6 pb-3 border-b border-zinc-800/80 bg-zinc-900/60 shrink-0">
                  <div className="pr-4">
                    <div className="text-xs font-mono uppercase text-teal-400 mb-1">
                      {selectedProject.categoryLabel} · Status: {selectedProject.status}
                    </div>
                    <h3 id="modal-project-title" className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {selectedProject.tagline}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
                    aria-label="Close project modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 overscroll-contain">
                  {/* Preview image */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overview */}
                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1.5">
                      Project Synopsis
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Key Architecture Points */}
                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2.5">
                      Technical Architecture Highlights
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {selectedProject.architectureDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Unboxed */}
                  <div className="pt-3.5 border-t border-zinc-800/80">
                    <div className="text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Engineered With:
                    </div>
                    <div className="text-xs font-mono text-zinc-300">
                      {selectedProject.techs.join(' · ')}
                    </div>
                  </div>
                </div>

                {/* Modal Actions — Pinned Footer with responsive buttons */}
                <div className="p-3 sm:px-6 py-3 border-t border-zinc-800/80 bg-zinc-900/60 shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 sm:bg-transparent transition-colors text-center min-h-[42px]"
                  >
                    Dismiss
                  </button>

                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm min-h-[42px]"
                  >
                    <Github className="w-4 h-4" />
                    <span>Inspect Source on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>,
            document.body
          )}

      </div>
    </motion.section>
  );
};
