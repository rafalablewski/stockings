/**
 * CRCL (CIRCLE) - SEC FILINGS
 * ================================================
 *
 * SEC filing registry with cross-references.
 *
 * DATA SOURCES:
 * - SEC EDGAR: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=circle
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: After new SEC filings
 *
 * CROSS-REFERENCE SYSTEM:
 * Each filing can be linked to data changes in other files via CRCL_FILING_CROSS_REFS.
 * Key format: 'FORM-TYPE|YYYY-MM-DD' (e.g. '10-Q|2026-02-15')
 *
 * PR CHECKLIST:
 *  1. CRCL_SEC_FILINGS (this file)     — Add new filing entry
 *  2. CRCL_SEC_META (this file)         — Update lastPR, totalFilingsTracked
 *  3. CRCL_FILING_CROSS_REFS (this file) — Add cross-ref entry
 *  4. timeline.ts                        — Add new timeline entry at top
 *  5. catalysts.ts                       — Move completed catalysts, update metadata
 *  6. company.ts / financials.ts         — Update holdings, prices, cash
 *  7. BARREL EXPORT: If you added a NEW exported constant to ANY data file,
 *     add it to src/data/crcl/index.ts. Run: bash scripts/check-barrel-exports.sh
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const SEC_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from SEC EDGAR',
  nextExpectedUpdate: 'After new SEC filings',
};

export const CRCL_SEC_META = {
  cik: '0001876042',
  ticker: 'CRCL',
  exchange: 'NYSE',
  totalFilingsTracked: 0,
  lastPR: '',
  lastPRTitle: '',
};

// ============================================================================
// SEC FILINGS (newest first)
// ============================================================================

export const CRCL_SEC_FILINGS: Array<{
  date: string;
  type: string;
  description: string;
  period: string;
  color: string;
}> = [];

// ============================================================================
// FILING CROSS-REFERENCES
// ============================================================================

export const CRCL_FILING_CROSS_REFS: Record<string, Array<{ source: string; data: string }>> = {};

// ============================================================================
// TYPE COLORS (for EDGAR tab badge styling)
// ============================================================================

const C_BLUE   = { bg: 'rgba(96,165,250,0.2)',  text: 'var(--sky)' };
const C_VIOLET = { bg: 'rgba(168,85,247,0.2)',  text: 'var(--violet)' };
const C_GOLD   = { bg: 'rgba(234,179,8,0.2)',   text: 'var(--gold)' };
const C_GREEN  = { bg: 'rgba(34,197,94,0.2)',   text: '#4ade80' };
const C_ORANGE = { bg: 'rgba(249,115,22,0.2)',  text: '#fb923c' };

export const CRCL_SEC_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': C_BLUE, 'ARS': C_BLUE,
  '10-Q': C_VIOLET, '10-Q/A': C_VIOLET,
  '8-K': C_GOLD,
  'S-1': C_GREEN, 'S-1/A': C_GREEN, 'S-3': C_GREEN, 'S-3ASR': C_GREEN, 'S-8': C_GREEN,
  '424B5': C_ORANGE, '424B7': C_ORANGE, 'FWP': C_ORANGE,
};

export const CRCL_SEC_FILTER_TYPES = Object.keys(CRCL_SEC_TYPE_COLORS);
