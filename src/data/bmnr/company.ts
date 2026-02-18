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
 * LAST UPDATED: 2026-02-17
 * NEXT UPDATE: After next 8-K or earnings release
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 8-K or press release:
 * 1. Update DEFAULTS with new ETH holdings, shares, prices
 * 2. Update ETH_HOLDINGS with latest staking data
 * 3. Update MODEL_METADATA timestamps
 * 4. Keep priceAsOf and ethPriceAsOf aligned with actual dates
 *
 * ═══════════════════════════════════════════════════════════════════
 * MANDATORY — ALSO UPDATE THESE (DO NOT SKIP):
 * See src/data/shared/types.ts for the FULL universal checklist
 * that applies to ALL stocks (BMNR, ASTS, CRCL).
 * ═══════════════════════════════════════════════════════════════════
 * 5. sec-filings.ts: SEC_FILINGS[] — Add new filing entry
 * 6. sec-filings.ts: SEC_META.lastPR — Update date + title
 * 7. sec-filings.ts: SEC_META.totalFilingsTracked — Increment
 * 8. sec-filings.ts: FILING_CROSS_REFS — Add cross-ref entry
 * 9. <TICKER>.tsx: filingData (lastPressRelease, lastPressReleaseTitle,
 *    latestEvent, latestEventDate, filings['8-K'])
 * 10. <TICKER>.tsx: pressReleases[] array — Add new entry at TOP
 * 11. timeline-events.ts — Add new timeline entry at top
 * 12. catalysts.ts — Move completed catalysts, update metadata
 * ═══════════════════════════════════════════════════════════════════
 */

import type { DataMetadata, StockDefaults } from '../shared/types';

// ============================================================================
// METADATA - Update when refreshing any data in this file
// ============================================================================

export const BMNR_METADATA: DataMetadata = {
  lastUpdated: '2026-02-17',
  source: 'Feb 17, 2026 Weekly Holdings PR (4.371M ETH)',
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
  // === ETH HOLDINGS (Feb 17, 2026 PR) ===
  currentETH: 4371497,        // 4.371M ETH (3.62% of supply)
  ethPrice: 1998,             // UPDATE REGULARLY - Last: Feb 16, 2026 (Coinbase)
  ethPriceAsOf: '2026-02-16', // Date of ETH price above

  // === MARKET DATA ===
  currentStockPrice: 27.15,   // UPDATE REGULARLY - Last: Feb 9, 2026
  priceAsOf: '2026-02-09',    // Date of stock price above

  // === SHARE COUNT ===
  currentShares: 434,         // Shares outstanding (M)

  // === BALANCE SHEET ===
  cashOnHand: 670,            // $670M cash (Feb 17, 2026 PR)
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
  totalETH: 4371497,          // Total ETH holdings (4.371M Feb 17)
  stakedETH: 3040483,         // ETH staked with validators (3.04M — largest staker globally)
  stakingRatio: 69.6,         // % of holdings staked (3,040,483 / 4,371,497)
  ethSupplyPercent: 3.62,     // % of total ETH supply (~120.7M)
  targetSupplyPercent: 5.0,   // "Alchemy of 5%" target = 6,035K ETH
  progressToTarget: 72,       // % progress to 5% (72% — "over 72% of the way")
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
  baseStakingAPY: 2.84,       // CESR rate (Quatrefoil) - updated Feb 17, 2026 PR
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
  dataAsOf: 'Feb 17, 2026',
  lastFiling: '8-K (Feb 17, 2026) 4.371M ETH Holdings Update',
  nextFiling: 'Weekly 8-K Holdings Update',
  priceNote: 'Update prices regularly',
};
