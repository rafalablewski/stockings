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
  lastUpdated: '2026-02-19',
  source: 'Jan 27, 2026 Form 4/A (Tom Lee RSU Grant + Tax Withholding)',
  nextExpectedUpdate: 'Q2 FY26 10-Q or DEF 14A proxy',
  notes: 'Simple single-class structure supports rapid ATM execution. S-8 filed Feb 9 for 2025 Omnibus Incentive Plan. Tom Lee Form 4/A: 1.5M RSU grant, 231,700 tax-withheld shares.',
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
    shares: 726722,
    percent: null,
    type: 'Individual',
    source: 'Jan 27, 2026 Form 4/A',
    notes: 'Executive Chairman, Director, 10% Owner. 726,722 direct + 222,222 indirect (Thomas J Lee 2012 Trust) + 1,000,000 unvested RSUs. Received 1.5M RSU grant (500K immediate, 500K 1-yr, 500K 2-yr); 231,700 shares tax-withheld @ $28.84 (~$6.7M).',
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
// INSIDER SALES (FORM 4 FILINGS — POST-IPO ERA)
// ============================================================================

/**
 * Insider sales from Form 4 filings (Oct-Dec 2025).
 * Total insider sales ~$112M at avg ~$25/share.
 *
 * AI AGENT INSTRUCTIONS:
 * - Update when new Form 4 filings appear
 * - Track cumulative shares sold per insider
 * - Note Rule 10b5-1 plan status
 */
export const INSIDER_SALES = [
  {
    name: 'Jonathan Bates (CEO → Former CEO)',
    sharesSold: 2800000,
    proceeds: 70000000,
    avgPrice: 25.00,
    period: 'Oct-Dec 2025',
    method: 'Rule 10b5-1 Plan + Open Market',
    notes: 'Reduced from ~41% to ~30%. Pledged ~800K shares to UBS. Stepped down as CEO Nov 14.',
    filings: ['Form 4 (Oct 6)', 'Form 4 (Nov)', 'Form 4 (Dec 5)'],
  },
  {
    name: 'Raymond Mow (CFO → Former CFO)',
    sharesSold: 1000000,
    proceeds: 25000000,
    avgPrice: 25.00,
    period: 'Nov-Dec 2025',
    method: 'Open Market',
    notes: 'Separated as CFO Dec 18, 2025. Resigned from board Dec 12.',
    filings: ['Form 4 (Dec 3)'],
  },
  {
    name: 'Seth Bayles (Secretary → Former Director)',
    sharesSold: 700000,
    proceeds: 17000000,
    avgPrice: 24.29,
    period: 'Nov-Dec 2025',
    method: 'Open Market',
    notes: 'Left board Nov 11 restructuring.',
    filings: ['Form 4 (Dec 1)'],
  },
];

/** Total insider sales summary */
export const INSIDER_SALES_SUMMARY = {
  totalSharesSold: 4500000,
  totalProceeds: 112000000,
  avgPrice: 24.89,
  period: 'Oct-Dec 2025',
  notes: 'Concentrated selling during Oct-Dec 2025. Most under Rule 10b5-1 plans or post-separation.',
};

// ============================================================================
// INSIDER GRANTS (FORM 4 FILINGS — RSU/OPTION GRANTS)
// ============================================================================

/**
 * Insider equity grants from Form 4 filings.
 *
 * AI AGENT INSTRUCTIONS:
 * - Update when new Form 4 filings show RSU/option grants
 * - Track vesting schedules
 */
export const INSIDER_GRANTS = [
  {
    name: 'Tom Lee (Executive Chairman)',
    rsusGranted: 1500000,
    vestingSchedule: '500K immediate, 500K at 1-yr, 500K at 2-yr',
    sharesVested: 500000,
    sharesWithheldForTax: 231700,
    taxWithholdPrice: 28.84,
    unvestedRSUs: 1000000,
    transactionDate: '2026-01-23',
    filingDate: '2026-01-27',
    filingType: 'Form 4/A',
    notes: 'Amendment corrects prior omission of 231,700 tax-withheld shares. Under 2025 Omnibus Incentive Plan.',
  },
];

// ============================================================================
// EARLY SHAREHOLDERS (2021 SC 13D FILINGS — PRE-IPO SHELL ERA)
// ============================================================================

/**
 * Major shareholders from 2021 SC 13D filings when BMNR was Sandy Springs Holdings.
 * These represent the foundational ownership before the mining pivot and ETH treasury.
 *
 * Total concentrated ownership: ~5M+ shares (~30%+ of 2021 outstanding)
 * Shell era shares outstanding: ~10.7M (after Form D raises)
 */
export const EARLY_SHAREHOLDERS_2021 = [
  {
    name: 'Michael Maloney',
    shares: 1500000,
    percent: 12.5,
    type: 'Individual' as const,
    source: 'SC 13D (Sep 1, 2021)',
    notes: 'Largest early holder, sole voting/dispositive power. Resigned from board Aug 29, 2022.',
  },
  {
    name: 'Abed Equities, Inc.',
    shares: 1000000,
    percent: 9.3,
    type: 'Entity' as const,
    source: 'SC 13D (Aug 19, 2021)',
    notes: 'Passive investment. Signed by Johannes Hendrik Heyns.',
  },
  {
    name: 'Samuel P. Jorgensen',
    shares: 1000000,
    percent: 9.0,
    type: 'Individual' as const,
    source: 'SC 13D (Aug 10, 2021)',
    notes: 'Passive investment.',
  },
  {
    name: 'Jonathan R. Bates',
    shares: null,
    percent: null,
    type: 'Individual/Entity' as const,
    source: 'SC 13D (Aug 3, 2021)',
    notes: 'Via Innovative Digital Investors LP + BFAM Partners LLC. Control person. Later became CEO (~41% by 2024).',
  },
  {
    name: 'Ryan Ramnath',
    shares: null,
    percent: null,
    type: 'Individual/Entity' as const,
    source: 'SC 13D (Aug 6, 2021)',
    notes: 'Via Bitflair Mining Corp. CEO/President of Bitflair. Mining expertise for crypto pivot.',
  },
];

// ============================================================================
// EARLY CAPITAL RAISES (PRE-IPO)
// ============================================================================

/**
 * Capital raises from shell era through pre-IPO.
 * The company went from $1.05M Form D to $18M IPO to $250M+ PIPE.
 */
export const EARLY_OFFERINGS = [
  {
    date: 'Apr 4, 2021',
    type: 'Form D',
    amount: 1.05,
    status: 'completed' as const,
    notes: '$1.05M exempt offering (Rule 506(b)). First capital raise post-shell registration.',
  },
  {
    date: 'May 31, 2022',
    type: 'S-1',
    amount: 10.0,
    status: 'withdrawn' as const,
    notes: 'Proposed $10M offering for mining expansion. Withdrawn Jun 15, 2023 (RW filing).',
  },
];

// ============================================================================
// SHARE COUNT HISTORY
// ============================================================================

/**
 * Share count evolution from shell to ETH treasury.
 * Demonstrates 15,500x dilution from shell to current, driven by ETH accumulation strategy.
 */
export const SHARE_COUNT_HISTORY = [
  { date: 'Oct 2020', shares: 2800000, event: 'Shell registration (Form 10-12G)' },
  { date: 'Aug 2021', shares: 10700000, event: 'Post-Form D raises + insider stakes' },
  { date: 'Jul 2022', shares: 40000000, event: 'Post-name change, authorized to 500M' },
  { date: 'Jun 2025', shares: 2500000, event: 'Pre-IPO (post reverse splits)' },
  { date: 'Jun 2025', shares: 4750000, event: 'Post-IPO ($18M @ $8/share)' },
  { date: 'Aug 2025', shares: 234700000, event: 'FY2025 10-K (post ATM + PIPE)' },
  { date: 'Nov 2025', shares: 409000000, event: 'Q1 FY2026 10-Q' },
  { date: 'Jan 2026', shares: 434000000, event: 'Latest (Jan 12, 2026 PR)' },
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
  rsus: 1000000,
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
