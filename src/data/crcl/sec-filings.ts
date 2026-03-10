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
