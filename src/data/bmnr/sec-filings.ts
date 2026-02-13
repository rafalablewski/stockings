/**
 * BMNR SEC Filings Data
 * Extracted from BMNR.tsx for maintainability.
 * Update when new filings are processed.
 */

export const BMNR_SEC_FILINGS = [
  { date: 'Feb 11, 2026', type: '8-K', description: 'CoinDesk Consensus 2026 Presentation (Tom Lee, Chairman)', period: '—', color: 'yellow' },
  { date: 'Feb 9, 2026', type: 'S-8', description: '2025 Omnibus Incentive Plan Registration', period: '—', color: 'cyan' },
  { date: 'Feb 9, 2026', type: '8-K', description: '4.326M ETH Holdings Update ($10.0B Total)', period: '—', color: 'yellow' },
  { date: 'Jan 28, 2026', type: '8-K', description: 'Nelson Separation Agreement (President Terminated Without Cause)', period: '—', color: 'yellow' },
  { date: 'Jan 15, 2026', type: '8-K', description: '2026 Annual Stockholder Meeting + Investor Presentation', period: '—', color: 'yellow' },
  { date: 'Jan 13, 2026', type: '10-Q', description: 'Quarterly Report (Q1 FY2026) - First Staking Revenue', period: 'Q1 2026', color: 'purple' },
  { date: 'Jan 2, 2026', type: 'DEFA14A', description: 'Proxy Solicitation - Chairman\'s Message', period: '—', color: 'cyan' },
  { date: 'Jan 2, 2026', type: '8-K', description: 'Vote YES on Auth Shares (500M→50B)', period: '—', color: 'yellow' },
  { date: 'Nov 21, 2025', type: '10-K', description: 'Annual Report (First Post-Pivot)', period: 'FY 2025', color: 'blue' },
  { date: 'Sep 22, 2025', type: '424B5', description: '$365M Registered Direct @ $70 + Warrants', period: '—', color: 'orange' },
  { date: 'Jul 9, 2025', type: 'S-3', description: '$2B ATM Shelf Registration', period: '—', color: 'green' },
  { date: 'Jul 3, 2025', type: '10-Q', description: 'Quarterly Report (Q3 FY2025)', period: 'Q3 2025', color: 'purple' },
  { date: 'Jun 30, 2025', type: '8-K', description: 'ETH Treasury Strategy Announced', period: '—', color: 'yellow' },
  { date: 'Jun 20, 2025', type: 'S-8', description: '2025 Equity Incentive Plan (3.75M shares)', period: '—', color: 'cyan' },
  { date: 'Jun 4, 2025', type: '424B5', description: 'IPO Prospectus ($18M @ $8/share)', period: '—', color: 'orange' },
  { date: 'May 27, 2025', type: 'S-1', description: 'IPO Registration Statement', period: '—', color: 'violet' },
  { date: 'Apr 14, 2025', type: '10-Q', description: 'Quarterly Report (Q2 FY2025)', period: 'Q2 2025', color: 'purple' },
];

// [PR_CHECKLIST_SECMETA] - Update lastPR with every PR!
export const BMNR_SEC_META = {
  cik: '0001829311',
  ticker: 'BMNR',
  exchange: 'NYSE American',
  lastPR: { date: 'February 11, 2026', title: 'CoinDesk Consensus 2026 Presentation (Tom Lee, Chairman)' }
};

export const BMNR_SEC_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
  '10-Q': { bg: 'rgba(100,149,237,0.2)', text: 'var(--sky)' },
  '8-K': { bg: 'rgba(234,179,8,0.2)', text: 'var(--gold)' },
  'S-1': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
  'S-3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'S-8': { bg: 'rgba(34,211,238,0.2)', text: 'var(--cyan)' },
  '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
  'DEFA14A': { bg: 'rgba(34,211,238,0.2)', text: 'var(--cyan)' },
  'DEF 14A': { bg: 'rgba(34,211,238,0.2)', text: 'var(--cyan)' },
};

export const BMNR_SEC_FILTER_TYPES = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B5'];
