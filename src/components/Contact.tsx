import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  AlertCircle,
  Loader2,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { 
  FaWhatsapp, 
  FaGithub, 
  FaLinkedinIn, 
  FaFacebookF 
} from 'react-icons/fa6';
import { PROFILE_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = PROFILE_INFO.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: PROFILE_INFO.web3FormsKey,
          subject: `Portfolio Inquiry from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.status === 200 || result.success) {
        setStatus('success');
        setStatusMessage('Thank you! Your message was delivered directly to my inbox. I will reply promptly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Unable to deliver message via contact form. Please reach out via direct email.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network connection interruption. Please contact me directly at ' + email);
    }
  };

  return (
    <motion.section
      id="contact"
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
          className="max-w-2xl mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2">
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Open for mobile app projects, internships, and security inquiries. Get in touch below.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Status card */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Availability Notice
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Open for Engineering Roles &amp; Freelance
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Available for mobile development projects, internships, and contracts. Typical response within 24 hours.
              </p>
            </div>

            {/* Direct Email with copy */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90">
              <div className="text-xs font-mono text-zinc-400 mb-2">Direct Email Address:</div>
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <a
                  href={`mailto:${email}`}
                  className="text-xs sm:text-sm font-mono text-teal-300 hover:underline truncate"
                >
                  {email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Verified Communication Channels with realistic brand badges */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PROFILE_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 hover:border-emerald-500/50 hover:bg-zinc-900/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30 text-xs font-medium text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {/* Realistic WhatsApp Badge */}
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#2fe06e] via-[#25d366] to-[#1da851] flex items-center justify-center shrink-0 shadow-md shadow-[#25d366]/30 group-hover:shadow-lg group-hover:shadow-[#25d366]/40 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-x-1.5 top-0.5 h-1 bg-white/30 rounded-full blur-[0.4px]" />
                  <FaWhatsapp className="w-4 h-4 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                    WhatsApp
                  </div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                    Instant Chat
                  </div>
                </div>
              </a>

              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-600 hover:bg-zinc-900/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 text-xs font-medium text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {/* Realistic GitHub Badge */}
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#383f4a] via-[#24292f] to-[#161b22] border border-white/10 flex items-center justify-center shrink-0 shadow-md shadow-black/60 group-hover:shadow-lg group-hover:shadow-black/80 group-hover:border-white/20 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-x-1.5 top-0.5 h-1 bg-white/20 rounded-full blur-[0.4px]" />
                  <FaGithub className="w-4 h-4 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-white group-hover:text-zinc-200 transition-colors truncate">
                    GitHub
                  </div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                    Repositories
                  </div>
                </div>
              </a>

              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 hover:border-blue-500/50 hover:bg-zinc-900/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30 text-xs font-medium text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {/* Realistic LinkedIn Badge */}
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#127be5] via-[#0a66c2] to-[#00478e] flex items-center justify-center shrink-0 shadow-md shadow-[#0a66c2]/30 group-hover:shadow-lg group-hover:shadow-[#0a66c2]/45 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-x-1.5 top-0.5 h-1 bg-white/30 rounded-full blur-[0.4px]" />
                  <FaLinkedinIn className="w-3.5 h-3.5 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    LinkedIn
                  </div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                    Professional
                  </div>
                </div>
              </a>

              <a
                href={PROFILE_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 hover:border-indigo-500/50 hover:bg-zinc-900/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 text-xs font-medium text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {/* Realistic Facebook Badge */}
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#2a87ff] via-[#1877f2] to-[#0b5cd5] flex items-center justify-center shrink-0 shadow-md shadow-[#1877f2]/30 group-hover:shadow-lg group-hover:shadow-[#1877f2]/45 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-x-1.5 top-0.5 h-1 bg-white/30 rounded-full blur-[0.4px]" />
                  <FaFacebookF className="w-3.5 h-3.5 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                    Facebook
                  </div>
                  <div className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                    Social Profile
                  </div>
                </div>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Web3Forms Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white tracking-tight mb-1">
              Send a Secure Message
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Transmitted directly to shehansulakshana01@gmail.com.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ruwan Perera"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Message Details
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquiry scope, project details, or questions..."
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors resize-y"
                />
              </div>

              {/* Status alerts */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-800/80 text-teal-300 text-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-400/25 active:translate-y-0 disabled:opacity-60 transition-all duration-300 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
