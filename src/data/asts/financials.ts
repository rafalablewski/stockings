/**
 * ASTS SPACEMOBILE - QUARTERLY FINANCIAL DATA
 * ================================================
 *
 * Historical quarterly data from SEC filings.
 *
 * DATA SOURCES:
 * - Primary: 10-Q and 10-K filings (SEC EDGAR)
 * - Secondary: Quarterly business updates, press releases
 * - Verification: SeekingAlpha, Yahoo Finance
 *
 * LAST UPDATED: 2025-12-30
 * NEXT UPDATE: After Q4 2025 10-K (~March 2026)
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Add new quarter entry with all available fields
 * 2. Mark pending fields as null until filing available
 * 3. Include filing source in 'filing' field
 * 4. Add note explaining any unusual items
 *
 * FIELD DEFINITIONS:
 * - cashAndEquiv: Cash and cash equivalents from balance sheet
 * - totalDebt: Long-term debt, net from balance sheet
 * - revenue: Total revenue from income statement
 * - opEx: Total operating expenses
 * - netLoss: Net loss from income statement
 * - sharesOutstanding: Basic Class A shares
 * - impliedSharesOut: Class A + Class B + Class C
 * - fullyDiluted: Including options, RSUs, converts
 */

import type { QuarterlyFinancials, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const FINANCIALS_METADATA: DataMetadata = {
  lastUpdated: '2026-02-12',
  source: 'Feb 11, 2026 8-K (preliminary FY 2025), Q3 2025 10-Q',
  nextExpectedUpdate: 'Q4 2025 10-K (~March 2026)',
  notes: 'All figures in millions USD unless noted. Q4 2025 derived from 8-K preliminary FY 2025 ranges.',
};

// ============================================================================
// QUARTERLY DATA
// ============================================================================

/**
 * Historical quarterly financial data
 * Most recent quarters first
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new quarters at the beginning of the object
 * - Use null for fields not yet reported
 * - Include all available fields from the filing
 * - Add detailed notes for significant items
 */
export const QUARTERLY_DATA: Record<string, QuarterlyFinancials> = {
  // ========== 2025 ==========
  'Q4 2025': {
    quarter: 'Q4 2025',
    filing: 'Preliminary 8-K (Feb 11, 2026). 10-K pending (~Mar 2026)',
    cashAndEquiv: 2780,             // $2,780M total cash/restricted cash per 8-K
    totalDebt: 2264,                // $2,264M: $50M 4.25%, $575M 2.375%, $1.15B 2.00%, $420M UBS, ~$69M secured
    revenue: 50,                    // Derived: FY $63-71M range minus Q1-Q3 $16.6M → ~$46-54M, midpoint ~$50M
    opEx: 127,                      // Derived: FY $355-363M minus Q1-Q3 $232.1M → ~$123-131M, midpoint ~$127M
    opExSBC: null,                  // Pending 10-K
    netIncome: null,                // Pending 10-K
    sharesOutstanding: 280.0,       // Estimated from Vanguard 13G (7.68% of Class A = ~280M)
    impliedSharesOut: 369.4,        // Class A ~280 + B 11.2 + C 78.2
    fullyDiluted: 400.0,            // Pre-Feb 2026 converts
    stockPrice: 96.92,              // Feb 11, 2026 close
    satellites: 7,                  // BW3 + BB1-6
    employees: null,
    definitiveAgreements: 6,
    mous: 50,
    spectrumOwned: 105,
    grossPPE: 1600,                 // ~$1.6B per 8-K
    accumulatedDA: 174,             // ~$174M per 8-K
    adjOpEx: null,                  // FY adj opex $257-263M, Q4 derived ~$25-31M range pending 10-K
    contractedRevenue: 1000,
    note: 'Preliminary per 8-K Feb 11, 2026. FY 2025: rev $63-71M, opex $355-363M, adj opex $257-263M, SBC+D&A $98-100M. Cash $2,780M. Debt $2,264M. BB6 launched Dec 23, unfolded Feb 10, 2026.',
  },
  'Q3 2025': {
    quarter: 'Q3 2025',
    filing: '10-Q (Nov 10, 2025)',
    cashAndEquiv: 1220.1,
    totalDebt: 697.6,
    revenue: 14.7,
    opEx: 94.4,
    opExEngineering: 40.8,
    opExGandA: 29.8,
    opExRandD: 5.5,
    opExDandA: 12.7,
    opExSBC: 14.0,
    opExCostOfRev: 5.5,
    adjOpEx: 67.7,
    adjOpExExTrans: 60.6,
    capEx: 258.9,
    grossPPE: 1165.8,
    netIncome: -163.8,
    sharesOutstanding: 272.0,
    impliedSharesOut: 361.4,
    fullyDiluted: 395.0,
    stockPrice: 78.00,
    satellites: 6,
    employees: null,
    definitiveAgreements: 6,
    mous: 50,
    spectrumOwned: 105,
    spectrumUS: 80,
    spectrumGlobalMNO: 1150,
    contractedRevenue: 1000,
    note: 'Per 10-Q Nov 10. stc $175M prepay, Verizon definitive. $3.2B pro forma liquidity. H2 rev guidance $50-75M.',
  },
  'Q2 2025': {
    quarter: 'Q2 2025',
    filing: '10-Q (Aug 11, 2025)',
    cashAndEquiv: 939.4,
    totalDebt: 482.5,
    revenue: 1.2,
    opEx: 74.0,
    opExEngineering: 28.6,
    opExGandA: 27.2,
    opExRandD: 6.4,
    opExDandA: 11.7,
    opExSBC: 10.5,
    adjOpEx: 51.7,
    adjOpExExTrans: 46.5,
    capEx: 322.8,
    grossPPE: 906.9,
    accumulatedDA: 145.3,
    netIncome: -135.9,
    sharesOutstanding: 245.0,
    impliedSharesOut: 334.4,
    fullyDiluted: 380.0,
    stockPrice: 55.00,
    satellites: 6,
    employees: null,
    definitiveAgreements: 5,
    mous: 50,
    spectrumOwned: 105,
    contractedRevenue: 800,
    note: 'Per Q2 Business Update Aug 11, 2025. L-Band court approved. 60 MHz S-Band acquired. Vi India partnership.',
  },
  'Q1 2025': {
    quarter: 'Q1 2025',
    filing: '10-Q (May 12, 2025)',
    cashAndEquiv: 874.5,
    totalDebt: 462.2,
    revenue: 0.7,
    opEx: 63.7,
    opExEngineering: 27.2,
    opExGandA: 18.4,
    opExRandD: 7.1,
    opExDandA: 11.0,
    opExSBC: 7.8,
    adjOpEx: 44.9,
    capEx: 124.1,
    grossPPE: 584.1,
    accumulatedDA: 133.3,
    netIncome: -63.6,
    sharesOutstanding: 220.0,
    impliedSharesOut: 309.4,
    fullyDiluted: 350.0,
    stockPrice: 25.00,
    satellites: 6,
    employees: null,
    definitiveAgreements: 3,
    mous: 50,
    spectrumOwned: 45,
    contractedRevenue: 650,
    note: 'Per Q1 Business Update May 12, 2025. H2 2025 revenue guidance $50-75M. Gateway bookings $13.6M.',
  },

  // ========== 2024 ==========
  'Q4 2024': {
    quarter: 'Q4 2024',
    filing: '10-K (March 3, 2025)',
    cashAndEquiv: 567.5,
    totalDebt: 155.6,
    revenue: 1.9,
    opEx: 60.6,
    opExEngineering: 30.9,
    opExGandA: 15.9,
    opExRandD: 5.3,
    opExDandA: 8.5,
    opExSBC: 11.4,
    adjOpEx: 40.8,
    capEx: 86.0,
    grossPPE: 460.0,
    accumulatedDA: 122.4,
    netIncome: -57.0,
    sharesOutstanding: 208.2,
    impliedSharesOut: 255.0,
    fullyDiluted: 280.0,
    stockPrice: 22.50,
    satellites: 6,
    employees: null,
    definitiveAgreements: 2,
    mous: 50,
    spectrumOwned: 0,
    contractedRevenue: 600,
    note: 'Per Q4 Business Update Mar 4, 2025. Block 1 operational Oct 29. Vodafone definitive Dec 9.',
  },
  'Q3 2024': {
    quarter: 'Q3 2024',
    filing: '10-Q (Nov 2024)',
    cashAndEquiv: 518.9,
    totalDebt: 156.3,
    revenue: 1.1,
    opEx: 66.6,
    opExEngineering: 21.8,
    opExGandA: 15.6,
    opExRandD: 14.7,
    opExDandA: 14.5,
    opExSBC: 6.8,
    adjOpEx: 45.3,
    capEx: 26.5,
    grossPPE: 374.0,
    accumulatedDA: 113.9,
    netIncome: -303.1,
    sharesOutstanding: 140.0,
    impliedSharesOut: 175.0,
    fullyDiluted: 245.0,
    stockPrice: 38.00,
    satellites: 6,
    employees: null,
    definitiveAgreements: 2,
    mous: 50,
    spectrumOwned: 0,
    contractedRevenue: 400,
    note: 'Block 1 (5 sats) launched Sept 12. Public warrants redeemed Sept 27 ($153.6M cash).',
  },
  'Q2 2024': {
    quarter: 'Q2 2024',
    filing: '10-Q (Aug 14, 2024)',
    cashAndEquiv: 287.6,
    totalDebt: 199.5,
    revenue: 0.9,
    opEx: 63.9,
    opExEngineering: 11.0,
    opExGandA: 4.4,
    opExRandD: 19.2,
    opExDandA: 20.4,
    opExSBC: 8.8,
    adjOpEx: 34.6,
    capEx: 21.2,
    grossPPE: 347.5,
    accumulatedDA: 99.3,
    netIncome: -131.4,
    sharesOutstanding: 148.8,
    impliedSharesOut: 266.7,
    fullyDiluted: 320.0,
    stockPrice: 12.00,
    satellites: 1,
    employees: null,
    definitiveAgreements: 1,
    mous: 44,
    spectrumOwned: 0,
    contractedRevenue: 300,
    note: 'AT&T definitive May 15. Verizon $100M commitment May 29. FCC BB1-5 license Aug 5.',
  },
  'Q1 2024': {
    quarter: 'Q1 2024',
    filing: '10-Q (May 2024)',
    cashAndEquiv: 212.4,
    totalDebt: 160.8,
    revenue: 0.5,
    opEx: 56.0,
    opExEngineering: 8.9,
    opExGandA: 4.3,
    opExRandD: 17.9,
    opExDandA: 19.9,
    opExSBC: 4.9,
    adjOpEx: 31.1,
    capEx: 26.6,
    grossPPE: 326.3,
    accumulatedDA: 81.1,
    netIncome: -39.8,
    sharesOutstanding: 100.0,
    impliedSharesOut: 218.0,
    fullyDiluted: 280.0,
    stockPrice: 3.50,
    satellites: 1,
    employees: null,
    definitiveAgreements: 0,
    mous: 40,
    spectrumOwned: 0,
    contractedRevenue: 150,
    note: 'Cash $212.4M. $100M equity Jan 19 @ $3.10. $110M converts Jan 18 (AT&T/Google/Vodafone).',
  },

  // ========== 2023 ==========
  'Q4 2023': {
    quarter: 'Q4 2023',
    filing: '10-K (April 1, 2024)',
    cashAndEquiv: 85.6,
    totalDebt: 59.3,
    revenue: 0,
    opEx: 60.9,
    opExEngineering: 18.5,
    opExGandA: 10.8,
    opExRandD: 9.3,
    opExDandA: 19.6,
    opExSBC: 2.7,
    adjOpEx: 38.6,
    capEx: 33.9,
    grossPPE: 299.7,
    accumulatedDA: 61.2,
    netIncome: -87.5,
    sharesOutstanding: 90.2,
    impliedSharesOut: 120.0,
    fullyDiluted: 145.0,
    stockPrice: 5.80,
    satellites: 1,
    employees: null,
    definitiveAgreements: 0,
    mous: 35,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'BW3 5G call Sept 19 (14 Mbps). Low cash ($88.1M) triggered Jan 2024 raise.',
  },
  'Q3 2023': {
    quarter: 'Q3 2023',
    filing: '10-Q (Nov 2023)',
    cashAndEquiv: 121.7,
    totalDebt: 60.3,
    revenue: 0,
    opEx: 60.3,
    netIncome: -60.3,
    sharesOutstanding: 89.0,
    impliedSharesOut: 118.0,
    fullyDiluted: 145.0,
    stockPrice: 5.50,
    satellites: 1,
    employees: null,
    note: 'First 5G connection demonstrated Sept 19 (14 Mbps download).',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get quarters in chronological order (oldest first)
 */
export const getQuartersChronological = (): string[] => {
  return Object.keys(QUARTERLY_DATA).reverse();
};

/**
 * Get the most recent quarter with complete data
 */
export const getLatestCompleteQuarter = (): QuarterlyFinancials | null => {
  const quarters = Object.values(QUARTERLY_DATA);
  return quarters.find(q => q.cashAndEquiv !== null) || null;
};

/**
 * Calculate quarter-over-quarter change for a metric
 */
export const getQoQChange = (metric: keyof QuarterlyFinancials, quarter: string): number | null => {
  const quarters = Object.keys(QUARTERLY_DATA);
  const idx = quarters.indexOf(quarter);
  if (idx === -1 || idx >= quarters.length - 1) return null;

  const current = QUARTERLY_DATA[quarter][metric];
  const previous = QUARTERLY_DATA[quarters[idx + 1]][metric];

  if (typeof current !== 'number' || typeof previous !== 'number' || previous === 0) {
    return null;
  }

  return ((current - previous) / Math.abs(previous)) * 100;
};
