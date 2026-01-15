/**
 * BMNR (BITMINE) - COMPANY DATA & DEFAULTS
 * ================================================
 *
 * Basic company information and model default values.
 *
 * DATA SOURCES:
 * - Stock price: Market data (update daily/weekly)
 * - ETH price: Coinbase or CoinGecko (update daily)
 * - ETH holdings: Weekly 8-K filings, press releases
 * - Share count: 10-Q quarterly reports
 *
 * LAST UPDATED: 2026-01-12
 * NEXT UPDATE: After next 8-K or earnings release
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 8-K or press release:
 * 1. Update DEFAULTS with new ETH holdings, shares, prices
 * 2. Update ETH_HOLDINGS with latest staking data
 * 3. Update MODEL_METADATA timestamps
 * 4. Keep priceAsOf and ethPriceAsOf aligned with actual dates
 */

import type { DataMetadata, StockDefaults } from '../shared/types';

// ============================================================================
// METADATA - Update when refreshing any data in this file
// ============================================================================

export const BMNR_METADATA: DataMetadata = {
  lastUpdated: '2026-01-12',
  source: 'Jan 12, 2026 PR and 8-K',
  nextExpectedUpdate: 'Next weekly holdings update (8-K)',
  notes: 'ETH holdings updated weekly via 8-K filings',
};

// ============================================================================
// COMPANY INFO - Static, rarely changes
// ============================================================================

export const COMPANY_INFO = {
  name: 'Bitmine (BMNR)',
  ticker: 'BMNR',
  exchange: 'NYSE American',
  sector: 'ETH Treasury',
  cik: '0001829311',
  ein: '84-3986354',
  sic: '6199',
  stateOfIncorporation: 'Delaware',
  stateOfLocation: 'Nevada',
  fiscalYearEnd: 'August 31',
  website: 'https://bitmine.com',
  description: 'Institutional-grade ETH exposure through a publicly traded vehicle.',
};

// ============================================================================
// MODEL DEFAULTS - Update from latest 8-K/PR
// ============================================================================

/**
 * Default values for the BMNR model
 *
 * AI AGENT INSTRUCTIONS:
 * - currentETH: From latest 8-K or PR (ETH holdings count)
 * - ethPrice: From Coinbase (update frequently)
 * - currentStockPrice: From market data
 * - currentShares: From 10-Q or calculate from PR
 */
export const DEFAULTS: StockDefaults & {
  currentETH: number;
  ethPrice: number;
  ethPriceAsOf: string;
} = {
  // === ETH HOLDINGS (Jan 12, 2026 PR) ===
  currentETH: 4167768,        // 4.17M ETH (3.45% of supply)
  ethPrice: 3119,             // UPDATE REGULARLY - Last: Jan 11, 2026 (Coinbase)
  ethPriceAsOf: '2026-01-11', // Date of ETH price above

  // === MARKET DATA ===
  currentStockPrice: 27.15,   // UPDATE REGULARLY - Last: Jan 12, 2026
  priceAsOf: '2026-01-12',    // Date of stock price above

  // === SHARE COUNT ===
  currentShares: 434,         // Shares outstanding (M)

  // === BALANCE SHEET ===
  cashOnHand: 988,            // $988M cash (Jan 12, 2026 PR)
  totalDebt: 0,               // No debt

  // Not used for BMNR but required by interface
  quarterlyBurn: undefined,
  debtRate: undefined,
};

// ============================================================================
// ETH HOLDINGS DATA - Update from weekly 8-K filings
// ============================================================================

/**
 * Current ETH holdings breakdown
 *
 * AI AGENT INSTRUCTIONS:
 * - Update stakedETH from weekly PR
 * - Calculate stakingRatio as stakedETH / totalETH
 * - Update ethSupplyPercent from PR (or calculate from 120.7M supply)
 */
export const ETH_HOLDINGS = {
  totalETH: 4167768,          // Total ETH holdings
  stakedETH: 1256083,         // ETH staked with validators
  stakingRatio: 30.14,        // % of holdings staked (1,256,083 / 4,167,768)
  ethSupplyPercent: 3.45,     // % of total ETH supply (~120.7M)
  targetSupplyPercent: 5.0,   // "Alchemy of 5%" target
  progressToTarget: 69,       // % progress to 5% (3.45/5.0)
};

// ============================================================================
// STAKING PARAMETERS
// ============================================================================

/**
 * Staking yield assumptions
 *
 * AI AGENT INSTRUCTIONS:
 * - baseStakingAPY: Use CESR rate from PR or ultrasound.money
 * - Update restakingBonus if company announces EigenLayer use
 */
export const STAKING_PARAMS = {
  baseStakingAPY: 2.81,       // CESR rate (Quatrefoil)
  restakingBonus: 2.0,        // Additional yield from restaking (EigenLayer)
  slashingRisk: 0.5,          // Annual slashing risk %
  liquidityDiscount: 2,       // Discount for LST liquidity
  operatingCosts: 0.5,        // Annual operating cost %
  regulatoryRisk: 3,          // Regulatory uncertainty discount %
};

// ============================================================================
// DIVIDEND DATA - First dividend Nov 24, 2025
// ============================================================================

/**
 * Dividend parameters
 *
 * AI AGENT INSTRUCTIONS:
 * - Update quarterlyDividend after each dividend announcement
 * - Track dividend history for yield calculations
 */
export const DIVIDEND_DATA = {
  quarterlyDividend: 0.01,    // $/share per quarter (announced Nov 24, 2025)
  dividendGrowthRate: 10,     // Expected annual growth %
  firstDividendDate: '2025-11-24',
  exDividendDate: null,       // Update when announced
  paymentDate: null,          // Update when announced
};

// ============================================================================
// DATA FRESHNESS DISPLAY
// ============================================================================

/**
 * For display in the UI data freshness badge
 */
export const DATA_FRESHNESS = {
  dataAsOf: 'Jan 12, 2026',
  lastFiling: '8-K (Jan 12, 2026)',
  nextFiling: 'Weekly 8-K',
  priceNote: 'Update prices regularly',
};
