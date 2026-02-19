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
 * LAST UPDATED: 2026-01-22
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
  lastUpdated: '2026-02-15',
  source: 'Q3 2025 earnings call, Feb 2026 8-K, BB6 unfolding PR, Mar 2025 8-Ks/Form 4s/S-3ASR/S-8/13D-A, Jan-Feb 2025 8-Ks/13D/Form 3s/13D-A',
  nextExpectedUpdate: 'After Q4 2025 earnings (~March 2026)',
  notes: 'BB6 unfolded Feb 10, 2026. $1B new converts + $614M registered directs announced Feb 11. Jan-Feb 2025: AT&T 13D (2.7%), Ligado RSA ($550M), Johnson/Larson board, Bernal 50K RSU, prelim Q4 ($1M first revenue).',
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
    event: 'BB7 Launch (New Glenn, Cape Canaveral)',
    timeline: 'Late Feb 2026',
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
    event: 'Q4 2025 10-K Filing & Full Year Financials',
    timeline: 'March 2026',
    impact: 'Medium',
    category: 'Financing',
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
  { event: '$1B 2.25% Convertible Notes Indenture Settled (U.S. Bank Trust trustee; ~$983.7M net)', date: 'Feb 17, 2026', category: 'Financing' },
  { event: 'Vodafone SC 13D/A: Dropped below 5% threshold (dilution, no sales; 14.5M shares)', date: 'Feb 17, 2026', category: 'Corporate' },
  { event: '$1B 2.25% Convertible Notes + $614M Registered Directs + $296.5M Notes Repurchased', date: 'Feb 11, 2026', category: 'Financing' },
  { event: 'BB6 Phased Array Unfolded (~2,400 sq ft, largest commercial LEO array)', date: 'Feb 10, 2026', category: 'Constellation' },
  { event: 'FY 2025 Revenue $63-71M (8-K preliminary)', date: 'Feb 11, 2026', category: 'Service' },
  { event: 'Vanguard 13G: 7.68% Ownership (21.5M shares)', date: 'Jan 30, 2026', category: 'Corporate' },
  { event: 'Rakuten Designee Right Expired (dilution threshold); Rakuten retains board observer', date: 'Jan 13, 2026', category: 'Corporate' },
  { event: 'MDA SHIELD Prime Contract Award', date: 'Jan 16, 2026', category: 'Government' },

  // === 2025 ===
  { event: 'BB6 Launched (ISRO)', date: 'Dec 24, 2025', category: 'Constellation' },
  { event: 'EllioSat Resale Prospectus (424B7): 581K shares registered (~0.2% float)', date: 'Sep 26, 2025', category: 'Corporate' },
  { event: 'Mikitani Resigned from Board (personal, no disagreement; 8-K Sep 5)', date: 'Sep 4, 2025', category: 'Corporate' },
  { event: 'EllioSat Acquired from CCUR Holdings (S-Band spectrum/tech; 581K shares issued)', date: 'Aug 5, 2025', category: 'Spectrum' },
  { event: '$347M Registered Direct (5.78M shares at $60.06) + $46.5M 4.25% Notes Repurchased', date: 'Jul 24, 2025', category: 'Financing' },
  { event: '$345M UBS Credit Facility (expandable $500M; SOFR+5%; maturity 2028)', date: 'Jul 15, 2025', category: 'Financing' },
  { event: 'Annual Meeting: Directors, Incentive Plan, Auditors Approved', date: 'Jun 27, 2025', category: 'Corporate' },
  { event: 'Cisneros (Dir) + Johnson (CFO) Open Market Purchases at $25', date: 'Jun 24, 2025', category: 'Capital' },
  { event: 'Cisneros (Dir) 1K Purchase at $25 (Jun 9, trust)', date: 'Jun 9, 2025', category: 'Capital' },
  { event: 'Certificate Amendment: Authorized Class A +100M (700M→800M)', date: 'Jun 6, 2025', category: 'Corporate' },
  { event: 'Wisniewski (Pres) 125K RSU Grant + Gupta (COO) 50K RSU Vesting', date: 'Jun 2, 2025', category: 'Corporate' },
  { event: 'Yao (CTO) 40K Option Exercise at $0.06 (→ LLC Units)', date: 'May 17, 2025', category: 'Corporate' },
  { event: 'Q2 2025 10-Q/A Amendment (non-cash equity corrections, no restatement)', date: 'Sep 12, 2025', category: 'Financing' },
  { event: '$1B+ Contracted Revenue', date: 'Q3 2025', category: 'Commercial' },
  { event: 'Verizon Definitive Agreement', date: 'Oct 2025', category: 'Commercial' },
  { event: 'stc $1.8B Agreement', date: 'Q3 2025', category: 'Commercial' },
  { event: '$1.15B Convertible Notes ($850M upsized + $150M greenshoe)', date: 'Oct 2025', category: 'Financing' },
  { event: 'Block 2 Contract (~$100M initial)', date: 'Oct 29, 2025', category: 'Constellation' },
  { event: '$800M ATM Program + $161M Registered Direct', date: 'Oct 21, 2025', category: 'Financing' },
  { event: '2024 Equity Incentive Plan Amendment (+10M shares)', date: 'Nov 21, 2025', category: 'Corporate' },
  { event: 'Russell 1000 Inclusion', date: 'Jun 2025', category: 'Corporate' },
  { event: 'SatCo JV (Vodafone EU)', date: '2025', category: 'Commercial' },
  { event: '$500M Equity Distribution Program (ATM via B. Riley)', date: 'May 13, 2025', category: 'Financing' },
  { event: 'BlackRock 13G/A: 5.2% Stake (14.86M shares)', date: 'Apr 28, 2025', category: 'Corporate' },
  { event: 'DEF 14A Proxy Filed (5.4M share incentive plan, annual meeting Jun 6)', date: 'Apr 25, 2025', category: 'Corporate' },
  { event: 'Cisneros (Dir) + Johnson (CFO) Purchases at $25 (Apr 4)', date: 'Apr 4, 2025', category: 'Capital' },
  { event: 'Ligado Material Agreement ($150M initial + 9.99% warrants; $550M total for 45 MHz L-band)', date: 'Mar 24, 2025', category: 'Spectrum' },
  { event: 'S-3ASR: 56M Shares Registered for Resale (Rakuten reorg + others)', date: 'Mar 17, 2025', category: 'Financing' },
  { event: 'Vodafone 13D/A: 6% Ownership Stable (14.5M shares)', date: 'Mar 12, 2025', category: 'Corporate' },
  { event: 'S-8: 2M Shares Registered (2024 Incentive Plan Annual Increase)', date: 'Mar 5, 2025', category: 'Corporate' },
  { event: 'Bernal (CAO) 50K RSU Grant (vest Feb 15, 2026)', date: 'Feb 27, 2025', category: 'Corporate' },
  { event: 'AT&T 13D: 2.7% Ownership (6.26M shares from $100M convertible at $16)', date: 'Feb 10, 2025', category: 'Corporate' },
  { event: 'Stockholders\' Agreement Amended: AT&T added; designee rights if >10%', date: 'Feb 7, 2025', category: 'Corporate' },
  { event: 'Johnson (CFO/CLO) Appointed to Board (Class II) + Larson Director (Jan 31)', date: 'Feb 3, 2025', category: 'Corporate' },
  { event: 'Preliminary Q4 2024: Revenue $1M (first ever), $285M cash', date: 'Jan 22, 2025', category: 'Financing' },
  { event: 'Avellan 13D/A: 25% Ownership (78.16M shares, Amendment 12)', date: 'Jan 27, 2025', category: 'Corporate' },
  { event: 'Ligado RSA ($150M + 9.99% warrants; $550M total; 45 MHz L-band)', date: 'Jan 6, 2025', category: 'Spectrum' },
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
