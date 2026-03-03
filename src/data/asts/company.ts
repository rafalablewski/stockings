/**
 * ASTS SPACEMOBILE - COMPANY DATA & DEFAULTS
 * ================================================
 *
 * Basic company information and model default values.
 *
 * DATA SOURCES:
 * - Stock price: Market data (update daily/weekly)
 * - Share count: Latest 10-Q balance sheet
 * - Cash/Debt: Latest 10-Q balance sheet
 * - Operational metrics: Press releases, earnings calls
 *
 * LAST UPDATED: 2026-02-23
 * NEXT UPDATE: After Q4 2025 business update (March 2, 2026)
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Update DEFAULTS with new share counts, cash, debt
 * 2. Update MODEL_METADATA timestamps
 * 3. Update OPERATIONAL_METRICS with satellite counts, etc.
 * 4. Verify priceAsOf matches currentStockPrice date
 */

import type { DataMetadata, StockDefaults } from '../shared/types';

// ============================================================================
// METADATA - Update when refreshing any data in this file
// ============================================================================

export const ASTS_METADATA: DataMetadata = {
  lastUpdated: '2026-03-03',
  source: 'FY2025 10-K (filed Mar 2, 2026), Q4 2025 Business Update (Mar 2), MWC 2026 (Mar 2), sell-side reports (Mar 3)',
  nextExpectedUpdate: 'Q1 2026 10-Q (~May 2026)',
  notes: 'FY2025 10-K audited: Rev $70.9M, Cash $2,780M, Debt $2,264M, Net Loss -$461M. RPO $1.2B. Fully funded ~90 sats. NCI 23.9%. Class A 285.4M (Dec 31) / 292.6M (Feb 26). Price $86.92.',
};

// ============================================================================
// COMPANY INFO - Static, rarely changes
// ============================================================================

export const COMPANY_INFO = {
  name: 'AST SpaceMobile',
  ticker: 'ASTS',
  exchange: 'NASDAQ',
  sector: 'Direct-to-Device Cellular',
  cik: '0001780312',
  founded: 2017,
  headquarters: 'Midland, TX',
  website: 'https://ast-science.com',
  description: 'First space-based cellular broadband for standard smartphones.',
};

// ============================================================================
// MODEL DEFAULTS - Update from latest 10-Q/10-K
// ============================================================================

/**
 * Default values for the ASTS model
 *
 * AI AGENT INSTRUCTIONS:
 * - currentStockPrice: Update from market data
 * - priceAsOf: MUST match the date of currentStockPrice
 * - currentShares: From 10-Q - sum of Class A + Class B + Class C
 * - cashOnHand: From 10-Q balance sheet "Cash and cash equivalents"
 * - quarterlyBurn: From 10-Q guidance or calculate from cash flow statement
 * - totalDebt: From 10-Q balance sheet "Long-term debt, net"
 * - debtRate: Weighted average rate of convertible notes
 */
export const DEFAULTS: StockDefaults = {
  // === MARKET DATA ===
  currentStockPrice: 86.92,   // UPDATE REGULARLY - Last: Mar 2, 2026
  priceAsOf: '2026-03-02',    // Date of stock price above

  // === SHARE COUNT (per 10-K: Dec 31 285.4M Class A; Feb 26 292.6M) ===
  // Class A: ~292.6M + Class B: 11.2M + Class C: 78.2M = ~382.0M
  currentShares: 382,         // Total implied shares outstanding (M) per 10-K cover page (Feb 26, 2026)

  // === BALANCE SHEET (10-K audited as of Dec 31, 2025) ===
  cashOnHand: 2780,           // $2,779.960M total cash + restricted per 10-K. Pro forma post-Feb offerings: ~$3,834M
  quarterlyBurn: 300,         // Q3 guidance: CapEx + OpEx ~$300M/quarter
  totalDebt: 2264,            // $2,264.435M per 10-K. Pro forma post-Feb converts: ~$3,043M ($1.075B new + $1.15B existing + $325M + $3.5M - repurchased)
  debtRate: 2.15,             // Weighted avg: $3.5M@4.25%, $325M@2.375%, $1.15B@2.00%, $1.075B@2.25%
};

// ============================================================================
// OPERATIONAL METRICS - Update from press releases
// ============================================================================

/**
 * Current operational state
 *
 * AI AGENT INSTRUCTIONS:
 * - Update satellite counts after each launch
 * - Update targetSats2026 if company changes guidance
 * - Update partner metrics from quarterly earnings
 */
export const OPERATIONAL_METRICS = {
  // === CONSTELLATION ===
  block1Sats: 6,              // BW3 + BB1-5 (operational)
  block2Sats: 1,              // BB6 launched Dec 23, 2025. Unfolded Feb 10, 2026 (~2,400 sq ft array)
  targetSats2026: 60,         // Per PRs: 45-60 range, using upper end
  launchFailureRate: 7,       // Historical SpaceX failure rate ~7%

  // === PARTNERS & REACH ===
  partnerReach: 3000,         // ~3B subs across 50+ MNOs per Q3 PR
  definitiveAgreements: 6,    // AT&T, Vodafone, Verizon, stc, Rakuten, Bell
  mouCount: 57,               // "over 50 MNOs" per earnings + MWC 2026: Orange, Taiwan Mobile, VodafoneThree, Sunrise, Vodafone Ireland, Vodafone Ukraine, CK Hutchison (Telefónica was already counted)

  // === REVENUE ===
  contractedRevenue: 1200,    // $1.2B contracted commercial revenue (per Q4 2025 earnings call)

  // === SPECTRUM ===
  spectrumOwned: 105,         // 45 L-band + 60 S-band (MHz)
};

// ============================================================================
// DEFAULT MODEL ASSUMPTIONS - For projection tabs
// ============================================================================

/**
 * Default assumptions for projection models
 * Users can override these in the UI
 */
export const MODEL_ASSUMPTIONS = {
  // Subscriber model
  penetrationRate: 3,         // % of partner subs who adopt D2D
  blendedARPU: 18,            // $/month blended across regions
  revenueShare: 50,           // ASTS share of MNO revenue
  govRevenue: 100,            // Government contract revenue ($M/year)

  // Risk factors for DCF
  regulatoryRisk: 5,          // % discount for regulatory uncertainty
  techRisk: 8,                // % discount for technology risk
  competitionRisk: 10,        // % discount for competitive threats
};

// ============================================================================
// DATA FRESHNESS DISPLAY
// ============================================================================

/**
 * For display in the UI data freshness badge
 */
export const DATA_FRESHNESS = {
  dataAsOf: 'Mar 3, 2026',
  lastFiling: 'FY2025 10-K (Mar 2, 2026)',
  nextFiling: 'Q1 2026 10-Q (~May 2026)',
  priceNote: '$86.92 (Mar 2). 10-K audited: Rev $70.9M, Cash $2,780M, RPO $1.2B. Fully funded ~90 sats.',
};
