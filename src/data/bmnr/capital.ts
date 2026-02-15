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

import type { DataMetadata, CashRunwayScenario } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CAPITAL_METADATA: DataMetadata = {
  lastUpdated: '2026-02-09',
  source: 'Feb 9, 2026 S-8 (2025 Omnibus Incentive Plan)',
  nextExpectedUpdate: 'Q2 FY26 10-Q or DEF 14A proxy',
  notes: 'Simple single-class structure supports rapid ATM execution. S-8 filed Feb 9 for 2025 Omnibus Incentive Plan.',
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
    date: 'Sep 22, 2025',
    type: '424B5',
    amount: 0.365,
    status: 'completed',
    notes: 'Prospectus supplement',
  },
  {
    date: 'Aug 12, 2025',
    type: 'ATM+',
    amount: 24.5,
    status: 'active',
    notes: '$24.5B shelf active - massive firepower',
  },
  {
    date: 'Jul 28, 2025',
    type: 'ATM+',
    amount: 4.5,
    status: 'exhausted',
    notes: 'Exhausted in 5 weeks',
  },
  {
    date: 'Jul 2025',
    type: 'ATM',
    amount: 2.0,
    status: 'exhausted',
    notes: 'Initial ATM program',
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
    source: 'Jan 15, 2026 8-K',
    notes: 'High-profile value investor',
  },
  {
    name: 'ARK Invest (Cathie Wood)',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Reaffirmed institutional backing',
  },
  {
    name: 'MOZAYYX',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Premier institutional investor',
  },
  {
    name: 'Founders Fund',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Peter Thiel\'s fund',
  },
  {
    name: 'Pantera Capital',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Crypto-focused fund',
  },
  {
    name: 'Kraken',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Crypto exchange',
  },
  {
    name: 'DCG (Digital Currency Group)',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Barry Silbert\'s crypto conglomerate',
  },
  {
    name: 'Galaxy Digital',
    shares: null,
    percent: null,
    type: 'Institution',
    source: 'Jan 15, 2026 8-K',
    notes: 'Mike Novogratz',
  },
  {
    name: 'Tom Lee',
    shares: null,
    percent: null,
    type: 'Individual',
    source: 'Jan 15, 2026 8-K',
    notes: 'Chairman of the Board',
  },
];

// ============================================================================
// CASH RUNWAY / LIQUIDITY DATA
// ============================================================================

/**
 * Cash runway and liquidity data customized for BMNR's ETH treasury model
 *
 * AI AGENT INSTRUCTIONS:
 * - Update cash position from weekly 8-K filings
 * - Adjust burn rate for changes in operating model
 * - Track staking yield income as offset to operational burn
 * - Note impact of unrealized crypto gains/losses on balance sheet
 * - Update ETH-adjusted scenarios when ETH price moves significantly
 */

/**
 * Liquidity position summary
 * Key difference from ASTS: ETH treasury is primary asset, not just cash
 */
export const LIQUIDITY_POSITION = {
  cashAndEquiv: 595,            // $595M cash (Feb 9, 2026 PR)
  ethHoldings: 4325738,         // 4.326M ETH
  ethPrice: 2125,               // ETH price as of date
  ethValueUSD: 9192,            // ETH value in $M (~$9.19B)
  totalLiquidity: 9787,         // Cash + ETH value in $M
  quarterlyOpEx: 18,            // Q1 FY26 opex $18M
  stakingYieldQuarterly: 82,    // ~3.11% APY on 2.9M staked ETH × $2,125 / 4 = ~$82M/Q
  netQuarterlyBurn: -64,        // Negative = net cash generation from staking
  totalDebt: 0,                 // No debt
  atmCapacity: 24500,           // $24.5B shelf active
  asOf: '2026-02-12',
};

/**
 * Cash runway scenarios for BMNR
 * Unlike traditional companies, BMNR's runway is virtually unlimited
 * due to ETH staking yield exceeding operational costs
 */
export const CASH_RUNWAY_SCENARIOS: CashRunwayScenario[] = [
  {
    label: 'Base Case (Current)',
    startingCash: 595,
    quarterlyBurn: 18,
    quarterlyRevenue: 82,
    runwayQuarters: 999,
    notes: 'Cash-flow positive from staking yield ($82M/Q) vs opex ($18M/Q). Infinite runway.',
  },
  {
    label: 'ETH Price Stress (-50%)',
    startingCash: 595,
    quarterlyBurn: 18,
    quarterlyRevenue: 41,
    runwayQuarters: 999,
    notes: 'Even at 50% ETH price decline, staking yield ($41M/Q) exceeds opex. Cash positive.',
  },
  {
    label: 'ETH Price Stress (-75%)',
    startingCash: 595,
    quarterlyBurn: 18,
    quarterlyRevenue: 20,
    runwayQuarters: 999,
    notes: 'At 75% decline, staking yield ($20M/Q) still covers opex ($18M/Q). Marginal surplus.',
  },
  {
    label: 'Crypto Winter (No Yield)',
    startingCash: 595,
    quarterlyBurn: 18,
    quarterlyRevenue: 0,
    runwayQuarters: 33,
    notes: 'Worst case: zero staking yield (protocol change or regulatory ban). ~33Q cash runway.',
  },
];

/**
 * ETH-specific liquidity factors
 * These capture the unique aspects of BMNR's treasury model vs traditional companies
 */
/** Fraction of ETH holdings currently staked (~67%) */
export const STAKING_RATIO = 0.67;
/** Annual percentage yield on staked ETH (~3.11%) */
export const STAKING_APY = 0.0311;

export const ETH_LIQUIDITY_FACTORS = {
  /** Unrealized gains on ETH holdings affect GAAP balance sheet but not cash flow */
  unrealizedGainRisk: 'ETH marked-to-market per ASC 350. Price declines reduce book equity but not cash.',
  /** Staking yield is real income partially offsetting operational costs */
  stakingAsRevenueOffset: 'Staking yield (~3.11% APY on 67% of holdings) generates ~$330M/yr revenue.',
  /** Capital raises tied to ETH accumulation, not burn coverage */
  raisesPurpose: 'ATM raises fund ETH purchases, not operating losses. Accretive if sold above NAV.',
  /** Wind-down of proprietary mining reduces future burn */
  miningWindDown: 'Legacy BTC mining operations wound down. Focus shifted to ETH treasury strategy.',
};

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
