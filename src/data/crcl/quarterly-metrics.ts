/**
 * CRCL (CIRCLE) - QUARTERLY METRICS
 * ================================================
 *
 * KPI metrics per quarter for charts and dashboards.
 *
 * DATA SOURCES:
 * - 10-Q/10-K filings
 * - USDC transparency reports
 * - Quarterly business updates
 *
 * LAST UPDATED: 2026-03-10
 * NEXT UPDATE: After next quarterly filing
 *
 * AI AGENT INSTRUCTIONS:
 * When updating from new 10-Q or 10-K:
 * 1. Add new quarter entry at the BEGINNING (newest first)
 * 2. Include USDC circulation metrics alongside financials
 * 3. Mark pending fields as null until filing available
 */

import type { DataMetadata } from '../shared/types';

// ============================================================================
// METADATA
// ============================================================================

export const QUARTERLY_METRICS_METADATA: DataMetadata = {
  lastUpdated: '2026-03-10',
  source: 'Initial scaffold — populate from 10-Q/10-K',
  nextExpectedUpdate: 'After next quarterly filing',
};

// ============================================================================
// QUARTERLY METRICS (newest first)
// ============================================================================

export const CRCL_QUARTERLY_DATA: Array<Record<string, unknown>> = [];

export const CRCL_MARKET_CAP_DATA: Array<Record<string, unknown>> = [];
