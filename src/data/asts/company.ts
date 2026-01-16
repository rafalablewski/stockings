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
 * LAST UPDATED: 2025-12-30
 * NEXT UPDATE: After Q4 2025 10-K (~March 2026)
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
  lastUpdated: '2025-12-30',
  source: 'Q3 2025 10-Q (Nov 10, 2025)',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026)',
  notes: 'BB6 launched Dec 23, 2025 per press release',
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
  currentStockPrice: 71,      // UPDATE REGULARLY - Last: Dec 30, 2025
  priceAsOf: '2025-12-30',    // Date of stock price above

  // === SHARE COUNT (Q3 2025 10-Q) ===
  // Class A: 272M + Class B: 11.2M + Class C: 78.2M = 361.4M
  currentShares: 361,         // Total implied shares outstanding (M)

  // === BALANCE SHEET (Q3 2025 10-Q) ===
  cashOnHand: 1220,           // $1,220,123K per balance sheet
  quarterlyBurn: 300,         // Q3 guidance: CapEx + OpEx ~$300M/quarter
  totalDebt: 698,             // $697.6M net long-term debt (convertibles)
  debtRate: 4.25,             // Convertible notes at ~4.25% weighted avg
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
  block2Sats: 1,              // BB6 launched Dec 23, 2025
  targetSats2026: 60,         // Per PRs: 45-60 range, using upper end
  launchFailureRate: 7,       // Historical SpaceX failure rate ~7%

  // === PARTNERS & REACH ===
  partnerReach: 3000,         // ~3B subs across 50+ MNOs per Q3 PR
  definitiveAgreements: 6,    // AT&T, Vodafone, Verizon, stc, Rakuten, Bell
  mouCount: 50,               // "over 50 MNOs" per earnings

  // === REVENUE ===
  contractedRevenue: 1000,    // $1B+ contracted commercial revenue

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
  dataAsOf: 'Dec 31, 2025',
  lastFiling: '10-Q (Nov 10, 2025)',
  nextFiling: '10-K (~March 2026)',
  priceNote: 'Update prices regularly',
};
