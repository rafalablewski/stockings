/**
 * ASTS SPACEMOBILE - PRESS RELEASES
 * ================================================
 *
 * Tracking company press releases from AST SpaceMobile IR page.
 * The `tracked` field indicates whether the press release content
 * has been integrated into the relevant database tabs (partner news,
 * competitor news, timeline, catalysts, financials, etc.).
 *
 * DATA SOURCES:
 * - AST SpaceMobile Investor Relations: https://investors.ast-science.com
 * - PR Newswire / Business Wire
 *
 * LAST UPDATED: 2026-02-10
 * NEXT UPDATE: After new press releases
 *
 * AI AGENT INSTRUCTIONS:
 * 1. Add new entries at the BEGINNING of the array (newest first)
 * 2. Set tracked: false for new releases not yet reflected in the database
 * 3. After integrating content into relevant tabs, set tracked: true
 * 4. Include URL to original press release when available
 * 5. Only track official AST SpaceMobile press releases (not partner/competitor PRs)
 */

import type { PressRelease, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const PRESS_RELEASES_METADATA: DataMetadata = {
  lastUpdated: '2026-02-12',
  source: 'AST SpaceMobile Investor Relations, PR Newswire, Business Wire, SEC EDGAR',
  nextExpectedUpdate: 'After new press releases',
  notes: 'Feb 2026: BB6 unfolding, $1B converts, registered directs, 8-K financials, Mikitani resignation',
};

// ============================================================================
// PRESS RELEASES (newest first)
// ============================================================================

export const PRESS_RELEASES: PressRelease[] = [
  {
    date: '2026-02-11',
    headline: 'AST SpaceMobile Announces Offering of $1.0 Billion Convertible Senior Notes Due 2036 and Concurrent Registered Direct Offerings',
    url: 'https://investors.ast-science.com',
    tracked: true,
  },
  {
    date: '2026-02-11',
    headline: 'AST SpaceMobile Reports Preliminary FY 2025 Results: Revenue $63-71M, Cash $2.78B, Debt $2.26B (8-K)',
    url: 'https://investors.ast-science.com',
    tracked: true,
  },
  {
    date: '2026-02-10',
    headline: 'AST SpaceMobile Successfully Unfolds BlueBird 6 Satellite — Largest Commercial LEO Array (~2,400 sq ft)',
    url: 'https://investors.ast-science.com',
    tracked: true,
  },
  {
    date: '2026-01-13',
    headline: 'Hiroshi Mikitani Resigns from Board of Directors (Rakuten Designee) — Board Reduced to 11 (8-K)',
    url: 'https://investors.ast-science.com',
    tracked: true,
  },
  {
    date: '2025-06-13',
    headline: 'AST SpaceMobile Announces Settlement Term Sheet for 45 MHz L-Band Spectrum from Ligado — $550M Deal',
    url: 'https://www.businesswire.com/news/home/20250613520945/en/',
    tracked: true,
  },
  {
    date: '2025-01-29',
    headline: 'AST SpaceMobile and Vodafone Make World\'s First Space Video Call Using Standard Smartphones',
    url: 'https://investors.ast-science.com',
    tracked: true,
  },
  {
    date: '2024-09-12',
    headline: 'AST SpaceMobile Successfully Launches First Five Commercial BlueBird Satellites',
    url: 'https://investors.ast-science.com',
    tracked: true,
  },
];
