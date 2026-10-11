import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Compass } from 'lucide-react';

interface Star {
  id: number;
  x: number;
  y: number;
  name: string;
  color: string;
  glow: string;
  radius: number;
  pulseSpeed: number;
  phase: number;
  plantedAt: number;
}

const COLOR_PALETTE = [
  { id: 'cyan', hex: '#38bdf8', glow: 'rgba(56, 189, 248, 0.85)', name: 'Cyan' },
  { id: 'teal', hex: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.85)', name: 'Teal' },
  { id: 'gold', hex: '#fbbf24', glow: 'rgba(251, 191, 36, 0.85)', name: 'Gold' },
  { id: 'violet', hex: '#c084fc', glow: 'rgba(192, 132, 252, 0.85)', name: 'Violet' },
  { id: 'rose', hex: '#fb7185', glow: 'rgba(251, 113, 133, 0.85)', name: 'Rose' },
  { id: 'white', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.95)', name: 'White' },
];

interface StarfieldCanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [pendingPoint, setPendingPoint] = useState<{ x: number; y: number } | null>(null);
  const [customName, setCustomName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[1]);
  const [statusMessage, setStatusMessage] = useState<string>('Click space to choose star location');
  
  // Store stars in ref for requestAnimationFrame loop
  const starsRef = useRef<Star[]>([]);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const selectedColorRef = useRef(selectedColor);
  const customNameRef = useRef(customName);

  useEffect(() => {
    starsRef.current = stars;
  }, [stars]);

  useEffect(() => {
    pendingRef.current = pendingPoint;
  }, [pendingPoint]);

  useEffect(() => {
    selectedColorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    customNameRef.current = customName;
  }, [customName]);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    // Ambient micro-stars
    const microStars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      phase: number;
    }> = [];

    const initMicroStars = () => {
      microStars.length = 0;
      const count = Math.min(180, Math.floor((width * height) / 8000));
      for (let i = 0; i < count; i++) {
        microStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.9 + 0.3,
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initMicroStars();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.03;

      // Solid black background styled like outer space
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // 1. Ambient distant micro-stars
      ctx.save();
      microStars.forEach((s) => {
        s.phase += s.twinkleSpeed;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 2. Render all planted stars with glowing effects
      starsRef.current.forEach((star) => {
        star.phase += star.pulseSpeed;
        const pulse = Math.sin(star.phase) * 0.35 + 0.95;
        const currentRadius = star.radius * pulse;

        // Outer Glow with Canvas Shadow
        ctx.save();
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 18 * pulse;

        const grad = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          currentRadius * 3.8
        );
        grad.addColorStop(0, star.color);
        grad.addColorStop(0.35, star.glow);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // Star Bright Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Subtle birth ripple
        const age = Date.now() - star.plantedAt;
        if (age < 900) {
          const rippleR = (age / 900) * 32;
          const rippleAlpha = 1 - age / 900;
          ctx.save();
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = rippleAlpha;
          ctx.beginPath();
          ctx.arc(star.x, star.y, rippleR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Star Name Label
        ctx.save();
        ctx.font = '500 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        const textMetrics = ctx.measureText(star.name);
        const bgPadding = 4;
        const textY = star.y + currentRadius + 7;
        ctx.fillRect(
          star.x - textMetrics.width / 2 - bgPadding,
          textY - 2,
          textMetrics.width + bgPadding * 2,
          14
        );

        ctx.fillStyle = '#f3f4f6';
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 6;
        ctx.fillText(star.name, star.x, textY);
        ctx.restore();
      });

      // 3. Render Pending Star Placement Reticle
      if (pendingRef.current) {
        const p = pendingRef.current;
        const reticlePulse = Math.sin(time * 3) * 0.2 + 0.8;
        const color = selectedColorRef.current.hex;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 14 * reticlePulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        const previewName = (customNameRef.current.trim() || 'Anonymous') + ' (Pending)';
        ctx.font = '600 11px ui-monospace, SFMono-Regular, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = color;
        ctx.fillText(previewName, p.x, p.y + 20);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPendingPoint({ x, y });
    setStatusMessage('Position chosen! Click "Mark Planted"');
  };

  const handleMarkPlanted = () => {
    let point = pendingPoint;
    if (!point) {
      const canvas = canvasRef.current;
      const w = canvas?.parentElement?.clientWidth || 600;
      const h = canvas?.parentElement?.clientHeight || 400;
      point = {
        x: 80 + Math.random() * (w - 160),
        y: 120 + Math.random() * (h - 220),
      };
    }

    const trimmedName = customName.trim();
    const finalName = trimmedName.length > 0 ? trimmedName : 'Anonymous';

    const newStar: Star = {
      id: Date.now() + Math.random(),
      x: point.x,
      y: point.y,
      name: finalName,
      color: selectedColor.hex,
      glow: selectedColor.glow,
      radius: Math.random() * 1.5 + 3.2,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2,
      plantedAt: Date.now(),
    };

    setStars((prev) => [...prev, newStar]);
    setPendingPoint(null);
    setCustomName('');
    setStatusMessage('Star planted! Click space to plant another.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden select-none">
      {/* Top Floating Glass HUD */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-2xl z-20 bg-zinc-950/85 backdrop-blur-md border border-zinc-800/90 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Visitor Starfield Canvas
              </h2>
              <p className="text-[11px] text-zinc-400">
                Click outer space to plant your glowing star.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="./starfield.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-teal-300 px-2 py-1 rounded-lg border border-zinc-800 hover:border-teal-500/40 bg-zinc-900/60 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <Compass className="w-3 h-3" />
              <span>Standalone HTML</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close starfield"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          {/* Custom Name Input */}
          <div className="flex-1">
            <label htmlFor="react-star-name" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Star Name
            </label>
            <input
              id="react-star-name"
              type="text"
              placeholder="Anonymous"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              maxLength={24}
              className="w-full bg-zinc-900/90 border border-zinc-700/80 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-all"
            />
          </div>

          {/* Color Palette */}
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Aura Color
            </span>
            <div className="flex items-center gap-1.5">
              {COLOR_PALETTE.map((c) => {
                const isActive = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded-full transition-all relative ${
                      isActive ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black' : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: isActive ? `0 0 10px ${c.hex}` : undefined,
                    }}
                    title={c.name}
                    aria-label={`${c.name} aura`}
                  />
                );
              })}
            </div>
          </div>

          {/* Mark Planted Button */}
          <button
            type="button"
            onClick={handleMarkPlanted}
            className="w-full sm:w-auto px-4 py-2 bg-teal-400 hover:bg-teal-300 text-zinc-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-teal-500/20 active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Mark Planted</span>
          </button>
        </div>
      </div>

      {/* Solid Black Canvas */}
      <div className="flex-1 relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        {/* First time hint if empty */}
        {stars.length === 0 && !pendingPoint && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs sm:text-sm border border-dashed border-zinc-800 rounded-xl px-4 py-3 bg-zinc-950/70 backdrop-blur-sm text-center">
            ✨ Click anywhere in space to position your star
          </div>
        )}
      </div>

      {/* Bottom Counter Bar */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-zinc-950/85 backdrop-blur-md border border-zinc-800/90 rounded-full px-5 py-2 flex items-center gap-4 shadow-xl">
        <div className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center gap-2">
          <span>Stars Planted:</span>
          <span className="font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full text-xs">
            {stars.length}
          </span>
        </div>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
