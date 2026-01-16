/**
 * BMNR (BITMINE) - CAPITAL STRUCTURE DATA
 * ================================================
 *
 * Share classes, shareholders, and equity offerings.
 *
 * DATA SOURCES:
 * - Share classes: 10-Q/10-K quarterly reports
 * - Shareholders: 13F, DEF 14A proxy filings
 * - Equity offerings: 424B5 prospectus supplements, 8-K filings
 *
 * LAST UPDATED: 2026-01-12
 * NEXT UPDATE: After next quarterly 10-Q or proxy filing
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new filings:
 * 1. Update SHARE_CLASSES from 10-Q balance sheet
 * 2. Add new EQUITY_OFFERINGS entries for ATM usage
 * 3. Update MAJOR_SHAREHOLDERS when 13F/DEF 14A filed
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CAPITAL_METADATA: DataMetadata = {
  lastUpdated: '2026-01-12',
  source: 'Q1 FY26 10-Q (Jan 13, 2026)',
  nextExpectedUpdate: 'Q2 FY26 10-Q or DEF 14A proxy',
  notes: 'Simple single-class structure supports rapid ATM execution',
};

// ============================================================================
// SHARE CLASSES
// ============================================================================

/**
 * Share class structure
 *
 * AI AGENT INSTRUCTIONS:
 * - Update outstanding from 10-Q balance sheet
 * - Series A and B Preferred are fully converted
 */
export const SHARE_CLASSES = [
  {
    class: 'Common Stock',
    authorized: 500000000,    // 500M authorized (vote pending for 50B)
    outstanding: 434000000,   // 434M as of Jan 12, 2026
    parValue: 0.0001,
    voting: '1 vote/share',
    status: 'active',
  },
  {
    class: 'Series A Preferred',
    authorized: 10000000,
    outstanding: 0,
    parValue: 0.0001,
    voting: 'As-converted',
    status: 'converted',
  },
  {
    class: 'Series B Preferred',
    authorized: 10000000,
    outstanding: 0,
    parValue: 0.0001,
    voting: 'As-converted',
    status: 'converted',
  },
];

// ============================================================================
// WARRANTS
// ============================================================================

/**
 * Outstanding warrants
 *
 * AI AGENT INSTRUCTIONS:
 * - Update if new warrants issued or exercised
 */
export const WARRANTS = [
  {
    type: 'Pre-Funded',
    shares: 11000000,
    strike: 0.0001,
    source: 'Jul 2025 PIPE',
  },
  {
    type: 'Advisor',
    shares: 3190000,
    strike: 5.40,
    source: 'Jul 2025 S-3',
  },
];

// ============================================================================
// EQUITY OFFERINGS
// ============================================================================

/**
 * ATM and equity offering history
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries when ATM tranches are filed (424B5)
 * - Update status when tranches exhaust
 */
export const EQUITY_OFFERINGS = [
  {
    date: 'Jul 2025',
    type: 'ATM',
    amount: 2.0,
    status: 'exhausted',
    notes: 'Initial ATM program',
  },
  {
    date: 'Jul 28, 2025',
    type: 'ATM+',
    amount: 4.5,
    status: 'exhausted',
    notes: 'Exhausted in 5 weeks',
  },
  {
    date: 'Aug 12, 2025',
    type: 'ATM+',
    amount: 24.5,
    status: 'active',
    notes: '$24.5B shelf active - massive firepower',
  },
  {
    date: 'Sep 22, 2025',
    type: '424B5',
    amount: 0.365,
    status: 'completed',
    notes: 'Prospectus supplement',
  },
];

// ============================================================================
// MAJOR SHAREHOLDERS
// ============================================================================

/**
 * Known major shareholders
 *
 * AI AGENT INSTRUCTIONS:
 * - Update from 13F filings (institutional)
 * - Update from DEF 14A proxy (insiders)
 * - Many positions TBD until filings available
 */
export const MAJOR_SHAREHOLDERS = [
  {
    name: 'Bill Miller III',
    shares: null,
    percent: null,
    type: 'Individual',
    source: 'Jul 2025 PR',
    notes: 'High-profile value investor',
  },
  {
    name: 'ARK Invest (Cathie Wood)',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'PR mentions',
    notes: 'Reaffirmed institutional backing',
  },
  {
    name: 'Founders Fund',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'PR mentions',
    notes: 'Peter Thiel\'s fund',
  },
  {
    name: 'Pantera Capital',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'PR mentions',
    notes: 'Crypto-focused fund',
  },
  {
    name: 'Galaxy Digital',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'PR mentions',
    notes: 'Mike Novogratz',
  },
];

// ============================================================================
// FULLY DILUTED CALCULATION
// ============================================================================

/**
 * Fully diluted share components
 */
export const getFDShares = (currentShares: number) => ({
  common: currentShares * 1e6,
  prefunded: WARRANTS[0].shares,
  advisor: WARRANTS[1].shares,
  options: 0,
  rsus: 0,
});

/**
 * Calculate total fully diluted shares
 */
export const getTotalFD = (currentShares: number): number => {
  const fd = getFDShares(currentShares);
  return Object.values(fd).reduce((a, b) => a + b, 0);
};

/**
 * Calculate dilution percentage
 */
export const getDilutionPercent = (currentShares: number): number => {
  const fd = getFDShares(currentShares);
  return ((getTotalFD(currentShares) / fd.common) - 1) * 100;
};
