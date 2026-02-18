/**
 * BMNR Competitor News Data
 * Extracted from BMNR.tsx for maintainability.
 * Track competitor/ecosystem news relevant to BMNR's thesis.
 * Newest first.
 */

import { CompetitorNewsEntry } from '../shared/competitor-schema';

// Competitor IDs used for BMNR: 'mstr' | 'mara' | 'riot' | 'coin' | 'clsk' | 'hut8' | 'ethz' | 'kraken' | 'other'
// Categories: 'Acquisition' | 'Funding' | 'Yield' | 'Regulatory' | 'Technology' | 'Partnership' | 'Financial' | 'Strategy'

// ═══════════════════════════════════════════════════════════════════════════
// COMPETITOR NEWS - Add new entries at TOP (newest first)
// NEVER delete old entries - this is an audit trail
// ═══════════════════════════════════════════════════════════════════════════
export const BMNR_COMPETITOR_NEWS: CompetitorNewsEntry[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ADD NEW COMPETITOR NEWS ENTRIES HERE (newest first)
  // Format:
  // {
  //   date: 'YYYY-MM-DD',
  //   competitor: 'mstr' | 'mara' | 'riot' | 'coin' | 'clsk' | 'hut8' | 'ethz' | 'kraken' | 'other',
  //   category: 'Acquisition' | 'Funding' | 'Yield' | 'Regulatory' | 'Technology' | 'Partnership' | 'Financial' | 'Strategy',
  //   headline: 'Brief headline',
  //   details: ['Bullet point 1', 'Bullet point 2'],
  //   implication: 'positive' | 'neutral' | 'negative',  // for BMNR
  //   thesisComparison: 'How this compares to BMNR',
  //   source: 'Source name',
  //   sourceUrl: 'https://...'
  // },
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - TOKENIZED AVIATION ASSETS (Feb 12, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-12',
    competitor: 'ethz',
    category: 'Technology',
    headline: 'ETHZilla launches Eurus Aero Token I: First tradable tokenized aviation assets on Ethereum L2',
    details: [
      'First-of-its-kind tokenized real-world asset: jet engines on lease with leading US air carrier',
      'Two CFM56 engines acquired for ~$12.2M, tokenized at $100/token with ~11% target return',
      'ERC-20 tokens on Ethereum L2 with on-chain verification and automated monthly distributions',
      'Structured through wholly owned SPV ETHZilla Aerospace LLC via Liquidity.io ecosystem',
      'Leases extend into 2028 with $3M put/call rights and residual distribution to token holders',
      'Plans to expand tokenization to manufactured home loans and car loans via Zippy and Karus',
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla (ETHZ, ~102K ETH, Nasdaq) pivoting from pure ETH treasury to RWA tokenization on Ethereum L2. Creates differentiated use case vs BMNR\'s pure ETH accumulation strategy. BMNR holds 42x more ETH and focuses on scale + staking yield, while ETHZ diversifies into tokenized asset origination. Both strategies validate Ethereum ecosystem but differ in approach: BMNR = concentrated ETH treasury, ETHZ = ETH + RWA tokenization platform.',
    source: 'PR Newswire',
    storyId: 'eth-treasury-competitors',
    storyTitle: 'ETH Treasury Competitors',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBALSTAKE - BTC YIELD GATEWAY (Feb 9, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-09',
    competitor: 'other',
    category: 'Yield',
    headline: 'GlobalStake launches Bitcoin Yield Gateway for institutional clients with 4-14% net APY',
    details: [
      'Aggregates multiple BTC yield strategies (4-14% net APY)',
      'Enterprise-grade API for custodians and exchanges',
      'Targets institutional BTC yield market',
    ],
    implication: 'neutral',
    thesisComparison: 'BTC yield infrastructure expanding alongside ETH staking yield. BMNR\'s ETH staking yield (3-5%) targets same institutional demand for crypto-native returns.',
    source: 'PR Newswire',
    storyId: 'btc-treasury-ecosystem',
    storyTitle: 'BTC Treasury & Yield Ecosystem',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // METALPHA - BTC TREASURY ALLOCATION (Feb 9, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-09',
    competitor: 'other',
    category: 'Strategy',
    headline: 'Metalpha (Nasdaq: MATH) adopts BTC allocation plan up to 20% of annual net profit (~$3.2M)',
    details: [
      'Adopts BTC allocation plan up to 20% of annual net profit (~$3.2M)',
      'Initial $1M purchase at ~$54,000/BTC via proprietary Accumulator structure',
    ],
    implication: 'neutral',
    thesisComparison: 'Another Nasdaq-listed company establishing BTC treasury. Growing trend of corporate crypto treasuries validates BMNR\'s ETH treasury model.',
    source: 'PR Newswire',
    storyId: 'btc-treasury-ecosystem',
    storyTitle: 'BTC Treasury & Yield Ecosystem',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BITWISE - MODEL PORTFOLIO SOLUTIONS (Feb 3, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-03',
    competitor: 'kraken',
    category: 'Strategy',
    headline: 'Bitwise launches model portfolio solutions for digital assets with $15B+ client AUM',
    details: [
      'Seven models across core and thematic strategies',
      'Bitwise is Kraken Institutional strategy partner',
      '$15B+ client AUM',
    ],
    implication: 'positive',
    thesisComparison: 'Bitwise model portfolios through Kraken Institutional expand institutional access to digital asset strategies. Growing institutional crypto allocation infrastructure supports BMNR investor base.',
    source: 'PR Newswire',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WIREX - CHIMERA CARD BTC PAYMENTS (Feb 3, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-03',
    competitor: 'other',
    category: 'Technology',
    headline: 'Wirex powers Chimera Card launch: Bitcoin-funded non-custodial debit card at 80M+ merchants',
    details: [
      'Bitcoin-funded non-custodial debit card accepted at 80M+ merchants globally',
      'Powered by Wirex BaaS infrastructure',
    ],
    implication: 'neutral',
    thesisComparison: 'BTC-funded payment cards expand crypto spending utility. Growing real-world crypto payment infrastructure benefits broader ecosystem adoption.',
    source: 'PR Newswire',
    storyId: 'crypto-ecosystem',
    storyTitle: 'Crypto Ecosystem',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - INSTITUTIONAL BESPOKE INVESTMENT SOLUTION (Feb 5, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-05',
    competitor: 'kraken',
    category: 'Strategy',
    headline: 'Kraken Institutional announces first bespoke investment solution with Bitwise Asset Management',
    details: [
      'Bitwise Custom Yield Strategy available to eligible institutional clients',
      'Delivered by Bitwise as external strategy manager within Kraken\'s qualified custody, execution and risk framework',
      'First of multiple managed strategies planned — building infrastructure for diverse crypto opportunities',
      'All strategies undergo structured internal review and remain subject to ongoing oversight',
      'Minimal lock-up periods to support flexible liquidity management',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken expanding institutional crypto investment products validates demand for managed crypto yield strategies. BMNR\'s ETH staking yield (3-5%) could appeal to the same institutional audience seeking crypto-native returns. Kraken is also a BMNR institutional investor.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - PROOF OF RESERVES DEC 2025 (Feb 5, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-05',
    competitor: 'kraken',
    category: 'Regulatory',
    headline: 'Kraken releases December 2025 Proof of Reserves confirming 1:1+ client asset backing',
    details: [
      'Covers major cryptoassets including BTC, ETH, SOL, USDC, USDT, XRP and ADA',
      'Uses Merkle tree for cryptographic verification with user-level proof',
      'Independent third-party accountancy firm attestation — publishes quarterly',
      'Accounts for total client liabilities including margin, futures, and staked positions',
      'Pioneered PoR in 2014 — longest-running transparency program among major exchanges',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s PoR covering ETH validates institutional-grade custody for ETH holdings. As BMNR grows its ETH treasury, exchange PoR transparency reinforces trust in the broader ETH custody ecosystem that BMNR depends on.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - WILLIAMS F1 PARTNERSHIP RENEWAL (Jan 27, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-27',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken renews long-term partnership with Atlassian Williams F1 Team with front wing branding for 2026',
    details: [
      'Partnership since 2023 as Official Crypto and Web3 Partner, now renewed long-term',
      'Kraken moves to front wing branding on FW48 for 2026 Formula 1 season',
      'Grid Pass digital collectible program and Presenting Partner of global Fan Zones',
      'Part of Williams\' portfolio of major brand renewals (Duracell, Gulf Oil, VAST Data)',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s mainstream marketing increases crypto adoption broadly. As a BMNR institutional investor, Kraken\'s growing brand and user base could translate to increased awareness and demand for ETH treasury investment vehicles like BMNR.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - DEFI EARN WITH USDC/ETH YIELD (Jan 26, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-26',
    competitor: 'kraken',
    category: 'Yield',
    headline: 'Kraken launches DeFi Earn with up to 8% APY via audited Veda vaults on Ethereum',
    details: [
      'Earn up to 8% APY on cash and stablecoins via audited Veda vaults supplying liquidity to Ethereum-based onchain lending',
      'Three risk-managed vault options: Balanced Yield (Chaos Labs), Boosted Yield (Chaos Labs), Advanced Strategies (Sentora)',
      'Available in 48 US states (excl. NY, ME), Canada, and European Economic Area',
      'Withdrawals typically instant with minimal lock-up periods',
      'Converts user deposits to USDC, then deploys to DeFi lending protocols — increases Ethereum DeFi TVL',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken\'s DeFi Earn validates institutional demand for Ethereum-based yield. Deploys capital to Ethereum lending protocols, growing DeFi TVL and demand for ETH. BMNR\'s 3-5% ETH staking yield is a complementary but different yield strategy — staking secures the network vs lending generates borrower interest.',
    source: 'Kraken Blog',
    storyId: 'kraken-defi',
    storyTitle: 'Kraken DeFi & Yield Products',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - ATLETICO MADRID MEMECOIN SHOWDOWN (Jan 21, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-21',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken announces memecoin showdown with Atletico Madrid jersey sleeve placement as prize',
    details: [
      'Memecoins compete by trading volume on Kraken (Jan 22 – Feb 15, 2026)',
      'Winner replaces Kraken logo on Atletico de Madrid shirt sleeve for Barcelona match (Apr 4-5)',
      'Participating tokens: BERT, GIGA, PONKE, UFD, USDUC, USELESS',
      'Follows successful 2025 memecoin showdown with Williams F1 (Pengu in Singapore)',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s sports marketing drives retail crypto engagement and platform growth. While memecoin activity doesn\'t directly impact BMNR, growing Kraken\'s user base as a BMNR institutional investor increases potential distribution channel for ETH treasury products.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - CRYPTO 2026 OUTLOOK (Jan 15, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-15',
    competitor: 'kraken',
    category: 'Strategy',
    headline: 'Kraken economist outlines 2026 outlook: compressed BTC volatility, stablecoins at ATH, RWA tokenization 3x growth',
    details: [
      'Bitcoin ETFs and Strategy (MSTR) collectively represented ~$44B net spot demand in 2025, yet price disappointed — supply from long-term holders offsetting',
      'Bitcoin Coin Days Destroyed reached highest level on record in Q4 2025 — meaningful turnover from legacy HODLers',
      'BTC dominance averaged above 60% in 2025, no sustained breakdown toward sub-50% — typical late-cycle excess not yet seen',
      'Stablecoin liquidity at all-time highs, systemic risk indicators contained',
      'Tokenization of RWAs grew from ~$5.6B to ~$19B in single year — expanding beyond Treasuries into commodities, private credit, equities',
      'DeFi tokenomics evolving: Uniswap-style fee sharing could reprice governance tokens toward durable valuation frameworks',
      'CLARITY Act could provide framework for digital commodities, accelerating US as crypto capital of the world',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken\'s research directly relevant to BMNR thesis: (1) BTC dominance >60% without alt rotation suggests ETH catch-up potential, (2) DeFi tokenomics maturation (fee sharing) validates ETH staking yield thesis, (3) RWA tokenization 3x growth benefits Ethereum as primary settlement layer, (4) stablecoin ATH supports Ethereum DeFi ecosystem where BMNR\'s staked ETH operates.',
    source: 'Kraken Blog',
    storyId: 'kraken-research',
    storyTitle: 'Kraken Market Research',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - ETHENA USDE CUSTODY (Jan 6, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-06',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken selected as custody partner for Ethena\'s USDe synthetic dollar stablecoin',
    details: [
      'Approved by Ethena Risk Committee for custody of USDe backing assets',
      'Assets in fully segregated, bankruptcy-remote, cold-storage vaults operated by US state-chartered bank',
      'Monthly custodian attestations and weekly Proof of Reserves for USDe',
      'USDe uses delta-neutral derivatives strategy — shorts ETH perpetuals against ETH collateral to create synthetic dollar',
      'Kraken Custody uses HSM + MPC security architecture with in-house security teams',
    ],
    implication: 'neutral',
    thesisComparison: 'USDe\'s model shorts ETH perpetuals, creating selling pressure that could suppress ETH prices — net negative for BMNR\'s ETH treasury value. However, Ethena also holds significant ETH collateral, and the growing USDe ecosystem increases demand for ETH derivatives liquidity. Kraken as custody partner signals institutional-grade ETH infrastructure maturation.',
    source: 'Kraken Blog',
    storyId: 'kraken-defi',
    storyTitle: 'Kraken DeFi & Yield Products',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - EUROPE 2025 EXPANSION (Dec 31, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-31',
    competitor: 'kraken',
    category: 'Regulatory',
    headline: 'Kraken completes pivotal 2025 European expansion with MiCA and MiFID compliance',
    details: [
      'Regulatory clarity achieved via MiCA and MiFID frameworks across EU',
      'Expanded across France, Ireland, Germany, Netherlands, Poland, Spain',
      'Built local teams and launched new products for European markets',
      'Positions Kraken as regulated crypto partner across the EU',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken\'s EU regulatory compliance expands the pool of regulated investors who can access crypto treasury products. As MiCA provides clarity for digital asset investment, European institutional capital could flow into ETH treasury vehicles like BMNR. Kraken\'s EU presence as a BMNR investor creates distribution optionality.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - XSTOCKS ON TON BLOCKCHAIN (Dec 18, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-18',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken\'s xStocks tokenized equities launch on TON blockchain — $180M+ onchain, multichain expansion',
    details: [
      'Fully collateralized tokenized stocks and ETFs on TON blockchain via Telegram\'s ~100M wallet users',
      'Over $180M in tokenized assets onchain with ~50K unique wallet addresses',
      'Multichain: available on Solana, Ethereum, and now TON (Mantle and TRON underway)',
      'Kraken announced acquisition of Backed Finance to unify xStocks issuance, trading, and settlement',
      'Co-CEO Arjun Sethi: "financial assets as neutral, composable building blocks on open networks"',
    ],
    implication: 'neutral',
    thesisComparison: 'Tokenized equities represent an alternative onchain investment vehicle competing for the same institutional capital as crypto treasury companies. However, xStocks on Ethereum increases Ethereum ecosystem utility and transaction demand. If tokenized assets settle in ETH or require ETH gas, this is net positive for ETH value.',
    source: 'Kraken Blog',
    storyId: 'kraken-xstocks',
    storyTitle: 'Kraken Tokenized Equities (xStocks)',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - ALPACA XSTOCKS PARTNERSHIP (Dec 17, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-17',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken deepens Alpaca partnership as preferred venue for xStocks — surpasses $10B combined volume',
    details: [
      'Alpaca becomes preferred venue for sourcing and custodying underlying equities backing xStocks 1:1',
      'xStocks surpassed $10B in combined transaction volume since June 2025 launch',
      'Real-time mint and redeem via Alpaca\'s Instant Tokenization Network (ITN)',
      'Plans to expand beyond equities to broader suite of tokenized securities and real-world assets',
    ],
    implication: 'neutral',
    thesisComparison: 'xStocks\' $10B+ volume shows growing demand for tokenized financial assets. As RWA tokenization scales on Ethereum, it increases the blockchain\'s utility as settlement infrastructure — supportive of ETH value and the ETH treasury thesis underlying BMNR.',
    source: 'Kraken Blog',
    storyId: 'kraken-xstocks',
    storyTitle: 'Kraken Tokenized Equities (xStocks)',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - MAKER FEE PROGRAM UPDATE (Dec 17, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-17',
    competitor: 'kraken',
    category: 'Financial',
    headline: 'Kraken optimizes maker fee incentives, graduates 6 high-volume trading pairs with $50M+ monthly volume',
    details: [
      '6 trading pairs moved to regular maker fee schedule after achieving self-sustaining liquidity',
      'Graduated pairs demonstrated $50M+ 30-day volume with $100K+ market depth',
      'Maker rebates continue on 425+ other trading pairs for liquidity support',
      'Indicates growing platform maturity and organic trading activity across crypto markets',
    ],
    implication: 'neutral',
    thesisComparison: 'Deep exchange liquidity across 425+ pairs supports healthy ETH price discovery and trading. As a BMNR investor, Kraken\'s growing liquidity infrastructure creates a more efficient market for ETH, reducing slippage and improving execution for large ETH treasury transactions.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - MOBILE PERFORMANCE ENGINEERING (Dec 17, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-17',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken engineering details Maestro-based mobile performance regression prevention system',
    details: [
      'App Render Complete and Navigation Total Blocking Time as primary mobile performance metrics',
      'Automated benchmarks for every merge using Maestro end-to-end testing framework',
      'Network traffic recording and replay to isolate mobile code changes from backend variability',
      'Moving average alerting: fires when metric regresses >10% for 2+ consecutive runs',
      'React Native New Architecture adoption for baseline performance improvement',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken investing in mobile performance engineering signals platform maturation and focus on user experience. Improved app reliability and speed lowers barriers for retail and institutional users to trade crypto, supporting broader ETH market liquidity.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - USDG MARGIN COLLATERAL (Dec 10, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-10',
    competitor: 'kraken',
    category: 'Financial',
    headline: 'Kraken adds Global Dollar (USDG) as margin and futures collateral currency with 1% haircut',
    details: [
      'USDG (Global Dollar) added to margin and futures collateral lineup — now 50+ options',
      '1% haircut — same tier as other major stablecoins',
      'Collateral currencies allow margin trading without selling underlying assets',
      'Both unstaked and Kraken Rewards assets eligible as margin collateral',
    ],
    implication: 'neutral',
    thesisComparison: 'More stablecoin collateral options on Kraken deepens margin trading liquidity. Improved margin infrastructure supports ETH derivatives trading and hedging — beneficial for BMNR as deeper ETH markets improve price discovery.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - USDT0 ON PLASMA (Dec 10, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-10',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken supports USDT0 deposits and withdrawals on Plasma stablecoin-optimized blockchain',
    details: [
      'USDT0 funding via Plasma network now live on Kraken',
      'USDT0 is unified liquidity network for USDT — simplifies cross-chain movement',
      'Plasma is blockchain purpose-built for high-volume, low-cost stablecoin activity',
      'Serves as core settlement layer for instant digital dollar payments',
    ],
    implication: 'neutral',
    thesisComparison: 'Stablecoin infrastructure expansion (USDT0 on Plasma) grows the broader crypto ecosystem. More efficient stablecoin rails support trading and DeFi activity that ultimately drives ETH demand for gas and settlement.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - AVELACOM ULTRA-LOW-LATENCY (Dec 8, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-08',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken partners with Avelacom for ultra-low-latency institutional trading connectivity',
    details: [
      'Avelacom provides high-performance connectivity to Kraken\'s matching engine',
      'London-Tokyo route achieves sub-138ms round-trip latency over fiber',
      'Hybrid fiber/wireless routes reduce latency further for Tokyo-based exchanges',
      'Supports cross-venue arbitrage, hedging, and multi-venue liquidity aggregation',
      '99.9% uptime with dedicated 24/7 support',
    ],
    implication: 'neutral',
    thesisComparison: 'Ultra-low-latency connectivity attracts institutional and HFT traders to Kraken, deepening ETH market liquidity. As a BMNR institutional investor, Kraken\'s growing institutional infrastructure strengthens the ETH trading ecosystem that supports BMNR\'s treasury valuation.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - COLOMBIA EXPANSION (Dec 4, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-04',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken expands in Colombia with local COP payment rails and auto-conversion to USD',
    details: [
      'Colombian clients can deposit COP directly through domestic payment methods',
      'Deposits automatically converted to USD at competitive exchange rates',
      'Access to 500+ digital assets and global liquidity',
      'Part of broader Latin America strategy including Argentina, Mexico, and Colombia',
      'Colombia described as one of most dynamic crypto markets in Latin America',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s geographic expansion into Colombia adds new users to the crypto ecosystem. Growing Kraken\'s user base as a BMNR institutional investor increases platform scale and potential demand for ETH-based products.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - DEUTSCHE BÖRSE PARTNERSHIP (Dec 4, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-04',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken and Deutsche Börse announce strategic partnership bridging traditional and digital markets',
    details: [
      'Integration with 360T — one of world\'s largest FX trading venues — for bank-grade FX liquidity',
      'Kraken Embed white-label solutions for banks and fintechs to offer crypto trading',
      'Plans for Eurex-listed derivatives on Kraken (subject to regulatory approval)',
      'Integration of xStocks within 360X tokenized asset ecosystem',
      'Clearstream and Crypto Finance for institutional custody',
      'Two-way U.S./European institutional market gateway',
    ],
    implication: 'positive',
    thesisComparison: 'Deutsche Börse partnership is a landmark TradFi-crypto bridge. Eurex derivatives on Kraken could eventually include ETH products, improving institutional ETH access. Clearstream custody integration validates institutional-grade ETH custody demand. Major positive for ETH ecosystem institutional adoption.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - XSTOCKS 24/7 TRADING (Dec 3, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-03',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken Pro enables 24/7 trading for top 10 xStocks tokenized equities including MSTRx',
    details: [
      'Full 24/7 coverage for TSLAx, QQQx, SPYx, NVDAx, CRCLx, AAPLx, HOODx, MSTRx, GLDx, GOOGLx',
      'Previously 24/5 — now includes weekends and public holidays',
      'On-chain 24/7 settlement combined with Kraken Pro institutional-grade execution',
      'Phase one of broader rollout to additional tokenized stocks and ETFs',
    ],
    implication: 'neutral',
    thesisComparison: 'MSTRx (tokenized MicroStrategy) being among top 10 xStocks shows demand for crypto treasury exposure via tokenized equities. If/when BMNR gets tokenized as an xStock, it would provide 24/7 global access to ETH treasury exposure. xStocks on Ethereum drives chain utility.',
    source: 'Kraken Blog',
    storyId: 'kraken-xstocks',
    storyTitle: 'Kraken Tokenized Equities (xStocks)',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - BACKED ACQUISITION (Dec 2, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-02',
    competitor: 'kraken',
    category: 'Strategy',
    headline: 'Kraken to acquire Backed Finance, unifying xStocks issuance, trading and settlement',
    details: [
      'xStocks surpassed $10B combined exchange and onchain volume within 6 months',
      'Acquisition unifies issuance, trading, and settlement under Kraken',
      'xStocks live on Solana and Ethereum — TON, Tron, Mantle, BNB Chain integrations coming',
      'Plans to integrate xStocks into Krak money app for hold-and-spend',
      'Over 60 tokenized equities and ETFs backed 1:1 by underlying asset',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken vertically integrating tokenized equities strengthens their position as crypto infrastructure provider. xStocks on Ethereum increases Ethereum settlement demand and chain utility. Potential future tokenization of BMNR shares as an xStock could unlock 24/7 global access.',
    source: 'Kraken Blog',
    storyId: 'kraken-xstocks',
    storyTitle: 'Kraken Tokenized Equities (xStocks)',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - MARKET PARTICIPATION PROGRAM (Dec 1, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-01',
    competitor: 'kraken',
    category: 'Financial',
    headline: 'Kraken launches Market Participation Program with equity-linked warrant incentives for top traders',
    details: [
      'Largest clients by trading volume can qualify for Kraken-equity-linked warrants',
      'First-of-its-kind equity incentive approach among global Tier 1 crypto exchanges',
      'Transparent, time-bound, rule-based structure',
      'Designed to attract and retain most active trading participants and improve market liquidity',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken incentivizing high-volume market makers deepens ETH trading liquidity on the platform. Better market-making reduces spreads and improves price discovery for ETH, supporting the efficiency of BMNR\'s ETH treasury valuation.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - EURC MARGIN COLLATERAL (Nov 24, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-24',
    competitor: 'kraken',
    category: 'Financial',
    headline: 'Kraken adds EURC (Circle\'s Euro stablecoin) as margin and futures collateral with 1% haircut',
    details: [
      'EURC added to margin collateral lineup — now 54 options total',
      '1% haircut — same tier as USDC, USDT, and other major stablecoins',
      'Enables Euro-denominated margin trading without selling EURC holdings',
      'Supports hedging, short selling, and leveraged strategies using EURC collateral',
    ],
    implication: 'neutral',
    thesisComparison: 'More stablecoin collateral options on Kraken broadens the margin trading ecosystem. Additional collateral currencies support more complex ETH derivatives strategies, contributing to overall ETH market depth and efficiency.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - RAMP API LAUNCH (Nov 20, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-20',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken launches Ramp: developer-friendly API for fiat-to-crypto on/off-ramps across 400+ assets',
    details: [
      'Single API + SDK for any platform to integrate buy/sell crypto flows',
      '24+ payment methods: cards, ACH, PIX, SEPA, Apple Pay, Google Pay and more',
      '400+ assets across 100+ blockchains supported',
      'Targets fintechs, banks, wallets, protocols, exchanges, GameFi, and developers',
      'Kraken manages compliance, licensing, fraud prevention, and payment operations',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken Ramp as B2B infrastructure lowers barriers for new platforms to offer crypto. More fiat on-ramps across 400+ assets expands the addressable market for ETH purchases. Every new Ramp integration is a potential new distribution channel for ETH exposure, supporting BMNR\'s ETH treasury value.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - CUSTODY EUROPE MICA (Nov 19, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-19',
    competitor: 'kraken',
    category: 'Regulatory',
    headline: 'Kraken expands custody to Europe under MiCA via Payward Europe Solutions Limited (Ireland)',
    details: [
      'PESL authorized and regulated by Central Bank of Ireland under MiCA',
      'Client assets fully segregated from PESL\'s and Kraken exchange\'s assets',
      'Independent audits and transparent reserves with MiCA-compliant governance',
      'Unified architecture with Kraken Financial in the U.S.',
      'Serves institutional clients: fiduciaries, funds, and corporate treasuries across EEA',
    ],
    implication: 'positive',
    thesisComparison: 'MiCA-regulated custody in the EEA creates institutional-grade infrastructure for European institutions to hold ETH. Regulated custody is a prerequisite for institutional ETH allocation — directly supports the thesis that institutional capital will flow into ETH treasury vehicles like BMNR.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - XSTOCKS $10B VOLUME (Nov 12, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-12',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'xStocks surpasses $10B total volume with nearly $2B onchain — 45K+ unique holders in 135 days',
    details: [
      '$10B combined centralized and decentralized exchange volume in 135 days since launch',
      'Nearly $2B in onchain activity across Solana and Ethereum',
      '45,000+ unique onchain holders with $135M+ aggregated AUM',
      'Partners include Alchemy Pay, Bybit, Gate.io, Phantom Wallet, Trust Wallet',
      'Each xStock fully backed 1:1 by underlying equity in bankruptcy-remote structure',
    ],
    implication: 'neutral',
    thesisComparison: 'xStocks\' $2B onchain volume demonstrates growing demand for Ethereum-based tokenized assets. Ethereum as the settlement layer for tokenized equities increases chain utility and transaction demand — supportive of ETH value and the BMNR treasury thesis.',
    source: 'Kraken Blog',
    storyId: 'kraken-xstocks',
    storyTitle: 'Kraken Tokenized Equities (xStocks)',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - BSO TOKYO/LONDON CONNECTIVITY (Nov 4, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-04',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken partners with BSO for ultra-low-latency Tokyo/London connectivity under 140ms round-trip',
    details: [
      'Purpose-built ultra-low-latency route between Tokyo and London — sub-140ms round-trip',
      '60-80ms faster than previously available standard routes',
      'Physical data center access at AT TOKYO CC1/CC2, Equinix TY2/TY3 plus cloud on-ramp',
      '99.99% uptime with automatic rerouting and SLA-backed performance',
      'Targets market makers, quant funds, and HFT firms for cross-venue strategies',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s second ultra-low-latency partnership (BSO for Tokyo/London, alongside Avelacom) signals aggressive push for institutional trading infrastructure. Deeper institutional engagement with Kraken strengthens the ETH market ecosystem and validates crypto as institutional asset class.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - SEPTEMBER 2025 PROOF OF RESERVES (Oct 22, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-22',
    competitor: 'kraken',
    category: 'Regulatory',
    headline: 'Kraken releases September 2025 Proof of Reserves covering BTC, ETH, SOL, USDC, USDT, XRP, ADA',
    details: [
      'Attested as of September 30, 2025 — client assets backed 1:1 and beyond',
      'Covers spot, margin, futures, and staked asset balances',
      'Merkle tree cryptographic verification with user-level proof tool',
      'Independent third-party accountancy firm attestation — published quarterly',
      'Pioneered PoR in 2014 — longest-running transparency program among major exchanges',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s quarterly PoR covering ETH validates institutional-grade custody transparency. As BMNR grows its ETH treasury, exchange PoR transparency reinforces trust in the broader ETH custody ecosystem that BMNR depends on.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional & Exchange',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - $4.7M MANUFACTURED HOME LOAN PORTFOLIO PURCHASE (Feb 5, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-05',
    competitor: 'ethz',
    category: 'Acquisition',
    headline: 'ETHZilla purchases $4.7M manufactured home loan portfolio, plans tokenization on Ethereum L2',
    details: [
      'Acquires portfolio of 95 manufactured/modular home loans from Zippy for ~$4.7M via ETHZilla Modular Mortgage LLC',
      'First-lien mortgages with annualized yield of ~10.36% from seasoned residential credit assets',
      'Plans to tokenize into cash-flow-generating token on Ethereum L2 via Liquidity.io ecosystem in late Feb/early Mar',
      'Follows prior purchase of two CFM56-7B24 aircraft engines on lease, also planned for tokenization',
      'Builds on Dec 2025 acquisition of 15% stake in Zippy — demonstrates repeatable RWA framework'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla moving from strategic investment to actual asset acquisition and tokenization. Multiple asset classes (manufactured homes + aircraft engines) in pipeline. BMNR focuses on pure ETH staking yield vs ETHZilla\'s RWA tokenization revenue model.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-rwa',
    storyTitle: 'ETHZilla RWA Tokenization'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - $21M ZIPPY INVESTMENT (Dec 10, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-10',
    competitor: 'ethz',
    category: 'Partnership',
    headline: 'ETHZilla invests $21M in Zippy to tokenize manufactured home loans on Ethereum',
    details: [
      'Acquires 15% fully diluted stake in Zippy for $21.1M ($5M cash + $16.1M stock)',
      'Target: $14B manufactured home financial services market',
      'Zippy: first to introduce modern digital infrastructure and AI-enabled systems to manufactured housing lending',
      '36-month exclusive tokenization agreement via Liquidity.io (FINRA-regulated ATS on Ethereum L2)',
      'ETHZilla ecosystem: Liquidity.io (tokenized private credit), Karus (AI risk forecasting for structured auto credit)'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla expanding into housing finance RWA tokenization with exclusive distribution via FINRA-regulated ATS. BMNR\'s pure ETH staking model is simpler but ETHZilla\'s diversified revenue streams could attract different investor base.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-rwa',
    storyTitle: 'ETHZilla RWA Tokenization'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - 20% KARUS ACQUISITION (Dec 3, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-03',
    competitor: 'ethz',
    category: 'Partnership',
    headline: 'ETHZilla acquires 20% of Karus to power AI-modeled auto loan tokenization on Ethereum',
    details: [
      'Acquires 20% fully diluted interest in Karus for $10M ($3M cash + $7M stock)',
      'Karus AI trained on 20M+ historical auto loan outcomes, analyzes 1,000+ variables in real time',
      '$5B+ in auto loan volume already processed through decisioning engine',
      'Access to network of 20,000+ car dealerships, credit unions, and banks',
      'First tokenized portfolios expected early 2026 via Liquidity.io',
      'Entry point into ~$1.6T US asset-backed securities market'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla entering $1.6T ABS market with AI-powered credit analytics. Diversifying beyond pure ETH treasury into RWA revenue generation. BMNR\'s pure staking model has lower execution risk vs ETHZilla\'s complex multi-subsidiary approach.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-rwa',
    storyTitle: 'ETHZilla RWA Tokenization'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - SELLS ~$40M ETH FOR BUYBACKS (Oct 27, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-27',
    competitor: 'ethz',
    category: 'Strategy',
    headline: 'ETHZilla sells ~$40M ETH to fund share repurchases below NAV',
    details: [
      'Sells approximately $40M of ETH treasury holdings to fund share repurchases',
      'Repurchased ~600K shares for ~$12M since Oct 24 under $250M buyback program',
      'Plans to continue selling ETH until discount to NAV normalizes',
      'Still holds ~$400M ETH',
      'CEO Rudisill: "repurchases to be immediately accretive"'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla selling ETH = net seller pressure on ETH market. However, demonstrates capital allocation discipline. If NAV discount persists for ETH treasury companies, raises questions about the model — relevant for BMNR\'s own ETH treasury thesis.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-capital',
    storyTitle: 'ETHZilla Treasury & Capital'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - LIQUIDITY.IO PARTNERSHIP + 15% SATSCHEL STAKE (Oct 23, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-23',
    competitor: 'ethz',
    category: 'Partnership',
    headline: 'ETHZilla partners with Liquidity.io for RWA tokenization, takes 15% stake in Satschel',
    details: [
      'Invests $15M ($5M cash + $10M equity) for 15% stake in Satschel with right of first refusal',
      'Liquidity.io is a regulated broker-dealer operating a Digital ATS (FINRA-regulated)',
      'Partnership to accelerate institutional-grade tokenization of RWAs on Ethereum L2',
      'Secures exclusive right to list Ethereum L2 tokens on the exchange',
      'Evolution from pure ETH treasury to active RWA tokenization platform with regulated distribution'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla building regulated RWA distribution channel via FINRA-regulated ATS — competitive moat in tokenization space. BMNR focuses on pure ETH staking; ETHZilla pivoting to "next-generation asset manager" model.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-rwa',
    storyTitle: 'ETHZilla RWA Tokenization'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - 1-FOR-10 REVERSE STOCK SPLIT (Oct 15, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-15',
    competitor: 'ethz',
    category: 'Strategy',
    headline: 'ETHZilla announces 1-for-10 reverse stock split',
    details: [
      'Effective Oct 20, 2025 — reduces outstanding shares from ~160M to ~16M',
      'Intended to provide institutional investors access to collateral and margin availability at prices >$10',
      'Not related to exchange listing requirements',
      'Many large mutual funds have minimum stock price thresholds',
      'Signals targeting broader institutional investor base beyond crypto-native capital'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla optimizing share structure for institutional access. Capital structure maturation could increase institutional investor pool for ETH treasury equities broadly, including BMNR.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-corporate',
    storyTitle: 'ETHZilla Corporate'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - BOARD APPOINTMENT: LAZARD VICE CHAIRMAN (Oct 8, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-08',
    competitor: 'ethz',
    category: 'Strategy',
    headline: 'ETHZilla appoints Jason New (Lazard Vice Chairman) to board',
    details: [
      'Jason New, Vice Chairman of Investment Banking at Lazard, joins board',
      '20+ years experience in global credit, PE, and alternative investments',
      'Previously co-founded NovaWulf Management (digital-asset platform)',
      'Was CEO of Onex Credit Partners ($25B alt credit manager)',
      '15 years at Blackstone as Senior MD and Global Co-Head of Distressed/Special Situations at GSO Capital Partners'
    ],
    implication: 'neutral',
    thesisComparison: 'Traditional finance heavyweights joining ETH treasury company boards validates institutional interest in the model. Increasing board-level credibility for ETH treasury companies could improve investor appetite for sector including BMNR.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-corporate',
    storyTitle: 'ETHZilla Corporate'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - $47M ETH TO PUFFER RESTAKING (Sep 25, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-09-25',
    competitor: 'ethz',
    category: 'Yield',
    headline: 'ETHZilla plans ~$47M ETH deployment to Puffer restaking protocol',
    details: [
      'Plans to deploy ~$47M (~10,600 ETH) to Puffer liquid restaking protocol',
      'Puffer has 2 ETH validator bond framework providing insurance against validator failures',
      'Puffer building vertical crypto infrastructure: LRT, Unifi based rollup, Preconf AVS',
      'Third DeFi protocol deployment by ETHZilla (after EtherFi and unnamed protocol)',
      'Multi-protocol diversification across staking and restaking'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla diversifying DeFi yield across multiple restaking protocols (EtherFi, Puffer, others). Validates institutional restaking thesis. BMNR can learn from ETHZilla\'s multi-protocol approach for its own staking strategy.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-defi',
    storyTitle: 'ETHZilla DeFi & Yield'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - $350M CONVERTIBLE DEBENTURE + mNAV METRIC (Sep 22, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-09-22',
    competitor: 'ethz',
    category: 'Funding',
    headline: 'ETHZilla raises $350M add-on convertible debenture, introduces mNAV metric',
    details: [
      'Raises $350M through new convertible debentures at $3.05/share (1.05x mNAV)',
      'Existing $156.5M convertible amended: 0% interest until Feb 2026, then 2% (down from 4%)',
      'New debentures bear 2% interest',
      'Introduces mNAV metric: EV/ETH NAV = 0.87x',
      'Total position: 102,264 ETH (~$462M), $559M cash',
      'Clear Street as exclusive financial advisor'
    ],
    implication: 'neutral',
    thesisComparison: 'ETHZilla raising $350M+ validates institutional appetite for ETH-backed securities. mNAV metric creates industry standard for evaluating crypto treasury companies — direct comparison framework for BMNR valuation.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-capital',
    storyTitle: 'ETHZilla Treasury & Capital'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - ETH DEPLOYED TO L2 PROTOCOLS (Sep 15, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-09-15',
    competitor: 'ethz',
    category: 'Yield',
    headline: 'ETHZilla deploys ETH to L2 protocols, earns 1.5M protocol tokens',
    details: [
      'Portfolio: 44,437 ETH unstaked, 12,818 ETH in Protocol 1 staking/restaking, 45,000 ETH in Protocol 2',
      'Earned 1.5M protocol tokens (~$2.2M) — new revenue stream',
      'Minted first EtherFi ETH',
      '102,255 total ETH (~$460M), $228M cash',
      'Repurchased ~6.0M shares in September at avg $2.50',
      'Drew $50M from Cumberland DRW facility',
      'Pivoting toward "DeFi technology company" narrative'
    ],
    implication: 'neutral',
    thesisComparison: 'First concrete evidence of ETH yield generation by Nasdaq-listed ETH treasury company. Protocol token earnings represent new revenue stream beyond base staking. Validates BMNR\'s thesis that staked ETH generates superior returns vs unstaked BTC holdings.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-defi',
    storyTitle: 'ETHZilla DeFi & Yield'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - CEO CHANGE + CUMBERLAND DRW OTC (Sep 8, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-09-08',
    competitor: 'ethz',
    category: 'Strategy',
    headline: 'ETHZilla CEO change: Rudisill appointed CEO, Cumberland DRW OTC facility',
    details: [
      'McAndrew Rudisill (Chairman) appointed CEO, succeeding Blair Jordan who resigned',
      'Enters OTC transaction with Cumberland DRW for up to $80M collateralized by ETH holdings',
      'Proceeds for share repurchases under $250M program',
      'Repurchased ~2.2M shares at avg $2.50 (1.3% reduction)',
      'Total: 102,246 ETH (~$443M), $213M cash'
    ],
    implication: 'neutral',
    thesisComparison: 'ETH-collateralized borrowing from Cumberland DRW demonstrates financial engineering sophistication. DRW willing to lend against ETH validates its collateral quality. Model applicable to BMNR for leveraging ETH holdings without selling.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-corporate',
    storyTitle: 'ETHZilla Corporate'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - $100M ETH TO ETHERFI RESTAKING (Sep 2, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-09-02',
    competitor: 'ethz',
    category: 'Yield',
    headline: 'ETHZilla plans $100M ETH deployment to EtherFi for restaking',
    details: [
      'Plans to deploy ~$100M ETH to EtherFi liquid restaking protocol',
      'First DeFi protocol engagement by ETHZilla',
      'EtherFi selected for incremental yield beyond standard staking + reinforcing Ethereum security',
      'Electric Capital managing strategy',
      '102,246 ETH (~$456M), $221M cash',
      'EtherFi CEO: "highlights growing institutional confidence in decentralized protocols"'
    ],
    implication: 'neutral',
    thesisComparison: 'First Nasdaq-listed ETH treasury company deploying $100M into DeFi restaking. Institutional capital flowing into liquid restaking validates protocol category. Directly validates BMNR\'s own ETH staking thesis.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-defi',
    storyTitle: 'ETHZilla DeFi & Yield'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - $250M STOCK REPURCHASE PROGRAM (Aug 25, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-08-25',
    competitor: 'ethz',
    category: 'Financial',
    headline: 'ETHZilla authorizes $250M stock repurchase program',
    details: [
      'Board authorizes $250M buyback effective immediately, expiring June 30, 2026',
      'Total holdings: 102,237 ETH at avg $3,948.72 (~$489M), $215M cash',
      'Announces Electric Asset Protocol for higher yields',
      'Accumulated from 82.2K to 102.2K ETH over 3 weeks',
      'ATM issued 5.0M shares for $33.7M net proceeds',
      'Dual strategy: accumulate ETH + repurchase shares when trading below NAV'
    ],
    implication: 'neutral',
    thesisComparison: 'Largest buyback authorization by an ETH treasury company. Dual strategy of ETH accumulation + buybacks signals maturing capital allocation. Proprietary yield protocol could widen gap between passive and active ETH treasury management.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-capital',
    storyTitle: 'ETHZilla Treasury & Capital'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ETHZILLA - LAUNCH: REBRAND + NASDAQ TRADING (Aug 18, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-08-18',
    competitor: 'ethz',
    category: 'Strategy',
    headline: 'ETHZilla launches: rebrand from 180 Life Sciences, begins trading as ETHZ on Nasdaq',
    details: [
      'Rebrands from 180 Life Sciences Corp. (ATNF), begins trading under ETHZ on Nasdaq',
      'Raised ~$565M gross ($425M PIPE + $156.25M convertible notes)',
      'Accumulated 94,675 ETH at avg $3,902.20 (~$419M), $187M cash',
      '60+ institutional and crypto-native investors: Electric Capital, Polychain Capital, GSR, Borderless Capital',
      'Ethereum ecosystem founders: Sreeram Kannan (EigenLayer), Mike Silagadze (Ether.fi), Danny Ryan (Etherealize), Sam Kazemanian (Frax), Robert Leshner (Compound/Superstate), Tarun Chitra (Gauntlet)',
      'Electric Capital as external asset manager for on-chain yield generation'
    ],
    implication: 'neutral',
    thesisComparison: 'Major ETH-only treasury competitor launches with $565M capital and ~95K ETH — dwarfs BMNR\'s holdings. Top-tier Ethereum ecosystem backing. Shared strategy increases market awareness of ETH treasury model. Rising tide: institutional interest in ETH treasury equities benefits all players.',
    source: 'ETHZilla Press Release',
    storyId: 'ethzilla-corporate',
    storyTitle: 'ETHZilla Corporate'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - Q4 2025 EARNINGS RELEASE (Feb 5, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-05',
    competitor: 'mstr',
    category: 'Financial',
    headline: 'Strategy Q4 2025: 713,502 BTC, $25.3B raised FY2025, largest US equity issuer',
    details: [
      '713,502 BTC as of Feb 1, 2026 — $54.26B cost basis ($76,052 avg), $59.75B market value',
      'Largest US equity issuer in FY2025 — ~8% of total US equity issuance',
      '$25.3B capital raised in FY2025 via ATM and five preferred IPOs (STRK/STRF/STRD/STRC/STRE)',
      'STRC scaled to $3.4B at 11.25% dividend, $413M cumulative distributions (9.6% blended)',
      '$2.25B USD Reserve provides 2.5 years dividend/interest coverage',
      'Q4: $17.4B operating loss (incl $17.4B unrealized digital asset loss), $12.4B net loss',
      'FY2025 BTC Yield: 22.8% (101,873 BTC Gain, $8.9B BTC $ Gain)',
      'ROC tax treatment expected 10+ years — no E&P expected',
      'Software: $123M revenue (+1.9% YoY), Subscription +62.1% YoY'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy raised $25.3B to accumulate BTC yielding 0%. Now pays 9.6-11.25% on $6.9B preferred equity funded by dilution. BMNR\'s ETH staking generates real 3-5% yield.',
    source: 'Strategy Q4 2025 Earnings',
    sourceUrl: 'https://www.strategy.com/investor-relations',
    storyId: 'strategy-financials',
    storyTitle: 'Strategy Financial Reporting'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - 8-K BTC HOLDINGS UPDATE (713,502 BTC)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-02',
    competitor: 'mstr',
    category: 'Acquisition',
    headline: 'Strategy now holds 713,502 BTC after purchasing 855 BTC',
    details: [
      'Purchased 855 BTC for $75.3M at average price of $87,974',
      'Total holdings now 713,502 BTC at average cost of $76,052',
      'Aggregate purchase price: $54.26B',
      'STRC dividend rate increased from 11.00% to 11.25%',
      'Sold 673,527 MSTR shares for $106.1M net proceeds',
      'No preferred stock sold during the period'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy continues accumulating BTC at 0% yield. BMNR\'s ETH staking generates 3-5% yield, compounding value without requiring continuous capital raises.',
    source: 'Strategy 8-K',
    sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
    storyId: 'strategy-btc-acquisitions',
    storyTitle: 'Strategy BTC Acquisitions'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - DIGITAL CREDIT ROC (Return of Capital)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-02',
    competitor: 'mstr',
    category: 'Funding',
    headline: 'Strategy announces 2025 preferred distributions 100% return of capital',
    details: [
      '100% of 2025 distributions on preferred equity treated as ROC for tax purposes',
      'Raised $5.5B in Digital Credit (preferred equity) IPOs in 2025',
      'Additional $1.9B raised via ATM programs for preferred instruments',
      '$413M in cumulative distributions paid across all instruments',
      '9.6% blended annual dividend rate on preferred securities',
      'Expects ROC treatment to continue for 10+ years (no E&P)'
    ],
    implication: 'neutral',
    thesisComparison: 'MSTR pays 9.6% dividend on preferred but BTC generates 0% yield — funded by dilution. BMNR\'s ETH staking generates real 3-5% yield to cover costs.',
    source: 'Strategy PR',
    sourceUrl: 'https://www.strategy.com/investor-relations',
    storyId: 'strategy-capital-markets',
    storyTitle: 'Strategy Capital Markets & Dividends'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - Q4 2025 EARNINGS ANNOUNCEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-15',
    competitor: 'mstr',
    category: 'Financial',
    headline: 'Strategy announces Q4 2025 earnings date: February 5, 2026',
    details: [
      'Q4 2025 results to be released after market close Feb 5, 2026',
      'Live video webinar scheduled for 5:00 PM ET',
      'Now trades under multiple tickers: STRF/STRC/STRK/STRD/MSTR',
      'Rebranded from MicroStrategy to Strategy',
      'Describes itself as "world\'s first Bitcoin Treasury Company"'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy continues to position as BTC treasury leader. BMNR differentiates with ETH + staking yield model.',
    source: 'Strategy PR',
    sourceUrl: 'https://www.strategy.com/investor-relations',
    storyId: 'strategy-financials',
    storyTitle: 'Strategy Financial Reporting'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - 8-K LARGEST WEEKLY BTC PURCHASE (22,305 BTC / $2.1B)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-20',
    competitor: 'mstr',
    category: 'Acquisition',
    headline: 'Strategy purchases 22,305 BTC for $2.1B in largest weekly acquisition',
    details: [
      'Purchased 22,305 BTC for $2,125.3M at average price of $95,284',
      'Total holdings now 709,715 BTC at average cost of $75,979',
      'Aggregate purchase price: $53.92B',
      'Sold 2,945,371 STRC shares ($294.5M), 38,796 STRK shares ($3.9M)',
      'Sold 10,399,650 MSTR shares for $1,827.3M net proceeds',
      'Total net proceeds from ATM: $2,125M'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy\'s massive $2.1B weekly BTC purchase shows aggressive accumulation. No yield generation — purely price appreciation play vs BMNR\'s staking yield.',
    source: 'Strategy 8-K',
    sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
    storyId: 'strategy-btc-acquisitions',
    storyTitle: 'Strategy BTC Acquisitions'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - 8-K BTC PURCHASE (13,627 BTC / $1.25B)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-12',
    competitor: 'mstr',
    category: 'Acquisition',
    headline: 'Strategy purchases 13,627 BTC for $1.25B via ATM program',
    details: [
      'Purchased 13,627 BTC for $1,247.1M at average price of $91,519',
      'Total holdings now 687,410 BTC at average cost of $75,353',
      'Aggregate purchase price: $51.80B',
      'Sold 1,192,262 STRC shares ($119.2M)',
      'Sold 6,827,695 MSTR shares for $1,128.5M net proceeds',
      'Total net proceeds from ATM: $1,247.6M'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy continues aggressive BTC accumulation via ATM dilution. BMNR\'s ETH staking generates yield without continuous share issuance.',
    source: 'Strategy 8-K',
    sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
    storyId: 'strategy-btc-acquisitions',
    storyTitle: 'Strategy BTC Acquisitions'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - Q4 2025 FINANCIALS + USD RESERVE $2.25B
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-05',
    competitor: 'mstr',
    category: 'Financial',
    headline: 'Strategy reports Q4 2025 financials: $17.4B unrealized loss, $2.25B USD Reserve',
    details: [
      'Q4 2025: $17.44B unrealized loss on digital assets',
      'Q4 2025: $5.01B associated deferred tax benefit',
      'FY 2025: $5.40B unrealized loss, $1.55B deferred tax benefit',
      'As of Dec 31, 2025: $58.85B digital asset carrying value',
      '$2.42B related deferred tax liability',
      'USD Reserve increased to $2.25B as of Jan 4, 2026'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy\'s $17.4B Q4 unrealized loss shows BTC volatility exposure. BMNR\'s ETH staking provides steady yield regardless of price movements.',
    source: 'Strategy 8-K',
    sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
    storyId: 'strategy-financials',
    storyTitle: 'Strategy Financial Reporting'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - STRC DIVIDEND RATE INCREASE TO 11%
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-31',
    competitor: 'mstr',
    category: 'Funding',
    headline: 'Strategy increases STRC dividend rate from 10.75% to 11.00%',
    details: [
      'STRC (Variable Rate Stretch Preferred) dividend increased to 11.00%',
      'Effective for monthly periods commencing on or after Jan 1, 2026',
      'Cash dividend of $0.916666667 per share declared for Jan 31, 2026',
      'Record date: 5:00 PM NYC time on Jan 15, 2026',
      'Payment date: Jan 31, 2026'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy raising STRC dividend to 11% increases funding costs. BMNR\'s ETH staking generates 3-5% yield to cover costs without rate pressure.',
    source: 'Strategy 8-K',
    sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
    storyId: 'strategy-capital-markets',
    storyTitle: 'Strategy Capital Markets & Dividends'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - USD RESERVE & 650K BTC HOLDINGS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-01',
    competitor: 'mstr',
    category: 'Strategy',
    headline: 'Strategy establishes $1.44B USD Reserve, now holds 650,000 BTC',
    details: [
      'Established $1.44B USD Reserve to cover 21 months of dividends',
      'Now holds 650,000 BTC — approximately 3.1% of total 21M supply',
      'Goal to grow USD Reserve to cover 24+ months of dividends',
      'Updated FY2025 BTC Yield Target: 22-26%',
      'Updated FY2025 BTC $ Gain Target: $8.4B-$12.8B',
      'Guidance based on assumed BTC price range of $85,000-$110,000'
    ],
    implication: 'neutral',
    thesisComparison: 'MSTR holds 3.1% of BTC supply vs BMNR\'s ~3.5% of ETH supply. MSTR needs USD Reserve for dividends since BTC yields 0%; BMNR\'s staking covers yield natively.',
    source: 'Strategy PR',
    sourceUrl: 'https://www.strategy.com/investor-relations',
    storyId: 'strategy-capital-markets',
    storyTitle: 'Strategy Capital Markets & Dividends'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - STRE STOCK IPO (€620M / ~$715M)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-07',
    competitor: 'mstr',
    category: 'Funding',
    headline: 'Strategy prices STRE Stock IPO at €620M (~$715M) with 10% dividend',
    details: [
      'IPO of euro-denominated STRE preferred stock at €620M (~$715M)',
      'Perpetual 10% dividend rate with 105% liquidation preference',
      'Closes November 12, 2025 on the Frankfurt Stock Exchange',
      'Broadens access to bitcoin exposure via European capital markets',
      'Raises cumulative bitcoin capital to approximately $11B since November 2024'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy tapping European markets at 10% perpetual dividend cost. BMNR\'s ETH staking generates yield without requiring such high dividend obligations.',
    source: 'Strategy PR',
    sourceUrl: 'https://www.strategy.com/investor-relations',
    storyId: 'strategy-capital-markets',
    storyTitle: 'Strategy Capital Markets & Dividends'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - S&P B- ISSUER CREDIT RATING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-27',
    competitor: 'mstr',
    category: 'Financial',
    headline: 'S&P assigns B- issuer credit rating to Strategy',
    details: [
      'S&P assigns B- issuer credit rating with stable outlook',
      'Rating reflects bitcoin holdings as capital for planned financing activities',
      'Unique financing strategy utilizing BTC as treasury asset',
      'Credit rating enables access to debt capital markets',
      'Demonstrates institutional acceptance of BTC treasury model'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy\'s B- rating reflects higher risk BTC volatility exposure. BMNR\'s ETH staking yield provides more stable cash flow for debt servicing.',
    source: 'Strategy PR',
    sourceUrl: 'https://www.strategy.com/investor-relations',
    storyId: 'strategy-financials',
    storyTitle: 'Strategy Financial Reporting'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STRATEGY - ATM/BTC ACTIVITY (640,250 BTC @ $74K AVG)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-10-13',
    competitor: 'mstr',
    category: 'Acquisition',
    headline: 'Strategy holds 640,250 BTC after purchasing 220 BTC at $74K average',
    details: [
      'Purchased 220 BTC for $16.3M at average price of $74,000',
      'Total holdings now 640,250 BTC at average cost of $73,024',
      'Aggregate purchase price: $46.75B',
      'Sold 273,843 MSTR shares for $53.8M net proceeds',
      'No preferred stock sold during the period'
    ],
    implication: 'neutral',
    thesisComparison: 'Strategy steadily accumulating BTC with no yield. BMNR\'s staking model generates continuous 3-5% yield on ETH holdings.',
    source: 'Strategy 8-K',
    sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
    storyId: 'strategy-btc-treasury',
    storyTitle: 'Strategy (MSTR)'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MARATHON DIGITAL - BTC MINING + TREASURY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-20',
    competitor: 'mara',
    category: 'Acquisition',
    headline: 'Marathon Digital increases BTC holdings to 46,000+',
    details: [
      'Combined mining production and open market purchases',
      'Mining generates ~15-20 BTC per day at current hashrate',
      'Follows full HODL strategy - no BTC sales',
      'Considering expansion into ETH infrastructure',
      'Q4 2025 production exceeded expectations'
    ],
    implication: 'neutral',
    thesisComparison: 'MARA\'s mining produces BTC but at high OpEx cost. BMNR\'s pure treasury model with staking has lower operational risk.',
    source: 'Marathon Digital PR',
    sourceUrl: 'https://ir.mara.com/',
    storyId: 'mara-treasury-2026',
    storyTitle: 'Marathon Digital Treasury Growth'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RIOT PLATFORMS - BTC MINING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-18',
    competitor: 'riot',
    category: 'Strategy',
    headline: 'Riot Platforms announces $500M facility expansion',
    details: [
      'New mining facility in Texas to increase hashrate 50%',
      'Expected online by Q3 2026',
      'Will increase BTC production capacity significantly',
      'Focus on renewable energy partnerships',
      'Maintains HODL strategy on mined BTC'
    ],
    implication: 'neutral',
    thesisComparison: 'Riot\'s CapEx-intensive mining model contrasts with BMNR\'s capital-efficient staking. Mining faces halving headwinds; staking does not.',
    source: 'Riot Platforms PR',
    sourceUrl: 'https://www.riotplatforms.com/news',
    storyId: 'riot-expansion-2026',
    storyTitle: 'Riot Platforms Expansion'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COINBASE - CRYPTO EXCHANGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-22',
    competitor: 'coin',
    category: 'Regulatory',
    headline: 'Coinbase secures expanded staking license in Singapore',
    details: [
      'Regulatory approval for institutional staking services',
      'Expands ETH staking offerings to Asian institutions',
      'Competitive pressure on independent staking providers',
      'Part of global regulatory compliance expansion',
      'Strengthens institutional custody + staking bundle'
    ],
    implication: 'negative',
    thesisComparison: 'Coinbase expanding staking services increases competition but validates ETH staking as institutional strategy. BMNR\'s scale advantage remains.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog',
    storyId: 'coin-regulatory',
    storyTitle: 'Coinbase Regulatory & Compliance'
  },
  {
    date: '2025-12-11',
    competitor: 'coin',
    category: 'Strategy',
    headline: 'Coinbase positions as primary staking provider as staking ETFs launch in US — custodian for 8 of 9 spot ETH ETFs',
    details: [
      'Grayscale becomes first US issuer to stake ETH and SOL underlying its spot crypto ETFs (Oct 2025)',
      'Coinbase Institutional is the largest institutional ETH staking provider',
      'Primary custodian for 8 of 9 approved spot ETH ETFs',
      'Staking operator for international ETPs: Virtune, WisdomTree, 21Shares',
      'Before staking, ETH ETFs missed ~$61M in staking benefits (launch through Feb 2025 per Grayscale)',
      'Staking ETFs expected to strengthen economic security of proof-of-stake networks',
      'Coinbase Prime provides integrated custody + staking with detailed rewards reporting'
    ],
    implication: 'positive',
    thesisComparison: 'Staking ETFs arriving via Coinbase infrastructure validates ETH staking as mainstream institutional strategy. Coinbase\'s dominance (8/9 ETH ETF custodian) makes it both competitor and ecosystem enabler. BMNR benefits from growing institutional staking demand — staking ETFs bring more capital into ETH staking, supporting network security and yield sustainability.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/staking-etfs-have-arrived',
    storyId: 'coin-products',
    storyTitle: 'Coinbase Products & Trading'
  },
  {
    date: '2025-12-09',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Coinbase and PNC Bank launch direct bitcoin trading for Private Bank clients — first major US bank with CaaS integration',
    details: [
      'PNC Private Bank clients can buy, sell, and hold bitcoin directly on PNC\'s digital banking platform',
      'First major US bank to support direct spot bitcoin trading via Coinbase Crypto-as-a-Service (CaaS)',
      'Builds on strategic partnership announced July 2025',
      'Eliminates need for separate exchange accounts — seamless within PNC banking app',
      'PNC is a top-10 US financial institution',
      'Powered by Coinbase\'s CaaS infrastructure for institutional clients'
    ],
    implication: 'neutral',
    thesisComparison: 'Coinbase CaaS bringing bitcoin to major US banks validates crypto-TradFi integration. PNC integration is BTC-only — no ETH staking. However, infrastructure pathway exists for future ETH/staking products in banks. Coinbase building distribution moat via CaaS partnerships.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-pnc-partner',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-11-21',
    competitor: 'coin',
    category: 'Acquisition',
    headline: 'Coinbase to acquire Vector — Solana onchain trading platform for "everything exchange" vision',
    details: [
      'Acquiring Vector, Solana-native onchain trading platform',
      'Solana DEX volume for 2025 already exceeded $1 trillion (Messari)',
      'Vector tech to plug into Coinbase DEX trading integration',
      'Vision: "everything exchange" — one-stop-shop for trading everything onchain, 24/7',
      'Vector apps to be sunsetted; Tensor Foundation remains independent',
      'Part of broader push: DEX trading launched in Brazil same week (Nov 19)'
    ],
    implication: 'neutral',
    thesisComparison: 'Coinbase acquiring Solana infrastructure reflects multi-chain strategy. Solana is alternative L1 to Ethereum — Coinbase betting on both ecosystems. However, Coinbase also heavily invested in Ethereum via Base L2. Multi-chain Coinbase growth ultimately brings more users to crypto overall, some of which flow to ETH staking.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-to-acquire-vector',
    storyId: 'coin-acquisitions',
    storyTitle: 'Coinbase Acquisitions'
  },
  {
    date: '2025-08-14',
    competitor: 'coin',
    category: 'Acquisition',
    headline: 'Coinbase closes Deribit acquisition — world\'s #1 crypto options exchange ($185B July volume, $60B open interest)',
    details: [
      'Deribit officially joins Coinbase — #1 crypto options exchange by volume and open interest',
      'July 2025 record: $185B+ volume, ~$60B platform open interest',
      'Over $1 trillion traded in 2024 on Deribit',
      'Deribit generated $30M+ in July transaction revenue alone',
      'Expected Adjusted EBITDA accretive immediately after close',
      '~$10M additional Q3 expense (tech & G&A, excl deal-related amortization)',
      'Coinbase now offers spot, futures, perpetuals, and options on one platform',
      'Institutional and advanced trader base with loyal following'
    ],
    implication: 'neutral',
    thesisComparison: 'Deribit acquisition makes Coinbase the most comprehensive crypto derivatives platform globally. Derivatives volume drives more hedging/speculation activity which benefits overall crypto market liquidity. Not directly competitive with BMNR\'s ETH staking thesis but strengthens Coinbase as dominant crypto infrastructure company.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/deribit-joins-coinbase',
    storyId: 'coin-acquisitions',
    storyTitle: 'Coinbase Acquisitions'
  },
  {
    date: '2025-10-27',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Coinbase and Citi collaborate on stablecoin payments infrastructure across 94 markets',
    details: [
      'Collaboration with Citi focused on leveraging digital assets and stablecoins for institutional payments',
      'Citi\'s global network spans 94 markets and over 300 payment clearing systems',
      'Focus: improving fiat-to-crypto on-ramps/off-ramps for institutional clients',
      'Building stablecoin payment solutions and digital asset infrastructure',
      'Targeting 24/7 availability for institutional payment conversion',
      'Part of Coinbase\'s broader mission to integrate digital assets into global economy'
    ],
    implication: 'neutral',
    thesisComparison: 'Citi ($94B+ revenue) collaborating with Coinbase on stablecoin payments validates crypto infrastructure for institutional use. Stablecoin demand drives on-chain activity on Ethereum. Not directly competitive with BMNR but Coinbase building institutional distribution moat.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-citi-collaborate',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-10-27',
    competitor: 'coin',
    category: 'Strategy',
    headline: 'Coinbase Asset Management and Apollo partner on stablecoin credit strategies — $300B market targeting $3T by 2030',
    details: [
      'CBAM and Apollo ($840B AUM) establish partnership for stablecoin credit strategies',
      'Stablecoin market cap reached $300B as of Oct 2025, projections of $3T by 2030 (GENIUS Act tailwinds)',
      'Strategies: over-collateralized BTC lending, corporate direct lending to stablecoin issuers/fintechs, tokenized credit holdings',
      'Apollo\'s Christine Moy: "accelerates our vision of tokenizing credit markets"',
      'Innovative products targeting market launch in 2026',
      'GENIUS-compliant opportunities with monthly audits and 1:1 reserves'
    ],
    implication: 'neutral',
    thesisComparison: 'Coinbase + Apollo building institutional DeFi credit products around stablecoins. $300B stablecoin market growing to $3T creates massive on-chain activity on Ethereum. Apollo\'s $840B AUM entering crypto credit validates institutional demand. BMNR benefits from stablecoin ecosystem growth driving ETH utility.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/cbam-apollo-stablecoin-credit',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-10-15',
    competitor: 'coin',
    category: 'Strategy',
    headline: 'Coinbase invests in CoinDCX — India/Middle East expansion targeting 100M+ crypto owners',
    details: [
      'Coinbase Ventures invests in CoinDCX, leading crypto exchange in India and Middle East',
      'India has 1.4B+ people, 100M+ crypto owners, growing tech adoption',
      'CoinDCX annualized revenue ~$141M USD, transaction volumes ~$165B USD, $1.2B AUC',
      'User base exceeds 20.4 million across India and Middle East',
      'Subject to regulatory approvals and customary closing conditions',
      'Builds on Coinbase\'s growing presence with local operations in the region'
    ],
    implication: 'neutral',
    thesisComparison: 'Coinbase expanding distribution into India (100M+ crypto owners) and Middle East. Geographic expansion grows total addressable market for crypto ecosystem. CoinDCX\'s $165B volume demonstrates massive emerging market activity. More global crypto adoption = more ETH ecosystem participants.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-makes-investment-in-coindcx',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-10-15',
    competitor: 'coin',
    category: 'Yield',
    headline: 'Coinbase Asset Management launches US Bitcoin Yield Fund — BTC yield via lending and basis trading',
    details: [
      'Coinbase US Bitcoin Yield Fund (USCBYF) for US accredited investors',
      'Delivers bitcoin performance + additional BTC yield',
      'Yield generated from BTC private credit lending and basis trading',
      'Subscribe with in-kind bitcoin, USD, or USDC',
      'Partnership with iTrustCapital for tax-deferred IRA access (2026)',
      'Follows offshore Coinbase Bitcoin Yield Fund launched May 2025 for non-US investors',
      'SEC-registered RIA, CFTC-registered CPO/CTA, NFA member'
    ],
    implication: 'negative',
    thesisComparison: 'Coinbase BTC Yield Fund is a direct competitive concept to BMNR\'s ETH yield thesis — institutional crypto yield product from major exchange. However: BTC yield via lending/basis trading is fundamentally different from ETH staking (native protocol yield). BTC yield involves counterparty/credit risk; ETH staking yield is protocol-native and trustless. BMNR should emphasize this distinction: ETH staking = yield from securing the network, not from lending.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-us-bitcoin-yield-fund',
    storyId: 'coin-products',
    storyTitle: 'Coinbase Products & Trading'
  },
  {
    date: '2025-10-08',
    competitor: 'coin',
    category: 'Regulatory',
    headline: 'Coinbase staking now available in New York — $130M+ missed rewards across states with bans',
    details: [
      'New Yorkers can now stake ETH, SOL, and other assets on Coinbase',
      'Governor Hochul\'s leadership in providing regulatory clarity credited for milestone',
      'Coinbase estimates CA, NJ, MD, WI residents have collectively missed $130M+ in staking rewards',
      'Recent SEC staff guidance confirms staking-as-a-service is not a security',
      'Staking cases against Coinbase dismissed by VT, IL, KY, AL, SC — "national consensus has emerged"',
      'CLO Paul Grewal: "In the city that never sleeps, your money shouldn\'t either"'
    ],
    implication: 'negative',
    thesisComparison: 'NY staking approval significantly expands Coinbase\'s retail ETH staking TAM — NY is one of the largest financial markets. More retail ETH staking via Coinbase increases competition for BMNR\'s institutional staking value proposition. However, growing retail staking also validates ETH staking as mainstream and supports network security. SEC consensus that staking is not a security reduces regulatory risk for all staking players including BMNR.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/staking-is-now-available-in-new-york',
    storyId: 'coin-regulatory',
    storyTitle: 'Coinbase Regulatory & Compliance'
  },
  {
    date: '2025-10-03',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Samsung taps Coinbase for 75M+ Galaxy users — Coinbase One exclusive access via Samsung Wallet',
    details: [
      'Partnership with Samsung, world\'s most popular smartphone brand',
      'Exclusive Coinbase One access within Samsung Wallet app for US Galaxy users (75M+)',
      'Coinbase One: zero trading fees, boosted staking rewards, priority support, account protection',
      'Samsung Pay integration now live for crypto purchases in US',
      'Plans to expand globally and explore new partnership opportunities',
      'Samsung Pay already rolled out as payment option in Coinbase app (Jul 29) for US and Canada'
    ],
    implication: 'neutral',
    thesisComparison: 'Samsung distribution deal gives Coinbase massive consumer reach (75M+ Galaxy users). Boosted staking rewards in Coinbase One could drive more retail ETH staking. Coinbase building retail distribution moat through device-level partnerships. More retail crypto users = larger ecosystem, though also more Coinbase staking competition.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/samsung-taps-coinbase',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-07-30',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Coinbase and JPMorgan Chase partner — 80M+ customers get credit card crypto funding and Ultimate Rewards → USDC',
    details: [
      'Partnership with JPMorgan Chase, largest US bank (80M+ customers)',
      'Fall 2025: Chase credit cards can fund Coinbase accounts',
      '2026: Chase Ultimate Rewards Points redeemable for crypto — first major credit card program to offer this',
      '2026: Direct Chase bank account linking to Coinbase',
      'Coinbase as "most trusted bridge from traditional finance to crypto"',
      'Ultimate Rewards → USDC conversion creates novel stablecoin on-ramp'
    ],
    implication: 'neutral',
    thesisComparison: 'JPMorgan Chase (largest US bank) partnering with Coinbase is a landmark crypto-TradFi integration. 80M+ customers with frictionless crypto access dramatically expands retail on-ramp. Ultimate Rewards → USDC creates novel stablecoin demand channel. More retail participants flowing through Coinbase strengthens their position as primary crypto gateway but also grows overall ecosystem benefiting all crypto assets including ETH.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-jpmorgan-chase',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-07-21',
    competitor: 'coin',
    category: 'Strategy',
    headline: 'Coinbase launches first CFTC-regulated perpetual futures in the US — BTC-PERP and ETH-PERP with up to 10x leverage',
    details: [
      'First time US traders can access perpetual-style futures via Coinbase Financial Markets (CFM)',
      'CFTC-regulated contracts — previously unavailable to US traders due to regulatory landscape',
      'Two contracts at launch: nano Bitcoin Perpetual Futures (BTC-PERP) and nano Ether Perpetual Futures (ETH-PERP)',
      'Up to 10x leverage for crypto perpetual futures; up to 20x intraday for metals (silver, gold)',
      'Long-dated with 5-year expirations — no monthly expirations',
      'Fees as low as 0.02% per contract (minimum $0.15 per contract)',
      'Perpetual futures dominate 90% of global crypto derivatives trading volumes',
      'Exchange closes every Friday 5:00-6:00 PM ET with quarterly 3-hour maintenance windows'
    ],
    implication: 'neutral',
    thesisComparison: 'CFTC-regulated perpetual futures are a landmark US derivatives milestone. ETH-PERP creates regulated US perpetuals market for Ethereum — more hedging and speculative tools for ETH. 90% of global crypto derivatives volume is perps, so US access could dramatically increase ETH trading activity. More liquid ETH derivatives market supports BMNR thesis through improved price discovery.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/perpetual-futures-have-arrived-in-the-us',
    storyId: 'coin-products',
    storyTitle: 'Coinbase Products & Trading'
  },
  {
    date: '2025-07-02',
    competitor: 'coin',
    category: 'Acquisition',
    headline: 'Coinbase acquires LiquiFi — leading token management platform for onchain builders',
    details: [
      'LiquiFi provides token cap table management, vesting schedules, and compliance workflows',
      'Customers include Uniswap Foundation, OP Labs (Optimism), Ethena, Zora, and 0x',
      'Enables Coinbase to support builders earlier in lifecycle — before tokens are launched or listed',
      'Plan to integrate LiquiFi capabilities with Coinbase Prime over time',
      'Tightens integration across custody, trading, financing for institutional clients',
      'Vision: make launching a token easier, faster, and more global than issuing traditional startup equity'
    ],
    implication: 'neutral',
    thesisComparison: 'LiquiFi acquisition adds pre-listing token infrastructure to Coinbase platform. Customer base (Uniswap, Optimism, Ethena, Zora, 0x) is heavily Ethereum-ecosystem native. Coinbase capturing project relationships before listing strengthens their position as primary exchange for ETH ecosystem tokens. More comprehensive institutional tooling benefits crypto market overall.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-acquires-liquifi',
    storyId: 'coin-acquisitions',
    storyTitle: 'Coinbase Acquisitions'
  },
  {
    date: '2025-06-20',
    competitor: 'coin',
    category: 'Regulatory',
    headline: 'Coinbase secures MiCA licence from Luxembourg CSSF — full EU access across all 27 member states (450M people)',
    details: [
      'MiCA (Markets in Crypto Assets) licence from Luxembourg CSSF (Commission de Surveillance du Secteur Financier)',
      'Enables offering full suite of crypto products to all 27 EU member states',
      'Access to 450 million people across the EU under single regulatory passport',
      'Establishing European crypto hub in Luxembourg',
      'Previously held individual licences in Germany, France, Ireland, Italy, Netherlands, and Spain',
      'MiCA unites individual country licences under single framework',
      'Luxembourg has passed four blockchain-related policies through national legislature'
    ],
    implication: 'neutral',
    thesisComparison: 'Single MiCA licence covering 450M EU population is massive regulatory moat for Coinbase. Unified EU access under one framework dramatically simplifies European expansion. More regulated exchange access globally = more liquidity = benefits ETH market overall. Coinbase EU strength as primary fiat-to-crypto gateway grows overall ecosystem.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-secures-mica-licence',
    storyId: 'coin-regulatory',
    storyTitle: 'Coinbase Regulatory & Compliance'
  },
  {
    date: '2025-05-16',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Webull Pay partners with Coinbase CaaS platform for custody, trading, staking, and USDC',
    details: [
      'Webull Pay chose Coinbase as crypto partner via Crypto-as-a-Service (CaaS) platform',
      'Webull Pay gets institutional-grade custody, advanced trading, USDC, and staking access',
      'Launching June 2025',
      'Same technology trusted by world\'s largest financial institutions and asset managers',
      'Coinbase and Webull Pay exploring additional opportunities to expand globally',
      'Stephen Yip (Webull Pay CEO): "This collaboration unlocks powerful capabilities that will accelerate innovation on our platform"'
    ],
    implication: 'neutral',
    thesisComparison: 'Webull Pay CaaS partnership validates Coinbase as white-label crypto infrastructure provider. CaaS B2B model expands Coinbase reach without direct user acquisition costs. More platforms offering crypto trading/staking through Coinbase rails = more exchange volume = benefits overall crypto market liquidity.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-partners-with-webull-pay',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-05-08',
    competitor: 'coin',
    category: 'Acquisition',
    headline: 'Coinbase announces agreement to acquire Deribit for $2.9B — $700M cash + 11M shares of Class A common stock',
    details: [
      'Deribit is world\'s leading crypto options exchange with ~$30B current open interest',
      'Purchase price: ~$2.9B ($700M cash + 11M shares Coinbase Class A common stock)',
      'Deribit facilitated over $1 trillion in trading volume in 2024',
      'Consistent track record of generating positive Adjusted EBITDA',
      'Creates most comprehensive institutional derivatives platform: spot, futures, perpetuals, and options',
      'Follows strategic M&A track record: Xapo → Custody, Tagomi → Prime, FairX → Derivatives Exchange, One River → Asset Management',
      'Subject to regulatory approvals, expected to close by year-end',
      'Deribit CEO Luuk Strijers: "Together with Coinbase, we\'re set to shape the future of the global crypto derivatives market"'
    ],
    implication: 'neutral',
    thesisComparison: 'Largest crypto M&A deal ever announced. Coinbase building full-stack derivatives platform (spot + futures + perps + options) makes it dominant crypto infrastructure company. Crypto options expansion similar to equity options boom of 1990s — more sophisticated trading tools benefit overall market development including ETH derivatives liquidity.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-to-acquire-deribit',
    storyId: 'coin-acquisitions',
    storyTitle: 'Coinbase Acquisitions'
  },
  {
    date: '2025-05-06',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Coinbase partners with Riot Games as exclusive crypto exchange partner across League of Legends and VALORANT esports',
    details: [
      'Exclusive cryptocurrency exchange and official blockchain technology partner for LoL and VALORANT Esports global events',
      'Debut at Masters (M2) in Toronto — spans Masters, Champions (VCT), First Stand, MSI, and Worlds (LoL)',
      'New in-game segments: "Econ Report" (VALORANT) and "Gold Grind" (LoL) — live analysis of in-match currency',
      'Viewer "drops" during events: emotes, icons, and promotions with all-expenses-paid trips to Champions/Worlds',
      'Exploring future Web3 technology integrations for fan experience',
      'Adds to portfolio: Team Liquid, WNBA, NBA (Warriors, Clippers), Aston Martin F1, Borussia Dortmund'
    ],
    implication: 'neutral',
    thesisComparison: 'Riot Games partnership extends Coinbase brand reach into massive esports audience (LoL and VALORANT have 100M+ combined players). Web3 technology exploration signals potential onchain integration for gaming. Brand awareness drives crypto adoption broadly, benefiting overall ecosystem.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-partners-with-riot-games',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-04-28',
    competitor: 'coin',
    category: 'Yield',
    headline: 'Coinbase Asset Management launches offshore Bitcoin Yield Fund (CBYF) — 4-8% net BTC returns for non-US investors',
    details: [
      'Coinbase Bitcoin Yield Fund (CBYF) — long-bitcoin fund seeking 4-8% net return in BTC per year over market cycle',
      'Investors subscribe and redeem in bitcoin; all performance denominated in BTC',
      'Conservative strategy: avoids riskier high-interest BTC loans and systematic call selling',
      'Uses third-party custody integrations to trade — significantly reduces counterparty risk',
      '$1B AUM estimated strategy capacity',
      'Monthly open for subscriptions/redemptions with 5 business days notice',
      'Seeded by Aspen Digital (FSRA-regulated, Abu Dhabi) — exclusive wealth-distribution partner for UAE and Asia',
      'Currently for international (non-US) investors; launches May 1, 2025'
    ],
    implication: 'negative',
    thesisComparison: 'Offshore BTC Yield Fund is Coinbase\'s first institutional crypto yield product — directly competitive concept to BMNR\'s ETH yield thesis. 4-8% target BTC yield via lending/basis trading competes for same "crypto yield" allocator capital. Key distinction: BTC yield involves counterparty/credit risk from lending; BMNR\'s ETH staking yield is protocol-native and trustless.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-bitcoin-yield-fund',
    storyId: 'coin-products',
    storyTitle: 'Coinbase Products & Trading'
  },
  {
    date: '2025-04-24',
    competitor: 'coin',
    category: 'Partnership',
    headline: 'Coinbase expands PayPal partnership to advance PYUSD stablecoin — zero fee USD-PYUSD conversions for all customers',
    details: [
      'Expanding partnership with PayPal to accelerate adoption of PayPal USD (PYUSD) stablecoin',
      'Zero fee USD-PYUSD conversions for retail and institutional customers',
      'Coinbase infrastructure to expand PYUSD support to PayPal\'s largest merchant partners',
      'Collaborating to explore new onchain use cases for PYUSD',
      'Stablecoin transaction volumes surged 250% from $6.2T to $22T between 2023 and 2024',
      'Making it easier for millions of PayPal customers to bring finances onchain'
    ],
    implication: 'neutral',
    thesisComparison: 'PayPal PYUSD partnership strengthens Coinbase as multi-stablecoin infrastructure platform. Zero-fee conversions could drive significant PYUSD adoption alongside USDC. Stablecoin volume growth ($6.2T → $22T, 250%) validates on-chain payment thesis. More stablecoin activity broadly benefits Ethereum ecosystem where most stablecoins settle.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-paypal-to-advance-stablecoin-payments',
    storyId: 'coin-institutional',
    storyTitle: 'Coinbase Institutional & Partnerships'
  },
  {
    date: '2025-01-31',
    competitor: 'coin',
    category: 'Acquisition',
    headline: 'Coinbase acquires Spindl — onchain ads and attribution platform to accelerate Base builder distribution',
    details: [
      'Spindl is onchain ads and attribution platform rebuilding ad tech stack onchain',
      'Founded by Antonio Garcia-Martinez (AGM) — early Facebook ads team member who shipped keyword targeting, audience targeting, and FBX exchange',
      'Spindl will operate under Base, continues supporting current customers without interruption',
      'Goal: help builders go viral onchain and find distribution on Coinbase and across onchain economy',
      'Committed to maintaining open standards for publishers and advertisers',
      'Part of flywheel: developers build onchain apps → apps attract users → more users incentivize more developers'
    ],
    implication: 'neutral',
    thesisComparison: 'Spindl acquisition strengthens Base (Ethereum L2) ecosystem by solving builder distribution problem. More builders finding users on Base = more on-chain activity on Ethereum L2. Facebook ads veteran leading onchain ad tech could dramatically accelerate user acquisition for Base ecosystem.',
    source: 'Coinbase Blog',
    sourceUrl: 'https://www.coinbase.com/blog/coinbase-acquires-spindl',
    storyId: 'coin-acquisitions',
    storyTitle: 'Coinbase Acquisitions'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLEANSPARK - BTC MINING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-10',
    competitor: 'clsk',
    category: 'Acquisition',
    headline: 'CleanSpark acquires mining facility, adds 2 EH/s hashrate',
    details: [
      'Acquisition increases total hashrate by 15%',
      'Continues consolidation of mining industry',
      'Focus on low-cost, sustainable power sources',
      'BTC holdings increase to ~10,000 BTC',
      'Trades at lower NAV premium than MSTR'
    ],
    implication: 'neutral',
    thesisComparison: 'CleanSpark\'s mining growth increases BTC supply competition. No yield generation - purely price appreciation play vs BMNR\'s yield + appreciation.',
    source: 'CleanSpark PR',
    sourceUrl: 'https://www.cleanspark.com/news',
    storyId: 'clsk-acquisition-2026',
    storyTitle: 'CleanSpark Mining Expansion'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INDUSTRY - REGULATORY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-05',
    competitor: 'other',
    category: 'Regulatory',
    headline: 'SEC approves spot ETH ETF staking for institutional products',
    details: [
      'Major regulatory milestone for ETH ecosystem',
      'ETH ETFs can now include staking yield',
      'Increases institutional demand for staked ETH',
      'Validates staking as compliant investment strategy',
      'Expected to drive significant ETH inflows'
    ],
    implication: 'positive',
    thesisComparison: 'Regulatory clarity validates BMNR\'s ETH staking strategy. As a pure-play ETH treasury, BMNR benefits directly from increased institutional adoption.',
    source: 'SEC Filing',
    sourceUrl: 'https://www.sec.gov/news',
    storyId: 'sec-eth-staking-approval',
    storyTitle: 'SEC ETH Staking Approval'
  }
];
