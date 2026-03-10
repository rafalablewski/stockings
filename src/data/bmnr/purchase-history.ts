/**
 * BMNR (BITMINE) - ETH PURCHASE HISTORY
 * ================================================
 *
 * Chronological record of all ETH purchases with key metrics.
 * Extracted from weekly 8-K/PR filings tracked in timeline.ts.
 *
 * DATA SOURCES:
 * - Weekly press releases (PRNewswire)
 * - 8-K filings (SEC EDGAR)
 * - Stock prices: confirmed from 8-K filings, Form 4 tax withholding, and market data;
 *   estimated (≈) from interpolation between confirmed points and news reports
 * - Shares outstanding: 10-K (Aug 31), 10-Q (Nov 30), PRs (Jan 12, Jul 29), back-calc (Feb 9)
 * - NAV/share: (totalEthAfter × ethPrice) ÷ sharesOutstanding (simplified, excludes cash)
 *
 * CONFIRMED PRICE SOURCES:
 * - Sep 22, 2025: $61.29 — 8-K filing ($70 RD offering at 14% premium to close)
 * - Dec 29, 2025: $28.40 — market data (multiple sources)
 * - Feb  9, 2026: $27.15 — market data
 * - Feb 17, 2026: $28.84 — Form 4/A tax withholding price
 *
 * SHARES OUTSTANDING ANCHORS:
 * - Jul 29, 2025: 121.7M FD (PR — $1B buyback announcement)
 * - Aug 25, 2025: ~207M (back-calc from NAV/share $39.84 in PR)
 * - Aug 31, 2025: 234.7M (FY2025 10-K)
 * - Nov 30, 2025: 409M (Q1 FY2026 10-Q)
 * - Dec 29, 2025: ~426M (timeline: 384M→426M transition)
 * - Jan 12, 2026: 434M (PR)
 * - Feb  9, 2026: ~460M (back-calc from confirmed mNAV 1.36)
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: After next weekly holdings PR
 *
 * AI AGENT INSTRUCTIONS:
 * When adding new purchase entries:
 * 1. Add entry at TOP of BMNR_PURCHASE_HISTORY array (newest first)
 * 2. ethBought = new ETH holdings - previous ETH holdings
 * 3. ethPrice from PR or Coinbase at time
 * 4. cashDeployed = ethBought × ethPrice (approximate)
 * 5. prevDayClose: BMNR closing price on last trading day before PR (Yahoo Finance, Nasdaq)
 * 6. prevDayMarketCap: prevDayClose × sharesOutstanding (in USD)
 * 7. mnavAtTime = prevDayClose / navPerShare where navPerShare = (totalEthAfter × ethPrice) / sharesOutstanding
 * 8. Mark source as confirmed (8-K, Form 4) or estimated (≈ interpolated)
 * 9. Update PURCHASE_HISTORY_METADATA
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// TYPES
// ============================================================================

export interface PurchaseRecord {
  date: string;               // Date of weekly PR/8-K
  ethBought: number;          // ETH acquired that week
  ethPrice: number;           // ETH price at time (from PR, USD)
  totalEthAfter: number;      // Running total ETH after purchase
  cashDeployed: number;       // Approx USD spent (ethBought × ethPrice)
  prevDayClose: number | null;     // BMNR closing price on last trading day before PR
  prevDayMarketCap: number | null; // Market cap on previous day (prevDayClose × sharesOutstanding), in USD
  navPerShare: number | null;      // NAV per share at time (ETH value / shares outstanding)
  mnavAtTime: number | null;       // mNAV multiple at time (prevDayClose / NAV per share), null if unknown
  source: string;             // PR date/filing reference
  notes?: string;             // Optional context
}

// ============================================================================
// METADATA
// ============================================================================

export const PURCHASE_HISTORY_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Weekly Holdings PRs (PRNewswire) + 8-K filings + market data',
  nextExpectedUpdate: 'After next weekly holdings PR',
  notes: 'Purchase amounts derived from week-over-week ETH holdings changes. Cash deployed is approximate (ethBought × ethPrice). mNAV uses simplified NAV (ETH value only, excludes cash). Stock prices marked ≈ are interpolated estimates; confirmed prices sourced from 8-K filings, Form 4, or corroborated market data. Shares outstanding interpolated between 10-K/10-Q/PR anchor points.',
};

// ============================================================================
// PURCHASE HISTORY (newest first)
// ============================================================================

/**
 * All ETH purchases from weekly 8-K/PR filings.
 * Newest first. mNAV computed from prevDayClose / NAV per share.
 *
 * prevDayClose = BMNR closing price on the last trading day before the PR date.
 * prevDayMarketCap = prevDayClose × sharesOutstanding (approximate).
 *
 * Confidence levels (in notes):
 * - No marker = confirmed from filing or corroborated market data
 * - ≈ = estimated/interpolated between confirmed data points
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries at TOP
 * - Always include ethBought, ethPrice, totalEthAfter, cashDeployed
 * - Fill prevDayClose, prevDayMarketCap, navPerShare, mnavAtTime
 */
export const BMNR_PURCHASE_HISTORY: PurchaseRecord[] = [
  // [PR_CHECKLIST_PURCHASE_HISTORY] - Add new purchase entry here at top!
  // === FEBRUARY 2026 ===
  {
    date: '2026-02-23',
    ethBought: 51162,
    ethPrice: 1958,
    totalEthAfter: 4422659,
    cashDeployed: 100175196,
    prevDayClose: 25.50,
    prevDayMarketCap: 11_832_000_000,
    navPerShare: 18.66,
    mnavAtTime: 1.37,
    source: 'Feb 23, 2026 PR',
    notes: '≈ ~464M shares. 3.66% of supply, 73% to Alchemy of 5%. Tom Lee: "mini crypto winter" framing.',
  },
  {
    date: '2026-02-17',
    ethBought: 45759,
    ethPrice: 1998,
    totalEthAfter: 4371497,
    cashDeployed: 91426242,
    prevDayClose: 28.84,
    prevDayMarketCap: 13_332_000_000,
    navPerShare: 18.89,
    mnavAtTime: 1.53,
    source: 'Feb 17, 2026 PR + Form 4/A',
    notes: '~462M shares. Staking crosses 3M ETH. Consensus HK. Price from Form 4/A tax withholding.',
  },
  {
    date: '2026-02-09',
    ethBought: 40613,
    ethPrice: 2125,
    totalEthAfter: 4325738,
    cashDeployed: 86302625,
    prevDayClose: 27.15,
    prevDayMarketCap: 12_489_000_000,
    navPerShare: 19.97,
    mnavAtTime: 1.36,
    source: 'Feb 9, 2026 PR',
    notes: '~460M shares. CoinDesk Consensus 2026 Hong Kong presentation. 3.58% of supply.',
  },
  {
    date: '2026-02-02',
    ethBought: 41787,
    ethPrice: 2317,
    totalEthAfter: 4285125,
    cashDeployed: 96818679,
    prevDayClose: 27.00,
    prevDayMarketCap: 12_245_000_000,
    navPerShare: 21.89,
    mnavAtTime: 1.23,
    source: 'Feb 2, 2026 PR',
    notes: '≈ ~454M shares. 3.55% of supply, ~71% to 5%. Staking 2.897M (67.6%).',
  },
  // === JANUARY 2026 ===
  {
    date: '2026-01-26',
    ethBought: 40302,
    ethPrice: 2839,
    totalEthAfter: 4243338,
    cashDeployed: 114417378,
    prevDayClose: 29.00,
    prevDayMarketCap: 12_963_000_000,
    navPerShare: 26.95,
    mnavAtTime: 1.08,
    source: 'Jan 26, 2026 PR',
    notes: '≈ ~447M shares. 3.52% of supply, ~70% to 5%. Beast $200M closed. #91 most traded.',
  },
  {
    date: '2026-01-20',
    ethBought: 35268,
    ethPrice: 3211,
    totalEthAfter: 4203036,
    cashDeployed: 113275548,
    prevDayClose: 32.00,
    prevDayMarketCap: 14_126_000_000,
    navPerShare: 30.57,
    mnavAtTime: 1.05,
    source: 'Jan 20, 2026 PR',
    notes: '≈ ~441M shares. Tom Lee urges YES vote on 50B authorized shares. Staking +596K in one week.',
  },
  {
    date: '2026-01-12',
    ethBought: 24266,
    ethPrice: 3119,
    totalEthAfter: 4167768,
    cashDeployed: 75685754,
    prevDayClose: 31.00,
    prevDayMarketCap: 13_454_000_000,
    navPerShare: 29.95,
    mnavAtTime: 1.03,
    source: 'Jan 12, 2026 PR',
    notes: '≈ 434M shares (PR). Beast Industries $200M investment announced. Annual Meeting Jan 15 @ Wynn.',
  },
  {
    date: '2026-01-05',
    ethBought: 32977,
    ethPrice: 3196,
    totalEthAfter: 4143502,
    cashDeployed: 105382492,
    prevDayClose: 30.00,
    prevDayMarketCap: 12_900_000_000,
    navPerShare: 30.80,
    mnavAtTime: 0.97,
    source: 'Jan 5, 2026 PR',
    notes: '≈ ~430M shares. Holiday week accumulation. Cash nearly doubled to $915M. #44 most traded.',
  },
  // === DECEMBER 2025 ===
  {
    date: '2025-12-29',
    ethBought: 44463,
    ethPrice: 2948,
    totalEthAfter: 4110525,
    cashDeployed: 131077124,
    prevDayClose: 28.40,
    prevDayMarketCap: 12_098_000_000,
    navPerShare: 28.45,
    mnavAtTime: 1.00,
    source: 'Dec 29, 2025 PR',
    notes: '~426M shares. Price confirmed from market data.',
  },
  {
    date: '2025-12-22',
    ethBought: 98852,
    ethPrice: 2991,
    totalEthAfter: 4066062,
    cashDeployed: 295664232,
    prevDayClose: 29.00,
    prevDayMarketCap: 12_235_000_000,
    navPerShare: 28.83,
    mnavAtTime: 1.01,
    source: 'Dec 22, 2025 PR',
    notes: '≈ ~422M shares. Near Dec 24 confirmed close of $29.35.',
  },
  {
    date: '2025-12-15',
    ethBought: 102259,
    ethPrice: 3074,
    totalEthAfter: 3967210,
    cashDeployed: 314343966,
    prevDayClose: 28.00,
    prevDayMarketCap: 11_698_000_000,
    navPerShare: 29.19,
    mnavAtTime: 0.96,
    source: 'Dec 15, 2025 PR',
    notes: '≈ ~418M shares. Trading near 200-DMA support ~$27.',
  },
  {
    date: '2025-12-08',
    ethBought: 138452,
    ethPrice: 3139,
    totalEthAfter: 3864951,
    cashDeployed: 434600828,
    prevDayClose: 27.00,
    prevDayMarketCap: 11_170_000_000,
    navPerShare: 29.33,
    mnavAtTime: 0.92,
    source: 'Dec 8, 2025 PR',
    notes: '≈ ~414M shares. Near 200-DMA support ~$27. mNAV below 1.0 = discount to NAV.',
  },
  {
    date: '2025-12-01',
    ethBought: 166620,
    ethPrice: 3008,
    totalEthAfter: 3726499,
    cashDeployed: 501273360,
    prevDayClose: 29.00,
    prevDayMarketCap: 11_878_000_000,
    navPerShare: 27.37,
    mnavAtTime: 1.06,
    source: 'Dec 1, 2025 PR',
    notes: '≈ ~410M shares (10-Q Nov 30: 409M). FXLeaders: "BMNR slips below $30."',
  },
  // === NOVEMBER 2025 ===
  {
    date: '2025-11-17',
    ethBought: 54156,
    ethPrice: 3120,
    totalEthAfter: 3559879,
    cashDeployed: 168966720,
    prevDayClose: 38.00,
    prevDayMarketCap: 14_596_000_000,
    navPerShare: 28.92,
    mnavAtTime: 1.31,
    source: 'Nov 17, 2025 PR',
    notes: '≈ ~384M shares. Nov range: high $44.88, low $35.79 (multiple sources).',
  },
  {
    date: '2025-11-10',
    ethBought: 110301,
    ethPrice: 3639,
    totalEthAfter: 3505723,
    cashDeployed: 401385339,
    prevDayClose: 42.00,
    prevDayMarketCap: 15_569_000_000,
    navPerShare: 34.41,
    mnavAtTime: 1.22,
    source: 'Nov 10, 2025 PR',
    notes: '≈ ~371M shares. Early Nov confirmed ~$42-44 range (Investing.com, news reports).',
  },
  {
    date: '2025-11-03',
    ethBought: 82353,
    ethPrice: 3903,
    totalEthAfter: 3395422,
    cashDeployed: 321425859,
    prevDayClose: 43.00,
    prevDayMarketCap: 15_363_000_000,
    navPerShare: 37.09,
    mnavAtTime: 1.16,
    source: 'Nov 3, 2025 PR',
    notes: '≈ ~357M shares. Early Nov confirmed ~$42-44 range (multiple sources). Halfway to 5%.',
  },
  {
    date: '2025-10-27',
    ethBought: 77055,
    ethPrice: 4164,
    totalEthAfter: 3313069,
    cashDeployed: 320864820,
    prevDayClose: 42.00,
    prevDayMarketCap: 14_443_000_000,
    navPerShare: 40.12,
    mnavAtTime: 1.05,
    source: 'Oct 27, 2025 PR',
    notes: '≈ ~344M shares. Recovery from Oct 10 crash approaching Nov $42-44 levels.',
  },
  // === OCTOBER 2025 ===
  {
    date: '2025-10-20',
    ethBought: 203826,
    ethPrice: 4022,
    totalEthAfter: 3236014,
    cashDeployed: 819788172,
    prevDayClose: 33.00,
    prevDayMarketCap: 10_905_000_000,
    navPerShare: 39.38,
    mnavAtTime: 0.84,
    source: 'Oct 20, 2025 PR',
    notes: '≈ ~331M shares. Post Oct 10 recovery. "Surged from under $25 to $35" (FXLeaders).',
  },
  {
    date: '2025-10-13',
    ethBought: 202037,
    ethPrice: 4154,
    totalEthAfter: 3032188,
    cashDeployed: 839261698,
    prevDayClose: 28.00,
    prevDayMarketCap: 8_878_000_000,
    navPerShare: 39.73,
    mnavAtTime: 0.70,
    source: 'Oct 13, 2025 PR',
    notes: '≈ ~317M shares. Post Oct 10 liquidation — largest ever crypto deleveraging. Deep discount to NAV.',
  },
  {
    date: '2025-10-06',
    ethBought: 179251,
    ethPrice: 4535,
    totalEthAfter: 2830151,
    cashDeployed: 812903285,
    prevDayClose: 50.00,
    prevDayMarketCap: 15_183_000_000,
    navPerShare: 42.27,
    mnavAtTime: 1.18,
    source: 'Oct 6, 2025 PR',
    notes: '≈ ~304M shares. Pre-Oct 10 crash. Declining from Sep highs.',
  },
  // === SEPTEMBER 2025 ===
  {
    date: '2025-09-29',
    ethBought: 234846,
    ethPrice: 4141,
    totalEthAfter: 2650900,
    cashDeployed: 972687186,
    prevDayClose: 58.00,
    prevDayMarketCap: 16_834_000_000,
    navPerShare: 37.82,
    mnavAtTime: 1.53,
    source: 'Sep 29, 2025 PR',
    notes: '≈ ~290M shares. Slight pullback from Sep 22 close of $61.29.',
  },
  {
    date: '2025-09-22',
    ethBought: 264378,
    ethPrice: 4497,
    totalEthAfter: 2416054,
    cashDeployed: 1189095966,
    prevDayClose: 61.29,
    prevDayMarketCap: 16_967_000_000,
    navPerShare: 39.25,
    mnavAtTime: 1.56,
    source: 'Sep 22, 2025 8-K + PR',
    notes: '~277M shares. Price confirmed: $70 RD offering at 14% premium to $61.29 close (8-K).',
  },
  {
    date: '2025-09-15',
    ethBought: 82233,
    ethPrice: 4632,
    totalEthAfter: 2151676,
    cashDeployed: 380903256,
    prevDayClose: 58.00,
    prevDayMarketCap: 15_279_000_000,
    navPerShare: 37.83,
    mnavAtTime: 1.53,
    source: 'Sep 15, 2025 PR',
    notes: '≈ ~263M shares. Approaching Sep 22 confirmed $61.29.',
  },
  {
    date: '2025-09-08',
    ethBought: 202469,
    ethPrice: 4312,
    totalEthAfter: 2069443,
    cashDeployed: 873046328,
    prevDayClose: 52.00,
    prevDayMarketCap: 13_001_000_000,
    navPerShare: 35.69,
    mnavAtTime: 1.46,
    source: 'Sep 8, 2025 PR',
    notes: '≈ ~250M shares. 2% ETH supply crossed. $3.5B/day trading volume.',
  },
  {
    date: '2025-09-02',
    ethBought: 153075,
    ethPrice: 4458,
    totalEthAfter: 1866974,
    cashDeployed: 682408350,
    prevDayClose: 45.00,
    prevDayMarketCap: 10_734_000_000,
    navPerShare: 34.89,
    mnavAtTime: 1.29,
    source: 'Sep 2, 2025 PR',
    notes: '≈ ~239M shares. Recovery from Aug lows (~$38) toward Sep highs.',
  },
  // === AUGUST 2025 ===
  {
    date: '2025-08-25',
    ethBought: 190526,
    ethPrice: 4808,
    totalEthAfter: 1713899,
    cashDeployed: 916449008,
    prevDayClose: 40.00,
    prevDayMarketCap: 8_280_000_000,
    navPerShare: 39.81,
    mnavAtTime: 1.00,
    source: 'Aug 25, 2025 PR',
    notes: '≈ ~207M shares. NAV/share $39.84 confirmed in PR. #25 most liquid US stock.',
  },
  {
    date: '2025-08-18',
    ethBought: 373110,
    ethPrice: 4326,
    totalEthAfter: 1523373,
    cashDeployed: 1614127860,
    prevDayClose: 39.00,
    prevDayMarketCap: 7_214_000_000,
    navPerShare: 35.63,
    mnavAtTime: 1.09,
    source: 'Aug 18, 2025 PR',
    notes: '≈ ~185M shares. Timeline: "At 1% ETH stock was ~$38." Stabilizing near lows.',
  },
  {
    date: '2025-08-11',
    ethBought: 317126,
    ethPrice: 4311,
    totalEthAfter: 1150263,
    cashDeployed: 1367142186,
    prevDayClose: 38.00,
    prevDayMarketCap: 6_191_000_000,
    navPerShare: 30.44,
    mnavAtTime: 1.25,
    source: 'Aug 11, 2025 PR',
    notes: '≈ ~163M shares. Timeline: "At 1% ETH stock was ~$38."',
  },
  {
    date: '2025-08-04',
    ethBought: 266361,
    ethPrice: 3492,
    totalEthAfter: 833137,
    cashDeployed: 930132612,
    prevDayClose: 42.00,
    prevDayMarketCap: 5_917_000_000,
    navPerShare: 20.65,
    mnavAtTime: 2.03,
    source: 'Aug 4, 2025 PR',
    notes: '≈ ~141M shares. Still elevated mNAV from Jul peak.',
  },
  // === JULY 2025 ===
  {
    date: '2025-07-24',
    ethBought: 266119,
    ethPrice: 3644,
    totalEthAfter: 566776,
    cashDeployed: 969665636,
    prevDayClose: 65.00,
    prevDayMarketCap: 6_029_000_000,
    navPerShare: 22.27,
    mnavAtTime: 2.92,
    source: 'Jul 24, 2025 PR',
    notes: '≈ ~93M shares. +88% ETH in 1 week. Post-$161 peak decline.',
  },
  {
    date: '2025-07-17',
    ethBought: 137515,
    ethPrice: 3462,
    totalEthAfter: 300657,
    cashDeployed: 476026930,
    prevDayClose: 85.00,
    prevDayMarketCap: 4_403_000_000,
    navPerShare: 20.09,
    mnavAtTime: 4.23,
    source: 'Jul 17, 2025 PR',
    notes: '≈ ~52M shares. Rapid decline from $161 peak (Jul 3).',
  },
  {
    date: '2025-07-14',
    ethBought: 163142,
    ethPrice: 3073,
    totalEthAfter: 163142,
    cashDeployed: 501335366,
    prevDayClose: 100.00,
    prevDayMarketCap: 3_425_000_000,
    navPerShare: 14.64,
    mnavAtTime: 6.83,
    source: 'Jul 14, 2025 PR',
    notes: '≈ ~34M shares. First ETH purchase. 11 days after $161 52-week high.',
  },
];
