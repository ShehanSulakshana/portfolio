import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Smartphone,
  Database,
  Wrench,
  Radio,
  Globe,
  Layers,
  MonitorSmartphone,
  ShieldAlert,
  Server,
  Activity,
} from 'lucide-react';

// Authentic Brand Icons from react-icons
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPython,
  SiKalilinux,
  SiParrotsecurity,
  SiWireshark,
  SiGnubash,
  SiLinux,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiMaterialdesign,
  SiMysql,
  SiCloudflare,
  SiGit,
  SiGithub,
  SiAndroidstudio,
  SiPostman,
  SiFigma,
} from 'react-icons/si';

import {
  FaJava,
  FaCss3Alt,
  FaNetworkWired,
  FaLock,
  FaShieldHalved,
  FaTerminal,
  FaDatabase,
} from 'react-icons/fa6';

import { VscVscode } from 'react-icons/vsc';

export interface TechSkill {
  name: string;
  fullName?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  brandColor: string;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  skills: TechSkill[];
}

export const SKILL_CATEGORIES_DATA: SkillCategoryGroup[] = [
  {
    id: 'security',
    title: 'Cybersecurity & Systems Defense',
    shortTitle: 'Cybersecurity',
    tagline: 'Offensive toolkits, network reconnaissance, and protocol inspection',
    icon: Shield,
    accentColor: '#14b8a6',
    accentBg: 'rgba(20, 184, 166, 0.1)',
    accentBorder: 'rgba(20, 184, 166, 0.25)',
    skills: [
      { name: 'Parrot Security', fullName: 'Parrot Security OS', Icon: SiParrotsecurity, brandColor: '#00E5FF' },
      { name: 'Kali Linux', fullName: 'Kali Linux Offensive Suite', Icon: SiKalilinux, brandColor: '#2680EB' },
      { name: 'Linux CLI', fullName: 'Linux CLI & Terminal Shell', Icon: SiLinux, brandColor: '#FCC624' },
      { name: 'Bash Scripting', fullName: 'GNU Bash Shell Scripting', Icon: SiGnubash, brandColor: '#4EAA25' },
      { name: 'TCP/IP Protocols', fullName: 'TCP/IP Protocol Suite & Handshakes', Icon: FaNetworkWired, brandColor: '#38BDF8' },
      { name: 'Wireshark', fullName: 'Wireshark Packet Analysis', Icon: SiWireshark, brandColor: '#1679A7' },
      { name: 'Nmap Recon', fullName: 'Nmap Network Scanning & Recon', Icon: FaTerminal, brandColor: '#22C55E' },
      { name: 'Network Sockets', fullName: 'Low-Level Socket Programming', Icon: Radio, brandColor: '#818CF8' },
      { name: 'DNS & OSINT', fullName: 'DNS Reconnaissance & OSINT', Icon: Globe, brandColor: '#C084FC' },
      { name: 'AES-256 / RSA', fullName: 'AES-256 & RSA Cryptography', Icon: FaLock, brandColor: '#2DD4BF' },
      { name: 'Traffic & Ports', fullName: 'Traffic Inspection & Port Auditing', Icon: Activity, brandColor: '#F59E0B' },
      { name: 'Vuln Assessment', fullName: 'Vulnerability Assessment & Hardening', Icon: ShieldAlert, brandColor: '#F43F5E' },
      { name: 'CIA Triad Defense', fullName: 'CIA Triad Security Architecture', Icon: FaShieldHalved, brandColor: '#10B981' },
    ],
  },
  {
    id: 'mobile-frontend',
    title: 'Mobile & Frontend Engineering',
    shortTitle: 'Mobile & Frontend',
    tagline: 'Cross-platform native mobile applications and responsive user interfaces',
    icon: Smartphone,
    accentColor: '#0284c7',
    accentBg: 'rgba(2, 132, 199, 0.1)',
    accentBorder: 'rgba(2, 132, 199, 0.25)',
    skills: [
      { name: 'Flutter SDK', fullName: 'Flutter Cross-Platform Framework', Icon: SiFlutter, brandColor: '#02569B' },
      { name: 'Dart', fullName: 'Dart Object-Oriented Language', Icon: SiDart, brandColor: '#0175C2' },
      { name: 'BLoC State', fullName: 'BLoC Pattern State Management', Icon: Layers, brandColor: '#0284C7' },
      { name: 'Material Design', fullName: 'Material Design 3 Architecture', Icon: SiMaterialdesign, brandColor: '#38BDF8' },
      { name: 'React', fullName: 'React Modern Single Page Apps', Icon: SiReact, brandColor: '#61DAFB' },
      { name: 'Tailwind CSS', fullName: 'Tailwind CSS Utility Styling', Icon: SiTailwindcss, brandColor: '#06B6D4' },
      { name: 'JavaScript', fullName: 'Modern JavaScript (ES6+)', Icon: SiJavascript, brandColor: '#F7DF1E' },
      { name: 'HTML5 Semantic', fullName: 'HTML5 Semantic Web Standards', Icon: SiHtml5, brandColor: '#E34F26' },
      { name: 'CSS3 Keyframes', fullName: 'CSS3 Animations & Transitions', Icon: FaCss3Alt, brandColor: '#1572B6' },
      { name: 'Responsive UI', fullName: 'Fluid Mobile-First Responsive Design', Icon: MonitorSmartphone, brandColor: '#A855F7' },
    ],
  },
  {
    id: 'backend-cloud',
    title: 'Databases, Cloud & Systems',
    shortTitle: 'Databases & Cloud',
    tagline: 'Persistent data storage, realtime sync, and structured backend architecture',
    icon: Database,
    accentColor: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.1)',
    accentBorder: 'rgba(245, 158, 11, 0.25)',
    skills: [
      { name: 'Cloud Firestore', fullName: 'Firebase Cloud Firestore NoSQL', Icon: SiFirebase, brandColor: '#FFCA28' },
      { name: 'Firebase Auth', fullName: 'Firebase Identity & Authentication', Icon: SiFirebase, brandColor: '#FFA000' },
      { name: 'MySQL Database', fullName: 'MySQL Relational Database', Icon: SiMysql, brandColor: '#4479A1' },
      { name: 'JDBC / SQL', fullName: 'JDBC Connectors & SQL Queries', Icon: FaDatabase, brandColor: '#38BDF8' },
      { name: 'Python', fullName: 'Python Systems & Automation', Icon: SiPython, brandColor: '#3776AB' },
      { name: 'Java (OOP)', fullName: 'Java Enterprise Object-Oriented', Icon: FaJava, brandColor: '#ED8B00' },
      { name: 'RESTful APIs', fullName: 'RESTful HTTP API Architecture', Icon: Server, brandColor: '#10B981' },
      { name: 'Cloudflare', fullName: 'Cloudflare Edge CDN & Security', Icon: SiCloudflare, brandColor: '#F38020' },
    ],
  },
  {
    id: 'tooling',
    title: 'Engineering Tooling & Workflow',
    shortTitle: 'Tooling & CI/CD',
    tagline: 'Version control, mobile IDE buildchains, and developer productivity suites',
    icon: Wrench,
    accentColor: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.1)',
    accentBorder: 'rgba(16, 185, 129, 0.25)',
    skills: [
      { name: 'Git CLI', fullName: 'Git Version Control CLI', Icon: SiGit, brandColor: '#F05032' },
      { name: 'GitHub & CI/CD', fullName: 'GitHub Actions & Repository Hub', Icon: SiGithub, brandColor: '#F3F4F6' },
      { name: 'Android Studio', fullName: 'Android Studio IDE & Emulators', Icon: SiAndroidstudio, brandColor: '#3DDC84' },
      { name: 'VS Code', fullName: 'Visual Studio Code Editor', Icon: VscVscode, brandColor: '#007ACC' },
      { name: 'Postman API', fullName: 'Postman API Testing Client', Icon: SiPostman, brandColor: '#FF6C37' },
      { name: 'Figma UI/UX', fullName: 'Figma Prototyping & Design Systems', Icon: SiFigma, brandColor: '#F24E1E' },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px', amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-14 sm:py-20 lg:py-20 relative"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[300px] bg-teal-950/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Skills
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            Technical Skills
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Technologies and environments used across mobile development, security testing, and systems.
          </p>
        </motion.div>

        {/* Responsive Domain Grid: 1 col on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {SKILL_CATEGORIES_DATA.map((cat, index) => {
            const CatIcon = cat.icon;

            return (
              <motion.div
                key={cat.id}
                id={`skill-domain-${cat.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group/card relative flex flex-col p-3.5 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700/80 transition-all duration-200 shadow-xl shadow-black/25 overflow-hidden"
              >
                {/* Subtle domain accent top highlight bar */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300 opacity-60 group-hover/card:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${cat.accentColor} 0%, ${cat.accentColor}40 40%, transparent 100%)`,
                  }}
                />

                {/* Category Header */}
                <div className="flex items-center justify-between gap-2.5 pb-3 sm:pb-3.5 mb-3 sm:mb-3.5 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-inner transition-transform duration-200 group-hover/card:scale-105"
                      style={{
                        backgroundColor: cat.accentBg,
                        borderColor: cat.accentBorder,
                        color: cat.accentColor,
                      }}
                    >
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                        {cat.title}
                      </h3>
                      <p className="text-[10.5px] sm:text-[11px] text-zinc-400 line-clamp-1">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800/90 text-zinc-400 shrink-0">
                    {cat.skills.length}
                  </span>
                </div>

                {/* Responsive 2-Column Skill Chips Grid (optimal for mobile & desktop) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {cat.skills.map((skill, sIdx) => {
                    const SkillIcon = skill.Icon;

                    return (
                      <div
                        key={sIdx}
                        title={skill.fullName || skill.name}
                        className="group/chip relative flex items-center gap-2 sm:gap-2.5 p-2 sm:px-3 sm:py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 active:bg-zinc-800/90 border border-zinc-800/70 hover:border-zinc-700/90 transition-all duration-150 cursor-default active:scale-[0.98] hover:-translate-y-0.5 select-none"
                      >
                        {/* Authentic Brand Logo Tile */}
                        <div
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-950 border border-zinc-800/90 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/chip:scale-110 shadow-inner"
                        >
                          <SkillIcon
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200"
                            style={{ color: skill.brandColor }}
                          />
                        </div>

                        {/* Technology Name */}
                        <span className="text-[11.5px] sm:text-xs font-medium text-zinc-200 group-hover/chip:text-white transition-colors truncate">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};
