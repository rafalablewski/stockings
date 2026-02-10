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
  lastUpdated: '2026-02-10',
  source: 'Press releases, 8-K filings, Kraken blog',
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
    event: 'Staking Ratio Increase Above 67%',
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
  { event: 'HTX launched USDe minting and redemption service; USDe is backed by BTC and ETH via delta-neutral hedging strategy by Ethena Labs', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'Arowana gold tokenization platform launching on Arbitrum (Ethereum L2) in March 2026; backed by Hancom Group ($600M gold trading volume)', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'Sushi DEX launches on Solana with Jupiter Ultra API integration; extends multi-chain trading to 4M+ users', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'GlobalStake launches Bitcoin Yield Gateway for institutional clients; aggregates multiple BTC yield strategies (4-14% net APY) with enterprise-grade API for custodians and exchanges', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'Metalpha (Nasdaq: MATH) adopts BTC allocation plan up to 20% of annual net profit (~$3.2M); initial $1M purchase at ~$54,000/BTC via proprietary Accumulator structure', date: 'Feb 9, 2026', category: 'Ecosystem' },
  { event: 'ADI Foundation partners with H2O Hospitality to embed ADI Chain blockchain payments in UAE travel sector; Dirham-backed stablecoin for hospitality. Partners include Franklin Templeton, BlackRock, Mastercard', date: 'Feb 5, 2026', category: 'Ecosystem' },
  { event: 'Bitpanda joins Global Dollar Network (USDG); Kraken is a GDN partner. USDG available on Ethereum, Solana, Ink, X Layer. MiCA-compliant via Finland FIN-FSA', date: 'Feb 5, 2026', category: 'Ecosystem' },
  { event: 'Bitwise launches model portfolio solutions for digital assets ($15B+ client AUM); Bitwise is Kraken Institutional strategy partner. Seven models across core and thematic strategies', date: 'Feb 3, 2026', category: 'Ecosystem' },
  { event: 'Wirex powers Chimera Card launch: Bitcoin-funded non-custodial debit card accepted at 80M+ merchants globally via BaaS infrastructure', date: 'Feb 3, 2026', category: 'Ecosystem' },

  // === 2025 ===
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
