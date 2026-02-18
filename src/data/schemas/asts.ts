/**
 * ASTS Schema Definitions
 * ================================================
 *
 * Per-file schema definitions consumed by the patch-extraction AI
 * to ensure generated entries match ASTS conventions exactly.
 *
 * These are NOT TypeScript runtime types — they are AI-readable
 * reference documentation rendered into the extraction prompt.
 */

export interface FieldDef {
  name: string;
  type: string;
  required: boolean;
  format?: string;
  example: string;
}

export interface FileSchema {
  file: string;
  exportName: string;
  description: string;
  ordering: string;
  entryFields: FieldDef[];
  exampleEntry: string;
  insertAnchor: string;
  notes: string[];
}

export const ASTS_SCHEMAS: Record<string, FileSchema> = {

  'asts/timeline-events.ts': {
    file: 'asts/timeline-events.ts',
    exportName: 'ASTS_TIMELINE_EVENTS',
    description: 'Chronological record of actual company changes. Newest first.',
    ordering: 'newest first (reverse chronological)',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'YYYY-MM-DD', example: "'2026-02-11'" },
      { name: 'category', type: 'string', required: true, format: 'Capitalized', example: "'Capital'" },
      { name: 'title', type: 'string', required: true, example: "'$1B 2.25% Convertible Notes Due 2036 + Concurrent Registered Direct Offerings'" },
      { name: 'summary', type: 'string', required: true, example: "'$1B new converts at 2.25%, two registered directs totaling ~$614M'" },
      { name: 'details', type: 'string[]', required: true, example: "['New 2.25% Convertible Senior Notes due 2036: $1,000M aggregate principal', 'Conversion rate: 8.5982 shares per $1,000']" },
      { name: 'sources', type: 'string[]', required: true, example: "['8-K Feb 11, 2026', '424(b)(5) Prospectus Supplements']" },
      { name: 'prevValue', type: 'string', required: true, example: "'$575M outstanding'" },
      { name: 'newValue', type: 'string', required: true, example: "'$2,968M pro forma'" },
      { name: 'impact', type: 'string', required: true, format: 'Capitalized: Positive | Negative | Neutral | Mixed', example: "'Positive'" },
    ],
    exampleEntry: `  {
    date: '2026-02-11',
    category: 'Capital',
    title: '$1B 2.25% Convertible Notes Due 2036 + Concurrent Registered Direct Offerings',
    summary: '$1B new converts at 2.25%, two registered directs totaling ~$614M',
    details: [
      'New 2.25% Convertible Senior Notes due 2036: $1,000M aggregate principal (Rule 144A)',
      'Conversion rate: 8.5982 shares per $1,000 (initial conversion price ~$116.30)',
      'Registered Direct #1: 1,862,741 shares at $96.92 (~$180.2M net)',
    ],
    sources: ['8-K Feb 11, 2026', '424(b)(5) Prospectus Supplements'],
    prevValue: '$50M 4.25% + $575M 2.375% + $1.15B 2.00% outstanding',
    newValue: '$3.5M 4.25% + $325M 2.375% + $1.15B 2.00% + $1B 2.25%. Total debt: ~$2,968M pro forma',
    impact: 'Positive',
  },`,
    insertAnchor: 'ASTS_TIMELINE_EVENTS = [',
    notes: [
      'Categories: Capital, Earnings, Product, Partnership, Corporate, Guidance, Regulatory, Launch, Event',
      'impact is ALWAYS Capitalized: "Positive", "Negative", "Neutral", "Mixed"',
      'details[]: each string is one standalone fact — include ALL material facts from the filing',
      'sources[]: cite specific filing types with dates (e.g. "8-K Feb 11, 2026")',
      'prevValue/newValue: describe the state change caused by this event',
    ],
  },

  'asts/sec-filings.ts': {
    file: 'asts/sec-filings.ts',
    exportName: 'ASTS_SEC_FILINGS',
    description: 'Registry of SEC filings with metadata. Newest first.',
    ordering: 'newest first',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'MMM DD, YYYY', example: "'Feb 11, 2026'" },
      { name: 'type', type: 'string', required: true, example: "'8-K'" },
      { name: 'description', type: 'string', required: true, example: "'Preliminary FY 2025 Results + Convertible Notes Offering + Registered Directs'" },
      { name: 'period', type: 'string', required: true, format: "'Qx YYYY' or '—'", example: "'—'" },
      { name: 'color', type: 'string', required: true, format: '8-K=yellow, 10-Q/10-K=purple/blue, 424B5=orange, 13G/Form4/S-8=green', example: "'yellow'" },
    ],
    exampleEntry: `  { date: 'Feb 11, 2026', type: '8-K', description: 'Preliminary FY 2025 Results + Convertible Notes Offering + Registered Directs', period: '—', color: 'yellow' },`,
    insertAnchor: 'ASTS_SEC_FILINGS = [',
    notes: [
      'Color coding: 8-K=yellow, 10-Q=purple, 10-K=blue, 424B5/FWP=orange, 13G/13D/Form4/S-8/DEF14A=green',
      'Period: use "Qx YYYY" for periodic filings (10-Q, 10-K), "—" for event filings',
      'ALSO add a cross-ref entry in ASTS_FILING_CROSS_REFS below',
    ],
  },

  'asts/capital.ts': {
    file: 'asts/capital.ts',
    exportName: 'SHARE_CLASSES / MAJOR_SHAREHOLDERS / EQUITY_OFFERINGS',
    description: 'Capital structure: share classes, major shareholders, equity offerings.',
    ordering: 'share classes by class, shareholders by %',
    entryFields: [
      { name: 'ShareClass', type: 'object', required: false, format: '{ classType, shares (M), description, votingRights, conversion }', example: "{ classType: 'Class A', shares: 290.4, description: 'Public trading shares (NASDAQ: ASTS)', votingRights: '1 vote per share', conversion: 'N/A' }" },
      { name: 'EquityOffering', type: 'object', required: false, format: '{ date, event, type, amount ($M), price, shares (M), notes }', example: "{ date: '2026-02-11', event: '$1B 2.25% Convertible Notes', type: 'Convertible', amount: 1000, price: null, shares: null, notes: 'Rule 144A. UBS lead. $150M greenshoe.' }" },
    ],
    exampleEntry: `  {
    date: '2026-02-11',
    event: 'Registered Direct #1',
    type: 'Registered Direct',
    amount: 180.5,
    price: 96.92,
    shares: 1.86,
    notes: 'Cross-conditional with 4.25% notes repurchase ($46.5M)',
  },`,
    insertAnchor: 'EQUITY_OFFERINGS',
    notes: [
      'Update CAPITAL_METADATA.lastUpdated and source when modifying',
      'shares in millions, amounts in $M',
      'Multi-class structure: Class A (1 vote), Class B (1 vote, convert 1:1), Class C (10 votes, Avellan)',
    ],
  },

  'asts/financials.ts': {
    file: 'asts/financials.ts',
    exportName: 'QUARTERLY_DATA',
    description: 'Quarterly financial data keyed by quarter string.',
    ordering: 'Record<string, QuarterlyFinancials> — key is "Qx YYYY"',
    entryFields: [
      { name: 'quarter', type: 'string', required: true, example: "'Q4 2025'" },
      { name: 'filing', type: 'string', required: true, example: "'Preliminary 8-K (Feb 11, 2026). 10-K pending.'" },
      { name: 'cashAndEquiv', type: 'number|null', required: true, format: '$M', example: '2780' },
      { name: 'totalDebt', type: 'number|null', required: true, format: '$M', example: '2264' },
      { name: 'revenue', type: 'number|null', required: true, format: '$M', example: '50' },
      { name: 'opEx', type: 'number|null', required: true, format: '$M', example: '127' },
      { name: 'netIncome', type: 'number|null', required: false, format: '$M', example: 'null' },
      { name: 'sharesOutstanding', type: 'number|null', required: false, format: 'M shares (basic Class A)', example: '280.0' },
      { name: 'fullyDiluted', type: 'number|null', required: false, format: 'M shares', example: '400.0' },
      { name: 'stockPrice', type: 'number|null', required: false, format: '$/share', example: '96.92' },
      { name: 'note', type: 'string', required: false, example: "'Per 10-Q Nov 10. stc $175M prepay.'" },
    ],
    exampleEntry: `  'Q4 2025': {
    quarter: 'Q4 2025',
    filing: 'Preliminary 8-K (Feb 11, 2026). 10-K pending (~Mar 2026)',
    cashAndEquiv: 2780,
    totalDebt: 2264,
    revenue: 50,
    opEx: 127,
    netIncome: null,
    sharesOutstanding: 280.0,
    fullyDiluted: 400.0,
    stockPrice: 96.92,
    note: 'Q4 derived from FY range $63-71M minus Q1-Q3 $16.6M',
  },`,
    insertAnchor: 'QUARTERLY_DATA',
    notes: [
      'All figures in millions USD',
      'Use null for pending/unavailable fields — NEVER use 0 for unknown',
      'Update FINANCIALS_METADATA when adding new quarters',
    ],
  },

  'asts/catalysts.ts': {
    file: 'asts/catalysts.ts',
    exportName: 'UPCOMING_CATALYSTS / COMPLETED_MILESTONES',
    description: 'Future events and completed milestones.',
    ordering: 'sorted by expected timeline',
    entryFields: [
      { name: 'event', type: 'string', required: true, example: "'BB7 Launch (New Glenn, Cape Canaveral)'" },
      { name: 'timeline', type: 'string', required: true, example: "'Late Feb 2026'" },
      { name: 'impact', type: 'string', required: true, format: 'Capitalized: Critical | High | Medium | Low', example: "'High'" },
      { name: 'category', type: 'string', required: true, example: "'Constellation'" },
    ],
    exampleEntry: `  {
    event: 'BB7 Launch (New Glenn, Cape Canaveral)',
    timeline: 'Late Feb 2026',
    impact: 'High',
    category: 'Constellation',
  },`,
    insertAnchor: 'UPCOMING_CATALYSTS',
    notes: [
      'Categories: Constellation, Capital, Revenue, Regulatory, Partnership, Corporate',
      'When completed: remove from UPCOMING_CATALYSTS, add to COMPLETED_MILESTONES',
      'Impact: Critical (binary company outcome) > High (significant revenue/strategic) > Medium (incremental) > Low (nice-to-have)',
    ],
  },

  'asts/company.ts': {
    file: 'asts/company.ts',
    exportName: 'DEFAULTS / OPERATIONAL_METRICS',
    description: 'Company defaults (price, shares, cash, debt) and operational metrics.',
    ordering: 'N/A — single objects',
    entryFields: [
      { name: 'currentStockPrice', type: 'number', required: true, format: '$/share', example: '82.51' },
      { name: 'currentShares', type: 'number', required: true, format: 'M total implied', example: '380' },
      { name: 'cashOnHand', type: 'number', required: true, format: '$M', example: '2780' },
      { name: 'totalDebt', type: 'number', required: true, format: '$M', example: '2264' },
    ],
    exampleEntry: '',
    insertAnchor: 'DEFAULTS',
    notes: [
      'Update via "update" patches (not insert)',
      'Always update priceAsOf date when changing price',
    ],
  },
};
