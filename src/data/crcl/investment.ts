/**
 * CRCL (CIRCLE) - INVESTMENT THESIS DATA
 * ================================================
 *
 * Current investment thesis and historical archive.
 *
 * DATA SOURCES:
 * - Current: Q3 2025 10-Q, OCC Charter Approval
 * - Archive: Historical filings and earnings releases
 *
 * LAST UPDATED: 2025-12-31
 * NEXT UPDATE: After Q4 2025 10-K (~March 2026)
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Update CRCL_INVESTMENT_CURRENT with new data
 * 2. Add a new archive entry at the TOP of CRCL_INVESTMENT_ARCHIVE
 * 3. NEVER delete archive entries — they are the permanent historical record
 */

import type { InvestmentCurrent, ArchiveEntry } from '@/components/shared/investmentTypes';

export const CRCL_INVESTMENT_CURRENT: InvestmentCurrent = {
  date: '2025-12-31',
  source: 'Q3 2025 10-Q, OCC Charter Approval',
  verdict: 'OVERWEIGHT',
  verdictColor: 'mint',
  tagline: 'Regulated stablecoin infrastructure play with TradFi optionality',

  // Investment Scorecard — Unified 8-category framework (matches ASTS/BMNR)
  scorecard: [
    { category: 'Financial Strength', rating: 'A+', color: 'var(--mint)', detail: '$1.15B cash, zero debt, FCF positive' },
    { category: 'Profitability', rating: 'B+', color: 'var(--sky)', detail: '39% RLDC margin, Coinbase cost overhang (54%)' },
    { category: 'Growth', rating: 'A', color: 'var(--mint)', detail: '66% rev YoY, 108% USDC YoY, Rule of 40: 105' },
    { category: 'Valuation', rating: 'A-', color: 'var(--mint)', detail: '6.4x P/S vs 16x peers, 50%+ discount to payment networks' },
    { category: 'Competitive Position', rating: 'B+', color: 'var(--sky)', detail: 'Regulatory moat, but Tether 65% share; OCC charter approved Dec 2025' },
    { category: 'Execution', rating: 'A', color: 'var(--mint)', detail: 'Strong board (ex-Goldman, ex-CFTC), founder-led, CPN/Arc scaling' },
    { category: 'Regulatory/External', rating: 'A-', color: 'var(--mint)', detail: 'GENIUS Act tailwind, OCC charter approved Dec 2025; rate sensitivity risk' },
    { category: 'Capital Structure', rating: 'A-', color: 'var(--mint)', detail: 'Class B founders, Coinbase equity stake, no dilution needed' },
  ],

  // Executive Summary — Unified schema (matches ASTS/BMNR)
  executiveSummary: {
    headline: 'Regulated stablecoin infrastructure play with TradFi optionality',
    thesis: 'Circle is building the dominant compliant stablecoin infrastructure for the digital dollar economy. USDC is the only institutional-grade stablecoin with full regulatory transparency, and Circle is positioning to capture TradFi adoption via OCC bank charter and GENIUS Act compliance.',
    bottomLine: 'Best-in-class regulatory positioning trading at a crypto discount. The market is pricing the past (crypto winter, SVB crisis) while ignoring the future (payment network economics, regulatory moat).',
    whatsNew: [
      'Q3 2025: 66% YoY revenue growth, $62.5B USDC circulation',
      'OCC bank charter application advancing',
      'GENIUS Act provides regulatory clarity tailwind',
      'Arc/CPN network scaling, cross-border settlement growing',
    ],
  },

  // Growth Drivers
  growthDrivers: [
    { driver: 'USDC Circulation Growth', impact: 'Critical', description: '108% YoY growth in Q3. Every $10B USDC adds ~$400M annual revenue at current rates.', color: 'var(--mint)' },
    { driver: 'Rate Environment', impact: 'High', description: '~4% reserve yield on $62.5B = $2.5B potential revenue. Rates staying higher for longer is bullish.', color: 'var(--mint)' },
    { driver: 'TradFi Adoption', impact: 'High', description: 'OCC charter enables bank-level partnerships. GENIUS Act creates compliance moat vs offshore competitors.', color: 'var(--sky)' },
    { driver: 'Cross-Border Settlement', impact: 'Medium', description: 'Arc/CPN network for B2B payments. Faster, cheaper than SWIFT. Growing adoption in LatAm, APAC.', color: 'var(--sky)' },
    { driver: 'Coinbase Renegotiation', impact: 'Medium', description: '54% RLDC drag. Every 10% reduction = ~$200M margin improvement. Leverage increases as Circle scales.', color: 'var(--gold)' },
  ],

  // Competitive Moat
  moatSources: [
    { source: 'Regulatory Compliance', strength: 'Strong', detail: 'Only fully transparent stablecoin. Monthly attestations, SEC-registered, OCC charter approved Dec 2025.', color: 'var(--mint)' },
    { source: 'TradFi Relationships', strength: 'Strong', detail: 'BlackRock reserve management, BNY Mellon custody, major bank partnerships.', color: 'var(--mint)' },
    { source: 'Multi-Chain Infrastructure', strength: 'Building', detail: 'Native USDC on 15+ chains. CCTP enables seamless cross-chain transfers.', color: 'var(--sky)' },
    { source: 'Developer Ecosystem', strength: 'Building', detail: 'Programmable Wallets, Circle Mint APIs, embedded finance toolkit.', color: 'var(--sky)' },
  ],
  moatThreats: [
    { threat: 'Tether (USDT)', risk: 'High', detail: '65% market share. If Tether achieves full transparency, regulatory gap closes.', color: 'var(--coral)' },
    { threat: 'Bank Stablecoins', risk: 'Medium', detail: 'JPM Coin, PayPal USD emerging. Banks have distribution advantage.', color: 'var(--gold)' },
    { threat: 'Rate Sensitivity', risk: 'Medium', detail: 'Revenue directly tied to Fed Funds. 100bps cut = ~$625M revenue impact.', color: 'var(--gold)' },
    { threat: 'Coinbase Dependency', risk: 'Medium', detail: '54% RLDC share, 20% equity stake. Coinbase has leverage in negotiations.', color: 'var(--gold)' },
  ],

  // Risk Matrix
  risks: [
    { risk: 'Interest Rate Decline', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Revenue directly tied to Fed Funds Rate. Each 100bps cut costs ~$625M annually at current USDC levels.', mitigation: 'USDC growth can offset rate cuts; transaction fees less rate-sensitive.' },
    { risk: 'Coinbase Renegotiation Failure', severity: 'High', likelihood: 'Low', impact: 'High', detail: '54% RLDC share significantly impacts margins. Failed renegotiation would cap margin expansion.', mitigation: 'Contract expires 2027; Circle leverage increasing as network grows.' },
    { risk: 'Tether Transparency', severity: 'Medium', likelihood: 'Medium', impact: 'Medium', detail: 'If Tether achieves full transparency/compliance, regulatory moat weakens significantly.', mitigation: 'First-mover advantage in TradFi; relationships take years to build.' },
    { risk: 'Regulatory Reversal', severity: 'Medium', likelihood: 'Low', impact: 'High', detail: 'GENIUS Act failure or hostile regulatory shift could impact growth trajectory.', mitigation: 'Bipartisan support; multiple jurisdictional licenses provide optionality.' },
    { risk: 'Lock-up Expiry', severity: 'Low', likelihood: 'High', impact: 'Medium', detail: 'December 2025 lock-up expiry creates near-term supply overhang.', mitigation: 'Strong fundamentals typically absorb lock-up selling; use as entry opportunity.' },
  ],

  // Three Perspectives — Unified schema (matches ASTS/BMNR)
  perspectives: {
    cfa: {
      title: 'CFA Analyst',
      assessment: 'FAVORABLE',
      color: 'var(--mint)',
      summary: 'High-quality fintech with unique regulatory positioning. Strong balance sheet, positive FCF, and clear path to margin expansion. Best suited for growth portfolios with 2-3 year horizon.',
      ecosystemView: 'Stablecoin TAM expanding rapidly. Institutional adoption accelerating post-GENIUS Act. Circle positioned as "safe" choice for regulated entities entering digital assets.',
      recommendation: 'Allocate 2-4% of growth portfolio. Use lock-up weakness as entry opportunity.',
    },
    hedgeFund: {
      title: 'Hedge Fund PM',
      assessment: 'HIGH CONVICTION LONG',
      color: 'var(--mint)',
      summary: 'Asymmetric setup: regulated monopoly position trading at crypto discount. Event calendar stacked: lock-up, OCC charter, Coinbase renegotiation. Defined entry/exit framework.',
      ecosystemView: 'Crypto/TradFi convergence is a multi-year theme. Circle is the picks-and-shovels play. ETF approvals and bank adoption drive incremental USDC demand.',
      recommendation: 'Size 3-5% of book. Scale in on lock-up. Trim on 50%+ gains.',
    },
    cio: {
      title: 'Family Office CIO',
      assessment: 'CORE POSITION',
      color: 'var(--violet)',
      summary: 'Clean way to gain stablecoin/crypto infrastructure exposure without direct token risk. Regulatory moat creates defensible position. Multi-bagger potential if TradFi adoption accelerates.',
      ecosystemView: 'Digital dollar infrastructure is a generational investment theme. Circle is the most investable pure-play. BlackRock/Fidelity ownership validates institutional acceptability.',
      recommendation: '3-5% of alternatives allocation. Multi-year hold.',
    },
    technicalAnalyst: {
      title: 'Technical Analyst',
      assessment: 'NEUTRAL — BASE BUILDING',
      color: 'var(--gold)',
      summary: 'Recent IPO establishing price discovery range. Watch for completion of IPO base formation — typically 3-6 months of consolidation before directional move. Initial support at IPO price level ($31). Declining volume on pullbacks is constructive. VWAP from IPO serving as key pivot level.',
      ecosystemView: 'CRCL showing relative strength vs fintech peers and crypto proxies. Lock-up expiry creates potential supply overhang — monitor volume carefully around that date. Bollinger Bands narrowing suggests volatility compression before expansion. RSI neutral at 50 level provides no directional bias yet.',
      recommendation: 'Accumulate on successful test of IPO base. Wait for breakout above $45 with volume for momentum entry. Stop loss: close below $28.',
    },
  },

  // Position Sizing
  positionSizing: {
    aggressive: { range: '4-5%', description: 'High-conviction fintech/crypto exposure' },
    growth: { range: '2-4%', description: 'Growth-oriented with digital assets exposure' },
    balanced: { range: '1-2%', description: 'Diversified portfolios seeking fintech optionality' },
    conservative: { range: '0-1%', description: 'Risk-averse (speculative allocation only)' },
  },

  // Price Targets
  priceTargets: [
    { period: '0-6 months', range: '$65-95', outlook: 'Volatile', detail: 'Lock-up expiry Dec 2025 passed. Q4 earnings catalyst.' },
    { period: '6-18 months', range: '$90-130', outlook: 'Bullish', detail: 'OCC charter, Coinbase renegotiation progress, continued USDC growth.' },
    { period: '18-36 months', range: '$130-200+', outlook: 'Very Bullish', detail: '$100B+ USDC, margin expansion, payment network multiple re-rate.' },
  ],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ARCHIVE - NEVER DELETE! ADD NEW ENTRIES AT TOP AFTER EACH FILING
// This is the permanent historical record of investment thesis evolution
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const CRCL_INVESTMENT_ARCHIVE: ArchiveEntry[] = [
  // ⬇️ ADD NEW ENTRIES HERE (most recent first) ⬇️
  {
    date: '2025-12-31',
    source: 'Q3 2025 10-Q, OCC Charter Progress',
    verdict: 'OVERWEIGHT',
    verdictColor: 'mint',
    headline: 'Regulatory Moat Strengthening',
    summary: 'Q3 delivered 66% revenue growth, USDC hit $62.5B. OCC charter advancing. GENIUS Act provides tailwind. Lock-up expiry creates entry opportunity.',
    keyDevelopments: ['66% YoY revenue growth', '$62.5B USDC circulation', 'OCC charter application advancing', 'GENIUS Act regulatory clarity'],
    lookingAhead: 'Lock-up Dec 2025 — use weakness as entry. Watch OCC charter timeline and Coinbase renegotiation progress.',
  },
  {
    date: '2025-09-30',
    source: 'Q2 2025 10-Q',
    verdict: 'OVERWEIGHT',
    verdictColor: 'mint',
    headline: 'IPO Momentum Continues',
    summary: 'Strong post-IPO execution. USDC growth accelerating. TradFi partnerships expanding.',
    keyDevelopments: ['Successful NYSE listing', 'USDC growth re-accelerating', 'BlackRock/Fidelity cornerstone investors'],
    lookingAhead: 'Focus on USDC growth trajectory and margin expansion path.',
  },
  {
    date: '2025-11-14',
    source: "Q3'25 8-K Earnings Release",
    verdict: 'OVERWEIGHT',
    verdictColor: 'mint',
    headline: 'Beat on All Metrics',
    summary: "Post-Q3'25 earnings: Beat on all metrics. Revenue +66% YoY exceeded buy-side expectations of +55%. Platform % inflection to 13.5% suggests early CPN traction. Raised guidance on RLDC margin encouraging.",
  },
  {
    date: '2025-08-18',
    source: 'S-1 Follow-on Filing, Pricing at $130',
    verdict: 'NEUTRAL → OVERWEIGHT',
    verdictColor: 'mint',
    headline: 'Follow-on Validates Demand',
    summary: 'Follow-on priced at $130 (4.2x IPO price in 10 weeks) validates institutional demand. Secondary-heavy deal (8M of 10M shares) means existing holders taking profits, not company needing capital. Upgrading on strength.',
  },
  {
    date: '2025-08-12',
    source: "Q2'25 10-Q, First Public Earnings",
    verdict: 'NEUTRAL',
    headline: 'First Earnings Mixed',
    summary: 'First earnings as public company mixed: Strong top-line (+53% YoY) but $482M net loss on IPO-related charges creates headline noise. Underlying business healthy — $126M Adj. EBITDA, $61.3B USDC (+90% YoY).',
  },
  {
    date: '2025-06-06',
    source: 'IPO Pricing, 424B4 Prospectus',
    verdict: 'NEUTRAL',
    headline: 'IPO at Low End of Range',
    summary: 'IPO priced at $31 (low end of range) reflects crypto market hesitancy, not fundamentals. Upsized deal (39M vs 24M shares) absorbed cleanly. $1.21B raised provides growth runway. Initiating at neutral.',
  },
  {
    date: '2025-04-01',
    source: 'S-1 Initial Public Filing',
    verdict: 'MONITORING',
    verdictColor: 'gold',
    headline: 'S-1 Filed Publicly',
    summary: 'S-1 filed publicly after confidential submission in Jan 2024. Business model validated: $1.68B FY24 revenue, 38% RLDC margin, USDC at $44B. Key concern is Coinbase distribution cost (54% of revenue).',
  },
  {
    date: '2024-01-11',
    source: 'Confidential S-1 Announcement',
    verdict: 'MONITORING',
    verdictColor: 'gold',
    headline: 'Confidential S-1 Filed',
    summary: 'Confidential S-1 submission signals IPO intent after failed SPAC in 2022. Circle has rebuilt credibility post-SVB crisis with 100% reserve transparency. USDC recovery from $24B low to $32B+ suggests crypto winter thaw.',
  },
  {
    date: '2023-08-21',
    source: 'Centre Dissolution PR, Coinbase Equity Investment',
    verdict: 'MONITORING',
    verdictColor: 'gold',
    headline: 'Centre Dissolved',
    summary: 'Centre Consortium dissolution and Coinbase equity investment restructures USDC economics. Circle now sole issuer with full governance control. Revenue share agreement creates ~50-60% distribution cost.',
  },
  {
    date: '2023-03-01',
    source: 'SVB Collapse, USDC Depeg Event',
    verdict: 'UNDERWEIGHT',
    verdictColor: 'coral',
    headline: 'SVB Crisis — Existential Risk',
    summary: 'SVB collapse creates existential risk. $3.3B of USDC reserves held at SVB. Weekend depeg to $0.87 causes $6B+ redemptions. Fed/FDIC backstop saves reserves but damages trust.',
  },
];
