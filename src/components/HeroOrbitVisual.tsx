import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiSupabase,
  SiPython,
  SiWireshark,
  SiParrotsecurity,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import avatarImg from '../assets/images/My-avatar.png';

interface TechItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glowDim: string;
  borderColorDim: string;
  bgGradient: string;
}

// 8 Core Technologies in 4 Balanced Orbits (2 Items per Orbit, 180° Apart)

// Orbit 1: Inner (Mobile Core - Flutter & Dart)
const ORBIT_1_TECH: TechItem[] = [
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Cross-Platform Framework',
    icon: SiFlutter,
    color: '#38BDF8',
    glowDim: 'rgba(56, 189, 248, 0.45)',
    borderColorDim: 'rgba(56, 189, 248, 0.35)',
    bgGradient: 'from-sky-950/90 to-blue-900/50',
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'Client Language',
    icon: SiDart,
    color: '#00D2C4',
    glowDim: 'rgba(0, 210, 196, 0.45)',
    borderColorDim: 'rgba(0, 210, 196, 0.35)',
    bgGradient: 'from-teal-950/90 to-cyan-900/50',
  },
];

// Orbit 2: Mid-Inner (Cloud & Databases - Firebase & Supabase)
const ORBIT_2_TECH: TechItem[] = [
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'Auth & Cloud Backend',
    icon: SiFirebase,
    color: '#FFCA28',
    glowDim: 'rgba(255, 202, 40, 0.45)',
    borderColorDim: 'rgba(255, 202, 40, 0.35)',
    bgGradient: 'from-amber-950/90 to-orange-900/50',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Realtime Database',
    icon: SiSupabase,
    color: '#3ECF8E',
    glowDim: 'rgba(62, 207, 142, 0.45)',
    borderColorDim: 'rgba(62, 207, 142, 0.35)',
    bgGradient: 'from-emerald-950/90 to-teal-900/50',
  },
];

// Orbit 3: Mid-Outer (Core Languages - Python & Java)
const ORBIT_3_TECH: TechItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Automation & Security Scripts',
    icon: SiPython,
    color: '#60A5FA',
    glowDim: 'rgba(96, 165, 250, 0.45)',
    borderColorDim: 'rgba(96, 165, 250, 0.35)',
    bgGradient: 'from-blue-950/90 to-indigo-900/50',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'OOP & Core Systems',
    icon: FaJava,
    color: '#F87171',
    glowDim: 'rgba(248, 113, 113, 0.45)',
    borderColorDim: 'rgba(248, 113, 113, 0.35)',
    bgGradient: 'from-rose-950/90 to-red-900/50',
  },
];

// Orbit 4: Outer (Security & Network Lab - Wireshark & Parrot OS)
const ORBIT_4_TECH: TechItem[] = [
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Packet & Protocol Analysis',
    icon: SiWireshark,
    color: '#38BDF8',
    glowDim: 'rgba(56, 189, 248, 0.45)',
    borderColorDim: 'rgba(56, 189, 248, 0.35)',
    bgGradient: 'from-sky-950/90 to-blue-900/50',
  },
  {
    id: 'parrot-os',
    name: 'Parrot OS',
    category: 'Security & Penetration Lab',
    icon: SiParrotsecurity,
    color: '#22D3EE',
    glowDim: 'rgba(34, 211, 238, 0.45)',
    borderColorDim: 'rgba(34, 211, 238, 0.35)',
    bgGradient: 'from-cyan-950/90 to-sky-900/50',
  },
];

export const HeroOrbitVisual: React.FC = () => {
  const reduceMotion = useReducedMotion();

  // Responsive screen measurement
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Active hover tracking for z-index prioritization and clean tactile feedback
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileSmall = windowWidth < 380;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Pixel-accurate responsive stage boundaries with balanced vertical framing
  const stageWidth = isMobileSmall ? 284 : isMobile ? 336 : isTablet ? 420 : 480;
  const stageHeight = isMobileSmall ? 240 : isMobile ? 280 : isTablet ? 340 : 440;

  // Responsive button sizes
  const iconBtnClass = isMobileSmall
    ? 'w-7 h-7 rounded-lg'
    : isMobile
    ? 'w-8 h-8 rounded-xl'
    : isTablet
    ? 'w-9 h-9 sm:w-10 sm:h-10 rounded-2xl'
    : 'w-10 h-10 lg:w-11 lg:h-11 rounded-2xl';

  const iconSvgClass = isMobileSmall ? 'w-3 h-3' : isMobile ? 'w-3.5 h-3.5' : isTablet ? 'w-4 h-4' : 'w-5 h-5';

  const avatarHeightClass = isMobileSmall ? 'h-48' : isMobile ? 'h-56' : isTablet ? 'h-64' : 'h-72 lg:h-80';
  const pedestalWidth = isMobileSmall ? 180 : isMobile ? 210 : isTablet ? 250 : 290;

  // 4 Concentric 3D Orbital Rings with Alternating Tilts and Speeds
  // Scaled proportionally to stageWidth so tech chips NEVER leave orbit or clip screen edges

  // Orbit 1: Inner (lower waist/hips)
  const orbit1Rx = isMobileSmall ? 68 : isMobile ? 82 : isTablet ? 114 : 138;
  const orbit1Ry = isMobileSmall ? 22 : isMobile ? 26 : isTablet ? 36 : 44;
  const orbit1TiltDeg = -15;
  const orbit1TiltRad = (orbit1TiltDeg * Math.PI) / 180;
  const orbit1CenterY = isMobileSmall ? 14 : isMobile ? 18 : isTablet ? 24 : 28;

  // Orbit 2: Mid-Inner (mid-torso/abdomen)
  const orbit2Rx = isMobileSmall ? 86 : isMobile ? 104 : isTablet ? 142 : 172;
  const orbit2Ry = isMobileSmall ? 28 : isMobile ? 33 : isTablet ? 45 : 55;
  const orbit2TiltDeg = 17;
  const orbit2TiltRad = (orbit2TiltDeg * Math.PI) / 180;
  const orbit2CenterY = isMobileSmall ? 4 : isMobile ? 6 : isTablet ? 8 : 8;

  // Orbit 3: Mid-Outer (chest/upper-torso)
  const orbit3Rx = isMobileSmall ? 104 : isMobile ? 126 : isTablet ? 172 : 206;
  const orbit3Ry = isMobileSmall ? 33 : isMobile ? 40 : isTablet ? 55 : 66;
  const orbit3TiltDeg = -12;
  const orbit3TiltRad = (orbit3TiltDeg * Math.PI) / 180;
  const orbit3CenterY = isMobileSmall ? -10 : isMobile ? -14 : isTablet ? -16 : -18;

  // Orbit 4: Outer (high chest/shoulders)
  const orbit4Rx = isMobileSmall ? 122 : isMobile ? 148 : isTablet ? 198 : 236;
  const orbit4Ry = isMobileSmall ? 39 : isMobile ? 47 : isTablet ? 63 : 75;
  const orbit4TiltDeg = 21;
  const orbit4TiltRad = (orbit4TiltDeg * Math.PI) / 180;
  const orbit4CenterY = isMobileSmall ? -22 : isMobile ? -26 : isTablet ? -32 : -38;

  // Animation angle states
  const [orbit1Angle, setOrbit1Angle] = useState(0);
  const [orbit2Angle, setOrbit2Angle] = useState(0);
  const [orbit3Angle, setOrbit3Angle] = useState(0);
  const [orbit4Angle, setOrbit4Angle] = useState(0);

  const lastTimeRef = useRef<number | null>(null);
  const orbit1AngleRef = useRef(0);
  const orbit2AngleRef = useRef(0);
  const orbit3AngleRef = useRef(0);
  const orbit4AngleRef = useRef(0);

  // Optimized orbital revolution speeds: continuous non-stop rotation
  const orbit1Speed = (2 * Math.PI) / 24000; // clockwise ~24s
  const orbit2Speed = (2 * Math.PI) / 30000; // counter-clockwise ~30s
  const orbit3Speed = (2 * Math.PI) / 36000; // clockwise ~36s
  const orbit4Speed = (2 * Math.PI) / 42000; // counter-clockwise ~42s

  useEffect(() => {
    if (reduceMotion) return;

    let animId: number;
    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Always runs continuously (no pause on hover)
      orbit1AngleRef.current = (orbit1AngleRef.current + delta * orbit1Speed) % (2 * Math.PI);
      orbit2AngleRef.current = (orbit2AngleRef.current - delta * orbit2Speed + 2 * Math.PI) % (2 * Math.PI);
      orbit3AngleRef.current = (orbit3AngleRef.current + delta * orbit3Speed) % (2 * Math.PI);
      orbit4AngleRef.current = (orbit4AngleRef.current - delta * orbit4Speed + 2 * Math.PI) % (2 * Math.PI);

      setOrbit1Angle(orbit1AngleRef.current);
      setOrbit2Angle(orbit2AngleRef.current);
      setOrbit3Angle(orbit3AngleRef.current);
      setOrbit4Angle(orbit4AngleRef.current);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [reduceMotion, orbit1Speed, orbit2Speed, orbit3Speed, orbit4Speed]);

  // Helper to calculate 3D position and depth sorting for an orbit
  const compute3DPosition = (
    itemIndex: number,
    totalItems: number,
    baseAngle: number,
    rx: number,
    ry: number,
    tiltRad: number,
    centerY: number
  ) => {
    const itemOffset = (itemIndex * 2 * Math.PI) / totalItems;
    const u = (baseAngle + itemOffset) % (2 * Math.PI);

    // Unrotated ellipse position
    const x0 = rx * Math.cos(u);
    const y0 = ry * Math.sin(u);

    // Tilted ellipse position matching exact SVG transform matrix
    const x = x0 * Math.cos(tiltRad) - y0 * Math.sin(tiltRad);
    const y = x0 * Math.sin(tiltRad) + y0 * Math.cos(tiltRad) + centerY;

    // Depth: in SVG coordinates, y0 > 0 is downward (FRONT), y0 < 0 is upward (BACK)
    const sinU = Math.sin(u);
    const isFront = sinU >= 0;

    // Smooth continuous depth factor without abrupt switches
    const depthFactor = (sinU + 1) / 2;
    const scale = 0.90 + 0.18 * depthFactor; // smooth 0.90 to 1.08
    const opacity = 0.88 + 0.12 * depthFactor; // smooth 0.88 to 1.0
    const zIndex = isFront ? 35 : 8;

    return { x, y, scale, opacity, zIndex, isFront };
  };

  // Reusable helper to render orbiting icons with consistent minimal appearance (front & back alike)
  // Perfectly centered on the 3D orbit line and equipped with spring scale hover interaction
  const renderOrbitGroup = (
    items: TechItem[],
    angle: number,
    rx: number,
    ry: number,
    tiltRad: number,
    centerY: number
  ) =>
    items.map((item, index) => {
      const pos = compute3DPosition(index, items.length, angle, rx, ry, tiltRad, centerY);
      const Icon = item.icon;
      const isHovered = hoveredId === item.id;

      return (
        <div
          key={item.id}
          className="absolute select-none pointer-events-auto"
          style={{
            left: '50%',
            top: '50%',
            // Exact center-locked transform: translates to (pos.x, pos.y) and offsets by half-chip (-50%)
            transform: `translate3d(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%), 0) scale(${pos.scale})`,
            zIndex: isHovered ? 60 : pos.zIndex,
            opacity: pos.opacity,
          }}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Minimalist Tech Chip with simple scale hover interaction */}
          <motion.div
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className={`group relative flex items-center justify-center ${iconBtnClass} bg-zinc-950/92 border border-zinc-800/80 rounded-xl sm:rounded-2xl shadow-lg cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400`}
            style={{
              borderColor: isHovered ? item.color : item.borderColorDim,
              boxShadow: isHovered
                ? `0 0 16px ${item.glowDim}, 0 4px 12px rgba(0,0,0,0.75)`
                : `0 0 10px ${item.glowDim}, 0 2px 8px rgba(0,0,0,0.6)`,
            }}
            title={`${item.name} (${item.category})`}
          >
            {/* Subtle, steady ambient gradient inside */}
            <div
              className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${item.bgGradient} opacity-30 group-hover:opacity-55 transition-opacity duration-200`}
            />

            <Icon
              className={`${iconSvgClass} relative z-10 transition-transform duration-200 group-hover:scale-110`}
              style={{ color: item.color }}
            />
          </motion.div>
        </div>
      );
    });

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-full overflow-visible">
      {/* Ambient background teal/cyan radial bloom */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-tr from-teal-500/15 via-cyan-500/10 to-emerald-500/10 blur-3xl pointer-events-none -z-10" />

      {/* 3D SCENE STAGE (Exact Pixel Coordinates & SVG ViewBox Parity) */}
      <div
        className="relative flex items-center justify-center max-w-full"
        style={{ width: stageWidth, height: stageHeight }}
      >

        {/* ---------------------------------------------------- */}
        {/* LAYER 1: BACK ORBIT SVG RINGS (Z-INDEX: 4, BEHIND AVATAR) */}
        {/* Continuous Solid Lines With Smooth Depth Gradient (No Dashes) */}
        {/* ---------------------------------------------------- */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 4 }}
          viewBox={`-${stageWidth / 2} -${stageHeight / 2} ${stageWidth} ${stageHeight}`}
        >
          <defs>
            {/* Smooth depth gradient for Orbit 4 Back Arc (Amber) */}
            <linearGradient id="orbit4BackGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#d97706" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.25" />
            </linearGradient>

            {/* Smooth depth gradient for Orbit 3 Back Arc (Cyan) */}
            <linearGradient id="orbit3BackGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#0891b2" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#164e63" stopOpacity="0.25" />
            </linearGradient>

            {/* Smooth depth gradient for Orbit 2 Back Arc (Emerald) */}
            <linearGradient id="orbit2BackGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#059669" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.25" />
            </linearGradient>

            {/* Smooth depth gradient for Orbit 1 Back Arc (Teal) */}
            <linearGradient id="orbit1BackGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#0d9488" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#134e4a" stopOpacity="0.28" />
            </linearGradient>
          </defs>

          {/* Orbit 4 Back Arc (Solid normal line with seamless depth fade) */}
          <g transform={`translate(0, ${orbit4CenterY}) rotate(${orbit4TiltDeg})`}>
            <path
              d={`M -${orbit4Rx} 0 A ${orbit4Rx} ${orbit4Ry} 0 0 1 ${orbit4Rx} 0`}
              fill="none"
              stroke="url(#orbit4BackGrad)"
              strokeWidth={isMobile ? '1.25' : '1.5'}
            />
          </g>

          {/* Orbit 3 Back Arc */}
          <g transform={`translate(0, ${orbit3CenterY}) rotate(${orbit3TiltDeg})`}>
            <path
              d={`M -${orbit3Rx} 0 A ${orbit3Rx} ${orbit3Ry} 0 0 1 ${orbit3Rx} 0`}
              fill="none"
              stroke="url(#orbit3BackGrad)"
              strokeWidth={isMobile ? '1.25' : '1.5'}
            />
          </g>

          {/* Orbit 2 Back Arc */}
          <g transform={`translate(0, ${orbit2CenterY}) rotate(${orbit2TiltDeg})`}>
            <path
              d={`M -${orbit2Rx} 0 A ${orbit2Rx} ${orbit2Ry} 0 0 1 ${orbit2Rx} 0`}
              fill="none"
              stroke="url(#orbit2BackGrad)"
              strokeWidth={isMobile ? '1.3' : '1.6'}
            />
          </g>

          {/* Orbit 1 Back Arc */}
          <g transform={`translate(0, ${orbit1CenterY}) rotate(${orbit1TiltDeg})`}>
            <path
              d={`M -${orbit1Rx} 0 A ${orbit1Rx} ${orbit1Ry} 0 0 1 ${orbit1Rx} 0`}
              fill="none"
              stroke="url(#orbit1BackGrad)"
              strokeWidth={isMobile ? '1.4' : '1.75'}
            />
          </g>
        </svg>

        {/* ---------------------------------------------------- */}
        {/* LAYER 3: AVATAR PNG (Z-INDEX: 20) WITH CENTERING ON FLOOR PEDESTAL */}
        {/* ---------------------------------------------------- */}
        <div
          className="relative flex items-end justify-center pointer-events-none"
          style={{ zIndex: 20 }}
        >
          {/* 3D CYBER HOLO-PEDESTAL (FLOOR) - POSITIONED DIRECTLY UNDER THE BOY */}
          <div
            className="absolute bottom-1 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center"
            style={{ zIndex: -1 }}
          >
            {/* Ground reflection glow */}
            <div
              className="absolute rounded-full bg-teal-400/25 blur-xl pointer-events-none"
              style={{ width: pedestalWidth * 0.95, height: isMobile ? 32 : 40 }}
            />

            {/* Tilted 3D holographic discs */}
            <div
              style={{
                transform: 'perspective(650px) rotateX(72deg)',
                width: pedestalWidth,
                height: pedestalWidth,
              }}
              className="relative rounded-full flex items-center justify-center"
            >
              {/* Outer Glowing Cyber Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-teal-400/60 shadow-[0_0_35px_rgba(20,184,166,0.55)] bg-gradient-to-b from-teal-500/10 via-cyan-500/15 to-transparent" />

              {/* Rotating Circuit Tick Ring */}
              <div className="absolute inset-2 sm:inset-3 rounded-full border border-teal-300/40 border-dashed animate-[spin_45s_linear_infinite]" />

              {/* Intermediate Concentric Cyan Ring */}
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]" />

              {/* Inner Projector Spotlight Core */}
              <div className="absolute inset-12 sm:inset-16 rounded-full border border-teal-300/60 bg-[radial-gradient(circle,rgba(20,184,166,0.45)_0%,rgba(6,182,212,0.2)_50%,transparent_80%)] shadow-[0_0_30px_rgba(20,184,166,0.6)]" />

              {/* Center intense emitter point directly beneath feet */}
              <div className="w-8 h-8 rounded-full bg-teal-300/80 blur-sm" />
            </div>
          </div>

          {/* Contact ambient shadow at the soles */}
          <div className="absolute bottom-0 w-24 sm:w-32 h-3 bg-black/60 blur-sm rounded-full pointer-events-none left-1/2 -translate-x-1/2" />

          {/* Avatar centered on the floor platform by correcting image stance offset */}
          <motion.img
            src={avatarImg}
            alt="Shehan Sulakshana 3D Avatar"
            className={`${avatarHeightClass} object-contain object-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] select-none`}
            style={{ transform: 'translateX(-5.34%)' }}
            loading="eager"
            draggable={false}
          />
        </div>

        {/* ---------------------------------------------------- */}
        {/* LAYER 4: FRONT ORBIT SVG RINGS (Z-INDEX: 25, IN FRONT OF AVATAR) */}
        {/* ---------------------------------------------------- */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 25 }}
          viewBox={`-${stageWidth / 2} -${stageHeight / 2} ${stageWidth} ${stageHeight}`}
        >
          {/* Orbit 1 Front Arc (Teal - waist) */}
          <g transform={`translate(0, ${orbit1CenterY}) rotate(${orbit1TiltDeg})`}>
            <path
              d={`M -${orbit1Rx} 0 A ${orbit1Rx} ${orbit1Ry} 0 0 0 ${orbit1Rx} 0`}
              fill="none"
              stroke="#14b8a6"
              strokeWidth={isMobile ? '1.5' : '2'}
              opacity="0.85"
              className="drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]"
            />
          </g>

          {/* Orbit 2 Front Arc (Emerald - mid-torso) */}
          <g transform={`translate(0, ${orbit2CenterY}) rotate(${orbit2TiltDeg})`}>
            <path
              d={`M -${orbit2Rx} 0 A ${orbit2Rx} ${orbit2Ry} 0 0 0 ${orbit2Rx} 0`}
              fill="none"
              stroke="#10b981"
              strokeWidth={isMobile ? '1.4' : '1.8'}
              opacity="0.8"
              className="drop-shadow-[0_0_8px_rgba(16,185,129,0.75)]"
            />
          </g>

          {/* Orbit 3 Front Arc (Cyan/Sky - chest) */}
          <g transform={`translate(0, ${orbit3CenterY}) rotate(${orbit3TiltDeg})`}>
            <path
              d={`M -${orbit3Rx} 0 A ${orbit3Rx} ${orbit3Ry} 0 0 0 ${orbit3Rx} 0`}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={isMobile ? '1.3' : '1.75'}
              opacity="0.8"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]"
            />
          </g>

          {/* Orbit 4 Front Arc (Amber/Orange - upper chest/shoulders) */}
          <g transform={`translate(0, ${orbit4CenterY}) rotate(${orbit4TiltDeg})`}>
            <path
              d={`M -${orbit4Rx} 0 A ${orbit4Rx} ${orbit4Ry} 0 0 0 ${orbit4Rx} 0`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={isMobile ? '1.3' : '1.6'}
              opacity="0.8"
              className="drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]"
            />
          </g>
        </svg>

        {/* ---------------------------------------------------- */}
        {/* LAYER 5: ORBITING ICONS WITH DYNAMIC 3D DEPTH Z-INDEX */}
        {/* ---------------------------------------------------- */}
        {renderOrbitGroup(ORBIT_1_TECH, orbit1Angle, orbit1Rx, orbit1Ry, orbit1TiltRad, orbit1CenterY)}
        {renderOrbitGroup(ORBIT_2_TECH, orbit2Angle, orbit2Rx, orbit2Ry, orbit2TiltRad, orbit2CenterY)}
        {renderOrbitGroup(ORBIT_3_TECH, orbit3Angle, orbit3Rx, orbit3Ry, orbit3TiltRad, orbit3CenterY)}
        {renderOrbitGroup(ORBIT_4_TECH, orbit4Angle, orbit4Rx, orbit4Ry, orbit4TiltRad, orbit4CenterY)}

      </div>
    </div>
  );
};
