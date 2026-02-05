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

  // === OCTOBER 2025 ===
  {
    date: '2025-10-02',
    partner: 'Vodafone',
    category: 'Partnership',
    headline: 'Vodafone, AST SpaceMobile, and University of Málaga Open Europe\'s First Space-Land Network Lab',
    summary: 'Vodafone, AST SpaceMobile, and University of Málaga opened Europe\'s first research laboratory dedicated to developing integrated LEO space and land-based mobile broadband services. Located at Vodafone\'s European innovation centre in Málaga, Spain, supported by initial grant from Spanish Space Agency. First project: collaboration with Meta to optimize WhatsApp audio/video calls for hybrid space-terrestrial networks. Lab will test/validate hardware and software for seamless satellite-to-4G/5G handoffs using existing smartphones. Results feed into SatCo joint venture, which has received expressions of interest from operators in 21 EU member states. Nadia Benabdallah, Vodafone: "Building harmonious space and earth networks to close coverage gaps across Europe. This will advance national and European-wide digital sovereignty." Chris Ivory, AST SpaceMobile CCO: "This innovation hub demonstrates what\'s possible when visionary partners come together with a shared commitment to eliminate connectivity gaps once and for all."',
    astsRelevance: 'Major milestone for ASTS European commercial strategy. Lab validates deep Vodafone partnership and path to SatCo joint venture commercialization. Meta collaboration (WhatsApp optimization) shows real-world app preparation for commercial launch. Spanish Space Agency support demonstrates government backing. 21 EU member states expressing interest in SatCo shows massive European market opportunity. This is infrastructure building for European commercial service.',
    impact: 'Bullish',
    source: 'Vodafone',
    url: 'https://www.vodafone.com/news/newsroom/technology/vodafone-ast-space-mobile-and-the-university-of-malaga-open-the-doors-to-europe-s-first-space-and-land-based-network-lab'
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

  // === JANUARY 2025 ===
  {
    date: '2025-01-29',
    partner: 'Vodafone',
    category: 'Milestone',
    headline: 'Vodafone Makes World\'s First Space Video Call Using Standard Smartphones and AST SpaceMobile BlueBird Satellites',
    summary: 'Vodafone engineer Rowan Chesmer made historic first space video call from remote Wales (no mobile coverage) to Vodafone CEO Margherita Della Valle in Newbury, UK. Astronaut Tim Peake joined for unveiling of first European space-to-land gateway connecting BlueBird satellites to Vodafone\'s terrestrial network. Key achievements: (1) World\'s first space video call using standard 4G/5G smartphones; (2) Only satellite service offering mobile broadband to multiple normal smartphones; (3) Users get full mobile broadband - video calls, internet, messaging - without special dishes or satellite phones; (4) Seamless switching between space and ground networks. Margherita Della Valle: "Vodafone\'s job is to get everyone connected, no matter where they are. Our advanced European 5G network will now be complemented with cutting-edge satellite technology." Abel Avellan: "This historic milestone marks another significant step forward in our partnership with Vodafone... Together, we have achieved several world firsts including first-ever space-based voice call, first-ever 4G download above 10 Mbps, and first-ever 5G voice call." Commercial launch planned for Europe later 2025 and 2026.',
    astsRelevance: 'This is ASTS\'s technology in action with their key European partner Vodafone. The milestone validates ASTS\'s entire value proposition: standard smartphones, full mobile broadband (not just texts), multiple simultaneous users, seamless network switching. The European gateway infrastructure positions ASTS for commercial service across Europe. Vodafone has been an ASTS investor since 2019 and this demonstrates their deep commitment. The timing (40 years after Vodafone\'s first UK mobile call in 1985) creates powerful marketing narrative for commercial launch.',
    impact: 'Bullish',
    source: 'Vodafone Press Release'
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
