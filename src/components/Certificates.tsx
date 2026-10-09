import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Eye, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { CERTIFICATES_DATA, Certificate } from '../data/portfolioData';

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!selectedCert) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  const certificates = CERTIFICATES_DATA;

  return (
    <div id="certificates" className="py-16 md:py-20">
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
              Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Certifications
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Accredited credentials in networking, cybersecurity, and software engineering.
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            5 Verified Certifications
          </div>
        </motion.div>

        {/* Certificates Grid with hover elevation and micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: (index % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col bg-zinc-950/70 border border-zinc-800/90 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-950/20"
            >
              {/* Certificate Image Frame with zoom on hover */}
              <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden border-b border-zinc-800/80">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Issuer watermark text */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 group-hover:border-teal-500/40 text-[10px] font-mono text-zinc-300 group-hover:text-teal-300 transition-colors duration-200">
                  {cert.issuerBadge || 'Verified'}
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-mono text-teal-400 mb-1">
                  {cert.issuer}
                </div>

                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors duration-200 mb-2">
                  {cert.title}
                </h3>

                {/* Validated skills metadata unboxed */}
                <div className="text-xs text-zinc-400 leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors duration-200">
                  {cert.skills.join(' · ')}
                </div>

                {/* Verification code if present */}
                {cert.credentialCode && (
                  <div className="text-[11px] font-mono text-zinc-500 mb-4">
                    Verification Code: <span className="text-teal-400 font-semibold">{cert.credentialCode}</span>
                  </div>
                )}

                {/* Card Actions with hover animations */}
                <div className="mt-auto pt-4 border-t border-zinc-800/70 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-teal-300 transition-all duration-200 hover:translate-x-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-400 transition-transform duration-200 group-hover/btn:scale-110" />
                    <span>View Certificate</span>
                  </button>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-teal-400 hover:text-teal-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Modal Lightbox */}
        {selectedCert &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
              onClick={() => setSelectedCert(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
            >
              <div
                className="relative w-full max-w-2xl my-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90dvh] sm:max-h-[88dvh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Pinned Header */}
                <div className="flex items-start justify-between p-4 sm:p-6 pb-3 border-b border-zinc-800/80 bg-zinc-900/60 shrink-0">
                  <div className="pr-4">
                    <div className="text-xs font-mono uppercase text-teal-400 mb-1">
                      Issued by {selectedCert.issuer}
                    </div>
                    <h3 id="cert-modal-title" className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {selectedCert.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
                    aria-label="Close certificate modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 overscroll-contain">
                  {/* Full Image Preview */}
                  <div className="relative aspect-[16/10] max-h-[42vh] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain bg-zinc-950"
                    />
                  </div>

                  {/* Competencies */}
                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1.5">
                      Validated Competencies
                    </h4>
                    <div className="text-xs font-mono text-zinc-300 leading-relaxed">
                      {selectedCert.skills.join(' · ')}
                    </div>
                  </div>

                  {selectedCert.credentialCode && (
                    <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-300">
                      Credential ID: <span className="text-teal-400 font-bold">{selectedCert.credentialCode}</span>
                    </div>
                  )}
                </div>

                {/* Modal Actions — Pinned Footer */}
                <div className="p-3 sm:px-6 py-3 border-t border-zinc-800/80 bg-zinc-900/60 shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 sm:bg-transparent transition-colors text-center min-h-[42px]"
                  >
                    Close
                  </button>

                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-sm min-h-[42px]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify at Issuer Authority</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>,
            document.body
          )}

      </div>
    </div>
  );
};
