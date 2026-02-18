/**
 * CRCL (CIRCLE) - QUARTERLY FINANCIAL DATA
 * ================================================
 *
 * Historical quarterly data from SEC filings.
 *
 * DATA SOURCES:
 * - 10-Q and 10-K filings (SEC EDGAR)
 * - Earnings releases (8-K)
 * - Company presentations
 *
 * LAST UPDATED: 2025-12-31
 * NEXT UPDATE: After Q4 2025 10-K (~March 2026)
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Add new quarter at the BEGINNING of the array
 * 2. All revenue figures in millions USD
 * 3. USDC circulation in billions USD
 * 4. Include notes for any unusual items
 *
 * FIELD DEFINITIONS:
 * - totalRevenue: Total revenue from income statement
 * - reserveIncome: Interest income from USDC reserves
 * - otherRevenue: Transaction fees and other revenue
 * - distributionCosts: Payments to Coinbase for USDC distribution
 * - rldc: Revenue Less Distribution Costs (key metric)
 * - rldcMargin: RLDC as % of total revenue
 * - adjustedEbitda: Non-GAAP adjusted EBITDA
 * - netIncome: GAAP net income/loss
 * - usdcCirculation: Average USDC in circulation (billions)
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const FINANCIALS_METADATA: DataMetadata = {
  lastUpdated: '2025-12-31',
  source: 'Q3 2025 10-Q (Nov 12, 2025)',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026)',
  notes: 'Q2 2025 net loss includes $591M IPO-related non-cash charges',
};

// ============================================================================
// QUARTERLY DATA
// ============================================================================

/**
 * Quarterly financial data
 * Most recent first
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new quarters at index 0
 * - Keep at least 6 quarters of history
 * - All figures in millions unless noted
 */
export interface CRCLQuarterlyData {
  quarter: string;
  totalRevenue: number;
  reserveIncome: number;
  otherRevenue: number;
  distributionCosts: number;
  rldc: number;
  rldcMargin: number;
  adjustedEbitda: number;
  netIncome: number;
  usdcCirculation: number;
  reserveReturnRate: number;
  usdcOnPlatform: number;
  platformPct: number;
  marketShare: number;
  meaningfulWallets: number;
  usdcMinted: number;
  usdcRedeemed: number;
  opex: number;
  cashPosition: number;
  sbc: number;
}

export const QUARTERLY_DATA: CRCLQuarterlyData[] = [
  {
    quarter: "Q3 2025",
    totalRevenue: 740,
    reserveIncome: 711,
    otherRevenue: 29,
    distributionCosts: 447,
    rldc: 292,
    rldcMargin: 39,
    adjustedEbitda: 166,
    netIncome: 214,
    usdcCirculation: 73.7,
    reserveReturnRate: 4.15,
    usdcOnPlatform: 10.2,
    platformPct: 13.5,
    marketShare: 29,
    meaningfulWallets: 6.34,
    usdcMinted: 79.7,
    usdcRedeemed: 67.3,
    opex: 126,
    cashPosition: 1150,
    sbc: 55,
  },
  {
    quarter: "Q2 2025",
    totalRevenue: 658,
    reserveIncome: 634,
    otherRevenue: 24,
    distributionCosts: 406,
    rldc: 251,
    rldcMargin: 38,
    adjustedEbitda: 126,
    netIncome: -482,
    usdcCirculation: 61.3,
    reserveReturnRate: 4.14,
    usdcOnPlatform: 6.0,
    platformPct: 7.4,
    marketShare: 28,
    meaningfulWallets: 5.7,
    usdcMinted: 42.2,
    usdcRedeemed: 40.8,
    opex: 125,
    cashPosition: 1108,
    sbc: 660,   // IPO-related SBC vesting
  },
  {
    quarter: "Q1 2025",
    totalRevenue: 579,
    reserveIncome: 558,
    otherRevenue: 21,
    distributionCosts: 347,
    rldc: 231,
    rldcMargin: 40,
    adjustedEbitda: 122,
    netIncome: 65,
    usdcCirculation: 52.0,
    reserveReturnRate: 4.16,
    usdcOnPlatform: 3.8,
    platformPct: 6.2,
    marketShare: 26,
    meaningfulWallets: 4.9,
    usdcMinted: 52.3,
    usdcRedeemed: 44.1,
    opex: 109,
    cashPosition: 890,
    sbc: 92,
  },
  {
    quarter: "Q4 2024",
    totalRevenue: 435,
    reserveIncome: 433,
    otherRevenue: 2,
    distributionCosts: 304,
    rldc: 131,
    rldcMargin: 30,
    adjustedEbitda: 33,
    netIncome: 4,
    usdcCirculation: 44.0,
    reserveReturnRate: 4.49,
    usdcOnPlatform: 1.2,
    platformPct: 2.7,
    marketShare: 24,
    meaningfulWallets: 4.1,
    usdcMinted: 48.2,
    usdcRedeemed: 40.1,
    opex: 98,
    cashPosition: 780,
    sbc: 85,
  },
  {
    quarter: "Q3 2024",
    totalRevenue: 446,
    reserveIncome: 445,
    otherRevenue: 1,
    distributionCosts: 257,
    rldc: 188,
    rldcMargin: 42,
    adjustedEbitda: 93,
    netIncome: 71,
    usdcCirculation: 35.5,
    reserveReturnRate: 5.11,
    usdcOnPlatform: 0.7,
    platformPct: 2.0,
    marketShare: 23,
    meaningfulWallets: 3.6,
    usdcMinted: 36.2,
    usdcRedeemed: 33.5,
    opex: 95,
    cashPosition: 680,
    sbc: 72,
  },
  {
    quarter: "Q2 2024",
    totalRevenue: 430,
    reserveIncome: 423,
    otherRevenue: 7,
    distributionCosts: 247,
    rldc: 182,
    rldcMargin: 42,
    adjustedEbitda: 83,
    netIncome: 33,
    usdcCirculation: 32.3,
    reserveReturnRate: 5.17,
    usdcOnPlatform: 0.6,
    platformPct: 1.9,
    marketShare: 22,
    meaningfulWallets: 3.4,
    usdcMinted: 34.8,
    usdcRedeemed: 35.0,
    opex: 99,
    cashPosition: 620,
    sbc: 70,
  },
];

// ============================================================================
// SEC FILINGS
// ============================================================================

/**
 * Recent SEC filings
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new filings at the beginning
 * - Include filing date, type, and description
 */
export const SEC_FILINGS = [
  { date: 'Dec 12, 2025', type: '8-K', description: 'OCC National Bank Charter (Preliminary Approval)', period: '—', color: 'yellow' },
  { date: 'Nov 12, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2025', color: 'purple' },
  { date: 'Nov 12, 2025', type: '8-K', description: 'Q3 2025 Earnings Release', period: '—', color: 'yellow' },
  { date: 'Aug 12, 2025', type: 'S-1', description: 'Follow-on Offering Registration (10M shares)', period: '—', color: 'violet' },
  { date: 'Aug 8, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q2 2025', color: 'purple' },
  { date: 'Jun 4, 2025', type: 'S-1', description: 'IPO Registration Statement (effective)', period: '—', color: 'violet' },
  { date: 'Apr 1, 2025', type: 'S-1', description: 'Initial S-1 Filing (confidential Jan 11, 2024)', period: 'FY 2024', color: 'violet' },
];

// ============================================================================
// SEC METADATA
// ============================================================================

// [PR_CHECKLIST_SECMETA] - MANDATORY: Update lastPR with every PR!
// See shared/types.ts for full PR ingestion checklist (applies to ALL stocks).
// When processing a CRCL press release, also update:
//  - CRCL.tsx: filingData (lastPressRelease, lastPressReleaseTitle, latestEvent, latestEventDate)
//  - CRCL.tsx: pressReleases[] array — Add new entry at TOP
//  - SEC_FILINGS[] above — Add new filing entry at top
//  - Timeline / catalysts files as applicable
export const SEC_META = {
  cik: '0001876042',
  ticker: 'CRCL',
  exchange: 'NYSE',
  lastPR: { date: 'December 12, 2025', title: 'OCC National Bank Charter Approval' },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the most recent quarter
 */
export const getLatestQuarter = (): CRCLQuarterlyData => {
  return QUARTERLY_DATA[0];
};

/**
 * Calculate YoY growth for a metric
 */
export const getYoYGrowth = (metric: keyof CRCLQuarterlyData): number | null => {
  if (QUARTERLY_DATA.length < 5) return null;
  const current = QUARTERLY_DATA[0][metric];
  const yearAgo = QUARTERLY_DATA[4][metric];
  if (typeof current !== 'number' || typeof yearAgo !== 'number' || yearAgo === 0) {
    return null;
  }
  return ((current - yearAgo) / Math.abs(yearAgo)) * 100;
};

/**
 * Get TTM (trailing twelve months) total
 */
export const getTTMTotal = (metric: keyof CRCLQuarterlyData): number | null => {
  if (QUARTERLY_DATA.length < 4) return null;
  let total = 0;
  for (let i = 0; i < 4; i++) {
    const value = QUARTERLY_DATA[i][metric];
    if (typeof value !== 'number') return null;
    total += value;
  }
  return total;
};
