/**
 * CRCL (CIRCLE) - PRESS RELEASES
 * ================================================
 *
 * Tracking company press releases from Circle IR page.
 * The `tracked` field indicates whether the press release content
 * has been integrated into the relevant database tabs (competitor news,
 * timeline, catalysts, financials, etc.).
 *
 * DATA SOURCES:
 * - Circle Investor Relations
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
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from IR page',
  nextExpectedUpdate: 'After new press releases',
};

// ============================================================================
// PRESS RELEASES (newest first)
// ============================================================================

export const PRESS_RELEASES: PressRelease[] = [];
