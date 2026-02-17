/**
 * Filing-Type Output Templates
 * ================================================
 *
 * Per SEC form type, shows which data files to update and
 * what the output entries should look like for each ticker.
 *
 * Consumed by the patch-extraction AI to produce correctly
 * structured patches for each filing type.
 */

export interface FilingTemplate {
  filingType: string;
  description: string;
  typicalTargetFiles: string[];
  perTicker: Record<string, {
    secFilingEntry: string;
    crossRefEntry: string;
    targetFileNotes: string;
  }>;
}

export const FILING_TEMPLATES: Record<string, FilingTemplate> = {

  '8-K': {
    filingType: '8-K',
    description: 'Current report — material events. Most common filing type.',
    typicalTargetFiles: ['sec-filings.ts', 'timeline-events.ts', 'capital.ts', 'catalysts.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '8-K', description: 'Short description', period: '—', color: 'yellow' }`,
        crossRefEntry: `'8-K|YYYY-MM-DD': [\n  { source: 'capital', data: "Key capital change" },\n  { source: 'financials', data: "Key financial data" },\n]`,
        targetFileNotes: 'timeline-events.ts: use details[], sources[], impact Capitalized. capital.ts: update EQUITY_OFFERINGS or SHARE_CLASSES. financials.ts: add/update quarterly data.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '8-K', description: 'Short description', period: '—', color: 'yellow' }`,
        crossRefEntry: `'8-K|YYYY-MM-DD': [\n  { source: 'timeline', data: "Key event description" },\n  { source: 'company', data: "Updated metrics" },\n]`,
        targetFileNotes: 'timeline-events.ts: use changes[] array with {metric,previous,new,change}, impact LOWERCASE. For weekly ETH holdings updates: include ALL metrics (ETH Holdings, ETH Price, Supply%, Staked ETH, Cash, Holdings Value, Staking Revenue, CESR Rate). company.ts: update currentETH, ethPrice, cashOnHand.',
      },
    },
  },

  '10-Q': {
    filingType: '10-Q',
    description: 'Quarterly report — detailed financial statements.',
    typicalTargetFiles: ['sec-filings.ts', 'financials.ts', 'capital.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '10-Q', description: 'Quarterly Report (Revenue $XM; Cash $XM; OpEx $XM)', period: 'Qx YYYY', color: 'purple' }`,
        crossRefEntry: `'10-Q|YYYY-MM-DD': [\n  { source: 'financials', data: "Qx: cashAndEquiv: X, totalDebt: X, revenue: X, opEx: X" },\n]`,
        targetFileNotes: 'financials.ts: add full quarterly entry with all balance sheet + income statement fields. capital.ts: update sharesOutstanding from balance sheet.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '10-Q', description: 'Quarterly Report (Qx FYxxxx)', period: 'Qx YYYY', color: 'purple' }`,
        crossRefEntry: `'10-Q|YYYY-MM-DD': [\n  { source: 'quarterly-metrics', data: "Qx: cash X, crypto X, revenue X" },\n]`,
        targetFileNotes: 'quarterly-metrics.ts: add array entry (single line) with ALL fields including ethHoldings, stakingYield, stakingDeployed for ETH era.',
      },
    },
  },

  '10-K': {
    filingType: '10-K',
    description: 'Annual report — comprehensive financial statements.',
    typicalTargetFiles: ['sec-filings.ts', 'financials.ts', 'capital.ts', 'company.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '10-K', description: 'Annual Report', period: 'FY YYYY', color: 'blue' }`,
        crossRefEntry: `'10-K|YYYY-MM-DD': [\n  { source: 'financials', data: "FY: revenue X, cash X, debt X" },\n  { source: 'company', data: "Annual metrics update" },\n]`,
        targetFileNotes: 'financials.ts: add Q4 entry if not already present. capital.ts: reconcile share counts. company.ts: update operational metrics.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '10-K', description: 'Annual Report FYxxxx', period: 'FY YYYY', color: 'blue' }`,
        crossRefEntry: `'10-K|YYYY-MM-DD': [\n  { source: 'quarterly-metrics', data: "FY: EPS X, revenue X, net income X" },\n  { source: 'company', data: "FY metrics" },\n]`,
        targetFileNotes: 'quarterly-metrics.ts: add Q4/FY entry. company.ts: update DEFAULTS.',
      },
    },
  },

  '424B5': {
    filingType: '424B5',
    description: 'Prospectus supplement — equity offering details.',
    typicalTargetFiles: ['sec-filings.ts', 'capital.ts', 'catalysts.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '424B5', description: 'Offering description (X shares @ $Y)', period: '—', color: 'orange' }`,
        crossRefEntry: `'424B5|YYYY-MM-DD': [\n  { source: 'capital', data: "Offering: X shares at $Y → ~$ZM" },\n]`,
        targetFileNotes: 'capital.ts: add EQUITY_OFFERINGS entry with date, type, amount, price, shares.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: '424B5', description: '$XM Registered Direct @ $Y', period: '—', color: 'orange' }`,
        crossRefEntry: `'424B5|YYYY-MM-DD': [\n  { source: 'capital', data: "$XM offering at $Y/share" },\n]`,
        targetFileNotes: 'capital.ts: add EQUITY_OFFERINGS entry. Update outstanding share count.',
      },
    },
  },

  'SC 13G': {
    filingType: 'SC 13G',
    description: 'Beneficial ownership report (passive investor, ≥5%).',
    typicalTargetFiles: ['sec-filings.ts', 'capital.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'SC 13G', description: 'Owner X.XX% Ownership (XM shares)', period: '—', color: 'green' }`,
        crossRefEntry: `'SC 13G|YYYY-MM-DD': [\n  { source: 'capital', data: "Owner: XM shares, X.XX% of Class A" },\n]`,
        targetFileNotes: 'capital.ts: update or add MAJOR_SHAREHOLDERS entry.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'SC 13G', description: 'Owner X.X% Ownership (XM Shares)', period: '—', color: 'green' }`,
        crossRefEntry: `'SC 13G|YYYY-MM-DD': [\n  { source: 'capital', data: "Owner: XM shares, X.X%" },\n]`,
        targetFileNotes: 'capital.ts: update or add MAJOR_SHAREHOLDERS entry.',
      },
    },
  },

  'Form 4': {
    filingType: 'Form 4',
    description: 'Insider transaction report (filed within 2 business days).',
    typicalTargetFiles: ['sec-filings.ts', 'capital.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'Form 4', description: 'Name (Role) action X shares at $Y', period: '—', color: 'green' }`,
        crossRefEntry: `'Form 4|YYYY-MM-DD': [\n  { source: 'capital', data: "Name (Role): X shares action at $Y" },\n]`,
        targetFileNotes: 'capital.ts: add note to CAPITAL_METADATA or relevant shareholder entry.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'Form 4', description: 'Name: ~X Shares Action ($YM)', period: '—', color: 'green' }`,
        crossRefEntry: `'Form 4|YYYY-MM-DD': [\n  { source: 'capital', data: "Name: X shares action at $Y" },\n]`,
        targetFileNotes: 'capital.ts: add note to CAPITAL_METADATA.',
      },
    },
  },

  'S-8': {
    filingType: 'S-8',
    description: 'Employee share plan registration.',
    typicalTargetFiles: ['sec-filings.ts', 'capital.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'S-8', description: 'Plan Name Registration', period: '—', color: 'green' }`,
        crossRefEntry: `'S-8|YYYY-MM-DD': [\n  { source: 'capital', data: "Plan registered for X shares" },\n]`,
        targetFileNotes: 'capital.ts: note in CAPITAL_METADATA.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'S-8', description: 'Plan Name Registration', period: '—', color: 'cyan' }`,
        crossRefEntry: `'S-8|YYYY-MM-DD': [\n  { source: 'capital', data: "Plan registered" },\n  { source: 'timeline', data: "S-8 filed for plan" },\n]`,
        targetFileNotes: 'capital.ts: note in CAPITAL_METADATA. timeline-events.ts: add SEC Filing category entry.',
      },
    },
  },

  'S-3': {
    filingType: 'S-3',
    description: 'Shelf registration statement (enables future offerings).',
    typicalTargetFiles: ['sec-filings.ts', 'capital.ts', 'catalysts.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'S-3ASR', description: 'Shelf: X shares for resale', period: '—', color: 'green' }`,
        crossRefEntry: `'S-3ASR|YYYY-MM-DD': [\n  { source: 'capital', data: "X shares registered for resale" },\n]`,
        targetFileNotes: 'capital.ts: note potential dilution. catalysts.ts: add if material.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'S-3ASR', description: '$X ATM+ Shelf Registration', period: '—', color: 'green' }`,
        crossRefEntry: `'S-3ASR|YYYY-MM-DD': [\n  { source: 'capital', data: "$X shelf registered" },\n  { source: 'catalysts', data: "ATM program capacity" },\n]`,
        targetFileNotes: 'capital.ts: update ATM capacity. catalysts.ts: add/update ATM catalyst.',
      },
    },
  },

  'DEF 14A': {
    filingType: 'DEF 14A',
    description: 'Definitive proxy statement (shareholder voting).',
    typicalTargetFiles: ['sec-filings.ts', 'capital.ts', 'catalysts.ts'],
    perTicker: {
      asts: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'DEF 14A', description: 'Proxy: Key proposals', period: '—', color: 'green' }`,
        crossRefEntry: `'DEF 14A|YYYY-MM-DD': [\n  { source: 'capital', data: "Proposal details" },\n]`,
        targetFileNotes: 'capital.ts: update authorized shares if proposal approved. catalysts.ts: add meeting date.',
      },
      bmnr: {
        secFilingEntry: `{ date: 'MMM DD, YYYY', type: 'DEF 14A', description: 'Definitive Proxy (Key proposals)', period: '—', color: 'cyan' }`,
        crossRefEntry: `'DEF 14A|YYYY-MM-DD': [\n  { source: 'capital', data: "Proxy proposals" },\n  { source: 'catalysts', data: "Meeting date and key votes" },\n]`,
        targetFileNotes: 'capital.ts: authorized share changes. catalysts.ts: meeting date and outcome.',
      },
    },
  },
};
