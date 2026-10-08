export type AuraColorId = 'teal' | 'blue' | 'white' | 'gold' | 'amber' | 'coral' | 'cyan' | 'emerald' | 'rose' | 'violet' | 'pearl';

export interface AuraOption {
  id: AuraColorId;
  name: string;
  spectralClass: string;
  hex: string;
  accentClass: string;
  glowClass: string;
}

export interface UniverseStar {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  name: string;
  symbol?: string; // Cosmic or IT emoji symbol chosen by user
  aura: AuraColorId;
  message?: string;
  createdAt: number; // timestamp
  isUserPlanted?: boolean;
  undoToken?: string;
  undoExpiresAt?: number;
}

export interface ConstellationConfig {
  plantingEnabled: boolean;
  announcement?: string;
}

export interface CosmicSymbolOption {
  emoji: string;
  label: string;
  category: 'cosmic' | 'tech';
}

/**
 * Curated list of cosmic and IT/Cybersecurity symbols for visitor star identity
 */
export const COSMIC_IT_SYMBOLS: CosmicSymbolOption[] = [
  // Cosmic / Universe
  { emoji: '🚀', label: 'Starship', category: 'cosmic' },
  { emoji: '🪐', label: 'Saturn / Orbit', category: 'cosmic' },
  { emoji: '🌌', label: 'Deep Galaxy', category: 'cosmic' },
  { emoji: '☄️', label: 'Comet', category: 'cosmic' },
  { emoji: '🛰️', label: 'Orbital Satellite', category: 'cosmic' },
  { emoji: '✨', label: 'Starlight', category: 'cosmic' },
  { emoji: '🔭', label: 'Observatory', category: 'cosmic' },
  { emoji: '🛸', label: 'Cosmic Probe', category: 'cosmic' },
  // IT / Coding / Cybersecurity
  { emoji: '💻', label: 'Developer', category: 'tech' },
  { emoji: '🛡️', label: 'Cyber Defense', category: 'tech' },
  { emoji: '⚡', label: 'Protocol', category: 'tech' },
  { emoji: '👾', label: 'Pixel Cyber', category: 'tech' },
  { emoji: '🔒', label: 'Cryptographic', category: 'tech' },
  { emoji: '🤖', label: 'Automation / AI', category: 'tech' },
  { emoji: '🌐', label: 'Network Node', category: 'tech' },
  { emoji: '👨‍💻', label: 'Engineer', category: 'tech' },
];

/**
 * Realistic astronomical star palettes with rich, highly saturated stellar hues
 */
export const AURA_PALETTE: AuraOption[] = [
  {
    id: 'teal',
    name: 'Aurora Emerald',
    spectralClass: 'Signature Teal',
    hex: '#00f5d4', // Highly saturated electric cyber teal
    accentClass: 'bg-teal-400',
    glowClass: 'shadow-[0_0_14px_rgba(0,245,212,0.95)]',
  },
  {
    id: 'blue',
    name: 'Sirius Blue',
    spectralClass: 'Class B · Blue Giant',
    hex: '#0ea5e9', // Deep vibrant electric azure blue
    accentClass: 'bg-sky-400',
    glowClass: 'shadow-[0_0_14px_rgba(14,165,233,0.95)]',
  },
  {
    id: 'white',
    name: 'Vega White',
    spectralClass: 'Class A · Pure White',
    hex: '#ffffff', // Brilliant pure diamond starlight
    accentClass: 'bg-white',
    glowClass: 'shadow-[0_0_14px_rgba(255,255,255,0.98)]',
  },
  {
    id: 'gold',
    name: 'Capella Gold',
    spectralClass: 'Class G · Solar Star',
    hex: '#ffd100', // Highly saturated rich solar gold
    accentClass: 'bg-yellow-400',
    glowClass: 'shadow-[0_0_14px_rgba(255,209,0,0.95)]',
  },
  {
    id: 'amber',
    name: 'Arcturus Amber',
    spectralClass: 'Class K · Orange Giant',
    hex: '#ff7a00', // Saturated vivid fiery orange-amber
    accentClass: 'bg-orange-500',
    glowClass: 'shadow-[0_0_14px_rgba(255,122,0,0.95)]',
  },
  {
    id: 'coral',
    name: 'Betelgeuse Ruby',
    spectralClass: 'Class M · Red Supergiant',
    hex: '#ff2d55', // Saturated vivid celestial ruby-rose
    accentClass: 'bg-rose-500',
    glowClass: 'shadow-[0_0_14px_rgba(255,45,85,0.95)]',
  },
];
