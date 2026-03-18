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
 * 2. PERIOD PRICE RANGES: Each entry now includes periodHigh/periodLow —
 *    the intraday high and low from Yahoo Finance for all trading days in
 *    the purchase period (from the day after the previous PR through the
 *    last trading day before the current PR). Since we don't know WHEN
 *    during the week the ETH was actually purchased, the mNAV range
 *    (mnavLow to mnavHigh) shows the full range of possible mNAV multiples.
 *    The actual purchase mNAV falls somewhere in this range.
 *
 * 3. SHARES OUTSTANDING: BMNR issued shares continuously via ATM programs, growing
 *    from ~5M (Jun 2025) to ~464M (Feb 2026) — a 93x increase. We only have 7
 *    confirmed anchor points; all other dates are LINEAR INTERPOLATIONS, which
 *    assume constant daily issuance between anchors. In reality, ATM issuance was
 *    highly uneven (e.g., the first $4.5B ATM was exhausted in ~5 weeks, then a
 *    $24.5B ATM launched). This makes Jul–Sep shares estimates especially rough.
 *
 * 4. NAV CALCULATION IS SIMPLIFIED: navPerShare = (totalEthAfter × ethPrice) ÷
 *    sharesOutstanding. This EXCLUDES cash (~$400M–$988M), BTC holdings (193 BTC),
 *    moonshot investments ($17M–$214M Eightco/ORBS, $200M Beast Industries), and
 *    liabilities. A full NAV would include these, which would RAISE navPerShare and
 *    LOWER mNAV. Therefore, mNAV values shown here are BIASED UPWARD (overstated).
 *
 * 5. mNAV RANGES BY PERIOD (using Yahoo Finance data):
 *    - Jul 2025 (3 entries):  LOW confidence on shares. mNAV range 0.85–11.00x
 *      (first entry includes IPO day $12.38→$161 spike). Excluding IPO week,
 *      Jul 17–24 range narrows to 1.67–2.94x reflecting post-IPO hype premium.
 *    - Aug 2025 (4 entries):  LOW confidence on shares. mNAV range 1.01–2.21x.
 *      Aug 11–15 period had highest volatility ($54–$72 range = 2.01x max mNAV).
 *    - Sep 2025 (5 entries):  MODERATE confidence. mNAV range 1.11–1.64x.
 *      Sep 19 close $61.29 confirmed by 8-K ($70 RD at 14% premium).
 *    - Oct 2025 (3 entries):  MODERATE. mNAV range 1.20–1.65x. Oct 10 crash day
 *      intraday low $52.37 — but stock never fell to NAV even at worst.
 *    - Nov 2025 (3 entries):  MODERATE. mNAV range 1.04–1.51x. Wide range
 *      reflects Nov sell-off ($44.88 high → $24.33 low within month).
 *    - Dec 2025 (5 entries):  MODERATE-HIGH. mNAV range 0.89–1.44x. First
 *      potential period below NAV (Dec 1 period low $24.33 vs nav $27.37).
 *    - Jan 2026 (4 entries):  MODERATE. mNAV range 0.87–1.14x. Tighter ranges,
 *      stock oscillating around NAV parity.
 *    - Feb 2026 (5 entries):  HIGH. mNAV range 0.86–1.40x. Feb 5 intraday
 *      low $17.19 — deepest potential discount (0.86x) vs nav $19.97.
 *    - Mar 2026 (3 entries):  HIGH. mNAV range 0.90–1.17x. Mostly near parity,
 *      occasional dips below NAV.
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
 *
 * periodHigh / periodLow (intraday extremes during purchase period):
 *   - SOURCE: Yahoo Finance historical data — intraday High and Low columns
 *   - PERIOD: All trading days from day after previous PR through last trading
 *     day before current PR. For the first entry (Jul 14), period starts Jun 30
 *     (IPO/listing day).
 *   - RELIABILITY: HIGH for price data. The mNAV range derived from these prices
 *     still depends on shares outstanding estimates (LOW for Jul–Aug).
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
 *   - ALL OTHER DATES: Linear interpolation between anchors.
 *
 * navPerShare:
 *   - SIMPLIFIED FORMULA: (totalEthAfter × ethPrice) ÷ sharesOutstanding
 *   - EXCLUDES: Cash ($400M–$988M), BTC (193 BTC, ~$15M–$19M), Eightco/ORBS
 *     ($17M–$214M), Beast Industries ($200M), and all liabilities/debt.
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
 * 6. periodHigh/periodLow: Intraday high/low from Yahoo for all trading days between
 *    previous PR and current PR
 * 7. prevDayMarketCap: prevDayClose × sharesOutstanding (in USD)
 * 8. mnavAtTime = prevDayClose / navPerShare
 * 9. mnavHigh = periodHigh / navPerShare; mnavLow = periodLow / navPerShare
 * 10. Mark source as confirmed (8-K, Form 4) or Yahoo Finance
 * 11. Update PURCHASE_HISTORY_METADATA
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
  prevDayClose: number | null;     // BMNR closing price on last trading day before PR (Yahoo Finance)
  periodHigh: number | null;       // Highest BMNR intraday price during purchase period (Yahoo Finance)
  periodLow: number | null;        // Lowest BMNR intraday price during purchase period (Yahoo Finance)
  prevDayMarketCap: number | null; // Market cap on previous day (prevDayClose × sharesOutstanding), in USD
  navPerShare: number | null;      // NAV per share at time (ETH value / shares outstanding)
  mnavAtTime: number | null;       // mNAV multiple at time (prevDayClose / navPerShare), null if unknown
  mnavHigh: number | null;         // mNAV at period high (periodHigh / navPerShare) — worst-case premium
  mnavLow: number | null;          // mNAV at period low (periodLow / navPerShare) — best-case premium
  source: string;             // PR date/filing reference
  notes?: string;             // Optional context
}

// ============================================================================
// METADATA
// ============================================================================

export const PURCHASE_HISTORY_METADATA: DataMetadata = {
  lastUpdated: '2026-03-18',
  source: 'Weekly Holdings PRs (PRNewswire) + 8-K filings + Yahoo Finance historical prices (close, intraday high/low)',
  nextExpectedUpdate: 'After next weekly holdings PR',
  notes: 'ethBought/ethPrice/totalEthAfter from PRs (high reliability). prevDayClose/periodHigh/periodLow: all 35 entries use Yahoo Finance historical data. Shares outstanding: 7 anchor points from 10-K/10-Q/PRs, linearly interpolated between — crude for Jul-Sep when shares grew 5M→235M. navPerShare is SIMPLIFIED (ETH value only, excludes $400M-$1.2B cash, BTC, moonshots). mnavHigh/mnavLow show full range of possible mNAV for each purchase period — actual mNAV falls somewhere in this range.',
};

// ============================================================================
// PURCHASE HISTORY (newest first)
// ============================================================================

/**
 * All ETH purchases from weekly 8-K/PR filings.
 * Newest first.
 *
 * mnavAtTime = prevDayClose / navPerShare (point estimate using Friday close)
 * mnavHigh = periodHigh / navPerShare (if stock was at period peak during purchase)
 * mnavLow = periodLow / navPerShare (if stock was at period trough during purchase)
 *
 * The actual mNAV when ETH was bought is unknown — it falls in [mnavLow, mnavHigh].
 * mnavAtTime (using prev close) is our best single estimate but the range matters
 * more for volatile periods (e.g., Jul 2025 high/low spread = $12–$161).
 *
 * ⚠️ All mNAV values are overstated because navPerShare excludes cash ($400M–$988M)
 * and other non-ETH assets. A full NAV calculation would lower mNAV by ~0.03–0.15x.
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
    periodHigh: 22.76,
    periodLow: 19.27,
    prevDayMarketCap: 9_654_000_000,
    navPerShare: 21.36,
    mnavAtTime: 0.96,
    mnavHigh: 1.07,
    mnavLow: 0.90,
    source: 'Mar 16, 2026 PR',
    notes: '~470M shares. Period Mar 9–13. High $22.76 (Mar 13), low $19.27 (Mar 9). Mar 13 (Fri) close $20.54 (Yahoo).',
  },
  {
    date: '2026-03-09',
    ethBought: 60976,
    ethPrice: 1965,
    totalEthAfter: 4534563,
    cashDeployed: 119817840,
    prevDayClose: 18.88,
    periodHigh: 21.87,
    periodLow: 18.82,
    prevDayMarketCap: 8_834_000_000,
    navPerShare: 19.04,
    mnavAtTime: 0.99,
    mnavHigh: 1.15,
    mnavLow: 0.99,
    source: 'Mar 9, 2026 PR',
    notes: '~468M shares. Period Mar 2–6. High $21.87 (Mar 4), low $18.82 (Mar 2). Mar 6 (Fri) close $18.88 (Yahoo).',
  },
  {
    date: '2026-03-02',
    ethBought: 50928,
    ethPrice: 1976,
    totalEthAfter: 4473587,
    cashDeployed: 100633728,
    prevDayClose: 18.98,
    periodHigh: 22.17,
    periodLow: 18.65,
    prevDayMarketCap: 8_843_000_000,
    navPerShare: 18.97,
    mnavAtTime: 1.00,
    mnavHigh: 1.17,
    mnavLow: 0.98,
    source: 'Mar 2, 2026 PR',
    notes: '~466M shares. Period Feb 23–27. High $22.17 (Feb 25), low $18.65 (Feb 24). Feb 27 (Fri) close $18.98 (Yahoo).',
  },
  // === FEBRUARY 2026 ===
  {
    date: '2026-02-23',
    ethBought: 51162,
    ethPrice: 1958,
    totalEthAfter: 4422659,
    cashDeployed: 100175196,
    prevDayClose: 20.13,
    periodHigh: 20.68,
    periodLow: 19.25,
    prevDayMarketCap: 9_340_000_000,
    navPerShare: 18.66,
    mnavAtTime: 1.08,
    mnavHigh: 1.11,
    mnavLow: 1.03,
    source: 'Feb 23, 2026 PR',
    notes: '~464M shares. Period Feb 17–20. High $20.68 (Feb 17), low $19.25 (Feb 19). Feb 20 (Fri) close $20.13 (Yahoo). Tight $1.43 range.',
  },
  {
    date: '2026-02-17',
    ethBought: 45759,
    ethPrice: 1998,
    totalEthAfter: 4371497,
    cashDeployed: 91426242,
    prevDayClose: 20.96,
    periodHigh: 21.75,
    periodLow: 18.68,
    prevDayMarketCap: 9_684_000_000,
    navPerShare: 18.89,
    mnavAtTime: 1.11,
    mnavHigh: 1.15,
    mnavLow: 0.99,
    source: 'Feb 17, 2026 PR + Form 4/A',
    notes: '~462M shares. Period Feb 9–13. High $21.75 (Feb 9), low $18.68 (Feb 12). Feb 13 (Fri) close $20.96 (Yahoo). Presidents\' Day Mon Feb 16.',
  },
  {
    date: '2026-02-09',
    ethBought: 40613,
    ethPrice: 2125,
    totalEthAfter: 4325738,
    cashDeployed: 86302625,
    prevDayClose: 20.47,
    periodHigh: 24.08,
    periodLow: 17.19,
    prevDayMarketCap: 9_416_000_000,
    navPerShare: 19.97,
    mnavAtTime: 1.03,
    mnavHigh: 1.21,
    mnavLow: 0.86,
    source: 'Feb 9, 2026 PR',
    notes: '~460M shares. Period Feb 2–6. High $24.08 (Feb 2), low $17.19 (Feb 5). Feb 6 (Fri) close $20.47 (Yahoo). Widest Feb range — $6.89 spread.',
  },
  {
    date: '2026-02-02',
    ethBought: 41787,
    ethPrice: 2317,
    totalEthAfter: 4285125,
    cashDeployed: 96818679,
    prevDayClose: 25.10,
    periodHigh: 30.55,
    periodLow: 24.55,
    prevDayMarketCap: 11_395_000_000,
    navPerShare: 21.89,
    mnavAtTime: 1.15,
    mnavHigh: 1.40,
    mnavLow: 1.12,
    source: 'Feb 2, 2026 PR',
    notes: '~454M shares. Period Jan 26–30. High $30.55 (Jan 28), low $24.55 (Jan 30). Jan 30 (Fri) close $25.10 (Yahoo).',
  },
  // === JANUARY 2026 ===
  {
    date: '2026-01-26',
    ethBought: 40302,
    ethPrice: 2839,
    totalEthAfter: 4243338,
    cashDeployed: 114417378,
    prevDayClose: 28.80,
    periodHigh: 29.76,
    periodLow: 26.76,
    prevDayMarketCap: 12_874_000_000,
    navPerShare: 26.95,
    mnavAtTime: 1.07,
    mnavHigh: 1.10,
    mnavLow: 0.99,
    source: 'Jan 26, 2026 PR',
    notes: '~447M shares. Period Jan 20–23. High $29.76 (Jan 23), low $26.76 (Jan 21). Jan 23 (Fri) close $28.80 (Yahoo). Tight $2.99 range.',
  },
  {
    date: '2026-01-20',
    ethBought: 35268,
    ethPrice: 3211,
    totalEthAfter: 4203036,
    cashDeployed: 113275548,
    prevDayClose: 31.16,
    periodHigh: 34.39,
    periodLow: 29.71,
    prevDayMarketCap: 13_742_000_000,
    navPerShare: 30.57,
    mnavAtTime: 1.02,
    mnavHigh: 1.13,
    mnavLow: 0.97,
    source: 'Jan 20, 2026 PR',
    notes: '~441M shares. Period Jan 12–16. High $34.39 (Jan 14), low $29.71 (Jan 12). Jan 16 (Fri) close $31.16 (Yahoo). MLK Day Mon Jan 19.',
  },
  {
    date: '2026-01-12',
    ethBought: 24266,
    ethPrice: 3119,
    totalEthAfter: 4167768,
    cashDeployed: 75685754,
    prevDayClose: 30.06,
    periodHigh: 34.04,
    periodLow: 29.16,
    prevDayMarketCap: 13_046_000_000,
    navPerShare: 29.95,
    mnavAtTime: 1.00,
    mnavHigh: 1.14,
    mnavLow: 0.97,
    source: 'Jan 12, 2026 PR',
    notes: '434M shares (PR). Period Jan 5–9. High $34.04 (Jan 6), low $29.16 (Jan 8). Jan 9 (Fri) close $30.06 (Yahoo).',
  },
  {
    date: '2026-01-05',
    ethBought: 32977,
    ethPrice: 3196,
    totalEthAfter: 4143502,
    cashDeployed: 105382492,
    prevDayClose: 31.19,
    periodHigh: 31.26,
    periodLow: 26.84,
    prevDayMarketCap: 13_412_000_000,
    navPerShare: 30.80,
    mnavAtTime: 1.01,
    mnavHigh: 1.01,
    mnavLow: 0.87,
    source: 'Jan 5, 2026 PR',
    notes: '~430M shares. Period Dec 29–Jan 2. High $31.26 (Jan 2), low $26.84 (Dec 31). Jan 2 (Fri) close $31.19 (Yahoo). Holiday week — low volume.',
  },
  // === DECEMBER 2025 ===
  {
    date: '2025-12-29',
    ethBought: 44463,
    ethPrice: 2948,
    totalEthAfter: 4110525,
    cashDeployed: 131077124,
    prevDayClose: 28.31,
    periodHigh: 32.78,
    periodLow: 27.90,
    prevDayMarketCap: 12_060_000_000,
    navPerShare: 28.45,
    mnavAtTime: 1.00,
    mnavHigh: 1.15,
    mnavLow: 0.98,
    source: 'Dec 29, 2025 PR',
    notes: '~426M shares. Period Dec 22–26. High $32.78 (Dec 22), low $27.90 (Dec 26). Dec 26 (Fri) close $28.31 (Yahoo).',
  },
  {
    date: '2025-12-22',
    ethBought: 98852,
    ethPrice: 2991,
    totalEthAfter: 4066062,
    cashDeployed: 295664232,
    prevDayClose: 31.36,
    periodHigh: 34.84,
    periodLow: 28.40,
    prevDayMarketCap: 13_234_000_000,
    navPerShare: 28.83,
    mnavAtTime: 1.09,
    mnavHigh: 1.21,
    mnavLow: 0.99,
    source: 'Dec 22, 2025 PR',
    notes: '~422M shares. Period Dec 15–19. High $34.84 (Dec 15), low $28.40 (Dec 18). Dec 19 (Fri) close $31.36 (Yahoo).',
  },
  {
    date: '2025-12-15',
    ethBought: 102259,
    ethPrice: 3074,
    totalEthAfter: 3967210,
    cashDeployed: 314343966,
    prevDayClose: 34.86,
    periodHigh: 42.08,
    periodLow: 33.80,
    prevDayMarketCap: 14_571_000_000,
    navPerShare: 29.19,
    mnavAtTime: 1.19,
    mnavHigh: 1.44,
    mnavLow: 1.16,
    source: 'Dec 15, 2025 PR',
    notes: '~418M shares. Period Dec 8–12. High $42.08 (Dec 10), low $33.80 (Dec 8). Dec 12 (Fri) close $34.86 (Yahoo). Dec 10 spike to $42 — possible $70 RD aftermarket.',
  },
  {
    date: '2025-12-08',
    ethBought: 138452,
    ethPrice: 3139,
    totalEthAfter: 3864951,
    cashDeployed: 434600828,
    prevDayClose: 34.06,
    periodHigh: 36.63,
    periodLow: 28.81,
    prevDayMarketCap: 14_101_000_000,
    navPerShare: 29.33,
    mnavAtTime: 1.16,
    mnavHigh: 1.25,
    mnavLow: 0.98,
    source: 'Dec 8, 2025 PR',
    notes: '~414M shares. Period Dec 1–5. High $36.63 (Dec 5), low $28.81 (Dec 1). Dec 5 (Fri) close $34.06 (Yahoo).',
  },
  {
    date: '2025-12-01',
    ethBought: 166620,
    ethPrice: 3008,
    totalEthAfter: 3726499,
    cashDeployed: 501273360,
    prevDayClose: 33.12,
    periodHigh: 35.20,
    periodLow: 24.33,
    prevDayMarketCap: 13_579_000_000,
    navPerShare: 27.37,
    mnavAtTime: 1.21,
    mnavHigh: 1.29,
    mnavLow: 0.89,
    source: 'Dec 1, 2025 PR',
    notes: '~410M shares (10-Q Nov 30: 409M). Period Nov 17–28. High $35.20 (Nov 28), low $24.33 (Nov 21). Nov 28 (Fri) close $33.12 (Yahoo). Wide 2-week range — Nov 20-21 sell-off to $24.',
  },
  // === NOVEMBER 2025 ===
  {
    date: '2025-11-17',
    ethBought: 54156,
    ethPrice: 3120,
    totalEthAfter: 3559879,
    cashDeployed: 168966720,
    prevDayClose: 34.40,
    periodHigh: 43.77,
    periodLow: 33.54,
    prevDayMarketCap: 13_210_000_000,
    navPerShare: 28.92,
    mnavAtTime: 1.19,
    mnavHigh: 1.51,
    mnavLow: 1.16,
    source: 'Nov 17, 2025 PR',
    notes: '~384M shares. Period Nov 10–14. High $43.77 (Nov 10), low $33.54 (Nov 14). Nov 14 (Fri) close $34.40 (Yahoo). Steep $10 decline over week.',
  },
  {
    date: '2025-11-10',
    ethBought: 110301,
    ethPrice: 3639,
    totalEthAfter: 3505723,
    cashDeployed: 401385339,
    prevDayClose: 40.23,
    periodHigh: 44.88,
    periodLow: 35.79,
    prevDayMarketCap: 14_925_000_000,
    navPerShare: 34.41,
    mnavAtTime: 1.17,
    mnavHigh: 1.30,
    mnavLow: 1.04,
    source: 'Nov 10, 2025 PR',
    notes: '~371M shares. Period Nov 3–7. High $44.88 (Nov 3), low $35.79 (Nov 7). Nov 7 (Fri) close $40.23 (Yahoo).',
  },
  {
    date: '2025-11-03',
    ethBought: 82353,
    ethPrice: 3903,
    totalEthAfter: 3395422,
    cashDeployed: 321425859,
    prevDayClose: 46.65,
    periodHigh: 54.54,
    periodLow: 44.47,
    prevDayMarketCap: 16_654_000_000,
    navPerShare: 37.09,
    mnavAtTime: 1.26,
    mnavHigh: 1.47,
    mnavLow: 1.20,
    source: 'Nov 3, 2025 PR',
    notes: '~357M shares. Period Oct 27–31. High $54.54 (Oct 27), low $44.47 (Oct 30). Oct 31 (Fri) close $46.65 (Yahoo).',
  },
  {
    date: '2025-10-27',
    ethBought: 77055,
    ethPrice: 4164,
    totalEthAfter: 3313069,
    cashDeployed: 320864820,
    prevDayClose: 50.41,
    periodHigh: 55.19,
    periodLow: 46.56,
    prevDayMarketCap: 17_341_000_000,
    navPerShare: 40.12,
    mnavAtTime: 1.26,
    mnavHigh: 1.38,
    mnavLow: 1.16,
    source: 'Oct 27, 2025 PR',
    notes: '~344M shares. Period Oct 20–24. High $55.19 (Oct 21), low $46.56 (Oct 22). Oct 24 (Fri) close $50.41 (Yahoo).',
  },
  // === OCTOBER 2025 ===
  {
    date: '2025-10-20',
    ethBought: 203826,
    ethPrice: 4022,
    totalEthAfter: 3236014,
    cashDeployed: 819788172,
    prevDayClose: 49.85,
    periodHigh: 56.85,
    periodLow: 48.51,
    prevDayMarketCap: 16_500_000_000,
    navPerShare: 39.38,
    mnavAtTime: 1.27,
    mnavHigh: 1.44,
    mnavLow: 1.23,
    source: 'Oct 20, 2025 PR',
    notes: '~331M shares. Period Oct 13–17. High $56.85 (Oct 13), low $48.51 (Oct 17). Oct 17 (Fri) close $49.85 (Yahoo).',
  },
  {
    date: '2025-10-13',
    ethBought: 202037,
    ethPrice: 4154,
    totalEthAfter: 3032188,
    cashDeployed: 839261698,
    prevDayClose: 52.47,
    periodHigh: 65.60,
    periodLow: 52.37,
    prevDayMarketCap: 16_633_000_000,
    navPerShare: 39.73,
    mnavAtTime: 1.32,
    mnavHigh: 1.65,
    mnavLow: 1.32,
    source: 'Oct 13, 2025 PR',
    notes: '~317M shares. Period Oct 6–10. High $65.60 (Oct 7), low $52.37 (Oct 10 crash intraday). Oct 10 (Fri) close $52.47 (Yahoo). Largest ever crypto deleveraging.',
  },
  {
    date: '2025-10-06',
    ethBought: 179251,
    ethPrice: 4535,
    totalEthAfter: 2830151,
    cashDeployed: 812903285,
    prevDayClose: 56.65,
    periodHigh: 57.82,
    periodLow: 50.65,
    prevDayMarketCap: 17_222_000_000,
    navPerShare: 42.27,
    mnavAtTime: 1.34,
    mnavHigh: 1.37,
    mnavLow: 1.20,
    source: 'Oct 6, 2025 PR',
    notes: '~304M shares. Period Sep 29–Oct 3. High $57.82 (Oct 3), low $50.65 (Sep 30). Oct 3 (Fri) close $56.65 (Yahoo). Relatively tight $7 range.',
  },
  // === SEPTEMBER 2025 ===
  {
    date: '2025-09-29',
    ethBought: 234846,
    ethPrice: 4141,
    totalEthAfter: 2650900,
    cashDeployed: 972687186,
    prevDayClose: 50.50,
    periodHigh: 59.28,
    periodLow: 47.21,
    prevDayMarketCap: 14_645_000_000,
    navPerShare: 37.82,
    mnavAtTime: 1.34,
    mnavHigh: 1.57,
    mnavLow: 1.25,
    source: 'Sep 29, 2025 PR',
    notes: '~290M shares. Period Sep 22–26. High $59.28 (Sep 22), low $47.21 (Sep 25). Sep 26 (Fri) close $50.50 (Yahoo). Sharp pullback from $61 close on Sep 19.',
  },
  {
    date: '2025-09-22',
    ethBought: 264378,
    ethPrice: 4497,
    totalEthAfter: 2416054,
    cashDeployed: 1189095966,
    prevDayClose: 61.29,
    periodHigh: 64.25,
    periodLow: 50.71,
    prevDayMarketCap: 16_967_000_000,
    navPerShare: 39.25,
    mnavAtTime: 1.56,
    mnavHigh: 1.64,
    mnavLow: 1.29,
    source: 'Sep 22, 2025 8-K + PR',
    notes: '~277M shares. Period Sep 15–19. High $64.25 (Sep 19), low $50.71 (Sep 15). Sep 19 (Fri) close $61.29 (Yahoo, confirmed: $70 RD at 14% premium).',
  },
  {
    date: '2025-09-15',
    ethBought: 82233,
    ethPrice: 4632,
    totalEthAfter: 2151676,
    cashDeployed: 380903256,
    prevDayClose: 55.09,
    periodHigh: 55.29,
    periodLow: 41.92,
    prevDayMarketCap: 14_489_000_000,
    navPerShare: 37.83,
    mnavAtTime: 1.46,
    mnavHigh: 1.46,
    mnavLow: 1.11,
    source: 'Sep 15, 2025 PR',
    notes: '~263M shares. Period Sep 8–12. High $55.29 (Sep 12), low $41.92 (Sep 8). Sep 12 (Fri) close $55.09 (Yahoo). Strong rally from $42→$55 during week.',
  },
  {
    date: '2025-09-08',
    ethBought: 202469,
    ethPrice: 4312,
    totalEthAfter: 2069443,
    cashDeployed: 873046328,
    prevDayClose: 42.04,
    periodHigh: 46.11,
    periodLow: 39.70,
    prevDayMarketCap: 10_510_000_000,
    navPerShare: 35.69,
    mnavAtTime: 1.18,
    mnavHigh: 1.29,
    mnavLow: 1.11,
    source: 'Sep 8, 2025 PR',
    notes: '~250M shares. Period Sep 2–5. High $46.11 (Sep 3), low $39.70 (Sep 5). Sep 5 (Fri) close $42.04 (Yahoo). 2% ETH supply crossed.',
  },
  {
    date: '2025-09-02',
    ethBought: 153075,
    ethPrice: 4458,
    totalEthAfter: 1866974,
    cashDeployed: 682408350,
    prevDayClose: 43.62,
    periodHigh: 55.01,
    periodLow: 43.45,
    prevDayMarketCap: 10_425_000_000,
    navPerShare: 34.89,
    mnavAtTime: 1.25,
    mnavHigh: 1.58,
    mnavLow: 1.25,
    source: 'Sep 2, 2025 PR',
    notes: '~239M shares. Period Aug 25–29. High $55.01 (Aug 25), low $43.45 (Aug 29). Aug 29 (Fri) close $43.62 (Yahoo). Labor Day Mon Sep 1. Steady decline through week.',
  },
  // === AUGUST 2025 ===
  {
    date: '2025-08-25',
    ethBought: 190526,
    ethPrice: 4808,
    totalEthAfter: 1713899,
    cashDeployed: 916449008,
    prevDayClose: 53.49,
    periodHigh: 57.30,
    periodLow: 47.02,
    prevDayMarketCap: 11_072_000_000,
    navPerShare: 39.81,
    mnavAtTime: 1.34,
    mnavHigh: 1.44,
    mnavLow: 1.18,
    source: 'Aug 25, 2025 PR',
    notes: '~207M shares. Period Aug 18–22. High $57.30 (Aug 18), low $47.02 (Aug 22). Aug 22 (Fri) close $53.49 (Yahoo). NAV/share $39.84 confirmed in PR.',
  },
  {
    date: '2025-08-18',
    ethBought: 373110,
    ethPrice: 4326,
    totalEthAfter: 1523373,
    cashDeployed: 1614127860,
    prevDayClose: 57.81,
    periodHigh: 71.74,
    periodLow: 54.10,
    prevDayMarketCap: 10_695_000_000,
    navPerShare: 35.63,
    mnavAtTime: 1.62,
    mnavHigh: 2.01,
    mnavLow: 1.52,
    source: 'Aug 18, 2025 PR',
    notes: '~185M shares. Period Aug 11–15. High $71.74 (Aug 13), low $54.10 (Aug 15). Aug 15 (Fri) close $57.81 (Yahoo). Extreme volatility — $17.64 spread.',
  },
  {
    date: '2025-08-11',
    ethBought: 317126,
    ethPrice: 4311,
    totalEthAfter: 1150263,
    cashDeployed: 1367142186,
    prevDayClose: 51.43,
    periodHigh: 54.43,
    periodLow: 30.67,
    prevDayMarketCap: 8_383_000_000,
    navPerShare: 30.44,
    mnavAtTime: 1.69,
    mnavHigh: 1.79,
    mnavLow: 1.01,
    source: 'Aug 11, 2025 PR',
    notes: '~163M shares. Period Aug 4–8. High $54.43 (Aug 8), low $30.67 (Aug 5). Aug 8 (Fri) close $51.43 (Yahoo). Massive rally $31→$51 in one week.',
  },
  {
    date: '2025-08-04',
    ethBought: 266361,
    ethPrice: 3492,
    totalEthAfter: 833137,
    cashDeployed: 930132612,
    prevDayClose: 31.68,
    periodHigh: 45.70,
    periodLow: 30.30,
    prevDayMarketCap: 4_467_000_000,
    navPerShare: 20.65,
    mnavAtTime: 1.53,
    mnavHigh: 2.21,
    mnavLow: 1.47,
    source: 'Aug 4, 2025 PR',
    notes: '~141M shares. Period Jul 24–Aug 1. High $45.70 (Jul 24), low $30.30 (Aug 1). Aug 1 (Fri) close $31.68 (Yahoo). Continued decline from Jul highs.',
  },
  // === JULY 2025 ===
  {
    date: '2025-07-24',
    ethBought: 266119,
    ethPrice: 3644,
    totalEthAfter: 566776,
    cashDeployed: 969665636,
    prevDayClose: 39.50,
    periodHigh: 48.59,
    periodLow: 37.10,
    prevDayMarketCap: 3_674_000_000,
    navPerShare: 22.27,
    mnavAtTime: 1.77,
    mnavHigh: 2.18,
    mnavLow: 1.67,
    source: 'Jul 24, 2025 PR',
    notes: '~93M shares. Period Jul 17–23. High $48.59 (Jul 17), low $37.10 (Jul 22). Jul 23 (Wed) close $39.50 (Yahoo). +88% ETH in 1 week.',
  },
  {
    date: '2025-07-17',
    ethBought: 137515,
    ethPrice: 3462,
    totalEthAfter: 300657,
    cashDeployed: 476026930,
    prevDayClose: 44.80,
    periodHigh: 59.00,
    periodLow: 39.10,
    prevDayMarketCap: 2_330_000_000,
    navPerShare: 20.09,
    mnavAtTime: 2.23,
    mnavHigh: 2.94,
    mnavLow: 1.95,
    source: 'Jul 17, 2025 PR',
    notes: '~52M shares. Period Jul 14–16. High $59.00 (Jul 14), low $39.10 (Jul 15). Jul 16 (Wed) close $44.80 (Yahoo). Crashing from $161 peak.',
  },
  {
    date: '2025-07-14',
    ethBought: 163142,
    ethPrice: 3073,
    totalEthAfter: 163142,
    cashDeployed: 501335366,
    prevDayClose: 40.62,
    periodHigh: 161.00,
    periodLow: 12.38,
    prevDayMarketCap: 1_381_000_000,
    navPerShare: 14.64,
    mnavAtTime: 2.77,
    mnavHigh: 11.00,
    mnavLow: 0.85,
    source: 'Jul 14, 2025 PR',
    notes: '~34M shares. Period Jun 30–Jul 11 (IPO week through first PR). High $161.00 (Jul 3 — 52wk high), low $12.38 (Jun 30 IPO day open). Jul 11 (Fri) close $40.62 (Yahoo). First ETH purchase. Extreme range reflects IPO frenzy → crash.',
  },
];
