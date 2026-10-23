import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  enabled?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    // On mobile devices, 1x DPR saves 4x fillrate with identical soft visual quality
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Subtle modern palette: cyber teal and muted indigo
    const TEAL = { r: 45, g: 212, b: 191 };
    const INDIGO = { r: 129, g: 140, b: 248 };
    const SLATE = { r: 226, g: 232, b: 240 };
    const PALETTES = [TEAL, INDIGO, SLATE];

    const particleCount = isMobile ? 16 : 38;

    const particles = Array.from({ length: particleCount }, () => {
      const color = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.6,
        color,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.008,
        baseAlpha: 0.15 + Math.random() * 0.2,
      };
    });

    let animationId: number;
    let isVisible = !document.hidden;
    let isScrolling = false;
    let scrollTimeout: number;
    let lastDrawTime = 0;
    const minFrameInterval = isMobile ? 32 : 16; // ~30fps on mobile to save GPU, ~60fps desktop

    const render = (currentTime: number) => {
      if (!isVisible) return;

      // Throttle draw calls on mobile devices
      if (currentTime - lastDrawTime >= minFrameInterval) {
        lastDrawTime = currentTime;

        // Skip background redraw during active touch scrolling on mobile to keep 60fps scroll locked
        if (!isScrolling || !isMobile) {
          ctx.clearRect(0, 0, width, height);

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around boundaries
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            p.phase += p.twinkleSpeed;
            const twinkle = (Math.sin(p.phase) + 1) / 2;
            const alpha = p.baseAlpha * (0.6 + 0.4 * twinkle);

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastDrawTime = performance.now();
        animationId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationId);
      }
    };

    const handleScroll = () => {
      if (!isMobile) return;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(scrollTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
