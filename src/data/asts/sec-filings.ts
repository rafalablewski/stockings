/**
 * ASTS SEC Filings Data
 * Extracted from ASTS.tsx for maintainability.
 * Update when new filings are processed.
 *
 * AI AGENT — MANDATORY PR INGESTION CHECKLIST (see shared/types.ts for full details):
 * When processing an ASTS press release, you MUST update ALL of:
 *  1. ASTS_SEC_FILINGS[] — Add new filing entry at top
 *  2. ASTS_SEC_META.lastPR — Update date + title
 *  3. ASTS_SEC_META.totalFilingsTracked — Increment by 1
 *  4. ASTS_FILING_CROSS_REFS — Add cross-ref entry (if cross-refs exist)
 *  5. ASTS.tsx: filingData (lastPressRelease, lastPressReleaseTitle, latestEvent, latestEventDate, filings['8-K'])
 *  6. ASTS.tsx: pressReleases[] array — Add new entry at TOP
 *  7. Timeline / catalysts files as applicable
 *  8. ASTS.tsx: archive[] (Analysis Archive) — Add NEW full analysis at TOP
 *     ⚠️ MANDATORY for 10-Q and 10-K filings! Search: [PR_CHECKLIST_ARCHIVE]
 */

export const ASTS_SEC_FILINGS = [
  { date: 'Feb 17, 2026', type: '8-K', description: 'Convertible Notes Indenture Completion ($1B 2.25% due 2036; settlement + Item 1.01/2.03/3.02/8.01)', period: '—', color: 'yellow' },
  { date: 'Feb 17, 2026', type: 'SC 13D/A', description: 'Vodafone 13D/A (Amend. No. 3): 14.5M shares (5%); dropped below 5% due to dilution, no sales', period: '—', color: 'green' },
  { date: 'Feb 17, 2026', type: 'Form 4', description: 'Bernal (CAO) RSU vesting: 3K shares, 833 withheld for tax at $82.51 (net 2,167); post: 121,653', period: '—', color: 'green' },
  { date: 'Feb 11, 2026', type: '8-K', description: 'Preliminary FY 2025 Results + Convertible Notes Offering + Registered Directs', period: '—', color: 'yellow' },
  { date: 'Feb 13, 2026', type: '424B5', description: 'Registered Direct Offering #1 (1.86M shares @ $96.92; settles Feb 20)', period: '—', color: 'orange' },
  { date: 'Feb 13, 2026', type: '424B5', description: 'Registered Direct Offering #2 (4.48M shares @ $96.92; settles Feb 20)', period: '—', color: 'orange' },
  { date: 'Jan 30, 2026', type: 'SC 13G', description: 'Vanguard Group 7.68% Ownership (21.5M shares)', period: '—', color: 'green' },
  { date: 'Jan 26, 2026', type: 'Form 4', description: 'Shanti Gupta (COO) RSU Vesting Tax Withholding Amendment', period: '—', color: 'green' },
  { date: 'Jan 16, 2026', type: '8-K', description: 'Mikitani Board Resignation (Rakuten Designee)', period: '—', color: 'yellow' },
  { date: 'Dec 24, 2025', type: '8-K', description: 'BlueBird 6 Launch (First Block 2)', period: '—', color: 'yellow' },
  { date: 'Dec 11, 2025', type: 'SC 13D/A', description: 'American Tower 13D/A: Sold 2.29M shares at $69.75 ($159.8M); 211K Class A remain + 2.17M LLC Units', period: '—', color: 'green' },
  { date: 'Dec 10, 2025', type: 'Form 4', description: 'Multiple: Gupta (COO) sale 10K shares; Larson (Dir) purchase 675 shares', period: '—', color: 'green' },
  { date: 'Dec 5, 2025', type: 'Form 4', description: 'Multiple: Bernal (CAO) sale 6K shares; Yao (CTO) Form 144 40K shares', period: '—', color: 'green' },
  { date: 'Dec 2, 2025', type: 'Form 4', description: 'RSU Grants: Avellan (CEO) 250K, Johnson (CFO) 125K, Wisniewski (Pres) 125K — vest 1/3 annually from May 2026', period: '—', color: 'green' },
  { date: 'Nov 10, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2025', color: 'purple' },
  { date: 'Oct 29, 2025', type: '8-K', description: 'Block 2 Contract (~$100M initial) + ATM Legal Opinion (Freshfields)', period: '—', color: 'yellow' },
  { date: 'Oct 28, 2025', type: 'DEF 14A', description: '2024 Plan Amendment (+10M shares, term extension) — Special Meeting Nov 21', period: '—', color: 'green' },
  { date: 'Oct 23, 2025', type: '424B5', description: 'ATM Prospectus Supplement ($800M capacity via B. Riley, Barclays)', period: '—', color: 'orange' },
  { date: 'Oct 21, 2025', type: '8-K', description: 'Registered Direct (2.05M shares @ $78.61, ~$161M) + ATM Agreement ($800M)', period: '—', color: 'yellow' },
  { date: 'Sep 26, 2025', type: '424B7', description: 'EllioSat Resale Prospectus (581K shares from S-Band acquisition Aug 5)', period: '—', color: 'orange' },
  { date: 'Sep 12, 2025', type: '10-Q/A', description: 'Q2 2025 10-Q Amendment (non-cash equity item corrections, no restatement)', period: 'Q2 2025', color: 'purple' },
  { date: 'Sep 5, 2025', type: '8-K', description: 'Mikitani Board Resignation (personal; event Sep 4). Separate from Jan 2026 Rakuten designee expiration.', period: '—', color: 'yellow' },
  { date: 'Sep 3-15, 2025', type: 'Form 4', description: 'Yao (CTO) sale 40K shares at $41.58 ($1.66M); Gupta (COO) Sep 15 vesting 50K (25.6K tax withhold)', period: '—', color: 'green' },
  { date: 'Aug 19, 2025', type: 'Form 4', description: 'Aug 15 RSU Vestings: Yao (50K), Johnson (80K), Gupta (50K) — tax withhold ~$2.6M. Avellan (CEO) 500K RSU grant.', period: '—', color: 'green' },
  { date: 'Aug 11, 2025', type: '10-Q', description: 'Quarterly Report (Revenue $1.2M; Cash $939M; OpEx $74M)', period: 'Q2 2025', color: 'purple' },
  { date: 'Aug 11, 2025', type: '8-K', description: 'Q2 2025 Earnings Release + 2025 Revenue Guidance $63-71M', period: '—', color: 'yellow' },
  { date: 'Aug 7, 2025', type: '8-K', description: 'EllioSat Acquisition (S-Band spectrum/tech from CCUR Holdings; 581K Class A shares)', period: '—', color: 'yellow' },
  { date: 'Jul 31, 2025', type: '8-K', description: 'Legal Opinion (Freshfields) for Offering Shares Validity', period: '—', color: 'yellow' },
  { date: 'Jul 29, 2025', type: '8-K', description: 'Registered Direct Pricing + Q2 Preliminary Results (Exhibits: PR, slides)', period: '—', color: 'yellow' },
  { date: 'Jul 28, 2025', type: '424B5', description: 'Registered Direct Prospectus (5,775,635 shares at $60.06, ~$347M; fee $53K)', period: '—', color: 'orange' },
  { date: 'Jul 25, 2025', type: 'FWP', description: 'Pricing Term Sheet: 5,775,635 shares at $60.06 (Registered Direct for 4.25% notes repurchase)', period: '—', color: 'orange' },
  { date: 'Jul 24, 2025', type: '424B5', description: 'Preliminary Prospectus: $1B Convertibles + $46.5M 4.25% Notes Repurchase', period: '—', color: 'orange' },
  { date: 'Jul 18, 2025', type: '8-K', description: '$345M UBS Credit Facility (expandable $500M; SOFR+5%; maturity 2028)', period: '—', color: 'yellow' },
  { date: 'Jul 15, 2025', type: 'SC 13D/A', description: 'Avellan 13D/A (Amend. No. 14): 78.16M Class A equiv (~28%), no transactions in 60 days', period: '—', color: 'green' },
  { date: 'Jul 3, 2025', type: '8-K', description: 'Annual Meeting Results (Jun 27): Directors, Incentive Plan, Auditors Approved', period: '—', color: 'yellow' },
  { date: 'Jul 1, 2025', type: '8-K', description: 'Legal Opinion (Freshfields) for Share Registration', period: '—', color: 'yellow' },
  { date: 'Jun 26, 2025', type: 'Form 4', description: 'Cisneros (Dir) purchase 1K at $25; Johnson (CFO) purchase 500 at $25 — director confidence at dip', period: '—', color: 'green' },
  { date: 'Jun 9, 2025', type: '8-K', description: 'Certificate Amendment: Authorized Class A increased to 800M (+100M) for incentives/acquisitions', period: '—', color: 'yellow' },
  { date: 'Jun 9, 2025', type: 'Form 4', description: 'Cisneros (Dir) purchase 1K at $25 (trust; post: 784,077). Multiple duplicate filings.', period: '—', color: 'green' },
  { date: 'Jun 9, 2025', type: 'Form 144', description: 'Gupta (COO) proposed sale 10K at ~$25; Wisniewski (Pres) proposed sale 80K at ~$25', period: '—', color: 'green' },
  { date: 'Jun 3, 2025', type: 'Form 4', description: 'Wisniewski (Pres) 125K RSU grant (vest 1/3 annually May 30 from 2026); Gupta (COO) 50K RSU vesting (20K tax w/h at $22.50)', period: '—', color: 'green' },
  { date: 'May 19, 2025', type: 'Form 4', description: 'Yao (CTO) option exercise: 40K at $0.06 → LLC Units (May 17 transaction). Post: 240K Units', period: '—', color: 'green' },
  { date: 'May 16, 2025', type: 'Form 144', description: 'Yao (CTO) proposed sale: 40K shares (~$1M) via Fidelity. 10b5-1 plan Jun 12.', period: '—', color: 'green' },
  { date: 'May 13, 2025', type: '424B5', description: '$500M Equity Distribution Program (ATM via B. Riley et al.; fee $77K). Used ~$287M before Oct termination.', period: '—', color: 'orange' },
  { date: 'May 12, 2025', type: '10-Q', description: 'Quarterly Report (Revenue $0.7M; Cash $874.5M; OpEx $63.7M; H2 Guide $50-75M)', period: 'Q1 2025', color: 'purple' },
  { date: 'May 12, 2025', type: '8-K', description: 'Q1 2025 Earnings Release + 2025 Revenue Guidance $63-71M (adj. opex $44.9M)', period: '—', color: 'yellow' },
  { date: 'May 7, 2025', type: 'Form 4', description: 'Cisneros (Dir) purchase 1K at $25 (trust; post: 783,327). Multiple duplicate filings + Form 4/A amendment.', period: '—', color: 'green' },
  { date: 'Apr 28, 2025', type: 'SC 13G/A', description: 'BlackRock 5.2% Ownership (14.86M shares as of 3/31/2025). Sole voting/dispositive.', period: '—', color: 'green' },
  { date: 'Apr 25, 2025', type: 'DEF 14A', description: 'Definitive Proxy: Annual Meeting Jun 6 — directors, 2024 incentive plan (5.4M shares), auditors. CEO $1M salary + equity.', period: '—', color: 'green' },
  { date: 'Apr 25, 2025', type: 'ARS', description: '2024 Annual Report to Security Holders (incorporates 10-K; CEO letter on launches/partnerships)', period: 'FY 2024', color: 'blue' },
  { date: 'Apr 14, 2025', type: 'PRE 14A', description: 'Preliminary Proxy Statement (draft; same proposals as DEF 14A)', period: '—', color: 'green' },
  { date: 'Apr 4, 2025', type: 'Form 4', description: 'Cisneros (Dir) purchase 1K at $25 (trust; post: 782,327); Johnson (CFO) purchase 500 at $25 (IRA; Form 4/A Apr 9)', period: '—', color: 'green' },
  { date: 'Mar 24, 2025', type: '8-K', description: 'Ligado Material Agreement ($150M initial + 9.99% warrants; $550M total; 45 MHz L-band spectrum)', period: '—', color: 'yellow' },
  { date: 'Mar 24, 2025', type: 'Form 4', description: 'Bernal (CAO) 3,244 shares withheld at $25.71 (RSU tax; net 9,256 vested)', period: '—', color: 'green' },
  { date: 'Mar 17-18, 2025', type: 'Form 4', description: 'Wisniewski (Pres) 23,643 w/h + 35,871 sold at $28.35; Gupta (COO) 24,425 sold at $28 — RSU vesting sales', period: '—', color: 'green' },
  { date: 'Mar 17, 2025', type: 'S-3ASR', description: 'Automatic Shelf: 56M shares for resale (28.5M Rakuten reorg + others; ~25% dilution potential)', period: '—', color: 'green' },
  { date: 'Mar 12, 2025', type: 'SC 13D/A', description: 'Vodafone 6% Ownership (14.5M shares: 1M Class A + 4.47M convert + 9.04M Units/Class B). No change.', period: '—', color: 'green' },
  { date: 'Mar 10-11, 2025', type: 'Form 4', description: 'Torres (Dir) 20K sold at $30.73; Rubin (Dir) 7K sold at $32.46 — RSU tax withholding sales at post-earnings highs', period: '—', color: 'green' },
  { date: 'Mar 5, 2025', type: 'S-8', description: '2M shares registered under 2024 Incentive Plan (annual increase; $52.6M aggregate at $26.29)', period: '—', color: 'green' },
  { date: 'Mar 3, 2025', type: '10-K', description: 'Annual Report', period: 'FY 2024', color: 'blue' },
  { date: 'Feb 28, 2025', type: 'Form 3', description: 'Larson (Dir) Initial Ownership: Zero shares. Board appointment effective Jan 31.', period: '—', color: 'green' },
  { date: 'Feb 27, 2025', type: '8-K', description: 'Q4 2024 Earnings Release', period: '—', color: 'yellow' },
  { date: 'Feb 27, 2025', type: 'Form 4', description: 'Bernal (CAO) 50K RSU grant (vest Feb 15, 2026). ~$1.5M value at $30/share.', period: '—', color: 'green' },
  { date: 'Feb 10, 2025', type: 'SC 13D', description: 'AT&T 2.7% Ownership (6.26M shares via AT&T Venture Investments; from $100M convertible at $16/share)', period: '—', color: 'green' },
  { date: 'Feb 7, 2025', type: '8-K', description: 'Stockholders\' Agreement Amendment: Adds AT&T as party; board designee rights if >10% stake', period: '—', color: 'yellow' },
  { date: 'Feb 3, 2025', type: '8-K', description: 'Johnson (CFO/CLO) Appointed to Board (Class II director, term to 2025)', period: '—', color: 'yellow' },
  { date: 'Jan 31, 2025', type: '8-K', description: '2025 Annual Meeting Notice: May 6 (later moved to Jun 6); proposal deadline Feb 14', period: '—', color: 'yellow' },
  { date: 'Jan 27, 2025', type: 'SC 13D/A', description: 'Avellan 25% (78.16M shares; Amendment 12). No sales. Update for outstanding changes.', period: '—', color: 'green' },
  { date: 'Jan 22, 2025', type: '8-K', description: 'Preliminary Q4 2024: Revenue $1M (first ever), net loss $61.7M, cash $285M, adj. opex $40.8M', period: '—', color: 'yellow' },
  { date: 'Jan 6, 2025', type: '8-K', description: 'Ligado RSA ($150M investment + 9.99% warrants; $550M spectrum deal; 45 MHz L-band US/Canada)', period: '—', color: 'yellow' },
  { date: 'Nov 6, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2024', color: 'purple' },
  { date: 'Sep 12, 2024', type: '8-K', description: 'BB1-5 Commercial Launch', period: '—', color: 'yellow' },
  { date: 'Aug 7, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q2 2024', color: 'purple' },
  { date: 'May 10, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q1 2024', color: 'purple' },
  { date: 'Apr 16, 2024', type: 'S-3', description: '$500M ATM Shelf', period: '—', color: 'green' },
  { date: 'Mar 28, 2024', type: '10-K', description: 'Annual Report', period: 'FY 2023', color: 'blue' },
];

// [PR_CHECKLIST_SECMETA] - MANDATORY: Update lastPR + totalFilingsTracked with every PR!
export const ASTS_SEC_META = {
  cik: '0001780312',
  secFileNumber: '001-39040',
  ein: '84-2027232',
  ticker: 'ASTS',
  exchange: 'NASDAQ',
  emergingGrowthCompany: false,
  lastPR: { date: 'February 12, 2026', title: 'Pricing of $1B Convertible Notes + Registered Direct Offerings' },
  totalFilingsTracked: 76
};

// Color palette constants (reduce duplication per Gemini review)
const C_BLUE   = { bg: 'rgba(59,130,246,0.2)',  text: '#60a5fa' };
const C_VIOLET = { bg: 'rgba(168,85,247,0.2)',  text: 'var(--violet)' };
const C_GOLD   = { bg: 'rgba(234,179,8,0.2)',   text: 'var(--gold)' };
const C_GREEN  = { bg: 'rgba(34,197,94,0.2)',   text: '#4ade80' };
const C_ORANGE = { bg: 'rgba(249,115,22,0.2)',  text: '#fb923c' };

export const ASTS_SEC_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': C_BLUE, 'ARS': C_BLUE,
  '10-Q': C_VIOLET, '10-Q/A': C_VIOLET, 'S-1': C_VIOLET,
  '8-K': C_GOLD,
  'S-3': C_GREEN, 'S-3ASR': C_GREEN, 'S-8': C_GREEN,
  '424B5': C_ORANGE, '424B7': C_ORANGE, 'FWP': C_ORANGE,
  'SC 13G': C_GREEN, 'SC 13D': C_GREEN, 'SC 13D/A': C_GREEN,
  'DEF 14A': C_GREEN, 'PRE 14A': C_GREEN, 'DEFA14A': C_GREEN,
  'Form 3': C_GREEN, 'Form 4': C_GREEN,
  'Form 144': C_GREEN, 'Form 144/A': C_GREEN,
};

export const ASTS_SEC_FILTER_TYPES = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B5', 'Other'];

/**
 * Cross-reference index: maps filing key (FORM|YYYY-MM-DD) to actual data
 * captured from that filing in other data files.
 *
 * AI AGENT INSTRUCTIONS:
 * When ingesting a new filing, add a cross-ref entry here with the actual
 * data lines that were written to other files (capital, financials, timeline, catalysts).
 * Key format: "FORM_TYPE|YYYY-MM-DD" using the filing date from sec-filings.ts.
 */
export const ASTS_FILING_CROSS_REFS: Record<string, { source: string; data: string }[]> = {

  // ── Feb 2026 ──────────────────────────────────────────────────────────────
  '8-K|2026-02-17': [
    { source: 'capital', data: "$1B 2.25% notes settled Feb 17. Indenture with U.S. Bank Trust. Net proceeds ~$983.7M." },
    { source: 'capital', data: "Conversion rate: 8.5982 shares/$1K (~$116.30). Max shares on conversion: 11.87M (incl. greenshoe at max rate 10.3177)." },
    { source: 'timeline', data: "Convertible Notes Indenture completed — $1B 2.25% due 2036. Item 1.01 Material Definitive Agreement." },
  ],
  'SC 13D/A|2026-02-17': [
    { source: 'capital', data: "Vodafone: 14,516,197 shares (5,471,743 Class A + 9,044,454 LLC Units). 5% ownership. Dropped below 5% threshold due to dilution — no sales." },
  ],
  'Form 4|2026-02-17': [
    { source: 'capital', data: "Bernal (CAO): 3K RSUs vested Feb 15, 833 withheld for tax at $82.51. Net 2,167 shares. Post: 121,653 Class A." },
  ],
  '8-K|2026-02-11': [
    { source: 'capital', data: "$1B converts at 2.25% due 2036. UBS lead. $150M greenshoe." },
    { source: 'capital', data: "Registered Direct #1: 1.86M shares @ $96.92 → ~$180.5M" },
    { source: 'capital', data: "Registered Direct #2: 4.48M shares @ $96.92 → ~$433.7M" },
    { source: 'financials', data: "Q4 2025: cashAndEquiv: 2780, totalDebt: 2264, revenue: 50 (preliminary)" },
    { source: 'catalysts', data: "$1B 2.25% Convertible Notes + $614M Registered Directs" },
  ],
  '424B5|2026-02-13': [
    { source: 'capital', data: "Registered Direct #1: 1.86M shares at $96.92" },
    { source: 'capital', data: "Registered Direct #2: 4.48M shares at $96.92" },
  ],

  // ── Jan 2026 ──────────────────────────────────────────────────────────────
  'SC 13G|2026-01-30': [
    { source: 'capital', data: "Vanguard Group: 21.5M shares, 7.68% of Class A (as of 12/31/2025)" },
  ],
  'Form 4|2026-01-26': [
    { source: 'capital', data: "Gupta (COO) holdings correction — RSU vesting amendment" },
  ],
  '8-K|2026-01-16': [
    { source: 'timeline', data: "Mikitani resigned from Board (Rakuten designee); board reduced to 11" },
    { source: 'catalysts', data: "MDA SHIELD Prime Contract Award (same date)" },
  ],

  // ── Dec 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-12-24': [
    { source: 'catalysts', data: "BB6 Launched (ISRO) — first Block 2 satellite" },
    { source: 'company', data: "block2Sats: 1 (BB6 launched Dec 23, 2025)" },
  ],
  'SC 13D/A|2025-12-11': [
    { source: 'capital', data: "American Tower: sold 2.29M shares at $69.75 ($159.8M)" },
  ],
  'Form 4|2025-12-10': [
    { source: 'capital', data: "Gupta (COO): 10K sold at $77.34; Larson (Dir): 675 purchased at $72.71" },
  ],
  'Form 4|2025-12-05': [
    { source: 'capital', data: "Bernal (CAO): 6K sold at $73.76; Yao (CTO): 40K at $73.52 ($2.94M)" },
  ],
  'Form 4|2025-12-02': [
    { source: 'capital', data: "RSU Grants: Avellan 250K, Johnson 125K, Wisniewski 125K — vest 1/3 annually" },
  ],

  // ── Nov 2025 ──────────────────────────────────────────────────────────────
  '10-Q|2025-11-10': [
    { source: 'financials', data: "Q3 2025: cashAndEquiv: 1220.1, totalDebt: 697.6, revenue: 14.7" },
  ],
  '8-K|2025-11-03': [
    { source: 'capital', data: "UBS loan: $420M cash-collateralized for Ligado" },
    { source: 'timeline', data: "UBS $420M term loan for Ligado $420M first payment" },
  ],

  // ── Oct 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-10-29': [
    { source: 'timeline', data: "BlueBird Block 2 Contract (~$100M initial)" },
    { source: 'catalysts', data: "Block 2 Contract (~$100M initial)" },
  ],
  'DEF 14A|2025-10-28': [
    { source: 'timeline', data: "Special meeting: Amended 2024 Plan +10M shares" },
  ],
  '424B5|2025-10-23': [
    { source: 'capital', data: "Oct 2025 ATM Program: $800M capacity via B. Riley, Barclays" },
  ],
  '8-K|2025-10-21': [
    { source: 'capital', data: "2.05M shares at $78.61 → ~$161M" },
    { source: 'catalysts', data: "$800M ATM Program + $161M Registered Direct" },
  ],

  // ── Sep 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-09-05': [
    { source: 'timeline', data: "Mikitani resigned from Board (personal; no disagreement)" },
  ],
  'Form 4|2025-09-03': [
    { source: 'capital', data: "Yao (CTO): 40K sold at $41.58 ($1.66M)" },
  ],

  // ── Aug 2025 ──────────────────────────────────────────────────────────────
  'Form 4|2025-08-19': [
    { source: 'capital', data: "Aug 15 RSU vestings: Yao 50K, Johnson 80K, Gupta 50K. Avellan 500K RSU grant." },
  ],
  '10-Q|2025-08-11': [
    { source: 'financials', data: "Q2 2025: cashAndEquiv: 939.4, totalDebt: 482.5, revenue: 1.2" },
  ],
  '8-K|2025-08-11': [
    { source: 'catalysts', data: "2025 Revenue Guidance $63-71M" },
  ],
  '8-K|2025-08-07': [
    { source: 'catalysts', data: "EllioSat Acquired (S-Band spectrum; 581K shares)" },
    { source: 'timeline', data: "60 MHz S-Band (EllioSat) acquisition closed" },
  ],

  // ── Jul 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-07-29': [
    { source: 'timeline', data: "July 2025 Registered Direct ($347M, 5.78M shares at $60.06)" },
  ],
  '424B5|2025-07-28': [
    { source: 'capital', data: "5.78M shares at $60.06, ~$347M" },
  ],
  'FWP|2025-07-25': [
    { source: 'capital', data: "Pricing Term Sheet: 5.78M shares at $60.06" },
  ],
  '424B5|2025-07-24': [
    { source: 'capital', data: "$575M 2.375% convertible notes, $120.12 capped call strike" },
  ],
  '8-K|2025-07-18': [
    { source: 'capital', data: "$345M UBS Credit Facility (expandable $500M; SOFR+5%)" },
    { source: 'catalysts', data: "$345M UBS Credit Facility" },
  ],
  'SC 13D/A|2025-07-15': [
    { source: 'capital', data: "Avellan: 78.16M Class A equiv (~28%)" },
  ],

  // ── Jun 2025 ──────────────────────────────────────────────────────────────
  'Form 4|2025-06-26': [
    { source: 'capital', data: "Cisneros 1K at $25; Johnson 500 at $25 — director confidence at dip" },
  ],
  '8-K|2025-06-09': [
    { source: 'capital', data: "Class A authorized increased from 700M to 800M" },
  ],

  // ── May 2025 ──────────────────────────────────────────────────────────────
  '424B5|2025-05-13': [
    { source: 'capital', data: "$500M Equity Distribution Program (ATM via B. Riley)" },
  ],
  '10-Q|2025-05-12': [
    { source: 'financials', data: "Q1 2025: cashAndEquiv: 874.5, revenue: 0.7, opEx: 63.7" },
  ],
  '8-K|2025-05-12': [
    { source: 'catalysts', data: "Q1 2025: Revenue $0.7M, H2 Guidance $50-75M" },
  ],

  // ── Apr 2025 ──────────────────────────────────────────────────────────────
  'SC 13G/A|2025-04-28': [
    { source: 'capital', data: "BlackRock: 14.86M shares, 5.2% ownership" },
  ],
  'DEF 14A|2025-04-25': [
    { source: 'capital', data: "Annual Meeting Jun 6; 2024 Incentive Plan (5.4M shares)" },
  ],

  // ── Mar 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-03-24': [
    { source: 'capital', data: "Ligado Deal: $150M initial + 9.99% warrants, $80M annual lease, 45 MHz L-band" },
    { source: 'catalysts', data: "Ligado Material Agreement ($550M total)" },
  ],
  'S-3ASR|2025-03-17': [
    { source: 'capital', data: "56M shares registered for resale (~25% dilution potential)" },
  ],
  'SC 13D/A|2025-03-12': [
    { source: 'capital', data: "Vodafone: 14.5M shares (6% ownership)" },
  ],
  '10-K|2025-03-03': [
    { source: 'financials', data: "Q4 2024: cashAndEquiv: 567.5; FY 2024: Revenue $4.4M, OpEx $247.2M" },
  ],

  // ── Feb 2025 ──────────────────────────────────────────────────────────────
  'Form 3|2025-02-28': [
    { source: 'capital', data: "Larson (Dir): initial ownership zero shares" },
  ],
  '8-K|2025-02-27': [
    { source: 'timeline', data: "Q4 2024 Earnings: Revenue $1.9M, net loss $61.7M, cash $285M" },
  ],
  'SC 13D|2025-02-10': [
    { source: 'capital', data: "AT&T: 6.26M shares (2.7%) from $100M convertible at $16/share" },
  ],

  // ── Jan 2025 ──────────────────────────────────────────────────────────────
  'SC 13D/A|2025-01-27': [
    { source: 'capital', data: "Avellan: 78.16M shares (25%; Amendment 12)" },
  ],
  '8-K|2025-01-22': [
    { source: 'timeline', data: "Preliminary Q4 2024: Revenue $1M (first ever), cash $285M" },
  ],
  '8-K|2025-01-06': [
    { source: 'capital', data: "Ligado RSA: $150M + 9.99% warrants; $550M total; 45 MHz L-band" },
    { source: 'catalysts', data: "Ligado RSA signed" },
  ],

  // ── 2024 ──────────────────────────────────────────────────────────────────
  '10-Q|2024-11-06': [
    { source: 'financials', data: "Q3 2024 per 10-Q. Block 1 operational." },
  ],
  '8-K|2024-09-12': [
    { source: 'catalysts', data: "BB1-5 Launched (SpaceX)" },
  ],
  '10-K|2024-03-28': [
    { source: 'financials', data: "FY 2023: OpEx $60.9M/quarter, net loss $87.5M, cash $85.6M" },
  ],
};
