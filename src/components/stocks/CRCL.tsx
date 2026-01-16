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

import React, { useState, useMemo, useRef, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, ScatterChart, Scatter, Cell, ReferenceLine,
  BarChart, Bar, AreaChart, Area
} from 'recharts';

// Data imports - All hardcoded data extracted to separate files for easy AI updates
import {
  MARKET,
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

interface StatProps {
  label: string;
  value: string | number;
  color?: 'white' | 'cyan' | 'mint' | 'coral' | 'sky' | 'violet' | 'gold';
}

interface CardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'cyan' | 'emerald' | 'violet';
}

interface RowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
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
interface AnalystReportEntry {
  date: string;
  action: 'Initiation' | 'PT Raise' | 'PT Cut' | 'Upgrade' | 'Downgrade' | 'Maintained' | 'Update' | 'Reiterate' | 'Double Downgrade' | 'Drop';
  priceTarget: number | null;
  previousTarget?: number | null;
  rating: string;
  ratingNormalized: 'bullish' | 'neutral' | 'bearish';
  reportTitle?: string;
  source?: string;
  sourceUrl?: string;
  isFullReport: boolean;
  // Full report fields (only present when isFullReport = true)
  thesis?: string;
  reportSummary?: string;
  assumptions?: { label: string; value: string }[];
  catalysts?: string[];
  risks?: string[];
  estimates?: { metric: string; fy24?: string; fy25?: string; fy26?: string; fy27?: string; fy28?: string }[];
  methodology?: string;
  fullNotes?: string;
}

/** Analyst coverage by firm */
interface AnalystCoverage {
  firm: string;
  analyst: string;
  coverageSince: string;
  currentPT: number | null;
  currentRating: string;
  currentRatingNormalized: 'bullish' | 'neutral' | 'bearish';
  reports: AnalystReportEntry[];
}

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
          background: 'linear-gradient(135deg, rgba(255,123,114,0.1) 0%, rgba(255,123,114,0.05) 100%)',
          border: '1px solid rgba(255,123,114,0.3)',
          borderRadius: '16px',
          textAlign: 'center',
          margin: '20px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#FF7B72', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>
            Calculation Error
          </h2>
          <p style={{ color: '#8B949E', marginBottom: '20px', fontFamily: 'Outfit, sans-serif' }}>
            An error occurred in the financial model. This may be due to invalid input parameters.
          </p>
          <p style={{ color: '#8B949E', fontSize: '14px', fontFamily: 'Space Mono, monospace' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: '#10B981',
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
  probability: number;    // % probability weight
  description: string;
  keyAssumptions: string[];
  catalysts: string[];
  risks: string[];
  projections: ScenarioProjection[];
}

const SCENARIO_SIMULATIONS: Record<string, ScenarioDetail> = {
  worst: {
    name: 'Worst',
    color: '#ef4444',
    probability: 5,
    description: 'Regulatory crackdown, crypto winter 2.0, or major depegging event',
    keyAssumptions: [
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
    probability: 20,
    description: 'Slower adoption, rate cuts compress margins, competitive pressure intensifies',
    keyAssumptions: [
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
    probability: 45,
    description: 'Steady growth trajectory with favorable regulation and maintained market position',
    keyAssumptions: [
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
    probability: 22,
    description: 'Accelerated adoption, favorable regulation, Circle becomes dominant infrastructure',
    keyAssumptions: [
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
    probability: 8,
    description: 'USDC becomes global reserve digital currency, Circle achieves Visa-like network effects',
    keyAssumptions: [
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
  // Common projections
  { id: 'scenarios', label: 'Scenarios', type: 'projection' },
  { id: 'dcf', label: 'DCF', type: 'projection' },
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection' },
  { id: 'comps', label: 'Comps', type: 'projection' },
  // Tracking
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  /* ═══ UNIFIED DESIGN TOKENS (shared across ASTS/BMNR/CRCL) ═══ */
  /* Background & Surfaces */
  --bg: #05070A;
  --surface: #0D1117;
  --surface2: #161B22;
  --surface3: #21262D;
  --border: rgba(240,246,252,0.1);
  
  /* Typography */
  --text: #F0F6FC;
  --text2: #8B949E;
  --text3: #8B949E;
  
  /* Semantic Colors */
  --cyan: #22D3EE;
  --cyan-dim: rgba(34,211,238,0.15);
  --mint: #7EE787;
  --mint-dim: rgba(126,231,135,0.15);
  --coral: #FF7B72;
  --coral-dim: rgba(255,123,114,0.15);
  --sky: #79C0FF;
  --sky-dim: rgba(121,192,255,0.15);
  --gold: #D29922;
  --gold-dim: rgba(210,153,34,0.15);
  --violet: #A78BFA;
  --violet-dim: rgba(167,139,250,0.15);
  
  /* ═══ STOCK-SPECIFIC ACCENT (CRCL = mint) ═══ */
  --accent: var(--mint);
  --accent-dim: var(--mint-dim);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.stock-model-app {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  color: var(--text);
  overflow-x: hidden;
}

/* Hero Header */
.hero {
  position: relative;
  padding: 48px 64px 40px;
  background: linear-gradient(180deg, #0D1117 0%, var(--bg) 100%);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(126,231,135,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: start;
  position: relative;
  z-index: 1;
}

.brand-block h1 {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #fff 0%, #8B949E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-block .ticker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: var(--mint);
  background: var(--mint-dim);
  padding: 6px 14px;
  border-radius: 6px;
  margin-bottom: 24px;
}

.brand-block .desc {
  font-size: 16px;
  color: var(--text2);
  max-width: 480px;
  line-height: 1.6;
}

.price-block {
  text-align: right;
}

.price-big {
  font-family: 'Space Mono', monospace;
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 8px;
}

.price-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}

.price-badge.up { background: var(--mint-dim); color: var(--mint); }
.price-badge.down { background: var(--coral-dim); color: var(--coral); }

/* Stats Row */
.stats-row {
  display: flex;
  gap: 32px;
  padding: 32px 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}

.stat-item {
  flex-shrink: 0;
}

.stat-item .label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text3);
  margin-bottom: 4px;
}

.stat-item .val {
  font-family: 'Space Mono', monospace;
  font-size: 22px;
  font-weight: 600;
}

.stat-item .val.mint { color: var(--mint); }
.stat-item .val.sky { color: var(--sky); }

/* Navigation */
.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 64px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

.nav-btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text2);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-btn:hover {
  color: var(--text);
  background: var(--surface2);
}

.nav-btn.active {
  color: var(--bg);
  background: var(--mint);
  border-color: var(--mint);
}

/* Tab Type Indicators - Subtle left border to distinguish tracking vs projection tabs */
/* Consistent across all stocks: mint=tracking (actual data), violet=projection (user models) */
.nav-btn.tab-tracking {
  border-left: 3px solid var(--mint);
}
.nav-btn.tab-projection {
  border-left: 3px solid var(--violet);
}
.nav-btn.tab-tracking.active {
  border-left-color: var(--mint);
}
.nav-btn.tab-projection.active {
  border-left-color: var(--violet);
}

/* Dropdown Navigation - Stock-specific tabs in expandable menu */
.nav-dropdown {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
}
.nav-dropdown-trigger {
  border-left: 3px solid var(--violet);
  height: 44px;
  box-sizing: border-box;
}
.nav-dropdown-trigger .arrow {
  display: inline-block;
  width: 12px;
  text-align: center;
  font-size: 10px;
  line-height: 1;
}
.nav-dropdown-trigger.active {
  background: var(--violet);
  color: var(--bg);
}
.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: var(--surface);
  border: 1px solid var(--surface2);
  border-radius: 8px;
  padding: 8px 0;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  margin-top: 4px;
}
.nav-dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  font-size: 14px;
  color: var(--muted);
  background: none;
  border: none;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
}
.nav-dropdown-item:hover {
  background: var(--surface2);
  color: var(--text);
}
.nav-dropdown-item.active {
  background: var(--violet);
  color: var(--bg);
  border-left-color: var(--violet);
}
.nav-dropdown-item.tab-projection {
  border-left-color: var(--violet);
}
.nav-dropdown-item.tab-tracking {
  border-left-color: var(--mint);
}

/* Main Content */
.main {
  padding: 48px 64px;
  max-width: 1400px;
}

.section-head {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-head::before {
  content: '';
  width: 6px;
  height: 32px;
  background: var(--mint);
  border-radius: 3px;
}

/* Cards */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
}

.card-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text3);
  margin-bottom: 20px;
  font-weight: 600;
}

/* Grid Layouts */
.g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.g5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }

/* Highlight Boxes */
.highlight {
  background: linear-gradient(135deg, var(--mint-dim) 0%, transparent 100%);
  border: 1px solid rgba(126,231,135,0.2);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 32px;
}

.highlight h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--mint);
  margin-bottom: 12px;
}

.highlight p {
  color: var(--text2);
  line-height: 1.7;
  font-size: 15px;
}

/* Thesis Cards */
.thesis {
  padding: 28px;
  border-radius: 16px;
}

.thesis.bull {
  background: linear-gradient(135deg, rgba(126,231,135,0.08) 0%, transparent 100%);
  border: 1px solid rgba(126,231,135,0.15);
}

.thesis.bear {
  background: linear-gradient(135deg, rgba(255,123,114,0.08) 0%, transparent 100%);
  border: 1px solid rgba(255,123,114,0.15);
}

.thesis h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
}

.thesis.bull h4 { color: var(--mint); }
.thesis.bear h4 { color: var(--coral); }

.thesis ul {
  list-style: none;
  font-size: 14px;
  line-height: 2;
  color: var(--text2);
}

.thesis li::before {
  content: '→';
  margin-right: 10px;
  color: var(--text3);
}

/* Chart Bars */
.bars {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 220px;
  padding: 20px 0;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-val {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--text);
  margin-bottom: 8px;
  font-weight: 600;
}

.bar {
  width: 100%;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, var(--mint) 0%, #3FB950 100%);
  transition: all 0.3s ease;
  position: relative;
}

.bar:hover {
  filter: brightness(1.15);
  transform: scaleY(1.02);
  transform-origin: bottom;
}

.bar-label {
  font-size: 11px;
  color: var(--text3);
  margin-top: 10px;
  font-weight: 500;
}

/* Big Stats */
.big-stat {
  background: var(--surface2);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.big-stat .num {
  font-family: 'Space Mono', monospace;
  font-size: 36px;
  font-weight: 700;
  color: var(--mint);
  margin-bottom: 4px;
}

.big-stat .lbl {
  font-size: 13px;
  color: var(--text3);
}

/* Tables */
.tbl {
  width: 100%;
  border-collapse: collapse;
}

.tbl th, .tbl td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.tbl th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text3);
  font-weight: 600;
  background: var(--surface2);
}

.tbl th:first-child { border-radius: 10px 0 0 0; }
.tbl th:last-child { border-radius: 0 10px 0 0; }

.tbl td {
  font-family: 'Space Mono', monospace;
  font-size: 14px;
}

.tbl tr:hover td {
  background: var(--surface2);
}

.tbl .r { text-align: right; }
.tbl .mint { color: var(--mint); }
.tbl .coral { color: var(--coral); }
.tbl .sky { color: var(--sky); }
.tbl .cyan { color: var(--cyan); }
.tbl .violet { color: var(--violet); }
.tbl .gold { color: var(--gold); }

/* Timeline */
.timeline-item {
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.2s;
  background: var(--surface);
}

.timeline-item:hover {
  border-color: rgba(126,231,135,0.3);
}

.timeline-item.expanded {
  border-color: var(--mint);
  background: var(--surface2);
}

.timeline-header {
  display: grid;
  grid-template-columns: 100px 100px 1fr auto auto;
  gap: 16px;
  padding: 18px 20px;
  cursor: pointer;
  align-items: center;
  transition: background 0.2s;
}

.timeline-header:hover {
  background: var(--surface2);
}

.t-date {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: var(--mint);
  font-weight: 600;
}

.t-cat {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 600;
  background: var(--surface3);
  color: var(--text3);
  width: fit-content;
}

.t-event {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
  line-height: 1.5;
}

.t-verdict {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 12px;
  border-radius: 6px;
}

.t-verdict.positive {
  background: var(--mint-dim);
  color: var(--mint);
}

.t-verdict.negative {
  background: var(--coral-dim);
  color: var(--coral);
}

.t-verdict.mixed {
  background: var(--sky-dim);
  color: var(--sky);
}

.t-toggle {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text3);
  transition: all 0.2s;
}

.timeline-item.expanded .t-toggle {
  background: var(--mint);
  color: var(--bg);
  transform: rotate(180deg);
}

.timeline-details {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background: var(--surface2);
  border-top: 1px solid var(--border);
}

.timeline-item.expanded .timeline-details {
  max-height: 300px;
  padding: 20px;
}

.t-details-content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
}

.t-details-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text2);
}

.t-details-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 180px;
}

.t-meta-item {
  background: var(--surface3);
  padding: 12px 16px;
  border-radius: 8px;
}

.t-meta-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text3);
  margin-bottom: 4px;
}

.t-meta-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.t-meta-value.mint { color: var(--mint); }
.t-meta-value.coral { color: var(--coral); }
.t-meta-value.sky { color: var(--sky); }

.t-impact {
  font-size: 13px;
  color: var(--text3);
  line-height: 1.5;
}

/* Scenario Cards */
.scenario {
  background: var(--surface2);
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 28px;
  cursor: pointer;
  transition: all 0.25s;
  text-align: center;
}

.scenario:hover {
  border-color: var(--mint);
  transform: translateY(-4px);
}

.scenario.active {
  border-color: var(--mint);
  background: var(--mint-dim);
}

.scenario h4 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.scenario.bull h4 { color: var(--mint); }
.scenario.base h4 { color: var(--sky); }
.scenario.bear h4 { color: var(--coral); }

.scenario-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.scenario-row:last-child { border: none; }
.scenario-row span:first-child { color: var(--text3); }
.scenario-row span:last-child { font-family: 'Space Mono', monospace; }

/* Pills */
.pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.pill {
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text2);
  font-family: 'Outfit', sans-serif;
}

.pill:hover, .pill.active {
  background: var(--mint);
  color: var(--bg);
  border-color: var(--mint);
}

/* Range Slider */
.slider-wrap {
  margin-bottom: 24px;
}

.slider-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.slider-head span:first-child { color: var(--text2); }
.slider-head span:last-child { 
  font-family: 'Space Mono', monospace;
  color: var(--mint);
  font-weight: 600;
}

input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: var(--surface3);
  appearance: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--mint);
  cursor: pointer;
  box-shadow: 0 0 16px rgba(126,231,135,0.5);
}

/* Comp Row */
.comp-row {
  display: grid;
  grid-template-columns: 220px repeat(5, 1fr);
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
  align-items: center;
}

.comp-row:hover {
  background: var(--surface2);
}

.comp-row.head {
  background: var(--surface2);
  border-radius: 12px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text3);
  font-weight: 600;
}

.comp-name {
  font-weight: 600;
}

.comp-type {
  font-size: 12px;
  color: var(--text3);
}

.comp-val {
  font-family: 'Space Mono', monospace;
  text-align: right;
}

.comp-val.mint { color: var(--mint); }

/* Matrix */
.matrix {
  display: grid;
  gap: 2px;
  background: var(--border);
  border-radius: 12px;
  overflow: hidden;
  padding: 2px;
}

.matrix-cell {
  padding: 14px;
  text-align: center;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  background: var(--surface);
}

.matrix-cell.head {
  background: var(--surface2);
  font-weight: 600;
  color: var(--text3);
  font-family: 'Outfit', sans-serif;
}

.matrix-cell.hl {
  background: var(--mint-dim);
  color: var(--mint);
}

/* Button */
.btn {
  padding: 14px 32px;
  background: var(--mint);
  color: var(--bg);
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(126,231,135,0.3);
}

/* Monte Carlo */
.mc-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 280px;
  padding: 20px 0;
}

.mc-bar {
  flex: 1;
  background: var(--mint);
  opacity: 0.6;
  border-radius: 2px 2px 0 0;
  transition: all 0.2s;
}

.mc-bar:hover { opacity: 1; }
.mc-bar.hl { background: var(--gold); opacity: 1; }

/* Legal Disclaimer Banner */
.disclaimer-banner {
  background: linear-gradient(135deg, rgba(255,123,114,0.08) 0%, rgba(210,153,34,0.08) 100%);
  border-bottom: 1px solid rgba(255,123,114,0.2);
  padding: 12px 64px;
  font-size: 11px;
  line-height: 1.5;
}

.disclaimer-banner .disclaimer-title {
  color: var(--coral);
  font-weight: 700;
  margin-right: 6px;
}

.disclaimer-banner .disclaimer-text {
  color: var(--text2);
}

.disclaimer-banner .disclaimer-divider {
  margin: 0 12px;
  color: var(--border);
}

@media (max-width: 768px) {
  .disclaimer-banner { 
    padding: 10px 16px; 
    font-size: 10px;
  }
  .disclaimer-banner .disclaimer-divider {
    display: block;
    margin: 6px 0;
  }
}

/* Responsive */
@media (max-width: 1200px) {
  .hero, .stats-row, .nav, .main { padding-left: 32px; padding-right: 32px; }
  .g4 { grid-template-columns: repeat(2, 1fr); }
  .g5 { grid-template-columns: repeat(3, 1fr); }
  .timeline-header { grid-template-columns: 90px 1fr auto auto; }
  .timeline-header .t-cat { display: none; }
  .t-details-content { grid-template-columns: 1fr; }
  .t-details-meta { flex-direction: row; flex-wrap: wrap; }
  .t-meta-item { flex: 1; min-width: 140px; }
}

@media (max-width: 900px) {
  .timeline-header { grid-template-columns: 90px 1fr auto auto; }
  .timeline-header .t-cat { display: none; }
}

@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; gap: 24px; }
  .price-block { text-align: left; }
  .price-big { font-size: 36px; letter-spacing: -1px; }
  .brand-block h1 { font-size: 32px; }
  .g2, .g3, .g4, .g5 { grid-template-columns: 1fr; }
  .stats-row { gap: 24px; }
  .comp-row { grid-template-columns: 1fr 1fr; }
  .timeline-header { grid-template-columns: 1fr auto; gap: 12px; padding: 14px 16px; }
  .timeline-header .t-date, .timeline-header .t-cat { display: none; }
  .t-verdict { padding: 4px 8px; font-size: 10px; }
  .t-toggle { width: 28px; height: 28px; font-size: 14px; }
  .nav { padding: 12px 16px; gap: 6px; }
  .nav-btn { padding: 10px 16px; font-size: 13px; }
}

@media (max-width: 600px) {
  .timeline-header { grid-template-columns: 1fr auto; gap: 12px; padding: 14px 16px; }
  .timeline-header .t-date, .timeline-header .t-cat { display: none; }
  .t-verdict { padding: 4px 8px; font-size: 10px; }
  .t-toggle { width: 28px; height: 28px; font-size: 14px; }
  .t-details-content { grid-template-columns: 1fr; }
  .t-details-meta { flex-direction: row; flex-wrap: wrap; min-width: auto; }
}

/* Extra small mobile - consistent with ASTS/BMNR */
@media (max-width: 480px) {
  .hero { padding: 20px 12px 16px; }
  .price-big { font-size: 32px; }
  .brand-block h1 { font-size: 24px; }
  .brand-block .desc { font-size: 13px; line-height: 1.5; }

  .stats-row { padding: 16px 12px; gap: 16px; }
  .stat-item .val { font-size: 16px; }

  .nav { padding: 8px 10px; }
  .nav-btn { padding: 6px 10px; font-size: 11px; gap: 4px; }

  .main { padding: 16px 12px; }
  .card, .highlight { padding: 14px; }
  .section-head { font-size: 18px; }

  .table-scroll table { min-width: 400px; }
  table th, table td { padding: 6px 8px; font-size: 11px; }

  .g2, .g3, .g4 { gap: 12px; }
}
`;

// Card Component for unified risk metrics display
// N1: Memoized pure components for performance optimization
const Card = React.memo(({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
    green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', text: '#4ade80' },
    red: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
    yellow: { bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)', text: '#facc15' },
    purple: { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', text: '#c084fc' },
    orange: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', text: '#fb923c' },
    mint: { bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)', text: '#34d399' },
    emerald: { bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)', text: '#34d399' }
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div style={{ 
      background: c.bg, 
      border: `1px solid ${c.border}`, 
      borderRadius: '16px', 
      padding: '20px',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text3)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Space Mono', monospace", color: c.text, marginTop: '4px' }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
});
Card.displayName = 'Card';

// Input Component for adjustable parameters
const Input = React.memo(({ label, value, onChange, step = 1, min, max }: { label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number }) => (
  <div>
    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text3)', fontWeight: 600, marginBottom: '8px' }}>{label}</label>
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

// CFA Level III Educational Notes Component
const CFANotes = React.memo(({ title, items }: { title?: string; items: { term: string; def: string }[] }) => (
  <div style={{ marginTop: 24, padding: 20, background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>📚</span>
      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--mint)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title || 'CFA Level III — Key Concepts'}</h4>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, lineHeight: 1.6 }}>
      {items.map((item, i) => (
        <p key={i} style={{ margin: 0, color: 'var(--text2)' }}>
          <strong style={{ color: 'var(--mint)' }}>{item.term}:</strong> {item.def}
        </p>
      ))}
    </div>
  </div>
));
CFANotes.displayName = 'CFANotes';

function CRCLModel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [discount, setDiscount] = useState(12);
  const [scenario, setScenario] = useState('Base');
  const [timelineCat, setTimelineCat] = useState('All');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [runKey, setRunKey] = useState(0); // For Monte Carlo re-runs
  const [mcSims, setMcSims] = useState(1000); // Adjustable simulation count
  const [mcYears, setMcYears] = useState(5); // Time horizon (3/5/7 years)
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [secFilter, setSecFilter] = useState('All');
  const [showAllFilings, setShowAllFilings] = useState(false);
  const [capitalView, setCapitalView] = useState('structure');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAnalysisDropdownOpen(false);
      }
    };
    if (analysisDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [analysisDropdownOpen]);

  // Calculate dropdown position
  const handleDropdownToggle = () => {
    if (!analysisDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 4, left: rect.left });
    }
    setAnalysisDropdownOpen(!analysisDropdownOpen);
  };

  // Use imported SEC filings from @/data/crcl
  const secFilings = SEC_FILINGS;
  
  const secMeta = {
    cik: '0001876042',
    ticker: 'CRCL',
    exchange: 'NYSE',
    lastPR: { date: 'December 12, 2025', title: 'OCC National Bank Charter Approval' }
  };
  
  const secTypeColors: Record<string, { bg: string; text: string }> = {
    '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
    '10-Q': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
    '8-K': { bg: 'rgba(255,193,7,0.2)', text: 'var(--gold)' },
    'S-1': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
    'S-3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
    'S-8': { bg: 'rgba(0,212,170,0.2)', text: 'var(--mint)' },
    '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
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
  
  // Scenario Simulation State
  const [simTargetYear, setSimTargetYear] = useState(2027);
  const [simScenario, setSimScenario] = useState<ScenarioKey>('base');
  
  // Investment Tab State
  const [investmentSections, setInvestmentSections] = useState<Set<string>>(new Set(['summary', 'scorecard']));
  const [expandedArchive, setExpandedArchive] = useState<number | null>(null);
  
  // Rate Sensitivity Calculator State
  const [sensRate, setSensRate] = useState(4.0);  // Fed Funds Rate %
  const [sensUsdc, setSensUsdc] = useState(75);   // USDC Circulation $B
  const [sensDist, setSensDist] = useState(54);   // Coinbase Distribution %
  
  const toggleInvestmentSection = (section: string) => {
    const next = new Set(investmentSections);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    setInvestmentSections(next);
  };
  
  const expandAllInvestment = () => {
    setInvestmentSections(new Set(['summary', 'scorecard', 'financial', 'unit-economics', 'growth', 'valuation', 'sensitivity', 'moat', 'risks', 'catalysts', 'position', 'archive', 'strategic-assessment', 'methodology']));
  };
  
  const collapseAllInvestment = () => {
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

  const latest = DATA[DATA.length - 1];
  const prevYear = DATA.find(d => d.quarter === "Q3'24");
  const revGrowth = prevYear && prevYear.totalRevenue > 0 ? ((latest.totalRevenue - prevYear.totalRevenue) / prevYear.totalRevenue * 100) : 0;
  const usdcGrowth = prevYear && prevYear.usdcCirculation > 0 ? ((latest.usdcCirculation - prevYear.usdcCirculation) / prevYear.usdcCirculation * 100) : 0;
  const ipoReturn = MARKET.ipo > 0 ? ((MARKET.price - MARKET.ipo) / MARKET.ipo * 100) : 0;

  // Helper to ensure values are finite
  const safe = (v: number) => (isFinite(v) ? v : 0);

  // Monte Carlo simulation - auto-runs via useMemo
  const mcSim = useMemo(() => {
    const res: number[] = [];
    const discountFactor = Math.max(discount, 1);
    const p = mcPresets[mcPreset];
    const n = Math.min(mcSims, 10000); // Cap at 10k for performance
    for (let i = 0; i < n; i++) {
      const g = p.revMin + Math.random() * (p.revMax - p.revMin);
      const m = p.marginMin + Math.random() * (p.marginMax - p.marginMin);
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

  const calcDCF = () => {
    const s = SCENARIOS.find(x => x.name === scenario) || SCENARIOS[1];
    const fcfs: number[] = [];
    let circ = latest.usdcCirculation;
    const discountFactor = Math.max(discount, 1); // Ensure positive discount
    for (let y = 1; y <= 5; y++) {
      circ *= 1 + s.cagr / 100;
      const rev = circ * s.rate / 100;
      fcfs.push(rev * s.margin / 100 * 1000);
    }
    const pvFCF = fcfs.reduce((sum, f, i) => sum + f / Math.pow(1 + discountFactor/100, i + 1), 0);
    const tv = fcfs[4] * s.multiple;
    const pvTV = tv / Math.pow(1 + discountFactor/100, 5);
    const equity = pvFCF + pvTV + 1349 - 149;
    const pt = MARKET.shares > 0 ? equity / MARKET.shares : 0;
    const upside = MARKET.price > 0 ? (pt / MARKET.price - 1) * 100 : 0;
    return { fcfs, pvFCF: safe(pvFCF), tv: safe(tv), pvTV: safe(pvTV), equity: safe(equity), pt: safe(pt), upside: safe(upside) };
  };

  const dcf = calcDCF();
  const cats = ['All', ...Array.from(new Set(TIMELINE.map(p => p.category)))];
  const filteredEvents = (timelineCat === 'All' ? TIMELINE : TIMELINE.filter(p => p.category === timelineCat))
    .filter(p => {
      // If no topics selected, show all
      if (selectedTopics.length === 0) return true;
      // AND logic: entry must match ALL selected topics
      const entryTopics = detectTopics(p);
      return selectedTopics.every(t => entryTopics.includes(t));
    });

  // ===== COMPREHENSIVE COMPS DATA =====
  
  // Peer Groups
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
    revenuePerUSDC: (2.96 / 73.7 * 100).toFixed(2), // cents per dollar
    grossTakeRate: (1.68 / 60.8 * 100).toFixed(2), // reserve income / avg USDC
    distributionCostPct: (0.908 / 1.68 * 100).toFixed(1), // Coinbase share
    netTakeRate: ((1.68 - 0.908) / 60.8 * 100).toFixed(2), // after Coinbase
    rldcMargin: 39,
    reserveYield: 4.33, // from S-1
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
  const SENSITIVITY_USDC = [50, 75, 100, 125, 150]; // $B USDC
  const SENSITIVITY_RATES = [3.0, 3.5, 4.0, 4.5, 5.0]; // Fed funds %
  
  const calcSensitivity = (usdc: number, rate: number, multiple: number) => {
    const reserveIncome = usdc * (rate / 100);
    const netRevenue = reserveIncome * 0.45; // ~45% net after Coinbase
    return netRevenue * multiple;
  };

  // State for peer group selection
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string>('crypto');
  const [compMetric, setCompMetric] = useState<string>('ps');

  const currentPeers = PEER_GROUPS[selectedPeerGroup as keyof typeof PEER_GROUPS];

  // Legacy COMPS for backward compatibility
  const COMPS = [
    { name: 'Circle (CRCL)', type: 'Stablecoin', cap: 18.85, rev: 2.96, pe: 115, margin: 39 },
    { name: 'Tether', type: 'Stablecoin', cap: null, rev: 6.2, pe: null, margin: 85 },
    { name: 'Coinbase', type: 'Exchange', cap: 67, rev: 5.1, pe: 35, margin: 25 },
    { name: 'PayPal', type: 'Payments', cap: 85, rev: 31, pe: 20, margin: 18 },
    { name: 'Block', type: 'Payments', cap: 45, rev: 21, pe: 58, margin: 5 },
    { name: 'Visa', type: 'Network', cap: 580, rev: 35, pe: 31, margin: 67 },
  ];

  return (
    <>
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
                background: 'rgba(126,231,135,0.1)', 
                border: '1px solid rgba(126,231,135,0.3)', 
                borderRadius: 6, 
                padding: '4px 10px', 
                fontSize: 11, 
                color: '#7EE787',
                marginTop: 8,
                marginBottom: 16
              }}>
                <span>📅</span>
                <span>Data as of: {MODEL_METADATA.priceAsOf}</span>
                <span style={{ color: 'rgba(126,231,135,0.5)' }}>|</span>
                <span>Source: {MODEL_METADATA.dataSource}</span>
              </div>
              <p className="desc">
                Global financial technology company powering USDC, the world's second-largest stablecoin 
                with ${latest.usdcCirculation}B in circulation.
              </p>
            </div>
            <div className="price-block">
              <div className="price-big">${MARKET.price.toFixed(2)}</div>
              <span className={`price-badge ${ipoReturn >= 0 ? 'up' : 'down'}`}>
                {ipoReturn >= 0 ? '↑' : '↓'} {Math.abs(ipoReturn).toFixed(0)}% since IPO
              </span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="label">Market Cap</div>
            <div className="val">${(MARKET.marketCap / 1e9).toFixed(1)}B</div>
          </div>
          <div className="stat-item">
            <div className="label">USDC Circulation</div>
            <div className="val mint">${latest.usdcCirculation.toFixed(1)}B</div>
          </div>
          <div className="stat-item">
            <div className="label">Q3 Revenue</div>
            <div className="val">${latest.totalRevenue}M</div>
          </div>
          <div className="stat-item">
            <div className="label">RLDC Margin</div>
            <div className="val">{latest.rldcMargin}%</div>
          </div>
          <div className="stat-item">
            <div className="label">Market Share</div>
            <div className="val sky">{latest.marketShare}%</div>
          </div>
          <div className="stat-item">
            <div className="label">Reserve Rate</div>
            <div className="val">{latest.reserveReturnRate.toFixed(2)}%</div>
          </div>
          <div className="stat-item">
            <div className="label">P/E Ratio</div>
            <div className="val">{MARKET.pe.toFixed(0)}x</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="nav">
          {/* Tabs before dropdown */}
          {tabs.filter(t => !t.group && tabs.findIndex(x => x.group) > tabs.indexOf(t)).map(t => (
            <button
              key={t.id}
              className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}

          {/* Stock-specific dropdown */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className={`nav-btn nav-dropdown-trigger ${tabs.some(t => t.group && activeTab === t.id) ? 'active' : ''}`}
              onClick={() => setAnalysisDropdownOpen(!analysisDropdownOpen)}
            >
              CRCL Analysis <span className="arrow">{analysisDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {analysisDropdownOpen && (
              <div className="nav-dropdown-menu">
                {tabs.filter(t => t.group).map(t => (
                  <button
                    key={t.id}
                    className={`nav-dropdown-item ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
                    onClick={() => { setActiveTab(t.id); setAnalysisDropdownOpen(false); }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tabs after dropdown */}
          {tabs.filter(t => !t.group && tabs.findIndex(x => x.group) < tabs.indexOf(t)).map(t => (
            <button
              key={t.id}
              className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Main */}
        <main className="main">
          {activeTab === 'overview' && (
            <>
              <h2 className="section-head">Investment Thesis</h2>
              
              <div className="highlight">
                <h3>The Opportunity</h3>
                <p>
                  Circle is building financial infrastructure for the internet economy. USDC enables 24/7 
                  global value transfer at near-zero cost. With {latest.marketShare}% stablecoin market share 
                  and +{usdcGrowth.toFixed(0)}% YoY growth, Circle is positioned at the intersection of 
                  traditional finance and blockchain technology.
                </p>
              </div>

              <div className="g2">
                <div className="thesis bull">
                  <h4>↑ Bull Case</h4>
                  <ul>
                    <li>USDC +{usdcGrowth.toFixed(0)}% YoY, mgmt guides 40% CAGR</li>
                    <li>Market share: 23% → 29% in 12 months</li>
                    <li>Platform % at 13.5% (was 2%) improves unit economics</li>
                    <li>Intuit partnership brings ~100M user distribution</li>
                    <li>OCC National Trust Charter approval</li>
                    <li>GENIUS Act provides regulatory clarity</li>
                    <li>Arc + CPN creating new revenue verticals</li>
                  </ul>
                </div>
                <div className="thesis bear">
                  <h4>↓ Bear Case</h4>
                  <ul>
                    <li>96% revenue from reserve income (rate sensitive)</li>
                    <li>~60% of income shared with Coinbase</li>
                    <li>Tether dominant: 65% share, 85% margins</li>
                    <li>P/E of {MARKET.pe}x prices in substantial growth</li>
                    <li>Stock -73% from $299 peak</li>
                    <li>Bank stablecoins, PayPal competition</li>
                    <li>Fed rate cuts compress revenue</li>
                  </ul>
                </div>
              </div>

              <div className="card" style={{ marginTop: 32 }}>
                <div className="card-title">Revenue Progression</div>
                <div className="bars">
                  {DATA.map((d, i) => (
                    <div key={i} className="bar-col">
                      <div className="bar-val">${d.totalRevenue}M</div>
                      <div className="bar" style={{ height: `${(d.totalRevenue / 800) * 180}px` }} />
                      <div className="bar-label">{d.quarter}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="g4" style={{ marginTop: 32 }}>
                <Card label="USDC Growth" value={`+${usdcGrowth.toFixed(0)}%`} sub="Year over year" color="mint" />
                <Card label="Revenue Growth" value={`+${revGrowth.toFixed(0)}%`} sub="Year over year" color="green" />
                <Card label="Active Wallets" value={`${latest.meaningfulWallets}M`} sub="Meaningful wallets" color="blue" />
                <Card label="Arc Partners" value="100+" sub="Platform integrations" color="purple" />
              </div>
              
              <CFANotes title="CFA Level III — Stablecoin Economics" items={[
                { term: 'USDC Reserve Income', def: 'Circle earns interest on USDC reserves (T-bills, cash). $1 USDC outstanding = $1 in reserves earning ~4-5% in current rate environment.' },
                { term: 'Revenue = AUM × Rate', def: 'Revenue scales with both USDC circulation and interest rates. Fed rate cuts reduce revenue; USDC growth offsets.' },
                { term: 'Coinbase Distribution', def: 'Coinbase receives ~54% of USDC interest income per Centre agreement. Reduces Circle\'s take-rate but provides distribution.' },
                { term: 'Network Effects', def: 'More USDC usage → more integrations → more usage. Switching costs increase as ecosystem embeds USDC.' },
                { term: 'Regulatory Moat', def: 'US money transmitter licenses, potential federal stablecoin regulation creates barriers. Circle positioned for compliance.' },
              ]} />
            </>
          )}

          {activeTab === 'financials' && (
            <div className="flex flex-col gap-6">
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* UNIFIED FINANCIALS TAB - Canonical structure shared across all models */}
              {/* Only data and labels differ between ASTS, BMNR, and CRCL              */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 1: HEADER                                                   */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <h2 className="section-head">Financials</h2>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 2: HIGHLIGHT BOX                                            */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div className="highlight">
                <h3>Revenue Growth Story</h3>
                <p className="text-sm text-slate-300">
                  Circle's revenue is driven by reserve income (96%) from USDC holdings invested in T-bills and repos.
                  Distribution costs (~54%) go to Coinbase under the USDC consortium agreement. RLDC (Revenue Less 
                  Distribution Costs) represents true gross profit. Watch for margin expansion as Platform % grows.
                </p>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 3: KEY METRICS EVOLUTION                                    */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div className="card">
                <div className="card-title">Key Metrics Evolution</div>
                {/* Summary Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-900/30 border-cyan-600/40 border text-cyan-400">
                    {DATA.length} quarters of data ({DATA[0].quarter} - {DATA[DATA.length-1].quarter})
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-green-900/30 border-green-600/40 border text-green-400">
                    Revenue: ${DATA[0].totalRevenue}M → ${DATA[DATA.length-1].totalRevenue}M
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-900/30 border-blue-600/40 border text-blue-400">
                    Cash: ${(DATA[0].cashPosition/1000).toFixed(2)}B → ${(DATA[DATA.length-1].cashPosition/1000).toFixed(2)}B
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-900/30 border-violet-600/40 border text-violet-400">
                    USDC: ${DATA[0].usdcCirculation.toFixed(1)}B → ${DATA[DATA.length-1].usdcCirculation.toFixed(1)}B
                  </span>
                </div>
                
                {/* Quarterly Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 px-2 text-slate-400 sticky left-0 bg-slate-900 min-w-[120px]">Metric</th>
                        {DATA.map(d => (
                          <th key={d.quarter} className="text-right py-2 px-2 text-slate-400 min-w-[80px]">
                            {d.quarter}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Total Revenue</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-green-400">${d.totalRevenue}M</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Reserve Income</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-slate-300">${d.reserveIncome}M</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Distribution Costs</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-red-400">({d.distributionCosts})</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">RLDC</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-slate-300">${d.rldc}M</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">RLDC Margin</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-slate-300">{d.rldcMargin}%</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">OpEx</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-red-400">({d.opex})</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Adj. EBITDA</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-cyan-400">${d.adjustedEbitda}M</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Net Income</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className={`py-1.5 px-2 text-right tabular-nums ${d.netIncome >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {d.netIncome >= 0 ? `$${d.netIncome}M` : `($${Math.abs(d.netIncome)}M)`}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Cash Position</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-slate-300">${(d.cashPosition/1000).toFixed(2)}B</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">USDC Circulation</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-violet-400">${d.usdcCirculation.toFixed(1)}B</td>
                        ))}
                      </tr>
                      <tr className="border-t border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">Market Share</td>
                        {DATA.map(d => (
                          <td key={d.quarter} className="py-1.5 px-2 text-right tabular-nums text-slate-300">{d.marketShare}%</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Note: Q2'25 net loss includes $660M IPO-related SBC acceleration. Normalized EPS positive.
                </div>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 5: CHARTS ROW 1 - Cash Position & OpEx                      */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="text-sm font-medium text-cyan-400 mb-3">Cash Position Evolution</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={DATA.map(d => ({ quarter: d.quarter, cash: d.cashPosition }))}>
                      <defs>
                        <linearGradient id="cashGradientCRCL" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                      <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${(v/1000).toFixed(1)}B`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${(Number(v)/1000).toFixed(2)}B`, 'Cash']} />
                      <Area type="monotone" dataKey="cash" stroke="var(--mint)" fill="url(#cashGradientCRCL)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-slate-500 mt-2">Q2'25: +$218M IPO proceeds. Aug'25: +$260M follow-on.</div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="text-sm font-medium text-purple-400 mb-3">Quarterly Burn Rate (OpEx)</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={DATA.map(d => ({ quarter: d.quarter, opEx: d.opex }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                      <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${v}M`, 'OpEx']} />
                      <Line type="monotone" dataKey="opEx" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-slate-500 mt-2">Avg: ${(DATA.reduce((a, d) => a + d.opex, 0) / DATA.length).toFixed(0)}M/qtr</div>
                </div>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 6: CHARTS ROW 2 - Share Count & Market Cap                  */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="text-sm font-medium text-orange-400 mb-3">Share Count (Outstanding)</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={[
                      { quarter: 'IPO', shares: 200 },
                      { quarter: "Q2'24", shares: 205 },
                      { quarter: "Q3'24", shares: 210 },
                      { quarter: "Q4'24", shares: 215 },
                      { quarter: "Q1'25", shares: 220 },
                      { quarter: "Q2'25", shares: 225 },
                      { quarter: "Q3'25", shares: 230 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                      <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `${v}M`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`${v}M shares`, 'Outstanding']} />
                      <Bar dataKey="shares" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-slate-500 mt-2">Dilution from IPO + Follow-on + SBC vesting</div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="text-sm font-medium text-blue-400 mb-3">Market Cap Evolution ($B)</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={[
                      { quarter: 'IPO', mktCap: 7.1 },
                      { quarter: "Q2'24", mktCap: 8.2 },
                      { quarter: "Q3'24", mktCap: 10.5 },
                      { quarter: "Q4'24", mktCap: 12.8 },
                      { quarter: "Q1'25", mktCap: 15.2 },
                      { quarter: "Q2'25", mktCap: 14.1 },
                      { quarter: "Q3'25", mktCap: 18.8 },
                    ]}>
                      <defs>
                        <linearGradient id="mcapGradientCRCL" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                      <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}B`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${Number(v).toFixed(1)}B`, 'Market Cap']} />
                      <Area type="monotone" dataKey="mktCap" stroke="#3b82f6" fill="url(#mcapGradientCRCL)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-slate-500 mt-2">IPO: $31/share → Current: ~$80/share (+158%)</div>
                </div>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 7: CHARTS ROW 3 - Company Specific (USDC & EBITDA)          */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="text-sm font-medium text-violet-400 mb-3">USDC Circulation ($B)</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={DATA.map(d => ({ quarter: d.quarter, usdc: d.usdcCirculation }))}>
                      <defs>
                        <linearGradient id="usdcGradientCRCL" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                      <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}B`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${Number(v).toFixed(1)}B`, 'USDC']} />
                      <Area type="monotone" dataKey="usdc" stroke="#8b5cf6" fill="url(#usdcGradientCRCL)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-slate-500 mt-2">Market share: {DATA[0].marketShare}% → {DATA[DATA.length-1].marketShare}%</div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                  <h4 className="text-sm font-medium text-cyan-400 mb-3">Adjusted EBITDA ($M)</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={DATA.map(d => ({ quarter: d.quarter, ebitda: d.adjustedEbitda }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                      <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${v}M`, 'Adj. EBITDA']} />
                      <Bar dataKey="ebitda" fill="#22d3ee" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-slate-500 mt-2">EBITDA Margin: {((DATA[DATA.length-1].adjustedEbitda / DATA[DATA.length-1].totalRevenue) * 100).toFixed(0)}% (Q3'25)</div>
                </div>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 8: KEY FINANCIAL MILESTONES                                 */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="text-sm font-medium text-yellow-400 mb-3">📅 Key Financial Milestones</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
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
                    <div key={i} className="p-2 bg-slate-800/50 rounded">
                      <div className="text-slate-500">{m.date}</div>
                      <div className="text-slate-300">{m.event}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* ═══════════════════════════════════════════════════════════════════ */}
              {/* SECTION 9: CFA NOTES                                                */}
              {/* ═══════════════════════════════════════════════════════════════════ */}
              <CFANotes title="CFA Level III — Financial Analysis" items={[
                { term: 'Revenue Growth', def: 'Track YoY and QoQ trends. High growth justifies premium multiples. Deceleration is a key risk signal.' },
                { term: 'Gross Margin', def: 'Revenue minus direct costs. Circle\'s stablecoin business has near-100% gross margin on interest income.' },
                { term: 'Adjusted EBITDA', def: 'Operating profitability excluding non-cash items. Key metric for pre-IPO companies. Compare to peers.' },
                { term: 'Operating Leverage', def: 'Fixed costs spread over growing revenue = expanding margins. Circle showing strong leverage as USDC scales.' },
                { term: 'Unit Economics', def: 'Revenue per wallet, cost per transaction. Improving unit economics indicate sustainable growth.' },
                { term: 'Cash Flow', def: 'Ultimately matters more than accounting profit. Track operating cash flow and capital intensity.' },
              ]} />
            </div>
          )}

          {activeTab === 'investment' && (
            <>
              {/* Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 className="section-head" style={{ marginBottom: 0 }}>Investment Analysis</h2>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button onClick={expandAllInvestment} className="pill" style={{ fontSize: 11 }}>⊞ Expand All</button>
                  <button onClick={collapseAllInvestment} className="pill" style={{ fontSize: 11 }}>⊟ Collapse All</button>
                </div>
              </div>

              {/* Data Refresh Indicator */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, marginBottom: 16, fontSize: 11, color: 'var(--text3)' }}>
                <span>Data as of: <strong style={{ color: 'var(--text2)' }}>{MODEL_METADATA.lastUpdated}</strong></span>
                <span>•</span>
                <span>Source: <strong style={{ color: 'var(--text2)' }}>{MODEL_METADATA.dataSource}</strong></span>
                <span>•</span>
                <span>Latest Filing: <strong style={{ color: 'var(--text2)' }}>{MODEL_METADATA.latestFiling}</strong></span>
              </div>

              {/* Sticky Header */}
                  <div className="card" style={{ borderLeft: '4px solid var(--mint)', marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <span style={{ 
                            background: 'var(--mint)', 
                            color: 'var(--bg)', 
                            padding: '8px 20px', 
                            borderRadius: 6, 
                            fontWeight: 700,
                            fontSize: 18 
                          }}>OVERWEIGHT</span>
                          <span style={{ 
                            background: 'rgba(0,212,170,0.15)', 
                            color: 'var(--mint)', 
                            padding: '6px 12px', 
                            borderRadius: 4, 
                            fontSize: 12,
                            fontWeight: 600
                          }}>HIGH CONVICTION</span>
                        </div>
                        <div style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 500 }}>
                          Regulated stablecoin infrastructure play with TradFi optionality, trading at 50% discount to payment network peers
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>
                          Last Updated: Dec 31, 2025 • Trigger: Q3'25 10-Q, OCC Charter Approval
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Price Target</div>
                          <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--mint)', fontWeight: 700 }}>$90-150</div>
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

                  {/* Investment Scorecard - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('scorecard')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('scorecard')}
                      aria-label="Toggle Investment Scorecard"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('scorecard')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Investment Scorecard</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('scorecard') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('scorecard') && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                          {[
                            { category: 'Balance Sheet', rating: 'A+', color: 'var(--mint)', detail: 'Net cash, zero debt, FCF+' },
                            { category: 'Profitability', rating: 'B+', color: 'var(--sky)', detail: '39% RLDC, Coinbase overhang' },
                            { category: 'Growth', rating: 'A', color: 'var(--mint)', detail: '66% rev, 108% USDC YoY' },
                            { category: 'Valuation', rating: 'A-', color: 'var(--mint)', detail: '6.4x P/S, Rule of 40: 105' },
                            { category: 'Competitive Moat', rating: 'B+', color: 'var(--sky)', detail: 'Regulatory edge, Tether leads' },
                            { category: 'Management', rating: 'A', color: 'var(--mint)', detail: 'Strong board, founder-led' },
                            { category: 'Regulatory Risk', rating: 'B', color: 'var(--sky)', detail: 'GENIUS Act +, OCC pending' },
                            { category: 'Shareholder Align', rating: 'A-', color: 'var(--mint)', detail: 'Class B founders, CB stake' },
                          ].map((item, i) => (
                            <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

                  {/* Executive Summary - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('summary')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('summary')}
                      aria-label="Toggle Executive Summary"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('summary')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Executive Summary</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('summary') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('summary') && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ background: 'rgba(0,212,170,0.05)', padding: 16, borderRadius: 8, marginBottom: 16, border: '1px solid rgba(0,212,170,0.2)' }}>
                          <div style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>What's New (Dec 2025)</div>
                          <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 13, lineHeight: 1.8 }}>
                            <li>OCC conditional approval for National Trust Charter — first digital currency bank</li>
                            <li>Q3'25 beat: Revenue +66% YoY, USDC $73.7B (+108%), raised RLDC guidance to 38-40%</li>
                            <li>Intuit partnership announced — potential ~100M user distribution</li>
                            <li>Lock-up expiry imminent (~198M shares) — monitoring insider behavior</li>
                          </ul>
                        </div>
                        <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong>Thesis:</strong> Circle has successfully transitioned from crypto infrastructure to TradFi-adjacent payments network. The combination of regulatory moat (GENIUS Act + OCC charter), accelerating USDC adoption, and platform expansion (CPN with 29 FIs, Arc with 100+ testnet partners) creates asymmetric upside.
                          </p>
                          <p style={{ marginBottom: 12 }}>
                            <strong>Key Numbers:</strong> $2.96B TTM revenue (+66% YoY) • $73.7B USDC (+108% YoY) • 39% RLDC margin • $1.15B cash • Zero debt • FCF positive
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong>Position Sizing:</strong> 3-5% for growth portfolios • 1-2% for balanced • Avoid for income-focused (no dividend)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Health - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('financial')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('financial')}
                      aria-label="Toggle Financial Health"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('financial')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Financial Health</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('financial') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('financial') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Quick Stats */}
                        <div className="g4" style={{ marginBottom: 16 }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Cash Position</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>$1.15B</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Total Debt</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>$0</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Quarterly FCF</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>~$140M</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Dilution Risk</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>LOW</div>
                          </div>
                        </div>
                        
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--mint)' }}>Liquidity:</strong> Exceptional. $1.15B cash with zero debt creates fortress balance sheet. Asset-light model requires minimal working capital. Generating ~$140M quarterly FCF provides infinite runway for organic growth.
                          </p>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--sky)' }}>Leverage:</strong> None. Company raised $2.5B across IPO ($1.21B) and follow-on ($1.3B) without adding debt. Only liability is a legacy $15.7M convertible note from 2019 SeedInvest round at $16.23 conversion — converts to &lt;1M shares, immaterial dilution.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--gold)' }}>Capital Needs:</strong> None foreseeable. FCF positive operations fund growth organically. S-3ASR shelf registration active as WKSI status provides flexibility for opportunistic M&A, but no equity raise expected. Self-funding trajectory intact.
                          </p>
                        </div>

                        {/* Assessment */}
                        <div style={{ padding: 12, background: 'rgba(0,212,170,0.1)', borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
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

                  {/* Unit Economics - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('unit-economics')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('unit-economics')}
                      aria-label="Toggle Unit Economics"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('unit-economics')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Unit Economics & Margins</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('unit-economics') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('unit-economics') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Key Metrics Row */}
                        <div className="g4" style={{ marginBottom: 16 }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Net Take Rate</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>1.27%</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>RLDC Margin</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>39%</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Coinbase Cost</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--coral)', fontWeight: 700 }}>54%</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>EBITDA Margin</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)', fontWeight: 700 }}>22%</div>
                          </div>
                        </div>

                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--mint)' }}>Revenue Model:</strong> Circle earns ~4¢ per dollar of USDC in circulation annually through reserve yield (T-bills, repos). At $73.7B circulation, this generates ~$2.96B TTM revenue. The model is highly scalable with near-zero marginal cost per additional USDC dollar.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--coral)' }}>Margin Pressure:</strong> Coinbase receives ~54% of reserve income as distribution cost — the single largest expense item. This creates a structural margin cap, but the partnership ensures distribution to Coinbase's 100M+ users. RLDC margin (39%) is healthy; OpEx ratio (17%) declining with scale.
                          </p>
                        </div>

                        {/* Coinbase Sensitivity */}
                        <div style={{ padding: 16, background: 'rgba(255,193,7,0.1)', borderRadius: 8, border: '1px solid rgba(255,193,7,0.2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Coinbase Sensitivity Analysis</span>
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
                            If Coinbase cost reduced from 54% → 45%: RLDC margin expands from 39% → 48% (+$67M/qtr at current revenue). Each 5% reduction in Coinbase share adds ~$37M quarterly profit.
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                            <strong>Renegotiation Leverage:</strong> Coinbase equity stake aligns incentives. Diversifying distribution (Binance 240M users, OKX 60M, Kraken) reduces dependency. CPN direct bank relationships bypass exchange distribution entirely.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Growth Drivers - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('growth')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('growth')}
                      aria-label="Toggle Growth Drivers"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('growth')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Growth Drivers</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('growth') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('growth') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--mint)' }}>USDC Momentum:</strong> Circulation grew from $32.3B (Q2'24) to $73.7B (Q3'25) — a 128% increase in 18 months. Growth is accelerating: +20% QoQ in Q3'25 vs +18% in Q2'25. The flywheel is working as more integrations drive more use cases drive more circulation.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--sky)' }}>Geographic Diversification:</strong> Circle is methodically obtaining licenses globally to reduce US concentration risk. MiCA compliance in Europe, FSA registration in Japan, and partnerships in LatAm (Nubank 100M+ users) and MENA create multiple growth vectors.
                          </p>
                        </div>

                        {/* Expansion Vectors */}
                        <h4 style={{ color: 'var(--sky)', marginBottom: 12 }}>Expansion Vectors</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                          {[
                            { region: 'US (Core)', status: 'Dominant', color: 'var(--mint)' },
                            { region: 'Europe (MiCA)', status: 'Growing', color: 'var(--mint)' },
                            { region: 'Japan (FSA)', status: 'Launched Mar\'25', color: 'var(--mint)' },
                            { region: 'LatAm (Brazil)', status: 'Nubank 100M+', color: 'var(--sky)' },
                            { region: 'MENA (UAE)', status: 'ADGM licensed', color: 'var(--sky)' },
                            { region: 'APAC (Singapore)', status: 'MPI License', color: 'var(--sky)' },
                          ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}>
                              <span style={{ color: 'var(--text2)' }}>{item.region}</span>
                              <span style={{ color: item.color, fontWeight: 500 }}>{item.status}</span>
                            </div>
                          ))}
                        </div>

                        {/* Platform & Product Expansion */}
                        <h4 style={{ color: 'var(--violet)', marginBottom: 12 }}>Platform & Product Expansion</h4>
                        <div className="g3" style={{ marginBottom: 16 }}>
                          {[
                            { product: 'CPN', desc: 'Cross-border payments network', status: '29 FIs, $3.4B vol', color: 'var(--mint)' },
                            { product: 'Arc', desc: 'L1 blockchain for finance', status: '100+ testnet', color: 'var(--sky)' },
                            { product: 'USYC', desc: 'Tokenized money market', status: '$1.5B+ AUM', color: 'var(--mint)' },
                          ].map((p, i) => (
                            <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8 }}>
                              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{p.product}</div>
                              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{p.desc}</div>
                              <div style={{ fontSize: 13, color: p.color, fontWeight: 500 }}>{p.status}</div>
                            </div>
                          ))}
                        </div>

                        {/* TAM Expansion */}
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8, fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>
                          <strong>TAM Expansion:</strong> Stablecoin market currently ~$250B. Bull case: $1-2T by 2030 as stablecoins capture share of $150T+ global payments, FX settlement, and collateral markets. Circle targeting 25-35% market share.
                        </div>

                        {/* Ethereum Ecosystem Catalyst */}
                        <h4 style={{ color: 'var(--gold)', marginBottom: 12 }}>Ethereum Ecosystem Catalyst</h4>
                        <div style={{ padding: 12, background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,212,170,0.1))', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text2)' }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--violet)' }}>On-Chain Growth Thesis:</strong> As more companies build on Ethereum (DeFi, tokenization, payments, gaming), on-chain transaction volume increases. USDC is the dominant stablecoin for DeFi settlement and on-chain payments — more Ethereum activity directly drives USDC circulation and Circle revenue.
                          </p>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--mint)' }}>USDC Dominance:</strong> ~70% of on-chain stablecoin volume on Ethereum flows through USDC. Every new DeFi protocol, tokenized asset, or on-chain payment rail increases USDC utility and sticky demand.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--sky)' }}>Cross-Portfolio Note:</strong> This thesis is doubly bullish for portfolios holding both CRCL and BMNR — Ethereum adoption drives both USDC demand (CRCL revenue) and ETH price appreciation (BMNR NAV). The positions are positively correlated through Ethereum ecosystem growth.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Valuation Framework - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('valuation')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('valuation')}
                      aria-label="Toggle Valuation Framework"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('valuation')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Valuation Framework</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('valuation') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('valuation') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Key Metrics */}
                        <div className="g4" style={{ marginBottom: 8 }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>P/S Multiple*</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>6.4x</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Rule of 40</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>105</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Fair Value</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)', fontWeight: 700 }}>$100-150</div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Expected Return</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>+56%</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 16, fontStyle: 'italic' }}>
                          * P/S based on Q3'25 annualized run-rate revenue ($2.96B). TTM P/S (Q4'24–Q3'25) is 7.8x.
                        </div>

                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--mint)' }}>Peer Comparison:</strong> Circle trades at 6.4x P/S — a ~60% discount to Visa/Mastercard (16-17x) despite 6x higher revenue growth (66% vs 10%). Even Coinbase trades at 13.1x with lower growth (30%). Circle's Rule of 40 score of 105 (66% growth + 39% margin) is exceptional for any SaaS/fintech company.
                          </p>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--sky)' }}>Discount Drivers:</strong> The valuation gap reflects three factors: (1) crypto association risk premium (~20% discount), (2) Coinbase margin uncertainty (~20% discount), (3) interest rate sensitivity (~10% discount). As these concerns diminish, multiple expansion is likely.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--gold)' }}>Scenario Analysis:</strong> Probability-weighted expected value is $128 (+56% upside). Bear case ($50, 20% prob) assumes rate cuts + Tether parity. Base case ($120, 50% prob) reflects continued execution. Bull case ($200, 25% prob) assumes CPN/Arc traction. Moon case ($350, 5% prob) assumes stablecoin market 5x expansion.
                          </p>
                        </div>

                        {/* Methodology */}
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8, fontSize: 13, color: 'var(--text2)' }}>
                          <strong>Methodology:</strong> P/S-based valuation anchored on payment network comparables. Fair value range 10-12x P/S implies $100-150 target. DCF (12% WACC, 3% terminal growth) supports similar range. SOTP analysis adds $10-20 optionality value for CPN/Arc platforms.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rate Sensitivity Calculator - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('sensitivity')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('sensitivity')}
                      aria-label="Toggle Rate Sensitivity Calculator"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('sensitivity')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Rate Sensitivity Calculator</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('sensitivity') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('sensitivity') && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16, fontStyle: 'italic' }}>
                          Adjust assumptions to see implied financial impact. Calculations based on current model structure.
                        </div>

                        {/* Sliders */}
                        <div className="g3" style={{ marginBottom: 24 }}>
                          {/* Fed Funds Rate */}
                          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                              <span>1%</span>
                              <span>6%</span>
                            </div>
                          </div>

                          {/* USDC Circulation */}
                          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                              <span>$40B</span>
                              <span>$150B</span>
                            </div>
                          </div>

                          {/* Coinbase Distribution */}
                          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                              <span>30%</span>
                              <span>70%</span>
                            </div>
                          </div>
                        </div>

                        {/* Calculated Outputs */}
                        <div className="g4" style={{ marginBottom: 16 }}>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Implied Revenue</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>
                              ${((sensUsdc * sensRate / 100)).toFixed(1)}B
                            </div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>RLDC (Gross Profit)</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--mint)', fontWeight: 700 }}>
                              ${((sensUsdc * sensRate / 100) * (1 - sensDist / 100)).toFixed(2)}B
                            </div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>RLDC Margin</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: sensRate >= 3 && sensDist <= 50 ? 'var(--mint)' : 'var(--gold)', fontWeight: 700 }}>
                              {(100 - sensDist).toFixed(0)}%
                            </div>
                          </div>
                          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est. EBITDA</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: 'var(--sky)', fontWeight: 700 }}>
                              ${((sensUsdc * sensRate / 100) * (1 - sensDist / 100) * 0.55).toFixed(2)}B
                            </div>
                          </div>
                        </div>

                        {/* Fair Value Estimate */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1) 0%, rgba(100,149,237,0.1) 100%)', padding: 16, borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            <div>
                              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Implied Fair Value (8x P/S)</div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 28, color: 'var(--mint)', fontWeight: 700 }}>
                                ${((sensUsdc * sensRate / 100) * 8 / 0.23).toFixed(0)}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>vs. Current ($82)</div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 18, color: ((sensUsdc * sensRate / 100) * 8 / 0.23) > 82 ? 'var(--mint)' : 'var(--coral)', fontWeight: 600 }}>
                                {((((sensUsdc * sensRate / 100) * 8 / 0.23) - 82) / 82 * 100) > 0 ? '+' : ''}{((((sensUsdc * sensRate / 100) * 8 / 0.23) - 82) / 82 * 100).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Methodology Note */}
                        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text3)', fontStyle: 'italic' }}>
                          Note: Revenue = USDC × Rate. RLDC = Revenue × (1 − Distribution%). EBITDA assumes 55% of RLDC after OpEx. Fair value uses 8x P/S on 229M shares. Simplified model — actual results may vary.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Competitive Moat - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('moat')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('moat')}
                      aria-label="Toggle Competitive Moat"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('moat')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Competitive Moat</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('moat') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('moat') && (
                      <div style={{ marginTop: 16 }}>
                        <div className="g2">
                          <div>
                            <h4 style={{ color: 'var(--mint)', marginBottom: 12 }}>Moat Sources</h4>
                            {[
                              { source: 'Regulatory Licenses', strength: 'Strong', detail: '48 US states + MiCA + Japan FSA + OCC pending', color: 'var(--mint)' },
                              { source: 'Network Effects', strength: 'Growing', detail: '15 chains, 6.3M wallets, $12T+ settled', color: 'var(--sky)' },
                              { source: 'Trust & Transparency', strength: 'Strong', detail: 'Monthly attestations, 100% reserves, no depeg (ex-SVB)', color: 'var(--mint)' },
                              { source: 'TradFi Integration', strength: 'Building', detail: 'ICE, Visa, FIS, Fiserv partnerships', color: 'var(--sky)' },
                              { source: 'Developer Ecosystem', strength: 'Moderate', detail: 'CCTP, Programmable Wallets, Web3 Services', color: 'var(--gold)' },
                            ].map((m, i) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface2)', borderRadius: 6, marginBottom: 8 }}>
                                <div>
                                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{m.source}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.detail}</div>
                                </div>
                                <span style={{ color: m.color, fontWeight: 600, fontSize: 12 }}>{m.strength}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 style={{ color: 'var(--coral)', marginBottom: 12 }}>Competitive Threats</h4>
                            {[
                              { threat: 'Tether (USDT)', risk: 'High', detail: '65% market share, $140B+ circulation', color: 'var(--coral)' },
                              { threat: 'PayPal (PYUSD)', risk: 'Medium', detail: '$1B circulation, 400M user base', color: 'var(--gold)' },
                              { threat: 'Bank Stablecoins', risk: 'Medium', detail: 'JPM Coin, potential Fed/CBDC', color: 'var(--gold)' },
                              { threat: 'CBDCs', risk: 'Low-Med', detail: 'EU/UK in development, 3-5yr timeline', color: 'var(--sky)' },
                              { threat: 'New Entrants', risk: 'Low', detail: 'Regulatory barriers high post-GENIUS', color: 'var(--mint)' },
                            ].map((t, i) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface2)', borderRadius: 6, marginBottom: 8 }}>
                                <div>
                                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{t.threat}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.detail}</div>
                                </div>
                                <span style={{ color: t.color, fontWeight: 600, fontSize: 12 }}>{t.risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ marginTop: 16, padding: 12, background: 'var(--surface2)', borderRadius: 8, fontSize: 13, color: 'var(--text2)' }}>
                          <strong>Moat Durability:</strong> B+ (Moderate-Strong). Regulatory moat strengthening but Tether's scale advantage persists. Key differentiator is TradFi trust — Circle is the only stablecoin issuer with major bank/exchange partnerships. Moat widens if CPN/Arc achieve enterprise adoption.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Risk Matrix - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('risks')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('risks')}
                      aria-label="Toggle Risk Matrix"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('risks')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Risk Matrix</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('risks') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('risks') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--coral)' }}>High Impact Risks:</strong> Interest rate sensitivity remains the primary concern — if Fed cuts to sub-3%, reserve income compresses faster than volume can grow. Coinbase renegotiation failure would cap margins permanently. Regulatory reversal (low probability) would be existential. Smart contract exploits are tail risks mitigated by audits and multi-sig.
                          </p>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--gold)' }}>Medium Impact Risks:</strong> Tether achieving transparency parity would eliminate Circle's trust premium in crypto-native markets. Lock-up expiry (Dec 2025) creates near-term supply pressure with ~198M shares eligible for sale — likely temporary given fundamental momentum.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--mint)' }}>Risk Mitigants:</strong> Multi-jurisdiction licensing reduces regulatory concentration. Distribution diversification (Binance, OKX, Kraken) reduces Coinbase dependency. USYC yield products provide revenue diversification beyond reserve income. OCC charter creates regulatory moat. Volume growth historically offsets rate compression.
                          </p>
                        </div>

                        {/* Risk Assessment */}
                        <div style={{ padding: 12, background: 'rgba(255,193,7,0.1)', borderRadius: 8, border: '1px solid rgba(255,193,7,0.2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Overall Risk Assessment: MODERATE</span>
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                            Circle's risk profile has improved significantly since IPO. Balance sheet strength, regulatory progress, and distribution diversification reduce company-specific risks. Primary exposures are now macro (rates) and competitive (Tether, banks) — both manageable with current growth trajectory.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Catalyst Calendar - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('catalysts')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('catalysts')}
                      aria-label="Toggle Catalyst Calendar"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('catalysts')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Catalyst Calendar</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('catalysts') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('catalysts') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Summary */}
                        <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--coral)' }}>Near-Term (Dec 2025):</strong> Lock-up expiry is the most immediate catalyst — ~198M shares become eligible for sale. Watch insider selling percentage and price support levels. Historically, strong-performing IPOs see limited insider selling if fundamentals remain intact.
                          </p>
                          <p style={{ marginBottom: 12 }}>
                            <strong style={{ color: 'var(--mint)' }}>H1 2026:</strong> Multiple positive catalysts converge. Q4/FY25 earnings (Feb) will provide first full-year numbers and 2026 guidance. Arc mainnet launch will demonstrate platform revenue potential. OCC charter finalization would provide Fed master account pathway — transformative for institutional adoption.
                          </p>
                          <p style={{ marginBottom: 0 }}>
                            <strong style={{ color: 'var(--sky)' }}>Longer-Term:</strong> Coinbase distribution cost renegotiation timing uncertain but represents significant margin expansion optionality. S&P 500 inclusion possible once GAAP profitability criteria met — would trigger substantial index fund buying (~$2-3B estimated).
                          </p>
                        </div>

                        {/* Key Dates */}
                        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
                          <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Key Dates to Watch</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {[
                              { event: 'Lock-up Expiry', date: 'Dec 2025', color: 'var(--coral)' },
                              { event: 'Q4/FY25 Earnings', date: 'Feb 2026', color: 'var(--mint)' },
                              { event: 'Arc Mainnet', date: 'H1 2026', color: 'var(--mint)' },
                              { event: 'OCC Charter', date: 'H1 2026', color: 'var(--mint)' },
                            ].map((c, i) => (
                              <div key={i} style={{ background: 'var(--bg)', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>
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

                  {/* Position Management - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('position')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('position')}
                      aria-label="Toggle Position Management"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('position')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Position Management</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('position') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('position') && (
                      <div style={{ marginTop: 16 }}>
                        <div className="g3">
                          <div style={{ background: 'rgba(0,212,170,0.1)', padding: 16, borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)' }}>
                            <div style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>Entry Zones</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                              <div>$75-80: Current (hold)</div>
                              <div>$65-70: Add on weakness</div>
                              <div>$55-60: Aggressive accumulate</div>
                            </div>
                          </div>
                          <div style={{ background: 'rgba(255,107,107,0.1)', padding: 16, borderRadius: 8, border: '1px solid rgba(255,107,107,0.2)' }}>
                            <div style={{ fontWeight: 600, color: 'var(--coral)', marginBottom: 8 }}>Risk Management</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                              <div>Stop-loss: $50 (-39%)</div>
                              <div>Max position: 5% of portfolio</div>
                              <div>Risk per trade: 1-2%</div>
                            </div>
                          </div>
                          <div style={{ background: 'rgba(100,149,237,0.1)', padding: 16, borderRadius: 8, border: '1px solid rgba(100,149,237,0.2)' }}>
                            <div style={{ fontWeight: 600, color: 'var(--sky)', marginBottom: 8 }}>Take Profit Levels</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                              <div>$100: Trim 20%</div>
                              <div>$130: Trim 25%</div>
                              <div>$150+: Hold core (50%)</div>
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: 16, padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
                          <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Position Sizing by Risk Profile</div>
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--mint)' }}>Aggressive:</span> <span style={{ color: 'var(--text2)' }}>4-5%</span></div>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--sky)' }}>Growth:</span> <span style={{ color: 'var(--text2)' }}>2-4%</span></div>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--gold)' }}>Balanced:</span> <span style={{ color: 'var(--text2)' }}>1-2%</span></div>
                            <div style={{ fontSize: 13 }}><span style={{ color: 'var(--coral)' }}>Conservative:</span> <span style={{ color: 'var(--text2)' }}>0-1%</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Analysis Archive - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('archive')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('archive')}
                      aria-label="Toggle Analysis Archive"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('archive')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Analysis Archive — Complete History</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('archive') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('archive') && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>Full record of all investment thesis updates. Never deleted.</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 500, overflowY: 'auto' }}>
                          {/* Current */}
                          <div style={{ background: 'rgba(0,212,170,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 600, color: 'var(--text)' }}>Dec 31, 2025</span>
                                <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>CURRENT</span>
                              </div>
                              <span style={{ color: 'var(--mint)', fontWeight: 600, fontSize: 13 }}>OVERWEIGHT</span>
                            </div>
                            <div style={{ color: 'var(--text2)', fontSize: 13 }}>
                              Post-Q3'25: Upgraded conviction on execution. USDC at $73.7B validates network effects thesis. OCC charter approval removes key regulatory overhang. Maintaining overweight despite lock-up supply risk given fundamental momentum.
                            </div>
                            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)' }}>Trigger: Q3'25 10-Q, OCC Charter Approval (Dec 12)</div>
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
                            <div key={i} style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{entry.date}</span>
                                <span style={{ color: entry.color, fontWeight: 600, fontSize: 13 }}>{entry.rating}</span>
                              </div>
                              <div style={{ color: 'var(--text2)', fontSize: 13 }}>{entry.summary}</div>
                              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)' }}>Trigger: {entry.trigger}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Risks & Strategic Assessment - Collapsible */}
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div 
                      onClick={() => toggleInvestmentSection('strategic-assessment')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('strategic-assessment')}
                      aria-label="Toggle Risks and Strategic Assessment"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('strategic-assessment')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Risks & Strategic Assessment</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('strategic-assessment') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('strategic-assessment') && (
                      <div style={{ marginTop: 16 }}>
                        {/* Section Header */}
                        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20, fontStyle: 'italic' }}>
                          Multi-perspective risk evaluation and strategic decision framework
                        </div>

                        {/* Part 1: Multi-Perspective Risk Evaluation */}
                        <h4 style={{ color: 'var(--text)', marginBottom: 16, fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Risk Evaluation — Three Perspectives</h4>
                        
                        {/* CFA Level III Perspective */}
                        <div style={{ background: 'rgba(0,212,170,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>CFA LEVEL III</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Portfolio Construction & Factor Analysis</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 12 }}>
                              <strong>Factor Exposures:</strong> CRCL exhibits significant interest rate sensitivity (negative duration — rising rates benefit reserve income) and moderate crypto beta correlation (~0.4 to BTC). This creates a unique hedge: positive rate sensitivity while maintaining crypto upside optionality. Low correlation to traditional equities makes it an attractive diversifier.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong>Liquidity Analysis:</strong> Average daily volume ~$180M provides adequate liquidity for institutional positions up to $50M without material market impact. Post-lock-up, float increases from ~40M to ~240M shares, dramatically improving liquidity profile. Bid-ask spreads tight at ~0.05%.
                            </p>
                            <p style={{ marginBottom: 0 }}>
                              <strong>Governance & ESG:</strong> Dual-class structure (Class B 5:1 voting) concentrates control with founders through 2030 sunset — acceptable given founder alignment and temporary nature. Board composition strong (ex-Goldman CRO, ex-CFTC Chair). ESG profile positive: financial inclusion focus, transparent reserves, no direct energy consumption concerns unlike PoW crypto.
                            </p>
                          </div>
                        </div>

                        {/* Hedge Fund Manager Perspective */}
                        <div style={{ background: 'rgba(138,43,226,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(138,43,226,0.2)', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ background: 'var(--violet)', color: 'white', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>HEDGE FUND</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Alpha Generation & Event Catalysts</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 12 }}>
                              <strong>Event Calendar Alpha:</strong> Lock-up expiry (Dec 2025) creates a defined event with predictable dynamics. Historical data shows 70% of high-quality IPOs recover lock-up weakness within 60 days. Strategy: scale into weakness with 30-day DCA starting at lock-up, targeting 15-20% position discount to current price. This is a repeatable playbook.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong>Short Interest Dynamics:</strong> Current short interest ~8% of float — elevated but not crowded. Post-lock-up, short interest as % of new float drops to ~1.3%, reducing squeeze risk but also squeeze upside. No significant borrow cost premium currently. Asymmetric long thesis remains intact.
                            </p>
                            <p style={{ marginBottom: 0 }}>
                              <strong>Catalyst Stacking:</strong> Q4 earnings (Feb) + Arc mainnet (H1) + OCC charter (H1) creates a "catalyst stacking" setup through mid-2026. Each positive catalyst de-risks the next. Position sizing: start 3% portfolio, add to 5% on lock-up weakness, trim to 3% core on 50%+ gains. Defined entry/exit framework limits behavioral errors.
                            </p>
                          </div>
                        </div>

                        {/* CIO/CIS Institutional Perspective */}
                        <div style={{ background: 'rgba(100,149,237,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(100,149,237,0.2)', marginBottom: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ background: 'var(--sky)', color: 'white', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>CIO / CIS</span>
                            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Strategic Allocation & Fiduciary Considerations</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 12 }}>
                              <strong>Strategic Thesis:</strong> Circle represents a "TradFi on-ramp to crypto infrastructure" — the cleanest way to gain crypto ecosystem exposure without direct token/protocol risk. For institutions constrained by crypto mandates, CRCL provides compliant exposure to stablecoin adoption megatrend. Think of it as "picks and shovels" for the digital dollar economy.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong>Benchmark Considerations:</strong> Not yet in S&P 500 but likely candidate within 12-18 months once GAAP profitability sustained. Early positioning ahead of index inclusion creates alpha opportunity. Tracking error vs. benchmark acceptable for growth allocations given asymmetric return profile.
                            </p>
                            <p style={{ marginBottom: 0 }}>
                              <strong>Reputational Risk Assessment:</strong> Post-FTX, crypto association carries headline risk. However, Circle's regulatory positioning (OCC charter, GENIUS Act compliance, major bank partnerships) provides defensible narrative. If questioned by stakeholders, response framework: "We own the regulated payments infrastructure, not speculative tokens." Blackrock/Fidelity ownership validates institutional acceptability.
                            </p>
                          </div>
                        </div>

                        {/* Part 2: Key Strategic Questions */}
                        <h4 style={{ color: 'var(--text)', marginBottom: 16, fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Key Strategic Questions</h4>

                        {/* Would I Buy Now? */}
                        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>Would I Buy Now?</span>
                            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '6px 16px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>YES — ACCUMULATE</span>
                          </div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 12 }}>
                              <strong>The Case:</strong> At $82, CRCL trades at 6.4x P/S with 66% revenue growth — a valuation anomaly for a Rule of 40 score of 105. Fair value range is $100-150, implying 22-83% upside. The risk/reward ratio of 3.2:1 is compelling. You're buying a regulated payment network at a crypto discount that shouldn't exist.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong>The Hesitation:</strong> Lock-up expiry in Dec 2025 creates near-term supply overhang. Waiting could provide a better entry. However, strong fundamentals often absorb lock-up selling quickly, and waiting risks missing the move entirely if selling is lighter than expected.
                            </p>
                            <p style={{ marginBottom: 0 }}>
                              <strong>The Verdict:</strong> Yes, initiate position now at 50% target weight. Reserve 50% for lock-up weakness (target entry: $65-70). If lock-up passes without material weakness, deploy remaining capital on confirmation of support. Don't let perfect be the enemy of good — the asymmetry favors action.
                            </p>
                          </div>
                        </div>

                        {/* What Can I Expect? */}
                        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15, marginBottom: 12 }}>What Can I Expect?</div>
                          <div className="g3" style={{ marginBottom: 16 }}>
                            <div style={{ background: 'rgba(255,193,7,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,193,7,0.2)' }}>
                              <div style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: 8, fontSize: 13 }}>Short-Term (0-6 months)</div>
                              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                                Expect volatility. Lock-up creates 15-25% downside risk. Q4 earnings (Feb) should be strong given Q3 momentum. Trading range: $60-95. Don't panic on lock-up weakness — it's expected and temporary.
                              </div>
                            </div>
                            <div style={{ background: 'rgba(100,149,237,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(100,149,237,0.2)' }}>
                              <div style={{ fontWeight: 600, color: 'var(--sky)', marginBottom: 8, fontSize: 13 }}>Mid-Term (6-18 months)</div>
                              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                                Catalyst-rich period. Arc mainnet, OCC charter, potential Coinbase renegotiation all converge. If execution continues, expect multiple expansion toward 10x P/S. Target range: $100-150. This is where the thesis gets tested.
                              </div>
                            </div>
                            <div style={{ background: 'rgba(0,212,170,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)' }}>
                              <div style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8, fontSize: 13 }}>Long-Term (3-5 years)</div>
                              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                                If stablecoin TAM expands to $1-2T and Circle maintains 25%+ share, this is a $150-350 stock. Payment network multiples (15-17x P/S) on $8-10B revenue = $120-170B market cap. Current: $52B. The math works if the thesis holds.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* What's My Strategy? */}
                        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, marginBottom: 24 }}>
                          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15, marginBottom: 12 }}>What's My Strategy?</div>
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 12 }}>
                              <strong style={{ color: 'var(--mint)' }}>Position Sizing:</strong> 3-5% for growth-oriented portfolios, 1-2% for balanced, avoid for income-focused (no dividend). This is a high-conviction, higher-volatility position — size accordingly. Never more than you can stomach watching drop 30%.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong style={{ color: 'var(--sky)' }}>Entry Approach:</strong> Tranche in. 50% now at ~$82. 25% reserved for lock-up weakness ($65-70 target). Final 25% on confirmation of support or breakout above $95. Average cost target: $72-78. Patience beats FOMO.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong style={{ color: 'var(--gold)' }}>Add Triggers:</strong> Below $65 = aggressive accumulate (oversold on lock-up). Below $55 = back up the truck (existential discount). Major partnership announcement (Apple, Google, Amazon) = add regardless of price.
                            </p>
                            <p style={{ marginBottom: 12 }}>
                              <strong style={{ color: 'var(--violet)' }}>Trim Triggers:</strong> Above $130 = trim 20% (take some chips off). Above $150 = trim another 25%. Above $200 = reduce to core 50% position. Let winners run, but harvest along the way.
                            </p>
                            <p style={{ marginBottom: 0 }}>
                              <strong style={{ color: 'var(--coral)' }}>Exit Criteria:</strong> Full exit if: (1) Coinbase renegotiation fails AND margins compress below 30%, (2) Regulatory environment turns hostile (SEC enforcement, GENIUS Act failure), (3) Tether achieves full transparency AND captures 80%+ market share, (4) Better opportunity emerges with superior risk/reward. Don't marry the position.
                            </p>
                          </div>
                        </div>

                        {/* Part 3: Final Verdict */}
                        <h4 style={{ color: 'var(--text)', marginBottom: 16, fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Final Verdict</h4>
                        
                        <div style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1) 0%, rgba(100,149,237,0.1) 100%)', padding: 20, borderRadius: 12, border: '1px solid rgba(0,212,170,0.3)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>OVERWEIGHT</span>
                              <span style={{ background: 'rgba(0,212,170,0.2)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 4, fontWeight: 600, fontSize: 12 }}>HIGH CONVICTION</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 12, color: 'var(--text3)' }}>12-Month Target</div>
                              <div style={{ fontFamily: 'Space Mono', fontSize: 20, color: 'var(--mint)', fontWeight: 700 }}>$100 - $150</div>
                            </div>
                          </div>
                          
                          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                            <strong>Action:</strong> Accumulate on weakness, hold core position through volatility. Use lock-up as entry opportunity, not exit excuse. This is a 3-5 year compounder disguised as a volatile new issue.
                          </div>
                          
                          <div style={{ background: 'var(--bg)', padding: 12, borderRadius: 8, borderLeft: '4px solid var(--mint)' }}>
                            <div style={{ color: 'var(--text)', fontSize: 14, fontStyle: 'italic' }}>
                              "Best-in-class regulated stablecoin infrastructure trading at a crypto discount that shouldn't exist. The market is pricing the past (crypto winter, SVB crisis) while ignoring the future (payment network economics, regulatory moat, TradFi adoption). Time arbitrage favors the patient."
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Methodology - Collapsible */}
                  <div className="card">
                    <div 
                      onClick={() => toggleInvestmentSection('methodology')}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={investmentSections.has('methodology')}
                      aria-label="Toggle Methodology and Disclosures"
                      onKeyDown={(e) => e.key === 'Enter' && toggleInvestmentSection('methodology')}
                    >
                      <div className="card-title" style={{ marginBottom: 0 }}>Methodology & Disclosures</div>
                      <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has('methodology') ? '−' : '+'}</span>
                    </div>
                    {investmentSections.has('methodology') && (
                      <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text2)', lineHeight: 1.8 }}>
                        <p><strong>Data Sources:</strong> SEC EDGAR filings (10-K, 10-Q, 8-K, S-1, S-3), company press releases, earnings call transcripts, third-party research.</p>
                        <p><strong>Valuation:</strong> Primary method is P/S multiples with peer comparison. Secondary: DCF (12% WACC, 3% terminal growth), SOTP for platform optionality.</p>
                        <p><strong>Ratings Scale:</strong> OVERWEIGHT (expected 20%+ outperformance), NEUTRAL (market perform ±10%), UNDERWEIGHT (expected 20%+ underperformance), MONITORING (not yet rated).</p>
                        <p><strong>Update Frequency:</strong> Analysis updated after each material SEC filing or significant press release. All historical analyses preserved permanently.</p>
                        <p style={{ marginBottom: 0 }}><strong>Limitations:</strong> Forward-looking statements involve uncertainty. Model assumes current regulatory trajectory continues. Interest rate and crypto market assumptions may prove incorrect. Not investment advice — do your own research.</p>
                      </div>
                    )}
                  </div>
                  
              <CFANotes title="CFA Level III — Investment Framework" items={[
                { term: 'Letter Grade Scorecard', def: 'A-F ratings across dimensions: Growth (revenue trajectory), Profitability (margins), Moat (competitive position), Execution (management track record), Valuation (vs peers and DCF).' },
                { term: 'Three Perspectives', def: 'CFA Analyst (fundamentals focus), Hedge Fund (catalysts and technicals), CIO (portfolio fit and risk). Different time horizons and priorities.' },
                { term: 'Risk Assessment', def: 'Regulatory, competitive, macro (interest rates), execution risks. Weight by probability × impact.' },
                { term: 'Position Sizing', def: 'Based on conviction level, risk tolerance, portfolio construction rules. Higher conviction = larger position, within limits.' },
                { term: 'Archive History', def: 'All prior analyses preserved. Track how views evolved and whether predictions proved accurate.' },
              ]} />
            </>
          )}

          {activeTab === 'usdc' && (
            <>
              <h2 className="section-head">USDC Dynamics</h2>
              
              {/* Highlight Box */}
              <div className="highlight">
                <h3>Stablecoin Economics</h3>
                <p className="text-sm">
                  USDC is a fully-reserved stablecoin backed 1:1 by USD and short-dated Treasuries. Circle earns
                  yield on reserves (~4-5% in current rate environment). Platform % represents USDC held directly
                  in Circle accounts vs public blockchain - higher platform % means better unit economics.
                </p>
              </div>
              
              <div className="g4">
                <Card label="Circulation" value={`$${latest.usdcCirculation.toFixed(1)}B`} sub="Total USDC supply" color="mint" />
                <Card label="YoY Growth" value={`+${usdcGrowth.toFixed(0)}%`} sub="Year over year" color="green" />
                <Card label="Market Share" value={`${latest.marketShare}%`} sub="Of stablecoins" color="blue" />
                <Card label="On Platform" value={`${latest.platformPct.toFixed(1)}%`} sub="Higher margin" color="purple" />
              </div>

              <div className="card" style={{ marginTop: 32 }}>
                <div className="card-title">Circulation Growth</div>
                <div className="bars">
                  {DATA.map((d, i) => (
                    <div key={i} className="bar-col">
                      <div className="bar-val">${d.usdcCirculation.toFixed(1)}B</div>
                      <div className="bar" style={{ height: `${(d.usdcCirculation / 80) * 180}px` }} />
                      <div className="bar-label">{d.quarter}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="g2" style={{ marginTop: 32 }}>
                <div className="card">
                  <div className="card-title">Mint / Redeem Activity ($B)</div>
                  <table className="tbl">
                    <thead>
                      <tr><th>Quarter</th><th className="r">Minted</th><th className="r">Redeemed</th><th className="r">Net</th></tr>
                    </thead>
                    <tbody>
                      {DATA.map(d => (
                        <tr key={d.quarter}>
                          <td>{d.quarter}</td>
                          <td className="r mint">{d.usdcMinted.toFixed(1)}</td>
                          <td className="r coral">{d.usdcRedeemed.toFixed(1)}</td>
                          <td className={`r ${d.usdcMinted - d.usdcRedeemed >= 0 ? 'mint' : 'coral'}`}>
                            {(d.usdcMinted - d.usdcRedeemed).toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <div className="card-title">Rate Sensitivity Matrix ($B Annual)</div>
                  <div className="matrix" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                    <div className="matrix-cell head">USDC \ Rate</div>
                    <div className="matrix-cell head">3.0%</div>
                    <div className="matrix-cell head">3.5%</div>
                    <div className="matrix-cell head">4.0%</div>
                    <div className="matrix-cell head">4.5%</div>
                    <div className="matrix-cell head">5.0%</div>
                    {[50, 75, 100, 125, 150].map(c => (
                      <React.Fragment key={c}>
                        <div className="matrix-cell head">${c}B</div>
                        {[3, 3.5, 4, 4.5, 5].map(r => (
                          <div key={r} className={`matrix-cell ${c === 75 && r === 4 ? 'hl' : ''}`}>
                            ${(c * r / 100).toFixed(1)}
                          </div>
                        ))}
                      </React.Fragment>
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
          )}

          {activeTab === 'capital' && (
            <>
              <h2 className="section-head">Capital Structure</h2>
              
              {/* Highlight Box */}
              <div className="highlight">
                <h3>Dual-Class Structure</h3>
                <p className="text-sm">
                  Circle has a dual-class share structure with Class A (1 vote) and Class B (5 votes). Jeremy Allaire
                  and insiders control significant voting power through Class B shares. Class B voting is capped at
                  30% aggregate and sunsets in June 2030 or upon CEO departure.
                </p>
              </div>
              
              {/* Key Metrics */}
              <div className="g4">
                <Card label="Shares Outstanding" value={`${MARKET.shares.toFixed(1)}M`} sub="All classes" color="mint" />
                <Card label="Market Cap" value={`$${(MARKET.marketCap / 1e9).toFixed(1)}B`} sub="Current valuation" color="blue" />
                <Card label="Cash Position" value="$1.1B" sub="Sep 2024" color="green" />
                <Card label="Convertible Debt" value="$206M" sub="Fair value" color="yellow" />
              </div>

              {/* Navigation Cards */}
              <div className="g5" style={{ marginTop: 24 }}>
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
                    className="card"
                    style={{
                      cursor: 'pointer',
                      borderLeft: capitalView === nav.id ? '4px solid var(--mint)' : '4px solid transparent',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 24, fontWeight: 600, color: capitalView === nav.id ? 'var(--mint)' : 'var(--text)' }}>{nav.value}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{nav.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{nav.sub}</div>
                  </div>
                ))}
              </div>

              {/* Share Class Structure */}
              {capitalView === 'structure' && (
              <div className="card" style={{ marginTop: 32 }}>
                <div className="card-title">Share Class Structure</div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th className="r">Authorized</th>
                      <th className="r">Outstanding</th>
                      <th className="r">Votes/Share</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SHARE_CLASSES.map(s => (
                      <tr key={s.class}>
                        <td style={{ fontWeight: 600 }}>{s.class}</td>
                        <td className="r">{(s.authorized / 1000).toLocaleString()}M</td>
                        <td className="r mint">{s.outstanding > 0 ? `${(s.outstanding / 1000).toFixed(1)}M` : '—'}</td>
                        <td className="r">{s.votes}</td>
                        <td style={{ color: 'var(--text2)', fontSize: 13 }}>{s.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}

              {/* Major Shareholders */}
              {capitalView === 'shareholders' && (
              <div className="card" style={{ marginTop: 32 }}>
                <div className="card-title">Major Shareholders (from Aug 2025 S-1)</div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Shareholder</th>
                      <th className="r">Class A (K)</th>
                      <th className="r">Class B (K)</th>
                      <th className="r">Voting %</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MAJOR_SHAREHOLDERS.map((s, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{s.name}</td>
                        <td className="r">{s.classA > 0 ? `${(s.classA / 1000).toFixed(1)}M` : '—'}</td>
                        <td className="r sky">{s.classB > 0 ? `${(s.classB / 1000).toFixed(1)}M` : '—'}</td>
                        <td className="r mint">{s.pctVoting}%</td>
                        <td><span style={{ color: s.type === 'Insider' ? 'var(--gold)' : s.type === 'Strategic' ? 'var(--violet)' : 'var(--text2)' }}>{s.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text3)' }}>
                  Note: Class B voting capped at 30% aggregate. Founder shares sunset June 2030 or upon Allaire departure from CEO/Chair.
                </div>
              </div>
              )}

              {/* Offerings View: Equity Offerings + Equity Awards + Warrants */}
              {capitalView === 'offerings' && (
              <>
              <div className="g2" style={{ marginTop: 32 }}>
                {/* Equity Offerings */}
                <div className="card">
                  <div className="card-title">Equity Offerings</div>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th className="r">Shares</th>
                        <th className="r">Price</th>
                        <th className="r">Proceeds</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EQUITY_OFFERINGS.map((o, i) => (
                        <tr key={i}>
                          <td>{o.date}</td>
                          <td style={{ fontWeight: 600 }}>{o.type}</td>
                          <td className="r">{(o.shares / 1000).toFixed(1)}M</td>
                          <td className="r">${o.price.toFixed(2)}</td>
                          <td className="r mint">${o.grossProceeds >= 1000 ? `${(o.grossProceeds / 1000).toFixed(2)}B` : `${o.grossProceeds}M`}</td>
                        </tr>
                      ))}
                      <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                        <td colSpan={4}>Total Raised</td>
                        <td className="r mint">$2.5B</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)' }}>
                    IPO: {EQUITY_OFFERINGS[0].underwriters}<br/>
                    Follow-on: {EQUITY_OFFERINGS[1].underwriters}
                  </div>
                </div>

                {/* Outstanding Equity Awards */}
                <div className="card">
                  <div className="card-title">Outstanding Equity Awards (Jun 30, 2025)</div>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Award Type</th>
                        <th className="r">Class A</th>
                        <th className="r">Class B</th>
                        <th className="r">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Stock Options</td>
                        <td className="r">{(EQUITY_AWARDS.options.classA / 1000).toFixed(1)}M</td>
                        <td className="r">{(EQUITY_AWARDS.options.classB / 1000).toFixed(1)}M</td>
                        <td className="r mint">{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.options.classB) / 1000).toFixed(1)}M</td>
                      </tr>
                      <tr>
                        <td>RSUs</td>
                        <td className="r">{(EQUITY_AWARDS.rsus.classA / 1000).toFixed(1)}M</td>
                        <td className="r">{(EQUITY_AWARDS.rsus.classB / 1000).toFixed(1)}M</td>
                        <td className="r mint">{((EQUITY_AWARDS.rsus.classA + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</td>
                      </tr>
                      <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                        <td>Total Outstanding</td>
                        <td className="r">{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.rsus.classA) / 1000).toFixed(1)}M</td>
                        <td className="r">{((EQUITY_AWARDS.options.classB + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</td>
                        <td className="r mint">{((EQUITY_AWARDS.options.classA + EQUITY_AWARDS.options.classB + EQUITY_AWARDS.rsus.classA + EQUITY_AWARDS.rsus.classB) / 1000).toFixed(1)}M</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text3)' }}>
                    Wtd-avg option exercise price: ${EQUITY_AWARDS.options.weightedAvgPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Warrants */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">Outstanding Warrants (Black-Scholes Valuation)</div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Grant</th>
                      <th className="r">Shares (K)</th>
                      <th className="r">Strike</th>
                      <th className="r">Fair Value</th>
                      <th className="r">Vol</th>
                      <th>Expiry</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WARRANTS.map((w, i) => (
                      <tr key={i}>
                        <td>{w.date}</td>
                        <td className="r">{(w.shares / 1000).toFixed(1)}M</td>
                        <td className="r">${w.exercisePrice}</td>
                        <td className="r sky">${w.fairValue}M</td>
                        <td className="r">{w.volatility}%</td>
                        <td>{w.expiry}</td>
                        <td><span style={{ color: 'var(--gold)' }}>{w.status}</span></td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                      <td>Total</td>
                      <td className="r">{(WARRANTS.reduce((a, w) => a + w.shares, 0) / 1000).toFixed(1)}M</td>
                      <td></td>
                      <td className="r sky">${WARRANTS.reduce((a, w) => a + w.fairValue, 0).toFixed(1)}M</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </>
              )}

              {/* Plans View: Equity Incentive Plans + Pre-IPO Preferred */}
              {capitalView === 'plans' && (
              <>
              <div className="card" style={{ marginTop: 32 }}>
                <div className="card-title">Equity Incentive Plans (Reserved Shares)</div>
                <div className="g3">
                  {EQUITY_PLANS.map((p, i) => (
                    <div key={i} style={{ background: 'var(--surface2)', padding: 20, borderRadius: 12 }}>
                      <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 8 }}>{p.plan}</div>
                      <div style={{ fontFamily: 'Space Mono', fontSize: 24, fontWeight: 700, color: 'var(--mint)' }}>
                        {(p.reserved / 1000).toFixed(1)}M
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>shares reserved</div>
                      <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 12 }}>{p.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-IPO Preferred (Historical) */}
              <div className="highlight" style={{ marginTop: 32 }}>
                <h3>Pre-IPO Capital Structure (Converted at IPO)</h3>
                <p style={{ marginBottom: 16 }}>All preferred shares converted to Class A common stock at IPO. Historical liquidation preferences totaled $1.14B across six series.</p>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Series</th>
                      <th className="r">Year</th>
                      <th className="r">Shares (K)</th>
                      <th className="r">Liq. Pref</th>
                      <th className="r">Price/Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREFERRED_STOCK.map((p, i) => (
                      <tr key={i}>
                        <td>{p.series}</td>
                        <td className="r" style={{ color: 'var(--text3)' }}>{p.year}</td>
                        <td className="r">{p.shares.toLocaleString()}</td>
                        <td className="r">${(p.liquidation / 1000).toFixed(1)}M</td>
                        <td className="r sky">${p.pricePerShare.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                      <td colSpan={2}>Total</td>
                      <td className="r">{(PREFERRED_STOCK.reduce((a, p) => a + p.shares, 0) / 1000).toFixed(1)}M</td>
                      <td className="r">${(PREFERRED_STOCK.reduce((a, p) => a + p.liquidation, 0) / 1000000).toFixed(2)}B</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </>
              )}

              {/* Dilution View */}
              {capitalView === 'dilution' && (
              <div className="card" style={{ marginTop: 32 }}>
                <div className="card-title">Fully Diluted Share Count</div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th className="r">Shares (M)</th>
                      <th className="r">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Class A Outstanding</td>
                      <td className="r">209.0</td>
                      <td className="r">75.6%</td>
                    </tr>
                    <tr>
                      <td>Class B Outstanding</td>
                      <td className="r">19.6</td>
                      <td className="r">7.1%</td>
                    </tr>
                    <tr>
                      <td>Options Outstanding</td>
                      <td className="r">20.7</td>
                      <td className="r">7.5%</td>
                    </tr>
                    <tr>
                      <td>RSUs Outstanding</td>
                      <td className="r">25.2</td>
                      <td className="r">9.1%</td>
                    </tr>
                    <tr>
                      <td>Warrants (unvested)</td>
                      <td className="r">11.0</td>
                      <td className="r">4.0%</td>
                    </tr>
                    <tr>
                      <td>Convertible Notes</td>
                      <td className="r">~1.0</td>
                      <td className="r">0.4%</td>
                    </tr>
                    <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                      <td>Fully Diluted</td>
                      <td className="r mint">~276.5</td>
                      <td className="r">100%</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text3)' }}>
                  Note: Excludes 33.9M shares reserved under Omnibus/ESPP plans not yet granted. Lock-up: ~198M shares restricted until Q3'25 earnings or 180 days post-IPO.
                </div>
              </div>
              )}

              <CFANotes title="CFA Level III — Capital Structure" items={[
                { term: 'Share Classes', def: 'Class A (1 vote), Class B (5 votes). Dual-class structure gives founders control. Class B converts to A on transfer.' },
                { term: 'Convertible Notes', def: 'Debt that converts to equity at holder option. Creates potential dilution. Track conversion price vs stock price.' },
                { term: 'Fully Diluted Shares', def: 'Outstanding + options + warrants + convertibles. Use for per-share metrics to avoid overstating value.' },
                { term: 'Lock-up Expiration', def: 'Insider selling restriction expires ~180 days post-IPO. Watch for selling pressure at unlock.' },
                { term: 'Share Repurchases', def: 'Company buying back stock reduces shares, increases EPS. Signal of management confidence and capital return.' },
              ]} />
            </>
          )}

          {activeTab === 'dcf' && (
            <>
              <h2 className="section-head">DCF Valuation</h2>
              
              {/* Highlight Box */}
              <div className="highlight">
                <h3>Discounted Cash Flow Analysis</h3>
                <p className="text-sm">
                  DCF values Circle based on projected future free cash flows discounted to present value. Key drivers
                  are USDC circulation growth, RLDC margins, and reserve yield rates. Terminal value uses exit multiple
                  method based on expected steady-state profitability.
                </p>
              </div>
              
              <div className="g3" style={{ marginBottom: 32 }}>
                {SCENARIOS.map(s => (
                  <div
                    key={s.name}
                    className={`scenario ${s.name.toLowerCase()} ${scenario === s.name ? 'active' : ''}`}
                    onClick={() => setScenario(s.name)}
                  >
                    <h4>{s.name}</h4>
                    <div className="scenario-row"><span>USDC CAGR</span><span>{s.cagr}%</span></div>
                    <div className="scenario-row"><span>Terminal Margin</span><span>{s.margin}%</span></div>
                    <div className="scenario-row"><span>Exit Multiple</span><span>{s.multiple}x</span></div>
                    <div className="scenario-row"><span>Rate Assumption</span><span>{s.rate}%</span></div>
                  </div>
                ))}
              </div>

              <div className="g2">
                <div className="card">
                  <div className="card-title">Model Inputs</div>
                  <div className="slider-wrap">
                    <div className="slider-head">
                      <span>Discount Rate (WACC)</span>
                      <span>{discount}%</span>
                    </div>
                    <input type="range" min="8" max="18" value={discount} onChange={e => setDiscount(+e.target.value)} />
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Valuation Output</div>
                  <div className="g2">
                    <Card label="Price Target" value={`$${dcf.pt.toFixed(0)}`} sub={`Based on ${scenario} scenario`} color="mint" />
                    <Card label="Upside" value={`${dcf.upside >= 0 ? '+' : ''}${dcf.upside.toFixed(0)}%`} sub="vs current price" color={dcf.upside >= 0 ? 'green' : 'red'} />
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
            </>
          )}

          {activeTab === 'monte-carlo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h2 className="section-head">Monte Carlo</h2>
              
              {/* Highlight Box */}
              <div className="highlight">
                <h3>Stablecoin DCF Simulation</h3>
                <p className="text-sm">
                  Runs {mcSim.n.toLocaleString()} simulations over {mcYears} years with randomized inputs (USDC growth, margins, rates, multiples) 
                  to generate a probability distribution of fair values.
                </p>
              </div>
              
              {/* Scenario Presets */}
              <div className="card">
                <div className="card-title">Select Scenario</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {(['bear', 'base', 'bull', 'custom'] as const).map(key => {
                    const p = mcPresets[key];
                    const isActive = mcPreset === key;
                    return (
                      <button
                        key={key}
                        onClick={() => applyMcPreset(key)}
                        style={{
                          padding: '12px 16px',
                          background: isActive ? 'var(--mint)' : 'var(--surface2)',
                          color: isActive ? 'var(--bg)' : 'var(--text)',
                          border: `1px solid ${isActive ? 'var(--mint)' : 'var(--border)'}`,
                          borderRadius: 8,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.label}</div>
                        <div style={{ fontSize: 11, opacity: 0.8 }}>{p.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Horizon & Simulation Controls */}
              <div className="g2">
                <div className="card">
                  <div className="card-title">Time Horizon</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[3, 5, 7].map(yr => (
                      <button
                        key={yr}
                        onClick={() => { setMcYears(yr); setRunKey(k => k + 1); }}
                        style={{
                          flex: 1,
                          padding: '12px 20px',
                          borderRadius: 8,
                          border: mcYears === yr ? '2px solid var(--mint)' : '1px solid var(--border)',
                          background: mcYears === yr ? 'rgba(126,231,135,0.15)' : 'var(--surface2)',
                          color: mcYears === yr ? 'var(--mint)' : 'var(--text2)',
                          cursor: 'pointer',
                          fontWeight: mcYears === yr ? 700 : 400,
                          fontFamily: 'Space Mono',
                          fontSize: 16,
                        }}
                      >
                        {yr}Y
                      </button>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Simulations</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1000, 2000, 5000].map(simCount => (
                      <button
                        key={simCount}
                        onClick={() => { setMcSims(simCount); setRunKey(k => k + 1); }}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          borderRadius: 8,
                          border: mcSims === simCount ? '2px solid var(--mint)' : '1px solid var(--border)',
                          background: mcSims === simCount ? 'rgba(126,231,135,0.15)' : 'var(--surface2)',
                          color: mcSims === simCount ? 'var(--mint)' : 'var(--text2)',
                          cursor: 'pointer',
                          fontWeight: mcSims === simCount ? 700 : 400,
                          fontFamily: 'Space Mono',
                          fontSize: 14,
                        }}
                      >
                        {simCount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Parameters Card with Adjustable Inputs */}
              <div className="card">
                <div className="card-title">Parameters {mcPreset === 'custom' ? '(Custom)' : `(${mcPresets[mcPreset].label})`}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  <Input label="Revenue Growth Min %" value={mcPreset === 'custom' ? mcRevenueGrowthMin : mcPresets[mcPreset].revMin} onChange={v => { setMcRevenueGrowthMin(v); setMcPreset('custom'); }} min={0} max={50} />
                  <Input label="Revenue Growth Max %" value={mcPreset === 'custom' ? mcRevenueGrowthMax : mcPresets[mcPreset].revMax} onChange={v => { setMcRevenueGrowthMax(v); setMcPreset('custom'); }} min={0} max={100} />
                  <Input label="Margin Min %" value={mcPreset === 'custom' ? mcMarginMin : mcPresets[mcPreset].marginMin} onChange={v => { setMcMarginMin(v); setMcPreset('custom'); }} min={20} max={90} />
                  <Input label="Margin Max %" value={mcPreset === 'custom' ? mcMarginMax : mcPresets[mcPreset].marginMax} onChange={v => { setMcMarginMax(v); setMcPreset('custom'); }} min={20} max={95} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }}>
                  <Input label="Discount Min %" value={mcPreset === 'custom' ? mcDiscountMin : mcPresets[mcPreset].discMin} onChange={v => { setMcDiscountMin(v); setMcPreset('custom'); }} min={5} max={25} />
                  <Input label="Discount Max %" value={mcPreset === 'custom' ? mcDiscountMax : mcPresets[mcPreset].discMax} onChange={v => { setMcDiscountMax(v); setMcPreset('custom'); }} min={5} max={30} />
                  <Input label="Terminal Mult Min" value={mcPreset === 'custom' ? mcTerminalMultMin : mcPresets[mcPreset].termMin} onChange={v => { setMcTerminalMultMin(v); setMcPreset('custom'); }} min={5} max={30} />
                  <Input label="Terminal Mult Max" value={mcPreset === 'custom' ? mcTerminalMultMax : mcPresets[mcPreset].termMax} onChange={v => { setMcTerminalMultMax(v); setMcPreset('custom'); }} min={5} max={40} />
                </div>
                <button onClick={() => setRunKey(k => k + 1)} style={{
                  marginTop: 16, width: '100%', padding: '10px 16px', background: 'var(--mint)', color: 'var(--bg1)', 
                  border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 13
                }}>🎲 Run Simulation</button>
              </div>

              {/* Percentile Cards - Unified 5-card layout */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#fca5a5', marginBottom: 4 }}>P5 (Bear)</div>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#f87171' }}>${mcSim.p5.toFixed(0)}</div>
                  <div style={{ fontSize: 11, color: '#fca5a5', marginTop: 4 }}>{((mcSim.p5 / MARKET.price - 1) * 100).toFixed(0)}%</div>
                </div>
                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#fdba74', marginBottom: 4 }}>P25</div>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#fb923c' }}>${mcSim.p25.toFixed(0)}</div>
                  <div style={{ fontSize: 11, color: '#fdba74', marginTop: 4 }}>{((mcSim.p25 / MARKET.price - 1) * 100).toFixed(0)}%</div>
                </div>
                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.4)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#6ee7b7', marginBottom: 4 }}>Median</div>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#34d399' }}>${mcSim.p50.toFixed(0)}</div>
                  <div style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4 }}>{((mcSim.p50 / MARKET.price - 1) * 100).toFixed(0)}%</div>
                </div>
                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#86efac', marginBottom: 4 }}>P75</div>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#4ade80' }}>${mcSim.p75.toFixed(0)}</div>
                  <div style={{ fontSize: 11, color: '#86efac', marginTop: 4 }}>{((mcSim.p75 / MARKET.price - 1) * 100).toFixed(0)}%</div>
                </div>
                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#6ee7b7', marginBottom: 4 }}>P95 (Bull)</div>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#10b981' }}>${mcSim.p95.toFixed(0)}</div>
                  <div style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4 }}>{((mcSim.p95 / MARKET.price - 1) * 100).toFixed(0)}%</div>
                </div>
              </div>
              
              {/* Risk Metrics - Unified 2 rows of 3 using Card component */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <Card label="Win Probability" value={`${mcSim.winProb.toFixed(0)}%`} sub="> current price" color={mcSim.winProb > 50 ? 'green' : 'red'} />
                <Card label="Expected Value" value={`$${mcSim.mean.toFixed(0)}`} sub="Mean fair value" color="mint" />
                <Card label="Sharpe Ratio" value={mcSim.sharpe.toFixed(2)} sub={mcSim.sharpe > 1 ? 'Excellent' : mcSim.sharpe > 0.5 ? 'Good' : 'Moderate'} color={mcSim.sharpe > 0.5 ? 'green' : 'yellow'} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <Card label="Sortino Ratio" value={mcSim.sortino.toFixed(2)} sub="Downside-adjusted" color={mcSim.sortino > 0.7 ? 'green' : 'yellow'} />
                <Card label="VaR (5%)" value={`${mcSim.var5.toFixed(0)}%`} sub="95% conf floor" color="red" />
                <Card label="CVaR (5%)" value={`${mcSim.cvar5.toFixed(0)}%`} sub="Exp. tail loss" color="red" />
              </div>
              
              {/* Distribution Chart - Unified Recharts BarChart */}
              <div className="card">
                <div className="card-title">Fair Value Distribution</div>
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
                    <Bar dataKey="pct" fill="var(--mint)" radius={[2, 2, 0, 0]} />
                    <ReferenceLine x={MARKET.price} stroke="#fff" strokeDasharray="5 5" />
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>
                  <span>White line = current price (${MARKET.price.toFixed(0)})</span>
                  <span>Simulations: {mcSim.n.toLocaleString()}</span>
                </div>
              </div>
              
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

          {activeTab === 'scenarios' && (
            <>
              <h2 className="section-head">Scenario Simulation</h2>
              
              {/* Highlight Box */}
              <div className="highlight">
                <h3>Multi-Year Projections</h3>
                <p className="text-sm">
                  Model different growth trajectories based on USDC adoption, rate environment, and margin evolution.
                  Bear case assumes rate cuts and competition pressure. Bull case models stablecoin dominance with
                  expanding platform margins. Probability-weight for expected value.
                </p>
              </div>
              
              {/* Controls */}
              <div className="g2" style={{ marginBottom: 24 }}>
                {/* Target Year Selector */}
                <div className="card">
                  <div className="card-title">Target Year</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {TARGET_YEARS.map(year => (
                      <button
                        key={year}
                        onClick={() => setSimTargetYear(year)}
                        style={{
                          padding: '12px 20px',
                          borderRadius: 8,
                          border: simTargetYear === year ? '2px solid var(--mint)' : '1px solid var(--border)',
                          background: simTargetYear === year ? 'rgba(0,212,170,0.15)' : 'var(--surface2)',
                          color: simTargetYear === year ? 'var(--mint)' : 'var(--text2)',
                          cursor: 'pointer',
                          fontWeight: simTargetYear === year ? 700 : 400,
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
                <div className="card">
                  <div className="card-title">Scenario</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {SCENARIO_KEYS.map(key => {
                      const s = SCENARIO_SIMULATIONS[key];
                      return (
                        <button
                          key={key}
                          onClick={() => setSimScenario(key)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 8,
                            border: simScenario === key ? `2px solid ${s.color}` : '1px solid var(--border)',
                            background: simScenario === key ? `${s.color}22` : 'var(--surface2)',
                            color: simScenario === key ? s.color : 'var(--text2)',
                            cursor: 'pointer',
                            fontWeight: simScenario === key ? 700 : 400,
                            fontSize: 14,
                          }}
                        >
                          {s.name} ({s.probability}%)
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Scenario Results */}
              {(() => {
                const selectedScenario = SCENARIO_SIMULATIONS[simScenario];
                const projection = selectedScenario.projections.find(p => p.year === simTargetYear);
                if (!projection) return null;

                const priceReturn = ((projection.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100;
                const usdcGrowth = ((projection.usdc / CURRENT_METRICS.usdc) - 1) * 100;

                return (
                  <>
                    {/* Scenario Header */}
                    <div className="card" style={{ borderLeft: `4px solid ${selectedScenario.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                        <div>
                          <h3 style={{ color: selectedScenario.color, marginBottom: 8 }}>
                            {selectedScenario.name} Case — {simTargetYear}
                          </h3>
                          <p style={{ color: 'var(--text2)', maxWidth: 600 }}>{selectedScenario.description}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 12, color: 'var(--text3)' }}>Probability Weight</div>
                          <div style={{ fontFamily: 'Space Mono', fontSize: 32, fontWeight: 700, color: selectedScenario.color }}>
                            {selectedScenario.probability}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="g4" style={{ marginTop: 24 }}>
                      <div className="big-stat">
                        <div className="num" style={{ color: selectedScenario.color }}>${projection.sharePrice.toLocaleString()}</div>
                        <div className="lbl">Share Price</div>
                        <div style={{ fontSize: 12, color: priceReturn >= 0 ? 'var(--mint)' : 'var(--coral)', marginTop: 4 }}>
                          {priceReturn >= 0 ? '+' : ''}{priceReturn.toFixed(0)}% from today
                        </div>
                      </div>
                      <div className="big-stat">
                        <div className="num">${projection.equityValue}B</div>
                        <div className="lbl">Equity Value</div>
                      </div>
                      <div className="big-stat">
                        <div className="num">${projection.usdc}B</div>
                        <div className="lbl">USDC Circulation</div>
                        <div style={{ fontSize: 12, color: 'var(--sky)', marginTop: 4 }}>
                          +{usdcGrowth.toFixed(0)}% growth
                        </div>
                      </div>
                      <div className="big-stat">
                        <div className="num">{projection.marketShare}%</div>
                        <div className="lbl">Market Share</div>
                      </div>
                    </div>

                    {/* Financial Projections Table */}
                    <div className="card" style={{ marginTop: 24 }}>
                      <div className="card-title">Financial Projections — {selectedScenario.name} Scenario</div>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="tbl">
                          <thead>
                            <tr>
                              <th>Metric</th>
                              <th className="r">Today</th>
                              {selectedScenario.projections.map(p => (
                                <th key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.year}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>USDC Circulation ($B)</td>
                              <td className="r">{CURRENT_METRICS.usdc}</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.usdc}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Market Share (%)</td>
                              <td className="r">29%</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.marketShare}%
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Reserve Yield (%)</td>
                              <td className="r">4.33%</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.reserveRate}%
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderTop: '1px solid var(--border)' }}>
                              <td>Gross Revenue ($B)</td>
                              <td className="r">$2.96</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  ${p.grossRevenue.toFixed(2)}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Distribution Costs ($B)</td>
                              <td className="r">($1.15)</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ color: 'var(--coral)', background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  (${p.distributionCost.toFixed(2)})
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Net Revenue ($B)</td>
                              <td className="r mint">$1.81</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r mint" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  ${p.netRevenue.toFixed(2)}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>RLDC Margin (%)</td>
                              <td className="r">39%</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.rldcMargin}%
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderTop: '1px solid var(--border)' }}>
                              <td>EBITDA ($B)</td>
                              <td className="r">$0.29</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ color: p.ebitda >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.ebitda >= 0 ? '$' : '($'}{Math.abs(p.ebitda).toFixed(2)}{p.ebitda < 0 ? ')' : ''}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Net Income ($B)</td>
                              <td className="r">$0.16</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ color: p.netIncome >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.netIncome >= 0 ? '$' : '($'}{Math.abs(p.netIncome).toFixed(2)}{p.netIncome < 0 ? ')' : ''}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Free Cash Flow ($B)</td>
                              <td className="r">$0.14</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ color: p.fcf >= 0 ? 'var(--sky)' : 'var(--coral)', background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.fcf >= 0 ? '$' : '($'}{Math.abs(p.fcf).toFixed(2)}{p.fcf < 0 ? ')' : ''}
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderTop: '2px solid var(--border)', fontWeight: 600 }}>
                              <td>Exit P/S Multiple</td>
                              <td className="r">6.4x</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  {p.exitMultiple}x
                                </td>
                              ))}
                            </tr>
                            <tr style={{ fontWeight: 600 }}>
                              <td>Implied EV ($B)</td>
                              <td className="r">$18.9</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  ${p.evImplied.toFixed(1)}
                                </td>
                              ))}
                            </tr>
                            <tr style={{ fontWeight: 700, fontSize: 15 }}>
                              <td>Share Price ($)</td>
                              <td className="r">${CURRENT_METRICS.sharePrice}</td>
                              {selectedScenario.projections.map(p => (
                                <td key={p.year} className="r" style={{ color: selectedScenario.color, background: p.year === simTargetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                                  ${p.sharePrice.toLocaleString()}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Assumptions & Catalysts */}
                    <div className="g2" style={{ marginTop: 24 }}>
                      <div className="card">
                        <div className="card-title">Key Assumptions</div>
                        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                          {selectedScenario.keyAssumptions.map((a, i) => (
                            <li key={i} style={{ marginBottom: 8, lineHeight: 1.5 }}>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="card">
                        <div className="card-title">{selectedScenario.catalysts.length > 0 ? 'Catalysts' : 'Key Risks'}</div>
                        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                          {(selectedScenario.catalysts.length > 0 ? selectedScenario.catalysts : selectedScenario.risks).map((item, i) => (
                            <li key={i} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                          ))}
                        </ul>
                        {selectedScenario.catalysts.length > 0 && selectedScenario.risks.length > 0 && (
                          <>
                            <div className="card-title" style={{ marginTop: 16 }}>Risks</div>
                            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                              {selectedScenario.risks.map((r, i) => (
                                <li key={i} style={{ marginBottom: 8, lineHeight: 1.5 }}>{r}</li>
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
              <div className="highlight" style={{ marginTop: 32 }}>
                <h3>Probability-Weighted Expected Value — {simTargetYear}</h3>
                <p style={{ marginBottom: 20, color: 'var(--text2)' }}>
                  Weighted average across all scenarios based on assigned probabilities
                </p>
                
                {(() => {
                  const pwev = SCENARIO_KEYS.reduce((acc, key) => {
                    const s = SCENARIO_SIMULATIONS[key];
                    const p = s.projections.find(proj => proj.year === simTargetYear);
                    if (p) {
                      acc.sharePrice += p.sharePrice * (s.probability / 100);
                      acc.equityValue += p.equityValue * (s.probability / 100);
                      acc.usdc += p.usdc * (s.probability / 100);
                      acc.netIncome += p.netIncome * (s.probability / 100);
                    }
                    return acc;
                  }, { sharePrice: 0, equityValue: 0, usdc: 0, netIncome: 0 });

                  const expectedReturn = ((pwev.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100;
                  const cagr = (Math.pow(pwev.sharePrice / CURRENT_METRICS.sharePrice, 1 / (simTargetYear - 2025)) - 1) * 100;

                  return (
                    <>
                      <div className="g4">
                        <div className="big-stat">
                          <div className="num mint">${pwev.sharePrice.toFixed(0)}</div>
                          <div className="lbl">Expected Share Price</div>
                        </div>
                        <div className="big-stat">
                          <div className="num">${pwev.equityValue.toFixed(1)}B</div>
                          <div className="lbl">Expected Equity Value</div>
                        </div>
                        <div className="big-stat">
                          <div className="num sky">{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</div>
                          <div className="lbl">Expected Return</div>
                        </div>
                        <div className="big-stat">
                          <div className="num">{cagr.toFixed(1)}%</div>
                          <div className="lbl">Implied CAGR</div>
                        </div>
                      </div>

                      {/* Scenario Breakdown */}
                      <div style={{ marginTop: 24 }}>
                        <table className="tbl">
                          <thead>
                            <tr>
                              <th>Scenario</th>
                              <th className="r">Probability</th>
                              <th className="r">Share Price</th>
                              <th className="r">Return</th>
                              <th className="r">Weighted Contribution</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SCENARIO_KEYS.map(key => {
                              const s = SCENARIO_SIMULATIONS[key];
                              const p = s.projections.find(proj => proj.year === simTargetYear);
                              if (!p) return null;
                              const ret = ((p.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100;
                              const contribution = p.sharePrice * (s.probability / 100);
                              return (
                                <tr key={key} style={{ background: simScenario === key ? `${s.color}11` : 'transparent' }}>
                                  <td>
                                    <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: s.color, marginRight: 8 }}></span>
                                    {s.name}
                                  </td>
                                  <td className="r">{s.probability}%</td>
                                  <td className="r" style={{ fontFamily: 'Space Mono' }}>${p.sharePrice.toLocaleString()}</td>
                                  <td className="r" style={{ color: ret >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                                    {ret >= 0 ? '+' : ''}{ret.toFixed(0)}%
                                  </td>
                                  <td className="r" style={{ fontFamily: 'Space Mono', color: 'var(--sky)' }}>${contribution.toFixed(0)}</td>
                                </tr>
                              );
                            })}
                            <tr style={{ fontWeight: 700, borderTop: '2px solid var(--border)' }}>
                              <td>Expected Value</td>
                              <td className="r">100%</td>
                              <td className="r mint" style={{ fontFamily: 'Space Mono' }}>${pwev.sharePrice.toFixed(0)}</td>
                              <td className="r mint">{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</td>
                              <td className="r mint" style={{ fontFamily: 'Space Mono' }}>${pwev.sharePrice.toFixed(0)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* All Scenarios Comparison */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">All Scenarios — {simTargetYear} Comparison</div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        {SCENARIO_KEYS.map(key => {
                          const s = SCENARIO_SIMULATIONS[key];
                          return <th key={key} className="r" style={{ color: s.color }}>{s.name}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const projections = SCENARIO_KEYS.map(key => 
                          SCENARIO_SIMULATIONS[key].projections.find(p => p.year === simTargetYear)
                        );
                        return (
                          <>
                            <tr>
                              <td>USDC ($B)</td>
                              {projections.map((p, i) => <td key={i} className="r">{p?.usdc || '—'}</td>)}
                            </tr>
                            <tr>
                              <td>Gross Revenue ($B)</td>
                              {projections.map((p, i) => <td key={i} className="r">${p?.grossRevenue.toFixed(1) || '—'}</td>)}
                            </tr>
                            <tr>
                              <td>Net Income ($B)</td>
                              {projections.map((p, i) => (
                                <td key={i} className="r" style={{ color: (p?.netIncome || 0) >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                                  {p ? (p.netIncome >= 0 ? `$${p.netIncome.toFixed(2)}` : `($${Math.abs(p.netIncome).toFixed(2)})`) : '—'}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Exit Multiple (P/S)</td>
                              {projections.map((p, i) => <td key={i} className="r">{p?.exitMultiple}x</td>)}
                            </tr>
                            <tr>
                              <td>Equity Value ($B)</td>
                              {projections.map((p, i) => <td key={i} className="r">${p?.equityValue || '—'}</td>)}
                            </tr>
                            <tr style={{ fontWeight: 700 }}>
                              <td>Share Price</td>
                              {projections.map((p, i) => (
                                <td key={i} className="r" style={{ color: SCENARIO_SIMULATIONS[SCENARIO_KEYS[i]].color }}>
                                  ${p?.sharePrice.toLocaleString() || '—'}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Return vs Today</td>
                              {projections.map((p, i) => {
                                const ret = p ? ((p.sharePrice / CURRENT_METRICS.sharePrice) - 1) * 100 : 0;
                                return (
                                  <td key={i} className="r" style={{ color: ret >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
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
              <div className="card" style={{ marginTop: 24 }}><div className="card-title">Key Insights</div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-violet-400 mb-2">Interest Rate Sensitivity</h4>
                    <p className="text-slate-300">Reserve income is directly tied to Fed rates. Each 100bp rate cut reduces gross revenue by ~$737M annually at current circulation. Rate cuts are the primary bear case risk.</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-violet-400 mb-2">Coinbase Dependency</h4>
                    <p className="text-slate-300">~54% of gross revenue goes to Coinbase as distribution cost. Renegotiating this agreement or diversifying distribution (CPN, direct bank partnerships) is key to margin expansion.</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-violet-400 mb-2">Regulatory Moat</h4>
                    <p className="text-slate-300">Circle's regulatory-first approach (state licenses, MiCA compliance, OCC charter) creates barriers to entry. GENIUS Act could cement USDC as the preferred regulated stablecoin for TradFi.</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-violet-400 mb-2">Risk/Reward</h4>
                    <p className="text-slate-300">Bear case scenarios model rate cuts + market share loss. Bull cases require continued USDC growth + multiple expansion to payment network peers. Asymmetric if stablecoin adoption accelerates.</p>
                  </div>
                </div>
              </div>

              {/* Methodology & Assumptions */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">Methodology & Assumptions</div>
                <div className="g2">
                  <div>
                    <h4 style={{ color: 'var(--mint)', marginBottom: 12 }}>Valuation Framework</h4>
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
                    <h4 style={{ color: 'var(--sky)', marginBottom: 12 }}>Key Model Inputs</h4>
                    <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
                      <li><strong>Stablecoin TAM:</strong> $250B (2025) → $500B-2T (2030) depending on scenario</li>
                      <li><strong>Fed Funds Rate:</strong> 4.0-4.5% (2025) → 1.5-4.0% (2030) depending on scenario</li>
                      <li><strong>Market Share:</strong> Current 29% vs Tether 65%; varies 8-48% by scenario</li>
                      <li><strong>Exit Multiples:</strong> 0.5x (distressed) to 18x (Visa-like network)</li>
                      <li><strong>Probabilities:</strong> Assigned based on qualitative assessment of macro/regulatory risks</li>
                    </ul>
                  </div>
                </div>
                <div style={{ marginTop: 24, padding: 16, background: 'var(--surface2)', borderRadius: 8 }}>
                  <h4 style={{ color: 'var(--gold)', marginBottom: 12 }}>Important Caveats</h4>
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
              
              <CFANotes title="CFA Level III — Scenario Modeling" items={[
                { term: 'Scenario Framework', def: 'Define discrete future states (Bull/Base/Bear) with specific assumptions for each. More structured than point estimates.' },
                { term: 'Revenue Drivers', def: 'For Circle: USDC circulation × interest rate × Circle\'s share. Decompose into controllable vs market-driven factors.' },
                { term: 'Margin Assumptions', def: 'Operating leverage means margins expand with scale. Test different terminal margin assumptions.' },
                { term: 'Probability Weighting', def: 'Assign probabilities to scenarios. Expected value = Σ(probability × outcome). Be honest about uncertainty.' },
                { term: 'Sensitivity Tables', def: 'Two-variable matrices show interaction effects. Key for understanding non-linear relationships.' },
                { term: 'Target Year Selection', def: 'Choose time horizon based on investment thesis. Longer horizons have more uncertainty but show full potential.' },
              ]} />
            </>
          )}

          {activeTab === 'timeline' && (
            <>
              <h2 className="section-head">Company Timeline</h2>
              
              {/* Latest SEC Filings - Enhanced with filtering and pagination */}
              <div className="card" style={{ marginBottom: 32 }}>
                <div className="card-title">📁 SEC Filings</div>
                
                {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {secFilterTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => { setSecFilter(type); setShowAllFilings(false); }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        background: secFilter === type ? 'var(--mint)' : 'var(--surface3)',
                        color: secFilter === type ? 'white' : 'var(--text2)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                
                {/* Filings Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Period</th>
                        <th className="r">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedFilings.map((filing, idx) => (
                        <tr key={idx}>
                          <td style={{ whiteSpace: 'nowrap' }}>{filing.date}</td>
                          <td>
                            <span style={{ 
                              background: secTypeColors[filing.type]?.bg || 'rgba(100,100,100,0.2)', 
                              color: secTypeColors[filing.type]?.text || 'var(--text2)', 
                              padding: '2px 8px', 
                              borderRadius: 4, 
                              fontSize: 11, 
                              fontWeight: 600 
                            }}>
                              {filing.type}
                            </span>
                          </td>
                          <td>{filing.description}</td>
                          <td>{filing.period}</td>
                          <td className="r">
                            <a 
                              href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${secMeta.cik}&type=${filing.type}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ color: 'var(--mint)' }}
                            >
                              SEC →
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Show More/Less Button */}
                {filteredFilings.length > 6 && (
                  <button
                    onClick={() => setShowAllFilings(!showAllFilings)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: 12,
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: 6,
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
                <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12, marginBottom: 8 }}>
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
                    <span style={{ color: 'var(--mint)' }}>●</span>
                    <span>Last PR Processed: {secMeta.lastPR.date} — {secMeta.lastPR.title}</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="g2" style={{ marginBottom: 32 }}>
                <div className="card">
                  <div className="card-title">Upcoming Events</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text)' }}>Q4 2025 Earnings</div>
                        <div style={{ fontSize: 12, color: 'var(--text3)' }}>10-K Annual Report</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Space Mono', color: 'var(--mint)' }}>~Feb 2026</div>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text)' }}>Lock-up Expiry</div>
                        <div style={{ fontSize: 12, color: 'var(--text3)' }}>~198M shares eligible for sale</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Space Mono', color: 'var(--gold)' }}>Dec 2025</div>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>180 days post-IPO</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
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

                <div className="card">
                  <div className="card-title">Recent Press Releases</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--text3)' }}>Dec 12, 2025</span>
                        <span style={{ fontSize: 11, color: 'var(--gold)' }}>Regulatory</span>
                      </div>
                      <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>OCC Grants Preliminary Approval for National Bank Charter</div>
                    </div>
                    <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--text3)' }}>Nov 12, 2025</span>
                        <span style={{ fontSize: 11, color: 'var(--mint)' }}>Earnings</span>
                      </div>
                      <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Circle Reports Q3 2025 Results: $740M Revenue, USDC at $73.7B</div>
                    </div>
                    <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--text3)' }}>Oct 29, 2025</span>
                        <span style={{ fontSize: 11, color: 'var(--sky)' }}>Partnership</span>
                      </div>
                      <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Binance to Adopt USYC for Yield-Bearing Treasury Holdings</div>
                    </div>
                    <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--text3)' }}>Aug 12, 2025</span>
                        <span style={{ fontSize: 11, color: 'var(--violet)' }}>Corporate</span>
                      </div>
                      <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Circle Launches Follow-on Offering (10M shares)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Event Timeline Section */}
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span>Event Timeline</span>
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text3)' }}>({filteredEvents.length} events)</span>
              </h3>

              {/* Topic Filters (AND logic multi-select) */}
              <div className="highlight" style={{ padding: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Filter by Topic</span>
                  {selectedTopics.length > 0 && (
                    <button 
                      onClick={() => setSelectedTopics([])}
                      className="pill"
                      style={{ fontSize: 11 }}
                    >
                      Clear ({selectedTopics.length})
                    </button>
                  )}
                </div>
                <div className="pills">
                  {Object.entries(topicTags).map(([topic, style]) => {
                    const isSelected = selectedTopics.includes(topic);
                    const count = TIMELINE.filter(p => detectTopics(p).includes(topic)).length;
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`pill ${isSelected ? 'active' : ''}`}
                        style={isSelected ? { background: style.color, borderColor: style.color } : {}}
                      >
                        {style.label} ({count})
                      </button>
                    );
                  })}
                </div>
                {selectedTopics.length > 0 && (
                  <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)' }}>
                    {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEvents.length} results
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div className="pills" style={{ marginBottom: 0 }}>
                  {cats.map(c => (
                    <button key={c} className={`pill ${timelineCat === c ? 'active' : ''}`} onClick={() => setTimelineCat(c)}>
                      {c === 'All' ? `All (${TIMELINE.length})` : `${c} (${TIMELINE.filter(p => p.category === c).length})`}
                    </button>
                  ))}
                </div>
                <button 
                  className="pill"
                  onClick={() => {
                    if (expanded.size === filteredEvents.length) {
                      setExpanded(new Set());
                    } else {
                      setExpanded(new Set(filteredEvents.map(p => TIMELINE.indexOf(p))));
                    }
                  }}
                  style={{ whiteSpace: 'nowrap' }}
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
                  
                  return (
                    <div key={idx} className={`timeline-item ${isExpanded ? 'expanded' : ''}`}>
                      <div className="timeline-header" onClick={toggleExpand}>
                        <div className="t-date">{p.date}</div>
                        <div className="t-cat">{p.category}</div>
                        <div className="t-event">{p.event}</div>
                        <div className={`t-verdict ${p.verdict}`}>
                          {p.verdict === 'positive' && '↑'}
                          {p.verdict === 'negative' && '↓'}
                          {p.verdict === 'mixed' && '↔'}
                          {p.verdict}
                        </div>
                        <div className="t-toggle">▼</div>
                      </div>
                      <div className="timeline-details">
                        <div className="t-details-content">
                          <div className="t-details-text">{p.details}</div>
                          <div className="t-details-meta">
                            <div className="t-meta-item">
                              <div className="t-meta-label">Impact</div>
                              <div className="t-meta-value">{p.impact}</div>
                            </div>
                            <div className="t-meta-item">
                              <div className="t-meta-label">Source</div>
                              <div className="t-meta-value mint">{p.source}</div>
                            </div>
                            <div className="t-meta-item">
                              <div className="t-meta-label">Verdict</div>
                              <div className={`t-meta-value ${p.verdict === 'positive' ? 'mint' : p.verdict === 'negative' ? 'coral' : 'sky'}`}>
                                {p.verdict === 'positive' && '● Bullish'}
                                {p.verdict === 'negative' && '● Bearish'}
                                {p.verdict === 'mixed' && '● Neutral'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* How to Use */}
              <div className="card"><div className="card-title">How to Use This Log</div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-mint font-medium mb-2">Categories Explained</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li><span className="text-orange-400">Partnership:</span> Commercial integrations, strategic alliances</li>
                      <li><span className="text-blue-400">Product:</span> USDC features, protocol upgrades, launches</li>
                      <li><span className="text-pink-400">Regulatory:</span> Licenses, compliance, legal milestones</li>
                      <li><span className="text-emerald-400">Corporate:</span> Leadership, financing, M&A, governance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-mint font-medium mb-2">Updating This Log</h4>
                    <ul className="space-y-1 text-slate-300">
                      <li>• Add new entries chronologically at the top</li>
                      <li>• Include sources for traceability</li>
                      <li>• Tag verdict: Positive/Negative/Neutral</li>
                      <li>• Add context in details field</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <CFANotes title="CFA Level III — Timeline Analysis" items={[
                { term: 'SEC Filing Types', def: '10-K (annual), 10-Q (quarterly), 8-K (material events), S-1 (IPO registration), S-3 (shelf registration). Each serves different disclosure purpose.' },
                { term: 'Material Events', def: 'Earnings, major contracts, management changes, M&A. 8-K filings required within 4 business days.' },
                { term: 'Guidance vs Actuals', def: 'Track management forecasts against results. Pattern reveals management credibility and conservatism.' },
                { term: 'Milestone Tracking', def: 'Key business achievements over time. Helps assess execution quality and pace of progress.' },
                { term: 'Category Filtering', def: 'Sort events by type (regulatory, product, financial, etc.) to focus on specific thesis elements.' },
              ]} />
            </>
          )}

          {activeTab === 'comps' && (
            <>
              <h2 className="section-head">Comparable Companies Analysis</h2>
              
              {/* Highlight Box */}
              <div className="highlight">
                <h3>Peer Analysis Framework</h3>
                <p className="text-sm">
                  Circle sits at the intersection of multiple peer groups: crypto infrastructure (Coinbase), 
                  payments networks (Visa, PayPal), and high-growth fintech. Each lens provides different valuation 
                  context. Crypto peers trade at premium P/S; payments peers show margin potential.
                </p>
              </div>
              
              {/* Peer Group Selector */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {Object.entries(PEER_GROUPS).map(([key, group]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPeerGroup(key)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: selectedPeerGroup === key ? '2px solid var(--mint)' : '1px solid var(--border)',
                      background: selectedPeerGroup === key ? 'rgba(0,212,170,0.1)' : 'var(--surface2)',
                      color: selectedPeerGroup === key ? 'var(--mint)' : 'var(--text2)',
                      cursor: 'pointer',
                      fontWeight: selectedPeerGroup === key ? 600 : 400,
                      fontSize: 13,
                    }}
                  >
                    {group.name}
                  </button>
                ))}
              </div>

              {/* Selected Peer Group Table */}
              <div className="card">
                <div className="card-title">{currentPeers.name}</div>
                <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 16 }}>{currentPeers.description}</p>
                <div style={{ overflowX: 'auto' }}>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th className="r">Mkt Cap</th>
                        <th className="r">Revenue</th>
                        <th className="r">EBITDA</th>
                        <th className="r">P/E</th>
                        <th className="r">Margin</th>
                        <th className="r">Growth</th>
                        <th className="r">P/S</th>
                        <th className="r">EV/EBITDA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPeers.peers.map((p, i) => (
                        <tr key={i} style={{ background: p.highlight ? 'rgba(0,212,170,0.08)' : 'transparent' }}>
                          <td>
                            <div style={{ fontWeight: p.highlight ? 700 : 500 }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{p.ticker}</div>
                          </td>
                          <td className="r">{p.cap ? `$${p.cap}B` : 'Private'}</td>
                          <td className="r">${p.rev}B</td>
                          <td className="r">{p.ebitda > 0 ? `$${p.ebitda}B` : p.ebitda < 0 ? `($${Math.abs(p.ebitda)}B)` : '—'}</td>
                          <td className="r">{p.pe ? `${p.pe}x` : '—'}</td>
                          <td className="r" style={{ color: p.margin >= 30 ? 'var(--mint)' : p.margin < 0 ? 'var(--coral)' : 'inherit' }}>{p.margin}%</td>
                          <td className="r" style={{ color: p.growth >= 30 ? 'var(--mint)' : 'inherit' }}>{p.growth}%</td>
                          <td className="r mint">{p.cap ? `${(p.cap / p.rev).toFixed(1)}x` : '—'}</td>
                          <td className="r sky">{p.cap && p.ebitda > 0 ? `${(p.cap / p.ebitda).toFixed(1)}x` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Circle-Specific Business Model Metrics */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">Circle Business Model Metrics</div>
                <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 16 }}>Unique metrics for stablecoin issuers — monetization of reserves</p>
                <div className="g4">
                  <div className="big-stat">
                    <div className="num">{CIRCLE_METRICS.revenuePerUSDC}¢</div>
                    <div className="lbl">Rev per $1 USDC</div>
                  </div>
                  <div className="big-stat">
                    <div className="num">{CIRCLE_METRICS.grossTakeRate}%</div>
                    <div className="lbl">Gross Take Rate</div>
                  </div>
                  <div className="big-stat">
                    <div className="num">{CIRCLE_METRICS.distributionCostPct}%</div>
                    <div className="lbl">Coinbase Share</div>
                  </div>
                  <div className="big-stat">
                    <div className="num">{CIRCLE_METRICS.netTakeRate}%</div>
                    <div className="lbl">Net Take Rate</div>
                  </div>
                </div>
                <div style={{ marginTop: 20, padding: 16, background: 'var(--surface2)', borderRadius: 8 }}>
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
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">Implied Valuation Matrix</div>
                <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 16 }}>Circle's value under different peer multiples (current: $18.9B)</p>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Peer Basis</th>
                      <th className="r">Multiple</th>
                      <th className="r">Implied Value</th>
                      <th className="r">Premium/(Discount)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VALUATION_MATRIX.map((v, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{v.method}</td>
                        <td>{v.basis}</td>
                        <td className="r">{v.multiple}x</td>
                        <td className="r mint">${v.implied.toFixed(1)}B</td>
                        <td className="r" style={{ color: v.premium >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                          {v.premium >= 0 ? '+' : ''}{v.premium.toFixed(0)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Growth vs P/S Scatter Plot */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">Growth vs. P/S Multiple</div>
                <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 16 }}>Circle's positioning relative to peers (bubble size = market cap)</p>
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
                        contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}
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
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12, fontSize: 12 }}>
                  <span><span style={{ color: 'var(--mint)' }}>★</span> Circle</span>
                  <span><span style={{ color: 'var(--sky)' }}>●</span> Crypto</span>
                  <span><span style={{ color: 'var(--violet)' }}>●</span> Networks</span>
                  <span><span style={{ color: 'var(--gold)' }}>●</span> Payments</span>
                </div>
              </div>

              <div className="g2" style={{ marginTop: 24 }}>
                {/* SOTP Valuation */}
                <div className="card">
                  <div className="card-title">Sum-of-the-Parts (SOTP)</div>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Segment</th>
                        <th className="r">Metric</th>
                        <th className="r">Multiple</th>
                        <th className="r">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SOTP.map((s, i) => (
                        <tr key={i}>
                          <td>
                            <div style={{ fontWeight: 500 }}>{s.segment}</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.basis}</div>
                          </td>
                          <td className="r">{s.metric}</td>
                          <td className="r">{s.multiple}</td>
                          <td className="r mint">
                            {s.value ? `$${s.value}B` : s.valueLow && s.valueHigh ? `$${s.valueLow}-${s.valueHigh}B` : '—'}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                        <td colSpan={3}>SOTP Range</td>
                        <td className="r mint">$15.5-17.5B</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)' }}>
                    Current market cap: $18.9B ({((18.9 / 16.5 - 1) * 100).toFixed(0)}% premium to midpoint)
                  </div>
                </div>

                {/* Transaction Comps */}
                <div className="card">
                  <div className="card-title">Transaction Comps</div>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Target</th>
                        <th className="r">Value</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRANSACTIONS.map((t, i) => (
                        <tr key={i}>
                          <td style={{ fontSize: 12 }}>{t.date}</td>
                          <td>
                            <div style={{ fontWeight: 500 }}>{t.target}</div>
                            {t.notes && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.notes}</div>}
                          </td>
                          <td className="r">{t.value ? `$${t.value}B` : '—'}</td>
                          <td><span style={{ 
                            fontSize: 11, 
                            padding: '2px 6px', 
                            borderRadius: 4, 
                            background: t.type === 'M&A' ? 'rgba(0,212,170,0.2)' : t.type === 'Funding' ? 'rgba(100,149,237,0.2)' : 'rgba(255,193,7,0.2)',
                            color: t.type === 'M&A' ? 'var(--mint)' : t.type === 'Funding' ? 'var(--sky)' : 'var(--gold)'
                          }}>{t.type}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sensitivity Matrix */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">Valuation Sensitivity: USDC × Interest Rates</div>
                <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 16 }}>Implied enterprise value at Coinbase P/S multiple (13x net revenue)</p>
                <div style={{ overflowX: 'auto' }}>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>USDC ($B) ↓ / Rate → </th>
                        {SENSITIVITY_RATES.map(r => <th key={r} className="r">{r}%</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {SENSITIVITY_USDC.map(usdc => (
                        <tr key={usdc}>
                          <td style={{ fontWeight: 600 }}>${usdc}B</td>
                          {SENSITIVITY_RATES.map(rate => {
                            const val = calcSensitivity(usdc, rate, 13);
                            const isNear = Math.abs(usdc - 73.7) < 15 && Math.abs(rate - 4.0) < 0.5;
                            return (
                              <td key={rate} className="r" style={{ 
                                background: isNear ? 'rgba(0,212,170,0.15)' : 'transparent',
                                fontWeight: isNear ? 600 : 400,
                                color: isNear ? 'var(--mint)' : 'inherit'
                              }}>
                                ${val.toFixed(1)}B
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)' }}>
                  Highlighted: Current USDC (~$74B) × Current rate (~4%). Assumes 45% net revenue margin after Coinbase distribution costs.
                </div>
              </div>

              {/* Historical Multiple Tracking */}
              <div className="card" style={{ marginTop: 24 }}>
                <div className="card-title">P/S Multiple Since IPO</div>
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={HISTORICAL_MULTIPLES} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" stroke="var(--text3)" tick={{ fill: 'var(--text3)', fontSize: 11 }} />
                      <YAxis stroke="var(--text3)" tick={{ fill: 'var(--text3)', fontSize: 11 }} domain={[0, 16]} />
                      <RechartsTooltip 
                        contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}
                        formatter={(value: any) => [`${value}x`, '']}
                      />
                      <Line type="monotone" dataKey="crcl" stroke="var(--mint)" strokeWidth={3} dot={{ fill: 'var(--mint)', r: 4 }} name="Circle" />
                      <Line type="monotone" dataKey="coinAvg" stroke="var(--sky)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Crypto Avg" />
                      <Line type="monotone" dataKey="paymentsAvg" stroke="var(--gold)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Payments Avg" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 12, fontSize: 12 }}>
                  <span><span style={{ color: 'var(--mint)' }}>━━</span> Circle P/S</span>
                  <span><span style={{ color: 'var(--sky)' }}>╌╌</span> Crypto Peer Avg</span>
                  <span><span style={{ color: 'var(--gold)' }}>╌╌</span> Payments Peer Avg</span>
                </div>
              </div>

              {/* Rule of 40 Analysis */}
              <div className="highlight" style={{ marginTop: 24 }}>
                <h3>Rule of 40 Analysis</h3>
                <p style={{ marginBottom: 16 }}>Growth Rate + Profit Margin ≥ 40% indicates healthy SaaS/fintech</p>
                <div className="g4">
                  <div className="big-stat">
                    <div className="num mint">105</div>
                    <div className="lbl">Circle (66% + 39%)</div>
                  </div>
                  <div className="big-stat">
                    <div className="num">55</div>
                    <div className="lbl">Coinbase (30% + 25%)</div>
                  </div>
                  <div className="big-stat">
                    <div className="num">26</div>
                    <div className="lbl">PayPal (8% + 18%)</div>
                  </div>
                  <div className="big-stat">
                    <div className="num">77</div>
                    <div className="lbl">Visa (10% + 67%)</div>
                  </div>
                </div>
              </div>
              
              <CFANotes title="CFA Level III — Comparable Analysis" items={[
                { term: 'Peer Selection', def: 'Choose comps based on business model similarity, growth profile, and market positioning. No perfect comps for novel businesses like Circle.' },
                { term: 'P/S (Price/Sales)', def: 'Primary multiple for high-growth, pre-profit companies. Compare Circle to fintech and payments peers.' },
                { term: 'EV/EBITDA', def: 'Enterprise value relative to operating profit. Better for profitable companies. Removes capital structure differences.' },
                { term: 'Growth-Adjusted Multiples', def: 'PEG ratio = P/E ÷ Growth Rate. Higher growth justifies higher multiples. Circle\'s growth should command premium.' },
                { term: 'Sum-of-Parts (SOTP)', def: 'Value each business segment separately and sum. Useful for conglomerates or platform businesses with distinct units.' },
                { term: 'Relative Valuation Caveats', def: 'Market may misprice entire sector. Use comps for context but anchor to intrinsic value (DCF).' },
              ]} />
            </>
          )}

          {activeTab === 'wall-street' && (
            <WallStreetTab />
          )}
        </main>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════

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
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DERIVED METRICS AND HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Get latest report from each firm for consensus calculations
  const latestByFirm = ANALYST_COVERAGE.map(coverage => ({
    firm: coverage.firm,
    analyst: coverage.analyst,
    priceTarget: coverage.currentPT,
    rating: coverage.currentRating,
    ratingNormalized: coverage.currentRatingNormalized,
    latestDate: coverage.reports[0]?.date || ''
  }));
  
  // Calculate consensus metrics from current ratings only
  const firmsWithPT = latestByFirm.filter(f => f.priceTarget !== null);
  const avgPT = firmsWithPT.length > 0 
    ? firmsWithPT.reduce((sum, f) => sum + (f.priceTarget || 0), 0) / firmsWithPT.length 
    : null;
  const highPT = firmsWithPT.length > 0 ? Math.max(...firmsWithPT.map(f => f.priceTarget || 0)) : null;
  const lowPT = firmsWithPT.length > 0 ? Math.min(...firmsWithPT.map(f => f.priceTarget || 0)) : null;
  const medianPT = firmsWithPT.length > 0 ? (() => {
    const sorted = [...firmsWithPT].map(f => f.priceTarget || 0).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  })() : null;
  
  // Rating counts by normalized category
  const ratingCounts = {
    bullish: latestByFirm.filter(f => f.ratingNormalized === 'bullish').length,
    neutral: latestByFirm.filter(f => f.ratingNormalized === 'neutral').length,
    bearish: latestByFirm.filter(f => f.ratingNormalized === 'bearish').length,
  };
  const totalAnalysts = ANALYST_COVERAGE.length;
  
  // Rating color helper
  const getRatingColor = (rating: string, normalized?: 'bullish' | 'neutral' | 'bearish') => {
    if (normalized) {
      switch (normalized) {
        case 'bullish': return 'var(--mint)';
        case 'neutral': return 'var(--gold)';
        case 'bearish': return 'var(--coral)';
      }
    }
    switch (rating) {
      case 'Strong Buy': case 'Buy': case 'Overweight': return 'var(--mint)';
      case 'Hold': case 'Neutral': case 'Market Perform': case 'Sector Perform': case 'Perform': return 'var(--gold)';
      case 'Underperform': case 'Underweight': case 'Sector Underperform': case 'Sell': return 'var(--coral)';
      default: return 'var(--text2)';
    }
  };
  
  const getActionColor = (action: string) => {
    switch (action) {
      case 'Initiation': return 'var(--mint)';
      case 'Upgrade': case 'PT Raise': return 'var(--mint)';
      case 'Downgrade': case 'PT Cut': case 'Double Downgrade': return 'var(--coral)';
      case 'Reiterate': case 'Maintained': case 'Update': return 'var(--text3)';
      case 'Drop': return 'var(--coral)';
      default: return 'var(--text3)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="section-head">Wall Street Coverage</h2>
      
      {/* Consensus Snapshot */}
      <div className="card">
        <div className="card-title">📊 Consensus Snapshot</div>
        <div className="g2">
          {/* Price Target Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>AVG PT</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--mint)', fontFamily: 'Space Mono' }}>
                  {avgPT ? `$${avgPT.toFixed(0)}` : '—'}
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>MEDIAN PT</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--sky)', fontFamily: 'Space Mono' }}>
                  {medianPT ? `$${medianPT.toFixed(0)}` : '—'}
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>HIGH / LOW</div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Space Mono' }}>
                  <span style={{ color: 'var(--mint)' }}>{highPT ? `$${highPT}` : '—'}</span>
                  <span style={{ color: 'var(--text3)' }}> / </span>
                  <span style={{ color: 'var(--coral)' }}>{lowPT ? `$${lowPT}` : '—'}</span>
                </div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>ANALYSTS</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', fontFamily: 'Space Mono' }}>
                  {totalAnalysts}
                </div>
              </div>
            </div>
          </div>
          
          {/* Ratings Distribution */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>RATINGS DISTRIBUTION</div>
            {totalAnalysts > 0 ? (
              <>
                <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
                  {ratingCounts.bullish > 0 && (
                    <div style={{ width: `${(ratingCounts.bullish / totalAnalysts) * 100}%`, background: 'var(--mint)' }} />
                  )}
                  {ratingCounts.neutral > 0 && (
                    <div style={{ width: `${(ratingCounts.neutral / totalAnalysts) * 100}%`, background: 'var(--gold)' }} />
                  )}
                  {ratingCounts.bearish > 0 && (
                    <div style={{ width: `${(ratingCounts.bearish / totalAnalysts) * 100}%`, background: 'var(--coral)' }} />
                  )}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                  <span style={{ color: 'var(--mint)' }}>● Buy/OW: {ratingCounts.bullish}</span>
                  <span style={{ color: 'var(--gold)' }}>● Hold/Neutral: {ratingCounts.neutral}</span>
                  <span style={{ color: 'var(--coral)' }}>● Sell/UW: {ratingCounts.bearish}</span>
                </div>
              </>
            ) : (
              <div style={{ color: 'var(--text3)', fontSize: 13 }}>No analyst coverage data yet</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Coverage by Firm - Grouped Cards */}
      <div className="card">
        <div className="card-title">🏦 Coverage by Firm ({totalAnalysts} Analyst{totalAnalysts !== 1 ? 's' : ''})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ANALYST_COVERAGE.map((coverage) => {
            const isExpanded = expandedFirm === coverage.firm;
            const fullReportCount = coverage.reports.filter(r => r.isFullReport).length;
            const updateCount = coverage.reports.filter(r => !r.isFullReport).length;
            
            return (
              <div 
                key={coverage.firm}
                style={{ 
                  background: 'var(--surface2)', 
                  borderRadius: 8,
                  border: isExpanded ? '1px solid var(--mint)' : '1px solid var(--border)',
                  overflow: 'hidden'
                }}
              >
                {/* Firm Header - Always Visible */}
                <div 
                  onClick={() => setExpandedFirm(isExpanded ? null : coverage.firm)}
                  style={{ 
                    padding: 16, 
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>{coverage.firm}</div>
                      <div style={{ color: 'var(--text3)', fontSize: 12 }}>{coverage.analyst} · Since {coverage.coverageSince}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Current Rating Badge */}
                    <div style={{ 
                      padding: '4px 12px', 
                      borderRadius: 6, 
                      background: `${getRatingColor(coverage.currentRating, coverage.currentRatingNormalized)}22`,
                      border: `1px solid ${getRatingColor(coverage.currentRating, coverage.currentRatingNormalized)}44`,
                    }}>
                      <span style={{ color: getRatingColor(coverage.currentRating, coverage.currentRatingNormalized), fontWeight: 600, fontSize: 12 }}>
                        {coverage.currentRating.toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Current PT */}
                    <div style={{ fontFamily: 'Space Mono', textAlign: 'right', minWidth: 60 }}>
                      <span style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>
                        {coverage.currentPT ? `$${coverage.currentPT}` : '—'}
                      </span>
                    </div>
                    
                    {/* Report counts */}
                    <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                      <span style={{ padding: '2px 6px', background: 'var(--mint)', color: 'white', borderRadius: 4 }}>
                        {fullReportCount} Report{fullReportCount !== 1 ? 's' : ''}
                      </span>
                      {updateCount > 0 && (
                        <span style={{ padding: '2px 6px', background: 'var(--surface3)', color: 'var(--text3)', borderRadius: 4 }}>
                          {updateCount} Update{updateCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    
                    {/* Expand indicator */}
                    <span style={{ color: 'var(--text3)', fontSize: 12 }}>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>
                </div>
                
                {/* Expanded History */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--border)', padding: 16, background: 'var(--surface)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12 }}>COVERAGE HISTORY ({coverage.reports.length} entr{coverage.reports.length !== 1 ? 'ies' : 'y'})</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {coverage.reports.map((report, idx) => {
                        const reportKey = `${coverage.firm}-${idx}`;
                        const isReportExpanded = expandedReportIdx === reportKey;
                        
                        return (
                          <div 
                            key={idx}
                            style={{ 
                              padding: 12, 
                              background: report.isFullReport ? 'var(--surface2)' : 'var(--surface)',
                              borderRadius: 6,
                              borderLeft: report.isFullReport ? '3px solid var(--mint)' : '3px solid var(--border)'
                            }}
                          >
                            {/* Report Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ color: 'var(--text3)', fontSize: 12, minWidth: 90 }}>
                                  {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span style={{ 
                                  color: getActionColor(report.action),
                                  fontSize: 11,
                                  fontWeight: 600,
                                  padding: '2px 8px',
                                  background: `${getActionColor(report.action)}22`,
                                  borderRadius: 4
                                }}>
                                  {report.action}
                                </span>
                                <span style={{ color: getRatingColor(report.rating, report.ratingNormalized), fontSize: 12, fontWeight: 500 }}>
                                  {report.rating}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontFamily: 'Space Mono', color: 'var(--text)', fontSize: 14 }}>
                                  {report.priceTarget ? `$${report.priceTarget}` : '—'}
                                  {report.previousTarget && (
                                    <span style={{ color: 'var(--text3)', fontSize: 11 }}> ← ${report.previousTarget}</span>
                                  )}
                                </span>
                                {report.source && (
                                  <a 
                                    href={report.sourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ fontSize: 10, color: 'var(--mint)', textDecoration: 'none' }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {report.source}
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            {/* Report Title if exists */}
                            {report.reportTitle && (
                              <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 6, fontStyle: 'italic' }}>
                                "{report.reportTitle}"
                              </div>
                            )}
                            
                            {/* Full report content (expandable) */}
                            {report.isFullReport && report.thesis && (
                              <>
                                <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>
                                  {report.thesis}
                                </div>
                                
                                {(report.reportSummary || report.assumptions || report.estimates) && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedReportIdx(isReportExpanded ? null : reportKey);
                                    }}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: 'var(--mint)',
                                      fontSize: 11,
                                      cursor: 'pointer',
                                      padding: '4px 0',
                                      marginTop: 8
                                    }}
                                  >
                                    {isReportExpanded ? '▼ Less details' : '▶ Full report details'}
                                  </button>
                                )}
                                
                                {isReportExpanded && (
                                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                                    {report.reportSummary && (
                                      <div style={{ 
                                        background: 'var(--surface)', 
                                        padding: 12, 
                                        borderRadius: 6, 
                                        marginBottom: 12,
                                        fontSize: 12,
                                        color: 'var(--text2)',
                                        lineHeight: 1.6,
                                        whiteSpace: 'pre-wrap'
                                      }}>
                                        {report.reportSummary.split('\n\n').map((paragraph, pIdx) => {
                                          const headerMatch = paragraph.match(/^\*\*(.+?)\*\*/);
                                          if (headerMatch) {
                                            const header = headerMatch[1];
                                            const rest = paragraph.replace(/^\*\*.+?\*\*\s*/, '');
                                            return (
                                              <div key={pIdx} style={{ marginBottom: 10 }}>
                                                <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: 11, marginBottom: 4 }}>{header}</div>
                                                <div>{rest}</div>
                                              </div>
                                            );
                                          }
                                          return <div key={pIdx} style={{ marginBottom: 8 }}>{paragraph}</div>;
                                        })}
                                      </div>
                                    )}
                                    
                                    {report.assumptions && report.assumptions.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 6 }}>KEY ASSUMPTIONS</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                          {report.assumptions.map((a, i) => (
                                            <span key={i} style={{ padding: '3px 8px', background: 'var(--surface)', borderRadius: 4, fontSize: 11, color: 'var(--text2)' }}>
                                              {a.label}: <span style={{ color: 'var(--mint)' }}>{a.value}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {report.catalysts && report.catalysts.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--mint)', marginBottom: 4 }}>CATALYSTS</div>
                                        <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 11 }}>
                                          {report.catalysts.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {report.risks && report.risks.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--coral)', marginBottom: 4 }}>RISKS</div>
                                        <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 11 }}>
                                          {report.risks.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {report.estimates && report.estimates.length > 0 && (
                                      <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 10, color: 'var(--sky)', marginBottom: 4 }}>ESTIMATES</div>
                                        <table style={{ fontSize: 11, width: '100%' }}>
                                          <thead>
                                            <tr style={{ color: 'var(--text3)' }}>
                                              <th style={{ textAlign: 'left', fontWeight: 500 }}>Metric</th>
                                              <th style={{ textAlign: 'right', fontWeight: 500 }}>FY24</th>
                                              <th style={{ textAlign: 'right', fontWeight: 500 }}>FY25</th>
                                              <th style={{ textAlign: 'right', fontWeight: 500 }}>FY26</th>
                                              <th style={{ textAlign: 'right', fontWeight: 500 }}>FY27</th>
                                              <th style={{ textAlign: 'right', fontWeight: 500 }}>FY28</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {report.estimates.map((e, i) => (
                                              <tr key={i} style={{ color: 'var(--text2)' }}>
                                                <td>{e.metric}</td>
                                                <td style={{ textAlign: 'right', fontFamily: 'Space Mono' }}>{e.fy24 || '—'}</td>
                                                <td style={{ textAlign: 'right', fontFamily: 'Space Mono' }}>{e.fy25 || '—'}</td>
                                                <td style={{ textAlign: 'right', fontFamily: 'Space Mono' }}>{e.fy26 || '—'}</td>
                                                <td style={{ textAlign: 'right', fontFamily: 'Space Mono' }}>{e.fy27 || '—'}</td>
                                                <td style={{ textAlign: 'right', fontFamily: 'Space Mono' }}>{e.fy28 || '—'}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                    
                                    {report.methodology && (
                                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                                        <span>Methodology: </span>
                                        <span style={{ color: 'var(--text2)' }}>{report.methodology}</span>
                                      </div>
                                    )}
                                    
                                    {report.fullNotes && (
                                      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                                        {report.fullNotes}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* CFA Notes */}
      <CFANotes title="CFA Level III — Sell-Side Research" items={[
        { term: 'Price Target (PT)', def: 'Analyst\'s 12-month fair value estimate. Compare to current price for implied upside/downside. PTs cluster around consensus — outliers may have differentiated views or different assumptions.' },
        { term: 'Ratings Scale', def: 'Strong Buy (>20% upside), Buy/Overweight (10-20%), Hold/Neutral (±10%), Underperform/Underweight (-10-20%), Sell (>20% downside). Distribution skews bullish due to banking relationships.' },
        { term: 'Full Reports vs Updates', def: 'Full reports include thesis, methodology, estimates, and detailed analysis. Updates are quick PT/rating changes without full analysis — often react to news or earnings.' },
        { term: 'Consensus vs Variant', def: 'When your view differs from consensus, understand why. Variant perception + catalyst = alpha opportunity. But: "the market can stay irrational longer than you can stay solvent."' },
        { term: 'Conflicts of Interest', def: 'Investment banks have relationships with covered companies. Be aware of potential conflicts. Independent research may offer less conflicted views.' },
      ]} />
    </div>
  );
};

const CRCLWithErrorBoundary = () => (
  <FinancialModelErrorBoundary>
    <CRCLModel />
  </FinancialModelErrorBoundary>
);

export default CRCLWithErrorBoundary;
