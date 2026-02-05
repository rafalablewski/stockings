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
  // === JANUARY 2026 ===
  {
    date: '2026-01-30',
    competitor: 'Amazon Leo',
    category: 'Launch',
    headline: 'Amazon Leo Preparing for 8th Mission - 212 Satellites Launched, LE-01 with Arianespace Feb 12',
    summary: 'Amazon Leo (formerly Project Kuiper) preparing for LE-01 mission on Feb 12, 2026 - first launch with Arianespace on Ariane 64 rocket from French Guiana. Will add 32 satellites bringing total to 212 spacecraft in orbit. This is 8th mission overall and first of 18 planned Arianespace launches. Previous 7 missions: KA-01 (Apr 2025, 27 sats), KA-02 (Jun 2025, 27), KF-01 (Jul 2025, 24), KF-02 (Aug 2025, 24), KA-03 (Sep 2025, 27), KF-03 (Oct 2025, 24), LA-04 (Dec 2025, 27). Amazon Leo targeting 3,000+ satellite constellation with 80+ launches secured from Arianespace, Blue Origin, SpaceX, and ULA. Rajeev Badyal, VP: "Adding heavy-lift rocket like Ariane 6 will allow us to deploy more satellites at a time and accelerate deployment plans."',
    astsImplication: 'Amazon Leo rapidly scaling constellation deployment - now at 180+ satellites with 7 successful missions in 2025 alone. However, key differentiation remains: Amazon Leo is TERMINAL-BASED broadband requiring dishes/antennas, NOT direct-to-device. Their Leo Ultra terminal (fastest at 1 Gbps) still requires installation. ASTS addresses different market: unmodified smartphones in coverage gaps. Amazon\'s scale is impressive but they\'re solving different problem than ASTS.',
    impact: 'Neutral',
    source: 'Amazon',
    url: 'https://www.aboutamazon.com/news/amazon-leo'
  },

  // === NOVEMBER 2025 ===
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
