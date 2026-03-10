/**
 * CRCL (CIRCLE) - HISTORICAL PRICE DATA
 * ================================================
 *
 * Historical stock prices for backtesting and analysis.
 *
 * DATA SOURCES:
 * - Yahoo Finance / NYSE historical data
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: Monthly (add new month's data)
 *
 * AI AGENT INSTRUCTIONS:
 * When adding new month's data:
 * 1. Get closing price from Yahoo Finance or NYSE
 * 2. Add to the appropriate year array
 * 3. Create new year array when calendar year changes
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const HISTORICAL_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from Yahoo Finance',
  nextExpectedUpdate: 'Monthly',
  notes: 'Monthly closing prices (post-IPO)',
};

// ============================================================================
// HISTORICAL STOCK PRICES BY YEAR
// ============================================================================

export const HISTORICAL_PRICES: Record<string, (number | null)[]> = {};
