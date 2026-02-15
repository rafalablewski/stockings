/**
 * ASTS SPACEMOBILE - CAPITAL STRUCTURE DATA
 * ================================================
 *
 * Share classes, major shareholders, and equity offerings.
 *
 * DATA SOURCES:
 * - Share classes: 10-Q/10-K balance sheet
 * - Major shareholders: 13D/A, 13G, 13F filings, proxy (DEF 14A)
 * - Equity offerings: 8-K filings, press releases
 * - SBC: 10-Q/10-K compensation disclosures
 *
 * LAST UPDATED: 2026-02-15 (23 filings: Feb offerings + Dec insider + 13G/13D/A + Form 4s)
 * NEXT UPDATE: After Q4 2025 10-K or new proxy filing. GREENSHOE DEADLINE: Feb 20.
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 13D/A or proxy filing:
 * 1. Update SHARE_CLASSES with new share counts
 * 2. Update MAJOR_SHAREHOLDERS with ownership %
 * 3. Recalculate voting power if Class C shares change
 * 4. Add new EQUITY_OFFERINGS entries for any capital raises
 */

import type { ShareClass, MajorShareholder, EquityOffering, DataMetadata, ConvertibleNoteDetail, CashRunwayScenario, DilutionScenario } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CAPITAL_METADATA: DataMetadata = {
  lastUpdated: '2026-02-15',
  source: 'Feb 13 424B5s, Feb 11 8-K, Dec 11 13D/A (AmTower), Dec 2-24 Form 4s/144s, 13G (Vanguard), Form 4/A (Gupta), Aug-Sep 2025 Form 4s/144s/8-K/10-Q/A/424B7, Jun-Aug 2025 8-Ks/424B5s/FWP/Form 4s/13D-A/10-Q, Mar 2025 Form 4s/144/S-3ASR/S-8/13D-A/8-K',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026). GREENSHOE DEADLINE: Feb 20, 2026 ($150M convert option).',
  notes: 'Feb 15 audit: 110 filings cross-referenced (10 Jan-Feb + 13 Dec + 15 Sept-Oct + 12 Aug-Sep + 15 Jun-Aug + 15 May-Jun + 15 Apr-May + 15 Mar). Mar 2025 insider sales: ~111K shares/$3.4M (Rubin, Torres, Wisniewski, Gupta, Bernal). Ligado 8-K Mar 24: $150M initial + 9.99% warrants + $550M total. S-3ASR: 56M shares shelf. S-8: 2M incentive. Vodafone 13D/A: 6% stable.',
};

// ============================================================================
// SHARE CLASSES
// ============================================================================

/**
 * Current share class structure
 *
 * AI AGENT INSTRUCTIONS:
 * - Update shares from 10-Q balance sheet "Shares Outstanding"
 * - Class A: Common shares (NASDAQ: ASTS)
 * - Class B: Founder/insider shares, convert 1:1 to Class A
 * - Class C: Abel Avellan shares, 10x voting power
 */
export const SHARE_CLASSES: ShareClass[] = [
  {
    classType: 'Class A',
    shares: 290.4,            // ~272M (Q3 10-Q) + 2M (Oct RD) + 10.1M (ATM thru Feb 10) + 6.3M (Feb RDs)
    description: 'Public trading shares (NASDAQ: ASTS)',
    votingRights: '1 vote per share',
    conversion: 'N/A',
  },
  {
    classType: 'Class B',
    shares: 11.2,             // Founder/insider shares
    description: 'Founder/insider shares',
    votingRights: '1 vote per share',
    conversion: 'Convert 1:1 to Class A',
  },
  {
    classType: 'Class C',
    shares: 78.2,             // Abel Avellan holdings
    description: 'Abel Avellan (Founder/CEO) shares',
    votingRights: '10 votes per share',
    conversion: 'Convert 1:1 to Class A upon transfer',
  },
];

// ============================================================================
// DERIVED CALCULATIONS
// ============================================================================

/**
 * Total shares outstanding (basic)
 * Class A + Class B + Class C
 */
export const TOTAL_BASIC_SHARES = SHARE_CLASSES.reduce((sum, s) => sum + s.shares, 0);

/**
 * Total voting shares
 * Class A + Class B + (Class C × 10)
 */
export const TOTAL_VOTING_SHARES =
  SHARE_CLASSES[0].shares +
  SHARE_CLASSES[1].shares +
  (SHARE_CLASSES[2].shares * 10);

/**
 * Fully diluted share count
 * Including options, RSUs, remaining converts
 * Post-Feb 2026: 4.25% ($3.5M, ~0.1M), 2.375% ($325M, ~2.7M),
 * 2.00% ($1.15B, ~11.9M), new 2.25% ($1B, ~8.6M) = ~23.3M from converts
 * Plus RSUs/options ~12M = ~415M total
 */
export const FULLY_DILUTED_SHARES = 415.0;

/**
 * Net dilution from Feb 2026 registered directs
 * Shares issued: 6,337,964 (1,862,741 + 4,475,223)
 * Conversion shares avoided: ~3,830,682 (1,749,432 from 4.25% + 2,081,250 from 2.375%)
 * Net incremental: ~2,507,282 shares (0.9% of Class A float)
 * Note: 2.375% notes at $120.12 conversion currently OTM (stock $82.51);
 * those 2.08M shares may never have materialized regardless
 */
export const FEB_2026_RD_NET_DILUTION = {
  sharesIssued: 6.34,         // 6,337,964 total from both RDs
  conversionAvoided: 3.83,    // 1.75M (4.25% notes) + 2.08M (2.375% notes)
  netIncremental: 2.51,       // Incremental shares above avoided conversions
  netDilutionPct: 0.9,        // % of ~280M Class A pre-transaction
  annualInterestSaved: 7.92,  // $1.98M (4.25%) + $5.94M (2.375%) per year
};

/**
 * Greenshoe tracking for Feb 2026 convertible
 * $150M additional notes option for initial purchasers
 */
export const FEB_2026_GREENSHOE: {
  amount: number;
  deadline: string;
  exercised: boolean | null;
  additionalShares: number;
} = {
  amount: 150,                // $150M additional principal
  deadline: '2026-02-20',     // Exercise deadline
  exercised: null,            // null = pending; update when known
  additionalShares: 1.3,      // ~1.3M additional conversion shares if exercised
};

// ============================================================================
// MAJOR SHAREHOLDERS
// ============================================================================

/**
 * Known major shareholders from filings
 *
 * AI AGENT INSTRUCTIONS:
 * - Update from 13D/A filings (>5% holders)
 * - Update from 13F filings (institutional)
 * - Update from DEF 14A proxy (insiders)
 * - Voting % = (shares × votesPerShare) / TOTAL_VOTING_SHARES
 */
export const MAJOR_SHAREHOLDERS: MajorShareholder[] = [
  {
    name: 'Abel Avellan',
    role: 'Founder, Chairman & CEO',
    shares: 78.2,
    shareClass: 'Class C',
    pct: (78.2 / TOTAL_BASIC_SHARES * 100).toFixed(1) + '%',
    votingPct: ((78.2 * 10) / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: '10x voting power via Class C. ~65% voting control.',
  },
  {
    name: 'The Vanguard Group',
    role: 'Institutional Investor',
    shares: 21.5,
    shareClass: 'Class A',
    pct: '7.7%',
    votingPct: (21.5 / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: 'Per 13G/A filed Jan 30, 2026. 21,488,180 shares as of 12/31/2025. Shared voting: 1.8M, shared dispositive: 21.5M.',
  },
  {
    name: 'AT&T',
    role: 'Strategic Partner',
    shares: 6.5,
    shareClass: 'Class A',
    pct: (6.5 / TOTAL_BASIC_SHARES * 100).toFixed(1) + '%',
    votingPct: (6.5 / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: 'From 2034 convert + PIPE. First VoLTE partner.',
  },
  {
    name: 'Vodafone Group',
    role: 'Strategic Partner',
    shares: 6.5,
    shareClass: 'Class A',
    pct: (6.5 / TOTAL_BASIC_SHARES * 100).toFixed(1) + '%',
    votingPct: (6.5 / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: 'From 2034 convert + PIPE. SatCo JV partner.',
  },
  {
    name: 'Google',
    role: 'Strategic Investor',
    shares: 6.4,
    shareClass: 'Class A',
    pct: (6.4 / TOTAL_BASIC_SHARES * 100).toFixed(1) + '%',
    votingPct: (6.4 / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: 'From 2034 convert (Jan 2025 conversion)',
  },
  {
    name: 'Verizon',
    role: 'Strategic Partner',
    shares: 6.4,
    shareClass: 'Class A',
    pct: (6.4 / TOTAL_BASIC_SHARES * 100).toFixed(1) + '%',
    votingPct: (6.4 / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: 'From 2034 convert. $100M+ committed.',
  },
  {
    name: 'Rakuten',
    role: 'Strategic Partner',
    shares: 2.5,
    shareClass: 'Class A',
    pct: '~0.7%',
    votingPct: '~0.3%',
    notes: 'PIPE investor. Japan market partner.',
  },
  {
    name: 'BlackRock, Inc.',
    role: 'Institutional Investor',
    shares: 14.9,
    shareClass: 'Class A',
    pct: (14.9 / TOTAL_BASIC_SHARES * 100).toFixed(1) + '%',
    votingPct: (14.9 / TOTAL_VOTING_SHARES * 100).toFixed(1) + '%',
    notes: 'Per 13G/A filed Apr 28, 2025 (as of 3/31/2025). 14,858,926 shares. Sole voting and dispositive. Up from ~4% prior. Subsidiaries: BlackRock Advisors, Fund Managers.',
  },
  {
    name: 'American Tower',
    role: 'Infrastructure Partner',
    shares: 0.2,
    shareClass: 'Class A',
    pct: '<0.1%',
    votingPct: '<0.1%',
    notes: 'Per 13D/A filed Dec 11, 2025: Sold 2,288,621 shares at $69.75 via Barclays block trade ($159.8M gross). Direct Class A: 211,379. Retains 2,170,657 LLC Units (redeemable 1:1 for Class A) + matching Class B = ~2.38M economic equiv. PIPE investor.',
  },
];

// ============================================================================
// EQUITY OFFERINGS HISTORY
// ============================================================================

/**
 * Historical capital raises
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries when company announces offerings
 * - Include date, type, amount, price, and shares issued
 * - Update notes with key context
 */
export const EQUITY_OFFERINGS: EquityOffering[] = [
  {
    date: '2026-02-11',
    event: 'Feb 2026 Registered Direct #2 (2.375% Notes Repurchase)',
    type: 'Registered Direct',
    amount: 433,
    price: 96.92,
    shares: 4.5,
    notes: '4,475,223 shares at $96.92. Funded repurchase of $250M principal 2.375% notes for ~$433.7M. Cross-conditional.',
  },
  {
    date: '2026-02-11',
    event: 'Feb 2026 Registered Direct #1 (4.25% Notes Repurchase)',
    type: 'Registered Direct',
    amount: 180,
    price: 96.92,
    shares: 1.9,
    notes: '1,862,741 shares at $96.92. Funded repurchase of $46.5M principal 4.25% notes for ~$180.5M. Cross-conditional.',
  },
  {
    date: '2026-02-11',
    event: 'Feb 2026 Convertible Notes',
    type: 'Convertible',
    amount: 1000,
    price: 116.30,
    shares: 8.6,
    notes: '2.25% due 2036. Conversion rate 8.5982/share per $1K. Rule 144A. UBS lead. $150M greenshoe option. Net ~$983.7M.',
  },
  {
    date: '2025-10-15',
    event: 'Oct 2025 ATM Program ($800M)',
    type: 'ATM',
    amount: 706,
    price: null,
    shares: 10.1,
    notes: '$800M capacity. ~10.1M shares sold thru Feb 10, 2026 for ~$706.3M net. ~$80M remaining.',
  },
  {
    date: '2025-10-14',
    event: 'Oct 2025 Registered Direct (4.25% Notes Repurchase)',
    type: 'Registered Direct',
    amount: 161,
    price: 78.61,
    shares: 2.0,
    notes: '2,048,849 shares at $78.61. Funded repurchase of $50M principal 4.25% notes for ~$161.1M. Cross-conditional.',
  },
  {
    date: '2025-10-14',
    event: 'Oct 2025 Convertible',
    type: 'Convertible',
    amount: 1150,
    price: 96.30,
    shares: 11.9,
    notes: '2.0% due 2036. Initial size $850M, upsized to $1B during marketing, +$150M greenshoe exercised = $1.15B total. Concurrent with Oct RD and ATM. Outstanding as debt.',
  },
  {
    date: '2025-05-13',
    event: 'May 2025 Equity Distribution ($500M ATM)',
    type: 'ATM',
    amount: 287,
    price: null,
    shares: null,
    notes: '$500M ATM via B. Riley et al. (424B5 May 13). ~$287M sold through Q3 2025. Terminated Oct 2025 when replaced by $800M program.',
  },
  {
    date: '2025-07-24',
    event: 'Jul 2025 Registered Direct (4.25% Notes Repurchase)',
    type: 'Registered Direct',
    amount: 347,
    price: 60.06,
    shares: 5.8,
    notes: '5,775,635 shares at $60.06. Funded repurchase of $46.5M principal 4.25% notes. Settlement Jul 30.',
  },
  {
    date: '2025-07-07',
    event: 'Jul 2025 Convertible',
    type: 'Convertible',
    amount: 575,
    price: 120.12,
    shares: 4.8,
    notes: '2.375% due 2032. Outstanding as debt.',
  },
  {
    date: '2025-01-08',
    event: 'Jan 2025 Convertible',
    type: 'Convertible',
    amount: 460,
    price: 26.58,
    shares: 17.3,
    notes: '4.25% due 2032. $410M repurchased for equity, $50M remains.',
  },
  {
    date: '2024-01-19',
    event: 'Equity Raise',
    type: 'Private',
    amount: 100,
    price: 3.10,
    shares: 32.3,
    notes: 'Block 1 satellite funding',
  },
  {
    date: '2024-01-18',
    event: '2034 Strategic Converts',
    type: 'Convertible',
    amount: 148.5,
    price: 5.76,
    shares: 25.8,
    notes: 'AT&T, Google, Vodafone, Verizon. Force-converted Jan 2025.',
  },
  {
    date: '2023-06-28',
    event: 'Public Offering',
    type: 'Follow-on',
    amount: 59.4,
    price: 5.00,
    shares: 11.9,
    notes: 'Working capital',
  },
  {
    date: '2022-12-02',
    event: 'Public Offering',
    type: 'Follow-on',
    amount: 75,
    price: 5.50,
    shares: 13.6,
    notes: 'BW3 funding',
  },
  {
    date: '2022-03-01',
    event: 'B. Riley ATM Facility',
    type: 'ATM',
    amount: 75,
    price: null,
    shares: null,
    notes: '24-month committed equity facility',
  },
  {
    date: '2021-04-06',
    event: 'SPAC Merger + PIPE',
    type: 'SPAC + PIPE',
    amount: 692,
    price: 10.00,
    shares: 69.2,
    notes: 'AST & Science merger. PIPE: Vodafone, Rakuten, American Tower',
  },
  {
    date: '2019-09-11',
    event: 'NPA SPAC IPO',
    type: 'IPO',
    amount: 230,
    price: 10.00,
    shares: 23.0,
    notes: 'New Providence Acquisition Corp. Units at $10',
  },
];

// ============================================================================
// DILUTION HISTORY
// ============================================================================

/**
 * Share count evolution over time
 * Used for historical dilution analysis
 */
export const DILUTION_HISTORY = [
  { quarter: 'Q1 2026', classA: 290.4, implied: 379.8, fullyDiluted: 415.0, event: 'Feb 2026: $1B converts + two RDs (6.3M shares) + ATM continued' },
  { quarter: 'Q4 2025', classA: 280.0, implied: 369.4, fullyDiluted: 400.0, event: 'ATM sales + Oct RD. Vanguard 13G: 7.68% (21.5M shares)' },
  { quarter: 'Q3 2025', classA: 272.0, implied: 361.4, fullyDiluted: 395.0, event: 'Oct converts + ATM' },
  { quarter: 'Q2 2025', classA: 245.0, implied: 334.4, fullyDiluted: 380.0, event: 'Jul converts issued' },
  { quarter: 'Q1 2025', classA: 220.0, implied: 309.4, fullyDiluted: 350.0, event: 'Jan convert repurchase' },
  { quarter: 'Q4 2024', classA: 208.2, implied: 255.0, fullyDiluted: 280.0, event: '2034 converts + Jan converts' },
  { quarter: 'Q3 2024', classA: 140.0, implied: 175.0, fullyDiluted: 245.0, event: 'Warrant redemption Sept' },
  { quarter: 'Q2 2024', classA: 148.8, implied: 266.7, fullyDiluted: 320.0, event: 'Warrant exercise begins' },
  { quarter: 'Q1 2024', classA: 100.0, implied: 218.0, fullyDiluted: 280.0, event: '$100M @ $3.10' },
  { quarter: 'Q4 2023', classA: 90.2, implied: 120.0, fullyDiluted: 145.0, event: 'Year-end 10-K' },
  { quarter: 'Q2 2023', classA: 72.0, implied: 200.0, fullyDiluted: 215.0, event: '$59.4M offering' },
  { quarter: 'Q4 2022', classA: 71.9, implied: 200.0, fullyDiluted: 215.0, event: '$75M offering @ $5.50' },
  { quarter: 'Q4 2021', classA: 54.0, implied: 90.0, fullyDiluted: 118.0, event: 'Post-merger stabilization' },
  { quarter: 'Q1 2021', classA: 50.0, implied: 86.0, fullyDiluted: 118.0, event: 'SPAC merger Apr 6' },
  { quarter: 'Q4 2020', classA: 23.0, implied: 28.75, fullyDiluted: 42.0, event: 'Pre-merger SPAC' },
  { quarter: 'Q4 2019', classA: 23.0, implied: 28.75, fullyDiluted: 42.0, event: 'SPAC IPO completed' },
  { quarter: 'Q3 2019', classA: 5.75, implied: 5.75, fullyDiluted: 5.75, event: 'NPA SPAC pre-IPO (founder shares)' },
];

// ============================================================================
// STOCK-BASED COMPENSATION HISTORY
// ============================================================================

/**
 * Quarterly SBC data from 10-Q filings
 * Used for expense analysis and dilution tracking
 */
export const SBC_HISTORY = [
  { quarter: 'Q3 2025', sbc: 14.0, engineering: 8.0, gAndA: 6.0 },
  { quarter: 'Q2 2025', sbc: 10.5, engineering: 3.3, gAndA: 7.2 },
  { quarter: 'Q1 2025', sbc: 7.8, engineering: 4.0, gAndA: 3.8 },
  { quarter: 'Q4 2024', sbc: 11.4, engineering: 8.3, gAndA: 3.1 },
  { quarter: 'Q3 2024', sbc: 6.8, engineering: 3.4, gAndA: 3.4 },
  { quarter: 'Q2 2024', sbc: 8.8, engineering: 2.0, gAndA: 6.8 },
  { quarter: 'Q1 2024', sbc: 4.9, engineering: 1.6, gAndA: 3.3 },
  { quarter: 'Q4 2023', sbc: 2.7, engineering: 1.5, gAndA: 1.2 },
  { quarter: 'Q3 2023', sbc: 2.6, engineering: 1.5, gAndA: 1.1 },
  { quarter: 'Q2 2023', sbc: 5.5, engineering: 4.5, gAndA: 1.0 },
  { quarter: 'Q1 2023', sbc: 2.5, engineering: 1.4, gAndA: 1.1 },
];

// ============================================================================
// CONVERTIBLE NOTES DETAIL (for Dilution & Share Count tracking)
// ============================================================================

/**
 * Detailed convertible note information for dilution analysis
 *
 * AI AGENT INSTRUCTIONS:
 * - Update outstandingPrincipal after any repurchase events
 * - Update status when notes are retired
 * - Add new entries when new convertible notes are issued
 * - Recalculate maxSharesOnConversion if conversion terms change
 */
export const CONVERTIBLE_NOTES: ConvertibleNoteDetail[] = [
  {
    name: '4.25% Notes due 2032',
    originalPrincipal: 460,
    outstandingPrincipal: 3.5,
    couponRate: 4.25,
    maturityDate: '2032',
    conversionPrice: 26.58,
    maxSharesOnConversion: 0.1,
    status: 'partially-repurchased',
    notes: '$410M repurchased 2025 for equity. $46.5M repurchased Feb 2026. ~$3.5M remains.',
  },
  {
    name: '2.375% Notes due 2032',
    originalPrincipal: 575,
    outstandingPrincipal: 325,
    couponRate: 2.375,
    maturityDate: '2032',
    conversionPrice: 120.12,
    maxSharesOnConversion: 2.7,
    cappedCall: true,
    capPrice: 120.12,
    status: 'partially-repurchased',
    notes: '$250M repurchased Feb 2026 via registered direct. Capped call remains.',
  },
  {
    name: '2.00% Notes due 2036',
    originalPrincipal: 1150,
    outstandingPrincipal: 1150,
    couponRate: 2.00,
    maturityDate: '2036-01',
    conversionPrice: 96.30,
    maxSharesOnConversion: 11.9,
    status: 'outstanding',
    notes: 'Oct 2025 issue. $150M greenshoe exercised. Best terms at issuance.',
  },
  {
    name: '2.25% Notes due 2036',
    originalPrincipal: 1000,
    outstandingPrincipal: 1000,
    couponRate: 2.25,
    maturityDate: '2036',
    conversionPrice: 116.30,
    maxSharesOnConversion: 8.6,
    status: 'outstanding',
    notes: 'Feb 2026 issue. Rule 144A. UBS lead. $150M greenshoe option. Net ~$983.7M.',
  },
];

// ============================================================================
// CASH RUNWAY / LIQUIDITY DATA
// ============================================================================

/**
 * Cash runway scenarios for liquidity analysis
 * Merged from former standalone Cash Runway section
 *
 * AI AGENT INSTRUCTIONS:
 * - Update after each 10-Q/10-K filing with new cash balances
 * - Adjust burn rate from management guidance
 * - Add new scenarios for material changes in capital structure
 */
export const CASH_RUNWAY_SCENARIOS: CashRunwayScenario[] = [
  {
    label: 'Base Case (8-K)',
    startingCash: 2780,
    quarterlyBurn: 300,
    quarterlyRevenue: 15,
    runwayQuarters: 9.8,
    notes: 'Per 8-K Dec 31, 2025. Burn at $300M/Q guidance. Revenue at Q3 run rate.',
  },
  {
    label: 'Pro Forma (Post-Feb 2026)',
    startingCash: 3760,
    quarterlyBurn: 300,
    quarterlyRevenue: 20,
    runwayQuarters: 13.4,
    notes: 'Includes ~$984M new converts, net of repurchases. Revenue ramp assumed.',
  },
  {
    label: 'Revenue Ramp',
    startingCash: 3760,
    quarterlyBurn: 300,
    quarterlyRevenue: 75,
    runwayQuarters: 16.7,
    notes: 'H2 2025 rev guidance $50-75M. Assumes $75M/Q steady state by H2 2026.',
  },
  {
    label: 'Stress Case',
    startingCash: 2780,
    quarterlyBurn: 400,
    quarterlyRevenue: 5,
    runwayQuarters: 7.0,
    notes: 'Higher burn from accelerated constellation deployment. Minimal revenue.',
  },
];

/**
 * Liquidity position summary
 * AI AGENT: Update after each filing
 */
export const LIQUIDITY_POSITION = {
  cashAndEquiv: 2780,          // Per 8-K Dec 31, 2025
  cashProForma: 3760,          // Post-Feb 2026 raises
  quarterlyBurn: 300,          // CapEx + OpEx guidance
  totalDebt: 2264,             // Per 8-K
  totalDebtProForma: 2968,     // Post-Feb 2026
  atmRemaining: 80,            // ~$80M remaining on $800M ATM
  soundPointFacility: 550,     // $550M available for Ligado
  ubsLoan: 420,                // Cash-collateralized for Ligado
  asOf: '2026-02-12',
};

// ============================================================================
// DILUTION SCENARIOS
// ============================================================================

/**
 * Fully diluted share count scenarios
 *
 * AI AGENT INSTRUCTIONS:
 * - Update when new convertible notes are issued
 * - Update when ATM shares are sold
 * - Recalculate stress case for worst-case dilution
 */
export const DILUTION_SCENARIOS: DilutionScenario[] = [
  {
    label: 'Current (Basic)',
    newShares: 0,
    source: 'Class A + B + C outstanding',
    resultingFD: 379.8,
    dilutionPct: 0,
    type: 'current',
  },
  {
    label: 'Current (Fully Diluted)',
    newShares: 35.2,
    source: 'Outstanding converts + options/RSUs',
    resultingFD: 415.0,
    dilutionPct: 9.3,
    type: 'current',
  },
  {
    label: 'Base Case',
    newShares: 10,
    source: 'ATM remaining (~$80M) + employee equity vesting',
    resultingFD: 425.0,
    dilutionPct: 11.9,
    type: 'base',
  },
  {
    label: 'Stress Case (All Converts)',
    newShares: 23.3,
    source: 'All convertible notes convert to equity at strike prices',
    resultingFD: 438.3,
    dilutionPct: 15.4,
    type: 'stress',
  },
];

// ============================================================================
// DECEMBER 2025 INSIDER ACTIVITY
// ============================================================================

/**
 * C-suite RSU grants and insider transactions from Dec 2025 filings.
 * Most sales executed under Rule 10b5-1 plans (adopted June–September 2025).
 *
 * Total sales: ~$172.9M (American Tower $159.8M + individuals $13.1M)
 * Shares sold: 2,344,621 (0.83% of class)
 * Grants: 500,000 RSUs to C-suite (vest 1/3 annually on May 30 anniversaries starting 2026)
 * Net: Heavy selling led by 10% holder block trade; offset by grants and small director buys
 */
export const DEC_2025_RSU_GRANTS = [
  { name: 'Abel Avellan', role: 'CEO & Chairman', units: 250000, vestingStart: '2026-05-30', vestingSchedule: '1/3 annually', postGrantHoldings: 78413078, holdingsNote: '78,163,078 Class C + 250,000 RSUs (Dec). Also holds 500K RSUs granted Aug 15, 2025 (vest from Aug 2026). Total RSUs: 750K.' },
  { name: 'Andrew M. Johnson', role: 'CFO & CLO', units: 125000, vestingStart: '2026-05-30', vestingSchedule: '1/3 annually', postGrantHoldings: 512485, holdingsNote: 'Direct Class A' },
  { name: 'Scott Wisniewski', role: 'President', units: 125000, vestingStart: '2026-05-30', vestingSchedule: '1/3 annually', postGrantHoldings: 713681, holdingsNote: 'Direct Class A. Reconciled: 588,681 (Sept 25 post-80K RSU vest/36K tax withhold) + 125,000 (Dec grant) = 713,681' },
];

export const DEC_2025_INSIDER_SALES = [
  { name: 'American Tower Corp', role: '10% Holder', shares: 2288621, price: 69.75, proceeds: 159757414, date: '2025-12-09', broker: 'Barclays Capital', plan10b5_1: true, planAdopted: null, postSaleClassA: 211379, postSaleLLCUnits: 2170657 },
  { name: 'Yao Huiwen', role: 'CTO', shares: 40000, price: 73.52, proceeds: 2940752, date: '2025-12-05', broker: 'B. Riley Securities', plan10b5_1: true, planAdopted: '2025-06-12', postSaleClassA: null, postSaleLLCUnits: null },
  { name: 'Shanti B. Gupta', role: 'COO', shares: 10000, price: 77.34, proceeds: 773400, date: '2025-12-10', broker: 'Fidelity Brokerage', plan10b5_1: true, planAdopted: null, postSaleClassA: 382375, postSaleLLCUnits: null },
  { name: 'Maya Bernal', role: 'CAO', shares: 6000, price: 73.76, proceeds: 442560, date: '2025-12-05', broker: 'Fidelity Brokerage', plan10b5_1: true, planAdopted: null, postSaleClassA: 122486, postSaleLLCUnits: null },
];

export const DEC_2025_INSIDER_PURCHASES = [
  { name: 'Keith R. Larson', role: 'Director', shares: 675, price: 72.71, date: '2025-12-10', account: 'IRA', plan10b5_1: true, planAdopted: '2025-09-08', postPurchaseHoldings: 675 },
  { name: 'Keith R. Larson', role: 'Director', shares: 715, price: 70.02, date: '2025-12-17', account: 'IRA', plan10b5_1: true, planAdopted: '2025-09-08', postPurchaseHoldings: 1390 },
  { name: 'Keith R. Larson', role: 'Director', shares: 625, price: 80.00, date: '2025-12-24', account: 'IRA', plan10b5_1: true, planAdopted: '2025-09-08', postPurchaseHoldings: 2015 },
];

// ============================================================================
// AUGUST-SEPTEMBER 2025 INSIDER ACTIVITY
// ============================================================================

/**
 * Aug 15, 2025 RSU vestings, CEO grant, and Aug-Sep insider sales.
 * All vestings on Aug 15 at $34.50 (Code F tax withholding).
 * Gupta Sep 15 vesting at $29.83; post-transaction corrected via Form 4/A Jan 2026.
 *
 * Total disposed for tax: ~$3.38M (76,575 shares)
 * Total sales: ~$2.71M (60,000 shares)
 * CEO grant: 500K RSUs (separate from Dec 2, 2025 grant of 250K)
 */
export const AUG_2025_CEO_RSU_GRANT = {
  name: 'Abel Avellan',
  role: 'CEO & Chairman',
  date: '2025-08-15',
  units: 500000,
  vestingStart: '2026-08-15',
  vestingSchedule: '1/3 annually',
  postGrantHoldings: 78163078,
  holdingsNote: '78,163,078 Class A equivalents (~28% economic). Separate from Dec 2, 2025 grant of 250K RSUs. Total CEO RSUs: 750K.',
};

export const AUG_SEP_2025_RSU_VESTINGS = [
  { name: 'Huiwen Yao', role: 'CTO', date: '2025-08-15', unitsVested: 50000, taxWithheld: 20000, netAcquired: 30000, taxPrice: 34.50, taxValue: 690000, postTransactionHoldings: 200000 },
  { name: 'Andrew M. Johnson', role: 'CFO & CLO', date: '2025-08-15', unitsVested: 80000, taxWithheld: 35000, netAcquired: 45000, taxPrice: 34.50, taxValue: 1207500, postTransactionHoldings: 522485 },
  { name: 'Shanti B. Gupta', role: 'COO', date: '2025-08-15', unitsVested: 50000, taxWithheld: 21000, netAcquired: 29000, taxPrice: 34.50, taxValue: 724500, postTransactionHoldings: 392375 },
  { name: 'Shanti B. Gupta', role: 'COO', date: '2025-09-15', unitsVested: 50000, taxWithheld: 25575, netAcquired: 24425, taxPrice: 29.83, taxValue: 762890, postTransactionHoldings: 348232, note: 'Originally filed as 398,232; corrected to 348,232 via Form 4/A Jan 26, 2026' },
];

export const AUG_SEP_2025_INSIDER_SALES = [
  { name: 'Huiwen Yao', role: 'CTO', shares: 40000, avgPrice: 41.58, proceeds: 1663200, date: '2025-09-03', broker: 'B. Riley Securities', plan10b5_1: true, planAdopted: '2025-06-12', postSaleHoldings: 160000, note: 'Option exercise Aug 26. Matches Form 144 filed Sep 3. Price range $40.00-$42.00.' },
  { name: 'Andrew M. Johnson', role: 'CFO & CLO', shares: 20000, avgPrice: 52.48, proceeds: 1049634, date: '2025-08-26', broker: 'Fidelity Brokerage', plan10b5_1: false, planAdopted: null, postSaleHoldings: null, note: 'Form 144 proposed sale. Post-vesting (Aug 15 RSU vest). Execution Form 4 not in analyzed batch.' },
];

// ============================================================================
// APRIL-MAY 2025 INSIDER ACTIVITY
// ============================================================================

/**
 * Apr-May 2025 insider purchases — directors buying at $25 dip.
 * Cisneros bought Apr 4 and May 7 (both at $25, each 1K shares via trusts).
 * Johnson bought Apr 4 (500 shares at $25 via IRA; Form 4/A corrected Apr 9).
 *
 * Total purchases: $62.5K (2,500 shares)
 * Context: Stock at $25-$29 range. Directors showing repeated confidence.
 */
export const APR_MAY_2025_INSIDER_PURCHASES = [
  { name: 'Adriana Cisneros', role: 'Director', shares: 1000, price: 25.00, date: '2025-04-04', account: 'Trust (indirect)', plan10b5_1: false, planAdopted: null, postPurchaseHoldings: 782327, note: 'Duplicate Form 4 filing (clerical).' },
  { name: 'Andrew M. Johnson', role: 'CFO & CLO', shares: 500, price: 25.00, date: '2025-04-04', account: 'IRA', plan10b5_1: false, planAdopted: null, postPurchaseHoldings: 500, note: 'Form 4/A amendment Apr 9 corrects reporting.' },
  { name: 'Adriana Cisneros', role: 'Director', shares: 1000, price: 25.00, date: '2025-05-07', account: 'Trust (indirect)', plan10b5_1: false, planAdopted: null, postPurchaseHoldings: 783327, note: 'Multiple duplicate filings + Form 4/A amendment May 9.' },
];

/**
 * DEF 14A Proxy Summary — Annual Meeting Jun 6, 2025
 * 2024 Equity Incentive Plan: 5.4M shares approved (~2% dilution potential).
 * CEO comp: $1M salary + equity. Directors elected. Auditors approved.
 */
export const APR_2025_PROXY = {
  meetingDate: '2025-06-06',
  proxyFiled: '2025-04-25',
  preliminaryFiled: '2025-04-14',
  proposals: [
    { number: 1, description: 'Election of directors', approved: true },
    { number: 2, description: '2024 Equity Incentive Plan (5.4M shares)', approved: true, dilutionPct: 2.0 },
    { number: 3, description: 'Ratification of independent auditors', approved: true },
  ],
  ceoComp: { salary: 1000000, equityGrant: true },
  avellanOwnership: 28,
  notes: 'Annual meeting scheduled Jun 6 (subsequently held Jun 27 per later batch). 5.4M share plan = ~2% dilution potential. ARS filed same day with CEO letter.',
};

// ============================================================================
// MARCH 2025 INSIDER SALES & LIGADO DEAL
// ============================================================================

/**
 * March 2025 insider sales — all RSU vesting-related (tax withholding + dispositions).
 * Total: ~111K shares, ~$3.4M proceeds at avg ~$30.60/share.
 * Context: Stock $24-$35 range. Post-earnings peak $35.49 (Mar 6) then declined to $22.74 EOM.
 * All sellers retained significant positions. Routine compensation liquidity.
 */
export const MAR_2025_INSIDER_SALES = [
  { name: 'Ronald L. Rubin', role: 'Director', shares: 7000, price: 32.46, date: '2025-03-10', type: 'sale' as const, proceeds: 227220, postHoldings: 65628, note: 'Tax withholding on 2024 RSU vesting. Sold at post-earnings highs.' },
  { name: 'Julio A. Torres', role: 'Director', shares: 20000, price: 30.73, date: '2025-03-10', type: 'sale' as const, proceeds: 614600, postHoldings: 52628, note: 'Tax on RSU vesting. Weighted avg $30.62-$30.94. Ownership down ~28%.' },
  { name: 'Scott Wisniewski', role: 'President', shares: 23643, price: 28.15, date: '2025-03-15', type: 'withholding' as const, proceeds: 0, postHoldings: 653146, note: 'Tax withholding on 72,500 RSU vesting (net 48,857 shares).' },
  { name: 'Scott Wisniewski', role: 'President', shares: 35871, price: 28.35, date: '2025-03-17', type: 'sale' as const, proceeds: 1017143, postHoldings: 653146, note: 'Form 144/A amended acquisition date. Weighted $28.25-$28.50.' },
  { name: 'Shanti B. Gupta', role: 'COO', shares: 24425, price: 28.00, date: '2025-03-17', type: 'sale' as const, proceeds: 683900, postHoldings: 368807, note: 'Executing Form 144 proposal. Selling amid price dip from $35 peak.' },
  { name: 'Maya Bernal', role: 'CAO', shares: 3244, price: 25.71, date: '2025-03-21', type: 'withholding' as const, proceeds: 0, postHoldings: 120335, note: 'Tax withholding on 12,500 RSU vesting (net 9,256 shares). Standard.' },
];

/**
 * Ligado Material Agreement — 8-K Filed March 24, 2025
 * Entry into definitive agreement for L-band spectrum access.
 * Formalizes the RSA announced Jan 6, 2025.
 * Warrants for 9.99% AST stake (~22M shares) are significant dilution.
 */
export const MAR_2025_LIGADO_DEAL = {
  date: '2025-03-24',
  type: 'Material Agreement (8-K)',
  initialInvestment: 150, // $M
  totalConsideration: 550, // $M
  annualLease: 80, // $M/year
  spectrumMHz: 45,
  spectrumBands: '40 MHz L-band (1525-1559 MHz) + 5 MHz (1670-1675 MHz)',
  coverage: 'US & Canada',
  warrants: { pctStake: 9.99, estimatedShares: 22000000, estimatedValue: 120000000 },
  dilutionPct: 10,
  notes: 'Tied to Ligado Chapter 11 bankruptcy plan. +10% intraday on announcement. Risk: regulatory approvals, bankruptcy court outcomes. Precedes Jun 2025 term sheet and Oct 2025 closing.',
};

/**
 * S-3ASR Automatic Shelf Registration — Filed March 17, 2025
 * 56M shares for resale (~25% dilution potential). No immediate issuance.
 */
export const MAR_2025_SHELF_REGISTRATION = {
  date: '2025-03-17',
  type: 'S-3ASR',
  totalShares: 56071233,
  components: [
    { description: 'Rakuten reorganization shares', shares: 28500000 },
    { description: 'Exchangeable shares + others', shares: 27571233 },
  ],
  pricePerShare: 28.62, // for fee calculation
  aggregateValue: 1600000000, // ~$1.6B
  fee: 245689,
  dilutionPct: 25,
  notes: 'Facilitates secondary sales by existing holders. Overhang risk but enables liquidity. No immediate issuance.',
};

// ============================================================================
// MAY-JUNE 2025 INSIDER ACTIVITY
// ============================================================================

/**
 * Certificate of Amendment — Jun 6, 2025 (Filed Jun 9, 2025; 8-K)
 * Increased authorized Class A from 700M to 800M (+100M).
 * Approved at annual meeting. For incentives, acquisitions, future raises.
 */
export const JUN_2025_CERTIFICATE_AMENDMENT = {
  date: '2025-06-06',
  filedDate: '2025-06-09',
  classA: { previous: 700, new: 800, change: 100 },
  classB: { previous: 100, new: 100, change: 0 },
  classC: { previous: 800, new: 800, change: 0 },
  purpose: 'Incentive plan capacity, potential acquisitions, future capital raises',
  notes: 'Potential dilution ~11% at current outstanding. Approved at Jun 27 annual meeting. No immediate issuance planned.',
};

/**
 * May-Jun 2025 RSU vestings, grants, and option exercises.
 * Filed May 19 - Jun 9, 2025 (Form 4 / Form 144).
 *
 * Wisniewski: 125K RSU grant (Jun 2). Separate from Dec 2025 grant of 125K.
 * Gupta: 50K RSU vesting (Jun 2); 20K tax withhold at $22.50 ($450K).
 * Yao: 40K option exercise at $0.06 (May 17); proposed 40K sale via Form 144.
 */
export const MAY_JUN_2025_RSU_ACTIVITY = [
  { name: 'Scott Wisniewski', role: 'President', date: '2025-06-02', type: 'RSU Grant', units: 125000, vestingStart: '2026-05-30', vestingSchedule: '1/3 annually', postHoldings: 588681, note: 'Separate from Dec 2, 2025 grant of 125K. Total 250K RSUs across both grants.' },
  { name: 'Shanti B. Gupta', role: 'COO', date: '2025-06-02', type: 'RSU Vesting', units: 50000, taxWithheld: 20000, taxPrice: 22.50, taxValue: 450000, netAcquired: 30000, postHoldings: 392375, note: 'Jun 2 vesting; 20K tax withhold at $22.50. Proposed 10K sale Jun 9 (Form 144).' },
  { name: 'Huiwen Yao', role: 'CTO', date: '2025-05-17', type: 'Option Exercise', units: 40000, exercisePrice: 0.06, exerciseValue: 2400, postHoldings: 240000, note: 'Converted to LLC Units. Prep for proposed 40K sale (Form 144 May 16). Executed Sep 3 at $41.58.' },
];

/**
 * Jun 2025 insider purchases — director and CFO buying at $25 dip.
 * Cisneros bought twice: Jun 9 (784,077 post) and Jun 24 (783,327 post).
 * Johnson bought Jun 24.
 *
 * Total purchases: $62.5K (2,500 shares)
 * Context: Stock near 2025 low (~$25). Shows insider confidence.
 */
export const JUN_2025_INSIDER_PURCHASES = [
  { name: 'Adriana Cisneros', role: 'Director', shares: 1000, price: 25.00, date: '2025-06-09', account: 'Trust (indirect)', plan10b5_1: false, planAdopted: null, postPurchaseHoldings: 784077, note: 'Multiple duplicate Form 4 filings (clerical). Single transaction confirmed.' },
  { name: 'Adriana Cisneros', role: 'Director', shares: 1000, price: 25.00, date: '2025-06-24', account: 'Trust (indirect)', plan10b5_1: false, planAdopted: null, postPurchaseHoldings: 783327 },
  { name: 'Andrew M. Johnson', role: 'CFO & CLO', shares: 500, price: 25.00, date: '2025-06-24', account: 'IRA', plan10b5_1: false, planAdopted: null, postPurchaseHoldings: 500 },
];

// ============================================================================
// JULY 2025 CREDIT FACILITY
// ============================================================================

/**
 * $345M UBS Credit Agreement (Event Jul 15; Filed Jul 18, 2025)
 * Expandable to $500M. SOFR+5%. Maturity 2028.
 * Used for constellation capex. Adds significant non-dilutive liquidity.
 */
export const JUL_2025_CREDIT_FACILITY = {
  amount: 345,
  expandableTo: 500,
  rate: 'SOFR + 5%',
  maturity: '2028',
  lender: 'UBS',
  filedDate: '2025-07-18',
  estimatedFees: 5,
  purpose: 'Constellation deployment capex',
  notes: 'Adds $345M non-dilutive liquidity. Expandable to $500M. Covenants limit operational flexibility.',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate total raised from all offerings
 */
export const getTotalRaised = (): number => {
  return EQUITY_OFFERINGS.reduce((sum, o) => sum + o.amount, 0);
};

/**
 * Get offerings by type
 */
export const getOfferingsByType = (type: string): EquityOffering[] => {
  return EQUITY_OFFERINGS.filter(o => o.type === type);
};

/**
 * Calculate total potential dilution from all convertible notes
 */
export const getTotalConvertDilution = (): number => {
  return CONVERTIBLE_NOTES.reduce((sum, n) => sum + n.maxSharesOnConversion, 0);
};

/**
 * Get only outstanding (non-retired) convertible notes
 */
export const getOutstandingNotes = (): ConvertibleNoteDetail[] => {
  return CONVERTIBLE_NOTES.filter(n => n.status !== 'fully-retired');
};
