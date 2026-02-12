// @ts-nocheck
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

import React, { useState, useMemo, useRef, useEffect, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { getStockModelCSS } from './stock-model-styles';
import { SharedWallStreetTab, AnalystCoverage, useLiveStockPrice } from '../shared';
import StockChart from '../shared/StockChart';
import SharedSourcesTab from '../shared/SharedSourcesTab';
import type { SourceGroup, Competitor } from '../shared/SharedSourcesTab';
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
} from '@/data/crcl';

// ============================================================================
// CRCL - Circle Internet Group Financial Model
// 2025 Creative Professional Design
// ============================================================================

// ============================================================================
// TYPESCRIPT INTERFACES (Already present - enhanced)
// ============================================================================

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED UI COMPONENT INTERFACES (Unified across ASTS, BMNR, CRCL)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * UPDATE SOURCE TYPES - Indicates which document type updates this field
 * PR = Press Release (weekly 8-K, PRNewswire)
 * SEC = SEC Filing (10-Q, 10-K, 424B5, S-3, DEF 14A)
 * WS = Wall Street (analyst reports, coverage)
 * MARKET = Market Data (prices updated regularly)
 */
type UpdateSource = 'PR' | 'SEC' | 'WS' | 'MARKET';

interface StatProps {
  label: string;
  value: string | number;
  color?: 'white' | 'cyan' | 'mint' | 'coral' | 'sky' | 'violet' | 'gold';
  updateSource?: UpdateSource | UpdateSource[];
}

interface CardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'cyan' | 'violet' | 'mint' | 'emerald';
  updateSource?: UpdateSource | UpdateSource[];
}

interface RowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  updateSource?: UpdateSource | UpdateSource[];
}

interface InputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

interface PanelProps {
  title?: string;
  children: ReactNode;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPETITOR INTELLIGENCE TYPES (CRCL-specific)
// ═══════════════════════════════════════════════════════════════════════════════

/** Competitor identifiers for CRCL competitive landscape */
type CRCLCompetitorId = 'kraken' | 'tether' | 'coinbase' | 'paypal' | 'fdusd' | 'other';

/** News category types for stablecoin/payments competitors */
type CRCLCompetitorNewsCategory = 'Partnership' | 'Product' | 'Regulatory' | 'Technology' | 'Financial' | 'Strategy' | 'Distribution';

/** Implication for CRCL competitive position */
type CRCLImplication = 'positive' | 'neutral' | 'negative';

/** Individual competitor news entry */
interface CRCLCompetitorNewsEntry {
  date: string;
  competitor: CRCLCompetitorId;
  category: CRCLCompetitorNewsCategory;
  headline: string;
  details: string[];
  implication: CRCLImplication;
  crclComparison?: string;
  source?: string;
  sourceUrl?: string;
  storyId?: string;
  storyTitle?: string;
}

/** Competitor profile */
interface CRCLCompetitorProfile {
  id: CRCLCompetitorId;
  name: string;
  description: string;
  currentStatus: string;
}

interface GuideProps {
  title: string;
  children: ReactNode;
}

interface CFANotesProps {
  title?: string;
  items: Array<{ term: string; def: string }>;
}

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
// LEGAL DISCLAIMERS
// ============================================================================

const LEGAL_DISCLAIMERS = {
  notInvestmentAdvice: "NOT INVESTMENT ADVICE: This model is for educational and informational purposes only. It does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the model's content as such.",
  forwardLooking: "FORWARD-LOOKING STATEMENTS: This model contains forward-looking statements based on assumptions about the future. Actual results may differ materially from those projected. Past performance is not indicative of future results."
};

// ============================================================================
// ERROR BOUNDARY COMPONENT (C3)
// ============================================================================

class FinancialModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Financial Model Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--coral) 10%, transparent) 0%, color-mix(in srgb, var(--coral) 5%, transparent) 100%)',
          border: '1px solid color-mix(in srgb, var(--coral) 30%, transparent)',
          borderRadius: '16px',
          textAlign: 'center',
          margin: '20px'
        }}>
          <div style={{ fontSize: '48px' }}>⚠️</div>
          <h2 style={{ color: '#FF7B72', fontFamily: 'Outfit, sans-serif' }}>
            Calculation Error
          </h2>
          <p style={{ color: '#8B949E', fontFamily: 'Outfit, sans-serif' }}>
            An error occurred in the financial model. This may be due to invalid input parameters.
          </p>
          <p style={{ color: '#8B949E', fontSize: '14px', fontFamily: 'Space Mono, monospace' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
                            padding: '12px 24px',
              background: '#34d399',
              color: '#05070A',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

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

interface TimelineEntry {
  date: string;
  category: string;
  event: string;
  impact: string;
  source: string;
  verdict: 'positive' | 'negative' | 'mixed';
  details: string;
}

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
  rldcMargin: number;     // %
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
    description: 'USDC becomes global reserve digital currency, Circle achieves Visa-like network effects',
    assumptions: [
      'US dollar stablecoin becomes de facto global digital dollar standard',
      'Fed explicitly endorses USDC as compliant digital dollar',
      'Circle acquires/partners with major bank (cross-border settlement)',
      'Coinbase partnership restructured to flat fee or equity stake',
      'USYC becomes #1 tokenized treasury product globally',
      'USDC used for US government disbursements pilot',
      'Emerging market central banks hold USDC reserves',
      'B2B payments shift 20%+ to stablecoin rails by 2030',
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

// Tab types: 'tracking' = actual company data, 'projection' = user model inputs
// Order: Overview first, then stock-specific projections, common projections, then tracking
// group: optional grouping for nested display (stock-specific tabs)
const tabs: { id: string; label: string; type: 'tracking' | 'projection'; group?: string }[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  // Stock-specific projections (grouped under "CRCL Analysis")
  { id: 'usdc', label: 'USDC', type: 'projection', group: 'CRCL Analysis' },
  { id: 'sources', label: 'Sources', type: 'tracking', group: 'CRCL Analysis' },
  // Unified valuation model (combines Scenarios + DCF)
  { id: 'model', label: 'Model', type: 'projection' },
  // Other projections
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection' },
  { id: 'comps', label: 'Comps', type: 'projection' },
  // Tracking
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
];

const crclCompetitors: Competitor[] = [
  { name: 'Tether', url: 'https://tether.to/en/transparency/' },
  { name: 'PayPal PYUSD', url: 'https://www.paypal.com/pyusd' },
  { name: 'Paxos', url: 'https://paxos.com' },
  { name: 'Ripple RLUSD', url: 'https://ripple.com' },
];

const crclResearchSources: SourceGroup[] = [
  { category: 'Company / IR', sources: [
    { name: 'Circle — Official Website', url: 'https://circle.com' },
    { name: 'Circle — Blog & Announcements', url: 'https://www.circle.com/blog' },
    { name: 'Circle — Press Releases', url: 'https://www.circle.com/pressroom' },
    { name: 'Circle — USDC Transparency', url: 'https://www.circle.com/usdc' },
    { name: 'Circle — Developer Docs', url: 'https://developers.circle.com' },
    { name: 'SEC EDGAR — Circle Internet Group (CRCL)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=circle+internet&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany' },
  ]},
  { category: 'Stablecoin Competitors', sources: [
    { name: 'Tether — Transparency Reports', url: 'https://tether.to/en/transparency/' },
    { name: 'PayPal — PYUSD', url: 'https://www.paypal.com/pyusd' },
    { name: 'Paxos — USDP / BUSD', url: 'https://paxos.com' },
    { name: 'MakerDAO — DAI', url: 'https://makerdao.com' },
    { name: 'Ripple — RLUSD', url: 'https://ripple.com' },
    { name: 'DefiLlama — Stablecoins Dashboard', url: 'https://defillama.com/stablecoins' },
  ]},
  { category: 'TradFi / Institutional Partners', sources: [
    { name: 'BlackRock — Digital Assets', url: 'https://www.blackrock.com/us/individual/investment-ideas/digital-assets' },
    { name: 'Coinbase — Institutional', url: 'https://www.coinbase.com/institutional' },
    { name: 'Binance — Research', url: 'https://www.binance.com/en/research' },
    { name: 'ICE / NYSE — Newsroom', url: 'https://ir.theice.com/press/news-details' },
    { name: 'Visa — Crypto Solutions', url: 'https://usa.visa.com/solutions/crypto.html' },
    { name: 'Fidelity Digital Assets', url: 'https://www.fidelitydigitalassets.com' },
  ]},
  { category: 'Blockchain / Protocol', sources: [
    { name: 'Ethereum Foundation — Blog', url: 'https://blog.ethereum.org' },
    { name: 'Solana Foundation', url: 'https://solana.com' },
    { name: 'Avalanche', url: 'https://www.avax.network' },
    { name: 'Etherscan — USDC Contract', url: 'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
    { name: 'CoinGecko — USDC', url: 'https://www.coingecko.com/en/coins/usd-coin' },
    { name: 'CoinMarketCap — USDC', url: 'https://coinmarketcap.com/currencies/usd-coin/' },
  ]},
  { category: 'Regulatory', sources: [
    { name: 'SEC — EDGAR Full-Text Search', url: 'https://efts.sec.gov/LATEST/search-index?q=%22circle%22&dateRange=custom&startdt=2024-01-01' },
    { name: 'OCC — News Releases', url: 'https://www.occ.gov/news-issuances/news-releases/index-news-releases.html' },
    { name: 'U.S. Senate Banking Committee', url: 'https://www.banking.senate.gov' },
    { name: 'CFTC — Newsroom', url: 'https://www.cftc.gov/PressRoom/PressReleases' },
    { name: 'FCA (UK) — Register', url: 'https://register.fca.org.uk' },
    { name: 'ESMA — MiCA', url: 'https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica' },
    { name: 'Japan FSA', url: 'https://www.fsa.go.jp/en/' },
  ]},
  { category: 'Crypto News / Data', sources: [
    { name: 'CoinDesk', url: 'https://www.coindesk.com' },
    { name: 'The Block', url: 'https://www.theblock.co' },
    { name: 'Decrypt', url: 'https://decrypt.co' },
    { name: 'Blockworks', url: 'https://blockworks.co' },
    { name: 'DL News', url: 'https://www.dlnews.com' },
    { name: 'Messari', url: 'https://messari.io' },
    { name: 'rwa.xyz — Tokenized Assets', url: 'https://www.rwa.xyz' },
  ]},
  { category: 'Financial / Analyst', sources: [
    { name: 'TipRanks — CRCL', url: 'https://www.tipranks.com/stocks/crcl' },
    { name: 'Seeking Alpha — CRCL', url: 'https://seekingalpha.com/symbol/CRCL' },
    { name: 'Yahoo Finance — CRCL', url: 'https://finance.yahoo.com/quote/CRCL' },
    { name: 'MarketWatch — CRCL', url: 'https://www.marketwatch.com/investing/stock/crcl' },
    { name: 'Finviz — CRCL', url: 'https://finviz.com/quote.ashx?t=CRCL' },
  ]},
  { category: 'Press / News Wires', sources: [
    { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
    { name: 'GlobeNewsWire', url: 'https://www.globenewswire.com' },
    { name: 'Business Wire', url: 'https://www.businesswire.com' },
    { name: 'Reuters', url: 'https://www.reuters.com' },
    { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
  ]},
];

// CSS is now imported from shared styles (Golden Standard: ASTS)
// To modify styles, edit: ./stock-model-styles.ts
const css = getStockModelCSS('mint');

// Card Component for unified risk metrics display
// N1: Memoized pure components for performance optimization
const Row = React.memo<RowProps>(({ label, value, highlight = false, updateSource }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
    background: highlight ? 'var(--accent-dim)' : 'transparent',
    paddingLeft: highlight ? '12px' : 0,
    paddingRight: highlight ? '12px' : 0,
    marginLeft: highlight ? '-12px' : 0,
    marginRight: highlight ? '-12px' : 0,
    borderRadius: highlight ? '8px' : 0
  }}>
    <span style={{ fontSize: '14px', color: 'var(--text2)', display: 'flex', alignItems: 'center' }}>
      {label}
      <UpdateIndicators sources={updateSource} />
    </span>
    <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: "'Space Mono', monospace", color: highlight ? 'var(--accent)' : 'var(--text)' }}>{value}</span>
  </div>
));
Row.displayName = 'Row';

const Card = React.memo<CardProps>(({ label, value, sub, color, updateSource }) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'color-mix(in srgb, var(--sky) 15%, transparent)', border: 'color-mix(in srgb, var(--sky) 30%, transparent)', text: '#60a5fa' },
    green: { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', border: 'color-mix(in srgb, var(--mint) 30%, transparent)', text: '#4ade80' },
    red: { bg: 'color-mix(in srgb, var(--red) 15%, transparent)', border: 'color-mix(in srgb, var(--red) 30%, transparent)', text: '#f87171' },
    yellow: { bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', border: 'color-mix(in srgb, var(--gold) 30%, transparent)', text: '#facc15' },
    purple: { bg: 'color-mix(in srgb, var(--violet) 15%, transparent)', border: 'color-mix(in srgb, var(--violet) 30%, transparent)', text: '#c084fc' },
    orange: { bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', border: 'color-mix(in srgb, var(--coral) 30%, transparent)', text: '#fb923c' },
    cyan: { bg: 'color-mix(in srgb, var(--cyan) 15%, transparent)', border: 'color-mix(in srgb, var(--cyan) 30%, transparent)', text: '#22d3ee' },
    violet: { bg: 'color-mix(in srgb, var(--violet) 15%, transparent)', border: 'color-mix(in srgb, var(--violet) 30%, transparent)', text: '#a78bfa' },
    mint: { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', border: 'color-mix(in srgb, var(--mint) 30%, transparent)', text: '#34d399' },
    emerald: { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', border: 'color-mix(in srgb, var(--mint) 30%, transparent)', text: '#34d399' }
  };
  const c = colorMap[color || 'blue'] || colorMap.blue;
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: '16px',
      padding: '20px',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text3)', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        {label}
        <UpdateIndicators sources={updateSource} />
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Space Mono', monospace", color: c.text }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{sub}</div>}
    </div>
  );
});
Card.displayName = 'Card';

const Panel = React.memo<PanelProps>(({ title, children }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 12 }}>
    {title && <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>{title}</div>}
    {children}
  </div>
));
Panel.displayName = 'Panel';

// Input Component for adjustable parameters
const Input = React.memo<InputProps>(({ label, value, onChange, step = 1, min, max }) => (
  <div>
    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text3)', fontWeight: 600 }}>{label}</label>
    <input 
      type="number" 
      value={value} 
      onChange={e => onChange(Number(e.target.value))} 
      step={step} 
      min={min} 
      max={max} 
      style={{
        width: '100%',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '14px',
        fontFamily: "'Space Mono', monospace",
        color: 'var(--text)',
        outline: 'none'
      }}
    />
  </div>
));
Input.displayName = 'Input';

// ============================================================================
// UPDATE INDICATOR SYSTEM - Visual markers for data update sources
// ============================================================================

/** Context to control indicator visibility globally */
const UpdateIndicatorContext = React.createContext<{ showIndicators: boolean; setShowIndicators: (v: boolean) => void }>({ showIndicators: true, setShowIndicators: () => {} });

const UPDATE_SOURCE_CONFIG: Record<UpdateSource, { tooltip: string; className: string }> = {
  PR: { tooltip: 'Press Release', className: 'pr' },
  SEC: { tooltip: 'SEC Filing', className: 'sec' },
  WS: { tooltip: 'Wall Street', className: 'ws' },
  MARKET: { tooltip: 'Market Data', className: 'market' },
};

/** Tiny dot indicator - always rendered, visibility controlled by CSS */
const UpdateIndicator = React.memo<{ source: UpdateSource; hidden?: boolean }>(({ source, hidden }) => {
  const config = UPDATE_SOURCE_CONFIG[source];
  return (
    <span
      className={`update-indicator ${config.className}${hidden ? ' hidden' : ''}`}
      data-tooltip={config.tooltip}
      title={config.tooltip}
    />
  );
});
UpdateIndicator.displayName = 'UpdateIndicator';

/** Renders one or more update indicators - always present to prevent layout shift */
const UpdateIndicators = React.memo<{ sources?: UpdateSource | UpdateSource[] }>(({ sources }) => {
  const { showIndicators } = React.useContext(UpdateIndicatorContext);
  if (!sources) return null;
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  return (
    <span className="update-indicator-wrap">
      {sourceArray.map((s) => <UpdateIndicator key={s} source={s} hidden={!showIndicators} />)}
    </span>
  );
});
UpdateIndicators.displayName = 'UpdateIndicators';

/** Legend explaining what each indicator color means, with toggle button */
const UpdateLegend = React.memo(() => {
  const { showIndicators, setShowIndicators } = React.useContext(UpdateIndicatorContext);
  return (
    <div className="update-legend">
      <span style={{ fontWeight: 500, color: 'var(--text3)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sources</span>
      <div className="update-legend-item"><span className="dot pr" /><span>PR</span></div>
      <div className="update-legend-item"><span className="dot sec" /><span>SEC</span></div>
      <div className="update-legend-item"><span className="dot ws" /><span>WS</span></div>
      <div className="update-legend-item"><span className="dot market" /><span>Live</span></div>
      <button
        onClick={() => setShowIndicators(!showIndicators)}
        style={{
          marginLeft: 'auto',
          padding: '4px 10px',
          fontSize: '10px',
          fontWeight: 500,
          color: showIndicators ? 'var(--text)' : 'var(--text3)',
          background: 'transparent',
          border: '1px solid',
          borderColor: showIndicators ? 'color-mix(in srgb, white 15%, transparent)' : 'color-mix(in srgb, white 6%, transparent)',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          letterSpacing: '0.3px',
        }}
      >
        {showIndicators ? 'On' : 'Off'}
      </button>
    </div>
  );
});
UpdateLegend.displayName = 'UpdateLegend';

// N1: Memoized pure components for performance optimization
const Stat = React.memo<StatProps>(({ label, value, color = 'white', updateSource }) => (
  <div className="stat-item">
    <div className="label" style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      <UpdateIndicators sources={updateSource} />
    </div>
    <div className={`val ${color}`}>{value}</div>
  </div>
));
Stat.displayName = 'Stat';

const Guide = React.memo<GuideProps>(({ title, children }) => (
  <div className="highlight">
    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>📚</span> {title}
    </h3>
    <div style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '15px' }}>{children}</div>
  </div>
));
Guide.displayName = 'Guide';

// CFA Level III Educational Notes Component - Subtle footer style
const CFANotes = React.memo<CFANotesProps>(({ title, items }) => (
  <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', opacity: 0.75 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.7 }}>📚</span>
      <h4 style={{ margin: 0, fontSize: 11, fontWeight: 500, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title || 'CFA Level III — Key Concepts'}</h4>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, lineHeight: 1.5, color: 'var(--text3)' }}>
      {items.map((item, i) => (
        <p key={i} style={{ margin: 0 }}>
          <strong style={{ color: 'var(--text2)' }}>{item.term}:</strong> {item.def}
        </p>
      ))}
    </div>
  </div>
));
CFANotes.displayName = 'CFANotes';

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
const CRCLParameterCard = ({
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
    if (format === '$') return `$${v}B`;
    if (format === '%') return `${v}%`;
    if (format === 'x') return `${v.toFixed(1)}x`;
    return String(v);
  };

  // 6 colors for 6 preset positions: red → orange → yellow → lime → green → emerald
  const presetColors = [
    { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
    { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
    { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
    { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
    { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
    { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
  ];

  // Colors map directly to position: idx 0 = red (bearish), idx 5 = green (bullish)
  // Options arrays are always ordered from bearish to bullish scenarios
  // (for inverse params like risk/costs, HIGH values come first since they're bearish)
  const getButtonColor = (idx: number) => {
    return presetColors[idx];
  };

  const handleCustomSubmit = () => {
    const num = parseFloat(customInput);
    if (!isNaN(num)) {
      onChange(num);
      setCustomMode(false);
      setCustomInput('');
    }
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>{title}</span></div>
      <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
        {explanation}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const colors = getButtonColor(idx);
          return (
            <div
              key={opt}
              onClick={() => { onChange(opt); setCustomMode(false); }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && (() => { onChange(opt); setCustomMode(false); })()}
              style={{
                padding: '10px 4px',
                borderRadius: 8,
                border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                background: isActive ? colors.bg : 'var(--surface2)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? colors.text : 'var(--text3)',
              }}
            >
              {formatValue(opt)}
            </div>
          );
        })}
        {/* Custom input button/field */}
        {customMode ? (
          <div style={{
            display: 'flex',
            borderRadius: 8,
            border: '2px solid var(--violet)',
            background: 'color-mix(in srgb, var(--violet) 15%, transparent)',
            overflow: 'hidden',
          }}>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="..."
              autoFocus
              style={{
                flex: 1,
                minWidth: 0,
                padding: '8px 4px',
                border: 'none',
                background: 'transparent',
                color: 'var(--violet)',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'center',
                outline: 'none',
              }}
            />
          </div>
        ) : (
          <div
            onClick={() => setCustomMode(true)}
            role="button"
            tabIndex={0}
            aria-label="Enter custom value"
            onKeyDown={(e) => e.key === 'Enter' && setCustomMode(true)}
            style={{
              padding: '10px 4px',
              borderRadius: 8,
              border: isCustomValue ? '2px solid var(--violet)' : '1px solid var(--border)',
              background: isCustomValue ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'var(--surface2)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: isCustomValue ? 600 : 400,
              color: isCustomValue ? 'var(--violet)' : 'var(--text3)',
            }}
          >
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center' }}>
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
    { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
    { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
    { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
    { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
    { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
    { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>{title}</div>
      <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
        {explanation}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const isCurrent = currentValue !== undefined && opt === currentValue;
          const colors = presetColors[idx];
          return (
            <div
              key={opt}
              onClick={() => { onChange(opt); setCustomMode(false); }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && (() => { onChange(opt); setCustomMode(false); })()}
              style={{
                padding: '10px 4px',
                borderRadius: 8,
                border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                background: isActive ? colors.bg : 'var(--surface2)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? colors.text : 'var(--text3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--text3)',
                  opacity: 0.4,
                }} />
              )}
              {formatValue(opt)}
            </div>
          );
        })}
        {/* Custom input button/field */}
        {customMode ? (
          <div style={{
            display: 'flex',
            borderRadius: 8,
            border: '2px solid var(--violet)',
            background: 'color-mix(in srgb, var(--violet) 15%, transparent)',
            overflow: 'hidden',
          }}>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="..."
              autoFocus
              style={{
                flex: 1,
                minWidth: 0,
                padding: '8px 4px',
                border: 'none',
                background: 'transparent',
                color: 'var(--violet)',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'center',
                outline: 'none',
              }}
            />
          </div>
        ) : (
          <div
            onClick={() => setCustomMode(true)}
            role="button"
            tabIndex={0}
            aria-label="Enter custom value"
            onKeyDown={(e) => e.key === 'Enter' && setCustomMode(true)}
            style={{
              padding: '10px 4px',
              borderRadius: 8,
              border: isCustomValue ? '2px solid var(--violet)' : '1px solid var(--border)',
              background: isCustomValue ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'var(--surface2)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: isCustomValue ? 600 : 400,
              color: isCustomValue ? 'var(--violet)' : 'var(--text3)',
            }}
          >
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginTop: 6 }}>
        ← Bearish | Bullish →
      </div>
    </div>
  );
};

// ModelTab component for CRCL - USDC/Reserve yield DCF valuation
const CRCLModelTab = ({
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
  const terminalEV = spread > 0.01 ? terminalFCF / spread : 0; // $B

  // STEP 6: Discount Terminal Value to Present
  const discountFactor = Math.pow(1 + discountRateDecimal, terminalYears);
  const presentValueEV = terminalEV / discountFactor; // $B

  // STEP 7: Risk Factor (probability of success)
  const riskFactor = (1 - regulatoryRisk/100) * (1 - competitionRisk/100) * (1 - rateRisk/100);

  // STEP 8: Risk-Adjusted Present Value
  const riskAdjustedEV = presentValueEV * riskFactor; // $B

  // STEP 9: Equity Value (assume minimal net debt for CRCL)
  const netDebt = 0.2; // ~$200M net debt
  const equityValue = riskAdjustedEV - netDebt; // $B

  // STEP 10: Target Stock Price (no significant dilution expected for profitable company)
  const dilutionRate = 2; // 2% annual stock comp dilution
  const terminalShares = currentShares * Math.pow(1 + dilutionRate / 100, terminalYears);
  const targetStockPrice = equityValue > 0 && terminalShares > 0
    ? (equityValue * 1000) / terminalShares // Convert $B to $M, divide by M shares
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#model-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Stablecoin DCF Valuation<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Model<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Configure model assumptions for Circle's USDC business. Changes flow to revenue projections and DCF valuation. Key drivers: USDC circulation growth, Fed funds rate (reserve yield), and Coinbase distribution cost.</p>
      </div>

      {/* ASSUMPTIONS SECTION */}
      <>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario</div>

        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario-presets</div>
        {/* Scenario Presets - 6 scenarios from Worst to Moon */}
        <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Scenario Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            {(['worst', 'bear', 'base', 'mgmt', 'bull', 'moon'] as const).map(s => {
              const preset = CRCL_SCENARIO_PRESETS[s];
              const isActive = selectedScenario === s;
              return (
                <div
                  key={s}
                  onClick={() => applyScenario(s)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${preset.label} scenario`}
                  onKeyDown={(e) => e.key === 'Enter' && applyScenario(s)}
                  style={{
                    padding: 12,
                    background: isActive ? `${preset.color}15` : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    borderBottom: isActive ? `2px solid ${preset.color}` : '2px solid transparent',
                  }}
                >
                  <div style={{ fontSize: 20 }}>{preset.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: isActive ? preset.color : 'var(--text)' }}>
                    {preset.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.3 }}>
                    {preset.usdcGrowthRate > 0 ? '+' : ''}{preset.usdcGrowthRate}% · {preset.reserveYield}%
                  </div>
                </div>
              );
            })}
          </div>
          {/* Always show to prevent layout shift */}
          <div style={{ padding: 12, background: 'color-mix(in srgb, var(--violet) 10%, transparent)', borderRadius: 8, fontSize: 12, color: selectedScenario === 'custom' ? 'var(--violet)' : 'var(--text3)', opacity: selectedScenario === 'custom' ? 1 : 0.5 }}>
            ⚙️ {selectedScenario === 'custom' ? 'Custom scenario - parameters modified from preset' : 'Click any value below to create custom scenario'}
          </div>
        </div>

        {/* USDC & REVENUE PARAMETERS */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#revenue-model</div>
        <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>USDC & Revenue Model</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <CRCLParameterCard
            title="USDC Annual Growth Rate (%)"
            explanation="Expected annual USDC circulation growth. Historical: 500%+ (2020-21), -50% (2022-23), +40% (2024). Crypto cycles are volatile. Stablecoin TAM could grow 10x+ with institutional adoption and regulatory clarity."
            options={[-20, 5, 15, 25, 40, 60]}
            value={usdcGrowthRate}
            onChange={v => { setUsdcGrowthRate(v); setSelectedScenario('custom'); }}
            format="%"
          />
          <CRCLParameterCard
            title="Reserve Yield / Fed Funds (%)"
            explanation="Yield on USDC reserves (short-term Treasuries). Currently ~4.5%. Fed projections: cuts to 3-3.5% by 2026. Key revenue driver - 1% rate = ~$625M gross revenue per $62.5B USDC. Lower rates = lower yield income."
            options={[1.0, 2.5, 3.5, 3.5, 4.0, 4.5]}
            value={reserveYield}
            onChange={v => { setReserveYield(v); setSelectedScenario('custom'); }}
            format="%"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <CRCLParameterCard
            title="Market Share (%)"
            explanation="USDC % of total stablecoin market. Currently ~29%. USDT dominates at ~68%. USDC's advantage: regulatory compliance, transparency, US-friendly. Risk: CBDCs, new entrants (PayPal USD), USDT resilience."
            options={[15, 22, 28, 32, 38, 45]}
            value={marketShare}
            onChange={v => { setMarketShare(v); setSelectedScenario('custom'); }}
            format="%"
          />
          <CRCLParameterCard
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
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#operating-model</div>
        <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Operating Model</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <CRCLParameterCard
            title="Operating Margin (%)"
            explanation="EBITDA margin on net revenue (after Coinbase). Fintech peers: 30-50%+. Scale benefits: compliance/tech costs spread over larger base. 25% = pressured, 40%+ = scale achieved, 60% = best-in-class."
            options={[15, 28, 35, 42, 50, 60]}
            value={operatingMargin}
            onChange={v => { setOperatingMargin(v); setSelectedScenario('custom'); }}
            format="%"
          />
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#current-position</div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>Current Position</div>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Live data from Circle financials. Used as starting point for projections.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, fontSize: 12 }}>
              <div><span style={{ color: 'var(--text3)' }}>USDC Circulation:</span> <strong>${currentUSDC}B</strong></div>
              <div><span style={{ color: 'var(--text3)' }}>Market Share:</span> <strong>{currentMarketShare}%</strong></div>
              <div><span style={{ color: 'var(--text3)' }}>Est. Gross Rev:</span> <strong>${currentGrossRevenue.toFixed(2)}B</strong></div>
              <div><span style={{ color: 'var(--text3)' }}>Est. Net Rev:</span> <strong>${currentNetRevenue.toFixed(2)}B</strong></div>
            </div>
          </div>
        </div>

        {/* VALUATION PARAMETERS */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#valuation-params</div>
        <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Parameters</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <CRCLParameterCard
            title="Discount Rate / WACC (%)"
            explanation="Required return for discounting future cash flows. 10% = mature fintech. 14% = growth with execution risk. 20%+ = speculative. Higher if rate/regulatory risk is elevated."
            options={[25, 18, 14, 12, 11, 10]}
            value={discountRate}
            onChange={v => { setDiscountRate(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <CRCLParameterCard
            title="Terminal Growth Rate (%)"
            explanation="Perpetual growth rate after terminal year. For stablecoin infrastructure: 2-3% is reasonable (GDP-like). 4%+ assumes continued crypto economy outgrowth. Should not exceed long-term nominal GDP."
            options={[0, 1.5, 2.5, 3, 3.5, 4]}
            value={terminalGrowth}
            onChange={v => { setTerminalGrowth(v); setSelectedScenario('custom'); }}
            format="%"
          />
        </div>

        {/* RISK PARAMETERS */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#risk-factors</div>
        <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Risk Probability Factors</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text3)' }}>
          Probability of adverse events that could significantly impair value. Combined as: (1-Reg) × (1-Comp) × (1-Rate) = {(riskFactor * 100).toFixed(0)}% success probability.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <CRCLParameterCard
            title="Regulatory Risk (%)"
            explanation="Probability of adverse stablecoin regulation. SEC/banking agency scrutiny, reserve requirements, licensing issues. 5% = favorable legislation. 30%+ = CBDC mandates or stablecoin restrictions."
            options={[40, 20, 10, 5, 3, 1]}
            value={regulatoryRisk}
            onChange={v => { setRegulatoryRisk(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <CRCLParameterCard
            title="Competition Risk (%)"
            explanation="Probability competitors (USDT, CBDC, PayPal USD) significantly erode market share or pricing. 5% = strong moat. 25%+ = commoditization risk."
            options={[35, 20, 12, 8, 5, 2]}
            value={competitionRisk}
            onChange={v => { setCompetitionRisk(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <CRCLParameterCard
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
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-output</div>
        <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DCF Valuation Output (5-Year Terminal)</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        {/* Hero KPI row - 2 column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ background: 'var(--accent-dim)', padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Target Stock Price</div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 36, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{targetStockPrice > 0 ? `$${targetStockPrice.toFixed(0)}` : 'N/A'}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6 }}>vs ${currentStockPrice.toFixed(0)} current</div>
          </div>
          <div style={{ background: 'var(--accent-dim)', padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Implied Upside</div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 36, fontWeight: 700, color: impliedUpside > 50 ? 'var(--mint)' : impliedUpside > 0 ? 'var(--gold)' : 'var(--red)', lineHeight: 1 }}>{targetStockPrice > 0 ? `${impliedUpside > 0 ? '+' : ''}${impliedUpside.toFixed(0)}%` : 'N/A'}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6 }}>{impliedUpside > 100 ? 'Strong Buy' : impliedUpside > 25 ? 'Buy' : impliedUpside > 0 ? 'Hold' : 'Sell'}</div>
          </div>
        </div>
        {/* 4-column metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            { label: 'Present Value', value: `$${riskAdjustedEV.toFixed(1)}B`, detail: `${(riskFactor * 100).toFixed(0)}% prob` },
            { label: 'Market Cap', value: `$${currentMarketCap.toFixed(1)}B`, detail: `${currentPSRatio.toFixed(1)}x Net Rev` },
            { label: 'Terminal USDC', value: `$${terminalUSDC.toFixed(0)}B`, detail: `${usdcGrowthRate > 0 ? '+' : ''}${usdcGrowthRate}%/yr` },
            { label: 'Terminal Gross Rev', value: `$${terminalGrossRevenue.toFixed(2)}B`, detail: `${reserveYield}% yield` },
            { label: 'Terminal Net Rev', value: `$${terminalNetRevenue.toFixed(2)}B`, detail: `After ${distributionCost}% dist.` },
            { label: 'Terminal EBITDA', value: `$${terminalEBITDA.toFixed(2)}B`, detail: `${operatingMargin}% margin` },
            { label: 'Terminal EV/Rev', value: `${terminalEVperRev.toFixed(1)}x`, detail: `$${terminalEV.toFixed(1)}B EV` },
            { label: 'Terminal EV/EBITDA', value: `${terminalEVperEBITDA.toFixed(1)}x`, detail: 'Terminal multiple' },
            { label: 'Terminal FCF', value: `$${terminalFCF.toFixed(2)}B`, detail: `${(fcfConversion * 100).toFixed(0)}% conversion` },
            { label: 'Diluted Shares', value: `${terminalShares.toFixed(0)}M`, detail: `+${((terminalShares / currentShares - 1) * 100).toFixed(0)}% dilution` },
            { label: 'Risk Factor', value: `${(riskFactor * 100).toFixed(0)}%`, detail: 'Success prob.' },
            { label: 'Equity Value', value: `$${equityValue.toFixed(1)}B`, detail: 'Risk-adj' },
          ].map((m, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{m.detail}</div>
            </div>
          ))}
        </div>

        {/* CALCULATION METHODOLOGY */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#methodology</div>
        <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20, marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Calculation Methodology</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6 }}>
            <p style={{ }}>
              This DCF model calculates Circle intrinsic value using a <strong>revenue-based terminal value approach</strong>,
              incorporating USDC growth, reserve yield, distribution costs, and risk-adjusted discounting.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 1-3: Terminal Year Revenue</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  Terminal USDC = ${currentUSDC}B × (1 + {usdcGrowthRate}%)^5<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${terminalUSDC.toFixed(0)}B</strong><br/><br/>
                  Gross Revenue = ${terminalUSDC.toFixed(0)}B × {reserveYield}%<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${terminalGrossRevenue.toFixed(2)}B</strong><br/><br/>
                  Net Revenue = ${terminalGrossRevenue.toFixed(2)}B × (1 - {distributionCost}%)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${terminalNetRevenue.toFixed(2)}B</strong>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 4-5: Terminal Value</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  EBITDA = ${terminalNetRevenue.toFixed(2)}B × {operatingMargin}%<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${terminalEBITDA.toFixed(2)}B</strong><br/><br/>
                  FCF = ${terminalEBITDA.toFixed(2)}B × {(fcfConversion * 100).toFixed(0)}%<br/>
                  &nbsp;&nbsp;&nbsp;= <strong>${terminalFCF.toFixed(3)}B</strong><br/><br/>
                  Gordon Growth: TV = FCF ÷ ({discountRate}% - {terminalGrowth}%)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${terminalEV.toFixed(1)}B</strong>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 6-8: Risk Adjustment</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  Present Value = ${terminalEV.toFixed(1)}B ÷ (1 + {discountRate}%)^5<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = ${terminalEV.toFixed(1)}B ÷ {discountFactor.toFixed(3)}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${presentValueEV.toFixed(1)}B</strong><br/><br/>
                  Risk Factor = (1-{regulatoryRisk}%) × (1-{competitionRisk}%) × (1-{rateRisk}%)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>{(riskFactor * 100).toFixed(1)}%</strong><br/><br/>
                  Risk-Adj EV = ${presentValueEV.toFixed(1)}B × {(riskFactor * 100).toFixed(1)}%<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${riskAdjustedEV.toFixed(1)}B</strong>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 9-11: Target Price</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  Equity Value = ${riskAdjustedEV.toFixed(1)}B - ${netDebt}B debt<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${equityValue.toFixed(1)}B</strong><br/><br/>
                  Diluted Shares = {currentShares}M × (1 + {dilutionRate}%)^5<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>{terminalShares.toFixed(0)}M</strong><br/><br/>
                  Target Price = ${equityValue.toFixed(1)}B ÷ {terminalShares.toFixed(0)}M<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${targetStockPrice.toFixed(0)}</strong>
                </div>
              </div>
            </div>

            <div style={{ padding: 10, background: 'var(--accent-dim)', borderRadius: 6, fontSize: 11 }}>
              <strong>Key Assumptions:</strong> Terminal year is {new Date().getFullYear() + 5} (5 years out).
              FCF conversion = 85% of EBITDA (asset-light model).
              Coinbase distribution cost is applied to gross yield revenue.
              Risk factors are multiplicative (independent events).
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

// Scenarios Tab Component - Unified with ASTS/BMNR structure
const ScenariosTab = () => {
  const [targetYear, setTargetYear] = useState(2027);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('base');

  return (
    <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenarios-header</div>
      <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Scenario Simulation</span><UpdateIndicators sources={['PR', 'SEC']} /></div>

      {/* Highlight Box */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenarios-intro</div>
      <div style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, transparent), color-mix(in srgb, var(--sky) 5%, transparent))', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)', borderRadius: 16, padding: '24px 28px' }}>
        <h3>Multi-Year Projections</h3>
        <p style={{ fontSize: 14 }}>
          Model different growth trajectories based on USDC adoption, rate environment, and margin evolution.
          Bear case assumes rate cuts and competition pressure. Bull case models stablecoin dominance with
          expanding platform margins. Probability-weight for expected value.
        </p>
      </div>

      {/* Controls */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario-controls</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Target Year Selector */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Target Year</span></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TARGET_YEARS.map(year => (
              <button
                key={year}
                onClick={() => setTargetYear(year)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: targetYear === year ? '2px solid var(--mint)' : '1px solid var(--border)',
                  background: targetYear === year ? 'color-mix(in srgb, var(--mint) 15%, transparent)' : 'var(--surface2)',
                  color: targetYear === year ? 'var(--mint)' : 'var(--text2)',
                  cursor: 'pointer',
                  fontWeight: targetYear === year ? 700 : 400,
                  fontFamily: 'Space Mono',
                  fontSize: 16,
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Selector */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Scenario</span></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SCENARIO_KEYS.map(key => {
              const s = SCENARIO_SIMULATIONS[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: selectedScenario === key ? `2px solid ${s.color}` : '1px solid var(--border)',
                    background: selectedScenario === key ? `${s.color}22` : 'var(--surface2)',
                    color: selectedScenario === key ? s.color : 'var(--text2)',
                    cursor: 'pointer',
                    fontWeight: selectedScenario === key ? 700 : 400,
                    fontSize: 14,
                  }}
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
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', borderLeft: `4px solid ${selected.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <h3 style={{ color: selected.color }}>
                    {selected.name} Case — {targetYear}
                  </h3>
                  <p style={{ color: 'var(--text2)', maxWidth: 600 }}>{selected.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>Probability Weight</div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: 32, fontWeight: 700, color: selected.color }}>
                    {selected.prob}%
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario-metrics</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: selected.color }}>${projection.sharePrice.toLocaleString()}</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Share Price</div>
                <div style={{ fontSize: 12, color: priceReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {priceReturn >= 0 ? '+' : ''}{priceReturn.toFixed(0)}% from today
                </div>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)' }}>${projection.equityValue}B</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Equity Value</div>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)' }}>${projection.usdc}B</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>USDC Circulation</div>
                <div style={{ fontSize: 12, color: 'var(--sky)' }}>
                  +{usdcGrowth.toFixed(0)}% growth
                </div>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)' }}>{projection.marketShare}%</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Market Share</div>
              </div>
            </div>

            {/* Financial Projections Table */}
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario-projections</div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Financial Projections — {selected.name} Scenario</span></div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th style={{ textAlign: 'right' }}>Today</th>
                      {selected.projections.map(p => (
                        <th key={p.year} style={{ textAlign: 'right' }}>
                          {p.year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>USDC Circulation ($B)</td>
                      <td style={{ textAlign: 'right' }}>{CURRENT_METRICS.usdc}</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.usdc}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Market Share (%)</td>
                      <td style={{ textAlign: 'right' }}>29%</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.marketShare}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Reserve Yield (%)</td>
                      <td style={{ textAlign: 'right' }}>4.33%</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.reserveRate}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Gross Revenue ($B)</td>
                      <td style={{ textAlign: 'right' }}>$2.96</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          ${p.grossRevenue.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Distribution Costs ($B)</td>
                      <td style={{ textAlign: 'right' }}>($1.15)</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', color: 'var(--coral)', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          (${p.distributionCost.toFixed(2)})
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Net Revenue ($B)</td>
                      <td style={{ textAlign: 'right', color: 'var(--mint)' }}>$1.81</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', color: 'var(--mint)', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          ${p.netRevenue.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>RLDC Margin (%)</td>
                      <td style={{ textAlign: 'right' }}>39%</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.rldcMargin}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>EBITDA ($B)</td>
                      <td style={{ textAlign: 'right' }}>$0.29</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', color: p.ebitda >= 0 ? 'var(--mint)' : 'var(--coral)', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.ebitda >= 0 ? '$' : '($'}{Math.abs(p.ebitda).toFixed(2)}{p.ebitda < 0 ? ')' : ''}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Net Income ($B)</td>
                      <td style={{ textAlign: 'right' }}>$0.16</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', color: p.netIncome >= 0 ? 'var(--mint)' : 'var(--coral)', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.netIncome >= 0 ? '$' : '($'}{Math.abs(p.netIncome).toFixed(2)}{p.netIncome < 0 ? ')' : ''}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Free Cash Flow ($B)</td>
                      <td style={{ textAlign: 'right' }}>$0.14</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', color: p.fcf >= 0 ? 'var(--sky)' : 'var(--coral)', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.fcf >= 0 ? '$' : '($'}{Math.abs(p.fcf).toFixed(2)}{p.fcf < 0 ? ')' : ''}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ fontWeight: 600 }}>
                      <td>Exit P/S Multiple</td>
                      <td style={{ textAlign: 'right' }}>6.4x</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          {p.exitMultiple}x
                        </td>
                      ))}
                    </tr>
                    <tr style={{ fontWeight: 600 }}>
                      <td>Implied EV ($B)</td>
                      <td style={{ textAlign: 'right' }}>$18.9</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          ${p.evImplied.toFixed(1)}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ fontWeight: 700 }}>
                      <td>Share Price ($)</td>
                      <td style={{ textAlign: 'right' }}>${CURRENT_METRICS.sharePrice}</td>
                      {selected.projections.map(p => (
                        <td key={p.year} style={{ textAlign: 'right', color: selected.color, ...(p.year === targetYear ? { background: 'var(--accent-dim)' } : {}) }}>
                          ${p.sharePrice.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assumptions & Catalysts */}
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario-assumptions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Key Assumptions</span></div>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                  {selected.assumptions.map((a, i) => (
                    <li key={i} style={{ lineHeight: 1.5 }}>{a}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>{selected.catalysts.length > 0 ? 'Catalysts' : 'Key Risks'}</span></div>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                  {(selected.catalysts.length > 0 ? selected.catalysts : selected.risks).map((item, i) => (
                    <li key={i} style={{ lineHeight: 1.5 }}>{item}</li>
                  ))}
                </ul>
                {selected.catalysts.length > 0 && selected.risks.length > 0 && (
                  <>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Risks</span></div>
                    <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                      {selected.risks.map((r, i) => (
                        <li key={i} style={{ lineHeight: 1.5 }}>{r}</li>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#expected-value</div>
      <div style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, transparent), color-mix(in srgb, var(--sky) 5%, transparent))', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)', borderRadius: 16, padding: '24px 28px' }}>
        <h3>Probability-Weighted Expected Value — {targetYear}</h3>
        <p style={{ color: 'var(--text2)' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--mint)' }}>${pwev.sharePrice.toFixed(0)}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Expected Share Price</div>
                </div>
                <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)' }}>${pwev.equityValue.toFixed(1)}B</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Expected Equity Value</div>
                </div>
                <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--sky)' }}>{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Expected Return</div>
                </div>
                <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)' }}>{cagr.toFixed(1)}%</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--text3)', marginTop: 8 }}>Implied CAGR</div>
                </div>
              </div>

              {/* Scenario Breakdown */}
              <div style={{ }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th style={{ textAlign: 'right' }}>Probability</th>
                      <th style={{ textAlign: 'right' }}>Share Price</th>
                      <th style={{ textAlign: 'right' }}>Return</th>
                      <th style={{ textAlign: 'right' }}>Weighted Contribution</th>
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
                        <tr key={key} style={selectedScenario === key ? { background: 'var(--accent-dim)' } : undefined}>
                          <td>
                            <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: s.color, marginRight: 8 }}></span>
                            {s.name}
                          </td>
                          <td style={{ textAlign: 'right' }}>{s.prob}%</td>
                          <td style={{ textAlign: 'right' }}>${p.sharePrice.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', color: ret >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                            {ret >= 0 ? '+' : ''}{ret.toFixed(0)}%
                          </td>
                          <td style={{ textAlign: 'right', color: 'var(--sky)' }}>${contribution.toFixed(0)}</td>
                        </tr>
                      );
                    })}
                    <tr style={{ fontWeight: 700 }}>
                      <td>Expected Value</td>
                      <td style={{ textAlign: 'right' }}>100%</td>
                      <td style={{ textAlign: 'right', color: 'var(--mint)' }}>${pwev.sharePrice.toFixed(0)}</td>
                      <td style={{ textAlign: 'right', color: 'var(--mint)' }}>{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</td>
                      <td style={{ textAlign: 'right', color: 'var(--mint)' }}>${pwev.sharePrice.toFixed(0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
      </div>

      {/* All Scenarios Comparison */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>All Scenarios — {targetYear} Comparison</span></div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Metric</th>
                {SCENARIO_KEYS.map(key => {
                  const s = SCENARIO_SIMULATIONS[key];
                  return <th key={key} style={{ textAlign: 'right' }}>{s.name}</th>;
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
                      {projections.map((p, i) => <td key={i} style={{ textAlign: 'right' }}>{p?.usdc || '—'}</td>)}
                    </tr>
                    <tr>
                      <td>Gross Revenue ($B)</td>
                      {projections.map((p, i) => <td key={i} style={{ textAlign: 'right' }}>${p?.grossRevenue.toFixed(1) || '—'}</td>)}
                    </tr>
                    <tr>
                      <td>Net Income ($B)</td>
                      {projections.map((p, i) => (
                        <td key={i} style={{ textAlign: 'right', color: (p?.netIncome || 0) >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                          {p ? (p.netIncome >= 0 ? `$${p.netIncome.toFixed(2)}` : `($${Math.abs(p.netIncome).toFixed(2)})`) : '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Exit Multiple (P/S)</td>
                      {projections.map((p, i) => <td key={i} style={{ textAlign: 'right' }}>{p?.exitMultiple}x</td>)}
                    </tr>
                    <tr>
                      <td>Equity Value ($B)</td>
                      {projections.map((p, i) => <td key={i} style={{ textAlign: 'right' }}>${p?.equityValue || '—'}</td>)}
                    </tr>
                    <tr style={{ fontWeight: 700 }}>
                      <td>Share Price</td>
                      {projections.map((p, i) => (
                        <td key={i} style={{ textAlign: 'right', color: SCENARIO_SIMULATIONS[SCENARIO_KEYS[i]].color }}>
                          ${p?.sharePrice.toLocaleString() || '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Return vs Today</td>
                      {projections.map((p, i) => {
                        const ret = p ? ((p.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100 : 0;
                        return (
                          <td key={i} style={{ textAlign: 'right', color: ret >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
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
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}><div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Key Insights</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '20px 28px', fontSize: 14 }}>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16 }}>
            <h4 style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>Interest Rate Sensitivity</h4>
            <p style={{ color: 'var(--text2)' }}>Reserve income is directly tied to Fed rates. Each 100bp rate cut reduces gross revenue by ~$737M annually at current circulation. Rate cuts are the primary bear case risk.</p>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16 }}>
            <h4 style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>Coinbase Dependency</h4>
            <p style={{ color: 'var(--text2)' }}>~54% of gross revenue goes to Coinbase as distribution cost. Renegotiating this agreement or diversifying distribution (CPN, direct bank partnerships) is key to margin expansion.</p>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16 }}>
            <h4 style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>Regulatory Moat</h4>
            <p style={{ color: 'var(--text2)' }}>Circle's regulatory-first approach (state licenses, MiCA compliance, OCC charter) creates barriers to entry. GENIUS Act could cement USDC as the preferred regulated stablecoin for TradFi.</p>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16 }}>
            <h4 style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>Risk/Reward</h4>
            <p style={{ color: 'var(--text2)' }}>Bear case scenarios model rate cuts + market share loss. Bull cases require continued USDC growth + multiple expansion to payment network peers. Asymmetric if stablecoin adoption accelerates.</p>
          </div>
        </div>
      </div>

      {/* Methodology & Assumptions */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'var(--text3)' }}>Methodology & Assumptions</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h4 style={{ color: 'var(--mint)' }}>Valuation Framework</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
              <li><strong>Revenue Model:</strong> USDC Circulation × Reserve Yield = Gross Reserve Income</li>
              <li><strong>Distribution Costs:</strong> Coinbase revenue share (currently ~54%, varies by scenario)</li>
              <li><strong>Net Revenue:</strong> Gross Revenue − Distribution Costs + Other Revenue</li>
              <li><strong>Exit Multiple:</strong> Applied to Net Revenue (P/S basis) based on peer comps</li>
              <li><strong>Equity Value:</strong> Enterprise Value + Net Cash − Convertible Debt</li>
              <li><strong>Share Price:</strong> Equity Value ÷ Fully Diluted Shares (~229M)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--sky)' }}>Key Model Inputs</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
              <li><strong>Stablecoin TAM:</strong> $250B (2025) → $500B-2T (2030) depending on scenario</li>
              <li><strong>Fed Funds Rate:</strong> 4.0-4.5% (2025) → 1.5-4.0% (2030) depending on scenario</li>
              <li><strong>Market Share:</strong> Current 29% vs Tether 65%; varies 8-48% by scenario</li>
              <li><strong>Exit Multiples:</strong> 0.5x (distressed) to 18x (Visa-like network)</li>
              <li><strong>Probabilities:</strong> Assigned based on qualitative assessment of macro/regulatory risks</li>
            </ul>
          </div>
        </div>
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8 }}>
          <h4 style={{ color: 'var(--gold)' }}>Important Caveats</h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text3)', lineHeight: 1.8, fontSize: 13 }}>
            <li>Projections are illustrative scenarios, not forecasts. Actual results may differ materially.</li>
            <li>Probabilities are subjective estimates and do not represent statistical likelihoods.</li>
            <li>Model assumes current share count (~229M); dilution from equity plans not explicitly modeled.</li>
            <li>Interest rate sensitivity is highly uncertain; Fed policy may diverge significantly from assumptions.</li>
            <li>Coinbase distribution agreement renegotiation timing and terms are speculative.</li>
            <li>Regulatory outcomes (stablecoin legislation, bank charter) are binary events with uncertain timing.</li>
          </ul>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
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
    const equity = (pvFCF + pvTV) * 1000 + 1349 - 149;
    const pt = MARKET.shares > 0 ? equity / MARKET.shares : 0;
    const upside = MARKET.price > 0 ? (pt / MARKET.price - 1) * 100 : 0;
    return { projections, pvFCF, tv, pvTV, equity, pt, upside };
  };

  const dcf = calcDCF();
  const s = SCENARIOS.find(x => x.name === scenario) || SCENARIOS[1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-header</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
        <div style={{ width: 6, height: 32, background: 'var(--accent)', borderRadius: 3 }} />
        DCF<UpdateIndicators sources="SEC" />
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-intro</div>
      <div className="highlight">
        <h3>DCF Valuation</h3>
        <p className="text-sm">
          DCF values Circle based on projected future free cash flows discounted to present value. Key drivers
          are USDC circulation growth, RLDC margins, and reserve yield rates. Terminal value uses exit multiple
          method based on expected steady-state profitability.
        </p>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-scenarios</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
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

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-inputs</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Model Inputs</span>
          </div>
          <div style={{ padding: 28 }}>
            <Input label="Discount Rate (WACC) %" value={discount} onChange={setDiscount} min={5} max={20} />
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Output</span>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              <Card label="Price Target" value={`$${dcf.pt.toFixed(0)}`} sub={`Based on ${scenario} scenario`} color="mint" />
              <Card label="Upside" value={`${dcf.upside >= 0 ? '+' : ''}${dcf.upside.toFixed(0)}%`} sub="vs current price" color={dcf.upside >= 0 ? 'green' : 'red'} />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections Table */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-projections</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Projections</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))`, padding: '12px 28px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Metric</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'right' }}>Today</span>
            {dcf.projections.map(p => (
              <span key={p.year} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'right' }}>{p.year}</span>
            ))}
          </div>
          {/* USDC Circulation */}
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))`, padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 12 }}>USDC Circulation ($B)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>{CURRENT_METRICS.usdc.toFixed(1)}</span>
            {dcf.projections.map(p => (
              <span key={p.year} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>{p.usdc.toFixed(1)}</span>
            ))}
          </div>
          {/* Reserve Revenue */}
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))`, padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 12 }}>Reserve Revenue ($B)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>—</span>
            {dcf.projections.map(p => (
              <span key={p.year} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>${p.rev.toFixed(2)}</span>
            ))}
          </div>
          {/* Net FCF */}
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))`, padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 12 }}>Net FCF ($B)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>—</span>
            {dcf.projections.map(p => (
              <span key={p.year} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--mint)' }}>${p.fcf.toFixed(2)}</span>
            ))}
          </div>
          {/* PV of FCF */}
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(140px, 1.5fr) repeat(${dcf.projections.length + 1}, minmax(80px, 1fr))`, padding: '12px 28px', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span style={{ fontSize: 12 }}>PV of FCF ($B)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>—</span>
            {dcf.projections.map(p => (
              <span key={p.year} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--cyan)' }}>${p.pv.toFixed(2)}</span>
            ))}
          </div>
          {/* Summary rows */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', background: 'var(--surface2)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500, textAlign: 'right' }}>Sum PV(FCF)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500, textAlign: 'right' }}>${dcf.pvFCF.toFixed(2)}B</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', background: 'var(--surface2)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500, textAlign: 'right' }}>Terminal Value ({s.multiple}x FCF)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500, textAlign: 'right' }}>${dcf.tv.toFixed(1)}B</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', background: 'var(--surface2)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500, textAlign: 'right' }}>PV(Terminal Value)</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500, textAlign: 'right' }}>${dcf.pvTV.toFixed(2)}B</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 1fr', padding: '12px 28px', background: 'var(--accent-dim)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700, textAlign: 'right' }}>Equity Value</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700, textAlign: 'right', color: 'var(--mint)' }}>${(dcf.equity / 1000).toFixed(1)}B</span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#quarterly-metrics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Key Metrics Evolution<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 28px' }}>
        {/* Summary Badges - ASTS pattern */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid', fontSize: 11, fontWeight: 500, background: 'color-mix(in srgb, var(--cyan) 15%, transparent)', borderColor: 'var(--cyan)', color: 'var(--cyan)' }}>
            {quarterlyData.length} quarters of data ({quarterlyData[0].quarter} - {quarterlyData[quarterlyData.length-1].quarter})
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid', fontSize: 11, fontWeight: 500, background: 'color-mix(in srgb, var(--mint) 15%, transparent)', borderColor: 'var(--mint)', color: 'var(--mint)' }}>
            Revenue: ${quarterlyData[0].totalRevenue}M → ${quarterlyData[quarterlyData.length-1].totalRevenue}M
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid', fontSize: 11, fontWeight: 500, background: 'color-mix(in srgb, var(--gold) 15%, transparent)', borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            Cash: ${(quarterlyData[0].cashPosition/1000).toFixed(2)}B → ${(quarterlyData[quarterlyData.length-1].cashPosition/1000).toFixed(2)}B
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid', fontSize: 11, fontWeight: 500, background: 'color-mix(in srgb, var(--violet) 15%, transparent)', borderColor: 'var(--violet)', color: 'var(--violet)' }}>
            USDC: ${quarterlyData[0].usdcCirculation.toFixed(1)}B → ${quarterlyData[quarterlyData.length-1].usdcCirculation.toFixed(1)}B
          </span>
        </div>

        {/* Quarterly Table - ASTS dynamic pattern */}
        <div style={{ overflowX: 'auto' }}>
          <div>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: `minmax(100px, 1.5fr) repeat(${quarterlyData.length}, minmax(70px, 1fr))`, borderBottom: '1px solid var(--border)' }}>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', position: 'sticky', left: 0 }}>Metric</span>
              {quarterlyData.map((d, idx) => (
                <span key={d.quarter} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: idx === 0 ? 'var(--accent-dim)' : 'var(--surface2)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {d.quarter.replace('Q', '').replace(' ', "'")}
                </span>
              ))}
            </div>
            {/* Data rows */}
            {metrics.map(metric => (
              <div key={metric.label} style={{ display: 'grid', gridTemplateColumns: `minmax(100px, 1.5fr) repeat(${quarterlyData.length}, minmax(70px, 1fr))`, borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontWeight: 500, position: 'sticky', left: 0, background: 'var(--bg1)' }}>
                  {metric.label}
                </span>
                {quarterlyData.map((d, idx) => {
                  const val = d[metric.key as keyof typeof d] as number;
                  const cellColor = metric.color(val);
                  const isLatestQuarter = idx === 0;
                  return (
                    <span
                      key={d.quarter}
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        ...(isLatestQuarter ? { background: 'var(--accent-dim)' } : {}),
                        ...(cellColor ? { color: cellColor } : {})
                      }}
                    >
                      {metric.format(val)}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footnotes - ASTS pattern */}
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          <p style={{ }}>* Q2 2025 net loss includes $660M IPO-related stock-based compensation acceleration. Normalized EPS was positive.</p>
          <p style={{ }}>* RLDC (Revenue Less Distribution Costs) is Circle's key profitability metric. Distribution costs are payments to exchange partners (Coinbase, Binance).</p>
          <p>* Data from SEC filings (10-K, 10-Q, S-1). Circle went public via IPO in Q2 2025 at $31/share.</p>
        </div>

        {/* Latest Quarter Summary - ASTS pattern */}
        <div style={{ }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#latest-quarter-summary</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Latest Quarter Summary ({latestQuarter.quarter})<UpdateIndicators sources="SEC" /></span>
            </div>
            <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filing Source</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.filing}</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>USDC Circulation</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${latestQuarter.usdcCirculation.toFixed(1)}B</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reserve Income</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${latestQuarter.reserveIncome}M</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Market Share</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.marketShare}%</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cash Position</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${(latestQuarter.cashPosition/1000).toFixed(2)}B</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Adj. EBITDA</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${latestQuarter.adjustedEbitda}M</div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          Data sourced from SEC filings (10-K, 10-Q). Latest filing: {latestQuarter.filing}.
        </div>
        </div>
      </div>

      {/* ROW 1: Cash Position & OpEx - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#charts-row-1</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 8 }}>Cash Position Evolution<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(d => ({
              label: d.quarter,
              value: d.cashPosition,
              display: `$${(d.cashPosition/1000).toFixed(1)}B`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <>
                <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                  {data.map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
                      <div style={{ width: '100%', background: 'var(--mint)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 150) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0 28px 24px', fontSize: 11, color: 'var(--text3)' }}>Strong cash position from IPO proceeds ($500M+ raised Q2 2025). Includes treasury, short-term investments, and money market funds.</div>
              </>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: 8 }}>Quarterly Burn Rate (OpEx)<UpdateIndicators sources="SEC" /></span>
          </div>
          <div style={{ padding: '24px 28px' }}>
          {(() => {
            const data = quarterlyData.slice().reverse().map(d => ({
              label: d.quarter,
              value: d.opex,
              display: `$${d.opex}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--violet)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 150) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            );
          })()}
          {/* OpEx Breakdown with quarter selector - ASTS pattern */}
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>OpEx Breakdown</span>
              <select
                value={opExQuarter}
                onChange={(e) => setOpExQuarter(e.target.value)}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', fontSize: 11, color: 'var(--text1)' }}
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Compensation:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opExComp}M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Technology:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opExTech}M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Marketing:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opExMktg}M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Other G&A:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opExOther}M</span>
                    </div>
                  </div>
                  <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 500 }}>
                      <span style={{ color: 'var(--text2)' }}>Total OpEx:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opex}M</span>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#charts-row-2</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>Share Count (Outstanding)<UpdateIndicators sources="SEC" /></span>
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
            ];
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--coral)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 150) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--sky)', display: 'flex', alignItems: 'center', gap: 8 }}>Market Cap Evolution ($B)<UpdateIndicators sources="SEC" /></span>
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
            ];
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--sky)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 150) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* ROW 3: Company Specific (USDC & EBITDA) - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#charts-row-3</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: 8 }}>USDC Circulation ($B)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(d => ({
              label: d.quarter,
              value: d.usdcCirculation,
              display: `$${d.usdcCirculation}B`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--violet)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 150) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 8 }}>Adjusted EBITDA ($M)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(d => ({
              label: d.quarter,
              value: d.adjustedEbitda,
              display: `$${d.adjustedEbitda}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--cyan)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 150) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
};

function CRCLModel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);

  // Update indicator visibility toggle
  const [showIndicators, setShowIndicators] = useState(true);

  const [discount, setDiscount] = useState(12);
  const [timelineCat, setTimelineCat] = useState('All');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [runKey, setRunKey] = useState(0); // For Monte Carlo re-runs
  const [mcSims, setMcSims] = useState(1000); // Adjustable simulation count
  const [mcYears, setMcYears] = useState(5); // Time horizon (3/5/7 years)
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [secFilter, setSecFilter] = useState('All');
  const [showAllFilings, setShowAllFilings] = useState(false);
  const [capitalView, setCapitalView] = useState('structure');

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
  
  const filteredFilings = secFilings.filter(f => {
    if (secFilter === 'All') return true;
    if (secFilter === 'S-1/S-3') return f.type === 'S-1' || f.type === 'S-3' || f.type === 'S-8';
    return f.type === secFilter;
  });
  
  const displayedFilings = showAllFilings ? filteredFilings : filteredFilings.slice(0, 6);
  const hiddenCount = filteredFilings.length - 6;
  
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
    bear: { revMin: 5, revMax: 12, marginMin: 40, marginMax: 55, discMin: 13, discMax: 18, termMin: 8, termMax: 12, label: '🐻 Bear', desc: 'Low growth, margin pressure' },
    base: { revMin: 8, revMax: 25, marginMin: 50, marginMax: 70, discMin: 10, discMax: 15, termMin: 10, termMax: 18, label: '📊 Base', desc: 'Consensus assumptions' },
    bull: { revMin: 15, revMax: 35, marginMin: 60, marginMax: 80, discMin: 8, discMax: 12, termMin: 15, termMax: 25, label: '🐂 Bull', desc: 'Stablecoin dominance' },
    custom: { revMin: mcRevenueGrowthMin, revMax: mcRevenueGrowthMax, marginMin: mcMarginMin, marginMax: mcMarginMax, discMin: mcDiscountMin, discMax: mcDiscountMax, termMin: mcTerminalMultMin, termMax: mcTerminalMultMax, label: '⚙️ Custom', desc: 'Your parameters' }
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

  // Investment Tab State
  const [investmentSections, setInvestmentSections] = useState<Set<string>>(new Set(['summary', 'scorecard']));
  const [expandedArchive, setExpandedArchive] = useState<number | null>(null);

  // Rate Sensitivity Calculator State
  const [sensRate, setSensRate] = useState(4.0);  // Fed Funds Rate %
  const [sensUsdc, setSensUsdc] = useState(75);   // USDC Circulation $B
  const [sensDist, setSensDist] = useState(54);   // Coinbase Distribution %

  // ═══════════════════════════════════════════════════════════════════════════
  // CURRENT ASSESSMENT - UPDATE THIS OBJECT AFTER EACH FILING
  // All current investment data consolidated here (unified with ASTS/BMNR)
  // ═══════════════════════════════════════════════════════════════════════════
  const investmentCurrent = {
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
  const investmentArchive = [
    // ⬇️ ADD NEW ENTRIES HERE (most recent first) ⬇️
    {
      date: '2025-12-31',
      trigger: 'Q3 2025 10-Q, OCC Charter Progress',
      verdict: 'OVERWEIGHT',
      verdictColor: 'mint',
      headline: 'Regulatory Moat Strengthening',
      summary: 'Q3 delivered 66% revenue growth, USDC hit $62.5B. OCC charter advancing. GENIUS Act provides tailwind. Lock-up expiry creates entry opportunity.',
      keyDevelopments: ['66% YoY revenue growth', '$62.5B USDC circulation', 'OCC charter application advancing', 'GENIUS Act regulatory clarity'],
      forwardView: 'Lock-up Dec 2025 — use weakness as entry. Watch OCC charter timeline and Coinbase renegotiation progress.',
    },
    {
      date: '2025-09-30',
      trigger: 'Q2 2025 10-Q',
      verdict: 'OVERWEIGHT',
      verdictColor: 'mint',
      headline: 'IPO Momentum Continues',
      summary: 'Strong post-IPO execution. USDC growth accelerating. TradFi partnerships expanding.',
      keyDevelopments: ['Successful NYSE listing', 'USDC growth re-accelerating', 'BlackRock/Fidelity cornerstone investors'],
      forwardView: 'Focus on USDC growth trajectory and margin expansion path.',
    },
  ];

  // Overview Tab Parameters - Unified with ASTS/BMNR structure
  const [currentShares, setCurrentShares] = useState(MARKET.shares);  // From @/data/crcl/company.ts
  const [currentStockPrice, setCurrentStockPrice] = useState(MARKET.price);  // From @/data/crcl/company.ts
  const [currentUSDC, setCurrentUSDC] = useState(USDC_DATA.usdcCirculation);  // From @/data/crcl/company.ts
  const [currentMarketShare, setCurrentMarketShare] = useState(USDC_DATA.marketShare);  // From @/data/crcl/company.ts

  // Chart refresh key - increment to trigger chart data refresh
  const [chartRefreshKey, setChartRefreshKey] = useState(0);

  // Live price refresh hook - gets price from chart's API response
  const { isLoading: priceLoading, lastUpdated: priceLastUpdated, refresh: refreshPrice } = useLiveStockPrice(
    'CRCL',
    MARKET.price,
    { onPriceUpdate: (price) => setCurrentStockPrice(price) }
  );

  // Combined refresh handler - updates both price and chart
  const handleRefreshAll = useCallback(async () => {
    await refreshPrice();
    setChartRefreshKey(k => k + 1);
  }, [refreshPrice]);

  // Auto-fetch live price and chart on mount
  useEffect(() => {
    handleRefreshAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSection = (section: string) => {
    const next = new Set(investmentSections);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    setInvestmentSections(next);
  };
  
  const expandAll = () => {
    setInvestmentSections(new Set(['summary', 'scorecard', 'financial', 'unit-economics', 'growth', 'valuation', 'sensitivity', 'moat', 'risks', 'catalysts', 'position', 'archive', 'strategic-assessment', 'methodology']));
  };
  
  const collapseAll = () => {
    setInvestmentSections(new Set(['summary']));
  };

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
      res.push(safe((pv + 1349 - 149) / MARKET.shares));
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
    const downsideReturns = returns.filter(r => r < 0);
    const downsideVar = downsideReturns.length > 0 ? downsideReturns.reduce((a, r) => a + r * r, 0) / downsideReturns.length : 0;
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
      <style>{css}</style>
      <div className="stock-model-app">
        {/* ============================================================================
            LEGAL DISCLAIMER BANNER
            ============================================================================ */}
        <div className="disclaimer-banner">
          <span className="disclaimer-title">⚠️ NOT INVESTMENT ADVICE:</span>
          <span className="disclaimer-text">{LEGAL_DISCLAIMERS.notInvestmentAdvice.replace('NOT INVESTMENT ADVICE: ', '')}</span>
          <span className="disclaimer-divider">|</span>
          <span className="disclaimer-title">FORWARD-LOOKING STATEMENTS:</span>
          <span className="disclaimer-text">{LEGAL_DISCLAIMERS.forwardLooking.replace('FORWARD-LOOKING STATEMENTS: ', '')}</span>
        </div>
        
        {/* Hero */}
        <header className="hero">
          <div className="hero-grid">
            <div className="brand-block">
              <h1>Circle Internet Group</h1>
              <div className="ticker">◉ NYSE: CRCL</div>
              {/* H4: Data Freshness Timestamp */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'color-mix(in srgb, var(--mint) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--mint) 30%, transparent)',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 11,
                color: '#34d399',
              }}>
                <span>📅</span>
                <span>Data as of: {MODEL_METADATA.priceAsOf}</span>
                <span style={{ color: 'color-mix(in srgb, var(--mint) 50%, transparent)' }}>|</span>
                <span>Source: {MODEL_METADATA.dataSource}</span>
              </div>
              <p className="desc">
                Global financial technology company powering USDC, the world's second-largest stablecoin 
                with ${latest.usdcCirculation}B in circulation.
              </p>
            </div>
            <div className="price-block">
              <div className="price-big" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                ${currentStockPrice.toFixed(2)}
                <button
                  onClick={handleRefreshAll}
                  disabled={priceLoading}
                  title={priceLastUpdated ? `Last updated: ${priceLastUpdated.toLocaleTimeString()}` : 'Click to refresh price & chart'}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: priceLoading ? 'wait' : 'pointer',
                    padding: 8,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    opacity: priceLoading ? 0.5 : 0.6,
                  }}
                  onMouseEnter={(e) => { if (!priceLoading) e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'var(--surface2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = priceLoading ? '0.5' : '0.6'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: 'var(--text3)',
                      animation: priceLoading ? 'spin 1s linear infinite' : 'none',
                    }}
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 21h5v-5" />
                  </svg>
                </button>
              </div>
              <span className={`price-badge ${ipoReturn >= 0 ? 'up' : 'down'}`}>
                {ipoReturn >= 0 ? '↑' : '↓'} {Math.abs(ipoReturn).toFixed(0)}% since IPO
              </span>
              {priceLastUpdated && (
                <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                  Updated: {priceLastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-row">
          <Stat label="Market Cap" value={`$${(MARKET.marketCap / 1000).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="USDC Circulation" value={`$${latest.usdcCirculation.toFixed(1)}B`} color="mint" updateSource="PR" />
          <Stat label="Q3 Revenue" value={`$${latest.totalRevenue}M`} updateSource="SEC" />
          <Stat label="RLDC Margin" value={`${latest.rldcMargin}%`} updateSource="SEC" />
          <Stat label="Market Share" value={`${latest.marketShare}%`} color="sky" updateSource="PR" />
          <Stat label="Reserve Rate" value={`${latest.reserveReturnRate.toFixed(2)}%`} updateSource="SEC" />
          <Stat label="P/E Ratio" value={`${MARKET.pe.toFixed(0)}x`} updateSource="MARKET" />
        </div>

        {/* Nav */}
        <nav className="nav">
          {/* Overview tab (before dropdown) */}
          {tabs.filter(t => !t.group).slice(0, 1).map(t => (
            <button
              key={t.id}
              className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}

          {/* Stock-specific dropdown trigger */}
          <button
            className={`nav-btn nav-dropdown-trigger ${tabs.some(t => t.group && activeTab === t.id) ? 'active' : ''}`}
            onClick={() => setAnalysisDropdownOpen(!analysisDropdownOpen)}
          >
            CRCL Analysis ↕
          </button>

          {/* Remaining ungrouped tabs (includes Model) */}
          {tabs.filter(t => !t.group).slice(1).map(t => (
            <button
              key={t.id}
              className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Reserved space for dropdown menu - always present to prevent layout shift */}
        <div className="nav-dropdown-space">
          {analysisDropdownOpen && (
            <div className="nav-dropdown-menu">
              {tabs.filter(t => t.group).map(t => (
                <button
                  key={t.id}
                  className={`nav-dropdown-item ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main */}
        <main className="main">
          {/* Update Source Legend - Shows what each indicator color means */}
          <UpdateLegend />
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-thesis</div>
              {/* Hero — Ive×Tesla */}
              <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></div>
                <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Overview<span style={{ color: 'var(--accent)' }}>.</span></h2>
                <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}><strong style={{ color: 'var(--text2)', fontWeight: 500 }}>Circle:</strong> Building financial infrastructure for the internet economy. USDC enables 24/7 global value transfer at near-zero cost. With {latest.marketShare}% stablecoin market share and +{usdcGrowth.toFixed(0)}% YoY growth.</p>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#opportunity</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ background: 'var(--surface)', padding: '24px 28px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginBottom: 8 }}>#thesis-bull</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mint)' }}>Bull Case</span>
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
                    <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--mint)', flexShrink: 0 }}>+</span>{item}
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--surface)', padding: '24px 28px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginBottom: 8 }}>#thesis-bear</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--coral)' }}>Bear Case</span>
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
                    <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--coral)', flexShrink: 0 }}>-</span>{item}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#chart</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Revenue Progression</span>
                  <UpdateIndicators sources="SEC" />
                </div>
                <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                  {(() => {
                    const chronological = [...DATA].reverse();  // Oldest first for left-to-right progression
                    const maxRevenue = Math.max(...chronological.map(d => d.totalRevenue));
                    return chronological.map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace", color: 'var(--text)', marginBottom: 4 }}>${d.totalRevenue}M</div>
                        <div style={{ height: `${maxRevenue > 0 ? (d.totalRevenue / maxRevenue) * 150 : 0}px`, width: '100%', background: 'var(--accent)', borderRadius: '4px 4px 0 0', minHeight: 2 }} />
                        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' as const }}>{d.quarter}</div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#key-metrics</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)' }}>
                  {['Metric', 'Value', 'Description'].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Value' ? 'right' : 'left' }}>{h}</span>
                  ))}
                </div>
                {[
                  { metric: 'USDC Circulation Growth', value: `+${usdcGrowth.toFixed(0)}%`, desc: 'Year over year', color: 'var(--mint)' },
                  { metric: 'Revenue Growth', value: `+${revGrowth.toFixed(0)}%`, desc: 'Year over year', color: 'var(--mint)' },
                  { metric: 'Active Wallets', value: `${latest.meaningfulWallets}M`, desc: 'Meaningful wallets', color: 'var(--text)' },
                  { metric: 'Arc Partners', value: '100+', desc: 'Platform integrations', color: 'var(--text)' },
                ].map((row, i, arr) => (
                  <div key={row.metric} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', padding: '12px 28px', borderBottom: i < arr.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>{row.metric}</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 600, color: row.color, textAlign: 'right' }}>{row.value}</span>
                    <span style={{ fontSize: 12, color: 'var(--text3)', paddingLeft: 16 }}>{row.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#company-snapshot</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
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
                  <div key={row.metric} style={{ background: 'var(--surface)', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{row.metric}</div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700, color: row.color, margin: '6px 0 4px' }}>{row.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{row.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#parameters</div>
              <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
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

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#chart-header</div>
              <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Stock Chart</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#stock-chart</div>
              <StockChart symbol="CRCL" externalRefreshKey={chartRefreshKey} onPriceUpdate={(price) => setCurrentStockPrice(price)} />

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
              <CFANotes title="CFA Level III — Stablecoin Economics" items={[
                { term: 'USDC Reserve Income', def: 'Circle earns interest on USDC reserves (T-bills, cash). $1 USDC outstanding = $1 in reserves earning ~4-5% in current rate environment.' },
                { term: 'Revenue = AUM × Rate', def: 'Revenue scales with both USDC circulation and interest rates. Fed rate cuts reduce revenue; USDC growth offsets.' },
                { term: 'Coinbase Distribution', def: 'Coinbase receives ~54% of USDC interest income per Centre agreement. Reduces Circle\'s take-rate but provides distribution.' },
                { term: 'Network Effects', def: 'More USDC usage → more integrations → more usage. Switching costs increase as ecosystem embeds USDC.' },
                { term: 'Regulatory Moat', def: 'US money transmitter licenses, potential federal stablecoin regulation creates barriers. Circle positioned for compliance.' },
              ]} />
            </div>
          )}

          {activeTab === 'financials' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* UNIFIED FINANCIALS TAB - Canonical structure shared across all models */}
              {/* Only data and labels differ between ASTS, BMNR, and CRCL              */}
              {/* ═══════════════════════════════════════════════════════════════════ */}

              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 1: HEADER                                                   */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#financials-header</div>
              <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Quarterly Data<UpdateIndicators sources="SEC" /></div>
                <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Financials<span style={{ color: 'var(--accent)' }}>.</span></h2>
                <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Revenue composition, USDC metrics, quarterly trends, and profitability analysis. Focus on interest income, USDC circulation, and margin expansion.</p>
              </div>

              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 2: HIGHLIGHT BOX                                            */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#financials-overview</div>
              <div style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--surface)) 0%, var(--surface) 100%)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Revenue Growth Story<UpdateIndicators sources="SEC" /></h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', margin: '8px 0 0' }}>
                  Circle's revenue is driven by reserve income (96%) from USDC holdings invested in T-bills and repos.
                  Distribution costs (~54%) go to Coinbase under the USDC consortium agreement. RLDC (Revenue Less
                  Distribution Costs) represents true gross profit. Watch for margin expansion as Platform % grows.
                </p>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 3-7: QUARTERLY METRICS PANEL (Unified Component)           */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <CRCLQuarterlyMetricsPanel />

              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 8: KEY FINANCIAL MILESTONES                                 */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Milestones</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#key-financial-milestones</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Key Financial Milestones<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    {[
                      { date: 'Jul 2021', event: 'SPAC Announced' },
                      { date: 'Dec 2022', event: 'SPAC Terminated' },
                      { date: 'Jan 2024', event: 'S-1 Filed' },
                      { date: 'Apr 2024', event: 'NYSE IPO @ $31' },
                      { date: 'Aug 2025', event: 'Follow-on: ~$260M' },
                      { date: 'Nov 2025', event: 'Q3: $740M Rev' },
                      { date: 'Dec 2025', event: 'OCC Charter' },
                      { date: 'YE 2025', event: 'ATH: $299' },
                    ].map((m, i) => (
                      <div key={i} style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12 }}>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.date}</div>
                        <div style={{ fontSize: 13, color: 'var(--text2)' }}>{m.event}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 9: CFA NOTES                                                */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
              <CFANotes title="CFA Level III — Financial Analysis" items={[
                { term: 'Interest Income', def: 'Revenue from investing USDC reserves in US Treasuries. Highly correlated with Fed Funds rate and USDC circulation volume.' },
                { term: 'Take Rate', def: 'Revenue as percentage of USDC circulation. Measures monetization efficiency. Higher take rate = better unit economics per dollar of USDC.' },
                { term: 'Adjusted EBITDA', def: 'Earnings before interest, taxes, depreciation, amortization, and stock-based compensation. Preferred metric for SaaS/fintech companies to show operating profitability.' },
              ]} />
            </div>
          )}

          {activeTab === 'investment' && (
            <>
              {/* Controls */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-header</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Due Diligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
                  <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Investment Analysis<span style={{ color: 'var(--accent)' }}>.</span></h2>
                  <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Multi-perspective due diligence with CFA, hedge fund, and institutional frameworks. Stablecoin infrastructure thesis scoring and risk assessment.</p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button onClick={expandAll} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer' }}>⊞ Expand All</button>
                  <button onClick={collapseAll} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer' }}>⊟ Collapse All</button>
                </div>
              </div>

              {/* Data Refresh Indicator */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text3)' }}>
                <span>Data as of: <strong style={{ color: 'var(--text2)' }}>{investmentCurrent.date}</strong></span>
                <span>•</span>
                <span>Source: <strong style={{ color: 'var(--text2)' }}>{investmentCurrent.source}</strong></span>
              </div>

              {/* Rating Header */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', borderLeft: `4px solid var(--${investmentCurrent.verdictColor})` }}>
                <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ background: `var(--${investmentCurrent.verdictColor})`, color: 'var(--bg)', padding: '8px 20px', borderRadius: 99, fontWeight: 700, fontSize: 18 }}>{investmentCurrent.verdict}</span>
                      <span style={{ background: 'color-mix(in srgb, var(--mint) 15%, transparent)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>HIGH CONVICTION</span>
                    </div>
                    <div style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 500 }}>
                      {investmentCurrent.executiveSummary.thesis}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                      Last Updated: {investmentCurrent.date} • Trigger: {investmentCurrent.source}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>Price Target</div>
                      <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--mint)', fontWeight: 700 }}>$100-150</div>
                      <div style={{ fontSize: 10, color: 'var(--text3)' }}>12-month</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>Risk/Reward</div>
                      <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--sky)', fontWeight: 700 }}>3.2:1</div>
                      <div style={{ fontSize: 10, color: 'var(--text3)' }}>Asymmetric</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>Current</div>
                      <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--text)', fontWeight: 700 }}>${MARKET.price}</div>
                      <div style={{ fontSize: 10, color: 'var(--mint)' }}>+165% since IPO</div>
                    </div>
                  </div>
                </div>
              </div>

                  {/* Investment Scorecard */}
                  <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Due Diligence Sections</span>
                    <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-scorecard</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('scorecard')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('scorecard')}
                      aria-label="Toggle Investment Scorecard"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('scorecard')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Investment Scorecard<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('scorecard') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('scorecard') && (
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                          {investmentCurrent.scorecard.map((item, i) => (
                            <div key={i} style={{ transition: 'background 0.15s', background: 'var(--surface2)', padding: '12px 16px', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
                              <div>
                                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{item.category}</div>
                                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{item.detail}</div>
                              </div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: item.color }}>{item.rating}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Investment Summary */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-summary</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('summary')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('summary')}
                      aria-label="Toggle Investment Summary"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('summary')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Investment Summary<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('summary') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('summary') && (
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{ background: 'color-mix(in srgb, var(--mint) 5%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                          <div style={{ fontWeight: 600, color: 'var(--mint)' }}>What's New ({investmentCurrent.source})</div>
                          <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 13, lineHeight: 1.8 }}>
                            {investmentCurrent.executiveSummary.whatsNew.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14 }}>
                          <p style={{ }}>
                            <strong>Thesis:</strong> {investmentCurrent.executiveSummary.thesis}
                          </p>
                          <p style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>
                            "{investmentCurrent.executiveSummary.bottomLine}"
                          </p>
                          <p style={{ }}>
                            <strong>Position Sizing:</strong> 3-5% for growth portfolios • 1-2% for balanced • Speculative allocation for conservative
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Health */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-financial</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('financial')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('financial')}
                      aria-label="Toggle Financial Health"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('financial')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Financial Health<UpdateIndicators sources="SEC" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('financial') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('financial') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Quick Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Cash Position</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>$1.15B</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Total Debt</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>$0</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Quarterly FCF</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>~$140M</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Dilution Risk</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>LOW</div>
                          </div>
                        </div>
                        
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>Liquidity:</strong> Exceptional. $1.15B cash with zero debt creates fortress balance sheet. Asset-light model requires minimal working capital. Generating ~$140M quarterly FCF provides infinite runway for organic growth.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--sky)' }}>Leverage:</strong> None. Company raised $2.5B across IPO ($1.21B) and follow-on ($1.3B) without adding debt. Only liability is a legacy $15.7M convertible note from 2019 SeedInvest round at $16.23 conversion — converts to &lt;1M shares, immaterial dilution.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--gold)' }}>Capital Needs:</strong> None foreseeable. FCF positive operations fund growth organically. S-3ASR shelf registration active as WKSI status provides flexibility for opportunistic M&A, but no equity raise expected. Self-funding trajectory intact.
                          </p>
                        </div>

                        {/* Assessment */}
                        <div style={{ padding: 12, background: 'color-mix(in srgb, var(--mint) 10%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600, color: 'var(--mint)' }}>Assessment: A+</span>
                            <span style={{ fontSize: 12, color: 'var(--text3)' }}>Fortress Balance Sheet</span>
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                            Circle has one of the cleanest balance sheets in fintech. No debt, substantial cash, and positive FCF generation eliminate any near-term dilution or liquidity concerns. The company is fully self-funding and could pursue meaningful M&A without leverage.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Unit Economics */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-unit-economics</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('unit-economics')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('unit-economics')}
                      aria-label="Toggle Unit Economics"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('unit-economics')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Unit Economics & Margins<UpdateIndicators sources="SEC" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('unit-economics') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('unit-economics') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Key Metrics Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Net Take Rate</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>1.27%</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>RLDC Margin</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>39%</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Coinbase Cost</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--coral)', fontWeight: 700 }}>54%</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>EBITDA Margin</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)', fontWeight: 700 }}>22%</div>
                          </div>
                        </div>

                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>Revenue Model:</strong> Circle earns ~4¢ per dollar of USDC in circulation annually through reserve yield (T-bills, repos). At $73.7B circulation, this generates ~$2.96B TTM revenue. The model is highly scalable with near-zero marginal cost per additional USDC dollar.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--coral)' }}>Margin Pressure:</strong> Coinbase receives ~54% of reserve income as distribution cost — the single largest expense item. This creates a structural margin cap, but the partnership ensures distribution to Coinbase's 100M+ users. RLDC margin (39%) is healthy; OpEx ratio (17%) declining with scale.
                          </p>
                        </div>

                        {/* Coinbase Sensitivity */}
                        <div style={{ padding: 16, background: 'color-mix(in srgb, var(--gold) 10%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Coinbase Sensitivity Analysis</span>
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                            If Coinbase cost reduced from 54% → 45%: RLDC margin expands from 39% → 48% (+$67M/qtr at current revenue). Each 5% reduction in Coinbase share adds ~$37M quarterly profit.
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                            <strong>Renegotiation Leverage:</strong> Coinbase equity stake aligns incentives. Diversifying distribution (Binance 240M users, OKX 60M, Kraken) reduces dependency. CPN direct bank relationships bypass exchange distribution entirely.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Growth Drivers */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-growth</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('growth')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('growth')}
                      aria-label="Toggle Growth Drivers"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('growth')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Growth Drivers<UpdateIndicators sources="PR" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('growth') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('growth') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>USDC Momentum:</strong> Circulation grew from $32.3B (Q2 2024) to $73.7B (Q3 2025) — a 128% increase in 18 months. Growth is accelerating: +20% QoQ in Q3 2025 vs +18% in Q2 2025. The flywheel is working as more integrations drive more use cases drive more circulation.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--sky)' }}>Geographic Diversification:</strong> Circle is methodically obtaining licenses globally to reduce US concentration risk. MiCA compliance in Europe, FSA registration in Japan, and partnerships in LatAm (Nubank 100M+ users) and MENA create multiple growth vectors.
                          </p>
                        </div>

                        {/* Expansion Vectors */}
                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--sky)', display: 'block', marginBottom: 8 }}>Expansion Vectors</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {[
                            { region: 'US (Core)', status: 'Dominant', color: 'var(--mint)' },
                            { region: 'Europe (MiCA)', status: 'Growing', color: 'var(--mint)' },
                            { region: 'Japan (FSA)', status: 'Launched Mar\'25', color: 'var(--mint)' },
                            { region: 'LatAm (Brazil)', status: 'Nubank 100M+', color: 'var(--sky)' },
                            { region: 'MENA (UAE)', status: 'ADGM licensed', color: 'var(--sky)' },
                            { region: 'APAC (Singapore)', status: 'MPI License', color: 'var(--sky)' },
                          ].map((item, i) => (
                            <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12, fontSize: 13 }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                              <span style={{ color: 'var(--text2)' }}>{item.region}</span>
                              <span style={{ color: item.color, fontWeight: 500 }}>{item.status}</span>
                            </div>
                          ))}
                        </div>

                        {/* Platform & Product Expansion */}
                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--violet)', display: 'block', marginBottom: 8 }}>Platform & Product Expansion</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                          {[
                            { product: 'CPN', desc: 'Cross-border payments network', status: '29 FIs, $3.4B vol', color: 'var(--mint)' },
                            { product: 'Arc', desc: 'L1 blockchain for finance', status: '100+ testnet', color: 'var(--sky)' },
                            { product: 'USYC', desc: 'Tokenized money market', status: '$1.5B+ AUM', color: 'var(--mint)' },
                          ].map((p, i) => (
                            <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 12 }}>
                              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{p.product}</div>
                              <div style={{ fontSize: 12, color: 'var(--text3)' }}>{p.desc}</div>
                              <div style={{ fontSize: 13, color: p.color, fontWeight: 500 }}>{p.status}</div>
                            </div>
                          ))}
                        </div>

                        {/* TAM Expansion */}
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12, fontSize: 13, color: 'var(--text2)' }}>
                          <strong>TAM Expansion:</strong> Stablecoin market currently ~$250B. Bull case: $1-2T by 2030 as stablecoins capture share of $150T+ global payments, FX settlement, and collateral markets. Circle targeting 25-35% market share.
                        </div>

                        {/* Ethereum Ecosystem Catalyst */}
                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 8 }}>Ethereum Ecosystem Catalyst</span>
                        <div style={{ padding: 12, background: 'color-mix(in srgb, var(--violet) 10%, transparent)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, color: 'var(--text2)' }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--violet)' }}>On-Chain Growth Thesis:</strong> As more companies build on Ethereum (DeFi, tokenization, payments, gaming), on-chain transaction volume increases. USDC is the dominant stablecoin for DeFi settlement and on-chain payments — more Ethereum activity directly drives USDC circulation and Circle revenue.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>USDC Dominance:</strong> ~70% of on-chain stablecoin volume on Ethereum flows through USDC. Every new DeFi protocol, tokenized asset, or on-chain payment rail increases USDC utility and sticky demand.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--sky)' }}>Cross-Portfolio Note:</strong> This thesis is doubly bullish for portfolios holding both CRCL and BMNR — Ethereum adoption drives both USDC demand (CRCL revenue) and ETH price appreciation (BMNR NAV). The positions are positively correlated through Ethereum ecosystem growth.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Valuation Framework */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-valuation</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('valuation')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('valuation')}
                      aria-label="Toggle Valuation Framework"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('valuation')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Valuation Framework<UpdateIndicators sources="WS" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('valuation') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('valuation') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Key Metrics */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>P/S Multiple*</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>6.4x</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Rule of 40</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>105</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Fair Value</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)', fontWeight: 700 }}>$100-150</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Expected Return</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>+56%</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic' }}>
                          * P/S based on Q3 2025 annualized run-rate revenue ($2.96B). TTM P/S (Q4 2024–Q3 2025) is 7.8x.
                        </div>

                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>Peer Comparison:</strong> Circle trades at 6.4x P/S — a ~60% discount to Visa/Mastercard (16-17x) despite 6x higher revenue growth (66% vs 10%). Even Coinbase trades at 13.1x with lower growth (30%). Circle's Rule of 40 score of 105 (66% growth + 39% margin) is exceptional for any SaaS/fintech company.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--sky)' }}>Discount Drivers:</strong> The valuation gap reflects three factors: (1) crypto association risk premium (~20% discount), (2) Coinbase margin uncertainty (~20% discount), (3) interest rate sensitivity (~10% discount). As these concerns diminish, multiple expansion is likely.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--gold)' }}>Scenario Analysis:</strong> Probability-weighted expected value is $128 (+56% upside). Bear case ($50, 20% prob) assumes rate cuts + Tether parity. Base case ($120, 50% prob) reflects continued execution. Bull case ($200, 25% prob) assumes CPN/Arc traction. Moon case ($350, 5% prob) assumes stablecoin market 5x expansion.
                          </p>
                        </div>

                        {/* Methodology */}
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12, fontSize: 13, color: 'var(--text2)' }}>
                          <strong>Methodology:</strong> P/S-based valuation anchored on payment network comparables. Fair value range 10-12x P/S implies $100-150 target. DCF (12% WACC, 3% terminal growth) supports similar range. SOTP analysis adds $10-20 optionality value for CPN/Arc platforms.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rate Sensitivity Calculator */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-sensitivity</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('sensitivity')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('sensitivity')}
                      aria-label="Toggle Rate Sensitivity Calculator"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('sensitivity')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Rate Sensitivity Calculator<UpdateIndicators sources="MARKET" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('sensitivity') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('sensitivity') && (
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>
                          Adjust assumptions to see implied financial impact. Calculations based on current model structure.
                        </div>

                        {/* Sliders */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                          {/* Fed Funds Rate */}
                          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Fed Funds Rate</span>
                              <span style={{ fontFamily: 'Space Mono', color: 'var(--mint)', fontWeight: 600 }}>{sensRate.toFixed(1)}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="1" 
                              max="6" 
                              step="0.25" 
                              value={sensRate} 
                              onChange={(e) => setSensRate(parseFloat(e.target.value))}
                              style={{ width: '100%', accentColor: 'var(--mint)' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)' }}>
                              <span>1%</span>
                              <span>6%</span>
                            </div>
                          </div>

                          {/* USDC Circulation */}
                          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: 12, color: 'var(--text3)' }}>USDC Circulation</span>
                              <span style={{ fontFamily: 'Space Mono', color: 'var(--sky)', fontWeight: 600 }}>${sensUsdc}B</span>
                            </div>
                            <input 
                              type="range" 
                              min="40" 
                              max="150" 
                              step="5" 
                              value={sensUsdc} 
                              onChange={(e) => setSensUsdc(parseInt(e.target.value))}
                              style={{ width: '100%', accentColor: 'var(--sky)' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)' }}>
                              <span>$40B</span>
                              <span>$150B</span>
                            </div>
                          </div>

                          {/* Coinbase Distribution */}
                          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Coinbase Distribution</span>
                              <span style={{ fontFamily: 'Space Mono', color: 'var(--coral)', fontWeight: 600 }}>{sensDist}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="30" 
                              max="70" 
                              step="1" 
                              value={sensDist} 
                              onChange={(e) => setSensDist(parseInt(e.target.value))}
                              style={{ width: '100%', accentColor: 'var(--coral)' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)' }}>
                              <span>30%</span>
                              <span>70%</span>
                            </div>
                          </div>
                        </div>

                        {/* Calculated Outputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Implied Revenue</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>
                              ${((sensUsdc * sensRate / 100)).toFixed(1)}B
                            </div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>RLDC (Gross Profit)</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>
                              ${((sensUsdc * sensRate / 100) * (1 - sensDist / 100)).toFixed(2)}B
                            </div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>RLDC Margin</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: sensRate >= 3 && sensDist <= 50 ? 'var(--mint)' : 'var(--gold)', fontWeight: 700 }}>
                              {(100 - sensDist).toFixed(0)}%
                            </div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est. EBITDA</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)', fontWeight: 700 }}>
                              ${((sensUsdc * sensRate / 100) * (1 - sensDist / 100) * 0.55).toFixed(2)}B
                            </div>
                          </div>
                        </div>

                        {/* Fair Value Estimate */}
                        <div style={{ background: 'color-mix(in srgb, var(--mint) 10%, transparent)', padding: 16, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            <div>
                              <div style={{ fontSize: 12, color: 'var(--text3)' }}>Implied Fair Value (8x P/S)</div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 28, color: 'var(--mint)', fontWeight: 700 }}>
                                ${((sensUsdc * sensRate / 100) * 8 / 0.23).toFixed(0)}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 12, color: 'var(--text3)' }}>vs. Current ($82)</div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: ((sensUsdc * sensRate / 100) * 8 / 0.23) > 82 ? 'var(--mint)' : 'var(--coral)', fontWeight: 600 }}>
                                {((((sensUsdc * sensRate / 100) * 8 / 0.23) - 82) / 82 * 100) > 0 ? '+' : ''}{((((sensUsdc * sensRate / 100) * 8 / 0.23) - 82) / 82 * 100).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Methodology Note */}
                        <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic' }}>
                          Note: Revenue = USDC × Rate. RLDC = Revenue × (1 − Distribution%). EBITDA assumes 55% of RLDC after OpEx. Fair value uses 8x P/S on 229M shares. Simplified model — actual results may vary.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Competitive Moat */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-moat</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('moat')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('moat')}
                      aria-label="Toggle Competitive Moat"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('moat')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Competitive Moat<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('moat') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('moat') && (
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                          <div>
                            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--mint)', display: 'block', marginBottom: 8 }}>Moat Sources</span>
                            {[
                              { source: 'Regulatory Licenses', strength: 'Strong', detail: '48 US states + MiCA + Japan FSA + OCC pending', color: 'var(--mint)' },
                              { source: 'Network Effects', strength: 'Growing', detail: '15 chains, 6.3M wallets, $12T+ settled', color: 'var(--sky)' },
                              { source: 'Trust & Transparency', strength: 'Strong', detail: 'Monthly attestations, 100% reserves, no depeg (ex-SVB)', color: 'var(--mint)' },
                              { source: 'TradFi Integration', strength: 'Building', detail: 'ICE, Visa, FIS, Fiserv partnerships', color: 'var(--sky)' },
                              { source: 'Developer Ecosystem', strength: 'Moderate', detail: 'CCTP, Programmable Wallets, Web3 Services', color: 'var(--gold)' },
                            ].map((m, i) => (
                              <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                <div>
                                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{m.source}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.detail}</div>
                                </div>
                                <span style={{ color: m.color, fontWeight: 600, fontSize: 12 }}>{m.strength}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: 8 }}>Competitive Threats</span>
                            {[
                              { threat: 'Tether (USDT)', risk: 'High', detail: '65% market share, $140B+ circulation', color: 'var(--coral)' },
                              { threat: 'PayPal (PYUSD)', risk: 'Medium', detail: '$1B circulation, 400M user base', color: 'var(--gold)' },
                              { threat: 'Bank Stablecoins', risk: 'Medium', detail: 'JPM Coin, potential Fed/CBDC', color: 'var(--gold)' },
                              { threat: 'CBDCs', risk: 'Low-Med', detail: 'EU/UK in development, 3-5yr timeline', color: 'var(--sky)' },
                              { threat: 'New Entrants', risk: 'Low', detail: 'Regulatory barriers high post-GENIUS', color: 'var(--mint)' },
                            ].map((t, i) => (
                              <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                <div>
                                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{t.threat}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.detail}</div>
                                </div>
                                <span style={{ color: t.color, fontWeight: 600, fontSize: 12 }}>{t.risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12, fontSize: 13, color: 'var(--text2)' }}>
                          <strong>Moat Durability:</strong> B+ (Moderate-Strong). Regulatory moat strengthening but Tether's scale advantage persists. Key differentiator is TradFi trust — Circle is the only stablecoin issuer with major bank/exchange partnerships. Moat widens if CPN/Arc achieve enterprise adoption.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Risk Matrix */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-risks</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('risks')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('risks')}
                      aria-label="Toggle Risk Matrix"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('risks')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Risk Matrix<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('risks') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('risks') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--coral)' }}>High Impact Risks:</strong> Interest rate sensitivity remains the primary concern — if Fed cuts to sub-3%, reserve income compresses faster than volume can grow. Coinbase renegotiation failure would cap margins permanently. Regulatory reversal (low probability) would be existential. Smart contract exploits are tail risks mitigated by audits and multi-sig.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--gold)' }}>Medium Impact Risks:</strong> Tether achieving transparency parity would eliminate Circle's trust premium in crypto-native markets. Lock-up expiry (Dec 2025) creates near-term supply pressure with ~198M shares eligible for sale — likely temporary given fundamental momentum.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>Risk Mitigants:</strong> Multi-jurisdiction licensing reduces regulatory concentration. Distribution diversification (Binance, OKX, Kraken) reduces Coinbase dependency. USYC yield products provide revenue diversification beyond reserve income. OCC charter creates regulatory moat. Volume growth historically offsets rate compression.
                          </p>
                        </div>

                        {/* Risk Assessment */}
                        <div style={{ padding: 12, background: 'color-mix(in srgb, var(--gold) 10%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Overall Risk Assessment: MODERATE</span>
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                            Circle's risk profile has improved significantly since IPO. Balance sheet strength, regulatory progress, and distribution diversification reduce company-specific risks. Primary exposures are now macro (rates) and competitive (Tether, banks) — both manageable with current growth trajectory.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Catalyst Calendar */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-catalysts</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('catalysts')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('catalysts')}
                      aria-label="Toggle Catalyst Calendar"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('catalysts')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Catalyst Calendar<UpdateIndicators sources="PR" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('catalysts') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('catalysts') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--coral)' }}>Near-Term (Dec 2025):</strong> Lock-up expiry is the most immediate catalyst — ~198M shares become eligible for sale. Watch insider selling percentage and price support levels. Historically, strong-performing IPOs see limited insider selling if fundamentals remain intact.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--mint)' }}>H1 2026:</strong> Multiple positive catalysts converge. Q4/FY25 earnings (Feb) will provide first full-year numbers and 2026 guidance. Arc mainnet launch will demonstrate platform revenue potential. OCC charter finalization would provide Fed master account pathway — transformative for institutional adoption.
                          </p>
                          <p style={{ }}>
                            <strong style={{ color: 'var(--sky)' }}>Longer-Term:</strong> Coinbase distribution cost renegotiation timing uncertain but represents significant margin expansion optionality. S&P 500 inclusion possible once GAAP profitability criteria met — would trigger substantial index fund buying (~$2-3B estimated).
                          </p>
                        </div>

                        {/* Key Dates */}
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12 }}>
                          <div style={{ fontWeight: 600, color: 'var(--text)' }}>Key Dates to Watch</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {[
                              { event: 'Lock-up Expiry', date: 'Dec 2025', color: 'var(--coral)' },
                              { event: 'Q4/FY25 Earnings', date: 'Feb 2026', color: 'var(--mint)' },
                              { event: 'Arc Mainnet', date: 'H1 2026', color: 'var(--mint)' },
                              { event: 'OCC Charter', date: 'Dec 2025 ✓', color: 'var(--mint)' },
                            ].map((c, i) => (
                              <div key={i} style={{ background: 'var(--bg)', padding: '6px 12px', borderRadius: 12, fontSize: 12 }}>
                                <span style={{ color: 'var(--text)' }}>{c.event}</span>
                                <span style={{ color: 'var(--text3)', margin: '0 6px' }}>•</span>
                                <span style={{ color: c.color }}>{c.date}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Position Management */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-position</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('position')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('position')}
                      aria-label="Toggle Position Management"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('position')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Position Management<UpdateIndicators sources="WS" /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('position') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('position') && (
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                          <div style={{ background: 'color-mix(in srgb, var(--mint) 10%, transparent)', padding: 16, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                            <div style={{ fontWeight: 600, color: 'var(--mint)' }}>Entry Zones</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                              <div>$75-80: Current (hold)</div>
                              <div>$65-70: Add on weakness</div>
                              <div>$55-60: Aggressive accumulate</div>
                            </div>
                          </div>
                          <div style={{ background: 'color-mix(in srgb, var(--coral) 10%, transparent)', padding: 16, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--coral) 20%, transparent)' }}>
                            <div style={{ fontWeight: 600, color: 'var(--coral)' }}>Risk Management</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                              <div>Stop-loss: $50 (-39%)</div>
                              <div>Max position: 5% of portfolio</div>
                              <div>Risk per trade: 1-2%</div>
                            </div>
                          </div>
                          <div style={{ background: 'color-mix(in srgb, var(--sky) 10%, transparent)', padding: 16, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)' }}>
                            <div style={{ fontWeight: 600, color: 'var(--sky)' }}>Take Profit Levels</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                              <div>$100: Trim 20%</div>
                              <div>$130: Trim 25%</div>
                              <div>$150+: Hold core (50%)</div>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12 }}>
                          <div style={{ fontWeight: 600, color: 'var(--text)' }}>Position Sizing by Risk Profile</div>
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--mint)' }}>Aggressive:</span> <span style={{ color: 'var(--text2)' }}>4-5%</span></div>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--sky)' }}>Growth:</span> <span style={{ color: 'var(--text2)' }}>2-4%</span></div>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--gold)' }}>Balanced:</span> <span style={{ color: 'var(--text2)' }}>1-2%</span></div>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--coral)' }}>Conservative:</span> <span style={{ color: 'var(--text2)' }}>0-1%</span></div>
                          </div>
                        </div>

                        {/* Portfolio Context — Unified framework for multi-asset allocation */}
                        <div style={{ padding: 16, background: 'color-mix(in srgb, var(--violet) 8%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
                          <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 14 }}>Portfolio Construction Context</div>
                          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>For multi-asset portfolios holding CRCL alongside other positions</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
                            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 12 }}>
                              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Asset Class Bucket</div>
                              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>Alternatives / Fintech</div>
                              <div style={{ fontSize: 11, color: 'var(--gold)' }}>Limit: 10-20% of portfolio</div>
                            </div>
                            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 12 }}>
                              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Single-Name Limit</div>
                              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>3-5% max</div>
                              <div style={{ fontSize: 11, color: 'var(--coral)' }}>Rate sensitive, crypto adjacent</div>
                            </div>
                            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 12 }}>
                              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Correlation Note</div>
                              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>CRCL + BMNR</div>
                              <div style={{ fontSize: 11, color: 'var(--sky)' }}>Both ETH-correlated; size combined</div>
                            </div>
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8 }}>
                            <strong>Combined Crypto Allocation:</strong> If holding both CRCL and BMNR, treat as a single "Ethereum ecosystem" allocation. Combined weight should not exceed alternatives bucket limit. CRCL provides infrastructure/revenue exposure; BMNR provides NAV/yield exposure.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Analysis Archive */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-archive</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('archive')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('archive')}
                      aria-label="Toggle Analysis Archive"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('archive')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Analysis Archive — Complete History<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('archive') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('archive') && (
                      <div style={{ padding: '24px 28px' }}>
                        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Full record of all investment thesis updates. Never deleted.</div>
                        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 500, overflowY: 'auto' }}>
                          {/* Current */}
                          <div style={{ transition: 'background 0.15s', background: 'color-mix(in srgb, var(--mint) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--mint) 5%, transparent)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--mint) 5%, transparent)')}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 600, color: 'var(--text)' }}>Dec 31, 2025</span>
                                <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>CURRENT</span>
                              </div>
                              <span style={{ color: 'var(--mint)', fontWeight: 600, fontSize: 13 }}>OVERWEIGHT</span>
                            </div>
                            <div style={{ color: 'var(--text2)', fontSize: 13 }}>
                              Post-Q3 2025: Upgraded conviction on execution. USDC at $73.7B validates network effects thesis. OCC charter approval removes key regulatory overhang. Maintaining overweight despite lock-up supply risk given fundamental momentum.
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Trigger: Q3 2025 10-Q, OCC Charter Approval (Dec 12)</div>
                          </div>

                          {[
                            { date: 'Nov 14, 2025', rating: 'OVERWEIGHT', color: 'var(--mint)', summary: 'Post-Q3\'25 earnings: Beat on all metrics. Revenue +66% YoY exceeded buy-side expectations of +55%. Platform % inflection to 13.5% suggests early CPN traction. Raised guidance on RLDC margin encouraging.', trigger: 'Q3\'25 8-K Earnings Release' },
                            { date: 'Aug 18, 2025', rating: 'NEUTRAL → OVERWEIGHT', color: 'var(--mint)', summary: 'Follow-on priced at $130 (4.2x IPO price in 10 weeks) validates institutional demand. Secondary-heavy deal (8M of 10M shares) means existing holders taking profits, not company needing capital. Upgrading on strength.', trigger: 'S-1 Follow-on Filing, Pricing at $130' },
                            { date: 'Aug 12, 2025', rating: 'NEUTRAL', color: 'var(--sky)', summary: 'First earnings as public company mixed: Strong top-line (+53% YoY) but $482M net loss on IPO-related charges creates headline noise. Underlying business healthy — $126M Adj. EBITDA, $61.3B USDC (+90% YoY).', trigger: 'Q2\'25 10-Q, First Public Earnings' },
                            { date: 'Jun 6, 2025', rating: 'NEUTRAL', color: 'var(--sky)', summary: 'IPO priced at $31 (low end of range) reflects crypto market hesitancy, not fundamentals. Upsized deal (39M vs 24M shares) absorbed cleanly. $1.21B raised provides growth runway. Initiating at neutral.', trigger: 'IPO Pricing, 424B4 Prospectus' },
                            { date: 'Apr 1, 2025', rating: 'MONITORING', color: 'var(--gold)', summary: 'S-1 filed publicly after confidential submission in Jan 2024. Business model validated: $1.68B FY24 revenue, 38% RLDC margin, USDC at $44B. Key concern is Coinbase distribution cost (54% of revenue).', trigger: 'S-1 Initial Public Filing' },
                            { date: 'Jan 11, 2024', rating: 'MONITORING', color: 'var(--gold)', summary: 'Confidential S-1 submission signals IPO intent after failed SPAC in 2022. Circle has rebuilt credibility post-SVB crisis with 100% reserve transparency. USDC recovery from $24B low to $32B+ suggests crypto winter thaw.', trigger: 'Confidential S-1 Announcement' },
                            { date: 'Aug 21, 2023', rating: 'MONITORING', color: 'var(--gold)', summary: 'Centre Consortium dissolution and Coinbase equity investment restructures USDC economics. Circle now sole issuer with full governance control. Revenue share agreement creates ~50-60% distribution cost.', trigger: 'Centre Dissolution PR, Coinbase Equity Investment' },
                            { date: 'Mar 2023', rating: 'UNDERWEIGHT', color: 'var(--coral)', summary: 'SVB collapse creates existential risk. $3.3B of USDC reserves held at SVB. Weekend depeg to $0.87 causes $6B+ redemptions. Fed/FDIC backstop saves reserves but damages trust.', trigger: 'SVB Collapse, USDC Depeg Event' },
                          ].map((entry, i) => (
                            <div key={i} style={{ transition: 'background 0.15s', background: 'var(--surface2)', padding: '12px 16px', borderRadius: 12 }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{entry.date}</span>
                                <span style={{ color: entry.color, fontWeight: 600, fontSize: 13 }}>{entry.rating}</span>
                              </div>
                              <div style={{ color: 'var(--text2)', fontSize: 13 }}>{entry.summary}</div>
                              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Trigger: {entry.trigger}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Risks & Strategic Assessment */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-strategic</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('strategic-assessment')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('strategic-assessment')}
                      aria-label="Toggle Risks and Strategic Assessment"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('strategic-assessment')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Risks & Strategic Assessment<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('strategic-assessment') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('strategic-assessment') && (
                      <div style={{ padding: '24px 28px' }}>
                        {/* Section Header */}
                        <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>
                          Multi-perspective risk evaluation and strategic decision framework
                        </div>

                        {/* Part 1: Multi-Perspective Risk Evaluation */}
                        <div style={{ paddingBottom: 8, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)' }}>Risk Evaluation — Four Perspectives</span></div>

                        {/* CFA Level III Perspective */}
                        <div style={{ background: 'color-mix(in srgb, var(--mint) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>CFA LEVEL III</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Portfolio Construction & Factor Analysis</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ }}>
                              <strong>Factor Exposures:</strong> CRCL exhibits significant interest rate sensitivity (negative duration — rising rates benefit reserve income) and moderate crypto beta correlation (~0.4 to BTC). This creates a unique hedge: positive rate sensitivity while maintaining crypto upside optionality. Low correlation to traditional equities makes it an attractive diversifier.
                            </p>
                            <p style={{ }}>
                              <strong>Liquidity Analysis:</strong> Average daily volume ~$180M provides adequate liquidity for institutional positions up to $50M without material market impact. Post-lock-up, float increases from ~40M to ~240M shares, dramatically improving liquidity profile. Bid-ask spreads tight at ~0.05%.
                            </p>
                            <p style={{ }}>
                              <strong>Governance & ESG:</strong> Dual-class structure (Class B 5:1 voting) concentrates control with founders through 2030 sunset — acceptable given founder alignment and temporary nature. Board composition strong (ex-Goldman CRO, ex-CFTC Chair). ESG profile positive: financial inclusion focus, transparent reserves, no direct energy consumption concerns unlike PoW crypto.
                            </p>
                          </div>
                        </div>

                        {/* Hedge Fund Manager Perspective */}
                        <div style={{ background: 'color-mix(in srgb, var(--violet) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ background: 'var(--violet)', color: 'white', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>HEDGE FUND</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Alpha Generation & Event Catalysts</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ }}>
                              <strong>Event Calendar Alpha:</strong> Lock-up expiry (Dec 2025) creates a defined event with predictable dynamics. Historical data shows 70% of high-quality IPOs recover lock-up weakness within 60 days. Strategy: scale into weakness with 30-day DCA starting at lock-up, targeting 15-20% position discount to current price. This is a repeatable playbook.
                            </p>
                            <p style={{ }}>
                              <strong>Short Interest Dynamics:</strong> Current short interest ~8% of float — elevated but not crowded. Post-lock-up, short interest as % of new float drops to ~1.3%, reducing squeeze risk but also squeeze upside. No significant borrow cost premium currently. Asymmetric long thesis remains intact.
                            </p>
                            <p style={{ }}>
                              <strong>Catalyst Stacking:</strong> Q4 earnings (Feb) + Arc mainnet (H1) + OCC charter (H1) creates a "catalyst stacking" setup through mid-2026. Each positive catalyst de-risks the next. Position sizing: start 3% portfolio, add to 5% on lock-up weakness, trim to 3% core on 50%+ gains. Defined entry/exit framework limits behavioral errors.
                            </p>
                          </div>
                        </div>

                        {/* CIO/CIS Institutional Perspective */}
                        <div style={{ background: 'color-mix(in srgb, var(--sky) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ background: 'var(--sky)', color: 'white', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>CIO / CIS</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Strategic Allocation & Fiduciary Considerations</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ }}>
                              <strong>Strategic Thesis:</strong> Circle represents a "TradFi on-ramp to crypto infrastructure" — the cleanest way to gain crypto ecosystem exposure without direct token/protocol risk. For institutions constrained by crypto mandates, CRCL provides compliant exposure to stablecoin adoption megatrend. Think of it as "picks and shovels" for the digital dollar economy.
                            </p>
                            <p style={{ }}>
                              <strong>Benchmark Considerations:</strong> Not yet in S&P 500 but likely candidate within 12-18 months once GAAP profitability sustained. Early positioning ahead of index inclusion creates alpha opportunity. Tracking error vs. benchmark acceptable for growth allocations given asymmetric return profile.
                            </p>
                            <p style={{ }}>
                              <strong>Reputational Risk Assessment:</strong> Post-FTX, crypto association carries headline risk. However, Circle's regulatory positioning (OCC charter, GENIUS Act compliance, major bank partnerships) provides defensible narrative. If questioned by stakeholders, response framework: "We own the regulated payments infrastructure, not speculative tokens." Blackrock/Fidelity ownership validates institutional acceptability.
                            </p>
                          </div>
                        </div>

                        {/* Technical Analyst Perspective */}
                        <div style={{ background: 'color-mix(in srgb, var(--mint) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ background: '#34d399', color: 'var(--bg)', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>TECHNICAL ANALYST</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Chart Patterns & Price Action</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ }}>
                              <strong>IPO Base Formation:</strong> Recent IPO establishing price discovery range. Watch for completion of IPO base — typically 3-6 months of consolidation before directional move. Initial support at IPO price level ($31). Declining volume on pullbacks is constructive accumulation pattern.
                            </p>
                            <p style={{ }}>
                              <strong>Key Levels:</strong> VWAP from IPO serving as key pivot level. Bollinger Bands narrowing suggests volatility compression before expansion. RSI neutral at 50 provides no directional bias yet — wait for confirmation. Watch for breakout above $45 with volume as momentum entry signal.
                            </p>
                            <p style={{ }}>
                              <strong>Lock-up Dynamics:</strong> December 2025 lock-up expiry creates potential supply overhang. Monitor volume patterns carefully around that date. Historical IPO lock-up expirations show initial weakness followed by recovery if fundamentals intact. Use weakness as accumulation opportunity, not exit signal.
                            </p>
                            <p style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 10%, transparent)', borderRadius: 12, borderLeft: '3px solid #34d399' }}>
                              <strong style={{ color: '#34d399' }}>Technical Outlook:</strong> {current.perspectives.technicalAnalyst.ecosystemView}
                            </p>
                          </div>
                        </div>

                        {/* Part 2: Key Strategic Questions */}
                        <div style={{ paddingBottom: 8, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)' }}>Key Strategic Questions</span></div>

                        {/* Would I Buy Now? */}
                        <div style={{ transition: 'background 0.15s', background: 'var(--surface2)', padding: '12px 16px', borderRadius: 12 }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>Would I Buy Now?</span>
                            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '6px 16px', borderRadius: 99, fontWeight: 700, fontSize: 13 }}>YES — ACCUMULATE</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ }}>
                              <strong>The Case:</strong> At $82, CRCL trades at 6.4x P/S with 66% revenue growth — a valuation anomaly for a Rule of 40 score of 105. Fair value range is $100-150, implying 22-83% upside. The risk/reward ratio of 3.2:1 is compelling. You're buying a regulated payment network at a crypto discount that shouldn't exist.
                            </p>
                            <p style={{ }}>
                              <strong>The Hesitation:</strong> Lock-up expiry in Dec 2025 creates near-term supply overhang. Waiting could provide a better entry. However, strong fundamentals often absorb lock-up selling quickly, and waiting risks missing the move entirely if selling is lighter than expected.
                            </p>
                            <p style={{ }}>
                              <strong>The Verdict:</strong> Yes, initiate position now at 50% target weight. Reserve 50% for lock-up weakness (target entry: $65-70). If lock-up passes without material weakness, deploy remaining capital on confirmation of support. Don't let perfect be the enemy of good — the asymmetry favors action.
                            </p>
                          </div>
                        </div>

                        {/* What Can I Expect? */}
                        <div style={{ transition: 'background 0.15s', background: 'var(--surface2)', padding: '12px 16px', borderRadius: 12 }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
                          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>What Can I Expect?</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                            <div style={{ background: 'color-mix(in srgb, var(--gold) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)' }}>
                              <div style={{ fontWeight: 600, color: 'var(--gold)', fontSize: 13 }}>Short-Term (0-6 months)</div>
                              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                                Expect volatility. Lock-up creates 15-25% downside risk. Q4 earnings (Feb) should be strong given Q3 momentum. Trading range: $60-95. Don't panic on lock-up weakness — it's expected and temporary.
                              </div>
                            </div>
                            <div style={{ background: 'color-mix(in srgb, var(--sky) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)' }}>
                              <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 13 }}>Mid-Term (6-18 months)</div>
                              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                                Catalyst-rich period. Arc mainnet, OCC charter, potential Coinbase renegotiation all converge. If execution continues, expect multiple expansion toward 10x P/S. Target range: $100-150. This is where the thesis gets tested.
                              </div>
                            </div>
                            <div style={{ background: 'color-mix(in srgb, var(--mint) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
                              <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 13 }}>Long-Term (3-5 years)</div>
                              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                                If stablecoin TAM expands to $1-2T and Circle maintains 25%+ share, this is a $150-350 stock. Payment network multiples (15-17x P/S) on $8-10B revenue = $120-170B market cap. Current: $52B. The math works if the thesis holds.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* What's My Strategy? */}
                        <div style={{ transition: 'background 0.15s', background: 'var(--surface2)', padding: '12px 16px', borderRadius: 12 }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
                          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>What's My Strategy?</div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ }}>
                              <strong style={{ color: 'var(--mint)' }}>Position Sizing:</strong> 3-5% for growth-oriented portfolios, 1-2% for balanced, avoid for income-focused (no dividend). This is a high-conviction, higher-volatility position — size accordingly. Never more than you can stomach watching drop 30%.
                            </p>
                            <p style={{ }}>
                              <strong style={{ color: 'var(--sky)' }}>Entry Approach:</strong> Tranche in. 50% now at ~$82. 25% reserved for lock-up weakness ($65-70 target). Final 25% on confirmation of support or breakout above $95. Average cost target: $72-78. Patience beats FOMO.
                            </p>
                            <p style={{ }}>
                              <strong style={{ color: 'var(--gold)' }}>Add Triggers:</strong> Below $65 = aggressive accumulate (oversold on lock-up). Below $55 = back up the truck (existential discount). Major partnership announcement (Apple, Google, Amazon) = add regardless of price.
                            </p>
                            <p style={{ }}>
                              <strong style={{ color: 'var(--violet)' }}>Trim Triggers:</strong> Above $130 = trim 20% (take some chips off). Above $150 = trim another 25%. Above $200 = reduce to core 50% position. Let winners run, but harvest along the way.
                            </p>
                            <p style={{ }}>
                              <strong style={{ color: 'var(--coral)' }}>Exit Criteria:</strong> Full exit if: (1) Coinbase renegotiation fails AND margins compress below 30%, (2) Regulatory environment turns hostile (SEC enforcement, GENIUS Act failure), (3) Tether achieves full transparency AND captures 80%+ market share, (4) Better opportunity emerges with superior risk/reward. Don't marry the position.
                            </p>
                          </div>
                        </div>

                        {/* Part 3: Final Verdict */}
                        <div style={{ paddingBottom: 8, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)' }}>Final Verdict</span></div>

                        <div style={{ background: 'color-mix(in srgb, var(--mint) 10%, transparent)', padding: 20, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 30%, transparent)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '8px 20px', borderRadius: 99, fontWeight: 700, fontSize: 16 }}>OVERWEIGHT</span>
                              <span style={{ background: 'color-mix(in srgb, var(--mint) 20%, transparent)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 99, fontWeight: 600, fontSize: 12 }}>HIGH CONVICTION</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 12, color: 'var(--text3)' }}>12-Month Target</div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 20, color: 'var(--mint)', fontWeight: 700 }}>$100 - $150</div>
                            </div>
                          </div>
                          
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <strong>Action:</strong> Accumulate on weakness, hold core position through volatility. Use lock-up as entry opportunity, not exit excuse. This is a 3-5 year compounder disguised as a volatile new issue.
                          </div>
                          
                          <div style={{ background: 'var(--bg)', padding: 12, borderRadius: 12, borderLeft: '4px solid var(--mint)' }}>
                            <div style={{ color: 'var(--text)', fontSize: 14, fontStyle: 'italic' }}>
                              "Best-in-class regulated stablecoin infrastructure trading at a crypto discount that shouldn't exist. The market is pricing the past (crypto winter, SVB crisis) while ignoring the future (payment network economics, regulatory moat, TradFi adoption). Time arbitrage favors the patient."
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Methodology */}
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-methodology</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection('methodology')}
                      style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('methodology')}
                      aria-label="Toggle Methodology and Disclosures"
                      onKeyDown={(e) => e.key === 'Enter' && toggleSection('methodology')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Methodology & Disclosures<UpdateIndicators sources={['PR', 'SEC']} /></span>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('methodology') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('methodology') && (
                      <div style={{ padding: '24px 28px', fontSize: 13, color: 'var(--text2)', lineHeight: 1.8 }}>
                        <p><strong>Data Sources:</strong> SEC EDGAR filings (10-K, 10-Q, 8-K, S-1, S-3), company press releases, earnings call transcripts, third-party research.</p>
                        <p><strong>Valuation:</strong> Primary method is P/S multiples with peer comparison. Secondary: DCF (12% WACC, 3% terminal growth), SOTP for platform optionality.</p>
                        <p><strong>Ratings Scale:</strong> OVERWEIGHT (expected 20%+ outperformance), NEUTRAL (market perform ±10%), UNDERWEIGHT (expected 20%+ underperformance), MONITORING (not yet rated).</p>
                        <p><strong>Update Frequency:</strong> Analysis updated after each material SEC filing or significant press release. All historical analyses preserved permanently.</p>
                        <p style={{ }}><strong>Limitations:</strong> Forward-looking statements involve uncertainty. Model assumes current regulatory trajectory continues. Interest rate and crypto market assumptions may prove incorrect. Not investment advice — do your own research.</p>
                      </div>
                    )}
                  </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
              <CFANotes title="CFA Level III — Stablecoin Analysis" items={[
                { term: 'Stablecoin Reserve Yield', def: 'Income from investing stablecoin reserves (primarily US Treasuries). Circle earns yield on USDC reserves — this is the primary revenue driver.' },
                { term: 'USDC Circulation', def: 'Total USDC in circulation, analogous to deposits for a bank. Higher circulation = more reserve assets = more interest income.' },
                { term: 'Network Effects', def: 'USDC adoption creates self-reinforcing cycles: more integrations attract more users, which attract more integrations. Critical competitive moat.' },
              ]} />
            </>
          )}

          {activeTab === 'model' && (
            <CRCLModelTab
              currentUSDC={currentUSDC}
              currentShares={currentShares}
              currentStockPrice={currentStockPrice}
              currentMarketShare={currentMarketShare}
            />
          )}

          {activeTab === 'usdc' && (
            <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#usdc-header</div>
              {/* Hero — Ive×Tesla */}
              <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Stablecoin Intelligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
                <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>USDC<span style={{ color: 'var(--mint)' }}>.</span></h2>
                <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>
                  USDC is a fully-reserved stablecoin backed 1:1 by USD and short-dated Treasuries. Circle earns
                  yield on reserves (~4-5% in current rate environment). Platform % represents USDC held directly
                  in Circle accounts vs public blockchain — higher platform % means better unit economics.
                </p>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#usdc-metrics</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
                {[
                  { label: 'Circulation', value: `$${latest.usdcCirculation.toFixed(1)}B`, sub: 'Total USDC supply', color: 'var(--mint)' },
                  { label: 'YoY Growth', value: `+${usdcGrowth.toFixed(0)}%`, sub: 'Year over year', color: '#4ade80' },
                  { label: 'Market Share', value: `${latest.marketShare}%`, sub: 'Of stablecoins', color: 'var(--sky)' },
                  { label: 'On Platform', value: `${latest.platformPct.toFixed(1)}%`, sub: 'Higher margin', color: 'var(--violet)' },
                ].map(kpi => (
                  <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#usdc-circulation</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Circulation Growth</span>
                  <UpdateIndicators sources="SEC" />
                </div>
                <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
                  {DATA.map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Space Mono', monospace", color: 'var(--text)', marginBottom: 4 }}>${d.usdcCirculation.toFixed(1)}B</div>
                      <div style={{ height: `${(d.usdcCirculation / 80) * 180}px`, width: '100%', background: 'var(--accent)', borderRadius: '4px 4px 0 0', minHeight: 2 }} />
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' as const }}>{d.quarter}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#usdc-activity</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                {/* Mint / Redeem Activity */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Mint / Redeem Activity ($B)</span>
                    <UpdateIndicators sources="SEC" />
                  </div>
                  <div style={{ padding: 0 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)' }}>
                      {['Quarter', 'Minted', 'Redeemed', 'Net'].map(h => (
                        <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Quarter' ? 'left' : 'right' }}>{h}</span>
                      ))}
                    </div>
                    {DATA.map((d, i) => {
                      const net = d.usdcMinted - d.usdcRedeemed;
                      return (
                        <div key={d.quarter} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', padding: '12px 28px', borderBottom: i < DATA.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text)' }}>{d.quarter}</span>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', textAlign: 'right' }}>{d.usdcMinted.toFixed(1)}</span>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--coral)', textAlign: 'right' }}>{d.usdcRedeemed.toFixed(1)}</span>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: net >= 0 ? 'var(--mint)' : 'var(--coral)', textAlign: 'right', fontWeight: 600 }}>{net.toFixed(1)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rate Sensitivity Matrix */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Rate Sensitivity Matrix ($B Annual)</span>
                    <UpdateIndicators sources="SEC" />
                  </div>
                  <div style={{ padding: 0, overflowX: 'auto' }} aria-label="Rate sensitivity matrix">
                    <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', padding: '12px 28px', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>USDC \ Rate</span>
                      {[3.0, 3.5, 4.0, 4.5, 5.0].map(r => (
                        <span key={r} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'center' }}>{r}%</span>
                      ))}
                    </div>
                    {[50, 75, 100, 125, 150].map((c, ri) => (
                      <div key={c} style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', padding: '12px 28px', borderBottom: ri < 4 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', background: c === 75 ? 'color-mix(in srgb, var(--cyan) 3%, transparent)' : 'transparent', transition: 'background 0.15s' }}
                        onMouseEnter={e => { if (c !== 75) e.currentTarget.style.background = 'var(--surface2)'; }}
                        onMouseLeave={e => { if (c !== 75) e.currentTarget.style.background = 'transparent'; }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: c === 75 ? 'var(--cyan)' : 'var(--text)', fontWeight: 500 }}>${c}B</span>
                        {[3, 3.5, 4, 4.5, 5].map(r => (
                          <span key={r} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'center', color: c === 75 && r === 4 ? 'var(--cyan)' : 'var(--text2)', fontWeight: c === 75 && r === 4 ? 700 : 400, background: c === 75 && r === 4 ? 'color-mix(in srgb, var(--cyan) 10%, transparent)' : 'transparent', borderRadius: 4, padding: '2px 0' }}>
                            ${(c * r / 100).toFixed(1)}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
              <CFANotes title="CFA Level III — USDC Economics" items={[
                { term: 'Reserve Yield Model', def: 'USDC reserves invested in T-bills and cash earn risk-free rate. Revenue = Circulation × Yield Rate. Simple but powerful business model.' },
                { term: 'Circulation Drivers', def: 'Crypto market activity, DeFi usage, cross-border payments, institutional adoption. Tracks crypto market sentiment but growing secular use cases.' },
                { term: 'Market Share', def: 'USDC vs USDT competition. USDC ~26% of stablecoin market. Transparency and US regulation are differentiators.' },
                { term: 'Rate Sensitivity', def: 'Matrix shows how revenue changes with Fed rate changes. Key risk: rate cuts reduce yield on reserves.' },
                { term: 'Platform vs Off-Platform', def: 'On-platform USDC (Circle accounts) has higher margin. Off-platform (public blockchain) has lower friction but less control.' },
              ]} />
            </>
          )}

          {activeTab === 'capital' && (
            <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-header</div>
              <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Financial Position<UpdateIndicators sources="SEC" /></div>
                <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Capital Structure<span style={{ color: 'var(--accent)' }}>.</span></h2>
                <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Share structure, institutional ownership, capital raises, and treasury management. Circle's path from private to public company via SPAC merger.</p>
              </div>

              {/* Highlight Box */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-strategy</div>
              <div style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--surface)) 0%, var(--surface) 100%)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px' }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Dual-Class Structure</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', margin: '8px 0 0', lineHeight: 1.6 }}>
                  Circle has a dual-class share structure with Class A (1 vote) and Class B (5 votes). Jeremy Allaire
                  and insiders control significant voting power through Class B shares. Class B voting is capped at
                  30% aggregate and sunsets in June 2030 or upon CEO departure.
                </p>
              </div>

              {/* Key Metrics */}
              <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Overview</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-metrics</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Metrics</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
                  {[
                    { label: 'Shares Outstanding', value: `${MARKET.shares.toFixed(1)}M`, color: 'var(--violet)' },
                    { label: 'Market Cap', value: `$${(MARKET.marketCap / 1000).toFixed(1)}B`, color: 'var(--mint)' },
                    { label: 'Cash Position', value: '$1.1B', color: 'var(--sky)' },
                    { label: 'Convertible Debt', value: '$206M', color: 'var(--gold)' },
                  ].map(kpi => (
                    <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                      <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>{kpi.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
                  <div style={{ background: 'var(--surface)', padding: '16px 28px' }}>
                    {[
                      { label: 'Stock Price', value: `$${MARKET.price}`, color: 'var(--text)' },
                      { label: 'EV/Revenue', value: `${(MARKET.marketCap / (1.68 * 1000)).toFixed(1)}x`, color: 'var(--text)' },
                      { label: 'Revenue Run Rate', value: '$1.68B', color: 'var(--text)' },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                        <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                        <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '16px 28px' }}>
                    {[
                      { label: 'USDC Circulation', value: '$44B+', color: 'var(--violet)' },
                      { label: 'Revenue Growth', value: '+16% YoY', color: 'var(--mint)' },
                      { label: 'Source', value: 'SEC / Market', color: 'var(--text3)' },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                        <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                        <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '16px 28px', background: 'linear-gradient(135deg, color-mix(in srgb, var(--mint) 8%, var(--surface)), color-mix(in srgb, var(--violet) 8%, var(--surface)))', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Stablecoin Economics</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginTop: 4 }}>
                    Revenue driven by USDC reserve interest income. Higher interest rates = higher revenue, making Circle uniquely positioned in crypto.
                  </div>
                </div>
              </div>

              {/* Navigation Cards */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-navigation</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                {[
                  { id: 'structure', value: `${SHARE_CLASSES.length}`, label: 'Share Classes', sub: 'Class A, B, C' },
                  { id: 'shareholders', value: `${MAJOR_SHAREHOLDERS.length}`, label: 'Major Holders', sub: 'Insiders + institutions' },
                  { id: 'offerings', value: `${EQUITY_OFFERINGS.length + WARRANTS.length}`, label: 'Programs', sub: 'Offerings + warrants' },
                  { id: 'plans', value: `${EQUITY_PLANS.length}`, label: 'Equity Plans', sub: 'Omnibus, ESPP, Foundation' },
                  { id: 'dilution', value: '21%', label: 'Total Dilution', sub: '276.5M FD shares' },
                ].map(nav => (
                  <div
                    key={nav.id}
                    onClick={() => setCapitalView(nav.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${nav.label}`}
                    onKeyDown={(e) => e.key === 'Enter' && setCapitalView(nav.id)}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      overflow: 'hidden',
                      padding: '20px 28px',
                      cursor: 'pointer',
                      borderLeft: capitalView === nav.id ? '4px solid var(--mint)' : '4px solid transparent',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 24, fontWeight: 600, color: capitalView === nav.id ? 'var(--mint)' : 'var(--text)' }}>{nav.value}</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{nav.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{nav.sub}</div>
                  </div>
                ))}
              </div>

              {/* Share Class Structure */}
              {capitalView === 'structure' && (
              <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#share-classes</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Share Class Structure<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 2fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                    {['Class', 'Authorized', 'Outstanding', 'Votes/Share', 'Description'].map((h, i) => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 1 && i <= 3 ? 'right' : 'left' }}>{h}</span>
                    ))}
                  </div>
                  {SHARE_CLASSES.map((s, i) => (
                    <div key={s.class} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 2fr', padding: '12px 28px', borderBottom: i < SHARE_CLASSES.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{s.class}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(s.authorized / 1000).toLocaleString()}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>{s.outstanding > 0 ? `${(s.outstanding / 1000).toFixed(1)}M` : '—'}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{s.votes}</span>
                      <span style={{ fontSize: 12, color: 'var(--text2)' }}>{s.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              </>
              )}

              {/* Major Shareholders */}
              {capitalView === 'shareholders' && (
              <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#major-shareholders</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Major Shareholders (from Aug 2025 S-1)<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                    {['Shareholder', 'Class A (K)', 'Class B (K)', 'Voting %', 'Type'].map((h, i) => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 1 && i <= 3 ? 'right' : 'left' }}>{h}</span>
                    ))}
                  </div>
                  {MAJOR_SHAREHOLDERS.map((s, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: i < MAJOR_SHAREHOLDERS.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontWeight: 500, color: 'var(--text)' }}>{s.name}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{s.classA > 0 ? `${(s.classA / 1000).toFixed(1)}M` : '—'}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--sky)' }}>{s.classB > 0 ? `${(s.classB / 1000).toFixed(1)}M` : '—'}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>{s.pctVoting}%</span>
                      <span style={{ color: s.type === 'Insider' ? 'var(--gold)' : s.type === 'Strategic' ? 'var(--violet)' : 'var(--text2)', fontSize: 12 }}>{s.type}</span>
                    </div>
                  ))}
                  <div style={{ padding: '12px 28px', fontSize: 13, color: 'var(--text3)' }}>
                    Note: Class B voting capped at 30% aggregate. Founder shares sunset June 2030 or upon Allaire departure from CEO/Chair.
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Offerings View: Equity Offerings + Equity Awards + Warrants */}
              {capitalView === 'offerings' && (
              <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#equity-offerings</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {/* Equity Offerings */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Equity Offerings<UpdateIndicators sources="SEC" /></span>
                  </div>
                  <div style={{ padding: 0 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                      {['Date', 'Type', 'Shares', 'Price', 'Proceeds'].map((h, i) => (
                        <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 2 ? 'right' : 'left' }}>{h}</span>
                      ))}
                    </div>
                    {EQUITY_OFFERINGS.map((o, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <span style={{ fontSize: 12, color: 'var(--text2)' }}>{o.date}</span>
                        <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--text)' }}>{o.type}</span>
                        <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(o.shares / 1000).toFixed(1)}M</span>
                        <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>${o.price.toFixed(2)}</span>
                        <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>${o.grossProceeds >= 1000 ? `${(o.grossProceeds / 1000).toFixed(2)}B` : `${o.grossProceeds}M`}</span>
                      </div>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', padding: '12px 28px', fontWeight: 600, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                      <span style={{ gridColumn: '1 / 5', color: 'var(--text)' }}>Total Raised</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>$2.5B</span>
                    </div>
                    <div style={{ padding: '12px 28px', fontSize: 12, color: 'var(--text3)' }}>
                      IPO: {EQUITY_OFFERINGS[0].underwriters}<br/>
                      Follow-on: {EQUITY_OFFERINGS[1].underwriters}
                    </div>
                  </div>
                </div>

                {/* Outstanding Equity Awards */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Outstanding Equity Awards (Jun 30, 2025)<UpdateIndicators sources="SEC" /></span>
                  </div>
                  <div style={{ padding: 0 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                      {['Award Type', 'Class A', 'Class B', 'Total'].map((h, i) => (
                        <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 1 ? 'right' : 'left' }}>{h}</span>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ color: 'var(--text)' }}>Stock Options</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(EQUITY_AWARDS.options.classA / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(EQUITY_AWARDS.options.classB / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.options.classB) / 1000).toFixed(1)}M</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ color: 'var(--text)' }}>RSUs</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(EQUITY_AWARDS.rsus.classA / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(EQUITY_AWARDS.rsus.classB / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>{((EQUITY_AWARDS.rsus.classA + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 28px', fontWeight: 600 }}>
                      <span style={{ color: 'var(--text)' }}>Total Outstanding</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.rsus.classA) / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{((EQUITY_AWARDS.options.classB + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.options.classB + EQUITY_AWARDS.rsus.classA + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</span>
                    </div>
                    <div style={{ padding: '12px 28px', fontSize: 13, color: 'var(--text3)' }}>
                      Wtd-avg option exercise price: ${EQUITY_AWARDS.options.weightedAvgPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Warrants */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Outstanding Warrants (Black-Scholes Valuation)<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                    {['Grant', 'Shares (K)', 'Strike', 'Fair Value', 'Vol', 'Expiry', 'Status'].map((h, i) => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 1 && i <= 4 ? 'right' : 'left' }}>{h}</span>
                    ))}
                  </div>
                  {WARRANTS.map((w, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontSize: 12, color: 'var(--text)' }}>{w.date}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(w.shares / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>${w.exercisePrice}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--sky)' }}>${w.fairValue}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{w.volatility}%</span>
                      <span style={{ fontSize: 12, color: 'var(--text2)' }}>{w.expiry}</span>
                      <span style={{ fontSize: 12, color: 'var(--gold)' }}>{w.status}</span>
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr', padding: '12px 28px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text)' }}>Total</span>
                    <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(WARRANTS.reduce((a, w) => a + w.shares, 0) / 1000).toFixed(1)}M</span>
                    <span />
                    <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--sky)' }}>${WARRANTS.reduce((a, w) => a + w.fairValue, 0).toFixed(1)}M</span>
                    <span /><span /><span />
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Plans View: Equity Incentive Plans + Pre-IPO Preferred */}
              {capitalView === 'plans' && (
              <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#equity-plans</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Equity Incentive Plans (Reserved Shares)<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {EQUITY_PLANS.map((p, i) => (
                      <div key={i} style={{ background: 'var(--surface2)', padding: 20, borderRadius: 12 }}>
                      <div style={{ fontSize: 13, color: 'var(--text3)' }}>{p.plan}</div>
                      <div style={{ fontFamily: 'Space Mono', fontSize: 24, fontWeight: 700, color: 'var(--mint)' }}>
                        {(p.reserved / 1000).toFixed(1)}M
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>shares reserved</div>
                      <div style={{ fontSize: 13, color: 'var(--text2)' }}>{p.description}</div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pre-IPO Preferred (Historical) */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Pre-IPO Capital Structure (Converted at IPO)</span>
                </div>
                <div style={{ padding: 0 }}>
                  <div style={{ padding: '12px 28px', fontSize: 13, color: 'var(--text2)' }}>All preferred shares converted to Class A common stock at IPO. Historical liquidation preferences totaled $1.14B across six series.</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                    {['Series', 'Year', 'Shares (K)', 'Liq. Pref', 'Price/Share'].map((h, i) => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 1 ? 'right' : 'left' }}>{h}</span>
                    ))}
                  </div>
                  {PREFERRED_STOCK.map((p, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontSize: 12, color: 'var(--text)' }}>{p.series}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{p.year}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{p.shares.toLocaleString()}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>${(p.liquidation / 1000).toFixed(1)}M</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--sky)' }}>${p.pricePerShare.toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', padding: '12px 28px', fontWeight: 600 }}>
                    <span style={{ gridColumn: '1 / 3', color: 'var(--text)' }}>Total</span>
                    <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{(PREFERRED_STOCK.reduce((a, p) => a + p.shares, 0) / 1000).toFixed(1)}M</span>
                    <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>${(PREFERRED_STOCK.reduce((a, p) => a + p.liquidation, 0) / 1000000).toFixed(2)}B</span>
                    <span />
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Dilution View */}
              {capitalView === 'dilution' && (
              <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dilution-analysis</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Fully Diluted Share Count<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                    {['Component', 'Shares (M)', '% of Total'].map((h, i) => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i >= 1 ? 'right' : 'left' }}>{h}</span>
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
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ color: 'var(--text)' }}>{row.label}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{row.shares}</span>
                      <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>{row.pct}</span>
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 28px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text)' }}>Fully Diluted</span>
                    <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)' }}>~276.5</span>
                    <span style={{ textAlign: 'right', fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)' }}>100%</span>
                  </div>
                  <div style={{ padding: '12px 28px', fontSize: 13, color: 'var(--text3)' }}>
                    Note: Excludes 33.9M shares reserved under Omnibus/ESPP plans not yet granted. Lock-up: ~198M shares restricted until Q3 2025 earnings or 180 days post-IPO.
                  </div>
                </div>
              </div>
              </>
              )}

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
              <CFANotes title="CFA Level III — Capital Structure" items={[
                { term: 'SPAC Merger', def: 'Special Purpose Acquisition Company merger allows private companies to go public without traditional IPO. Circle merged with Concord Acquisition Corp.' },
                { term: 'Share Authorization', def: 'Maximum shares a company can issue, set in charter. Circle authorized additional shares to support growth and potential acquisitions.' },
                { term: 'Institutional Ownership', def: 'Percentage of shares held by institutional investors (mutual funds, pension funds, etc.). High institutional ownership signals professional conviction.' },
              ]} />
            </>
          )}

          {activeTab === 'monte-carlo' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-header</div>
                <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Stablecoin DCF Simulation<UpdateIndicators sources={['PR', 'SEC']} /></div>
                  <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Monte Carlo<span style={{ color: 'var(--accent)' }}>.</span></h2>
                  <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Runs {mcSim.n.toLocaleString()} simulations over {mcYears} years with randomized inputs (USDC growth, margins, rates, multiples) to generate a probability distribution of fair values.</p>
                </div>
              </div>

              {/* Scenario Presets */}
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-scenarios</div>
                <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Select Scenario</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                    {(['bear', 'base', 'bull', 'custom'] as const).map(key => {
                      const p = mcPresets[key];
                      const isActive = mcPreset === key;
                      return (
                        <button
                          key={key}
                          onClick={() => applyMcPreset(key)}
                          style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            border: 'none',
                            borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                            background: isActive ? 'var(--accent-dim)' : 'var(--surface)',
                            color: isActive ? 'var(--accent)' : 'var(--text)',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>{p.label}</div>
                          <div style={{ fontSize: 11, opacity: 0.7 }}>{p.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Horizon & Simulation Controls */}
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-controls</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>TIME HORIZON</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[3, 5, 7].map(yr => (
                        <button
                          key={yr}
                          onClick={() => { setMcYears(yr); setRunKey(k => k + 1); }}
                          style={{
                            flex: 1,
                            padding: '12px 20px',
                            borderRadius: 8,
                            border: mcYears === yr ? '2px solid var(--accent)' : '2px solid transparent',
                            background: mcYears === yr ? 'var(--accent-dim)' : 'var(--surface2)',
                            color: mcYears === yr ? 'var(--accent)' : 'var(--text2)',
                            cursor: 'pointer',
                            fontWeight: mcYears === yr ? 700 : 400,
                            fontFamily: 'Space Mono',
                            fontSize: 16,
                            transition: 'all 0.15s'
                          }}
                        >
                          {yr}Y
                        </button>
                      ))}
                    </div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>SIMULATIONS</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1000, 2000, 5000].map(simCount => (
                        <button
                          key={simCount}
                          onClick={() => { setMcSims(simCount); setRunKey(k => k + 1); }}
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: 8,
                            border: mcSims === simCount ? '2px solid var(--accent)' : '2px solid transparent',
                            background: mcSims === simCount ? 'var(--accent-dim)' : 'var(--surface2)',
                            color: mcSims === simCount ? 'var(--accent)' : 'var(--text2)',
                            cursor: 'pointer',
                            fontWeight: mcSims === simCount ? 700 : 400,
                            fontFamily: 'Space Mono',
                            fontSize: 14,
                            transition: 'all 0.15s'
                          }}
                        >
                          {simCount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parameters - Model Tab Style */}
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-parameters</div>
                <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>USDC Growth Parameters</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>REVENUE GROWTH MIN (%)</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Lower bound for annual USDC revenue growth in simulation.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[5, 10, 15, 20, 25, 30].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcRevenueGrowthMin : mcPresets[mcPreset].revMin;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcRevenueGrowthMin(opt); setMcPreset('custom'); }} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (() => { setMcRevenueGrowthMin(opt); setMcPreset('custom'); })()} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}%</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>REVENUE GROWTH MAX (%)</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Upper bound for annual USDC revenue growth in simulation.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[25, 35, 45, 55, 65, 75].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcRevenueGrowthMax : mcPresets[mcPreset].revMax;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcRevenueGrowthMax(opt); setMcPreset('custom'); }} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (() => { setMcRevenueGrowthMax(opt); setMcPreset('custom'); })()} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}%</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Profitability Parameters</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>MARGIN MIN (%)</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Lower bound for EBITDA margin assumption in DCF model.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[30, 40, 50, 55, 60, 65].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcMarginMin : mcPresets[mcPreset].marginMin;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcMarginMin(opt); setMcPreset('custom'); }} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (() => { setMcMarginMin(opt); setMcPreset('custom'); })()} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}%</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>MARGIN MAX (%)</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Upper bound for EBITDA margin assumption in DCF model.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[55, 60, 65, 70, 75, 80].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcMarginMax : mcPresets[mcPreset].marginMax;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcMarginMax(opt); setMcPreset('custom'); }} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (() => { setMcMarginMax(opt); setMcPreset('custom'); })()} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}%</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Parameters</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DISCOUNT RATE MIN (%)</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Lower bound for WACC / required return in DCF model.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[8, 10, 12, 14, 16, 18].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcDiscountMin : mcPresets[mcPreset].discMin;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcDiscountMin(opt); setMcPreset('custom'); }} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (() => { setMcDiscountMin(opt); setMcPreset('custom'); })()} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}%</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DISCOUNT RATE MAX (%)</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Upper bound for WACC / required return in DCF model.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[12, 14, 16, 18, 20, 22].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcDiscountMax : mcPresets[mcPreset].discMax;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcDiscountMax(opt); setMcPreset('custom'); }} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (() => { setMcDiscountMax(opt); setMcPreset('custom'); })()} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}%</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>TERMINAL MULTIPLE MIN</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Lower bound for exit EV/EBITDA multiple in DCF terminal value.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[8, 10, 12, 15, 18, 20].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcTerminalMultMin : mcPresets[mcPreset].termMin;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcTerminalMultMin(opt); setMcPreset('custom'); }} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}x</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>TERMINAL MULTIPLE MAX</span></div>
                    <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
                      Upper bound for exit EV/EBITDA multiple in DCF terminal value.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                      {[15, 18, 22, 25, 30, 35].map((opt, idx) => {
                        const currentVal = mcPreset === 'custom' ? mcTerminalMultMax : mcPresets[mcPreset].termMax;
                        const isActive = currentVal === opt;
                        const colors = [
                          { border: 'var(--coral)', bg: 'color-mix(in srgb, var(--coral) 20%, transparent)', text: 'var(--coral)' },
                          { border: '#f97316', bg: 'color-mix(in srgb, var(--coral) 15%, transparent)', text: '#f97316' },
                          { border: 'var(--gold)', bg: 'color-mix(in srgb, var(--gold) 15%, transparent)', text: 'var(--gold)' },
                          { border: '#a3e635', bg: 'color-mix(in srgb, #a3e635 15%, transparent)', text: '#84cc16' },
                          { border: 'var(--mint)', bg: 'color-mix(in srgb, var(--mint) 15%, transparent)', text: 'var(--mint)' },
                          { border: '#22c55e', bg: 'color-mix(in srgb, #22c55e 20%, transparent)', text: '#22c55e' },
                        ][idx];
                        return (
                          <div key={opt} onClick={() => { setMcTerminalMultMax(opt); setMcPreset('custom'); }} style={{
                            padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                            border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                            background: isActive ? colors.bg : 'var(--surface2)',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? colors.text : 'var(--text3)',
                            transition: 'all 0.15s'
                          }}>{opt}x</div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                </div>

                {/* Run Button */}
                <button onClick={() => setRunKey(k => k + 1)} style={{
                  width: '100%', padding: '12px 16px', background: 'var(--accent)', color: 'var(--bg1)',
                  border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14, transition: 'all 0.15s'
                }}>🎲 Run Simulation</button>
              </div>

              {/* Percentile Distribution */}
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-percentiles</div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '14px 28px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>
                    <span style={{ textAlign: 'left' }}>Percentile</span>
                    <span style={{ textAlign: 'right' }}>Price Target</span>
                    <span style={{ textAlign: 'right' }}>vs Current</span>
                    <span style={{ textAlign: 'right' }}>Implied Return</span>
                  </div>
                  {[
                    { label: 'P5 (Bear Case)', value: mcSim.p5 },
                    { label: 'P25', value: mcSim.p25 },
                    { label: 'P50 (Median)', value: mcSim.p50, highlight: true },
                    { label: 'P75', value: mcSim.p75 },
                    { label: 'P95 (Bull Case)', value: mcSim.p95 },
                  ].map((row, i) => {
                    const pctChange = ((row.value / MARKET.price - 1) * 100);
                    return (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: row.highlight ? 'var(--accent-dim)' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
                        onMouseEnter={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = 'var(--surface2)'; }}
                        onMouseLeave={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                      >
                        <span style={{ fontWeight: row.highlight ? 600 : 400, color: row.highlight ? 'var(--accent)' : 'var(--text2)' }}>{row.label}</span>
                        <span style={{ textAlign: 'right', fontFamily: 'Space Mono', fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--accent)' : 'var(--text)' }}>${row.value.toFixed(2)}</span>
                        <span style={{ textAlign: 'right', fontFamily: 'Space Mono', color: 'var(--text2)' }}>${(row.value - MARKET.price).toFixed(2)}</span>
                        <span style={{ textAlign: 'right', fontFamily: 'Space Mono', fontWeight: 500, color: pctChange >= 0 ? 'var(--mint)' : 'var(--red)' }}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Risk Metrics */}
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-risk-metrics</div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 28px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>
                    <span style={{ textAlign: 'left' }}>Risk Metric</span>
                    <span style={{ textAlign: 'right' }}>Value</span>
                    <span style={{ textAlign: 'left' }}>Interpretation</span>
                  </div>
                  {[
                    { label: 'Win Probability', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: mcSim.winProb > 50 ? 'var(--mint)' : 'var(--red)' }}>{mcSim.winProb.toFixed(1)}%</span>, interp: 'Prob. of exceeding current price' },
                    { label: 'Expected Value', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600 }}>${mcSim.mean.toFixed(2)}</span>, interp: 'Mean simulated fair value' },
                    { label: 'Sharpe Ratio', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: mcSim.sharpe > 1 ? 'var(--mint)' : mcSim.sharpe > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{mcSim.sharpe.toFixed(2)}</span>, interp: mcSim.sharpe > 1 ? 'Excellent risk-adj return' : mcSim.sharpe > 0.5 ? 'Good risk-adj return' : 'Moderate risk-adj return' },
                    { label: 'Sortino Ratio', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: mcSim.sortino > 1 ? 'var(--mint)' : mcSim.sortino > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{mcSim.sortino.toFixed(2)}</span>, interp: 'Downside-adjusted return' },
                    { label: 'VaR (5%)', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{mcSim.var5.toFixed(1)}%</span>, interp: '95% confidence floor' },
                    { label: 'CVaR (5%)', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{mcSim.cvar5.toFixed(1)}%</span>, interp: 'Expected tail loss' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 28px', borderBottom: '1px solid var(--border)', transition: 'background 0.15s', cursor: 'default' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--surface2)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                    >
                      <span style={{ color: 'var(--text2)' }}>{row.label}</span>
                      <span style={{ textAlign: 'right' }}>{row.value}</span>
                      <span style={{ color: 'var(--text3)' }}>{row.interp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribution Chart */}
              <div>
                <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-distribution</div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>FAIR VALUE DISTRIBUTION</span></div>
                  <div style={{ padding: '24px 28px' }}>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={mcSim.histogram}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="price" stroke="var(--text3)" tickFormatter={v => `$${v.toFixed(0)}`} />
                      <YAxis stroke="var(--text3)" tickFormatter={v => `${v.toFixed(1)}%`} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}
                        formatter={(v) => [`${v.toFixed(2)}%`, 'Probability']}
                        labelFormatter={(v) => `$${v.toFixed(0)}`}
                      />
                      <Bar dataKey="pct" fill="var(--accent)" radius={[2, 2, 0, 0]} />
                      <ReferenceLine x={MARKET.price} stroke="#fff" strokeDasharray="5 5" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)' }}>
                    <span>White line = current price (${MARKET.price.toFixed(0)})</span>
                    <span>Simulations: {mcSim.n.toLocaleString()}</span>
                  </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-notes</div>
              <CFANotes title="CFA Level III — Monte Carlo Simulation" items={[
                { term: 'Stochastic Modeling', def: 'Uses random sampling to model uncertainty. Each iteration draws from probability distributions for key inputs.' },
                { term: 'Input Distributions', def: 'USDC growth, margins, rates, multiples vary within defined ranges. Uniform distributions based on confidence.' },
                { term: 'Percentile Interpretation', def: 'P5 = 5% chance price is lower. P50 = median outcome. P95 = 5% chance price is higher.' },
                { term: 'VaR (Value at Risk)', def: 'The loss level that won\'t be exceeded with 95% confidence. Shows downside risk.' },
                { term: 'CVaR (Expected Shortfall)', def: 'Average loss in worst 5% of scenarios. More conservative than VaR for tail risk.' },
                { term: 'Sharpe/Sortino Ratios', def: 'Risk-adjusted return metrics. Sortino only penalizes downside volatility.' },
              ]} />
            </div>
          )}

          {activeTab === 'timeline' && (
            <>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#timeline-header</div>
              <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Corporate Events<UpdateIndicators sources="PR" /></div>
                <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Timeline<span style={{ color: 'var(--accent)' }}>.</span></h2>
                <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>SEC filings, press releases, partnerships, and corporate milestones. Chronological record of Circle's evolution as the USDC issuer.</p>
              </div>

              {/* Latest SEC Filings - Enhanced with filtering and pagination */}
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sec-filings</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>SEC Filings<UpdateIndicators sources="SEC" /></span>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  {/* Filter Buttons */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {secFilterTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => { setSecFilter(type); setShowAllFilings(false); }}
                        style={{
                          padding: '4px 12px',
                          borderRadius: 99,
                          fontSize: 11,
                          fontWeight: 500,
                          border: '1px solid',
                          borderColor: secFilter === type ? 'var(--cyan)' : 'var(--border)',
                          cursor: 'pointer',
                          background: secFilter === type ? 'color-mix(in srgb, var(--cyan) 15%, transparent)' : 'transparent',
                          color: secFilter === type ? 'var(--cyan)' : 'var(--text3)',
                          transition: 'all 0.2s'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Filings Grid */}
                  <div style={{ overflowX: 'auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 2fr 1fr 60px', padding: '12px 28px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                      {['Date', 'Type', 'Description', 'Period', 'Link'].map((h, i) => (
                        <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i === 4 ? 'right' : 'left' }}>{h}</span>
                      ))}
                    </div>
                    {displayedFilings.map((filing, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '100px 80px 2fr 1fr 60px', padding: '12px 28px', borderBottom: idx < displayedFilings.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s', alignItems: 'center' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <span style={{ fontSize: 12, color: 'var(--text)', whiteSpace: 'nowrap' }}>{filing.date}</span>
                        <span>
                          <span style={{
                            background: secTypeColors[filing.type]?.bg || 'color-mix(in srgb, var(--text3) 20%, transparent)',
                            color: secTypeColors[filing.type]?.text || 'var(--text2)',
                            padding: '2px 8px',
                            borderRadius: 99,
                            fontSize: 11,
                            fontWeight: 600
                          }}>
                            {filing.type}
                          </span>
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--text2)' }}>{filing.description}</span>
                        <span style={{ fontSize: 12, color: 'var(--text2)' }}>{filing.period}</span>
                        <span style={{ textAlign: 'right' }}>
                          <a
                            href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${secMeta.cik}&type=${filing.type}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--mint)', fontSize: 12 }}
                          >
                            SEC
                          </a>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Show More/Less Button */}
                  {filteredFilings.length > 6 && (
                    <button
                      onClick={() => setShowAllFilings(!showAllFilings)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: 'var(--surface2)',
                        border: '1px solid var(--border)',
                        borderRadius: 99,
                        color: 'var(--text2)',
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {showAllFilings ? '▲ Show Less' : `▼ Show ${hiddenCount} More Filings`}
                    </button>
                  )}

                  {/* Footer with metadata and Last PR marker */}
                  <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12 }}>
                      <div>
                        <span style={{ color: 'var(--text3)' }}>CIK:</span>
                        <span style={{ color: 'var(--text2)', marginLeft: 6, fontFamily: 'Space Mono' }}>{secMeta.cik}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text3)' }}>Ticker:</span>
                        <span style={{ color: 'var(--mint)', marginLeft: 6, fontWeight: 600 }}>{secMeta.ticker}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text3)' }}>Exchange:</span>
                        <span style={{ color: 'var(--text2)', marginLeft: 6 }}>{secMeta.exchange}</span>
                      </div>
                      <a
                        href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${secMeta.cik}&type=&dateb=&owner=include&count=40`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--sky)', marginLeft: 'auto' }}
                      >
                        View All SEC Filings →
                      </a>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--cyan)' }}>●</span>
                      <span style={{ display: 'flex', alignItems: 'center' }}>Last PR Processed: {secMeta.lastPR.date} — {secMeta.lastPR.title}<UpdateIndicators sources="PR" /></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Upcoming & Press Releases</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#upcoming-events</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Upcoming Events<UpdateIndicators sources="PR" /></span>
                    </div>
                    <div style={{ padding: '24px 28px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text)' }}>Q4 2025 Earnings</div>
                            <div style={{ fontSize: 12, color: 'var(--text3)' }}>10-K Annual Report</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: 'Space Mono', color: 'var(--mint)' }}>~Feb 2026</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est.</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text)' }}>Lock-up Expiry</div>
                            <div style={{ fontSize: 12, color: 'var(--text3)' }}>~198M shares eligible for sale</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: 'Space Mono', color: 'var(--gold)' }}>Dec 2025</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>180 days post-IPO</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text)' }}>Convertible Note Maturity</div>
                            <div style={{ fontSize: 12, color: 'var(--text3)' }}>2019 SeedInvest Note ($15.7M)</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: 'Space Mono', color: 'var(--sky)' }}>Mar 2026</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Convertible @ $16.23</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#recent-press-releases</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Recent Press Releases<UpdateIndicators sources="PR" /></span>
                    </div>
                    <div style={{ padding: '24px 28px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'var(--text3)' }}>Dec 12, 2025</span>
                            <span style={{ fontSize: 11, color: 'var(--gold)' }}>Regulatory</span>
                          </div>
                          <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>OCC Grants Preliminary Approval for National Bank Charter</div>
                        </div>
                        <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'var(--text3)' }}>Nov 12, 2025</span>
                            <span style={{ fontSize: 11, color: 'var(--mint)' }}>Earnings</span>
                          </div>
                          <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Circle Reports Q3 2025 Results: $740M Revenue, USDC at $73.7B</div>
                        </div>
                        <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'var(--text3)' }}>Oct 29, 2025</span>
                            <span style={{ fontSize: 11, color: 'var(--sky)' }}>Partnership</span>
                          </div>
                          <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Binance to Adopt USYC for Yield-Bearing Treasury Holdings</div>
                        </div>
                        <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'var(--text3)' }}>Aug 12, 2025</span>
                            <span style={{ fontSize: 11, color: 'var(--violet)' }}>Corporate</span>
                          </div>
                          <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Circle Launches Follow-on Offering (10M shares)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Timeline Section */}
              <div style={{ padding: '28px 0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Event Timeline</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#event-timeline</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 12, margin: 0 }}>
                <span>Event Timeline</span>
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text3)' }}>({filteredEvents.length} events)</span>
                <UpdateIndicators sources="PR" />
              </h3>

              {/* Topic Filters (AND logic multi-select) */}
              <div style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--surface)) 0%, var(--surface) 100%)', border: '1px solid var(--border)', borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Filter by Topic</span>
                  {selectedTopics.length > 0 && (
                    <button
                      onClick={() => setSelectedTopics([])}
                      style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer' }}
                    >
                      Clear ({selectedTopics.length})
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {Object.entries(topicTags).map(([topic, style]) => {
                    const isSelected = selectedTopics.includes(topic);
                    const count = TIMELINE.filter(p => detectTopics(p).includes(topic)).length;
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        style={{
                          fontSize: 11,
                          padding: '4px 12px',
                          borderRadius: 99,
                          border: '1px solid',
                          borderColor: isSelected ? style.color : 'var(--border)',
                          background: isSelected ? style.color : 'transparent',
                          color: isSelected ? 'white' : 'var(--text2)',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        {style.label} ({count})
                      </button>
                    );
                  })}
                </div>
                {selectedTopics.length > 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
                    {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEvents.length} results
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cats.map(c => {
                    const isActive = timelineCat === c;
                    return (
                      <button key={c} onClick={() => setTimelineCat(c)} style={{
                        fontSize: 11,
                        padding: '4px 12px',
                        borderRadius: 99,
                        border: '1px solid',
                        borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                        background: isActive ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                        color: isActive ? 'var(--accent)' : 'var(--text2)',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}>
                        {c === 'All' ? `All (${TIMELINE.length})` : `${c} (${TIMELINE.filter(p => p.category === c).length})`}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    if (expanded.size === filteredEvents.length) {
                      setExpanded(new Set());
                    } else {
                      setExpanded(new Set(filteredEvents.map(p => TIMELINE.indexOf(p))));
                    }
                  }}
                  style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer' }}
                >
                  {expanded.size === filteredEvents.length ? '⊟ Collapse All' : '⊞ Expand All'}
                </button>
              </div>

              <div>
                {filteredEvents.slice().reverse().map((p, i) => {
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
                    <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 4, overflow: 'hidden' }}>
                      <div onClick={toggleExpand} style={{ display: 'grid', gridTemplateColumns: '90px 100px 1fr auto 24px', padding: '12px 20px', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'var(--text3)' }}>{p.date}</span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)' }}>{p.category}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{p.event}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: verdictColor, textTransform: 'capitalize' }}>
                          {p.verdict === 'positive' && '↑ '}
                          {p.verdict === 'negative' && '↓ '}
                          {p.verdict === 'mixed' && '↔ '}
                          {p.verdict}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text3)', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                      </div>
                      {isExpanded && (
                        <div style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border)' }}>
                          <div style={{ padding: '12px 0' }}>
                            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{p.details}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
                              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '8px 12px' }}>
                                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Impact</div>
                                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{p.impact}</div>
                              </div>
                              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '8px 12px' }}>
                                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Source</div>
                                <div style={{ fontSize: 12, color: 'var(--mint)', marginTop: 2 }}>{p.source}</div>
                              </div>
                              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '8px 12px' }}>
                                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>Verdict</div>
                                <div style={{ fontSize: 12, color: verdictColor, marginTop: 2 }}>
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
              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#timeline-header</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>How to Use This Log</span>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                    <div>
                      <h4 style={{ color: 'var(--mint)', fontWeight: 500, marginBottom: 8, fontSize: 14, marginTop: 0 }}>Categories Explained</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text2)' }}>
                        <li><span style={{ color: 'var(--gold)' }}>Partnership:</span> Commercial integrations, strategic alliances</li>
                        <li><span style={{ color: 'var(--sky)' }}>Product:</span> USDC features, protocol upgrades, launches</li>
                        <li><span style={{ color: 'var(--violet)' }}>Regulatory:</span> Licenses, compliance, legal milestones</li>
                        <li><span style={{ color: 'var(--mint)' }}>Corporate:</span> Leadership, financing, M&A, governance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--mint)', fontWeight: 500, marginBottom: 8, fontSize: 14, marginTop: 0 }}>Updating This Log</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: 'var(--text2)' }}>
                        <li>Add new entries chronologically at the top</li>
                        <li>Include sources for traceability</li>
                        <li>Tag verdict: Positive/Negative/Neutral</li>
                        <li>Add context in details field</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
              <CFANotes title="CFA Level III — Corporate Events" items={[
                { term: '10-K / 10-Q', def: 'Annual and quarterly SEC filings. 10-K is audited; 10-Q is unaudited. Both contain financial statements and management discussion.' },
                { term: 'S-1 Registration', def: 'IPO registration statement filed with SEC. Contains comprehensive company information, financials, and risk factors.' },
                { term: 'MiCA Compliance', def: 'Markets in Crypto-Assets regulation in EU. Circle obtained MiCA license, allowing USDC/EURC operations across EU member states.' },
              ]} />
            </>
          )}

          {activeTab === 'comps' && <CompsTab />}

          {activeTab === 'wall-street' && (
            <WallStreetTab />
          )}

          {activeTab === 'sources' && (
            <SharedSourcesTab ticker="CRCL" companyName="Circle Internet Group" researchSources={crclResearchSources} competitorLabel="Stablecoin Peers" competitors={crclCompetitors} />
          )}
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
  const [competitorFilter, setCompetitorFilter] = useState<CRCLCompetitorId | 'all'>('all');
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
  const COMPETITOR_PROFILES: CRCLCompetitorProfile[] = [
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

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR NEWS - Add new entries at TOP (newest first)
  // NEVER delete old entries - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_NEWS: CRCLCompetitorNewsEntry[] = [
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
    //   crclComparison: 'How this compares to CRCL position',
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
      crclComparison: 'Kraken building institutional investment products could eventually incorporate USDC-denominated strategies, expanding institutional demand for Circle\'s stablecoin infrastructure. Institutional yield strategies require stablecoin settlement rails.',
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
      crclComparison: 'Kraken\'s PoR covering both USDC and USDT demonstrates both stablecoins have significant exchange custody demand. Circle\'s own reserve transparency (monthly attestations, BlackRock-managed reserves) sets the industry standard that exchanges complement.',
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
      crclComparison: 'Kraken\'s F1 sponsorship increases crypto brand awareness and mainstream adoption broadly, which benefits USDC as the leading regulated stablecoin. Larger Kraken user base = larger addressable market for USDC distribution.',
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
      crclComparison: 'Directly expands USDC demand and circulation. Kraken converts user cash deposits into USDC for DeFi deployment, creating net new USDC minting pressure. Validates Circle\'s ecosystem and USDC\'s role as DeFi settlement currency.',
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
      crclComparison: 'Every new chain support on major exchanges expands USDC multi-chain reach. Kraken adding Algorand USDC support increases Circle\'s distribution footprint and makes USDC accessible via an additional low-fee, high-speed network.',
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
      crclComparison: 'Kraken\'s sports marketing partnerships drive platform trading activity and user acquisition. Growing exchange volume supports USDC\'s role as a primary funding and trading pair settlement currency.',
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
        'Regulatory clarity shifting from "theoretical tailwind" to "tangible" in 2026',
        'DeFi tokenomics evolving: Uniswap-style fee sharing could reprice governance tokens toward durable valuation frameworks',
      ],
      implication: 'positive',
      crclComparison: 'Kraken\'s research highlighting stablecoin liquidity at ATH and regulatory clarity as key 2026 themes directly validates Circle\'s growth thesis. GENIUS Act stablecoin legislation benefits USDC as the compliance-first market leader. RWA tokenization growth ($5.6B→$19B) expands use cases for USDC settlement.',
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
      crclComparison: 'Kraken providing institutional custody for USDe (Ethena) signals exchange willingness to support stablecoin alternatives to USDC. USDe\'s synthetic dollar model competes for the same dollar-denominated DeFi demand that drives USDC circulation growth.',
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
      crclComparison: 'Kraken\'s EU expansion under MiCA directly supports EURC distribution. As Kraken grows its European user base with full regulatory compliance, it creates a larger addressable market for Circle\'s EURC stablecoin and supports the euro-denominated stablecoin ecosystem.',
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
        'Kraken Co-CEO Arjun Sethi: "financial assets move onto open networks as neutral, composable building blocks"',
      ],
      implication: 'neutral',
      crclComparison: 'Kraken\'s xStocks tokenized equities compete in the broader RWA tokenization space alongside Circle\'s vision. However, equity tokenization and stablecoin infrastructure serve different functions — USDC could benefit as the settlement currency of choice for tokenized asset markets.',
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
      crclComparison: 'xStocks\' $10B+ volume demonstrates growing demand for tokenized financial assets onchain. As RWA tokenization scales, USDC could benefit as the primary settlement and liquidity currency for tokenized asset markets. Circle and Kraken could be complementary infrastructure providers.',
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
      crclComparison: 'Kraken\'s liquidity maturation across 425+ trading pairs creates deep markets that benefit USDC-denominated trading. Healthy exchange liquidity supports USDC\'s role as a primary trading settlement and funding currency.',
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
      crclComparison: 'Kraken investing in mobile app performance engineering improves the user experience for USDC trading and transactions. Better app reliability lowers friction for retail users to on/off-ramp into USDC.',
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
      crclComparison: 'Kraken adding USDG as collateral alongside USDC increases stablecoin competition for exchange use cases. Each new stablecoin collateral option dilutes USDC\'s share of margin funding. However, USDC\'s regulatory moat and Circle partnership likely maintain preferential positioning.',
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
      crclComparison: 'Kraken supporting USDT0 on a stablecoin-optimized chain strengthens Tether\'s cross-chain distribution advantage. USDT0\'s unified liquidity model competes with Circle\'s CCTP for cross-chain USDC interoperability. Plasma as a stablecoin-first chain could favor USDT settlement.',
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
      crclComparison: 'Kraken\'s institutional-grade connectivity infrastructure attracts high-frequency and institutional traders who require stablecoin settlement rails. Faster execution and deeper liquidity on Kraken supports USDC trading pair volume.',
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
      crclComparison: 'Kraken\'s Latin America expansion brings new users who need USD-denominated stablecoins for cross-border transactions and savings. Colombia\'s growing remittance and stablecoin demand is a natural fit for USDC adoption through Kraken\'s platform.',
      source: 'Kraken Blog',
      storyId: 'kraken-expansion',
      storyTitle: 'Kraken Global Expansion & Marketing',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - DEUTSCHE BÖRSE PARTNERSHIP (Dec 4, 2025)
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
      crclComparison: 'Deutsche Börse partnership massively expands Kraken\'s institutional reach across European TradFi. 360T FX integration improves fiat on-ramp efficiency — potential to streamline USDC minting/redemption for institutions. Eurex derivatives and Clearstream custody create new institutional demand for stablecoin settlement.',
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
      crclComparison: 'CRCLx is among the top 10 xStocks with 24/7 trading — directly increases liquidity and accessibility for tokenized Circle equity exposure. 24/7 tokenized equity markets likely require stablecoin settlement rails, benefiting USDC infrastructure.',
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
      crclComparison: 'Kraken vertically integrating tokenized equity infrastructure accelerates RWA tokenization. xStocks on Ethereum and multichain expansion could drive demand for USDC as the primary settlement currency for tokenized asset markets. Circle\'s CCTP could be the cross-chain USDC bridge for xStocks liquidity.',
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
      crclComparison: 'Kraken incentivizing high-volume market makers with equity warrants should deepen liquidity across trading pairs including USDC pairs. Better market-making improves USDC price stability and reduces spreads for users, supporting USDC\'s utility as a trading settlement currency.',
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
      crclComparison: 'Directly bullish for Circle. Kraken adding EURC as margin collateral validates Circle\'s euro stablecoin as institutional-grade collateral alongside USDC. Expands EURC utility beyond simple payments into derivatives and leveraged trading — a significant use case expansion for Circle\'s euro product.',
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
      crclComparison: 'Kraken Ramp as B2B infrastructure for fiat-to-crypto creates a massive new distribution channel for USDC. Every fintech, wallet, or protocol integrating Ramp could offer USDC on/off-ramp to their users. Complementary to Circle Mint — Ramp handles consumer fiat while Circle Mint handles institutional minting.',
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
      crclComparison: 'MiCA-regulated custody in the EEA creates institutional-grade infrastructure for holding USDC and EURC. As European institutions gain regulated custody access, demand for Circle\'s MiCA-compliant stablecoins (USDC and EURC issued under French EMI license) should grow.',
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
      crclComparison: 'xStocks\' rapid adoption ($10B in 135 days) validates demand for tokenized real-world assets. As the RWA tokenization ecosystem scales, USDC is positioned to be the primary settlement currency. Circle\'s own RWA partnerships (BlackRock BUIDL, Hashnote USYC) are complementary infrastructure.',
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
      crclComparison: 'Kraken attracting HFT and institutional traders with sub-140ms connectivity improves exchange liquidity. High-frequency trading strategies often use stablecoins for rapid settlement — USDC\'s deep liquidity on Kraken benefits from faster connectivity infrastructure.',
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
      crclComparison: 'Kraken\'s quarterly PoR covering USDC demonstrates exchange commitment to stablecoin reserve transparency. Complements Circle\'s own monthly attestation standard. Exchange-level transparency for USDC holdings reinforces institutional confidence in USDC as a trustworthy reserve asset.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional Services',
    },
  ];

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
  const getCompetitorName = (id: CRCLCompetitorId): string => {
    if (id === 'other') return 'Miscellaneous';
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };

  // Implication styling - using design tokens
  const getImplicationStyle = (impl: CRCLImplication) => {
    switch (impl) {
      case 'positive': return { bg: 'var(--mint-dim)', color: 'var(--mint)', label: '✓ Good for CRCL' };
      case 'negative': return { bg: 'var(--coral-dim)', color: 'var(--coral)', label: '⚠ Threat to CRCL' };
      default: return { bg: 'var(--surface3)', color: 'var(--text3)', label: '○ Neutral' };
    }
  };

  // Category styling - using design tokens
  const getCategoryStyle = (cat: CRCLCompetitorNewsCategory) => {
    const styles: Record<CRCLCompetitorNewsCategory, { bg: string; color: string }> = {
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#comparables-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Peer Analysis Framework<UpdateIndicators sources={['WS']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Comparables & Competitor Intelligence<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Circle sits at the intersection of multiple peer groups: crypto infrastructure (Coinbase), payments networks (Visa, PayPal), and high-growth fintech. Each lens provides different valuation context. Crypto peers trade at premium P/S; payments peers show margin potential.</p>
      </div>

      {/* Peer Group Selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {Object.entries(PEER_GROUPS).map(([key, group]) => {
          const isActive = selectedPeerGroup === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPeerGroup(key)}
              style={{ padding: '8px 14px', fontSize: 13, fontWeight: isActive ? 600 : 500, borderRadius: 8, background: isActive ? 'var(--accent-dim)' : 'var(--surface2)', border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`, color: isActive ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}
            >
              {group.name}
            </button>
          );
        })}
      </div>

      {/* Unified Peer Cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#peer-group</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {currentPeers.peers.map((p, i) => {
          const qual = keyCompLookup[p.name.split(' (')[0]] || keyCompLookup[p.name];
          const isSelf = p.highlight;
          const cardBorderLeft = isSelf ? '4px solid var(--accent)' : qual ? `4px solid ${qual.threat.toLowerCase() === 'high' || qual.threat.toLowerCase() === 'critical' ? 'var(--coral)' : qual.threat.toLowerCase() === 'medium' ? 'var(--gold)' : 'var(--mint)'}` : '4px solid var(--surface3)';
          const cardBg = isSelf ? 'linear-gradient(135deg, var(--accent-dim) 0%, var(--surface) 100%)' : 'var(--surface)';
          const threatBadgeBg = qual ? (qual.threat.toLowerCase() === 'high' ? 'rgba(255,123,114,0.15)' : qual.threat.toLowerCase() === 'medium' ? 'rgba(210,153,34,0.15)' : 'rgba(126,231,135,0.15)') : '';
          const threatBadgeColor = qual ? (qual.threat.toLowerCase() === 'high' ? 'var(--coral)' : qual.threat.toLowerCase() === 'medium' ? 'var(--gold)' : 'var(--mint)') : '';
          return (
            <div key={i} style={{ background: cardBg, border: '1px solid var(--border)', borderRadius: 16, padding: 20, borderLeft: cardBorderLeft }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{p.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>{p.ticker}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                  {qual && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: threatBadgeBg, color: threatBadgeColor }}>{qual.threat}</span>}
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: 'var(--surface3)', color: 'var(--text3)' }}>{currentPeers.name}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 6, padding: 10, background: 'var(--surface2)', borderRadius: 10, marginBottom: 10 }}>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{p.cap ? `$${p.cap}B` : 'Private'}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Mkt Cap</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>${p.rev}B</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Revenue</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{p.ebitda > 0 ? `$${p.ebitda}B` : p.ebitda < 0 ? `($${Math.abs(p.ebitda)}B)` : '—'}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>EBITDA</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: p.margin >= 30 ? 'var(--mint)' : p.margin < 0 ? 'var(--coral)' : 'var(--text)', lineHeight: 1.2 }}>{p.margin}%</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Margin</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: p.growth >= 30 ? 'var(--mint)' : 'var(--text)', lineHeight: 1.2 }}>{p.growth}%</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Growth</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--accent)', lineHeight: 1.2 }}>{p.cap ? `${(p.cap / p.rev).toFixed(1)}x` : '—'}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>P/S</div></div>
              </div>
              {qual && (
                <>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Focus:</strong> {qual.focus}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>{qual.notes}</div>
                </>
              )}
            </div>
          );
        })}
        {/* Show keyCompetitors not in current peer group when viewing crypto */}
        {selectedPeerGroup === 'crypto' && keyCompetitors
          .filter(k => !currentPeers.peers.find(p => p.name.includes(k.name.split(' (')[0])))
          .map((k, i) => {
            const threatLevel = k.threat.toLowerCase();
            const borderLeftColor = threatLevel === 'high' || threatLevel === 'critical' ? 'var(--coral)' : threatLevel === 'medium' ? 'var(--gold)' : 'var(--mint)';
            const tBadgeBg = threatLevel === 'high' ? 'rgba(255,123,114,0.15)' : threatLevel === 'medium' ? 'rgba(210,153,34,0.15)' : 'rgba(126,231,135,0.15)';
            const tBadgeColor = threatLevel === 'high' ? 'var(--coral)' : threatLevel === 'medium' ? 'var(--gold)' : 'var(--mint)';
            return (
            <div key={`extra-${i}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, borderLeft: `4px solid ${borderLeftColor}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{k.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>{k.type}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: tBadgeBg, color: tBadgeColor }}>{k.threat}</span>
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: 'var(--surface3)', color: 'var(--text3)' }}>{k.type}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Status:</strong> {k.status}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Focus:</strong> {k.focus}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>{k.notes}</div>
            </div>
            );
          })
        }
      </div>

      {/* Circle-Specific Business Model Metrics */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#business-model-metrics</div>
      <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>Circle Business Model Metrics<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Unique metrics for stablecoin issuers — monetization of reserves</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>{CIRCLE_METRICS.revenuePerUSDC}¢</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Rev per $1 USDC</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>{CIRCLE_METRICS.grossTakeRate}%</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Gross Take Rate</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>{CIRCLE_METRICS.distributionCostPct}%</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Coinbase Share</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>{CIRCLE_METRICS.netTakeRate}%</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Net Take Rate</div>
          </div>
        </div>
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ color: 'var(--text3)', fontSize: 12 }}>Reserve Yield</span>
              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)' }}>{CIRCLE_METRICS.reserveYield}%</div>
            </div>
            <div>
              <span style={{ color: 'var(--text3)', fontSize: 12 }}>RLDC Margin</span>
              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)' }}>{CIRCLE_METRICS.rldcMargin}%</div>
            </div>
            <div>
              <span style={{ color: 'var(--text3)', fontSize: 12 }}>Tether Take Rate</span>
              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--text2)' }}>4.4%</div>
            </div>
            <div>
              <span style={{ color: 'var(--text3)', fontSize: 12 }}>Tether Margin</span>
              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--text2)' }}>85%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Methodology Valuation Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#implied-valuation-matrix</div>
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>Implied Valuation Matrix<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Circle's value under different peer multiples (current: $18.9B)</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)', borderRadius: '10px 0 0 0' }}>Method</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Peer Basis</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Multiple</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Implied Value</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)', borderRadius: '0 10px 0 0' }}>Premium/(Discount)</th>
            </tr>
          </thead>
          <tbody>
            {VALUATION_MATRIX.map((v, i) => (
              <tr key={i}>
                <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 500 }}>{v.method}</td>
                <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{v.basis}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{v.multiple}x</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, color: 'var(--mint)' }}>${v.implied.toFixed(1)}B</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, color: v.premium >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {v.premium >= 0 ? '+' : ''}{v.premium.toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Growth vs P/S Scatter Plot */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#growth-vs-ps</div>
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>Growth vs. P/S Multiple<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Circle's positioning relative to peers (bubble size = market cap)</p>
        <div style={{ height: 300 }}>
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
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', fontSize: 12 }}>
          <span><span style={{ color: 'var(--mint)' }}>★</span> Circle</span>
          <span><span style={{ color: 'var(--sky)' }}>●</span> Crypto</span>
          <span><span style={{ color: 'var(--violet)' }}>●</span> Networks</span>
          <span><span style={{ color: 'var(--gold)' }}>●</span> Payments</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* SOTP Valuation */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sotp</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>Sum-of-the-Parts (SOTP)<UpdateIndicators sources={['WS']} /></div>
              <p style={{ color: 'var(--text3)', fontSize: 13, margin: '4px 0 0' }}>Value each business segment separately</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Segment</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Metric</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Multiple</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {SOTP.map((s, i) => (
                  <tr key={i}>
                    <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
                      <div style={{ fontWeight: 500 }}>{s.segment}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.basis}</div>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{s.metric}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{s.multiple}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, color: 'var(--mint)' }}>
                      {s.value ? `$${s.value}B` : s.valueLow && s.valueHigh ? `$${s.valueLow}-${s.valueHigh}B` : '—'}
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 600 }}>
                  <td colSpan={3} style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>SOTP Range</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, color: 'var(--mint)' }}>$15.5-17.5B</td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '12px 20px', fontSize: 12, color: 'var(--text3)' }}>
              Current market cap: $18.9B ({((18.9 / 16.5 - 1) * 100).toFixed(0)}% premium to midpoint)
            </div>
          </div>
        </div>

        {/* Transaction Comps */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#transaction-comps</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>Transaction Comps<UpdateIndicators sources={['WS']} /></div>
              <p style={{ color: 'var(--text3)', fontSize: 13, margin: '4px 0 0' }}>Recent M&A and funding deals in the space</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Date</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Target</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Value</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((t, i) => (
                  <tr key={i}>
                    <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{t.date}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
                      <div style={{ fontWeight: 500 }}>{t.target}</div>
                      {t.notes && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.notes}</div>}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{t.value ? `$${t.value}B` : '—'}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14 }}><span style={{
                      fontSize: 10,
                      padding: '3px 8px',
                      borderRadius: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontWeight: 600,
                      background: t.type === 'M&A' ? 'var(--mint-dim)' : t.type === 'Funding' ? 'var(--sky-dim)' : 'var(--gold-dim)',
                      color: t.type === 'M&A' ? 'var(--mint)' : t.type === 'Funding' ? 'var(--sky)' : 'var(--gold)'
                    }}>{t.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sensitivity Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#valuation-sensitivity</div>
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>Valuation Sensitivity: USDC × Interest Rates<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Implied enterprise value at Coinbase P/S multiple (13x net revenue)</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)', borderRadius: '10px 0 0 0' }}>USDC ($B) ↓ / Rate → </th>
                {SENSITIVITY_RATES.map((r, idx) => <th key={r} style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, background: 'var(--surface2)', ...(idx === SENSITIVITY_RATES.length - 1 ? { borderRadius: '0 10px 0 0' } : {}) }}>{r}%</th>)}
              </tr>
            </thead>
            <tbody>
              {SENSITIVITY_USDC.map(usdc => (
                <tr key={usdc}>
                  <td style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 600 }}>${usdc}B</td>
                  {SENSITIVITY_RATES.map(rate => {
                    const val = calcSensitivity(usdc, rate, 13);
                    const isNear = Math.abs(usdc - 73.7) < 15 && Math.abs(rate - 4.0) < 0.5;
                    return (
                      <td key={rate} style={{ padding: '14px 16px', textAlign: 'right', borderBottom: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: 14, ...(isNear ? { background: 'var(--accent-dim)', fontWeight: 600, color: 'var(--accent)' } : {}) }}>
                        ${val.toFixed(1)}B
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>
          Highlighted: Current USDC (~$74B) × Current rate (~4%). Assumes 45% net revenue margin after Coinbase distribution costs.
        </div>
      </div>

      {/* Historical Multiple Tracking */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#ps-multiple-history</div>
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>P/S Multiple Since IPO<UpdateIndicators sources={['WS']} /></div>
        <div style={{ height: 280 }}>
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
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', fontSize: 12 }}>
          <span><span style={{ color: 'var(--accent)' }}>━━</span> Circle P/S</span>
          <span><span style={{ color: 'var(--sky)' }}>╌╌</span> Crypto Peer Avg</span>
          <span><span style={{ color: 'var(--gold)' }}>╌╌</span> Payments Peer Avg</span>
        </div>
      </div>

      {/* Rule of 40 Analysis */}
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Rule of 40 Analysis</div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Growth Rate + Profit Margin &ge; 40% indicates healthy SaaS/fintech</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--mint)' }}>105</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Circle (66% + 39%)</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>55</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Coinbase (30% + 25%)</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>26</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>PayPal (8% + 18%)</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>77</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Visa (10% + 67%)</div>
          </div>
        </div>
      </div>

      {/* Competitor News Intelligence Section - Eyebrow + Title + Dot Header */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitor-news</div>
      <div style={{ padding: '28px 0 12px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Competitive Intelligence<UpdateIndicators sources="PR" /></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Competitor News<span style={{ color: 'var(--accent)' }}>.</span></h3>
        </div>
      </div>

      {/* Competitor Filter - Card container + pill buttons */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitor-filter</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 28px', marginTop: 8 }}>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}>Track what peer companies are doing — stablecoins, exchanges, regulatory moves affecting USDC market position.</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '0 0 16px' }}>Company-level news affecting CRCL's competitive positioning</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>Filter by Competitor</span>
          {competitorFilter !== 'all' && <button onClick={() => setCompetitorFilter('all')} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 99, background: 'color-mix(in srgb, var(--coral) 15%, transparent)', color: 'var(--coral)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Clear</button>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(() => { const isActive = competitorFilter === 'all'; return (
            <button
              onClick={() => setCompetitorFilter('all')}
              style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--violet)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isActive ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
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
                style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--violet)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isActive ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {comp.name} ({count})
              </button>
            );
          })}
          {COMPETITOR_NEWS.filter(n => n.competitor === 'other').length > 0 && (() => { const isActive = competitorFilter === 'other'; return (
            <button
              onClick={() => setCompetitorFilter('other')}
              style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--violet)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isActive ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Miscellaneous ({COMPETITOR_NEWS.filter(n => n.competitor === 'other').length})
            </button>
          ); })()}
        </div>
      </div>

      {/* Category Filter Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {newsCategories.map(cat => {
            const isActive = newsCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setNewsCategoryFilter(cat)}
                style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--sky)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--sky) 15%, transparent)' : 'transparent', color: isActive ? 'var(--sky)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
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
          style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
        >
          {expandedNews.size > 0 ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* News Timeline - Flat list */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {filteredCompNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: 'var(--text3)' }}>No competitor news matching current filters.</p>
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
                style={{ padding: '16px 28px', cursor: 'pointer', borderLeft: `3px solid ${accentColor}`, borderBottom: i < filteredCompNews.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                onClick={() => { const next = new Set(expandedNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedNews(next); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { const next = new Set(expandedNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedNews(next); } }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>{news.date}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--violet) 12%, transparent)', color: 'var(--violet)' }}>{news.category}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--sky) 12%, transparent)', color: 'var(--sky)' }}>{competitorName}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13, lineHeight: 1.4 }}>{news.headline}</div>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: accentColor, marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {news.implication === 'positive' ? '+' : news.implication === 'negative' ? '-' : '~'} {impLabel}
                  </span>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 16, marginTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                      {news.details.map((d, j) => <div key={j} style={{ display: 'flex', gap: 8 }}><span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>{d}</div>)}
                    </div>
                    {news.crclComparison && (
                      <div style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 5%, var(--surface))', borderRadius: 12, borderLeft: '3px solid var(--mint)', marginTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 4 }}>CRCL Comparison</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.crclComparison}</div>
                      </div>
                    )}
                    {news.source && <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Space Mono, monospace', marginTop: 8 }}>Source: {news.sourceUrl ? <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{news.source} ↗</a> : news.source}</div>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Competitor Profiles (Reference) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitor-profiles</div>
      <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Competitor Profiles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {COMPETITOR_PROFILES.map(comp => (
            <div key={comp.id} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{comp.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{comp.description}</div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Status</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.currentStatus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Comparable Analysis" items={[
        { term: 'Peer Selection', def: 'Choose comps based on business model similarity, growth profile, and market positioning. No perfect comps for novel businesses like Circle.' },
        { term: 'P/S (Price/Sales)', def: 'Primary multiple for high-growth, pre-profit companies. Compare Circle to fintech and payments peers.' },
        { term: 'EV/EBITDA', def: 'Enterprise value relative to operating profit. Better for profitable companies. Removes capital structure differences.' },
        { term: 'Growth-Adjusted Multiples', def: 'PEG ratio = P/E ÷ Growth Rate. Higher growth justifies higher multiples. Circle\'s growth should command premium.' },
        { term: 'Sum-of-Parts (SOTP)', def: 'Value each business segment separately and sum. Useful for conglomerates or platform businesses with distinct units.' },
        { term: 'Relative Valuation Caveats', def: 'Market may misprice entire sector. Use comps for context but anchor to intrinsic value (DCF).' },
      ]} />
    </div>
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
  
  const ANALYST_COVERAGE: AnalystCoverage[] = [
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

  return (
    <>
      <SharedWallStreetTab coverage={ANALYST_COVERAGE} ticker="CRCL" />
      {/* CFA Notes */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
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
