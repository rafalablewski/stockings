/* eslint-disable @typescript-eslint/no-explicit-any */
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
import SharedSourcesTab from '../shared/SharedSourcesTab';
import { SharedAIAgentsTab } from '../shared/SharedAIAgentsTab';
import type { SourceGroup, Competitor } from '../shared/SharedSourcesTab';
import SharedEdgarTab from '../shared/SharedEdgarTab';
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
  LIQUIDITY_POSITION as BMNR_LIQUIDITY,
  CASH_RUNWAY_SCENARIOS as BMNR_RUNWAY_SCENARIOS,
  ETH_LIQUIDITY_FACTORS,
  STAKING_RATIO,
  STAKING_APY,
} from '@/data/bmnr';
import { BMNR_SEC_FILINGS, BMNR_SEC_META, BMNR_SEC_TYPE_COLORS, BMNR_SEC_FILTER_TYPES } from '@/data/bmnr/sec-filings';
import { BMNR_QUARTERLY_DATA, BMNR_MARKET_CAP_DATA } from '@/data/bmnr/quarterly-metrics';
import { BMNR_ANALYST_COVERAGE } from '@/data/bmnr/analyst-coverage';
import { BMNR_TIMELINE_EVENTS } from '@/data/bmnr/timeline-events';
import { BMNR_COMPETITOR_NEWS, type BMNRCompetitorNewsEntry, type BMNRCompetitorId, type BMNRCompetitorNewsCategory, type BMNRImplication } from '@/data/bmnr/competitor-news';
import { BMNR_ADOPTION_TIMELINE } from '@/data/bmnr/ethereum-adoption';

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

// Types imported from '@/data/bmnr/competitor-news': BMNRCompetitorId, BMNRCompetitorNewsCategory, BMNRImplication, BMNRCompetitorNewsEntry

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
          padding: '48px',
          background: 'linear-gradient(135deg, rgba(255,123,114,0.1) 0%, rgba(255,123,114,0.05) 100%)',
          border: '1px solid rgba(255,123,114,0.3)',
          borderRadius: '16px',
          textAlign: 'center',
          margin: '24px'
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
          padding: '4px 12px',
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
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 24px', marginBottom: 12 }}>
    {title && <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>{title}</div>}
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
      padding: '24px',
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
        padding: '12px 16px',
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
 * DEFAULT PARAMETERS - Based on latest official data (Feb 9, 2026 PR)
 * Update these when new weekly holdings PRs are released
 *
 * Current defaults reflect:
 * - ETH Holdings: 4,325,738 (Feb 9, 2026 PR - 3.58% of 120.7M ETH supply)
 * - Shares Outstanding: 434M fully diluted (Feb 9, 2026 PR)
 * - Stock Price: ~$27.15 (Feb 9, 2026) - UPDATE REGULARLY
 * - ETH Price: $2,125 (Feb 8, 2026 Coinbase)
 * - Staking Ratio: 67.0% (2,897,459 ETH staked via 3 providers)
 * - Base Staking APY: 3.11% (CESR rate)
 * - Total Cash: $595M
 * - BTC Holdings: 193 BTC
 * - Moonshots: $19M (Eightco ORBS stake)
 * - Strategic Investments: $200M (Beast Industries - MrBeast, CLOSED Jan 17)
 * - Total Holdings: $10.0B (crypto + cash + moonshots + strategic investments)
 *
 * COMPANY INFO (SEC EDGAR):
 * - CIK: 0001829311
 * - EIN: 84-3986354
 * - SIC: 6199 (Finance Services)
 * - State: Nevada (location) / Delaware (incorporation)
 * - Fiscal Year End: August 31
 */
const BMNRDilutionAnalysis = () => {
  // === DATA FRESHNESS: Last updated Feb 9, 2026 ===
  // Update prices regularly - stale data affects all NAV calculations
  const [currentETH, setCurrentETH] = useState(DEFAULTS.currentETH);  // From @/data/bmnr/company.ts
  const [currentShares, setCurrentShares] = useState(DEFAULTS.currentShares);  // From @/data/bmnr/company.ts
  const [currentStockPrice, setCurrentStockPrice] = useState(DEFAULTS.currentStockPrice);  // From @/data/bmnr/company.ts
  const [ethPrice, setEthPrice] = useState(DEFAULTS.ethPrice);  // From @/data/bmnr/company.ts
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
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
  const [baseStakingAPY, setBaseStakingAPY] = useState(3.11);
  const [restakingBonus, setRestakingBonus] = useState(2.0);
  const [stakingRatio, setStakingRatio] = useState(67.0);  // 2,897,459 / 4,325,738 = 67.0% (Feb 9, 2026 PR)
  const [useDebt, setUseDebt] = useState(true);
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
    // AI hub (grouped under "AI")
    { id: 'ai-agents', label: 'AI Agents', type: 'tracking', group: 'AI' },
    { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
    { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
  ];

  const bmnrCompetitors: Competitor[] = [
    { name: 'Strategy (MSTR)', url: 'https://www.strategy.com/investor-relations' },
    { name: 'Coinbase Blog', url: 'https://www.coinbase.com/blog' },
    { name: 'Coinbase IR', url: 'https://investor.coinbase.com' },
    { name: 'Marathon Digital (MARA)', url: 'https://ir.mara.com' },
    { name: 'Riot Platforms (RIOT)', url: 'https://www.riotplatforms.com' },
    { name: 'CleanSpark (CLSK)', url: 'https://www.cleanspark.com' },
    { name: 'ETHZilla (ETHZ)', url: 'https://ir.ethzilla.com' },
  ];

  const bmnrResearchSources: SourceGroup[] = [
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
                padding: '4px 12px', 
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
            className={`nav-btn nav-dropdown-trigger ${tabs.some(t => t.group === 'BMNR Analysis' && activeTab === t.id) ? 'active' : ''}`}
            onClick={() => { setAnalysisDropdownOpen(!analysisDropdownOpen); setAiDropdownOpen(false); }}
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

          {/* AI hub dropdown trigger */}
          <button
            className={`nav-btn nav-dropdown-trigger ${tabs.some(t => t.group === 'AI' && activeTab === t.id) ? 'active' : ''}`}
            onClick={() => { setAiDropdownOpen(!aiDropdownOpen); setAnalysisDropdownOpen(false); }}
          >
            AI ↕
          </button>
        </nav>

        {/* Reserved space for dropdown menu - always present to prevent layout shift */}
        <div className={`nav-dropdown-space ${analysisDropdownOpen || aiDropdownOpen ? 'open' : ''}`}>
          {analysisDropdownOpen && (
            <div className="nav-dropdown-menu">
              {tabs.filter(t => t.group === 'BMNR Analysis').map(t => (
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
          {aiDropdownOpen && (
            <div className="nav-dropdown-menu">
              {tabs.filter(t => t.group === 'AI').map(t => (
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
        {activeTab === 'capital' && <CapitalTab currentShares={currentShares} currentStockPrice={currentStockPrice} currentETH={currentETH} ethPrice={ethPrice} />}
        {activeTab === 'comps' && <CompsTab comparables={comparables} ethPrice={ethPrice} />}
        {activeTab === 'sensitivity' && <SensitivityTab calc={calc} currentETH={currentETH} currentShares={currentShares} ethPrice={ethPrice} />}
        {activeTab === 'backtest' && <BacktestTab currentETH={currentETH} currentShares={currentShares} currentStockPrice={currentStockPrice} historicalETH={historicalETH} baseStakingAPY={baseStakingAPY} navMultiple={currentStockPrice / calc.currentNAV} />}
        {activeTab === 'monte-carlo' && <MonteCarloTab currentETH={currentETH} currentShares={currentShares} currentStockPrice={currentStockPrice} ethPrice={ethPrice} stakingYield={calc.effectiveAPY} slashingRisk={slashingRisk} liquidityDiscount={liquidityDiscount} operatingCosts={operatingCosts} regulatoryRisk={regulatoryRisk} />}
        {activeTab === 'investment' && <InvestmentTab />}
        {activeTab === 'financials' && <FinancialsTab />}
        {activeTab === 'timeline' && <TimelineTab />}
        {activeTab === 'wall-street' && <WallStreetTab />}
        {activeTab === 'ai-agents' && <SharedAIAgentsTab ticker="BMNR" />}
        {activeTab === 'sources' && (
          <SharedSourcesTab ticker="BMNR" companyName="BitMine Immersion Technologies" researchSources={bmnrResearchSources} competitorLabel="Crypto Treasury Peers" competitors={bmnrCompetitors} />
        )}
        {activeTab === 'edgar' && (
          <SharedEdgarTab ticker="BMNR" companyName="BitMine Immersion Technologies" localFilings={BMNR_SEC_FILINGS} cik={BMNR_SEC_META.cik} typeColors={BMNR_SEC_TYPE_COLORS} />
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 24px', marginBottom: 12, opacity: disabled ? 0.6 : 1 }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>{title}</div>
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
                padding: '12px 4px',
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
              padding: '12px 4px',
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
  // Convert ETH value to millions: (ETH × price) / MILLION = $M
  const terminalNAV = (terminalETH * terminalEthPrice) / 1_000_000; // $M

  // STEP 5: Annual Staking Cash Flow (for dividend/buyback capacity)
  // Use terminalETH for terminal year projections to reflect compounding growth
  // Formula: (terminalETH × terminalEthPrice × stakingYield%) / MILLION = $M/year
  const annualStakingRevenue = (terminalETH * terminalEthPrice * stakingYield / 100) / 1_000_000; // $M/year
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#model-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>DCF Valuation<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Model<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Configure assumptions and scenario presets. All changes flow directly to DCF projections and terminal value calculation.</p>
      </div>

      {/* ASSUMPTIONS SECTION */}
      <>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#scenario-presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            {(['worst', 'bear', 'base', 'mgmt', 'bull', 'moon'] as const).map(s => {
              const preset = BMNR_SCENARIO_PRESETS[s];
              const isActive = selectedScenario === s;
              return (
                <div
                  key={s}
                  onClick={() => applyScenario(s)}
                  style={{
                    padding: '16px 8px',
                    background: isActive ? `${preset.color}15` : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textAlign: 'center',
                    borderBottom: isActive ? `2px solid ${preset.color}` : '2px solid transparent',
                  }}
                >
                  <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{preset.label}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 16, fontWeight: 700, color: isActive ? preset.color : 'var(--text)', margin: '4px 0 2px' }}>
                    {preset.ethGrowthRate > 0 ? '+' : ''}{preset.ethGrowthRate}%
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                    {preset.navPremium}x NAV
                  </div>
                </div>
              );
            })}
          </div>
          {selectedScenario === 'custom' && (
            <div style={{ padding: '8px 12px', background: 'color-mix(in srgb, var(--violet) 8%, transparent)', borderRadius: 8, fontSize: 11, color: 'var(--violet)', marginTop: 8 }}>
              Custom scenario — parameters modified from preset
            </div>
          )}

        {/* CALCULATION MODE TOGGLE */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#calculation-mode</div>
        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Calculation Mode</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Data Source</span></div>
          <div style={{ padding: '24px 24px' }}>
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
        </div>

        {/* ETH GROWTH RATE - Always visible, disabled when using parameters */}
        <div style={{ opacity: ethInputMode === 'current' ? 0.4 : 1, pointerEvents: ethInputMode === 'current' ? 'none' : 'auto' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#eth-growth</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH Growth Projection</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#operating-model</div>
        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Yield & Costs</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <BMNRParameterCard
            title="Staking Yield (% APY)"
            explanation="Annual yield from ETH staking. Base Ethereum staking: 3-4% APY. With restaking (EigenLayer): 4-7%+. BMNR currently stakes ~30% of holdings. Higher yield = more ETH accumulation."
            options={[1, 2, 3.5, 4.5, 5.5, 7]}
            value={stakingYield}
            onChange={v => { setStakingYield(v); setSelectedScenario('custom'); }}
            format="%"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#valuation-params</div>
        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Parameters</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dcf-output</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DCF Output — 5-Year Terminal Year</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Primary Output — Hero KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'color-mix(in srgb, var(--accent) 30%, var(--border))', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 600 }}>Target Price</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 32, fontWeight: 700, color: 'var(--accent)', margin: '6px 0 4px' }}>{targetStockPrice > 0 ? `$${targetStockPrice.toFixed(0)}` : 'N/A'}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>vs ${currentStockPrice.toFixed(2)} current</div>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 600 }}>Implied Upside</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 32, fontWeight: 700, color: impliedUpside > 50 ? 'var(--mint)' : impliedUpside > 0 ? 'var(--gold)' : 'var(--coral)', margin: '6px 0 4px' }}>{targetStockPrice > 0 ? `${impliedUpside > 0 ? '+' : ''}${impliedUpside.toFixed(0)}%` : 'N/A'}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{impliedUpside > 100 ? 'Strong Buy' : impliedUpside > 25 ? 'Buy' : impliedUpside > 0 ? 'Hold' : 'Sell'}</div>
            </div>
          </div>

          {/* Valuation Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 12 }}>
            {[
              { label: 'Present Value', value: `$${(presentValueEV / 1000).toFixed(2)}B`, sub: `Terminal ÷ ${discountFactor.toFixed(2)}x`, color: 'var(--text)' },
              { label: 'Market Cap', value: `$${((currentShares * currentStockPrice) / 1000).toFixed(2)}B`, sub: `${currentPriceToNAV.toFixed(2)}x current NAV`, color: 'var(--text)' },
              { label: 'Terminal ETH Price', value: `$${terminalEthPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, sub: ethInputMode === 'current' ? 'current (no growth)' : `${ethGrowthRate > 0 ? '+' : ''}${ethGrowthRate}%/yr × 5yrs`, color: 'var(--text)' },
              { label: 'Terminal ETH Holdings', value: `${(terminalETH / 1_000_000).toFixed(2)}M`, sub: `+${((terminalETH / currentETH - 1) * 100).toFixed(1)}% from yield`, color: 'var(--text)' },
              { label: 'Terminal NAV', value: `$${(terminalNAV / 1000).toFixed(2)}B`, sub: `${(terminalNAV / currentNAV).toFixed(1)}x current`, color: 'var(--text)' },
              { label: 'Terminal Shares', value: `${terminalShares.toFixed(0)}M`, sub: `${dilutionRate}%/yr × 5yr`, color: 'var(--text)' },
              { label: 'Current P/NAV', value: `${currentPriceToNAV.toFixed(2)}x`, sub: currentPriceToNAV > 1 ? 'Premium' : 'Discount', color: 'var(--text)' },
              { label: 'Implied Yield', value: `${impliedDividendYield.toFixed(2)}%`, sub: 'Net staking / Mkt Cap', color: 'var(--text)' },
              { label: 'Annual Staking Rev', value: `$${annualStakingRevenue.toFixed(1)}M`, sub: `${stakingYield}% × $${(currentETH * ethPrice / 1_000_000).toFixed(0)}M`, color: 'var(--text)' },
              { label: 'Terminal NAV/Share', value: `$${terminalNavPerShare.toFixed(2)}`, sub: `at ${navPremium}x = $${terminalPriceAtNav.toFixed(0)}`, color: 'var(--accent)' },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: 'var(--surface)', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700, color: kpi.color, margin: '6px 0 4px' }}>{kpi.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

        {/* CALCULATION METHODOLOGY */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 32 }}>#methodology</div>
        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Methodology</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>NAV-Based Valuation</div>
            <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0, lineHeight: 1.7 }}>
              NAV-based valuation for ETH treasury companies. Discount rate captures ALL risk (regulatory, liquidity, tech, execution) in one number.
            </p>
          </div>
          <div style={{ padding: '24px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { step: '1-4', title: 'Terminal Year NAV', color: 'var(--accent)', items: [
                  { label: 'ETH Price', formula: ethInputMode === 'growth' ? `$${ethPrice.toLocaleString()} × (1+${ethGrowthRate}%)^5` : `$${ethPrice.toLocaleString()} (current)`, result: `$${terminalEthPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                  { label: 'ETH Holdings', formula: `${currentETH.toLocaleString()} × (1+${(netYieldRate * 100).toFixed(2)}%)^5`, result: terminalETH.toLocaleString(undefined, { maximumFractionDigits: 0 }) },
                  { label: 'Terminal NAV', formula: `${(terminalETH / 1_000_000).toFixed(2)}M ETH × $${terminalEthPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, result: `$${(terminalNAV / 1000).toFixed(2)}B` },
                ]},
                { step: '5-7', title: 'NAV Per Share', color: 'var(--sky)', items: [
                  { label: 'Diluted Shares', formula: `${currentShares}M × (1+${dilutionRate}%)^5`, result: `${terminalShares.toFixed(0)}M` },
                  { label: 'NAV/Share', formula: `$${(terminalNAV / 1000).toFixed(2)}B ÷ ${terminalShares.toFixed(0)}M`, result: `$${terminalNavPerShare.toFixed(2)}` },
                  { label: `At ${navPremium}x Premium`, formula: `$${terminalNavPerShare.toFixed(2)} × ${navPremium}`, result: `$${terminalPriceAtNav.toFixed(2)}` },
                ]},
                { step: '8', title: 'Discount Factor', color: 'var(--gold)', items: [
                  { label: 'Discount Rate', formula: 'Captures time value + ALL risk', result: `${discountRate}%` },
                  { label: 'Factor', formula: `(1 + ${discountRate}%)^5`, result: `${discountFactor.toFixed(2)}x` },
                ]},
                { step: '9-10', title: 'Target Price', color: 'var(--mint)', items: [
                  { label: 'Target Price', formula: `$${terminalPriceAtNav.toFixed(2)} ÷ ${discountFactor.toFixed(2)}`, result: `$${targetStockPrice.toFixed(2)}` },
                  { label: 'Implied Upside', formula: `($${targetStockPrice.toFixed(2)} - $${currentStockPrice.toFixed(2)}) / $${currentStockPrice.toFixed(2)}`, result: `${impliedUpside > 0 ? '+' : ''}${impliedUpside.toFixed(0)}%` },
                ]},
              ].map((section, si) => (
                <div key={si} style={{ background: 'var(--surface2)', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ background: section.color, color: 'var(--bg)', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, fontFamily: 'Space Mono' }}>Step {section.step}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{section.title}</span>
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.items.map((item, ii) => (
                      <div key={ii} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text2)' }}>{item.label}</div>
                          <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Space Mono', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.formula}</div>
                        </div>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 13, fontWeight: 700, color: section.color, flexShrink: 0 }}>{item.result}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '16px 16px', background: 'color-mix(in srgb, var(--accent) 6%, transparent)', borderRadius: 10, fontSize: 12, color: 'var(--text3)', lineHeight: 1.7, marginTop: 16, border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text2)', marginBottom: 4 }}>Key Assumptions</div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                <li>Terminal year: {new Date().getFullYear() + 5} (5 years out)</li>
                <li>Discount rate captures ALL risk in one number (no separate risk factors)</li>
                <li>Staking yield compounds ETH holdings; operating costs reduce effective yield</li>
              </ul>
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>{title}</span></div>
      <div style={{ padding: '24px 24px' }}>
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
                padding: '12px 4px',
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
              padding: '12px 4px',
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
            {isCustomValue ? formatValue(value) : '...'}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginTop: 8 }}>
        ← Bearish | Bullish →
      </div>
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
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-thesis</div>
    {/* Hero — Ive×Tesla */}
    <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></div>
      <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Overview<span style={{ color: 'var(--accent)' }}>.</span></h2>
      <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}><strong style={{ color: 'var(--text2)', fontWeight: 500 }}>BMNR:</strong> ETH treasury company accumulating ETH through strategic capital raises and generating yield via staking. Key metrics: NAV per share, NAV premium/discount, and dividend yield.</p>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#opportunity</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginBottom: 8 }}>#thesis-bull</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mint)' }}>Bull Case</span>
          <UpdateIndicators sources="PR" />
        </div>
        {[
          'ETH price appreciation — Cycle targets $10K-$15K+',
          'NAV premium expansion — MSTR trades 2-3x; BMNR could follow',
          'ETF/index inclusion — Forces passive buying, liquidity premium',
          'Dividend growth — Staking scales → higher payouts',
          'MAVAN launch — Proprietary staking = higher yields',
          'Regulatory clarity — ETH not a security, staking approved',
        ].map(item => (
          <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--mint)', flexShrink: 0 }}>+</span>{item}
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginBottom: 8 }}>#thesis-bear</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--coral)' }}>Bear Case</span>
          <UpdateIndicators sources="PR" />
        </div>
        {[
          'ETH price crash — Crypto winter, -70% drawdowns possible',
          'NAV discount — Premium compresses or inverts',
          'Dilution risk — Aggressive ATM erodes ETH/share',
          'Slashing events — Validator penalties reduce holdings',
          'Regulatory action — SEC deems ETH a security',
          'Execution risk — MAVAN delays, competition',
        ].map(item => (
          <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--coral)', flexShrink: 0 }}>-</span>{item}
          </div>
        ))}
      </div>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#chart</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH Holdings Growth</span>
        <UpdateIndicators sources="PR" />
      </div>
      <div style={{ padding: '24px 24px 0', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200, minWidth: holdingsData.length * 64 }}>
        {holdingsData.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
            <div style={{ width: '100%', background: 'var(--accent)', borderRadius: '4px 4px 0 0', height: maxValue > 0 ? Math.round((d.value / maxValue) * 150) : 0, minHeight: d.value > 0 ? 2 : 0, transition: 'height 0.3s' }} />
            <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
          </div>
        ))}
        </div>
      </div>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#key-metrics</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
        {['Metric', 'Value', 'Description'].map(h => (
          <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Value' ? 'right' : 'left' }}>{h}</span>
        ))}
      </div>
      {[
        { metric: 'NAV/Share', value: `$${calc.currentNAV.toFixed(2)}`, desc: 'Book value per share', color: 'var(--text)' },
        { metric: 'Stock Price', value: `$${currentStockPrice.toFixed(2)}`, desc: 'Market price', color: 'var(--text)' },
        { metric: 'Premium/Discount', value: `${calc.navPremium >= 0 ? '+' : ''}${calc.navPremium.toFixed(1)}%`, desc: calc.navPremium >= 0 ? 'Trading above NAV' : 'Trading below NAV', color: calc.navPremium >= 0 ? 'var(--mint)' : 'var(--coral)' },
        { metric: 'Dividend Yield', value: `${calc.dividendYield.toFixed(2)}%`, desc: `$${calc.annualDividend.toFixed(2)}/share annually`, color: 'var(--mint)' },
      ].map((row, i, arr) => (
        <div key={row.metric} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', padding: '12px 24px', borderBottom: i < arr.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
          <span style={{ fontSize: 13, color: 'var(--text)' }}>{row.metric}</span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 600, color: row.color, textAlign: 'right' }}>{row.value}</span>
          <span style={{ fontSize: 12, color: 'var(--text3)', paddingLeft: 16 }}>{row.desc}</span>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#company-snapshot</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
      {[
        { metric: 'Total ETH', value: currentETH.toLocaleString(), sub: 'Holdings', color: 'var(--text)' },
        { metric: 'ETH Price', value: `$${ethPrice.toLocaleString()}`, sub: 'Current', color: 'var(--text)' },
        { metric: 'Total Value', value: `$${((currentETH * ethPrice) / 1e9).toFixed(2)}B`, sub: 'ETH holdings', color: 'var(--accent)' },
        { metric: 'Annual Yield', value: `${Math.round(calc.annualYieldETH).toLocaleString()} ETH`, sub: 'Staking', color: 'var(--text)' },
        { metric: 'Shares', value: `${currentShares}M`, sub: 'Outstanding', color: 'var(--text)' },
        { metric: 'Market Cap', value: `$${(calc.marketCap / 1e9).toFixed(2)}B`, sub: 'Equity', color: 'var(--text)' },
        { metric: 'NAV Multiple', value: `${(currentStockPrice / calc.currentNAV).toFixed(2)}x`, sub: 'Premium/Discount', color: 'var(--accent)' },
        { metric: 'ETH/Share', value: calc.ethPerShare.toFixed(6), sub: 'Per share', color: 'var(--text)' },
        { metric: 'Quarterly Div', value: `$${quarterlyDividend.toFixed(2)}`, sub: 'Per share', color: 'var(--text)' },
        { metric: 'Annual Div', value: `$${calc.annualDividend.toFixed(2)}`, sub: 'Per share', color: 'var(--text)' },
        { metric: 'Div Yield', value: `${calc.dividendYield.toFixed(2)}%`, sub: 'Annualized', color: 'var(--accent)' },
        { metric: 'Payout', value: `$${(calc.totalAnnualDividendPayout / 1e6).toFixed(1)}M`, sub: 'Annual total', color: 'var(--text)' },
      ].map(row => (
        <div key={row.metric} style={{ background: 'var(--surface)', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{row.metric}</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700, color: row.color, margin: '6px 0 4px' }}>{row.value}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{row.sub}</div>
        </div>
      ))}
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#parameters-header</div>
    <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#treasury-assets</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-structure</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
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
      />
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dividend-income</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
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

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#chart-header</div>
    <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Stock Chart</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#stock-chart</div>
    <StockChart symbol="BMNR" externalRefreshKey={chartRefreshKey} onPriceUpdate={(price) => setCurrentStockPrice(price)} />

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Scenario Simulation</span><UpdateIndicators sources={['PR', 'SEC']} /><span style={{ flex: 1, height: 1, background: 'var(--border)' }} /></div>

      <div className="highlight">
        <h3>Multi-Year Projections</h3>
        <p className="text-sm">
          Model stock price under different ETH price trajectories and market conditions.
          Bear case assumes crypto winter and NAV discount. Bull case models ETH appreciation with NAV premium.
          Adjust time horizon to see how outcomes compound.
        </p>
      </div>

      {/* Controls - Target Year and Scenario Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Target Year</span></div>
          <div style={{ padding: '24px 24px' }}>
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
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Scenario</span></div>
          <div style={{ padding: '24px 24px' }}>
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
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', borderLeft: `4px solid ${selected.color}`, padding: '24px 24px' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
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
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Financial Projections — {selected.name} Scenario</span></div>
            <div style={{ padding: '24px 24px' }}>
            <div style={{ overflowX: 'auto' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px' }}>Metric</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>Today</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>
                    {p.year}
                  </span>
                ))}
              </div>
              {/* ETH Price row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>ETH Price</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>${ethPrice.toLocaleString()}</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.ethPrice.toLocaleString()}
                  </span>
                ))}
              </div>
              {/* ETH Holdings row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>ETH Holdings (M)</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>{(currentETH / 1e6).toFixed(3)}</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {(p.ethHoldings / 1e6).toFixed(3)}
                  </span>
                ))}
              </div>
              {/* Shares row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>Shares (M)</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>{currentShares.toFixed(0)}</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.shares.toFixed(0)}
                  </span>
                ))}
              </div>
              {/* NAV/Share row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderTop: '1px solid var(--border)', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>NAV/Share</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>${calc.currentNAV.toFixed(2)}</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.nav.toFixed(2)}
                  </span>
                ))}
              </div>
              {/* Stock Price row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>Stock Price</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>${currentStockPrice.toFixed(2)}</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: selected.color, background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.stockPrice.toFixed(2)}
                  </span>
                ))}
              </div>
              {/* Cum. Dividends row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>Cum. Dividends</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>$0.00</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--mint)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    ${p.cumDividends.toFixed(2)}
                  </span>
                ))}
              </div>
              {/* Price Return row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)`, borderTop: '1px solid var(--border)', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>Price Return</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>—</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', color: p.priceReturn >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.priceReturn >= 0 ? '+' : ''}{p.priceReturn.toFixed(0)}%
                  </span>
                ))}
              </div>
              {/* Total Return row */}
              <div style={{ display: 'grid', gridTemplateColumns: `150px 100px repeat(${selected.projections.length}, 100px)` }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>Total Return</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>—</span>
                {selected.projections.map(p => (
                  <span key={p.year} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: p.totalReturn >= 0 ? 'var(--mint)' : 'var(--coral)', background: p.year === targetYear ? 'rgba(0,212,170,0.1)' : 'transparent' }}>
                    {p.totalReturn >= 0 ? '+' : ''}{p.totalReturn.toFixed(0)}%
                  </span>
                ))}
              </div>
            </div>
            </div>
          </div>
          </>
        );
      })()}

      {/* KEY ASSUMPTIONS & CATALYSTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Assumptions</span></div>
          <div style={{ padding: '24px 24px' }}>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
            {scenarios.find(s => s.id === selectedScenario)?.assumptions.map((a, i) => (
              <li key={i} style={{ lineHeight: 1.5 }}>{a}</li>
            ))}
          </ul>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>{scenarios.find(s => s.id === selectedScenario)?.catalysts.length > 0 ? 'Catalysts' : 'Key Risks'}</span></div>
          <div style={{ padding: '24px 24px' }}>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
            {(scenarios.find(s => s.id === selectedScenario)?.catalysts.length > 0 ? scenarios.find(s => s.id === selectedScenario)?.catalysts : scenarios.find(s => s.id === selectedScenario)?.risks)?.map((item, i) => (
              <li key={i} style={{ lineHeight: 1.5 }}>{item}</li>
            ))}
          </ul>
          {scenarios.find(s => s.id === selectedScenario)?.catalysts.length > 0 && scenarios.find(s => s.id === selectedScenario)?.risks.length > 0 && (
            <>
              <div style={{ padding: '24px 0 12px', borderTop: '1px solid var(--border)', marginTop: 16 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Risks</span></div>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text2)' }}>
                {scenarios.find(s => s.id === selectedScenario)?.risks.map((r, i) => (
                  <li key={i} style={{ lineHeight: 1.5 }}>{r}</li>
                ))}
              </ul>
            </>
          )}
          </div>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
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
              {/* PWEV Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px' }}>Scenario</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>Probability</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>Stock Price</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>Return</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>Weighted Contribution</span>
              </div>
              {scenarios.map(s => {
                const contribution = s.finalStockPrice * (s.prob / 100);
                return (
                  <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', background: selectedScenario === s.id ? `${s.color}11` : 'transparent' }} onMouseEnter={e => e.currentTarget.style.background = selectedScenario === s.id ? `${s.color}11` : 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = selectedScenario === s.id ? `${s.color}11` : 'transparent'}>
                    <span style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: s.color, marginRight: 8 }}></span>
                      {s.name}
                    </span>
                    <span style={{ padding: '12px 16px', textAlign: 'right' }}>{s.prob}%</span>
                    <span style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'Space Mono' }}>${s.finalStockPrice.toFixed(2)}</span>
                    <span style={{ padding: '12px 16px', textAlign: 'right', color: s.stockReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                      {s.stockReturn >= 0 ? '+' : ''}{s.stockReturn.toFixed(0)}%
                    </span>
                    <span style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'Space Mono', color: 'var(--sky)' }}>${contribution.toFixed(2)}</span>
                  </div>
                );
              })}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', borderTop: '2px solid var(--border)', fontWeight: 700 }}>
                <span style={{ padding: '12px 16px' }}>Expected Value</span>
                <span style={{ padding: '12px 16px', textAlign: 'right' }}>100%</span>
                <span style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'Space Mono', color: 'var(--mint)' }}>${pwev.stockPrice.toFixed(2)}</span>
                <span style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--mint)' }}>{expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(0)}%</span>
                <span style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'Space Mono', color: 'var(--mint)' }}>${pwev.stockPrice.toFixed(2)}</span>
              </div>
            </>
          );
        })()}
      </div>

      {/* Comparison Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>All Scenarios — {targetYear} Comparison</span></div>
        <div style={{ padding: '24px 24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', padding: '12px 16px' }}>Metric</span>
            {scenarios.map(s => (
              <span key={s.id} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: s.color, background: 'var(--surface2)', padding: '12px 16px', textAlign: 'right' }}>{s.name}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>ETH Price ($)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right' }}>${s.ethPrice.toLocaleString()}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>ETH Holdings (M)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right' }}>{(s.futureETH / 1e6).toFixed(2)}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>NAV/Share ($)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right' }}>${s.finalNAV.toFixed(2)}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', fontWeight: 700 }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>Stock Price ($)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right', color: s.color }}>${s.finalStockPrice.toFixed(2)}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>Cum. Dividends ($)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--mint)' }}>${s.totalDividends.toFixed(2)}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>Price Return (%)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right', color: s.stockReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{s.stockReturn >= 0 ? '+' : ''}{s.stockReturn.toFixed(0)}%</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)`, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', fontWeight: 700 }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>Total Return (%)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right', color: s.totalReturn >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{s.totalReturn >= 0 ? '+' : ''}{s.totalReturn.toFixed(0)}%</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${scenarios.length}, 1fr)` }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ padding: '12px 16px', fontSize: 13 }}>Total IRR (%)</span>
            {scenarios.map(s => <span key={s.id} style={{ padding: '12px 16px', textAlign: 'right', color: s.totalIRR >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{s.totalIRR >= 0 ? '+' : ''}{s.totalIRR.toFixed(1)}%</span>)}
          </div>
        </div>
        </div>
      </div>

      {/* Key Insights */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Insights</span></div>
        <div style={{ padding: '24px 24px' }}>
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
      </div>

      {/* METHODOLOGY & ASSUMPTIONS */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Methodology & Assumptions</span></div>
        <div style={{ padding: '24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#staking-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Yield Engine</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Staking<span style={{ color: 'var(--mint)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>BMNR generates yield by staking ETH through validators. Compare staking strategies and model compounding returns over time.</p>
      </div>
      {/* Strategy Selector — Glass grid interactive */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#staking-strategy</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }} aria-label="Staking strategy selection">
        {[
          { key: 'solo', label: 'Solo Staking', apy: soloAPY, desc: 'Run validators. +0.5% MEV/tips.', risk: 'Higher risk: slashing, technical', riskColor: 'var(--gold)' },
          { key: 'liquid', label: 'Liquid Staking', apy: liquidAPY, desc: 'Lido (stETH), Rocket Pool (rETH)', risk: 'Medium risk: smart contract', riskColor: 'var(--gold)' },
          { key: 'restaking', label: 'Restaking', apy: restakingAPY, desc: `EigenLayer + LSTs. +${restakingBonus}% bonus.`, risk: 'Higher risk: AVS slashing', riskColor: 'var(--coral)' },
        ].map(s => (
          <div key={s.key} role="button" tabIndex={0} aria-label={`Select ${s.label} strategy`}
            onClick={() => setStakingType(s.key)} onKeyDown={(e) => e.key === 'Enter' && setStakingType(s.key)}
            style={{ background: stakingType === s.key ? 'color-mix(in srgb, var(--violet) 8%, var(--surface))' : 'var(--surface)', padding: '24px 16px', cursor: 'pointer', transition: 'all 0.2s', borderBottom: stakingType === s.key ? '3px solid var(--violet)' : '3px solid transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: stakingType === s.key ? 'var(--text)' : 'var(--text2)' }}>{s.label}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, color: 'var(--mint)' }}>{s.apy.toFixed(1)}%</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{s.desc}</div>
            <div style={{ fontSize: 11, color: s.riskColor }}>{s.risk}</div>
          </div>
        ))}
      </div>

      {/* Parameters — Preset card layout */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#staking-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Base APY (%)" explanation="Annual staking yield from Ethereum proof-of-stake. Higher APY = more ETH income for BMNR treasury." options={[1.5, 2.0, 3.11, 4.0, 5.0, 6.0]} value={baseStakingAPY} onChange={setBaseStakingAPY} format="%" currentValue={3.11} />
        <OverviewParameterCard title="Restaking Bonus (%)" explanation="Additional yield from EigenLayer restaking. Higher bonus = more income but increased smart contract risk." options={[0, 0.5, 1.0, 2.0, 3.0, 5.0]} value={restakingBonus} onChange={setRestakingBonus} format="%" currentValue={2.0} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <OverviewParameterCard title="% ETH Staked" explanation="Percentage of BMNR treasury ETH actively staked. Higher ratio = more income but less liquidity." options={[20, 40, 50, 67, 80, 95]} value={stakingRatio} onChange={setStakingRatio} format="%" currentValue={67.0} />
        <OverviewParameterCard title="Slashing Risk (%/yr)" explanation="Annual probability of validator slashing penalty. Lower risk = safer staking income." options={[2.0, 1.5, 1.0, 0.5, 0.2, 0.1]} value={slashingRisk} onChange={setSlashingRisk} format="%" currentValue={0.5} />
      </div>

      {/* Output KPIs — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#staking-output</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Effective APY', value: `${calc.effectiveAPY.toFixed(2)}%`, sub: 'Net annual yield', color: 'var(--mint)' },
          { label: 'Staked ETH', value: `${(calc.stakedETH / 1e6).toFixed(2)}M`, sub: `${stakingRatio}% of holdings`, color: 'var(--sky)' },
          { label: 'Annual Yield', value: `${Math.round(calc.annualYieldETH).toLocaleString()} ETH`, sub: 'Before slashing', color: 'var(--gold)' },
          { label: 'Yield Value', value: `$${(calc.annualYieldUSD / 1e6).toFixed(1)}M`, sub: 'At current price', color: 'var(--violet)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Yield Projections — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#staking-projections</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Yield Projections (Compounding)</span>
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Year', 'Yield ETH', 'Total ETH', 'NAV/Share'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Year' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {projections.map((p, i) => (
            <div key={p.year} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', padding: '12px 24px', borderBottom: i < projections.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text)' }}>{p.year}Y</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', textAlign: 'right' }}>+{Math.round(p.yieldETH).toLocaleString()}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{(p.totalETH / 1e6).toFixed(2)}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text)', fontWeight: 600, textAlign: 'right' }}>${p.nav.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Equity Structure</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Dilution<span style={{ color: 'var(--violet)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Model the impact of share issuance on NAV per share. Accretive when issued above NAV; dilutive when below.</p>
      </div>
      {/* Dilution Parameters — Preset card layout */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Dilution %" explanation="Percentage of new shares issued. Lower dilution preserves more value per share for existing shareholders." options={[25, 20, 15, 10, 5, 2]} value={dilutionPercent} onChange={setDilutionPercent} format="%" currentValue={5} />
        <OverviewParameterCard title="Sale Discount %" explanation="Discount to market price for share offering. Lower discount = less value transferred from existing shareholders." options={[25, 20, 15, 10, 5, 0]} value={saleDiscount} onChange={setSaleDiscount} format="%" currentValue={5} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <OverviewParameterCard title="NAV Multiple" explanation="Market price as multiple of Net Asset Value. Higher multiple = greater market premium on ETH holdings." options={[0.5, 0.7, 1.0, 1.3, 1.5, 2.0]} value={navMultiple} onChange={setNavMultiple} currentValue={1.0} />
      </div>
      {/* Single Tranche — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#single-tranche</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Single Tranche</span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text3)' }}>Available: {(maxAuthorizedShares - currentShares).toLocaleString()}M</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { label: 'New Shares', value: `${singleTranche.newShares.toFixed(0)}M`, sub: 'Issued', color: 'var(--sky)' },
            { label: 'Proceeds', value: `$${(singleTranche.proceeds / 1e9).toFixed(2)}B`, sub: 'Raised', color: 'var(--mint)' },
            { label: 'ETH Bought', value: `${(singleTranche.ethBought / 1e6).toFixed(2)}M`, sub: 'Purchased', color: 'var(--gold)' },
            { label: 'NAV Change', value: `${singleTranche.navChange >= 0 ? '+' : ''}${singleTranche.navChange.toFixed(1)}%`, sub: singleTranche.navChange >= 0 ? 'Accretive' : 'Dilutive', color: singleTranche.navChange >= 0 ? 'var(--mint)' : 'var(--coral)' },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700, color: kpi.color, margin: '6px 0 2px' }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Tranche — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#multi-tranche</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Multi-Tranche Schedule</span>
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>Active: {tranches.filter(t => t.enabled).length}</span>
        </div>
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }} aria-label="Multi-tranche dilution schedule">
          {tranches.map(t => {
            const result = multiTranche.results.find(r => r.id === t.id);
            return (
              <div key={t.id} style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, background: t.enabled ? 'color-mix(in srgb, var(--violet) 3%, var(--surface))' : 'var(--surface)', opacity: t.enabled ? 1 : 0.5, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={t.enabled} onChange={e => updateTranche(t.id, 'enabled', e.target.checked)} style={{ width: 16, height: 16 }} aria-label={`Enable tranche ${t.id}`} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, flex: 1 }}>
                  <Input label="Year" value={t.year} onChange={v => updateTranche(t.id, 'year', v)} step={0.5} />
                  <Input label="Shares (M)" value={t.sharesM} onChange={v => updateTranche(t.id, 'sharesM', v)} />
                  <Input label="ETH Price ($)" value={t.ethPrice} onChange={v => updateTranche(t.id, 'ethPrice', v)} />
                  {result && <div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>Accretion</div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 16, fontWeight: 700, color: result.accretion >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{result.accretion >= 0 ? '+' : ''}{result.accretion.toFixed(1)}%</div>
                  </div>}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Cumulative Accretion</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: multiTranche.totalAccretion >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{multiTranche.totalAccretion >= 0 ? '+' : ''}{multiTranche.totalAccretion.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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

// CASH RUNWAY / LIQUIDITY TAB — ETH treasury-adapted liquidity analysis
// Mirrors ASTS Capital tab's liquidity view but customized for BMNR's ETH treasury model
const BMNRRunwayTab = ({ calc, currentETH, currentShares, ethPrice, currentStockPrice }) => {
  const liq = BMNR_LIQUIDITY;
  const scenarios = BMNR_RUNWAY_SCENARIOS;
  const factors = ETH_LIQUIDITY_FACTORS;

  // Live calculations
  const ethValueB = (currentETH * ethPrice) / 1e9;
  const totalLiquidityB = ethValueB + liq.cashAndEquiv / 1000;
  const stakingYieldQ = (currentETH * STAKING_RATIO * ethPrice * STAKING_APY) / 4 / 1e6;  const netBurnQ = liq.quarterlyOpEx - stakingYieldQ;
  const cashRunwayQ = netBurnQ < 0 ? 999 : liq.cashAndEquiv / netBurnQ;

  // ETH price stress scenarios
  const stressScenarios = [
    { label: 'Current', ethPx: ethPrice, drop: 0 },
    { label: '-25%', ethPx: ethPrice * 0.75, drop: -25 },
    { label: '-50%', ethPx: ethPrice * 0.50, drop: -50 },
    { label: '-75%', ethPx: ethPrice * 0.25, drop: -75 },
  ].map(s => {
    const yieldQ = (currentETH * STAKING_RATIO * s.ethPx * STAKING_APY) / 4 / 1e6;
    const net = liq.quarterlyOpEx - yieldQ;
    return { ...s, yieldQ, netBurn: net, runway: net <= 0 ? 999 : liq.cashAndEquiv / net, totalLiq: (currentETH * s.ethPx) / 1e9 + liq.cashAndEquiv / 1000 };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#runway-header</div>
      {/* Hero */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Capital Position</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Cash Runway<span style={{ color: 'var(--mint)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>ETH treasury model with {(currentETH / 1e6).toFixed(3)}M ETH (~${ethValueB.toFixed(1)}B). Staking yield exceeds operational costs. Zero debt. {netBurnQ < 0 ? 'Cash-flow positive.' : `~${cashRunwayQ.toFixed(0)}Q runway.`}</p>
      </div>

      {/* Treasury Dashboard KPIs */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#runway-metrics</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Cash', value: `$${liq.cashAndEquiv}M`, sub: 'Fiat reserves', color: 'var(--mint)' },
          { label: 'ETH Value', value: `$${ethValueB.toFixed(1)}B`, sub: `${(currentETH / 1e6).toFixed(3)}M ETH`, color: 'var(--violet)' },
          { label: 'Total Liquidity', value: `$${totalLiquidityB.toFixed(1)}B`, sub: 'Cash + ETH', color: 'var(--sky)' },
          { label: 'Staking Yield/Q', value: `$${stakingYieldQ.toFixed(0)}M`, sub: '~3.11% APY', color: 'var(--gold)' },
          { label: 'Net Burn/Q', value: netBurnQ < 0 ? `+$${Math.abs(netBurnQ).toFixed(0)}M` : `$${netBurnQ.toFixed(0)}M`, sub: netBurnQ < 0 ? 'Cash positive' : 'Net outflow', color: netBurnQ < 0 ? 'var(--mint)' : 'var(--coral)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* ETH Price Stress Scenarios */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#eth-stress-scenarios</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Runway Under ETH Price Stress</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {stressScenarios.map(s => (
            <div key={s.label} style={{ background: s.runway >= 999 ? 'color-mix(in srgb, var(--mint) 3%, var(--surface))' : s.runway > 12 ? 'var(--surface)' : 'color-mix(in srgb, var(--coral) 3%, var(--surface))', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>ETH ${s.ethPx.toFixed(0)}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700, color: s.runway >= 999 ? 'var(--mint)' : s.runway > 12 ? 'var(--gold)' : 'var(--coral)', margin: '8px 0 4px' }}>
                {s.runway >= 999 ? 'Infinite' : `${s.runway.toFixed(0)}Q`}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>Yield: ${s.yieldQ.toFixed(0)}M/Q</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>Liq: ${s.totalLiq.toFixed(1)}B</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          Cash runway remains positive even at -75% ETH because staking yield ($20M+/Q) approximately covers operational expenses ($18M/Q). Only total yield collapse threatens runway.
        </div>
      </div>

      {/* Runway Scenarios Table */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#runway-scenarios</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Forward-Looking Runway Scenarios</span>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Scenario', 'Cash', 'Burn/Q', 'Yield/Q', 'Runway'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Scenario' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {scenarios.map((s, i) => (
            <div key={s.label} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', padding: '12px 24px', borderBottom: i < scenarios.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ fontSize: 12, color: 'var(--text)' }}>{s.label}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${s.startingCash}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--coral)', textAlign: 'right' }}>${s.quarterlyBurn}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--mint)', textAlign: 'right' }}>${s.quarterlyRevenue}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: s.runwayQuarters >= 999 ? 'var(--mint)' : 'var(--gold)', textAlign: 'right' }}>{s.runwayQuarters >= 999 ? 'Infinite' : `${s.runwayQuarters.toFixed(0)}Q`}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          Yield/Q includes staking income as partial burn offset. Only in Crypto Winter (no yield) scenario does cash runway become finite.
        </div>
      </div>

      {/* Balance Sheet Liquidity Factors */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#liquidity-factors</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH Treasury Liquidity Factors</span>
        </div>
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Unrealized Gains/Losses', desc: factors.unrealizedGainRisk, color: 'var(--gold)' },
            { title: 'Staking as Revenue Offset', desc: factors.stakingAsRevenueOffset, color: 'var(--mint)' },
            { title: 'Capital Raises Purpose', desc: factors.raisesPurpose, color: 'var(--violet)' },
            { title: 'Mining Wind-Down', desc: factors.miningWindDown, color: 'var(--sky)' },
          ].map(f => (
            <div key={f.title} style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', borderLeft: `3px solid ${f.color}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: f.color }}>{f.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5, marginTop: 4 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cash vs ETH Position Summary */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#position-summary</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>Cash Position</div>
          {[
            { l: 'Cash & Equivalents', v: `$${liq.cashAndEquiv}M`, hl: true },
            { l: 'Total Debt', v: `$${liq.totalDebt}M` },
            { l: 'ATM Capacity', v: `$${(liq.atmCapacity / 1000).toFixed(1)}B` },
            { l: 'Quarterly OpEx', v: `$${liq.quarterlyOpEx}M` },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.hl ? 'var(--mint)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>ETH Treasury</div>
          {[
            { l: 'ETH Holdings', v: `${(currentETH / 1e6).toFixed(3)}M`, hl: true },
            { l: 'ETH Price', v: `$${ethPrice.toFixed(0)}` },
            { l: 'ETH Value', v: `$${ethValueB.toFixed(1)}B` },
            { l: 'Staked', v: `~${(STAKING_RATIO * 100).toFixed(0)}% (${(currentETH * STAKING_RATIO / 1e6).toFixed(2)}M)` },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.hl ? 'var(--violet)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Cash Runway & Liquidity" items={[
        { term: 'ETH Treasury Model', def: 'Unlike traditional companies, BMNR\'s primary asset is ETH. Liquidity depends on both fiat cash reserves and ETH market value. Staking yield provides ongoing income offset.' },
        { term: 'Staking as Revenue', def: 'Staking yield (~3.11% APY on 67% of holdings) generates ~$330M/yr. This income partially or fully offsets operational costs, extending effective runway.' },
        { term: 'Unrealized Gains Risk', def: 'ETH is marked-to-market (ASC 350). Price declines reduce book equity and GAAP net income, but don\'t affect cash flow or operational capacity.' },
        { term: 'ATM Accretion', def: 'If shares are sold above NAV, ATM raises are accretive to existing shareholders. BMNR has $24.5B shelf capacity for future ETH accumulation.' },
        { term: 'Crypto Winter Risk', def: 'If staking yield drops to zero (protocol change or regulatory ban), BMNR would rely on $595M cash reserves. At $18M/Q burn, that\'s ~33 quarters.' },
        { term: 'Mining Wind-Down', def: 'Legacy BTC mining operations wound down. Focus on ETH treasury reduces operational complexity and burn rate.' },
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#debt-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Leverage Analysis</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Debt<span style={{ color: 'var(--coral)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Model convertible debt financing and analyze LTV covenant risks. Track death spiral trigger prices.</p>
      </div>
      {/* Debt Parameters — Preset card layout */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#debt-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Debt Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      {useDebt && <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Principal ($M)" explanation="Total convertible debt raised. More capital = more ETH purchasing power but higher debt obligations." options={[25, 50, 100, 150, 200, 300]} value={debtAmount} onChange={setDebtAmount} format="$" currentValue={100} />
        <OverviewParameterCard title="Coupon (%)" explanation="Annual interest rate on convertible debt. Lower coupon = cheaper cost of capital." options={[6, 5, 4, 3, 2.5, 1.5]} value={debtRate} onChange={setDebtRate} format="%" currentValue={2.5} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <OverviewParameterCard title="Maturity (Yrs)" explanation="Years until debt maturity or conversion. Longer maturity = more flexibility and time for ETH appreciation." options={[2, 3, 4, 5, 7, 10]} value={debtMaturity} onChange={setDebtMaturity} currentValue={5} />
        <OverviewParameterCard title="Conv. Premium (%)" explanation="Premium to current stock price for conversion. Higher premium = less dilutive if conversion occurs." options={[10, 20, 30, 50, 75, 100]} value={conversionPremium} onChange={setConversionPremium} format="%" currentValue={50} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <OverviewParameterCard title="LTV Covenant (%)" explanation="Maximum loan-to-value ratio. Higher LTV = more borrowing capacity relative to ETH collateral." options={[20, 30, 40, 50, 60, 75]} value={debtCovenantLTV} onChange={setDebtCovenantLTV} format="%" currentValue={50} />
      </div>
      </>}
      {useDebt && (<>
        {/* Debt KPIs — Glass grid */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#debt-metrics</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          {[
            { label: 'Leverage', value: `${(calc.leverageRatio * 100).toFixed(1)}%`, sub: 'Debt/Mkt Cap', color: 'var(--sky)' },
            { label: 'Current LTV', value: `${(calc.ltv * 100).toFixed(1)}%`, sub: `Covenant: ${debtCovenantLTV}%`, color: calc.ltv * 100 < debtCovenantLTV * 0.8 ? 'var(--mint)' : calc.ltv * 100 < debtCovenantLTV ? 'var(--gold)' : 'var(--coral)' },
            { label: 'Conv. Price', value: `$${calc.conversionPrice.toFixed(2)}`, sub: `+${conversionPremium}%`, color: 'var(--violet)' },
            { label: 'Death Spiral', value: `$${calc.deathSpiralETHPrice.toFixed(0)}`, sub: 'ETH trigger', color: 'var(--coral)' },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* LTV Drawdown — Glass grid scenarios */}
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#ltv-drawdown</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>LTV Under Drawdown</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)' }} aria-label="LTV drawdown scenarios">
            {drawdown.map(d => (
              <div key={d.drawdown} style={{ background: d.breach ? 'color-mix(in srgb, var(--coral) 5%, var(--surface))' : 'var(--surface)', padding: '24px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{d.drawdown === 0 ? 'Current' : `${d.drawdown}%`}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>${d.ethPrice.toFixed(0)}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700, color: d.breach ? 'var(--coral)' : 'var(--mint)', margin: '6px 0' }}>{d.ltv.toFixed(0)}%</div>
                {d.breach && <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--coral)', textTransform: 'uppercase' }}>Breach</div>}
              </div>
            ))}
          </div>
        </div>
      </>)}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
const CapitalTab = ({ currentShares, currentStockPrice, currentETH, ethPrice }) => {
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Financial Position<UpdateIndicators sources="SEC" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Capital Structure<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>ETH treasury capital strategy, share structure, ATM programs, warrant detail, and dilution analysis. Single-class common stock with rapid execution capability.</p>
      </div>

      {/* Section Divider: Key Metrics */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Metrics</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Summary Cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-metrics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Capital Summary</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { label: 'Shares Outstanding', value: `${currentShares}M`, color: 'var(--violet)' },
            { label: 'Fully Diluted', value: `${(totalFD / 1e6).toFixed(1)}M`, color: 'var(--sky)' },
            { label: 'Basic Mkt Cap', value: `$${((currentShares * 1e6 * currentStockPrice) / 1e9).toFixed(2)}B`, color: 'var(--mint)' },
            { label: 'FD Mkt Cap', value: `$${((totalFD * currentStockPrice) / 1e9).toFixed(2)}B`, color: 'var(--gold)' },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
          <div style={{ background: 'var(--surface)', padding: '16px 24px' }}>
            {[
              { label: 'Stock Price', value: `$${currentStockPrice.toFixed(2)}`, color: 'var(--text)' },
              { label: 'Dilution', value: `+${dilutionPct.toFixed(1)}%`, color: 'var(--coral)' },
              { label: 'Common Stock', value: `${currentShares}M`, color: 'var(--text)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--surface)', padding: '16px 24px' }}>
            {[
              { label: 'Convertible Notes', value: 'Various', color: 'var(--text)' },
              { label: 'ATM Program', value: 'Active', color: 'var(--mint)' },
              { label: 'Source', value: 'SEC / Market', color: 'var(--text3)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '16px 24px', background: 'linear-gradient(135deg, color-mix(in srgb, var(--mint) 8%, var(--surface)), color-mix(in srgb, var(--violet) 8%, var(--surface)))', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Capital Structure</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginTop: 4 }}>
            ETH treasury company with {currentShares}M shares outstanding. Active ATM program and convertible notes add dilution risk.
          </div>
        </div>
      </div>

      {/* Section Divider: Navigation */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Detail Views</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Navigation Cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-navigation</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {[
          { id: 'structure', value: `${shareClasses.length}`, label: 'Share Classes', sub: 'Common + converted preferred' },
          { id: 'shareholders', value: `${majorShareholders.length}`, label: 'Major Holders', sub: 'Bill Miller + institutions' },
          { id: 'offerings', value: `${equityOfferings.length}`, label: 'ATM Programs', sub: '$24.5B shelf active' },
          { id: 'plans', value: `${warrants.length}`, label: 'Warrant Types', sub: 'Pre-funded + advisor' },
          { id: 'dilution', value: `${dilutionPct.toFixed(0)}%`, label: 'Total Dilution', sub: `${(totalFD / 1e6).toFixed(1)}M FD shares` },
          { id: 'liquidity', value: `$${BMNR_LIQUIDITY.cashAndEquiv}M`, label: 'Liquidity', sub: 'Cash + ETH treasury' },
        ].map(nav => (
          <div
            key={nav.id}
            onClick={() => setCapitalView(nav.id)}
            style={{
              background: 'var(--surface)',
              padding: '24px 24px',
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#share-classes</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Share Class Structure</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 1fr 100px', borderBottom: '1px solid var(--border)' }}>
              {['Class', 'Authorized', 'Outstanding', 'Voting', 'Status'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: [1, 2].includes(idx) ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {shareClasses.map((sc, i) => (
              <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 1fr 100px', borderBottom: i < shareClasses.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
                <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{sc.class}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{(sc.authorized / 1e6).toFixed(0)}M</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--violet)' }}>{(sc.outstanding / 1e6).toFixed(1)}M</span>
                <span style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>{sc.voting}</span>
                <span style={{ padding: '12px 16px', fontSize: 13 }}><span style={{ color: statusColor(sc.status) }}>{sc.status}</span></span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 12 }}>
            Par value: $0.0001. Preferred shares converted to common. NYSE American: BMNR.
          </div>
        </div>
      </div>
      </>
      )}

      {/* Major Shareholders View */}
      {capitalView === 'shareholders' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#major-shareholders</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Major Shareholders</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 1fr 1fr', borderBottom: '1px solid var(--border)' }}>
              {['Shareholder', 'Shares (M)', '%', 'Type', 'Source'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: [1, 2].includes(idx) ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {majorShareholders.map((sh, i) => (
              <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 1fr 1fr', borderBottom: i < majorShareholders.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
                <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500 }}>{sh.name}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{sh.shares ? (sh.shares / 1e6).toFixed(2) : '—'}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--violet)' }}>{sh.percent ? `${sh.percent.toFixed(2)}%` : '—'}</span>
                <span style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>{sh.type}</span>
                <span style={{ padding: '12px 16px', fontSize: 13 }}><span style={{ color: 'var(--gold)' }}>{sh.source}</span></span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 12 }}>
            Update from 13F (institutional) and DEF 14A (insiders) when available.
          </div>
        </div>
      </div>
      </>
      )}

      {/* Offerings View */}
      {capitalView === 'offerings' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#equity-offerings</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Equity Offerings</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 100px', borderBottom: '1px solid var(--border)' }}>
              {['Date', 'Type', 'Amount', 'Status'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: idx === 2 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {equityOfferings.map((off, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 100px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>{off.date}</span>
                <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{off.type}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--mint)' }}>${off.amount}B</span>
                <span style={{ padding: '12px 16px', fontSize: 13 }}><span style={{ color: statusColor(off.status) }}>{off.status}</span></span>
              </div>
            ))}
            {/* Total Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 100px', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <span style={{ padding: '12px 16px', fontSize: 13, gridColumn: 'span 2' }}>Total Shelf Capacity</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--mint)' }}>$31.4B</span>
              <span style={{ padding: '12px 16px' }}></span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Warrants Outstanding</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 1fr', borderBottom: '1px solid var(--border)' }}>
              {['Type', 'Shares', 'Strike', 'Source'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: [1, 2].includes(idx) ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {warrants.map((w, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 1fr', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500 }}>{w.type}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{(w.shares / 1e6).toFixed(2)}M</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--violet)' }}>${w.strike < 1 ? w.strike.toFixed(4) : w.strike.toFixed(2)}</span>
                <span style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>{w.source}</span>
              </div>
            ))}
            {/* Total Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 1fr', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <span style={{ padding: '12px 16px', fontSize: 13 }}>Total</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{((warrants[0].shares + warrants[1].shares) / 1e6).toFixed(2)}M</span>
              <span style={{ padding: '12px 16px', gridColumn: 'span 2' }}></span>
            </div>
          </div>
        </div>
      </div>
      </>
      )}

      {/* Plans View */}
      {capitalView === 'plans' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#equity-plans</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Equity Incentive Plans</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr', borderBottom: '1px solid var(--border)' }}>
              {['Plan', 'Reserved', 'Status'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: idx === 1 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ padding: '12px 16px', fontSize: 13 }}>2024 Equity Incentive Plan</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--gold)' }}>TBD</span>
              <span style={{ padding: '12px 16px', fontSize: 13 }}><span style={{ color: 'var(--gold)' }}>Pending 10-K</span></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ padding: '12px 16px', fontSize: 13 }}>Employee Stock Purchase Plan</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--gold)' }}>TBD</span>
              <span style={{ padding: '12px 16px', fontSize: 13 }}><span style={{ color: 'var(--gold)' }}>Pending 10-K</span></span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 12 }}>
            Data pending from 10-K or DEF 14A proxy filing.
          </div>
        </div>
      </div>
      </>
      )}

      {/* Dilution View */}
      {capitalView === 'dilution' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-analysis</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Fully Diluted Share Count</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px', borderBottom: '1px solid var(--border)' }}>
              {['Component', 'Shares (M)', '% of Total'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: [1, 2].includes(idx) ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {[
              { label: 'Common Outstanding', shares: (fdShares.common / 1e6).toFixed(1), pct: ((fdShares.common / totalFD) * 100).toFixed(1) + '%' },
              { label: 'Pre-Funded Warrants', shares: (fdShares.prefunded / 1e6).toFixed(1), pct: ((fdShares.prefunded / totalFD) * 100).toFixed(1) + '%' },
              { label: 'Advisor Warrants', shares: (fdShares.advisor / 1e6).toFixed(1), pct: ((fdShares.advisor / totalFD) * 100).toFixed(1) + '%' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>{row.label}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{row.shares}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{row.pct}</span>
              </div>
            ))}
            {[
              { label: 'Stock Options', shares: <span style={{ color: 'var(--gold)' }}>TBD</span>, pct: '—' },
              { label: 'RSUs', shares: <span style={{ color: 'var(--gold)' }}>TBD</span>, pct: '—' },
            ].map((row, i) => (
              <div key={`tbd-${i}`} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>{row.label}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{row.shares}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{row.pct}</span>
              </div>
            ))}
            {/* Total Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <span style={{ padding: '12px 16px', fontSize: 13 }}>Fully Diluted Total</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--violet)' }}>{(totalFD / 1e6).toFixed(1)}</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>100%</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 12 }}>
            Note: Jul 29, 2025 PR reported 121.7M fully diluted. Current calc uses known warrants only.
            Dilution impact: +{dilutionPct.toFixed(1)}% if all securities exercised.
          </div>
        </div>
      </div>
      </>
      )}

      {/* Liquidity / Cash Runway View */}
      {capitalView === 'liquidity' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#liquidity-overview</div>
      {(() => {
        const liq = BMNR_LIQUIDITY;
        const scenarios = BMNR_RUNWAY_SCENARIOS;
        const factors = ETH_LIQUIDITY_FACTORS;
        const ethValueB = (currentETH * ethPrice) / 1e9;
        const totalLiquidityB = ethValueB + liq.cashAndEquiv / 1000;
        const stakingYieldQ = (currentETH * STAKING_RATIO * ethPrice * STAKING_APY) / 4 / 1e6;
        const netBurnQ = liq.quarterlyOpEx - stakingYieldQ;
        const stressScenarios = [
          { label: 'Current', ethPx: ethPrice, drop: 0 },
          { label: '-25%', ethPx: ethPrice * 0.75, drop: -25 },
          { label: '-50%', ethPx: ethPrice * 0.50, drop: -50 },
          { label: '-75%', ethPx: ethPrice * 0.25, drop: -75 },
        ].map(s => {
          const yieldQ = (currentETH * STAKING_RATIO * s.ethPx * STAKING_APY) / 4 / 1e6;
          const net = liq.quarterlyOpEx - yieldQ;
          return { ...s, yieldQ, netBurn: net, runway: net <= 0 ? 999 : liq.cashAndEquiv / net, totalLiq: (currentETH * s.ethPx) / 1e9 + liq.cashAndEquiv / 1000 };
        });
        return (
          <>
          {/* Treasury Dashboard KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            {[
              { label: 'Cash', value: `$${liq.cashAndEquiv}M`, sub: 'Fiat reserves', color: 'var(--mint)' },
              { label: 'ETH Value', value: `$${ethValueB.toFixed(1)}B`, sub: `${(currentETH / 1e6).toFixed(3)}M ETH`, color: 'var(--violet)' },
              { label: 'Total Liquidity', value: `$${totalLiquidityB.toFixed(1)}B`, sub: 'Cash + ETH', color: 'var(--sky)' },
              { label: 'Staking Yield/Q', value: `$${stakingYieldQ.toFixed(0)}M`, sub: '~3.11% APY', color: 'var(--gold)' },
              { label: 'Net Burn/Q', value: netBurnQ < 0 ? `+$${Math.abs(netBurnQ).toFixed(0)}M` : `$${netBurnQ.toFixed(0)}M`, sub: netBurnQ < 0 ? 'Cash positive' : 'Net outflow', color: netBurnQ < 0 ? 'var(--mint)' : 'var(--coral)' },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* ETH Price Stress Scenarios */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#eth-stress-scenarios</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Runway Under ETH Price Stress</span>
              <UpdateIndicators sources="SEC" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
              {stressScenarios.map(s => (
                <div key={s.label} style={{ background: s.runway >= 999 ? 'color-mix(in srgb, var(--mint) 3%, var(--surface))' : s.runway > 12 ? 'var(--surface)' : 'color-mix(in srgb, var(--coral) 3%, var(--surface))', padding: '24px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>ETH ${s.ethPx.toFixed(0)}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700, color: s.runway >= 999 ? 'var(--mint)' : s.runway > 12 ? 'var(--gold)' : 'var(--coral)', margin: '8px 0 4px' }}>
                    {s.runway >= 999 ? 'Infinite' : `${s.runway.toFixed(0)}Q`}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>Yield: ${s.yieldQ.toFixed(0)}M/Q</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>Liq: ${s.totalLiq.toFixed(1)}B</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
              Cash runway remains positive even at -75% ETH because staking yield ($20M+/Q) approximately covers operational expenses ($18M/Q). Only total yield collapse threatens runway.
            </div>
          </div>

          {/* Runway Scenarios Table */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#runway-scenarios</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Forward-Looking Runway Scenarios</span>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
                {['Scenario', 'Cash', 'Burn/Q', 'Yield/Q', 'Runway'].map(h => (
                  <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Scenario' ? 'left' : 'right' }}>{h}</span>
                ))}
              </div>
              {scenarios.map((s, i) => (
                <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', padding: '12px 24px', borderBottom: i < scenarios.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <span style={{ fontSize: 12, color: 'var(--text)' }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${s.startingCash}M</span>
                  <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--coral)', textAlign: 'right' }}>${s.quarterlyBurn}M</span>
                  <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--mint)', textAlign: 'right' }}>${s.quarterlyRevenue}M</span>
                  <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: s.runwayQuarters >= 999 ? 'var(--mint)' : 'var(--gold)', textAlign: 'right' }}>{s.runwayQuarters >= 999 ? 'Infinite' : `${s.runwayQuarters.toFixed(0)}Q`}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
              Yield/Q includes staking income as partial burn offset. Only in Crypto Winter (no yield) scenario does cash runway become finite.
            </div>
          </div>

          {/* Balance Sheet Liquidity Factors */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#liquidity-factors</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH Treasury Liquidity Factors</span>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Unrealized Gains/Losses', desc: factors.unrealizedGainRisk, color: 'var(--gold)' },
                { title: 'Staking as Revenue Offset', desc: factors.stakingAsRevenueOffset, color: 'var(--mint)' },
                { title: 'Capital Raises Purpose', desc: factors.raisesPurpose, color: 'var(--violet)' },
                { title: 'Mining Wind-Down', desc: factors.miningWindDown, color: 'var(--sky)' },
              ].map(f => (
                <div key={f.title} style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', borderLeft: `3px solid ${f.color}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: f.color }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5, marginTop: 4 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cash vs ETH Position Summary */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#position-summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>Cash Position</div>
              {[
                { l: 'Cash & Equivalents', v: `$${liq.cashAndEquiv}M`, hl: true },
                { l: 'Total Debt', v: `$${liq.totalDebt}M` },
                { l: 'ATM Capacity', v: `$${(liq.atmCapacity / 1000).toFixed(1)}B` },
                { l: 'Quarterly OpEx', v: `$${liq.quarterlyOpEx}M` },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.hl ? 'var(--mint)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>ETH Treasury</div>
              {[
                { l: 'ETH Holdings', v: `${(currentETH / 1e6).toFixed(3)}M`, hl: true },
                { l: 'ETH Price', v: `$${ethPrice.toFixed(0)}` },
                { l: 'ETH Value', v: `$${ethValueB.toFixed(1)}B` },
                { l: 'Staked', v: `~${(STAKING_RATIO * 100).toFixed(0)}% (${(currentETH * STAKING_RATIO / 1e6).toFixed(2)}M)` },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.hl ? 'var(--violet)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          </>
        );
      })()}
      </>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Capital Structure" items={[
        { term: 'ATM (At-The-Market) Programs', def: 'Shelf offerings allowing companies to sell shares directly into the open market. BMNR uses ATMs to fund ETH purchases — share dilution funds treasury growth.' },
        { term: 'Fully Diluted Shares', def: 'Total shares if all warrants and options are exercised. Pre-funded warrants ($0.0001 strike) are essentially committed — include in FD count.' },
        { term: 'Pre-Funded Warrants', def: 'Warrants with nominal strike price ($0.0001). Economically equivalent to common shares. Used to avoid exceeding authorized share limits while raising capital.' },
        { term: 'NAV Accretion vs Dilution', def: 'If shares are sold at a premium to NAV, the offering is NAV-accretive for existing shareholders. BMNR targets accretive offerings when stock trades above NAV.' },
      ]} />
    </div>
  );
};

// COMPS TAB
const CompsTab = ({ comparables, ethPrice }) => {
  const btcPrice = 100000;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [competitorFilter, setCompetitorFilter] = useState<BMNRCompetitorId | 'all'>('all');
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set());
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('All');

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
      description: 'Ethereum treasury company with DeFi yield and RWA tokenization strategy; launched first tokenized aviation assets on Ethereum L2',
      cryptoType: 'ETH',
      currentStatus: 'ETH accumulation + DeFi restaking + RWA tokenization (Eurus Aero Token I: $12.2M jet engines on Ethereum L2)',
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
  const COMPETITOR_NEWS = BMNR_COMPETITOR_NEWS;

  // Filter news by competitor, sort by date (newest first)
  const filteredNews = React.useMemo(() =>
    (competitorFilter === 'all'
      ? [...COMPETITOR_NEWS]
      : COMPETITOR_NEWS.filter(n => n.competitor === competitorFilter)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [competitorFilter]
  );

  // Compute news categories and category-filtered news
  const newsCategories = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.category)))];
  const filteredCompNews = filteredNews.filter(n => newsCategoryFilter === 'All' || n.category === newsCategoryFilter);

  // Get competitor display name
  const getCompetitorName = (id: BMNRCompetitorId): string => {
    if (id === 'other') return 'Miscellaneous';
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };

  const getCardStyle = (isSelf: boolean, threat?: string): React.CSSProperties => ({
    background: isSelf ? 'linear-gradient(135deg, var(--accent-dim) 0%, var(--surface) 100%)' : 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: 24,
    borderLeft: isSelf ? '4px solid var(--accent)' : threat === 'High' ? '4px solid var(--coral)' : threat === 'Medium' ? '4px solid var(--gold)' : threat === 'Low' ? '4px solid var(--mint)' : '4px solid var(--surface3)'
  });

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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#comparables-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Unified Peer Analysis<UpdateIndicators sources={['PR', 'WS']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Comparables & Competitor Intelligence<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Each card combines quantitative metrics (holdings, NAV, premium) with qualitative intelligence (threat level, competitive focus). BMNR's ETH staking yield vs BTC treasuries' 0% is the key structural differentiator.</p>
      </div>

      {/* Peer Group Selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map(cat => {
          const isActive = selectedCategory === cat.key;
          return (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{ padding: '8px 14px', fontSize: 13, fontWeight: isActive ? 600 : 500, borderRadius: 8, background: isActive ? 'var(--accent-dim)' : 'var(--surface2)', border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`, color: isActive ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}
          >
            {cat.label}
          </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filteredComps.map(c => {
          const qual = keyCompLookup[c.name];
          const isSelf = c.name === 'BMNR';
          return (
            <div key={c.name} style={getCardStyle(isSelf, qual?.threat)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{c.fullName || c.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>{c.name} · {c.crypto}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                  {qual && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: qual.threat === 'High' ? 'rgba(255,123,114,0.15)' : qual.threat === 'Medium' ? 'rgba(210,153,34,0.15)' : 'rgba(126,231,135,0.15)', color: qual.threat === 'High' ? 'var(--coral)' : qual.threat === 'Medium' ? 'var(--gold)' : 'var(--mint)' }}>{qual.threat}</span>}
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: 'var(--surface3)', color: 'var(--text3)' }}>{qual?.type || c.category}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 8, padding: 12, background: 'var(--surface2)', borderRadius: 10, marginBottom: 12 }}>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{typeof c.holdings === 'number' ? c.holdings.toLocaleString() : c.holdings}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Holdings</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{c.navPerShare > 0 ? `$${c.navPerShare.toFixed(2)}` : '—'}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>NAV/Share</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>${c.price}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Price</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: c.premium >= 0 ? 'var(--mint)' : 'var(--coral)', lineHeight: 1.2 }}>{c.navPerShare > 0 ? `${c.premium >= 0 ? '+' : ''}${c.premium.toFixed(0)}%` : '—'}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Premium</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: c.yield > 0 ? 'var(--mint)' : 'var(--text)', lineHeight: 1.2 }}>{c.yield > 0 ? `${c.yield}%` : '—'}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Yield</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>${(c.marketCap / 1e9).toFixed(1)}B</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Mkt Cap</div></div>
              </div>
              {qual && (
                <>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Status:</strong> {qual.status}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Focus:</strong> {qual.focus}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>{qual.notes}</div>
                </>
              )}
            </div>
          );
        })}
        {keyCompetitors.filter(k => {
          const ticker = k.name.match(/\(([A-Z]+)\)/)?.[1];
          return ticker && !compsData.find(c => c.name === ticker);
        }).filter(() => selectedCategory === 'all').map((k, i) => (
          <div key={`qual-${i}`} style={getCardStyle(false, k.threat)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{k.name}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>{k.name.match(/\(([A-Z]+)\)/)?.[1] || ''}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: k.threat === 'High' ? 'rgba(255,123,114,0.15)' : k.threat === 'Medium' ? 'rgba(210,153,34,0.15)' : 'rgba(126,231,135,0.15)', color: k.threat === 'High' ? 'var(--coral)' : k.threat === 'Medium' ? 'var(--gold)' : 'var(--mint)' }}>{k.threat}</span>
                <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: 'var(--surface3)', color: 'var(--text3)' }}>{k.type}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Status:</strong> {k.status}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Focus:</strong> {k.focus}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>{k.notes}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#yield-advantage</div>
      <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>Yield Advantage<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>ETH staking generates yield vs BTC's 0% — structural advantage</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--mint)' }}>+{comparables[0].yield}%</div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>Annual staking yield vs BTC (0%)</div>
          </div>
        </div>
      </div>

      {/* Advanced Valuation Matrices */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#valuation-framework</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Framework</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 12, fontWeight: 300 }}>NAV-based valuation for crypto treasury companies. Premium/discount analysis vs peers.</p>

      {/* Valuation Methodology Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#implied-valuation-matrix</div>
      <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>Implied Valuation Matrix<UpdateIndicators sources={['WS']} /></div>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>BMNR value under different NAV multiples (current: ${(compsData[0]?.marketCap / 1e9).toFixed(2)}B)</p>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', background: 'var(--surface2)', borderBottom: '1px solid var(--border)', borderRadius: '10px 10px 0 0' }}>
            {['Method', 'Peer Basis', 'Multiple', 'Implied Value', 'vs Current'].map((label, idx) => (
              <div key={label} style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, textAlign: idx < 2 ? 'left' : 'right' }}>{label}</div>
            ))}
          </div>
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
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 500 }}>{v.method}</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{v.basis}</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{v.multiple}</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${(v.implied / 1e9).toFixed(2)}B</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: v.vs >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                  {v.vs >= 0 ? '+' : ''}{v.vs.toFixed(0)}%
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* SOTP Valuation */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#sotp</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>Sum-of-the-Parts (SOTP)<UpdateIndicators sources={['WS']} /></div>
            <p style={{ color: 'var(--text3)', fontSize: 13, margin: 0 }}>Value each component separately</p>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['Component', 'Metric', 'Multiple', 'Value'].map((label, idx) => (
                <div key={label} style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, textAlign: idx === 0 ? 'left' : 'right' }}>{label}</div>
              ))}
            </div>
            {(() => {
              const ethHoldings = typeof comparables[0]?.holdings === 'number' ? comparables[0].holdings : 0;
              const ethValue = ethHoldings * ethPrice;
              return [
                { segment: 'ETH Holdings', basis: 'Spot value', metric: `${(ethHoldings / 1e6).toFixed(2)}M ETH`, multiple: '1.0x', value: ethValue },
                { segment: 'Staking Yield', basis: '5yr NPV @ 10%', metric: `${comparables[0]?.yield || 0}% APY`, multiple: 'NPV', value: ethValue * (comparables[0]?.yield || 0) / 100 * 3.79 },
                { segment: 'Operational Premium', basis: 'Management + infrastructure', metric: 'Strategic', multiple: '—', value: ethValue * 0.05 },
                { segment: 'Growth Optionality', basis: 'Acquisition capacity', metric: 'Option value', multiple: '—', value: ethValue * 0.03 },
              ].map((s, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
                    <div style={{ fontWeight: 500 }}>{s.segment}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.basis}</div>
                  </div>
                  <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{s.metric}</div>
                  <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{s.multiple}</div>
                  <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${(s.value / 1e9).toFixed(2)}B</div>
                </div>
              ));
            })()}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, gridColumn: '1 / 4' }}>SOTP Total</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${((() => {
                const ethHoldings = typeof comparables[0]?.holdings === 'number' ? comparables[0].holdings : 0;
                const ethValue = ethHoldings * ethPrice;
                const yieldNPV = ethValue * (comparables[0]?.yield || 0) / 100 * 3.79;
                return (ethValue + yieldNPV + ethValue * 0.08) / 1e9;
              })()).toFixed(2)}B</div>
            </div>
          </div>
          </div>
        </div>

        {/* NAV Premium Sensitivity */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#nav-premium-sensitivity</div>
          <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>NAV Premium Sensitivity<UpdateIndicators sources={['WS']} /></div>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Stock price at different ETH prices × NAV multiples</p>
          <div style={{ overflowX: 'auto' }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5, 1fr)', background: 'var(--surface2)', borderBottom: '1px solid var(--border)', borderRadius: '10px 10px 0 0' }}>
                <div style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600 }}>ETH / NAV</div>
                {[0.75, 1.0, 1.25, 1.5, 2.0].map(m => (
                  <div key={m} style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, textAlign: 'right' }}>{m}x</div>
                ))}
              </div>
              {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(ethMult => {
                const ethHoldings = typeof comparables[0]?.holdings === 'number' ? comparables[0].holdings : 0;
                const shares = comparables[0]?.shares || 1;
                const baseNAV = (ethHoldings * ethPrice) / shares;
                const currentPrice = comparables[0]?.price || 0;
                return (
                  <div key={ethMult} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5, 1fr)', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 600 }}>${(ethPrice * ethMult).toLocaleString()}</div>
                    {[0.75, 1.0, 1.25, 1.5, 2.0].map(navMult => {
                      const price = baseNAV * ethMult * navMult;
                      const isNear = ethMult === 1.0 && navMult === 1.0;
                      return (
                        <div key={navMult} style={{ padding: '16px 16px', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontSize: 14, ...(isNear ? {
                          background: 'var(--accent-dim)',
                          fontWeight: 600,
                          color: 'var(--accent)'
                        } : { color: price >= currentPrice ? 'var(--mint)' : 'var(--coral)' }) }}>
                          ${price.toFixed(2)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Competitor News Intelligence Section */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-news</div>
      <div style={{ padding: '32px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Competitive Intelligence<UpdateIndicators sources="PR" /></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Competitor News<span style={{ color: 'var(--mint)' }}>.</span></h3>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text3)' }}>{filteredCompNews.length} events</span>
        </div>
      </div>

      {/* Competitor Filter */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-filter</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px', marginTop: 8 }}>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}>Track what peer companies are doing — <strong>treasury purchases</strong>, financing activities, strategic moves by crypto treasury competitors.</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '0 0 16px' }}>Company-level news affecting BMNR's competitive positioning</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>Filter by Competitor</span>
          {competitorFilter !== 'all' && (
            <button
              onClick={() => setCompetitorFilter('all')}
              style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, background: 'color-mix(in srgb, var(--coral) 15%, transparent)', color: 'var(--coral)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              aria-label="Clear competitor filter"
            >
              Clear
            </button>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(() => { const isSelected = competitorFilter === 'all'; return (
            <button
              onClick={() => setCompetitorFilter('all')}
              style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isSelected ? 'var(--violet)' : 'var(--border)', background: isSelected ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isSelected ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
              aria-label="Show all competitors"
            >
              All ({COMPETITOR_NEWS.length})
            </button>
          ); })()}
          {COMPETITOR_PROFILES.map(comp => {
            const count = COMPETITOR_NEWS.filter(n => n.competitor === comp.id).length;
            if (count === 0) return null;
            const isSelected = competitorFilter === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setCompetitorFilter(comp.id)}
                style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isSelected ? 'var(--violet)' : 'var(--border)', background: isSelected ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isSelected ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
                aria-label={`Filter by ${comp.name}`}
              >
                {comp.name.split(' ')[0]} ({count})
              </button>
            );
          })}
          {COMPETITOR_NEWS.filter(n => n.competitor === 'other').length > 0 && (() => { const isSelected = competitorFilter === 'other'; return (
            <button
              onClick={() => setCompetitorFilter('other')}
              style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isSelected ? 'var(--violet)' : 'var(--border)', background: isSelected ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isSelected ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
              aria-label="Filter by Miscellaneous"
            >
              Miscellaneous ({COMPETITOR_NEWS.filter(n => n.competitor === 'other').length})
            </button>
          ); })()}
        </div>
        {competitorFilter !== 'all' && (
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, fontFamily: 'Space Mono, monospace' }}>
            {getCompetitorName(competitorFilter)} &rarr; {filteredNews.length} results
          </div>
        )}
      </div>

      {/* Category pills row with Expand All button */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#category-filter</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {newsCategories.map(cat => {
            const isActive = newsCategoryFilter === cat;
            return (
              <button key={cat} onClick={() => setNewsCategoryFilter(cat)} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--sky)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--sky) 15%, transparent)' : 'transparent', color: isActive ? 'var(--sky)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }} aria-label={`Filter by category: ${cat}`}>
                {cat === 'All' ? `All (${filteredNews.length})` : `${cat} (${filteredNews.filter(n => n.category === cat).length})`}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (expandedNews.size === filteredCompNews.length) {
              setExpandedNews(new Set());
            } else {
              setExpandedNews(new Set(filteredCompNews.map((_, i) => i)));
            }
          }}
          style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
          aria-label={expandedNews.size === filteredCompNews.length ? 'Collapse all news events' : 'Expand all news events'}
        >
          {expandedNews.size === filteredCompNews.length ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>

      {/* News Timeline - Flat list */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-events</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {filteredCompNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <p style={{ color: 'var(--text3)' }}>No competitor news matching current filters.</p>
          </div>
        ) : (
          filteredCompNews.map((news, i) => {
            const isExpanded = expandedNews.has(i);
            const accentColor = news.implication === 'positive' ? 'var(--mint)' : news.implication === 'negative' ? 'var(--coral)' : 'var(--sky)';
            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`${news.headline} — ${news.implication} — click to ${isExpanded ? 'collapse' : 'expand'}`}
                style={{ padding: '16px 24px', cursor: 'pointer', borderLeft: `3px solid ${accentColor}`, borderBottom: i < filteredCompNews.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                onClick={() => {
                  const next = new Set(expandedNews);
                  if (isExpanded) next.delete(i);
                  else next.add(i);
                  setExpandedNews(next);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const next = new Set(expandedNews);
                    if (isExpanded) next.delete(i);
                    else next.add(i);
                    setExpandedNews(next);
                  }
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>{news.date}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--violet) 12%, transparent)', color: 'var(--violet)' }}>{news.category}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--sky) 12%, transparent)', color: 'var(--sky)' }}>{getCompetitorName(news.competitor)}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13, lineHeight: 1.4 }}>{news.headline}</div>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: accentColor, marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {news.implication === 'positive' ? '+' : news.implication === 'negative' ? '-' : '~'} {news.implication === 'positive' ? 'Good for BMNR' : news.implication === 'negative' ? 'Threat' : 'Neutral'}
                  </span>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 16, marginTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                      {news.details.map((d, di) => (
                        <div key={di} style={{ display: 'flex', gap: 8 }}><span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>{d}</div>
                      ))}
                    </div>
                    {news.bmnrComparison && (
                      <div style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 5%, var(--surface))', borderRadius: 12, borderLeft: '3px solid var(--mint)', marginTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 4 }}>BMNR Comparison</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.bmnrComparison}</div>
                      </div>
                    )}
                    <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Space Mono, monospace', marginTop: 8 }}>Source: {news.sourceUrl ? <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{news.source} &#8599;</a> : news.source}</div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Competitor Profiles */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-profiles</div>
      <div style={{ padding: '32px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Peer Analysis</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Competitor Profiles<span style={{ color: 'var(--mint)' }}>.</span></h3>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text3)' }}>{COMPETITOR_PROFILES.length} companies</span>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {COMPETITOR_PROFILES.map(comp => (
            <div key={comp.id} style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{comp.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{comp.description}</div>
                </div>
                <span style={{
                  padding: '4px 12px',
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

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#sensitivity-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Scenario Engine</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Sensitivity<span style={{ color: 'var(--gold)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Two-variable sensitivity matrix showing implied stock price across ETH price and NAV multiple combinations. Tornado chart ranks parameter impact.</p>
      </div>
      {/* Price Matrix — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#price-matrix</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Price Matrix</span>
        </div>
        <div style={{ overflowX: 'auto', padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(6, 1fr)', borderBottom: '1px solid var(--border)', minWidth: 700 }}>
            <div style={{ padding: '12px 24px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH Price</div>
            {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(nm => (
              <div key={nm} style={{ padding: '12px 8px', textAlign: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: nm === 1.0 ? 'var(--cyan)' : 'var(--text3)' }}>{nm}x NAV</div>
            ))}
          </div>
          {matrix.map((row, ri) => (
            <div key={row.ethMult} style={{ display: 'grid', gridTemplateColumns: '180px repeat(6, 1fr)', borderBottom: ri < matrix.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', background: row.ethMult === 1.0 ? 'color-mix(in srgb, var(--cyan) 5%, transparent)' : 'transparent', transition: 'background 0.15s', minWidth: 700 }}
              onMouseEnter={e => { if (row.ethMult !== 1.0) e.currentTarget.style.background = 'var(--surface2)'; }}
              onMouseLeave={e => { if (row.ethMult !== 1.0) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ padding: '12px 24px', fontSize: 12, fontWeight: 500, color: row.ethMult === 1.0 ? 'var(--cyan)' : 'var(--text)' }}>${row.ethPrice.toLocaleString()} ({row.ethMult}x)</div>
              {row.scenarios.map(s => (
                <div key={s.navMult} style={{ padding: '12px 8px', textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: row.ethMult === 1.0 && s.navMult === 1.0 ? 700 : 400, color: s.price >= calc.currentNAV ? 'var(--mint)' : 'var(--coral)', background: row.ethMult === 1.0 && s.navMult === 1.0 ? 'color-mix(in srgb, var(--cyan) 10%, transparent)' : 'transparent' }}>
                  ${s.price.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tornado Chart — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#tornado-chart</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Tornado Chart (±20%)</span>
        </div>
        <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }} aria-label="Tornado sensitivity chart">
          {[{ param: 'ETH Price', down: -20, up: 20 }, { param: 'NAV Multiple', down: -20, up: 20 }, { param: 'ETH Holdings', down: -20, up: 20 }, { param: 'Shares Out', down: 25, up: -17 }].map(t => (
            <div key={t.param} style={{ display: 'flex', alignItems: 'center', gap: 16 }} aria-label={`${t.param}: ${t.down}% downside, ${t.up > 0 ? '+' : ''}${t.up}% upside`}>
              <div style={{ width: 100, fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>{t.param}</div>
              <div style={{ flex: 1, height: 28, background: 'color-mix(in srgb, var(--border) 40%, transparent)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--border)', zIndex: 1 }} />
                <div style={{ position: 'absolute', height: '100%', background: 'color-mix(in srgb, var(--coral) 25%, transparent)', right: '50%', width: `${Math.abs(Math.min(t.down, 0)) * 2}%`, borderRadius: '4px 0 0 4px' }} />
                <div style={{ position: 'absolute', height: '100%', background: 'color-mix(in srgb, var(--mint) 25%, transparent)', left: '50%', width: `${Math.max(t.up, 0) * 2}%`, borderRadius: '0 4px 4px 0' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', zIndex: 2 }}>
                  <span style={{ color: 'var(--coral)' }}>{t.down}%</span>
                  <span style={{ color: 'var(--mint)' }}>{t.up > 0 ? '+' : ''}{t.up}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      if (parseInt(year) >= startYear) (prices as number[]).forEach((price, idx) => {
        if (idx < 12) { cumYield = includeYield ? (1 + cumYield) * (1 + baseStakingAPY / 12 / 100) - 1 : 0; const nav = (currentETH * price * (1 + cumYield)) / (currentShares * 1e6); const stockPrice = nav * assumedMult; if (startNav === 0) startNav = nav; result.push({ date: `${months[idx]} ${year.slice(2)}`, ethPrice: price, nav, stockPrice }); }
      });
    });
    return { data: result, startNav };
  }, [currentETH, currentShares, historicalETH, startYear, includeYield, baseStakingAPY, assumedMult]);
  const stats = useMemo(() => { if (data.data.length === 0) return null; const navs = data.data.map(d => d.nav); const prices = data.data.map(d => d.stockPrice); return { currentNav: navs[navs.length - 1], currentPrice: prices[prices.length - 1], totalReturn: ((navs[navs.length - 1] / data.startNav) - 1) * 100, maxNav: Math.max(...navs), minNav: Math.min(...navs), maxDD: ((Math.min(...navs) - Math.max(...navs)) / Math.max(...navs)) * 100, maxPrice: Math.max(...prices), minPrice: Math.min(...prices) }; }, [data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#backtest-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Historical Simulation</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Backtest<span style={{ color: 'var(--sky)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>What would NAV have been at historical ETH prices? Toggle staking yield to see compounding effect. Illustrative only.</p>
      </div>
      {/* Settings — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#backtest-settings</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ background: 'var(--surface)', padding: '24px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Start Year</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[2020, 2021, 2022, 2023, 2024].map(y => (
              <button key={y} onClick={() => setStartYear(y)} aria-label={`Start from ${y}`} style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: startYear === y ? 600 : 400, borderRadius: 6, border: 'none', cursor: 'pointer', background: startYear === y ? 'var(--accent)' : 'var(--surface2)', color: startYear === y ? 'white' : 'var(--text3)', transition: 'all 0.15s' }}>{y}</button>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Staking Yield</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setIncludeYield(true)} aria-pressed={includeYield} style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: includeYield ? 600 : 400, borderRadius: 6, border: 'none', cursor: 'pointer', background: includeYield ? 'var(--accent)' : 'var(--surface2)', color: includeYield ? 'white' : 'var(--text3)', transition: 'all 0.15s' }}>On ({baseStakingAPY}%)</button>
            <button onClick={() => setIncludeYield(false)} aria-pressed={!includeYield} style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: !includeYield ? 600 : 400, borderRadius: 6, border: 'none', cursor: 'pointer', background: !includeYield ? 'var(--accent)' : 'var(--surface2)', color: !includeYield ? 'white' : 'var(--text3)', transition: 'all 0.15s' }}>Off</button>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>NAV Multiple</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[0.8, 1.0, 1.2, 1.5, 2.0].map(m => (
              <button key={m} onClick={() => setAssumedMult(m)} aria-label={`${m}x NAV multiple`} style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: assumedMult === m ? 600 : 400, borderRadius: 6, border: 'none', cursor: 'pointer', background: assumedMult === m ? 'var(--accent)' : 'var(--surface2)', color: assumedMult === m ? 'white' : 'var(--text3)', transition: 'all 0.15s' }}>{m.toFixed(1)}x</button>
            ))}
          </div>
        </div>
      </div>
      {stats && (<>
      {/* Results KPIs — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#backtest-results</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Total Return', value: `${stats.totalReturn >= 0 ? '+' : ''}${stats.totalReturn.toFixed(0)}%`, sub: `Since ${startYear}`, color: stats.totalReturn >= 0 ? 'var(--mint)' : 'var(--coral)' },
          { label: 'Current NAV', value: `$${stats.currentNav.toFixed(2)}`, sub: 'Latest', color: 'var(--sky)' },
          { label: 'Stock Price', value: `$${stats.currentPrice.toFixed(2)}`, sub: `At ${assumedMult.toFixed(1)}x`, color: 'var(--mint)' },
          { label: 'Max Drawdown', value: `${stats.maxDD.toFixed(0)}%`, sub: 'Peak to trough', color: 'var(--coral)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#backtest-chart</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }} aria-label="Backtest chart">
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Historical NAV & Stock Price</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <ResponsiveContainer width="100%" height={350}><AreaChart data={data.data}><defs><linearGradient id="navGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient><linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="date" stroke="var(--text3)" tick={{ fontSize: 10 }} interval="preserveStartEnd" /><YAxis stroke="var(--text3)" tickFormatter={v => `$${v.toFixed(0)}`} fontSize={10} /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }} formatter={(v, name) => [`$${Number(v).toFixed(2)}`, name === 'nav' ? 'NAV' : 'Stock']} /><Area type="monotone" dataKey="nav" stroke="var(--violet)" strokeWidth={2} fill="url(#navGrad)" name="nav" /><Area type="monotone" dataKey="stockPrice" stroke="var(--mint)" strokeWidth={2} fill="url(#priceGrad)" name="stockPrice" /></AreaChart></ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
            {[{ label: 'NAV', color: 'var(--violet)' }, { label: `Stock (${assumedMult.toFixed(1)}x)`, color: 'var(--mint)' }].map(l => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text3)' }}>
                <span style={{ width: 12, height: 3, borderRadius: 1, background: l.color }} />{l.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
        <div style={{ width: 6, height: 32, background: 'var(--accent)', borderRadius: 3 }} />
        DCF<UpdateIndicators sources={['PR', 'SEC']} />
      </div>
      <div className="highlight"><h3>DCF Valuation</h3>
        <p className="text-sm">DCF valuation with three methods: terminal NAV only, with staking cash flows, or with declared dividends. Adjust growth and discount rate.</p>
      </div>
      
      {/* DCF Method Selector */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DCF Method</span>
        </div>
        <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button
            onClick={() => setDcfMethod('terminal')}
            style={{
              padding: '12px 16px',
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
              padding: '12px 16px',
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
              padding: '12px 16px',
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
          <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 8, padding: 12, marginTop: 16 }}>
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
          <div style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 8, padding: 12, marginTop: 16 }}>
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
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Model Inputs</span>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              <Input label="ETH Growth (%/yr)" value={ethGrowth} onChange={setEthGrowth} />
              <Input label="Discount Rate (%)" value={discount} onChange={setDiscount} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              <Input label="Terminal Multiple" value={terminalMult} onChange={setTerminalMult} step={0.1} />
              <Input label="Years" value={years} onChange={setYears} min={1} max={10} />
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Output</span>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              <Card label="Implied Value" value={`$${dcf.impliedValue.toFixed(2)}`} sub={dcfMethod === 'intermediate' ? 'CFs + Terminal' : dcfMethod === 'dividend' ? 'Divs + Terminal' : 'Terminal only'} color="mint" />
              <Card label="Current NAV" value={`$${calc.currentNAV.toFixed(2)}`} sub="Book value" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              <Card label="Upside" value={`${dcf.upside >= 0 ? '+' : ''}${dcf.upside.toFixed(0)}%`} sub="vs NAV" color={dcf.upside >= 0 ? 'green' : 'red'} />
              <Card label="Implied IRR" value={`${irr.toFixed(1)}%`} sub="Annualized" />
            </div>
            {dcfMethod === 'intermediate' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                <Card label="PV of Cash Flows" value={`$${dcf.sumIntermediatePV.toFixed(2)}`} sub={`${years}yr yield @ ${yieldPayout}% payout`} color="cyan" />
                <Card label="PV of Terminal" value={`$${dcf.terminalPV.toFixed(2)}`} sub={`Year ${years} exit`} color="violet" />
              </div>
            )}
            {dcfMethod === 'dividend' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                <Card label="PV of Dividends" value={`$${dcf.sumDividendPV.toFixed(2)}`} sub={`${years}yr @ ${dividendGrowthRate}% growth`} color="mint" />
                <Card label="PV of Terminal" value={`$${dcf.terminalPV.toFixed(2)}`} sub={`Year ${years} exit`} color="violet" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Projections</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: dcfMethod === 'intermediate' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr' : dcfMethod === 'dividend' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr' : '80px 1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Year', 'ETH', 'ETH Price', 'NAV',
              ...(dcfMethod === 'intermediate' ? ['Yield ETH', 'CF/Share', 'CF PV'] : []),
              ...(dcfMethod === 'dividend' ? ['Dividend', 'Div PV'] : []),
              'NAV PV'
            ].map((h, i) => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: i === 0 ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {/* Data rows */}
          {dcf.projections.map((p, i) => (
            <div key={p.year} style={{ display: 'grid', gridTemplateColumns: dcfMethod === 'intermediate' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr' : dcfMethod === 'dividend' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr' : '80px 1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: i < dcf.projections.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : '1px solid var(--border)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500 }}>{p.year}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>{(p.eth / 1e6).toFixed(2)}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>${p.ethPrice.toFixed(0)}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>${p.nav.toFixed(2)}</span>
              {dcfMethod === 'intermediate' && (
                <>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--mint)' }}>+{Math.round(p.yieldETH).toLocaleString()}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--sky)' }}>${p.cfPerShare.toFixed(2)}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--sky)' }}>${p.cfPV.toFixed(2)}</span>
                </>
              )}
              {dcfMethod === 'dividend' && (
                <>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--mint)' }}>${p.yearDiv.toFixed(2)}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', color: 'var(--mint)' }}>${p.divPV.toFixed(2)}</span>
                </>
              )}
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', fontWeight: 500 }}>${p.pv.toFixed(2)}</span>
            </div>
          ))}
          {/* Summary rows */}
          {dcfMethod === 'intermediate' && (
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500 }}>Sum CFs</span>
              <span /><span /><span /><span /><span />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', fontWeight: 500, color: 'var(--cyan)' }}>${dcf.sumIntermediatePV.toFixed(2)}</span>
              <span />
            </div>
          )}
          {dcfMethod === 'dividend' && (
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500 }}>Sum Dividends</span>
              <span /><span /><span />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', fontWeight: 500, color: 'var(--mint)', gridColumn: 'span 2' }}>${dcf.sumDividendPV.toFixed(2)}</span>
              <span />
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: dcfMethod === 'intermediate' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr' : dcfMethod === 'dividend' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr' : '80px 1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 500 }}>Terminal</span>
            {dcfMethod === 'terminal' && <><span /><span /></>}
            {dcfMethod === 'intermediate' && <><span /><span /><span /><span /><span /></>}
            {dcfMethod === 'dividend' && <><span /><span /><span /><span /></>}
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right' }}>${dcf.terminalNAV.toFixed(2)}</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', fontWeight: 500 }}>${dcf.terminalPV.toFixed(2)}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: dcfMethod === 'intermediate' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr' : dcfMethod === 'dividend' ? '80px 1fr 1fr 1fr 1fr 1fr 1fr' : '80px 1fr 1fr 1fr 1fr', padding: '12px 24px', background: 'rgba(0,212,170,0.1)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700 }}>TOTAL</span>
            {dcfMethod === 'terminal' && <><span /><span /><span /></>}
            {dcfMethod === 'intermediate' && <><span /><span /><span /><span /><span /><span /></>}
            {dcfMethod === 'dividend' && <><span /><span /><span /><span /><span /></>}
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, textAlign: 'right', fontWeight: 700, color: 'var(--mint)' }}>${dcf.impliedValue.toFixed(2)}</span>
          </div>
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
    bear: { drift: -5, vol: 80, multVol: 30, corr: 0.5, label: '🐻 Bear', color: '#f97316', desc: 'ETH decline, high volatility, mNAV compression' },
    base: { drift: 12, vol: 65, multVol: 20, corr: 0.3, label: '📊 Base', color: '#eab308', desc: 'Moderate ETH growth, historical volatility' },
    bull: { drift: 30, vol: 55, multVol: 15, corr: 0.2, label: '🐂 Bull', color: '#06b6d4', desc: 'Strong ETH rally, lower vol, mNAV expansion' },
    custom: { drift, vol, multVol, corr, label: '⚙️ Custom', color: '#8b5cf6', desc: 'Your custom parameters' }
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
    // Sortino: downside deviation uses ALL n observations but only squares below-target returns
    const downVar = returns.reduce((a, r) => a + (r < riskFreeDecimal ? (r - riskFreeDecimal) ** 2 : 0), 0) / n;
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
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-header</div>
        <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>GBM Price Path Simulation<UpdateIndicators sources={['PR', 'SEC']} /></div>
          <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Monte Carlo<span style={{ color: 'var(--accent)' }}>.</span></h2>
          <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Runs {sims.toLocaleString()} simulations over {years} years using Geometric Brownian Motion for ETH price with correlated NAV multiple dynamics. Includes staking yield, slashing, and liquidity discounts.</p>
        </div>
      </div>

      {/* Scenario Presets */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-scenarios</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          {Object.entries(presets).map(([key, p]) => {
            const isActive = activePreset === key;
            return (
              <div
                key={key}
                onClick={() => loadPreset(key)}
                style={{
                  padding: '16px 8px',
                  background: isActive ? `${p.color}15` : 'var(--surface)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'center',
                  borderBottom: isActive ? `2px solid ${p.color}` : '2px solid transparent',
                }}
              >
                <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{p.label}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 16, fontWeight: 700, color: isActive ? p.color : 'var(--text)', margin: '4px 0 2px' }}>
                  {p.drift > 0 ? '+' : ''}{p.drift}%
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                  {p.vol}% vol
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizon & Simulation Controls */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-controls</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>TIME HORIZON</span></div>
            <div style={{ padding: '24px 24px' }}>
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
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>SIMULATIONS</span></div>
            <div style={{ padding: '24px 24px' }}>
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
      </div>

      {/* Parameters - Model Tab Style */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-parameters</div>
        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>GBM Parameters</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH DRIFT (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
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
                    padding: '12px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
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
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH VOLATILITY (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
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
                    padding: '12px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
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

        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>NAV Multiple Dynamics</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>MULTIPLE VOLATILITY (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
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
                    padding: '12px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
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
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ETH-MULTIPLE CORRELATION</span></div>
            <div style={{ padding: '24px 24px' }}>
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
                    padding: '12px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
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
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-percentiles</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '16px 24px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>
            <span style={{ textAlign: 'left' }}>Percentile</span>
            <span style={{ textAlign: 'right' }}>Price Target</span>
            <span style={{ textAlign: 'right' }}>vs Current</span>
            <span style={{ textAlign: 'right' }}>Implied Return</span>
          </div>
          {[
            { label: 'P5 (Bear Case)', value: sim.p5 },
            { label: 'P25', value: sim.p25 },
            { label: 'P50 (Median)', value: sim.p50, highlight: true },
            { label: 'P75', value: sim.p75 },
            { label: 'P95 (Bull Case)', value: sim.p95 },
          ].map((row, i) => {
            const pctChange = ((row.value / currentNAV - 1) * 100);
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', background: row.highlight ? 'var(--accent-dim)' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = 'var(--surface2)'; }}
                onMouseLeave={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <span style={{ fontWeight: row.highlight ? 600 : 400, color: row.highlight ? 'var(--accent)' : 'var(--text2)' }}>{row.label}</span>
                <span style={{ textAlign: 'right', fontFamily: 'Space Mono', fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--accent)' : 'var(--text)' }}>${row.value.toFixed(2)}</span>
                <span style={{ textAlign: 'right', fontFamily: 'Space Mono', color: 'var(--text2)' }}>${(row.value - currentNAV).toFixed(2)}</span>
                <span style={{ textAlign: 'right', fontFamily: 'Space Mono', fontWeight: 500, color: pctChange >= 0 ? 'var(--mint)' : 'var(--red)' }}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Metrics */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-risk-metrics</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px 24px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>
            <span style={{ textAlign: 'left' }}>Risk Metric</span>
            <span style={{ textAlign: 'right' }}>Value</span>
            <span style={{ textAlign: 'left' }}>Interpretation</span>
          </div>
          {[
            { label: 'Win Probability', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.winProb > 50 ? 'var(--mint)' : 'var(--red)' }}>{sim.winProb.toFixed(1)}%</span>, interp: 'Prob. of exceeding current NAV' },
            { label: 'Expected Value', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600 }}>${sim.mean.toFixed(2)}</span>, interp: 'Mean simulated fair value' },
            { label: 'Sharpe Ratio', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.sharpe > 1 ? 'var(--mint)' : sim.sharpe > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sharpe.toFixed(2)}</span>, interp: sim.sharpe > 1 ? 'Excellent risk-adj return' : sim.sharpe > 0.5 ? 'Good risk-adj return' : 'Moderate risk-adj return' },
            { label: 'Sortino Ratio', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.sortino > 1 ? 'var(--mint)' : sim.sortino > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sortino.toFixed(2)}</span>, interp: 'Downside-adjusted return' },
            { label: 'VaR (5%)', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{sim.var5.toFixed(1)}%</span>, interp: '95% confidence floor' },
            { label: 'CVaR (5%)', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{sim.cvar5Pct.toFixed(1)}%</span>, interp: 'Expected tail loss' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', transition: 'background 0.15s', cursor: 'default' }}
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
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-distribution</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>FAIR VALUE DISTRIBUTION</span></div>
          <div style={{ padding: '24px 24px' }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sim.histogram}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="price" stroke="var(--text3)" tickFormatter={v => `$${v.toFixed(0)}`} />
              <YAxis stroke="var(--text3)" tickFormatter={v => `${v.toFixed(1)}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}
                formatter={(v) => [`${Number(v).toFixed(2)}%`, 'Probability']}
                labelFormatter={(v) => `$${Number(v).toFixed(0)}`}
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
      </div>

      {/* CFA Notes */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-notes</div>
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
    latestEvent: '4.326M ETH Holdings — $10.0B Total',
    latestEventDate: 'Feb 9, 2026',

    // Last press release processed (for tracking)
    lastPressRelease: 'February 9, 2026',
    lastPressReleaseTitle: '4,325,738 ETH Holdings Update — $10.0B Total',

    // Latest filings by type
    filings: {
      '10-K': { date: 'Nov 21, 2025', description: 'FY 2025', color: 'blue' },
      '10-Q': { date: 'Jan 13, 2026', description: 'Q1 FY2026', color: 'purple' },
      '8-K': { date: 'Feb 9, 2026', description: '4.326M ETH Holdings', color: 'yellow' },
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 24px', marginBottom: 12 }}><div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>SEC Filing Tracker</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filing History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, background: 'var(--surface2)', borderRadius: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>First SEC Filing</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: 'var(--violet)' }}>{filingData.firstFiling}</span>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{filingData.firstFilingNote}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, background: 'var(--surface2)', borderRadius: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>Latest Event</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: 'var(--gold)' }}>{filingData.latestEvent}</span>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{filingData.latestEventDate}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>Last PR Processed</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: 'var(--mint)' }}>{filingData.lastPressRelease}</span>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{filingData.lastPressReleaseTitle}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latest Filings by Type</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
            {Object.entries(filingData.filings).map(([type, info]) => {
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                blue: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
                purple: { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', text: '#c084fc' },
                yellow: { bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)', text: '#facc15' },
                green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', text: '#4ade80' },
                orange: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', text: '#fb923c' },
                cyan: { bg: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.3)', text: '#22d3ee' },
              };
              const cs = colorMap[info.color] || colorMap.cyan;
              return (
                <div key={type} style={{ padding: 8, border: `1px solid ${cs.border}`, borderRadius: 4, background: cs.bg }}>
                  <div style={{ fontWeight: 500, color: cs.text }}>{type}</div>
                  <div style={{ color: 'var(--text3)' }}>{info.date}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{info.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text3)' }}>
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
    date: '2026-02-12',
    source: 'February 12, 2026 — Updated: CoinDesk Consensus + Beast/Step + S-8 + Nelson Separation',
    verdict: 'STRONG BUY',
    verdictColor: 'green',
    tagline: 'The ETH Supercycle Play',

    // Investment Scorecard — Unified 8-category framework (matches ASTS/CRCL)
    scorecard: [
      { category: 'Financial Strength', rating: 'A', color: 'var(--mint)', detail: 'Solid: $10.0B total holdings, $595M cash, zero debt (ETH down to $2,125)' },
      { category: 'Profitability', rating: 'A+', color: 'var(--mint)', detail: 'Staking yield: $202M/yr annualized (67% deployed, 3.11% CESR), dividend initiated' },
      { category: 'Growth', rating: 'A+', color: 'var(--mint)', detail: '3.58% ETH supply, 72% to "Alchemy of 5%", $24.5B ATM capacity' },
      { category: 'Valuation', rating: 'A+', color: 'var(--mint)', detail: 'Below NAV at $2,125 ETH — deep value, ETH -62% from 2025 highs, V-shaped recoveries expected' },
      { category: 'Competitive Position', rating: 'A+', color: 'var(--mint)', detail: '#1 ETH treasury globally, 4yr+ head start, scale nearly unassailable' },
      { category: 'Execution', rating: 'A+', color: 'var(--mint)', detail: 'Flawless pivot, Young Kim CFO/COO, 81% YES shareholder vote, MAVAN Q1' },
      { category: 'Regulatory/External', rating: 'B+', color: 'var(--sky)', detail: 'Pro-crypto admin, GENIUS Act + SEC Project Crypto; SEC/staking risk persists' },
      { category: 'Capital Structure', rating: 'A', color: 'var(--mint)', detail: '500K+ stockholders, #107 most traded, $200M Beast Industries closed' },
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
      summary: 'Strong ecosystem tailwinds despite ETH price weakness (-62% from 2025 highs). Ethereum daily txns hit ATH (2.5M), active addresses ATH (1M daily). Tom Lee: ETH prices see V-shaped recoveries from 50%+ drops (8th time since 2018). GENIUS Act + SEC Project Crypto transformational.',
    },

    // Executive Summary — Unified schema (matches ASTS/CRCL)
    executiveSummary: {
      headline: `BMNR is the single best way to play the Ethereum supercycle with downside protection.`,
      thesis: `This is not just another crypto stock. BMNR has created something unprecedented: a yield-generating, dividend-paying, institutionally-accessible vehicle for leveraged ETH exposure.

They own 3.58% of all Ethereum in existence — 4.326 million tokens. They're over 72% of the way to 5%. No one else is even close.

The MSTR playbook worked. BMNR is running the same play on a yield-bearing asset — and paying you to wait. With $595M cash and $24.5B ATM capacity, the accumulation machine keeps running. 2.9M ETH staked (67% of holdings). CESR rate improved to 3.11%. ETH -62% from 2025 highs — Tom Lee: this is the 8th time since 2018 ETH has fallen 50%+ from a high, and V-shaped recoveries follow every time. MAVAN on track Q1 2026.`,
      bottomLine: `If you believe ETH goes higher, BMNR is the trade. If you're wrong, $10.0B in assets, staking income ($202M/yr annualized at 67% staked, $374M at scale), and NAV floor limit your downside. Asymmetric.`,
      whatsNew: [
        'Tom Lee presented at CoinDesk Consensus 2026 in Hong Kong (Feb 11) — global thought leadership',
        'Beast Industries acquires Step banking app (7M+ users, ~$500M raised) — BMNR $200M investment now includes fintech platform',
        'S-8 filed for 2025 Omnibus Incentive Plan (Feb 9) — full board signed',
        'Nelson separated as President (Jan 22) — $605K severance, non-compete waived',
        'Acquired 40,613 ETH in past week — now 3.58% of supply (72% to 5%)',
        'ETH -62% from 2025 highs, Tom Lee: V-shaped recovery expected (8th 50%+ drop since 2018)',
        'Annualized staking revenue: $202M, up +7% WoW; CESR rate improved to 3.11%',
      ],
    },
    
    // Growth Drivers (CRCL-style)
    growthDrivers: [
      { driver: 'ETH Price Appreciation', impact: 'Critical', description: 'Every $1,000 ETH move = $4.3B NAV change. ETH -62% from highs — V-shaped recovery expected. At $10K, NAV/share hits $99+.', color: 'var(--mint)' },
      { driver: 'Staking Income Scale', impact: 'High', description: '2.9M ETH staked ($6.2B, 67% of holdings). Annualized: $202M (+7% WoW), $374M at full scale (3.11% CESR).', color: 'var(--mint)' },
      { driver: 'NAV Premium Expansion', impact: 'High', description: 'Currently below NAV at $2,125 ETH. MSTR trades 2-3x. Gap closure = significant upside.', color: 'var(--sky)' },
      { driver: 'Continued Accumulation', impact: 'High', description: '$595M cash + $24.5B ATM capacity. 81% YES vote unlocks massive share authorization.', color: 'var(--sky)' },
      { driver: 'Dividend Growth', impact: 'Medium', description: 'Started at $0.04/yr. As staking scales (now 67%), expect 10-20% annual dividend growth.', color: 'var(--gold)' },
    ],
    
    // Competitive Moat (CRCL-style with sources and threats)
    moatSources: [
      { source: 'Scale Dominance', strength: 'Strong', detail: '4.326M ETH = 3.58% of total supply. #1 ETH treasury, #2 global crypto treasury behind MSTR.', color: 'var(--mint)' },
      { source: 'Yield Advantage', strength: 'Strong', detail: 'Only ETH treasury generating staking yield AND paying dividends. 2.9M ETH staked, $202M/yr annualized (3.11% CESR).', color: 'var(--mint)' },
      { source: 'Capital Access', strength: 'Strong', detail: '$595M cash + $24.5B ATM + 81% shareholder YES vote unlocks massive issuance capacity.', color: 'var(--mint)' },
      { source: 'Management Depth', strength: 'Strong', detail: 'Tom Lee (Chairman) + Young Kim CFO/COO (MIT/HBS, 20yr institutional PM). Backed by ARK, Founders Fund, Pantera, Galaxy, Bill Miller III.', color: 'var(--mint)' },
      { source: 'Retail Base', strength: 'Strong', detail: '500K+ individual stockholders. #107 most traded US stock ($1.3B/day). Deep liquidity.', color: 'var(--mint)' },
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
      { event: 'Beast Industries', timing: 'Jan 17, 2026 ✅ CLOSED', impact: '$200M equity investment in MrBeast\'s company — GenZ/Millennial reach + DeFi integration. Feb 10: Beast acquires Step (7M+ users)', color: 'var(--mint)' },
      { event: 'MAVAN Launch', timing: 'Q1 2026', impact: 'Proprietary staking = margin expansion, largest staking provider in crypto (on track)', color: 'var(--mint)' },
      { event: 'Dividend Increase', timing: 'Q1 2026', impact: 'Likely 2-3x current rate as staking scales (67% now staked, 3.11% CESR)', color: 'var(--sky)' },
      { event: 'Index Inclusion', timing: 'Jun 2026', impact: 'Russell 2000 inclusion forces passive buying', color: 'var(--sky)' },
      { event: '5% ETH Target', timing: '2026', impact: 'Would own ~6.0M ETH — "Alchemy of 5%" complete (currently 72% there)', color: 'var(--gold)' },
    ],
    
    // Risk Matrix (CRCL-style)
    risks: [
      { risk: 'ETH Price Collapse', severity: 'Critical', likelihood: 'Low', impact: 'High', detail: 'The existential risk. A -70% drawdown would devastate NAV. At $1,000 ETH, NAV/share drops to ~$9.90. This is a leveraged ETH bet.', mitigation: 'Staking income ($374M/yr at scale) provides cushion; NAV floor via $1B buyback authorization.' },
      { risk: 'NAV Premium Evaporation', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Currently below NAV at $2,125 ETH. If sentiment shifts further, could drop to 0.5x. GBTC traded at -40% discount for years.', mitigation: '$1B buyback at discount provides floor; dividend yield supports valuation.' },
      { risk: 'Regulatory Crackdown', severity: 'Medium', likelihood: 'Low', impact: 'High', detail: 'SEC declares ETH a security, bans staking, or targets crypto treasuries. Current environment favorable but politics change.', mitigation: 'Diversified staking providers; compliance-first approach; MAVAN US-based.' },
      { risk: 'MAVAN Execution Failure', severity: 'Medium', likelihood: 'Low', impact: 'Medium', detail: 'Delays or technical issues with proprietary staking. On track for Q1 2026 launch.', mitigation: 'Third-party providers already operational (2.9M staked); upside risk, not existential.' },
      { risk: 'Dilution Fatigue', severity: 'Low', likelihood: 'Low', impact: 'Medium', detail: 'Market stops funding ATMs at premium. Would slow accumulation but not fatal.', mitigation: '$595M cash + staking income ($202M/yr annualized) provides runway without issuance.' },
    ],
    
    // Three Perspectives (CRCL-style)
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'FAVORABLE',
        color: 'var(--mint)',
        summary: 'Single-asset concentration with embedded leverage through NAV premium mechanism. Best positioned as 2-5% satellite allocation within alternatives bucket. Execution risk materially reduced — Young Kim (CFO/COO) brings 20yr institutional PM experience. $200M Beast Industries investment (CLOSED). 2.9M ETH staked (67%). 81% shareholder YES vote. ETH -62% from highs creates deep value entry.',
        ecosystemView: 'Ethereum network fundamentals support the thesis despite price weakness. ATH daily txns (2.5M), ATH active addresses (1M), deflationary supply (-0.2%), and growing institutional adoption via ETFs. $202M annual staking income at current 67% deployment (3.11% CESR) is a game-changer for valuation.',
        recommendation: 'Allocate 2-5% of alternatives sleeve. Rebalance quarterly.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG',
        color: 'var(--mint)',
        summary: 'Cleanest asymmetric setup in crypto equities. Market treating BMNR like simple ETH proxy — it\'s not. Staking yield + dividend + accretive issuance creates compounding machine. Beast Industries CLOSED ($200M, 450M subs). 81% shareholder YES vote. 500K+ stockholders, #107 most traded. ETH -62% from highs — V-shaped recovery expected.',
        ecosystemView: 'ETH price dislocation is the opportunity. $595M cash + $24.5B ATM = unlimited firepower. 2.9M ETH staked (67%, $202M/yr). Tom Lee: 8th time ETH has fallen 50%+ since 2018, V-shaped recoveries follow every time. Best entry points come after sharp declines.',
        recommendation: 'Size up to 8-10% of book. Stop loss at 0.6x NAV.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'CORE POSITION',
        color: 'var(--violet)',
        summary: '$10.0B total holdings. 4.326M ETH (3.58% of supply). $200M Beast Industries (CLOSED). 81% shareholder YES vote. 500K+ stockholders. This is how you get institutional ETH exposure without custody complexity — and now with creator economy upside. Management bench: Tom Lee (Chairman), Young Kim (CFO/COO). Backed by ARK, Founders Fund, Pantera, Galaxy Digital, Bill Miller III, and Tom Lee personally.',
        ecosystemView: 'Ecosystem maturation reduces tail risk despite -62% price decline. ETH fundamentals at ATH (2.5M daily txns, 1M active addresses). Beast Industries ($200M, CLOSED) expands GenZ reach. GENIUS Act + SEC Project Crypto as transformational as ending Bretton Woods in 1971. Tom Lee: V-shaped recovery expected, best entry points come after sharp declines.',
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
      date: '2026-02-09',
      source: 'PR: 4.326M ETH Holdings + $10.0B Total + ETH -62% from Highs',
      verdict: 'STRONG BUY',
      verdictColor: 'green',
      summary: '4.326M ETH ($9.2B @ $2,125). 2.9M ETH staked (67%). +40,613 ETH acquired. 3.58% of supply. $595M cash. #107 most traded US stock ($1.3B/day). ETH -62% from 2025 highs — V-shaped recovery expected.',
      fullAnalysis: {
        context: 'February 9, 2026 PR shows ETH price declined further ($2,317→$2,125, -62% from 2025 highs) but Tom Lee emphasizes this is the 8th time since 2018 ETH has fallen 50%+ and V-shaped recoveries follow every time. Ethereum daily txns ATH (2.5M), active addresses ATH (1M). CESR improved to 3.11%. Annualized staking revenue $202M (+7% WoW). $200M Beast Industries initial investment closed. MAVAN on track Q1 2026.',
        keyHighlights: [
          'ETH holdings: 4,325,738 ETH @ $2,125 = $9.2B (3.58% of 120.7M supply)',
          'Total holdings: $10.0B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $595M (up from $586M)',
          'Staked ETH: 2,897,459 ($6.2B) — 67% of holdings',
          'Annualized staking revenue: $202M (up +7% WoW), 3.11% CESR',
          'At scale staking: $374M/yr (3.115% CESR), >$1M/day',
          'BMNR 7-day staking yield: 3.3234% annualized',
          'Acquired 40,613 ETH in past week',
          '#107 most traded US stock ($1.3B/day, 5-day avg as of Feb 6)',
          'ETH -62% from 2025 highs — 8th time since 2018 with 50%+ decline',
          'Tom Lee: V-shaped recoveries follow every major ETH decline',
          'Ethereum fundamentals: ATH daily txns (2.5M), ATH active addresses (1M)',
          'GENIUS Act + SEC Project Crypto compared to ending Bretton Woods (1971)',
          'MAVAN on track Q1 2026 (3 staking providers)',
        ],
        verdict: 'Deep value entry point. ETH fundamentals at ATH while price -62% from highs. V-shaped recovery pattern highly likely (8 prior instances). Staking revenue growing. Accumulation continues.',
        scorecard: 9.5,
        risks: 'ETH price declined further from $2,317 to $2,125. Total holdings down from $10.7B to $10.0B. Continued price weakness could test NAV floor.',
        strategy: 'STRONG BUY. ETH -62% from highs = generational entry point. Fundamentals diverging from price (ATH txns/addresses). V-shaped recovery pattern. Accumulate aggressively.'
      }
    },
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div
        onClick={() => toggleSection(id)}
        style={{ padding: '24px 24px', borderBottom: investmentSections.has(id) ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-expanded={investmentSections.has(id)}
        onKeyDown={(e) => e.key === 'Enter' && toggleSection(id)}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>
          {title}
          {sources && <UpdateIndicators sources={sources} />}
        </span>
        <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has(id) ? '−' : '+'}</span>
      </div>
      {investmentSections.has(id) && <div style={{ padding: '24px 24px' }}>{children}</div>}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Controls */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-header</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Due Diligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
          <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Investment Analysis<span style={{ color: 'var(--accent)' }}>.</span></h2>
          <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Multi-perspective due diligence analysis with CFA, hedge fund, and institutional frameworks. ETH treasury thesis scoring and risk assessment.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={expandAll} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer' }}>⊞ Expand All</button>
          <button onClick={collapseAll} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer' }}>⊟ Collapse All</button>
        </div>
      </div>

      {/* Data Refresh Indicator */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text3)' }}>
        <span>Data as of: <strong style={{ color: 'var(--text2)' }}>{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong style={{ color: 'var(--text2)' }}>{current.source}</strong></span>
      </div>

      {/* Rating Header */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--mint)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '8px 20px', borderRadius: 99, fontWeight: 700, fontSize: 18 }}>BUY</span>
              <span style={{ background: 'rgba(126,231,135,0.15)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>HIGH CONVICTION</span>
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
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--mint)', fontWeight: 700 }}>$23.04</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>@ $2,125 ETH</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Total Holdings</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--sky)', fontWeight: 700 }}>$10.0B</div>
              <div style={{ fontSize: 10, color: 'var(--mint)' }}>4.326M ETH + $595M Cash</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Staked ETH</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 22, color: 'var(--violet)', fontWeight: 700 }}>2.90M</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>$6.2B Value (67%)</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Section Divider: Ratings & Scoring */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Ratings & Scoring</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Investment Scorecard */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-scorecard</div>
      <CollapsibleSection id="scorecard" title="Investment Scorecard" sources={['PR', 'SEC']}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {current.scorecard.map((item, i) => (
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

        {/* Ecosystem Health Rating */}
        <div style={{ padding: 16, background: 'color-mix(in srgb, var(--violet) 8%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
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
              <div key={i} style={{ background: 'var(--surface)', padding: 12, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{m.metric}</div>
                <div style={{ fontSize: 13, fontFamily: 'Space Mono', color: m.color, fontWeight: 600 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: m.color }}>✓ {m.signal}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', fontStyle: 'italic' }}>{current.ecosystemHealth.summary}</div>
        </div>
      </CollapsibleSection>

      {/* Section Divider: Investment Thesis */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Investment Thesis</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Summary */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-summary</div>
      <CollapsibleSection id="summary" title="Investment Summary" sources={['PR', 'SEC']}>
        <div style={{ background: 'color-mix(in srgb, var(--mint) 5%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
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

      {/* Section Divider: Growth Drivers */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Growth Drivers</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Growth Drivers */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-growth</div>
      <CollapsibleSection id="growth" title="Growth Drivers" sources="PR">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {current.growthDrivers.map((d, i) => (
            <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 6 }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{d.driver}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{d.description}</div>
              </div>
              <span style={{ color: d.color, fontWeight: 600, fontSize: 12, marginLeft: 16 }}>{d.impact}</span>
            </div>
          ))}
        </div>

        {/* Ethereum Ecosystem Catalyst */}
        <div style={{ padding: 12, background: 'color-mix(in srgb, var(--violet) 10%, transparent)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, color: 'var(--text2)' }}>
          <div style={{ fontWeight: 600, color: 'var(--violet)' }}>Ethereum Ecosystem Catalyst</div>
          <p style={{ }}>
            <strong style={{ color: 'var(--mint)' }}>Adoption Thesis:</strong> As more companies build on Ethereum (DeFi protocols, tokenized assets, on-chain payments, gaming), network activity and transaction fees increase. Greater Ethereum utility drives fundamental demand for ETH, directly benefiting BMNR's treasury holdings.
          </p>
          <p style={{ }}>
            <strong style={{ color: 'var(--sky)' }}>Cross-Portfolio Note:</strong> This thesis is doubly bullish for portfolios holding both BMNR and CRCL — Ethereum adoption drives ETH price appreciation (BMNR NAV) and increases USDC demand for on-chain settlement (CRCL revenue). The positions are positively correlated through Ethereum ecosystem growth.
          </p>
        </div>
      </CollapsibleSection>

      {/* Competitive Moat */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-moat</div>
      <CollapsibleSection id="moat" title="Competitive Moat" sources={['PR', 'SEC']}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--mint)', display: 'block', marginBottom: 8 }}>Moat Sources</span>
            {current.moatSources.map((m, i) => (
              <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 6 }}
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
            {current.moatThreats.map((t, i) => (
              <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 6 }}
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
          <strong>Moat Durability:</strong> A- (Strong). Scale advantage is nearly unassailable — would take years and billions for competitors to catch up. Yield advantage over BTC treasuries is permanent. Key risk is ETH price, not competitive dynamics.
        </div>
      </CollapsibleSection>

      {/* Section Divider: Risk Assessment */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Risk Assessment</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Risk Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-risks</div>
      <CollapsibleSection id="risks" title="Risk Matrix" sources={['PR', 'SEC']}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {current.risks.map((r, i) => (
            <div key={i} style={{ transition: 'background 0.15s', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12, borderLeft: `3px solid ${r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)'}` }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.risk}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: r.severity === 'Critical' ? 'color-mix(in srgb, var(--coral) 20%, transparent)' : r.severity === 'High' ? 'color-mix(in srgb, var(--gold) 20%, transparent)' : 'color-mix(in srgb, var(--sky) 20%, transparent)', color: r.severity === 'Critical' ? 'var(--coral)' : r.severity === 'High' ? 'var(--gold)' : 'var(--sky)' }}>{r.severity}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: 'var(--surface)', color: 'var(--text3)' }}>{r.likelihood} likelihood</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{r.detail}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}><strong style={{ color: 'var(--mint)' }}>Mitigation:</strong> {r.mitigation}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Risks & Strategic Assessment */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-strategic</div>
      <CollapsibleSection id="strategic-assessment" title="Risks & Strategic Assessment" sources={['PR', 'SEC']}>
        {/* Section Header */}
        <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>
          Multi-perspective risk evaluation and strategic decision framework for ETH treasury exposure
        </div>

        {/* Part 1: Multi-Perspective Risk Evaluation */}
        <div style={{ paddingBottom: 8, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)' }}>Risk Evaluation — Four Perspectives</span></div>

        {/* CFA Level III Perspective */}
        <div style={{ background: 'color-mix(in srgb, var(--violet) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--violet)', color: 'white', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>CFA LEVEL III</span>
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
            <p style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--violet) 10%, transparent)', borderRadius: 6, borderLeft: '3px solid var(--violet)' }}>
              <strong style={{ color: 'var(--violet)' }}>Ecosystem Assessment:</strong> {current.perspectives.cfa.ecosystemView}
            </p>
          </div>
        </div>

        {/* Hedge Fund Manager Perspective */}
        <div style={{ background: 'color-mix(in srgb, var(--gold) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--gold)', color: 'var(--bg)', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>HEDGE FUND</span>
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
            <p style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--gold) 10%, transparent)', borderRadius: 6, borderLeft: '3px solid var(--gold)' }}>
              <strong style={{ color: 'var(--gold)' }}>Ecosystem Assessment:</strong> {current.perspectives.hedgeFund.ecosystemView}
            </p>
          </div>
        </div>

        {/* CIO/CIS Institutional Perspective */}
        <div style={{ background: 'color-mix(in srgb, var(--sky) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--sky)', color: 'white', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>CIO / CIS</span>
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
            <p style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--sky) 10%, transparent)', borderRadius: 6, borderLeft: '3px solid var(--sky)' }}>
              <strong style={{ color: 'var(--sky)' }}>Ecosystem Assessment:</strong> {current.perspectives.cio.ecosystemView}
            </p>
          </div>
        </div>

        {/* Technical Analyst Perspective */}
        <div style={{ background: 'color-mix(in srgb, var(--mint) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#34d399', color: 'var(--bg)', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>TECHNICAL ANALYST</span>
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
            <p style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 10%, transparent)', borderRadius: 6, borderLeft: '3px solid #34d399' }}>
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
            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '6px 16px', borderRadius: 99, fontWeight: 700, fontSize: 13 }}>YES — ACCUMULATE ON DIPS</span>
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
        <div style={{ transition: 'background 0.15s', background: 'var(--surface2)', padding: '12px 16px', borderRadius: 12 }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}>
          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>What Can I Expect?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div style={{ background: 'color-mix(in srgb, var(--gold) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)' }}>
              <div style={{ fontWeight: 600, color: 'var(--gold)', fontSize: 13 }}>Short-Term (0-6 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                Expect ETH-correlated volatility ±30-50%. NAV premium will fluctuate with sentiment. Key catalysts: MAVAN progress, ETH accumulation PRs, staking deployment updates. Trading range tied to ETH — if ETH $3-5K, expect BMNR $3-8 range (rough).
              </div>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--sky) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)' }}>
              <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 13 }}>Mid-Term (6-18 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                If ETH cycle continues upward, NAV premium expansion drives outsized returns. Target: 2-4x from entry if ETH doubles and premium expands. Risk: cycle reversal could mean 60-80% drawdown. MAVAN fully operational should validate yield thesis.
              </div>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--violet) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
              <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 13 }}>Long-Term (3-5 years)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                If ETH reaches $10-20K cycle highs and BMNR executes on accumulation, this could be a 5-10x from current levels. But crypto cycles are brutal — expect at least one 70%+ drawdown along the way. Diamond hands required. Position size must allow holding through drawdowns.
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
        <div style={{ transition: 'background 0.15s', background: 'color-mix(in srgb, var(--violet) 8%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--violet) 8%, transparent)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--violet) 8%, transparent)')}>
          <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 15 }}>Ecosystem-Based Triggers</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>Monitor these Ethereum ecosystem signals (see Ethereum tab) alongside BMNR-specific metrics</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {/* Entry Signals */}
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 12 }}>
              <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 13 }}>Entry Signals (Consider Adding)</div>
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
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 12 }}>
              <div style={{ fontWeight: 600, color: 'var(--coral)', fontSize: 13 }}>Exit Signals (Consider Reducing)</div>
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
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 12 }}>
              <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 13 }}>Hold Signals (Stay Course)</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-position</div>
      <CollapsibleSection id="position" title="Position Sizing" sources="WS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)', display: 'block', marginBottom: 8 }}>Recommended Allocation</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {Object.entries(current.positionSizing).map(([key, val]) => (
                <div key={key} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <span style={{ color: 'var(--text2)', textTransform: 'capitalize' }}>{key}</span>
                  <span style={{ color: key === 'aggressive' ? 'var(--mint)' : key === 'growth' ? 'var(--sky)' : key === 'balanced' ? 'var(--gold)' : 'var(--coral)', fontWeight: 500 }}>{val.range}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)', display: 'block', marginBottom: 8 }}>Accumulation Zones</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {current.accumulation.map((z, i) => (
                <div key={i} style={{ transition: 'background 0.15s', display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <span style={{ color: 'var(--text2)' }}>{z.zone}</span>
                  <span style={{ color: z.color, fontWeight: 500 }}>{z.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Context — Unified framework for multi-asset allocation */}
        <div style={{ padding: 16, background: 'color-mix(in srgb, var(--violet) 8%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
          <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 14 }}>Portfolio Construction Context</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>For multi-asset portfolios holding BMNR alongside other positions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 12 }}>
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

      {/* Section Divider: Historical Analysis */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Historical Analysis</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Analysis Archive */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-archive</div>
      <CollapsibleSection id="archive" title="Analysis Archive — Complete History" sources={['PR', 'SEC']}>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Full record of all investment thesis updates. Never deleted.</div>
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 500, overflowY: 'auto' }}>
          {archive.map((a, i) => (
            <div key={i} style={{ transition: 'background 0.15s', background: i === 0 ? 'color-mix(in srgb, var(--mint) 5%, transparent)' : 'var(--surface2)', padding: '12px 16px', borderRadius: 12, border: i === 0 ? '1px solid color-mix(in srgb, var(--mint) 20%, transparent)' : '1px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget.style.background = i === 0 ? 'color-mix(in srgb, var(--mint) 5%, transparent)' : 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = i === 0 ? 'color-mix(in srgb, var(--mint) 5%, transparent)' : 'var(--surface2)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{a.date}</span>
                  {i === 0 && <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>CURRENT</span>}
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
                      <span key={j} style={{ padding: '4px 8px', background: 'var(--surface)', borderRadius: 99, fontSize: 11, color: 'var(--text3)' }}>• {h}</span>
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

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Investment Analysis" items={[
        { term: 'NAV Premium/Discount', def: 'Stock price vs net asset value per share. Premium implies market expects future growth; discount implies skepticism. Track premium trends for entry/exit signals.' },
        { term: 'ETH Treasury Model', def: 'Company holds ETH as primary asset and generates yield via staking. Similar to MicroStrategy BTC model but with staking income component.' },
        { term: 'Catalyst Calendar', def: 'Timeline of upcoming events that could move the stock. For BMNR: weekly holdings PRs, MAVAN launch, ETH price movements, ETF staking approvals.' },
        { term: 'Conviction Score', def: 'Aggregate rating combining fundamental analysis, catalyst proximity, and risk/reward asymmetry. Higher scores indicate stronger investment thesis.' },
      ]} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUARTERLY METRICS PANEL - Unified pattern matching ASTS QuarterlyMetricsPanel
// ═══════════════════════════════════════════════════════════════════════════════
const BMNRQuarterlyMetricsPanel = () => {
  const [opExQuarter, setOpExQuarter] = useState('Q1 2026');

  const quarterlyData = BMNR_QUARTERLY_DATA;

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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#quarterly-metrics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Key Metrics Evolution<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        {/* Summary Badges - ASTS pattern */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 500, border: '1px solid var(--cyan)', background: 'rgba(34,211,238,0.15)', color: 'var(--cyan)' }}>
            {quarterlyData.length} quarters of data ({quarterlyData[0].quarter} - {quarterlyData[quarterlyData.length-1].quarter})
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 500, border: '1px solid var(--mint)', background: 'rgba(34,197,94,0.15)', color: 'var(--mint)' }}>
            Assets: ${quarterlyData[0].assets}M → ${(quarterlyData[quarterlyData.length-1].assets/1000).toFixed(1)}B
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 500, border: '1px solid var(--gold)', background: 'rgba(251,146,60,0.15)', color: 'var(--gold)' }}>
            Shares: {quarterlyData[0].shares.toFixed(0)}M → {quarterlyData[quarterlyData.length-1].shares.toFixed(0)}M
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 500, border: '1px solid var(--violet)', background: 'rgba(139,92,246,0.15)', color: 'var(--violet)' }}>
            Era: ⛏️ BTC Mining → 💎 ETH Treasury
          </span>
        </div>

        {/* Quarterly Table - grid-based pattern */}
        <div style={{ overflowX: 'auto' }}>
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: `minmax(130px, 1fr) ${quarterlyData.map(() => '90px').join(' ')}`, borderBottom: '1px solid var(--border)' }}>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', position: 'sticky', left: 0 }}>Metric</span>
              {quarterlyData.map((q, idx) => (
                <span key={q.quarter} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: idx === 0 ? 'var(--accent-dim)' : 'var(--surface2)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {q.quarter.replace('Q', '').replace(' ', "'")}
                </span>
              ))}
            </div>
            {/* Rows */}
            {metrics.map((metric, mi) => (
              <div key={metric.label} style={{ display: 'grid', gridTemplateColumns: `minmax(130px, 1fr) ${quarterlyData.map(() => '90px').join(' ')}`, borderBottom: mi < metrics.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, position: 'sticky', left: 0, background: 'var(--bg1)' }}>
                  {metric.label}
                </span>
                {quarterlyData.map((q, idx) => {
                  const val = q[metric.key as keyof typeof q];
                  const cellColor = metric.color(val as never, q as never);
                  const isLatestQuarter = idx === 0;
                  return (
                    <span
                      key={q.quarter}
                      style={{
                        padding: '12px 16px',
                        fontSize: 12,
                        fontFamily: 'Space Mono, monospace',
                        textAlign: 'right',
                        ...(isLatestQuarter ? { background: 'var(--accent-dim)' } : {}),
                        ...(cellColor ? { color: cellColor } : {})
                      }}
                    >
                      {metric.format(val as never, q as never)}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footnotes - ASTS pattern */}
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          <p style={{ }}>* Q3 shares corrected in 10-Q/A amendment due to reverse stock split accounting error.</p>
          <p style={{ }}>* FY 2025 reflects post-pivot ETH treasury company. Pre-pivot quarters show BTC mining operations with going concern warning.</p>
          <p>* Data from SEC filings (10-K, 10-Q, 8-K). Q1 2026 net loss of ($5.2B) reflects unrealized ETH mark-to-market decline.</p>
        </div>

        {/* Latest Quarter Summary - ASTS pattern */}
        <div style={{ }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#latest-quarter-summary</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Latest Quarter Summary ({latestQuarter.quarter})<UpdateIndicators sources="SEC" /></span>
            </div>
            <div style={{ padding: '24px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: 'var(--surface2)', padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filing Source</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.filing}</div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ETH Holdings</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.ethHoldings?.toLocaleString() || '—'} ETH</div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Staking Deployed</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{latestQuarter.stakingDeployed?.toLocaleString() || '—'} ETH ({latestQuarter.stakingYield}% yield)</div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Treasury Value</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${(latestQuarter.crypto/1000).toFixed(2)}B</div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cash Position</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${latestQuarter.cash}M</div>
              </div>
              <div style={{ background: 'var(--surface2)', padding: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Assets</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>${(latestQuarter.assets/1000).toFixed(2)}B</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#charts-row-1</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 8 }}>Cash Position Evolution<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(q => ({
              label: q.quarter,
              value: q.cash,
              display: q.cash >= 1000 ? `$${(q.cash / 1000).toFixed(1)}B` : q.cash >= 100 ? `$${q.cash}M` : `$${(q.cash * 1000).toFixed(0)}K`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <>
                <div style={{ padding: '24px 24px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                  {data.map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>
                      <div style={{ width: '100%', background: 'var(--mint)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 160) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, textAlign: 'center', whiteSpace: 'nowrap' }}>{d.label}</div>
                    </div>
                  ))}
                  </div>
                </div>
                <div style={{ padding: '0 24px 24px', fontSize: 11, color: 'var(--text3)' }}>Post-pivot: $250M PIPE + subsequent ATM raises</div>
              </>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: 8 }}>Quarterly Burn Rate (OpEx)<UpdateIndicators sources="SEC" /></span>
          </div>
          <div style={{ padding: '24px 24px' }}>
          {(() => {
            const data = quarterlyData.slice().reverse().filter(q => q.opEx).map(q => ({
              label: q.quarter,
              value: q.opEx,
              display: `$${q.opEx}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--violet)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 160) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, textAlign: 'center', whiteSpace: 'nowrap' }}>{d.label}</div>
                  </div>
                ))}
                </div>
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
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 99, padding: '2px 8px', fontSize: 11, color: 'var(--text1)' }}
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
      </div>

      {/* ROW 2: Share Count & Market Cap - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#charts-row-2</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>Share Count (Outstanding)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(q => ({
              label: q.quarter,
              value: q.shares,
              display: `${q.shares.toFixed(0)}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 24px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--coral)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 160) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, textAlign: 'center', whiteSpace: 'nowrap' }}>{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--sky)', display: 'flex', alignItems: 'center', gap: 8 }}>Market Cap Evolution ($M)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = BMNR_MARKET_CAP_DATA;
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 24px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--sky)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 160) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, textAlign: 'center', whiteSpace: 'nowrap' }}>{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ROW 3: Company Specific (Crypto Holdings & NI) - ASTS pattern */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#charts-row-3</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: 8 }}>Crypto Holdings Evolution<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(q => ({
              label: q.quarter,
              value: q.crypto,
              display: q.crypto >= 1000 ? `$${(q.crypto / 1000).toFixed(1)}B` : `$${q.crypto}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <div style={{ padding: '24px 24px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                {data.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>
                    <div style={{ width: '100%', background: 'var(--violet)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 160) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, textAlign: 'center', whiteSpace: 'nowrap' }}>{d.label}</div>
                  </div>
                ))}
                </div>
              </div>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--mint)', display: 'flex', alignItems: 'center', gap: 8 }}>Net Income/(Loss)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = quarterlyData.slice().reverse().map(q => ({
              label: q.quarter,
              value: q.netIncome,
              display: q.netIncome >= 1000 ? `$${(q.netIncome / 1000).toFixed(1)}B` : q.netIncome <= -1000 ? `($${(Math.abs(q.netIncome) / 1000).toFixed(1)}B)` : q.netIncome >= 0 ? `$${q.netIncome}M` : `($${Math.abs(q.netIncome)}M)`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const hasPositive = data.some(d => d.value >= 0);
            const hasNegative = data.some(d => d.value < 0);
            return (
              <div style={{ padding: '24px 24px 24px', overflowX: 'auto' }}>
                <div style={{ minWidth: data.length * 64 }}>
                {hasPositive && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: hasNegative ? 100 : 200 }}>
                    {data.map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 56 }}>
                        {d.value >= 0 && <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>}
                        <div style={{ width: '100%', background: d.value >= 0 ? 'var(--mint)' : 'transparent', borderRadius: '4px 4px 0 0', height: d.value >= 0 && maxVal > 0 ? Math.round((d.value / maxVal) * 80) : 0, minHeight: d.value > 0 ? 2 : 0, transition: 'height 0.3s' }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--text3)' }}>
                  {data.map((d, i) => (
                    <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text3)', padding: '4px 0', minWidth: 56 }}>{d.label}</div>
                  ))}
                </div>
                {hasNegative && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, height: hasPositive ? 100 : 200 }}>
                    {data.map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 56 }}>
                        <div style={{ width: '100%', background: d.value < 0 ? 'var(--coral)' : 'transparent', borderRadius: '0 0 4px 4px', height: d.value < 0 && maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 80) : 0, minHeight: d.value < 0 ? 2 : 0, transition: 'height 0.3s' }} />
                        {d.value < 0 && <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginTop: 4 }}>{d.display}</div>}
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </div>
            );
          })()}
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#financials-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Quarterly Data<UpdateIndicators sources="SEC" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Financials<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Quarterly financial data, balance sheet trends, and key metric evolution. Focus on ETH holdings growth, staking revenue, and cash position management.</p>
      </div>

      {/* Section Divider: Overview */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Overview</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#financials-overview</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>{config.highlightTitle}<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.7 }}>{config.highlightText}</p>
        </div>
      </div>

      {/* Section Divider: Quarterly Metrics */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Quarterly Metrics</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <BMNRQuarterlyMetricsPanel />

      {/* Section Divider: Milestones */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Milestones</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#key-financial-milestones</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>Key Financial Milestones<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            {config.milestones.map((m, i) => (
              <div key={i} style={{ padding: 12, background: 'var(--surface2)' }}>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Financial Analysis" items={[
        { term: 'Mark-to-Market Accounting', def: 'ETH holdings are marked to market each quarter. Unrealized gains/losses flow through the income statement, creating volatile reported earnings.' },
        { term: 'Staking Revenue', def: 'Income from validating Ethereum transactions. BMNR generates ~3.11% APY on staked ETH ($202M/yr annualized). This is real, recurring revenue.' },
        { term: 'Cash Burn Rate', def: 'Quarterly operating cash outflow excluding ETH purchases. Low burn rate (~$5-10M/quarter) means long runway and most capital goes to ETH acquisition.' },
        { term: 'NAV per Share', def: 'Total asset value (ETH + cash + investments) divided by shares outstanding. Primary valuation metric for treasury companies.' },
      ]} />
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
  const adoptionTimeline = BMNR_ADOPTION_TIMELINE;
  
  const categories = ['All', 'Enterprise', 'DeFi', 'L2', 'Institutional', 'Protocol', 'Regulatory'];
  const companies = ['All', 'BlackRock', 'JPMorgan', 'Visa', 'Franklin Templeton', 'Fidelity', 'Coinbase', 'Sony', 'Goldman Sachs', 'State Street', 'Interactive Brokers', 'Societe Generale', 'Deutsche Bank', 'Bit Digital', 'Siemens', 'Telcoin', 'Shift4', 'Sentient Jet', 'GoTyme Bank', 'A+ Protocol', 'Ostium', 'Tetra Digital', 'DAMAC Properties', 'WisdomTree', 'Securitize', 'Paysafe', 'Guggenheim', 'UBS', 'Mastercard', 'DBS', 'HSBC', 'Citi', 'Standard Chartered', 'Santander', 'EIB', 'ANZ', 'ABN AMRO', 'HKMA', 'Oracle', 'PayPal', 'CoinShares', 'BitPay', 'Other'];
  
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#eth-correlation</div>
      <div style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--violet) 15%, transparent), color-mix(in srgb, var(--sky) 15%, transparent))', borderRadius: 16, padding: 24, border: '1px solid color-mix(in srgb, var(--violet) 30%, transparent)' }}>
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
        
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#eth-metrics</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {[
            { label: 'NAV per Share', value: `$${navPerShare.toFixed(2)}`, sub: `${navPremium >= 0 ? '+' : ''}${navPremium.toFixed(1)}% ${navPremium >= 0 ? 'premium' : 'discount'}`, color: 'var(--mint)', subColor: navPremium >= 0 ? 'var(--mint)' : 'var(--coral)' },
            { label: 'ETH per Share', value: ethPerShare.toFixed(4), sub: 'Your fractional ETH', color: 'var(--sky)', subColor: 'var(--text3)' },
            { label: 'Implied ETH Price', value: `$${impliedEthPrice.toFixed(0)}`, sub: `vs $${ethPrice.toLocaleString()} spot`, color: 'var(--gold)', subColor: impliedEthPrice > ethPrice ? 'var(--mint)' : 'var(--coral)' },
            { label: 'NAV Sensitivity', value: `$${navSensitivity.toFixed(2)}`, sub: 'per $100 ETH move', color: 'var(--violet)', subColor: 'var(--text3)' },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: kpi.subColor }}>{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ecosystem Metrics */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#network-metrics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Ethereum Network Metrics</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { label: 'ETH Staked', value: `${ecosystemMetrics.stakingRate}%`, color: 'var(--mint)' },
            { label: 'DeFi TVL', value: `$${ecosystemMetrics.defiTVL}B`, color: 'var(--sky)' },
            { label: 'L2 TVL', value: `$${ecosystemMetrics.l2TVL}B`, color: 'var(--violet)' },
            { label: 'Supply Growth', value: `${ecosystemMetrics.supplyGrowth}%`, color: 'var(--gold)' },
          ].map(kpi => (
            <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
          <div style={{ background: 'var(--surface)', padding: '16px 24px' }}>
            {[
              { label: 'Validators', value: `${(ecosystemMetrics.validatorCount / 1000).toFixed(0)}K`, color: 'var(--text)' },
              { label: 'Daily Active Addresses', value: `${(ecosystemMetrics.dailyActiveAddresses / 1000).toFixed(0)}K`, color: 'var(--text)' },
              { label: 'Avg Gas (Gwei)', value: `${ecosystemMetrics.avgGasFee}`, color: 'var(--text)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--surface)', padding: '16px 24px' }}>
            {[
              { label: 'Network Revenue (24h)', value: `$${ecosystemMetrics.networkRevenue24h}M`, color: 'var(--mint)' },
              { label: 'ETH Burned (24h)', value: `${ecosystemMetrics.burnRate24h}K ETH`, color: 'var(--coral)' },
              { label: 'Total ETH Staked', value: `${ecosystemMetrics.totalStaked}M`, color: 'var(--text)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '16px 24px', background: 'linear-gradient(135deg, color-mix(in srgb, var(--mint) 8%, var(--surface)), color-mix(in srgb, var(--violet) 8%, var(--surface)))', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Why This Matters for BMNR</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginTop: 4 }}>
            Higher network activity → More fees → More ETH burned → Deflationary pressure → ETH price appreciation → BMNR NAV growth
          </div>
        </div>
      </div>
      
      {/* ETF Flows */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#etf-flows</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Institutional Flows (ETH ETFs)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)' }}>
          <div style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: 'var(--mint)' }}>${etfData.totalAUM}B</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>Total ETF AUM</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: etfData.netFlows7d >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
              {etfData.netFlows7d >= 0 ? '+' : ''}${etfData.netFlows7d}M
            </div>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>7-Day Net Flows</div>
          </div>
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Fund', 'AUM', 'Change'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Fund' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {etfData.topHolders.map((etf, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', padding: '12px 24px', borderBottom: i < etfData.topHolders.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{etf.name}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${etf.aum}B</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: etf.change >= 0 ? 'var(--mint)' : 'var(--coral)', textAlign: 'right' }}>
                {etf.change >= 0 ? '+' : ''}{etf.change}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Future of Finance Thesis */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#fut-header</div>
      <div style={{ padding: '32px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Thesis Framework</div>
        <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Is Ethereum the Future of Finance<span style={{ color: 'var(--violet)' }}>?</span></h3>
      </div>

      {/* Institutional Adoption Evidence */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#institutional-adoption</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Institutional Adoption Evidence</span>
        </div>
        <div style={{ padding: 16, background: 'linear-gradient(135deg, color-mix(in srgb, var(--violet) 10%, transparent), color-mix(in srgb, var(--mint) 10%, transparent))', borderRadius: 8 }}>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#value-accrual-mechanics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Value Accrual Mechanics</span>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>How institutional adoption translates to ETH value — a framework for analyzing network economics</div>
        </div>

        {/* Step 1: Settlement Layer Capture */}
        <div style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>1. Settlement Layer Market Capture</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Tokenized assets require blockchain settlement infrastructure</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'color-mix(in srgb, var(--violet) 20%, transparent)', color: 'var(--violet)', borderRadius: 4 }}>TAM Analysis</span>
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
          <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
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
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'color-mix(in srgb, var(--mint) 20%, transparent)', color: 'var(--mint)', borderRadius: 4 }}>Monetary Policy</span>
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
          <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
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
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'color-mix(in srgb, var(--sky) 20%, transparent)', color: 'var(--sky)', borderRadius: 4 }}>Yield Analysis</span>
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
          <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
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
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'color-mix(in srgb, var(--gold) 20%, transparent)', color: 'var(--gold)', borderRadius: 4 }}>Moat Analysis</span>
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
          <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
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
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'color-mix(in srgb, var(--coral) 20%, transparent)', color: 'var(--coral)', borderRadius: 4 }}>BMNR Thesis</span>
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
          <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 6, fontSize: 11, fontFamily: 'Space Mono' }}>
            <span style={{ color: 'var(--text3)' }}>BMNR Return = </span>
            <span style={{ color: 'var(--mint)' }}>(ETH Δ × Holdings)</span>
            <span style={{ color: 'var(--text3)' }}> + </span>
            <span style={{ color: 'var(--sky)' }}>(Staking Yield × Staked %)</span>
            <span style={{ color: 'var(--text3)' }}> + </span>
            <span style={{ color: 'var(--violet)' }}>NAV Premium Expansion</span>
          </div>
        </div>

        {/* Bottom line */}
        <div style={{ padding: 12, background: 'linear-gradient(135deg, color-mix(in srgb, var(--mint) 15%, transparent), color-mix(in srgb, var(--violet) 15%, transparent))', borderRadius: 8, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--mint)', fontWeight: 600 }}>The Investment Case</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
            When the world's largest asset managers, payment networks, and banks all choose the same settlement layer, that's not speculation — that's infrastructure becoming standard. BMNR's thesis is that owning the asset that secures this infrastructure (ETH) is the trade of the decade.
          </div>
        </div>
      </div>

      {/* Protocol Roadmap */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#protocol-roadmap</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Ethereum Protocol Roadmap</span>
        </div>
        <div style={{ padding: 0 }}>
          {protocolRoadmap.map((item, i) => (
            <div key={i} style={{ padding: '16px 24px', borderBottom: i < protocolRoadmap.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', borderLeft: `3px solid ${item.impact === 'Very High' ? 'var(--violet)' : item.impact === 'High' ? 'var(--mint)' : 'var(--sky)'}`, transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{item.name}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 10, letterSpacing: '0.3px', background: item.status === 'Complete' ? 'color-mix(in srgb, var(--mint) 15%, transparent)' : item.status === 'Development' ? 'color-mix(in srgb, var(--sky) 15%, transparent)' : 'color-mix(in srgb, var(--violet) 15%, transparent)', color: item.status === 'Complete' ? 'var(--mint)' : item.status === 'Development' ? 'var(--sky)' : 'var(--violet)' }}>{item.status}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--border) 60%, transparent)', color: 'var(--text3)' }}>{item.date}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5, marginTop: 4 }}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ethereum Adoption Timeline - matches Timeline tab structure */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#adoption-timeline</div>
      <div style={{ padding: '32px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Ecosystem Intelligence</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Adoption Timeline<span style={{ color: 'var(--mint)' }}>.</span></h3>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text3)' }}>{filteredNews.length} events</span>
        </div>
      </div>

      {/* Company Filter */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#company-filter</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px', marginTop: 8 }}>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}>Track news about the <strong>ETH ecosystem</strong> — institutional adoption, stablecoin launches, L2 growth, protocol upgrades, and enterprise partnerships building on Ethereum</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '0 0 16px' }}>Asset-level news affecting ETH value and BMNR's NAV</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>Filter by Company</span>
          {companyFilter !== 'All' && (
            <button
              onClick={() => setCompanyFilter('All')}
              style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, background: 'color-mix(in srgb, var(--coral) 15%, transparent)', color: 'var(--coral)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              aria-label="Clear company filter"
            >
              Clear
            </button>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {companies.map(comp => {
            const isSelected = companyFilter === comp;
            const count = adoptionTimeline.filter(n => n.company === comp).length;
            return (
              <button
                key={comp}
                onClick={() => setCompanyFilter(comp)}
                style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isSelected ? 'var(--violet)' : 'var(--border)', background: isSelected ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'transparent', color: isSelected ? 'var(--violet)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
                aria-label={`Filter by ${comp}`}
              >
                {comp} ({comp === 'All' ? adoptionTimeline.length : count})
              </button>
            );
          })}
        </div>
        {companyFilter !== 'All' && (
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, fontFamily: 'Space Mono, monospace' }}>
            {companyFilter} → {filteredNews.length} results
          </div>
        )}
      </div>

      {/* Category pills row with Expand All button */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#category-filter</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {categories.map(cat => {
            const isActive = timelineFilter === cat;
            return (
              <button key={cat} onClick={() => setTimelineFilter(cat)} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid', borderColor: isActive ? 'var(--sky)' : 'var(--border)', background: isActive ? 'color-mix(in srgb, var(--sky) 15%, transparent)' : 'transparent', color: isActive ? 'var(--sky)' : 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }} aria-label={`Filter by category: ${cat}`}>
                {cat === 'All' ? `All (${adoptionTimeline.length})` : `${cat} (${adoptionTimeline.filter(n => n.category === cat).length})`}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (expandedNews.size === filteredNews.length) {
              setExpandedNews(new Set());
            } else {
              setExpandedNews(new Set(filteredNews.map((_, i) => i)));
            }
          }}
          style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer', transition: 'all 0.2s' }}
          aria-label={expandedNews.size === filteredNews.length ? 'Collapse all news events' : 'Expand all news events'}
        >
          {expandedNews.size === filteredNews.length ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#adoption-events</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          {filteredNews.map((news, i) => {
            const isExpanded = expandedNews.has(i);
            const accentColor = news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--coral)' : 'var(--sky)';
            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`${news.title} — ${news.impact} — click to ${isExpanded ? 'collapse' : 'expand'}`}
                style={{ padding: '16px 24px', cursor: 'pointer', borderLeft: `3px solid ${accentColor}`, borderBottom: i < filteredNews.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                onClick={() => {
                  const next = new Set(expandedNews);
                  if (isExpanded) next.delete(i);
                  else next.add(i);
                  setExpandedNews(next);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const next = new Set(expandedNews);
                    if (isExpanded) next.delete(i);
                    else next.add(i);
                    setExpandedNews(next);
                  }
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>{news.date}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--violet) 12%, transparent)', color: 'var(--violet)' }}>{news.category}</span>
                      <span style={{ padding: '1px 8px', borderRadius: 99, fontSize: 10, background: 'color-mix(in srgb, var(--sky) 12%, transparent)', color: 'var(--sky)' }}>{news.company}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13, lineHeight: 1.4 }}>{news.title}</div>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: accentColor, marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {news.impact === 'Bullish' ? '+' : news.impact === 'Bearish' ? '-' : '~'} {news.impact}
                  </span>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 16, marginTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{news.summary}</div>

                    {news.significance && (
                      <div style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--violet) 5%, var(--surface))', borderRadius: 12, borderLeft: '3px solid var(--violet)', marginTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--violet)', marginBottom: 4 }}>Significance for Ethereum</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.significance}</div>
                      </div>
                    )}

                    {news.bmnrImplication && (
                      <div style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 5%, var(--surface))', borderRadius: 12, borderLeft: '3px solid var(--mint)', marginTop: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 4 }}>BMNR Implication</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.bmnrImplication}</div>
                      </div>
                    )}

                    <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Space Mono, monospace', marginTop: 8 }}>Source: {news.source}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#ethereum-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Protocol Intelligence</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Ethereum<span style={{ color: 'var(--violet)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>BMNR-ETH correlation metrics, protocol roadmap, institutional adoption events, and ecosystem fundamentals driving the treasury thesis.</p>
      </div>
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
  const [showAllPR, setShowAllPR] = useState(false);

  const pressReleases = [
    { date: 'Feb 11, 2026', category: 'Conference', color: 'var(--violet)', title: 'Tom Lee Presents at CoinDesk Consensus 2026 (Hong Kong)' },
    { date: 'Feb 10, 2026', category: 'Strategic', color: 'var(--sky)', title: 'Beast Industries Acquires Step Banking App (7M+ Users, ~$500M Raised)' },
    { date: 'Feb 9, 2026', category: 'Holdings', color: '#4ade80', title: 'ETH Holdings Reach 4,325,738 — 3.58% of Supply, $10.0B, ETH -62% V-Recovery' },
    { date: 'Feb 9, 2026', category: 'SEC Filing', color: 'var(--cyan)', title: 'S-8: 2025 Omnibus Incentive Plan Registration' },
    { date: 'Feb 2, 2026', category: 'Holdings', color: '#4ade80', title: 'ETH Holdings Reach 4,285,125 — 3.55% of Supply, $10.7B, Staking 67.6%' },
    { date: 'Jan 28, 2026', category: 'Corporate', color: 'var(--gold)', title: 'Nelson Separation: President Terminated Without Cause ($605K Severance)' },
    { date: 'Jan 26, 2026', category: 'Holdings', color: '#4ade80', title: 'ETH Holdings Reach 4,243,338 — 3.52% of Supply, $12.8B, Davos 2026' },
    { date: 'Jan 20, 2026', category: 'Holdings', color: '#4ade80', title: 'ETH Holdings Reach 4,203,036 — 3.48% of Supply, $14.5B, 81% YES Vote' },
    { date: 'Jan 12, 2026', category: 'Holdings', color: '#4ade80', title: 'ETH Holdings Reach 4,167,768 — 3.45% of Total Supply, $14.0B' },
    { date: 'Jan 9, 2026', category: 'Leadership', color: 'var(--mint)', title: 'CFO/COO Appointed: Young Kim (MIT/HBS, Columbia Threadneedle)' },
    { date: 'Jan 2, 2026', category: 'Proxy', color: 'var(--gold)', title: "Chairman's Message: Vote YES on Auth Shares (500M→50B)" },
    { date: 'Dec 29, 2025', category: 'Holdings', color: '#4ade80', title: 'ETH Holdings Reach 4,110,525 — 3.41% of Total Supply' },
    { date: 'Nov 21, 2025', category: 'SEC Filing', color: 'var(--violet)', title: '10-K Annual Report: $805M Unrealized Gain, $349M Net Income' },
  ];
  const displayedPR = showAllPR ? pressReleases : pressReleases.slice(0, 5);
  const hiddenPRCount = pressReleases.length - 5;

  const secFilings = BMNR_SEC_FILINGS;
  const secMeta = BMNR_SEC_META;
  const secTypeColors = BMNR_SEC_TYPE_COLORS;
  const secFilterTypes = BMNR_SEC_FILTER_TYPES;
  
  const filteredFilings = secFilings.filter(f => {
    if (secFilter === 'All') return true;
    if (secFilter === 'S-1/S-3') return f.type === 'S-1' || f.type === 'S-3' || f.type === 'S-3ASR' || f.type === 'S-8';
    if (secFilter === '424B') return f.type === '424B4' || f.type === '424B5';
    if (secFilter === 'Form 4') return f.type === 'Form 3' || f.type === 'Form 4' || f.type === 'Form 5';
    if (secFilter === 'Proxy') return f.type === 'DEF 14A' || f.type === 'DEFA14A' || f.type === 'DEFR14A' || f.type === 'PRE 14A' || f.type === 'DEF 14C' || f.type === 'PRE 14C';
    if (secFilter === 'SC 13D/G') return f.type === 'SC 13D' || f.type === 'SC 13G/A';
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
  const timelineEvents = BMNR_TIMELINE_EVENTS;

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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#timeline-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Corporate Events<UpdateIndicators sources="PR" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Timeline<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>SEC filings, weekly holdings updates, corporate events, and key milestones. Chronological record tracking BMNR's evolution from mining company to ETH treasury.</p>
      </div>

      {/* Section Divider: SEC Filings */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>SEC Filings</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Latest SEC Filings - Enhanced with filtering and pagination */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#sec-filings</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>SEC Filings<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        
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
          <div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr 80px 60px', borderBottom: '1px solid var(--border)' }}>
              {['Date', 'Type', 'Description', 'Period', 'Link'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: idx === 4 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {displayedFilings.map((filing, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr 80px 60px', borderBottom: idx < displayedFilings.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>{filing.date}</span>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>
                  <span style={{
                    background: secTypeColors[filing.type]?.bg || 'rgba(100,100,100,0.2)',
                    color: secTypeColors[filing.type]?.text || 'var(--text2)',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 600
                  }}>
                    {filing.type}
                  </span>
                </span>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>{filing.description}</span>
                <span style={{ padding: '12px 16px', fontSize: 13 }}>{filing.period}</span>
                <span style={{ padding: '12px 16px', fontSize: 13, textAlign: 'right' }}>
                  <a
                    href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${secMeta.cik}&type=${filing.type.replace('S-3', 'S-3').replace('S-1', 'S-1').replace('S-8', 'S-8')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--violet)' }}
                  >
                    SEC →
                  </a>
                </span>
              </div>
            ))}
          </div>
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
      </div>

      {/* Section Divider: Events & Press Releases */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Events & Press Releases</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Upcoming Events + Recent Press Releases */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#upcoming-events</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Upcoming Events<UpdateIndicators sources="PR" /></span>
            </div>
            <div style={{ padding: '24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(74,222,128,0.1)', borderRadius: 12, border: '1px solid rgba(74,222,128,0.4)' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>✓ Annual Stockholder Meeting</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Wynn Las Vegas · Prop 2 passed</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: '#4ade80' }}>Jan 15, 2026</div>
                <div style={{ fontSize: 11, color: '#4ade80' }}>Completed</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Q1 2026 Earnings</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>10-Q Quarterly Report</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--violet)' }}>~Jan 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est.</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Dividend Ex-Date</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>$0.01/share quarterly</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: '#4ade80' }}>Q1 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>First payout</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>5% ETH Supply Target</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Currently at 3.58% (~6.04M ETH needed)</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--gold)' }}>72%</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>~1.71M ETH to go</div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#recent-press-releases</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            {/* [PR_CHECKLIST_RECENT_PRESS_RELEASES] - Add new PR at top! */}
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Recent Press Releases<UpdateIndicators sources="PR" /></span>
            </div>
            <div style={{ padding: '24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {displayedPR.map((pr, i) => (
              <div key={i} style={{ padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{pr.date}</span>
                  <span style={{ fontSize: 11, color: pr.color }}>{pr.category}</span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>{pr.title}</div>
              </div>
            ))}
          </div>
          {hiddenPRCount > 0 && (
            <div style={{ textAlign: 'center', paddingTop: 16 }}>
              <button
                onClick={() => setShowAllPR(!showAllPR)}
                style={{ padding: '8px 24px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)'; }}
              >
                {showAllPR ? '▲ Show Less' : `▼ Show ${hiddenPRCount} More`}
              </button>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider: Event Timeline */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Event Timeline</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#event-timeline</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Event Timeline</span>
        <UpdateIndicators sources="PR" />
        <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text3)' }}>({filteredEntries.length} events)</span>
      </h3>

      {/* Topic Filters (AND logic multi-select) */}
      <div style={{ padding: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Filter by Topic</span>
          {selectedTopics.length > 0 && (
            <button
              onClick={() => setSelectedTopics([])}
              style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer' }}
            >
              Clear ({selectedTopics.length})
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {Object.entries(topicTags).map(([topic, topicStyle]) => {
            const isSelected = selectedTopics.includes(topic);
            const count = timelineEvents.filter(p => detectTopics(p).includes(topic)).length;
            return (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                style={{
                  fontSize: 11,
                  padding: '4px 12px',
                  borderRadius: 99,
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                  background: isSelected ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                  color: isSelected ? 'var(--accent)' : 'var(--text3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {topicStyle.label} ({count})
              </button>
            );
          })}
        </div>
        {selectedTopics.length > 0 && (
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
            {selectedTopics.map(t => topicTags[t].label).join(' + ')} → {filteredEntries.length} results
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)} style={{
              fontSize: 11,
              padding: '4px 12px',
              borderRadius: 99,
              border: '1px solid',
              borderColor: filterCategory === cat ? 'var(--accent)' : 'var(--border)',
              background: filterCategory === cat ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
              color: filterCategory === cat ? 'var(--accent)' : 'var(--text3)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {cat === 'all' ? `All (${timelineEvents.length})` : `${cat} (${timelineEvents.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (expanded.size === filteredEntries.length) {
              setExpanded(new Set());
            } else {
              setExpanded(new Set(filteredEntries.map((_, i) => i)));
            }
          }}
          style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text3)', cursor: 'pointer' }}
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

          return (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
              <div onClick={toggleExpand} style={{ display: 'grid', gridTemplateColumns: '100px 90px 1fr 80px 30px', alignItems: 'center', padding: '12px 16px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text3)' }}>{entry.date}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{entry.category}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{entry.title}</span>
                <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'right', color: entry.impact === 'positive' ? 'var(--mint)' : entry.impact === 'negative' ? 'var(--coral)' : 'var(--text3)' }}>
                  {entry.impact === 'positive' && '↑ '}
                  {entry.impact === 'negative' && '↓ '}
                  {entry.impact === 'neutral' && '→ '}
                  {entry.impact}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {isExpanded && (
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 24 }}>
                    <div>
                      {/* Changes Grid */}
                      <div>
                        {/* Header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 120px', borderBottom: '1px solid var(--border)' }}>
                          {['Metric', 'Previous', 'New', 'Change'].map((h, idx) => (
                            <span key={h} style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: idx > 0 ? 'right' : 'left' }}>{h}</span>
                          ))}
                        </div>
                        {/* Rows */}
                        {entry.changes.map((c, cidx) => (
                          <div key={cidx} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 120px', borderBottom: cidx < entry.changes.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                            <span style={{ padding: '8px 12px', fontSize: 12 }}>{c.metric}</span>
                            <span style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{c.previous}</span>
                            <span style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{c.new}</span>
                            <span style={{ padding: '8px 12px', fontSize: 11, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: c.change.startsWith('+') ? 'var(--mint)' : c.change.startsWith('-') ? 'var(--coral)' : undefined }}>{c.change}</span>
                          </div>
                        ))}
                      </div>
                      {/* Notes */}
                      <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12, fontStyle: 'italic', color: 'var(--text3)', marginTop: 12, fontSize: 12, lineHeight: 1.6 }}>
                        {entry.notes}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impact</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: entry.impact === 'positive' ? 'var(--mint)' : entry.impact === 'negative' ? 'var(--coral)' : 'var(--text3)' }}>
                          {entry.impact === 'positive' && '● Bullish'}
                          {entry.impact === 'negative' && '● Bearish'}
                          {entry.impact === 'neutral' && '● Neutral'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Source</div>
                        <div style={{ fontSize: 13, color: 'var(--violet)' }}>{entry.source}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* How to Use - Unified styling */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#timeline-header</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>How to Use This Log</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 13 }}>
          <div>
            <h4 style={{ color: 'var(--violet)', fontWeight: 500, marginBottom: 8 }}>Categories Explained</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text2)', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><span style={{ color: '#60a5fa' }}>Holdings:</span> ETH accumulation updates, supply %</li>
              <li><span style={{ color: 'var(--cyan)' }}>SEC Filing:</span> 10-K, 10-Q, 8-K filings</li>
              <li><span style={{ color: '#34d399' }}>Capital:</span> Offerings, ATM, debt financing</li>
              <li><span style={{ color: 'var(--text2)' }}>Corporate:</span> Strategy, management, governance</li>
              <li><span style={{ color: '#4ade80' }}>Product:</span> Staking, yield, infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--violet)', fontWeight: 500, marginBottom: 8 }}>Updating This Log</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--text2)', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>• Add new entries chronologically at the top</li>
              <li>• Include sources for traceability</li>
              <li>• Track changes with before/after values</li>
              <li>• Tag impact: positive/negative/neutral</li>
            </ul>
          </div>
        </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — SEC Filings" items={[
        { term: '10-K / 10-Q', def: 'Annual (10-K) and quarterly (10-Q) reports. BMNR fiscal year ends August 31. 10-K is audited; 10-Q is unaudited.' },
        { term: '8-K', def: 'Current report for material events. BMNR files weekly 8-Ks for ETH holdings updates — unusually frequent for transparency.' },
        { term: 'S-3 Shelf Registration', def: 'Pre-registers securities for future sale. BMNR has $24.5B shelf active — provides flexibility to raise capital quickly via ATM programs.' },
        { term: 'DEFA14A', def: 'Additional proxy solicitation material. Used by BMNR to communicate shareholder vote proposals (e.g., share authorization increase to 50B).' },
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
  const ANALYST_COVERAGE = BMNR_ANALYST_COVERAGE;

  return (
    <>
      <SharedWallStreetTab coverage={ANALYST_COVERAGE} ticker="BMNR" />
      {/* CFA Notes */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
