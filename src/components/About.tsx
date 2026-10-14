import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, Variants } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import { SiFlutter, SiDart, SiPython, SiFirebase, SiLinux, SiGit, SiWireshark } from 'react-icons/si';
import { PROFILE_INFO } from '../data/portfolioData';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  padZero?: boolean;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  padZero = false,
  prefix = '',
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<string>(
    decimals > 0 ? (0).toFixed(decimals) : padZero ? '00' : '0'
  );

  useEffect(() => {
    if (!isInView) return;

    const startVal = value > 2000 ? value - 20 : 0;

    const controls = animate(startVal, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (decimals > 0) {
          setDisplayValue(latest.toFixed(decimals));
        } else {
          const rounded = Math.round(latest);
          setDisplayValue(padZero && rounded < 10 ? `0${rounded}` : `${rounded}`);
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, decimals, padZero]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };


  const techStack = [
    { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
    { name: 'Dart', icon: SiDart, color: '#0175C2' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Linux', icon: SiLinux, color: '#FCC624' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Wireshark', icon: SiWireshark, color: '#1679A7' },
  ];

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px', amount: 0.12 }}
      variants={containerVariants}
      className="py-10 md:py-14 lg:py-10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Top Split: Portrait on Left, Narrative & Value Props on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-8 lg:mb-8">
          
          {/* Left Column: Stylized Portrait Anchor */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[300px]">
              

              {/* Glowing Circular Bubble Backdrop */}
              <div className="relative mx-auto w-60 h-60 sm:w-64 sm:h-64 lg:w-72 lg:h-72 aspect-square flex items-center justify-center group">
                
                {/* Ambient glow and orbital ring behind bubble */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-teal-500/25 via-cyan-500/20 to-emerald-400/25 blur-2xl" />
                  <div className="absolute -inset-2 sm:-inset-3 rounded-full border border-teal-400/25 border-dashed animate-[spin_60s_linear_infinite]" />
                </div>

                {/* Bubble Surface & Transparent Profile Photo */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-teal-500/20 via-zinc-900/50 to-cyan-950/40 border-2 border-teal-400/40 shadow-2xl shadow-teal-950/50 flex items-end justify-center backdrop-blur-sm">
                  {/* Subtle top gloss highlight */}
                  <div className="absolute inset-x-8 top-2 h-16 rounded-full bg-gradient-to-b from-white/15 to-transparent blur-[1px] pointer-events-none z-10" />
                  
                  {/* Inner radial gradient */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(20,184,166,0.18),transparent_70%)] pointer-events-none" />

                  <img
                    src={PROFILE_INFO.profilePhoto}
                    alt={PROFILE_INFO.fullName}
                    className="relative z-10 w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gentle bottom edge blend */}
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-teal-950/60 to-transparent pointer-events-none z-20" />
                </div>

                {/* Floating Glassmorphism Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 z-30 p-2 sm:p-2.5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 shadow-xl shadow-black/70 flex items-center gap-2.5 whitespace-nowrap"
                >
                  <div className="p-1.5 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-tight">
                      Mobile &amp; Security
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      Flutter · Dart · Python
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>
          </motion.div>

          {/* Right Column: Narrative, 3 Value Props, CTA */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-4">
            
            {/* Section Kicker */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-teal-400 rounded-full" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-teal-400 font-semibold">
                ABOUT ME
              </span>
            </div>

            {/* Bold Greeting Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-3.5xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                {PROFILE_INFO.fullName}
              </span>
            </h2>

            {/* Description Body - Minimalist, Realistic, Content Writer Tone */}
            <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am an Information Technology undergraduate at the Open University of Sri Lanka with a focus on cross platform mobile development and defensive cybersecurity.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm">
                I build fast, responsive mobile applications using Flutter and Dart, alongside analyzing network traffic flows, packet data, and system vulnerabilities. I care deeply about writing maintainable code, implementing disciplined state architectures, and building software that holds up under real world conditions.
              </p>
            </div>

            {/* CTA Action Button */}
            <div className="pt-1">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-zinc-950 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>

        </div>

        {/* Bottom Section: Dual Row with Stats on Left + Tech Stack on Right */}
        <motion.div
          variants={itemVariants}
          className="pt-5 border-t border-zinc-850 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          
          {/* Bottom Left: Key Metrics with Animated Counter */}
          <div className="lg:col-span-5 flex items-center justify-start gap-6 sm:gap-10">
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-0.5">
                <AnimatedCounter value={9} padZero suffix="+" />
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">
                Projects Completed
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-teal-400 mb-0.5">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">
                Focus on Security
              </div>
            </div>
          </div>

          {/* Bottom Right: Horizontal Tech Stack Grid */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                TECH STACK
              </span>
              <div className="flex-1 h-px bg-zinc-850" />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="group flex flex-col items-center cursor-default"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-teal-500/40 group-hover:bg-zinc-900 group-hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" style={{ color: tech.color }} />
                    </div>
                    <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200 mt-1 transition-colors font-medium">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>

      </div>
    </motion.section>
  );
};
