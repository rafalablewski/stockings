/**
 * BMNR (BITMINE) - HISTORICAL ETH PRICE DATA
 * ================================================
 *
 * Historical ETH prices for backtesting and analysis.
 *
 * DATA SOURCES:
 * - CoinGecko monthly closing prices
 * - Coinbase historical data
 *
 * LAST UPDATED: 2025-12-31
 * NEXT UPDATE: Monthly (add new month's data)
 *
 * AI AGENT INSTRUCTIONS:
 * When adding new month's data:
 * 1. Get closing price from CoinGecko or Coinbase
 * 2. Add to the appropriate year array
 * 3. Create new year array when calendar year changes
 */

import type { HistoricalPrices, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const HISTORICAL_METADATA: DataMetadata = {
  lastUpdated: '2025-12-31',
  source: 'CoinGecko, Coinbase',
  nextExpectedUpdate: 'Monthly (add new closing price)',
  notes: 'Monthly closing prices (Jan opening, then Feb-Dec closes)',
};

// ============================================================================
// HISTORICAL ETH PRICES BY YEAR
// ============================================================================

/**
 * Monthly ETH prices by year
 * Format: [Jan open, Feb close, Mar close, ..., Dec close]
 *
 * AI AGENT INSTRUCTIONS:
 * - Each array has 13 elements: Jan opening + 12 month-end closes
 * - Add new year when calendar year changes
 * - Verify against CoinGecko monthly data
 */
export const HISTORICAL_ETH: HistoricalPrices = {
  2020: [134, 230, 288, 171, 207, 228, 244, 391, 367, 396, 387, 478, 586],
  2021: [738, 1316, 1393, 1789, 1938, 2814, 2707, 2280, 3198, 3920, 4636, 4644, 3682],
  2022: [3682, 3117, 2619, 2994, 3049, 1784, 1962, 1073, 1251, 1595, 1316, 1273, 1194],
  2023: [1194, 1561, 1657, 1545, 1817, 1899, 1844, 1917, 1852, 1627, 1597, 2050, 2268],
  2024: [2268, 2305, 2408, 3084, 3516, 3095, 3704, 3499, 3329, 2582, 2606, 3289, 3430],
};

// ============================================================================
// COMPARABLE COMPANIES
// ============================================================================

/**
 * Peer comparison data for crypto treasury companies
 *
 * AI AGENT INSTRUCTIONS:
 * - Update holdings from quarterly earnings
 * - Update prices periodically
 * - MSTR holdings from their 8-K filings
 * - COIN holdings from 10-Q
 */
export const COMPARABLES = [
  {
    name: 'BMNR',
    fullName: 'Bitmine Immersion',
    crypto: 'ETH',
    category: 'ETH',
    holdings: 4168000,        // Current ETH holdings (Jan MTD)
    shares: 434e6,            // Shares outstanding
    price: 27.15,             // Stock price
    yield: 2.81,              // Staking yield
  },
  {
    name: 'MSTR',
    fullName: 'MicroStrategy',
    crypto: 'BTC',
    category: 'BTC',
    holdings: 671268,         // BTC holdings
    shares: 226e6,            // Shares outstanding
    price: 390,               // Stock price
    yield: 0,                 // No yield (BTC)
  },
  {
    name: 'MARA',
    fullName: 'Marathon Digital',
    crypto: 'BTC',
    category: 'BTC',
    holdings: 44893,          // BTC holdings
    shares: 350e6,            // Shares outstanding
    price: 17.50,             // Stock price
    yield: 0,                 // No yield (BTC)
  },
  {
    name: 'RIOT',
    fullName: 'Riot Platforms',
    crypto: 'BTC',
    category: 'BTC',
    holdings: 18221,          // BTC holdings
    shares: 413e6,            // Shares outstanding
    price: 11.20,             // Stock price
    yield: 0,                 // No yield (BTC)
  },
  {
    name: 'CLSK',
    fullName: 'CleanSpark',
    crypto: 'BTC',
    category: 'BTC',
    holdings: 10000,          // BTC holdings (estimate)
    shares: 280e6,            // Shares outstanding
    price: 10.50,             // Stock price
    yield: 0,                 // No yield (BTC)
  },
  {
    name: 'SMLR',
    fullName: 'Semler Scientific',
    crypto: 'BTC',
    category: 'BTC',
    holdings: 3192,           // BTC holdings
    shares: 8e6,              // Shares outstanding
    price: 52,                // Stock price
    yield: 0,                 // No yield (BTC)
  },
  {
    name: 'COIN',
    fullName: 'Coinbase',
    crypto: 'BTC+ETH',
    category: 'Exchange',
    holdings: '14,548 BTC / 148,715 ETH',
    shares: 196e6,            // Shares outstanding
    price: 265,               // Stock price
    yield: 0,                 // Exchange, not treasury
  },
];

// ============================================================================
// DILUTION TRANCHES - For scenario modeling
// ============================================================================

/**
 * Default dilution tranches for projection tabs
 *
 * AI AGENT INSTRUCTIONS:
 * - These are MODEL INPUTS, not actual data
 * - Users can modify in the UI
 * - Update defaults if company provides guidance
 */
export const DEFAULT_TRANCHES = [
  { id: 1, year: 0.5, sharesM: 500, ethPrice: 3500, enabled: true },
  { id: 2, year: 1.0, sharesM: 750, ethPrice: 4000, enabled: true },
  { id: 3, year: 1.5, sharesM: 1000, ethPrice: 5000, enabled: false },
  { id: 4, year: 2.0, sharesM: 1500, ethPrice: 6000, enabled: false },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get ETH price at specific date (approximate)
 */
export const getHistoricalETHPrice = (year: number, month: number): number | null => {
  const yearData = HISTORICAL_ETH[year];
  if (!yearData || month < 1 || month > 12) return null;
  return yearData[month]; // month 1-12 maps to index 1-12
};

/**
 * Calculate annual returns for a given year
 */
export const getAnnualReturn = (year: number): number | null => {
  const yearData = HISTORICAL_ETH[year];
  if (!yearData) return null;
  const startPrice = yearData[0];
  const endPrice = yearData[12];
  return ((endPrice - startPrice) / startPrice) * 100;
};

/**
 * Get all years with data
 */
export const getAvailableYears = (): number[] => {
  return Object.keys(HISTORICAL_ETH).map(Number).sort();
};
