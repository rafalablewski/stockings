/**
 * ASTS SPACEMOBILE - PRESS RELEASES
 * ================================================
 *
 * Tracking press releases from AST SpaceMobile and key competitors.
 * The `tracked` field indicates whether the press release content
 * has been integrated into the relevant database tabs (partner news,
 * competitor news, timeline, catalysts, financials, etc.).
 *
 * DATA SOURCES:
 * - AST SpaceMobile Investor Relations: https://investors.ast-science.com
 * - Iridium Communications: https://www.iridium.com/press-releases/
 * - OQ Technology: https://www.oqtec.space
 * - PR Newswire / Business Wire
 *
 * LAST UPDATED: 2026-02-10
 * NEXT UPDATE: After new press releases
 *
 * AI AGENT INSTRUCTIONS:
 * 1. Add new entries at the BEGINNING of each array (newest first)
 * 2. Set tracked: false for new releases not yet reflected in the database
 * 3. After integrating content into relevant tabs, set tracked: true
 * 4. Include URL to original press release when available
 * 5. Use the company field to identify competitor press releases
 */

import type { PressRelease, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const PRESS_RELEASES_METADATA: DataMetadata = {
  lastUpdated: '2026-02-10',
  source: 'AST SpaceMobile IR, Iridium PR, OQ Technology PR',
  nextExpectedUpdate: 'After new press releases',
  notes: 'Press releases for ASTS and tracked competitors with analysis integration status',
};

// ============================================================================
// ASTS PRESS RELEASES (newest first)
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

// ============================================================================
// OQ TECHNOLOGY PRESS RELEASES (newest first)
// Tracked against: Comps tab competitor news (competitor: 'oq-technology')
// ============================================================================

export const OQ_PRESS_RELEASES: PressRelease[] = [
  {
    date: '2026-01-20',
    headline: 'OQ Technology and Eseye Partner for Global 5G IoT via Seamless Satellite-Terrestrial Integration',
    url: 'https://www.oqtec.space',
    tracked: true,
    company: 'oq-technology',
  },
  {
    date: '2026-01-08',
    headline: 'Monogoto Adds OQ Technology LEO Constellation to Hybrid Connectivity Platform at CES 2026',
    url: 'https://www.oqtec.com',
    tracked: true,
    company: 'oq-technology',
  },
  {
    date: '2025-10-14',
    headline: 'OQ Technology Achieves World-First 5G NTN NB-IoT Data Call on Commercial Smartphone',
    url: 'https://www.oqtec.space',
    tracked: true,
    company: 'oq-technology',
  },
];

// ============================================================================
// IRIDIUM COMMUNICATIONS PRESS RELEASES (newest first)
// Tracked against: Comps tab competitor news (competitor: 'iridium')
// ============================================================================

export const IRIDIUM_PRESS_RELEASES: PressRelease[] = [
  {
    date: '2026-01-21',
    headline: 'Iridium NTN Direct Begins On-Air Testing — First Two-Way Message Transmission',
    url: 'https://www.iridium.com/press-release/iridium-ntn-direct-on-air-trials/',
    tracked: true,
    company: 'iridium',
  },
  {
    date: '2025-11-04',
    headline: 'Vodafone IoT Partners with Iridium for NTN NB-IoT Global Connectivity',
    url: 'https://www.iridium.com/blog/vodafone-iot-partnership/',
    tracked: true,
    company: 'iridium',
  },
  {
    date: '2025-09-16',
    headline: 'Iridium Begins NTN Direct Integration with Deutsche Telekom',
    url: 'https://www.iridium.com',
    tracked: true,
    company: 'iridium',
  },
];
