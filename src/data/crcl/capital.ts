/**
 * CRCL (CIRCLE) - CAPITAL STRUCTURE DATA
 * ================================================
 *
 * Share classes, shareholders, and equity offerings.
 *
 * DATA SOURCES:
 * - Share classes: 10-Q/10-K quarterly reports, S-1 filing
 * - Shareholders: 13F, DEF 14A proxy filings
 * - Equity offerings: IPO prospectus, 424B5 supplements
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: After next quarterly 10-Q or proxy filing
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new filings:
 * 1. Update SHARE_CLASSES from 10-Q balance sheet
 * 2. Add new EQUITY_OFFERINGS entries for any secondary offerings
 * 3. Update MAJOR_SHAREHOLDERS when 13F/DEF 14A filed
 */

import type { ShareClass, MajorShareholder, EquityOffering, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CAPITAL_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from S-1/10-Q',
  nextExpectedUpdate: 'After next quarterly filing',
  notes: 'Post-IPO capital structure',
};

// ============================================================================
// SHARE CLASSES
// ============================================================================

export const SHARE_CLASSES: ShareClass[] = [];

// ============================================================================
// MAJOR SHAREHOLDERS
// ============================================================================

export const MAJOR_SHAREHOLDERS: MajorShareholder[] = [];

// ============================================================================
// EQUITY OFFERINGS
// ============================================================================

export const EQUITY_OFFERINGS: EquityOffering[] = [];
