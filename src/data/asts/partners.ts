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

import type { Partner, RevenueSource, DataMetadata, PartnerNewsEntry } from '../shared/types';

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
// PARTNER NEWS
// ============================================================================

/**
 * Partner ecosystem news tracking
 *
 * AI AGENT INSTRUCTIONS:
 * - Track news from ASTS MNO partners that impacts the ecosystem
 * - Focus on: IoT expansion, connected vehicle, 5G rollouts, coverage expansion
 * - Partner news shows health of ASTS's commercial partner ecosystem
 * - Relevance: How does this news impact ASTS's commercial prospects?
 */
export const PARTNER_NEWS: PartnerNewsEntry[] = [
  // === FEBRUARY 2026 ===
  {
    date: '2026-02-04',
    partner: 'Vodafone',
    category: 'IoT',
    headline: 'Vodafone IoT Partners with Hyundai Motor Group for Connected Cars in 5 Middle East Countries',
    summary: 'Hyundai Motor Group (Hyundai, Kia, Genesis) partners with Vodafone IoT to deploy regulatory-compliant in-car connectivity across Bahrain, Kingdom of Saudi Arabia, Kuwait, Qatar, and UAE. Vodafone IoT\'s Global SIM+ solution provides local network credentials, data routing, compliance with national laws, and seamless cross-border connectivity. Partnership with local network providers including e& UAE assures compliance and network resilience. Customers gain access to remote vehicle control, real-time status monitoring, and enhanced convenience services. Erik Brenneis, CEO of Vodafone IoT: "We are proud to partner with Hyundai Motor Group to deliver innovative in-car connectivity powered by our Global SIM+ which provides local credentials and a seamless cross-border service." Hyunwoo Go, Head of Connectivity Business, Hyundai Motor Group: "The launch represents a meaningful step toward delivering intelligent, personalized mobility experiences." Vodafone IoT has 220M+ devices connected across 180+ countries with 760+ network partnerships worldwide.',
    astsRelevance: 'Vodafone is a key ASTS partner with 500M subscribers and definitive agreement through 2034. Vodafone\'s expansion of IoT and connected vehicle services demonstrates growing demand for ubiquitous connectivity - exactly the use case ASTS enables in areas without terrestrial coverage. Connected vehicles traveling through remote areas would benefit from satellite direct-to-device backup connectivity. Vodafone\'s Middle East expansion aligns with ASTS\'s stc Group partnership ($1.8B commitment) in the same region.',
    impact: 'Bullish',
    source: 'PRNewswire / Vodafone'
  },

  // === SEPTEMBER 2025 ===
  {
    date: '2025-09-05',
    partner: 'Nokia',
    category: '6G/NTN',
    headline: 'Nokia: 6G Will Put Satellite Connectivity in Every Smartphone and Device',
    summary: 'Nokia outlines vision for 6G where Non-Terrestrial Networks (NTN) become a fundamental component in every device - like Wi-Fi or GPS today. Key points: (1) NTN already happening in 5G with 3GPP Release 17, enabled in Google Pixel 9 and Samsung S25 for emergency texts; (2) Release 18 adds VSAT device types and enhanced mobility for maritime/aeronautical; (3) Release 19 introduces regenerative satellite payloads; (4) 6G advancements include NTN in every single device as standard, no GNSS needed (eliminating jamming vulnerability), and seamless TN-NTN interworking. Nokia states: "The sky is no longer the limit. With 6G and NTN, we\'re building a future where connectivity is truly global - always available, always resilient and built for the moments when it matters most." This is part of Nokia\'s single technology stack vision.',
    astsRelevance: 'Nokia is ASTS\'s key network equipment partner providing the radio access network technology for BlueWalker 3 and BlueBird satellites. Nokia\'s vision for NTN as standard in every 6G device validates ASTS\'s entire business thesis of direct-to-device satellite connectivity. Nokia explicitly endorses NTN for: emergency response, disaster relief, bridging digital divide, remote healthcare, education, and commerce. This positions ASTS as building the infrastructure that Nokia\'s 6G vision requires. Nokia\'s 3GPP standards work directly benefits ASTS\'s technology roadmap.',
    impact: 'Bullish',
    source: 'Nokia Blog'
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
