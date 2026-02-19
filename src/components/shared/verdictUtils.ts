/**
 * Shared Verdict Parsing Utilities
 *
 * Extracted from SharedEdgarTab.tsx and SharedSourcesTab.tsx to eliminate
 * duplicated verdict parsing logic (types, colors, parse/strip functions).
 *
 * Used by both EDGAR filing analysis and Sources article analysis.
 */

export type VerdictLevel = 'Critical' | 'Important' | 'Low' | 'Already Incorporated';

export const VERDICT_COLORS: Record<VerdictLevel, { color: string; bg: string }> = {
  'Critical':             { color: 'var(--coral)', bg: 'var(--coral-dim)' },
  'Important':            { color: 'var(--gold)',  bg: 'var(--gold-dim)' },
  'Low':                  { color: 'var(--text3)', bg: 'rgba(255,255,255,0.04)' },
  'Already Incorporated': { color: 'var(--mint)',  bg: 'var(--mint-dim)' },
};

export function parseVerdict(text: string): { level: VerdictLevel; explanation: string } | null {
  const match = text.match(/\[VERDICT:\s*(Critical|Important|Low|Already Incorporated)\]\s*[—\-–]\s*(.+)/i);
  if (!match) return null;
  // Normalize level: title-case each word to match VERDICT_COLORS keys
  const raw = match[1].trim();
  const level = raw.replace(/\b\w/g, c => c.toUpperCase()) as VerdictLevel;
  if (!(level in VERDICT_COLORS)) return null;
  return { level, explanation: match[2].trim() };
}

/** Strip the [VERDICT: ...] line from analysis text to avoid duplication */
export function stripVerdict(text: string): string {
  return text.replace(/\n?\[VERDICT:.*$/im, '').trim();
}
