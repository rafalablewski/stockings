// @ts-nocheck
/*
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
 * ║  BMNR (BitMine Immersion Technologies) Financial Analysis Model               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Version: 2.5.0                                                               ║
 * ║  Last Updated: February 2, 2026                                               ║
 * ║  Maintainer: Rafal (via Claude AI)                                            ║
 * ║                                                                               ║
 * ║  CHANGELOG v2.5.0:                                                            ║
 * ║  - Feb 2, 2026 PR: 4.285M ETH, $10.7B total, staking hits 2.897M (67.6%)      ║
 * ║  - Acquired 41,788 ETH in past week, now 3.55% of supply (~71% to 5%)         ║
 * ║  - Cash: $586M, ETH price $2,317, #105 most traded ($1.1B/day)                ║
 * ║  - Annualized staking revenue: $188M, MAVAN on track Q1 2026                  ║
 * ║                                                                               ║
 * ║  CHANGELOG v2.4.9:                                                            ║
 * ║  - Jan 26, 2026 PR: 4.243M ETH, $12.8B total, staking hits 2.009M (47.4%)     ║
 * ║  - Acquired 40,302 ETH in past week, now 3.52% of supply (~70% to 5%)         ║
 * ║  - Cash: $682M, Beast $200M closed, #91 most traded ($1.2B/day)               ║
 * ║                                                                               ║
 * ║  CHANGELOG v2.4.8:                                                            ║
 * ║  - Added $200M Beast Industries investment PR (Jan 15, 2026)                   ║
 * ║                                                                               ║
 * ║  CHANGELOG v2.4.6:                                                            ║
 * ║  - Unified tab IDs: valuation→dcf, sec-filings→financials                     ║
 * ║                                                                               ║
 * ║  COMPANY INFORMATION (SEC EDGAR):                                             ║
 * ║  - CIK: 0001829311                                                            ║
 * ║  - EIN: 84-3986354                                                            ║
 * ║  - SIC: 6199 (Finance Services)                                               ║
 * ║  - State Location: Nevada                                                     ║
 * ║  - State of Incorporation: Delaware                                           ║
 * ║  - Fiscal Year End: August 31                                                 ║
 * ║  - Shares Outstanding: 426M (Yahoo Finance, Dec 2025)                         ║
 * ║                                                                               ║
 * ║  TABS (15): Overview | Scenarios | Ethereum | Staking | Dilution | Debt |    ║
 * ║             Capital | Sensitivity | Backtest | DCF | Monte Carlo | Comps |  ║
 * ║             Financials | Timeline | Investment                              ║
 * ║                                                                               ║
 * ║  DATA SOURCES:                                                                ║
 * ║  - SEC EDGAR (8-K, 10-K, 10-Q, 424B5, S-3ASR filings)                        ║
 * ║  - PRNewswire official press releases                                         ║
 * ║  - Bloomberg/Coinbase ETH price references                                    ║
 * ║  - On-chain data for staking verification                                     ║
 * ║                                                                               ║
 * ║  ⚠️  IMPORTANT: When updating, check ALL model parameters not just Timeline! ⚠️ ║
 * ║  ⚠️  Financials tab tracks official 10-Q/10-K quarterly financials ⚠️        ║
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

/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║           🚨 BMNR PRESS RELEASE PROCESSING CHECKLIST 🚨                       ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  EVERY TIME a new BMNR press release is processed, you MUST update ALL of    ║
 * ║  the following sections. DO NOT skip any. Use grep/search for the markers.   ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  #  │ SECTION              │ SEARCH FOR                  │ UPDATE             ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  1  │ Header/Version       │ "Version:" + "CHANGELOG v"  │ Version #,         ║
 * ║     │                      │                             │ changelog entry    ║
 * ║                                                                               ║
 * ║  2  │ DEFAULT PARAMETERS   │ "DEFAULT PARAMETERS - Based"│ All metrics in     ║
 * ║     │                      │                             │ comment block      ║
 * ║                                                                               ║
 * ║  3  │ State Variables      │ "DATA FRESHNESS: Last"      │ currentETH,        ║
 * ║     │                      │                             │ ethPrice,          ║
 * ║     │                      │                             │ stakingRatio       ║
 * ║                                                                               ║
 * ║  4  │ filingData           │ "const filingData = {"      │ latestEvent,       ║
 * ║     │                      │                             │ lastPressRelease,  ║
 * ║     │                      │                             │ 8-K date           ║
 * ║                                                                               ║
 * ║  5  │ Investment DISPLAY   │ [PR_CHECKLIST_INVESTMENT_   │ NAV/Share,         ║
 * ║     │ ⚠️ OFTEN FORGOTTEN   │  DISPLAY]                   │ Total Holdings,    ║
 * ║     │                      │                             │ Staked ETH         ║
 * ║                                                                               ║
 * ║  6  │ Investment current   │ "// Current Investment      │ scorecard,         ║
 * ║     │                      │  Summary"                   │ executiveSummary,  ║
 * ║     │                      │                             │ growthDrivers,     ║
 * ║     │                      │                             │ catalysts, etc.    ║
 * ║                                                                               ║
 * ║  7  │ secMeta.lastPR       │ [PR_CHECKLIST_SECMETA]      │ date, title        ║
 * ║     │ ⚠️ OFTEN FORGOTTEN   │                             │                    ║
 * ║                                                                               ║
 * ║  8  │ Archive              │ "const archive = ["         │ Add NEW entry      ║
 * ║     │                      │                             │ at TOP of array    ║
 * ║                                                                               ║
 * ║  9  │ Event Timeline       │ [PR_CHECKLIST_EVENT_        │ Add NEW entry      ║
 * ║     │ ⚠️ OFTEN FORGOTTEN   │  TIMELINE]                  │ with changes[]     ║
 * ║                                                                               ║
 * ║  10 │ Recent Press         │ [PR_CHECKLIST_RECENT_       │ Add NEW entry      ║
 * ║     │ Releases             │  PRESS_RELEASES]            │ at TOP of list     ║
 * ║     │ ⚠️ OFTEN FORGOTTEN   │                             │                    ║
 * ║                                                                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  ⚠️ COMMON MISTAKES TO AVOID:                                                 ║
 * ║  - Forgetting Investment DISPLAY metrics (hardcoded, not from state!)         ║
 * ║  - Forgetting secMeta.lastPR in Timeline tab                                  ║
 * ║  - Forgetting Event Timeline entry (with changes array)                       ║
 * ║  - Forgetting Recent Press Releases list                                      ║
 * ║  - Not updating catalysts when events complete (mark as ✅ COMPLETED)         ║
 * ║  - Forgetting to recalculate NAV/share with new ETH price                     ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

import React, { useState, useMemo, useRef, useEffect, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { getStockModelCSS } from './stock-model-styles';
import { SharedWallStreetTab, AnalystCoverage, useLiveStockPrice } from '../shared';
import StockChart from '../shared/StockChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart, ReferenceLine } from 'recharts';

// Data imports - All hardcoded data extracted to separate files for easy AI updates
import {
  DEFAULTS,
  ETH_HOLDINGS,
  STAKING_PARAMS,
  DIVIDEND_DATA,
  DATA_FRESHNESS,
  SHARE_CLASSES,
  WARRANTS,
  EQUITY_OFFERINGS,
  MAJOR_SHAREHOLDERS,
  HISTORICAL_ETH,
  COMPARABLES,
  DEFAULT_TRANCHES,
} from '@/data/bmnr';

// ============================================================================
// BMNR - BitMine Immersion Technologies Financial Model
// 2025 Creative Professional Design (CRCL-Style UI/UX)
// ============================================================================

// ============================================================================
// TYPESCRIPT INTERFACES (H1)
// ============================================================================

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
// WALL STREET TAB - Type Definitions (Unified with ASTS/CRCL)
// ============================================================================

/** Individual analyst report entry */
// AnalystCoverage type imported from '../shared' (wallStreetTypes.ts)

// ============================================================================
// COMPETITOR INTELLIGENCE - BMNR Crypto Treasury Competitors
// ============================================================================

/** Competitor identifiers for crypto treasury space */
type BMNRCompetitorId = 'mstr' | 'mara' | 'riot' | 'coin' | 'clsk' | 'hut8' | 'ethz' | 'kraken' | 'other';

/** News category types for crypto treasury competitors */
type BMNRCompetitorNewsCategory = 'Acquisition' | 'Funding' | 'Yield' | 'Regulatory' | 'Technology' | 'Partnership' | 'Financial' | 'Strategy';

/** Implication for BMNR competitive position */
type BMNRImplication = 'positive' | 'neutral' | 'negative';

/** Individual competitor news entry */
interface BMNRCompetitorNewsEntry {
  date: string;
  competitor: BMNRCompetitorId;
  category: BMNRCompetitorNewsCategory;
  headline: string;
  details: string[];
  implication: BMNRImplication;
  bmnrComparison?: string;  // How this compares to BMNR position
  source?: string;
  sourceUrl?: string;
  storyId?: string;         // Groups related news entries
  storyTitle?: string;      // Display title for the story group
}

/** Competitor profile with capabilities */
interface BMNRCompetitorProfile {
  id: BMNRCompetitorId;
  name: string;
  ticker: string;
  description: string;
  cryptoType: 'BTC' | 'ETH' | 'Mixed';
  currentStatus: string;
  capabilities: {
    stakingYield: boolean;
    treasuryFocus: boolean;
    miningOperations: boolean;
    publicCompany: boolean;
    institutionalAccess: boolean;
  };
  keyMetrics?: {
    holdings?: string;
    marketCap?: string;
    navPremium?: string;
    yieldRate?: string;
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

/** Minimum NAV multiple observed during crypto winters (e.g., 2022 bear market) */
const MIN_NAV_MULTIPLE = 0.3;

/** Maximum NAV multiple observed during bull market peaks */
const MAX_NAV_MULTIPLE = 2.5;

/** Mean reversion speed for NAV multiple (-0.1 = 10% pull toward 1.0 per year) */
const NAV_MULTIPLE_MEAN_REVERSION = -0.1;

/** Risk-free rate assumption for Sharpe/Sortino calculations (current T-bill ~4%) */
const RISK_FREE_RATE = 4;

/** Trading days per year for annualization */
const TRADING_DAYS_PER_YEAR = 252;

/** Minimum valid correlation coefficient */
const MIN_CORRELATION = -1;

/** Maximum valid correlation coefficient */
const MAX_CORRELATION = 1;

/** Minimum discount rate to prevent unrealistic valuations */
const MIN_DISCOUNT_RATE = 5;

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
              background: '#A78BFA',
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

/** Safe division that returns 0 instead of Infinity/NaN */
const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => 
  denominator !== 0 && isFinite(numerator / denominator) ? numerator / denominator : fallback;

/** Ensure a value is a finite number, otherwise return fallback */
const safeNumber = (value: number, fallback: number = 0): number =>
  isFinite(value) ? value : fallback;

// CSS is now imported from shared styles (Golden Standard: ASTS)
// To modify styles, edit: ./stock-model-styles.ts
const css = getStockModelCSS('violet');

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
          borderColor: showIndicators ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
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

// ============================================================================
// UNIFIED UI COMPONENT LIBRARY - Consistent Design System
// Primary Accent: Violet (#A78BFA) for BMNR ETH Treasury theme
// ============================================================================

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

const Panel = React.memo<PanelProps>(({ title, children }) => (
  <div className="card">
    {title && <div className="card-title">{title}</div>}
    {children}
  </div>
));
Panel.displayName = 'Panel';

const Card = React.memo<CardProps>(({ label, value, sub, color, updateSource }) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
    green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', text: '#4ade80' },
    red: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
    yellow: { bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)', text: '#facc15' },
    purple: { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', text: '#c084fc' },
    orange: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', text: '#fb923c' },
    cyan: { bg: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.3)', text: '#22d3ee' },
    violet: { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)', text: '#a78bfa' },
    mint: { bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)', text: '#34d399' },
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

/*
 * DEFAULT PARAMETERS - Based on latest official data (Feb 2, 2026 PR)
 * Update these when new weekly holdings PRs are released
 *
 * Current defaults reflect:
 * - ETH Holdings: 4,285,125 (Feb 2, 2026 PR - 3.55% of 120.7M ETH supply)
 * - Shares Outstanding: 434M fully diluted (Feb 2, 2026 PR)
 * - Stock Price: ~$27.15 (Feb 2, 2026) - UPDATE REGULARLY
 * - ETH Price: $2,317 (Feb 1, 2026 Coinbase)
 * - Staking Ratio: 67.6% (2,897,459 ETH staked via 3 providers, Feb 1)
 * - Base Staking APY: 2.81% (CESR rate)
 * - Total Cash: $586M
 * - BTC Holdings: 193 BTC
 * - Moonshots: $20M (Eightco ORBS stake)
 * - Strategic Investments: $200M (Beast Industries - MrBeast, CLOSED Jan 17)
 * - Total Holdings: $10.7B (crypto + cash + moonshots + strategic investments)
 *
 * COMPANY INFO (SEC EDGAR):
 * - CIK: 0001829311
 * - EIN: 84-3986354
 * - SIC: 6199 (Finance Services)
 * - State: Nevada (location) / Delaware (incorporation)
 * - Fiscal Year End: August 31
 */
const BMNRDilutionAnalysis = () => {
  // === DATA FRESHNESS: Last updated Feb 2, 2026 ===
  // Update prices regularly - stale data affects all NAV calculations
  const [currentETH, setCurrentETH] = useState(DEFAULTS.currentETH);  // From @/data/bmnr/company.ts
  const [currentShares, setCurrentShares] = useState(DEFAULTS.currentShares);  // From @/data/bmnr/company.ts
  const [currentStockPrice, setCurrentStockPrice] = useState(DEFAULTS.currentStockPrice);  // From @/data/bmnr/company.ts
  const [ethPrice, setEthPrice] = useState(DEFAULTS.ethPrice);  // From @/data/bmnr/company.ts
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);
  const [dilutionPercent, setDilutionPercent] = useState(5);
  const [saleDiscount, setSaleDiscount] = useState(5);
  const [navMultiple, setNavMultiple] = useState(1.00); // NAV multiple (stock price = NAV × mNAV)
  const [maxAuthorizedShares, setMaxAuthorizedShares] = useState(500);
  const [tranches, setTranches] = useState([
    { id: 1, year: 0.5, sharesM: 500, ethPrice: 3500, enabled: true },
    { id: 2, year: 1.0, sharesM: 750, ethPrice: 4000, enabled: true },
    { id: 3, year: 1.5, sharesM: 1000, ethPrice: 5000, enabled: false },
    { id: 4, year: 2.0, sharesM: 1500, ethPrice: 6000, enabled: false },
  ]);
  const [slashingRisk, setSlashingRisk] = useState(0.5);
  const [liquidityDiscount, setLiquidityDiscount] = useState(2);
  const [operatingCosts, setOperatingCosts] = useState(0.5);
  const [regulatoryRisk, setRegulatoryRisk] = useState(3);
  const [stakingType, setStakingType] = useState('liquid');
  const [baseStakingAPY, setBaseStakingAPY] = useState(2.81);
  const [restakingBonus, setRestakingBonus] = useState(2.0);
  const [stakingRatio, setStakingRatio] = useState(47.36);  // 2,009,267 / 4,243,338 = 47.36% (Jan 26, 2026 PR)
  const [useDebt, setUseDebt] = useState(false);
  const [debtAmount, setDebtAmount] = useState(100);
  const [debtRate, setDebtRate] = useState(2.5);
  const [debtMaturity, setDebtMaturity] = useState(5);
  const [conversionPremium, setConversionPremium] = useState(50);
  const [debtCovenantLTV, setDebtCovenantLTV] = useState(50);
  // Dividend parameters - First dividend announced Nov 24, 2025 ($0.01/share)
  const [quarterlyDividend, setQuarterlyDividend] = useState(DIVIDEND_DATA.quarterlyDividend);  // From @/data/bmnr/company.ts
  const [dividendGrowthRate, setDividendGrowthRate] = useState(10); // % annual growth

  // Update indicator visibility toggle
  const [showIndicators, setShowIndicators] = useState(true);

  // Chart refresh key - increment to trigger chart data refresh
  const [chartRefreshKey, setChartRefreshKey] = useState(0);

  // Live price refresh hook - gets price from chart's API response
  const { isLoading: priceLoading, lastUpdated: priceLastUpdated, refresh: refreshPrice } = useLiveStockPrice(
    'BMNR',
    DEFAULTS.currentStockPrice,
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

  // Use imported data from @/data/bmnr
  const historicalETH = HISTORICAL_ETH;
  // Build comparables dynamically with current user values for BMNR
  const comparables = COMPARABLES.map(c =>
    c.name === 'BMNR'
      ? { ...c, holdings: currentETH, shares: currentShares * 1e6, price: currentStockPrice, yield: baseStakingAPY }
      : c
  );

  const calc = useMemo(() => {
    const totalShares = currentShares * 1e6;
    const currentNAV = totalShares > 0 ? (currentETH * ethPrice) / totalShares : 0;
    const ethPerShare = totalShares > 0 ? currentETH / totalShares : 0;
    // Use user's stock price input for calculations
    const marketCap = currentStockPrice * totalShares;
    const navPremium = currentNAV > 0 ? ((currentStockPrice / currentNAV) - 1) * 100 : 0;
    // Also calculate implied stock price from mNAV for reference
    const impliedStockPrice = currentNAV * navMultiple;
    let effectiveAPY = baseStakingAPY;
    if (stakingType === 'solo') effectiveAPY = baseStakingAPY + 0.5;
    if (stakingType === 'restaking') effectiveAPY = baseStakingAPY + restakingBonus;
    const stakedETH = currentETH * (stakingRatio / 100);
    const annualYieldETH = stakedETH * (effectiveAPY / 100);
    const annualYieldUSD = annualYieldETH * ethPrice;
    const debtUSD = useDebt ? debtAmount * 1e6 : 0;
    const leverageRatio = marketCap > 0 ? debtUSD / marketCap : 0;
    const ltv = currentETH * ethPrice > 0 ? debtUSD / (currentETH * ethPrice) : 0;
    const conversionPrice = currentStockPrice * (1 + conversionPremium / 100);
    const deathSpiralETHPrice = useDebt && debtCovenantLTV > 0 ? debtUSD / (currentETH * (debtCovenantLTV / 100)) : 0;
    // Dividend calculations
    const annualDividend = quarterlyDividend * 4;
    const dividendYield = currentStockPrice > 0 ? (annualDividend / currentStockPrice) * 100 : 0;
    const totalAnnualDividendPayout = annualDividend * totalShares;
    const dividendPayoutRatio = annualYieldUSD > 0 ? (totalAnnualDividendPayout / annualYieldUSD) * 100 : 0;
    // Ensure all outputs are finite numbers
    const safe = (v) => (isFinite(v) ? v : 0);
    return { currentNAV: safe(currentNAV), ethPerShare: safe(ethPerShare), marketCap: safe(marketCap), navPremium: safe(navPremium), impliedStockPrice: safe(impliedStockPrice), effectiveAPY, stakedETH, annualYieldETH: safe(annualYieldETH), annualYieldUSD: safe(annualYieldUSD), debtUSD, leverageRatio: safe(leverageRatio), ltv: safe(ltv), conversionPrice: safe(conversionPrice), deathSpiralETHPrice: safe(deathSpiralETHPrice), totalShares, annualDividend, dividendYield: safe(dividendYield), totalAnnualDividendPayout: safe(totalAnnualDividendPayout), dividendPayoutRatio: safe(dividendPayoutRatio) };
  }, [currentETH, currentShares, currentStockPrice, ethPrice, navMultiple, stakingType, baseStakingAPY, restakingBonus, stakingRatio, useDebt, debtAmount, conversionPremium, debtCovenantLTV, quarterlyDividend]);

  // Tab types: 'tracking' = actual company data, 'projection' = user model inputs
  // Order: Overview first, then stock-specific projections, common projections, then tracking
  // group: optional grouping for nested display (stock-specific tabs)
  const tabs: { id: string; label: string; type: 'tracking' | 'projection'; group?: string }[] = [
    { id: 'overview', label: 'Overview', type: 'tracking' },
    // Stock-specific projections (grouped under "BMNR Analysis")
    { id: 'ethereum', label: 'Ethereum', type: 'projection', group: 'BMNR Analysis' },
    { id: 'staking', label: 'Staking', type: 'projection', group: 'BMNR Analysis' },
    { id: 'dilution', label: 'Dilution', type: 'projection', group: 'BMNR Analysis' },
    { id: 'debt', label: 'Debt', type: 'projection', group: 'BMNR Analysis' },
    { id: 'sensitivity', label: 'Sensitivity', type: 'projection', group: 'BMNR Analysis' },
    { id: 'backtest', label: 'Backtest', type: 'projection', group: 'BMNR Analysis' },
    { id: 'sources', label: 'Sources', type: 'tracking', group: 'BMNR Analysis' },
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
        
        {/* ============================================================================
            HERO HEADER - CRCL-Style Premium Design
            ============================================================================ */}
        <header className="hero">
          <div className="hero-grid">
            <div className="brand-block">
              <h1>BMNR Analysis</h1>
              <div className="ticker">NYSE American: BMNR · ETH Treasury</div>
              {/* H4: Data Freshness Timestamp */}
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 6, 
                background: 'rgba(167,139,250,0.1)', 
                border: '1px solid rgba(167,139,250,0.3)', 
                borderRadius: 6, 
                padding: '4px 10px', 
                fontSize: 11, 
                color: '#a78bfa',
              }}>
                <span>📅</span>
                <span>Data as of: {DATA_FRESHNESS.dataAsOf}</span>
                <span style={{ color: 'rgba(167,139,250,0.5)' }}>|</span>
                <span>{DATA_FRESHNESS.priceNote}</span>
              </div>
              <p className="desc">
                Institutional-grade ETH exposure through a publicly traded vehicle. 
                Largest single-entity ETH holder with {(currentETH / 120000000 * 100).toFixed(2)}% of total supply.
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
              <div className={`price-badge ${calc.navPremium >= 0 ? 'up' : 'down'}`}>
                {calc.navPremium >= 0 ? '↑' : '↓'} {Math.abs(calc.navPremium).toFixed(1)}% vs NAV
              </div>
              {priceLastUpdated && (
                <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                  Updated: {priceLastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="stats-row">
          <Stat label="NAV/Share" value={`$${calc.currentNAV.toFixed(2)}`} color="violet" updateSource={['PR', 'MARKET']} />
          <Stat label="Market Cap" value={`$${(calc.marketCap / 1e9).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="ETH Holdings" value={`${(currentETH / 1e6).toFixed(2)}M (${(currentETH / 120700000 * 100).toFixed(2)}% / 5%)`} color="violet" updateSource="PR" />
          <Stat label="ETH Price" value={`$${ethPrice.toLocaleString()}`} updateSource="MARKET" />
          <Stat label="Staking Yield" value={`${calc.effectiveAPY.toFixed(2)}%`} color="mint" updateSource="PR" />
          <Stat label="Dividend Yield" value={`${calc.dividendYield.toFixed(2)}%`} color="sky" updateSource="PR" />
          <Stat label="Total Value" value={`$${((currentETH * ethPrice) / 1e9).toFixed(1)}B`} updateSource={['PR', 'MARKET']} />
        </div>

        {/* Navigation */}
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
            BMNR Analysis ↕
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

        {/* Main Content */}
        <main className="main">
        {/* Update Source Legend - Shows what each indicator color means */}
        <UpdateLegend />
        {activeTab === 'overview' && <OverviewTab calc={calc} currentETH={currentETH} setCurrentETH={setCurrentETH} currentShares={currentShares} setCurrentShares={setCurrentShares} currentStockPrice={currentStockPrice} setCurrentStockPrice={setCurrentStockPrice} ethPrice={ethPrice} setEthPrice={setEthPrice} quarterlyDividend={quarterlyDividend} setQuarterlyDividend={setQuarterlyDividend} chartRefreshKey={chartRefreshKey} />}
        {activeTab === 'model' && <ModelTab currentETH={currentETH} setCurrentETH={setCurrentETH} ethPrice={ethPrice} currentShares={currentShares} currentStockPrice={currentStockPrice} baseStakingAPY={baseStakingAPY} stakingRatio={stakingRatio} />}
        {activeTab === 'ethereum' && <EthereumTab ethPrice={ethPrice} currentETH={currentETH} currentShares={currentShares} currentStockPrice={currentStockPrice} />}
        {activeTab === 'staking' && <StakingTab calc={calc} currentETH={currentETH} ethPrice={ethPrice} stakingType={stakingType} setStakingType={setStakingType} baseStakingAPY={baseStakingAPY} setBaseStakingAPY={setBaseStakingAPY} restakingBonus={restakingBonus} setRestakingBonus={setRestakingBonus} stakingRatio={stakingRatio} setStakingRatio={setStakingRatio} slashingRisk={slashingRisk} setSlashingRisk={setSlashingRisk} />}
        {activeTab === 'dilution' && <DilutionTab calc={calc} currentETH={currentETH} currentShares={currentShares} ethPrice={ethPrice} currentStockPrice={currentStockPrice} tranches={tranches} setTranches={setTranches} dilutionPercent={dilutionPercent} setDilutionPercent={setDilutionPercent} saleDiscount={saleDiscount} setSaleDiscount={setSaleDiscount} navMultiple={navMultiple} setNavMultiple={setNavMultiple} maxAuthorizedShares={maxAuthorizedShares} slashingRisk={slashingRisk} liquidityDiscount={liquidityDiscount} regulatoryRisk={regulatoryRisk} />}
        {activeTab === 'debt' && <DebtTab calc={calc} currentETH={currentETH} ethPrice={ethPrice} currentStockPrice={currentStockPrice} useDebt={useDebt} setUseDebt={setUseDebt} debtAmount={debtAmount} setDebtAmount={setDebtAmount} debtRate={debtRate} setDebtRate={setDebtRate} debtMaturity={debtMaturity} setDebtMaturity={setDebtMaturity} conversionPremium={conversionPremium} setConversionPremium={setConversionPremium} debtCovenantLTV={debtCovenantLTV} setDebtCovenantLTV={setDebtCovenantLTV} />}
        {activeTab === 'capital' && <CapitalTab currentShares={currentShares} currentStockPrice={currentStockPrice} />}
        {activeTab === 'comps' && <CompsTab comparables={comparables} ethPrice={ethPrice} />}
        {activeTab === 'sensitivity' && <SensitivityTab calc={calc} currentETH={currentETH} currentShares={currentShares} ethPrice={ethPrice} />}
        {activeTab === 'backtest' && <BacktestTab currentETH={currentETH} currentShares={currentShares} currentStockPrice={currentStockPrice} historicalETH={historicalETH} baseStakingAPY={baseStakingAPY} navMultiple={currentStockPrice / calc.currentNAV} />}
        {activeTab === 'monte-carlo' && <MonteCarloTab currentETH={currentETH} currentShares={currentShares} currentStockPrice={currentStockPrice} ethPrice={ethPrice} stakingYield={calc.effectiveAPY} slashingRisk={slashingRisk} liquidityDiscount={liquidityDiscount} operatingCosts={operatingCosts} regulatoryRisk={regulatoryRisk} />}
        {activeTab === 'investment' && <InvestmentTab />}
        {activeTab === 'financials' && <FinancialsTab />}
        {activeTab === 'timeline' && <TimelineTab />}
        {activeTab === 'wall-street' && <WallStreetTab />}
        {activeTab === 'sources' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sources-header</div>
            <h2 className="section-head">Research Sources</h2>
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sources-intro</div>
            <div className="highlight"><h3>Sources & References</h3><p style={{ fontSize: 13, color: 'var(--text2)' }}>Sites and sources used for BMNR analysis, competitor tracking, and Ethereum ecosystem research.</p></div>
            <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sources</div>
            {[
              { category: 'Company / IR', sources: [
                { name: 'BMNR Investor Relations (PRNewswire)', url: 'https://www.prnewswire.com' },
                { name: 'SEC EDGAR (BMNR Filings)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=vinanz&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany' },
              ]},
              { category: 'Crypto Treasury Competitors', sources: [
                { name: 'Strategy (MSTR) Investor Relations', url: 'https://www.strategy.com/investor-relations' },
                { name: 'Coinbase Blog', url: 'https://www.coinbase.com/blog' },
                { name: 'Coinbase Investor Relations', url: 'https://investor.coinbase.com' },
                { name: 'Marathon Digital (MARA)', url: 'https://ir.mara.com' },
                { name: 'Riot Platforms (RIOT)', url: 'https://www.riotplatforms.com' },
                { name: 'CleanSpark (CLSK)', url: 'https://www.cleanspark.com' },
                { name: 'ETHZilla (ETHZ) IR', url: 'https://ir.ethzilla.com' },
              ]},
              { category: 'Ethereum Protocol / Foundation', sources: [
                { name: 'Ethereum Foundation Blog', url: 'https://blog.ethereum.org' },
                { name: 'Vitalik Buterin Blog', url: 'https://vitalik.eth.limo' },
                { name: 'ENS Domains Blog', url: 'https://ens.domains/blog' },
                { name: 'Base Blog', url: 'https://base.org/blog' },
                { name: 'Etherscan', url: 'https://etherscan.io' },
                { name: 'Dune Analytics', url: 'https://dune.com' },
                { name: 'L2Beat', url: 'https://l2beat.com' },
              ]},
              { category: 'Institutional / TradFi', sources: [
                { name: 'BlackRock', url: 'https://www.blackrock.com' },
                { name: 'Fidelity Digital Assets', url: 'https://www.fidelitydigitalassets.com' },
                { name: 'Franklin Templeton', url: 'https://www.franklintempleton.com' },
                { name: 'State Street', url: 'https://www.statestreet.com' },
                { name: 'WisdomTree', url: 'https://www.wisdomtree.com' },
                { name: 'JPMorgan / Kinexys', url: 'https://www.jpmorgan.com' },
                { name: 'Goldman Sachs', url: 'https://www.goldmansachs.com' },
                { name: 'Standard Chartered', url: 'https://www.sc.com' },
                { name: 'Deutsche Bank', url: 'https://www.db.com' },
                { name: 'HSBC', url: 'https://www.hsbc.com' },
                { name: 'Citi', url: 'https://www.citigroup.com' },
              ]},
              { category: 'Regulatory', sources: [
                { name: 'SEC (Securities & Exchange Commission)', url: 'https://www.sec.gov' },
                { name: 'CFTC', url: 'https://www.cftc.gov' },
                { name: 'US Senate Banking Committee', url: 'https://www.banking.senate.gov' },
                { name: 'ESMA (EU Securities & Markets)', url: 'https://www.esma.europa.eu' },
                { name: 'UK FCA', url: 'https://www.fca.org.uk' },
              ]},
              { category: 'Crypto News / Data', sources: [
                { name: 'CoinDesk', url: 'https://www.coindesk.com' },
                { name: 'The Block', url: 'https://www.theblock.co' },
                { name: 'CryptoSlate', url: 'https://cryptoslate.com' },
                { name: 'Decrypt', url: 'https://decrypt.co' },
                { name: 'Bitcoin.com', url: 'https://news.bitcoin.com' },
                { name: 'CoinGecko', url: 'https://www.coingecko.com' },
                { name: 'CoinShares', url: 'https://coinshares.com' },
                { name: 'Ledger Insights', url: 'https://www.ledgerinsights.com' },
              ]},
              { category: 'Financial / Analyst', sources: [
                { name: 'Cantor Fitzgerald', url: 'https://www.cantor.com' },
                { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
                { name: 'CNBC', url: 'https://www.cnbc.com' },
              ]},
              { category: 'Press / News Wires', sources: [
                { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
                { name: 'Business Wire', url: 'https://www.businesswire.com' },
                { name: 'ACCESS Newswire', url: 'https://www.accessnewswire.com' },
                { name: 'GlobeNewswire', url: 'https://www.globenewswire.com' },
              ]},
            ].map(group => (
              <div key={group.category} className="card">
                <div className="card-title">{group.category}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {group.sources.map(s => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
                      {s.name} <span style={{ color: 'var(--text3)', fontSize: 11 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
      </div>
    </UpdateIndicatorContext.Provider>
  );
};

// ============================================================================
// MODEL TAB - DCF Valuation with Parameter Cards (BMNR-specific)
// ============================================================================

// 6 Scenario Presets for ETH Treasury Company
// Note: Discount rate captures ALL risk (regulatory, liquidity, tech, execution)
// No separate risk factors - simpler model, no double-counting
const BMNR_SCENARIO_PRESETS = {
  worst: {
    label: 'Worst',
    desc: 'ETH crash, regulatory ban, massive dilution, staking failures',
    icon: '💀',
    color: '#dc2626',
    ethGrowthRate: -30,      // ETH crashes
    stakingYield: 1,         // Minimal yield
    navPremium: 0.4,         // 60% discount to NAV
    dilutionRate: 25,        // Massive dilution
    operatingCosts: 3,       // High costs
    discountRate: 35,        // Very high - captures all risk
  },
  bear: {
    label: 'Bear',
    desc: 'ETH underperforms, moderate dilution, NAV discount persists',
    icon: '🐻',
    color: '#f97316',
    ethGrowthRate: -5,       // ETH slightly down
    stakingYield: 2,         // Below average yield
    navPremium: 0.7,         // 30% discount
    dilutionRate: 15,        // Significant dilution
    operatingCosts: 2,       // Moderate costs
    discountRate: 20,        // High risk
  },
  base: {
    label: 'Base',
    desc: 'ETH tracks crypto market, trading at NAV, disciplined capital',
    icon: '📊',
    color: '#eab308',
    ethGrowthRate: 10,       // Moderate appreciation
    stakingYield: 3.5,       // Current yield range
    navPremium: 1.0,         // Trading at NAV
    dilutionRate: 8,         // Normal equity raises
    operatingCosts: 1,       // Efficient operations
    discountRate: 12,        // Moderate risk (established company)
  },
  mgmt: {
    label: 'Mgmt',
    desc: 'Management targets: ETH outperforms, premium valuation, yield optimization',
    icon: '📈',
    color: '#22c55e',
    ethGrowthRate: 20,       // ETH bull case
    stakingYield: 4.5,       // Optimized staking + restaking
    navPremium: 1.2,         // 20% premium (like MSTR)
    dilutionRate: 5,         // Accretive raises only
    operatingCosts: 0.5,     // Low costs
    discountRate: 11,        // Lower risk as execution proves out
  },
  bull: {
    label: 'Bull',
    desc: 'ETH rallies, institutional adoption, significant NAV premium',
    icon: '🐂',
    color: '#06b6d4',
    ethGrowthRate: 35,       // Strong ETH appreciation
    stakingYield: 5.5,       // High yield environment
    navPremium: 1.5,         // 50% premium
    dilutionRate: 3,         // Minimal dilution needed
    operatingCosts: 0.3,     // Very efficient
    discountRate: 10,        // De-risked, proven
  },
  moon: {
    label: 'Moon',
    desc: 'ETH becomes global SoV, massive premium, zero dilution needed',
    icon: '🚀',
    color: '#a855f7',
    ethGrowthRate: 60,       // ETH to new ATH
    stakingYield: 7,         // MEV + restaking optimized
    navPremium: 2.0,         // 100% premium (MSTR-like)
    dilutionRate: 0,         // No dilution - self-funding
    operatingCosts: 0.2,     // Minimal overhead
    discountRate: 8,         // Blue chip / ETF-like
  },
};

// ParameterCard component with color gradient based on value
const BMNRParameterCard = ({
  title,
  explanation,
  options,
  value,
  onChange,
  format = '',
  inverse = false, // true = lower values are bullish (risk, dilution, costs)
  disabled = false, // when true, card is non-interactive
}: {
  title: string;
  explanation: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  format?: string;
  inverse?: boolean;
  disabled?: boolean;
}) => {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const isCustomValue = !options.includes(value);

  const formatValue = (v: number) => {
    if (format === '$') return `$${v.toLocaleString()}`;
    if (format === '%') return `${v}%`;
    if (format === 'x') return `${v.toFixed(2)}x`;
    if (format === 'ETH') return `${v.toLocaleString()} ETH`;
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
    <div className="card" style={{ opacity: disabled ? 0.6 : 1 }}>
      <div className="card-title">{title}</div>
      <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
        {explanation}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, pointerEvents: disabled ? 'none' : 'auto' }}>
        {options.slice(0, 6).map((opt, idx) => {
          const isActive = value === opt;
          const colors = getButtonColor(idx);
          return (
            <div
              key={opt}
              onClick={() => { if (!disabled) { onChange(opt); setCustomMode(false); } }}
              style={{
                padding: '10px 4px',
                borderRadius: 8,
                border: isActive ? `2px solid ${disabled ? 'var(--text3)' : colors.border}` : '1px solid var(--border)',
                background: isActive ? (disabled ? 'var(--surface2)' : colors.bg) : 'var(--surface2)',
                cursor: disabled ? 'default' : 'pointer',
                transition: 'all 0.15s',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? (disabled ? 'var(--text3)' : colors.text) : 'var(--text3)',
              }}
            >
              {formatValue(opt)}
            </div>
          );
        })}
        {/* Custom input button/field */}
        {customMode && !disabled ? (
          <div style={{
            display: 'flex',
            borderRadius: 8,
            border: '2px solid var(--violet)',
            background: 'rgba(167,139,250,0.15)',
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
            onClick={() => !disabled && setCustomMode(true)}
            style={{
              padding: '10px 4px',
              borderRadius: 8,
              border: isCustomValue ? '2px solid var(--violet)' : '1px solid var(--border)',
              background: isCustomValue ? 'rgba(167,139,250,0.15)' : 'var(--surface2)',
              cursor: disabled ? 'default' : 'pointer',
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

// ModelTab component for BMNR - NAV-based DCF valuation
const ModelTab = ({
  currentETH, setCurrentETH, ethPrice, currentShares, currentStockPrice,
  baseStakingAPY, stakingRatio,
}: {
  currentETH: number;
  setCurrentETH: (v: number) => void;
  ethPrice: number;
  currentShares: number;
  currentStockPrice: number;
  baseStakingAPY: number;
  stakingRatio: number;
}) => {
  // Model parameters state
  // Note: For NAV companies, discount rate captures ALL risk (no separate risk factors)
  const [ethInputMode, setEthInputMode] = useState<'current' | 'growth'>('current');
  const [ethGrowthRate, setEthGrowthRate] = useState(10);
  const [stakingYield, setStakingYield] = useState(3.5);
  const [navPremium, setNavPremium] = useState(1.0);
  const [dilutionRate, setDilutionRate] = useState(8);
  const [operatingCosts, setOperatingCosts] = useState(1);
  const [discountRate, setDiscountRate] = useState(12); // Captures all risk in one number
  const [selectedScenario, setSelectedScenario] = useState('base');

  type ScenarioKey = 'worst' | 'bear' | 'base' | 'mgmt' | 'bull' | 'moon';

  const applyScenario = (scenario: ScenarioKey) => {
    const p = BMNR_SCENARIO_PRESETS[scenario];
    setEthInputMode('growth'); // Reset to growth mode when applying preset
    setEthGrowthRate(p.ethGrowthRate);
    setStakingYield(p.stakingYield);
    setNavPremium(p.navPremium);
    setDilutionRate(p.dilutionRate);
    setOperatingCosts(p.operatingCosts);
    setDiscountRate(p.discountRate);
    setSelectedScenario(scenario);
  };

  // Get current scenario info
  const currentPreset = BMNR_SCENARIO_PRESETS[selectedScenario as ScenarioKey];
  const scenario = currentPreset
    ? { name: currentPreset.label, color: currentPreset.color, icon: currentPreset.icon }
    : { name: 'Custom', color: '#a855f7', icon: '⚙️' };

  // ============================================================================
  // NAV-BASED VALUATION - For ETH Treasury Company
  // ============================================================================
  // For BMNR (and similar treasury companies), value = NAV × premium.
  // We don't use traditional DCF because the asset IS the value.
  // Risk is incorporated via discount rate, not as a separate haircut.

  // STEP 1: Current NAV Calculation
  const currentNAV = (currentETH * ethPrice) / 1_000_000; // $M
  const navPerShare = currentNAV / currentShares; // $/share

  // STEP 2: Terminal Year (5 years) ETH Price
  const terminalYears = 5;
  // Support both current (no growth) and growth projection modes
  const terminalEthPrice = ethInputMode === 'current'
    ? ethPrice  // Use current price from Parameters (no appreciation assumed)
    : ethPrice * Math.pow(1 + ethGrowthRate / 100, terminalYears);

  // STEP 3: Terminal Year ETH Holdings (with staking yield compounding)
  const netYieldRate = (stakingYield - operatingCosts) / 100;
  const terminalETH = currentETH * Math.pow(1 + netYieldRate, terminalYears);

  // STEP 4: Terminal Year NAV
  const terminalNAV = (terminalETH * terminalEthPrice) / 1_000_000; // $M

  // STEP 5: Annual Staking Cash Flow (for dividend/buyback capacity)
  const annualStakingRevenue = (currentETH * ethPrice * stakingYield / 100) / 1_000_000; // $M/year
  const annualNetCashFlow = annualStakingRevenue * (1 - operatingCosts / stakingYield);

  // STEP 6: Terminal Equity Value = NAV × Premium
  // For treasury companies, the market cap trades at a premium/discount to NAV
  const terminalEquityValue = terminalNAV * navPremium; // $M

  // STEP 7: Diluted Shares at Terminal Year
  const terminalShares = currentShares * Math.pow(1 + dilutionRate / 100, terminalYears);

  // STEP 8: Terminal NAV per Share
  const terminalNavPerShare = terminalNAV / terminalShares;
  const terminalPriceAtNav = terminalNavPerShare * navPremium;

  // STEP 9: Discount to Present Value
  // For NAV companies, discount rate captures ALL risk (no separate risk factors)
  // This avoids double-counting since discount rate already includes risk premium
  const discountRateDecimal = discountRate / 100;
  const discountFactor = Math.pow(1 + discountRateDecimal, terminalYears);

  // STEP 10: Target Stock Price Calculation
  // Formula: Terminal NAV/share × NAV Premium / Discount Factor
  //
  // - Terminal NAV/share: projected NAV per share in 5 years
  // - NAV Premium: market's willingness to pay above/below NAV (like MSTR)
  // - Discount Factor: captures time value + ALL risk in one number
  //
  // Discount rate guidance for NAV companies:
  //   8-10%: Low risk (ETF-like, established)
  //   12-14%: Moderate (proven treasury company)
  //   16-18%: Higher (execution/regulatory concerns)
  //   20%+: High risk (new/unproven)
  const targetStockPrice = terminalPriceAtNav / discountFactor;

  // STEP 12: Implied Upside/Downside
  const impliedUpside = currentStockPrice > 0
    ? ((targetStockPrice - currentStockPrice) / currentStockPrice) * 100
    : 0;

  // STEP 13: Valuation Multiples & Metrics
  const currentPriceToNAV = currentStockPrice / navPerShare;
  const terminalPriceToNAV = terminalPriceAtNav / terminalNavPerShare;
  const impliedDividendYield = annualNetCashFlow / (currentShares * currentStockPrice) * 100;

  // For display: total market cap values
  const presentValueEV = (targetStockPrice * currentShares); // Current implied market cap
  const riskAdjustedEV = presentValueEV; // Same for display compatibility
  const effectiveTerminalEV = terminalEquityValue; // Terminal market cap

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#model-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Model<UpdateIndicators sources={['PR', 'SEC']} /></h2>

      {/* ASSUMPTIONS SECTION */}
      <>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario</div>
        <div className="highlight">
          <h3 style={{ display: 'flex', alignItems: 'center' }}>{scenario.icon} {scenario.name} Scenario</h3>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>
            Configure model assumptions for BMNR's ETH treasury valuation. Changes flow to NAV projections and DCF valuation.
          </p>
        </div>

        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#scenario-presets</div>
        {/* Scenario Presets - 6 scenarios from Worst to Moon */}
        <div className="card">
          <div className="card-title">Scenario Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {(['worst', 'bear', 'base', 'mgmt', 'bull', 'moon'] as const).map(s => {
              const preset = BMNR_SCENARIO_PRESETS[s];
              const isActive = selectedScenario === s;
              return (
                <div
                  key={s}
                  onClick={() => applyScenario(s)}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: isActive ? `2px solid ${preset.color}` : '1px solid var(--border)',
                    background: isActive ? `${preset.color}15` : 'var(--surface2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 20 }}>{preset.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: isActive ? preset.color : 'var(--text)' }}>
                    {preset.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.3 }}>
                    {preset.ethGrowthRate > 0 ? '+' : ''}{preset.ethGrowthRate}% ETH · {preset.navPremium}x
                  </div>
                </div>
              );
            })}
          </div>
          {/* Always show to prevent layout shift */}
          <div style={{ padding: 12, background: 'rgba(167,139,250,0.1)', borderRadius: 8, fontSize: 12, color: selectedScenario === 'custom' ? 'var(--violet)' : 'var(--text3)', opacity: selectedScenario === 'custom' ? 1 : 0.5 }}>
            ⚙️ {selectedScenario === 'custom' ? 'Custom scenario - parameters modified from preset' : 'Click any value below to create custom scenario'}
          </div>
        </div>

        {/* CALCULATION MODE TOGGLE */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#calculation-mode</div>
        <h3 style={{ color: 'var(--cyan)' }}>Calculation Mode</h3>
        <div className="card">
          <div className="card-title">Data Source</div>
          <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5, marginBottom: 12 }}>
            Choose how to calculate valuation. "Use Parameters" takes current ETH holdings and price from Overview tab. "Use Growth Projection" projects future value using growth rate.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            <div
              onClick={() => setEthInputMode('current')}
              style={{
                padding: 16,
                borderRadius: 10,
                border: ethInputMode === 'current' ? '2px solid var(--mint)' : '1px solid var(--border)',
                background: ethInputMode === 'current' ? 'rgba(52,211,153,0.1)' : 'var(--surface2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>📍</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: ethInputMode === 'current' ? 'var(--mint)' : 'var(--text)' }}>
                Use Parameters
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
                {(currentETH / 1_000_000).toFixed(2)}M ETH × ${ethPrice.toLocaleString()}
              </div>
            </div>
            <div
              onClick={() => setEthInputMode('growth')}
              style={{
                padding: 16,
                borderRadius: 10,
                border: ethInputMode === 'growth' ? '2px solid var(--cyan)' : '1px solid var(--border)',
                background: ethInputMode === 'growth' ? 'rgba(34,211,238,0.1)' : 'var(--surface2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>📈</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: ethInputMode === 'growth' ? 'var(--cyan)' : 'var(--text)' }}>
                Use Growth Projection
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
                {ethGrowthRate > 0 ? '+' : ''}{ethGrowthRate}% annual ETH growth
              </div>
            </div>
          </div>
        </div>

        {/* ETH GROWTH RATE - Always visible, disabled when using parameters */}
        <div style={{ opacity: ethInputMode === 'current' ? 0.4 : 1, pointerEvents: ethInputMode === 'current' ? 'none' : 'auto' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#eth-growth</div>
          <h3 style={{ color: 'var(--cyan)' }}>ETH Growth Projection</h3>
          <div className="g2">
            <BMNRParameterCard
              title="ETH Annual Growth Rate (%)"
              explanation={`Expected annual ETH price appreciation over ${terminalYears} years. Terminal: $${terminalEthPrice.toLocaleString(undefined, {maximumFractionDigits: 0})} from current $${ethPrice.toLocaleString()}. Historical: +90% (2024), -67% (2022).`}
              options={[-30, -5, 10, 20, 35, 60]}
              value={ethGrowthRate}
              onChange={v => { setEthGrowthRate(v); setSelectedScenario('custom'); }}
              format="%"
            />
          </div>
        </div>

        {/* Current mode summary */}
        <div style={{
          padding: '8px 12px',
          background: ethInputMode === 'current' ? 'rgba(52,211,153,0.1)' : 'rgba(34,211,238,0.1)',
          borderRadius: 6,
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: ethInputMode === 'current' ? 'var(--mint)' : 'var(--cyan)', fontWeight: 600 }}>
            {ethInputMode === 'current' ? '📍 Using Parameters' : '📈 Using Growth Projection'}
          </span>
          <span style={{ color: 'var(--text3)' }}>→</span>
          <span style={{ color: 'var(--text2)' }}>
            {ethInputMode === 'current'
              ? `NAV: $${((currentETH * ethPrice) / 1e9).toFixed(2)}B (${(currentETH / 1_000_000).toFixed(2)}M ETH × $${ethPrice.toLocaleString()})`
              : `Terminal ETH: $${terminalEthPrice.toLocaleString(undefined, {maximumFractionDigits: 0})} (${ethGrowthRate > 0 ? '+' : ''}${ethGrowthRate}%/yr × ${terminalYears}yr)`
            }
          </span>
        </div>

        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#operating-model</div>
        <h3 style={{ color: 'var(--mint)' }}>Yield & Costs</h3>

        <div className="g2">
          <BMNRParameterCard
            title="Staking Yield (% APY)"
            explanation="Annual yield from ETH staking. Base Ethereum staking: 3-4% APY. With restaking (EigenLayer): 4-7%+. BMNR currently stakes ~30% of holdings. Higher yield = more ETH accumulation."
            options={[1, 2, 3.5, 4.5, 5.5, 7]}
            value={stakingYield}
            onChange={v => { setStakingYield(v); setSelectedScenario('custom'); }}
            format="%"
          />
        </div>

        <div className="g2">
          <BMNRParameterCard
            title="NAV Premium/Discount (x)"
            explanation="Stock price vs NAV per share. 1.0x = at NAV. <1x = discount (typical for closed-end funds). >1x = premium (like MSTR at 2-3x). Premium justified by: liquidity, management, yield optimization, regulatory wrapper."
            options={[0.4, 0.7, 1.0, 1.2, 1.5, 2.0]}
            value={navPremium}
            onChange={v => { setNavPremium(v); setSelectedScenario('custom'); }}
            format="x"
          />
          <BMNRParameterCard
            title="Operating Costs (% of AUM)"
            explanation="Annual operating expenses as % of ETH holdings value. Includes: management, custody, legal, admin. 0.3-0.5% = ETF-like efficient. 1-2% = typical fund. 3%+ = high overhead eroding returns."
            options={[3, 2, 1, 0.5, 0.3, 0.2]}
            value={operatingCosts}
            onChange={v => { setOperatingCosts(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
        </div>

        {/* CAPITAL STRUCTURE PARAMETERS */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#valuation-params</div>
        <h3 style={{ color: 'var(--violet)' }}>Valuation Parameters</h3>

        <div className="g2">
          <BMNRParameterCard
            title="Annual Dilution Rate (%)"
            explanation="Expected share count increase from equity raises, warrants, stock comp. Treasury companies often raise capital to buy more assets. 0% = self-funding. 5-10% = typical. 20%+ = aggressive accumulation."
            options={[25, 15, 8, 5, 3, 0]}
            value={dilutionRate}
            onChange={v => { setDilutionRate(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
          <BMNRParameterCard
            title="Discount Rate / WACC (%)"
            explanation="Required return for discounting future cash flows. Higher for risky assets. 10% = blue chip. 15-20% = volatile crypto exposure. 25%+ = speculative. Should exceed ETH expected return for margin of safety."
            options={[35, 20, 12, 11, 10, 8]}
            value={discountRate}
            onChange={v => { setDiscountRate(v); setSelectedScenario('custom'); }}
            format="%"
            inverse
          />
        </div>

        {/* DCF VALUATION OUTPUT */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dcf-output</div>
        <div className="card" style={{ border: '2px solid var(--accent)', background: 'var(--accent-dim)' }}>
          <div className="card-title" style={{ color: 'var(--accent)', fontSize: 16 }}>DCF Valuation Output (5-Year Terminal)</div>
          <table className="tbl" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Metric</th>
                <th className="r">Value</th>
                <th style={{ textAlign: 'left' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: 'var(--accent-dim)' }}>
                <td style={{ fontWeight: 600, color: 'var(--accent)' }}>Target Stock Price</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 700, color: 'var(--accent)' }}>{targetStockPrice > 0 ? `$${targetStockPrice.toFixed(2)}` : 'N/A'}</td>
                <td style={{ color: 'var(--text3)' }}>vs ${currentStockPrice.toFixed(2)} current</td>
              </tr>
              <tr style={{ background: 'var(--accent-dim)' }}>
                <td style={{ fontWeight: 600, color: 'var(--accent)' }}>Implied Upside</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 700, color: impliedUpside > 50 ? 'var(--mint)' : impliedUpside > 0 ? 'var(--gold)' : 'var(--red)' }}>{targetStockPrice > 0 ? `${impliedUpside > 0 ? '+' : ''}${impliedUpside.toFixed(0)}%` : 'N/A'}</td>
                <td style={{ color: 'var(--text3)' }}>{impliedUpside > 100 ? 'Strong Buy' : impliedUpside > 25 ? 'Buy' : impliedUpside > 0 ? 'Hold' : 'Sell'}</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Present Value</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>${(presentValueEV / 1000).toFixed(2)}B</td>
                <td style={{ color: 'var(--text3)' }}>Terminal ÷ {discountFactor.toFixed(2)}x discount</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Market Cap</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>${((currentShares * currentStockPrice) / 1000).toFixed(2)}B</td>
                <td style={{ color: 'var(--text3)' }}>{currentPriceToNAV.toFixed(2)}x current NAV</td>
              </tr>
              <tr><td colSpan={3} style={{ height: 8, background: 'transparent' }}></td></tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Terminal ETH Price</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>${terminalEthPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td style={{ color: 'var(--text3)' }}>{ethInputMode === 'current' ? 'current (no growth)' : `${ethGrowthRate > 0 ? '+' : ''}${ethGrowthRate}%/yr × 5yrs`}</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Terminal ETH Holdings</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>{(terminalETH / 1_000_000).toFixed(2)}M</td>
                <td style={{ color: 'var(--text3)' }}>+{((terminalETH / currentETH - 1) * 100).toFixed(1)}% from yield</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Terminal NAV</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>${(terminalNAV / 1000).toFixed(2)}B</td>
                <td style={{ color: 'var(--text3)' }}>{(terminalNAV / currentNAV).toFixed(1)}x current</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Terminal Shares</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>{terminalShares.toFixed(0)}M</td>
                <td style={{ color: 'var(--text3)' }}>+{((terminalShares / currentShares - 1) * 100).toFixed(0)}% dilution</td>
              </tr>
              <tr><td colSpan={3} style={{ height: 8, background: 'transparent' }}></td></tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Current P/NAV</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>{currentPriceToNAV.toFixed(2)}x</td>
                <td style={{ color: 'var(--text3)' }}>{currentPriceToNAV > 1 ? 'Premium' : 'Discount'}</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Implied Yield</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>{impliedDividendYield.toFixed(2)}%</td>
                <td style={{ color: 'var(--text3)' }}>Net staking / Mkt Cap</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Annual Staking Rev</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>${annualStakingRevenue.toFixed(1)}M</td>
                <td style={{ color: 'var(--text3)' }}>{stakingYield}% × ${(currentETH * ethPrice / 1_000_000).toFixed(0)}M</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text2)' }}>Terminal NAV/Share</td>
                <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500 }}>${terminalNavPerShare.toFixed(2)}</td>
                <td style={{ color: 'var(--text3)' }}>at {navPremium}x = ${terminalPriceAtNav.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CALCULATION METHODOLOGY */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#methodology</div>
        <div className="card">
          <div className="card-title">Calculation Methodology</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6 }}>
            <p style={{ }}>
              <strong>NAV-based valuation</strong> for ETH treasury companies. Formula: Target = Terminal NAV/Share ÷ Discount.
              Discount rate captures ALL risk (regulatory, liquidity, tech, execution) in one number - no double-counting.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 1-4: Terminal Year NAV</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  {ethInputMode === 'growth' ? (
                    <>ETH Price = ${ethPrice.toLocaleString()} × (1 + {ethGrowthRate}%)^5<br/></>
                  ) : (
                    <>ETH Price = ${ethPrice.toLocaleString()} (current, no growth)<br/></>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${terminalEthPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong><br/><br/>
                  ETH Holdings = {currentETH.toLocaleString()} × (1 + {(netYieldRate * 100).toFixed(2)}%)^5<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>{terminalETH.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong><br/><br/>
                  Terminal NAV = {(terminalETH / 1_000_000).toFixed(2)}M ETH × ${terminalEthPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${(terminalNAV / 1000).toFixed(2)}B</strong>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 5-7: NAV Per Share</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  Diluted Shares = {currentShares}M × (1 + {dilutionRate}%)^5<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>{terminalShares.toFixed(0)}M</strong><br/><br/>
                  Terminal NAV/Share = ${(terminalNAV / 1000).toFixed(2)}B ÷ {terminalShares.toFixed(0)}M<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>${terminalNavPerShare.toFixed(2)}</strong><br/><br/>
                  At {navPremium}x Premium = ${terminalNavPerShare.toFixed(2)} × {navPremium}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${terminalPriceAtNav.toFixed(2)}</strong>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 8: Discount Factor</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  Discount Rate = <strong>{discountRate}%</strong><br/>
                  (captures time value + ALL risk)<br/><br/>
                  Discount Factor = (1 + {discountRate}%)^5<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>{discountFactor.toFixed(2)}x</strong><br/><br/>
                  <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                    8-10%: Low risk | 12-14%: Moderate<br/>
                    16-18%: Higher | 20%+: High risk
                  </span>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Step 9-10: Target Price</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: 8, borderRadius: 6 }}>
                  Target = Terminal NAV ÷ Discount<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = ${terminalPriceAtNav.toFixed(2)} ÷ {discountFactor.toFixed(2)}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <strong>${targetStockPrice.toFixed(2)}</strong><br/><br/>
                  Upside = (${targetStockPrice.toFixed(2)} - ${currentStockPrice.toFixed(2)}) / ${currentStockPrice.toFixed(2)}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong>{impliedUpside > 0 ? '+' : ''}{impliedUpside.toFixed(0)}%</strong>
                </div>
              </div>
            </div>

            <div style={{ padding: 10, background: 'var(--accent-dim)', borderRadius: 6, fontSize: 11 }}>
              <strong>Key Assumptions:</strong> Terminal year is {new Date().getFullYear() + 5} (5 years out).
              Discount rate captures ALL risk in one number (no separate risk factors to avoid double-counting).
              Staking yield compounds ETH holdings; operating costs reduce effective yield.
            </div>
          </div>
        </div>
      </>
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
  showCurrentIndicator = true,
}: {
  title: string;
  explanation: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  format?: string;
  currentValue?: number;
  showCurrentIndicator?: boolean;
}) => {
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const isCustomValue = !options.includes(value);

  const formatValue = (v: number) => {
    if (format === '$') return `$${v}`;
    if (format === '%') return `${v}%`;
    if (format === 'B') return v >= 1000 ? `${(v/1000).toFixed(1)}B` : `${v}`;
    if (format === 'M') return v >= 1000000 ? `${(v/1000000).toFixed(2)}M` : `${(v/1000).toFixed(0)}K`;
    if (format === 'ETH') return v >= 1000000 ? `${(v/1000000).toFixed(2)}M` : `${(v/1000).toFixed(0)}K`;
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
    <div className="card">
      <div className="card-title">{title}</div>
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
              {showCurrentIndicator && isCurrent && (
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
            background: 'rgba(167,139,250,0.15)',
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
            style={{
              padding: '10px 4px',
              borderRadius: 8,
              border: isCustomValue ? '2px solid var(--violet)' : '1px solid var(--border)',
              background: isCustomValue ? 'rgba(167,139,250,0.15)' : 'var(--surface2)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: isCustomValue ? 600 : 400,
              color: isCustomValue ? 'var(--violet)' : 'var(--text3)',
              position: 'relative',
            }}
          >
            {/* Position indicator dot - shows when current real value is custom (not a preset) */}
            {showCurrentIndicator && currentValue !== undefined && !options.slice(0, 6).includes(currentValue) && (
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
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginTop: 8 }}>
        ← Bearish | Bullish →
      </div>
    </div>
  );
};

// OVERVIEW TAB with CFA Guide
const OverviewTab = ({ calc, currentETH, setCurrentETH, currentShares, setCurrentShares, currentStockPrice, setCurrentStockPrice, ethPrice, setEthPrice, quarterlyDividend, setQuarterlyDividend, chartRefreshKey }) => {
  // Chart data - HISTORICAL ONLY
  // BMNR pivoted to ETH treasury in July 2025 (was BTC mining before)
  const holdingsData = [
    { label: 'Jul\'25', value: 163000, display: '163K' },
    { label: 'Aug\'25', value: 1000000, display: '1M' },
    { label: 'Sep\'25', value: 2000000, display: '2M' },
    { label: 'Oct\'25', value: 3000000, display: '3M' },
    { label: 'Dec\'25', value: 4000000, display: '4M' },
    { label: 'Jan\'26', value: currentETH, display: `${(currentETH / 1000000).toFixed(2)}M` },
  ];
  const maxValue = Math.max(...holdingsData.map(d => d.value));

  return (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-thesis</div>
    <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></h2>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#opportunity</div>
    <div className="highlight"><h3 style={{ display: 'flex', alignItems: 'center' }}>The Opportunity<UpdateIndicators sources="PR" /></h3>
      <p style={{ fontSize: 14, color: 'var(--text2)' }}><strong style={{ color: 'var(--accent)' }}>BMNR:</strong> ETH treasury company accumulating ETH through strategic capital raises and generating yield via staking. Key metrics: NAV per share (intrinsic value), NAV premium/discount (market sentiment), and dividend yield (income generation).</p>
    </div>

    <div className="g2">
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#thesis-bull</div>
        <div className="thesis bull">
          <h4 style={{ display: 'flex', alignItems: 'center' }}>↑ Bull Case<UpdateIndicators sources="PR" /></h4>
          <ul>
            <li>ETH price appreciation — Cycle targets $10K-$15K+</li>
            <li>NAV premium expansion — MSTR trades 2-3x; BMNR could follow</li>
            <li>ETF/index inclusion — Forces passive buying, liquidity premium</li>
            <li>Dividend growth — Staking scales → higher payouts</li>
            <li>MAVAN launch — Proprietary staking = higher yields</li>
            <li>Regulatory clarity — ETH not a security, staking approved</li>
          </ul>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#thesis-bear</div>
        <div className="thesis bear">
          <h4 style={{ display: 'flex', alignItems: 'center' }}>↓ Bear Case<UpdateIndicators sources="PR" /></h4>
          <ul>
            <li>ETH price crash — Crypto winter, -70% drawdowns possible</li>
            <li>NAV discount — Premium compresses or inverts</li>
            <li>Dilution risk — Aggressive ATM erodes ETH/share</li>
            <li>Slashing events — Validator penalties reduce holdings</li>
            <li>Regulatory action — SEC deems ETH a security</li>
            <li>Execution risk — MAVAN delays, competition</li>
          </ul>
        </div>
      </div>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#chart</div>
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>ETH Holdings Growth<UpdateIndicators sources="PR" /></div>
      </div>
      <div className="bars">
        {holdingsData.map((d, i) => (
          <div key={i} className="bar-col">
            <div className="bar-val">{d.display}</div>
            <div className="bar" style={{ height: `${maxValue > 0 ? (d.value / maxValue) * 150 : 0}px`, background: 'var(--accent)' }} />
            <div className="bar-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#key-metrics</div>
    <table className="tbl" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Metric</th>
          <th className="r">Value</th>
          <th style={{ textAlign: 'left' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NAV/Share</td>
          <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600 }}>${calc.currentNAV.toFixed(2)}</td>
          <td style={{ color: 'var(--text3)' }}>Book value per share</td>
        </tr>
        <tr>
          <td>Stock Price</td>
          <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600 }}>${currentStockPrice.toFixed(2)}</td>
          <td style={{ color: 'var(--text3)' }}>Market price</td>
        </tr>
        <tr>
          <td>Premium/Discount</td>
          <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: calc.navPremium >= 0 ? 'var(--mint)' : 'var(--red)' }}>{calc.navPremium >= 0 ? '+' : ''}{calc.navPremium.toFixed(1)}%</td>
          <td style={{ color: 'var(--text3)' }}>{calc.navPremium >= 0 ? 'Trading above NAV' : 'Trading below NAV'}</td>
        </tr>
        <tr>
          <td>Dividend Yield</td>
          <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--mint)' }}>{calc.dividendYield.toFixed(2)}%</td>
          <td style={{ color: 'var(--text3)' }}>${calc.annualDividend.toFixed(2)}/share annually</td>
        </tr>
      </tbody>
    </table>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#company-snapshot</div>
    <div className="card">
      <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Company Snapshot<UpdateIndicators sources={['PR', 'SEC']} /></div>
      <div className="g3">
        <div><div style={{ fontSize: 11, color: 'var(--text3)' }}>ETH Holdings</div>
          <Row label="Total ETH" value={currentETH.toLocaleString()} />
          <Row label="ETH Price" value={`$${ethPrice.toLocaleString()}`} />
          <Row label="Total Value" value={`$${((currentETH * ethPrice) / 1e9).toFixed(2)}B`} highlight />
          <Row label="Annual Yield" value={`${Math.round(calc.annualYieldETH).toLocaleString()} ETH`} />
        </div>
        <div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Share Structure</div>
          <Row label="Shares Outstanding" value={`${currentShares}M`} />
          <Row label="Market Cap" value={`$${(calc.marketCap / 1e9).toFixed(2)}B`} />
          <Row label="NAV Multiple" value={`${(currentStockPrice / calc.currentNAV).toFixed(2)}x`} highlight />
          <Row label="ETH/Share" value={calc.ethPerShare.toFixed(6)} />
        </div>
        <div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Dividend</div>
          <Row label="Quarterly Dividend" value={`$${quarterlyDividend.toFixed(2)}`} />
          <Row label="Annual Dividend" value={`$${calc.annualDividend.toFixed(2)}`} />
          <Row label="Dividend Yield" value={`${calc.dividendYield.toFixed(2)}%`} highlight />
          <Row label="Annual Payout" value={`$${(calc.totalAnnualDividendPayout / 1e6).toFixed(1)}M`} />
          <Row label="Payout Ratio" value={`${calc.dividendPayoutRatio.toFixed(1)}% of staking`} />
        </div>
      </div>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#parameters-header</div>
    <h3 className="section-head">Parameters</h3>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#treasury-assets</div>
    <div className="g2">
      <OverviewParameterCard
        title="ETH Holdings"
        explanation="Total ETH in treasury. Primary driver of NAV. Higher holdings = more intrinsic value per share assuming no dilution."
        options={[3000000, 4000000, DEFAULTS.currentETH, 5000000, 6000000, 7000000]}
        value={currentETH}
        onChange={setCurrentETH}
        format="ETH"
        currentValue={DEFAULTS.currentETH}
      />
      <OverviewParameterCard
        title="ETH Price ($)"
        explanation="Current ETH spot price. Drives NAV calculation. Higher ETH price = higher NAV/share and staking income."
        options={[2000, 2500, DEFAULTS.ethPrice, 3500, 4000, 5000]}
        value={ethPrice}
        onChange={setEthPrice}
        format="$"
        currentValue={DEFAULTS.ethPrice}
      />
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-structure</div>
    <div className="g2">
      <OverviewParameterCard
        title="Shares (M)"
        explanation="Total diluted shares. Higher count dilutes ETH/share and NAV/share."
        options={[500, 450, DEFAULTS.currentShares, 400, 350, 300]}
        value={currentShares}
        onChange={setCurrentShares}
        currentValue={DEFAULTS.currentShares}
      />
      <OverviewParameterCard
        title="Stock Price ($)"
        explanation="Current market price. Compare to NAV for premium/discount analysis."
        options={[15, 20, DEFAULTS.currentStockPrice, 40, 55, 70]}
        value={currentStockPrice}
        onChange={setCurrentStockPrice}
        format="$"
        currentValue={DEFAULTS.currentStockPrice}
        showCurrentIndicator={false}
      />
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dividend-income</div>
    <div className="g2">
      <OverviewParameterCard
        title="Qtr Dividend ($)"
        explanation="Per-share quarterly dividend. Higher dividend = better yield for income investors."
        options={[DIVIDEND_DATA.quarterlyDividend, 0.02, 0.03, 0.04, 0.05, 0.10]}
        value={quarterlyDividend}
        onChange={setQuarterlyDividend}
        format="$"
        currentValue={DIVIDEND_DATA.quarterlyDividend}
      />
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#chart-header</div>
    <h3 className="section-head">Stock Chart</h3>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#stock-chart</div>
    <StockChart symbol="BMNR" externalRefreshKey={chartRefreshKey} onPriceUpdate={(price) => setCurrentStockPrice(price)} />

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
    <CFANotes title="CFA Level III — ETH Treasury Fundamentals" items={[
      { term: 'Net Asset Value (NAV)', def: 'Intrinsic value of underlying assets = (ETH Holdings × ETH Price + Cash + Other Assets). NOT dependent on stock price. NAV is what the company owns; stock price is what market will pay for it.' },
      { term: 'NAV/Share', def: 'NAV ÷ Shares Outstanding. The per-share liquidation value. Example: $10.5B NAV ÷ 434M shares = $24.23/share. This is independent of where stock trades.' },
      { term: 'mNAV (NAV Multiple)', def: 'Stock Price ÷ NAV/Share. If stock = $27 and NAV = $24, mNAV = 1.125x (12.5% premium). mNAV > 1 = premium, mNAV < 1 = discount. MSTR trades 2-3x; GBTC traded at -40% discount for years.' },
      { term: 'Premium/Discount Drivers', def: 'Premiums reflect: management alpha, scarcity value, institutional access, yield generation. Discounts reflect: liquidity concerns, management fees, redemption restrictions, market skepticism.' },
      { term: 'ETH/Share (Backing Ratio)', def: 'ETH Holdings ÷ Shares. Your fractional ETH ownership. If this rises (buybacks, accretive offerings), you gain even if ETH is flat. Dilution reduces this; accretion increases it.' },
      { term: 'Accretive vs Dilutive Issuance', def: 'Issuing shares above NAV is ACCRETIVE (increases ETH/share for existing holders). Below NAV is DILUTIVE. At 1.5x mNAV, selling $100 of stock buys $150 of ETH equivalent.' },
      { term: 'Staking Yield (CESR)', def: 'Composite Ethereum Staking Rate — the benchmark yield for staking ETH (~2.81%). BMNR earns this on staked ETH. At 2.9M ETH staked × 2.81% = ~$188M/yr annualized income.' },
      { term: 'Staking Ratio', def: '% of ETH holdings that are staked. Higher = more yield income. BMNR at 67.6% (2.9M of 4.3M). Target is near 100% via MAVAN. Unstaked ETH earns nothing.' },
      { term: 'Flywheel Effect', def: 'Premium → Issue shares → Buy ETH → NAV grows → Premium sustained → Repeat. Only works while mNAV > 1. This is how MSTR accumulated 470K+ BTC.' },
      { term: 'NAV Floor', def: 'Theoretical minimum value = liquidation value. In practice, discounts can persist (GBTC). Buybacks at discount are value-accretive and can defend NAV floor.' },
    ]} />
  </div>
  );
};

// SCENARIOS TAB - Comprehensive scenario analysis
const ScenariosTab = ({ calc, currentETH, currentShares, currentStockPrice, ethPrice, baseStakingAPY, stakingRatio, quarterlyDividend, dividendGrowthRate }) => {
  const [targetYear, setTargetYear] = useState(2028);
  const [selectedScenario, setSelectedScenario] = useState('base');
  const TARGET_YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
  const timeHorizon = targetYear - 2025; // Years from now for calculations
  
  const scenarios = useMemo(() => {
    const totalShares = currentShares * 1e6;
    const stakedETH = currentETH * (stakingRatio / 100);
    const annualDiv = quarterlyDividend * 4;
    
    // Calculate compounded ETH from staking over time horizon
    const compoundETH = (years, apy) => stakedETH * Math.pow(1 + apy / 100, years) + (currentETH - stakedETH);
    
    // Calculate cumulative dividends with growth
    const cumulativeDividends = (years, growthRate) => {
      let total = 0;
      for (let y = 1; y <= years; y++) {
        total += annualDiv * Math.pow(1 + growthRate / 100, y - 1);
      }
      return total;
    };
    
    // Scenario definitions with ANNUALIZED growth rates - time horizon affects final price
    const defs = [
      {
        id: 'worst', name: 'Worst Case', color: '#ef4444', emoji: '💀',
        ethCAGR: -25, navMultiple: 0.5, dilutionPerYear: 400, stakingAPY: 2.0, divGrowth: -50, prob: 5,
        description: 'Crypto winter: -25%/yr ETH, forced dilution, dividend cut',
        assumptions: ['Extended crypto winter with regulatory crackdowns', 'ETH loses market share to competing L1s', 'Forced share issuance at deep discount to NAV', 'Dividend suspended or significantly cut'],
        catalysts: [],
        risks: ['Liquidation of ETH holdings at depressed prices', 'NAV discount widens to 50%+', 'Potential delisting or restructuring']
      },
      {
        id: 'bear', name: 'Bear Case', color: '#f97316', emoji: '🐻',
        ethCAGR: -10, navMultiple: 0.75, dilutionPerYear: 250, stakingAPY: 3.0, divGrowth: 0, prob: 15,
        description: 'Prolonged downturn: -10%/yr ETH, dividend frozen',
        assumptions: ['Multi-year crypto bear market', 'Staking yields compressed due to validator oversupply', 'Limited institutional adoption', 'Dividend frozen at current level'],
        catalysts: ['ETH price stabilization', 'Staking yield recovery'],
        risks: ['Continued NAV discount', 'Opportunity cost vs direct ETH', 'Management fee drag']
      },
      {
        id: 'base', name: 'Base Case', color: '#3b82f6', emoji: '📊',
        ethCAGR: 15, navMultiple: 1.0, dilutionPerYear: 150, stakingAPY: baseStakingAPY, divGrowth: dividendGrowthRate, prob: 35,
        description: 'Steady growth: +15%/yr ETH, dividend grows with staking',
        assumptions: ['Gradual ETH adoption and price appreciation', 'Staking yields remain stable at 3-4%', 'Moderate dilution for strategic acquisitions', 'Dividend grows in line with ETH yield'],
        catalysts: ['Continued ETH ecosystem growth', 'Institutional allocation to crypto', 'Staking yield optimization'],
        risks: ['Competition from ETH ETFs', 'Regulatory uncertainty']
      },
      {
        id: 'mgmt', name: 'Management Case', color: '#a855f7', emoji: '🎯',
        ethCAGR: 35, navMultiple: 1.25, dilutionPerYear: 400, stakingAPY: baseStakingAPY + 0.5, divGrowth: dividendGrowthRate + 10, prob: 25,
        description: 'Alchemy of 5%: +35%/yr ETH, accelerating dividends',
        assumptions: ['Management achieves "5% of ETH supply" target', 'Accretive dilution at NAV premium', 'Enhanced staking yields through restaking', 'Dividend growth accelerates with scale'],
        catalysts: ['ETH supply shock narrative gains traction', 'Successful capital raises above NAV', 'Restaking protocol partnerships'],
        risks: ['Execution risk on aggressive accumulation', 'NAV premium compression']
      },
      {
        id: 'bull', name: 'Bull Case', color: '#22c55e', emoji: '🐂',
        ethCAGR: 50, navMultiple: 1.5, dilutionPerYear: 500, stakingAPY: baseStakingAPY + 1.0, divGrowth: dividendGrowthRate + 20, prob: 15,
        description: 'Bull market: +50%/yr ETH, strong dividend growth',
        assumptions: ['Crypto bull market with ETH outperformance', 'Institutional FOMO drives NAV premium', 'Staking yields enhanced by MEV and restaking', 'Aggressive dividend increases'],
        catalysts: ['ETH ETF approval and inflows', 'DeFi summer 2.0', 'Enterprise blockchain adoption'],
        risks: ['Volatility and drawdown risk', 'Overextended valuations']
      },
      {
        id: 'superbull', name: 'Super Bull', color: '#10b981', emoji: '🚀',
        ethCAGR: 75, navMultiple: 2.0, dilutionPerYear: 700, stakingAPY: baseStakingAPY + 1.5, divGrowth: dividendGrowthRate + 30, prob: 5,
        description: 'Euphoria: +75%/yr ETH, aggressive dividend increases',
        assumptions: ['Parabolic ETH price appreciation', 'BMNR becomes premier ETH accumulation vehicle', 'Massive NAV premium as scarcity narrative dominates', 'Dividend yield attracts income investors'],
        catalysts: ['Global crypto adoption inflection', 'ETH flippening narrative', 'BMNR inclusion in major indices'],
        risks: ['Bubble dynamics and crash risk', 'Regulatory backlash at scale']
      },
    ];
    
    return defs.map(s => {
      // Calculate future ETH price based on CAGR and time horizon
      const futureEthPrice = ethPrice * Math.pow(1 + s.ethCAGR / 100, timeHorizon);
      const ethReturn = ((futureEthPrice / ethPrice) - 1) * 100;
      
      // Calculate future ETH from staking (compounded)
      const futureETHFromStaking = compoundETH(timeHorizon, s.stakingAPY);
      
      // Calculate total dilution over time horizon
      const totalDilutionShares = s.dilutionPerYear * timeHorizon;
      
      // Calculate ETH bought from dilution (assuming issued at NAV multiple)
      const preNAV = (futureETHFromStaking * futureEthPrice) / totalShares;
      const salePrice = preNAV * s.navMultiple * 0.95; // 5% discount
      const proceeds = totalDilutionShares * 1e6 * salePrice;
      const ethBought = proceeds / futureEthPrice;
      
      // Final state
      const finalETH = futureETHFromStaking + ethBought;
      const finalShares = currentShares + totalDilutionShares;
      const finalNAV = (finalETH * futureEthPrice) / (finalShares * 1e6);
      const finalStockPrice = finalNAV * s.navMultiple;
      const finalMarketCap = finalStockPrice * finalShares * 1e6;
      
      // Dividend calculations
      const totalDividends = cumulativeDividends(timeHorizon, s.divGrowth);
      const finalAnnualDiv = annualDiv * Math.pow(1 + s.divGrowth / 100, timeHorizon);
      const finalDivYield = finalStockPrice > 0 ? (finalAnnualDiv / finalStockPrice) * 100 : 0;
      
      // Returns (price only vs total return including dividends)
      const stockReturn = ((finalStockPrice / currentStockPrice) - 1) * 100;
      const totalReturnValue = finalStockPrice + totalDividends;
      const totalReturn = ((totalReturnValue / currentStockPrice) - 1) * 100;
      const navReturn = ((finalNAV / calc.currentNAV) - 1) * 100;
      const irr = (Math.pow(finalStockPrice / currentStockPrice, 1 / timeHorizon) - 1) * 100;
      const totalIRR = (Math.pow(totalReturnValue / currentStockPrice, 1 / timeHorizon) - 1) * 100;
      
      // Generate year-by-year projections for this scenario
      const projections = TARGET_YEARS.map(year => {
        const years = year - 2025;
        const yearEthPrice = ethPrice * Math.pow(1 + s.ethCAGR / 100, years);
        const yearETHFromStaking = compoundETH(years, s.stakingAPY);
        const yearDilutionShares = s.dilutionPerYear * years;
        const yearPreNAV = (yearETHFromStaking * yearEthPrice) / totalShares;
        const yearSalePrice = yearPreNAV * s.navMultiple * 0.95;
        const yearProceeds = yearDilutionShares * 1e6 * yearSalePrice;
        const yearEthBought = yearProceeds / yearEthPrice;
        const yearFinalETH = yearETHFromStaking + yearEthBought;
        const yearFinalShares = currentShares + yearDilutionShares;
        const yearFinalNAV = (yearFinalETH * yearEthPrice) / (yearFinalShares * 1e6);
        const yearStockPrice = yearFinalNAV * s.navMultiple;
        const yearCumDividends = cumulativeDividends(years, s.divGrowth);
        const yearTotalReturnValue = yearStockPrice + yearCumDividends;
        const yearReturn = ((yearStockPrice / currentStockPrice) - 1) * 100;
        const yearTotalReturn = ((yearTotalReturnValue / currentStockPrice) - 1) * 100;

        return {
          year,
          ethPrice: yearEthPrice,
          ethHoldings: yearFinalETH,
          shares: yearFinalShares,
          nav: yearFinalNAV,
          stockPrice: yearStockPrice,
          cumDividends: yearCumDividends,
          priceReturn: yearReturn,
          totalReturn: yearTotalReturn,
        };
      });

      return {
        ...s,
        ethPrice: futureEthPrice,
        dilutionShares: totalDilutionShares,
        futureETH: finalETH,
        finalShares,
        finalNAV,
        finalStockPrice,
        finalMarketCap,
        stockReturn,
        totalReturn,
        totalDividends,
        finalAnnualDiv,
        finalDivYield,
        navReturn,
        ethReturn,
        irr,
        totalIRR,
        ethPerShare: finalETH / (finalShares * 1e6),
        yieldETH: futureETHFromStaking - currentETH,
        projections,
      };
    });
  }, [currentETH, currentShares, currentStockPrice, ethPrice, calc.currentNAV, baseStakingAPY, stakingRatio, targetYear, timeHorizon, quarterlyDividend, dividendGrowthRate]);

  return (
    <>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Scenario Simulation<UpdateIndicators sources={['PR', 'SEC']} /></h2>

      <div className="highlight">
        <h3>Multi-Year Projections</h3>
        <p className="text-sm">
          Model stock price under different ETH price trajectories and market conditions.
          Bear case assumes crypto winter and NAV discount. Bull case models ETH appreciation with NAV premium.
          Adjust time horizon to see how outcomes compound.
        </p>
      </div>

      {/* Controls - Target Year and Scenario Selector */}
      <div className="g2" style={{ }}>
        <div className="card">
          <div className="card-title">Target Year</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TARGET_YEARS.map(year => (
              <button
                key={year}
                onClick={() => setTargetYear(year)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: targetYear === year ? '2px solid var(--mint)' : '1px solid var(--border)',
                  background: targetYear === year ? 'rgba(0,212,170,0.15)' : 'var(--surface2)',
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

        <div className="card">
          <div className="card-title">Scenario</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: selectedScenario === s.id ? `2px solid ${s.color}` : '1px solid var(--border)',
                  background: selectedScenario === s.id ? `${s.color}22` : 'var(--surface2)',
                  color: selectedScenario === s.id ? s.color : 'var(--text2)',
                  cursor: 'pointer',
                  fontWeight: selectedScenario === s.id ? 700 : 400,
                  fontSize: 14,
                }}
              >
                {s.name} ({s.prob}%)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Scenario Header + Key Metrics + Financial Projections */}
      {(() => {
        const selected = scenarios.find(s => s.id === selectedScenario);
        if (!selected) return null;
        const targetProjection = selected.projections.find(p => p.year === targetYear);
        if (!targetProjection) return null;
        const priceReturn = ((targetProjection.stockPrice / currentStockPrice) - 1) * 100;
        const ethReturn = ((targetProjection.ethPrice / ethPrice) - 1) * 100;

        return (
          <>
            {/* Scenario Header */}
            <div className="card" style={{ borderLeft: `4px solid ${selected.color}` }}>
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
            <div className="g4" style={{ }}>
              <div className="big-stat">
                <div className="num" style={{ color: selected.color }}>${targetProjection.stockPrice.toFixed(0)}</div>
                <div className="lbl">Stock Price</div>
                <div style={{ fontSize: 12, color: priceReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {priceReturn >= 0 ? '+' : ''}{priceReturn.toFixed(0)}% from ${currentStockPrice.toFixed(0)}
                </div>
              </div>
              <div className="big-stat">
                <div className="num">${targetProjection.ethPrice.toLocaleString()}</div>
                <div className="lbl">ETH Price</div>
                <div style={{ fontSize: 12, color: ethReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {ethReturn >= 0 ? '+' : ''}{ethReturn.toFixed(0)}% from ${ethPrice.toLocaleString()}
                </div>
              </div>
              <div className="big-stat">
                <div className="num">${targetProjection.nav.toFixed(2)}</div>
                <div className="lbl">NAV/Share</div>
                <div style={{ fontSize: 12, color: 'var(--sky)' }}>
                  {selected.navMultiple.toFixed(2)}x mNAV
                </div>
              </div>
              <div className="big-stat">
                <div className="num" style={{ color: targetProjection.totalReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {targetProjection.totalReturn >= 0 ? '+' : ''}{targetProjection.totalReturn.toFixed(0)}%
                </div>
                <div className="lbl">Total Return</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                  incl. ${targetProjection.cumDividends.toFixed(2)} dividends
                </div>
              </div>
            </div>

            {/* Financial Projections Table */}
            <div className="card" style={{ }}>
              <div className="card-title">Financial Projections — {selected.name} Scenario</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th className="r">Today</th>
                    {selected.projections.map(p => (
                      <th key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        {p.year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ETH Price</td>
                    <td className="r">${ethPrice.toLocaleString()}</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        ${p.ethPrice.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>ETH Holdings (M)</td>
                    <td className="r">{(currentETH / 1e6).toFixed(3)}</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        {(p.ethHoldings / 1e6).toFixed(3)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Shares (M)</td>
                    <td className="r">{currentShares.toFixed(0)}</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        {p.shares.toFixed(0)}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td>NAV/Share</td>
                    <td className="r">${calc.currentNAV.toFixed(2)}</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        ${p.nav.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Stock Price</td>
                    <td className="r">${currentStockPrice.toFixed(2)}</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ fontWeight: 700, color: selected.color, background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        ${p.stockPrice.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Cum. Dividends</td>
                    <td className="r">$0.00</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ color: 'var(--mint)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        ${p.cumDividends.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td>Price Return</td>
                    <td className="r">—</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ color: p.priceReturn >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        {p.priceReturn >= 0 ? '+' : ''}{p.priceReturn.toFixed(0)}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Total Return</td>
                    <td className="r">—</td>
                    {selected.projections.map(p => (
                      <td key={p.year} className="r" style={{ fontWeight: 700, color: p.totalReturn >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                        {p.totalReturn >= 0 ? '+' : ''}{p.totalReturn.toFixed(0)}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </>
        );
      })()}

      {/* KEY ASSUMPTIONS & CATALYSTS */}
      <div className="g2" style={{ }}>
        <div className="card">
          <div className="card-title">Key Assumptions</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
            {scenarios.find(s => s.id === selectedScenario)?.assumptions.map((a, i) => (
              <li key={i} style={{ lineHeight: 1.5 }}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-title">{scenarios.find(s => s.id === selectedScenario)?.catalysts.length > 0 ? 'Catalysts' : 'Key Risks'}</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
            {(scenarios.find(s => s.id === selectedScenario)?.catalysts.length > 0 ? scenarios.find(s => s.id === selectedScenario)?.catalysts : scenarios.find(s => s.id === selectedScenario)?.risks)?.map((item, i) => (
              <li key={i} style={{ lineHeight: 1.5 }}>{item}</li>
            ))}
          </ul>
          {scenarios.find(s => s.id === selectedScenario)?.catalysts.length > 0 && scenarios.find(s => s.id === selectedScenario)?.risks.length > 0 && (
            <>
              <div className="card-title" style={{ }}>Risks</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                {scenarios.find(s => s.id === selectedScenario)?.risks.map((r, i) => (
                  <li key={i} style={{ lineHeight: 1.5 }}>{r}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* PROBABILITY-WEIGHTED EXPECTED VALUE */}
      <div className="highlight" style={{ }}>
        <h3>Probability-Weighted Expected Value — {targetYear}</h3>
        <p style={{ color: 'var(--text2)' }}>
          Weighted average across all scenarios based on assigned probabilities
        </p>
        {(() => {
          const pwev = scenarios.reduce((acc, s) => {
            acc.stockPrice += s.finalStockPrice * (s.prob / 100);
            acc.totalReturn += s.totalReturn * (s.prob / 100);
            acc.irr += s.totalIRR * (s.prob / 100);
            return acc;
          }, { stockPrice: 0, totalReturn: 0, irr: 0 });
          const expectedReturn = ((pwev.stockPrice / currentStockPrice) - 1) * 100;

          return (
            <>
              <div className="g4">
                <div className="big-stat">
                  <div className="num mint">${pwev.stockPrice.toFixed(2)}</div>
                  <div className="lbl">Expected Stock Price</div>
                </div>
                <div className="big-stat">
                  <div className={`num ${expectedReturn >= 0 ? 'mint' : 'coral'}`}>{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</div>
                  <div className="lbl">Expected Return</div>
                </div>
                <div className="big-stat">
                  <div className={`num ${pwev.irr >= 0 ? 'sky' : 'coral'}`}>{pwev.irr >= 0 ? '+' : ''}{pwev.irr.toFixed(1)}%</div>
                  <div className="lbl">Expected IRR</div>
                </div>
                <div className="big-stat">
                  <div className="num">${currentStockPrice.toFixed(2)}</div>
                  <div className="lbl">Current Price</div>
                </div>
              </div>
              <table className="tbl" style={{ }}>
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th className="r">Probability</th>
                    <th className="r">Stock Price</th>
                    <th className="r">Return</th>
                    <th className="r">Weighted Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map(s => {
                    const contribution = s.finalStockPrice * (s.prob / 100);
                    return (
                      <tr key={s.id} style={{ background: selectedScenario === s.id ? `${s.color}11` : 'transparent' }}>
                        <td>
                          <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: s.color, marginRight: 8 }}></span>
                          {s.name}
                        </td>
                        <td className="r">{s.prob}%</td>
                        <td className="r" style={{ fontFamily: 'Space Mono' }}>${s.finalStockPrice.toFixed(2)}</td>
                        <td className="r" style={{ color: s.stockReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                          {s.stockReturn >= 0 ? '+' : ''}{s.stockReturn.toFixed(0)}%
                        </td>
                        <td className="r" style={{ fontFamily: 'Space Mono', color: 'var(--sky)' }}>${contribution.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr style={{ fontWeight: 700, borderTop: '2px solid var(--border)' }}>
                    <td>Expected Value</td>
                    <td className="r">100%</td>
                    <td className="r mint" style={{ fontFamily: 'Space Mono' }}>${pwev.stockPrice.toFixed(2)}</td>
                    <td className="r mint">{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</td>
                    <td className="r mint" style={{ fontFamily: 'Space Mono' }}>${pwev.stockPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </>
          );
        })()}
      </div>

      {/* Comparison Table */}
      <div className="card" style={{ }}>
        <div className="card-title">All Scenarios — {targetYear} Comparison</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Metric</th>
                {scenarios.map(s => (
                  <th key={s.id} className="r" style={{ color: s.color }}>{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ETH Price ($)</td>
                {scenarios.map(s => <td key={s.id} className="r">${s.ethPrice.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td>ETH Holdings (M)</td>
                {scenarios.map(s => <td key={s.id} className="r">{(s.futureETH / 1e6).toFixed(2)}</td>)}
              </tr>
              <tr>
                <td>NAV/Share ($)</td>
                {scenarios.map(s => <td key={s.id} className="r">${s.finalNAV.toFixed(2)}</td>)}
              </tr>
              <tr style={{ fontWeight: 700 }}>
                <td>Stock Price ($)</td>
                {scenarios.map(s => (
                  <td key={s.id} className="r" style={{ color: s.color }}>
                    ${s.finalStockPrice.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Cum. Dividends ($)</td>
                {scenarios.map(s => (
                  <td key={s.id} className="r" style={{ color: 'var(--mint)' }}>
                    ${s.totalDividends.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Price Return (%)</td>
                {scenarios.map(s => (
                  <td key={s.id} className="r" style={{ color: s.stockReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {s.stockReturn >= 0 ? '+' : ''}{s.stockReturn.toFixed(0)}%
                  </td>
                ))}
              </tr>
              <tr style={{ fontWeight: 700 }}>
                <td>Total Return (%)</td>
                {scenarios.map(s => (
                  <td key={s.id} className="r" style={{ color: s.totalReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {s.totalReturn >= 0 ? '+' : ''}{s.totalReturn.toFixed(0)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td>Total IRR (%)</td>
                {scenarios.map(s => (
                  <td key={s.id} className="r" style={{ color: s.totalIRR >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {s.totalIRR >= 0 ? '+' : ''}{s.totalIRR.toFixed(1)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="card" style={{ }}><div className="card-title">Key Insights</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Leverage Effect</h4>
            <p className="text-slate-300">In bull scenarios, stock returns exceed ETH returns due to accretive dilution and NAV premium expansion. In bear scenarios, leverage works against you — discount to NAV amplifies losses.</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Staking Yield Buffer</h4>
            <p className="text-slate-300">Over {timeHorizon} years, staking adds ~{((Math.pow(1 + baseStakingAPY/100, timeHorizon) - 1) * 100).toFixed(0)}% to ETH holdings. This provides a cushion in bear markets and compounds gains in bull markets.</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Dilution Strategy</h4>
            <p className="text-slate-300">Aggressive dilution is accretive when issued above NAV. In super bull scenario, issuing 3B shares at 2x NAV massively increases ETH/share despite share count tripling.</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-violet-400 mb-2">Risk/Reward</h4>
            <p className="text-slate-300">Worst case: -{Math.abs(scenarios[0].stockReturn).toFixed(0)}%. Super bull: +{scenarios[5].stockReturn.toFixed(0)}%. Asymmetric if you believe in long-term ETH appreciation.</p>
          </div>
        </div>
      </div>

      {/* METHODOLOGY & ASSUMPTIONS */}
      <div className="card" style={{ }}>
        <div className="card-title">Methodology & Assumptions</div>
        <div className="g2">
          <div>
            <h4 style={{ color: 'var(--mint)' }}>Valuation Framework</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
              <li><strong>ETH Price:</strong> Future ETH = Current ETH × (1 + CAGR)^Years</li>
              <li><strong>Staking Yield:</strong> ETH Holdings compound at scenario-specific APY</li>
              <li><strong>Dilution:</strong> New shares issued annually, accretive if above NAV</li>
              <li><strong>NAV Calculation:</strong> (ETH Holdings × ETH Price) ÷ Total Shares</li>
              <li><strong>Stock Price:</strong> NAV × NAV Multiple (premium/discount)</li>
              <li><strong>Total Return:</strong> Price Return + Cumulative Dividends</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--sky)' }}>Key Model Inputs</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)', lineHeight: 1.8 }}>
              <li><strong>Current ETH Holdings:</strong> {(currentETH / 1e6).toFixed(2)}M ETH</li>
              <li><strong>ETH Price Range:</strong> ${scenarios[0].ethPrice.toLocaleString()} to ${scenarios[5].ethPrice.toLocaleString()} ({timeHorizon}Y)</li>
              <li><strong>NAV Multiples:</strong> 0.5x (Worst) to 2.0x (Super Bull)</li>
              <li><strong>Staking APY:</strong> {scenarios[0].stakingAPY.toFixed(1)}% to {scenarios[5].stakingAPY.toFixed(1)}%</li>
              <li><strong>Annual Dilution:</strong> {scenarios[0].dilutionPerYear}M to {scenarios[5].dilutionPerYear}M shares/year</li>
              <li><strong>Time Horizon:</strong> {timeHorizon} years</li>
            </ul>
          </div>
        </div>
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8 }}>
          <h4 style={{ color: 'var(--gold)' }}>Important Caveats</h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text3)', lineHeight: 1.8, fontSize: 13 }}>
            <li>Projections are illustrative scenarios, not forecasts. Actual results may differ materially.</li>
            <li>ETH price assumptions are highly speculative; cryptocurrency markets are extremely volatile.</li>
            <li>NAV multiples can diverge significantly from historical ranges during market stress.</li>
            <li>Dilution is modeled as linear; actual capital raises depend on market conditions.</li>
            <li>Staking yields may decrease as more ETH is staked network-wide.</li>
            <li>Management strategy execution (Alchemy of 5%) is uncertain and may not be achieved.</li>
          </ul>
        </div>
      </div>

      <CFANotes title="CFA Level III — Scenario Analysis" items={[
        { term: 'Purpose', def: 'Compare outcomes across market conditions. Each scenario combines ETH price trajectory, NAV multiple (market sentiment), dilution strategy, and staking yield to project future stock price and returns.' },
        { term: 'Key Assumptions', def: 'Dilution is assumed accretive when issued above NAV. Staking yields compound over the time horizon. NAV multiples reflect market sentiment (discount in bear, premium in bull).' },
        { term: 'Management Case', def: 'Based on the "Alchemy of 5%" thesis — reaching 5% of ETH supply through strategic accumulation, driving scarcity value and NAV premium.' },
        { term: 'IRR (Internal Rate of Return)', def: 'Annualized return accounting for time value of money. Compare stock IRR to ETH IRR — leverage amplifies gains/losses. NAV per share shows fundamental value creation.' },
        { term: 'Total Return', def: 'Combines price appreciation + cumulative dividends. Dividend reinvestment would compound returns further.' },
      ]} />
    </>
  );
};

// STAKING TAB with CFA Guide
const StakingTab = ({ calc, currentETH, ethPrice, stakingType, setStakingType, baseStakingAPY, setBaseStakingAPY, restakingBonus, setRestakingBonus, stakingRatio, setStakingRatio, slashingRisk, setSlashingRisk }) => {
  const soloAPY = baseStakingAPY + 0.5;
  const liquidAPY = baseStakingAPY;
  const restakingAPY = baseStakingAPY + restakingBonus;
  const projections = useMemo(() => [1, 2, 3, 5, 10].map(y => {
    const stakedETH = currentETH * (stakingRatio / 100);
    const compounded = stakedETH * Math.pow(1 + calc.effectiveAPY / 100, y);
    const yieldETH = compounded - stakedETH;
    return { year: y, totalETH: currentETH + yieldETH, yieldETH, nav: ((currentETH + yieldETH) * ethPrice) / calc.totalShares };
  }), [currentETH, ethPrice, stakingRatio, calc.effectiveAPY, calc.totalShares]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#staking-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Staking<UpdateIndicators sources={['PR', 'SEC']} /></h2>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#staking-intro</div>
      <div className="highlight"><h3>ETH Staking Yield</h3>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>BMNR generates yield by staking ETH through validators. Compare staking strategies and model compounding returns over time.</p>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#staking-strategy</div>
      <div className="g3">
        <div onClick={() => setStakingType('solo')} style={{ padding: 16, borderRadius: 12, border: stakingType === 'solo' ? '2px solid var(--violet)' : '1px solid var(--border)', background: stakingType === 'solo' ? 'var(--violet-dim)' : 'var(--surface2)', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontWeight: 500 }}>Solo Staking</span><span style={{ fontSize: 18, fontWeight: 700, color: 'var(--mint)' }}>{soloAPY.toFixed(1)}%</span></div>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>Run validators. +0.5% MEV/tips.</p><p style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>Higher risk: slashing, technical</p>
        </div>
        <div onClick={() => setStakingType('liquid')} style={{ padding: 16, borderRadius: 12, border: stakingType === 'liquid' ? '2px solid var(--violet)' : '1px solid var(--border)', background: stakingType === 'liquid' ? 'var(--violet-dim)' : 'var(--surface2)', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontWeight: 500 }}>Liquid Staking</span><span style={{ fontSize: 18, fontWeight: 700, color: 'var(--mint)' }}>{liquidAPY.toFixed(1)}%</span></div>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>Lido (stETH), Rocket Pool (rETH)</p><p style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>Medium risk: smart contract</p>
        </div>
        <div onClick={() => setStakingType('restaking')} style={{ padding: 16, borderRadius: 12, border: stakingType === 'restaking' ? '2px solid var(--violet)' : '1px solid var(--border)', background: stakingType === 'restaking' ? 'var(--violet-dim)' : 'var(--surface2)', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontWeight: 500 }}>Restaking</span><span style={{ fontSize: 18, fontWeight: 700, color: 'var(--mint)' }}>{restakingAPY.toFixed(1)}%</span></div>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>EigenLayer + LSTs. +{restakingBonus}% bonus.</p><p style={{ fontSize: 12, color: 'var(--coral)', marginTop: 4 }}>Higher risk: AVS slashing</p>
        </div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#staking-params</div>
      <div className="card"><div className="card-title">Parameters</div><div className="g4"><Input label="Base APY (%)" value={baseStakingAPY} onChange={setBaseStakingAPY} step={0.1} /><Input label="Restaking Bonus (%)" value={restakingBonus} onChange={setRestakingBonus} step={0.1} /><Input label="% ETH Staked" value={stakingRatio} onChange={setStakingRatio} max={100} /><Input label="Slashing Risk (%/yr)" value={slashingRisk} onChange={setSlashingRisk} step={0.1} /></div></div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#staking-output</div>
      <div className="g4">
        <Card label="Effective APY" value={`${calc.effectiveAPY.toFixed(2)}%`} sub="Net annual yield" color="green" updateSource="PR" />
        <Card label="Staked ETH" value={`${(calc.stakedETH / 1e6).toFixed(2)}M`} sub={`${stakingRatio}% of holdings`} color="blue" updateSource="PR" />
        <Card label="Annual Yield" value={`${Math.round(calc.annualYieldETH).toLocaleString()} ETH`} sub="Before slashing" color="yellow" updateSource="PR" />
        <Card label="Yield Value" value={`$${(calc.annualYieldUSD / 1e6).toFixed(1)}M`} sub="At current price" color="purple" updateSource={['PR', 'MARKET']} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#staking-projections</div>
      <div className="card"><div className="card-title">Yield Projections (Compounding)</div>
        <table className="tbl"><thead><tr><th>Year</th><th className="r">Yield ETH</th><th className="r">Total ETH</th><th className="r">NAV/Share</th></tr></thead>
        <tbody>{projections.map(p => (<tr key={p.year}><td>{p.year}Y</td><td className="r mint">+{Math.round(p.yieldETH).toLocaleString()}</td><td className="r">{(p.totalETH / 1e6).toFixed(2)}M</td><td className="r" style={{ fontWeight: 500 }}>${p.nav.toFixed(2)}</td></tr>))}</tbody></table>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Staking & Yield" items={[
        { term: 'CESR (Composite ETH Staking Rate)', def: 'Industry benchmark staking yield (~2.81%), administered by Quatrefoil. Like SOFR for ETH staking. BMNR uses this as reference rate for staking income projections.' },
        { term: 'Staking Income vs ETH Appreciation', def: 'Two return sources: (1) Staking yield — predictable ~3% APY income stream; (2) ETH price — volatile capital gains. Staking provides income floor even if ETH is flat.' },
        { term: 'MAVAN (Made in America Validator Network)', def: 'BMNR\'s proprietary staking infrastructure (Q1 2026). Eliminates third-party fees, improves margins. At 100% staking: $374M/yr income at current holdings.' },
        { term: 'Slashing Risk', def: 'Validators lose staked ETH if they misbehave (double-signing, downtime). Solo staking has higher risk; liquid staking spreads risk across many validators. BMNR uses 3 providers to diversify.' },
        { term: 'Validator Economics', def: '32 ETH minimum per validator. Rewards from: block proposals, attestations, sync committees, MEV tips. Larger operators get more consistent returns (law of large numbers).' },
        { term: 'Liquid Staking Tokens (LSTs)', def: 'stETH (Lido), rETH (Rocket Pool) — tokens representing staked ETH. Trade freely while underlying ETH earns yield. ~10% protocol fee. Smart contract risk.' },
        { term: 'Restaking (EigenLayer)', def: 'Re-use staked ETH to secure other protocols (AVS). Bonus yield but compounds slashing risk. BMNR currently not restaking — conservative approach.' },
        { term: 'Yield on Cost vs Current Yield', def: 'Yield on cost = income ÷ purchase price. If you bought at $1,500/ETH and earn 3%, your yield on cost rises as ETH appreciates. Current yield = income ÷ current price.' },
        { term: 'Compounding Effect', def: `${calc.effectiveAPY.toFixed(1)}% APY over 5 years = ${((Math.pow(1 + calc.effectiveAPY/100, 5) - 1) * 100).toFixed(1)}% cumulative NAV growth from staking alone, even if ETH price is flat.` },
      ]} />
    </div>
  );
};

// DILUTION TAB with Multi-Tranche
const DilutionTab = ({ calc, currentETH, currentShares, ethPrice, currentStockPrice, tranches, setTranches, dilutionPercent, setDilutionPercent, saleDiscount, setSaleDiscount, navMultiple, setNavMultiple, maxAuthorizedShares, slashingRisk, liquidityDiscount, regulatoryRisk }) => {
  const singleTranche = useMemo(() => {
    const available = maxAuthorizedShares - currentShares;
    const newShares = (available * dilutionPercent) / 100;
    const salePrice = currentStockPrice * (1 - saleDiscount / 100);
    const proceeds = newShares * 1e6 * salePrice;
    const ethBought = proceeds / ethPrice;
    const totalETH = (currentETH + ethBought) * (1 - slashingRisk / 100);
    const totalShares = currentShares + newShares;
    const newNAV = (totalETH * ethPrice) / (totalShares * 1e6) * (1 - liquidityDiscount / 100) * (1 - regulatoryRisk / 100);
    return { newShares, proceeds, ethBought, newNAV, navChange: ((newNAV - calc.currentNAV) / calc.currentNAV) * 100 };
  }, [currentETH, currentShares, ethPrice, currentStockPrice, dilutionPercent, saleDiscount, maxAuthorizedShares, slashingRisk, liquidityDiscount, regulatoryRisk, calc.currentNAV]);

  const multiTranche = useMemo(() => {
    let eth = currentETH, shares = currentShares;
    const results = tranches.filter(t => t.enabled).sort((a, b) => a.year - b.year).map(t => {
      const navBefore = (eth * t.ethPrice) / (shares * 1e6);
      const salePrice = navBefore * navMultiple * (1 - saleDiscount / 100);
      const proceeds = t.sharesM * 1e6 * salePrice;
      const ethBought = proceeds / t.ethPrice;
      eth += ethBought; shares += t.sharesM;
      const navAfter = (eth * t.ethPrice) / (shares * 1e6);
      return { ...t, navBefore, navAfter, accretion: ((navAfter - navBefore) / navBefore) * 100 };
    });
    const finalNAV = results.length > 0 ? results[results.length - 1].navAfter : calc.currentNAV;
    return { results, totalAccretion: ((finalNAV - calc.currentNAV) / calc.currentNAV) * 100 };
  }, [tranches, currentETH, currentShares, navMultiple, saleDiscount, calc.currentNAV]);

  const updateTranche = (id, field, value) => setTranches(tranches.map(t => t.id === id ? { ...t, [field]: value } : t));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dilution-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Dilution<UpdateIndicators sources="SEC" /></h2>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dilution-intro</div>
      <div className="highlight"><h3>Equity Dilution Analysis</h3>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>Model the impact of share issuance on NAV per share. Accretive when issued above NAV; dilutive when below.</p>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#single-tranche</div>
      <div className="card"><div className="card-title">Single Tranche</div>
        <div className="g4"><Input label="Dilution %" value={dilutionPercent} onChange={setDilutionPercent} max={100} /><Input label="Sale Discount %" value={saleDiscount} onChange={setSaleDiscount} max={50} /><Input label="NAV Multiple" value={navMultiple} onChange={setNavMultiple} step={0.1} /><div style={{ fontSize: 14 }}><div style={{ color: 'var(--text3)' }}>Available</div><div style={{ fontWeight: 500 }}>{(maxAuthorizedShares - currentShares).toLocaleString()}M</div></div></div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dilution-output</div>
        <div className="g4">
          <Card label="New Shares" value={`${singleTranche.newShares.toFixed(0)}M`} sub="Issued" color="blue" />
          <Card label="Proceeds" value={`$${(singleTranche.proceeds / 1e9).toFixed(2)}B`} sub="Raised" color="green" />
          <Card label="ETH Bought" value={`${(singleTranche.ethBought / 1e6).toFixed(2)}M`} sub="Purchased" color="yellow" />
          <Card label="NAV Change" value={`${singleTranche.navChange >= 0 ? '+' : ''}${singleTranche.navChange.toFixed(1)}%`} sub={singleTranche.navChange >= 0 ? 'Accretive ✓' : 'Dilutive ✗'} color={singleTranche.navChange >= 0 ? 'green' : 'red'} />
        </div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#multi-tranche</div>
      <div className="card"><div className="card-title">Multi-Tranche Schedule</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{tranches.map(t => (
          <div key={t.id} style={{ padding: 12, borderRadius: 8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, background: t.enabled ? 'var(--surface2)' : 'var(--surface)', opacity: t.enabled ? 1 : 0.6 }}>
            <input type="checkbox" checked={t.enabled} onChange={e => updateTranche(t.id, 'enabled', e.target.checked)} style={{ width: 16, height: 16 }} />
            <div className="g4" style={{ flex: 1 }}>
              <Input label="Year" value={t.year} onChange={v => updateTranche(t.id, 'year', v)} step={0.5} />
              <Input label="Shares (M)" value={t.sharesM} onChange={v => updateTranche(t.id, 'sharesM', v)} />
              <Input label="ETH Price ($)" value={t.ethPrice} onChange={v => updateTranche(t.id, 'ethPrice', v)} />
              {multiTranche.results.find(r => r.id === t.id) && <div style={{ fontSize: 14 }}><div style={{ color: 'var(--text3)' }}>Accretion</div><div style={{ color: multiTranche.results.find(r => r.id === t.id)?.accretion >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{multiTranche.results.find(r => r.id === t.id)?.accretion >= 0 ? '+' : ''}{multiTranche.results.find(r => r.id === t.id)?.accretion.toFixed(1)}%</div></div>}
            </div>
          </div>
        ))}</div>
        <div style={{ borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text3)' }}>Active: {tranches.filter(t => t.enabled).length}</span><div style={{ textAlign: 'right' }}><div style={{ color: 'var(--text3)', fontSize: 14 }}>Cumulative</div><div style={{ fontSize: 20, fontWeight: 700, color: multiTranche.totalAccretion >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{multiTranche.totalAccretion >= 0 ? '+' : ''}{multiTranche.totalAccretion.toFixed(1)}%</div></div></div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Dilution & Accretion" items={[
        { term: 'The Accretion Formula', def: 'If Stock Price > NAV/Share, issuing shares is ACCRETIVE. Example: NAV = $24, Stock = $30. Sell 10M shares at $30 = $300M. Buy $300M/$2,317 = 129.5K ETH. New NAV/share rises because you added more ETH value than share dilution.' },
        { term: 'Break-Even mNAV', def: 'At mNAV = 1.0x (stock = NAV), issuance is neutral. Above 1.0x = accretive. Below 1.0x = dilutive. The higher the premium, the more accretive each dollar raised.' },
        { term: 'ATM (At-The-Market) Offering', def: 'Sell shares gradually into market at prevailing prices. More flexible than fixed offerings. BMNR has $24.5B ATM shelf capacity. Avoids single-day price impact.' },
        { term: 'Premium Capture Math', def: 'At 1.5x mNAV: sell $1 of stock → buy $1 of ETH → but only diluted NAV by $0.67. Net gain = $0.33 per dollar raised. This is the flywheel that built MSTR.' },
        { term: 'Authorized vs Outstanding', def: 'Authorized shares = maximum allowed by charter (now 50B after 81% YES vote). Outstanding = actually issued (434M). Difference = capacity for future raises without shareholder approval.' },
        { term: 'ETH/Share Tracking', def: 'The key metric: Total ETH ÷ Total Shares. Accretive actions increase this; dilutive decrease it. Even if ETH price falls, rising ETH/share means you own more of the asset.' },
        { term: 'Risk Adjustments', def: `Slashing (${slashingRisk}%) reduces ETH holdings. Liquidity discount (${liquidityDiscount}%) for staked ETH illiquidity. Regulatory (${regulatoryRisk}%) for legal uncertainty.` },
        { term: 'Death Spiral Risk', def: 'If stock falls below NAV and company must raise capital, forced dilutive issuance → lower NAV → lower stock → more dilution. Avoided by maintaining cash buffer and buyback authorization.' },
      ]} />
    </div>
  );
};

// DEBT TAB
const DebtTab = ({ calc, currentETH, ethPrice, currentStockPrice, useDebt, setUseDebt, debtAmount, setDebtAmount, debtRate, setDebtRate, debtMaturity, setDebtMaturity, conversionPremium, setConversionPremium, debtCovenantLTV, setDebtCovenantLTV }) => {
  const schedule = useMemo(() => !useDebt ? [] : Array.from({ length: debtMaturity }, (_, i) => ({ year: i + 1, interest: debtAmount * 1e6 * (debtRate / 100), principal: i + 1 === debtMaturity ? debtAmount * 1e6 : 0 })).map(s => ({ ...s, total: s.interest + s.principal })), [useDebt, debtAmount, debtRate, debtMaturity]);
  const drawdown = useMemo(() => !useDebt ? [] : [0, -20, -40, -60, -80].map(dd => ({ drawdown: dd, ethPrice: ethPrice * (1 + dd / 100), ltv: (debtAmount * 1e6) / (currentETH * ethPrice * (1 + dd / 100)) * 100, breach: (debtAmount * 1e6) / (currentETH * ethPrice * (1 + dd / 100)) * 100 > debtCovenantLTV })), [useDebt, ethPrice, currentETH, debtAmount, debtCovenantLTV]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#debt-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Debt<UpdateIndicators sources="SEC" /></h2>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#debt-intro</div>
      <div className="highlight"><h3>Leverage & Convertible Debt</h3>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>Model convertible debt financing and analyze LTV covenant risks. Track death spiral trigger prices.</p>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#debt-params</div>
      <div className="card"><div className="card-title">Debt Parameters</div>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" checked={useDebt} onChange={e => setUseDebt(e.target.checked)} style={{ width: 16, height: 16 }} /><span>Enable Convertible Debt</span></label>
        {useDebt && <div className="g5"><Input label="Principal ($M)" value={debtAmount} onChange={setDebtAmount} /><Input label="Coupon (%)" value={debtRate} onChange={setDebtRate} step={0.1} /><Input label="Maturity (Yrs)" value={debtMaturity} onChange={setDebtMaturity} /><Input label="Conv. Premium (%)" value={conversionPremium} onChange={setConversionPremium} /><Input label="LTV Covenant (%)" value={debtCovenantLTV} onChange={setDebtCovenantLTV} /></div>}
      </div>
      {useDebt && (<>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#debt-metrics</div>
        <div className="g4">
          <Card label="Leverage" value={`${(calc.leverageRatio * 100).toFixed(1)}%`} sub="Debt/Mkt Cap" color="blue" />
          <Card label="Current LTV" value={`${(calc.ltv * 100).toFixed(1)}%`} sub={`Covenant: ${debtCovenantLTV}%`} color={calc.ltv * 100 < debtCovenantLTV * 0.8 ? 'green' : calc.ltv * 100 < debtCovenantLTV ? 'yellow' : 'red'} />
          <Card label="Conv. Price" value={`$${calc.conversionPrice.toFixed(2)}`} sub={`+${conversionPremium}%`} color="purple" />
          <Card label="Death Spiral" value={`$${calc.deathSpiralETHPrice.toFixed(0)}`} sub="ETH trigger" color="red" />
        </div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#ltv-drawdown</div>
        <div className="card"><div className="card-title">LTV Under Drawdown</div><div className="g5">{drawdown.map(d => (<div key={d.drawdown} style={{ padding: 12, borderRadius: 8, textAlign: 'center', background: d.breach ? 'var(--coral-dim)' : 'var(--surface2)', border: d.breach ? '1px solid var(--coral)' : '1px solid var(--border)' }}><div style={{ fontSize: 12, color: 'var(--text3)' }}>{d.drawdown === 0 ? 'Current' : `${d.drawdown}%`}</div><div style={{ fontWeight: 500 }}>${d.ethPrice.toFixed(0)}</div><div style={{ fontSize: 18, fontWeight: 700, color: d.breach ? 'var(--coral)' : 'var(--mint)' }}>{d.ltv.toFixed(0)}%</div>{d.breach && <div style={{ fontSize: 12, color: 'var(--coral)' }}>⚠️ BREACH</div>}</div>))}</div></div>
      </>)}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Debt & Leverage" items={[
        { term: 'Convertible Debt Strategy', def: 'Borrow at low rates (2-3%) to buy ETH. If ETH appreciates 15%+, leverage amplifies returns. Bondholders can convert to equity at premium, capping issuer upside but providing downside protection.' },
        { term: 'Loan-to-Value (LTV)', def: 'Debt ÷ ETH Value. If LTV exceeds covenant (e.g., 50%), lender can force liquidation. Critical risk metric for levered crypto treasuries.' },
        { term: 'Death Spiral Risk', def: 'ETH drops → LTV rises → covenant breach → forced selling → price drops more → feedback loop. The "death spiral trigger" is the ETH price where LTV hits covenant.' },
        { term: 'Conversion Price', def: 'Stock Price × (1 + Premium). If stock rises above this, debt converts to equity, eliminating repayment obligation but diluting shareholders.' },
        { term: 'Interest Coverage', def: 'Staking yield must exceed interest expense for positive carry. At current rates, staking income typically covers debt service with margin.' },
      ]} />
    </div>
  );
};

// CAPITAL TAB - Share Class Structure, Shareholders, Offerings, Incentive Plans, Fully Diluted Count
const CapitalTab = ({ currentShares, currentStockPrice }) => {
  const [capitalView, setCapitalView] = useState('structure');

  // Use imported data from @/data/bmnr
  // Update outstanding shares dynamically from currentShares prop
  const shareClasses = SHARE_CLASSES.map(sc =>
    sc.class === 'Common Stock' ? { ...sc, outstanding: currentShares * 1e6 } : sc
  );
  const majorShareholders = MAJOR_SHAREHOLDERS;
  const equityOfferings = EQUITY_OFFERINGS;
  const warrants = WARRANTS;

  // Fully diluted calculation using current shares
  const fdShares = {
    common: currentShares * 1e6,
    prefunded: WARRANTS.find(w => w.type === 'Pre-Funded')?.shares || 0,
    advisor: WARRANTS.find(w => w.type === 'Advisor')?.shares || 0,
    options: 0,
    rsus: 0,
  };
  const totalFD = Object.values(fdShares).reduce((a, b) => a + b, 0);
  const dilutionPct = ((totalFD / fdShares.common) - 1) * 100;

  const statusColor = (status) => {
    const colors = { active: 'var(--mint)', exhausted: 'var(--gold)', completed: 'var(--sky)', converted: 'var(--text3)' };
    return colors[status] || 'var(--text2)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Capital Structure<UpdateIndicators sources="SEC" /></h2>

      {/* Highlight Box */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-strategy</div>
      <div className="highlight">
        <h3>ETH Treasury Capital Strategy</h3>
        <p className="text-sm">
          BMNR funds ETH accumulation through ATM programs. $24.5B shelf active with $988M cash.
          Pre-funded warrants ($0.0001 strike) represent committed capital. Single-class common stock
          with simple capital structure supports rapid execution.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-metrics</div>
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Key Metrics<UpdateIndicators sources={['SEC', 'MARKET']} /></div>
        <div className="g4">
          <Card label="Shares Outstanding" value={`${currentShares}M`} sub="Common stock" color="violet" updateSource="SEC" />
          <Card label="Fully Diluted" value={`${(totalFD / 1e6).toFixed(1)}M`} sub={`+${dilutionPct.toFixed(1)}% dilution`} color="blue" updateSource="SEC" />
          <Card label="Basic Mkt Cap" value={`$${((currentShares * 1e6 * currentStockPrice) / 1e9).toFixed(2)}B`} sub="Outstanding × Price" color="green" updateSource={['SEC', 'MARKET']} />
          <Card label="FD Mkt Cap" value={`$${((totalFD * currentStockPrice) / 1e9).toFixed(2)}B`} sub="Fully diluted" color="yellow" updateSource={['SEC', 'MARKET']} />
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#capital-navigation</div>
      <div className="g5">
        {[
          { id: 'structure', value: `${shareClasses.length}`, label: 'Share Classes', sub: 'Common + converted preferred' },
          { id: 'shareholders', value: `${majorShareholders.length}`, label: 'Major Holders', sub: 'Bill Miller + institutions' },
          { id: 'offerings', value: `${equityOfferings.length}`, label: 'ATM Programs', sub: '$24.5B shelf active' },
          { id: 'plans', value: `${warrants.length}`, label: 'Warrant Types', sub: 'Pre-funded + advisor' },
          { id: 'dilution', value: `${dilutionPct.toFixed(0)}%`, label: 'Total Dilution', sub: `${(totalFD / 1e6).toFixed(1)}M FD shares` },
        ].map(nav => (
          <div
            key={nav.id}
            onClick={() => setCapitalView(nav.id)}
            className="card"
            style={{
              cursor: 'pointer',
              borderLeft: capitalView === nav.id ? '4px solid var(--violet)' : '4px solid transparent',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 600, color: capitalView === nav.id ? 'var(--violet)' : 'var(--text)' }}>{nav.value}</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{nav.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{nav.sub}</div>
          </div>
        ))}
      </div>

      {/* Share Class Structure View */}
      {capitalView === 'structure' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#share-classes</div>
      <div className="card">
        <div className="card-title">Share Class Structure</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Class</th>
              <th className="r">Authorized</th>
              <th className="r">Outstanding</th>
              <th>Voting</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shareClasses.map((sc, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{sc.class}</td>
                <td className="r">{(sc.authorized / 1e6).toFixed(0)}M</td>
                <td className="r violet">{(sc.outstanding / 1e6).toFixed(1)}M</td>
                <td style={{ color: 'var(--text2)', fontSize: 13 }}>{sc.voting}</td>
                <td><span style={{ color: statusColor(sc.status) }}>{sc.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          Par value: $0.0001. Preferred shares converted to common. NYSE American: BMNR.
        </div>
      </div>
      </>
      )}

      {/* Major Shareholders View */}
      {capitalView === 'shareholders' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#major-shareholders</div>
      <div className="card">
        <div className="card-title">Major Shareholders</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Shareholder</th>
              <th className="r">Shares (M)</th>
              <th className="r">%</th>
              <th>Type</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {majorShareholders.map((sh, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{sh.name}</td>
                <td className="r">{sh.shares ? (sh.shares / 1e6).toFixed(2) : '—'}</td>
                <td className="r violet">{sh.percent ? `${sh.percent.toFixed(2)}%` : '—'}</td>
                <td style={{ color: 'var(--text2)' }}>{sh.type}</td>
                <td><span style={{ color: 'var(--gold)' }}>{sh.source}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          Update from 13F (institutional) and DEF 14A (insiders) when available.
        </div>
      </div>
      </>
      )}

      {/* Offerings View */}
      {capitalView === 'offerings' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#equity-offerings</div>
      <div className="card">
        <div className="card-title">Equity Offerings</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th className="r">Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {equityOfferings.map((off, i) => (
              <tr key={i}>
                <td>{off.date}</td>
                <td style={{ fontWeight: 600 }}>{off.type}</td>
                <td className="r mint">${off.amount}B</td>
                <td><span style={{ color: statusColor(off.status) }}>{off.status}</span></td>
              </tr>
            ))}
            <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
              <td colSpan={2}>Total Shelf Capacity</td>
              <td className="r mint">$31.4B</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ }}>
        <div className="card-title">Warrants Outstanding</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Type</th>
              <th className="r">Shares</th>
              <th className="r">Strike</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {warrants.map((w, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{w.type}</td>
                <td className="r">{(w.shares / 1e6).toFixed(2)}M</td>
                <td className="r violet">${w.strike < 1 ? w.strike.toFixed(4) : w.strike.toFixed(2)}</td>
                <td style={{ color: 'var(--text2)' }}>{w.source}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
              <td>Total</td>
              <td className="r">{((warrants[0].shares + warrants[1].shares) / 1e6).toFixed(2)}M</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
      </>
      )}

      {/* Plans View */}
      {capitalView === 'plans' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#equity-plans</div>
      <div className="card">
        <div className="card-title">Equity Incentive Plans</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Plan</th>
              <th className="r">Reserved</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024 Equity Incentive Plan</td>
              <td className="r"><span style={{ color: 'var(--gold)' }}>TBD</span></td>
              <td><span style={{ color: 'var(--gold)' }}>Pending 10-K</span></td>
            </tr>
            <tr>
              <td>Employee Stock Purchase Plan</td>
              <td className="r"><span style={{ color: 'var(--gold)' }}>TBD</span></td>
              <td><span style={{ color: 'var(--gold)' }}>Pending 10-K</span></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          Data pending from 10-K or DEF 14A proxy filing.
        </div>
      </div>
      </>
      )}

      {/* Dilution View */}
      {capitalView === 'dilution' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#dilution-analysis</div>
      <div className="card">
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
              <td>Common Outstanding</td>
              <td className="r">{(fdShares.common / 1e6).toFixed(1)}</td>
              <td className="r">{((fdShares.common / totalFD) * 100).toFixed(1)}%</td>
            </tr>
            <tr>
              <td>Pre-Funded Warrants</td>
              <td className="r">{(fdShares.prefunded / 1e6).toFixed(1)}</td>
              <td className="r">{((fdShares.prefunded / totalFD) * 100).toFixed(1)}%</td>
            </tr>
            <tr>
              <td>Advisor Warrants</td>
              <td className="r">{(fdShares.advisor / 1e6).toFixed(1)}</td>
              <td className="r">{((fdShares.advisor / totalFD) * 100).toFixed(1)}%</td>
            </tr>
            <tr>
              <td>Stock Options</td>
              <td className="r"><span style={{ color: 'var(--gold)' }}>TBD</span></td>
              <td className="r">—</td>
            </tr>
            <tr>
              <td>RSUs</td>
              <td className="r"><span style={{ color: 'var(--gold)' }}>TBD</span></td>
              <td className="r">—</td>
            </tr>
            <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
              <td>Fully Diluted Total</td>
              <td className="r violet">{(totalFD / 1e6).toFixed(1)}</td>
              <td className="r">100%</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          Note: Jul 29, 2025 PR reported 121.7M fully diluted. Current calc uses known warrants only.
          Dilution impact: +{dilutionPct.toFixed(1)}% if all securities exercised.
        </div>
      </div>
      </>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Capital Structure" items={[
        { term: 'Share Classes', def: 'Common stock trades on NYSE American. Preferred shares (Series A/B) have been converted. Authorized shares cap total issuance capacity.' },
        { term: 'Fully Diluted Shares', def: 'Includes all potential shares: common + warrants + options + RSUs. Used for calculating true per-share ownership.' },
        { term: 'ATM (At-The-Market) Program', def: 'Allows issuing shares gradually into market at prevailing prices. Less discount than bought deals, but reveals capital needs.' },
        { term: 'Pre-Funded Warrants', def: 'Warrants with nominal exercise price ($0.0001). Essentially committed equity with minor dilution on conversion.' },
        { term: 'Market Cap Impact', def: 'Fully diluted market cap = FD shares × stock price. Represents total equity claim if all securities convert.' },
      ]} />
    </div>
  );
};

// COMPS TAB
const CompsTab = ({ comparables, ethPrice }) => {
  const btcPrice = 100000;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [competitorFilter, setCompetitorFilter] = useState<BMNRCompetitorId | 'all'>('all');
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR PROFILES - Crypto Treasury Competitors
  // Update status and metrics as new information emerges
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_PROFILES: BMNRCompetitorProfile[] = [
    {
      id: 'mstr',
      name: 'Strategy',
      ticker: 'MSTR',
      description: 'Pioneer BTC treasury company (fka MicroStrategy), largest corporate bitcoin holder',
      cryptoType: 'BTC',
      currentStatus: 'Active accumulation via Digital Credit + ATM programs',
      capabilities: { stakingYield: false, treasuryFocus: true, miningOperations: false, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: '713,502 BTC', marketCap: '~$90B', navPremium: '+100%', yieldRate: '0%' }
    },
    {
      id: 'mara',
      name: 'Marathon Digital',
      ticker: 'MARA',
      description: 'Bitcoin miner and treasury holder with significant BTC reserves',
      cryptoType: 'BTC',
      currentStatus: 'Mining + treasury accumulation strategy',
      capabilities: { stakingYield: false, treasuryFocus: true, miningOperations: true, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: '~46K BTC', marketCap: '~$8B', navPremium: '+80%', yieldRate: '0%' }
    },
    {
      id: 'riot',
      name: 'Riot Platforms',
      ticker: 'RIOT',
      description: 'Bitcoin miner and treasury company, expanding infrastructure',
      cryptoType: 'BTC',
      currentStatus: 'Mining operations with treasury accumulation',
      capabilities: { stakingYield: false, treasuryFocus: true, miningOperations: true, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: '~18K BTC', marketCap: '~$4B', navPremium: '+60%', yieldRate: '0%' }
    },
    {
      id: 'coin',
      name: 'Coinbase',
      ticker: 'COIN',
      description: 'Leading crypto exchange with treasury holdings',
      cryptoType: 'Mixed',
      currentStatus: 'Exchange + institutional custody + treasury',
      capabilities: { stakingYield: true, treasuryFocus: false, miningOperations: false, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: 'Mixed crypto', marketCap: '~$70B', navPremium: 'N/A', yieldRate: 'Varies' }
    },
    {
      id: 'clsk',
      name: 'CleanSpark',
      ticker: 'CLSK',
      description: 'Bitcoin miner focused on sustainable energy',
      cryptoType: 'BTC',
      currentStatus: 'Mining with clean energy focus',
      capabilities: { stakingYield: false, treasuryFocus: true, miningOperations: true, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: '~10K BTC', marketCap: '~$4B', navPremium: '+50%', yieldRate: '0%' }
    },
    {
      id: 'hut8',
      name: 'Hut 8 Mining',
      ticker: 'HUT',
      description: 'North American bitcoin miner and treasury holder',
      cryptoType: 'BTC',
      currentStatus: 'Mining + HODL strategy',
      capabilities: { stakingYield: false, treasuryFocus: true, miningOperations: true, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: '~10K BTC', marketCap: '~$2B', navPremium: '+40%', yieldRate: '0%' }
    },
    {
      id: 'ethz',
      name: 'ETHZilla',
      ticker: 'ETHZ',
      description: 'Ethereum treasury company with DeFi yield and RWA tokenization strategy',
      cryptoType: 'ETH',
      currentStatus: 'ETH accumulation + DeFi restaking + RWA tokenization platform',
      capabilities: { stakingYield: true, treasuryFocus: true, miningOperations: false, publicCompany: true, institutionalAccess: true },
      keyMetrics: { holdings: '~102K ETH', marketCap: '~$500M', navPremium: '-13% (mNAV 0.87x)', yieldRate: '3-5%' }
    },
    {
      id: 'kraken',
      name: 'Kraken',
      ticker: 'Private',
      description: 'Major crypto exchange, BMNR institutional investor, expanding into DeFi yield, institutional custody, and tokenized equities',
      cryptoType: 'Mixed',
      currentStatus: 'Exchange + institutional custody + DeFi Earn (ETH/USDC yield) + xStocks tokenized equities',
      capabilities: { stakingYield: true, treasuryFocus: false, miningOperations: false, publicCompany: false, institutionalAccess: true },
      keyMetrics: { holdings: 'Exchange reserves', marketCap: 'Private', navPremium: 'N/A', yieldRate: 'DeFi Earn ~8%' }
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR NEWS - Add new entries at TOP (newest first)
  // NEVER delete old entries - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_NEWS: BMNRCompetitorNewsEntry[] = [
    // ═══════════════════════════════════════════════════════════════════════════
    // ADD NEW COMPETITOR NEWS ENTRIES HERE (newest first)
    // Format:
    // {
    //   date: 'YYYY-MM-DD',
    //   competitor: 'mstr' | 'mara' | 'riot' | 'coin' | 'clsk' | 'hut8' | 'ethz' | 'kraken' | 'other',
    //   category: 'Acquisition' | 'Funding' | 'Yield' | 'Regulatory' | 'Technology' | 'Partnership' | 'Financial' | 'Strategy',
    //   headline: 'Brief headline',
    //   details: ['Bullet point 1', 'Bullet point 2'],
    //   implication: 'positive' | 'neutral' | 'negative',  // for BMNR
    //   bmnrComparison: 'How this compares to BMNR',
    //   source: 'Source name',
    //   sourceUrl: 'https://...'
    // },
    // ═══════════════════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - INSTITUTIONAL BESPOKE INVESTMENT SOLUTION (Feb 5, 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-02-05',
      competitor: 'kraken',
      category: 'Strategy',
      headline: 'Kraken Institutional announces first bespoke investment solution with Bitwise Asset Management',
      details: [
        'Bitwise Custom Yield Strategy available to eligible institutional clients',
        'Delivered by Bitwise as external strategy manager within Kraken\'s qualified custody, execution and risk framework',
        'First of multiple managed strategies planned — building infrastructure for diverse crypto opportunities',
        'All strategies undergo structured internal review and remain subject to ongoing oversight',
        'Minimal lock-up periods to support flexible liquidity management',
      ],
      implication: 'positive',
      bmnrComparison: 'Kraken expanding institutional crypto investment products validates demand for managed crypto yield strategies. BMNR\'s ETH staking yield (3-5%) could appeal to the same institutional audience seeking crypto-native returns. Kraken is also a BMNR institutional investor.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
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
        'Independent third-party accountancy firm attestation — publishes quarterly',
        'Accounts for total client liabilities including margin, futures, and staked positions',
        'Pioneered PoR in 2014 — longest-running transparency program among major exchanges',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken\'s PoR covering ETH validates institutional-grade custody for ETH holdings. As BMNR grows its ETH treasury, exchange PoR transparency reinforces trust in the broader ETH custody ecosystem that BMNR depends on.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
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
        'Grid Pass digital collectible program and Presenting Partner of global Fan Zones',
        'Part of Williams\' portfolio of major brand renewals (Duracell, Gulf Oil, VAST Data)',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken\'s mainstream marketing increases crypto adoption broadly. As a BMNR institutional investor, Kraken\'s growing brand and user base could translate to increased awareness and demand for ETH treasury investment vehicles like BMNR.',
      source: 'Kraken Blog',
      storyId: 'kraken-expansion',
      storyTitle: 'Kraken Global Expansion',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - DEFI EARN WITH USDC/ETH YIELD (Jan 26, 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-26',
      competitor: 'kraken',
      category: 'Yield',
      headline: 'Kraken launches DeFi Earn with up to 8% APY via audited Veda vaults on Ethereum',
      details: [
        'Earn up to 8% APY on cash and stablecoins via audited Veda vaults supplying liquidity to Ethereum-based onchain lending',
        'Three risk-managed vault options: Balanced Yield (Chaos Labs), Boosted Yield (Chaos Labs), Advanced Strategies (Sentora)',
        'Available in 48 US states (excl. NY, ME), Canada, and European Economic Area',
        'Withdrawals typically instant with minimal lock-up periods',
        'Converts user deposits to USDC, then deploys to DeFi lending protocols — increases Ethereum DeFi TVL',
      ],
      implication: 'positive',
      bmnrComparison: 'Kraken\'s DeFi Earn validates institutional demand for Ethereum-based yield. Deploys capital to Ethereum lending protocols, growing DeFi TVL and demand for ETH. BMNR\'s 3-5% ETH staking yield is a complementary but different yield strategy — staking secures the network vs lending generates borrower interest.',
      source: 'Kraken Blog',
      storyId: 'kraken-defi',
      storyTitle: 'Kraken DeFi & Yield Products',
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
        'Follows successful 2025 memecoin showdown with Williams F1 (Pengu in Singapore)',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken\'s sports marketing drives retail crypto engagement and platform growth. While memecoin activity doesn\'t directly impact BMNR, growing Kraken\'s user base as a BMNR institutional investor increases potential distribution channel for ETH treasury products.',
      source: 'Kraken Blog',
      storyId: 'kraken-expansion',
      storyTitle: 'Kraken Global Expansion',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - CRYPTO 2026 OUTLOOK (Jan 15, 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-15',
      competitor: 'kraken',
      category: 'Strategy',
      headline: 'Kraken economist outlines 2026 outlook: compressed BTC volatility, stablecoins at ATH, RWA tokenization 3x growth',
      details: [
        'Bitcoin ETFs and Strategy (MSTR) collectively represented ~$44B net spot demand in 2025, yet price disappointed — supply from long-term holders offsetting',
        'Bitcoin Coin Days Destroyed reached highest level on record in Q4 2025 — meaningful turnover from legacy HODLers',
        'BTC dominance averaged above 60% in 2025, no sustained breakdown toward sub-50% — typical late-cycle excess not yet seen',
        'Stablecoin liquidity at all-time highs, systemic risk indicators contained',
        'Tokenization of RWAs grew from ~$5.6B to ~$19B in single year — expanding beyond Treasuries into commodities, private credit, equities',
        'DeFi tokenomics evolving: Uniswap-style fee sharing could reprice governance tokens toward durable valuation frameworks',
        'CLARITY Act could provide framework for digital commodities, accelerating US as crypto capital of the world',
      ],
      implication: 'positive',
      bmnrComparison: 'Kraken\'s research directly relevant to BMNR thesis: (1) BTC dominance >60% without alt rotation suggests ETH catch-up potential, (2) DeFi tokenomics maturation (fee sharing) validates ETH staking yield thesis, (3) RWA tokenization 3x growth benefits Ethereum as primary settlement layer, (4) stablecoin ATH supports Ethereum DeFi ecosystem where BMNR\'s staked ETH operates.',
      source: 'Kraken Blog',
      storyId: 'kraken-research',
      storyTitle: 'Kraken Market Research',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - ETHENA USDE CUSTODY (Jan 6, 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-06',
      competitor: 'kraken',
      category: 'Partnership',
      headline: 'Kraken selected as custody partner for Ethena\'s USDe synthetic dollar stablecoin',
      details: [
        'Approved by Ethena Risk Committee for custody of USDe backing assets',
        'Assets in fully segregated, bankruptcy-remote, cold-storage vaults operated by US state-chartered bank',
        'Monthly custodian attestations and weekly Proof of Reserves for USDe',
        'USDe uses delta-neutral derivatives strategy — shorts ETH perpetuals against ETH collateral to create synthetic dollar',
        'Kraken Custody uses HSM + MPC security architecture with in-house security teams',
      ],
      implication: 'neutral',
      bmnrComparison: 'USDe\'s model shorts ETH perpetuals, creating selling pressure that could suppress ETH prices — net negative for BMNR\'s ETH treasury value. However, Ethena also holds significant ETH collateral, and the growing USDe ecosystem increases demand for ETH derivatives liquidity. Kraken as custody partner signals institutional-grade ETH infrastructure maturation.',
      source: 'Kraken Blog',
      storyId: 'kraken-defi',
      storyTitle: 'Kraken DeFi & Yield Products',
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
        'Expanded across France, Ireland, Germany, Netherlands, Poland, Spain',
        'Built local teams and launched new products for European markets',
        'Positions Kraken as regulated crypto partner across the EU',
      ],
      implication: 'positive',
      bmnrComparison: 'Kraken\'s EU regulatory compliance expands the pool of regulated investors who can access crypto treasury products. As MiCA provides clarity for digital asset investment, European institutional capital could flow into ETH treasury vehicles like BMNR. Kraken\'s EU presence as a BMNR investor creates distribution optionality.',
      source: 'Kraken Blog',
      storyId: 'kraken-expansion',
      storyTitle: 'Kraken Global Expansion',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - XSTOCKS ON TON BLOCKCHAIN (Dec 18, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-18',
      competitor: 'kraken',
      category: 'Technology',
      headline: 'Kraken\'s xStocks tokenized equities launch on TON blockchain — $180M+ onchain, multichain expansion',
      details: [
        'Fully collateralized tokenized stocks and ETFs on TON blockchain via Telegram\'s ~100M wallet users',
        'Over $180M in tokenized assets onchain with ~50K unique wallet addresses',
        'Multichain: available on Solana, Ethereum, and now TON (Mantle and TRON underway)',
        'Kraken announced acquisition of Backed Finance to unify xStocks issuance, trading, and settlement',
        'Co-CEO Arjun Sethi: "financial assets as neutral, composable building blocks on open networks"',
      ],
      implication: 'neutral',
      bmnrComparison: 'Tokenized equities represent an alternative onchain investment vehicle competing for the same institutional capital as crypto treasury companies. However, xStocks on Ethereum increases Ethereum ecosystem utility and transaction demand. If tokenized assets settle in ETH or require ETH gas, this is net positive for ETH value.',
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
      headline: 'Kraken deepens Alpaca partnership as preferred venue for xStocks — surpasses $10B combined volume',
      details: [
        'Alpaca becomes preferred venue for sourcing and custodying underlying equities backing xStocks 1:1',
        'xStocks surpassed $10B in combined transaction volume since June 2025 launch',
        'Real-time mint and redeem via Alpaca\'s Instant Tokenization Network (ITN)',
        'Plans to expand beyond equities to broader suite of tokenized securities and real-world assets',
      ],
      implication: 'neutral',
      bmnrComparison: 'xStocks\' $10B+ volume shows growing demand for tokenized financial assets. As RWA tokenization scales on Ethereum, it increases the blockchain\'s utility as settlement infrastructure — supportive of ETH value and the ETH treasury thesis underlying BMNR.',
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
      headline: 'Kraken optimizes maker fee incentives, graduates 6 high-volume trading pairs with $50M+ monthly volume',
      details: [
        '6 trading pairs moved to regular maker fee schedule after achieving self-sustaining liquidity',
        'Graduated pairs demonstrated $50M+ 30-day volume with $100K+ market depth',
        'Maker rebates continue on 425+ other trading pairs for liquidity support',
        'Indicates growing platform maturity and organic trading activity across crypto markets',
      ],
      implication: 'neutral',
      bmnrComparison: 'Deep exchange liquidity across 425+ pairs supports healthy ETH price discovery and trading. As a BMNR investor, Kraken\'s growing liquidity infrastructure creates a more efficient market for ETH, reducing slippage and improving execution for large ETH treasury transactions.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
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
        'App Render Complete and Navigation Total Blocking Time as primary mobile performance metrics',
        'Automated benchmarks for every merge using Maestro end-to-end testing framework',
        'Network traffic recording and replay to isolate mobile code changes from backend variability',
        'Moving average alerting: fires when metric regresses >10% for 2+ consecutive runs',
        'React Native New Architecture adoption for baseline performance improvement',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken investing in mobile performance engineering signals platform maturation and focus on user experience. Improved app reliability and speed lowers barriers for retail and institutional users to trade crypto, supporting broader ETH market liquidity.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - USDG MARGIN COLLATERAL (Dec 10, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-10',
      competitor: 'kraken',
      category: 'Financial',
      headline: 'Kraken adds Global Dollar (USDG) as margin and futures collateral currency with 1% haircut',
      details: [
        'USDG (Global Dollar) added to margin and futures collateral lineup — now 50+ options',
        '1% haircut — same tier as other major stablecoins',
        'Collateral currencies allow margin trading without selling underlying assets',
        'Both unstaked and Kraken Rewards assets eligible as margin collateral',
      ],
      implication: 'neutral',
      bmnrComparison: 'More stablecoin collateral options on Kraken deepens margin trading liquidity. Improved margin infrastructure supports ETH derivatives trading and hedging — beneficial for BMNR as deeper ETH markets improve price discovery.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - USDT0 ON PLASMA (Dec 10, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-10',
      competitor: 'kraken',
      category: 'Technology',
      headline: 'Kraken supports USDT0 deposits and withdrawals on Plasma stablecoin-optimized blockchain',
      details: [
        'USDT0 funding via Plasma network now live on Kraken',
        'USDT0 is unified liquidity network for USDT — simplifies cross-chain movement',
        'Plasma is blockchain purpose-built for high-volume, low-cost stablecoin activity',
        'Serves as core settlement layer for instant digital dollar payments',
      ],
      implication: 'neutral',
      bmnrComparison: 'Stablecoin infrastructure expansion (USDT0 on Plasma) grows the broader crypto ecosystem. More efficient stablecoin rails support trading and DeFi activity that ultimately drives ETH demand for gas and settlement.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
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
        'Hybrid fiber/wireless routes reduce latency further for Tokyo-based exchanges',
        'Supports cross-venue arbitrage, hedging, and multi-venue liquidity aggregation',
        '99.9% uptime with dedicated 24/7 support',
      ],
      implication: 'neutral',
      bmnrComparison: 'Ultra-low-latency connectivity attracts institutional and HFT traders to Kraken, deepening ETH market liquidity. As a BMNR institutional investor, Kraken\'s growing institutional infrastructure strengthens the ETH trading ecosystem that supports BMNR\'s treasury valuation.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - COLOMBIA EXPANSION (Dec 4, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-04',
      competitor: 'kraken',
      category: 'Partnership',
      headline: 'Kraken expands in Colombia with local COP payment rails and auto-conversion to USD',
      details: [
        'Colombian clients can deposit COP directly through domestic payment methods',
        'Deposits automatically converted to USD at competitive exchange rates',
        'Access to 500+ digital assets and global liquidity',
        'Part of broader Latin America strategy including Argentina, Mexico, and Colombia',
        'Colombia described as one of most dynamic crypto markets in Latin America',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken\'s geographic expansion into Colombia adds new users to the crypto ecosystem. Growing Kraken\'s user base as a BMNR institutional investor increases platform scale and potential demand for ETH-based products.',
      source: 'Kraken Blog',
      storyId: 'kraken-expansion',
      storyTitle: 'Kraken Global Expansion',
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
        'Kraken Embed white-label solutions for banks and fintechs to offer crypto trading',
        'Plans for Eurex-listed derivatives on Kraken (subject to regulatory approval)',
        'Integration of xStocks within 360X tokenized asset ecosystem',
        'Clearstream and Crypto Finance for institutional custody',
        'Two-way U.S./European institutional market gateway',
      ],
      implication: 'positive',
      bmnrComparison: 'Deutsche Börse partnership is a landmark TradFi-crypto bridge. Eurex derivatives on Kraken could eventually include ETH products, improving institutional ETH access. Clearstream custody integration validates institutional-grade ETH custody demand. Major positive for ETH ecosystem institutional adoption.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - XSTOCKS 24/7 TRADING (Dec 3, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-03',
      competitor: 'kraken',
      category: 'Technology',
      headline: 'Kraken Pro enables 24/7 trading for top 10 xStocks tokenized equities including MSTRx',
      details: [
        'Full 24/7 coverage for TSLAx, QQQx, SPYx, NVDAx, CRCLx, AAPLx, HOODx, MSTRx, GLDx, GOOGLx',
        'Previously 24/5 — now includes weekends and public holidays',
        'On-chain 24/7 settlement combined with Kraken Pro institutional-grade execution',
        'Phase one of broader rollout to additional tokenized stocks and ETFs',
      ],
      implication: 'neutral',
      bmnrComparison: 'MSTRx (tokenized MicroStrategy) being among top 10 xStocks shows demand for crypto treasury exposure via tokenized equities. If/when BMNR gets tokenized as an xStock, it would provide 24/7 global access to ETH treasury exposure. xStocks on Ethereum drives chain utility.',
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
        'xStocks surpassed $10B combined exchange and onchain volume within 6 months',
        'Acquisition unifies issuance, trading, and settlement under Kraken',
        'xStocks live on Solana and Ethereum — TON, Tron, Mantle, BNB Chain integrations coming',
        'Plans to integrate xStocks into Krak money app for hold-and-spend',
        'Over 60 tokenized equities and ETFs backed 1:1 by underlying asset',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken vertically integrating tokenized equities strengthens their position as crypto infrastructure provider. xStocks on Ethereum increases Ethereum settlement demand and chain utility. Potential future tokenization of BMNR shares as an xStock could unlock 24/7 global access.',
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
        'Transparent, time-bound, rule-based structure',
        'Designed to attract and retain most active trading participants and improve market liquidity',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken incentivizing high-volume market makers deepens ETH trading liquidity on the platform. Better market-making reduces spreads and improves price discovery for ETH, supporting the efficiency of BMNR\'s ETH treasury valuation.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - EURC MARGIN COLLATERAL (Nov 24, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-11-24',
      competitor: 'kraken',
      category: 'Financial',
      headline: 'Kraken adds EURC (Circle\'s Euro stablecoin) as margin and futures collateral with 1% haircut',
      details: [
        'EURC added to margin collateral lineup — now 54 options total',
        '1% haircut — same tier as USDC, USDT, and other major stablecoins',
        'Enables Euro-denominated margin trading without selling EURC holdings',
        'Supports hedging, short selling, and leveraged strategies using EURC collateral',
      ],
      implication: 'neutral',
      bmnrComparison: 'More stablecoin collateral options on Kraken broadens the margin trading ecosystem. Additional collateral currencies support more complex ETH derivatives strategies, contributing to overall ETH market depth and efficiency.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - RAMP API LAUNCH (Nov 20, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-11-20',
      competitor: 'kraken',
      category: 'Technology',
      headline: 'Kraken launches Ramp: developer-friendly API for fiat-to-crypto on/off-ramps across 400+ assets',
      details: [
        'Single API + SDK for any platform to integrate buy/sell crypto flows',
        '24+ payment methods: cards, ACH, PIX, SEPA, Apple Pay, Google Pay and more',
        '400+ assets across 100+ blockchains supported',
        'Targets fintechs, banks, wallets, protocols, exchanges, GameFi, and developers',
        'Kraken manages compliance, licensing, fraud prevention, and payment operations',
      ],
      implication: 'positive',
      bmnrComparison: 'Kraken Ramp as B2B infrastructure lowers barriers for new platforms to offer crypto. More fiat on-ramps across 400+ assets expands the addressable market for ETH purchases. Every new Ramp integration is a potential new distribution channel for ETH exposure, supporting BMNR\'s ETH treasury value.',
      source: 'Kraken Blog',
      storyId: 'kraken-expansion',
      storyTitle: 'Kraken Global Expansion',
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
        'Unified architecture with Kraken Financial in the U.S.',
        'Serves institutional clients: fiduciaries, funds, and corporate treasuries across EEA',
      ],
      implication: 'positive',
      bmnrComparison: 'MiCA-regulated custody in the EEA creates institutional-grade infrastructure for European institutions to hold ETH. Regulated custody is a prerequisite for institutional ETH allocation — directly supports the thesis that institutional capital will flow into ETH treasury vehicles like BMNR.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KRAKEN - XSTOCKS $10B VOLUME (Nov 12, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-11-12',
      competitor: 'kraken',
      category: 'Technology',
      headline: 'xStocks surpasses $10B total volume with nearly $2B onchain — 45K+ unique holders in 135 days',
      details: [
        '$10B combined centralized and decentralized exchange volume in 135 days since launch',
        'Nearly $2B in onchain activity across Solana and Ethereum',
        '45,000+ unique onchain holders with $135M+ aggregated AUM',
        'Partners include Alchemy Pay, Bybit, Gate.io, Phantom Wallet, Trust Wallet',
        'Each xStock fully backed 1:1 by underlying equity in bankruptcy-remote structure',
      ],
      implication: 'neutral',
      bmnrComparison: 'xStocks\' $2B onchain volume demonstrates growing demand for Ethereum-based tokenized assets. Ethereum as the settlement layer for tokenized equities increases chain utility and transaction demand — supportive of ETH value and the BMNR treasury thesis.',
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
        'Physical data center access at AT TOKYO CC1/CC2, Equinix TY2/TY3 plus cloud on-ramp',
        '99.99% uptime with automatic rerouting and SLA-backed performance',
        'Targets market makers, quant funds, and HFT firms for cross-venue strategies',
      ],
      implication: 'neutral',
      bmnrComparison: 'Kraken\'s second ultra-low-latency partnership (BSO for Tokyo/London, alongside Avelacom) signals aggressive push for institutional trading infrastructure. Deeper institutional engagement with Kraken strengthens the ETH market ecosystem and validates crypto as institutional asset class.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
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
      bmnrComparison: 'Kraken\'s quarterly PoR covering ETH validates institutional-grade custody transparency. As BMNR grows its ETH treasury, exchange PoR transparency reinforces trust in the broader ETH custody ecosystem that BMNR depends on.',
      source: 'Kraken Blog',
      storyId: 'kraken-institutional',
      storyTitle: 'Kraken Institutional & Exchange',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - $4.7M MANUFACTURED HOME LOAN PORTFOLIO PURCHASE (Feb 5, 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-02-05',
      competitor: 'ethz',
      category: 'Acquisition',
      headline: 'ETHZilla purchases $4.7M manufactured home loan portfolio, plans tokenization on Ethereum L2',
      details: [
        'Acquires portfolio of 95 manufactured/modular home loans from Zippy for ~$4.7M via ETHZilla Modular Mortgage LLC',
        'First-lien mortgages with annualized yield of ~10.36% from seasoned residential credit assets',
        'Plans to tokenize into cash-flow-generating token on Ethereum L2 via Liquidity.io ecosystem in late Feb/early Mar',
        'Follows prior purchase of two CFM56-7B24 aircraft engines on lease, also planned for tokenization',
        'Builds on Dec 2025 acquisition of 15% stake in Zippy — demonstrates repeatable RWA framework'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla moving from strategic investment to actual asset acquisition and tokenization. Multiple asset classes (manufactured homes + aircraft engines) in pipeline. BMNR focuses on pure ETH staking yield vs ETHZilla\'s RWA tokenization revenue model.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - $21M ZIPPY INVESTMENT (Dec 10, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-10',
      competitor: 'ethz',
      category: 'Partnership',
      headline: 'ETHZilla invests $21M in Zippy to tokenize manufactured home loans on Ethereum',
      details: [
        'Acquires 15% fully diluted stake in Zippy for $21.1M ($5M cash + $16.1M stock)',
        'Target: $14B manufactured home financial services market',
        'Zippy: first to introduce modern digital infrastructure and AI-enabled systems to manufactured housing lending',
        '36-month exclusive tokenization agreement via Liquidity.io (FINRA-regulated ATS on Ethereum L2)',
        'ETHZilla ecosystem: Liquidity.io (tokenized private credit), Karus (AI risk forecasting for structured auto credit)'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla expanding into housing finance RWA tokenization with exclusive distribution via FINRA-regulated ATS. BMNR\'s pure ETH staking model is simpler but ETHZilla\'s diversified revenue streams could attract different investor base.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - 20% KARUS ACQUISITION (Dec 3, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-03',
      competitor: 'ethz',
      category: 'Partnership',
      headline: 'ETHZilla acquires 20% of Karus to power AI-modeled auto loan tokenization on Ethereum',
      details: [
        'Acquires 20% fully diluted interest in Karus for $10M ($3M cash + $7M stock)',
        'Karus AI trained on 20M+ historical auto loan outcomes, analyzes 1,000+ variables in real time',
        '$5B+ in auto loan volume already processed through decisioning engine',
        'Access to network of 20,000+ car dealerships, credit unions, and banks',
        'First tokenized portfolios expected early 2026 via Liquidity.io',
        'Entry point into ~$1.6T US asset-backed securities market'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla entering $1.6T ABS market with AI-powered credit analytics. Diversifying beyond pure ETH treasury into RWA revenue generation. BMNR\'s pure staking model has lower execution risk vs ETHZilla\'s complex multi-subsidiary approach.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - SELLS ~$40M ETH FOR BUYBACKS (Oct 27, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-27',
      competitor: 'ethz',
      category: 'Strategy',
      headline: 'ETHZilla sells ~$40M ETH to fund share repurchases below NAV',
      details: [
        'Sells approximately $40M of ETH treasury holdings to fund share repurchases',
        'Repurchased ~600K shares for ~$12M since Oct 24 under $250M buyback program',
        'Plans to continue selling ETH until discount to NAV normalizes',
        'Still holds ~$400M ETH',
        'CEO Rudisill: "repurchases to be immediately accretive"'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla selling ETH = net seller pressure on ETH market. However, demonstrates capital allocation discipline. If NAV discount persists for ETH treasury companies, raises questions about the model — relevant for BMNR\'s own ETH treasury thesis.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - LIQUIDITY.IO PARTNERSHIP + 15% SATSCHEL STAKE (Oct 23, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-23',
      competitor: 'ethz',
      category: 'Partnership',
      headline: 'ETHZilla partners with Liquidity.io for RWA tokenization, takes 15% stake in Satschel',
      details: [
        'Invests $15M ($5M cash + $10M equity) for 15% stake in Satschel with right of first refusal',
        'Liquidity.io is a regulated broker-dealer operating a Digital ATS (FINRA-regulated)',
        'Partnership to accelerate institutional-grade tokenization of RWAs on Ethereum L2',
        'Secures exclusive right to list Ethereum L2 tokens on the exchange',
        'Evolution from pure ETH treasury to active RWA tokenization platform with regulated distribution'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla building regulated RWA distribution channel via FINRA-regulated ATS — competitive moat in tokenization space. BMNR focuses on pure ETH staking; ETHZilla pivoting to "next-generation asset manager" model.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - 1-FOR-10 REVERSE STOCK SPLIT (Oct 15, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-15',
      competitor: 'ethz',
      category: 'Strategy',
      headline: 'ETHZilla announces 1-for-10 reverse stock split',
      details: [
        'Effective Oct 20, 2025 — reduces outstanding shares from ~160M to ~16M',
        'Intended to provide institutional investors access to collateral and margin availability at prices >$10',
        'Not related to exchange listing requirements',
        'Many large mutual funds have minimum stock price thresholds',
        'Signals targeting broader institutional investor base beyond crypto-native capital'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla optimizing share structure for institutional access. Capital structure maturation could increase institutional investor pool for ETH treasury equities broadly, including BMNR.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - BOARD APPOINTMENT: LAZARD VICE CHAIRMAN (Oct 8, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-08',
      competitor: 'ethz',
      category: 'Strategy',
      headline: 'ETHZilla appoints Jason New (Lazard Vice Chairman) to board',
      details: [
        'Jason New, Vice Chairman of Investment Banking at Lazard, joins board',
        '20+ years experience in global credit, PE, and alternative investments',
        'Previously co-founded NovaWulf Management (digital-asset platform)',
        'Was CEO of Onex Credit Partners ($25B alt credit manager)',
        '15 years at Blackstone as Senior MD and Global Co-Head of Distressed/Special Situations at GSO Capital Partners'
      ],
      implication: 'neutral',
      bmnrComparison: 'Traditional finance heavyweights joining ETH treasury company boards validates institutional interest in the model. Increasing board-level credibility for ETH treasury companies could improve investor appetite for sector including BMNR.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - $47M ETH TO PUFFER RESTAKING (Sep 25, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-09-25',
      competitor: 'ethz',
      category: 'Yield',
      headline: 'ETHZilla plans ~$47M ETH deployment to Puffer restaking protocol',
      details: [
        'Plans to deploy ~$47M (~10,600 ETH) to Puffer liquid restaking protocol',
        'Puffer has 2 ETH validator bond framework providing insurance against validator failures',
        'Puffer building vertical crypto infrastructure: LRT, Unifi based rollup, Preconf AVS',
        'Third DeFi protocol deployment by ETHZilla (after EtherFi and unnamed protocol)',
        'Multi-protocol diversification across staking and restaking'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla diversifying DeFi yield across multiple restaking protocols (EtherFi, Puffer, others). Validates institutional restaking thesis. BMNR can learn from ETHZilla\'s multi-protocol approach for its own staking strategy.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - $350M CONVERTIBLE DEBENTURE + mNAV METRIC (Sep 22, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-09-22',
      competitor: 'ethz',
      category: 'Funding',
      headline: 'ETHZilla raises $350M add-on convertible debenture, introduces mNAV metric',
      details: [
        'Raises $350M through new convertible debentures at $3.05/share (1.05x mNAV)',
        'Existing $156.5M convertible amended: 0% interest until Feb 2026, then 2% (down from 4%)',
        'New debentures bear 2% interest',
        'Introduces mNAV metric: EV/ETH NAV = 0.87x',
        'Total position: 102,264 ETH (~$462M), $559M cash',
        'Clear Street as exclusive financial advisor'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETHZilla raising $350M+ validates institutional appetite for ETH-backed securities. mNAV metric creates industry standard for evaluating crypto treasury companies — direct comparison framework for BMNR valuation.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - ETH DEPLOYED TO L2 PROTOCOLS (Sep 15, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-09-15',
      competitor: 'ethz',
      category: 'Yield',
      headline: 'ETHZilla deploys ETH to L2 protocols, earns 1.5M protocol tokens',
      details: [
        'Portfolio: 44,437 ETH unstaked, 12,818 ETH in Protocol 1 staking/restaking, 45,000 ETH in Protocol 2',
        'Earned 1.5M protocol tokens (~$2.2M) — new revenue stream',
        'Minted first EtherFi ETH',
        '102,255 total ETH (~$460M), $228M cash',
        'Repurchased ~6.0M shares in September at avg $2.50',
        'Drew $50M from Cumberland DRW facility',
        'Pivoting toward "DeFi technology company" narrative'
      ],
      implication: 'neutral',
      bmnrComparison: 'First concrete evidence of ETH yield generation by Nasdaq-listed ETH treasury company. Protocol token earnings represent new revenue stream beyond base staking. Validates BMNR\'s thesis that staked ETH generates superior returns vs unstaked BTC holdings.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - CEO CHANGE + CUMBERLAND DRW OTC (Sep 8, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-09-08',
      competitor: 'ethz',
      category: 'Strategy',
      headline: 'ETHZilla CEO change: Rudisill appointed CEO, Cumberland DRW OTC facility',
      details: [
        'McAndrew Rudisill (Chairman) appointed CEO, succeeding Blair Jordan who resigned',
        'Enters OTC transaction with Cumberland DRW for up to $80M collateralized by ETH holdings',
        'Proceeds for share repurchases under $250M program',
        'Repurchased ~2.2M shares at avg $2.50 (1.3% reduction)',
        'Total: 102,246 ETH (~$443M), $213M cash'
      ],
      implication: 'neutral',
      bmnrComparison: 'ETH-collateralized borrowing from Cumberland DRW demonstrates financial engineering sophistication. DRW willing to lend against ETH validates its collateral quality. Model applicable to BMNR for leveraging ETH holdings without selling.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - $100M ETH TO ETHERFI RESTAKING (Sep 2, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-09-02',
      competitor: 'ethz',
      category: 'Yield',
      headline: 'ETHZilla plans $100M ETH deployment to EtherFi for restaking',
      details: [
        'Plans to deploy ~$100M ETH to EtherFi liquid restaking protocol',
        'First DeFi protocol engagement by ETHZilla',
        'EtherFi selected for incremental yield beyond standard staking + reinforcing Ethereum security',
        'Electric Capital managing strategy',
        '102,246 ETH (~$456M), $221M cash',
        'EtherFi CEO: "highlights growing institutional confidence in decentralized protocols"'
      ],
      implication: 'neutral',
      bmnrComparison: 'First Nasdaq-listed ETH treasury company deploying $100M into DeFi restaking. Institutional capital flowing into liquid restaking validates protocol category. Directly validates BMNR\'s own ETH staking thesis.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - $250M STOCK REPURCHASE PROGRAM (Aug 25, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-08-25',
      competitor: 'ethz',
      category: 'Financial',
      headline: 'ETHZilla authorizes $250M stock repurchase program',
      details: [
        'Board authorizes $250M buyback effective immediately, expiring June 30, 2026',
        'Total holdings: 102,237 ETH at avg $3,948.72 (~$489M), $215M cash',
        'Announces Electric Asset Protocol for higher yields',
        'Accumulated from 82.2K to 102.2K ETH over 3 weeks',
        'ATM issued 5.0M shares for $33.7M net proceeds',
        'Dual strategy: accumulate ETH + repurchase shares when trading below NAV'
      ],
      implication: 'neutral',
      bmnrComparison: 'Largest buyback authorization by an ETH treasury company. Dual strategy of ETH accumulation + buybacks signals maturing capital allocation. Proprietary yield protocol could widen gap between passive and active ETH treasury management.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ETHZILLA - LAUNCH: REBRAND + NASDAQ TRADING (Aug 18, 2025)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-08-18',
      competitor: 'ethz',
      category: 'Strategy',
      headline: 'ETHZilla launches: rebrand from 180 Life Sciences, begins trading as ETHZ on Nasdaq',
      details: [
        'Rebrands from 180 Life Sciences Corp. (ATNF), begins trading under ETHZ on Nasdaq',
        'Raised ~$565M gross ($425M PIPE + $156.25M convertible notes)',
        'Accumulated 94,675 ETH at avg $3,902.20 (~$419M), $187M cash',
        '60+ institutional and crypto-native investors: Electric Capital, Polychain Capital, GSR, Borderless Capital',
        'Ethereum ecosystem founders: Sreeram Kannan (EigenLayer), Mike Silagadze (Ether.fi), Danny Ryan (Etherealize), Sam Kazemanian (Frax), Robert Leshner (Compound/Superstate), Tarun Chitra (Gauntlet)',
        'Electric Capital as external asset manager for on-chain yield generation'
      ],
      implication: 'neutral',
      bmnrComparison: 'Major ETH-only treasury competitor launches with $565M capital and ~95K ETH — dwarfs BMNR\'s holdings. Top-tier Ethereum ecosystem backing. Shared strategy increases market awareness of ETH treasury model. Rising tide: institutional interest in ETH treasury equities benefits all players.',
      source: 'ETHZilla Press Release',
      storyId: 'ethzilla-treasury',
      storyTitle: 'ETHZilla (ETHZ)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - Q4 2025 EARNINGS RELEASE (Feb 5, 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-02-05',
      competitor: 'mstr',
      category: 'Financial',
      headline: 'Strategy Q4 2025: 713,502 BTC, $25.3B raised FY2025, largest US equity issuer',
      details: [
        '713,502 BTC as of Feb 1, 2026 — $54.26B cost basis ($76,052 avg), $59.75B market value',
        'Largest US equity issuer in FY2025 — ~8% of total US equity issuance',
        '$25.3B capital raised in FY2025 via ATM and five preferred IPOs (STRK/STRF/STRD/STRC/STRE)',
        'STRC scaled to $3.4B at 11.25% dividend, $413M cumulative distributions (9.6% blended)',
        '$2.25B USD Reserve provides 2.5 years dividend/interest coverage',
        'Q4: $17.4B operating loss (incl $17.4B unrealized digital asset loss), $12.4B net loss',
        'FY2025 BTC Yield: 22.8% (101,873 BTC Gain, $8.9B BTC $ Gain)',
        'ROC tax treatment expected 10+ years — no E&P expected',
        'Software: $123M revenue (+1.9% YoY), Subscription +62.1% YoY'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy raised $25.3B to accumulate BTC yielding 0%. Now pays 9.6-11.25% on $6.9B preferred equity funded by dilution. BMNR\'s ETH staking generates real 3-5% yield.',
      source: 'Strategy Q4 2025 Earnings',
      sourceUrl: 'https://www.strategy.com/investor-relations',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - 8-K BTC HOLDINGS UPDATE (713,502 BTC)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-02-02',
      competitor: 'mstr',
      category: 'Acquisition',
      headline: 'Strategy now holds 713,502 BTC after purchasing 855 BTC',
      details: [
        'Purchased 855 BTC for $75.3M at average price of $87,974',
        'Total holdings now 713,502 BTC at average cost of $76,052',
        'Aggregate purchase price: $54.26B',
        'STRC dividend rate increased from 11.00% to 11.25%',
        'Sold 673,527 MSTR shares for $106.1M net proceeds',
        'No preferred stock sold during the period'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy continues accumulating BTC at 0% yield. BMNR\'s ETH staking generates 3-5% yield, compounding value without requiring continuous capital raises.',
      source: 'Strategy 8-K',
      sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - DIGITAL CREDIT ROC (Return of Capital)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-02-02',
      competitor: 'mstr',
      category: 'Funding',
      headline: 'Strategy announces 2025 preferred distributions 100% return of capital',
      details: [
        '100% of 2025 distributions on preferred equity treated as ROC for tax purposes',
        'Raised $5.5B in Digital Credit (preferred equity) IPOs in 2025',
        'Additional $1.9B raised via ATM programs for preferred instruments',
        '$413M in cumulative distributions paid across all instruments',
        '9.6% blended annual dividend rate on preferred securities',
        'Expects ROC treatment to continue for 10+ years (no E&P)'
      ],
      implication: 'neutral',
      bmnrComparison: 'MSTR pays 9.6% dividend on preferred but BTC generates 0% yield — funded by dilution. BMNR\'s ETH staking generates real 3-5% yield to cover costs.',
      source: 'Strategy PR',
      sourceUrl: 'https://www.strategy.com/investor-relations',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - Q4 2025 EARNINGS ANNOUNCEMENT
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-15',
      competitor: 'mstr',
      category: 'Financial',
      headline: 'Strategy announces Q4 2025 earnings date: February 5, 2026',
      details: [
        'Q4 2025 results to be released after market close Feb 5, 2026',
        'Live video webinar scheduled for 5:00 PM ET',
        'Now trades under multiple tickers: STRF/STRC/STRK/STRD/MSTR',
        'Rebranded from MicroStrategy to Strategy',
        'Describes itself as "world\'s first Bitcoin Treasury Company"'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy continues to position as BTC treasury leader. BMNR differentiates with ETH + staking yield model.',
      source: 'Strategy PR',
      sourceUrl: 'https://www.strategy.com/investor-relations',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - 8-K LARGEST WEEKLY BTC PURCHASE (22,305 BTC / $2.1B)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-20',
      competitor: 'mstr',
      category: 'Acquisition',
      headline: 'Strategy purchases 22,305 BTC for $2.1B in largest weekly acquisition',
      details: [
        'Purchased 22,305 BTC for $2,125.3M at average price of $95,284',
        'Total holdings now 709,715 BTC at average cost of $75,979',
        'Aggregate purchase price: $53.92B',
        'Sold 2,945,371 STRC shares ($294.5M), 38,796 STRK shares ($3.9M)',
        'Sold 10,399,650 MSTR shares for $1,827.3M net proceeds',
        'Total net proceeds from ATM: $2,125M'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy\'s massive $2.1B weekly BTC purchase shows aggressive accumulation. No yield generation — purely price appreciation play vs BMNR\'s staking yield.',
      source: 'Strategy 8-K',
      sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - 8-K BTC PURCHASE (13,627 BTC / $1.25B)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-12',
      competitor: 'mstr',
      category: 'Acquisition',
      headline: 'Strategy purchases 13,627 BTC for $1.25B via ATM program',
      details: [
        'Purchased 13,627 BTC for $1,247.1M at average price of $91,519',
        'Total holdings now 687,410 BTC at average cost of $75,353',
        'Aggregate purchase price: $51.80B',
        'Sold 1,192,262 STRC shares ($119.2M)',
        'Sold 6,827,695 MSTR shares for $1,128.5M net proceeds',
        'Total net proceeds from ATM: $1,247.6M'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy continues aggressive BTC accumulation via ATM dilution. BMNR\'s ETH staking generates yield without continuous share issuance.',
      source: 'Strategy 8-K',
      sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - Q4 2025 FINANCIALS + USD RESERVE $2.25B
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-05',
      competitor: 'mstr',
      category: 'Financial',
      headline: 'Strategy reports Q4 2025 financials: $17.4B unrealized loss, $2.25B USD Reserve',
      details: [
        'Q4 2025: $17.44B unrealized loss on digital assets',
        'Q4 2025: $5.01B associated deferred tax benefit',
        'FY 2025: $5.40B unrealized loss, $1.55B deferred tax benefit',
        'As of Dec 31, 2025: $58.85B digital asset carrying value',
        '$2.42B related deferred tax liability',
        'USD Reserve increased to $2.25B as of Jan 4, 2026'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy\'s $17.4B Q4 unrealized loss shows BTC volatility exposure. BMNR\'s ETH staking provides steady yield regardless of price movements.',
      source: 'Strategy 8-K',
      sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - STRC DIVIDEND RATE INCREASE TO 11%
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-31',
      competitor: 'mstr',
      category: 'Funding',
      headline: 'Strategy increases STRC dividend rate from 10.75% to 11.00%',
      details: [
        'STRC (Variable Rate Stretch Preferred) dividend increased to 11.00%',
        'Effective for monthly periods commencing on or after Jan 1, 2026',
        'Cash dividend of $0.916666667 per share declared for Jan 31, 2026',
        'Record date: 5:00 PM NYC time on Jan 15, 2026',
        'Payment date: Jan 31, 2026'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy raising STRC dividend to 11% increases funding costs. BMNR\'s ETH staking generates 3-5% yield to cover costs without rate pressure.',
      source: 'Strategy 8-K',
      sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - USD RESERVE & 650K BTC HOLDINGS
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-12-01',
      competitor: 'mstr',
      category: 'Strategy',
      headline: 'Strategy establishes $1.44B USD Reserve, now holds 650,000 BTC',
      details: [
        'Established $1.44B USD Reserve to cover 21 months of dividends',
        'Now holds 650,000 BTC — approximately 3.1% of total 21M supply',
        'Goal to grow USD Reserve to cover 24+ months of dividends',
        'Updated FY2025 BTC Yield Target: 22-26%',
        'Updated FY2025 BTC $ Gain Target: $8.4B-$12.8B',
        'Guidance based on assumed BTC price range of $85,000-$110,000'
      ],
      implication: 'neutral',
      bmnrComparison: 'MSTR holds 3.1% of BTC supply vs BMNR\'s ~3.5% of ETH supply. MSTR needs USD Reserve for dividends since BTC yields 0%; BMNR\'s staking covers yield natively.',
      source: 'Strategy PR',
      sourceUrl: 'https://www.strategy.com/investor-relations',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - STRE STOCK IPO (€620M / ~$715M)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-11-07',
      competitor: 'mstr',
      category: 'Funding',
      headline: 'Strategy prices STRE Stock IPO at €620M (~$715M) with 10% dividend',
      details: [
        'IPO of euro-denominated STRE preferred stock at €620M (~$715M)',
        'Perpetual 10% dividend rate with 105% liquidation preference',
        'Closes November 12, 2025 on the Frankfurt Stock Exchange',
        'Broadens access to bitcoin exposure via European capital markets',
        'Raises cumulative bitcoin capital to approximately $11B since November 2024'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy tapping European markets at 10% perpetual dividend cost. BMNR\'s ETH staking generates yield without requiring such high dividend obligations.',
      source: 'Strategy PR',
      sourceUrl: 'https://www.strategy.com/investor-relations',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - S&P B- ISSUER CREDIT RATING
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-27',
      competitor: 'mstr',
      category: 'Financial',
      headline: 'S&P assigns B- issuer credit rating to Strategy',
      details: [
        'S&P assigns B- issuer credit rating with stable outlook',
        'Rating reflects bitcoin holdings as capital for planned financing activities',
        'Unique financing strategy utilizing BTC as treasury asset',
        'Credit rating enables access to debt capital markets',
        'Demonstrates institutional acceptance of BTC treasury model'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy\'s B- rating reflects higher risk BTC volatility exposure. BMNR\'s ETH staking yield provides more stable cash flow for debt servicing.',
      source: 'Strategy PR',
      sourceUrl: 'https://www.strategy.com/investor-relations',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STRATEGY - ATM/BTC ACTIVITY (640,250 BTC @ $74K AVG)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2025-10-13',
      competitor: 'mstr',
      category: 'Acquisition',
      headline: 'Strategy holds 640,250 BTC after purchasing 220 BTC at $74K average',
      details: [
        'Purchased 220 BTC for $16.3M at average price of $74,000',
        'Total holdings now 640,250 BTC at average cost of $73,024',
        'Aggregate purchase price: $46.75B',
        'Sold 273,843 MSTR shares for $53.8M net proceeds',
        'No preferred stock sold during the period'
      ],
      implication: 'neutral',
      bmnrComparison: 'Strategy steadily accumulating BTC with no yield. BMNR\'s staking model generates continuous 3-5% yield on ETH holdings.',
      source: 'Strategy 8-K',
      sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=strategy',
      storyId: 'strategy-btc-treasury',
      storyTitle: 'Strategy (MSTR)'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MARATHON DIGITAL - BTC MINING + TREASURY
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-20',
      competitor: 'mara',
      category: 'Acquisition',
      headline: 'Marathon Digital increases BTC holdings to 46,000+',
      details: [
        'Combined mining production and open market purchases',
        'Mining generates ~15-20 BTC per day at current hashrate',
        'Follows full HODL strategy - no BTC sales',
        'Considering expansion into ETH infrastructure',
        'Q4 2025 production exceeded expectations'
      ],
      implication: 'neutral',
      bmnrComparison: 'MARA\'s mining produces BTC but at high OpEx cost. BMNR\'s pure treasury model with staking has lower operational risk.',
      source: 'Marathon Digital PR',
      sourceUrl: 'https://ir.mara.com/',
      storyId: 'mara-treasury-2026',
      storyTitle: 'Marathon Digital Treasury Growth'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // RIOT PLATFORMS - BTC MINING
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-18',
      competitor: 'riot',
      category: 'Strategy',
      headline: 'Riot Platforms announces $500M facility expansion',
      details: [
        'New mining facility in Texas to increase hashrate 50%',
        'Expected online by Q3 2026',
        'Will increase BTC production capacity significantly',
        'Focus on renewable energy partnerships',
        'Maintains HODL strategy on mined BTC'
      ],
      implication: 'neutral',
      bmnrComparison: 'Riot\'s CapEx-intensive mining model contrasts with BMNR\'s capital-efficient staking. Mining faces halving headwinds; staking does not.',
      source: 'Riot Platforms PR',
      sourceUrl: 'https://www.riotplatforms.com/news',
      storyId: 'riot-expansion-2026',
      storyTitle: 'Riot Platforms Expansion'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // COINBASE - CRYPTO EXCHANGE
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-22',
      competitor: 'coin',
      category: 'Regulatory',
      headline: 'Coinbase secures expanded staking license in Singapore',
      details: [
        'Regulatory approval for institutional staking services',
        'Expands ETH staking offerings to Asian institutions',
        'Competitive pressure on independent staking providers',
        'Part of global regulatory compliance expansion',
        'Strengthens institutional custody + staking bundle'
      ],
      implication: 'negative',
      bmnrComparison: 'Coinbase expanding staking services increases competition but validates ETH staking as institutional strategy. BMNR\'s scale advantage remains.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-12-11',
      competitor: 'coin',
      category: 'Strategy',
      headline: 'Coinbase positions as primary staking provider as staking ETFs launch in US — custodian for 8 of 9 spot ETH ETFs',
      details: [
        'Grayscale becomes first US issuer to stake ETH and SOL underlying its spot crypto ETFs (Oct 2025)',
        'Coinbase Institutional is the largest institutional ETH staking provider',
        'Primary custodian for 8 of 9 approved spot ETH ETFs',
        'Staking operator for international ETPs: Virtune, WisdomTree, 21Shares',
        'Before staking, ETH ETFs missed ~$61M in staking benefits (launch through Feb 2025 per Grayscale)',
        'Staking ETFs expected to strengthen economic security of proof-of-stake networks',
        'Coinbase Prime provides integrated custody + staking with detailed rewards reporting'
      ],
      implication: 'positive',
      bmnrComparison: 'Staking ETFs arriving via Coinbase infrastructure validates ETH staking as mainstream institutional strategy. Coinbase\'s dominance (8/9 ETH ETF custodian) makes it both competitor and ecosystem enabler. BMNR benefits from growing institutional staking demand — staking ETFs bring more capital into ETH staking, supporting network security and yield sustainability.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/staking-etfs-have-arrived',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-12-09',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Coinbase and PNC Bank launch direct bitcoin trading for Private Bank clients — first major US bank with CaaS integration',
      details: [
        'PNC Private Bank clients can buy, sell, and hold bitcoin directly on PNC\'s digital banking platform',
        'First major US bank to support direct spot bitcoin trading via Coinbase Crypto-as-a-Service (CaaS)',
        'Builds on strategic partnership announced July 2025',
        'Eliminates need for separate exchange accounts — seamless within PNC banking app',
        'PNC is a top-10 US financial institution',
        'Powered by Coinbase\'s CaaS infrastructure for institutional clients'
      ],
      implication: 'neutral',
      bmnrComparison: 'Coinbase CaaS bringing bitcoin to major US banks validates crypto-TradFi integration. PNC integration is BTC-only — no ETH staking. However, infrastructure pathway exists for future ETH/staking products in banks. Coinbase building distribution moat via CaaS partnerships.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-pnc-partner',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-11-21',
      competitor: 'coin',
      category: 'Acquisition',
      headline: 'Coinbase to acquire Vector — Solana onchain trading platform for "everything exchange" vision',
      details: [
        'Acquiring Vector, Solana-native onchain trading platform',
        'Solana DEX volume for 2025 already exceeded $1 trillion (Messari)',
        'Vector tech to plug into Coinbase DEX trading integration',
        'Vision: "everything exchange" — one-stop-shop for trading everything onchain, 24/7',
        'Vector apps to be sunsetted; Tensor Foundation remains independent',
        'Part of broader push: DEX trading launched in Brazil same week (Nov 19)'
      ],
      implication: 'neutral',
      bmnrComparison: 'Coinbase acquiring Solana infrastructure reflects multi-chain strategy. Solana is alternative L1 to Ethereum — Coinbase betting on both ecosystems. However, Coinbase also heavily invested in Ethereum via Base L2. Multi-chain Coinbase growth ultimately brings more users to crypto overall, some of which flow to ETH staking.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-to-acquire-vector',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-08-14',
      competitor: 'coin',
      category: 'Acquisition',
      headline: 'Coinbase closes Deribit acquisition — world\'s #1 crypto options exchange ($185B July volume, $60B open interest)',
      details: [
        'Deribit officially joins Coinbase — #1 crypto options exchange by volume and open interest',
        'July 2025 record: $185B+ volume, ~$60B platform open interest',
        'Over $1 trillion traded in 2024 on Deribit',
        'Deribit generated $30M+ in July transaction revenue alone',
        'Expected Adjusted EBITDA accretive immediately after close',
        '~$10M additional Q3 expense (tech & G&A, excl deal-related amortization)',
        'Coinbase now offers spot, futures, perpetuals, and options on one platform',
        'Institutional and advanced trader base with loyal following'
      ],
      implication: 'neutral',
      bmnrComparison: 'Deribit acquisition makes Coinbase the most comprehensive crypto derivatives platform globally. Derivatives volume drives more hedging/speculation activity which benefits overall crypto market liquidity. Not directly competitive with BMNR\'s ETH staking thesis but strengthens Coinbase as dominant crypto infrastructure company.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/deribit-joins-coinbase',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-10-27',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Coinbase and Citi collaborate on stablecoin payments infrastructure across 94 markets',
      details: [
        'Collaboration with Citi focused on leveraging digital assets and stablecoins for institutional payments',
        'Citi\'s global network spans 94 markets and over 300 payment clearing systems',
        'Focus: improving fiat-to-crypto on-ramps/off-ramps for institutional clients',
        'Building stablecoin payment solutions and digital asset infrastructure',
        'Targeting 24/7 availability for institutional payment conversion',
        'Part of Coinbase\'s broader mission to integrate digital assets into global economy'
      ],
      implication: 'neutral',
      bmnrComparison: 'Citi ($94B+ revenue) collaborating with Coinbase on stablecoin payments validates crypto infrastructure for institutional use. Stablecoin demand drives on-chain activity on Ethereum. Not directly competitive with BMNR but Coinbase building institutional distribution moat.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-citi-collaborate',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-10-27',
      competitor: 'coin',
      category: 'Strategy',
      headline: 'Coinbase Asset Management and Apollo partner on stablecoin credit strategies — $300B market targeting $3T by 2030',
      details: [
        'CBAM and Apollo ($840B AUM) establish partnership for stablecoin credit strategies',
        'Stablecoin market cap reached $300B as of Oct 2025, projections of $3T by 2030 (GENIUS Act tailwinds)',
        'Strategies: over-collateralized BTC lending, corporate direct lending to stablecoin issuers/fintechs, tokenized credit holdings',
        'Apollo\'s Christine Moy: "accelerates our vision of tokenizing credit markets"',
        'Innovative products targeting market launch in 2026',
        'GENIUS-compliant opportunities with monthly audits and 1:1 reserves'
      ],
      implication: 'neutral',
      bmnrComparison: 'Coinbase + Apollo building institutional DeFi credit products around stablecoins. $300B stablecoin market growing to $3T creates massive on-chain activity on Ethereum. Apollo\'s $840B AUM entering crypto credit validates institutional demand. BMNR benefits from stablecoin ecosystem growth driving ETH utility.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/cbam-apollo-stablecoin-credit',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-10-15',
      competitor: 'coin',
      category: 'Strategy',
      headline: 'Coinbase invests in CoinDCX — India/Middle East expansion targeting 100M+ crypto owners',
      details: [
        'Coinbase Ventures invests in CoinDCX, leading crypto exchange in India and Middle East',
        'India has 1.4B+ people, 100M+ crypto owners, growing tech adoption',
        'CoinDCX annualized revenue ~$141M USD, transaction volumes ~$165B USD, $1.2B AUC',
        'User base exceeds 20.4 million across India and Middle East',
        'Subject to regulatory approvals and customary closing conditions',
        'Builds on Coinbase\'s growing presence with local operations in the region'
      ],
      implication: 'neutral',
      bmnrComparison: 'Coinbase expanding distribution into India (100M+ crypto owners) and Middle East. Geographic expansion grows total addressable market for crypto ecosystem. CoinDCX\'s $165B volume demonstrates massive emerging market activity. More global crypto adoption = more ETH ecosystem participants.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-makes-investment-in-coindcx',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-10-15',
      competitor: 'coin',
      category: 'Yield',
      headline: 'Coinbase Asset Management launches US Bitcoin Yield Fund — BTC yield via lending and basis trading',
      details: [
        'Coinbase US Bitcoin Yield Fund (USCBYF) for US accredited investors',
        'Delivers bitcoin performance + additional BTC yield',
        'Yield generated from BTC private credit lending and basis trading',
        'Subscribe with in-kind bitcoin, USD, or USDC',
        'Partnership with iTrustCapital for tax-deferred IRA access (2026)',
        'Follows offshore Coinbase Bitcoin Yield Fund launched May 2025 for non-US investors',
        'SEC-registered RIA, CFTC-registered CPO/CTA, NFA member'
      ],
      implication: 'negative',
      bmnrComparison: 'Coinbase BTC Yield Fund is a direct competitive concept to BMNR\'s ETH yield thesis — institutional crypto yield product from major exchange. However: BTC yield via lending/basis trading is fundamentally different from ETH staking (native protocol yield). BTC yield involves counterparty/credit risk; ETH staking yield is protocol-native and trustless. BMNR should emphasize this distinction: ETH staking = yield from securing the network, not from lending.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-us-bitcoin-yield-fund',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-10-08',
      competitor: 'coin',
      category: 'Regulatory',
      headline: 'Coinbase staking now available in New York — $130M+ missed rewards across states with bans',
      details: [
        'New Yorkers can now stake ETH, SOL, and other assets on Coinbase',
        'Governor Hochul\'s leadership in providing regulatory clarity credited for milestone',
        'Coinbase estimates CA, NJ, MD, WI residents have collectively missed $130M+ in staking rewards',
        'Recent SEC staff guidance confirms staking-as-a-service is not a security',
        'Staking cases against Coinbase dismissed by VT, IL, KY, AL, SC — "national consensus has emerged"',
        'CLO Paul Grewal: "In the city that never sleeps, your money shouldn\'t either"'
      ],
      implication: 'negative',
      bmnrComparison: 'NY staking approval significantly expands Coinbase\'s retail ETH staking TAM — NY is one of the largest financial markets. More retail ETH staking via Coinbase increases competition for BMNR\'s institutional staking value proposition. However, growing retail staking also validates ETH staking as mainstream and supports network security. SEC consensus that staking is not a security reduces regulatory risk for all staking players including BMNR.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/staking-is-now-available-in-new-york',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-10-03',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Samsung taps Coinbase for 75M+ Galaxy users — Coinbase One exclusive access via Samsung Wallet',
      details: [
        'Partnership with Samsung, world\'s most popular smartphone brand',
        'Exclusive Coinbase One access within Samsung Wallet app for US Galaxy users (75M+)',
        'Coinbase One: zero trading fees, boosted staking rewards, priority support, account protection',
        'Samsung Pay integration now live for crypto purchases in US',
        'Plans to expand globally and explore new partnership opportunities',
        'Samsung Pay already rolled out as payment option in Coinbase app (Jul 29) for US and Canada'
      ],
      implication: 'neutral',
      bmnrComparison: 'Samsung distribution deal gives Coinbase massive consumer reach (75M+ Galaxy users). Boosted staking rewards in Coinbase One could drive more retail ETH staking. Coinbase building retail distribution moat through device-level partnerships. More retail crypto users = larger ecosystem, though also more Coinbase staking competition.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/samsung-taps-coinbase',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-07-30',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Coinbase and JPMorgan Chase partner — 80M+ customers get credit card crypto funding and Ultimate Rewards → USDC',
      details: [
        'Partnership with JPMorgan Chase, largest US bank (80M+ customers)',
        'Fall 2025: Chase credit cards can fund Coinbase accounts',
        '2026: Chase Ultimate Rewards Points redeemable for crypto — first major credit card program to offer this',
        '2026: Direct Chase bank account linking to Coinbase',
        'Coinbase as "most trusted bridge from traditional finance to crypto"',
        'Ultimate Rewards → USDC conversion creates novel stablecoin on-ramp'
      ],
      implication: 'neutral',
      bmnrComparison: 'JPMorgan Chase (largest US bank) partnering with Coinbase is a landmark crypto-TradFi integration. 80M+ customers with frictionless crypto access dramatically expands retail on-ramp. Ultimate Rewards → USDC creates novel stablecoin demand channel. More retail participants flowing through Coinbase strengthens their position as primary crypto gateway but also grows overall ecosystem benefiting all crypto assets including ETH.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-jpmorgan-chase',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-07-21',
      competitor: 'coin',
      category: 'Strategy',
      headline: 'Coinbase launches first CFTC-regulated perpetual futures in the US — BTC-PERP and ETH-PERP with up to 10x leverage',
      details: [
        'First time US traders can access perpetual-style futures via Coinbase Financial Markets (CFM)',
        'CFTC-regulated contracts — previously unavailable to US traders due to regulatory landscape',
        'Two contracts at launch: nano Bitcoin Perpetual Futures (BTC-PERP) and nano Ether Perpetual Futures (ETH-PERP)',
        'Up to 10x leverage for crypto perpetual futures; up to 20x intraday for metals (silver, gold)',
        'Long-dated with 5-year expirations — no monthly expirations',
        'Fees as low as 0.02% per contract (minimum $0.15 per contract)',
        'Perpetual futures dominate 90% of global crypto derivatives trading volumes',
        'Exchange closes every Friday 5:00-6:00 PM ET with quarterly 3-hour maintenance windows'
      ],
      implication: 'neutral',
      bmnrComparison: 'CFTC-regulated perpetual futures are a landmark US derivatives milestone. ETH-PERP creates regulated US perpetuals market for Ethereum — more hedging and speculative tools for ETH. 90% of global crypto derivatives volume is perps, so US access could dramatically increase ETH trading activity. More liquid ETH derivatives market supports BMNR thesis through improved price discovery.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/perpetual-futures-have-arrived-in-the-us',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-07-02',
      competitor: 'coin',
      category: 'Acquisition',
      headline: 'Coinbase acquires LiquiFi — leading token management platform for onchain builders',
      details: [
        'LiquiFi provides token cap table management, vesting schedules, and compliance workflows',
        'Customers include Uniswap Foundation, OP Labs (Optimism), Ethena, Zora, and 0x',
        'Enables Coinbase to support builders earlier in lifecycle — before tokens are launched or listed',
        'Plan to integrate LiquiFi capabilities with Coinbase Prime over time',
        'Tightens integration across custody, trading, financing for institutional clients',
        'Vision: make launching a token easier, faster, and more global than issuing traditional startup equity'
      ],
      implication: 'neutral',
      bmnrComparison: 'LiquiFi acquisition adds pre-listing token infrastructure to Coinbase platform. Customer base (Uniswap, Optimism, Ethena, Zora, 0x) is heavily Ethereum-ecosystem native. Coinbase capturing project relationships before listing strengthens their position as primary exchange for ETH ecosystem tokens. More comprehensive institutional tooling benefits crypto market overall.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-acquires-liquifi',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-06-20',
      competitor: 'coin',
      category: 'Regulatory',
      headline: 'Coinbase secures MiCA licence from Luxembourg CSSF — full EU access across all 27 member states (450M people)',
      details: [
        'MiCA (Markets in Crypto Assets) licence from Luxembourg CSSF (Commission de Surveillance du Secteur Financier)',
        'Enables offering full suite of crypto products to all 27 EU member states',
        'Access to 450 million people across the EU under single regulatory passport',
        'Establishing European crypto hub in Luxembourg',
        'Previously held individual licences in Germany, France, Ireland, Italy, Netherlands, and Spain',
        'MiCA unites individual country licences under single framework',
        'Luxembourg has passed four blockchain-related policies through national legislature'
      ],
      implication: 'neutral',
      bmnrComparison: 'Single MiCA licence covering 450M EU population is massive regulatory moat for Coinbase. Unified EU access under one framework dramatically simplifies European expansion. More regulated exchange access globally = more liquidity = benefits ETH market overall. Coinbase EU strength as primary fiat-to-crypto gateway grows overall ecosystem.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-secures-mica-licence',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-05-16',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Webull Pay partners with Coinbase CaaS platform for custody, trading, staking, and USDC',
      details: [
        'Webull Pay chose Coinbase as crypto partner via Crypto-as-a-Service (CaaS) platform',
        'Webull Pay gets institutional-grade custody, advanced trading, USDC, and staking access',
        'Launching June 2025',
        'Same technology trusted by world\'s largest financial institutions and asset managers',
        'Coinbase and Webull Pay exploring additional opportunities to expand globally',
        'Stephen Yip (Webull Pay CEO): "This collaboration unlocks powerful capabilities that will accelerate innovation on our platform"'
      ],
      implication: 'neutral',
      bmnrComparison: 'Webull Pay CaaS partnership validates Coinbase as white-label crypto infrastructure provider. CaaS B2B model expands Coinbase reach without direct user acquisition costs. More platforms offering crypto trading/staking through Coinbase rails = more exchange volume = benefits overall crypto market liquidity.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-partners-with-webull-pay',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-05-08',
      competitor: 'coin',
      category: 'Acquisition',
      headline: 'Coinbase announces agreement to acquire Deribit for $2.9B — $700M cash + 11M shares of Class A common stock',
      details: [
        'Deribit is world\'s leading crypto options exchange with ~$30B current open interest',
        'Purchase price: ~$2.9B ($700M cash + 11M shares Coinbase Class A common stock)',
        'Deribit facilitated over $1 trillion in trading volume in 2024',
        'Consistent track record of generating positive Adjusted EBITDA',
        'Creates most comprehensive institutional derivatives platform: spot, futures, perpetuals, and options',
        'Follows strategic M&A track record: Xapo → Custody, Tagomi → Prime, FairX → Derivatives Exchange, One River → Asset Management',
        'Subject to regulatory approvals, expected to close by year-end',
        'Deribit CEO Luuk Strijers: "Together with Coinbase, we\'re set to shape the future of the global crypto derivatives market"'
      ],
      implication: 'neutral',
      bmnrComparison: 'Largest crypto M&A deal ever announced. Coinbase building full-stack derivatives platform (spot + futures + perps + options) makes it dominant crypto infrastructure company. Crypto options expansion similar to equity options boom of 1990s — more sophisticated trading tools benefit overall market development including ETH derivatives liquidity.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-to-acquire-deribit',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-05-06',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Coinbase partners with Riot Games as exclusive crypto exchange partner across League of Legends and VALORANT esports',
      details: [
        'Exclusive cryptocurrency exchange and official blockchain technology partner for LoL and VALORANT Esports global events',
        'Debut at Masters (M2) in Toronto — spans Masters, Champions (VCT), First Stand, MSI, and Worlds (LoL)',
        'New in-game segments: "Econ Report" (VALORANT) and "Gold Grind" (LoL) — live analysis of in-match currency',
        'Viewer "drops" during events: emotes, icons, and promotions with all-expenses-paid trips to Champions/Worlds',
        'Exploring future Web3 technology integrations for fan experience',
        'Adds to portfolio: Team Liquid, WNBA, NBA (Warriors, Clippers), Aston Martin F1, Borussia Dortmund'
      ],
      implication: 'neutral',
      bmnrComparison: 'Riot Games partnership extends Coinbase brand reach into massive esports audience (LoL and VALORANT have 100M+ combined players). Web3 technology exploration signals potential onchain integration for gaming. Brand awareness drives crypto adoption broadly, benefiting overall ecosystem.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-partners-with-riot-games',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-04-28',
      competitor: 'coin',
      category: 'Yield',
      headline: 'Coinbase Asset Management launches offshore Bitcoin Yield Fund (CBYF) — 4-8% net BTC returns for non-US investors',
      details: [
        'Coinbase Bitcoin Yield Fund (CBYF) — long-bitcoin fund seeking 4-8% net return in BTC per year over market cycle',
        'Investors subscribe and redeem in bitcoin; all performance denominated in BTC',
        'Conservative strategy: avoids riskier high-interest BTC loans and systematic call selling',
        'Uses third-party custody integrations to trade — significantly reduces counterparty risk',
        '$1B AUM estimated strategy capacity',
        'Monthly open for subscriptions/redemptions with 5 business days notice',
        'Seeded by Aspen Digital (FSRA-regulated, Abu Dhabi) — exclusive wealth-distribution partner for UAE and Asia',
        'Currently for international (non-US) investors; launches May 1, 2025'
      ],
      implication: 'negative',
      bmnrComparison: 'Offshore BTC Yield Fund is Coinbase\'s first institutional crypto yield product — directly competitive concept to BMNR\'s ETH yield thesis. 4-8% target BTC yield via lending/basis trading competes for same "crypto yield" allocator capital. Key distinction: BTC yield involves counterparty/credit risk from lending; BMNR\'s ETH staking yield is protocol-native and trustless.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-bitcoin-yield-fund',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-04-24',
      competitor: 'coin',
      category: 'Partnership',
      headline: 'Coinbase expands PayPal partnership to advance PYUSD stablecoin — zero fee USD-PYUSD conversions for all customers',
      details: [
        'Expanding partnership with PayPal to accelerate adoption of PayPal USD (PYUSD) stablecoin',
        'Zero fee USD-PYUSD conversions for retail and institutional customers',
        'Coinbase infrastructure to expand PYUSD support to PayPal\'s largest merchant partners',
        'Collaborating to explore new onchain use cases for PYUSD',
        'Stablecoin transaction volumes surged 250% from $6.2T to $22T between 2023 and 2024',
        'Making it easier for millions of PayPal customers to bring finances onchain'
      ],
      implication: 'neutral',
      bmnrComparison: 'PayPal PYUSD partnership strengthens Coinbase as multi-stablecoin infrastructure platform. Zero-fee conversions could drive significant PYUSD adoption alongside USDC. Stablecoin volume growth ($6.2T → $22T, 250%) validates on-chain payment thesis. More stablecoin activity broadly benefits Ethereum ecosystem where most stablecoins settle.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-and-paypal-to-advance-stablecoin-payments',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },
    {
      date: '2025-01-31',
      competitor: 'coin',
      category: 'Acquisition',
      headline: 'Coinbase acquires Spindl — onchain ads and attribution platform to accelerate Base builder distribution',
      details: [
        'Spindl is onchain ads and attribution platform rebuilding ad tech stack onchain',
        'Founded by Antonio Garcia-Martinez (AGM) — early Facebook ads team member who shipped keyword targeting, audience targeting, and FBX exchange',
        'Spindl will operate under Base, continues supporting current customers without interruption',
        'Goal: help builders go viral onchain and find distribution on Coinbase and across onchain economy',
        'Committed to maintaining open standards for publishers and advertisers',
        'Part of flywheel: developers build onchain apps → apps attract users → more users incentivize more developers'
      ],
      implication: 'neutral',
      bmnrComparison: 'Spindl acquisition strengthens Base (Ethereum L2) ecosystem by solving builder distribution problem. More builders finding users on Base = more on-chain activity on Ethereum L2. Facebook ads veteran leading onchain ad tech could dramatically accelerate user acquisition for Base ecosystem.',
      source: 'Coinbase Blog',
      sourceUrl: 'https://www.coinbase.com/blog/coinbase-acquires-spindl',
      storyId: 'coin',
      storyTitle: 'Coinbase'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CLEANSPARK - BTC MINING
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-10',
      competitor: 'clsk',
      category: 'Acquisition',
      headline: 'CleanSpark acquires mining facility, adds 2 EH/s hashrate',
      details: [
        'Acquisition increases total hashrate by 15%',
        'Continues consolidation of mining industry',
        'Focus on low-cost, sustainable power sources',
        'BTC holdings increase to ~10,000 BTC',
        'Trades at lower NAV premium than MSTR'
      ],
      implication: 'neutral',
      bmnrComparison: 'CleanSpark\'s mining growth increases BTC supply competition. No yield generation - purely price appreciation play vs BMNR\'s yield + appreciation.',
      source: 'CleanSpark PR',
      sourceUrl: 'https://www.cleanspark.com/news',
      storyId: 'clsk-acquisition-2026',
      storyTitle: 'CleanSpark Mining Expansion'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // INDUSTRY - REGULATORY
    // ═══════════════════════════════════════════════════════════════════════════
    {
      date: '2026-01-05',
      competitor: 'other',
      category: 'Regulatory',
      headline: 'SEC approves spot ETH ETF staking for institutional products',
      details: [
        'Major regulatory milestone for ETH ecosystem',
        'ETH ETFs can now include staking yield',
        'Increases institutional demand for staked ETH',
        'Validates staking as compliant investment strategy',
        'Expected to drive significant ETH inflows'
      ],
      implication: 'positive',
      bmnrComparison: 'Regulatory clarity validates BMNR\'s ETH staking strategy. As a pure-play ETH treasury, BMNR benefits directly from increased institutional adoption.',
      source: 'SEC Filing',
      sourceUrl: 'https://www.sec.gov/news',
      storyId: 'sec-eth-staking-approval',
      storyTitle: 'SEC ETH Staking Approval'
    }
  ];

  // Filter news by competitor, sort by date (newest first)
  const filteredNews = (competitorFilter === 'all'
    ? COMPETITOR_NEWS
    : COMPETITOR_NEWS.filter(n => n.competitor === competitorFilter)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group news by storyId, with ungrouped items in their own "group"
  const groupedNews = React.useMemo(() => {
    const groups: Record<string, { title: string; entries: (BMNRCompetitorNewsEntry & { originalIdx: number })[] }> = {};

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

    // Sort entries within each group by date (newest first)
    Object.values(groups).forEach(group => {
      group.entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Convert to array and sort groups by most recent entry (newest story first)
    return Object.entries(groups)
      .map(([storyId, group]) => ({
        storyId,
        title: group.title,
        entries: group.entries,
        latestDate: group.entries[0]?.date || ''
      }))
      .sort((a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime());
  }, [filteredNews]);

  // Get competitor display name
  const getCompetitorName = (id: BMNRCompetitorId): string => {
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };

  // Group stories by competitor company for section headers
  const companySections = React.useMemo(() => {
    const sections: Record<string, { name: string; stories: typeof groupedNews }> = {};

    groupedNews.forEach(story => {
      const competitorId = story.entries[0]?.competitor || 'other';
      const competitorName = getCompetitorName(competitorId);
      if (!sections[competitorId]) {
        sections[competitorId] = { name: competitorName, stories: [] };
      }
      sections[competitorId].stories.push(story);
    });

    return Object.entries(sections)
      .map(([id, section]) => ({
        competitorId: id,
        name: section.name,
        stories: section.stories,
        latestDate: section.stories[0]?.latestDate || ''
      }))
      .sort((a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime());
  }, [groupedNews]);

  // Implication styling - using design tokens
  const getImplicationStyle = (impl: BMNRImplication) => {
    switch (impl) {
      case 'positive': return { bg: 'var(--mint-dim)', color: 'var(--mint)', label: '✓ Good for BMNR' };
      case 'negative': return { bg: 'var(--coral-dim)', color: 'var(--coral)', label: '⚠ Threat to BMNR' };
      default: return { bg: 'var(--surface3)', color: 'var(--text3)', label: '○ Neutral' };
    }
  };

  // Category styling - using design tokens
  const getCategoryStyle = (cat: BMNRCompetitorNewsCategory) => {
    const styles: Record<BMNRCompetitorNewsCategory, { bg: string; color: string }> = {
      'Acquisition': { bg: 'var(--mint-dim)', color: 'var(--mint)' },
      'Funding': { bg: 'var(--sky-dim)', color: 'var(--sky)' },
      'Yield': { bg: 'var(--violet-dim)', color: 'var(--violet)' },
      'Regulatory': { bg: 'var(--gold-dim)', color: 'var(--gold)' },
      'Technology': { bg: 'var(--cyan-dim)', color: 'var(--cyan)' },
      'Partnership': { bg: 'var(--sky-dim)', color: 'var(--sky)' },
      'Financial': { bg: 'var(--emerald-dim)', color: 'var(--emerald)' },
      'Strategy': { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    };
    return styles[cat] || { bg: 'var(--surface3)', color: 'var(--text3)' };
  };

  const compsData = comparables.map(c => {
    // Handle mixed holdings (COIN has string)
    const cryptoPrice = c.crypto === 'BTC' ? btcPrice : ethPrice;
    const numericHoldings = typeof c.holdings === 'number' ? c.holdings : 0;
    const navPerShare = numericHoldings > 0 ? (numericHoldings * cryptoPrice) / c.shares : 0;
    return {
      ...c,
      navPerShare,
      premium: navPerShare > 0 ? ((c.price / navPerShare) - 1) * 100 : 0,
      marketCap: c.price * c.shares
    };
  });

  const categories = [
    { key: 'all', label: 'All Peers' },
    { key: 'ETH', label: 'ETH Treasury' },
    { key: 'BTC', label: 'BTC Treasury' },
    { key: 'Exchange', label: 'Exchanges' },
  ];

  const filteredComps = selectedCategory === 'all'
    ? compsData
    : compsData.filter(c => c.category === selectedCategory);

  // Key competitors with threat levels for colored borders
  const keyCompetitors = [
    {
      name: 'Strategy (MSTR)',
      type: 'BTC Treasury',
      status: '713,502 BTC ($54B+)',
      focus: 'Pioneer BTC treasury, aggressive accumulation via preferred equity',
      threat: 'High',
      notes: 'Largest corporate BTC holder. 0% yield - relies on price appreciation. 9.6% preferred dividend funded by dilution.'
    },
    {
      name: 'Marathon Digital (MARA)',
      type: 'BTC Miner + Treasury',
      status: '~46K BTC',
      focus: 'Mining operations with treasury accumulation',
      threat: 'Medium',
      notes: 'Mining generates BTC but no staking yield. Different model than BMNR\'s ETH staking approach.'
    },
    {
      name: 'Coinbase (COIN)',
      type: 'Exchange',
      status: 'Mixed Holdings',
      focus: 'Exchange + institutional custody + staking services',
      threat: 'Low',
      notes: 'Exchange model, not pure treasury play. Offers staking services but not same investment vehicle.'
    },
    {
      name: 'Riot Platforms (RIOT)',
      type: 'BTC Miner + Treasury',
      status: '~18K BTC',
      focus: 'Mining with treasury HODL strategy',
      threat: 'Low',
      notes: 'Smaller BTC miner. Mining costs vs BMNR\'s staking yield creates structural disadvantage.'
    },
    {
      name: 'ETHZilla (ETHZ)',
      type: 'ETH Treasury + RWA',
      status: '~102K ETH + RWA tokenization',
      focus: 'ETH accumulation, DeFi restaking (EtherFi/Puffer), RWA tokenization via Liquidity.io (FINRA ATS)',
      threat: 'High',
      notes: 'Most direct competitor — also ETH treasury company. Differentiates via RWA tokenization (manufactured homes, auto loans, aircraft engines) and diversified DeFi yield. Trading at -13% NAV discount (mNAV 0.87x).'
    },
  ];

  // Build ticker-keyed lookup for merging qualitative data into quantitative comparables
  const keyCompLookup: Record<string, typeof keyCompetitors[0]> = {};
  keyCompetitors.forEach(k => {
    const match = k.name.match(/\(([A-Z]+)\)/);
    if (match) keyCompLookup[match[1]] = k;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#comparables-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Comparables & Competitor Intelligence<UpdateIndicators sources={['PR', 'WS']} /></h2>

      <div className="highlight">
        <h3>Unified Peer Analysis<UpdateIndicators sources={['PR', 'WS']} /></h3>
        <p>Each card combines quantitative metrics (holdings, NAV, premium) with qualitative intelligence (threat level, competitive focus). BMNR's ETH staking yield vs BTC treasuries' 0% is the key structural differentiator.</p>
      </div>

      {/* Peer Group Selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`filter-btn ${selectedCategory === cat.key ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="comp-cards-grid">
        {filteredComps.map(c => {
          const qual = keyCompLookup[c.name];
          return (
            <div key={c.name} className={`comp-unified-card ${c.name === 'BMNR' ? 'comp-self' : qual ? `threat-${qual.threat.toLowerCase()}` : ''}`}>
              <div className="comp-card-header">
                <div className="comp-card-identity">
                  <div className="comp-card-name">{c.fullName || c.name}</div>
                  <div className="comp-card-ticker">{c.name} · {c.crypto}</div>
                </div>
                <div className="comp-card-badges">
                  {qual && <span className={`comp-card-badge threat-${qual.threat.toLowerCase()}`}>{qual.threat}</span>}
                  <span className="comp-card-badge type-badge">{qual?.type || c.category}</span>
                </div>
              </div>
              <div className="comp-card-metrics">
                <div className="comp-card-metric"><div className="val">{typeof c.holdings === 'number' ? c.holdings.toLocaleString() : c.holdings}</div><div className="lbl">Holdings</div></div>
                <div className="comp-card-metric"><div className="val">{c.navPerShare > 0 ? `$${c.navPerShare.toFixed(2)}` : '—'}</div><div className="lbl">NAV/Share</div></div>
                <div className="comp-card-metric"><div className="val">${c.price}</div><div className="lbl">Price</div></div>
                <div className="comp-card-metric"><div className={`val ${c.premium >= 0 ? 'mint' : 'coral'}`}>{c.navPerShare > 0 ? `${c.premium >= 0 ? '+' : ''}${c.premium.toFixed(0)}%` : '—'}</div><div className="lbl">Premium</div></div>
                <div className="comp-card-metric"><div className={`val ${c.yield > 0 ? 'mint' : ''}`}>{c.yield > 0 ? `${c.yield}%` : '—'}</div><div className="lbl">Yield</div></div>
                <div className="comp-card-metric"><div className="val">${(c.marketCap / 1e9).toFixed(1)}B</div><div className="lbl">Mkt Cap</div></div>
              </div>
              {qual && (
                <>
                  <div className="comp-card-detail"><strong>Status:</strong> {qual.status}</div>
                  <div className="comp-card-detail"><strong>Focus:</strong> {qual.focus}</div>
                  <div className="comp-card-notes">{qual.notes}</div>
                </>
              )}
            </div>
          );
        })}
        {keyCompetitors.filter(k => {
          const ticker = k.name.match(/\(([A-Z]+)\)/)?.[1];
          return ticker && !compsData.find(c => c.name === ticker);
        }).filter(() => selectedCategory === 'all').map((k, i) => (
          <div key={`qual-${i}`} className={`comp-unified-card threat-${k.threat.toLowerCase()}`}>
            <div className="comp-card-header">
              <div className="comp-card-identity">
                <div className="comp-card-name">{k.name}</div>
                <div className="comp-card-ticker">{k.name.match(/\(([A-Z]+)\)/)?.[1] || ''}</div>
              </div>
              <div className="comp-card-badges">
                <span className={`comp-card-badge threat-${k.threat.toLowerCase()}`}>{k.threat}</span>
                <span className="comp-card-badge type-badge">{k.type}</span>
              </div>
            </div>
            <div className="comp-card-detail"><strong>Status:</strong> {k.status}</div>
            <div className="comp-card-detail"><strong>Focus:</strong> {k.focus}</div>
            <div className="comp-card-notes">{k.notes}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#yield-advantage</div>
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Yield Advantage<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>ETH staking generates yield vs BTC's 0% — structural advantage</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="big-stat">
            <div className="num mint">+{comparables[0].yield}%</div>
            <div className="lbl">Annual staking yield vs BTC (0%)</div>
          </div>
        </div>
      </div>

      {/* Advanced Valuation Matrices */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#valuation-framework</div>
      <div className="highlight"><h3>📈 Valuation Framework</h3><p>NAV-based valuation for crypto treasury companies. Premium/discount analysis vs peers.</p></div>

      {/* Valuation Methodology Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#implied-valuation-matrix</div>
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Implied Valuation Matrix<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>BMNR value under different NAV multiples (current: ${(compsData[0]?.marketCap / 1e9).toFixed(2)}B)</p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Method</th>
              <th>Peer Basis</th>
              <th className="r">Multiple</th>
              <th className="r">Implied Value</th>
              <th className="r">vs Current</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const bmnr = compsData.find(c => c.name === 'BMNR');
              const currentMC = bmnr?.marketCap || 0;
              const nav = bmnr?.navPerShare * (comparables[0]?.shares || 1);
              return [
                { method: 'NAV Multiple', basis: 'MSTR Premium', multiple: '2.0x', implied: nav * 2.0, vs: ((nav * 2.0) / currentMC - 1) * 100 },
                { method: 'NAV Multiple', basis: 'Market Average', multiple: '1.5x', implied: nav * 1.5, vs: ((nav * 1.5) / currentMC - 1) * 100 },
                { method: 'NAV Multiple', basis: 'Fair Value', multiple: '1.0x', implied: nav * 1.0, vs: ((nav * 1.0) / currentMC - 1) * 100 },
                { method: 'NAV Multiple', basis: 'Discount', multiple: '0.75x', implied: nav * 0.75, vs: ((nav * 0.75) / currentMC - 1) * 100 },
                { method: 'Yield-Adjusted', basis: 'ETH Yield Premium', multiple: '1.3x', implied: nav * 1.3, vs: ((nav * 1.3) / currentMC - 1) * 100 },
                { method: 'Yield-Adjusted', basis: '5yr Compound', multiple: '1.15x', implied: nav * Math.pow(1 + (comparables[0]?.yield || 0) / 100, 5), vs: ((nav * Math.pow(1 + (comparables[0]?.yield || 0) / 100, 5)) / currentMC - 1) * 100 },
              ].map((v, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{v.method}</td>
                  <td>{v.basis}</td>
                  <td className="r">{v.multiple}</td>
                  <td className="r mint">${(v.implied / 1e9).toFixed(2)}B</td>
                  <td className="r" style={{ color: v.vs >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                    {v.vs >= 0 ? '+' : ''}{v.vs.toFixed(0)}%
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      <div className="g2" style={{ }}>
        {/* SOTP Valuation */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sotp</div>
          <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Sum-of-the-Parts (SOTP)<UpdateIndicators sources={['WS']} /></div>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Value each component separately</p>
          <table className="tbl">
            <thead>
              <tr>
                <th>Component</th>
                <th className="r">Metric</th>
                <th className="r">Multiple</th>
                <th className="r">Value</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const bmnr = compsData.find(c => c.name === 'BMNR');
                const ethHoldings = typeof comparables[0]?.holdings === 'number' ? comparables[0].holdings : 0;
                const ethValue = ethHoldings * ethPrice;
                return [
                  { segment: 'ETH Holdings', basis: 'Spot value', metric: `${(ethHoldings / 1e6).toFixed(2)}M ETH`, multiple: '1.0x', value: ethValue },
                  { segment: 'Staking Yield', basis: '5yr NPV @ 10%', metric: `${comparables[0]?.yield || 0}% APY`, multiple: 'NPV', value: ethValue * (comparables[0]?.yield || 0) / 100 * 3.79 },
                  { segment: 'Operational Premium', basis: 'Management + infrastructure', metric: 'Strategic', multiple: '—', value: ethValue * 0.05 },
                  { segment: 'Growth Optionality', basis: 'Acquisition capacity', metric: 'Option value', multiple: '—', value: ethValue * 0.03 },
                ].map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{s.segment}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.basis}</div>
                    </td>
                    <td className="r">{s.metric}</td>
                    <td className="r">{s.multiple}</td>
                    <td className="r mint">${(s.value / 1e9).toFixed(2)}B</td>
                  </tr>
                ));
              })()}
              <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                <td colSpan={3}>SOTP Total</td>
                <td className="r mint">${((() => {
                  const ethHoldings = typeof comparables[0]?.holdings === 'number' ? comparables[0].holdings : 0;
                  const ethValue = ethHoldings * ethPrice;
                  const yieldNPV = ethValue * (comparables[0]?.yield || 0) / 100 * 3.79;
                  return (ethValue + yieldNPV + ethValue * 0.08) / 1e9;
                })()).toFixed(2)}B</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        {/* NAV Premium Sensitivity */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#nav-premium-sensitivity</div>
          <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>NAV Premium Sensitivity<UpdateIndicators sources={['WS']} /></div>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Stock price at different ETH prices × NAV multiples</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>ETH ↓ / NAV → </th>
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map(m => <th key={m} className="r">{m}x</th>)}
                </tr>
              </thead>
              <tbody>
                {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(ethMult => {
                  const ethHoldings = typeof comparables[0]?.holdings === 'number' ? comparables[0].holdings : 0;
                  const shares = comparables[0]?.shares || 1;
                  const baseNAV = (ethHoldings * ethPrice) / shares;
                  const currentPrice = comparables[0]?.price || 0;
                  return (
                    <tr key={ethMult}>
                      <td style={{ fontWeight: 600 }}>${(ethPrice * ethMult).toLocaleString()}</td>
                      {[0.75, 1.0, 1.25, 1.5, 2.0].map(navMult => {
                        const price = baseNAV * ethMult * navMult;
                        const isNear = ethMult === 1.0 && navMult === 1.0;
                        return (
                          <td key={navMult} className="r" style={isNear ? {
                            background: 'var(--accent-dim)',
                            fontWeight: 600,
                            color: 'var(--accent)'
                          } : { color: price >= currentPrice ? 'var(--mint)' : 'var(--coral)' }}>
                            ${price.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      {/* Competitor News Intelligence Section */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitor-news</div>
      <div className="highlight">
        <h3>📰 Competitor News Intelligence<UpdateIndicators sources="PR" /></h3>
        <p style={{ color: 'var(--text2)', marginBottom: 8 }}>Track what <strong>peer companies</strong> are doing — treasury purchases, financing activities, strategic moves by crypto treasury competitors (Strategy, Marathon, Riot, etc.)</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic' }}>Company-level news affecting BMNR's relative positioning vs competitors</p>
      </div>

      {/* Filter Bar */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitor-filter</div>
      <div className="card" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 4 }}>Filter:</span>
          <button
            onClick={() => setCompetitorFilter('all')}
            className={`filter-btn ${competitorFilter === 'all' ? 'active' : ''}`}
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
                className={`filter-btn ${competitorFilter === comp.id ? 'active' : ''}`}
              >
                {comp.name.split(' ')[0]} ({count})
              </button>
            );
          })}
          {COMPETITOR_NEWS.filter(n => n.competitor === 'other').length > 0 && (
            <button
              onClick={() => setCompetitorFilter('other')}
              className={`filter-btn ${competitorFilter === 'other' ? 'active' : ''}`}
            >
              Other ({COMPETITOR_NEWS.filter(n => n.competitor === 'other').length})
            </button>
          )}
        </div>
      </div>

      {/* News Timeline - Grouped by Company, then by Story */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {companySections.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: 'var(--text3)' }}>No competitor news yet. Add entries to COMPETITOR_NEWS array.</p>
          </div>
        ) : (
          companySections.map((section) => {
            const totalEntries = section.stories.reduce((sum, s) => sum + s.entries.length, 0);
            const oldestDate = section.stories[section.stories.length - 1]?.entries[section.stories[section.stories.length - 1]?.entries.length - 1]?.date || '';
            const newestDate = section.stories[0]?.entries[0]?.date || '';
            return (
            <details key={section.competitorId} className="comp-panel" open>
              <summary>
                <div className="comp-panel-bar">
                  <div className="comp-panel-info">
                    <div className="comp-panel-name">{section.name}</div>
                    <div className="comp-panel-meta">
                      <span className="comp-panel-count">{totalEntries} {totalEntries === 1 ? 'entry' : 'entries'}</span>
                      {oldestDate && newestDate && <span className="comp-panel-dates">{newestDate} — {oldestDate}</span>}
                    </div>
                  </div>
                  <div className="comp-panel-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg></div>
                </div>
              </summary>
              <div className="comp-panel-body">
              {section.stories.map((story) => (
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
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                    {story.entries.length} update{story.entries.length !== 1 ? 's' : ''} • {story.entries[0]?.date} → {story.entries[story.entries.length - 1]?.date}
                  </div>
                </div>
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
                          background: isExpanded ? 'var(--accent)' : 'var(--surface3)',
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
                                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                                    <span style={{ color: 'var(--accent)' }}>•</span>
                                    {d}
                                  </li>
                                ))}
                              </ul>
                              {news.bmnrComparison && (
                                <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--accent-dim)', borderRadius: 6, borderLeft: '3px solid var(--accent)' }}>
                                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)' }}>
                                    BMNR Comparison
                                  </div>
                                  <div style={{ fontSize: 13, color: 'var(--text)' }}>{news.bmnrComparison}</div>
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
                              <div style={{ background: 'var(--surface3)', padding: '8px 12px', borderRadius: 6 }}>
                                <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--text3)' }}>Impact</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: implStyle.color }}>
                                  {news.implication === 'positive' ? 'Favorable' : news.implication === 'negative' ? 'Threat' : 'Neutral'}
                                </div>
                              </div>
                              {news.source && (
                                <div style={{ background: 'var(--surface3)', padding: '8px 12px', borderRadius: 6 }}>
                                  <div style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--text3)' }}>Source</div>
                                  <div style={{ fontSize: 11 }}>
                                    {news.sourceUrl ? (
                                      <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
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
              ))}
              </div>
            </details>
            );
          })
        )}
      </div>

      {/* Competitor Profiles (Collapsible) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#competitor-profiles</div>
      <div className="card">
        <div className="card-title">📋 Competitor Profiles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {COMPETITOR_PROFILES.map(comp => (
            <div key={comp.id} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{comp.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{comp.description}</div>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  background: comp.cryptoType === 'ETH' ? 'var(--violet-dim)' : comp.cryptoType === 'BTC' ? 'var(--gold-dim)' : 'var(--surface3)',
                  color: comp.cryptoType === 'ETH' ? 'var(--violet)' : comp.cryptoType === 'BTC' ? 'var(--gold)' : 'var(--text2)'
                }}>
                  {comp.cryptoType}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Ticker</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.ticker}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Status</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.currentStatus}</div>
                </div>
                {comp.keyMetrics?.holdings && (
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Holdings</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.keyMetrics.holdings}</div>
                  </div>
                )}
                {comp.keyMetrics?.yieldRate && (
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Yield</div>
                    <div style={{ fontSize: 12, color: comp.keyMetrics.yieldRate === '0%' ? 'var(--coral)' : 'var(--mint)' }}>{comp.keyMetrics.yieldRate}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Comparable Analysis" items={[
        { term: 'Relative Valuation', def: 'Benchmarks BMNR against peers. If MSTR trades at 2x NAV and BMNR at 1.2x, is BMNR undervalued or MSTR overvalued? Context matters.' },
        { term: 'Crypto/Share', def: 'Fundamental backing metric. Higher = more crypto per share of ownership. Affected by dilution and accumulation.' },
        { term: 'NAV Premium', def: 'Market sentiment indicator. Premium implies growth expectations; discount implies skepticism or liquidity concerns.' },
        { term: 'MSTR (MicroStrategy)', def: 'BTC treasury pioneer with ~528K BTC. Trades at significant premium. No yield generation capability.' },
        { term: 'ETH Yield Advantage', def: 'ETH staking generates 3-5% APY vs BTC\'s 0%. This compounds NAV even if crypto price is flat — structural advantage.' },
      ]} />
    </div>
  );
};

// SENSITIVITY TAB
const SensitivityTab = ({ calc, currentETH, currentShares, ethPrice }) => {
  const matrix = useMemo(() => [0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0].map(em => ({ ethMult: em, ethPrice: ethPrice * em, scenarios: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(nm => ({ navMult: nm, price: ((currentETH * ethPrice * em) / (currentShares * 1e6)) * nm })) })), [currentETH, currentShares, ethPrice]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sensitivity-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Sensitivity<UpdateIndicators sources={['PR', 'SEC']} /></h2>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sensitivity-intro</div>
      <div className="highlight"><h3>Price Matrix & Tornado</h3>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>Two-variable sensitivity showing stock price at different ETH prices and NAV multiples. Tornado chart shows parameter impact ranking.</p>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#price-matrix</div>
      <div className="card"><div className="card-title">Price Matrix</div>
        <table className="tbl"><thead><tr><th>ETH</th>{[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(nm => <th key={nm} className="c">{nm}x NAV</th>)}</tr></thead>
        <tbody>{matrix.map(row => (<tr key={row.ethMult} style={row.ethMult === 1.0 ? { background: 'var(--accent-dim)' } : undefined}><td style={{ fontWeight: 500 }}>${row.ethPrice.toLocaleString()} ({row.ethMult}x)</td>{row.scenarios.map(s => (<td key={s.navMult} className="c" style={row.ethMult === 1.0 && s.navMult === 1.0 ? { background: 'var(--accent-dim)', fontWeight: 600 } : undefined}><span style={{ color: s.price >= calc.currentNAV ? 'var(--mint)' : 'var(--coral)' }}>${s.price.toFixed(2)}</span></td>))}</tr>))}</tbody></table>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#tornado-chart</div>
      <div className="card"><div className="card-title">Tornado Chart (±20%)</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>{[{ param: 'ETH Price', down: -20, up: 20 }, { param: 'NAV Multiple', down: -20, up: 20 }, { param: 'ETH Holdings', down: -20, up: 20 }, { param: 'Shares Out', down: 25, up: -17 }].map(t => (<div key={t.param} style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 112, fontSize: 14, color: 'var(--text2)' }}>{t.param}</div><div style={{ flex: 1, height: 32, background: 'var(--surface)', borderRadius: 4, position: 'relative' }}><div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--border)' }} /><div style={{ position: 'absolute', height: '100%', background: 'var(--coral-dim)', right: '50%', width: `${Math.abs(Math.min(t.down, 0)) * 2}%` }} /><div style={{ position: 'absolute', height: '100%', background: 'var(--mint-dim)', left: '50%', width: `${Math.max(t.up, 0) * 2}%` }} /><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500 }}><span style={{ color: 'var(--coral)' }}>{t.down}%</span><span style={{ color: 'var(--mint)' }}>{t.up > 0 ? '+' : ''}{t.up}%</span></div></div></div>))}</div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Sensitivity Analysis" items={[
        { term: 'Two-Variable Matrix', def: 'Rows = ETH price (0.25x to 3x current). Columns = NAV multiple (0.5x discount to 2x premium). Cell = implied stock price at that combination.' },
        { term: 'Bull/Bear Scenarios', def: 'Bull case = top right (ETH 3x, NAV 2x). Bear case = bottom left (ETH 0.25x, NAV 0.5x). Current state highlighted in matrix.' },
        { term: 'Tornado Chart', def: 'Shows which parameter moves stock price most. ETH price and NAV multiple have symmetric ±20% impact. Shares has inverse relationship.' },
        { term: 'Portfolio Risk', def: 'Useful for position sizing. If ±20% ETH move = ±20% stock move, exposure is roughly 1:1. Leverage through NAV premium amplifies.' },
      ]} />
    </div>
  );
};

// BACKTEST TAB with Stock Price
const BacktestTab = ({ currentETH, currentShares, currentStockPrice, historicalETH, baseStakingAPY, navMultiple }) => {
  const [startYear, setStartYear] = useState(2020);
  const [includeYield, setIncludeYield] = useState(true);
  const [assumedMult, setAssumedMult] = useState(navMultiple);
  const data = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const result = []; let cumYield = 0, startNav = 0;
    Object.entries(historicalETH).forEach(([year, prices]) => {
      if (parseInt(year) >= startYear) prices.forEach((price, idx) => {
        if (idx < 12) { cumYield = includeYield ? (1 + cumYield) * (1 + baseStakingAPY / 12 / 100) - 1 : 0; const nav = (currentETH * price * (1 + cumYield)) / (currentShares * 1e6); const stockPrice = nav * assumedMult; if (startNav === 0) startNav = nav; result.push({ date: `${months[idx]} ${year.slice(2)}`, ethPrice: price, nav, stockPrice }); }
      });
    });
    return { data: result, startNav };
  }, [currentETH, currentShares, historicalETH, startYear, includeYield, baseStakingAPY, assumedMult]);
  const stats = useMemo(() => { if (data.data.length === 0) return null; const navs = data.data.map(d => d.nav); const prices = data.data.map(d => d.stockPrice); return { currentNav: navs[navs.length - 1], currentPrice: prices[prices.length - 1], totalReturn: ((navs[navs.length - 1] / data.startNav) - 1) * 100, maxNav: Math.max(...navs), minNav: Math.min(...navs), maxDD: ((Math.min(...navs) - Math.max(...navs)) / Math.max(...navs)) * 100, maxPrice: Math.max(...prices), minPrice: Math.min(...prices) }; }, [data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#backtest-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Backtest<UpdateIndicators sources={['PR', 'SEC']} /></h2>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#backtest-intro</div>
      <div className="highlight"><h3>Historical NAV Simulation</h3>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>What would NAV have been at historical ETH prices? Toggle staking yield to see compounding effect. Caveat: illustrative only.</p>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#backtest-settings</div>
      <div className="card"><div className="card-title">Settings</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}><label style={{ fontSize: 14, color: 'var(--text3)' }}>Start:</label><select value={startYear} onChange={e => setStartYear(Number(e.target.value))} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 12px', fontSize: 14, color: 'var(--text1)' }}>{[2020, 2021, 2022, 2023, 2024].map(y => <option key={y} value={y}>{y}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" checked={includeYield} onChange={e => setIncludeYield(e.target.checked)} style={{ width: 16, height: 16 }} /><span style={{ fontSize: 14 }}>Include Yield ({baseStakingAPY}%)</span></label>
          <div style={{ display: 'flex', alignItems: 'center' }}><label style={{ fontSize: 14, color: 'var(--text3)' }}>NAV Multiple:</label><input type="number" value={assumedMult} onChange={e => setAssumedMult(Number(e.target.value))} step={0.1} min={0.5} max={3} style={{ width: 80, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px', fontSize: 14, color: 'var(--text1)' }} /></div>
        </div>
      </div>
      {stats && (<><div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#backtest-results</div>
      <div className="g4"><Card label="Total Return" value={`${stats.totalReturn >= 0 ? '+' : ''}${stats.totalReturn.toFixed(0)}%`} sub={`Since ${startYear}`} color={stats.totalReturn >= 0 ? 'green' : 'red'} /><Card label="Current NAV" value={`$${stats.currentNav.toFixed(2)}`} sub="Latest" color="blue" /><Card label="Stock Price" value={`$${stats.currentPrice.toFixed(2)}`} sub={`At ${assumedMult.toFixed(1)}x`} color="green" /><Card label="Max Drawdown" value={`${stats.maxDD.toFixed(0)}%`} sub="Peak to trough" color="red" /></div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#backtest-chart</div>
      <div className="card"><div className="card-title">Historical NAV & Stock Price</div>
        <ResponsiveContainer width="100%" height={350}><AreaChart data={data.data}><defs><linearGradient id="navGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient><linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="date" stroke="var(--text3)" tick={{ fontSize: 10 }} interval="preserveStartEnd" /><YAxis stroke="var(--text3)" tickFormatter={v => `$${v.toFixed(0)}`} /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px' }} formatter={(v, name) => [`$${v.toFixed(2)}`, name === 'nav' ? 'NAV' : 'Stock']} /><Area type="monotone" dataKey="nav" stroke="var(--violet)" strokeWidth={2} fill="url(#navGrad)" name="nav" /><Area type="monotone" dataKey="stockPrice" stroke="var(--mint)" strokeWidth={2} fill="url(#priceGrad)" name="stockPrice" /></AreaChart></ResponsiveContainer>
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: 12 }}><div style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 12, height: 2, background: 'var(--violet)' }} /> NAV</div><div style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 12, height: 2, background: 'var(--mint)' }} /> Stock ({assumedMult.toFixed(1)}x)</div></div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Historical Backtest" items={[
        { term: 'Hypothetical Analysis', def: 'Shows what NAV and stock price would have been if today\'s ETH holdings existed at historical prices. Caveat: BMNR didn\'t exist then — illustrative only.' },
        { term: 'Yield Toggle', def: 'With yield = staking compounds monthly, showing how yield adds NAV even in flat/down markets. Without = pure ETH price exposure.' },
        { term: 'Max Drawdown', def: 'Largest peak-to-trough decline. Critical risk metric. If max DD is -80%, can you tolerate that? Does leverage blow up?' },
        { term: 'NAV Multiple', def: 'Stock Price = NAV × multiple. Adjust to see how premium/discount affects historical trading prices.' },
        { term: 'Risk Assessment', def: 'Historical volatility indicates expected future volatility. Use for position sizing and risk budgeting.' },
      ]} />
      </>)}
    </div>
  );
};

// DCF TAB - Enhanced with intermediate cash flow option
const DCFTab = ({ calc, currentETH, currentShares, ethPrice, baseStakingAPY, quarterlyDividend, dividendGrowthRate }) => {
  const [ethGrowth, setEthGrowth] = useState(15);
  const [discount, setDiscount] = useState(12);
  const [terminalMult, setTerminalMult] = useState(1.0);
  const [years, setYears] = useState(5);
  const [dcfMethod, setDcfMethod] = useState('dividend'); // 'terminal', 'intermediate', or 'dividend'
  const [yieldPayout, setYieldPayout] = useState(50); // % of staking yield distributed as CF
  
  const dcf = useMemo(() => {
    const projections = []; 
    let eth = currentETH;
    let sumIntermediatePV = 0;
    let sumDividendPV = 0;
    const annualDiv = quarterlyDividend * 4;
    
    for (let y = 1; y <= years; y++) { 
      const yieldETH = eth * (baseStakingAPY / 100);
      eth += yieldETH; 
      const futurePrice = ethPrice * Math.pow(1 + ethGrowth / 100, y); 
      const nav = (eth * futurePrice) / (currentShares * 1e6); 
      const pv = nav / Math.pow(1 + discount / 100, y);
      
      // Intermediate cash flow: portion of staking yield distributed
      const yieldValue = yieldETH * futurePrice;
      const distributedCF = yieldValue * (yieldPayout / 100);
      const cfPerShare = distributedCF / (currentShares * 1e6);
      const cfPV = cfPerShare / Math.pow(1 + discount / 100, y);
      sumIntermediatePV += cfPV;
      
      // Dividend cash flow with growth
      const yearDiv = annualDiv * Math.pow(1 + dividendGrowthRate / 100, y - 1);
      const divPV = yearDiv / Math.pow(1 + discount / 100, y);
      sumDividendPV += divPV;
      
      projections.push({ year: y, eth, ethPrice: futurePrice, nav, pv, yieldETH, cfPerShare, cfPV, yearDiv, divPV }); 
    }
    
    const terminalNAV = projections[projections.length - 1].nav * terminalMult;
    const terminalPV = terminalNAV / Math.pow(1 + discount / 100, years);
    
    // Calculate implied value based on method
    let impliedValue;
    if (dcfMethod === 'terminal') {
      impliedValue = terminalPV;
    } else if (dcfMethod === 'intermediate') {
      impliedValue = sumIntermediatePV + terminalPV;
    } else { // dividend
      impliedValue = sumDividendPV + terminalPV;
    }
    
    return { 
      projections, 
      terminalNAV, 
      terminalPV, 
      sumIntermediatePV,
      sumDividendPV,
      impliedValue, 
      upside: ((impliedValue / calc.currentNAV) - 1) * 100 
    };
  }, [currentETH, currentShares, ethPrice, baseStakingAPY, ethGrowth, discount, terminalMult, years, calc.currentNAV, dcfMethod, yieldPayout, quarterlyDividend, dividendGrowthRate]);
  
  const irr = (Math.pow(dcf.impliedValue / calc.currentNAV, 1 / years) - 1) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>DCF<UpdateIndicators sources={['PR', 'SEC']} /></h2>
      <div className="highlight"><h3>DCF Valuation</h3>
        <p className="text-sm">DCF valuation with three methods: terminal NAV only, with staking cash flows, or with declared dividends. Adjust growth and discount rate.</p>
      </div>
      
      {/* DCF Method Selector */}
      <div className="card"><div className="card-title">DCF Method</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button
            onClick={() => setDcfMethod('terminal')}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              fontWeight: 500,
              border: dcfMethod === 'terminal' ? '2px solid var(--violet)' : '1px solid var(--border)',
              background: dcfMethod === 'terminal' ? 'rgba(139,92,246,0.2)' : 'var(--surface2)',
              color: dcfMethod === 'terminal' ? 'var(--violet)' : 'var(--text2)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Terminal Only
          </button>
          <button
            onClick={() => setDcfMethod('intermediate')}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              fontWeight: 500,
              border: dcfMethod === 'intermediate' ? '2px solid var(--sky)' : '1px solid var(--border)',
              background: dcfMethod === 'intermediate' ? 'rgba(56,189,248,0.2)' : 'var(--surface2)',
              color: dcfMethod === 'intermediate' ? 'var(--sky)' : 'var(--text2)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            With Staking CFs
          </button>
          <button
            onClick={() => setDcfMethod('dividend')}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              fontWeight: 500,
              border: dcfMethod === 'dividend' ? '2px solid var(--mint)' : '1px solid var(--border)',
              background: dcfMethod === 'dividend' ? 'rgba(0,212,170,0.2)' : 'var(--surface2)',
              color: dcfMethod === 'dividend' ? 'var(--mint)' : 'var(--text2)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            With Dividends
          </button>
        </div>
        {dcfMethod === 'intermediate' && (
          <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 14, color: 'var(--sky)' }}>Yield Payout Ratio:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={yieldPayout}
                onChange={e => setYieldPayout(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: 14, fontFamily: "'Space Mono', monospace", color: 'var(--sky)', width: 48 }}>{yieldPayout}%</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text3)' }}>% of annual staking yield treated as distributed cash flow</p>
          </div>
        )}
        {dcfMethod === 'dividend' && (
          <div style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, fontSize: 14 }}>
              <div>
                <span style={{ color: 'var(--mint)' }}>Current Quarterly Dividend:</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: 'var(--mint)', marginLeft: 8 }}>${quarterlyDividend.toFixed(2)}</span>
              </div>
              <div>
                <span style={{ color: 'var(--mint)' }}>Annual Dividend:</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: 'var(--mint)', marginLeft: 8 }}>${(quarterlyDividend * 4).toFixed(2)}</span>
              </div>
              <div>
                <span style={{ color: 'var(--mint)' }}>Dividend Growth Rate:</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: 'var(--mint)', marginLeft: 8 }}>{dividendGrowthRate}%/yr</span>
              </div>
              <div>
                <span style={{ color: 'var(--mint)' }}>Current Yield:</span>
                <span style={{ fontFamily: "'Space Mono', monospace", color: 'var(--mint)', marginLeft: 8 }}>{calc.dividendYield.toFixed(2)}%</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text3)' }}>Based on declared $0.01/qtr dividend (first payment Dec 29, 2025). Adjust growth rate in Overview tab.</p>
          </div>
        )}
      </div>
      
      <div className="g2">
        <div className="card">
          <div className="card-title">Model Inputs</div>
          <div className="g2">
            <Input label="ETH Growth (%/yr)" value={ethGrowth} onChange={setEthGrowth} />
            <Input label="Discount Rate (%)" value={discount} onChange={setDiscount} />
          </div>
          <div className="g2" style={{ }}>
            <Input label="Terminal Multiple" value={terminalMult} onChange={setTerminalMult} step={0.1} />
            <Input label="Years" value={years} onChange={setYears} min={1} max={10} />
          </div>
        </div>
        <div className="card">
          <div className="card-title">Valuation Output</div>
          <div className="g2">
            <Card label="Implied Value" value={`$${dcf.impliedValue.toFixed(2)}`} sub={dcfMethod === 'intermediate' ? 'CFs + Terminal' : dcfMethod === 'dividend' ? 'Divs + Terminal' : 'Terminal only'} color="mint" />
            <Card label="Current NAV" value={`$${calc.currentNAV.toFixed(2)}`} sub="Book value" />
          </div>
          <div className="g2" style={{ }}>
            <Card label="Upside" value={`${dcf.upside >= 0 ? '+' : ''}${dcf.upside.toFixed(0)}%`} sub="vs NAV" color={dcf.upside >= 0 ? 'green' : 'red'} />
            <Card label="Implied IRR" value={`${irr.toFixed(1)}%`} sub="Annualized" />
          </div>
          {dcfMethod === 'intermediate' && (
            <div className="g2" style={{ }}>
              <Card label="PV of Cash Flows" value={`$${dcf.sumIntermediatePV.toFixed(2)}`} sub={`${years}yr yield @ ${yieldPayout}% payout`} color="cyan" />
              <Card label="PV of Terminal" value={`$${dcf.terminalPV.toFixed(2)}`} sub={`Year ${years} exit`} color="violet" />
            </div>
          )}
          {dcfMethod === 'dividend' && (
            <div className="g2" style={{ }}>
              <Card label="PV of Dividends" value={`$${dcf.sumDividendPV.toFixed(2)}`} sub={`${years}yr @ ${dividendGrowthRate}% growth`} color="mint" />
              <Card label="PV of Terminal" value={`$${dcf.terminalPV.toFixed(2)}`} sub={`Year ${years} exit`} color="violet" />
            </div>
          )}
        </div>
      </div>
      
      <div className="card"><div className="card-title">Projections</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Year</th>
                <th className="r">ETH</th>
                <th className="r">ETH Price</th>
                <th className="r">NAV</th>
                {dcfMethod === 'intermediate' && (
                  <>
                    <th className="r">Yield ETH</th>
                    <th className="r">CF/Share</th>
                    <th className="r">CF PV</th>
                  </>
                )}
                {dcfMethod === 'dividend' && (
                  <>
                    <th className="r">Dividend</th>
                    <th className="r">Div PV</th>
                  </>
                )}
                <th className="r">NAV PV</th>
              </tr>
            </thead>
            <tbody>
              {dcf.projections.map(p => (
                <tr key={p.year}>
                  <td style={{ fontWeight: 500 }}>{p.year}</td>
                  <td className="r">{(p.eth / 1e6).toFixed(2)}M</td>
                  <td className="r">${p.ethPrice.toFixed(0)}</td>
                  <td className="r">${p.nav.toFixed(2)}</td>
                  {dcfMethod === 'intermediate' && (
                    <>
                      <td className="r" style={{ color: 'var(--mint)' }}>+{Math.round(p.yieldETH).toLocaleString()}</td>
                      <td className="r" style={{ color: 'var(--sky)' }}>${p.cfPerShare.toFixed(2)}</td>
                      <td className="r" style={{ color: 'var(--sky)' }}>${p.cfPV.toFixed(2)}</td>
                    </>
                  )}
                  {dcfMethod === 'dividend' && (
                    <>
                      <td className="r" style={{ color: 'var(--mint)' }}>${p.yearDiv.toFixed(2)}</td>
                      <td className="r" style={{ color: 'var(--mint)' }}>${p.divPV.toFixed(2)}</td>
                    </>
                  )}
                  <td className="r" style={{ fontWeight: 500 }}>${p.pv.toFixed(2)}</td>
                </tr>
              ))}
              {dcfMethod === 'intermediate' && (
                <tr style={{ borderTop: '2px solid var(--border)', background: 'var(--surface2)' }}>
                  <td style={{ fontWeight: 500 }}>Sum CFs</td>
                  <td colSpan={5}></td>
                  <td className="r" style={{ fontWeight: 500, color: 'var(--cyan)' }}>${dcf.sumIntermediatePV.toFixed(2)}</td>
                  <td></td>
                </tr>
              )}
              {dcfMethod === 'dividend' && (
                <tr style={{ borderTop: '2px solid var(--border)', background: 'var(--surface2)' }}>
                  <td style={{ fontWeight: 500 }}>Sum Dividends</td>
                  <td colSpan={3}></td>
                  <td colSpan={2} className="r" style={{ fontWeight: 500, color: 'var(--mint)' }}>${dcf.sumDividendPV.toFixed(2)}</td>
                  <td></td>
                </tr>
              )}
              <tr style={{ background: 'var(--surface2)' }}>
                <td style={{ fontWeight: 500 }}>Terminal</td>
                <td colSpan={dcfMethod === 'terminal' ? 2 : dcfMethod === 'intermediate' ? 5 : 4}></td>
                <td className="r">${dcf.terminalNAV.toFixed(2)}</td>
                <td className="r" style={{ fontWeight: 500 }}>${dcf.terminalPV.toFixed(2)}</td>
              </tr>
              <tr style={{ background: 'rgba(0,212,170,0.1)' }}>
                <td style={{ fontWeight: 700 }}>TOTAL</td>
                <td colSpan={dcfMethod === 'terminal' ? 3 : dcfMethod === 'intermediate' ? 6 : 5}></td>
                <td className="r" style={{ fontWeight: 700, color: 'var(--mint)' }}>${dcf.impliedValue.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <CFANotes title="CFA Level III — DCF Valuation" items={[
        { term: 'Terminal Only Method', def: 'Assumes all value realized at exit. Projects NAV growth from ETH appreciation + staking yield, discounts back to today. Pure growth investor perspective.' },
        { term: 'With Staking CFs Method', def: 'Treats portion of staking yield as distributable cash flow. More conservative — values both interim cash flows and terminal NAV.' },
        { term: 'With Dividends Method', def: 'Uses actual declared dividend ($0.01/qtr) with projected growth rate. Income investor perspective — DDM-style valuation.' },
        { term: 'Discount Rate', def: 'Required return for this risk level. Higher = lower present value. Crypto: 12-20% typical for equity risk.' },
        { term: 'Terminal Multiple', def: 'NAV multiple at exit year. 1.0x = exit at NAV, >1x = premium persists, <1x = discount.' },
        { term: 'Implied IRR', def: 'Annualized return if you buy at current NAV and sell at implied value. IRR = (FV/PV)^(1/n) - 1.' },
      ]} />
    </div>
  );
};

// MONTE CARLO TAB with visible risk metrics
const MonteCarloTab = ({ currentETH, currentShares, currentStockPrice, ethPrice, stakingYield, slashingRisk, liquidityDiscount, operatingCosts, regulatoryRisk }: {
  currentETH: number;
  currentShares: number;
  currentStockPrice: number;
  ethPrice: number;
  stakingYield: number;
  slashingRisk: number;
  liquidityDiscount: number;
  operatingCosts: number;
  regulatoryRisk: number;
}) => {
  const [years, setYears] = useState(3);
  const [sims, setSims] = useState(5000);
  const [drift, setDrift] = useState(12);
  const [vol, setVol] = useState(65);
  const [multVol, setMultVol] = useState(20);
  const [corr, setCorr] = useState(0.3);
  const [runKey, setRunKey] = useState(0);
  const [activePreset, setActivePreset] = useState('base');
  
  // C2 FIX: Safe division to prevent Infinity/NaN when shares is 0
  const currentNAV = safeDivide(currentETH * ethPrice, currentShares * 1e6, 0);
  
  // Box-Muller transform for standard normal random variates
  const boxMuller = (): number => { 
    let u = 0, v = 0; 
    while (u === 0) u = Math.random(); 
    while (v === 0) v = Math.random(); 
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); 
  };
  
  // C1 FIX: Correlated normal generation with bounds-checked correlation coefficient
  const corrNormals = (rho: number): [number, number] => { 
    // Clamp correlation to valid range [-1, 1] to prevent NaN from sqrt of negative
    const safeRho = clamp(rho, MIN_CORRELATION, MAX_CORRELATION);
    const z1 = boxMuller(), z2 = boxMuller(); 
    // Additional safety: ensure sqrt argument is non-negative due to floating point
    const sqrtTerm = Math.sqrt(Math.max(0, 1 - safeRho * safeRho));
    return [z1, safeRho * z1 + sqrtTerm * z2]; 
  };

  // Scenario presets for ETH/mNAV dynamics
  const presets = {
    bear: { drift: -5, vol: 80, multVol: 30, corr: 0.5, label: '🐻 Bear', desc: 'ETH decline, high volatility, mNAV compression' },
    base: { drift: 12, vol: 65, multVol: 20, corr: 0.3, label: '📊 Base', desc: 'Moderate ETH growth, historical volatility' },
    bull: { drift: 30, vol: 55, multVol: 15, corr: 0.2, label: '🐂 Bull', desc: 'Strong ETH rally, lower vol, mNAV expansion' },
    custom: { drift, vol, multVol, corr, label: '⚙️ Custom', desc: 'Your custom parameters' }
  };

  const loadPreset = (key: string) => {
    if (key === 'custom') {
      setActivePreset('custom');
      return;
    }
    const p = presets[key];
    setDrift(p.drift);
    setVol(p.vol);
    setMultVol(p.multVol);
    setCorr(p.corr);
    setActivePreset(key);
  };

  const updateParam = (setter) => (val) => {
    setter(val);
    setActivePreset('custom');
  };

  const sim = useMemo(() => {
    // N2: Using named constants instead of magic numbers
    const dt = 1 / TRADING_DAYS_PER_YEAR;
    const steps = Math.floor(years * TRADING_DAYS_PER_YEAR);
    const mu = drift / 100, sigma = vol / 100, mSigma = multVol / 100;
    const yld = stakingYield / 100, slash = slashingRisk / 100, liq = liquidityDiscount / 100, op = operatingCosts / 100, reg = regulatoryRisk / 100;
    const finals: number[] = [], paths: number[][] = [], stepData: number[][] = Array.from({ length: 21 }, () => []), maxDDs: number[] = [];
    
    for (let i = 0; i < sims; i++) {
      let price = currentNAV, mult = 1.0, peak = price, maxDD = 0; 
      const path: number[] = [price];
      
      for (let s = 1; s <= steps; s++) {
        const [z1, z2] = corrNormals(corr);
        // GBM price evolution with drift, yield, and costs
        price *= Math.exp((mu + yld - slash - op - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z1);
        // NAV multiple with mean reversion and bounds (N2: using named constants)
        mult = Math.max(MIN_NAV_MULTIPLE, Math.min(MAX_NAV_MULTIPLE, 
          mult * Math.exp((NAV_MULTIPLE_MEAN_REVERSION * (mult - 1.0)) * dt + mSigma * Math.sqrt(dt) * z2)));
        const sp = price * mult * (1 - liq) * (1 - reg);
        if (sp > peak) peak = sp; 
        const dd = (peak - sp) / peak; 
        if (dd > maxDD) maxDD = dd;
        const interval = Math.floor(steps / 20);
        if (s % interval === 0 || s === steps) { 
          const idx = Math.min(Math.floor(s / interval), 20); 
          stepData[idx]?.push(sp); 
          if (i < 100) path.push(sp); 
        }
      }
      finals.push(price * mult * (1 - liq) * (1 - reg)); 
      maxDDs.push(maxDD); 
      if (i < 100) paths.push(path);
    }
    
    const sorted = [...finals].sort((a, b) => a - b), n = sorted.length;
    const p5 = sorted[Math.floor(n * 0.05)], p25 = sorted[Math.floor(n * 0.25)], p50 = sorted[Math.floor(n * 0.50)], p75 = sorted[Math.floor(n * 0.75)], p95 = sorted[Math.floor(n * 0.95)];
    const winProb = finals.filter(f => f > currentNAV).length / n * 100;
    const var5 = safeNumber(((p5 - currentNAV) / currentNAV) * 100);
    const cvar5Arr = sorted.slice(0, Math.floor(n * 0.05)); 
    const cvar5 = cvar5Arr.length > 0 ? cvar5Arr.reduce((a, b) => a + b, 0) / cvar5Arr.length : p5;
    const cvar5Pct = safeNumber(((cvar5 - currentNAV) / currentNAV) * 100);
    const returns = finals.map(f => Math.log(f / currentNAV) / years); 
    const avgRet = returns.reduce((a, b) => a + b, 0) / n;
    const variance = returns.reduce((a, b) => a + (b - avgRet) ** 2, 0) / n; 
    const annualVol = Math.sqrt(variance) * 100;
    // N2: Using RISK_FREE_RATE constant for Sharpe ratio
    const sharpe = annualVol > 0 ? (avgRet * 100 - RISK_FREE_RATE) / annualVol : 0;
    const riskFreeDecimal = RISK_FREE_RATE / 100;
    const downRet = returns.filter(r => r < riskFreeDecimal); 
    const downVar = downRet.length > 0 ? downRet.reduce((a, b) => a + (b - riskFreeDecimal) ** 2, 0) / downRet.length : 0;
    // N2: Using RISK_FREE_RATE constant for Sortino ratio
    const sortino = Math.sqrt(downVar) > 0 ? (avgRet * 100 - RISK_FREE_RATE) / (Math.sqrt(downVar) * 100) : 0;
    const avgMaxDD = maxDDs.reduce((a, b) => a + b, 0) / maxDDs.length * 100;
    const medianMaxDD = [...maxDDs].sort((a, b) => a - b)[Math.floor(n / 2)] * 100;
    const percentiles = stepData.map((prices) => { 
      if (prices.length === 0) return { p5: 0, p50: 0, p95: 0 }; 
      const s = [...prices].sort((a, b) => a - b), len = s.length; 
      return { p5: s[Math.floor(len * 0.05)] || s[0], p50: s[Math.floor(len * 0.50)] || s[0], p95: s[Math.floor(len * 0.95)] || s[0] }; 
    });
    const min = sorted[0], max = sorted[n - 1], buckets = 25, size = (max - min) / buckets;
    const histogram = Array.from({ length: buckets }, (_, i) => { 
      const start = min + i * size; 
      const count = finals.filter(f => f >= start && f < start + size).length; 
      return { price: start + size / 2, pct: (count / n) * 100 }; 
    });
    const mean = finals.reduce((a, b) => a + b, 0) / n;
    return { p5, p25, p50, p75, p95, mean, winProb, var5, cvar5Pct, sharpe, sortino, avgMaxDD, medianMaxDD, annualVol, percentiles, paths, histogram };
  }, [currentNAV, years, sims, drift, vol, multVol, corr, stakingYield, slashingRisk, liquidityDiscount, operatingCosts, regulatoryRisk, runKey]);

  const fanData = sim.percentiles.map((p, i) => ({ year: ((i / 20) * years).toFixed(1), ...p }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-header</div>
        <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Monte Carlo<UpdateIndicators sources={['PR', 'SEC']} /></h2>
      </div>

      {/* Highlight Box */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-description</div>
        <div className="highlight" style={{ }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>GBM Price Path Simulation</h3>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>
            Runs {sims.toLocaleString()} simulations over {years} years using Geometric Brownian Motion for ETH price
            with correlated NAV multiple dynamics. Includes staking yield, slashing, and liquidity discounts.
          </p>
        </div>
      </div>

      {/* Scenario Presets */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-scenarios</div>
        <div className="card" style={{ }}>
          <div className="card-title">Select Scenario</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {Object.entries(presets).map(([key, p]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  textAlign: 'left',
                  border: `2px solid ${activePreset === key ? 'var(--accent)' : 'transparent'}`,
                  background: activePreset === key ? 'var(--accent-dim)' : 'var(--surface2)',
                  color: activePreset === key ? 'var(--accent)' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizon & Simulation Controls */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-controls</div>
        <div className="g2" style={{ }}>
          <div className="card" style={{ }}>
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
                    border: years === yr ? '2px solid var(--accent)' : '2px solid transparent',
                    background: years === yr ? 'var(--accent-dim)' : 'var(--surface2)',
                    color: years === yr ? 'var(--accent)' : 'var(--text2)',
                    cursor: 'pointer',
                    fontWeight: years === yr ? 700 : 400,
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
          <div className="card" style={{ }}>
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
                    border: sims === simCount ? '2px solid var(--accent)' : '2px solid transparent',
                    background: sims === simCount ? 'var(--accent-dim)' : 'var(--surface2)',
                    color: sims === simCount ? 'var(--accent)' : 'var(--text2)',
                    cursor: 'pointer',
                    fontWeight: sims === simCount ? 700 : 400,
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

      {/* Parameters - Model Tab Style */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-parameters</div>
        <h3 style={{ color: 'var(--accent)' }}>GBM Parameters</h3>
        <div className="g2" style={{ }}>
          <div className="card" style={{ }}>
            <div className="card-title">ETH Drift (%)</div>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Expected annual ETH price appreciation. Negative = bear, positive = bull.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[-10, -5, 5, 12, 20, 30].map((opt, idx) => {
                const isActive = drift === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setDrift)(opt)} style={{
                    padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                    border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                    background: isActive ? colors.bg : 'var(--surface2)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? colors.text : 'var(--text3)',
                    transition: 'all 0.15s'
                  }}>{opt > 0 ? '+' : ''}{opt}%</div>
                );
              })}
            </div>
          </div>
          <div className="card" style={{ }}>
            <div className="card-title">ETH Volatility (%)</div>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Annual volatility. Crypto typically 50-80%. Higher = wider outcomes.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[90, 80, 70, 65, 55, 45].map((opt, idx) => {
                const isActive = vol === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setVol)(opt)} style={{
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

        <h3 style={{ color: 'var(--mint)' }}>NAV Multiple Dynamics</h3>
        <div className="g2" style={{ }}>
          <div className="card" style={{ }}>
            <div className="card-title">Multiple Volatility (%)</div>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              How much the NAV multiple (mNAV) varies. Higher = more premium/discount swings.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[40, 35, 30, 25, 20, 15].map((opt, idx) => {
                const isActive = multVol === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setMultVol)(opt)} style={{
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
          <div className="card" style={{ }}>
            <div className="card-title">ETH-Multiple Correlation</div>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              How NAV multiple moves with ETH. Higher = more correlated swings.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[0.6, 0.5, 0.4, 0.3, 0.2, 0.1].map((opt, idx) => {
                const isActive = Math.abs(corr - opt) < 0.05;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setCorr)(opt)} style={{
                    padding: '10px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                    border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                    background: isActive ? colors.bg : 'var(--surface2)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? colors.text : 'var(--text3)',
                    transition: 'all 0.15s'
                  }}>{opt}</div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current NAV Info */}
        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8, fontSize: 12, color: 'var(--text3)' }}>
          Current NAV: <strong style={{ color: 'var(--accent)' }}>${currentNAV.toFixed(0)}</strong> | Adjustments: +{stakingYield.toFixed(1)}% yield, -{slashingRisk}% slash, -{liquidityDiscount + regulatoryRisk}% disc
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
        <table className="tbl" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Percentile</th>
              <th className="r">Price Target</th>
              <th className="r">vs Current</th>
              <th className="r">Implied Return</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'P5 (Bear Case)', value: sim.p5 },
              { label: 'P25', value: sim.p25 },
              { label: 'P50 (Median)', value: sim.p50, highlight: true },
              { label: 'P75', value: sim.p75 },
              { label: 'P95 (Bull Case)', value: sim.p95 },
            ].map((row, i) => {
              const pctChange = ((row.value / currentNAV - 1) * 100);
              return (
                <tr key={i} style={row.highlight ? { background: 'var(--accent-dim)' } : {}}>
                  <td style={{ fontWeight: row.highlight ? 600 : 400, color: row.highlight ? 'var(--accent)' : 'var(--text2)' }}>{row.label}</td>
                  <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--accent)' : 'var(--text)' }}>${row.value.toFixed(2)}</td>
                  <td className="r" style={{ fontFamily: 'Space Mono', color: 'var(--text2)' }}>${(row.value - currentNAV).toFixed(2)}</td>
                  <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 500, color: pctChange >= 0 ? 'var(--mint)' : 'var(--red)' }}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Risk Metrics */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-risk-metrics</div>
        <table className="tbl" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Risk Metric</th>
              <th className="r">Value</th>
              <th style={{ textAlign: 'left' }}>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Win Probability</td>
              <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.winProb > 50 ? 'var(--mint)' : 'var(--red)' }}>{sim.winProb.toFixed(1)}%</td>
              <td style={{ color: 'var(--text3)' }}>Prob. of exceeding current NAV</td>
            </tr>
            <tr>
              <td>Expected Value</td>
              <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600 }}>${sim.mean.toFixed(2)}</td>
              <td style={{ color: 'var(--text3)' }}>Mean simulated fair value</td>
            </tr>
            <tr>
              <td>Sharpe Ratio</td>
              <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.sharpe > 1 ? 'var(--mint)' : sim.sharpe > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sharpe.toFixed(2)}</td>
              <td style={{ color: 'var(--text3)' }}>{sim.sharpe > 1 ? 'Excellent risk-adj return' : sim.sharpe > 0.5 ? 'Good risk-adj return' : 'Moderate risk-adj return'}</td>
            </tr>
            <tr>
              <td>Sortino Ratio</td>
              <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.sortino > 1 ? 'var(--mint)' : sim.sortino > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sortino.toFixed(2)}</td>
              <td style={{ color: 'var(--text3)' }}>Downside-adjusted return</td>
            </tr>
            <tr>
              <td>VaR (5%)</td>
              <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{sim.var5.toFixed(1)}%</td>
              <td style={{ color: 'var(--text3)' }}>95% confidence floor</td>
            </tr>
            <tr>
              <td>CVaR (5%)</td>
              <td className="r" style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{sim.cvar5Pct.toFixed(1)}%</td>
              <td style={{ color: 'var(--text3)' }}>Expected tail loss</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Distribution Chart */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-distribution</div>
        <div className="card" style={{ }}>
          <div className="card-title">Fair Value Distribution</div>
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
              <Bar dataKey="pct" fill="var(--accent)" radius={[2, 2, 0, 0]} />
              <ReferenceLine x={currentNAV} stroke="#fff" strokeDasharray="5 5" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)' }}>
            <span>White line = current NAV (${currentNAV.toFixed(0)})</span>
            <span>Simulations: {sims.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* CFA Notes */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#mc-notes</div>
        <CFANotes title="CFA Level III — Monte Carlo Simulation" items={[
          { term: 'Geometric Brownian Motion (GBM)', def: 'dS = S(μdt + σdW). Standard model for equity/crypto. Log-normal returns ensure prices stay positive. ETH price and NAV multiple are correlated.' },
          { term: 'Sharpe Ratio', def: '(Return - Risk-Free) / Volatility. Measures risk-adjusted return. >0.5 decent, >1.0 good, >2.0 excellent. Uses 4% risk-free rate.' },
          { term: 'Sortino Ratio', def: 'Like Sharpe but only penalizes downside volatility. Better for asymmetric return distributions common in crypto.' },
          { term: 'VaR (Value at Risk) 5%', def: 'The loss level that won\'t be exceeded with 95% confidence. If VaR = -40%, there\'s 5% chance of losing more than 40%.' },
          { term: 'CVaR (Conditional VaR) 5%', def: 'Expected loss in the worst 5% of scenarios. Also called Expected Shortfall. More conservative than VaR.' },
          { term: 'Max Drawdown', def: 'Largest peak-to-trough decline. Shows worst-case loss experience during the holding period.' },
        ]} />
      </div>
    </div>
  );
};

// SEC FILING TRACKER - Matches ASTS style exactly
const SECFilingTracker = () => {
  // SEC Filing metadata - update as new filings are processed
  const filingData = {
    // Company identifiers (verified from SEC EDGAR)
    cik: '0001829311',
    ein: '84-3986354',
    sic: '6199',
    sicDescription: 'Finance Services',
    ticker: 'BMNR',
    exchange: 'NYSE American',
    stateLocation: 'Nevada',
    stateOfIncorporation: 'Delaware',
    fiscalYearEnd: 'August 31',
    
    // Key dates
    firstFiling: 'October 27, 2020',
    firstFilingNote: 'As Sandy Springs Holdings (renamed Jul 2021)',
    latestEvent: '4.285M ETH Holdings — $10.7B Total',
    latestEventDate: 'Feb 2, 2026',

    // Last press release processed (for tracking)
    lastPressRelease: 'February 2, 2026',
    lastPressReleaseTitle: '4,285,125 ETH Holdings Update — $10.7B Total',

    // Latest filings by type
    filings: {
      '10-K': { date: 'Nov 21, 2025', description: 'FY 2025', color: 'blue' },
      '10-Q': { date: 'Jan 13, 2026', description: 'Q1 FY2026', color: 'purple' },
      '8-K': { date: 'Feb 2, 2026', description: '4.285M ETH Holdings', color: 'yellow' },
      'S-3ASR': { date: 'Jul 9, 2025', description: '$2B ATM Shelf', color: 'green' },
      '424B5': { date: 'Sep 22, 2025', description: '$365M @ $70 + Warrants', color: 'orange' },
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
                <span className="text-sm text-violet-400">{filingData.firstFiling}</span>
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
        CIK: {filingData.cik} | EIN: {filingData.ein} | SIC: {filingData.sic} ({filingData.sicDescription}) | {filingData.exchange}: {filingData.ticker} | FYE: {filingData.fiscalYearEnd}
      </div>
    </div>
  );
};

// SEC FILINGS TAB - Comprehensive 10-Q/10-K data tracking
/*
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║  SEC FILINGS TAB - Quarterly/Annual Financial Data                            ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Complete FY2025 filing history: Q1 → Q2 → Q3 → 10-K Annual                  ║
 * ║                                                                               ║
 * ║  PRE-PIVOT ERA (Q1-Q3): Bitcoin mining company, cumulative losses            ║
 * ║  TRANSITION (10-K): ETH pivot mid-year, $805M unrealized gain, profitable!   ║
 * ║  POST-PIVOT ERA (FY2026+): Pure ETH treasury company                          ║
 * ║                                                                               ║
 * ║  Data Sources: SEC EDGAR CIK 0001829311, verified from original filings      ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════════
// INVESTMENT TAB - Bold, Simple, Advanced Investment Summary
// Updated after every PR/SEC filing with archived historical summaries
// ═══════════════════════════════════════════════════════════════════════════════
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
  
  // Current Investment Summary
  const current = {
    date: '2026-02-02',
    source: 'February 2, 2026 — PR: 4.285M ETH Holdings + $10.7B Total',
    verdict: 'STRONG BUY',
    verdictColor: 'green',
    tagline: 'The ETH Supercycle Play',

    // Investment Scorecard — Unified 8-category framework (matches ASTS/CRCL)
    scorecard: [
      { category: 'Financial Strength', rating: 'A', color: 'var(--mint)', detail: 'Solid: $10.7B total holdings, $586M cash, zero debt (ETH down to $2,317)' },
      { category: 'Profitability', rating: 'A+', color: 'var(--mint)', detail: 'Staking yield: $188M/yr annualized (67.6% deployed), dividend initiated' },
      { category: 'Growth', rating: 'A+', color: 'var(--mint)', detail: '3.55% ETH supply, ~71% to "Alchemy of 5%", $24.5B ATM capacity' },
      { category: 'Valuation', rating: 'A', color: 'var(--mint)', detail: 'Below NAV at $2,317 ETH — strong buying opportunity, MSTR trades 2-3x' },
      { category: 'Competitive Position', rating: 'A+', color: 'var(--mint)', detail: '#1 ETH treasury globally, 4yr+ head start, scale nearly unassailable' },
      { category: 'Execution', rating: 'A+', color: 'var(--mint)', detail: 'Flawless pivot, Young Kim CFO/COO, 81% YES shareholder vote, MAVAN Q1' },
      { category: 'Regulatory/External', rating: 'B+', color: 'var(--sky)', detail: 'Pro-crypto admin, GENIUS Act passed; SEC/staking risk persists' },
      { category: 'Capital Structure', rating: 'A', color: 'var(--mint)', detail: '500K+ stockholders, #105 most traded, $200M Beast Industries closed' },
    ],
    
    // Ecosystem Health Rating (summarizes Ethereum tab metrics)
    ecosystemHealth: {
      overallGrade: 'A',
      overallColor: 'var(--mint)',
      metrics: [
        { metric: 'ETF Flows (7d)', value: '+$340M', signal: 'Bullish', weight: '25%', color: 'var(--mint)' },
        { metric: 'Staking Rate', value: '28.3%', signal: 'Healthy', weight: '20%', color: 'var(--mint)' },
        { metric: 'DeFi TVL Trend', value: '$62.4B', signal: 'Growing', weight: '20%', color: 'var(--mint)' },
        { metric: 'Supply Growth', value: '-0.2%', signal: 'Deflationary', weight: '15%', color: 'var(--mint)' },
        { metric: 'Protocol Progress', value: 'Fusaka Live', signal: 'Upgraded', weight: '20%', color: 'var(--mint)' },
      ],
      summary: 'Strong ecosystem tailwinds despite ETH price weakness. Ethereum daily txns hit ATH (2.5M), active addresses ATH (1M daily). Tom Lee: ETH fundamentals strong, price weakness due to leverage/gold rotation. GENIUS Act transformational. Beast Industries ($200M) expands GenZ reach.',
    },

    // Executive Summary — Unified schema (matches ASTS/CRCL)
    executiveSummary: {
      headline: `BMNR is the single best way to play the Ethereum supercycle with downside protection.`,
      thesis: `This is not just another crypto stock. BMNR has created something unprecedented: a yield-generating, dividend-paying, institutionally-accessible vehicle for leveraged ETH exposure.

They own 3.55% of all Ethereum in existence — 4.285 million tokens. They're over 71% of the way to 5%. No one else is even close.

The MSTR playbook worked. BMNR is running the same play on a yield-bearing asset — and paying you to wait. With $586M cash and $24.5B ATM capacity, the accumulation machine keeps running. Staking exploded to 2.9M ETH (67.6% of holdings). Tom Lee: ETH fundamentals strengthening (ATH txns, ATH active addresses) while price weakness is non-fundamental (leverage, gold rotation). MAVAN on track Q1 2026.`,
      bottomLine: `If you believe ETH goes higher, BMNR is the trade. If you're wrong, $10.7B in assets, staking income ($188M/yr annualized at 67.6% staked, $374M at scale), and NAV floor limit your downside. Asymmetric.`,
      whatsNew: [
        'Acquired 41,788 ETH in past week — now 3.55% of supply (71% to 5%)',
        'Staking exploded to 2.9M ETH (67.6% of holdings, +888K in one week)',
        'ETH fundamentals strong: ATH daily txns (2.5M), ATH active addresses (1M)',
        'Annualized staking revenue: $188M, up 18% week-over-week',
        '#105 most traded US stock ($1.1B/day), MAVAN on track Q1 2026',
      ],
    },
    
    // Growth Drivers (CRCL-style)
    growthDrivers: [
      { driver: 'ETH Price Appreciation', impact: 'Critical', description: 'Every $1,000 ETH move = $4.3B NAV change. At $10K ETH, NAV/share hits $99+.', color: 'var(--mint)' },
      { driver: 'Staking Income Scale', impact: 'High', description: '2.9M ETH staked ($6.7B, 67.6% of holdings). Annualized: $188M (up 18% WoW), $374M at full scale.', color: 'var(--mint)' },
      { driver: 'NAV Premium Expansion', impact: 'High', description: 'Currently below NAV at $2,317 ETH. MSTR trades 2-3x. Gap closure = significant upside.', color: 'var(--sky)' },
      { driver: 'Continued Accumulation', impact: 'High', description: '$586M cash + $24.5B ATM capacity. 81% YES vote unlocks massive share authorization.', color: 'var(--sky)' },
      { driver: 'Dividend Growth', impact: 'Medium', description: 'Started at $0.04/yr. As staking scales (now 67.6%), expect 10-20% annual dividend growth.', color: 'var(--gold)' },
    ],
    
    // Competitive Moat (CRCL-style with sources and threats)
    moatSources: [
      { source: 'Scale Dominance', strength: 'Strong', detail: '4.285M ETH = 3.55% of total supply. #1 ETH treasury, #2 global crypto treasury behind MSTR.', color: 'var(--mint)' },
      { source: 'Yield Advantage', strength: 'Strong', detail: 'Only ETH treasury generating staking yield AND paying dividends. 2.9M ETH staked, $188M/yr annualized.', color: 'var(--mint)' },
      { source: 'Capital Access', strength: 'Strong', detail: '$586M cash + $24.5B ATM + 81% shareholder YES vote unlocks massive issuance capacity.', color: 'var(--mint)' },
      { source: 'Management Depth', strength: 'Strong', detail: 'Tom Lee (Chairman) + Young Kim CFO/COO (MIT/HBS, 20yr institutional PM). Backed by ARK, Founders Fund, Pantera, Galaxy, Bill Miller III.', color: 'var(--mint)' },
      { source: 'Retail Base', strength: 'Strong', detail: '500K+ individual stockholders. #105 most traded US stock ($1.1B/day). Deep liquidity.', color: 'var(--mint)' },
    ],
    moatThreats: [
      { threat: 'ETH Price Collapse', risk: 'Critical', detail: '-70% drawdown would devastate NAV. At $1K ETH, NAV/share drops to ~$9.70.', color: 'var(--coral)' },
      { threat: 'NAV Premium Evaporation', risk: 'High', detail: 'Currently near NAV. Could drop to 0.5x or worse. GBTC traded at -40% discount for years.', color: 'var(--coral)' },
      { threat: 'Regulatory Crackdown', risk: 'Medium', detail: 'SEC declares ETH a security, bans staking, or targets crypto treasuries.', color: 'var(--gold)' },
      { threat: 'New Competitors', risk: 'Low', detail: 'Scale advantage nearly unassailable — years + billions required to catch up.', color: 'var(--mint)' },
    ],
    
    // Catalysts (renamed from predictions)
    catalysts: [
      { event: 'Shareholder Vote', timing: 'Jan 15, 2026 ✅ COMPLETED', impact: '81% YES on Proposal 2 (52.2% turnout) — share authorization approved', color: 'var(--mint)' },
      { event: 'Beast Industries', timing: 'Jan 17, 2026 ✅ CLOSED', impact: '$200M equity investment in MrBeast\'s company — GenZ/Millennial reach + DeFi integration', color: 'var(--mint)' },
      { event: 'MAVAN Launch', timing: 'Q1 2026', impact: 'Proprietary staking = margin expansion, largest staking provider in crypto (on track)', color: 'var(--mint)' },
      { event: 'Dividend Increase', timing: 'Q1 2026', impact: 'Likely 2-3x current rate as staking scales (67.6% now staked)', color: 'var(--sky)' },
      { event: 'Index Inclusion', timing: 'Jun 2026', impact: 'Russell 2000 inclusion forces passive buying', color: 'var(--sky)' },
      { event: '5% ETH Target', timing: '2026', impact: 'Would own ~6.0M ETH — "Alchemy of 5%" complete (currently 71% there)', color: 'var(--gold)' },
    ],
    
    // Risk Matrix (CRCL-style)
    risks: [
      { risk: 'ETH Price Collapse', severity: 'Critical', likelihood: 'Low', impact: 'High', detail: 'The existential risk. A -70% drawdown would devastate NAV. At $1,000 ETH, NAV/share drops to ~$9.90. This is a leveraged ETH bet.', mitigation: 'Staking income ($374M/yr at scale) provides cushion; NAV floor via $1B buyback authorization.' },
      { risk: 'NAV Premium Evaporation', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Currently below NAV at $2,317 ETH. If sentiment shifts further, could drop to 0.5x. GBTC traded at -40% discount for years.', mitigation: '$1B buyback at discount provides floor; dividend yield supports valuation.' },
      { risk: 'Regulatory Crackdown', severity: 'Medium', likelihood: 'Low', impact: 'High', detail: 'SEC declares ETH a security, bans staking, or targets crypto treasuries. Current environment favorable but politics change.', mitigation: 'Diversified staking providers; compliance-first approach; MAVAN US-based.' },
      { risk: 'MAVAN Execution Failure', severity: 'Medium', likelihood: 'Low', impact: 'Medium', detail: 'Delays or technical issues with proprietary staking. On track for Q1 2026 launch.', mitigation: 'Third-party providers already operational (2.9M staked); upside risk, not existential.' },
      { risk: 'Dilution Fatigue', severity: 'Low', likelihood: 'Low', impact: 'Medium', detail: 'Market stops funding ATMs at premium. Would slow accumulation but not fatal.', mitigation: '$586M cash + staking income ($188M/yr annualized) provides runway without issuance.' },
    ],
    
    // Three Perspectives (CRCL-style)
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'FAVORABLE',
        color: 'var(--mint)',
        summary: 'Single-asset concentration with embedded leverage through NAV premium mechanism. Best positioned as 2-5% satellite allocation within alternatives bucket. Execution risk materially reduced — Young Kim (CFO/COO) brings 20yr institutional PM experience. $200M Beast Industries investment (CLOSED). Staking exploded to 1.84M ETH (43.7%). 81% shareholder YES vote.',
        ecosystemView: 'Ethereum network fundamentals support the thesis. Deflationary supply (-0.2% annually), healthy staking participation (28%), and growing institutional adoption via ETFs ($12B AUM) create structural demand. $518M annual staking income at current 43.7% deployment is a game-changer for valuation.',
        recommendation: 'Allocate 2-5% of alternatives sleeve. Rebalance quarterly.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG',
        color: 'var(--mint)',
        summary: 'Cleanest asymmetric setup in crypto equities. Market treating BMNR like simple ETH proxy — it\'s not. Staking yield + dividend + accretive issuance creates compounding machine. Beast Industries CLOSED ($200M, 450M subs). 81% shareholder YES vote unlocks massive share authorization. 500K+ stockholders, #60 most traded.',
        ecosystemView: 'ETF flow momentum is the key near-term catalyst. $979M cash + $24.5B ATM = unlimited firepower. Staking exploded: 1.84M ETH total (43.7%). Tom Lee\'s 2026 thesis: government support, stablecoin adoption, tokenization, AI authentication demand, younger generation adoption (now via Beast Industries!).',
        recommendation: 'Size up to 8-10% of book. Stop loss at 0.6x NAV.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'CORE POSITION',
        color: 'var(--violet)',
        summary: '$14.5B total holdings. 4.203M ETH. $200M Beast Industries (CLOSED). 81% shareholder YES vote. 500K+ stockholders. This is how you get institutional ETH exposure without custody complexity — and now with creator economy upside. Management bench: Tom Lee (Chairman), Young Kim (CFO/COO). Backed by ARK, Founders Fund, Pantera, Galaxy Digital, Bill Miller III, and Tom Lee personally.',
        ecosystemView: 'Ecosystem maturation reduces tail risk. Beast Industries investment ($200M, CLOSED) expands reach to 450M+ YouTube subscribers (GenZ/Millennials) with DeFi platform integration planned. Tom Lee\'s 2026 thesis: US government crypto support, Wall Street stablecoin adoption, tokenization growth, AI authentication/provenance demand, younger generation adoption. The GENIUS Act is transformational.',
        recommendation: '5-10% of crypto allocation. Multi-year hold.',
      },
      technicalAnalyst: {
        title: 'Technical Analyst',
        assessment: 'BULLISH — ACCUMULATE',
        color: 'var(--sky)',
        summary: 'Price structure shows higher highs and higher lows since ETH treasury pivot. RSI holding above 50 on weekly timeframe indicates sustained momentum. MACD histogram expanding on daily chart. Key support at 20-day SMA has held on pullbacks. Volume profile shows accumulation patterns with higher volume on up days vs down days.',
        ecosystemView: 'BMNR exhibits 0.85-0.95 correlation with ETH on 30-day rolling basis — trade it as leveraged ETH proxy. NAV premium/discount cycles provide tactical entry/exit signals: accumulate below 1.0x NAV, trim above 1.5x NAV. Watch ETH $3,500 support and $4,200 resistance for directional cues. Bollinger Band squeeze on weekly suggests imminent volatility expansion.',
        recommendation: 'Buy pullbacks to 20-day SMA. Stop loss at 50-day SMA break. Target: previous swing high + 15%.',
      },
    },
    
    // Position Sizing (CRCL-style)
    positionSizing: {
      aggressive: { range: '8-12%', description: 'High-conviction crypto portfolios' },
      growth: { range: '4-8%', description: 'Growth-oriented with alternatives allocation' },
      balanced: { range: '2-4%', description: 'Diversified portfolios seeking crypto exposure' },
      conservative: { range: '0-2%', description: 'Risk-averse or income-focused' },
    },
    
    // Accumulation Zones
    accumulation: [
      { zone: 'Below 0.85x NAV', action: 'Aggressive accumulation', color: 'var(--mint)' },
      { zone: '0.85x-1.0x NAV', action: 'Normal accumulation', color: 'var(--mint)' },
      { zone: '1.0x-1.25x NAV', action: 'Hold / Add on dips', color: 'var(--sky)' },
      { zone: '1.25x-1.7x NAV', action: 'Hold core position', color: 'var(--gold)' },
      { zone: 'Above 1.7x NAV', action: 'Trim 20-30%', color: 'var(--coral)' },
    ],
  };
  
  // Archive - Full historical investment summaries (generous detail for each period)
  const archive = [
    {
      date: '2026-02-02',
      source: 'PR: 4.285M ETH Holdings + $10.7B Total + Staking 67.6%',
      verdict: 'STRONG BUY',
      verdictColor: 'green',
      summary: '4.285M ETH ($9.9B @ $2,317). 2.9M ETH staked (67.6%). +41,788 ETH acquired. 3.55% of supply. $586M cash. #105 most traded US stock ($1.1B/day). ETH fundamentals strong despite price drop.',
      fullAnalysis: {
        context: 'February 2, 2026 PR shows ETH price dropped sharply ($3,000→$2,317) but fundamentals strengthening: Ethereum daily txns hit ATH (2.5M), active addresses ATH (1M daily). Tom Lee: non-fundamental factors (leverage, gold rotation) explain weakness. Staking exploded +888K ETH in one week to 2.9M (67.6%). MAVAN on track Q1 2026. GENIUS Act transformational.',
        keyHighlights: [
          'ETH holdings: 4,285,125 ETH @ $2,317 = $9.9B (3.55% of 120.7M supply)',
          'Total holdings: $10.7B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $586M (down from $682M)',
          'Staked ETH: 2,897,459 ($6.7B) — up 888,192 in one week (+44%)',
          'Staking ratio: 67.6% of holdings now staked (was 47.4%)',
          'Annualized staking revenue: $188M (up 18% WoW), $374M at scale (2.81% CESR)',
          'Acquired 41,788 ETH in past week',
          '#105 most traded US stock ($1.1B/day avg)',
          'MAVAN launch on track for Q1 2026 (working with 3 staking providers)',
          'Ethereum fundamentals: ATH daily txns (2.5M), ATH active addresses (1M)',
          'Tom Lee: ETH price weakness is non-fundamental (leverage, gold rotation)',
          'Gold -9% on Jan 30 (4th largest daily drop) — potential near-term top signal',
          'GENIUS Act + SEC Project Crypto "transformational to financial services"',
        ],
        verdict: 'Accumulation continues during price weakness. Staking exploded to 67.6% of holdings. ETH fundamentals (txns, addresses) at ATH while price depressed. Asymmetric opportunity.',
        scorecard: 9.4,
        risks: 'ETH price collapsed from $3,000 to $2,317 (-23%). Total holdings down from $12.8B to $10.7B. Cash position declining ($682M→$586M). NAV compression risk.',
        strategy: 'STRONG BUY. ETH price weakness = accumulation opportunity. Fundamentals strengthening. Staking at 67.6% generates real income. MAVAN imminent.'
      }
    },
    {
      date: '2026-01-26',
      source: 'PR: 4.243M ETH Holdings + $12.8B Total + Davos 2026',
      verdict: 'STRONG BUY',
      verdictColor: 'green',
      summary: '4.243M ETH ($12.0B @ $2,839). 2.0M ETH staked (47.4%). +40,302 ETH acquired. 3.52% of supply. $682M cash. #91 most traded US stock ($1.2B/day). Davos: Wall Street embraces crypto.',
      fullAnalysis: {
        context: 'January 26, 2026 PR shows continued aggressive ETH accumulation (+40,302 ETH in one week) and staking expansion (now 2.0M ETH, 47.4%). Davos 2026 featured overwhelming bullish sentiment on crypto from Larry Fink (BlackRock), David Sacks (White House AI/Crypto), Bill Winters (Standard Chartered), and others. Tom Lee: "2026 is the year policymakers and world leaders now view digital assets as central to the future of the financial system."',
        keyHighlights: [
          'ETH holdings: 4,243,338 ETH @ $2,839 = $12.0B (3.52% of 120.7M supply)',
          'Total holdings: $12.8B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $682M',
          'Staked ETH: 2,009,267 ($5.7B) — up 171,264 in one week',
          'Staking ratio: 47.36% of holdings now staked (was 43.7%)',
          'Staking income: $374M/yr at scale (2.81% CESR)',
          'Acquired 40,302 ETH in past week',
          '#91 most traded US stock ($1.2B/day, behind Accenture, ahead of PepsiCo)',
          'MAVAN launch on track for Q1 2026',
          'Davos 2026: Larry Fink — "Tokenization is necessary... if we have one common blockchain, we could reduce corruption"',
          'Davos 2026: David Sacks — "Banking and crypto will transform into a single digital asset industry"',
          'Davos 2026: Bill Winters — "Most things will settle in digital form... this is the year when this is happening in scale"',
          'ETHBTC ratio climbing since mid-October — investors recognizing Wall Street building on Ethereum',
        ],
        verdict: 'Accumulation machine running smoothly. Staking approaching 50% of holdings. Davos 2026 sentiment shift validates institutional thesis. ETH price weakness ($2,839) is buying opportunity for long-term holders.',
        scorecard: 9.6,
        risks: 'ETH price declined from $3,211 to $2,839 (-11.6%). Total holdings down from $14.5B to $12.8B. Price volatility remains key risk.',
        strategy: 'STRONG BUY. ETH weakness = accumulation opportunity. Davos consensus validates long-term thesis. MAVAN launch imminent.'
      }
    },
    {
      date: '2026-01-20',
      source: 'PR: 4.203M ETH Holdings + 81% Shareholder Vote YES + Beast CLOSED',
      verdict: 'STRONG BUY',
      verdictColor: 'green',
      summary: '4.203M ETH ($13.5B). 81% YES on Proposal 2 (52.2% turnout). 1.84M ETH staked (43.7%). Beast Industries CLOSED. 500K+ stockholders. #60 most traded US stock.',
      fullAnalysis: {
        context: 'January 20, 2026 marks multiple landmark achievements: 81% shareholder YES vote on Proposal 2 (share authorization), Beast Industries $200M investment officially closed, staking surged to 1.84M ETH (43.7%), and trading volume hit $1.5B/day making BMNR the #60 most traded US stock.',
        keyHighlights: [
          'ETH holdings: 4,203,036 ETH @ $3,211 = $13.5B (3.48% of 120.7M supply)',
          'Total holdings: $14.5B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $979M (post Beast Industries closing)',
          'Staked ETH: 1,838,003 ($5.9B) — up 582K in one week (+46.3%)',
          'Staking ratio: 43.73% of holdings now staked (was 30%)',
          'Staking income run rate: $518M/yr at 2.81% CESR',
          'Shareholder vote: 81% YES on Proposal 2 (52.2% of outstanding voted)',
          'Beast Industries: $200M investment CLOSED Jan 17, 2026',
          '500,000+ individual stockholders',
          '#60 most traded US stock ($1.5B/day average volume)',
          'MAVAN launch on track for Q1 2026',
        ],
        verdict: 'All catalysts delivering. Shareholder vote approved with overwhelming 81% YES (only needed 50.1%). Beast Industries closed successfully. Staking accelerating rapidly. Retail adoption exploding with 500K+ stockholders.',
        scorecard: 9.7,
        risks: 'ETH price risk remains primary concern. Execution now de-risked with management bench in place.',
        strategy: 'STRONG BUY. All near-term catalysts completed successfully. Focus shifts to MAVAN launch Q1 and continued ETH accumulation.'
      }
    },
    {
      date: '2026-01-15',
      source: 'PR: $200M Beast Industries Investment + Annual Meeting',
      verdict: 'STRONG BUY',
      verdictColor: 'green',
      summary: '$200M strategic equity investment into Beast Industries (MrBeast). GenZ/Millennial demographic expansion. DeFi integration planned. Annual Meeting TODAY @ Wynn Las Vegas.',
      fullAnalysis: {
        context: 'January 15, 2026 marks a pivotal day for BMNR: the Annual Meeting at Wynn Las Vegas coincides with the announcement of a $200M equity investment into Beast Industries — MrBeast\'s entertainment and CPG empire. This represents BMNR\'s first major strategic investment outside pure crypto, positioning the company at the intersection of digital assets and the creator economy.',
        keyHighlights: [
          '$200M equity investment into Beast Industries (MrBeast)',
          'Beast Industries: 450M+ YouTube subscribers, 5B monthly views across all channels',
          'Target audience expansion: GenZ, GenAlpha, Millennials (previously institutional-focused)',
          'DeFi integration: Beast Industries exploring incorporation into upcoming financial services platform',
          'Deal expected to close on or about January 19, 2026',
          'Tom Lee: "Beast Industries is the leading content creator of our generation"',
          'Jeff Housenbold (Beast CEO): "Strong validation of our vision, strategy, and growth trajectory"',
          'Beast Industries brands: Feastables, #TeamTrees, #TeamSeas, #TeamWater, Beast Philanthropy',
          'Annual Meeting held same day @ Wynn Las Vegas — share authorization vote (500M→50B)',
          'Premier institutional investors reaffirmed: ARK (Cathie Wood), MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital, Tom Lee',
          'Company goal: acquiring 5% of ETH supply',
          'MAVAN (Made-in America Validator Network) launching Q1 2026',
        ],
        verdict: 'Bold strategic move. Beast Industries investment expands BMNR\'s reach to younger demographics while exploring DeFi integration. This positions BMNR as more than just an ETH treasury — it\'s becoming a bridge between crypto and mainstream audiences.',
        scorecard: 9.5,
        risks: 'Investment concentration in single creator (MrBeast). $200M reduces cash position from $988M to ~$788M (still ample). Deal must close Jan 19.',
        strategy: 'STRONG BUY. Annual Meeting today is the key catalyst for share authorization. Beast Industries deal expands TAM beyond institutional crypto allocators.'
      }
    },
    {
      date: '2026-01-12',
      source: 'PR: ETH Holdings Reach 4.168M, $14.0B Total',
      verdict: 'BUY',
      verdictColor: 'green',
      summary: 'Staking surge: 1.26M ETH staked (30% of holdings, +597K in one week). Cash up to $988M. 70% to "Alchemy of 5%". Annual Meeting in 3 days.',
      fullAnalysis: {
        context: 'The January 12, 2026 PR confirms BMNR\'s relentless accumulation and explosive staking growth. 24,266 ETH acquired in past week while also increasing cash by $73M. Staking nearly doubled in one week (+596,864 to 1.256M). Tom Lee urges stockholders to VOTE YES on Proposal #2 (share authorization).',
        keyHighlights: [
          'ETH holdings: 4,167,768 ETH @ $3,119 = $13.0B (3.45% of 120.7M supply)',
          'Total holdings: $14.0B (ETH + cash + BTC + moonshots)',
          'Cash position: $988M (up $73M while still buying ETH)',
          'Staked ETH: 1,256,083 ($3.9B) — up 596,864 in one week (+90.5%)',
          'Staking ratio: 30.14% of holdings now staked (was ~16%)',
          'At scale staking income: $374M/yr (>$1M/day) using 2.81% CESR',
          'MAVAN launch on track for Q1 2026 — largest staking provider in crypto',
          'Annual Meeting Jan 15 @ Wynn Las Vegas — VOTE YES on Proposal #2',
          'Share authorization: 500M→50B (requires 50.1% of all outstanding)',
          '#67 most traded US stock ($1.3B/day 5-day avg)',
          '70% of the way to "Alchemy of 5%" (up from two-thirds)',
          'Tom Lee: "2026 is the year crypto prices recover with stronger gains in 2027-2028"',
          'GENIUS Act compared to Aug 15, 1971 (end of Bretton Woods) — transformational',
        ],
        verdict: 'Execution remains flawless. Staking scaling faster than anyone expected. The machine is operating at peak capacity. Annual Meeting is THE near-term catalyst.',
        scorecard: 9.4,
        risks: 'Share authorization vote needs 50.1% of ALL shares (not just votes cast). High bar. ETH price remains the existential risk.',
        strategy: 'BUY. VOTE YES on Proposal #2. Annual Meeting Jan 15 is the catalyst. Position for 2026 recovery thesis.'
      }
    },
    {
      date: '2026-01-09',
      source: 'PR: CFO/COO Young Kim Appointed',
      verdict: 'BUY',
      verdictColor: 'green',
      summary: 'Leadership upgrade: Young Kim (MIT/HBS, Columbia Threadneedle, Axiom) appointed CFO+COO+Board. Management depth now matches asset scale.',
      fullAnalysis: {
        context: 'The January 9, 2026 PR announces Young Kim as CFO and COO, filling the vacancy from Raymond Mow\'s January 16 departure. Kim joins the Board and reports to Tom Lee. This is a significant leadership upgrade — Kim brings 20+ years of institutional asset management experience managing multi-billion dollar portfolios at Columbia Threadneedle and Axiom Investors.',
        keyHighlights: [
          'Young Kim appointed CFO + COO (dual role), effective immediately',
          'Also appointed to Board of Directors, reports to Tom Lee (Chairman)',
          'Background: MIT engineering + Harvard Business School — "engineer-investor" profile',
          '2021-2025: Partner & Senior PM at Axiom Investors (multi-billion global)',
          '2011-2021: Senior PM at Columbia Threadneedle (decade of institutional experience)',
          'Early career: software engineer → VC → investment research → PM',
          'ETH holdings confirmed at 3.43% — two-thirds to "Alchemy of 5%"',
          'Annual Meeting Jan 15, 2026 @ Wynn Las Vegas — 4 key proposals',
          'Institutional backers reaffirmed: ARK, MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital',
          'Tom Lee: "[Young] will play an integral role in helping to execute our roadmap and scale the business"',
        ],
        verdict: 'Management depth now matches the $14B+ asset base. Kim\'s institutional PM background is ideal for capital markets strategy and investor relations. CFO vacancy filled ahead of schedule with a significant upgrade.',
        scorecard: 9.3,
        risks: 'Execution risk reduced with experienced CFO/COO. Key person risk remains with Tom Lee as strategic driver.',
        strategy: 'BUY. Leadership continuity secured. Annual Meeting Jan 15 is next catalyst. Vote YES on share authorization.'
      }
    },
    { 
      date: '2026-01-05', 
      source: '8-K: ETH Holdings $14.2B, 4.14M ETH', 
      verdict: 'BUY', 
      verdictColor: 'green', 
      summary: 'Fortress balance sheet: $14.2B total holdings, $915M cash, 659K ETH staked. Two-thirds to "Alchemy of 5%". MAVAN Q1 2026.',
      fullAnalysis: {
        context: 'The January 5, 2026 8-K confirms BMNR\'s relentless accumulation continues even through holiday-week low volume. 32,977 ETH acquired in the past week alone. Staking scaled dramatically (+250K in one week to 659K total). Cash position nearly doubled to $915M. The machine is operating at full capacity.',
        keyHighlights: [
          'ETH holdings: 4,143,502 ETH @ $3,196 = $13.2B (3.43% of 120.7M supply)',
          'Total holdings: $14.2B (ETH + cash + BTC + moonshots)',
          'Cash position: $915M (up from ~$512M) — massive war chest',
          'Staked ETH: 659,219 ($2.1B) — up 250,592 in one week',
          'At scale staking income: $374M/yr (>$1M/day) using 2.81% CESR',
          'MAVAN launch on track for Q1 2026 — proprietary US validator network',
          'Annual Meeting Jan 15 at Wynn Las Vegas — share authorization vote',
          'Institutional backers reaffirmed: ARK, Founders Fund, Pantera, Galaxy, Bill Miller III',
          'Tom Lee 2026 thesis: Gov\'t support, stablecoins, tokenization, AI authentication, metals correlation',
          '#44 most traded US stock ($980M/day 5-day avg), ahead of Home Depot'
        ],
        verdict: 'Execution continues to be flawless. Every metric improving. The only question is ETH price — and management is doing everything right to maximize upside.',
        scorecard: 9.2,
        risks: 'ETH price concentration remains. But with $915M cash, $24.5B ATM, and institutional backing, runway is effectively unlimited.',
        strategy: 'BUY. Accumulate on any weakness. Annual Meeting Jan 15 is near-term catalyst. Vote YES on share authorization.'
      }
    },
    { 
      date: '2026-01-02', 
      source: 'Chairman\'s Message (8-K, DEFA14A)', 
      verdict: 'STRONG BUY', 
      verdictColor: 'green', 
      summary: 'ETH/BMNR correlation formalized. Split roadmap disclosed. Premium thesis explained to market.',
      fullAnalysis: {
        context: 'Tom Lee published video explaining the authorized share increase (500M→50B) and explicitly quantified the ETH/BMNR correlation. This is management giving shareholders the exact framework for valuation: BMNR = 0.015×ETH + accretion. The split roadmap at various ETH prices reveals long-term ambitions.',
        keyHighlights: [
          'ETH/BMNR coefficient: 0.015×ETH price + accretion (per Bloomberg)',
          'Implied prices: $22k ETH → $500 BMNR, $62.5k → $1,500, $250k → $5,000',
          'Split roadmap: 20:1 at $500, 60:1 at $1,500, 100:1 at $5,000',
          '50B authorized shares = capacity for 100:1 split (keeps price ~$25)',
          'ETH/BTC target: 0.25 ("payment rails") — massive conviction signal',
          'Institutional backers reaffirmed: ARK, Founders Fund, Pantera, Galaxy, etc.'
        ],
        verdict: 'Management is explicitly laying out the bull case to shareholders. This level of transparency is rare. They WANT people to understand the thesis.',
        scorecard: 9.0,
        risks: 'Dilution if splits happen without ETH appreciation. But that\'s the point — splits come WITH appreciation.',
        strategy: 'Vote YES. The share increase enables splits, not dilution. This is pro-shareholder.'
      }
    },
    { 
      date: '2025-11-24', 
      source: 'FY2025 10-K Annual Report', 
      verdict: 'STRONG BUY', 
      verdictColor: 'green', 
      summary: 'Transformation complete. First profitable year. Going concern eliminated. The thesis is validated.',
      fullAnalysis: {
        context: 'The 10-K filing confirmed what we suspected: BMNR has pulled off one of the most remarkable corporate pivots in recent memory. From a distressed BTC miner with going concern warnings to an $8.8B ETH treasury powerhouse — in less than 6 months.',
        keyHighlights: [
          'First profitable fiscal year: $328M net income vs ($3.3M) loss prior year',
          'Going concern language ELIMINATED — balance sheet is now fortress-like',
          '$8.36B raised through capital markets, all deployed into ETH',
          'Retained earnings turned positive ($337M) for first time in company history',
          'ETH holdings at 2.47M, representing ~2% of total supply'
        ],
        verdict: 'This filing removed all doubt. Management executed flawlessly. The only question now is how high the premium goes.',
        scorecard: 8.5,
        risks: 'ETH price risk remains. Premium sustainability uncertain. But execution risk is now minimal.',
        strategy: 'Accumulate aggressively. This is the confirmation filing — thesis validated, execution proven.'
      }
    },
    { 
      date: '2025-08-12', 
      source: 'ATM Expansion to $24.5B (424B5)', 
      verdict: 'BUY', 
      verdictColor: 'green', 
      summary: 'Market is funding the accumulation at premium. Momentum is undeniable.',
      fullAnalysis: {
        context: 'The prior $4.5B ATM was exhausted in just 5 weeks. Let that sink in. The market absorbed $4.5 BILLION in equity issuance in 35 days, and they came back for more. This $24.5B expansion signals unlimited appetite.',
        keyHighlights: [
          '$4.5B ATM exhausted in 5 weeks — unprecedented demand',
          '$20B expansion via 424B5 supplement — massive firepower',
          'Market clearly willing to fund accumulation at premium to NAV',
          'Institutional demand confirmed — this is not retail mania',
          'Path to 5% ETH supply now financially viable'
        ],
        verdict: 'When the market gives you unlimited capital at favorable terms, you take it. Management is doing exactly that.',
        scorecard: 7.8,
        risks: 'Execution speed is the risk. Can they deploy this fast enough? ETH price during accumulation matters.',
        strategy: 'Buy the momentum. The market is telling you something — listen to it.'
      }
    },
    { 
      date: '2025-07-29', 
      source: '$1B Buyback Authorization + Holdings Update', 
      verdict: 'BUY', 
      verdictColor: 'green', 
      summary: 'Management putting money where their mouth is. Aligned with shareholders.',
      fullAnalysis: {
        context: 'The $1B buyback authorization is a powerful signal. Tom Lee\'s comment about "acquiring our own shares" if trading below NAV tells you everything about management alignment. Combined with 625K ETH accumulated, the framework is complete.',
        keyHighlights: [
          '$1B buyback authorization — NAV floor protection',
          '625,000 ETH accumulated — rapid execution',
          '$401M cash on hand for operational runway',
          'Management explicitly committed to buying back below NAV',
          'Multiple value creation mechanisms now in place'
        ],
        verdict: 'The strategic framework is complete: accumulate at premium, buy back at discount, earn yield in between. Elegant.',
        scorecard: 7.5,
        risks: 'Still early in transition. Market acceptance of ETH pivot not fully proven yet.',
        strategy: 'Build position. The playbook is now clear — execution is what matters.'
      }
    },
    { 
      date: '2025-06-30', 
      source: 'ETH Pivot Announcement', 
      verdict: 'SPECULATIVE', 
      verdictColor: 'yellow', 
      summary: 'Bold move. High risk, high reward. Either genius or desperation.',
      fullAnalysis: {
        context: 'This is either the most visionary corporate pivot since Netflix went streaming, or a desperate Hail Mary from a dying company. The BTC mining business was bleeding cash post-halving. Something had to change.',
        keyHighlights: [
          'Complete strategic pivot from BTC mining to ETH treasury',
          'Tom Lee appointed as Chairman — brings credibility',
          'Going concern warning still active — clock is ticking',
          'Zero ETH holdings at announcement — starting from scratch',
          'Market reaction will determine if capital is available'
        ],
        verdict: 'Binary outcome. If they can raise capital and execute, this is a 10-bagger. If not, it\'s zero. No middle ground.',
        scorecard: 5.0,
        risks: 'EVERYTHING is risk at this stage. Capital availability, execution, ETH price, credibility, timing.',
        strategy: 'Small speculative position only. This is venture-style risk in a public equity wrapper.'
      }
    },
    { 
      date: '2025-07-14', 
      source: 'Q3 FY2025 10-Q Filing', 
      verdict: 'SELL', 
      verdictColor: 'red', 
      summary: 'Going concern. Cash burning. Without change, this company dies.',
      fullAnalysis: {
        context: 'The final quarterly filing before the pivot tells a grim story. Cash declined from $797K to $392K. Losses mounting. BTC mining completely uneconomic post-halving. This company was circling the drain.',
        keyHighlights: [
          'Going concern doubt persists — auditors waving red flags',
          'Cash position: $392K (down from $797K) — runway measured in weeks',
          'Quarterly net loss: ($1.16M) — bleeding continues',
          'BTC mining operations uneconomic at current difficulty/price',
          'No clear path to profitability under current strategy'
        ],
        verdict: 'Without a strategic pivot, this company was heading for bankruptcy or delisting. The fundamentals were broken.',
        scorecard: 2.0,
        risks: 'Insolvency risk was HIGH. Delisting risk was REAL. Total loss of equity was the base case.',
        strategy: 'SELL or avoid entirely. No thesis here. Just hope, and hope is not a strategy.'
      }
    },
  ];

  // Collapsible section component — Unified pattern (matches ASTS/CRCL)
  const CollapsibleSection = ({ id, title, children, sources }: { id: string; title: string; children: React.ReactNode; sources?: UpdateSource | UpdateSource[] }) => (
    <div className="card" style={{ }}>
      <div
        onClick={() => toggleSection(id)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-expanded={investmentSections.has(id)}
        onKeyDown={(e) => e.key === 'Enter' && toggleSection(id)}
      >
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
          {title}
          {sources && <UpdateIndicators sources={sources} />}
        </div>
        <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has(id) ? '−' : '+'}</span>
      </div>
      {investmentSections.has(id) && <div style={{ }}>{children}</div>}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Controls */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-header</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Investment Analysis<UpdateIndicators sources={['PR', 'SEC']} /></h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={expandAll} className="pill" style={{ fontSize: 11 }}>⊞ Expand All</button>
          <button onClick={collapseAll} className="pill" style={{ fontSize: 11 }}>⊟ Collapse All</button>
        </div>
      </div>

      {/* Data Refresh Indicator */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text3)' }}>
        <span>Data as of: <strong style={{ color: 'var(--text2)' }}>{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong style={{ color: 'var(--text2)' }}>{current.source}</strong></span>
      </div>

      {/* Rating Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--mint)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 18 }}>BUY</span>
              <span style={{ background: 'rgba(126,231,135,0.15)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>HIGH CONVICTION</span>
              <UpdateIndicators sources={['PR', 'SEC']} />
            </div>
            <div style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 500 }}>
              {current.executiveSummary.headline}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>
              Last Updated: {current.date} • Trigger: {current.source}
            </div>
          </div>
{/* [PR_CHECKLIST_INVESTMENT_DISPLAY] - Hardcoded metrics, update with every PR! */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>NAV/Share</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--mint)', fontWeight: 700 }}>$24.23</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>@ $2,317 ETH</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Total Holdings</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--sky)', fontWeight: 700 }}>$10.7B</div>
              <div style={{ fontSize: 10, color: 'var(--mint)' }}>4.285M ETH + $586M Cash</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Staked ETH</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--violet)', fontWeight: 700 }}>2.90M</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>$6.7B Value (67.6%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Scorecard */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-scorecard</div>
      <CollapsibleSection id="scorecard" title="Investment Scorecard" sources={['PR', 'SEC']}>
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
        
        {/* Ecosystem Health Rating */}
        <div style={{ padding: 16, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,212,170,0.08))', borderRadius: 12, border: '1px solid rgba(139,92,246,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Ecosystem Health</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Ethereum network fundamentals (see Ethereum tab for details)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: 'Space Mono', fontSize: 28, fontWeight: 700, color: current.ecosystemHealth.overallColor }}>{current.ecosystemHealth.overallGrade}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {current.ecosystemHealth.metrics.map((m, i) => (
              <div key={i} style={{ background: 'var(--surface)', padding: 10, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{m.metric}</div>
                <div style={{ fontSize: 13, fontFamily: 'Space Mono', color: m.color, fontWeight: 600 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: m.color }}>✓ {m.signal}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', fontStyle: 'italic' }}>{current.ecosystemHealth.summary}</div>
        </div>
      </CollapsibleSection>

      {/* Summary */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-summary</div>
      <CollapsibleSection id="summary" title="Investment Summary" sources={['PR', 'SEC']}>
        <div style={{ background: 'rgba(126,231,135,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(126,231,135,0.2)' }}>
          <div style={{ fontWeight: 600, color: 'var(--mint)' }}>What's New ({current.source})</div>
          <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text2)', fontSize: 13, lineHeight: 1.8 }}>
            {current.executiveSummary.whatsNew.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14 }}>
          <p style={{ }}>
            <strong>Thesis:</strong> {current.executiveSummary.thesis}
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>
            "{current.executiveSummary.bottomLine}"
          </p>
          <p style={{ }}>
            <strong>Position Sizing:</strong> 5-10% for aggressive portfolios • 2-5% for growth • Alternatives allocation for balanced
          </p>
        </div>
      </CollapsibleSection>

      {/* Growth Drivers */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-growth</div>
      <CollapsibleSection id="growth" title="Growth Drivers" sources="PR">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        
        {/* Ethereum Ecosystem Catalyst */}
        <div style={{ padding: 12, background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,212,170,0.1))', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text2)' }}>
          <div style={{ fontWeight: 600, color: 'var(--violet)' }}>🔗 Ethereum Ecosystem Catalyst</div>
          <p style={{ }}>
            <strong style={{ color: 'var(--mint)' }}>Adoption Thesis:</strong> As more companies build on Ethereum (DeFi protocols, tokenized assets, on-chain payments, gaming), network activity and transaction fees increase. Greater Ethereum utility drives fundamental demand for ETH, directly benefiting BMNR's treasury holdings.
          </p>
          <p style={{ }}>
            <strong style={{ color: 'var(--sky)' }}>Cross-Portfolio Note:</strong> This thesis is doubly bullish for portfolios holding both BMNR and CRCL — Ethereum adoption drives ETH price appreciation (BMNR NAV) and increases USDC demand for on-chain settlement (CRCL revenue). The positions are positively correlated through Ethereum ecosystem growth.
          </p>
        </div>
      </CollapsibleSection>

      {/* Competitive Moat */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-moat</div>
      <CollapsibleSection id="moat" title="Competitive Moat" sources={['PR', 'SEC']}>
        <div className="g2">
          <div>
            <h4 style={{ color: 'var(--mint)' }}>Moat Sources</h4>
            {current.moatSources.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface2)', borderRadius: 6 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{m.source}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.detail}</div>
                </div>
                <span style={{ color: m.color, fontWeight: 600, fontSize: 12 }}>{m.strength}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: 'var(--coral)' }}>Competitive Threats</h4>
            {current.moatThreats.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface2)', borderRadius: 6 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{t.threat}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.detail}</div>
                </div>
                <span style={{ color: t.color, fontWeight: 600, fontSize: 12 }}>{t.risk}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8, fontSize: 13, color: 'var(--text2)' }}>
          <strong>Moat Durability:</strong> A- (Strong). Scale advantage is nearly unassailable — would take years and billions for competitors to catch up. Yield advantage over BTC treasuries is permanent. Key risk is ETH price, not competitive dynamics.
        </div>
      </CollapsibleSection>

      {/* Risk Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-risks</div>
      <CollapsibleSection id="risks" title="Risk Matrix" sources={['PR', 'SEC']}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {current.risks.map((r, i) => (
            <div key={i} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: `3px solid ${r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.risk}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: r.severity === 'Critical' ? 'rgba(255,107,107,0.2)' : r.severity === 'High' ? 'rgba(210,153,34,0.2)' : 'rgba(100,149,237,0.2)', color: r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)' }}>{r.severity}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: 'var(--surface)', color: 'var(--text3)' }}>{r.likelihood} likelihood</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{r.detail}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}><strong style={{ color: 'var(--mint)' }}>Mitigation:</strong> {r.mitigation}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Risks & Strategic Assessment */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-strategic</div>
      <CollapsibleSection id="strategic-assessment" title="Risks & Strategic Assessment" sources={['PR', 'SEC']}>
        {/* Section Header */}
        <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>
          Multi-perspective risk evaluation and strategic decision framework for ETH treasury exposure
        </div>

        {/* Part 1: Multi-Perspective Risk Evaluation */}
        <h4 style={{ color: 'var(--text)', fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Risk Evaluation — Four Perspectives</h4>
        
        {/* CFA Level III Perspective */}
        <div style={{ background: 'rgba(139,92,246,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(139,92,246,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--violet)', color: 'white', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>CFA LEVEL III</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Portfolio Construction & Factor Analysis</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>Factor Exposures:</strong> BMNR exhibits ~0.85 beta to ETH with additional equity volatility from NAV premium fluctuations. Correlation to BTC ~0.7, SPY ~0.3. This is levered crypto exposure — expect 1.2-1.5x ETH moves in both directions. The staking yield (3-5% APY on ETH) provides modest carry but doesn't materially reduce volatility. Position sizing must account for crypto-like drawdowns (50-80% peak-to-trough historically).
            </p>
            <p style={{ }}>
              <strong>Liquidity Analysis:</strong> Average daily volume ~$2-5M — adequate for retail but challenging for institutional blocks &gt;$500K without market impact. Bid-ask spreads can widen to 1-2% in volatility. This is a small-cap ($50-150M market cap) with corresponding liquidity constraints. Consider multi-day accumulation for positions &gt;1% of portfolio.
            </p>
            <p style={{ }}>
              <strong>Governance & ESG:</strong> Founder-controlled via Class B shares. Management pivoted successfully from BTC mining — demonstrates adaptability but also thesis drift risk. ESG profile mixed: PoS staking is energy-efficient, but crypto association carries headline risk. No dividend history despite recent announcement — track record TBD.
            </p>
            <p style={{ padding: 10, background: 'rgba(139,92,246,0.1)', borderRadius: 6, borderLeft: '3px solid var(--violet)' }}>
              <strong style={{ color: 'var(--violet)' }}>📊 Ecosystem Assessment:</strong> {current.perspectives.cfa.ecosystemView}
            </p>
          </div>
        </div>

        {/* Hedge Fund Manager Perspective */}
        <div style={{ background: 'rgba(210,153,34,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(210,153,34,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--gold)', color: 'var(--bg)', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>HEDGE FUND</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Alpha Generation & Event Catalysts</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>NAV Arbitrage:</strong> BMNR trades at varying premiums/discounts to NAV. When premium compresses to &lt;10%, accumulate. When premium expands to &gt;50%, trim. This is the core tactical playbook. Track ETH price × holdings ÷ shares = NAV per share, compare to stock price daily. Premium mean-reverts over 30-60 day windows.
            </p>
            <p style={{ }}>
              <strong>Catalyst Stacking:</strong> Key events: (1) MAVAN infrastructure launch — validates yield thesis, (2) ETH ETF approval/flows — institutional demand driver, (3) Quarterly ETH accumulation PRs — shows execution, (4) Staking deployment milestones — unlocks yield narrative. Each positive catalyst builds momentum. Position into catalysts, trim into strength.
            </p>
            <p style={{ }}>
              <strong>Cycle Positioning:</strong> ETH treasury equities are leveraged bets on crypto cycles. In bull markets, NAV premiums expand and stock outperforms ETH. In bear markets, premiums compress and stock underperforms ETH. We're in early-to-mid cycle based on halving timing. Aggressive accumulation phase, but maintain stop-losses for cycle turn protection.
            </p>
            <p style={{ padding: 10, background: 'rgba(210,153,34,0.1)', borderRadius: 6, borderLeft: '3px solid var(--gold)' }}>
              <strong style={{ color: 'var(--gold)' }}>📊 Ecosystem Assessment:</strong> {current.perspectives.hedgeFund.ecosystemView}
            </p>
          </div>
        </div>

        {/* CIO/CIS Institutional Perspective */}
        <div style={{ background: 'rgba(100,149,237,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(100,149,237,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--sky)', color: 'white', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>CIO / CIS</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Strategic Allocation & Fiduciary Considerations</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>Strategic Thesis:</strong> BMNR offers "yield-bearing ETH exposure in equity wrapper" — the only way to get staking yield through traditional brokerage accounts. For investors who can't or won't hold ETH directly, this provides compliant exposure to ETH + staking yield. Think of it as the "MSTR for ETH" with added yield kicker.
            </p>
            <p style={{ }}>
              <strong>Portfolio Fit:</strong> Classify as "alternative/crypto allocation" not "equity." Size within crypto bucket (typically 1-5% of portfolio for aggressive investors, 0% for conservative). Do not benchmark against S&P — this will underperform in risk-off environments. Appropriate for investors with 3-5 year horizons who can stomach 50%+ drawdowns.
            </p>
            <p style={{ }}>
              <strong>Reputational Risk:</strong> Small-cap crypto equity carries headline risk. However, the pivot from BTC mining to ETH treasury is defensible ("we followed the yield opportunity"). If questioned: "It's a regulated equity providing exposure to Ethereum staking infrastructure, not speculative tokens." The yield narrative differentiates from pure crypto speculation.
            </p>
            <p style={{ padding: 10, background: 'rgba(100,149,237,0.1)', borderRadius: 6, borderLeft: '3px solid var(--sky)' }}>
              <strong style={{ color: 'var(--sky)' }}>📊 Ecosystem Assessment:</strong> {current.perspectives.cio.ecosystemView}
            </p>
          </div>
        </div>

        {/* Technical Analyst Perspective */}
        <div style={{ background: 'rgba(52,211,153,0.05)', padding: 16, borderRadius: 8, border: '1px solid rgba(52,211,153,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#34d399', color: 'var(--bg)', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>TECHNICAL ANALYST</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Chart Patterns & Price Action</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>Trend Structure:</strong> Price action shows higher highs and higher lows since ETH treasury pivot — classic uptrend structure. Weekly RSI holding above 50 confirms sustained bullish momentum. MACD histogram expanding on daily timeframe. Key support at 20-day SMA has held on all pullbacks — this is your buy zone.
            </p>
            <p style={{ }}>
              <strong>ETH Correlation:</strong> BMNR exhibits 0.85-0.95 correlation with ETH on 30-day rolling basis — trade it as leveraged ETH proxy. When ETH breaks key levels, BMNR moves 1.2-1.5x. Watch ETH $3,500 support and $4,200 resistance for directional cues on BMNR positioning.
            </p>
            <p style={{ }}>
              <strong>NAV Premium Cycles:</strong> NAV premium/discount provides tactical entry/exit signals independent of price. Accumulate aggressively below 1.0x NAV (discount = free money). Trim 20-30% above 1.5x NAV. Current Bollinger Band squeeze on weekly suggests imminent volatility expansion — prepare for directional move.
            </p>
            <p style={{ padding: 10, background: 'rgba(52,211,153,0.1)', borderRadius: 6, borderLeft: '3px solid #34d399' }}>
              <strong style={{ color: '#34d399' }}>📊 Technical Outlook:</strong> {current.perspectives.technicalAnalyst.ecosystemView}
            </p>
          </div>
        </div>

        {/* Part 2: Key Strategic Questions */}
        <h4 style={{ color: 'var(--text)', fontSize: 15, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Key Strategic Questions</h4>

        {/* Would I Buy Now? */}
        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>Would I Buy Now?</span>
            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '6px 16px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>YES — ACCUMULATE ON DIPS</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>The Case:</strong> At current NAV premium levels, you're getting ETH exposure + staking yield + management execution at a reasonable markup. The "Alchemy of 5%" thesis (premium issuance → NAV accretion) is mathematically sound and management is executing. First-mover advantage in ETH treasury space creates optionality.
            </p>
            <p style={{ }}>
              <strong>The Hesitation:</strong> This is highly correlated to ETH — if ETH drops 50%, expect BMNR to drop 50-70%. Small-cap liquidity means exits can be painful. Management track record is short (pivot was recent). NAV premium can compress rapidly in risk-off environments.
            </p>
            <p style={{ }}>
              <strong>The Verdict:</strong> Yes, but size appropriately and accumulate on weakness. Don't chase NAV premiums &gt;40%. Build position over 4-6 weeks using NAV discount as entry signal. This is a high-conviction, high-volatility position — treat it as levered ETH, not a stock.
            </p>
          </div>
        </div>

        {/* What Can I Expect? */}
        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>What Can I Expect?</div>
          <div className="g3" style={{ }}>
            <div style={{ background: 'rgba(255,193,7,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,193,7,0.2)' }}>
              <div style={{ fontWeight: 600, color: 'var(--gold)', fontSize: 13 }}>Short-Term (0-6 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                Expect ETH-correlated volatility ±30-50%. NAV premium will fluctuate with sentiment. Key catalysts: MAVAN progress, ETH accumulation PRs, staking deployment updates. Trading range tied to ETH — if ETH $3-5K, expect BMNR $3-8 range (rough).
              </div>
            </div>
            <div style={{ background: 'rgba(100,149,237,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(100,149,237,0.2)' }}>
              <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 13 }}>Mid-Term (6-18 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                If ETH cycle continues upward, NAV premium expansion drives outsized returns. Target: 2-4x from entry if ETH doubles and premium expands. Risk: cycle reversal could mean 60-80% drawdown. MAVAN fully operational should validate yield thesis.
              </div>
            </div>
            <div style={{ background: 'rgba(139,92,246,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(139,92,246,0.2)' }}>
              <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 13 }}>Long-Term (3-5 years)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                If ETH reaches $10-20K cycle highs and BMNR executes on accumulation, this could be a 5-10x from current levels. But crypto cycles are brutal — expect at least one 70%+ drawdown along the way. Diamond hands required. Position size must allow holding through drawdowns.
              </div>
            </div>
          </div>
        </div>

        {/* What's My Strategy? */}
        <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8 }}>
          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>What's My Strategy?</div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong style={{ color: 'var(--violet)' }}>Position Sizing:</strong> 1-3% for aggressive crypto-tolerant portfolios, 0.5-1% for growth-oriented, avoid for balanced/conservative. This is your "high-octane ETH exposure" position. Never more than you can watch drop 70% without panic selling.
            </p>
            <p style={{ }}>
              <strong style={{ color: 'var(--sky)' }}>Entry Approach:</strong> Accumulate when NAV premium &lt;20%. Add aggressively when premium &lt;10% or at discount. Reduce when premium &gt;50%. Use 4-6 week DCA to avoid catching falling knives. Set limit orders at target NAV premium levels.
            </p>
            <p style={{ }}>
              <strong style={{ color: 'var(--gold)' }}>Exit Strategy:</strong> Trim 25% at 2x, another 25% at 3x. Let remaining 50% ride with trailing stop at -30% from highs. Full exit if thesis breaks (management stops accumulating, yield thesis fails, competitive moat erodes).
            </p>
            <p style={{ }}>
              <strong style={{ color: 'var(--coral)' }}>Risk Management:</strong> Set mental stop at -50% from entry (not hard stop — liquidity issues). If ETH enters confirmed bear market (below 200-day MA for 60+ days), reduce position by 50%. Re-enter when cycle turns. Don't try to catch the exact bottom.
            </p>
          </div>
        </div>
        
        {/* Ecosystem-Based Triggers */}
        <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,212,170,0.08))', padding: 16, borderRadius: 8, border: '1px solid rgba(139,92,246,0.2)' }}>
          <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 15 }}>📊 Ecosystem-Based Triggers</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>Monitor these Ethereum ecosystem signals (see Ethereum tab) alongside BMNR-specific metrics</div>
          
          <div className="g3">
            {/* Entry Signals */}
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 13 }}>✅ Entry Signals (Consider Adding)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  'ETF net flows positive 3+ weeks',
                  'DeFi TVL expanding >5% monthly',
                  'Major protocol upgrade successful',
                  'Enterprise adoption announcement',
                  'Staking rate stable or growing',
                ].map((signal, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--mint)' }}>→</span> {signal}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Exit Signals */}
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontWeight: 600, color: 'var(--coral)', fontSize: 13 }}>⚠️ Exit Signals (Consider Reducing)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  'ETF outflows >$500M for 2+ weeks',
                  'DeFi TVL contracting >10% monthly',
                  'Protocol upgrade delayed 6+ months',
                  'Regulatory enforcement on ETH',
                  'Staking rate declining >2%',
                ].map((signal, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--coral)' }}>→</span> {signal}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hold Signals */}
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 13 }}>⏸️ Hold Signals (Stay Course)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  'Mixed or flat ETF flows',
                  'Sideways DeFi activity',
                  'Protocol development on track',
                  'No major regulatory changes',
                  'Ecosystem metrics stable',
                ].map((signal, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--sky)' }}>→</span> {signal}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Position Sizing */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-position</div>
      <CollapsibleSection id="position" title="Position Sizing" sources="WS">
        <div className="g2" style={{ }}>
          <div>
            <h4 style={{ color: 'var(--text)', fontSize: 14 }}>Recommended Allocation</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {Object.entries(current.positionSizing).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}>
                  <span style={{ color: 'var(--text2)', textTransform: 'capitalize' }}>{key}</span>
                  <span style={{ color: key === 'aggressive' ? 'var(--mint)' : key === 'growth' ? 'var(--sky)' : key === 'balanced' ? 'var(--gold)' : 'var(--coral)', fontWeight: 500 }}>{val.range}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--text)', fontSize: 14 }}>Accumulation Zones</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {current.accumulation.map((z, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}>
                  <span style={{ color: 'var(--text2)' }}>{z.zone}</span>
                  <span style={{ color: z.color, fontWeight: 500 }}>{z.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Context — Unified framework for multi-asset allocation */}
        <div style={{ padding: 16, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(100,149,237,0.08))', borderRadius: 8, border: '1px solid rgba(139,92,246,0.2)' }}>
          <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 14 }}>Portfolio Construction Context</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>For multi-asset portfolios holding BMNR alongside other positions</div>
          <div className="g3" style={{ marginTop: 12 }}>
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Asset Class Bucket</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>Alternatives / Crypto</div>
              <div style={{ fontSize: 11, color: 'var(--gold)' }}>Limit: 10-20% of portfolio</div>
            </div>
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Single-Name Limit</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>5-10% max</div>
              <div style={{ fontSize: 11, color: 'var(--coral)' }}>High volatility asset</div>
            </div>
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Correlation Note</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>BMNR + CRCL</div>
              <div style={{ fontSize: 11, color: 'var(--sky)' }}>Both ETH-correlated; size combined</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8 }}>
            <strong>Combined Crypto Allocation:</strong> If holding both BMNR and CRCL, treat as a single "Ethereum ecosystem" allocation. Combined weight should not exceed alternatives bucket limit. BMNR provides NAV/yield exposure; CRCL provides infrastructure/revenue exposure.
          </div>
        </div>
      </CollapsibleSection>

      {/* Analysis Archive */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#investment-archive</div>
      <CollapsibleSection id="archive" title="Analysis Archive — Complete History" sources={['PR', 'SEC']}>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Full record of all investment thesis updates. Never deleted.</div>
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 500, overflowY: 'auto' }}>
          {archive.map((a, i) => (
            <div key={i} style={{ background: i === 0 ? 'rgba(126,231,135,0.05)' : 'var(--surface2)', padding: 16, borderRadius: 8, border: i === 0 ? '1px solid rgba(126,231,135,0.2)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{a.date}</span>
                  {i === 0 && <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>CURRENT</span>}
                </div>
                <span style={{ color: a.verdictColor === 'green' ? 'var(--mint)' : a.verdictColor === 'yellow' ? 'var(--gold)' : 'var(--coral)', fontWeight: 600, fontSize: 13 }}>{a.verdict}</span>
              </div>
              <div style={{ color: 'var(--text2)', fontSize: 13 }}>{a.summary}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Source: {a.source}</div>
              
              {expandedArchive === i && a.fullAnalysis && (
                <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{a.fullAnalysis.context}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {a.fullAnalysis.keyHighlights.map((h, j) => (
                      <span key={j} style={{ padding: '4px 8px', background: 'var(--surface)', borderRadius: 4, fontSize: 11, color: 'var(--text3)' }}>• {h}</span>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setExpandedArchive(expandedArchive === i ? null : i)}
                style={{ fontSize: 11, color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {expandedArchive === i ? '▼ Less' : '▶ More details'}
              </button>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Investment Framework" items={[
        { term: 'Letter Grade Scorecard', def: 'A-F ratings across dimensions: Growth (ETH accumulation), Profitability (staking yield), Moat (first-mover ETH treasury), Execution (management track record), Valuation (NAV premium).' },
        { term: 'Three Perspectives', def: 'CFA Analyst (NAV fundamentals), Hedge Fund (crypto cycles and catalysts), CIO (portfolio crypto allocation). Different time horizons and risk tolerances.' },
        { term: 'Growth Drivers', def: 'ETH accumulation rate, staking deployment, MAVAN launch, NAV premium expansion. Track execution against "Alchemy of 5%" thesis.' },
        { term: 'Risk Assessment', def: 'Crypto volatility, regulatory uncertainty, smart contract risk, slashing risk. Weight by probability × impact.' },
        { term: 'Archive Discipline', def: 'All prior analyses preserved permanently. Track prediction accuracy over time. Never delete, only append.' },
        { term: 'Position Sizing', def: 'Conviction level × risk tolerance × crypto allocation limit = position size. ETH treasury is levered crypto exposure.' },
      ]} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUARTERLY METRICS PANEL - Unified pattern matching ASTS QuarterlyMetricsPanel
// ═══════════════════════════════════════════════════════════════════════════════
const BMNRQuarterlyMetricsPanel = () => {
  const [opExQuarter, setOpExQuarter] = useState('Q1 2026');

  // === QUARTERLY DATA (transformed from original filings) - newest first ===
  const quarterlyData = [
    { quarter: 'Q1 2026', cash: 888, crypto: 10562, cryptoType: 'ETH', assets: 11487, liabilities: 236, equity: 11252, revenue: 2.3, netIncome: -5204, shares: 409, era: '💎 ETH', opEx: 18, opExGandA: 12, opExTreasury: 4, opExOther: 2, filing: '10-Q (Jan 2026)', ethHoldings: 4500000, stakingYield: 3.5, stakingDeployed: 450000 },
    { quarter: 'Q4 2025', cash: 512, crypto: 8260, cryptoType: 'ETH', assets: 8800, liabilities: 102, equity: 8690, revenue: 5.8, netIncome: 328, shares: 384, era: '💎 ETH', opEx: 15, opExGandA: 10, opExTreasury: 3, opExOther: 2, filing: '10-K (Nov 2025)', ethHoldings: 4110000, stakingYield: 3.5, stakingDeployed: 409000 },
    { quarter: 'Q3 2025', cash: 1.5, crypto: 0.17, cryptoType: 'BTC', assets: 8.27, liabilities: 5.39, equity: 2.88, revenue: 2.1, netIncome: -0.62, shares: 6.2, era: '⛏️ BTC', opEx: 2.8, opExGandA: 2.2, opExOther: 0.6, filing: '10-Q/A (Feb 2025)' },
    { quarter: 'Q2 2025', cash: 0.5, crypto: 0.25, cryptoType: 'BTC', assets: 7.50, liabilities: 4.82, equity: 2.68, revenue: 1.5, netIncome: -1.15, shares: 39.7, era: '⛏️ BTC', opEx: 2.5, opExGandA: 2.0, opExOther: 0.5, filing: '10-Q (Nov 2024)' },
    { quarter: 'Q1 2025', cash: 0.8, crypto: 0.15, cryptoType: 'BTC', assets: 7.93, liabilities: 4.47, equity: 3.47, revenue: 1.2, netIncome: -0.975, shares: 39.7, era: '⛏️ BTC', opEx: 2.2, opExGandA: 1.8, opExOther: 0.4, filing: '10-Q (Aug 2024)' },
  ];

  const latestQuarter = quarterlyData[0];
  const opExQuarters = quarterlyData.filter(q => q.opEx).map(q => q.quarter);

  // Dynamic metrics array - ASTS pattern
  const metrics = [
    { label: 'Cash & Equiv', key: 'cash', format: (v: number) => v >= 100 ? `$${v}M` : `$${(v * 1000).toFixed(0)}K`, color: (v: number) => v > 100 ? 'var(--mint)' : undefined },
    { label: 'Crypto Holdings', key: 'crypto', format: (v: number, q: typeof quarterlyData[0]) => v >= 1000 ? `$${(v/1000).toFixed(2)}B` : `$${(v * 1000).toFixed(0)}K`, color: (_v: number, q: typeof quarterlyData[0]) => q.cryptoType === 'ETH' ? 'var(--violet)' : 'var(--gold)' },
    { label: 'Crypto Type', key: 'cryptoType', format: (v: string) => v, color: (v: string) => v === 'ETH' ? 'var(--violet)' : 'var(--gold)' },
    { label: 'Total Assets', key: 'assets', format: (v: number) => v >= 1000 ? `$${(v/1000).toFixed(2)}B` : `$${v.toFixed(2)}M`, color: (v: number) => v > 100 ? 'var(--mint)' : undefined },
    { label: 'Total Liabilities', key: 'liabilities', format: (v: number) => `$${v.toFixed(v >= 100 ? 0 : 2)}M`, color: () => undefined },
    { label: "Stockholders' Equity", key: 'equity', format: (v: number) => v >= 1000 ? `$${(v/1000).toFixed(2)}B` : `$${v.toFixed(2)}M`, color: (v: number) => v > 100 ? 'var(--mint)' : undefined },
    { label: 'Revenue', key: 'revenue', format: (v: number) => `$${v.toFixed(1)}M`, color: () => undefined },
    { label: 'Net Income', key: 'netIncome', format: (v: number) => v >= 0 ? `$${v}M` : `-$${Math.abs(v)}M`, color: (v: number) => v >= 0 ? 'var(--mint)' : 'var(--coral)' },
    { label: 'Shares Outstanding', key: 'shares', format: (v: number) => `${v.toFixed(1)}M`, color: (v: number) => v > 100 ? 'var(--gold)' : undefined },
    { label: 'Era', key: 'era', format: (v: string) => v, color: (v: string) => v.includes('ETH') ? 'var(--violet)' : 'var(--gold)' },
  ];

  return (
    <>
      {/* #quarterly-metrics */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#quarterly-metrics</div>
      <div className="card"><div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Key Metrics Evolution<UpdateIndicators sources="SEC" /></div>
        {/* Summary Badges - ASTS pattern */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span className="pill" style={{ background: 'rgba(34,211,238,0.15)', borderColor: 'var(--cyan)', color: 'var(--cyan)' }}>
            {quarterlyData.length} quarters of data ({quarterlyData[0].quarter} - {quarterlyData[quarterlyData.length-1].quarter})
          </span>
          <span className="pill" style={{ background: 'rgba(34,197,94,0.15)', borderColor: 'var(--mint)', color: 'var(--mint)' }}>
            Assets: ${quarterlyData[0].assets}M → ${(quarterlyData[quarterlyData.length-1].assets/1000).toFixed(1)}B
          </span>
          <span className="pill" style={{ background: 'rgba(251,146,60,0.15)', borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            Shares: {quarterlyData[0].shares.toFixed(0)}M → {quarterlyData[quarterlyData.length-1].shares.toFixed(0)}M
          </span>
          <span className="pill" style={{ background: 'rgba(139,92,246,0.15)', borderColor: 'var(--violet)', color: 'var(--violet)' }}>
            Era: ⛏️ BTC Mining → 💎 ETH Treasury
          </span>
        </div>

        {/* Quarterly Table - ASTS dynamic pattern */}
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ position: 'sticky', left: 0, background: 'var(--bg1)', minWidth: 100 }}>Metric</th>
                {quarterlyData.map((q, idx) => (
                  <th key={q.quarter} className="r" style={{ minWidth: 70, whiteSpace: 'nowrap', ...(idx === 0 ? { background: 'var(--accent-dim)' } : {}) }}>
                    {q.quarter.replace('Q', '').replace(' ', "'")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map(metric => (
                <tr key={metric.label}>
                  <td style={{ position: 'sticky', left: 0, background: 'var(--bg1)', fontWeight: 500 }}>
                    {metric.label}
                  </td>
                  {quarterlyData.map((q, idx) => {
                    const val = q[metric.key as keyof typeof q];
                    const cellColor = metric.color(val as never, q as never);
                    const isLatestQuarter = idx === 0;
                    return (
                      <td
                        key={q.quarter}
                        className="r"
                        style={{
                          ...(isLatestQuarter ? { background: 'var(--accent-dim)' } : {}),
                          ...(cellColor ? { color: cellColor } : {})
                        }}
                      >
                        {metric.format(val as never, q as never)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnotes - ASTS pattern */}
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          <p style={{ }}>* Q3 shares corrected in 10-Q/A amendment due to reverse stock split accounting error.</p>
          <p style={{ }}>* FY 2025 reflects post-pivot ETH treasury company. Pre-pivot quarters show BTC mining operations with going concern warning.</p>
          <p>* Data from SEC filings (10-K, 10-Q, 8-K). Q1 2026 net loss of ($5.2B) reflects unrealized ETH mark-to-market decline.</p>
        </div>

        {/* Latest Quarter Summary - ASTS pattern */}
        <div style={{ }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#latest-quarter-summary</div>
          <div className="card"><div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Latest Quarter Summary ({latestQuarter.quarter})<UpdateIndicators sources="SEC" /></div>
            <div className="g2">
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filing Source</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.filing}</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ETH Holdings</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.ethHoldings?.toLocaleString() || '—'} ETH</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Staking Deployed</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.stakingDeployed?.toLocaleString() || '—'} ETH ({latestQuarter.stakingYield}% yield)</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Treasury Value</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${(latestQuarter.crypto/1000).toFixed(2)}B</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cash Position</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${latestQuarter.cash}M</div>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Assets</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${(latestQuarter.assets/1000).toFixed(2)}B</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          Data sourced from SEC filings (10-K, 10-Q). Latest filing: {latestQuarter.filing}.
        </div>
      </div>

      {/* ROW 1: Cash Position & OpEx - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#charts-row-1</div>
      <div className="g2">
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--cyan)' }}>Cash Position Evolution<UpdateIndicators sources="SEC" /></div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={quarterlyData.slice().reverse().map(q => ({ quarter: q.quarter, cash: q.cash }))}>
              <defs>
                <linearGradient id="cashGradientBMNR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => v >= 100 ? `$${v}M` : `$${(v*1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [v >= 100 ? `$${v}M` : `$${(v*1000).toFixed(0)}K`, 'Cash']} />
              <Area type="monotone" dataKey="cash" stroke="var(--mint)" fill="url(#cashGradientBMNR)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--mint)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Cash & Equivalents</span></div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Post-pivot: $250M PIPE + subsequent ATM raises</div>
        </div>

        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--violet)' }}>Quarterly Burn Rate (OpEx)<UpdateIndicators sources="SEC" /></div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={quarterlyData.slice().reverse().filter(q => q.opEx).map(q => ({ quarter: q.quarter, opEx: q.opEx }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`$${v}M`, 'OpEx']} />
              <Line type="monotone" dataKey="opEx" stroke="var(--violet)" strokeWidth={2} dot={{ fill: 'var(--violet)' }} />
            </LineChart>
          </ResponsiveContainer>
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
                  <div className="g2" style={{ fontSize: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>G&A:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opExGandA}M</span>
                    </div>
                    {q.opExTreasury && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text3)' }}>Treasury Ops:</span>
                        <span style={{ color: 'var(--violet)' }}>${q.opExTreasury}M</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Other:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opExOther}M</span>
                    </div>
                  </div>
                  <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 500 }}>
                      <span style={{ color: 'var(--text2)' }}>Total OpEx:</span>
                      <span style={{ color: 'var(--violet)' }}>${q.opEx}M</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ROW 2: Share Count & Market Cap - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#charts-row-2</div>
      <div className="g2">
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--gold)' }}>Share Count (Outstanding)<UpdateIndicators sources="SEC" /></div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={quarterlyData.slice().reverse().map(q => ({ quarter: q.quarter, shares: q.shares }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [`${v.toFixed(1)}M shares`, 'Outstanding']} />
              <Bar dataKey="shares" fill="var(--coral)" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--coral)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Outstanding Shares</span></div>
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--sky)' }}>Market Cap Evolution ($M)<UpdateIndicators sources="SEC" /></div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={[
              { quarter: 'Q1 2025', mktCap: 40 },
              { quarter: 'Q2 2025', mktCap: 35 },
              { quarter: 'Q3 2025', mktCap: 50 },
              { quarter: 'Q4 2025', mktCap: 8800 },
              { quarter: 'Q1 2026', mktCap: 7200 },
            ]}>
              <defs>
                <linearGradient id="mcapGradientBMNR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(1)}B` : `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [v >= 1000 ? `$${(v/1000).toFixed(2)}B` : `$${v}M`, 'Market Cap']} />
              <Area type="monotone" dataKey="mktCap" stroke="var(--sky)" fill="url(#mcapGradientBMNR)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--sky)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Market Cap</span></div>
          </div>
        </div>
      </div>

      {/* ROW 3: Company Specific (Crypto Holdings & NI) - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#charts-row-3</div>
      <div className="g2">
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--violet)' }}>Crypto Holdings Evolution<UpdateIndicators sources="SEC" /></div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={quarterlyData.slice().reverse().map(q => ({ quarter: q.quarter, crypto: q.crypto }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(1)}B` : `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [v >= 1000 ? `$${(v/1000).toFixed(2)}B` : `$${(v*1000).toFixed(0)}K`, 'Crypto']} />
              <Bar dataKey="crypto" fill="var(--violet)" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--gold)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Pre-pivot: BTC</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--violet)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Post-pivot: ETH</span></div>
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--mint)' }}>Net Income/(Loss)<UpdateIndicators sources="SEC" /></div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={quarterlyData.slice().reverse().map(q => ({ quarter: q.quarter, income: q.netIncome }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(1)}B` : v <= -1000 ? `($${(Math.abs(v)/1000).toFixed(1)}B)` : `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={v => [v >= 0 ? `$${v}M` : `($${Math.abs(Number(v))}M)`, v >= 0 ? 'Net Income' : 'Net Loss']} />
              <Bar dataKey="income" fill="var(--mint)" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--mint)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Net Income</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, background: 'var(--coral)', borderRadius: 2 }}></div><span style={{ color: 'var(--text3)' }}>Net Loss</span></div>
          </div>
        </div>
      </div>
    </>
  );
};

const FinancialsTab = () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // UNIFIED FINANCIALS TAB - Canonical structure shared across all models
  // Only data and labels differ between ASTS, BMNR, and CRCL
  // ═══════════════════════════════════════════════════════════════════════════

  // === COMPANY-SPECIFIC CONFIGURATION ===
  const config = {
    highlightTitle: 'SEC Filings & Financial History',
    highlightText: 'BMNR pivoted from BTC mining (pre-pivot) to ETH treasury company (post-pivot) in June 2025. Track the transformation through SEC filings. FY2025 10-K marks the first full filing as an ETH treasury company with $8.8B in assets.',
    milestones: [
      { date: 'Jun 2025', event: 'PIPE Close: $250M' },
      { date: 'Jul 14, 2025', event: 'First ETH: 163K' },
      { date: 'Aug 10, 2025', event: '1M ETH Milestone' },
      { date: 'Sep 2025', event: '2M ETH Milestone' },
      { date: 'Oct 2025', event: '3M ETH Milestone' },
      { date: 'Nov 21, 2025', event: 'FY 2025: $349M NI' },
      { date: 'Dec 21, 2025', event: '4M ETH Milestone' },
      { date: 'Dec 29, 2025', event: 'Staking: 409K ETH' },
      { date: 'Jan 13, 2026', event: 'Q1 2026 10-Q: First Staking Rev' },
    ],
    cfaNotes: [
      { term: '10-K (Annual Report)', def: 'Comprehensive annual filing with audited financials, MD&A, risk factors. Most detailed disclosure. Filed within 60-90 days of fiscal year end.' },
      { term: '10-Q (Quarterly Report)', def: 'Quarterly update with reviewed (not audited) financials. Less detailed than 10-K but more timely. Filed within 40-45 days of quarter end.' },
      { term: '8-K (Current Report)', def: 'Material event disclosure (acquisitions, management changes, etc.). Filed within 4 business days of event. Critical for real-time monitoring.' },
      { term: 'Going Concern', def: 'Auditor flags substantial doubt about company\'s ability to continue operating. BMNR had this flag during BTC mining era due to losses.' },
      { term: 'Balance Sheet Analysis', def: 'Compare assets vs liabilities, track crypto holdings growth, monitor cash runway. Key for treasury companies: crypto as % of total assets.' },
      { term: 'Era Transition', def: 'BMNR pivoted from BTC mining (pre-pivot) to ETH treasury (post-pivot) in mid-2025. Compare metrics across eras cautiously.' },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HEADER                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#financials-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Financials<UpdateIndicators sources="SEC" /></h2>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: HIGHLIGHT BOX                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#financials-overview</div>
      <div className="highlight">
        <h3 style={{ display: 'flex', alignItems: 'center' }}>{config.highlightTitle}<UpdateIndicators sources="SEC" /></h3>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>{config.highlightText}</p>
      </div>
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3-7: QUARTERLY METRICS PANEL (Unified Component)           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <BMNRQuarterlyMetricsPanel />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8: KEY FINANCIAL MILESTONES                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#key-financial-milestones</div>
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', color: 'var(--gold)' }}>📅 Key Financial Milestones<UpdateIndicators sources="SEC" /></div>
        <div className="g4">
          {config.milestones.map((m, i) => (
            <div key={i} style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.date}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{m.event}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 9: CFA NOTES                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Financial Analysis" items={config.cfaNotes} />
    </div>
  );
};

// ETHEREUM TAB - Ecosystem tracking for ETH price drivers
const EthereumTab = ({ ethPrice, currentETH, currentShares, currentStockPrice }) => {
  const [timelineFilter, setTimelineFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set());
  
  // BMNR-ETH Correlation Metrics
  const totalShares = currentShares * 1e6; // Convert from millions to actual shares
  const navPerShare = totalShares > 0 ? (currentETH * ethPrice) / totalShares : 0;
  const navPremium = navPerShare > 0 ? ((currentStockPrice / navPerShare) - 1) * 100 : 0;
  const ethPerShare = totalShares > 0 ? currentETH / totalShares : 0;
  const impliedEthPrice = ethPerShare > 0 ? currentStockPrice / ethPerShare : 0;
  const navSensitivity = totalShares > 0 ? (currentETH * 100) / totalShares : 0; // NAV change per $100 ETH move
  
  // Ethereum Ecosystem Data
  const ecosystemMetrics = {
    stakingRate: 28.3,
    totalStaked: 34.2, // Million ETH
    validatorCount: 1067000,
    defiTVL: 62.4, // Billion USD
    l2TVL: 18.7, // Billion USD
    dailyActiveAddresses: 420000,
    avgGasFee: 12, // Gwei
    networkRevenue24h: 2.8, // Million USD
    burnRate24h: 1.2, // Thousand ETH
    supplyGrowth: -0.2, // % annual (deflationary)
  };
  
  // ETH ETF Data
  const etfData = {
    totalAUM: 12.4, // Billion USD
    netFlows7d: 340, // Million USD
    topHolders: [
      { name: 'Grayscale ETHE', aum: 4.8, change: -2.1 },
      { name: 'BlackRock ETHA', aum: 3.2, change: +8.4 },
      { name: 'Fidelity FETH', aum: 2.1, change: +5.2 },
      { name: 'Bitwise ETHW', aum: 1.1, change: +3.8 },
      { name: '21Shares CETH', aum: 0.8, change: +2.1 },
    ],
  };
  
  // Protocol Roadmap
  const protocolRoadmap = [
    { name: 'Pectra Upgrade', date: 'Nov 2025', status: 'Complete', impact: 'High', description: 'Account abstraction (EIP-7702), validator consolidation (2048 ETH max), historical block hashes' },
    { name: 'Fusaka Upgrade', date: 'Dec 2025', status: 'Complete', impact: 'High', description: 'PeerDAS (EIP-7594), 60M gas limit, secp256r1 precompile, BPO blob scaling' },
    { name: 'Verkle Trees', date: 'Q3 2026', status: 'Development', impact: 'High', description: 'Stateless clients, reduced storage requirements, faster sync' },
    { name: 'Single Slot Finality', date: '2027+', status: 'Research', impact: 'Medium', description: 'Reduce finality time from ~15 min to ~12 sec' },
    { name: 'Danksharding', date: '2027+', status: 'Research', impact: 'Very High', description: 'Full data sharding, 100x+ L2 scaling capacity' },
  ];
  
  // Ethereum Adoption Timeline - Institutional & Enterprise adoption events
  // Each entry includes: date, category, company, title, summary (detailed), significance, bmnrImplication, impact, source
  const adoptionTimeline = [
    // === FEBRUARY 2026 ===
    {
      date: '2026-02-06',
      category: 'Protocol',
      company: 'ENS (Ethereum Name Service)',
      title: 'ENSv2 Staying on Ethereum L1 — Namechain L2 Cancelled as Ethereum Scaling Makes It Unnecessary',
      summary: 'ENS lead developer nick.eth announces ENSv2 will deploy exclusively on Ethereum L1, ceasing development of Namechain (their planned custom L2). Key driver: Ethereum L1 scaling faster than anyone predicted — 99% reduction in ENS registration gas costs over past year. Gas limit increased from 30M to 60M in 2025 (Fusaka upgrade), with core devs targeting 200M in 2026. ENS registration now costs <5 cents in gas (down from ~$5). At current gas prices, subsidizing every ENS transaction in 2025 would cost ~$10,000 — far less than running an L2. ENSv2 features still shipping: single-step registration, stablecoin purchases from any chain, new registry design, ENS App and ENS Explorer now in public alpha. Nick.eth: "If we were starting today, knowing what we know about Ethereum\'s scaling progress and trajectory, would we build our own L2 for ENSv2? The answer is clearly no." Staying on L1 provides strongest security, decentralization, and liveness guarantees — no additional trust assumptions from L2 rollup contracts or centralized preconfers.',
      significance: 'LANDMARK DECISION: Major Ethereum protocol (ENS, millions of names) choosing to STAY on L1 rather than migrate to L2 because L1 is now cheap enough. Validates Ethereum\'s scaling roadmap in the most concrete way possible — a major project that planned an L2 for 2 years cancelled it because L1 scaling exceeded expectations. 99% gas cost reduction + 200M gas limit target = Ethereum L1 becoming viable for mass consumer applications. ENS comparing Namechain to Concorde — knowing when to change course is leadership.',
      bmnrImplication: 'ENS staying on L1 is one of the strongest validation signals for Ethereum\'s scaling trajectory. Gas limit 30M → 60M → 200M target makes L1 viable for consumer apps. More activity staying on L1 = more direct ETH demand for gas = more value accrual to ETH. 99% cost reduction demolishes the "Ethereum is too expensive" narrative. BMNR thesis strengthened: Ethereum scaling is working, and the network is becoming institutional-grade infrastructure.',
      impact: 'Bullish',
      source: 'ENS Blog'
    },
    {
      date: '2026-02-05',
      category: 'Protocol',
      company: 'Ethereum Foundation',
      title: 'Vitalik Proposes New Forms of State for 1000x Ethereum Scaling',
      summary: 'Vitalik Buterin publishes comprehensive post outlining path to 1000x Ethereum scaling by introducing new forms of state. Key insight: execution and data can scale 1000x (via ZK-EVMs and PeerDAS), but state can only scale ~10-20x with current architecture due to syncing constraints and database efficiency limits. Proposes "barbell solution": (1) Keep existing permanent storage but allow it to become relatively more expensive; (2) Create new cheaper but more restrictive state types. New state forms proposed: TEMPORARY STORAGE - state that expires after ~1 month, ideal for auctions, governance votes, games, fraud proofs. UTXO MODEL - records created and immediately pushed to history, with permanent bitfield tracking spent/unspent status. Implementation details include resurrection mechanisms using tree indexes and bitfields allowing out-of-order balance recovery. Developer impact: accounts and contract code stay in permanent storage, NFTs/ERC20 balances move to UTXOs or temporary storage, defi core contracts permanent but individual positions (CDPs) in temporary storage. Vitalik: "If we can deliver developer-friendly abstractions that allow ~95% of state to move to UTXOs without significant pain, we can get most of the scaling benefit of UTXOs and most of the developer-friendliness of Ethereum-style accounts."',
      significance: 'MAJOR SCALING ROADMAP UPDATE from Ethereum co-founder. Addresses the one resource (state) that lacks a "magic bullet" solution like ZK-EVMs (execution) or PeerDAS (data). Proposes concrete technical path to 1000x scaling across ALL resources. Shows Ethereum Foundation actively solving hardest remaining scaling problems. Backwards-compatible approach: existing apps can continue as-is (higher cost) while new apps opt into cheaper tiers.',
      bmnrImplication: 'Vitalik\'s state scaling proposal removes the last major bottleneck to 1000x Ethereum scaling. With ZK-EVMs, PeerDAS, AND new state forms, Ethereum has credible path to scale ALL resources by 1000x. This positions Ethereum to handle massive institutional adoption without congestion or high fees. BMNR thesis that ETH is institutional-grade infrastructure gets stronger with clear long-term scaling roadmap.',
      impact: 'Bullish',
      source: 'Vitalik.eth Blog'
    },
    {
      date: '2026-02-04',
      category: 'Institutional',
      company: 'Fidelity',
      title: 'Fidelity Launches FIDD Stablecoin on Ethereum - $12T Asset Manager Goes Live',
      summary: 'Fidelity Digital Assets officially launches the Fidelity Digital Dollar (FIDD), a USD-pegged stablecoin, on the Ethereum blockchain. FIDD is issued by Fidelity Digital Assets, National Association, and each token is redeemable 1:1 for U.S. dollars. Reserves backing FIDD include cash, U.S. Treasury bills, and repurchase agreements managed internally by Fidelity. Available to both retail and institutional users through Fidelity platforms and select cryptocurrency exchanges. FIDD is designed for on-chain payments, settlements, and use as digital cash equivalent within blockchain-based financial products. Can be purchased and redeemed directly through Fidelity\'s crypto services with integration to brokerage and institutional accounts. No initial supply cap disclosed - issuance will expand based on demand. Launch follows years of blockchain experimentation by Fidelity (started 2014, digital asset subsidiary 2018). Regulatory clarity from federal stablecoin legislation in 2025 (GENIUS Act) accelerated the launch. Market observers note Fidelity\'s brand and regulatory footing may appeal to risk-conscious users.',
      significance: 'FIDELITY GOES LIVE. $12 trillion asset manager\'s stablecoin is now operational on Ethereum mainnet. First major TradFi stablecoin actually in production (not just announced). Fidelity\'s massive retail customer base and institutional relationships provide built-in distribution. Treasury-backed reserves with internal management = institutional-grade risk profile.',
      bmnrImplication: 'Fidelity FIDD going live validates Ethereum as THE institutional stablecoin platform. $12T asset manager now has operational skin in the game on Ethereum. Tokenized funds and RWA settlement use cases get a new stable asset option. More institutional liquidity on Ethereum = stronger network effects = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Bitcoin.com / CoinGecko'
    },
    {
      date: '2026-02-04',
      category: 'Enterprise',
      company: 'Figment',
      title: 'Figment Achieves Full NORS Certification for Ethereum - First in North America and Europe',
      summary: 'Figment, the largest independent provider of institutional staking infrastructure, achieves Full Certification under the Node Operator Risk Standard (NORS) for Ethereum. NORS is an independent, industry-recognized framework evaluating node operators across security, operational resilience, and governance. Figment is the first entity in North America and Europe to complete NORS certification. The standard establishes enterprise-grade criteria across slashing prevention, validator diversity, key management practices, and operational security/resilience. Unlike self-attested best practices, NORS requires operators to demonstrate real operating procedures through audited documentation, technical evidence, and validated controls. Annalea Sanders, Figment COO/CISO: "Institutional staking requires more than strong performance claims — it requires objective, independently validated operational excellence." Chris Matta, CEO at Liquid Collective: "Figment\'s Full Certification demonstrates the maturity of its controls and the rigor of its operational practices in meeting enterprise-grade expectations." NORS certification joins Figment\'s portfolio including SOC 1 Type I, SOC 2 Type II, ISO 27001, and OFAC-compliant MEV relays.',
      significance: 'First Ethereum staking infrastructure certification in North America and Europe. NORS establishes enterprise-grade standard for institutional staking providers. Certification covers critical operational risks: slashing, validator diversity, key management. Independent validation (vs. self-attestation) provides institutional-grade assurance for staking allocation decisions.',
      bmnrImplication: 'NORS certification validates Ethereum staking as institutional-grade infrastructure. Enterprise-grade standards for node operators supports BMNR staking thesis. More certified staking infrastructure = more institutional confidence in ETH staking = supports BMNR\'s staked ETH strategy.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    // === JANUARY 2026 ===
    {
      date: '2026-01-30',
      category: 'Institutional',
      company: 'Naviator Global',
      title: 'Abu Dhabi Family Office Naviator Global Appoints Ethereum Foundation Policy Advisor',
      summary: 'Abu Dhabi-based investment and family office Naviator Global appoints Steven Nam, policy and legal advisor at the Ethereum Foundation, as advisor. Nam specializes in legal and policy dimensions of decentralized technologies, advises Ethereum Foundation on global policy and regulatory matters including South Korea, and leads governance initiatives at Stanford Cyber Policy Center. Also serves as editor-in-chief of academic journal on blockchain law and digital asset policy. Appointment signals Naviator Global\'s intention to strengthen strategic focus on areas where technology, public policy, and governance intersect. Representative stated: "We recognized the need to bring in expertise that can support long-term, structured decision-making amid a rapidly changing global environment. Steven Nam\'s experience will play an important role in shaping Naviator Global\'s direction in areas where technology and institutional frameworks meet." Abu Dhabi has emerged as global hub for family offices supported by regulatory environment encouraging convergence of finance, technology, and policy experimentation.',
      significance: 'Ethereum Foundation policy expertise entering Abu Dhabi family office ecosystem. Signals institutional interest in Ethereum governance and policy dimensions beyond pure investment. Aligns with Abu Dhabi\'s emergence as global hub for digital asset regulation and infrastructure (ADGM, ADI Chain).',
      bmnrImplication: 'Ethereum Foundation advisor joining Abu Dhabi family office reinforces MENA region\'s growing institutional commitment to Ethereum ecosystem. Policy expertise integration suggests long-term strategic positioning around Ethereum governance. Complements ADI Chain and ADGM institutional activity in the region.',
      impact: 'Bullish',
      source: 'ACCESS Newswire'
    },
    {
      date: '2026-01-29',
      category: 'Protocol',
      company: 'Ethereum Foundation',
      title: 'ERC-8004 Trustless Agents Standard Goes Live on Ethereum Mainnet',
      summary: 'ERC-8004, the Ethereum standard for Trustless Agents, officially launches on Ethereum mainnet. The standard defines three on-chain registries enabling AI agents to operate as accountable economic actors: (1) Identity Registry using ERC-721 tokens for unique agent identification, (2) Reputation Registry for permanent, immutable feedback on agent performance, (3) Validation Registry for third-party verification of agent work. Authored by Marco De Rossi (MetaMask AI Lead), Davide Crapis (Ethereum Foundation Head of AI), Jordan Ellis (Google Software Engineer), and Erik Reppel (Coinbase Head of Engineering), with feedback from 80+ teams. Integrates with x402 for programmable payments. During testnet: 10,000+ agents registered, 20,000+ feedback entries exchanged. Audited by Cyfrin, Nethermind, and Ethereum Foundation Security Team. Marco De Rossi: "Humanity needs credibly neutral infrastructure for the AI age: open protocols, controlled by no one, where economic actors (humans and AIs) can discover each other and exchange trust signals freely." Davide Crapis: "Ethereum is in the unique position to be the platform that secures and settles AI-to-AI interactions." Deploying on Base, Optimism, Polygon, Linea, Arbitrum, Monad, Gnosis, Celo, and Scroll in coming weeks.',
      significance: 'WATERSHED MOMENT for AI-blockchain convergence. First standardized on-chain infrastructure for AI agent identity, reputation, and validation. Authored by leaders from MetaMask, Ethereum Foundation, Google, and Coinbase. Creates foundation for AI-native economy: agents discovering agents, verifying track records, purchasing services autonomously. Opens new business models: autonomous service marketplaces, agent-to-agent SaaS, AI supply chains.',
      bmnrImplication: 'ERC-8004 positions Ethereum as THE settlement layer for AI agent economy. AI agents become economic actors on Ethereum — identity, reputation, payments all on-chain. Massive new use case for Ethereum beyond human transactions. x402 payment integration = more ETH transaction volume. Multi-chain deployment validates Ethereum L2 ecosystem as AI infrastructure.',
      impact: 'Bullish',
      source: 'ERC-8004.org / Ethereum Foundation'
    },
    {
      date: '2026-01-29',
      category: 'Enterprise',
      company: 'Chronicle',
      title: 'Chronicle Proof of Asset Powers MoonPay Enterprise Stablecoin Issuance on M0 Platform',
      summary: 'Chronicle, a leading provider of oracle infrastructure and verifiable onchain finance, announces its role in MoonPay\'s enterprise stablecoin services built on the M0 platform. Chronicle\'s oracle technology ensures secure and accurate minting and redemption of MoonPay-issued stablecoins, providing continuous verification of underlying assets backing. As MoonPay scales stablecoin issuance to enterprises across United States, Asia, and Latin America, Chronicle\'s verification layer delivers transparency and security required for institutional adoption. Chronicle provides: continuous underlying asset verification (1:1 parity), secure minting authorization (preventing over-issuance), redemption accuracy validation, and multi-chain support. Nik Kunkel, Chronicle Founder: "Stablecoins require precise, independently verifiable issuance and redemption mechanisms. Our role in the M0 ecosystem ensures that every MoonPay stablecoin minted or redeemed is backed by verifiable underlying assets in real-time." Ivan Soto-Wright, MoonPay CEO: "Together, we enable transparent, secure, and compliant stablecoin operations for enterprise partners." Chronicle was built by the team at MakerDAO that invented the first Oracle on Ethereum in 2017.',
      significance: 'Chronicle (original Ethereum oracle inventors from MakerDAO) powering enterprise stablecoin infrastructure. M0 platform + MoonPay (30M+ customers, 180 countries) creates full-stack stablecoin issuance infrastructure. Real-time proof of reserves addresses institutional transparency requirements.',
      bmnrImplication: 'Enterprise stablecoin infrastructure on Ethereum validates network for institutional payment rails. Chronicle\'s oracle technology (from MakerDAO origins) provides battle-tested verification layer. More enterprise stablecoin adoption = more Ethereum ecosystem utility.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2026-01-28',
      category: 'Enterprise',
      company: 'Fidelity',
      title: 'Fidelity to Launch Dollar-Backed Stablecoin FIDD on Ethereum',
      summary: 'Fidelity Investments announces its first stablecoin, the Fidelity Digital Dollar (FIDD), will launch on Ethereum in coming weeks. FIDD will be issued by Fidelity Digital Assets\' national trust bank and will be redeemable 1:1 for U.S. dollars through Fidelity platforms. Fidelity Management & Research Company LLC will handle reserve assets. Available to both retail and institutional customers through Fidelity Digital Assets, Fidelity Crypto, and Fidelity Crypto for Wealth Managers. FIDD will be transferable to any Ethereum mainnet address and available on major crypto exchanges. Mike O\'Reilly, President of Fidelity Digital Assets: "At Fidelity, we have a long-standing belief in the transformative power of the digital assets ecosystem and have spent years researching and advocating for the benefits of stablecoins. The recent passage of the GENIUS Act was a significant milestone for the industry in providing clear regulatory guardrails for payment stablecoins." Fidelity began building digital asset infrastructure in 2014, formally launched Fidelity Digital Assets in 2019, and first disclosed stablecoin testing in early 2025. Stablecoin market has grown to ~$300B in total supply.',
      significance: 'Major asset manager ($5.8T AUM) entering stablecoin market with institutional-grade offering on Ethereum. First TradFi giant to launch own-branded stablecoin. GENIUS Act compliance positions FIDD for regulated payment use cases. Follows years of Fidelity digital asset infrastructure development since 2014.',
      bmnrImplication: 'Fidelity launching FIDD on Ethereum validates network as primary settlement layer for institutional stablecoins. Major TradFi firm choosing Ethereum over alternatives reinforces network effect. More institutional stablecoins on Ethereum = more on-chain settlement = ETH ecosystem value growth.',
      impact: 'Bullish',
      source: 'The Block'
    },
    {
      date: '2026-01-15',
      category: 'Enterprise',
      company: 'State Street',
      title: 'State Street Launches Digital Asset Platform for Tokenized Finance',
      summary: 'State Street Corporation (NYSE: STT), with $51.7 trillion in assets under custody/administration and $5.4 trillion in AUM, launches its Digital Asset Platform — secure, scalable infrastructure for tokenized assets positioning State Street as the bridge between traditional and digital finance. Platform enables development of tokenized Money Market Funds (MMFs), ETFs, tokenized assets, and cash products including tokenized deposits and stablecoins. Includes wallet management, custodial, and cash capabilities supporting both private and public permissioned blockchain networks. Joerg Ambrosius, President of Investment Services: "We are moving beyond experimentation and into practical, scalable solutions that meet the highest standards of security and compliance. By pairing blockchain connectivity with robust controls and global servicing expertise, we\'re enabling institutions to confidently embrace tokenization as part of their core strategy." Donna Milrod, Chief Product Officer: "This platform delivers that foundation in a way that is secure, interoperable and integrated so institutions can scale with confidence."',
      significance: 'World\'s second-largest custodian bank ($51.7T AUM/AUC) launching production tokenization infrastructure. State Street joins BlackRock, BNY Mellon in building institutional tokenized finance stack. Platform supports public permissioned blockchains, likely including Ethereum ecosystem. Move from "experimentation" to "practical, scalable solutions" signals institutional tokenization inflection point.',
      bmnrImplication: 'State Street building tokenization infrastructure validates institutional demand for blockchain-based asset management. Major custodian supporting public blockchain networks reinforces Ethereum ecosystem positioning. More institutional infrastructure = more tokenized assets = Ethereum network effect strengthening.',
      impact: 'Bullish',
      source: 'State Street Press Release'
    },
    {
      date: '2026-01-13',
      category: 'Regulatory',
      company: 'US Senate Banking Committee',
      title: 'Digital Asset Market CLARITY Act — US Market Structure Bill Defines SEC/CFTC Jurisdiction for Crypto',
      summary: 'Senate Banking Committee advances the Digital Asset Market CLARITY Act, establishing a comprehensive US regulatory framework for digital assets. Key provisions: (1) INVESTOR PROTECTION — strengthens disclosure requirements, preserves anti-fraud authorities, limits insider abuse, promotes coordinated oversight and financial literacy. (2) REGULATORY CLARITY — draws bright line between SEC and CFTC jurisdiction, replaces SEC regulation-by-enforcement with workable statutory framework, creates tailored disclosure regime for digital asset projects to raise capital. (3) DeFi INNOVATION — protects software developers and peer-to-peer activity, ensures centralized intermediaries interacting with DeFi are subject to tailored risk-management, cybersecurity, and compliance standards, focuses regulatory efforts on control rather than code. (4) ILLICIT FINANCE — ensures centralized intermediaries subject to appropriate sanctions framework, gives law enforcement new targeted tools to combat money laundering, terrorist financing, and sanctions evasion, closes national security gaps while keeping legitimate crypto activity onshore. Committee chairman: Tim Scott (R-SC). Described as establishing US as "crypto capital of the world."',
      significance: 'LANDMARK US LEGISLATION: First comprehensive market structure bill for digital assets advancing through Senate Banking Committee. Replaces SEC\'s regulation-by-enforcement model with clear statutory framework. Bright-line SEC/CFTC jurisdiction eliminates years of regulatory ambiguity. DeFi developer protections (regulate control, not code) preserve open-source innovation. Combined with GENIUS Act (stablecoins), creates complete US regulatory framework for crypto.',
      bmnrImplication: 'CLARITY Act is the most significant US crypto regulatory development for BMNR. Clear SEC/CFTC jurisdiction removes legal uncertainty that has suppressed institutional adoption. ETH classification clarity (commodity vs security) directly impacts BMNR\'s treasury strategy. DeFi protections preserve Ethereum\'s open-source ecosystem. Combined with GENIUS Act, creates regulatory environment where institutional capital can flow into ETH with confidence.',
      impact: 'Bullish',
      source: 'US Senate Banking Committee'
    },
    {
      date: '2026-01-13',
      category: 'Institutional',
      company: 'Franklin Templeton',
      title: 'Franklin Templeton Prepares Institutional Money Market Funds for Tokenized Finance',
      summary: 'Franklin Templeton announces two institutional money market funds managed by Western Asset Management are now eligible for tokenized finance: one supporting stablecoin reserves under the GENIUS Act, and another for blockchain-enabled distribution. Western Asset Institutional Treasury Obligations Fund ($LUIXX) updated to align with GENIUS Act reserve requirements, investing exclusively in U.S. Treasuries with maturities of 93 days or less. Western Asset Institutional Treasury Reserves Fund introduced new Digital Institutional Share Class ($DIGXX) for distribution through blockchain-enabled intermediary platforms. Roger Bayston, Head of Digital Assets: "Traditional funds are already beginning to move on-chain, so rather than question their ability, our focus is to make them more accessible and useful by many. By prioritizing interoperability and flexibility, we\'re opening more ways for clients to access and deploy regulated funds across the platforms they rely on." Matt Jones, Head of Institutional Liquidity: "Being early only matters if you do it responsibly, and these updates prove how we can help institutions adopt tokenized infrastructure with products they already know." Stablecoin market surpassed $310B in total supply, projecting ~$2T by 2030.',
      significance: 'Major global asset manager ($1.67T AUM) retrofitting traditional Rule 2a-7 government money market funds for GENIUS Act compliance and blockchain distribution. First mover positioning institutional funds for regulated stablecoin reserve management and tokenized distribution infrastructure.',
      bmnrImplication: 'Franklin Templeton (already operates BENJI tokenized fund on Ethereum) now preparing institutional money market funds for tokenized finance ecosystem. GENIUS Act-compliant reserves + blockchain distribution validates Ethereum infrastructure for institutional treasury products. Growing tokenized fund market supports BMNR\'s Ethereum ecosystem thesis.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2026-01-09',
      category: 'Institutional',
      company: 'BitGo',
      title: 'BitGo Provides Custody and Trading for iPower Digital Asset Treasury',
      summary: 'BitGo Holdings Inc., the digital asset infrastructure company, announces support for iPower Inc. (Nasdaq: IPW) in execution and custody of its digital asset treasury transactions. iPower completed purchases of Bitcoin (BTC) and Ethereum (ETH) through BitGo Bank & Trust, National Association. Transactions executed using BitGo Prime\'s over-the-counter (OTC) trading services for institutional liquidity and discreet execution, with BitGo\'s custody platform for long-term storage. Mike Belshe, BitGo CEO: "Corporate treasury participation in digital assets requires strong security, governance, and operational rigor. BitGo provides infrastructure that supports these requirements across custody and transaction execution." Lawrence Tan, iPower CEO: "As we evaluated our approach to digital asset treasury activity, we focused on governance, security and operational discipline. We believe BitGo\'s infrastructure provides a framework aligned with our internal controls." BitGo platform supports institutional digital asset activity with multi-signature security, policy controls, and operational workflows.',
      significance: 'Nasdaq-listed company (IPW) establishing digital asset treasury with both BTC and ETH through regulated infrastructure. BitGo Bank & Trust provides institutional-grade custody with bank charter. Demonstrates growing corporate treasury adoption of ETH alongside BTC.',
      bmnrImplication: 'Public company adding ETH to corporate treasury validates BMNR\'s thesis. BitGo institutional infrastructure supports corporate treasury adoption. More corporate ETH treasuries = broader institutional recognition of ETH as treasury asset.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2026-01-07',
      category: 'Enterprise',
      company: 'World Liberty Financial',
      title: 'World Liberty Financial Files for National Trust Bank Charter to Issue USD1 Stablecoins',
      summary: 'World Liberty Financial announces WLTC Holdings LLC filed de novo application to the Office of the Comptroller of the Currency (OCC) to establish World Liberty Trust Company, National Association (WLTC), a proposed national trust bank purpose-built for stablecoin operations. Charter will position WLTC to issue USD1, the dollar-backed stablecoin that has reached over $3.3 billion in circulation in its first year — fastest-growing stablecoin in history. Trust company plans to serve institutional customers including cryptocurrency exchanges, market makers, and investment firms. Will offer digital asset custody and stablecoin conversion services. Zach Witkoff, proposed President and Chairman: "USD1 grew faster in its first year than any other stablecoin in history. Institutions are already using USD1 for cross-border payments, settlement, and treasury operations. A national trust charter will allow us to bring issuance, custody, and conversion together as a full-stack offering under one highly regulated entity." WLTC plans three core services: stablecoin issuance/redemption, on-ramp/off-ramp services, custody and conversion. USD1 operates across ten blockchain networks including Ethereum, Solana, BNB Smart Chain, TRON, Aptos, and AB Core. BitGo serves as key strategic partner.',
      significance: 'Fastest-growing stablecoin in history ($3.3B in first year) seeking national trust bank charter from OCC. Full-stack regulated stablecoin infrastructure: issuance, custody, conversion under federal supervision. GENIUS Act compliance structure. Multi-chain support including Ethereum.',
      bmnrImplication: 'USD1 operating on Ethereum (among 10 chains) brings fast-growing stablecoin to Ethereum ecosystem. National trust charter provides regulatory clarity for institutional stablecoin adoption. More regulated stablecoins on Ethereum = more institutional confidence in Ethereum settlement layer.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2026-01-07',
      category: 'Enterprise',
      company: 'CoinFlip',
      title: 'CoinFlip Launches Gradual - Payroll Crypto Conversion Including Ethereum',
      summary: 'CoinFlip, a leading U.S.-based global digital currency platform company, announces launch of CoinFlip Gradual, a workplace perk enabling employees to invest in cryptocurrency directly through payroll purchases on recurring, automated basis. Program allows employees to convert portion of paycheck into digital assets including Bitcoin, Ethereum, SOL, USDC, and USDT. Investments made automatically and consistently, with assets delivered to personal digital wallet for full ownership and control. Ben Weiss, CoinFlip CEO: "By giving employees easy, secure access to cryptocurrency through their paycheck, we\'re helping more people take their first step into the digital economy—on their terms. We are excited to offer a practical way for companies to invest in their team\'s financial well-being and demonstrate a commitment to innovation, inclusion and increased economic opportunity." Paycheck allocations start from $25, with flexibility to set up recurring purchases across multiple assets simultaneously. CoinFlip operates world\'s largest network of cryptocurrency kiosks by transaction volume with 5,500+ kiosks across 49 U.S. states and 11 countries.',
      significance: 'Major crypto platform (5,500+ kiosks, largest by volume) launching payroll conversion product. ETH included alongside BTC in employee benefit programs. Mainstream adoption pathway: payroll → crypto wallet → DeFi potential. Recurring purchases create consistent demand.',
      bmnrImplication: 'Payroll ETH conversion expands retail investor base through passive accumulation. Employee benefit programs normalize ETH as mainstream asset. Recurring payroll purchases create steady ETH demand. More accessible ETH = broader adoption = ecosystem growth.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    // === DECEMBER 2025 ===
    {
      date: '2025-12-26',
      category: 'Enterprise',
      company: 'Telcoin',
      title: 'Telcoin Digital Asset Bank Launches eUSD - First Regulated Bank-Issued Stablecoin on Ethereum',
      summary: 'Following final charter approval of Telcoin Digital Asset Bank by the Nebraska Department of Banking and Finance, Telcoin begins initial blockchain banking operations with launch of eUSD stablecoin on Ethereum and Polygon blockchains. Initial minting of $10 million eUSD marks first phase of banking operations. Paul Neuner, Telcoin CEO: "This is the crucial first step toward offering blockchain-native bank accounts through our Nebraska charter." Company expects to start onboarding customers in early 2026 through personal and business account offerings via Telcoin Wallet V5. Patrick Gerhart, President of Banking Operations: "Today eUSD transitions from development to live issuance as a foundational step. As we continue our rollout into the new year, our focus is on preparing to responsibly bring Digital Cash to customers through our regulated blockchain banking infrastructure." As the first Digital Asset Depository Institution in the United States under the Nebraska Financial Innovation Act and in line with federal GENIUS Act guidelines, Telcoin is uniquely positioned to issue stablecoins, accept customer deposits, and process eUSD payments, all under the same charter.',
      significance: 'FIRST regulated bank-issued U.S. dollar stablecoin launching on Ethereum. Telcoin operates as first Digital Asset Depository Institution under Nebraska charter. GENIUS Act-compliant stablecoin infrastructure. Full banking services (deposits, payments, stablecoin issuance) under single charter.',
      bmnrImplication: 'Bank-issued stablecoin on Ethereum validates network for regulated banking infrastructure. First DADI charter creates regulatory template for bank-blockchain integration. More regulated bank stablecoins = more institutional confidence in Ethereum settlement layer.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2025-12-24',
      category: 'Enterprise',
      company: 'ADI Foundation',
      title: 'ADI Foundation Partners with M-Pesa to Bring 60M+ Users Onchain',
      summary: 'ADI Foundation signs MoU with M-Pesa, Africa\'s largest mobile money platform with 60+ million monthly users across 8 countries (Kenya, DR Congo, Egypt, Ethiopia, Ghana, Lesotho, Mozambique, Tanzania). Partnership aims to extend blockchain infrastructure to millions of Africans through M-Pesa\'s existing mobile money rails. Huy Nguyen Trieu, ADI Foundation council member: "M-Pesa has been amazing in terms of financial inclusion. Our view is that we can push it further again by providing the right digital infrastructure." M-Pesa CEO Sitoyo Lopokoiyit: "We are excited to partner with ADI Foundation to tap into their expertise around new technologies and how these can transform financial services." Stablecoin expected to launch January 2026. Part of ADI\'s goal to bring 1 billion people onchain by 2030.',
      significance: 'Potentially largest single onboarding of emerging market users to Ethereum L2 ecosystem. M-Pesa\'s 60M+ users across 8 African countries represents massive financial inclusion opportunity. 42% of sub-Saharan Africans remain unbanked. Nigeria alone did $50B in crypto transactions in 12 months to June 2024.',
      bmnrImplication: 'ADI Chain (Ethereum L2) partnership with M-Pesa could bring tens of millions of African users to Ethereum ecosystem. Massive expansion of network\'s user base in emerging markets. Financial inclusion via blockchain = real-world utility that drives ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Semafor Africa'
    },
    {
      date: '2025-12-24',
      category: 'Enterprise',
      company: 'Fasset',
      title: 'Fasset Partners with ADI Foundation for Regulated Digital Asset Infrastructure',
      summary: 'Fasset, a global banking and investment platform with regulatory approvals in UAE, Indonesia, Malaysia, EU, Turkey, Pakistan and others, announces strategic partnership with ADI Foundation. Fasset will provide regulated onboarding, KYC, and on/off-ramp infrastructure for ADI Chain. Users can purchase $ADI token directly in UAE Dirhams (AED) on Fasset platform. Daniel Ahmed, COO of Fasset: "This partnership reflects the shift from testing to real-world deployment of digital asset infrastructure." Fasset has raised $26.7M and also operates its own Ethereum L2 called "Own" for DeFi access.',
      significance: 'Regulated fiat on/off-ramp infrastructure enables compliant access to ADI Chain. Fasset\'s multi-country regulatory approvals (UAE, Indonesia, Malaysia, EU, Turkey, Pakistan) expand geographic reach for institutional Ethereum L2 adoption.',
      bmnrImplication: 'Regulated fiat gateways for ADI Chain (Ethereum L2) enable real-world adoption. More accessible infrastructure = more users = more Ethereum ecosystem value.',
      impact: 'Bullish',
      source: 'Fasset / ADI Foundation Press Release'
    },
    {
      date: '2025-12-23',
      category: 'Institutional',
      company: 'iPower',
      title: 'iPower Launches $30M Digital Asset Treasury Strategy with Bitcoin and Ethereum',
      summary: 'iPower Inc. (Nasdaq: IPW) announces $30 million convertible note financing facility to launch its Digital Asset Treasury ("DAT") strategy. Of initial $9 million committed funding, approximately $4.4 million will establish Digital Asset Treasury holding combination of Bitcoin and Ethereum. For subsequent tranches, approximately 80% of proceeds intended for digital asset acquisition. Transaction represents iPower\'s first concrete step executing broader crypto strategy, building on foundation as established operating business with $59 million in trailing 12-month revenue. Lawrence Tan, iPower CEO: "Our Digital Asset Treasury is designed to be a strategic bridge between e-commerce and digital assets. By combining our platform capabilities, operating experience, and ecosystem relationships, we are focused on integrating digital assets into everyday commerce in a way that supports real economic activity and long-term value creation, rather than short-term speculation." Company also evaluating: strategic acquisitions using enhanced balance sheet, working with regulated providers to develop consumer-facing digital asset products leveraging existing digital platforms.',
      significance: 'Nasdaq-listed company ($59M revenue) establishing multi-asset digital treasury including ETH. Convertible note structure enables ongoing digital asset accumulation. Company positioning at intersection of e-commerce and digital assets. Corporate treasury diversification beyond BTC-only strategies.',
      bmnrImplication: 'Public company adding ETH to corporate treasury alongside BTC validates BMNR thesis. DAT strategy with ETH exposure demonstrates growing corporate interest in Ethereum as treasury asset. More corporate ETH adoption = broader institutional recognition.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2025-12-16',
      category: 'Enterprise',
      company: 'Mastercard',
      title: 'Mastercard Advances Blockchain Innovation Through Strategic Alliance with ADI Foundation',
      summary: 'Mastercard announces strategic alliance with ADI Foundation to advance blockchain-based asset tokenization and stablecoin-enabled payment innovation in the Middle East. Collaboration areas include: stablecoin-based settlement for domestic and cross-border transactions, stablecoin-linked payment cards, tokenized real-world assets use cases, and remittance/B2B trade flows using digital assets. NEO PAY (UAE) and INFINIOS (Bahrain) adopted stablecoin settlement capabilities. Follows Mastercard\'s expanded partnership with Circle for USDC/EURC settlement across EEMEA region. Prakriti Singh, EVP Mastercard: "By advancing asset tokenization and stablecoin-linked applications, Mastercard is enabling faster, seamless, and more secure transactions."',
      significance: 'Major payment network ($400B+ market cap) partnering with ADI Foundation (Ethereum L2) for stablecoin and tokenization infrastructure in Middle East. Builds on Mastercard\'s existing USDC/EURC settlement capabilities.',
      bmnrImplication: 'Mastercard partnership with ADI Chain ecosystem validates Ethereum L2 for payment network infrastructure. More institutional payment infrastructure on Ethereum = more network utility = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Mastercard Press Release'
    },
    {
      date: '2025-12-12',
      category: 'Institutional',
      company: 'BlackRock',
      title: 'BlackRock Signs MoU with IHC, Finstreet, and ADI Foundation for Tokenized Markets',
      summary: 'BlackRock signs MoU during Abu Dhabi Finance Week with IHC Group entities Finstreet Limited and ADI Foundation to explore tokenized markets and next-generation financial architecture. Kashif Riaz, Managing Director at BlackRock: "We are excited to pursue opportunities with Finstreet and ADI to help advance digital assets and tokenized markets initiatives." Sunidhi Pasan, Finstreet CEO: "Tokenization is becoming the operating system of global markets. Abu Dhabi is emerging as the centre of this new system." Partnership is advisory-based to support Abu Dhabi\'s digital transformation ambitions.',
      significance: 'World\'s largest asset manager ($10T+ AUM) partnering with UAE\'s ADI Chain ecosystem for tokenized markets development. Major validation for ADGM as institutional digital asset hub.',
      bmnrImplication: 'BlackRock advising on ADI Chain/Finstreet infrastructure validates Ethereum L2 ecosystem for institutional tokenization. BlackRock already has BUIDL on Ethereum mainnet — now expanding to L2/MENA infrastructure.',
      impact: 'Bullish',
      source: 'Abu Dhabi Finance Week / Gulf Today'
    },
    {
      date: '2025-12-09',
      category: 'L2',
      company: 'ADI Foundation',
      title: 'ADI Chain Mainnet Launches - MENA\'s First Institutional L2 for Stablecoins and RWA',
      summary: 'ADI Foundation announces mainnet launch of ADI Chain, the first institutional L2 blockchain for stablecoins and real-world assets in the MENA region. $ADI token launches simultaneously on Kraken, Crypto.com, KuCoin (eToro coming soon), also available via Telegram Wallet and Fasset. 50+ projects in deployment pipeline. Infrastructure ready to host UAE Dirham-backed stablecoin issued by First Abu Dhabi Bank and IHC, regulated by UAE Central Bank. Built on ZKsync\'s Airbender stack. Governments can build compliant L3 chains. Upcoming milestones: WEF Davos (January), ETHDenver (February), 10,000+ Web3 specialists training program with ADGM.',
      significance: 'Major institutional Ethereum L2 mainnet launch for emerging markets. Compliance-first blockchain architecture for governments and institutions. 500M+ people in ecosystem reach, targeting 1 billion onchain by 2030.',
      bmnrImplication: 'ADI Chain mainnet validates Ethereum ecosystem for sovereign/institutional infrastructure. UAE\'s largest conglomerate (IHC) backing Ethereum L2. Potential gateway for billions of users in emerging markets across Middle East, Asia, and Africa.',
      impact: 'Bullish',
      source: 'ADI Foundation Press Release'
    },
    {
      date: '2025-12-09',
      category: 'Institutional',
      company: 'Franklin Templeton',
      title: 'Franklin Templeton Signs MOUs with Finstreet and ADI Foundation in ADGM',
      summary: 'Franklin Templeton ($1.67T AUM) signs parallel MOUs with Finstreet Limited and ADI DLT Foundation to explore digital asset solutions under ADGM\'s regulatory framework. Collaboration includes joint exploration of tokenized assets, stablecoins, digital distribution, and market access models. Jenny Johnson, CEO: "This collaboration with Finstreet Limited and ADI DLT Foundation in ADGM are strategic steps to explore how tokenized assets and digital distribution can unlock new efficiencies and opportunities." Finstreet subsidiaries include: Multilateral Trading Facility, Custody/Depository services, and Fund Management.',
      significance: 'Major global asset manager ($1.67T AUM) partnering with UAE blockchain infrastructure (ADI Chain) and regulated trading venues. Expands institutional tokenization ecosystem in ADGM.',
      bmnrImplication: 'Franklin Templeton (already has BENJI tokenized fund on Ethereum) deepening involvement with ADI Chain/Ethereum L2 ecosystem. More major asset managers in ADGM tokenization ecosystem = more Ethereum ecosystem validation.',
      impact: 'Bullish',
      source: 'Franklin Templeton / Finstreet / ADI Foundation Press Release'
    },
    {
      date: '2025-12-08',
      category: 'Institutional',
      company: 'BlackRock',
      title: 'BlackRock Files for Staked Ethereum ETF (ETHB)',
      summary: 'BlackRock files S-1 registration statement with SEC for iShares Ethereum Staking Trust (ETHB), a staked Ethereum ETF. The proposed fund would give investors exposure to ETH staking yield without staking assets themselves. Separate from existing iShares Ethereum Trust (ETHA) which holds ~$11B in ETH. Under new SEC Chair Paul Atkins, regulatory stance on staking appears to be softening — previous Chair Gensler had instructed firms to strip staking from ETF filings. VanEck and others also resubmitting/amending filings to include staking. 19b-4 form still needed from listing exchange to trigger formal SEC deadline.',
      significance: 'World\'s largest asset manager ($10T+ AUM) filing for staked ETH ETF represents major milestone for institutional staking access in US. Signals regulatory thaw under new SEC leadership.',
      bmnrImplication: 'BlackRock staked ETH ETF validates productive ETH thesis that underpins BMNR strategy. Competition but also validation — more institutional staking products = more validation of yield-bearing ETH as asset class.',
      impact: 'Bullish',
      source: 'CoinDesk'
    },
    {
      date: '2025-12-06',
      category: 'Enterprise',
      company: 'ADI Foundation',
      title: 'ADI Foundation Announces 50+ Institutional Partnerships Across 20 Countries',
      summary: 'ADI Foundation reveals partnership network spanning 50+ institutions across 20+ countries ahead of mainnet launch. Key partnerships include: Near Protocol (TravAI travel AI settled on ADI Chain), Abu Dhabi Real Estate Centre (tokenized ownership, digital registries), Esyasoft Holding (energy transition infrastructure), Emirates Driving Company (driver education blockchain). Technology partners: ZKsync, Alchemy, WalletConnect, Covalent, OpenZeppelin. Foundation also in discussions with African mobile payment providers with millions of users and billions in transaction volume.',
      significance: 'Comprehensive institutional L2 ecosystem for emerging markets with real-world use cases across real estate, energy, payments, and identity. Major MENA infrastructure backed by UAE\'s largest conglomerate.',
      bmnrImplication: 'ADI Chain expanding partnerships validates Ethereum L2 infrastructure for emerging market adoption. Real-world government and enterprise use cases demonstrate practical utility beyond speculation.',
      impact: 'Bullish',
      source: 'ADI Foundation / CoinDesk'
    },
    {
      date: '2025-12-04',
      category: 'Institutional',
      company: 'WisdomTree',
      title: 'WisdomTree Launches World\'s First Physical Lido Staked Ether ETP',
      summary: 'WisdomTree launches WisdomTree Physical Lido Staked Ether ETP (LIST/LSTE), the world\'s first physically-backed ETP providing exposure to Lido Staked Ether (stETH) and staking rewards. Listed on Deutsche Börse Xetra, SIX Swiss Exchange, and Euronext exchanges in Paris and Amsterdam. MER: 0.50%. Lido has ~25% of all ETH staked through its protocol. Kean Gilbert, Lido Ecosystem Foundation: "stETH is already the most widely used path for institutions to access Ethereum\'s staking economy. Bringing it into a fully backed ETP is a natural next step." Available in 15 European countries.',
      significance: 'First physically-backed stETH ETP gives European investors regulated exposure to ETH staking rewards via liquid staking. Major milestone for institutional staking access.',
      bmnrImplication: 'Regulated stETH ETP validates institutional demand for ETH staking exposure. WisdomTree ($2.1B+ crypto ETP AUM) product validates productive ETH thesis similar to BMNR\'s staking strategy.',
      impact: 'Bullish',
      source: 'WisdomTree Press Release'
    },
    {
      date: '2025-12-04',
      category: 'L2',
      company: 'Base',
      title: 'Base-Solana Bridge Launches - Secured by Chainlink CCIP and Coinbase',
      summary: 'Base launches mainnet bridge to Solana, enabling cross-chain asset movement between Ethereum L2 and Solana ecosystems. Bridge secured by Chainlink\'s Cross-Chain Interoperability Protocol (CCIP) alongside Coinbase verification. Coinbase and Chainlink node operators independently verify all messages. Rolling out in apps including Zora, Aerodrome, Virtuals, Flaunch, and Relay. Users can trade SOL, CHILLHOUSE, TRENCHER, and other Solana assets on Base. Bridge enables: depositing SOL in Base apps, importing Solana assets into Base, exporting Base assets to Solana. Open-source on GitHub for developer integration.',
      significance: 'Major Ethereum L2 bridging to Solana expands cross-chain liquidity and interoperability. Chainlink CCIP + Coinbase dual verification provides institutional-grade security. "Bridge, not an island" philosophy enables users to access value across chains.',
      bmnrImplication: 'Base-Solana bridge expands Ethereum L2 ecosystem reach to Solana users and assets. Cross-chain interoperability increases overall crypto network effects. More users/assets flowing through Ethereum L2 = more ecosystem value.',
      impact: 'Bullish',
      source: 'Base Blog'
    },
    {
      date: '2025-12-01',
      category: 'Enterprise',
      company: 'Sony Bank',
      title: 'Sony Bank Plans USD-Pegged Stablecoin for Gaming and Entertainment Ecosystem',
      summary: 'Sony Bank announces plans to launch USD-pegged stablecoin in early 2026 for payments across Sony\'s gaming, streaming, and anime platforms. Stablecoin would enable subscriptions, in-game purchases, and digital content payments without credit cards, streamlining cross-border purchases and reducing transaction fees. Sony Bank has applied for US banking license and partnered with Bastion (stablecoin infrastructure provider). 30%+ of Sony\'s global revenue comes from US market. Sony Financial Group (separately listed) supporting the project. Potential integration with Soneium L2 unclear.',
      significance: 'Major entertainment conglomerate building stablecoin for PlayStation/gaming/streaming ecosystem. Could unify digital payments across PlayStation Network (100M+ users), Sony Music, and streaming services.',
      bmnrImplication: 'Sony stablecoin potentially on Soneium (Ethereum L2) expands network utility for gaming/entertainment. PlayStation\'s massive user base could drive significant adoption of Ethereum ecosystem infrastructure.',
      impact: 'Bullish',
      source: 'Nikkei / Coinspeaker'
    },
    {
      date: '2025-12-26',
      category: 'Enterprise',
      company: 'Telcoin',
      title: 'Telcoin Launches eUSD - First US Bank-Issued Stablecoin Under GENIUS Act', 
      summary: 'Telcoin Digital Asset Bank, the first Digital Asset Depository Institution in the United States, begins blockchain banking operations with launch of eUSD stablecoin on Ethereum and Polygon blockchains. Initial mint: $10M eUSD. Operating under Nebraska charter (Financial Innovation Act) aligned with federal GENIUS Act guidelines, Telcoin is uniquely positioned to issue stablecoins, accept customer deposits, and process payments under the same charter. CEO Paul Neuner: "This is the crucial first step toward offering blockchain-native bank accounts through our Nebraska charter." Customer onboarding expected early 2026 through Telcoin Wallet V5.',
      significance: 'FIRST regulated US bank-issued stablecoin under new GENIUS Act framework. Establishes precedent for compliant bank stablecoin issuance. Nebraska charter creates template other states may follow. Proves blockchain banking infrastructure is production-ready.',
      bmnrImplication: 'Bank-issued stablecoins on Ethereum + Polygon expand network utility beyond crypto-native issuers (Circle, Tether). More stablecoin activity = more network fees = ETH value accrual. GENIUS Act compliance validates regulatory path for institutional blockchain adoption.',
      impact: 'Bullish', 
      source: 'Telcoin Press Release' 
    },
    { 
      date: '2025-12-10', 
      category: 'Enterprise', 
      company: 'HSBC',
      title: 'HSBC, Ant International & Swift Complete Cross-Border Tokenized Deposits POC', 
      summary: 'Ant International, HSBC ($3.2T assets), and Swift (11,500+ organizations, 200+ countries) complete successful Proof of Concept for cross-border transfer of tokenized deposits using ISO 20022 standards. Initiative leverages Swift\'s global messaging network, HSBC\'s Tokenised Deposit Service, and Ant International\'s blockchain technology. Enables real-time treasury management across borders via HSBC Singapore and Hong Kong. Common protocol removes need for bilateral arrangements between bank partners. Extends HSBC\'s existing AML systems and anti-fraud capabilities to tokenized deposits. Lewis Sun (Global Head Domestic Payments, HSBC): "By enabling tokenised deposits to move securely and efficiently across borders, we are giving our corporate clients more choice in how they manage liquidity globally." Swift\'s Shirish Wadivkar: "ISO 20022 data formats, when combined with new technologies like blockchain, bring significant value to the entire community." HSBC confirmed private chain is EVM-compatible and ERC-20 standard, doesn\'t rule out public chain route.',
      significance: 'Swift (global payments backbone) + HSBC (Tier 1 bank) + Ant International (fintech giant) collaboration on tokenized deposit interoperability. ISO 20022 standardization enables seamless integration with existing banking infrastructure. Cross-border real-time settlement via tokenization demonstrates production readiness.',
      bmnrImplication: 'Swift integrating blockchain tokenization into global payments infrastructure validates network for institutional money movement. HSBC\'s EVM/ERC-20 compatible private chain enables future public Ethereum interoperability. More tokenized deposit activity = more blockchain settlement = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'HSBC / Ant International / Swift Press Release' 
    },
    {
      date: '2025-12-22',
      category: 'Enterprise',
      company: 'Shift4',
      title: 'Shift4 Launches Global Stablecoin Settlement Platform', 
      summary: 'Shift4 (NYSE: FOUR), global leader in integrated payments processing billions of transactions annually, launches stablecoin settlement platform for hundreds of thousands of merchants globally. Merchants can now receive settlement in USDC, USDT, EURC, or DAI on networks including Ethereum, Solana, Polygon, Base, Stellar, TON, and Plasma. Platform enables 24/7 money movement without banking hour constraints. Director of Crypto Pietro Moran: "As Shift4 becomes an increasingly global company, this offering will support businesses around the world as stablecoins continue to play a growing role in the modern payments ecosystem."',
      significance: 'Major payment processor (NYSE-listed) offering stablecoin settlement to mainstream merchants. Extends crypto payment rails beyond crypto-native businesses. Multi-chain support including Ethereum and L2s (Base, Polygon) demonstrates enterprise demand for blockchain settlement.',
      bmnrImplication: 'Merchant stablecoin settlement on Ethereum infrastructure expands real-world utility. More commercial transaction volume on-chain = more network activity = ETH ecosystem value accrual. Shift4\'s mainstream merchant base could significantly expand blockchain payment adoption.',
      impact: 'Bullish', 
      source: 'Shift4 Press Release' 
    },
    { 
      date: '2025-12-18', 
      category: 'Enterprise', 
      company: 'BlackRock',
      title: 'BlackRock Expands BUIDL to $600M AUM', 
      summary: 'BlackRock\'s BUIDL (BlackRock USD Institutional Digital Liquidity Fund) reaches $600M in assets under management, up from $500M in October 2025. The fund, launched in March 2024, represents tokenized shares of a money market fund holding U.S. Treasury bills, repurchase agreements, and cash. BUIDL operates on Ethereum mainnet using Securitize as the tokenization platform and settles in USDC. The fund offers daily yield accrual, 24/7 transferability between whitelisted addresses, and potential DeFi composability. Minimum investment is $5M for qualified purchasers.',
      significance: 'World\'s largest asset manager ($10T+ AUM) scaling its Ethereum presence validates the network as institutional-grade infrastructure. BUIDL\'s growth demonstrates sustained institutional demand for tokenized treasuries, not just initial hype.',
      bmnrImplication: 'Institutional capital flowing into Ethereum ecosystem increases network legitimacy and long-term ETH demand. BlackRock\'s continued commitment reduces regulatory uncertainty risk for all ETH holders including BMNR.',
      impact: 'Bullish', 
      source: 'Bloomberg' 
    },
    { 
      date: '2025-12-15', 
      category: 'Enterprise', 
      company: 'JPMorgan',
      title: 'JPMorgan Launches MONY - First G-SIB Tokenized Fund on Public Ethereum', 
      summary: 'JPMorgan Asset Management launches My OnChain Net Yield Fund (MONY), making JPMorgan the largest Global Systemically Important Bank (G-SIB) to deploy a tokenized money market fund on public Ethereum blockchain. Initial capital: $100M from JPMorgan Asset Management. The fund invests in U.S. Treasury securities and fully collateralized repos, offering daily dividend reinvestment. Qualified investors ($1M minimum) can subscribe/redeem using cash or USDC stablecoins through Morgan Money platform. MONY tokens are ERC-20 compatible, enabling peer-to-peer transfers and potential collateral usage within the blockchain ecosystem. Powered by Kinexys Digital Assets (evolved from JPMorgan\'s Onyx/Quorum blockchain initiatives since 2017).',
      significance: 'Watershed moment for institutional blockchain adoption. JPMorgan ($4.6T total assets, $4T AUM) choosing public Ethereum over private blockchains or competitors (Solana, Avalanche) signals Ethereum\'s position as the institutional settlement layer. Quote from John Donohue, Head of Global Liquidity: "We expect other GSIB banks to follow our lead." This could trigger competitive pressure among major banks.',
      bmnrImplication: 'Massive validation of ETH as institutional infrastructure. JPMorgan\'s entry accelerates the "TradFi on Ethereum" narrative that directly supports BMNR\'s thesis. More institutional activity = more network fees = deflationary pressure on ETH supply. BMNR benefits as the largest liquid vehicle for institutional ETH exposure.',
      impact: 'Bullish', 
      source: 'JPMorgan Press Release' 
    },
    { 
      date: '2025-12-16', 
      category: 'Enterprise', 
      company: 'Sentient Jet',
      title: 'Sentient Jet Adds Cryptocurrency Payments Including ETH via BitPay', 
      summary: 'Sentient Jet, pioneer of the jet card category and private aviation leader (25+ years), announces cryptocurrency payment acceptance through BitPay partnership. Card Owners and new members can complete payments using BTC, ETH, and stablecoins (USDC, PYUSD). All crypto payments processed through BitPay and settled in USD — Sentient Jet does not hold digital assets directly. President Alan Walsh: "Sentient Jet has built its reputation by innovating how people travel privately." BitPay CMO Bill Zielke: "Organizations offering cryptocurrency as a payment option often see increased transaction sizes as customers enjoy the flexibility and security of digital payments."',
      significance: 'Ultra high net worth market (private aviation) accepting crypto payments signals mainstream luxury adoption. BitPay processes billions in annual crypto transactions. Sentient Jet joins luxury brands accepting digital assets, normalizing crypto for wealth management.',
      bmnrImplication: 'ETH accepted for high-value purchases (private jets) demonstrates real-world utility beyond speculation. Luxury market adoption attracts wealthy investors to crypto ecosystem. More ETH payment use cases = more network utility.',
      impact: 'Bullish', 
      source: 'Sentient Jet Press Release' 
    },
    { 
      date: '2025-12-16', 
      category: 'Enterprise', 
      company: 'Tetra Digital',
      title: 'CADD - First Regulated Canadian Stablecoin Tests Between Major Banks', 
      summary: 'Tetra Digital Group announces successful smart contract deployment and initial partner testing for CADD, designed to be the first fully regulated Canadian stablecoin issued by a financial institution. CADD tested between Canadian financial institutions including National Bank and Wealthsimple, marking first time a Canadian-dollar stablecoin moved between two financial institutions including a major bank. Additional test partners: Purpose, ATB Financial. CADD backed 1:1 by Canadian dollars held domestically under Canadian law. Design partners include Aquanow, Capco, Cybrid, Float Financial, KOHO, Sling Money, Tempo, and WealthONE. Investors: Urbana Corporation, Canadian Securities Exchange, Wealthsimple, Purpose Unlimited, Shakepay, ATB Financial, National Bank of Canada, Coinbase Ventures, Horizon Kinetics, and Shopify. Q1 2026 launch targeted. CEO Didier Lavallée: "These tests highlight the potential for CADD to streamline payments and settlement while preserving the safeguards that underpin Canada\'s financial system."',
      significance: 'First regulated Canadian stablecoin with major bank participation (National Bank of Canada). Coinbase Ventures and Shopify backing signals broad institutional support. Canada establishing compliant stablecoin infrastructure parallel to US GENIUS Act framework.',
      bmnrImplication: 'Canadian stablecoin ecosystem development expands North American blockchain infrastructure. Major bank + fintech consortium model (similar to A+ Protocol) could accelerate regulated stablecoin adoption. Ethereum-compatible stablecoins expand network utility.',
      impact: 'Bullish', 
      source: 'Tetra Digital Press Release' 
    },
    { 
      date: '2025-12-15', 
      category: 'L2', 
      company: 'Coinbase',
      title: 'Base Hits 10M Daily Transactions', 
      summary: 'Coinbase\'s Base L2 achieves milestone of 10 million daily transactions, becoming the largest Ethereum L2 by transaction activity. Base, launched in August 2023, is an optimistic rollup built on the OP Stack (Optimism\'s technology). The network benefits from Coinbase\'s 110M+ verified users and seamless fiat on-ramps. Major applications include Friend.tech, Aerodrome DEX, and numerous NFT/gaming projects. Base pays settlement fees to Ethereum L1 for data availability and security inheritance.',
      significance: 'L2 scaling working as designed - high activity on rollups while settling to Ethereum for security. Base\'s success demonstrates Ethereum\'s "modular" scaling roadmap is viable. More L2 activity = more ETH burned for settlement = deflationary pressure.',
      bmnrImplication: 'Healthy L2 ecosystem validates Ethereum\'s long-term scaling approach. Each Base transaction ultimately pays fees to Ethereum L1, supporting ETH value accrual that benefits BMNR holdings.',
      impact: 'Bullish', 
      source: 'Dune Analytics' 
    },
    { 
      date: '2025-12-10', 
      category: 'DeFi', 
      company: 'Aave',
      title: 'Aave V4 Launch on Mainnet', 
      summary: 'Aave V4 launches on Ethereum mainnet with unified liquidity layer, improved capital efficiency, and enhanced risk management. New features include cross-chain liquidity (GHO stablecoin integration), soft liquidations, and modular architecture for easier upgrades. TVL increases 15% in first week post-launch. Aave remains the largest DeFi lending protocol with $15B+ in deposits across all chains.',
      significance: 'Continued DeFi innovation on Ethereum demonstrates the network\'s position as the primary smart contract platform. Aave V4\'s success attracts more liquidity and developers to the ecosystem.',
      bmnrImplication: 'Strong DeFi ecosystem increases ETH utility and demand. More locked value in protocols = more ETH required for collateral and gas = supports ETH price floor.',
      impact: 'Bullish', 
      source: 'Aave Governance' 
    },
    { 
      date: '2025-12-07', 
      category: 'Institutional', 
      company: 'GoTyme Bank',
      title: 'GoTyme Bank Launches Crypto Trading in Philippines via Alpaca Partnership', 
      summary: 'GoTyme Bank, fastest-growing bank in Philippines (joint venture: Gokongwei Group + Tyme Group), launches cryptocurrency investment feature through Alpaca API partnership. Customers can invest in 11 coins including BTC, ETH, and SOL directly from their banking app. Philippines ranks 9th globally in crypto adoption with 10% of population using crypto, projected to reach 12.79M users by 2026. The launch targets the country\'s 76% unbanked/underbanked population seeking digital-first financial solutions. CEO Nate Clarke: "Our goal is to become the most transformative bank in the Philippines." Alpaca CEO Yoshi Yokokawa: "We\'re enabling millions of Filipinos to confidently build wealth and participate in the global digital economy."',
      significance: 'Emerging market bank integrating crypto directly into banking app demonstrates global adoption beyond Western markets. Philippines\' crypto-friendly regulatory environment and large unbanked population creates significant growth opportunity. Bank-embedded crypto lowers barrier to entry vs standalone exchanges.',
      bmnrImplication: 'Emerging market crypto adoption expands global ETH investor base. Bank integration normalizes crypto as part of standard financial services. More retail adoption = more network activity = ETH ecosystem growth.',
      impact: 'Bullish', 
      source: 'GoTyme Bank Press Release' 
    },
    { 
      date: '2025-12-05', 
      category: 'Enterprise', 
      company: 'Sony',
      title: 'Sony Soneium L2 Mainnet Launch', 
      summary: 'Sony Group launches Soneium, an Ethereum Layer 2 blockchain targeting gaming, entertainment, and creator economy use cases. Built on Optimism\'s OP Stack, Soneium launches with 50+ partners including major gaming studios and entertainment companies. Sony aims to leverage its PlayStation Network (100M+ users), music catalog, and film properties for Web3 integration. Initial focus on NFT ticketing, in-game assets, and creator monetization tools.',
      significance: 'Major entertainment conglomerate ($85B market cap) building on Ethereum rather than proprietary blockchain. Validates Ethereum as the settlement layer for mainstream consumer applications. Could onboard millions of non-crypto-native users.',
      bmnrImplication: 'Enterprise adoption expands Ethereum\'s total addressable market beyond finance. More users = more network activity = more ETH demand. Sony\'s brand legitimizes blockchain for mainstream audiences.',
      impact: 'Bullish', 
      source: 'Sony Press Release' 
    },
    { 
      date: '2025-12-03', 
      category: 'Protocol', 
      company: 'Ethereum Foundation',
      title: 'Fusaka Mainnet Upgrade Activates - PeerDAS, 60M Gas Limit, secp256r1', 
      summary: 'Ethereum Fusaka network upgrade activates at slot 13,164,544 (epoch 411392). Major features: (1) PeerDAS (EIP-7594) — Peer Data Availability Sampling enables blob scaling through erasure coding, allowing nodes to sample portions of blob data while cryptographically guaranteeing full data availability; (2) Gas Limit Increase (EIP-7935) — default gas limit raised to 60M, increasing L1 execution capacity; (3) secp256r1 Precompile (EIP-7951) — native support for Apple Secure Enclave, Android Keystore, and FIDO2/WebAuthn devices, reducing friction for mainstream adoption; (4) ModExp Optimization (EIP-7883/EIP-7823) — proper pricing for resource-intensive cryptographic operations; (5) Transaction Gas Limit Cap (EIP-7825) — 16,777,216 gas cap enabling future parallel transaction processing; (6) CLZ Opcode (EIP-7939) — Count Leading Zeros for ZK proving cost reduction. Blob Parameter Only (BPO) forks follow: BPO1 (Dec 9, 2025) raises blob target/max from 6/9 to 10/15; BPO2 (Jan 7, 2026) raises to 14/21. eth/69 protocol removes pre-merge fields. Named after Fulu (star in Cassiopeia) + Osaka (Devcon V location).',
      significance: 'Major Ethereum upgrade advancing scaling roadmap. PeerDAS is key step toward scaling blob throughput for L2 rollups. 60M gas limit increases L1 capacity. secp256r1 precompile enables hardware wallet authentication (Apple/Android/WebAuthn) — critical for mainstream adoption. BPO forks allow safe blob scaling: 6→10→14 target, 9→15→21 max.',
      bmnrImplication: 'Fusaka demonstrates Ethereum\'s continued technical evolution. PeerDAS + higher blob counts reduce L2 transaction costs, attracting more users. secp256r1 support enables mainstream authentication flows. Higher gas limit = more L1 throughput = more network utility. Protocol upgrades that improve UX and scalability strengthen ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'Ethereum Blog / Protocol Coordination Team' 
    },
    { 
      date: '2025-12-03', 
      category: 'Institutional', 
      company: 'Franklin Templeton',
      title: 'Franklin Templeton Launches Solana ETF (SOEZ) with Staking', 
      summary: 'Franklin Templeton ($1.6T AUM) launches Franklin Solana ETF (NYSE Arca: SOEZ), providing institutional access to Solana with staking rewards. The fund can stake up to 100% of SOL holdings, with rewards distributed as additional tokens. Coinbase Custody serves as SOL custodian; BNY as administrator. Head of ETF Product David Mann: "As blockchain networks evolve, investors want access to the ones driving real activity." Head of Digital Assets Roger Bayston: "Solana is becoming a core layer of the digital economy. Its speed and efficiency support activity that ranges from tokenized assets to next generation financial applications."',
      significance: 'Major asset manager expanding digital asset ETP suite beyond BTC/ETH. Franklin Templeton now offers EZBC (Bitcoin), EZET (Ethereum), XRPZ (XRP), and SOEZ (Solana). Staking-enabled ETF structure could set precedent for future ETH ETF staking approval.',
      bmnrImplication: 'While Solana is a competitor, Franklin Templeton\'s expanding crypto ETF suite validates the entire digital asset class. Their expertise in staking products (EZET may eventually stake) benefits ETH ecosystem. Institutional infrastructure buildout supports all major chains.',
      impact: 'Neutral', 
      source: 'Franklin Templeton Press Release' 
    },
    { 
      date: '2025-12-03', 
      category: 'DeFi', 
      company: 'Ostium',
      title: 'Ostium Raises $20M to Bring Global Markets Onchain via Arbitrum', 
      summary: 'Ostium Labs raises $24M total ($20M Series A co-led by General Catalyst and Jump Crypto, plus $4M strategic round) to build decentralized perpetual swaps for global markets on Arbitrum (Ethereum L2). Platform enables trading of stocks, commodities, indices, and FX through perpetual swaps onchain. $25B cumulative volume to date including $5B in metals trading. 95%+ of open interest is in Real World Assets (not crypto). General Catalyst MD Marc Bhargava: "Ostium is building transparent and resilient infrastructure poised to disrupt the $10T monthly-volume global CFD market." Jump Crypto CIO Saurabh Sharma: "Ostium takes a different path, competing with centralized brokers by quoting directly from the real liquidity that already powers equities, FX, and commodity markets offchain."',
      significance: 'Top-tier VCs (General Catalyst, Jump Crypto) backing DeFi for traditional markets on Ethereum L2. 95%+ RWA focus demonstrates DeFi expanding beyond crypto-native assets. $10T CFD market disruption thesis validates Ethereum infrastructure for global finance.',
      bmnrImplication: 'DeFi protocols bringing traditional markets on-chain validates Ethereum as global financial infrastructure. Arbitrum L2 activity ultimately settles to Ethereum L1. More trading volume = more network utility = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'Ostium Press Release' 
    },
    // === NOVEMBER 2025 ===
    { 
      date: '2025-11-28', 
      category: 'Institutional', 
      company: 'BlackRock',
      title: 'ETH ETF Weekly Inflows Hit $500M', 
      summary: 'Spot Ethereum ETFs see largest weekly inflows since launch in July 2024, with $500M net inflows. BlackRock\'s iShares Ethereum Trust (ETHA) leads with $280M, followed by Fidelity\'s FETH ($120M) and Bitwise ETHW ($60M). Grayscale\'s converted ETHE continues to see outflows but at a slowing pace. Total spot ETH ETF AUM reaches $12.4B. Institutional adoption accelerating as advisors and wealth managers add ETH exposure to client portfolios.',
      significance: 'ETF inflows represent sustained institutional demand, not speculation. Advisors allocating client assets signals long-term conviction. $500M weekly = $26B annualized pace if sustained.',
      bmnrImplication: 'ETF inflows directly compete with BMNR for institutional ETH exposure, but also validate the asset class. Rising tide lifts all boats - more institutional interest supports ETH price which drives BMNR NAV. BMNR offers yield advantage (staking + dividends) that ETFs cannot match.',
      impact: 'Bullish', 
      source: 'CoinShares' 
    },
    {
      date: '2025-11-20',
      category: 'Regulatory',
      company: 'Coinbase',
      title: 'Canada Proposes Stablecoin Framework — Bank of Canada as Regulator, Coinbase Calls It Global Leadership',
      summary: 'Canada\'s 2025 federal budget formally recognized stablecoins as key to future of money. Government proposed comprehensive stablecoin framework: stablecoin issuers must apply to Bank of Canada for public registry, Bank of Canada as primary regulator, protections allowing stablecoins as payment instruments, reserve/custody requirements (cash + HQLA), and foreign regime equivalence. Nearly 5 million Canadians now hold crypto. Coinbase Country Director Lucas Matheson called it one of the strongest frameworks globally, taking best components from GENIUS Act and international standards. Coinbase recommends: allowing yield on stablecoin deposits, level playing field across bank/non-bank tokenized products, and CSA interim guidance for Canadian-denominated stablecoins. Matheson: "This is our moment to build a financial system that is faster, fairer, and more affordable for everyone."',
      significance: 'One of the largest economies to move forward with comprehensive stablecoin regulation. Bank of Canada as regulator signals sovereign seriousness. Framework draws from US GENIUS Act best practices. Creates regulatory clarity for stablecoin issuers and exchanges operating in Canada.',
      bmnrImplication: 'Canada joining US (GENIUS Act) in stablecoin regulatory clarity accelerates global institutional adoption. More regulatory frameworks = more stablecoin activity on Ethereum (USDC, USDT). Stablecoin infrastructure built on Ethereum benefits from each new jurisdiction providing clarity.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-11-19',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Launches DEX Trading in Brazil — "DeFi Mullet" Bridges Millions of Users to Onchain Markets',
      summary: 'Coinbase launches DEX trading integration for Brazilian users, giving access to Base-native tokens within moments of creation onchain. Built on "DeFi Mullet" concept: Coinbase interface in front, powered by DeFi protocols in back. Users trade on Aerodrome, Uniswap via DEX aggregators without leaving Coinbase app. Expands tradeable assets from 300 to tens of thousands (potentially millions). Features: integrated self-custody wallet, sponsored network fees, seamless funding, and portfolio tracking. Assets identified as malicious by third-party vendor blocked. Planned expansion to more networks including Solana. Part of Coinbase\'s vision to build "app to exchange everything" with 24/7 global access.',
      significance: 'Major exchange bridging CeFi and DeFi at scale in one of crypto\'s largest markets (Brazil). "DeFi Mullet" model could become template for how exchanges onboard users to onchain trading. Sponsored gas fees and integrated self-custody wallet lower barriers dramatically.',
      bmnrImplication: 'Coinbase DEX integration on Base (Ethereum L2) brings millions of Brazilian users directly to Ethereum ecosystem. Sponsored gas fees reduce friction for DeFi adoption. More users on Base = more L2 activity = more settlement fees to Ethereum L1. Validates Ethereum L2 as consumer-facing infrastructure.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-11-20',
      category: 'Protocol',
      company: 'Ethereum Foundation',
      title: 'Pectra Mainnet Upgrade Successfully Activated', 
      summary: 'Pectra (Prague-Electra) upgrade successfully activates on Ethereum mainnet. Pectra combines execution layer (Prague) and consensus layer (Electra) improvements. Key features: EIP-7702 (account abstraction for EOAs) enabling smart contract functionality for regular accounts, EIP-2935 (historical block hashes in state) supporting stateless clients, and validator operational improvements including increased MAX_EFFECTIVE_BALANCE from 32 ETH to 2048 ETH for consolidation. Pectra is the first major upgrade since Dencun (March 2024). Ethereum Foundation confirms Fusaka upgrade to follow in December 2025 with PeerDAS for blob scaling.',
      significance: 'Successful mainnet upgrade demonstrates Ethereum\'s continued technical evolution. EIP-7702 account abstraction is transformative for user experience — enables gas sponsorship, batched transactions, and smart account features without smart contract wallets. Validator consolidation reduces operational overhead.',
      bmnrImplication: 'Protocol upgrades that improve UX attract more users and developers. Account abstraction (EIP-7702) could accelerate mainstream adoption by simplifying wallet experience. Successful upgrade execution reduces technical risk for ETH holders.',
      impact: 'Bullish', 
      source: 'Ethereum Foundation' 
    },
    { 
      date: '2025-11-15', 
      category: 'Enterprise', 
      company: 'Visa',
      title: 'Visa Expands USDC Settlement to 5 New Markets', 
      summary: 'Visa extends USDC stablecoin settlement on Ethereum to 5 additional markets, bringing total to 12 countries. Processing $1B+ monthly in on-chain settlement volume. Expansion includes merchant acquirers in Southeast Asia and Latin America. Visa uses USDC on both Ethereum and Solana for cross-border settlement, reducing costs and settlement times vs traditional correspondent banking (T+2 to near-instant). Partners include Crypto.com (issuer), Worldpay, and Nuvei (acquirers).',
      significance: 'World\'s largest payment network ($15T annual volume) actively building on public blockchains. Visa\'s expansion proves stablecoin settlement is production-ready, not experimental. Each new market validates the model.',
      bmnrImplication: 'Visa building on Ethereum normalizes blockchain for traditional finance. Payment volume drives USDC demand, which settles on Ethereum. More on-chain commerce = more network activity = more ETH value accrual.',
      impact: 'Bullish', 
      source: 'Visa Blog' 
    },
    {
      date: '2025-11-13',
      category: 'Institutional',
      company: 'Coinbase',
      title: 'Kalshi Selects Coinbase Custody for USDC — Largest US Prediction Market Runs on Stablecoin Rails',
      summary: 'Kalshi, the largest prediction market in the US, has chosen Coinbase Custody to safeguard USDC for event-based contracts. Participants deposit and receive payouts in USDC, with Coinbase Custody providing institutional-grade security. Prediction markets let users trade on real-world event outcomes — inflation trends, elections, sports, government policy. Coinbase describes the partnership as combining Kalshi\'s regulated exchange with Coinbase\'s custody standard and USDC\'s stability to prove "financial innovation can be both trusted and transformative." Availability expanding as regulatory approvals obtained.',
      significance: 'USDC adoption expanding beyond payments and DeFi into prediction markets. Kalshi is CFTC-regulated — institutional-grade venue choosing stablecoin settlement over traditional rails. Validates USDC (Ethereum-native stablecoin) as settlement layer for new financial primitives.',
      bmnrImplication: 'Prediction markets on USDC expand stablecoin utility into entirely new asset class. USDC originally issued on Ethereum — more USDC demand = more Ethereum ecosystem value. Novel financial products choosing stablecoin rails over traditional finance validates crypto infrastructure.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-11-13',
      category: 'Enterprise',
      company: 'A+ Protocol',
      title: 'A+ Protocol Launches Multi-Party Stablecoin Network for Banks', 
      summary: 'A+ Protocol launches $USDA+, a multi-party issued stablecoin designed for banks and regulated financial institutions. GENIUS Act-compliant framework allows banks to join unified network and issue stablecoins while keeping 100% of yield. Unlike whitelabel solutions with limited liquidity, A+ offers interoperable network with core functionality similar to Circle/Coinbase. Includes whitelisting and compliance layer mirroring Bank Secrecy Act KYC/AML requirements. Freezing, burning, and law enforcement cooperation under consensus control of all bank issuers. Project catalyzed by Ethereum Foundation grant. SEC Chair has announced initiative to modernize US securities rules to enable "America\'s financial markets to move on-chain."',
      significance: 'Bank consortium stablecoin model addresses fragmentation risk of individual bank tokens. GENIUS Act compliance provides regulatory clarity. Ethereum Foundation grant signals alignment with Ethereum ecosystem. Could accelerate bank stablecoin adoption beyond single-issuer models.',
      bmnrImplication: 'Bank stablecoins on Ethereum expand institutional network utility. Consortium model could scale faster than individual bank tokens (Visa VTAP, JPMorgan JPMD). More stablecoin activity = more ETH network value.',
      impact: 'Bullish', 
      source: 'A+ Protocol Press Release' 
    },
    { 
      date: '2025-11-14', 
      category: 'Enterprise', 
      company: 'Citi',
      title: 'Citi & Swift Complete Landmark Fiat-to-Digital Currency PvP Settlement Trial', 
      summary: 'Citi and Swift announce landmark trial proving feasibility of settling payments between fiat and digital currencies in Payment-versus-Payment (PvP) workflow. Demonstrates hybrid model for interoperability between traditional financial systems and DLT networks. Leverages existing Swift infrastructure augmented with institutional-grade blockchain connectors, orchestrators, and smart contracts. Used test USDC tokens from Circle on Ethereum Sepolia testnet to simulate near-production environment. Novel approach: holistic messaging standard tracking end-to-end process (trade initiation to settlement confirmation), escrow mechanism for irreversible blockchain transactions, central orchestrator managing sequenced exchange between fiat and DLT legs. Ayesa Latif (Citi Head of FX Products): "These trials represent a significant leap forward in understanding and developing infrastructure required to support digital currency transactions." Swift\'s Jonathan Ehrenfeld: "Swift is uniquely positioned to be the secure and trusted single point of access for seamless connection between tokenized ecosystems and the established global financial community." Citi GPS projects stablecoin market reaching $1.9T by 2030.',
      significance: 'Citi ($2T assets) + Swift (11,500+ organizations, 200+ countries) proving fiat-digital currency interoperability. USDC on Ethereum testnet validates network for institutional settlement trials. PvP mechanism eliminates settlement risk. Creates template for scalable institutional digital asset transactions.',
      bmnrImplication: 'Swift integrating Ethereum testnet for settlement trials validates network for global payments infrastructure. Fiat-digital interoperability reduces friction for institutional blockchain adoption. More institutional infrastructure testing = closer to production deployment = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'Citi / Swift Press Release' 
    },
    { 
      date: '2025-11-12', 
      category: 'Enterprise', 
      company: 'JPMorgan',
      title: 'JPMorgan Launches JPMD - First Bank Deposit Token on Public Blockchain', 
      summary: 'Kinexys by J.P. Morgan launches JPM Coin USD deposit token (ticker: JPMD) on Base, the Ethereum L2 built by Coinbase — making JPMorgan the first bank to issue USD deposit tokens on public blockchain. Following successful proof-of-concept with B2C2, Coinbase, and Mastercard, JPMD enables near-instant 24/7 settlement and real-time liquidity. Institutional clients can make peer-to-peer transfers between EVM-compatible wallets and integrate with smart contracts. Global Co-head Naveen Mallela: "With JPM Coin now available to our institutional clients, we\'re moving the industry forward in transacting on public blockchains." Coinbase VP Lauren Abendschein: "The next evolution of digital money is here." Mastercard EVP Raj Dhamodharan: "This integration delivers secure, streamlined access to on-chain payments."',
      significance: 'WATERSHED MOMENT: World\'s largest bank by market cap ($700B+) issuing deposit tokens on public Ethereum L2. JPMorgan choosing Base (Coinbase/Ethereum) over private blockchain validates public infrastructure. Partners include Mastercard — two of world\'s largest financial institutions collaborating on-chain.',
      bmnrImplication: 'JPMorgan on Ethereum L2 is massive validation for the network. Bank deposit tokens create new use case for institutional on-chain activity. Mastercard integration expands potential network effects. More institutional activity on Base = more settlement fees to Ethereum L1.',
      impact: 'Bullish', 
      source: 'JPMorgan Kinexys Press Release'
    },
    {
      date: '2025-11-12',
      category: 'Enterprise',
      company: 'Coinbase',
      title: 'Coinbase Business Launches in Singapore — First International Market, Powered by Standard Chartered and USDC',
      summary: 'Coinbase Business launches in Singapore as first international market outside US. All-in-one crypto operating platform for startups and SMBs offers: integrated trading and treasury management, global USDC payouts with near-instant settlement and minimal fees, payment links with 1% transaction fee (vs credit card rates), USDC balance rewards, and accounting reconciliation (QuickBooks, Xero). Powered by Standard Chartered banking partnership for real-time SGD fiat transfers. Builds on Coinbase participation in MAS BLOOM Initiative (Borderless, Liquid, Open, Online, Multi-currency) contributing to "Agentic Payments" workstream. Singapore chosen as gateway to Asia due to digital innovation leadership and regulatory clarity.',
      significance: 'Major crypto exchange launching B2B payments infrastructure in key Asian financial hub. Standard Chartered banking integration bridges TradFi-crypto for business use. MAS BLOOM participation demonstrates regulatory collaboration. USDC-native B2B payments could become template for international expansion.',
      bmnrImplication: 'Coinbase Business on USDC rails drives more stablecoin utility on Ethereum ecosystem. Standard Chartered partnership brings institutional credibility. MAS BLOOM "Agentic Payments" workstream aligns with emerging AI-blockchain narrative. More USDC commercial activity = more Ethereum network value.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-11-11',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Launches UK Savings Account — First Crypto-Native Exchange with Regulated Savings (3.75% AER, FSCS Protected)',
      summary: 'Coinbase launches savings account for eligible UK users — 3.75% AER variable interest paid daily, instant deposits/withdrawals, no minimum balance or lockup. FSCS protection up to £85,000 (via ClearBank). First crypto-native exchange to offer regulated savings account in UK. Part of Coinbase\'s vision as "exchange for everything" — full financial suite combining crypto trading (260+ assets) with traditional savings. UK is Coinbase\'s largest international market. Follows FCA VASP registration in Feb 2025, making Coinbase largest UK registered crypto exchange. Aiming to become UK\'s #1 financial app by bridging fiat and crypto economies.',
      significance: 'First crypto exchange offering FSCS-protected savings account — significant crypto-TradFi convergence milestone. Coinbase evolving from pure exchange to comprehensive financial platform. UK as largest international market signals strategic importance. Bridges gap between traditional savings and crypto investment for mainstream users.',
      bmnrImplication: 'Coinbase evolving into full financial platform increases crypto on-ramp surface area. UK users can hold savings + trade crypto in one app — reduces friction to enter crypto economy. More mainstream crypto access = more potential ETH demand. FSCS-protected savings alongside crypto normalizes digital assets for conservative users.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-11-11',
      category: 'Enterprise',
      company: 'SoFi',
      title: 'SoFi Bank Becomes First Nationally Chartered Bank to Launch Crypto Trading',
      summary: 'SoFi Technologies (NASDAQ: SOFI) launches SoFi Crypto, becoming the first and only nationally chartered, FDIC-insured bank to offer crypto trading to consumers. Members can buy, sell, and hold dozens of cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) directly from their SoFi checking/savings account without moving funds to external platforms. CEO Anthony Noto: "I believe blockchain technology will fundamentally change EVERY way finance is done throughout the world by making money movement faster, cheaper and safer." 60% of SoFi members who own crypto prefer buying from a licensed bank over their primary crypto exchange. Data shows crypto ownership doubled in 2025. SoFi also leveraging blockchain for crypto-enabled remittances and plans to introduce a USD stablecoin and integrate crypto into lending/infrastructure services. 12.6M+ members trust SoFi for banking, borrowing, investing, and now crypto.',
      significance: 'FIRST nationally chartered US bank offering integrated crypto trading — major milestone for bank-crypto convergence. Demonstrates consumer demand for regulated, bank-grade crypto access (60% prefer bank over exchange). SoFi\'s stablecoin and blockchain lending plans signal deeper TradFi-crypto integration ahead. Over 12.6M potential users with seamless fiat-crypto rails.',
      bmnrImplication: 'Bank-integrated crypto trading normalizes ETH ownership for mainstream consumers. SoFi\'s 12.6M members get frictionless ETH access from bank accounts. Planned USD stablecoin could add to Ethereum stablecoin ecosystem. More retail on-ramps = more ETH demand = ecosystem value accrual.',
      impact: 'Bullish',
      source: 'SoFi Technologies Press Release'
    },
    {
      date: '2025-11-08',
      category: 'DeFi',
      company: 'Uniswap',
      title: 'Uniswap V4 Hooks Ecosystem Grows', 
      summary: 'Over 200 custom hooks deployed on Uniswap V4 since launch, enabling novel AMM designs including dynamic fees, on-chain limit orders, MEV redistribution, and concentrated liquidity automation. Total Uniswap TVL reaches $8B across all versions (V2, V3, V4). V4\'s singleton contract design reduces gas costs 50%+ for multi-hop swaps. Hook examples: time-weighted average price (TWAP) orders, volatility-based fee adjustment, and loyalty rewards.',
      significance: 'Uniswap V4 hooks create "DeFi Legos 2.0" - permissionless innovation on top of core AMM infrastructure. Developer activity indicates sustained belief in Ethereum DeFi. Gas improvements make DEX trading competitive with CEXs.',
      bmnrImplication: 'Thriving DeFi ecosystem keeps Ethereum as the primary smart contract platform. More protocol innovation = more users = more ETH demand for gas and collateral.',
      impact: 'Bullish',
      source: 'Uniswap Labs'
    },
    {
      date: '2025-11-04',
      category: 'Enterprise',
      company: 'Amundi',
      title: 'Amundi Tokenizes First Mutual Fund Share Class on Ethereum Mainnet',
      summary: 'Amundi ($2.75T AUM), Europe\'s largest asset manager, launches first tokenized share class of one of its euro money market funds on Ethereum mainnet. Initial subscription November 4, 2025. Fund distributed in hybrid way: accessible via standard distribution networks AND via tokenized share. Project completed in 4 months based on 3 years of tokenization research. Collaboration between Legal, Compliance, Investments, Risk and Marketing teams across Amundi, Crédit Agricole, and CACEIS (Luxembourg). CACEIS provides technology and infrastructure for tokenization, digital wallets, and digital order platform for subscriptions/redemptions.',
      significance: 'Europe\'s largest asset manager bringing institutional cash management on-chain. Hybrid distribution model allows gradual migration from traditional to tokenized rails. Multi-year R&D commitment demonstrates serious institutional intent. CACEIS infrastructure enables other asset managers to follow.',
      bmnrImplication: 'Amundi ($2.75T AUM) tokenizing funds on Ethereum validates network for European institutional asset management. More tokenized funds = more on-chain settlement = ETH ecosystem value. Hybrid distribution model lowers barrier for traditional institutions.',
      impact: 'Bullish',
      source: 'Amundi'
    },
    // === OCTOBER 2025 ===
    {
      date: '2025-10-29',
      category: 'Enterprise',
      company: 'Securitize',
      title: 'Securitize Launches Tokenized AAA CLO Fund with BNY on Ethereum',
      summary: 'Securitize ($4B+ AUM) launches Securitize Tokenized AAA CLO Fund (STAC) on Ethereum, bringing institutional structured credit on-chain. BNY ($57.8T AUC/A, $2.1T AUM) serves as custodian with BNY Investments as sub-advisor ($1.35T+ fixed income). Grove (Sky/MakerDAO ecosystem) plans $100M anchor allocation pending governance approval. Global CLO issuance exceeds $1.3T. Fund targets AAA-rated CLO tranches with floating rate exposure. Sam Paderewski, Grove Labs: "AAA CLOs offer durable, floating rate exposure that institutions understand. Tokenizing that exposure improves distribution and settlement."',
      significance: 'World\'s largest custodian (BNY) partnering on tokenized institutional credit on Ethereum. AAA CLO market previously under-represented in tokenization despite consistent performance. DeFi-TradFi bridge via Grove/Sky ecosystem anchor.',
      bmnrImplication: 'AAA CLO tokenization on Ethereum expands network utility for institutional credit markets. BNY ($57.8T AUC/A) participation validates Ethereum for high-quality credit infrastructure. More tokenized structured credit = more on-chain settlement = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Securitize / BNY Press Release'
    },
    {
      date: '2025-10-27',
      category: 'Enterprise',
      company: 'JPYC',
      title: 'JPYC Launches World\'s First Yen-Pegged Regulated Stablecoin on Ethereum',
      summary: 'JPYC, a Japanese startup, launches the world\'s first stablecoin pegged to the yen on Ethereum, fully convertible to yen and backed by domestic savings and Japanese Government Bonds (JGBs). Target: 10 trillion yen ($66 billion) issuance over 3 years. No initial transaction fees — revenue from JGB interest. CEO Noritaka Okabe: "We hope to spur innovation by giving startups access to low transaction and settlement fees." BOJ Deputy Governor Ryozo Himino: "Stablecoins might emerge as a key player in the global payment system, partially replacing the role of bank deposits." Japan\'s three megabanks also planning joint stablecoin per Nikkei.',
      significance: 'First yen stablecoin launches under Japan\'s Payment Services Act. Expands global stablecoin ecosystem beyond USD dominance (99%+ of current supply). BOJ acknowledgment of stablecoin importance signals regulatory acceptance.',
      bmnrImplication: 'Yen stablecoin on Ethereum expands network utility for non-USD global commerce. More diverse stablecoin ecosystem = more on-chain activity = ETH ecosystem value. Japan megabank interest indicates broader institutional adoption coming.',
      impact: 'Bullish',
      source: 'Reuters'
    },
    {
      date: '2025-10-14',
      category: 'Enterprise',
      company: 'Stripe',
      title: 'Stripe Launches Stablecoin Subscription Payments on Ethereum L2s',
      summary: 'Stripe launches stablecoin-based subscription capabilities, enabling recurring billing via USDC on Base and Polygon (Ethereum L2s). Built smart contract that resolves fundamental blockchain limitation: customers can save wallet as payment method and authorize recurring payments without re-signing each transaction. Supports 400+ wallets. Some AI companies (Shadeform) seeing ~20% of payment volume shift to stablecoins. Stablecoins settle near-instantly and cost half as much per transaction. 30% of Stripe businesses have recurring business models. Alex Mashrabov, Higgsfield CEO: "Stablecoin payments help us reduce our cost of revenue for payments from all around the globe."',
      significance: 'Major payment processor enabling recurring crypto payments on Ethereum ecosystem. Addresses key blockchain UX limitation (manual signing) via smart contracts. Makes crypto subscriptions as seamless as traditional payment methods.',
      bmnrImplication: 'Stripe building stablecoin subscription infrastructure on Base/Polygon expands Ethereum ecosystem utility for recurring commerce. More merchant adoption = more on-chain transaction volume = ETH ecosystem value accrual.',
      impact: 'Bullish',
      source: 'Stripe Blog'
    },
    {
      date: '2025-10-02',
      category: 'Enterprise',
      company: 'FG Nexus',
      title: 'FG Nexus and Securitize Tokenize NASDAQ-Listed Shares on Ethereum',
      summary: 'FG Nexus (Nasdaq: FGNX, FGNXP) and Securitize announce agreement to natively tokenize FG Nexus public shares on Ethereum. Among first NASDAQ-listed companies to offer shareholders choice to tokenize shares, with tokenized shares conferring same rights as traditional shares. FIRST to tokenize dividend-paying, exchange-listed perpetual preferred share (FGNXP) — bringing recurring cash flows fully onchain. Uses Securitize\'s SEC-regulated infrastructure (broker-dealer, ATS, transfer agent). Carlos Domingo, Securitize CEO: "U.S. investors being able to hold real stock, not a synthetic wrapper, with instant settlement, automated compliance, and the ability to trade onchain through our regulated ATS."',
      significance: 'First NASDAQ-listed dividend-paying preferred shares tokenized on Ethereum. Real equity ownership (not synthetic) with regulatory compliance. Dividends onchain = programmable shareholder distributions.',
      bmnrImplication: 'Public company equity tokenized on Ethereum validates network for securities infrastructure. FG Nexus (ETH treasury company like BMNR) choosing Ethereum for own stock tokenization is strong endorsement. More equity tokenization = more Ethereum ecosystem utility.',
      impact: 'Bullish',
      source: 'FG Nexus / Securitize Press Release'
    },
    {
      date: '2025-10-01',
      category: 'L2',
      company: 'ADI Foundation',
      title: 'ADI Chain Joins ZKsync Elastic Network as First Airbender-Built Blockchain',
      summary: 'ZKsync welcomes ADI Chain into its Elastic Network — a modular system of rollups and validiums enabling interoperability and shared liquidity. ADI Chain is FIRST blockchain built with ZKsync\'s Airbender technology, a high-speed open-source RISC-V prover delivering Ethereum block proofs in ~35 seconds using single GPU. Modular architecture supports EVM, EraVM, and WASM. Joins ZKsync Era, Abstract, Sophon, Lens, Zero Network, Cronos zkEVM, ZKcandy, and Wonder in the network. ADI Chain will host UAE\'s first dirham-pegged stablecoin developed by ADQ, IHC, and First Abu Dhabi Bank, pending Central Bank approval.',
      significance: 'First production deployment of ZKsync\'s next-generation proving technology. Airbender enables ~35 second Ethereum proofs with single GPU — significant performance improvement. ADI Chain\'s institutional compliance focus plus ZK technology addresses enterprise requirements.',
      bmnrImplication: 'ADI Chain using ZKsync Airbender to join Ethereum\'s ZK ecosystem validates network for regulated institutional infrastructure. ZK technology enables high-performance L2 meeting both compliance and scalability requirements. UAE sovereign stablecoin infrastructure on Ethereum L2.',
      impact: 'Bullish',
      source: 'ZKsync / crypto.news'
    },
    {
      date: '2025-10-31',
      category: 'Enterprise',
      company: 'HKMA',
      title: 'Hong Kong e-HKD Pilot Programme Phase 2 Report Published', 
      summary: 'Hong Kong Monetary Authority publishes Phase 2 Report of e-HKD Pilot Programme under Project e-HKD+. Eleven pilot groups across three study themes: (1) Settlement of Tokenised Assets — Standard Chartered/BlackRock/Mastercard/Libeara tested end-to-end tokenised MMF settlement; Visa/ANZ/Fidelity/ChinaAMC explored cross-border AUD stablecoin to e-HKD conversion; HSBC tested privacy-enhancing technologies (Zero Knowledge Proofs via Zeto, Anonymous Zether), (2) Programmability — BOCHK/Sanfield tested construction supply chain payments; CCB(Asia) tested multi-chain cross-bank programmable transactions; DBS/Hang Seng tested purpose-bound money vouchers; Mastercard/KBank/Airstar tested deep-tier supply chain financing, (3) Offline Payments — Super SIM cards via BOCOM/China Mobile tested account-based vs UTXO models. Key findings: tokenised deposits can achieve similar efficiencies to e-HKD; commercial banks showed slight preference for tokenised deposits (lower cost of capital under fractional banking, faster time-to-market, stronger customer stickiness). HKMA decision: prioritize wholesale e-HKD development; retail extension subject to market demand. E-HKD Industry Forum developing common token standards for cross-institution programmability.',
      significance: 'Central banking institution completing 2-year comprehensive CBDC pilot with major global banks. Phase 2 validates both public (e-HKD) and private (tokenised deposits) digital money for institutional use. Privacy-enhancing technology tests (ZKP) address key adoption barrier. Hong Kong e-HKD Industry Forum creating interoperability standards. HKMA prioritizing wholesale over retail = focus on institutional infrastructure first.',
      bmnrImplication: 'HKMA validating tokenised deposits and programmability on blockchain validates Ethereum-compatible infrastructure. Privacy-enhancing technologies (ZKP) tested on permissionless blockchains. Common token standards for cross-institution programmability = Ethereum ecosystem interoperability. Hong Kong institutional blockchain adoption expands APAC network effect.',
      impact: 'Bullish', 
      source: 'HKMA e-HKD Pilot Programme Phase 2 Report' 
    },
    { 
      date: '2025-10-30', 
      category: 'Regulatory', 
      company: 'Other',
      title: 'EU MiCA Staking Clarity', 
      summary: 'European Securities and Markets Authority (ESMA) publishes guidance clarifying that ETH staking services can operate under Markets in Crypto-Assets (MiCA) framework. Staking providers classified as "crypto-asset service providers" (CASPs), requiring authorization but not securities registration. Guidance addresses custody, disclosure, and capital requirements. Provides legal certainty for European institutions to offer staking services.',
      significance: 'Regulatory clarity in world\'s largest single market ($18T GDP) removes major barrier to institutional staking adoption. Clear rules attract compliant capital that was previously sidelined.',
      bmnrImplication: 'MiCA clarity could accelerate European institutional staking, increasing overall ETH staked and reducing circulating supply. BMNR\'s staking operations (MAVAN) benefit from normalization of staking as regulated activity.',
      impact: 'Bullish', 
      source: 'ESMA' 
    },
    { 
      date: '2025-10-22', 
      category: 'Enterprise', 
      company: 'JPMorgan',
      title: 'JPMorgan Onyx Adds Ethereum Settlement', 
      summary: 'JPMorgan\'s Onyx blockchain platform adds Ethereum settlement option for institutional clients, complementing existing permissioned JPM Coin rails. Onyx processes $1B+ daily in repo transactions and intraday liquidity transfers. Ethereum option targets clients seeking interoperability with public DeFi ecosystem while maintaining JPMorgan custody and compliance. Uses wrapped JPM Coin on Ethereum with atomic settlement.',
      significance: 'JPMorgan bridging private and public blockchain worlds. Signals recognition that public Ethereum liquidity and composability add value even for institutional use cases. Precursor to full MONY fund launch.',
      bmnrImplication: 'JPMorgan\'s gradual Ethereum integration validates the network for traditional finance. Each step builds institutional comfort and infrastructure that benefits all ETH holders.',
      impact: 'Bullish', 
      source: 'JPMorgan' 
    },
    { 
      date: '2025-11-04', 
      category: 'Enterprise', 
      company: 'UBS',
      title: 'UBS Executes First Live Tokenized Fund Transaction with Chainlink DTA Standard', 
      summary: 'UBS announces world\'s first successful completion of an in-production, end-to-end tokenized fund workflow leveraging the Chainlink Digital Transfer Agent (DTA) technical standard. First on-chain subscription and redemption request of uMINT (UBS USD Money Market Investment Fund Token) proves fund operations can be seamlessly automated on-chain. DigiFT functioned as on-chain fund distributor. New workflow covers entire fund lifecycle: order taking, execution, settlement, and data synchronization across on-chain and off-chain systems. UBS Group COTO Mike Dargan: "This transaction represents a key milestone in how smart contract-based technologies and technical standards enhance fund operations and the investor experience." Chainlink\'s Sergey Nazarov: "This enables secure, compliant, and scalable end-to-end workflows for tokenized assets, setting a new benchmark for institutional finance on-chain." UBS manages $6.9T invested assets (Q3 2025).',
      significance: 'WORLD\'S FIRST in-production end-to-end tokenized fund workflow on Ethereum. Chainlink DTA standard provides institutional interoperability. Proves entire fund lifecycle can execute on-chain with real-time settlement. UBS ($6.9T AUM) + Chainlink partnership validates enterprise blockchain infrastructure.',
      bmnrImplication: 'UBS automating fund operations on Ethereum demonstrates network ready for institutional-scale asset management. Chainlink DTA standard creates interoperability layer for tokenized funds. More automated fund operations = more on-chain activity = ETH ecosystem value. UBS 8-year blockchain journey (2017-2025) culminates in production infrastructure.',
      impact: 'Bullish', 
      source: 'UBS / Chainlink Press Release' 
    },
    { 
      date: '2025-10-15', 
      category: 'L2', 
      company: 'Other',
      title: 'Arbitrum Stylus Goes Live', 
      summary: 'Arbitrum enables Rust, C, and C++ smart contracts via Stylus, expanding developer ecosystem beyond Solidity/Vyper. Stylus contracts run on WASM (WebAssembly), offering 10-100x gas efficiency for compute-heavy applications. Opens Ethereum to millions of Rust/C++ developers. Initial use cases: on-chain gaming, complex DeFi math, cryptographic operations. Maintains full EVM compatibility - Stylus and Solidity contracts interoperate seamlessly.',
      significance: 'Dramatically expands Ethereum developer TAM. Rust community (2M+ developers) can now build on Ethereum without learning Solidity. Gas efficiency enables new application categories previously cost-prohibitive.',
      bmnrImplication: 'More developers = more applications = more users = more ETH demand. Stylus addresses key criticism that Solidity limits Ethereum\'s developer pool.',
      impact: 'Bullish', 
      source: 'Offchain Labs' 
    },
    { 
      date: '2025-10-01', 
      category: 'Institutional', 
      company: 'Fidelity',
      title: 'Fidelity Digital Assets Launches ETH Staking', 
      summary: 'Fidelity Digital Assets launches institutional ETH staking service with 3.5% target yield, available to qualified custody clients. Fidelity operates its own validator infrastructure with institutional-grade security, insurance, and 24/7 monitoring. Minimum stake: 32 ETH (one validator). Service includes comprehensive reporting for tax and compliance. Fidelity becomes first traditional custodian bank to offer native ETH staking (vs. liquid staking derivatives).',
      significance: 'Fidelity ($4.5T AUM across all business lines) offering staking legitimizes the activity for traditional allocators. Institutional staking reduces selling pressure (staked ETH is locked) and increases network security.',
      bmnrImplication: 'Competition in institutional staking validates BMNR\'s staking strategy (MAVAN). More staked ETH = higher network security = reduced regulatory risk. Fidelity\'s entry may attract capital that eventually seeks higher-yielding options like BMNR.',
      impact: 'Bullish', 
      source: 'Fidelity' 
    },
    { 
      date: '2025-10-14', 
      category: 'Enterprise', 
      company: 'Citi',
      title: 'Citi CEO: Tokenized Deposits Will Power Next-Gen Finance Over Stablecoins', 
      summary: 'Citigroup ($2T+ assets) CEO Jane Fraser declares tokenized deposits — not stablecoins — will be primary engine behind next-generation payments and financial market infrastructure. Speaking on Q3 earnings call: "What our clients want is interoperable, multi-bank, always-on payment solutions provided in a safe and sound manner. That is best done by tokenized deposits." Citi\'s 24/7 USD clearing network now links to 250+ banks in 40+ markets for instant supplier/third-party transfers. Stablecoins have more friction: AML, tax reporting, accounting burdens. Fraser: "There\'s an overfocus on stablecoin at the moment. Most of this is going to get solved by tokenized deposit capabilities." Future vision: tokenized issuance/settlement of oil, equities on regulated rails. Citi GPS projects stablecoin market reaching $1.9T by 2030. Fraser praised regulators enabling responsible innovation.',
      significance: 'Tier 1 bank CEO ($2T assets) publicly declaring tokenized deposits superior to stablecoins for institutional use. 250+ bank network in 40+ markets demonstrates production scale. Citi GPS $1.9T stablecoin projection validates digital asset growth trajectory. CEO-level endorsement signals top-down institutional commitment.',
      bmnrImplication: 'Major bank prioritizing tokenized deposits validates blockchain for institutional payments. Citi building 24/7 infrastructure creates demand for always-on settlement networks like Ethereum. More bank tokenization = more blockchain adoption. $1.9T stablecoin projection supports ETH ecosystem growth thesis.',
      impact: 'Bullish', 
      source: 'CoinDesk / Citi Q3 2025 Earnings Call' 
    },
    { 
      date: '2025-09-30', 
      category: 'Institutional', 
      company: 'Bit Digital',
      title: 'Bit Digital Selects Figment for $532M ETH Treasury Staking', 
      summary: 'Bit Digital (NASDAQ-listed), one of the world\'s largest Ethereum treasuries with $532.5M in ETH, selects Figment as primary staking provider. Company has staked 86% of ETH holdings to date. Figment: $17B Assets Under Stake, 1,000+ institutional clients, backed by Thoma Bravo, Morgan Stanley (Counterpoint Global), Franklin Templeton, and Fidelity (Avon Ventures). Non-custodial design ensures clients retain full asset control. SOC 2 Type II and ISO 27001 certified with OFAC-compliant relays. CEO Sam Tabar: "Their battle-tested infrastructure and non-custodial approach align perfectly with our goal of building the largest institutional ETH treasury while delivering scalable, secure yields to our shareholders."',
      significance: 'Public company ($500M+ ETH treasury) validating institutional staking infrastructure. Figment\'s institutional backing (Morgan Stanley, Franklin Templeton, Fidelity) demonstrates traditional finance confidence in staking. 86% staking rate shows conviction in yield strategy.',
      bmnrImplication: 'Bit Digital\'s strategy directly parallels BMNR — both are publicly traded ETH treasury companies generating staking yield. Bit Digital\'s success validates the model. Figment\'s institutional infrastructure reduces staking risk perception. Competition validates the thesis.',
      impact: 'Bullish', 
      source: 'Bit Digital / Figment Press Release' 
    },
    { 
      date: '2025-09-09', 
      category: 'Institutional', 
      company: 'Fidelity',
      title: 'Fidelity Rolls Out $202M Tokenized Money Market Fund on Ethereum', 
      summary: 'Fidelity Investments ($4.5T+ AUM) rolls out tokenized money market fund on Ethereum blockchain. $202M in Fidelity Digital Interest Tokens (FDIT) minted — representing Fidelity Treasury Digital Fund (FYOXX/FYHXX) holding US Treasury bills. Main investor: Ondo Finance, using FDIT as reserve asset for OUSG yield-generating token. OUSG also uses BlackRock BUIDL, Franklin Templeton BENJI, WisdomTree WTGXX as backing. First unveiled March 2025 in SEC regulatory filing. Context: Tokenized US Treasuries market has tripled in one year to $7.5B. BlackRock/Securitize BUIDL leads at $2.4B, followed by Franklin Templeton and WisdomTree. These tokens increasingly used as infrastructure for yield-earning strategies and collateral in crypto economy.',
      significance: 'Another major asset manager ($4.5T+ AUM) launching tokenized fund on Ethereum. Ondo as anchor investor demonstrates crypto-native demand for institutional products. Part of $7.5B tokenized Treasuries market that tripled in one year. Fidelity joins BlackRock, Franklin Templeton, WisdomTree in Ethereum tokenization.',
      bmnrImplication: 'Fidelity tokenized fund on Ethereum adds to institutional validation. More tokenized Treasuries = more on-chain collateral = more DeFi composability. Ondo integration bridges TradFi products to crypto-native yield strategies. Growing tokenized Treasury market validates BMNR\'s Ethereum infrastructure thesis.',
      impact: 'Bullish',
      source: 'CoinDesk / Etherscan'
    },
    {
      date: '2025-09-09',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Acquires Sensible Team to Accelerate DeFi-Powered Consumer Onchain Roadmap',
      summary: 'Coinbase acquires founders of Sensible to lead key teams shaping onchain consumer strategy. Team brings expertise in building DeFi-powered consumer applications. Part of Coinbase\'s vision to make itself an "everything exchange" — gateway to onchain economy. Current DeFi features: crypto-backed loans via non-custodial smart wallets, staking for network security + rewards, USDC holdings rewards, Coinbase One Card with bitcoin back. Goal: simplify DeFi access so anyone can borrow, stake, and earn without being an expert. Coinbase evolving from exchange to "full-fledged financial platform" on crypto rails.',
      significance: 'Coinbase actively acquiring DeFi talent to bridge CeFi-DeFi gap. Strategy to embed DeFi functionality (lending, staking, yield) directly into consumer app signals mainstream DeFi adoption is approaching. "Everything exchange" vision moves Coinbase from trading venue to comprehensive financial platform.',
      bmnrImplication: 'Coinbase embedding DeFi into consumer app makes staking and yield accessible to 110M+ verified users. Simplifying DeFi access accelerates mainstream Ethereum adoption. More users staking, lending, earning on Ethereum = more network activity = ETH value accrual. Coinbase as DeFi gateway could be double-edged: more competition for BMNR but also larger ecosystem.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-09-15', 
      category: 'Enterprise', 
      company: 'American Express',
      title: 'American Express Launches Blockchain "Travel Stamps" on Coinbase Base (Ethereum L2)', 
      summary: 'American Express (NYSE: AXP, $200B+ market cap) launches "Amex Passport" — blockchain-based digital travel stamps commemorating cardholder journeys. Stamps are ERC-721 tokens minted on Coinbase\'s Base network (Ethereum L2) each time a traveler uses their card internationally. VP Colin Marlowe (Amex Digital Labs): "It\'s a valueless ERC-721, so technically an NFT, but we just didn\'t brand it as such. We wanted to speak to it in a way that was natural for the travel experience." Fireblocks provides Wallet-as-a-Service infrastructure. Stamps are non-tradable, stored on public blockchain, customizable with trip highlights, and shareable on social media. 73% of surveyed travelers want digital trip commemoration; 56% miss receiving passport stamps. Part of broader Amex Travel App launch with AI-powered planning tools and Centurion Lounge digital waitlist. Stamps "could create interesting partnership angles over time" per Marlowe, suggesting future utility potential.',
      significance: 'Major payment network ($200B+ market cap) deploying consumer-facing product on Ethereum L2 (Base). First mass-market NFT utility play from a legacy financial institution — deliberately avoiding "NFT" branding while using the technology. Fireblocks infrastructure validates institutional-grade wallet solutions. Demonstrates blockchain adoption for non-financial use cases (identity, loyalty, experiences).',
      bmnrImplication: 'American Express choosing Ethereum L2 for consumer product validates network for mainstream applications beyond finance. Base (Coinbase L2) anchors to Ethereum security. More consumer touchpoints on Ethereum ecosystem = more network familiarity = more adoption. Credit card giants building on Ethereum (Visa, Mastercard, now Amex) creates infrastructure moat.',
      impact: 'Bullish', 
      source: 'American Express / CoinDesk' 
    },
    { 
      date: '2025-08-01', 
      category: 'Regulatory', 
      company: 'Other',
      title: 'GENIUS Act Signed Into Law - US Stablecoin Regulatory Framework Established', 
      summary: 'The GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins) is signed into law, creating the first comprehensive US regulatory framework for stablecoins. The legislation establishes clear compliance pathways for stablecoin issuers, enables banks and financial institutions to issue regulated stablecoins, and provides consumer protections while preserving innovation. Per Visa research, the law has triggered financial institutions "both domestically and globally" to deepen exploration of stablecoin products and technologies. Supporting this regulatory clarity: onchain stablecoin lending has reached $670B cumulative volume over 5 years, with $51.7B monthly volume (Aug 2025), $14.8B in active loans, 81K unique monthly borrowers, and 6.7% average borrow APR. Ethereum + Polygon comprise 85% of onchain lending volume; USDC + USDT represent 98%+ of stablecoin supply.',
      significance: 'Watershed regulatory moment that legitimizes stablecoins as financial infrastructure. Removes legal uncertainty that prevented traditional institutions from fully engaging with blockchain-based payment rails. Creates framework for bank-issued stablecoins to compete with/complement existing offerings (USDC, USDT). McKinsey projects tokenized assets could reach $1-4T by 2030; regulatory clarity accelerates this trajectory.',
      bmnrImplication: 'Critical catalyst for BMNR thesis. Regulatory clarity enables institutional adoption of stablecoin infrastructure built on Ethereum. More stablecoin activity = more network fees = more ETH value accrual. Banks building on Ethereum validates BMNR\'s position that ETH is becoming institutional-grade financial infrastructure. The $670B onchain lending market demonstrates real economic utility beyond speculation.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
    // === SEPTEMBER 2025 ===
    {
      date: '2025-09-29',
      category: 'Enterprise',
      company: 'Swift',
      title: 'Swift Announces Blockchain-Based Shared Ledger with Consensys and 30+ Global Banks',
      summary: 'Swift announces it will add a blockchain-based shared ledger to its technology infrastructure, enabling instant, 24/7 cross-border transactions at unprecedented scale. Working with 30+ financial institutions globally to design and build the ledger, with Consensys creating the conceptual prototype. Coalition banks include: JP Morgan Chase, Bank of America, Citi, HSBC, Deutsche Bank, BNP Paribas, BNY, Wells Fargo, Standard Chartered, Societe Generale-FORGE, UOB, DBS Bank, MUFG, ANZ, Westpac, NatWest, Royal Bank of Canada, TD Bank Group, Banco Santander, BBVA, Crédit Agricole, Commerzbank, Emirates NBD, First Abu Dhabi Bank, Mizuho, Shinhan Bank, and others across 16 countries. Ledger will facilitate banks\' trusted movement of regulated tokenised value across digital ecosystems, recording/validating transactions and enforcing rules through smart contracts. CEO Javier Pérez-Tasso: "We provide powerful and effective rails today and are moving at a rapid pace with our community to create the infrastructure stack of the future."',
      significance: 'WATERSHED MOMENT for global financial infrastructure. Swift (11,500+ institutions in 200+ countries) choosing Consensys (Ethereum-native company behind MetaMask, Infura, Linea) to build blockchain prototype signals Ethereum ecosystem positioning. 30+ of world\'s largest banks actively collaborating on design. Real-time 24/7 cross-border payments at global scale.',
      bmnrImplication: 'Swift partnering with Consensys (Ethereum infrastructure leader) positions Ethereum technology at core of global payment messaging upgrade. Coalition includes virtually every major global bank. Swift\'s blockchain ledger built on Ethereum technology = massive validation for ETH ecosystem. Global correspondent banking infrastructure ($150T+ annually) moving toward blockchain rails.',
      impact: 'Bullish',
      source: 'Swift Press Release / Sibos 2025'
    },
    {
      date: '2025-09-23',
      category: 'Enterprise',
      company: 'Coinbase',
      title: 'Coinbase and Cloudflare Launch x402 Foundation — Universal Standard for AI-Driven Stablecoin Payments',
      summary: 'Coinbase and Cloudflare announce intent to launch x402 Foundation to establish x402 as the universal standard for AI-driven payments. x402 leverages HTTP "402 Payment Required" status code to embed stablecoin payments directly into web interactions, enabling AI agents, APIs, and apps to transact value seamlessly. Use cases: pay-per-use AI/research, on-demand data/signals, creator micropayments, storage/media, agent-to-agent payments compatible with MCP-style workflows. Foundation focuses on governance (neutral open standard), ecosystem growth (developer grants/tools), and interoperability across platforms/geographies. Cloudflare adding deferred payments to their pay-per-crawl beta. Plans to add members from AI companies (LLMs), e-commerce platforms, consumer/enterprise companies.',
      significance: 'MAJOR: Coinbase + Cloudflare (internet infrastructure giant) creating open standard for machine-to-machine payments via stablecoins. x402 could become backbone of agentic commerce — AI agents autonomously paying for services, data, compute. Replaces subscription/intermediary models with real-time stablecoin micropayments. Opens entirely new category of on-chain economic activity.',
      bmnrImplication: 'x402 standard positions stablecoins (primarily Ethereum-native USDC) as settlement layer for AI agent economy. Machine-to-machine micropayments could generate massive on-chain transaction volume. Cloudflare backing ensures internet-scale infrastructure. More stablecoin transactions = more Ethereum ecosystem value. Agentic commerce is potentially the largest new use case for crypto.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-09-24',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Lists First AUD and SGD Stablecoins (AUDD, XSGD) — Local Currency Stablecoins Go Global',
      summary: 'Coinbase lists AUDD (Australian Digital Dollar, by AUDC Pty Ltd) and XSGD (by StraitsX, MAS-compliant) — first AUD and SGD denominated stablecoins on the platform. Available globally from Oct 1. Users in Australia and Singapore can convert from fiat to stablecoin for free. Stablecoin market cap surpassed $250B as of June 2025 (50% YoY), settled $30T+ in 2024. 70%+ of crypto owners in Singapore and Australia interested in local currency stablecoins (Ipsos survey). Currently 99% of onchain digital money is USD-denominated vs 60% of global currency reserves — local currency stablecoins represent massive growth opportunity. XSGD compliant with Singapore MAS Single Currency Stablecoin (SCS) framework. Use cases include AI agentic commerce with stablecoins for autonomous payments.',
      significance: 'Stablecoin ecosystem expanding beyond USD dominance into local currencies. $250B market cap with analyst forecasts of $2T. Local currency stablecoins critical for global adoption — enabling users to transact in native currencies on-chain. 99% USD concentration in onchain money signals massive non-USD opportunity ahead.',
      bmnrImplication: 'Local currency stablecoin expansion drives more global on-chain activity. Stablecoins are primarily Ethereum-native (USDC, USDT, now AUDD/XSGD). Market growing from $250B toward $2T = massive increase in Ethereum network utility. More stablecoin diversity = more DeFi composability = more ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-09-25',
      category: 'Enterprise',
      company: 'Toyota',
      title: 'Toyota Woven City Opens as Living Laboratory for Blockchain-Integrated Mobility',
      summary: 'Toyota Woven City, the 175-acre "living laboratory" at the base of Mount Fuji, officially opens with 360 initial residents. The smart city integrates Toyota\'s Mobility-Oriented Account (MOA) blockchain technology, deploying ERC-4337 Account Abstraction contracts on Ethereum to enable vehicle-centric digital wallets and seamless mobility services. Woven City serves as testbed for autonomous vehicles, robotics, smart infrastructure, and blockchain-based mobility accounts. CEO James Kuffner: "Woven City is where we prove out technologies that will shape the future of mobility and connected living." The city features three types of streets: fast vehicles only, mixed pedestrian/personal mobility, and pedestrian-only promenades.',
      significance: 'World\'s largest automotive manufacturer (Toyota, $300B+ market cap) building physical city infrastructure on Ethereum smart contracts. MOA technology using ERC-4337 demonstrates enterprise adoption of Ethereum\'s newest account abstraction standard. Real-world deployment at scale validates blockchain for critical mobility infrastructure.',
      bmnrImplication: 'Toyota deploying ERC-4337 on Ethereum mainnet for vehicle accounts validates Ethereum as enterprise infrastructure layer. Automotive industry ($3T+ global market) building on Ethereum expands network utility beyond finance. More enterprise adoption = more Ethereum ecosystem value.',
      impact: 'Bullish',
      source: 'Toyota Woven City / Toyota Blockchain Lab'
    },
    {
      date: '2025-09-25',
      category: 'Enterprise',
      company: 'Centrifuge',
      title: 'Centrifuge Launches First Licensed S&P 500 Index Fund Token (SPXA) on Base',
      summary: 'Centrifuge launches Janus Henderson Anemoy S&P 500 Fund (SPXA), the first tokenized S&P 500 index fund licensed by S&P Dow Jones Indices, exclusively on Base (Coinbase\'s Ethereum L2). Anemoy serves as investment manager with Janus Henderson ($457B AUM) as sub-investment manager. FalconX joins as anchor investor. Wormhole will enable future multichain expansion. Nick Cherney, Janus Henderson Head of Innovation: "Launching SPXA with Centrifuge is a natural progression of our blockchain strategy, bringing the world\'s most important equity index to a new generation of investors." Bhaji Illuminati, Centrifuge CEO: "There\'s no index more important than the S&P 500. Indices are the best way to bring stocks onchain: they\'re simple, collateral-ready, and unlock liquidity in ways individual securities can\'t."',
      significance: 'First tokenized S&P 500 index fund with official S&P DJI licensing brings the world\'s flagship equity benchmark on-chain. Major milestone for tokenized equities moving from individual stocks to index products. Builds on Centrifuge\'s track record in private credit and fixed income tokenization.',
      bmnrImplication: 'S&P 500 index fund on Ethereum L2 (Base) brings flagship equity exposure to blockchain. Janus Henderson ($457B AUM) participation validates Ethereum ecosystem for institutional asset management. More index products on-chain = more network utility = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Centrifuge / Janus Henderson Press Release'
    },
    {
      date: '2025-09-17',
      category: 'Enterprise',
      company: 'Google',
      title: 'Google Launches Agent Payments Protocol (AP2) with Ethereum Foundation and 60+ Partners',
      summary: 'Google announces Agent Payments Protocol (AP2), an open protocol developed with 60+ organizations to securely initiate agent-led payments across platforms. Partners include Mastercard, PayPal, American Express, Coinbase, Ant International, Adyen, MetaMask, Ethereum Foundation, Salesforce, ServiceNow, and more. AP2 extends Agent2Agent (A2A) and Model Context Protocol (MCP), supporting credit/debit cards, stablecoins, and real-time bank transfers. Uses cryptographic "Mandates" for authorization. A2A x402 extension built with Coinbase, Ethereum Foundation, and MetaMask enables crypto payments. Marco De Rossi, MetaMask AI Lead: "Blockchains are the natural payment layer for agents, and Ethereum will be the backbone of this." Erik Reppel, Coinbase: "x402 and AP2 show that agent-to-agent payments aren\'t just an experiment anymore."',
      significance: 'Google building payment infrastructure explicitly supporting Ethereum/stablecoins alongside traditional payments. 60+ partners including major payment networks and crypto companies. AI agents using blockchain for payments creates new category of network utility.',
      bmnrImplication: 'Google + 60 partners building on Ethereum validates network for AI agent commerce infrastructure. MetaMask quote ("Ethereum will be the backbone") signals strong positioning. AI-driven commerce on Ethereum = new source of network utility and transaction volume.',
      impact: 'Bullish',
      source: 'Google Cloud Blog'
    },
    {
      date: '2025-09-16',
      category: 'Enterprise',
      company: 'Openbank',
      title: 'Openbank (Santander) Launches ETH Trading in Germany Under MiCA Regulation',
      summary: 'Openbank, Grupo Santander\'s 100% digital bank, launches cryptocurrency trading service in Germany, enabling customers to buy, sell, and hold Bitcoin, Ether, Litecoin, Polygon, and Cardano alongside other investments. Service operates under MiCA (Markets in Crypto-Assets Regulation) with full investor protection guarantees. Customers can trade without transferring funds to external platforms, backed by Santander Group. Competitive fees: 1.49% on trades (€1 minimum), no custody fees. Spain rollout coming soon. Coty de Monteverde, Head of Crypto at Santander: "By incorporating the main cryptocurrencies into our investment platform, we are responding to the demand of some of our customers."',
      significance: 'Major European bank (Santander subsidiary) offering regulated ETH trading under MiCA framework. Bank-integrated crypto demonstrates institutional confidence in ETH under European regulation. Part of broader investment platform (3,000+ stocks, 3,000 funds, 2,000+ ETFs).',
      bmnrImplication: 'Bank-integrated crypto trading expands retail investor access to ETH in Europe. MiCA compliance validates regulatory path for European ETH adoption. More accessible ETH = broader investor base = supports ETH ecosystem.',
      impact: 'Bullish',
      source: 'Openbank Press Release'
    },
    {
      date: '2025-09-15',
      category: 'L2',
      company: 'Base',
      title: 'Base Exploring Network Token Launch After Years of Ruling It Out',
      summary: 'Coinbase confirms at Basecamp event in Vermont that Base, its Ethereum L2 network, is "exploring a network token" after years of saying it wasn\'t actively considering one. Head of Base Jesse Pollak announced the exploration during a presentation. Base posted: "We\'re in the early phases of exploration, and don\'t have any specifics to share around timing, design, or governance. We\'re committed to bringing the community along with us, and building in the open." Coinbase CEO Brian Armstrong had told Decrypt in late 2023 that the company was "not planning to make any token" for Base. Change attributed to shift in US regulatory environment under Trump administration. Luke Youngblood (Moonwell founder, former Coinbase): "I think everything has shifted with the change in administration. I never thought they would let Jesse launch a token just because there\'s too much regulatory risk." Base is among most used Ethereum L2s with 13M daily transactions, $5B TVL, ranking 6th overall by TVL.',
      significance: 'Major Ethereum L2 potentially adding token economics. Regulatory shift enabling what was previously considered too risky. Base already dominant L2 by transaction volume — token could accelerate ecosystem growth and governance decentralization.',
      bmnrImplication: 'Base token exploration signals regulatory confidence in Ethereum L2 ecosystem. Network token could drive additional activity and value accrual to Ethereum L2 infrastructure. More successful L2s = more settlement to Ethereum L1 = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Decrypt'
    },
    {
      date: '2025-09-03',
      category: 'Enterprise',
      company: 'Ondo Finance',
      title: 'Ondo Global Markets Launches with 100+ Tokenized US Stocks and ETFs on Ethereum',
      summary: 'Ondo Finance launches Ondo Global Markets, platform for tokenized US stocks and ETFs powered by Alpaca\'s Broker API. 100+ assets live with plans to scale to 1,000+ by year-end. Available in qualified Asia-Pacific, African, and Latin American markets. Features: 24/7/365 transferability, peer-to-peer transfers, DeFi usability, fully backed by US stocks/ETFs held by US broker-dealers. Ian De Bode, Ondo CSO: "Global investors have historically faced barriers to accessing the approximately $63 trillion US securities markets due to high fees, limited access, transfer frictions, platform fragmentation, and geographic exclusions." McKinsey projects tokenized market cap reaching ~$2 trillion by 2030. Currently on Ethereum with Solana and BNB Chain coming.',
      significance: 'Major tokenized securities platform launching on Ethereum first. Opens US equity markets to global investors facing previous barriers. 1,000+ assets planned by year-end demonstrates scale ambitions. DeFi composability enables use in lending/trading protocols.',
      bmnrImplication: 'Tokenized US equities on Ethereum expands network utility for global securities access. $63T US securities market addressable through tokenization. More tokenized assets = more on-chain activity = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Business Wire / Ondo Finance'
    },
    {
      date: '2025-09-02',
      category: 'Enterprise',
      company: 'Kraken',
      title: 'Kraken Launches xStocks Tokenized Equities on Ethereum with Backed',
      summary: 'Kraken and Backed expand xStocks tokenized equities to Ethereum mainnet. Backed issues xStocks as ERC-20 tokens with full 1:1 collateralization. Eligible Kraken clients in 140+ countries can deposit/withdraw xStocks directly on Ethereum for self-custody and on-chain activity. Since June launch, xStocks has exceeded $3.5 billion in combined CEX/DEX volume. Multi-chain strategy includes Solana, BNB Chain, and TRON. Arjun Sethi, Kraken co-CEO: "Ethereum is the center of gravity for smart contract innovation, on-chain liquidity and decentralized finance. By launching xStocks on Ethereum, we are making tokenized equities programmable, interoperable and continuously accessible to builders and institutions worldwide."',
      significance: 'Major crypto exchange bringing tokenized traditional equities to Ethereum ecosystem. $3.5B+ volume since June demonstrates market demand. 140+ country availability expands global access to tokenized stocks. DeFi composability enables integration with lending, trading protocols.',
      bmnrImplication: 'Tokenized equities on Ethereum expands network utility for traditional securities. Kraken co-CEO quote validates Ethereum as "center of gravity" for smart contract innovation. More tokenized assets = more DeFi composability = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'Kraken Blog'
    },
    // === AUGUST 2025 ===
    {
      date: '2025-08-05',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Integrates PayPal as Payment Option in Canada — 10M PayPal Accounts, 5M+ Crypto Owners',
      summary: 'Canadian Coinbase users can now use PayPal to buy and sell crypto. Canada has nearly 10M active PayPal accounts and 5M+ crypto owners. PayPal joins existing payment options: Interac e-Transfer, EFT, direct bank deposits, debit cards. Integration supports Coinbase\'s full suite including trading and staking. Coinbase is the first and largest international exchange registered as Restricted Dealer in Canada (since 2023). Part of global goal to onboard one billion people to crypto economy. PayPal SVP John Froese: "combining trusted money management with cutting-edge commerce tools."',
      significance: 'PayPal (400M+ global users) deepening crypto exchange integration in another market. Reduces friction for Canadians to enter crypto via familiar payment method. Coinbase expanding payment on-ramps demonstrates commitment to reducing barriers to crypto adoption globally.',
      bmnrImplication: 'More payment on-ramps = more users entering crypto = more potential ETH demand. PayPal integration makes crypto buying as simple as online shopping. 5M+ Canadian crypto owners is growing market. More frictionless fiat-to-crypto rails benefits entire ecosystem.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-08-24',
      category: 'L2',
      company: 'ADI Foundation',
      title: 'ADI Foundation Launches ADI Chain Testnet - UAE\'s Institutional Ethereum L2',
      summary: 'ADI Foundation, founded by Sirius International Holding (subsidiary of IHC, MENA\'s largest listed holding company at $240B), launches public testnet of ADI Chain, an EVM Layer-2 blockchain designed for institutional use cases including UAE Dirham-backed stablecoin. Uses AI-assisted protocol automation and GPU acceleration for high throughput with low transaction costs. Compliance-native design enables regulated entities to issue stablecoins, operate health systems, manage land registries, and build payment systems. Developed with First Abu Dhabi Bank (FAB), ADQ, and IHC, regulated by Central Bank of UAE. Andrey Lazorenko, ADI Foundation CEO: "ADI Chain will provide enterprise-grade infrastructure and support our mission in bringing 1 billion new users onchain by 2030." Foundation already has 400M+ people in ecosystem reach.',
      significance: 'UAE\'s largest conglomerate backing Ethereum L2 for sovereign digital economy. Compliance-native design addresses government requirements for blockchain adoption. Dirham stablecoin use case demonstrates real-world institutional application.',
      bmnrImplication: 'UAE building regulated financial infrastructure on Ethereum L2 validates network for sovereign digital economies. ADI Chain targeting 1B users across Middle East, Asia, Africa creates massive potential adoption. More institutional L2s = more settlement to Ethereum L1.',
      impact: 'Bullish',
      source: 'ADI Foundation / The National (Abu Dhabi)'
    },
    {
      date: '2025-08-01',
      category: 'Institutional',
      company: 'Mastercard',
      title: 'Mastercard Global Crypto Adoption Index: 58% Consumer Engagement Worldwide', 
      summary: 'Mastercard releases Global Cryptocurrency Adoption Index revealing 58% of global consumers either holding crypto (21%) or crypto-curious (37%). Global average adoption score: 35/100. EEMEA (Eastern Europe, Middle East, Africa) region scores 49/100 — significantly above average, demonstrating high interest in emerging economies. Millennials and Gen Z leading adoption alongside higher-income users. Key finding: consumers increasingly expect crypto integrated into existing payment systems and usable for everyday purchases — perception shifting from "novelty to utility." Mastercard partnering with fintechs, digital wallet providers, and central banks to support secure, regulated, inclusive pathways for innovation. Research conducted in coordination with expanded crypto product suite (Crypto Credential, Multi-Token Network, MetaMask Card).',
      significance: 'Major payment network ($400B+ market cap) quantifying global crypto adoption trajectory. 58% engagement (21% holding + 37% curious) indicates mainstream adoption approaching. Consumer expectation of crypto-payment integration validates Mastercard\'s infrastructure investments. EEMEA outperformance suggests emerging markets leading adoption.',
      bmnrImplication: 'Mastercard research validates mainstream crypto adoption thesis. 21% global crypto ownership = massive existing user base. 37% crypto-curious = substantial growth potential. Consumer demand for payment integration drives infrastructure buildout on Ethereum. More adoption = more ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'Mastercard Research' 
    },
    { 
      date: '2025-08-21', 
      category: 'Enterprise', 
      company: 'DBS',
      title: 'DBS Tokenizes Structured Notes on Public Ethereum - $1B+ H1 2025 Trading Volume', 
      summary: 'DBS, Singapore\'s largest bank ("World\'s Best Bank" - Global Finance/Euromoney, "Safest Bank in Asia" 16 consecutive years), announces tokenization of structured notes on public Ethereum blockchain. First product: crypto-linked participation note paying cash on price rises with limited downside. Distribution via ADDX, DigiFT, HydraX digital exchanges — first time offering tokenized products outside own client base. Tokenized into $1,000 units (vs traditional $100,000 minimum), making notes fungible and easier to trade. DBS clients executed $1B+ trades in H1 2025, with 60% volume growth Q1→Q2. Part of DBS Token Services suite: Treasury Tokens (24/7 liquidity, seconds vs days settlement), Conditional Payments (smart contracts), Programmable Rewards (DBS Paylah! integration), Investment Tokens. Future: equity-linked and credit-linked notes. Context: Singapore family offices exceeded 2,000 in 2024 (up 43% YoY). Li Zhen (Head of FX & Digital Assets): "Asset tokenisation is the next frontier of financial markets infrastructure."',
      significance: 'Major Asian bank ($19B market cap, AA-/Aa1 ratings) moving from permissioned to PUBLIC Ethereum blockchain. $1B+ trading volume demonstrates real institutional demand. Fractional $1K units democratize access to complex instruments. Builds on DBS participation in UBS/SBI cross-border repo (Nov 2023) and MAS Project Guardian.',
      bmnrImplication: 'DBS choosing public Ethereum over permissioned chains validates network for institutional structured products. $1B+ volume proves institutional demand for tokenized instruments. Singapore wealth hub growth (2,000+ family offices) creates demand pipeline. More tokenized products = more on-chain settlement = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'DBS Press Release / CoinDesk' 
    },
    { 
      date: '2025-07-23', 
      category: 'Institutional', 
      company: 'Goldman Sachs',
      title: 'Goldman Sachs & BNY Mellon Tokenize Money Market Fund Records on Blockchain', 
      summary: 'Goldman Sachs and BNY Mellon ($50T+ combined AUM/AUC) partner to tokenize ownership records of select money market funds using Goldman\'s GS DAP blockchain infrastructure. Institutional investors can subscribe to fund shares via BNY\'s LiquidityDirect and Digital Assets platforms, with "mirrored" records created on Goldman\'s blockchain. Initial participants include BlackRock, Fidelity, Federated Hermes, Goldman Sachs Asset Management, and BNY\'s Dreyfus unit. BNY maintains official books under existing regulations; tokens enable programmable collateral use and improved fund share transferability. Separately, Bitwise CIO Matt Hougan reports ETH facing "demand shock" — ETFs and corporate treasuries bought 2.83M ETH (~$10B) since mid-May, 32x more than network minted. Hougan projects another $20B in ETH purchases over next year vs. 800K ETH issuance.',
      significance: 'Wall Street\'s two largest custodians/banks partnering on tokenization infrastructure signals mainstream adoption inflection point. Bringing BlackRock, Fidelity, and major asset managers into tokenized fund infrastructure validates blockchain for traditional finance operations. Goldman research separately projects stablecoin market reaching "trillions" with USDC growing $77B by 2027.',
      bmnrImplication: 'Goldman + BNY tokenization infrastructure demonstrates traditional finance actively building on blockchain rails. The "demand shock" data (32x more ETH bought than minted) validates supply/demand thesis for ETH price appreciation. Corporate treasury adoption (BitMine, SharpLink, Bit Digital mentioned) directly parallels BMNR strategy. More institutional infrastructure = more ETH ecosystem value.',
      impact: 'Bullish',
      source: 'The Block / Bitwise'
    },
    {
      date: '2025-07-16',
      category: 'L2',
      company: 'Base',
      title: 'Base Evolves From Chain to Open Stack - Launches Base App, Base Pay, Flashblocks',
      summary: 'Base announces major evolution from "chain to open stack" at A New Day One event. Three-part stack: Base Chain (Ethereum L2 with new Flashblocks reducing block times from 2 seconds to 200 milliseconds — 10x faster), Base Build (developer tools), and Base App (formerly Coinbase Wallet, now an "everything app" for social, apps, chat, payments, trading). Base App features: open social network powered by Farcaster where creators own content and earn directly, mini apps in feed (Remix, Noice, Decentralized Pictures), millions of coins tradable, USDC rewards up to 4.1% APY. Base Account provides universal identity across apps/chains. Base Pay enables express USDC checkout, now available to Shopify merchants (1% cashback for US customers coming later). Rolling out in beta with waitlist at base.app.',
      significance: 'Major Ethereum L2 expanding from infrastructure to full consumer platform. Flashblocks makes Base 10x faster. Social features (Farcaster integration) and payments (Base Pay) create comprehensive ecosystem. Shopify integration brings millions of merchants to Ethereum L2.',
      bmnrImplication: 'Base evolving into comprehensive platform strengthens Ethereum L2 ecosystem. Consumer-facing features drive mass adoption. Shopify integration brings mainstream commerce to Ethereum. More users + merchants on Ethereum L2 = more ecosystem value.',
      impact: 'Bullish',
      source: 'Base Blog'
    },
    {
      date: '2025-07-15',
      category: 'L2',
      company: 'Ant Digital Technologies',
      title: 'Ant Digital Technologies Launches Jovay Testnet - Institutional L2 for RWA',
      summary: 'Ant Digital Technologies (parent of Alipay, one of world\'s largest fintech companies) launches Jovay testnet, a blockchain specifically built for institutional-grade use cases including RWA tokenization. Features: three-tier pipeline parallel architecture (transaction, block, batch level) for sub-second response times, dual-proof system combining TEE (Trusted Execution Environments) and ZKP (Zero-Knowledge Proofs), modular architecture enabling independent module upgrades. Plans to integrate Ethereum ecosystem resources including decentralized wallets, oracles, fund custody, and security/compliance solutions. Mainnet expected Q4 2025. Jovay statement: "Since its debut in Dubai in April, Jovay has received widespread welcome from global institutions."',
      significance: 'Alipay parent company building institutional L2 with Ethereum ecosystem integration. Addresses core enterprise pain points: performance, security, compliance, scalability. Potential to bring massive Asian institutional capital to Ethereum ecosystem.',
      bmnrImplication: 'Ant Group building on Ethereum ecosystem validates network for Asian institutional finance. Alipay scale + Ethereum infrastructure = massive potential user onboarding. More institutional L2s integrating with Ethereum = more ecosystem value.',
      impact: 'Bullish',
      source: 'PRNewswire / Ant Digital Technologies'
    },
    {
      date: '2025-07-15',
      category: 'Enterprise',
      company: 'Standard Chartered',
      title: 'Standard Chartered Becomes First G-SIB to Offer Deliverable Spot Crypto Trading', 
      summary: 'Standard Chartered launches fully integrated digital assets trading service for institutional clients through UK branch — becoming FIRST Global Systemically Important Bank (G-SIB) to offer deliverable spot cryptoasset trading. Initial offerings: Bitcoin (XBT/USD) and Ether (XET/USD) spot trading; non-deliverable forwards (NDFs) coming soon. FCA-registered cryptoasset service provider. Fully integrated with existing FX platforms; clients can settle to custodian of choice including Standard Chartered custody. Part of growing digital asset suite: Zodia Custody, Zodia Markets, Libeara (tokenization). Group CEO Bill Winters: "Digital assets are a foundational element of the evolution in financial services. They\'re integral to enabling new pathways for innovation, greater inclusion and growth across the industry." Tony Hall (Global Head of Trading): "With growing interest in regulated digital assets solutions, we are well positioned to meet client needs while capturing the opportunities in this space."',
      significance: 'FIRST G-SIB (Global Systemically Important Bank) offering deliverable spot crypto trading. Standard Chartered ($800B+ assets) providing regulated institutional crypto trading through existing FX infrastructure. FCA registration provides regulatory certainty. Part of comprehensive digital asset strategy (custody, trading, tokenization).',
      bmnrImplication: 'G-SIB spot trading validates crypto as institutional asset class. Standard Chartered ETH trading through regulated FX infrastructure reduces friction for institutional adoption. More institutional trading infrastructure = more ETH market liquidity = supports BMNR treasury valuation.',
      impact: 'Bullish', 
      source: 'Standard Chartered Press Release' 
    },
    { 
      date: '2025-07-09', 
      category: 'Enterprise', 
      company: 'HSBC',
      title: 'HSBC Completes e-HKD+ Trials on Ethereum, Arbitrum, Linea, Polygon', 
      summary: 'HSBC ($3.2T assets, Hong Kong\'s largest note-issuing bank) completes HKMA Project e-HKD+ experimental testing on multiple public blockchains: Arbitrum, Ethereum, Linea, and Polygon. Also developed private DLT on Hyperledger Besu — all Ethereum-compatible. Focus areas: DLT for storing/transferring value, privacy via Privacy Enhancing Technology (PET), decentralized identity, payments at scale. Survey of 700+ Hong Kong individuals: 90% acknowledge privacy importance in e-HKD; 65% professional investors familiar with concept; ~33% willing to use for digital asset trading. Recently launched Tokenised Deposit Service — Hong Kong\'s first bank-led blockchain settlement service. CEO Luanne Lim: "As Hong Kong\'s largest note-issuing bank, we will continue our efforts in driving financial innovation." John O\'Neill (Group Head Digital Assets): "Our experimental work on Project e-HKD+ aims to support the HKMA in assessing options for real-world use of digital currencies." HSBC Global Director confirmed private chain is EVM-compatible and ERC-20 standard.',
      significance: 'Major global bank ($3.2T assets) testing on PUBLIC Ethereum ecosystem (Ethereum, Arbitrum, Linea, Polygon). HSBC historically cautious on public chains — this is notable shift. Private chain EVM/ERC-20 compatibility enables future public chain interoperability. Hong Kong\'s first bank-led blockchain settlement service launched.',
      bmnrImplication: 'HSBC testing on public Ethereum L1 and L2s (Arbitrum, Linea, Polygon) validates ecosystem for institutional use. EVM-compatible private chain creates bridge to public networks. More institutional CBDC/deposit experimentation on Ethereum = network validation = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'HSBC Press Release / Ledger Insights'
    },
    {
      date: '2025-06-30',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Integrates PayPal as Payment Method in Australia — 9.5M PayPal Accounts, 5M+ Crypto Owners',
      summary: 'Australian users can now select PayPal as a payment option to buy and sell crypto on Coinbase. PayPal has 9.5 million active accounts in Australia. More than 5 million Australians now own crypto. Previously Coinbase Australia customers could fund via PayID, bank account, debit card payments, and crypto deposits. PayPal integration allows using cards and bank account already linked to PayPal. Enables access to simple and advanced trading, stablecoin rewards, and staking. Simon Banks (MD, PayPal Australia): "Our partnership with Coinbase — a leader in driving crypto adoption in Australia — reflects our shared commitment to innovation and empowering financial choices."',
      significance: 'PayPal (400M+ global users) deepening crypto exchange integration in APAC. Reduces friction for 9.5M Australian PayPal users to enter crypto via familiar payment method. 5M+ Australians already own crypto, demonstrating mature market. Second PayPal-Coinbase integration after Canada (Aug 2025).',
      bmnrImplication: 'More APAC payment on-ramps = more users entering crypto = more potential ETH demand. PayPal integration makes crypto buying as simple as online shopping. Growing Australian crypto market benefits entire ecosystem including ETH staking products.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-06-25',
      category: 'L2',
      company: 'Base',
      title: 'Coinbase Launches Wrapped Cardano (cbADA) and Litecoin (cbLTC) on Base',
      summary: 'Coinbase launches wrapped tokens for Cardano (cbADA) and Litecoin (cbLTC) on Base, its Ethereum L2 network. Each synthetic token is backed 1:1 by underlying assets held in Coinbase custody with proof-of-reserves pages showing on-chain addresses. Initial issuance: 11,364 LTC and 2,963,259 ADA on Base. Follows early June launches of wrapped Dogecoin (cbDOGE) and XRP (cbXRP), completing four-asset bundle previewed on May 13. Coinbase already issues cbBTC (24% of synthetic BTC market) and cbETH (7% of staked ETH). ADA and LTC deposits held in segregated cold storage under same controls as cbETH and cbBTC. Quarterly attestations planned for all Coinbase Wrapped assets. No conversion fees during introductory period. Base is second-largest Ethereum L2 with $12B+ secured (L2Beat).',
      significance: 'Major exchange bringing more non-EVM assets to Ethereum L2 ecosystem. Coinbase Wrapped tokens create ERC-20 gateways to six of ten largest non-stablecoins by market cap. Proof-of-reserves and custody infrastructure provide institutional-grade backing.',
      bmnrImplication: 'More assets available on Base expands Ethereum L2 utility. Cross-chain asset bridging via wrapped tokens increases DeFi composability. Coinbase custody backing provides institutional confidence. More assets on Ethereum ecosystem = more network value.',
      impact: 'Bullish',
      source: 'CryptoSlate'
    },
    {
      date: '2025-06-23',
      category: 'Enterprise',
      company: 'Coinbase',
      title: 'Coinbase State of Crypto Summit 2025: Major USDC Payments Infrastructure Announcements',
      summary: 'Coinbase hosts State of Crypto Summit 2025 announcing major payments infrastructure: Coinbase Business (SMB/startup crypto account for payments and asset management), Coinbase Payments (plug-and-play stablecoin payments stack with API-first USDC integration), Shopify partnership bringing USDC payments on Base to millions of merchants, DEX trading integrated into main Coinbase app (starting with Base assets), and Coinbase One Card (up to 4% bitcoin back, metal card with Genesis Block code). Summit highlights: 81% of crypto-aware SMBs interested in stablecoins, 3x more Fortune 500 executives planning stablecoin use vs 2024, stablecoin supply reached $227B (54% YoY increase). Brian Armstrong: "The mission of Coinbase is to enable economic freedom in the world." Following Deribit acquisition announcement, Coinbase positioning as comprehensive crypto derivatives exchange.',
      significance: 'Major exchange building comprehensive stablecoin payments infrastructure. Shopify integration brings USDC payments to millions of merchants. SMB and Fortune 500 stablecoin interest demonstrates mainstream adoption trajectory. Product suite spans trading, payments, cards, and business accounts.',
      bmnrImplication: 'Coinbase building USDC payments on Base strengthens Ethereum L2 ecosystem. Shopify integration brings mass merchant adoption to Ethereum. More stablecoin infrastructure = more on-chain activity = ETH ecosystem value. 54% YoY stablecoin growth validates network utility thesis.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-06-18',
      category: 'Institutional',
      company: 'Coinbase',
      title: 'Coinbase Derivatives and Nodal Clear Partner in USDC Collateral Integration for US Futures',
      summary: 'Coinbase Derivatives and Nodal Clear partnering to integrate USDC as eligible collateral for US futures trading as part of multi-year renewal agreement. Expected to be the first regulated use case of USDC as collateral, targeting launch in 2026. Coinbase Custody Trust (Qualified Custodian regulated by NYDFS) serves as custodian. Coinbase Derivatives is a CFTC-regulated designated contract market; Nodal Clear is a CFTC-regulated derivatives clearing organization, part of EEX Group (Deutsche Borse). Boris Ilyevsky (CEO, Coinbase Derivatives): "Our commitment to integrate USDC as collateral reflects our dedication to enhance trading capabilities for US market participants." Paul Cusenza (Chairman & CEO, Nodal Clear): "The plans to integrate USDC as collateral represent our continued commitment to seek to be responsive to market needs and innovate."',
      significance: 'First regulated USDC-as-collateral use case in US futures markets. CFTC-regulated exchanges treating USDC as cash-equivalent collateral is a watershed moment for stablecoin institutional acceptance. Deutsche Borse subsidiary involvement signals European institutional bridge.',
      bmnrImplication: 'USDC as futures collateral validates stablecoins in traditional derivatives infrastructure. USDC is primarily Ethereum-native — more institutional stablecoin utility = more on-chain settlement = ETH ecosystem value. CFTC-regulated collateral use case could open door for broader DeFi collateral recognition.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-06-17',
      category: 'Enterprise',
      company: 'Deutsche Bank',
      title: 'Deutsche Bank DAMA 2 - Institutional Tokenization Blueprint on Ethereum L2',
      summary: 'Deutsche Bank, Axelar Network (Interop Labs), and Memento Blockchain publish litepaper for Digital Asset Management Access (DAMA) 2 platform — a next-generation tokenization platform built on public blockchains with regulatory alignment and privacy as core design principles. Key features: Blockchain-as-a-Service model minimizing upfront investment, privacy-enabled Layer 2 using zkSync ZK Chain technology, managed token issuance across multiple blockchains via Axelar, and app store for fund smart contract designs. Platform targets tokenized funds, stablecoins, and RWAs for asset managers, wealth managers, and investment advisors. Innovation Lead Boon-Hiong Chan: "DAMA 2 represents how public chains have evolved for institutional finance\'s use." MVP launch targeted H2 2025. Context: $84T in global wealth shifting to digital-native generations by 2045 (Cerulli Associates).',
      significance: 'Major European bank ($1.4T assets) publishing blueprint for institutional tokenization on Ethereum L2. Privacy-preserving ZK technology addresses compliance concerns. Blockchain-as-a-Service model lowers barrier for traditional asset managers. Project won Global Custodian 2025 Innovation in Smart Contract Technology award.',
      bmnrImplication: 'Deutsche Bank building tokenization infrastructure on Ethereum ecosystem validates network for European institutional finance. Privacy-enabled L2 addresses regulatory requirements that blocked enterprise adoption. More institutional activity on Ethereum L2s = more settlement to Ethereum L1.',
      impact: 'Bullish',
      source: 'Deutsche Bank / Axelar / Memento Press Release'
    },
    {
      date: '2025-06-12',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase and Shopify Bring USDC Payments on Base to Millions of Merchants Worldwide',
      summary: 'Coinbase partners with Shopify to enable USDC payments on Base through Shopify Payments. Rolling out with early access merchants immediately, expanding to all Shopify Payments stores globally later in 2025. Shopify powers millions of merchants globally including BarkBox, SKIMS, and Vuori. In the US, Shopify plans to provide 1% cash back to customers paying with USDC at no cost to the merchant. No foreign exchange fees on cross-border transactions. Merchants get cashed out in local currency with zero fees by default, or can choose to receive USDC on Base. Powered by a new smart contract and commerce payments protocol developed jointly — deployed onchain, permissionless, and open source. No additional merchant setup required — automatically available. Protocol supports delayed capture, tax finalization, and refunds.',
      significance: 'Massive merchant adoption milestone — Shopify powers millions of merchants globally, all getting automatic USDC payment support on Base. Open source commerce protocol creates permissionless payment infrastructure. 1% customer cash back incentivizes USDC usage. Zero cross-border FX fees is compelling for international commerce.',
      bmnrImplication: 'Shopify USDC payments on Base directly drive Ethereum L2 transaction volume. Millions of merchants with automatic crypto payment support = massive on-chain commerce potential. Open source protocol enables broader adoption beyond Shopify. More USDC commerce on Base = more Ethereum ecosystem value.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-04-28',
      category: 'Ecosystem',
      company: 'Coinbase',
      title: 'Coinbase, Fabric Ventures, Animoca Brands, and Founders Factory Launch UK Web3 Accelerator',
      summary: 'Coinbase, Fabric Ventures, Animoca Brands, and Founders Factory launch multi-million pound accelerator in the UK to transform the UK\'s blockchain and AI ecosystem. Founders Factory delivers world-class business and growth training with hands-on support across strategy, go-to-market, product development, and fundraising. Coinbase, Fabric Ventures, and Animoca Brands provide support on tokenomics, community go-to-market strategies, and best practices for scaling blockchain and AI businesses. Each founder in first cohort receives up to £250k in funding. City Minister Emma Reynolds: "This will ensure that the UK remains a global leading hub for blockchain technology." Business Secretary Jonathan Reynolds: "This announcement is a strong vote of confidence in the UK\'s tech sector." Robby Yung (CEO of Investments, Animoca Brands): "It is critical that the UK takes advantage of the opportunity of the fast-growing Web3 industry."',
      significance: 'UK government-endorsed accelerator combining major crypto companies (Coinbase, Animoca) with VC (Fabric) and startup infrastructure (Founders Factory). Government ministers publicly endorsing blockchain as growth engine signals strong regulatory support. £250k per founder + specialized Web3 support creates pipeline of UK blockchain startups.',
      bmnrImplication: 'UK accelerator focused on blockchain/AI creates pipeline of Ethereum ecosystem builders. Government endorsement signals regulatory tailwinds for crypto in UK. More startups building on blockchain = more on-chain activity = ETH ecosystem growth.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-04-03',
      category: 'Institutional',
      company: 'WisdomTree',
      title: 'WisdomTree Connect Now Offers 13 Tokenized Funds Across Ethereum, Arbitrum, Avalanche, Base and Optimism',
      summary: 'WisdomTree announces significant enhancements to WisdomTree Connect, its institutional platform for tokenized real world assets (RWA). Platform now offers 13 SEC-registered tokenized funds under the Investment Company Act of 1940 — the largest collection of tokenized funds in the market, including money market, equities, fixed income and asset allocation funds. Funds available: WTGXX (Government Money Market), SPXUX (S&P 500), TECHX (Technology & Innovation 100), TWLGX (Long Term Treasury), WTSTX (7-10 Year Treasury), WTTSX (3-7 Year Treasury), TIPSX (TIPS), FLTTX (Floating Rate Treasury), WTSIX (Short-Duration Income), WTSYX (Short-Term Treasury), EQTYX (Siegel Global Equity), LNGVX (Siegel Longevity), MODRX (Siegel Moderate). Platform expands beyond Ethereum to Arbitrum, Avalanche, Base, and Optimism\'s OP Mainnet. Users can hold tokenized funds directly on these chains via fiat (USD) or USDC through WisdomTree\'s stablecoin conversion service. Maredith Hannon, Head of Business Development, Digital Assets: "These product suite and blockchain coverage expansions underscore our dedication to providing diverse and innovative solutions to meet the evolving needs of our clients. With access to our comprehensive suite of tokenized funds and the ability to interact with them directly across these newly supported blockchains, our tokens are able to be held in third-party and self-custodial wallets, providing users with greater choice in how they access tokenized RWA." WisdomTree has ~$116.2B in AUM globally.',
      significance: 'Largest suite of SEC-registered tokenized funds (13 total) now available across Ethereum and major L2s. Multi-chain deployment (Ethereum, Arbitrum, Avalanche, Base, Optimism) demonstrates institutional commitment to Ethereum ecosystem. Full product spectrum: money market, equities, fixed income, asset allocation — covering all major institutional fund categories.',
      bmnrImplication: 'WisdomTree expanding to 13 tokenized funds across 5 Ethereum ecosystem chains validates network for comprehensive institutional fund distribution. Multi-asset tokenization (equities, fixed income, money market) on Ethereum proves network can handle diverse institutional use cases. More tokenized fund AUM on Ethereum = more on-chain value = ETH ecosystem growth.',
      impact: 'Bullish',
      source: 'Business Wire'
    },
    {
      date: '2025-04-03',
      category: 'Enterprise',
      company: 'EY',
      title: 'EY Upgrades Nightfall_4 - Zero-Knowledge Roll-Up for Private Ethereum Transactions',
      summary: 'EY (Big Four accounting firm) releases Nightfall_4, major update to its open-source zero-knowledge roll-up enabling private transactions on public Ethereum. Key upgrade: replaces optimistic roll-up with ZK version for near-instant finality without challenge periods. Enterprises can orchestrate private transactions on Ethereum mainnet without compromising transparency, data immutability, and security. Simplified architecture eliminates need to accommodate incorrect block challenges or provide liquidity services. Uses x509 enterprise identity certificates for access. Source code in public domain on GitHub. EY has contributed Nightfall to public domain since 2019 — this is the fourth major update. EY OpsChain and blockchain services delivered through Blockchain.ey.com platform. Paul Brody, EY Global Blockchain Leader: "This update provides the same privacy and scaling that version 3 enabled, but now with near-instant finality and a simplified architecture. We believe we will see accelerating adoption in the coming year by enterprise users."',
      significance: 'Big Four professional services firm providing open-source privacy infrastructure for enterprise Ethereum. ZK roll-up technology enables private business transactions on public blockchain. Public domain release demonstrates commitment to Ethereum ecosystem development.',
      bmnrImplication: 'EY building privacy infrastructure on Ethereum validates network for enterprise confidential transactions. Big Four firm commitment signals institutional acceptance. More enterprise privacy tools = more enterprise adoption = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'EY Press Release'
    },
    {
      date: '2025-03-26',
      category: 'Institutional',
      company: 'Interactive Brokers',
      title: 'Interactive Brokers Expands Crypto Trading with SOL, ADA, XRP, DOGE', 
      summary: 'Interactive Brokers (Nasdaq: IBKR), automated global electronic broker, expands cryptocurrency offerings with Solana (SOL), Cardano (ADA), Ripple (XRP), and Dogecoin (DOGE). These join existing BTC, ETH, LTC, and BCH. Trading via Zero Hash LLC (FinCEN-registered MSB, NY DFS licensed) and Paxos Trust Company. Platform enables crypto trading alongside stocks, options, futures, currencies, and bonds across 160+ global markets. Features include: 24/7 trading, USD/crypto account balances, non-marketable limit orders, and external wallet withdrawals. Commissions: 0.12-0.18% of trade value, $1.75 minimum, no spreads/markups/custody fees. EVP Steve Sanders: "Adding these new tokens gives our clients even more flexibility to diversify their portfolios."',
      significance: 'Major institutional broker expanding crypto offerings on unified multi-asset platform. Positions crypto as standard asset class alongside traditional securities. Financial advisers can now allocate client assets across full crypto spectrum. Low-cost structure ($1.75 minimum) enables retail participation.',
      bmnrImplication: 'Interactive Brokers expanding crypto access for institutional clients and advisers broadens the investor base. ETH included alongside major tokens validates its position as core digital asset. More accessible crypto = more potential ETH investors.',
      impact: 'Bullish', 
      source: 'Interactive Brokers Press Release'
    },
    {
      date: '2025-03-11',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Secures FIU Registration in India — Retail Services Launching Later in 2025',
      summary: 'Coinbase registers with India\'s Financial Intelligence Unit (FIU), enabling crypto trading services in the country. Plans to launch initial retail services later in 2025, followed by additional investment and products. India\'s share of global onchain developers increased from 3% in 2018 to 12% in 2023 — highest concentration of onchain talent among emerging markets. John O\'Loghlen (Regional MD APAC): "India represents one of the most exciting market opportunities in the world today." Paul Grewal (CLO) appointed to Board of U.S.-India Business Council (USIBC). Coinbase believes crypto can create incentives for India\'s brightest to build world-leading products from India, for the world.',
      significance: 'Coinbase entering India — world\'s largest population and fastest-growing tech ecosystem. India\'s onchain developer community (12% global share) creates massive potential for Ethereum ecosystem building. FIU registration signals regulatory compliance pathway in historically cautious market.',
      bmnrImplication: 'India\'s developer talent pipeline (3% → 12% global onchain devs) directly benefits Ethereum ecosystem through more builders. Coinbase India launch = more on-ramps for world\'s most populous country. Developer ecosystem growth in India strengthens overall blockchain infrastructure.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-02-03',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Obtains VASP Registration in the United Kingdom — Largest Registered Digital Assets Player in UK',
      summary: 'Coinbase obtains VASP registration in the UK issued by the Financial Conduct Authority (FCA). Makes Coinbase the largest registered digital assets player in the UK, its largest international market. Allows Coinbase to offer both crypto and fiat services in the UK. UK Government and FCA developing regulation for crypto sector. Daniel Seifert (VP & Regional MD EMEA) and Keith Grose lead UK operations. Coinbase committed to onboarding next 1 billion people into crypto while prioritising security and compliance. Registration enables expanded retail, institutional, and ecosystem products.',
      significance: 'FCA VASP registration makes Coinbase largest registered crypto player in UK — major fintech market. Regulatory milestone in Coinbase\'s largest international market enables full product expansion. UK government actively developing crypto regulation signals pro-innovation stance.',
      bmnrImplication: 'Coinbase as largest UK VASP expands regulated crypto access in major financial center. UK crypto regulation development creates clearer framework for institutional adoption. More regulated on-ramps in London financial hub = more institutional crypto flows including ETH.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-01-28',
      category: 'Product',
      company: 'Coinbase',
      title: 'Coinbase Gains VASP Approval to Launch in Argentina — 5 Million Daily Crypto Users',
      summary: 'Coinbase secures Virtual Asset Service Provider (VASP) registration from Argentina\'s National Securities Commission (CNV). 5 million Argentinians currently use crypto daily. 87% believe crypto and blockchain can help achieve greater financial independence. 76% see crypto as solution to financial frustrations (inflation, high transaction costs). 79% open to receiving salaries in cryptocurrency. Matías Alberti (ex-Buenbit, Clara) leads Argentina operations. Coinbase rolling out localized services in Spanish with local payment methods and customer support. Fabio Plein (Director for the Americas): "For many Argentinians, crypto isn\'t just an investment, it\'s a necessity for regaining control over their financial futures."',
      significance: 'Argentina is one of world\'s most dynamic crypto markets — 5M daily users, 87% see crypto as path to financial independence. Inflation-driven adoption creates strong product-market fit for crypto. Localized operations signal serious market commitment, not just licensing.',
      bmnrImplication: 'Argentina\'s inflation-driven crypto adoption (5M daily users) demonstrates real-world cryptocurrency utility. More regulated exchanges in Latin America = more fiat-to-crypto on-ramps = broader crypto ecosystem growth.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2025-01-01',
      category: 'Enterprise',
      company: 'JPMorgan',
      title: 'JPMorgan & MIT DCI Publish Payment Token Design Standards for EVM Blockchains', 
      summary: 'MIT Digital Currency Initiative and Kinexys by J.P. Morgan publish comprehensive research on payment token design for EVM-based blockchains. Focus: additional capabilities required for regulatory compliance. Design guidelines (8 principles): (1) Minimize on-chain data storage, (2) Avoid storing PII on-chain (harvest-now-decrypt-later risk), (3) Complete payment transfers within single blockchain transaction, (4) Segregate roles for privileged admin functions, (5) Ensure observability of privileged functions, (6) Initiate transactions from system where funds held, (7) Fail safely and obviously, (8) Make participation easy for users. Key functionalities mapped to ERC standards: ERC-20 (ledger/transfers), ERC-4337 (account abstraction/key recovery), ERC-1400/ERC-3643 (permissioned transfers), ERC-2535 (Diamond upgrades), OpenZeppelin Pausable (admin controls). Two new standards proposed: (1) Payment authorization following payment controls, (2) Administrative controls for remediation/recovery (suspension, seizure, global pause). Kinexys update: daily transaction values now exceeding $2 billion (up from $1B). Stablecoin market context: $235B market cap vs ~$18T US bank deposits. Key insight: "composable standards" approach — narrow, modular standards vs broad all-encompassing standards. Source code to be published under open-source license.',
      significance: 'First comprehensive design framework for regulated payment tokens on EVM. Maps existing ERC standards to bank compliance requirements. Proposes new EIPs for payment authorization + administrative controls. JPMorgan Kinexys now processing $2B+ daily — doubling from $1B. Addresses gap between crypto-native standards and institutional requirements.',
      bmnrImplication: 'JPMorgan publishing EVM payment token standards accelerates institutional adoption of Ethereum ecosystem. $2B+ daily Kinexys volume proves production scale. Open-source code enables other institutions to build compliant payment tokens on EVM. More institutional EVM standards = more Ethereum ecosystem value.',
      impact: 'Bullish', 
      source: 'JPMorgan / MIT DCI Research Paper' 
    },
    // === 2024 HISTORICAL ENTRIES ===
    { 
      date: '2024-11-18', 
      category: 'Enterprise', 
      company: 'Goldman Sachs',
      title: 'Goldman Sachs to Spin Out GS DAP as Industry-Owned Tokenization Platform', 
      summary: 'Goldman Sachs announces intent to explore spinning out GS DAP® technology platform from its Digital Assets business to become industry-owned distributed technology solution (subject to regulatory approvals). GS DAP® leverages Digital Asset technology for sophisticated digital capital markets needs. Tradeweb announced as first strategic partner — bringing trading and liquidity capabilities across fixed income spectrum for new commercial use cases. Vision: distributed ecosystem allowing participants to interoperate seamlessly, efficiently, and at scale. Establishing standalone company independent of Goldman Sachs provides fit-for-purpose long-term solution for digital financial services. Mathew McDermott (Global Head Digital Assets): "We view permissioned distributed technologies as the next structural change to financial markets... Delivering a distributed technology solution to a wide cross-section of financial market participants has the potential to redefine market connectivity, infrastructure composability." Tradeweb CPO Chris Bruner: "Our goal is to create and utilize a solution that ushers in a new wave of access, liquidity, and interoperability for the digital financial markets."',
      significance: 'Goldman Sachs ($150B+ market cap) spinning out tokenization infrastructure for industry-wide adoption. Tradeweb partnership brings major fixed income liquidity provider. Shows Goldman commitment to blockchain capital markets infrastructure beyond proprietary use. Industry-owned model could accelerate institutional adoption.',
      bmnrImplication: 'Goldman Sachs tokenization infrastructure becoming industry-wide platform validates blockchain for institutional capital markets. Tradeweb liquidity integration improves tokenized asset tradability. More institutional infrastructure = more blockchain settlement = ETH ecosystem value (GS DAP interoperates with Ethereum ecosystem).',
      impact: 'Bullish', 
      source: 'Goldman Sachs Press Release' 
    },
    { 
      date: '2024-11-01', 
      category: 'Institutional', 
      company: 'UBS',
      title: 'UBS Asset Management Launches uMINT - Tokenized Money Market Fund on Ethereum', 
      summary: 'UBS Asset Management launches "UBS USD Money Market Investment Fund Token" (uMINT), a money market investment built on Ethereum distributed ledger technology. Provides institutional-grade cash management solutions underpinned by high-quality money market instruments based on conservative, risk-managed framework. Available through authorized distribution partners. Part of UBS\'s global distributed ledger technology strategy focused on leveraging public and private blockchains for enhanced fund issuance and distribution. Builds on October 2023 tokenized VCC fund pilot under MAS Project Guardian. UBS Co-Head of APAC Thomas Kaegi: "We have seen growing investor appetite for tokenized financial assets across asset classes. Through leveraging our global capabilities and collaborating with peers and regulators, we can now provide clients with an innovative solution." UBS manages $5.7T invested assets.',
      significance: 'Major global wealth manager ($5.7T AUM) launching production tokenized fund on Ethereum. Progression from 2023 pilot to 2024 production demonstrates institutional commitment. Institutional-grade money market fund on public blockchain sets precedent for larger fund tokenization.',
      bmnrImplication: 'UBS production tokenized fund validates Ethereum for institutional asset management. More tokenized funds = more on-chain settlement = ETH ecosystem value. UBS\'s multi-year commitment (2017 consortium → 2023 pilots → 2024 production) demonstrates long-term institutional thesis.',
      impact: 'Bullish', 
      source: 'UBS Asset Management Press Release'
    },
    {
      date: '2024-10-02',
      category: 'Enterprise',
      company: 'Automobili Lamborghini',
      title: 'Lamborghini and Animoca Brands Launch Fast ForWorld - Interoperable Blockchain Gaming Platform',
      summary: 'Automobili Lamborghini and Animoca Brands announce collaboration to shape the future of immersive brand engagement in the automotive industry. Partnership creates Automobili Lamborghini\'s upcoming immersive platform, Fast ForWorld, where fans, gamers and owners can experiment, play, interact, and collect digital collectibles while being rewarded for engagement. First interoperable blockchain-based implementation of Lamborghini iconic vehicles in gaming. Working with Animoca\'s subsidiary Motorverse to deliver first-of-its-kind gaming experience with interoperable digital car collectibles. Players can buy, sell, own, and drive Lamborghini super sports cars across multiple gaming platforms including Torque Drift 2, REVV Racing, and Motorverse Hub. Platform designed, developed and deployed by Gravitaslabs. First version launching November 7th features 3D wallet for storing digital items and interoperable features. Entry requires securing first-ever digital Lamborghini Revuelto, bundled with Genesis Capsule unlocking exclusive benefits.',
      significance: 'Iconic luxury automotive brand ($2.3B revenue) entering blockchain gaming through partnership with Animoca Brands (major Web3 gaming company). First interoperable digital vehicles from a major automaker. Demonstrates blockchain use case for brand engagement and digital collectibles beyond finance. Gaming/collectibles sector bridges mainstream consumers to blockchain.',
      bmnrImplication: 'Lamborghini blockchain gaming validates Ethereum ecosystem for luxury brand digital engagement. Animoca Brands (built on Ethereum) brings major automotive partner. Interoperable digital assets expand blockchain utility beyond finance. More mainstream brand adoption = broader Ethereum ecosystem recognition.',
      impact: 'Bullish',
      source: 'Automobili Lamborghini Press Release'
    },
    {
      date: '2024-10-03',
      category: 'Enterprise',
      company: 'Visa',
      title: 'Visa Launches VTAP - Tokenized Asset Platform on Ethereum', 
      summary: 'Visa introduces the Visa Tokenized Asset Platform (VTAP), a B2B solution enabling banks to mint, burn, and transfer fiat-backed tokens on blockchain networks. VTAP provides API-based integration for participating financial institutions to issue tokenized deposits and stablecoins. Platform supports programmability via smart contracts for automated workflows and real-world asset transactions. BBVA (Spain\'s second-largest bank) announced as first partner, testing VTAP sandbox throughout 2024 with plans to launch BBVA Euro stablecoin pilot in 2025 on public Ethereum mainnet.',
      significance: 'Visa ($500B+ market cap) providing infrastructure for banks to issue their own stablecoins on Ethereum. Could unlock wave of bank-issued tokens competing with/complementing USDC/USDT. Visa choosing Ethereum as primary network validates its institutional positioning.',
      bmnrImplication: 'Bank stablecoins on Ethereum expand the network\'s role in traditional finance. More tokenized value = more network activity = more ETH demand. Visa\'s infrastructure investment signals long-term commitment to Ethereum ecosystem.',
      impact: 'Bullish', 
      source: 'Visa Press Release' 
    },
    { 
      date: '2024-09-26', 
      category: 'Enterprise', 
      company: 'Guggenheim',
      title: 'Guggenheim Issues First Ethereum-Based Digital Commercial Paper', 
      summary: 'Guggenheim Treasury Securities (GTS), indirect wholly owned subsidiary of Guggenheim Capital LLC, issues first ethereum-based Digital Commercial Paper (DCP) through Zeconomy\'s AmpFi.Digital platform. DCP received highest credit rating from Moody\'s of P-1 with $20M issued at launch. GTS is one of the largest and most experienced independent asset-backed commercial paper platform managers — 27-year operating history with $10.3T+ ABCP issued and redeemed with zero investor losses. Tokenized Government Securities recently surpassed $2B market cap. Zeconomy CEO Giacinto Cosenza: "With tens of billions of dollars locked in DeFi and corporate treasuries, we are thrilled to partner with GTS to address a clear need for more trusted and secure blockchain solutions."',
      significance: 'FIRST ethereum-based commercial paper with highest Moody\'s rating (P-1). GTS\'s track record ($10.3T+ issued, zero losses) brings institutional credibility to tokenized debt markets. Addresses DeFi challenges of poor credit quality and compliance issues. Opens path for institutional-grade short-term debt on Ethereum.',
      bmnrImplication: 'High-quality tokenized debt instruments on Ethereum expand network utility for institutional treasury operations. P-1 rated commercial paper attracts conservative institutional capital. More tokenized debt = more on-chain settlement = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'Zeconomy / Guggenheim Press Release' 
    },
    { 
      date: '2024-09-19', 
      category: 'Enterprise', 
      company: 'HSBC',
      title: 'HSBC Pilots Quantum-Safe Technology for Tokenized Gold with ERC-20 Conversion', 
      summary: 'HSBC ($3.2T assets) successfully trials first application of quantum-secure technology for buying and selling tokenized physical gold. HSBC was first global bank to offer tokenized physical gold to institutional investors (2023), followed by HSBC Gold Token for retail investors in Hong Kong (2024, fractional ownership). Built on HSBC Orion digital assets platform. Tested interoperability using post-quantum cryptography (PQC) to move digital assets safely across distributed ledgers. Key capability: can convert HSBC gold tokens to ERC-20 fungible tokens for enhanced distribution and interoperability with other DLTs and digital wallets. Partner: Quantinuum (world\'s largest integrated quantum computing company). Protects against "store now, decrypt-later" (SNDL) cyber attacks using PQC algorithms and quantum randomness technology. Philip Intallura (Global Head Quantum Technologies): "HSBC was the first international bank to offer tokenised physical gold and is now building on that innovation with cutting-edge cybersecurity protection for the future."',
      significance: 'FIRST global bank tokenized gold (2023) now adding quantum-secure protection. ERC-20 conversion capability enables Ethereum ecosystem interoperability. Demonstrates institutional commitment to both blockchain tokenization AND next-generation security. Quantinuum partnership brings quantum computing expertise to financial services.',
      bmnrImplication: 'HSBC gold tokens convertible to ERC-20 creates direct bridge to Ethereum ecosystem. Tokenized gold interoperability expands Ethereum utility for real-world assets. Quantum-safe security addresses future institutional concerns. More tokenized RWAs on Ethereum = network value.',
      impact: 'Bullish',
      source: 'HSBC Press Release'
    },
    {
      date: '2024-09-12',
      category: 'L2',
      company: 'Coinbase',
      title: 'Coinbase Wrapped BTC (cbBTC) Launches on Base and Ethereum',
      summary: 'Coinbase launches cbBTC, an ERC-20 token backed 1:1 by Bitcoin held in Coinbase custody. Available on Base and Ethereum at launch with plans for more chains. Coinbase has 10+ year record securely custodying billions in Bitcoin. When users send BTC from Coinbase to Base/Ethereum address, it automatically converts 1:1 to cbBTC. Day one DeFi integrations: DEXs (Aerodrome, Curve, Matcha, Uniswap), Lending (Aave, Compound, Morpho, Moonwell, Spark), Yield Vaults (Mellow, Veda), Cross-chain swaps (DeBridge, DeFinitive), Oracles (Chronicle Labs), RWA (Maple). Available in US (excl NY), UK, EEA, Australia, Brazil. cbBTC now also on Solana and Arbitrum. Contract address same across Base/Ethereum/Arbitrum: 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf. Coinbase: "cbBTC is moving money forward. We\'re one step closer to bringing 1 billion people onchain."',
      significance: 'Major exchange bringing deep off-chain Bitcoin liquidity to Ethereum ecosystem. Coinbase custody backing provides institutional-grade trust vs decentralized alternatives. Day one integrations across major DeFi protocols demonstrate immediate utility. Links $1T+ BTC market cap to Ethereum DeFi rails.',
      bmnrImplication: 'cbBTC brings Bitcoin liquidity to Ethereum ecosystem, expanding DeFi TVL and utility. More assets on Ethereum L1/L2 = more network activity = ETH ecosystem value. Coinbase institutional backing could attract conservative capital that avoided decentralized wrapped BTC.',
      impact: 'Bullish',
      source: 'Coinbase Blog'
    },
    {
      date: '2024-09-04', 
      category: 'Enterprise', 
      company: 'Siemens',
      title: 'Siemens Issues €300M Digital Bond with ECB/Bundesbank DLT Settlement', 
      summary: 'Siemens ($140B+ market cap) issues its second digital bond under Germany\'s Electronic Securities Act (eWpG), with volume of €300 million (5x larger than first bond) and one-year maturity. The bond was settled via SWIAT private permissioned blockchain and the Bundesbank Trigger Solution, enabling first-ever fully automated settlement in central bank money within minutes. This compares to 2-day settlement for Siemens\' first €60M digital bond in Feb 2023. Settlement risk "almost fully eliminated for all parties involved." Transaction supports ECB/Eurosystem trials testing DLT for digital financial markets. DekaBank acted as registrar; BayernLB, DekaBank, DZ BANK, Helaba, and LBBW invested. CFO Ralf Thomas: "We are demonstrating once again our spirit of innovation and underscoring our aim to continuously drive digital solutions for the financial markets."',
      significance: 'Major industrial company scaling blockchain bond issuance 5x while reducing settlement from days to minutes. ECB/Bundesbank involvement signals regulatory endorsement of DLT for securities. Siemens demonstrating that tokenized bonds are production-ready for Tier 1 corporate treasury operations. Settlement in central bank money (not just stablecoins) represents institutional-grade infrastructure.',
      bmnrImplication: 'Proves blockchain infrastructure ready for large-scale corporate treasury operations. €300M bond with minutes settlement and central bank money integration validates tokenized securities thesis. As more corporates issue on-chain bonds, demand for blockchain settlement infrastructure grows. Ethereum ecosystem benefits from expanding institutional use cases.',
      impact: 'Bullish',
      source: 'Siemens Press Release'
    },
    {
      date: '2024-08-23',
      category: 'L2',
      company: 'Sony',
      title: 'Sony and Startale Announce Soneium - Public Ethereum L2 Blockchain',
      summary: 'Sony Group and Startale announce Sony BSL, a joint venture to launch Soneium, a public Ethereum Layer-2 blockchain. Joint venture combines Startale\'s blockchain expertise with Sony Group\'s extensive experience in technology, content creation, finance, gaming, and consumer electronics. Soneium aims to become cornerstone of global blockchain infrastructure, driving Web3 adoption through Sony\'s millions of touchpoints. Astar Network aligning with Soneium, with ASTR token to be integrated into ecosystem. Sony\'s vision: "Realize the Open Internet that Transcends Boundaries. On Soneium, everyone is a creator, no matter where you are or what you do." Startale brings vertically integrated blockchain technology stack from base layer to application layer.',
      significance: 'Major entertainment/tech conglomerate ($85B+ market cap) building on Ethereum ecosystem. Potential to onboard millions of users through PlayStation, Sony Music, Sony Pictures, and consumer electronics touchpoints. Validates Ethereum as foundation for mainstream consumer applications.',
      bmnrImplication: 'Sony building L2 on Ethereum validates network for mainstream consumer applications. Entertainment giant with massive user base choosing Ethereum infrastructure expands total addressable market beyond finance. PlayStation ecosystem alone has 100M+ users.',
      impact: 'Bullish',
      source: 'Startale / Sony BSL Announcement'
    },
    {
      date: '2024-08-14',
      category: 'Enterprise',
      company: 'Mastercard',
      title: 'MetaMask Card Launches - First Self-Custody Wallet Debit Card on Mastercard', 
      summary: 'MetaMask (Consensys), Mastercard, and Baanx launch MetaMask Card — world\'s first Mastercard debit card enabling spending directly from self-custody crypto wallet. Supports USDC, USDT, and WETH on Linea network (Ethereum L2). EU and UK pilot launch. Users spend crypto for everyday purchases anywhere Mastercard accepted; crypto converted to fiat at moment of transaction. Eliminates traditional friction: crypto → exchange → fiat → bank account. Users retain keys and control until purchase. Mastercard EVP Raj Dhamodharan: "We see a great opportunity to make shopping easier, safer and more interoperable for users of self-managed wallets... bridging the gaps between Web2 and Web3 worlds." Baanx CCO Simon Jones: "We are working on the vision of enabling neobanking without custody. Anyone with access to a smartphone should have access to basic financial services by default."',
      significance: 'WORLD\'S FIRST self-custody wallet debit card on major payment network. Mastercard ($400B+ market cap) enabling direct crypto spending without intermediaries. Linea (Ethereum L2) integration validates L2 ecosystem for real-world payments. Bridges Web2 commerce with Web3 assets.',
      bmnrImplication: 'Mastercard enabling direct ETH ecosystem spending (WETH, USDC, USDT) expands real-world crypto utility. Self-custody preservation maintains decentralization ethos. More spending use cases = more ETH ecosystem adoption = network value.',
      impact: 'Bullish', 
      source: 'Mastercard / MetaMask / Baanx Press Release' 
    },
    { 
      date: '2024-08-07', 
      category: 'Regulatory', 
      company: 'Societe Generale',
      title: 'Societe Generale EURCV Upgraded for MiCA Compliance - Free Transferability Enabled', 
      summary: 'Societe Generale-FORGE obtains Electronic Money Institution (EME) approval from French ACPR (Prudential Control and Resolution Authority), enabling EUR CoinVertible (EURCV) stablecoin to operate under MiCA (Markets in Crypto-Assets) regulation. EURCV restructured as Electronic-Money Token (EMT) with free transferability — removing previous whitelisting restrictions. Key changes: open stablecoin accessible beyond institutional clients only, DeFi ecosystem integration enabled, Wintermute joins Flowdesk as market maker for improved liquidity. Listed preferentially on Bitstamp. Stablecoins represent $160B market (~7% of crypto market cap) but 90% of trading volume. CEO Jean-Marc Stenger: "Robust and regulated stablecoins are essential for the proper functioning, security and institutionalization of crypto-asset markets."',
      significance: 'FIRST major European bank stablecoin achieving full MiCA compliance. EME approval creates regulatory template for other European banks. Free transferability enables DeFi integration — bridging TradFi and DeFi. Wintermute market making improves institutional liquidity.',
      bmnrImplication: 'MiCA-compliant bank stablecoin on Ethereum demonstrates regulatory path for European institutional adoption. DeFi integration expands EURCV utility beyond settlement to yield generation. More regulated stablecoins = more institutional confidence in Ethereum ecosystem.',
      impact: 'Bullish', 
      source: 'Societe Generale-FORGE' 
    },
    {
      date: '2024-07-25',
      category: 'Enterprise',
      company: 'Toyota',
      title: 'Toyota Blockchain Lab Deploys Mobility-Oriented Account (MOA) on Ethereum Mainnet',
      summary: 'Toyota Blockchain Lab publishes technical paper and deploys Mobility-Oriented Account (MOA) smart contracts on Ethereum mainnet using ERC-4337 Account Abstraction standard. MOA creates vehicle-centric digital wallets enabling: KeyToken Contracts (ERC-721) for usage rights management, flexible payment delegation, and seamless mobility service integration. The system allows vehicles to have their own blockchain accounts, enabling autonomous payments for charging, tolls, parking, and maintenance. Toyota Motor Corporation partnered with other consortium members including Toyota Financial Services. Technical implementation includes modular account architecture supporting multiple signers, session keys, and programmable spending rules. Paul Brody, EY Global Blockchain Leader who has collaborated with Toyota: "This represents one of the most sophisticated enterprise ERC-4337 deployments we\'ve seen."',
      significance: 'World\'s largest automotive manufacturer ($300B+ market cap) deploying production smart contracts on Ethereum public mainnet. First major automaker to implement ERC-4337 Account Abstraction for vehicle accounts. Toyota Blockchain Lab\'s choice of public Ethereum over private/consortium chains signals confidence in network security and decentralization.',
      bmnrImplication: 'Toyota\'s MOA deployment validates Ethereum for automotive industry ($3T+ global market). ERC-4337 adoption by major enterprise demonstrates Account Abstraction standard maturity. More enterprise deployment = more Ethereum ecosystem value and network utility.',
      impact: 'Bullish',
      source: 'Toyota Blockchain Lab Technical Paper'
    },
    {
      date: '2024-07-25',
      category: 'Enterprise',
      company: 'Paysafe',
      title: 'Paysafe Partners with Alchemy Pay for Crypto On-Ramp Across 130 Countries', 
      summary: 'Paysafe (NYSE: PSFE), global payments platform with $140B annualized transaction volume, partners with Alchemy Pay to expand fiat-crypto on-ramp capabilities. Integration adds Paysafe\'s Skrill and NETELLER digital wallets (millions of users globally) plus multiple local payment methods (LPMs) across 130 countries and 40+ fiat currencies for BTC and ETH purchases. Includes open banking in UK and 15 European countries for direct bank account purchases. Phase 2 expansion planned for Latin America. SVP of Crypto & Digital Assets Micah Kershner: "The Skrill and NETELLER wallets\' large user-base and popularity among crypto holders along with integration of local payment methods will power Alchemy Pay\'s Fiat On-ramp with more payment options."',
      significance: 'Major global payment processor enabling fiat-to-crypto on-ramp across 130 countries. Skrill and NETELLER integration brings established digital wallet user base to crypto ecosystem. Open banking integration reduces friction for European crypto purchases.',
      bmnrImplication: 'Paysafe enabling ETH purchases across 130 countries expands global retail investor base. Lower friction fiat on-ramps = more potential ETH buyers. Payment processor integration normalizes crypto as standard asset class.',
      impact: 'Bullish', 
      source: 'Paysafe Press Release' 
    },
    { 
      date: '2024-07-23', 
      category: 'Institutional', 
      company: 'Franklin Templeton',
      title: 'Franklin Templeton Launches EZET Spot Ethereum ETF', 
      summary: 'Franklin Templeton launches the Franklin Ethereum ETF (EZET) on Cboe BZX Exchange, part of the first wave of SEC-approved spot Ethereum ETFs. Expense ratio: 0.19% (19 basis points), with fee waiver to 0.00% until January 31, 2025 for first $10B in assets. EZET holds spot ETH and seeks to reflect the performance of ether price minus fund expenses. Franklin Templeton\'s Digital Assets team, active since 2018, runs node validators and conducts fundamental tokenomic analysis. The firm also operates BENJI (tokenized money market fund) demonstrating deep blockchain commitment.',
      significance: 'Spot ETH ETFs represent regulatory milestone - SEC implicitly acknowledging ETH is not a security (commodity under CFTC). Opens floodgates for advisor and institutional allocation. Franklin Templeton\'s 75+ years of asset management credibility brings traditional investors to ETH.',
      bmnrImplication: 'ETH ETFs legitimize the asset class and expand the investor base. While ETFs compete with BMNR for allocation, they cannot stake or pay dividends - BMNR\'s structural advantages. Rising ETH price from ETF inflows directly benefits BMNR NAV.',
      impact: 'Bullish', 
      source: 'Franklin Templeton' 
    },
    { 
      date: '2024-03-20', 
      category: 'Enterprise', 
      company: 'BlackRock',
      title: 'BlackRock Launches BUIDL - First Tokenized Treasury Fund on Ethereum', 
      summary: 'BlackRock launches the BlackRock USD Institutional Digital Liquidity Fund (BUIDL), the first tokenized money market fund from the world\'s largest asset manager on a public blockchain. BUIDL tokens are issued on Ethereum mainnet, representing shares in a fund holding U.S. Treasury bills, repurchase agreements, and cash. Built with Securitize (tokenization), BNY Mellon (custody), and Coinbase Prime (infrastructure). Settlement in USDC enables 24/7/365 transfers between whitelisted addresses. Initial partners include Anchorage Digital, BitGo, Coinbase, and Fireblocks for distribution. Minimum investment: $5M for qualified purchasers. Target yield: Fed Funds rate minus 50bps.',
      significance: 'WATERSHED MOMENT for institutional tokenization. BlackRock ($10T+ AUM) choosing Ethereum over private blockchains or competitors sends unmistakable signal: Ethereum is the institutional settlement layer. Securitize CEO: "This is the starting gun for tokenized securities." Opens door for subsequent launches (Franklin, WisdomTree, etc.).',
      bmnrImplication: 'BlackRock\'s BUIDL launch is arguably the most important single event validating ETH for institutional use. Legitimizes holding ETH as exposure to institutional-grade infrastructure. Sets precedent that BMNR\'s ETH treasury strategy builds upon - "if BlackRock is building on Ethereum, why wouldn\'t we hold ETH?"',
      impact: 'Bullish',
      source: 'BlackRock Press Release'
    },
    {
      date: '2024-04-17',
      category: 'Enterprise',
      company: 'EY',
      title: 'EY Launches OpsChain Contract Manager - Smart Contracts for Enterprise on Public Ethereum',
      summary: 'EY (Big Four accounting firm) launches EY OpsChain Contract Manager (OCM), blockchain-enabled solution for enterprise contract management running on public Ethereum. Addresses enterprise challenge of managing multi-party business agreements across internal/external siloed systems. Features: synchronizes data across business partners, uniformly enforces key terms (pricing, volume discounts, rebates, strike prices), uses Zero Knowledge Circuits for privacy. Supports complex contract types: volume purchase agreements, standardized rate cards, volume discounts, rebates, market data-dependent price models. First users implementing Power Purchasing Agreements (PPAs) with market prices, strike prices, min/max criteria. Benefits: decentralized operation in trustworthy environment, no strategic advantage to buyer/seller, eliminates private network costs, avoids centralized industry portal risks. Zion Market Research projects global smart contracts market reaching $1B by 2030 (24% CAGR 2023-2030). Paul Brody, EY Global Blockchain Leader: "Contract automation can improve accuracy while cutting cycle times by more than 90%, and overall contract administration costs by nearly 40%. With our zero-knowledge privacy technology, we have industrialized this capability."',
      significance: 'Big Four professional services firm deploying production enterprise solution on public Ethereum. Smart contract automation addresses real enterprise pain points (contract leakage, fragmented spend). Zero-knowledge privacy enables confidential business terms on public blockchain.',
      bmnrImplication: 'EY building enterprise contract infrastructure on public Ethereum validates network for core business operations. Big Four firm commitment signals enterprise readiness. More enterprise use cases = more Ethereum ecosystem value.',
      impact: 'Bullish',
      source: 'EY Press Release'
    },
    {
      date: '2024-02-07', 
      category: 'Enterprise', 
      company: 'UBS',
      title: 'UBS Launches Hong Kong\'s First Tokenized Warrant on Ethereum', 
      summary: 'UBS AG launches Hong Kong\'s first-ever investment-grade tokenized warrant on Ethereum public blockchain using UBS Tokenize platform. Product is a call warrant with Xiaomi Corporation as underlying stock — first natively issued warrant on a public blockchain. Sold to OSL Digital Securities Limited, SFC-licensed virtual asset platform operator. Created natively on public blockchain in permissioned environment. Benefits: enhanced transparency, reduced transaction fees, streamlined settlement, extended trading hours. UBS Head of APAC Public Distribution Winni Cheuk: "The introduction of the UBS tokenized warrant reinforces the bank\'s position as the leading derivative products issuer in Hong Kong." OSL CEO Patrick Pan: "Hong Kong\'s regulated virtual asset landscape has just crossed another major milestone with this investment grade tokenized financial product issuance."',
      significance: 'FIRST tokenized warrant in Hong Kong. Investment-grade structured product on Ethereum demonstrates blockchain utility for complex derivatives. SFC-licensed distribution validates regulatory compliance for tokenized financial products. UBS leading derivative products issuer (#1 market share 2021-2022) choosing Ethereum.',
      bmnrImplication: 'Tokenized derivatives on Ethereum expand network utility beyond simple assets. Investment-grade products attract institutional capital. Hong Kong regulatory framework provides compliance template for other jurisdictions.',
      impact: 'Bullish', 
      source: 'UBS Press Release' 
    },
    { 
      date: '2024-05-15', 
      category: 'Institutional', 
      company: 'Interactive Brokers',
      title: 'Interactive Brokers Launches Cryptocurrency Trading for UK Clients', 
      summary: 'Interactive Brokers (Nasdaq: IBKR), automated global electronic broker, launches cryptocurrency trading in UK through Interactive Brokers (U.K.) Limited. Individual and institutional investors, including financial advisers, can now trade BTC, ETH, LTC, and BCH alongside stocks, options, futures, currencies, bonds, mutual funds, and ETFs from a single unified platform. Crypto accounts provided through Paxos Trust Company (New York-licensed). Commissions: 0.12-0.18% of trade value with $1.75 minimum, no added spreads, markups, or custody fees. CEO Gerald Perez: "Introducing cryptocurrency trading gives UK clients enhanced flexibility to invest across markets and asset classes while also adding exposure to digital assets."',
      significance: 'Major institutional broker (ranked #1 by Barron\'s for 6 consecutive years) integrating crypto into unified multi-asset platform. Eliminates need for separate crypto exchanges. Financial advisers can now efficiently allocate client assets to cryptocurrency alongside traditional investments.',
      bmnrImplication: 'Interactive Brokers enabling ETH access for institutional clients and financial advisers expands the investor base. Single-platform integration reduces friction for traditional investors to gain ETH exposure. More accessible ETH = broader institutional adoption = supports BMNR thesis.',
      impact: 'Bullish', 
      source: 'Interactive Brokers Press Release' 
    },
    { 
      date: '2024-05-29', 
      category: 'Enterprise', 
      company: 'Mastercard',
      title: 'Mastercard Crypto Credential Goes Live for P2P Transactions Across 13 Countries', 
      summary: 'Mastercard Crypto Credential goes live with first peer-to-peer pilot transactions, enabling crypto exchange users to send/receive crypto using aliases instead of complex blockchain addresses. First real-world application of vision unveiled at Consensus 2023. Live on Bit2Me, Lirium, and Mercado Bitcoin exchanges. Countries: Argentina, Brazil, Chile, France, Guatemala, Mexico, Panama, Paraguay, Peru, Portugal, Spain, Switzerland, Uruguay (13 countries). System verifies recipient wallet supports the asset and blockchain before transfer — protecting parties from loss of funds. Supports Travel Rule compliance for cross-border transactions. Rolling out to 7M+ users across participating exchanges. Future use cases: NFTs, ticketing, payments. EVP Walter Pimenta: "As interest in blockchain and digital assets continues to surge in Latin America and around the world, it is essential to keep delivering trusted and verifiable interactions across public blockchain networks."',
      significance: 'Major payment network ($400B+ market cap) building identity/verification layer for blockchain transactions. Addresses key UX barrier (complex addresses) while enabling regulatory compliance. Latin America focus reflects high crypto adoption in emerging markets.',
      bmnrImplication: 'Mastercard building blockchain transaction infrastructure expands mainstream crypto usability. Verification layer reduces friction and risk for cross-border transfers. More accessible crypto = more potential ETH users.',
      impact: 'Bullish', 
      source: 'Mastercard Press Release' 
    },
    { 
      date: '2024-05-14', 
      category: 'Enterprise', 
      company: 'Mastercard',
      title: 'Mastercard Multi-Token Network Pilots Tokenized Deposits with Standard Chartered', 
      summary: 'Mastercard Multi-Token Network (MTN) advances from beta testing to pilot with Standard Chartered Bank (Hong Kong), Mox Bank Limited, and Libeara — piloting payment for tokenized carbon credits with tokenized deposits. MTN built on Mastercard\'s private blockchain, uniting technology versatility with Mastercard governance and compliance. Completed Hong Kong pilot settling digital asset transactions involving decentralized applications; similar pilot in Australia. Supports tokenized bank deposits AND central bank digital currencies. App partners building on MTN: Coala Pay, Inveniam, Fresh Supply Co., Senken, Vayana, Coadjute (real estate escrow), Pairpoint (Vodafone - EV charging), Polytrade. EVP Raj Dhamodharan: "To realize the full potential of blockchain technology and revolutionize cross-border and business-to-business payments, we believe it must be safe, secure and scalable."',
      significance: 'Major payment network providing infrastructure for tokenized bank deposits and CBDC settlement. Standard Chartered partnership brings Tier 1 bank validation. Multi-country pilots (Hong Kong, Australia) demonstrate global applicability. Real-world use cases: carbon credits, real estate escrow, EV charging.',
      bmnrImplication: 'Mastercard tokenized deposit infrastructure expands blockchain utility for institutional payments. Bank deposits settling on blockchain rails = more on-chain value. Mastercard + bank partnerships accelerate enterprise blockchain adoption.',
      impact: 'Bullish', 
      source: 'Mastercard Press Release' 
    },
    { 
      date: '2024-05-01', 
      category: 'Institutional', 
      company: 'Securitize',
      title: 'Securitize Raises $47M Led by BlackRock for Tokenization Infrastructure', 
      summary: 'Securitize, leader in tokenizing real-world assets, completes $47M funding round led by BlackRock. Strategic investors include Hamilton Lane (Nasdaq: HLNE), ParaFi, and Tradeweb (Nasdaq: TW), plus Aptos Labs, Circle, and Paxos. BlackRock\'s Joseph Chalom (Global Head of Strategic Ecosystem Partnerships) joins Securitize board. Funding coincides with BlackRock\'s BUIDL launch on Ethereum using Securitize as transfer agent. Hamilton Lane Co-CEO Juan Delgado: "We are committed to making the private markets accessible to a broader set of investors, including through digital first, token-based technology." Hamilton Lane has partnered with Securitize since 2022 for SCOPE and Equity Opportunities Fund V. Tradeweb Chief Product Officer Chris Bruner: "Tokenization has the potential to drive greater efficiency and accessibility across financial markets."',
      significance: 'BlackRock leading investment in tokenization infrastructure signals deep institutional commitment beyond BUIDL. Hamilton Lane, Tradeweb, Circle, Paxos participation represents broad TradFi coalition. Securitize positioned as key infrastructure provider for institutional tokenization wave.',
      bmnrImplication: 'BlackRock investing in Securitize infrastructure demonstrates long-term commitment to Ethereum tokenization. More institutional infrastructure investment = more tokenized assets on Ethereum = ETH ecosystem value. Validates BMNR thesis that Ethereum is becoming institutional financial infrastructure.',
      impact: 'Bullish', 
      source: 'Securitize Press Release' 
    },
    { 
      date: '2024-12-01', 
      category: 'Enterprise', 
      company: 'JPMorgan',
      title: 'JPMorgan & MIT DCI Publish Programmable Payments Research on Kinexys', 
      summary: 'MIT Digital Currency Initiative and Kinexys by J.P. Morgan publish joint research on programmable payments application to commercial banking. Kinexys Digital Payments: blockchain-based demand deposit product with daily transaction values exceeding $1 billion; built on Quorum (EVM-compatible, Enterprise Ethereum Alliance spec); Blockchain Deposit Accounts (BDAs) = official record of deposit liability; 24/7 real-time cross-border payments (most transfers complete in seconds). Bank-side programmability: clients deploy programmable instructions IN bank\'s environment vs client-side (API communication). Benefits: improved execution time, certainty, traceability, composability, atomic operations. Programmable payments: event triggers, conditions, actions (when X occurs, if Y is true, do Z); time-based and event-based triggers; state-based design. Use cases: (1) Dynamic funding/treasury management with Siemens AG, (2) Automated payments via third-party logistics/IoT data, (3) Automated margin funding and settlement. Ant International case study: internal blockchain platform with AI-based triggers integrated with Kinexys, processed billions of dollars. Mathew McDermott (Global Head Digital Assets): "We view permissioned distributed technologies as the next structural change to financial markets."',
      significance: 'JPMorgan ($4T assets) operating EVM-compatible blockchain infrastructure for $1B+ daily transaction volume. MIT DCI academic partnership brings research rigor. Enterprise clients (Siemens, Ant International) using programmable smart contracts for treasury management. Bank-side programmability = new paradigm for institutional blockchain adoption.',
      bmnrImplication: 'JPMorgan building production EVM-compatible infrastructure validates Ethereum ecosystem for institutional finance. $1B+ daily volume proves blockchain ready for institutional scale. Programmable payments via smart contracts demonstrates enterprise utility. More institutional EVM adoption = more Ethereum ecosystem validation.',
      impact: 'Bullish', 
      source: 'JPMorgan / MIT DCI Research Paper' 
    },
    { 
      date: '2024-12-13', 
      category: 'Enterprise', 
      company: 'Societe Generale',
      title: 'Societe Generale Completes First Repo Transaction on Ethereum with Banque de France', 
      summary: 'Societe Generale announces successful completion of first repo transaction (Sale and Repurchase Agreement) in digital securities with a Eurosystem central bank, executed through subsidiary SG-FORGE. Societe Generale deposited as collateral bonds issued in 2020 on the public Ethereum blockchain in exchange for Central Bank Digital Currency (CBDC) issued by Banque de France on its DL3S blockchain. This demonstrates technical feasibility of interbank refinancing operations directly on blockchain and illustrates potential of CBDC to improve liquidity of digital financial securities.',
      significance: 'FIRST repo transaction between a major bank and Eurosystem central bank using Ethereum-based securities. Proves blockchain infrastructure ready for core interbank operations (repos are fundamental to money markets). Banque de France CBDC integration demonstrates central bank willingness to interface with public blockchain assets.',
      bmnrImplication: 'Major European bank using Ethereum for collateralized transactions with central bank validates the network for institutional money market operations. Repo markets are foundational to global finance — if they move on-chain, it represents massive validation for Ethereum infrastructure. ECB/Eurosystem engagement accelerates European institutional adoption.',
      impact: 'Bullish', 
      source: 'Societe Generale Press Release' 
    },
    // === 2023 HISTORICAL ENTRIES ===
    { 
      date: '2023-11-27', 
      category: 'Institutional', 
      company: 'Interactive Brokers',
      title: 'Interactive Brokers First SFC-Licensed Broker for Retail Crypto in Hong Kong', 
      summary: 'Interactive Brokers (Nasdaq: IBKR) becomes the first SFC-licensed securities broker approved to allow retail clients to trade cryptocurrencies in Hong Kong. Trading powered by OSL Digital Securities, Hong Kong\'s first SFC-licensed digital asset trading platform. Clients can trade BTC, ETH plus crypto futures alongside stocks, options, futures, currencies, bonds, mutual funds, and ETFs from single unified account. Commissions: 0.20-0.30% of trade value, $2.25 minimum, no added spreads or markups. Head of APAC David Friedland: "We are pleased to offer investors in Hong Kong a straightforward and cost-effective way to allocate a portion of their portfolio to digital assets." Previously launched for Professional Investor clients on Feb 14, 2023.',
      significance: 'FIRST SFC-licensed securities broker enabling retail crypto trading in Hong Kong. Regulatory milestone for Asian crypto adoption. Major institutional broker (Barron\'s #1 ranked for 6 consecutive years) legitimizing crypto for retail investors under regulated framework.',
      bmnrImplication: 'Interactive Brokers expanding regulated crypto access in Asia broadens global ETH investor base. SFC approval validates crypto as regulated asset class in major Asian financial hub. More retail access = more potential ETH holders.',
      impact: 'Bullish', 
      source: 'Interactive Brokers Press Release' 
    },
    { 
      date: '2023-11-14', 
      category: 'Enterprise', 
      company: 'Standard Chartered',
      title: 'Standard Chartered Launches Libeara - First Tokenized SGD Government Bond Fund', 
      summary: 'SC Ventures (Standard Chartered) launches Libeara, a tokenization platform for democratising investment. Partnership with FundBridge Capital (MAS-regulated fund manager) to create FIRST tokenised Singapore Dollar Government Bond Fund for accredited investors. Each token = one fund unit (native digital fund units on distributed ledgers). Fund will seek credit rating from international agency for BOTH underlying asset quality AND token structure — first in the world. Customer ownership evidenced on public blockchain ledger — immutable, verifiable claims. Partners: Fireblocks (custody wallets), Fazz/StraitsX (stablecoin-fiat conversion), Chainalysis (AML), Chekk (KYC). Built following successful POCs in Philippines, Singapore, Hong Kong, Ghana. CEO Aaron Gwak: "This will be the first time a Singapore Dollar Government Bond Fund will be offered in token format." Alex Manson (SC Ventures): "As we now have institutional grade custody and exchange with Zodia Custody and Zodia Markets, Libeara is the next logical step to better serve our customers."',
      significance: 'FIRST tokenised Singapore Dollar Government Bond Fund. Standard Chartered completing digital asset ecosystem: Zodia Custody → Zodia Markets → Libeara (tokenization). First to seek credit rating for token structure validates institutional-grade approach. Public blockchain ownership records provide transparency and verifiability.',
      bmnrImplication: 'Standard Chartered tokenization platform expands institutional on-chain asset offerings. Government bond tokenization brings lowest-risk assets to blockchain. More tokenized assets = more blockchain settlement infrastructure value. SC ecosystem (custody, trading, tokenization) provides end-to-end institutional solution.',
      impact: 'Bullish', 
      source: 'SC Ventures / Libeara Press Release' 
    },
    { 
      date: '2023-11-15', 
      category: 'Enterprise', 
      company: 'UBS',
      title: 'UBS, SBI, DBS Complete World\'s First Cross-Border Repo on Public Blockchain', 
      summary: 'UBS, SBI, and DBS launch world\'s first live repurchase transaction (repo) with a natively-issued digital bond on a public blockchain. Transaction automatically and instantly settled across regulated entities in three jurisdictions (Japan, Singapore, Switzerland) using regulated digital payment tokens. Involved repo to borrow tokenized JPY against JPY-denominated digital bond, with borrowed tokenized JPY financing bond purchase. Subsequent redemption and principal/interest payment executed on-chain — demonstrating entire transaction lifecycle on public blockchain. Part of MAS Project Guardian. UBS Group COTO Mike Dargan: "We proved the feasibility of executing a fully automated and instantly settled transaction across several jurisdictions by leveraging a public DLT network under a strict compliance framework." SBI CEO Fernando Luis Vázquez Cao: "This groundbreaking transaction demonstrates what can be done in Japan and cross-border."',
      significance: 'WORLD\'S FIRST cross-border repo on public blockchain. Proves feasibility of instant 24/7 settlement across multiple jurisdictions with full compliance. Demonstrates entire transaction lifecycle on-chain (repo, purchase, redemption, maturity). Three major Asian/European banks collaborating validates global institutional demand.',
      bmnrImplication: 'Cross-border repo on Ethereum demonstrates network ready for core institutional operations. Multi-jurisdictional compliance framework proves regulatory path exists. More institutional repo activity on-chain = more network utility = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'UBS Press Release' 
    },
    { 
      date: '2023-10-15', 
      category: 'Enterprise', 
      company: 'HKMA',
      title: 'Hong Kong e-HKD Pilot Programme Phase 1 Report Published', 
      summary: 'Hong Kong Monetary Authority publishes Phase 1 Report of e-HKD Pilot Programme, completed with 16 firms from financial, payment, and technology sectors. Six use case categories tested: full-fledged payments, programmable payments, offline payments, tokenised deposits, settlement of Web3 transactions, and settlement of tokenised assets. Key participants: HSBC, Visa, Hang Seng Bank, Mastercard, Bank of China (HK), Standard Chartered, Alipay, Fubon Bank, Ripple, BCG, ZA Bank. Three key findings where e-HKD adds unique value: (1) Programmability — smart contracts enable conditional retail settlements at scale, (2) Tokenisation — digital assets on blockchain as backbone connecting fiat and virtual assets, (3) Atomic Settlement — simultaneous instant settlement reducing counterparty risk. Tokenised deposits pilot with Visa/HSBC/Hang Seng demonstrated atomicity and interoperability across on-us and cross-chain payments. Mastercard pilot explored "wrapping" e-HKD for use on non-native blockchain for NFT purchases. DLT infrastructure considerations: account-based vs UTXO models, ERC-20 token standards, interoperability between centralized and distributed ledgers.',
      significance: 'Major central banking institution completing comprehensive retail CBDC pilot program. 16 institutional participants validates broad industry interest. Three key value propositions (programmability, tokenisation, atomic settlement) provide framework for CBDC design. Tokenised deposits as private-sector complement to public CBDC. Hong Kong positioning as digital asset hub.',
      bmnrImplication: 'HKMA validating programmability, tokenisation, and atomic settlement on blockchain infrastructure supports Ethereum ecosystem thesis. ERC-20 token standards and EVM-compatibility in pilots validates Ethereum technology stack. Hong Kong institutional adoption of blockchain payment infrastructure expands global network effect.',
      impact: 'Bullish', 
      source: 'HKMA e-HKD Pilot Programme Phase 1 Report' 
    },
    { 
      date: '2023-10-02', 
      category: 'Institutional', 
      company: 'UBS',
      title: 'UBS Asset Management Launches Tokenized VCC Fund Pilot on Ethereum', 
      summary: 'UBS Asset Management launches first live pilot of a tokenized Variable Capital Company (VCC) fund as part of MAS Project Guardian in Singapore. Fund designed to bring "real world assets" on-chain. Represented as smart contract on Ethereum public blockchain, pilot enables fund subscriptions and redemptions on-chain. Part of UBS\'s global distributed ledger technology strategy focused on leveraging public and private blockchains for enhanced fund issuance and distribution. UBS Head of Singapore Thomas Kaegi: "This is a key milestone in understanding the tokenization of funds, building on UBS\'s expertise in tokenizing bonds and structured products. Through this exploratory initiative, we will work with traditional financial institutions and fintech providers to help understand how to improve market liquidity and market access for clients."',
      significance: 'Major global wealth manager ($5.5T+ invested assets) piloting tokenized funds on Ethereum. MAS Project Guardian participation signals regulatory endorsement. VCC structure enables flexible fund management on-chain. Builds on UBS tokenization expertise (bonds since 2022, structured products).',
      bmnrImplication: 'UBS tokenizing funds on Ethereum validates network for asset management operations. MAS regulatory framework provides compliance template. More tokenized funds = more on-chain settlement = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'UBS Asset Management Press Release' 
    },
    { 
      date: '2023-09-12', 
      category: 'Enterprise', 
      company: 'ABN AMRO',
      title: 'ABN AMRO Issues First Dutch Digital Green Bond on Public Blockchain', 
      summary: 'ABN AMRO becomes first Dutch bank to register a digital green bond on public blockchain. Vesteda raised €5M from DekaBank; proceeds for Green Assets under Vesteda\'s Green Finance Framework. Entire process digital: preparation, placement, documentation. Ownership recorded on blockchain as tokens — investor acquired tokens after payment. ABN AMRO provided digital custody services using wallet for investor key security. Prior experience: purchased/resold EIB digital bond, placed digital bond for APOC (Midcorp client). Partners: Tokeny, Fireblocks (digital wallet), Allen & Overy, Clifford Chance (legal). Vesteda CFO Frits Vervoort: "valuable knowledge and experience on how blockchain can help us with financing solutions and the advantages it offers." DCM Head Olivier Aartsen: "We will continue to advise other clients and investors in this area and aim to further support multiple digital bond issuances in the future."',
      significance: 'FIRST Dutch bank with public blockchain digital bond. Green bond structure addresses ESG investor demand. Digital custody services demonstrate bank willingness to build blockchain infrastructure. Builds on prior EIB digital bond experience.',
      bmnrImplication: 'European bank expanding public blockchain bond issuance validates infrastructure for institutional debt capital markets. Green bond angle attracts ESG-focused institutional capital. More banks issuing digital bonds = more blockchain settlement infrastructure value.',
      impact: 'Bullish', 
      source: 'ABN AMRO Press Release' 
    },
    { 
      date: '2023-09-18', 
      category: 'Enterprise', 
      company: 'Citi',
      title: 'Citi Token Services Launches for Cash Management & Trade Finance', 
      summary: 'Citi Treasury and Trade Solutions (TTS) announces creation and piloting of Citi Token Services for cash management and trade finance. Service uses blockchain and smart contracts for tokenized deposits integrated into Citi\'s global network. Pilot with Maersk digitized bank guarantees and letters of credit — programmable transfer of tokenized deposits provided instant payments via smart contracts, reducing transaction processing from days to minutes. Separate global cash management pilot enables 24/7 liquidity transfers between Citi branches. Private/permissioned blockchain owned and managed by Citi. Shahmir Khaliq (Global Head of Services): "Digital asset technologies have the potential to upgrade the regulated financial system by applying new technologies to existing legal instruments and well-established regulatory frameworks." Ryan Rugg (Global Head of Digital Assets): "Citi Token Services provides corporate treasurers with a new tool to manage global liquidity on a just-in-time, programmable basis."',
      significance: 'Major global bank ($2T+ assets) launching tokenized deposit service for institutional clients. Maersk pilot proves real-world trade finance utility. 24/7 programmable liquidity management addresses key corporate treasury pain points. Part of broader Regulated Liability Network initiative for multi-bank digital asset solutions.',
      bmnrImplication: 'Citi building tokenized deposit infrastructure validates blockchain for institutional cash management. Maersk trade finance pilot demonstrates real-world utility beyond speculation. More institutional tokenized deposits = more blockchain adoption = ETH ecosystem validation (even on private chains, creates pathway to public).',
      impact: 'Bullish', 
      source: 'Citi Press Release' 
    },
    { 
      date: '2023-09-20', 
      category: 'Enterprise', 
      company: 'Standard Chartered',
      title: 'Zodia Custody Launches Staking Service via OpenEden Partnership', 
      summary: 'Zodia Custody, Standard Chartered\'s crypto subsidiary, partners with OpenEden to launch "Zodia Custody Yield" service enabling institutional clients to earn yield on cryptocurrency holdings while in custody. Programme tokenizes real-world assets such as treasury notes, allowing investors to earn returns while benefiting from blockchain technology. Provides off-chain income potential for on-chain assets while maintaining platform security. Part of Standard Chartered\'s digital assets expansion following Singapore custody services launch. Zodia Custody backed by Standard Chartered ($800B+ assets) and Northern Trust ($16T+ AUC). Service addresses institutional demand for productive use of custodied crypto assets beyond simple storage.',
      significance: 'Bank-backed custody provider launching institutional yield service. Standard Chartered/Northern Trust infrastructure bringing TradFi yield concepts to crypto custody. OpenEden partnership bridges tokenized treasuries with crypto custody. Addresses key institutional demand: productive use of custodied assets.',
      bmnrImplication: 'Institutional custody yield services validate productive ETH holding thesis. Zodia Yield demonstrates institutional demand for yield on crypto assets — same thesis as BMNR staking strategy. More institutional yield infrastructure = more validation of productive ETH thesis.',
      impact: 'Bullish', 
      source: 'Zodia Custody' 
    },
    { 
      date: '2023-09-05', 
      category: 'Institutional', 
      company: 'Visa',
      title: 'Visa Becomes First Major Payment Network to Settle in Stablecoin', 
      summary: 'Visa ($500B+ market cap, $15T annual payment volume) announces production stablecoin settlement capabilities, becoming one of the first major payment networks to settle transactions in USDC. Initial pilot enabled issuer Crypto.com to fulfill VisaNet settlement obligations in USDC on Ethereum. Expanded same month to include Solana blockchain and merchant acquirers Worldpay and Nuvei. Solana chosen for high throughput (400+ TPS avg, 2,000+ TPS peak) and predictable low fees (<$0.001). Visa\'s Crypto Thought Leadership team published deep technical research on Solana architecture, EIP-1559 fee model, and staking economics. By 2025, program processed $225M+ in stablecoin settlement volume across participating clients.',
      significance: 'Watershed moment for institutional blockchain adoption. World\'s largest payment network integrating public blockchain infrastructure for treasury settlement operations. Multi-chain approach (Ethereum for security/liquidity + Solana for throughput/cost) demonstrates pragmatic enterprise evaluation. Visa\'s technical research publications (consensus mechanisms, staking models, gas fees) signal serious institutional commitment beyond marketing.',
      bmnrImplication: 'Visa building on Ethereum validates the network for mainstream commerce infrastructure. Payment settlement volume drives stablecoin demand (primarily USDC), which settles on Ethereum. Visa\'s multi-year commitment and expanding partner network proves blockchain settlement is production-ready. More institutional on-chain activity = more ETH ecosystem value accrual.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
    { 
      date: '2023-08-01', 
      category: 'Institutional', 
      company: 'Fidelity',
      title: 'Fidelity Digital Assets Publishes Comprehensive Ethereum Investment Thesis', 
      summary: 'Fidelity Digital Assets Research publishes comprehensive Ethereum investment thesis examining ETH as (1) aspiring money and (2) yield-bearing asset. Tokenomics analysis: EIP-1559 base fee burn creates deflationary pressure; priority fees + MEV provide validator yield correlated to network usage; post-Merge 53% of validator revenue from protocol issuance. Store of value assessment: ETH stock-to-flow ratio higher than Bitcoin as of July 2023; supply determined by issuance (validator count) and burn (block space demand); at most ~1.5% annual inflation. Means of payment: 13-minute finality vs Bitcoin\'s 1-hour probabilistic settlement; NFT payments = second-most network fees since Merge; P2P transfers = third-largest ether burn. Yield analysis: MEV-Boost used by most validators; Nov 2022 block rewards spiked 700% during liquidations. DCF model constructed: average daily network fees since EIP-1559 = $18.7M; 70%+ of modeled value from terminal perpetuity growth. Real-world integration cited: MakerDAO $500M Treasury purchase, first US house NFT, EIB on-chain bonds, Franklin Templeton via Polygon. Key finding: "Ethereum may be best understood as a technology platform that uses ether (ETH) as a means of payment."',
      significance: 'Major asset manager ($4.5T+ AUM) publishing comprehensive institutional ETH investment thesis. Validates both "digital money" and "yield-bearing asset" frameworks. DCF model approach = treating ETH like traditional equity/bond analysis. Acknowledges ongoing development as risk to store of value thesis while highlighting yield opportunities.',
      bmnrImplication: 'Fidelity research provides institutional framework for ETH valuation that directly supports BMNR thesis. DCF model validates yield-based valuation approach. Staking yield analysis aligns with BMNR validator strategy. More institutional research = more validation of ETH as treasury asset.',
      impact: 'Bullish', 
      source: 'Fidelity Digital Assets Research' 
    },
    { 
      date: '2023-07-15', 
      category: 'Enterprise', 
      company: 'Mastercard',
      title: 'Mastercard Publishes Multi-Token Network Whitepaper for Digital Asset Payments', 
      summary: 'Mastercard publishes comprehensive whitepaper outlining vision for Multi-Token Network (MTN), a new scheme for secure digital asset payments. MTN designed as network overlay across public and private blockchains with four pillars: (1) Verified credentials — banks and VASPs meeting stringent KYC/AML onboarding standards, (2) Stable payment tokens — supporting regulated stablecoins, CBDCs, and tokenized bank deposits, (3) Cross-chain interoperability — secure atomic swaps between blockchain ecosystems, (4) Comprehensive governance — scheme rules allocating liability and enabling consumer protections. MTN beta launching in UK as testbed for new applications. Key innovation: tokenized deposits enabling consumer bank deposits to have "digital twin" with full blockchain programmability. CEO Michael Miebach: "We\'re creating mechanisms to underpin the global open banking ecosystem." Mastercard positioned as multi-rail company leveraging 50+ years of payment network experience. MTN enables atomic DvP settlement, programmable smart contracts, and cross-chain wrapped assets. Consumer protections include zero-liability guarantees and chargeback mechanisms similar to card networks.',
      significance: 'Major payment network ($400B+ annual volume) publishing comprehensive blockchain strategy. Four-pillar framework addresses key barriers to institutional adoption: compliance, token stability, interoperability, governance. Tokenized deposits concept enables banks to participate in blockchain ecosystem while maintaining fractional reserve lending. UK beta launch demonstrates production commitment.',
      bmnrImplication: 'Mastercard building blockchain payment infrastructure validates digital asset rails for mainstream commerce. MTN interoperability with Ethereum ecosystem expands network utility. Tokenized deposits on EVM-compatible networks = more Ethereum ecosystem value. More institutional payment infrastructure = more blockchain settlement.',
      impact: 'Bullish', 
      source: 'Mastercard Whitepaper' 
    },
    { 
      date: '2023-07-12', 
      category: 'Institutional', 
      company: 'WisdomTree',
      title: 'WisdomTree Prime Launches with Tokenized Digital Funds on Ethereum', 
      summary: 'WisdomTree ($93.6B AUM globally) launches WisdomTree Prime, a blockchain-enabled personal finance app available in 21 US states via Apple App Store and Google Play. App offers BTC, ETH, tokenized gold, and 9 SEC-registered WisdomTree Digital Funds including treasury funds (short-term, 3-7yr, 7-10yr, long-term, floating rate, TIPS), equity funds (S&P 500, Tech/Innovation 100), and short-duration income. WisdomTree\'s SEC-registered transfer agent maintains secondary ownership records on Stellar or Ethereum blockchains. Head of Digital Assets Will Peck: "Bringing traditional assets into the digital ecosystem will allow for blockchain technology to be used in a more mainstream capacity." CEO Jonathan Steinberg: "blockchain-enabled finance will transform the industry as we see it today."',
      significance: 'Major asset manager launching consumer-facing tokenized fund platform. SEC-registered structure provides regulatory clarity. Range of tokenized treasuries and equities demonstrates blockchain utility beyond crypto-native assets. WisdomTree pioneering retail access to tokenized traditional assets.',
      bmnrImplication: 'WisdomTree tokenizing traditional assets on Ethereum/Stellar validates blockchain infrastructure for mainstream finance. SEC-registered tokenized funds demonstrate regulatory viability. More tokenized assets = more blockchain ecosystem value.',
      impact: 'Bullish', 
      source: 'WisdomTree Press Release' 
    },
    { 
      date: '2023-06-09', 
      category: 'Enterprise', 
      company: 'UBS',
      title: 'BOCI Issues First Tokenized Notes on Ethereum via UBS Tokenize - CNH 200M', 
      summary: 'Bank of China International (BOCI) successfully issues CNH 200 million fully digital structured notes, becoming the first Chinese financial institution to issue a tokenized security in Hong Kong. Product originated by UBS and placed to Asia Pacific clients via UBS Tokenize platform. First product under Hong Kong and Swiss law tokenized on Ethereum mainnet — successfully introducing regulated securities onto a public blockchain. Builds on UBS\'s December 2022 issuance of USD 50M tokenized fixed rate note. BOCI Deputy CEO Ying Wang: "Working together with UBS, we are driving the simplification of digital asset markets and products, for customers in Asia Pacific through the development of blockchain-based digital structured products." UBS Global Head of MTN Trading Aurelian Troendle: "High-frequency issuance activity can benefit from vast efficiency gains through the use of blockchain technology."',
      significance: 'FIRST Chinese financial institution issuing tokenized security in Hong Kong. First product under Hong Kong AND Swiss law on Ethereum mainnet. Demonstrates cross-border legal framework compatibility for tokenized securities. Bank of China subsidiary validates Chinese institutional interest in Ethereum tokenization.',
      bmnrImplication: 'Chinese institutional adoption of Ethereum for tokenized securities expands global institutional footprint. Hong Kong + Swiss law compatibility proves multi-jurisdictional regulatory framework viability. More APAC institutional activity = more Ethereum network validation.',
      impact: 'Bullish',
      source: 'UBS / BOCI Press Release'
    },
    {
      date: '2023-06-15',
      category: 'Enterprise',
      company: 'SAP',
      title: 'SAP Launches Digital Currency Hub - USDC/EUROC Cross-Border Payments for SMEs',
      summary: 'SAP launches preview of SAP Digital Currency Hub, enabling cross-border payments using USDC and EUROC stablecoins (issued by Circle) on blockchain. Solution addresses major SME pain points: traditional cross-border payments cost up to $50 per transaction, take up to 7 days, and lack transparency. With Digital Currency Hub, business partners settle transactions via self-custody wallets without intermediaries. Technical flow: buyer opens wallet, creates transaction with seller\'s wallet address, signs with private key, sends to blockchain for validation. Settlement occurs in minutes. Solution links payments to business objects (business partners, invoice numbers) and will integrate with SAP ERP systems (SAP Business One, Business ByDesign, S/4HANA Cloud) for autonomous reconciliation. Test drive available using test USDC on test network for experimental purposes.',
      significance: 'Enterprise software giant ($200B+ market cap) building stablecoin payment infrastructure for its massive SME customer base. SAP serves 440,000+ customers in 180+ countries. Integration with ERP systems could bring blockchain payments to mainstream business operations.',
      bmnrImplication: 'SAP bringing stablecoin payments to SME customers validates Ethereum ecosystem for enterprise finance. USDC/EUROC settlement expands network utility beyond crypto-native users. More enterprise stablecoin adoption = more on-chain activity = ETH ecosystem value.',
      impact: 'Bullish',
      source: 'SAP Community Blog'
    },
    {
      date: '2023-05-15', 
      category: 'Institutional', 
      company: 'Visa',
      title: 'Visa e-HKD Pilot - Tokenized Bank Deposits with HSBC & Hang Seng', 
      summary: 'Visa selected by Hong Kong Monetary Authority (HKMA) for Phase 1 of the e-HKD Pilot Programme, partnering with HSBC ($3T+ assets) and Hang Seng Bank (3.9M customers) to test tokenized bank deposits. Visa provided tokenization platform infrastructure enabling minting, burning, and atomic interbank settlement using wholesale CBDC (wCBDC). Two use cases demonstrated: (1) Property Purchase — high-value real estate transactions with tokenized deposits replacing cheques/RTGS, and (2) Acquirer-Merchant Settlement — card settlement in near real-time. Technical results: settlement in <90 seconds (vs. days with traditional systems), 24/7 availability (ran without failure for 3+ weeks), atomic settlement ensuring all transaction legs execute or none do, and privacy via zero-knowledge proofs. Platform capabilities include smart contract programmability, cross-chain interoperability, and privacy-preserving identity. HKMA\'s George Chou: tokenized deposits "can enable access to increased liquidity and accelerate development of innovative token-based systems."',
      significance: 'Visa actively building deposit tokenization infrastructure with Tier 1 global banks — not just payments, but full bank deposit representation on blockchain. The pilot proved commercial viability of tokenized deposits for high-value B2B transactions. Visa\'s stated vision: "to be the engine that drives the new standard for blockchain-based payments." 110+ markets globally now exploring CBDCs (all G20 countries). Tokenization opportunity estimated at $5T over next 5 years.',
      bmnrImplication: 'Demonstrates traditional finance infrastructure actively migrating to blockchain rails. Visa + HSBC + HKMA collaboration validates institutional blockchain adoption thesis. Tokenized deposits on Ethereum-compatible infrastructure expand network utility. More institutional on-chain activity = more ETH ecosystem value. Connects Visa\'s stablecoin settlement (2023) → VTAP platform (2024) → bank deposit tokenization narrative arc.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
    { 
      date: '2023-04-20', 
      category: 'Enterprise', 
      company: 'Societe Generale',
      title: 'Societe Generale Launches EUR CoinVertible - First Institutional Stablecoin on Ethereum', 
      summary: 'Societe Generale-FORGE (SG-FORGE), fully integrated regulated subsidiary of Societe Generale Group, launches EUR CoinVertible (ticker: EURCV), a Euro-denominated stablecoin on Ethereum public blockchain. Designed for institutional clients seeking on-chain settlement and cash management solutions. Key features: segregated collateral with direct token-holder access, daily transparency on positions, credit rating requested from leading agency, KYC/AML compliance via SG Group procedures. Use cases: on-chain settlement, corporate treasury/cash pooling, liquidity funding, intra-day margin calls. Built on CAST open-source interoperability framework. CEO Jean-Marc Stenger: "Digital assets with stabilisation mechanisms built under a robust banking-grade structure will be a key element to increase trust and confidence in the native crypto ecosystem."',
      significance: 'FIRST major European bank launching institutional stablecoin on public Ethereum. SG-FORGE is licensed investment firm under ACPR/AMF supervision. Banking-grade compliance structure addresses institutional concerns about stablecoin counterparty risk. Opens Euro-denominated on-chain settlement for European institutions.',
      bmnrImplication: 'Major European bank building stablecoin infrastructure on Ethereum validates network for institutional finance. Euro stablecoin expands beyond USD-dominated market (USDC/USDT). More institutional stablecoin activity = more Ethereum network utility = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'Societe Generale-FORGE Press Release' 
    },
    { 
      date: '2023-04-26', 
      category: 'Institutional', 
      company: 'Franklin Templeton',
      title: 'Franklin Templeton FOBXX Expands to Polygon L2', 
      summary: 'Franklin Templeton announces that the Franklin OnChain U.S. Government Money Fund (FOBXX), the first U.S.-registered mutual fund to use public blockchain for transaction processing and share ownership records, now supports Polygon blockchain in addition to Stellar. FOBXX, launched in 2021, invests 99.5%+ in government securities, cash, and repos. Each share represented by one BENJI token, accessible via the Benji Investments app. Polygon integration enables Ethereum ecosystem compatibility through an established Layer 2 with $260B+ ERC-20 market access. Fund maintains stable $1.00 share price with competitive yield.',
      significance: 'Franklin Templeton ($1.4T AUM at time) pioneering tokenized funds since 2021. Polygon expansion brings FOBXX into Ethereum ecosystem, enabling interoperability with DeFi protocols and wallets. Proves traditional asset managers can operate on public blockchain infrastructure.',
      bmnrImplication: 'Early institutional blockchain adoption by major asset manager paved the way for current tokenization wave (BlackRock, JPMorgan). Franklin\'s multi-year commitment demonstrates this is not a fad - validates long-term ETH ecosystem investment thesis.',
      impact: 'Bullish', 
      source: 'Franklin Templeton' 
    },
    // === 2023 HISTORICAL PROTOCOL EVENTS ===
    { 
      date: '2023-04-12', 
      category: 'Protocol', 
      company: 'Other',
      title: 'Shanghai/Shapella Upgrade - Staking Withdrawals Enabled', 
      summary: 'Ethereum completes the Shanghai/Shapella upgrade (named "Shapella" combining Shanghai execution layer + Capella consensus layer), enabling withdrawals of staked ETH for the first time since the Beacon Chain launch in December 2020. Validators can now exit and withdraw their 32 ETH stake plus accumulated rewards. The upgrade supports two withdrawal types: partial withdrawals (automatic sweep of rewards above 32 ETH) and full withdrawals (complete validator exit). At the time of the upgrade, 18.1 million ETH was staked on the Beacon Chain, representing 15.6% of total ETH supply. The successful upgrade completed Ethereum\'s multi-year transition to Proof of Stake: Beacon Chain (Dec 2020) → The Merge (Sept 2022) → Withdrawals (Apr 2023).',
      significance: 'Removed the final uncertainty around Ethereum staking. Before Shanghai, stakers faced indefinite lock-up with no guaranteed withdrawal timeline — a significant risk that deterred institutional participation. Enabling withdrawals transformed staking from a one-way commitment to a liquid, reversible decision. This unlocked massive growth in liquid staking derivatives (Lido, Rocket Pool, Coinbase cbETH) and institutional staking services.',
      bmnrImplication: 'Critical for BMNR\'s staking strategy viability. Shanghai proved that staked ETH is not permanently locked — validators can exit if needed, providing liquidity optionality. This de-risked the entire staking thesis. Post-Shanghai, Ethereum staking became institutionally viable, enabling services like Fidelity\'s staking offering and validating BMNR\'s MAVAN validator infrastructure.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
    { 
      date: '2023-02-14', 
      category: 'Enterprise', 
      company: 'Siemens',
      title: 'Siemens Issues First Digital Bond on Public Blockchain', 
      summary: 'Siemens ($140B+ market cap) becomes one of the first companies in Germany to issue a digital bond under the Electronic Securities Act (eWpG). The bond has a volume of €60 million with one-year maturity, underpinned by a public blockchain. Key benefits: eliminates paper-based global certificates, removes need for central clearing, enables direct sale to investors without intermediary bank. Settlement completed within two days. CFO Ralf Thomas: "We are proud to be one of the first German companies to have successfully issued a blockchain-based bond. This makes Siemens a pioneer in the ongoing development of digital solutions for the capital and securities markets." Corporate Treasurer Peter Rathgeb: "By moving away from paper and toward public blockchains for issuing securities, we can execute transactions significantly faster and more efficiently." Hauck Aufhäuser Lampe Privatbank AG acted as registrar; DekaBank, DZ Bank, and Union Investment invested.',
      significance: 'First digital bond on public blockchain under Germany\'s regulatory framework by a major industrial company. Proves tokenized corporate bonds are legally and technically viable in mature regulatory environment. Siemens demonstrating willingness to pioneer blockchain capital markets infrastructure. Germany\'s eWpG (effective June 2021) created legal foundation for this innovation.',
      bmnrImplication: 'Major corporate issuer validating blockchain for securities issuance. While not Ethereum-specific, demonstrates institutional appetite for tokenized capital markets infrastructure. Paves way for Siemens\' scaled €300M follow-on bond in 2024. Corporate treasury innovation creates broader ecosystem validation for blockchain-based finance.',
      impact: 'Bullish', 
      source: 'Siemens Press Release' 
    },
    { 
      date: '2023-01-31', 
      category: 'Enterprise', 
      company: 'EIB',
      title: 'EIB Issues First Digital Sterling Bond on HSBC Orion Platform', 
      summary: 'European Investment Bank (EIB) prices first-ever £50M digital bond denominated in pound sterling using combination of private and public blockchains via HSBC Orion tokenization platform. Floating rate (SONIA + 12bps), ~2-year maturity. Architecture: encrypted private blockchain for legal ownership record, public blockchain mirror for anonymized transparency. Digital bonds held in digital securities accounts on HSBC Orion. Joint lead managers: BNP Paribas, HSBC, RBC Capital Markets. Custodians: BNP Paribas Securities Services (Luxembourg), RBC, HSBC. Listed on Luxembourg Stock Exchange. First public issuance on HSBC Orion platform. EIB VP Ricardo Mourinho Felix: "The time has come for further innovation in the financial sector, and we are pleased to issue the first digital bond in pound sterling." HSBC: "First public issuance on our tokenisation platform, which has opened up opportunities for faster processing." Investors include BNP Paribas and Schroders.',
      significance: 'EU development bank ($550B+ assets) launching first sterling digital bond validates blockchain for sovereign/supranational issuance. HSBC Orion platform first public issuance demonstrates production-ready tokenization infrastructure. Private + public blockchain hybrid addresses institutional privacy needs while maintaining transparency.',
      bmnrImplication: 'EIB digital bond on HSBC Orion expands institutional blockchain infrastructure. Supranational issuer adoption validates tokenization for highest-grade credits. HSBC Orion production launch enables future institutional tokenization. More tokenized bonds = more blockchain settlement infrastructure value.',
      impact: 'Bullish', 
      source: 'EIB Press Release' 
    },
    // === 2022 HISTORICAL PROTOCOL EVENTS ===
    {
      date: '2022-09-29',
      category: 'Enterprise',
      company: 'Deutsche Telekom',
      title: 'Deutsche Telekom Deploys Ethereum Validator Infrastructure via T-Systems MMS',
      summary: 'Deutsche Telekom expands blockchain activities by including Ethereum, the second largest blockchain in the world. T-Systems MMS (Deutsche Telekom subsidiary) provides Ethereum Network with infrastructure in the form of validation nodes. Additionally, Deutsche Telekom subsidiary cooperates with StakeWise for liquid staking pools, allowing users to stake ETH tokens without operating validator nodes themselves. T-Systems MMS participates in StakeWise governance through the DAO, contributing to transparency and security. Dirk Röder, Head of Blockchain Solutions Center at T-Systems MMS: "Our cooperation partner StakeWise collects individual Ether tokens from many different owners and merges them into validator nodes. These validator nodes are provided and operated as infrastructure by T-Systems MMS." Kirill Kutakov, co-founder of StakeWise: "With the move to Proof-of-Stake, we expect strong demand and significantly increasing capital flows in the Ethereum network. We are therefore pleased that T-Systems MMS, as an infrastructure provider, is giving our protocol more reliability and making the Ethereum ecosystem safer overall."',
      significance: 'Major European telecom ($90B+ market cap, €110B+ revenue) operating Ethereum validator infrastructure. T-Systems MMS already supported Flow, Celo, and Polkadot — now adding Ethereum. First DAO governance participation for Deutsche Telekom. Corporate validator operation validates Ethereum PoS security model for enterprise.',
      bmnrImplication: 'Deutsche Telekom operating Ethereum validators legitimizes staking infrastructure as enterprise-grade service. Major telecom infrastructure provider validates Ethereum PoS security model. Corporate validator participation = more decentralized, secure network = supports BMNR staking thesis.',
      impact: 'Bullish',
      source: 'Deutsche Telekom Media'
    },
    {
      date: '2022-09-15', 
      category: 'Protocol', 
      company: 'Other',
      title: 'The Merge - Ethereum Transitions from Proof of Work to Proof of Stake', 
      summary: 'Ethereum successfully completes "The Merge," the most significant technological upgrade in its history, transitioning the network\'s consensus mechanism from Proof of Work (PoW) to Proof of Stake (PoS). The upgrade merged the original Ethereum mainnet (execution layer) with the Beacon Chain (consensus layer), ending energy-intensive mining operations. The Merge reduced Ethereum\'s energy consumption by approximately 99.95%. At the time, 15.9 million ETH had been staked on the Beacon Chain, representing roughly 13.2% of total supply. Validators who stake 32 ETH can now earn rewards for securing the network, with staking yields of approximately 3-5% APY from block rewards and transaction fees.',
      significance: 'Watershed moment for blockchain technology. The Merge addressed Ethereum\'s largest criticism (energy consumption) while enabling native yield generation through staking. This transformed ETH from a pure commodity to a yield-bearing asset, fundamentally changing institutional valuation frameworks. The successful execution of such a complex upgrade demonstrated Ethereum\'s technical maturity and developer ecosystem strength.',
      bmnrImplication: 'THE foundational event enabling BMNR\'s entire business model. Without The Merge, there would be no staking yields, no MAVAN validator network, and no dividend strategy. BMNR\'s thesis — that ETH treasuries can generate sustainable yield while appreciating — is only possible because of PoS. The Merge transformed ETH from "digital commodity" to "productive asset."',
      impact: 'Bullish',
      source: 'Visa Crypto Research'
    },
    {
      date: '2022-07-21',
      category: 'Enterprise',
      company: 'Aura Blockchain Consortium',
      title: 'Aura Blockchain Consortium Partners with Temera for Luxury Supply Chain Traceability',
      summary: 'Aura Blockchain Consortium (founded by LVMH, Prada Group, Cartier/Richemont, OTB Group, Mercedes-Benz) announces strategic collaboration with Temera for luxury product traceability. Temera brings expertise via proprietary Stylewhere platform and RFID/NFC technology. Aura enables brands to tag products with secure, unique blockchain-based identities tracking manufacture and supply from raw materials through end consumers. Aura SaaS offering allows brands to quickly onboard, maximizing value for customer journey and digital innovation. Partnership provides both upstream (raw material sourcing) and downstream (direct-to-consumer) traceability. Temera CMO Guido Mengoni: "The expertise of Aura Blockchain Consortium Founding Members combined with our desire to innovate... will become fundamental for consumers in the coming years: full transparency of the product life cycle."',
      significance: 'Major luxury conglomerates (LVMH, Prada, Cartier, Mercedes-Benz) deepening blockchain infrastructure for supply chain transparency. Aura built on ConsenSys/Ethereum technology. Partnership demonstrates enterprise blockchain use case beyond finance — product authentication and sustainability.',
      bmnrImplication: 'Luxury brands building on Ethereum infrastructure validates network for enterprise non-financial use cases. Supply chain traceability expands Ethereum utility beyond DeFi/payments. More enterprise adoption = more ecosystem value.',
      impact: 'Bullish',
      source: 'Aura Blockchain Consortium Press Release'
    },
    {
      date: '2022-06-13', 
      category: 'Institutional', 
      company: 'Goldman Sachs',
      title: 'Goldman Sachs Executes First Ethereum Derivative Trade', 
      summary: 'Goldman Sachs ($150B+ market cap) executes its first Ethereum non-deliverable forward (NDF), a derivative that pays out based on ETH price and offers institutional investors indirect exposure to the cryptocurrency. Counterparty: Marex Financial (London-based financial services firm). The trade occurred during severe crypto bear market conditions — overall market cap had tumbled below $1T for the first time in 18 months, with ETH down ~17% in 24 hours. Goldman had previously expanded to ETH futures and options in June 2021, following its May 2021 crypto trading desk launch. Head of Digital Assets Mathew McDermott: "We\'ve actually seen a lot of interest from clients who are eager to trade as they find these levels as a slightly more palatable entry point."',
      significance: 'Goldman executing ETH derivatives during peak bear market demonstrates institutional conviction persists through downturns. Wall Street\'s premier investment bank offering ETH exposure signals the asset has achieved institutional-grade status. The timing — during maximum fear — shows sophisticated clients view crypto drawdowns as buying opportunities, not existential threats.',
      bmnrImplication: 'Goldman offering ETH derivatives validates the asset for institutional portfolios. Wall Street infrastructure for ETH trading/hedging reduces friction for corporate treasury adoption. Bear market execution proves institutional interest is structural, not speculative. Paves way for Goldman\'s subsequent $2B+ crypto ETF holdings by 2025.',
      impact: 'Bullish', 
      source: 'CoinDesk / Bloomberg' 
    },
    { 
      date: '2022-03-09', 
      category: 'Institutional', 
      company: 'State Street',
      title: 'State Street Develops Digital Custody Infrastructure with Copper.co', 
      summary: 'State Street Corporation ($42.6T AUC, $3.9T AUM), one of the world\'s largest custodians, announces State Street Digital has entered licensing agreement with Copper.co to develop institutional-grade digital custody. The collaboration leverages Copper.co\'s technology (450+ crypto assets, 40+ exchanges) to build secure storage and settlement infrastructure for digital assets. Head of State Street Digital Nadine Chakar: "As institutional investors\' interest in digital assets continues to grow, we are building the financial infrastructure needed to support our clients\' allocations to this new asset class." Subject to regulatory approvals for launch.',
      significance: 'World\'s largest custodian building crypto infrastructure signals institutional adoption has reached critical mass. State Street custody network serves the largest institutional investors globally. Their entry validates digital assets as a permanent institutional asset class requiring proper custody infrastructure.',
      bmnrImplication: 'State Street building digital custody infrastructure removes a key barrier to institutional ETH allocation. As the custodian for massive pension funds, endowments, and asset managers, their infrastructure buildout enables the institutional capital flows that support BMNR\'s thesis. Custody infrastructure is foundational to corporate treasury strategies.',
      impact: 'Bullish',
      source: 'State Street Press Release'
    },
    {
      date: '2022-01-20',
      category: 'Enterprise',
      company: 'Aura Blockchain Consortium',
      title: 'Hennessy Joins Aura Blockchain Consortium - First Spirits Brand on Luxury Blockchain',
      summary: 'Hennessy, the world\'s best-selling cognac (founded 1765, LVMH brand), becomes first luxury spirits brand to join Aura Blockchain Consortium. Partnership provides full traceability across supply chain from distillery to consumer. First consumer use case launched for Chinese New Year 2022: collector\'s edition Hennessy Paradis sold in China with unique blockchain-authenticated certificate via WeChat. Limited edition inspired by artist Zhang Enli\'s "Poetry and Wine Welcome the Tiger" artwork, produced by French porcelain maker Bernardaud. Each buyer receives authenticated certificate through WeChat experience. Hennessy CEO Laurent Boillot: "The Aura Blockchain Consortium\'s vision to push the boundaries of technology to publish a blockchain platform that will ensure the full traceability of products... aligns with our goal to establish Hennessy as not only a market-leading product but a securely and equitably produced product."',
      significance: 'First spirits industry brand on Aura blockchain expands use case beyond fashion/jewelry. LVMH deploying blockchain across its brand portfolio (Louis Vuitton, Bulgari, Hublot, now Hennessy). WeChat integration demonstrates blockchain utility for Chinese luxury market authentication.',
      bmnrImplication: 'Luxury brands expanding blockchain use cases validates Ethereum infrastructure for diverse enterprise applications. LVMH portfolio-wide deployment demonstrates serious institutional commitment. More brand adoption = more blockchain ecosystem value.',
      impact: 'Bullish',
      source: 'Aura Blockchain Consortium Press Release'
    },
    {
      date: '2022-01-13',
      category: 'Enterprise',
      company: 'Aura Blockchain Consortium',
      title: 'Aura Blockchain Consortium Launches Aura SaaS - Cloud-Based Blockchain for Luxury Brands',
      summary: 'Aura Blockchain Consortium (LVMH, Prada Group, Cartier/Richemont, OTB Group) launches Aura SaaS, first blockchain-based cloud platform designed for luxury brands. Platform has 15+ million digital tokens on private permissioned blockchain with upstream and downstream supply chain traceability. Aura SaaS is no-code solution with lower upfront costs and quick onboarding. Features: smart contract generator (no coding needed), product registration on blockchain, product events/rich content management, product history, ownership acquisition/transfer. Brands access Aura Blockchain via APIs connecting to their IT systems. White-label front-end interfaces customizable to each brand\'s UX. Addresses: authenticity, ownership, warranty, transparency, traceability. Secretary General Daniela Ott: "Aura SaaS provides a game-changing toolbox for the luxury industry... suitable for luxury brands of any size."',
      significance: 'Major luxury houses democratizing blockchain access for smaller brands via SaaS model. 15M+ digital tokens demonstrates production scale. No-code approach lowers barrier to enterprise blockchain adoption. Consortium model (LVMH + Prada + Cartier + OTB) creates industry standard.',
      bmnrImplication: 'Enterprise SaaS blockchain platform built on ConsenSys/Ethereum technology validates network for institutional use. 15M+ tokens in production proves enterprise blockchain viability. More enterprise adoption = more Ethereum ecosystem value.',
      impact: 'Bullish',
      source: 'Aura Blockchain Consortium Press Release'
    },
    {
      date: '2022-03-24', 
      category: 'Enterprise', 
      company: 'ANZ',
      title: 'ANZ Issues First Australian-Bank Stablecoin on Ethereum EVM', 
      summary: 'ANZ becomes first Australian bank to issue an Australian dollar stablecoin (A$DC) via public permissionless blockchain transaction. ANZ minted 30 million A$DC using an ANZ-built Ethereum Virtual Machine (EVM) compatible smart contract deployed through Fireblocks platform. Transaction: ANZ delivered stablecoin for Victor Smorgon Group via Zerocap (digital asset wealth management). Coins transferred between parties and later redeemed back to fiat currency. Partners: Fireblocks (platform), Chainalysis (transaction screening), OpenZeppelin (smart contract auditing). ANZ Banking Services Lead Nigel Dobson: "An ANZ issued Australian dollar stablecoin is a first and important step in enabling our customers to find a safe and secure gateway to the digital economy." Fireblocks CEO Michael Shaulov: "By being the first bank to mint a stablecoin, ANZ has established itself as a leader when it comes to innovation." ANZ is founding partner of Lygon (blockchain bank guarantees).',
      significance: 'FIRST Australian bank-issued stablecoin on EVM-compatible blockchain. Major Asia-Pacific bank ($70B+ market cap) choosing Ethereum-compatible infrastructure in March 2022 — predating most institutional stablecoin announcements. Demonstrates bank willingness to build native blockchain payment infrastructure.',
      bmnrImplication: 'Bank-issued stablecoins on Ethereum-compatible infrastructure validate network for institutional payments. ANZ early mover status demonstrates institutional confidence in EVM ecosystem. More bank stablecoins = more on-chain settlement = ETH ecosystem value.',
      impact: 'Bullish', 
      source: 'ANZ Press Release' 
    },
    { 
      date: '2022-04-26', 
      category: 'Enterprise', 
      company: 'DAMAC Properties',
      title: 'DAMAC Properties Accepts Bitcoin & Ethereum for Dubai Real Estate', 
      summary: 'DAMAC Properties, Dubai-based luxury real estate developer (subsidiary of Al Ghurair Group, 50+ years in business), announces acceptance of Bitcoin and Ethereum for property purchases across its communities including DAMAC Hills and DAMAC Lagoons. The move follows Dubai Government\'s establishment of the Virtual Assets Regulatory Authority (VARA) and issuance of virtual asset licenses. Dubai\'s Virtual Assets Law positions the emirate as a global crypto hub, attracting major crypto exchanges and blockchain businesses. DAMAC states crypto "breaks geographical barriers, simplifies international transactions and offers a higher level of privacy" while upgrading "security and transparency among the developers and buyers."',
      significance: 'Major luxury real estate developer accepting ETH for high-value property transactions in one of the world\'s premier real estate markets. Dubai\'s VARA framework creates regulated environment for crypto commerce. Demonstrates ETH utility for real-world asset purchases beyond speculation.',
      bmnrImplication: 'ETH accepted for luxury real estate validates the asset for high-net-worth transactions. Dubai positioning as crypto hub attracts institutional capital. More real-world payment use cases = more ETH utility and demand.',
      impact: 'Bullish', 
      source: 'DAMAC Properties' 
    },
    // === 2021 HISTORICAL PROTOCOL EVENTS ===
    { 
      date: '2021-08-05', 
      category: 'Protocol', 
      company: 'Other',
      title: 'EIP-1559 London Hard Fork - Fee Burning Mechanism Introduced', 
      summary: 'Ethereum implements EIP-1559 via the London Hard Fork, fundamentally restructuring the network\'s fee model and introducing a deflationary mechanism. The upgrade replaced the first-price auction fee system with a new model consisting of two components: a dynamically calculated base fee (burned/destroyed) and an optional priority fee/tip (paid to validators). The base fee adjusts automatically based on network congestion — increasing when blocks exceed 50% capacity, decreasing when below. The formula: Gas Fee = Gas Units × (Base Fee + Priority Fee). The burn mechanism removes ETH from circulation permanently, creating deflationary pressure during periods of high network activity. When base fees exceed approximately 16-18 gwei, the burn rate surpasses new ETH issuance, making the network net deflationary.',
      significance: 'Transformed Ethereum\'s monetary policy from purely inflationary to conditionally deflationary. Before EIP-1559, all transaction fees went to miners, continuously diluting ETH holders. After EIP-1559, a portion of every transaction permanently reduces supply. Combined with The Merge\'s ~87% issuance reduction, Ethereum achieved "ultrasound money" status — a productive asset with deflationary characteristics. The upgrade also improved fee predictability for users.',
      bmnrImplication: 'Foundational to the ETH treasury thesis. EIP-1559 means holding ETH is not diluted by inflation — in fact, high network usage benefits holders through supply reduction. For BMNR, this creates a structural tailwind: as Ethereum adoption grows (more transactions → higher fees → more burns), the ETH treasury becomes more valuable through supply scarcity, independent of price speculation. This "burn dividend" compounds with staking yield.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
    { 
      date: '2021-05-06', 
      category: 'Institutional', 
      company: 'Goldman Sachs',
      title: 'Goldman Sachs Forms Crypto Trading Desk - Wall Street Era Begins', 
      summary: 'Goldman Sachs ($150B+ market cap) formally announces formation of its cryptocurrency trading desk, marking the official start of the crypto trading era on Wall Street. Internal memo from partner Rajesh Venkataramani confirms the team successfully traded Bitcoin NDFs and CME BTC futures (cash-settled). The crypto team operates within Global Currencies and Emerging Markets division, part of the broader Digital Assets effort led by Mathew McDermott. Goldman also launched Digital Assets dashboard providing daily/intraday crypto market data to clients. CEO David Solomon: firm is "selectively onboarding crypto trading institutions" to expand offerings. The bank had mulled a Bitcoin trading desk since 2017, tabled plans initially, then restarted in March 2021. Note: "The firm is not in a position to trade bitcoin, or any cryptocurrency (including Ethereum) on a physical basis" — only derivatives initially.',
      significance: 'WATERSHED MOMENT for institutional crypto adoption. Goldman Sachs — Wall Street\'s dominant investment bank for fixed income and equities trading — formally acknowledging crypto trading operations. First major Wall Street bank to do so publicly. Signals crypto has achieved "tradeable asset class" status for institutional capital. Opens door for rival banks (Morgan Stanley, JPMorgan) to follow.',
      bmnrImplication: 'Goldman\'s 2021 trading desk launch was the first domino in Wall Street\'s crypto adoption. The progression: trading desk (2021) → ETH derivatives (2022) → $2B+ ETF holdings (2025) → tokenization infrastructure (2025). This institutional infrastructure buildout is what enables corporate treasury strategies like BMNR\'s. Goldman\'s early entry validated crypto for traditional finance.',
      impact: 'Bullish',
      source: 'CNBC / Goldman Internal Memo'
    },
    {
      date: '2021-04-20',
      category: 'Enterprise',
      company: 'Aura Blockchain Consortium',
      title: 'LVMH, Prada, and Cartier Form Aura Blockchain Consortium on ConsenSys/Ethereum',
      summary: 'LVMH, Prada Group, and Cartier (Richemont) announce creation of Aura Blockchain Consortium — first global blockchain dedicated to luxury industry. Single solution addresses shared challenges of authenticity, responsible sourcing, and sustainability. Technology: multi-nodal private blockchain secured by ConsenSys technology and Microsoft. Records information in secure, non-reproducible manner generating unique certificates. Brands already active: Bulgari, Cartier, Hublot, Louis Vuitton, Prada. Enables direct-to-consumer access to product history and proof of authenticity. LVMH Managing Director Toni Belloni: "The Aura Blockchain Consortium is a great opportunity for our sector to strengthen our connection with customers by offering them simple solutions to get to know our products better." Cartier CEO Cyrille Vigneron: "The Aura Consortium represents an unprecedented cooperation in the luxury industry. Blockchain is a key technology to enhance customer service, relationship with partners and traceability."',
      significance: 'THREE of the world\'s largest luxury conglomerates (LVMH, Prada, Richemont/Cartier) forming joint blockchain consortium represents unprecedented industry collaboration. ConsenSys (Ethereum infrastructure leader) providing technology validates Ethereum ecosystem for enterprise. Open to all luxury brands globally.',
      bmnrImplication: 'Major luxury houses building on ConsenSys/Ethereum infrastructure validates network for enterprise supply chain applications. Industry consortium approach creates network effects — more brands joining = more ecosystem value. Non-financial use case (authentication, traceability) expands Ethereum utility beyond DeFi.',
      impact: 'Bullish',
      source: 'Aura Blockchain Consortium Press Release'
    },
    // === 2020 HISTORICAL PROTOCOL EVENTS ===
    { 
      date: '2020-12-01', 
      category: 'Protocol', 
      company: 'Other',
      title: 'Beacon Chain Launch - Ethereum\'s Proof of Stake Testnet Goes Live', 
      summary: 'The Beacon Chain, Ethereum\'s Proof of Stake consensus layer, launches as the first major step in the Ethereum 2.0 roadmap. The Beacon Chain introduced a new PoS consensus protocol running parallel to the existing PoW mainnet. Early adopters could stake 32 ETH to become validators, earning rewards for proposing and attesting to blocks. Initially, staked ETH could not be withdrawn — validators committed to an indefinite lock-up period until The Merge and subsequent Shanghai upgrade. The Beacon Chain served as a proving ground for PoS mechanics, validator economics, and consensus security before full mainnet integration.',
      significance: 'Critical infrastructure milestone that de-risked Ethereum\'s transition to PoS. The Beacon Chain operated successfully for nearly two years before The Merge, demonstrating PoS viability at scale. Early stakers who committed ETH during this period accepted significant risk (no withdrawals, uncertain timeline) in exchange for founding validator status and accumulated rewards.',
      bmnrImplication: 'The Beacon Chain established the validator infrastructure and staking economics that BMNR now leverages. Understanding this history matters: Ethereum\'s PoS system has been battle-tested since late 2020, not just since The Merge. This operational track record reduces technical risk for BMNR\'s staking strategy.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
    // === 2021 HISTORICAL ENTERPRISE EVENTS ===
    { 
      date: '2021-07-29', 
      category: 'Enterprise', 
      company: 'Standard Chartered',
      title: 'Zodia Custody Receives FCA Registration - Commercial Operations Begin', 
      summary: 'Zodia Custody, joint venture between SC Ventures (Standard Chartered) and Northern Trust, receives FCA registration under UK Money Laundering Regulations and commences commercial operations. One of NINE cryptoasset businesses granted FCA registration in UK. Providing custody for Bitcoin and Ethereum — the two most traded cryptoassets — with plans to expand based on client demand. Combines traditional custody principles with fintech agility. CEO Maxime De Guillebon: "We deliver bank-grade cryptoasset custody to a standard expected of world-leading global custodians, having been developed with long-established best practices and regulatory compliance in mind." Northern Trust Pete Cherecwich: "The FCA registration marks a significant milestone. Zodia\'s robust capabilities now make it possible to support institutional asset owners, family offices and asset managers around the world."',
      significance: 'FCA registration milestone for bank-backed crypto custody. Standard Chartered ($800B+ assets) and Northern Trust ($16T+ AUC) bringing institutional custody standards to crypto. One of earliest FCA-registered crypto businesses demonstrates regulatory path for traditional finance.',
      bmnrImplication: 'Bank-grade crypto custody infrastructure enables institutional ETH allocation. Standard Chartered/Northern Trust entering crypto custody validates asset class for traditional finance. Custody infrastructure is prerequisite for corporate treasury strategies like BMNR.',
      impact: 'Bullish', 
      source: 'Standard Chartered / Northern Trust Press Release' 
    },
    // === 2020 HISTORICAL ENTERPRISE EVENTS ===
    { 
      date: '2020-12-09', 
      category: 'Enterprise', 
      company: 'Standard Chartered',
      title: 'Standard Chartered & Northern Trust Announce Zodia Custody Joint Venture', 
      summary: 'SC Ventures (Standard Chartered) and Northern Trust announce joint venture to launch Zodia Custody, an institutional-grade cryptocurrency custody solution. Target launch: London 2021, pending FCA registration. Will provide custody for most-traded cryptoassets: Bitcoin, Ethereum, XRP, Litecoin, Bitcoin Cash (~80% of crypto trading volume, ~$395B at time). Combines bank risk management, compliance, and governance with crypto innovation. Context: Cryptocurrencies represent 0.3% of world\'s currency/bank deposits with 32% CAGR projected 2019-2024. Institutional investors account for only 9% of crypto investment. Alex Manson (SC Ventures): "We believe cryptoassets as an asset class is here to stay. We set up Zodia Custody to serve institutional investors who want to invest in a sustainable, safe and responsible way." Northern Trust: First blockchain deployment for private equity market (2017), fractionalized blockchain bond (2020).',
      significance: 'Two major financial institutions ($800B+ and $16T+ combined) committing to crypto custody infrastructure. Standard Chartered (160 years heritage) and Northern Trust creating institutional-grade custody. Signals traditional finance recognizes crypto as permanent asset class requiring proper infrastructure.',
      bmnrImplication: 'Standard Chartered/Northern Trust JV announcement marked major inflection point for institutional crypto infrastructure. Bank commitment to crypto custody pre-dated most institutional adoption. Early infrastructure investment enabled subsequent wave of institutional adoption.',
      impact: 'Bullish', 
      source: 'Standard Chartered / Northern Trust Press Release' 
    },
    // === 2019 HISTORICAL ENTERPRISE EVENTS ===
    { 
      date: '2019-09-12', 
      category: 'Enterprise', 
      company: 'Santander',
      title: 'Santander Issues First End-to-End Blockchain Bond on Public Ethereum', 
      summary: 'Banco Santander issues FIRST end-to-end blockchain bond ever — $20M bond issued directly on public Ethereum blockchain. Bond will exist ONLY on blockchain to maturity — first step toward secondary market for security tokens. Quarterly coupon: 1.98%, one-year maturity. The cash used for delivery-versus-payment AND quarterly coupons also tokenized on blockchain. Reduced intermediaries, making transaction faster, more efficient, simpler. Santander Securities Services: tokenization agent and key custodian. Support from London fintech Nivaura (Santander InnoVentures invested). CFO José García Cantera: "Santander is at the forefront of the profound digital transformation of the financial sector and this transaction is one example." CIB Head José María Linares: "This blockchain-issued bond puts Santander at the forefront of capital markets innovation." Started in Santander blockchain lab in 2016.',
      significance: 'WORLD\'S FIRST end-to-end blockchain bond on public Ethereum. Predates nearly all institutional blockchain adoption. Major European bank ($1.5T assets) choosing public Ethereum in 2019 demonstrates early institutional recognition of network value. Tokenized cash + coupons showed full lifecycle on-chain viability.',
      bmnrImplication: 'Santander 2019 bond was earliest proof that public Ethereum could support institutional securities. This predates DeFi Summer, The Merge, ETH ETFs, and the tokenization wave by years. Historical context validates that institutional Ethereum adoption has deep roots — not just recent hype.',
      impact: 'Bullish', 
      source: 'Santander Press Release' 
    },
    // === 2017 HISTORICAL ENTERPRISE EVENTS ===
    { 
      date: '2017-12-11', 
      category: 'Enterprise', 
      company: 'UBS',
      title: 'UBS Leads MiFID II Data Reconciliation Consortium Using Ethereum Smart Contracts', 
      summary: 'UBS, Barclays, Credit Suisse, KBC, SIX, and Thomson Reuters advance an initiative to improve counterparty reference data quality through anonymous reconciliation using Ethereum smart contracts. Running on permissioned Ethereum blockchain on Microsoft Azure, the project addresses MiFID II/MiFIR regulatory requirements (effective Jan 3, 2018) by reconciling Legal Entity Identifier (LEI) reference data across institutions. Data is cryptographically hashed at each institution; only hashed data submitted to blockchain for consensus reconciliation. Pilot tested 22,000 non-sensitive LEI attributes for cash equity issuers. UBS Head of Data Christophe Tummers: "Through using blockchain-inspired smart contracts, the reconciliation of data can happen in almost real-time for all participants, anonymously." Credit Suisse Emmanuel Aidoo: "This establishes blockchain benefits in a broader context than clearing and settlement."',
      significance: 'EARLIEST major institutional consortium using Ethereum smart contracts for regulatory compliance. Six Tier 1 financial institutions (Barclays, Credit Suisse, KBC, SIX, Thomson Reuters, UBS) collaborating on blockchain solution. Demonstrates enterprise Ethereum utility for data reconciliation beyond trading/settlement. Predates most institutional blockchain initiatives by years.',
      bmnrImplication: 'This 2017 consortium represents the genesis of institutional Ethereum adoption. UBS, Credit Suisse, Barclays exploring Ethereum 8 years ago validates the long-term institutional thesis. Early enterprise experimentation laid groundwork for current tokenization wave. Historical context: institutions were building on Ethereum before DeFi, before stablecoins, before NFTs.',
      impact: 'Bullish', 
      source: 'UBS Press Release' 
    },
    // === 2015 HISTORICAL PROTOCOL EVENTS ===
    { 
      date: '2015-07-30', 
      category: 'Protocol', 
      company: 'Other',
      title: 'Ethereum Mainnet Launch - Genesis Block Created', 
      summary: 'Ethereum mainnet launches with the creation of the genesis block, introducing the world\'s first blockchain capable of general-purpose computing via smart contracts. Unlike Bitcoin\'s single-purpose ledger, Ethereum\'s open-source code enabled decentralized applications (DApps) to interact with one another, creating programmable features for blockchain technology. The network launched with Proof of Work consensus, requiring miners to solve cryptographic puzzles to validate transactions. Key use cases from inception: peer-to-peer transactions, global transfers, cross-border payments, and programmable money — all while maintaining trustless, permissionless access for anyone to participate.',
      significance: 'The birth of programmable blockchain technology. Ethereum\'s launch created the foundation for everything that followed: DeFi ($60B+ TVL), stablecoins ($150B+ market cap), NFTs, tokenized real-world assets, Layer 2 scaling solutions, and institutional adoption. Without Ethereum, there would be no USDC, no BlackRock BUIDL, no on-chain treasury management — and no BMNR thesis.',
      bmnrImplication: 'Essential historical context. BMNR\'s entire value proposition — holding ETH as a treasury asset that generates staking yield while providing exposure to blockchain infrastructure growth — traces directly back to this moment. Understanding Ethereum\'s 10-year evolution from experimental technology to institutional-grade infrastructure helps contextualize why BMNR believes ETH is the optimal treasury asset for the next decade.',
      impact: 'Bullish', 
      source: 'Visa Crypto Research' 
    },
  ];
  
  const categories = ['All', 'Enterprise', 'DeFi', 'L2', 'Institutional', 'Protocol', 'Regulatory'];
  const companies = ['All', 'BlackRock', 'JPMorgan', 'Visa', 'Franklin Templeton', 'Fidelity', 'Coinbase', 'Sony', 'Goldman Sachs', 'State Street', 'Interactive Brokers', 'Societe Generale', 'Deutsche Bank', 'Bit Digital', 'Siemens', 'Telcoin', 'Shift4', 'Sentient Jet', 'GoTyme Bank', 'A+ Protocol', 'Ostium', 'Tetra Digital', 'DAMAC Properties', 'WisdomTree', 'Securitize', 'Paysafe', 'Guggenheim', 'UBS', 'Mastercard', 'DBS', 'HSBC', 'Citi', 'Standard Chartered', 'Santander', 'EIB', 'ANZ', 'ABN AMRO', 'HKMA', 'Other'];
  
  // Filter by both category and company
  const filteredNews = adoptionTimeline.filter(n => {
    const categoryMatch = timelineFilter === 'All' || n.category === timelineFilter;
    const companyMatch = companyFilter === 'All' || n.company === companyFilter;
    return categoryMatch && companyMatch;
  });
  
  // Version 1: Comprehensive Dashboard (Best)
  const V1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Hero: BMNR-ETH Correlation */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#eth-correlation</div>
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))', borderRadius: 16, padding: 24, border: '1px solid rgba(139,92,246,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>BMNR ↔ ETH Correlation</h3>
            <p style={{ fontSize: 13, color: 'var(--text3)' }}>BMNR functions as a leveraged ETH proxy — tracking Ethereum ecosystem health is essential</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Space Mono', color: 'var(--violet)' }}>${ethPrice.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>ETH Price</div>
          </div>
        </div>
        
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#eth-metrics</div>
        <div className="g4">
          <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>NAV per Share</div>
            <div style={{ fontSize: 22, fontFamily: 'Space Mono', color: 'var(--mint)' }}>${navPerShare.toFixed(2)}</div>
            <div style={{ fontSize: 11, color: navPremium >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
              {navPremium >= 0 ? '+' : ''}{navPremium.toFixed(1)}% {navPremium >= 0 ? 'premium' : 'discount'}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>ETH per Share</div>
            <div style={{ fontSize: 22, fontFamily: 'Space Mono', color: 'var(--sky)' }}>{ethPerShare.toFixed(4)}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Your fractional ETH</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Implied ETH Price</div>
            <div style={{ fontSize: 22, fontFamily: 'Space Mono', color: 'var(--gold)' }}>${impliedEthPrice.toFixed(0)}</div>
            <div style={{ fontSize: 11, color: impliedEthPrice > ethPrice ? 'var(--mint)' : 'var(--coral)' }}>
              vs ${ethPrice.toLocaleString()} spot
            </div>
          </div>
          <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>NAV Sensitivity</div>
            <div style={{ fontSize: 22, fontFamily: 'Space Mono', color: 'var(--violet)' }}>${navSensitivity.toFixed(2)}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>per $100 ETH move</div>
          </div>
        </div>
      </div>
      
      {/* Ecosystem Metrics */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#network-metrics</div>
      <div className="card">
        <div className="card-title">Ethereum Network Metrics</div>
        <div className="g4" style={{ }}>
          <div style={{ background: 'var(--surface2)', padding: 14, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: 'Space Mono', color: 'var(--mint)', fontWeight: 600 }}>{ecosystemMetrics.stakingRate}%</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>ETH Staked</div>
          </div>
          <div style={{ background: 'var(--surface2)', padding: 14, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: 'Space Mono', color: 'var(--sky)', fontWeight: 600 }}>${ecosystemMetrics.defiTVL}B</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>DeFi TVL</div>
          </div>
          <div style={{ background: 'var(--surface2)', padding: 14, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: 'Space Mono', color: 'var(--violet)', fontWeight: 600 }}>${ecosystemMetrics.l2TVL}B</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>L2 TVL</div>
          </div>
          <div style={{ background: 'var(--surface2)', padding: 14, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontFamily: 'Space Mono', color: 'var(--gold)', fontWeight: 600 }}>{ecosystemMetrics.supplyGrowth}%</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Supply Growth</div>
          </div>
        </div>
        <div className="g3">
          <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Validators</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--text)' }}>{(ecosystemMetrics.validatorCount / 1000).toFixed(0)}K</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Daily Active Addresses</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--text)' }}>{(ecosystemMetrics.dailyActiveAddresses / 1000).toFixed(0)}K</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Avg Gas (Gwei)</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--text)' }}>{ecosystemMetrics.avgGasFee}</span>
            </div>
          </div>
          <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Network Revenue (24h)</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--mint)' }}>${ecosystemMetrics.networkRevenue24h}M</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>ETH Burned (24h)</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--coral)' }}>{ecosystemMetrics.burnRate24h}K ETH</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Total ETH Staked</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--text)' }}>{ecosystemMetrics.totalStaked}M</span>
            </div>
          </div>
          <div style={{ padding: 12, background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(139,92,246,0.1))', borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--mint)', fontWeight: 600 }}>Why This Matters for BMNR</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>
              Higher network activity → More fees → More ETH burned → Deflationary pressure → ETH price appreciation → BMNR NAV growth
            </div>
          </div>
        </div>
      </div>
      
      {/* ETF Flows */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#etf-flows</div>
      <div className="card">
        <div className="card-title">Institutional Flows (ETH ETFs)</div>
        <div className="g2" style={{ }}>
          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontFamily: 'Space Mono', color: 'var(--mint)', fontWeight: 600 }}>${etfData.totalAUM}B</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Total ETF AUM</div>
          </div>
          <div style={{ background: 'var(--surface2)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontFamily: 'Space Mono', color: etfData.netFlows7d >= 0 ? 'var(--mint)' : 'var(--coral)', fontWeight: 600 }}>
              {etfData.netFlows7d >= 0 ? '+' : ''}${etfData.netFlows7d}M
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>7-Day Net Flows</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {etfData.topHolders.map((etf, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface2)', borderRadius: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{etf.name}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontFamily: 'Space Mono', color: 'var(--text2)' }}>${etf.aum}B</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: etf.change >= 0 ? 'var(--mint)' : 'var(--coral)', minWidth: 60, textAlign: 'right' }}>
                  {etf.change >= 0 ? '+' : ''}{etf.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future of Finance Thesis */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#fut-header</div>
      <h3>Is Ethereum the Future of Finance?</h3>

      {/* Institutional Adoption Evidence */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#institutional-adoption</div>
      <div className="card">
        <div className="card-title">Institutional Adoption Evidence</div>
        <div style={{ padding: 16, background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,212,170,0.1))', borderRadius: 8 }}>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, fontStyle: 'italic' }}>
            "The evidence suggests a fundamental shift: the world's largest financial institutions are no longer asking <em>if</em> they should build on Ethereum, but <em>how fast</em> they can deploy."
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Evidence Point 1 */}
          <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--violet)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>💰 TradFi Giants Are All-In</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              BlackRock ($10T+ AUM) launched BUIDL tokenized fund on Ethereum, now filing for staked ETH ETF. Fidelity ($5.8T AUM) launching FIDD stablecoin on Ethereum. Franklin Templeton preparing institutional money market funds for tokenized distribution. These aren't experiments — they're production deployments.
            </div>
          </div>

          {/* Evidence Point 2 */}
          <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--mint)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>🏛️ Regulatory Clarity Enabling Scale</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              The GENIUS Act provides clear stablecoin guardrails. Telcoin launched the first US bank-issued stablecoin (eUSD) under this framework. Franklin Templeton retrofitting Rule 2a-7 funds for compliance. Regulation is now an enabler, not a blocker.
            </div>
          </div>

          {/* Evidence Point 3 */}
          <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--sky)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>🌍 Global Payment Rails Integrating</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              Mastercard partnering with ADI Foundation for stablecoin payments. HSBC, Ant International & Swift completed cross-border tokenized deposits POC using EVM/ERC-20 standards. Shift4 offering Ethereum stablecoin settlement to hundreds of thousands of merchants.
            </div>
          </div>

          {/* Evidence Point 4 */}
          <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--gold)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>🌐 Emerging Markets Onboarding</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
              ADI Chain (Ethereum L2) partnering with M-Pesa to bring 60M+ African users onchain. Abu Dhabi's IHC backing institutional L2 infrastructure. UAE Central Bank regulating Dirham stablecoin. Financial inclusion happening on Ethereum rails.
            </div>
          </div>
        </div>
      </div>

      {/* Value Accrual Mechanics */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#value-accrual-mechanics</div>
      <div className="card">
        <div className="card-title">Value Accrual Mechanics</div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: -8 }}>How institutional adoption translates to ETH value — a framework for analyzing network economics</div>

        {/* Step 1: Settlement Layer Capture */}
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>1. Settlement Layer Market Capture</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Tokenized assets require blockchain settlement infrastructure</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(139,92,246,0.2)', color: 'var(--violet)', borderRadius: 4 }}>TAM Analysis</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current State</div>
              <div>• Stablecoin market: ~$310B supply</div>
              <div>• Tokenized treasuries: ~$3B (BUIDL, BENJI, etc.)</div>
              <div>• Ethereum L1+L2 settlement share: ~65%</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>2030 Projections</div>
              <div>• Stablecoin market: $2T+ (Citi, Standard Chartered)</div>
              <div>• Tokenized RWAs: $16T (BCG), $30T (Standard Chartered)</div>
              <div>• Global settlement volume addressable: $500T+/year</div>
            </div>
          </div>
          <div style={{ padding: 10, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
            <span style={{ color: 'var(--text3)' }}>Settlement Capture Rate = </span>
            <span style={{ color: 'var(--mint)' }}>(ETH L1/L2 Volume ÷ Total Tokenized Volume)</span>
            <span style={{ color: 'var(--text3)' }}> × </span>
            <span style={{ color: 'var(--violet)' }}>Fee Revenue per $1 Settled</span>
          </div>
        </div>

        {/* Step 2: EIP-1559 Burn Mechanics */}
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--mint)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>2. EIP-1559 Deflationary Mechanics</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Transaction fees create permanent supply reduction</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(0,212,170,0.2)', color: 'var(--mint)', borderRadius: 4 }}>Monetary Policy</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Burn Mechanism</div>
              <div>• Base fee burned per transaction (not paid to validators)</div>
              <div>• ~4.3M ETH burned since EIP-1559 (Aug 2021)</div>
              <div>• High activity periods: net deflationary supply</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Economic Model</div>
              <div>• Issuance: ~0.5-1% annually (PoS rewards)</div>
              <div>• Burn rate: variable based on network demand</div>
              <div>• Net supply change = Issuance − Burn</div>
            </div>
          </div>
          <div style={{ padding: 10, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
            <span style={{ color: 'var(--text3)' }}>Supply Impact = </span>
            <span style={{ color: 'var(--coral)' }}>−(Base Fee × Gas Used)</span>
            <span style={{ color: 'var(--text3)' }}> + </span>
            <span style={{ color: 'var(--mint)' }}>(Block Reward × Validators)</span>
            <span style={{ color: 'var(--text3)' }}> → </span>
            <span style={{ color: 'var(--gold)' }}>Deflationary when Burn {'>'} Issuance</span>
          </div>
        </div>

        {/* Step 3: Staking Yield Economics */}
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--sky)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>3. Staking Yield as Risk-Free Rate Proxy</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>ETH staking provides protocol-native yield analogous to sovereign bonds</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(100,149,237,0.2)', color: 'var(--sky)', borderRadius: 4 }}>Yield Analysis</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Yield Components</div>
              <div>• Consensus rewards: ~2.8% base APY</div>
              <div>• Execution layer tips: +0.5-1.5% variable</div>
              <div>• MEV revenue share: +0.3-0.8% variable</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Institutional Comparison</div>
              <div>• US 10Y Treasury: ~4.5% (USD denominated)</div>
              <div>• ETH Staking: ~3.5-4.5% (ETH denominated)</div>
              <div>• Key difference: ETH yield + price appreciation</div>
            </div>
          </div>
          <div style={{ padding: 10, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
            <span style={{ color: 'var(--text3)' }}>Total Return = </span>
            <span style={{ color: 'var(--sky)' }}>Staking APY</span>
            <span style={{ color: 'var(--text3)' }}> + </span>
            <span style={{ color: 'var(--mint)' }}>ETH Price Δ</span>
            <span style={{ color: 'var(--text3)' }}> − </span>
            <span style={{ color: 'var(--coral)' }}>Slashing Risk (~0.001%)</span>
          </div>
        </div>

        {/* Step 4: Network Effects & Moat */}
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>4. Network Effects & Competitive Moat</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Metcalfe's Law dynamics create winner-take-most outcomes in settlement infrastructure</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(255,193,7,0.2)', color: 'var(--gold)', borderRadius: 4 }}>Moat Analysis</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Network Effect Drivers</div>
              <div>• Liquidity depth: $50B+ DEX volume/month</div>
              <div>• Developer ecosystem: 4,000+ monthly active devs</div>
              <div>• Composability: 2,500+ DeFi protocols</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Switching Cost Factors</div>
              <div>• Smart contract migration complexity</div>
              <div>• Liquidity fragmentation risk</div>
              <div>• Security track record (9+ years)</div>
            </div>
          </div>
          <div style={{ padding: 10, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
            <span style={{ color: 'var(--text3)' }}>Network Value ∝ </span>
            <span style={{ color: 'var(--gold)' }}>n²</span>
            <span style={{ color: 'var(--text3)' }}> where n = </span>
            <span style={{ color: 'var(--mint)' }}>(Users × Developers × Liquidity × Integrations)</span>
          </div>
        </div>

        {/* Step 5: BMNR Value Capture */}
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--coral)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>5. BMNR Treasury Strategy Value Capture</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Corporate treasury structure provides leveraged exposure to ETH ecosystem growth</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(255,107,107,0.2)', color: 'var(--coral)', borderRadius: 4 }}>BMNR Thesis</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Treasury Economics</div>
              <div>• Holdings: 4.28M ETH (3.55% of supply)</div>
              <div>• Staking rate: 67.6% of holdings</div>
              <div>• Yield generation: ~$120M annually at current rates</div>
            </div>
            <div>
              <div style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Equity Value Drivers</div>
              <div>• NAV = ETH Holdings × ETH Price</div>
              <div>• Premium/Discount to NAV (market sentiment)</div>
              <div>• Operating leverage from capital markets access</div>
            </div>
          </div>
          <div style={{ padding: 10, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
            <span style={{ color: 'var(--text3)' }}>BMNR Return = </span>
            <span style={{ color: 'var(--mint)' }}>(ETH Δ × Holdings)</span>
            <span style={{ color: 'var(--text3)' }}> + </span>
            <span style={{ color: 'var(--sky)' }}>(Staking Yield × Staked %)</span>
            <span style={{ color: 'var(--text3)' }}> + </span>
            <span style={{ color: 'var(--violet)' }}>NAV Premium Expansion</span>
          </div>
        </div>

        {/* Bottom line */}
        <div style={{ padding: 12, background: 'linear-gradient(135deg, rgba(0,212,170,0.15), rgba(139,92,246,0.15))', borderRadius: 8, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--mint)', fontWeight: 600 }}>The Investment Case</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
            When the world's largest asset managers, payment networks, and banks all choose the same settlement layer, that's not speculation — that's infrastructure becoming standard. BMNR's thesis is that owning the asset that secures this infrastructure (ETH) is the trade of the decade.
          </div>
        </div>
      </div>

      {/* Protocol Roadmap */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#protocol-roadmap</div>
      <div className="card">
        <div className="card-title">Ethereum Protocol Roadmap</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {protocolRoadmap.map((item, i) => (
            <div key={i} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: `3px solid ${item.impact === 'Very High' ? 'var(--violet)' : item.impact === 'High' ? 'var(--mint)' : 'var(--sky)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{item.name}</span>
                <div style={{ display: 'flex' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: item.status === 'Testing' ? 'rgba(0,212,170,0.2)' : item.status === 'Development' ? 'rgba(100,149,237,0.2)' : 'rgba(139,92,246,0.2)', color: item.status === 'Testing' ? 'var(--mint)' : item.status === 'Development' ? 'var(--sky)' : 'var(--violet)' }}>{item.status}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: 'var(--surface)', color: 'var(--text3)' }}>{item.date}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ethereum Adoption Timeline - matches Timeline tab structure */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#adoption-timeline</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
        <span>Ethereum Adoption Timeline</span>
        <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text3)' }}>({filteredNews.length} events)</span>
      </h3>
      {/* Company Filter (like Topic filter in Timeline tab) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#company-filter</div>
      <div className="highlight" style={{ padding: 16 }}>
        <p style={{ color: 'var(--text2)', marginBottom: 8 }}>Track news about the <strong>ETH ecosystem</strong> — institutional adoption, stablecoin launches, L2 growth, protocol upgrades, and enterprise partnerships building on Ethereum</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginBottom: 16 }}>Asset-level news affecting ETH value and BMNR's NAV</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Filter by Company</span>
          {companyFilter !== 'All' && (
            <button 
              onClick={() => setCompanyFilter('All')}
              className="pill"
              style={{ fontSize: 11 }}
            >
              Clear
            </button>
          )}
        </div>
        <div className="pills">
          {companies.map(comp => {
            const isSelected = companyFilter === comp;
            const count = adoptionTimeline.filter(n => n.company === comp).length;
            return (
              <button
                key={comp}
                onClick={() => setCompanyFilter(comp)}
                className={`pill ${isSelected ? 'active' : ''}`}
              >
                {comp} ({comp === 'All' ? adoptionTimeline.length : count})
              </button>
            );
          })}
        </div>
        {companyFilter !== 'All' && (
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>
            {companyFilter} → {filteredNews.length} results
          </div>
        )}
      </div>
      
      {/* Category pills row with Expand All button (like Timeline tab) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#category-filter</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="pills" style={{ }}>
          {categories.map(cat => (
            <button key={cat} className={`pill ${timelineFilter === cat ? 'active' : ''}`} onClick={() => setTimelineFilter(cat)}>
              {cat === 'All' ? `All (${adoptionTimeline.length})` : `${cat} (${adoptionTimeline.filter(n => n.category === cat).length})`}
            </button>
          ))}
        </div>
        <button 
          className="pill"
          onClick={() => {
            if (expandedNews.size === filteredNews.length) {
              setExpandedNews(new Set());
            } else {
              setExpandedNews(new Set(filteredNews.map((_, i) => i)));
            }
          }}
          style={{ whiteSpace: 'nowrap' }}
        >
          {expandedNews.size === filteredNews.length ? '⊟ Collapse All' : '⊞ Expand All'}
        </button>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#adoption-events</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredNews.map((news, i) => {
            const isExpanded = expandedNews.has(i);
            return (
              <div
                key={i}
                style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, cursor: 'pointer', borderLeft: `3px solid ${news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--coral)' : 'var(--sky)'}` }}
                onClick={() => {
                  const next = new Set(expandedNews);
                  if (isExpanded) next.delete(i);
                  else next.add(i);
                  setExpandedNews(next);
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: 'var(--text3)' }}>{news.date}</span>
                      <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, background: 'rgba(139,92,246,0.2)', color: 'var(--violet)' }}>{news.category}</span>
                      <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, background: 'rgba(59,130,246,0.2)', color: 'var(--sky)' }}>{news.company}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{news.title}</div>
                  </div>
                  <span style={{ fontSize: 12, color: news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--coral)' : 'var(--sky)', marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {news.impact === 'Bullish' ? '↑' : news.impact === 'Bearish' ? '↓' : '→'} {news.impact}
                  </span>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    {/* Summary */}
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{news.summary}</div>
                    
                    {/* Significance */}
                    {news.significance && (
                      <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 8, borderLeft: '3px solid var(--violet)' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--violet)' }}>📊 SIGNIFICANCE FOR ETHEREUM</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.significance}</div>
                      </div>
                    )}
                    
                    {/* BMNR Implication */}
                    {news.bmnrImplication && (
                      <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 8, borderLeft: '3px solid var(--mint)' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--mint)' }}>💰 BMNR IMPLICATION</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.bmnrImplication}</div>
                      </div>
                    )}
                    
                    {/* Source */}
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>Source: {news.source}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Ethereum Fundamentals" items={[
        { term: 'ETH as Productive Asset', def: 'Unlike BTC, ETH generates yield via staking (~3-4% APY). Network also burns fees (EIP-1559), creating potential deflation. Both increase fundamental value.' },
        { term: 'Network Effects', def: 'Ethereum hosts 60%+ of DeFi TVL, majority of NFTs, and most L2s. Developer mindshare and liquidity create strong network effects and switching costs.' },
        { term: 'L2 Scaling Thesis', def: 'Rollups (Arbitrum, Optimism, Base) scale Ethereum while paying fees to L1. More L2 activity = more ETH demand for settlement and data availability.' },
        { term: 'Institutional Adoption', def: 'ETH ETFs, BlackRock BUIDL fund, enterprise L2s signal institutional acceptance. Drives long-term demand and reduces volatility over time.' },
        { term: 'Protocol Upgrades', def: 'Ethereum roadmap executing on schedule. Pectra (Nov 2025) and Fusaka (Dec 2025) now live. Next: Verkle Trees, Danksharding. Successful upgrades improve scalability and UX.' },
        { term: 'BMNR Correlation', def: 'BMNR stock price highly correlated with ETH. Tracking ecosystem health is essential for BMNR thesis — positive ETH catalysts are positive BMNR catalysts.' },
      ]} />
    </div>
  );
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#ethereum-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Ethereum Ecosystem<UpdateIndicators sources={['PR', 'SEC']} /></h2>
      <V1 />
    </div>
  );
};

// TIMELINE TAB - Historical tracking of BMNR company updates and filings
const TimelineTab = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(new Set());
  const [secFilter, setSecFilter] = useState('All');
  const [showAllFilings, setShowAllFilings] = useState(false);
  
  // SEC Filings data - update when new filings are processed
  const secFilings = [
    { date: 'Jan 15, 2026', type: '8-K', description: '2026 Annual Stockholder Meeting + Investor Presentation', period: '—', color: 'yellow' },
    { date: 'Jan 13, 2026', type: '10-Q', description: 'Quarterly Report (Q1 FY2026) - First Staking Revenue', period: 'Q1 2026', color: 'purple' },
    { date: 'Jan 2, 2026', type: 'DEFA14A', description: 'Proxy Solicitation - Chairman\'s Message', period: '—', color: 'cyan' },
    { date: 'Jan 2, 2026', type: '8-K', description: 'Vote YES on Auth Shares (500M→50B)', period: '—', color: 'yellow' },
    { date: 'Nov 21, 2025', type: '10-K', description: 'Annual Report (First Post-Pivot)', period: 'FY 2025', color: 'blue' },
    { date: 'Sep 22, 2025', type: '424B5', description: '$365M Registered Direct @ $70 + Warrants', period: '—', color: 'orange' },
    { date: 'Jul 9, 2025', type: 'S-3', description: '$2B ATM Shelf Registration', period: '—', color: 'green' },
    { date: 'Jul 3, 2025', type: '10-Q', description: 'Quarterly Report (Q3 FY2025)', period: 'Q3 2025', color: 'purple' },
    { date: 'Jun 30, 2025', type: '8-K', description: 'ETH Treasury Strategy Announced', period: '—', color: 'yellow' },
    { date: 'Jun 20, 2025', type: 'S-8', description: '2025 Equity Incentive Plan (3.75M shares)', period: '—', color: 'cyan' },
    { date: 'Jun 4, 2025', type: '424B5', description: 'IPO Prospectus ($18M @ $8/share)', period: '—', color: 'orange' },
    { date: 'May 27, 2025', type: 'S-1', description: 'IPO Registration Statement', period: '—', color: 'violet' },
    { date: 'Apr 14, 2025', type: '10-Q', description: 'Quarterly Report (Q2 FY2025)', period: 'Q2 2025', color: 'purple' },
  ];
  
  // [PR_CHECKLIST_SECMETA] - Update lastPR with every PR!
  const secMeta = {
    cik: '0001829311',
    ticker: 'BMNR',
    exchange: 'NYSE American',
    lastPR: { date: 'February 2, 2026', title: '4.285M ETH Holdings + $10.7B Total + Staking 67.6%' }
  };
  
  const secTypeColors: Record<string, { bg: string; text: string }> = {
    '10-K': { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
    '10-Q': { bg: 'rgba(100,149,237,0.2)', text: 'var(--sky)' },
    '8-K': { bg: 'rgba(234,179,8,0.2)', text: 'var(--gold)' },
    'S-1': { bg: 'rgba(168,85,247,0.2)', text: 'var(--violet)' },
    'S-3': { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
    'S-8': { bg: 'rgba(34,211,238,0.2)', text: 'var(--cyan)' },
    '424B5': { bg: 'rgba(249,115,22,0.2)', text: '#fb923c' },
    'DEFA14A': { bg: 'rgba(34,211,238,0.2)', text: 'var(--cyan)' },
    'DEF 14A': { bg: 'rgba(34,211,238,0.2)', text: 'var(--cyan)' },
  };
  
  const secFilterTypes = ['All', '10-K', '10-Q', '8-K', 'S-1/S-3', '424B5'];
  
  const filteredFilings = secFilings.filter(f => {
    if (secFilter === 'All') return true;
    if (secFilter === 'S-1/S-3') return f.type === 'S-1' || f.type === 'S-3' || f.type === 'S-8' || f.type === 'DEFA14A' || f.type === 'DEF 14A';
    return f.type === secFilter;
  });
  
  const displayedFilings = showAllFilings ? filteredFilings : filteredFilings.slice(0, 6);
  const hiddenCount = filteredFilings.length - 6;
  
  /*
   * ╔═══════════════════════════════════════════════════════════════════════════════╗
   * ║  CRITICAL INSTRUCTION FOR AI MODELS (Claude, GPT, etc.)                       ║
   * ╠═══════════════════════════════════════════════════════════════════════════════╣
   * ║                                                                               ║
   * ║  🚨 NEVER MODIFY OR DELETE HISTORICAL PRESS RELEASE / SEC FILING DATA 🚨     ║
   * ║                                                                               ║
   * ║  This timeline array contains verified historical data from official BMNR    ║
   * ║  press releases and SEC filings. This data must be preserved for auditing.   ║
   * ║                                                                               ║
   * ║  IF NEW INFORMATION CONTRADICTS OLD DATA:                                     ║
   * ║  1. DO NOT delete or modify the old entry                                     ║
   * ║  2. Add a new entry with the correction, referencing the old data             ║
   * ║  3. Add "⚠️ SUPERSEDED" prefix to the old entry's title                       ║
   * ║  4. Add a note in the old entry: "See [DATE] entry for updated figures"       ║
   * ║                                                                               ║
   * ║  EXAMPLE OF CORRECTION:                                                       ║
   * ║  Old entry: title: 'ETH Holdings Reach 3.5M'                                  ║
   * ║  Becomes:   title: '⚠️ SUPERSEDED: ETH Holdings Reach 3.5M'                   ║
   * ║             notes: '...See Dec 22 entry for corrected figures...'             ║
   * ║  New entry: title: 'CORRECTION: ETH Holdings Were 3.4M (not 3.5M)'            ║
   * ║                                                                               ║
   * ║  This ensures we maintain a complete audit trail of all official             ║
   * ║  communications, including any corrections or restatements.                   ║
   * ║                                                                               ║
   * ║  Last verified: January 15, 2026                                              ║
   * ║  Data sources: PRNewswire, SEC EDGAR, StockTitan                              ║
   * ╚═══════════════════════════════════════════════════════════════════════════════╝
   */
  
  // Audit log of BMNR company updates - chronological record of official filings and announcements
  // NEWEST ENTRIES AT TOP - maintain descending chronological order
  const timelineEvents = [
    // [PR_CHECKLIST_EVENT_TIMELINE] - Add new PR entry here at top!
    // === FEBRUARY 2, 2026 - ETH HOLDINGS + STAKING SURGE ===
    {
      date: '2026-02-02',
      source: 'PRNewswire',
      category: 'Holdings',
      title: '📊 ETH Holdings Reach 4.285M — $10.7B Total, Staking Explodes to 67.6%',
      changes: [
        { metric: 'ETH Holdings', previous: '4,243,338', new: '4,285,125', change: '+41,787 (+1.0%)' },
        { metric: 'ETH Price', previous: '$2,839', new: '$2,317', change: '-18.4% (Coinbase)' },
        { metric: 'ETH Supply %', previous: '3.52%', new: '3.55%', change: '+0.03pp (71% to 5%)' },
        { metric: 'Staked ETH', previous: '2,009,267', new: '2,897,459', change: '+888,192 (+44.2%)' },
        { metric: 'Staking Ratio', previous: '47.4%', new: '67.6%', change: '+20.2pp' },
        { metric: 'Total Cash', previous: '$682M', new: '$586M', change: '-$96M' },
        { metric: 'Eightco (ORBS)', previous: '$19M', new: '$20M', change: '+$1M' },
        { metric: 'Trading Rank', previous: '#91', new: '#105', change: '-14 ($1.1B/day)' },
        { metric: 'Total Holdings', previous: '$12.8B', new: '$10.7B', change: '-$2.1B (ETH price)' },
        { metric: 'Staking Revenue', previous: 'N/A', new: '$188M/yr', change: '+18% WoW annualized' },
      ],
      notes: 'ETH price dropped sharply (~$3,000→$2,317) but fundamentals strengthening: Ethereum daily txns hit ATH (2.5M via theblock.co), active addresses soared to ATH (1M daily). Tom Lee: "non-fundamental factors" explain weakness — leverage not returned since Oct 10th, gold "vortex" pulling risk appetite. Gold -9% on Jan 30 (4th largest daily drop) may signal near-term top (similar to Jan 22, 1980 pattern). Staking exploded +888K ETH to 2.9M (67.6% of holdings, largest staker in world). Annualized staking revenue $188M (up 18% WoW). MAVAN on track Q1 2026 (3 staking providers). GENIUS Act + SEC Project Crypto "transformational." Beast $200M closed. 193 BTC held.',
      impact: 'neutral'
    },
    // === JANUARY 26, 2026 - ETH HOLDINGS + DAVOS 2026 ===
    {
      date: '2026-01-26',
      source: 'PRNewswire',
      category: 'Holdings',
      title: '📊 ETH Holdings Reach 4.243M — $12.8B Total, Davos 2026 Bullish',
      changes: [
        { metric: 'ETH Holdings', previous: '4,203,036', new: '4,243,338', change: '+40,302 (+1.0%)' },
        { metric: 'ETH Price', previous: '$3,211', new: '$2,839', change: '-11.6% (Coinbase)' },
        { metric: 'ETH Supply %', previous: '3.48%', new: '3.52%', change: '+0.04pp' },
        { metric: 'Staked ETH', previous: '1,838,003', new: '2,009,267', change: '+171,264 (+9.3%)' },
        { metric: 'Total Cash', previous: '$979M', new: '$682M', change: '-$297M' },
        { metric: 'Eightco (ORBS)', previous: '$22M', new: '$19M', change: '-$3M' },
        { metric: 'Trading Rank', previous: '#60', new: '#91', change: '-31 ($1.2B/day)' },
        { metric: 'Total Holdings', previous: '$14.5B', new: '$12.8B', change: '-$1.7B (ETH price)' },
      ],
      notes: 'Davos 2026 sentiment strongly bullish on crypto/blockchain. Larry Fink (BlackRock): "Tokenization is necessary... if we have one common blockchain, we could reduce corruption." David Sacks (White House): "Banking and crypto will transform into a single digital asset industry." Bill Winters (Standard Chartered): "Most things will settle in digital form... this is the year when this is happening in scale." ETHBTC ratio climbing since mid-October as investors recognize Wall Street building on Ethereum. Staking income: $374M/yr at scale (2.81% CESR). MAVAN on track Q1 2026. Beast Industries $200M closed.',
      impact: 'positive'
    },
    // === JANUARY 20, 2026 - ETH HOLDINGS + SHAREHOLDER VOTE ===
    {
      date: '2026-01-20',
      source: 'PRNewswire',
      category: 'Holdings',
      title: '📊 ETH Holdings Reach 4.203M — $14.5B Total, 81% Shareholder YES',
      changes: [
        { metric: 'ETH Holdings', previous: '4,167,768', new: '4,203,036', change: '+35,268 (+0.8%)' },
        { metric: 'ETH Price', previous: '$3,119', new: '$3,211', change: '+2.9% (Coinbase)' },
        { metric: 'ETH Supply %', previous: '3.45%', new: '3.48%', change: '+0.03pp' },
        { metric: 'Staked ETH', previous: '1,256,083', new: '1,838,003', change: '+581,920 (+46.3%)' },
        { metric: 'Total Cash', previous: '$988M', new: '$979M', change: '-$9M (post Beast)' },
        { metric: 'Shareholder Vote', previous: 'Pending', new: '81% YES', change: '52.2% turnout' },
        { metric: 'Beast Industries', previous: 'Announced', new: 'CLOSED', change: '$200M invested' },
        { metric: 'Stockholders', previous: 'N/A', new: '500,000+', change: 'Individual investors' },
        { metric: 'Trading Rank', previous: '#67', new: '#60', change: '+7 ($1.5B/day)' },
      ],
      notes: 'Shareholder vote passed with 81% YES on Proposal 2 (share authorization 500M→50B), 52.2% of outstanding shares voted. Beast Industries $200M investment officially closed Jan 17. Staking surged to 1.838M ETH (43.7% of holdings, $5.9B value). 500,000+ individual stockholders. BMNR now #60 most traded US stock at $1.5B/day average volume. CESR rate: 2.81%. MAVAN remains on track for Q1 2026.',
      impact: 'positive'
    },
    // === JANUARY 15, 2026 - $200M BEAST INDUSTRIES INVESTMENT ===
    {
      date: '2026-01-15',
      source: 'PRNewswire',
      category: 'Corporate',
      title: '🦁 $200M Strategic Investment in Beast Industries (MrBeast)',
      changes: [
        { metric: 'Investment', previous: '$0', new: '$200M equity', change: 'Beast Industries' },
        { metric: 'Investor Base', previous: 'Institutions', new: '+ MrBeast/Beast Industries', change: 'Strategic partnership' },
        { metric: 'Target Audience', previous: 'Institutions', new: '+ GenZ/GenAlpha/Millennials', change: 'Demographic expansion' },
        { metric: 'Deal Close', previous: '—', new: 'Jan 19, 2026', change: 'Expected' },
        { metric: 'Annual Meeting', previous: '—', new: 'Jan 15, 2026', change: 'Wynn Las Vegas (today)' },
      ],
      notes: '$200M equity investment into Beast Industries (MrBeast - 450M+ YouTube subscribers, 5B monthly views). CEO Jeff Housenbold: "Their support is a strong validation of our vision." Tom Lee: "Beast Industries is the leading content creator of our generation with reach and engagement unmatched with GenZ, GenAlpha and Millennials." Exploring DeFi integration into Beast\'s upcoming financial services platform. Premier institutional investors reaffirmed: ARK (Cathie Wood), MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital, and Tom Lee. Annual Meeting livestreamed on X @bitmnr. Goal: acquiring 5% of ETH.',
      impact: 'positive'
    },
    // === JANUARY 13, 2026 - Q1 2026 10-Q FILING ===
    {
      date: '2026-01-13',
      source: 'SEC Filing (10-Q)',
      category: 'SEC Filing',
      title: '📋 Q1 2026 10-Q: $10.6B Digital Assets, First Staking Revenue',
      changes: [
        { metric: 'Period Covered', previous: '—', new: 'Nov 30, 2025', change: 'Q1 2026' },
        { metric: 'Digital Assets', previous: '$8.26B (FY25)', new: '$10.56B', change: '+$2.3B (+28%)' },
        { metric: 'ETH Holdings', previous: '2.38M (FY25)', new: '3,737,140', change: '+1.36M (+57%)' },
        { metric: 'Cash', previous: '$512M', new: '$888M', change: '+$376M (+73%)' },
        { metric: 'Total Assets', previous: '$8.8B', new: '$11.5B', change: '+$2.7B (+31%)' },
        { metric: 'Stockholders Equity', previous: '$8.69B', new: '$11.25B', change: '+$2.56B (+29%)' },
        { metric: 'Staking Revenue', previous: '$0', new: '$980K', change: 'First ever!' },
        { metric: 'Net Loss', previous: '$349M NI (FY25)', new: '$(5.2B)', change: 'Unrealized ETH loss' },
        { metric: 'Shares Outstanding', previous: '384M', new: '409M (Nov 30)', change: '+25M' },
      ],
      notes: 'First quarterly filing post-ETH pivot. Key highlights: (1) Digital assets grew to $10.56B (3.74M ETH @ $2,821 avg); (2) First staking revenue recognized: $980K; (3) Net loss of $5.2B driven almost entirely by $5.25B unrealized loss on ETH holdings due to price decline; (4) Cash position strengthened to $888M; (5) Eightco investment valued at $35.9M (up from $20M cost); (6) Material weakness in internal controls still being remediated. Chi Tsang confirmed as CEO (Nov 20), Young Kim as CFO/COO (Jan 7). Shares outstanding: 409M (Nov 30) → 455M (Jan 12).',
      impact: 'neutral'
    },
    // === JANUARY 12, 2026 - ETH HOLDINGS UPDATE ===
    {
      date: '2026-01-12',
      source: 'PRNewswire',
      category: 'Holdings',
      title: '📊 ETH Holdings Reach 4.168M — $14.0B Total Holdings',
      changes: [
        { metric: 'ETH Holdings', previous: '4,143,502', new: '4,167,768', change: '+24,266 (+0.6%)' },
        { metric: 'ETH Price', previous: '$3,196', new: '$3,119', change: '-2.4% (Coinbase)' },
        { metric: 'ETH Supply %', previous: '3.43%', new: '3.45%', change: '+0.02pp (70% to 5%)' },
        { metric: 'Staked ETH', previous: '659,219', new: '1,256,083', change: '+596,864 (+90.5%)' },
        { metric: 'Total Cash', previous: '$915M', new: '$988M', change: '+$73M (+8%)' },
        { metric: 'Trading Rank', previous: '#44', new: '#67', change: '-23 ($1.3B/day)' },
        { metric: 'Shares Outstanding', previous: '426M', new: '434M', change: '+8M' },
      ],
      notes: 'Tom Lee urges stockholders to vote YES on proposal #2 (authorized shares increase from 500M to 50B). Staking scaled massively: +596,864 ETH staked in one week to 1.256M total (30% of holdings). MAVAN on track Q1 2026. At scale staking = $374M/yr (>$1M/day). Annual Meeting Jan 15 @ Wynn Las Vegas. BMNR now 70% of the way to "Alchemy of 5%". Tom Lee 2026 thesis: "crypto prices recover with stronger gains in 2027-2028." GENIUS Act compared to Aug 15, 1971 (end of Bretton Woods).',
      impact: 'positive'
    },
    // === JANUARY 9, 2026 - CFO/COO APPOINTMENT ===
    {
      date: '2026-01-09',
      source: 'PRNewswire',
      category: 'Corporate',
      title: '👔 CFO/COO Appointed: Young Kim (MIT/HBS, Columbia Threadneedle)',
      changes: [
        { metric: 'CFO', previous: 'Vacant (Mow Jan 16)', new: 'Young Kim', change: 'Effective immediately' },
        { metric: 'COO', previous: 'N/A', new: 'Young Kim (dual role)', change: 'New position' },
        { metric: 'Board', previous: '—', new: '+Young Kim', change: 'Reports to Tom Lee' },
        { metric: 'Background', previous: '—', new: 'MIT + HBS', change: '"Engineer-investor"' },
        { metric: 'Experience', previous: '—', new: '20+ years', change: 'Multi-billion AUM' },
      ],
      notes: 'Young Kim appointed CFO and COO, effective immediately. Also joins Board of Directors, reports to Tom Lee. Background: MIT engineering + Harvard Business School. 2021-2025: Partner & Senior PM at Axiom Investors. 2011-2021: Senior PM at Columbia Threadneedle Investments. Early career: software engineer, VC, investment research. Tom Lee: "[Young] will play an integral role in helping to execute our roadmap and scale the business." Kim: "With a strong foundation in place, Bitmine is well positioned to scale." Also confirmed: 3.43% ETH supply, Annual Meeting Jan 15 @ Wynn Las Vegas. Institutional backers: ARK, MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital.',
      impact: 'positive'
    },
    // === JANUARY 5, 2026 - 8-K ETH HOLDINGS UPDATE ===
    {
      date: '2026-01-05',
      source: 'SEC Filing (8-K)',
      category: 'Holdings',
      title: '📊 8-K: ETH Holdings $14.2B - 4.144M ETH Milestone',
      changes: [
        { metric: 'ETH Holdings', previous: '4,110,525', new: '4,143,502', change: '+32,977 (+0.8%)' },
        { metric: 'ETH Price', previous: '$2,948', new: '$3,196', change: '+8.4% (Coinbase)' },
        { metric: 'Holdings Value', previous: '$13.2B', new: '$14.2B', change: '+$1.0B (+7.6%)' },
        { metric: 'Staked ETH', previous: '408,627', new: '659,219', change: '+250,592 (+61.3%)' },
        { metric: 'Total Cash', previous: '$500M', new: '$915M', change: '+$415M (+83%)' },
        { metric: 'ETH Supply %', previous: '3.41%', new: '3.43%', change: '+0.02pp' },
      ],
      notes: 'Relentless accumulation continues through holiday week. 32,977 ETH acquired in past week alone. Staking scaled dramatically (+250,592 in one week to 659,219 total staked). Cash position nearly doubled to $915M. BMNR now #44 most traded stock in US ($1.1B/day avg volume). Machine operating at full capacity. Annual Meeting Jan 15 @ Wynn Las Vegas.',
      impact: 'positive'
    },
    // === JANUARY 2, 2026 - CHAIRMAN'S MESSAGE ===
    {
      date: '2026-01-02',
      source: 'SEC Filing (8-K, DEFA14A)',
      category: 'Corporate',
      title: '📢 Chairman\'s Message: Vote YES on Authorized Shares Increase',
      changes: [
        { metric: 'Proposal 2', previous: '500M authorized', new: '50B authorized', change: '100x increase' },
        { metric: 'Vote Deadline', previous: '—', new: 'Jan 14, 2026 11:59 PM ET', change: '12 days' },
        { metric: 'Annual Meeting', previous: '—', new: 'Jan 15, 2026', change: 'Wynn Las Vegas' },
        { metric: 'ETH/BMNR Coefficient', previous: 'Implied', new: '0.015 × ETH + accretion', change: 'Per Bloomberg' },
        { metric: 'Split @ $22k ETH', previous: '—', new: '$500 BMNR → 20:1', change: '8.5B shares' },
        { metric: 'Split @ $250k ETH', previous: '—', new: '$5,000 BMNR → 100:1', change: '43B shares' },
      ],
      notes: 'Tom Lee video explaining why shareholders should vote YES: (1) Capital markets flexibility - ATM, convertibles, warrants; (2) M&A optionality; (3) Future stock splits as ETH price rises. Price correlation formalized: BMNR = 0.015×ETH + ETH/share accretion. Implied splits needed to keep shares ~$25: $22k ETH→20:1, $62.5k→60:1, $250k→100:1. Current shares: 426M. Institutional backers reaffirmed: ARK (Cathie Wood), MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital. ETH/BTC target: 0.25 ("payment rails"). Livestream on X @bitmnr.',
      impact: 'positive'
    },
    // === DECEMBER 29, 2025 - LATEST HOLDINGS UPDATE ===
    {
      date: '2025-12-29',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 ETH Holdings Reach 4.11 Million - $13.2B Total Holdings',
      changes: [
        { metric: 'ETH Holdings', previous: '4,066,062', new: '4,110,525', change: '+44,463 (+1.1%)' },
        { metric: 'ETH Price', previous: '$2,991', new: '$2,948', change: '-1.4% (Coinbase)' },
        { metric: 'ETH Supply %', previous: '3.37%', new: '3.41%', change: '+0.04pp (⅔ to 5%)' },
        { metric: 'Staked ETH', previous: '342,560', new: '408,627', change: '+66,067 (+19.3%)' },
        { metric: 'Total Cash', previous: '$1.0B', new: '$1.0B', change: 'Unchanged' },
        { metric: 'Trading Rank', previous: '#66', new: '#47', change: '+19 ($980M/day)' },
      ],
      notes: 'Chairman\'s message re: Annual Meeting Jan 15 @ Wynn Las Vegas. 4 key proposals need stockholder approval. MAVAN on track Q1 2026. Working with 3 staking providers. Staking fee at scale: $374M/year ($1M+/day). CESR rate 2.81%. Moonshots: $23M Eightco (ORBS).',
      impact: 'positive'
    },
    // === STAKING UPDATE - Official PR Data ===
    {
      date: '2025-12-29',
      source: 'Press Release (Official)',
      category: 'Product',
      title: '🔥 STAKING UPDATE: 408,627 ETH Staked via 3 Providers',
      changes: [
        { metric: 'ETH Staked', previous: '0', new: '408,627 ETH', change: 'First official disclosure' },
        { metric: 'Staking Value', previous: '$0', new: '$1.2 billion', change: 'At $2,948/ETH' },
        { metric: '% of Holdings Staked', previous: '0%', new: '9.94%', change: 'Of 4.11M ETH' },
        { metric: 'Staking Providers', previous: '0', new: '3 providers', change: 'Pre-MAVAN' },
        { metric: 'CESR Rate', previous: 'N/A', new: '2.81%', change: 'Quatrefoil' },
        { metric: 'Annual Fee @ Scale', previous: 'N/A', new: '$374M/year', change: '>$1M/day' },
      ],
      notes: 'First official PR confirming staking operations: 408,627 ETH staked ($1.2B). Working with 3 staking providers pre-MAVAN. MAVAN (Made in America VAlidator Network) on track for Q1 2026 commercial launch. At full scale, staking generates $374M annual (~$1M+/day) at 2.81% CESR.',
      impact: 'positive'
    },
    // === DECEMBER 2025 WEEKLY HOLDINGS + SEC FILINGS ===
    {
      date: '2025-12-22',
      source: '8-K Filing + Press Release',
      category: 'Holdings',
      title: '🎯 4M MILESTONE: ETH Holdings Reach 4.066 Million Tokens',
      changes: [
        { metric: 'ETH Holdings', previous: '3,967,210', new: '4,066,062', change: '+98,852 (+2.5%)' },
        { metric: 'ETH Price', previous: '$3,074', new: '$2,991', change: '-2.7%' },
        { metric: 'ETH Supply %', previous: '3.29%', new: '3.37%', change: '+0.08pp' },
        { metric: 'Total Holdings', previous: '$13.2B', new: '$13.2B', change: 'Stable' },
        { metric: 'Cash', previous: '$1.0B', new: '$1.0B', change: 'Unchanged' },
        { metric: 'Trading Rank', previous: '#41', new: '#66', change: '-25 (vol down)' },
      ],
      notes: '8-K filed with operational update PR. Exceeded 4M ETH after 5.5 months. Two-thirds to "Alchemy of 5%". Annual meeting Jan 15, 2026 at Wynn Las Vegas.',
      impact: 'positive'
    },
    {
      date: '2025-12-19',
      source: '8-K Filing',
      category: 'SEC Filing',
      title: 'Annual Meeting Announcement - Jan 15, 2026',
      changes: [
        { metric: 'Meeting Date', previous: 'N/A', new: 'Jan 15, 2026', change: 'Wynn Las Vegas' },
        { metric: 'Key Vote', previous: 'N/A', new: '50B authorized shares', change: 'Proposal' },
      ],
      notes: 'Annual shareholder meeting scheduled. DEFR14A proxy filed. 50B authorized shares proposal for future capital flexibility.',
      impact: 'neutral'
    },
    {
      date: '2025-12-15',
      source: '8-K Filing + Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Reach 3.97 Million Tokens',
      changes: [
        { metric: 'ETH Holdings', previous: '3,864,951', new: '3,967,210', change: '+102,259 (+2.6%)' },
        { metric: 'ETH Price', previous: '$3,139', new: '$3,074', change: '-2.1%' },
        { metric: 'Total Holdings', previous: '$13.2B', new: '$13.3B', change: '+0.8%' },
        { metric: 'Cash', previous: '$0.9B', new: '$1.0B', change: '+11%' },
        { metric: 'Trading Rank', previous: '#37', new: '#41', change: '-4' },
      ],
      notes: '8-K filed with operational update. Crypto prices stabilizing post-Oct 10. MAVAN staking to deploy early Q1 2026. Trading $1.9B/day.',
      impact: 'positive'
    },
    {
      date: '2025-12-11',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'CFO Raymond Mow Separation Agreement',
      changes: [
        { metric: 'CFO Departure', previous: 'N/A', new: 'Jan 16, 2026', change: 'Effective date' },
        { metric: 'Severance', previous: 'N/A', new: '$1,137,500 lump sum', change: 'Cash' },
        { metric: 'Bonus', previous: 'N/A', new: '$150K accelerated', change: 'Pro-rated' },
        { metric: 'RSU Vesting', previous: 'N/A', new: '$455K value', change: 'Accelerated' },
        { metric: 'Reason', previous: 'N/A', new: 'Without Cause', change: 'No disagreement' },
      ],
      notes: 'Separation Agreement filed. CFO exits with significant package. Termination "without Cause" - not related to disagreement on operations/policies. Transition period through Jan 16.',
      impact: 'neutral'
    },
    {
      date: '2025-12-08',
      source: '8-K Filing + Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 3.86 Million + Binance Blockchain Week Video',
      changes: [
        { metric: 'ETH Holdings', previous: '3,726,499', new: '3,864,951', change: '+138,452 (+3.7%)' },
        { metric: 'ETH Price', previous: '$3,008', new: '$3,139', change: '+4.4%' },
        { metric: 'Total Holdings', previous: '$12.1B', new: '$13.2B', change: '+9.1%' },
        { metric: 'Weekly Pace', previous: '54,156', new: '138,452', change: '+156%' },
        { metric: 'Trading Rank', previous: '#39', new: '#37', change: '+2' },
      ],
      notes: '8-K filed with Tom Lee Binance Blockchain Week video + transcript. Chairman message: "The Crypto Supercycle is Intact". Significant buying acceleration.',
      impact: 'positive'
    },
    {
      date: '2025-12-05',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'Director Raymond Mow Resigns from Board',
      changes: [
        { metric: 'Board Resignation', previous: 'N/A', new: 'Raymond Mow', change: 'Immediate' },
        { metric: 'Reason', previous: 'N/A', new: 'Not due to disagreement', change: 'Confirmed' },
      ],
      notes: 'CFO Mow resigned from Board (remains CFO until Jan 16). 8-K confirms resignation not related to disagreement on operations/policies/practices.',
      impact: 'neutral'
    },
    {
      date: '2025-12-04',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'Binance Blockchain Week Presentation Filed',
      changes: [
        { metric: 'Event', previous: 'N/A', new: 'Binance Blockchain Week Dubai', change: 'Dec 2025' },
        { metric: 'Presenter', previous: 'N/A', new: 'Tom Lee (Chairman)', change: 'Keynote' },
      ],
      notes: '8-K filed with Tom Lee Binance Blockchain Week 2025 presentation. "The Crypto Supercycle, Ethereum 1971 Moment & MAVAN Staking Strategy."',
      impact: 'positive'
    },
    {
      date: '2025-12-01',
      source: '8-K Filing + Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Reach 3.73 Million Tokens',
      changes: [
        { metric: 'ETH Holdings', previous: '3,559,879', new: '3,726,499', change: '+166,620 (+4.7%)' },
        { metric: 'ETH Price', previous: '$3,120', new: '$3,008', change: '-3.6%' },
        { metric: 'Total Holdings', previous: '$11.8B', new: '$12.1B', change: '+2.5%' },
        { metric: 'Cash', previous: '$607M', new: '$876M', change: '+44%' },
        { metric: 'ETH Supply %', previous: '2.9%', new: '3.0%', change: '+0.1pp' },
      ],
      notes: '8-K filed. 7+ weeks past Oct 10 shock. Stepped up weekly purchases by 39%. Now >3% of ETH supply.',
      impact: 'positive'
    },
    // === NOVEMBER 2025 - EARNINGS + WEEKLY HOLDINGS ===
    {
      date: '2025-11-21',
      source: '10-K Filing + Press Release',
      category: 'SEC Filing',
      title: '📊 FY25 EARNINGS: GAAP EPS $13.39 + First Dividend',
      changes: [
        { metric: 'FY25 Net Income', previous: 'N/A', new: '$328.2M', change: 'First profitable FY' },
        { metric: 'FY25 EPS', previous: 'N/A', new: '$13.39', change: 'Fully diluted' },
        { metric: 'ETH (Aug 31)', previous: '0', new: '1,874,927', change: 'Audited' },
        { metric: 'ETH Cost Basis', previous: 'N/A', new: '$7.43B', change: 'Audited' },
        { metric: 'Dividend', previous: '$0', new: '$0.01/share', change: 'First ever' },
        { metric: 'Shares Outstanding', previous: '2.5M (Aug 24)', new: '234.7M', change: '+9,305%' },
      ],
      notes: 'First large-cap crypto company to pay dividend. Ex-div Dec 5, pay Dec 29. MAVAN staking pilot testing, full deployment Q1 2026.',
      impact: 'positive'
    },
    {
      date: '2025-11-17',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Reach 3.6 Million + November Chairman Message',
      changes: [
        { metric: 'ETH Holdings', previous: '3,505,723', new: '3,559,879', change: '+54,156 (+1.5%)' },
        { metric: 'ETH Price', previous: '$3,639', new: '$3,120', change: '-14.3%' },
        { metric: 'Total Holdings', previous: '$13.2B', new: '$11.8B', change: '-10.6%' },
        { metric: 'Cash', previous: '$398M', new: '$607M', change: '+52%' },
        { metric: 'ETH Supply %', previous: '2.9%', new: '2.9%', change: 'Unchanged' },
      ],
      notes: 'Nov Chairman message: 5 factors driving 4-year crypto cycle. Tokenization on ETH is massive unlock for innovation. Post-Oct 10 recovery ongoing.',
      impact: 'neutral'
    },
    {
      date: '2025-11-14',
      source: 'Press Release',
      category: 'Corporate',
      title: '🔄 CEO CHANGE: Chi Tsang Appointed + 3 New Board Members',
      changes: [
        { metric: 'CEO', previous: 'Jonathan Bates', new: 'Chi Tsang', change: 'New appointment' },
        { metric: 'Board +', previous: 'N/A', new: 'Robert Sechan (NewEdge)', change: 'Independent' },
        { metric: 'Board +', previous: 'N/A', new: 'Jason Edgeworth (JPD Holdings)', change: 'Independent' },
        { metric: 'Board +', previous: 'N/A', new: 'Olivia Howe (RigUp CLO)', change: 'Independent' },
        { metric: 'ETH Supply %', previous: 'N/A', new: '>2.9%', change: 'Reference' },
      ],
      notes: 'Chi Tsang: "Mobile/internet explosion of 1990s mirrors blockchain today." Bates: "Proud of building from ground up to NYSE and world\'s largest ETH holder." Sechan: "Known Tom Lee 20 years."',
      impact: 'positive'
    },
    {
      date: '2025-11-11',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'Major Board Restructuring (8-K)',
      changes: [
        { metric: 'Directors Resigned', previous: '6', new: '3 out (Bayles, Kelly, Nelson)', change: '-3' },
        { metric: 'Directors Appointed', previous: 'N/A', new: 'Edgeworth, Howe, Sechan', change: '+3' },
        { metric: 'Corporate Secretary', previous: 'Seth Bayles', new: 'Erik Nelson', change: 'Reassigned' },
      ],
      notes: 'Not due to disagreement. Nelson remains President. New directors bring energy, legal, and investment expertise.',
      impact: 'neutral'
    },
    {
      date: '2025-11-10',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Reach 3.5 Million Tokens (2.9% of Supply)',
      changes: [
        { metric: 'ETH Holdings', previous: '3,395,422', new: '3,505,723', change: '+110,288 (+3.2%)' },
        { metric: 'ETH Price', previous: '$3,903', new: '$3,639', change: '-6.8%' },
        { metric: 'Total Holdings', previous: '$13.7B', new: '$13.2B', change: '-3.6%' },
        { metric: 'Moonshots', previous: '$62M', new: '$61M (OCTO)', change: '-1.6%' },
        { metric: 'Cash', previous: '$389M', new: '$398M', change: '+2.3%' },
        { metric: 'Weekly Buy Pace', previous: '82,353', new: '110,288', change: '+34%' },
        { metric: 'ETH Supply %', previous: '2.8%', new: '2.9%', change: '+0.1pp (>halfway)' },
        { metric: 'Trading Rank', previous: '#60', new: '#48', change: '+12' },
        { metric: 'MSTR Holdings', previous: '640,808 BTC', new: '641,205 BTC', change: '+397 BTC' },
      ],
      notes: 'Dip buying: +34% more ETH week-over-week. NYSE event with Ethereum Foundation hosted "many financial institutions." Wall Street tokenization interest high. BMNR+MSTR = 88% of global DAT trading volume.',
      impact: 'positive'
    },
    {
      date: '2025-11-03',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 HALFWAY: ETH Holdings Reach 3.4 Million (2.8% of Supply)',
      changes: [
        { metric: 'ETH Holdings', previous: '3,313,069', new: '3,395,422', change: '+82,353 (+2.5%)' },
        { metric: 'ETH Price', previous: '$4,164', new: '$3,903', change: '-6.3%' },
        { metric: 'Total Holdings', previous: '$14.2B', new: '$13.7B', change: '-3.5%' },
        { metric: 'Moonshots', previous: '$88M', new: '$62M (OCTO)', change: '-30%' },
        { metric: 'Cash', previous: '$305M', new: '$389M', change: '+27%' },
        { metric: 'ETH Supply %', previous: '2.8%', new: '2.8%', change: 'Confirmed' },
        { metric: 'Trading Rank', previous: '#46', new: '#60', change: '-14' },
        { metric: 'MSTR Holdings', previous: '640,418 BTC', new: '640,808 BTC', change: '+390 BTC' },
      ],
      notes: 'Now >halfway to Alchemy of 5%. Oct 10 liquidation = largest ever in crypto history. Open interest on ETH fell -45% (largest decline in ETH history). "Healthy reset."',
      impact: 'positive'
    },
    // === OCTOBER 2025 - MAJOR CRASH + RECOVERY ===
    {
      date: '2025-10-27',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 3.31 Million Tokens',
      changes: [
        { metric: 'ETH Holdings', previous: '3,236,014', new: '3,313,069', change: '+77,055 (+2.4%)' },
        { metric: 'ETH Price', previous: '$4,022', new: '$4,164', change: '+3.5%' },
        { metric: 'Total Holdings', previous: '$13.4B', new: '$14.2B', change: '+6.0%' },
        { metric: 'Moonshots', previous: '$119M', new: '$88M (OCTO)', change: '-26%' },
        { metric: 'Cash', previous: '$219M', new: '$305M', change: '+39%' },
        { metric: 'ETH Supply %', previous: '2.7%', new: '2.8%', change: '+0.1pp' },
        { metric: 'Trading Rank', previous: '#33', new: '#46', change: '-13' },
        { metric: 'MSTR Holdings', previous: '640,250 BTC', new: '640,418 BTC', change: '+168 BTC' },
      ],
      notes: 'US-China trade talk progress = positive for crypto. ETH open interest at Jun 30 levels ($2,500 ETH then). BMNR+MSTR = 88% of global DAT volume.',
      impact: 'positive'
    },
    {
      date: '2025-10-20',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 3.24 Million (Post-Crash Recovery)',
      changes: [
        { metric: 'ETH Holdings', previous: '3,032,188', new: '3,236,014', change: '+203,826 (+6.7%)' },
        { metric: 'ETH Price', previous: '$4,154', new: '$4,022', change: '-3.2%' },
        { metric: 'Total Holdings', previous: '$12.9B', new: '$13.4B', change: '+3.9%' },
        { metric: 'Moonshots', previous: '$135M', new: '$119M (OCTO)', change: '-12%' },
        { metric: 'Cash', previous: '$104M', new: '$219M', change: '+111%' },
        { metric: 'ETH Supply %', previous: '2.5%', new: '2.7%', change: '+0.2pp (>halfway)' },
        { metric: 'Trading Rank', previous: '#22', new: '#33', change: '-11' },
        { metric: 'MSTR Holdings', previous: '640,031 BTC', new: '640,250 BTC', change: '+219 BTC' },
      ],
      notes: 'Largest deleveraging event last week created price dislocation. ETH open interest = Jun 30 levels (ETH was $2,500). Attractive risk/reward. +203K ETH bought.',
      impact: 'positive'
    },
    {
      date: '2025-10-13',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 3M MILESTONE: ETH Holdings Exceed 3.03 Million + Oct Chairman Message',
      changes: [
        { metric: 'ETH Holdings', previous: '2,830,151', new: '3,032,188', change: '+202,037 (+7.1%)' },
        { metric: 'ETH Price', previous: '$4,535', new: '$4,154', change: '-8.4%' },
        { metric: 'Total Holdings', previous: '$13.4B', new: '$12.9B', change: '-3.7%' },
        { metric: 'Moonshots', previous: '$113M', new: '$135M (OCTO)', change: '+19%' },
        { metric: 'Cash', previous: '$456M', new: '$104M', change: '-77% (deployed)' },
        { metric: 'ETH Supply %', previous: '2.3%', new: '2.5%', change: '+0.2pp (halfway)' },
        { metric: 'Trading Rank', previous: '#28', new: '#22', change: '+6 (volatility)' },
        { metric: 'MSTR Holdings', previous: '640,031 BTC', new: '640,031 BTC', change: 'Unchanged' },
      ],
      notes: '⚠️ Oct 10 liquidation = LARGEST EVER single-day crypto deleveraging in history. BMNR bought aggressively (+202K ETH). Chairman keynote at Token2049 Singapore: "Ethereum Supercycle." $3.5B/day trading.',
      impact: 'positive'
    },
    {
      date: '2025-10-06',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 2.83 Million Tokens',
      changes: [
        { metric: 'ETH Holdings', previous: '2,650,900', new: '2,830,151', change: '+179,251 (+6.8%)' },
        { metric: 'ETH Price', previous: '$4,141', new: '$4,535', change: '+9.5%' },
        { metric: 'Total Holdings', previous: '$11.6B', new: '$13.4B', change: '+15.5%' },
        { metric: 'Moonshots', previous: '$157M', new: '$113M (OCTO)', change: '-28%' },
        { metric: 'Cash', previous: '$436M', new: '$456M', change: '+4.6%' },
        { metric: 'ETH Supply %', previous: '2.2%', new: '2.3%', change: '+0.1pp' },
        { metric: 'Trading Rank', previous: '#26', new: '#28', change: '-2' },
        { metric: 'MSTR Holdings', previous: '639,835 BTC', new: '640,031 BTC', change: '+196 BTC' },
      ],
      notes: 'Token2049 Singapore week. Met Ethereum core developers and ecosystem players. "Clear focus on enabling Wall Street and AI to build on ETH." AI + crypto = two Supercycle narratives.',
      impact: 'positive'
    },
    // === SEPTEMBER 2025 - RAPID GROWTH ===
    {
      date: '2025-09-29',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 2.65 Million Tokens',
      changes: [
        { metric: 'ETH Holdings', previous: '2,416,054', new: '2,650,900', change: '+234,846 (+9.7%)' },
        { metric: 'ETH Price', previous: '$4,497', new: '$4,141', change: '-7.9%' },
        { metric: 'Total Holdings', previous: '$11.4B', new: '$11.6B', change: '+1.8%' },
        { metric: 'Moonshots', previous: '$175M', new: '$157M (OCTO)', change: '-10%' },
        { metric: 'Cash', previous: '$345M', new: '$436M', change: '+26%' },
        { metric: 'ETH Supply %', previous: '2.0%', new: '2.2%', change: '+0.2pp' },
        { metric: 'Trading Rank', previous: '#24', new: '#26', change: '-2' },
        { metric: 'MSTR Holdings', previous: '638,460 BTC', new: '639,835 BTC', change: '+1,375 BTC' },
      ],
      notes: 'AI + crypto = two Supercycle narratives. Both require neutral public blockchains. ETH = premier choice (100% uptime, high reliability). "Price is discount to future."',
      impact: 'positive'
    },
    {
      date: '2025-09-22',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 2% MILESTONE: ETH Holdings Exceed 2.4 Million (2% of Supply)',
      changes: [
        { metric: 'ETH Holdings', previous: '2,151,676', new: '2,416,054', change: '+264,378 (+12.3%)' },
        { metric: 'ETH Price', previous: '$4,632', new: '$4,497', change: '-2.9%' },
        { metric: 'Total Holdings', previous: '$10.77B', new: '$11.4B', change: '+5.8%' },
        { metric: 'Moonshots', previous: '$214M', new: '$175M (OCTO)', change: '-18%' },
        { metric: 'Cash', previous: '$569M', new: '$345M', change: '-39% (deployed)' },
        { metric: 'ETH Supply %', previous: '1.8%', new: '2.0%', change: '+0.2pp' },
        { metric: 'Trading Rank', previous: '#28', new: '#24', change: '+4' },
        { metric: 'Stock Price', previous: 'N/A', new: '$61.29 (20-DMA)', change: 'Reference' },
      ],
      notes: '📈 At 1% ETH (Aug) stock was ~$38. At 2% stock >$61. "Power law benefits large holders." $3.5B/day trading volume.',
      impact: 'positive'
    },
    {
      date: '2025-09-22',
      source: '8-K Filing',
      category: 'Capital',
      title: '$365M Registered Direct Offering @ 14% Premium',
      changes: [
        { metric: 'Shares Sold', previous: 'N/A', new: '5,217,715', change: '@ $70.00' },
        { metric: 'Premium', previous: 'N/A', new: '14% to $61.29 close', change: 'Accretive' },
        { metric: 'Warrants Issued', previous: 'N/A', new: '10,435,430', change: '@ $87.50 exercise' },
        { metric: 'Gross Proceeds', previous: 'N/A', new: '$365.24M', change: 'For ETH' },
        { metric: 'Warrant Expiry', previous: 'N/A', new: 'Mar 22, 2027', change: '18 months' },
        { metric: 'Potential Total', previous: 'N/A', new: '$1.28B', change: 'If warrants exercised' },
        { metric: 'Placement Agent', previous: 'N/A', new: 'Moelis & Company', change: 'New' },
      ],
      notes: 'Sold at premium = "materially accretive to existing shareholders." Total potential $1.28B (common + warrant exercise). Institutional confidence in BMNR execution.',
      impact: 'positive'
    },
    {
      date: '2025-09-15',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 2M MILESTONE: ETH Holdings Exceed 2.15 Million',
      changes: [
        { metric: 'ETH Holdings', previous: '2,069,443', new: '2,151,676', change: '+82,233 (+4.0%)' },
        { metric: 'ETH Price', previous: '$4,312', new: '$4,632', change: '+7.4%' },
        { metric: 'Total Holdings', previous: '$9.2B', new: '$10.77B', change: '+17.1%' },
        { metric: 'Cash', previous: '$266M', new: '$569M', change: '+114%' },
        { metric: 'Moonshots', previous: '$20M', new: '$214M (Eightco/OCTO)', change: '+970%' },
        { metric: 'Trading Rank', previous: '#30', new: '#28', change: '+2' },
        { metric: 'MSTR Holdings', previous: '636,505 BTC', new: '638,460 BTC', change: '+1,955 BTC' },
      ],
      notes: 'Nearly $11B in total holdings incl moonshots. Surpassed 2M ETH. "Power law benefits large holders." Tom Lee: "AI/agentic-AI creating token economy supercycle." #28 most traded stock ($2.0B/day).',
      impact: 'positive'
    },
    {
      date: '2025-09-08',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 2M MILESTONE: ETH Holdings Exceed 2.07 Million + First "Moonshot"',
      changes: [
        { metric: 'ETH Holdings', previous: '1,866,974', new: '2,069,443', change: '+202,469 (+10.8%)' },
        { metric: 'ETH Price', previous: '$4,458', new: '$4,312', change: '-3.3%' },
        { metric: 'Total Holdings', previous: '$8.98B', new: '$9.21B', change: '+2.6%' },
        { metric: 'Cash', previous: '$635M', new: '$266M', change: '-58% (deployed)' },
        { metric: 'Moonshot Investment', previous: '$0', new: '$20M (Eightco/OCTO)', change: 'First' },
        { metric: 'Trading Rank', previous: '#22', new: '#30', change: '-8' },
        { metric: 'MSTR Holdings', previous: '629,376 BTC', new: '636,505 BTC', change: 'Reference' },
      ],
      notes: 'Surpassed 2M ETH milestone. $20M into Eightco (OCTO) as first "Moonshot" - Worldcoin treasury strategy. 1% of balance sheet for ETH ecosystem investments. #30 most traded ($1.7B/day).',
      impact: 'positive'
    },
    {
      date: '2025-09-05',
      source: 'Press Release',
      category: 'Corporate',
      title: 'Statement on NYSE American Listing & Capital Markets Access',
      changes: [
        { metric: 'Listing Status', previous: 'NYSE American', new: 'Fully compliant', change: 'Confirmed' },
        { metric: 'ATM Program', previous: 'Active', new: 'No shareholder approval needed', change: 'Clarified' },
      ],
      notes: 'Response to media reports on NASDAQ crypto treasury scrutiny. BMNR on NYSE American, not affected. PIPE closed July 8 with NYSE approval. ATM continues without shareholder vote.',
      impact: 'neutral'
    },
    {
      date: '2025-09-02',
      source: 'Press Release',
      category: 'Holdings',
      title: 'August Chairman Message + Holdings Update (1.87M ETH)',
      changes: [
        { metric: 'ETH Holdings', previous: '1,713,899', new: '1,866,974', change: '+153,075 (+8.9%)' },
        { metric: 'ETH Price', previous: '$4,808', new: '$4,458', change: '-7.3%' },
        { metric: 'Total Holdings', previous: '$8.8B', new: '$8.98B', change: '+2%' },
        { metric: 'Cash', previous: '$562M', new: '$635M', change: '+13%' },
      ],
      notes: 'August Chairman Message discusses 1971 Bretton Woods parallel. GENIUS Act + SEC Project Crypto = "multi-decade opportunity for ETH." #22 most traded stock ($2.3B/day).',
      impact: 'positive'
    },
    {
      date: '2025-09-01',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'Executive Employment Agreements',
      changes: [
        { metric: 'CEO Bates Comp', previous: 'N/A', new: '$3,037,000/yr', change: 'Formalized' },
        { metric: 'CFO Mow Comp', previous: 'N/A', new: '$1,023,750/yr', change: 'Formalized' },
        { metric: 'President Nelson Comp', previous: 'N/A', new: '$406,250/yr', change: 'Formalized' },
      ],
      notes: 'Formal employment agreements. CEO severance: $3.04M (2 years cash) if terminated without cause.',
      impact: 'neutral'
    },
    // === AUGUST 2025 - EXPLOSIVE GROWTH ===
    {
      date: '2025-08-28',
      source: 'Press Release',
      category: 'Corporate',
      title: 'David Sharbutt Joins Board - Digital Infrastructure Vision',
      changes: [
        { metric: 'ETH Holdings', previous: '1,713,899', new: '1,792,690', change: '+78,791' },
        { metric: 'ETH Price', previous: '$4,808', new: '$4,591', change: '-4.5%' },
        { metric: 'Total Holdings', previous: '$8.8B', new: '$9.0B+', change: '+2.3%' },
        { metric: 'Cash', previous: '$562M', new: '$775M', change: '+38%' },
        { metric: 'New Director', previous: 'N/A', new: 'David E. Sharbutt', change: 'American Tower veteran' },
      ],
      notes: 'Sharbutt: 17 years on AMT board (2006-2023), founder/CEO Alamosa Holdings (sold to Sprint 2006). Tom Lee: "ETH Treasuries = digital infrastructure like wireless towers." AMT expanded 6X to 30X EV/EBITDA 2003-2020.',
      impact: 'positive'
    },
    {
      date: '2025-08-25',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Reach 1.71 Million (#1 ETH Treasury)',
      changes: [
        { metric: 'ETH Holdings', previous: '1,523,373', new: '1,713,899', change: '+190,526 (+12.5%)' },
        { metric: 'ETH Price', previous: '$4,326', new: '$4,808', change: '+11.1%' },
        { metric: 'Total Holdings', previous: '$6.6B', new: '$8.8B', change: '+33%' },
        { metric: 'Cash', previous: '$80M', new: '$562M', change: '+602%' },
        { metric: 'NAV/Share', previous: '$22.84 (Jul 27)', new: '$39.84', change: '+74%' },
      ],
      notes: 'Second consecutive week raising $2B+. #20 most traded US stock ($2.8B/day). NAV/share nearly doubled in 4 weeks.',
      impact: 'positive'
    },
    {
      date: '2025-08-25',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'Director Appointment: David E. Sharbutt (8-K)',
      changes: [
        { metric: 'Board Size', previous: '5', new: '6', change: '+1' },
        { metric: 'New Director', previous: 'N/A', new: 'David E. Sharbutt', change: 'Independent' },
      ],
      notes: 'SEC filing formalizing Sharbutt appointment. BS EE Texas Tech 1971.',
      impact: 'positive'
    },
    {
      date: '2025-08-18',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 1.52 Million - #1 ETH, #2 Global Treasury',
      changes: [
        { metric: 'ETH Holdings', previous: '1,150,263', new: '1,523,373', change: '+373,110 (+32%)' },
        { metric: 'ETH Price', previous: '$4,311', new: '$4,326', change: '+0.3%' },
        { metric: 'Total Holdings', previous: '$5.0B', new: '$6.6B', change: '+32%' },
        { metric: 'Trading Rank', previous: '#25', new: '#10', change: '+15' },
      ],
      notes: 'Now #1 ETH treasury and #2 global crypto treasury (behind only MSTR). #10 most liquid US stock at $6.4B/day.',
      impact: 'positive'
    },
    {
      date: '2025-08-12',
      source: '424B5 Filing',
      category: 'SEC Filing',
      title: 'ATM Expansion to $24.5 Billion Total',
      changes: [
        { metric: 'ATM Capacity', previous: '$4.5B', new: '$24.5B', change: '+$20B' },
        { metric: 'Prior ATM Used', previous: 'N/A', new: '$4.5B (99.99%)', change: 'Exhausted' },
      ],
      notes: 'Prior $4.5B ATM exhausted in 5 weeks. Massive $20B expansion via 424B5 prospectus supplement.',
      impact: 'positive'
    },
    {
      date: '2025-08-11',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 1M MILESTONE: ETH Holdings Exceed 1.15 Million',
      changes: [
        { metric: 'ETH Holdings', previous: '833,137', new: '1,150,263', change: '+317,126 (+38%)' },
        { metric: 'ETH Price', previous: '$3,492', new: '$4,311', change: '+23%' },
        { metric: 'Total Holdings', previous: '$2.9B', new: '$5.0B', change: '+72%' },
        { metric: 'Weekly Increase', previous: 'N/A', new: '+$2.0B', change: 'Largest ever' },
      ],
      notes: 'Passed 1M ETH and became world largest ETH treasury in just 5 weeks. #25 most liquid US stock ($2.2B/day).',
      impact: 'positive'
    },
    {
      date: '2025-08-04',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed 833K - Largest ETH Treasury',
      changes: [
        { metric: 'ETH Holdings', previous: '~0', new: '833,137', change: 'From zero in 35 days' },
        { metric: 'ETH Price', previous: 'N/A', new: '$3,492', change: 'Reference' },
        { metric: 'Total Holdings', previous: 'N/A', new: '$2.9B', change: '#3 crypto treasury' },
        { metric: 'Bill Miller III', previous: 'N/A', new: 'Top investor', change: 'Confirmed' },
      ],
      notes: 'Lightning speed: 833K ETH from zero in 35 days. #3 largest crypto treasury (behind MSTR, MARA). Bill Miller III joins as major investor.',
      impact: 'positive'
    },
    // === JULY 2025 - ETH PIVOT + FOUNDATION ===
    {
      date: '2025-07-29',
      source: 'Press Release',
      category: 'Capital',
      title: '$1 Billion Stock Repurchase Program Announced',
      changes: [
        { metric: 'Buyback Auth', previous: '$0', new: '$1.0B', change: 'Board approved' },
        { metric: 'ETH Holdings', previous: '566,776', new: '625,000', change: '+58,224' },
        { metric: 'ETH Price', previous: '$3,644', new: '$3,755', change: '+3.0%' },
        { metric: 'Cash', previous: 'N/A', new: '$401.4M', change: 'Unencumbered' },
        { metric: 'BTC Holdings', previous: '154', new: '192', change: '+38 BTC' },
        { metric: 'NAV/Share', previous: 'N/A', new: '$22.76', change: 'First reported' },
        { metric: 'Fully Diluted Shares', previous: 'N/A', new: '121,739,533', change: 'Reference' },
      ],
      notes: 'Open-ended buyback program. Tom Lee: "Best expected return may be to acquire our own shares." Total crypto+cash: $2.77B. First BTC update since June.',
      impact: 'positive'
    },
    {
      date: '2025-07-28',
      source: 'Press Release',
      category: 'Corporate',
      title: 'Launch of "Alchemy of 5%" Investor Presentation + Chairman Message Series',
      changes: [
        { metric: 'New Content', previous: 'None', new: 'Investor deck + video series', change: 'Launched' },
        { metric: 'Strategy Explained', previous: 'N/A', new: '"Alchemy of 5%"', change: 'Public' },
      ],
      notes: 'Tom Lee launches monthly "Chairman\'s Message" video series. Investor presentation titled "The Alchemy of 5%" explains ETH treasury strategy.',
      impact: 'positive'
    },
    {
      date: '2025-07-28',
      source: '8-K + S-3ASR Filing',
      category: 'Capital',
      title: 'ATM Expansion to $4.5B + PIPE Resale Registration',
      changes: [
        { metric: 'ATM Capacity', previous: '$2.0B', new: '$4.5B', change: '+$2.5B' },
        { metric: 'PIPE Shares Registered', previous: '0', new: '56.12M', change: 'Resale' },
        { metric: 'Pre-Funded Warrants', previous: '0', new: '11.0M @ $0.0001', change: 'Registered' },
      ],
      notes: 'Cantor as buyback broker @ $0.02/share. PIPE resale registration for June offering investors. Strategic advisor warrants: 3.19M @ $5.40.',
      impact: 'positive'
    },
    {
      date: '2025-07-24',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed $2 Billion (566K ETH)',
      changes: [
        { metric: 'ETH Holdings', previous: '300,657', new: '566,776', change: '+88% in 1 week' },
        { metric: 'ETH Price', previous: '$3,462', new: '$3,644', change: '+5.3%' },
        { metric: 'Total Holdings', previous: '$1.0B', new: '$2.0B+', change: '+100%' },
        { metric: 'Days Since PIPE', previous: 'N/A', new: '16 days', change: 'From $250M' },
      ],
      notes: 'Surpassed $2B ETH in 16 days after $250M PIPE. 700%+ increase from initial proceeds. On track for 5% goal.',
      impact: 'positive'
    },
    {
      date: '2025-07-23',
      source: 'Press Release',
      category: 'Corporate',
      title: 'Options Trading Commences on NYSE',
      changes: [
        { metric: 'Options Trading', previous: 'None', new: 'LIVE on NYSE', change: 'New listing' },
        { metric: 'Ticker', previous: 'N/A', new: 'BMNR options', change: 'Active' },
      ],
      notes: 'BMNR options now available on NYSE via OCC. Expands investor access, enhances liquidity, provides hedging tools.',
      impact: 'positive'
    },
    {
      date: '2025-07-22',
      source: 'Press Release',
      category: 'Capital',
      title: '🏆 ARK Invest Acquires $182M of BMNR Shares',
      changes: [
        { metric: 'ARK Investment', previous: '$0', new: '$182M (4.77M shares)', change: 'Major investor' },
        { metric: 'Net Proceeds', previous: 'N/A', new: '$177M for ETH', change: '100% to crypto' },
        { metric: 'Investor Base', previous: 'VCs + institutions', new: '+ Cathie Wood/ARK', change: 'Expanded' },
      ],
      notes: 'Cathie Wood\'s ARK Invest takes substantial stake via ATM block trade. Tom Lee: "Cathie is a pioneer of exponential investing." 100% of proceeds to ETH.',
      impact: 'positive'
    },
    {
      date: '2025-07-17',
      source: 'Press Release',
      category: 'Holdings',
      title: '📊 $1B MILESTONE: ETH Holdings Exceed $1 Billion',
      changes: [
        { metric: 'ETH Holdings', previous: '163,142', new: '300,657', change: '+84% in 3 days' },
        { metric: 'ETH Price', previous: '$3,073', new: '$3,462', change: '+12.7%' },
        { metric: 'Total Holdings', previous: '$500M', new: '$1.0B+', change: '+100%' },
        { metric: 'Days Since PIPE', previous: 'N/A', new: '7 days', change: 'From $250M' },
        { metric: 'ETH via Options', previous: 'N/A', new: '60,000 ETH (~$200M)', change: 'Backed by cash' },
      ],
      notes: 'Surpassed $1B ETH in just 7 days after $250M PIPE close. 60K ETH held via in-the-money options, backed 1:1 with ~$200M cash.',
      impact: 'positive'
    },
    {
      date: '2025-07-14',
      source: 'Press Release',
      category: 'Holdings',
      title: 'ETH Holdings Exceed $500 Million (163K ETH)',
      changes: [
        { metric: 'ETH Holdings', previous: '~0', new: '163,142', change: 'Rapid accumulation' },
        { metric: 'ETH Price', previous: 'N/A', new: '$3,073', change: 'Reference' },
        { metric: 'Total Holdings', previous: '$250M PIPE', new: '$500M+', change: '+100%' },
        { metric: 'Days Since PIPE', previous: 'N/A', new: '3 days', change: 'From close' },
      ],
      notes: 'Doubled PIPE proceeds in 3 days. Tom Lee: "Reflexive benefit of acquiring large holdings." CEO Bates: "Wall Street is getting ETH-pilled."',
      impact: 'positive'
    },
    {
      date: '2025-07-09',
      source: 'Press Release + 8-K',
      category: 'Capital',
      title: '$250M PIPE Closes - ETH Treasury Strategy Begins',
      changes: [
        { metric: 'PIPE Proceeds', previous: '$0', new: '$250M', change: 'Closed' },
        { metric: 'Primary Treasury Asset', previous: 'BTC', new: 'ETH', change: 'PIVOT' },
        { metric: 'Lead Investor', previous: 'N/A', new: 'MOZAYYX', change: 'New' },
        { metric: 'Other Investors', previous: 'N/A', new: 'Founders Fund, Pantera, Kraken, Galaxy, DCG', change: 'Top-tier' },
      ],
      notes: 'Official ETH treasury launch. MOZAYYX led with Founders Fund, Pantera, FalconX, Republic, Kraken, Galaxy, DCG, and Tom Lee. "Foundational step in ETH strategy."',
      impact: 'positive'
    },
    {
      date: '2025-07-09',
      source: '8-K + S-3ASR Filing',
      category: 'SEC Filing',
      title: '$2 Billion ATM Program Launch',
      changes: [
        { metric: 'ATM Program', previous: 'None', new: '$2.0B', change: 'New' },
        { metric: 'Sales Agents', previous: 'N/A', new: 'Cantor + ThinkEquity', change: 'Appointed' },
        { metric: 'Commission Rate', previous: 'N/A', new: '3.0%', change: 'New' },
        { metric: 'Registration', previous: 'N/A', new: '333-288579', change: 'Filed' },
      ],
      notes: 'Controlled Equity Offering Sales Agreement. Automatic shelf (WKSI status) enables rapid capital deployment.',
      impact: 'positive'
    },
    {
      date: '2025-07-08',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'Ethereum Tower Consulting Agreement',
      changes: [
        { metric: 'Treasury Advisor', previous: 'None', new: 'Ethereum Tower LLC', change: '10-year term' },
        { metric: 'Strategic Advisor', previous: 'None', new: 'Ethereum Tower Instant', change: '6-month term' },
        { metric: 'Advisor Fee', previous: 'N/A', new: '1% to $1B, 0.5% $1-5B, 0.25% >$5B', change: 'AUM-based' },
        { metric: 'Advisor Warrants', previous: 'N/A', new: '5% fully diluted @ $5.40', change: '5-year term' },
      ],
      notes: 'ETH Treasury Strategy consulting agreement. Focus on maximizing ETH accumulation and value accretion.',
      impact: 'positive'
    },
    {
      date: '2025-07-02',
      source: '8-K Filing',
      category: 'Capital',
      title: 'IPO Overallotment Exercised',
      changes: [
        { metric: 'Shares Issued', previous: '2,250,000 (IPO)', new: '+337,500', change: '+15%' },
        { metric: 'Price', previous: '$8.00 public', new: '$7.40 to underwriter', change: '92.5%' },
        { metric: 'Gross Proceeds', previous: '$18M', new: '+$2.7M', change: 'Additional' },
      ],
      notes: 'ThinkEquity fully exercised 45-day overallotment option from June 6 offering.',
      impact: 'positive'
    },
    {
      date: '2025-06-30',
      source: '8-K Filing',
      category: 'Capital',
      title: '🚀 FIRST ETH PIVOT - Private Placement',
      changes: [
        { metric: 'Cash Offering Shares', previous: '0', new: '36,309,592', change: '@ $4.50' },
        { metric: 'Pre-Funded Warrants', previous: '0', new: '11,006,444', change: '@ $4.4999' },
        { metric: 'Crypto Offering Shares', previous: '0', new: '8,804,122', change: '@ $4.50 (ETH/BTC)' },
        { metric: 'Use of Proceeds', previous: 'BTC Mining', new: 'ETH Treasury', change: 'PIVOT' },
      ],
      notes: 'WATERSHED EVENT: Birth of BMNR as ETH treasury company. 20% for staking/DeFi, 5% for validator tech.',
      impact: 'positive'
    },
    // === JUNE 2025 - PRE-PIVOT FOUNDATION ===
    {
      date: '2025-06-17',
      source: 'Press Release',
      category: 'Holdings',
      title: 'BTC Treasury Complete: 154.167 BTC Purchased',
      changes: [
        { metric: 'BTC Holdings', previous: '100', new: '154.167', change: '+54.167' },
        { metric: 'Total BTC Spent', previous: 'N/A', new: '$16.347M', change: 'Complete' },
        { metric: 'Avg Price/BTC', previous: 'N/A', new: '$106,033', change: 'Reference' },
        { metric: 'IPO Proceeds Used', previous: '$16.34M', new: '100%', change: 'Deployed' },
      ],
      notes: 'Completed BTC purchases from June 6 IPO. 100% of proceeds invested as committed. Final BTC treasury before ETH pivot.',
      impact: 'positive'
    },
    {
      date: '2025-06-09',
      source: 'Press Release',
      category: 'Holdings',
      title: 'First BTC Purchase: 100 Bitcoin Acquired',
      changes: [
        { metric: 'BTC Holdings', previous: '0', new: '100', change: 'First purchase' },
        { metric: 'Source', previous: 'N/A', new: 'IPO proceeds', change: 'Open market' },
      ],
      notes: 'First open market BTC purchase from June 6 offering. CEO: "Excited to establish our Bitcoin Treasury." Pre-ETH pivot.',
      impact: 'positive'
    },
    {
      date: '2025-06-06',
      source: '8-K Filing',
      category: 'Capital',
      title: 'Public Offering Closes (NYSE Uplisting)',
      changes: [
        { metric: 'Shares Issued', previous: '~2.5M', new: '+2,250,000', change: 'IPO' },
        { metric: 'Price', previous: 'N/A', new: '$8.00', change: 'Public offering' },
        { metric: 'Proceeds', previous: 'N/A', new: '~$18M', change: 'New capital' },
      ],
      notes: 'Concurrent with NYSE American uplisting. First major capital raise enabling ETH pivot.',
      impact: 'positive'
    },
    {
      date: '2025-06-05',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'NYSE American Trading Commences',
      changes: [
        { metric: 'Exchange', previous: 'OTCQX', new: 'NYSE American', change: 'Uplisting' },
        { metric: 'Last OTCQX Day', previous: 'N/A', new: 'June 4, 2025', change: 'Final' },
      ],
      notes: 'Major milestone enabling institutional access and ATM programs.',
      impact: 'positive'
    },
    {
      date: '2025-06-02',
      source: '8-K Filing',
      category: 'Corporate',
      title: 'NYSE American Listing Approved',
      changes: [
        { metric: 'Listing Status', previous: 'Pending', new: 'Approved', change: 'Confirmed' },
        { metric: 'Expected Start', previous: 'N/A', new: '~June 5, 2025', change: 'Announced' },
      ],
      notes: 'Press release announcing NYSE American approval. CEO: Jonathan Bates.',
      impact: 'positive'
    },
    {
      date: '2025-06-01',
      source: '10-K Filing Reference',
      category: 'Corporate',
      title: 'Thomas J. Lee Appointed Chairman',
      changes: [
        { metric: 'Chairman', previous: 'Jonathan Bates', new: 'Thomas J. Lee', change: 'New' },
        { metric: 'Strategic Focus', previous: 'BTC Mining', new: 'ETH Treasury', change: 'Aligned' },
      ],
      notes: 'Tom Lee (Fundstrat co-founder) appointed Chairman. Leadership aligned with ETH treasury vision.',
      impact: 'positive'
    },
  ];

  // Category definitions - CRCL unified style (Title Case)
  const categories = ['all', 'Holdings', 'SEC Filing', 'Capital', 'Corporate', 'Product', 'Earnings'];

  // Topic tags for multi-select filtering (AND logic)
  const topicTags: Record<string, { label: string; color: string }> = {
    ETH_HOLDINGS: { label: 'ETH Holdings', color: 'bg-blue-600' },
    STAKING: { label: 'Staking', color: 'bg-green-600' },
    DILUTION: { label: 'Dilution', color: 'bg-red-600' },
    MINING: { label: 'Mining Era', color: 'bg-orange-600' },
    STRATEGY: { label: 'Strategy', color: 'bg-violet-600' },
    FINANCIALS: { label: 'Financials', color: 'bg-cyan-600' },
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
  const detectTopics = (entry: any) => {
    const topics: string[] = [];
    const text = `${entry.title} ${entry.notes || ''} ${entry.changes?.map((c: any) => c.metric).join(' ') || ''}`.toLowerCase();
    
    // ETH_HOLDINGS: eth, holdings, accumulation, supply
    if (/eth|holdings|accumulation|supply|total eth/.test(text)) topics.push('ETH_HOLDINGS');
    
    // STAKING: staking, apy, yield, validator
    if (/staking|apy|yield|validator|staked/.test(text)) topics.push('STAKING');
    
    // DILUTION: shares, offering, atm, warrant, dilution
    if (/shares|offering|atm|warrant|dilution|outstanding|authorized/.test(text)) topics.push('DILUTION');
    
    // MINING: btc, bitcoin, mining, hashrate, pre-pivot
    if (/btc|bitcoin|mining|hashrate|pre-pivot|miner/.test(text)) topics.push('MINING');
    
    // STRATEGY: pivot, treasury, strategy, management, acquisition
    if (/pivot|treasury|strategy|management|acquisition|executive|ceo|cfo/.test(text)) topics.push('STRATEGY');
    
    // FINANCIALS: revenue, income, balance, 10-k, 10-q, earnings
    if (/revenue|income|balance|10-k|10-q|earnings|profit|loss|financial/.test(text)) topics.push('FINANCIALS');
    
    return topics;
  };

  const filteredEntries = (filterCategory === 'all' ? timelineEvents : timelineEvents.filter(p => p.category === filterCategory))
    .filter(p => {
      // If no topics selected, show all
      if (selectedTopics.length === 0) return true;
      // AND logic: entry must match ALL selected topics
      const entryTopics = detectTopics(p);
      return selectedTopics.every(t => entryTopics.includes(t));
    });

  const impactColors = {
    positive: 'bg-green-900/20 border-green-700/50',
    negative: 'bg-red-900/20 border-red-700/50',
    neutral: 'bg-slate-800/50 border-slate-700/50',
  };

  const categoryColors = {
    'Holdings': 'bg-blue-500/20 text-blue-400',
    'SEC Filing': 'bg-cyan-500/20 text-cyan-400',
    'Capital': 'bg-emerald-500/20 text-emerald-400',
    'Corporate': 'bg-slate-500/20 text-slate-300',
    'Product': 'bg-green-500/20 text-green-400',
    'Earnings': 'bg-teal-500/20 text-teal-400',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#timeline-header</div>
      <h2 className="section-head" style={{ display: 'flex', alignItems: 'center' }}>Timeline<UpdateIndicators sources="PR" /></h2>

      {/* Latest SEC Filings - Enhanced with filtering and pagination */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#sec-filings</div>
      <div className="card" style={{ }}>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>📁 SEC Filings<UpdateIndicators sources="SEC" /></div>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
                      href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${secMeta.cik}&type=${filing.type.replace('S-3', 'S-3').replace('S-1', 'S-1').replace('S-8', 'S-8')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--violet)' }}
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
        <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12 }}>
            <div>
              <span style={{ color: 'var(--text3)' }}>CIK:</span>
              <span style={{ color: 'var(--text2)', marginLeft: 6, fontFamily: 'Space Mono' }}>{secMeta.cik}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text3)' }}>Ticker:</span>
              <span style={{ color: 'var(--violet)', marginLeft: 6, fontWeight: 600 }}>{secMeta.ticker}</span>
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

      {/* Upcoming Events + Recent Press Releases */}
      <div className="g2" style={{ }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#upcoming-events</div>
          <div className="card">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Upcoming Events<UpdateIndicators sources="PR" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(74,222,128,0.1)', borderRadius: 8, border: '1px solid rgba(74,222,128,0.4)' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>✓ Annual Stockholder Meeting</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Wynn Las Vegas · Prop 2 passed</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: '#4ade80' }}>Jan 15, 2026</div>
                <div style={{ fontSize: 11, color: '#4ade80' }}>Completed</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Q1 2026 Earnings</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>10-Q Quarterly Report</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--violet)' }}>~Jan 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est.</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Dividend Ex-Date</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>$0.01/share quarterly</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: '#4ade80' }}>Q1 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>First payout</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>5% ETH Supply Target</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Currently at 3.55% (~6.04M ETH needed)</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--gold)' }}>71%</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>~1.75M ETH to go</div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#recent-press-releases</div>
          <div className="card">
            {/* [PR_CHECKLIST_RECENT_PRESS_RELEASES] - Add new PR at top! */}
            <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>Recent Press Releases<UpdateIndicators sources="PR" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Feb 2, 2026</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>Holdings</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>ETH Holdings Reach 4,285,125 — 3.55% of Supply, $10.7B, Staking 67.6%</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Jan 26, 2026</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>Holdings</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>ETH Holdings Reach 4,243,338 — 3.52% of Supply, $12.8B, Davos 2026</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Jan 20, 2026</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>Holdings</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>ETH Holdings Reach 4,203,036 — 3.48% of Supply, $14.5B, 81% YES Vote</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Jan 12, 2026</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>Holdings</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>ETH Holdings Reach 4,167,768 — 3.45% of Total Supply, $14.0B</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Jan 9, 2026</span>
                <span style={{ fontSize: 11, color: 'var(--mint)' }}>Leadership</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>CFO/COO Appointed: Young Kim (MIT/HBS, Columbia Threadneedle)</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Jan 2, 2026</span>
                <span style={{ fontSize: 11, color: 'var(--gold)' }}>Proxy</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>Chairman's Message: Vote YES on Auth Shares (500M→50B)</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Dec 29, 2025</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>Holdings</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>ETH Holdings Reach 4,110,525 — 3.41% of Total Supply</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>Nov 21, 2025</span>
                <span style={{ fontSize: 11, color: 'var(--violet)' }}>SEC Filing</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>10-K Annual Report: $805M Unrealized Gain, $349M Net Income</div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Event Timeline Section - CRCL Style */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#event-timeline</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Event Timeline</span>
        <UpdateIndicators sources="PR" />
        <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text3)' }}>({filteredEntries.length} events)</span>
      </h3>

      {/* Topic Filters (AND logic multi-select) */}
      <div className="highlight" style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>
            {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEntries.length} results
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="pills" style={{ }}>
          {categories.map(cat => (
            <button key={cat} className={`pill ${filterCategory === cat ? 'active' : ''}`} onClick={() => setFilterCategory(cat)}>
              {cat === 'all' ? `All (${timelineEvents.length})` : `${cat} (${timelineEvents.filter(p => p.category === cat).length})`}
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
          const verdictClass = entry.impact === 'positive' ? 'positive' : entry.impact === 'negative' ? 'negative' : 'neutral';
          
          return (
            <div key={i} className={`timeline-item ${isExpanded ? 'expanded' : ''}`}>
              <div className="timeline-header" onClick={toggleExpand}>
                <div className="t-date">{entry.date}</div>
                <div className="t-cat">{entry.category}</div>
                <div className="t-event">{entry.title}</div>
                <div className={`t-verdict ${verdictClass}`}>
                  {entry.impact === 'positive' && '↑'}
                  {entry.impact === 'negative' && '↓'}
                  {entry.impact === 'neutral' && '→'}
                  {entry.impact}
                </div>
                <div className="t-toggle">▼</div>
              </div>
              <div className="timeline-details">
                <div className="t-details-content">
                  <div className="t-details-text">
                    {/* Changes Table */}
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>Metric</th>
                          <th className="r">Previous</th>
                          <th className="r">New</th>
                          <th className="r">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.changes.map((c, cidx) => (
                          <tr key={cidx}>
                            <td>{c.metric}</td>
                            <td className="r">{c.previous}</td>
                            <td className="r">{c.new}</td>
                            <td className="r" style={{ color: c.change.startsWith('+') ? 'var(--mint)' : c.change.startsWith('-') ? 'var(--coral)' : undefined }}>{c.change}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Notes */}
                    <div style={{ padding: 12, background: 'var(--surface3)', borderRadius: 8, fontStyle: 'italic', color: 'var(--text3)' }}>
                      💡 {entry.notes}
                    </div>
                  </div>
                  <div className="t-details-meta">
                    <div className="t-meta-item">
                      <div className="t-meta-label">Impact</div>
                      <div className={`t-meta-value ${verdictClass === 'positive' ? 'green' : verdictClass === 'negative' ? 'red' : ''}`}>
                        {entry.impact === 'positive' && '● Bullish'}
                        {entry.impact === 'negative' && '● Bearish'}
                        {entry.impact === 'neutral' && '● Neutral'}
                      </div>
                    </div>
                    <div className="t-meta-item">
                      <div className="t-meta-label">Source</div>
                      <div className="t-meta-value violet">{entry.source}</div>
                    </div>
                    {entry.ethHoldings && (
                      <div className="t-meta-item">
                        <div className="t-meta-label">ETH Holdings</div>
                        <div className="t-meta-value">{entry.ethHoldings.toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* How to Use - Unified styling */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#timeline-header</div>
      <div className="card"><div className="card-title">How to Use This Log</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="text-violet-400 font-medium mb-2">Categories Explained</h4>
            <ul className="space-y-2 text-slate-300">
              <li><span className="text-blue-400">Holdings:</span> ETH accumulation updates, supply %</li>
              <li><span className="text-cyan-400">SEC Filing:</span> 10-K, 10-Q, 8-K filings</li>
              <li><span className="text-emerald-400">Capital:</span> Offerings, ATM, debt financing</li>
              <li><span className="text-slate-300">Corporate:</span> Strategy, management, governance</li>
              <li><span className="text-green-400">Product:</span> Staking, yield, infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 className="text-violet-400 font-medium mb-2">Updating This Log</h4>
            <ul className="space-y-1 text-slate-300">
              <li>• Add new entries chronologically at the top</li>
              <li>• Include sources for traceability</li>
              <li>• Track changes with before/after values</li>
              <li>• Tag impact: positive/negative/neutral</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace' }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Timeline Analysis" items={[
        { term: 'Audit Trail', def: 'Chronological record of all official announcements and filings. Essential for tracking management guidance vs actual results over time.' },
        { term: 'Holdings Updates', def: 'Weekly press releases reporting ETH holdings, staking status, and key metrics. BMNR\'s transparency differentiator vs peers.' },
        { term: 'Category Filters', def: 'Sort by type: Holdings (accumulation), Price (market data), Offerings (dilution), Staking (yield), Management (strategy).' },
        { term: 'Source Attribution', def: 'All data tagged with source (PR, SEC filing, earnings call). Verify claims by checking original documents.' },
        { term: 'Trend Analysis', def: 'Track metrics over time: ETH accumulation rate, NAV growth, staking deployment, dilution events. Reveals execution quality.' },
        { term: 'Correction Handling', def: 'When data is restated, old entries are marked SUPERSEDED (not deleted) and new entries reference the correction.' },
      ]} />
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// WALL STREET TAB - Analyst Coverage & Research Archive
// Track sell-side analyst ratings, price targets, and estimate revisions
// Unified architecture with ASTS/CRCL - Grouped by Firm
// ═══════════════════════════════════════════════════════════════════════════════
const WallStreetTab = () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // ANALYST COVERAGE DATA - Grouped by Firm
  // Add new reports at the TOP of each firm's reports array (newest first)
  // NEVER delete historical reports - this is an audit trail
  // ═══════════════════════════════════════════════════════════════════════════

  const ANALYST_COVERAGE: AnalystCoverage[] = [
    // ═══════════════════════════════════════════════════════════════════════════
    // CANTOR FITZGERALD - N/A (Coverage since January 2026)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      firm: 'Cantor Fitzgerald',
      analyst: 'N/A',
      coverageSince: 'January 2026',
      currentPT: 39,
      currentRating: 'Buy',
      currentRatingNormalized: 'bullish',
      reports: [
        // === Jan 5, 2026 - Initiation with Buy, PT $39 (FULL REPORT) ===
        {
          date: '2026-01-05',
          action: 'Initiation',
          priceTarget: 39,
          previousTarget: null,
          rating: 'Buy',
          ratingNormalized: 'bullish',
          reportTitle: 'BitMine Immersion Technologies - Initiation of Coverage',
          source: 'Cantor Fitzgerald Research',
          isFullReport: true,
          thesis: 'We value BMNR using a sum-of-the-parts (SOTP) valuation approach. Digital Asset NAV ($32.09/share) + Staking Business ($7.20/share) + Treasury Operations ($0/share) = $39 PT. Treasury ops valued at $0 because BMNR trades at discount to mNAV, so capital raises are not accretive to ETH/share.',
          reportSummary: `**SOTP VALUATION FRAMEWORK**
We value BMNR using a sum-of-the-parts (SOTP) valuation approach. This includes:

**DIGITAL ASSET NAV — $32.09/share**
BMNR currently has a total NAV of $13,926m or $32.09/share. ETH Holdings: 4,110,525 ETH. ETH Price: $3,135. BTC Value: $17m. EightCo: $23m. Cash: $1,000m. Shares Outstanding: 434.0m.

**STAKING BUSINESS — $7.20/share**
We take our estimated 2026 staking revenue estimate and subtract cash SG&A to arrive at 2026 cash profit estimate. We apply a 10x multiple on cash profits, yielding a per share value of $7.20. 2026 Staking/Validator Fees: $369m. 2026 Cash SG&A: ($55m). Staking Profit: $314m. Multiple: 10.0x. Equity Value: $3,140m.

**TREASURY OPERATIONS — $0/share**
Given BMNR is trading at a discount to mNAV, it is not able to accrete ETH/share from raising capital. As such, we are valuing this part of the business to be worth $0/share. Current ETH + Cash Per Share: 0.01024. Annual Capital Markets Proceeds: $1,000m. Avg ETH Price: $3,135. ETH Acquired: 318,979. Total shares: 434.0m. Current ETH value per share: $32.09. Average premium: 0%. New Shares: 31.2m. Total ETH - New: 4,761,197. ETH Per Share - New: 0.010236. ETH Yield: 0.0%. Capital Markets Profits: $m. Profit Multiple: 12.0x. Equity Value: $m. Share Price: $0.00.

**SOTP VALUATION — $39.00**
Combining all three components, we arrive at a $39/share price target.`,
          assumptions: [
            { label: 'ETH Holdings', value: '4,110,525 ETH' },
            { label: 'ETH Price', value: '$3,135' },
            { label: 'Digital Asset NAV', value: '$13,926m' },
            { label: 'NAV Per Share', value: '$32.09' },
            { label: '2026 Staking Revenue', value: '$369m' },
            { label: '2026 Cash SG&A', value: '($55m)' },
            { label: 'Staking Profit', value: '$314m' },
            { label: 'Staking Multiple', value: '10.0x' },
            { label: 'Shares Outstanding', value: '434.0m' },
          ],
          catalysts: [
            'ETH price appreciation above $3,135 base case',
            'Staking revenue expansion beyond $369m',
            'Transition to trading at NAV premium (enabling accretive capital raises)',
            'Additional ETH accumulation via operating cash flow',
          ],
          risks: [
            'ETH price decline below $3,135 assumption',
            'Persistent NAV discount preventing accretive treasury operations',
            'Staking revenue compression from validator competition',
            'Regulatory uncertainty on crypto assets',
            'Dilution from capital raises at NAV discount',
          ],
          methodology: 'Sum-of-the-Parts (SOTP): Digital Asset NAV + 10x 2026E Staking Profit + Treasury Ops (valued at $0 due to NAV discount)',
          fullNotes: `DETAILED SOTP BREAKDOWN:

DIGITAL ASSET VALUE TABLE:
| Item | Value |
| ETH Holdings | 4,110,525 |
| ETH Price | $3,135 |
| ETH Value | $12,886m |
| BTC Value | $17m |
| EightCo | $23m |
| Cash | $1,000m |
| ETH + Cash NAV | $13,926m |
| Shares Outstanding | 434.0m |
| NAV per Share | $32.09 |

STAKING/VALIDATOR TABLE:
| Item | Value |
| 2026 Staking/Validator Fees | $369m |
| 2026 Cash SG&A | ($55m) |
| Staking Profit | $314m |
| Multiple | 10.0x |
| Equity Value | $3,140m |
| Shares | 434.0m |
| Per Share Value | $7.20 |

TREASURY OPERATIONS TABLE:
| Item | Value |
| Current ETH + Cash Per Share | 0.01024 |
| Annual Capital Markets Proceeds | $1,000m |
| Avg ETH Price | $3,135 |
| ETH Acquired | 318,979 |
| Total shares | 434.0m |
| Current ETH value per share | $32.09 |
| Average premium | 0% |
| New Shares | 31.2m |
| Total Shares - New | 465.1m |
| Total ETH - New | 4,761,197 |
| ETH Per Share - New | 0.010236 |
| ETH Yield | 0.0% |
| ETH Created | 0 |
| Capital Markets Profits | $m |
| Profit Multiple | 12.0x |
| Equity Value | $m |
| New Shares | 465.1m |
| Share Price | $0.00 |

Source: Company Reports, Cantor Fitzgerald Research, Pricing as of 12/29/2025`
        },
      ]
    },
  ];

  return (
    <>
      <SharedWallStreetTab coverage={ANALYST_COVERAGE} ticker="BMNR" />
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

// Wrap main component with Error Boundary for graceful error handling (C3)
const BMNRWithErrorBoundary = () => (
  <FinancialModelErrorBoundary>
    <BMNRDilutionAnalysis />
  </FinancialModelErrorBoundary>
);

export default BMNRWithErrorBoundary;
