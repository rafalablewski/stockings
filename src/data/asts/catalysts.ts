/**
 * ASTS SPACEMOBILE - CATALYSTS & MILESTONES
 * ================================================
 *
 * Upcoming catalysts and completed milestones.
 *
 * DATA SOURCES:
 * - Upcoming: Press releases, earnings calls, investor presentations
 * - Completed: Historical press releases, SEC filings
 *
 * LAST UPDATED: 2026-01-16
 * NEXT UPDATE: After each milestone completion or new catalyst announcement
 *
 * AI AGENT INSTRUCTIONS:
 * When a catalyst is completed:
 * 1. Remove from UPCOMING_CATALYSTS array
 * 2. Add to COMPLETED_MILESTONES array with completion date
 * 3. Update timeline if significant
 *
 * When adding new catalysts:
 * 1. Set appropriate timeline (Q1 2026, 2026, Late 2026, etc.)
 * 2. Set impact level: Critical > High > Medium > Low
 * 3. Add category for filtering
 */

import type { Catalyst, CompletedMilestone, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CATALYSTS_METADATA: DataMetadata = {
  lastUpdated: '2026-01-16',
  source: 'Q3 2025 earnings call and press releases',
  nextExpectedUpdate: 'After Q4 2025 earnings (~March 2026)',
  notes: 'MDA SHIELD prime contract awarded Jan 16, 2026',
};

// ============================================================================
// UPCOMING CATALYSTS
// ============================================================================

/**
 * Future events that could impact stock price
 *
 * AI AGENT INSTRUCTIONS:
 * - Keep sorted by expected timeline
 * - Update timeline if company provides new guidance
 * - Move to COMPLETED_MILESTONES when event occurs
 * - Impact levels:
 *   - Critical: Binary outcomes that define company success
 *   - High: Significant revenue or strategic value
 *   - Medium: Important but incremental progress
 *   - Low: Nice to have, limited near-term impact
 */
export const UPCOMING_CATALYSTS: Catalyst[] = [
  // === LAUNCHES & CONSTELLATION ===
  {
    event: 'BB6 Unfolding Phased Array',
    timeline: 'Q1 2026',
    impact: 'High',
    category: 'Constellation',
  },
  {
    event: 'BB7 Launch (Blue Origin New Glenn or SpaceX F9)',
    timeline: 'Q1 2026',
    impact: 'High',
    category: 'Constellation',
  },
  {
    event: 'BB8-BB10 Delivery & Launch (Falcon 9)',
    timeline: 'Q1 2026',
    impact: 'High',
    category: 'Constellation',
  },
  {
    event: 'BB11-BB13 Delivery & Launch (Falcon 9)',
    timeline: 'Q1-Q2 2026',
    impact: 'High',
    category: 'Constellation',
  },
  {
    event: 'Block-2 Launches (3x, 4x or 8x batches every 1-2 mo)',
    timeline: '2026',
    impact: 'High',
    category: 'Constellation',
  },
  {
    event: 'Production Ramp to 6x Satellites/Month',
    timeline: '2026',
    impact: 'Medium',
    category: 'Constellation',
  },
  {
    event: 'Progress on 8-25x Block-2 BlueBirds in Production',
    timeline: '2026',
    impact: 'Medium',
    category: 'Constellation',
  },
  {
    event: 'New Midland TX Manufacturing (Micron-focused)',
    timeline: '2026',
    impact: 'Medium',
    category: 'Constellation',
  },

  // === REGULATORY & SPECTRUM ===
  {
    event: 'FCC Full US SCS Commercial Service Approval',
    timeline: 'Q1 2026',
    impact: 'Critical',
    category: 'Regulatory',
  },
  {
    event: 'FCC 5G Fund Grant',
    timeline: '2026',
    impact: 'High',
    category: 'Regulatory',
  },
  {
    event: 'FCC PNT Service Proposal (GPS Alternative)',
    timeline: '2026',
    impact: 'Medium',
    category: 'Regulatory',
  },
  {
    event: 'EU 2GHz MSS Spectrum Allocation (SatCo JV)',
    timeline: '2026',
    impact: 'High',
    category: 'Regulatory',
  },
  {
    event: 'L-Band & S-Band Spectrum Licenses (Global)',
    timeline: '2026+',
    impact: 'Medium',
    category: 'Regulatory',
  },

  // === COMMERCIAL & MNO PARTNERSHIPS ===
  {
    event: 'FirstNet Investment & Definitive Agreement',
    timeline: '2026',
    impact: 'Critical',
    category: 'Commercial',
  },
  {
    event: 'Bell Canada, Telefonica, Etisalat + 50 MNO Deals',
    timeline: '2026',
    impact: 'High',
    category: 'Commercial',
  },
  {
    event: 'AT&T/FirstNet Beta Testing',
    timeline: '1H 2026',
    impact: 'High',
    category: 'Commercial',
  },
  {
    event: 'Google Services Partnership Update',
    timeline: '2026',
    impact: 'Medium',
    category: 'Commercial',
  },
  {
    event: 'Unlock $20M/$25M/$65M Prepayments (AT&T/VZ/VOD)',
    timeline: '2026',
    impact: 'Medium',
    category: 'Commercial',
  },

  // === SERVICE LAUNCH & REVENUE ===
  {
    event: 'Initial Intermittent Service (US/Canada/Japan/UK/Saudi)',
    timeline: '2026',
    impact: 'Critical',
    category: 'Service',
  },
  {
    event: 'Initial Commercial Service (AT&T/Rakuten/VZ/VOD)',
    timeline: 'Late 2026',
    impact: 'Critical',
    category: 'Service',
  },
  {
    event: '$50-75M Revenue Delivery',
    timeline: '2H 2025',
    impact: 'High',
    category: 'Service',
  },

  // === GOVERNMENT & DEFENSE ===
  {
    event: 'Additional Golden Dome / MDA Task Orders',
    timeline: '2026',
    impact: 'High',
    category: 'Government',
  },
  {
    event: 'DoD/SDA/DIU Contract Expansion (9x+)',
    timeline: '2026',
    impact: 'High',
    category: 'Government',
  },

  // === FINANCING & COVERAGE ===
  {
    event: '$500M+ EXIM/IFC Non-Dilutive Funding',
    timeline: '2026',
    impact: 'High',
    category: 'Financing',
  },
  {
    event: 'GS/MS/Stifel Research Coverage Initiation',
    timeline: '2026',
    impact: 'Medium',
    category: 'Financing',
  },

  // === STRATEGIC ===
  {
    event: 'AI Data Center Strategic Partnerships',
    timeline: '2026+',
    impact: 'Medium',
    category: 'Strategic',
  },
  {
    event: 'Catalysts SpaceMob Has Yet to Contemplate',
    timeline: '???',
    impact: 'Unknown',
    category: 'Strategic',
  },
];

// ============================================================================
// COMPLETED MILESTONES
// ============================================================================

/**
 * Historical achievements and completed catalysts
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries at the top (most recent first)
 * - Include specific dates when known
 * - Move from UPCOMING_CATALYSTS when completed
 */
export const COMPLETED_MILESTONES: CompletedMilestone[] = [
  // === 2026 ===
  { event: 'MDA SHIELD Prime Contract Award', date: 'Jan 16, 2026', category: 'Government' },

  // === 2025 ===
  { event: 'BB6 Launched (ISRO)', date: 'Dec 24, 2025', category: 'Constellation' },
  { event: '$1B+ Contracted Revenue', date: 'Q3 2025', category: 'Commercial' },
  { event: 'Verizon Definitive Agreement', date: 'Oct 2025', category: 'Commercial' },
  { event: 'stc $1.8B Agreement', date: 'Q3 2025', category: 'Commercial' },
  { event: '$1.15B Convertible Notes', date: 'Oct 2025', category: 'Financing' },
  { event: 'Russell 1000 Inclusion', date: 'Jun 2025', category: 'Corporate' },
  { event: 'SatCo JV (Vodafone EU)', date: '2025', category: 'Commercial' },
  { event: 'FirstNet Trial FCC Approval', date: 'Apr 2025', category: 'Regulatory' },
  { event: 'First VoLTE Call', date: '2025', category: 'Technology' },

  // === 2024 ===
  { event: 'Vodafone Extension to 2034', date: 'Dec 2024', category: 'Commercial' },
  { event: 'BB1-5 Launched (SpaceX)', date: 'Sep 12, 2024', category: 'Constellation' },
  { event: 'FCC BB1-5 License Granted', date: 'Aug 5, 2024', category: 'Regulatory' },
  { event: 'Verizon $100M Commitment', date: 'May 29, 2024', category: 'Commercial' },
  { event: 'AT&T Definitive Agreement', date: 'May 15, 2024', category: 'Commercial' },
  { event: 'ASIC Tape-out Complete (TSMC)', date: 'Q2 2024', category: 'Technology' },
  { event: 'Google Cloud Partnership', date: 'Jan 2024', category: 'Commercial' },

  // === 2023 ===
  { event: 'First 5G Connection (14 Mbps)', date: 'Sep 2023', category: 'Technology' },
  { event: 'First D2C Voice Call', date: 'Apr 25, 2023', category: 'Technology' },
  { event: 'BW3 4G/LTE Demo (10+ Mbps)', date: 'Q1 2023', category: 'Technology' },
  { event: 'Rakuten MOU', date: '2023', category: 'Commercial' },

  // === 2022 ===
  { event: 'BW3 Antenna Deployed (693 sq ft)', date: 'Nov 2022', category: 'Constellation' },
  { event: 'BW3 Launched (SpaceX)', date: 'Sep 10, 2022', category: 'Constellation' },
  { event: 'NanoAvionics Sale ($26.6M)', date: 'Sep 2022', category: 'Corporate' },
  { event: 'SPAC Merger Complete (NPA)', date: 'Apr 2022', category: 'Corporate' },

  // === 2021 ===
  { event: 'Vodafone Partnership', date: '2021', category: 'Commercial' },
  { event: 'AT&T MOU', date: '2021', category: 'Commercial' },

  // === 2019-2020 ===
  { event: 'BlueWalker 1 Launched', date: 'Apr 2019', category: 'Constellation' },
  { event: 'AST SpaceMobile Founded', date: '2017', category: 'Corporate' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get catalysts by impact level
 */
export const getCatalystsByImpact = (impact: Catalyst['impact']): Catalyst[] => {
  return UPCOMING_CATALYSTS.filter(c => c.impact === impact);
};

/**
 * Get catalysts by category
 */
export const getCatalystsByCategory = (category: string): Catalyst[] => {
  return UPCOMING_CATALYSTS.filter(c => c.category === category);
};

/**
 * Get all unique catalyst categories
 */
export const getCatalystCategories = (): string[] => {
  return [...new Set(UPCOMING_CATALYSTS.map(c => c.category).filter(Boolean) as string[])];
};
