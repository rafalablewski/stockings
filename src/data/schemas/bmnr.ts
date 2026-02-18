/**
 * BMNR Schema Definitions
 * ================================================
 *
 * Per-file schema definitions consumed by the patch-extraction AI
 * to ensure generated entries match BMNR conventions exactly.
 *
 * CRITICAL DIFFERENCES FROM ASTS:
 * - Timeline uses changes[] array (NOT details[])
 * - Timeline impact is LOWERCASE ("positive", not "Positive")
 * - Timeline entries have a 'source' field
 * - Quarterly data is an array (NOT a Record)
 * - Quarterly data has ETH-specific fields (ethHoldings, stakingYield, etc.)
 * - Capital has simple single-class structure (not multi-class)
 */

import type { FieldDef, FileSchema } from './asts';

export const BMNR_SCHEMAS: Record<string, FileSchema> = {

  'bmnr/timeline-events.ts': {
    file: 'bmnr/timeline-events.ts',
    exportName: 'BMNR_TIMELINE_EVENTS',
    description: 'Chronological record of actual company changes. Newest first.',
    ordering: 'newest first (reverse chronological)',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'YYYY-MM-DD', example: "'2026-02-09'" },
      { name: 'source', type: 'string', required: true, example: "'PRNewswire' or 'SEC Filing (8-K)' or 'CoinDesk / Press Release'" },
      { name: 'category', type: 'string', required: true, example: "'Holdings' or 'Corporate' or 'SEC Filing' or 'Product'" },
      { name: 'title', type: 'string', required: true, format: 'Emoji prefix for Holdings/Corporate events', example: "'📊 ETH Holdings Reach 4.326M — $10.0B Total, ETH -62% from 2025 Highs'" },
      { name: 'changes', type: 'array', required: true, format: '{ metric: string, previous: string, new: string, change: string }[]', example: "[{ metric: 'ETH Holdings', previous: '4,285,125', new: '4,325,738', change: '+40,613 (+0.9%)' }]" },
      { name: 'notes', type: 'string', required: true, example: "'Commentary about market conditions, CEO quotes, regulatory context...'" },
      { name: 'impact', type: 'string', required: true, format: 'LOWERCASE: positive | negative | neutral', example: "'positive'" },
    ],
    exampleEntry: `  {
    date: '2026-02-09',
    source: 'PRNewswire',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.326M — $10.0B Total, ETH -62% from 2025 Highs, V-Recovery Expected',
    changes: [
      { metric: 'ETH Holdings', previous: '4,285,125', new: '4,325,738', change: '+40,613 (+0.9%)' },
      { metric: 'ETH Price', previous: '$2,317', new: '$2,125', change: '-8.3% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.55%', new: '3.58%', change: '+0.03pp (72% to 5%)' },
      { metric: 'Staked ETH', previous: '2,897,459', new: '2,897,459', change: 'Unchanged' },
      { metric: 'Total Cash', previous: '$586M', new: '$595M', change: '+$9M' },
      { metric: 'Total Holdings', previous: '$10.7B', new: '$10.0B', change: '-$0.7B (ETH price)' },
      { metric: 'Staking Revenue', previous: '$188M/yr', new: '$202M/yr', change: '+7% WoW annualized' },
      { metric: 'CESR Rate', previous: '~2.81%', new: '3.11%', change: '+30bp (Quatrefoil)' },
    ],
    notes: 'ETH -62% from 2025 highs, but Tom Lee: this is the 8th time since 2018 ETH has fallen 50%+. V-shaped recoveries follow every time. CESR improved to 3.11%. Annualized staking $202M (+7% WoW). Bitmine 7-day yield 3.3234%. Beast $200M initial investment closed.',
    impact: 'positive'
  },`,
    insertAnchor: '// [PR_CHECKLIST_EVENT_TIMELINE]',
    notes: [
      'CRITICAL: uses changes[] array with {metric, previous, new, change} — NOT details[]',
      'CRITICAL: impact is LOWERCASE: "positive", "negative", "neutral" — NOT Capitalized',
      'Has source field (absent in ASTS): e.g. "PRNewswire", "SEC Filing (8-K)"',
      'Categories: Holdings, Corporate, SEC Filing, Product, Capital',
      'Holdings category: weekly ETH update — include ALL metrics in changes[]',
      'Corporate category: 8-K material events — include relevant metrics in changes[]',
      'Title emoji prefix: 📊 for Holdings, 🎤 for presentations, 🦁 for Beast, 📋 for SEC filings, 👤 for personnel',
    ],
  },

  'bmnr/sec-filings.ts': {
    file: 'bmnr/sec-filings.ts',
    exportName: 'BMNR_SEC_FILINGS',
    description: 'Registry of SEC filings with metadata. Newest first.',
    ordering: 'newest first',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'MMM DD, YYYY', example: "'Feb 9, 2026'" },
      { name: 'type', type: 'string', required: true, example: "'8-K'" },
      { name: 'description', type: 'string', required: true, example: "'4.326M ETH Holdings Update ($10.0B Total)'" },
      { name: 'period', type: 'string', required: true, format: "'Qx YYYY' or 'FY YYYY' or '—'", example: "'—'" },
      { name: 'color', type: 'string', required: true, format: '8-K=yellow, 10-Q=purple, 10-K=blue, 424B5=orange, S-8/DEF14A=cyan, 13G/Form4=green', example: "'yellow'" },
    ],
    exampleEntry: `  { date: 'Feb 9, 2026', type: '8-K', description: '4.326M ETH Holdings Update ($10.0B Total)', period: '—', color: 'yellow' },`,
    insertAnchor: 'BMNR_SEC_FILINGS = [',
    notes: [
      'Color coding: 8-K=yellow, 10-Q=purple, 10-K=blue, 424B5=orange, S-8/DEFA14A/DEF14A/DEFR14A=cyan, SC13G/Form4=green',
      'ALSO add a cross-ref entry in BMNR_FILING_CROSS_REFS',
      'Cross-ref key format: "FORM_TYPE|YYYY-MM-DD" (e.g., "8-K|2026-02-09")',
      'Cross-ref source values: "timeline", "capital", "catalysts", "company"',
    ],
  },

  'bmnr/capital.ts': {
    file: 'bmnr/capital.ts',
    exportName: 'SHARE_CLASSES / MAJOR_SHAREHOLDERS / EQUITY_OFFERINGS',
    description: 'Capital structure. Simple single-class (NOT multi-class like ASTS).',
    ordering: 'share classes by status, shareholders by %',
    entryFields: [
      { name: 'ShareClass (BMNR)', type: 'object', required: false, format: '{ class, authorized, outstanding, parValue, voting, status }', example: "{ class: 'Common Stock', authorized: 500000000, outstanding: 434000000, parValue: 0.0001, voting: '1 vote/share', status: 'active' }" },
      { name: 'EquityOffering (BMNR)', type: 'object', required: false, format: '{ date, event, type, amount ($M), price, shares (M), notes }', example: "{ date: '2025-09-22', event: '$365M Registered Direct', type: 'Registered Direct', amount: 365, price: 70, shares: 5.21, notes: 'Includes warrants @ $87.50' }" },
    ],
    exampleEntry: `  {
    class: 'Common Stock',
    authorized: 500000000,
    outstanding: 434000000,
    parValue: 0.0001,
    voting: '1 vote/share',
    status: 'active',
  },`,
    insertAnchor: 'SHARE_CLASSES',
    notes: [
      'BMNR has SIMPLE single-class structure — not multi-class like ASTS',
      'authorized and outstanding are raw numbers (NOT millions)',
      'Series A/B Preferred are fully converted (outstanding: 0)',
      'Update CAPITAL_METADATA.lastUpdated when modifying',
    ],
  },

  'bmnr/quarterly-metrics.ts': {
    file: 'bmnr/quarterly-metrics.ts',
    exportName: 'BMNR_QUARTERLY_DATA',
    description: 'Quarterly financial data as array. Newest first. Includes ETH-specific fields.',
    ordering: 'newest first (array, NOT Record)',
    entryFields: [
      { name: 'quarter', type: 'string', required: true, example: "'Q1 2026'" },
      { name: 'cash', type: 'number', required: true, format: '$M', example: '888' },
      { name: 'crypto', type: 'number', required: true, format: '$M total crypto value', example: '10562' },
      { name: 'cryptoType', type: 'string', required: true, example: "'ETH'" },
      { name: 'assets', type: 'number', required: true, format: '$M', example: '11487' },
      { name: 'liabilities', type: 'number', required: true, format: '$M', example: '236' },
      { name: 'equity', type: 'number', required: true, format: '$M', example: '11252' },
      { name: 'revenue', type: 'number', required: true, format: '$M', example: '2.3' },
      { name: 'netIncome', type: 'number', required: true, format: '$M', example: '-5204' },
      { name: 'shares', type: 'number', required: true, format: 'M shares', example: '409' },
      { name: 'era', type: 'string', required: true, format: 'Emoji + label', example: "'💎 ETH'" },
      { name: 'opEx', type: 'number', required: true, format: '$M', example: '18' },
      { name: 'filing', type: 'string', required: true, example: "'10-Q (Jan 2026)'" },
      { name: 'ethHoldings', type: 'number', required: false, format: 'raw ETH count', example: '4500000' },
      { name: 'stakingYield', type: 'number', required: false, format: 'percent', example: '3.5' },
      { name: 'stakingDeployed', type: 'number', required: false, format: 'raw ETH count', example: '450000' },
    ],
    exampleEntry: `  { quarter: 'Q1 2026', cash: 888, crypto: 10562, cryptoType: 'ETH', assets: 11487, liabilities: 236, equity: 11252, revenue: 2.3, netIncome: -5204, shares: 409, era: '💎 ETH', opEx: 18, opExGandA: 12, opExTreasury: 4, opExOther: 2, filing: '10-Q (Jan 2026)', ethHoldings: 4500000, stakingYield: 3.5, stakingDeployed: 450000 },`,
    insertAnchor: 'BMNR_QUARTERLY_DATA = [',
    notes: [
      'ARRAY format (NOT Record like ASTS financials.ts)',
      'All entries on single line for compactness',
      'ETH-era entries (Q4 2025+) include ethHoldings, stakingYield, stakingDeployed',
      'Pre-ETH era (Q3 2025 and earlier): no ETH fields, much smaller numbers',
      'era: "💎 ETH" for ETH treasury era, "⛏️ BTC" for mining era',
    ],
  },

  'bmnr/catalysts.ts': {
    file: 'bmnr/catalysts.ts',
    exportName: 'UPCOMING_CATALYSTS / COMPLETED_MILESTONES',
    description: 'Future events and completed milestones. Same format as ASTS catalysts.',
    ordering: 'sorted by expected timeline',
    entryFields: [
      { name: 'event', type: 'string', required: true, example: "'Reach 5% of ETH Supply (~6M ETH)'" },
      { name: 'timeline', type: 'string', required: true, example: "'2026'" },
      { name: 'impact', type: 'string', required: true, format: 'Capitalized: Critical | High | Medium | Low', example: "'Critical'" },
      { name: 'category', type: 'string', required: true, example: "'Treasury'" },
    ],
    exampleEntry: `  {
    event: 'Reach 5% of ETH Supply (~6M ETH) - "Alchemy of 5%" Target',
    timeline: '2026',
    impact: 'Critical',
    category: 'Treasury',
  },`,
    insertAnchor: 'UPCOMING_CATALYSTS',
    notes: [
      'Categories: Treasury, Capital, Staking, Regulatory, Partnership, Corporate',
      'Same shared Catalyst type as ASTS — impact IS Capitalized here',
    ],
  },

  'bmnr/company.ts': {
    file: 'bmnr/company.ts',
    exportName: 'DEFAULTS',
    description: 'Company defaults including ETH-specific fields.',
    ordering: 'N/A — single object',
    entryFields: [
      { name: 'currentETH', type: 'number', required: true, format: 'raw ETH count', example: '4325738' },
      { name: 'ethPrice', type: 'number', required: true, format: '$/ETH', example: '2125' },
      { name: 'ethPriceAsOf', type: 'string', required: true, format: 'YYYY-MM-DD', example: "'2026-02-08'" },
      { name: 'currentStockPrice', type: 'number', required: true, format: '$/share', example: '27.15' },
      { name: 'currentShares', type: 'number', required: true, format: 'M shares', example: '434' },
      { name: 'cashOnHand', type: 'number', required: true, format: '$M', example: '595' },
      { name: 'totalDebt', type: 'number', required: true, format: '$M (currently 0)', example: '0' },
    ],
    exampleEntry: '',
    insertAnchor: 'DEFAULTS',
    notes: [
      'Update via "update" patches (not insert)',
      'BMNR has ETH-specific fields: currentETH, ethPrice, ethPriceAsOf',
      'Always update ethPriceAsOf and priceAsOf when changing prices',
    ],
  },

  'bmnr/ethereum-adoption.ts': {
    file: 'bmnr/ethereum-adoption.ts',
    exportName: 'ETHEREUM_ADOPTION_EVENTS',
    description: 'Ethereum ecosystem events relevant to BMNR thesis.',
    ordering: 'newest first',
    entryFields: [
      { name: 'date', type: 'string', required: true, format: 'YYYY-MM-DD', example: "'2026-02-14'" },
      { name: 'title', type: 'string', required: true, example: "'ETHZilla Launches First Tokenized Aviation Assets on Ethereum L2'" },
      { name: 'summary', type: 'string', required: true, example: "'Description of the event and why it matters for ETH adoption'" },
      { name: 'significance', type: 'string', required: true, example: "'Why this matters for BMNR thesis'" },
      { name: 'bmnrImplication', type: 'string', required: true, example: "'Direct impact on BMNR treasury value or strategy'" },
    ],
    exampleEntry: `  {
    date: '2026-02-14',
    title: 'ETHZilla Launches First Tokenized Aviation Assets on Ethereum L2',
    summary: '$12.2M jet engines tokenized on Ethereum L2...',
    significance: 'RWA tokenization expanding to physical industrial assets',
    bmnrImplication: 'More real-world value locked on Ethereum validates BMNR treasury thesis',
  },`,
    insertAnchor: 'ETHEREUM_ADOPTION_EVENTS = [',
    notes: [
      'Only for Ethereum ecosystem events — not BMNR company events (those go in timeline-events.ts)',
      'Must include bmnrImplication explaining relevance to BMNR thesis',
    ],
  },
};
