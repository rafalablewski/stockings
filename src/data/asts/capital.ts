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
 * LAST UPDATED: 2025-11-15 (from Nov 2025 13D/A)
 * NEXT UPDATE: After Q4 2025 10-K or new proxy filing
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 13D/A or proxy filing:
 * 1. Update SHARE_CLASSES with new share counts
 * 2. Update MAJOR_SHAREHOLDERS with ownership %
 * 3. Recalculate voting power if Class C shares change
 * 4. Add new EQUITY_OFFERINGS entries for any capital raises
 */

import type { ShareClass, MajorShareholder, EquityOffering, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CAPITAL_METADATA: DataMetadata = {
  lastUpdated: '2025-11-15',
  source: '13D/A filed Nov 2025, Q3 2025 10-Q',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026)',
  notes: 'Class A grew from 5.75M (SPAC) to 279M (Nov 2025)',
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
    shares: 278.8,            // Q3 2025 10-Q: 271,981,894 + subsequent issuances
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
 */
export const FULLY_DILUTED_SHARES = 395.0;

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
