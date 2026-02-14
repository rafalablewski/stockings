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
 * LAST UPDATED: 2026-02-12 (Feb 2026 offerings + 13G + Form 4)
 * NEXT UPDATE: After Q4 2025 10-K or new proxy filing
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
  lastUpdated: '2026-02-12',
  source: 'Feb 2026 8-K, Pricing Term Sheets, 13G (Vanguard), Form 4 (Gupta)',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026)',
  notes: 'Feb 2026: $1B new converts, two registered directs (~$614M), $296.5M notes repurchased. Vanguard 13G: 7.68%. ATM: ~$706M sold.',
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
 * Post-Feb 2026: 4.25% ($3.5M, ~0.1M), 2.375% ($325M, ~4.5M),
 * 2.00% ($1.15B, ~11.9M), new 2.25% ($1B, ~8.6M) = ~25.1M from converts
 */
export const FULLY_DILUTED_SHARES = 415.0;

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
    name: 'American Tower',
    role: 'Infrastructure Partner',
    shares: 2.5,
    shareClass: 'Class A',
    pct: '~0.7%',
    votingPct: '~0.3%',
    notes: 'PIPE investor. Tower infrastructure.',
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
    date: '2019-09-11',
    event: 'NPA SPAC IPO',
    type: 'IPO',
    amount: 230,
    price: 10.00,
    shares: 23.0,
    notes: 'New Providence Acquisition Corp. Units at $10',
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
    date: '2022-03-01',
    event: 'B. Riley ATM Facility',
    type: 'ATM',
    amount: 75,
    price: null,
    shares: null,
    notes: '24-month committed equity facility',
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
    date: '2023-06-28',
    event: 'Public Offering',
    type: 'Follow-on',
    amount: 59.4,
    price: 5.00,
    shares: 11.9,
    notes: 'Working capital',
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
    date: '2025-01-08',
    event: 'Jan 2025 Convertible',
    type: 'Convertible',
    amount: 460,
    price: 26.58,
    shares: 17.3,
    notes: '4.25% due 2032. $410M repurchased for equity, $50M remains.',
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
    date: '2025-10-14',
    event: 'Oct 2025 Convertible',
    type: 'Convertible',
    amount: 1150,
    price: 96.30,
    shares: 11.9,
    notes: '2.0% due 2036. Best terms in years. Outstanding as debt.',
  },
  {
    date: '2025-09-30',
    event: 'Q3 2025 ATM Program',
    type: 'ATM',
    amount: 287,
    price: null,
    shares: null,
    notes: 'At-the-market sales. Facility terminated.',
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
    date: '2025-10-15',
    event: 'Oct 2025 ATM Program ($800M)',
    type: 'ATM',
    amount: 706,
    price: null,
    shares: 10.1,
    notes: '$800M capacity. ~10.1M shares sold thru Feb 10, 2026 for ~$706.3M net. ~$80M remaining.',
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
    event: 'Feb 2026 Registered Direct #2 (2.375% Notes Repurchase)',
    type: 'Registered Direct',
    amount: 433,
    price: 96.92,
    shares: 4.5,
    notes: '4,475,223 shares at $96.92. Funded repurchase of $250M principal 2.375% notes for ~$433.7M. Cross-conditional.',
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
  { quarter: 'Q3 2019', classA: 5.75, implied: 5.75, fullyDiluted: 5.75, event: 'NPA SPAC pre-IPO (founder shares)' },
  { quarter: 'Q4 2019', classA: 23.0, implied: 28.75, fullyDiluted: 42.0, event: 'SPAC IPO completed' },
  { quarter: 'Q4 2020', classA: 23.0, implied: 28.75, fullyDiluted: 42.0, event: 'Pre-merger SPAC' },
  { quarter: 'Q1 2021', classA: 50.0, implied: 86.0, fullyDiluted: 118.0, event: 'SPAC merger Apr 6' },
  { quarter: 'Q4 2021', classA: 54.0, implied: 90.0, fullyDiluted: 118.0, event: 'Post-merger stabilization' },
  { quarter: 'Q4 2022', classA: 71.9, implied: 200.0, fullyDiluted: 215.0, event: '$75M offering @ $5.50' },
  { quarter: 'Q2 2023', classA: 72.0, implied: 200.0, fullyDiluted: 215.0, event: '$59.4M offering' },
  { quarter: 'Q4 2023', classA: 90.2, implied: 120.0, fullyDiluted: 145.0, event: 'Year-end 10-K' },
  { quarter: 'Q1 2024', classA: 100.0, implied: 218.0, fullyDiluted: 280.0, event: '$100M @ $3.10' },
  { quarter: 'Q2 2024', classA: 148.8, implied: 266.7, fullyDiluted: 320.0, event: 'Warrant exercise begins' },
  { quarter: 'Q3 2024', classA: 140.0, implied: 175.0, fullyDiluted: 245.0, event: 'Warrant redemption Sept' },
  { quarter: 'Q4 2024', classA: 208.2, implied: 255.0, fullyDiluted: 280.0, event: '2034 converts + Jan converts' },
  { quarter: 'Q1 2025', classA: 220.0, implied: 309.4, fullyDiluted: 350.0, event: 'Jan convert repurchase' },
  { quarter: 'Q2 2025', classA: 245.0, implied: 334.4, fullyDiluted: 380.0, event: 'Jul converts issued' },
  { quarter: 'Q3 2025', classA: 272.0, implied: 361.4, fullyDiluted: 395.0, event: 'Oct converts + ATM' },
  { quarter: 'Q4 2025', classA: 280.0, implied: 369.4, fullyDiluted: 400.0, event: 'ATM sales + Oct RD. Vanguard 13G: 7.68% (21.5M shares)' },
  { quarter: 'Q1 2026', classA: 290.4, implied: 379.8, fullyDiluted: 415.0, event: 'Feb 2026: $1B converts + two RDs (6.3M shares) + ATM continued' },
];

// ============================================================================
// STOCK-BASED COMPENSATION HISTORY
// ============================================================================

/**
 * Quarterly SBC data from 10-Q filings
 * Used for expense analysis and dilution tracking
 */
export const SBC_HISTORY = [
  { quarter: 'Q1 2023', sbc: 2.5, engineering: 1.4, gAndA: 1.1 },
  { quarter: 'Q2 2023', sbc: 5.5, engineering: 4.5, gAndA: 1.0 },
  { quarter: 'Q3 2023', sbc: 2.6, engineering: 1.5, gAndA: 1.1 },
  { quarter: 'Q4 2023', sbc: 2.7, engineering: 1.5, gAndA: 1.2 },
  { quarter: 'Q1 2024', sbc: 4.9, engineering: 1.6, gAndA: 3.3 },
  { quarter: 'Q2 2024', sbc: 8.8, engineering: 2.0, gAndA: 6.8 },
  { quarter: 'Q3 2024', sbc: 6.8, engineering: 3.4, gAndA: 3.4 },
  { quarter: 'Q4 2024', sbc: 11.4, engineering: 8.3, gAndA: 3.1 },
  { quarter: 'Q1 2025', sbc: 7.8, engineering: 4.0, gAndA: 3.8 },
  { quarter: 'Q2 2025', sbc: 10.5, engineering: 3.3, gAndA: 7.2 },
  { quarter: 'Q3 2025', sbc: 14.0, engineering: 8.0, gAndA: 6.0 },
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
