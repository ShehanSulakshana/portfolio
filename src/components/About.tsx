import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useSpring,
  useTime,
  useTransform,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SiFlutter, SiDart, SiPython, SiFirebase, SiLinux, SiGit, SiWireshark } from 'react-icons/si';
import { PROFILE_INFO } from '../data/portfolioData';
// Tip: use the transparent PNG cutout for the best head pop-out effect
import profileImage from '../assets/images/regenerated_image_1791991636550.jpg';

const BUBBLE_COLOR = '#119F78';

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

/**
 * Smooth bubble: 8 anchor points on an ellipse (objectBoundingBox units).
 * Each anchor only moves inward along its radius, and the outline is built
 * with a closed Catmull-Rom spline converted to cubic Béziers, so tangents
 * are continuous at every anchor: no corners, no flat clipped edges.
 */
const BLOB_POINTS = 8;
const BLOB_CX = 0.5;
const BLOB_CY = 0.57;
const BLOB_RX = 0.46;
const BLOB_RY = 0.41;

// Central "head room" so the head can rise above the bubble (no full-width cut)
const HEAD_AREA_PATH = 'M0.22,0 H0.78 V0.55 H0.22 Z';

const buildBlobPath = (t: number, amp: number) => {
  const pts: [number, number][] = [];
  for (let k = 0; k < BLOB_POINTS; k++) {
    const angle = (k * 2 * Math.PI) / BLOB_POINTS - Math.PI / 2;
    const wobble = 0.5 + 0.5 * Math.sin(t * 0.0009 * (0.8 + (k % 3) * 0.2) + k * 1.9);
    const m = 1 - 0.045 * amp * wobble; // only shrinks, so it never leaves the box
    pts.push([BLOB_CX + BLOB_RX * Math.cos(angle) * m, BLOB_CY + BLOB_RY * Math.sin(angle) * m]);
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < BLOB_POINTS; i++) {
    const p0 = pts[(i - 1 + BLOB_POINTS) % BLOB_POINTS];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % BLOB_POINTS];
    const p3 = pts[(i + 2) % BLOB_POINTS];
    d +=
      ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6}` +
      ` ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6}` +
      ` ${p2[0]},${p2[1]}`;
  }
  return d + ' Z';
};

export const About: React.FC = () => {
  const reduceMotion = useReducedMotion();

  // Bubble animation + interaction state
  const time = useTime();
  const hoverAmp = useSpring(1, { stiffness: 60, damping: 14 });
  const blobPath = useTransform([time, hoverAmp], ([t, a]) =>
    buildBlobPath(t as number, reduceMotion ? 0 : (a as number))
  );

  const mouseX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const imgX = useTransform(mouseX, (v) => (reduceMotion ? 0 : v * 18));
  const imgY = useTransform(mouseY, (v) => (reduceMotion ? 0 : v * 8));
  const blobX = useTransform(mouseX, (v) => (reduceMotion ? 0 : v * -10));
  const blobY = useTransform(mouseY, (v) => (reduceMotion ? 0 : v * -6));
  const pulse = useMotionValue(1);

  const handlePointerEnter = () => hoverAmp.set(2.4);
  const handlePointerLeave = () => {
    hoverAmp.set(1);
    mouseX.set(0);
    mouseY.set(0);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleClick = () => {
    if (!reduceMotion) animate(pulse, [1, 1.06, 1], { duration: 0.45, ease: 'easeOut' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="about-portrait-clip" clipPathUnits="objectBoundingBox">
            <motion.path d={blobPath} />
            <path d={HEAD_AREA_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center mb-8">
          {/* Left: Animated, interactive portrait bubble */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div
              className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] aspect-square cursor-pointer select-none"
              onPointerEnter={handlePointerEnter}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handleClick}
            >
              {/* Idle floating */}
              <motion.div
                className="absolute inset-0"
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Blob + clipped portrait move together; portrait shifts inside for parallax */}
                <motion.div
                  className="absolute inset-0 origin-bottom"
                  style={{ x: blobX, y: blobY, scale: pulse }}
                >
                  <svg
                    viewBox="0 0 1 1"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                    aria-hidden="true"
                  >
                    <motion.path d={blobPath} fill={BUBBLE_COLOR} />
                  </svg>

                  <div className="absolute inset-0" style={{ clipPath: 'url(#about-portrait-clip)' }}>
                    <motion.img
                      src={profileImage}
                      alt={PROFILE_INFO.fullName}
                      loading="lazy"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-contain object-bottom origin-bottom"
                      style={{ x: imgX, y: imgY, scale: 1.05 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Chip overlapping the portrait (wrapper handles centering so framer's transform doesn't clash) */}
              <div className="absolute inset-x-0 bottom-[7%] z-30 flex justify-center pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-semibold whitespace-nowrap border-2"
                  style={{ borderColor: BUBBLE_COLOR }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BUBBLE_COLOR }}
                  />
                  Mobile App Developer
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-teal-400 rounded-full" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-teal-400 font-semibold">
                ABOUT ME
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                {PROFILE_INFO.fullName}
              </span>
            </h2>

            <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am an Information Technology undergraduate at the Open University of Sri Lanka with a focus on cross platform mobile development and defensive cybersecurity.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm">
                I build fast, responsive mobile applications using Flutter and Dart, alongside analyzing network traffic flows, packet data, and system vulnerabilities. I care deeply about writing maintainable code, implementing disciplined state architectures, and building software that holds up under real world conditions.
              </p>
            </div>

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

        {/* Bottom: Stats + Tech Stack */}
        <motion.div
          variants={itemVariants}
          className="pt-5 border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          <div className="lg:col-span-5 flex items-center justify-start gap-6 sm:gap-10">
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-0.5">
                <AnimatedCounter value={9} padZero suffix="+" />
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">Projects Completed</div>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            {/* CHANGED: replaced "100% Focus on Security" */}
            <div>
              <div className="flex items-center gap-2 text-xl sm:text-2xl font-mono font-bold text-teal-400 mb-0.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
                </span>
                Open for Freelance
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">
                Mobile · Web · Automation
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                TECH STACK
              </span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.name} className="group flex flex-col items-center cursor-default">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-teal-500/40 group-hover:bg-zinc-900 group-hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                      <Icon
                        className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                        style={{ color: tech.color }}
                      />
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