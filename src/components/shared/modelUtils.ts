/**
 * Shared Model Utilities
 *
 * Common constants and utility functions used across ASTS, BMNR, CRCL models.
 *
 * Types are defined in stockModelTypes.ts.
 * Legal disclaimers are in DisclaimerBanner.tsx.
 * Update indicator config is in UpdateIndicators.tsx.
 */

// ============================================================================
// RATING NORMALIZATION
// ============================================================================

/** Normalizes analyst rating strings to bullish/neutral/bearish categories */
export const RATING_NORMALIZATION: Record<string, 'bullish' | 'neutral' | 'bearish'> = {
  // Bullish ratings
  'Strong Buy': 'bullish',
  'Buy': 'bullish',
  'Overweight': 'bullish',
  // Neutral ratings
  'Neutral': 'neutral',
  'Hold': 'neutral',
  'Market Perform': 'neutral',
  'Sector Perform': 'neutral',
  'Perform': 'neutral',
  // Bearish ratings
  'Underweight': 'bearish',
  'Sector Underperform': 'bearish',
  'Underperform': 'bearish',
  'Sell': 'bearish',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Safely clamp a value between min and max bounds */
export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

/** Safe division that returns fallback instead of Infinity/NaN */
export const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number =>
  denominator !== 0 && isFinite(numerator / denominator) ? numerator / denominator : fallback;

/** Ensure a value is a finite number, otherwise return fallback */
export const safeNumber = (value: number, fallback: number = 0): number =>
  isFinite(value) ? value : fallback;
