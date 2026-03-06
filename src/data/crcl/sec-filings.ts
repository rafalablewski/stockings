/**
 * CRCL SEC Filing Type Colors
 * Extracted from CRCL.tsx for reuse in Dashboard.
 */

export const CRCL_SEC_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': { bg: 'color-mix(in srgb, var(--sky) 20%, transparent)', text: '#60a5fa' },
  '10-Q': { bg: 'color-mix(in srgb, var(--violet) 20%, transparent)', text: 'var(--violet)' },
  '8-K': { bg: 'color-mix(in srgb, var(--gold) 20%, transparent)', text: 'var(--gold)' },
  'S-1': { bg: 'color-mix(in srgb, var(--violet) 20%, transparent)', text: 'var(--violet)' },
  'S-3': { bg: 'color-mix(in srgb, var(--mint) 20%, transparent)', text: '#4ade80' },
  'S-8': { bg: 'color-mix(in srgb, var(--mint) 20%, transparent)', text: 'var(--mint)' },
  '424B5': { bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: '#fb923c' },
};
