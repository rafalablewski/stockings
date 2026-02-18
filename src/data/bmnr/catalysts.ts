/**
 * BMNR (BITMINE) - CATALYSTS & MILESTONES
 * ================================================
 *
 * Upcoming catalysts and completed milestones.
 *
 * DATA SOURCES:
 * - Upcoming: Press releases, earnings calls, investor presentations
 * - Completed: Historical press releases, SEC filings
 *
 * LAST UPDATED: 2026-02-10
 * NEXT UPDATE: After each milestone completion or new catalyst announcement
 *
 * AI AGENT INSTRUCTIONS:
 * When a catalyst is completed:
 * 1. Remove from UPCOMING_CATALYSTS array
 * 2. Add to COMPLETED_MILESTONES array with completion date
 * 3. Update timeline if significant
 *
 * When adding new catalysts:
 * 1. Set appropriate timeline (Q1 2026, 2026, Late 2026, etc.)
 * 2. Set impact level: Critical > High > Medium > Low
 * 3. Add category for filtering
 */

import type { Catalyst, CompletedMilestone, DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const CATALYSTS_METADATA: DataMetadata = {
  lastUpdated: '2026-02-17',
  source: 'Press releases, 8-K filings, Kraken blog, CoinDesk',
  nextExpectedUpdate: 'After next 8-K or earnings release',
  notes: 'Includes ETH ecosystem catalysts relevant to BMNR treasury thesis',
};

// ============================================================================
// UPCOMING CATALYSTS
// ============================================================================

/**
 * Future events that could impact stock price
 *
 * AI AGENT INSTRUCTIONS:
 * - Keep sorted by expected timeline
 * - Update timeline if company provides new guidance
 * - Move to COMPLETED_MILESTONES when event occurs
 * - Impact levels:
 *   - Critical: Binary outcomes that define company success
 *   - High: Significant revenue or strategic value
 *   - Medium: Important but incremental progress
 *   - Low: Nice to have, limited near-term impact
 */
export const UPCOMING_CATALYSTS: Catalyst[] = [
  // === ETH HOLDINGS & TREASURY ===
  {
    event: 'Reach 5% of ETH Supply (~6M ETH) - "Alchemy of 5%" Target',
    timeline: '2026',
    impact: 'Critical',
    category: 'Treasury',
  },
  {
    event: '$24.5B ATM+ Program Execution (Active)',
    timeline: '2026',
    impact: 'High',
    category: 'Treasury',
  },
  {
    event: 'Staking Ratio Increase Above 70%',
    timeline: '2026',
    impact: 'Medium',
    category: 'Treasury',
  },
  {
    event: 'EigenLayer Restaking Yield Expansion',
    timeline: '2026',
    impact: 'Medium',
    category: 'Treasury',
  },

  // === ETHEREUM ECOSYSTEM ===
  {
    event: 'Ethereum Pectra Upgrade',
    timeline: '2026',
    impact: 'High',
    category: 'Ethereum',
  },
  {
    event: 'ETH ETF Staking Approval (SEC)',
    timeline: '2026',
    impact: 'Critical',
    category: 'Ethereum',
  },
  {
    event: 'CME ETH Futures Volume Growth on Kraken',
    timeline: '2026',
    impact: 'Medium',
    category: 'Ethereum',
  },

  // === CORPORATE & FINANCIAL ===
  {
    event: 'Quarterly Dividend Increase (Currently $0.01/share)',
    timeline: '2026',
    impact: 'Medium',
    category: 'Corporate',
  },
  {
    event: 'Q1 FY2026 Earnings Release',
    timeline: 'Q1 2026',
    impact: 'High',
    category: 'Corporate',
  },
  {
    event: 'Russell Index Inclusion / Rebalancing',
    timeline: '2026',
    impact: 'High',
    category: 'Corporate',
  },

  // === REGULATORY ===
  {
    event: 'U.S. Crypto Market Structure Legislation',
    timeline: '2026',
    impact: 'High',
    category: 'Regulatory',
  },
  {
    event: 'SEC Staking Guidance / Safe Harbor',
    timeline: '2026',
    impact: 'High',
    category: 'Regulatory',
  },
];

// ============================================================================
// COMPLETED MILESTONES
// ============================================================================

/**
 * Historical achievements and completed catalysts
 *
 * AI AGENT INSTRUCTIONS:
 * - Add new entries at the top (most recent first)
 * - Include specific dates when known
 * - Move from UPCOMING_CATALYSTS when completed
 */
export const COMPLETED_MILESTONES: CompletedMilestone[] = [
  // === 2026 ===
  { event: 'Staking ratio crosses 67% threshold — now 69.5% (3,040,483 of 4,371,497 ETH staked); largest staker globally', date: 'Feb 17, 2026', category: 'Treasury' },
  { event: 'Tom Lee presented at CoinDesk Consensus 2026 in Hong Kong; 8-K filed with presentation as Exhibit 99.1', date: 'Feb 11, 2026', category: 'Corporate' },
  { event: 'Polygon Labs, Ethena ($10B TVL USDe), and Nethermind join Enterprise Ethereum Alliance as institutional coordination body', date: 'Feb 11, 2026', category: 'Ecosystem' },
  { event: 'Beast Industries (MrBeast) acquires Step banking app (7M+ users, ~$500M raised); BMNR $200M investment now includes fintech platform', date: 'Feb 10, 2026', category: 'Corporate' },
  { event: 'ETHZilla launches Eurus Aero Token I: first tokenized aviation assets ($12.2M jet engines) on Ethereum L2 via ERC-20 tokens', date: 'Feb 12, 2026', category: 'Ecosystem' },
  { event: 'S-8 filed for 2025 Omnibus Incentive Plan; signed by full board including Chi Tsang, Young Kim, Tom Lee', date: 'Feb 9, 2026', category: 'Corporate' },
  { event: 'Erik Nelson terminated as President without cause (effective Jan 22); $605K total severance ($20K + $585K lump sum); non-compete waived', date: 'Jan 28, 2026', category: 'Corporate' },
  { event: 'HTX launched USDe minting and redemption service; USDe is backed by BTC and ETH via delta-neutral hedging strategy by Ethena Labs', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'Arowana gold tokenization platform launching on Arbitrum (Ethereum L2) in March 2026; backed by Hancom Group ($600M gold trading volume)', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'Sushi DEX launches on Solana with Jupiter Ultra API integration; extends multi-chain trading to 4M+ users', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'GlobalStake launches Bitcoin Yield Gateway for institutional clients; aggregates multiple BTC yield strategies (4-14% net APY) with enterprise-grade API for custodians and exchanges', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'Metalpha (Nasdaq: MATH) adopts BTC allocation plan up to 20% of annual net profit (~$3.2M); initial $1M purchase at ~$54,000/BTC via proprietary Accumulator structure', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'ADI Foundation partners with H2O Hospitality to embed ADI Chain blockchain payments in UAE travel sector; Dirham-backed stablecoin for hospitality. Partners include Franklin Templeton, BlackRock, Mastercard', date: 'Feb 5, 2026', category: 'Ecosystem' },
  { event: 'Bitpanda joins Global Dollar Network (USDG); Kraken is a GDN partner. USDG available on Ethereum, Solana, Ink, X Layer. MiCA-compliant via Finland FIN-FSA', date: 'Feb 5, 2026', category: 'Ecosystem' },
  { event: 'Bitwise launches model portfolio solutions for digital assets ($15B+ client AUM); Bitwise is Kraken Institutional strategy partner. Seven models across core and thematic strategies', date: 'Feb 3, 2026', category: 'Ecosystem' },
  { event: 'Wirex powers Chimera Card launch: Bitcoin-funded non-custodial debit card accepted at 80M+ merchants globally via BaaS infrastructure', date: 'Feb 3, 2026', category: 'Ecosystem' },

  // === 2025 (POST-IPO) ===
  { event: 'Annual meeting: 81% YES on 50B auth shares; all proposals approved. 500K+ individual stockholders.', date: 'Jan 15, 2026', category: 'Corporate' },
  { event: 'Beast Industries $200M equity investment closed; MrBeast 460M+ YouTube subscribers, Step fintech app 7M+ users', date: 'Dec 22, 2025', category: 'Corporate' },
  { event: 'CFO Mow separated (Dec 18), Young Kim appointed CFO/COO (Jan 9); Mow board resignation Dec 12', date: 'Dec 2025', category: 'Corporate' },
  { event: 'DEF 14A/DEFR14A proxy filed for 50B authorized shares; annual meeting set Jan 15 at Wynn Las Vegas', date: 'Dec 8, 2025', category: 'Corporate' },
  { event: 'Insider sales: Bates ~$70M (2.8M shares), Mow ~$25M (1M shares), Bayles ~$17M (700K shares); total ~$112M', date: 'Oct-Dec 2025', category: 'Corporate' },
  { event: 'Chi Tsang appointed CEO (Nov 14); Board restructured with Edgeworth, Howe, Sechan replacing Bayles, Kelly, Nelson', date: 'Nov 14, 2025', category: 'Corporate' },
  { event: 'Founders Fund (Peter Thiel) SC 13G/A: 5.1% ownership; Xuan Yong Xiao SC 13D: 7.5% (28.97M shares)', date: 'Sep-Oct 2025', category: 'Corporate' },
  { event: '$365M registered direct @ $70/share (14% premium) + warrants @ $87.50; Moelis as placement agent', date: 'Sep 22, 2025', category: 'Treasury' },
  { event: 'Employment agreements: Bates $3.04M/yr, Mow $1.02M/yr, Nelson $406K/yr; Sharbutt joins board', date: 'Aug-Sep 2025', category: 'Corporate' },
  { event: 'ARK Invest (Cathie Wood) $182M block trade; 4.77M shares; 100% proceeds to ETH', date: 'Jul 22, 2025', category: 'Treasury' },
  { event: '$250M PIPE closes (Jul 9) led by MOZAYYX + Founders Fund, Pantera, Kraken, Galaxy, DCG; ETH pivot begins', date: 'Jul 9, 2025', category: 'Treasury' },
  { event: 'Ethereum Tower LLC treasury advisory agreement (10-year term); $2B ATM launched via S-3ASR', date: 'Jul 8-9, 2025', category: 'Corporate' },
  // === 2025 (PRE-IPO) ===
  { event: 'S-1 IPO Registration Statement filed (May 27); IPO at $8/share raising ~$18M (Jun 6); NYSE American uplisting (Jun 5)', date: 'May-Jun 2025', category: 'Corporate' },
  { event: 'FY2024 10-K filed (delayed from Nov 2024 NT 10-K); post-auditor transition', date: 'Jan 2025', category: 'Corporate' },
  { event: 'Q2 FY2025 10-Q filed (Apr 14, 2025); pre-IPO quarterly filing', date: 'Apr 14, 2025', category: 'Corporate' },
  { event: 'Kraken Proof of Reserves: ETH verified 1:1 with Merkle proofs (covers BTC, ETH, SOL, USDC, USDT, XRP, ADA)', date: 'Oct 22, 2025', category: 'Ecosystem' },
  { event: 'Kraken launched CME ETH futures contracts alongside BTC and SOL', date: 'Oct 9, 2025', category: 'Ecosystem' },
  { event: 'Kraken acquired CFTC-regulated Designated Contract Market (Small Exchange) for $100M', date: 'Oct 16, 2025', category: 'Ecosystem' },
  { event: 'xStocks tokenized equities launched on Ethereum via Kraken and Backed', date: 'Sep 2, 2025', category: 'Ecosystem' },
  { event: 'U.S. Department of Commerce published GDP data on Ethereum and 8 other public blockchains via Kraken', date: 'Aug 28, 2025', category: 'Ecosystem' },
  { event: 'Kraken MiCA license fully activated across all 30 EEA countries', date: 'Aug 12, 2025', category: 'Ecosystem' },
  { event: 'Kraken acquired Capitalise.ai for no-code trading automation on Kraken Pro', date: 'Aug 20, 2025', category: 'Ecosystem' },
  { event: 'First quarterly dividend declared: $0.01/share', date: 'Nov 24, 2025', category: 'Corporate' },
  { event: '$24.5B ATM+ program filed', date: 'Aug 12, 2025', category: 'Treasury' },
  { event: '$4.5B ATM+ program exhausted in 5 weeks', date: 'Aug 2025', category: 'Treasury' },
  { event: '$2B ATM program exhausted', date: 'Jul 2025', category: 'Treasury' },
  { event: 'Surpassed 4M ETH holdings', date: '2025', category: 'Treasury' },
  { event: 'Surpassed 3% of ETH supply', date: '2025', category: 'Treasury' },

  // === 2024 (PRE-IPO) ===
  { event: 'FY2024 10-K delayed (NT 10-K filed Nov 29); auditor transition after BF Borgers ban', date: 'Nov 29, 2024', category: 'Corporate' },
  { event: 'First ETH purchase agreement filed (8-K Oct 15, 2024); pre-IPO ETH exposure begins', date: 'Oct 15, 2024', category: 'Treasury' },
  { event: 'ETH staking agreement signed (projected 4-5% yields); precursor to MAVAN', date: 'Aug 15, 2024', category: 'Treasury' },
  { event: 'SEC resolved 7 CORRESP rounds on crypto disclosures (breakeven, pools, impairment, halving); Aug 2023-Nov 2024', date: 'Nov 2024', category: 'Corporate' },
  { event: 'New auditor appointed after BF Borgers ban (Jun 5 8-K); BF Borgers resigned May 1', date: 'Jun 5, 2024', category: 'Corporate' },

  // === 2023 ===
  { event: 'S-1 registration withdrawn (RW filing Jun 15); pivoted away from $10M mining offering', date: 'Jun 15, 2023', category: 'Corporate' },
  { event: 'FY2023 annual report: first meaningful revenue $0.6M (hosting/mining); loss $3.3M; assets $4M', date: 'Aug 31, 2023', category: 'Corporate' },
  { event: 'FY2023 10-K delayed (NT 10-K filed Nov 29, 2023); admin/compliance delay', date: 'Nov 29, 2023', category: 'Corporate' },

  // === 2022 ===
  { event: 'Name changed from Sandy Springs Holdings to Bitmine Immersion Technologies (DEF 14C Jul 15)', date: 'Jul 2022', category: 'Corporate' },
  { event: 'Authorized shares increased to 500M via majority consent (DEF 14C)', date: 'Jul 2022', category: 'Corporate' },
  { event: 'First Bitcoin treasury purchases (8-K filings Aug-Nov 2022)', date: 'Aug 2022', category: 'Treasury' },
  { event: 'First revenue: $428K from crypto hosting in Q3 FY2022', date: 'May 2022', category: 'Corporate' },
  { event: 'S-1 filed for proposed $10M mining expansion offering (later withdrawn)', date: 'May 31, 2022', category: 'Corporate' },

  // === 2021 ===
  { event: 'FY2021 annual report filed: $0 revenues, $154K loss, mining pivot described', date: 'Aug 31, 2021', category: 'Corporate' },
  { event: 'Founding shareholders established: 5 SC 13D filings + 5 Form 3s (30%+ concentrated ownership)', date: 'Jul-Sep 2021', category: 'Corporate' },
  { event: 'First capital raise: $1.05M via Form D exempt offering (Rule 506(b))', date: 'Apr 4, 2021', category: 'Corporate' },
  { event: 'SEC registration review completed; Form 10-12G cleared after 4 CORRESP rounds', date: 'Mar 23, 2021', category: 'Corporate' },

  // === 2020 ===
  { event: 'SEC registration filed as Sandy Springs Holdings (Form 10-12G; shell company, 2.8M shares, $0 revenue)', date: 'Oct 27, 2020', category: 'Corporate' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get catalysts by impact level
 */
export const getCatalystsByImpact = (impact: Catalyst['impact']): Catalyst[] => {
  return UPCOMING_CATALYSTS.filter(c => c.impact === impact);
};

/**
 * Get catalysts by category
 */
export const getCatalystsByCategory = (category: string): Catalyst[] => {
  return UPCOMING_CATALYSTS.filter(c => c.category === category);
};

/**
 * Get all unique catalyst categories
 */
export const getCatalystCategories = (): string[] => {
  return [...new Set(UPCOMING_CATALYSTS.map(c => c.category).filter(Boolean) as string[])];
};
