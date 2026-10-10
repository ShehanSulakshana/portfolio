import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Orbit, RotateCcw, MapPin, Send, Info, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { UniverseStar, AURA_PALETTE, AuraColorId, COSMIC_IT_SYMBOLS } from '../types/universe';
import { universeService } from '../services/universeService';

interface StagedPlacement {
  x: number;
  y: number;
}

/**
 * Calculates edge-safe tooltip positioning so cards near canvas borders
 * expand inward into the canvas rather than clipping out of bounds.
 */
const getEdgeSafeTooltipStyle = (x: number, y: number) => {
  let left = '50%';
  let right = 'auto';
  let transform = 'translateX(-50%)';

  if (x < 30) {
    // Near left edge: anchor to left, expand rightwards
    left = '0%';
    right = 'auto';
    transform = 'translateX(0)';
  } else if (x > 70) {
    // Near right edge: anchor to right, expand leftwards
    left = 'auto';
    right = '0%';
    transform = 'translateX(0)';
  }

  // Vertical placement
  const isNearTop = y < 28;
  const top = isNearTop ? '100%' : 'auto';
  const bottom = isNearTop ? 'auto' : '100%';
  const marginTop = isNearTop ? '8px' : '0';
  const marginBottom = isNearTop ? '0' : '8px';

  return { left, right, transform, top, bottom, marginTop, marginBottom };
};

export const VisitorUniverseCanvas: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState<UniverseStar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredStar, setHoveredStar] = useState<UniverseStar | null>(null);
  const [selectedStarMobile, setSelectedStarMobile] = useState<UniverseStar | null>(null);
  
  // Staging for planting a star
  const [isPlantMode, setIsPlantMode] = useState(false);
  const [stagedPlacement, setStagedPlacement] = useState<StagedPlacement | null>(null);
  const [visitorName, setVisitorName] = useState('Anonymous Traveler');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('✨');
  const [symbolCategory, setSymbolCategory] = useState<'all' | 'cosmic' | 'tech'>('all');
  const [selectedAura, setSelectedAura] = useState<AuraColorId>('teal');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPlantedId, setLastPlantedId] = useState<string | null>(null);
  const [plantError, setPlantError] = useState<string | null>(null);
  const [showUndoConfirm, setShowUndoConfirm] = useState(false);
  const [isUndoing, setIsUndoing] = useState(false);

  // Anti-automation & honeypot states
  const [honeypot, setHoneypot] = useState('');
  const [stagingStartTime, setStagingStartTime] = useState<number | null>(null);
  const [isPlantingEnabled, setIsPlantingEnabled] = useState(true);

  // One star per visitor rule
  const userPlantedStar = stars.find((s) => s.isUserPlanted);
  const hasUserPlanted = Boolean(userPlantedStar);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleLocateUserStar = (star?: UniverseStar) => {
    if (!star) return;
    setHoveredStar(star);
    setSelectedStarMobile(star);
    setLastPlantedId(star.id);
    setTimeout(() => setLastPlantedId(null), 3000);
  };

  // Reusable star fetching from Supabase / universeService
  const loadStarsData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    try {
      const [loaded, cfg] = await Promise.all([
        universeService.getStars(),
        universeService.getConfig(),
      ]);
      setStars(loaded);
      setIsPlantingEnabled(cfg.plantingEnabled);
    } catch (err) {
      console.warn('Failed to load stars:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load stars and configuration on mount
  useEffect(() => {
    loadStarsData(true);
  }, [loadStarsData]);

  // Prevent background scroll when modal is open and re-sync stars
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // If we don't have stars loaded yet, show the loader; if we already have stars, refresh in background
      loadStarsData(stars.length === 0);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, loadStarsData, stars.length]);

  // Listen for Escape key to close modal or exit plant mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (stagedPlacement) {
          setStagedPlacement(null);
          setStagingStartTime(null);
        } else if (isPlantMode) {
          setIsPlantMode(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stagedPlacement, isPlantMode]);

  const handleCancelPlanting = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setStagedPlacement(null);
    setStagingStartTime(null);
    setIsPlantMode(false);
    setPlantError(null);
  };

  // Handle clicking on the cosmos canvas - ONLY active if user intentionally chose to plant!
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlantMode || hasUserPlanted || !isPlantingEnabled) return;

    const target = e.target as HTMLElement;
    // Prevent click if clicking any button, existing star node, panel, or banner
    if (
      target.closest('button') ||
      target.closest('.star-node') ||
      target.closest('.placement-panel') ||
      target.closest('.guidance-banner')
    ) {
      return;
    }

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Calculate percentage coordinates (clamped between 6% and 94% to preserve margin)
    const pctX = Math.max(6, Math.min(94, Number(((clickX / rect.width) * 100).toFixed(1))));
    const pctY = Math.max(6, Math.min(94, Number(((clickY / rect.height) * 100).toFixed(1))));

    setStagedPlacement({ x: pctX, y: pctY });
    setStagingStartTime(Date.now()); // Anti-automation tracking: clock starts when coordinates are clicked
    setPlantError(null);
    setSelectedStarMobile(null);
  };

  // Confirm star planting ("Mark Planted") with anti-automation & honeypot verification
  const handleMarkPlanted = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!stagedPlacement) return;

    // Anti-automation measurement: humans take at least 2.5s to choose symbol, aura, type note, and click
    const durationMs = stagingStartTime ? Date.now() - stagingStartTime : 0;
    if (durationMs < 2500) {
      setPlantError('Automated submission detected. Human verification requires minimum engagement time (2.5s).');
      return;
    }

    // Honeypot trap check
    if (honeypot.trim().length > 0) {
      setPlantError('Bot trap triggered. Submission blocked.');
      return;
    }

    setIsSubmitting(true);
    setPlantError(null);

    try {
      const finalName = visitorName.trim() || 'Anonymous Traveler';
      const finalMessage = message.trim() || undefined;

      const newStar = await universeService.plantStar({
        x: stagedPlacement.x,
        y: stagedPlacement.y,
        name: finalName,
        symbol: selectedSymbol,
        aura: selectedAura,
        message: finalMessage,
        website_trap: honeypot,
        human_duration_ms: durationMs,
      });

      setStars((prev) => [...prev.filter((s) => s.id !== newStar.id), newStar]);
      setLastPlantedId(newStar.id);
      setStagedPlacement(null);
      setStagingStartTime(null);
      setIsPlantMode(false);
      setMessage('');
      // Reset highlight after 3 seconds
      setTimeout(() => setLastPlantedId(null), 3000);
    } catch (err: any) {
      setPlantError(err.message || 'Unable to plant star. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger confirmation dialog when user clicks Undo
  const handleRequestUndo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userPlantedStar) return;
    setShowUndoConfirm(true);
  };

  // Perform confirmed deletion
  const handleConfirmUndo = async () => {
    if (!userPlantedStar) return;
    setIsUndoing(true);
    try {
      await universeService.undoPlantedStar(userPlantedStar.id, userPlantedStar.undoToken);
      setStars((prev) => prev.filter((s) => s.id !== userPlantedStar.id));
      setHoveredStar(null);
      setSelectedStarMobile(null);
      setLastPlantedId(null);
      setShowUndoConfirm(false);
    } catch (err) {
      console.error('Error undoing star planting:', err);
    } finally {
      setIsUndoing(false);
    }
  };

  const activeAuraMeta = AURA_PALETTE.find((a) => a.id === selectedAura) || AURA_PALETTE[0];

  return (
    <>
      {/* ============================================================
          FLOATING ACTION BUTTON (FAB)
          Noticeably smaller than terminal FAB (w-9.5 h-9.5 vs terminal's w-12 h-12).
          Centered and hierarchically stacked right above the terminal FAB.
          ============================================================ */}
      <div className="fixed bottom-[8.5rem] md:bottom-[5.5rem] right-5 md:right-8 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open Community Constellation"
          title="Community Constellation"
          className="group relative flex items-center justify-center w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl bg-[#090b10]/95 hover:bg-[#12151d] border border-zinc-800/90 hover:border-teal-500/60 shadow-lg shadow-black/80 backdrop-blur-xl transition-all duration-200 cursor-pointer text-teal-400 hover:text-teal-300"
        >
          {/* Ambient teal hover halo */}
          <span className="absolute -inset-0.5 rounded-xl bg-teal-500/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Starlight icon scaled proportionally */}
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />

          {/* Desktop Hover Tooltip */}
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-zinc-800 text-zinc-200 text-[11px] font-mono whitespace-nowrap shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-teal-400 font-medium">Community Constellation</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 text-[10px]">✦ {stars.length}</span>
          </span>
        </motion.button>
      </div>

      {/* ============================================================
          MODAL DIALOG: COMMUNITY CONSTELLATION
          Fully responsive across mobile (touch-friendly), tablet, and desktop.
          ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
            {/* Backdrop with dark cosmic blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Shell with mobile viewport sizing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl h-[92vh] sm:h-[88vh] max-h-[760px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#08090d] border border-zinc-800 shadow-2xl shadow-black/95 overflow-hidden z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Responsive Header Bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#090b10] border-b border-zinc-800/80 shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-teal-950/50 border border-teal-800/60 flex items-center justify-center text-teal-400 shrink-0 shadow-sm shadow-teal-500/10">
                    <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-[spin_16s_linear_infinite]" />
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <h2 className="text-xs sm:text-base font-bold text-white tracking-tight">
                      Community Constellation
                    </h2>
                    {isLoading ? (
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-300 px-2 py-0.5 rounded-md bg-teal-950/50 border border-teal-800/60 shadow-sm shadow-teal-500/10">
                        <Loader2 className="w-2.5 h-2.5 animate-spin text-teal-400" />
                        <span>Syncing Sky...</span>
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800">
                        ✦ {stars.length} {stars.length === 1 ? 'star' : 'stars'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Single Plant Mode Trigger Button, Paused Badge, or Your Star & Undo */}
                  {!hasUserPlanted ? (
                    !isPlantingEnabled ? (
                      <div className="px-2.5 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                        <span>Planting Paused</span>
                      </div>
                    ) : !isPlantMode ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlantMode(true);
                          setSelectedStarMobile(null);
                        }}
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold bg-teal-400 hover:bg-teal-300 text-zinc-950 shadow-md shadow-teal-500/15 transition-all cursor-pointer active:scale-95"
                      >
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Plant a Star</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleCancelPlanting(e)}
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all cursor-pointer"
                      >
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )
                  ) : (
                    /* User has planted: show 'Your Star' locator pill AND 'Undo' button */
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleLocateUserStar(userPlantedStar)}
                        title="Your star is planted in the constellation. Click to locate it in space."
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium bg-teal-950/80 hover:bg-teal-900/90 text-teal-300 border border-teal-700/60 hover:border-teal-400 transition-all cursor-pointer shadow-sm shadow-teal-500/10 active:scale-95"
                      >
                        <span>{userPlantedStar?.symbol || '✦'}</span>
                        <span className="font-semibold text-white">Your Star</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse ml-0.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleRequestUndo}
                        title="Remove your planted star from constellation"
                        className="inline-flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 hover:border-rose-600 transition-all cursor-pointer active:scale-95"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Undo</span>
                      </button>
                    </div>
                  )}

                  {/* Manual Refresh / Re-sync button */}
                  <button
                    type="button"
                    onClick={() => loadStarsData(true)}
                    disabled={isLoading}
                    title="Re-sync constellation from database"
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700/80 transition-all cursor-pointer disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlantMode(false);
                      setStagedPlacement(null);
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-850 transition-colors cursor-pointer"
                    aria-label="Close Community Constellation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtitle & Guidance Banner (Clean, concise, and focused) */}
              <div className="px-3.5 sm:px-6 py-2.5 bg-[#0a0c12]/95 border-b border-zinc-800/80 flex items-center justify-between gap-3 text-xs shrink-0 backdrop-blur-sm">
                <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5 sm:mt-0" />
                  <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-sans font-normal [text-wrap:pretty]">
                    {!isPlantingEnabled
                      ? 'Constellation star planting is temporarily paused by the host. You can explore existing visitor stars below.'
                      : isPlantMode
                      ? 'Click anywhere on the space canvas to place your star.'
                      : 'Every visitor on this planet leaves a unique mark. Plant your star in the sky, choose your aura, and tell us where you are traveling from.'}
                  </p>
                </div>
                {isPlantMode && !hasUserPlanted && (
                  <button
                    type="button"
                    onClick={(e) => handleCancelPlanting(e)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer shrink-0"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Deep Pitch-Black Interactive Canvas Area */}
              <div
                ref={canvasRef}
                onClick={handleCanvasClick}
                className={`relative flex-1 w-full overflow-hidden select-none bg-black touch-none ${
                  isPlantMode ? 'cursor-crosshair' : 'cursor-default'
                }`}
                style={{
                  backgroundColor: '#000000',
                  backgroundImage: `
                    radial-gradient(1px 1px at 12% 18%, rgba(255, 255, 255, 0.45), transparent),
                    radial-gradient(1px 1px at 28% 42%, rgba(255, 255, 255, 0.3), transparent),
                    radial-gradient(1px 1px at 45% 15%, rgba(255, 255, 255, 0.35), transparent),
                    radial-gradient(1.5px 1.5px at 68% 28%, rgba(255, 255, 255, 0.4), transparent),
                    radial-gradient(1px 1px at 82% 64%, rgba(255, 255, 255, 0.25), transparent),
                    radial-gradient(1px 1px at 38% 82%, rgba(255, 255, 255, 0.3), transparent),
                    radial-gradient(1px 1px at 91% 18%, rgba(255, 255, 255, 0.25), transparent)
                  `,
                }}
              >
                {/* Single Uniform Smaller Grid Layout (Low Contrast 36px grid) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '36px 36px',
                  }}
                />

                {/* Floating Guidance Banner when Plant Mode is Active */}
                {isPlantMode && !stagedPlacement && (
                  <div
                    className="guidance-banner absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-950/95 border border-teal-500/50 text-teal-200 text-[11px] sm:text-xs shadow-xl backdrop-blur-md flex items-center gap-2 pointer-events-auto animate-in fade-in max-w-[90%]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
                    <span className="truncate">Click anywhere in space to place star</span>
                    <button
                      type="button"
                      onClick={(e) => handleCancelPlanting(e)}
                      className="ml-1 px-2 py-0.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] cursor-pointer shrink-0"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Dedicated Cosmic Loading State while Database Sync is in Progress */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      key="cosmic-loading-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none select-none z-30 bg-black/65 backdrop-blur-[3px]"
                    >
                      {/* Orbital Astrolabe Core with Synchronized Cosmic Rotation */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-5">
                        {/* Outer slow dashed celestial track */}
                        <div className="absolute inset-0 rounded-full border border-teal-500/25 border-dashed animate-[spin_24s_linear_infinite]" />

                        {/* Middle rotating glowing arc */}
                        <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-teal-400/50 border-t-teal-300 border-r-transparent animate-[spin_4s_linear_infinite_reverse]" />

                        {/* Innermost pulsing echo ring */}
                        <div className="absolute inset-5 rounded-full border border-teal-500/30 animate-ping opacity-35" />

                        {/* Soft radiant cyan core wash */}
                        <div className="absolute inset-4 rounded-full bg-teal-500/20 blur-md animate-pulse" />

                        {/* Central beacon node */}
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#090b10] border border-teal-500/70 shadow-lg shadow-teal-500/25 flex items-center justify-center text-teal-400">
                          <Orbit className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300 animate-[spin_10s_linear_infinite]" />
                        </div>

                        {/* Orbiting celestial satellite beacon */}
                        <div className="absolute inset-0 animate-[spin_3.5s_linear_infinite]">
                          <div className="w-2.5 h-2.5 rounded-full bg-teal-300 shadow-md shadow-teal-300 -translate-x-1/2 mx-auto" />
                        </div>
                      </div>

                      {/* Header and Animated Alignment Dots */}
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                          Aligning Celestial Coordinates
                        </h3>
                        <div className="flex items-center gap-1 pt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>

                      <p className="text-xs text-zinc-400 max-w-sm mt-1.5 leading-relaxed font-mono">
                        Connecting to database & scanning constellation stars...
                      </p>

                      {/* Luminous Shimmer Status Track */}
                      <div className="mt-4 w-44 sm:w-52 h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                        <div className="h-full bg-gradient-to-r from-transparent via-teal-400 to-transparent w-full animate-[shimmer_2s_ease-in-out_infinite]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty Sky State: ONLY shown when loaded and truly 0 stars exist in database */}
                {!isLoading && stars.length === 0 && !isPlantMode && !stagedPlacement && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none select-none z-10 animate-in fade-in duration-300">
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center text-teal-400 mb-3.5 shadow-xl shadow-black/70 backdrop-blur-sm">
                      <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-200 tracking-tight">
                      The Cosmic Sky is Tranquil
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-sm mt-1.5 leading-relaxed">
                      {isPlantingEnabled
                        ? 'No visitor stars have been planted yet. Click "Plant a Star" to be the very first to illuminate the cosmos!'
                        : 'No stars have been planted yet in the community constellation.'}
                    </p>
                  </div>
                )}

                {/* Render Constellation Stars */}
                {stars.map((star) => {
                  const aura = AURA_PALETTE.find((a) => a.id === star.aura) || AURA_PALETTE[0];
                  const isHovered = hoveredStar?.id === star.id;
                  const isRecent = lastPlantedId === star.id;

                  return (
                    <div
                      key={star.id}
                      className={`star-node absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer ${
                        isHovered ? 'z-50' : 'z-20'
                      }`}
                      style={{ left: `${star.x}%`, top: `${star.y}%` }}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStarMobile(star);
                      }}
                    >
                      {/* Generous touch/hover hit zone (32px for effortless mobile tapping) */}
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        {/* Outer realistic stellar corona glow matching the star's color */}
                        <span
                          className="absolute inset-0 rounded-full opacity-65 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${aura.hex} 0%, transparent 72%)`,
                            filter: 'blur(3.5px)',
                          }}
                        />

                        {/* Recent placement pulse ring */}
                        {isRecent && (
                          <span
                            className="absolute inset-0 rounded-full border-2 animate-ping pointer-events-none"
                            style={{ borderColor: aura.hex }}
                          />
                        )}

                        {/* Core star: Pure aura color throughout with brilliant starlight radiance */}
                        <div
                          className="relative w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover:scale-135"
                          style={{
                            backgroundColor: aura.hex,
                            boxShadow: `0 0 4px #ffffff, 0 0 9px ${aura.hex}, 0 0 18px ${aura.hex}b3`,
                          }}
                        />

                        {/* Subtle floating symbol on hover */}
                        {star.symbol && (
                          <span className="absolute -top-3.5 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none drop-shadow">
                            {star.symbol}
                          </span>
                        )}
                      </div>

                      {/* Desktop Hover Tooltip with Edge Safe Clipping Protection & 100% Solid Non-Transparent Background */}
                      {isHovered && !stagedPlacement && (
                        <div
                          className="pointer-events-none absolute z-50 px-3.5 py-2.5 rounded-xl border border-zinc-700/80 shadow-2xl whitespace-nowrap min-w-[190px] max-w-[280px] text-left hidden sm:block"
                          style={{
                            ...getEdgeSafeTooltipStyle(star.x, star.y),
                            backgroundColor: '#090b10',
                            boxShadow: '0 20px 35px -8px rgba(0, 0, 0, 0.98), 0 0 0 1px rgba(63, 63, 70, 0.8)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              {star.symbol && (
                                <span className="text-sm select-none shrink-0" aria-label="Symbol">
                                  {star.symbol}
                                </span>
                              )}
                              <span className="text-xs font-bold text-white truncate">
                                {star.name}
                              </span>
                            </div>
                            {star.isUserPlanted && (
                              <span className="text-[9px] font-mono text-teal-400 bg-teal-950 px-1.5 py-0.5 rounded border border-teal-700 font-medium shrink-0">
                                You
                              </span>
                            )}
                          </div>

                          {star.message && (
                            <p className="text-[11px] text-zinc-300 italic mb-2 leading-relaxed break-words whitespace-normal font-sans">
                              "{star.message}"
                            </p>
                          )}

                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1.5 border-t border-zinc-800">
                            <span>Coords: {star.x}% · {star.y}%</span>
                            {star.isUserPlanted && (
                              <span className="text-teal-400 font-medium">Planted by you</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Staged Placement Target Marker */}
                {stagedPlacement && (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                    style={{ left: `${stagedPlacement.x}%`, top: `${stagedPlacement.y}%` }}
                  >
                    <div className="relative flex flex-col items-center justify-center">
                      <span className="text-xs select-none mb-1 animate-bounce filter drop-shadow">
                        {selectedSymbol}
                      </span>
                      <div className="relative flex items-center justify-center">
                        <span
                          className="absolute w-8 h-8 rounded-full border border-dashed animate-spin pointer-events-none"
                          style={{ borderColor: activeAuraMeta.hex }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full animate-ping pointer-events-none"
                          style={{ backgroundColor: activeAuraMeta.hex }}
                        />
                        <span
                          className="relative w-3 h-3 rounded-full shadow-lg"
                          style={{
                            backgroundColor: activeAuraMeta.hex,
                            boxShadow: `0 0 6px #ffffff, 0 0 12px ${activeAuraMeta.hex}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Placement Drawer / Form when a star is staged (Responsive Mobile Bottom-Sheet) */}
              <AnimatePresence>
                {stagedPlacement && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ duration: 0.2 }}
                    className="placement-panel absolute bottom-11 sm:bottom-14 left-2.5 right-2.5 sm:left-auto sm:right-6 sm:w-80 max-h-[75vh] overflow-y-auto p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950/98 border border-zinc-800 shadow-2xl backdrop-blur-xl z-40 text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                        <MapPin className="w-3.5 h-3.5 text-teal-400" />
                        <span>Place Your Star</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {stagedPlacement.x}% , {stagedPlacement.y}%
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
                      Choose your symbol, set your aura, and tell us where you're traveling from.
                    </p>

                    <div className="space-y-2.5 sm:space-y-3 text-xs">
                      {/* Name & Cosmic/IT Symbol Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-medium text-zinc-300">
                            Visitor Name & Symbol
                          </label>
                          <span className="text-[10px] font-mono text-teal-400">
                            {COSMIC_IT_SYMBOLS.find((s) => s.emoji === selectedSymbol)?.label || 'Symbol'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-sm shrink-0 shadow-inner"
                            title="Chosen Symbol"
                          >
                            <span className="select-none">{selectedSymbol}</span>
                          </div>
                          <input
                            type="text"
                            value={visitorName}
                            onChange={(e) => setVisitorName(e.target.value)}
                            maxLength={32}
                            placeholder="Anonymous Traveler"
                            className="flex-1 px-3 py-1.5 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-teal-400 transition-colors"
                          />
                        </div>

                        {/* Category filter tabs */}
                        <div className="flex items-center gap-1 mb-1.5 text-[10px] font-mono">
                          <button
                            type="button"
                            onClick={() => setSymbolCategory('all')}
                            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              symbolCategory === 'all'
                                ? 'bg-zinc-800 text-teal-400 font-semibold'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            All ({COSMIC_IT_SYMBOLS.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setSymbolCategory('cosmic')}
                            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              symbolCategory === 'cosmic'
                                ? 'bg-zinc-800 text-teal-400 font-semibold'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            Cosmic (8)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSymbolCategory('tech')}
                            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              symbolCategory === 'tech'
                                ? 'bg-zinc-800 text-teal-400 font-semibold'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            IT & Cyber (8)
                          </button>
                        </div>

                        {/* Symbol Quick-Pick Palette */}
                        <div className="grid grid-cols-8 gap-1 p-1 rounded-lg bg-zinc-900/90 border border-zinc-850">
                          {COSMIC_IT_SYMBOLS.filter(
                            (item) => symbolCategory === 'all' || item.category === symbolCategory
                          ).map((item) => {
                            const isSelected = selectedSymbol === item.emoji;
                            return (
                              <button
                                key={item.emoji}
                                type="button"
                                onClick={() => setSelectedSymbol(item.emoji)}
                                title={`${item.label} (${item.category === 'cosmic' ? 'Cosmic' : 'IT/Tech'})`}
                                className={`h-7 rounded-md flex items-center justify-center text-xs transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-zinc-800 ring-1.5 ring-teal-400 scale-105 shadow-sm shadow-teal-500/20'
                                    : 'hover:bg-zinc-800/70 opacity-75 hover:opacity-100'
                                }`}
                              >
                                <span className="select-none">{item.emoji}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Star Aura Color Selector */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] font-medium text-zinc-300">
                            Stellar Aura Spectrum
                          </label>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {activeAuraMeta.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-1 rounded-lg sm:rounded-xl bg-zinc-900/90 border border-zinc-850">
                          {AURA_PALETTE.map((aura) => {
                            const isChosen = selectedAura === aura.id;
                            return (
                              <button
                                key={aura.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAura(aura.id);
                                }}
                                title={`${aura.name} (${aura.spectralClass})`}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                  isChosen
                                    ? 'bg-zinc-800 ring-2 ring-teal-400 scale-105'
                                    : 'hover:bg-zinc-800/60 opacity-80 hover:opacity-100'
                                }`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: aura.hex,
                                    boxShadow: isChosen ? `0 0 6px ${aura.hex}` : 'none',
                                  }}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Optional Short Message */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-medium text-zinc-300">
                            Short Message <span className="text-zinc-500">(Optional)</span>
                          </label>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {message.length}/80
                          </span>
                        </div>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          maxLength={80}
                          placeholder="e.g. Traveling from Sri Lanka"
                          className="w-full px-3 py-1.5 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-teal-400 transition-colors"
                        />
                      </div>

                      {/* Invisible Anti-Bot Honeypot Field */}
                      <input
                        type="text"
                        name="website_trap"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="hidden pointer-events-none opacity-0 absolute -left-[9999px]"
                      />

                      {/* Security / Validation Feedback Error */}
                      {plantError && (
                        <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-800/80 text-[11px] text-rose-200 leading-tight">
                          {plantError}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => handleCancelPlanting(e)}
                          className="px-3 py-1.5 rounded-lg sm:rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-850 text-xs cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleMarkPlanted(e)}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold text-zinc-950 bg-teal-400 hover:bg-teal-300 shadow-md shadow-teal-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-3 h-3" />
                          <span>{isSubmitting ? 'Planting...' : 'Mark Planted'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Selected Star Card (Optimized Touch Inspection) */}
              {selectedStarMobile && !stagedPlacement && (
                <div
                  className="sm:hidden absolute bottom-11 left-2.5 right-2.5 p-3 rounded-xl border border-zinc-700/80 shadow-2xl z-40 text-left animate-in slide-in-from-bottom-2"
                  style={{
                    backgroundColor: '#090b10',
                    boxShadow: '0 20px 35px -8px rgba(0, 0, 0, 0.98), 0 0 0 1px rgba(63, 63, 70, 0.8)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {selectedStarMobile.symbol && (
                        <span className="text-base select-none shrink-0" aria-label="Symbol">
                          {selectedStarMobile.symbol}
                        </span>
                      )}
                      <span className="text-xs font-bold text-white">
                        {selectedStarMobile.name}
                      </span>
                      {selectedStarMobile.isUserPlanted && (
                        <span className="text-[9px] font-mono text-teal-400 bg-teal-950/80 px-1.5 py-0.2 rounded border border-teal-800/60">
                          You
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStarMobile(null);
                      }}
                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {selectedStarMobile.message && (
                    <p className="text-xs text-zinc-300 italic mb-2 leading-relaxed">
                      "{selectedStarMobile.message}"
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-800/80">
                    <span>Coordinates: {selectedStarMobile.x}% · {selectedStarMobile.y}%</span>
                    {selectedStarMobile.isUserPlanted ? (
                      <span className="text-teal-400 font-medium">Planted by you</span>
                    ) : (
                      <span>Constellation star</span>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Dialog Bar: Counter & Helper */}
              <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 bg-[#090b10] border-t border-zinc-800/80 text-[11px] font-mono shrink-0">
                <div className="flex items-center gap-2 text-teal-400 font-semibold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>✦ {stars.length} Stars in Constellation</span>
                </div>

                <div className="text-zinc-500 hidden sm:block">
                  {hasUserPlanted ? (
                    <span className="text-zinc-400">
                      Your star:{' '}
                      <span className="text-white font-medium">
                        {userPlantedStar?.symbol} {userPlantedStar?.name}
                      </span>{' '}
                      <span className="text-zinc-500">(1 star per visitor)</span>
                    </span>
                  ) : isPlantMode ? (
                    'Click space to choose coordinates'
                  ) : (
                    'Hover stars to read notes'
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          UNDO CONFIRMATION MODAL
          Prompts for explicit visitor confirmation before removing star.
          ============================================================ */}
      <AnimatePresence>
        {showUndoConfirm && userPlantedStar && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
            onClick={() => {
              if (!isUndoing) setShowUndoConfirm(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-2xl bg-[#0e1017] border border-zinc-800 shadow-2xl p-5 sm:p-6 text-left z-10 overflow-hidden cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle top crimson hairline highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500/20 via-rose-500 to-rose-500/20" />

              <div className="flex items-start gap-3.5 mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 shrink-0 shadow-sm shadow-rose-500/10">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Remove Your Star?
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Are you sure you want to delete your planted star? This will permanently remove your beacon from the community sky.
                  </p>
                </div>
              </div>

              {/* Star Preview Pill */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 text-xs mb-4">
                <span className="text-lg shrink-0">{userPlantedStar.symbol || '✨'}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-zinc-200 font-semibold truncate">{userPlantedStar.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    Aura: <span className="capitalize text-zinc-300">{userPlantedStar.aura}</span> · Coordinates: {userPlantedStar.x}% · {userPlantedStar.y}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  disabled={isUndoing}
                  onClick={() => setShowUndoConfirm(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Keep Star
                </button>
                <button
                  type="button"
                  disabled={isUndoing}
                  onClick={handleConfirmUndo}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/25 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  {isUndoing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Yes, Delete Star</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
