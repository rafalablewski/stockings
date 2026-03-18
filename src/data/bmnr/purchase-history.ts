/**
 * BMNR (BITMINE) - ETH PURCHASE HISTORY
 * ================================================
 *
 * Chronological record of all ETH purchases with key metrics.
 * Extracted from weekly 8-K/PR filings tracked in timeline.ts.
 *
 * ⚠️ DISCLAIMER — READ BEFORE USING mNAV / prevDayClose / prevDayMarketCap:
 * ──────────────────────────────────────────────────────────────────────────
 * 1. STOCK PRICES: All 35 entries now use Yahoo Finance historical closing
 *    prices for the last trading day before each PR date. This replaces the
 *    previous approach of interpolation/estimation. While Yahoo data is
 *    definitive for closing prices, the exact timing of each PR release
 *    (pre-market vs post-market) is unknown, so "previous trading day" is
 *    our best approximation.
 *
 * 2. SHARES OUTSTANDING: BMNR issued shares continuously via ATM programs, growing
 *    from ~5M (Jun 2025) to ~464M (Feb 2026) — a 93x increase. We only have 7
 *    confirmed anchor points; all other dates are LINEAR INTERPOLATIONS, which
 *    assume constant daily issuance between anchors. In reality, ATM issuance was
 *    highly uneven (e.g., the first $4.5B ATM was exhausted in ~5 weeks, then a
 *    $24.5B ATM launched). This makes Jul–Sep shares estimates especially rough.
 *
 * 3. NAV CALCULATION IS SIMPLIFIED: navPerShare = (totalEthAfter × ethPrice) ÷
 *    sharesOutstanding. This EXCLUDES cash (~$400M–$988M), BTC holdings (193 BTC),
 *    moonshot investments ($17M–$214M Eightco/ORBS, $200M Beast Industries), and
 *    liabilities. A full NAV would include these, which would RAISE navPerShare and
 *    LOWER mNAV. Therefore, mNAV values shown here are BIASED UPWARD (overstated).
 *
 * 4. mNAV RELIABILITY BY PERIOD (using Yahoo Finance closing prices):
 *    - Jul 2025 (3 entries):  LOW confidence on shares. mNAV 1.77–2.77x reflects
 *      post-IPO hype premium. Shares estimates (~34M–93M) are very rough.
 *    - Aug 2025 (4 entries):  LOW confidence on shares. mNAV 1.34–1.69x.
 *      Shares growing rapidly via ATM. Stock volatile ($31–58 range).
 *    - Sep 2025 (5 entries):  MODERATE confidence. Sep 19 close $61.29 confirmed
 *      by 8-K. mNAV 1.18–1.56x. Shares interpolation more stable.
 *    - Oct 2025 (3 entries):  MODERATE. Oct 10 crash — Yahoo shows close $52.47
 *      (intraday low $52.37). mNAV 1.26–1.34x. No discount to NAV despite crash.
 *    - Nov 2025 (3 entries):  MODERATE. mNAV 1.17–1.26x. Shares anchored by
 *      10-Q (409M at Nov 30).
 *    - Dec 2025 (5 entries):  MODERATE-HIGH. mNAV 1.00–1.21x. Dec 26 close
 *      $28.31 (Yahoo). Stock trading near NAV toward month end.
 *    - Jan 2026 (4 entries):  MODERATE. Jan 12 shares confirmed (434M, PR).
 *      mNAV 1.00–1.07x. Stock near NAV parity.
 *    - Feb 2026 (5 entries):  HIGH. All prices from Yahoo. mNAV 1.03–1.15x.
 *      Feb 17 previous close $20.96 (Fri Feb 13; Presidents' Day Mon Feb 16).
 *    - Mar 2026 (3 entries):  HIGH. mNAV 0.96–1.00x. First sustained period
 *      below NAV — ETH recovered but stock lagged.
 *
 * DATA SOURCES:
 * ─────────────
 * ethBought, ethPrice, totalEthAfter:
 *   - SOURCE: Weekly press releases (PRNewswire) and 8-K filings (SEC EDGAR)
 *   - RELIABILITY: HIGH — directly from company filings
 *
 * prevDayClose (BMNR closing price on last trading day before PR):
 *   - SOURCE: Yahoo Finance historical data (finance.yahoo.com/quote/BMNR/history/)
 *   - RELIABILITY: HIGH — definitive exchange closing prices
 *   - NOTE: "Previous trading day" = last market day before PR date. For Monday
 *     PRs this is the prior Friday (or Thursday if Friday was a holiday). For
 *     Tuesday PRs following a Monday holiday (MLK Day, Presidents' Day), this
 *     is the prior Friday.
 *   - CAVEAT: We don't know exact PR release timing (pre-market vs intraday),
 *     so the "previous close" may actually be the same day's open in some cases.
 *
 * prevDayMarketCap (= prevDayClose × sharesOutstanding):
 *   - Shares uncertainty persists. Jul–Aug market caps are rough (shares
 *     estimated). Dec–Feb are more reliable.
 *
 * sharesOutstanding (used to compute navPerShare and prevDayMarketCap):
 *   - CONFIRMED ANCHORS (7 dates):
 *     • Jul 29, 2025: 121,739,533 FD — PR ($1B buyback announcement)
 *     • Aug 25, 2025: ~207M — Back-calculated from NAV/share $39.84 stated in PR
 *     • Aug 31, 2025: 234,700,000 — FY2025 10-K (audited)
 *     • Nov 30, 2025: 409,000,000 — Q1 FY2026 10-Q (filed Jan 13, 2026)
 *     • Dec 29, 2025: ~426M — Timeline transition from 384M (10-Q) to 426M
 *     • Jan 12, 2026: 434,000,000 — Weekly holdings PR
 *     • Feb 9, 2026: ~460M — Back-calculated from confirmed mNAV 1.36
 *   - ALL OTHER DATES: Linear interpolation between anchors. This assumes
 *     constant daily ATM issuance, which is WRONG — issuance was lumpy
 *     (e.g., $4.5B ATM exhausted in 5 weeks Jul–Aug). The Jul–Sep interpolation
 *     is especially crude: shares went from 5M to 235M in ~8 weeks.
 *
 * navPerShare:
 *   - SIMPLIFIED FORMULA: (totalEthAfter × ethPrice) ÷ sharesOutstanding
 *   - EXCLUDES: Cash ($400M–$988M), BTC (193 BTC, ~$15M–$19M), Eightco/ORBS
 *     ($17M–$214M), Beast Industries ($200M), and all liabilities/debt.
 *   - IMPACT: Including cash alone would raise navPerShare by $1–$4 depending
 *     on the date, which would lower mNAV by 0.03–0.15x. Including all assets
 *     would lower mNAV further. This means the "premium" shown is overstated
 *     and any "discount" periods may actually have been even deeper discounts
 *     to true NAV.
 *
 * LAST UPDATED: 2026-03-18
 * NEXT UPDATE: After next weekly holdings PR
 *
 * AI AGENT INSTRUCTIONS:
 * When adding new purchase entries:
 * 1. Add entry at TOP of BMNR_PURCHASE_HISTORY array (newest first)
 * 2. ethBought = new ETH holdings - previous ETH holdings
 * 3. ethPrice from PR or Coinbase at time
 * 4. cashDeployed = ethBought × ethPrice (approximate)
 * 5. prevDayClose: BMNR closing price on last trading day before PR (Yahoo Finance)
 * 6. prevDayMarketCap: prevDayClose × sharesOutstanding (in USD)
 * 7. mnavAtTime = prevDayClose / navPerShare where navPerShare = (totalEthAfter × ethPrice) / sharesOutstanding
 * 8. Mark source as confirmed (8-K, Form 4) or Yahoo Finance
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
  lastUpdated: '2026-03-18',
  source: 'Weekly Holdings PRs (PRNewswire) + 8-K filings + Yahoo Finance historical prices',
  nextExpectedUpdate: 'After next weekly holdings PR',
  notes: 'ethBought/ethPrice/totalEthAfter are from PRs (high reliability). prevDayClose: all 35 entries now use Yahoo Finance historical closing prices (replacing previous interpolated estimates). Shares outstanding: 7 anchor points from 10-K/10-Q/PRs, linearly interpolated between — crude for Jul-Sep when shares grew 5M→235M. navPerShare is SIMPLIFIED (ETH value only, excludes $400M-$1.2B cash, BTC, moonshots). This overstates mNAV by ~0.03-0.15x. Jul-Aug mNAV (1.3-2.8x) reflects post-IPO hype premium. See file header for full methodology and disclaimers.',
};

// ============================================================================
// PURCHASE HISTORY (newest first)
// ============================================================================

/**
 * All ETH purchases from weekly 8-K/PR filings.
 * Newest first. mNAV = prevDayClose / navPerShare.
 *
 * prevDayClose = BMNR closing price on the last trading day before the PR date.
 * All prices from Yahoo Finance historical data.
 * prevDayMarketCap = prevDayClose × sharesOutstanding (approximate).
 *
 * ⚠️ Notes key:
 * - Shares in notes (e.g. "~464M shares") = interpolated, not from a filing
 * - Shares without ~ (e.g. "434M shares (PR)") = from a confirmed source
 *
 * ⚠️ mNAV is overstated because navPerShare excludes cash ($400M–$988M) and other
 * non-ETH assets. A full NAV calculation would lower mNAV by ~0.03–0.15x.
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries at TOP
 * - Always include ethBought, ethPrice, totalEthAfter, cashDeployed
 * - Fill prevDayClose, prevDayMarketCap, navPerShare, mnavAtTime
 * - Use actual closing price from Yahoo Finance for prevDayClose
 * - Note the previous trading day date and source in notes
 */
export const BMNR_PURCHASE_HISTORY: PurchaseRecord[] = [
  // [PR_CHECKLIST_PURCHASE_HISTORY] - Add new purchase entry here at top!
  // === MARCH 2026 ===
  {
    date: '2026-03-16',
    ethBought: 60999,
    ethPrice: 2185,
    totalEthAfter: 4595562,
    cashDeployed: 133282815,
    prevDayClose: 20.54,
    prevDayMarketCap: 9_654_000_000,
    navPerShare: 21.36,
    mnavAtTime: 0.96,
    source: 'Mar 16, 2026 PR',
    notes: '~470M shares est. 3.81% of supply, 76% to Alchemy of 5%. ORBS +$80M. 5K ETH from Ethereum Foundation. Crypto outperformed S&P by 2,450bp since Iran war. Mar 13 (Fri) close $20.54 (Yahoo). Trading below NAV — ETH recovered (+11%) but stock lagged. Stock jumped +15% Mon on PR to $23.84.',
  },
  {
    date: '2026-03-09',
    ethBought: 60976,
    ethPrice: 1965,
    totalEthAfter: 4534563,
    cashDeployed: 119817840,
    prevDayClose: 18.88,
    prevDayMarketCap: 8_834_000_000,
    navPerShare: 19.04,
    mnavAtTime: 0.99,
    source: 'Mar 9, 2026 PR',
    notes: '~468M shares est. 3.76% of supply, 75% to 5%. DeMark: ETH tracking S&P 2011/1987 (89%/93% corr). Increased pace to 61K ETH (from 45-50K). Mar 6 (Fri) close $18.88 (Yahoo).',
  },
  {
    date: '2026-03-02',
    ethBought: 50928,
    ethPrice: 1976,
    totalEthAfter: 4473587,
    cashDeployed: 100633728,
    prevDayClose: 18.98,
    prevDayMarketCap: 8_843_000_000,
    navPerShare: 18.97,
    mnavAtTime: 1.00,
    source: 'Mar 2, 2026 PR',
    notes: '~466M shares est. 3.71% of supply, 74% to 5%. US-Iran combat ops began. Tom Lee: pullback attractive. Cash $868M (+$177M). Feb 27 (Fri) close $18.98 (Yahoo). Trading at NAV parity.',
  },
  // === FEBRUARY 2026 ===
  {
    date: '2026-02-23',
    ethBought: 51162,
    ethPrice: 1958,
    totalEthAfter: 4422659,
    cashDeployed: 100175196,
    prevDayClose: 20.13,
    prevDayMarketCap: 9_340_000_000,
    navPerShare: 18.66,
    mnavAtTime: 1.08,
    source: 'Feb 23, 2026 PR',
    notes: '~464M shares. 3.66% of supply, 73% to Alchemy of 5%. Tom Lee: "mini crypto winter" framing. Feb 20 (Fri) close $20.13 (Yahoo).',
  },
  {
    date: '2026-02-17',
    ethBought: 45759,
    ethPrice: 1998,
    totalEthAfter: 4371497,
    cashDeployed: 91426242,
    prevDayClose: 20.96,
    prevDayMarketCap: 9_684_000_000,
    navPerShare: 18.89,
    mnavAtTime: 1.11,
    source: 'Feb 17, 2026 PR + Form 4/A',
    notes: '~462M shares. Staking crosses 3M ETH. Consensus HK. Feb 13 (Fri) close $20.96 (Yahoo). Presidents\' Day Mon Feb 16. Form 4/A tax withholding priced at $28.84/share (different from market close).',
  },
  {
    date: '2026-02-09',
    ethBought: 40613,
    ethPrice: 2125,
    totalEthAfter: 4325738,
    cashDeployed: 86302625,
    prevDayClose: 20.47,
    prevDayMarketCap: 9_416_000_000,
    navPerShare: 19.97,
    mnavAtTime: 1.03,
    source: 'Feb 9, 2026 PR',
    notes: '~460M shares. CoinDesk Consensus 2026 Hong Kong presentation. 3.58% of supply. Feb 6 (Fri) close $20.47 (Yahoo).',
  },
  {
    date: '2026-02-02',
    ethBought: 41787,
    ethPrice: 2317,
    totalEthAfter: 4285125,
    cashDeployed: 96818679,
    prevDayClose: 25.10,
    prevDayMarketCap: 11_395_000_000,
    navPerShare: 21.89,
    mnavAtTime: 1.15,
    source: 'Feb 2, 2026 PR',
    notes: '~454M shares. 3.55% of supply, ~71% to 5%. Staking 2.897M (67.6%). Jan 30 (Fri) close $25.10 (Yahoo).',
  },
  // === JANUARY 2026 ===
  {
    date: '2026-01-26',
    ethBought: 40302,
    ethPrice: 2839,
    totalEthAfter: 4243338,
    cashDeployed: 114417378,
    prevDayClose: 28.80,
    prevDayMarketCap: 12_874_000_000,
    navPerShare: 26.95,
    mnavAtTime: 1.07,
    source: 'Jan 26, 2026 PR',
    notes: '~447M shares. 3.52% of supply, ~70% to 5%. Beast $200M closed. #91 most traded. Jan 23 (Fri) close $28.80 (Yahoo).',
  },
  {
    date: '2026-01-20',
    ethBought: 35268,
    ethPrice: 3211,
    totalEthAfter: 4203036,
    cashDeployed: 113275548,
    prevDayClose: 31.16,
    prevDayMarketCap: 13_742_000_000,
    navPerShare: 30.57,
    mnavAtTime: 1.02,
    source: 'Jan 20, 2026 PR',
    notes: '~441M shares. Tom Lee urges YES vote on 50B authorized shares. Staking +596K in one week. Jan 16 (Fri) close $31.16 (Yahoo). MLK Day Mon Jan 19.',
  },
  {
    date: '2026-01-12',
    ethBought: 24266,
    ethPrice: 3119,
    totalEthAfter: 4167768,
    cashDeployed: 75685754,
    prevDayClose: 30.06,
    prevDayMarketCap: 13_046_000_000,
    navPerShare: 29.95,
    mnavAtTime: 1.00,
    source: 'Jan 12, 2026 PR',
    notes: '434M shares (PR). Beast Industries $200M investment announced. Annual Meeting Jan 15 @ Wynn. Jan 9 (Fri) close $30.06 (Yahoo).',
  },
  {
    date: '2026-01-05',
    ethBought: 32977,
    ethPrice: 3196,
    totalEthAfter: 4143502,
    cashDeployed: 105382492,
    prevDayClose: 31.19,
    prevDayMarketCap: 13_412_000_000,
    navPerShare: 30.80,
    mnavAtTime: 1.01,
    source: 'Jan 5, 2026 PR',
    notes: '~430M shares. Holiday week accumulation. Cash nearly doubled to $915M. #44 most traded. Jan 2 (Fri) close $31.19 (Yahoo).',
  },
  // === DECEMBER 2025 ===
  {
    date: '2025-12-29',
    ethBought: 44463,
    ethPrice: 2948,
    totalEthAfter: 4110525,
    cashDeployed: 131077124,
    prevDayClose: 28.31,
    prevDayMarketCap: 12_060_000_000,
    navPerShare: 28.45,
    mnavAtTime: 1.00,
    source: 'Dec 29, 2025 PR',
    notes: '~426M shares. Dec 26 (Fri) close $28.31 (Yahoo).',
  },
  {
    date: '2025-12-22',
    ethBought: 98852,
    ethPrice: 2991,
    totalEthAfter: 4066062,
    cashDeployed: 295664232,
    prevDayClose: 31.36,
    prevDayMarketCap: 13_234_000_000,
    navPerShare: 28.83,
    mnavAtTime: 1.09,
    source: 'Dec 22, 2025 PR',
    notes: '~422M shares. Dec 19 (Fri) close $31.36 (Yahoo). Dec 24 close $29.35.',
  },
  {
    date: '2025-12-15',
    ethBought: 102259,
    ethPrice: 3074,
    totalEthAfter: 3967210,
    cashDeployed: 314343966,
    prevDayClose: 34.86,
    prevDayMarketCap: 14_571_000_000,
    navPerShare: 29.19,
    mnavAtTime: 1.19,
    source: 'Dec 15, 2025 PR',
    notes: '~418M shares. Dec 12 (Fri) close $34.86 (Yahoo).',
  },
  {
    date: '2025-12-08',
    ethBought: 138452,
    ethPrice: 3139,
    totalEthAfter: 3864951,
    cashDeployed: 434600828,
    prevDayClose: 34.06,
    prevDayMarketCap: 14_101_000_000,
    navPerShare: 29.33,
    mnavAtTime: 1.16,
    source: 'Dec 8, 2025 PR',
    notes: '~414M shares. Dec 5 (Fri) close $34.06 (Yahoo).',
  },
  {
    date: '2025-12-01',
    ethBought: 166620,
    ethPrice: 3008,
    totalEthAfter: 3726499,
    cashDeployed: 501273360,
    prevDayClose: 33.12,
    prevDayMarketCap: 13_579_000_000,
    navPerShare: 27.37,
    mnavAtTime: 1.21,
    source: 'Dec 1, 2025 PR',
    notes: '~410M shares (10-Q Nov 30: 409M). Nov 28 (Fri) close $33.12 (Yahoo).',
  },
  // === NOVEMBER 2025 ===
  {
    date: '2025-11-17',
    ethBought: 54156,
    ethPrice: 3120,
    totalEthAfter: 3559879,
    cashDeployed: 168966720,
    prevDayClose: 34.40,
    prevDayMarketCap: 13_210_000_000,
    navPerShare: 28.92,
    mnavAtTime: 1.19,
    source: 'Nov 17, 2025 PR',
    notes: '~384M shares. Nov 14 (Fri) close $34.40 (Yahoo). Nov range: high $44.88 (Nov 3), low $24.33 (Nov 21).',
  },
  {
    date: '2025-11-10',
    ethBought: 110301,
    ethPrice: 3639,
    totalEthAfter: 3505723,
    cashDeployed: 401385339,
    prevDayClose: 40.23,
    prevDayMarketCap: 14_925_000_000,
    navPerShare: 34.41,
    mnavAtTime: 1.17,
    source: 'Nov 10, 2025 PR',
    notes: '~371M shares. Nov 7 (Fri) close $40.23 (Yahoo). Early Nov confirmed ~$42-44 range (Investing.com, news reports).',
  },
  {
    date: '2025-11-03',
    ethBought: 82353,
    ethPrice: 3903,
    totalEthAfter: 3395422,
    cashDeployed: 321425859,
    prevDayClose: 46.65,
    prevDayMarketCap: 16_654_000_000,
    navPerShare: 37.09,
    mnavAtTime: 1.26,
    source: 'Nov 3, 2025 PR',
    notes: '~357M shares. Oct 31 (Fri) close $46.65 (Yahoo). Halfway to 5%.',
  },
  {
    date: '2025-10-27',
    ethBought: 77055,
    ethPrice: 4164,
    totalEthAfter: 3313069,
    cashDeployed: 320864820,
    prevDayClose: 50.41,
    prevDayMarketCap: 17_341_000_000,
    navPerShare: 40.12,
    mnavAtTime: 1.26,
    source: 'Oct 27, 2025 PR',
    notes: '~344M shares. Oct 24 (Fri) close $50.41 (Yahoo). Recovery from Oct 10 crash.',
  },
  // === OCTOBER 2025 ===
  {
    date: '2025-10-20',
    ethBought: 203826,
    ethPrice: 4022,
    totalEthAfter: 3236014,
    cashDeployed: 819788172,
    prevDayClose: 49.85,
    prevDayMarketCap: 16_500_000_000,
    navPerShare: 39.38,
    mnavAtTime: 1.27,
    source: 'Oct 20, 2025 PR',
    notes: '~331M shares. Oct 17 (Fri) close $49.85 (Yahoo). Post Oct 10 recovery.',
  },
  {
    date: '2025-10-13',
    ethBought: 202037,
    ethPrice: 4154,
    totalEthAfter: 3032188,
    cashDeployed: 839261698,
    prevDayClose: 52.47,
    prevDayMarketCap: 16_633_000_000,
    navPerShare: 39.73,
    mnavAtTime: 1.32,
    source: 'Oct 13, 2025 PR',
    notes: '~317M shares. Oct 10 (Fri) close $52.47 (Yahoo). Largest ever crypto deleveraging — but stock recovered from intraday low $52.37 by close.',
  },
  {
    date: '2025-10-06',
    ethBought: 179251,
    ethPrice: 4535,
    totalEthAfter: 2830151,
    cashDeployed: 812903285,
    prevDayClose: 56.65,
    prevDayMarketCap: 17_222_000_000,
    navPerShare: 42.27,
    mnavAtTime: 1.34,
    source: 'Oct 6, 2025 PR',
    notes: '~304M shares. Oct 3 (Fri) close $56.65 (Yahoo). Pre-Oct 10 crash.',
  },
  // === SEPTEMBER 2025 ===
  {
    date: '2025-09-29',
    ethBought: 234846,
    ethPrice: 4141,
    totalEthAfter: 2650900,
    cashDeployed: 972687186,
    prevDayClose: 50.50,
    prevDayMarketCap: 14_645_000_000,
    navPerShare: 37.82,
    mnavAtTime: 1.34,
    source: 'Sep 29, 2025 PR',
    notes: '~290M shares. Sep 26 (Fri) close $50.50 (Yahoo). Pullback from Sep 19 close of $61.29.',
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
    notes: '~277M shares. Sep 19 (Fri) close $61.29 (Yahoo, confirmed by 8-K: $70 RD offering at 14% premium to $61.29 close).',
  },
  {
    date: '2025-09-15',
    ethBought: 82233,
    ethPrice: 4632,
    totalEthAfter: 2151676,
    cashDeployed: 380903256,
    prevDayClose: 55.09,
    prevDayMarketCap: 14_489_000_000,
    navPerShare: 37.83,
    mnavAtTime: 1.46,
    source: 'Sep 15, 2025 PR',
    notes: '~263M shares. Sep 12 (Fri) close $55.09 (Yahoo). Approaching Sep 19 close of $61.29.',
  },
  {
    date: '2025-09-08',
    ethBought: 202469,
    ethPrice: 4312,
    totalEthAfter: 2069443,
    cashDeployed: 873046328,
    prevDayClose: 42.04,
    prevDayMarketCap: 10_510_000_000,
    navPerShare: 35.69,
    mnavAtTime: 1.18,
    source: 'Sep 8, 2025 PR',
    notes: '~250M shares. Sep 5 (Fri) close $42.04 (Yahoo). 2% ETH supply crossed. $3.5B/day trading volume.',
  },
  {
    date: '2025-09-02',
    ethBought: 153075,
    ethPrice: 4458,
    totalEthAfter: 1866974,
    cashDeployed: 682408350,
    prevDayClose: 43.62,
    prevDayMarketCap: 10_425_000_000,
    navPerShare: 34.89,
    mnavAtTime: 1.25,
    source: 'Sep 2, 2025 PR',
    notes: '~239M shares. Aug 29 (Fri) close $43.62 (Yahoo). Labor Day Mon Sep 1.',
  },
  // === AUGUST 2025 ===
  {
    date: '2025-08-25',
    ethBought: 190526,
    ethPrice: 4808,
    totalEthAfter: 1713899,
    cashDeployed: 916449008,
    prevDayClose: 53.49,
    prevDayMarketCap: 11_072_000_000,
    navPerShare: 39.81,
    mnavAtTime: 1.34,
    source: 'Aug 25, 2025 PR',
    notes: '~207M shares. Aug 22 (Fri) close $53.49 (Yahoo). NAV/share $39.84 confirmed in PR. #25 most liquid US stock.',
  },
  {
    date: '2025-08-18',
    ethBought: 373110,
    ethPrice: 4326,
    totalEthAfter: 1523373,
    cashDeployed: 1614127860,
    prevDayClose: 57.81,
    prevDayMarketCap: 10_695_000_000,
    navPerShare: 35.63,
    mnavAtTime: 1.62,
    source: 'Aug 18, 2025 PR',
    notes: '~185M shares. Aug 15 (Fri) close $57.81 (Yahoo). Stock declined from $61 range to $54.87 by Mon close.',
  },
  {
    date: '2025-08-11',
    ethBought: 317126,
    ethPrice: 4311,
    totalEthAfter: 1150263,
    cashDeployed: 1367142186,
    prevDayClose: 51.43,
    prevDayMarketCap: 8_383_000_000,
    navPerShare: 30.44,
    mnavAtTime: 1.69,
    source: 'Aug 11, 2025 PR',
    notes: '~163M shares. Aug 8 (Fri) close $51.43 (Yahoo). Stock surging from $33→$51 in one week.',
  },
  {
    date: '2025-08-04',
    ethBought: 266361,
    ethPrice: 3492,
    totalEthAfter: 833137,
    cashDeployed: 930132612,
    prevDayClose: 31.68,
    prevDayMarketCap: 4_467_000_000,
    navPerShare: 20.65,
    mnavAtTime: 1.53,
    source: 'Aug 4, 2025 PR',
    notes: '~141M shares. Aug 1 (Fri) close $31.68 (Yahoo). Post-IPO decline from Jul highs.',
  },
  // === JULY 2025 ===
  {
    date: '2025-07-24',
    ethBought: 266119,
    ethPrice: 3644,
    totalEthAfter: 566776,
    cashDeployed: 969665636,
    prevDayClose: 39.50,
    prevDayMarketCap: 3_674_000_000,
    navPerShare: 22.27,
    mnavAtTime: 1.77,
    source: 'Jul 24, 2025 PR',
    notes: '~93M shares. Jul 23 (Wed) close $39.50 (Yahoo). +88% ETH in 1 week. Post-$161 peak decline.',
  },
  {
    date: '2025-07-17',
    ethBought: 137515,
    ethPrice: 3462,
    totalEthAfter: 300657,
    cashDeployed: 476026930,
    prevDayClose: 44.80,
    prevDayMarketCap: 2_330_000_000,
    navPerShare: 20.09,
    mnavAtTime: 2.23,
    source: 'Jul 17, 2025 PR',
    notes: '~52M shares. Jul 16 (Wed) close $44.80 (Yahoo). Rapid decline from $161 peak (Jul 3).',
  },
  {
    date: '2025-07-14',
    ethBought: 163142,
    ethPrice: 3073,
    totalEthAfter: 163142,
    cashDeployed: 501335366,
    prevDayClose: 40.62,
    prevDayMarketCap: 1_381_000_000,
    navPerShare: 14.64,
    mnavAtTime: 2.77,
    source: 'Jul 14, 2025 PR',
    notes: '~34M shares. Jul 11 (Fri) close $40.62 (Yahoo). First ETH purchase. 11 days after $161 52-week high.',
  },
];
