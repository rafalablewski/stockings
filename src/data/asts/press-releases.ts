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
  lastUpdated: '2026-02-10',
  source: 'AST SpaceMobile Investor Relations, PR Newswire, Business Wire',
  nextExpectedUpdate: 'After new press releases',
  notes: 'Latest company press releases with tracking status for database integration',
};

// ============================================================================
// PRESS RELEASES (newest first)
// ============================================================================

export const PRESS_RELEASES: PressRelease[] = [
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
