/**
 * CRCL (CIRCLE) - TIMELINE & CORPORATE HISTORY
 * ================================================
 *
 * Corporate milestones, partnerships, and regulatory events.
 *
 * DATA SOURCES:
 * - Press releases
 * - SEC filings (8-K for material events)
 * - Company presentations
 *
 * LAST UPDATED: 2025-12-31
 * NEXT UPDATE: After significant announcements
 *
 * AI AGENT INSTRUCTIONS:
 * When adding new events:
 * 1. Add at the BEGINNING of the array (newest first)
 * 2. Include date in YYYY-MM-DD or YYYY-MM format
 * 3. Set appropriate category and verdict
 * 4. Include detailed description and source
 *
 * CATEGORIES:
 * - Corporate: Company milestones, leadership
 * - Product: USDC, EURC, Web3 services
 * - Partnership: Business agreements
 * - Regulatory: Licenses, approvals, testimony
 * - Capital: Funding, IPO, offerings
 * - Expansion: Geographic, blockchain
 * - SEC Filing: Formal SEC filings
 * - Earnings: Quarterly results
 * - Governance: Board, management
 * - Acquisition: M&A activity
 */

import type { TimelineEntry, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const TIMELINE_METADATA: DataMetadata = {
  lastUpdated: '2025-12-31',
  source: 'Company press releases, SEC EDGAR',
  nextExpectedUpdate: 'After significant announcements',
  notes: 'Comprehensive history from 2013 founding to present',
};

// ============================================================================
// TIMELINE EVENTS
// ============================================================================

/**
 * Corporate timeline - newest first
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new events at the beginning
 * - Keep complete audit trail (never delete)
 * - Mark superseded entries with note
 */
export const TIMELINE: TimelineEntry[] = [
  // === 2025 ===
  { date: '2025-12-18', category: 'Partnership', event: 'Intuit multi-year strategic partnership', impact: 'USDC for ~100M users', source: 'Press Release', verdict: 'positive', details: 'Multi-year agreement to integrate USDC across Intuit platforms including TurboTax, QuickBooks, and Credit Karma. Potential distribution to ~100M users. Major consumer/SMB channel.' },
  { date: '2025-12-12', category: 'Regulatory', event: 'OCC conditional approval for National Trust Charter', impact: 'Federal bank oversight', source: 'Press Release', verdict: 'positive', details: 'Conditional approval for "First National Digital Currency Bank, N.A." - first OCC-chartered digital currency bank. Federal oversight of USDC Reserve, meets GENIUS Act requirements.' },
  { date: '2025-11-12', category: 'Earnings', event: 'Q3 2025 results: $740M revenue, $166M Adj. EBITDA', impact: 'Strong beat, raised guidance', source: '8-K', verdict: 'positive', details: 'Revenue +66% YoY to $740M, Adj. EBITDA +79% to $166M. USDC +108% YoY to $73.7B. Net income $214M. Platform % reached 13.5%. Raised FY25 RLDC margin guidance to 38-40%.' },
  { date: '2025-10-28', category: 'Product', event: 'Arc public testnet with 100+ companies', impact: 'Major ecosystem partners', source: 'Press Release', verdict: 'positive', details: 'Public testnet launch with 100+ participating companies across capital markets (Apollo, BNY, ICE), banks (Goldman, HSBC, Deutsche Bank), payments (Visa, Mastercard), and DeFi (Aave, Uniswap).' },
  { date: '2025-09-17', category: 'Partnership', event: 'Kraken partnership for USDC/EURC expansion', impact: 'Increased liquidity', source: 'Press Release', verdict: 'positive', details: 'Strategic partnership with major crypto exchange Kraken. Includes increased USDC/EURC liquidity, reduced conversion fees, and expanded EURC access across Kraken platform.' },
  { date: '2025-08', category: 'Product', event: 'Arc Layer-1 blockchain launched', impact: 'Programmable financial infrastructure', source: 'Press Release', verdict: 'positive', details: 'Circle-developed Layer-1 blockchain optimized for financial applications. Designed for institutional compliance, privacy, and interoperability. Foundation for programmable money infrastructure.' },
  { date: '2025-08-18', category: 'Capital', event: 'Follow-on: 10M shares @ $130.00', impact: '$1.3B total offering', source: 'Press Release', verdict: 'mixed', details: '2M primary shares ($260M to company) + 8M secondary (existing holders selling). Stock priced at 320% premium to IPO. Dilutive but validates growth trajectory and provides growth capital.' },
  { date: '2025-08-12', category: 'Earnings', event: 'Q2 2025 results: $658M revenue, $126M Adj. EBITDA', impact: 'First quarter as public company', source: '8-K', verdict: 'mixed', details: 'Revenue +53% YoY, Adj. EBITDA +52% YoY. Net loss of $482M due to $591M IPO-related non-cash charges ($424M SBC vesting, $167M convertible debt fair value). USDC at $61.3B (+90% YoY). Guided 40% USDC CAGR.' },
  { date: '2025-07', category: 'Partnership', event: 'FIS partnership for USDC payments via Money Movement Hub', impact: 'US bank distribution channel', source: '8-K', verdict: 'positive', details: 'Enables U.S. financial institutions to offer domestic and cross-border USDC payments via FIS Money Movement Hub. Combines Circle blockchain infrastructure with FIS real-time payment rails.' },
  { date: '2025-07', category: 'Product', event: 'Circle Gateway launched on testnet', impact: 'Unified crosschain USDC liquidity', source: '8-K', verdict: 'positive', details: 'Gateway enables sub-second access to USDC across supported blockchains, eliminating need for bridging, rebalancing, or prepositioning capital. Unified USDC balances for instant crosschain liquidity.' },
  { date: '2025-07-21', category: 'Governance', event: 'Adam Selipsky (ex-AWS CEO) appointed to Board', impact: 'Cloud infrastructure expertise', source: '8-K', verdict: 'positive', details: 'Former AWS CEO who scaled cloud business to $100B+ ARR joins board. Brings enterprise scaling expertise, cloud infrastructure knowledge, and Fortune 500 relationships.' },
  { date: '2025-06-06', category: 'Capital', event: 'IPO completed: 39.1M shares @ $31.00', impact: '$1.21B gross proceeds', source: '8-K', verdict: 'positive', details: 'NYSE listing under ticker CRCL. Upsized from initial 24M shares. 19.9M primary (company proceeds) + 19.2M secondary (selling stockholders). Greenshoe fully exercised June 11. Class B sunset 2030.' },
  { date: '2025-05', category: 'Regulatory', event: 'GENIUS Act passed in U.S.', impact: 'Federal stablecoin framework', source: '10-Q', verdict: 'positive', details: 'First comprehensive federal stablecoin legislation in U.S. Establishes clear regulatory framework, reserve requirements, and oversight structure. Reduces regulatory uncertainty significantly.' },
  { date: '2025-04-29', category: 'Regulatory', event: 'ADGM (Abu Dhabi) In-Principle Approval received', impact: 'UAE market entry', source: 'Press Release', verdict: 'positive', details: 'In-Principle Approval from Abu Dhabi Global Market FSRA to operate as money services provider. Path to full FSP license. Includes Hub71 collaboration for startup ecosystem.' },
  { date: '2025-04-21', category: 'Product', event: 'Circle Payments Network (CPN) announced', impact: 'Major bank design partners', source: 'Press Release', verdict: 'positive', details: 'Cross-border payments network connecting financial institutions. Design partners include Santander, Deutsche Bank, Société Générale, Standard Chartered. 29 FIs enrolled by Q3, 500+ in pipeline.' },
  { date: '2025-04-01', category: 'SEC Filing', event: 'S-1/A amendment filed - IPO terms disclosed', impact: 'NYSE listing under CRCL', source: 'S-1/A', verdict: 'positive', details: 'Amended S-1 filed with proposed IPO terms. Disclosed $24-26 price range, 24M share offering, dual-class structure with Class B sunset provision. Goldman, JPM, Citi as lead bookrunners.' },
  { date: '2025-03-27', category: 'Partnership', event: 'ICE (NYSE parent) MOU for USDC/USYC product development', impact: 'Derivatives, clearinghouses integration', source: 'Press Release', verdict: 'positive', details: 'Memorandum of Understanding with Intercontinental Exchange to explore USDC/USYC integration across ICE derivatives exchanges, clearinghouses, and data services. Major TradFi validation.' },
  { date: '2025-03-26', category: 'Expansion', event: 'USDC launched in Japan via SBI VC Trade', impact: 'First global dollar stablecoin in Japan', source: 'Press Release', verdict: 'positive', details: 'First and only global dollar stablecoin approved by Japan FSA. SBI VC Trade initiated trading; Binance Japan, bitbank, bitFlyer to follow. Opens $4T+ Japanese financial market.' },
  { date: '2025-01-21', category: 'Partnership', event: 'DRW/Cumberland strategic partnership announced', impact: 'Institutional liquidity for USDC/USYC', source: 'Press Release', verdict: 'positive', details: 'Partnership with major trading firm DRW via subsidiary Cumberland. Provides institutional-grade liquidity and settlement. Includes Canton Network deployment for TradFi integration.' },
  { date: '2025-01', category: 'Acquisition', event: 'Hashnote acquired ($100M - $10M cash + 2.9M shares)', impact: 'Added USYC tokenized money market fund', source: '8-K', verdict: 'positive', details: 'Acquired largest tokenized money market fund (~$1.5B AUM). USYC provides yield-bearing alternative to USDC for institutional collateral. Strategic move into tokenized securities.' },

  // === 2024 ===
  { date: '2024-12-11', category: 'Partnership', event: 'Binance strategic partnership for 240M users', impact: 'Largest exchange distribution', source: 'Press Release', verdict: 'positive', details: 'Strategic partnership with world largest crypto exchange (240M users). Binance adopting USDC for corporate treasury. USDC across full Binance product suite - trading, savings, payments. Major distribution win.' },
  { date: '2024-12-10', category: 'Expansion', event: 'ADGM incorporation + LuLu Financial Holdings partnership', impact: 'Middle East market entry', source: 'Press Release', verdict: 'positive', details: 'Incorporated entity in Abu Dhabi Global Market (ADGM). Partnership with LuLuFin ($10B+ annual transactions) for USDC-powered remittances across GCC, India, APAC, Europe corridors. Announced at Abu Dhabi Finance Week.' },
  { date: '2024-12-04', category: 'Regulatory', event: 'First stablecoin to meet Canadian VRCA requirements', impact: 'Canada market access', source: 'Press Release', verdict: 'positive', details: 'First stablecoin issuer to comply with Ontario Securities Commission / Canadian Securities Administrators VRCA requirements. USDC remains available on registered Canadian crypto platforms after Dec 31 deadline.' },
  { date: '2024-09-24', category: 'Corporate', event: 'First Global Impact Report unveiled at UN', impact: 'ESG/impact positioning', source: 'Press Release', verdict: 'positive', details: 'Circle Impact initiative report showcasing USDC for aid delivery, remittances, humanitarian use cases. Features Airtm, Ensuro, Kura, Goodwall partnerships. Unlocking Impact pitch competition for early-stage projects.' },
  { date: '2024-09-19', category: 'Governance', event: 'Bradley Horowitz appointed to Board of Directors', impact: 'Silicon Valley expertise', source: 'Press Release', verdict: 'positive', details: 'Former Google/Yahoo executive with 30+ years tech experience joins board. Co-founder/CTO of Virage, GP at Wisdom Ventures, #10 Seed Investor (Business Insider). MIT Media Science, Michigan CS.' },
  { date: '2024-09-13', category: 'Corporate', event: 'One World Trade Center global HQ announced', impact: 'NYC flagship presence', source: 'Press Release', verdict: 'positive', details: 'New global headquarters on 87th floor of One World Trade Center in Lower Manhattan. Configured as convening space for partners, developers, government leaders. Opening early 2025. ~1,000 employees across 36 states, 14 countries.' },
  { date: '2024-07', category: 'Regulatory', event: 'MiCAR compliance achieved via Circle Internet Financial Europe SAS', impact: 'EU regulatory clearance', source: 'Press Release', verdict: 'positive', details: 'First global stablecoin issuer to achieve MiCA compliance via French EMI license from ACPR. USDC and EURC now issued in EU under MiCA. Circle Mint France launched for European business customers.' },
  { date: '2024-05-29', category: 'Expansion', event: 'Circle launches in Brazil with BTG Pactual and Nubank', impact: 'Latin America distribution', source: 'Press Release', verdict: 'positive', details: 'Official Brazil launch at Circle Forum São Paulo. BTG Pactual (largest LatAm investment bank) as direct USDC distribution partner. Nubank (100M+ users) already has 200K+ customers transacting USDC.' },
  { date: '2024-04-11', category: 'Partnership', event: 'BlackRock BUIDL smart contract for USDC transfers', impact: 'Tokenized asset liquidity', source: 'Press Release', verdict: 'positive', details: 'Smart contract enables BUIDL fund holders to transfer shares to Circle for USDC. Provides near-instant, 24/7 off-ramp for BlackRock tokenized money market fund investors. Major TradFi validation.' },
  { date: '2024-01-15', category: 'Corporate', event: 'State of USDC Economy Report launched at Davos', impact: 'Industry thought leadership', source: 'Press Release', verdict: 'positive', details: 'Second annual report unveiled at World Economic Forum. Key stats: 2.7M wallets with $10+ USDC (up 59% YoY), $12T settled since 2018, 595M transactions in 2023, CCTP launched with 66.5K transactions.' },
  { date: '2024-01-11', category: 'SEC Filing', event: 'Confidential S-1 draft registration submitted to SEC', impact: 'IPO process initiated', source: 'Press Release', verdict: 'positive', details: 'Confidentially submitted draft registration statement on Form S-1 for proposed IPO. Number of shares and price range not yet determined. First formal step toward public listing.' },

  // === Earlier years (2013-2023) - abbreviated for space ===
  { date: '2023-08-21', category: 'Corporate', event: 'Centre Consortium dissolved; Coinbase takes equity stake', impact: 'USDC governance restructured', source: 'Press Release', verdict: 'positive', details: 'Circle takes full control of USDC issuance and governance from joint Centre Consortium. Coinbase takes equity stake in Circle. Revenue sharing based on USDC held on platforms. USDC launching on 6 new chains (total 15).' },
  { date: '2023-06-08', category: 'Governance', event: 'Heath Tarbert named Chief Legal Officer', impact: 'Regulatory expertise added', source: 'Press Release', verdict: 'positive', details: 'Former CFTC Chairman (14th), IOSCO Vice Chairman, and Assistant Secretary of Treasury joins as CLO. Previously at Citadel Securities and Allen & Overy. Brings decades of experience across all three branches of government.' },
  { date: '2023-04-26', category: 'Product', event: 'Cross-Chain Transfer Protocol (CCTP) mainnet launch', impact: 'Native USDC interoperability', source: 'Press Release', verdict: 'positive', details: 'Permissionless protocol enabling USDC to flow natively across chains via burn-and-mint. Launched on Ethereum and Avalanche. Partners include Celer, LayerZero, LI.FI, MetaMask, Wormhole. Solves bridged USDC fragmentation.' },
  { date: '2022-04-12', category: 'Capital', event: '$400M funding round (BlackRock, Fidelity, Marshall Wace, Fin Capital)', impact: 'Strategic investors added', source: 'Press Release', verdict: 'positive', details: 'Major institutional validation. BlackRock also becomes primary asset manager for USDC cash reserves + strategic partnership for USDC capital market applications. Closed Q2 2022.' },
  { date: '2022-02-17', category: 'Capital', event: 'SPAC deal revised: $9B valuation (up from $4.5B)', impact: 'Valuation doubled', source: 'Press Release', verdict: 'positive', details: 'New terms with Concord Acquisition Corp reflect USDC growth (>$52B circulation, doubled since July 2021). Extended deadline to Dec 2022. NYSE listing under CRCL planned. Goldman Sachs advisor.' },
  { date: '2021-05-28', category: 'Capital', event: '$440M financing round closed', impact: 'Growth capital', source: 'Press Release', verdict: 'positive', details: 'Top 10 private fintech investment. Investors: Fidelity, Marshall Wace, Willett Advisors, Atlas Merchant Capital, DCG, FTX, Breyer Capital, Valor, Pillar VC. USDC at $22B (+436% YTD).' },
  { date: '2020-12-03', category: 'Partnership', event: 'Visa partnership announced - Fintech Fast Track program', impact: 'Major payments network integration', source: 'Press Release', verdict: 'positive', details: 'Circle joins Visa Fintech Fast Track program. Announced Circle Visa corporate card enabling USDC spending at 60M+ merchants worldwide - first crypto firm with Visa corporate card. USDC payouts to 25+ Visa partner digital currency wallets. Joint sales/marketing program. USDC at $3B market cap.' },
  { date: '2019-07-22', category: 'Regulatory', event: 'Bermuda Class F Digital Assets Business License obtained', impact: 'International regulatory framework', source: 'Press Release', verdict: 'positive', details: 'First major crypto finance company to receive Class F (Full) DABA license covering payments, custody, exchange, trading. Enables non-US services via Circle International Bermuda. Plans for 30+ Bermuda staff. Premier David Burt partnership. Strong AML/CFT framework compliant with FATF standards.' },
  { date: '2018-10', category: 'Product', event: 'USDC stablecoin launched (partnership with Coinbase via Centre Consortium)', impact: 'Core product launch', source: 'Press Release', verdict: 'positive', details: 'USDC launched as a joint venture through Centre Consortium. Fully-reserved, dollar-backed stablecoin with monthly attestations. Initial circulation was modest but laid foundation for future growth.' },
  { date: '2013', category: 'Corporate', event: 'Circle founded by Jeremy Allaire and Sean Neville', impact: 'Company inception', source: 'Company History', verdict: 'positive', details: 'Founded in Boston by Jeremy Allaire (serial entrepreneur, former Macromedia CTO) and Sean Neville. Initial focus was consumer payments before pivoting to stablecoin infrastructure.' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get events by category
 */
export const getEventsByCategory = (category: string): TimelineEntry[] => {
  return TIMELINE.filter(e => e.category === category);
};

/**
 * Get all unique categories
 */
export const getCategories = (): string[] => {
  return [...new Set(TIMELINE.map(e => e.category))];
};

/**
 * Get events by year
 */
export const getEventsByYear = (year: number): TimelineEntry[] => {
  return TIMELINE.filter(e => e.date.startsWith(String(year)));
};

/**
 * Get positive events only
 */
export const getPositiveEvents = (): TimelineEntry[] => {
  return TIMELINE.filter(e => e.verdict === 'positive');
};
