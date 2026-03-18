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
 * 11. timeline.ts — Add new timeline entry at top
 * 12. catalysts.ts — Move completed catalysts, update metadata
 * ═══════════════════════════════════════════════════════════════════
 */

import type { DataMetadata, StockDefaults } from '../shared/types';

// ============================================================================
// METADATA - Update when refreshing any data in this file
// ============================================================================

export const BMNR_METADATA: DataMetadata = {
  lastUpdated: '2026-03-16',
  source: 'Mar 16, 2026 Weekly Holdings PR (4.596M ETH)',
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
  stateOfLocation: 'Connecticut',
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
  // === ETH HOLDINGS (Mar 16, 2026 PR) ===
  currentETH: 4595562,        // 4.596M ETH (3.81% of supply)
  ethPrice: 2185,             // UPDATE REGULARLY - Last: Mar 15, 2026 (Coinbase)
  ethPriceAsOf: '2026-03-15', // Date of ETH price above

  // === MARKET DATA ===
  currentStockPrice: 23.84,   // UPDATE REGULARLY - Last: Mar 17, 2026 (Mon close, +15% on ETH PR)
  priceAsOf: '2026-03-17',    // Date of stock price above

  // === SHARE COUNT ===
  currentShares: 470,         // Shares outstanding (M) — est. ~470M via ATM (455M reported Jan 15 + continued issuance)

  // === BALANCE SHEET ===
  cashOnHand: 1200,           // $1.2B cash (Mar 16, 2026 PR)
  totalDebt: 0,               // No debt

  // Not used for BMNR but required by interface
  quarterlyBurn: undefined,
  debtRate: undefined,
};

// ============================================================================
// OTHER HOLDINGS - BTC, Moonshots, Strategic Investments
// ============================================================================

/**
 * Non-ETH holdings tracked separately for Total NAV calculation
 *
 * AI AGENT INSTRUCTIONS:
 * - Update btcHoldings from weekly PR if BTC count changes
 * - Update btcPrice regularly (Coinbase)
 * - Update beastIndustriesEquity if investment value changes
 * - Update moonshotsValue from quarterly filings
 */
export const OTHER_HOLDINGS = {
  // BTC Holdings (196 BTC — legacy from mining era, +3 since Mar 16 PR)
  btcHoldings: 196,
  btcPrice: 84000,               // UPDATE REGULARLY — Last: Mar 14, 2026
  btcPriceAsOf: '2026-03-14',

  // Strategic Investments
  beastIndustriesEquity: 200_000_000,    // $200M — Beast Industries (MrBeast), closed Jan 17, 2026
  beastIndustriesNote: 'MrBeast partnership — Step Banking App (7M+ users)',

  // Moonshot Investments
  moonshotsValue: 83_000_000,            // $83M — Eightco ORBS stake (was $14M; +$80M Mar 12 commitment; ORBS holds OpenAI + Beast equity)
  moonshotsNote: 'Eightco ORBS stake ($50M OpenAI + $25M Beast Industries equity via ORBS)',
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
  totalETH: 4595562,          // Total ETH holdings (4.596M Mar 16)
  stakedETH: 3040515,         // ETH staked with validators (3.04M — largest staker globally, +32 from prior week)
  stakingRatio: 66.2,         // % of holdings staked (3,040,515 / 4,595,562) — declining mechanically as new ETH not yet staked
  ethSupplyPercent: 3.81,     // % of total ETH supply (~120.7M)
  targetSupplyPercent: 5.0,   // "Alchemy of 5%" target = 6,035K ETH
  progressToTarget: 76,       // % progress to 5% (76% — "over 76% of the way")
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
  baseStakingAPY: 2.79,       // CESR rate (Quatrefoil) - updated Mar 16, 2026 PR
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
  dataAsOf: 'Mar 16, 2026',
  lastFiling: '8-K (Mar 16, 2026) 4.596M ETH Holdings Update',
  nextFiling: 'Weekly 8-K Holdings Update',
  priceNote: 'Update prices regularly',
};
