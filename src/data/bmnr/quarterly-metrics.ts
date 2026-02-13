/**
 * BMNR Quarterly Financial Data
 * Extracted from BMNRQuarterlyMetricsPanel in BMNR.tsx.
 * Update when new 10-Q/10-K filings are processed.
 * Newest first.
 */

export const BMNR_QUARTERLY_DATA = [
  { quarter: 'Q1 2026', cash: 888, crypto: 10562, cryptoType: 'ETH', assets: 11487, liabilities: 236, equity: 11252, revenue: 2.3, netIncome: -5204, shares: 409, era: '💎 ETH', opEx: 18, opExGandA: 12, opExTreasury: 4, opExOther: 2, filing: '10-Q (Jan 2026)', ethHoldings: 4500000, stakingYield: 3.5, stakingDeployed: 450000 },
  { quarter: 'Q4 2025', cash: 512, crypto: 8260, cryptoType: 'ETH', assets: 8800, liabilities: 102, equity: 8690, revenue: 5.8, netIncome: 328, shares: 384, era: '💎 ETH', opEx: 15, opExGandA: 10, opExTreasury: 3, opExOther: 2, filing: '10-K (Nov 2025)', ethHoldings: 4110000, stakingYield: 3.5, stakingDeployed: 409000 },
  { quarter: 'Q3 2025', cash: 1.5, crypto: 0.17, cryptoType: 'BTC', assets: 8.27, liabilities: 5.39, equity: 2.88, revenue: 2.1, netIncome: -0.62, shares: 6.2, era: '⛏️ BTC', opEx: 2.8, opExGandA: 2.2, opExOther: 0.6, filing: '10-Q/A (Feb 2025)' },
  { quarter: 'Q2 2025', cash: 0.5, crypto: 0.25, cryptoType: 'BTC', assets: 7.50, liabilities: 4.82, equity: 2.68, revenue: 1.5, netIncome: -1.15, shares: 39.7, era: '⛏️ BTC', opEx: 2.5, opExGandA: 2.0, opExOther: 0.5, filing: '10-Q (Nov 2024)' },
  { quarter: 'Q1 2025', cash: 0.8, crypto: 0.15, cryptoType: 'BTC', assets: 7.93, liabilities: 4.47, equity: 3.47, revenue: 1.2, netIncome: -0.975, shares: 39.7, era: '⛏️ BTC', opEx: 2.2, opExGandA: 1.8, opExOther: 0.4, filing: '10-Q (Aug 2024)' },
];

export const BMNR_MARKET_CAP_DATA = [
  { label: 'Q1 2025', value: 40, display: '$40M' },
  { label: 'Q2 2025', value: 35, display: '$35M' },
  { label: 'Q3 2025', value: 50, display: '$50M' },
  { label: 'Q4 2025', value: 8800, display: '$8.8B' },
  { label: 'Q1 2026', value: 7200, display: '$7.2B' },
];
