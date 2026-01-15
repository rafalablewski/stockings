// @ts-nocheck
/**
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║                        🚨 MUST DO - READ FIRST 🚨                             ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  BEFORE MAKING ANY CHANGES OR UPDATES TO THIS FILE:                           ║
 * ║                                                                               ║
 * ║  1. PROVIDE A BRIEF REPORT of what you plan to change                         ║
 * ║  2. LIST the specific sections/lines affected                                 ║
 * ║  3. EXPLAIN the reason for each change                                        ║
 * ║  4. ASK FOR CONFIRMATION: "Shall we proceed with these changes?"              ║
 * ║                                                                               ║
 * ║  DO NOT modify any code until explicit approval is received.                  ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  This ensures all modifications are intentional and properly reviewed.        ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║  ASTS (AST SpaceMobile) Financial Analysis Model                              ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Version: 2.1.0                                                               ║
 * ║  Last Updated: January 12, 2026                                               ║
 * ║  Maintainer: Rafal (via Claude AI)                                            ║
 * ║                                                                               ║
 * ║  CHANGELOG v2.1.0:                                                            ║
 * ║  - Consolidated InvestmentTab data into unified 'current' object              ║
 * ║  - Renamed expandedArchiveItem → expandedArchive for consistency              ║
 * ║  - Updated all JSX references to use current.xxx pattern                      ║
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

import React, { useState, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart, ComposedChart, Cell, PieChart, Pie, Legend, ReferenceLine } from 'recharts';

// ============================================================================
// ASTS SPACEMOBILE FINANCIAL MODEL
// 2025 Creative Professional Design (CRCL-Style UI/UX)
// ============================================================================
// 
// INSTRUCTIONS FOR AI ASSISTANTS (Claude, GPT, etc.) AND HUMAN EDITORS:
//
// 1. HISTORICAL DATA INTEGRITY:
//    - NEVER modify or delete historical entries in the "timeline" array
//    - NEVER change past quarterly data in "quarterlyData" 
//    - If corrections needed, ADD new entries that reference/supersede old ones
//    - This preserves the audit trail of how the investment thesis evolved
//
// 2. UPDATING THE MODEL:
//    - New PRs/filings: ADD new timeline entries with date, don't edit old ones
//    - Stock price updates: Update currentStockPrice default and Q4 quarterlyData
//    - New quarters: ADD new entry to quarterlyData, don't modify past quarters
//    - Debt changes: Update totalDebt and add timeline entry explaining the change
//
// 3. SOURCES:
//    - SEC EDGAR: 10-K, 10-Q, 8-K, S-1/S-3 filings
//    - Company PRs: ast-science.com/news or businesswire
//    - Always cite sources in timeline entries
//
// 4. MODEL LAST UPDATED: January 8, 2026
//    - Timeline: 123 entries (2019-2025)
//    - Latest PR processed: BB6 Launch Dec 24, 2025
//    - Latest filing processed: 10-Q Nov 10, 2025 (Q3 2025)
//    - Debt update: Corrected to $697.6M net (balance sheet) vs $1.625B principal
//    - SPAC SEC filings integrated: 10-K FY2019, 10-K FY2020, 10-K/A FY2020
//    - Added: Earnings call insights (Q1 FY2023 - Q3 FY2025)
//    - New: LAUNCH category (4 launches: BB6, BB1-5, BW3, BW1)
//    - New: Topic filters with AND logic (Tech, Commercial, Regulatory, 
//           Funding, Government, Manufacturing, Spectrum)
//    - Wall Street: Added BofA full history ($55→$80→$85→$100); Deutsche Bank Nov 2023, May 2022, Nov 2021; UBS Aug 2024, Aug 2025, Sep 2025
//
// ============================================================================

// ============================================================================
// TYPESCRIPT INTERFACES (H1)
// ============================================================================

interface StatProps {
  label: string;
  value: string | number;
  color?: 'white' | 'cyan' | 'mint' | 'coral' | 'sky';
}

interface CardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'cyan' | 'emerald';
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

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ============================================================================
// ANALYST COVERAGE INTERFACES
// ============================================================================

/** Individual analyst report/update entry */
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

// ============================================================================
// COMPETITOR NEWS TRACKING INTERFACES
// ============================================================================

/** Competitor identifiers for D2D/satellite space */
type CompetitorId = 'starlink-tmobile' | 'lynk' | 'apple-globalstar' | 'skylo' | 'iridium' | 'amazon-kuiper' | 'other';

/** News category types */
type CompetitorNewsCategory = 'Launch' | 'Partnership' | 'Technology' | 'Regulatory' | 'Financial' | 'Coverage' | 'Product';

/** Implication for ASTS competitive position */
type ASTSImplication = 'positive' | 'neutral' | 'negative';

/** Individual competitor news entry */
interface CompetitorNewsEntry {
  date: string;
  competitor: CompetitorId;
  category: CompetitorNewsCategory;
  headline: string;
  details: string[];
  implication: ASTSImplication;
  astsComparison?: string;  // How this compares to ASTS capability/position
  source?: string;
  sourceUrl?: string;
  storyId?: string;         // Groups related news entries (e.g., 'qatar-starlink-aviation')
  storyTitle?: string;      // Display title for the story group
}

/** Competitor profile with capabilities */
interface CompetitorProfile {
  id: CompetitorId;
  name: string;
  description: string;
  technology: string;
  currentStatus: string;
  capabilities: {
    voice: boolean;
    text: boolean;
    data: boolean;
    video: boolean;
    unmodifiedPhones: boolean;
    globalCoverage: boolean;
  };
  keyMetrics?: {
    satellites?: number;
    coverage?: string;
    subscribers?: string;
    funding?: string;
  };
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

/** Discount rate for pre-revenue space company (15% = high risk premium) */
const DISCOUNT_RATE = 0.15;

/** Addressable subscriber base across MNO partners (3 billion) */
const ADDRESSABLE_SUBSCRIBERS_BILLIONS = 3;

/** Minimum discount rate for DCF calculations */
const MIN_DISCOUNT_RATE = 5;

/** Maximum realistic EV/EBITDA multiple for growth companies */
const MAX_EV_MULTIPLE = 16;

/** Distressed valuation multiplier (revenue × 2) */
const DISTRESSED_REVENUE_MULTIPLE = 2;

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
              background: '#22D3EE',
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
  
  /* ═══ STOCK-SPECIFIC ACCENT (ASTS = cyan) ═══ */
  --accent: var(--cyan);
  --accent-dim: var(--cyan-dim);
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
  background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
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
  color: var(--cyan);
  background: var(--cyan-dim);
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

.stat-item .val.cyan { color: var(--cyan); }
.stat-item .val.mint { color: var(--mint); }
.stat-item .val.sky { color: var(--sky); }
.stat-item .val.coral { color: var(--coral); }

/* Navigation */
.nav {
  display: flex;
  gap: 8px;
  padding: 16px 64px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.nav::-webkit-scrollbar { display: none; }

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
  background: var(--cyan);
  border-color: var(--cyan);
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
  background: var(--cyan);
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

/* Highlight Boxes */
.highlight {
  background: linear-gradient(135deg, var(--cyan-dim) 0%, transparent 100%);
  border: 1px solid rgba(34,211,238,0.2);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 32px;
}

.highlight h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--cyan);
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
  color: var(--cyan);
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
.tbl .cyan { color: var(--cyan); }
.tbl .mint { color: var(--mint); }
.tbl .coral { color: var(--coral); }
.tbl .sky { color: var(--sky); }

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
  background: var(--cyan);
  color: var(--bg);
  border-color: var(--cyan);
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
  color: var(--cyan);
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
  background: var(--cyan);
  cursor: pointer;
  box-shadow: 0 0 16px rgba(34,211,238,0.5);
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
  background: var(--cyan);
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

/* Mobile-First Table Wrapper */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--surface3) transparent;
}
.table-scroll::-webkit-scrollbar { height: 6px; }
.table-scroll::-webkit-scrollbar-track { background: transparent; }
.table-scroll::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 3px; }
.table-scroll table { min-width: 600px; }

/* Auto-scroll tables in cards on mobile */
.card, .highlight {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.card table, .highlight table {
  min-width: max-content;
}

/* Touch-friendly inputs */
@media (pointer: coarse) {
  input[type="range"] { height: 44px; }
  input[type="range"]::-webkit-slider-thumb { width: 28px; height: 28px; }
  .nav-btn { min-height: 44px; }
  button, .btn { min-height: 44px; }
}

/* Responsive - Desktop */
@media (max-width: 1200px) {
  .hero, .stats-row, .nav, .main { padding-left: 32px; padding-right: 32px; }
  .g4 { grid-template-columns: repeat(2, 1fr); }
}

/* Responsive - Tablet */
@media (max-width: 900px) {
  .hero, .stats-row, .nav, .main { padding-left: 24px; padding-right: 24px; }
  .g3 { grid-template-columns: repeat(2, 1fr); }
  .g4 { grid-template-columns: repeat(2, 1fr); }
  .card { padding: 20px; }
  .highlight { padding: 20px; }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .hero { padding: 24px 16px 20px; }
  .hero-grid { grid-template-columns: 1fr; gap: 16px; }
  .price-block { text-align: left; }
  .price-big { font-size: 36px; letter-spacing: -1px; }
  .brand-block h1 { font-size: 28px; letter-spacing: -0.5px; }
  .brand-block .desc { font-size: 14px; }
  .brand-block .ticker { font-size: 12px; padding: 4px 10px; margin-bottom: 16px; }

  .g2, .g3, .g4 { grid-template-columns: 1fr; gap: 16px; }

  .stats-row {
    padding: 20px 16px;
    gap: 20px;
    flex-wrap: nowrap;
  }
  .stat-item .val { font-size: 18px; }
  .stat-item .label { font-size: 10px; }

  .nav { padding: 10px 12px; gap: 4px; }
  .nav-btn { padding: 8px 12px; font-size: 12px; }

  .main { padding: 20px 16px; }
  .card { padding: 16px; border-radius: 12px; }
  .card-title { font-size: 14px; margin-bottom: 16px; }
  .highlight { padding: 16px; border-radius: 12px; }
  .highlight h3 { font-size: 15px; }

  .section-head { font-size: 20px; margin-bottom: 16px; }
  .section-head::after { height: 3px; }

  /* Mobile tables */
  .table-scroll table { min-width: 500px; }
  table th, table td { padding: 8px 10px; font-size: 12px; }

  /* Mobile cards in grids */
  .thesis { padding: 16px; }
  .thesis h4 { font-size: 14px; }

  /* Input controls */
  input[type="range"] { height: 40px; }
  input[type="number"], select {
    font-size: 16px; /* Prevents iOS zoom */
    padding: 10px 12px;
  }

  /* Slider labels */
  .input-row { flex-direction: column; gap: 8px; }
  .input-row label { font-size: 12px; }
}

/* Responsive - Small Mobile */
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

/* Timeline - CRCL Unified Style */
.timeline-item {
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.2s;
  background: var(--surface);
}
.timeline-item:hover {
  border-color: rgba(34,211,238,0.3);
}
.timeline-item.expanded {
  border-color: var(--cyan);
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
  color: var(--cyan);
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
.t-cat.guidance { background: rgba(168,85,247,0.15); color: #c084fc; }
.t-cat.data { background: rgba(59,130,246,0.15); color: #60a5fa; }
.t-cat.event { background: rgba(234,179,8,0.15); color: #facc15; }
.t-cat.launch { background: rgba(34,197,94,0.15); color: #4ade80; }
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
.t-verdict.positive { background: rgba(34,197,94,0.15); color: #4ade80; }
.t-verdict.negative { background: rgba(239,68,68,0.15); color: #f87171; }
.t-verdict.neutral { background: rgba(148,163,184,0.15); color: #94a3b8; }
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
  background: var(--cyan);
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
  max-height: 500px;
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
.t-details-text ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}
.t-details-text li {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.t-details-text li::before {
  content: '•';
  color: var(--cyan);
  font-weight: bold;
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
.t-meta-value.cyan { color: var(--cyan); }
.t-meta-value.green { color: #4ade80; }
.t-meta-value.red { color: #f87171; }
.t-topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.t-topic-tag {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
@media (max-width: 900px) {
  .timeline-header { grid-template-columns: 90px 1fr auto auto; }
  .timeline-header .t-cat { display: none; }
}
@media (max-width: 600px) {
  .timeline-header { grid-template-columns: 1fr auto; gap: 12px; padding: 14px 16px; }
  .timeline-header .t-date, .timeline-header .t-cat { display: none; }
  .t-verdict { padding: 4px 8px; font-size: 10px; }
  .t-toggle { width: 28px; height: 28px; font-size: 14px; }
  .t-details-content { grid-template-columns: 1fr; }
  .t-details-meta { flex-direction: row; flex-wrap: wrap; min-width: auto; }
}
`;

// ============================================================================
// UNIFIED UI COMPONENT LIBRARY - Consistent Design System
// Primary Accent: Cyan (#22D3EE) for ASTS SpaceMobile theme
// ============================================================================

// N1: Memoized pure components for performance optimization
const Stat = React.memo<StatProps>(({ label, value, color = 'white' }) => (
  <div className="stat-item">
    <div className="label">{label}</div>
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

const Panel = React.memo<PanelProps>(({ title, children }) => (
  <div className="card">
    {title && <div className="card-title">{title}</div>}
    {children}
  </div>
));
Panel.displayName = 'Panel';

const Card = React.memo<CardProps>(({ label, value, sub, color }) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
    green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', text: '#4ade80' },
    red: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
    yellow: { bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)', text: '#facc15' },
    purple: { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', text: '#c084fc' },
    orange: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', text: '#fb923c' },
    cyan: { bg: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.3)', text: '#22d3ee' },
    emerald: { bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)', text: '#34d399' }
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
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text3)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Space Mono', monospace", color: c.text, marginTop: '4px' }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
});
Card.displayName = 'Card';

const Row = React.memo<RowProps>(({ label, value, highlight = false }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
    background: highlight ? 'var(--cyan-dim)' : 'transparent',
    paddingLeft: highlight ? '12px' : 0,
    paddingRight: highlight ? '12px' : 0,
    marginLeft: highlight ? '-12px' : 0,
    marginRight: highlight ? '-12px' : 0,
    borderRadius: highlight ? '8px' : 0
  }}>
    <span style={{ fontSize: '14px', color: 'var(--text2)' }}>{label}</span>
    <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: "'Space Mono', monospace", color: highlight ? 'var(--cyan)' : 'var(--text)' }}>{value}</span>
  </div>
));
Row.displayName = 'Row';

const Input = React.memo<InputProps>(({ label, value, onChange, step = 1, min, max }) => (
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
const CFANotes = React.memo<CFANotesProps>(({ title, items }) => (
  <div style={{ marginTop: 24, padding: 20, background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>📚</span>
      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title || 'CFA Level III — Key Concepts'}</h4>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, lineHeight: 1.6 }}>
      {items.map((item, i) => (
        <p key={i} style={{ margin: 0, color: 'var(--text2)' }}>
          <strong style={{ color: 'var(--cyan)' }}>{item.term}:</strong> {item.def}
        </p>
      ))}
    </div>
  </div>
));
CFANotes.displayName = 'CFANotes';

const ASTSAnalysis = () => {
  // === DATA FRESHNESS: Last updated Dec 30, 2025 ===
  // Update stock prices regularly - stale data affects all calculations
  const [currentShares, setCurrentShares] = useState(361);  // Q3 10-Q: 272M Class A + 11.2M Class B + 78.2M Class C
  const [currentStockPrice, setCurrentStockPrice] = useState(71);  // ⚠️ UPDATE REGULARLY - Last: Dec 30, 2025
  const [cashOnHand, setCashOnHand] = useState(1220);  // Q3 10-Q: $1,220,123K
  const [quarterlyBurn, setQuarterlyBurn] = useState(300);  // Q3 10-Q: CapEx + OpEx guidance
  const [totalDebt, setTotalDebt] = useState(698);  // Q3 10-Q: $697.6M net long-term debt (convertibles net of discounts)
  const [debtRate, setDebtRate] = useState(4.25);  // Q3 10-Q: Converts at 4.25%
  const [block1Sats, setBlock1Sats] = useState(6);  // BW3 + BB1-5 (Block 1)
  const [block2Sats, setBlock2Sats] = useState(1);  // BB6 launched Dec 23, 2025 (first Block 2)
  const [targetSats2026, setTargetSats2026] = useState(60);  // Per PRs: 45-60 range, using upper end
  const [launchFailureRate, setLaunchFailureRate] = useState(7);
  const [partnerReach, setPartnerReach] = useState(3000);  // ~3B subs across 50+ MNOs per Q3 PR
  const [penetrationRate, setPenetrationRate] = useState(3);
  const [blendedARPU, setBlendedARPU] = useState(18);
  const [revenueShare, setRevenueShare] = useState(50);
  const [govRevenue, setGovRevenue] = useState(100);
  const [contractedRevenue] = useState(1000);  // $1B+ contracted commercial revenue per Q3 earnings
  const [regulatoryRisk, setRegulatoryRisk] = useState(5);
  const [techRisk, setTechRisk] = useState(8);
  const [competitionRisk, setCompetitionRisk] = useState(10);
  const [activeTab, setActiveTab] = useState('overview');

  const partners = [
    { name: 'AT&T', region: 'US', subs: 200, status: 'Definitive', prepay: 20, spectrum: '850 MHz', notes: 'First VoLTE call' },
    { name: 'Verizon', region: 'US', subs: 145, status: 'Definitive (Oct 2025)', prepay: 100, spectrum: '850 MHz', notes: '$100M+ commitment' },
    { name: 'Vodafone', region: 'EU/AF', subs: 500, status: 'Definitive (2034)', prepay: 25, spectrum: '2GHz MSS', notes: 'SatCo JV' },
    { name: 'Vodafone Idea', region: 'India', subs: 250, status: 'Definitive', prepay: 0, spectrum: 'TBD', notes: 'June 2025' },
    { name: 'Rakuten', region: 'Japan', subs: 5, status: 'Definitive', prepay: 0, spectrum: 'LTE', notes: 'Video calls' },
    { name: 'stc Group', region: 'Saudi/MENA', subs: 80, status: '10-year', prepay: 175, spectrum: 'TBD', notes: '$175M prepay' },
    { name: 'Bell Canada', region: 'Canada', subs: 23, status: 'Definitive', prepay: 0, spectrum: 'TBD', notes: 'Testing' },
    { name: 'Others (45+ MNOs)', region: 'Global', subs: 1997, status: 'MOU/LOI', prepay: 0, spectrum: 'Various', notes: 'Orange, etc.' },
  ];

  const revenueSources = [
    { source: 'MNO Commercial (50/50)', description: 'Wholesale revenue share', status: 'Post-2026' },
    { source: 'Gateway Hardware', description: 'Ground station sales', status: 'Active - Q3 $14.7M' },
    { source: 'Government Contracts', description: 'DoD, SDA, DIU ($63M+)', status: 'Active' },
    { source: 'Partner Prepayments', description: 'stc $175M, Verizon, AT&T', status: 'Active' },
    { source: 'Spectrum Rights', description: 'L-band, S-band monetization', status: 'Future' },
  ];

  const upcomingCatalysts = [
    // === LAUNCHES & CONSTELLATION ===
    { event: 'BB6 Unfolding Phased Array', timeline: 'Q1 2026', impact: 'High' },
    { event: 'BB7 Launch (Blue Origin New Glenn or SpaceX F9)', timeline: 'Q1 2026', impact: 'High' },
    { event: 'BB8-BB10 Delivery & Launch (Falcon 9)', timeline: 'Q1 2026', impact: 'High' },
    { event: 'BB11-BB13 Delivery & Launch (Falcon 9)', timeline: 'Q1-Q2 2026', impact: 'High' },
    { event: 'Block-2 Launches (3x, 4x or 8x batches every 1-2 mo)', timeline: '2026', impact: 'High' },
    { event: 'Production Ramp to 6x Satellites/Month', timeline: '2026', impact: 'Medium' },
    { event: 'Progress on 8-25x Block-2 BlueBirds in Production', timeline: '2026', impact: 'Medium' },
    { event: 'New Midland TX Manufacturing (Micron-focused)', timeline: '2026', impact: 'Medium' },
    // === REGULATORY & SPECTRUM ===
    { event: 'FCC Full US SCS Commercial Service Approval', timeline: 'Q1 2026', impact: 'Critical' },
    { event: 'FCC 5G Fund Grant', timeline: '2026', impact: 'High' },
    { event: 'FCC PNT Service Proposal (GPS Alternative)', timeline: '2026', impact: 'Medium' },
    { event: 'EU 2GHz MSS Spectrum Allocation (SatCo JV)', timeline: '2026', impact: 'High' },
    { event: 'L-Band & S-Band Spectrum Licenses (Global)', timeline: '2026+', impact: 'Medium' },
    // === COMMERCIAL & MNO PARTNERSHIPS ===
    { event: 'FirstNet Investment & Definitive Agreement', timeline: '2026', impact: 'Critical' },
    { event: 'Bell Canada, Telefonica, Etisalat + 50 MNO Deals', timeline: '2026', impact: 'High' },
    { event: 'AT&T/FirstNet Beta Testing', timeline: '1H 2026', impact: 'High' },
    { event: 'Google Services Partnership Update', timeline: '2026', impact: 'Medium' },
    { event: 'Unlock $20M/$25M/$65M Prepayments (AT&T/VZ/VOD)', timeline: '2026', impact: 'Medium' },
    // === SERVICE LAUNCH & REVENUE ===
    { event: 'Initial Intermittent Service (US/Canada/Japan/UK/Saudi)', timeline: '2026', impact: 'Critical' },
    { event: 'Initial Commercial Service (AT&T/Rakuten/VZ/VOD)', timeline: 'Late 2026', impact: 'Critical' },
    { event: '$50-75M Revenue Delivery', timeline: '2H 2025', impact: 'High' },
    // === GOVERNMENT & DEFENSE ===
    { event: 'Golden Dome Award(s)', timeline: '2026', impact: 'High' },
    { event: 'DoD/SDA/DIU Contract Expansion (9x+)', timeline: '2026', impact: 'High' },
    // === FINANCING & COVERAGE ===
    { event: '$500M+ EXIM/IFC Non-Dilutive Funding', timeline: '2026', impact: 'High' },
    { event: 'GS/MS/Stifel Research Coverage Initiation', timeline: '2026', impact: 'Medium' },
    // === STRATEGIC ===
    { event: 'AI Data Center Strategic Partnerships', timeline: '2026+', impact: 'Medium' },
    { event: 'Catalysts SpaceMob Has Yet to Contemplate', timeline: '???', impact: 'Unknown' },
  ];

  const completedMilestones = [
    // 2025
    { event: 'BB6 Launched (ISRO)', date: 'Dec 24, 2025' },
    { event: '$1B+ Contracted Revenue', date: 'Q3 2025' },
    { event: 'Verizon Definitive Agreement', date: 'Oct 2025' },
    { event: 'stc $1.8B Agreement', date: 'Q3 2025' },
    { event: '$1.15B Convertible Notes', date: 'Oct 2025' },
    { event: 'Russell 1000 Inclusion', date: 'Jun 2025' },
    { event: 'SatCo JV (Vodafone EU)', date: '2025' },
    { event: 'FirstNet Trial FCC Approval', date: 'Apr 2025' },
    { event: 'First VoLTE Call', date: '2025' },
    // 2024
    { event: 'Vodafone Extension to 2034', date: 'Dec 2024' },
    { event: 'BB1-5 Launched (SpaceX)', date: 'Sep 12, 2024' },
    { event: 'FCC BB1-5 License Granted', date: 'Aug 5, 2024' },
    { event: 'Verizon $100M Commitment', date: 'May 29, 2024' },
    { event: 'AT&T Definitive Agreement', date: 'May 15, 2024' },
    { event: 'ASIC Tape-out Complete (TSMC)', date: 'Q2 2024' },
    { event: 'Google Cloud Partnership', date: 'Jan 2024' },
    // 2023
    { event: 'First 5G Connection (14 Mbps)', date: 'Sep 2023' },
    { event: 'First D2C Voice Call', date: 'Apr 25, 2023' },
    { event: 'BW3 4G/LTE Demo (10+ Mbps)', date: 'Q1 2023' },
    { event: 'Rakuten MOU', date: '2023' },
    // 2022
    { event: 'BW3 Antenna Deployed (693 sq ft)', date: 'Nov 2022' },
    { event: 'BW3 Launched (SpaceX)', date: 'Sep 10, 2022' },
    { event: 'NanoAvionics Sale ($26.6M)', date: 'Sep 2022' },
    { event: 'SPAC Merger Complete (NPA)', date: 'Apr 2022' },
    // 2021
    { event: 'Vodafone Partnership', date: '2021' },
    { event: 'AT&T MOU', date: '2021' },
    // 2019-2020
    { event: 'BlueWalker 1 Launched', date: 'Apr 2019' },
    { event: 'AST SpaceMobile Founded', date: '2017' },
  ];

  const calc = useMemo(() => {
    const marketCap = currentStockPrice * currentShares;
    const totalSats = block1Sats + block2Sats;
    const constellationProgress = (totalSats / targetSats2026) * 100;
    const cashRunwayQuarters = quarterlyBurn > 0 ? cashOnHand / quarterlyBurn : 0;
    const enterpriseValue = marketCap + totalDebt - cashOnHand;
    const potentialSubs = partnerReach * (penetrationRate / 100);
    const grossAnnualRev = potentialSubs * blendedARPU * 12;
    const astsAnnualRev = grossAnnualRev * (revenueShare / 100) + govRevenue;
    const evToRevFwd = astsAnnualRev > 0 ? enterpriseValue / astsAnnualRev : 0;
    const pricePerSub = potentialSubs > 0 ? marketCap / potentialSubs : 0;
    const totalPrepayments = partners.reduce((sum, p) => sum + p.prepay, 0);
    // Ensure all outputs are finite numbers
    const safe = (v: number) => (isFinite(v) ? v : 0);
    return { marketCap: safe(marketCap), totalSats, constellationProgress: safe(constellationProgress), cashRunwayQuarters: safe(cashRunwayQuarters), enterpriseValue: safe(enterpriseValue), potentialSubs: safe(potentialSubs), grossAnnualRev: safe(grossAnnualRev), astsAnnualRev: safe(astsAnnualRev), evToRevFwd: safe(evToRevFwd), pricePerSub: safe(pricePerSub), totalPrepayments };
  }, [currentShares, currentStockPrice, cashOnHand, quarterlyBurn, totalDebt, block1Sats, block2Sats, targetSats2026, partnerReach, penetrationRate, blendedARPU, revenueShare, govRevenue, partners]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'catalysts', label: 'Catalysts' },
    { id: 'constellation', label: 'Constellation' },
    { id: 'subscribers', label: 'Subscribers' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'partners', label: 'Partners' },
    { id: 'runway', label: 'Cash Runway' },
    { id: 'capital', label: 'Capital' },
    { id: 'dcf', label: 'DCF' },
    { id: 'monte-carlo', label: 'Monte Carlo' },
    { id: 'comps', label: 'Comps' },
    { id: 'financials', label: 'Financials' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'investment', label: 'Investment' },
    { id: 'wall-street', label: 'Wall Street' },
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
        
        {/* ============================================================================
            HERO HEADER - CRCL-Style Premium Design
            ============================================================================ */}
        <header className="hero">
          <div className="hero-grid">
            <div className="brand-block">
              <h1>ASTS SpaceMobile</h1>
              <div className="ticker">NASDAQ: ASTS · Direct-to-Device Cellular</div>
              {/* H4: Data Freshness Timestamp */}
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 6, 
                background: 'rgba(34,211,238,0.1)', 
                border: '1px solid rgba(34,211,238,0.3)', 
                borderRadius: 6, 
                padding: '4px 10px', 
                fontSize: 11, 
                color: '#22d3ee',
                marginTop: 8,
                marginBottom: 16
              }}>
                <span>📅</span>
                <span>Data as of: Dec 31, 2025</span>
                <span style={{ color: 'rgba(34,211,238,0.5)' }}>|</span>
                <span>Update prices regularly</span>
              </div>
              <p className="desc">
                First space-based cellular broadband for standard smartphones. 
                53+ MNO partnerships reaching {(partnerReach / 1000).toFixed(1)}B subscribers globally.
              </p>
            </div>
            <div className="price-block">
              <div className="price-big">${currentStockPrice}</div>
              <div className="price-badge up">
                🛰️ {calc.totalSats}/{targetSats2026} Satellites
              </div>
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="stats-row">
          <Stat label="Market Cap" value={`$${(calc.marketCap / 1000).toFixed(1)}B`} />
          <Stat label="Enterprise Value" value={`$${(calc.enterpriseValue / 1000).toFixed(1)}B`} />
          <Stat label="Constellation" value={`${calc.totalSats}/${targetSats2026}`} color="cyan" />
          <Stat label="Progress" value={`${calc.constellationProgress.toFixed(0)}%`} color="cyan" />
          <Stat label="Cash" value={`$${(cashOnHand / 1000).toFixed(1)}B`} color="mint" />
          <Stat label="Runway" value={`${calc.cashRunwayQuarters.toFixed(1)}Q`} color="mint" />
          <Stat label="Contracted Rev" value={`$${contractedRevenue}M+`} color="sky" />
        </div>

        {/* Navigation */}
        <nav className="nav">
          {tabs.map(t => (
            <button 
              key={t.id} 
              className={`nav-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        
        {/* Main Content */}
        <main className="main">
          {activeTab === 'overview' && <OverviewTab calc={calc} currentShares={currentShares} setCurrentShares={setCurrentShares} currentStockPrice={currentStockPrice} setCurrentStockPrice={setCurrentStockPrice} cashOnHand={cashOnHand} setCashOnHand={setCashOnHand} quarterlyBurn={quarterlyBurn} setQuarterlyBurn={setQuarterlyBurn} totalDebt={totalDebt} setTotalDebt={setTotalDebt} block1Sats={block1Sats} block2Sats={block2Sats} targetSats2026={targetSats2026} contractedRevenue={contractedRevenue} partnerReach={partnerReach} penetrationRate={penetrationRate} />}
          {activeTab === 'catalysts' && <CatalystsTab upcomingCatalysts={upcomingCatalysts} completedMilestones={completedMilestones} />}
          {activeTab === 'constellation' && <ConstellationTab calc={calc} block1Sats={block1Sats} setBlock1Sats={setBlock1Sats} block2Sats={block2Sats} setBlock2Sats={setBlock2Sats} targetSats2026={targetSats2026} setTargetSats2026={setTargetSats2026} launchFailureRate={launchFailureRate} setLaunchFailureRate={setLaunchFailureRate} />}
          {activeTab === 'subscribers' && <SubscribersTab calc={calc} partnerReach={partnerReach} setPartnerReach={setPartnerReach} penetrationRate={penetrationRate} setPenetrationRate={setPenetrationRate} blendedARPU={blendedARPU} setBlendedARPU={setBlendedARPU} partners={partners} />}
          {activeTab === 'revenue' && <RevenueTab calc={calc} revenueShare={revenueShare} setRevenueShare={setRevenueShare} govRevenue={govRevenue} setGovRevenue={setGovRevenue} revenueSources={revenueSources} contractedRevenue={contractedRevenue} />}
          {activeTab === 'partners' && <PartnersTab partners={partners} revenueShare={revenueShare} blendedARPU={blendedARPU} penetrationRate={penetrationRate} />}
          {activeTab === 'runway' && <RunwayTab calc={calc} cashOnHand={cashOnHand} setCashOnHand={setCashOnHand} quarterlyBurn={quarterlyBurn} setQuarterlyBurn={setQuarterlyBurn} totalDebt={totalDebt} setTotalDebt={setTotalDebt} debtRate={debtRate} setDebtRate={setDebtRate} currentShares={currentShares} currentStockPrice={currentStockPrice} />}
          {activeTab === 'capital' && <CapitalTab currentShares={currentShares} currentStockPrice={currentStockPrice} />}
          {activeTab === 'scenarios' && <ScenariosTab currentShares={currentShares} currentStockPrice={currentStockPrice} totalDebt={totalDebt} cashOnHand={cashOnHand} />}
          {activeTab === 'dcf' && <DCFTab calc={calc} currentShares={currentShares} currentStockPrice={currentStockPrice} cashOnHand={cashOnHand} totalDebt={totalDebt} regulatoryRisk={regulatoryRisk} setRegulatoryRisk={setRegulatoryRisk} techRisk={techRisk} setTechRisk={setTechRisk} competitionRisk={competitionRisk} setCompetitionRisk={setCompetitionRisk} />}
          {activeTab === 'monte-carlo' && <MonteCarloTab currentShares={currentShares} currentStockPrice={currentStockPrice} totalDebt={totalDebt} cashOnHand={cashOnHand} />}
          {activeTab === 'comps' && <CompsTab calc={calc} currentStockPrice={currentStockPrice} />}
          {activeTab === 'timeline' && <TimelineTab />}
          {activeTab === 'financials' && <FinancialsTab />}
          {activeTab === 'investment' && <InvestmentTab />}
          {activeTab === 'wall-street' && <WallStreetTab />}
        </main>
      </div>
    </>
  );
};

const OverviewTab = ({ calc, currentShares, setCurrentShares, currentStockPrice, setCurrentStockPrice, cashOnHand, setCashOnHand, quarterlyBurn, setQuarterlyBurn, totalDebt, setTotalDebt, block1Sats, block2Sats, targetSats2026, contractedRevenue, partnerReach, penetrationRate }) => (
  <>
    <h2 className="section-head">Overview</h2>
    <div className="highlight"><h3>Investment Thesis (Dec 2025)</h3>
      <p style={{ fontSize: '14px' }}><strong style={{ color: 'var(--cyan)' }}>AST SpaceMobile:</strong> First space-based cellular broadband for standard smartphones. 53+ MNO partnerships (3.2B subs). BB6 launched Dec 24. $3.2B cash. $1B+ contracted revenue.</p>
    </div>
    <div className="g4">
      <Card label="Market Cap" value={`$${(calc.marketCap / 1000).toFixed(1)}B`} sub="Equity value" color="blue" />
      <Card label="EV" value={`$${(calc.enterpriseValue / 1000).toFixed(1)}B`} sub="MC + Debt - Cash" color="purple" />
      <Card label="Constellation" value={`${calc.totalSats}/${targetSats2026}`} sub={`${calc.constellationProgress.toFixed(0)}%`} color="cyan" />
      <Card label="Runway" value={`${calc.cashRunwayQuarters.toFixed(1)}Q`} sub="~1 year runway" color="green" />
    </div>
    <div className="g3">
      <div className="card"><div className="card-title">Equity (Q3 2025)</div>
        <Row label="Shares" value={`${currentShares}M`} />
        <Row label="Price" value={`$${currentStockPrice}`} />
        <Row label="Mkt Cap" value={`$${(calc.marketCap / 1000).toFixed(2)}B`} highlight />
        <Row label="Debt" value={`$${totalDebt}M`} />
        <Row label="Cash" value={`$${(cashOnHand / 1000).toFixed(2)}B`} />
      </div>
      <div className="card"><div className="card-title">Subscribers</div>
        <Row label="MNO Partners" value="53+" />
        <Row label="Reach" value={`${(partnerReach / 1000).toFixed(1)}B`} highlight />
        <Row label={`@ ${penetrationRate}%`} value={`${calc.potentialSubs.toFixed(0)}M`} />
        <Row label="$/Sub" value={`$${calc.pricePerSub.toFixed(0)}`} />
        <Row label="Contracted" value={`$${contractedRevenue}M+`} />
      </div>
      <div className="card"><div className="card-title">Constellation</div>
        <Row label="Block 1 (BW3+BB1-5)" value={`${block1Sats} in orbit`} />
        <Row label="Block 2 (BB6+)" value={`${block2Sats} launched`} highlight />
        <Row label="Total Constellation" value={`${block1Sats + block2Sats} satellites`} />
        <Row label="Target" value={targetSats2026} />
        <Row label="Next" value="BB7-13 Q1'26" />
      </div>
    </div>
    <div className="card"><div className="card-title">Parameters</div>
      <div className="g4" style={{ marginTop: '16px' }}>
        <Input label="Shares (M)" value={currentShares} onChange={setCurrentShares} />
        <Input label="Price ($)" value={currentStockPrice} onChange={setCurrentStockPrice} step={0.5} />
        <Input label="Cash ($M)" value={cashOnHand} onChange={setCashOnHand} />
        <Input label="Burn ($M/Q)" value={quarterlyBurn} onChange={setQuarterlyBurn} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Input label="Debt ($M)" value={totalDebt} onChange={setTotalDebt} />
      </div>
    </div>
    
    <CFANotes title="CFA Level III — Space-Based Cellular" items={[
      { term: 'Market Cap', def: 'Stock price × shares outstanding. Current equity value assigned by market. Compare to DCF intrinsic value.' },
      { term: 'Enterprise Value (EV)', def: 'Market Cap + Total Debt - Cash. Represents total firm value to all capital providers. Used in EV/Revenue multiples.' },
      { term: 'Constellation Progress', def: 'Satellites deployed vs target. Key operational milestone. More satellites = more coverage capacity = higher revenue potential.' },
      { term: 'Cash Runway', def: 'Cash ÷ Quarterly Burn. Quarters of funding remaining at current spend rate. Critical for pre-revenue companies.' },
      { term: 'Price per Subscriber', def: 'Market Cap ÷ Potential Subscribers. Valuation metric for telecom. Lower = more attractive if execution succeeds.' },
      { term: 'MNO Partnerships', def: 'Mobile Network Operator agreements. 53+ partners with 3.2B combined subscribers. Revenue share model (typically 50/50).' },
    ]} />
  </>
);

const CatalystsTab = ({ upcomingCatalysts, completedMilestones }) => {
  // Group milestones by year
  const milestonesByYear = completedMilestones.reduce((acc, m) => {
    const year = m.date.match(/20\d{2}/)?.[0] || 'Other';
    if (!acc[year]) acc[year] = [];
    acc[year].push(m);
    return acc;
  }, {});
  const years = Object.keys(milestonesByYear).sort((a, b) => Number(b) - Number(a));
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Catalysts</h2>
      <div className="highlight"><h3>Catalyst Tracker</h3><p className="text-sm">Near-term: BB7-13, FCC approval, US service. Five launches by Q1 2026.</p></div>
      <div className="card"><div className="card-title">Upcoming</div>
        <div className="space-y-2">{upcomingCatalysts.map((c, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${c.impact === 'Critical' ? 'bg-cyan-900/30 border-cyan-600' : 'bg-slate-800/50 border-slate-700'}`}>
            <div><div className="font-medium">{c.event}</div><div className="text-xs text-slate-400">{c.timeline}</div></div>
            <span className={`px-2 py-1 rounded text-xs ${c.impact === 'Critical' ? 'bg-cyan-600' : 'bg-yellow-600/50'}`}>{c.impact}</span>
          </div>
        ))}</div>
      </div>
      {years.map(year => (
        <div key={year} className="card"><div className="card-title">{year} Completed</div>
          <div className="grid md:grid-cols-2 gap-2">{milestonesByYear[year].map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded bg-green-900/20 border border-green-800/30">
              <span className="text-green-400">✓</span><div><div className="text-sm">{m.event}</div><div className="text-xs text-slate-500">{m.date}</div></div>
            </div>
          ))}</div>
        </div>
      ))}
      
      <CFANotes title="CFA Level III — Catalyst Analysis" items={[
        { term: 'Catalyst', def: 'Event that could materially impact stock price. Categorize by probability and magnitude of impact.' },
        { term: 'Critical vs High', def: 'Critical = binary outcome affecting thesis (FCC approval, launch success). High = meaningful but not thesis-breaking.' },
        { term: 'Timeline Risk', def: 'Delays are common in space. Build buffer into expectations. Track management\'s guidance accuracy over time.' },
        { term: 'De-risking', def: 'Each completed milestone reduces execution risk. Successful launches, regulatory approvals, commercial contracts all de-risk.' },
        { term: 'Event-Driven Trading', def: 'Catalysts create volatility. Position sizing should account for binary outcomes and IV expansion.' },
      ]} />
    </div>
  );
};

const ConstellationTab = ({ calc, block1Sats, setBlock1Sats, block2Sats, setBlock2Sats, targetSats2026, setTargetSats2026, launchFailureRate, setLaunchFailureRate }) => {
  // Updated schedule per Nov 21 & Dec 24 2025 PRs: 
  // - BW3 launched Sept 10, 2022 (prototype, 693 sq ft)
  // - BB1-5 launched Sept 12, 2024 (Block 1, 693 sq ft each)
  // - BB6 launched Dec 23, 2025 (first Block 2, ~2,400 sq ft)
  // - Target: 5 launches by end Q1 2026, then every 1-2 months to reach 45-60 by end 2026
  // - BB7 shipped to Cape Canaveral Nov 2025, BB8-25 in various stages
  const schedule = [
    { date: '2022 Q3', sats: 1, cum: 1, note: 'BW3' },
    { date: '2024 Q3', sats: 5, cum: 6, note: 'BB1-5' },
    { date: '2025 Q4', sats: 1, cum: 7, note: 'BB6' },
    { date: '2026 Q1', sats: 4, cum: 11, note: 'BB7-10' },
    { date: '2026 Q2', sats: 12, cum: 23, note: 'Est.' },
    { date: '2026 Q3', sats: 17, cum: 40, note: 'Est.' },
    { date: '2026 Q4', sats: 20, cum: 60, note: 'Target' },
  ];
  const coverage = [{ r: 'US Intermittent', n: 6 }, { r: 'US Continuous', n: 20 }, { r: 'US+Canada+Japan', n: 25 }, { r: 'Global (45-60)', n: 60 }].map(c => ({ ...c, pct: Math.min(100, (calc.totalSats / c.n) * 100) }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Constellation</h2>
      <div className="highlight"><h3>Constellation Status</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-cyan-400">Block 1 (BW3 + BB1-5):</strong> 6 satellites in orbit. BW3 is the 693 sq ft prototype (Sept 2022). BB1-5 are first-generation commercial satellites (Sept 2024).</p>
          <p><strong className="text-yellow-400">Block 2 (BB6+):</strong> Next-generation satellites with ~2,400 sq ft arrays (3.5x larger), AST5000 ASIC chips, and 10x capacity. BB6 launched Dec 23, 2025 via ISRO.</p>
          <p><strong className="text-green-400">Target:</strong> 45-60 satellites by end of 2026 via SpaceX, Blue Origin, and ISRO. Launch cadence: every 1-2 months.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card label="Block 1" value={block1Sats} sub="BW3+BB1-5 (693 sq ft)" color="cyan" />
        <Card label="Block 2" value={block2Sats} sub="BB6+ (~2,400 sq ft)" color="yellow" />
        <Card label="Total In Orbit" value={calc.totalSats} sub="Operational" color="green" />
        <Card label="Target 2026" value={targetSats2026} sub="45-60 range" color="blue" />
        <Card label="Progress" value={`${calc.constellationProgress.toFixed(0)}%`} sub="vs 2026 target" color="purple" />
      </div>
      
      {/* Satellite Generations Comparison */}
      <div className="card"><div className="card-title">Satellite Generations</div>
        <div className="g2">
          <div className="p-4 bg-cyan-900/20 border border-cyan-800/30 rounded-lg">
            <h4 className="text-cyan-400 font-medium mb-2">Block 1: BW3 + BB1-5</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Array size: 693 sq ft each</li>
              <li>• Launched: BW3 Sept 2022, BB1-5 Sept 2024</li>
              <li>• Status: All 6 operational in orbit</li>
              <li>• Purpose: Technology validation, early service</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-2">Block 2: BB6 onwards</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Array size: ~2,400 sq ft (3.5x larger)</li>
              <li>• AST5000 ASIC: Custom silicon, 120 Mbps peak</li>
              <li>• Capacity: 10x improvement over Block 1</li>
              <li>• BB6 launched Dec 23, 2025 (ISRO)</li>
              <li>• BB7-25: In production, 6/month by Dec 2025</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="card"><div className="card-title">Launch Schedule (Actual + Projected)</div>
        <ResponsiveContainer width="100%" height={200}><ComposedChart data={schedule}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="date" stroke="var(--text3)" fontSize={11} /><YAxis stroke="var(--text3)" /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)' }} formatter={(v, name, props) => [name === 'sats' ? `${v} sats (${props.payload.note})` : `${v} cumulative`, name === 'sats' ? 'Launched' : 'Total']} /><Bar dataKey="sats" fill="var(--cyan)" /><Line dataKey="cum" stroke="var(--gold)" strokeWidth={2} /></ComposedChart></ResponsiveContainer>
        <div className="mt-2 text-xs text-slate-500">
          ✓ BW3 Sept 2022 | ✓ BB1-5 Sept 2024 | ✓ BB6 Dec 2025 | BB7 ready, BB8-25 in production
        </div>
      </div>
      <div className="card"><div className="card-title">Coverage Milestones</div>
        {coverage.map(c => (<div key={c.r} className="flex items-center gap-4 mb-2"><div className="w-36 text-sm">{c.r}</div><div className="flex-1 h-5 bg-slate-900 rounded-full overflow-hidden"><div className={`h-full ${c.pct >= 100 ? 'bg-green-500' : 'bg-cyan-500'}`} style={{ width: `${c.pct}%` }} /></div><div className="w-20 text-right text-sm">{c.n} sats ({c.pct.toFixed(0)}%)</div></div>))}
      </div>
      <div className="card"><div className="card-title">Parameters</div><div className="g4"><Input label="Block 1 (BW3+BB1-5)" value={block1Sats} onChange={setBlock1Sats} /><Input label="Block 2 (BB6+)" value={block2Sats} onChange={setBlock2Sats} /><Input label="Target 2026" value={targetSats2026} onChange={setTargetSats2026} /><Input label="Failure %" value={launchFailureRate} onChange={setLaunchFailureRate} /></div></div>
      
      <CFANotes title="CFA Level III — Constellation Economics" items={[
        { term: 'Block 1 vs Block 2', def: 'Block 1 (BW3+BB1-5): 693 sq ft arrays, technology validation. Block 2 (BB6+): 2,400 sq ft arrays, 3.5x larger, AST5000 chips, 10x capacity.' },
        { term: 'Coverage Thresholds', def: '6 sats = US intermittent, 20 = US continuous, 25 = US+Canada+Japan, 45-60 = global. More satellites = better service quality.' },
        { term: 'Launch Risk', def: 'Historical LEO failure ~7%. Cumulative risk increases with more launches. SpaceX reliability higher than average.' },
        { term: 'CapEx per Satellite', def: '$21-23M average per satellite (Q4 2025). Total constellation cost = CapEx per sat × target count. Compare to revenue capacity.' },
        { term: 'Manufacturing Rate', def: '6 satellites/month by Dec 2025. Bottleneck analysis: can production keep pace with launch cadence?' },
        { term: 'Coverage Economics', def: 'Each satellite adds incremental coverage. Diminishing returns after global coverage achieved. Monitor utilization vs capacity.' },
      ]} />
    </div>
  );
};

const SubscribersTab = ({ calc, partnerReach, setPartnerReach, penetrationRate, setPenetrationRate, blendedARPU, setBlendedARPU, partners }) => {
  const scenarios = [0.5, 1, 2, 3, 5, 7, 10].map(p => ({ p, subs: partnerReach * (p / 100), rev: partnerReach * (p / 100) * blendedARPU * 12 * 0.5 / 1000 }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Subscribers</h2>
      <div className="highlight"><h3>Subscriber Analysis</h3><p className="text-sm">3.2B reach: Vodafone 500M, VI India 250M, AT&T 200M, Verizon 145M, stc 80M, others ~2B. 1% = 32M subs.</p></div>
      <div className="g4">
        <Card label="Reach" value={`${(partnerReach / 1000).toFixed(1)}B`} sub="53+ MNOs" color="blue" />
        <Card label="Penetration" value={`${penetrationRate}%`} color="cyan" />
        <Card label="Subs" value={`${calc.potentialSubs.toFixed(0)}M`} color="green" />
        <Card label="$/Sub" value={`$${calc.pricePerSub.toFixed(0)}`} color="yellow" />
      </div>
      <div className="card"><div className="card-title">Breakdown</div>
        <table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-slate-700"><th className="text-left py-2">Partner</th><th className="text-right">Reach</th><th className="text-right">%</th></tr></thead><tbody>{partners.map(p => (<tr key={p.name} className="border-t border-slate-800"><td className="py-2">{p.name}</td><td className="py-2 text-right text-cyan-400">{p.subs}M</td><td className="py-2 text-right text-slate-400">{((p.subs / partnerReach) * 100).toFixed(1)}%</td></tr>))}</tbody></table>
      </div>
      <div className="card"><div className="card-title">Sensitivity</div>
        <table className="w-full text-sm"><thead><tr className="text-slate-400 text-xs border-b border-slate-700"><th className="text-left py-2">Pen%</th><th className="text-right">Subs</th><th className="text-right">Rev/yr</th><th className="text-right">$/Sub</th></tr></thead><tbody>{scenarios.map(s => (<tr key={s.p} className={`border-t border-slate-800 ${s.p === penetrationRate ? 'bg-cyan-900/20' : ''}`}><td className="py-2">{s.p}%</td><td className="py-2 text-right">{s.subs.toFixed(0)}M</td><td className="py-2 text-right text-green-400">${s.rev.toFixed(1)}B</td><td className="py-2 text-right">${(calc.marketCap / s.subs).toFixed(0)}</td></tr>))}</tbody></table>
      </div>
      <div className="card"><div className="card-title">Parameters</div><div className="g3"><Input label="Reach (M)" value={partnerReach} onChange={setPartnerReach} /><Input label="Pen %" value={penetrationRate} onChange={setPenetrationRate} step={0.5} /><Input label="ARPU $" value={blendedARPU} onChange={setBlendedARPU} /></div></div>
      
      <CFANotes title="CFA Level III — Subscriber Economics" items={[
        { term: 'Total Addressable Market (TAM)', def: '3.2B subscribers across 53+ MNO partners. But TAM ≠ revenue — penetration rate is the key variable.' },
        { term: 'Penetration Rate', def: 'Percentage of partner subscribers who adopt ASTS service. 1% = 32M subs. Historical satellite adoption suggests 1-5% realistic.' },
        { term: 'ARPU (Average Revenue Per User)', def: 'Monthly revenue per subscriber. Blended across markets. Developed markets higher (~$25), emerging lower (~$10).' },
        { term: 'Price per Subscriber', def: 'Market Cap ÷ Potential Subs. Valuation metric. Compare to traditional telco acquisitions ($300-500/sub).' },
        { term: 'Revenue Share', def: 'Typically 50/50 with MNO partners. ASTS provides space infrastructure, MNOs provide spectrum and distribution.' },
        { term: 'Sensitivity Analysis', def: 'Test different penetration scenarios. Small changes in penetration dramatically impact revenue and valuation.' },
      ]} />
    </div>
  );
};

const RevenueTab = ({ calc, revenueShare, setRevenueShare, govRevenue, setGovRevenue, revenueSources, contractedRevenue }) => {
  const ramp = [{ year: '2025', commercial: 0, gov: 0.05, gateway: 0.015 }, { year: '2026', commercial: 0.3, gov: 0.15, gateway: 0.05 }, { year: '2027', commercial: 1.5, gov: 0.25, gateway: 0.08 }, { year: '2028', commercial: 4.0, gov: 0.35, gateway: 0.1 }, { year: '2029', commercial: 7.0, gov: 0.45, gateway: 0.1 }, { year: '2030', commercial: 11.0, gov: 0.5, gateway: 0.1 }];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Revenue</h2>
      <div className="highlight"><h3>Revenue Analysis</h3><p className="text-sm">Sources: MNO 50/50, Gateway ($14.7M Q3), Gov ($63M+), Prepayments, Spectrum. $1B+ contracted.</p></div>
      <div className="card"><div className="card-title">Sources</div>{revenueSources.map((r, i) => (<div key={i} className="flex items-center justify-between p-2 border-b border-slate-800"><div><span className="font-medium text-cyan-400">{r.source}</span><span className="text-slate-400 text-sm ml-2">{r.description}</span></div><span className={`text-xs px-2 py-1 rounded ${r.status.includes('Active') ? 'bg-green-900/50 text-green-400' : 'bg-slate-700'}`}>{r.status}</span></div>))}</div>
      <div className="g4">
        <Card label="Gross" value={`$${(calc.grossAnnualRev / 1000).toFixed(1)}B`} color="cyan" />
        <Card label="Share" value={`${revenueShare}%`} color="blue" />
        <Card label="Contracted" value={`$${contractedRevenue}M+`} color="purple" />
        <Card label="ASTS Rev" value={`$${(calc.astsAnnualRev / 1000).toFixed(1)}B`} color="green" />
      </div>
      <div className="card"><div className="card-title">Ramp</div><ResponsiveContainer width="100%" height={220}><AreaChart data={ramp}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="year" stroke="var(--text3)" /><YAxis stroke="var(--text3)" tickFormatter={v => `$${v}B`} /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} /><Legend /><Area type="monotone" dataKey="commercial" stackId="1" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.6} /><Area type="monotone" dataKey="gov" stackId="1" stroke="var(--gold)" fill="var(--gold)" fillOpacity={0.6} /><Area type="monotone" dataKey="gateway" stackId="1" stroke="var(--violet)" fill="var(--violet)" fillOpacity={0.6} /></AreaChart></ResponsiveContainer></div>
      <div className="card"><div className="card-title">Parameters</div><div className="g2"><Input label="Share %" value={revenueShare} onChange={setRevenueShare} /><Input label="Gov $M/yr" value={govRevenue} onChange={setGovRevenue} /></div></div>
      
      <CFANotes title="CFA Level III — Revenue Model" items={[
        { term: 'Revenue Share Model', def: 'ASTS typically splits commercial revenue 50/50 with MNO partners. ASTS provides satellite capacity, MNOs provide spectrum and customers.' },
        { term: 'Contracted Revenue', def: '$1B+ in binding commercial commitments. Provides revenue visibility but timing depends on constellation deployment.' },
        { term: 'Gateway Revenue', def: 'Revenue from ground station equipment and services. $14.7M in Q3 2025. More predictable than subscriber-based revenue.' },
        { term: 'Government Contracts', def: 'SDA ($43M), DIU (up to $20M), FirstNet testing. Provides diversification and validation of technology.' },
        { term: 'Revenue Ramp', def: 'S-curve expected: slow 2025-2026 during deployment, accelerating 2027+ as coverage expands and MNOs activate.' },
        { term: 'Gross vs Net', def: 'Gross = total platform revenue. Net to ASTS = gross × revenue share %. Model at ASTS level for earnings.' },
      ]} />
    </div>
  );
};

// ENHANCED PARTNERS TAB - Institutional grade with full spectrum, contracts, and financial details
const PartnersTab = ({ partners, revenueShare, blendedARPU, penetrationRate }) => {
  // Definitive Commercial Agreements (binding contracts with prepayments/commitments)
  const definitiveAgreements = [
    { 
      partner: 'AT&T', 
      region: 'United States', 
      subs: 200, 
      status: 'Definitive',
      signDate: '2024',
      term: 'Multi-year',
      spectrum: '850 MHz (shared)',
      spectrumType: 'Low-band',
      prepayment: 20,
      prepayStatus: 'Received',
      revenueCommitment: 'Included in $1B+',
      notes: 'First VoLTE call completed. Gateway installations underway.',
      keyMilestones: ['First 2G call Apr 2023', 'First 5G call 2023', 'VoLTE calls 2025']
    },
    { 
      partner: 'Verizon', 
      region: 'United States', 
      subs: 145, 
      status: 'Definitive',
      signDate: 'Oct 2025',
      term: 'Multi-year',
      spectrum: '850 MHz (shared)',
      spectrumType: 'Low-band',
      prepayment: 100,
      prepayStatus: 'Committed (May 2024)',
      revenueCommitment: 'Included in $1B+',
      notes: 'Extends May 2024 $100M commitment. RCS messaging demonstrated.',
      keyMilestones: ['$100M commitment May 2024', 'Definitive agreement Oct 2025', 'VoLTE + RCS demos 2025']
    },
    { 
      partner: 'Vodafone Group', 
      region: 'Europe/Africa', 
      subs: 500, 
      status: 'Definitive',
      signDate: 'Dec 2024',
      term: 'Through 2034',
      spectrum: '2GHz MSS',
      spectrumType: 'Mid-band',
      prepayment: 25,
      prepayStatus: 'Received',
      revenueCommitment: 'Included in $1B+',
      notes: 'SatCo JV for EU. 21/27 EU member states MOUs signed.',
      keyMilestones: ['Original investor 2020', '2034 extension Dec 2024', 'SatCo JV 2025']
    },
    { 
      partner: 'stc Group', 
      region: 'Saudi Arabia/MENA', 
      subs: 80, 
      status: 'Definitive',
      signDate: 'Oct 2025',
      term: '10 years',
      spectrum: 'TBD (local)',
      spectrumType: 'Local MNO',
      prepayment: 175,
      prepayStatus: 'Due by YE 2025',
      revenueCommitment: 'Significant long-term',
      notes: '3 gateways in Saudi. NOC in Riyadh. First MENA deal.',
      keyMilestones: ['MOU early 2023', '$175M prepay announced Oct 2025', 'Q4 2026 service target']
    },
  ];

  // Other Key Partners (MOUs, non-definitive)
  const otherPartners = [
    { partner: 'Vodafone Idea', region: 'India', subs: 250, status: 'Definitive', spectrum: 'TBD', notes: 'June 2025 agreement' },
    { partner: 'Rakuten', region: 'Japan', subs: 5, status: 'Definitive', spectrum: 'LTE', notes: 'Investor. Video calls completed.' },
    { partner: 'Bell Canada', region: 'Canada', subs: 23, status: 'Definitive', spectrum: 'TBD', notes: 'First Canadian VoLTE call 2025' },
    { partner: 'Orange', region: 'Europe/Africa', subs: 250, status: 'MOU', spectrum: 'TBD', notes: 'Part of SatCo discussions' },
    { partner: 'Telefonica', region: 'Europe/LatAm', subs: 380, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'TIM', region: 'Italy/Brazil', subs: 100, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'MTN', region: 'Africa', subs: 280, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'Telstra', region: 'Australia', subs: 20, status: 'MOU', spectrum: 'TBD', notes: 'Agreement in place' },
    { partner: 'Others (35+)', region: 'Global', subs: 1100, status: 'Various', spectrum: 'Various', notes: '50+ total MNO agreements' },
  ];

  // ASTS-Owned Spectrum Holdings
  const ownedSpectrum = [
    {
      name: 'Ligado L-Band',
      band: '1525-1559 MHz',
      size: '40 MHz',
      coverage: 'US + Canada',
      term: '80+ years',
      cost: '$550M + $80M/yr',
      status: 'Closed Oct 2025',
      type: 'MSS Mid-band',
      notes: 'Largest available nationwide spectrum block in US'
    },
    {
      name: 'Additional L-Band',
      band: '1670-1675 MHz',
      size: '5 MHz',
      coverage: 'United States',
      term: '80+ years',
      cost: 'Included above',
      status: 'Closed',
      type: 'Mid-band',
      notes: 'Part of Ligado transaction'
    },
    {
      name: 'EllioSat S-Band',
      band: '1980-2010 / 2170-2200 MHz',
      size: '60 MHz',
      coverage: 'Global (ITU priority)',
      term: 'Ongoing',
      cost: '$64.5M ($26M + $38.5M deferred)',
      status: 'Closed Sept 2025',
      type: 'S-band MSS',
      notes: 'ITU priority rights. Some analyst skepticism on usability.'
    },
  ];

  // Partner Spectrum (shared)
  const partnerSpectrum = [
    { partner: 'AT&T', band: '850 MHz', type: 'Low-band', coverage: 'US nationwide', notes: 'Premium low-band, superior penetration' },
    { partner: 'Verizon', band: '850 MHz', type: 'Low-band', coverage: 'US nationwide', notes: 'Combined with AT&T for ~100% US geo coverage' },
    { partner: 'Vodafone', band: '2GHz MSS', type: 'Mid-band', coverage: 'Europe/Africa', notes: 'Through SatCo JV' },
    { partner: 'Various MNOs', band: '700-2600 MHz', type: 'Low/Mid', coverage: 'Global', notes: '1,150 MHz tunable across 50+ partners' },
  ];

  // Government Contracts
  const govContracts = [
    { agency: 'Space Development Agency (SDA)', value: '$43M', status: 'Active', notes: 'Satellite communications' },
    { agency: 'Defense Innovation Unit (DIU)', value: 'Up to $20M', status: 'Active', notes: 'Via prime contractor' },
    { agency: 'FirstNet (Band 14)', value: 'Testing', status: 'Authorized Apr 2025', notes: 'First responder communications' },
    { agency: 'New Prime Contract', value: 'TBD', status: 'Subject to negotiations', notes: 'Announced Q3 2025' },
  ];

  const totalPrepay = definitiveAgreements.reduce((s, p) => s + p.prepayment, 0);
  const totalDefinitiveSubs = definitiveAgreements.reduce((s, p) => s + p.subs, 0);
  const totalOtherSubs = otherPartners.reduce((s, p) => s + p.subs, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Partners</h2>
      <div className="highlight"><h3>Partner & Spectrum Intelligence</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-cyan-400">Commercial Strategy:</strong> 50+ MNO agreements covering ~3B subscribers. $1B+ contracted revenue commitments. 50/50 revenue share model.</p>
          <p><strong className="text-cyan-400">Spectrum:</strong> ~80 MHz owned/controlled in US (45 MHz L-band + 5 MHz + partner spectrum). 60 MHz S-band global ITU priority. 1,150 MHz tunable MNO spectrum globally.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card label="Contracted Rev" value="$1B+" sub="Commercial commitments" color="green" />
        <Card label="Prepayments" value={`$${totalPrepay}M`} sub="Non-dilutive" color="cyan" />
        <Card label="Definitive MNOs" value="4" sub={`${totalDefinitiveSubs}M subs`} color="blue" />
        <Card label="Total MNOs" value="50+" sub={`~3B subs`} color="purple" />
        <Card label="US Spectrum" value="80+ MHz" sub="Owned + partner" color="yellow" />
      </div>

      {/* Definitive Agreements - Detailed */}
      <div className="card"><div className="card-title">Definitive Commercial Agreements (Binding)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-700">
                <th className="text-left py-2">Partner</th>
                <th className="text-center">Region</th>
                <th className="text-right">Subs</th>
                <th className="text-center">Spectrum</th>
                <th className="text-center">Term</th>
                <th className="text-right">Prepayment</th>
                <th className="text-left pl-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {definitiveAgreements.map(p => (
                <tr key={p.partner} className="border-t border-slate-800 hover:bg-slate-800/30">
                  <td className="py-2 font-medium text-cyan-400">{p.partner}</td>
                  <td className="py-2 text-center text-slate-400">{p.region}</td>
                  <td className="py-2 text-right">{p.subs}M</td>
                  <td className="py-2 text-center"><span className="px-2 py-0.5 bg-slate-700 rounded text-xs">{p.spectrum}</span></td>
                  <td className="py-2 text-center text-slate-400">{p.term}</td>
                  <td className="py-2 text-right font-medium text-green-400">${p.prepayment}M</td>
                  <td className="py-2 pl-2 text-xs text-slate-400">{p.prepayStatus}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-600 bg-slate-800/50">
                <td className="py-2 font-bold" colSpan={2}>Total Definitive</td>
                <td className="py-2 text-right font-bold text-cyan-400">{totalDefinitiveSubs}M</td>
                <td colSpan={2}></td>
                <td className="py-2 text-right font-bold text-green-400">${totalPrepay}M</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Details Expansion */}
      <div className="g2">
        {definitiveAgreements.map(p => (
          <div key={p.partner} className="card"><div className="card-title">{p.partner} Details</div>
            <div className="space-y-2 text-sm">
              <Row label="Signed" value={p.signDate} />
              <Row label="Term" value={p.term} />
              <Row label="Spectrum" value={`${p.spectrum} (${p.spectrumType})`} />
              <Row label="Prepayment" value={`$${p.prepayment}M - ${p.prepayStatus}`} highlight />
              <Row label="Revenue Commitment" value={p.revenueCommitment} />
              <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-slate-400">{p.notes}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Spectrum Holdings */}
      <div className="card"><div className="card-title">ASTS-Owned Spectrum Holdings</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Asset</th>
              <th className="text-center">Band</th>
              <th className="text-center">Size</th>
              <th className="text-center">Coverage</th>
              <th className="text-center">Term</th>
              <th className="text-right">Cost</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {ownedSpectrum.map(s => (
              <tr key={s.name} className="border-t border-slate-800">
                <td className="py-2 font-medium">{s.name}</td>
                <td className="py-2 text-center text-xs">{s.band}</td>
                <td className="py-2 text-center font-medium text-cyan-400">{s.size}</td>
                <td className="py-2 text-center text-slate-400">{s.coverage}</td>
                <td className="py-2 text-center text-slate-400">{s.term}</td>
                <td className="py-2 text-right text-yellow-400">{s.cost}</td>
                <td className="py-2 text-center"><span className="px-2 py-0.5 bg-green-900/50 text-green-400 rounded text-xs">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-xs text-slate-500">
          Total owned: 45 MHz L-band (US/Canada) + 60 MHz S-band (global ITU priority). $80M/yr ongoing L-band payments.
        </div>
      </div>

      {/* Partner Spectrum */}
      <div className="card"><div className="card-title">Partner Spectrum (Shared Access)</div>
        <div className="g2">
          {partnerSpectrum.map(s => (
            <div key={s.partner} className="p-3 bg-slate-800/30 rounded border border-slate-700/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-cyan-400">{s.partner}</span>
                <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">{s.band}</span>
              </div>
              <div className="text-xs text-slate-400">{s.type} • {s.coverage}</div>
              <div className="text-xs text-slate-500 mt-1">{s.notes}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2 bg-cyan-900/20 border border-cyan-800/30 rounded text-xs">
          <strong className="text-cyan-400">Key Insight:</strong> Combined AT&T + Verizon 850 MHz spectrum enables ~100% continental US geographic coverage. 
          Platform tunable across 1,150 MHz of global MNO spectrum.
        </div>
      </div>

      {/* Government Contracts */}
      <div className="card"><div className="card-title">Government Contracts</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Agency</th>
              <th className="text-right">Value</th>
              <th className="text-center">Status</th>
              <th className="text-left pl-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {govContracts.map(g => (
              <tr key={g.agency} className="border-t border-slate-800">
                <td className="py-2">{g.agency}</td>
                <td className="py-2 text-right font-medium text-green-400">{g.value}</td>
                <td className="py-2 text-center"><span className={`px-2 py-0.5 rounded text-xs ${g.status.includes('Active') ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>{g.status}</span></td>
                <td className="py-2 pl-2 text-xs text-slate-400">{g.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-xs text-slate-500">
          Total disclosed government contracts: $63M+. Dual-use model prioritized. Additional contracts pending government reopening.
        </div>
      </div>

      {/* Other MNO Partners */}
      <div className="card"><div className="card-title">Other Key Partners (MOUs & Agreements)</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Partner</th>
              <th className="text-center">Region</th>
              <th className="text-right">Subs</th>
              <th className="text-center">Status</th>
              <th className="text-left pl-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {otherPartners.map(p => (
              <tr key={p.partner} className="border-t border-slate-800">
                <td className="py-2">{p.partner}</td>
                <td className="py-2 text-center text-slate-400">{p.region}</td>
                <td className="py-2 text-right text-cyan-400">{p.subs}M</td>
                <td className="py-2 text-center"><span className={`px-2 py-0.5 rounded text-xs ${p.status === 'Definitive' ? 'bg-green-900/50 text-green-400' : 'bg-slate-700 text-slate-400'}`}>{p.status}</span></td>
                <td className="py-2 pl-2 text-xs text-slate-400">{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue Commitment Summary */}
      <div className="card"><div className="card-title">Revenue Commitment Breakdown</div>
        <div className="g3">
          <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-400">$1B+</div>
            <div className="text-sm text-slate-400">Total Contracted Revenue</div>
            <div className="text-xs text-slate-500 mt-1">Hard commitments, not soft MOUs</div>
          </div>
          <div className="p-4 bg-cyan-900/20 border border-cyan-800/30 rounded-xl text-center">
            <div className="text-3xl font-bold text-cyan-400">${totalPrepay}M</div>
            <div className="text-sm text-slate-400">Total Prepayments</div>
            <div className="text-xs text-slate-500 mt-1">stc $175M due YE 2025</div>
          </div>
          <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-xl text-center">
            <div className="text-3xl font-bold text-purple-400">50/50</div>
            <div className="text-sm text-slate-400">Revenue Share Model</div>
            <div className="text-xs text-slate-500 mt-1">MNOs handle billing/support</div>
          </div>
        </div>
      </div>
      
      <CFANotes title="CFA Level III — Partnership Analysis" items={[
        { term: 'Definitive vs MoU', def: 'Definitive = binding commercial agreement with financial terms. MoU = memorandum of understanding, non-binding intent.' },
        { term: 'Prepayment Commitments', def: 'Cash paid upfront against future services. De-risks revenue, shows partner conviction. AT&T: $20M+.' },
        { term: 'Spectrum Access', def: 'MNO spectrum enables ASTS satellites to transmit. 1,150+ MHz tunable across partners. Critical regulatory moat.' },
        { term: 'Exclusivity Terms', def: 'Exclusive vs non-exclusive territories. Exclusivity limits TAM but locks in partners. Monitor contract terms.' },
        { term: 'Revenue Share Economics', def: 'Typically 50/50 split. ASTS provides space infrastructure, MNO provides spectrum, distribution, billing.' },
        { term: 'Partner Concentration', def: 'Top 5 partners represent ~50% of addressable subs. Diversification reduces single-partner risk.' },
      ]} />
    </div>
  );
};

const RunwayTab = ({ calc, cashOnHand, setCashOnHand, quarterlyBurn, setQuarterlyBurn, totalDebt, setTotalDebt, debtRate, setDebtRate, currentShares, currentStockPrice }) => {
  const proj = useMemo(() => { let c = cashOnHand; return Array.from({ length: 13 }, (_, q) => { const r = { q: `Q${((3 + q) % 4) + 1}'${25 + Math.floor((3 + q) / 4)}`, cash: c }; c = Math.max(0, c - quarterlyBurn); return r; }); }, [cashOnHand, quarterlyBurn]);
  const dilution = [250, 500, 750, 1000].map(r => ({ r, new: r / currentStockPrice, dil: (r / currentStockPrice) / (currentShares + r / currentStockPrice) * 100, runway: (cashOnHand + r) / quarterlyBurn }));
  
  // Q3 2025 Actuals from earnings
  const financials = {
    cashQ3: 1200, // Actual cash on hand Q3 (before pro forma)
    cashProForma: 3200, // Pro forma including convertible + ATM
    q3Revenue: 14.7,
    h2Guidance: '50-75',
    q3AdjOpex: 67.7,
    q3Capex: 259,
    q4CapexGuide: '275-325',
    q4OpexGuide: '~65',
    satCost: '21-23',
    employees: null, // TODO: verify with SeekingAlpha
    // Q3 10-Q Debt (Net Carrying Values):
    debtJan2032: 49, // Remaining from Jan 2025 converts (net)
    debtJul2032: 530, // Jul 2025 converts (net of $45M discount)
    debtOct2036: 119, // Oct 2025 converts (net of $881M discount - partial Q3)
    totalDebtNet: 698, // $697.6M net long-term debt per balance sheet
    totalDebtGross: 724, // ~$724M total gross indebtedness
    totalDebtPrincipal: 1625, // Face value: $50M + $575M + $1,000M
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Runway</h2>
      <div className="highlight"><h3>Cash Runway — Q3 2025 Actuals</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-cyan-400">Q3 GAAP Cash:</strong> $1.2B. ~4 quarters runway at current burn. Pro forma ($3.2B) pending 10-K confirmation.</p>
          <p><strong className="text-cyan-400">Debt (Balance Sheet):</strong> $697.6M net long-term debt (~$724M gross). Principal outstanding: $1.625B ($50M + $575M + $1B converts).</p>
          <p><strong className="text-cyan-400">Q4 Guidance:</strong> CapEx $275-325M, OpEx ~$65M. Satellite cost: $21-23M average.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card label="Q3 GAAP Cash" value={`$${(cashOnHand / 1000).toFixed(1)}B`} sub="~4Q runway at $300M/Q" color="green" />
        <Card label="Q4 Burn Est." value={`$${quarterlyBurn}M`} sub="CapEx + OpEx" color="red" />
        <Card label="Runway" value={`${calc.cashRunwayQuarters.toFixed(1)}Q`} sub={`~${(calc.cashRunwayQuarters / 4).toFixed(1)} years`} color="yellow" />
        <Card label="Debt" value={`$${(totalDebt/1000).toFixed(1)}B`} sub={`${debtRate}% blended`} color="orange" />
        <Card label="Employees" value="~1,800" sub="Global workforce" color="blue" />
      </div>

      {/* Q3 2025 Financial Summary */}
      <div className="card"><div className="card-title">Q3 2025 Financial Summary</div>
        <div className="g2">
          <div>
            <h4 className="text-sm font-medium text-cyan-400 mb-2">Income Statement</h4>
            <Row label="Q3 Revenue" value={`$${financials.q3Revenue}M`} highlight />
            <Row label="H2 2025 Guidance" value={`$${financials.h2Guidance}M`} />
            <Row label="Q3 Adj. OpEx" value={`$${financials.q3AdjOpex}M`} />
            <Row label="Q4 OpEx Guidance" value={financials.q4OpexGuide} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-cyan-400 mb-2">Capital</h4>
            <Row label="Q3 CapEx" value={`$${financials.q3Capex}M`} />
            <Row label="Q4 CapEx Guidance" value={`$${financials.q4CapexGuide}M`} />
            <Row label="Satellite Cost (avg)" value={`$${financials.satCost}M`} highlight />
            <Row label="Manufacturing Rate" value="6 sats/month by Dec" />
          </div>
        </div>
      </div>

      {/* Convertible Debt Summary */}
      <div className="card"><div className="card-title">Convertible Debt Outstanding (Q3 2025)</div>
        <div className="mb-3 p-2 bg-slate-800/50 rounded-lg text-xs text-slate-400">
          <strong className="text-cyan-400">Balance Sheet vs Principal:</strong> Convertible notes are reported at net carrying value (gross less debt discounts and issuance costs). 
          The $697.6M on the balance sheet represents this accounting value, while $1.625B is the principal that must eventually be repaid or converted.
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          <div className="p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-lg text-center">
            <div className="text-xl font-bold text-yellow-400">$49M</div>
            <div className="text-xs text-slate-400">Jan 2025 (4.25%)</div>
            <div className="text-xs text-slate-500">Net carrying</div>
            <div className="text-xs text-slate-600">Principal: $50M</div>
          </div>
          <div className="p-3 bg-orange-900/20 border border-orange-800/30 rounded-lg text-center">
            <div className="text-xl font-bold text-orange-400">$530M</div>
            <div className="text-xs text-slate-400">Jul 2025 (4.25%)</div>
            <div className="text-xs text-slate-500">Net carrying</div>
            <div className="text-xs text-slate-600">Principal: $575M</div>
          </div>
          <div className="p-3 bg-cyan-900/20 border border-cyan-800/30 rounded-lg text-center">
            <div className="text-xl font-bold text-cyan-400">$119M</div>
            <div className="text-xs text-slate-400">Oct 2025 (2.0%)</div>
            <div className="text-xs text-slate-500">Net carrying (Q3)</div>
            <div className="text-xs text-slate-600">Principal: $1,000M</div>
          </div>
          <div className="p-3 bg-emerald-900/20 border border-emerald-800/30 rounded-lg text-center">
            <div className="text-xl font-bold text-emerald-400">$698M</div>
            <div className="text-xs text-slate-400">Balance Sheet</div>
            <div className="text-xs text-slate-500">Net long-term debt</div>
            <div className="text-xs text-slate-600">Gross: ~$724M</div>
          </div>
          <div className="p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg text-center">
            <div className="text-xl font-bold text-purple-400">$1,625M</div>
            <div className="text-xs text-slate-400">Principal Value</div>
            <div className="text-xs text-slate-500">Total outstanding</div>
            <div className="text-xs text-slate-600">~2.8% blended rate</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Jan 2025: $410M converted to equity (17.3M shares). Oct 2025 raised at best terms in years ($96.30 strike, 2% coupon). Large discount on Oct notes due to favorable conversion terms.
        </div>
      </div>

      {/* Cash Projection Chart */}
      <div className="card"><div className="card-title">Cash Projection (at current burn)</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={proj}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="q" stroke="var(--text3)" fontSize={10} />
            <YAxis stroke="var(--text3)" tickFormatter={v => `$${(v/1000).toFixed(1)}B`} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)' }} formatter={v => [`$${(v/1000).toFixed(2)}B`, 'Cash']} />
            <Area dataKey="cash" stroke="var(--mint)" fill="var(--mint)" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="text-xs text-slate-500 mt-1">
          Note: Does not include H2 revenue ($50-75M guidance) or future prepayments (stc $175M due YE 2025).
        </div>
      </div>

      {/* Funding Sources */}
      <div className="card"><div className="card-title">Capital Raises History (2021-2025)</div>
        <div className="mb-4 p-3 bg-slate-800/30 rounded-lg">
          <p className="text-sm text-slate-400">
            <strong className="text-cyan-400">Understanding ASTS Financing:</strong> As a pre-revenue company building a global satellite constellation, 
            ASTS has used various instruments: SPAC, convertibles, equity offerings, and strategic investments. 
            Convertible notes are debt that can convert to equity at specified prices. When stock price rises above conversion price, 
            holders often convert (eliminating debt) or the company may force conversion. Below shows the full capital structure evolution.
          </p>
        </div>
        
        <h4 className="text-sm font-medium text-yellow-400 mb-2">2025 Capital Raises</h4>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Source</th>
              <th className="text-right">Amount</th>
              <th className="text-center">Terms</th>
              <th className="text-left pl-2">Status & Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-800">
              <td className="py-2">Jan 2025 Convertible</td>
              <td className="py-2 text-right text-green-400">$460M</td>
              <td className="py-2 text-center">4.25%, 2032</td>
              <td className="py-2 pl-2 text-xs text-slate-400">$410M repurchased for equity (shares issued); $50M remains as debt</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Jul 2025 Convertible</td>
              <td className="py-2 text-right text-green-400">$575M</td>
              <td className="py-2 text-center">4.25%, 2032</td>
              <td className="py-2 pl-2 text-xs text-slate-400">$120.12 effective strike via capped call; outstanding as debt</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Oct 2025 Convertible</td>
              <td className="py-2 text-right text-green-400">$1,000M</td>
              <td className="py-2 text-center">2%, 2036</td>
              <td className="py-2 pl-2 text-xs text-slate-400">$96.30 strike; 10-year term; outstanding as debt</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">ATM Facility (Q3)</td>
              <td className="py-2 text-right text-green-400">$389M</td>
              <td className="py-2 text-center">At-the-market</td>
              <td className="py-2 pl-2 text-xs text-slate-400">Shares sold at market; facility now terminated</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Capped Call Unwind</td>
              <td className="py-2 text-right text-green-400">$74.5M</td>
              <td className="py-2 text-center">—</td>
              <td className="py-2 pl-2 text-xs text-slate-400">Hedge monetized when Jan converts repurchased</td>
            </tr>
          </tbody>
        </table>

        <h4 className="text-sm font-medium text-purple-400 mb-2">2024 Capital Raises</h4>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Source</th>
              <th className="text-right">Amount</th>
              <th className="text-center">Terms</th>
              <th className="text-left pl-2">Status & Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-800">
              <td className="py-2">2034 Strategic Convertibles</td>
              <td className="py-2 text-right text-green-400">$148.5M</td>
              <td className="py-2 text-center">3.875%, 2034</td>
              <td className="py-2 pl-2 text-xs text-slate-400">AT&T, Google, Vodafone, Verizon. Force-converted to equity Jan 2025 (25.8M shares)</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Public Warrant Exercise</td>
              <td className="py-2 text-right text-green-400">$153.6M</td>
              <td className="py-2 text-center">$11.50/share</td>
              <td className="py-2 pl-2 text-xs text-slate-400">Warrants redeemed Sept 2024; ~13.4M shares issued</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Verizon Strategic Investment</td>
              <td className="py-2 text-right text-green-400">$100M</td>
              <td className="py-2 text-center">Equity + Commitment</td>
              <td className="py-2 pl-2 text-xs text-slate-400">May 2024; converted to definitive Oct 2025</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Google Investment</td>
              <td className="py-2 text-right text-green-400">$100M</td>
              <td className="py-2 text-center">Equity + Commitment</td>
              <td className="py-2 pl-2 text-xs text-slate-400">May 2024; strategic technology partnership</td>
            </tr>
          </tbody>
        </table>

        <h4 className="text-sm font-medium text-blue-400 mb-2">2021-2023 Foundation</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Source</th>
              <th className="text-right">Amount</th>
              <th className="text-center">Terms</th>
              <th className="text-left pl-2">Status & Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-800">
              <td className="py-2">SPAC (April 2021)</td>
              <td className="py-2 text-right text-green-400">$462M</td>
              <td className="py-2 text-center">SPAC + PIPE</td>
              <td className="py-2 pl-2 text-xs text-slate-400">IPO via New Providence; $230M PIPE from Vodafone, Rakuten, American Tower</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">B. Riley ATM (2022)</td>
              <td className="py-2 text-right text-green-400">$75M</td>
              <td className="py-2 text-center">ATM facility</td>
              <td className="py-2 pl-2 text-xs text-slate-400">24-month committed equity; used opportunistically</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">NanoAvionics Sale</td>
              <td className="py-2 text-right text-green-400">$28M net</td>
              <td className="py-2 text-center">Asset sale</td>
              <td className="py-2 pl-2 text-xs text-slate-400">Subsidiary sold to Kongsberg (July 2022); focused ASTS on core mission</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="py-2">Atlas Facility</td>
              <td className="py-2 text-right text-green-400">$30M</td>
              <td className="py-2 text-center">Secured loan</td>
              <td className="py-2 pl-2 text-xs text-slate-400">Equipment-backed; partially repaid</td>
            </tr>
          </tbody>
        </table>
        
        <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
          <h4 className="text-sm font-medium text-green-400 mb-2">Debt Resolution Summary</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>• <strong>2034 Strategic Converts ($148.5M):</strong> Force-converted to equity Jan 2025 when stock price exceeded trigger. Debt eliminated, 25.8M shares issued.</li>
            <li>• <strong>Jan 2025 Converts ($460M):</strong> $410M repurchased via equity issuance (arbitrage opportunity). $50M still outstanding as 4.25% notes due 2032.</li>
            <li>• <strong>Jul/Oct 2025 Converts ($1,575M):</strong> Currently outstanding as debt. Will convert to equity if stock exceeds strike prices ($120.12 / $96.30) or at maturity.</li>
            <li>• <strong>Atlas/Lone Star Loans:</strong> Partially repaid; minimal remaining balance secured by equipment/real estate.</li>
          </ul>
        </div>
      </div>

      {/* Dilution Analysis */}
      <div className="card"><div className="card-title">Hypothetical Dilution (if additional raise needed)</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Raise Amount</th>
              <th className="text-right">New Shares</th>
              <th className="text-right">Dilution</th>
              <th className="text-right">Extended Runway</th>
            </tr>
          </thead>
          <tbody>
            {dilution.map(d => (
              <tr key={d.r} className="border-t border-slate-800">
                <td className="py-2">${d.r}M</td>
                <td className="py-2 text-right text-cyan-400">{d.new.toFixed(1)}M</td>
                <td className="py-2 text-right text-red-400">{d.dil.toFixed(1)}%</td>
                <td className="py-2 text-right text-green-400">{d.runway.toFixed(1)}Q</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-xs text-slate-500">
          Note: Company states fully funded for 100+ satellites. Additional raises unlikely in near term.
        </div>
      </div>

      {/* Parameters */}
      <div className="card"><div className="card-title">Parameters</div>
        <div className="g4">
          <Input label="Pro Forma Cash $M" value={cashOnHand} onChange={setCashOnHand} />
          <Input label="Q4 Burn Est. $M" value={quarterlyBurn} onChange={setQuarterlyBurn} />
          <Input label="Remaining Debt $M" value={totalDebt} onChange={setTotalDebt} />
          <Input label="Debt Rate %" value={debtRate} onChange={setDebtRate} step={0.25} />
        </div>
      </div>
      
      <CFANotes title="CFA Level III — Cash Runway Analysis" items={[
        { term: 'Runway Calculation', def: 'Cash ÷ Quarterly Burn = Quarters of funding. Pre-revenue companies need sufficient runway to reach profitability.' },
        { term: 'Pro Forma vs GAAP Cash', def: 'GAAP = actual cash on balance sheet. Pro forma includes committed financing not yet closed. Use GAAP for conservative analysis.' },
        { term: 'Convertible Debt', def: 'Bonds that convert to equity at holder option. Face value ($1.625B) vs net carrying value ($698M due to discounts).' },
        { term: 'Dilution Scenarios', def: 'If more capital needed, new shares reduce ownership %. ATM and converts are primary dilution sources.' },
        { term: 'Capital Intensity', def: 'CapEx requirements for satellite constellation. ASTS guiding $275-325M Q4, $21-23M per satellite.' },
        { term: 'Path to Cash Flow Positive', def: 'When revenue exceeds burn, runway becomes infinite. Track constellation deployment → service launch → revenue ramp.' },
      ]} />
    </div>
  );
};

// CAPITAL TAB - Share structure, offerings, dilution
const CapitalTab = ({ currentShares, currentStockPrice }) => {
  const [selectedView, setSelectedView] = useState('structure');
  
  // Current share class structure (Q3 2025)
  const shareClasses = [
    { 
      classType: 'Class A', 
      shares: 272.0, 
      description: 'Public trading shares (NASDAQ: ASTS)',
      votingRights: '1 vote per share',
      conversion: 'N/A',
    },
    { 
      classType: 'Class B', 
      shares: 11.2, 
      description: 'Founder/insider shares',
      votingRights: '1 vote per share',
      conversion: 'Convert 1:1 to Class A',
    },
    { 
      classType: 'Class C', 
      shares: 78.2, 
      description: 'Abel Avellan (Founder/CEO) shares',
      votingRights: '10 votes per share',
      conversion: 'Convert 1:1 to Class A upon transfer',
    },
  ];
  
  const totalBasic = shareClasses.reduce((sum, s) => sum + s.shares, 0);
  const fullyDiluted = 395.0; // Including options, RSUs, remaining converts
  
  // Major shareholders (known from filings)
  const majorShareholders = [
    { 
      name: 'Abel Avellan', 
      role: 'Founder, Chairman & CEO',
      shares: 78.2, 
      shareClass: 'Class C',
      pct: (78.2 / totalBasic * 100).toFixed(1),
      votingPct: ((78.2 * 10) / (272.0 + 11.2 + 78.2 * 10) * 100).toFixed(1),
      notes: '10x voting power via Class C'
    },
    { 
      name: 'AT&T', 
      role: 'Strategic Partner',
      shares: 6.5, 
      shareClass: 'Class A',
      pct: (6.5 / totalBasic * 100).toFixed(1),
      votingPct: (6.5 / (272.0 + 11.2 + 78.2 * 10) * 100).toFixed(1),
      notes: 'From 2034 convert + PIPE. First VoLTE partner.'
    },
    { 
      name: 'Vodafone Group', 
      role: 'Strategic Partner',
      shares: 6.5, 
      shareClass: 'Class A',
      pct: (6.5 / totalBasic * 100).toFixed(1),
      votingPct: (6.5 / (272.0 + 11.2 + 78.2 * 10) * 100).toFixed(1),
      notes: 'From 2034 convert + PIPE. SatCo JV partner.'
    },
    { 
      name: 'Google', 
      role: 'Strategic Investor',
      shares: 6.4, 
      shareClass: 'Class A',
      pct: (6.4 / totalBasic * 100).toFixed(1),
      votingPct: (6.4 / (272.0 + 11.2 + 78.2 * 10) * 100).toFixed(1),
      notes: 'From 2034 convert (Jan 2025 conversion)'
    },
    { 
      name: 'Verizon', 
      role: 'Strategic Partner',
      shares: 6.4, 
      shareClass: 'Class A',
      pct: (6.4 / totalBasic * 100).toFixed(1),
      votingPct: (6.4 / (272.0 + 11.2 + 78.2 * 10) * 100).toFixed(1),
      notes: 'From 2034 convert. $100M+ committed.'
    },
    { 
      name: 'Rakuten', 
      role: 'Strategic Partner',
      shares: 2.5, 
      shareClass: 'Class A',
      pct: '~0.7',
      votingPct: '~0.3',
      notes: 'PIPE investor. Japan market partner.'
    },
    { 
      name: 'American Tower', 
      role: 'Infrastructure Partner',
      shares: 2.5, 
      shareClass: 'Class A',
      pct: '~0.7',
      votingPct: '~0.3',
      notes: 'PIPE investor. Tower infrastructure.'
    },
  ];
  
  // Equity offerings timeline
  const equityOfferings = [
    { date: '2019-09-11', event: 'NPA SPAC IPO', type: 'IPO', amount: 230, price: 10.00, shares: 23.0, notes: 'New Providence Acquisition Corp. Units at $10' },
    { date: '2021-04-06', event: 'SPAC Merger + PIPE', type: 'SPAC + PIPE', amount: 692, price: 10.00, shares: 69.2, notes: 'AST & Science merger. PIPE: Vodafone, Rakuten, American Tower' },
    { date: '2022-03-01', event: 'B. Riley ATM Facility', type: 'ATM', amount: 75, price: null, shares: null, notes: '24-month committed equity facility' },
    { date: '2022-12-02', event: 'Public Offering', type: 'Follow-on', amount: 75, price: 5.50, shares: 13.6, notes: 'BW3 funding' },
    { date: '2023-06-28', event: 'Public Offering', type: 'Follow-on', amount: 59.4, price: 5.00, shares: 11.9, notes: 'Working capital' },
    { date: '2024-01-19', event: 'Equity Raise', type: 'Private', amount: 100, price: 3.10, shares: 32.3, notes: 'Block 1 satellite funding' },
    { date: '2024-01-18', event: '2034 Strategic Converts', type: 'Convertible', amount: 148.5, price: 5.76, shares: 25.8, notes: 'AT&T, Google, Vodafone, Verizon. Force-converted Jan 2025.' },
    { date: '2025-01-08', event: 'Jan 2025 Convertible', type: 'Convertible', amount: 460, price: 26.58, shares: 17.3, notes: '4.25% due 2032. $410M repurchased for equity, $50M remains.' },
    { date: '2025-07-07', event: 'Jul 2025 Convertible', type: 'Convertible', amount: 575, price: 120.12, shares: 4.8, notes: '4.25% due 2032. Outstanding as debt.' },
    { date: '2025-10-14', event: 'Oct 2025 Convertible', type: 'Convertible', amount: 1150, price: 96.30, shares: 11.9, notes: '2.0% due 2036. Best terms in years. Outstanding as debt.' },
    { date: '2025-09-30', event: 'Q3 2025 ATM Program', type: 'ATM', amount: 287, price: null, shares: null, notes: 'At-the-market sales. Facility terminated.' },
  ];
  
  // Fully diluted share count evolution
  const dilutionHistory = [
    { quarter: 'Q3 2019', classA: 5.75, implied: 5.75, fullyDiluted: 5.75, event: 'NPA SPAC pre-IPO (founder shares)' },
    { quarter: 'Q4 2019', classA: 23.0, implied: 28.75, fullyDiluted: 42.0, event: 'SPAC IPO completed' },
    { quarter: 'Q4 2020', classA: 23.0, implied: 28.75, fullyDiluted: 42.0, event: 'Pre-merger SPAC' },
    { quarter: 'Q1 2021', classA: 50.0, implied: 86.0, fullyDiluted: 118.0, event: 'SPAC merger Apr 6' },
    { quarter: 'Q4 2021', classA: 54.0, implied: 90.0, fullyDiluted: 118.0, event: 'Post-merger stabilization' },
    { quarter: 'Q4 2022', classA: 71.9, implied: 200.0, fullyDiluted: 215.0, event: '$75M offering @ $5.50' },
    { quarter: 'Q2 2023', classA: 72.0, implied: 200.0, fullyDiluted: 215.0, event: '$59.4M offering' },
    { quarter: 'Q4 2023', classA: 90.2, implied: 120.0, fullyDiluted: 145.0, event: 'Year-end 10-K' },
    { quarter: 'Q1 2024', classA: 100.0, implied: 218.0, fullyDiluted: 280.0, event: '$100M @ $3.10' },
    { quarter: 'Q2 2024', classA: 148.8, implied: 266.7, fullyDiluted: 320.0, event: 'Warrant exercise begins' },
    { quarter: 'Q3 2024', classA: 140.0, implied: 175.0, fullyDiluted: 245.0, event: 'Warrant redemption Sept' },
    { quarter: 'Q4 2024', classA: 208.2, implied: 255.0, fullyDiluted: 280.0, event: '2034 converts + Jan converts' },
    { quarter: 'Q1 2025', classA: 220.0, implied: 309.4, fullyDiluted: 350.0, event: 'Jan convert repurchase' },
    { quarter: 'Q2 2025', classA: 245.0, implied: 334.4, fullyDiluted: 380.0, event: 'Jul converts issued' },
    { quarter: 'Q3 2025', classA: 272.0, implied: 361.4, fullyDiluted: 395.0, event: 'Oct converts + ATM' },
  ];
  
  // Stock-based compensation history
  const sbcHistory = [
    { quarter: 'Q1 2023', sbc: 2.5, engineering: 1.4, gAndA: 1.1 },
    { quarter: 'Q2 2023', sbc: 5.5, engineering: 4.5, gAndA: 1.0 },
    { quarter: 'Q3 2023', sbc: 2.6, engineering: 1.5, gAndA: 1.1 },
    { quarter: 'Q4 2023', sbc: 2.7, engineering: 1.5, gAndA: 1.2 },
    { quarter: 'Q1 2024', sbc: 4.9, engineering: 1.6, gAndA: 3.3 },
    { quarter: 'Q2 2024', sbc: 8.8, engineering: 2.0, gAndA: 6.8 },
    { quarter: 'Q3 2024', sbc: 6.8, engineering: 3.4, gAndA: 3.4 },
    { quarter: 'Q4 2024', sbc: 11.4, engineering: 8.3, gAndA: 3.1 },
    { quarter: 'Q1 2025', sbc: 7.8, engineering: 4.0, gAndA: 3.8 },
    { quarter: 'Q2 2025', sbc: 10.5, engineering: 3.3, gAndA: 7.2 },
    { quarter: 'Q3 2025', sbc: 14.0, engineering: 8.0, gAndA: 6.0 },
  ];
  
  const marketCap = currentShares * currentStockPrice;
  const totalVotingShares = 272.0 + 11.2 + 78.2 * 10; // Class C has 10x voting

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Capital Structure</h2>
      <div className="highlight"><h3>Share Classes, Offerings & Dilution</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-cyan-400">Share Structure:</strong> Three-class structure with Abel Avellan controlling ~73% of voting power via Class C (10x votes).</p>
          <p><strong className="text-cyan-400">Capital Raised:</strong> ~$3.6B total since SPAC (equity + converts). Fully funded for 100+ satellites.</p>
          <p><strong className="text-cyan-400">Dilution:</strong> Class A shares grew from 5.75M (SPAC) to 272M (Q3 2025). Additional dilution possible from $1.625B converts.</p>
        </div>
      </div>
      
      {/* View Toggle */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedView('structure')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedView === 'structure' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>📊 Share Structure</button>
        <button onClick={() => setSelectedView('shareholders')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedView === 'shareholders' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>👥 Major Holders</button>
        <button onClick={() => setSelectedView('offerings')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedView === 'offerings' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>💰 Offerings</button>
        <button onClick={() => setSelectedView('incentives')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedView === 'incentives' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🎁 SBC</button>
        <button onClick={() => setSelectedView('dilution')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedView === 'dilution' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>📈 Dilution</button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card label="Class A Shares" value={`${shareClasses[0].shares}M`} sub="Public float" color="cyan" />
        <Card label="Implied Shares" value={`${totalBasic.toFixed(1)}M`} sub="A + B + C" color="purple" />
        <Card label="Fully Diluted" value={`${fullyDiluted}M`} sub="All securities" color="orange" />
        <Card label="Market Cap" value={`$${(marketCap / 1000).toFixed(1)}B`} sub={`@ $${currentStockPrice}`} color="green" />
        <Card label="FD Market Cap" value={`$${(fullyDiluted * currentStockPrice / 1000).toFixed(1)}B`} sub="All securities" color="yellow" />
      </div>
      
      {/* Share Structure View */}
      {selectedView === 'structure' && (
        <div className="card"><div className="card-title">Share Class Structure (Q3 2025)</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-3 text-slate-400">Class</th>
                  <th className="text-right py-3 px-3 text-slate-400">Shares (M)</th>
                  <th className="text-right py-3 px-3 text-slate-400">% of Basic</th>
                  <th className="text-left py-3 px-3 text-slate-400">Voting Rights</th>
                  <th className="text-left py-3 px-3 text-slate-400">Conversion</th>
                  <th className="text-left py-3 px-3 text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-medium text-cyan-400">Class A</td>
                  <td className="py-3 px-3 text-right tabular-nums">272.0M</td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-400">{(272.0 / totalBasic * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-slate-300">1 vote per share</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">N/A</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">Public trading shares (NASDAQ: ASTS)</td>
                </tr>
                <tr className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-medium text-purple-400">Class B</td>
                  <td className="py-3 px-3 text-right tabular-nums">11.2M</td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-400">{(11.2 / totalBasic * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-slate-300">1 vote per share</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">Convert 1:1 to Class A</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">Founder/insider shares</td>
                </tr>
                <tr className="border-t border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-medium text-orange-400">Class C</td>
                  <td className="py-3 px-3 text-right tabular-nums">78.2M</td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-400">{(78.2 / totalBasic * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-slate-300">10 votes per share</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">Convert 1:1 to Class A upon transfer</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">Abel Avellan (Founder/CEO) shares</td>
                </tr>
                <tr className="border-t-2 border-slate-600 bg-slate-800/30">
                  <td className="py-3 px-3 font-bold text-white">Total Basic</td>
                  <td className="py-3 px-3 text-right font-bold tabular-nums text-white">{totalBasic.toFixed(1)}M</td>
                  <td className="py-3 px-3 text-right tabular-nums text-white">100%</td>
                  <td colSpan={3}></td>
                </tr>
                <tr className="border-t border-slate-700">
                  <td className="py-3 px-3 font-medium text-yellow-400">+ Options/RSUs/Converts</td>
                  <td className="py-3 px-3 text-right tabular-nums text-yellow-400">{(fullyDiluted - totalBasic).toFixed(1)}M</td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-400">+{((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(1)}%</td>
                  <td colSpan={3} className="py-3 px-3 text-xs text-slate-500">Remaining Jan converts ($50M), employee options, RSUs</td>
                </tr>
                <tr className="border-t border-slate-600 bg-cyan-900/20">
                  <td className="py-3 px-3 font-bold text-cyan-400">Fully Diluted</td>
                  <td className="py-3 px-3 text-right font-bold tabular-nums text-cyan-400">{fullyDiluted.toFixed(1)}M</td>
                  <td className="py-3 px-3 text-right tabular-nums text-cyan-400">{(fullyDiluted / totalBasic * 100).toFixed(1)}%</td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Voting Power Analysis */}
          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <h4 className="text-sm font-medium text-orange-400 mb-3">⚡ Voting Power Analysis</h4>
            <div className="g2">
              <div>
                <div className="text-xs text-slate-500 uppercase mb-2">Economic Ownership</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Class A (Public)</span>
                    <span className="text-cyan-400">{(272.0 / totalBasic * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Class B (Insiders)</span>
                    <span className="text-purple-400">{(11.2 / totalBasic * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Class C (Abel Avellan)</span>
                    <span className="text-orange-400">{(78.2 / totalBasic * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-2">Voting Power (Class C = 10x)</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Class A (Public)</span>
                    <span className="text-cyan-400">{(272.0 / totalVotingShares * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Class B (Insiders)</span>
                    <span className="text-purple-400">{(11.2 / totalVotingShares * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">Class C (Abel Avellan)</span>
                    <span className="text-orange-400">{(78.2 * 10 / totalVotingShares * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700/50 text-xs text-slate-500">
              <strong className="text-orange-400">Note:</strong> Abel Avellan maintains majority voting control (~73%) despite only ~22% economic ownership through Class C super-voting shares.
            </div>
          </div>
        </div>
      )}
      
      {/* Major Shareholders View */}
      {selectedView === 'shareholders' && (
        <div className="card"><div className="card-title">Major Shareholders (Known from SEC Filings)</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-3 text-slate-400">Shareholder</th>
                  <th className="text-left py-3 px-3 text-slate-400">Role</th>
                  <th className="text-right py-3 px-3 text-slate-400">Shares (M)</th>
                  <th className="text-center py-3 px-3 text-slate-400">Class</th>
                  <th className="text-right py-3 px-3 text-slate-400">% Own</th>
                  <th className="text-right py-3 px-3 text-slate-400">% Vote</th>
                  <th className="text-left py-3 px-3 text-slate-400">Notes</th>
                </tr>
              </thead>
              <tbody>
                {majorShareholders.map((sh, i) => (
                  <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-medium text-white">{sh.name}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{sh.role}</td>
                    <td className="py-3 px-3 text-right tabular-nums">{typeof sh.shares === 'number' ? sh.shares.toFixed(1) : sh.shares}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs ${sh.shareClass === 'Class C' ? 'bg-orange-900/30 text-orange-400' : 'bg-cyan-900/30 text-cyan-400'}`}>
                        {sh.shareClass}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-slate-300">{sh.pct}%</td>
                    <td className="py-3 px-3 text-right tabular-nums text-slate-300">{sh.votingPct}%</td>
                    <td className="py-3 px-3 text-slate-500 text-xs">{sh.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-yellow-400">⚠️</span>
              <div className="text-xs text-slate-300">
                <strong className="text-yellow-400">Data Limitations:</strong> Full institutional ownership requires 13F filings analysis. 
                Strategic investor shares are estimates based on convertible note conversions and PIPE disclosures. 
                Actual holdings may differ.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Equity Offerings View */}
      {selectedView === 'offerings' && (
        <div className="card"><div className="card-title">Equity Offerings Timeline</div>
          <div className="space-y-3">
            {equityOfferings.map((offering, i) => (
              <div key={i} className="p-4 rounded-lg border bg-slate-900/50 border-slate-700/50">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">{offering.type}</span>
                      <span className="text-slate-500 text-xs">{offering.date}</span>
                    </div>
                    <div className="font-medium text-white mt-1">{offering.event}</div>
                    <div className="text-sm text-slate-400 mt-1">{offering.notes}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">${offering.amount}M</div>
                    {offering.price && (
                      <div className="text-xs text-slate-500">@ ${offering.price.toFixed(2)}/share</div>
                    )}
                    {offering.shares && (
                      <div className="text-xs text-slate-500">{offering.shares.toFixed(1)}M shares</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total Raised */}
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-400">Total Capital Raised (2019-2025)</div>
                <div className="text-xs text-slate-500">Equity + Convertibles + ATM</div>
              </div>
              <div className="text-2xl font-bold text-green-400">~$3.6B</div>
            </div>
          </div>
        </div>
      )}
      
      {/* SBC View */}
      {selectedView === 'incentives' && (
        <div className="card"><div className="card-title">Stock-Based Compensation (SBC)</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400">Quarter</th>
                  <th className="text-right py-2 px-3 text-slate-400">Total SBC</th>
                  <th className="text-right py-2 px-3 text-slate-400">Engineering</th>
                  <th className="text-right py-2 px-3 text-slate-400">G&A</th>
                </tr>
              </thead>
              <tbody>
                {sbcHistory.map((row, i) => (
                  <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/50">
                    <td className="py-2 px-3 text-slate-300">{row.quarter}</td>
                    <td className="py-2 px-3 text-right font-medium text-purple-400">${row.sbc.toFixed(1)}M</td>
                    <td className="py-2 px-3 text-right text-slate-400">${row.engineering.toFixed(1)}M</td>
                    <td className="py-2 px-3 text-right text-slate-400">${row.gAndA.toFixed(1)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* SBC Chart */}
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sbcHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v) => [`$${v.toFixed(1)}M`]} />
                <Bar dataKey="engineering" stackId="a" fill="#a855f7" name="Engineering" />
                <Bar dataKey="gAndA" stackId="a" fill="#6366f1" name="G&A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="text-xs text-slate-500 uppercase mb-1">2025 YTD SBC</div>
              <div className="text-xl font-bold text-purple-400">$32.3M</div>
              <div className="text-xs text-slate-500">Q1-Q3 2025</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="text-xs text-slate-500 uppercase mb-1">FY2024 Total SBC</div>
              <div className="text-xl font-bold text-purple-400">$31.9M</div>
              <div className="text-xs text-slate-500">Full year</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-slate-500">
            <strong className="text-slate-400">Note:</strong> SBC primarily consists of RSUs and stock options granted to employees. 
            Included in GAAP OpEx but excluded from Adjusted OpEx metrics. Specific plan details (authorized shares, vesting schedules) 
            available in DEF 14A proxy filings.
          </div>
        </div>
      )}
      
      {/* Dilution History View */}
      {selectedView === 'dilution' && (
        <div className="card"><div className="card-title">Share Count Evolution</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400">Quarter</th>
                  <th className="text-right py-2 px-3 text-slate-400">Class A</th>
                  <th className="text-right py-2 px-3 text-slate-400">Implied</th>
                  <th className="text-right py-2 px-3 text-slate-400">Fully Diluted</th>
                  <th className="text-left py-2 px-3 text-slate-400">Key Event</th>
                </tr>
              </thead>
              <tbody>
                {dilutionHistory.map((row, i) => (
                  <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/50">
                    <td className="py-2 px-3 text-slate-300">{row.quarter}</td>
                    <td className="py-2 px-3 text-right tabular-nums text-cyan-400">{row.classA.toFixed(1)}M</td>
                    <td className="py-2 px-3 text-right tabular-nums text-purple-400">{row.implied.toFixed(1)}M</td>
                    <td className="py-2 px-3 text-right tabular-nums text-orange-400">{row.fullyDiluted.toFixed(1)}M</td>
                    <td className="py-2 px-3 text-slate-500 text-xs">{row.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Dilution Chart */}
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dilutionHistory}>
                <defs>
                  <linearGradient id="classAGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="fdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v) => [`${v.toFixed(1)}M shares`]} />
                <Area type="monotone" dataKey="fullyDiluted" stroke="#f97316" fill="url(#fdGrad)" name="Fully Diluted" />
                <Area type="monotone" dataKey="classA" stroke="var(--cyan)" fill="url(#classAGrad)" name="Class A" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded"></div>
              <span className="text-slate-400">Class A (Public)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-slate-400">Fully Diluted</span>
            </div>
          </div>
          
          {/* Potential Future Dilution */}
          <div className="mt-4 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
            <h4 className="text-sm font-medium text-red-400 mb-2">⚠️ Potential Future Dilution</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Jan 2025 Converts (remaining $50M @ $26.58)</span>
                <span className="text-red-400">+1.9M shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Jul 2025 Converts ($575M @ $120.12)</span>
                <span className="text-red-400">+4.8M shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Oct 2025 Converts ($1,150M @ $96.30)</span>
                <span className="text-red-400">+11.9M shares</span>
              </div>
              <div className="flex justify-between border-t border-red-700/30 pt-2 font-medium">
                <span className="text-slate-300">Maximum Additional Dilution</span>
                <span className="text-red-400">+18.6M shares (~5%)</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Converts only dilute if stock price exceeds strike prices at conversion/maturity. 
              Company may also repurchase converts for cash instead of issuing shares.
            </div>
          </div>
        </div>
      )}
      
      <CFANotes title="CFA Level III — Capital Structure" items={[
        { term: 'Share Class Structure', def: 'Class A (public, 1 vote), Class B (insiders, 1 vote), Class C (founder, 10 votes). Dual/triple class gives founders control.' },
        { term: 'Voting vs Economic Rights', def: 'Abel Avellan\'s Class C shares give ~73% voting control despite ~22% economic ownership.' },
        { term: 'Fully Diluted Shares', def: 'Basic shares + options + RSUs + converts. Use for per-share calculations to avoid overstating value.' },
        { term: 'ATM (At-The-Market) Program', def: 'Allows gradual share issuance at market prices. $1.5B filed capacity. Dilutive but opportunistic.' },
        { term: 'Convertible Bonds', def: '$1.625B face value in 3 tranches. Strike prices $80-$180+. Convert to equity above strike or repay in cash.' },
        { term: 'Weighted Average Shares', def: 'For EPS calculation, weight shares by time outstanding during period.' },
      ]} />
    </div>
  );
};

// SCENARIOS TAB - Deterministic analysis
const ScenariosTab = ({ currentShares, currentStockPrice, totalDebt, cashOnHand }) => {
  const netCash = cashOnHand - totalDebt;
  const [targetYear, setTargetYear] = useState(2030);
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [showMath, setShowMath] = useState(false);
  
  // ============================================================================
  // YEAR CONFIGURATION
  // Each year scales from 2030 "anchor" values based on business maturity
  // ============================================================================
  const yearConfigs = {
    2026: { penMult: 0.08, revMult: 0.05, marginAdj: -40, multAdj: 0, sats: '45-60', phase: 'Initial Commercial Launch' },
    2027: { penMult: 0.18, revMult: 0.14, marginAdj: -25, multAdj: 0, sats: '70-90', phase: 'US/EU Continuous Coverage' },
    2028: { penMult: 0.38, revMult: 0.32, marginAdj: -12, multAdj: 0, sats: '90-110', phase: 'Global Expansion' },
    2029: { penMult: 0.68, revMult: 0.62, marginAdj: -5, multAdj: 0, sats: '110-130', phase: 'Scale & Optimization' },
    2030: { penMult: 1.00, revMult: 1.00, marginAdj: 0, multAdj: 0, sats: '130-150', phase: 'Mature Operations' },
    2031: { penMult: 1.18, revMult: 1.22, marginAdj: 2, multAdj: -1, sats: '150-170', phase: 'Growth Continuation' },
    2032: { penMult: 1.32, revMult: 1.42, marginAdj: 3, multAdj: -2, sats: '170-190', phase: 'Market Maturation' },
    2033: { penMult: 1.44, revMult: 1.58, marginAdj: 4, multAdj: -2, sats: '190-210', phase: 'Steady State' },
    2034: { penMult: 1.52, revMult: 1.70, marginAdj: 5, multAdj: -3, sats: '210-230', phase: 'Cash Generation' },
    2035: { penMult: 1.58, revMult: 1.80, marginAdj: 5, multAdj: -3, sats: '230-250', phase: 'Mature Platform' },
  };

  const yc = yearConfigs[targetYear];
  const yearsFromNow = targetYear - 2025;
  const discountRate = 0.15; // 15% required return for pre-revenue space company
  const discountFactor = Math.pow(1 + discountRate, yearsFromNow);

  // ============================================================================
  // 2030 ANCHOR SCENARIOS (Terminal Year Assumptions)
  // All other years scale from these base values
  // ============================================================================
  const scenarios2030 = {
    worst: { pen: 0.30, rev: 0.8, margin: -20, mult: 4, dil: 40, prob: 5 },
    bear:  { pen: 1.00, rev: 2.5, margin: 25, mult: 8, dil: 15, prob: 20 },
    base:  { pen: 2.50, rev: 5.5, margin: 45, mult: 10, dil: 5, prob: 35 },
    mgmt:  { pen: 3.50, rev: 8.0, margin: 52, mult: 12, dil: 0, prob: 25 },
    bull:  { pen: 5.00, rev: 12.0, margin: 58, mult: 14, dil: 0, prob: 12 },
    moon:  { pen: 8.00, rev: 18.0, margin: 62, mult: 16, dil: 0, prob: 3 },
  };

  const scenarioMeta = {
    worst: { name: 'Worst', label: '🔴', color: '#ef4444', desc: 'Catastrophic failure',
      assumptions: ['Satellite constellation fails to achieve coverage targets', 'Technology proves uncompetitive vs terrestrial 5G expansion', 'MNO partners terminate agreements', 'Regulatory barriers block commercial service'],
      catalysts: [],
      risks: ['Complete technology failure requiring write-off', 'Bankruptcy or distressed restructuring', 'Competition from Starlink Direct-to-Cell']
    },
    bear:  { name: 'Bear', label: '🟠', color: '#f97316', desc: 'Delays & competition',
      assumptions: ['Significant launch delays push revenue to 2028+', 'Only 2-3 MNO partners generate meaningful revenue', 'ARPU lower than expected due to pricing pressure', 'Margins compressed by higher operating costs'],
      catalysts: ['Successful Block 2 satellite deployment', 'First commercial revenue milestone'],
      risks: ['Continued execution delays', 'MNO partner churn', 'Dilutive capital raises']
    },
    base:  { name: 'Base', label: '🟡', color: '#eab308', desc: 'Plan execution',
      assumptions: ['Constellation deployment on revised timeline', 'AT&T partnership scales as planned', 'International expansion with 2-3 new MNOs', 'Gradual margin improvement with scale'],
      catalysts: ['Commercial service launch with AT&T', 'New MNO partnership announcements', 'Positive ARPU data from early subscribers'],
      risks: ['Execution delays', 'Competitive pressure on pricing']
    },
    mgmt:  { name: 'Mgmt', label: '🟢', color: '#22c55e', desc: 'Mgmt targets hit',
      assumptions: ['Management guidance achieved on timeline', '5+ MNO partners generating revenue', 'Premium ARPU maintained through differentiation', 'Operating leverage drives margin expansion'],
      catalysts: ['Beat-and-raise earnings reports', 'Expansion into new geographies', 'Government/enterprise contract wins'],
      risks: ['Satellite replacement costs', 'Currency headwinds in emerging markets']
    },
    bull:  { name: 'Bull', label: '🔵', color: '#3b82f6', desc: 'Outperformance',
      assumptions: ['Faster than expected subscriber growth', 'Premium pricing power maintained', 'Minimal competition from alternatives', 'Strong operating leverage drives 50%+ margins'],
      catalysts: ['Accelerated MNO partnership signings', 'Higher than expected ARPU', 'Strategic investment or partnership'],
      risks: ['Execution risk on rapid scaling', 'Regulatory changes']
    },
    moon:  { name: 'Moon', label: '🟣', color: '#8b5cf6', desc: 'Category winner',
      assumptions: ['Dominant market position in satellite-to-phone', 'Global MNO adoption across all major markets', 'Pricing power and 60%+ EBITDA margins', 'Platform expansion beyond voice/text'],
      catalysts: ['Acquisition interest from major telecom/tech', 'Exclusive partnerships with tier-1 carriers', 'New spectrum allocations'],
      risks: ['Antitrust scrutiny', 'Key person risk']
    },
  };

  // ============================================================================
  // VALUATION CALCULATION ENGINE
  // Step-by-step with full audit trail
  // ============================================================================
  const scenarios = useMemo(() => {
    return Object.entries(scenarios2030).map(([key, s2030]) => {
      // STEP 1: Scale metrics from 2030 anchor to target year
      const pen = s2030.pen * yc.penMult;
      const rev = s2030.rev * yc.revMult;
      const subs = 3000 * pen / 100; // 3B addressable base
      
      // STEP 2: Adjust margin for business maturity
      // Early years: higher fixed costs relative to revenue = lower margins
      // Worst case stays negative; others capped at realistic early-stage levels
      let margin = s2030.margin + yc.marginAdj;
      if (key === 'worst') margin = Math.min(margin, -10); // Worst case always negative
      if (key !== 'worst' && targetYear <= 2027) margin = Math.max(margin, -15); // Allow losses in early years
      
      // STEP 3: Adjust valuation multiple for growth stage
      // Early years: higher growth = higher multiple (within reason)
      // Late years: lower growth = lower multiple
      let mult = s2030.mult + yc.multAdj;
      if (targetYear <= 2027) mult = Math.min(mult + 2, 16); // Growth premium cap
      if (targetYear >= 2033) mult = Math.max(mult, 5); // Floor for mature company
      
      // STEP 4: Calculate dilution (primarily early-year phenomenon)
      let dil = s2030.dil;
      if (targetYear <= 2027) dil = Math.min(dil + 10, 60); // More dilution risk early
      if (targetYear >= 2029) dil = Math.max(0, dil - 5); // Less dilution once profitable
      
      // STEP 5: Calculate EBITDA
      const ebitda = rev * (margin / 100);
      
      // STEP 6: Calculate Enterprise Value
      // If EBITDA positive: EV = EBITDA × Multiple
      // If EBITDA negative: Use revenue multiple (2x) as distressed proxy
      const ev = margin > 0 ? ebitda * mult : rev * 2;
      
      // STEP 7: Calculate Equity Value
      // Equity = EV × 1000 (convert to $M) + Net Cash
      const equityValue = ev * 1000 + netCash;
      
      // STEP 8: Calculate diluted shares
      const dilutedShares = currentShares * (1 + dil / 100);
      
      // STEP 9: Calculate target year stock price
      const priceInTargetYear = Math.max(0, equityValue / dilutedShares);
      
      // STEP 10: Discount to present value
      // PV = Future Value / (1 + r)^n
      const presentValue = priceInTargetYear / discountFactor;
      
      // STEP 11: Calculate upside vs current price
      const upside = ((presentValue - currentStockPrice) / currentStockPrice) * 100;
      
      return {
        key,
        ...scenarioMeta[key],
        prob: s2030.prob,
        // Metrics
        pen, rev, subs, margin, mult, dil,
        // Calculated values
        ebitda, ev, equityValue, dilutedShares,
        priceInTargetYear, presentValue, upside,
        // Audit trail
        audit: {
          step1: `Penetration: ${s2030.pen}% × ${yc.penMult} = ${pen.toFixed(2)}%`,
          step2: `Revenue: $${s2030.rev}B × ${yc.revMult} = $${rev.toFixed(2)}B`,
          step3: `Margin: ${s2030.margin}% + (${yc.marginAdj}) = ${margin.toFixed(0)}%`,
          step4: `Multiple: ${s2030.mult}x + (${yc.multAdj}) = ${mult}x`,
          step5: `EBITDA: $${rev.toFixed(2)}B × ${margin.toFixed(0)}% = $${ebitda.toFixed(2)}B`,
          step6: margin > 0 
            ? `EV: $${ebitda.toFixed(2)}B × ${mult}x = $${ev.toFixed(1)}B`
            : `EV: $${rev.toFixed(2)}B × 2x (distressed) = $${ev.toFixed(1)}B`,
          step7: `Equity: $${ev.toFixed(1)}B × 1000 + $${(netCash/1000).toFixed(2)}B = $${(equityValue/1000).toFixed(2)}B`,
          step8: `Shares: ${currentShares}M × (1 + ${dil}%) = ${dilutedShares.toFixed(0)}M`,
          step9: `${targetYear} Price: $${(equityValue/1000).toFixed(2)}B ÷ ${dilutedShares.toFixed(0)}M = $${priceInTargetYear.toFixed(2)}`,
          step10: `PV: $${priceInTargetYear.toFixed(2)} ÷ (1.15)^${yearsFromNow} = $${presentValue.toFixed(2)}`,
        }
      };
    });
  }, [targetYear, currentShares, currentStockPrice, netCash, yc, discountFactor, yearsFromNow]);

  // ============================================================================
  // EXPECTED VALUE CALCULATION
  // Probability-weighted average of present values
  // ============================================================================
  const expectedValue = useMemo(() => {
    const weightedPV = scenarios.reduce((sum, s) => sum + (s.presentValue * s.prob / 100), 0);
    const weightedFuture = scenarios.reduce((sum, s) => sum + (s.priceInTargetYear * s.prob / 100), 0);
    const upside = ((weightedPV - currentStockPrice) / currentStockPrice) * 100;
    
    return {
      presentValue: weightedPV,
      futureValue: weightedFuture,
      upside,
      calculation: scenarios.map(s => `(${s.prob}% × $${s.presentValue.toFixed(0)})`).join(' + ')
    };
  }, [scenarios, currentStockPrice]);

  // Get the currently selected scenario data
  const selected = useMemo(() => {
    return scenarios.find(s => s.key === selectedScenario) || scenarios[2]; // Default to base
  }, [scenarios, selectedScenario]);

  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

  // Generate year-by-year projections for the selected scenario (SAME formulas as scenarios calculation)
  const projections = useMemo(() => {
    const s2030 = scenarios2030[selectedScenario];
    if (!s2030) return [];

    return years.map(year => {
      const yc = yearConfigs[year];
      const yearsFromNow = year - 2025;
      const df = Math.pow(1 + discountRate, yearsFromNow);

      // SAME FORMULAS as scenarios calculation (steps 1-11)
      const pen = s2030.pen * yc.penMult;
      const rev = s2030.rev * yc.revMult;
      const subs = 3000 * pen / 100;

      let margin = s2030.margin + yc.marginAdj;
      if (selectedScenario === 'worst') margin = Math.min(margin, -10);
      if (selectedScenario !== 'worst' && year <= 2027) margin = Math.max(margin, -15);

      let mult = s2030.mult + yc.multAdj;
      if (year <= 2027) mult = Math.min(mult + 2, 16);
      if (year >= 2033) mult = Math.max(mult, 5);

      let dil = s2030.dil;
      if (year <= 2027) dil = Math.min(dil + 10, 60);
      if (year >= 2029) dil = Math.max(0, dil - 5);

      const ebitda = rev * (margin / 100);
      const ev = margin > 0 ? ebitda * mult : rev * 2;
      const equityValue = ev * 1000 + netCash;
      const dilutedShares = currentShares * (1 + dil / 100);
      const priceInYear = Math.max(0, equityValue / dilutedShares);
      const presentValue = priceInYear / df;

      return { year, pen, rev, subs, margin, mult, dil, ebitda, ev, dilutedShares, priceInYear, presentValue };
    });
  }, [selectedScenario, currentShares, netCash]);

  return (
    <>
      <h2 className="section-head">Scenario Simulation</h2>

      <div className="highlight">
        <h3>Multi-Year Projections</h3>
        <p className="text-sm">
          Model stock price under different scenarios based on subscriber growth, satellite deployment, and MNO partnerships.
          Bear case assumes delays and competition. Bull case models category dominance with premium ARPU.
          Probability-weight for expected value.
        </p>
      </div>

      {/* Controls - Target Year and Scenario Selector */}
      <div className="g2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-title">Target Year</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {years.map(y => (
              <button
                key={y}
                onClick={() => setTargetYear(y)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: y === targetYear ? '2px solid var(--mint)' : '1px solid var(--border)',
                  background: y === targetYear ? 'rgba(0,212,170,0.15)' : 'var(--surface2)',
                  color: y === targetYear ? 'var(--mint)' : 'var(--text2)',
                  cursor: 'pointer',
                  fontWeight: y === targetYear ? 700 : 400,
                  fontFamily: 'Space Mono',
                  fontSize: 16,
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Scenario</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {scenarios.map(s => (
              <button
                key={s.key}
                onClick={() => setSelectedScenario(s.key)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: s.key === selectedScenario ? `2px solid ${s.color}` : '1px solid var(--border)',
                  background: s.key === selectedScenario ? `${s.color}22` : 'var(--surface2)',
                  color: s.key === selectedScenario ? s.color : 'var(--text2)',
                  cursor: 'pointer',
                  fontWeight: s.key === selectedScenario ? 700 : 400,
                  fontSize: 14,
                }}
              >
                {s.name} ({s.prob}%)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Scenario Header */}
      <div className="card" style={{ borderLeft: `4px solid ${selected.color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 style={{ color: selected.color, marginBottom: 8 }}>
              {selected.name} Case — {targetYear}
            </h3>
            <p style={{ color: 'var(--text2)', maxWidth: 600 }}>{scenarioMeta[selectedScenario].desc}</p>
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
      <div className="g4" style={{ marginTop: 24 }}>
        <div className="big-stat">
          <div className="num" style={{ color: selected.color }}>${selected.priceInTargetYear.toFixed(0)}</div>
          <div className="lbl">{targetYear} Price</div>
          <div style={{ fontSize: 12, color: selected.upside >= 0 ? 'var(--mint)' : 'var(--coral)', marginTop: 4 }}>
            {selected.upside >= 0 ? '+' : ''}{selected.upside.toFixed(0)}% from ${currentStockPrice}
          </div>
        </div>
        <div className="big-stat">
          <div className="num" style={{ color: 'var(--sky)' }}>${selected.presentValue.toFixed(0)}</div>
          <div className="lbl">PV Today</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
            Discounted @ 15%/yr
          </div>
        </div>
        <div className="big-stat">
          <div className="num">{selected.subs.toFixed(1)}M</div>
          <div className="lbl">Subscribers</div>
          <div style={{ fontSize: 12, color: 'var(--sky)', marginTop: 4 }}>
            {selected.pen.toFixed(2)}% penetration
          </div>
        </div>
        <div className="big-stat">
          <div className="num">${selected.rev.toFixed(2)}B</div>
          <div className="lbl">{targetYear} Revenue</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
            {selected.margin.toFixed(0)}% EBITDA margin
          </div>
        </div>
      </div>

      {/* Financial Projections Table */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title">Financial Projections — {selected.name} Scenario</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Metric</th>
                <th className="r">Today</th>
                {projections.map(p => (
                  <th key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subscribers (M)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.subs.toFixed(1)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Penetration (%)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.pen.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: '1px solid var(--border)' }}>
                <td>Revenue ($B)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.rev.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>EBITDA ($B)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ color: p.ebitda >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.ebitda >= 0 ? '$' : '($'}{Math.abs(p.ebitda).toFixed(2)}{p.ebitda < 0 ? ')' : ''}
                  </td>
                ))}
              </tr>
              <tr>
                <td>EBITDA Margin (%)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ color: p.margin >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.margin.toFixed(0)}%
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: '1px solid var(--border)' }}>
                <td>EV/EBITDA Multiple</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.mult}x
                  </td>
                ))}
              </tr>
              <tr>
                <td>Enterprise Value ($B)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.ev.toFixed(1)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Dilution (%)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ color: 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    +{p.dil.toFixed(0)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td>Diluted Shares (M)</td>
                <td className="r">{currentShares.toFixed(0)}</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.dilutedShares.toFixed(0)}
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: '2px solid var(--border)', fontWeight: 700 }}>
                <td>Stock Price ($)</td>
                <td className="r">${currentStockPrice}</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ color: selected.color, background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.priceInYear.toFixed(0)}
                  </td>
                ))}
              </tr>
              <tr style={{ fontWeight: 600 }}>
                <td>PV Today ($)</td>
                <td className="r">—</td>
                {projections.map(p => (
                  <td key={p.year} className="r" style={{ color: 'var(--sky)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.presentValue.toFixed(0)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* KEY ASSUMPTIONS & CATALYSTS */}
      <div className="g2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="card-title">Key Assumptions</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
            {scenarioMeta[selectedScenario].assumptions.map((a, i) => (
              <li key={i} style={{ marginBottom: 8, lineHeight: 1.5 }}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-title">{scenarioMeta[selectedScenario].catalysts.length > 0 ? 'Catalysts' : 'Key Risks'}</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
            {(scenarioMeta[selectedScenario].catalysts.length > 0 ? scenarioMeta[selectedScenario].catalysts : scenarioMeta[selectedScenario].risks).map((item, i) => (
              <li key={i} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
            ))}
          </ul>
          {scenarioMeta[selectedScenario].catalysts.length > 0 && scenarioMeta[selectedScenario].risks.length > 0 && (
            <>
              <div className="card-title" style={{ marginTop: 16 }}>Risks</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                {scenarioMeta[selectedScenario].risks.map((r, i) => (
                  <li key={i} style={{ marginBottom: 8, lineHeight: 1.5 }}>{r}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Probability-Weighted Expected Value */}
      <div className="highlight" style={{ marginTop: 32 }}>
        <h3>Probability-Weighted Expected Value — {targetYear}</h3>
        <p style={{ marginBottom: 20, color: 'var(--text2)' }}>
          Weighted average across all scenarios based on assigned probabilities
        </p>

        <div className="g4">
          <div className="big-stat">
            <div className="num" style={{ color: 'var(--violet)' }}>${expectedValue.futureValue.toFixed(0)}</div>
            <div className="lbl">Expected {targetYear} Price</div>
          </div>
          <div className="big-stat">
            <div className="num mint">${expectedValue.presentValue.toFixed(0)}</div>
            <div className="lbl">Expected PV Today</div>
          </div>
          <div className="big-stat">
            <div className="num" style={{ color: expectedValue.upside >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
              {expectedValue.upside >= 0 ? '+' : ''}{expectedValue.upside.toFixed(0)}%
            </div>
            <div className="lbl">Expected Upside</div>
          </div>
          <div className="big-stat">
            <div className="num">${currentStockPrice}</div>
            <div className="lbl">Current Price</div>
          </div>
        </div>

        {/* Scenario Breakdown Table */}
        <div style={{ marginTop: 24 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Scenario</th>
                <th className="r">Probability</th>
                <th className="r">{targetYear} Price</th>
                <th className="r">PV Today</th>
                <th className="r">Weighted Contribution</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map(s => {
                const contribution = s.presentValue * (s.prob / 100);
                return (
                  <tr key={s.key} style={{ background: selectedScenario === s.key ? `${s.color}11` : 'transparent' }}>
                    <td>
                      <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: s.color, marginRight: 8 }}></span>
                      {s.name}
                    </td>
                    <td className="r">{s.prob}%</td>
                    <td className="r" style={{ fontFamily: 'Space Mono' }}>${s.priceInTargetYear.toFixed(0)}</td>
                    <td className="r" style={{ fontFamily: 'Space Mono', color: 'var(--sky)' }}>${s.presentValue.toFixed(0)}</td>
                    <td className="r" style={{ fontFamily: 'Space Mono', color: 'var(--mint)' }}>${contribution.toFixed(0)}</td>
                  </tr>
                );
              })}
              <tr style={{ fontWeight: 700, borderTop: '2px solid var(--border)' }}>
                <td>Expected Value</td>
                <td className="r">100%</td>
                <td className="r" style={{ fontFamily: 'Space Mono', color: 'var(--violet)' }}>${expectedValue.futureValue.toFixed(0)}</td>
                <td className="r mint" style={{ fontFamily: 'Space Mono' }}>${expectedValue.presentValue.toFixed(0)}</td>
                <td className="r mint" style={{ fontFamily: 'Space Mono' }}>${expectedValue.presentValue.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ALL SCENARIOS COMPARISON TABLE */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title">All Scenarios — {targetYear} Comparison</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Metric</th>
                {scenarios.map(s => (
                  <th key={s.key} className="r" style={{ color: s.color }}>{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subscribers (M)</td>
                {scenarios.map(s => <td key={s.key} className="r">{s.subs.toFixed(1)}</td>)}
              </tr>
              <tr>
                <td>Revenue ($B)</td>
                {scenarios.map(s => <td key={s.key} className="r">${s.rev.toFixed(2)}</td>)}
              </tr>
              <tr>
                <td>EBITDA ($B)</td>
                {scenarios.map(s => (
                  <td key={s.key} className="r" style={{ color: s.ebitda >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {s.ebitda >= 0 ? '$' : '($'}{Math.abs(s.ebitda).toFixed(2)}{s.ebitda < 0 ? ')' : ''}
                  </td>
                ))}
              </tr>
              <tr>
                <td>EBITDA Margin (%)</td>
                {scenarios.map(s => (
                  <td key={s.key} className="r" style={{ color: s.margin >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {s.margin.toFixed(0)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td>EV/EBITDA Multiple</td>
                {scenarios.map(s => <td key={s.key} className="r">{s.mult}x</td>)}
              </tr>
              <tr style={{ fontWeight: 700 }}>
                <td>{targetYear} Price</td>
                {scenarios.map(s => (
                  <td key={s.key} className="r" style={{ color: s.color }}>
                    ${s.priceInTargetYear.toFixed(0)}
                  </td>
                ))}
              </tr>
              <tr style={{ fontWeight: 600 }}>
                <td>PV Today</td>
                {scenarios.map(s => (
                  <td key={s.key} className="r" style={{ color: 'var(--sky)' }}>
                    ${s.presentValue.toFixed(0)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Return vs Today</td>
                {scenarios.map(s => (
                  <td key={s.key} className="r" style={{ color: s.upside >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {s.upside >= 0 ? '+' : ''}{s.upside.toFixed(0)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="card" style={{ marginTop: 24 }}><div className="card-title">Key Insights</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Operating Leverage</h4>
            <p className="text-slate-300">Once constellation is deployed, incremental subscribers add revenue with minimal marginal cost. EBITDA margins can expand rapidly from negative to 50%+ as fixed satellite costs are spread across growing subscriber base.</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">MNO Partnership Value</h4>
            <p className="text-slate-300">Each major MNO partnership (AT&T, Vodafone, etc.) represents access to hundreds of millions of potential subscribers. The revenue share model means ASTS captures recurring value without customer acquisition costs.</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Dilution Risk</h4>
            <p className="text-slate-300">Pre-revenue companies often require capital raises. Worst/Bear cases model 15-40% dilution. Bull cases assume profitability eliminates dilution need. Watch cash runway and partnership milestones.</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Risk/Reward</h4>
            <p className="text-slate-300">Worst case: {scenarios[0].upside.toFixed(0)}%. Moon case: +{scenarios[5].upside.toFixed(0)}%. Asymmetric upside if technology works and MNO partnerships scale as planned.</p>
          </div>
        </div>
      </div>

      {/* METHODOLOGY & ASSUMPTIONS */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title">Methodology & Assumptions</div>
        <div className="g2">
          <div>
            <h4 style={{ color: 'var(--mint)', marginBottom: 12 }}>Valuation Framework</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
              <li><strong>Revenue Model:</strong> Addressable Subscribers (3B) × Penetration Rate × ARPU = Revenue</li>
              <li><strong>EBITDA:</strong> Revenue × EBITDA Margin (varies by scenario maturity)</li>
              <li><strong>Enterprise Value:</strong> EBITDA × EV/EBITDA Multiple (or Revenue × 2x if distressed)</li>
              <li><strong>Equity Value:</strong> Enterprise Value + Net Cash Position</li>
              <li><strong>Share Price:</strong> Equity Value ÷ Diluted Shares Outstanding</li>
              <li><strong>Present Value:</strong> Future Price ÷ (1 + 15%)^Years (pre-revenue discount rate)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--sky)', marginBottom: 12 }}>Key Model Inputs</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
              <li><strong>Addressable Market:</strong> 3 billion MNO subscribers across partner networks</li>
              <li><strong>Penetration Range:</strong> 0.1% (Worst) to 8.0% (Moon) by {targetYear}</li>
              <li><strong>Revenue Range:</strong> $0.3B (Worst) to $18B (Moon) by {targetYear}</li>
              <li><strong>EBITDA Margins:</strong> -50% (Worst) to 62% (Moon) at scale</li>
              <li><strong>EV/EBITDA Multiples:</strong> 0x (distressed) to 16x (category winner)</li>
              <li><strong>Dilution:</strong> 0-50% depending on capital needs</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 24, padding: 16, background: 'var(--surface2)', borderRadius: 8 }}>
          <h4 style={{ color: 'var(--gold)', marginBottom: 12 }}>Important Caveats</h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text3)', lineHeight: 1.8, fontSize: 13 }}>
            <li>Projections are illustrative scenarios, not forecasts. Actual results may differ materially.</li>
            <li>Probabilities are subjective estimates based on management guidance and competitive analysis.</li>
            <li>Pre-revenue company with unproven technology at commercial scale; high execution risk.</li>
            <li>Satellite constellation economics and MNO revenue share terms are subject to change.</li>
            <li>Competition from Starlink Direct-to-Cell and terrestrial 5G expansion not fully modeled.</li>
            <li>Regulatory approval timelines and spectrum availability vary by jurisdiction.</li>
          </ul>
        </div>
      </div>
      
      <CFANotes title="CFA Level III — Scenario Analysis" items={[
        { term: 'Scenario Framework', def: 'Define discrete future states with specific operational and financial assumptions. Test thesis robustness across outcomes.' },
        { term: 'Revenue Drivers', def: 'Subscribers × ARPU × Revenue Share. Penetration rate is the key variable. 1% of 3.2B = 32M subs.' },
        { term: 'Margin Progression', def: 'Operating leverage as fixed costs spread over growing revenue. Telecom networks typically reach 40-60% EBITDA margins at scale.' },
        { term: 'EV/EBITDA Multiples', def: 'Satellite peers: 8-15x. Growth premium justified for high-growth, asset-light after build-out. Use lower multiples for conservative cases.' },
        { term: 'Present Value Discount', def: '15% discount rate for pre-revenue tech. Higher than mature companies. Reflects execution and technology risk.' },
        { term: 'Probability Weighting', def: 'Assign probabilities to scenarios. Expected Value = Σ(probability × outcome). Bull 20%, Base 50%, Bear 30% is typical.' },
      ]} />
    </>
  );
};

// DCF TAB - Enhanced with implied market cap and share prices
const DCFTab = ({ calc, currentShares, currentStockPrice, cashOnHand, totalDebt, regulatoryRisk, setRegulatoryRisk, techRisk, setTechRisk, competitionRisk, setCompetitionRisk }) => {
  const [discount, setDiscount] = useState(15);
  const [termGrowth, setTermGrowth] = useState(3);
  const [evMultiple, setEvMultiple] = useState(10);
  
  const dcf = useMemo(() => {
    // Revenue projections with CapEx intensity declining as network matures
    const yrs = [
      { y: 2025, r: 0.065, m: -800, c: 1.2 },  // Pre-revenue, heavy CapEx
      { y: 2026, r: 0.5, m: -150, c: 1.0 },    // Early commercial
      { y: 2027, r: 1.8, m: 5, c: 0.5 },       // Ramp, breakeven
      { y: 2028, r: 4.5, m: 30, c: 0.25 },     // Scaling
      { y: 2029, r: 7.5, m: 45, c: 0.15 },     // Mature growth
      { y: 2030, r: 11.5, m: 55, c: 0.1 },     // Near steady-state
    ];
    
    const netCash = cashOnHand - totalDebt; // Dynamic net cash position
    
    // Calculate FCF and PV for each year
    const proj = yrs.map((y, i) => {
      const ebitda = y.r * (y.m / 100);
      const fcf = ebitda - y.r * y.c;
      const pv = fcf / Math.pow(1 + discount / 100, i + 1);
      
      // Calculate implied EV and equity value for each year using EV/Revenue multiple
      // This shows what the stock "should" be worth if it traded at that year's fundamentals
      const impliedEV = y.r * evMultiple; // EV = Revenue × Multiple
      const impliedEquity = impliedEV * 1000 + netCash; // In $M (EV + Net Cash = Equity)
      const impliedMktCap = impliedEquity;
      const impliedPrice = impliedMktCap / currentShares;
      
      // Also calculate forward-looking implied price (discounted to today)
      const pvImpliedPrice = impliedPrice / Math.pow(1 + discount / 100, i + 1);
      
      return { ...y, ebitda, fcf, pv, impliedEV, impliedMktCap, impliedPrice, pvImpliedPrice };
    });
    
    const sumPv = proj.reduce((s, p) => s + p.pv, 0);
    // Guard against discount <= termGrowth (would cause division by zero or negative terminal value)
    const spreadPct = Math.max(discount - termGrowth, 1) / 100; // Minimum 1% spread
    const term = (proj[5].fcf * (1 + termGrowth / 100)) / spreadPct;
    const pvTerm = term / Math.pow(1 + discount / 100, 6);
    const ev = sumPv + pvTerm;
    const risk = (1 - regulatoryRisk/100) * (1 - techRisk/100) * (1 - competitionRisk/100);
    const adj = ev * risk;
    const eq = adj * 1000 + netCash; // Convert EV to $M, add net cash for equity
    const fair = eq / currentShares;
    const up = ((fair - currentStockPrice) / currentStockPrice) * 100;
    
    // Ensure outputs are finite numbers
    const safeValue = (v) => (isFinite(v) ? v : 0);
    return { proj, sumPv: safeValue(sumPv), pvTerm: safeValue(pvTerm), ev: safeValue(ev), adj: safeValue(adj), eq: safeValue(eq), fair: safeValue(fair), up: safeValue(up) };
  }, [discount, termGrowth, evMultiple, regulatoryRisk, techRisk, competitionRisk, currentShares, currentStockPrice, cashOnHand, totalDebt]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">DCF</h2>
      <div className="highlight"><h3>DCF Valuation</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-cyan-400">Method:</strong> 6-year explicit forecast (2025-2030) + terminal value. FCF = EBITDA - CapEx. Terminal = FCF₂₀₃₀ × (1+g) / (r-g).</p>
          <p><strong className="text-cyan-400">Implied Prices:</strong> Shows what stock "should" trade at each year if market values it at {evMultiple}x EV/Revenue. Useful for setting price targets.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card label="Raw EV" value={`$${dcf.ev.toFixed(0)}B`} sub="Before risk adj" color="blue" />
        <Card label="Risk-Adj EV" value={`$${dcf.adj.toFixed(0)}B`} sub={`×${((1-regulatoryRisk/100)*(1-techRisk/100)*(1-competitionRisk/100)*100).toFixed(0)}%`} color="purple" />
        <Card label="Equity Value" value={`$${(dcf.eq/1000).toFixed(1)}B`} sub="EV + Net Cash" color="cyan" />
        <Card label="Fair Value" value={`$${dcf.fair.toFixed(0)}`} sub="Per share" color="green" />
        <Card label="Upside" value={`${dcf.up >= 0 ? '+' : ''}${dcf.up.toFixed(0)}%`} sub="vs $72 current" color={dcf.up >= 0 ? 'green' : 'red'} />
      </div>

      {/* Chart showing revenue and FCF */}
      <div className="card"><div className="card-title">Revenue & FCF Trajectory</div>
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={dcf.proj}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="y" stroke="var(--text3)" />
            <YAxis stroke="var(--text3)" tickFormatter={v => `$${v}B`} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)' }} formatter={(v, name) => [`$${v.toFixed(2)}B`, name]} />
            <Legend />
            <Bar dataKey="r" fill="var(--cyan)" name="Revenue" />
            <Line type="monotone" dataKey="fcf" stroke="var(--mint)" strokeWidth={2} name="FCF" dot={{ fill: '#22c55e' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Main DCF table with implied prices */}
      <div className="card"><div className="card-title">Detailed Projections with Implied Valuations</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-700">
                <th className="text-left py-2">Year</th>
                <th className="text-right">Revenue</th>
                <th className="text-right">EBITDA %</th>
                <th className="text-right">FCF</th>
                <th className="text-right">PV(FCF)</th>
                <th className="text-right px-2 border-l border-slate-600">Implied EV</th>
                <th className="text-right">Implied Mkt Cap</th>
                <th className="text-right">Implied Price</th>
                <th className="text-right">PV Price</th>
              </tr>
            </thead>
            <tbody>
              {dcf.proj.map(p => (
                <tr key={p.y} className="border-t border-slate-800 hover:bg-slate-800/30">
                  <td className="py-2 font-medium">{p.y}</td>
                  <td className="py-2 text-right">${p.r.toFixed(2)}B</td>
                  <td className="py-2 text-right">{p.m}%</td>
                  <td className={`py-2 text-right ${p.fcf >= 0 ? 'text-green-400' : 'text-red-400'}`}>${p.fcf.toFixed(2)}B</td>
                  <td className={`py-2 text-right ${p.pv >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>${p.pv.toFixed(2)}B</td>
                  <td className="py-2 text-right px-2 border-l border-slate-700">${p.impliedEV.toFixed(1)}B</td>
                  <td className="py-2 text-right">${(p.impliedMktCap/1000).toFixed(1)}B</td>
                  <td className="py-2 text-right font-medium text-yellow-400">${p.impliedPrice.toFixed(0)}</td>
                  <td className="py-2 text-right text-slate-400">${p.pvImpliedPrice.toFixed(0)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-600 bg-slate-800/50">
                <td colSpan={4} className="py-2 text-right font-medium">Sum PV(FCF)</td>
                <td className="py-2 text-right font-medium">${dcf.sumPv.toFixed(1)}B</td>
                <td colSpan={4}></td>
              </tr>
              <tr className="bg-slate-800/50">
                <td colSpan={4} className="py-2 text-right font-medium">PV(Terminal Value)</td>
                <td className="py-2 text-right font-medium">${dcf.pvTerm.toFixed(1)}B</td>
                <td colSpan={4}></td>
              </tr>
              <tr className="bg-cyan-900/20">
                <td colSpan={4} className="py-2 text-right font-bold">Enterprise Value</td>
                <td className="py-2 text-right font-bold text-cyan-400">${dcf.ev.toFixed(1)}B</td>
                <td colSpan={4}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          <strong>Implied Price</strong> = If stock traded at {evMultiple}x EV/Revenue in that year. <strong>PV Price</strong> = Discounted to today at {discount}% rate.
        </div>
      </div>

      {/* Implied price trajectory chart */}
      <div className="card"><div className="card-title">Implied Share Price Trajectory</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={dcf.proj}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="y" stroke="var(--text3)" />
            <YAxis stroke="var(--text3)" tickFormatter={v => `$${v}`} domain={[0, 'auto']} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)' }} formatter={(v) => [`$${v.toFixed(0)}`, '']} />
            <Legend />
            <Bar dataKey="impliedPrice" fill="#eab308" name={`Implied @ ${evMultiple}x Rev`} />
            <Line type="monotone" dataKey="pvImpliedPrice" stroke="var(--violet)" strokeWidth={2} name="PV to Today" dot={{ fill: '#8b5cf6' }} />
            <ReferenceLine y={currentStockPrice} stroke="#fff" strokeDasharray="5 5" label={{ value: `Current $${currentStockPrice}`, fill: '#fff', fontSize: 10 }} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-2 text-xs text-slate-500">
          Yellow bars show what price would be if valued at {evMultiple}x revenue in each year. Purple line shows those prices discounted back to today.
        </div>
      </div>

      {/* Parameters */}
      <div className="g3">
        <div className="card"><div className="card-title">DCF Parameters</div>
          <div className="g2">
            <Input label="Discount Rate (%)" value={discount} onChange={setDiscount} step={0.5} />
            <Input label="Terminal Growth (%)" value={termGrowth} onChange={setTermGrowth} step={0.5} />
          </div>
        </div>
        <div className="card"><div className="card-title">Valuation Multiple</div>
          <Input label="EV/Revenue Multiple (x)" value={evMultiple} onChange={setEvMultiple} step={0.5} />
          <div className="mt-2 text-xs text-slate-500">Used for implied price calculation. Starlink ~17x, growth SaaS 8-15x, telcos 1-3x.</div>
        </div>
        <div className="card"><div className="card-title">Risk Adjustments</div>
          <div className="g3">
            <Input label="Regulatory %" value={regulatoryRisk} onChange={setRegulatoryRisk} />
            <Input label="Tech %" value={techRisk} onChange={setTechRisk} />
            <Input label="Competition %" value={competitionRisk} onChange={setCompetitionRisk} />
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Combined success probability: {((1 - regulatoryRisk/100) * (1 - techRisk/100) * (1 - competitionRisk/100) * 100).toFixed(0)}%
          </div>
        </div>
      </div>
      
      <CFANotes title="CFA Level III — DCF Valuation" items={[
        { term: 'DCF Framework', def: 'Sum of discounted future free cash flows + terminal value. Most rigorous intrinsic value method. Highly sensitive to assumptions.' },
        { term: 'Revenue Build-Up', def: 'Project from operational metrics: sats deployed → coverage → subscribers → revenue. More credible than top-down guesses.' },
        { term: 'EBITDA Margins', def: 'Early years negative (pre-revenue), ramping to 40-60% at scale. Satellite networks have high operating leverage after build-out.' },
        { term: 'Free Cash Flow', def: 'EBITDA - CapEx - Working Capital changes. Negative during build phase, turning positive as CapEx intensity declines.' },
        { term: 'Terminal Value', def: 'Value beyond explicit forecast. Gordon Growth: FCF₅(1+g)/(r-g). Often 50-70% of total DCF value.' },
        { term: 'Risk Adjustments', def: 'Apply success probabilities: regulatory × technical × competitive. 77% combined = 23% failure probability haircut.' },
      ]} />
    </div>
  );
};

// MONTE CARLO - Mathematically correct with detailed explanations
const MonteCarloTab = ({ currentShares, currentStockPrice, totalDebt, cashOnHand }) => {
  const [sims, setSims] = useState(2000);
  const [years, setYears] = useState(5);
  const [runKey, setRunKey] = useState(0);
  const [baseRev, setBaseRev] = useState(5.5);
  const [revVol, setRevVol] = useState(35);
  const [margin, setMargin] = useState(45);
  const [mult, setMult] = useState(10);
  const [launchRisk, setLaunchRisk] = useState(15);
  const [regRisk, setRegRisk] = useState(10);
  const [discountRate, setDiscountRate] = useState(15);
  const [activePreset, setActivePreset] = useState('base');

  // ============================================================================
  // HORIZON-ADJUSTED PRESETS
  // Revenue scales with time: 3Y = early ramp, 5Y = anchor (2030), 7Y = mature
  // Margins lower in early years (pre-scale), risks higher in early years
  // Based on: Analyst consensus ($254M 2026, $882M 2027, $1B+ 2028, $5-8B 2030)
  // ============================================================================
  const horizonConfig = {
    3: { revMult: 0.33, marginAdj: -15, riskAdj: 10, multAdj: -1, volAdj: 10, label: '2028' },
    5: { revMult: 1.00, marginAdj: 0, riskAdj: 0, multAdj: 0, volAdj: 0, label: '2030' },
    7: { revMult: 1.50, marginAdj: 5, riskAdj: -5, multAdj: 1, volAdj: -5, label: '2032' },
  };
  const hc = horizonConfig[years] || horizonConfig[5];

  // 2030 ANCHOR VALUES (5-year horizon = base case)
  const anchor = {
    bear:  { baseRev: 2.5, margin: 25, mult: 8, revVol: 45, launchRisk: 25, regRisk: 20 },
    base:  { baseRev: 5.5, margin: 45, mult: 10, revVol: 35, launchRisk: 15, regRisk: 10 },
    mgmt:  { baseRev: 8.0, margin: 52, mult: 12, revVol: 30, launchRisk: 10, regRisk: 8 },
    bull:  { baseRev: 12.0, margin: 58, mult: 14, revVol: 25, launchRisk: 8, regRisk: 5 },
  };

  // Scale anchor values based on horizon
  const scalePreset = (a) => ({
    baseRev: Math.round(a.baseRev * hc.revMult * 10) / 10,
    margin: Math.max(-15, Math.min(65, a.margin + hc.marginAdj)),
    mult: Math.max(4, Math.min(18, a.mult + hc.multAdj)),
    revVol: Math.max(20, Math.min(60, a.revVol + hc.volAdj)),
    launchRisk: Math.max(3, Math.min(40, a.launchRisk + hc.riskAdj)),
    regRisk: Math.max(2, Math.min(30, a.regRisk + hc.riskAdj)),
  });

  const presets = {
    bear: { 
      ...scalePreset(anchor.bear),
      label: '🐻 Bear', color: 'bg-orange-600',
      desc: `Major delays, 1% penetration. ${hc.label}: $${scalePreset(anchor.bear).baseRev}B revenue.`
    },
    base: { 
      ...scalePreset(anchor.base),
      label: '📊 Base', color: 'bg-yellow-600',
      desc: `Plan execution, 2.5% penetration. ${hc.label}: $${scalePreset(anchor.base).baseRev}B revenue.`
    },
    mgmt: { 
      ...scalePreset(anchor.mgmt),
      label: '🎯 Mgmt', color: 'bg-purple-600',
      desc: `Management targets, 3.5% penetration. ${hc.label}: $${scalePreset(anchor.mgmt).baseRev}B revenue.`
    },
    bull: { 
      ...scalePreset(anchor.bull),
      label: '🐂 Bull', color: 'bg-blue-600',
      desc: `Outperformance, 5% penetration. ${hc.label}: $${scalePreset(anchor.bull).baseRev}B revenue.`
    },
    custom: { 
      baseRev: baseRev, margin: margin, mult: mult, revVol: revVol, launchRisk: launchRisk, regRisk: regRisk, 
      label: '⚙️ Custom', color: 'bg-slate-600',
      desc: 'Your custom parameters. Adjust inputs below to model specific assumptions.'
    },
  };

  const loadPreset = (key) => {
    if (key === 'custom') {
      setActivePreset('custom');
      return;
    }
    const p = presets[key];
    setBaseRev(p.baseRev);
    setMargin(p.margin);
    setMult(p.mult);
    setRevVol(p.revVol);
    setLaunchRisk(p.launchRisk);
    setRegRisk(p.regRisk);
    setActivePreset(key);
    setRunKey(k => k + 1);
  };

  // Auto-reload preset when horizon changes (unless on Custom)
  React.useEffect(() => {
    if (activePreset !== 'custom') {
      const p = presets[activePreset];
      setBaseRev(p.baseRev);
      setMargin(p.margin);
      setMult(p.mult);
      setRevVol(p.revVol);
      setLaunchRisk(p.launchRisk);
      setRegRisk(p.regRisk);
      setRunKey(k => k + 1);
    }
  }, [years]);

  // Wrapper functions to auto-switch to Custom when user manually adjusts parameters
  const updateParam = (setter) => (value) => {
    setter(value);
    if (activePreset !== 'custom') setActivePreset('custom');
  };

  const sim = useMemo(() => {
    const n = Math.min(sims, 10000);
    const netCash = cashOnHand - totalDebt; // Net cash position
    
    // Box-Muller transform for standard normal distribution
    // Returns Z ~ N(0,1)
    const randn = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    
    const fairValues = [];
    const revenueOutcomes = [];
    
    for (let i = 0; i < n; i++) {
      // STEP 1: Apply binary risk events (Bernoulli trials)
      // These are discrete "jump" risks that either happen or don't
      let revenueMultiplier = 1.0;
      
      // Launch risk: Major constellation failure (e.g., multiple launch failures, satellite malfunctions)
      // If triggered, assume 40% of expected revenue is lost
      if (Math.random() < launchRisk / 100) {
        revenueMultiplier *= 0.6;
      }
      
      // Regulatory risk: FCC delays, spectrum issues, international approval problems
      // If triggered, assume 30% revenue impact from delayed/limited service
      if (Math.random() < regRisk / 100) {
        revenueMultiplier *= 0.7;
      }
      
      // STEP 2: Apply log-normal distribution for revenue uncertainty
      // Log-normal ensures: (a) revenue stays positive, (b) realistic right-skew
      // X = exp(μ + σZ) where Z ~ N(0,1)
      // To ensure E[X] = baseRev, we set μ = ln(baseRev) - σ²/2
      const sigma = revVol / 100;
      const mu = -0.5 * sigma * sigma; // Adjustment so E[exp(μ + σZ)] = 1
      const logNormalFactor = Math.exp(mu + sigma * randn());
      
      // Final revenue outcome
      const revenue = baseRev * revenueMultiplier * logNormalFactor;
      revenueOutcomes.push(revenue);
      
      // STEP 3: Calculate EBITDA with operating deleverage
      // In bad scenarios, fixed costs hurt margins more (operating leverage works against you)
      let marginAdjustment = 0;
      if (revenue < 2) marginAdjustment = -15; // Severe underperformance
      else if (revenue < 4) marginAdjustment = -5; // Modest underperformance
      
      const effectiveMargin = Math.max(0, margin + marginAdjustment);
      const ebitda = revenue * (effectiveMargin / 100);
      
      // STEP 4: Calculate EV with multiple compression
      // Distressed companies trade at lower multiples
      let multipleAdjustment = 0;
      if (revenue < 2) multipleAdjustment = -4;
      else if (revenue < 4) multipleAdjustment = -2;
      
      const effectiveMultiple = Math.max(4, mult + multipleAdjustment);
      const enterpriseValue = ebitda * effectiveMultiple; // In $B
      
      // STEP 5: Convert to equity value
      // Equity = EV - Net Debt (or + Net Cash)
      const equityValue = enterpriseValue * 1000 + netCash; // Convert to $M
      
      // STEP 6: Discount to present value
      // This is a forward-looking model, so we discount the terminal value
      const presentValue = equityValue / Math.pow(1 + discountRate / 100, years);
      
      // STEP 7: Calculate fair value per share
      const fairValue = Math.max(0, presentValue / currentShares);
      fairValues.push(fairValue);
    }
    
    // STATISTICS
    const sorted = [...fairValues].sort((a, b) => a - b);
    const percentile = (p) => sorted[Math.floor(n * p)];
    const mean = fairValues.reduce((a, b) => a + b, 0) / n;
    
    // Win probability: % of simulations where fair value > current price
    const winProbability = (fairValues.filter(v => v > currentStockPrice).length / n) * 100;
    
    // Value at Risk (VaR): The 5th percentile loss
    const var5 = ((percentile(0.05) - currentStockPrice) / currentStockPrice) * 100;
    
    // Conditional VaR (CVaR/Expected Shortfall): Average loss in worst 5%
    const tail5 = sorted.slice(0, Math.floor(n * 0.05));
    const cvar5 = tail5.length > 0 
      ? ((tail5.reduce((a, b) => a + b, 0) / tail5.length - currentStockPrice) / currentStockPrice) * 100 
      : var5;
    
    // Annualized returns for Sharpe/Sortino
    const riskFreeRate = 0.04; // 4% annual
    const returns = fairValues.map(fv => {
      const totalReturn = fv / currentStockPrice;
      return Math.pow(totalReturn, 1 / years) - 1; // Annualized return
    });
    const avgReturn = returns.reduce((a, b) => a + b, 0) / n;
    const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / (n - 1);
    const stdDev = Math.sqrt(variance);
    
    // Sharpe Ratio: (Return - RiskFree) / StdDev
    const sharpe = stdDev > 0 ? (avgReturn - riskFreeRate) / stdDev : 0;
    
    // Sortino Ratio: Uses only downside deviation
    const negativeReturns = returns.filter(r => r < riskFreeRate);
    const downsideVariance = negativeReturns.length > 0 
      ? negativeReturns.reduce((a, b) => a + Math.pow(b - riskFreeRate, 2), 0) / negativeReturns.length 
      : 0;
    const downsideDev = Math.sqrt(downsideVariance);
    const sortino = downsideDev > 0 ? (avgReturn - riskFreeRate) / downsideDev : 0;
    
    // Histogram for visualization
    const min = sorted[0], max = sorted[n - 1];
    const buckets = 20;
    const bucketSize = (max - min) / buckets;
    const histogram = Array.from({ length: buckets }, (_, i) => {
      const start = min + i * bucketSize;
      const end = start + bucketSize;
      const count = fairValues.filter(f => f >= start && f < end).length;
      return { price: start + bucketSize / 2, pct: (count / n) * 100 };
    });
    
    // Revenue statistics for sanity check
    const sortedRev = [...revenueOutcomes].sort((a, b) => a - b);
    const revStats = {
      p5: sortedRev[Math.floor(n * 0.05)],
      p50: sortedRev[Math.floor(n * 0.50)],
      p95: sortedRev[Math.floor(n * 0.95)],
      mean: revenueOutcomes.reduce((a, b) => a + b, 0) / n
    };
    
    return {
      p5: percentile(0.05), p10: percentile(0.10), p25: percentile(0.25),
      p50: percentile(0.50), p75: percentile(0.75), p90: percentile(0.90), p95: percentile(0.95),
      mean, winProbability, var5, cvar5, sharpe, sortino, histogram, revStats, n
    };
  }, [sims, years, baseRev, revVol, margin, mult, launchRisk, regRisk, discountRate, currentShares, currentStockPrice, totalDebt, cashOnHand, runKey]);

  // Parameter definitions for the guide
  const parameterGuide = [
    { param: 'Base Rev ($B)', value: baseRev, desc: 'Expected 2030 revenue from DCF/Scenarios base case. This is the "center" of the simulation. Source: Management guidance, analyst estimates, or DCF model.' },
    { param: 'Rev Volatility (%)', value: revVol, desc: 'Standard deviation of log-normal distribution. 35% means ~68% of outcomes fall between 0.7x and 1.4x base revenue. Higher = wider range of outcomes.' },
    { param: 'EBITDA Margin (%)', value: margin, desc: 'Terminal EBITDA margin at scale. Satellite/telecom typically 40-60%. Compressed in bad scenarios due to operating leverage (fixed costs hurt when revenue is low).' },
    { param: 'EV/EBITDA Multiple', value: mult, desc: 'Valuation multiple applied to terminal EBITDA. Growth companies: 10-15x, mature telcos: 6-8x. Compressed in distressed scenarios.' },
    { param: 'Launch Risk (%)', value: launchRisk, desc: 'Probability of major constellation failure (multiple launch failures, satellite malfunctions). If triggered, reduces revenue by 40%. Historical LEO failure ~7%, but cumulative risk across many launches is higher.' },
    { param: 'Regulatory Risk (%)', value: regRisk, desc: 'Probability of significant regulatory setback (FCC denial, spectrum issues, international delays). If triggered, reduces revenue by 30%.' },
    { param: 'Discount Rate (%)', value: discountRate, desc: 'Rate used to discount future equity value to today. Should match your required return for this risk level. Pre-revenue space: 12-18% typical.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Monte Carlo</h2>
      
      {/* Highlight Box */}
      <div className="highlight">
        <h3>Revenue-Based Valuation Simulation</h3>
        <p className="text-sm">
          Runs {sim.n.toLocaleString()} simulations over {years} years with binary risk events (launch failure, regulatory) 
          and log-normal revenue distribution. Terminal value discounted to present.
        </p>
      </div>

      {/* Scenario Presets */}
      <div className="card"><div className="card-title">Select Scenario</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {Object.entries(presets).map(([key, p]) => (
            <button
              key={key}
              onClick={() => loadPreset(key)}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                textAlign: 'left',
                border: `1px solid ${activePreset === key ? 'var(--cyan)' : 'var(--border)'}`,
                background: activePreset === key ? 'var(--cyan)' : 'var(--surface2)',
                color: activePreset === key ? 'var(--bg)' : 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{p.desc}</div>
            </button>
          ))}
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
                onClick={() => setYears(yr)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: years === yr ? '2px solid var(--cyan)' : '1px solid var(--border)',
                  background: years === yr ? 'rgba(34,211,238,0.15)' : 'var(--surface2)',
                  color: years === yr ? 'var(--cyan)' : 'var(--text2)',
                  cursor: 'pointer',
                  fontWeight: years === yr ? 700 : 400,
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
                onClick={() => setSims(simCount)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: sims === simCount ? '2px solid var(--cyan)' : '1px solid var(--border)',
                  background: sims === simCount ? 'rgba(34,211,238,0.15)' : 'var(--surface2)',
                  color: sims === simCount ? 'var(--cyan)' : 'var(--text2)',
                  cursor: 'pointer',
                  fontWeight: sims === simCount ? 700 : 400,
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

      {/* Parameters Card */}
      <div className="card"><div className="card-title">Parameters {activePreset === 'custom' ? '(Custom)' : `(${presets[activePreset].label})`}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <Input label="Base Rev ($B)" value={baseRev} onChange={updateParam(setBaseRev)} step={0.5} />
          <Input label="Rev Vol (%)" value={revVol} onChange={updateParam(setRevVol)} />
          <Input label="EBITDA %" value={margin} onChange={updateParam(setMargin)} />
          <Input label="EV/EBITDA" value={mult} onChange={updateParam(setMult)} step={0.5} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }}>
          <Input label="Launch Risk %" value={launchRisk} onChange={updateParam(setLaunchRisk)} />
          <Input label="Regulatory Risk %" value={regRisk} onChange={updateParam(setRegRisk)} />
          <Input label="Discount Rate %" value={discountRate} onChange={setDiscountRate} step={0.5} />
          <div style={{ padding: 8, background: 'var(--surface2)', borderRadius: 6, fontSize: 11, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--text3)' }}>Revenue Check:</span>
            <span><span style={{ color: 'var(--cyan)' }}>${sim.revStats.p5.toFixed(1)}B</span> → <span style={{ color: 'var(--mint)' }}>${sim.revStats.p50.toFixed(1)}B</span> → <span style={{ color: 'var(--sky)' }}>${sim.revStats.p95.toFixed(1)}B</span></span>
          </div>
        </div>
        <button onClick={() => setRunKey(k => k + 1)} style={{
          marginTop: 16, width: '100%', padding: '10px 16px', background: 'var(--cyan)', color: 'var(--bg1)', 
          border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 13
        }}>🎲 Run Simulation</button>
      </div>

      {/* Percentile Cards - Unified 5-card layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        <div style={{ padding: 14, borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#fca5a5', marginBottom: 4 }}>P5 (Bear)</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#f87171' }}>${sim.p5.toFixed(0)}</div>
          <div style={{ fontSize: 11, color: '#fca5a5', marginTop: 4 }}>{((sim.p5 / currentStockPrice - 1) * 100).toFixed(0)}%</div>
        </div>
        <div style={{ padding: 14, borderRadius: 12, background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#fdba74', marginBottom: 4 }}>P25</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#fb923c' }}>${sim.p25.toFixed(0)}</div>
          <div style={{ fontSize: 11, color: '#fdba74', marginTop: 4 }}>{((sim.p25 / currentStockPrice - 1) * 100).toFixed(0)}%</div>
        </div>
        <div style={{ padding: 14, borderRadius: 12, background: 'rgba(34,211,238,0.2)', border: '1px solid rgba(34,211,238,0.4)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#67e8f9', marginBottom: 4 }}>Median</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#22d3ee' }}>${sim.p50.toFixed(0)}</div>
          <div style={{ fontSize: 11, color: '#67e8f9', marginTop: 4 }}>{((sim.p50 / currentStockPrice - 1) * 100).toFixed(0)}%</div>
        </div>
        <div style={{ padding: 14, borderRadius: 12, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#86efac', marginBottom: 4 }}>P75</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#4ade80' }}>${sim.p75.toFixed(0)}</div>
          <div style={{ fontSize: 11, color: '#86efac', marginTop: 4 }}>{((sim.p75 / currentStockPrice - 1) * 100).toFixed(0)}%</div>
        </div>
        <div style={{ padding: 14, borderRadius: 12, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#6ee7b7', marginBottom: 4 }}>P95 (Bull)</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Space Mono', color: '#34d399' }}>${sim.p95.toFixed(0)}</div>
          <div style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4 }}>{((sim.p95 / currentStockPrice - 1) * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* Risk Metrics - Unified 2 rows of 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <Card label="Win Probability" value={`${sim.winProbability.toFixed(0)}%`} sub="> current price" color="blue" />
        <Card label="Expected Value" value={`$${sim.mean.toFixed(0)}`} sub="Mean fair value" color="cyan" />
        <Card label="Sharpe Ratio" value={sim.sharpe.toFixed(2)} sub={sim.sharpe > 1 ? 'Excellent' : sim.sharpe > 0.5 ? 'Good' : 'Moderate'} color={sim.sharpe > 0.5 ? 'green' : 'yellow'} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <Card label="Sortino Ratio" value={sim.sortino.toFixed(2)} sub="Downside-adjusted" color={sim.sortino > 0.7 ? 'green' : 'yellow'} />
        <Card label="VaR (5%)" value={`${sim.var5.toFixed(0)}%`} sub="95% conf floor" color="red" />
        <Card label="CVaR (5%)" value={`${sim.cvar5.toFixed(0)}%`} sub="Exp. tail loss" color="red" />
      </div>

      {/* Distribution Chart */}
      <div className="card"><div className="card-title">Fair Value Distribution</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sim.histogram}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="price" stroke="var(--text3)" tickFormatter={v => `$${v.toFixed(0)}`} />
            <YAxis stroke="var(--text3)" tickFormatter={v => `${v.toFixed(1)}%`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }} 
              formatter={(v) => [`${v.toFixed(2)}%`, 'Probability']}
              labelFormatter={(v) => `$${v.toFixed(0)}`}
            />
            <Bar dataKey="pct" fill="var(--cyan)" radius={[2, 2, 0, 0]} />
            <ReferenceLine x={currentStockPrice} stroke="#fff" strokeDasharray="5 5" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>
          <span>White line = current price (${currentStockPrice})</span>
          <span>Simulations: {sim.n.toLocaleString()}</span>
        </div>
      </div>
      
      <CFANotes title="CFA Level III — Monte Carlo Simulation" items={[
        { term: 'Monte Carlo Method', def: 'Run thousands of random simulations with input volatility. Distribution of outcomes shows probability-weighted fair values.' },
        { term: 'Revenue Volatility', def: 'Standard deviation of revenue growth assumptions. Higher volatility = wider distribution of outcomes.' },
        { term: 'Binary Risk Events', def: 'Launch failure, regulatory rejection. Model as probability of total loss in affected scenarios.' },
        { term: 'Percentile Interpretation', def: 'P5 = 5% chance of being below this. P50 = median. P95 = 5% chance of exceeding.' },
        { term: 'VaR (Value at Risk)', def: 'The loss level that won\'t be exceeded with 95% confidence. Shows downside risk.' },
        { term: 'Expected Value', def: 'Probability-weighted average of all outcomes. Compare to current price for buy/sell signal.' },
      ]} />
    </div>
  );
};

// SEC FILING TRACKER - Shared component for Pivots and Financials tabs
const SECFilingTracker = () => {
  // SEC Filing metadata - update as new filings are processed
  const filingData = {
    // Company identifiers
    cik: '0001780312',
    ticker: 'ASTS',
    exchange: 'NASDAQ',
    
    // Key dates
    firstFiling: 'April 6, 2021',
    firstFilingNote: 'SPAC Close / 8-K',
    latestEvent: 'BB6 Launch',
    latestEventDate: 'Dec 24, 2025',
    
    // Last press release processed (for tracking)
    lastPressRelease: 'December 24, 2025',
    lastPressReleaseTitle: 'BB6 Successful Orbital Launch',
    
    // Latest filings by type
    filings: {
      '10-K': { date: 'March 3, 2025', description: 'FY 2024', color: 'blue' },
      '10-Q': { date: 'Nov 10, 2025', description: 'Q3 2025', color: 'purple' },
      '8-K': { date: 'Dec 24, 2025', description: 'BB6 Launch', color: 'yellow' },
      'S-3': { date: 'Oct 2025', description: 'Shelf Registration', color: 'green' },
      '424B5': { date: 'Oct 2025', description: '$1.15B Converts', color: 'orange' },
      'DEF 14A': { date: '—', description: 'Proxy (Annual)', color: 'cyan' },
    }
  };

  const colorClasses = {
    blue: 'bg-blue-900/20 border-blue-800/30 text-blue-400',
    purple: 'bg-purple-900/20 border-purple-800/30 text-purple-400',
    yellow: 'bg-yellow-900/20 border-yellow-800/30 text-yellow-400',
    green: 'bg-green-900/20 border-green-800/30 text-green-400',
    orange: 'bg-orange-900/20 border-orange-800/30 text-orange-400',
    cyan: 'bg-cyan-900/20 border-cyan-800/30 text-cyan-400',
  };

  return (
    <div className="card"><div className="card-title">📁 SEC Filing Tracker</div>
      <div className="g2">
        <div className="space-y-3">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Filing History</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
              <span className="text-sm text-slate-400">First SEC Filing</span>
              <div className="text-right">
                <span className="text-sm text-cyan-400">{filingData.firstFiling}</span>
                <div className="text-xs text-slate-500">{filingData.firstFilingNote}</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
              <span className="text-sm text-slate-400">Latest Event</span>
              <div className="text-right">
                <span className="text-sm text-yellow-400">{filingData.latestEvent}</span>
                <div className="text-xs text-slate-500">{filingData.latestEventDate}</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-900/30 border border-green-800/50 rounded">
              <span className="text-sm text-slate-400">Last PR Processed</span>
              <div className="text-right">
                <span className="text-sm text-green-400">{filingData.lastPressRelease}</span>
                <div className="text-xs text-slate-500">{filingData.lastPressReleaseTitle}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Latest Filings by Type</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(filingData.filings).map(([type, info]) => (
              <div key={type} className={`p-2 border rounded ${colorClasses[info.color]}`}>
                <div className="font-medium">{type}</div>
                <div className="text-slate-400">{info.date}</div>
                <div className="text-xs text-slate-500">{info.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-500">
        CIK: {filingData.cik} | {filingData.exchange}: {filingData.ticker} | Update dates as new filings are processed
      </div>
    </div>
  );
};

// QUARTERLY METRICS PANEL - Historical data toggle extracted from 10-K filings
const QuarterlyMetricsPanel = () => {
  // Historical quarterly data from 10-K and 10-Q filings (source: SEC EDGAR)
  // All figures in millions USD unless noted
  // Key source documents: 10-K/A 2022, 10-K/A 2021, 10-K 2023, 10-K 2024, 10-Q Q3 2025
  // Note: Some quarterly figures are derived by dividing annual totals or interpolating between periods
  // Share Count Definitions:
  //   sharesOutstanding = Basic Class A shares from 10-Q/10-K
  //   impliedSharesOut = Class A + Class B + Class C (assuming conversion to common)
  //   fullyDiluted = Implied + options, warrants, RSUs, convertible notes
  const quarterlyData = {
    // ========== 2025 ==========
    'Q4 2025': {
      label: 'Q4 2025',
      filing: 'Pending 10-K (PR data only)',
      cashAndEquiv: null, // Pending 10-K
      totalDebt: null, // Pending 10-K
      revenue: null, // Pending 10-K
      opEx: null, // Pending 10-K
      netLoss: null, // Pending 10-K
      sharesOutstanding: null, // Pending 10-K
      impliedSharesOut: null, // Pending 10-K
      fullyDiluted: null, // Pending 10-K
      stockPrice: 71.00, // Current Dec 2025
      satellites: 7, // Per PR Dec 24: BW3 + BB1-5 + BB6
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 6, // AT&T, Vodafone, Verizon, stc, Rakuten, Bell
      mous: 50, // "over 50 MNOs"
      spectrumOwned: 105, // 45 L-band + 60 S-band
      contractedRevenue: 1000, // "$1B+ contracted revenue"
      note: 'BB6 launched Dec 23, 2025 (PR). Financial data pending 10-K filing (~Mar 2026).'
    },
    'Q3 2025': {
      label: 'Q3 2025',
      filing: '10-Q (Nov 10, 2025)',
      cashAndEquiv: 1220.1, // $1,220,123K per balance sheet (SA: 1200, diff ~$20M restricted cash)
      totalDebt: 697.6, // Long-term debt per balance sheet (SA Total Debt: 706.58, diff = current portion + accrued interest)
      revenue: 14.7, // Per 10-Q: $14,739K
      opEx: 94.4, // Per 10-Q: $94,415K total operating expenses
      opExEngineering: 40.8, // Per 10-Q: $40,836K engineering services
      opExGandA: 29.8, // Per 10-Q: $29,822K general & administrative
      opExRandD: 5.5, // Per 10-Q: $5,530K research & development
      opExDandA: 12.7, // Per Q3 Business Update: $12,716K depreciation & amortization
      opExSBC: 14.0, // Per Q3 Business Update: $8.0M eng + $6.0M G&A stock-based comp
      opExCostOfRev: 5.5, // Per Q3 Business Update: $5,511K cost of revenues (gateway)
      adjOpEx: 67.7, // Per Q3 Business Update: Total adj. operating expenses
      adjOpExExTrans: 60.6, // Per Q3 Business Update: Adj OpEx excluding transaction costs
      capEx: 258.9, // Per Q3 Business Update: Property and equipment additions
      grossPPE: 1165.8, // Per Q3 Business Update: Gross property and equipment
      netLoss: -163.8, // Per SeekingAlpha: -163.83M
      sharesOutstanding: 272.0, // 271,981,894 Class A per 10-Q
      impliedSharesOut: 361.4, // Class A 272 + Class B 11.2 + Class C 78.2
      fullyDiluted: 395.0, // Including options, RSUs, remaining converts
      stockPrice: 78.00, // Q3 end ~$78 (per Oct convert pricing)
      satellites: 6, // BW3 + BB1-5 (BB6 not yet launched)
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 6, // AT&T, Vodafone, Verizon, stc, Rakuten, Bell
      mous: 50, // "over 50 MNOs"
      spectrumOwned: 105, // Ligado 45 MHz + EllioSat 60 MHz
      spectrumUS: 80, // Per Q3 Business Update: 80+ MHz in US for satellite and terrestrial
      spectrumGlobalMNO: 1150, // Per Q3 Business Update: 1,150 MHz low- and mid-band tunable MNO spectrum globally
      contractedRevenue: 1000, // "$1B+ contracted revenue"
      note: 'Per 10-Q Nov 10. stc $175M prepay, Verizon definitive. $3.2B pro forma liquidity. H2 rev guidance $50-75M.'
    },
    'Q2 2025': {
      label: 'Q2 2025',
      filing: '10-Q (Aug 11, 2025)',
      cashAndEquiv: 939.4, // Per Q2 Business Update: $939.4M (SA: 923.65, diff ~$16M restricted cash)
      totalDebt: 482.5, // Long-term debt per balance sheet (SA Total Debt: 490.15)
      revenue: 1.2, // Per 10-Q GAAP revenue
      opEx: 74.0, // Per Q2 Business Update: $73,953K total operating expenses
      opExEngineering: 28.6, // Per Q2 Business Update: $28,598K
      opExGandA: 27.2, // Per Q2 Business Update: $27,242K
      opExRandD: 6.4, // Per Q2 Business Update: $6,393K
      opExDandA: 11.7, // Per Q2 Business Update: $11,720K
      opExSBC: 10.5, // Per Q2 Business Update: $3.3M eng + $7.2M G&A
      adjOpEx: 51.7, // Per Q2 Business Update: Total adj. operating expenses
      adjOpExExTrans: 46.5, // Per Q2 Business Update: Adj OpEx excluding L-Band/JV transaction costs
      capEx: 322.8, // Per Q2 Business Update: Property and equipment additions
      grossPPE: 906.9, // Per Q2 Business Update: Gross property and equipment
      accumulatedDA: 145.3, // Per Q2 Business Update: Accumulated depreciation
      netLoss: -135.9, // Per SeekingAlpha: -135.90M
      sharesOutstanding: 245.0, // Estimate pre-Oct conversions
      impliedSharesOut: 334.4, // Class A + B + C
      fullyDiluted: 380.0, // Including converts, options, RSUs
      stockPrice: 55.00, // Q2 2025 end ~$55
      satellites: 6, // BW3 + BB1-5
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 5, // AT&T, Vodafone, Verizon, Rakuten, stc (Q2 announcement)
      mous: 50, // "more than 50 MNOs"
      spectrumOwned: 105, // Ligado 45 MHz + EllioSat 60 MHz closed
      contractedRevenue: 800,
      note: 'Per Q2 Business Update Aug 11, 2025. L-Band court approved. 60 MHz S-Band acquired. Vi India partnership. 8 satellite microns complete. 8 total govt contracts. Pro forma $1.5B+ liquidity.'
    },
    'Q1 2025': {
      label: 'Q1 2025',
      filing: '10-Q (May 12, 2025)',
      cashAndEquiv: 874.5, // Per Q1 Business Update: $874.5M (SA: 873.78, diff ~$0.7M restricted cash)
      totalDebt: 462.2, // Long-term debt per balance sheet (SA Total Debt: 465.90)
      revenue: 0.7, // Per 10-Q GAAP revenue (note: $13.6M was gateway bookings, not recognized revenue)
      opEx: 63.7, // Per Q1 Business Update: $63,681K total operating expenses
      opExEngineering: 27.2, // Per Q1 Business Update: $27,204K
      opExGandA: 18.4, // Per Q1 Business Update: $18,384K
      opExRandD: 7.1, // Per Q1 Business Update: $7,135K
      opExDandA: 11.0, // Per Q1 Business Update: $10,958K
      opExSBC: 7.8, // Per Q1 Business Update: $4.0M eng + $3.8M G&A
      adjOpEx: 44.9, // Per Q1 Business Update: Total adj. operating expenses
      capEx: 124.1, // Per Q1 Business Update: Property and equipment additions
      grossPPE: 584.1, // Per Q1 Business Update: Gross property and equipment
      accumulatedDA: 133.3, // Per Q1 Business Update: Accumulated depreciation
      netLoss: -63.6, // Per SeekingAlpha: -63.63M
      sharesOutstanding: 220.0, // Basic Class A
      impliedSharesOut: 309.4, // Class A + B + C
      fullyDiluted: 350.0, // Including Jan converts if converted
      stockPrice: 25.00, // Q1 2025 end ~$25
      satellites: 6, // BW3 + BB1-5
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 3, // AT&T, Vodafone, Verizon (May 29 definitive)
      mous: 50, // Per Q1 pres: ~50 MNOs
      spectrumOwned: 45, // Ligado definitive signed (court pending)
      contractedRevenue: 650,
      note: 'Per Q1 Business Update May 12, 2025. H2 2025 revenue guidance $50-75M. Gateway bookings $13.6M. DIU contract $20M. FirstNet STA approved. NSF coordination agreement.'
    },
    // ========== 2024 ==========
    'Q4 2024': {
      label: 'Q4 2024',
      filing: '10-K (March 3, 2025)',
      cashAndEquiv: 567.5, // From 10-K balance sheet (SA: 564.99, diff ~$2.5M restricted cash)
      totalDebt: 155.6, // Long-term debt per balance sheet (SA Total Debt: 158.49)
      revenue: 1.9, // Per 10-K GAAP revenue
      opEx: 60.6, // Per Q4 Business Update: $60,642K total operating expenses
      opExEngineering: 30.9, // Per Q4 Business Update: $30,945K
      opExGandA: 15.9, // Per Q4 Business Update: $15,889K
      opExRandD: 5.3, // Per Q4 Business Update: $5,348K
      opExDandA: 8.5, // Per Q4 Business Update: $8,460K
      opExSBC: 11.4, // Per Q4 Business Update: $8.3M eng + $3.1M G&A
      adjOpEx: 40.8, // Per Q4 Business Update: Total adj. operating expenses
      capEx: 86.0, // Per Q4 Business Update: Property and equipment additions
      grossPPE: 460.0, // Per Q4 Business Update: Gross property and equipment
      accumulatedDA: 122.4, // Per Q4 Business Update: Accumulated depreciation
      netLoss: -57.0, // Per SeekingAlpha: -57.02M
      sharesOutstanding: 208.2, // Class A per 10-K
      impliedSharesOut: 255.0, // Class A + B + C
      fullyDiluted: 280.0, // Including 2034 converts, warrants, options
      stockPrice: 22.50, // Dec 31, 2024 ~$22.50
      satellites: 6, // 5 Block 1 + BW3
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 2, // AT&T, Vodafone (Dec definitive)
      mous: 50, // Per Q4 pres: ~50 MNOs
      spectrumOwned: 0, // Ligado announced but not closed
      contractedRevenue: 600,
      note: 'Per Q4 Business Update Mar 4, 2025. Block 1 operational Oct 29. Vodafone definitive Dec 9. $43M SDA contract. ASIC validated (10 GHz, 120 Mbps).'
    },
    'Q3 2024': {
      label: 'Q3 2024',
      filing: '10-Q (Nov 2024)',
      cashAndEquiv: 518.9, // Per Q4 Business Update (SA: 516.39, diff ~$2.5M restricted cash)
      totalDebt: 156.3, // Long-term debt per balance sheet (SA Total Debt: 200.89, diff = Atlas facility as current)
      revenue: 1.1, // Per 10-Q GAAP revenue
      opEx: 66.6, // Per Q4 Business Update: $66,646K
      opExEngineering: 21.8, // Per Q4 Business Update: $21,828K
      opExGandA: 15.6, // Per Q4 Business Update: $15,551K
      opExRandD: 14.7, // Per Q4 Business Update: $14,724K
      opExDandA: 14.5, // Per Q4 Business Update: $14,543K
      opExSBC: 6.8, // Per Q4 Business Update: $3.4M eng + $3.4M G&A
      adjOpEx: 45.3, // Per Q4 Business Update: Total adj. operating expenses
      capEx: 26.5, // Per Q4 Business Update: Property and equipment additions
      grossPPE: 374.0, // Per Q4 Business Update
      accumulatedDA: 113.9, // Per Q4 Business Update
      netLoss: -303.1, // Per SeekingAlpha: -303.08M
      sharesOutstanding: 140.0, // Class A per 10-Q
      impliedSharesOut: 175.0, // Class A + B + C
      fullyDiluted: 245.0, // Including warrants, converts, options
      stockPrice: 38.00, // Post Block 1 launch rally ~$38
      satellites: 6, // Block 1 launched Sept 12
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 2,
      mous: 50, // Per Q4 pres: ~50 MNOs
      spectrumOwned: 0,
      contractedRevenue: 400,
      note: 'Per Q4 Business Update Mar 4, 2025. Block 1 (5 sats) launched Sept 12. Public warrants redeemed Sept 27 ($153.6M cash).'
    },
    'Q2 2024': {
      label: 'Q2 2024',
      filing: '10-Q (Aug 14, 2024)',
      cashAndEquiv: 287.6, // Per 10-Q: $285.1M + $2.5M restricted (SA: 285.08)
      totalDebt: 199.5, // Long-term debt per balance sheet (SA Total Debt: 199.80)
      revenue: 0.9, // Per 10-Q: $0.9M Q2
      opEx: 63.9, // Per 10-Q total operating expenses
      opExEngineering: 11.0, // Per Q2 2024 Business Update: $11.0M (adj basis)
      opExGandA: 4.4, // Per Q2 2024 Business Update: $4.4M (adj basis)
      opExRandD: 19.2, // Per Q2 2024 Business Update: $19.2M (adj basis)
      opExDandA: 20.4, // Per Q2 2024 Business Update: $20.4M depreciation and amortization
      opExSBC: 8.8, // Per Q2 2024 Business Update: $2.0M eng + $6.8M G&A
      adjOpEx: 34.6, // Per Q2 2024 Business Update: $34.6M total adj. operating expenses
      capEx: 21.2, // Per Q2 2024 Business Update: Property and equipment additions
      grossPPE: 347.5, // Per Q2 2024 Business Update: Gross property and equipment
      accumulatedDA: 99.3, // Per Q2 2024 Business Update: Accumulated depreciation
      netLoss: -131.4, // Per SeekingAlpha: -131.35M
      sharesOutstanding: 148.8, // Per 10-Q: 148,751,110 Class A
      impliedSharesOut: 266.7, // Class A + B (39.7M) + C (78.2M)
      fullyDiluted: 320.0, // Including warrants, converts
      stockPrice: 12.00, // Q2 2024 ~$12
      satellites: 1, // BW3 only
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 1, // AT&T definitive May 15
      mous: 44, // 45+ per Aug PR
      spectrumOwned: 0,
      contractedRevenue: 300,
      note: 'Per Q2 2024 Business Update Aug 14. AT&T definitive May 15. Verizon $100M commitment May 29. FCC BB1-5 license Aug 5. ASIC tape-out completed TSMC. 17 Block 2 in production.'
    },
    'Q1 2024': {
      label: 'Q1 2024',
      filing: '10-Q (May 2024)',
      cashAndEquiv: 212.4, // Per Q1 2024 Business Update (SA: 209.97, diff ~$2.4M restricted cash)
      totalDebt: 160.8, // Long-term debt per balance sheet (SA Total Debt: 161.08)
      revenue: 0.5, // Per 10-Q ~$0.5M Q1
      opEx: 56.0, // Per 10-Q total operating expenses
      opExEngineering: 8.9, // Per Q1 2024 Business Update
      opExGandA: 4.3, // Per Q1 2024 Business Update
      opExRandD: 17.9, // Per Q1 2024 Business Update (includes R&D transfer)
      opExDandA: 19.9, // Per Q1 2024 Business Update: $19,945K
      opExSBC: 4.9, // Per Q1 2024 Business Update: $1.6M eng + $3.3M G&A
      adjOpEx: 31.1, // Per Q1 2024 Business Update: Total adj. operating expenses
      capEx: 26.6, // Per Q1 2024 Business Update: Property and equipment additions
      grossPPE: 326.3, // Per Q1 2024 Business Update: Gross property and equipment
      accumulatedDA: 81.1, // Per Q1 2024 Business Update: Accumulated depreciation
      netLoss: -39.8, // Per SeekingAlpha: -39.80M
      sharesOutstanding: 100.0, // Class A per 10-Q
      impliedSharesOut: 218.0, // Class A + B (40M) + C (78M)
      fullyDiluted: 280.0, // Including warrants, converts
      stockPrice: 3.50, // Q1 2024 range $2-5
      satellites: 1,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 40, // Per Jan PR: 40+ MNOs
      spectrumOwned: 0,
      contractedRevenue: 150,
      note: 'Per Q1 2024 Business Update May 15. Cash $212.4M. $100M equity Jan 19 @ $3.10. $110M converts Jan 18 (AT&T/Google/Vodafone). ASIC tape-out Mar 27. AT&T 6-year definitive signed.'
    },
    // ========== 2023 ==========
    'Q4 2023': {
      label: 'Q4 2023',
      filing: '10-K (April 1, 2024)',
      cashAndEquiv: 85.6, // $85.6M cash + $2.5M restricted (SA: 85.62, matches)
      totalDebt: 59.3, // Long-term debt per balance sheet (SA Total Debt: 59.50)
      revenue: 0, // $0 revenue in 2023
      opEx: 60.9, // Per Q4 2023 Business Update: $60,878K total operating expenses
      opExEngineering: 18.5, // Per Q4 2023 Business Update: $18.5M (adj basis)
      opExGandA: 10.8, // Per Q4 2023 Business Update: $10.8M (adj basis)
      opExRandD: 9.3, // Per Q4 2023 Business Update: $9.3M (adj basis)
      opExDandA: 19.6, // Per Q4 2023 Business Update: $19.6M depreciation and amortization
      opExSBC: 2.7, // Per Q4 2023 Business Update: $1.5M eng + $1.2M G&A
      adjOpEx: 38.6, // Per Q4 2023 Business Update: $38.6M total adj. operating expenses
      capEx: 33.9, // Per Q4 2023 Business Update: $33.9M property and equipment
      grossPPE: 299.7, // Per Q4 2023 Business Update: $299.7M gross property and equipment
      accumulatedDA: 61.2, // Per Q4 2023 Business Update: $61.2M accumulated depreciation
      netLoss: -87.5, // Per SeekingAlpha: -87.51M (FY2023 total: -$222.7M)
      sharesOutstanding: 90.2, // Class A per 10-K
      impliedSharesOut: 120.0, // Class A + B + C // Class A Dec 31 2023
      fullyDiluted: 145.0, // Including warrants, options
      stockPrice: 5.80, // Dec 31, 2023 ~$5.80
      satellites: 1, // BW3 only
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 35,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'Per Q4 2023 Business Update Apr 1, 2024. BW3 5G call Sept 19 (14 Mbps). Low cash ($88.1M) triggered Jan 2024 raise. Liquidity: $210.8M estimated Mar 31.'
    },
    'Q3 2023': {
      label: 'Q3 2023',
      filing: '10-Q (Nov 2023)',
      cashAndEquiv: 135.7, // Per Q3 2023 Business Update (SA: 133.31, diff ~$2.4M restricted cash)
      totalDebt: 58.5, // Long-term debt per balance sheet (SA Total Debt: 58.54)
      revenue: 0,
      opEx: 59.0, // Per Q3 2023 Business Update: $58,965K total
      opExEngineering: 18.0, // Per Q3 2023 Business Update: $19.5M GAAP - $1.5M SBC
      opExGandA: 9.9, // Per Q3 2023 Business Update: $11.0M GAAP - $1.1M SBC
      opExRandD: 9.4, // Per Q3 2023 Business Update: $9.4M
      opExDandA: 19.0, // Per Q3 2023 Business Update: $19,029K
      opExSBC: 2.6, // Per Q3 2023 Business Update: $1.5M eng + $1.1M G&A
      adjOpEx: 37.3, // Per Q3 2023 Business Update: Total adj. operating expenses
      capEx: 71.7, // Per Q3 2023 Business Update: Includes launch payment reclassification
      grossPPE: 265.8, // Per Q3 2023 Business Update: Gross property and equipment
      accumulatedDA: 41.6, // Per Q3 2023 Business Update: Accumulated depreciation
      netLoss: -50.8, // Per SeekingAlpha: -50.75M
      sharesOutstanding: 58.0, // Class A per 10-Q
      impliedSharesOut: 186.0, // Class A + B (50M) + C (78M)
      fullyDiluted: 200.0, // Including warrants, options
      stockPrice: 4.00, // Q3 2023 range
      satellites: 1,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 40, // Per Q3 2023 Business Update: 40+ MNOs, 2B+ subscribers
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'Per Q3 2023 Business Update Nov 14. First 5G call Sept 19 (14 Mbps). 85% BB1-5 CapEx paid. 160 Midland employees. 3 shifts running.'
    },
    'Q2 2023': {
      label: 'Q2 2023',
      filing: '10-Q (Aug 2023)',
      cashAndEquiv: 191.5, // Per Q2 2023 Business Update (SA: 190.84, diff ~$0.7M restricted cash)
      totalDebt: 4.6, // Long-term debt per balance sheet (SA Total Debt: 4.63)
      revenue: 0,
      opEx: 58.1, // Per Q2 2023 Business Update: $58,070K total
      opExEngineering: 18.3, // Per Q2 2023 Business Update: $22.8M GAAP - $4.5M SBC
      opExGandA: 9.2, // Per Q2 2023 Business Update: $10.2M GAAP - $1.0M SBC
      opExRandD: 10.9, // Per Q2 2023 Business Update: $10.9M
      opExDandA: 14.1, // Per Q2 2023 Business Update: $14,115K (BW3 depreciation started)
      opExSBC: 5.5, // Per Q2 2023 Business Update: $4.5M eng + $1.0M G&A
      adjOpEx: 38.4, // Per Q2 2023 Business Update: Total adj. operating expenses
      capEx: 12.1, // Per Q2 2023 Business Update: PP&E (excludes launch reclass)
      grossPPE: 194.1, // Per Q2 2023 Business Update: Gross property and equipment
      accumulatedDA: 22.5, // Per Q2 2023 Business Update: Accumulated depreciation
      netLoss: -49.6, // Per SeekingAlpha: -49.59M
      sharesOutstanding: 72.0, // Post June offering
      impliedSharesOut: 200.0, // Class A + B (50M) + C (78M)
      fullyDiluted: 215.0, // Including warrants, options
      stockPrice: 5.50, // Q2 2023 range
      satellites: 1,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 40, // Per Q2 2023 Business Update: 40+ MNOs (~2.4B subscribers)
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'Per Q2 2023 Business Update Aug 14. BW3 4G/10 Mbps June 21. $59.4M offering June 28. FCC SCS update filed July 17.'
    },
    'Q1 2023': {
      label: 'Q1 2023',
      filing: '10-Q (May 2023)',
      cashAndEquiv: 185.7, // Per Q1 2023 Business Update (SA: 185.04, diff ~$0.7M restricted cash)
      totalDebt: 4.7, // Long-term debt per balance sheet (SA Total Debt: 4.70)
      revenue: 0,
      opEx: 44.5, // Per Q1 2023 Business Update: $44,454K total
      opExEngineering: 15.1, // Per Q1 2023 Business Update: $16.5M GAAP - $1.4M SBC
      opExGandA: 8.8, // Per Q1 2023 Business Update: $9.9M GAAP - $1.1M SBC
      opExRandD: 16.4, // Per Q1 2023 Business Update: $16.4M
      opExDandA: 1.7, // Per Q1 2023 Business Update: $1,733K
      opExSBC: 2.5, // Per Q1 2023 Business Update: $1.4M eng + $1.1M G&A
      adjOpEx: 40.3, // Per Q1 2023 Business Update: Total adj. operating expenses
      capEx: 13.0, // Per Q1 2023 Business Update: $12.6M PP&E + $0.4M BW3 CIP
      grossPPE: 167.3, // Per Q2 2023 Business Update footnote (Mar 31 value)
      accumulatedDA: 8.4, // Per Q2 2023 Business Update footnote (Mar 31 value)
      netLoss: -45.2, // Per SeekingAlpha: -45.22M
      sharesOutstanding: 71.9, // Per balance sheet: 71,877,559
      impliedSharesOut: 200.0, // Class A + B (50M) + C (78M)
      fullyDiluted: 215.0, // Including warrants, options
      stockPrice: 5.00, // Q1 2023 range
      satellites: 1,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 35, // Per Q1 2023 Business Update: 35+ MNOs (~2B subscribers)
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'Per Q1 2023 Business Update May 15. First D2C voice call April 25. Technology validated. Production on track for Q1 2024 launch.'
    },
    // ========== 2022 ==========
    'Q4 2022': {
      label: 'Q4 2022',
      filing: '10-K/A (May 1, 2023)',
      cashAndEquiv: 238.6, // From 10-K/A balance sheet (SA: 238.59, matches)
      totalDebt: 5.0, // Long-term debt per balance sheet (SA Total Debt: 5.00)
      revenue: 0, // Nano sold Sept 6
      opEx: 40.0, // Higher Q4 (Block 1 ramp)
      netLoss: -26.6, // Per SeekingAlpha: -26.58M
      sharesOutstanding: 71.9, // 71,877,559 Class A per 10-K (post-offering)
      impliedSharesOut: 200.0, // Class A + Class B (50M) + Class C (78M)
      fullyDiluted: 215.0, // Implied + options/warrants
      stockPrice: 5.50, // Dec 2022 offering @ $5.50
      satellites: 1, // BW3 deployed Nov 14
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 25, // ~1.8B subs per Dec PR
      spectrumOwned: 0,
      contractedRevenue: 0,
      classB: 50.0,
      classC: 78.2,
      note: '$75M raised Dec 2 @ $5.50 (13.6M shares). BW3 deployed Nov 14. NASA Space Act Dec 15.'
    },
    'Q3 2022': {
      label: 'Q3 2022',
      filing: '10-K/A derived',
      cashAndEquiv: 198.9, // Per SeekingAlpha (was estimated 160.0)
      totalDebt: 4.8, // Long-term debt per balance sheet (SA Total Debt: 4.82)
      revenue: 4.6, // Nano final quarter (sold Sept 6)
      opEx: 38.0,
      netLoss: -31.0, // Per SeekingAlpha: -30.95M
      sharesOutstanding: 58.0, // Class A estimate
      impliedSharesOut: 90.0, // Class A + B
      fullyDiluted: 118.0, // Implied + options
      stockPrice: 7.00, // Q3 2022 ~$7 (BW3 launch excitement)
      satellites: 1, // BW3 launched Sept 10
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 23,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'BW3 launched Sept 10. Nano sold Sept 6 for $26.6M (gain $24.5M). Historic quarter.'
    },
    'Q2 2022': {
      label: 'Q2 2022',
      filing: '10-K/A derived',
      cashAndEquiv: 202.4, // Per SeekingAlpha (was estimated 175.0)
      totalDebt: 4.9, // Long-term debt per balance sheet (SA Total Debt: 4.88)
      revenue: 4.6, // Nano quarterly run rate
      opEx: 36.0,
      netLoss: -7.9, // Per SeekingAlpha: -7.88M
      sharesOutstanding: 56.0, // Class A estimate
      impliedSharesOut: 88.0, // Class A + B
      fullyDiluted: 116.0, // Implied + options
      stockPrice: 5.00, // Q2 2022 ~$5.00
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 21,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'Sean Wallace joins as CFO May 10. BW3 final prep. Nano still operating.'
    },
    'Q1 2022': {
      label: 'Q1 2022',
      filing: '10-K/A derived',
      cashAndEquiv: 253.7, // Per SeekingAlpha: 253.73
      totalDebt: 4.9, // Long-term debt per balance sheet (SA Total Debt: 4.94)
      revenue: 4.6, // Nano quarterly
      opEx: 34.0,
      netLoss: -37.9, // Per SeekingAlpha: -37.90M
      sharesOutstanding: 54.0, // Class A estimate
      impliedSharesOut: 86.0, // Class A + B
      fullyDiluted: 114.0, // Implied + options
      stockPrice: 9.00, // Q1 2022 ~$9.00
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 19,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'BW3 manufacturing. Nano revenue ongoing. Block 1 design phase.'
    },
    // ========== 2021 ==========
    'Q4 2021': {
      label: 'Q4 2021',
      filing: '10-K (March 31, 2022)',
      cashAndEquiv: 321.8, // Per SeekingAlpha: 321.79
      totalDebt: 5.0, // Long-term debt per balance sheet (SA Total Debt: 5.00)
      revenue: 3.1, // $12.4M FY (Nano) - Q4 portion
      opEx: 22.9, // FY $91.6M OpEx ÷ 4
      netLoss: -12.8, // Per SeekingAlpha: -12.80M
      sharesOutstanding: 51.8, // 51,782,154 Class A per 10-K cover page
      impliedSharesOut: 103.4, // Class A 51.8 + Class B 51.6
      fullyDiluted: 112.0, // Implied + options
      stockPrice: 11.50, // Q4 2021 ~$11.50
      satellites: 0, // BW3 under construction ($67.6M CIP)
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 20, // "over 20 preliminary agreements" per 10-K
      spectrumOwned: 0,
      contractedRevenue: 0,
      classB: 51.6, // 51,636,922 Class B shares
      classC: 78.2, // 78,163,078 Class C shares
      bw3CIP: 67.6, // BW3 construction in progress $67.6M
      note: 'FY2021: $12.4M rev (Nano), $91.6M OpEx, $73.3M net loss. 386 employees. BW3 $67.6M CIP. 1.8B subs covered by MOUs.'
    },
    'Q3 2021': {
      label: 'Q3 2021',
      filing: '10-K derived',
      cashAndEquiv: 360.4, // Per SeekingAlpha: 360.40
      totalDebt: 5.0, // Long-term debt (Lone Star facility)
      revenue: 3.1, // Nano quarterly (~$12.4M FY ÷ 4)
      opEx: 22.9, // ~$91.6M FY ÷ 4
      netLoss: 16.8, // Per SeekingAlpha: +16.80M (positive due to warrant/other gains)
      sharesOutstanding: 51.8, // Class A
      impliedSharesOut: 103.4, // Class A + B
      fullyDiluted: 112.0, // Implied + options
      stockPrice: 10.00, // Q3 2021 ~$10.00
      satellites: 0, // BW3 under construction
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 18, // Building toward 20+
      spectrumOwned: 0,
      contractedRevenue: 0,
      bw3CIP: 50.0, // BW3 CIP growing
      note: 'BW3 manufacturing. Director comp program established Aug 24. Scaling headcount.'
    },
    'Q2 2021': {
      label: 'Q2 2021',
      filing: '10-K derived',
      cashAndEquiv: 402.6, // Per SeekingAlpha: 402.61
      totalDebt: 5.0, // Long-term debt (Lone Star facility)
      revenue: 3.1, // Nano quarterly (~$12.4M FY ÷ 4)
      opEx: 22.9, // ~$91.6M FY ÷ 4
      netLoss: -65.2, // Per SeekingAlpha: -65.17M
      sharesOutstanding: 51.8, // Class A
      impliedSharesOut: 103.4, // Class A + B
      fullyDiluted: 112.0, // Implied + options
      stockPrice: 10.00, // Q2 2021 ~$10 ($514.7M / 51.8M)
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 15,
      spectrumOwned: 0,
      contractedRevenue: 0,
      bw3CIP: 35.0, // BW3 CIP building
      note: 'First full quarter post-SPAC. $514.7M market value at June 30. Scaling operations.'
    },
    'Q1 2021': {
      label: 'Q1 2021',
      filing: '10-K/A derived',
      cashAndEquiv: 50.1, // Per SeekingAlpha: 50.05 (pre-SPAC close)
      totalDebt: 0.6, // Per SeekingAlpha: 0.6M (SA Total Debt: 600K)
      revenue: 5.8, // Nano quarterly
      opEx: 22.0,
      netLoss: -12.1, // Per SeekingAlpha: -12.09M
      sharesOutstanding: 0, // Private until April 6
      impliedSharesOut: 0, // Private
      fullyDiluted: 0, // Private
      stockPrice: 0, // Private - no public price
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 10,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'SPAC closed April 6, 2021. $462M gross proceeds. Listed NASDAQ: ASTS.'
    },
    // ========== 2020 ==========
    'Q4 2020': {
      label: 'Q4 2020',
      filing: 'Pre-SPAC (private)',
      cashAndEquiv: 42.8, // Per SeekingAlpha: 42.78
      totalDebt: 0, // Pre-Lone Star facility
      revenue: 4.5, // Nano quarterly
      opEx: 12.0,
      netLoss: -8.4, // Per SeekingAlpha: -8.35M
      sharesOutstanding: 0, // Private (AST LLC units)
      impliedSharesOut: 0, // Private
      fullyDiluted: 0, // Private
      stockPrice: 0, // Private - no public price
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 8,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'Strategic agreements signed Dec 15 (Vodafone, Rakuten, American Tower). SPAC announced.'
    },
    // ========== SPAC PRE-MERGER DATA (from SEC Filings) ==========
    // Note: Below entries are NEW PROVIDENCE ACQUISITION CORP financials
    // NPA was the shell SPAC that merged with AST & Science LLC on April 6, 2021
    'Q4 2020 (NPA SPAC)': {
      label: 'Q4 2020 (NPA SPAC)',
      filing: '10-K (Feb 26, 2021) / 10-K/A Amendment',
      // Balance Sheet - Dec 31, 2020 (SPAC shell company)
      cashAndEquiv: null, // TODO: verify with SeekingAlpha
      trustAccount: 232.2, // $232,196,027 in trust for redemptions
      totalDebt: null, // TODO: verify with SeekingAlpha
      revenue: 0, // Shell company - no operations
      opEx: 1.125, // $1,124,693 operating costs
      netLoss: 0.191, // Net INCOME $191,177 (original, pre-restatement)
      netLossRestated: -51.96, // $(51,960,823) after warrant reclass (10-K/A)
      // SPAC Share structure
      sharesOutstanding: 28.75, // 23M Class A + 5.75M Class B
      classAShares: 23.0,
      classBShares: 5.75, // Founder shares
      redemptionShares: 21.67, // 21,672,451 subject to redemption
      redemptionValue: 218.71, // $218,710,925
      impliedSharesOut: 28.75,
      fullyDiluted: 40.25, // + 11.5M warrants
      totalEquity: 5.0, // $5,000,004
      stockPrice: 10.08, // NASDAQ June 30, 2020
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 0,
      spectrumOwned: 0,
      contractedRevenue: 0,
      // SPAC-specific fields
      deferredUnderwriting: 8.05, // $8,050,000 payable on merger close
      ipoProceeds: 230.0, // $230M from IPO
      pipeCommitted: 230.0, // $230M PIPE
      note: 'NPA SPAC: $232M trust. Merger w/ AST signed Dec 15. Restated for warrant liabilities per SEC guidance Apr 2021.'
    },
    'Q4 2019 (NPA SPAC)': {
      label: 'Q4 2019 (NPA SPAC)',
      filing: '10-K (Mar 30, 2020)',
      // Balance Sheet - Dec 31, 2019 (first full quarter post-IPO)
      cashAndEquiv: null, // TODO: verify with SeekingAlpha
      trustAccount: 231.2, // $231,214,831 in trust
      totalDebt: null, // TODO: verify with SeekingAlpha
      revenue: 0,
      opEx: 0.385, // $384,857 operating costs (May 28 - Dec 31, 2019)
      netLoss: 0.656, // Net INCOME $655,679 (interest income)
      // Share structure
      sharesOutstanding: 28.75,
      classAShares: 23.0,
      classBShares: 5.75,
      redemptionShares: 21.75, // 21,746,363
      redemptionValue: 218.52, // $218,519,748
      impliedSharesOut: 28.75,
      fullyDiluted: 40.25,
      totalEquity: 5.0, // $5,000,004
      stockPrice: 9.87, // Dec 31, 2019 close
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 0,
      spectrumOwned: 0,
      contractedRevenue: 0,
      deferredUnderwriting: 8.05,
      ipoDate: '2019-09-11',
      ipoProceeds: 230.0,
      note: 'NPA SPAC first full FY. IPO Sept 11, 2019. Units at $10. Searching for target business.'
    },
    'Q3 2019 (NPA SPAC)': {
      label: 'Q3 2019 (NPA SPAC)',
      filing: '10-K derived (partial)',
      // SPAC incorporated May 28, 2019; IPO Sept 11, 2019
      cashAndEquiv: null, // TODO: verify with SeekingAlpha
      trustAccount: 0,
      totalDebt: null, // TODO: verify with SeekingAlpha
      revenue: 0,
      opEx: 0,
      netLoss: 0,
      sharesOutstanding: 5.75, // Founder shares only pre-IPO
      classBShares: 5.75, // 5,750,000 founder shares @ $25,000 total
      impliedSharesOut: 5.75,
      fullyDiluted: 5.75,
      stockPrice: 0.004, // $25,000 / 5.75M = $0.004/share
      satellites: 0,
      employees: null, // TODO: verify with SeekingAlpha
      definitiveAgreements: 0,
      mous: 0,
      spectrumOwned: 0,
      contractedRevenue: 0,
      note: 'NPA incorporated May 28, 2019. IPO closed Sept 11. Pre-IPO: $25K for 5.75M founder shares.'
    },
  };

  const quarters = Object.keys(quarterlyData);
  
  // State for OpEx breakdown quarter selector
  const [opExQuarter, setOpExQuarter] = useState('Q3 2025');
  
  // Get quarters that have OpEx breakdown data
  const opExQuarters = quarters.filter(q => quarterlyData[q].opExEngineering);
  
  const metrics = [
    { label: 'Cash & Equiv.*', key: 'cashAndEquiv', tooltipKey: 'cashOnly', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, unit: '$M' },
    { label: 'Total Debt*', key: 'totalDebt', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, unit: '$M' },
    { label: 'Revenue', key: 'revenue', format: v => v === null ? '—' : v === 0 ? '$0' : `$${v.toFixed(1)}M`, unit: '$M' },
    { label: 'OpEx', key: 'opEx', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, unit: '$M' },
    { label: 'Net Income', key: 'netLoss', format: v => v === null ? '—' : v >= 0 ? `$${v.toFixed(0)}M` : `-$${Math.abs(v).toFixed(0)}M`, unit: '$M' },
    { label: 'Stock Price', key: 'stockPrice', format: v => v === null ? '—' : v === 0 ? 'Private' : `$${v.toFixed(2)}`, unit: '$' },
    { label: 'Shares (A)', key: 'sharesOutstanding', format: v => v === null ? '—' : v === 0 ? 'Private' : `${v.toFixed(0)}M`, unit: 'M' },
    { label: 'Satellites', key: 'satellites', format: v => v === null ? '—' : v, unit: '' },
    { label: 'Employees*', key: 'employees', format: v => v === null ? '—' : v === 0 ? '—' : v.toLocaleString(), unit: '' },
    { label: 'Agreements', key: 'definitiveAgreements', format: v => v === null ? '—' : v, unit: '' },
    { label: 'MOUs', key: 'mous', format: v => v === null ? '—' : v, unit: '' },
  ];
  
  const getValue = (data, metric) => {
    if (metric.calc) return metric.calc(data);
    return data[metric.key];
  };
  
  // Filter quarters to show (2021-2025, excluding SPAC and pre-2021)
  const displayQuarters = quarters.filter(q => !q.includes('NPA') && !q.includes('2020') && !q.includes('2019'));
  
  // Compute summary stats dynamically from data
  const summaryStats = useMemo(() => {
    const allQuarters = Object.values(quarterlyData);
    const withCash = allQuarters.filter(q => q.cashAndEquiv !== null);
    const withShares = allQuarters.filter(q => q.sharesOutstanding !== null && q.sharesOutstanding > 0);
    const withSatellites = allQuarters.filter(q => q.satellites !== null && q.satellites !== undefined);
    
    // Get first and last valid values (reversed because data is newest-first)
    const firstCash = withCash.length > 0 ? withCash[withCash.length - 1].cashAndEquiv : null;
    const lastCash = withCash.length > 0 ? withCash[0].cashAndEquiv : null;
    const firstShares = withShares.length > 0 ? withShares[withShares.length - 1].sharesOutstanding : null;
    const lastShares = withShares.length > 0 ? withShares[0].sharesOutstanding : null;
    const firstSats = withSatellites.length > 0 ? withSatellites[withSatellites.length - 1].satellites : null;
    const lastSats = withSatellites.length > 0 ? withSatellites[0].satellites : null;
    
    return {
      quarterCount: displayQuarters.length,
      firstQuarter: displayQuarters[displayQuarters.length - 1],
      lastQuarter: displayQuarters[0],
      cashRange: { first: firstCash, last: lastCash },
      sharesRange: { first: firstShares, last: lastShares },
      satellitesRange: { first: firstSats, last: lastSats },
    };
  }, [quarterlyData, displayQuarters]);

  return (
    <div className="card"><div className="card-title">Key Metrics Evolution</div>
      {/* Dynamic Summary Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-900/30 border-cyan-600/40 border text-cyan-400">
          {summaryStats.quarterCount} quarters of data ({summaryStats.firstQuarter} - {summaryStats.lastQuarter})
        </span>
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-green-900/30 border-green-600/40 border text-green-400">
          Cash: {summaryStats.cashRange.first !== null ? `$${summaryStats.cashRange.first.toFixed(0)}M` : 'N/A'} → {summaryStats.cashRange.last !== null ? `$${summaryStats.cashRange.last.toFixed(0)}M` : 'N/A'}
        </span>
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-orange-900/30 border-orange-600/40 border text-orange-400">
          Shares: {summaryStats.sharesRange.first !== null ? `${summaryStats.sharesRange.first.toFixed(0)}M` : 'N/A'} → {summaryStats.sharesRange.last !== null ? `${summaryStats.sharesRange.last.toFixed(0)}M` : 'N/A'}
        </span>
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-900/30 border-purple-600/40 border text-purple-400">
          Satellites: {summaryStats.satellitesRange.first ?? 'N/A'} → {summaryStats.satellitesRange.last ?? 'N/A'}
        </span>
      </div>
      
      {/* All Quarters Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-2 text-slate-400 sticky left-0 bg-slate-900 min-w-[100px]">Metric</th>
              {displayQuarters.map(q => (
                <th key={q} className="text-right py-2 px-2 text-slate-400 min-w-[70px] whitespace-nowrap">
                  {q.replace('Q', '').replace(' ', "'")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(metric => (
              <tr key={metric.label} className="border-t border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-1.5 px-2 text-slate-300 sticky left-0 bg-slate-900 font-medium">
                  {metric.label}
                </td>
                {displayQuarters.map(q => {
                  const data = quarterlyData[q];
                  const val = getValue(data, metric);
                  const tooltip = metric.tooltipKey && data[metric.tooltipKey] !== undefined 
                    ? `Cash only: $${data[metric.tooltipKey].toFixed(1)}M` 
                    : null;
                  return (
                    <td 
                      key={q} 
                      className="py-1.5 px-2 text-right text-slate-300 tabular-nums"
                      title={tooltip}
                    >
                      {metric.format(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footnote */}
      <div className="mt-2 text-xs text-slate-500 space-y-1">
        <p>* Cash & Equiv. includes restricted cash (~$0.7-20M depending on quarter). Other reports might exclude restricted cash, which explains small differences between our values and theirs.</p>
        <p>* Total Debt shows Long-Term Debt only (balance sheet line item). Other sources may report "Total Debt" which includes current portion, accrued interest, and finance leases—explaining differences of $3-45M. Notable: Q3 2024 shows $156M here vs $201M elsewhere because the $48.5M Atlas Credit Facility was classified as current (due within 12 months) and repaid in Q4 2024.</p>
        <p>* Employees estimates from PRs/filings. Data from SEC filings (10-K, 10-Q).</p>
      </div>
      
      {/* Key Notes from Filing - Matching BMNR style */}
      <div className="mt-4">
        <div className="card"><div className="card-title">Latest Quarter Summary (Q3 2025)</div>
        <div className="g2">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Filing Source</div>
            <div className="text-sm text-slate-300">{quarterlyData['Q3 2025'].filing}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Satellites in Orbit</div>
            <div className="text-sm text-slate-300">{quarterlyData['Q3 2025'].satellites} (BW3 + BB1-5)</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">MNO Partnerships</div>
            <div className="text-sm text-slate-300">{quarterlyData['Q3 2025'].definitiveAgreements} definitive, {quarterlyData['Q3 2025'].mous}+ MOUs/LOIs</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Contracted Revenue</div>
            <div className="text-sm text-slate-300">${quarterlyData['Q3 2025'].contractedRevenue}M+ committed</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Spectrum Position</div>
            <div className="text-sm text-slate-300">
              {quarterlyData['Q3 2025'].spectrumOwned} MHz owned | {quarterlyData['Q3 2025'].spectrumUS}+ MHz US
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Headcount</div>
            <div className="text-sm text-slate-300">{quarterlyData['Q3 2025'].employees ? quarterlyData['Q3 2025'].employees.toLocaleString() : '—'} employees</div>
          </div>
        </div>
      </div>
      </div>
      
      <div className="mt-3 text-xs text-slate-500">
        Data sourced from SEC filings (10-K, 10-K/A, 10-Q). Latest filing: Q3 2025 10-Q (Nov 10, 2025).
      </div>
      
      {/* Historical Trend Charts */}
      {/* ROW 1: Cash Position & OpEx */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-cyan-400 mb-3">Cash Position Evolution</h4>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={Object.values(quarterlyData).filter(q => q.cashAndEquiv !== null).reverse()}>
              <defs>
                <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${v.toFixed(0)}M`, 'Cash']} />
              <Area type="monotone" dataKey="cashAndEquiv" stroke="var(--mint)" fill="url(#cashGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-purple-400 mb-3">Quarterly Burn Rate (OpEx)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={Object.values(quarterlyData).filter(q => q.opEx !== null).reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${v.toFixed(0)}M`, 'OpEx']} />
              <Line type="monotone" dataKey="opEx" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
            </LineChart>
          </ResponsiveContainer>
          {/* OpEx Breakdown with quarter selector */}
          {opExQuarters.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">OpEx Breakdown</span>
                <select 
                  value={opExQuarter}
                  onChange={(e) => setOpExQuarter(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded px-2 py-0.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  {opExQuarters.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              {quarterlyData[opExQuarter]?.opExEngineering && (
                <>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engineering:</span>
                      <span className="text-purple-300">${quarterlyData[opExQuarter].opExEngineering}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">G&A:</span>
                      <span className="text-purple-300">${quarterlyData[opExQuarter].opExGandA}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">R&D:</span>
                      <span className="text-purple-300">${quarterlyData[opExQuarter].opExRandD}M</span>
                    </div>
                    {quarterlyData[opExQuarter].opExDandA && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">D&A:</span>
                        <span className="text-purple-300">${quarterlyData[opExQuarter].opExDandA}M</span>
                      </div>
                    )}
                    {quarterlyData[opExQuarter].opExSBC && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Stock-Based Comp:</span>
                        <span className="text-purple-300">${quarterlyData[opExQuarter].opExSBC}M</span>
                      </div>
                    )}
                    {quarterlyData[opExQuarter].opExCostOfRev && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cost of Revenue:</span>
                        <span className="text-purple-300">${quarterlyData[opExQuarter].opExCostOfRev}M</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-700/30 space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Total OpEx (GAAP):</span>
                      <span className="text-purple-400">${quarterlyData[opExQuarter].opEx}M</span>
                    </div>
                    {quarterlyData[opExQuarter].adjOpEx && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Adj. OpEx (ex D&A, SBC):</span>
                        <span className="text-cyan-400">${quarterlyData[opExQuarter].adjOpEx}M</span>
                      </div>
                    )}
                    {(quarterlyData[opExQuarter].capEx || quarterlyData[opExQuarter].capExTotal) && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">CapEx:</span>
                        <span className="text-yellow-400">${quarterlyData[opExQuarter].capEx || quarterlyData[opExQuarter].capExTotal}M</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* ROW 2: Share Count & Market Cap */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-orange-400 mb-3">Share Count (Outstanding / Implied / Fully Diluted)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={Object.values(quarterlyData).reverse().filter(d => d.sharesOutstanding > 0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v, name) => [`${v.toFixed(0)}M`, name === 'sharesOutstanding' ? 'Outstanding (Class A)' : name === 'impliedSharesOut' ? 'Implied (A+B+C)' : 'Fully Diluted']} />
              <Bar dataKey="sharesOutstanding" fill="#ea580c" name="sharesOutstanding" />
              <Bar dataKey="impliedSharesOut" fill="#f97316" name="impliedSharesOut" />
              <Bar dataKey="fullyDiluted" fill="#fdba74" name="fullyDiluted" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-600 rounded"></div><span className="text-slate-400">Outstanding (Class A)</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded"></div><span className="text-slate-400">Implied (A+B+C)</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-300 rounded"></div><span className="text-slate-400">Fully Diluted</span></div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-blue-400 mb-3">Market Cap Evolution ($M)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={Object.values(quarterlyData).reverse().filter(d => d.sharesOutstanding > 0 && d.stockPrice > 0).map(d => ({ ...d, marketCap: d.sharesOutstanding * d.stockPrice, impliedMktCap: d.impliedSharesOut * d.stockPrice }))}>
              <defs>
                <linearGradient id="mcapGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${(v/1000).toFixed(1)}B`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v, name) => [`$${(v/1000).toFixed(2)}B`, name === 'marketCap' ? 'Mkt Cap (Outstanding)' : 'Mkt Cap (Implied)']} />
              <Area type="monotone" dataKey="impliedMktCap" stroke="#60a5fa" fill="none" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="marketCap" stroke="#3b82f6" fill="url(#mcapGradient)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded"></div><span className="text-slate-400">Market Cap (Outstanding)</span></div>
            <div className="flex items-center gap-1"><div className="w-6 h-0.5 bg-blue-400 border-dashed border-t-2"></div><span className="text-slate-400">Market Cap (Implied)</span></div>
          </div>
        </div>
      </div>
      
      {/* ROW 3: Company-Specific (Satellites) */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-cyan-400 mb-3">Satellites Deployed</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={Object.values(quarterlyData).reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} domain={[0, 10]} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} />
              <Bar dataKey="satellites" fill="var(--cyan)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// TIMELINE TAB - Historical log of assumption changes, guidance updates, and company events
const TimelineTab = () => {
  const [secFilter, setSecFilter] = useState('All');
  const [showAllFilings, setShowAllFilings] = useState(false);
  
  // SEC Filings data - update when new filings are processed
  const secFilings = [
    { date: 'Dec 24, 2025', type: '8-K', description: 'BlueBird 6 Launch (First Block 2)', period: '—', color: 'yellow' },
    { date: 'Nov 10, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2025', color: 'purple' },
    { date: 'Aug 7, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q2 2025', color: 'purple' },
    { date: 'May 8, 2025', type: '10-Q', description: 'Quarterly Report', period: 'Q1 2025', color: 'purple' },
    { date: 'Mar 3, 2025', type: '10-K', description: 'Annual Report', period: 'FY 2024', color: 'blue' },
    { date: 'Feb 27, 2025', type: '8-K', description: 'Q4 2024 Earnings Release', period: '—', color: 'yellow' },
    { date: 'Nov 6, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q3 2024', color: 'purple' },
    { date: 'Sep 12, 2024', type: '8-K', description: 'BB1-5 Commercial Launch', period: '—', color: 'yellow' },
    { date: 'Aug 7, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q2 2024', color: 'purple' },
    { date: 'May 10, 2024', type: '10-Q', description: 'Quarterly Report', period: 'Q1 2024', color: 'purple' },
    { date: 'Apr 16, 2024', type: 'S-3', description: '$500M ATM Shelf', period: '—', color: 'green' },
    { date: 'Mar 28, 2024', type: '10-K', description: 'Annual Report', period: 'FY 2023', color: 'blue' },
  ];
  
  const secMeta = {
    cik: '0001780312',
    ticker: 'ASTS',
    exchange: 'NASDAQ',
    lastPR: { date: 'December 24, 2025', title: 'BlueBird 6 Successful Launch' }
  };
  
  const secTypeColors: Record<string, { bg: string; text: string }> = {
    '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
    '10-Q': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
    '8-K': { bg: 'rgba(234,179,8,0.2)', text: 'var(--gold)' },
    'S-1': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
    'S-3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
    '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
  };
  
  const secFilterTypes = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B5'];
  
  const filteredFilings = secFilings.filter(f => {
    if (secFilter === 'All') return true;
    if (secFilter === 'S-1/S-3') return f.type === 'S-1' || f.type === 'S-3';
    return f.type === secFilter;
  });
  
  const displayedFilings = showAllFilings ? filteredFilings : filteredFilings.slice(0, 6);
  const hiddenCount = filteredFilings.length - 6;
  
  // ============================================================================
  // CRITICAL RULE FOR AI ASSISTANTS AND FUTURE EDITORS:
  // ============================================================================
  // NEVER modify or delete historical timeline entries once added!
  // 
  // This is a permanent audit trail. If information becomes outdated or incorrect:
  //   1. DO NOT edit the original entry
  //   2. ADD a new entry with the correction, referencing the old one
  //   3. Use "supersedes" field to link corrections: supersedes: '2025-01-15 entry title'
  //   4. Mark corrected entries with: corrected: true, correctedBy: 'YYYY-MM-DD entry'
  //
  // Example of correction:
  //   Original (DO NOT DELETE): { date: '2025-01-15', title: 'Target 20 sats by Q2', ... }
  //   Correction (ADD NEW):     { date: '2025-03-01', title: 'Target revised to 45 sats', 
  //                               supersedes: '2025-01-15 Target 20 sats by Q2', ... }
  //
  // This preserves the historical record of how guidance/data evolved over time,
  // which is essential for understanding thesis development and management credibility.
  //
  // Data Sources: SEC EDGAR (10-K, 10-Q, 8-K, S-1), Press Releases, Earnings Calls
  // Last comprehensive PR review: December 2025 (PRs from 2020-2025 added)
  // ============================================================================
  
  // Timeline log - chronological record of ACTUAL COMPANY changes (not model creation notes)
  // Categories: GUIDANCE (mgmt projections), DATA (SEC filings, actuals), EVENT (catalysts/news), LAUNCH (orbital launches)
  const timelineEvents = [
    {
      date: '2025-12-24',
      category: 'Product',
      title: 'BlueBird 6 Successful Orbital Launch',
      summary: 'First Block 2 satellite deployed - largest commercial array in LEO',
      details: [
        'Launched Dec 23, 10:25 PM EST from Satish Dhawan Space Centre, India',
        'Nearly 2,400 sq ft phased array (3.5x larger than BB1-5)',
        '10x data capacity of Block 1, up to 120 Mbps peak',
        'First of 45-60 satellites targeted by end 2026',
        'Launch cadence: every 1-2 months average starting now',
        '7 satellites now in orbit total (BW3 + BB1-5 + BB6)',
      ],
      sources: ['Press release Dec 24, 2025', '8-K Dec 2025'],
      prevValue: '6 satellites (BW3 + Block 1)',
      newValue: '7 satellites (+ BB6 Block 2)',
      impact: 'Positive',
    },
    {
      date: '2025-11-25',
      category: 'Product',
      title: 'Manufacturing Expansion: Texas + Florida',
      summary: 'Nearly 500,000 sq ft facilities, 1,800+ employees',
      details: [
        '5 Texas facilities (new Midland site added)',
        'New Homestead, Florida facility added',
        '95% vertically integrated manufacturing',
        '1,800+ employees (100%+ growth in 6 months)',
        '3,800 US patents and patent-pending claims',
        'BB8-25 in various stages of production',
      ],
      sources: ['Press release Nov 25, 2025'],
      prevValue: '~350,000 sq ft, ~1,200 employees',
      newValue: '~500,000 sq ft, 1,800+ employees',
      impact: 'Positive',
    },
    {
      date: '2025-11-21',
      category: 'Guidance',
      title: 'BlueBird 6 Launch Date Announced',
      summary: 'Dec 15 target (later launched Dec 23)',
      details: [
        'Target launch Dec 15 from India (actual: Dec 23)',
        'Kicks off multi-provider launch campaign',
        '5 launches expected by end Q1 2026',
        '40 satellite-equivalent microns on track by early 2026',
        'BB7 shipped to Cape Canaveral',
        '45-60 satellites target by end 2026',
      ],
      sources: ['Press release Nov 21, 2025'],
      prevValue: 'No Block 2 launch date',
      newValue: 'Dec 2025 launch confirmed',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Earnings',
      title: 'Q3 2025 Earnings: $1B+ Contracted Revenue',
      summary: 'Record commercial traction, $3.2B pro forma liquidity',
      details: [
        'Revenue: $14.7M (Q3), $16.6M (YTD)',
        'H2 2025 guidance: $50-75M revenue',
        '$1B+ contracted revenue commitments',
        '$3.2B pro forma cash/liquidity',
        'Class A shares: 272M (361M implied)',
        'stc + Verizon definitive agreements signed',
        'Vodafone SatCo JV for EU constellation announced',
      ],
      sources: ['10-Q Nov 10, 2025', 'Earnings call'],
      prevValue: 'Pre-commercial stage',
      newValue: '$1B+ contracted, $3.2B cash',
      impact: 'Positive',
    },
    {
      date: '2025-08-11',
      category: 'Earnings',
      title: 'Q2 2025 Earnings: $939M Cash, Block 2 Ramp',
      summary: 'L-Band approved, 60 MHz S-Band acquired, pro forma $1.5B+ liquidity',
      details: [
        'Cash: $939.4M as of Jun 30',
        'Revenue: $1.9M (Q2)',
        'OpEx: $74.0M (Q2)',
        'L-Band court approval received',
        '60 MHz S-Band (EllioSat) acquisition closed',
        'Vi India partnership announced',
        '8 satellite microns complete',
        '8 total government contracts',
        'Pro forma liquidity: $1.5B+',
      ],
      sources: ['10-Q Aug 11, 2025', 'Q2 Business Update'],
      prevValue: '$874.5M cash',
      newValue: '$939.4M cash, S-Band acquired',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Earnings',
      title: 'Earnings Call: 8 US Government Contracts',
      summary: 'Broad-based DoD interest, dual-use comms + non-comms applications',
      details: [
        '8 total US government contracts to date (up from 6)',
        'Dual-use: communications AND non-communications applications',
        'Prime contractor award pending (subject to govt reopening)',
        'Revenue recognized on 4 milestones in Q3',
        'Programs of record potential: $100M+ each annually',
        'Golden Dome $25B appropriation positive backdrop',
      ],
      sources: ['Q3 2025 Earnings Call Nov 10, 2025'],
      prevValue: '6 government contracts',
      newValue: '8 contracts, expanding use cases',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Earnings',
      title: 'Earnings Call: 80+ MHz Spectrum in US',
      summary: 'More spectrum than any other D2D provider, plus AI management',
      details: [
        '80+ MHz paired spectrum in US alone',
        '45 MHz L-band + partner low-band spectrum',
        '60 MHz S-band global ITU priority rights',
        'More than any other direct-to-device provider',
        'AI engine in development for spectrum management',
        'AI to "multiply" effective spectrum efficiency',
      ],
      sources: ['Q3 2025 Earnings Call Nov 10, 2025'],
      prevValue: 'Spectrum strategy developing',
      newValue: '80+ MHz US, AI-managed efficiency',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Guidance',
      title: 'Q3 Business Update: 40 Satellite Microns by Early 2026',
      summary: 'Manufacturing capacity to complete 40 satellite-equivalent microns',
      details: [
        'BB8-BB19 in various stages of production',
        'Expect 40 satellites equivalent of microns by early 2026',
        '6 microns completed for first 6 launches',
        'Manufacturing ramping to support 13 planned launches',
        'Multi-provider launch campaign started',
      ],
      sources: ['Q3 2025 Business Update Slide 7'],
      prevValue: '6 satellites worth of microns',
      newValue: '40 satellite-equivalent by early 2026',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Guidance',
      title: 'ASIC 10 GHz First Integration Q1 2026',
      summary: 'Proprietary ASIC with 10 GHz processing bandwidth planned',
      details: [
        'Proprietary ASIC development continuing',
        'Up to 10 GHz of processing bandwidth',
        'First integration planned during Q1 2026',
        'Will dramatically improve satellite capability',
        'Custom silicon for beamforming optimization',
      ],
      sources: ['Q3 2025 Business Update Slide 7'],
      prevValue: 'ASIC in development',
      newValue: '10 GHz ASIC integration Q1 2026',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Guidance',
      title: 'UK Activation Planned Early 2026',
      summary: 'United Kingdom added to early 2026 activation markets',
      details: [
        'UK joins early 2026 activation plans',
        'Other early markets: US, Canada, Japan, Saudi Arabia',
        'Initial nationwide intermittent US service',
        'Global activation outlook expanding',
        'Partnership with Vodafone for UK coverage',
      ],
      sources: ['Q3 2025 Business Update Slide 9'],
      prevValue: 'US, Canada, Japan, Saudi Arabia',
      newValue: 'Added UK to early 2026 activations',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Partnership',
      title: 'New US Government Prime Contractor Award',
      summary: 'Received new contract award as prime contractor, subject to negotiations',
      details: [
        'New contract award with U.S. Government',
        'AST SpaceMobile as prime contractor',
        'Subject to contract negotiations',
        'Continuing to perform against existing contracts',
        'Adds to $63M+ existing government revenue',
        '8 total US government contracts referenced',
      ],
      sources: ['Q3 2025 Business Update Slide 5'],
      prevValue: 'Existing government contracts',
      newValue: 'New prime contractor award (pending)',
      impact: 'Positive',
    },
    {
      date: '2025-11-10',
      category: 'Corporate',
      title: 'Q3 CapEx: $258.9M Property & Equipment',
      summary: 'Significant capital deployment for satellite manufacturing',
      details: [
        'Q3 2025 CapEx: $258.9M',
        'Q2 2025 CapEx: $322.8M',
        'Gross PP&E: $1,165.8M as of Sept 30',
        'Accumulated D&A: $158.0M',
        'Net PP&E: $1,007.8M',
        'Heavy investment in Block 2 production',
      ],
      sources: ['Q3 2025 Business Update Slide 11'],
      prevValue: 'Building satellite infrastructure',
      newValue: '$258.9M Q3 CapEx, $1.17B gross PP&E',
      impact: 'Neutral',
    },
    {
      date: '2025-11-07',
      category: 'Partnership',
      title: 'Vodafone SatCo JV: EU Constellation',
      summary: 'Germany operations center, EU sovereign satellite constellation',
      details: [
        'Luxembourg-HQ joint venture "SatCo"',
        'Germany selected for main Satellite Operations Centre',
        'Planned EU constellation with "command switch" for EU oversight',
        'ITU filing for new mid-band constellation through Germany',
        '21 EU member states MNOs expressed interest',
        'PPDR (emergency services) capability planned',
        'Commercial launch from 2026',
      ],
      sources: ['Press release Nov 7, 2025'],
      prevValue: 'Commercial partnership only',
      newValue: 'JV with EU sovereign constellation',
      impact: 'Positive',
    },
    {
      date: '2025-10-31',
      category: 'Capital',
      title: 'October 2025 Convertible Notes Closed',
      summary: '$1.0B 2% converts due 2036, upsized from $850M',
      details: [
        'Principal: $1.0B (upsized from $850M announced Oct 21)',
        'Coupon: 2.00% semiannual (vs 4.25% on existing)',
        'Maturity: January 15, 2036 (10+ years)',
        'Conversion price: $96.30 (22.5% premium to $78.61 close)',
        'Conversion rate: 10.3845 shares per $1,000',
        'Settlement: Oct 24, 2025',
        'Optional redemption: After Jan 22, 2029 if stock >130% of conversion price',
        'Initial purchasers option: Additional $150M exercised',
        'Net proceeds: ~$981.9M (or ~$1,129.2M with option)',
      ],
      sources: ['Press release Oct 22, 2025', '8-K Oct 2025'],
      prevValue: 'Prior converts at 4.25%',
      newValue: '2% coupon, $96.30 strike, $1.0B+ raised',
      impact: 'Positive',
    },
    {
      date: '2025-10-29',
      category: 'Partnership',
      title: 'stc Group 10-Year Commercial Agreement',
      summary: 'First MENA deal: $175M prepay, Saudi + 15 countries',
      details: [
        '10-year commercial agreement signed',
        '$175M prepayment for future services',
        'Coverage: Saudi Arabia + select Middle East & Africa markets',
        '15-country operating footprint',
        '3 ground gateways to be built in Saudi Arabia',
        'Network Operations Center (NOC) in Riyadh',
        'First regional operator partner for AST SpaceMobile',
        'Commercial service target: Q4 2026',
        'Subject to CST (Saudi) regulatory approval',
        '4G LTE and 5G direct-to-standard-phones',
      ],
      sources: ['Press release Oct 29, 2025'],
      prevValue: 'MOU only',
      newValue: 'Definitive: $175M prepay, 10-year term',
      impact: 'Positive',
    },
    {
      date: '2025-04-16',
      category: 'Regulatory',
      title: 'FCC Approves FirstNet Direct-to-Cell Trials',
      summary: 'AT&T and AST SpaceMobile authorized for Band 14 public safety testing',
      details: [
        'FCC granted permission to test on Band 14 (public safety spectrum)',
        'FirstNet is the nationwide public safety network built by AT&T',
        'Trials to begin later in 2025 with select first responders',
        'Testing via BlueBird satellites in low Earth orbit',
        'Goal: Extend FirstNet reach to rural, remote, disaster-impacted areas',
        'First public safety network with dedicated satellite connectivity',
        'FirstNet already has 180+ SatCOLT deployable assets',
        'Band 14 + direct-to-cell = mission-critical coverage gaps closed',
        'Push-to-talk services previously tested in 2024',
      ],
      sources: ['AT&T Press Release Apr 16, 2025', 'RCR Wireless', 'FirstNet.com'],
      prevValue: 'AT&T commercial only',
      newValue: 'FirstNet public safety trials authorized',
      impact: 'Positive',
    },
    {
      date: '2025-10-22',
      category: 'Capital',
      title: 'Existing Convert Repurchase: $50M at $78.61',
      summary: 'Repurchased $50M of 4.25% notes, issued 2M shares',
      details: [
        'Repurchased: $50M principal of 4.25% 2032 converts',
        'Shares issued: ~2.0M at $78.61/share',
        'Interest savings: ~$13.5M over life',
        'Underlying shares removed: ~1.85M',
        'Net incremental shares: ~0.2M',
        'Remaining 4.25% notes: $50M outstanding',
        'Capped call transactions remain in place',
        'Settlement: Oct 29, 2025',
      ],
      sources: ['Press release Oct 22, 2025'],
      prevValue: '$100M 4.25% converts outstanding',
      newValue: '$50M remaining, $13.5M interest saved',
      impact: 'Positive',
    },
    {
      date: '2025-10-08',
      category: 'Partnership',
      title: 'Verizon Definitive Commercial Agreement',
      summary: 'Full definitive signed, service starting 2026',
      details: [
        'Extends May 2024 $100M strategic commitment',
        'Multi-year commercial agreement',
        'Service to Verizon customers starting 2026',
        'Uses 850 MHz premium low-band spectrum',
        'Target: 100% continental US geographic coverage',
        'Tested: VoLTE calls TX to NJ via satellite',
        'Tested: Video calls and RCS messaging',
        'Standard unmodified smartphones supported',
        'Complements Verizon terrestrial network',
      ],
      sources: ['Press release Oct 8, 2025'],
      prevValue: '$100M commitment (May 2024)',
      newValue: 'Full definitive, 2026 service start',
      impact: 'Positive',
    },
    {
      date: '2025-10-01',
      category: 'Regulatory',
      title: 'Ligado Spectrum Acquisition Closed',
      summary: '$550M L-band spectrum deal finalized',
      details: [
        '40 MHz L-band (1525-1559 MHz) - largest available US spectrum block',
        '5 MHz additional L-band (1670-1675 MHz)',
        '$550M upfront via non-recourse term loan (SPV structure)',
        '$80M/year ongoing payments + revenue sharing',
        '80+ year license terms',
      ],
      sources: ['Ligado 8-K', 'Bankruptcy court filings'],
      prevValue: 'No owned spectrum',
      newValue: '45 MHz L-band acquired',
      impact: 'Positive',
    },
    {
      date: '2025-08-11',
      category: 'Earnings',
      title: 'Earnings Call: Native VoLTE Demonstrated',
      summary: 'First calls directly from phone dialer to space - no apps needed',
      details: [
        'Native VoLTE call demonstrated - first ever from phone dialer',
        'No over-the-top apps required',
        'Direct integration with operator core infrastructure',
        'Full integration to partner network systems',
        'Nationwide intermittent service: US by end 2025',
        'UK, Japan, Canada: Q1 2026',
        'Continuous service: later 2026',
      ],
      sources: ['Q2 2025 Earnings Call Aug 11, 2025'],
      prevValue: 'OTT app-based testing',
      newValue: 'Native dialer integration proven',
      impact: 'Positive',
    },
    {
      date: '2025-08-06',
      category: 'Regulatory',
      title: 'S-Band Spectrum Acquisition Announced',
      summary: '60 MHz global ITU priority rights for $64.5M',
      details: [
        '60 MHz S-band spectrum: 1980-2010 MHz and 2170-2200 MHz',
        'Global ITU priority rights for LEO MSS',
        'Acquisition of entity holding spectrum rights',
        'Total consideration: $64.5M (stock or cash)',
        'Payment: $26M at closing, $38.5M deferred (milestone-based)',
        'Closing expected H2 2025',
        'Complements 3GPP spectrum strategy and L-band',
        'Peak speeds up to 120 Mbps enabled',
        'Country-level regulatory approvals required',
      ],
      sources: ['Press release Aug 6, 2025'],
      prevValue: 'No S-band spectrum',
      newValue: '60 MHz S-band ITU priority',
      impact: 'Positive',
    },
    {
      date: '2025-07-30',
      category: 'Capital',
      title: 'July 2025 Convertible Notes Closed',
      summary: '$575M 4.25% converts with capped call to $120.12',
      details: [
        'Principal: $575M (including $75M option)',
        'Coupon: 4.25%',
        'Maturity: 2032',
        'Initial conversion price: ~$60',
        'Effective conversion price: $120.12 (100% premium via capped call)',
        'Capped call cost: Included in financing',
        'Effective dilution: <1.5% at $120.12',
        'Pro forma cash: >$1.5B as of 6/30/25',
        'ATM facility terminated',
      ],
      sources: ['Press release Jul 29, 2025'],
      prevValue: 'Lower cash position',
      newValue: '$575M raised, $120.12 effective strike',
      impact: 'Positive',
    },
    {
      date: '2025-07-03',
      category: 'Capital',
      title: 'Trinity Capital Equipment Financing',
      summary: '$100M non-dilutive equipment facility',
      details: [
        '$100M equipment financing facility',
        'Led by Trinity Capital Inc.',
        '$25M drawn at closing',
        'Available through 2031',
        'Uses existing/planned equipment as collateral',
        'Non-dilutive, supports manufacturing scale-up',
      ],
      sources: ['Press release Jul 3, 2025'],
      prevValue: 'Limited non-dilutive financing',
      newValue: '$100M equipment facility added',
      impact: 'Positive',
    },
    {
      date: '2025-06-30',
      category: 'Partnership',
      title: 'Vodafone SatCo JV: Luxembourg HQ',
      summary: 'European satellite JV headquartered in Luxembourg',
      details: [
        'SatCo JV headquartered in Luxembourg',
        'European sovereign satellite service',
        '21 EU member states MNOs interested',
        'Commercial launch from 2026',
        'Network of ground stations for backhaul',
        'Supports European digital sovereignty',
      ],
      sources: ['Press release Jun 30, 2025'],
      prevValue: 'Partnership only',
      newValue: 'Luxembourg-HQ JV established',
      impact: 'Positive',
    },
    {
      date: '2025-06-26',
      category: 'Guidance',
      title: 'Fairwinds/DIU Tactical NTN Demo',
      summary: 'First tactical satellite comms demo with DoD',
      details: [
        'World\'s first NTN tactical satellite comms demo',
        'Hawaii field test with USINDOPACOM',
        'TAK (Tactical Assault Kit) over VPN',
        'Secure multi-party video calls',
        'Standard unmodified smartphones',
        'DIU Hybrid Space Architecture 2 initiative',
      ],
      sources: ['Press release Jun 26, 2025'],
      prevValue: 'No tactical demo',
      newValue: 'DoD tactical capability proven',
      impact: 'Positive',
    },
    {
      date: '2025-06-25',
      category: 'Capital',
      title: 'Convert Repurchase: $225M @ $53.22',
      summary: 'Retired half of 4.25% converts, ~$64M interest saved',
      details: [
        'Repurchased: $225M principal of 4.25% converts',
        'Shares issued: 9.45M at $53.22',
        'Interest savings: ~$63.8M',
        'Underlying shares removed: 8.3M',
        'Net incremental: ~1.04M shares',
        'Remaining 4.25% notes: $235M',
      ],
      sources: ['Press release Jun 25, 2025'],
      prevValue: '$460M 4.25% converts outstanding',
      newValue: '$235M remaining, $64M interest saved',
      impact: 'Positive',
    },
    {
      date: '2025-06-18',
      category: 'Partnership',
      title: 'Vodafone Idea (Vi) India Partnership',
      summary: 'Strategic partnership for India market',
      details: [
        'Vi (Vodafone Idea) partnership announced',
        '1.1B+ Indian mobile subscribers market',
        'Complements terrestrial connectivity',
        'Digital India initiative alignment',
        'Voice, video, data, internet access',
        'Consumer, enterprise, IoT applications',
      ],
      sources: ['Press release Jun 18, 2025'],
      prevValue: 'No India partner',
      newValue: 'Vi India partnership (250M reach)',
      impact: 'Positive',
    },
    {
      date: '2025-06-13',
      category: 'Regulatory',
      title: 'Ligado Spectrum Term Sheet Signed',
      summary: '$550M for 45 MHz L-band, Inmarsat support secured',
      details: [
        'Settlement term sheet with Ligado, Inmarsat, Viasat',
        '40 MHz L-band (1525-1559 MHz) + 5 MHz (1670-1675 MHz)',
        '$550M consideration ($535M to Inmarsat)',
        '$550M non-recourse term loan commitment',
        'Inmarsat regulatory support secured',
        '80+ year usage rights',
        'Court approval expected June 2025',
      ],
      sources: ['Press release Jun 13, 2025', '8-K'],
      prevValue: 'RSA signed Jan 2025',
      newValue: 'Term sheet with Inmarsat support',
      impact: 'Positive',
    },
    {
      date: '2025-06-10',
      category: 'Corporate',
      title: 'Russell 1000 Index Inclusion',
      summary: 'Added to large-cap Russell 1000 effective Jun 27',
      details: [
        'Russell 1000 inclusion effective Jun 27, 2025',
        'Top 1,000 US companies by market cap',
        '$10.6 trillion benchmarked to Russell indexes',
        'Increases institutional visibility',
        'Part of 2025 Russell reconstitution',
      ],
      sources: ['Press release Jun 10, 2025'],
      prevValue: 'Russell 2000 (small-cap)',
      newValue: 'Russell 1000 (large-cap)',
      impact: 'Positive',
    },
    {
      date: '2025-05-12',
      category: 'Earnings',
      title: 'Q1 2025 Earnings: H2 Guidance $50-75M',
      summary: '$874.5M cash, 5 launches in 6-9 months',
      details: [
        'Cash: $874.5M as of Mar 31',
        'OpEx: $63.7M (Q1)',
        'H2 2025 revenue guidance: $50-75M',
        '5 contracted launches in 6-9 months',
        '6 sats/month manufacturing target',
        'DIU contract: up to $20M',
        'Gateway bookings: $13.6M Q1, ~$10M/qtr expected',
        'EXIM/IFC: $500M+ non-dilutive pipeline',
      ],
      sources: ['10-Q May 12, 2025', 'Earnings call'],
      prevValue: 'Pre-commercial',
      newValue: '$50-75M H2 guidance, 5 launches planned',
      impact: 'Positive',
    },
    {
      date: '2025-04-28',
      category: 'Guidance',
      title: 'NSF Coordination Agreement',
      summary: 'Astronomy coordination with National Science Foundation',
      details: [
        'Coordination agreement with US NSF',
        'Best practices for satellite/astronomy coexistence',
        'Dark and Quiet Skies measures adopted',
        'Satellite brightness reduction',
        'Real-time positioning data to observatories',
      ],
      sources: ['Press release Apr 28, 2025'],
      prevValue: 'No formal astronomy coordination',
      newValue: 'NSF coordination established',
      impact: 'Positive',
    },
    {
      date: '2025-03-03',
      category: 'Partnership',
      title: 'Vodafone SatCo JV Agreement Signed',
      summary: 'European distribution entity with Vodafone',
      details: [
        'JV to serve all European markets',
        '100% geographic coverage target',
        'Network management and NOC in Europe',
        'Exclusive AST SpaceMobile distribution',
        'Ground stations for backhaul',
        'Full European digital sovereignty',
      ],
      sources: ['Press release Mar 3, 2025'],
      prevValue: 'Commercial partnership only',
      newValue: 'JV for European distribution',
      impact: 'Positive',
    },
    {
      date: '2025-03-03',
      category: 'Earnings',
      title: 'Q4 2024 / FY2024 Earnings',
      summary: '$567.5M cash, Block 1 operational, 40 BB2 in production',
      details: [
        'FY2024 Revenue: $4.4M',
        'FY2024 OpEx: $247.2M',
        'Cash: $567.5M (Dec 31) → ~$1B pro forma',
        'Block 1 (BB1-5) fully operational',
        '40 Block 2 satellites in production',
        'Launch capacity for ~60 sats in 2025-2026',
        'ASIC validation complete',
        '$43M SDA contract announced',
      ],
      sources: ['10-K Mar 3, 2025', 'Earnings call'],
      prevValue: 'Development stage',
      newValue: 'Block 1 operational, $1B cash',
      impact: 'Positive',
    },
    {
      date: '2025-03-03',
      category: 'Earnings',
      title: 'Earnings Call: Starlink/T-Mobile Comparison',
      summary: 'CEO: competitors offer "quasi-intermittent messaging" vs AST full broadband',
      details: [
        'Abel on T-Mobile/Starlink: "quasi-intermittent messaging service"',
        'AST offers: voice, text, data, internet, video, FaceTime',
        '10 GHz processing bandwidth per satellite (10x competitors)',
        '120 Mbps peak data rate directly to phones',
        'Premium 850 MHz band - superior penetration',
        'No phone modification or special app required',
      ],
      sources: ['Q4 2024 Earnings Call Mar 4, 2025'],
      prevValue: 'Competitive positioning unclear',
      newValue: 'Full broadband vs messaging differentiation',
      impact: 'Positive',
    },
    {
      date: '2025-03-04',
      category: 'Earnings',
      title: 'Q4 Business Update: ASIC Validation Complete',
      summary: 'Novel ASIC validated with 10 GHz bandwidth and 120 Mbps peak speeds',
      details: [
        'Completed bring-up and initial validation of novel ASIC',
        'Supports up to 10,000 MHz (10 GHz) processing bandwidth per satellite',
        'Peak data transmission speeds up to 120 Mbps to unmodified phones',
        'Will be integrated into Block 2 satellites',
        'Custom silicon designed for space-based beamforming',
        'Enables full broadband experience (voice, video, data)',
      ],
      sources: ['Q4 2024 Business Update Mar 4, 2025 Slide 7'],
      prevValue: 'ASIC in development',
      newValue: '10 GHz ASIC validated, 120 Mbps peak',
      impact: 'Positive',
    },
    {
      date: '2025-03-04',
      category: 'Earnings',
      title: 'Q4 Business Update: Manufacturing Expansion Plans',
      summary: 'Global manufacturing footprint expanding to ~338K sq ft',
      details: [
        '~194,000 sq ft in Midland, Texas (HQ)',
        '~59,000 sq ft in Barcelona, Spain',
        '~85,000 sq ft planned in Homestead, Florida',
        'Contracted launch capacity for ~60 satellites during 2025-2026',
        'Planning and production of 40 Block 2 BlueBirds underway',
        'Accelerated procurement for 50+ satellite components',
      ],
      sources: ['Q4 2024 Business Update Mar 4, 2025 Slide 7'],
      prevValue: '~185K sq ft (Midland only)',
      newValue: '~338K sq ft globally, FL expansion',
      impact: 'Positive',
    },
    {
      date: '2025-05-12',
      category: 'Earnings',
      title: 'Q1 Business Update: Gateway Equipment Bookings',
      summary: '$13.6M gateway equipment revenue in Q1, ~$10M/quarter expected',
      details: [
        'Gateway equipment bookings of $13.6 million in Q1 2025',
        'Expected gateway bookings ~$10M per quarter during 2025',
        'Precursor to rollout of SpaceMobile service',
        'Part of H2 2025 $50-75M revenue opportunity',
        'MNO partners deploying ground infrastructure globally',
        'Deployment in US, Europe, Japan underway',
      ],
      sources: ['Q1 2025 Business Update May 12, 2025 Slide 6'],
      prevValue: 'No recurring revenue',
      newValue: '$13.6M Q1 gateway bookings',
      impact: 'Positive',
    },
    {
      date: '2025-05-12',
      category: 'Partnership',
      title: 'DIU Contract: Up to $20M via Prime',
      summary: 'Defense Innovation Unit contract for government communications',
      details: [
        'Up to $20 million revenue via prime contractor',
        'SpaceMobile capabilities for multiple US Government agencies',
        'Support government communications over land, sea, and air',
        'Adds to $43M SDA contract announced Feb 2025',
        'Part of broader DoD engagement',
        'Ramping up activities under government contracts',
      ],
      sources: ['Q1 2025 Business Update May 12, 2025 Slide 6'],
      prevValue: '$43M SDA contract only',
      newValue: '+$20M DIU, $63M+ govt total',
      impact: 'Positive',
    },
    {
      date: '2025-05-12',
      category: 'Guidance',
      title: 'Q1 Business Update: 5 Launches Over 6-9 Months',
      summary: 'Multi-provider launch plan announced for 2025-2026',
      details: [
        '5 contracted launches over next 6-9 months',
        'Contracted launch capacity for 60+ satellites total',
        'Orbital launches every 1-2 months on average',
        'Manufacturing to reach 6 satellites per month in 2025',
        'Phased array cadence target in Q3 2025',
        '45-60 satellites in orbit goal for 2025-2026',
      ],
      sources: ['Q1 2025 Business Update May 12, 2025 Slides 4-5'],
      prevValue: 'Launch schedule developing',
      newValue: '5 launches contracted, 6/mo mfg cadence',
      impact: 'Positive',
    },
    {
      date: '2025-08-11',
      category: 'Earnings',
      title: 'Q2 Business Update: L-Band Court Approval',
      summary: 'Bankruptcy court approves Ligado spectrum definitive documentation',
      details: [
        'Received court approval for L-Band definitive documentation',
        'Long-term access to up to 45 MHz of L-Band spectrum',
        'Premium lower mid-band spectrum in US and Canada',
        'Subject to regulatory approvals',
        'Enables carrier aggregation with low-band spectrum',
        'Part of expanded spectrum strategy',
      ],
      sources: ['Q2 2025 Business Update Aug 11, 2025 Slide 8'],
      prevValue: 'Ligado definitive signed, court pending',
      newValue: 'Court approval received',
      impact: 'Positive',
    },
    {
      date: '2025-08-11',
      category: 'Earnings',
      title: 'Q2 Business Update: 21 EU States Interest in SatCo',
      summary: 'Network operators in 21/27 EU member states express interest',
      details: [
        'SatCo JV with Vodafone receives expressions of interest',
        '21 of 27 EU member states network operators interested',
        'Sovereign direct-to-device mobile broadband satellite service',
        'European distribution entity jointly owned with Vodafone',
        'Turn-key service throughout Europe planned',
        'Fully sovereign backhaul capabilities under co-ownership',
      ],
      sources: ['Q2 2025 Business Update Aug 11, 2025 Slide 9'],
      prevValue: 'SatCo JV announced',
      newValue: '21/27 EU states interested',
      impact: 'Positive',
    },
    {
      date: '2025-08-11',
      category: 'Earnings',
      title: 'Q2 Business Update: 8 Block 2 Satellite Microns Complete',
      summary: 'Completed assembly of microns for 8 Block 2 BlueBird phased arrays',
      details: [
        'Completed assembly of microns for 8 Block 2 BlueBird satellites',
        'FM1 expected to ship August 2025',
        'Expect 40 satellites equivalent of microns by early 2026',
        'Manufacturing footprint growing to 400K+ sq ft by end 2025',
        '95% vertical integration across Texas, Europe, and globally',
        'Anticipating at least 5 orbital launches by end of Q1 2026',
      ],
      sources: ['Q2 2025 Business Update Aug 11, 2025 Slides 6-7'],
      prevValue: 'Block 2 production ramping',
      newValue: '8 satellite microns complete, 40 by early 2026',
      impact: 'Positive',
    },
    {
      date: '2025-08-11',
      category: 'Earnings',
      title: 'Q2 Business Update: 8 US Government Contracts',
      summary: 'Total of 8 contracts with US Government as end customer',
      details: [
        'Signed 2 additional early-stage contracts in Q2',
        'Total of 8 contracts to date with US Govt as end customer',
        'SDA: $43M for satellite communications',
        'DIU: Up to $20M via prime contractor',
        'First tactical NTN demo with multiple military branches',
        'US Navy, Marine Corps, Army, Space Command, USDR&E, Indo-Pacific Command',
      ],
      sources: ['Q2 2025 Business Update Aug 11, 2025 Slide 10'],
      prevValue: '6 government contracts',
      newValue: '8 total US govt contracts',
      impact: 'Positive',
    },
    {
      date: '2025-02-26',
      category: 'Partnership',
      title: '$43M SDA Contract via Prime',
      summary: 'Space Development Agency contract following BW3 testing',
      details: [
        '$43M expected revenue',
        'Through prime contractor',
        'Follows successful BW3 testing',
        'US Space Force / SDA',
        'Block 2 satellites to be used',
        'Proliferated Warfighter Space Architecture',
      ],
      sources: ['Press release Feb 26, 2025'],
      prevValue: 'Initial SDA testing only',
      newValue: '$43M contract awarded',
      impact: 'Positive',
    },
    {
      date: '2025-01-31',
      category: 'Guidance',
      title: 'FCC STA Granted: AT&T + Verizon',
      summary: 'Special Temporary Authority for US testing',
      details: [
        'FCC STA granted for AT&T and Verizon spectrum',
        'All smartphone types authorized',
        'Voice, data, video applications',
        '5,600+ coverage cells in US',
        '~100% nationwide coverage target',
        '5 gateways being installed in US',
      ],
      sources: ['Press release Jan 31, 2025'],
      prevValue: 'Pending FCC authorization',
      newValue: 'STA granted for US testing',
      impact: 'Positive',
    },
    {
      date: '2025-01-27',
      category: 'Capital',
      title: 'January 2025 Convertible Notes Closed',
      summary: '$460M @ 4.25%, $44.98 effective strike via capped call',
      details: [
        'Principal: $460M (including $60M option)',
        'Coupon: 4.25%',
        'Maturity: March 1, 2032 (7 years)',
        'Initial conversion: $26.99 (20% premium)',
        'Effective conversion: $44.98 (100% premium via capped call)',
        'Capped call cost: $38.7M',
        'Effective dilution: ~3% at cap price',
        'Pro forma cash: ~$1B',
      ],
      sources: ['Press release Jan 27, 2025', '8-K'],
      prevValue: 'Limited cash runway',
      newValue: '$460M raised, ~$1B cash',
      impact: 'Positive',
    },

    {
      date: '2025-01-22',
      category: 'Capital',
      title: '2034 Convertible Notes Conversion',
      summary: 'Company exercised mandatory conversion option',
      details: [
        '$148.5M principal + accrued interest converted',
        '25.8M shares of Class A Common Stock issued',
        'AT&T, Google, Vodafone, Verizon notes converted',
        'Debt reduced by full amount',
      ],
      sources: ['8-K Jan 2025'],
      prevValue: '$148.5M convertible debt',
      newValue: 'Converted to equity, debt eliminated',
      impact: 'Positive',
    },
    {
      date: '2025-01-16',
      category: 'Capital',
      title: '2034 Convertible Notes Issued',
      summary: '$145M subordinated converts to strategic partners',
      details: [
        'AT&T: $25M',
        'Google: $60M',
        'Vodafone: $25M (plus prior commercial terms)',
        'Verizon: $35M (May 2024)',
        '5.50% coupon, 10-year term',
        '$5.75 conversion price',
      ],
      sources: ['8-K Jan 2024', '10-K 2024'],
      prevValue: 'No strategic investor converts',
      newValue: '$145M from AT&T/Google/VOD/VZ',
      impact: 'Positive',
    },
    {
      date: '2025-01-06',
      category: 'Regulatory',
      title: 'Ligado Spectrum RSA Announced',
      summary: '$550M for 45 MHz L-band, 80+ year rights',
      details: [
        'Restructuring Support Agreement with Ligado',
        '40 MHz L-band (1525-1559 MHz) in US/Canada',
        '5 MHz additional (1670-1675 MHz)',
        '$550M consideration at closing',
        '$550M non-recourse term loan commitment',
        '4.7M penny warrants to Ligado',
        '$80M annual usage payments + revenue share',
        '80+ year spectrum usage rights',
      ],
      sources: ['Press release Jan 6, 2025', '8-K'],
      prevValue: 'No owned spectrum',
      newValue: 'Agreement for 45 MHz L-band',
      impact: 'Positive',
    },
    {
      date: '2025-01-05',
      category: 'Corporate',
      title: 'Ligado Strategic Transaction Announced',
      summary: 'Agreement to acquire L-band spectrum through bankruptcy',
      details: [
        'Strategic Collaboration Term Sheet signed',
        'Ligado filed Chapter 11 bankruptcy',
        '45 MHz L-band spectrum for D2D applications',
        '$550M consideration upon closing',
        'Restructuring Support Agreement with creditors',
      ],
      sources: ['8-K Jan 2025', 'Bankruptcy filings'],
      prevValue: 'Spectrum from MNO partners only',
      newValue: 'Own spectrum acquisition path',
      impact: 'Positive',
    },
    {
      date: '2024-12-24',
      category: 'Product',
      title: 'BlueBird 6 Launch',
      summary: 'First Block 2 satellite launched',
      details: [
        'SpaceX Falcon 9 from Cape Canaveral',
        'First of Block 2 production satellites',
        'Validates manufacturing process for 60-sat constellation',
        'On-orbit testing successful',
      ],
      sources: ['Press release', 'SpaceX manifest'],
      prevValue: '5 Block 1 satellites',
      newValue: '6 total (5 Block 1 + 1 Block 2)',
      impact: 'Positive',
    },
    {
      date: '2024-12-09',
      category: 'Partnership',
      title: 'Vodafone Definitive Agreement Through 2034',
      summary: '10-year commercial framework, first gateway ordered',
      details: [
        'Definitive commercial agreement through 2034',
        'Framework for Vodafone home + partner markets',
        '20+ countries across Europe and Africa',
        'First Block 1 gateway ordered',
        'Three-time investor since 2018',
        '4G/5G capabilities demonstrated',
      ],
      sources: ['Press release Dec 9, 2024'],
      prevValue: 'MOU/partnership only',
      newValue: 'Definitive through 2034',
      impact: 'Positive',
    },
    {
      date: '2024-11-14',
      category: 'Product',
      title: 'Blue Origin Launch Agreement: ~60 Satellites',
      summary: 'New Glenn + existing vehicles for 2025-2026 constellation',
      details: [
        'Launch capacity secured for ~60 Block 2 satellites',
        'Blue Origin New Glenn (7m fairing, 8 sats/launch)',
        'Cape Canaveral launch campaign 2025-2026',
        'Enables continuous coverage in US, Europe, Japan',
        'Block 2: 2,400 sq ft arrays, 10x capacity',
        '120 Mbps peak speeds, 40 MHz capacity',
      ],
      sources: ['Press release Nov 14, 2024'],
      prevValue: 'Limited launch capacity',
      newValue: '~60 satellite launch capacity secured',
      impact: 'Positive',
    },
    {
      date: '2024-11-14',
      category: 'Product',
      title: 'Earnings Call: ISRO Launch Partnership',
      summary: 'India launch provider added, used GSLV (largest) rocket',
      details: [
        'ISRO added as third launch provider (with SpaceX, Blue Origin)',
        'Using GSLV - largest ISRO rocket available',
        'Previously used for BlueWalker 1 launch',
        'Launch cadence: 1, 4, 8, 8, 8 satellites planned',
        'Multi-provider strategy for launch vehicle agnosticism',
        'India launch kicked off Block 2 campaign (Dec 2025)',
      ],
      sources: ['Q3 2024 Earnings Call Nov 14, 2024'],
      prevValue: 'SpaceX + Blue Origin only',
      newValue: 'ISRO added as third provider',
      impact: 'Positive',
    },
    {
      date: '2024-11-14',
      category: 'Earnings',
      title: 'Earnings Call: pLEO Program Expanded to $13B',
      summary: 'DoD PLEO program grew from $900M to $13B - massive TAM expansion',
      details: [
        'pLEO program expanded: $900M → $13B',
        'Designed for scalable DoD services (not bespoke)',
        'Matches AST system design philosophy',
        'Vehicle for comms and non-comms services',
        'SDA created in first Trump admin with multi-billion budget',
        'Most positive govt space backdrop since 1960s space race',
      ],
      sources: ['Q3 2024 Earnings Call Nov 14, 2024'],
      prevValue: '$900M program',
      newValue: '$13B program (14x expansion)',
      impact: 'Positive',
    },
    {
      date: '2024-11-14',
      category: 'Guidance',
      title: 'Earnings Call: 25 Satellites = Cash Flow Positive',
      summary: 'Management threshold for operating cash flow generation',
      details: [
        '25 satellites enables non-continuous service in key markets',
        '25 satellites = potential positive operating cash flow',
        'Self-funding capability for remaining constellation',
        'Commercial + government revenue combined',
        'Gateway infrastructure revenue contributing',
        'Threshold repeatedly confirmed through Q3 2025',
      ],
      sources: ['Q3 2024 Earnings Call Nov 14, 2024'],
      prevValue: 'No cash flow guidance',
      newValue: '25 sats = cash flow positive target',
      impact: 'Positive',
    },
    {
      date: '2024-11-14',
      category: 'Earnings',
      title: 'Earnings Call: Block 1 Fully Autonomous',
      summary: 'BB1-5 fly and broadcast autonomously vs BW3 "very manual" operations',
      details: [
        'Block 1 satellites fully autonomous operations',
        'Transmit and broadcast broadband autonomously',
        'BW3 required "very manual" operations with "lots of people"',
        'Critical for scaling to 60+ satellite constellation',
        'Operational learnings translate directly to Block 2',
        'Same micron building blocks for Block 1 and Block 2',
      ],
      sources: ['Q3 2024 Earnings Call Nov 14, 2024'],
      prevValue: 'BW3 manual operations',
      newValue: 'Block 1 autonomous, scalable ops',
      impact: 'Positive',
    },
    {
      date: '2024-10-29',
      category: 'Product',
      title: 'Block 1 Satellites Operational',
      summary: 'All 5 Block 1 satellites ready for intended use',
      details: [
        'Phased array antennas fully deployed',
        'Q/V band antennas operational',
        'Initial monitoring tests completed',
        'Depreciation commenced (60-month useful life)',
        'Reclassified from construction-in-progress',
      ],
      sources: ['10-K 2024', 'Q3 2024 earnings'],
      prevValue: 'In deployment phase',
      newValue: 'Operational status achieved',
      impact: 'Positive',
    },
    {
      date: '2024-10-25',
      category: 'Product',
      title: 'BB1-5 Arrays Unfolded Successfully',
      summary: 'All 5 commercial satellites fully deployed',
      details: [
        'Unfolding completed 6 weeks post-launch',
        'Ahead of schedule',
        'Largest commercial arrays in LEO (~700 sq ft each)',
        '5,600+ cells for US coverage',
        'Preparing for commercial and government operations',
      ],
      sources: ['Press release Oct 25, 2024'],
      prevValue: 'Satellites in orbit, arrays folded',
      newValue: 'All arrays deployed, operational',
      impact: 'Positive',
    },
    {
      date: '2024-10-23',
      category: 'Partnership',
      title: 'SDA HALO Prime Contractor Selection',
      summary: 'Selected for Space Development Agency program',
      details: [
        'Other Transaction (OT) agreement with SDA',
        'HALO program (Hybrid Acquisition for proliferated LEO)',
        'Compete for prototype demonstration projects',
        'Direct prime contractor status',
        'Dual-use technology for DoD applications',
      ],
      sources: ['Press release Oct 23, 2024'],
      prevValue: 'Subcontractor only',
      newValue: 'SDA prime contractor status',
      impact: 'Positive',
    },
    {
      date: '2024-10-03',
      category: 'Capital',
      title: 'Warrant Redemption Complete',
      summary: '$153.6M proceeds, 98.26% exercised',
      details: [
        '13.36M warrants exercised at $11.50',
        '$153.6M aggregate proceeds',
        '98.26% of warrants exercised',
        '236K warrants redeemed at $0.01',
        'Public warrants delisted from NASDAQ',
      ],
      sources: ['Press release Oct 3, 2024'],
      prevValue: '13.6M public warrants outstanding',
      newValue: 'All warrants retired, $154M raised',
      impact: 'Positive',
    },
    {
      date: '2024-09-27',
      category: 'Capital',
      title: 'Public Warrant Redemption',
      summary: 'All public warrants redeemed/exercised',
      details: [
        '13.4M warrants exercised for $153.6M cash',
        'Public warrants delisted from NASDAQ (ASTSW)',
        'Only 3.05M private warrants remain',
        'Simplified capital structure',
      ],
      sources: ['8-K Sept 2024'],
      prevValue: '11.5M public + 6M private warrants',
      newValue: '3.05M private warrants only',
      impact: 'Positive',
    },
    {
      date: '2024-09-12',
      category: 'Product',
      title: 'Block 1 BlueBird Launch (BB1-5)',
      summary: 'First 5 commercial satellites on SpaceX Falcon 9',
      details: [
        'Launched 4:52 AM EDT from Cape Canaveral',
        '5 BlueBird satellites deployed',
        'Largest commercial arrays in LEO (~700 sq ft)',
        'SpaceX Falcon 9',
        '5,600+ cells for US coverage',
        '120 Mbps peak speeds planned',
      ],
      sources: ['Press release Sep 12, 2024'],
      prevValue: '1 test satellite (BW3)',
      newValue: '6 satellites in orbit',
      impact: 'Positive',
    },
    {
      date: '2024-11-14',
      category: 'Earnings',
      title: 'Q3 2024 Earnings: Block 1 Operational',
      summary: '$518.9M cash, 6 satellites launched, warrants redeemed',
      details: [
        'Cash: $518.9M as of Sep 30',
        'Revenue: $1.8M (Q3)',
        'OpEx: $66.6M (Q3)',
        'Block 1 (5 satellites) launched Sep 12',
        'Warrants redeemed Sep 27 ($153.6M cash)',
        '~50 MNOs in pipeline',
        'ISRO added as third launch provider',
        'pLEO program expanded: $900M → $13B',
      ],
      sources: ['10-Q Nov 2024', 'Q3 Earnings Call'],
      prevValue: '1 satellite (BW3)',
      newValue: '6 satellites, Block 1 operational',
      impact: 'Positive',
    },
    {
      date: '2024-08-14',
      category: 'Earnings',
      title: 'Q2 2024 Earnings',
      summary: '$287.6M cash, Verizon $100M, ASIC tape-out',
      details: [
        'Cash: $287.6M',
        'Verizon $100M commitment added',
        'ASIC tape-out with TSMC complete',
        '17 Block 2 satellites in production',
        '95% vertically integrated manufacturing',
        'US Government contract milestones met',
      ],
      sources: ['10-Q Aug 14, 2024'],
      prevValue: 'Development phase',
      newValue: 'Launch-ready, $288M cash',
      impact: 'Positive',
    },
    {
      date: '2024-08-05',
      category: 'Guidance',
      title: 'FCC Initial License Granted',
      summary: 'Authorized for V/S/UHF frequencies',
      details: [
        'FCC grants initial space license',
        'V, S, UHF frequencies authorized',
        'Gateway, feeder link, TT&C operations',
        'Critical step for US commercial service',
        'Constellation filings under US jurisdiction',
      ],
      sources: ['Press release Aug 5, 2024'],
      prevValue: 'Pending FCC license',
      newValue: 'Initial license granted',
      impact: 'Positive',
    },
    {
      date: '2024-08-02',
      category: 'Regulatory',
      title: 'FCC Launch Authorization',
      summary: 'FCC approved Block 1 satellite launch',
      details: [
        'Call Sign S3065 granted',
        'Authorization for 248 satellite constellation',
        'UHF, S-band, V-band frequencies approved',
        'Telemetry, tracking, command operations authorized',
      ],
      sources: ['FCC filing', '8-K Aug 2024'],
      prevValue: 'Experimental license only',
      newValue: 'Commercial constellation authorized',
      impact: 'Positive',
    },
    {
      date: '2024-07-25',
      category: 'Product',
      title: 'BB1-5 Final Assembly Complete',
      summary: '693 sq ft arrays ready for Cape Canaveral',
      details: [
        'All 5 BlueBird satellites assembled',
        '693 sq ft arrays each',
        'Environmental testing complete',
        'Ready for shipment to Cape Canaveral',
        'September launch window confirmed',
      ],
      sources: ['Press release Jul 25, 2024'],
      prevValue: 'In production',
      newValue: 'Assembly complete, launch-ready',
      impact: 'Positive',
    },
    {
      date: '2024-06-24',
      category: 'Corporate',
      title: 'Chris Sambar (AT&T) Joins Board',
      summary: 'AT&T Head of Network appointed director',
      details: [
        'Chris Sambar appointed to Board',
        'AT&T Head of Network',
        'Replaces Alex Coleman',
        'Network Planning & Spectrum Committee member',
        'Navy SEAL veteran, USC MBA',
      ],
      sources: ['Press release Jun 24, 2024'],
      prevValue: 'No AT&T board representation',
      newValue: 'AT&T network leader on Board',
      impact: 'Positive',
    },
    {
      date: '2024-06-04',
      category: 'Corporate',
      title: 'Johan Wibergh Joins Board',
      summary: 'Former Vodafone CTO appointed director',
      details: [
        'Johan Wibergh appointed to Board',
        'Former Vodafone Group CTO',
        'Former Ericsson EVP Networks',
        '35+ years telecom experience',
        'Network Planning & Spectrum Committee Chair',
      ],
      sources: ['Press release Jun 4, 2024'],
      prevValue: 'Limited network expertise on Board',
      newValue: 'Vodafone/Ericsson veteran on Board',
      impact: 'Positive',
    },
    {
      date: '2024-05-29',
      category: 'Partnership',
      title: 'Verizon $100M Strategic Partnership',
      summary: '$65M prepayments + $35M converts for 100% US coverage',
      details: [
        '$100M total commitment from Verizon',
        '$65M commercial prepayments ($45M conditional)',
        '$35M convertible notes',
        'Combined AT&T+Verizon: 100% continental US coverage target',
        'Premium 850 MHz spectrum access',
        '2.8B+ subscribers via 45+ MNO partners',
      ],
      sources: ['Press release May 29, 2024'],
      prevValue: 'AT&T only for US',
      newValue: 'AT&T + Verizon for 100% US coverage',
      impact: 'Positive',
    },
    {
      date: '2024-05-15',
      category: 'Partnership',
      title: 'AT&T Definitive Commercial Agreement',
      summary: 'Commercial agreement through 2030, replacing MOU',
      details: [
        'Definitive agreement extending to 2030',
        'Replaces 2018 MOU',
        'AT&T Head of Network to join Board',
        '200M+ subscriber reach',
        'Space-based broadband direct to phones',
      ],
      sources: ['Press release May 15, 2024'],
      prevValue: 'MOU since 2018',
      newValue: 'Definitive through 2030',
      impact: 'Positive',
    },
    {
      date: '2024-05-15',
      category: 'Earnings',
      title: 'Q1 2024 Earnings: $212M Cash, Raises Complete',
      summary: '$100M equity + $110M converts raised, ASIC tape-out complete',
      details: [
        'Cash: $212.4M as of Mar 31',
        'Revenue: $0.5M (Q1)',
        'OpEx: $56.0M (Q1)',
        '$100M equity raised Jan 19 @ $3.10',
        '$110M strategic converts (AT&T/Google/Vodafone)',
        'ASIC tape-out with TSMC Mar 27',
        'AT&T 6-year definitive signed May 15',
        '40+ MNO pipeline',
      ],
      sources: ['10-Q May 2024', 'Q1 Business Update'],
      prevValue: '$88.1M cash (low point)',
      newValue: '$212.4M cash, ASIC complete',
      impact: 'Positive',
    },
    {
      date: '2024-04-01',
      category: 'Earnings',
      title: 'Q4 2023 / FY2023 Earnings',
      summary: '$85.6M cash (low point), BW3 5G call achieved',
      details: [
        'Cash: $85.6M as of Dec 31 (lowest point)',
        'FY2023 Revenue: $0',
        'FY2023 OpEx: $222.7M',
        'BW3 5G call Sept 19 (14 Mbps)',
        'Liquidity crunch triggered Jan 2024 raises',
        '35+ MNO MOUs',
        'BW3 CIP: $299.7M gross PP&E',
      ],
      sources: ['10-K April 1, 2024', 'Q4 Business Update'],
      prevValue: '$135.7M cash (Q3)',
      newValue: '$85.6M cash (triggered capital raise)',
      impact: 'Neutral',
    },
    {
      date: '2024-04-01',
      category: 'Earnings',
      title: 'Earnings Call: 95% Vertical Integration Achieved',
      summary: 'Supply chain control milestone - near-complete in-house manufacturing',
      details: [
        '95% vertical integration achieved for satellite manufacturing',
        'Fixed two supplier issues by acquiring licenses and replacing with own IP',
        'Control ~95% of costs and supply chain for Block 2',
        'Same micron building blocks for Block 1 and Block 2',
        'Manufacturing in-house or via third-parties using AST IP',
        'Reduces supply chain risk and accelerates production',
      ],
      sources: ['Q4 FY2023 Earnings Call Apr 1, 2024'],
      prevValue: 'Partial vertical integration',
      newValue: '95% vertically integrated',
      impact: 'Positive',
    },
    {
      date: '2024-04-01',
      category: 'Product',
      title: 'Texas Manufacturing Facility Fully Operational',
      summary: 'Production, assembly, and testing capabilities complete at Midland facility',
      details: [
        'Texas manufacturing facility fully operational',
        'Complete production, assembly, and testing capabilities',
        'Supports both Block 1 and Block 2 satellite manufacturing',
        '95% vertical integration achieved',
        'Reduces dependence on external suppliers',
        'Enables accelerated production timelines',
      ],
      sources: ['Q4 2023 Business Update Apr 1, 2024'],
      prevValue: 'Facility under development',
      newValue: 'Fully operational manufacturing',
      impact: 'Positive',
    },
    {
      date: '2024-04-01',
      category: 'Corporate',
      title: 'Non-Binding LOIs for Quasi-Governmental Funding',
      summary: 'Three letters of interest from export credit agencies for potential long-term capital',
      details: [
        '3 non-binding letters of interest received',
        'From export credit agencies and quasi-governmental institutions',
        'Potential for significant long-term capital',
        'Expected reasonable interest rates if secured',
        'No assurance of securing funding noted',
        'Alternative financing pathway to dilutive equity',
      ],
      sources: ['Q4 2023 Business Update Apr 1, 2024'],
      prevValue: 'No quasi-governmental funding discussions',
      newValue: '3 non-binding LOIs received',
      impact: 'Positive',
    },
    {
      date: '2024-03-27',
      category: 'Corporate',
      title: 'ASIC Tape-Out with TSMC',
      summary: 'AST5000 chip enters production, 10x bandwidth improvement',
      details: [
        'AST5000 ASIC tape-out phase commenced',
        'Collaboration with TSMC foundry',
        '4+ years development, 150 man-years',
        '$45M development cost',
        'Up to 10x processing bandwidth per satellite',
        '10,000 MHz processing bandwidth target',
      ],
      sources: ['Press release Mar 27, 2024'],
      prevValue: 'ASIC in development',
      newValue: 'Tape-out with TSMC',
      impact: 'Positive',
    },
    {
      date: '2024-03-14',
      category: 'Regulatory',
      title: 'Brazil D2D Regulatory Framework Announced',
      summary: 'Initial regulatory framework enables testing with major Brazilian carriers',
      details: [
        'Brazil announces initial D2D regulatory framework',
        'Enables testing with Claro (America Movil partner)',
        'Enables testing with Vivo (Telefonica partner)',
        'Enables testing with TIM',
        'Key South American market with large addressable population',
        'Regulatory pathway for commercial service',
      ],
      sources: ['Q4 2023 Business Update Apr 1, 2024'],
      prevValue: 'No D2D regulatory framework in Brazil',
      newValue: 'Initial framework announced Mar 14',
      impact: 'Positive',
    },
    {
      date: '2024-03-12',
      category: 'Guidance',
      title: 'ITU/FCC Constellation Filing Update',
      summary: 'Satellites moved to US jurisdiction',
      details: [
        'ITU constellation filing updated',
        'FCC V-band application filed',
        'Satellites under US jurisdiction',
        'Aligns with FCC SCS rulemaking',
        'Strategic alignment with US operations',
      ],
      sources: ['Press release Mar 12, 2024'],
      prevValue: 'Non-US constellation filing',
      newValue: 'US-administered constellation',
      impact: 'Positive',
    },
    {
      date: '2024-02-22',
      category: 'Regulatory',
      title: 'Abel Avellan Appointed ITU/UNESCO Commissioner',
      summary: 'CEO joins Broadband Commission for Sustainable Development',
      details: [
        'Appointed Commissioner to ITU/UNESCO Broadband Commission',
        'Mission: Universal broadband by 2030',
        'Recognition of ASTS role in connectivity',
        '3,100+ patents at time of announcement',
      ],
      sources: ['Press release Feb 22, 2024'],
      prevValue: 'No international commission role',
      newValue: 'ITU/UNESCO Commissioner',
      impact: 'Positive',
    },
    {
      date: '2024-02-08',
      category: 'Partnership',
      title: 'US Government Contract via Prime Contractor',
      summary: 'First revenue-generating government contract',
      details: [
        'Firm-fixed-price contract awarded',
        'Via prime contractor to US Government',
        'Supported by BW3 and first 5 commercial satellites',
        'Dual-use technology capabilities',
        'Revenue-generating milestone',
      ],
      sources: ['Press release Feb 8, 2024'],
      prevValue: 'No government contracts',
      newValue: 'First US Gov revenue contract',
      impact: 'Positive',
    },
    {
      date: '2024-01-23',
      category: 'Capital',
      title: '$100M Common Stock Offering Closed',
      summary: '32.3M shares at $3.10 per share',
      details: [
        '32,258,064 shares issued',
        '$3.10 per share',
        '$100M gross proceeds',
        'UBS and Barclays as book-runners',
        'General corporate purposes',
      ],
      sources: ['Press release Jan 19/23, 2024'],
      prevValue: 'Pre-offering',
      newValue: '$100M raised at $3.10',
      impact: 'Neutral',
    },
    {
      date: '2024-01-18',
      category: 'Corporate',
      title: 'AT&T/Google/Vodafone Strategic Investment',
      summary: '$206.5M financing with industry leaders',
      details: [
        '$110M subordinated converts @ 5.50%, $5.75 strike',
        '$20M AT&T revenue commitment',
        '$25M Vodafone revenue commitment',
        '$51.5M credit facility draw planned',
        'Google collaboration on Android integration',
        '10-year convert maturity',
      ],
      sources: ['Press release Jan 18, 2024', '8-K Jan 2024'],
      prevValue: 'Limited strategic backing',
      newValue: 'AT&T/Google/Vodafone invested',
      impact: 'Positive',
    },
    {
      date: '2023-11-14',
      category: 'Earnings',
      title: 'Q3 2023 Earnings: $135.7M Cash, BW3 5G Achieved',
      summary: 'First 5G call from space, cash runway concerns emerging',
      details: [
        'Cash: $135.7M as of Sep 30',
        'Revenue: $0 (Q3)',
        'OpEx: $59.0M (Q3)',
        'BW3 first 5G call Sept 19 (14 Mbps)',
        'Atlas debt: $48.5M closed Aug 14',
        '40+ MNO MOUs, 2.4B subscribers',
        'Processing roadmap: 100 MHz → 1 GHz → 10 GHz',
      ],
      sources: ['10-Q Nov 2023', 'Q3 Business Update'],
      prevValue: '$175.8M cash (Q2)',
      newValue: '$135.7M cash, 5G validated',
      impact: 'Positive',
    },
    {
      date: '2023-11-14',
      category: 'Earnings',
      title: 'Earnings Call: Processing Capacity Roadmap',
      summary: '100 MHz → 1 GHz → 10 GHz progression - 100x improvement path',
      details: [
        'BW3: 100 MHz processing bandwidth (test satellite)',
        'Block 1: 1 GHz processing bandwidth (10x BW3)',
        'Block 2 with ASIC: 10 GHz processing bandwidth (10x Block 1)',
        'Total improvement: 100x from BW3 to Block 2',
        'ASIC (AST5000) enables 120 Mbps peak per cell',
        'Key competitive moat: 4+ years, $45M, 150 man-years to develop',
      ],
      sources: ['Q3 FY2023 Earnings Call Nov 14, 2023'],
      prevValue: 'Processing capacity unclear',
      newValue: '100x improvement roadmap defined',
      impact: 'Positive',
    },
    {
      date: '2023-11-14',
      category: 'Guidance',
      title: 'Adjusted OpEx Guidance: $25-30M/Quarter from Q1 2024',
      summary: 'Cost structure improvement as non-recurring R&D completes',
      details: [
        'Current run-rate: $37-40M adjusted OpEx per quarter',
        'Target from Q1 2024: $25-30M adjusted OpEx per quarter',
        '$10-15M quarterly reduction expected',
        'Drivers: Block 1 design complete, ASIC design substantially complete',
        'Block 2 design partially complete',
        'No material headcount changes expected',
        'Total GAAP OpEx: $47-54M/quarter (includes $22-24M D&A and SBC)',
      ],
      sources: ['Q3 2023 Business Update Nov 14, 2023'],
      prevValue: '$37-40M adj OpEx per quarter',
      newValue: '$25-30M adj OpEx target from Q1 2024',
      impact: 'Positive',
    },
    {
      date: '2023-09-19',
      category: 'Corporate',
      title: 'First 5G Voice Call + 14 Mbps Speeds',
      summary: 'Historic 5G connectivity from BW3 to smartphone',
      details: [
        'First-ever 5G call from space to unmodified smartphone',
        '14 Mbps download speeds achieved',
        'Hawaii to Madrid call via AT&T spectrum',
        'Samsung Galaxy S22 used',
        '2,600+ patents at time',
        '40+ MNOs, 2.4B subscribers',
      ],
      sources: ['Press release Sept 19, 2023'],
      prevValue: '4G/LTE, 10 Mbps',
      newValue: '5G validated, 14 Mbps',
      impact: 'Positive',
    },
    {
      date: '2023-08-14',
      category: 'Earnings',
      title: 'Q2 2023 Earnings: $175.8M Cash, 4G Achieved',
      summary: 'BW3 4G/LTE speeds (10+ Mbps), Atlas debt announced',
      details: [
        'Cash: $175.8M as of Jun 30',
        'Revenue: $0 (Q2)',
        'OpEx: $48.0M (Q2)',
        'BW3 4G/LTE June 21 (10.3 Mbps)',
        'Atlas $48.5M debt facility announced',
        '$59.4M equity raise Jun 28',
        '35+ MNO MOUs, 2B subscribers',
      ],
      sources: ['10-Q Aug 2023', 'Q2 Business Update'],
      prevValue: '$206.3M cash (Q1)',
      newValue: '$175.8M cash, 4G validated',
      impact: 'Positive',
    },
    {
      date: '2023-08-14',
      category: 'Capital',
      title: 'Atlas Credit Facility Closed',
      summary: '$48.5M senior secured term loan',
      details: [
        'Principal: $48.5M (of $100M commitment)',
        'Rate: SOFR + 9.625%',
        'Maturity: August 2026',
        'Secured by substantially all assets',
        'Net proceeds: $37.2M after costs',
      ],
      sources: ['8-K Aug 2023', '10-K 2023'],
      prevValue: '$5M Lone Star only',
      newValue: '$53.5M total debt',
      impact: 'Mixed',
    },
    {
      date: '2023-07-17',
      category: 'Regulatory',
      title: 'FCC SCS Application Update Filed',
      summary: 'Updated commercial application for 700/800 MHz spectrum use',
      details: [
        'Amended pending FCC request for commercial use of 700/800 MHz',
        'Includes updated technical testing and analysis from BW3',
        'Supplements AT&T spectrum lease filed in May 2023',
        'Covers 1,000+ existing AT&T low-band spectrum licenses',
        'Completes package required for FCC processing',
        'Enables path to initial US commercial service in 2024',
      ],
      sources: ['Q2 2023 Business Update Aug 14, 2023'],
      prevValue: 'Original SCS application pending',
      newValue: 'Updated application with BW3 test data',
      impact: 'Positive',
    },
    {
      date: '2023-06-28',
      category: 'Capital',
      title: '$59.4M Common Stock Offering',
      summary: '12.5M shares for launch funding',
      details: [
        '12,500,000 shares issued',
        '$59.4M gross proceeds',
        'Barclays sole book-runner',
        'Use: Launch services and equipment Q3 2023',
      ],
      sources: ['Press release June 28, 2023'],
      prevValue: 'Pre-offering',
      newValue: '$59.4M raised',
      impact: 'Neutral',
    },
    {
      date: '2023-06-21',
      category: 'Corporate',
      title: 'BW3 Achieves 4G/10+ Mbps Downloads',
      summary: 'First 4G speeds from space to smartphone',
      details: [
        'Download speeds above 10.3 Mbps',
        'AT&T spectrum, Nokia RAN',
        'Multiple off-the-shelf smartphones tested',
        'Hawaii testing location',
        '35+ MNOs, 2B subscribers',
      ],
      sources: ['Press release June 21, 2023'],
      prevValue: 'Voice/2G only',
      newValue: '4G LTE validated',
      impact: 'Positive',
    },
    {
      date: '2023-05-15',
      category: 'Earnings',
      title: 'Q1 2023 Earnings: $206.3M Cash, Voice Call Achieved',
      summary: 'First voice call from space April 25, constellation reduced',
      details: [
        'Cash: $206.3M as of Mar 31',
        'Revenue: $0 (Q1)',
        'OpEx: $52.6M (Q1)',
        'BW3 first voice call April 25 (historic)',
        'Constellation reduced: 110 → ~90 satellites',
        '30+ MNO MOUs',
        'BW3 determined ready for use (depreciation starts)',
      ],
      sources: ['10-Q May 2023', 'Q1 Business Update'],
      prevValue: '$300.6M cash (Q4 2022)',
      newValue: '$206.3M cash, voice proven',
      impact: 'Positive',
    },
    {
      date: '2023-05-15',
      category: 'Guidance',
      title: 'Earnings Call: Constellation Reduced to ~90 Satellites',
      summary: 'BW3 signal testing proves tech works better than expected',
      details: [
        'Constellation target reduced: 110 → ~90 satellites',
        'Based on BW3 signal strength testing exceeding expectations',
        'Fewer satellites needed for continuous global coverage',
        'Validates large phased array + processing approach',
        'Block 1 commercial activation: 3-4 months post-launch',
        '~3 bits/Hz spectral efficiency confirmed (sufficient for 4G/5G)',
      ],
      sources: ['Q1 FY2023 Earnings Call May 15, 2023'],
      prevValue: '110 satellite target',
      newValue: '~90 satellites (18% reduction)',
      impact: 'Positive',
    },
    {
      date: '2023-05-22',
      category: 'Corporate',
      title: 'Russell 2000/3000 Index Inclusion',
      summary: 'Added to Russell indexes effective June 26',
      details: [
        'Russell 2000 (small-cap) inclusion',
        'Russell 3000 (broad-market) inclusion',
        'Effective after market open June 26, 2023',
        '$12T benchmarked to Russell indexes',
      ],
      sources: ['Press release May 22, 2023'],
      prevValue: 'No index inclusion',
      newValue: 'Russell 2000/3000 member',
      impact: 'Positive',
    },
    {
      date: '2023-04-25',
      category: 'Corporate',
      title: 'First Direct-to-Cell Voice Call',
      summary: 'Historic first call from space to unmodified phone',
      details: [
        'First-ever space-based voice call to unmodified smartphone',
        'Midland TX to Rakuten Japan via AT&T spectrum',
        'Samsung Galaxy S22 used',
        '2,600+ patents',
        '185,000 sq ft facilities',
        'BW3 determined ready for use (depreciation starts)',
      ],
      sources: ['Press release April 25, 2023'],
      prevValue: 'BW3 in testing',
      newValue: 'Voice capability proven',
      impact: 'Positive',
    },
    {
      date: '2023-03-13',
      category: 'Partnership',
      title: 'stc (Saudi Telecom) MOU Signed',
      summary: 'Partnership with leading Saudi operator',
      details: [
        'MOU signed at MWC Barcelona',
        'Goal: Mobile service accessibility in Saudi Arabia',
        'Satellite-based digital services development',
        'stc is leading Saudi telecom provider',
      ],
      sources: ['Press release Mar 13, 2023'],
      prevValue: 'No Middle East anchor partner',
      newValue: 'stc MOU signed',
      impact: 'Positive',
    },
    {
      date: '2023-03-06',
      category: 'Partnership',
      title: 'Fairwinds Technologies Teaming Agreement',
      summary: 'Defense/military market partnership',
      details: [
        'Joint marketing to military and law enforcement',
        'Tactical Military Communications applications',
        'Fairwinds is US Government prime contractor',
        'Focus: Network resiliency, 4G/5G, PNT',
      ],
      sources: ['Press release Mar 6, 2023'],
      prevValue: 'No defense partnerships',
      newValue: 'Fairwinds teaming agreement',
      impact: 'Positive',
    },
    {
      date: '2023-03-01',
      category: 'Earnings',
      title: 'Q4 2022 / FY2022 Earnings: $300.6M Cash, BW3 Deployed',
      summary: 'BW3 antenna deployed Nov 14, testing underway',
      details: [
        'Cash: $300.6M as of Dec 31',
        'FY2022 Revenue: $15.2M (Nano subsidiary)',
        'FY2022 OpEx: $122.5M',
        'BW3 antenna deployed Nov 14 (693 sq ft)',
        'NanoAvionics sold Jul/Sep 2022',
        '$75M equity raise Dec 22 @ $5.50',
        '25+ MNO MOUs',
      ],
      sources: ['10-K Mar 2023', '10-K/A 2022'],
      prevValue: '$321.8M cash (FY2021)',
      newValue: '$300.6M cash, BW3 deployed',
      impact: 'Positive',
    },
    {
      date: '2023-02-09',
      category: 'Partnership',
      title: 'Zain KSA MOU Signed',
      summary: 'Saudi Arabia partnership at LEAP 2023',
      details: [
        'MOU signed at LEAP 2023 Riyadh',
        'New telecom solutions for Saudi Arabia',
        'Remote locations: land, sea, air',
        'Zain is leading Saudi telecom provider',
      ],
      sources: ['Press release Feb 9, 2023'],
      prevValue: 'Limited Middle East presence',
      newValue: 'Zain KSA MOU',
      impact: 'Positive',
    },
    {
      date: '2023-02-08',
      category: 'Partnership',
      title: 'TIM Brazil MOU Signed',
      summary: 'Brazil coverage expansion partnership',
      details: [
        'TIM: only operator serving all Brazil municipalities',
        '4G data and voice services planned',
        'Testing in North/Northeastern regions H1 2023',
        'Target: isolated areas, villages, roads, resorts',
      ],
      sources: ['Press release Feb 8, 2023'],
      prevValue: 'Limited South America presence',
      newValue: 'TIM Brazil MOU',
      impact: 'Positive',
    },
    {
      date: '2022-12-15',
      category: 'Partnership',
      title: 'NASA Space Act Agreement Signed',
      summary: 'Formalizes spaceflight safety cooperation',
      details: [
        'Conjunction Assessment coordination with NASA',
        'Flight safety data sharing formalized',
        'Trajectory data uploaded to Space-Track.org',
        'US Space Force screening for conjunctions',
        '2,600+ patents at time',
        '1.8B subscribers across MNO partners',
      ],
      sources: ['Press release Dec 15, 2022'],
      prevValue: 'Informal coordination',
      newValue: 'NASA Space Act Agreement',
      impact: 'Positive',
    },
    {
      date: '2022-12-02',
      category: 'Capital',
      title: 'December 2022 Stock Offering Closed',
      summary: '$75M raised (upsized from $65M) @ $5.50',
      details: [
        '13,636,364 shares at $5.50 per share',
        '$75M gross proceeds (upsized from $65M)',
        'B. Riley sole book-runner',
        '30-day overallotment option: 2,045,454 shares',
        'Use: Block 1 satellite production and launch',
      ],
      sources: ['Press release Dec 2, 2022'],
      prevValue: 'Pre-offering',
      newValue: '$75M raised @ $5.50',
      impact: 'Positive',
    },
    {
      date: '2022-11-14',
      category: 'Earnings',
      title: 'Q3 2022 Earnings: BW3 Launched, Nano Sold',
      summary: 'BW3 launched Sep 10, NanoAvionics sale closed',
      details: [
        'Cash: ~$170M as of Sep 30 (pre-Dec raise)',
        'Revenue: $3.8M (Q3, Nano partial quarter)',
        'OpEx: ~$32M (Q3)',
        'BW3 launched Sep 10 on SpaceX',
        'NanoAvionics sale closed Sep 2022 (~$28M)',
        'BW3 antenna deployment sequence began',
        '25+ MNO MOUs',
      ],
      sources: ['10-Q Nov 2022', 'Q3 Business Update'],
      prevValue: 'Pre-launch',
      newValue: 'BW3 in orbit, Nano sold',
      impact: 'Positive',
    },
    {
      date: '2022-11-14',
      category: 'Guidance',
      title: 'BW3 Antenna Deployment Complete',
      summary: '693 sq ft phased array fully deployed in orbit',
      details: [
        'Largest commercial communications array in LEO',
        '693 square feet aperture',
        'Full deployment confirmed',
        'Testing phase commenced',
      ],
      sources: ['Press release Nov 2022'],
      prevValue: 'In deployment sequence',
      newValue: 'Fully deployed, testing begins',
      impact: 'Positive',
    },
    {
      date: '2022-09-15',
      category: 'Corporate',
      title: 'First Annual Shareholder Meeting (2022)',
      summary: 'Director RSU grants and initial grants vested',
      details: [
        'Initial 11,755 RSU grants vested',
        'Annual 16,667 RSU grants issued ($150K value)',
        'Director compensation: $50K base + committee fees',
        'Audit Chair: $20K, Comp Chair: $15K, Nom Gov Chair: $10K',
        'Only independent directors (Coleman, Rubin, Sarnoff, Torres) compensated',
      ],
      sources: ['10-K/A 2022'],
      prevValue: 'Initial grants unvested',
      newValue: 'Annual director comp cycle established',
      impact: 'Neutral',
    },
    {
      date: '2022-09-10',
      category: 'Product',
      title: 'BW3 Test Satellite Launch',
      summary: 'BlueWalker 3 launched on SpaceX Falcon 9',
      details: [
        'SpaceX Falcon 9 from Cape Canaveral',
        'First full-scale test satellite',
        '693 sq ft phased array (largest commercial in LEO)',
        'Test platform for Block 1/Block 2 tech',
      ],
      sources: ['Press release Sept 2022'],
      prevValue: 'No satellites',
      newValue: 'BW3 in orbit',
      impact: 'Positive',
    },
    {
      date: '2022-07-28',
      category: 'Partnership',
      title: 'Nokia 5-Year 4G/5G Partnership',
      summary: 'Nokia to provide AirScale RAN equipment for ground infrastructure',
      details: [
        'Five-year deal for 4G and 5G partnership',
        'Nokia AirScale Single RAN equipment for ground stations',
        'ReefShark System-on-Chip (SoC) chipsets',
        'Modular baseband plug-in cards for flexible capacity',
        'NetAct solution for network management',
        'Nokia providing dozens of engineers + Bell Labs experts',
        'Working together for 2 years prior to announcement',
        'Supports BlueWalker 3 testing with MNOs on 6 continents',
        '1.8B+ subscribers through MNO relationships',
      ],
      sources: ['Press release Jul 28, 2022', 'Nokia press release'],
      prevValue: 'No RAN infrastructure partner',
      newValue: 'Nokia 5-year deal for ground equipment',
      impact: 'Positive',
    },
    {
      date: '2022-07-20',
      category: 'Guidance',
      title: 'BW3 Fully Assembled, Left Texas Factory',
      summary: 'Test satellite shipped to California for final environmental testing',
      details: [
        'BlueWalker 3 fully assembled at Midland, TX HQ',
        'Shipped to California for final environmental testing',
        'Environmental testing provides flight data for launch',
        'Then continues to Cape Canaveral for launch',
        'Launch window: early to mid-September',
      ],
      sources: ['Press release Jul 20, 2022'],
      prevValue: 'In assembly',
      newValue: 'Assembled, en route to testing',
      impact: 'Positive',
    },
    {
      date: '2022-07-18',
      category: 'Earnings',
      title: 'Q2 2022 Preliminary Financial Results',
      summary: '$202M cash, $86.6M BW3 CapEx, $34-37M OpEx',
      details: [
        'Cash: ~$202M (excluding Nano sale proceeds)',
        'Q2 OpEx: $34-37M (including $3-4M D&A + SBC)',
        'BW3 capitalized costs: $86.6M (including launch + NRE)',
        'Property & equipment: $38.1M (TX facilities, antennas, test equipment)',
        'Nano sale expected to close Q3 2022',
      ],
      sources: ['Press release Jul 18, 2022'],
      prevValue: null,
      newValue: '$202M cash, BW3 near complete',
      impact: 'Neutral',
    },
    {
      date: '2022-07-05',
      category: 'Partnership',
      title: 'NanoAvionics Sale Agreement Announced',
      summary: 'Agreement to sell 51% stake for ~$28M net proceeds',
      details: [
        'Definitive agreement to sell majority stake in NanoAvionics',
        'Buyer: Kongsberg Defence & Aerospace (Nordic space leader)',
        'Enterprise valuation: ~$68M',
        'Expected net proceeds: ~$28M',
        'Expected close: Q3 2022',
        'Allows focus on core direct-to-cell technology',
        'Combined with $75M B. Riley facility for liquidity',
      ],
      sources: ['Press release Jul 5, 2022'],
      prevValue: 'Diversified with Nano subsidiary',
      newValue: 'Sale agreement signed, pure-play focus',
      impact: 'Positive',
    },
    {
      date: '2022-06-29',
      category: 'Guidance',
      title: 'BW3 Launch Delayed to September',
      summary: 'SpaceX notifies of updated launch window',
      details: [
        'SpaceX notified of launch delay',
        'New window: early to mid-September (from Aug 15)',
        'No change to BW3 satellite preparations',
        'AST SpaceMobile team remains on schedule',
        'Delay due to launch provider scheduling',
      ],
      sources: ['Press release Jun 29, 2022'],
      prevValue: 'Week of Aug 15 launch target',
      newValue: 'Early to mid-September launch target',
      impact: 'Neutral',
    },
    {
      date: '2022-06-13',
      category: 'Guidance',
      title: 'BW3 Summer Launch Date Announced',
      summary: 'Week of Aug 15 target from Cape Canaveral',
      details: [
        'Launch target: week of August 15, 2022',
        'Launch site: Cape Canaveral, FL',
        '693 sq ft phased array for direct-to-cell testing',
        '$85M invested in BW3 development',
        '800+ ground tests completed',
        '2,300+ patent/patent-pending claims',
        'FCC experimental license granted for TX and HI testing',
        'Testing planned on 5 continents with Vodafone, Rakuten, Orange',
      ],
      sources: ['Press release Jun 13, 2022'],
      prevValue: 'Summer 2022 target (unspecified)',
      newValue: 'Week of Aug 15, 2022 launch target',
      impact: 'Positive',
    },
    {
      date: '2022-05-16',
      category: 'Earnings',
      title: 'Q1 2022 Earnings: $263.9M Cash, BW3 Assembly',
      summary: 'BW3 construction continues, summer launch targeted',
      details: [
        'Cash: $263.9M as of Mar 31',
        'Revenue: $6.9M (Q1, Nano subsidiary)',
        'OpEx: $27.7M (Q1)',
        'BW3 assembly ongoing in Texas',
        'BW3 launch target: Summer 2022',
        'B. Riley $75M facility announced May 6',
        '20+ MNO MOUs',
      ],
      sources: ['10-Q May 2022', 'Q1 Business Update'],
      prevValue: '$321.8M cash (FY2021)',
      newValue: '$263.9M cash, BW3 building',
      impact: 'Positive',
    },
    {
      date: '2022-05-06',
      category: 'Capital',
      title: '$75M B. Riley Committed Equity Facility',
      summary: 'ATM-style facility for flexible capital access',
      details: [
        '$75M committed equity facility with B. Riley Principal Capital',
        '24-month availability period',
        'Right to sell Class A shares at AST discretion',
        'Subject to limitations and conditions',
        'Preserves balance sheet cash for BlueBird satellites',
        'Part of diverse capital markets access strategy',
      ],
      sources: ['Press release May 6, 2022', '8-K May 2022'],
      prevValue: 'Limited equity financing options',
      newValue: '$75M committed equity facility',
      impact: 'Positive',
    },
    {
      date: '2022-05-02',
      category: 'Regulatory',
      title: 'FCC Grants BW3 Experimental License',
      summary: 'Authorization for US testing in Texas and Hawaii',
      details: [
        'FCC experimental license granted',
        'Covers space-to-ground testing in US',
        '3GPP low-band cellular frequencies authorized',
        'Q/V-band frequencies authorized (subject to restrictions)',
        'Testing sites: Texas and Hawaii',
        'Supports planned summer 2022 BW3 launch',
      ],
      sources: ['Press release May 2, 2022'],
      prevValue: 'Pending FCC authorization',
      newValue: 'FCC experimental license granted',
      impact: 'Positive',
    },
    {
      date: '2022-04-29',
      category: 'Corporate',
      title: 'Sean Wallace Appointed CFO',
      summary: 'Former Cogent Communications CFO joins as new CFO',
      details: [
        'Effective May 10, 2022',
        'Replaces Tom Severson (planned retirement)',
        'Prior: CFO & Treasurer at Cogent Communications',
        '30+ years finance experience',
        'JP Morgan: Co-Head Asia Pacific IB, North American Telecom Banking',
        'Standard Chartered: Global Corporate Finance & Origination',
        'Harvard College and Harvard Business School graduate',
      ],
      sources: ['Press release Apr 29, 2022'],
      prevValue: 'Tom Severson as CFO',
      newValue: 'Sean Wallace as CFO (effective May 10)',
      impact: 'Positive',
    },
    {
      date: '2022-04-28',
      category: 'Partnership',
      title: 'Globe Telecom MOU Signed',
      summary: 'Partnership with Philippines leading carrier (86M subs)',
      details: [
        'MOU with Globe Telecom (Philippines)',
        '86M wireless subscribers',
        'Philippines archipelago ideal for satellite coverage',
        'Expands coverage to remote/underserved areas',
        'Supports Globe UN Sustainable Development Goals commitment',
        'Total MNO relationships now 1.8B+ subscribers',
      ],
      sources: ['Press release Apr 28, 2022'],
      prevValue: 'No Philippines partner',
      newValue: 'Globe Telecom MOU (86M subs)',
      impact: 'Positive',
    },
    {
      date: '2022-03-25',
      category: 'Partnership',
      title: 'Orange MOU Signed',
      summary: 'Partnership with global telco (220M+ mobile customers)',
      details: [
        'Non-binding MOU with Orange S.A.',
        '220M+ mobile customers globally',
        'Initial testing in one African country post-BW3 launch',
        'Paves way for potential BlueBird satellite agreement',
        'Focus on extending connectivity to underserved areas',
      ],
      sources: ['Press release Mar 25, 2022'],
      prevValue: 'No Orange partnership',
      newValue: 'Orange MOU for African market testing',
      impact: 'Positive',
    },
    {
      date: '2022-03-09',
      category: 'Product',
      title: 'SpaceX Multi-Launch Agreement',
      summary: 'Framework for BW3 + BlueBird satellite launches',
      details: [
        'Multi-launch agreement with SpaceX signed',
        'Covers BW3 summer 2022 launch from Cape Canaveral',
        'Covers first BlueBird satellite launch',
        'Framework for future launches established',
        'Falcon 9 vehicle compatibility confirmed',
        'BlueBird compatible with other launch vehicles too',
        'Up to 6 BlueBird satellites/month manufacturing capacity',
        '185,000 sq ft Texas facilities',
      ],
      sources: ['Press release Mar 9, 2022'],
      prevValue: 'No US launch provider secured',
      newValue: 'SpaceX multi-launch agreement signed',
      impact: 'Positive',
    },
    {
      date: '2022-09-06',
      category: 'Corporate',
      title: 'Nano Subsidiary Sale Closed',
      summary: 'Divested 51% stake in NanoAvionika for strategic focus',
      details: [
        'Sold to Kongsberg Defence & Aerospace',
        'Net proceeds: $26.6M',
        'Gain on sale: $24.5M recognized',
        'InMotion (CEO Avellan entity) received $7.9M for its 13% option stake',
        '2022 YTD Nano revenue: $13.8M (prior to sale)',
        'Focus now 100% on SpaceMobile core mission',
      ],
      sources: ['8-K Sept 2022', '10-K/A 2022'],
      prevValue: 'Nano generating $13.8M revenue, diversified business',
      newValue: 'Pure-play SpaceMobile focus, $0 revenue',
      impact: 'Neutral',
    },
    {
      date: '2022-03-31',
      category: 'Guidance',
      title: 'Initial Constellation Plan Published',
      summary: 'Management outlines 168 satellite deployment timeline',
      details: [
        'BW3 test satellite: Summer 2022 launch target',
        'First BB commercial satellites: 2023 launch target',
        '110 satellites by end of 2024 for substantial global coverage',
        '168 satellites by 2025 for MIMO capabilities',
        'Commercial service starting 2024 in certain geographies',
        'Subject to regulatory approvals and MNO definitive agreements',
      ],
      sources: ['10-K (March 31, 2022)'],
      prevValue: 'No public timeline',
      newValue: '168 sat target by 2025 with 2024 commercial launch',
      impact: 'Positive',
    },
    {
      date: '2022-01-01',
      category: 'Corporate',
      title: 'Executive Compensation - Abel Avellan',
      summary: 'CEO continues to receive no base salary',
      details: [
        'Abel Avellan historically declined salary above minimum wage',
        '2021 total compensation: $8,995 (minimum wage only)',
        '2022 total compensation: $0',
        'No equity awards to CEO',
        'Founder alignment through Class C equity ownership',
        '78.2M Class C shares = 100% of Class C outstanding',
      ],
      sources: ['10-K/A 2021', '10-K/A 2022'],
      prevValue: null,
      newValue: 'CEO takes $0 salary, aligned via equity',
      impact: 'Positive',
    },
    {
      date: '2021-12-31',
      category: 'Earnings',
      title: 'FY2021 Financial Results',
      summary: 'First full year as public company',
      details: [
        'Cash: $321.8M (vs $42.8M in 2020)',
        'Revenue: $12.4M (Nano subsidiary, up from $6.0M)',
        'Net loss: $73.3M (vs $24.4M in 2020)',
        'Operating expenses: $91.6M (vs $27.3M in 2020)',
        'Employees: 386 (163 US, 223 international)',
        'BW3 CIP: $67.6M invested in construction',
        '20+ MOU agreements covering 1.8B subscribers',
      ],
      sources: ['10-K (March 31, 2022)'],
      prevValue: 'Pre-SPAC: $42.8M cash, 250 employees',
      newValue: 'Post-SPAC: $321.8M cash, 386 employees',
      impact: 'Positive',
    },
    {
      date: '2021-12-07',
      category: 'Corporate',
      title: 'Midland Texas Facility Acquisition',
      summary: '$5M term loan for 185,000 sq ft AIT facility',
      details: [
        'Purchased real property in Midland, Texas',
        '$5M term loan from Lone Star State Bank',
        '4.20% fixed rate through Dec 2026',
        '185,000 sq ft AIT facility',
        'Enables in-house satellite assembly, integration, and test',
      ],
      sources: ['10-K/A 2022', 'Term Loan Agreement'],
      prevValue: 'Leased facilities',
      newValue: 'Owned AIT facility in Texas',
      impact: 'Positive',
    },
    {
      date: '2021-12-06',
      category: 'Guidance',
      title: 'BW3 Launch Rebooked to Summer 2022',
      summary: 'Launch delayed from Q1 2022 to Summer 2022 for additional prep',
      details: [
        'Rebooking notice submitted Nov 30, 2021',
        'Original window: March 1 - April 30, 2022',
        'New target: Summer 2022',
        'Purpose: Additional assembly, testing, final launch prep',
        'BW3: 693 sq ft phased array for direct-to-cell testing',
        '500+ team members working on BW3 globally',
      ],
      sources: ['Press release Dec 6, 2021'],
      prevValue: 'Q1 2022 launch target',
      newValue: 'Summer 2022 launch target',
      impact: 'Neutral',
    },
    {
      date: '2021-11-15',
      category: 'Earnings',
      title: 'Q3 2021 Earnings: First Post-SPAC Quarter',
      summary: '$370M cash, BW3 construction underway',
      details: [
        'Cash: ~$370M as of Sep 30',
        'Revenue: $3.5M (Q3, Nano subsidiary)',
        'OpEx: ~$22M (Q3)',
        'BW3 construction in progress',
        'SpaceX launch agreement signed Jul 29',
        'Midland TX facility acquired Dec 2021',
        '15+ MNO MOUs',
      ],
      sources: ['10-Q Nov 2021'],
      prevValue: '$462M from SPAC',
      newValue: '$370M cash, building operations',
      impact: 'Positive',
    },
    {
      date: '2021-08-16',
      category: 'Earnings',
      title: 'Q2 2021 Earnings: First Public Quarter',
      summary: 'First quarterly report after SPAC merger',
      details: [
        'Cash: ~$400M as of Jun 30',
        'Revenue: $3.0M (Q2, Nano subsidiary)',
        'OpEx: ~$20M (Q2)',
        'SPAC merger closed Apr 7, 2021',
        'Nasdaq trading commenced',
        'SpaceX BW3 launch agreement pending',
        '10+ MNO MOUs',
      ],
      sources: ['10-Q Aug 2021'],
      prevValue: 'Private company',
      newValue: 'Public company, $400M+ cash',
      impact: 'Positive',
    },
    {
      date: '2021-08-24',
      category: 'Corporate',
      title: 'Director Compensation Program Established',
      summary: 'Non-employee director RSU grants initiated',
      details: [
        'Initial grant: 11,755 RSUs per eligible director',
        'Grant fair value: $110,967 per director',
        'Annual grant: ~$150,000 value starting 2022',
        'Eligible directors: Coleman, Rubin, Sarnoff, Torres',
        'Strategic investors (Vodafone, Rakuten, American Tower) directors not compensated',
      ],
      sources: ['10-K/A 2021'],
      prevValue: 'No director compensation program',
      newValue: '$150K annual RSUs for independent directors',
      impact: 'Neutral',
    },
    {
      date: '2021-07-29',
      category: 'Product',
      title: 'SpaceX Launch Agreement for BW3',
      summary: 'BlueWalker 3 to launch March 2022 from Cape Canaveral',
      details: [
        'Launch services agreement with SpaceX signed',
        'BW3 to launch from Cape Canaveral, FL',
        'Target: March 2022',
        '693 sq ft aperture for direct-to-cell testing',
        'Second prototype leveraging patented technology',
        'MNO agreements covering ~1.4B subscribers',
      ],
      sources: ['Press release Jul 29, 2021'],
      prevValue: 'No US launch provider',
      newValue: 'SpaceX launch agreement signed',
      impact: 'Positive',
    },
    {
      date: '2021-07-09',
      category: 'Corporate',
      title: 'UK Headquarters Opens at Space Park Leicester',
      summary: 'New UK office in £100M space research hub',
      details: [
        'Space Park Leicester: £100M research/innovation hub',
        'Business development, engineering, regulatory teams',
        'Supports manufacturing of critical subsystems',
        'University of Leicester partnership',
        'Expands international footprint beyond TX, MD, Spain, Israel',
      ],
      sources: ['Press release Jul 9, 2021'],
      prevValue: 'No UK presence',
      newValue: 'UK HQ at Space Park Leicester',
      impact: 'Positive',
    },
    {
      date: '2021-07-06',
      category: 'Partnership',
      title: 'Smart Communications MOU (Philippines)',
      summary: 'Partnership with 70M subscriber carrier',
      details: [
        'MOU with Smart Communications (Philippines)',
        '70M+ Smart subscribers',
        'Philippines mainland, islands, surrounding waters',
        'Part of PLDT, largest integrated telco in Philippines',
        'Total MNO agreements now ~1.4B subscribers',
      ],
      sources: ['Press release Jul 6, 2021'],
      prevValue: 'No Philippines partner',
      newValue: 'Smart Communications MOU (70M subs)',
      impact: 'Positive',
    },
    {
      date: '2021-06-30',
      category: 'Corporate',
      title: 'Q2 2021 Market Value Milestone',
      summary: 'Market cap reaches $514.7M',
      details: [
        'Non-affiliate market value: $514.7M at Q2 end',
        'First quarter post-SPAC close (April 6, 2021)',
        'SPAC raised $462M gross proceeds',
        'Direct costs: $39.5M for Business Combination',
        'Stock trading on NASDAQ under ASTS',
      ],
      sources: ['10-K (March 31, 2022)'],
      prevValue: 'Private company',
      newValue: '$514.7M market cap',
      impact: 'Positive',
    },
    {
      date: '2021-04-06',
      category: 'Corporate',
      title: 'SPAC Business Combination Completed',
      summary: 'AST LLC merged with New Providence Acquisition Corp',
      details: [
        'Combined with SPAC sponsor New Providence',
        'Gross proceeds: $462M from SPAC + PIPE',
        'Listed on NASDAQ under ticker ASTS',
        'Abel Avellan retains control via Class C voting shares',
        'Up-C structure preserves tax efficiency',
      ],
      sources: ['8-K April 2021', 'Proxy Statement'],
      prevValue: 'Private company',
      newValue: 'Public company (NASDAQ: ASTS)',
      impact: 'Positive',
    },
    {
      date: '2021-04-12',
      category: 'Capital',
      title: 'SEC Warrant Accounting Guidance - SPAC Restatement',
      summary: 'NPA SPAC financials restated per SEC Staff Statement on warrant liabilities',
      details: [
        'SEC Acting Chief Accountant issued Staff Statement on SPAC warrants',
        'Warrants must be classified as liabilities (not equity)',
        'Changes in fair value reported through earnings each period',
        'NPA 10-K/A filed with restated financials',
        'Original FY2020: Net income $191,177',
        'Restated FY2020: Net loss $(51,960,823)',
        'No impact on cash, operations, or liquidity',
        'Accounting-only adjustment affecting all SPACs',
        'Auditor: Marcum LLP confirmed restatement',
      ],
      sources: ['10-K/A Amendment May 2021', 'SEC Staff Statement Apr 12, 2021'],
      prevValue: 'Net income $191,177 (original 10-K)',
      newValue: 'Net loss $(51.96M) (restated 10-K/A)',
      impact: 'Neutral',
    },
    {
      date: '2021-05-04',
      category: 'Corporate',
      title: 'Key Executive Hires: Heller & Wisniewski',
      summary: 'General Counsel and Chief Strategy Officer join',
      details: [
        'Brian Heller: EVP, General Counsel & Secretary',
        '20+ years public company experience',
        'Prior: Castle Brands (until Pernod Ricard sale), Ladenburg Thalmann',
        'Scott Wisniewski: EVP, Chief Strategy Officer',
        'Prior: MD at Barclays TMT Investment Banking (10+ years)',
        'Advised AST on $110M 2019 private raise and SPAC combination',
        'Team now includes 200+ scientists/engineers, 24 PhDs',
      ],
      sources: ['Press release May 4, 2021'],
      prevValue: 'Limited public company experience',
      newValue: 'GC and CSO with extensive public co experience',
      impact: 'Positive',
    },
    {
      date: '2021-04-01',
      category: 'Corporate',
      title: 'SPAC Stockholder Vote Approved',
      summary: 'New Providence shareholders approve business combination',
      details: [
        'All proposals approved at special meeting',
        'Closing expected April 6, 2021',
        'Combined company: AST SpaceMobile (NASDAQ: ASTS)',
        '$462M gross proceeds expected',
        'Includes $230M PIPE concurrent closing',
      ],
      sources: ['Press release Apr 1, 2021'],
      prevValue: 'Pending shareholder approval',
      newValue: 'SPAC merger approved',
      impact: 'Positive',
    },
    {
      date: '2021-03-11',
      category: 'Corporate',
      title: '1,000th Patent Claim Milestone',
      summary: 'IP portfolio reaches 1,000 patent/patent-pending claims',
      details: [
        '1,000 total patent and patent-pending claims',
        'Covers satellite architecture, energy efficiency, deployment',
        'Communication protocols for high throughput',
        'Ground coverage, reliability, space-to-cell connectivity',
        'Protected in critical jurisdictions worldwide',
      ],
      sources: ['Press release Mar 11, 2021'],
      prevValue: 'Growing IP portfolio',
      newValue: '1,000+ patent claims',
      impact: 'Positive',
    },
    {
      date: '2021-03-02',
      category: 'Corporate',
      title: 'Board of Directors Expansion Announced',
      summary: 'New board members to join at SPAC closing',
      details: [
        'Edward Knapp (CTO, American Tower)',
        'Richard Sarnoff (Partner, KKR)',
        'Ronald Rubin (Co-Founder, Tower Alliance)',
        'Julio Torres (Managing Partner, Multiple Equilibria)',
        'Alex Coleman (Chairman, New Providence)',
        'Joining existing: Avellan, Severson, Mikitani, Amin, Ibbetson, Cisneros',
        '20 satellites planned for Phase 1 (1.6B people coverage)',
      ],
      sources: ['Press release Mar 2, 2021'],
      prevValue: 'Pre-SPAC board',
      newValue: 'Expanded board with strategic expertise',
      impact: 'Positive',
    },
    {
      date: '2021-04-06',
      category: 'Corporate',
      title: 'Capital Structure Established',
      summary: 'UP-C structure with three share classes',
      details: [
        'Class A: Public shares, 1 vote each',
        'Class B: Strategic investor shares (Vodafone, Rakuten, American Tower), 1 vote each',
        'Class C: Founder shares (Avellan), 10 votes each OR up to 88.31% voting power',
        'As of IPO: 51.8M Class A, 51.6M Class B, 78.2M Class C',
        'Avellan controls ~88% voting power through Class C',
        'Sunset Date triggers conversion of Class C to 1 vote/share',
      ],
      sources: ['10-K/A 2021', 'Stockholders Agreement'],
      prevValue: 'Private LLC units',
      newValue: 'Public company with founder control',
      impact: 'Neutral',
    },
    {
      date: '2021-04-01',
      category: 'Corporate',
      title: 'SpaceMobile 2020 Incentive Award Plan',
      summary: 'Equity compensation plan adopted at SPAC closing',
      details: [
        '10,800,000 shares of Class A authorized',
        'Stock options, RSUs, performance awards available',
        'Service-based options: 4-year vest (25% cliff + 36 monthly)',
        'Service-based RSUs: 4-year vest (25% annual)',
        'Performance RSUs: Vest on specified capital raising conditions',
      ],
      sources: ['10-K/A 2021', '10-K/A 2022'],
      prevValue: 'AST LLC 2019 Equity Incentive Plan (private)',
      newValue: '10.8M share pool for public company awards',
      impact: 'Positive',
    },
    {
      date: '2021-02-04',
      category: 'Corporate',
      title: 'Brian Heller Joins as General Counsel',
      summary: 'Executive VP, General Counsel and Secretary appointed',
      details: [
        'Base salary: $250,000',
        'RSU grant: 350,000 units (205K time-based, 145K performance-based)',
        '20+ years public company experience',
        'Prior roles: Castle Brands Inc., Ladenburg Thalmann',
        'Non-compete for 1 year post-termination',
      ],
      sources: ['10-K/A 2021', '10-K/A 2022'],
      prevValue: 'No General Counsel',
      newValue: 'Full-time GC with equity compensation',
      impact: 'Positive',
    },
    {
      date: '2020-12-15',
      category: 'Partnership',
      title: 'Strategic Investor Agreements',
      summary: 'Vodafone, Rakuten, American Tower commit as strategic partners',
      details: [
        'Vodafone: Commercial agreement for European markets',
        'Rakuten: Exclusive Japan coverage agreement',
        'American Tower: Gateway infrastructure partnership',
        'Combined equity investment alongside SPAC',
        'Board representation for major investors',
      ],
      sources: ['SPAC Proxy', 'Stockholders Agreement'],
      prevValue: 'Standalone development',
      newValue: 'Backed by strategic MNO partners',
      impact: 'Positive',
    },
    {
      date: '2020-12-16',
      category: 'Corporate',
      title: 'SPAC Business Combination Announced',
      summary: '$1.4B EV deal with New Providence Acquisition Corp',
      details: [
        'Business combination with New Providence (NASDAQ: NPA)',
        'Pro forma enterprise value: ~$1.4B',
        'Pro forma equity value: ~$1.8B',
        '$462M gross proceeds expected (SPAC + $230M PIPE)',
        'PIPE led by Vodafone, Rakuten, American Tower, UBS O\'Connor',
        'AST shareholders retain 100% equity, ~71% of combined co',
        'Expected to list on NASDAQ under ASTS',
      ],
      sources: ['Press release Dec 16, 2020'],
      prevValue: 'Private company',
      newValue: 'SPAC deal announced, path to public',
      impact: 'Positive',
    },
    {
      date: '2020-12-16',
      category: 'Guidance',
      title: 'Phase 1 Commercial Launch Plan Unveiled',
      summary: 'Vodafone partnership: 20 satellites, 1.6B people by 2023',
      details: [
        'Phase 1: 20 satellites covering equatorial regions',
        '1.6B people across 49 countries',
        '2023 commercial launch target',
        'Markets: DRC, Ghana, Mozambique, Kenya, Tanzania + India',
        'Vodafone brands: Vodacom, Safaricom, Vodafone',
        '4G and 5G speeds to standard phones',
        'No specialized hardware needed',
        'Funding secured for Phase 1 execution',
      ],
      sources: ['Press release Dec 16, 2020', 'Vodafone PR'],
      prevValue: 'Development stage',
      newValue: '20-sat Phase 1 plan with Vodafone',
      impact: 'Positive',
    },
    {
      date: '2020-12-15',
      category: 'Partnership',
      title: 'Vodafone Side Letter Agreement',
      summary: 'Binding commercial framework with Vodafone',
      details: [
        'Mutual exclusivity in Vodafone markets for 5 years post-launch',
        '50/50 revenue share model agreed',
        'Vodafone to build/operate ground stations',
        'Coverage of 500M+ subscribers across EU/Africa',
        'Board seat for Luke Ibbetson (Head of R&D)',
        'Preferential terms in partner markets',
      ],
      sources: ['10-K/A 2021', '10-K/A 2022'],
      prevValue: 'No European partner',
      newValue: 'Vodafone exclusivity + 50/50 revenue share',
      impact: 'Positive',
    },
    {
      date: '2020-12-15',
      category: 'Partnership',
      title: 'American Tower Partnership',
      summary: 'Gateway infrastructure partnership established',
      details: [
        'American Tower to provide leased tower sites and data centers',
        'Preferred vendor status for carrier-neutral markets',
        '5-year operational agreement post commercial launch',
        'March 2022: Non-binding term sheet for gateway deployment',
        'Board seat for Edward Knapp (CTO, American Tower)',
      ],
      sources: ['10-K/A 2021', '10-K/A 2022'],
      prevValue: 'No infrastructure partner',
      newValue: 'American Tower gateway partnership',
      impact: 'Positive',
    },
    {
      date: '2020-02-04',
      category: 'Partnership',
      title: 'Rakuten Commercial Agreement Signed',
      summary: 'Exclusive Japan coverage deal with Rakuten Mobile',
      details: [
        'Exclusive rights in Japan for Rakuten',
        '$0.5M annual maintenance fee upon launch',
        '$5M capital investment in ground assets',
        'Full coverage with 3GPP Band 3 frequencies and MIMO',
        'KPIs with $10M penalty if not met by June 2023',
        'Board seats for Mikitani and Amin',
      ],
      sources: ['10-K/A 2021', '10-K/A 2022'],
      prevValue: 'No Japan partner',
      newValue: 'Exclusive Rakuten deal for Japan',
      impact: 'Positive',
    },
    // ========== NPA SPAC HISTORY (from SEC Filings) ==========
    {
      date: '2019-11-01',
      category: 'Capital',
      title: 'NPA Class A Shares and Warrants Begin Separate Trading',
      summary: 'SPAC units split into component securities on NASDAQ',
      details: [
        'Class A common stock begins separate trading on NASDAQ',
        'Warrants begin separate trading (NPAWW)',
        'Units continue trading (can be split or held)',
        'Prior: Only units traded since Sept 11 IPO',
        'Warrants: 11.5M public + 6.6M private placement',
        'Exercise price: $11.50 per share',
      ],
      sources: ['10-K FY2019', 'SEC Edgar'],
      prevValue: 'Units only trading',
      newValue: 'Shares + warrants trade separately',
      impact: 'Positive',
    },
    {
      date: '2019-09-11',
      category: 'Corporate',
      title: 'New Providence Acquisition Corp IPO',
      summary: 'SPAC raises $230M, units begin trading on NASDAQ',
      details: [
        'IPO closed September 11, 2019',
        'Sold 23,000,000 units at $10.00 per unit',
        'Each unit: 1 Class A share + 1/2 redeemable warrant',
        'Gross proceeds: $230,000,000',
        'Underwriters: Jefferies, Barclays Capital',
        'Deferred underwriting: $8,050,000 (3.5%)',
        'Trust account funded: ~$231M',
        '18-month deadline to complete business combination',
        'Sponsor: New Providence Management LLC',
        'Leadership: Alexander Coleman (Chairman), Gary Smith (CEO)',
      ],
      sources: ['10-K FY2019 (Mar 30, 2020)', 'S-1 Registration Statement'],
      prevValue: 'Private SPAC',
      newValue: 'Public: NASDAQ NPA units at $10',
      impact: 'Positive',
    },
    {
      date: '2019-05-28',
      category: 'Corporate',
      title: 'New Providence Acquisition Corp Incorporated',
      summary: 'Delaware blank check company formed to pursue acquisition',
      details: [
        'Incorporated in Delaware on May 28, 2019',
        'Blank check company (SPAC) structure',
        'Purpose: Effect merger, capital stock exchange, or asset acquisition',
        'Sponsor: New Providence Management LLC',
        'Initial founder shares: 5,750,000 Class B',
        'Founder share price: $25,000 total ($0.004/share)',
        'Target: Business combination with operating company',
        'Later combined with AST & Science LLC (April 2021)',
      ],
      sources: ['10-K FY2019', 'Certificate of Incorporation'],
      prevValue: null,
      newValue: 'NPA SPAC incorporated',
      impact: 'Positive',
    },
    {
      date: '2019-04-01',
      category: 'Product',
      title: 'BlueWalker 1 Test Satellite Launch',
      summary: 'First test satellite validates satellite-to-cellular architecture',
      details: [
        'BW1 launched to validate satellite-to-cellular architecture',
        'Successfully managed communication delays from LEO orbit',
        'Validated Doppler effects in satellite-ground cellular environment',
        'Tested 4G-LTE protocol in space environment',
        'Proved concept for direct-to-device connectivity',
      ],
      sources: ['10-K (March 31, 2022)'],
      prevValue: 'Theoretical design only',
      newValue: 'LEO satellite-to-cellular validated',
      impact: 'Positive',
    },
    {
      date: '2019-03-01',
      category: 'Corporate',
      title: 'AST & Science LLC Founded',
      summary: 'Abel Avellan founds AST SpaceMobile',
      details: [
        'Founded by Abel Avellan, former EMC CEO ($550M exit in 2016)',
        'Mission: Build space-based cellular broadband network',
        'Initial IP development for direct-to-cell technology',
        '36 patent families developed (21 US patents by 2022)',
        'Attracted early strategic investors',
      ],
      sources: ['Company history', '10-K 2022'],
      prevValue: null,
      newValue: 'Company founded',
      impact: 'Positive',
    },
  ];

  // Category definitions - CRCL unified style (Title Case, no emojis)
  const categoryColors = {
    'Partnership': { bg: 'bg-orange-900/30', border: 'border-orange-700', text: 'text-orange-400', label: 'Partnership' },
    'Corporate': { bg: 'bg-slate-800/50', border: 'border-slate-600', text: 'text-slate-300', label: 'Corporate' },
    'Product': { bg: 'bg-green-900/30', border: 'border-green-700', text: 'text-green-400', label: 'Product' },
    'Regulatory': { bg: 'bg-pink-900/30', border: 'border-pink-700', text: 'text-pink-400', label: 'Regulatory' },
    'SEC Filing': { bg: 'bg-blue-900/30', border: 'border-blue-700', text: 'text-blue-400', label: 'SEC Filing' },
    'Capital': { bg: 'bg-emerald-900/30', border: 'border-emerald-700', text: 'text-emerald-400', label: 'Capital' },
    'Earnings': { bg: 'bg-teal-900/30', border: 'border-teal-700', text: 'text-teal-400', label: 'Earnings' },
    'Guidance': { bg: 'bg-purple-900/30', border: 'border-purple-700', text: 'text-purple-400', label: 'Guidance' },
  };

  // Topic tags for multi-select filtering (AND logic)
  const topicTags = {
    TECH: { label: 'Tech', color: 'bg-cyan-600' },
    COMMERCIAL: { label: 'Commercial', color: 'bg-orange-600' },
    REGULATORY: { label: 'Regulatory', color: 'bg-pink-600' },
    FUNDING: { label: 'Funding', color: 'bg-emerald-600' },
    GOVERNMENT: { label: 'Government', color: 'bg-red-600' },
    MANUFACTURING: { label: 'Manufacturing', color: 'bg-indigo-600' },
    SPECTRUM: { label: 'Spectrum', color: 'bg-violet-600' },
  };

  const impactColors = {
    Positive: 'text-green-400',
    Negative: 'text-red-400',
    Neutral: 'text-slate-400',
    Mixed: 'text-yellow-400',
  };

  const [expanded, setExpanded] = useState(new Set());
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Toggle topic selection (for AND logic multi-select)
  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  // Auto-detect topics from entry content
  const detectTopics = (entry) => {
    const topics = [];
    const text = `${entry.title} ${entry.summary} ${entry.details?.join(' ') || ''}`.toLowerCase();
    
    // TECH: ASIC, processing, bandwidth, antenna, array, phased, autonomous, VoLTE, 5G, broadband
    if (/asic|processing|bandwidth|antenna|array|phased|autonomous|volte|5g|broadband|micron|capacity/.test(text)) topics.push('TECH');
    
    // COMMERCIAL: MNO names, agreement, partnership, prepayment, revenue share
    if (/at&t|verizon|vodafone|rakuten|stc|bell|mno|agreement|partnership|prepay|commercial|definitive/.test(text)) topics.push('COMMERCIAL');
    
    // REGULATORY: FCC, ITU, STA, license, authorization, spectrum (filing context)
    if (/fcc|itu|sta\b|license|authorization|regulatory|filing|approval/.test(text)) topics.push('REGULATORY');
    
    // FUNDING: convertible, equity, ATM, offering, cash, debt, financing, warrant
    if (/convert|equity|atm|offering|cash|debt|financ|warrant|proceeds|raised/.test(text)) topics.push('FUNDING');
    
    // GOVERNMENT: DoD, SDA, government, contract, military, defense, HALO, pLEO, FirstNet
    if (/dod|sda|government|contract|military|defense|halo|pleo|firstnet|golden dome/.test(text)) topics.push('GOVERNMENT');
    
    // MANUFACTURING: production, facility, manufacturing, employees, vertical integration
    if (/production|facility|manufactur|employee|vertical|factory|assembly|texas|midland|barcelona/.test(text)) topics.push('MANUFACTURING');
    
    // SPECTRUM: L-band, S-band, MHz, spectrum (ownership context), Ligado
    if (/l-band|s-band|mhz|spectrum|ligado|elliosat/.test(text)) topics.push('SPECTRUM');
    
    return topics;
  };

  const filteredEntries = (filterCategory === 'ALL' 
    ? timelineEvents 
    : timelineEvents.filter(p => p.category === filterCategory))
    .filter(p => {
      // If no topics selected, show all
      if (selectedTopics.length === 0) return true;
      // AND logic: entry must match ALL selected topics
      const entryTopics = detectTopics(p);
      return selectedTopics.every(t => entryTopics.includes(t));
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Timeline</h2>
      
      {/* Latest SEC Filings - Enhanced with filtering and pagination */}
      <div className="card" style={{ marginBottom: 0 }}>
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
                background: secFilter === type ? 'var(--cyan)' : 'var(--surface3)',
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
                      style={{ color: 'var(--cyan)' }}
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
              <span style={{ color: 'var(--cyan)', marginLeft: 6, fontWeight: 600 }}>{secMeta.ticker}</span>
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
            <span>Last PR Processed: {secMeta.lastPR.date} — {secMeta.lastPR.title}</span>
          </div>
        </div>
      </div>

      {/* Upcoming Events + Recent Press Releases */}
      <div className="g2">
        <div className="card">
          <div className="card-title">Upcoming Events</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Q4 2025 Earnings</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>10-K Annual Report</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--cyan)' }}>~Mar 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est.</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>BB7-BB11 Launches</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Block 2 constellation expansion</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: '#4ade80' }}>Q1 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>45-60 sats by EOY</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Commercial Service Launch</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Initial revenue generation</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--gold)' }}>H1 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Post-constellation</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Convertible Notes Maturity</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>$698M converts @ 4.25%</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--sky)' }}>2028-2030</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Per 10-Q</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Recent Press Releases</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Dec 24, 2025</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>Launch</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>BlueBird 6 Successfully Deployed — First Block 2 Satellite in Orbit</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Oct 2025</span>
                <span style={{ fontSize: 11, color: 'var(--violet)' }}>Financing</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>$1.15B Convertible Notes Offering Completed</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Oct 2025</span>
                <span style={{ fontSize: 11, color: 'var(--cyan)' }}>Partnership</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Verizon Definitive Agreement — $100M+ Commitment</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Nov 2025</span>
                <span style={{ fontSize: 11, color: 'var(--gold)' }}>Earnings</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Q3 2025 Results: $1.22B Cash, 6 Satellites Operational</div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline Section - CRCL Style */}
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Event Timeline</span>
        <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text3)' }}>({filteredEntries.length} events)</span>
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
            const count = timelineEvents.filter(p => detectTopics(p).includes(topic)).length;
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
            {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEntries.length} results
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div className="pills" style={{ marginBottom: 0 }}>
          <button className={`pill ${filterCategory === 'ALL' ? 'active' : ''}`} onClick={() => setFilterCategory('ALL')}>
            All ({timelineEvents.length})
          </button>
          {Object.entries(categoryColors).map(([cat, style]) => (
            <button key={cat} className={`pill ${filterCategory === cat ? 'active' : ''}`} onClick={() => setFilterCategory(cat)}>
              {style.label} ({timelineEvents.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>
        <button 
          className="pill"
          onClick={() => {
            if (expanded.size === filteredEntries.length) {
              setExpanded(new Set());
            } else {
              setExpanded(new Set(filteredEntries.map((_, i) => i)));
            }
          }}
          style={{ whiteSpace: 'nowrap' }}
        >
          {expanded.size === filteredEntries.length ? '⊟ Collapse All' : '⊞ Expand All'}
        </button>
      </div>

      <div>
        {filteredEntries.map((entry, i) => {
          const isExpanded = expanded.has(i);
          const toggleExpand = () => {
            const next = new Set(expanded);
            if (isExpanded) next.delete(i);
            else next.add(i);
            setExpanded(next);
          };
          const catClass = entry.category.toLowerCase();
          const verdictClass = entry.impact === 'Positive' ? 'positive' : entry.impact === 'Negative' ? 'negative' : 'neutral';
          
          return (
            <div key={i} className={`timeline-item ${isExpanded ? 'expanded' : ''}`}>
              <div className="timeline-header" onClick={toggleExpand}>
                <div className="t-date">{entry.date}</div>
                <div className={`t-cat ${catClass}`}>{entry.category}</div>
                <div className="t-event">{entry.title}</div>
                <div className={`t-verdict ${verdictClass}`}>
                  {entry.impact === 'Positive' && '↑'}
                  {entry.impact === 'Negative' && '↓'}
                  {entry.impact === 'Neutral' && '→'}
                  {entry.impact?.toLowerCase() || 'neutral'}
                </div>
                <div className="t-toggle">▼</div>
              </div>
              <div className="timeline-details">
                <div className="t-details-content">
                  <div className="t-details-text">
                    <p style={{ marginBottom: 12, color: 'var(--text2)' }}>{entry.summary}</p>
                    <ul>
                      {entry.details.map((detail, j) => (
                        <li key={j}>{detail}</li>
                      ))}
                    </ul>
                    {/* Topic Tags */}
                    {detectTopics(entry).length > 0 && (
                      <div className="t-topic-tags">
                        {detectTopics(entry).filter(topic => topicTags[topic]).map(topic => (
                          <span key={topic} className="t-topic-tag" style={{ background: topicTags[topic].color }}>
                            {topicTags[topic].label}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Change indicator */}
                    {entry.prevValue && (
                      <div style={{ marginTop: 12, fontSize: 13 }}>
                        <span style={{ color: '#f87171', textDecoration: 'line-through' }}>{entry.prevValue}</span>
                        <span style={{ color: 'var(--text3)', margin: '0 8px' }}>→</span>
                        <span style={{ color: '#4ade80' }}>{entry.newValue}</span>
                      </div>
                    )}
                  </div>
                  <div className="t-details-meta">
                    <div className="t-meta-item">
                      <div className="t-meta-label">Impact</div>
                      <div className={`t-meta-value ${verdictClass === 'positive' ? 'green' : verdictClass === 'negative' ? 'red' : ''}`}>
                        {entry.impact === 'Positive' && '● Bullish'}
                        {entry.impact === 'Negative' && '● Bearish'}
                        {entry.impact === 'Neutral' && '● Neutral'}
                        {!entry.impact && '● Unknown'}
                      </div>
                    </div>
                    <div className="t-meta-item">
                      <div className="t-meta-label">Sources</div>
                      <div className="t-meta-value cyan">{entry.sources.join(', ')}</div>
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
            <h4 className="text-cyan-400 font-medium mb-2">Categories Explained</h4>
            <ul className="space-y-2 text-slate-300">
              <li><span className="text-orange-400">Partnership:</span> Commercial agreements, MNO deals, government contracts</li>
              <li><span className="text-green-400">Product:</span> Satellite launches, tech milestones, deployments</li>
              <li><span className="text-pink-400">Regulatory:</span> FCC approvals, spectrum licenses, authorizations</li>
              <li><span className="text-emerald-400">Capital:</span> Equity offerings, convertible notes, financing</li>
              <li><span className="text-purple-400">Guidance:</span> Management projections, targets, timelines</li>
              <li><span className="text-teal-400">Earnings:</span> Quarterly results, SEC filings, business updates</li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-400 font-medium mb-2">Updating This Log</h4>
            <ul className="space-y-1 text-slate-300">
              <li>• Add new entries chronologically at the top</li>
              <li>• Include sources for traceability</li>
              <li>• Note prev → new values for comparisons</li>
              <li>• Tag impact: Positive/Negative/Neutral/Mixed</li>
            </ul>
          </div>
        </div>
      </div>
      
      <CFANotes title="CFA Level III — Timeline Analysis" items={[
        { term: 'Audit Trail', def: 'Chronological record of all guidance changes, data updates, and material events. Never delete historical entries.' },
        { term: 'Category Types', def: 'Guidance (management projections), Data (SEC verified), Event (catalysts). Filter by type for focused analysis.' },
        { term: 'Impact Assessment', def: 'Tag each update as Positive/Negative/Neutral/Mixed. Track sentiment changes over time.' },
        { term: 'Source Attribution', def: 'Every entry cites source (10-Q, PR, earnings call). Verify claims against original documents.' },
        { term: 'Supersession Tracking', def: 'When guidance changes, link new entry to old. Shows management accuracy and conservatism over time.' },
        { term: 'Correction Protocol', def: 'If data is wrong, add correction entry referencing original. Never modify history — append only.' },
      ]} />
    </div>
  );
};

const CompsTab = ({ calc, currentStockPrice }) => {
  const [competitorFilter, setCompetitorFilter] = useState<CompetitorId | 'all'>('all');
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // VALUATION COMPARABLES - Market metrics comparison
  // ═══════════════════════════════════════════════════════════════════════════
  const comps = [
    { name: 'ASTS', mc: calc.marketCap, evRev: calc.evToRevFwd, pSub: calc.pricePerSub, subs: calc.potentialSubs },
    { name: 'Starlink', mc: 175000, evRev: 17, pSub: 43750, subs: 4 },
    { name: 'Verizon', mc: 175000, evRev: 1.3, pSub: 1520, subs: 115 },
    { name: 'T-Mobile', mc: 280000, evRev: 3.4, pSub: 2240, subs: 125 },
    { name: 'AT&T', mc: 165000, evRev: 1.3, pSub: 1500, subs: 110 }
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR PROFILES - D2D/Satellite competitors to track
  // Update capabilities and status as new information emerges
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_PROFILES: CompetitorProfile[] = [
    {
      id: 'starlink-tmobile',
      name: 'Starlink / T-Mobile',
      description: 'SpaceX satellite constellation partnered with T-Mobile for direct-to-cell service',
      technology: 'Modified Starlink V2 satellites with cellular capability',
      currentStatus: 'Live with text messaging in beta, voice/data roadmap unclear',
      capabilities: { voice: false, text: true, data: false, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: 7000, coverage: 'Continental US (partial)', subscribers: 'Beta testing', funding: 'SpaceX backed' }
    },
    {
      id: 'lynk',
      name: 'Lynk Global',
      description: 'Direct-to-standard-phone satellite service, similar B2B model to ASTS',
      technology: 'Small satellites, limited bandwidth per satellite',
      currentStatus: 'Commercial agreements signed, limited coverage',
      capabilities: { voice: false, text: true, data: false, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: 10, coverage: 'Equatorial regions', subscribers: '<100K', funding: '$150M raised' }
    },
    {
      id: 'apple-globalstar',
      name: 'Apple / Globalstar',
      description: 'Emergency SOS service on iPhone 14+, expanding to messaging',
      technology: 'Globalstar constellation with Apple-designed modem',
      currentStatus: 'Emergency SOS live, expanding features',
      capabilities: { voice: false, text: true, data: false, video: false, unmodifiedPhones: false, globalCoverage: true },
      keyMetrics: { satellites: 24, coverage: 'Global (emergency)', subscribers: 'All iPhone 14+ users', funding: '$450M from Apple' }
    },
    {
      id: 'skylo',
      name: 'Skylo Technologies',
      description: 'NB-IoT satellite connectivity using existing GEO satellites',
      technology: 'Software-based, uses existing satellite infrastructure',
      currentStatus: 'Commercial, focused on IoT not consumer phones',
      capabilities: { voice: false, text: false, data: true, video: false, unmodifiedPhones: false, globalCoverage: true },
      keyMetrics: { satellites: 0, coverage: 'Global via partners', subscribers: 'IoT focused', funding: '$116M raised' }
    },
    {
      id: 'iridium',
      name: 'Iridium',
      description: 'Legacy satellite phone provider, potential D2D pivot',
      technology: 'LEO constellation, proprietary spectrum',
      currentStatus: 'Satellite phones only, D2D partnership discussions',
      capabilities: { voice: true, text: true, data: true, video: false, unmodifiedPhones: false, globalCoverage: true },
      keyMetrics: { satellites: 66, coverage: 'Global', subscribers: '2.1M', funding: 'Public (IRDM)' }
    },
    {
      id: 'amazon-kuiper',
      name: 'Amazon Kuiper',
      description: 'Amazon\'s satellite internet constellation, potential D2D threat',
      technology: 'LEO broadband constellation under development',
      currentStatus: 'First satellites launched 2023, D2D not announced',
      capabilities: { voice: false, text: false, data: false, video: false, unmodifiedPhones: false, globalCoverage: false },
      keyMetrics: { satellites: 2, coverage: 'Testing', subscribers: 'N/A', funding: '$10B committed' }
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR NEWS - Add new entries at TOP (newest first)
  // NEVER delete old entries - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_NEWS: CompetitorNewsEntry[] = [
    // ═══════════════════════════════════════════════════════════════════════════
    // ADD NEW COMPETITOR NEWS ENTRIES HERE (newest first)
    // Format:
    // {
    //   date: 'YYYY-MM-DD',
    //   competitor: 'starlink-tmobile' | 'lynk' | 'apple-globalstar' | 'skylo' | 'iridium' | 'amazon-kuiper' | 'other',
    //   category: 'Launch' | 'Partnership' | 'Technology' | 'Regulatory' | 'Financial' | 'Coverage' | 'Product',
    //   headline: 'Brief headline',
    //   details: ['Bullet point 1', 'Bullet point 2'],
    //   implication: 'positive' | 'neutral' | 'negative',  // for ASTS
    //   astsComparison: 'How this compares to ASTS',
    //   source: 'Source name',
    //   sourceUrl: 'https://...'
    // },
    // ═══════════════════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════════════════
    // OCEANIA CRUISES - STARLINK MARITIME (NCLH subsidiary)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2024-12-04',
      competitor: 'starlink-tmobile',
      category: 'Coverage',
      headline: 'Oceania Cruises completes Starlink installation across entire fleet',
      details: [
        'All 8 Oceania Cruises ships now Starlink-equipped',
        'Subsidiary of Norwegian Cruise Line Holdings (NCLH)',
        'Unlimited WiFi included in cruise fare ("Your World Included" promise)',
        'Two complimentary logins per stateroom',
        'Additional ships on order for 2027-2029',
        'World\'s leading culinary- and destination-focused cruise line'
      ],
      implication: 'neutral',
      astsComparison: 'Maritime connectivity market. Different from ASTS D2D cellular - cruise ships use dedicated Starlink terminals.',
      source: 'PR Newswire',
      sourceUrl: 'https://www.prnewswire.com/news-releases/oceania-cruises-completes-installation-of-starlink-internet-across-entire-fleet-302322123.html',
      storyId: 'nclh-starlink-maritime',
      storyTitle: 'Norwegian Cruise Line Holdings Starlink Maritime'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // WESTJET - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-01',
      competitor: 'starlink-tmobile',
      category: 'Coverage',
      headline: 'WestJet reaches 100th Starlink aircraft - world\'s largest 737 Starlink fleet',
      details: [
        'World\'s largest fleet of Boeing 737 Starlink-equipped aircraft',
        '100 Boeing 737s now equipped with Starlink',
        'Free for WestJet Rewards members ("WestJet Wi-Fi presented by TELUS")',
        'Partnership with TELUS (Canadian telecom)',
        'Rollout began February 2025',
        'Completing all 737-800 and 737-8 MAX by end of 2025',
        'Only airline in Canada offering Starlink on mainline fleet',
        'Also covers Sunwing (WestJet subsidiary)'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi. Different market from ASTS D2D cellular to unmodified phones.',
      source: 'WestJet',
      sourceUrl: 'https://www.westjet.com/en-ca/news/2025/westjet-wifi-100th-aircraft',
      storyId: 'westjet-starlink-aviation',
      storyTitle: 'WestJet Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ALASKA AIRLINES - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-08-20',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Alaska Airlines selects Starlink for entire fleet - free for loyal guests',
      details: [
        'Entire Alaska Airlines fleet to get Starlink (regional, narrowbody, widebody)',
        'Starting 2026, complete by 2027',
        'Building on Hawaiian Airlines\' lead (both part of Alaska Air Group)',
        'First U.S. airline with Starlink long-haul flights from Seattle',
        'Free for most loyal guests via exclusive partnership',
        'Latency <99ms, speeds up to 500 Mbps (7x faster than GEO satellite WiFi)',
        '8,000+ Starlink satellites in orbit',
        'Sustainability: lightest equipment, saves 800,000+ gallons fuel/year'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi with dedicated equipment. Different market from ASTS D2D cellular.',
      source: 'Alaska Airlines',
      sourceUrl: 'https://newsroom.alaskaair.com/alaska-airlines-selects-starlink',
      storyId: 'alaska-starlink-aviation',
      storyTitle: 'Alaska Airlines Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROYAL CARIBBEAN - STARLINK MARITIME
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2024-08-29',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Royal Caribbean extends Starlink to Juneau community - ship-to-shore pilot',
      details: [
        'Innovative ship-to-shore Starlink extension pilot program',
        'Free WiFi for locals, cruise guests, and businesses in downtown Juneau',
        'Partnership with Goldbelt Inc. (Alaska Native corporation)',
        'Addresses internet congestion during busy cruise days',
        'Installation at Goldbelt Tram Lower Terminal and Franklin Street businesses',
        'Peplink access points for seamless coverage between locations',
        'Pilot may expand to other cruise destinations'
      ],
      implication: 'neutral',
      astsComparison: 'Maritime/community connectivity. Different from ASTS D2D cellular service.',
      source: 'Royal Caribbean Group',
      sourceUrl: 'https://www.royalcaribbeangroup.com/news/royal-caribbean-group-debuts-free-starlink-juneau/',
      storyId: 'royal-caribbean-starlink-maritime',
      storyTitle: 'Royal Caribbean Starlink Maritime'
    },
    {
      date: '2022-08-30',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Royal Caribbean becomes first cruise line to adopt Starlink fleet-wide',
      details: [
        'First in cruise industry to adopt Starlink fleet-wide',
        'Covers 3 brands: Royal Caribbean International, Celebrity Cruises, Silversea Cruises',
        'Plus all new vessels for each brand',
        'Trial on Freedom of the Seas with positive feedback',
        '"Biggest public deployment of Starlink in travel industry" at the time',
        'Installation completed by Q1 2023',
        '68 ships across portfolio'
      ],
      implication: 'neutral',
      astsComparison: 'Maritime connectivity market - cruise industry pioneer. Different from ASTS D2D cellular.',
      source: 'Royal Caribbean Group',
      sourceUrl: 'https://www.royalcaribbeangroup.com/news/royal-caribbean-group-spacex-starlink/',
      storyId: 'royal-caribbean-starlink-maritime',
      storyTitle: 'Royal Caribbean Starlink Maritime'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CARNIVAL CORPORATION - STARLINK MARITIME
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2024-05-14',
      competitor: 'starlink-tmobile',
      category: 'Coverage',
      headline: 'Carnival Corporation completes Starlink rollout across 90+ ship global fleet',
      details: [
        'World\'s largest cruise company - 100% of 90+ ships now Starlink-equipped',
        'Rollout began December 2022',
        'Covers 9 cruise brands: Carnival Cruise Line, Princess Cruises, Holland America Line, Costa Cruises, Cunard, P&O Cruises (UK & Australia), AIDA Cruises, Seabourn',
        'Part of multi-provider strategy - quadrupled fleetwide bandwidth since 2019',
        '800+ ports worldwide coverage',
        'Benefits guests, crew connectivity, and operational systems'
      ],
      implication: 'neutral',
      astsComparison: 'Maritime connectivity market. Different from ASTS D2D cellular to unmodified phones.',
      source: 'PR Newswire',
      sourceUrl: 'https://www.prnewswire.com/news-releases/carnival-corporation-rolls-out-spacexs-innovative-starlink-across-entire-global-fleet-302144123.html',
      storyId: 'carnival-starlink-maritime',
      storyTitle: 'Carnival Corporation Starlink Maritime'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // NORWEGIAN CRUISE LINE HOLDINGS - STARLINK MARITIME
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2023-04-06',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Norwegian Cruise Line Holdings to offer Starlink across fleet',
      details: [
        'NCLH covers 3 brands: Norwegian Cruise Line, Oceania Cruises, Regent Seven Seas Cruises',
        'Testing began on Norwegian Breakaway',
        'Phased rollout across entire fleet',
        'Target: 7 additional vessels by end of 2023',
        'Including new ships: Oceania\'s Vista, Norwegian Viva, Regent\'s Seven Seas Grandeur',
        'Benefits guests, crew, and ship-to-shore operations'
      ],
      implication: 'neutral',
      astsComparison: 'Maritime connectivity market. Different from ASTS D2D cellular service.',
      source: 'Norwegian Cruise Line Holdings',
      sourceUrl: 'https://www.nclhltd.com/news-releases/norwegian-cruise-line-holdings-starlink',
      storyId: 'nclh-starlink-maritime',
      storyTitle: 'Norwegian Cruise Line Holdings Starlink Maritime'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ZIPAIR - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2023-01-31',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'ZIPAIR becomes first airline in Asia to select Starlink',
      details: [
        'First airline in Asia to work with SpaceX Starlink',
        'Japan Airlines subsidiary (100% JAL-owned)',
        'Japan\'s first international LCC (low-cost carrier)',
        'Routes: Narita → Seoul, Bangkok, Singapore, Honolulu, Los Angeles, San Jose',
        'At time of announcement: engineering review and regulatory certification in progress',
        'Seamless high-speed, low-latency connectivity for all passengers'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi. Asian pioneer - different market from ASTS D2D cellular.',
      source: 'ZIPAIR Tokyo',
      sourceUrl: 'https://www.zip-air.net/en/news/2023/starlink.html',
      storyId: 'zipair-starlink-aviation',
      storyTitle: 'ZIPAIR Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KOREAN AIR / HANJIN GROUP - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-11',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Korean Air, Hanjin Group Airlines select Starlink for fleetwide in-flight Wi-Fi',
      details: [
        'All five Hanjin Group airlines to deploy Starlink: Korean Air, Asiana Airlines, Jin Air, Air Busan, Air Seoul',
        'Installation and testing begins late 2025, passenger service expected Q3 2026',
        'Korean Air and Asiana prioritizing long-haul Boeing 777-300ER and Airbus A350-900 first',
        'Complete Starlink installation across combined mainline fleet by end of 2027',
        'Jin Air starting with Boeing 737-8 fleet',
        'Connectivity positioned as "core infrastructure" rather than afterthought',
        'Part of broader industry shift toward LEO satellite connectivity'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi market. Different from ASTS D2D cellular to unmodified phones on ground.',
      source: 'Paxex.Aero',
      sourceUrl: 'https://paxex.aero/2025/12/korean-air-hanjin-group-starlink/',
      storyId: 'korean-air-starlink-aviation',
      storyTitle: 'Korean Air / Hanjin Group Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // EMIRATES - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-11-18',
      competitor: 'starlink-tmobile',
      category: 'Technology',
      headline: 'Emirates retrofit programme: 111 aircraft with Starlink and next-gen cabin',
      details: [
        'Next phase: 60 A380s and 51 Boeing 777s set for retrofit starting August 2026',
        'Starlink connectivity installed concurrently with cabin retrofit programme',
        'Partners: Airbus, Safran, Recaro, Panasonic, Starlink, UUDS',
        'Panasonic Astrova IFE with 4K OLED HDR10+ displays and Spatial Audio',
        'Total retrofit programme expanded to 219 aircraft',
        '76 aircraft already refurbished, two completed per month',
        'Fleet-wide product consistency strategy across all routes'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi integrated with cabin modernization. Different market from ASTS D2D phone service.',
      source: 'Emirates Media Centre',
      sourceUrl: 'https://www.emirates.com/media-centre/emirates-to-roll-out-next-phase-of-fleet-retrofit-programme/',
      storyId: 'emirates-starlink-aviation',
      storyTitle: 'Emirates Starlink Aviation'
    },
    {
      date: '2025-11-17',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Emirates to operate world\'s largest Starlink-enabled international widebody fleet',
      details: [
        '232 aircraft (Boeing 777 and A380 fleet) to be equipped with Starlink',
        'World\'s largest Starlink-enabled international wide-body fleet',
        'Free service for all customers across all cabin classes',
        'First commercial flight: November 23, 2025 on Boeing 777-300ER',
        'World\'s first Starlink-equipped A380 starting February 2026',
        'Complete rollout by mid-2027, installation rate ~14 aircraft per month',
        'Two antennae per 777, three per A380 (industry first)',
        'Live TV over Starlink from late December 2025'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi with dedicated equipment. Different market from ASTS D2D cellular to unmodified phones.',
      source: 'Emirates Media Centre',
      sourceUrl: 'https://www.emirates.com/media-centre/emirates-starlink-announcement/',
      storyId: 'emirates-starlink-aviation',
      storyTitle: 'Emirates Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LUFTHANSA GROUP - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-14',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Lufthansa Group selects Starlink for 850-aircraft fleet',
      details: [
        'Largest European airline group to adopt Starlink for in-flight WiFi',
        'All 850 aircraft to be equipped by 2029, rollout starts H2 2026',
        'Covers Lufthansa, SWISS, Austrian, Brussels Airlines, ITA Airways, Eurowings, Air Dolomiti, Edelweiss',
        'Free for Miles & More Travel ID users (free to register)',
        'Enables streaming, cloud-based work, high-speed applications in-flight',
        'Joins United, Qatar, Air France, Emirates, Virgin Atlantic, IAG on Starlink aviation'
      ],
      implication: 'neutral',
      astsComparison: 'Different market: Starlink aviation = in-flight WiFi with dedicated equipment. ASTS = direct-to-phone cellular on ground. No overlap.',
      source: 'Lufthansa Group Newsroom',
      sourceUrl: 'https://newsroom.lufthansagroup.com/en/new-lufthansa-group-collaboration-with-starlink-high-speed-internet-on-all-fleets-across-all-airlines/',
      storyId: 'lufthansa-starlink-aviation',
      storyTitle: 'Lufthansa Group Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // QATAR AIRWAYS - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-08',
      competitor: 'starlink-tmobile',
      category: 'Technology',
      headline: 'World\'s first Starlink-equipped Boeing 787-8, A350 fleet complete',
      details: [
        'First airline globally to enable Starlink on Boeing 787-8 Dreamliner',
        'Entire Airbus A350 fleet now Starlink-equipped (completed in record 8 months)',
        'Nearly 120 widebody aircraft with Starlink (58% of widebody fleet)',
        'Three Starlink-enabled 787 Dreamliners now operational',
        '10M+ passengers used Qatar Starlink - nearly half of all 21M global Starlink airline passengers',
        '500 Mbps speeds, free gate-to-gate WiFi',
        'Operational benefits: real-time crew updates, IFE monitoring, faster turnarounds'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi with dedicated equipment. Different market from ASTS D2D cellular to unmodified phones on ground.',
      source: 'Aviation A2Z',
      sourceUrl: 'https://aviationa2z.com/index.php/2026/01/08/qatar-airways-first-starlink-equipped-boeing-787/',
      storyId: 'qatar-starlink-aviation',
      storyTitle: 'Qatar Airways Starlink Aviation'
    },
    {
      date: '2025-11-16',
      competitor: 'starlink-tmobile',
      category: 'Coverage',
      headline: '100+ Starlink-equipped widebody aircraft milestone',
      details: [
        'Over 100 widebody aircraft now equipped with Starlink',
        'More than 50% of widebody fleet Starlink-connected',
        'Over 30,000 flights operated with Starlink connectivity',
        'Only carrier in MENA region offering Starlink',
        'Boeing 777 rollout complete, A350 rollout in progress',
        'Up to 200 daily Starlink-connected flights',
        'Speeds faster than many home Wi-Fi services'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi market expansion. No overlap with ASTS D2D phone service.',
      source: 'Qatar News Agency',
      sourceUrl: 'https://qna.org.qa/en/news/news-details?id=qatar-airways-sets-new-benchmark-with-over-100-starlink-enabled-widebody-aircraft&date=16/11/2025',
      storyId: 'qatar-starlink-aviation',
      storyTitle: 'Qatar Airways Starlink Aviation'
    },
    {
      date: '2024-10-01',
      competitor: 'starlink-tmobile',
      category: 'Launch',
      headline: 'Qatar Airways launches first Starlink-equipped flights',
      details: [
        'First airline to offer Starlink on widebody aircraft',
        'Service launched with free gate-to-gate high-speed WiFi',
        'Initial rollout on Boeing 777 fleet',
        'Global launch customer for Starlink aviation on widebodies'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation WiFi launch - different market from ASTS ground-based D2D cellular.',
      source: 'Future Travel Experience',
      sourceUrl: 'https://www.futuretravelexperience.com/2026/01/qatar-airways-launches-worlds-first-starlink-equipped-boeing-787-and-completes-airbus-a350-starlink-rollout/',
      storyId: 'qatar-starlink-aviation',
      storyTitle: 'Qatar Airways Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // AIR NEW ZEALAND - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-06-10',
      competitor: 'starlink-tmobile',
      category: 'Launch',
      headline: 'Air New Zealand begins Starlink Wi-Fi trial on domestic aircraft',
      details: [
        'Trial launched June 10, 2025 on Airbus A320 (ZK-OXE)',
        'Global first: First airline to trial Wi-Fi on a turboprop aircraft (ATR)',
        'ATR turboprop joining trial later in June 2025',
        'Free Wi-Fi during trial period',
        'Currently in test phase, gathering customer feedback',
        'Results will guide decision on domestic fleet rollout',
        'Passengers can stream, work on live documents, browse social media'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi trial on regional/domestic aircraft. Different market from ASTS D2D phone service.',
      source: 'Air New Zealand',
      sourceUrl: 'https://www.airnewzealand.co.nz/press-release-2025-onboard-starlink-wifi-trial',
      storyId: 'airnz-starlink-aviation',
      storyTitle: 'Air New Zealand Starlink Aviation'
    },
    {
      date: '2023-12-13',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'Air New Zealand partners with Starlink to redefine domestic travel connectivity',
      details: [
        'Partnership announced for free internet on domestic aircraft',
        'First Starlink install on a domestic jet planned for 2025',
        'World first: Starlink installation on ATR turboprop aircraft',
        'Latency as low as 30ms for streaming and real-time applications',
        'Initial 4-6 month trial period planned',
        'Already offers free Wi-Fi on international flights',
        'Focus on New Zealand domestic market ("Aotearoa")'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi targeting regional/domestic aircraft. Different market from ASTS ground-based D2D.',
      source: 'Air New Zealand',
      sourceUrl: 'https://www.airnewzealand.co.nz/press-release-2023-starlink-connectivity',
      storyId: 'airnz-starlink-aviation',
      storyTitle: 'Air New Zealand Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // UNITED AIRLINES - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2024-09-13',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'United signs industry\'s largest Starlink deal: 1,000+ aircraft, free Wi-Fi',
      details: [
        'Industry\'s largest agreement: 1,000+ mainline and regional aircraft',
        'Service will be free for all passengers',
        'Gate-to-gate connectivity with high-speed, low-latency internet',
        'Testing begins early 2025, passenger flights expected later that year',
        'Coverage over oceans, polar regions, and remote areas',
        'Largest airline across both Atlantic and Pacific to adopt Starlink',
        'First carrier to commit to offering Starlink at this scale',
        'Enables streaming, gaming, video calls, and real-time productivity'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi with dedicated equipment. Different market from ASTS D2D cellular to unmodified phones on ground.',
      source: 'United Airlines PR',
      sourceUrl: 'https://www.prnewswire.com/news-releases/the-inflight-wi-fi-revolution-now-arriving-united-signs-starlink-deal-302247925.html',
      storyId: 'united-starlink-aviation',
      storyTitle: 'United Airlines Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HAWAIIAN AIRLINES - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2024-09-24',
      competitor: 'starlink-tmobile',
      category: 'Coverage',
      headline: 'Hawaiian Airlines completes Starlink installation across entire Airbus fleet',
      details: [
        'First major U.S. carrier to debut Starlink (February 2024 on A321neo)',
        'Completed installation across all 24-plane A330 fleet',
        'Free high-speed, low-latency Wi-Fi for all guests',
        'Will also install on Boeing 787-9 flagship fleet',
        'Not deploying on Boeing 717 (short inter-island flights)',
        'Now part of Alaska Air Group (ALK)',
        'Starlink performing well across remote Pacific Ocean routes',
        'Internet speeds suitable for working, streaming, and gaming'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi. Different market from ASTS D2D phone service - Pacific routes benefit from Starlink ocean coverage.',
      source: 'Hawaiian Airlines',
      sourceUrl: 'https://newsroom.hawaiianairlines.com/releases/hawaiian-airlines-now-offering-fast-and-free-starlink-wi-fi',
      storyId: 'hawaiian-starlink-aviation',
      storyTitle: 'Hawaiian Airlines Starlink Aviation'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // AIRBALTIC - STARLINK AVIATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2023-01-10',
      competitor: 'starlink-tmobile',
      category: 'Partnership',
      headline: 'airBaltic becomes first European airline to implement Starlink fleetwide',
      details: [
        'First European airline to implement Starlink fleet-wide',
        'Entire Airbus A220-300 fleet (39 aircraft) to be equipped',
        'Free, high-speed internet for all passengers',
        'No login pages - internet works from moment passengers board',
        'Up to 350 Mbps speeds, latency as low as 20ms',
        'Latvian state-owned airline (97.96% government stake)',
        'Installation began in 2023',
        'Setting new standard for European in-flight connectivity'
      ],
      implication: 'neutral',
      astsComparison: 'Aviation in-flight WiFi. Early European Starlink aviation adopter - different market from ASTS D2D cellular.',
      source: 'airBaltic',
      sourceUrl: 'https://www.airbaltic.com/en/airbaltic-starlink-announcement',
      storyId: 'airbaltic-starlink-aviation',
      storyTitle: 'airBaltic Starlink Aviation'
    }
  ];

  // Filter news by competitor
  const filteredNews = competitorFilter === 'all'
    ? COMPETITOR_NEWS
    : COMPETITOR_NEWS.filter(n => n.competitor === competitorFilter);

  // Group news by storyId, with ungrouped items in their own "group"
  const groupedNews = React.useMemo(() => {
    const groups: Record<string, { title: string; entries: (CompetitorNewsEntry & { originalIdx: number })[] }> = {};

    filteredNews.forEach((news, idx) => {
      const storyKey = news.storyId || `ungrouped-${idx}`;
      if (!groups[storyKey]) {
        groups[storyKey] = {
          title: news.storyTitle || news.headline,
          entries: []
        };
      }
      groups[storyKey].entries.push({ ...news, originalIdx: idx });
    });

    // Sort entries within each group chronologically (oldest first for timeline progression)
    Object.values(groups).forEach(group => {
      group.entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    // Convert to array and sort groups by most recent entry (newest story first)
    return Object.entries(groups)
      .map(([storyId, group]) => ({
        storyId,
        title: group.title,
        entries: group.entries,
        latestDate: group.entries[group.entries.length - 1]?.date || ''
      }))
      .sort((a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime());
  }, [filteredNews]);

  // Get competitor display name
  const getCompetitorName = (id: CompetitorId): string => {
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };

  // Implication styling
  const getImplicationStyle = (impl: ASTSImplication) => {
    switch (impl) {
      case 'positive': return { bg: 'rgba(126,231,135,0.15)', color: '#7EE787', label: '✓ Good for ASTS' };
      case 'negative': return { bg: 'rgba(255,123,114,0.15)', color: '#FF7B72', label: '⚠ Threat to ASTS' };
      default: return { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', label: '○ Neutral' };
    }
  };

  // Category styling
  const getCategoryStyle = (cat: CompetitorNewsCategory) => {
    const styles: Record<CompetitorNewsCategory, { bg: string; color: string }> = {
      'Launch': { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
      'Partnership': { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
      'Technology': { bg: 'rgba(168,85,247,0.15)', color: '#c084fc' },
      'Regulatory': { bg: 'rgba(234,179,8,0.15)', color: '#facc15' },
      'Financial': { bg: 'rgba(34,211,238,0.15)', color: '#22d3ee' },
      'Coverage': { bg: 'rgba(249,115,22,0.15)', color: '#fb923c' },
      'Product': { bg: 'rgba(236,72,153,0.15)', color: '#f472b6' },
    };
    return styles[cat] || { bg: 'var(--surface3)', color: 'var(--text3)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head">Comparables & Competitor Intelligence</h2>

      {/* Valuation Comparables Section */}
      <div className="highlight"><h3>📊 Valuation Comparables</h3><p className="text-sm text-slate-400">No direct comps. Starlink ~$175B private, D2C model. Telcos 1-3x rev, mature.</p></div>

      <div className="card">
        <div className="card-title">Market Comparison</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Company</th>
              <th className="text-right">Mkt Cap</th>
              <th className="text-right">EV/Rev</th>
              <th className="text-right">$/Sub</th>
              <th className="text-right">Subs</th>
            </tr>
          </thead>
          <tbody>
            {comps.map(c => (
              <tr key={c.name} className={`border-t border-slate-800 ${c.name === 'ASTS' ? 'bg-cyan-900/20' : ''}`}>
                <td className="py-2">{c.name}</td>
                <td className="py-2 text-right">${(c.mc / 1000).toFixed(0)}B</td>
                <td className="py-2 text-right">{c.evRev.toFixed(1)}x</td>
                <td className="py-2 text-right">${c.pSub.toLocaleString()}</td>
                <td className="py-2 text-right">{c.subs.toFixed(0)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title">EV/Rev Comparison</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={comps} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--text3)" />
              <YAxis dataKey="name" type="category" stroke="var(--text3)" width={60} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} />
              <Bar dataKey="evRev" fill="var(--cyan)">
                {comps.map((e, i) => (<Cell key={i} fill={e.name === 'ASTS' ? '#06b6d4' : '#475569'} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">$/Subscriber Comparison</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={comps} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--text3)" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <YAxis dataKey="name" type="category" stroke="var(--text3)" width={60} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} />
              <Bar dataKey="pSub" fill="var(--violet)">
                {comps.map((e, i) => (<Cell key={i} fill={e.name === 'ASTS' ? '#8b5cf6' : '#475569'} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* D2D Competitor Capability Matrix */}
      <div className="highlight"><h3>🛰️ D2D Competitor Capabilities</h3><p className="text-sm text-slate-400">Direct-to-device competitors and their current capabilities vs ASTS</p></div>

      <div className="card">
        <div className="card-title">Capability Comparison</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-700">
              <th className="text-left py-2">Competitor</th>
              <th className="text-center">Voice</th>
              <th className="text-center">Text</th>
              <th className="text-center">Data</th>
              <th className="text-center">Video</th>
              <th className="text-center">Unmod. Phones</th>
              <th className="text-center">Global</th>
              <th className="text-right">Satellites</th>
            </tr>
          </thead>
          <tbody>
            {/* ASTS Row - highlighted */}
            <tr className="border-t border-slate-800 bg-cyan-900/20">
              <td className="py-2 font-semibold text-cyan-400">ASTS SpaceMobile</td>
              <td className="py-2 text-center text-green-400">✓</td>
              <td className="py-2 text-center text-green-400">✓</td>
              <td className="py-2 text-center text-green-400">✓</td>
              <td className="py-2 text-center text-green-400">✓</td>
              <td className="py-2 text-center text-green-400">✓</td>
              <td className="py-2 text-center text-yellow-400">Building</td>
              <td className="py-2 text-right text-cyan-400">6+</td>
            </tr>
            {/* Competitor Rows */}
            {COMPETITOR_PROFILES.map(comp => (
              <tr key={comp.id} className="border-t border-slate-800">
                <td className="py-2">{comp.name}</td>
                <td className="py-2 text-center">{comp.capabilities.voice ? <span className="text-green-400">✓</span> : <span className="text-slate-600">✗</span>}</td>
                <td className="py-2 text-center">{comp.capabilities.text ? <span className="text-green-400">✓</span> : <span className="text-slate-600">✗</span>}</td>
                <td className="py-2 text-center">{comp.capabilities.data ? <span className="text-green-400">✓</span> : <span className="text-slate-600">✗</span>}</td>
                <td className="py-2 text-center">{comp.capabilities.video ? <span className="text-green-400">✓</span> : <span className="text-slate-600">✗</span>}</td>
                <td className="py-2 text-center">{comp.capabilities.unmodifiedPhones ? <span className="text-green-400">✓</span> : <span className="text-slate-600">✗</span>}</td>
                <td className="py-2 text-center">{comp.capabilities.globalCoverage ? <span className="text-green-400">✓</span> : <span className="text-slate-600">✗</span>}</td>
                <td className="py-2 text-right text-slate-400">{comp.keyMetrics?.satellites || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Competitor News Intelligence Section */}
      <div className="highlight">
        <h3>📰 Competitor News Intelligence</h3>
        <p className="text-sm text-slate-400">Track competitor developments to assess ASTS competitive position</p>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span className="text-xs text-slate-400 uppercase tracking-wider">Filter:</span>
          <button
            onClick={() => setCompetitorFilter('all')}
            className={`nav-btn ${competitorFilter === 'all' ? 'active' : ''}`}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            All ({COMPETITOR_NEWS.length})
          </button>
          {COMPETITOR_PROFILES.map(comp => {
            const count = COMPETITOR_NEWS.filter(n => n.competitor === comp.id).length;
            if (count === 0) return null;
            return (
              <button
                key={comp.id}
                onClick={() => setCompetitorFilter(comp.id)}
                className={`nav-btn ${competitorFilter === comp.id ? 'active' : ''}`}
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                {comp.name.split('/')[0].trim()} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* News Timeline - Grouped by Story */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {groupedNews.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <p className="text-slate-400">No competitor news yet. Add entries to COMPETITOR_NEWS array.</p>
          </div>
        ) : (
          groupedNews.map((story) => (
            <div key={story.storyId} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Story Header */}
              <div style={{
                padding: '16px 20px',
                background: 'var(--surface2)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{story.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
                    {story.entries.length} update{story.entries.length !== 1 ? 's' : ''} • {story.entries[0]?.date} → {story.entries[story.entries.length - 1]?.date}
                  </div>
                </div>
                <span style={{
                  fontSize: '10px',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: 'var(--surface3)',
                  color: 'var(--text2)',
                  fontWeight: 600
                }}>
                  {getCompetitorName(story.entries[0]?.competitor).split('/')[0].trim()}
                </span>
              </div>

              {/* Story Entries - Chronological */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {story.entries.map((news, entryIdx) => {
                  const implStyle = getImplicationStyle(news.implication);
                  const catStyle = getCategoryStyle(news.category);
                  const expandKey = `${story.storyId}-${entryIdx}`;
                  const isExpanded = expandedNews === expandKey;

                  return (
                    <div
                      key={entryIdx}
                      style={{
                        borderBottom: entryIdx < story.entries.length - 1 ? '1px solid var(--border)' : 'none',
                        background: isExpanded ? 'var(--surface2)' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div
                        onClick={() => setExpandedNews(isExpanded ? null : expandKey)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '90px 100px 1fr auto auto',
                          gap: 12,
                          padding: '14px 20px',
                          cursor: 'pointer',
                          alignItems: 'center'
                        }}
                      >
                        {/* Date */}
                        <span className="t-date" style={{ fontSize: 12 }}>{news.date}</span>

                        {/* Category */}
                        <span
                          style={{
                            fontSize: '9px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: catStyle.bg,
                            color: catStyle.color,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {news.category}
                        </span>

                        {/* Headline */}
                        <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{news.headline}</span>

                        {/* Implication Badge */}
                        <span
                          style={{
                            fontSize: '9px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: implStyle.bg,
                            color: implStyle.color,
                            fontWeight: 600
                          }}
                        >
                          {news.implication === 'positive' ? '✓' : news.implication === 'negative' ? '⚠' : '○'}
                        </span>

                        {/* Toggle */}
                        <span style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: isExpanded ? 'var(--cyan)' : 'var(--surface3)',
                          color: isExpanded ? 'var(--bg)' : 'var(--text3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          transition: 'all 0.2s'
                        }}>
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div style={{ padding: '0 20px 16px 20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20 }}>
                            <div>
                              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                                {news.details.map((d, i) => (
                                  <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: 'var(--text2)' }}>
                                    <span style={{ color: 'var(--cyan)' }}>•</span>
                                    {d}
                                  </li>
                                ))}
                              </ul>
                              {news.astsComparison && (
                                <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--cyan-dim)', borderRadius: 6, borderLeft: '3px solid var(--cyan)' }}>
                                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--cyan)', marginBottom: 4 }}>
                                    ASTS Comparison
                                  </div>
                                  <div style={{ fontSize: 13, color: 'var(--text)' }}>{news.astsComparison}</div>
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
                              <div style={{ background: 'var(--surface3)', padding: '8px 12px', borderRadius: 6 }}>
                                <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2 }}>Impact</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: implStyle.color }}>
                                  {news.implication === 'positive' ? 'Favorable' : news.implication === 'negative' ? 'Threat' : 'Neutral'}
                                </div>
                              </div>
                              {news.source && (
                                <div style={{ background: 'var(--surface3)', padding: '8px 12px', borderRadius: 6 }}>
                                  <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2 }}>Source</div>
                                  <div style={{ fontSize: 11 }}>
                                    {news.sourceUrl ? (
                                      <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)' }}>
                                        {news.source} ↗
                                      </a>
                                    ) : news.source}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Competitor Profiles (Collapsible) */}
      <div className="card">
        <div className="card-title">📋 Competitor Profiles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {COMPETITOR_PROFILES.map(comp => (
            <div key={comp.id} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{comp.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{comp.description}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginTop: 12 }}>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2 }}>Technology</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.technology}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2 }}>Status</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.currentStatus}</div>
                </div>
                {comp.keyMetrics?.coverage && (
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2 }}>Coverage</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.keyMetrics.coverage}</div>
                  </div>
                )}
                {comp.keyMetrics?.funding && (
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2 }}>Funding</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.keyMetrics.funding}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CFANotes title="CFA Level III — Competitive Analysis" items={[
        { term: 'No Direct Comps', def: 'ASTS is unique — space-based D2C cellular. Starlink (D2C satellite) and telcos (terrestrial) are imperfect proxies.' },
        { term: 'Competitive Moat', def: 'Track competitor progress to assess durability of ASTS technology lead. 4+ year head start but competitors catching up.' },
        { term: 'Capability Gap', def: 'ASTS offers voice/text/data/video. Competitors mostly text-only. Gap may narrow over time.' },
        { term: 'News Sentiment', def: 'Positive = validates market, neutral = expected progress, negative = direct competitive threat.' },
        { term: 'Market Expansion', def: 'Competitor activity can grow the overall D2D market, benefiting all players including ASTS.' },
        { term: 'Partnership Watch', def: 'Monitor competitor MNO deals. Exclusive deals can lock out markets; non-exclusive validates demand.' },
      ]} />
    </div>
  );
};

// FINANCIALS TAB - Standalone tab for historical quarterly metrics
// ============================================================================
// INVESTMENT TAB - Visual Investment Analysis
// Updated after each PR/SEC filing - MUST MAINTAIN ARCHIVE
// ============================================================================
// 
// ⚠️  UPDATE CHECKLIST AFTER EACH PR/SEC FILING:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. lastUpdate & lastFiling - Change date and filing reference
// 2. executiveSummary - Update headline, thesis, keyPoint, verdict
// 3. scorecard - Re-evaluate all 6 scores (0-100)
// 4. growthDrivers - Update status, progress %, descriptions
// 5. moatFactors - Adjust strength scores if competitive position changed
// 6. predictions - Update timeframes and confidence levels
// 7. archive - ADD NEW ENTRY AT TOP with full details:
//    { date, filing, verdict, headline, summary, keyDevelopments[], 
//      whyItMatters, lookingAhead }
// 8. Risk Assessment - Re-evaluate probabilities and impacts
// 9. Strategy section - Update price targets and recommendations
//
// NEVER DELETE ARCHIVE ENTRIES - This is the historical record!
// ============================================================================
const InvestmentTab = () => {
  const [investmentSections, setInvestmentSections] = useState(new Set(['summary', 'scorecard']));
  const [expandedArchive, setExpandedArchive] = useState(null);
  
  const toggleSection = (section) => {
    const next = new Set(investmentSections);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    setInvestmentSections(next);
  };
  
  const expandAll = () => setInvestmentSections(new Set(['summary', 'scorecard', 'growth', 'moat', 'risks', 'strategic-assessment', 'position', 'archive']));
  const collapseAll = () => setInvestmentSections(new Set(['summary']));
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CURRENT ASSESSMENT - UPDATE THIS OBJECT AFTER EACH FILING
  // All current investment data consolidated here (unified with BMNR/CRCL)
  // ═══════════════════════════════════════════════════════════════════════════
  const current = {
    date: '2025-11-10',
    source: 'Q3 2025 10-Q',
    verdict: 'CONSTRUCTIVE',
    verdictColor: 'mint',
    tagline: "Technology Proven. Now It's About Execution.",
    
    // Investment Scorecard (letter grades)
    scorecard: [
      { category: 'Technology Validation', rating: 'A', color: 'var(--mint)', detail: 'Block 1 operational, ASIC proven at 10 GHz' },
      { category: 'Financial Strength', rating: 'A-', color: 'var(--mint)', detail: '$760M cash, runway to profitability' },
      { category: 'Competitive Position', rating: 'A-', color: 'var(--mint)', detail: '3,000+ patents, licensed spectrum, 4yr lead' },
      { category: 'Execution Progress', rating: 'B+', color: 'var(--sky)', detail: '6 sats/month target, 40+ in production' },
      { category: 'MNO Partnerships', rating: 'B+', color: 'var(--sky)', detail: '6 signed, 50+ in pipeline' },
      { category: 'Market Timing', rating: 'B', color: 'var(--sky)', detail: 'First mover but competition emerging' },
      { category: 'Regulatory Risk', rating: 'B', color: 'var(--sky)', detail: 'FCC approved, international pending' },
      { category: 'Dilution Risk', rating: 'B-', color: 'var(--gold)', detail: '$707M converts, potential future raises' },
    ],
    
    // Executive Summary
    executiveSummary: {
      headline: "Technology Proven. Now It's About Execution.",
      thesis: "ASTS has crossed the Rubicon. The technology works. Block 1 satellites are beaming real broadband to real phones. The only question now: can they build and launch fast enough?",
      keyPoint: "This is no longer a science experiment. It's an industrial scaling challenge—and they're winning.",
      whatsNew: [
        '$1B+ contracted revenue milestone reached',
        'BB6 launched successfully with fleet operational',
        'Verizon definitive agreement signed',
        'Vodafone SatCo JV announced for European expansion'
      ],
    },
    
    // Growth Drivers
    growthDrivers: [
      { driver: 'Constellation Buildout', impact: 'Critical', description: 'Manufacturing 6 satellites per month. 40+ in production. Each launch expands coverage and revenue potential.', color: 'var(--mint)' },
      { driver: 'MNO Partnerships', impact: 'High', description: 'Six carriers signed. Fifty more in pipeline. Every new deal multiplies the addressable market.', color: 'var(--mint)' },
      { driver: 'Geographic Expansion', impact: 'High', description: 'US coverage first. Europe, India, Middle East following. 5 billion people without reliable coverage waiting.', color: 'var(--sky)' },
      { driver: 'Government Contracts', impact: 'Medium', description: 'Eight contracts secured. Defense and civilian agencies see strategic value. Program of record potential.', color: 'var(--sky)' },
    ],
    
    // Competitive Moat
    moatSources: [
      { source: 'Spectrum Holdings', strength: 'Strong', detail: 'More licensed spectrum than any competitor. L-Band and S-Band secured.', color: 'var(--mint)' },
      { source: 'Patent Portfolio', strength: 'Strong', detail: '3,000+ patents protecting core technology. Defensible IP position.', color: 'var(--mint)' },
      { source: 'Manufacturing Scale', strength: 'Strong', detail: '95% vertical integration, 6 sats/month capacity. Hard to replicate.', color: 'var(--mint)' },
      { source: 'Technology Lead', strength: 'Strong', detail: 'Custom ASIC, 4+ year head start. Proven at commercial scale.', color: 'var(--mint)' },
      { source: 'Carrier Relationships', strength: 'Building', detail: 'Exclusive deals with major MNOs. Network effects growing.', color: 'var(--sky)' },
    ],
    moatThreats: [
      { threat: 'Starlink/T-Mobile', risk: 'High', detail: 'Expanding beyond messaging. Musk has resources and execution ability.', color: 'var(--coral)' },
      { threat: 'Lynk Global', risk: 'Medium', detail: 'Pursuing similar D2D approach. Less capitalized but moving fast.', color: 'var(--gold)' },
      { threat: 'Apple/Globalstar', risk: 'Medium', detail: 'Emergency SOS expanding. Could evolve to broader services.', color: 'var(--gold)' },
      { threat: 'Skylo', risk: 'Low', detail: 'NB-IoT focused, different market segment.', color: 'var(--mint)' },
    ],
    
    // Risk Matrix
    risks: [
      { risk: 'Launch Failure', severity: 'Critical', likelihood: 'Low', impact: 'Severe', detail: 'A single catastrophic launch failure could delay the entire constellation by 6-12 months and destroy hundreds of millions in hardware. SpaceX has a good track record, but space is unforgiving.', mitigation: 'Multiple launch providers (SpaceX, ISRO), insurance coverage, phased deployment.' },
      { risk: 'Revenue Disappointment', severity: 'High', likelihood: 'Medium', impact: 'Severe', detail: 'If H2 2025 revenue comes in below $50M guidance, or MNO integrations take longer than expected, the stock could face significant multiple compression. Market has priced in execution.', mitigation: 'Diversified MNO base, government contracts provide floor.' },
      { risk: 'Manufacturing Bottleneck', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Scaling from 1 satellite to 6/month is hard. Supply chain issues, quality problems, or workforce constraints could slow the buildout and delay continuous coverage.', mitigation: '95% vertical integration, Texas facility expansion, redundant suppliers.' },
      { risk: 'Dilution Pressure', severity: 'Medium', likelihood: 'Medium', impact: 'Moderate', detail: '$707M in converts will eventually convert or need refinancing. While no near-term equity raise is expected, future growth initiatives could require additional capital.', mitigation: 'Strong cash position ($760M), path to cash flow positive.' },
      { risk: 'Competitive Response', severity: 'Medium', likelihood: 'Medium', impact: 'Moderate', detail: 'Starlink/T-Mobile will expand beyond messaging. Other players (Lynk, Skylo) are pursuing D2D. Technology lead doesn\'t guarantee market lead.', mitigation: 'Spectrum moat, patent portfolio, first-mover MNO relationships.' },
      { risk: 'Regulatory Delays', severity: 'Medium', likelihood: 'Low-Medium', impact: 'Moderate', detail: 'FCC approvals, international spectrum coordination, and aviation interference concerns could slow geographic expansion and limit addressable markets.', mitigation: 'Proactive engagement with regulators, experienced spectrum team.' },
    ],
    
    // Three Perspectives
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'CONSTRUCTIVE WITH VOLATILITY',
        color: 'var(--sky)',
        summary: 'Pre-revenue technology company transitioning to commercial operations. Strong balance sheet ($760M cash) and de-risked technology, but valuation assumes significant execution. Best suited for growth-oriented portfolios with 2-3 year horizon. High volatility expected.',
        recommendation: 'Allocate 2-4% of growth portfolio. Rebalance on 30%+ moves.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG',
        color: 'var(--mint)',
        summary: 'Asymmetric setup: technology proven, binary execution risk remains. Event calendar stacked with launches, MNO announcements, and revenue recognition. Stock trades on sentiment — volatile but predictable patterns around catalysts.',
        recommendation: 'Size 4-6% of book. Add on pullbacks to 50-day MA. Trim on 30%+ rips.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'SATELLITE POSITION',
        color: 'var(--violet)',
        summary: 'This is venture-style risk in a public equity wrapper. The market opportunity is massive (5B people), the technology works, and the team has executed through near-death experiences. Multi-bagger potential if thesis plays out, but size accordingly.',
        recommendation: '3-5% max portfolio weight. Hold for 2-3 year thesis.',
      },
    },
    
    // Position Sizing
    positionSizing: {
      aggressive: { range: '4-6%', description: 'High-conviction growth portfolios' },
      growth: { range: '2-4%', description: 'Growth-oriented with tech exposure' },
      balanced: { range: '1-2%', description: 'Diversified portfolios seeking asymmetry' },
      conservative: { range: '0-1%', description: 'Risk-averse (speculative allocation only)' },
    },
    
    // Price Targets
    priceTargets: [
      { period: '0-6 months', range: '$50-100', outlook: 'Volatile', detail: 'Swings ±20% on launch news, revenue updates, MNO announcements' },
      { period: '6-18 months', range: '$100-150', outlook: 'Bullish', detail: '25-satellite threshold, cash flow positive milestone, continuous US coverage' },
      { period: '18-36 months', range: '$150-250+', outlook: 'Very Bullish', detail: 'Global coverage, billion-dollar revenue run rate, potential M&A' },
    ],
  };
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ARCHIVE - NEVER DELETE! ADD NEW ENTRIES AT TOP AFTER EACH FILING
  // This is the permanent historical record of investment thesis evolution
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const archive = [
    // ⬇️ ADD NEW ENTRIES HERE (most recent first) ⬇️
    { 
      date: '2025-11-10', 
      filing: 'Q3 2025 10-Q', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Inflection Point Reached',
      summary: 'Technology validated, commercial traction accelerating. The thesis has shifted from "will it work?" to "how fast can they scale?"',
      keyDevelopments: ['$1B+ contracted revenue milestone', 'BB6 launched successfully', 'Verizon definitive agreement signed', 'Vodafone SatCo JV announced'],
      whyItMatters: 'This quarter marks the transition from development company to commercial operator. Every major technology risk has been retired.',
      lookingAhead: 'Focus shifts entirely to execution: manufacturing cadence, launch reliability, and MNO integration timelines.',
    },
    { 
      date: '2025-08-11', 
      filing: 'Q2 2025 10-Q', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Strategic Groundwork Complete',
      summary: 'Spectrum secured, partnerships expanding. The company has assembled all the pieces needed for commercial success.',
      keyDevelopments: ['L-Band court approval ($550M spectrum asset)', '60 MHz S-Band acquisition closed', 'Vi India partnership announced', '8 government contracts total'],
      whyItMatters: 'Spectrum ownership creates an unassailable competitive moat. No other D2D player has comparable licensed spectrum holdings.',
      lookingAhead: 'H2 2025 revenue guidance of $50-75M becomes the key metric to watch. First real commercial revenue incoming.',
    },
    { 
      date: '2025-05-12', 
      filing: 'Q1 2025 10-Q', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Block 1 Proving Technology at Scale',
      summary: 'Revenue guidance set for the first time. The company is confident enough to give numbers.',
      keyDevelopments: ['H2 2025 revenue guidance: $50-75M', 'DIU contract expanded to $20M', '5 launches contracted for 2025', 'EXIM/IFC pipeline over $500M'],
      whyItMatters: 'First meaningful revenue guidance signals commercial readiness. Government contracts provide validation and diversification.',
      lookingAhead: 'Block 2 manufacturing ramp becomes critical. Need to hit 6 satellites/month sustained production.',
    },
    { 
      date: '2025-03-03', 
      filing: 'FY2024 10-K', 
      verdict: 'CONSTRUCTIVE', 
      headline: 'Transformational Year Complete',
      summary: 'Technology works. Upgrade from Neutral. The question is no longer IF but WHEN.',
      keyDevelopments: ['Block 1 fully operational', '$43M SDA government contract', 'ASIC validated at 10 GHz', 'Vodafone definitive signed', '$1B+ raised in 2024'],
      whyItMatters: 'Block 1 success proves the core technology at commercial scale. This de-risks the entire investment thesis.',
      lookingAhead: 'Constellation buildout is now a manufacturing and logistics challenge, not a technology challenge.',
    },
    { 
      date: '2024-11-14', 
      filing: 'Q3 2024 10-Q', 
      verdict: 'NEUTRAL → CONSTRUCTIVE', 
      headline: 'Block 1 Launch De-risks Thesis',
      summary: 'Six satellites in orbit, technology working as designed. The binary bet has paid off.',
      keyDevelopments: ['Block 1 launched September 12', 'Warrant redemption completed ($154M)', 'pLEO program expanded 14x to $13B', 'ISRO added as third launch provider'],
      whyItMatters: 'Successful launch eliminates the largest risk factor. Stock can now be valued on commercial potential, not just technology hope.',
      lookingAhead: 'Capital raise needed in 2025 to fund full constellation. Watch for terms and dilution.',
    },
    { 
      date: '2024-08-14', 
      filing: 'Q2 2024 10-Q', 
      verdict: 'NEUTRAL', 
      headline: 'Pre-Launch Tension',
      summary: 'Binary outcome ahead. Success means re-rate; failure means existential crisis.',
      keyDevelopments: ['AT&T definitive agreement signed', 'Verizon $100M commitment', 'FCC license granted', 'ASIC tape-out complete'],
      whyItMatters: 'All regulatory and partnership pieces in place. Everything rides on the September launch.',
      lookingAhead: 'This is the last chance to position before the binary event. Risk management critical.',
    },
    { 
      date: '2024-04-01', 
      filing: 'FY2023 10-K', 
      verdict: 'CAUTIOUS → NEUTRAL', 
      headline: 'Survived Near-Death Experience',
      summary: 'Capital secured just in time. The company lives to fight another day.',
      keyDevelopments: ['$100M equity raise at $3.10', '$110M strategic converts', '95% vertical integration achieved', 'BW3 proved 5G capability'],
      whyItMatters: 'The cash crisis is resolved. Management executed when the company was on the brink.',
      lookingAhead: 'Block 1 launch in 2024 becomes the singular focus. Technology must prove out at scale.',
    },
    { 
      date: '2023-11-14', 
      filing: 'Q3 2023 10-Q', 
      verdict: 'CAUTIOUS', 
      headline: 'Technology Works, Cash Critical',
      summary: 'BW3 proves 5G at 14 Mbps, but liquidity crisis looms. A race against time.',
      keyDevelopments: ['5G call achieved (14 Mbps)', 'Atlas debt closed ($48.5M)', 'Stock collapsed from $15 to $3', 'Only 3-4 quarters of runway'],
      whyItMatters: 'Technology validation is real, but the company may not survive to commercialize it without emergency capital.',
      lookingAhead: 'Must raise capital in Q1 2024 or face bankruptcy. Position for financing, not fundamentals.',
    },
    { 
      date: '2023-08-14', 
      filing: 'Q2 2023 10-Q', 
      verdict: 'CAUTIOUS', 
      headline: '4G Validated, Balance Sheet Stressed',
      summary: 'Technology milestones hit but cash burn unsustainable. Storm clouds gathering.',
      keyDevelopments: ['4G/LTE achieved (10+ Mbps)', '$59M equity raise completed', 'Atlas debt announced', '$176M cash, $48M/quarter burn'],
      whyItMatters: 'The technology works, but financial engineering required to survive. Debt signals desperation.',
      lookingAhead: 'Downgrade to Cautious. The next 12 months will determine survival.',
    },
    { 
      date: '2023-05-15', 
      filing: 'Q1 2023 10-Q', 
      verdict: 'NEUTRAL', 
      headline: 'Historic Voice Call Proves Concept',
      summary: 'First-ever D2D voice call from space. The technology is real.',
      keyDevelopments: ['First voice call April 25', 'Constellation reduced to ~90 satellites', 'BW3 operational', '$206M cash adequate near-term'],
      whyItMatters: 'Voice call proves the fundamental technology works. Constellation reduction is positive for economics.',
      lookingAhead: 'Need to secure Block 1 funding. Watch cash burn closely.',
    },
    { 
      date: '2023-03-01', 
      filing: 'FY2022 10-K', 
      verdict: 'NEUTRAL', 
      headline: 'BW3 Deployed, Testing Begins',
      summary: 'First full-scale test satellite in orbit. The experiment begins.',
      keyDevelopments: ['BW3 antenna deployed November 14', 'NanoAvionics sold for focus', '$75M equity raise completed', '$301M cash position'],
      whyItMatters: 'BW3 is the proving ground. Results over the next year will validate or invalidate the entire thesis.',
      lookingAhead: 'Maintain Neutral until test results prove commercial viability.',
    },
    { 
      date: '2022-11-14', 
      filing: 'Q3 2022 10-Q', 
      verdict: 'NEUTRAL', 
      headline: 'BW3 Launched. Pure Speculation.',
      summary: 'Satellite in orbit. Everything that follows is unprecedented.',
      keyDevelopments: ['BW3 launched September 10', 'Antenna deployment sequence begun', 'Nano sold for strategic focus', 'Pure technology speculation'],
      whyItMatters: 'This is ground zero. No one has done what ASTS is attempting. Success is not guaranteed.',
      lookingAhead: 'Wait for test results before increasing position. High risk, high uncertainty.',
    },
  ];

  // Collapsible section component
  const CollapsibleSection = ({ id, title, children }) => (
    <div className="card" style={{ marginBottom: 16 }}>
      <div 
        onClick={() => toggleSection(id)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-expanded={investmentSections.has(id)}
        onKeyDown={(e) => e.key === 'Enter' && toggleSection(id)}
      >
        <div className="card-title" style={{ marginBottom: 0 }}>{title}</div>
        <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has(id) ? '−' : '+'}</span>
      </div>
      {investmentSections.has(id) && <div style={{ marginTop: 16 }}>{children}</div>}
    </div>
  );

  const getVerdictColor = (verdict) => {
    if (verdict.includes('CONSTRUCTIVE')) return 'var(--mint)';
    if (verdict.includes('BULLISH')) return 'var(--mint)';
    if (verdict.includes('NEUTRAL')) return 'var(--gold)';
    if (verdict.includes('CAUTIOUS')) return 'var(--coral)';
    return 'var(--coral)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="section-head" style={{ marginBottom: 0 }}>Investment Analysis</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={expandAll} className="pill" style={{ fontSize: 11 }}>⊞ Expand All</button>
          <button onClick={collapseAll} className="pill" style={{ fontSize: 11 }}>⊟ Collapse All</button>
        </div>
      </div>

      {/* Data Refresh Indicator */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, marginBottom: 16, fontSize: 11, color: 'var(--text3)' }}>
        <span>Data as of: <strong style={{ color: 'var(--text2)' }}>{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong style={{ color: 'var(--text2)' }}>{current.source}</strong></span>
      </div>

      {/* Rating Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--mint)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 18 }}>CONSTRUCTIVE</span>
              <span style={{ background: 'rgba(126,231,135,0.15)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>TECHNOLOGY PROVEN</span>
            </div>
            <div style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 500 }}>
              {current.executiveSummary.thesis}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>
              Last Updated: {current.date} • Trigger: {current.source}
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
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--sky)', fontWeight: 700 }}>3:1</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>Asymmetric</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Cash Position</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--violet)', fontWeight: 700 }}>$760M</div>
              <div style={{ fontSize: 10, color: 'var(--mint)' }}>Runway secured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Scorecard */}
      <CollapsibleSection id="scorecard" title="Investment Scorecard">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {current.scorecard.map((item, i) => (
            <div key={i} style={{ background: 'var(--surface2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{item.category}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{item.detail}</div>
              </div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: item.color }}>{item.rating}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Summary */}
      <CollapsibleSection id="summary" title="Investment Summary">
        <div style={{ background: 'rgba(126,231,135,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(126,231,135,0.2)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>What's New ({current.source})</div>
          <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 13, lineHeight: 1.8 }}>
            {current.executiveSummary.whatsNew.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14 }}>
          <p style={{ marginBottom: 12 }}>
            <strong>Thesis:</strong> {current.executiveSummary.thesis}
          </p>
          <p style={{ marginBottom: 12, fontStyle: 'italic', color: 'var(--cyan)' }}>
            "{current.executiveSummary.keyPoint}"
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Position Sizing:</strong> 3-5% for growth portfolios • 1-2% for balanced • Speculative allocation for conservative
          </p>
        </div>
      </CollapsibleSection>

      {/* Growth Drivers */}
      <CollapsibleSection id="growth" title="Growth Drivers">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {current.growthDrivers.map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface2)', borderRadius: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{d.driver}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{d.description}</div>
              </div>
              <span style={{ color: d.color, fontWeight: 600, fontSize: 12, marginLeft: 16 }}>{d.impact}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Competitive Moat */}
      <CollapsibleSection id="moat" title="Competitive Moat">
        <div className="g2">
          <div>
            <h4 style={{ color: 'var(--mint)', marginBottom: 12 }}>Moat Sources</h4>
            {current.moatSources.map((m, i) => (
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
            {current.moatThreats.map((t, i) => (
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
          <strong>Moat Durability:</strong> A- (Strong). Spectrum + patents + manufacturing scale create defensible position. 4+ year technology lead is substantial. Key risk is well-funded competitors (Starlink) accelerating D2D efforts.
        </div>
      </CollapsibleSection>

      {/* Risk Matrix */}
      <CollapsibleSection id="risks" title="Risk Matrix">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {current.risks.map((r, i) => (
            <div key={i} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: `3px solid ${r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.risk}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: r.severity === 'Critical' ? 'rgba(255,107,107,0.2)' : r.severity === 'High' ? 'rgba(210,153,34,0.2)' : 'rgba(100,149,237,0.2)', color: r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)' }}>{r.severity}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: 'var(--surface)', color: 'var(--text3)' }}>{r.likelihood} likelihood</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>{r.detail}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}><strong style={{ color: 'var(--mint)' }}>Mitigation:</strong> {r.mitigation}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Risks & Strategic Assessment */}
      <CollapsibleSection id="strategic-assessment" title="Risks & Strategic Assessment">
        {/* Section Header */}
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20, fontStyle: 'italic' }}>
          Multi-perspective risk evaluation and strategic decision framework for space-based cellular infrastructure
        </div>

        {/* Part 1: Multi-Perspective Risk Evaluation */}
        <h4 style={{ color: 'var(--text)', marginBottom: 16, fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Risk Evaluation — Three Perspectives</h4>
        
        {/* CFA Level III Perspective */}
        <div style={{ background: 'rgba(6,182,212,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(6,182,212,0.2)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ background: 'var(--cyan)', color: 'var(--bg)', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>CFA LEVEL III</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Portfolio Construction & Factor Analysis</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 12 }}>
              <strong>Factor Exposures:</strong> ASTS exhibits high beta (~1.8-2.2) to growth/momentum factors with significant idiosyncratic risk from execution milestones. Low correlation to traditional telcos (~0.2) and satellite peers (~0.4). This is a binary outcome investment — success yields 5-10x, failure yields 80%+ loss. Standard MPT optimization doesn't apply; treat as venture-like allocation within public markets sleeve.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>Liquidity Analysis:</strong> Average daily volume ~$100-200M provides excellent liquidity for most institutional positions. Options market active with reasonable spreads. Convertible bonds provide additional hedging/exposure vehicles. Short interest ~15% creates squeeze potential but also overhang. Position sizing up to 3-5% of portfolio feasible without market impact.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Governance & ESG:</strong> Founder Abel Avellan controls ~73% voting via Class C shares — concentration risk but also alignment. Board includes telecom veterans. ESG profile positive: enabling connectivity for underserved populations, reducing need for physical infrastructure. Space debris concerns manageable with LEO orbit decay. Spectrum rights secured through MNO partnerships — regulatory moat.
            </p>
          </div>
        </div>

        {/* Hedge Fund Manager Perspective */}
        <div style={{ background: 'rgba(234,179,8,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(234,179,8,0.2)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ background: 'var(--gold)', color: 'var(--bg)', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>HEDGE FUND</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Alpha Generation & Event Catalysts</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 12 }}>
              <strong>Event Calendar Alpha:</strong> ASTS is a catalyst machine — launches, FCC approvals, MNO activations, revenue recognition events provide defined trading opportunities. Strategy: size up 2-3 weeks before known catalysts, trim 50% into strength on positive outcomes, add on "sell the news" weakness if thesis intact. Each successful launch de-risks the next.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>Short Squeeze Dynamics:</strong> ~15% short interest with high conviction longs creates squeeze potential on positive catalysts. Days to cover ~3-4. Monitor borrow rates for squeeze signals. Historical pattern: 20-40% moves on successful launches. Position accordingly — don't short this name, and size longs to benefit from squeezes.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Convertible Arbitrage:</strong> $1.625B in converts outstanding at various strikes ($80-$180+). As stock approaches conversion prices, arbitrage flows create support. Monitor convert pricing vs equity for relative value opportunities. Converts provide downside cushion narrative but also overhang concerns — net neutral to slightly positive for equity.
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
              <strong>Strategic Thesis:</strong> ASTS represents "infrastructure for the next billion connected users" — a thematic play on global connectivity megatrend. Unlike Starlink (D2C, new devices), ASTS works with existing phones via MNO partnerships. This is picks-and-shovels for mobile connectivity expansion. The 50/50 revenue share model means MNOs are incentivized to push adoption.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>Portfolio Fit:</strong> Classify as "thematic/disruptive innovation" allocation, not traditional telecom. Appropriate for growth portfolios with 5-10 year horizons. Do not benchmark against telco index — this is a pre-revenue infrastructure buildout. Comparable to early-stage cloud or fiber investments. Size as venture-like position (1-3% max) given binary risk profile.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Fiduciary Narrative:</strong> If questioned by stakeholders: "We own the infrastructure layer enabling mobile operators to extend coverage without building towers — backed by AT&T, Verizon, Vodafone partnerships and $1B+ in contracted revenue." The blue-chip MNO partnerships provide institutional credibility. Comparable thesis to early investments in cell tower REITs.
            </p>
          </div>
        </div>

        {/* Part 2: Key Strategic Questions */}
        <h4 style={{ color: 'var(--text)', marginBottom: 16, fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Key Strategic Questions</h4>

        {/* Would I Buy Now? */}
        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>Would I Buy Now?</span>
            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '6px 16px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>YES — HIGH CONVICTION</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 12 }}>
              <strong>The Case:</strong> Constellation deployment is accelerating (6 sats/month production), commercial service imminent in 2026, $1B+ contracted revenue provides visibility, and MNO partnerships de-risk go-to-market. The technology works (BW3 proved it). Valuation at ~$300/potential subscriber is cheap vs telco M&A comps ($500+). Risk/reward is asymmetric to the upside.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>The Hesitation:</strong> Still pre-revenue with $300M+ annual burn. Execution risk on 40+ satellite launches. FCC/regulatory uncertainty in some markets. Starlink competition narrative (though different model). Stock has run significantly — buying at highs feels uncomfortable.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>The Verdict:</strong> Yes, initiate or add to position. The de-risking from successful launches justifies higher prices. Use pullbacks on "sell the news" events to add. This is a 3-5 year hold — don't trade around short-term volatility. Size appropriately for binary outcome profile (1-3% of portfolio).
            </p>
          </div>
        </div>

        {/* What Can I Expect? */}
        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15, marginBottom: 12 }}>What Can I Expect?</div>
          <div className="g3" style={{ marginBottom: 16 }}>
            <div style={{ background: 'rgba(234,179,8,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(234,179,8,0.2)' }}>
              <div style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: 8, fontSize: 13 }}>Short-Term (0-6 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                Catalyst-rich period: BB7-13 launches, US commercial service initiation, Q4 earnings. Expect 30-50% swings around events. Successful launches = 10-20% pops, then consolidation. Trading range likely $20-45 depending on execution. Volatility is your friend if sized correctly.
              </div>
            </div>
            <div style={{ background: 'rgba(100,149,237,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(100,149,237,0.2)' }}>
              <div style={{ fontWeight: 600, color: 'var(--sky)', marginBottom: 8, fontSize: 13 }}>Mid-Term (6-18 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                Revenue recognition begins — first real P&L validation. If penetration tracks to 1%+, narrative shifts from "will it work?" to "how big can it get?" Multiple expansion potential. Target range: $50-100 if execution continues. This is where the thesis gets proven or broken.
              </div>
            </div>
            <div style={{ background: 'rgba(6,182,212,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(6,182,212,0.2)' }}>
              <div style={{ fontWeight: 600, color: 'var(--cyan)', marginBottom: 8, fontSize: 13 }}>Long-Term (3-5 years)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                At scale (2%+ penetration, 60M+ subs), ASTS could generate $5-10B revenue at 50%+ EBITDA margins. At telco multiples (8-12x EBITDA), that's $40-120B EV vs ~$12B today. 3-10x return potential. But crypto-like volatility along the way — expect multiple 40%+ drawdowns.
              </div>
            </div>
          </div>
        </div>

        {/* What's My Strategy? */}
        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15, marginBottom: 12 }}>What's My Strategy?</div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--cyan)' }}>Position Sizing:</strong> 2-4% for aggressive growth portfolios, 1-2% for balanced growth, avoid for conservative/income. This is a high-conviction, high-volatility position. Size so you can hold through 50% drawdowns without losing sleep. Never bet the farm on binary outcomes.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--sky)' }}>Entry Approach:</strong> Accumulate on pullbacks, especially "sell the news" events after successful launches. Add on 15-20% dips from local highs. Don't chase parabolic moves. Use 4-8 week DCA for new positions. Options strategies (selling puts, bull call spreads) can enhance entry.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong style={{ color: 'var(--gold)' }}>Exit Strategy:</strong> Trim 20% at 2x, another 20% at 3x, let 60% ride as "house money." Full exit triggers: (1) launch failure pattern (2+ consecutive), (2) major MNO partnership cancellation, (3) competitive moat erosion, (4) management credibility issues. Take profits into strength, not weakness.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong style={{ color: 'var(--coral)' }}>Risk Management:</strong> No hard stop-losses — volatility will trigger them inappropriately. Instead, thesis-based exits: reassess on any launch failure, regulatory setback, or competitive threat. Maintain conviction through normal volatility. If thesis breaks, exit regardless of price. Time stops: if no commercial traction by end of 2026, reassess entire position.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Position Sizing */}
      <CollapsibleSection id="position" title="Position Sizing & Price Targets">
        <div className="g2" style={{ marginBottom: 16 }}>
          <div>
            <h4 style={{ color: 'var(--text)', marginBottom: 12, fontSize: 14 }}>Recommended Allocation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(current.positionSizing).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}>
                  <span style={{ color: 'var(--text2)', textTransform: 'capitalize' }}>{key}</span>
                  <span style={{ color: key === 'aggressive' ? 'var(--mint)' : key === 'growth' ? 'var(--sky)' : key === 'balanced' ? 'var(--gold)' : 'var(--coral)', fontWeight: 500 }}>{val.range}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--text)', marginBottom: 12, fontSize: 14 }}>Price Targets by Timeframe</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {current.priceTargets.map((t, i) => (
                <div key={i} style={{ padding: '8px 12px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'var(--text2)' }}>{t.period}</span>
                    <span style={{ color: 'var(--mint)', fontWeight: 600 }}>{t.range}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Analysis Archive */}
      <CollapsibleSection id="archive" title="Analysis Archive — Complete History">
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>Full record of all investment thesis updates. Never deleted. Tracking since Q3 2022.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 500, overflowY: 'auto' }}>
          {archive.map((a, i) => (
            <div key={i} style={{ background: i === 0 ? 'rgba(126,231,135,0.05)' : 'var(--surface2)', padding: 16, borderRadius: 8, border: i === 0 ? '1px solid rgba(126,231,135,0.2)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{a.date}</span>
                  {i === 0 && <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>CURRENT</span>}
                </div>
                <span style={{ color: getVerdictColor(a.verdict), fontWeight: 600, fontSize: 13 }}>{a.verdict}</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14, marginBottom: 4 }}>{a.headline}</div>
              <div style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 8 }}>{a.summary}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Filing: {a.filing}</div>
              
              {expandedArchive === i && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 12, marginBottom: 4 }}>Key Developments</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {a.keyDevelopments.map((d, j) => (
                        <span key={j} style={{ padding: '4px 8px', background: 'var(--surface)', borderRadius: 4, fontSize: 11, color: 'var(--text3)' }}>• {d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="g2" style={{ marginTop: 12 }}>
                    <div style={{ padding: 12, background: 'rgba(126,231,135,0.1)', borderRadius: 6 }}>
                      <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 11, marginBottom: 4 }}>Why It Mattered</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)' }}>{a.whyItMatters}</div>
                    </div>
                    <div style={{ padding: 12, background: 'rgba(139,92,246,0.1)', borderRadius: 6 }}>
                      <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 11, marginBottom: 4 }}>Looking Ahead (at the time)</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)' }}>{a.lookingAhead}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setExpandedArchive(expandedArchive === i ? null : i)}
                style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {expandedArchive === i ? '▼ Less' : '▶ More details'}
              </button>
            </div>
          ))}
        </div>
      </CollapsibleSection>
      
      <CFANotes title="CFA Level III — Investment Framework" items={[
        { term: 'Letter Grade Scorecard', def: 'A-F ratings across dimensions: Growth (revenue trajectory), Profitability (margin path), Moat (competitive position), Execution (management track record), Valuation (vs DCF and peers).' },
        { term: 'Three Perspectives', def: 'CFA Analyst (fundamentals), Hedge Fund (catalysts/technicals), CIO (portfolio construction). Different horizons and risk tolerances.' },
        { term: 'Growth Drivers', def: 'Key operational milestones that drive value: constellation deployment, service launches, subscriber acquisition, revenue recognition.' },
        { term: 'Risk Assessment', def: 'Probability × Impact matrix. Regulatory, technical, competitive, financial risks. Quantify where possible.' },
        { term: 'Archive Discipline', def: 'All prior analyses preserved permanently. Track prediction accuracy over time. Never delete, only append.' },
        { term: 'Position Sizing', def: 'Conviction level × risk tolerance = position size. Higher conviction warrants larger allocation within portfolio limits.' },
      ]} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// WALL STREET TAB - Analyst Coverage & Research Archive
// Track sell-side analyst ratings, price targets, and estimate revisions
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
    // DEUTSCHE BANK - Bryan Kraft (Coverage since June 2021)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Deutsche Bank',
      analyst: 'Bryan Kraft',
      coverageSince: 'June 2021',
      currentPT: 81,
      currentRating: 'Buy',
      currentRatingNormalized: 'bullish',
      reports: [
        // === Nov 2025 - PT Raise to $81 (Quick Update) ===
        {
          date: '2025-11-01',
          action: 'PT Raise',
          priceTarget: 81,
          previousTarget: 63,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          source: 'TipRanks',
          sourceUrl: 'https://www.tipranks.com/',
          isFullReport: false
        },
        // === Mar 4, 2025 - PT Raise $53 → $64 (FULL REPORT) ===
        {
          date: '2025-03-04',
          action: 'PT Raise',
          priceTarget: 64,
          previousTarget: 53,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'Progress In Funding, MNO Agreements, & Satellite Build',
          source: 'Deutsche Bank Research',
          isFullReport: true,
          thesis: 'AST SpaceMobile has expanded its MNO footprint, accelerated the satellite build pace, and secured substantial funding ($1B in cash). We continue to believe AST\'s stock offers an asymmetrically favorable risk/reward, based on the large size of the TAM, a highly differentiated product, and a competitive position cemented by MNO relationships. PT raised to $64 from $53 (+20.8%).',
          reportSummary: `**VODAFONE DEFINITIVE AGREEMENT & JV**
AST and Vodafone signed a definitive commercial agreement in early December and announced a JV this past Monday, which should expedite the introduction of SpaceMobile service across Europe. The Vodafone commercial agreement runs through 2034, formalizes the terms for the partnership, maintains 5 year co-exclusivity, and provides a scalable framework for Vodafone to offer D2D satellite broadband service to its 340M customers in 15 countries and to network partners in 45 additional markets. The JV will cover 100% of the continent and establish a turnkey solution to efficiently facilitate interoperability with MNOs in smaller European markets. AST now has agreements/MOUs with operators covering 3B subscribers globally.

**FCC SPECIAL TEMPORARY AUTHORITY**
The FCC granted AST a Special Temporary Authority on January 30th, authorizing AST to test broadband, voice, and video service in the US with AT&T and Verizon on its BlueBird satellites. This regulatory approval represents an important step towards commercializing service in the US. The company has continued to make progress testing its service, including conducting video calls with AT&T, Verizon, Vodafone and Rakuten.

**$43M GOVERNMENT CONTRACT**
AST announced on 2/26/25 that it had secured a government contract for $43M in total revenue. Government and defense business represents an underappreciated market opportunity for the company, and it will be addressable before AST can fully commercialize consumer service.

**MODEL SUMMARY — SATELLITE BUILD**
Cumulative Commercial Satellites: 25 (2025E) → 65 (2026E) → 95 (2027E) → 115 (2028E) → 135 (2029E) → 155 (2030E)
New Satellites Launched: 10 (2025E) → 40 (2026E) → 30 (2027E) → 20 (2028E) → 20 (2029E) → 20 (2030E)

**MODEL SUMMARY — SUBSCRIBERS (000s)**
Supplemental Coverage Subs (Monthly): 1,492 (2025E) → 4,698 (2026E) → 8,222 (2027E) → 10,360 (2028E) → 11,784 (2029E)
Day Pass Units Sold (per Year): 26,102 (2025E) → 105,711 (2026E) → 217,883 (2027E) → 285,238 (2028E) → 348,087 (2029E)
Primary Broadband Subs (Monthly): 0 (2025E) → 18,032 (2026E) → 66,267 (2027E) → 99,400 (2028E) → 125,244 (2029E)

**MODEL SUMMARY — REVENUE BY SEGMENT ($M)**
Supplemental Coverage: $172.7 (2025E) → $544.1 (2026E) → $952.1 (2027E) → $1,199.7 (2028E) → $1,364.6 (2029E)
Day Pass: $125.9 (2025E) → $510.1 (2026E) → $1,051.3 (2027E) → $1,376.3 (2028E) → $1,679.5 (2029E)
Primary Broadband: $0.0 (2025E) → $216.4 (2026E) → $795.2 (2027E) → $1,192.8 (2028E) → $1,502.9 (2029E)
Government & Other: $75.0 (2025E) → $150.0 (2026E) → $270.0 (2027E) → $442.8 (2028E) → $669.5 (2029E)
Total Revenue: $373.7 (2025E) → $1,420.5 (2026E) → $3,068.6 (2027E) → $4,211.5 (2028E) → $5,216.6 (2029E)

**ARPU ASSUMPTIONS (AST's 50% Share)**
Supplemental Coverage (Monthly): $9.65
Day Pass (Daily): $4.83
Primary Broadband (Monthly): $1.00`,
          assumptions: [
            { label: 'Price Target', value: '$64.00' },
            { label: 'Prev Target', value: '$53.00' },
            { label: 'PT Change', value: '+20.8%' },
            { label: 'Stock Price (4-Mar)', value: '$28.61' },
            { label: '52-Week Range', value: '$2.01-$38.60' },
            { label: 'EPS Change', value: '-$0.67 to -$0.77 (-16.2%)' },
            { label: 'MNO Subs Coverage', value: '3B globally' },
            { label: 'Vodafone Agreement', value: 'Through 2034' },
          ],
          catalysts: [
            'Vodafone JV to expedite SpaceMobile service across Europe',
            'FCC STA granted Jan 30th for US broadband/voice/video testing',
            '$43M government contract secured (announced 2/26/25)',
            'Video calls completed with AT&T, Verizon, Vodafone, Rakuten',
            'Commercial service expected to begin in earnest 2026',
            '$1B cash position — fully funded through satellite build',
          ],
          risks: [
            'Execution risk on satellite manufacturing and launch schedule',
            'Commercial service timing dependent on regulatory approvals',
            'Competition from other D2D providers',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy25: '373.7', fy26: '1,420.5', fy27: '3,068.6', fy28: '4,211.5', fy29: '5,216.6', fy30: '5,216.6' },
            { metric: 'Adj. EBITDA ($M)', fy25: '187.1', fy26: '1,175.8', fy27: '2,808.9', fy28: '3,942.8', fy29: '4,940.5', fy30: '' },
            { metric: 'EBITDA Margin %', fy25: '50.1%', fy26: '82.8%', fy27: '91.5%', fy28: '93.6%', fy29: '94.7%', fy30: '' },
            { metric: 'Free Cash Flow ($M)', fy25: '(600.6)', fy26: '294.3', fy27: '1,705.7', fy28: '2,653.8', fy29: '3,476.2', fy30: '' },
            { metric: 'Capex ($M)', fy25: '(765.0)', fy26: '(570.0)', fy27: '(400.0)', fy28: '(405.0)', fy29: '(410.0)', fy30: '' },
            { metric: 'Satellites (Cumulative)', fy25: '25', fy26: '65', fy27: '95', fy28: '115', fy29: '135', fy30: '155' },
          ],
          methodology: 'Base Case valuation using 12x 2030E EBITDA discounted at 25% cost of equity. Share price targets: $26.92 (2025E) → $64.00 (2026E) → $80.00 (2027E) → $100.00 (2028E).',
          fullNotes: `VALUATION MULTIPLES TABLE:
| Metric | 2024 | 2025E | 2026E | 2027E | 2028E |
| Share Price | $21.10 | $26.92 | $64.00 | $80.00 | $100.00 |
| Growth | 249.9% | 27.6% | 137.7% | 25.0% | 25.0% |
| EOP Shares (M) | 331.0 | 339.3 | 344.0 | 344.0 | 344.0 |
| Market Cap ($M) | 6,983.3 | 9,133.8 | 22,015.0 | 27,518.8 | 34,398.5 |
| Net Debt ($M) | (558.6) | 124.5 | 1,275.2 | 980.8 | (724.8) |
| Adj Enterprise Value ($M) | 6,368.1 | 9,201.7 | 23,233.5 | 28,443.0 | 33,617.0 |

| Metric | 2024 | 2025E | 2026E | 2027E | 2028E |
| EBITDA ($M) | (147.4) | (90.0) | 187.1 | 1,175.8 | 2,808.9 |
| EV/EBITDA (CY) | — | (102.2x) | 124.2x | 24.2x | 12.0x |
| EV/EBITDA (CY+1) | 5.9x* | 7.8x* | 19.8x | 10.1x | 8.5x |

| Metric | 2024 | 2025E | 2026E | 2027E | 2028E |
| Levered FCF ($M) | (300.3) | (638.6) | (600.6) | 294.3 | 1,705.7 |
| Levered FCF Yield (CY) | — | -7.0% | -2.7% | 1.1% | 5.0% |
| Price/FCF (CY+1) | 23.7x* | 31.0x* | 74.8x | 16.1x | 13.0x |

* '27E Multiple

DISCLOSURE: Deutsche Bank does and seeks to do business with companies covered in its research reports. Distributed March 4, 2025.`
        },
        // === Sep 4, 2024 - PT Raise $22 → $63 (FULL REPORT) ===
        {
          date: '2024-09-04',
          action: 'PT Raise',
          priceTarget: 63,
          previousTarget: 22,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          source: 'TipRanks',
          sourceUrl: 'https://www.tipranks.com/',
          isFullReport: true,
          thesis: 'Improving risk profile warrants re-valuation. Shifting from weighted-average scenario approach to Base Case only. Company progress on technology, commercial agreements (AT&T, Verizon), funding, and regulatory approvals justifies new methodology. Applying 12x 2030E EBITDA discounted at 25% cost of equity yields $63 PT.',
          reportSummary: `**VALUATION METHODOLOGY CHANGE — BASE CASE ONLY**
Previous approach used weighted-average of three scenarios: DB Model Case ($44/40%), Conservative Case ($10/40%), and $0 Scenario (20%). Furthermore, we valued on 20x/10x 2026E EBITDA — still very early in company lifecycle, undervaluing growth opportunity. We now derive valuation solely from Base Case model at $63. We account for execution risk via 25% cost of equity; as AST makes additional progress, we'd anticipate revisiting this assumption to reflect decreasing risk.

**PROGRESS JUSTIFYING NEW APPROACH**
(1) Proving efficacy of core technology and satellite design; (2) Completing construction and ground testing for first 5 commercial satellites (launching this month); (3) Deepening partnerships including finalizing commercial agreements with AT&T and Verizon; (4) Continuing to raise funding including non-dilutive financing and warrant redemption; (5) Obtaining regulatory approvals (namely in the US).

**VALUATION FRAMEWORK**
12x multiple on 2030E EBITDA ($4.9B) = $58.9B Enterprise Value. Net cash 2030E of $8.0B yields $66.9B Market Cap. Discounted back at 25% per year = $17.5B Market Cap 2024E. Divided by 279M shares = $62.82/share (rounded to $63 PT).

**SATELLITE LAUNCH SCHEDULE**
2024E: 5 satellites | 2025E: +20 (25 cumulative) | 2026E: +30 (55 cumulative) | 2027E: +40 (95 cumulative). AST needs 45-60 satellites for full continuous Northern Hemisphere service (US, Europe, Japan); ~90 satellites for full global service.

**REVENUE BUILD TIMELINE**
Northern Hemisphere "supplemental coverage" revenue begins 2026. Equatorial "connecting the unconnected" revenue begins 2027. Positive EBITDA in 2026 at $221M, increasing to $4.9B in 2030. FCF turns positive in 2027.

**TAM OPPORTUNITY**
Northern Hemisphere supplemental coverage: 284M mobile users (based on current MNO partners). Connecting unconnected: 1.6B people for primary broadband service. Large TAM equates to significant optionality for upside growth scenarios.`,
          assumptions: [
            { label: 'Price Target', value: '$63.00' },
            { label: 'Prev Target', value: '$22.00' },
            { label: 'Cost of Equity', value: '25.0%' },
            { label: 'EV/EBITDA Multiple', value: '12.0x' },
            { label: '2030E EBITDA', value: '$4.9B' },
            { label: '2030E EV', value: '$58.9B' },
            { label: '2030E Net Cash', value: '$8.0B' },
            { label: 'Shares O/S', value: '279M' },
          ],
          catalysts: [
            'First 5 commercial BlueBirds launching September 2024',
            'Commercial agreements finalized with AT&T and Verizon',
            'Non-dilutive funding from strategic partners',
            'Public warrant redemption completed',
            'US regulatory approvals obtained',
            'Northern Hemisphere revenue begins 2026',
            'FCF positive in 2027',
          ],
          risks: [
            'Launch failures',
            'Unforeseen technology shortcomings',
            'Increased direct competition',
            'Inability to raise funding on attractive terms',
            'Lack of demand for AST\'s service',
            'Failure to secure all necessary regulatory approvals',
            'Failure to convert MOUs into commercial contracts',
          ],
          estimates: [
            { metric: 'Satellites (Cum.)', fy24: '5', fy25: '25', fy26: '55', fy27: '95' },
            { metric: 'Revenue ($M)', fy24: '10.7', fy25: '50', fy26: '366', fy27: '1,400' },
            { metric: 'EBITDA ($M)', fy24: '(136)', fy25: '(87)', fy26: '222', fy27: '1,242' },
            { metric: 'FCF ($M)', fy24: '(184)', fy25: '(380)', fy26: '(257)', fy27: '447' },
            { metric: 'Capex ($M)', fy24: '(96)', fy25: '(385)', fy26: '(440)', fy27: '(475)' },
          ],
          methodology: '12x EV/EBITDA on 2030E ($4.9B EBITDA), discounted back at 25% cost of equity. Base Case only — discontinued weighted-average scenario approach. Implies $63/share.',
          fullNotes: `EXTENDED PROJECTIONS (2028-2030E):
- 2028E: 115 satellites, $2,977M revenue, $2,806M EBITDA, $1,823M FCF
- 2029E: 135 satellites, $4,087M revenue, $3,912M EBITDA, $2,720M FCF
- 2030E: 155 satellites, $5,082M revenue, $4,905M EBITDA, $3,534M FCF

ARPU ASSUMPTIONS (AST's 50% share):
- Supplemental Coverage: $10/month
- Day Pass: $5/day
- Primary Broadband: $1/month

FUNDING: Pro forma warrant redemption, AST has enough cash through 2025 but would have near-zero balance. Will need additional funding in 2025 — expect export financing and strategic investor prepaid revenue.

DISCLOSURE: Deutsche Bank has managed/co-managed public offering, received IB compensation. Distributed Sep 4, 2024.`
        },
        // === May 29, 2024 - Reiterate Buy, PT $22 (FULL REPORT - VZ Investment) ===
        {
          date: '2024-05-29',
          action: 'Reiterate',
          priceTarget: 22,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'Verizon $100M investment further demonstrates feasibility of AST\'s business plan. AT&T + VZ partnership gives access to 64% of US postpaid lines, more than doubling TAM. Combined 850 MHz spectrum enables more robust service. Stock +69% on the day with >100M shares traded.',
          reportSummary: `**VERIZON $100M INVESTMENT BREAKDOWN**
Verizon will provide $100M in funding: $65M in prepaid commercial revenue and $35M via a 10-year convertible subordinated note ($5.75 strike, 5.5% PIK interest). This follows a similar stock reaction two weeks ago when AT&T and AST announced finalization of a definitive commercial agreement and appointment of Chris Sambar (Head of Network, AT&T) to AST's Board.

**FIVE KEY POSITIVES**
1. Further evidence of feasibility of AST's technology and ability to operationalize it
2. AT&T + Verizon = 64% of US postpaid phone lines, more than doubling US TAM vs AT&T only
3. 2024 strategic investors now include: AT&T, Google, Verizon, and Vodafone — should drive increased engagement from other prospective partners
4. Reduces AST's 2025 capital need to ~$300M (assuming capital-unconstrained build pace)
5. Combined 850 MHz spectrum from AT&T and Verizon enables more robust, available service and better user experience

**MARKET REACTION**
Stock traded up 69% on the day with over 100 million shares traded.`,
          assumptions: [
            { label: 'Price Target', value: '$22.00' },
            { label: 'Rating', value: 'Buy' },
            { label: 'VZ Prepaid Revenue', value: '$65M' },
            { label: 'VZ Convertible Note', value: '$35M' },
            { label: 'Convert Strike', value: '$5.75' },
            { label: 'Convert Interest', value: '5.5% PIK' },
            { label: 'US TAM Access', value: '64% postpaid' },
            { label: '2025 Capital Need', value: '~$300M' },
          ],
          catalysts: [
            'Verizon $100M investment ($65M prepaid + $35M convert)',
            'AT&T + VZ = 64% of US postpaid lines',
            '2024 strategic investors: AT&T, Google, Verizon, Vodafone',
            'Combined 850 MHz spectrum for robust US service',
            'Chris Sambar (AT&T Head of Network) appointed to Board',
          ],
          risks: [
            'Execution risk on technology deployment',
            'Additional funding needed in 2025',
            'Regulatory approvals still pending',
            'Competition from other DTC satellite providers',
          ],
          methodology: 'Price target unchanged at $22. This is a catalyst update note following Verizon investment announcement.',
          fullNotes: `STOCK REACTION: +69% on May 29, 2024 with >100M shares traded.

FUNDING STRUCTURE:
- $65M prepaid commercial revenue
- $35M convertible subordinated note
- 10-year term
- $5.75 strike price
- 5.5% PIK interest

2024 STRATEGIC INVESTMENTS TO DATE:
- AT&T: Commercial agreement + Board seat
- Google: Strategic investment
- Verizon: $100M ($65M prepaid + $35M convert)
- Vodafone: Strategic partner

DISCLOSURE: Deutsche Bank has managed/co-managed public offering, received IB compensation. Distributed May 29, 2024.`
        },
        // === May 16, 2024 - PT Raise $19 → $22 (FULL REPORT - AT&T Agreement) ===
        {
          date: '2024-05-16',
          action: 'PT Raise',
          priceTarget: 22,
          previousTarget: 19,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'AT&T Agreement Is An Important Step and Proof Point. First definitive commercial agreement with wireless carrier finalizes terms through 2030 on revenue share model. Chris Sambar appointment to Board demonstrates AT&T confidence. Expect FCC approval imminent. PT raised to $22 from $19 due to time value as we roll forward valuation framework.',
          reportSummary: `**AT&T COMMERCIAL AGREEMENT — KEY DETAILS**
AST announced it has finalized a commercial agreement with AT&T, its first definitive agreement with a wireless carrier partner to date. The agreement runs through 2030 and formalizes terms of SpaceMobile service in the US based on a revenue share model — the foundation of AST's business model.

**STRATEGIC SIGNIFICANCE**
1. Agreement demonstrates AT&T's confidence in AST's technology and ability to execute
2. Chris Sambar (AT&T Head of Network) appointed to AST Board of Directors
3. Provides framework for additional carrier partners in other markets
4. AST believed to be close to receiving FCC approval for market access in US

**SATELLITE LAUNCH TIMELINE**
First 5 Block1 BlueBird satellites expected to reach Cape Canaveral in July/August 2024. These commercial satellites will offer "nationwide non-continuous service" in the US using low band spectrum, supporting sporadic voice, text, and data capabilities. Service expected for AT&T customers by late 2024 or early 2025.

**FUNDING SITUATION**
Management confirmed sufficient liquidity to meet needs over next 12 months with no plans to pursue a security offering in 2024. AST remains in "advanced discussions" with additional strategic partners and government/export credit agencies for potential non-dilutive financing.

**TECHNOLOGY PROGRESS**
BlueWalker 3 test satellite continues to perform well, demonstrating technology across multiple spectrum bands. Company has validated 2G, 4G, and 5G connectivity via BlueWalker 3.

**VALUATION**
We maintain our scenario-weighted valuation framework. PT raised to $22 from $19 to account for time value (rolling forward valuation). Distribution of probability across scenarios unchanged.`,
          assumptions: [
            { label: 'Price Target', value: '$22.00' },
            { label: 'Prev Target', value: '$19.00' },
            { label: 'Agreement Term', value: 'Through 2030' },
            { label: 'Model', value: 'Revenue Share' },
            { label: 'BB1 Launch', value: 'Jul/Aug 2024' },
            { label: 'Service Start', value: 'Late 2024/Early 2025' },
          ],
          catalysts: [
            'First definitive commercial agreement with AT&T (through 2030)',
            'Chris Sambar (AT&T Head of Network) appointed to Board',
            'FCC approval expected imminent',
            'First 5 BB satellites to Cape Canaveral Jul/Aug 2024',
            'Nationwide non-continuous service for AT&T customers',
            'Advanced discussions with additional strategic partners',
          ],
          risks: [
            'Technology execution risk',
            'Regulatory approval timing',
            'Competition from Starlink DTC',
            'Funding needs in 2025',
          ],
          methodology: 'Scenario-weighted valuation framework maintained. PT raised to $22 from $19 due to time value roll-forward.',
          fullNotes: `DISCLOSURE: Deutsche Bank has managed/co-managed public offering, received IB compensation. Distributed May 16, 2024.`
        },
        // === Nov 20, 2023 - Q3 2023 Update (FULL REPORT) ===
        {
          date: '2023-11-20',
          action: 'Update',
          priceTarget: 23,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          source: 'Moomoo',
          isFullReport: true,
          thesis: 'Q3 2023 update with continued positive outlook on AST SpaceMobile\'s technology development and commercial progress.',
          reportSummary: `**Q3 2023 TECHNOLOGY UPDATE**
BlueWalker 3 continues to demonstrate strong performance across multiple tests. Company has successfully validated connectivity across 2G, 4G, and 5G networks with unmodified smartphones.

**COMMERCIAL PROGRESS**
MNO partnership pipeline continues to expand with over 35 agreements covering 1.8 billion subscribers. AT&T and Vodafone remain anchor partners providing spectrum access and commercial validation.

**BLUEBIRD DEVELOPMENT**
First five commercial BlueBird satellites on track for completion in 2024. These satellites will be significantly more capable than BlueWalker 3, with larger phased arrays and higher power output.

**FUNDING POSITION**
Company maintains adequate liquidity runway. Management focused on non-dilutive funding sources including export credit agencies and strategic partner prepayments.`,
          assumptions: [
            { label: 'Price Target', value: '$23.00' },
            { label: 'MNO Partners', value: '35+' },
            { label: 'Covered Subs', value: '1.8B' },
          ],
          catalysts: [
            'BlueWalker 3 successful technology validation',
            '35+ MNO agreements covering 1.8B subscribers',
            'First 5 BlueBird satellites on track for 2024',
            'AT&T and Vodafone anchor partnerships',
          ],
        },
        // === May 23, 2022 - Q1 2022 Update (FULL REPORT) ===
        {
          date: '2022-05-23',
          action: 'Update',
          priceTarget: 31,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'Q1 2022 update ahead of BlueWalker 3 launch. Technology development on track with key milestones approaching.',
          reportSummary: `**BLUEWALKER 3 PREPARATION**
Company preparing for launch of BlueWalker 3 test satellite later in 2022. This will be the largest commercial communications array ever deployed in low Earth orbit, measuring 64 square meters.

**TECHNOLOGY VALIDATION AHEAD**
BlueWalker 3 will validate key technology assumptions including:
- Phased array deployment and operation in space
- Direct cellular connectivity to standard smartphones
- Multi-band operation across partner MNO spectrum
- Thermal management and power systems

**MNO PARTNERSHIP EXPANSION**
Partnership count continues to grow with new MOUs signed across multiple regions. Total addressable subscriber base through MNO partners now exceeds 1.5 billion.

**REGULATORY PROGRESS**
Working with FCC on Supplemental Coverage from Space (SCS) framework. Engaged with international regulators for global service authorization.`,
          assumptions: [
            { label: 'Price Target', value: '$31.00' },
            { label: 'BW3 Array', value: '64 sq meters' },
            { label: 'Partner Subs', value: '1.5B+' },
          ],
          catalysts: [
            'BlueWalker 3 launch preparation on track',
            'Largest commercial comms array (64 sq m) to be deployed',
            'MNO partnerships exceeding 1.5B subscribers',
            'FCC SCS framework engagement',
          ],
        },
        // === Nov 17, 2021 - Q3 2021 Update (FULL REPORT) ===
        {
          date: '2021-11-17',
          action: 'Update',
          priceTarget: 35,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'Q3 2021 update following SPAC completion. Company executing on technology development roadmap with BlueWalker 3 on schedule.',
          reportSummary: `**POST-SPAC PROGRESS**
AST SpaceMobile successfully completed SPAC merger in April 2021, providing capital to execute on technology development. Company focused on BlueWalker 3 development and MNO partnership expansion.

**BLUEWALKER 3 DEVELOPMENT**
Test satellite development progressing on schedule for 2022 launch. This satellite will demonstrate key technology including:
- 64 square meter phased array antenna
- Direct-to-device cellular connectivity
- Multi-band spectrum operation

**MNO PARTNERSHIP STRATEGY**
Partnership model validated with commitments from major carriers including Vodafone, AT&T, and Rakuten. Revenue share model provides alignment of interests between AST and MNO partners.

**TECHNOLOGY DIFFERENTIATION**
AST's approach using massive phased arrays enables compliance with OOBE limits that smaller satellites cannot achieve. This regulatory compliance creates meaningful barriers to entry.`,
          assumptions: [
            { label: 'Price Target', value: '$35.00' },
            { label: 'BW3 Launch', value: '2022' },
            { label: 'Array Size', value: '64 sq m' },
          ],
          catalysts: [
            'SPAC merger completed successfully',
            'BlueWalker 3 on track for 2022 launch',
            'Vodafone, AT&T, Rakuten partnerships',
            'Technology differentiation via massive phased arrays',
          ],
        },
        // === Aug 17, 2021 - Q2 2021 Update ===
        { date: '2021-08-17', action: 'Update', priceTarget: 35, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
        // === Jun 30, 2021 - Initiation (FULL REPORT) ===
        {
          date: '2021-06-30',
          action: 'Initiation',
          priceTarget: 35,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'Where No LEO Has Gone Before',
          source: 'Benzinga',
          sourceUrl: 'https://www.benzinga.com/',
          isFullReport: true,
          thesis: 'Initiating coverage with Buy rating and $35 price target. AST SpaceMobile represents a unique opportunity to provide cellular broadband connectivity directly to unmodified smartphones from space. The company\'s massive phased array technology differentiates it from competitors and enables regulatory compliance.',
          reportSummary: `**INVESTMENT THESIS**
AST SpaceMobile is developing a space-based cellular broadband network capable of providing connectivity directly to standard, unmodified smartphones. This "holy grail" of satellite communications has eluded the industry for decades, but AST's innovative approach using massive phased array antennas may finally make it possible.

**TECHNOLOGY DIFFERENTIATION**
Unlike competitors using smaller satellites with limited capability, AST deploys massive phased array antennas (64+ square meters) that enable:
- High-gain beams for smartphone connectivity
- Compliance with FCC Out-of-Band Emission limits
- Multi-band operation across MNO partner spectrum
- True broadband speeds (not just text/voice)

**MASSIVE TAM OPPORTUNITY**
The company targets two primary markets:
1. Supplemental Coverage: 284M mobile users in developed markets who experience coverage gaps
2. Connecting the Unconnected: 1.6B people globally without any broadband access

**MNO PARTNERSHIP MODEL**
AST's revenue share model with MNO partners provides:
- Spectrum access without AST owning spectrum
- Distribution through existing MNO customer bases
- Aligned incentives between AST and carriers
- De-risked go-to-market through established partners

**REGULATORY MOAT**
The company's technology is designed to comply with strict OOBE limits that smaller satellite designs cannot achieve. This creates meaningful barriers to entry and potential first-mover advantage in Supplemental Coverage from Space (SCS) regulation.`,
          assumptions: [
            { label: 'Price Target', value: '$35.00' },
            { label: 'Supplemental TAM', value: '284M users' },
            { label: 'Unconnected TAM', value: '1.6B people' },
            { label: 'Array Size', value: '64+ sq m' },
          ],
          catalysts: [
            'BlueWalker 3 test satellite launch (2022)',
            'Technology validation with unmodified smartphones',
            'MNO partnership expansion',
            'FCC SCS regulatory framework',
            'Commercial satellite production ramp',
          ],
          risks: [
            'Technology execution risk',
            'Regulatory approval uncertainty',
            'Competition from SpaceX and others',
            'Significant capital requirements',
            'Unproven business model at scale',
          ],
          methodology: 'Scenario-weighted DCF analysis with probability-weighted outcomes. Base case assumes successful technology deployment and commercial traction.',
        },
        // === Earlier updates (Quick Updates) ===
        { date: '2022-11-22', action: 'Update', priceTarget: 32, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
        { date: '2022-08-16', action: 'Update', priceTarget: 30, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
        { date: '2022-03-31', action: 'Update', priceTarget: 32, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
        { date: '2024-04-02', action: 'Update', priceTarget: 19, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BARCLAYS - Mathieu Robilliard (Coverage since July 2021)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Barclays',
      analyst: 'Mathieu Robilliard',
      coverageSince: 'July 2021',
      currentPT: 60,
      currentRating: 'Underweight',
      currentRatingNormalized: 'bearish',
      reports: [
        { date: '2025-10-17', action: 'Double Downgrade', priceTarget: 60, rating: 'Underweight', ratingNormalized: 'bearish', source: 'Seeking Alpha', sourceUrl: 'https://seekingalpha.com/', isFullReport: false },
        { date: '2025-10-01', action: 'PT Raise', priceTarget: 60, previousTarget: 38, rating: 'Overweight', ratingNormalized: 'bullish', source: 'GuruFocus', sourceUrl: 'https://www.gurufocus.com/', isFullReport: false },
        // === Mar 24, 2025 - PT Raise $15 → $38 (FULL REPORT) ===
        {
          date: '2025-03-24',
          action: 'PT Raise',
          priceTarget: 38,
          previousTarget: 15,
          rating: 'Overweight',
          ratingNormalized: 'bullish',
          reportTitle: 'Raising PT to $38, reiterate Overweight',
          source: 'Barclays Equity Research',
          isFullReport: true,
          thesis: 'AST has achieved important milestones over the past 12 months. There are still significant execution and technological risks ahead (as illustrated by our downside case), but as and when AST progresses through the next steps, we see material upside. PT raised 153% from $15 to $38 based on DCF with 14% WACC.',
          reportSummary: `**IMPORTANT MILESTONES ACHIEVED**
a/ On the operational front it has successfully launched and tested its BB1 satellites; started to manufacture its BB2 satellites and secured launch for up to 60 BB2 satellites (between April 2025 - YE2026). b/ On the financing side, AST issued a $460m convertible bond (4.25% coupon) in January 2025 raising its cash balance at c. $1bn, which together with its outstanding ATM means it is fully financed until YE2025. c/ On the commercial side, it signed a definitive commercial agreement until 2034 and the creation of a JV to serve MNOs in all European markets with Vodafone. AST also signed a deal with the US government that will generate c. $43m of revenues in 2025. d/Spectrum/Regulation: AST received an STA from the FCC to commence testing its services in the US. Also AST has signed a binding agreement to lease c. 45MHz of L-band spectrum from Ligado.

**COMPETITION LOOMS BUT AST HAS UNIQUE ATTRIBUTES**
There are number of competing projects on the Direct to Device/Direct to Cellular vertical but we believe AST business model presents strong advantage vs competing projects. Its partnership from the start with MNO means a/ access to terrestrial spectrum that can be used in current smartphones b/customer billing & care outsourced to experienced MNOs and most importantly the ability to market and sale its services to their existing customer base. This is major differentiation vs. Apple's services on Globalstar which operates on L-band that is not widely available on smartphones. Starlink has signed a similar deal with TMUS than AST has with VZ/AT&T and is quickly deploying D2D/C enabled satellites. However we believe the specs of AST satellites provide a competitive advantage: a/ the size of its antennas/satellites is significantly larger than Starlink's satellite and can therefore provide a much better and reliable service. b/the signing of a deal with Ligado for 45 MHz on L-band provides much more spectrum to AST than competitors. Lastly with Starlink focused essentially on the residential broadband market and hence representing a competitive risk for telecom operators, we believe that a number of MNOs will prefer to cooperate with AST which product is complementary to their mobile services rather than with a competitor on the broadband market.

**DCF VALUATION — $38 PRICE TARGET**
Our price target is derived from a DCF model using 14% WACC and 3% terminal growth rate.
- Value of explicit cash flows (15Y): $6,999M
- Terminal value (2041E): $5,916M
- Enterprise Value: $12,916M
- Net Debt/(Net Cash) YE 2025E: $235M
- Ligado payment NPV (2026E): ($438M)
- Equity Value: $12,243M
- Shares Outstanding: 323M
- Price Target: $38
- Upside/Downside: +54%

**FLEET MODELING**
Global coverage fleet (BB1): 5 satellites maintained 2024-2034, $23M/sat
Global coverage fleet (BB2): 28 in 2025E → 55 in 2026E → 90 by 2027E (maintained through 2034), $21M/sat
Global coverage fleet (BB3): Starts 2035 with 125 satellites, $24M/sat
Global capacity fleet (BBC): 30 in 2027E → 60 by 2028E → 115 by 2040E, $22-25M/sat
Total satellites: 5 (2024) → 33 (2025E) → 60 (2026E) → 95 (2027E) → 125 (2028E) → 155 (2030E) → 240 (2040E)`,
          assumptions: [
            { label: 'Price Target', value: '$38.00' },
            { label: 'Prev Target', value: '$15.00' },
            { label: 'PT Change', value: '+153%' },
            { label: 'WACC', value: '14%' },
            { label: 'Terminal Growth', value: '3%' },
            { label: 'EV', value: '$12,916M' },
            { label: 'Equity Value', value: '$12,243M' },
            { label: 'Shares O/S', value: '323M' },
            { label: 'Market Cap', value: '$8,137M' },
            { label: 'Stock Price', value: '$25.71' },
            { label: 'Upside', value: '+47.8%' },
          ],
          catalysts: [
            'BB1 satellites successfully launched and tested',
            'BB2 manufacturing started; secured launch for up to 60 BB2 (Apr 2025 - YE2026)',
            '$460M convertible bond (4.25% coupon) Jan 2025 → cash ~$1B',
            'Fully financed until YE2025 with ATM',
            'Vodafone JV: definitive commercial agreement until 2034 for all European MNOs',
            '$43M US government deal for 2025 revenues',
            'FCC STA granted to commence US testing',
            'Ligado spectrum deal: 45MHz L-band binding agreement',
          ],
          risks: [
            'Significant execution and technological risks remain',
            'Downside case illustrates risks if milestones not achieved',
            'Competition from Starlink D2D/C enabled satellites',
            'Ligado payment NPV of $438M due 2026E',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy24: '4', fy25: '78', fy26: '228', fy27: '598', fy28: '1,256' },
            { metric: 'EBITDA ($M)', fy24: '(179)', fy25: '(112)', fy26: '(48)', fy27: '314', fy28: '958' },
            { metric: 'Net Income ($M)', fy24: '(521)', fy25: '(262)', fy26: '(255)', fy27: '(9)', fy28: '570' },
            { metric: 'Diluted EPS', fy24: '($1.9)', fy25: '($0.8)', fy26: '($0.8)', fy27: '($0.0)', fy28: '$1.8' },
            { metric: 'FCF ($M)', fy24: '(300)', fy25: '(792)', fy26: '(1,238)', fy27: '(600)', fy28: '115' },
            { metric: 'Capex ($M)', fy24: '(174)', fy25: '(631)', fy26: '(615)', fy27: '(785)', fy28: '(721)' },
            { metric: 'Satellites', fy24: '5', fy25: '33', fy26: '60', fy27: '95', fy28: '125' },
          ],
          methodology: 'DCF model with 14% WACC and 3% terminal growth rate. 15-year explicit cash flow period through 2041E. Equity value of $12,243M divided by 323M shares = $38 PT.',
          fullNotes: `ESTIMATE CHANGES (New vs Old):
| Metric | 2025E New | 2025E Old | Change |
| Revenue | $78M | $34M | +131% |
| Revenue 2026E | $228M | $144M | +59% |
| Revenue 2027E | $598M | $345M | +73% |
| EBITDA 2027E | $314M | $90M | +247% |
| Net Income 2028E | $570M | $175M | +226% |

MARKET MULTIPLES:
| Metric | 2024 | 2025E | 2026E | 2027E | 2028E | 2029E | 2030E |
| P/E (x) | -14.3 | -32.2 | -33.8 | 401.5 | 13.2 | 7.2 | 4.8 |
| EV/EBITDA (x) | -38.7 | -73.1 | -195.8 | 32.1 | 10.4 | 4.9 | 2.9 |
| EFCF yield (%) | -2.3% | -9.1% | -8.5% | -7.6% | -0.5% | 8.3% | 22.7% |

CASH FLOW PROJECTIONS (2029E-2030E):
| Metric | 2029E | 2030E |
| Revenue | $2,206M | $2,875M |
| EBITDA | $1,884M | $2,524M |
| Net Income | $1,085M | $1,603M |
| FCF | $673M | $1,822M |
| Diluted EPS | $3.4 | $5.0 |

SATELLITE COST ASSUMPTIONS:
- BB1: $23M per satellite
- BB2: $21M per satellite
- BB3: $24M per satellite
- BBC (capacity): $22-25M per satellite

DISCLOSURE: Barclays Capital Inc. and/or one of its affiliates does and seeks to do business with companies covered in its research reports. Completed: 23-Mar-25, 19:26 GMT. Released: 24-Mar-25, 04:00 GMT.`
        },
        { date: '2022-11-15', action: 'Update', priceTarget: 15, rating: 'Overweight', ratingNormalized: 'bullish', isFullReport: false },
        { date: '2022-10-19', action: 'Update', priceTarget: 15, rating: 'Overweight', ratingNormalized: 'bullish', reportTitle: 'To Infinity and Beyond – Vol 2', source: 'StreetInsider', sourceUrl: 'https://www.streetinsider.com/', isFullReport: false },
        {
          date: '2021-07-12',
          action: 'Initiation',
          priceTarget: 29,
          rating: 'Overweight',
          ratingNormalized: 'bullish',
          reportTitle: 'Bridging Space and Earth',
          source: 'Benzinga',
          sourceUrl: 'https://www.benzinga.com/',
          isFullReport: true,
          thesis: 'Initiating coverage with Overweight rating. AST SpaceMobile\'s technology could bridge the digital divide by providing cellular connectivity from space directly to unmodified smartphones.',
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // B. RILEY SECURITIES - Mike Crawford (Coverage since October 2022)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'B. Riley Securities',
      analyst: 'Mike Crawford',
      coverageSince: 'October 2022',
      currentPT: 105,
      currentRating: 'Neutral',
      currentRatingNormalized: 'neutral',
      reports: [
        { date: '2026-01-13', action: 'Downgrade', priceTarget: 105, previousTarget: 95, rating: 'Neutral', ratingNormalized: 'neutral', source: 'MT Newswires', isFullReport: false, reportSummary: 'Downgraded to Neutral from Buy. PT raised to $105 from $95. Analyst notes sufficient time to evaluate potential drivers of additional upside in 2026 as company launches and integrates more productive Block 2 BlueBird satellites into its D2D constellation.' },
        { date: '2025-10-23', action: 'PT Raise', priceTarget: 95, previousTarget: 60, rating: 'Buy', ratingNormalized: 'bullish', source: 'GuruFocus', sourceUrl: 'https://www.gurufocus.com/', isFullReport: false },
        { date: '2025-08-01', action: 'PT Raise', priceTarget: 60, previousTarget: 44, rating: 'Buy', ratingNormalized: 'bullish', source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/', isFullReport: false },
        { date: '2025-06-16', action: 'PT Raise', priceTarget: 44, previousTarget: 15, rating: 'Buy', ratingNormalized: 'bullish', source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/', isFullReport: false },
        { date: '2022-11-15', action: 'Update', priceTarget: 15, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
        // === Oct 27, 2022 - Initiation of Coverage $15 (FULL REPORT - 18 pages) ===
        {
          date: '2022-10-27',
          action: 'Initiation',
          priceTarget: 15,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'ASTS Aims to Close Digital Divide with Space-Based Cellular Broadband Network—Initiating at Buy, $15 PT',
          source: 'B. Riley Securities Research',
          isFullReport: true,
          thesis: 'We initiate coverage of AST SpaceMobile, Inc. (ASTS) with a Buy rating and a 12-month price target of $15 per share. ASTS went public in April 2021 via a business combination with New Providence Acquisition Corp., a SPAC where nearly the entire $232M of cash rolled from the trust, plus another $230M from PIPE investors led by ASTS\'s strategic partners Rakuten, Vodafone, and American Tower. Backed by proprietary IP, including some 2,400 patented and pending claims, ASTS is constructing a global space-based cellular broadband network enabled by large, revolutionary pizza box-shaped satellites serving as radio repeaters in low Earth orbit (LEO) space. The company\'s first such satellite, BlueWalker 3 (BW3), is now hurtling through space at 17,000 mph, circumnavigating the Earth every 90 minutes after launching on a SpaceX Falcon 9 rideshare on September 10, and with ASTS ready to perform a critical phased array unfolding maneuver to deploy the 693-square-foot payload.',
          reportSummary: `**SUMMARY AND RECOMMENDATION**
ASTS strives to connect the billions of unconnected individuals, as well as the billions of mobile subscribers moving in and out of cellular coverage zones, not competing against but partnering with mobile network operators (MNOs) in a wholesale, B2B business model featuring revenue share with MNO partners and low to no subscriber acquisition costs (SAC) for ASTS. Moreover, the SpaceMobile network is designed to operate directly with existing, unmodified mobile devices and without any separate costly ground antenna. We believe BW3 will withstand structural dynamics, thermal management, and other cellular-to-satellite link challenges, demonstrating a successful network architecture, which ASTS intends to begin deploying in 2023 with the launch of five "Block 1 BlueBird" satellites, enabling initial service. To be sure, the global market is massive—including 5.3B unique cellular subscribers, plus another 2.6B people who remain unconnected—and with ASTS already talking with 25 MNOs representing 1.8B potential mobile subscribers. Our $15 PT equates to a $3.0B EV at the end of FY23e.

**KEY POINTS**

• Billions upon billions. Just as Carl Sagan sent the first physical messages into space and searched for life among billions upon billions of stars, ASTS founder Abel Avellan wants to connect billions of people on Earth—both the currently unconnected and those roaming outside of terrestrial cell service coverage—and to potentially generate billions of dollars of profits for AST SpaceMobile investors in the process.

• Ample runway to revenue. ASTS carried $197M net cash on its books at 2Q22 and offset most of its 3Q operational burn with $27M received in early September, following the close of the sale of its 51% majority-owned NanoAvionics satellite manufacturing subsidiary to Kongsberg Defense (at a 3.6x LTM EV/revenue multiple no less), deemed surplus to requirements given that ASTS now is capable of producing two satellites/month with its 35,000 square feet of clean-room manufacturing capacity at its Midland, Texas, headquarters. Additionally, ASTS is readying an adjacent facility that, when placed into production, is expected to bring clean-room capacity to 135,000 square feet, lifting production capacity to six satellites/month.

• Unfettered connectivity. If SpaceMobile service works as expected, we believe ASTS will have a killer application and go on to be a multi-billion-dollar stock. We see the utility of unfettered connectivity via satellite outside of existing, limited cellular footprints as without question. We also believe a planned 50-50 incremental revenue share with MNO partners is reasonable and sustainable. Consider, to provide a sense of scale, that just a 10% penetration of existing engaged MNOs and an incremental $2/month gross revenue share to the partners would result in over $2B in revenue annually for ASTS.

• Smart money. We look at Vodafone, Rakuten, and American Tower as early and repeat strategic investors, with these three (along with Samsung) comprising ASTS's $111M Series B round before coming back for another bite in the $230M business combination PIPE. We doubt Hiroshi Mikitani, the billionaire founder and CEO of Rakuten, which owns 17% of the company, would continue to invest in ASTS without performing extensive due diligence. In the same vein, Vodafone (bringing its 265M mobile subscribers) has not just an MOU with ASTS but also mutually exclusive rights in most of its markets.

**BLUEWALKER 3 TEST SATELLITE**
ASTS began construction of its BW3 test satellite in 2H19 following its Series B round, investing a total of ~$87M, much of which was related to one-time R&D expenditures that are not expected to show up in future commercial satellite costs, which we estimate are running at around $16M each for the Block 1 BlueBirds. On September 10, 2022, ASTS successfully launched BW3, the largest commercial communications array ever deployed to LEO. ASTS engineers made contact with BW3 less than an hour after takeoff, and BW3 is now circling the Earth, thermally stable, and communicating with ground stations.

CEO Abel Avellan tweeted on October 5 that the company planned to unfold the ~1,500 kg, 64-square-meter (693-square-foot) phased array satellite, which was folded into a cube to fit in the rocket, "in the second half of October during optimal conditions," a timeline that now has pushed to "on or about November 10" given optimal solar power generation conditions for deployment. This deployment mission, when accomplished, will orient the satellite's array of antenna elements pointing down toward Earth and its solar elements facing the Sun, and we see successful array deployment as a near-term positive catalyst for ASTS shares.

**SPACEMOBILE SERVICE MODEL**
ASTS is going to market with MNOs under a 50-50 revenue share model to offer SpaceMobile directly to partners' existing mobile subscribers, seamless to the end user. As envisioned, subscribers roaming beyond terrestrial cellular footprints will receive text messages to their phones asking if they would like to turn on SpaceMobile service. On top of this envisioned "day pass" offering, ASTS and its partners are exploring a monthly add-on tier for consumers and enterprises where, for a fixed monthly rate, users can add SpaceMobile as a supplemental service to their existing cellular plans, enabling users' devices to automatically connect to the SpaceMobile network upon entering areas without terrestrial cell coverage.

**CONSTELLATION BUILD PLAN**
While BB1 through BB5 will each be similar in size and weight to BW3, we believe ASTS will look to launch larger arrays in subsequent batches, starting with a next-gen or Block 2 of BlueBirds where ASTS hopes to demonstrate 1.3M GB/month of capacity from each satellite, and eventually building up to 2x the size of BW3 per initial BB business plans, implying a targeted endpoint of ~128-square-meter phased array satellites that will weigh more than 3,000 kg each.

• By the time ASTS has 20 commercial BBs in orbit, we believe in early 2025, ASTS expects to be able to deliver service to 49 countries along the equator, addressing an ~1.6B population
• 110-satellite constellation expected to enable full global mobile coverage for major MNO partners
• Final 58-satellite batch would bring constellation to 168 BBs for full global MIMO coverage with faster data rates

**COMPETITOR ANALYSIS**
• Lynk Global: Closest pure-play competitor with similar MNO partnership model. Claims 15 commercial contracts covering 36 countries representing >240M subscribers. Behind ASTS in development; link-challenged given undersized antenna aperture compared with family-sized BlueBird satellites.
• Skylo Technologies: NB-IoT connectivity focus using existing Inmarsat GEO satellites. Raised $116M through two rounds. Not compatible with standard cell phones.
• Sateliot: Spanish startup focused on 5G NB-IoT devices. Raised €10M Series A; needs additional ~$100M for full 250-satellite constellation.
• Omnispace: Owns near-global 2 GHz spectrum assets. Operating two LEO prototypes; targeting 200 LEO + 15 MEO satellites operational in 2024.
• SpaceX/T-Mobile: Announced Starlink V2 direct-to-cellular for text messaging in August 2022.
• Apple/Globalstar: First mover with Emergency SOS from space on iPhone 14.

**LONG-TERM REVENUE POTENTIAL**
Potential constellation-build ROI remains stellar. ASTS's B2B wholesale business model with revenue share and links to existing, unmodified endpoints means the company spends essentially nothing on subscriber acquisition cost. We believe ARPU assumptions of $7–$8 per month in the U.S. and Europe, combined with a $1 cost to users in poorer equatorial regions and perhaps $2/month in the rest of the world, work to ASTS being able to generate over $9B revenue if it hits its 373M-subscriber number.

We see little reason why cash opex should scale much beyond $200M given the sheer amount of manufacturing and engineering resources ASTS already has at its disposal and with little need for a larger sales, billing, or customer services footprint given the company's super wholesale model. This means most of ASTS' revenue, after covering fixed costs, flows straight to operating income, with the potential at scale to attain 90%+ EBITDA margins.

Although ASTS at something approaching a steady state will start having to replace its satellites, BlueBirds currently are designed to an expected operational life exceeding seven years. Even if ASTS had to replace 20% of its constellation every year, this would mean building and launching ~37 BlueBirds per year, at around a $600M expense.`,
          assumptions: [
            { label: 'Price Target', value: '$15.00' },
            { label: 'Stock Price (10/26/22)', value: '$6.14' },
            { label: '52-Week Range', value: '$4.84-$14.27' },
            { label: 'Market Cap', value: '$1,123.4M' },
            { label: 'Enterprise Value', value: '$918.4M' },
            { label: 'Shares Out', value: '183.0M' },
            { label: 'Float', value: '67.2%' },
            { label: 'Valuation Basis', value: '$3.0B EV at end of FY23e' },
            { label: 'Satellite Cost (Block 1)', value: '~$16M per satellite' },
            { label: 'Full Constellation Cost Est', value: '$2.0-2.7B (168 satellites)' },
            { label: 'MNO Partners', value: '25 MNOs representing 1.8B subs' },
          ],
          catalysts: [
            'BlueWalker 3 phased array deployment (693 sq ft) - November 2022',
            'BW3 in-orbit testing with AT&T, Vodafone, Rakuten, Orange - Q4 2022',
            'Block 1 BlueBird (BB1-BB5) launch expected 2H23',
            'Initial time-limited SpaceMobile service - Q4 2023',
            'Expansion to 20 satellites for equatorial coverage - early 2025',
            '110 satellites for full global MNO partner coverage',
            'Ethiopia early-access market via Vodafone/Safaricom partnership',
          ],
          risks: [
            'History of operating losses — no assurance of sustained profitability',
            'Capital-intensive business — significant expenses for constellation development',
            'Third-party launch provider dependency — delays or price increases',
            'SpaceMobile service still in development — not yet commercialized',
            'Capital access — needs additional funds for full constellation deployment',
            'Regulatory approvals required in each country for landing rights',
            'Reliance on MNO partners for spectrum access and revenue generation',
            'Competition from Starlink, Lynk Global, Apple/Globalstar and others',
            'Currency exchange risk from international MNO agreements',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy22: '9.7', fy23: '1.0', fy24: '23.9' },
            { metric: 'EBITDA ($M)', fy22: '(131.2)', fy23: '(157.2)', fy24: '(152.2)' },
            { metric: 'EV/Revenue', fy22: '49.1x', fy23: '1,193.3x', fy24: '61.9x' },
            { metric: 'EV/EBITDA', fy22: '(7.5)x', fy23: '(7.8)x', fy24: '(10.0)x' },
            { metric: 'Net Cash (2Q22)', value: '$197M' },
          ],
          methodology: '$15 PT represents $3.0B EV at end of FY23e. Business model assumes 50-50 revenue share with MNOs, minimal SAC due to wholesale model. At scale, 90%+ EBITDA margins achievable. ARPU: $7-8/month US/Europe, $1-2/month developing markets. 10% penetration of engaged MNOs = $2B+ annual revenue for ASTS.',
          fullNotes: `FOUNDING AND FUNDING HISTORY:
• January 2017: Abel Avellan provided $6M seed funding (six months after selling EMC for $550M)
• June 2018: $10M Series A from Cisneros
• 2019-2020: $111M Series B led by Rakuten ($79M), Vodafone ($25M), American Tower ($6M), Samsung Next ($1M)
• April 2021: Business combination with New Providence Acquisition Corp. — $232M cash roll + $230M PIPE
• September 2022: $27M from NanoAvionics sale to Kongsberg Defense at 3.6x LTM EV/revenue
• Total shares: 53M Class A, 52M Class B, 78M Class C (super-voting held by CEO Avellan = 88.3% voting power)

BALANCE SHEET DATA (2Q22):
• Cash & Equivalents: $202.4M
• Accounts Receivable: $3.6M
• Accounts Payable: $13.8M
• Total Debt: $4.9M
• Shareholders' Equity: $310.3M

MANUFACTURING CAPABILITIES:
• Current: 35,000 sq ft clean-room at Midland, Texas HQ = 2 satellites/month capacity
• Expansion: Adjacent facility to bring capacity to 135,000 sq ft = 6 satellites/month
• Block 1 BlueBird cost: ~$16M per satellite (up 14% due to inflation)
• 168-satellite full constellation: $2.0-2.7B total capex

NOKIA PARTNERSHIP:
• Five-year partnership for critical network infrastructure
• AirScale portfolio integration into ground station gateways
• AirScale Baseband module: up to 90k simultaneous connected users per box
• AirScale Single RAN: 4G and 5G integration
• NetAct solution for network management
• Nokia Bell Labs engineering support

LANDING RIGHTS SECURED:
• FCC experimental license (May 2022): Texas and Hawaii landing rights for BW3
• Countries with L Band and V Band frequency landing rights: Nigeria, Kenya, Papua New Guinea, and 4 others
• Test licenses in 10 additional countries including Japan (expected imminent)
• Ethiopia expected via Vodafone/Safaricom $850M license ($8B investment pledge)

SATELLITE SERVICES COMPS (FY23E):
| Company | EV/Sales | EV/EBITDA | EBITDA Margin |
| Eutelsat | 4.1x | 5.6x | 76.0% |
| Globalstar | 5.2x | 98.8x | 29.0% |
| Iridium | 17.1x | 10.3x | 59.8% |
| EchoStar | 2.8x | 2.5x | 31.2% |
| SES | 5.9x | 5.6x | 55.4% |
| Sirius XM | 3.8x | 11.3x | 31.1% |
| Viasat | 3.8x | 6.2x | 25.1% |
| Median | 3.8x | 6.2x | 31.2% |

MANAGEMENT TEAM:
• Abel Avellan (Founder, Chairman, CEO): 25+ years space industry; inventor on 24 US patents; founded EMC (sold for $550M in 2016)
• Sean Wallace (CFO): Former VP/CFO/Treasurer at Cogent Communications; 30+ years finance experience
• Dr. Huiwen Yao (CTO): Former Northrop Grumman; 55+ technical papers; 2 US patents
• Scott Wisniewski (EVP, Chief Strategy Officer): Former Barclays TMT Investment Banking MD; helped raise $3B for OneWeb
• Shanti Gupta (SVP, Chief Accounting Officer): Former EY partner; 25+ years experience

BOARD OF DIRECTORS:
• Mickey (Hiroshi) Mikitani: Founder/Chairman/CEO of Rakuten Group
• Luke Ibbetson: Head of Group R&D for Vodafone; NGMN Alliance Board Strategy Chairman
• Adriana Cisneros: CEO of Cisneros
• Tareq Amin: CEO of Rakuten Mobile
• Ed Knapp: CTO of American Tower
• Richard Sarnoff: Partner at KKR
• Ronald Rubin: Co-founder Tower Alliance & Southcom Holdings
• Alexander Coleman: Chairman New Providence Acquisition Corp. II

DISCLOSURE: B. Riley Securities, Inc. Mike Crawford, Senior Research Analyst. (310) 689-2241. October 27, 2022. Technology: Communications. Discovery Group.`
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // UBS - Christopher Schoell (Coverage since March 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'UBS',
      analyst: 'Christopher Schoell',
      coverageSince: 'March 2025',
      currentPT: 43,
      currentRating: 'Neutral',
      currentRatingNormalized: 'neutral',
      reports: [
        // === Sep 9, 2025 - Downgrade (FULL REPORT) ===
        {
          date: '2025-09-09',
          action: 'Downgrade',
          priceTarget: 43,
          previousTarget: 62,
          rating: 'Neutral',
          ratingNormalized: 'neutral',
          source: 'Seeking Alpha',
          sourceUrl: 'https://seekingalpha.com/',
          isFullReport: true,
          thesis: 'Downgrading to Neutral from Buy with PT cut to $43 from $62. Starlink competitive threat has increased materially following SpaceX\'s expanded DTC beta and carrier partnerships.',
          reportSummary: `**DOWNGRADE RATIONALE**
We are downgrading ASTS to Neutral from Buy and cutting our PT to $43 from $62. While we remain constructive on the long-term DTC opportunity, near-term competitive dynamics have shifted unfavorably following SpaceX's accelerated Starlink DTC rollout and expanded carrier partnerships.

**STARLINK COMPETITIVE THREAT**
SpaceX has made faster-than-expected progress on Starlink direct-to-cell:
- Expanded beta service to additional carriers
- Demonstrated text messaging capability at scale
- Secured regulatory approvals in multiple markets
- Announced plans for voice and data service expansion

**VALUATION RESET**
We are reducing our multiple from 11x to 9x 2028E EBITDA to reflect increased competitive risk. Our new $43 PT implies meaningful upside from current levels but acknowledges higher uncertainty around market share assumptions.

**MAINTAINING CONSTRUCTIVE VIEW**
Despite the downgrade, we believe ASTS technology offers differentiated capabilities (true broadband vs text-only) that should enable meaningful market share. However, the competitive environment warrants a more cautious stance.`,
          assumptions: [
            { label: 'Price Target', value: '$43.00' },
            { label: 'Prev Target', value: '$62.00' },
            { label: 'EV/EBITDA Multiple', value: '9x (was 11x)' },
            { label: 'Discount Rate', value: '14%' },
          ],
          risks: [
            'Starlink competitive pressure increasing',
            'Market share assumptions at risk',
            'Execution risk on commercial launch',
            'Regulatory uncertainty in key markets',
          ],
        },
        // === Aug 14, 2025 - PT Raise to $62 (FULL REPORT) ===
        {
          date: '2025-08-14',
          action: 'PT Raise',
          priceTarget: 62,
          previousTarget: 38,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          source: 'GuruFocus',
          sourceUrl: 'https://www.gurufocus.com/',
          isFullReport: true,
          thesis: 'ASTS made progress on several fronts in recent months and its partners lend credibility to its tech/funding. Our PT is now based on 11x \'28E EBITDA discounted back at 14%. This sits toward the high-end of satellite comps (7-12x over past 5 yrs). Prior PT was based on 9x \'28E EBITDA (discounted at 14%) but we believe a higher multiple is justified given regulatory, partner & funding progress and faster LT growth.',
          reportSummary: `**BUY RATED**
ASTS made progress on several fronts in recent months and its partners lend credibility to its tech/funding. Our PT is now based on 11x '28E EBITDA discounted back at 14%. This sits toward the high-end of satellite comps (7-12x over past 5 yrs). Prior PT was based on 9x '28E EBITDA (discounted at 14%) but we believe a higher multiple is justified given regulatory, partner & funding progress and faster LT growth.

**KEY PROGRESS POINTS**
1. FCC approved initial space-based operations
2. First 5 commercial satellites delivered to Florida
3. 1H September 2024 launch imminent
4. 17 Block 2 satellites in production
5. 45+ carrier agreements serving 2.8B+ subs
6. Government traction increasing

**ESTIMATE CHANGES**
- 2028E Revenue: $1.8B (was $1.1B) — effectively pulls forward 2030 estimate by 2 years
- 2028E EBITDA Margin: ~70% (was ~60%)
- Multiple: 11x (was 9x)

**TAM FRAMEWORK**
Method 1 (Partner subs): 2.8B subs × 5-15% penetration × $5-15/pass × 50% rev share = $500M-$3B
Method 2 (Capacity): 100 sats × 1M GB/sat/mo × $2.5-5/GB = $4-8B/yr at full utilization

Prior base case implied ~15% utilization. Upside scenarios assume higher utilization driven by multiple use cases including government.`,
          assumptions: [
            { label: 'Price Target', value: '$62.00' },
            { label: 'Prior Target', value: '$38.00' },
            { label: 'Stock Price', value: '$20.81' },
            { label: 'EV/EBITDA Multiple', value: '11x (was 9x)' },
            { label: 'Discount Rate', value: '14%' },
            { label: '2028E Revenue', value: '$1.8B (was $1.1B)' },
            { label: '2028E EBITDA Margin', value: '~70% (was ~60%)' },
            { label: 'Funding Need', value: '$275-325M' },
          ],
          catalysts: [
            'FCC approved initial space-based operations',
            'First 5 commercial satellites delivered to Florida',
            '1H September 2024 launch imminent',
            '17 Block 2 satellites in production',
            '45+ carrier agreements serving 2.8B+ subs',
            'Government traction increasing',
          ],
          risks: [
            'Launch execution risk',
            'Technology scaling challenges',
            'Funding requirements ($275-325M for 25 satellites)',
            'Competitive dynamics',
            'Regulatory approvals in international markets',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy24: '3,650', fy25: '20,535', fy26: '420,468', fy27: '973,814', fy28: '1,787,923' },
            { metric: 'EBIT ($M)', fy24: '(214,757)', fy25: '(255,282)', fy26: '(35,221)', fy27: '120,995', fy28: '620,771' },
            { metric: 'EPS (diluted)', fy24: '($1.13)', fy25: '($0.97)', fy26: '($0.33)', fy27: '$0.38', fy28: '$1.93' },
            { metric: 'Net debt/cash ($M)', fy24: '75,839', fy25: '(120,778)', fy26: '(413,958)', fy27: '(433,025)', fy28: '16,066' },
          ],
          methodology: '11x 2028E EBITDA discounted back at 14%. Higher multiple (vs 9x prior) justified by regulatory approval, partner progress, and faster growth trajectory. Sits at high-end of satellite comps (7-12x range).',
          fullNotes: `ESTIMATE CHANGES:
- 2028E Revenue: $1.8B (was $1.1B) — effectively pulls forward 2030 estimate by 2 years
- 2028E EBITDA Margin: ~70% (was ~60%)
- Multiple: 11x (was 9x)

TAM FRAMEWORK:
Method 1 (Partner subs): 2.8B subs × 5-15% penetration × $5-15/pass × 50% rev share = $500M-$3B
Method 2 (Capacity): 100 sats × 1M GB/sat/mo × $2.5-5/GB = $4-8B/yr at full utilization

Prior base case implied ~15% utilization. Upside scenarios assume higher utilization driven by multiple use cases including government.

FUNDING:
$275-325M needed to launch 25 satellites (down from $350-400M prior). Expect capital raise in 2025.

DISCLOSURE: UBS does and seeks to do business with companies covered in its research reports.`
        },
        // === Aug 14, 2024 - Initiation at $30 (FULL REPORT) ===
        {
          date: '2024-08-14',
          action: 'Initiation',
          priceTarget: 30,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'Initiating coverage with Buy rating and $30 price target. ASTS represents a unique investment opportunity in the emerging direct-to-device satellite market.',
          reportSummary: `**INITIATION OF COVERAGE**
We are initiating coverage of AST SpaceMobile with a Buy rating and $30 price target. The company is positioned to capture a significant share of the emerging direct-to-device (DTC) satellite market.

**INVESTMENT THESIS**
ASTS offers differentiated technology that enables true broadband connectivity to standard smartphones from space. Unlike competitors limited to text messaging, ASTS satellites can deliver 4G/5G data speeds for browsing, streaming, and video calls.

**VALUATION**
Our $30 PT is based on 9x 2028E EBITDA discounted back at 14%. This sits at the mid-range of satellite comps (7-12x over past 5 years).

**KEY CATALYSTS**
- First 5 commercial BlueBird satellites launching September 2024
- US commercial service expected late 2024/early 2025
- Continued MNO partnership expansion
- Government contract opportunities`,
          assumptions: [
            { label: 'Price Target', value: '$30.00' },
            { label: 'EV/EBITDA Multiple', value: '9x' },
            { label: 'Discount Rate', value: '14%' },
          ],
        },
        { date: '2025-03-05', action: 'PT Raise', priceTarget: 38, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SCOTIABANK - Andres Coello (Coverage since August 2024)
    // FULL DETAILED REPORTS PRESERVED
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Scotiabank',
      analyst: 'Andres Coello',
      coverageSince: 'August 2024',
      currentPT: 45.60,
      currentRating: 'Sector Underperform',
      currentRatingNormalized: 'bearish',
      reports: [
        // === Jan 6, 2026 - Downgrade to Sector Underperform (FULL REPORT) ===
        // Title: "Downgrading to Sell on Valuation: Starlink's Space Leadership Means ASTS Faces an Uphill Battle"
        {
          date: '2026-01-06',
          action: 'Downgrade',
          priceTarget: 45.60,
          rating: 'Sector Underperform',
          ratingNormalized: 'bearish',
          source: 'Scotiabank Equity Research',
          isFullReport: true,
          reportTitle: 'Downgrading to Sell on Valuation: Starlink\'s Space Leadership Means ASTS Faces an Uphill Battle',
          thesis: 'Downgrade to Sector Underperform. Stock at $97.49 ($35.8B market cap) has overshot to irrational levels. Still no retail customers, needs ~50 satellites for continuous service (late 2026/early 2027). Slow U.S./Japan adoption (KDDI only 6%), modest ARPUs ($2.92 vs Starlink $85), high capex mean EFCF may not come until 2028-29. Starlink\'s accelerated growth poses existential competitive threat with 2-year head start. 5-year delay (110 sats by 2023 → now 2027/2028) gave Starlink time to become absolute leader. Valuation range: $45-55/share.',
          reportSummary: `**OUR TAKE: Negative**
Without yet a single retail customer and faced by the challenge of orbiting ~50 satellites to hit continuous service in a handful of markets in late 2026 or early 2027, ASTS's share price at US$97.49/share has once again overshot to what we see as irrational levels (market cap of US$35.8B).

**SLOW ADOPTION & HIGH CAPEX**
Evidence of slow user adoption in the U.S. and Japan, modest ARPUs and high capex (including duplicated satellites for new frequencies) means investors may have to wait until 2028 or 2029 for tangible EFCF generation. ASTS commercial launch in U.S. may have to wait until early 2027, while carriers overseas may have to wait until 2028 or 2029.

**KDDI JAPAN: ONLY 6% ADOPTION**
Early figures by KDDI in Japan suggest only 6% of the wireless base subscribed to the new service (launched earlier last year). Japan is a highly penetrated market with impressive tower density (KDDI operates more towers than Vivo or TIMB in Brazil, a country with 21x Japan's landmass). DTC opportunity in other territories such as the Americas should be greater, but 225M paid subscribers by 2028 looks aggressive.

**STARLINK COMPETITIVE THREAT**
Starlink's accelerated fixed growth and global brand recognition means ASTS competes with a leader that already has, in terms of revenues, the equivalent of 340 million global DTC users (~680 million by the time ASTS launches in select markets). While it has been an ordeal for ASTS to launch seven satellites since 2017, in 2025 alone Starlink orbited 3,126 units. Starlink's ARPU is $85/month — 34x greater than ASTS's modest $2.5/month blended ARPU.

**STARLINK'S NETFLIX-LIKE GROWTH**
What made Netflix such a powerful substitute wasn't only superior technology and UI, but the ability to dilute content costs among a global base, making it virtually impossible for local broadcasters to compete. Starlink has similar characteristics: easy install (15 minutes), autonomous from utilities, long-reach modem, cleaner product (fewer cables). At current growth rate, Starlink could have 20M subs a year from now. In 47 days, Starlink added 1M subs (8M→9M from Nov 5 to Dec 22, 2025) — what took a full year in 2022-2023.

**STARLINK 2-YEAR ADVANTAGE**
Starlink has a two-year advantage over ASTS, which may lose customers impatient to get service. Starlink operates 650 DTC satellites. Recent partnerships with Liberty LatAm (Jamaica, Melissa emergency), Virgin-O2 UK (Telefónica/Liberty Global) suggest some carriers with ASTS MOUs may not wait until 2027-2028 for DTC service. EchoStar deal adds 10 MHz AWS H-Block + 40 MHz AWS-4 + global MSS licenses with optimized 5G protocols.

**NEXT-GEN STARLINK DTC**
Next generation of DTC satellites will feature custom SpaceX silicon, advanced phased array antennas, thousands of spatial beams, delivering 20x higher throughput per satellite and 100x overall system capacity, enabling a 5G experience. DTC sats operate at 360km altitude, connect to Starlink's broader laser mesh network of over 9,000 satellites, and function as cell towers in space with regenerative architecture. This is a particular differentiating advantage over ASTS, which lacks a fixed constellation for wireless meshing.

**48-HOUR DELAY = FALLING FURTHER BEHIND**
"To be clear, as little as a 48-hour delay (let alone weeks or months) means ASTS will fall further behind Starlink, which is completing a mission every one to two days." Starlink guiding to launch first Starship load soon (satellites expelled like bread from a toaster); next-gen DTC satellites 100x more powerful than current 650.

**MEXICO / TELCEL RISK**
Concerned about Starlink's coming launch in Mexico, home to América Móvil (world's 4th-largest wireless company). If Starlink succeeds in partnering with Telcel, sell-side analysts may have to slash their subs projections for ASTS in South America and Southeast Europe.

**SPECTRUM LIMITATION**
ASTS satellites can only operate in low spectrum, requiring entirely new satellites in mid-band frequencies (e.g. Ligado).

**TIMING TRACK RECORD**
"The technology is impressive, but we cannot remember a single time when the company got timing right." In late 2020, ASTS was guiding to have 110 satellites in orbit by 2023, a goal that — if all goes according to plan — may now be achieved in 2027 or 2028. This five-year delay allowed Starlink not only to get two years ahead of ASTS in the direct-to-cell race (Starlink's DTC now positioned to serve one billion people), but to become the absolute leader on the satellite fixed-broadband side in 150 countries.

**BALANCED VIEW**
We disagree with those seeing ASTS as a "meme stock"; the technology remains highly disruptive and with potential for dual use. But we also disagree with those dismissing ASTS's multi-year delays and Starlink's unstoppable growth. The middle-ground scenario points to a valuation range between US$45/share and US$55/share. Sell.`,
          catalysts: [],
          risks: [
            'Still zero retail customers',
            'Need ~50 satellites for continuous service (late 2026/early 2027)',
            'Slow user adoption in U.S. and Japan (KDDI only 6% of wireless base)',
            'Modest ARPUs ($2.92 blended vs Starlink $85/month — 34x gap)',
            'High capex including duplicated satellites for new frequencies',
            'EFCF may not materialize until 2028-2029',
            '5-year delay: 110 sats by 2023 guidance → now 2027/2028',
            'Starlink 2-year head start in DTC race',
            'Starlink orbited 3,126 satellites in 2025 alone (9,500 cumulative)',
            'Starlink equivalent of 340M DTC users (~680M by ASTS launch)',
            'Starlink 47 days to add 1M subs (vs full year in 2022-2023)',
            'Starlink could have 20M subs within a year at current pace',
            'Starlink next-gen: 100x more powerful, 20x throughput, custom SpaceX silicon',
            'Starlink laser mesh network of 9,000+ satellites (ASTS lacks wireless meshing)',
            'Virgin-O2, Liberty LatAm deals suggest carriers may not wait for ASTS',
            'Mexico/Telcel risk: If Starlink partners with América Móvil, ASTS LatAm projections at risk',
            'ASTS satellites only operate in low spectrum — need new satellites for mid-band (Ligado)',
            '48-hour delay = falling further behind (Starlink mission every 1-2 days)',
            'First Starship load coming (satellites "like bread from toaster")',
          ],
          assumptions: [
            { label: 'Stock Price', value: '$97.49' },
            { label: 'Market Cap', value: '$35,781M' },
            { label: 'Enterprise Value', value: '$35,626M' },
            { label: 'Shares O/S', value: '367M' },
            { label: 'Float O/S', value: '155M' },
            { label: 'Net Debt + Pref', value: '$(155)M' },
            { label: '1-Yr Return', value: '-53.2%' },
            { label: 'Valuation Range', value: '$45-55/share' },
            { label: 'Continuous Service', value: 'Late 2026/Early 2027' },
            { label: 'Satellites Needed', value: '~50' },
            { label: 'US Commercial Launch', value: 'Early 2027' },
            { label: 'Overseas Carriers', value: '2028-2029' },
            { label: 'EFCF Timeline', value: '2028-2029' },
            { label: '2028E EFCF', value: '$3.5B' },
            { label: '2028E Paid Subs', value: '225M' },
            { label: 'Global Avg ARPU', value: '$2.92/sub' },
            { label: 'Starlink ARPU', value: '$85/month (34x ASTS)' },
            { label: 'Starlink DTC Sats', value: '650' },
            { label: 'Starlink 2025 Launches', value: '3,126' },
            { label: 'Starlink Total Launches', value: '9,500 cumulative' },
            { label: 'Starlink Fixed Subs', value: '6M monthly users (expanding to 1B)' },
            { label: 'KDDI Japan Adoption', value: 'Only 6% of wireless base' },
          ],
          estimates: [
            { metric: 'EBITDA ($M)', fy24: '(147)', fy25: '(180)', fy26: '516', fy27: '2,744', fy28: '5,236' },
            { metric: 'Organic Capex ($M)', fy24: '(174)', fy25: '(997)', fy26: '(1,366)', fy27: '(1,003)', fy28: '(1,560)' },
            { metric: 'Net Interest Paid ($M)', fy24: '(5)', fy25: '15', fy26: '(89)', fy27: '(96)', fy28: '(84)' },
            { metric: 'Cash Taxes ($M)', fy24: '(2)', fy25: '(1)', fy26: '0', fy27: '(69)', fy28: '(75)' },
            { metric: 'FCF ($M)', fy24: '(328)', fy25: '(1,163)', fy26: '(939)', fy27: '1,486', fy28: '3,517' },
            { metric: 'FCF per Share', fy24: '(1.1)', fy25: '(3.2)', fy26: '(2.6)', fy27: '4.0', fy28: '9.4' },
            { metric: 'NPV of FCF/Share', fy24: '(2.9)', fy25: '(2.0)', fy26: '2.8', fy27: '5.8', fy28: '8.7' },
            { metric: 'Current FCF Yield', fy24: '-1.1%', fy25: '-3.3%', fy26: '-2.6%', fy27: '4.1%', fy28: '9.6%' },
          ],
          methodology: `Equity Free Cash Flow model demanding 12.7% yield on the present value of first year of meaningful EFCF generation (2028). This is well above SpaceMobile's 10.0% 10Y funding cost, reflecting 37% proportional difference vs Telecom sector average 7.3% funding cost. Telecom 10Y Average FCF Yield is 9.3%.

VALUATION CALCULATION:
• SpaceMobile 10Y Funding Cost: 10.0%
• Telecom 10Y Average Funding Cost: 7.3%
• SpaceMobile Proportional Difference vs Sector Avg: 37.0%
• Telecom 10Y Average FCF Yield: 9.3%
• Fair FCF Yield (d/e * g): 12.7%
• Value per share (b/h): $45.6

2028E ASSUMPTIONS:
• EFCF: $3.5B
• Paid subscribers: 225M
• Global average ARPU: $2.92/sub
• "Not a conservative projection"

Middle-ground valuation scenario points to $45-55/share range. Current price of $97.49 deemed irrational given execution delays, Starlink competitive dynamics, and need for entirely new satellites for mid-band spectrum.`,
          fullNotes: `REPORT TITLE: "Downgrading to Sell on Valuation: Starlink's Space Leadership Means ASTS Faces an Uphill Battle"

CAPITALIZATION:
| Metric | Value |
| Market Cap (M) | $35,781 |
| Net Debt + Pref (M) | $(155) |
| Enterprise Value (M) | $35,626 |
| Shares O/S (M) | 367 |
| Float O/S (M) | 155 |

PERTINENT REVISIONS:
| | New | Old |
| Rating | SU | SP |

VALUATION MODEL (Exhibit 7) - USD M Unless Otherwise Stated:
| Metric | 2024A | 2025E | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
| EBITDA | (147) | (180) | 516 | 2,744 | 5,236 | 8,664 | 15,062 | 22,061 | 26,458 |
| Organic Capex | (174) | (997) | (1,366) | (1,003) | (1,560) | (1,580) | (1,601) | (1,764) | (2,966) |
| Net Interest Paid | (5) | 15 | (89) | (96) | (84) | (53) | 47 | 156 | 314 |
| Cash Taxes | (2) | (1) | 0 | (69) | (75) | (1,000) | (1,919) | (3,903) | (6,011) |
| FCF | (328) | (1,163) | (939) | 1,486 | 3,517 | 6,031 | 11,589 | 16,550 | 17,795 |
| FCF per Share | (1.1) | (3.2) | (2.6) | 4.0 | 9.4 | 15.9 | 30.1 | 42.3 | 44.8 |
| NPV of FCF/Share | (2.9) | (2.0) | 2.8 | 5.8 | 8.7 | 14.6 | 18.3 | 17.1 | — |
| Current FCF Yield | -1.1% | -3.3% | -2.6% | 4.1% | 9.6% | 16.3% | 30.9% | 43.4% | 45.9% |

STARLINK NET ADDS (Exhibit 1) - Millions:
| 2022 | 2023 | 2024 | 2025 | 2026E |
| 0.9 | 1.3 | 2.3 | 4.6 | 10 |
(Compared to Netflix early growth: 2007: 1.2M, 2008: 1.9M, 2009: 2.9M, 2010: 7.7M)

STARLINK COMPETITIVE DATA:
• 650 DTC satellites currently operating
• 9,500 cumulative satellite launches (3,126 in 2025 alone)
• 6M monthly users to DTC services (expanding to 1B coverage)
• Available in: Australia, Canada, Chile, Japan, New Zealand, UK, Ukraine, Zambia, US + expanding to Kazakhstan, Mexico, Mongolia, Peru, Switzerland
• 47 days to add 1M subs (Dec 22, 2025: 9M from Nov 5: 8M)
• Brazil Anatel: 63,141 new Starlink subs Nov 2025 (vs 17,524 prior year — 3.6x increase)
• ARPU: $85/month (34x higher than ASTS $2.5/month)
• Next-gen: Custom SpaceX silicon, advanced phased arrays, thousands of spatial beams
• 20x higher throughput/satellite, 100x system capacity
• 360km altitude, laser mesh network 9,000+ satellites
• Regenerative architecture (cell towers in space)

TIMING HISTORY:
• Late 2020: ASTS guided 110 satellites by 2023
• Reality: 7 satellites since 2017, 110 now targeted for 2027/2028
• 5-year delay gave Starlink 2-year DTC head start

CARRIER DEFECTION RISK:
• Virgin-O2 UK deal (Telefónica/Liberty Global) — may not wait for ASTS
• Liberty LatAm Jamaica partnership during Melissa emergency
• América Móvil/Telcel Mexico risk — could slash ASTS LatAm projections

KEY QUOTES:
• "The technology is impressive, but we cannot remember a single time when the company got timing right."
• "To be clear, as little as a 48-hour delay (let alone weeks or months) means ASTS will fall further behind Starlink, which is completing a mission every one to two days."
• "We disagree with those seeing ASTS as a 'meme stock'; the technology remains highly disruptive and with potential for dual use."

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: January 6, 2026 (Daily Edge | After Close).`
        },
        // === Nov 25, 2025 - Upgrade to Sector Perform (Quick Update) ===
        { date: '2025-11-25', action: 'Upgrade', priceTarget: 45.60, previousTarget: 42.90, rating: 'Sector Perform', ratingNormalized: 'neutral', source: 'Quiver Quant', sourceUrl: 'https://www.quiverquant.com/', isFullReport: false },
        // === Oct 7, 2025 - Downgrade (Quick Update) ===
        { date: '2025-10-07', action: 'Downgrade', priceTarget: 42.90, rating: 'Sector Underperform', ratingNormalized: 'bearish', source: 'GuruFocus', sourceUrl: 'https://www.gurufocus.com/', isFullReport: false },
        // === Aug 7, 2025 - PT Cut (Quick Update) ===
        { date: '2025-08-07', action: 'PT Cut', priceTarget: 42.90, rating: 'Sector Perform', ratingNormalized: 'neutral', isFullReport: false },
        // === May 13, 2025 - PT Cut $47.90 → $45.40 (FULL REPORT) ===
        {
          date: '2025-05-13',
          action: 'PT Cut',
          priceTarget: 45.40,
          previousTarget: 47.90,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'Q1 production at full steam. Starlink feedback from South America: service is intermittent (30 seconds then drops), only limited SMS (not even WhatsApp). Nothing close to what ASTS can deliver. Golden Dome ($25B defense project) on sight — ASTS expects to be "important contributor." PT cut 5% on ATM dilution and tariff-driven cost increases.',
          reportSummary: `**STARLINK STRUGGLING — ASTS ADVANTAGE**
Feedback from a carrier in South America suggests that Starlink's direct-to-cell service is currently intermittent (works for 30 seconds, then drops) and can only provide limited SMS services (not even WhatsApp). We understand this is delaying and watering-down the commercial launch. In practical terms, there is nothing close to the wireless broadband service that ASTS can deliver with its gigantic satellites, which will be in position to deliver 5G browsing, apps and videoconferencing from the very first beta test later this year.

**PRODUCTION STATUS**
40 satellites are at different stages of production (50 in total including procurement). A beta version should be available in the U.S. by Q4/25, with commercial launch happening "early in 2026." Japan and Europe would happen shortly after.

**GOLDEN DOME DEFENSE OPPORTUNITY ($25B)**
Management expects ASTS to become an "important contributor" (e.g., radar/detection) to the US$25B Golden Dome defense project, which could soon be funded by the U.S. Senate. New guidance: generate $50M to $75M in revenue in 2H25 (from virtually zero in Q1/25). This is relevant insofar as it shows that the government and MNOs are positioning themselves to use the technology, but this is far from reflecting the full revenue opportunity.

**PRODUCTION & LAUNCH CADENCE**
Satellite manufacturing is expected to hit a cadence of 6 satellites per month by Q4/25. The company has scheduled 5 contracted launches (around 20 satellites in total) over the next 6-9 months, with launches occurring every 1-2 months. The first Block 2 BlueBird satellite ("FM1" with special tail) is expected to ship to India shortly, with orbital launch scheduled for July.

**CRITICAL 25 SATELLITE MILESTONE**
We expect the critical 25 mark for positive operating cash flow and non-continuous beta service in the U.S. to be reached in late 2025. The cadence of launches should accelerate further in 1H26, reaching a total fleet of 60 satellites by mid-2026 (continuous service in U.S. and initial launch in Europe and Japan). End year with 80-90 satellites (up from 75 in previous model), positioning for global launch in early 2027.

**NEW ATM FACILITY & FUNDING**
Management announced a new $500M ATM program (5.8% of market cap) covering 2025-2028. Although ASTS has completed initial clearance of up to $500M in EXIM and IFC non-dilutive funding, the new ATM may not be used in full. Precisely because of non-dilutive sources (including operating cash flow as soon as 25 satellites reached), our model dilutes ATM over 8 quarters starting Q2/25. The ATM and EXIM-IFC financing should be enough considering $874.5M cash as at Q1/25. Tariffs and launching costs explain production cost guidance increase to $21M-23M per unit (from $19M-21M).

**PRICE TARGET REVISION**
Minimal changes to our target incorporating the ATM and modest increase in production costs: $45.40/share from $47.90 (small 5% revision). We have NOT incorporated the impact of possible Golden Dome contracts.`,
          assumptions: [
            { label: 'Price Target', value: '$45.40' },
            { label: 'Prev Target', value: '$47.90' },
            { label: 'Yield Demanded', value: '13.4%' },
            { label: 'Market Cap', value: '$8.9B' },
            { label: 'Cash Q1/25', value: '$874.5M' },
            { label: 'Shares O/S', value: '328M' },
            { label: 'ATM Program', value: '$500M' },
            { label: 'Sat Cost', value: '$21-23M/unit' },
          ],
          catalysts: [
            'Starlink struggling: intermittent service (30 sec drops), only SMS (no WhatsApp)',
            'ASTS: 5G browsing, apps, videoconferencing from first beta test',
            'Golden Dome ($25B defense project) — ASTS to be "important contributor"',
            '2H25 defense guidance: $50M-$75M revenue (from zero in Q1)',
            'FM1 (first BB2 with special tail) shipping to India, July launch',
            '6 satellites/month production cadence by Q4/25',
            '5 contracted launches (20 sats) over next 6-9 months',
            '25 satellites by late 2025 → positive operating cash flow',
            '60 satellites by mid-2026 → continuous US service',
            '80-90 satellites by end 2026 (up from 75 prior model)',
          ],
          risks: [
            'ATM dilution: $500M program over 2025-2028',
            'Tariffs increased production costs to $21-23M/unit (from $19-21M)',
            'Golden Dome contracts NOT yet incorporated in model',
            'Execution on accelerated launch cadence',
            'Risk Ranking: Speculative',
          ],
          estimates: [
            { metric: 'EBITDA ($M)', fy25: '(174)', fy26: '730', fy27: '—' },
            { metric: 'EBITDA Old ($M)', fy25: '(179)', fy26: '724', fy27: '—' },
            { metric: 'Price/Revenue', fy25: '55.9x', fy26: '6.1x', fy27: '—' },
          ],
          methodology: 'Equity Free Cash Flow model demanding 13.4% yield on present value of first year of meaningful EFCF generation (2028). 5% PT cut reflects ATM dilution and tariff-driven cost increases. Golden Dome upside NOT included.',
          fullNotes: `ESTIMATE REVISIONS:
| Metric | New | Old |
| 1-Yr Target | $45.40 | $47.90 |
| EBITDA (M) 25E | $(174) | $(179) |
| EBITDA (M) 26E | $730 | $724 |

QUARTERLY EBITDA:
| Year | Q1 | Q2 | Q3 | Q4 | Year | P/Rev |
| 2024A | $(31) | $(34) | $(44) | $(39) | $(147) | n.m. |
| 2025E | $(44)A | $(30) | $(59) | $(40) | $(174) | 55.9x |
| 2026E | $32 | $150 | $243 | $306 | $730 | 6.1x |

NOTE: There is a missing report between Feb 26, 2025 ($40.20) and May 13, 2025 that raised PT to $47.90. We do not have this report.

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: May 13, 2025, 02:02 ET. Dissemination: May 13, 2025, 05:24 ET.`
        },
        // === Feb 26, 2025 - Reiterate $40.20 (FULL REPORT) ===
        {
          date: '2025-02-26',
          action: 'Reiterate',
          priceTarget: 40.20,
          previousTarget: 45.90,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'New $43M SDA defense contract shows military potential; estimates look conservative again. AT&T/Verizon completed first satellite video call on BlueBird. T-Mobile pricing ($15/mo, $7.50 ARPU) is 66% above our $4.50 model assumption. Defense could be "multiple times" current projections.',
          reportSummary: `**DEFENSE CONTRACT & MILITARY THESIS**
The U.S. Space Development Agency (SDA), through a prime contractor, awarded ASTS a new $43M contract. This is a "green shoot" — if ASTS can secure such contracts with just 5 satellites providing 30 minutes/day coverage, the opportunity with a full 50-satellite constellation is exponentially bigger. Our model projects only $512M in global defense revenues by 2030, which looks conservative as a single U.S. agency could demand as much. ASTS satellites are designed to "mirror" wireless signals (data processing happens terrestrially), which is specially relevant for governments that don't want the DTC provider accessing data itself. This is a KEY DIFFERENCE vs SpaceX's design where data transmission happens satellite-to-satellite through lasers, potentially raising security concerns. ASTS satellites could provide connectivity to military AND potentially "drop broadband" in remote regions where rogue regimes don't allow people to access the web.

**PWSA — PROLIFERATED WARFIGHTER SPACE ARCHITECTURE**
SDA will accelerate delivery of space-based capabilities to support terrestrial missions through development, fielding, and operation of PWSA. This is the network of LEO satellites that will provide the U.S. military with satellite-based connectivity for terrestrial missions worldwide. PWSA is divided into several layers (tranches), each adding new capabilities and resilience — including tracking missile threats and ensuring encrypted connectivity.

**AT&T/VERIZON VIDEO CALL MILESTONE**
AT&T and Verizon announced they successfully completed a satellite-based VIDEO CALL over their spectrum using BlueBird satellites and everyday smartphones. These are the same satellites that will be used to start commercial service. The events come after ASTS was granted in mid-February a "Special Temporary Authority" to test their terrestrial gateways in Texas and Washington. Three more gateways pending STA approval.

**T-MOBILE PRICING REFERENCE — BULLISH FOR ARPU**
T-Mobile provided an impressive pricing reference for the U.S.: Starting July 2025, DTC will cost $15.00/month, representing 30% to 42% of TMUS's Q4/24 reported postpaid ($49.73) and prepaid ($35.49) ARPU. DTC will be included "for free" in Go5G postpaid packages starting at $100/month ($85 for seniors 55+) — a big jump vs current plans. Using the $15.00/month reference and 50-50 revenue split, this implies $7.50/month ARPU for the DTC provider — 66% HIGHER than the $4.50 we incorporated into our ASTS model for developed markets. Chile visit also provided first-ever EM pricing reference: 14% to 28% of Entel's blended ARPU.

**REVENUE MIX EVOLUTION (2026-2030)**
In 2026E, we project revenues from sources unrelated to wireless users (defense, emergency response, initial carrier commitments) to comprise 57% of monetization. This changes dramatically as service becomes available in developed markets (2H26+) and Equatorial markets (2027+). By 2027E, user-generated revenues comprise 73% while defense drops to 9%. By 2030E, defense drops to just 3% ($512M) of $17.6B total revenue, with 95% user-generated. The new SDA contract shows defense could be "materially bigger to what we are projecting, possibly multiple times more."

**VALUATION & CATALYSTS**
Using Equity Free Cash Flow model demanding 13.4% yield (down from 16.4% in Aug '24) on present value of first year of meaningful EFCF generation (2028). Waiting for news on BB2 launch cadence/timing, time-to-market guidance in U.S. and abroad. Q4/24 release and conference call scheduled March 3-4. Investors will react positively to faster-than-expected satellite production and MNO monetization news.

**PRICE TARGET HISTORY (SCOTIABANK)**
$7.50 (Mar '24) → $7.40 (Apr '24) → $12.90 (May '24) → $21.10 (Jul '24) → $28.00 (Aug '24) → $40.20 (Feb '25). PT has more than 5x'd in under 12 months. [Source: PT history from Aug 15, 2024 report page 7; current PT from Feb 26, 2025 report]`,
          assumptions: [
            { label: 'Price Target', value: '$40.20' },
            { label: 'Yield Demanded', value: '13.4%' },
            { label: 'ARPU Model', value: '$4.50 (dev)' },
            { label: 'T-Mobile Ref', value: '$7.50 ARPU' },
            { label: 'Defense 2030E', value: '$512M (3%)' },
            { label: 'Market Cap', value: '$7.9B' },
            { label: 'EV', value: '$7.9B' },
            { label: 'Shares O/S', value: '290M' },
          ],
          catalysts: [
            'AT&T/Verizon completed satellite VIDEO CALL on BlueBird + everyday smartphones',
            '$43M SDA defense contract — "green shoot" for military revenue',
            'T-Mobile: DTC $15/mo starting July 2025 (implies $7.50 ARPU vs $4.50 model)',
            'Special Temporary Authority granted for TX/WA gateways; 3 more pending',
            'Q4/24 earnings + conference call March 3-4, 2025',
            'BB2 launch cadence/timing guidance expected',
            'Defense could be "multiple times" current projections',
          ],
          risks: [
            'Execution on BB2 launches and time-to-market',
            'Regulatory approvals for commercial service in multiple countries',
            'Competition from SpaceX (though different architecture)',
            'Continued cash burn until commercial ramp',
            'Risk Ranking: Speculative',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy25: '—', fy26: '2,793', fy27: '4,350' },
            { metric: 'EBITDA ($M)', fy25: '363', fy26: '1,313', fy27: '—' },
            { metric: 'EBITDA Margin', fy25: '—', fy26: '47%', fy27: '—' },
            { metric: 'Price/Revenue', fy25: '6.8x', fy26: '3.3x', fy27: '—' },
            { metric: 'User-Gen Rev %', fy25: '—', fy26: '43%', fy27: '73%' },
            { metric: 'Defense Rev %', fy25: '—', fy26: '13%', fy27: '9%' },
          ],
          methodology: 'Equity Free Cash Flow model demanding 13.4% yield (reduced from 16.4% in Aug \'24 — source: prior report) on present value of first year of meaningful EFCF generation (2028). Implies $40.20/share.',
          fullNotes: `SOURCES: PT and stock price from Feb 26, 2025 report header. Previous PT ($28.00) and PT history from Aug 15, 2024 report. Yield reduction (16.4% → 13.4%) inferred from methodology comparison.

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Feb 26, 2025, 18:34 ET. Dissemination: Feb 26, 2025, 18:42 ET.`
        },
        // === Feb 10, 2025 - PT Cut $45.90 → $40.20 (FULL REPORT) ===
        {
          date: '2025-02-10',
          action: 'PT Cut',
          priceTarget: 40.20,
          previousTarget: 45.90,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'Fresh DTC pricing references from T-Mobile ($15/mo, implying $7.50 ARPU — 66% above our $4.50 model) and Chile (14-28% of Entel ARPU) suggest upside to numbers. Shatters the bear thesis that DTC would be free. Carriers struggling to monetize see DTC as "water in the desert."',
          reportSummary: `**T-MOBILE PRICING SHATTERS "FREE DTC" BEAR THESIS**
Perhaps the most misleading argument of the ASTS bear thesis is that DTC would be included for free to all customers. T-Mobile just proved otherwise: Starting July 2025, DTC will cost $15.00/month, representing 30-42% of TMUS's Q4/24 postpaid ($49.73) and prepaid ($35.49) ARPU. This didn't make sense for multiple reasons: (1) Carriers struggling to find new monetization; DTC is "like water in the desert"; (2) Carriers making prepayments can't afford to give it for free; (3) DTC companies investing billions in global constellations; (4) As little as 10% reduction in wireless capex from satellites → +$30B in capex savings per year for carriers (pure EFCF incentive for fair pricing).

**PRICING DETAILS & IMPLICATIONS**
Using the $15.00/month reference and 50-50 revenue split, this implies $7.50/month ARPU for the DTC provider — 66% HIGHER than the $4.50 we incorporated into our ASTS model for developed markets. While monetization is the most visible face of the DTC story, we believe capex savings to MNOs may turn out to be as relevant as the new revenue stream from an equity free cash flow standpoint.

**TIMING IS IMPORTANT**
Beta period will be free until July. After July, DTC will be included at no extra cost only to Go5G Next ($100/month). T-Mobile customers on any other plan can add the service for $15/month/line. Through February, beta registrants get $10/month/line early adopter discount. During the beta period, Verizon and AT&T customers can experience T-Mobile Starlink text messaging for free. Once the service launches in July, it will be available for $20/month/line to AT&T/Verizon customers.

**STARLINK SERVICE QUALITY ISSUES**
The July reference is interesting because today the service is only text and users are complaining about connectivity issues. This is likely showing that Starlink is under pressure to improve service and increase densification. The reference is also relevant for ASTS as it gives the company time to launch the first BB2 satellites with real data capabilities (up to 120 Mbps) while in compliance with OOBE limits.

**NEXT STEPS FOR ASTS**
Now that ASTS has received Special Temporary Authority (STA) from the FCC for AT&T and Verizon tests, we expect more info on the 5 BB1 Bluebirds: maximum download speeds, capacity per satellite, performance on continuous coverage, indoor coverage (penetrating at least one wall), video/streaming capabilities, and possible security/defense uses. Cash is now ~$1.0B after the $460M in 2032 convertible notes.

**PRODUCTION & TIMELINE**
Management more confident about manufacturing, with production potentially ramping to 4-6 satellites per month. The 17 BB2 satellites that began building last year are now fully completed. We would not be surprised if management announces launch of not one but a couple of satellites at first BB2 launch from India in April. Timeline: 25 satellites by end of 2025 (critical for breakeven), continuous US coverage by 1H26, Europe and Japan by 2H26.

**ARPU TIERS BY MARKET**
- Below $1/month: India
- $1-$3/month: Brazil, Chile, Mexico
- $3-$15/month: U.S. (premium)
- T-Mobile's $15/month is at the high end of the range`,
          assumptions: [
            { label: 'Price Target', value: '$40.20' },
            { label: 'ARPU Model', value: '$4.50 (dev)' },
            { label: 'T-Mobile Ref', value: '$7.50 ARPU' },
            { label: 'Upside to Model', value: '+66%' },
            { label: 'Market Cap', value: '$7.7B' },
            { label: 'Cash', value: '~$1.0B' },
            { label: 'Shares O/S', value: '290M' },
            { label: '17 BB2 Sats', value: 'Completed' },
          ],
          catalysts: [
            'T-Mobile: DTC $15/mo starting July 2025 ($7.50 ARPU = 66% above model)',
            'Chile pricing reference: 14-28% of Entel blended ARPU',
            'STA granted for AT&T/Verizon tests on BB1 Bluebirds',
            '17 BB2 satellites now fully completed',
            'First BB2 launch from India in April — could be multiple satellites',
            'Production ramping to 4-6 satellites per month',
            '25 satellites by end 2025 (breakeven threshold)',
            '$460M convertible notes → ~$1.0B cash position',
          ],
          risks: [
            'Starlink text service has connectivity issues (users complaining)',
            'Execution on BB2 launches and time-to-market',
            'AT&T/Verizon customers: $20/mo (vs $15 for T-Mobile) — competitive dynamics',
            'Risk Ranking: Speculative',
          ],
          estimates: [
            { metric: 'EBITDA ($M)', fy25: '363', fy26: '1,313', fy27: '—' },
            { metric: 'Price/Revenue', fy25: '6.7x', fy26: '3.3x', fy27: '—' },
          ],
          methodology: 'Equity Free Cash Flow model demanding 13.4% yield on present value of first year of meaningful EFCF generation (2028). Implies $40.20/share.',
          fullNotes: `T-MOBILE STARLINK DTC PRICING TABLE (Starting July 2025):
| Customer Type | Price | Specs |
| TMUS Customers | $15.00 | Starlink DTC Service |
| AT&T & Verizon | $20.00 | Starlink DTC Service |
| TMUS Go5G Next | $100.00 | Unlimited + DTC included + Apple TV+, Netflix, Hulu |
| TMUS Go5G Next 55 | $85.00 | Same as above, 55+ years old |

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Feb 10, 2025, 16:26 ET. Dissemination: Feb 10, 2025, 16:28 ET.`
        },
        // === Sep 30, 2024 - Reiterate $45.90 (FULL REPORT) ===
        {
          date: '2024-09-30',
          action: 'Reiterate',
          priceTarget: 45.90,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'European carriers (Vodafone, Telenor, Telefónica, Orange, Liberty Global) filed joint FCC letter opposing SpaceX\'s OOBE waiver request. If FCC stays firm, ASTS may emerge as THE ONLY licensed SCS player with cellular broadband. Barriers to entry are vastly underestimated. Buy on weakness.',
          reportSummary: `**EUROPEAN CARRIERS OPPOSE SPACEX WAIVER**
Vodafone, United Group, Telenor, Telefónica, PPF Group, Orange and Liberty Global filed a joint letter to the FCC calling for the regulator to "reject any effort to relax its aggregate Out-of-Band-Emission (OOBE) limit of -120 dBW/m2/MHz." The carriers stated: "Any D2D system that deploys in cellular frequencies, rather than a mobile satellite service (MSS) allocation, must satisfy Article 4.4's noninterference obligation, and we do not accept that a D2D system operating with an OOBE limit more relaxed than -120 dBW/m2/MHz is satisfying this fundamental condition."

**IF FCC STAYS FIRM — ASTS WINS**
If the FCC stays firm on the limits, ASTS may emerge not only as the first, but THE ONLY licensed SCS player with cellular broadband capabilities, giving it a precious pioneering advantage that could have M&A implications. SpaceX would face tough choices, such as re-designing its DTC fleet from scratch at a risk of falling under patent-enforcement actions by ASTS. The barriers to entry of this nascent industry, from a technical, regulatory and patents perspective, are vastly underestimated.

**THE ROOT PROBLEM: SUB-OPTIMAL SPACEX DESIGN**
FCC filings by SpaceX and ASTS make it possible to compare beam patterns. What you want to see is a tall beam in the licensed frequency and minimal lobes in contiguous spectrum. The ASTS satellites are very powerful in the spectrum provided by AT&T-Verizon (850 MHz) with small sidelobes (compliant with EPFD limits). The SpaceX beam in the PCS spectrum (T-Mobile) is relatively weak and the sidelobes are tall. SpaceX itself accepted that "even a single direct-to-cellular satellite with power amplifiers ('PA') operating at full load could not meet the Section 25.202(k)(1) limit..." EPFD limits are "ten times more restrictive" than SpaceX requires to function normally.

**WARRANT REDEMPTION STRENGTHENS CASH**
99.89% of warrant holders exercised, with total cash proceeds of $156M. Some holders may have taken profits, explaining recent stock weakness. The next corporate milestone is the correct unfolding and testing of BB1 satellites, which would trigger payments from AT&T, Verizon and Vodafone.

**PRICE TARGET RAISED TO $45.90**
Buy ASTS on weakness. The 64% PT increase from $28.00 reflects the strengthening regulatory moat as European carriers join U.S. incumbents in opposing SpaceX's waiver request.`,
          assumptions: [
            { label: 'Price Target', value: '$45.90' },
            { label: 'Prev Target', value: '$28.00' },
            { label: 'Yield Demanded', value: '13.4%' },
            { label: 'Market Cap', value: '$7.0B' },
            { label: 'EV', value: '$7.0B' },
            { label: 'Shares O/S', value: '267M' },
            { label: 'Float', value: '121M' },
            { label: 'Warrant Proceeds', value: '$156M' },
          ],
          catalysts: [
            'European carriers (VOD, TEF, Orange, Liberty) filed joint FCC letter opposing SpaceX OOBE waiver',
            'If FCC stays firm → ASTS = THE ONLY licensed SCS player with cellular broadband',
            'SpaceX admitted single satellite at full load cannot meet regulatory limits',
            'Warrant redemption: 99.89% exercised, $156M cash proceeds',
            'Next milestone: BB1 unfolding/testing → triggers AT&T/VZ/VOD payments',
            'SpaceX may need to redesign fleet (patent risk from ASTS)',
          ],
          risks: [
            'FCC could still grant SpaceX waiver despite carrier opposition',
            'Execution risk on BB1 satellite deployment',
            'Some warrant holders took profits (explains recent weakness)',
            'Risk Ranking: Speculative',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy25: '1,345', fy26: '—', fy27: '—' },
            { metric: 'EBITDA ($M)', fy25: '404', fy26: '—', fy27: '—' },
            { metric: 'Price/Revenue', fy25: '6.3x', fy26: '—', fy27: '—' },
          ],
          methodology: 'Equity Free Cash Flow model demanding 13.4% yield on present value of first year of meaningful EFCF generation (2028). Implies $45.90/share.',
          fullNotes: `BEAM PATTERN COMPARISON (FCC Filings):
- Exhibit 1: ASTS beam pattern shows tall, focused beam with minimal sidelobes (Chebyshev taper 55dB SLL)
- Exhibit 2: SpaceX/Starlink beam pattern shows weaker main beam with tall sidelobes extending to 90 degrees off-axis
- ASTS compliant with EPFD limits; SpaceX is "ten times" away from compliance

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Sep 30, 2024, 17:23 ET. Dissemination: Sep 30, 2024, 17:27 ET.`
        },
        // === Aug 26, 2024 - PT Raise $28 → $45.90 (FULL REPORT) ===
        {
          date: '2024-08-26',
          action: 'PT Raise',
          priceTarget: 45.90,
          previousTarget: 28.00,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'FirstNet approves $2.0B network upgrade with explicit satellite DTC plans. ASTS peak data rates up to 120 Mbps (vs 14 Mbps in BW3). Lowering funding cost assumption to 10.5% (from 12.9%) and yield to 13.4% (from 16.4%) drives 64% PT increase. For every $1 of DTC revenue, MNOs save ~$1.5 in capex and tower leases.',
          reportSummary: `**FIRSTNET $2.0B INVESTMENT — SATELLITE DTC INCLUDED**
At a board meeting on August 21, FirstNet approved a $2.0B investment program to upgrade coverage: "We can continue to enhance coverage for FirstNet subscribers, including an estimated $2 billion in coverage investments over the next 10 years [...] we are also planning on additional investments that will over time enable satellite direct-to-device capability for FirstNet subscribers." This marks FirstNet Authority's second major strategic investment this year, totaling more than $8.0B over the next 10 years. We're raising our 2026 emergency-response estimate from $60M to $150M, still conservative as it represents less than 2% of FirstNet's budget — and there are hundreds of emergency agencies globally.

**ASTS TECHNOLOGY: 120 MBPS PEAK DATA RATES**
In its latest corporate video, ASTS suggests that the Birds are capable of delivering peak data rates of up to 120 Mbps, up from the initial 14 Mbps announced last year (BW3 tests). Our Buy rating is not based on short-term trading but on the company's potential to become the world's largest wireless company by subscribers. Days ahead of the BB1 launch, our attention is focused on ASTS securing a pioneering advantage over SpaceX on the back of superior satellite design, whose hallmark is a giant phase array that allows for greater beam precision compliant with FCC interference limits.

**SPACEX'S TOUGH CHOICES**
If the FCC stays firm on EPFD rules, SpaceX faces, in our view, tough choices: (1) Redesign its satellites at risk of falling under patent-enforcement actions by ASTS; (2) Wait until 2027 for the WRC to change EPFD limits; (3) Find other available frequencies or buy contiguous blocks; or (4) Buy ASTS. As FirstNet commits more resources, we find yet another area where our estimates fail to capture the project's potential.

**WRC AND FDD FREQUENCIES**
On August 20, SpaceX filed comments on WRC proposals to be considered at the next WRC in 2027. SpaceX wants the FCC to "study all FDD (Frequency Division Duplex) frequency bands between 694-2700 MHz to avoid foreclosing promising bands..." ASTS is building 17 BB2 satellites for Q1/25 launch. By 2027, ASTS could have global capabilities. In a filing released August 23, SpaceX takes issue with AT&T and Verizon comments and again asks for FCC to waive OOBE limits.

**LOWER FUNDING COSTS — KEY VALUATION DRIVER**
When we initiated coverage in Q1/24, the funding references were not reflective of the project's potential. The senior secured facility (14.8%) is more of a mortgage backed by assets, not a credit based on global reach. The 12.9% funding cost was punishing valuation in two ways: (1) equity premium over debt was even higher at 13.7%; and (2) we bring to present value the first year of significant EFCF (2028). As ASTS gets access to cheaper credit-export loans, funding costs should drop. Our new $45.90/share target is based on 10.5% funding rate, still higher than strategic partners (5.1%) and satellite comps (7.3%).

**FUNDING COST COMPARISONS**
Strategic Partners: AT&T 4.8%, Verizon 4.9%, Vodafone 5.5% → Average 5.1%
Satellite Companies: Viasat 12.8%, Eutelsat 8.4%, SES 7.6% → Average 9.6%
Average Funding Costs: 7.3%
ASTS Model (New): 10.5% (conservative)

**MNO CAPEX SAVINGS — THE HIDDEN BULL CASE**
Each year, the global telecom industry spends over $310B in capex and $68B in tower leases. 35% to 50% of total capex is in RAN; 10% to 20% is spent in rural, semi-rural, remote and non-profitable areas. Using satellites could save MNOs on average $46.5B/year in capex. MNOs would also save $6.3B/year in lease savings. "For every dollar of additional DTC revenues, MNOs are positioned to save around $1.5 in capex and tower leases." While "connect the unconnected" is the public face, capex/tower savings may be the far more powerful reason behind MNO support.

**ASTS COULD QUALIFY AS 5G FOR FCC PURPOSES**
Initial performance data suggests that ASTS's technology could qualify as 5G coverage for FCC purposes in terms of speeds, which could play a key role in the regulator's future acceptance of the SCS service as compliant with license requirements (thus triggering significant capex and tower savings).

**FIRSTNET FISCAL YEAR**
FirstNet has a September fiscal year-end, so we might see something for ASTS as soon as Q4/24.`,
          assumptions: [
            { label: 'Price Target', value: '$45.90' },
            { label: 'Prev Target', value: '$28.00' },
            { label: 'Funding Cost', value: '10.5%' },
            { label: 'Old Funding', value: '12.9%' },
            { label: 'Fair FCF Yield', value: '13.4%' },
            { label: 'Old Yield', value: '16.4%' },
            { label: 'Market Cap', value: '$8.8B' },
            { label: 'Emergency Rev 26E', value: '$150M' },
          ],
          catalysts: [
            'FirstNet $2.0B investment with explicit satellite DTC capability plans',
            'ASTS peak data rates: 120 Mbps (up from 14 Mbps in BW3)',
            'Lower funding cost (10.5% vs 12.9%) drives PT increase',
            '17 BB2 satellites building for Q1/25 launch',
            'By 2027, ASTS could have global capabilities',
            'Emergency-response estimate raised $60M → $150M (2026)',
            'FirstNet Sept fiscal year-end → possible Q4/24 announcement',
            'MNO capex savings: $46.5B/year + $6.3B/year lease savings',
            'For every $1 DTC revenue, MNOs save $1.5 in capex/tower leases',
          ],
          risks: [
            'SpaceX could still receive FCC waiver on OOBE limits',
            'Execution risk on BB1 launch (September)',
            'WRC 2027 could change EPFD limits in SpaceX favor',
            'Risk Ranking: Speculative',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy25: '1,345', fy26: '2,793', fy27: '4,350' },
            { metric: 'EBITDA ($M)', fy25: '404', fy26: '1,397', fy27: '2,697' },
            { metric: 'FCF/Share', fy25: '($2.4)', fy26: '($0.2)', fy27: '$4.3' },
            { metric: 'NPV FCF/Share', fy25: '($2.1)', fy26: '($0.1)', fy27: '$2.9' },
            { metric: 'Subscribers (M)', fy25: '5', fy26: '55', fy27: '120' },
          ],
          methodology: 'Equity Free Cash Flow model. Lowered funding cost from 12.9% to 10.5% (access to credit-export loans). Fair FCF yield now 13.4% (down from 16.4%). Applied to first year of meaningful EFCF (2028). Implies $45.90/share.',
          fullNotes: `VALUATION MODEL (Exhibit 3):
- SpaceMobile 10Y Funding Cost: 10.5%
- Telecom 10Y Average Funding Cost: 7.3%
- SpaceMobile Proportional Difference vs Sector: 43.8%
- Telecom 10Y Average FCF Yield: 9.3%
- Fair FCF Yield (d/e * g): 13.4%
- Value per share: $45.9

TYPICAL TELECOM CAPEX BREAKDOWN (Exhibit 1):
- CPEs: 10-20%
- Core Network/Data Centers: 8-12%
- Transport Network: 5-15%
- IT/Development/Systems: 15-25%
- Other (Shops, Facilities): 3-8%
- ACCESS (RAN, BACKHAUL, FIXED ACCESS): 35-50% ← Target for satellite replacement

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Aug 23, 2024, 17:44 ET. Dissemination: Aug 26, 2024, 06:08 ET.`
        },
        // === Aug 15, 2024 - PT Raise $21.10 → $28 (FULL REPORT) ===
        {
          date: '2024-08-15',
          action: 'PT Raise',
          priceTarget: 28,
          previousTarget: 21.10,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'If FCC stays firm on EPFD rules, ASTS could be sole licensed SCS player in the world\'s richest telecom market, giving it precious pioneering advantage. Raising PT on: (1) faster subscriber loading in developed markets starting late 2025 vs 2026; (2) higher ARPU ($4.50 vs $3.50 prior); (3) stronger MNO prepayments.',
          reportSummary: `**REGULATORY BATTLEGROUND — THE BULL CASE**
In a flurry of FCC filings, SpaceX continues pushing for relaxed aggregate out-of-band emissions limits (EPFD). The key question: what message would the FCC send to players like ASTS that invested billions in R&D to comply with regulations (including a giant phased array for beam precision), in order to favor players whose smaller satellites can't meet long-known standards? EchoStar remains "vehemently opposed" to granting SpaceX a waiver, stating the Commission has already rejected SpaceX's call for weaker limits. If the FCC stays firm, ASTS could find itself as the SOLE licensed SCS player in the world's richest telecom market. SpaceX would face tough choices: (1) redesign satellites amid possible ASTS patent enforcement, or (2) find other frequencies and/or buy contiguous spectrum from EchoStar.

**Q2/24 OPERATIONAL HIGHLIGHTS**
In a major surprise, management announced building 17 BB2 satellites ready for Q1/25 launch — versus just 1 BB2 originally planned. BB2 satellites are 3.4x bigger than BlueWalker 3. Combined with 5 BB1 satellites launching September 2024, ASTS would have 22 satellites — almost half the 45+ needed for continuous US coverage. The company has achieved 95% vertical integration in its Texas facility, currently running at only 75% capacity. BlueWalker 3 has proven "remarkably resilient" to solar storms and weather events. Cost per satellite remains unchanged despite the production acceleration.

**FUNDING & CAPITAL STRATEGY**
ASTS does not expect to raise equity in 2024. Management explicitly prefers non-dilutive alternatives: export agency credit facilities and MNO prepayments should support constellation growth. Current cash: $370M. Prepayments from AT&T, Verizon, Vodafone and others have NOT yet been collected — they're subject to hitting BB1 operational milestones. Company is making progress with "a number of MNO partners" on formalizing agreements from the ~50 MNOs in the pipeline.

**MONETIZATION THESIS — THE TAM**
AT&T CEO John Stankey said at an investor conference that 30-40% of customers would pay for permanent connectivity. ASTS President Scott Wisniewski estimates initial pricing at $10-15/month, with ASTS receiving 50% ($5-7.50). With AT&T and Verizon's 146.4M postpaid phone customers (184M including prepaid), a 30-40% adoption rate implies $5.3-10.5B in total revenues, of which ASTS would get $2.65-5.25B — from the US market alone. Scotiabank's prior ARPU estimate of $3.50/month for developed markets was too low; they're raising to $4.50 (still conservative vs. the $10-15 reference). Emerging market ARPU estimated at $0.95/month.

**VALUATION FRAMEWORK**
Using an Equity Free Cash Flow model, Scotiabank demands a 16.4% yield (well above the 12.9% funding cost) on the present value of first meaningful EFCF generation in 2028. This yields a $28 price target. The model projects ASTS reaching profitability in 2026 (Net Income: $6M) before scaling to $795M net profit in 2027 and $2.6B by 2029. The path to profitability is driven by operating leverage: EBITDA margins expand from 30% (2025) to 50% (2026) to 62% (2027) as the high-fixed-cost satellite infrastructure is leveraged across a growing subscriber base.

**PRICE TARGET PROGRESSION**
$7.50 (Mar 5, 2024) → $7.40 (Apr 1, 2024) → $12.90 (May 29, 2024) → $21.10 (Jul 25, 2024) → $28.00 (Aug 15, 2024). The PT has nearly 4x'd in 5 months as execution milestones de-risk the story.`,
          assumptions: [
            { label: 'Rev 2024E', value: '$184M' },
            { label: 'Rev 2025E', value: '$1.35B' },
            { label: 'EBITDA 2025E', value: '$404M' },
            { label: 'Global ARPU', value: '$4.50 (dev)' },
            { label: 'EM ARPU', value: '$0.95/mo' },
            { label: 'Sats 2024E', value: '6' },
            { label: 'Sats 2025E', value: '55' },
            { label: 'Yield Demanded', value: '16.4%' },
            { label: 'Funding Cost', value: '12.9%' },
          ],
          catalysts: [
            '5 BB1 satellites launch first half Sep 2024',
            '17 BB2 satellites (3.4x bigger than BW3) ready for Q1/25 launch',
            'With 5 BB1 + 17 BB2 = 22 sats, almost half of 45+ needed for continuous US coverage',
            'FCC EPFD ruling could make ASTS sole licensed US SCS player if SpaceX denied',
            'MNO prepayments from ~50 partners yet to formalize (subject to BB1 milestones)',
            'Defense & government contracts expanding (2 new contracts recent months)',
            'AT&T/Verizon 146.4M postpaid subs; 30-40% willing to pay $10-15/mo per CEO Stankey',
          ],
          risks: [
            'Failure to launch/deploy/operate 5 BB1 satellites would be major setback vs Starlink',
            'Need 25 satellites to reach most attractive markets',
            'Additional funding required for Phase II and global constellation',
            'Regulatory permits needed in multiple countries for commercial service',
            'Risk Ranking: SPECULATIVE (exceptionally high financial/operational risk)',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy25: '1,345', fy26: '2,703', fy27: '4,213' },
            { metric: 'EBITDA ($M)', fy25: '404', fy26: '1,352', fy27: '2,612' },
            { metric: 'EBITDA Margin', fy25: '30%', fy26: '50%', fy27: '62%' },
            { metric: 'Net Profit ($M)', fy25: '(210)', fy26: '6', fy27: '795' },
            { metric: 'EPS', fy25: '($0.65)', fy26: '$0.02', fy27: '$2.46' },
            { metric: 'Satellites', fy25: '55', fy26: '115', fy27: '175' },
            { metric: 'Subscribers (M)', fy25: '5', fy26: '55', fy27: '210' },
            { metric: 'Capex ($M)', fy25: '1,115', fy26: '1,326', fy27: '1,130' },
          ],
          methodology: 'Equity Free Cash Flow (EFCF) model demanding 16.4% yield (well above 12.9% funding cost) on present value of first year of meaningful EFCF generation (2028). Implies $28/share.',
          fullNotes: `DISCLOSURE: Scotiabank has managed/co-managed public offering in past 12 months, received IB compensation, and undertaken underwriting liability for ASTS. Analysts employed by non-U.S. affiliates are not registered with FINRA.`
        },
        // === Jul 25, 2024 - PT Raise $12.90 → $21.10 (FULL REPORT) ===
        {
          date: '2024-07-25',
          action: 'PT Raise',
          priceTarget: 21.10,
          previousTarget: 12.90,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          isFullReport: true,
          thesis: 'BlueBirds heading to Cape Canaveral; 66-page FCC Interference Analysis paves way for first-ever SCS license. Discontinuing short-term valuation methods and focusing solely on long-term EFCF potential. VOD/VZ tower divestitures may signal pressure on tower valuations. Buy.',
          reportSummary: `**BLUEBIRDS HEADING TO CAPE CANAVERAL**
First 5 commercial BlueBird satellites completed, each with 693 sq ft communications arrays. Ready for shipment to Cape Canaveral during first week of August, with 7-day launch window in September. The "string of pearls" formation will allow coverage of 99% of planet's population for less than an hour a day, allowing MNOs worldwide to test capabilities and begin monetization efforts in the U.S.

**66-PAGE FCC INTERFERENCE ANALYSIS**
On July 18, 2024, ASTS filed a 66-page Interference Analysis demonstrating compatibility with incumbent operations in SCS service link bands. We find the filing impressive in terms of technical details, which we contrast with SpaceX's two-page letter asking FCC to soften regulations. The Analysis demonstrates SCS operations in frequencies below 1 GHz (850 MHz) and above 1 GHz (PCS) will not create harmful interference. Crucial step towards first-ever SCS license.

**DISCONTINUING SHORT-TERM VALUATION METHODS**
When we initiated coverage in March 2024, investors feared the company's ability to survive funding needs. Today we are in a different situation: (1) First 5 BB satellites ready for launch; (2) Financial backing from AT&T ($20M), Verizon ($100M total), Vodafone ($25M) = ~$408M firepower; (3) FCC issued SCS ruling making it world's first regulator to adopt satellite+wireless framework; (4) Advantage over SpaceX on interference compliance. We're discontinuing SOTP models based on 2026 Rev/EBITDA and focusing exclusively on EFCF (2028).

**TOWER VALUATIONS MAY BE UNDER PRESSURE**
Vodafone and Verizon are SpaceMobile shareholders. The fact that they're divesting towers weeks before BB1 launch could signal tower valuations may soon be under pressure. Both companies have first-hand access to technical data. As we explained in our initiation, it is at least 10x more expensive to bring connectivity to a remote area with a traditional tower than with a Bluebird.

**FUNDING MATH**
Cash at hand + credit facilities + VZ deal ($100M) + AT&T ($20M) + VOD ($25M) = ~$408M. If all warrants exercised: $201M proceeds, +17.5M shares. Continuous US service with 45 satellites would cost ~$900M, implying $291M deficit. However, prepaid commitments in 2025 (ASTS has relationships with 45 MNOs) plus defense/emergency contracts could completely fund the deficit. Verizon alone committed $65M in prepayments.

**VALUATION: $21.10/SHARE**
Equity Free Cash Flow model demanding 16.4% yield (well above funding costs of 12.9%) on present value of first year of meaningful EFCF generation (2028). 2028 is only the first year of strong EFCF, which is expected to grow exponentially afterwards. Our $21.10/share estimate remains conservative subject to significant upside.`,
          assumptions: [
            { label: 'Price Target', value: '$21.10' },
            { label: 'Prev Target', value: '$12.90' },
            { label: 'Funding Cost', value: '12.9%' },
            { label: 'Fair FCF Yield', value: '16.4%' },
            { label: 'Market Cap', value: '$3.6B' },
            { label: 'EV', value: '$3.6B' },
            { label: 'Shares O/S', value: '269M' },
            { label: 'Float', value: '121M' },
          ],
          catalysts: [
            'First 5 BlueBird satellites completed, shipping to Cape Canaveral',
            '7-day launch window in September 2024',
            '66-page FCC Interference Analysis filed (vs SpaceX 2-page letter)',
            '"String of pearls" formation covers 99% of population',
            'Financial backing: AT&T $20M, Verizon $100M, Vodafone $25M',
            'VOD/VZ tower divestitures may signal tower valuation pressure',
            'FCC SCS ruling — world\'s first satellite+wireless framework',
            'Prepaid commitments in 2025 from 45 MNOs could fund deficit',
          ],
          risks: [
            'Failure to successfully launch/deploy 5 BB1 satellites would be major setback',
            'ASTS will need to raise additional funds for Phase II and global constellation',
            'Additional regulatory permits needed in multiple countries',
            'Risk Ranking: Speculative',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy25: '611', fy26: '—', fy27: '—' },
            { metric: 'EBITDA ($M)', fy25: '153', fy26: '424', fy27: '1,702' },
            { metric: 'FCF ($M)', fy25: '(613)', fy26: '(384)', fy27: '859' },
            { metric: 'FCF/Share', fy25: '($2.0)', fy26: '($1.2)', fy27: '$2.8' },
            { metric: 'Satellites', fy25: '45', fy26: '75', fy27: '110' },
          ],
          methodology: 'Equity Free Cash Flow model demanding 16.4% yield (well above funding costs of 12.9%) on present value of first year of meaningful EFCF generation (2028). Discontinuing EV/Sales and EV/EBITDA SOTP methods. Implies $21.10/share.',
          fullNotes: `VALUATION MODEL (Exhibit 1):
- SpaceMobile 10Y Funding Cost: 12.9%
- Telecom 10Y Average Funding Cost: 7.3%
- SpaceMobile Proportional Difference vs Sector: 76.7%
- Telecom 10Y Average FCF Yield: 9.3%
- Fair FCF Yield (d/e * g): 16.4%
- Value per share: $21.1

PRICE TARGET HISTORY (Page 8):
- Mar 5, 2024: $7.50 (Initiation)
- Apr 1, 2024: $7.40
- May 29, 2024: $12.90
- Jul 25, 2024: $21.10 (This report)

DISCLOSURE: Scotiabank has managed/co-managed public offering in past 12 months, received IB compensation, and undertaken underwriting liability for ASTS.`
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CANTOR FITZGERALD - Colin Canfield (Coverage since February 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Cantor Fitzgerald',
      analyst: 'Colin Canfield',
      coverageSince: 'February 2025',
      currentPT: 30,
      currentRating: 'Overweight',
      currentRatingNormalized: 'bullish',
      reports: [
        { date: '2025-05-13', action: 'Maintained', priceTarget: 30, rating: 'Overweight', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: false },
        { date: '2025-03-04', action: 'Maintained', priceTarget: 30, rating: 'Overweight', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: false },
        { date: '2025-02-06', action: 'Initiation', priceTarget: 30, rating: 'Overweight', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: true,
          thesis: 'Initiating coverage with Overweight rating and $30 price target on AST SpaceMobile.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BANK OF AMERICA - Michael Funk (Coverage since June 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Bank of America',
      analyst: 'Michael Funk',
      coverageSince: 'June 2025',
      currentPT: 100,
      currentRating: 'Neutral',
      currentRatingNormalized: 'neutral',
      reports: [
        // === Jan 8, 2026 - PT Raise to $100 (FULL REPORT) ===
        {
          date: '2026-01-08',
          action: 'PT Raise',
          priceTarget: 100,
          previousTarget: 85,
          rating: 'Neutral',
          ratingNormalized: 'neutral',
          source: 'BofA Global Research',
          sourceUrl: 'https://www.marketbeat.com/',
          isFullReport: true,
          thesis: 'LEO will gain more attention in 2026 as ASTS and Starlink jockey for full cellular service. Multiple catalysts on horizon.',
          keyPoints: [
            'Fully funded with $1.2B cash on Q3 balance sheet',
            'BB6 launch provides additional step toward full-service with 45-60 satellites',
            'Partnerships with AT&T, Verizon, Vodafone, and 50+ MNOs provide subscriber opportunity',
            'DCF assumptions: 12% WACC, 10% terminal growth (up from 9%)',
            'Await progress on: (1) BlueBird constellation launch, (2) successful operation, (3) subscriber capture'
          ],
          catalysts2026: [
            { catalyst: 'Manufacturing Cadence', impact: 'Positive', outlook: '>11 BlueBirds in manufacturing, ~40 satellite equivalent microns by early 2026', timeframe: 'Increasing to start 2026' },
            { catalyst: 'Launch Cadence', impact: 'Positive', outlook: 'Launch every 45 days, 45-60 satellites by YE26, ~75 launches contracted (SpaceX, Blue Origin)', timeframe: 'Throughout 2026' },
            { catalyst: 'Partial Service', impact: 'Positive', outlook: 'Partial service in primary markets 1H26 with >25 satellites in LEO', timeframe: '1H26' },
            { catalyst: 'Full Space Service', impact: 'Positive', outlook: '45-60 satellites providing global coverage, revenue acceleration from >50 MNO partners (~3B subscribers)', timeframe: 'YE2026' }
          ]
        },
        // === Oct 30, 2025 - PT Raise to $85 ===
        {
          date: '2025-10-30',
          action: 'PT Raise',
          priceTarget: 85,
          previousTarget: 80,
          rating: 'Hold',
          ratingNormalized: 'neutral',
          source: 'TipRanks/Futu News',
          sourceUrl: 'https://www.tipranks.com/',
          isFullReport: false,
          thesis: 'Raising price target ahead of Q3 earnings. Maintaining Hold rating.'
        },
        // === Sep 12, 2025 - PT Raise to $80 (FULL REPORT) ===
        {
          date: '2025-09-12',
          action: 'PT Raise',
          priceTarget: 80,
          previousTarget: 55,
          rating: 'Neutral',
          ratingNormalized: 'neutral',
          source: 'BofA Global Research',
          sourceUrl: 'https://www.marketbeat.com/',
          isFullReport: true,
          thesis: 'Catalysts closer to reality as management shipped BlueBird 2 satellite for launch.',
          keyPoints: [
            'DCF valuation appropriate due to early stage, high projected growth, outyear FCF timeline',
            'DCF assumptions: 12% WACC, ~9% terminal growth (up from 8%)',
            '$80 PO based on DCF analysis supported by EV/Sales/Growth multiple vs high-growth software'
          ],
          methodology: 'DCF-based PO implies 0.50x 2026 EV/Sales/Growth multiple. Software companies trade at 0.44-0.50x 2025/2026 EV/Sales/Growth.',
          upside: ['Faster satellite manufacturing/launch cadence', 'Lower satellite-related capex', 'Accelerated subscriber adoption', 'Higher ARPUs'],
          downside: ['Manufacturing and launch delays', 'Long-dated subscriber adoption', 'Lower ARPUs', 'Increased satellite costs', 'Unforeseen collisions/constellation destruction', 'Technology malfunctions']
        },
        // === Jun 25, 2025 - Initiation at $55 ===
        {
          date: '2025-06-25',
          action: 'Initiation',
          priceTarget: 55,
          rating: 'Neutral',
          ratingNormalized: 'neutral',
          source: 'MarketBeat',
          sourceUrl: 'https://www.marketbeat.com/',
          isFullReport: true,
          thesis: 'Initiating coverage with Neutral rating. AST SpaceMobile presents significant opportunity but also substantial execution risks.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // WILLIAM BLAIR - Louie DiPalma (Coverage since August 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'William Blair',
      analyst: 'Louie DiPalma',
      coverageSince: 'August 2025',
      currentPT: null,
      currentRating: 'Market Perform',
      currentRatingNormalized: 'neutral',
      reports: [
        { date: '2025-08-21', action: 'Initiation', priceTarget: null, rating: 'Market Perform', ratingNormalized: 'neutral', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: true,
          thesis: 'Initiating coverage with Market Perform rating. No price target provided.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // OPPENHEIMER - Timothy Horan (Coverage since May 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Oppenheimer',
      analyst: 'Timothy Horan',
      coverageSince: 'May 2025',
      currentPT: null,
      currentRating: 'Perform',
      currentRatingNormalized: 'neutral',
      reports: [
        { date: '2025-05-05', action: 'Initiation', priceTarget: null, rating: 'Perform', ratingNormalized: 'neutral', source: 'TipRanks', sourceUrl: 'https://www.tipranks.com/', isFullReport: true,
          thesis: 'Initiating coverage with Perform rating. No price target provided.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CLEAR STREET - Greg Pendy (Coverage since July 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Clear Street',
      analyst: 'Greg Pendy',
      coverageSince: 'July 2025',
      currentPT: 87,
      currentRating: 'Buy',
      currentRatingNormalized: 'bullish',
      reports: [
        { date: '2025-11-12', action: 'PT Raise', priceTarget: 87, previousTarget: 59, rating: 'Buy', ratingNormalized: 'bullish', source: 'TipRanks', sourceUrl: 'https://www.tipranks.com/', isFullReport: false,
          thesis: 'Raising price target post-Q3 results.'
        },
        { date: '2025-07-10', action: 'Initiation', priceTarget: 59, rating: 'Buy', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: true,
          thesis: 'Initiating coverage with Buy rating and $59 price target.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROTH CAPITAL - Scott Searle (Coverage since April 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Roth Capital',
      analyst: 'Scott Searle',
      coverageSince: 'April 2025',
      currentPT: 82.50,
      currentRating: 'Buy',
      currentRatingNormalized: 'bullish',
      reports: [
        { date: '2025-11-11', action: 'PT Raise', priceTarget: 82.50, previousTarget: 56, rating: 'Buy', ratingNormalized: 'bullish', source: 'TipRanks', sourceUrl: 'https://www.tipranks.com/', isFullReport: false,
          thesis: 'Raising price target post-Q3 results.'
        },
        // === Sep 8, 2025 - Reiterate $56 (FULL REPORT) ===
        {
          date: '2025-09-08',
          action: 'Reiterate',
          priceTarget: 56,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'Starlink Spectrum Buy Validates Strategy & Market Opportunity',
          source: 'Roth Capital Research',
          isFullReport: true,
          thesis: 'The Echostar fire sale continues as the company entered a definitive agreement to sell spectrum (AWS-4/H-block) to Starlink for $17B+. While providing Starlink with incremental capacity for D2D, we believe services will require next-gen satellites and smartphone refresh. The D2D go-to-market continues to favor ASTS with AT&T and Verizon relationships vs Starlink\'s T-Mobile partnership. The long-term story is unchanged. Maintain Buy and $56 PT.',
          reportSummary: `**$17B+ ECHOSTAR-STARLINK TRANSACTION**
This AM, Echostar announced it has entered a definitive agreement with SpaceX to sell the company's AWS-4 and H-block spectrum for $17B+ to Starlink. This consists of up to $8.5 billion in cash and up to $8.5 billion in SpaceX stock, plus ~$2B of SpaceX cash interest payments payable on EchoStar debt through November of 2027. We believe the transaction entails 50MHz of spectrum (5MHz of paired H-Block spectrum (1915-1920/1995-2000) and 20MHz of paired AWS-4 spectrum (2000-2020/2180-2200), which translates to ~$1.15 per MHz/pop). We believe this deal is consistent with FCC mandates, which under incoming Chairman Brendan Carr, continues to prioritize putting the spectrum into the hands of operators that will deploy services, and thus the economy (in contrast to the Echostar spectrum warehousing strategy).

**MORE D2D CAPACITY...AND DIRECT TO CONSUMER?**
Ultimately, this spectrum will enable incremental capacity for Starlink's Direct-to-Device ("D2D") services, which today are competitively deficient and simply provide text capabilities. To provide AST SpaceMobile-like services (broadband, voice & text), we believe Starlink will require next-gen satellites, as part of the regular satellite refresh cycle, but initial details are sparse. We also believe that current generation smartphones lack support for Echostar spectrum (AWS-4 and H-block spectrum, or bands 66 and 70). Importantly, beyond spectrum and satellites, the D2D model currently utilizes mobile network operators (MNOs) for go-to-market. At present, ASTS has agreements with AT&T and Verizon, while Starlink has a relationship with T-Mobile (text only services, at present). However, we believe that the amount of spectrum under the Echostar transaction (50MHz) opens the door for a direct to consumer model for D2D services, which is consistent with its broadband LEO strategy (FWA). This go-to-market strategy would likely push mobile operators into the ASTS ecosystem, in our opinion.

**STRATEGY VALIDATED AND LONG-TERM MODEL UNCHANGED**
While we expect ASTS shares to be weaker on the announcement, the Starlink move continues to validate the ASTS strategy and market opportunity. Additionally, the timeline to market should trail ASTS, given the lead times on satellite and smartphone upgrades. We also believe that a direct-to-consumer model would further enhance the ASTS partnerships with both domestic and international carriers. Additionally, with early T-Mo satellite text adoption validating the market opportunity (1.8M registrations or 1.5%+ penetration of the T-Mo subscriber base at launch), we believe that our estimates in 2028+ are conservative. Combined with our pricing assumptions of $10-15/month for superior services, we remain comfortable with our expectations and highlight that each incremental 50bp penetration of the top 10 MNO customers translates to $0.80+ incremental EPS by 2030. We maintain our Buy and $56PT.`,
          assumptions: [
            { label: 'Price Target', value: '$56.00' },
            { label: 'Stock Price (9/5/25)', value: '$42.41' },
            { label: '52-Week Range', value: '$17.72-$60.06' },
            { label: 'Shares Out (mil)', value: '269.13' },
            { label: 'Market Cap (mil)', value: '$15,007.57' },
            { label: 'Cash (mil)', value: '$939.4' },
            { label: 'Total Debt (mil)', value: '$490.2' },
          ],
          catalysts: [
            'Echostar spectrum sale validates D2D market opportunity',
            'ASTS maintains AT&T and Verizon relationships vs Starlink/T-Mobile',
            'T-Mo 1.8M registrations (1.5%+ penetration) validates market',
            'Each 50bp penetration of top 10 MNOs = $0.80+ incremental EPS by 2030',
          ],
          risks: [
            'Starlink incremental D2D capacity from Echostar spectrum',
            'Potential Starlink direct-to-consumer model bypassing MNOs',
            'Near-term share weakness expected on announcement',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy24: '4.4', fy25: '51.9', fy26: '159.8', fy27: '', fy28: '' },
            { metric: 'EBITDA ($M)', fy24: '(147.0)', fy25: '(180.0)', fy26: '(106.0)', fy27: '', fy28: '' },
            { metric: 'Non-GAAP EPS', fy24: '($1.96)', fy25: 'NM', fy26: 'NM', fy27: '', fy28: '' },
          ],
          methodology: 'Maintain $56 PT based on reduced discount rate due to mitigating risk factors around market adoption and access to capital. 2028-2030 EPS estimates believed to be conservative given T-Mo validation.',
          fullNotes: `REVENUE ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $0.5A | $0.9A | $1.1A | $1.9A | $4.4A |
| 2025E | $0.7A | $1.2E | $22.6E | $27.4E | $51.9E |
| 2026E | $27.2E | $34.4E | $43.4E | $54.8E | $159.8E |

EBITDA ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $30.6A | $33.7A | $44.2A | $38.8A | $(147.0)A |
| 2025E | $(44.2)A | $(50.5)E | $(43.7)E | $(41.3)E | $(180.0)E |
| 2026E | $(38.5)E | $(32.2)E | $(22.7)E | $(12.2)E | $(106.0)E |

DISCLOSURE: Roth Capital Partners. Scott W. Searle, CFA, Managing Director, Sr. Research Analyst. September 8, 2025.`
        },
        // === Jul 6, 2025 - PT Raise to $51 (FULL REPORT) ===
        {
          date: '2025-07-06',
          action: 'PT Raise',
          priceTarget: 51,
          previousTarget: 42,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'T-Mo Subs Validate D2D Opportunity; Raising PT to $51',
          source: 'Roth Capital Research',
          isFullReport: true,
          thesis: 'ASTS shares are up 89% since our April initiation (vs. 20% for the NASDAQ) driven by positive news flow and an improving competitive landscape. T-Mo\'s announcement of 1.8M registrations for Starlink-enabled D2D text services is a key market validation. With an inferior service (text vs. voice, text and broadband) and $10 pricing, we believe this is extremely positive for ASTS penetration and pricing. Raising our PT to $51.',
          reportSummary: `**T-MO OFFERS POSITIVE DATA POINTS FOR THE MARKET**
Beyond the funding, timing, and technical performance of commercial services, customer adoption and pricing are the most asked questions by institutional investors. While ASTS has not provided details or formal targets for subscriber penetration or anticipated ARPUs, T-Mo's recent disclosures of registrations for its Starlink-enabled Direct-to-Device (D2D) provide positive early market momentum. The anticipated service launch on 7/23 provides basic text, including E-911, versus the anticipated text, voice, and broadband capabilities of ASTS. The service is currently being marketed as free for Premium pricing plans ("Experience Beyond"), which offers an upsell opportunity, and $10 per month for other users. Importantly, T-Mo's 1.8M registrations are impressive and represent 1.5%+ penetration of the T-Mo subscriber base. This is penetration at year 2-3 in our current ASTS model for Verizon, AT&T, and Vodafone (crossing 2% in 2028). Combined with our pricing assumptions of $10-15/month for superior services, we remain comfortable with our expectations and highlight that each incremental 50bp penetration of the top 10 MNO customers translates to $0.80+ incremental EPS by 2030.

**OPPORTUNISTIC FINANCING POSITIONS CONSTELLATION FOR CONTINUED EXPANSION**
Opportunistically, an ASTS PIPE effectively traded new shares for retirement of $235M of 4.5% 2032 converts (net impact of 1.1M shares and EPS neutral). Additionally, we anticipate Ligado debt in late 2025 and believe that the company has been active against its existing $500M ATM given the recent stock price. Finally, ASTS added $100M of non-dilutive equipment financing to support ongoing network deployment in 2025 and 2026. In aggregate, we believe that ASTS is near-fully funded for phase 1 of its constellation commercialization (45-60 satellites).

**RAISING PT TO $51; MAINTAIN BUY**
We are adjusting our share count for the recent PIPE and $235M convert retirement (EPS net neutral). Given the T-Mo model validation, we are raising our PT to $51, on a reduced discount rate due to mitigating risk factors, particularly around expected market adoption and access to capital. While we believe there could be meaningful upside to our 2028-2030 EPS expectations. Given the early nature of commercial services, we expect shares to remain volatile ahead of 2H26 service commercialization and would look for entry points at modestly lower levels.

**POSITIVE NEWS FLOW TRACKS EXPECTATIONS**
In addition to T-Mo's model validation, news flow remains positive, launch timelines continue to broadly track expectations, and we believe the company is near-fully funded for phase 1 of the constellation commercialization (45-60 satellites). Importantly, ASTS continues to expect 5 launches over the next 6-9 months, with non-continuous coverage (20-25) anticipated by year-end, which should permit initial revenue recognition for select government contracts (consistent with our model).

**KEY DEVELOPMENTS**
• Fairwinds Technologies: Field tests for key defense-related use cases validate the technology performance of the AST SpaceMobile constellation with service-level capabilities sufficient to support VPNs and other military tactical requirements.
• Vodafone: Vodafone has announced its European JV with ASTS (SatCo) offering its European go-to-market channel, and Vi (Vodafone India) provides a formal relationship to service the 1.1B Indian market by expanding Vi's telecom services of terrestrial connectivity with voice, video, data streaming, and internet access.
• Ligado: A term sheet has been established to provide ASTS access to 45MHz of incremental midband spectrum (largely L-band) to enable broadband speeds of 120Mbps. We expect this to be phased in over the next several years as smartphones incorporate support for these frequencies.`,
          assumptions: [
            { label: 'Price Target', value: '$51.00' },
            { label: 'Prev Target', value: '$42.00' },
            { label: 'Stock Price (7/3/25)', value: '$45.60' },
            { label: '52-Week Range', value: '$11.88-$53.22' },
            { label: 'Shares Out (mil)', value: '248.25' },
            { label: 'Market Cap (mil)', value: '$15,396.38' },
            { label: 'Cash (mil)', value: '$874.5' },
            { label: 'Total Debt (mil)', value: '$465.9' },
          ],
          catalysts: [
            'T-Mo 1.8M registrations (1.5%+ penetration) validates D2D market',
            '$235M PIPE + convert retirement (EPS neutral)',
            '$100M non-dilutive equipment financing added',
            'Near-fully funded for Phase 1 (45-60 satellites)',
            '5 launches expected over next 6-9 months',
            'Non-continuous coverage (20-25 sats) by year-end',
            'Fairwinds defense field tests validate technology',
            'Vodafone European JV (SatCo) + Vi India relationship',
            'Ligado 45MHz L-band term sheet for 120Mbps speeds',
          ],
          risks: [
            'Shares expected to remain volatile ahead of 2H26 commercialization',
            'Early nature of commercial services',
            'Would look for entry points at modestly lower levels',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy24: '4.4', fy25: '60.7', fy26: '159.8', fy27: '', fy28: '' },
            { metric: 'EBITDA ($M)', fy24: '(147.0)', fy25: '(157.5)', fy26: '(81.1)', fy27: '', fy28: '' },
            { metric: 'Non-GAAP EPS', fy24: '($1.96)', fy25: 'NM', fy26: 'NM', fy27: '', fy28: '' },
          ],
          methodology: 'PT raised to $51 on reduced discount rate due to mitigating risk factors around market adoption (T-Mo validation) and access to capital (PIPE, ATM, equipment financing). Each incremental 50bp penetration of top 10 MNOs = $0.80+ EPS by 2030.',
          fullNotes: `2028E EPS SENSITIVITY ANALYSIS (by ARPU and Avg Subscribers):
| ARPU | 9.0M | 9.5M | 10.0M | 10.5M | 11.0M | 11.5M | 12.0M | 12.5M |
| $5.00 | $0.08 | $0.16 | $0.24 | $0.32 | $0.40 | $0.48 | $0.56 | $0.64 |
| $6.00 | $0.37 | $0.46 | $0.56 | $0.65 | $0.75 | $0.84 | $0.94 | $1.03 |
| $6.50 | $0.51 | $0.61 | $0.72 | $0.82 | $0.92 | $1.03 | $1.13 | $1.23 |
| $7.00 | $0.65 | $0.76 | $0.87 | $0.99 | $1.10 | $1.21 | $1.32 | $1.43 |
| $7.50 | $0.80 | $0.91 | $1.03 | $1.15 | $1.27 | $1.39 | $1.51 | $1.63 |
| $8.00 | $0.94 | $1.06 | $1.19 | $1.32 | $1.45 | $1.57 | $1.70 | $1.83 |
| $8.50 | $1.08 | $1.22 | $1.35 | $1.49 | $1.62 | $1.75 | $1.89 | $2.02 |
| $9.00 | $1.22 | $1.37 | $1.51 | $1.65 | $1.79 | $1.94 | $2.08 | $2.22 |
Note: Yellow brackets the existing estimates.

2030E EPS SENSITIVITY FOR TOP 10 OEM PARTNER PENETRATION:
| ARPU | 1.0% | 1.5% | 2.0% | 2.5% | 3.0% | 3.5% | 4.0% | 4.5% |
| $5.00 | $0.48 | $1.41 | $2.53 | $3.18 | $3.84 | $4.49 | $5.14 | $5.80 |
| $6.00 | $0.85 | $1.97 | $3.05 | $3.84 | $4.62 | $5.41 | $6.19 | $6.98 |
| $6.50 | $1.04 | $2.25 | $3.31 | $4.16 | $5.01 | $5.86 | $6.71 | $7.56 |
| $7.00 | $1.23 | $2.53 | $3.57 | $4.49 | $5.41 | $6.32 | $7.24 | $8.15 |
| $7.50 | $1.41 | $2.81 | $3.84 | $4.82 | $5.80 | $6.78 | $7.76 | $8.74 |
| $8.00 | $1.60 | $3.09 | $4.10 | $5.14 | $6.19 | $7.24 | $8.28 | $9.33 |
| $8.50 | $1.79 | $3.37 | $4.36 | $5.47 | $6.58 | $7.69 | $8.81 | $9.92 |
| $9.00 | $1.97 | $3.66 | $4.62 | $5.80 | $6.98 | $8.15 | $9.33 | $10.51 |
Note: Yellow brackets the existing estimates.

REVENUE ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $0.5A | $0.9A | $1.1A | $1.9A | $4.4A |
| 2025E | $0.7A | $10.0E | $22.6E | $27.4E | $60.7E |
| 2026E | $27.2E | $34.4E | $43.4E | $54.8E | $159.8E |

EBITDA ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $30.6A | $33.7A | $44.2A | $38.8A | $(147.0)A |
| 2025E | $(44.2)A | $(40.5)E | $(37.5)E | $(35.2)E | $(157.5)E |
| 2026E | $(32.3)E | $(26.1)E | $(16.5)E | $(6.1)E | $(81.1)E |

PRIOR NON-GAAP EPS ESTIMATES:
| 2026E | $(0.23)E | $(0.23)E | $(0.22)E | $(0.20)E | $(0.88)E |

DISCLOSURE: Roth Capital Partners. Scott W. Searle, CFA, Managing Director, Sr. Research Analyst. July 6, 2025.`
        },
        // === Apr 10, 2025 - Initiation of Coverage $42 (FULL REPORT - 29 pages) ===
        {
          date: '2025-04-10',
          action: 'Initiation',
          priceTarget: 42,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'ASTS: D2D Pioneer Set for Launch; Initiating Coverage With a Buy and $42PT',
          source: 'Roth Capital Research',
          isFullReport: true,
          thesis: 'We are initiating coverage of AST SpaceMobile (ASTS) with a Buy rating and $42PT. ASTS is a satellite pioneer of direct-to-device (D2D) broadband cellular services that utilize existing mobile network operator (MNO) spectrum to deliver connectivity to a pre-existing base of 5.6B unique global smartphone users. With 85-90% of the Earth uncovered by terrestrial services, we estimate a 2030 TAM of $30B+. With the company near-fully funded and network commercialization expected to ramp up in 2026, we expect rapidly accelerating sales growth in late 2026/2027.',
          reportSummary: `**WHAT IS AST SPACEMOBILE?**
AST SpaceMobile is a next-gen Low Earth Orbit ("LEO") constellation that provides direct-to-device (D2D) broadband cellular services. However, whereas historic solutions (and existing competitors) used proprietary protocols and frequencies, AST SpaceMobile is a standards-based (4G/5G) solution that utilizes existing carrier spectrum. In essence, this translates to an addressable ecosystem and installed base of 5B+ unique cellular users; or everyone who has a smartphone. By essentially roaming with existing carriers, ASTS plugs the gaps in terrestrial coverage which total 85-90% of the Earth's surface. The bottom line is that ASTS is a paradigm shift to provide global broadband coverage with Direct-to-Device capabilities.

**A $30B+ MARKET OPPORTUNITY**
AST SpaceMobile addresses an estimated $30B+ TAM (ROTH estimates) for direct-to-device (D2D) services. This is headlined by complementing the $1T+ market (source: AST SpaceMobile) for traditional terrestrial cellular services for subscribers that move in and out of cellular coverage—an estimated 3.4B people, representing $25B+ of subscription services by the end of the decade (source: GSMA: Satellite and NTN Summit). Beyond D2D services for MNOs (mobile network operators), ASTS has significant near-term opportunities servicing government, emergency services and select verticals such as maritime applications. Combined, we estimate these markets to comprise billions of dollars of annual opportunity. Finally, the rapidly emerging non-terrestrial network (NTN) opportunity for IoT devices is expected to ramp from less than $1B in 2024 with an estimated 4-5M connected devices, to billions of dollars with tens of millions of devices by the end of the decade.

**THE AST SPACEMOBILE SOLUTION — A DEFENSIBLE MOAT**
Key elements of the AST SpaceMobile solution include:
• A technology moat: ASTS is vertically integrated. The company supplies its own ASICs (AST5000 for next-gen satellites) and manufactures its own satellites at its Midland, Texas facility. This provides performance, cost and time-to-market advantages. This vertical integration is also supported by a strong IP portfolio around Doppler, beam forming, interference management, etc. (3,450 patent and patent-pending claims worldwide, of which approximately 1,390 have been officially granted or allowed). To date, the constellation has demonstrated throughput of 21Mbps with a near-term roadmap to 120Mbps. In contrast, competing solutions, including Starlink, offer simple text, voice or narrowband data capabilities.
• Regulatory simplicity: By utilizing existing carrier spectrum, the resource (spectrum) has already been allocated. The process only requires regulatory approval for D2D services. In the US, the FCC has granted the company Special Temporary Authority (STA) authorizing testing service, which we expect to evolve to approval for commercial services in 2H25. The company is going through a similar approval process in select international markets. Again, the spectrum is supported by an existing installed base of 5.6B unique global subscribers.
• Unique carrier relationships (and, in some cases, investment): ASTS has relationships with 50 carrier partners covering 3B+ subs including the Vodafone Group, AT&T, Verizon, Rakuten Mobile, Bell Canada, Orange, Telefonica, and TIM. Additionally, the company has secured strategic investment from AT&T, Google, Verizon, Vodafone, Rakuten, Bell Canada and American Tower. This provides an immediately addressable installed subscriber base to extend coverage.

**KEY MNO CUSTOMERS**
AST SpaceMobile has partnership agreements with 50 operators covering 3B+ subscribers. This list includes Vodafone Group, AT&T, Verizon, Rakuten Mobile, Bell Canada, Orange, Telefonica, TIM, Saudi Telecom Company, Zain KSA, Etisalat, Indosat Ooredoo Hutchison, Telkomsel, Smart Communications, Globe Telecom, Millicom, Smartfren, Telecom Argentina, MTN, Telstra, Africell, Liberty Latin America and others. Initial operations are expected to start in the US market upon anticipated regulatory approval in 3Q25 (largely expected to be beta subs and other "friendlies"), with ramping commercial sales in 2027. Similarly, we expect initial international contribution starting in late 2025 (markets serviceable above 30 degrees North latitude) with the full 2026 constellation accelerating driven by the Vodafone relationship.

**TOP 10 MNO RELATIONSHIPS**
| MNO | Markets | Subs | Investor | Notes |
| AT&T | United States | 118M | X | AST SpaceMobile investor |
| Verizon | United States | 115M | X | AST SpaceMobile investor |
| Vodafone | 15 markets | 261M | X | 71M Europe & 165M Africa, 158M IoT |
| Rakuten Mobile | Japan | 8M | X | New Japanese Operator |
| Bell Canada | Canada | 10M | X | AST SpaceMobile investor |
| Orange | 26 countries | 253M | — | 160M+ in Africa & MidEast |
| Telefonica | 12 markets Europe/LatAm | 299M | — | Pan-European/LatAm MNO |
| TIM | Italy & Brazil | 30M | — | — |
| Saudi Telecom | Saudi Arabia & MidEast | 30M | — | — |
| Zain | 7 markets | 54M | — | Pan Mideast/African MNO |

**NEAR FULLY FUNDED**
Over the past 5+ years, AST SpaceMobile has raised over $1.1B of capital, not including investments from strategic investors. This spans a combination of equity offerings, warrants, strategic investments (including carrier partners) and converts. Post the most recent raise ($460M convertible notes on 1/27/25), ASTS has $950M+ on the balance sheet. We estimate that phase 1 of the constellation deployment (45-60 satellites) will cost an additional ~$1B+ of cap-ex to commercialization, with the total global constellation (95 satellites) costs slightly exceeding $2B. Importantly, we believe that expansion beyond primary North American coverage can scale investment according to FCF and the ability to tap capital markets. Overall, ASTS's cost of capital has dramatically improved. Additionally, the company also has access to low-cost quasi-government funding.

Again, we estimate Adj EBITDA break-even for the initial constellation at 4-5M subs, with the global constellation at 6-7M subs. The constellation becomes internally fundable at an incremental 1M+ subs and ~3M subs for NA and global operations, respectively, given an estimated satellite commercial lifetime of seven years.

**VALUATION**
We are initiating coverage of ASTS with a Buy rating and $42PT. ASTS is effectively pre-revenue, but on the verge of a meaningful commercialization of services. However, the ASTS constellation with D2D capabilities combined with global operator partnerships is unique in the marketplace, in our opinion. Overall, ASTS has significant first mover and performance advantages versus legacy and next-gen satellite constellations. With break-even at ~2% US partner penetration (4-5M subs with phase 1 of 45-60 satellites), we see several dollars of earnings power as we approach 2030 (~$3.00+, or ~1.5% penetration (~18M subs) of the existing top 10 MNO customers). Consequently, we see longer-term upside to $74, or 25x 2030 EPS. We discount this target back 15% over 4 years to reach our $42PT.

Near-term we expect shares to be volatile and event driven, i.e. launch news, MNO relationships, etc., particularly given the current EV/2027 sales multiple of 15-20x. Consequently, we caution some near-term patience and to buy on the dips (such as we have been experiencing over the past two weeks). Also, Street consensus expectations entail significant sales ramps in 2026+, which could be subject to delays, in our opinion.

**RISKS**
• Unproven financial model: At present, ASTS has an unproven financial model. While arguably a meaningful opportunity exists for global satellite-based connectivity (mil/aero/gov, emergency services, consumer roaming, verticals, IoT, etc.), the pricing model has yet to be accepted in the marketplace. However, given the 3B+ sub installed base from its 50 global operators and North America subset of 200M+ subs (AT&T, Verizon) we believe that some fluidity and evolution of the pricing model does not materially derail the long-term opportunity. Again, we highlight adj EBITDA break-even in North America at 4-5M subs under our current model in late 2027.
• Additional capital requirements: We estimate that ASTS capital requirements to fully deploy phase 1 of the constellation (45+ satellites) and funding of operating losses translates to incremental capital slightly in excess of $1B. Post the January 2025 $460M convert offering, ASTS has $900M of cash on the balance sheet. Additionally, we believe that ASTS maintains adequate access to capital markets to fund the constellation completion and can scale its investment to 90 satellites in a more constrained capital environment.
• Competition: The market for satellite services is highly competitive including legacy GEO offerings, as well as high profile next-gen constellations, most notably Starlink among others. However, legacy constellations require specialized devices and entail significantly higher pricing models (typically $60-100+). Meanwhile, although Starlink occupies significant investor attention, the constellation has been constructed predominantly for broadband communications (FWA) and utilizes specialized equipment. Its most recent D2D services are text oriented (currently offered through T-Mobile) and the timeline for a full constellation (300-400 satellites with a planned 840 D2D satellite constellation) is undisclosed. However, we believe that architecture including power limitations translates to speeds significantly below AST SpaceMobile (14Mbps versus 120Mbps). Finally, IoT optimized constellations remain in the early deployment phase (Sateliot) and will address the lower end of the market (lower revisit rates, speeds, latency and ARPUs).
• Technology risk: While the first five Bluebird satellites have been successfully deployed and tested, there remains technology risk associated with the AST SpaceMobile constellation. This includes the successful launch of the remaining 45+ satellite constellation over the next 18 months. Additionally, further design assembly, integration, testing and launch of satellites and ground infrastructure will be ongoing. Compounding this are potential for delays and incremental costs associated with the development, launch and commercialization of the constellation as witnessed by the expected increase in satellite costs from $14M to between $15M and $19M for the next round of launches. That said, we believe that AST SpaceMobile has made significant advances with the launch of the first wave of satellites and the next wave of satellites has been contracted for launch services.
• Regulatory approval: AST SpaceMobile relies on MNO partners' spectrum and regulatory approval to operate in each market. Given that the company utilizes existing terrestrial spectrum licensed by MNOs, regulatory approval in each country is required to operate the constellation for MSS use. This process can be prolonged and subject to delays. Additionally, global D2D services could therefore be disrupted by select markets not achieving regulatory approval. To date, ASTS has regulatory approval in the US and is working towards approval in Europe and other markets.
• Global impacts: AST SpaceMobile is subject to multiple global issues including supply chain (components, etc.), regulatory approval, and geopolitical uncertainty.`,
          assumptions: [
            { label: 'Price Target', value: '$42.00' },
            { label: 'Stock Price (4/9/25)', value: '$24.14' },
            { label: '52-Week Range', value: '$2.02-$38.60' },
            { label: 'Shares Out (mil)', value: '227.10' },
            { label: 'Market Cap (mil)', value: '$6,424.78' },
            { label: 'Cash (mil)', value: '$982.0' },
            { label: 'Total Debt (mil)', value: '$618.0' },
            { label: 'Long-term Upside PT', value: '$74.00' },
            { label: 'Valuation Method', value: '25x 2030 EPS, 15% discount' },
            { label: 'TAM (2030E)', value: '$30B+' },
            { label: 'Break-even Subs', value: '4-5M (~2% penetration)' },
            { label: 'MNO Partners', value: '50 carriers, 3B+ subs' },
          ],
          catalysts: [
            'Near-fully funded for Phase 1 constellation (45-60 satellites)',
            '$460M convertible notes (Jan 2025) → $950M+ cash',
            'FCC STA granted; commercial approval expected 2H25',
            'Commercial services expected to commence 2H25 (beta), 2H26 (widespread)',
            '50 MNO partnerships covering 3B+ subscribers globally',
            'Strategic investors: AT&T, Verizon, Vodafone, Google, Rakuten, Bell Canada, American Tower',
            'Vodafone JV (SatCo) to accelerate European deployment',
            'Ligado 45MHz L-band spectrum access for 120Mbps speeds',
            '$43M SDA government contract (12-month recognition)',
          ],
          risks: [
            'Unproven financial model — pricing yet to be validated in marketplace',
            'Additional capital requirements of ~$1B+ for Phase 1 completion',
            'Competition from Starlink (840 D2D satellites planned), legacy GEO providers',
            'Technology risk — 45+ satellites to launch over next 18 months',
            'Satellite cost inflation: $14M → $15-19M per satellite',
            'Regulatory approval required in each market; potential delays',
            'Global supply chain and geopolitical risks',
          ],
          estimates: [
            { metric: 'Revenue ($M)', fy24: '4.4', fy25: '48.0', fy26: '159.8', fy27: '482.2', fy28: '929.7', fy29: '1,361.9', fy30: '1,781.3' },
            { metric: 'Adj EBITDA ($M)', fy24: '(147.0)', fy25: '(158.8)', fy26: '(78.7)', fy27: '(5.5)', fy28: '307.0', fy29: '711.8', fy30: '1,147.2' },
            { metric: 'EBITDA Margin %', fy24: 'NM', fy25: 'NM', fy26: 'NM', fy27: 'NM', fy28: '17.9%', fy29: '37.0%', fy30: '58.4%' },
            { metric: 'Operating Income ($M)', fy24: '(145.8)', fy25: '(242.8)', fy26: '(258.9)', fy27: '(266.1)', fy28: '(63.6)', fy29: '307.0', fy30: '1,107.2' },
            { metric: 'Net Income ($M)', fy24: '(221.7)', fy25: '(526.3)', fy26: '(266.4)', fy27: '(289.7)', fy28: '(88.6)', fy29: '285.5', fy30: '709.9' },
            { metric: 'Non-GAAP EPS', fy24: '($1.96)', fy25: '($0.58)', fy26: '($0.87)', fy27: '($0.87)', fy28: '($0.25)', fy29: '$0.75', fy30: '$1.96' },
            { metric: 'Cap-Ex ($M)', fy24: '$57M', fy25: '$119M', fy26: '$174M', fy27: '$310M', fy28: '$560M', fy29: '$230M', fy30: '$60M' },
          ],
          methodology: 'Initiate with Buy and $42PT. Long-term upside to $74 based on 25x 2030 EPS (~$3.00+). Discount $74 target back 15% per year over 4 years = $42. Break-even Adj EBITDA at 4-5M subs (~2% US partner penetration). Each 1% penetration of top 10 MNOs (~1.2B subs) = ~$1.50+ incremental fully taxed EPS.',
          fullNotes: `THE MODEL — REVENUE SEGMENTS:
• Military/aerospace, government and emergency services: To date, AST SpaceMobile has established a relationship with the SDA for critical government applications such as the Proliferated Warfighter Space Architecture representing a total of $43M of multi-year contract value. Further opportunities include emergency services (such as disaster recovery, FEMA). We believe the addressable market for ASTS could exceed $100M annually by the end of the decade.
• Maritime and other verticals: Geographically limited markets provide a near-term opportunity including maritime (government, commercial and personal), oil & gas (ocean rigs, remote operations), mining, etc. We estimate this opportunity at hundreds of thousands of addressable devices that could exceed $50M of annual revenue by the end of the decade.
• Consumer and enterprise: Via relationships with 45 operators including Verizon, AT&T, Vodafone, etc., AST SpaceMobile will launch its consumer services in 3Q25. This is expected to be the largest contributor to sales starting in 2026. Initially this will target US (first expected approval) and then international operators within 30 degrees North latitude. Services offerings are expected to comprise a combination of monthly subscriptions and day passes. While the model remains fluid, initial market pricing with T-Mobile on the limited Starlink network (text only) is charging $15-20/month. With the recently expanded Vodafone relationship (SatCo JV for European MNOs), we expect Europe/Vodafone to ramp in late 2026 (covering ~600M potential subs).
• IoT: We expect lower pricing on IoT subscription services given more limited utilization rates. However, with the addressable market measured in tens of million of units we believe that IoT could exceed $100M of annual sales by 2030. We expect this opportunity to ramp more meaningfully in 2027+ with global coverage.

SALES MODEL — QUARTERLY ESTIMATES:
| Quarter | 1Q26E | 2Q26E | 3Q26E | 4Q26E | 1Q27E | 2Q27E | 3Q27E | 4Q27E |
| Subscription | $7.2 | $14.4 | $23.4 | $34.8 | $52.7 | $77.7 | $105.6 | $136.2 |
| Other/Gov | $20.0 | $20.0 | $20.0 | $20.0 | $25.0 | $25.0 | $30.0 | $30.0 |
| Total Rev | $27.2 | $34.4 | $43.4 | $54.8 | $77.7 | $102.7 | $135.6 | $166.2 |

SUBSCRIBER PENETRATION MODEL:
| Year | 2026E | 2027E | 2028E | 2029E | 2030E |
| Developed Markets | 0.2M | 1.7M | 5.8M | 9.2M | 13.0M |
| Developing Markets | 0.0M | 0.0M | 0.4M | 0.8M | 1.2M |
| IoT/Other | 0.3M | 0.5M | 0.8M | 1.1M | 1.7M |
| Total Subs | 0.5M | 2.9M | 5.7M | 7.2M | 14.0M |
| Penetration (Top 10 MNOs) | 0.0% | 0.1% | 0.5% | 0.8% | 1.2% |

REVENUE MIX BY SEGMENT:
| Segment | 2026E | 2027E | 2028E | 2029E | 2030E |
| Subscription | 50% | 72% | 77% | 85% | 92% |
| Other/Gov | 50% | 24% | 22% | 15% | 8% |

2028E EPS SENSITIVITY ANALYSIS (ARPU × Average Subscribers):
| ARPU | 9.0M | 9.5M | 10.0M | 10.5M | 11.0M | 11.5M | 12.0M | 12.5M |
| $5.00 | $0.08 | $0.16 | $0.24 | $0.32 | $0.40 | $0.48 | $0.56 | $0.64 |
| $6.00 | $0.37 | $0.46 | $0.56 | $0.65 | $0.75 | $0.84 | $0.94 | $1.03 |
| $6.50 | $0.51 | $0.61 | $0.72 | $0.82 | $0.92 | $1.03 | $1.13 | $1.23 |
| $7.00 | $0.65 | $0.76 | $0.87 | $0.99 | $1.10 | $1.21 | $1.32 | $1.43 |
| $7.50 | $0.80 | $0.91 | $1.03 | $1.15 | $1.27 | $1.39 | $1.51 | $1.63 |
| $8.00 | $0.94 | $1.06 | $1.19 | $1.32 | $1.45 | $1.57 | $1.70 | $1.83 |
| $8.50 | $1.08 | $1.22 | $1.35 | $1.49 | $1.62 | $1.75 | $1.89 | $2.02 |
| $9.00 | $1.22 | $1.37 | $1.51 | $1.65 | $1.79 | $1.94 | $2.08 | $2.22 |
Note: Yellow brackets ($6.50-$7.00 ARPU, 9.5-10.0M subs) = existing estimates.

2030E EPS SENSITIVITY FOR TOP 10 OEM PARTNER PENETRATION:
| ARPU | 1.0% | 1.5% | 2.0% | 2.5% | 3.0% | 3.5% | 4.0% | 4.5% |
| $5.00 | $0.48 | $1.41 | $2.53 | $3.18 | $3.84 | $4.49 | $5.14 | $5.80 |
| $6.00 | $0.85 | $1.97 | $3.05 | $3.84 | $4.62 | $5.41 | $6.19 | $6.98 |
| $6.50 | $1.04 | $2.25 | $3.31 | $4.16 | $5.01 | $5.86 | $6.71 | $7.56 |
| $7.00 | $1.23 | $2.53 | $3.57 | $4.49 | $5.41 | $6.32 | $7.24 | $8.15 |
| $7.50 | $1.41 | $2.81 | $3.84 | $4.82 | $5.80 | $6.78 | $7.76 | $8.74 |
| $8.00 | $1.60 | $3.09 | $4.10 | $5.14 | $6.19 | $7.24 | $8.28 | $9.33 |
| $8.50 | $1.79 | $3.37 | $4.36 | $5.47 | $6.58 | $7.69 | $8.81 | $9.92 |
| $9.00 | $1.97 | $3.66 | $4.62 | $5.80 | $6.98 | $8.15 | $9.33 | $10.51 |
Note: Yellow brackets ($6.50-$7.00 ARPU, 1.5-2.0% penetration) = existing estimates. EPS taxed at 30% above 1.5% penetration in 2030.

EPS SENSITIVITY TO TOP 10 MNO PENETRATION (2026-2030E):
| Scenario | 2026E | 2027E | 2028E | 2029E | 2030E |
| Aggressive (2.3%) | ($0.80) | $0.22 | $1.69 | $3.35 | $4.98 |
| Moderate (1.5%) | ($0.87) | ($0.26) | $0.75 | $1.85 | $2.95 |
| Low (1.0%) | ($0.89) | ($0.64) | ($0.11) | $0.56 | $1.33 |

SATELLITE CONSTELLATION COMPARISON:
| Provider | Constellation | Frequency | # Satellites | Altitude | Latency | Lifetime | ARPU | Service |
| AST SpaceMobile | LEO | Cellular (850MHz) | 45+/95 | 508-527km | 20-40ms | 7+ yrs | $5-15* | Broadband cellular (120Mbps), 50 MNO relationships |
| Starlink | LEO | Ku/D2D | 7,000/12,000+ | 540-570km | 30ms | 5-7 yrs | $100/$15+ | Broadband FWA, Cellular: Text only, 6 MNO relationships |
| Viasat | GEO | Ku & KA | 3 | 35,786km | 560ms | 15 yrs | $350-$1k+ | Voice & data (up to 100Mbps) |
| Iridium | LEO | L Band | 66 | 780km | 40-50ms | 12.5 yrs | $60-100 | Voice & narrowband data |
| OneWeb | LEO | Ku | 716/6,372 | 1,200km | ~40ms | ~5 yrs | TBD | Broadband |
| Kuiper (Amazon) | LEO | KA | 578/3,236 | 590-630km | ~30ms | 7 yrs | TBD | Broadband FWA |
| Telesat | LEO | KA | 298/1,671 | 1,015-1,320km | 40-50ms | 10-12 yrs | TBD | Broadband FWA |
| Lynk | LEO | Cellular | 5/38 | 456-545km | NA | 7+ yrs | TBD | Text, voice, data. 35+ MNO relationships |
* ROTH Capital expectations

BALANCE SHEET (Historical):
| Item | 2021 | 2022 | 2023 | 2024 |
| Cash & equivalents | $324.5M | $239.3M | $88.1M | $567.5M |
| Total current assets | $335.8M | $268.3M | $106.9M | $600.2M |
| PP&E | $95.9M | $146.0M | $238.5M | $337.7M |
| Total Assets | $443.9M | $438.4M | $360.9M | $954.6M |
| Total current liabilities | $21.4M | $27.8M | $46.2M | $75.9M |
| LT Debt & Cap Lease | $5.0M | $4.8M | $59.3M | $155.6M |
| Total liabilities | $92.0M | $39.6M | $117.4M | $244.2M |
| Total Equity | $352.0M | $359.8M | $213.6M | $669.1M |

INCOME STATEMENT ESTIMATES:
| Metric | 2025E | 2026E | 2027E | 2028E | 2029E | 2030E |
| Revenue | $48.0M | $159.8M | $482.2M | $929.7M | $1,361.9M | $1,781.3M |
| Gross Profit | $22.5M | $116.8M | $427.2M | $862.2M | $1,291.9M | $1,711.3M |
| Engineering | $78.1M | $89.3M | $93.8M | $98.6M | $103.4M | $108.2M |
| R&D | $28.8M | $29.1M | $34.7M | $40.3M | $45.9M | $51.5M |
| G&A | $108.3M | $119.9M | $220.1M | $317.5M | $371.5M | $399.6M |
| Operating Income | $(242.8)M | $(258.9)M | $(266.1)M | $(63.6)M | $307.0M | $1,107.2M |
| Net Income | $(526.3)M | $(266.4)M | $(289.7)M | $(88.6)M | $285.5M | $709.9M |
| Shares (FD) | 324.0M | 324.0M | 334.0M | 354.5M | 378.2M | 378.2M |
| EPS (Basic) | $(1.41) | $(0.84) | $(0.87) | $(0.16) | $1.18 | $3.08 |
| Pro Forma EPS (FD) | $(0.58) | $(0.87) | $(0.87) | $(0.25) | $0.75 | $1.96 |

TECHNICAL STRATEGY (JC O'Hara, CAIA, CMT):
After trading in a well-defined downtrend starting in early 2021, ASTS was able to surge above resistance and form a higher high in June 2024. That swift move put many of our technical indicators into overbought conditions. Over the last few months, ASTS has been consolidating, showing sturdy support at $20 and stiff resistance at $35.50. Price has started to bounce nicely off support with an upside target closer to $35.

OPTIONS INSIGHTS (Alex Panagiotidis, Head of Derivatives):
ASTS's implied volatility appears fairly priced, trading at the 35th percentile over the prior year (2-month expiry) and at a small premium to 30-day realized volatility. The total Open Interest is ~645k contracts, skewed ~2:1 toward call options with January 2026 having the top 5 open interest positions (could be related to its convert). The average daily options volume of the last 20 days is ~64k contracts. ASTS is particularly volatile around financial disclosures such as earnings, where the average absolute earnings day move has been ~35% over the prior 1 year. ASTS has been moving ~7.12% per day over the prior one month.

DISCLOSURE: Roth Capital Partners, LLC. Scott W. Searle, CFA, Managing Director, Sr. Research Analyst. ssearle@roth.com (646) 616-2782. April 10, 2025. Important Disclosures & Regulation AC Certification(s) are located on pages 27 to 29 of this report.`
        }
      ]
    }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DERIVED METRICS AND HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Flatten all reports for aggregate calculations
  const allReports = ANALYST_COVERAGE.flatMap(coverage => 
    coverage.reports.map(report => ({
      ...report,
      firm: coverage.firm,
      analyst: coverage.analyst
    }))
  );
  
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
      case 'Initiation': return 'var(--cyan)';
      case 'Upgrade': case 'PT Raise': return 'var(--mint)';
      case 'Downgrade': case 'PT Cut': case 'Double Downgrade': return 'var(--coral)';
      case 'Reiterate': case 'Maintained': case 'Update': return 'var(--text3)';
      default: return 'var(--text3)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--cyan)', fontFamily: 'Space Mono' }}>
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
                  <span style={{ color: 'var(--mint)' }}>${highPT}</span>
                  <span style={{ color: 'var(--text3)' }}> / </span>
                  <span style={{ color: 'var(--coral)' }}>${lowPT}</span>
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
        <div className="card-title">🏦 Coverage by Firm ({totalAnalysts} Analysts)</div>
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
                  border: isExpanded ? '1px solid var(--cyan)' : '1px solid var(--border)',
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
                      <span style={{ padding: '2px 6px', background: 'var(--cyan)', color: 'white', borderRadius: 4 }}>
                        {fullReportCount} Reports
                      </span>
                      <span style={{ padding: '2px 6px', background: 'var(--surface3)', color: 'var(--text3)', borderRadius: 4 }}>
                        {updateCount} Updates
                      </span>
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
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12 }}>COVERAGE HISTORY ({coverage.reports.length} entries)</div>
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
                              borderLeft: report.isFullReport ? '3px solid var(--cyan)' : '3px solid var(--border)'
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
                                    style={{ fontSize: 10, color: 'var(--cyan)', textDecoration: 'none' }}
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
                                      color: 'var(--cyan)',
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
                                              {a.label}: <span style={{ color: 'var(--cyan)' }}>{a.value}</span>
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
const FinancialsTab = () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // UNIFIED FINANCIALS TAB - Canonical structure shared across all models
  // Only data and labels differ between ASTS, BMNR, and CRCL
  // ═══════════════════════════════════════════════════════════════════════════
  
  // === COMPANY-SPECIFIC CONFIGURATION ===
  const config = {
    highlightTitle: 'Historical Quarterly Metrics',
    highlightText: 'Track ASTS\'s financial evolution from pre-SPAC private company through commercial constellation deployment. All data sourced from SEC filings (10-K, 10-K/A, 10-Q). Compare any two quarters to see growth and changes.',
    secFiling: {
      cik: '0001780312',
      ticker: 'ASTS',
      exchange: 'NASDAQ',
      firstFiling: { date: 'April 6, 2021', description: 'SPAC Close / 8-K' },
      latestEvent: { date: 'Dec 24, 2025', description: 'BB6 Launch' },
      lastPR: { date: 'December 24, 2025', title: 'BB6 Successful Orbital Launch' },
      filings: {
        '10-K': { date: 'March 3, 2025', description: 'FY 2024', color: 'blue' },
        '10-Q': { date: 'Nov 10, 2025', description: 'Q3 2025', color: 'purple' },
        '8-K': { date: 'Dec 24, 2025', description: 'BB6 Launch', color: 'yellow' },
        'S-3': { date: 'Oct 2025', description: 'Shelf Registration', color: 'green' },
        '424B5': { date: 'Oct 2025', description: '$1.15B Converts', color: 'orange' },
        'DEF 14A': { date: '—', description: 'Proxy (Annual)', color: 'cyan' },
      }
    },
    badge4Label: 'Satellites',
    chartATitle: 'Satellites Deployed',
    chartAColor: 'cyan',
    chartAKey: 'satellites',
    milestones: [
      { date: 'April 2021', event: 'SPAC Close: $462M' },
      { date: 'Dec 2022', event: 'Equity: $68.6M @ $5.50' },
      { date: 'Aug 2023', event: 'Atlas Debt: $48.5M' },
      { date: 'Jan 2024', event: 'Equity: $107.7M @ $3.10' },
      { date: 'Jan 2025', event: 'Converts: $460M @ 4.25%' },
      { date: 'Oct 2025', event: 'Converts: $1B+ @ 2%' },
      { date: 'Oct 2025', event: 'Ligado Spectrum: $550M' },
      { date: 'YE 2025', event: 'stc Prepay: $175M' },
    ],
    cfaNotes: [
      { term: 'SEC Filing Types', def: '10-K (annual audited), 10-Q (quarterly reviewed), 8-K (material events). 10-K/A is amended annual filing.' },
      { term: 'Pre-Revenue Stage', def: 'ASTS currently pre-commercial revenue. Track CapEx spend, cash burn, and milestones toward first commercial service.' },
      { term: 'Quarter-over-Quarter', def: 'Compare sequential quarters to see operational progress. YoY comparisons less meaningful for rapidly evolving pre-revenue companies.' },
      { term: 'Cash Flow Focus', def: 'For pre-revenue: watch cash burn rate, runway, and capital raise timing. Operating cash flow negative until commercial operations.' },
      { term: 'CapEx Intensity', def: 'Satellite manufacturing and launch costs. Track per-satellite cost trends ($21-23M current guidance).' },
      { term: 'Gateway Revenue', def: 'Current revenue stream from ground station equipment. Bridge revenue until commercial satellite services launch.' },
    ],
  };
  
  const colorClasses = {
    blue: 'bg-blue-900/20 border-blue-800/30 text-blue-400',
    purple: 'bg-purple-900/20 border-purple-800/30 text-purple-400',
    yellow: 'bg-yellow-900/20 border-yellow-800/30 text-yellow-400',
    green: 'bg-green-900/20 border-green-800/30 text-green-400',
    orange: 'bg-orange-900/20 border-orange-800/30 text-orange-400',
    cyan: 'bg-cyan-900/20 border-cyan-800/30 text-cyan-400',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HEADER                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 className="section-head">Financials</h2>
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: HIGHLIGHT BOX                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="highlight">
        <h3>{config.highlightTitle}</h3>
        <p className="text-sm text-slate-300">{config.highlightText}</p>
      </div>
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: KEY METRICS EVOLUTION                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <QuarterlyMetricsPanel />
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8: KEY FINANCIAL MILESTONES                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
        <h4 className="text-sm font-medium text-yellow-400 mb-3">📅 Key Financial Milestones</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {config.milestones.map((m, i) => (
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
      <CFANotes title="CFA Level III — Financial Analysis" items={config.cfaNotes} />
    </div>
  );
};

// Wrap main component with Error Boundary for graceful error handling (C3)
const ASTSWithErrorBoundary = () => (
  <FinancialModelErrorBoundary>
    <ASTSAnalysis />
  </FinancialModelErrorBoundary>
);

export default ASTSWithErrorBoundary;
