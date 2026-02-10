/**
 * CRCL (CIRCLE) - CATALYSTS & MILESTONES
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
  source: 'Press releases, SEC filings, partner announcements',
  nextExpectedUpdate: 'After Q4 2025 10-K (~March 2026)',
  notes: 'Includes USDC ecosystem catalysts and partner platform events',
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
  // === EARNINGS & FINANCIALS ===
  {
    event: 'Q4 2025 Earnings / FY2025 10-K Filing',
    timeline: 'March 2026',
    impact: 'High',
    category: 'Earnings',
  },
  {
    event: 'USDC Circulation Surpasses $100B',
    timeline: '2026',
    impact: 'Critical',
    category: 'Product',
  },
  {
    event: 'Q1 2026 Earnings Release',
    timeline: 'Q2 2026',
    impact: 'High',
    category: 'Earnings',
  },

  // === PRODUCT & INFRASTRUCTURE ===
  {
    event: 'Arc Layer-1 Mainnet Launch',
    timeline: '2026',
    impact: 'High',
    category: 'Product',
  },
  {
    event: 'Circle Payments Network (CPN) General Availability',
    timeline: '2026',
    impact: 'Critical',
    category: 'Product',
  },
  {
    event: 'Circle Gateway General Availability (Crosschain USDC)',
    timeline: '2026',
    impact: 'High',
    category: 'Product',
  },

  // === REGULATORY ===
  {
    event: 'OCC National Digital Currency Bank Full Charter',
    timeline: '2026',
    impact: 'Critical',
    category: 'Regulatory',
  },
  {
    event: 'GENIUS Act Implementation / Final Rulemaking',
    timeline: '2026',
    impact: 'High',
    category: 'Regulatory',
  },
  {
    event: 'ADGM (Abu Dhabi) Full FSP License',
    timeline: '2026',
    impact: 'Medium',
    category: 'Regulatory',
  },

  // === PARTNERSHIPS & DISTRIBUTION ===
  {
    event: 'Intuit USDC Integration Rollout (~100M Users)',
    timeline: '2026',
    impact: 'Critical',
    category: 'Partnership',
  },
  {
    event: 'Kraken USDC/EURC Expanded Integration',
    timeline: '2026',
    impact: 'Medium',
    category: 'Partnership',
  },
  {
    event: 'CPN Bank Partner Go-Lives (Santander, Deutsche Bank, SocGen, StanChart)',
    timeline: '2026',
    impact: 'High',
    category: 'Partnership',
  },
  {
    event: 'ICE (NYSE Parent) USDC/USYC Product Launch',
    timeline: '2026',
    impact: 'High',
    category: 'Partnership',
  },

  // === EXPANSION ===
  {
    event: 'USDC Expansion to Additional Blockchains',
    timeline: '2026',
    impact: 'Medium',
    category: 'Expansion',
  },
  {
    event: 'EURC Adoption Growth Under MiCA Framework',
    timeline: '2026',
    impact: 'Medium',
    category: 'Expansion',
  },

  // === CORPORATE ===
  {
    event: 'S&P 500 Index Inclusion',
    timeline: '2026+',
    impact: 'High',
    category: 'Corporate',
  },
  {
    event: 'Class B Shares Sunset (2030)',
    timeline: '2030',
    impact: 'Medium',
    category: 'Corporate',
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
  // === 2025 ===
  { event: 'Intuit multi-year strategic partnership for USDC across TurboTax, QuickBooks, Credit Karma (~100M users)', date: 'Dec 18, 2025', category: 'Partnership' },
  { event: 'OCC conditional approval for National Digital Currency Bank', date: 'Dec 12, 2025', category: 'Regulatory' },
  { event: 'Q3 2025 earnings: $740M revenue (+66% YoY), $166M Adj. EBITDA (+79% YoY)', date: 'Nov 12, 2025', category: 'Earnings' },
  { event: 'Arc public testnet launched with 100+ companies (Apollo, BNY, ICE, Goldman, HSBC, Visa, Mastercard, Aave, Uniswap)', date: 'Oct 28, 2025', category: 'Product' },
  { event: 'USDC deposits and withdrawals live on Ink (Kraken L2 on OP Stack)', date: 'Oct 14, 2025', category: 'Expansion' },
  { event: 'Kraken Proof of Reserves: USDC verified alongside BTC, ETH, SOL, USDT, XRP, ADA using Merkle tree proofs', date: 'Oct 22, 2025', category: 'Partnership' },
  { event: 'Kraken strategic partnership for USDC/EURC expansion, increased liquidity, reduced conversion fees', date: 'Sep 17, 2025', category: 'Partnership' },
  { event: 'Kraken launched xStocks tokenized equities on Ethereum, Solana, BNB Chain, TRON', date: 'Sep 2, 2025', category: 'Expansion' },
  { event: 'Kraken MiCA license fully activated across all 30 EEA countries (enables EURC distribution)', date: 'Aug 12, 2025', category: 'Expansion' },
  { event: 'Follow-on offering: 10M shares @ $130.00 ($1.3B total)', date: 'Aug 18, 2025', category: 'Capital' },
  { event: 'Arc Layer-1 blockchain launched on testnet', date: 'Aug 2025', category: 'Product' },
  { event: 'Adam Selipsky (ex-AWS CEO) appointed to Board', date: 'Jul 21, 2025', category: 'Governance' },
  { event: 'FIS partnership for USDC payments via Money Movement Hub', date: 'Jul 2025', category: 'Partnership' },
  { event: 'Circle Gateway launched on testnet (crosschain USDC)', date: 'Jul 2025', category: 'Product' },
  { event: 'IPO completed: 39.1M shares @ $31.00 on NYSE', date: 'Jun 6, 2025', category: 'Capital' },
  { event: 'GENIUS Act passed in U.S. (federal stablecoin framework)', date: 'May 2025', category: 'Regulatory' },
  { event: 'ADGM (Abu Dhabi) In-Principle Approval received', date: 'Apr 29, 2025', category: 'Regulatory' },
  { event: 'Circle Payments Network (CPN) announced with Santander, Deutsche Bank, SocGen, StanChart', date: 'Apr 21, 2025', category: 'Product' },
  { event: 'ICE (NYSE parent) MOU for USDC/USYC product development', date: 'Mar 27, 2025', category: 'Partnership' },
  { event: 'USDC launched in Japan via SBI VC Trade (first global dollar stablecoin in Japan)', date: 'Mar 26, 2025', category: 'Expansion' },
  { event: 'DRW/Cumberland strategic partnership for institutional USDC/USYC liquidity', date: 'Jan 21, 2025', category: 'Partnership' },
  { event: 'Hashnote acquired ($100M) - added USYC tokenized money market fund', date: 'Jan 2025', category: 'Acquisition' },

  // === 2024 ===
  { event: 'Binance strategic partnership for 240M users', date: 'Dec 11, 2024', category: 'Partnership' },
  { event: 'MiCAR compliance achieved via French EMI license (USDC + EURC)', date: 'Jul 2024', category: 'Regulatory' },
  { event: 'Circle launched in Brazil with BTG Pactual and Nubank', date: 'May 29, 2024', category: 'Expansion' },
  { event: 'BlackRock BUIDL smart contract for USDC transfers', date: 'Apr 11, 2024', category: 'Partnership' },
  { event: 'Confidential S-1 draft submitted to SEC', date: 'Jan 11, 2024', category: 'Capital' },

  // === Earlier ===
  { event: 'Centre Consortium dissolved; Coinbase takes equity stake in Circle', date: 'Aug 21, 2023', category: 'Corporate' },
  { event: 'Cross-Chain Transfer Protocol (CCTP) mainnet launch', date: 'Apr 26, 2023', category: 'Product' },
  { event: '$400M funding round (BlackRock, Fidelity, Marshall Wace)', date: 'Apr 12, 2022', category: 'Capital' },
  { event: 'USDC stablecoin launched via Centre Consortium with Coinbase', date: 'Oct 2018', category: 'Product' },
  { event: 'Circle founded by Jeremy Allaire and Sean Neville', date: '2013', category: 'Corporate' },
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
