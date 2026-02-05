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

  // === NOVEMBER 2025 ===
  {
    date: '2025-11-17',
    partner: 'Industry/Research',
    category: 'Market Analysis',
    headline: 'DIGITIMES: D2D Poised to Redefine Mobile-Satellite Integration - $10B+ Market by 2030',
    summary: 'DIGITIMES Asia research report positions direct-to-device (D2D) as "cornerstone for integrating mobile and satellite communications." Key findings: (1) D2D extends terrestrial network coverage into space, addressing connectivity gaps in remote, maritime, and disaster regions; (2) US DoD allocated $134M in FY2025 for commercial satellite bandwidth (SpaceX, Iridium, Viasat); (3) SpaceX Starship could reduce launch costs to <$200/kg once operational; (4) Global players advancing D2D: SpaceX/T-Mobile (launched initial services), AST SpaceMobile and Lynk Global (expanding constellations); (5) 3GPP Release 19 expected finalized ~2027, D2D voice/real-time apps commercial by 2028; (6) Vehicle networking next growth wave - IoT-NTN for emergency rescue by 2027, NR-NTN for real-time voice after 2030; (7) Market could enter rapid expansion by 2030 with annual revenues projected to surpass $10 billion. Key dependencies: AST SpaceMobile commercial rollout and 3GPP Release 19 finalization.',
    astsRelevance: 'Major third-party validation of ASTS\'s market opportunity. Report explicitly names AST SpaceMobile alongside SpaceX as key D2D player. $10B+ market projection by 2030 supports ASTS revenue thesis. DoD satellite spending validates government market. Vehicle networking opportunity aligns with ASTS IoT potential. Report identifies ASTS commercial rollout as key market catalyst - positions ASTS as industry bellwether.',
    impact: 'Bullish',
    source: 'DIGITIMES Asia',
    url: 'https://www.digitimes.com/news/a20251107PD205/leo-satellite-commercial-5g-spacex-technology.html'
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
  {
    date: '2025-09-01',
    partner: 'Industry/Research',
    category: 'Market Analysis',
    headline: 'EY-Parthenon: LEO Satellite Broadband in Europe - Four Scenarios from Rural Niche to Urban Competition',
    summary: 'EY-Parthenon analysis of European LEO satellite broadband market. Key findings: (1) Starlink dominates with ~7,000 satellites (ambition 42,000), ~658,000 European subscribers early 2025 (~143% YoY growth); (2) Eutelsat-OneWeb ~650 satellites, focused on enterprise/government/backhaul; (3) Four future scenarios outlined - from rural-only (Scenario 1) to full FTTP/5G competitor everywhere (Scenario 4); (4) Current trajectory: Scenario 1/2 (rural primary, some urban niche); (5) D2D partnerships highlighted as key opportunity - T-Mobile/Starlink US, Vodafone/AST SpaceMobile Europe, Orange/OneWeb; (6) Threat to rural telcos but opportunity via partnerships; (7) Europe strong in midstream/downstream value chain (ground stations, terminals, VAS); (8) Full urban competition (Scenario 4) depends on densification, spectrum, tech advances, ground infra, adoption curves. Urban capacity constraints noted (e.g., SE England/London). Starlink speeds trending toward 1 Gbps/15-20ms target but real-world 100-300 Mbps/20-40ms.',
    astsRelevance: 'Major European market analysis explicitly names Vodafone/AST SpaceMobile as key D2D partnership example alongside T-Mobile/Starlink. Report frames D2D as "opportunity" for telcos - validates ASTS\'s partner-with-MNOs strategy vs. competing against them. Starlink\'s urban capacity constraints and rural focus confirm ASTS addresses different market segment (coverage gaps via existing phones). Four-scenario framework shows LEO not yet threatening urban fibre - ASTS\'s complementary positioning validated. Europe\'s strong terrestrial infrastructure means D2D partnerships (like SatCo JV) are the path forward, not standalone satellite broadband.',
    impact: 'Bullish',
    source: 'EY-Parthenon'
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

  // === OCTOBER 2024 ===
  {
    date: '2024-10-18',
    partner: 'Ericsson/3GPP',
    category: '3GPP/NTN',
    headline: '3GPP Rel-19 Adopts Regenerative Payload Architecture for 5G NTN - Complete gNB on Satellite',
    summary: 'After year-long intensive discussions, 3GPP Rel-19 specifies "regenerative" NTN payload architecture placing complete gNB (base station) on satellite - major evolution from Rel-17/18 "transparent" bent-pipe approach. Key benefits: (1) Full 5G RAN functionality leveraged including inter-gNB mobility, resource coordination, energy saving; (2) Native support for inter-satellite links via Xn interface enabling global coverage; (3) Packet switching directly in payload without ground segment; (4) Significant RTT reductions for random access and HARQ; (5) Enables "store and forward" for IoT UEs with core network on satellite; (6) Path toward "data centers in the sky" and full 5G integration. Ericsson successfully advocated for gNB-on-board over gNB-DU split alternative, citing: better signaling efficiency, native ISL support, evolutionary path to 6G. Consensus reached December 2023 after discussions at four TSG RAN meetings.',
    astsRelevance: 'Critical standards foundation for ASTS\'s technology. BlueBird 1-5 just launched Sep 2024; BlueWalker 3 demonstrated voice/data with AT&T and Vodafone since 2023. 3GPP Rel-19 regenerative payload architecture aligns with ASTS\'s approach of placing complete base station functionality on satellites. Nokia (ASTS\'s key equipment partner) is major 3GPP contributor alongside Ericsson. These standards enable: seamless satellite-terrestrial handoffs, inter-satellite connectivity, and full 5G integration. The 6G evolution path validates long-term NTN integration into mobile networks.',
    impact: 'Bullish',
    source: 'Ericsson Blog',
    url: 'https://www.ericsson.com/en/blog/2024/10/ntn-payload-architecture'
  },

  // === SEPTEMBER 2023 ===
  {
    date: '2023-09-05',
    partner: 'Vodafone/Amazon',
    category: 'Partnership',
    headline: 'Vodafone Partners with Amazon Project Kuiper for Satellite Backhaul in Europe and Africa',
    summary: 'Vodafone and Vodacom announce strategic collaboration with Amazon\'s Project Kuiper to extend 4G/5G network reach using LEO satellite backhaul. Key points: (1) Kuiper will connect geographically dispersed cellular antennas back to core telecom networks - NOT direct-to-device; (2) Targets areas "challenging and prohibitively expensive to serve via traditional fibre or microwave"; (3) Amazon to partner with Vodafone on high-speed broadband to unserved communities; (4) Exploring enterprise backup service and remote infrastructure connectivity; (5) Beta testing planned end of 2024 as Amazon production satellites come online. Margherita Della Valle: "These connections will be complemented further through our own work on direct-to-smartphone satellite services." Dave Limp (Amazon): "Teaming with a leading international service provider like Vodafone allows us to make a bigger impact faster in closing the digital divide."',
    astsRelevance: 'Shows Vodafone\'s multi-pronged satellite strategy - DIFFERENT use cases. Kuiper = satellite backhaul (connecting cell towers in remote areas). ASTS = direct-to-device (connecting phones directly where no towers exist). Vodafone CEO explicitly references "our own work on direct-to-smartphone satellite services" - that\'s ASTS. Not competing solutions but complementary. Kuiper still pre-launch at this time; ASTS has BlueWalker 3 in orbit conducting tests (first voice call Apr 2023). Vodafone hedging across satellite solutions while ASTS focuses on D2D differentiation.',
    impact: 'Neutral',
    source: 'Vodafone',
    url: 'https://www.vodafone.com/news/technology/vodafone-and-amazons-project-kuiper-to-extend-connectivity-in-africa-and-europe'
  },

  // === DECEMBER 2022 ===
  {
    date: '2022-12-12',
    partner: 'Industry/Meta',
    category: 'Industry Shift',
    headline: 'Meta Shuts Down Connectivity Division After Nearly a Decade - Big Tech Exits Satellite Internet',
    summary: 'Meta (formerly Facebook) shutters its Connectivity arm, splitting remaining staff across Infrastructure and Central Products teams. Division launched in 2013 to get more people online. Key failures: (1) Aquila high-altitude drone project shut down 2018 after crashes; (2) LEO satellite internet project staff acquired by Amazon in 2021; (3) Free Basics internet faced net neutrality backlash. Meta continues heavy metaverse spending. Telecom Infra Project (TIP) involvement continues. At peak, Meta Connectivity claimed 300M+ users via free internet services (though WSJ found billing issues). Division eliminated as part of Nov 2022 layoffs cutting 11,000 jobs.',
    astsRelevance: 'Big Tech finding satellite connectivity too difficult/expensive validates specialized approach. ASTS has BlueWalker 3 in orbit (launched Sep 2022, world\'s largest commercial array), conducting initial tests. Amazon Kuiper (which acquired Meta\'s satellite team) still pre-launch. Starlink/T-Mobile D2D just announced Aug 2022, no service yet. ASTS is pre-commercial, ~$500M market cap, proving technology works while Big Tech retreats. Meta\'s exit leaves Amazon as only Big Tech satellite player - but Kuiper is terminal-based broadband, not D2D like ASTS.',
    impact: 'Bullish',
    source: 'The Verge / Light Reading',
    url: 'https://www.theverge.com/2022/12/12/23505875/meta-connectivity-division-shut-down-layoffs'
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
