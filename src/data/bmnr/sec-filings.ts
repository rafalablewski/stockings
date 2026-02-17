/**
 * BMNR SEC Filings Data
 * Extracted from BMNR.tsx for maintainability.
 * Update when new filings are processed.
 *
 * COVERAGE: Oct 2020 (Form 10-12G shell registration) through Feb 2026
 * TOTAL FILINGS TRACKED: 108
 */

export const BMNR_SEC_FILINGS = [
  // === 2026 ===
  { date: 'Feb 11, 2026', type: '8-K', description: 'CoinDesk Consensus 2026 Presentation (Tom Lee, Chairman)', period: '—', color: 'yellow' },
  { date: 'Feb 9, 2026', type: 'S-8', description: '2025 Omnibus Incentive Plan Registration', period: '—', color: 'cyan' },
  { date: 'Feb 9, 2026', type: '8-K', description: '4.326M ETH Holdings Update ($10.0B Total)', period: '—', color: 'yellow' },
  { date: 'Jan 28, 2026', type: '8-K', description: 'Nelson Separation Agreement (President Terminated Without Cause)', period: '—', color: 'yellow' },
  { date: 'Jan 15, 2026', type: '8-K', description: '2026 Annual Stockholder Meeting + Investor Presentation', period: '—', color: 'yellow' },
  { date: 'Jan 13, 2026', type: '10-Q', description: 'Quarterly Report (Q1 FY2026) - First Staking Revenue', period: 'Q1 2026', color: 'purple' },
  { date: 'Jan 2, 2026', type: 'DEFA14A', description: 'Proxy Solicitation - Chairman\'s Message', period: '—', color: 'cyan' },
  { date: 'Jan 2, 2026', type: '8-K', description: 'Vote YES on Auth Shares (500M→50B)', period: '—', color: 'yellow' },
  // === 2025 (POST-IPO: ETH TREASURY ERA) ===
  // --- December 2025: Proxy, Governance, Beast Investment ---
  { date: 'Dec 29, 2025', type: '8-K', description: 'Annual Meeting Results — All Proposals Approved', period: '—', color: 'yellow' },
  { date: 'Dec 22, 2025', type: '8-K', description: 'Beast Industries $200M Equity Investment (MrBeast)', period: '—', color: 'yellow' },
  { date: 'Dec 18, 2025', type: '8-K', description: 'CFO Raymond Mow Separation + Young Kim Appointed CFO/COO', period: '—', color: 'yellow' },
  { date: 'Dec 16, 2025', type: 'DEFR14A', description: 'Revised Proxy Statement — 50B Authorized Shares Amendment', period: '—', color: 'cyan' },
  { date: 'Dec 12, 2025', type: '8-K', description: 'Raymond Mow Board Resignation (No Disagreements)', period: '—', color: 'yellow' },
  { date: 'Dec 10, 2025', type: 'DEFA14A', description: 'Proxy Solicitation — Chairman Message + Vote Reminder', period: '—', color: 'cyan' },
  { date: 'Dec 8, 2025', type: 'DEF 14A', description: 'Definitive Proxy (Annual Meeting Jan 15; 50B Auth Shares)', period: '—', color: 'cyan' },
  { date: 'Dec 5, 2025', type: 'Form 4', description: 'Bates: ~1.5M Shares Sold ($37.5M, Rule 10b5-1)', period: '—', color: 'green' },
  { date: 'Dec 3, 2025', type: 'Form 4', description: 'Mow: ~500K Shares Sold ($12.5M)', period: '—', color: 'green' },
  { date: 'Dec 1, 2025', type: 'Form 4', description: 'Bayles: ~350K Shares Sold ($8.75M)', period: '—', color: 'green' },
  // --- November 2025: Earnings, CEO Change, Dividend ---
  { date: 'Nov 24, 2025', type: '8-K', description: 'First Quarterly Dividend: $0.01/Share (Ex-Div Dec 5)', period: '—', color: 'yellow' },
  { date: 'Nov 21, 2025', type: '10-K', description: 'Annual Report FY2025 — GAAP EPS $13.39, First Profitable Year', period: 'FY 2025', color: 'blue' },
  { date: 'Nov 14, 2025', type: '8-K', description: 'CEO Change: Chi Tsang Appointed + Edgeworth/Howe/Sechan Join Board', period: '—', color: 'yellow' },
  { date: 'Nov 11, 2025', type: '8-K', description: 'Board Restructuring: Bayles/Kelly/Nelson Out, 3 New Directors In', period: '—', color: 'yellow' },
  // --- October 2025: Thiel, Proxy Filing, Insider Pledge ---
  { date: 'Oct 28, 2025', type: 'SC 13G/A', description: 'Founders Fund (Peter Thiel): Amended to 5.1% Ownership', period: '—', color: 'green' },
  { date: 'Oct 22, 2025', type: 'PRE 14A', description: 'Preliminary Proxy — 50B Auth Shares + Director Election', period: '—', color: 'cyan' },
  { date: 'Oct 6, 2025', type: 'Form 4', description: 'Bates: ~800K Shares Pledged to UBS as Collateral', period: '—', color: 'green' },
  // --- September 2025: Xuan Yong, Employment, $365M Raise ---
  { date: 'Sep 30, 2025', type: 'SC 13D', description: 'Xuan Yong Xiao: 7.5% Beneficial Ownership (28.97M Shares)', period: '—', color: 'green' },
  { date: 'Sep 22, 2025', type: '424B5', description: '$365M Registered Direct @ $70 + Warrants ($1.28B Potential)', period: '—', color: 'orange' },
  { date: 'Sep 1, 2025', type: '8-K', description: 'Employment Agreements: Bates $3.04M/yr, Mow $1.02M/yr, Nelson $406K/yr', period: '—', color: 'yellow' },
  // --- August 2025: ATM Expansion, Sharbutt Director ---
  { date: 'Aug 25, 2025', type: '8-K', description: 'Director David Sharbutt Appointed (American Tower Board Veteran)', period: '—', color: 'yellow' },
  { date: 'Aug 12, 2025', type: '424B5', description: '$24.5B ATM+ Shelf Registration (Post-$4.5B Exhaustion)', period: '—', color: 'orange' },
  // --- July 2025: PIPE, ATM Launch, ARK, Ethereum Tower ---
  { date: 'Jul 28, 2025', type: 'S-3ASR', description: '$4.5B ATM+ Expansion + PIPE Resale (56.12M Shares)', period: '—', color: 'green' },
  { date: 'Jul 22, 2025', type: '8-K', description: 'ARK Invest (Cathie Wood) $182M Block Trade (4.77M Shares)', period: '—', color: 'yellow' },
  { date: 'Jul 9, 2025', type: 'S-3', description: '$2B ATM Shelf Registration (Cantor + ThinkEquity)', period: '—', color: 'green' },
  { date: 'Jul 8, 2025', type: '8-K', description: 'Ethereum Tower LLC Treasury Advisory Agreement (10-Year Term)', period: '—', color: 'yellow' },
  { date: 'Jul 3, 2025', type: '10-Q', description: 'Quarterly Report (Q3 FY2025)', period: 'Q3 2025', color: 'purple' },
  { date: 'Jul 2, 2025', type: '8-K', description: 'IPO Overallotment Exercised (+337,500 Shares @ $7.40)', period: '—', color: 'yellow' },
  { date: 'Jun 30, 2025', type: '8-K', description: 'ETH Treasury Strategy — Private Placement + PIPE Launch', period: '—', color: 'yellow' },
  { date: 'Jun 20, 2025', type: 'S-8', description: '2025 Equity Incentive Plan (3.75M shares)', period: '—', color: 'cyan' },
  { date: 'Jun 6, 2025', type: '8-K', description: 'Public Offering Closes — $18M IPO @ $8/Share', period: '—', color: 'yellow' },
  { date: 'Jun 5, 2025', type: '8-K', description: 'NYSE American Trading Commences (From OTCQX)', period: '—', color: 'yellow' },
  { date: 'Jun 4, 2025', type: '424B4', description: 'IPO Final Prospectus — 2,250,000 Shares @ $8.00', period: '—', color: 'orange' },
  { date: 'Jun 2, 2025', type: '8-K', description: 'NYSE American Listing Approved', period: '—', color: 'yellow' },
  // --- Pre-IPO 2025: S-1 Review + Capital Raises ---
  { date: 'May 27, 2025', type: 'S-1', description: 'IPO Registration Statement Filed', period: '—', color: 'violet' },
  { date: 'Apr 14, 2025', type: '10-Q', description: 'Quarterly Report (Q2 FY2025)', period: 'Q2 2025', color: 'purple' },
  { date: 'Mar 14, 2025', type: 'Form D', description: 'Pre-IPO Exempt Offering $1.5M (Rule 506(b))', period: '—', color: 'green' },
  { date: 'Feb 7, 2025', type: 'CORRESP', description: 'S-1 Review: SEC Comment Round on Risk Factors + Crypto Disclosures', period: '—', color: 'cyan' },
  { date: 'Jan 10, 2025', type: '10-K', description: 'Annual Report FY2024 (Delayed — Post-Auditor Transition)', period: 'FY 2024', color: 'blue' },
  // === 2024 (PRE-IPO: SEC SCRUTINY + AUDITOR CRISIS + CRYPTO TREASURY) ===
  { date: 'Nov 29, 2024', type: 'NT 10-K', description: 'FY2024 10-K Extension (Auditor Transition Post-BF Borgers Ban)', period: '—', color: 'yellow' },
  { date: 'Nov 13, 2024', type: 'CORRESP', description: 'SEC Comment Letter: Breakeven Draft with Miner Financing Costs; Clarify Footnotes', period: '—', color: 'cyan' },
  { date: 'Oct 15, 2024', type: '8-K', description: 'ETH Purchase Agreement', period: '—', color: 'yellow' },
  { date: 'Oct 4, 2024', type: 'CORRESP', description: 'Response to SEC: Breakeven Draft, Pool Details, Impairment Policy (Lowest Intraday)', period: '—', color: 'cyan' },
  { date: 'Sep 20, 2024', type: '8-K', description: 'BTC Sales for Operations (~$0.5M Proceeds)', period: '—', color: 'yellow' },
  { date: 'Aug 15, 2024', type: '8-K', description: 'ETH Staking Agreement (Projected 4-5% Yields)', period: '—', color: 'yellow' },
  { date: 'Jul 10, 2024', type: '8-K', description: 'BTC Purchase ($0.3M)', period: '—', color: 'yellow' },
  { date: 'Jul 8, 2024', type: 'CORRESP', description: 'SEC Comment Letter: BF Borgers Ban; New Auditor Required; Breakeven, Revenue, Impairment', period: '—', color: 'cyan' },
  { date: 'Jun 5, 2024', type: '8-K', description: 'Auditor Change Announcement (Replacement for Banned BF Borgers)', period: '—', color: 'yellow' },
  { date: 'May 31, 2024', type: '10-Q', description: 'Quarterly Report (Revenue $1.0M; Loss $1.2M)', period: 'Q3 2024', color: 'purple' },
  { date: 'May 1, 2024', type: '8-K', description: 'BF Borgers Auditor Resignation (SEC-Mandated Ban)', period: '—', color: 'yellow' },
  { date: 'Apr 15, 2024', type: 'CORRESP', description: 'Response to SEC: Pool Details, Breakeven Analysis, Halving Impact Drafts', period: '—', color: 'cyan' },
  { date: 'Apr 10, 2024', type: '8-K', description: 'ETH Sales ($0.2M)', period: '—', color: 'yellow' },
  { date: 'Mar 15, 2024', type: '8-K', description: 'BTC/ETH Purchase ($0.4M)', period: '—', color: 'yellow' },
  { date: 'Mar 1, 2024', type: 'CORRESP', description: 'SEC Comment Letter: Pool Hash %, Immersion Use, Breakeven, Security Ownership Errors', period: '—', color: 'cyan' },
  { date: 'Feb 28, 2024', type: '10-Q', description: 'Quarterly Report (Revenue $1.2M; Loss $1.1M)', period: 'Q2 2024', color: 'purple' },
  { date: 'Jan 12, 2024', type: 'CORRESP', description: 'Response to SEC: Revenue Policy Revisions, Crypto Impairment ($3.5K)', period: '—', color: 'cyan' },
  // === 2023 (SEC CORRESPONDENCE + LATE FILINGS) ===
  { date: 'Dec 8, 2023', type: 'CORRESP', description: 'SEC Comment Letter: Cash Flows, Breakeven Analysis Requirements', period: '—', color: 'cyan' },
  { date: 'Nov 30, 2023', type: '10-Q', description: 'Quarterly Report (Revenue $1.1M; Loss $0.8M)', period: 'Q1 2024', color: 'purple' },
  { date: 'Nov 29, 2023', type: 'NT 10-K', description: 'FY2023 10-K Extension (Admin/Compliance Delay)', period: '—', color: 'yellow' },
  { date: 'Oct 6, 2023', type: 'CORRESP', description: 'Response to SEC: Crypto Market Disclosures, JV $1M, No FTX/Bankruptcy Exposure', period: '—', color: 'cyan' },
  { date: 'Aug 28, 2023', type: 'CORRESP', description: 'SEC Comment Letter: Initial Crypto-Focused Comments (Accounting Policies, Disclosures)', period: '—', color: 'cyan' },
  { date: 'Jun 15, 2023', type: 'RW', description: 'S-1 Registration Withdrawal (Pivoted Away from $10M Offering)', period: '—', color: 'cyan' },
  // === FY2023 (SEP 2022 - AUG 2023) ===
  { date: 'Aug 31, 2023', type: '10-K', description: 'Annual Report (Revenue $0.6M; Loss $3.3M; Assets $4M)', period: 'FY 2023', color: 'blue' },
  // === 2022 (NAME CHANGE + BTC TREASURY + FIRST REVENUES) ===
  { date: 'Nov 22, 2022', type: '8-K', description: 'Bitcoin Sales Agreement (Liquidity Management)', period: '—', color: 'yellow' },
  { date: 'Oct 24, 2022', type: '8-K', description: 'Material Agreement for Bitcoin Purchase', period: '—', color: 'yellow' },
  { date: 'Aug 31, 2022', type: '10-K', description: 'Annual Report (Revenue $428K Hosting; Loss $2.1M; Assets $4.8M)', period: 'FY 2022', color: 'blue' },
  { date: 'Aug 29, 2022', type: '8-K', description: 'Director Michael Maloney Resignation (No Disagreements)', period: '—', color: 'yellow' },
  { date: 'Aug 29, 2022', type: '8-K', description: 'Bitcoin Purchase Announcement', period: '—', color: 'yellow' },
  { date: 'Jul 15, 2022', type: 'DEF 14C', description: 'Name Change to Bitmine + Authorized Shares to 500M (Majority Consent)', period: '—', color: 'cyan' },
  { date: 'Jul 15, 2022', type: 'PRE 14C', description: 'Preliminary Info Statement: Name Change + Share Authorization', period: '—', color: 'cyan' },
  { date: 'May 31, 2022', type: 'S-1', description: 'Proposed $10M Offering for Mining Expansion (Later Withdrawn Jun 2023)', period: '—', color: 'violet' },
  { date: 'May 31, 2022', type: '10-Q', description: 'Quarterly Report (Revenue $428K Hosting Onset; Loss $2.1M)', period: 'Q3 2022', color: 'purple' },
  { date: 'Feb 28, 2022', type: '10-Q', description: 'Quarterly Report (Revenue $0; Loss $503K; Crypto $1.2M)', period: 'Q2 2022', color: 'purple' },
  // === 2021 (SHELL→MINING PIVOT + INSIDER OWNERSHIP + SEC REGISTRATION) ===
  { date: 'Nov 30, 2021', type: 'NT 10-K', description: 'FY2021 10-K Late Filing Extension (Admin Delay)', period: '—', color: 'yellow' },
  { date: 'Nov 30, 2021', type: '10-Q', description: 'Quarterly Report (Revenue $0; Loss $154K; Assets $4.8M Equipment/Crypto)', period: 'Q1 2022', color: 'purple' },
  { date: 'Nov 15, 2021', type: 'NT 10-Q', description: 'Q1 FY2022 Late Filing Extension', period: '—', color: 'yellow' },
  { date: 'Oct 29, 2021', type: '8-K/A', description: 'Amendment: Shell Status Financials Update (Event Sep 29)', period: '—', color: 'yellow' },
  { date: 'Sep 1, 2021', type: 'SC 13D', description: 'Michael Maloney: 1.5M Shares (12.5%) — Largest Early Holder, Sole Power', period: '—', color: 'green' },
  { date: 'Aug 31, 2021', type: '10-K', description: 'Annual Report (Revenue $0; Loss $154K; Mining Pivot Described)', period: 'FY 2021', color: 'blue' },
  { date: 'Aug 19, 2021', type: 'SC 13D', description: 'Abed Equities: 1M Shares (9.3%) — Passive Investment (Signed J.H. Heyns)', period: '—', color: 'green' },
  { date: 'Aug 13, 2021', type: '8-K/A', description: 'Amendment to Apr 27 8-K (Early Corporate Change)', period: '—', color: 'yellow' },
  { date: 'Aug 10, 2021', type: 'SC 13D', description: 'Samuel P. Jorgensen: 1M Shares (~9%) — Passive Investment', period: '—', color: 'green' },
  { date: 'Aug 6, 2021', type: 'SC 13D', description: 'Ryan Ramnath: Via Bitflair Mining Corp (>5%) — Mining Expertise, CEO of Bitflair', period: '—', color: 'green' },
  { date: 'Aug 6, 2021', type: 'Form 3', description: 'Ryan Ramnath Initial Ownership (Indirect via Bitflair Mining Corp)', period: '—', color: 'green' },
  { date: 'Aug 5, 2021', type: 'Form 3', description: 'Michael Maloney Initial Ownership (No Direct Securities; Pre-13D)', period: '—', color: 'green' },
  { date: 'Aug 4, 2021', type: 'Form D/A', description: 'Amended Exempt Offering: $1.05M Total Raised (Rule 506(b))', period: '—', color: 'green' },
  { date: 'Aug 3, 2021', type: 'SC 13D', description: 'Jonathan R. Bates: Via Innovative Digital Investors LP + BFAM Partners (>5%)', period: '—', color: 'green' },
  { date: 'Aug 1, 2021', type: 'Form 3', description: 'Jonathan R. Bates Initial Ownership (Indirect via LP/LLC Entities)', period: '—', color: 'green' },
  { date: 'Jul 30, 2021', type: 'Form 3', description: 'Seth A. Bayles Initial Ownership (No Securities; Officer/Director)', period: '—', color: 'green' },
  { date: 'Jul 28, 2021', type: 'Form 3', description: 'Raymond Mow Initial Ownership (No Securities; Board Addition)', period: '—', color: 'green' },
  { date: 'Jul 27, 2021', type: '8-K', description: 'Corporate Governance Change (Event Jun 24; Signed Erik S. Nelson, CEO)', period: '—', color: 'yellow' },
  { date: 'May 31, 2021', type: '10-Q', description: 'Quarterly Report (Revenue $0; Loss ~$100K; Shell Status)', period: 'Q3 2021', color: 'purple' },
  { date: 'May 15, 2021', type: 'NT 10-Q', description: 'Late Q3 FY2021 Filing (Administrative Delay)', period: '—', color: 'yellow' },
  { date: 'Apr 4, 2021', type: 'Form D', description: 'Exempt Offering: $1.05M Target (Rule 506(b) Exemption)', period: '—', color: 'green' },
  { date: 'Mar 23, 2021', type: 'CORRESP', description: 'SEC Review Completed — Registration Cleared', period: '—', color: 'cyan' },
  { date: 'Feb 28, 2021', type: '10-Q', description: 'Quarterly Report (Revenue $0; Loss ~$50K; Shell Company)', period: 'Q2 2021', color: 'purple' },
  { date: 'Feb 8, 2021', type: 'CORRESP', description: 'Response to SEC: Inception July 16, 2020 Post-Merger; No Prior Operations', period: '—', color: 'cyan' },
  { date: 'Jan 27, 2021', type: 'CORRESP', description: 'Response to SEC: No Ops/Assets in Merged Entities; $50K Promissory Note Confirmed', period: '—', color: 'cyan' },
  { date: 'Jan 11, 2021', type: 'CORRESP', description: 'SEC Comment Letter Follow-Up (ASC 805-50-45, Common Control Accounting)', period: '—', color: 'cyan' },
  // === 2020 (SHELL COMPANY REGISTRATION) ===
  { date: 'Dec 17, 2020', type: 'CORRESP', description: 'Response to SEC: Reorganization as Continuation; No Assets/Liabilities Transferred', period: '—', color: 'cyan' },
  { date: 'Nov 23, 2020', type: 'CORRESP', description: 'SEC Comment Letter on Reorganization Accounting (ASC 250-10/805-50)', period: '—', color: 'cyan' },
  { date: 'Oct 27, 2020', type: '10-12G', description: 'SEC Registration Statement (Sandy Springs Holdings; Shell Status; 2.8M Shares; $50K Note)', period: '—', color: 'blue' },
];

// [PR_CHECKLIST_SECMETA] - Update lastPR with every PR!
export const BMNR_SEC_META = {
  cik: '0001829311',
  secFileNumber: '001-41927',
  ein: '84-3986354',
  ticker: 'BMNR',
  exchange: 'NYSE American',
  emergingGrowthCompany: false,
  lastPR: { date: 'February 11, 2026', title: 'CoinDesk Consensus 2026 Presentation (Tom Lee, Chairman)' },
  totalFilingsTracked: 108
};

// Color palette constants (reduce duplication per Gemini review)
const C_BLUE     = { bg: 'rgba(59,130,246,0.2)',  text: '#60a5fa' };
const C_SKY      = { bg: 'rgba(100,149,237,0.2)', text: 'var(--sky)' };
const C_GOLD     = { bg: 'rgba(234,179,8,0.2)',   text: 'var(--gold)' };
const C_VIOLET   = { bg: 'rgba(168,85,247,0.2)',  text: 'var(--violet)' };
const C_GREEN    = { bg: 'rgba(34,197,94,0.2)',   text: '#4ade80' };
const C_CYAN     = { bg: 'rgba(34,211,238,0.2)',  text: 'var(--cyan)' };
const C_ORANGE   = { bg: 'rgba(249,115,22,0.2)',  text: '#fb923c' };
const C_CYAN_DIM = { bg: 'rgba(34,211,238,0.15)', text: 'var(--cyan)' };
const C_GOLD_DIM = { bg: 'rgba(234,179,8,0.15)',  text: 'var(--gold)' };

export const BMNR_SEC_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': C_BLUE, '10-12G': C_BLUE,
  '10-Q': C_SKY,
  '8-K': C_GOLD, '8-K/A': C_GOLD,
  'S-1': C_VIOLET,
  'S-3': C_GREEN, 'S-3ASR': C_GREEN, 'S-8': C_CYAN,
  '424B4': C_ORANGE, '424B5': C_ORANGE,
  'DEFA14A': C_CYAN, 'DEF 14A': C_CYAN, 'DEFR14A': C_CYAN,
  'DEF 14C': C_CYAN, 'PRE 14A': C_CYAN, 'PRE 14C': C_CYAN,
  'Form 3': C_GREEN, 'Form 4': C_GREEN, 'Form 5': C_GREEN,
  'Form D': C_GREEN, 'Form D/A': C_GREEN,
  'SC 13D': C_GREEN, 'SC 13G': C_GREEN, 'SC 13G/A': C_GREEN, 'SC 13D/A': C_GREEN,
  'CORRESP': C_CYAN_DIM, 'RW': C_CYAN_DIM,
  'NT 10-K': C_GOLD_DIM, 'NT 10-Q': C_GOLD_DIM,
};

export const BMNR_SEC_FILTER_TYPES = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B', 'Form 4', 'Proxy', 'SC 13D/G', 'CORRESP', 'Other'];

/**
 * Cross-reference index: maps filing key (FORM_TYPE|YYYY-MM-DD) to actual data
 * captured from that filing in other data files (capital, timeline, catalysts).
 *
 * AI AGENT INSTRUCTIONS:
 * When ingesting a new filing, add a cross-ref entry here with the actual
 * data lines that were written to other files.
 * Key format: "FORM_TYPE|YYYY-MM-DD" using the filing date from sec-filings.ts.
 */
export const BMNR_FILING_CROSS_REFS: Record<string, { source: string; data: string }[]> = {

  // ── Feb 2026 ──────────────────────────────────────────────────────────────
  '8-K|2026-02-11': [
    { source: 'timeline', data: "Tom Lee presents at CoinDesk Consensus 2026 in Hong Kong" },
    { source: 'catalysts', data: "Tom Lee presented at CoinDesk Consensus 2026; 8-K filed with presentation as Ex. 99.1" },
  ],
  'S-8|2026-02-09': [
    { source: 'timeline', data: "S-8 filed for 2025 Omnibus Incentive Plan; signed by full board" },
    { source: 'capital', data: "2025 Omnibus Incentive Plan registered" },
  ],
  '8-K|2026-02-09': [
    { source: 'timeline', data: "ETH Holdings 4.326M ($10.0B total), ETH -62% from 2025 highs. CESR 3.11%." },
    { source: 'company', data: "ethHoldings: 4,325,738 ETH; ethPrice: $2,125; stakingAPY: 3.11%; cash: $595M" },
  ],
  '8-K|2026-01-28': [
    { source: 'timeline', data: "Erik Nelson terminated as President without cause; $605K total severance" },
    { source: 'catalysts', data: "Nelson terminated; $605K severance; non-compete waived" },
  ],
  '8-K|2026-01-15': [
    { source: 'catalysts', data: "Annual meeting: 81% YES on 50B auth shares; all proposals approved; 500K+ stockholders" },
  ],
  '10-Q|2026-01-13': [
    { source: 'catalysts', data: "Q1 FY2026: First staking revenue recognized" },
  ],

  // ── Dec 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-12-29': [
    { source: 'catalysts', data: "Annual meeting results — all proposals approved including 50B authorized shares" },
  ],
  '8-K|2025-12-22': [
    { source: 'capital', data: "Beast Industries $200M equity investment (MrBeast 460M+ YouTube subscribers)" },
    { source: 'catalysts', data: "Beast Industries $200M equity investment closed" },
    { source: 'timeline', data: "Beast Industries $200M investment; Step banking app 7M+ users" },
  ],
  '8-K|2025-12-18': [
    { source: 'capital', data: "CFO Raymond Mow separated; Young Kim appointed CFO/COO" },
    { source: 'timeline', data: "CFO transition: Mow out, Kim CFO/COO" },
  ],
  'DEFR14A|2025-12-16': [
    { source: 'catalysts', data: "Revised proxy statement — 50B authorized shares amendment" },
  ],
  '8-K|2025-12-12': [
    { source: 'timeline', data: "Raymond Mow resigned from board (no disagreements)" },
  ],
  'DEF 14A|2025-12-08': [
    { source: 'catalysts', data: "Definitive proxy: Annual meeting Jan 15; 50B auth shares; director election" },
  ],
  'Form 4|2025-12-05': [
    { source: 'capital', data: "Bates: ~1.5M shares sold ($37.5M) via Rule 10b5-1. Total Oct-Dec: ~2.8M shares, ~$70M" },
  ],
  'Form 4|2025-12-03': [
    { source: 'capital', data: "Mow: ~500K shares sold ($12.5M). Total: ~1M shares, ~$25M" },
  ],
  'Form 4|2025-12-01': [
    { source: 'capital', data: "Bayles: ~350K shares sold ($8.75M). Total: ~700K shares, ~$17M" },
  ],

  // ── Nov 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-11-24': [
    { source: 'catalysts', data: "First quarterly dividend: $0.01/share (ex-div Dec 5)" },
  ],
  '10-K|2025-11-21': [
    { source: 'company', data: "FY2025 Annual Report: GAAP EPS $13.39, first profitable year" },
    { source: 'catalysts', data: "FY2025 10-K: GAAP EPS $13.39, first profitable year" },
  ],
  '8-K|2025-11-14': [
    { source: 'catalysts', data: "CEO change: Chi Tsang appointed; Edgeworth, Howe, Sechan join board" },
    { source: 'timeline', data: "Chi Tsang appointed CEO; Board restructured with 3 new directors" },
  ],
  '8-K|2025-11-11': [
    { source: 'timeline', data: "Board restructuring: Bayles, Kelly, Nelson out; 3 new directors in" },
  ],

  // ── Oct 2025 ──────────────────────────────────────────────────────────────
  'SC 13G/A|2025-10-28': [
    { source: 'capital', data: "Founders Fund (Peter Thiel): Amended to 5.1% ownership" },
    { source: 'timeline', data: "Founders Fund (Peter Thiel) SC 13G/A: 5.1% ownership" },
  ],
  'PRE 14A|2025-10-22': [
    { source: 'catalysts', data: "Preliminary proxy — 50B auth shares + director election" },
  ],
  'Form 4|2025-10-06': [
    { source: 'capital', data: "Bates: ~800K shares pledged to UBS as collateral" },
  ],

  // ── Sep 2025 ──────────────────────────────────────────────────────────────
  'SC 13D|2025-09-30': [
    { source: 'capital', data: "Xuan Yong Xiao: 7.5% beneficial ownership (28.97M shares)" },
    { source: 'timeline', data: "Xuan Yong Xiao SC 13D: 7.5%, 28.97M shares" },
  ],
  '424B5|2025-09-22': [
    { source: 'capital', data: "$365M registered direct @ $70/share + warrants @ $87.50" },
    { source: 'catalysts', data: "$365M registered direct @ $70 (14% premium) + warrants" },
  ],
  '8-K|2025-09-01': [
    { source: 'capital', data: "Employment agreements: Bates $3.04M/yr, Mow $1.02M/yr, Nelson $406K/yr" },
  ],

  // ── Aug 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-08-25': [
    { source: 'catalysts', data: "Director David Sharbutt appointed (American Tower board veteran)" },
  ],
  '424B5|2025-08-12': [
    { source: 'capital', data: "$24.5B ATM+ shelf registration (post-$4.5B exhaustion)" },
    { source: 'catalysts', data: "$24.5B ATM+ program filed" },
  ],

  // ── Jul 2025 ──────────────────────────────────────────────────────────────
  'S-3ASR|2025-07-28': [
    { source: 'capital', data: "$4.5B ATM+ expansion + PIPE resale (56.12M shares)" },
    { source: 'catalysts', data: "$4.5B ATM+ exhausted in 5 weeks" },
  ],
  '8-K|2025-07-22': [
    { source: 'capital', data: "ARK Invest (Cathie Wood) $182M block trade; 4.77M shares" },
    { source: 'catalysts', data: "ARK Invest $182M block trade (100% proceeds to ETH)" },
    { source: 'timeline', data: "ARK Invest $182M block trade; all proceeds to ETH" },
  ],
  'S-3|2025-07-09': [
    { source: 'capital', data: "$2B ATM shelf registration (Cantor + ThinkEquity)" },
    { source: 'catalysts', data: "$250M PIPE closes; led by MOZAYYX, Founders Fund, Pantera, Kraken, Galaxy, DCG" },
  ],
  '8-K|2025-07-08': [
    { source: 'capital', data: "Ethereum Tower LLC treasury advisory agreement (10-year term)" },
    { source: 'timeline', data: "Ethereum Tower LLC advisory agreement signed" },
  ],
  '10-Q|2025-07-03': [
    { source: 'company', data: "Q3 FY2025 quarterly report" },
  ],
  '8-K|2025-07-02': [
    { source: 'capital', data: "IPO overallotment exercised: +337,500 shares @ $7.40" },
  ],

  // ── Jun 2025 ──────────────────────────────────────────────────────────────
  '8-K|2025-06-30': [
    { source: 'capital', data: "ETH Treasury Strategy announced — Private Placement + PIPE Launch" },
    { source: 'catalysts', data: "ETH Treasury Strategy pivot begins" },
  ],
  'S-8|2025-06-20': [
    { source: 'capital', data: "2025 Equity Incentive Plan: 3.75M shares registered" },
  ],
  '8-K|2025-06-06': [
    { source: 'catalysts', data: "IPO closes: $18M raised at $8/share" },
    { source: 'timeline', data: "Public offering closes — $18M IPO @ $8/share" },
  ],
  '8-K|2025-06-05': [
    { source: 'catalysts', data: "NYSE American trading commences (from OTCQX)" },
    { source: 'timeline', data: "NYSE American listing achieved" },
  ],
  '424B4|2025-06-04': [
    { source: 'capital', data: "IPO final prospectus: 2,250,000 shares @ $8.00" },
  ],
  '8-K|2025-06-02': [
    { source: 'catalysts', data: "NYSE American listing approved" },
  ],

  // ── Pre-IPO 2025 ──────────────────────────────────────────────────────────
  'S-1|2025-05-27': [
    { source: 'catalysts', data: "S-1 IPO Registration Statement filed" },
  ],
  '10-Q|2025-04-14': [
    { source: 'company', data: "Q2 FY2025 quarterly report (pre-IPO)" },
  ],
  'Form D|2025-03-14': [
    { source: 'capital', data: "Pre-IPO exempt offering $1.5M (Rule 506(b))" },
  ],
  '10-K|2025-01-10': [
    { source: 'catalysts', data: "FY2024 10-K filed (delayed; post-auditor transition)" },
  ],

  // ── 2024 ──────────────────────────────────────────────────────────────────
  'NT 10-K|2024-11-29': [
    { source: 'catalysts', data: "FY2024 10-K delayed; auditor transition after BF Borgers ban" },
  ],
  '8-K|2024-10-15': [
    { source: 'catalysts', data: "First ETH purchase agreement filed" },
    { source: 'timeline', data: "ETH Purchase Agreement — pre-IPO ETH exposure begins" },
  ],
  '8-K|2024-08-15': [
    { source: 'catalysts', data: "ETH staking agreement (projected 4-5% yields)" },
    { source: 'timeline', data: "ETH staking agreement signed" },
  ],
  '8-K|2024-06-05': [
    { source: 'catalysts', data: "New auditor appointed after BF Borgers SEC-mandated ban" },
  ],
  '10-Q|2024-05-31': [
    { source: 'company', data: "Q3 FY2024: Revenue $1.0M, Loss $1.2M" },
  ],
  '8-K|2024-05-01': [
    { source: 'catalysts', data: "BF Borgers auditor resignation (SEC-mandated ban)" },
    { source: 'timeline', data: "BF Borgers resigned as auditor (SEC banned firm)" },
  ],
  '10-Q|2024-02-28': [
    { source: 'company', data: "Q2 FY2024: Revenue $1.2M, Loss $1.1M" },
  ],

  // ── 2023 ──────────────────────────────────────────────────────────────────
  '10-K|2023-08-31': [
    { source: 'catalysts', data: "FY2023: Revenue $0.6M; Loss $3.3M; Assets $4M" },
  ],
  'RW|2023-06-15': [
    { source: 'catalysts', data: "S-1 registration withdrawn; pivoted away from $10M mining offering" },
  ],

  // ── 2022 ──────────────────────────────────────────────────────────────────
  '10-K|2022-08-31': [
    { source: 'catalysts', data: "FY2022: Revenue $428K hosting; Loss $2.1M; Assets $4.8M" },
  ],
  'DEF 14C|2022-07-15': [
    { source: 'catalysts', data: "Name changed to Bitmine + authorized shares to 500M" },
    { source: 'timeline', data: "Name changed from Sandy Springs Holdings to Bitmine Immersion Technologies" },
  ],

  // ── 2021 ──────────────────────────────────────────────────────────────────
  'SC 13D|2021-09-01': [
    { source: 'capital', data: "Michael Maloney: 1.5M shares (12.5%) — largest early holder" },
  ],
  '10-K|2021-08-31': [
    { source: 'catalysts', data: "FY2021: $0 revenues, $154K loss; mining pivot described" },
  ],
  'SC 13D|2021-08-19': [
    { source: 'capital', data: "Abed Equities: 1M shares (9.3%) — passive investment" },
  ],
  'SC 13D|2021-08-10': [
    { source: 'capital', data: "Samuel P. Jorgensen: 1M shares (~9%) — passive investment" },
  ],
  'SC 13D|2021-08-06': [
    { source: 'capital', data: "Ryan Ramnath: via Bitflair Mining Corp (>5%)" },
  ],
  'SC 13D|2021-08-03': [
    { source: 'capital', data: "Jonathan R. Bates: via Innovative Digital Investors LP + BFAM Partners (>5%)" },
  ],
  'Form 3|2021-08-06': [
    { source: 'capital', data: "Ryan Ramnath initial ownership (indirect via Bitflair Mining Corp)" },
  ],
  'Form 3|2021-08-05': [
    { source: 'capital', data: "Michael Maloney initial ownership (no direct securities)" },
  ],
  'Form D/A|2021-08-04': [
    { source: 'capital', data: "Amended exempt offering: $1.05M total raised (Rule 506(b))" },
  ],
  'Form 3|2021-08-01': [
    { source: 'capital', data: "Jonathan R. Bates initial ownership (indirect via LP/LLC entities)" },
  ],
  'Form 3|2021-07-30': [
    { source: 'capital', data: "Seth A. Bayles initial ownership (officer/director)" },
  ],
  'Form 3|2021-07-28': [
    { source: 'capital', data: "Raymond Mow initial ownership (board addition)" },
  ],
  '8-K|2021-07-27': [
    { source: 'timeline', data: "Corporate governance change (signed Erik S. Nelson, CEO)" },
  ],
  'Form D|2021-04-04': [
    { source: 'capital', data: "First capital raise: $1.05M exempt offering (Rule 506(b))" },
  ],
  'CORRESP|2021-03-23': [
    { source: 'catalysts', data: "SEC registration review completed; Form 10-12G cleared" },
  ],
  '10-12G|2020-10-27': [
    { source: 'catalysts', data: "SEC registration filed (Sandy Springs Holdings; shell; 2.8M shares)" },
  ],
};
