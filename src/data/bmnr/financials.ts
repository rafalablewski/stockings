/**
 * BMNR (BITMINE) - QUARTERLY FINANCIAL DATA
 * ================================================
 *
 * Historical quarterly data from SEC filings.
 *
 * DATA SOURCES:
 * - Primary: 10-Q and 10-K filings (SEC EDGAR)
 * - Secondary: Quarterly business updates, press releases
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: After next quarterly filing
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Add new quarter entry with all available fields
 * 2. Mark pending fields as null until filing available
 * 3. Include filing source in 'filing' field
 * 4. Add note explaining any unusual items
 */

import type { QuarterlyFinancials, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const FINANCIALS_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from 10-Q/10-K',
  nextExpectedUpdate: 'After next quarterly filing',
  notes: 'Quarterly balance sheet, income statement, and cash flow data',
};

// ============================================================================
// QUARTERLY DATA
// ============================================================================

/**
 * Quarterly financial data keyed by "Qn YYYY" (e.g. "Q4 2025")
 * Newest first.
 */
export const QUARTERLY_DATA: Record<string, QuarterlyFinancials> = {};

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getQuartersChronological() {
  return Object.entries(QUARTERLY_DATA).reverse();
}

export function getLatestCompleteQuarter() {
  const entries = Object.entries(QUARTERLY_DATA);
  return entries.length > 0 ? entries[0] : null;
}
