/**
 * ASTS SEC Filings Data
 * Extracted from ASTS.tsx for maintainability.
 * Update when new filings are processed.
 */

export const ASTS_SEC_FILINGS = [
  { date: 'Feb 11, 2026', type: '8-K', description: 'Preliminary FY 2025 Results + Convertible Notes Offering + Registered Directs', period: '—', color: 'yellow' },
  { date: 'Feb 13, 2026', type: '424B5', description: 'Registered Direct Offering #1 (1.86M shares @ $96.92; settles Feb 20)', period: '—', color: 'orange' },
  { date: 'Feb 13, 2026', type: '424B5', description: 'Registered Direct Offering #2 (4.48M shares @ $96.92; settles Feb 20)', period: '—', color: 'orange' },
  { date: 'Jan 30, 2026', type: 'SC 13G', description: 'Vanguard Group 7.68% Ownership (21.5M shares)', period: '—', color: 'green' },
  { date: 'Jan 26, 2026', type: 'Form 4', description: 'Shanti Gupta (COO) RSU Vesting Tax Withholding Amendment', period: '—', color: 'green' },
  { date: 'Jan 16, 2026', type: '8-K', description: 'Mikitani Board Resignation (Rakuten Designee)', period: '—', color: 'yellow' },
  { date: 'Dec 24, 2025', type: '8-K', description: 'BlueBird 6 Launch (First Block 2)', period: '—', color: 'yellow' },
  { date: 'Nov 10, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2025', color: 'purple' },
  { date: 'Aug 7, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q2 2025', color: 'purple' },
  { date: 'May 8, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q1 2025', color: 'purple' },
  { date: 'Mar 3, 2025', type: '10-K', description: 'Annual Report', period: 'FY 2024', color: 'blue' },
  { date: 'Feb 27, 2025', type: '8-K', description: 'Q4 2024 Earnings Release', period: '—', color: 'yellow' },
  { date: 'Nov 6, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2024', color: 'purple' },
  { date: 'Sep 12, 2024', type: '8-K', description: 'BB1-5 Commercial Launch', period: '—', color: 'yellow' },
  { date: 'Aug 7, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q2 2024', color: 'purple' },
  { date: 'May 10, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q1 2024', color: 'purple' },
  { date: 'Apr 16, 2024', type: 'S-3', description: '$500M ATM Shelf', period: '—', color: 'green' },
  { date: 'Mar 28, 2024', type: '10-K', description: 'Annual Report', period: 'FY 2023', color: 'blue' },
];

export const ASTS_SEC_META = {
  cik: '0001780312',
  secFileNumber: '001-39040',
  ein: '84-2027232',
  ticker: 'ASTS',
  exchange: 'NASDAQ',
  emergingGrowthCompany: false,
  lastPR: { date: 'February 11, 2026', title: '$1B Converts + Registered Directs + Preliminary FY 2025 Results' }
};

export const ASTS_SEC_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
  '10-Q': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
  '8-K': { bg: 'rgba(234,179,8,0.2)', text: 'var(--gold)' },
  'S-1': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
  'S-3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
  'SC 13G': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  'Form 4': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
};

export const ASTS_SEC_FILTER_TYPES = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B5', 'Other'];
