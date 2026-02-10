/**
 * ASTS SPACEMOBILE - PRESS RELEASES
 * ================================================
 *
 * Tracking press releases from AST SpaceMobile and all D2D competitors.
 * The `tracked` field indicates whether the press release content
 * has been integrated into the relevant database tabs (partner news,
 * competitor news, timeline, catalysts, financials, etc.).
 *
 * LAST UPDATED: 2026-02-10
 * NEXT UPDATE: After new press releases
 *
 * AI AGENT INSTRUCTIONS:
 * 1. Add new entries at the BEGINNING of each array (newest first)
 * 2. Set tracked: false for new releases not yet reflected in the database
 * 3. After integrating content into relevant tabs, set tracked: true
 * 4. Keep max ~5 entries per company (drop oldest when adding new)
 */

import type { PressRelease, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const PRESS_RELEASES_METADATA: DataMetadata = {
  lastUpdated: '2026-02-10',
  source: 'Company IR pages, PR Newswire, Business Wire, GlobeNewswire',
  nextExpectedUpdate: 'After new press releases',
  notes: 'Press releases for ASTS and all D2D competitors with analysis tracking status',
};

// ============================================================================
// ASTS PRESS RELEASES (newest first)
// ============================================================================

export const PRESS_RELEASES: PressRelease[] = [
  {
    date: '2026-01-22',
    headline: 'AST SpaceMobile Announces Timing of BlueBird 7 Orbital Launch, Advancing Direct-to-Device Cellular Broadband Connectivity',
    url: 'https://www.businesswire.com/news/home/20260122blueBird7/en/',
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

// ============================================================================
// COMPETITOR PRESS RELEASES — unified record keyed by company
// Keys match competitor IDs used in the Comps tab where applicable
// ============================================================================

// Backward compat re-exports
export const OQ_PRESS_RELEASES: PressRelease[] = [
  { date: '2026-01-20', headline: 'OQ Technology and Eseye Partner for Global 5G IoT via Seamless Satellite-Terrestrial Integration', url: 'https://www.oqtec.space', tracked: true, company: 'oq-technology' },
  { date: '2026-01-08', headline: 'Monogoto Adds OQ Technology LEO Constellation to Hybrid Connectivity Platform at CES 2026', url: 'https://www.oqtec.com', tracked: true, company: 'oq-technology' },
  { date: '2025-10-14', headline: 'OQ Technology Achieves World-First 5G NTN NB-IoT Data Call on Commercial Smartphone', url: 'https://www.oqtec.space', tracked: true, company: 'oq-technology' },
];

export const IRIDIUM_PRESS_RELEASES: PressRelease[] = [
  { date: '2026-01-22', headline: 'Iridium Announces Release Date for Fourth-Quarter and Full Year 2025 Financial Results', url: 'https://investor.iridium.com/press-releases', tracked: false, company: 'iridium' },
  { date: '2026-01-21', headline: 'On-Air Trials Underway: Iridium NTN Direct Prepares to Enter Beta as Testing Continues', url: 'https://www.iridium.com/press-release/iridium-ntn-direct-on-air-trials/', tracked: true, company: 'iridium' },
  { date: '2025-12-09', headline: 'HD Hyundai Construction Equipment Chooses Reliable, Global Connectivity with Iridium', url: 'https://investor.iridium.com/press-releases', tracked: false, company: 'iridium' },
];

export interface CompetitorPRConfig {
  label: string;
  irUrl: string;
  /** API symbol for refresh (null = static only, no feed available) */
  apiSymbol: string | null;
  data: PressRelease[];
}

export const COMPETITOR_PRESS_RELEASES: Record<string, CompetitorPRConfig> = {
  'oq-technology': {
    label: 'OQ Technology',
    irUrl: 'https://www.oqtec.space',
    apiSymbol: 'oq-technology',
    data: OQ_PRESS_RELEASES,
  },
  'iridium': {
    label: 'Iridium Communications',
    irUrl: 'https://investor.iridium.com/press-releases',
    apiSymbol: 'iridium',
    data: IRIDIUM_PRESS_RELEASES,
  },
  'skylo': {
    label: 'Skylo Technologies',
    irUrl: 'https://www.skylo.tech',
    apiSymbol: 'skylo',
    data: [
      { date: '2026-01-28', headline: 'Skylo Partners with Vodafone IoT for NTN NB-IoT Satellite Connectivity Trial', url: 'https://iot.vodafone.com/news-and-insights/vodafone-iot-partners-with-skylo', tracked: true, company: 'skylo' },
      { date: '2025-08-20', headline: 'Google/Skylo Expand Satellite Connectivity to Pixel 10 + Launch Pixel Watch 4 with Satellite SOS', url: 'https://www.skylo.tech/blog/google-and-skylo-expand-satellite-connectivity-pixel-10-pixel-watch-4', tracked: true, company: 'skylo' },
      { date: '2025-04-28', headline: 'Skylo Partners with Syniverse to Implement SMS over Satellite for Verizon', url: 'https://www.businesswire.com/news/home/20250428skylo', tracked: true, company: 'skylo' },
    ],
  },
  'lynk': {
    label: 'Lynk Global',
    irUrl: 'https://lynk.world',
    apiSymbol: 'lynk',
    data: [
      { date: '2025-10-22', headline: 'Lynk and Omnispace Announce Merger Plans — SES Becomes Major Strategic Shareholder', url: 'https://www.businesswire.com/news/home/20251022791234/en/', tracked: true, company: 'lynk' },
      { date: '2025-04-30', headline: 'FCC Grants Lynk License Modification for Commercial D2D Service in US', url: 'https://www.businesswire.com/news/home/20250430287453/en/', tracked: true, company: 'lynk' },
      { date: '2025-03-10', headline: 'SES and Lynk Global Announce Strategic Partnership with Series B Funding and MEO-Relay for D2D', url: 'https://www.ses.com', tracked: true, company: 'lynk' },
    ],
  },
  'starlink': {
    label: 'SpaceX / Starlink Direct to Cell',
    irUrl: 'https://direct.starlink.com',
    apiSymbol: 'starlink',
    data: [
      { date: '2026-02-02', headline: 'United Completes Starlink on 300+ Regional Aircraft, 800+ Total by End 2026', url: 'https://www.prnewswire.com/news-releases/united-spotlights-starlink-wi-fi-302393847.html', tracked: true, company: 'starlink' },
      { date: '2026-01-14', headline: 'Lufthansa Group Selects Starlink for 850-Aircraft Fleet', url: 'https://newsroom.lufthansagroup.com/en/new-lufthansa-group-collaboration-with-starlink-high-speed-internet-on-all-fleets-across-all-airlines/', tracked: true, company: 'starlink' },
      { date: '2026-01-08', headline: 'World\'s First Starlink-Equipped Boeing 787-8 — Qatar Airways A350 Fleet Complete', url: 'https://direct.starlink.com', tracked: true, company: 'starlink' },
    ],
  },
  'viasat': {
    label: 'Viasat',
    irUrl: 'https://investors.viasat.com/press-releases',
    apiSymbol: 'viasat',
    data: [
      { date: '2025-12-03', headline: 'Viasat/GSMA Report: 60% of Consumers Would Pay More for D2D, 47% Would Switch Providers', url: 'https://www.viasat.com', tracked: true, company: 'viasat' },
      { date: '2025-11-18', headline: 'Viasat Deploys Amara Connectivity Across Entire Etihad Airways Fleet', url: 'https://www.viasat.com', tracked: true, company: 'viasat' },
      { date: '2025-11-17', headline: 'Viasat to Integrate Telesat Lightspeed LEO into JetXP Business Aviation', url: 'https://www.viasat.com', tracked: true, company: 'viasat' },
    ],
  },
  'amazon-kuiper': {
    label: 'Amazon / Project Kuiper',
    irUrl: 'https://www.aboutamazon.com/news/amazon-leo',
    apiSymbol: 'amazon-kuiper',
    data: [
      { date: '2026-02-04', headline: 'AT&T Partners with Amazon Leo for Fixed Broadband to Business Customers', url: 'https://www.businesswire.com/news/home/20260204att-aws-amazon-leo', tracked: true, company: 'amazon-kuiper' },
      { date: '2026-02-03', headline: 'Amazon Leo Seeks 24-Month FCC Extension — Only 180 of 1,618 Sats Deployed', url: 'https://www.aboutamazon.com/news/amazon-leo', tracked: true, company: 'amazon-kuiper' },
      { date: '2026-01-30', headline: 'Amazon Leo Preparing for 8th Mission — 212 Satellites Launched, LE-01 with Arianespace Feb 12', url: 'https://www.aboutamazon.com/news/amazon-leo', tracked: true, company: 'amazon-kuiper' },
    ],
  },
  'echostar': {
    label: 'EchoStar / Hughes',
    irUrl: 'https://ir.echostar.com/press-releases',
    apiSymbol: 'echostar',
    data: [
      { date: '2025-08-01', headline: 'EchoStar Selects MDA Space for World\'s First Open RAN Broadband NTN LEO Constellation — $1.3B Contract', url: 'https://www.prnewswire.com/news-releases/echostar-selects-mda-space-for-worlds-first-open-ran-broadband-ntn-leo-constellation-302519409.html', tracked: true, company: 'echostar' },
    ],
  },
  'ses': {
    label: 'SES',
    irUrl: 'https://www.ses.com/press-releases',
    apiSymbol: 'ses',
    data: [
      { date: '2025-10-22', headline: 'SES Backs Lynk-Omnispace Merger as Major Strategic Shareholder for D2D', url: 'https://www.ses.com', tracked: true, company: 'ses' },
      { date: '2025-03-10', headline: 'SES and Lynk Global Strategic Partnership — Series B Funding and MEO-Relay', url: 'https://www.ses.com', tracked: true, company: 'ses' },
    ],
  },
  'terrestar': {
    label: 'Terrestar Solutions',
    irUrl: 'https://terrestarsolutions.ca',
    apiSymbol: 'terrestar',
    data: [
      { date: '2026-02-05', headline: 'Terrestar Launches Hybrid IoT Service on Standards-Based Open Network Platform in Canada', url: 'https://terrestarsolutions.ca', tracked: true, company: 'terrestar' },
    ],
  },
  'space42': {
    label: 'Space42 / Bayanat',
    irUrl: 'https://space42.ai',
    apiSymbol: 'space42',
    data: [
      { date: '2025-09-15', headline: 'Space42/Viasat Launch Equatys "Space Tower Company" for Global D2D Services', url: 'https://space42.ai', tracked: true, company: 'space42' },
    ],
  },
};
