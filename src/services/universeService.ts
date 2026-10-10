import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UniverseStar, ConstellationConfig } from '../types/universe';
import { PROFILE_INFO } from '../data/portfolioData';

const STORAGE_KEY = 'visitor_universe_stars_v4';
const USER_STAR_KEY = 'visitor_user_star_session_v4';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Purge any legacy demo/seed stars from visitor session storage
try {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    const cleaned = parsed.filter((s: any) => !s.id?.startsWith('seed-'));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }
  const userStarRaw = sessionStorage.getItem(USER_STAR_KEY);
  if (userStarRaw) {
    const userStar = JSON.parse(userStarRaw);
    if (userStar.id?.startsWith('seed-')) {
      sessionStorage.removeItem(USER_STAR_KEY);
    }
  }
} catch {
  // ignore
}

export interface PlantStarRequest {
  x: number;
  y: number;
  name: string;
  symbol: string;
  aura: UniverseStar['aura'];
  message?: string;
  website_trap?: string; // Honeypot field
  human_duration_ms: number; // Duration in ms spent on form
}

class UniverseService {
  private supabase: SupabaseClient | null = null;
  private supabaseUrl: string = '';

  constructor() {
    const url = import.meta.env.VITE_SUPABASE_URL || 'https://rdhkbdfmcutrcduzvtgp.supabase.co';
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    this.supabaseUrl = url;
    if (url && anonKey) {
      try {
        this.supabase = createClient(url, anonKey);
      } catch (err) {
        console.warn('Failed to initialize Supabase client:', err);
      }
    }
  }

  /**
   * Checks configuration table in Supabase (or defaults to enabled)
   */
  public async getConfig(): Promise<ConstellationConfig> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('constellation_config')
          .select('key, value')
          .eq('key', 'planting_enabled')
          .single();

        if (!error && data) {
          return {
            plantingEnabled: data.value === true,
          };
        }
      } catch (err) {
        console.warn('Error fetching constellation config:', err);
      }
    }
    return { plantingEnabled: true };
  }

  /**
   * Fetches all visible constellation stars.
   * If there are no stars in the database, returns an empty array.
   * NO fake or demo stars are ever shown.
   */
  public async getStars(): Promise<UniverseStar[]> {
    let baseStars: UniverseStar[] = [];
    let hasQueriedDb = false;

    if (this.supabase) {
      try {
        // Query public safe view or active stars from Supabase
        const { data, error } = await this.supabase
          .from('public_constellation_stars')
          .select('id, x, y, name, symbol, aura, message, created_at')
          .order('created_at', { ascending: true });

        if (!error && data) {
          hasQueriedDb = true;
          // data can be empty array [] when 0 stars exist in db
          baseStars = data.map((row: any) => ({
            id: row.id,
            x: Number(row.x),
            y: Number(row.y),
            name: row.name,
            symbol: row.symbol || '✨',
            aura: row.aura,
            message: row.message || undefined,
            createdAt: new Date(row.created_at).getTime(),
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch query issue:', err);
      }
    }

    // Only if DB was not queried (e.g. no Supabase client configured)
    // read from local session storage, ignoring any fake seeds
    if (!hasQueriedDb) {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          baseStars = parsed.filter((s: UniverseStar) => !s.id.startsWith('seed-'));
        }
      } catch {
        baseStars = [];
      }
    }

    // Attach user's planted star from session if exists and valid
    try {
      const userStarRaw = sessionStorage.getItem(USER_STAR_KEY);
      if (userStarRaw) {
        const userStar: UniverseStar = JSON.parse(userStarRaw);
        if (!userStar.id.startsWith('seed-')) {
          const filtered = baseStars.filter((s) => s.id !== userStar.id);
          return [...filtered, { ...userStar, isUserPlanted: true }];
        }
      }
    } catch {
      // ignore
    }

    return baseStars;
  }

  /**
   * Plant a new star with anti-spam, honeypot & email notifications
   */
  public async plantStar(req: PlantStarRequest): Promise<UniverseStar> {
    // 1. Anti-Automation: Check minimum human duration
    if (req.human_duration_ms < 2500) {
      throw new Error('Automated submission detected. Human verification requires minimum engagement time.');
    }

    // 2. Anti-Spam: Check honeypot field
    if (req.website_trap && req.website_trap.trim().length > 0) {
      throw new Error('Automated bot trap triggered.');
    }

    // 3. Check configuration (planting_enabled)
    const config = await this.getConfig();
    if (!config.plantingEnabled) {
      throw new Error('Star plantation is currently paused by the host.');
    }

    // Check if user already planted in this session
    const existing = sessionStorage.getItem(USER_STAR_KEY);
    if (existing) {
      throw new Error('You have already planted a star in this session. One star per visitor is permitted.');
    }

    // Generate random client deletion/undo token
    const deletionToken = `del_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    // Try Supabase Edge Function if backend URL is present
    if (this.supabaseUrl) {
      try {
        const edgeFunctionUrl = `${this.supabaseUrl}/functions/v1/plant-star`;
        const res = await fetch(edgeFunctionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            x: req.x,
            y: req.y,
            name: req.name,
            symbol: req.symbol,
            aura: req.aura,
            message: req.message,
            human_duration_ms: req.human_duration_ms,
            website_trap: req.website_trap,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          const star: UniverseStar = {
            id: result.star.id,
            x: result.star.x,
            y: result.star.y,
            name: result.star.name,
            symbol: result.star.symbol,
            aura: result.star.aura,
            message: result.star.message,
            createdAt: new Date(result.star.created_at).getTime(),
            isUserPlanted: true,
            undoToken: result.undo_token || deletionToken,
            undoExpiresAt: result.undo_expires_at || Date.now() + 5 * 60 * 1000,
          };

          sessionStorage.setItem(USER_STAR_KEY, JSON.stringify(star));
          return star;
        } else {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to plant star via Supabase backend.');
        }
      } catch (err: any) {
        console.warn('Edge function error, continuing with interactive direct dispatch:', err);
      }
    }

    // Direct Mode: create star & dispatch interactive email via Web3Forms API
    const starId = `star-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newStar: UniverseStar = {
      id: starId,
      x: req.x,
      y: req.y,
      name: req.name,
      symbol: req.symbol,
      aura: req.aura,
      message: req.message,
      createdAt: Date.now(),
      isUserPlanted: true,
      undoToken: deletionToken,
      undoExpiresAt: Date.now() + 5 * 60 * 1000, // 5 min undo grace window
    };

    // Save in session storage
    sessionStorage.setItem(USER_STAR_KEY, JSON.stringify(newStar));

    const currentStars = await this.getStars();
    const updated = [...currentStars.filter((s) => s.id !== starId), newStar];
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Send interactive notification email via Contact API (Web3Forms)
    this.sendNotificationEmail(newStar, deletionToken).catch((err) => {
      console.warn('Could not send notification email:', err);
    });

    return newStar;
  }

  /**
   * Dispatches formatted interactive email using Web3Forms
   */
  private async sendNotificationEmail(star: UniverseStar, deletionToken: string): Promise<void> {
    const removalEndpoint = this.supabaseUrl
      ? `${this.supabaseUrl}/functions/v1/manage-star?action=remove&id=${star.id}&token=${deletionToken}`
      : `${PROFILE_INFO.livePortfolio}?remove_star_id=${star.id}&token=${deletionToken}`;

    const pauseEndpoint = this.supabaseUrl
      ? `${this.supabaseUrl}/functions/v1/manage-star?action=pause_planting&token=${deletionToken}`
      : `${PROFILE_INFO.livePortfolio}?pause_constellation=true`;

    const formattedMessage = `
=====================================================
COMMUNITY CONSTELLATION - NEW STAR NOTIFICATION
=====================================================

A visitor has planted a new star in your live portfolio cosmos!

🌟 STAR DETAILS:
-----------------------------------------------------
• Visitor Name:  ${star.name}
• Cosmic Symbol: ${star.symbol || '✨'}
• Stellar Aura:  ${star.aura.toUpperCase()}
• Coordinates:   X: ${star.x}% · Y: ${star.y}%
• Message/Note:  ${star.message ? `"${star.message}"` : '(No message left)'}
• Planted Time:  ${new Date().toUTCString()}
• Star ID:       ${star.id}

🛡️ 1-CLICK MODERATION ACTIONS (NO ADMIN LOGIN NEEDED):
-----------------------------------------------------
If this star contains spam, inappropriate language, or if you want to remove it:

▶ REMOVE THIS STAR IMMEDIATELY (1-CLICK):
${removalEndpoint}

▶ PAUSE STAR PLANTING IN SKY (EMERGENCY STOP):
${pauseEndpoint}

▶ VIEW LIVE PORTFOLIO:
${PROFILE_INFO.livePortfolio}

=====================================================
Sent from Shehan Sulakshana Portfolio Backend System
=====================================================
`;

    await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: PROFILE_INFO.web3FormsKey,
        subject: `🌟 New Star Planted: ${star.symbol || '✦'} "${star.name}" in Community Constellation`,
        name: `Constellation Beacon (${star.name})`,
        email: PROFILE_INFO.email,
        message: formattedMessage,
        star_id: star.id,
        action_remove_url: removalEndpoint,
      }),
    });
  }

  /**
   * Allows the visitor to undo planting during the active grace period
   */
  public async undoPlantedStar(starId: string, undoToken?: string): Promise<void> {
    if (this.supabaseUrl && undoToken) {
      try {
        await fetch(
          `${this.supabaseUrl}/functions/v1/manage-star?action=undo&id=${starId}&token=${undoToken}`,
          { method: 'GET' }
        );
      } catch (err) {
        console.warn('Backend undo failed:', err);
      }
    }

    try {
      sessionStorage.removeItem(USER_STAR_KEY);
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UniverseStar[] = JSON.parse(stored);
        const filtered = parsed.filter((s) => s.id !== starId);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      }
    } catch {
      // ignore
    }
  }

  /**
   * Retrieves the currently stored user star from this browser session
   */
  public getUserPlantedStar(): UniverseStar | null {
    try {
      const stored = sessionStorage.getItem(USER_STAR_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  }
}

export const universeService = new UniverseService();
