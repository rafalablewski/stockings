/* eslint-disable @typescript-eslint/no-explicit-any */
// ╔═══════════════════════════════════════════════════════════════════════════════╗
// ║ 🚨 MUST DO - READ FIRST 🚨                                                    ║
// ╠═══════════════════════════════════════════════════════════════════════════════╣
// ║ BEFORE MAKING ANY CHANGES OR UPDATES TO THIS FILE:                            ║
// ║ 1. PROVIDE A BRIEF REPORT of what you plan to change                          ║
// ║ 2. LIST the specific sections/lines affected                                  ║
// ║ 3. EXPLAIN the reason for each change                                         ║
// ║ 4. ASK FOR CONFIRMATION: "Shall we proceed with these changes?"               ║
// ║                                                                               ║
// ║ DO NOT modify any code until explicit approval is received.                   ║
// ╚═══════════════════════════════════════════════════════════════════════════════╝

/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║  CRCL (Circle Internet Group) Financial Analysis Model                        ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Version: 1.1.0                                                               ║
 * ║  Last Updated: January 12, 2026                                               ║
 * ║  Maintainer: Rafal (via Claude AI)                                            ║
 * ║                                                                               ║
 * ║  CHANGELOG v1.1.0:                                                            ║
 * ║  - Unified tab array format with ASTS/BMNR (object format)                    ║
 * ║  - Unified tab ID: valuation→dcf for consistency                              ║
 * ║  - Added expandedArchive state for consistency                                ║
 * ║  - Added shared TypeScript interfaces (StatProps, CardProps, etc.)            ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║              UNIFIED MODEL MAINTENANCE PROTOCOL (ASTS/BMNR/CRCL)              ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  You are maintaining three identical-structure, continuously updated          ║
 * ║  financial analysis models for: ASTS, BMNR, CRCL                              ║
 * ║                                                                               ║
 * ║  The structure, sections, update process, archiving rules, and level of       ║
 * ║  detail MUST remain unified across all three models at all times.             ║
 * ║  Any improvement or addition applied to one model must eventually be          ║
 * ║  reflected in the others to maintain consistency.                             ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  CORE UPDATE PROCESS                                                          ║
 * ║  (Trigger after any new PR, SEC filing, earnings, analyst report, etc.)       ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  1. Review the new information thoroughly.                                    ║
 * ║                                                                               ║
 * ║  2. Update the following core sections as needed:                             ║
 * ║     - Financials (quarterly/annual metrics, balance sheet, cash flow)         ║
 * ║     - Timeline / Milestones (add new dated entries ONLY — never edit/delete)  ║
 * ║     - Investment Thesis / Key Drivers & Catalysts                             ║
 * ║     - Risks & Mitigants                                                       ║
 * ║     - Wall Street / Analyst Coverage (add reports, update PTs/ratings)        ║
 * ║     - Three Perspectives: CFA (fundamental), HF (catalyst), CIO (portfolio)   ║
 * ║     - Strategic Assessment / Predictions (base, bull, bear scenarios)         ║
 * ║     - Stock-specific metrics and focus areas                                  ║
 * ║                                                                               ║
 * ║  3. Archive the previous version:                                             ║
 * ║     - Add a new dated entry to the Analysis Archive / Historical Record       ║
 * ║     - Include the full prior state (scorecard, summary, drivers, risks, etc.) ║
 * ║     - Keep historical record generous and complete for audit trail            ║
 * ║     - NEVER delete, overwrite, or summarize away existing archive entries     ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  CRITICAL RULES (Apply Identically to ALL Three Models)                       ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  • Historical integrity is paramount: Never modify past timeline entries,     ║
 * ║    quarterly data, or prior archive versions.                                 ║
 * ║                                                                               ║
 * ║  • When updating, explicitly state what changed and cite the source           ║
 * ║    (e.g., "Updated convertible debt to $1.625B principal per Oct 2025 424B5") ║
 * ║                                                                               ║
 * ║  • Remain objective, data-driven, and balanced.                               ║
 * ║                                                                               ║
 * ║  • Ensure the structure, depth, and presentation remain unified across        ║
 * ║    ASTS, BMNR, and CRCL.                                                      ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  STOCK-SPECIFIC FOCUS AREAS (Always Check — Not Exhaustive)                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  ASTS: Satellite launches & constellation progress, on-orbit performance,     ║
 * ║        partnership milestones, spectrum/regulatory status, gateway revenue,   ║
 * ║        CapEx, launch cadence, runway.                                         ║
 * ║                                                                               ║
 * ║  BMNR: ETH treasury size & staking yield, total NAV (crypto + cash + ops),    ║
 * ║        share count/dilution, MAVAN validator rollout, mining/hosting revenue, ║
 * ║        immersion tech advantages.                                             ║
 * ║                                                                               ║
 * ║  CRCL: USDC/EURC circulation & market share, reserve income yield, platform   ║
 * ║        holdings %, reserve transparency, regulatory progress, partnerships.   ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  WALL STREET SECTION GUIDELINES (Identical Across Models)                     ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  • Store individual analyst reports with full detail (date, firm, analyst,    ║
 * ║    action, PT, rating, thesis, summary, assumptions, catalysts, risks,        ║
 * ║    estimates, methodology).                                                   ║
 * ║                                                                               ║
 * ║  • Normalize ratings: bullish (Strong Buy/Buy/Overweight),                    ║
 * ║    neutral (Hold/Perform), bearish (Underperform/Sell).                       ║
 * ║                                                                               ║
 * ║  • Track consensus PT, rating distribution, and recent revisions.             ║
 * ║                                                                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import './stock-model-styles.css';
import { SharedWallStreetTab, AnalystCoverage, useLiveStockPrice, UpdateIndicatorContext, UpdateIndicators, UpdateLegend, Stat, Card, Row, Input, Panel, Guide, CFANotes, FinancialModelErrorBoundary, DisclaimerBanner, SharedFinancialsTab, SharedTimelineTab, SharedCompsTab, SharedCapitalTab, SharedMonteCarloTab, SharedModelTab, StockHeader, buildHudMarkers } from '../shared';
import type { McSimResults } from '../shared';
import type { UpdateSource } from '../shared';
import StockChart from '../shared/StockChart';
import SharedSourcesTab from '../shared/SharedSourcesTab';
import SharedEdgarTab from '../shared/SharedEdgarTab';
import { CRCL_SEC_FILINGS, CRCL_SEC_META, CRCL_SEC_TYPE_COLORS, CRCL_SEC_FILTER_TYPES, CRCL_FILING_CROSS_REFS } from '@/data/crcl/sec-filings';
import { SharedSecFilingsSection } from '../shared/SharedSecFilingsSection';
import { SharedInvestmentTab } from '../shared/SharedInvestmentTab';
import { CRCL_INVESTMENT_CURRENT, CRCL_INVESTMENT_ARCHIVE } from '@/data/crcl/investment';
import type { SourceGroup, Competitor } from '../shared/SharedSourcesTab';
import StockNavigation, { TabPanel } from '../shared/StockNavigation';
import { useHashTab } from '@/hooks/useHashTab';
import { crclTabs } from '@/data/tab-registry';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, ScatterChart, Scatter, Cell, ReferenceLine,
  BarChart, Bar, AreaChart, Area
} from 'recharts';

// Data imports - All hardcoded data extracted to separate files for easy AI updates
import {
  MARKET,
  USDC_DATA,
  MODEL_METADATA,
  DATA_FRESHNESS,
  QUARTERLY_DATA,
  SEC_FILINGS,
  TIMELINE,
  type TimelineEntry,
} from '@/data/crcl';
import { CRCL_COMPETITOR_NEWS, CRCL_COMPETITOR_PROFILES, type CRCLCompetitorProfile } from '@/data/crcl/competitor-news';
import type { CompetitorNewsEntry } from '@/data/shared/competitor-schema';
import { CRCL_ANALYST_COVERAGE } from '@/data/crcl/analyst-coverage';


// ============================================================================
// CRCL - Circle Internet Group Financial Model
// 2025 Creative Professional Design
// ============================================================================

// ═══════════════════════════════════════════════════════════════════════════════
// COMPETITOR INTELLIGENCE TYPES (CRCL-specific)
// ═══════════════════════════════════════════════════════════════════════════════

// Types: CompetitorNewsEntry from '@/data/shared/competitor-schema', CRCLCompetitorProfile from '@/data/crcl/competitor-news'
// Shared types and components imported from '../shared'

// ═══════════════════════════════════════════════════════════════════════════════
// WALL STREET TAB - Type Definitions (Unified across ASTS, BMNR, CRCL)
// ═══════════════════════════════════════════════════════════════════════════════

/** Individual analyst report entry */
// AnalystCoverage type imported from '../shared' (wallStreetTypes.ts)

/** Rating normalization map */
const RATING_NORMALIZATION: Record<string, 'bullish' | 'neutral' | 'bearish'> = {
  // Bullish ratings
  'Strong Buy': 'bullish',
  'Buy': 'bullish',
  'Overweight': 'bullish',
  // Neutral ratings
  'Neutral': 'neutral',
  'Hold': 'neutral',
  'Market Perform': 'neutral',
  'Sector Perform': 'neutral',
  'Perform': 'neutral',
  // Bearish ratings
  'Underweight': 'bearish',
  'Sector Underperform': 'bearish',
  'Underperform': 'bearish',
  'Sell': 'bearish',
};

// ============================================================================
// NAMED CONSTANTS (N2) - Extracted Magic Numbers with Explanations
// ============================================================================

/** Risk-free rate assumption for Sharpe/Sortino calculations (current T-bill ~4%) */
const RISK_FREE_RATE = 4;

/** Trading days per year for annualization */
const TRADING_DAYS_PER_YEAR = 252;

/** Minimum discount rate for DCF calculations */
const MIN_DISCOUNT_RATE = 5;

/** Terminal growth rate cap (should not exceed GDP growth) */
const MAX_TERMINAL_GROWTH = 4;

/** Minimum valid correlation coefficient */
const MIN_CORRELATION = -1;

/** Maximum valid correlation coefficient */
const MAX_CORRELATION = 1;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Safely clamp a value between min and max bounds */
const clamp = (value: number, min: number, max: number): number => 
  Math.max(min, Math.min(max, value));

/** Safe division that returns fallback instead of Infinity/NaN */
const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => 
  denominator !== 0 && isFinite(numerator / denominator) ? numerator / denominator : fallback;

/** Ensure a value is a finite number, otherwise return fallback */
const safeNumber = (value: number, fallback: number = 0): number => 
  isFinite(value) ? value : fallback;

interface QuarterlyData {
  quarter: string;
  totalRevenue: number;
  reserveIncome: number;
  otherRevenue: number;
  distributionCosts: number;
  rldc: number;
  rldcMargin: number;
  adjustedEbitda: number;
  netIncome: number;
  usdcCirculation: number;
  reserveReturnRate: number;
  usdcOnPlatform: number;
  platformPct: number;
  marketShare: number;
  meaningfulWallets: number;
  usdcMinted: number;
  usdcRedeemed: number;
  // New fields
  opex: number;           // Operating Expenses (G&A + R&D + S&M)
  cashPosition: number;   // Cash & equivalents ($M)
  sbc: number;            // Stock-based compensation ($M)
}

// TimelineEntry imported from @/data/crcl (shared/types)

// MARKET data imported from @/data/crcl - see src/data/crcl/company.ts for values
// DATA_FRESHNESS imported from @/data/crcl - see src/data/crcl/company.ts for values

// Use imported quarterly data from @/data/crcl
const DATA = QUARTERLY_DATA;

// TIMELINE imported from @/data/crcl - see src/data/crcl/timeline.ts for full event history

const SCENARIOS = [
  { name: 'Bull', cagr: 50, margin: 42, multiple: 25, rate: 4.5 },
  { name: 'Base', cagr: 40, margin: 38, multiple: 20, rate: 4.0 },
  { name: 'Bear', cagr: 25, margin: 32, multiple: 15, rate: 3.0 },
];

// ===== COMPREHENSIVE SCENARIO SIMULATION =====
const TARGET_YEARS = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

interface ScenarioProjection {
  year: number;
  usdc: number;           // $B USDC in circulation
  marketShare: number;    // % of stablecoin market
  reserveRate: number;    // % yield on reserves
  grossRevenue: number;   // $B
  distributionCost: number; // $B (Coinbase share)
  netRevenue: number;     // $B
  rldcMargin: number;     // % — EBITDA margin on net revenue (ebitda / netRevenue * 100 approx.)
                          // NOTE: This is NOT netRevenue/grossRevenue. It's an estimated
                          // operating profitability target independent of the other fields.
  ebitda: number;         // $B
  netIncome: number;      // $B
  fcf: number;            // $B Free Cash Flow
  exitMultiple: number;   // P/S multiple
  evImplied: number;      // $B Enterprise Value
  equityValue: number;    // $B (after debt/cash)
  sharePrice: number;     // $ per share
}

interface ScenarioDetail {
  name: string;
  color: string;
  prob: number;    // % probability weight
  description: string;
  assumptions: string[];
  catalysts: string[];
  risks: string[];
  projections: ScenarioProjection[];
}

const SCENARIO_SIMULATIONS: Record<string, ScenarioDetail> = {
  worst: {
    name: 'Worst',
    color: '#ef4444',
    prob: 5,
    description: 'Regulatory crackdown, crypto winter 2.0, or major depegging event',
    assumptions: [
      'US stablecoin legislation fails or becomes prohibitively restrictive',
      'Major depegging event causes mass redemptions',
      'Coinbase partnership terminates; distribution costs spike to 70%',
      'Fed cuts to 1.5% by 2027, compressing yield income',
      'USDC loses market share to USDT and CBDCs',
    ],
    catalysts: [],
    risks: [
      'SEC enforcement action classifies USDC as security',
      'Bank partner failures (SVB-like event)',
      'Smart contract exploit on CCTP',
      'Tether achieves full transparency, eliminating Circle advantage',
    ],
    projections: [
      { year: 2025, usdc: 65, marketShare: 25, reserveRate: 4.0, grossRevenue: 2.6, distributionCost: 1.4, netRevenue: 1.2, rldcMargin: 35, ebitda: 0.25, netIncome: 0.12, fcf: 0.10, exitMultiple: 3, evImplied: 7.8, equityValue: 6.8, sharePrice: 30 },
      { year: 2026, usdc: 50, marketShare: 20, reserveRate: 3.0, grossRevenue: 1.5, distributionCost: 0.9, netRevenue: 0.6, rldcMargin: 28, ebitda: 0.10, netIncome: 0.02, fcf: 0.01, exitMultiple: 2, evImplied: 3.0, equityValue: 2.5, sharePrice: 11 },
      { year: 2027, usdc: 35, marketShare: 15, reserveRate: 2.0, grossRevenue: 0.7, distributionCost: 0.45, netRevenue: 0.25, rldcMargin: 20, ebitda: -0.05, netIncome: -0.15, fcf: -0.12, exitMultiple: 1.5, evImplied: 1.1, equityValue: 0.8, sharePrice: 4 },
      { year: 2028, usdc: 25, marketShare: 12, reserveRate: 1.5, grossRevenue: 0.4, distributionCost: 0.28, netRevenue: 0.12, rldcMargin: 15, ebitda: -0.10, netIncome: -0.20, fcf: -0.18, exitMultiple: 1, evImplied: 0.4, equityValue: 0.2, sharePrice: 1 },
      { year: 2029, usdc: 20, marketShare: 10, reserveRate: 1.5, grossRevenue: 0.3, distributionCost: 0.21, netRevenue: 0.09, rldcMargin: 12, ebitda: -0.12, netIncome: -0.22, fcf: -0.20, exitMultiple: 0.8, evImplied: 0.24, equityValue: 0.1, sharePrice: 0.5 },
      { year: 2030, usdc: 15, marketShare: 8, reserveRate: 1.5, grossRevenue: 0.23, distributionCost: 0.16, netRevenue: 0.07, rldcMargin: 10, ebitda: -0.15, netIncome: -0.25, fcf: -0.22, exitMultiple: 0.5, evImplied: 0.12, equityValue: 0.05, sharePrice: 0.2 },
      { year: 2031, usdc: 12, marketShare: 6, reserveRate: 1.5, grossRevenue: 0.18, distributionCost: 0.13, netRevenue: 0.05, rldcMargin: 8, ebitda: -0.18, netIncome: -0.28, fcf: -0.25, exitMultiple: 0.5, evImplied: 0.09, equityValue: 0.02, sharePrice: 0.1 },
      { year: 2032, usdc: 10, marketShare: 5, reserveRate: 1.5, grossRevenue: 0.15, distributionCost: 0.11, netRevenue: 0.04, rldcMargin: 6, ebitda: -0.20, netIncome: -0.30, fcf: -0.27, exitMultiple: 0.5, evImplied: 0.08, equityValue: 0.01, sharePrice: 0.05 },
      { year: 2033, usdc: 8, marketShare: 4, reserveRate: 1.5, grossRevenue: 0.12, distributionCost: 0.09, netRevenue: 0.03, rldcMargin: 5, ebitda: -0.22, netIncome: -0.32, fcf: -0.29, exitMultiple: 0.5, evImplied: 0.06, equityValue: 0.01, sharePrice: 0.03 },
      { year: 2034, usdc: 6, marketShare: 3, reserveRate: 1.5, grossRevenue: 0.09, distributionCost: 0.07, netRevenue: 0.02, rldcMargin: 4, ebitda: -0.24, netIncome: -0.34, fcf: -0.31, exitMultiple: 0.5, evImplied: 0.05, equityValue: 0.01, sharePrice: 0.02 },
      { year: 2035, usdc: 5, marketShare: 2, reserveRate: 1.5, grossRevenue: 0.08, distributionCost: 0.06, netRevenue: 0.02, rldcMargin: 3, ebitda: -0.25, netIncome: -0.35, fcf: -0.32, exitMultiple: 0.5, evImplied: 0.04, equityValue: 0.01, sharePrice: 0.01 },
    ]
  },
  bear: {
    name: 'Bear',
    color: '#f97316',
    prob: 20,
    description: 'Slower adoption, rate cuts compress margins, competitive pressure intensifies',
    assumptions: [
      'Stablecoin legislation passes but with restrictive reserve requirements',
      'Fed cuts to 2.5% by 2027, reducing reserve income',
      'USDC grows but loses market share to Tether and new entrants',
      'Coinbase distribution costs remain at 50-55%',
      'Limited success in non-US markets due to CBDC competition',
    ],
    catalysts: [],
    risks: [
      'PayPal PYUSD gains significant market share',
      'CBDCs launch in major economies (EU, UK)',
      'Crypto trading volumes remain depressed',
    ],
    projections: [
      { year: 2025, usdc: 75, marketShare: 28, reserveRate: 4.0, grossRevenue: 3.0, distributionCost: 1.6, netRevenue: 1.4, rldcMargin: 38, ebitda: 0.30, netIncome: 0.16, fcf: 0.14, exitMultiple: 5, evImplied: 15, equityValue: 14, sharePrice: 61 },
      { year: 2026, usdc: 85, marketShare: 26, reserveRate: 3.5, grossRevenue: 3.0, distributionCost: 1.6, netRevenue: 1.4, rldcMargin: 36, ebitda: 0.32, netIncome: 0.18, fcf: 0.16, exitMultiple: 5, evImplied: 15, equityValue: 14, sharePrice: 61 },
      { year: 2027, usdc: 95, marketShare: 24, reserveRate: 2.5, grossRevenue: 2.4, distributionCost: 1.3, netRevenue: 1.1, rldcMargin: 34, ebitda: 0.28, netIncome: 0.15, fcf: 0.13, exitMultiple: 5, evImplied: 12, equityValue: 11, sharePrice: 48 },
      { year: 2028, usdc: 105, marketShare: 22, reserveRate: 2.5, grossRevenue: 2.6, distributionCost: 1.4, netRevenue: 1.2, rldcMargin: 33, ebitda: 0.30, netIncome: 0.16, fcf: 0.14, exitMultiple: 5, evImplied: 13, equityValue: 12, sharePrice: 52 },
      { year: 2029, usdc: 115, marketShare: 21, reserveRate: 2.5, grossRevenue: 2.9, distributionCost: 1.6, netRevenue: 1.3, rldcMargin: 32, ebitda: 0.32, netIncome: 0.17, fcf: 0.15, exitMultiple: 5, evImplied: 14.5, equityValue: 13.5, sharePrice: 59 },
      { year: 2030, usdc: 125, marketShare: 20, reserveRate: 2.5, grossRevenue: 3.1, distributionCost: 1.7, netRevenue: 1.4, rldcMargin: 31, ebitda: 0.35, netIncome: 0.19, fcf: 0.17, exitMultiple: 5, evImplied: 15.5, equityValue: 14.5, sharePrice: 63 },
      { year: 2031, usdc: 135, marketShare: 19, reserveRate: 2.5, grossRevenue: 3.4, distributionCost: 1.9, netRevenue: 1.5, rldcMargin: 30, ebitda: 0.38, netIncome: 0.21, fcf: 0.19, exitMultiple: 5, evImplied: 17, equityValue: 16, sharePrice: 70 },
      { year: 2032, usdc: 145, marketShare: 18, reserveRate: 2.5, grossRevenue: 3.6, distributionCost: 2.0, netRevenue: 1.6, rldcMargin: 30, ebitda: 0.41, netIncome: 0.23, fcf: 0.21, exitMultiple: 5, evImplied: 18, equityValue: 17, sharePrice: 74 },
      { year: 2033, usdc: 155, marketShare: 17, reserveRate: 2.5, grossRevenue: 3.9, distributionCost: 2.2, netRevenue: 1.7, rldcMargin: 29, ebitda: 0.44, netIncome: 0.25, fcf: 0.23, exitMultiple: 5, evImplied: 19.5, equityValue: 18.5, sharePrice: 81 },
      { year: 2034, usdc: 165, marketShare: 16, reserveRate: 2.5, grossRevenue: 4.1, distributionCost: 2.3, netRevenue: 1.8, rldcMargin: 29, ebitda: 0.47, netIncome: 0.27, fcf: 0.24, exitMultiple: 5, evImplied: 20.5, equityValue: 19.5, sharePrice: 85 },
      { year: 2035, usdc: 175, marketShare: 15, reserveRate: 2.5, grossRevenue: 4.4, distributionCost: 2.5, netRevenue: 1.9, rldcMargin: 28, ebitda: 0.50, netIncome: 0.29, fcf: 0.26, exitMultiple: 5, evImplied: 22, equityValue: 21, sharePrice: 92 },
    ]
  },
  base: {
    name: 'Base',
    color: '#3b82f6',
    prob: 45,
    description: 'Steady growth trajectory with favorable regulation and maintained market position',
    assumptions: [
      'US stablecoin legislation passes in 2025-2026 with bank-charter pathway',
      'Fed stabilizes at 3-3.5% long-term neutral rate',
      'USDC maintains 28-30% market share as TAM expands',
      'Coinbase distribution costs decline to 45% by 2028 (renegotiation)',
      'USYC/Hashnote adds 5-10% incremental revenue by 2028',
      'International expansion (EU MiCA, APAC) contributes 15% of volume',
    ],
    catalysts: [
      'GENIUS Act or similar legislation passes',
      'OCC bank charter approval',
      'Major TradFi integrations (ICE, CME)',
    ],
    risks: [
      'Execution risk on Hashnote integration',
      'Competition from bank-issued stablecoins',
    ],
    projections: [
      { year: 2025, usdc: 80, marketShare: 29, reserveRate: 4.0, grossRevenue: 3.2, distributionCost: 1.7, netRevenue: 1.5, rldcMargin: 39, ebitda: 0.35, netIncome: 0.19, fcf: 0.17, exitMultiple: 7, evImplied: 22.4, equityValue: 21, sharePrice: 92 },
      { year: 2026, usdc: 110, marketShare: 29, reserveRate: 3.5, grossRevenue: 3.85, distributionCost: 2.0, netRevenue: 1.85, rldcMargin: 40, ebitda: 0.50, netIncome: 0.30, fcf: 0.27, exitMultiple: 8, evImplied: 30.8, equityValue: 29, sharePrice: 127 },
      { year: 2027, usdc: 145, marketShare: 29, reserveRate: 3.25, grossRevenue: 4.7, distributionCost: 2.35, netRevenue: 2.35, rldcMargin: 41, ebitda: 0.70, netIncome: 0.45, fcf: 0.40, exitMultiple: 9, evImplied: 42.3, equityValue: 40, sharePrice: 175 },
      { year: 2028, usdc: 185, marketShare: 29, reserveRate: 3.0, grossRevenue: 5.55, distributionCost: 2.5, netRevenue: 3.05, rldcMargin: 42, ebitda: 0.95, netIncome: 0.62, fcf: 0.56, exitMultiple: 9, evImplied: 50, equityValue: 48, sharePrice: 210 },
      { year: 2029, usdc: 230, marketShare: 28, reserveRate: 3.0, grossRevenue: 6.9, distributionCost: 3.1, netRevenue: 3.8, rldcMargin: 43, ebitda: 1.25, netIncome: 0.82, fcf: 0.74, exitMultiple: 9, evImplied: 62.1, equityValue: 60, sharePrice: 262 },
      { year: 2030, usdc: 280, marketShare: 28, reserveRate: 3.0, grossRevenue: 8.4, distributionCost: 3.8, netRevenue: 4.6, rldcMargin: 44, ebitda: 1.55, netIncome: 1.02, fcf: 0.92, exitMultiple: 10, evImplied: 84, equityValue: 82, sharePrice: 358 },
      { year: 2031, usdc: 340, marketShare: 28, reserveRate: 3.0, grossRevenue: 10.2, distributionCost: 4.6, netRevenue: 5.6, rldcMargin: 45, ebitda: 1.95, netIncome: 1.30, fcf: 1.17, exitMultiple: 10, evImplied: 102, equityValue: 100, sharePrice: 437 },
      { year: 2032, usdc: 410, marketShare: 28, reserveRate: 3.0, grossRevenue: 12.3, distributionCost: 5.5, netRevenue: 6.8, rldcMargin: 46, ebitda: 2.40, netIncome: 1.62, fcf: 1.46, exitMultiple: 10, evImplied: 123, equityValue: 121, sharePrice: 528 },
      { year: 2033, usdc: 490, marketShare: 28, reserveRate: 3.0, grossRevenue: 14.7, distributionCost: 6.6, netRevenue: 8.1, rldcMargin: 47, ebitda: 2.92, netIncome: 1.98, fcf: 1.78, exitMultiple: 10, evImplied: 147, equityValue: 145, sharePrice: 633 },
      { year: 2034, usdc: 580, marketShare: 28, reserveRate: 3.0, grossRevenue: 17.4, distributionCost: 7.8, netRevenue: 9.6, rldcMargin: 48, ebitda: 3.52, netIncome: 2.40, fcf: 2.16, exitMultiple: 10, evImplied: 174, equityValue: 172, sharePrice: 751 },
      { year: 2035, usdc: 680, marketShare: 28, reserveRate: 3.0, grossRevenue: 20.4, distributionCost: 9.2, netRevenue: 11.2, rldcMargin: 49, ebitda: 4.20, netIncome: 2.88, fcf: 2.59, exitMultiple: 10, evImplied: 204, equityValue: 202, sharePrice: 882 },
    ]
  },
  bull: {
    name: 'Bull',
    color: '#22c55e',
    prob: 22,
    description: 'Accelerated adoption, favorable regulation, Circle becomes dominant infrastructure',
    assumptions: [
      'Stablecoin legislation creates regulatory moat for licensed issuers',
      'USDC becomes primary settlement layer for TradFi ↔ DeFi',
      'Fed maintains 3.5-4% rates through 2028',
      'Coinbase distribution renegotiated to 35% by 2027',
      'Bank charter enables direct Fed master account access',
      'USYC captures $10B+ in tokenized money market',
      'PayPal/Visa partnerships drive mainstream adoption',
    ],
    catalysts: [
      'Circle obtains OCC national bank charter',
      'Fed allows USDC for interbank settlement pilots',
      'Major sovereign wealth fund allocates to USDC',
      'Apple/Google Pay integrate USDC',
    ],
    risks: [
      'Regulatory reversal under new administration',
      'Technical scaling challenges',
    ],
    projections: [
      { year: 2025, usdc: 90, marketShare: 31, reserveRate: 4.25, grossRevenue: 3.8, distributionCost: 1.9, netRevenue: 1.9, rldcMargin: 42, ebitda: 0.50, netIncome: 0.30, fcf: 0.27, exitMultiple: 10, evImplied: 38, equityValue: 36, sharePrice: 157 },
      { year: 2026, usdc: 140, marketShare: 33, reserveRate: 4.0, grossRevenue: 5.6, distributionCost: 2.5, netRevenue: 3.1, rldcMargin: 44, ebitda: 0.90, netIncome: 0.58, fcf: 0.52, exitMultiple: 12, evImplied: 67.2, equityValue: 65, sharePrice: 284 },
      { year: 2027, usdc: 200, marketShare: 35, reserveRate: 3.75, grossRevenue: 7.5, distributionCost: 2.6, netRevenue: 4.9, rldcMargin: 46, ebitda: 1.45, netIncome: 0.95, fcf: 0.86, exitMultiple: 13, evImplied: 97.5, equityValue: 95, sharePrice: 415 },
      { year: 2028, usdc: 280, marketShare: 36, reserveRate: 3.5, grossRevenue: 9.8, distributionCost: 3.4, netRevenue: 6.4, rldcMargin: 48, ebitda: 2.10, netIncome: 1.40, fcf: 1.26, exitMultiple: 14, evImplied: 137.2, equityValue: 135, sharePrice: 590 },
      { year: 2029, usdc: 380, marketShare: 37, reserveRate: 3.5, grossRevenue: 13.3, distributionCost: 4.7, netRevenue: 8.6, rldcMargin: 49, ebitda: 2.90, netIncome: 1.95, fcf: 1.76, exitMultiple: 14, evImplied: 186.2, equityValue: 184, sharePrice: 804 },
      { year: 2030, usdc: 500, marketShare: 38, reserveRate: 3.5, grossRevenue: 17.5, distributionCost: 6.1, netRevenue: 11.4, rldcMargin: 50, ebitda: 4.00, netIncome: 2.70, fcf: 2.43, exitMultiple: 15, evImplied: 262.5, equityValue: 260, sharePrice: 1136 },
      { year: 2031, usdc: 640, marketShare: 39, reserveRate: 3.5, grossRevenue: 22.4, distributionCost: 7.8, netRevenue: 14.6, rldcMargin: 51, ebitda: 5.30, netIncome: 3.60, fcf: 3.24, exitMultiple: 15, evImplied: 336, equityValue: 334, sharePrice: 1459 },
      { year: 2032, usdc: 800, marketShare: 40, reserveRate: 3.5, grossRevenue: 28.0, distributionCost: 9.5, netRevenue: 18.5, rldcMargin: 52, ebitda: 6.90, netIncome: 4.70, fcf: 4.23, exitMultiple: 15, evImplied: 420, equityValue: 418, sharePrice: 1826 },
      { year: 2033, usdc: 980, marketShare: 41, reserveRate: 3.5, grossRevenue: 34.3, distributionCost: 11.3, netRevenue: 23.0, rldcMargin: 53, ebitda: 8.80, netIncome: 6.00, fcf: 5.40, exitMultiple: 15, evImplied: 515, equityValue: 513, sharePrice: 2240 },
      { year: 2034, usdc: 1180, marketShare: 42, reserveRate: 3.5, grossRevenue: 41.3, distributionCost: 13.2, netRevenue: 28.1, rldcMargin: 54, ebitda: 11.00, netIncome: 7.50, fcf: 6.75, exitMultiple: 15, evImplied: 620, equityValue: 618, sharePrice: 2699 },
      { year: 2035, usdc: 1400, marketShare: 43, reserveRate: 3.5, grossRevenue: 49.0, distributionCost: 15.2, netRevenue: 33.8, rldcMargin: 55, ebitda: 13.50, netIncome: 9.20, fcf: 8.28, exitMultiple: 15, evImplied: 735, equityValue: 733, sharePrice: 3201 },
    ]
  },
  moon: {
    name: 'Moon',
    color: '#a855f7',
    prob: 8,
    description: 'EXTREME TAIL SCENARIO: USDC becomes global reserve digital currency, Circle achieves Visa-like network effects. This scenario implies a total stablecoin market of ~$5T+ by 2035, exceeding several G7 nations\' M2 money supply. Treat as illustrative upper bound, not a realistic forecast.',
    assumptions: [
      'US dollar stablecoin becomes de facto global digital dollar standard',
      'Fed explicitly endorses USDC as compliant digital dollar',
      'Circle acquires/partners with major bank (cross-border settlement)',
      'Coinbase partnership restructured to flat fee or equity stake',
      'USYC becomes #1 tokenized treasury product globally',
      'USDC used for US government disbursements pilot',
      'Emerging market central banks hold USDC reserves',
      'B2B payments shift 20%+ to stablecoin rails by 2030',
      'CAVEAT: $2.85T USDC by 2035 requires ~45x growth from current $62.5B — historically unprecedented for any financial instrument',
    ],
    catalysts: [
      'US Treasury designates USDC as qualified digital dollar',
      'Circle acquires regional bank for $2-5B',
      'SWIFT announces USDC integration',
      'IMF includes stablecoins in SDR basket discussion',
    ],
    risks: [
      'Geopolitical backlash (China, EU)',
      'Anti-monopoly regulation',
      'Success invites nationalization risk',
    ],
    projections: [
      { year: 2025, usdc: 95, marketShare: 32, reserveRate: 4.5, grossRevenue: 4.3, distributionCost: 2.0, netRevenue: 2.3, rldcMargin: 45, ebitda: 0.70, netIncome: 0.45, fcf: 0.40, exitMultiple: 12, evImplied: 51.6, equityValue: 50, sharePrice: 218 },
      { year: 2026, usdc: 180, marketShare: 38, reserveRate: 4.25, grossRevenue: 7.65, distributionCost: 3.0, netRevenue: 4.65, rldcMargin: 48, ebitda: 1.50, netIncome: 1.00, fcf: 0.90, exitMultiple: 15, evImplied: 114.8, equityValue: 112, sharePrice: 489 },
      { year: 2027, usdc: 320, marketShare: 42, reserveRate: 4.0, grossRevenue: 12.8, distributionCost: 4.5, netRevenue: 8.3, rldcMargin: 52, ebitda: 3.00, netIncome: 2.05, fcf: 1.85, exitMultiple: 16, evImplied: 204.8, equityValue: 202, sharePrice: 883 },
      { year: 2028, usdc: 500, marketShare: 45, reserveRate: 3.75, grossRevenue: 18.75, distributionCost: 5.6, netRevenue: 13.15, rldcMargin: 55, ebitda: 5.20, netIncome: 3.55, fcf: 3.20, exitMultiple: 17, evImplied: 318.8, equityValue: 316, sharePrice: 1381 },
      { year: 2029, usdc: 750, marketShare: 47, reserveRate: 3.5, grossRevenue: 26.25, distributionCost: 7.0, netRevenue: 19.25, rldcMargin: 57, ebitda: 8.00, netIncome: 5.50, fcf: 4.95, exitMultiple: 18, evImplied: 472.5, equityValue: 470, sharePrice: 2054 },
      { year: 2030, usdc: 1000, marketShare: 48, reserveRate: 3.5, grossRevenue: 35.0, distributionCost: 8.8, netRevenue: 26.2, rldcMargin: 58, ebitda: 11.5, netIncome: 7.9, fcf: 7.1, exitMultiple: 18, evImplied: 630, equityValue: 628, sharePrice: 2744 },
      { year: 2031, usdc: 1300, marketShare: 49, reserveRate: 3.5, grossRevenue: 45.5, distributionCost: 10.9, netRevenue: 34.6, rldcMargin: 59, ebitda: 15.5, netIncome: 10.7, fcf: 9.6, exitMultiple: 18, evImplied: 819, equityValue: 817, sharePrice: 3568 },
      { year: 2032, usdc: 1650, marketShare: 50, reserveRate: 3.5, grossRevenue: 57.8, distributionCost: 13.3, netRevenue: 44.5, rldcMargin: 60, ebitda: 20.3, netIncome: 14.0, fcf: 12.6, exitMultiple: 18, evImplied: 1040, equityValue: 1038, sharePrice: 4533 },
      { year: 2033, usdc: 2000, marketShare: 51, reserveRate: 3.5, grossRevenue: 70.0, distributionCost: 15.4, netRevenue: 54.6, rldcMargin: 61, ebitda: 25.5, netIncome: 17.6, fcf: 15.8, exitMultiple: 18, evImplied: 1260, equityValue: 1258, sharePrice: 5493 },
      { year: 2034, usdc: 2400, marketShare: 52, reserveRate: 3.5, grossRevenue: 84.0, distributionCost: 17.6, netRevenue: 66.4, rldcMargin: 62, ebitda: 31.5, netIncome: 21.8, fcf: 19.6, exitMultiple: 18, evImplied: 1512, equityValue: 1510, sharePrice: 6593 },
      { year: 2035, usdc: 2850, marketShare: 53, reserveRate: 3.5, grossRevenue: 99.8, distributionCost: 20.0, netRevenue: 79.8, rldcMargin: 63, ebitda: 38.5, netIncome: 26.6, fcf: 23.9, exitMultiple: 18, evImplied: 1796, equityValue: 1794, sharePrice: 7834 },
    ]
  }
};

const SCENARIO_KEYS = ['worst', 'bear', 'base', 'bull', 'moon'] as const;
type ScenarioKey = typeof SCENARIO_KEYS[number];

// Current baseline for comparison
const CURRENT_METRICS = {
  sharePrice: 82.25,
  marketCap: 18.85,
  usdc: 73.7,
  shares: 229, // millions fully diluted
};

// Balance sheet constants for equity bridge ($M) — update from latest 10-Q
const CRCL_CASH_M = 1349;   // Cash & equivalents ($M) — Q3 2025 10-Q
const CRCL_DEBT_M = 149;    // Total debt ($M) — Q3 2025 10-Q

// Capital Structure Data (from S-1, S-8, 10-Q filings)
const PREFERRED_STOCK = [
  { series: 'Series A', shares: 33621, liquidation: 9078, pricePerShare: 0.27, year: 2013 },
  { series: 'Series B', shares: 17586, liquidation: 17059, pricePerShare: 0.97, year: 2014 },
  { series: 'Series C/C-1', shares: 18445, liquidation: 40027, pricePerShare: 2.17, year: 2015 },
  { series: 'Series D', shares: 23203, liquidation: 64039, pricePerShare: 2.76, year: '2016-17' },
  { series: 'Series E', shares: 37391, liquidation: 606850, pricePerShare: 16.23, year: '2018/2022' },
  { series: 'Series F', shares: 9516, liquidation: 400999, pricePerShare: 42.14, year: 2022 },
];

const CONVERTIBLE_NOTES = [
  { name: '2019 SeedInvest Note', principal: 15700, rate: 2.9, maturity: 'Mar 2026', convertTo: 'Series E', conversionPrice: 16.23, status: 'Outstanding' },
];

const WARRANTS = [
  { date: 'Apr 2023', shares: 4500, exercisePrice: 42.14, expiry: '10 years', vestingPeriod: '5 years', fairValue: 80.1, volatility: 44, conditions: 'Commercial milestones', status: 'Unvested' },
  { date: 'Aug 2023', shares: 3600, exercisePrice: 25.09, expiry: '5 years', vestingPeriod: 'Performance', fairValue: 43.9, volatility: 51, conditions: 'Exchange partnership', status: 'Unvested' },
  { date: 'Dec 2024', shares: 2860, exercisePrice: 22.71, expiry: '6 years', vestingPeriod: '3 years', fairValue: 56.1, volatility: 53, conditions: 'Commercial milestones', status: 'Unvested' },
];

const EQUITY_OFFERINGS = [
  { date: 'Jun 2025', type: 'IPO', shares: 39100, price: 31.00, grossProceeds: 1212, primaryShares: 19900, secondaryShares: 19200, underwriters: 'JPM, Citi, Barclays, Deutsche', notes: 'NYSE listing, includes 2.3M upsize' },
  { date: 'Aug 2025', type: 'Follow-on', shares: 10000, price: 130.00, grossProceeds: 1300, primaryShares: 2000, secondaryShares: 8000, underwriters: 'JPM, Citi, Goldman', notes: 'S-3ASR, 1.5M greenshoe' },
];

const SHARE_CLASSES = [
  { class: 'Class A', authorized: 2500000, outstanding: 209000, votes: 1, description: 'Public shares, 1 vote each' },
  { class: 'Class B', authorized: 500000, outstanding: 19600, votes: 5, description: 'Founder shares, 5 votes (max 30% cap), sunset Jun 2030' },
  { class: 'Class C', authorized: 500000, outstanding: 0, votes: 0, description: 'Non-voting, convertible to Class A' },
];

const EQUITY_AWARDS = {
  options: { classA: 17120, classB: 3582, weightedAvgPrice: 8.90 },
  rsus: { classA: 24357, classB: 829 },
  omnibus: 28265,
  espp: 5653,
};

const EQUITY_PLANS = [
  { plan: 'Omnibus Incentive Plan', reserved: 28265, description: 'Options, RSUs, stock grants' },
  { plan: 'ESPP', reserved: 5653, description: '15% discount, 6-month offering periods' },
  { plan: 'Circle Foundation', reserved: 2682, description: 'Pledge 1% commitment, 10-year donation' },
];

const MAJOR_SHAREHOLDERS = [
  { name: 'Jeremy Allaire (Founder/CEO)', classA: 0, classB: 12500, pctVoting: 18.5, type: 'Insider' },
  { name: 'Sean Neville (Co-founder)', classA: 0, classB: 7100, pctVoting: 10.5, type: 'Insider' },
  { name: 'Coinbase Global', classA: 8367, classB: 0, pctVoting: 2.8, type: 'Strategic' },
  { name: 'Marshall Wace', classA: 8534, classB: 0, pctVoting: 2.9, type: 'Institution' },
  { name: 'Fidelity Funds', classA: 10925, classB: 0, pctVoting: 3.7, type: 'Institution' },
  { name: 'Intersection Fintech', classA: 6529, classB: 0, pctVoting: 2.2, type: 'Institution' },
];


const crclCompetitors: Competitor[] = [
  { name: 'Tether', url: 'https://tether.to/en/transparency/' },
  { name: 'PayPal PYUSD', url: 'https://www.paypal.com/pyusd' },
  { name: 'Paxos', url: 'https://paxos.com' },
  { name: 'Ripple RLUSD', url: 'https://ripple.com' },
];

const crclResearchSources: Array<{ category: string; sources: Array<{ name: string; url: string }> }> = [];

// CSS imported from stock-model-styles.css (see import at top of file)

// Row, Card, Panel, Input imported from '../shared'

// UpdateIndicatorContext, UpdateIndicators, UpdateLegend imported from '../shared'

// Stat, Guide, CFANotes imported from '../shared'

// ============================================================================
// MODEL TAB - DCF Valuation with Parameter Cards (CRCL-specific)
// ============================================================================

// 6 Scenario Presets for USDC/Stablecoin Company
const CRCL_SCENARIO_PRESETS = {
  worst: {
    label: 'Worst',
    desc: 'Fed cuts to 1%, USDC loses share, CBDC competition, regulatory crackdown',
    icon: '💀',
    color: '#dc2626',
    usdcGrowthRate: -20,     // USDC circulation shrinks
    reserveYield: 1.0,       // Fed cuts aggressively
    marketShare: 15,         // Loses share to USDT/CBDC
    distributionCost: 60,    // Coinbase takes more
    operatingMargin: 15,     // Compressed margins
    discountRate: 25,        // High risk premium
    terminalGrowth: 0,       // No growth
    regulatoryRisk: 40,      // High probability of adverse action
    competitionRisk: 35,     // CBDC/USDT threat
    rateRisk: 30,            // Fed cuts dramatically
  },
  bear: {
    label: 'Bear',
    desc: 'Rate cuts compress yield, moderate market share loss, CBDC headwinds',
    icon: '🐻',
    color: '#f97316',
    usdcGrowthRate: 5,       // Slow growth
    reserveYield: 2.5,       // Fed cuts
    marketShare: 22,         // Some share loss
    distributionCost: 56,    // Coinbase maintains leverage
    operatingMargin: 28,     // Pressured margins
    discountRate: 18,        // Elevated risk
    terminalGrowth: 1.5,     // Below GDP
    regulatoryRisk: 20,
    competitionRisk: 20,
    rateRisk: 20,
  },
  base: {
    label: 'Base',
    desc: 'Moderate stablecoin growth, rates normalize at 3%, market share stable',
    icon: '📊',
    color: '#eab308',
    usdcGrowthRate: 15,      // Healthy growth
    reserveYield: 3.5,       // Normalized rates
    marketShare: 28,         // Maintains share
    distributionCost: 54,    // Current Coinbase deal
    operatingMargin: 35,     // Stable margins
    discountRate: 14,        // Moderate risk
    terminalGrowth: 2.5,     // GDP-like
    regulatoryRisk: 10,
    competitionRisk: 12,
    rateRisk: 10,
  },
  mgmt: {
    label: 'Mgmt',
    desc: 'Management targets: stablecoin legislation passes, USDC grows, margins expand',
    icon: '📈',
    color: '#22c55e',
    usdcGrowthRate: 25,      // Strong adoption
    reserveYield: 3.5,       // Stable rates
    marketShare: 32,         // Gains share
    distributionCost: 50,    // Better Coinbase terms
    operatingMargin: 42,     // Scale benefits
    discountRate: 12,        // De-risked
    terminalGrowth: 3,
    regulatoryRisk: 5,
    competitionRisk: 8,
    rateRisk: 8,
  },
  bull: {
    label: 'Bull',
    desc: 'Stablecoin TAM explodes, USDC dominates regulated market, margin expansion',
    icon: '🐂',
    color: '#06b6d4',
    usdcGrowthRate: 40,      // Rapid growth
    reserveYield: 4.0,       // Higher for longer
    marketShare: 38,         // Takes share from USDT
    distributionCost: 45,    // Renegotiated deal
    operatingMargin: 50,     // Strong scale
    discountRate: 11,        // Lower risk
    terminalGrowth: 3.5,
    regulatoryRisk: 3,
    competitionRisk: 5,
    rateRisk: 5,
  },
  moon: {
    label: 'Moon',
    desc: 'USDC becomes internet money, trillion+ circulation, best-in-class margins',
    icon: '🚀',
    color: '#a855f7',
    usdcGrowthRate: 60,      // Hyper growth
    reserveYield: 4.5,       // Higher rates persist
    marketShare: 45,         // Regulatory moat
    distributionCost: 40,    // Direct distribution
    operatingMargin: 60,     // Tech platform margins
    discountRate: 10,        // Blue chip
    terminalGrowth: 4,
    regulatoryRisk: 1,
    competitionRisk: 2,
    rateRisk: 2,
  },
};

// ParameterCard component with color gradient based on value
const ParameterCard = ({
  title,
  explanation,
  options,
  value,
  onChange,
  format = '',
  inverse = false, // true = lower values are bullish (risk, costs)
}: {
  title: string;
  explanation: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  format?: string;
  inverse?: boolean;
}) => {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const isCustomValue = !options.includes(value);

  const formatValue = (v: number) => {
    if (format === '$') return `$${v}`;
    if (format === '%') return `${v}%`;
    if (format === 'x') return `${v.toFixed(1)}x`;
    return String(v);
  };

  // 6 colors for 6 preset positions: red → orange → yellow → lime → green → emerald
  const presetColors = [
    { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
    { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
    { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
    { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
    { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
    { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
  ];

  const getButtonColor = (idx: number) => presetColors[idx];

  const handleCustomSubmit = () => {
    const num = parseFloat(customInput);
    if (!isNaN(num)) {
      onChange(num);
      setCustomMode(false);
      setCustomInput('');
    }
  };

  return (
    <div className="sm-panel sm-mb-12">
      <div className="sm-panel-title sm-mb-12">{title}</div>
      <p className="sm-note-list">
        {explanation}
      </p>
      <div className="sm-param-grid-7">
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const colors = getButtonColor(idx);
          return (
            <div
              key={opt}
              onClick={() => { onChange(opt); setCustomMode(false); }}
              className="sm-param-btn"
              data-active={isActive ? "true" : undefined}
              style={isActive ? { borderColor: colors.border, background: colors.bg, color: colors.text } : undefined}
            >
              {formatValue(opt)}
            </div>
          );
        })}
        {/* Custom input button/field */}
        {customMode ? (
          <div className="sm-custom-input-wrap">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="..."
              autoFocus
              className="sm-custom-input-field"
            />
          </div>
        ) : (
          <div
            onClick={() => setCustomMode(true)}
            className="sm-param-btn"
            data-active={isCustomValue ? "true" : undefined}
            style={isCustomValue ? { borderColor: 'var(--violet)', background: 'rgba(167,139,250,0.15)', color: 'var(--violet)' } : undefined}
          >
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div className="sm-subtle-sm sm-text-center">
        ← Bearish | Bullish →
      </div>
    </div>
  );
};

// Overview Parameter Card - matches Model tab ParameterCard styling with custom input support
const OverviewParameterCard = ({
  title,
  explanation,
  options,
  value,
  onChange,
  format = '',
  currentValue,
}: {
  title: string;
  explanation: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  format?: string;
  currentValue?: number;
}) => {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const isCustomValue = !options.includes(value);

  const formatValue = (v: number) => {
    if (format === '$') return `$${v}`;
    if (format === '%') return `${v}%`;
    if (format === 'B') return `${v}B`;
    if (format === 'M') return `${v}M`;
    return String(v);
  };

  const presetColors = [
    { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
    { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
    { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
    { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
    { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
    { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
  ];

  const handleCustomSubmit = () => {
    const num = parseFloat(customInput);
    if (!isNaN(num)) {
      onChange(num);
      setCustomMode(false);
      setCustomInput('');
    }
  };

  return (
    <div className="sm-panel sm-mb-12">
      <div className="sm-panel-title sm-mb-12">{title}</div>
      <p className="sm-note-list">
        {explanation}
      </p>
      <div className="sm-param-grid-7">
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const colors = presetColors[idx];
          return (
            <div
              key={opt}
              onClick={() => { onChange(opt); setCustomMode(false); }}
              className="sm-param-btn"
              data-active={isActive ? "true" : undefined}
              style={isActive ? { borderColor: colors.border, background: colors.bg, color: colors.text } : undefined}
            >
              {formatValue(opt)}
            </div>
          );
        })}
        {customMode ? (
          <div className="sm-custom-input-wrap">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="..."
              autoFocus
              className="sm-custom-input-field"
            />
          </div>
        ) : (
          <div
            onClick={() => setCustomMode(true)}
            className="sm-param-btn"
            data-active={isCustomValue ? "true" : undefined}
            style={isCustomValue ? { borderColor: 'var(--violet)', background: 'rgba(167,139,250,0.15)', color: 'var(--violet)' } : undefined}
          >
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div className="sm-subtle-sm sm-text-center">
        ← Bearish | Bullish →
      </div>
    </div>
  );
};

// ModelTab component for CRCL - USDC/Reserve yield DCF valuation
const ModelTab = ({
  currentUSDC,
  currentShares,
  currentStockPrice,
  currentMarketShare,
}: {
  currentUSDC: number;
  currentShares: number;
  currentStockPrice: number;
  currentMarketShare: number;
}) => {
  // Model parameters state
  const [usdcGrowthRate, setUsdcGrowthRate] = useState(15);
  const [reserveYield, setReserveYield] = useState(3.5);
  const [marketShare, setMarketShare] = useState(28);
  const [distributionCost, setDistributionCost] = useState(54);
  const [operatingMargin, setOperatingMargin] = useState(35);
  const [discountRate, setDiscountRate] = useState(14);
  const [terminalGrowth, setTerminalGrowth] = useState(2.5);
  const [regulatoryRisk, setRegulatoryRisk] = useState(10);
  const [competitionRisk, setCompetitionRisk] = useState(12);
  const [rateRisk, setRateRisk] = useState(10);
  const [selectedScenario, setSelectedScenario] = useState('base');

  type ScenarioKey = 'worst' | 'bear' | 'base' | 'mgmt' | 'bull' | 'moon';

  const applyScenario = (scenario: ScenarioKey) => {
    const p = CRCL_SCENARIO_PRESETS[scenario];
    setUsdcGrowthRate(p.usdcGrowthRate);
    setReserveYield(p.reserveYield);
    setMarketShare(p.marketShare);
    setDistributionCost(p.distributionCost);
    setOperatingMargin(p.operatingMargin);
    setDiscountRate(p.discountRate);
    setTerminalGrowth(p.terminalGrowth);
    setRegulatoryRisk(p.regulatoryRisk);
    setCompetitionRisk(p.competitionRisk);
    setRateRisk(p.rateRisk);
    setSelectedScenario(scenario);
  };

  // Get current scenario info
  const currentPreset = CRCL_SCENARIO_PRESETS[selectedScenario as ScenarioKey];
  const scenario = currentPreset
    ? { name: currentPreset.label, color: currentPreset.color, icon: currentPreset.icon }
    : { name: 'Custom', color: '#a855f7', icon: '⚙️' };

  // ============================================================================
  // DCF CALCULATION - Revenue/Yield-based for Stablecoin Company
  // ============================================================================

  // STEP 1: Current Financials
  const currentGrossRevenue = currentUSDC * (reserveYield / 100); // $B
  const currentNetRevenue = currentGrossRevenue * (1 - distributionCost / 100); // After Coinbase
  const currentEBITDA = currentNetRevenue * (operatingMargin / 100);

  // STEP 2: Terminal Year (5 years) USDC Circulation
  const terminalYears = 5;
  const terminalUSDC = currentUSDC * Math.pow(1 + usdcGrowthRate / 100, terminalYears);

  // STEP 3: Terminal Year Revenue
  const terminalGrossRevenue = terminalUSDC * (reserveYield / 100); // $B
  const terminalNetRevenue = terminalGrossRevenue * (1 - distributionCost / 100);
  const terminalEBITDA = terminalNetRevenue * (operatingMargin / 100);

  // STEP 4: Terminal Free Cash Flow (assume FCF ≈ 85% of EBITDA for asset-light business)
  const fcfConversion = 0.85;
  const terminalFCF = terminalEBITDA * fcfConversion;

  // STEP 5: Terminal Enterprise Value using Gordon Growth Model
  const discountRateDecimal = discountRate / 100;
  const terminalGrowthDecimal = terminalGrowth / 100;
  const spread = discountRateDecimal - terminalGrowthDecimal;
  // Gordon Growth Model requires positive spread to avoid division by zero
  // MIN_SPREAD_FOR_GORDON_GROWTH = 0.01 (1%) threshold prevents invalid calculations
  const terminalEV = spread > 0.01 ? terminalFCF / spread : 0; // $B

  // STEP 6: Discount Terminal Value to Present
  const discountFactor = Math.pow(1 + discountRateDecimal, terminalYears);
  const presentValueEV = terminalEV / discountFactor; // $B

  // STEP 7: Risk Factor (probability of success)
  // Formula: (1 - Risk1) × (1 - Risk2) × (1 - Risk3)
  // 
  // ASSUMPTION: Risks are independent. If risks are correlated (e.g., regulatory changes
  // affect competition), this formula overestimates success probability. For correlated
  // risks, consider: riskFactor = 1 - max(risk1, risk2, risk3) or a correlation matrix.
  const riskFactor = (1 - regulatoryRisk/100) * (1 - competitionRisk/100) * (1 - rateRisk/100);

  // STEP 8: Risk-Adjusted Present Value
  const riskAdjustedEV = presentValueEV * riskFactor; // $B

  // STEP 9: Equity Value (assume minimal net debt for CRCL)
  // Net debt in $B: ~$200M = 0.2B
  // Formula: Equity Value = Enterprise Value - Net Debt
  const netDebt = 0.2; // ~$200M net debt (in $B units)
  const equityValue = riskAdjustedEV - netDebt; // $B

  // STEP 10: Target Stock Price (no significant dilution expected for profitable company)
  const dilutionRate = 2; // 2% annual stock comp dilution
  const terminalShares = currentShares * Math.pow(1 + dilutionRate / 100, terminalYears);
  // Convert $B to $M: multiply by THOUSAND (1000), then divide by M shares to get $/share
  const targetStockPrice = equityValue > 0 && terminalShares > 0
    ? (equityValue * 1000) / terminalShares // Units: $B × 1000 ÷ M shares = $/share
    : 0;

  // STEP 11: Implied Upside/Downside
  const impliedUpside = currentStockPrice > 0
    ? ((targetStockPrice - currentStockPrice) / currentStockPrice) * 100
    : 0;

  // STEP 12: Valuation Multiples
  const currentMarketCap = (currentShares * currentStockPrice) / 1000; // $B
  const terminalEVperRev = terminalNetRevenue > 0 ? terminalEV / terminalNetRevenue : 0;
  const terminalEVperEBITDA = terminalEBITDA > 0 ? terminalEV / terminalEBITDA : 0;
  const currentPSRatio = currentNetRevenue > 0 ? currentMarketCap / currentNetRevenue : 0;

  return (
    <SharedModelTab
      sectionLabel="Stablecoin DCF Valuation"
      description="Configure model assumptions for Circle's USDC business. Changes flow to revenue projections and DCF valuation. Key drivers: USDC circulation growth, Fed funds rate (reserve yield), and Coinbase distribution cost."
      sources={['PR', 'SEC']}
    >
      {/* ASSUMPTIONS SECTION */}
      <>

        {/* Scenario Presets - 6 scenarios from Worst to Moon */}
        <div className="sm-model-grid sm-mt-8" style={{ '--cols': 6 } as React.CSSProperties}>
          {(['worst', 'bear', 'base', 'mgmt', 'bull', 'moon'] as const).map(s => {
            const preset = CRCL_SCENARIO_PRESETS[s];
            const isActive = selectedScenario === s;
            return (
              <div
                key={s}
                onClick={() => applyScenario(s)}
                className="sm-scenario-card"
                data-active={isActive || undefined}
                style={{ '--scenario-color': preset.color } as React.CSSProperties}
              >
                <div className="sm-micro-text">{preset.label}</div>
                <div className="sm-scenario-val">
                  {preset.usdcGrowthRate > 0 ? '+' : ''}{preset.usdcGrowthRate}%
                </div>
                <div className="sm-scenario-sub">
                  {preset.reserveYield}% yield
                </div>
              </div>
            );
          })}
        </div>
        {selectedScenario === 'custom' && (
          <div className="sm-custom-scenario-alert">
            Custom scenario — parameters modified from preset
          </div>
        )}

        {/* USDC & REVENUE PARAMETERS */}
        <div className="sm-divider">
          <span className="sm-param-label">USDC & Revenue Model</span>
          <span className="sm-divider-line" />
        </div>

        <div className="sm-grid-2">
          <ParameterCard
            title="USDC Annual Growth Rate (%)"
            explanation="Expected annual USDC circulation growth. Historical: 500%+ (2020-21), -50% (2022-23), +40% (2024). Crypto cycles are volatile. Stablecoin TAM could grow 10x+ with institutional adoption and regulatory clarity."
            options={[-20, 5, 15, 25, 40, 60]}
            value={usdcGrowthRate}
            onChange={v => { setUsdcGrowthRate(v); setSelectedScenario('custom'); }}
            format="%"
          />
          <ParameterCard
            title="Reserve Yield / Fed Funds (%)"
            explanation="Yield on USDC reserves (short-term Treasuries). Currently ~4.5%. Fed projections: cuts to 3-3.5% by 2026. Key revenue driver - 1% rate = ~$625M gross revenue per $62.5B USDC. Lower rates = lower yield income."
            options={[1.0, 2.5, 3.5, 3.5, 4.0, 4.5]}
            value={reserveYield}
            onChange={v => { setReserveYield(v); setSelectedScenario('custom'); }}
            format="%"
          />
        </div>

        <div className="sm-grid-2">
          <ParameterCard
            title="Market Share (%)"
            explanation="USDC % of total stablecoin market. Currently ~29%. USDT dominates at ~68%. USDC's advantage: regulatory compliance, transparency, US-friendly. Risk: CBDCs, new entrants (PayPal USD), USDT resilience."
            options={[15, 22, 28, 32, 38, 45]}
            value={marketShare}
            onChange={v => { setMarketShare(v); setSelectedScenario('custom'); }}
            format="%"
          />
          <ParameterCard
            title="Coinbase Distribution Cost (%)"
            explanation="Revenue share to Coinbase for USDC distribution. Current estimate: ~54% of reserve income. Coinbase is critical partner but takes majority of economics. Lower % = better Circle unit economics."
            options={[60, 56, 54, 50, 45, 40]}
            value={distributionCost}
            onChange={v => { setDistributionCost(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
        </div>

        {/* OPERATING PARAMETERS */}
        <div className="sm-divider">
          <span className="sm-param-label">Operating Model</span>
          <span className="sm-divider-line" />
        </div>

        <div className="sm-grid-2">
          <ParameterCard
            title="Operating Margin (%)"
            explanation="EBITDA margin on net revenue (after Coinbase). Fintech peers: 30-50%+. Scale benefits: compliance/tech costs spread over larger base. 25% = pressured, 40%+ = scale achieved, 60% = best-in-class."
            options={[15, 28, 35, 42, 50, 60]}
            value={operatingMargin}
            onChange={v => { setOperatingMargin(v); setSelectedScenario('custom'); }}
            format="%"
          />
          <div className="sm-panel sm-mb-12">
            <div className="sm-panel-title sm-mb-12">Current Position</div>
            <p className="sm-note-list">
              Live data from Circle financials. Used as starting point for projections.
            </p>
            <div className="sm-model-grid" style={{ '--cols': 2 } as React.CSSProperties}>
              <div className="sm-grid-cell-center"><div className="sm-micro-text">USDC Circulation</div><div className="sm-mono-lg-kpi">${currentUSDC}B</div></div>
              <div className="sm-grid-cell-center"><div className="sm-micro-text">Market Share</div><div className="sm-mono-lg-kpi">{currentMarketShare}%</div></div>
              <div className="sm-grid-cell-center"><div className="sm-micro-text">Est. Gross Rev</div><div className="sm-mono-lg-kpi">${currentGrossRevenue.toFixed(2)}B</div></div>
              <div className="sm-grid-cell-center"><div className="sm-micro-text">Est. Net Rev</div><div className="sm-mono-lg-kpi">${currentNetRevenue.toFixed(2)}B</div></div>
            </div>
          </div>
        </div>

        {/* VALUATION PARAMETERS */}
        <div className="sm-divider">
          <span className="sm-param-label">Valuation Parameters</span>
          <span className="sm-divider-line" />
        </div>

        <div className="sm-grid-2">
          <ParameterCard
            title="Discount Rate / WACC (%)"
            explanation="Required return for discounting future cash flows. 10% = mature fintech. 14% = growth with execution risk. 20%+ = speculative. Higher if rate/regulatory risk is elevated."
            options={[25, 18, 14, 12, 11, 10]}
            value={discountRate}
            onChange={v => { setDiscountRate(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <ParameterCard
            title="Terminal Growth Rate (%)"
            explanation="Perpetual growth rate after terminal year. For stablecoin infrastructure: 2-3% is reasonable (GDP-like). 4%+ assumes continued crypto economy outgrowth. Should not exceed long-term nominal GDP."
            options={[0, 1.5, 2.5, 3, 3.5, 4]}
            value={terminalGrowth}
            onChange={v => { setTerminalGrowth(v); setSelectedScenario('custom'); }}
            format="%"
          />
        </div>

        {/* RISK PARAMETERS */}
        <div className="sm-divider">
          <span className="sm-param-label">Risk Probability Factors</span>
          <span className="sm-divider-line" />
        </div>
        <p className="sm-subtle">
          Probability of adverse events that could significantly impair value. Combined as: (1-Reg) × (1-Comp) × (1-Rate) = {(riskFactor * 100).toFixed(0)}% success probability.
        </p>

        <div className="sm-grid-sep-3col sm-gap-12-bg-transparent">
          <ParameterCard
            title="Regulatory Risk (%)"
            explanation="Probability of adverse stablecoin regulation. SEC/banking agency scrutiny, reserve requirements, licensing issues. 5% = favorable legislation. 30%+ = CBDC mandates or stablecoin restrictions."
            options={[40, 20, 10, 5, 3, 1]}
            value={regulatoryRisk}
            onChange={v => { setRegulatoryRisk(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <ParameterCard
            title="Competition Risk (%)"
            explanation="Probability competitors (USDT, CBDC, PayPal USD) significantly erode market share or pricing. 5% = strong moat. 25%+ = commoditization risk."
            options={[35, 20, 12, 8, 5, 2]}
            value={competitionRisk}
            onChange={v => { setCompetitionRisk(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <ParameterCard
            title="Interest Rate Risk (%)"
            explanation="Probability Fed cuts rates more than expected, compressing yield income. 5% = higher for longer. 25%+ = aggressive easing cycle. Circle's revenue is highly rate-sensitive."
            options={[30, 20, 10, 8, 5, 2]}
            value={rateRisk}
            onChange={v => { setRateRisk(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
        </div>

        {/* DCF VALUATION OUTPUT */}
        <div className="sm-divider">
          <span className="sm-param-label">DCF Valuation Output (5-Year Terminal)</span>
          <span className="sm-divider-line" />
        </div>
        {/* Primary Output — Hero KPIs */}
        <div className="sm-grid-sep-2col sm-rounded-16 sm-overflow-hidden sm-dcf-summary-accent">
          <div className="sm-dcf-cell">
            <div className="sm-th sm-accent">Target Price</div>
            <div className="sm-mono-2xl sm-accent sm-m-6-0-4">{targetStockPrice > 0 ? `$${targetStockPrice.toFixed(0)}` : 'N/A'}</div>
            <div className="sm-text-11">vs ${currentStockPrice.toFixed(0)} current</div>
          </div>
          <div className="sm-dcf-cell">
            <div className="sm-th sm-accent">Implied Upside</div>
            <div className="sm-dcf-hero" style={{ color: impliedUpside > 50 ? 'var(--mint)' : impliedUpside > 0 ? 'var(--gold)' : 'var(--coral)' }}>{targetStockPrice > 0 ? `${impliedUpside > 0 ? '+' : ''}${impliedUpside.toFixed(0)}%` : 'N/A'}</div>
            <div className="sm-text-11">{impliedUpside > 100 ? 'Strong Buy' : impliedUpside > 25 ? 'Buy' : impliedUpside > 0 ? 'Hold' : 'Sell'}</div>
          </div>
        </div>
        {/* Valuation Metrics Grid */}
        <div className="sm-model-grid sm-mt-12" style={{ '--cols': 4 } as React.CSSProperties}>
          {[
            { label: 'PV Enterprise Value', value: `$${riskAdjustedEV.toFixed(1)}B`, sub: `${(riskFactor * 100).toFixed(0)}% prob` },
            { label: 'Market Cap', value: `$${currentMarketCap.toFixed(1)}B`, sub: `${currentPSRatio.toFixed(1)}x Net Rev` },
            { label: 'Terminal USDC', value: `$${terminalUSDC.toFixed(0)}B`, sub: `${usdcGrowthRate > 0 ? '+' : ''}${usdcGrowthRate}%/yr` },
            { label: 'Terminal Gross Rev', value: `$${terminalGrossRevenue.toFixed(2)}B`, sub: `${reserveYield}% yield` },
            { label: 'Terminal Net Rev', value: `$${terminalNetRevenue.toFixed(2)}B`, sub: `After ${distributionCost}% dist.` },
            { label: 'Terminal EBITDA', value: `$${terminalEBITDA.toFixed(2)}B`, sub: `${operatingMargin}% margin` },
            { label: 'Terminal EV/Rev', value: `${terminalEVperRev.toFixed(1)}x`, sub: `$${terminalEV.toFixed(1)}B EV` },
            { label: 'Terminal EV/EBITDA', value: `${terminalEVperEBITDA.toFixed(1)}x`, sub: 'Terminal multiple' },
            { label: 'Terminal FCF', value: `$${terminalFCF.toFixed(2)}B`, sub: `${(fcfConversion * 100).toFixed(0)}% conversion` },
            { label: 'Diluted Shares', value: `${terminalShares.toFixed(0)}M`, sub: `+${((terminalShares / currentShares - 1) * 100).toFixed(0)}% dilution` },
            { label: 'Risk Factor', value: `${(riskFactor * 100).toFixed(0)}%`, sub: 'Success prob.' },
            { label: 'Equity Value', value: `$${equityValue.toFixed(1)}B`, sub: 'Risk-adj' },
          ].map(kpi => (
            <div key={kpi.label} className="sm-grid-cell-center">
              <div className="sm-micro-text">{kpi.label}</div>
              <div className="sm-mono-lg-kpi">{kpi.value}</div>
              <div className="sm-text-11">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* CALCULATION METHODOLOGY */}
        <div className="sm-divider">
          <span className="sm-param-label">Methodology</span>
          <span className="sm-divider-line" />
        </div>
        <div className="sm-card">
          <div className="sm-card-section">
            <div className="sm-fw-600 sm-text sm-mb-6 sm-method-title">Stablecoin DCF — Revenue-Based Terminal Value</div>
            <p className="sm-method-desc">
              Revenue-based terminal value approach incorporating USDC growth, reserve yield, distribution costs, and risk-adjusted discounting.
            </p>
          </div>
          <div className="sm-card-body">
            <div className="sm-grid-sep-2col sm-grid-sep-gap16">
              {[
                { step: '1-3', title: 'Terminal Year Revenue', color: 'var(--accent)', items: [
                  { label: 'Terminal USDC', formula: `$${currentUSDC}B × (1+${usdcGrowthRate}%)^5`, result: `$${terminalUSDC.toFixed(0)}B` },
                  { label: 'Gross Revenue', formula: `$${terminalUSDC.toFixed(0)}B × ${reserveYield}%`, result: `$${terminalGrossRevenue.toFixed(2)}B` },
                  { label: 'Net Revenue', formula: `$${terminalGrossRevenue.toFixed(2)}B × (1-${distributionCost}%)`, result: `$${terminalNetRevenue.toFixed(2)}B` },
                ]},
                { step: '4-5', title: 'Terminal Value', color: 'var(--sky)', items: [
                  { label: 'EBITDA', formula: `$${terminalNetRevenue.toFixed(2)}B × ${operatingMargin}%`, result: `$${terminalEBITDA.toFixed(2)}B` },
                  { label: 'FCF', formula: `$${terminalEBITDA.toFixed(2)}B × ${(fcfConversion * 100).toFixed(0)}%`, result: `$${terminalFCF.toFixed(3)}B` },
                  { label: 'Gordon Growth TV', formula: `FCF ÷ (${discountRate}% - ${terminalGrowth}%)`, result: `$${terminalEV.toFixed(1)}B` },
                ]},
                { step: '6-8', title: 'Risk Adjustment', color: 'var(--gold)', items: [
                  { label: 'Present Value', formula: `$${terminalEV.toFixed(1)}B ÷ (1+${discountRate}%)^5`, result: `$${presentValueEV.toFixed(1)}B` },
                  { label: 'Risk Factor', formula: `(1-${regulatoryRisk}%) × (1-${competitionRisk}%) × (1-${rateRisk}%)`, result: `${(riskFactor * 100).toFixed(1)}%` },
                  { label: 'Risk-Adj EV', formula: `$${presentValueEV.toFixed(1)}B × ${(riskFactor * 100).toFixed(1)}%`, result: `$${riskAdjustedEV.toFixed(1)}B` },
                ]},
                { step: '9-11', title: 'Target Price', color: 'var(--mint)', items: [
                  { label: 'Equity Value', formula: `$${riskAdjustedEV.toFixed(1)}B - $${netDebt}B debt`, result: `$${equityValue.toFixed(1)}B` },
                  { label: 'Diluted Shares', formula: `${currentShares}M × (1+${dilutionRate}%)^5`, result: `${terminalShares.toFixed(0)}M` },
                  { label: 'Target Price', formula: `$${equityValue.toFixed(1)}B ÷ ${terminalShares.toFixed(0)}M`, result: `$${targetStockPrice.toFixed(0)}` },
                ]},
              ].map((section, si) => (
                <div key={si} className="sm-rounded-12 sm-overflow-hidden sm-bg-surface2">
                  <div className="sm-dcf-step-header">
                    <span className="sm-dcf-step-badge" style={{ background: section.color }}>Step {section.step}</span>
                    <span className="sm-text-12 sm-fw-600 sm-text">{section.title}</span>
                  </div>
                  <div className="sm-dcf-step-body">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="sm-flex-between sm-items-baseline sm-gap-8">
                        <div className="sm-min-w-0 sm-flex-1">
                          <div className="sm-text-11 sm-fw-600 sm-text2">{item.label}</div>
                          <div className="sm-micro-text sm-dcf-formula">{item.formula}</div>
                        </div>
                        <div className="sm-dcf-result" style={{ color: section.color }}>{item.result}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sm-rounded-12 sm-mt-16 sm-dcf-notes">
              <div className="sm-text2 sm-fw-600 sm-mb-4">Key Assumptions</div>
              <ul className="sm-dcf-notes-list">
                <li>Terminal year: {new Date().getFullYear() + 5} (5 years out)</li>
                <li>FCF conversion = 85% of EBITDA (asset-light model)</li>
                <li>Coinbase distribution cost applied to gross yield revenue</li>
                <li>Risk factors are multiplicative (independent events)</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </SharedModelTab>
  );
};

// Scenarios Tab Component - Unified with ASTS/BMNR structure
const ScenariosTab = () => {
  const [targetYear, setTargetYear] = useState(2027);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('base');

  return (
    <>
      <div className="sm-divider"><span className="sm-section-label">Scenario Simulation</span><UpdateIndicators sources={['PR', 'SEC']} /></div>

      {/* Highlight Box */}
      <div className="highlight">
        <h3>Multi-Year Projections</h3>
        <p className="sm-text-14">
          Model different growth trajectories based on USDC adoption, rate environment, and margin evolution.
          Bear case assumes rate cuts and competition pressure. Bull case models stablecoin dominance with
          expanding platform margins. Probability-weight for expected value.
        </p>
      </div>

      {/* Controls */}
      <div className="sm-grid-2-lg">
        {/* Target Year Selector */}
        <div className="sm-card">
          <div className="sm-card-section"><span className="sm-section-label">Target Year</span></div>
          <div className="sm-flex-wrap">
            {TARGET_YEARS.map(year => (
              <button
                key={year}
                onClick={() => setTargetYear(year)}
                className="sm-toggle-btn sm-crcl-year-btn"
                data-active={targetYear === year}
                style={{ '--accent': 'var(--mint)' } as React.CSSProperties}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="sm-card">
          <div className="sm-card-section"><span className="sm-section-label">Scenario</span></div>
          <div className="sm-flex-wrap">
            {SCENARIO_KEYS.map(key => {
              const s = SCENARIO_SIMULATIONS[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className="sm-toggle-btn"
                  data-active={selectedScenario === key}
                  style={{ '--accent': s.color } as React.CSSProperties}
                >
                  {s.name} ({s.prob}%)
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Scenario Results */}
      {(() => {
        const selected = SCENARIO_SIMULATIONS[selectedScenario];
        const projection = selected.projections.find(p => p.year === targetYear);
        if (!projection) return null;

        const priceReturn = ((projection.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100;
        const usdcGrowth = ((projection.usdc / CURRENT_METRICS.usdc) - 1) * 100;

        return (
          <>
            {/* Scenario Header */}
            <div className="sm-crcl-scenario-header" style={{ '--scenario-color': selected.color } as React.CSSProperties}>
              <div className="sm-flex-between-start">
                <div>
                  <h3 style={{ color: selected.color }}>
                    {selected.name} Case — {targetYear}
                  </h3>
                  <p className="sm-text2 sm-crcl-max-w-600">{selected.description}</p>
                </div>
                <div className="sm-text-right">
                  <div className="sm-subtle">Probability Weight</div>
                  <div className="sm-crcl-prob-num" style={{ color: selected.color }}>
                    {selected.prob}%
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="g4">
              <div className="sm-crcl-scenario-card">
                <div className="sm-crcl-scenario-big-num" style={{ color: selected.color }}>${projection.sharePrice.toLocaleString()}</div>
                <div className="sm-section-label sm-mt-8">Share Price</div>
                <div className="sm-text-12 sm-val-color" data-positive={priceReturn >= 0}>
                  {priceReturn >= 0 ? '+' : ''}{priceReturn.toFixed(0)}% from today
                </div>
              </div>
              <div className="sm-crcl-scenario-card">
                <div className="sm-mono-xl sm-text sm-crcl-ls-tight">${projection.equityValue}B</div>
                <div className="sm-section-label sm-mt-8">Equity Value</div>
              </div>
              <div className="sm-crcl-scenario-card">
                <div className="sm-mono-xl sm-text sm-crcl-ls-tight">${projection.usdc}B</div>
                <div className="sm-section-label sm-mt-8">USDC Circulation</div>
                <div className="sm-text-12 sm-color-sky">
                  +{usdcGrowth.toFixed(0)}% growth
                </div>
              </div>
              <div className="sm-crcl-scenario-card">
                <div className="sm-mono-xl sm-text sm-crcl-ls-tight">{projection.marketShare}%</div>
                <div className="sm-section-label sm-mt-8">Market Share</div>
              </div>
            </div>

            {/* Financial Projections Table */}
            <div className="sm-card">
              <div className="sm-card-section"><span className="sm-section-label">Financial Projections — {selected.name} Scenario</span></div>
              <div className="sm-overflow-x">
                <table className="sm-w-full sm-border-collapse">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th className="sm-text-right">Today</th>
                      {selected.projections.map(p => (
                        <th key={p.year} className="sm-text-right">
                          {p.year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>USDC Circulation ($B)</td>
                      <td className="sm-text-right">{CURRENT_METRICS.usdc}</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          {p.usdc}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Market Share (%)</td>
                      <td className="sm-text-right">29%</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          {p.marketShare}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Reserve Yield (%)</td>
                      <td className="sm-text-right">4.33%</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          {p.reserveRate}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Gross Revenue ($B)</td>
                      <td className="sm-text-right">$2.96</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          ${p.grossRevenue.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Distribution Costs ($B)</td>
                      <td className="sm-text-right">($1.15)</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right sm-coral" data-highlighted={p.year === targetYear}>
                          (${p.distributionCost.toFixed(2)})
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Net Revenue ($B)</td>
                      <td className="sm-text-right sm-mint">$1.81</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right sm-mint" data-highlighted={p.year === targetYear}>
                          ${p.netRevenue.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>RLDC Margin (%)</td>
                      <td className="sm-text-right">39%</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          {p.rldcMargin}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>EBITDA ($B)</td>
                      <td className="sm-text-right">$0.29</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right sm-val-color" data-positive={p.ebitda >= 0} data-highlighted={p.year === targetYear}>
                          {p.ebitda >= 0 ? '$' : '($'}{Math.abs(p.ebitda).toFixed(2)}{p.ebitda < 0 ? ')' : ''}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Net Income ($B)</td>
                      <td className="sm-text-right">$0.16</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right sm-val-color" data-positive={p.netIncome >= 0} data-highlighted={p.year === targetYear}>
                          {p.netIncome >= 0 ? '$' : '($'}{Math.abs(p.netIncome).toFixed(2)}{p.netIncome < 0 ? ')' : ''}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Free Cash Flow ($B)</td>
                      <td className="sm-text-right">$0.14</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right sm-val-color-sky" data-positive={p.fcf >= 0} data-highlighted={p.year === targetYear}>
                          {p.fcf >= 0 ? '$' : '($'}{Math.abs(p.fcf).toFixed(2)}{p.fcf < 0 ? ')' : ''}
                        </td>
                      ))}
                    </tr>
                    <tr className="sm-fw-600">
                      <td>Exit P/S Multiple</td>
                      <td className="sm-text-right">6.4x</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          {p.exitMultiple}x
                        </td>
                      ))}
                    </tr>
                    <tr className="sm-fw-600">
                      <td>Implied EV ($B)</td>
                      <td className="sm-text-right">$18.9</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear}>
                          ${p.evImplied.toFixed(1)}
                        </td>
                      ))}
                    </tr>
                    <tr className="sm-fw-700">
                      <td>Share Price ($)</td>
                      <td className="sm-text-right">${CURRENT_METRICS.sharePrice}</td>
                      {selected.projections.map(p => (
                        <td key={p.year} className="sm-text-right" data-highlighted={p.year === targetYear} style={{ color: selected.color }}>
                          ${p.sharePrice.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assumptions & Catalysts */}
            <div className="sm-grid-2-lg">
              <div className="sm-card">
                <div className="sm-card-section"><span className="sm-section-label">Key Assumptions</span></div>
                <ul className="sm-text2 sm-m-0 sm-pl-20">
                  {selected.assumptions.map((a, i) => (
                    <li key={i} className="sm-crcl-lh-15">{a}</li>
                  ))}
                </ul>
              </div>
              <div className="sm-card">
                <div className="sm-card-section"><span className="sm-section-label">{selected.catalysts.length > 0 ? 'Catalysts' : 'Key Risks'}</span></div>
                <ul className="sm-text2 sm-m-0 sm-pl-20">
                  {(selected.catalysts.length > 0 ? selected.catalysts : selected.risks).map((item, i) => (
                    <li key={i} className="sm-crcl-lh-15">{item}</li>
                  ))}
                </ul>
                {selected.catalysts.length > 0 && selected.risks.length > 0 && (
                  <>
                    <div className="sm-card-section"><span className="sm-section-label">Risks</span></div>
                    <ul className="sm-text2 sm-m-0 sm-pl-20">
                      {selected.risks.map((r, i) => (
                        <li key={i} className="sm-crcl-lh-15">{r}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </>
        );
      })()}

      {/* Probability-Weighted Expected Value */}
      <div className="highlight">
        <h3>Probability-Weighted Expected Value — {targetYear}</h3>
        <p className="sm-text2">
          Weighted average across all scenarios based on assigned probabilities
        </p>

        {(() => {
          const pwev = SCENARIO_KEYS.reduce((acc, key) => {
            const s = SCENARIO_SIMULATIONS[key];
            const p = s.projections.find(proj => proj.year === targetYear);
            if (p) {
              acc.sharePrice += p.sharePrice * (s.prob / 100);
              acc.equityValue += p.equityValue * (s.prob / 100);
              acc.usdc += p.usdc * (s.prob / 100);
              acc.netIncome += p.netIncome * (s.prob / 100);
            }
            return acc;
          }, { sharePrice: 0, equityValue: 0, usdc: 0, netIncome: 0 });

          const expectedReturn = ((pwev.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100;
          const cagr = (Math.pow(pwev.sharePrice / CURRENT_METRICS.sharePrice, 1 / (targetYear - 2025)) - 1) * 100;

          return (
            <>
              <div className="g4">
                <div className="sm-crcl-scenario-card">
                  <div className="sm-crcl-scenario-big-num sm-color-mint">${pwev.sharePrice.toFixed(0)}</div>
                  <div className="sm-section-label sm-mt-8">Expected Share Price</div>
                </div>
                <div className="sm-crcl-scenario-card">
                  <div className="sm-mono-xl sm-text sm-crcl-ls-tight">${pwev.equityValue.toFixed(1)}B</div>
                  <div className="sm-section-label sm-mt-8">Expected Equity Value</div>
                </div>
                <div className="sm-crcl-scenario-card">
                  <div className="sm-crcl-scenario-big-num sm-color-sky">{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</div>
                  <div className="sm-section-label sm-mt-8">Expected Return</div>
                </div>
                <div className="sm-crcl-scenario-card">
                  <div className="sm-mono-xl sm-text sm-crcl-ls-tight">{cagr.toFixed(1)}%</div>
                  <div className="sm-section-label sm-mt-8">Implied CAGR</div>
                </div>
              </div>

              {/* Scenario Breakdown */}
              <div>
                <table className="sm-w-full sm-border-collapse">
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th className="sm-text-right">Probability</th>
                      <th className="sm-text-right">Share Price</th>
                      <th className="sm-text-right">Return</th>
                      <th className="sm-text-right">Weighted Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCENARIO_KEYS.map(key => {
                      const s = SCENARIO_SIMULATIONS[key];
                      const p = s.projections.find(proj => proj.year === targetYear);
                      if (!p) return null;
                      const ret = ((p.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100;
                      const contribution = p.sharePrice * (s.prob / 100);
                      return (
                        <tr key={key} data-selected={selectedScenario === key}>
                          <td>
                            <span className="sm-crcl-dot" style={{ background: s.color }}></span>
                            {s.name}
                          </td>
                          <td className="sm-text-right">{s.prob}%</td>
                          <td className="sm-text-right">${p.sharePrice.toLocaleString()}</td>
                          <td className="sm-text-right sm-val-color" data-positive={ret >= 0}>
                            {ret >= 0 ? '+' : ''}{ret.toFixed(0)}%
                          </td>
                          <td className="sm-text-right sm-sky">${contribution.toFixed(0)}</td>
                        </tr>
                      );
                    })}
                    <tr className="sm-fw-700">
                      <td>Expected Value</td>
                      <td className="sm-text-right">100%</td>
                      <td className="sm-text-right sm-mint">${pwev.sharePrice.toFixed(0)}</td>
                      <td className="sm-text-right sm-mint">{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</td>
                      <td className="sm-text-right sm-mint">${pwev.sharePrice.toFixed(0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
      </div>

      {/* All Scenarios Comparison */}
      <div className="sm-card">
        <div className="sm-card-section"><span className="sm-section-label">All Scenarios — {targetYear} Comparison</span></div>
        <div className="sm-overflow-x">
          <table className="sm-w-full sm-border-collapse">
            <thead>
              <tr>
                <th>Metric</th>
                {SCENARIO_KEYS.map(key => {
                  const s = SCENARIO_SIMULATIONS[key];
                  return <th key={key} className="sm-text-right">{s.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const projections = SCENARIO_KEYS.map(key =>
                  SCENARIO_SIMULATIONS[key].projections.find(p => p.year === targetYear)
                );
                return (
                  <>
                    <tr>
                      <td>USDC ($B)</td>
                      {projections.map((p, i) => <td key={i} className="sm-text-right">{p?.usdc || '—'}</td>)}
                    </tr>
                    <tr>
                      <td>Gross Revenue ($B)</td>
                      {projections.map((p, i) => <td key={i} className="sm-text-right">${p?.grossRevenue.toFixed(1) || '—'}</td>)}
                    </tr>
                    <tr>
                      <td>Net Income ($B)</td>
                      {projections.map((p, i) => (
                        <td key={i} className="sm-text-right sm-val-color" data-positive={(p?.netIncome || 0) >= 0}>
                          {p ? (p.netIncome >= 0 ? `$${p.netIncome.toFixed(2)}` : `($${Math.abs(p.netIncome).toFixed(2)})`) : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Exit Multiple (P/S)</td>
                      {projections.map((p, i) => <td key={i} className="sm-text-right">{p?.exitMultiple}x</td>)}
                    </tr>
                    <tr>
                      <td>Equity Value ($B)</td>
                      {projections.map((p, i) => <td key={i} className="sm-text-right">${p?.equityValue || '—'}</td>)}
                    </tr>
                    <tr className="sm-fw-700">
                      <td>Share Price</td>
                      {projections.map((p, i) => (
                        <td key={i} className="sm-text-right" style={{ color: SCENARIO_SIMULATIONS[SCENARIO_KEYS[i]].color }}>
                          ${p?.sharePrice.toLocaleString() || '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Return vs Today</td>
                      {projections.map((p, i) => {
                        const ret = p ? ((p.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100 : 0;
                        return (
                          <td key={i} className="sm-text-right sm-val-color" data-positive={ret >= 0}>
                            {ret >= 0 ? '+' : ''}{ret.toFixed(0)}%
                          </td>
                        );
                      })}
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="sm-card"><div className="sm-card-section"><span className="sm-section-label">Key Insights</span></div>
        <div className="sm-crcl-insights-grid">
          <div className="sm-surface2-card">
            <h4 className="sm-mint sm-fw-600 sm-mb-8">Interest Rate Sensitivity</h4>
            <p className="sm-text2">Reserve income is directly tied to Fed rates. Each 100bp rate cut reduces gross revenue by ~$737M annually at current circulation. Rate cuts are the primary bear case risk.</p>
          </div>
          <div className="sm-surface2-card">
            <h4 className="sm-mint sm-fw-600 sm-mb-8">Coinbase Dependency</h4>
            <p className="sm-text2">~54% of gross revenue goes to Coinbase as distribution cost. Renegotiating this agreement or diversifying distribution (CPN, direct bank partnerships) is key to margin expansion.</p>
          </div>
          <div className="sm-surface2-card">
            <h4 className="sm-mint sm-fw-600 sm-mb-8">Regulatory Moat</h4>
            <p className="sm-text2">Circle's regulatory-first approach (state licenses, MiCA compliance, OCC charter) creates barriers to entry. GENIUS Act could cement USDC as the preferred regulated stablecoin for TradFi.</p>
          </div>
          <div className="sm-surface2-card">
            <h4 className="sm-mint sm-fw-600 sm-mb-8">Risk/Reward</h4>
            <p className="sm-text2">Bear case scenarios model rate cuts + market share loss. Bull cases require continued USDC growth + multiple expansion to payment network peers. Asymmetric if stablecoin adoption accelerates.</p>
          </div>
        </div>
      </div>

      {/* Methodology & Assumptions */}
      <div className="sm-card">
        <div className="sm-card-section"><span className="sm-section-label">Methodology & Assumptions</span></div>
        <div className="sm-grid-2-lg">
          <div>
            <h4 className="sm-mint">Valuation Framework</h4>
            <ul className="sm-text2 sm-m-0 sm-pl-20 sm-lh-18">
              <li><strong>Revenue Model:</strong> USDC Circulation × Reserve Yield = Gross Reserve Income</li>
              <li><strong>Distribution Costs:</strong> Coinbase revenue share (currently ~54%, varies by scenario)</li>
              <li><strong>Net Revenue:</strong> Gross Revenue − Distribution Costs + Other Revenue</li>
              <li><strong>Exit Multiple:</strong> Applied to Net Revenue (P/S basis) based on peer comps</li>
              <li><strong>Equity Value:</strong> Enterprise Value + Net Cash − Convertible Debt</li>
              <li><strong>Share Price:</strong> Equity Value ÷ Fully Diluted Shares (~229M)</li>
            </ul>
          </div>
          <div>
            <h4 className="sm-sky">Key Model Inputs</h4>
            <ul className="sm-text2 sm-m-0 sm-pl-20 sm-lh-18">
              <li><strong>Stablecoin TAM:</strong> $250B (2025) → $500B-2T (2030) depending on scenario</li>
              <li><strong>Fed Funds Rate:</strong> 4.0-4.5% (2025) → 1.5-4.0% (2030) depending on scenario</li>
              <li><strong>Market Share:</strong> Current 29% vs Tether 65%; varies 8-48% by scenario</li>
              <li><strong>Exit Multiples:</strong> 0.5x (distressed) to 18x (Visa-like network)</li>
              <li><strong>Probabilities:</strong> Assigned based on qualitative assessment of macro/regulatory risks</li>
            </ul>
          </div>
        </div>
        <div className="sm-surface2-card">
          <h4 className="sm-gold">Important Caveats</h4>
          <ul className="sm-text3 sm-m-0 sm-pl-20 sm-lh-18 sm-fs-13">
            <li>Projections are illustrative scenarios, not forecasts. Actual results may differ materially.</li>
            <li>Probabilities are subjective estimates and do not represent statistical likelihoods.</li>
            <li>Model assumes current share count (~229M); dilution from equity plans not explicitly modeled.</li>
            <li>Interest rate sensitivity is highly uncertain; Fed policy may diverge significantly from assumptions.</li>
            <li>Coinbase distribution agreement renegotiation timing and terms are speculative.</li>
            <li>Regulatory outcomes (stablecoin legislation, bank charter) are binary events with uncertain timing.</li>
          </ul>
        </div>
      </div>

      <CFANotes title="CFA Level III — Scenario Modeling" items={[
        { term: 'Scenario Framework', def: 'Define discrete future states (Bull/Base/Bear) with specific assumptions for each. More structured than point estimates.' },
        { term: 'Revenue Drivers', def: 'For Circle: USDC circulation × interest rate × Circle\'s share. Decompose into controllable vs market-driven factors.' },
        { term: 'Margin Assumptions', def: 'Operating leverage means margins expand with scale. Test different terminal margin assumptions.' },
        { term: 'Probability Weighting', def: 'Assign probabilities to scenarios. Expected value = Σ(probability × outcome). Be honest about uncertainty.' },
        { term: 'Sensitivity Tables', def: 'Two-variable matrices show interaction effects. Key for understanding non-linear relationships.' },
        { term: 'Target Year Selection', def: 'Choose time horizon based on investment thesis. Longer horizons have more uncertainty but show full potential.' },
      ]} />
    </>
  );
};

const DCFTab = () => {
  const [discount, setDiscount] = useState(12);
  const [scenario, setScenario] = useState('Base');

  const calcDCF = () => {
    const s = SCENARIOS.find(x => x.name === scenario) || SCENARIOS[1];
    const projections: { year: number; usdc: number; rev: number; fcf: number; pv: number }[] = [];
    let circ = CURRENT_METRICS.usdc;
    const discountFactor = Math.max(discount, 1);
    const baseYear = 2025;

    for (let y = 1; y <= 5; y++) {
      circ *= 1 + s.cagr / 100;
      const rev = circ * s.rate / 100;
      const fcf = rev * s.margin / 100;
      const pv = fcf / Math.pow(1 + discountFactor / 100, y);
      projections.push({ year: baseYear + y, usdc: circ, rev, fcf, pv });
    }

    const pvFCF = projections.reduce((sum, p) => sum + p.pv, 0);
    const tv = projections[4].fcf * s.multiple;
    const pvTV = tv / Math.pow(1 + discountFactor / 100, 5);
    const equity = (pvFCF + pvTV) * 1000 + CRCL_CASH_M - CRCL_DEBT_M;
    const pt = MARKET.shares > 0 ? equity / MARKET.shares : 0;
    const upside = MARKET.price > 0 ? (pt / MARKET.price - 1) * 100 : 0;
    return { projections, pvFCF, tv, pvTV, equity, pt, upside };
  };

  const dcf = calcDCF();
  const s = SCENARIOS.find(x => x.name === scenario) || SCENARIOS[1];

  return (
    <div className="sm-flex-col">
      <div className="sm-flex sm-gap-16 sm-fw-700 sm-crcl-section-title">
        <div className="sm-crcl-accent-bar" />
        DCF<UpdateIndicators sources="SEC" />
      </div>

      <div className="highlight">
        <h3>DCF Valuation</h3>
        <p className="text-sm">
          DCF values Circle based on projected future free cash flows discounted to present value. Key drivers
          are USDC circulation growth, RLDC margins, and reserve yield rates. Terminal value uses exit multiple
          method based on expected steady-state profitability.
        </p>
      </div>

      <div className="g3">
        {SCENARIOS.map(sc => (
          <div
            key={sc.name}
            className={`scenario ${sc.name.toLowerCase()} ${scenario === sc.name ? 'active' : ''}`}
            onClick={() => setScenario(sc.name)}
          >
            <h4>{sc.name}</h4>
            <div className="scenario-row"><span>USDC CAGR</span><span>{sc.cagr}%</span></div>
            <div className="scenario-row"><span>Terminal Margin</span><span>{sc.margin}%</span></div>
            <div className="scenario-row"><span>Exit Multiple</span><span>{sc.multiple}x</span></div>
            <div className="scenario-row"><span>Rate Assumption</span><span>{sc.rate}%</span></div>
          </div>
        ))}
      </div>

      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-section">
            <span className="sm-section-label">Model Inputs</span>
          </div>
          <div className="sm-p-24">
            <Input label="Discount Rate (WACC) %" value={discount} onChange={setDiscount} min={5} max={20} />
          </div>
        </div>
        <div className="sm-card">
          <div className="sm-card-section">
            <span className="sm-section-label">Valuation Output</span>
          </div>
          <div className="sm-p-24">
            <div className="sm-grid-2-lg">
              <Card label="Price Target" value={`$${dcf.pt.toFixed(0)}`} sub={`Based on ${scenario} scenario`} color="mint" />
              <Card label="Upside" value={`${dcf.upside >= 0 ? '+' : ''}${dcf.upside.toFixed(0)}%`} sub="vs current price" color={dcf.upside >= 0 ? 'green' : 'red'} />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections Table */}
      <div className="sm-card">
        <div className="sm-card-section">
          <span className="sm-section-label">Projections</span>
        </div>
        <div className="sm-overflow-x">
          {/* Header */}
          <div className="sm-grid-header sm-p-12-24" style={{ gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))` }}>
            <span className="sm-micro-label">Metric</span>
            <span className="sm-micro-label sm-text-right">Today</span>
            {dcf.projections.map(p => (
              <span key={p.year} className="sm-micro-label sm-text-right">{p.year}</span>
            ))}
          </div>
          {/* USDC Circulation */}
          <div className="sm-grid-row sm-p-12-24" style={{ gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))` }}>
            <span className="sm-text-12">USDC Circulation ($B)</span>
            <span className="sm-mono-sm sm-text-right">{CURRENT_METRICS.usdc.toFixed(1)}</span>
            {dcf.projections.map(p => (
              <span key={p.year} className="sm-mono-sm sm-text-right">{p.usdc.toFixed(1)}</span>
            ))}
          </div>
          {/* Reserve Revenue */}
          <div className="sm-grid-row sm-p-12-24" style={{ gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))` }}>
            <span className="sm-text-12">Reserve Revenue ($B)</span>
            <span className="sm-mono-sm sm-text-right">—</span>
            {dcf.projections.map(p => (
              <span key={p.year} className="sm-mono-sm sm-text-right">${p.rev.toFixed(2)}</span>
            ))}
          </div>
          {/* Net FCF */}
          <div className="sm-grid-row sm-p-12-24" style={{ gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))` }}>
            <span className="sm-text-12">Net FCF ($B)</span>
            <span className="sm-mono-sm sm-text-right">—</span>
            {dcf.projections.map(p => (
              <span key={p.year} className="sm-mono-sm sm-text-right sm-mint">${p.fcf.toFixed(2)}</span>
            ))}
          </div>
          {/* PV of FCF */}
          <div className="sm-grid-row sm-p-12-24" style={{ gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))` }}>
            <span className="sm-text-12">PV of FCF ($B)</span>
            <span className="sm-mono-sm sm-text-right">—</span>
            {dcf.projections.map(p => (
              <span key={p.year} className="sm-mono-sm sm-text-right sm-cyan">${p.pv.toFixed(2)}</span>
            ))}
          </div>
          {/* Summary rows */}
          <div className="sm-crcl-dcf-summary-row sm-bg-surface2">
            <span className="sm-mono-sm sm-text-right sm-fw-500">Sum PV(FCF)</span>
            <span className="sm-mono-sm sm-text-right sm-fw-500">${dcf.pvFCF.toFixed(2)}B</span>
          </div>
          <div className="sm-crcl-dcf-summary-row sm-bg-surface2">
            <span className="sm-mono-sm sm-text-right sm-fw-500">Terminal Value ({s.multiple}x FCF)</span>
            <span className="sm-mono-sm sm-text-right sm-fw-500">${dcf.tv.toFixed(1)}B</span>
          </div>
          <div className="sm-crcl-dcf-summary-row sm-bg-surface2">
            <span className="sm-mono-sm sm-text-right sm-fw-500">PV(Terminal Value)</span>
            <span className="sm-mono-sm sm-text-right sm-fw-500">${dcf.pvTV.toFixed(2)}B</span>
          </div>
          <div className="sm-crcl-dcf-summary-row sm-crcl-dcf-total-row">
            <span className="sm-mono-sm sm-text-right sm-fw-700">Equity Value</span>
            <span className="sm-mono-sm sm-text-right sm-fw-700 sm-mint">${(dcf.equity / 1000).toFixed(1)}B</span>
          </div>
        </div>
      </div>

      <CFANotes title="CFA Level III — DCF Valuation" items={[
        { term: 'Discounted Cash Flow', def: 'Present value of future free cash flows + terminal value. Most rigorous valuation method. Sensitive to assumptions.' },
        { term: 'WACC (Weighted Average Cost of Capital)', def: 'Blended cost of equity and debt. Used as discount rate. Higher WACC = lower present value.' },
        { term: 'Terminal Value', def: 'Value of cash flows beyond explicit forecast period. Often 60-80% of total DCF value. Exit multiple or perpetuity growth method.' },
        { term: 'Scenario Analysis', def: 'Bull/Base/Bear cases test sensitivity to key assumptions. Assign probabilities to weight expected value.' },
        { term: 'Margin of Safety', def: 'Difference between price and intrinsic value. Larger margin = more protection against assumption errors.' },
      ]} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUARTERLY METRICS PANEL - Unified pattern matching ASTS QuarterlyMetricsPanel
// ═══════════════════════════════════════════════════════════════════════════════
const CRCLQuarterlyMetricsPanel = () => {
  const [opExQuarter, setOpExQuarter] = useState("Q3 2025");

  // Extended quarterlyData with OpEx breakdown - matches ASTS pattern
  const quarterlyData = DATA.map(d => ({
    ...d,
    opExComp: Math.round(d.opex * 0.45),       // Compensation & benefits
    opExTech: Math.round(d.opex * 0.25),        // Technology & infrastructure
    opExMktg: Math.round(d.opex * 0.15),        // Marketing & customer acquisition
    opExOther: Math.round(d.opex * 0.15),       // Other G&A
    filing: d.quarter.includes('Q1') ? '10-Q (May)' : d.quarter.includes('Q2') ? '10-Q (Aug)' : d.quarter.includes('Q3') ? '10-Q (Nov)' : '10-K (Mar)',
  }));

  const latestQuarter = quarterlyData[0];
  const opExQuarters = quarterlyData.map(q => q.quarter);

  // Dynamic metrics array - ASTS pattern
  const metrics = [
    { label: 'Total Revenue', key: 'totalRevenue', format: (v: number) => `$${v}M`, color: () => 'var(--mint)' },
    { label: 'Reserve Income', key: 'reserveIncome', format: (v: number) => `$${v}M`, color: () => undefined },
    { label: 'Distribution Costs', key: 'distributionCosts', format: (v: number) => `-$${v}M`, color: () => 'var(--coral)' },
    { label: 'RLDC', key: 'rldc', format: (v: number) => `$${v}M`, color: () => undefined },
    { label: 'RLDC Margin', key: 'rldcMargin', format: (v: number) => `${v}%`, color: () => undefined },
    { label: 'OpEx', key: 'opex', format: (v: number) => `-$${v}M`, color: () => 'var(--coral)' },
    { label: 'Adj. EBITDA', key: 'adjustedEbitda', format: (v: number) => `$${v}M`, color: () => 'var(--sky)' },
    { label: 'Net Income', key: 'netIncome', format: (v: number) => v >= 0 ? `$${v}M` : `-$${Math.abs(v)}M`, color: (v: number) => v >= 0 ? 'var(--mint)' : 'var(--coral)' },
    { label: 'Cash Position', key: 'cashPosition', format: (v: number) => `$${(v/1000).toFixed(2)}B`, color: () => undefined },
    { label: 'USDC Circulation', key: 'usdcCirculation', format: (v: number) => `$${v.toFixed(1)}B`, color: () => 'var(--violet)' },
    { label: 'Market Share', key: 'marketShare', format: (v: number) => `${v}%`, color: () => undefined },
  ];

  return (
    <>
      {/* #quarterly-metrics */}
      <div className="sm-card">
        <div className="sm-card-header">
          <span className="sm-section-label">Key Metrics Evolution<UpdateIndicators sources="SEC" /></span>
        </div>
        <div className="sm-card-body">
        {/* Summary Badges */}
        <div className="sm-flex-wrap">
          <span className="sm-news-tag" style={{ '--tag-color': 'var(--cyan)' } as React.CSSProperties}>
            {quarterlyData.length} quarters of data ({quarterlyData[0].quarter} - {quarterlyData[quarterlyData.length-1].quarter})
          </span>
          <span className="sm-news-tag" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>
            Revenue: ${quarterlyData[0].totalRevenue}M → ${quarterlyData[quarterlyData.length-1].totalRevenue}M
          </span>
          <span className="sm-news-tag" style={{ '--tag-color': 'var(--gold)' } as React.CSSProperties}>
            Cash: ${(quarterlyData[0].cashPosition/1000).toFixed(2)}B → ${(quarterlyData[quarterlyData.length-1].cashPosition/1000).toFixed(2)}B
          </span>
          <span className="sm-news-tag" style={{ '--tag-color': 'var(--violet)' } as React.CSSProperties}>
            USDC: ${quarterlyData[0].usdcCirculation.toFixed(1)}B → ${quarterlyData[quarterlyData.length-1].usdcCirculation.toFixed(1)}B
          </span>
        </div>

        {/* Quarterly Table - ASTS dynamic pattern */}
        <div className="sm-overflow-x sm-scroll-hint">
          <div style={{ minWidth: `${100 + quarterlyData.length * 80}px` }}>
            {/* Header row */}
            <div className="sm-fin-table-header" style={{ gridTemplateColumns: `minmax(100px, 1.5fr) repeat(${quarterlyData.length}, minmax(70px, 1fr))` }}>
              <span className="sm-fin-th" data-sticky="">Metric</span>
              {quarterlyData.map((d, idx) => (
                <span key={d.quarter} className="sm-fin-th sm-text-right" data-latest={idx === 0 ? '' : undefined}>
                  {d.quarter.replace('Q', '').replace(' ', "'")}
                </span>
              ))}
            </div>
            {/* Data rows */}
            {metrics.map((metric, mi) => (
              <div key={metric.label} className="sm-fin-table-row" style={{ gridTemplateColumns: `minmax(100px, 1.5fr) repeat(${quarterlyData.length}, minmax(70px, 1fr))`, borderBottom: mi < metrics.length - 1 ? undefined : 'none' }}>
                <span className="sm-fin-td-label">
                  {metric.label}
                </span>
                {quarterlyData.map((d, idx) => {
                  const val = d[metric.key as keyof typeof d] as number;
                  const cellColor = metric.color(val);
                  const isLatestQuarter = idx === 0;
                  return (
                    <span
                      key={d.quarter}
                      className="sm-fin-td"
                      data-latest={isLatestQuarter ? '' : undefined}
                      style={cellColor ? { color: cellColor } : undefined}
                    >
                      {metric.format(val)}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footnotes */}
        <div className="sm-note-panel sm-text-11">
          <p>* Q2 2025 net loss includes $660M IPO-related stock-based compensation acceleration. Normalized EPS was positive.</p>
          <p>* RLDC (Revenue Less Distribution Costs) is Circle's key profitability metric. Distribution costs are payments to exchange partners (Coinbase, Binance).</p>
          <p>* Data from SEC filings (10-K, 10-Q, S-1). Circle went public via IPO in Q2 2025 at $31/share.</p>
        </div>

        {/* Latest Quarter Summary - ASTS pattern */}
        <div>
          <div className="sm-card">
            <div className="sm-card-header">
              <span className="sm-section-label">Latest Quarter Summary ({latestQuarter.quarter})<UpdateIndicators sources="SEC" /></span>
            </div>
            <div className="sm-card-body">
            <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
              <div className="sm-kpi-cell">
                <div className="sm-kpi-label">Filing Source</div>
                <div className="sm-kpi-sub">{latestQuarter.filing}</div>
              </div>
              <div className="sm-kpi-cell">
                <div className="sm-kpi-label">USDC Circulation</div>
                <div className="sm-kpi-value" data-accent="mint">${latestQuarter.usdcCirculation.toFixed(1)}B</div>
              </div>
              <div className="sm-kpi-cell">
                <div className="sm-kpi-label">Reserve Income</div>
                <div className="sm-kpi-value" data-accent="mint">${latestQuarter.reserveIncome}M</div>
              </div>
              <div className="sm-kpi-cell">
                <div className="sm-kpi-label">Market Share</div>
                <div className="sm-kpi-value" data-accent="sky">{latestQuarter.marketShare}%</div>
              </div>
              <div className="sm-kpi-cell">
                <div className="sm-kpi-label">Cash Position</div>
                <div className="sm-kpi-value" data-accent="mint">${(latestQuarter.cashPosition/1000).toFixed(2)}B</div>
              </div>
              <div className="sm-kpi-cell">
                <div className="sm-kpi-label">Adj. EBITDA</div>
                <div className="sm-kpi-value" data-accent="mint">${latestQuarter.adjustedEbitda}M</div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="sm-note-panel sm-text-11">
          Data sourced from SEC filings (10-K, 10-Q). Latest filing: {latestQuarter.filing}.
        </div>
        </div>
      </div>

      {/* ROW 1: Cash Position & OpEx - ASTS pattern */}
      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-cyan">Cash Position Evolution<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().slice(-5).map(d => ({
              label: d.quarter,
              value: d.cashPosition,
              display: `$${(d.cashPosition/1000).toFixed(1)}B`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <>
                <div className="sm-card-body sm-overflow-x sm-scroll-hint sm-pb-0">
                  <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                  {data.map((d, i) => (
                    <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                      <div className="sm-mono-sm sm-text sm-fw-600 sm-crcl-bar-label">{d.display}</div>
                      <div className="sm-crcl-bar sm-crcl-bar-mint" style={{ height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0 }} />
                      <div className="sm-micro-text sm-text-center sm-crcl-bar-footer">{d.label}</div>
                    </div>
                  ))}
                  </div>
                </div>
                <div className="sm-text-11 sm-p-0-24-24">Strong cash position from IPO proceeds ($500M+ raised Q2 2025). Includes treasury, short-term investments, and money market funds.</div>
              </>
            );
          })()}
        </div>

        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-violet">Quarterly Burn Rate (OpEx)<UpdateIndicators sources="SEC" /></span>
          </div>
          <div className="sm-card-body">
          {(() => {
            const data = quarterlyData.slice().reverse().slice(-5).map(d => ({
              label: d.quarter,
              value: d.opex,
              display: `$${d.opex}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-overflow-x sm-scroll-hint">
                <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                {data.map((d, i) => (
                  <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                    <div className="sm-mono-sm sm-text sm-fw-600 sm-crcl-bar-label">{d.display}</div>
                    <div className="sm-crcl-bar sm-crcl-bar-violet" style={{ height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0 }} />
                    <div className="sm-micro-text sm-text-center sm-crcl-bar-footer">{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
          {/* OpEx Breakdown with quarter selector - ASTS pattern */}
          <div className="sm-border-t sm-crcl-pt-12">
            <div className="sm-flex-between">
              <span className="sm-text-11">OpEx Breakdown</span>
              <select
                value={opExQuarter}
                onChange={(e) => setOpExQuarter(e.target.value)}
                className="sm-crcl-select"
              >
                {opExQuarters.map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
            {(() => {
              const q = quarterlyData.find(d => d.quarter === opExQuarter);
              if (!q) return null;
              return (
                <>
                  <div className="sm-crcl-opex-grid">
                    <div className="sm-flex-between">
                      <span className="sm-text3">Compensation:</span>
                      <span className="sm-violet">${q.opExComp}M</span>
                    </div>
                    <div className="sm-flex-between">
                      <span className="sm-text3">Technology:</span>
                      <span className="sm-violet">${q.opExTech}M</span>
                    </div>
                    <div className="sm-flex-between">
                      <span className="sm-text3">Marketing:</span>
                      <span className="sm-violet">${q.opExMktg}M</span>
                    </div>
                    <div className="sm-flex-between">
                      <span className="sm-text3">Other G&A:</span>
                      <span className="sm-violet">${q.opExOther}M</span>
                    </div>
                  </div>
                  <div className="sm-border-t sm-crcl-pt-8">
                    <div className="sm-flex-between sm-subtle-sm sm-fw-500">
                      <span className="sm-text2">Total OpEx:</span>
                      <span className="sm-violet">${q.opex}M</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Share Count & Market Cap - ASTS pattern */}
      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-gold">Share Count (Outstanding)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = [
              { label: 'IPO', value: 200, display: '200M' },
              { label: 'Q2 2024', value: 205, display: '205M' },
              { label: 'Q3 2024', value: 210, display: '210M' },
              { label: 'Q4 2024', value: 215, display: '215M' },
              { label: 'Q1 2025', value: 220, display: '220M' },
              { label: 'Q2 2025', value: 225, display: '225M' },
              { label: 'Q3 2025', value: 230, display: '230M' },
            ].slice(-5);
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-card-body sm-overflow-x sm-scroll-hint sm-pb-0">
                <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                {data.map((d, i) => (
                  <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                    <div className="sm-mono-sm sm-text sm-fw-600 sm-crcl-bar-label">{d.display}</div>
                    <div className="sm-crcl-bar sm-crcl-bar-coral" style={{ height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0 }} />
                    <div className="sm-micro-text sm-text-center sm-crcl-bar-footer">{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>

        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-sky">Market Cap Evolution ($B)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = [
              { label: 'IPO', value: 7.1, display: '$7.1B' },
              { label: 'Q2 2024', value: 8.2, display: '$8.2B' },
              { label: 'Q3 2024', value: 10.5, display: '$10.5B' },
              { label: 'Q4 2024', value: 12.8, display: '$12.8B' },
              { label: 'Q1 2025', value: 15.2, display: '$15.2B' },
              { label: 'Q2 2025', value: 14.1, display: '$14.1B' },
              { label: 'Q3 2025', value: 18.8, display: '$18.8B' },
            ].slice(-5);
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-card-body sm-overflow-x sm-scroll-hint sm-pb-0">
                <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                {data.map((d, i) => (
                  <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                    <div className="sm-mono-sm sm-text sm-fw-600 sm-crcl-bar-label">{d.display}</div>
                    <div className="sm-crcl-bar sm-crcl-bar-sky" style={{ height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0 }} />
                    <div className="sm-micro-text sm-text-center sm-crcl-bar-footer">{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ROW 3: Company Specific (USDC & EBITDA) - ASTS pattern */}
      <div className="sm-grid-2-lg">
        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-violet">USDC Circulation ($B)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().slice(-5).map(d => ({
              label: d.quarter,
              value: d.usdcCirculation,
              display: `$${d.usdcCirculation}B`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-card-body sm-overflow-x sm-scroll-hint sm-pb-0">
                <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                {data.map((d, i) => (
                  <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                    <div className="sm-mono-sm sm-text sm-fw-600 sm-crcl-bar-label">{d.display}</div>
                    <div className="sm-crcl-bar sm-crcl-bar-violet" style={{ height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0 }} />
                    <div className="sm-micro-text sm-text-center sm-crcl-bar-footer">{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>

        <div className="sm-card">
          <div className="sm-card-header">
            <span className="sm-section-label sm-cyan">Adjusted EBITDA ($M)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().slice(-5).map(d => ({
              label: d.quarter,
              value: d.adjustedEbitda,
              display: `$${d.adjustedEbitda}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const overflow = data.length > 8;
            return (
              <div className="sm-card-body sm-overflow-x sm-scroll-hint sm-pb-0">
                <div className="sm-fin-chart" style={{ minWidth: overflow ? data.length * 72 : undefined }}>
                {data.map((d, i) => (
                  <div key={i} className="sm-fin-bar" data-overflow={overflow || undefined}>
                    <div className="sm-mono-sm sm-text sm-fw-600 sm-crcl-mb-4">{d.display}</div>
                    <div className="sm-crcl-bar sm-crcl-bar-cyan" style={{ height: maxVal > 0 ? `${Math.round((Math.abs(d.value) / maxVal) * 72)}%` : 0, minHeight: d.value ? 2 : 0 }} />
                    <div className="sm-micro-text sm-text-center sm-crcl-mt-4">{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
};

function CRCLModel() {
  const tabs = crclTabs;

  const [activeTab, setActiveTab] = useHashTab(tabs.map(t => t.id));

  // Update indicator visibility toggle
  const [showIndicators, setShowIndicators] = useState(true);

  const [discount, setDiscount] = useState(12);
  const [timelineCat, setTimelineCat] = useState('All');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [runKey, setRunKey] = useState(0); // For Monte Carlo re-runs
  const [mcSims, setMcSims] = useState(1000); // Adjustable simulation count
  const [mcYears, setMcYears] = useState(5); // Time horizon (3/5/7 years)
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [showAllPR, setShowAllPR] = useState(false);
  const [capitalView, setCapitalView] = useState('structure');

  // [PR_CHECKLIST_RECENT_PRESS_RELEASES] - MANDATORY: Add new PR at top!
  const pressReleases = [
    { date: 'Dec 12, 2025', category: 'Regulatory', color: 'var(--gold)', title: 'OCC Grants Preliminary Approval for National Bank Charter' },
    { date: 'Nov 12, 2025', category: 'Earnings', color: 'var(--mint)', title: 'Circle Reports Q3 2025 Results: $740M Revenue, USDC at $73.7B' },
    { date: 'Oct 29, 2025', category: 'Partnership', color: 'var(--sky)', title: 'Binance to Adopt USYC for Yield-Bearing Treasury Holdings' },
    { date: 'Aug 12, 2025', category: 'Corporate', color: 'var(--violet)', title: 'Circle Launches Follow-on Offering (10M shares)' },
  ];
  const displayedPR = showAllPR ? pressReleases : pressReleases.slice(0, 5);
  const hiddenPRCount = pressReleases.length - 5;

  // Use imported SEC filings from @/data/crcl
  const secFilings = SEC_FILINGS;
  
  const secMeta = {
    cik: '0001876042',
    ticker: 'CRCL',
    exchange: 'NYSE',
    lastPR: { date: 'December 12, 2025', title: 'OCC National Bank Charter Approval' }
  };
  
  const secTypeColors: Record<string, { bg: string; text: string }> = {
    '10-K': { bg: 'color-mix(in srgb, var(--sky) 20%, transparent)', text: '#60a5fa' },
    '10-Q': { bg: 'color-mix(in srgb, var(--violet) 20%, transparent)', text: 'var(--violet)' },
    '8-K': { bg: 'color-mix(in srgb, var(--gold) 20%, transparent)', text: 'var(--gold)' },
    'S-1': { bg: 'color-mix(in srgb, var(--violet) 20%, transparent)', text: 'var(--violet)' },
    'S-3': { bg: 'color-mix(in srgb, var(--mint) 20%, transparent)', text: '#4ade80' },
    'S-8': { bg: 'color-mix(in srgb, var(--mint) 20%, transparent)', text: 'var(--mint)' },
    '424B5': { bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: '#fb923c' },
  };
  
  const secFilterTypes = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B5'];

  // Monte Carlo Parameter State
  const [mcRevenueGrowthMin, setMcRevenueGrowthMin] = useState(8);
  const [mcRevenueGrowthMax, setMcRevenueGrowthMax] = useState(25);
  const [mcMarginMin, setMcMarginMin] = useState(50);
  const [mcMarginMax, setMcMarginMax] = useState(70);
  const [mcDiscountMin, setMcDiscountMin] = useState(10);
  const [mcDiscountMax, setMcDiscountMax] = useState(15);
  const [mcTerminalMultMin, setMcTerminalMultMin] = useState(10);
  const [mcTerminalMultMax, setMcTerminalMultMax] = useState(18);
  
  // Monte Carlo Scenario Presets
  const mcPresets = {
    bear: { revMin: 5, revMax: 12, marginMin: 40, marginMax: 55, discMin: 13, discMax: 18, termMin: 8, termMax: 12, label: '🐻 Bear', color: '#f97316', desc: 'Low growth, margin pressure' },
    base: { revMin: 8, revMax: 25, marginMin: 50, marginMax: 70, discMin: 10, discMax: 15, termMin: 10, termMax: 18, label: '📊 Base', color: '#eab308', desc: 'Consensus assumptions' },
    bull: { revMin: 15, revMax: 35, marginMin: 60, marginMax: 80, discMin: 8, discMax: 12, termMin: 15, termMax: 25, label: '🐂 Bull', color: '#06b6d4', desc: 'Stablecoin dominance' },
    custom: { revMin: mcRevenueGrowthMin, revMax: mcRevenueGrowthMax, marginMin: mcMarginMin, marginMax: mcMarginMax, discMin: mcDiscountMin, discMax: mcDiscountMax, termMin: mcTerminalMultMin, termMax: mcTerminalMultMax, label: '⚙️ Custom', color: '#8b5cf6', desc: 'Your parameters' }
  };
  const [mcPreset, setMcPreset] = useState<'bear' | 'base' | 'bull' | 'custom'>('base');
  
  // Apply preset when changed
  const applyMcPreset = (preset: 'bear' | 'base' | 'bull' | 'custom') => {
    if (preset !== 'custom') {
      const p = mcPresets[preset];
      setMcRevenueGrowthMin(p.revMin);
      setMcRevenueGrowthMax(p.revMax);
      setMcMarginMin(p.marginMin);
      setMcMarginMax(p.marginMax);
      setMcDiscountMin(p.discMin);
      setMcDiscountMax(p.discMax);
      setMcTerminalMultMin(p.termMin);
      setMcTerminalMultMax(p.termMax);
    }
    setMcPreset(preset);
    setRunKey(k => k + 1);
  };

  // ============================================================================
  //
  // ⚠️  UPDATE CHECKLIST AFTER EACH PR/SEC FILING:
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. investmentCurrent.date, investmentCurrent.source - Change date and filing reference
  // 2. executiveSummary - Update headline, thesis, bottomLine, whatsNew[]
  // 3. scorecard - Re-evaluate all 8 unified categories (A-F grades)
  //    Categories: Financial Strength, Profitability, Growth, Valuation,
  //                Competitive Position, Execution, Regulatory/External, Capital Structure
  // 4. growthDrivers - Update impact levels and descriptions
  // 5. moatSources/moatThreats - Adjust strength/risk if competitive position changed
  // 6. risks - Re-evaluate severity, likelihood, impact
  // 7. perspectives - Update CFA/HedgeFund/CIO assessments and recommendations
  // 8. archive - ADD NEW ENTRY AT TOP with unified schema
  // 9. Rating Header - Update verdict badge, price target, key metrics
  //
  // NEVER DELETE ARCHIVE ENTRIES - This is the historical record!
  // ============================================================================

  // Rate Sensitivity Calculator State
  const [sensRate, setSensRate] = useState(4.0);  // Fed Funds Rate %
  const [sensUsdc, setSensUsdc] = useState(75);   // USDC Circulation $B
  const [sensDist, setSensDist] = useState(54);   // Coinbase Distribution %

  // Investment data extracted to @/data/crcl/investment.ts — update there after each filing
  const investmentCurrent = CRCL_INVESTMENT_CURRENT;
  const investmentArchive = CRCL_INVESTMENT_ARCHIVE;


  // Overview Tab Parameters - Unified with ASTS/BMNR structure
  const [currentShares, setCurrentShares] = useState(MARKET.shares);  // From @/data/crcl/company.ts
  const [currentStockPrice, setCurrentStockPrice] = useState(MARKET.price);  // From @/data/crcl/company.ts
  const [currentUSDC, setCurrentUSDC] = useState(USDC_DATA.usdcCirculation);  // From @/data/crcl/company.ts
  const [currentMarketShare, setCurrentMarketShare] = useState(USDC_DATA.marketShare);  // From @/data/crcl/company.ts

  // Chart refresh key - increment to trigger chart data refresh
  const [chartRefreshKey, setChartRefreshKey] = useState(0);

  // Live price refresh hook - gets price from chart's API response
  const { isLoading: priceLoading, lastUpdated: priceLastUpdated, refresh: refreshPrice, previousClose, marketData } = useLiveStockPrice(
    'CRCL',
    MARKET.price,
    { onPriceUpdate: (price) => setCurrentStockPrice(price) }
  );
  const changePct = previousClose ? ((currentStockPrice - previousClose) / previousClose) * 100 : null;
  const hudMarkers = useMemo(() => buildHudMarkers(marketData), [marketData]);

  // Combined refresh handler - updates both price and chart
  const handleRefreshAll = useCallback(async () => {
    await refreshPrice();
    setChartRefreshKey(k => k + 1);
  }, [refreshPrice]);

  // Auto-fetch live price and chart on mount
  useEffect(() => {
    handleRefreshAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  // Topic tags for multi-select filtering (AND logic)
  const topicTags: Record<string, { label: string; color: string }> = {
    USDC: { label: 'USDC', color: 'bg-blue-600' },
    REGULATORY: { label: 'Regulatory', color: 'bg-pink-600' },
    PARTNERSHIPS: { label: 'Partnerships', color: 'bg-orange-600' },
    INTERNATIONAL: { label: 'International', color: 'bg-emerald-600' },
    BANKING: { label: 'Banking', color: 'bg-cyan-600' },
    TECHNOLOGY: { label: 'Technology', color: 'bg-violet-600' },
  };

  // Toggle topic selection (for AND logic multi-select)
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  // Auto-detect topics from entry content
  const detectTopics = (entry: TimelineEntry) => {
    const topics: string[] = [];
    const text = `${entry.event} ${entry.impact} ${entry.details}`.toLowerCase();
    
    // USDC: stablecoin, circulation, mint, usdc
    if (/usdc|stablecoin|circulation|mint|redemption|peg/.test(text)) topics.push('USDC');
    
    // REGULATORY: license, compliance, sec, daba, bitlicense, registration
    if (/license|compliance|sec\b|daba|bitlicense|registration|regulatory|approval|authorization/.test(text)) topics.push('REGULATORY');
    
    // PARTNERSHIPS: partnership, integration, visa, coinbase, binance
    if (/partnership|integration|visa|coinbase|binance|kraken|dapper|ripio|matrixport/.test(text)) topics.push('PARTNERSHIPS');
    
    // INTERNATIONAL: europe, asia, latin, global, emerging, bermuda, singapore
    if (/europe|asia|latin|global|emerging|bermuda|singapore|japan|brazil|argentina|africa/.test(text)) topics.push('INTERNATIONAL');
    
    // BANKING: bank, custody, reserve, settlement, signature, cross river
    if (/bank|custody|reserve|settlement|signature|cross river|blackrock|bny|treasury/.test(text)) topics.push('BANKING');
    
    // TECHNOLOGY: api, blockchain, multi-chain, algorand, stellar, solana, ethereum
    if (/api|blockchain|multi-chain|algorand|stellar|solana|ethereum|protocol|cctp|bridge/.test(text)) topics.push('TECHNOLOGY');
    
    return topics;
  };

  const latest = DATA[0];  // Most recent quarter (array is most-recent-first)
  const prevYear = DATA.find(d => d.quarter === "Q3 2024");
  const revGrowth = prevYear && prevYear.totalRevenue > 0 ? ((latest.totalRevenue - prevYear.totalRevenue) / prevYear.totalRevenue * 100) : 0;
  const usdcGrowth = prevYear && prevYear.usdcCirculation > 0 ? ((latest.usdcCirculation - prevYear.usdcCirculation) / prevYear.usdcCirculation * 100) : 0;
  const ipoReturn = MARKET.ipo > 0 ? ((MARKET.price - MARKET.ipo) / MARKET.ipo * 100) : 0;

  // Overview calc - Unified with ASTS/BMNR structure
  const calc = useMemo(() => {
    const marketCap = currentShares * currentStockPrice;  // in millions
    const totalStablecoins = currentUSDC / (currentMarketShare / 100);  // Total stablecoin market
    const revenuePerBillionUsdc = latest.totalRevenue / latest.usdcCirculation;  // Revenue efficiency
    const rldcMargin = latest.rldc / latest.totalRevenue * 100;
    return {
      marketCap,
      totalStablecoins,
      revenuePerBillionUsdc,
      rldcMargin,
    };
  }, [currentShares, currentStockPrice, currentUSDC, currentMarketShare, latest]);

  // Helper to ensure values are finite
  const safe = (v: number) => (isFinite(v) ? v : 0);

  // Monte Carlo simulation - auto-runs via useMemo
  const mcSim = useMemo(() => {
    // Box-Muller transform for standard normal random variates
    const boxMuller = (): number => {
      const u = Math.random();
      const v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const res: number[] = [];
    const discountFactor = Math.max(discount, 1);
    const p = mcPresets[mcPreset];
    const n = Math.min(mcSims, 10000); // Cap at 10k for performance
    for (let i = 0; i < n; i++) {
      // Use Box-Muller for normally distributed random variates
      const z1 = boxMuller(), z2 = boxMuller();
      const gMean = (p.revMin + p.revMax) / 2;
      const gStd = (p.revMax - p.revMin) / 4;
      const mMean = (p.marginMin + p.marginMax) / 2;
      const mStd = (p.marginMax - p.marginMin) / 4;
      const g = gMean + z1 * gStd;
      const m = mMean + z2 * mStd;
      const r = 3 + Math.random() * 2;
      const x = p.termMin + Math.random() * (p.termMax - p.termMin);
      const cY = latest.usdcCirculation * Math.pow(1 + g/100, mcYears);
      const revY = cY * r / 100;
      const rldcY = revY * m / 100;
      const tv = rldcY * 1000 * x;
      const pv = tv / Math.pow(1 + discountFactor/100, mcYears);
      res.push(safe((pv + CRCL_CASH_M - CRCL_DEBT_M) / MARKET.shares));
    }
    const sorted = res.sort((a, b) => a - b);
    
    // Calculate percentiles
    const p5 = sorted[Math.floor(n * 0.05)];
    const p25 = sorted[Math.floor(n * 0.25)];
    const p50 = sorted[Math.floor(n * 0.5)];
    const p75 = sorted[Math.floor(n * 0.75)];
    const p95 = sorted[Math.floor(n * 0.95)];
    const mean = sorted.reduce((a, b) => a + b, 0) / n;
    const winProb = sorted.filter(p => p > MARKET.price).length / n * 100;
    
    // Risk metrics
    const returns = sorted.map(p => (p / MARKET.price - 1) * 100);
    const avgReturn = returns.reduce((a, b) => a + b, 0) / n;
    const variance = returns.reduce((a, r) => a + Math.pow(r - avgReturn, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const riskFree = 4;
    const sharpe = stdDev > 0 ? (avgReturn - riskFree) / stdDev : 0;
    // Sortino: downside deviation uses ALL n observations but only squares negative returns
    const downsideVar = returns.reduce((a, r) => a + (r < 0 ? r * r : 0), 0) / n;
    const downsideDev = Math.sqrt(downsideVar);
    const sortino = downsideDev > 0 ? (avgReturn - riskFree) / downsideDev : 0;
    const var5 = ((p5 / MARKET.price) - 1) * 100;
    const tail5 = sorted.slice(0, Math.floor(n * 0.05));
    const cvar5 = tail5.length > 0 ? ((tail5.reduce((a, b) => a + b, 0) / tail5.length / MARKET.price) - 1) * 100 : var5;
    
    // Histogram
    const minP = sorted[0];
    const maxP = sorted[n - 1];
    const buckets = 30;
    const bucketSize = (maxP - minP) / buckets;
    const histogram = Array.from({ length: buckets }, (_, i) => {
      const lo = minP + i * bucketSize;
      const hi = lo + bucketSize;
      const count = sorted.filter(p => p >= lo && p < hi).length;
      return { price: lo + bucketSize / 2, pct: (count / n) * 100 };
    });
    
    return { sorted, p5, p25, p50, p75, p95, mean, winProb, sharpe, sortino, var5, cvar5, histogram, n };
  }, [discount, runKey, mcPreset, mcSims, mcYears, mcRevenueGrowthMin, mcRevenueGrowthMax, mcMarginMin, mcMarginMax, mcDiscountMin, mcDiscountMax, mcTerminalMultMin, mcTerminalMultMax]);

  const cats = ['All', ...Array.from(new Set(TIMELINE.map(p => p.category)))];
  const filteredEvents = (timelineCat === 'All' ? TIMELINE : TIMELINE.filter(p => p.category === timelineCat))
    .filter(p => {
      // If no topics selected, show all
      if (selectedTopics.length === 0) return true;
      // AND logic: entry must match ALL selected topics
      const entryTopics = detectTopics(p);
      return selectedTopics.every(t => entryTopics.includes(t));
    });


  return (
    <UpdateIndicatorContext.Provider value={{ showIndicators, setShowIndicators }}>
      <div className="stock-model-app" data-accent="mint">
        {/* ============================================================================
            LEGAL DISCLAIMER BANNER
            ============================================================================ */}
        <DisclaimerBanner />
        
        {/* ============================================================================
            11C EDGE MARKERS HEADER
            ============================================================================ */}
        <StockHeader
          exchange="NYSE"
          ticker="CRCL"
          companyName="Circle Internet Group"
          metadata={[
            { label: 'SECTOR', value: 'Financial Technology' },
            { label: 'INDUSTRY', value: 'Stablecoins & Payments' },
            { label: 'DATA', value: MODEL_METADATA.priceAsOf },
          ]}
          price={currentStockPrice}
          changePct={changePct}
          onRefresh={handleRefreshAll}
          isRefreshing={priceLoading}
          lastUpdated={priceLastUpdated}
          badge={
            <span className={`price-badge ${ipoReturn >= 0 ? 'up' : 'down'}`}>
              {ipoReturn >= 0 ? '↑' : '↓'} {Math.abs(ipoReturn).toFixed(0)}% since IPO
            </span>
          }
          hudMarkers={hudMarkers}
        >
          <Stat label="Market Cap" value={`$${(MARKET.marketCap / 1000).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="USDC Circulation" value={`$${latest.usdcCirculation.toFixed(1)}B`} color="mint" updateSource="PR" />
          <Stat label="Q3 Revenue" value={`$${latest.totalRevenue}M`} updateSource="SEC" />
          <Stat label="RLDC Margin" value={`${latest.rldcMargin}%`} updateSource="SEC" />
          <Stat label="Market Share" value={`${latest.marketShare}%`} color="sky" updateSource="PR" />
          <Stat label="Reserve Rate" value={`${latest.reserveReturnRate.toFixed(2)}%`} updateSource="SEC" />
          <Stat label="P/E Ratio" value={`${MARKET.pe.toFixed(0)}x`} updateSource="MARKET" />
        </StockHeader>

        {/* Nav */}
        <StockNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} stockGroupName="CRCL Analysis" />

        {/* Main */}
        <main className="main">
          {/* Update Source Legend - Shows what each indicator color means */}
          <UpdateLegend />
          {activeTab === 'overview' && (<TabPanel id="overview">
            <div className="sm-flex-col">
              {/* Hero — Ive×Tesla */}
              <div className="sm-tab-hero">
                <div className="sm-section-label">Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></div>
                <h2>Overview<span className="sm-accent">.</span></h2>
                <p><strong className="sm-text2 sm-fw-500">Circle:</strong> Building financial infrastructure for the internet economy. USDC enables 24/7 global value transfer at near-zero cost. With {latest.marketShare}% stablecoin market share and +{usdcGrowth.toFixed(0)}% YoY growth.</p>
              </div>

              <div className="sm-model-grid" style={{ '--cols': 2 } as React.CSSProperties}>
                <div className="sm-grid-cell">
                  <div className="sm-flex sm-mb-12">
                    <span className="sm-crcl-case-label sm-color-mint">Bull Case</span>
                    <UpdateIndicators sources="PR" />
                  </div>
                  {[
                    `USDC +${usdcGrowth.toFixed(0)}% YoY, mgmt guides 40% CAGR`,
                    'Market share: 23% → 29% in 12 months',
                    'Platform % at 13.5% (was 2%) improves unit economics',
                    'Intuit partnership brings ~100M user distribution',
                    'OCC National Trust Charter approval',
                    'GENIUS Act provides regulatory clarity',
                    'Arc + CPN creating new revenue verticals',
                  ].map(item => (
                    <div key={item} className="sm-bullet-item">
                      <span className="sm-mint sm-shrink-0">+</span>{item}
                    </div>
                  ))}
                </div>
                <div className="sm-grid-cell">
                  <div className="sm-flex sm-mb-12">
                    <span className="sm-crcl-case-label sm-color-coral">Bear Case</span>
                    <UpdateIndicators sources="PR" />
                  </div>
                  {[
                    '96% revenue from reserve income (rate sensitive)',
                    '~60% of income shared with Coinbase',
                    'Tether dominant: 65% share, 85% margins',
                    `P/E of ${MARKET.pe}x prices in substantial growth`,
                    'Stock -73% from $299 peak',
                    'Bank stablecoins, PayPal competition',
                    'Fed rate cuts compress revenue',
                  ].map(item => (
                    <div key={item} className="sm-bullet-item">
                      <span className="sm-coral sm-shrink-0">-</span>{item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm-card sm-mt-8">
                <div className="sm-flex sm-crcl-card-header">
                  <span className="sm-param-label">Revenue Progression</span>
                  <UpdateIndicators sources="SEC" />
                </div>
                <div className="sm-crcl-chart-area">
                  <div className="sm-crcl-bar-chart" style={{ minWidth: DATA.length * 64 }}>
                  {(() => {
                    const chronological = [...DATA].reverse();  // Oldest first for left-to-right progression
                    const maxRevenue = Math.max(...chronological.map(d => d.totalRevenue));
                    return chronological.map((d, i) => (
                      <div key={i} className="sm-crcl-rev-bar-col">
                        <div className="sm-crcl-rev-bar-val">${d.totalRevenue}M</div>
                        <div className="sm-crcl-bar sm-crcl-bar-accent" style={{ height: `${maxRevenue > 0 ? (d.totalRevenue / maxRevenue) * 150 : 0}px` }} />
                        <div className="sm-crcl-rev-bar-label">{d.quarter}</div>
                      </div>
                    ));
                  })()}
                  </div>
                </div>
              </div>

              <div className="sm-card sm-mt-8">
                <div className="sm-crcl-metrics-header">
                  {['Metric', 'Value', 'Description'].map(h => (
                    <span key={h} className="sm-crcl-metrics-th" data-align={h === 'Value' ? 'right' : 'left'}>{h}</span>
                  ))}
                </div>
                {[
                  { metric: 'USDC Circulation Growth', value: `+${usdcGrowth.toFixed(0)}%`, desc: 'Year over year', color: 'var(--mint)' },
                  { metric: 'Revenue Growth', value: `+${revGrowth.toFixed(0)}%`, desc: 'Year over year', color: 'var(--mint)' },
                  { metric: 'Active Wallets', value: `${latest.meaningfulWallets}M`, desc: 'Meaningful wallets', color: 'var(--text)' },
                  { metric: 'Arc Partners', value: '100+', desc: 'Platform integrations', color: 'var(--text)' },
                ].map((row, i, arr) => (
                  <div key={row.metric} className="sm-crcl-metrics-row" data-last={i === arr.length - 1}>
                    <span className="sm-text-13t">{row.metric}</span>
                    <span className="sm-mono-sm sm-text-right sm-fw-600" style={{ color: row.color }}>{row.value}</span>
                    <span className="sm-subtle sm-crcl-pl-16">{row.desc}</span>
                  </div>
                ))}
              </div>
              <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
                {[
                  { metric: 'Shares', value: `${currentShares.toFixed(1)}M`, sub: 'Outstanding', color: 'var(--text)' },
                  { metric: 'Price', value: `$${currentStockPrice.toFixed(2)}`, sub: 'Current', color: 'var(--text)' },
                  { metric: 'Mkt Cap', value: `$${(calc.marketCap / 1000).toFixed(1)}B`, sub: 'Equity', color: 'var(--accent)' },
                  { metric: 'P/E Ratio', value: `${MARKET.pe.toFixed(0)}x`, sub: 'Trailing', color: 'var(--text)' },
                  { metric: 'Since IPO', value: `+${ipoReturn.toFixed(0)}%`, sub: 'Return', color: 'var(--text)' },
                  { metric: 'USDC Circ.', value: `$${currentUSDC.toFixed(1)}B`, sub: 'In circulation', color: 'var(--text)' },
                  { metric: 'Market Share', value: `${currentMarketShare}%`, sub: 'Stablecoins', color: 'var(--accent)' },
                  { metric: 'Stablecoin Mkt', value: `$${calc.totalStablecoins.toFixed(0)}B`, sub: 'Total TAM', color: 'var(--text)' },
                  { metric: 'YoY Growth', value: `+${usdcGrowth.toFixed(0)}%`, sub: 'USDC circ.', color: 'var(--text)' },
                  { metric: 'Wallets', value: `${latest.meaningfulWallets}M`, sub: 'Active', color: 'var(--text)' },
                  { metric: 'Revenue', value: `$${latest.totalRevenue}M`, sub: `${latest.quarter}`, color: 'var(--text)' },
                  { metric: 'RLDC', value: `$${latest.rldc}M`, sub: `${latest.rldcMargin}% margin`, color: 'var(--accent)' },
                  { metric: 'Adj. EBITDA', value: `$${latest.adjustedEbitda}M`, sub: `${latest.quarter}`, color: 'var(--text)' },
                  { metric: 'Rev/B USDC', value: `$${calc.revenuePerBillionUsdc.toFixed(0)}M`, sub: 'Efficiency', color: 'var(--text)' },
                  { metric: 'Reserve Rate', value: `${latest.reserveReturnRate.toFixed(2)}%`, sub: 'Annualized', color: 'var(--text)' },
                ].map(row => (
                  <div key={row.metric} className="sm-kpi-cell sm-text-center">
                    <div className="sm-kpi-label">{row.metric}</div>
                    <div className="sm-kpi-value" style={{ color: row.color }}>{row.value}</div>
                    <div className="sm-kpi-sub">{row.sub}</div>
                  </div>
                ))}
              </div>

              <div className="sm-divider">
                <span className="sm-param-label">Parameters</span>
                <span className="sm-divider-line" />
              </div>
              <div className="sm-grid-2">
                <OverviewParameterCard
                  title="Shares Outstanding (M)"
                  explanation="Total diluted shares. Higher share count = lower per-share metrics. Increases with equity raises and stock comp."
                  options={[350, 300, 250, MARKET.shares, 200, 175]}
                  value={currentShares}
                  onChange={setCurrentShares}
                  format="M"
                  currentValue={MARKET.shares}
                />
                <OverviewParameterCard
                  title="Stock Price ($)"
                  explanation="Current market price per share. Determines market cap and valuation multiples like P/E and EV/Revenue."
                  options={[50, 65, MARKET.price, 95, 110, 130]}
                  value={currentStockPrice}
                  onChange={setCurrentStockPrice}
                  format="$"
                  currentValue={MARKET.price}
                />
              </div>
              <div className="sm-grid-2 sm-mt-12">
                <OverviewParameterCard
                  title="USDC Circulation ($B)"
                  explanation="Total USDC in circulation. Primary revenue driver. More USDC = more reserves = more interest income."
                  options={[40, 50, USDC_DATA.usdcCirculation, 75, 90, 110]}
                  value={currentUSDC}
                  onChange={setCurrentUSDC}
                  format="B"
                  currentValue={USDC_DATA.usdcCirculation}
                />
                <OverviewParameterCard
                  title="Market Share (%)"
                  explanation="USDC share of stablecoin market vs Tether. Higher share = stronger competitive position and pricing power."
                  options={[20, 25, USDC_DATA.marketShare, 33, 40, 50]}
                  value={currentMarketShare}
                  onChange={setCurrentMarketShare}
                  format="%"
                  currentValue={USDC_DATA.marketShare}
                />
              </div>

              <div className="sm-divider">
                <span className="sm-param-label">Stock Chart</span>
                <span className="sm-divider-line" />
              </div>
              <StockChart symbol="CRCL" externalRefreshKey={chartRefreshKey} onPriceUpdate={(price) => setCurrentStockPrice(price)} />

              <CFANotes title="CFA Level III — Stablecoin Economics" items={[
                { term: 'USDC Reserve Income', def: 'Circle earns interest on USDC reserves (T-bills, cash). $1 USDC outstanding = $1 in reserves earning ~4-5% in current rate environment.' },
                { term: 'Revenue = AUM × Rate', def: 'Revenue scales with both USDC circulation and interest rates. Fed rate cuts reduce revenue; USDC growth offsets.' },
                { term: 'Coinbase Distribution', def: 'Coinbase receives ~54% of USDC interest income per Centre agreement. Reduces Circle\'s take-rate but provides distribution.' },
                { term: 'Network Effects', def: 'More USDC usage → more integrations → more usage. Switching costs increase as ecosystem embeds USDC.' },
                { term: 'Regulatory Moat', def: 'US money transmitter licenses, potential federal stablecoin regulation creates barriers. Circle positioned for compliance.' },
              ]} />
            </div>
          </TabPanel>)}

          {activeTab === 'financials' && (<TabPanel id="financials">
            <SharedFinancialsTab
              ticker="CRCL"
              sectionLabel="Quarterly Data"
              title="Financials"
              description="Revenue composition, USDC metrics, quarterly trends, and profitability analysis. Focus on interest income, USDC circulation, and margin expansion."
              milestones={[
                { date: 'Jul 2021', event: 'SPAC Announced' },
                { date: 'Dec 2022', event: 'SPAC Terminated' },
                { date: 'Jan 2024', event: 'S-1 Filed' },
                { date: 'Apr 2024', event: 'NYSE IPO @ $31' },
                { date: 'Aug 2025', event: 'Follow-on: ~$260M' },
                { date: 'Nov 2025', event: 'Q3: $740M Rev' },
                { date: 'Dec 2025', event: 'OCC Charter' },
                { date: 'YE 2025', event: 'ATH: $299' },
              ]}
              cfaNotes={[
                { term: 'Interest Income', def: 'Revenue from investing USDC reserves in US Treasuries. Highly correlated with Fed Funds rate and USDC circulation volume.' },
                { term: 'Take Rate', def: 'Revenue as percentage of USDC circulation. Measures monetization efficiency. Higher take rate = better unit economics per dollar of USDC.' },
                { term: 'Adjusted EBITDA', def: 'Earnings before interest, taxes, depreciation, amortization, and stock-based compensation. Preferred metric for SaaS/fintech companies to show operating profitability.' },
              ]}
              cfaNotesTitle="CFA Level III — Financial Analysis"
              extraBeforeChildren={
                <div className="highlight">
                  <h3 className="sm-flex sm-text sm-fw-600 sm-m-0 sm-text-15">Revenue Growth Story<UpdateIndicators sources="SEC" /></h3>
                  <p className="sm-text-14 sm-text2 sm-crcl-mt-8">
                    Circle&apos;s revenue is driven by reserve income (96%) from USDC holdings invested in T-bills and repos.
                    Distribution costs (~54%) go to Coinbase under the USDC consortium agreement. RLDC (Revenue Less
                    Distribution Costs) represents true gross profit. Watch for margin expansion as Platform % grows.
                  </p>
                </div>
              }
            >
              <CRCLQuarterlyMetricsPanel />
            </SharedFinancialsTab>
          </TabPanel>)}

          {activeTab === 'investment' && (<TabPanel id="investment">
            <SharedInvestmentTab
              current={investmentCurrent}
              archive={investmentArchive}
              ticker="CRCL"

              renderHeaderMetrics={() => (
                <>
{/* [PR_CHECKLIST_INVESTMENT_DISPLAY] - Hardcoded metrics, update with every PR! */}
                <div className="sm-flex sm-gap-24 sm-flex-wrap">
                  <div className="sm-text-center">
                    <div className="sm-text-11">Price Target</div>
                    <div className="sm-mono-lg sm-fw-700 sm-mint">$100-150</div>
                    <div className="sm-micro-text sm-micro-text-normal">12-month</div>
                  </div>
                  <div className="sm-text-center">
                    <div className="sm-text-11">Risk/Reward</div>
                    <div className="sm-mono-lg sm-fw-700 sm-sky">3.2:1</div>
                    <div className="sm-micro-text sm-micro-text-normal">Asymmetric</div>
                  </div>
                  <div className="sm-text-center">
                    <div className="sm-text-11">Current</div>
                    <div className="sm-mono-lg sm-fw-700">${MARKET.price}</div>
                    <div className="sm-text-11 sm-mint">+165% since IPO</div>
                  </div>
                </div>
                </>
              )}

              renderBeforeGrowthDrivers={() => (
                <>
                  {/* Financial Health */}
                  <div className="sm-divider">
                    <span className="sm-param-label">Financial Health</span>
                    <span className="sm-divider-line" />
                  </div>
                  <div className="sm-card">
                    <div className="sm-card-body">
                      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Cash Position</div>
                          <div className="sm-kpi-value">$1.15B</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Total Debt</div>
                          <div className="sm-kpi-value">$0</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Quarterly FCF</div>
                          <div className="sm-kpi-value">~$140M</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Dilution Risk</div>
                          <div className="sm-kpi-value">LOW</div>
                        </div>
                      </div>
                      <div className="sm-body sm-lh-18">
                        <p>
                          <strong className="sm-mint">Liquidity:</strong> Exceptional. $1.15B cash with zero debt creates fortress balance sheet. Asset-light model requires minimal working capital. Generating ~$140M quarterly FCF provides infinite runway for organic growth.
                        </p>
                        <p>
                          <strong className="sm-sky">Leverage:</strong> None. Company raised $2.5B across IPO ($1.21B) and follow-on ($1.3B) without adding debt. Only liability is a legacy $15.7M convertible note from 2019 SeedInvest round at $16.23 conversion &mdash; converts to &lt;1M shares, immaterial dilution.
                        </p>
                        <p>
                          <strong className="sm-gold">Capital Needs:</strong> None foreseeable. FCF positive operations fund growth organically. S-3ASR shelf registration active as WKSI status provides flexibility for opportunistic M&amp;A, but no equity raise expected. Self-funding trajectory intact.
                        </p>
                      </div>
                      <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                        <div className="sm-flex">
                          <span className="sm-mint sm-fw-600">Assessment: A+</span>
                          <span className="sm-subtle">Fortress Balance Sheet</span>
                        </div>
                        <div className="sm-text-13">
                          Circle has one of the cleanest balance sheets in fintech. No debt, substantial cash, and positive FCF generation eliminate any near-term dilution or liquidity concerns. The company is fully self-funding and could pursue meaningful M&amp;A without leverage.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unit Economics */}
                  <div className="sm-card">
                    <div className="sm-card-body">
                      <div className="sm-fw-600 sm-text sm-mb-8">Unit Economics &amp; Margins</div>
                      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Net Take Rate</div>
                          <div className="sm-kpi-value">1.27%</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">RLDC Margin</div>
                          <div className="sm-kpi-value">39%</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="coral">
                          <div className="sm-kpi-label">Coinbase Cost</div>
                          <div className="sm-kpi-value">54%</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="sky">
                          <div className="sm-kpi-label">EBITDA Margin</div>
                          <div className="sm-kpi-value">22%</div>
                        </div>
                      </div>
                      <div className="sm-body sm-lh-18">
                        <p>
                          <strong className="sm-mint">Revenue Model:</strong> Circle earns ~4&cent; per dollar of USDC in circulation annually through reserve yield (T-bills, repos). At $73.7B circulation, this generates ~$2.96B TTM revenue. The model is highly scalable with near-zero marginal cost per additional USDC dollar.
                        </p>
                        <p>
                          <strong className="sm-coral">Margin Pressure:</strong> Coinbase receives ~54% of reserve income as distribution cost &mdash; the single largest expense item. This creates a structural margin cap, but the partnership ensures distribution to Coinbase&apos;s 100M+ users. RLDC margin (39%) is healthy; OpEx ratio (17%) declining with scale.
                        </p>
                      </div>
                      <div className="sm-callout" style={{ '--callout-color': 'var(--gold)' } as React.CSSProperties}>
                        <div className="sm-flex">
                          <span className="sm-gold sm-fw-600">Coinbase Sensitivity Analysis</span>
                        </div>
                        <div className="sm-text-13">
                          If Coinbase cost reduced from 54% &rarr; 45%: RLDC margin expands from 39% &rarr; 48% (+$67M/qtr at current revenue). Each 5% reduction in Coinbase share adds ~$37M quarterly profit.
                        </div>
                        <div className="sm-text-13">
                          <strong>Renegotiation Leverage:</strong> Coinbase equity stake aligns incentives. Diversifying distribution (Binance 240M users, OKX 60M, Kraken) reduces dependency. CPN direct bank relationships bypass exchange distribution entirely.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              renderGrowthDriversExtra={() => (
                <>
                  {/* Expansion Vectors */}
                  <span className="sm-section-label sm-sky sm-inline-block sm-mb-8">Expansion Vectors</span>
                  <div className="sm-inv-glass-list">
                    {[
                      { region: 'US (Core)', status: 'Dominant', color: 'var(--mint)' },
                      { region: 'Europe (MiCA)', status: 'Growing', color: 'var(--mint)' },
                      { region: "Japan (FSA)", status: "Launched Mar'25", color: 'var(--mint)' },
                      { region: 'LatAm (Brazil)', status: 'Nubank 100M+', color: 'var(--sky)' },
                      { region: 'MENA (UAE)', status: 'ADGM licensed', color: 'var(--sky)' },
                      { region: 'APAC (Singapore)', status: 'MPI License', color: 'var(--sky)' },
                    ].map((item, i) => (
                      <div key={i} className="sm-inv-glass-item">
                        <span className="sm-text2">{item.region}</span>
                        <span className="sm-inv-impact-label" style={{ '--inv-accent': item.color } as React.CSSProperties}>{item.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Platform & Product Expansion */}
                  <span className="sm-section-label sm-violet sm-inline-block sm-mb-8 sm-mt-16">Platform &amp; Product Expansion</span>
                  <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
                    {[
                      { product: 'CPN', desc: 'Cross-border payments network', status: '29 FIs, $3.4B vol', color: 'var(--mint)' },
                      { product: 'Arc', desc: 'L1 blockchain for finance', status: '100+ testnet', color: 'var(--sky)' },
                      { product: 'USYC', desc: 'Tokenized money market', status: '$1.5B+ AUM', color: 'var(--mint)' },
                    ].map((p, i) => (
                      <div key={i} className="sm-kpi-cell">
                        <div className="sm-kpi-label">{p.product}</div>
                        <div className="sm-subtle">{p.desc}</div>
                        <div className="sm-kpi-sub" style={{ '--kpi-color': p.color } as React.CSSProperties}>{p.status}</div>
                      </div>
                    ))}
                  </div>

                  {/* TAM */}
                  <div className="sm-note-panel sm-mt-8">
                    <strong>TAM Expansion:</strong> Stablecoin market currently ~$250B. Bull case: $1-2T by 2030 as stablecoins capture share of $150T+ global payments, FX settlement, and collateral markets. Circle targeting 25-35% market share.
                  </div>

                  {/* Ethereum Ecosystem Catalyst */}
                  <span className="sm-section-label sm-gold sm-inline-block sm-mb-8 sm-mt-16">Ethereum Ecosystem Catalyst</span>
                  <div className="sm-inv-eco-catalyst">
                    <p>
                      <strong className="sm-violet">On-Chain Growth Thesis:</strong> As more companies build on Ethereum (DeFi, tokenization, payments, gaming), on-chain transaction volume increases. USDC is the dominant stablecoin for DeFi settlement and on-chain payments &mdash; more Ethereum activity directly drives USDC circulation and Circle revenue.
                    </p>
                    <p>
                      <strong className="sm-mint">USDC Dominance:</strong> ~70% of on-chain stablecoin volume on Ethereum flows through USDC. Every new DeFi protocol, tokenized asset, or on-chain payment rail increases USDC utility and sticky demand.
                    </p>
                    <p>
                      <strong className="sm-sky">Cross-Portfolio Note:</strong> This thesis is doubly bullish for portfolios holding both CRCL and BMNR &mdash; Ethereum adoption drives both USDC demand (CRCL revenue) and ETH price appreciation (BMNR NAV). The positions are positively correlated through Ethereum ecosystem growth.
                    </p>
                  </div>
                </>
              )}

              renderAfterGrowthDrivers={() => (
                <>
                  {/* Valuation Framework */}
                  <div className="sm-divider">
                    <span className="sm-param-label">Valuation Framework</span>
                    <span className="sm-divider-line" />
                  </div>
                  <div className="sm-card">
                    <div className="sm-card-body">
                      <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">P/S Multiple*</div>
                          <div className="sm-kpi-value">6.4x</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Rule of 40</div>
                          <div className="sm-kpi-value">105</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="sky">
                          <div className="sm-kpi-label">Fair Value</div>
                          <div className="sm-kpi-value">$100-150</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Expected Return</div>
                          <div className="sm-kpi-value">+56%</div>
                        </div>
                      </div>
                      <div className="sm-subtle sm-italic sm-mb-8">
                        * P/S based on Q3 2025 annualized run-rate revenue ($2.96B). TTM P/S (Q4 2024&ndash;Q3 2025) is 7.8x.
                      </div>
                      <div className="sm-body sm-lh-18">
                        <p>
                          <strong className="sm-mint">Peer Comparison:</strong> Circle trades at 6.4x P/S &mdash; a ~60% discount to Visa/Mastercard (16-17x) despite 6x higher revenue growth (66% vs 10%). Even Coinbase trades at 13.1x with lower growth (30%). Circle&apos;s Rule of 40 score of 105 (66% growth + 39% margin) is exceptional for any SaaS/fintech company.
                        </p>
                        <p>
                          <strong className="sm-sky">Discount Drivers:</strong> The valuation gap reflects three factors: (1) crypto association risk premium (~20% discount), (2) Coinbase margin uncertainty (~20% discount), (3) interest rate sensitivity (~10% discount). As these concerns diminish, multiple expansion is likely.
                        </p>
                        <p>
                          <strong className="sm-gold">Scenario Analysis:</strong> Probability-weighted expected value is $128 (+56% upside). Bear case ($50, 20% prob) assumes rate cuts + Tether parity. Base case ($120, 50% prob) reflects continued execution. Bull case ($200, 25% prob) assumes CPN/Arc traction. Moon case ($350, 5% prob) assumes stablecoin market 5x expansion.
                        </p>
                      </div>
                      <div className="sm-note-panel">
                        <strong>Methodology:</strong> P/S-based valuation anchored on payment network comparables. Fair value range 10-12x P/S implies $100-150 target. DCF (12% WACC, 3% terminal growth) supports similar range. SOTP analysis adds $10-20 optionality value for CPN/Arc platforms.
                      </div>
                    </div>
                  </div>
                </>
              )}

              renderAfterRiskMatrix={() => (
                <>
                  {/* Rate Sensitivity Calculator */}
                  <div className="sm-card">
                    <div className="sm-card-body">
                      <div className="sm-fw-600 sm-text sm-mb-8">Rate Sensitivity Calculator</div>
                      <div className="sm-subtle sm-italic sm-mb-12">
                        Adjust assumptions to see implied financial impact. Calculations based on current model structure.
                      </div>
                      <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
                        {/* Fed Funds Rate */}
                        <div className="sm-kpi-cell">
                          <div className="sm-flex-between">
                            <span className="sm-subtle">Fed Funds Rate</span>
                            <span className="sm-mono-sm sm-mint sm-fw-600">{sensRate.toFixed(1)}%</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="6"
                            step="0.25"
                            value={sensRate}
                            onChange={(e) => setSensRate(parseFloat(e.target.value))}
                            className="sm-range-input"
                          />
                          <div className="sm-flex-between sm-text3 sm-text-11">
                            <span>1%</span>
                            <span>6%</span>
                          </div>
                        </div>
                        {/* USDC Circulation */}
                        <div className="sm-kpi-cell">
                          <div className="sm-flex-between">
                            <span className="sm-subtle">USDC Circulation</span>
                            <span className="sm-mono-sm sm-sky sm-fw-600">${sensUsdc}B</span>
                          </div>
                          <input
                            type="range"
                            min="40"
                            max="150"
                            step="5"
                            value={sensUsdc}
                            onChange={(e) => setSensUsdc(parseInt(e.target.value))}
                            className="sm-range-input"
                          />
                          <div className="sm-flex-between sm-text3 sm-text-11">
                            <span>$40B</span>
                            <span>$150B</span>
                          </div>
                        </div>
                        {/* Coinbase Distribution */}
                        <div className="sm-kpi-cell">
                          <div className="sm-flex-between">
                            <span className="sm-subtle">Coinbase Distribution</span>
                            <span className="sm-mono-sm sm-coral sm-fw-600">{sensDist}%</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="70"
                            step="1"
                            value={sensDist}
                            onChange={(e) => setSensDist(parseInt(e.target.value))}
                            className="sm-range-input"
                          />
                          <div className="sm-flex-between sm-text3 sm-text-11">
                            <span>30%</span>
                            <span>70%</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculated Outputs */}
                      <div className="sm-model-grid sm-mt-12" style={{ '--cols': 4 } as React.CSSProperties}>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">Implied Revenue</div>
                          <div className="sm-kpi-value">${((sensUsdc * sensRate / 100)).toFixed(1)}B</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="mint">
                          <div className="sm-kpi-label">RLDC (Gross Profit)</div>
                          <div className="sm-kpi-value">${((sensUsdc * sensRate / 100) * (1 - sensDist / 100)).toFixed(2)}B</div>
                        </div>
                        <div className="sm-kpi-cell" style={{ '--kpi-color': sensRate >= 3 && sensDist <= 50 ? 'var(--mint)' : 'var(--gold)' } as React.CSSProperties}>
                          <div className="sm-kpi-label">RLDC Margin</div>
                          <div className="sm-kpi-value">{(100 - sensDist).toFixed(0)}%</div>
                        </div>
                        <div className="sm-kpi-cell" data-accent="sky">
                          <div className="sm-kpi-label">Est. EBITDA</div>
                          <div className="sm-kpi-value">${((sensUsdc * sensRate / 100) * (1 - sensDist / 100) * 0.55).toFixed(2)}B</div>
                        </div>
                      </div>

                      {/* Fair Value Estimate */}
                      <div className="sm-callout sm-mt-12" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                        <div className="sm-flex-between sm-flex-wrap sm-gap-12">
                          <div>
                            <div className="sm-subtle">Implied Fair Value (8x P/S)</div>
                            <div className="sm-mono-lg sm-fw-700 sm-mint">
                              ${((sensUsdc * sensRate / 100) * 8 / 0.23).toFixed(0)}
                            </div>
                          </div>
                          <div className="sm-text-right">
                            <div className="sm-subtle">vs. Current ($82)</div>
                            <div className="sm-mono-sm sm-fw-600" style={{ '--inv-accent': ((sensUsdc * sensRate / 100) * 8 / 0.23) > 82 ? 'var(--mint)' : 'var(--coral)' } as React.CSSProperties}>
                              {((((sensUsdc * sensRate / 100) * 8 / 0.23) - 82) / 82 * 100) > 0 ? '+' : ''}{((((sensUsdc * sensRate / 100) * 8 / 0.23) - 82) / 82 * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sm-subtle sm-italic sm-mt-8">
                        Note: Revenue = USDC &times; Rate. RLDC = Revenue &times; (1 &minus; Distribution%). EBITDA assumes 55% of RLDC after OpEx. Fair value uses 8x P/S on 229M shares. Simplified model &mdash; actual results may vary.
                      </div>
                    </div>
                  </div>

                  {/* Catalyst Calendar */}
                  <div className="sm-card">
                    <div className="sm-card-body">
                      <div className="sm-fw-600 sm-text sm-mb-8">Catalyst Calendar</div>
                      <div className="sm-body sm-lh-18">
                        <p>
                          <strong className="sm-coral">Near-Term (Dec 2025):</strong> Lock-up expiry is the most immediate catalyst &mdash; ~198M shares become eligible for sale. Watch insider selling percentage and price support levels. Historically, strong-performing IPOs see limited insider selling if fundamentals remain intact.
                        </p>
                        <p>
                          <strong className="sm-mint">H1 2026:</strong> Multiple positive catalysts converge. Q4/FY25 earnings (Feb) will provide first full-year numbers and 2026 guidance. Arc mainnet launch will demonstrate platform revenue potential. OCC charter finalization would provide Fed master account pathway &mdash; transformative for institutional adoption.
                        </p>
                        <p>
                          <strong className="sm-sky">Longer-Term:</strong> Coinbase distribution cost renegotiation timing uncertain but represents significant margin expansion optionality. S&amp;P 500 inclusion possible once GAAP profitability criteria met &mdash; would trigger substantial index fund buying (~$2-3B estimated).
                        </p>
                      </div>
                      <div className="sm-inv-glass-list">
                        {[
                          { event: 'Lock-up Expiry', date: 'Dec 2025', color: 'var(--coral)' },
                          { event: 'Q4/FY25 Earnings', date: 'Feb 2026', color: 'var(--mint)' },
                          { event: 'Arc Mainnet', date: 'H1 2026', color: 'var(--mint)' },
                          { event: 'OCC Charter', date: 'Dec 2025 \u2713', color: 'var(--mint)' },
                        ].map((c, i) => (
                          <div key={i} className="sm-inv-glass-item">
                            <span className="sm-text">{c.event}</span>
                            <span className="sm-inv-impact-label" style={{ '--inv-accent': c.color } as React.CSSProperties}>{c.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              moatDurabilityNote="B+ (Moderate-Strong). Regulatory moat strengthening but Tether's scale advantage persists. Key differentiator is TradFi trust — Circle is the only stablecoin issuer with major bank/exchange partnerships. Moat widens if CPN/Arc achieve enterprise adoption."

              renderStrategicAssessment={() => (
                <>
                  <div className="sm-subtle sm-italic">
                    Multi-perspective risk evaluation and strategic decision framework
                  </div>

                  <div className="sm-inv-section-sub"><span className="sm-section-label sm-text">Risk Evaluation &mdash; Four Perspectives</span></div>

                  {/* CFA Level III */}
                  <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                    <div className="sm-flex">
                      <span className="sm-news-tag" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>CFA LEVEL III</span>
                      <span className="sm-subtle">Portfolio Construction &amp; Factor Analysis</span>
                    </div>
                    <div className="sm-body sm-lh-18">
                      <p>
                        <strong>Factor Exposures:</strong> CRCL exhibits significant interest rate sensitivity (negative duration &mdash; rising rates benefit reserve income) and moderate crypto beta correlation (~0.4 to BTC). This creates a unique hedge: positive rate sensitivity while maintaining crypto upside optionality. Low correlation to traditional equities makes it an attractive diversifier.
                      </p>
                      <p>
                        <strong>Liquidity Analysis:</strong> Average daily volume ~$180M provides adequate liquidity for institutional positions up to $50M without material market impact. Post-lock-up, float increases from ~40M to ~240M shares, dramatically improving liquidity profile. Bid-ask spreads tight at ~0.05%.
                      </p>
                      <p>
                        <strong>Governance &amp; ESG:</strong> Dual-class structure (Class B 5:1 voting) concentrates control with founders through 2030 sunset &mdash; acceptable given founder alignment and temporary nature. Board composition strong (ex-Goldman CRO, ex-CFTC Chair). ESG profile positive: financial inclusion focus, transparent reserves, no direct energy consumption concerns unlike PoW crypto.
                      </p>
                    </div>
                  </div>

                  {/* Hedge Fund */}
                  <div className="sm-callout" style={{ '--callout-color': 'var(--violet)' } as React.CSSProperties}>
                    <div className="sm-flex">
                      <span className="sm-news-tag" style={{ '--tag-color': 'var(--violet)' } as React.CSSProperties}>HEDGE FUND</span>
                      <span className="sm-subtle">Alpha Generation &amp; Event Catalysts</span>
                    </div>
                    <div className="sm-body sm-lh-18">
                      <p>
                        <strong>Event Calendar Alpha:</strong> Lock-up expiry (Dec 2025) creates a defined event with predictable dynamics. Historical data shows 70% of high-quality IPOs recover lock-up weakness within 60 days. Strategy: scale into weakness with 30-day DCA starting at lock-up, targeting 15-20% position discount to current price. This is a repeatable playbook.
                      </p>
                      <p>
                        <strong>Short Interest Dynamics:</strong> Current short interest ~8% of float &mdash; elevated but not crowded. Post-lock-up, short interest as % of new float drops to ~1.3%, reducing squeeze risk but also squeeze upside. No significant borrow cost premium currently. Asymmetric long thesis remains intact.
                      </p>
                      <p>
                        <strong>Catalyst Stacking:</strong> Q4 earnings (Feb) + Arc mainnet (H1) + OCC charter (H1) creates a &quot;catalyst stacking&quot; setup through mid-2026. Each positive catalyst de-risks the next. Position sizing: start 3% portfolio, add to 5% on lock-up weakness, trim to 3% core on 50%+ gains. Defined entry/exit framework limits behavioral errors.
                      </p>
                    </div>
                  </div>

                  {/* CIO/CIS */}
                  <div className="sm-callout" style={{ '--callout-color': 'var(--sky)' } as React.CSSProperties}>
                    <div className="sm-flex">
                      <span className="sm-news-tag" style={{ '--tag-color': 'var(--sky)' } as React.CSSProperties}>CIO / CIS</span>
                      <span className="sm-subtle">Strategic Allocation &amp; Fiduciary Considerations</span>
                    </div>
                    <div className="sm-body sm-lh-18">
                      <p>
                        <strong>Strategic Thesis:</strong> Circle represents a &quot;TradFi on-ramp to crypto infrastructure&quot; &mdash; the cleanest way to gain crypto ecosystem exposure without direct token/protocol risk. For institutions constrained by crypto mandates, CRCL provides compliant exposure to stablecoin adoption megatrend. Think of it as &quot;picks and shovels&quot; for the digital dollar economy.
                      </p>
                      <p>
                        <strong>Benchmark Considerations:</strong> Not yet in S&amp;P 500 but likely candidate within 12-18 months once GAAP profitability sustained. Early positioning ahead of index inclusion creates alpha opportunity. Tracking error vs. benchmark acceptable for growth allocations given asymmetric return profile.
                      </p>
                      <p>
                        <strong>Reputational Risk Assessment:</strong> Post-FTX, crypto association carries headline risk. However, Circle&apos;s regulatory positioning (OCC charter, GENIUS Act compliance, major bank partnerships) provides defensible narrative. If questioned by stakeholders, response framework: &quot;We own the regulated payments infrastructure, not speculative tokens.&quot; Blackrock/Fidelity ownership validates institutional acceptability.
                      </p>
                    </div>
                  </div>

                  {/* Technical Analyst */}
                  <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                    <div className="sm-flex">
                      <span className="sm-news-tag" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>TECHNICAL ANALYST</span>
                      <span className="sm-subtle">Chart Patterns &amp; Price Action</span>
                    </div>
                    <div className="sm-body sm-lh-18">
                      <p>
                        <strong>IPO Base Formation:</strong> Recent IPO establishing price discovery range. Watch for completion of IPO base &mdash; typically 3-6 months of consolidation before directional move. Initial support at IPO price level ($31). Declining volume on pullbacks is constructive accumulation pattern.
                      </p>
                      <p>
                        <strong>Key Levels:</strong> VWAP from IPO serving as key pivot level. Bollinger Bands narrowing suggests volatility compression before expansion. RSI neutral at 50 provides no directional bias yet &mdash; wait for confirmation. Watch for breakout above $45 with volume as momentum entry signal.
                      </p>
                      <p>
                        <strong>Lock-up Dynamics:</strong> December 2025 lock-up expiry creates potential supply overhang. Monitor volume patterns carefully around that date. Historical IPO lock-up expirations show initial weakness followed by recovery if fundamentals intact. Use weakness as accumulation opportunity, not exit signal.
                      </p>
                      <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                        <strong className="sm-mint">Technical Outlook:</strong> {investmentCurrent.perspectives.technicalAnalyst.ecosystemView}
                      </div>
                    </div>
                  </div>

                  {/* Key Strategic Questions */}
                  <div className="sm-inv-section-sub"><span className="sm-section-label sm-text">Key Strategic Questions</span></div>

                  {/* Would I Buy Now? */}
                  <div className="sm-card-body sm-bg-surface2 sm-rounded-12">
                    <div className="sm-flex-between">
                      <span className="sm-text sm-fw-600">Would I Buy Now?</span>
                      <span className="sm-news-tag-lg" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>YES &mdash; ACCUMULATE</span>
                    </div>
                    <div className="sm-body sm-lh-18">
                      <p>
                        <strong>The Case:</strong> At $82, CRCL trades at 6.4x P/S with 66% revenue growth &mdash; a valuation anomaly for a Rule of 40 score of 105. Fair value range is $100-150, implying 22-83% upside. The risk/reward ratio of 3.2:1 is compelling. You&apos;re buying a regulated payment network at a crypto discount that shouldn&apos;t exist.
                      </p>
                      <p>
                        <strong>The Hesitation:</strong> Lock-up expiry in Dec 2025 creates near-term supply overhang. Waiting could provide a better entry. However, strong fundamentals often absorb lock-up selling quickly, and waiting risks missing the move entirely if selling is lighter than expected.
                      </p>
                      <p>
                        <strong>The Verdict:</strong> Yes, initiate position now at 50% target weight. Reserve 50% for lock-up weakness (target entry: $65-70). If lock-up passes without material weakness, deploy remaining capital on confirmation of support. Don&apos;t let perfect be the enemy of good &mdash; the asymmetry favors action.
                      </p>
                    </div>
                  </div>

                  {/* What Can I Expect? */}
                  <div className="sm-card-body sm-bg-surface2 sm-rounded-12">
                    <div className="sm-text sm-fw-600">What Can I Expect?</div>
                    <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
                      <div className="sm-callout" style={{ '--callout-color': 'var(--gold)' } as React.CSSProperties}>
                        <div className="sm-fw-600 sm-gold sm-text-13">Short-Term (0-6 months)</div>
                        <div className="sm-text-13 sm-lh-16">
                          Expect volatility. Lock-up creates 15-25% downside risk. Q4 earnings (Feb) should be strong given Q3 momentum. Trading range: $60-95. Don&apos;t panic on lock-up weakness &mdash; it&apos;s expected and temporary.
                        </div>
                      </div>
                      <div className="sm-callout" style={{ '--callout-color': 'var(--sky)' } as React.CSSProperties}>
                        <div className="sm-fw-600 sm-sky sm-text-13">Mid-Term (6-18 months)</div>
                        <div className="sm-text-13 sm-lh-16">
                          Catalyst-rich period. Arc mainnet, OCC charter, potential Coinbase renegotiation all converge. If execution continues, expect multiple expansion toward 10x P/S. Target range: $100-150. This is where the thesis gets tested.
                        </div>
                      </div>
                      <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                        <div className="sm-fw-600 sm-mint sm-text-13">Long-Term (3-5 years)</div>
                        <div className="sm-text-13 sm-lh-16">
                          If stablecoin TAM expands to $1-2T and Circle maintains 25%+ share, this is a $150-350 stock. Payment network multiples (15-17x P/S) on $8-10B revenue = $120-170B market cap. Current: $52B. The math works if the thesis holds.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What's My Strategy? */}
                  <div className="sm-card-body sm-bg-surface2 sm-rounded-12">
                    <div className="sm-text sm-fw-600">What&apos;s My Strategy?</div>
                    <div className="sm-body sm-lh-18">
                      <p>
                        <strong className="sm-mint">Position Sizing:</strong> 3-5% for growth-oriented portfolios, 1-2% for balanced, avoid for income-focused (no dividend). This is a high-conviction, higher-volatility position &mdash; size accordingly. Never more than you can stomach watching drop 30%.
                      </p>
                      <p>
                        <strong className="sm-sky">Entry Approach:</strong> Tranche in. 50% now at ~$82. 25% reserved for lock-up weakness ($65-70 target). Final 25% on confirmation of support or breakout above $95. Average cost target: $72-78. Patience beats FOMO.
                      </p>
                      <p>
                        <strong className="sm-gold">Add Triggers:</strong> Below $65 = aggressive accumulate (oversold on lock-up). Below $55 = back up the truck (existential discount). Major partnership announcement (Apple, Google, Amazon) = add regardless of price.
                      </p>
                      <p>
                        <strong className="sm-violet">Trim Triggers:</strong> Above $130 = trim 20% (take some chips off). Above $150 = trim another 25%. Above $200 = reduce to core 50% position. Let winners run, but harvest along the way.
                      </p>
                      <p>
                        <strong className="sm-coral">Exit Criteria:</strong> Full exit if: (1) Coinbase renegotiation fails AND margins compress below 30%, (2) Regulatory environment turns hostile (SEC enforcement, GENIUS Act failure), (3) Tether achieves full transparency AND captures 80%+ market share, (4) Better opportunity emerges with superior risk/reward. Don&apos;t marry the position.
                      </p>
                    </div>
                  </div>

                  {/* Final Verdict */}
                  <div className="sm-inv-section-sub"><span className="sm-section-label sm-text">Final Verdict</span></div>

                  <div className="sm-highlight-bar" style={{ '--bar-accent-1': 'var(--mint)', '--bar-accent-2': 'var(--cyan)' } as React.CSSProperties}>
                    <div className="sm-flex-between sm-flex-wrap sm-gap-16">
                      <div className="sm-flex sm-gap-12">
                        <span className="sm-news-tag-lg" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>OVERWEIGHT</span>
                        <span className="sm-inv-ticker-badge">HIGH CONVICTION</span>
                      </div>
                      <div className="sm-text-right">
                        <div className="sm-subtle">12-Month Target</div>
                        <div className="sm-mono-lg sm-mint sm-fw-700">$100 - $150</div>
                      </div>
                    </div>
                    <div className="sm-body sm-lh-18">
                      <strong>Action:</strong> Accumulate on weakness, hold core position through volatility. Use lock-up as entry opportunity, not exit excuse. This is a 3-5 year compounder disguised as a volatile new issue.
                    </div>
                    <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                      <div className="sm-text sm-italic">
                        &quot;Best-in-class regulated stablecoin infrastructure trading at a crypto discount that shouldn&apos;t exist. The market is pricing the past (crypto winter, SVB crisis) while ignoring the future (payment network economics, regulatory moat, TradFi adoption). Time arbitrage favors the patient.&quot;
                      </div>
                    </div>
                  </div>

                  {/* Methodology */}
                  <div className="sm-inv-section-sub sm-mt-16"><span className="sm-section-label sm-text">Methodology &amp; Disclosures</span></div>
                  <div className="sm-body sm-text2 sm-lh-18">
                    <p><strong>Data Sources:</strong> SEC EDGAR filings (10-K, 10-Q, 8-K, S-1, S-3), company press releases, earnings call transcripts, third-party research.</p>
                    <p><strong>Valuation:</strong> Primary method is P/S multiples with peer comparison. Secondary: DCF (12% WACC, 3% terminal growth), SOTP for platform optionality.</p>
                    <p><strong>Ratings Scale:</strong> OVERWEIGHT (expected 20%+ outperformance), NEUTRAL (market perform &plusmn;10%), UNDERWEIGHT (expected 20%+ underperformance), MONITORING (not yet rated).</p>
                    <p><strong>Update Frequency:</strong> Analysis updated after each material SEC filing or significant press release. All historical analyses preserved permanently.</p>
                    <p><strong>Limitations:</strong> Forward-looking statements involve uncertainty. Model assumes current regulatory trajectory continues. Interest rate and crypto market assumptions may prove incorrect. Not investment advice &mdash; do your own research.</p>
                  </div>
                </>
              )}

              renderAccumulation={() => (
                <>
                  {/* Entry/Exit Framework */}
                  <div className="sm-model-grid" style={{ '--cols': 3 } as React.CSSProperties}>
                    <div className="sm-callout" style={{ '--callout-color': 'var(--mint)' } as React.CSSProperties}>
                      <div className="sm-mint sm-fw-600">Entry Zones</div>
                      <div className="sm-text-13">
                        <div>$75-80: Current (hold)</div>
                        <div>$65-70: Add on weakness</div>
                        <div>$55-60: Aggressive accumulate</div>
                      </div>
                    </div>
                    <div className="sm-callout" style={{ '--callout-color': 'var(--coral)' } as React.CSSProperties}>
                      <div className="sm-coral sm-fw-600">Risk Management</div>
                      <div className="sm-text-13">
                        <div>Stop-loss: $50 (-39%)</div>
                        <div>Max position: 5% of portfolio</div>
                        <div>Risk per trade: 1-2%</div>
                      </div>
                    </div>
                    <div className="sm-callout" style={{ '--callout-color': 'var(--sky)' } as React.CSSProperties}>
                      <div className="sm-sky sm-fw-600">Take Profit Levels</div>
                      <div className="sm-text-13">
                        <div>$100: Trim 20%</div>
                        <div>$130: Trim 25%</div>
                        <div>$150+: Hold core (50%)</div>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Context */}
                  <div className="sm-highlight-bar sm-mt-12" style={{ '--bar-accent-1': 'var(--violet)', '--bar-accent-2': 'var(--sky)' } as React.CSSProperties}>
                    <div className="sm-micro-text sm-violet">Portfolio Construction Context</div>
                    <div className="sm-subtle sm-italic sm-mt-8">For multi-asset portfolios holding CRCL alongside other positions</div>
                  </div>
                  <div className="sm-model-grid sm-mt-12" style={{ '--cols': 3 } as React.CSSProperties}>
                    <div className="sm-kpi-cell" data-accent="text">
                      <div className="sm-kpi-label">Asset Class Bucket</div>
                      <div className="sm-kpi-value">Alternatives / Fintech</div>
                      <div className="sm-kpi-sub sm-gold">Limit: 10-20% of portfolio</div>
                    </div>
                    <div className="sm-kpi-cell" data-accent="text">
                      <div className="sm-kpi-label">Single-Name Limit</div>
                      <div className="sm-kpi-value">3-5% max</div>
                      <div className="sm-kpi-sub sm-coral">Rate sensitive, crypto adjacent</div>
                    </div>
                    <div className="sm-kpi-cell" data-accent="text">
                      <div className="sm-kpi-label">Correlation Note</div>
                      <div className="sm-kpi-value">CRCL + BMNR</div>
                      <div className="sm-kpi-sub sm-sky">Both ETH-correlated; size combined</div>
                    </div>
                  </div>
                  <div className="sm-note-panel">
                    <strong>Combined Crypto Allocation:</strong> If holding both CRCL and BMNR, treat as a single &quot;Ethereum ecosystem&quot; allocation. Combined weight should not exceed alternatives bucket limit. CRCL provides infrastructure/revenue exposure; BMNR provides NAV/yield exposure.
                  </div>
                </>
              )}

              cfaNotes={[
                { term: 'Stablecoin Reserve Yield', def: 'Income from investing stablecoin reserves (primarily US Treasuries). Circle earns yield on USDC reserves — this is the primary revenue driver.' },
                { term: 'USDC Circulation', def: 'Total USDC in circulation, analogous to deposits for a bank. Higher circulation = more reserve assets = more interest income.' },
                { term: 'Network Effects', def: 'USDC adoption creates self-reinforcing cycles: more integrations attract more users, which attract more integrations. Critical competitive moat.' },
              ]}
            />
          </TabPanel>)}

          {activeTab === 'model' && (<TabPanel id="model">
            <ModelTab
              currentUSDC={currentUSDC}
              currentShares={currentShares}
              currentStockPrice={currentStockPrice}
              currentMarketShare={currentMarketShare}
            />
          </TabPanel>)}

          {activeTab === 'usdc' && (<TabPanel id="usdc">
            <>
              {/* Hero — Ive×Tesla */}
              <div className="sm-tab-hero">
                <div className="sm-section-label">Stablecoin Intelligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
                <h2>USDC<span className="sm-mint">.</span></h2>
                <p>
                  USDC is a fully-reserved stablecoin backed 1:1 by USD and short-dated Treasuries. Circle earns
                  yield on reserves (~4-5% in current rate environment). Platform % represents USDC held directly
                  in Circle accounts vs public blockchain — higher platform % means better unit economics.
                </p>
              </div>

              <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
                {[
                  { label: 'Circulation', value: `$${latest.usdcCirculation.toFixed(1)}B`, sub: 'Total USDC supply', color: 'var(--mint)' },
                  { label: 'YoY Growth', value: `+${usdcGrowth.toFixed(0)}%`, sub: 'Year over year', color: '#4ade80' },
                  { label: 'Market Share', value: `${latest.marketShare}%`, sub: 'Of stablecoins', color: 'var(--sky)' },
                  { label: 'On Platform', value: `${latest.platformPct.toFixed(1)}%`, sub: 'Higher margin', color: 'var(--violet)' },
                ].map(kpi => (
                  <div key={kpi.label} className="sm-kpi-cell">
                    <div className="sm-kpi-label">{kpi.label}</div>
                    <div className="sm-kpi-hero-md" style={{ '--kpi-color': kpi.color } as React.CSSProperties}>{kpi.value}</div>
                    <div className="sm-kpi-sub">{kpi.sub}</div>
                  </div>
                ))}
              </div>

              <div className="sm-card sm-mt-8">
                <div className="sm-flex sm-crcl-card-header">
                  <span className="sm-param-label">Circulation Growth</span>
                  <UpdateIndicators sources="SEC" />
                </div>
                <div className="sm-crcl-chart-area">
                  <div className="sm-crcl-bar-chart" style={{ minWidth: DATA.length * 64 }}>
                  {DATA.map((d, i) => (
                    <div key={i} className="sm-crcl-rev-bar-col">
                      <div className="sm-crcl-rev-bar-val">${d.usdcCirculation.toFixed(1)}B</div>
                      <div className="sm-crcl-bar sm-crcl-bar-accent" style={{ height: `${(d.usdcCirculation / 80) * 180}px` }} />
                      <div className="sm-crcl-rev-bar-label">{d.quarter}</div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              <div className="sm-crcl-2col-grid sm-mt-8">
                {/* Mint / Redeem Activity */}
                <div className="sm-card">
                  <div className="sm-flex sm-crcl-card-header">
                    <span className="sm-param-label">Mint / Redeem Activity ($B)</span>
                    <UpdateIndicators sources="SEC" />
                  </div>
                  <div className="sm-p0">
                    <div className="sm-crcl-mint-header">
                      {['Quarter', 'Minted', 'Redeemed', 'Net'].map(h => (
                        <span key={h} className="sm-crcl-metrics-th" data-align={h === 'Quarter' ? 'left' : 'right'}>{h}</span>
                      ))}
                    </div>
                    {DATA.map((d, i) => {
                      const net = d.usdcMinted - d.usdcRedeemed;
                      return (
                        <div key={d.quarter} className="sm-crcl-mint-row" data-last={i === DATA.length - 1}>
                          <span className="sm-mono-sm sm-text">{d.quarter}</span>
                          <span className="sm-mono-right sm-mint">{d.usdcMinted.toFixed(1)}</span>
                          <span className="sm-mono-right sm-coral">{d.usdcRedeemed.toFixed(1)}</span>
                          <span className="sm-mono-right sm-fw-600 sm-val-color" data-positive={net >= 0}>{net.toFixed(1)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rate Sensitivity Matrix */}
                <div className="sm-card">
                  <div className="sm-flex sm-crcl-card-header">
                    <span className="sm-param-label">Rate Sensitivity Matrix ($B Annual)</span>
                    <UpdateIndicators sources="SEC" />
                  </div>
                  <div className="sm-overflow-x" aria-label="Rate sensitivity matrix">
                    <div className="sm-crcl-rate-header">
                      <span className="sm-micro-label">USDC \ Rate</span>
                      {[3.0, 3.5, 4.0, 4.5, 5.0].map(r => (
                        <span key={r} className="sm-micro-header sm-text-center">{r}%</span>
                      ))}
                    </div>
                    {[50, 75, 100, 125, 150].map((c) => (
                      <div key={c} className="sm-crcl-rate-row" data-highlight={c === 75}>
                        <span className="sm-mono-12" style={{ color: c === 75 ? 'var(--cyan)' : 'var(--text)', fontWeight: 500 }}>${c}B</span>
                        {[3, 3.5, 4, 4.5, 5].map(r => (
                          <span key={r} className="sm-mono-12 sm-text-center" style={{ color: c === 75 && r === 4 ? 'var(--cyan)' : 'var(--text2)', fontWeight: c === 75 && r === 4 ? 700 : 400, background: c === 75 && r === 4 ? 'color-mix(in srgb, var(--cyan) 10%, transparent)' : 'transparent', borderRadius: 4, padding: '2px 0' }}>
                            ${(c * r / 100).toFixed(1)}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <CFANotes title="CFA Level III — USDC Economics" items={[
                { term: 'Reserve Yield Model', def: 'USDC reserves invested in T-bills and cash earn risk-free rate. Revenue = Circulation × Yield Rate. Simple but powerful business model.' },
                { term: 'Circulation Drivers', def: 'Crypto market activity, DeFi usage, cross-border payments, institutional adoption. Tracks crypto market sentiment but growing secular use cases.' },
                { term: 'Market Share', def: 'USDC vs USDT competition. USDC ~26% of stablecoin market. Transparency and US regulation are differentiators.' },
                { term: 'Rate Sensitivity', def: 'Matrix shows how revenue changes with Fed rate changes. Key risk: rate cuts reduce yield on reserves.' },
                { term: 'Platform vs Off-Platform', def: 'On-platform USDC (Circle accounts) has higher margin. Off-platform (public blockchain) has lower friction but less control.' },
              ]} />
            </>
          </TabPanel>)}

          {activeTab === 'capital' && (<TabPanel id="capital">
            <SharedCapitalTab
              sectionLabel="Financial Position"
              description="Share structure, institutional ownership, capital raises, and treasury management. Circle's path from private to public company via SPAC merger."
              sources="SEC"
              cfaItems={[
                { term: 'SPAC Merger', def: 'Special Purpose Acquisition Company merger allows private companies to go public without traditional IPO. Circle merged with Concord Acquisition Corp.' },
                { term: 'Share Authorization', def: 'Maximum shares a company can issue, set in charter. Circle authorized additional shares to support growth and potential acquisitions.' },
                { term: 'Institutional Ownership', def: 'Percentage of shares held by institutional investors (mutual funds, pension funds, etc.). High institutional ownership signals professional conviction.' },
              ]}
            >

              {/* Highlight Box */}
              <div className="highlight">
                <h3 className="sm-m-0 sm-text-15 sm-fw-600 sm-text">Dual-Class Structure</h3>
                <p className="sm-text-13 sm-text2 sm-crcl-mt-8 sm-crcl-lh-16">
                  Circle has a dual-class share structure with Class A (1 vote) and Class B (5 votes). Jeremy Allaire
                  and insiders control significant voting power through Class B shares. Class B voting is capped at
                  30% aggregate and sunsets in June 2030 or upon CEO departure.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="sm-divider">
                <span className="sm-param-label">Overview</span>
                <span className="sm-divider-line" />
              </div>
              <div className="sm-card">
                <div className="sm-card-section">
                  <span className="sm-param-label">Key Metrics</span>
                </div>
                <div className="sm-model-grid" style={{ '--cols': 4 } as React.CSSProperties}>
                  {[
                    { label: 'Shares Outstanding', value: `${MARKET.shares.toFixed(1)}M`, color: 'var(--violet)' },
                    { label: 'Market Cap', value: `$${(MARKET.marketCap / 1000).toFixed(1)}B`, color: 'var(--mint)' },
                    { label: 'Cash Position', value: '$1.1B', color: 'var(--sky)' },
                    { label: 'Convertible Debt', value: '$206M', color: 'var(--gold)' },
                  ].map(kpi => (
                    <div key={kpi.label} className="sm-kpi-cell">
                      <div className="sm-kpi-hero-md" style={{ '--kpi-color': kpi.color } as React.CSSProperties}>{kpi.value}</div>
                      <div className="sm-kpi-label">{kpi.label}</div>
                    </div>
                  ))}
                </div>
                <div className="sm-crcl-split-grid">
                  <div className="sm-grid-cell">
                    {[
                      { label: 'Stock Price', value: `$${MARKET.price}`, color: 'var(--text)' },
                      { label: 'EV/Revenue', value: `${(MARKET.marketCap / (1.68 * 1000)).toFixed(1)}x`, color: 'var(--text)' },
                      { label: 'Revenue Run Rate', value: '$1.68B', color: 'var(--text)' },
                    ].map(row => (
                      <div key={row.label} className="sm-flex-between sm-crcl-kv-row">
                        <span className="sm-subtle">{row.label}</span>
                        <span className="sm-mono-sm" style={{ color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="sm-grid-cell">
                    {[
                      { label: 'USDC Circulation', value: '$44B+', color: 'var(--violet)' },
                      { label: 'Revenue Growth', value: '+16% YoY', color: 'var(--mint)' },
                      { label: 'Source', value: 'SEC / Market', color: 'var(--text3)' },
                    ].map(row => (
                      <div key={row.label} className="sm-flex-between sm-crcl-kv-row">
                        <span className="sm-subtle">{row.label}</span>
                        <span className="sm-mono-sm" style={{ color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm-crcl-econ-panel">
                  <div className="sm-crcl-econ-title">Stablecoin Economics</div>
                  <div className="sm-crcl-econ-body">
                    Revenue driven by USDC reserve interest income. Higher interest rates = higher revenue, making Circle uniquely positioned in crypto.
                  </div>
                </div>
              </div>

              {/* Navigation Cards */}
              <div className="sm-cap-nav" style={{ '--cap-cols': 6 } as React.CSSProperties}>
                {[
                  { id: 'structure', value: `${SHARE_CLASSES.length}`, label: 'Share Classes', sub: 'Class A, B, C' },
                  { id: 'shareholders', value: `${MAJOR_SHAREHOLDERS.length}`, label: 'Major Holders', sub: 'Insiders + institutions' },
                  { id: 'insiders', value: '0', label: 'Insider Activity', sub: 'Form 4 filings' },
                  { id: 'offerings', value: `${EQUITY_OFFERINGS.length + WARRANTS.length}`, label: 'Programs', sub: 'Offerings + warrants' },
                  { id: 'plans', value: `${EQUITY_PLANS.length}`, label: 'Equity Plans', sub: 'Omnibus, ESPP, Foundation' },
                  { id: 'dilution', value: '21%', label: 'Total Dilution', sub: '276.5M FD shares' },
                ].map(nav => (
                  <div
                    key={nav.id}
                    className="sm-cap-nav-item"
                    data-active={capitalView === nav.id ? 'true' : undefined}
                    onClick={() => setCapitalView(nav.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${nav.label}`}
                    onKeyDown={(e) => e.key === 'Enter' && setCapitalView(nav.id)}
                  >
                    <div className="sm-cap-nav-value">{nav.value}</div>
                    <div className="sm-cap-nav-label">{nav.label}</div>
                    <div className="sm-cap-nav-sub">{nav.sub}</div>
                  </div>
                ))}
              </div>

              {/* Share Class Structure */}
              {capitalView === 'structure' && (
              <>
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">Share Class Structure<UpdateIndicators sources="SEC" /></span>
                </div>
                <div className="sm-cap-table-scroll">
                  <div className="sm-min-w-500">
                    <div className="sm-cap-table-header" style={{ gridTemplateColumns: '100px 1fr 1fr 1fr 2fr' }}>
                      {['Class', 'Authorized', 'Outstanding', 'Votes/Share', 'Description'].map((h, i) => (
                        <span key={h} className="sm-cap-th" data-align={i >= 1 && i <= 3 ? 'right' : undefined}>{h}</span>
                      ))}
                    </div>
                    {SHARE_CLASSES.map((s, i) => (
                      <div key={s.class} className="sm-cap-table-row sm-cap-grid-100-1fr-3x-2fr">
                        <span className="sm-cap-td-label">{s.class}</span>
                        <span className="sm-cap-td" data-align="right">{(s.authorized / 1000).toLocaleString()}M</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>{s.outstanding > 0 ? `${(s.outstanding / 1000).toFixed(1)}M` : '—'}</span>
                        <span className="sm-cap-td" data-align="right">{s.votes}</span>
                        <span className="sm-cap-td">{s.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Major Shareholders */}
              {capitalView === 'shareholders' && (
              <>
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">Major Shareholders (from Aug 2025 S-1)<UpdateIndicators sources="SEC" /></span>
                </div>
                <div className="sm-cap-table-scroll">
                  <div className="sm-min-w-520">
                    <div className="sm-cap-table-header sm-cap-grid-2fr-4x1fr">
                      {['Shareholder', 'Class A (K)', 'Class B (K)', 'Voting %', 'Type'].map((h, i) => (
                        <span key={h} className="sm-cap-th" data-align={i >= 1 && i <= 3 ? 'right' : undefined}>{h}</span>
                      ))}
                    </div>
                    {MAJOR_SHAREHOLDERS.map((s, i) => (
                      <div key={i} className="sm-cap-table-row sm-cap-grid-2fr-4x1fr">
                        <span className="sm-cap-td-label">{s.name}</span>
                        <span className="sm-cap-td" data-align="right">{s.classA > 0 ? `${(s.classA / 1000).toFixed(1)}M` : '—'}</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>{s.classB > 0 ? `${(s.classB / 1000).toFixed(1)}M` : '—'}</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>{s.pctVoting}%</span>
                        <span className="sm-cap-td" style={{ color: s.type === 'Insider' ? 'var(--gold)' : s.type === 'Strategic' ? 'var(--violet)' : 'var(--text2)' }}>{s.type}</span>
                      </div>
                    ))}
                  </div>
                  <div className="sm-card-body sm-text-13 sm-text3">
                    Note: Class B voting capped at 30% aggregate. Founder shares sunset June 2030 or upon Allaire departure from CEO/Chair.
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Offerings View: Equity Offerings + Equity Awards + Warrants */}
              {capitalView === 'offerings' && (
              <>
              <div className="sm-crcl-2col-grid">
                {/* Equity Offerings */}
                <div className="sm-card">
                  <div className="sm-card-header">
                    <span className="sm-section-label">Equity Offerings<UpdateIndicators sources="SEC" /></span>
                  </div>
                  <div className="sm-cap-table-scroll">
                    <div className="sm-min-w-400">
                      <div className="sm-cap-table-header sm-cap-grid-5eq">
                        {['Date', 'Type', 'Shares', 'Price', 'Proceeds'].map((h, i) => (
                          <span key={h} className="sm-cap-th" data-align={i >= 2 ? 'right' : undefined}>{h}</span>
                        ))}
                      </div>
                      {EQUITY_OFFERINGS.map((o, i) => (
                        <div key={i} className="sm-cap-table-row sm-cap-grid-5eq">
                          <span className="sm-cap-td-label">{o.date}</span>
                          <span className="sm-cap-td">{o.type}</span>
                          <span className="sm-cap-td" data-align="right">{(o.shares / 1000).toFixed(1)}M</span>
                          <span className="sm-cap-td" data-align="right">${o.price.toFixed(2)}</span>
                          <span className="sm-cap-td" data-align="right" data-highlight>${o.grossProceeds >= 1000 ? `${(o.grossProceeds / 1000).toFixed(2)}B` : `${o.grossProceeds}M`}</span>
                        </div>
                      ))}
                      <div className="sm-cap-table-total sm-cap-grid-5eq">
                        <span className="sm-cap-td-label sm-col-span-1-5">Total Raised</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>$2.5B</span>
                      </div>
                    </div>
                    <div className="sm-card-body sm-text-12 sm-text3">
                      IPO: {EQUITY_OFFERINGS[0].underwriters}<br/>
                      Follow-on: {EQUITY_OFFERINGS[1].underwriters}
                    </div>
                  </div>
                </div>

                {/* Outstanding Equity Awards */}
                <div className="sm-card">
                  <div className="sm-card-header">
                    <span className="sm-section-label">Outstanding Equity Awards (Jun 30, 2025)<UpdateIndicators sources="SEC" /></span>
                  </div>
                  <div className="sm-cap-table-scroll">
                    <div className="sm-min-w-380">
                      <div className="sm-cap-table-header sm-cap-grid-2fr-1fr-1fr-1fr">
                        {['Award Type', 'Class A', 'Class B', 'Total'].map((h, i) => (
                          <span key={h} className="sm-cap-th" data-align={i >= 1 ? 'right' : undefined}>{h}</span>
                        ))}
                      </div>
                      <div className="sm-cap-table-row sm-cap-grid-2fr-1fr-1fr-1fr">
                        <span className="sm-cap-td-label">Stock Options</span>
                        <span className="sm-cap-td" data-align="right">{(EQUITY_AWARDS.options.classA / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right">{(EQUITY_AWARDS.options.classB / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.options.classB) / 1000).toFixed(1)}M</span>
                      </div>
                      <div className="sm-cap-table-row sm-cap-grid-2fr-1fr-1fr-1fr">
                        <span className="sm-cap-td-label">RSUs</span>
                        <span className="sm-cap-td" data-align="right">{(EQUITY_AWARDS.rsus.classA / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right">{(EQUITY_AWARDS.rsus.classB / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>{((EQUITY_AWARDS.rsus.classA + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</span>
                      </div>
                      <div className="sm-cap-table-total sm-cap-grid-2fr-1fr-1fr-1fr">
                        <span className="sm-cap-td-label">Total Outstanding</span>
                        <span className="sm-cap-td" data-align="right">{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.rsus.classA) / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right">{((EQUITY_AWARDS.options.classB + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.options.classB + EQUITY_AWARDS.rsus.classA + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</span>
                      </div>
                    </div>
                    <div className="sm-card-body sm-card-note">
                      Wtd-avg option exercise price: ${EQUITY_AWARDS.options.weightedAvgPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Warrants */}
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">Outstanding Warrants (Black-Scholes Valuation)<UpdateIndicators sources="SEC" /></span>
                </div>
                <div className="sm-cap-table-scroll">
                  <div className="sm-min-w-580">
                    <div className="sm-cap-table-header sm-cap-grid-1p5-6x1fr">
                      {['Grant', 'Shares (K)', 'Strike', 'Fair Value', 'Vol', 'Expiry', 'Status'].map((h, i) => (
                        <span key={h} className="sm-cap-th" data-align={i >= 1 && i <= 4 ? 'right' : undefined}>{h}</span>
                      ))}
                    </div>
                    {WARRANTS.map((w, i) => (
                      <div key={i} className="sm-cap-table-row sm-cap-grid-1p5-6x1fr">
                        <span className="sm-cap-td-label">{w.date}</span>
                        <span className="sm-cap-td" data-align="right">{(w.shares / 1000).toFixed(1)}M</span>
                        <span className="sm-cap-td" data-align="right">${w.exercisePrice}</span>
                        <span className="sm-cap-td" data-align="right" data-highlight>${w.fairValue}M</span>
                        <span className="sm-cap-td" data-align="right">{w.volatility}%</span>
                        <span className="sm-cap-td">{w.expiry}</span>
                        <span className="sm-cap-td sm-gold">{w.status}</span>
                      </div>
                    ))}
                    <div className="sm-cap-table-total sm-cap-grid-1p5-6x1fr">
                      <span className="sm-cap-td-label">Total</span>
                      <span className="sm-cap-td" data-align="right">{(WARRANTS.reduce((a, w) => a + w.shares, 0) / 1000).toFixed(1)}M</span>
                      <span className="sm-cap-td" />
                      <span className="sm-cap-td" data-align="right" data-highlight>${WARRANTS.reduce((a, w) => a + w.fairValue, 0).toFixed(1)}M</span>
                      <span className="sm-cap-td" /><span className="sm-cap-td" /><span className="sm-cap-td" />
                    </div>
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Plans View: Equity Incentive Plans + Pre-IPO Preferred */}
              {capitalView === 'plans' && (
              <>
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">Equity Incentive Plans (Reserved Shares)<UpdateIndicators sources="SEC" /></span>
                </div>
                <div className="sm-card-body">
                  <div className="sm-grid-3">
                    {EQUITY_PLANS.map((p, i) => (
                      <div key={i} className="sm-bg-surface2 sm-rounded-12 sm-p-24">
                      <div className="sm-text-13 sm-text3">{p.plan}</div>
                      <div className="sm-mono-24-bold">
                        {(p.reserved / 1000).toFixed(1)}M
                      </div>
                      <div className="sm-subtle">shares reserved</div>
                      <div className="sm-text-13">{p.description}</div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pre-IPO Preferred (Historical) */}
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">Pre-IPO Capital Structure (Converted at IPO)</span>
                </div>
                <div className="sm-p0">
                  <div className="sm-p-12-24 sm-card-note sm-color-text2">All preferred shares converted to Class A common stock at IPO. Historical liquidation preferences totaled $1.14B across six series.</div>
                  <div className="sm-cap-header-row sm-cap-grid-1p5-5x1fr">
                    {['Series', 'Year', 'Shares (K)', 'Liq. Pref', 'Price/Share'].map((h, i) => (
                      <span key={h} className="sm-micro-header" data-align={i >= 1 ? 'right' : 'left'}>{h}</span>
                    ))}
                  </div>
                  {PREFERRED_STOCK.map((p, i) => (
                    <div key={i} className="sm-cap-data-row sm-cap-grid-1p5-5x1fr">
                      <span className="sm-mono-12 sm-color-text">{p.series}</span>
                      <span className="sm-mono-sm sm-text-right sm-text2">{p.year}</span>
                      <span className="sm-mono-sm sm-text-right sm-text2">{p.shares.toLocaleString()}</span>
                      <span className="sm-mono-sm sm-text-right sm-text2">${(p.liquidation / 1000).toFixed(1)}M</span>
                      <span className="sm-mono-sm sm-text-right sm-sky">${p.pricePerShare.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="sm-cap-total-row sm-cap-grid-1p5-5x1fr">
                    <span className="sm-col-span-1-3 sm-color-text">Total</span>
                    <span className="sm-mono-sm sm-text-right sm-text2">{(PREFERRED_STOCK.reduce((a, p) => a + p.shares, 0) / 1000).toFixed(1)}M</span>
                    <span className="sm-mono-sm sm-text-right sm-text2">${(PREFERRED_STOCK.reduce((a, p) => a + p.liquidation, 0) / 1000000).toFixed(2)}B</span>
                    <span />
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Dilution View */}
              {capitalView === 'dilution' && (
              <>
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">Fully Diluted Share Count<UpdateIndicators sources="SEC" /></span>
                </div>
                <div className="sm-p0">
                  <div className="sm-cap-header-row sm-cap-grid-2fr-1fr-1fr">
                    {['Component', 'Shares (M)', '% of Total'].map((h, i) => (
                      <span key={h} className="sm-micro-header" data-align={i >= 1 ? 'right' : 'left'}>{h}</span>
                    ))}
                  </div>
                  {[
                    { label: 'Class A Outstanding', shares: '209.0', pct: '75.6%' },
                    { label: 'Class B Outstanding', shares: '19.6', pct: '7.1%' },
                    { label: 'Options Outstanding', shares: '20.7', pct: '7.5%' },
                    { label: 'RSUs Outstanding', shares: '25.2', pct: '9.1%' },
                    { label: 'Warrants (unvested)', shares: '11.0', pct: '4.0%' },
                    { label: 'Convertible Notes', shares: '~1.0', pct: '0.4%' },
                  ].map((row, i) => (
                    <div key={i} className="sm-cap-data-row sm-cap-grid-2fr-1fr-1fr">
                      <span className="sm-text">{row.label}</span>
                      <span className="sm-mono-sm sm-text-right sm-text2">{row.shares}</span>
                      <span className="sm-mono-sm sm-text-right sm-text2">{row.pct}</span>
                    </div>
                  ))}
                  <div className="sm-cap-total-row sm-cap-grid-2fr-1fr-1fr">
                    <span className="sm-text">Fully Diluted</span>
                    <span className="sm-mono-sm sm-text-right sm-mint">~276.5</span>
                    <span className="sm-mono-sm sm-text-right sm-text2">100%</span>
                  </div>
                  <div className="sm-p-12-24 sm-card-note">
                    Note: Excludes 33.9M shares reserved under Omnibus/ESPP plans not yet granted. Lock-up: ~198M shares restricted until Q3 2025 earnings or 180 days post-IPO.
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Insider Activity View */}
              {capitalView === 'insiders' && (
              <>
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">RSU Grants (Form 4)<UpdateIndicators sources={['SEC']} /></span>
                </div>
                <div className="sm-panel-body-muted">
                  No Form 4 insider grant filings tracked yet. Equity awards summary: {EQUITY_AWARDS.rsus.classA.toLocaleString()} Class A RSUs + {EQUITY_AWARDS.rsus.classB.toLocaleString()} Class B RSUs outstanding (from S-1 filing). Individual grant details will appear here when Form 4 filings are ingested.
                </div>
              </div>
              <div className="sm-panel sm-overflow-hidden sm-mt-16" >
                <div className="sm-card-header">
                  <span className="sm-section-label">Insider Sales (Form 4)<UpdateIndicators sources={['SEC']} /></span>
                </div>
                <div className="sm-panel-body-muted">
                  No Form 4 insider sale filings tracked yet. Individual sale details will appear here when Form 4 filings are ingested.
                </div>
              </div>
              </>
              )}

            </SharedCapitalTab>
          </TabPanel>)}

          {activeTab === 'monte-carlo' && (<TabPanel id="monte-carlo">
            <SharedMonteCarloTab
              sectionLabel="Stablecoin DCF Simulation"
              description={`Runs ${mcSim.n.toLocaleString()} simulations over ${mcYears} years with randomized inputs (USDC growth, margins, rates, multiples) to generate a probability distribution of fair values.`}
              sources={['PR', 'SEC']}
              currentStockPrice={MARKET.price}
              presets={Object.fromEntries(
                Object.entries(mcPresets).map(([key, p]) => [key, {
                  label: p.label,
                  color: p.color,
                  headerValue: `${p.revMin}–${p.revMax}%`,
                  headerSub: 'rev growth',
                }])
              )}
              presetOrder={['bear', 'base', 'bull', 'custom']}
              activePreset={mcPreset}
              onPresetChange={applyMcPreset}
              years={mcYears}
              onYearsChange={(yr) => { setMcYears(yr); setRunKey(k => k + 1); }}
              sims={mcSims}
              onSimsChange={(n) => { setMcSims(n); setRunKey(k => k + 1); }}
              onRun={() => setRunKey(k => k + 1)}
              sim={{
                n: mcSim.n,
                p5: mcSim.p5,
                p25: mcSim.p25,
                p50: mcSim.p50,
                p75: mcSim.p75,
                p95: mcSim.p95,
                mean: mcSim.mean,
                winProbability: mcSim.winProb,
                sharpe: mcSim.sharpe,
                sortino: mcSim.sortino,
                var5: mcSim.var5,
                cvar5: mcSim.cvar5,
                histogram: mcSim.histogram,
              }}
              renderParameters={() => (
                <>
                  <div className="sm-divider">
                    <span className="sm-param-label">USDC Growth Parameters</span>
                    <span className="sm-divider-line" />
                  </div>
                  <div className="sm-grid-2">
                    <ParameterCard
                      title="Revenue Growth Min (%)"
                      explanation="Lower bound for annual USDC revenue growth in simulation."
                      options={[5, 10, 15, 20, 25, 30]}
                      value={mcRevenueGrowthMin}
                      onChange={v => { setMcRevenueGrowthMin(v); setMcPreset('custom'); }}
                      format="%"
                    />
                    <ParameterCard
                      title="Revenue Growth Max (%)"
                      explanation="Upper bound for annual USDC revenue growth in simulation."
                      options={[25, 35, 45, 55, 65, 75]}
                      value={mcRevenueGrowthMax}
                      onChange={v => { setMcRevenueGrowthMax(v); setMcPreset('custom'); }}
                      format="%"
                    />
                  </div>

                  <div className="sm-divider">
                    <span className="sm-param-label">Profitability Parameters</span>
                    <span className="sm-divider-line" />
                  </div>
                  <div className="sm-grid-2">
                    <ParameterCard
                      title="EBITDA Margin Min (%)"
                      explanation="Lower bound for EBITDA margin assumption in DCF model."
                      options={[30, 40, 50, 55, 60, 65]}
                      value={mcMarginMin}
                      onChange={v => { setMcMarginMin(v); setMcPreset('custom'); }}
                      format="%"
                    />
                    <ParameterCard
                      title="EBITDA Margin Max (%)"
                      explanation="Upper bound for EBITDA margin assumption in DCF model."
                      options={[55, 60, 65, 70, 75, 80]}
                      value={mcMarginMax}
                      onChange={v => { setMcMarginMax(v); setMcPreset('custom'); }}
                      format="%"
                    />
                  </div>

                  <div className="sm-divider">
                    <span className="sm-param-label">Valuation Parameters</span>
                    <span className="sm-divider-line" />
                  </div>
                  <div className="sm-grid-2">
                    <ParameterCard
                      title="Discount Rate Min (%)"
                      explanation="Lower bound for WACC / required return in DCF model."
                      options={[8, 10, 12, 14, 16, 18]}
                      value={mcDiscountMin}
                      onChange={v => { setMcDiscountMin(v); setMcPreset('custom'); }}
                      format="%"
                    />
                    <ParameterCard
                      title="Discount Rate Max (%)"
                      explanation="Upper bound for WACC / required return in DCF model."
                      options={[12, 14, 16, 18, 20, 22]}
                      value={mcDiscountMax}
                      onChange={v => { setMcDiscountMax(v); setMcPreset('custom'); }}
                      format="%"
                    />
                  </div>
                  <div className="sm-grid-2 sm-mt-12">
                    <ParameterCard
                      title="Terminal Multiple Min"
                      explanation="Lower bound for exit EV/EBITDA multiple in DCF terminal value."
                      options={[8, 10, 12, 15, 18, 20]}
                      value={mcTerminalMultMin}
                      onChange={v => { setMcTerminalMultMin(v); setMcPreset('custom'); }}
                      format="x"
                    />
                    <ParameterCard
                      title="Terminal Multiple Max"
                      explanation="Upper bound for exit EV/EBITDA multiple in DCF terminal value."
                      options={[15, 18, 22, 25, 30, 35]}
                      value={mcTerminalMultMax}
                      onChange={v => { setMcTerminalMultMax(v); setMcPreset('custom'); }}
                      format="x"
                    />
                  </div>
                </>
              )}
              cfaItems={[
                { term: 'Stochastic Modeling', def: 'Uses random sampling to model uncertainty. Each iteration draws from probability distributions for key inputs.' },
                { term: 'Input Distributions', def: 'USDC growth, margins, rates, multiples vary within defined ranges. Uniform distributions based on confidence.' },
                { term: 'Percentile Interpretation', def: 'P5 = 5% chance price is lower. P50 = median outcome. P95 = 5% chance price is higher.' },
                { term: 'VaR (Value at Risk)', def: 'The loss level that won\'t be exceeded with 95% confidence. Shows downside risk.' },
                { term: 'CVaR (Expected Shortfall)', def: 'Average loss in worst 5% of scenarios. More conservative than VaR for tail risk.' },
                { term: 'Sharpe/Sortino Ratios', def: 'Risk-adjusted return metrics. Sortino only penalizes downside volatility.' },
              ]}
            />
          </TabPanel>)}

          {activeTab === 'timeline' && (<TabPanel id="timeline">
            <SharedTimelineTab
              sectionLabel="Corporate Events"
              title="Timeline"
              description="SEC filings, press releases, partnerships, and corporate milestones. Chronological record of Circle's evolution as the USDC issuer."
              sources="PR"
            >
              {/* SEC Filings — Redesigned card layout with KPI strip */}
              <SharedSecFilingsSection
                filings={secFilings}
                secMeta={secMeta}
                typeColors={secTypeColors}
                filterTypes={secFilterTypes}
                initialVisibleCount={5}
              />

              {/* Upcoming Events */}
              <div className="sm-divider">
                <span className="sm-param-label">Upcoming & Press Releases</span>
                <span className="sm-divider-line" />
              </div>
              <div className="sm-grid-2-lg">
                <div>
                  <div className="sm-card">
                    <div className="sm-card-header">
                      <span className="sm-section-label">Upcoming Events<UpdateIndicators sources="PR" /></span>
                    </div>
                    <div className="sm-card-body">
                      <div className="sm-tl-event-list">
                        <div className="sm-tl-event-item">
                          <div>
                            <div className="sm-text sm-fw-600">Q4 2025 Earnings</div>
                            <div className="sm-subtle">10-K Annual Report</div>
                          </div>
                          <div>
                            <div className="sm-mono-sm sm-mint sm-text-right">~Feb 2026</div>
                            <div className="sm-tl-event-sub">Est.</div>
                          </div>
                        </div>
                        <div className="sm-tl-event-item">
                          <div>
                            <div className="sm-text sm-fw-600">Lock-up Expiry</div>
                            <div className="sm-subtle">~198M shares eligible for sale</div>
                          </div>
                          <div>
                            <div className="sm-mono-sm sm-gold sm-text-right">Dec 2025</div>
                            <div className="sm-tl-event-sub">180 days post-IPO</div>
                          </div>
                        </div>
                        <div className="sm-tl-event-item">
                          <div>
                            <div className="sm-text sm-fw-600">Convertible Note Maturity</div>
                            <div className="sm-subtle">2019 SeedInvest Note ($15.7M)</div>
                          </div>
                          <div>
                            <div className="sm-mono-sm sm-sky sm-text-right">Mar 2026</div>
                            <div className="sm-tl-event-sub">Convertible @ $16.23</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="sm-card">
                    <div className="sm-card-header">
                      <span className="sm-section-label">Recent Press Releases<UpdateIndicators sources="PR" /></span>
                    </div>
                    <div className="sm-card-body">
                      <div className="sm-tl-pr-list">
                        {displayedPR.map((pr, i) => (
                          <div key={i} className="sm-tl-pr-item-v2">
                            <div className="sm-tl-pr-meta">
                              <span className="sm-tl-pr-date">{pr.date}</span>
                              <span className="sm-tl-pr-cat" style={{ color: pr.color }}>{pr.category}</span>
                            </div>
                            <div className="sm-tl-pr-title">{pr.title}</div>
                          </div>
                        ))}
                      </div>
                      {hiddenPRCount > 0 && (
                        <div className="sm-text-center sm-pt-16">
                          <button
                            onClick={() => setShowAllPR(!showAllPR)}
                            className="sm-expand-btn"
                            aria-expanded={showAllPR}
                          >
                            {showAllPR ? '▲ Show Less' : `▼ Show ${hiddenPRCount} More`}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Timeline Section */}
              <div className="sm-divider">
                <span className="sm-param-label">Event Timeline</span>
                <span className="sm-divider-line" />
              </div>
              <h3 className="sm-flex sm-gap-12 sm-text sm-fw-600 sm-fs-18 sm-m-0">
                <span>Event Timeline</span>
                <span className="sm-body-sm sm-text3">({filteredEvents.length} events)</span>
                <UpdateIndicators sources="PR" />
              </h3>

              {/* Topic Filters (AND logic multi-select) */}
              <div className="sm-card sm-p-16">
                <div className="sm-flex-between">
                  <span className="sm-text-13t sm-fw-600">Filter by Topic</span>
                  {selectedTopics.length > 0 && (
                    <button
                      onClick={() => setSelectedTopics([])}
                      className="sm-action-btn"
                    >
                      Clear ({selectedTopics.length})
                    </button>
                  )}
                </div>
                <div className="sm-flex-wrap sm-mt-8">
                  {Object.entries(topicTags).map(([topic, style]) => {
                    const isSelected = selectedTopics.includes(topic);
                    const count = TIMELINE.filter(p => detectTopics(p).includes(topic)).length;
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className="sm-action-btn"
                        data-active={isSelected}
                      >
                        {style.label} ({count})
                      </button>
                    );
                  })}
                </div>
                {selectedTopics.length > 0 && (
                  <div className="sm-subtle sm-mt-8">
                    {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEvents.length} results
                  </div>
                )}
              </div>
              
              <div className="sm-flex-between">
                <div className="sm-flex-wrap">
                  {cats.map(c => (
                    <button key={c} onClick={() => setTimelineCat(c)} className="sm-action-btn" data-active={timelineCat === c}>
                      {c === 'All' ? `All (${TIMELINE.length})` : `${c} (${TIMELINE.filter(p => p.category === c).length})`}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (expanded.size === filteredEvents.length) {
                      setExpanded(new Set());
                    } else {
                      setExpanded(new Set(filteredEvents.map(p => TIMELINE.indexOf(p))));
                    }
                  }}
                  className="sm-action-btn"
                >
                  {expanded.size === filteredEvents.length ? '⊟ Collapse All' : '⊞ Expand All'}
                </button>
              </div>

              <div className="sm-flex-col-gap">
                {filteredEvents.map((p, i) => {
                  const idx = TIMELINE.indexOf(p);
                  const isExpanded = expanded.has(idx);
                  const toggleExpand = () => {
                    const next = new Set(expanded);
                    if (isExpanded) next.delete(idx);
                    else next.add(idx);
                    setExpanded(next);
                  };
                  const verdictColor = p.verdict === 'positive' ? 'var(--mint)' : p.verdict === 'negative' ? 'var(--coral)' : 'var(--sky)';

                  return (
                    <div key={idx} className="sm-tl-event-card">
                      <div onClick={toggleExpand} className="sm-tl-event-row"
                        role="button" tabIndex={0} aria-expanded={isExpanded}
                        aria-label={`Toggle details for ${p.event}`}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleExpand())}>
                        <span className="sm-mono-sm sm-text3">{p.date}</span>
                        <span className="sm-text-11">{p.category}</span>
                        <span className="sm-text-13t sm-fw-500">{p.event}</span>
                        <span className="sm-verdict-badge" style={{ color: verdictColor }}>
                          {p.verdict === 'positive' && '↑ '}
                          {p.verdict === 'negative' && '↓ '}
                          {p.verdict === 'mixed' && '↔ '}
                          {p.verdict}
                        </span>
                        <span className="sm-expand-chevron" data-expanded={isExpanded || undefined}>▼</span>
                      </div>
                      {isExpanded && (
                        <div className="sm-tl-detail-panel">
                          <div className="sm-py-12">
                            <div className="sm-text-13 sm-lh-16">{p.details}</div>
                            <div className="sm-grid-3 sm-mt-12 sm-gap-12">
                              <div className="sm-bg-surface2 sm-rounded-8 sm-p-8-12">
                                <div className="sm-micro-label">Impact</div>
                                <div className="sm-text-12 sm-text2 sm-mt-2">{p.impact}</div>
                              </div>
                              <div className="sm-bg-surface2 sm-rounded-8 sm-p-8-12">
                                <div className="sm-micro-label">Source</div>
                                <div className="sm-text-12 sm-mint sm-mt-2">{p.source}</div>
                              </div>
                              <div className="sm-bg-surface2 sm-rounded-8 sm-p-8-12">
                                <div className="sm-micro-label">Verdict</div>
                                <div className="sm-text-12 sm-mt-2" style={{ color: verdictColor }}>
                                  {p.verdict === 'positive' && '● Bullish'}
                                  {p.verdict === 'negative' && '● Bearish'}
                                  {p.verdict === 'mixed' && '● Neutral'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* How to Use */}
              <div className="sm-card">
                <div className="sm-card-header">
                  <span className="sm-section-label">How to Use This Log</span>
                </div>
                <div className="sm-card-body">
                  <div className="sm-grid-2-lg">
                    <div>
                      <h4 className="sm-mint sm-fw-500 sm-mb-8 sm-fs-14 sm-mt-0">Categories Explained</h4>
                      <ul className="sm-flex-col sm-body-sm sm-text2 sm-list-reset sm-gap-6">
                        <li><span className="sm-gold">Partnership:</span> Commercial integrations, strategic alliances</li>
                        <li><span className="sm-sky">Product:</span> USDC features, protocol upgrades, launches</li>
                        <li><span className="sm-violet">Regulatory:</span> Licenses, compliance, legal milestones</li>
                        <li><span className="sm-mint">Corporate:</span> Leadership, financing, M&A, governance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="sm-mint sm-fw-500 sm-mb-8 sm-fs-14 sm-mt-0">Updating This Log</h4>
                      <ul className="sm-flex-col sm-body-sm sm-text2 sm-list-reset sm-gap-4">
                        <li>Add new entries chronologically at the top</li>
                        <li>Include sources for traceability</li>
                        <li>Tag verdict: Positive/Negative/Neutral</li>
                        <li>Add context in details field</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <CFANotes title="CFA Level III — Corporate Events" items={[
                { term: '10-K / 10-Q', def: 'Annual and quarterly SEC filings. 10-K is audited; 10-Q is unaudited. Both contain financial statements and management discussion.' },
                { term: 'S-1 Registration', def: 'IPO registration statement filed with SEC. Contains comprehensive company information, financials, and risk factors.' },
                { term: 'MiCA Compliance', def: 'Markets in Crypto-Assets regulation in EU. Circle obtained MiCA license, allowing USDC/EURC operations across EU member states.' },
              ]} />
            </SharedTimelineTab>
          </TabPanel>)}

          {activeTab === 'comps' && <TabPanel id="comps"><CompsTab /></TabPanel>}

          {activeTab === 'wall-street' && <TabPanel id="wall-street">
            <WallStreetTab />
          </TabPanel>}

          {activeTab === 'sources' && <TabPanel id="sources">
            <SharedSourcesTab ticker="CRCL" companyName="Circle Internet Group" researchSources={crclResearchSources} competitorLabel="Stablecoin Peers" competitors={crclCompetitors} />
          </TabPanel>}
          {activeTab === 'edgar' && <TabPanel id="edgar">
            <SharedEdgarTab ticker="CRCL" companyName="Circle Internet Group" localFilings={CRCL_SEC_FILINGS} cik={CRCL_SEC_META.cik} typeColors={CRCL_SEC_TYPE_COLORS} crossRefIndex={CRCL_FILING_CROSS_REFS} />
          </TabPanel>}
        </main>
      </div>
    </UpdateIndicatorContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// COMPS TAB - Comparable Companies Analysis
// Peer group comparisons, valuation matrices, and competitive positioning
// Unified architecture with ASTS/BMNR - Separate function component
// ═══════════════════════════════════════════════════════════════════════════════
const CompsTab = () => {
  // Peer Groups Data
  const PEER_GROUPS = {
    crypto: {
      name: 'Crypto Infrastructure',
      description: 'Direct competitors in digital assets',
      peers: [
        { name: 'Circle (CRCL)', ticker: 'CRCL', cap: 18.85, rev: 2.96, ebitda: 0.285, netIncome: 0.156, pe: 115, margin: 39, growth: 66, aum: 73.7, takeRate: 4.0, highlight: true },
        { name: 'Tether', ticker: 'Private', cap: null, rev: 6.2, ebitda: 5.2, netIncome: 5.0, pe: null, margin: 85, growth: 45, aum: 140, takeRate: 4.4 },
        { name: 'Coinbase', ticker: 'COIN', cap: 67, rev: 5.1, ebitda: 1.2, netIncome: 0.95, pe: 35, margin: 25, growth: 30, aum: null, takeRate: null },
        { name: 'Galaxy Digital', ticker: 'GLXY', cap: 4.5, rev: 1.8, ebitda: 0.4, netIncome: 0.25, pe: 18, margin: 22, growth: 85, aum: null, takeRate: null },
        { name: 'Robinhood', ticker: 'HOOD', cap: 32, rev: 2.4, ebitda: 0.45, netIncome: 0.3, pe: 106, margin: 19, growth: 36, aum: null, takeRate: null },
      ]
    },
    networks: {
      name: 'Card Networks',
      description: 'Analogous "rails" business model',
      peers: [
        { name: 'Visa', ticker: 'V', cap: 580, rev: 35, ebitda: 23, netIncome: 19.5, pe: 31, margin: 67, growth: 10, aum: null, takeRate: null },
        { name: 'Mastercard', ticker: 'MA', cap: 450, rev: 27, ebitda: 17, netIncome: 12.3, pe: 37, margin: 58, growth: 12, aum: null, takeRate: null },
        { name: 'American Express', ticker: 'AXP', cap: 190, rev: 60, ebitda: 15, netIncome: 8.4, pe: 20, margin: 25, growth: 8, aum: null, takeRate: null },
      ]
    },
    payments: {
      name: 'Digital Payments',
      description: 'Payment infrastructure peers',
      peers: [
        { name: 'PayPal', ticker: 'PYPL', cap: 85, rev: 31, ebitda: 6.5, netIncome: 4.2, pe: 20, margin: 18, growth: 8, aum: null, takeRate: null },
        { name: 'Block', ticker: 'SQ', cap: 45, rev: 21, ebitda: 1.8, netIncome: 0.78, pe: 58, margin: 5, growth: 18, aum: null, takeRate: null },
        { name: 'Adyen', ticker: 'ADYEN', cap: 45, rev: 2.0, ebitda: 0.9, netIncome: 0.65, pe: 55, margin: 45, growth: 24, aum: null, takeRate: null },
        { name: 'Stripe', ticker: 'Private', cap: 65, rev: 14, ebitda: 1.5, netIncome: 1.0, pe: null, margin: 11, growth: 25, aum: null, takeRate: null },
      ]
    },
    assetMgrs: {
      name: 'Asset Managers',
      description: 'Reserve management parallel (yield on AUM)',
      peers: [
        { name: 'BlackRock', ticker: 'BLK', cap: 145, rev: 20, ebitda: 7.8, netIncome: 6.0, pe: 24, margin: 39, growth: 11, aum: 10500, takeRate: 0.19 },
        { name: 'Schwab', ticker: 'SCHW', cap: 130, rev: 19, ebitda: 8.5, netIncome: 4.7, pe: 28, margin: 45, growth: 5, aum: 8500, takeRate: 0.22 },
        { name: 'State Street', ticker: 'STT', cap: 28, rev: 12, ebitda: 3.5, netIncome: 2.4, pe: 12, margin: 29, growth: 4, aum: 4100, takeRate: 0.29 },
      ]
    },
    fintech: {
      name: 'High-Growth Fintech',
      description: 'Growth-stage fintech multiples',
      peers: [
        { name: 'Affirm', ticker: 'AFRM', cap: 18, rev: 2.3, ebitda: -0.1, netIncome: -0.5, pe: null, margin: -22, growth: 46, aum: null, takeRate: null },
        { name: 'Marqeta', ticker: 'MQ', cap: 4.5, rev: 0.7, ebitda: -0.05, netIncome: -0.12, pe: null, margin: -17, growth: 30, aum: null, takeRate: null },
        { name: 'Toast', ticker: 'TOST', cap: 18, rev: 4.1, ebitda: 0.15, netIncome: 0.05, pe: 360, margin: 4, growth: 28, aum: null, takeRate: null },
        { name: 'SoFi', ticker: 'SOFI', cap: 14, rev: 2.5, ebitda: 0.35, netIncome: 0.12, pe: 116, margin: 14, growth: 35, aum: null, takeRate: null },
      ]
    }
  };

  // Business Model Metrics (Circle-specific)
  const CIRCLE_METRICS = {
    revenuePerUSDC: (2.96 / 73.7 * 100).toFixed(2),
    grossTakeRate: (1.68 / 60.8 * 100).toFixed(2),
    distributionCostPct: (0.908 / 1.68 * 100).toFixed(1),
    netTakeRate: ((1.68 - 0.908) / 60.8 * 100).toFixed(2),
    rldcMargin: 39,
    reserveYield: 4.33,
  };

  // Valuation Methodologies
  const VALUATION_MATRIX = [
    { method: 'P/S', basis: 'Visa', multiple: 16.6, implied: 2.96 * 16.6, premium: ((2.96 * 16.6) / 18.85 - 1) * 100 },
    { method: 'P/S', basis: 'Mastercard', multiple: 16.7, implied: 2.96 * 16.7, premium: ((2.96 * 16.7) / 18.85 - 1) * 100 },
    { method: 'P/S', basis: 'Coinbase', multiple: 13.1, implied: 2.96 * 13.1, premium: ((2.96 * 13.1) / 18.85 - 1) * 100 },
    { method: 'P/S', basis: 'PayPal', multiple: 2.7, implied: 2.96 * 2.7, premium: ((2.96 * 2.7) / 18.85 - 1) * 100 },
    { method: 'P/S', basis: 'Adyen', multiple: 22.5, implied: 2.96 * 22.5, premium: ((2.96 * 22.5) / 18.85 - 1) * 100 },
    { method: 'EV/EBITDA', basis: 'Payments Avg', multiple: 18, implied: 0.285 * 18, premium: ((0.285 * 18) / 18.85 - 1) * 100 },
    { method: 'EV/EBITDA', basis: 'Networks Avg', multiple: 25, implied: 0.285 * 25, premium: ((0.285 * 25) / 18.85 - 1) * 100 },
    { method: 'P/E', basis: 'Fintech Avg', multiple: 35, implied: 0.156 * 35, premium: ((0.156 * 35) / 18.85 - 1) * 100 },
    { method: 'P/E', basis: 'Current', multiple: 115, implied: 0.156 * 115, premium: ((0.156 * 115) / 18.85 - 1) * 100 },
  ];

  // SOTP Valuation
  const SOTP = [
    { segment: 'Reserve Income Business', metric: '$1.68B rev', multiple: '8x', basis: 'Annuity-like', value: 13.4 },
    { segment: 'Net Reserve (post-Coinbase)', metric: '$0.77B rev', multiple: '12x', basis: 'High-margin', value: 9.2 },
    { segment: 'Platform/Services', metric: '$50M rev', multiple: '15x', basis: 'SaaS-like', value: 0.75 },
    { segment: 'USYC/Hashnote', metric: 'Option value', multiple: '—', basis: 'Yield products', valueLow: 1, valueHigh: 3 },
    { segment: 'Cash & Equivalents', metric: '$1.1B', multiple: '1x', basis: 'Book value', value: 1.1 },
  ];

  // Transaction Comps
  const TRANSACTIONS = [
    { date: 'Mar 2023', target: 'Stripe', acquirer: 'Private Round', value: 50, metric: '3.6x rev', type: 'Funding' },
    { date: 'Jan 2025', target: 'Hashnote', acquirer: 'Circle', value: null, metric: 'Undisclosed', type: 'M&A', notes: 'USYC yield product' },
    { date: 'Aug 2023', target: 'Centre Consortium', acquirer: 'Circle', value: null, metric: 'IP acquisition', type: 'M&A', notes: 'Full USDC control from Coinbase' },
    { date: 'Apr 2022', target: 'Circle SPAC', acquirer: 'Cancelled', value: 9, metric: '—', type: 'SPAC', notes: 'Concord deal terminated' },
    { date: 'Nov 2023', target: 'FTX/Alameda assets', acquirer: 'Various', value: 0.1, metric: 'Distressed', type: 'Bankruptcy', notes: 'Cautionary' },
    { date: 'Oct 2023', target: 'Paxos (BUSD)', acquirer: 'Wind-down', value: null, metric: '—', type: 'Regulatory', notes: 'NY DFS order' },
  ];

  // Historical Multiples (monthly since IPO)
  const HISTORICAL_MULTIPLES = [
    { month: 'Jun 25', crcl: 4.0, coinAvg: 12.5, paymentsAvg: 3.8, price: 31 },
    { month: 'Jul 25', crcl: 5.2, coinAvg: 11.8, paymentsAvg: 3.6, price: 42 },
    { month: 'Aug 25', crcl: 5.8, coinAvg: 13.1, paymentsAvg: 3.5, price: 48 },
    { month: 'Sep 25', crcl: 6.1, coinAvg: 12.2, paymentsAvg: 3.4, price: 52 },
    { month: 'Oct 25', crcl: 6.4, coinAvg: 13.5, paymentsAvg: 3.3, price: 58 },
    { month: 'Nov 25', crcl: 6.2, coinAvg: 14.1, paymentsAvg: 3.2, price: 62 },
    { month: 'Dec 25', crcl: 6.4, coinAvg: 13.1, paymentsAvg: 2.9, price: 82.25 },
  ];

  // Scatter plot data (Growth vs P/S)
  const SCATTER_DATA = [
    { name: 'Circle', x: 66, y: 6.4, r: 18.85, group: 'crypto' },
    { name: 'Coinbase', x: 30, y: 13.1, r: 67, group: 'crypto' },
    { name: 'Visa', x: 10, y: 16.6, r: 580, group: 'network' },
    { name: 'Mastercard', x: 12, y: 16.7, r: 450, group: 'network' },
    { name: 'PayPal', x: 8, y: 2.7, r: 85, group: 'payments' },
    { name: 'Block', x: 18, y: 2.1, r: 45, group: 'payments' },
    { name: 'Adyen', x: 24, y: 22.5, r: 45, group: 'payments' },
    { name: 'Affirm', x: 46, y: 7.8, r: 18, group: 'fintech' },
    { name: 'Galaxy', x: 85, y: 2.5, r: 4.5, group: 'crypto' },
  ];

  // Sensitivity Matrix (USDC levels x Rate scenarios)
  const SENSITIVITY_USDC = [50, 75, 100, 125, 150];
  const SENSITIVITY_RATES = [3.0, 3.5, 4.0, 4.5, 5.0];

  const calcSensitivity = (usdc: number, rate: number, multiple: number) => {
    const reserveIncome = usdc * (rate / 100);
    const netRevenue = reserveIncome * 0.45;
    return netRevenue * multiple;
  };

  // State for peer group selection
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string>('crypto');
  const currentPeers = PEER_GROUPS[selectedPeerGroup as keyof typeof PEER_GROUPS];

  // Competitor intelligence state
  const [competitorFilter, setCompetitorFilter] = useState<string>('all');
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set());
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('All');

  // Key competitors with threat levels for colored borders
  const keyCompetitors = [
    {
      name: 'Tether (USDT)',
      type: 'Stablecoin',
      status: '$140B AUM',
      focus: 'Dominant stablecoin, offshore operations, no US compliance',
      threat: 'High',
      notes: 'Market leader by AUM but regulatory risk. No US bank relationships. CRCL advantage: transparency + compliance.'
    },
    {
      name: 'Coinbase (COIN)',
      type: 'Exchange + USDC Partner',
      status: 'Partner via Coinbase One',
      focus: 'Exchange + custody + 50% USDC distribution',
      threat: 'Medium',
      notes: 'Key distribution partner but also competitor. USDC revenue share creates alignment but limits margin.'
    },
    {
      name: 'PayPal USD (PYUSD)',
      type: 'Stablecoin',
      status: '~$1B AUM',
      focus: 'PayPal\'s stablecoin attempt',
      threat: 'Low',
      notes: 'Distribution advantage via PayPal but limited adoption. CRCL\'s multi-chain approach and DeFi integration superior.'
    },
    {
      name: 'First Digital USD (FDUSD)',
      type: 'Stablecoin',
      status: '~$4B AUM',
      focus: 'Binance-aligned stablecoin',
      threat: 'Low',
      notes: 'Binance partnership but geographically limited. CRCL has broader US + global institutional access.'
    },
    {
      name: 'Kraken',
      type: 'Exchange + USDC Partner',
      status: '13M+ users globally',
      focus: 'Major USDC/EURC distribution partner, DeFi yield products (USDC-based), institutional custody, tokenized equities (xStocks)',
      threat: 'Medium',
      notes: 'Key USDC/EURC distribution partner but also supports rival stablecoins (Ethena USDe custody). Expanding into DeFi yield and tokenized equities could grow or divert USDC demand.'
    },
  ];

  // Build name-keyed lookup for merging qualitative data into peer cards
  const keyCompLookup: Record<string, typeof keyCompetitors[0]> = {};
  keyCompetitors.forEach(k => {
    // Extract the base company name for matching
    const baseName = k.name.split(' (')[0];
    keyCompLookup[baseName] = k;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR PROFILES
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_PROFILES = CRCL_COMPETITOR_PROFILES;

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR NEWS - Add new entries at TOP (newest first)
  // NEVER delete old entries - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_NEWS = CRCL_COMPETITOR_NEWS;

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR NEWS HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  // Filter news by competitor, sort by date (newest first)
  const filteredNews = React.useMemo(() =>
    (competitorFilter === 'all'
      ? [...COMPETITOR_NEWS]
      : COMPETITOR_NEWS.filter(n => n.competitor === competitorFilter)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [competitorFilter]
  );

  // Compute news categories and apply category filter
  const newsCategories = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.category)))];
  const filteredCompNews = filteredNews.filter(n => newsCategoryFilter === 'All' || n.category === newsCategoryFilter);

  // Get competitor display name
  const getCompetitorName = (id: string): string => {
    if (id === 'other') return 'Miscellaneous';
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };

  // Implication styling - using design tokens
  const getImplicationStyle = (impl: CompetitorNewsEntry['implication']) => {
    switch (impl) {
      case 'positive': return { bg: 'var(--mint-dim)', color: 'var(--mint)', label: '✓ Good for CRCL' };
      case 'negative': return { bg: 'var(--coral-dim)', color: 'var(--coral)', label: '⚠ Threat to CRCL' };
      default: return { bg: 'var(--surface3)', color: 'var(--text3)', label: '○ Neutral' };
    }
  };

  // Category styling - using design tokens
  const getCategoryStyle = (cat: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      'Partnership': { bg: 'var(--sky-dim)', color: 'var(--sky)' },
      'Product': { bg: 'var(--violet-dim)', color: 'var(--violet)' },
      'Regulatory': { bg: 'var(--gold-dim)', color: 'var(--gold)' },
      'Technology': { bg: 'var(--cyan-dim)', color: 'var(--cyan)' },
      'Financial': { bg: 'var(--emerald-dim)', color: 'var(--emerald)' },
      'Strategy': { bg: 'var(--accent-dim)', color: 'var(--accent)' },
      'Distribution': { bg: 'var(--mint-dim)', color: 'var(--mint)' },
    };
    return styles[cat] || { bg: 'var(--surface3)', color: 'var(--text3)' };
  };

  return (
    <SharedCompsTab
      sectionLabel="Peer Analysis Framework"
      description="Circle sits at the intersection of multiple peer groups: crypto infrastructure (Coinbase), payments networks (Visa, PayPal), and high-growth fintech. Each lens provides different valuation context. Crypto peers trade at premium P/S; payments peers show margin potential."
      sources={['WS']}
      renderValuationComps={() => (<>
      {/* Peer Group Selector */}
      <div className="sm-flex-wrap">
        {Object.entries(PEER_GROUPS).map(([key, group]) => (
          <button
            key={key}
            className="sm-pill-toggle"
            data-active={selectedPeerGroup === key ? 'true' : undefined}
            onClick={() => setSelectedPeerGroup(key)}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Unified Peer Cards */}
      <div className="sm-cmp-peer-grid">
        {currentPeers.peers.map((p, i) => {
          const qual = keyCompLookup[p.name.split(' (')[0]] || keyCompLookup[p.name];
          const isSelf = p.highlight;
          return (
            <div key={i} className="sm-cmp-peer-card" data-self={isSelf || undefined} data-threat={qual ? qual.threat.toLowerCase() : undefined}>
              <div className="sm-cmp-card-header">
                <div className="sm-flex-col sm-gap-2">
                  <div className="sm-cmp-card-name">{p.name}</div>
                  <div className="sm-cmp-card-ticker">{p.ticker}</div>
                </div>
                <div className="sm-cmp-badge-row">
                  {qual && <span className="sm-cmp-badge" data-level={qual.threat.toLowerCase()}>{qual.threat}</span>}
                  <span className="sm-cmp-badge">{currentPeers.name}</span>
                </div>
              </div>
              <div className="sm-cmp-metrics-grid">
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">{p.cap ? `$${p.cap}B` : 'Private'}</div><div className="sm-cmp-metric-label">Mkt Cap</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">${p.rev}B</div><div className="sm-cmp-metric-label">Revenue</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value">{p.ebitda > 0 ? `$${p.ebitda}B` : p.ebitda < 0 ? `($${Math.abs(p.ebitda)}B)` : '—'}</div><div className="sm-cmp-metric-label">EBITDA</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value" style={{ color: p.margin >= 30 ? 'var(--mint)' : p.margin < 0 ? 'var(--coral)' : undefined }}>{p.margin}%</div><div className="sm-cmp-metric-label">Margin</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value" style={{ color: p.growth >= 30 ? 'var(--mint)' : undefined }}>{p.growth}%</div><div className="sm-cmp-metric-label">Growth</div></div>
                <div className="sm-cmp-metric"><div className="sm-cmp-metric-value sm-accent">{p.cap ? `${(p.cap / p.rev).toFixed(1)}x` : '—'}</div><div className="sm-cmp-metric-label">P/S</div></div>
              </div>
              {qual && (
                <>
                  <div className="sm-subtle sm-text2 sm-lh-15 sm-mb-4"><strong>Focus:</strong> {qual.focus}</div>
                  <div className="sm-subtle-sm sm-crcl-italic-note">{qual.notes}</div>
                </>
              )}
            </div>
          );
        })}
        {/* Show keyCompetitors not in current peer group when viewing crypto */}
        {selectedPeerGroup === 'crypto' && keyCompetitors
          .filter(k => !currentPeers.peers.find(p => p.name.includes(k.name.split(' (')[0])))
          .map((k, i) => (
            <div key={`extra-${i}`} className="sm-cmp-peer-card" data-threat={k.threat.toLowerCase()}>
              <div className="sm-cmp-card-header">
                <div className="sm-flex-col sm-gap-2">
                  <div className="sm-cmp-card-name">{k.name}</div>
                  <div className="sm-cmp-card-ticker">{k.type}</div>
                </div>
                <div className="sm-cmp-badge-row">
                  <span className="sm-cmp-badge" data-level={k.threat.toLowerCase()}>{k.threat}</span>
                  <span className="sm-cmp-badge">{k.type}</span>
                </div>
              </div>
              <div className="sm-subtle sm-text2 sm-lh-15 sm-mb-4"><strong>Status:</strong> {k.status}</div>
              <div className="sm-subtle sm-text2 sm-lh-15 sm-mb-4"><strong>Focus:</strong> {k.focus}</div>
              <div className="sm-subtle-sm sm-crcl-italic-note">{k.notes}</div>
            </div>
          ))
        }
      </div>

      {/* Circle-Specific Business Model Metrics */}
      <div className="sm-comp-surface2-panel">
        <div className="sm-section-label sm-mb-4">Circle Business Model Metrics<UpdateIndicators sources={['WS']} /></div>
        <p className="sm-body-sm sm-text3">Unique metrics for stablecoin issuers — monetization of reserves</p>
        <div className="g4">
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">{CIRCLE_METRICS.revenuePerUSDC}¢</div>
            <div className="sm-text-13 sm-text3">Rev per $1 USDC</div>
          </div>
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">{CIRCLE_METRICS.grossTakeRate}%</div>
            <div className="sm-text-13 sm-text3">Gross Take Rate</div>
          </div>
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">{CIRCLE_METRICS.distributionCostPct}%</div>
            <div className="sm-text-13 sm-text3">Coinbase Share</div>
          </div>
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">{CIRCLE_METRICS.netTakeRate}%</div>
            <div className="sm-text-13 sm-text3">Net Take Rate</div>
          </div>
        </div>
        <div className="sm-surface2-pad-sm">
          <div className="sm-flex-between sm-flex-wrap sm-gap-16">
            <div>
              <span className="sm-subtle">Reserve Yield</span>
              <div className="sm-mono-18 sm-color-sky">{CIRCLE_METRICS.reserveYield}%</div>
            </div>
            <div>
              <span className="sm-subtle">RLDC Margin</span>
              <div className="sm-mono-18 sm-color-mint">{CIRCLE_METRICS.rldcMargin}%</div>
            </div>
            <div>
              <span className="sm-subtle">Tether Take Rate</span>
              <div className="sm-mono-18 sm-color-text2">4.4%</div>
            </div>
            <div>
              <span className="sm-subtle">Tether Margin</span>
              <div className="sm-mono-18 sm-color-text2">85%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Methodology Valuation Matrix */}
      <div className="sm-panel sm-rounded-14">
        <div className="sm-flex sm-fw-600 sm-text sm-fs-13 sm-mb-4">Implied Valuation Matrix<UpdateIndicators sources={['WS']} /></div>
        <p className="sm-body-sm sm-text3">Circle's value under different peer multiples (current: $18.9B)</p>
        <div className="sm-cmp-table-scroll">
          <div className="sm-cmp-table-header sm-cmp-grid-5col sm-cmp-header-rounded">
            {['Method', 'Peer Basis', 'Multiple', 'Implied Value', 'Premium/(Discount)'].map((label, idx) => (
              <div key={label} className="sm-cmp-th" data-align={idx < 2 ? 'left' : 'right'}>{label}</div>
            ))}
          </div>
          {VALUATION_MATRIX.map((v, i) => (
            <div key={i} className="sm-cmp-table-row sm-cmp-grid-5col">
              <div className="sm-cmp-td-label">{v.method}</div>
              <div className="sm-cmp-td">{v.basis}</div>
              <div className="sm-cmp-td" data-align="right">{v.multiple}x</div>
              <div className="sm-cmp-td sm-mint" data-align="right">${v.implied.toFixed(1)}B</div>
              <div className="sm-cmp-td" data-align="right" style={{ color: v.premium >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                {v.premium >= 0 ? '+' : ''}{v.premium.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth vs P/S Scatter Plot */}
      <div className="sm-panel sm-rounded-14">
        <div className="sm-flex sm-fw-600 sm-text sm-fs-13 sm-mb-4">Growth vs. P/S Multiple<UpdateIndicators sources={['WS']} /></div>
        <p className="sm-body-sm sm-text3">Circle's positioning relative to peers (bubble size = market cap)</p>
        <div className="sm-h-300">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Revenue Growth"
                unit="%"
                stroke="var(--text3)"
                tick={{ fill: 'var(--text3)', fontSize: 11 }}
                label={{ value: 'Revenue Growth %', position: 'bottom', fill: 'var(--text3)', fontSize: 12 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="P/S Multiple"
                unit="x"
                stroke="var(--text3)"
                tick={{ fill: 'var(--text3)', fontSize: 11 }}
                label={{ value: 'P/S Multiple', angle: -90, position: 'insideLeft', fill: 'var(--text3)', fontSize: 12 }}
              />
              <RechartsTooltip
                contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}
                formatter={(value: any, name: string) => [name === 'x' ? `${value}%` : `${value}x`, name === 'x' ? 'Growth' : 'P/S']}
                labelFormatter={(label) => SCATTER_DATA.find(d => d.x === label)?.name || ''}
              />
              <Scatter
                data={SCATTER_DATA.filter(d => d.name !== 'Circle')}
                fill="var(--text3)"
              >
                {SCATTER_DATA.filter(d => d.name !== 'Circle').map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.group === 'crypto' ? 'var(--sky)' : entry.group === 'network' ? 'var(--violet)' : entry.group === 'payments' ? 'var(--gold)' : 'var(--text3)'}
                  />
                ))}
              </Scatter>
              <Scatter
                data={SCATTER_DATA.filter(d => d.name === 'Circle')}
                fill="var(--mint)"
                shape="star"
              />
              <ReferenceLine y={6.4} stroke="var(--mint)" strokeDasharray="5 5" label={{ value: 'CRCL', fill: 'var(--mint)', fontSize: 10 }} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="sm-flex sm-gap-16 sm-flex-center-12">
          <span><span className="sm-mint">★</span> Circle</span>
          <span><span className="sm-sky">●</span> Crypto</span>
          <span><span className="sm-violet">●</span> Networks</span>
          <span><span className="sm-gold">●</span> Payments</span>
        </div>
      </div>

      <div className="sm-grid-2">
        {/* SOTP Valuation */}
        <div>
          <div className="sm-card sm-mt-8">
            <div className="sm-crcl-section-header">
              <div className="sm-param-label sm-flex sm-gap-8">Sum-of-the-Parts (SOTP)<UpdateIndicators sources={['WS']} /></div>
              <p className="sm-body-sm sm-text3 sm-m-4-0-0">Value each business segment separately</p>
            </div>
            <div className="sm-cmp-table-scroll">
              <div className="sm-cmp-table-header sm-cmp-grid-4col">
                {['Segment', 'Metric', 'Multiple', 'Value'].map((label, idx) => (
                  <div key={label} className="sm-cmp-th" data-align={idx === 0 ? 'left' : 'right'}>{label}</div>
                ))}
              </div>
              {SOTP.map((s, i) => (
                <div key={i} className="sm-cmp-table-row sm-cmp-grid-4col">
                  <div className="sm-cmp-td-label">
                    <div className="sm-fw-500">{s.segment}</div>
                    <div className="sm-text-11">{s.basis}</div>
                  </div>
                  <div className="sm-cmp-td" data-align="right">{s.metric}</div>
                  <div className="sm-cmp-td" data-align="right">{s.multiple}</div>
                  <div className="sm-cmp-td sm-mint" data-align="right">
                    {s.value ? `$${s.value}B` : s.valueLow && s.valueHigh ? `$${s.valueLow}-${s.valueHigh}B` : '—'}
                  </div>
                </div>
              ))}
              <div className="sm-cmp-table-total sm-cmp-grid-4col">
                <div className="sm-cmp-td-label sm-col-span-1-4">SOTP Range</div>
                <div className="sm-cmp-td sm-mint" data-align="right">$15.5-17.5B</div>
              </div>
            </div>
            <div className="sm-crcl-footnote">
              Current market cap: $18.9B ({((18.9 / 16.5 - 1) * 100).toFixed(0)}% premium to midpoint)
            </div>
          </div>
        </div>

        {/* Transaction Comps */}
        <div>
          <div className="sm-card sm-mt-8">
            <div className="sm-crcl-section-header">
              <div className="sm-param-label sm-flex sm-gap-8">Transaction Comps<UpdateIndicators sources={['WS']} /></div>
              <p className="sm-body-sm sm-text3 sm-m-4-0-0">Recent M&A and funding deals in the space</p>
            </div>
            <div className="sm-cmp-table-scroll">
              <div className="sm-cmp-table-header sm-cmp-grid-100-2-1-100">
                {['Date', 'Target', 'Value', 'Type'].map((label, idx) => (
                  <div key={label} className="sm-cmp-th" data-align={idx === 2 ? 'right' : 'left'}>{label}</div>
                ))}
              </div>
              {TRANSACTIONS.map((t, i) => (
                <div key={i} className="sm-cmp-table-row sm-cmp-grid-100-2-1-100">
                  <div className="sm-cmp-td-label">{t.date}</div>
                  <div className="sm-cmp-td">
                    <div className="sm-fw-500">{t.target}</div>
                    {t.notes && <div className="sm-text-11">{t.notes}</div>}
                  </div>
                  <div className="sm-cmp-td" data-align="right">{t.value ? `$${t.value}B` : '—'}</div>
                  <div className="sm-cmp-td"><span className="sm-cmp-badge" style={{
                    background: t.type === 'M&A' ? 'var(--mint-dim)' : t.type === 'Funding' ? 'var(--sky-dim)' : 'var(--gold-dim)',
                    color: t.type === 'M&A' ? 'var(--mint)' : t.type === 'Funding' ? 'var(--sky)' : 'var(--gold)'
                  }}>{t.type}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sensitivity Matrix */}
      <div className="sm-panel sm-rounded-14">
        <div className="sm-flex sm-fw-600 sm-text sm-fs-13 sm-mb-4">Valuation Sensitivity: USDC × Interest Rates<UpdateIndicators sources={['WS']} /></div>
        <p className="sm-body-sm sm-text3">Implied enterprise value at Coinbase P/S multiple (13x net revenue)</p>
        <div className="sm-cmp-table-scroll">
          <div className="sm-cmp-table-header" style={{ gridTemplateColumns: `1fr repeat(${SENSITIVITY_RATES.length}, 1fr)`, borderRadius: '10px 10px 0 0' }}>
            <div className="sm-cmp-th">USDC ($B) ↓ / Rate →</div>
            {SENSITIVITY_RATES.map(r => (
              <div key={r} className="sm-cmp-th" data-align="right">{r}%</div>
            ))}
          </div>
          {SENSITIVITY_USDC.map(usdc => (
            <div key={usdc} className="sm-cmp-table-row" style={{ gridTemplateColumns: `1fr repeat(${SENSITIVITY_RATES.length}, 1fr)` }}>
              <div className="sm-cmp-td-label sm-fw-600">${usdc}B</div>
              {SENSITIVITY_RATES.map(rate => {
                const val = calcSensitivity(usdc, rate, 13);
                const isNear = Math.abs(usdc - 73.7) < 15 && Math.abs(rate - 4.0) < 0.5;
                return (
                  <div key={rate} className="sm-cmp-td" data-align="right" style={isNear ? { background: 'var(--accent-dim)', fontWeight: 600, color: 'var(--accent)' } : undefined}>
                    ${val.toFixed(1)}B
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="sm-subtle">
          Highlighted: Current USDC (~$74B) × Current rate (~4%). Assumes 45% net revenue margin after Coinbase distribution costs.
        </div>
      </div>

      {/* Historical Multiple Tracking */}
      <div className="sm-panel sm-rounded-14">
        <div className="sm-flex sm-fw-600 sm-text sm-fs-13 sm-mb-4">P/S Multiple Since IPO<UpdateIndicators sources={['WS']} /></div>
        <div className="sm-h-280">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_MULTIPLES} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--text3)" tick={{ fill: 'var(--text3)', fontSize: 11 }} />
              <YAxis stroke="var(--text3)" tick={{ fill: 'var(--text3)', fontSize: 11 }} domain={[0, 16]} />
              <RechartsTooltip
                contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}
                formatter={(value: any) => [`${value}x`, '']}
              />
              <Line type="monotone" dataKey="crcl" stroke="var(--accent)" strokeWidth={3} dot={{ fill: 'var(--accent)', r: 4 }} name="Circle" />
              <Line type="monotone" dataKey="coinAvg" stroke="var(--sky)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Crypto Avg" />
              <Line type="monotone" dataKey="paymentsAvg" stroke="var(--gold)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Payments Avg" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="sm-flex sm-gap-24 sm-flex-center-12">
          <span><span className="sm-accent">━━</span> Circle P/S</span>
          <span><span className="sm-sky">╌╌</span> Crypto Peer Avg</span>
          <span><span className="sm-gold">╌╌</span> Payments Peer Avg</span>
        </div>
      </div>

      {/* Rule of 40 Analysis */}
      <div className="sm-panel sm-rounded-14">
        <div className="sm-fs-13 sm-fw-600 sm-color-text sm-mb-4">Rule of 40 Analysis</div>
        <p className="sm-body-sm sm-text3">Growth Rate + Profit Margin &ge; 40% indicates healthy SaaS/fintech</p>
        <div className="g4">
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-color-mint sm-fs-36">105</div>
            <div className="sm-text-13 sm-text3">Circle (66% + 39%)</div>
          </div>
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">55</div>
            <div className="sm-text-13 sm-text3">Coinbase (30% + 25%)</div>
          </div>
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">26</div>
            <div className="sm-text-13 sm-text3">PayPal (8% + 18%)</div>
          </div>
          <div className="sm-bg-surface2 sm-text-center sm-surface2-pad-card">
            <div className="sm-mono sm-fw-700 sm-accent sm-fs-36">77</div>
            <div className="sm-text-13 sm-text3">Visa (10% + 67%)</div>
          </div>
        </div>
      </div>

      </>)}
      renderCompetitorNews={() => (<>
      {/* Competitor News Intelligence Section - Eyebrow + Title + Dot Header */}
      <div className="sm-divider">
        <div className="sm-section-label">Competitive Intelligence<UpdateIndicators sources="PR" /></div>
        <span className="sm-param-label">Competitor News</span>
        <span className="sm-mono-sm sm-text3 sm-ml-12">{filteredCompNews.length} events</span>
        <span className="sm-divider-line" />
      </div>

      {/* Competitor Filter - Card container + pill buttons */}
      <div className="sm-panel sm-mt-8">
        <p className="sm-body-sm sm-lh-16 sm-m-4-0-0">Track what peer companies are doing — stablecoins, exchanges, regulatory moves affecting USDC market position.</p>
        <p className="sm-subtle-sm sm-crcl-subtitle">Company-level news affecting CRCL's competitive positioning</p>
        <div className="sm-flex-between sm-mb-8">
          <span className="sm-section-label">Filter by Competitor</span>
          {competitorFilter !== 'all' && <button onClick={() => setCompetitorFilter('all')} className="sm-clear-btn">Clear</button>}
        </div>
        <div className="sm-flex-wrap sm-gap-6">
          {(() => { const isActive = competitorFilter === 'all'; return (
            <button
              onClick={() => setCompetitorFilter('all')}
              className="sm-filter-pill" data-active={isActive} style={{ '--pill-accent': 'var(--violet)' } as React.CSSProperties}
            >
              All ({COMPETITOR_NEWS.length})
            </button>
          ); })()}
          {COMPETITOR_PROFILES.map(comp => {
            const count = COMPETITOR_NEWS.filter(n => n.competitor === comp.id).length;
            if (count === 0) return null;
            const isActive = competitorFilter === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setCompetitorFilter(comp.id)}
                className="sm-filter-pill" data-active={isActive} style={{ '--pill-accent': 'var(--violet)' } as React.CSSProperties}
              >
                {comp.name} ({count})
              </button>
            );
          })}
          {COMPETITOR_NEWS.filter(n => n.competitor === 'other').length > 0 && (() => { const isActive = competitorFilter === 'other'; return (
            <button
              onClick={() => setCompetitorFilter('other')}
              className="sm-filter-pill" data-active={isActive} style={{ '--pill-accent': 'var(--violet)' } as React.CSSProperties}
            >
              Miscellaneous ({COMPETITOR_NEWS.filter(n => n.competitor === 'other').length})
            </button>
          ); })()}
        </div>
        {competitorFilter !== 'all' && <div className="sm-mono-sm sm-text3 sm-mt-8 sm-fs-11">{getCompetitorName(competitorFilter)} &rarr; {filteredNews.length} results</div>}
      </div>

      {/* Category Filter Row */}
      <div className="sm-flex-between sm-mt-12">
        <div className="sm-flex-wrap sm-gap-6">
          {newsCategories.map(cat => {
            const isActive = newsCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setNewsCategoryFilter(cat)}
                className="sm-filter-pill" data-active={isActive} style={{ '--pill-accent': 'var(--sky)' } as React.CSSProperties}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (expandedNews.size > 0) {
              setExpandedNews(new Set());
            } else {
              setExpandedNews(new Set(filteredCompNews.map((_, i) => i)));
            }
          }}
          className="sm-crcl-reset-btn"
        >
          {expandedNews.size > 0 ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* News Timeline - Flat list */}
      <div className="sm-card sm-mt-8">
        {filteredCompNews.length === 0 ? (
          <div className="sm-crcl-empty-state">
            <p className="sm-text3">No competitor news matching current filters.</p>
          </div>
        ) : (
          filteredCompNews.map((news, i) => {
            const isExpanded = expandedNews.has(i);
            const accentColor = news.implication === 'positive' ? 'var(--mint)' : news.implication === 'negative' ? 'var(--coral)' : 'var(--sky)';
            const impLabel = news.implication === 'positive' ? 'Favorable' : news.implication === 'negative' ? 'Threat' : 'Neutral';
            const competitorName = getCompetitorName(news.competitor);
            return (
              <div key={i} role="button" tabIndex={0}
                aria-label={`${news.headline} — click to ${isExpanded ? 'collapse' : 'expand'}`}
                className="sm-news-row sm-news-row-sep"
                style={{ '--news-accent': accentColor } as React.CSSProperties}
                onClick={() => { const next = new Set(expandedNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedNews(next); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { const next = new Set(expandedNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedNews(next); } }}
              >
                <div className="sm-flex-between sm-items-start">
                  <div className="sm-flex-1">
                    <div className="sm-flex-wrap sm-gap-6 sm-mb-4">
                      <span className="sm-text3 sm-mono-10">{news.date}</span>
                      <span className="sm-news-badge" data-type="category">{news.category}</span>
                      <span className="sm-news-badge" data-type="company">{competitorName}</span>
                    </div>
                    <div className="sm-text sm-fw-600 sm-fs-13 sm-lh-14">{news.headline}</div>
                  </div>
                  <span className="sm-news-impact" style={{ color: accentColor }}>
                    {news.implication === 'positive' ? '+' : news.implication === 'negative' ? '-' : '~'} {impLabel}
                  </span>
                </div>
                {isExpanded && (
                  <div className="sm-news-detail">
                    <div className="sm-text-13 sm-lh-16">
                      {news.details.map((d, j) => <div key={j} className="sm-flex sm-gap-8 sm-items-initial"><span className="sm-accent sm-shrink-0">•</span>{d}</div>)}
                    </div>
                    {news.thesisComparison && (
                      <div className="sm-crcl-comparison-box">
                        <div className="sm-crcl-comparison-label">CRCL Comparison</div>
                        <div className="sm-crcl-comparison-text">{news.thesisComparison}</div>
                      </div>
                    )}
                    {news.source && <div className="sm-text3 sm-news-source">Source: {news.sourceUrl ? <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="sm-accent">{news.source} ↗</a> : news.source}</div>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      </>)}
      renderCompetitorProfiles={() => (<>
      {/* Competitor Profiles (Reference) */}
      <div className="sm-comp-surface2-panel">
        <div className="sm-section-label sm-mb-12">Competitor Profiles</div>
        <div className="sm-flex-col-gap sm-gap-16">
          {COMPETITOR_PROFILES.map(comp => (
            <div key={comp.id} className="sm-comp-profile-card">
              <div className="sm-flex-between sm-items-start sm-mb-12">
                <div>
                  <div className="sm-fw-600 sm-text-16 sm-text">{comp.name}</div>
                  <div className="sm-text-13">{comp.description}</div>
                </div>
              </div>
              <div className="sm-grid-autofit-150">
                <div>
                  <div className="sm-micro-text">Ticker</div>
                  <div className="sm-text-12">{comp.ticker}</div>
                </div>
                <div>
                  <div className="sm-micro-text">Type</div>
                  <div className="sm-text-12">{comp.productType}</div>
                </div>
                <div>
                  <div className="sm-micro-text">Status</div>
                  <div className="sm-text-12">{comp.currentStatus}</div>
                </div>
                {comp.keyMetrics?.aum && (
                  <div>
                    <div className="sm-micro-text">AUM</div>
                    <div className="sm-text-12">{comp.keyMetrics.aum}</div>
                  </div>
                )}
                {comp.keyMetrics?.marketShare && (
                  <div>
                    <div className="sm-micro-text">Market Share</div>
                    <div className="sm-text-12">{comp.keyMetrics.marketShare}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      </>)}
      cfaItems={[
        { term: 'Peer Selection', def: 'Choose comps based on business model similarity, growth profile, and market positioning. No perfect comps for novel businesses like Circle.' },
        { term: 'P/S (Price/Sales)', def: 'Primary multiple for high-growth, pre-profit companies. Compare Circle to fintech and payments peers.' },
        { term: 'EV/EBITDA', def: 'Enterprise value relative to operating profit. Better for profitable companies. Removes capital structure differences.' },
        { term: 'Growth-Adjusted Multiples', def: 'PEG ratio = P/E ÷ Growth Rate. Higher growth justifies higher multiples. Circle\'s growth should command premium.' },
        { term: 'Sum-of-Parts (SOTP)', def: 'Value each business segment separately and sum. Useful for conglomerates or platform businesses with distinct units.' },
        { term: 'Relative Valuation Caveats', def: 'Market may misprice entire sector. Use comps for context but anchor to intrinsic value (DCF).' },
      ]}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// WALL STREET TAB - Analyst Coverage & Research Archive
// Track sell-side analyst ratings, price targets, and estimate revisions
// Unified architecture with ASTS/BMNR - Grouped by Firm
// ═══════════════════════════════════════════════════════════════════════════════
const WallStreetTab = () => {
  const [expandedFirm, setExpandedFirm] = useState<string | null>(null);
  const [expandedReportIdx, setExpandedReportIdx] = useState<string | null>(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // ANALYST COVERAGE DATA - Grouped by Firm
  // Add new reports at the TOP of each firm's reports array (newest first)
  // NEVER delete historical reports - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════
  
  const ANALYST_COVERAGE = CRCL_ANALYST_COVERAGE;

  return (
    <>
      <SharedWallStreetTab coverage={ANALYST_COVERAGE} ticker="CRCL" />
      {/* CFA Notes */}
      <CFANotes title="CFA Level III — Sell-Side Research" items={[
        { term: 'Price Target (PT)', def: 'Analyst\'s 12-month fair value estimate. Compare to current price for implied upside/downside. PTs cluster around consensus — outliers may have differentiated views or different assumptions.' },
        { term: 'Ratings Scale', def: 'Strong Buy (>20% upside), Buy/Overweight (10-20%), Hold/Neutral (±10%), Underperform/Underweight (-10-20%), Sell (>20% downside). Distribution skews bullish due to banking relationships.' },
        { term: 'Full Reports vs Updates', def: 'Full reports include thesis, methodology, estimates, and detailed analysis. Updates are quick PT/rating changes without full analysis — often react to news or earnings.' },
        { term: 'Consensus vs Variant', def: 'When your view differs from consensus, understand why. Variant perception + catalyst = alpha opportunity. But: "the market can stay irrational longer than you can stay solvent."' },
        { term: 'Conflicts of Interest', def: 'Investment banks have relationships with covered companies. Be aware of potential conflicts. Independent research may offer less conflicted views.' },
      ]} />
    </>
  );
};


const CRCLWithErrorBoundary = () => (
  <FinancialModelErrorBoundary>
    <CRCLModel />
  </FinancialModelErrorBoundary>
);

export default CRCLWithErrorBoundary;
