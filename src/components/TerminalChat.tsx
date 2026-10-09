import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  PROFILE_INFO,
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  BADGES_DATA,
  CAREER_PATHS,
  TIMELINE_DATA,
  SKILLS_CATEGORIES,
  SECRET_FLAG,
  Project,
} from '../data/portfolioData';

interface HistoryEntry {
  id: string;
  cwd: string;
  command: string;
  output?: React.ReactNode;
  isError?: boolean;
}

interface TerminalChatProps {
  onOpenResume?: () => void;
}

// Authentic synthesized mechanical key sound & beeps
const playKeyClick = (freq = 900, duration = 0.015) => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), ctx.currentTime);
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio permission or context errors
  }
};

const playEnterBeep = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio errors
  }
};

// Helper to map project to realistic filename dynamically based on tech stack
const getProjectFileName = (p: Project) => {
  if (p.techs.some((t) => t.toLowerCase().includes('python'))) return `${p.id}.py`;
  if (p.techs.some((t) => t.toLowerCase().includes('java') && !t.toLowerCase().includes('javascript'))) return `${p.id}.java`;
  if (p.techs.some((t) => t.toLowerCase().includes('html'))) return `${p.id}.html`;
  return `${p.id}.md`;
};

const PROJECT_FILES = PROJECTS_DATA.map(getProjectFileName);

// Terminal identity constants - customizable host name & user
export const TERMINAL_CONFIG = {
  user: 'guest',
  hostname: 'portfolio',
  promptUser: 'guest@portfolio',
  osName: 'Linux x86_64',
  kernel: '6.10.9-portfolio',
};

const FILESYSTEM: Record<string, string[]> = {
  '~': ['about.txt', 'projects/', 'skills.md', 'certifications.txt', 'education.cfg', 'contact.sh', 'resume.pdf', 'secret_flag.txt'],
  '~/projects': PROJECT_FILES,
};

const ALL_COMMANDS = [
  'help',
  'ls',
  'cat',
  'cd',
  'pwd',
  'neofetch',
  'whoami',
  'id',
  'uptime',
  'projects',
  'skills',
  'certs',
  'education',
  'timeline',
  'gpa',
  'contact',
  'resume',
  'tree',
  'history',
  'clear',
  'date',
  'uname',
  'hostname',
  'sudo',
  'echo',
  'exit',
];

export const TerminalChat: React.FC<TerminalChatProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cwd, setCwd] = useState<string>('~');
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Scroll to Projects or Contact
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Neofetch ASCII + System Output
  const renderNeofetch = () => (
    <div className="flex flex-col sm:flex-row gap-5 py-1 font-mono text-xs leading-relaxed">
      <pre className="text-emerald-400 font-bold select-none text-[11px] leading-tight shrink-0 overflow-x-auto">
{`    .---.
   /     \\      
  | () () |     
   \\  _  /      
    /   \\       
   /     \\      
  /|     |\\     
 (_|     |_)    
`}
      </pre>
      <div className="space-y-0.5 text-zinc-300 text-xs">
        <div className="font-bold text-white">
          <span className="text-emerald-400">{TERMINAL_CONFIG.user}</span>@<span className="text-emerald-400">{TERMINAL_CONFIG.hostname}</span>
        </div>
        <div className="text-zinc-600">----------------------</div>
        <div><span className="text-emerald-400 font-semibold">OS:</span> {TERMINAL_CONFIG.osName}</div>
        <div><span className="text-emerald-400 font-semibold">Host:</span> Shehan Portfolio Workstation v2.4</div>
        <div><span className="text-emerald-400 font-semibold">Kernel:</span> {TERMINAL_CONFIG.kernel}</div>
        <div><span className="text-emerald-400 font-semibold">Uptime:</span> 42 days, 8 hours, 14 mins</div>
        <div><span className="text-emerald-400 font-semibold">Packages:</span> 1248 (pacman)</div>
        <div><span className="text-emerald-400 font-semibold">Shell:</span> bash 5.2.26</div>
        <div><span className="text-emerald-400 font-semibold">Terminal:</span> /dev/pts/1 (portfolio-terminal)</div>
        <div><span className="text-emerald-400 font-semibold">CPU:</span> AMD Ryzen 7 PRO 5850U (8) @ 4.40GHz</div>
        <div><span className="text-emerald-400 font-semibold">Memory:</span> 3942MiB / 16048MiB (24%)</div>
        <div><span className="text-emerald-400 font-semibold">Academic:</span> {PROFILE_INFO.degree} · {PROFILE_INFO.institution} (<span className="text-emerald-300 font-bold">{PROFILE_INFO.academicStanding}</span>)</div>
        <div><span className="text-emerald-400 font-semibold">Focus:</span> {PROFILE_INFO.headline}</div>
        <div className="flex gap-1.5 pt-1.5">
          <span className="w-3 h-3 bg-zinc-900 border border-zinc-700" />
          <span className="w-3 h-3 bg-rose-600" />
          <span className="w-3 h-3 bg-emerald-500" />
          <span className="w-3 h-3 bg-amber-400" />
          <span className="w-3 h-3 bg-blue-500" />
          <span className="w-3 h-3 bg-purple-500" />
          <span className="w-3 h-3 bg-cyan-400" />
          <span className="w-3 h-3 bg-zinc-200" />
        </div>
      </div>
    </div>
  );

  // Initial terminal history with authentic Linux MOTD
  const [entries, setEntries] = useState<HistoryEntry[]>([
    {
      id: 'init-1',
      cwd: '~',
      command: 'neofetch',
      output: renderNeofetch(),
    },
    {
      id: 'init-2',
      cwd: '~',
      command: 'cat welcome.txt',
      output: (
        <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
{`================================================================================
  Shehan Portfolio Workstation [${TERMINAL_CONFIG.hostname}]
  Authorized interactive shell for ${TERMINAL_CONFIG.promptUser}
================================================================================

 * Documentation:     ${PROFILE_INFO.github}
 * Management:        shehan-cli v5.2 (x86_64-pc-linux-gnu)
 * Academic Standing: ${PROFILE_INFO.academicStanding} (${PROFILE_INFO.institution})
 * Status:            Active candidate for Mobile Dev & Security Internships

Type 'help' for manual or 'ls' to browse files.
================================================================================`}
        </pre>
      ),
    },
  ]);

  // Keep focus on the hidden input when terminal is open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        hiddenInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll terminal to bottom when new entries arrive
  useEffect(() => {
    if (isOpen && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [entries, currentInput, isOpen]);

  // Global hotkeys (Ctrl+K or ` to toggle terminal, Esc to close)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.metaKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '`' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Dedicated Thick Black Theme Styling
  const themeClasses = useMemo(() => ({
    windowBg: 'bg-[#000000] border-2 border-zinc-800',
    headerBg: 'bg-[#08080a] border-b-2 border-zinc-800',
    footerBg: 'bg-[#08080a] border-t-2 border-zinc-800',
    textColor: 'text-zinc-200',
    promptUser: 'text-emerald-400 font-bold',
    promptDir: 'text-cyan-400 font-semibold',
    cursor: 'bg-emerald-400',
    caret: 'caret-emerald-400',
    accent: 'text-emerald-400',
    border: 'border-zinc-800',
  }), []);

  // Command Execution Engine
  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (soundEnabled) playEnterBeep();

    if (!trimmed) {
      // Just print an empty prompt line
      setEntries((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          cwd,
          command: '',
          output: null,
        },
      ]);
      setCurrentInput('');
      return;
    }

    // Add to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ').filter(Boolean);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputNode: React.ReactNode = null;
    let newCwd = cwd;

    // Handle commands
    if (commandName === 'clear' || commandName === 'cls') {
      setEntries([]);
      setCurrentInput('');
      return;
    } else if (commandName === 'help' || commandName === 'man') {
      outputNode = (
        <div className="space-y-2 font-mono text-xs select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">
            SHEHAN PORTFOLIO TERMINAL (bash v5.2) — COMMAND REFERENCE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-zinc-300">
            <div><span className="text-teal-300 font-semibold">ls [-la]</span> : List directory contents</div>
            <div><span className="text-teal-300 font-semibold">cd &lt;dir&gt;</span> : Change directory (e.g. cd projects)</div>
            <div><span className="text-teal-300 font-semibold">cat &lt;file&gt;</span> : Read file content</div>
            <div><span className="text-teal-300 font-semibold">pwd</span> : Print current working directory</div>
            <div><span className="text-teal-300 font-semibold">tree</span> : Visual filesystem hierarchy</div>
            <div><span className="text-teal-300 font-semibold">neofetch</span> : System specs &amp; overview banner</div>
            <div><span className="text-teal-300 font-semibold">whoami</span> : Profile bio &amp; developer identity</div>
            <div><span className="text-teal-300 font-semibold">projects</span> : Shipped apps &amp; repositories</div>
            <div><span className="text-teal-300 font-semibold">skills</span> : Stacks, languages &amp; security tools</div>
            <div><span className="text-teal-300 font-semibold">certs</span> : Verified certifications &amp; verify URLs</div>
            <div><span className="text-teal-300 font-semibold">education</span> : University, degree &amp; GPA</div>
            <div><span className="text-teal-300 font-semibold">timeline</span> : Academic &amp; technical milestones</div>
            <div><span className="text-teal-300 font-semibold">contact</span> : Email, WhatsApp, social channels</div>
            <div><span className="text-teal-300 font-semibold">resume</span> : Open full Curriculum Vitae modal</div>
            <div><span className="text-teal-300 font-semibold">history</span> : Show past commands</div>
            <div><span className="text-teal-300 font-semibold">clear</span> : Flush terminal screen</div>
            <div><span className="text-teal-300 font-semibold">exit</span> : Close terminal window</div>
          </div>
          <div className="text-zinc-500 text-[11px] pt-1">
            Tip: Use standard commands like &ldquo;ls&rdquo;, &ldquo;cd projects&rdquo;, &ldquo;cat about.txt&rdquo;, or &ldquo;neofetch&rdquo;.
          </div>
        </div>
      );
    } else if (commandName === 'ls' || commandName === 'dir') {
      const isLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
      const files = FILESYSTEM[cwd] || [];

      if (isLong) {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-0.5 select-text">
            <div className="text-zinc-500">total {files.length * 4}</div>
            {files.map((f) => {
              const isDir = f.endsWith('/');
              return (
                <div key={f} className="flex gap-4">
                  <span className="text-zinc-500">{isDir ? 'drwxr-xr-x' : '-rw-r--r--'}</span>
                  <span className="text-zinc-400">1 {TERMINAL_CONFIG.user} {TERMINAL_CONFIG.user}</span>
                  <span className="text-zinc-500">4096 Oct 08 06:30</span>
                  <span className={isDir ? 'text-teal-400 font-bold' : 'text-zinc-200'}>{f}</span>
                </div>
              );
            })}
          </div>
        );
      } else {
        outputNode = (
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs select-text">
            {files.map((f) => {
              const isDir = f.endsWith('/');
              return (
                <span
                  key={f}
                  className={isDir ? 'text-teal-400 font-bold' : 'text-zinc-200'}
                >
                  {f}
                </span>
              );
            })}
          </div>
        );
      }
    } else if (commandName === 'pwd') {
      outputNode = <div className="font-mono text-xs text-zinc-300 select-text">{cwd === '~' ? `/home/${TERMINAL_CONFIG.user}` : `/home/${TERMINAL_CONFIG.user}/${cwd.replace('~/', '')}`}</div>;
    } else if (commandName === 'cd') {
      const target = args[0] || '~';
      if (target === '~' || target === `/home/${TERMINAL_CONFIG.user}`) {
        newCwd = '~';
      } else if (target === '..' || target === '../') {
        newCwd = '~';
      } else if (target === 'projects' || target === 'projects/' || target === './projects') {
        newCwd = '~/projects';
      } else {
        outputNode = <div className="font-mono text-xs text-rose-400">bash: cd: {target}: No such file or directory</div>;
      }
      setCwd(newCwd);
    } else if (commandName === 'cat') {
      const file = args[0];
      if (!file) {
        outputNode = <div className="font-mono text-xs text-rose-400">cat: missing file operand</div>;
      } else if (file === 'about.txt') {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-1.5 select-text">
            <div className="text-teal-300 font-bold">NAME: {PROFILE_INFO.fullName}</div>
            <div>HEADLINE: {PROFILE_INFO.headline}</div>
            <div>DEGREE: {PROFILE_INFO.degree} @ {PROFILE_INFO.institution}</div>
            <div>ACADEMIC STANDING: {PROFILE_INFO.academicStanding}</div>
            <div>LOCATION: {PROFILE_INFO.location} (UTC+05:30)</div>
            <div className="text-zinc-400 pt-1 space-y-1">
              {CAREER_PATHS.map((cp) => (
                <div key={cp.title}>
                  <span className="text-teal-400 font-semibold">&gt; {cp.title} ({cp.focus}):</span> {cp.description}
                </div>
              ))}
            </div>
          </div>
        );
      } else if (file === 'skills.md' || file === 'skills.txt') {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-2 select-text">
            <div className="text-teal-400 font-bold"># TECHNICAL SKILLS MATRIX</div>
            {SKILLS_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <span className="text-teal-300 font-semibold">- {cat.title}:</span>{' '}
                {cat.skills.map((s) => s.name).join(', ')}
              </div>
            ))}
          </div>
        );
      } else if (file === 'certifications.txt' || file === 'certs.txt') {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-1.5 select-text">
            <div className="text-teal-400 font-bold">VERIFIED ACCREDITATIONS &amp; BADGES:</div>
            {CERTIFICATES_DATA.map((c) => (
              <div key={c.id}>
                * {c.title} [{c.issuer}] &rarr; <span className="text-teal-300">{c.credentialCode || 'Verified'}</span> ({c.skills.join(', ')})
              </div>
            ))}
            <div className="text-zinc-400 text-[11px] pt-1">
              Digital Badges ({BADGES_DATA.length}): {BADGES_DATA.map((b) => b.title).join(' · ')}
            </div>
          </div>
        );
      } else if (file === 'education.cfg') {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-1.5 select-text">
            <div>INSTITUTION: {PROFILE_INFO.institution}</div>
            <div>PROGRAM: {PROFILE_INFO.degree}</div>
            <div>STATUS: {PROFILE_INFO.academicStanding}</div>
            <div className="text-teal-400 font-semibold pt-1">LEARNING PATH &amp; MILESTONES:</div>
            {TIMELINE_DATA.map((t, idx) => (
              <div key={idx} className="pl-2 text-zinc-400 text-[11px]">
                * [{t.date}] {t.title} &mdash; <span className="text-zinc-500">{t.description}</span>
              </div>
            ))}
          </div>
        );
      } else if (file === 'contact.sh') {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-1 select-text">
            <div>#!/bin/bash</div>
            <div>NAME=&quot;{PROFILE_INFO.fullName}&quot;</div>
            <div>EMAIL=&quot;{PROFILE_INFO.email}&quot;</div>
            <div>WHATSAPP=&quot;{PROFILE_INFO.whatsappNumber}&quot;</div>
            <div>GITHUB=&quot;{PROFILE_INFO.github}&quot;</div>
            <div>LINKEDIN=&quot;{PROFILE_INFO.linkedin}&quot;</div>
            <div>FACEBOOK=&quot;{PROFILE_INFO.facebook}&quot;</div>
            <div>PORTFOLIO=&quot;{PROFILE_INFO.livePortfolio}&quot;</div>
            <div>echo &quot;Ready for internships and collaborative opportunities!&quot;</div>
          </div>
        );
      } else if (file === 'resume.pdf') {
        outputNode = (
          <div className="font-mono text-xs text-zinc-300 space-y-2 select-text">
            <div className="text-teal-400 font-bold">[PDF STREAM: {PROFILE_INFO.fullName.replace(/\s+/g, '_')}_Resume.pdf]</div>
            <p>{PROFILE_INFO.degree} ({PROFILE_INFO.academicStanding}) &mdash; {PROFILE_INFO.headline}.</p>
            <button
              onClick={() => onOpenResume?.()}
              className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30 text-xs font-semibold cursor-pointer"
            >
              &gt;&gt; Open Full Visual Curriculum Vitae Modal
            </button>
          </div>
        );
      } else if (file === 'secret_flag.txt') {
        outputNode = (
          <div className="font-mono text-xs text-emerald-400 p-2.5 rounded bg-emerald-950/40 border border-emerald-800/80 select-text space-y-1">
            <div className="font-bold tracking-wide text-emerald-300">{SECRET_FLAG.flag}</div>
            <div className="text-zinc-300 text-xs">
              {SECRET_FLAG.congratulations}
            </div>
            <div className="text-emerald-400/90 text-[11px] italic">
              &quot;{SECRET_FLAG.message}&quot;
            </div>
          </div>
        );
      } else {
        const cleanFile = file.replace(/^projects\//, '').replace(/^\.\/projects\//, '');
        const foundProj = PROJECTS_DATA.find((p) => {
          const expectedFile = getProjectFileName(p);
          return (
            cleanFile === expectedFile ||
            cleanFile === `${p.id}.md` ||
            cleanFile === `${p.id}.py` ||
            cleanFile === `${p.id}.java` ||
            cleanFile === `${p.id}.html` ||
            cleanFile === p.id ||
            p.id.toLowerCase() === cleanFile.toLowerCase().replace(/\.[^/.]+$/, '')
          );
        });

        if (foundProj) {
          outputNode = (
            <div className="font-mono text-xs text-zinc-300 space-y-1.5 select-text leading-relaxed">
              <div className="text-teal-400 font-bold">{foundProj.title} ({foundProj.tagline})</div>
              <div>Category: <span className="text-zinc-200">{foundProj.categoryLabel}</span> | Status: <span className="text-emerald-400">{foundProj.status}</span></div>
              <p className="text-zinc-300">{foundProj.description}</p>
              {foundProj.architectureDetails && foundProj.architectureDetails.length > 0 && (
                <div className="pt-1">
                  <div className="text-zinc-400 text-[11px] font-semibold">Architecture Highlights:</div>
                  {foundProj.architectureDetails.map((detail, idx) => (
                    <div key={idx} className="text-zinc-400 text-[11px] pl-3">
                      - {detail}
                    </div>
                  ))}
                </div>
              )}
              <div className="text-teal-400/80 text-[10px] pt-1">Stack: {foundProj.techs.join(', ')}</div>
              <div>Source: <a href={foundProj.link} target="_blank" rel="noreferrer" className="text-teal-300 underline">{foundProj.link}</a></div>
            </div>
          );
        } else {
          outputNode = <div className="font-mono text-xs text-rose-400">cat: {file}: No such file or directory</div>;
        }
      }
    } else if (commandName === 'tree') {
      const projectTreeLines = PROJECTS_DATA.map((p, idx) => {
        const pFile = getProjectFileName(p);
        const isLast = idx === PROJECTS_DATA.length - 1;
        const prefix = isLast ? '│   └── ' : '│   ├── ';
        return `${prefix}${pFile}`;
      }).join('\n');

      outputNode = (
        <pre className="font-mono text-xs text-zinc-300 select-text">
{`.
├── about.txt
├── certifications.txt
├── contact.sh
├── education.cfg
├── projects/
${projectTreeLines}
├── resume.pdf
├── secret_flag.txt
└── skills.md

2 directories, ${PROJECTS_DATA.length + 7} files`}
        </pre>
      );
    } else if (commandName === 'neofetch' || commandName === 'fastfetch') {
      outputNode = renderNeofetch();
    } else if (commandName === 'whoami') {
      outputNode = (
        <div className="font-mono text-xs text-zinc-300 space-y-0.5 select-text">
          <div className="text-white font-bold">{TERMINAL_CONFIG.user}</div>
          <div className="text-zinc-400">uid=1000({TERMINAL_CONFIG.user}) gid=1000({TERMINAL_CONFIG.user}) groups=1000({TERMINAL_CONFIG.user}),998(wheel),27(sudo-pending)</div>
          <div className="text-zinc-300 pt-0.5">
            <span className="text-emerald-400 font-semibold">{PROFILE_INFO.fullName}</span> &mdash; {PROFILE_INFO.headline}
          </div>
          <div className="text-zinc-500 text-[11px]">
            {PROFILE_INFO.degree} @ {PROFILE_INFO.institution} · {PROFILE_INFO.academicStanding} · {PROFILE_INFO.location}
          </div>
        </div>
      );
    } else if (commandName === 'projects') {
      outputNode = (
        <div className="font-mono text-xs space-y-2 select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">
            FEATURED SOFTWARE REPOSITORIES ({PROJECTS_DATA.length} PROJECTS):
          </div>
          <div className="space-y-2">
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-teal-300 font-bold">[{p.id}]</span>
                  <span className="text-white font-semibold">{p.title}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-400 text-[11px]">{p.categoryLabel}</span>
                  <span className="text-emerald-400 text-[10px] ml-auto">[{p.status}]</span>
                </div>
                <div className="text-zinc-400 text-[11px] pl-4">{p.description}</div>
                <div className="text-teal-400/80 text-[10px] pl-4">
                  Techs: {p.techs.join(' · ')} | <a href={p.link} target="_blank" rel="noreferrer" className="underline hover:text-teal-200">GitHub Source &rarr;</a>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-1">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              &gt;&gt; Scroll to visual projects showcase
            </button>
          </div>
        </div>
      );
    } else if (commandName === 'skills') {
      outputNode = (
        <div className="font-mono text-xs space-y-2.5 text-zinc-300 select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">
            ENGINEERING STACK OVERVIEW ({SKILLS_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)} VERIFIED SKILLS):
          </div>
          {SKILLS_CATEGORIES.map((cat, idx) => (
            <div key={cat.id} className="space-y-0.5">
              <div className="text-teal-300 font-bold">
                [{idx + 1}] {cat.title} <span className="text-zinc-500 font-normal">({cat.tagline})</span>:
              </div>
              <div className="text-zinc-300 pl-4 text-[11px]">
                {cat.skills.map((s) => s.name).join(' · ')}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (commandName === 'certs' || commandName === 'badges') {
      outputNode = (
        <div className="font-mono text-xs space-y-2 select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">VERIFIED ACCREDITATIONS:</div>
          {CERTIFICATES_DATA.map((c) => (
            <div key={c.id} className="text-zinc-300">
              * <span className="text-white font-semibold">{c.title}</span> &mdash; {c.issuer}
              <a href={c.verifyUrl} target="_blank" rel="noreferrer" className="text-teal-300 hover:underline text-[10px] ml-2 inline-flex items-center gap-0.5">
                [Verify Online <ExternalLink className="w-2.5 h-2.5 inline" />]
              </a>
            </div>
          ))}
          <div className="text-zinc-400 text-[11px] pt-1">
            Also verified with {BADGES_DATA.length} digital badges from Cisco Networking Academy, Microsoft Student Ambassadors, and Google Developers:
          </div>
          <div className="text-zinc-500 text-[10px] pl-3">
            {BADGES_DATA.map((b) => b.title).join(' · ')}
          </div>
        </div>
      );
    } else if (commandName === 'education' || commandName === 'gpa') {
      outputNode = (
        <div className="font-mono text-xs space-y-1.5 text-zinc-300 select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">ACADEMIC CREDENTIALS &amp; CURRICULUM:</div>
          <div><span className="text-teal-400 font-semibold">Degree:</span> {PROFILE_INFO.degree}</div>
          <div><span className="text-teal-400 font-semibold">University:</span> {PROFILE_INFO.institution}</div>
          <div><span className="text-teal-400 font-semibold">Academic Standing:</span> <span className="text-emerald-400 font-bold">{PROFILE_INFO.academicStanding}</span></div>
          <div className="text-zinc-400 text-[11px] pt-1 font-semibold">Academic Milestones:</div>
          {TIMELINE_DATA.slice(-3).map((item, idx) => (
            <div key={idx} className="pl-3 text-[11px] text-zinc-400">
              * <span className="text-zinc-300 font-semibold">[{item.date}]</span> {item.title} &mdash; <span className="text-zinc-500">{item.institution}</span>
            </div>
          ))}
        </div>
      );
    } else if (commandName === 'timeline') {
      outputNode = (
        <div className="font-mono text-xs space-y-2 text-zinc-300 select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">LEARNING TIMELINE &amp; KNOWLEDGE ROADMAP:</div>
          {TIMELINE_DATA.map((t, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-teal-300 font-bold">[{t.date}]</span>
                <span className="text-white font-semibold">{t.title}</span>
                <span className="text-zinc-500 text-[11px]">@{t.institution}</span>
              </div>
              <div className="text-zinc-400 text-[11px] pl-4">{t.description}</div>
            </div>
          ))}
        </div>
      );
    } else if (commandName === 'contact' || commandName === 'hire') {
      outputNode = (
        <div className="font-mono text-xs space-y-1.5 text-zinc-300 select-text">
          <div className="text-teal-400 font-bold border-b border-zinc-800 pb-1">COMMUNICATION CHANNELS:</div>
          <div>* Email: <a href={`mailto:${PROFILE_INFO.email}`} className="text-teal-300 underline font-semibold">{PROFILE_INFO.email}</a></div>
          <div>* WhatsApp: <a href={PROFILE_INFO.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">{PROFILE_INFO.whatsappNumber}</a></div>
          <div>* LinkedIn: <a href={PROFILE_INFO.linkedin} target="_blank" rel="noreferrer" className="text-teal-300 underline">{PROFILE_INFO.linkedin}</a></div>
          <div>* GitHub: <a href={PROFILE_INFO.github} target="_blank" rel="noreferrer" className="text-teal-300 underline">{PROFILE_INFO.github}</a></div>
          <div>* Portfolio Web: <a href={PROFILE_INFO.livePortfolio} target="_blank" rel="noreferrer" className="text-teal-300 underline">{PROFILE_INFO.livePortfolio}</a></div>
          <div className="text-emerald-400 text-[11px] pt-1">
            Status: Open for Software Engineering / Mobile App Internships &amp; Freelance Development.
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-xs text-cyan-400 hover:underline cursor-pointer block pt-1"
          >
            &gt;&gt; Jump to Web Contact Form
          </button>
        </div>
      );
    } else if (commandName === 'resume' || commandName === 'cv') {
      outputNode = (
        <div className="font-mono text-xs space-y-2 select-text">
          <p className="text-zinc-300">
            Accessing verified Curriculum Vitae for {PROFILE_INFO.fullName}...
          </p>
          <button
            onClick={() => onOpenResume?.()}
            className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Complete CV Modal</span>
          </button>
        </div>
      );
    } else if (commandName === 'history') {
      outputNode = (
        <div className="font-mono text-xs text-zinc-300 space-y-0.5 select-text">
          {commandHistory.map((cmd, idx) => (
            <div key={`${cmd}-${idx}`} className="flex gap-3">
              <span className="text-zinc-500 w-6 text-right">{idx + 1}</span>
              <span>{cmd}</span>
            </div>
          ))}
        </div>
      );
    } else if (commandName === 'id') {
      outputNode = <div className="font-mono text-xs text-zinc-300 select-text">uid=1000({TERMINAL_CONFIG.user}) gid=1000({TERMINAL_CONFIG.user}) groups=1000({TERMINAL_CONFIG.user}),998(wheel),24(cdrom),27(sudo-pending),29(audio),44(video),108(netdev)</div>;
    } else if (commandName === 'uptime') {
      outputNode = <div className="font-mono text-xs text-zinc-300 select-text"> 07:02:18 up 42 days,  8:14,  1 user,  load average: 0.12, 0.08, 0.02</div>;
    } else if (commandName === 'uname') {
      outputNode = <div className="font-mono text-xs text-zinc-300 select-text">Linux {TERMINAL_CONFIG.hostname} {TERMINAL_CONFIG.kernel} #1 SMP PREEMPT_DYNAMIC (2026-09-20) x86_64 GNU/Linux</div>;
    } else if (commandName === 'hostname') {
      outputNode = <div className="font-mono text-xs text-zinc-300 select-text">{TERMINAL_CONFIG.hostname}</div>;
    } else if (commandName === 'date') {
      outputNode = (
        <div className="font-mono text-xs text-zinc-300 select-text">
          {new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })} (Sri Lanka Standard Time / UTC+05:30)
        </div>
      );
    } else if (commandName === 'sudo') {
      outputNode = (
        <div className="font-mono text-xs text-zinc-300 space-y-0.5 select-text">
          <div>[sudo] password for {TERMINAL_CONFIG.user}: </div>
          <div className="text-rose-400">{TERMINAL_CONFIG.user} is not in the sudoers file.  This incident will be reported.</div>
        </div>
      );
    } else if (commandName === 'echo') {
      outputNode = <div className="font-mono text-xs text-zinc-300 select-text">{args.join(' ')}</div>;
    } else if (commandName === 'exit') {
      setIsOpen(false);
      setCurrentInput('');
      return;
    } else {
      outputNode = (
        <div className="font-mono text-xs space-y-1 text-rose-400">
          <div>bash: {commandName}: command not found</div>
          <div className="text-zinc-500 text-[11px]">
            Type <button onClick={() => executeCommand('help')} className="text-teal-300 hover:underline font-semibold cursor-pointer">help</button> to view available commands.
          </div>
        </div>
      );
    }

    setEntries((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        cwd,
        command: trimmed,
        output: outputNode,
      },
    ]);
    setCurrentInput('');
  };

  // Keyboard navigation within the terminal input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setCurrentInput(commandHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput('');
      } else {
        setHistoryIndex(nextIdx);
        setCurrentInput(commandHistory[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = currentInput.trim();
      const parts = trimmed.split(' ');

      if (parts.length <= 1) {
        // Autocomplete command
        const match = ALL_COMMANDS.find((c) => c.startsWith(trimmed.toLowerCase()));
        if (match) {
          setCurrentInput(match + ' ');
        }
      } else if (parts[0] === 'cat' || parts[0] === 'cd') {
        // Autocomplete filename
        const files = FILESYSTEM[cwd] || [];
        const prefix = parts[1].toLowerCase();
        const matchFile = files.find((f) => f.toLowerCase().startsWith(prefix));
        if (matchFile) {
          setCurrentInput(`${parts[0]} ${matchFile}`);
        }
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      // Emulate SIGINT
      setEntries((prev) => [
        ...prev,
        {
          id: `int-${Date.now()}`,
          cwd,
          command: `${currentInput}^C`,
          output: null,
        },
      ]);
      setCurrentInput('');
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setEntries([]);
      setCurrentInput('');
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      if (soundEnabled) playKeyClick(850, 0.015);
    }
  };

  return (
    <>
      {/* ============================================================
          FLOATING ACTION BUTTON (FAB)
          Unified compact FAB across mobile, tablet, and desktop views.
          Positioned bottom-right above mobile nav bar & bottom of screen.
          ============================================================ */}
      <div className="fixed bottom-20 md:bottom-7 right-4 md:right-7 z-40">
        <motion.button
          onClick={() => {
            if (soundEnabled && !isOpen) playEnterBeep();
            setIsOpen((prev) => !prev);
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open Interactive CLI Terminal (Ctrl+K)"
          title="Terminal (Ctrl+K)"
          className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#090b10]/95 hover:bg-[#12151d] border border-zinc-800/90 hover:border-emerald-500/60 shadow-xl shadow-black/80 backdrop-blur-xl transition-all duration-200 cursor-pointer text-emerald-400 hover:text-emerald-300"
        >
          {/* Subtle ambient hover glow */}
          <span className="absolute -inset-0.5 rounded-2xl bg-emerald-500/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Terminal Icon (cleanly centered, no blinking light) */}
          <TerminalIcon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />

          {/* Desktop Hover Tooltip */}
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-zinc-800 text-zinc-300 text-[11px] font-mono whitespace-nowrap shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-emerald-400 font-semibold">Terminal</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 text-[10px]">Ctrl+K</span>
          </span>
        </motion.button>
      </div>

      {/* ============================================================
          GENUINE FULL-TERMINAL WINDOW
          Clicking anywhere focuses the terminal prompt!
          ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Terminal Window Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => hiddenInputRef.current?.focus()}
              className={`relative z-10 w-full rounded-2xl bg-black border-2 border-zinc-800 shadow-[0_0_90px_rgba(0,0,0,0.98)] flex flex-col overflow-hidden cursor-text transition-all duration-300 ${
                isMaximized ? 'max-w-6xl h-[94vh]' : 'max-w-3xl h-[600px] max-h-[88vh]'
              }`}
            >
              {/* Terminal Title Bar */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-between px-3.5 py-2.5 bg-[#08080a] border-b-2 border-zinc-800 select-none cursor-default"
              >
                {/* macOS / UNIX Traffic Light Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close (Esc)"
                    className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors flex items-center justify-center cursor-pointer group"
                  >
                    <X className="w-2 h-2 text-rose-950 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => setEntries([])}
                    title="Clear Screen (Ctrl+L)"
                    className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer"
                  />
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    title="Toggle Fullscreen"
                    className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                  />
                </div>

                {/* Shell Title */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 truncate px-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{TERMINAL_CONFIG.promptUser}:~ (bash) &mdash; 80&times;24</span>
                </div>

                {/* Header Action Tools */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    title={soundEnabled ? 'Mute keystroke sound' : 'Enable keystroke sound'}
                    className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    title={isMaximized ? 'Restore Window' : 'Maximize Window'}
                    className="hidden sm:inline-flex p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Main Terminal Scrollback Buffer - Pure Solid Black */}
              <div
                ref={terminalBodyRef}
                onClick={() => hiddenInputRef.current?.focus()}
                className="flex-1 p-3.5 sm:p-4 overflow-y-auto bg-black font-mono text-xs space-y-3.5 selection:bg-emerald-500/30 selection:text-white leading-relaxed cursor-text"
              >
                {entries.map((entry) => (
                  <div key={entry.id} className="space-y-1">
                    {/* Command Prompt Line */}
                    <div className="flex items-center gap-1.5 text-xs flex-wrap">
                      <span className={themeClasses.promptUser}>{TERMINAL_CONFIG.promptUser}</span>
                      <span className="text-zinc-500">:</span>
                      <span className={themeClasses.promptDir}>{entry.cwd}</span>
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="text-white font-medium ml-1">{entry.command}</span>
                    </div>

                    {/* Output Line(s) */}
                    {entry.output && (
                      <div className="pl-2 pt-0.5">
                        {entry.output}
                      </div>
                    )}
                  </div>
                ))}

                {/* ACTIVE LIVE PROMPT LINE (Direct interactive command line prompt) */}
                <div
                  onClick={() => hiddenInputRef.current?.focus()}
                  className="flex items-center gap-1.5 text-xs pt-1 font-mono cursor-text"
                >
                  <span className={`${themeClasses.promptUser} shrink-0 select-none`}>{TERMINAL_CONFIG.promptUser}</span>
                  <span className="text-zinc-500 shrink-0 select-none">:</span>
                  <span className={`${themeClasses.promptDir} shrink-0 select-none`}>{cwd}</span>
                  <span className="text-emerald-400 font-bold shrink-0 select-none">$</span>
                  
                  <input
                    ref={hiddenInputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className={`flex-1 bg-transparent border-0 outline-none ring-0 focus:ring-0 p-0 text-white font-mono text-xs ${themeClasses.caret} selection:bg-emerald-500/30 selection:text-white min-w-[120px] shadow-none`}
                    aria-label="Terminal command line input"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
