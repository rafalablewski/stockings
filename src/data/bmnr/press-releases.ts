/**
 * BMNR (BITMINE) - PRESS RELEASES
 * ================================================
 *
 * Tracking company press releases from BitMine IR page.
 * The `tracked` field indicates whether the press release content
 * has been integrated into the relevant database tabs (competitor news,
 * timeline, catalysts, financials, etc.).
 *
 * DATA SOURCES:
 * - BitMine Immersion Technologies Investor Relations
 * - PR Newswire / Business Wire
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: After new press releases
 *
 * AI AGENT INSTRUCTIONS:
 * 1. Add new entries at the BEGINNING of the array (newest first)
 * 2. Set tracked: false for new releases not yet reflected in the database
 * 3. After integrating content into relevant tabs, set tracked: true
 * 4. Include URL to original press release when available
 */

import type { PressRelease, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const PRESS_RELEASES_METADATA: DataMetadata = {
  lastUpdated: '2026-03-18',
  source: 'PRNewswire + SEC EDGAR 8-K filings',
  nextExpectedUpdate: 'After new press releases',
};

// ============================================================================
// PRESS RELEASES (newest first)
// ============================================================================

export const PRESS_RELEASES: PressRelease[] = [
  { date: '2026-03-17', headline: 'Tom Lee Investor Presentation (Hong Kong) — 8-K Reg FD', url: '', tracked: false },
  { date: '2026-03-16', headline: 'ETH Holdings Reach 4,595,562 — $11.5B Total, 3.81% Supply, 76% to Alchemy of 5%', url: 'https://www.prnewswire.com/news-releases/bitmine-immersion-technologies-bmnr-announces-eth-holdings-reach-4-596-million-tokens-and-total-crypto-and-total-cash-holdings-of-11-5-billion-302714219.html', tracked: false },
  { date: '2026-03-12', headline: 'Eightco (ORBS) Secures $125M: BMNR $75M Lead + ARK $25M + Payward $25M', url: '', tracked: false },
  { date: '2026-03-09', headline: 'ETH Holdings Reach 4,534,563 — $10.3B Total, 3.76% Supply, 75% to Alchemy of 5%', url: '', tracked: false },
  { date: '2026-03-02', headline: 'ETH Holdings Reach 4,473,587 — $9.9B Total, 3.71% Supply, 74% to Alchemy of 5%', url: '', tracked: false },
  { date: '2026-02-26', headline: 'Tom Lee Presentation — 8-K Reg FD (Ex. 99.1)', url: '', tracked: true },
];
