import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionDivider } from './components/SectionDivider';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Badges } from './components/Badges';
import { Timeline } from './components/Timeline';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TerminalChat } from './components/TerminalChat';
import { VisitorUniverseCanvas } from './components/VisitorUniverseCanvas';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-zinc-100 font-sans selection:bg-teal-500/20 selection:text-teal-300">
      {/* Subtle ambient background canvas */}
      <ParticleBackground enabled={true} />

      {/* Horizontal Scroll Progress Bar */}
      <ScrollProgress />

      {/* Top Bar Contract Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Page Content */}
      <main className="relative z-10 pb-20 md:pb-0">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />

        {/* Credentials Section (Certificates + Verified Badges) */}
        <motion.section
          id="credentials"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px 0px', amount: 0.08 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Certificates />
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Badges />
          </div>
        </motion.section>

        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Native App-like Floating Bottom Navigation for Mobile Devices */}
      <MobileBottomNav onOpenResume={() => setIsResumeOpen(true)} />

      {/* Floating Interactive Terminal & Chat System */}
      <TerminalChat onOpenResume={() => setIsResumeOpen(true)} />

      {/* Floating Visitor Universe Canvas Demo Feature */}
      <VisitorUniverseCanvas />

      {/* Executive Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
