// @ts-nocheck
/**
 * CRCL Competitor News Data
 * Extracted from CRCL.tsx for maintainability.
 * Track competitor/ecosystem news relevant to CRCL's thesis.
 * Newest first.
 */

import { CompetitorNewsEntry } from '../shared/competitor-schema';

// Competitor IDs used for CRCL: 'kraken' | 'tether' | 'coinbase' | 'paypal' | 'fdusd' | 'other'
// Categories: 'Partnership' | 'Product' | 'Regulatory' | 'Technology' | 'Financial' | 'Strategy' | 'Distribution'

/** Competitor profile */
export interface CRCLCompetitorProfile {
  id: string;
  name: string;
  description: string;
  currentStatus: string;
}

export const CRCL_COMPETITOR_PROFILES: CRCLCompetitorProfile[] = [
  {
    id: 'kraken',
    name: 'Kraken',
    description: 'Major crypto exchange and USDC/EURC distribution partner with institutional custody, DeFi yield, and tokenized equities products',
    currentStatus: 'Active USDC/EURC distribution, DeFi Earn (USDC-based yield), xStocks tokenized equities, Ethena USDe custody partner',
  },
  {
    id: 'tether',
    name: 'Tether',
    description: 'Largest stablecoin by AUM ($140B+), offshore operations with no US bank relationships',
    currentStatus: 'Dominant market share but increasing regulatory scrutiny',
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    description: 'Leading US crypto exchange and USDC distribution partner (50% revenue share)',
    currentStatus: 'Key USDC distribution partner via Coinbase One, expanding institutional services',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Global payments giant with PYUSD stablecoin (~$1B AUM)',
    currentStatus: 'Distribution advantage via PayPal ecosystem but limited adoption',
  },
];

export const CRCL_COMPETITOR_NEWS: CompetitorNewsEntry[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ADD NEW COMPETITOR NEWS ENTRIES HERE (newest first)
  // Format:
  // {
  //   date: 'YYYY-MM-DD',
  //   competitor: 'kraken' | 'tether' | 'coinbase' | 'paypal' | 'fdusd' | 'other',
  //   category: 'Partnership' | 'Product' | 'Regulatory' | 'Technology' | 'Financial' | 'Strategy' | 'Distribution',
  //   headline: 'Brief headline',
  //   details: ['Bullet point 1', 'Bullet point 2'],
  //   implication: 'positive' | 'neutral' | 'negative',  // for CRCL
  //   thesisComparison: 'How this compares to CRCL position',
  //   source: 'Source name',
  //   storyId: 'groups related entries',
  //   storyTitle: 'Display title for story group'
  // },
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - INSTITUTIONAL BESPOKE INVESTMENT SOLUTION (Feb 5, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-02-05',
    competitor: 'kraken',
    category: 'Product',
    headline: 'Kraken Institutional announces first bespoke investment solution with Bitwise Asset Management',
    details: [
      'Bitwise Custom Yield Strategy available to eligible institutional clients',
      'Delivered by Bitwise as external strategy manager within Kraken\'s qualified custody, execution and risk framework',
      'First of multiple managed strategies planned under Kraken Institutional\'s new offering framework',
      'Head of Kraken Institutional Gurpreet Oberoi: "expanding beyond custody and execution to professionally managed opportunities"',
      'All strategies undergo structured internal review and remain subject to ongoing oversight',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken building institutional investment products could eventually incorporate USDC-denominated strategies, expanding institutional demand for Circle\'s stablecoin infrastructure. Institutional yield strategies require stablecoin settlement rails.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
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
      'Independent third-party accountancy firm attestation',
      'Pioneered PoR in 2014, publishes quarterly alongside financial disclosures',
      'Accounts for total client liabilities, not just assets — includes margin, futures, and staked positions',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s PoR covering both USDC and USDT demonstrates both stablecoins have significant exchange custody demand. Circle\'s own reserve transparency (monthly attestations, BlackRock-managed reserves) sets the industry standard that exchanges complement.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
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
      'Grid Pass digital collectible program and Presenting Partner of Williams Fan Zones globally',
      'Annual Rear Wing Takeover fan engagement campaigns',
      'Part of Williams\' portfolio of major brand renewals (Duracell, Gulf Oil, VAST Data, Keeper Security)',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s F1 sponsorship increases crypto brand awareness and mainstream adoption broadly, which benefits USDC as the leading regulated stablecoin. Larger Kraken user base = larger addressable market for USDC distribution.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion & Marketing',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - DEFI EARN WITH USDC (Jan 26, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-26',
    competitor: 'kraken',
    category: 'Product',
    headline: 'Kraken launches DeFi Earn with up to 8% APY on USDC through audited Veda vaults',
    details: [
      'Earn up to 8% APY on cash and stablecoins via audited Veda vaults supplying liquidity to onchain lending protocols',
      'Converts user deposits to USDC, then deploys to Ethereum-based DeFi lending — directly expands USDC circulation',
      'Three risk-managed vault options: Balanced Yield (Chaos Labs), Boosted Yield (Chaos Labs), Advanced Strategies (Sentora)',
      'Available in 48 US states (excl. NY, ME), Canada, and European Economic Area',
      'Withdrawals typically instant with minimal lock-up periods',
    ],
    implication: 'positive',
    thesisComparison: 'Directly expands USDC demand and circulation. Kraken converts user cash deposits into USDC for DeFi deployment, creating net new USDC minting pressure. Validates Circle\'s ecosystem and USDC\'s role as DeFi settlement currency.',
    source: 'Kraken Blog',
    storyId: 'kraken-usdc',
    storyTitle: 'Kraken USDC & Stablecoin Ecosystem',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - USDC ON ALGORAND (Jan 22, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-22',
    competitor: 'kraken',
    category: 'Distribution',
    headline: 'Kraken adds USDC deposits and withdrawals on Algorand network',
    details: [
      'USDC funding via Algorand now live on Kraken platform',
      'Expands multi-chain USDC accessibility for Kraken users',
      'Algorand: Layer-1 with pure proof-of-stake, instant finality, and minimal fees',
      'Adds another low-cost, fast settlement option for USDC transfers',
    ],
    implication: 'positive',
    thesisComparison: 'Every new chain support on major exchanges expands USDC multi-chain reach. Kraken adding Algorand USDC support increases Circle\'s distribution footprint and makes USDC accessible via an additional low-fee, high-speed network.',
    source: 'Kraken Blog',
    storyId: 'kraken-usdc',
    storyTitle: 'Kraken USDC & Stablecoin Ecosystem',
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
      'Kraken is existing Atletico de Madrid partner — extends sports marketing reach',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s sports marketing partnerships drive platform trading activity and user acquisition. Growing exchange volume supports USDC\'s role as a primary funding and trading pair settlement currency.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion & Marketing',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - CRYPTO 2026 OUTLOOK (Jan 15, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-15',
    competitor: 'kraken',
    category: 'Strategy',
    headline: 'Kraken economist outlines 2026 outlook: stablecoin liquidity at all-time highs, tokenization growing 3x',
    details: [
      'Stablecoin liquidity at all-time highs heading into 2026 — systemic risk indicators contained',
      'Stablecoin legislation (GENIUS Act) already reshaping onchain dollar liquidity',
      'Tokenization of real-world assets grew from ~$5.6B to ~$19B in a single year',
      'CLARITY Act could provide framework for digital commodities and exchanges, accelerating capital formation',
      'Regulatory clarity shifting from “theoretical tailwind” to “tangible” in 2026',
      'DeFi tokenomics evolving: Uniswap-style fee sharing could reprice governance tokens toward durable valuation frameworks',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken\'s research highlighting stablecoin liquidity at ATH and regulatory clarity as key 2026 themes directly validates Circle\'s growth thesis. GENIUS Act stablecoin legislation benefits USDC as the compliance-first market leader. RWA tokenization growth ($5.6B→$19B) expands use cases for USDC settlement.',
    source: 'Kraken Blog',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - ETHENA USDE CUSTODY (Jan 6, 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2026-01-06',
    competitor: 'kraken',
    category: 'Product',
    headline: 'Kraken selected as custody partner for Ethena\'s USDe synthetic dollar stablecoin',
    details: [
      'Approved by Ethena Risk Committee (ERC) for custody of USDe backing assets',
      'Assets held in fully segregated, bankruptcy-remote, cold-storage vaults',
      'Kraken Custody operated by US state-chartered bank with HSM + MPC security',
      'Monthly custodian attestations and weekly Proof of Reserves for USDe transparency',
      'USDe is a synthetic dollar using delta-neutral derivatives strategy — different model than USDC\'s reserve-backed approach',
    ],
    implication: 'negative',
    thesisComparison: 'Kraken providing institutional custody for USDe (Ethena) signals exchange willingness to support stablecoin alternatives to USDC. USDe\'s synthetic dollar model competes for the same dollar-denominated DeFi demand that drives USDC circulation growth.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
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
      'Expanded presence across France, Ireland, Germany, Netherlands, Poland, Spain and beyond',
      'Built local teams and launched new products for European markets',
      '2025 Celebration Tour connecting with communities in Riga, Lisbon, Dublin, Warsaw, Frankfurt',
      'Positions Kraken as regulated local crypto partner across the EU',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken\'s EU expansion under MiCA directly supports EURC distribution. As Kraken grows its European user base with full regulatory compliance, it creates a larger addressable market for Circle\'s EURC stablecoin and supports the euro-denominated stablecoin ecosystem.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion & Marketing',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - XSTOCKS ON TON BLOCKCHAIN (Dec 18, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-18',
    competitor: 'kraken',
    category: 'Technology',
    headline: 'Kraken\'s xStocks tokenized equities launch on TON blockchain reaching Telegram\'s 1B users',
    details: [
      'Fully collateralized tokenized stocks and ETFs deployed on TON blockchain',
      'Accessible via non-custodial TON Wallet embedded in Telegram — nearly 100M existing users',
      'Over $180M in tokenized assets onchain with ~50K unique wallet addresses',
      'Multichain: now on Solana, Ethereum, and TON (with Mantle and TRON underway)',
      'Kraken Co-CEO Arjun Sethi: “financial assets move onto open networks as neutral, composable building blocks”',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s xStocks tokenized equities compete in the broader RWA tokenization space alongside Circle\'s vision. However, equity tokenization and stablecoin infrastructure serve different functions — USDC could benefit as the settlement currency of choice for tokenized asset markets.',
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
    headline: 'Kraken deepens Alpaca partnership as preferred venue for xStocks tokenized equities',
    details: [
      'Alpaca becomes preferred venue for sourcing and custodying underlying equities backing xStocks 1:1',
      'xStocks surpassed $10B in combined transaction volume since June 2025 launch',
      'Real-time mint and redeem capabilities via Alpaca\'s Instant Tokenization Network (ITN)',
      'Plans to expand beyond equities to broader suite of tokenized securities and real-world assets',
      'Kraken recently announced acquisition of Backed Finance to unify xStocks issuance, trading, and settlement',
    ],
    implication: 'neutral',
    thesisComparison: 'xStocks\' $10B+ volume demonstrates growing demand for tokenized financial assets onchain. As RWA tokenization scales, USDC could benefit as the primary settlement and liquidity currency for tokenized asset markets. Circle and Kraken could be complementary infrastructure providers.',
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
    headline: 'Kraken optimizes maker fee incentives, graduates 6 high-volume trading pairs',
    details: [
      '6 trading pairs moved to regular maker fee schedule after achieving self-sustaining liquidity',
      'Graduated pairs demonstrated $50M+ 30-day volume with $100K+ market depth',
      'Maker rebates continue on 425+ other trading pairs to support liquidity development',
      'Indicates growing platform maturity and organic trading activity',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s liquidity maturation across 425+ trading pairs creates deep markets that benefit USDC-denominated trading. Healthy exchange liquidity supports USDC\'s role as a primary trading settlement and funding currency.',
    source: 'Kraken Blog',
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
      'App Render Complete and Navigation Total Blocking Time as primary mobile performance vitals',
      'Automated Maestro benchmarks for every merge with statistical significance testing',
      'Network traffic recording and replay to isolate mobile code changes from backend variability',
      'Moving average alerting: fires when metric regresses >10% for 2+ consecutive runs',
      'React Native New Architecture adoption for baseline performance improvement',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken investing in mobile app performance engineering improves the user experience for USDC trading and transactions. Better app reliability lowers friction for retail users to on/off-ramp into USDC.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - USDG MARGIN COLLATERAL (Dec 10, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-10',
    competitor: 'kraken',
    category: 'Product',
    headline: 'Kraken adds Global Dollar (USDG) as margin and futures collateral currency with 1% haircut',
    details: [
      'USDG (Global Dollar) added to margin and futures collateral lineup — now 50+ options',
      '1% haircut — same as other stablecoins like USDC and USDT',
      'Collateral currencies allow margin trading without selling underlying assets',
      'Both unstaked and Kraken Rewards assets eligible as margin collateral',
    ],
    implication: 'negative',
    thesisComparison: 'Kraken adding USDG as collateral alongside USDC increases stablecoin competition for exchange use cases. Each new stablecoin collateral option dilutes USDC\'s share of margin funding. However, USDC\'s regulatory moat and Circle partnership likely maintain preferential positioning.',
    source: 'Kraken Blog',
    storyId: 'kraken-usdc',
    storyTitle: 'Kraken USDC & Stablecoin Ecosystem',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - USDT0 ON PLASMA (Dec 10, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-10',
    competitor: 'kraken',
    category: 'Distribution',
    headline: 'Kraken supports USDT0 deposits and withdrawals on Plasma blockchain',
    details: [
      'USDT0 funding via Plasma network now live on Kraken',
      'USDT0 is unified liquidity network for USDT — simplifies cross-chain movement without fragmented pools',
      'Plasma is purpose-built blockchain for high-volume, low-cost stablecoin activity',
      'Serves as core settlement layer for instant digital dollar payments',
    ],
    implication: 'negative',
    thesisComparison: 'Kraken supporting USDT0 on a stablecoin-optimized chain strengthens Tether\'s cross-chain distribution advantage. USDT0\'s unified liquidity model competes with Circle\'s CCTP for cross-chain USDC interoperability. Plasma as a stablecoin-first chain could favor USDT settlement.',
    source: 'Kraken Blog',
    storyId: 'kraken-usdc',
    storyTitle: 'Kraken USDC & Stablecoin Ecosystem',
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
      'Hybrid fiber/wireless routes reduce latency even further for Tokyo-based exchanges',
      'Supports cross-venue arbitrage, hedging, and multi-venue liquidity aggregation strategies',
      '99.9% uptime with dedicated 24/7 support',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken\'s institutional-grade connectivity infrastructure attracts high-frequency and institutional traders who require stablecoin settlement rails. Faster execution and deeper liquidity on Kraken supports USDC trading pair volume.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - COLOMBIA EXPANSION (Dec 4, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-04',
    competitor: 'kraken',
    category: 'Distribution',
    headline: 'Kraken expands in Colombia with local COP payment rails and auto-conversion to USD',
    details: [
      'Colombian clients can deposit COP directly through trusted domestic payment methods',
      'Deposits automatically converted to USD at competitive, transparent exchange rates',
      'Eliminates need for international wire transfers',
      'Access to 500+ digital assets and global liquidity',
      'Part of broader Latin America strategy including Argentina, Mexico, and Colombia',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken\'s Latin America expansion brings new users who need USD-denominated stablecoins for cross-border transactions and savings. Colombia\'s growing remittance and stablecoin demand is a natural fit for USDC adoption through Kraken\'s platform.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion & Marketing',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - DEUTSCHE BORSE PARTNERSHIP (Dec 4, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-04',
    competitor: 'kraken',
    category: 'Partnership',
    headline: 'Kraken and Deutsche Börse announce strategic partnership bridging traditional and digital markets',
    details: [
      'Integration with 360T — one of world\'s largest FX trading venues — for bank-grade FX liquidity',
      'Kraken Embed to expand institutional crypto access across Deutsche Börse Group network',
      'Plans for Eurex-listed derivatives on Kraken (subject to regulatory approval)',
      'Integration of xStocks within 360X tokenized asset ecosystem',
      'Clearstream and Crypto Finance for institutional custody',
      'Two-way gateway connecting U.S. and European institutional markets',
    ],
    implication: 'positive',
    thesisComparison: 'Deutsche Börse partnership massively expands Kraken\'s institutional reach across European TradFi. 360T FX integration improves fiat on-ramp efficiency — potential to streamline USDC minting/redemption for institutions. Eurex derivatives and Clearstream custody create new institutional demand for stablecoin settlement.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - XSTOCKS 24/7 TRADING (Dec 3, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-12-03',
    competitor: 'kraken',
    category: 'Product',
    headline: 'Kraken Pro enables 24/7 trading for top 10 xStocks tokenized equities',
    details: [
      'Full 24/7 trading coverage for TSLAx, QQQx, SPYx, NVDAx, CRCLx, AAPLx, HOODx, MSTRx, GLDx, GOOGLx',
      'Previously available 24/5 — now includes weekends and public holidays',
      'On-chain 24/7 settlement combined with Kraken Pro\'s institutional-grade execution',
      'Phase one of broader rollout to additional tokenized stocks and ETFs',
    ],
    implication: 'neutral',
    thesisComparison: 'CRCLx is among the top 10 xStocks with 24/7 trading — directly increases liquidity and accessibility for tokenized Circle equity exposure. 24/7 tokenized equity markets likely require stablecoin settlement rails, benefiting USDC infrastructure.',
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
      'xStocks surpassed $10B combined exchange and onchain volume within 6 months of launch',
      'Acquisition unifies issuance, trading, and settlement under Kraken',
      'xStocks live on Solana and Ethereum — TON, Tron, Mantle, BNB Chain integrations coming',
      'xStocks Alliance ecosystem spans blockchain foundations, trading venues, and consumer apps',
      'Plans to integrate xStocks into Krak money app for hold-and-spend functionality',
      'Over 60 tokenized equities and ETFs backed 1:1 by underlying asset',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken vertically integrating tokenized equity infrastructure accelerates RWA tokenization. xStocks on Ethereum and multichain expansion could drive demand for USDC as the primary settlement currency for tokenized asset markets. Circle\'s CCTP could be the cross-chain USDC bridge for xStocks liquidity.',
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
      'Transparent, time-bound, rule-based structure open to qualified participants',
      'Designed to attract and retain most active trading participants and improve market liquidity',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken incentivizing high-volume market makers with equity warrants should deepen liquidity across trading pairs including USDC pairs. Better market-making improves USDC price stability and reduces spreads for users, supporting USDC\'s utility as a trading settlement currency.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - EURC MARGIN COLLATERAL (Nov 24, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-24',
    competitor: 'kraken',
    category: 'Product',
    headline: 'Kraken adds Circle\'s EURC as margin and futures collateral currency with 1% haircut',
    details: [
      'EURC (Euro Finance by Circle) added to margin collateral lineup — now 54 options',
      '1% haircut — same tier as USDC, USDT, and other major stablecoins',
      'Enables Euro-denominated margin trading without selling EURC holdings',
      'Supports hedging, short selling, and leveraged strategies using EURC collateral',
    ],
    implication: 'positive',
    thesisComparison: 'Directly bullish for Circle. Kraken adding EURC as margin collateral validates Circle\'s euro stablecoin as institutional-grade collateral alongside USDC. Expands EURC utility beyond simple payments into derivatives and leveraged trading — a significant use case expansion for Circle\'s euro product.',
    source: 'Kraken Blog',
    storyId: 'kraken-usdc',
    storyTitle: 'Kraken USDC & Stablecoin Ecosystem',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - RAMP API LAUNCH (Nov 20, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-20',
    competitor: 'kraken',
    category: 'Distribution',
    headline: 'Kraken launches Ramp: developer-friendly API for fiat-to-crypto on/off-ramps across 400+ assets',
    details: [
      'Single API + SDK for any platform to integrate buy/sell crypto flows',
      '24+ payment methods: cards, ACH, PIX, SEPA, Apple Pay, Google Pay and more',
      '400+ assets across 100+ blockchains supported',
      'Targets fintechs, banks, wallets, protocols, exchanges, GameFi, and developers',
      'Kraken manages compliance, licensing, fraud prevention, and payment operations',
    ],
    implication: 'positive',
    thesisComparison: 'Kraken Ramp as B2B infrastructure for fiat-to-crypto creates a massive new distribution channel for USDC. Every fintech, wallet, or protocol integrating Ramp could offer USDC on/off-ramp to their users. Complementary to Circle Mint — Ramp handles consumer fiat while Circle Mint handles institutional minting.',
    source: 'Kraken Blog',
    storyId: 'kraken-expansion',
    storyTitle: 'Kraken Global Expansion & Marketing',
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
      'Unified technical architecture with Kraken Financial in the U.S.',
      'Serves institutional clients: fiduciaries, funds, and corporate treasuries across EEA',
    ],
    implication: 'positive',
    thesisComparison: 'MiCA-regulated custody in the EEA creates institutional-grade infrastructure for holding USDC and EURC. As European institutions gain regulated custody access, demand for Circle\'s MiCA-compliant stablecoins (USDC and EURC issued under French EMI license) should grow.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KRAKEN - XSTOCKS $10B VOLUME (Nov 12, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    date: '2025-11-12',
    competitor: 'kraken',
    category: 'Product',
    headline: 'xStocks surpasses $10B total volume with nearly $2B onchain — 45K+ unique holders in 135 days',
    details: [
      '$10B combined centralized and decentralized exchange volume in 135 days since launch',
      'Nearly $2B in onchain activity across Solana and Ethereum',
      '45,000+ unique onchain holders with $135M+ aggregated AUM',
      'Partners include Alchemy Pay, Bybit, Gate.io, Phantom Wallet, Trust Wallet, Wallet in Telegram',
      'Each xStock fully backed 1:1 by underlying equity in bankruptcy-remote structure',
    ],
    implication: 'neutral',
    thesisComparison: 'xStocks\' rapid adoption ($10B in 135 days) validates demand for tokenized real-world assets. As the RWA tokenization ecosystem scales, USDC is positioned to be the primary settlement currency. Circle\'s own RWA partnerships (BlackRock BUIDL, Hashnote USYC) are complementary infrastructure.',
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
      'Physical data center access at AT TOKYO CC1/CC2, Equinix TY2/TY3 plus cloud on-ramp via AWS Tokyo',
      '99.99% uptime with automatic rerouting and SLA-backed performance',
      'Targets market makers, quant funds, and HFT firms for cross-venue strategies',
    ],
    implication: 'neutral',
    thesisComparison: 'Kraken attracting HFT and institutional traders with sub-140ms connectivity improves exchange liquidity. High-frequency trading strategies often use stablecoins for rapid settlement — USDC\'s deep liquidity on Kraken benefits from faster connectivity infrastructure.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
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
    thesisComparison: 'Kraken\'s quarterly PoR covering USDC demonstrates exchange commitment to stablecoin reserve transparency. Complements Circle\'s own monthly attestation standard. Exchange-level transparency for USDC holdings reinforces institutional confidence in USDC as a trustworthy reserve asset.',
    source: 'Kraken Blog',
    storyId: 'kraken-institutional',
    storyTitle: 'Kraken Institutional Services',
  },
];
