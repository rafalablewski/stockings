/**
 * CRCL (CIRCLE) - USDC STABLECOIN DATA
 * ================================================
 *
 * USDC circulation, reserves, market share, and ecosystem data.
 * This is CRCL's core product — the leading regulated digital dollar stablecoin.
 *
 * DATA SOURCES:
 * - Circle Transparency Reports
 * - DeFi Llama / CoinGecko stablecoin trackers
 * - 10-Q/10-K filings (reserve composition)
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: Monthly (transparency reports) or quarterly (10-Q)
 *
 * AI AGENT INSTRUCTIONS:
 * 1. Update USDC_CIRCULATION from monthly transparency reports
 * 2. Update USDC_RESERVES after quarterly 10-Q attestation
 * 3. Track USDC_MARKET_SHARE vs USDT and other stablecoins
 * 4. Add chain-level breakdown when available
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const USDC_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from Circle transparency reports',
  nextExpectedUpdate: 'Monthly',
  notes: 'USDC is Circle\'s core product — tracks circulation, reserves, and market share',
};

// ============================================================================
// USDC CIRCULATION (monthly snapshots, newest first)
// ============================================================================

export const USDC_CIRCULATION: Array<{
  date: string;
  totalCirculation: number;
  chains: Record<string, number>;
}> = [];

// ============================================================================
// USDC RESERVES (quarterly attestation)
// ============================================================================

export const USDC_RESERVES: Array<{
  date: string;
  totalReserves: number;
  composition: Record<string, number>;
  attestor: string;
}> = [];

// ============================================================================
// USDC MARKET SHARE
// ============================================================================

export const USDC_MARKET_SHARE: Array<{
  date: string;
  usdcCirculation: number;
  usdtCirculation: number;
  totalStablecoinMarket: number;
  usdcSharePct: number;
}> = [];
