/**
 * CRCL Schema Definitions
 * ================================================
 *
 * Per-file schema definitions consumed by the patch-extraction AI
 * to ensure generated entries match CRCL conventions exactly.
 *
 * CRITICAL DIFFERENCES FROM ASTS/BMNR:
 * - Timeline uses shared TimelineEntry type with 'verdict' field (NOT 'impact')
 * - Timeline entries have: date, category, event, impact (description), source, verdict, details
 * - Financials use custom CRCLQuarterlyData interface (USDC-specific fields)
 * - Company uses MARKET object (not DEFAULTS) for price/share data
 * - Single-class share structure (Class A common only)
 */

import type { FieldDef, FileSchema } from './asts';

export const CRCL_SCHEMAS: Record<string, FileSchema> = {

  'crcl/timeline.ts': {
    file: 'crcl/timeline.ts',
    exportName: 'TIMELINE',
    description: 'Chronological record of corporate events. Newest first.',
    ordering: 'newest first (reverse chronological)',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'YYYY-MM-DD', example: "'2025-12-18'" },
      { name: 'category', type: 'string', required: true, format: 'Capitalized', example: "'Partnership'" },
      { name: 'event', type: 'string', required: true, example: "'Intuit multi-year strategic partnership'" },
      { name: 'impact', type: 'string', required: true, example: "'USDC for ~100M users'" },
      { name: 'source', type: 'string', required: true, example: "'Press Release' or '8-K' or 'Kraken Blog'" },
      { name: 'verdict', type: 'string', required: true, format: 'LOWERCASE: positive | negative | neutral', example: "'positive'" },
      { name: 'details', type: 'string', required: true, example: "'Multi-year agreement to integrate USDC across Intuit platforms...'" },
    ],
    exampleEntry: `  { date: '2025-12-18', category: 'Partnership', event: 'Intuit multi-year strategic partnership', impact: 'USDC for ~100M users', source: 'Press Release', verdict: 'positive', details: 'Multi-year agreement to integrate USDC across Intuit platforms including TurboTax, QuickBooks, and Credit Karma. Potential distribution to ~100M users.' },`,
    insertAnchor: 'TIMELINE: TimelineEntry[] = [',
    notes: [
      'Uses shared TimelineEntry type — NOT custom format like ASTS/BMNR',
      'verdict is LOWERCASE: "positive", "negative", "neutral" — NOT Capitalized',
      'impact field is a SHORT description (not a rating) — describes significance',
      'Categories: Corporate, Product, Partnership, Regulatory, Capital, Expansion, SEC Filing, Earnings, Governance, Acquisition',
      'details: single string with full description — NOT string[] like ASTS',
    ],
  },

  'crcl/sec-filings.ts': {
    file: 'crcl/sec-filings.ts',
    exportName: 'CRCL_SEC_FILINGS',
    description: 'Registry of SEC filings with metadata. Newest first.',
    ordering: 'newest first',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'MMM DD, YYYY', example: "'Mar 10, 2026'" },
      { name: 'type', type: 'string', required: true, example: "'10-K'" },
      { name: 'description', type: 'string', required: true, example: "'Annual Report FY2025'" },
      { name: 'period', type: 'string', required: true, format: "'Qx YYYY' or 'FY YYYY' or '—'", example: "'FY 2025'" },
      { name: 'color', type: 'string', required: true, format: '10-K=blue, 10-Q=violet, 8-K=gold, S-1/S-3=green, 424B5/FWP=orange', example: "'blue'" },
    ],
    exampleEntry: `  { date: 'Mar 10, 2026', type: '10-K', description: 'Annual Report FY2025', period: 'FY 2025', color: 'blue' },`,
    insertAnchor: 'CRCL_SEC_FILINGS',
    notes: [
      'Color coding: 10-K/ARS=blue, 10-Q=violet, 8-K=gold, S-1/S-3/S-8=green, 424B5/424B7/FWP=orange',
      'ALSO add a cross-ref entry in CRCL_FILING_CROSS_REFS',
      'Cross-ref key format: "FORM_TYPE|YYYY-MM-DD" (e.g., "10-K|2026-03-10")',
      'Cross-ref source values: "timeline", "capital", "financials", "catalysts", "company"',
    ],
  },

  'crcl/capital.ts': {
    file: 'crcl/capital.ts',
    exportName: 'SHARE_CLASSES / MAJOR_SHAREHOLDERS / EQUITY_OFFERINGS',
    description: 'Capital structure — post-IPO, single-class common stock.',
    ordering: 'share classes by class, shareholders by %',
    entryFields: [
      { name: 'ShareClass', type: 'ShareClass', required: false, format: '{ classType, shares (M), description, votingRights, conversion }', example: "{ classType: 'Class A Common', shares: 640, description: 'Public trading shares (NYSE: CRCL)', votingRights: '1 vote per share', conversion: 'N/A' }" },
      { name: 'EquityOffering', type: 'EquityOffering', required: false, format: '{ date, event, type, amount ($M), price, shares (M), notes }', example: "{ date: '2025-06-04', event: 'IPO', type: 'IPO', amount: 857, price: 31, shares: 27.65, notes: 'NYSE listing. Goldman, JPM, Barclays, Citi lead.' }" },
    ],
    exampleEntry: `  {
    date: '2025-06-04',
    event: 'IPO',
    type: 'IPO',
    amount: 857,
    price: 31,
    shares: 27.65,
    notes: 'NYSE listing. Goldman Sachs, JPMorgan, Barclays, Citi as lead bookrunners.',
  },`,
    insertAnchor: 'EQUITY_OFFERINGS',
    notes: [
      'Post-IPO single-class structure (Class A common)',
      'shares in millions, amounts in $M',
      'Update CAPITAL_METADATA.lastUpdated and source when modifying',
    ],
  },

  'crcl/financials.ts': {
    file: 'crcl/financials.ts',
    exportName: 'QUARTERLY_DATA',
    description: 'Quarterly financial data as array of CRCLQuarterlyData. Newest first.',
    ordering: 'newest first (array)',
    entryFields: [
      { name: 'quarter', type: 'string', required: true, example: "'Q3 2025'" },
      { name: 'totalRevenue', type: 'number', required: true, format: '$M', example: '740' },
      { name: 'reserveIncome', type: 'number', required: true, format: '$M', example: '711' },
      { name: 'otherRevenue', type: 'number', required: true, format: '$M', example: '29' },
      { name: 'distributionCosts', type: 'number', required: true, format: '$M (paid to Coinbase)', example: '447' },
      { name: 'rldc', type: 'number', required: true, format: '$M (Revenue Less Distribution Costs)', example: '292' },
      { name: 'rldcMargin', type: 'number', required: true, format: '% of total revenue', example: '39' },
      { name: 'adjustedEbitda', type: 'number', required: true, format: '$M', example: '166' },
      { name: 'netIncome', type: 'number', required: true, format: '$M', example: '214' },
      { name: 'usdcCirculation', type: 'number', required: true, format: '$B (billions)', example: '73.7' },
      { name: 'cashPosition', type: 'number', required: true, format: '$M', example: '1126' },
      { name: 'sbc', type: 'number', required: true, format: '$M (stock-based comp)', example: '110' },
    ],
    exampleEntry: `  {
    quarter: 'Q3 2025',
    totalRevenue: 740,
    reserveIncome: 711,
    otherRevenue: 29,
    distributionCosts: 447,
    rldc: 292,
    rldcMargin: 39,
    adjustedEbitda: 166,
    netIncome: 214,
    usdcCirculation: 73.7,
    reserveReturnRate: 4.15,
    usdcOnPlatform: 10.2,
    platformPct: 13.5,
    marketShare: 29,
    meaningfulWallets: 6.34,
    usdcMinted: 79.7,
    usdcRedeemed: 72.3,
    opex: 131,
    cashPosition: 1126,
    sbc: 110,
  },`,
    insertAnchor: 'QUARTERLY_DATA',
    notes: [
      'CRCL uses custom CRCLQuarterlyData interface — NOT shared QuarterlyFinancials',
      'USDC circulation in BILLIONS, all other figures in MILLIONS',
      'Key metric: RLDC (Revenue Less Distribution Costs) = totalRevenue - distributionCosts',
      'distributionCosts = payments to Coinbase under distribution agreement',
      'Update FINANCIALS_METADATA when adding new quarters',
    ],
  },

  'crcl/catalysts.ts': {
    file: 'crcl/catalysts.ts',
    exportName: 'UPCOMING_CATALYSTS / COMPLETED_MILESTONES',
    description: 'Future events and completed milestones.',
    ordering: 'sorted by expected timeline',
    entryFields: [
      { name: 'event', type: 'string', required: true, example: "'USDC Circulation Surpasses $100B'" },
      { name: 'timeline', type: 'string', required: true, example: "'2026'" },
      { name: 'impact', type: 'string', required: true, format: 'Capitalized: Critical | High | Medium | Low', example: "'Critical'" },
      { name: 'category', type: 'string', required: true, example: "'Product'" },
    ],
    exampleEntry: `  {
    event: 'USDC Circulation Surpasses $100B',
    timeline: '2026',
    impact: 'Critical',
    category: 'Product',
  },`,
    insertAnchor: 'UPCOMING_CATALYSTS',
    notes: [
      'Categories: Earnings, Product, Regulatory, Partnership, Expansion, Capital, Corporate',
      'Same shared Catalyst type as ASTS/BMNR — impact IS Capitalized here',
      'When completed: remove from UPCOMING_CATALYSTS, add to COMPLETED_MILESTONES',
    ],
  },

  'crcl/company.ts': {
    file: 'crcl/company.ts',
    exportName: 'MARKET / USDC_DATA',
    description: 'Market data and USDC core metrics. Uses MARKET object (not DEFAULTS like ASTS/BMNR).',
    ordering: 'N/A — single objects',
    entryFields: [
      { name: 'currentStockPrice', type: 'number', required: true, format: '$/share', example: '42.38' },
      { name: 'currentShares', type: 'number', required: true, format: 'M shares', example: '640' },
      { name: 'cashOnHand', type: 'number', required: true, format: '$M', example: '1126' },
    ],
    exampleEntry: '',
    insertAnchor: 'MARKET',
    notes: [
      'Update via "update" patches (not insert)',
      'CRCL uses MARKET object — NOT DEFAULTS like ASTS/BMNR',
      'Also update USDC_DATA when USDC circulation changes',
      'Always update priceAsOf date when changing price',
    ],
  },
};
