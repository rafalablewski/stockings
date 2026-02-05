/**
 * ASTS SPACEMOBILE - COMPETITOR INTELLIGENCE
 * ================================================
 *
 * Tracking competitor activities in the satellite direct-to-device space.
 *
 * KEY COMPETITORS:
 * - Amazon Kuiper: LEO broadband (terminal-based, not D2D)
 * - SpaceX Starlink: LEO broadband + D2D partnership with T-Mobile
 * - Lynk Global: D2D texting/messaging focused
 * - Apple/Globalstar: Emergency SOS (iPhone only)
 *
 * DATA SOURCES:
 * - Company press releases
 * - FCC filings
 * - Industry news
 *
 * LAST UPDATED: 2026-02-05
 * NEXT UPDATE: After significant competitor announcements
 *
 * AI AGENT INSTRUCTIONS:
 * When adding competitor news:
 * 1. Add at the BEGINNING of the array (newest first)
 * 2. Include URL when available
 * 3. Assess impact from ASTS perspective:
 *    - "Bullish" = Good for ASTS (competitor struggles, ASTS differentiation)
 *    - "Bearish" = Bad for ASTS (competitor wins, ASTS challenged)
 *    - "Neutral" = No clear impact on ASTS thesis
 */

import type { CompetitorNewsEntry, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const COMPETITORS_METADATA: DataMetadata = {
  lastUpdated: '2026-02-05',
  source: 'Company press releases, FCC filings, industry news',
  nextExpectedUpdate: 'After significant competitor announcements',
  notes: 'Focus on D2D satellite competitors and LEO broadband players',
};

// ============================================================================
// COMPETITOR NEWS
// ============================================================================

/**
 * Competitor news tracking - newest first
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries at the beginning
 * - Include URL when provided
 * - Assess competitive implications for ASTS
 */
export const COMPETITOR_NEWS: CompetitorNewsEntry[] = [
  // === NOVEMBER 2021 ===
  {
    date: '2021-11-01',
    competitor: 'Amazon Kuiper',
    category: 'Launch',
    headline: 'Amazon Kuiper Announces KuiperSat-1 and KuiperSat-2 Prototype Satellites',
    summary: 'Amazon files FCC application to launch two prototype satellites (KuiperSat-1 and KuiperSat-2) for Project Kuiper LEO broadband constellation. Satellites will test communications and networking technology including phased array and parabolic antennas, power/propulsion systems, and custom modems. Also testing low-cost customer terminals. Partnership with ABL Space Systems for RS1 rocket launches from Cape Canaveral. Rajeev Badyal, VP Technology: "We\'ve invented lots of new technology to meet our cost and performance targets. All systems testing well in simulated and lab settings, and we\'ll soon be ready to see how they perform in space." Amazon committed to responsible space stewardship with active deorbit plans and working with astronomers on satellite visibility (one prototype includes sunshade testing). Over 750 people working on Project Kuiper with plans to add hundreds more.',
    astsImplication: 'Amazon Kuiper is a terminal-based LEO broadband system (like Starlink), NOT direct-to-device. Requires dishes/terminals for connectivity - fundamentally different market than ASTS\'s unmodified smartphone approach. Kuiper targets underserved broadband (home/business internet), while ASTS targets mobile subscribers in coverage gaps. Not direct competition for ASTS\'s D2D mobile use case. However, Amazon\'s deep pockets and scale could make them a long-term threat if they pivot to D2D.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },
];
