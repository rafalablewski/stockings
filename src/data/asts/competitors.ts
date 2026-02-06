/**
 * ASTS SPACEMOBILE - COMPETITOR INTELLIGENCE
 * ================================================
 *
 * Tracking competitor activities in the satellite direct-to-device space.
 *
 * KEY COMPETITORS:
 * - Amazon Leo (fka Project Kuiper): LEO broadband (terminal-based, not D2D)
 * - SpaceX Starlink: LEO broadband + D2D partnership with T-Mobile
 * - Lynk Global: D2D texting/messaging focused
 * - Apple/Globalstar: Emergency SOS (iPhone only)
 * - Orange/Skylo: D2D satellite SMS in Europe (narrowband NTN)
 * - OQ Technology: 5G NTN NB-IoT LEO operator (IoT-focused)
 * - Terrestar Solutions: Hybrid satellite-cellular IoT in Canada (S-band)
 *
 * DATA SOURCES:
 * - Company press releases
 * - FCC filings
 * - Industry news
 *
 * LAST UPDATED: 2026-02-06
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
  lastUpdated: '2026-02-06',
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
  // === FEBRUARY 2026 ===
  {
    date: '2026-02-05',
    competitor: 'Terrestar Solutions',
    category: 'Product',
    headline: 'Terrestar Launches Hybrid IoT Service on Standards-Based Open Network Platform in Canada',
    summary: 'Terrestar Solutions, Canada\'s only domestically headquartered mobile satellite service operator, launched its Hybrid IoT connectivity service built on an open, standards-based platform. First Canadian-controlled hybrid satellite-cellular IoT platform operating on open 3GPP NTN standards, enabling seamless switching between cellular and satellite networks across urban, rural, remote, and northern regions. Platform aligns with international 3GPP NTN standards ensuring interoperability with Canada\'s terrestrial telecom networks. LUBEX validated the service over 32 weeks in Abitibi-Témiscamingue, continuously monitoring equipment where cellular networks were unavailable. Terrestar describes this as a practical first step toward direct-to-device (D2D) satellite connectivity in Canada, validating the network architecture, spectrum, and ecosystem partnerships that will underpin future D2D services. Delivered over Canadian-licenced S-band spectrum via Echostar T1 satellite.',
    astsImplication: 'Terrestar\'s hybrid IoT launch validates the 3GPP NTN standards-based approach that ASTS is also pursuing. However, Terrestar is focused on narrowband IoT (asset tracking, equipment monitoring) using a single GEO satellite (Echostar T1), not broadband D2D to smartphones. ASTS targets broadband voice/data to unmodified smartphones via LEO constellation — fundamentally different scale and capability. Terrestar\'s success in Canada reinforces demand for satellite connectivity in remote areas but does not overlap with ASTS\'s core market of MNO subscriber coverage extension.',
    impact: 'Neutral',
    source: 'Terrestar Solutions',
    url: 'https://terrestarsolutions.ca'
  },

  // === JANUARY 2026 ===
  {
    date: '2026-01-12',
    competitor: 'Industry - D2D Market',
    category: 'Market Analysis',
    headline: 'MEF: Satellite Direct-to-Device Promises 100% Geographic Coverage, Wholesale Market Evolution Ahead',
    summary: 'MEF Programme Lead Isabelle Paradis and Principal Analyst Pamela Clark-Dickson published analysis of D2D satellite market moving from technical promise to commercial reality. Key findings: Orange France launched "Message Satellite" D2D SMS service with Skylo (€5/month after 6-month free trial). GSMA survey shows 32% of consumers would pay up to 5% extra for satellite connectivity, 61% willing to pay more, and 47% would switch operators for D2D coverage. Starlink has ~7,600 LEOs in orbit with D2D partnerships across Verizon, T-Mobile, Rogers, Entel, Kyivstar, KDDI, One NZ, SmarTone, and 3 Hong Kong. Amazon Leo targeting 3,000+ satellites. Article highlights D2D as "early signal of a wholesale market evolution" that could redefine global connectivity packaging, pricing, and interconnection. New wholesale frameworks needed for satellite-enabled roaming and hybrid settlement.',
    astsImplication: 'Strongly validates ASTS\'s core thesis: massive consumer demand for D2D satellite services with willingness to pay and even switch operators. The 47% switching intent is a powerful negotiating lever for ASTS in MNO partnership discussions. However, Starlink\'s growing D2D telco partnership count (9+ operators) shows competitive pressure. Key differentiation: most Starlink D2D services are SMS-only, while ASTS targets broadband voice/data. The wholesale market evolution discussion supports ASTS\'s MNO partnership business model.',
    impact: 'Bullish',
    source: 'MEF',
  },
  {
    date: '2026-01-08',
    competitor: 'Keysight / Samsung',
    category: 'Technology',
    headline: 'Keysight Achieves Industry-Leading Live NR-NTN Connectivity in n252 S-Band with Samsung Chipset at CES 2026',
    summary: 'Keysight Technologies and Samsung Electronics demonstrated live NR-NTN connection in 3GPP Release 19 band n252 (S-Band) at CES 2026, using Samsung\'s next-generation modem chipset. Demonstration included live satellite-to-satellite (SAT-to-SAT) mobility using commercial-grade modem silicon and cross-vendor interoperability. First public validation of n252 in an NTN system — a new band expected to be adopted by next-gen LEO constellations. With n252 alongside earlier n255 and n256 demonstrations, all major NR-NTN FR1 bands have now been validated end-to-end. Keysight\'s NTN Network Emulator Solutions recreate multi-orbit LEO conditions, SAT-to-SAT mobility, and end-to-end routing. Peng Cao, VP Keysight Wireless: "With n252, n255, and n256 now validated across NTN, the ecosystem is clearly accelerating toward bringing direct-to-cell satellite connectivity to mass-market devices."',
    astsImplication: 'Samsung\'s NR-NTN chipset validation is significant — Samsung is a major smartphone OEM and modem supplier. Commercial-grade NR-NTN silicon maturing means more devices will support satellite connectivity natively, expanding ASTS\'s addressable market. The n252 S-band validation is directly relevant as ASTS operates in similar frequency bands. SAT-to-SAT mobility testing validates the multi-satellite handover capability ASTS needs for its LEO constellation. Overall positive for the ecosystem maturity that ASTS depends on for scale.',
    impact: 'Bullish',
    source: 'Keysight Technologies',
  },
  {
    date: '2026-01-08',
    competitor: 'OQ Technology / Monogoto',
    category: 'Partnership',
    headline: 'Monogoto Adds OQ Technology LEO Constellation to Hybrid Connectivity Platform at CES 2026',
    summary: 'OQ Technology (Luxembourg-based 5G NTN satellite operator for NB-IoT and D2D) and Monogoto (cloud-based hybrid connectivity provider) announced strategic partnership at CES 2026. Adds OQ\'s LEO satellite constellation to Monogoto\'s hybrid ecosystem covering public/private cellular, Wi-Fi, and GEO satellites. Customers can connect devices across all networks through single SIM, unified IP addressing, and consistent APIs. OQ Technology operates 3GPP-compliant 5G NTN NB-IoT service using 60 MHz of MSS S-band spectrum. First European company to operate LEO constellation dedicated to D2D services. Targets energy, logistics, maritime, agriculture, and utilities. Monogoto CTO Maor Efrati: "LEO will drive a fundamental shift in global communications."',
    astsImplication: 'OQ Technology is NB-IoT focused (narrowband, low-data IoT applications) — not broadband D2D like ASTS. Their 5G NTN NB-IoT service targets industrial IoT verticals (energy, logistics, agriculture) with low-bandwidth needs, not smartphone voice/data. Monogoto\'s multi-layer connectivity platform (cellular + Wi-Fi + GEO + LEO) shows the hybrid connectivity trend but at IoT scale. OQ\'s S-band spectrum usage is noteworthy as it validates S-band for NTN services. Not a direct competitive threat to ASTS\'s broadband smartphone D2D market.',
    impact: 'Neutral',
    source: 'OQ Technology / Monogoto',
    url: 'https://www.oqtec.com'
  },

  // === DECEMBER 2025 ===
  {
    date: '2025-12-03',
    competitor: 'Industry - D2D Market',
    category: 'Market Analysis',
    headline: 'Viasat/GSMA Report: 60% of Consumers Would Pay More for D2D Satellite, 47% Would Switch Providers',
    summary: 'Viasat and GSMA Intelligence published "The Great Connectivity Convergence: NTN in Consumer Mobile" report surveying 12,390 mobile phone users across 12 markets (Australia, Brazil, Canada, France, Germany, India, Indonesia, Italy, Japan, South Africa, UK, USA). Key findings: more than a third of consumers lose basic mobile service at least twice monthly. 60%+ globally willing to pay extra for satellite-enabled smartphone services. Willingness varies: India 89%, Indonesia 82%, US 56%, France 48%. Consumers willing to pay 5-7% more on monthly bill, India at 9%. Nearly half (47%) would switch operators if D2D coverage included. India presents compelling case: despite $2.35 ARPU vs US $45.57, larger population and higher willingness-to-pay create substantial opportunity. Awareness heavily influenced by region: India 74% aware vs Japan much lower. MNOs face "marketing gap" — balancing excitement without over-promising data-rich services not yet available.',
    astsImplication: 'Highly bullish for ASTS thesis. The 47% operator-switching intent and 60%+ willingness-to-pay validate that D2D satellite is a must-have for MNOs to retain subscribers. This directly supports ASTS\'s MNO partnership value proposition — operators need D2D to prevent churn. The high enthusiasm in emerging markets (India 89%, Indonesia 82%) aligns with ASTS\'s global coverage strategy including partnerships with operators in these regions. The "marketing gap" concern about data-rich services favors ASTS over SMS-only competitors like Starlink D2D, since ASTS targets broadband capability.',
    impact: 'Bullish',
    source: 'Viasat / GSMA Intelligence',
  },

  // === NOVEMBER 2025 ===
  {
    date: '2025-11-18',
    competitor: 'Orange / Skylo',
    category: 'Product',
    headline: 'Orange Becomes First European Operator to Offer Satellite SMS via Direct-to-Device with Skylo',
    summary: 'Orange France launched "Message Satellite" — D2D satellite SMS and geolocation service — becoming first European operator to offer satellite SMS using Direct-to-Device technology. Partnership with Skylo (NTN operator). Available from Dec 11, 2025 for consumers, 2026 for business. Initially exclusive to Orange 5G/5G+ customers with Google Pixel 9 or 10 smartphones. Service available in France and 36 countries (Skylo coverage area). Pricing: free for first 6 months, then €5/month. Uses smartphone\'s direct satellite connection for SMS and geolocation when mobile/Wi-Fi coverage unavailable. Targets outdoor adventurers, remote areas, emergency services, logistics, and tourism. Jérôme Hénique, CEO Orange France: "Being the first operator in France to launch this option demonstrates our leadership." Michaël Trabbia, CEO Orange Wholesale: "The Direct to Device technology is part of this approach, providing readily available and targeted connectivity on your smartphone."',
    astsImplication: 'Orange/Skylo D2D launch validates the D2D satellite market in Europe and shows MNO demand for satellite connectivity. However, this is SMS-only on limited devices (Pixel 9/10 only), priced at €5/month — a narrow service compared to ASTS\'s broadband voice/data ambition. Skylo is an NTN-focused company using existing GEO satellite infrastructure for narrowband NTN services. ASTS\'s broadband capability (voice, video, data) on any smartphone represents a fundamentally different value proposition. Orange\'s move does validate pricing: €5/month aligns with GSMA survey willingness-to-pay. Risk: if SMS-only satisfies most consumer demand, it could reduce urgency for ASTS broadband D2D.',
    impact: 'Neutral',
    source: 'Orange',
  },
  {
    date: '2025-11-24',
    competitor: 'Amazon Leo',
    category: 'Launch',
    headline: 'Amazon Leo Preparing for 8th Mission - 212 Satellites Launched, LE-01 with Arianespace Feb 12',
    summary: 'Amazon Leo (formerly Project Kuiper) preparing for LE-01 mission on Feb 12, 2026 - first launch with Arianespace on Ariane 64 rocket from French Guiana. Will add 32 satellites bringing total to 212 spacecraft in orbit. This is 8th mission overall and first of 18 planned Arianespace launches. Previous 7 missions: KA-01 (Apr 2025, 27 sats), KA-02 (Jun 2025, 27), KF-01 (Jul 2025, 24), KF-02 (Aug 2025, 24), KA-03 (Sep 2025, 27), KF-03 (Oct 2025, 24), LA-04 (Dec 2025, 27). Amazon Leo targeting 3,000+ satellite constellation with 80+ launches secured from Arianespace, Blue Origin, SpaceX, and ULA. Rajeev Badyal, VP: "Adding heavy-lift rocket like Ariane 6 will allow us to deploy more satellites at a time and accelerate deployment plans."',
    astsImplication: 'Amazon Leo rapidly scaling constellation deployment - now at 180+ satellites with 7 successful missions in 2025 alone. However, key differentiation remains: Amazon Leo is TERMINAL-BASED broadband requiring dishes/antennas, NOT direct-to-device. Their Leo Ultra terminal (fastest at 1 Gbps) still requires installation. ASTS addresses different market: unmodified smartphones in coverage gaps. Amazon\'s scale is impressive but they\'re solving different problem than ASTS.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },
  {
    date: '2025-11-24',
    competitor: 'Amazon Leo',
    category: 'Product',
    headline: 'Amazon Leo Debuts Gigabit-Speed "Ultra" Antenna, Begins Enterprise Preview',
    summary: 'Amazon Leo unveils Leo Ultra - enterprise-grade terminal delivering download speeds up to 1 Gbps and upload speeds up to 400 Mbps, making it "fastest commercial phased array antenna in production." Full-duplex Ka-band design with weather-resistant build, no moving parts. Three antenna tiers: Leo Nano (100 Mbps, 7x7"), Leo Pro (400 Mbps, 11x11"), Leo Ultra (1 Gbps). Enterprise features include Direct to AWS (D2A) connectivity, private network interconnect, 24/7 priority support. Signed agreements with JetBlue, Vanu Inc., Hunt Energy Network, Connected Farms, Crane Worldwide Logistics. Beginning enterprise preview to test network with production hardware before broader 2026 rollout. Chris Weber, VP: "Amazon Leo represents a massive opportunity for businesses operating in challenging environments."',
    astsImplication: 'Amazon Leo targeting enterprise/government market with premium terminals - different segment than ASTS\'s consumer mobile focus. Key distinction: Leo Ultra requires professional installation and dedicated hardware. ASTS delivers broadband to EXISTING smartphones with no new equipment. Amazon\'s enterprise pivot may reduce competitive overlap with ASTS\'s MNO partnership model. However, both compete for "connectivity in remote areas" narrative.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },
  {
    date: '2025-11-13',
    competitor: 'Amazon Leo',
    category: 'Corporate',
    headline: 'Project Kuiper Rebranded to "Amazon Leo" - Permanent Identity for Satellite Network',
    summary: 'Amazon officially renames Project Kuiper to "Amazon Leo" - a nod to the Low Earth Orbit satellite constellation. Rajeev Badyal, VP: "Seven years ago, Amazon set out to design the most advanced satellite communications network ever built... We started small with a handful of engineers and a few designs on paper. Like most early Amazon projects, the program needed a code name, and the team began operating as Project Kuiper." Now over 150 satellites in orbit, one of largest satellite production lines (up to 5 satellites/day at Kirkland facility), and customers including JetBlue, L3Harris, DIRECTV Latin America, Sky Brasil, and NBN Co. Australia already signed up.',
    astsImplication: 'Rebranding signals Amazon\'s long-term commitment to satellite broadband. "Amazon Leo" is more consumer-friendly brand than "Project Kuiper." With 150+ satellites deployed and major customer signings, Amazon is clearly scaling for commercial launch. Still terminal-based system - not direct competition to ASTS\'s D2D approach. Both companies building toward "connectivity everywhere" but via different paths.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },

  // === SEPTEMBER 2025 ===
  {
    date: '2025-09-04',
    competitor: 'Amazon Leo',
    category: 'Partnership',
    headline: 'JetBlue Chooses Amazon Project Kuiper for Free In-Flight Wi-Fi Starting 2027',
    summary: 'JetBlue becomes first airline to implement Amazon\'s satellite internet on commercial aircraft. Will enhance JetBlue\'s free Fly-Fi service beginning 2027 using Kuiper\'s LEO satellite technology. Marty St. George, JetBlue President: "Our agreement with Project Kuiper marks an exciting leap forward for us as the hands-down leader in onboard connectivity. Whether it\'s binge-watching a favorite show, staying connected with loved ones, or wrapping up a work project, we\'re always looking for ways to make our customers\' time in the air as connected and productive as they want it to be." Kuiper\'s aviation terminal supports up to 1 Gbps downloads. Amazon also signed agreement with Airbus to integrate Kuiper into aircraft catalog. Over 100 satellites in orbit at time of announcement.',
    astsImplication: 'Amazon targeting aviation/maritime verticals with dedicated terminals - different market than ASTS\'s smartphone D2D. JetBlue deal validates LEO satellite broadband for mobility applications. However, ASTS has different aviation angle: enabling passengers\' existing phones to work via satellite when flying over coverage gaps. Both solving "connectivity while traveling" but Amazon requires aircraft modification while ASTS works with existing passenger devices.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },

  // === JULY 2025 ===
  {
    date: '2025-07-17',
    competitor: 'Industry - D2D Market',
    category: 'Market Analysis',
    headline: 'Kaleido Intelligence: D2D IoT Connections to Reach 30 Million by 2030, Smartphone ARPU Capped at $6/Month',
    summary: 'Kaleido Intelligence published "Cellular-Satellite Communications: Opportunities & Outlook 2025" finding satellite D2D IoT connections will reach 30 million by 2030, up from under 500K at end of 2025. Skylo leads NTN IoT space. Key IoT use cases: asset tracking, energy/utilities, agriculture (60% of connections). 51% of IoT enterprises view D2D as viable WAN connectivity solution but airtime pricing poses significant barriers. Since 2015, satellite payloads launched into orbit increased 1,105%, with almost all targeting LEO. At least 60,000 satellites expected in LEO orbit. Report warns of systemic risk: lack of global sustainability legislation, politicisation of sovereign constellations, untested collision avoidance at altitudes over 500km. Smartphone D2D: 6 million users expected by end of 2025, but device antenna/radio power constraints limit use cases. Monthly smartphone D2D ARPU unlikely to exceed $6 globally by 2030. Report suggests OEM subsidies for satellite connectivity could drive smartphone traction, with consumer data breakage margins used to subsidize IoT airtime pricing.',
    astsImplication: 'Mixed implications for ASTS. The $6/month global ARPU ceiling for smartphone D2D is concerning for ASTS\'s revenue model — suggests limited pricing power in the near term. However, 30M IoT D2D connections by 2030 and 6M smartphone users by end of 2025 validate growing market demand. The antenna/radio power constraint noted for smartphones is an area where ASTS differentiates: their large satellite arrays (BlueBird) compensate for smartphone antenna limitations, enabling broadband rather than just messaging. Kaleido\'s sustainability warnings about LEO congestion (60,000+ satellites) could favor ASTS\'s approach of fewer, larger satellites vs competitors deploying thousands of small sats.',
    impact: 'Neutral',
    source: 'Kaleido Intelligence',
  },

  // === APRIL 2025 ===
  {
    date: '2025-04-28',
    competitor: 'Amazon Leo',
    category: 'Launch',
    headline: 'Amazon Project Kuiper Completes First Full-Scale Launch - 27 Production Satellites Deployed',
    summary: 'Amazon launches KA-01 (Kuiper Atlas 1) mission - first batch of 27 production satellites aboard ULA Atlas V 551 from Cape Canaveral. Marks transition from prototype testing (Oct 2023 Protoflight mission with 2 sats) to full-scale constellation deployment. First of 80+ planned missions to deploy 3,232-satellite constellation. Satellite manufacturing facility in Kirkland, WA can produce up to 5 satellites/day. Processing facility at Kennedy Space Center can support 3 simultaneous launch campaigns. Launch contracts with Arianespace, Blue Origin, SpaceX, and ULA represent "largest commercial procurement of launch vehicles in history."',
    astsImplication: 'Amazon beginning serious constellation deployment after 2+ years of development. ASTS has technology lead: already demonstrating 5G broadband calls with BlueBird satellites while Amazon just starting production launches. However, Amazon\'s manufacturing scale (5 sats/day) and launch cadence will accelerate deployment. Both racing to achieve critical mass but solving different connectivity problems.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },

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
