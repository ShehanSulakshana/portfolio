import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, Mail, Github, Linkedin, ExternalLink, Award, BookOpen, Compass } from 'lucide-react';
import { PROFILE_INFO, PROJECTS_DATA, CERTIFICATES_DATA, CAREER_PATHS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="relative w-full max-w-2xl my-auto max-h-[90dvh] sm:max-h-[88dvh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0" />
            <h2 id="resume-title" className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-mono truncate">
              Curriculum Vitae · Shehan Sulakshana
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors min-h-[36px]"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close CV modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-4 sm:p-7 space-y-6 overflow-y-auto flex-1">
          
          {/* Header Block */}
          <div className="border-b border-zinc-800/80 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {PROFILE_INFO.fullName}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-teal-400 mt-0.5">
                  Mobile Developer &amp; Cybersecurity Enthusiast
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  {PROFILE_INFO.location} · {PROFILE_INFO.degree} (Undergraduate)
                </p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-zinc-300 font-mono">
                <a href={`mailto:${PROFILE_INFO.email}`} className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{PROFILE_INFO.email}</span>
                </a>
                <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">github.com/ShehanSulakshana</span>
                </a>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Career Path & Learning Objectives */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2.5 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Target Career Tracks</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CAREER_PATHS.map((path) => (
                <div key={path.title} className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="font-semibold text-white mb-0.5">{path.title}</div>
                  <div className="text-[11px] text-teal-400 font-mono mb-1.5">{path.stage}</div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed mb-2">{path.description}</p>
                  <div className="text-[10px] font-mono text-zinc-400">Skills: {path.currentSkills.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Standing */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2.5 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Education</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">{PROFILE_INFO.degree}</span>
                <span className="text-xs text-zinc-400 font-mono">2025 – Present</span>
              </div>
              <div className="text-xs text-zinc-300">{PROFILE_INFO.institution}</div>
              <div className="pt-1 text-xs text-zinc-300 font-medium">
                Current Standing: 4.0 GPA across Year 1 coursework
              </div>
              <p className="text-[11px] text-zinc-400 pt-0.5 leading-relaxed">
                Core modules: Software Engineering Principles, Object-Oriented Programming, Database Management Systems, Computer Networks.
              </p>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2.5">
              Featured Projects
            </h3>
            <div className="space-y-2.5">
              {PROJECTS_DATA.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-bold text-white">{p.title}</span>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-mono shrink-0 ml-2"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-zinc-300 mb-1.5 leading-relaxed">{p.description}</p>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Stack: {p.techs.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certifications */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2.5 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              <span>Official Certifications</span>
            </h3>
            <div className="space-y-2">
              {CERTIFICATES_DATA.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-900 gap-2">
                  <div className="truncate">
                    <span className="font-medium text-zinc-200">{cert.title}</span>
                    <span className="text-zinc-500 ml-1 sm:ml-2">· {cert.issuer}</span>
                  </div>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 text-[11px] font-mono shrink-0"
                  >
                    Verify
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400 shrink-0">
          <span>Updated Oct 2026</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-lg border border-zinc-800 transition-colors min-h-[38px]"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
