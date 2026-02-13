// @ts-nocheck
/**
 * CRCL Analyst Coverage Data
 * Extracted from CRCL.tsx for maintainability.
 * Add new reports at the TOP of each firm's reports array (newest first).
 * NEVER delete historical reports — this is an audit trail.
 */

import type { AnalystCoverage } from '@/components/shared/wallStreetTypes';

export const CRCL_ANALYST_COVERAGE: AnalystCoverage[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EXAMPLE RESEARCH - Placeholder (Replace with actual coverage when available)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Example Research',
    analyst: 'Analyst Name',
    coverageSince: 'December 2025',
    currentPT: 40,
    currentRating: 'Buy',
    currentRatingNormalized: 'bullish',
    reports: [
      // === Dec 1, 2025 - Example Initiation (PLACEHOLDER) ===
      {
        date: '2025-12-01',
        action: 'Initiation',
        priceTarget: 40,
        previousTarget: null,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'Circle Internet Group - Initiation of Coverage (Example)',
        source: 'Example Source',
        isFullReport: true,
        thesis: 'Placeholder entry - replace with actual analyst reports as they become available. Circle is well-positioned to benefit from stablecoin adoption and regulatory clarity.',
        reportSummary: `**PLACEHOLDER REPORT**
This is an example entry demonstrating the Wall Street coverage format. Replace with actual analyst reports when available.

**VALUATION**
Example methodology: P/S Multiple on forward revenue estimates.

**KEY DRIVERS**
USDC market share growth, reserve yield optimization, GENIUS Act implementation, international expansion.`,
        assumptions: [
          { label: 'USDC Market Share', value: '30%' },
          { label: 'Revenue Multiple', value: '8x' },
        ],
        catalysts: [
          'IPO lockup expiry',
          'GENIUS Act implementation',
          'International expansion',
          'New banking partnerships',
        ],
        risks: [
          'Stablecoin competition from Tether',
          'Regulatory uncertainty',
          'Interest rate compression',
          'Crypto market volatility',
        ],
        methodology: 'P/S Multiple on 2026E Revenue',
        fullNotes: `EXAMPLE NOTES:
This is placeholder content. Replace with actual analyst report details when coverage begins.

Source: Example Research`
      },
    ]
  },
];
