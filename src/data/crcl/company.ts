/**
 * CRCL (CIRCLE) - COMPANY DATA & DEFAULTS
 * ================================================
 *
 * Basic company information and model default values.
 *
 * DATA SOURCES:
 * - Stock price: NYSE market data (update daily/weekly)
 * - Financials: 10-Q quarterly reports
 * - USDC data: Company transparency reports
 *
 * LAST UPDATED: 2025-12-31
 * NEXT UPDATE: After Q4 2025 10-K (~March 2026)
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Update MARKET with new price and shares
 * 2. Update MODEL_METADATA timestamps
 * 3. Add new quarterly data to financials.ts
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA - Update when refreshing any data in this file
// ============================================================================

export const CRCL_METADATA: DataMetadata = {
  lastUpdated: '2025-12-31',
  source: 'Q3 2025 10-Q (Nov 12, 2025)',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026)',
  notes: 'IPO completed June 2025 at $31/share',
};

// ============================================================================
// COMPANY INFO - Static, rarely changes
// ============================================================================

export const COMPANY_INFO = {
  name: 'Circle Internet Group',
  ticker: 'CRCL',
  exchange: 'NYSE',
  sector: 'Stablecoin Infrastructure',
  cik: '0001876042',
  stateOfIncorporation: 'Delaware',
  fiscalYearEnd: 'December 31',
  ipoDate: '2025-06-06',
  ipoPrice: 31.00,
  website: 'https://circle.com',
  description: 'Leading stablecoin issuer (USDC) and digital dollar infrastructure provider.',
};

// ============================================================================
// MARKET DATA - Update frequently
// ============================================================================

/**
 * Current market data
 *
 * AI AGENT INSTRUCTIONS:
 * - price: Update from NYSE market data
 * - shares: Update from 10-Q (Class A + Class B)
 * - pe: Calculate as price / (TTM EPS)
 * - 52-week range: Update periodically
 */
export const MARKET = {
  price: 80.05,               // UPDATE REGULARLY - Last: Dec 31, 2025
  priceAsOf: '2025-12-31',
  shares: 229.9,              // Millions (Class A + Class B)
  marketCap: 18850,           // $18.85B (price × shares)
  pe: 115.1,                  // P/E ratio
  high52: 298.99,             // 52-week high
  low52: 31.00,               // 52-week low (IPO price)
  ipo: 31.00,                 // IPO price
};

// ============================================================================
// USDC DATA - Update from quarterly reports
// ============================================================================

/**
 * USDC circulation and market share data
 *
 * AI AGENT INSTRUCTIONS:
 * - usdcCirculation: From Circle transparency reports or 10-Q
 * - marketShare: USDC % of total stablecoin market
 */
export const USDC_DATA = {
  usdcCirculation: 62.5,      // $62.5B USDC in circulation (Q3 2025 10-Q)
  marketShare: 29,            // ~29% of stablecoin market
  usdcAsOf: '2025-09-30',     // Date of circulation data
};

// ============================================================================
// MODEL METADATA - For display purposes
// ============================================================================

/**
 * Data freshness display
 */
export const MODEL_METADATA = {
  lastUpdated: '2025-12-31',
  dataSource: 'Q3 2025 10-Q',
  latestFiling: '10-Q (Nov 12, 2025)',
  priceAsOf: 'Dec 31, 2025',
};

// ============================================================================
// DATA FRESHNESS DISPLAY
// ============================================================================

/**
 * For display in the UI data freshness badge
 */
export const DATA_FRESHNESS = {
  dataAsOf: 'Dec 31, 2025',
  lastFiling: '10-Q (Nov 12, 2025)',
  nextFiling: '10-K (~March 2026)',
  priceNote: 'Update prices regularly',
};
