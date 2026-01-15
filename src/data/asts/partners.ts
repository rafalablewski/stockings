/**
 * ASTS SPACEMOBILE - PARTNER & MNO DATA
 * ================================================
 *
 * Mobile Network Operator partnerships and revenue sources.
 *
 * DATA SOURCES:
 * - Definitive agreements: Press releases, 8-K filings
 * - MOU/LOI: Earnings calls, investor presentations
 * - Prepayments: 10-Q/10-K financial statements
 *
 * LAST UPDATED: 2025-12-30
 * NEXT UPDATE: After new partnership announcements
 *
 * AI AGENT INSTRUCTIONS:
 * When adding a new partner:
 * 1. Add to PARTNERS array with all fields
 * 2. Update status from "MOU" to "Definitive" when upgraded
 * 3. Add prepayment amounts when disclosed
 * 4. Update subs count from partner's latest earnings
 */

import type { Partner, RevenueSource, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const PARTNERS_METADATA: DataMetadata = {
  lastUpdated: '2025-12-30',
  source: 'Q3 2025 10-Q and press releases',
  nextExpectedUpdate: 'After new partnership announcements',
  notes: 'Verizon definitive Oct 2025, stc $1.8B agreement Q3 2025',
};

// ============================================================================
// MNO PARTNERS
// ============================================================================

/**
 * Mobile Network Operator partnerships
 *
 * AI AGENT INSTRUCTIONS:
 * - name: Official company name
 * - region: Primary operating region
 * - subs: Subscriber count in millions (from partner's latest report)
 * - status: "Definitive", "MOU", "LOI", or specific date
 * - prepay: Prepayment amount in millions USD
 * - spectrum: Spectrum bands being used
 * - notes: Key details, dates, or context
 */
export const PARTNERS: Partner[] = [
  {
    name: 'AT&T',
    region: 'US',
    subs: 200,
    status: 'Definitive',
    prepay: 20,
    spectrum: '850 MHz',
    notes: 'First VoLTE call. 6-year agreement.',
  },
  {
    name: 'Verizon',
    region: 'US',
    subs: 145,
    status: 'Definitive (Oct 2025)',
    prepay: 100,
    spectrum: '850 MHz',
    notes: '$100M+ commitment. Definitive Oct 2025.',
  },
  {
    name: 'Vodafone',
    region: 'EU/AF',
    subs: 500,
    status: 'Definitive (2034)',
    prepay: 25,
    spectrum: '2GHz MSS',
    notes: 'SatCo JV partner. Extended to 2034 Dec 2024.',
  },
  {
    name: 'Vodafone Idea',
    region: 'India',
    subs: 250,
    status: 'Definitive',
    prepay: 0,
    spectrum: 'TBD',
    notes: 'June 2025 announcement.',
  },
  {
    name: 'Rakuten',
    region: 'Japan',
    subs: 5,
    status: 'Definitive',
    prepay: 0,
    spectrum: 'LTE',
    notes: 'Video calls demonstrated. PIPE investor.',
  },
  {
    name: 'stc Group',
    region: 'Saudi/MENA',
    subs: 80,
    status: '10-year',
    prepay: 175,
    spectrum: 'TBD',
    notes: '$175M prepay. $1.8B total commitment Q3 2025.',
  },
  {
    name: 'Bell Canada',
    region: 'Canada',
    subs: 23,
    status: 'Definitive',
    prepay: 0,
    spectrum: 'TBD',
    notes: 'Testing phase.',
  },
  {
    name: 'Others (45+ MNOs)',
    region: 'Global',
    subs: 1997,
    status: 'MOU/LOI',
    prepay: 0,
    spectrum: 'Various',
    notes: 'Orange, Telefonica, Etisalat + 40+ others',
  },
];

// ============================================================================
// REVENUE SOURCES
// ============================================================================

/**
 * Revenue streams by source
 *
 * AI AGENT INSTRUCTIONS:
 * - Update status as revenue sources become active
 * - Update descriptions with specific amounts from 10-Q
 */
export const REVENUE_SOURCES: RevenueSource[] = [
  {
    source: 'MNO Commercial (50/50)',
    description: 'Wholesale revenue share with MNO partners',
    status: 'Post-2026',
  },
  {
    source: 'Gateway Hardware',
    description: 'Ground station sales',
    status: 'Active - Q3 $14.7M',
  },
  {
    source: 'Government Contracts',
    description: 'DoD, SDA, DIU ($63M+)',
    status: 'Active',
  },
  {
    source: 'Partner Prepayments',
    description: 'stc $175M, Verizon, AT&T',
    status: 'Active',
  },
  {
    source: 'Spectrum Rights',
    description: 'L-band, S-band monetization',
    status: 'Future',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate total prepayments from all partners
 */
export const getTotalPrepayments = (): number => {
  return PARTNERS.reduce((sum, p) => sum + p.prepay, 0);
};

/**
 * Calculate total subscriber reach
 */
export const getTotalSubscriberReach = (): number => {
  return PARTNERS.reduce((sum, p) => sum + p.subs, 0);
};

/**
 * Get partners with definitive agreements only
 */
export const getDefinitivePartners = (): Partner[] => {
  return PARTNERS.filter(p => p.status.toLowerCase().includes('definitive'));
};
