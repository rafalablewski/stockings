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
 * - Stock prices from market data at time of PR
 *
 * LAST UPDATED: 2026-02-23
 * NEXT UPDATE: After next weekly holdings PR
 *
 * AI AGENT INSTRUCTIONS:
 * When adding new purchase entries:
 * 1. Add entry at TOP of BMNR_PURCHASE_HISTORY array (newest first)
 * 2. ethBought = new ETH holdings - previous ETH holdings
 * 3. ethPrice from PR or Coinbase at time
 * 4. cashDeployed = ethBought × ethPrice (approximate)
 * 5. mnavAtTime = stockPrice / navPerShare where navPerShare = (totalEthAfter × ethPrice + cashOnHand) / sharesOutstanding
 * 6. Update PURCHASE_HISTORY_METADATA
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
  mnavAtTime: number | null;  // mNAV multiple at time (stock price / NAV per share), null if unknown
  stockPrice: number | null;  // BMNR stock price at time
  navPerShare: number | null; // NAV per share at time (ETH value + cash / shares)
  source: string;             // PR date/filing reference
  notes?: string;             // Optional context
}

// ============================================================================
// METADATA
// ============================================================================

export const PURCHASE_HISTORY_METADATA: DataMetadata = {
  lastUpdated: '2026-02-23',
  source: 'Weekly Holdings PRs (PRNewswire) + 8-K filings',
  nextExpectedUpdate: 'After next weekly holdings PR',
  notes: 'Purchase amounts derived from week-over-week ETH holdings changes. Cash deployed is approximate (ethBought × ethPrice).',
};

// ============================================================================
// PURCHASE HISTORY (newest first)
// ============================================================================

/**
 * All ETH purchases from weekly 8-K/PR filings.
 * Newest first. mNAV and stockPrice are null where market data was not recorded.
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries at TOP
 * - Always include ethBought, ethPrice, totalEthAfter, cashDeployed
 * - Fill mnavAtTime, stockPrice, navPerShare when available
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
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Feb 23, 2026 PR',
    notes: '3.66% of supply, 73% to Alchemy of 5%. Tom Lee: "mini crypto winter" framing.',
  },
  {
    date: '2026-02-17',
    ethBought: 45759,
    ethPrice: 1998,
    totalEthAfter: 4371497,
    cashDeployed: 91426242,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Feb 17, 2026 PR',
    notes: 'Staking crosses 3M ETH (3,040,483). Consensus HK presentation.',
  },
  {
    date: '2026-02-09',
    ethBought: 40613,
    ethPrice: 2125,
    totalEthAfter: 4325738,
    cashDeployed: 86302625,
    mnavAtTime: 1.36,
    stockPrice: 27.15,
    navPerShare: 19.97,
    source: 'Feb 9, 2026 PR',
    notes: 'CoinDesk Consensus 2026 Hong Kong presentation. 3.58% of supply.',
  },
  {
    date: '2026-02-02',
    ethBought: 41787,
    ethPrice: 2317,
    totalEthAfter: 4285125,
    cashDeployed: 96818679,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Feb 2, 2026 PR',
    notes: '3.55% of supply, ~71% to 5%. Staking 2.897M (67.6%).',
  },
  // === JANUARY 2026 ===
  {
    date: '2026-01-26',
    ethBought: 40302,
    ethPrice: 2839,
    totalEthAfter: 4243338,
    cashDeployed: 114417378,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jan 26, 2026 PR',
    notes: '3.52% of supply, ~70% to 5%. Beast $200M closed. #91 most traded.',
  },
  {
    date: '2026-01-20',
    ethBought: 35268,
    ethPrice: 3211,
    totalEthAfter: 4203036,
    cashDeployed: 113275548,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jan 20, 2026 PR',
    notes: 'Tom Lee urges YES vote on 50B authorized shares. Staking +596K in one week.',
  },
  {
    date: '2026-01-12',
    ethBought: 24266,
    ethPrice: 3119,
    totalEthAfter: 4167768,
    cashDeployed: 75685754,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jan 12, 2026 PR',
    notes: 'Beast Industries $200M investment announced. Annual Meeting Jan 15 @ Wynn.',
  },
  {
    date: '2026-01-05',
    ethBought: 32977,
    ethPrice: 3196,
    totalEthAfter: 4143502,
    cashDeployed: 105382492,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jan 5, 2026 PR',
    notes: 'Holiday week accumulation. Cash nearly doubled to $915M. #44 most traded.',
  },
  // === DECEMBER 2025 ===
  {
    date: '2025-12-29',
    ethBought: 44463,
    ethPrice: 2948,
    totalEthAfter: 4110525,
    cashDeployed: 131077124,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Dec 29, 2025 PR',
  },
  {
    date: '2025-12-22',
    ethBought: 98852,
    ethPrice: 2991,
    totalEthAfter: 4066062,
    cashDeployed: 295664232,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Dec 22, 2025 PR',
  },
  {
    date: '2025-12-15',
    ethBought: 102259,
    ethPrice: 3074,
    totalEthAfter: 3967210,
    cashDeployed: 314343966,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Dec 15, 2025 PR',
  },
  {
    date: '2025-12-08',
    ethBought: 138452,
    ethPrice: 3139,
    totalEthAfter: 3864951,
    cashDeployed: 434600828,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Dec 8, 2025 PR',
  },
  {
    date: '2025-12-01',
    ethBought: 166620,
    ethPrice: 3008,
    totalEthAfter: 3726499,
    cashDeployed: 501273360,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Dec 1, 2025 PR',
  },
  // === NOVEMBER 2025 ===
  {
    date: '2025-11-17',
    ethBought: 54156,
    ethPrice: 3120,
    totalEthAfter: 3559879,
    cashDeployed: 168966720,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Nov 17, 2025 PR',
  },
  {
    date: '2025-11-10',
    ethBought: 110301,
    ethPrice: 3639,
    totalEthAfter: 3505723,
    cashDeployed: 401385339,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Nov 10, 2025 PR',
  },
  {
    date: '2025-11-03',
    ethBought: 82353,
    ethPrice: 3903,
    totalEthAfter: 3395422,
    cashDeployed: 321425859,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Nov 3, 2025 PR',
  },
  {
    date: '2025-10-27',
    ethBought: 77055,
    ethPrice: 4164,
    totalEthAfter: 3313069,
    cashDeployed: 320864820,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Oct 27, 2025 PR',
  },
  // === OCTOBER 2025 ===
  {
    date: '2025-10-20',
    ethBought: 203826,
    ethPrice: 4022,
    totalEthAfter: 3236014,
    cashDeployed: 819788172,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Oct 20, 2025 PR',
    notes: 'Aggressive buying post Oct 10 deleveraging event.',
  },
  {
    date: '2025-10-13',
    ethBought: 202037,
    ethPrice: 4154,
    totalEthAfter: 3032188,
    cashDeployed: 839261698,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Oct 13, 2025 PR',
    notes: 'Post Oct 10 liquidation — largest ever single-day crypto deleveraging.',
  },
  {
    date: '2025-10-06',
    ethBought: 179251,
    ethPrice: 4535,
    totalEthAfter: 2830151,
    cashDeployed: 812903285,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Oct 6, 2025 PR',
  },
  // === SEPTEMBER 2025 ===
  {
    date: '2025-09-29',
    ethBought: 234846,
    ethPrice: 4141,
    totalEthAfter: 2650900,
    cashDeployed: 972687186,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Sep 29, 2025 PR',
  },
  {
    date: '2025-09-22',
    ethBought: 264378,
    ethPrice: 4497,
    totalEthAfter: 2416054,
    cashDeployed: 1189095966,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Sep 22, 2025 PR',
  },
  {
    date: '2025-09-15',
    ethBought: 82233,
    ethPrice: 4632,
    totalEthAfter: 2151676,
    cashDeployed: 380903256,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Sep 15, 2025 PR',
  },
  {
    date: '2025-09-08',
    ethBought: 202469,
    ethPrice: 4312,
    totalEthAfter: 2069443,
    cashDeployed: 873046328,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Sep 8, 2025 PR',
  },
  {
    date: '2025-09-02',
    ethBought: 153075,
    ethPrice: 4458,
    totalEthAfter: 1866974,
    cashDeployed: 682408350,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Sep 2, 2025 PR',
  },
  // === AUGUST 2025 ===
  {
    date: '2025-08-25',
    ethBought: 190526,
    ethPrice: 4808,
    totalEthAfter: 1713899,
    cashDeployed: 916449008,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Aug 25, 2025 PR',
    notes: 'Passed 1M ETH. World largest ETH treasury in 5 weeks. #25 most liquid US stock.',
  },
  {
    date: '2025-08-18',
    ethBought: 373110,
    ethPrice: 4326,
    totalEthAfter: 1523373,
    cashDeployed: 1614127860,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Aug 18, 2025 PR',
  },
  {
    date: '2025-08-11',
    ethBought: 317126,
    ethPrice: 4311,
    totalEthAfter: 1150263,
    cashDeployed: 1367142186,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Aug 11, 2025 PR',
  },
  {
    date: '2025-08-04',
    ethBought: 266361,
    ethPrice: 3492,
    totalEthAfter: 833137,
    cashDeployed: 930132612,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Aug 4, 2025 PR',
    notes: 'Large weekly accumulation continues.',
  },
  // === JULY 2025 ===
  {
    date: '2025-07-24',
    ethBought: 266119,
    ethPrice: 3644,
    totalEthAfter: 566776,
    cashDeployed: 969665636,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jul 24, 2025 PR',
    notes: '+88% ETH in 1 week.',
  },
  {
    date: '2025-07-17',
    ethBought: 137515,
    ethPrice: 3462,
    totalEthAfter: 300657,
    cashDeployed: 476026930,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jul 17, 2025 PR',
  },
  {
    date: '2025-07-14',
    ethBought: 163142,
    ethPrice: 3073,
    totalEthAfter: 163142,
    cashDeployed: 501335366,
    mnavAtTime: null,
    stockPrice: null,
    navPerShare: null,
    source: 'Jul 14, 2025 PR',
    notes: 'First ETH treasury purchase. Beginning of ETH accumulation strategy.',
  },
];
