/* eslint-disable @typescript-eslint/no-explicit-any */
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

import React, { useState, useMemo, useRef, useEffect, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { getStockModelCSS } from './stock-model-styles';
import { SharedWallStreetTab, AnalystCoverage, useLiveStockPrice } from '../shared';
import SharedSourcesTab from '../shared/SharedSourcesTab';
import { SharedAIAgentsTab } from '../shared/SharedAIAgentsTab';
import type { SourceGroup, Competitor } from '../shared/SharedSourcesTab';
import SharedEdgarTab from '../shared/SharedEdgarTab';
import { COMPS_TIMELINE } from '@/data/asts/comps-timeline';
import type { CompsTimelineEntry, ASTSImplication } from '@/data/asts/comps-timeline';
import { ASTS_SEC_FILINGS, ASTS_SEC_META, ASTS_SEC_TYPE_COLORS, ASTS_SEC_FILTER_TYPES } from '@/data/asts/sec-filings';
import { ASTS_QUARTERLY_DATA } from '@/data/asts/quarterly-metrics';
import { ASTS_ANALYST_COVERAGE } from '@/data/asts/analyst-coverage';
import { ASTS_TIMELINE_EVENTS } from '@/data/asts/timeline-events';
import StockChart from '../shared/StockChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart, ComposedChart, Cell, PieChart, Pie, Legend, ReferenceLine } from 'recharts';

// Data imports - All hardcoded data extracted to separate files for easy AI updates
import {
  DEFAULTS,
  PARTNERS,
  PARTNER_NEWS,
  COMPETITOR_NEWS,
  REVENUE_SOURCES,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
  SHARE_CLASSES,
  TOTAL_BASIC_SHARES,
  TOTAL_VOTING_SHARES,
  FULLY_DILUTED_SHARES,
  MAJOR_SHAREHOLDERS,
  EQUITY_OFFERINGS,
  DILUTION_HISTORY,
  SBC_HISTORY,
  CONVERTIBLE_NOTES,
  CASH_RUNWAY_SCENARIOS,
  LIQUIDITY_POSITION,
  DILUTION_SCENARIOS,
  DATA_FRESHNESS,
} from '@/data/asts';

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
// 4. MODEL LAST UPDATED: February 12, 2026
//    - Timeline: 128+ entries (2019-2026)
//    - Latest PR processed: $1B Converts + RDs, Feb 11, 2026
//    - Latest filing processed: 8-K Feb 11, 2026 (FY 2025 preliminary)
//    - Debt update: $2,264M (8-K); pro forma ~$2,968M post-Feb 2026 raises
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
// ANALYST COVERAGE INTERFACES
// ============================================================================

/** Individual analyst report/update entry */
// AnalystCoverage type imported from '../shared' (wallStreetTypes.ts)

// ============================================================================
// COMPETITOR NEWS TRACKING INTERFACES
// ============================================================================

// Competitor types re-exported from data file
type CompetitorId = CompsTimelineEntry['competitor'];
type CompetitorNewsCategory = CompsTimelineEntry['category'];
type CompetitorNewsEntry = CompsTimelineEntry;

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
    satellites?: number | string;
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

/** Addressable subscriber base across MNO partners (3.2 billion) */
const ADDRESSABLE_SUBSCRIBERS_BILLIONS = 3.2;

/** Addressable subscribers in millions (for state/calculations) */
const PARTNER_REACH_MILLIONS = 3200;

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

// CSS is now imported from shared styles (Golden Standard: ASTS)
// To modify styles, edit: ./stock-model-styles.ts
const css = getStockModelCSS('cyan');

/* See stock-model-styles.ts for all CSS */

// ============================================================================
// UNIFIED UI COMPONENT LIBRARY - Consistent Design System
// Primary Accent: Cyan (#22D3EE) for ASTS SpaceMobile theme
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

const ASTSAnalysis = () => {
  // === DATA FRESHNESS: Last updated Dec 30, 2025 ===
  // Update stock prices regularly - stale data affects all calculations
  const [currentShares, setCurrentShares] = useState(DEFAULTS.currentShares);  // From @/data/asts/company.ts
  const [currentStockPrice, setCurrentStockPrice] = useState(DEFAULTS.currentStockPrice);  // From @/data/asts/company.ts
  const [cashOnHand, setCashOnHand] = useState(DEFAULTS.cashOnHand);  // From @/data/asts/company.ts
  const [quarterlyBurn, setQuarterlyBurn] = useState(DEFAULTS.quarterlyBurn);  // From @/data/asts/company.ts
  const [totalDebt, setTotalDebt] = useState(DEFAULTS.totalDebt);  // From @/data/asts/company.ts
  const [debtRate, setDebtRate] = useState(4.25);  // Q3 10-Q: Converts at 4.25%
  const [block1Sats, setBlock1Sats] = useState(6);  // BW3 + BB1-5 (Block 1)
  const [block2Sats, setBlock2Sats] = useState(1);  // BB6 launched Dec 23, 2025 (first Block 2)
  const [targetSats2026, setTargetSats2026] = useState(60);  // Per PRs: 45-60 range, using upper end
  const [launchFailureRate, setLaunchFailureRate] = useState(7);
  const [partnerReach, setPartnerReach] = useState(PARTNER_REACH_MILLIONS);  // 3.2B subs across 53+ MNOs
  const [penetrationRate, setPenetrationRate] = useState(3);
  const [blendedARPU, setBlendedARPU] = useState(18);
  const [revenueShare, setRevenueShare] = useState(50);
  const [govRevenue, setGovRevenue] = useState(100);
  const [contractedRevenue] = useState(1000);  // $1B+ contracted commercial revenue per Q3 earnings
  const [regulatoryRisk, setRegulatoryRisk] = useState(5);
  const [techRisk, setTechRisk] = useState(8);
  const [competitionRisk, setCompetitionRisk] = useState(10);

  // DCF Model Assumptions - NEW
  const [deploymentDelay, setDeploymentDelay] = useState(0); // Years behind/ahead of plan (-2 to +2)
  const [terminalMargin, setTerminalMargin] = useState(55); // Terminal EBITDA margin %
  const [terminalCapex, setTerminalCapex] = useState(10); // Terminal CapEx as % of revenue
  const [dilutionRate, setDilutionRate] = useState(5); // Annual dilution % from warrants/SBC
  const [competitionDiscount, setCompetitionDiscount] = useState(20); // % reduction for Starlink/T-Mobile
  const [discountRate, setDiscountRate] = useState(15); // WACC / hurdle rate
  const [terminalGrowth, setTerminalGrowth] = useState(3); // Perpetuity growth rate
  const [selectedScenario, setSelectedScenario] = useState<'bull' | 'base' | 'bear' | 'custom'>('base');

  const [activeTab, setActiveTab] = useState('overview');
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);

  // Update indicator visibility toggle
  const [showIndicators, setShowIndicators] = useState(true);

  // Chart refresh key - increment to trigger chart data refresh
  const [chartRefreshKey, setChartRefreshKey] = useState(0);

  // ASTS D2D competitors for live feeds
  const astsCompetitors: Competitor[] = [
    // D2D Competitors
    { name: 'SpaceX / Starlink Direct to Cell', url: 'https://direct.starlink.com' },
    { name: 'Amazon / Project Kuiper', url: 'https://www.aboutamazon.com/news/amazon-leo' },
    { name: 'Iridium Communications', url: 'https://www.iridium.com' },
    { name: 'Skylo Technologies', url: 'https://www.skylo.tech' },
    { name: 'Lynk Global', url: 'https://lynk.world' },
    { name: 'Viasat', url: 'https://www.viasat.com' },
    { name: 'EchoStar / Hughes', url: 'https://www.echostar.com' },
    { name: 'SES', url: 'https://www.ses.com' },
    { name: 'OQ Technology', url: 'https://www.oqtec.space' },
    { name: 'Terrestar Solutions', url: 'https://terrestarsolutions.ca' },
    { name: 'Space42 / Bayanat', url: 'https://space42.ai' },
    // Definitive Commercial Partners
    { name: 'AT&T', url: 'https://about.att.com/newsroom' },
    { name: 'Verizon', url: 'https://www.verizon.com/about/news' },
    { name: 'Vodafone Group', url: 'https://www.vodafone.com/news' },
    { name: 'stc Group', url: 'https://www.stc.com.sa/content/stc/sa/en/media-center.html' },
    // Other Key Partners (MOUs & Agreements)
    { name: 'Vodafone Idea', url: 'https://www.myvi.in/about-us/media-centre' },
    { name: 'Rakuten Mobile', url: 'https://corp.mobile.rakuten.co.jp/english/news' },
    { name: 'Bell Canada', url: 'https://www.bce.ca/news-and-media' },
    { name: 'Orange', url: 'https://www.orange.com/en/newsroom' },
    { name: 'Telefonica', url: 'https://www.telefonica.com/en/communication-room' },
    { name: 'TIM (Telecom Italia)', url: 'https://www.gruppotim.it/en/press.html' },
    { name: 'MTN Group', url: 'https://www.mtn.com/newsroom' },
    { name: 'Telstra', url: 'https://www.telstra.com.au/exchange/news' },
  ];

  // ASTS research sources for SharedSourcesTab
  const astsResearchSources: SourceGroup[] = [
    { category: 'Company / IR', sources: [
      { name: 'AST SpaceMobile Investor Relations', url: 'https://investors.ast-science.com' },
      { name: 'SEC EDGAR (ASTS Filings)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=ast+spacemobile&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany' },
    ]},
    { category: 'Competitors / D2D Players', sources: [
      { name: 'SpaceX / Starlink Direct to Cell', url: 'https://direct.starlink.com' },
      { name: 'Amazon / Project Kuiper', url: 'https://www.aboutamazon.com/news/amazon-leo' },
      { name: 'Iridium Communications', url: 'https://www.iridium.com' },
      { name: 'Skylo Technologies', url: 'https://www.skylo.tech' },
      { name: 'Lynk Global', url: 'https://lynk.world' },
      { name: 'Viasat', url: 'https://www.viasat.com' },
      { name: 'EchoStar / Hughes', url: 'https://www.echostar.com' },
      { name: 'SES', url: 'https://www.ses.com' },
      { name: 'OQ Technology', url: 'https://www.oqtec.space' },
      { name: 'Terrestar Solutions', url: 'https://terrestarsolutions.ca' },
      { name: 'Space42 / Bayanat', url: 'https://space42.ai' },
    ]},
    { category: 'Definitive Commercial Partners', sources: [
      { name: 'AT&T Newsroom', url: 'https://about.att.com/newsroom' },
      { name: 'Verizon News', url: 'https://www.verizon.com/about/news' },
      { name: 'Vodafone Group News', url: 'https://www.vodafone.com/news' },
      { name: 'stc Group Media', url: 'https://www.stc.com.sa/content/stc/sa/en/media-center.html' },
    ]},
    { category: 'Other Key Partners (MOUs)', sources: [
      { name: 'Vodafone Idea', url: 'https://www.myvi.in/about-us/media-centre' },
      { name: 'Rakuten Mobile', url: 'https://corp.mobile.rakuten.co.jp/english/news' },
      { name: 'Bell Canada', url: 'https://www.bce.ca/news-and-media' },
      { name: 'Orange Newsroom', url: 'https://www.orange.com/en/newsroom' },
      { name: 'Telefonica', url: 'https://www.telefonica.com/en/communication-room' },
      { name: 'TIM (Telecom Italia)', url: 'https://www.gruppotim.it/en/press.html' },
      { name: 'MTN Group', url: 'https://www.mtn.com/newsroom' },
      { name: 'Telstra Exchange', url: 'https://www.telstra.com.au/exchange/news' },
    ]},
    { category: 'Satellite / Telecom Industry', sources: [
      { name: 'SpaceNews', url: 'https://spacenews.com' },
      { name: 'Via Satellite', url: 'https://www.viasatellite.com' },
      { name: 'SatellitePro ME', url: 'https://www.satelliteprome.com' },
      { name: 'SatNews', url: 'https://www.satnews.com' },
      { name: 'Advanced Television', url: 'https://advanced-television.com' },
      { name: 'New Electronics', url: 'https://www.newelectronics.co.uk' },
      { name: 'Light Reading', url: 'https://www.lightreading.com' },
    ]},
    { category: 'Research / Market Data', sources: [
      { name: 'GSMA Intelligence', url: 'https://www.gsmaintelligence.com' },
      { name: 'Kaleido Intelligence', url: 'https://www.kaleidointelligence.com' },
      { name: 'MEF (Mobile Ecosystem Forum)', url: 'https://mobileecosystemforum.com' },
    ]},
    { category: 'Regulatory', sources: [
      { name: 'FCC (Federal Communications Commission)', url: 'https://www.fcc.gov' },
    ]},
    { category: 'Financial / Analyst', sources: [
      { name: 'TipRanks', url: 'https://www.tipranks.com' },
      { name: 'Seeking Alpha', url: 'https://seekingalpha.com' },
      { name: 'GuruFocus', url: 'https://www.gurufocus.com' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com' },
      { name: 'MarketBeat', url: 'https://www.marketbeat.com' },
      { name: 'Investing.com', url: 'https://www.investing.com' },
      { name: 'Benzinga', url: 'https://www.benzinga.com' },
      { name: 'Quiver Quant', url: 'https://www.quiverquant.com' },
    ]},
    { category: 'Press / News Wires', sources: [
      { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
      { name: 'Business Wire', url: 'https://www.businesswire.com' },
      { name: 'GlobeNewswire', url: 'https://www.globenewswire.com' },
    ]},
  ];

  // Live price refresh hook - gets price from chart's API response
  const { isLoading: priceLoading, lastUpdated: priceLastUpdated, refresh: refreshPrice } = useLiveStockPrice(
    'ASTS',
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

  // Use imported data from @/data/asts
  const partners = PARTNERS;
  const revenueSources = REVENUE_SOURCES;
  const upcomingCatalysts = UPCOMING_CATALYSTS;
  const completedMilestones = COMPLETED_MILESTONES;

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

  // Tab types: 'tracking' = actual company data, 'projection' = user model inputs
  // Order: Overview first, then stock-specific projections (Partners first like BMNR Ethereum), common projections, then tracking
  // group: optional grouping for nested display (stock-specific tabs)
  const tabs: { id: string; label: string; type: 'tracking' | 'projection'; group?: string }[] = [
    { id: 'overview', label: 'Overview', type: 'tracking' },
    // Stock-specific projections (grouped under "ASTS Analysis") - Partners FIRST like BMNR Ethereum
    { id: 'partners', label: 'Partners', type: 'projection', group: 'ASTS Analysis' },
    { id: 'catalysts', label: 'Catalysts', type: 'projection', group: 'ASTS Analysis' },
    { id: 'constellation', label: 'Constellation', type: 'projection', group: 'ASTS Analysis' },
    { id: 'subscribers', label: 'Subscribers', type: 'projection', group: 'ASTS Analysis' },
    { id: 'revenue', label: 'Revenue', type: 'projection', group: 'ASTS Analysis' },
    { id: 'dilution', label: 'Dilution', type: 'projection', group: 'ASTS Analysis' },
    { id: 'sources', label: 'Sources', type: 'tracking', group: 'ASTS Analysis' },
    { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'ASTS Analysis' },
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
    { id: 'ai-agents', label: 'AI Agents', type: 'tracking' },
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
                padding: '4px 12px', 
                fontSize: 11, 
                color: '#22d3ee',
              }}>
                <span>📅</span>
                <span>Data as of: {DATA_FRESHNESS.dataAsOf}</span>
                <span style={{ color: 'rgba(34,211,238,0.5)' }}>|</span>
                <span>{DATA_FRESHNESS.priceNote}</span>
              </div>
              <p className="desc">
                First space-based cellular broadband for standard smartphones. 
                53+ MNO partnerships reaching {(partnerReach / 1000).toFixed(1)}B subscribers globally.
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
              <div className="price-badge up">
                🛰️ {calc.totalSats}/{targetSats2026} Satellites
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
          <Stat label="Market Cap" value={`$${(calc.marketCap / 1000).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="Enterprise Value" value={`$${(calc.enterpriseValue / 1000).toFixed(1)}B`} updateSource="MARKET" />
          <Stat label="Constellation" value={`${calc.totalSats}/${targetSats2026}`} color="cyan" updateSource="PR" />
          <Stat label="Progress" value={`${calc.constellationProgress.toFixed(0)}%`} color="cyan" updateSource="PR" />
          <Stat label="Cash" value={`$${(cashOnHand / 1000).toFixed(1)}B`} color="mint" updateSource="SEC" />
          <Stat label="Runway" value={`${calc.cashRunwayQuarters.toFixed(1)}Q`} color="mint" updateSource="SEC" />
          <Stat label="Contracted Rev" value={`$${contractedRevenue}M+`} color="sky" updateSource="PR" />
        </div>

        {/* Navigation */}
        <nav className="nav">
          {/* Overview tab (before any grouped tabs) */}
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
            ASTS Analysis ↕
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

        {/* Reserved space for dropdown menus - always present to prevent layout shift */}
        <div className={`nav-dropdown-space ${analysisDropdownOpen ? 'open' : ''}`}>
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
          {activeTab === 'overview' && <OverviewTab calc={calc} currentShares={currentShares} setCurrentShares={setCurrentShares} currentStockPrice={currentStockPrice} setCurrentStockPrice={setCurrentStockPrice} cashOnHand={cashOnHand} setCashOnHand={setCashOnHand} quarterlyBurn={quarterlyBurn} setQuarterlyBurn={setQuarterlyBurn} totalDebt={totalDebt} setTotalDebt={setTotalDebt} block1Sats={block1Sats} block2Sats={block2Sats} targetSats2026={targetSats2026} contractedRevenue={contractedRevenue} partnerReach={partnerReach} penetrationRate={penetrationRate} chartRefreshKey={chartRefreshKey} />}
          {activeTab === 'catalysts' && <CatalystsTab upcomingCatalysts={upcomingCatalysts} completedMilestones={completedMilestones} />}
          {activeTab === 'constellation' && <ConstellationTab calc={calc} block1Sats={block1Sats} setBlock1Sats={setBlock1Sats} block2Sats={block2Sats} setBlock2Sats={setBlock2Sats} targetSats2026={targetSats2026} setTargetSats2026={setTargetSats2026} launchFailureRate={launchFailureRate} setLaunchFailureRate={setLaunchFailureRate} />}
          {activeTab === 'subscribers' && <SubscribersTab calc={calc} partnerReach={partnerReach} setPartnerReach={setPartnerReach} penetrationRate={penetrationRate} setPenetrationRate={setPenetrationRate} blendedARPU={blendedARPU} setBlendedARPU={setBlendedARPU} partners={partners} />}
          {activeTab === 'revenue' && <RevenueTab calc={calc} revenueShare={revenueShare} setRevenueShare={setRevenueShare} govRevenue={govRevenue} setGovRevenue={setGovRevenue} revenueSources={revenueSources} contractedRevenue={contractedRevenue} />}
          {activeTab === 'partners' && <PartnersTab partners={partners} revenueShare={revenueShare} blendedARPU={blendedARPU} penetrationRate={penetrationRate} />}
          {activeTab === 'dilution' && <ASTSDilutionTab calc={calc} cashOnHand={cashOnHand} setCashOnHand={setCashOnHand} quarterlyBurn={quarterlyBurn} setQuarterlyBurn={setQuarterlyBurn} totalDebt={totalDebt} setTotalDebt={setTotalDebt} debtRate={debtRate} setDebtRate={setDebtRate} currentShares={currentShares} currentStockPrice={currentStockPrice} />}
          {activeTab === 'capital' && <CapitalTab currentShares={currentShares} currentStockPrice={currentStockPrice} />}
          {activeTab === 'model' && <ModelTab
            partnerReach={partnerReach} setPartnerReach={setPartnerReach}
            penetrationRate={penetrationRate} setPenetrationRate={setPenetrationRate}
            blendedARPU={blendedARPU} setBlendedARPU={setBlendedARPU}
            revenueShare={revenueShare} setRevenueShare={setRevenueShare}
            deploymentDelay={deploymentDelay} setDeploymentDelay={setDeploymentDelay}
            terminalMargin={terminalMargin} setTerminalMargin={setTerminalMargin}
            terminalCapex={terminalCapex} setTerminalCapex={setTerminalCapex}
            dilutionRate={dilutionRate} setDilutionRate={setDilutionRate}
            competitionDiscount={competitionDiscount} setCompetitionDiscount={setCompetitionDiscount}
            discountRate={discountRate} setDiscountRate={setDiscountRate}
            terminalGrowth={terminalGrowth} setTerminalGrowth={setTerminalGrowth}
            regulatoryRisk={regulatoryRisk} setRegulatoryRisk={setRegulatoryRisk}
            techRisk={techRisk} setTechRisk={setTechRisk}
            competitionRisk={competitionRisk} setCompetitionRisk={setCompetitionRisk}
            selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario}
            currentShares={currentShares} currentStockPrice={currentStockPrice}
            cashOnHand={cashOnHand} totalDebt={totalDebt}
          />}
          {activeTab === 'monte-carlo' && <MonteCarloTab currentShares={currentShares} currentStockPrice={currentStockPrice} totalDebt={totalDebt} cashOnHand={cashOnHand} />}
          {activeTab === 'comps' && <CompsTab calc={calc} currentStockPrice={currentStockPrice} />}
          {activeTab === 'timeline' && <TimelineTab />}
          {activeTab === 'financials' && <FinancialsTab />}
          {activeTab === 'investment' && <InvestmentTab />}
          {activeTab === 'wall-street' && <WallStreetTab />}
          {activeTab === 'ai-agents' && <SharedAIAgentsTab ticker="ASTS" />}
          {activeTab === 'sources' && (
            <SharedSourcesTab ticker="ASTS" companyName="AST SpaceMobile" researchSources={astsResearchSources} competitorLabel="Competitors & Partners" competitors={astsCompetitors} />
          )}
          {activeTab === 'edgar' && (
            <SharedEdgarTab ticker="ASTS" companyName="AST SpaceMobile" localFilings={ASTS_SEC_FILINGS} cik={ASTS_SEC_META.cik} typeColors={ASTS_SEC_TYPE_COLORS} />
          )}
        </main>
      </div>
    </UpdateIndicatorContext.Provider>
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 24px', marginBottom: 12 }}>
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

const OverviewTab = ({ calc, currentShares, setCurrentShares, currentStockPrice, setCurrentStockPrice, cashOnHand, setCashOnHand, quarterlyBurn, setQuarterlyBurn, totalDebt, setTotalDebt, block1Sats, block2Sats, targetSats2026, contractedRevenue, partnerReach, penetrationRate, chartRefreshKey }) => {
  const [chartType, setChartType] = useState('constellation');

  // Chart data - HISTORICAL ONLY
  // BW3 launched Sep'22, BB1-5 launched Sep'24, BB6 launched Dec'25
  const constellationData = [
    { label: 'Q3\'22', value: 1, display: '1' },
    { label: 'Q3\'24', value: 6, display: '6' },
    { label: 'Q4\'24', value: 6, display: '6' },
    { label: 'Q1\'25', value: 6, display: '6' },
    { label: 'Q2\'25', value: 6, display: '6' },
    { label: 'Q4\'25', value: block1Sats + block2Sats, display: `${block1Sats + block2Sats}` },
  ];

  // Cash data from 10-Q/10-K filings (cashAndEquiv)
  const cashData = [
    { label: 'Q1\'24', value: 212, display: '$212M' },
    { label: 'Q2\'24', value: 288, display: '$288M' },
    { label: 'Q3\'24', value: 519, display: '$519M' },
    { label: 'Q4\'24', value: 568, display: '$568M' },
    { label: 'Q1\'25', value: 875, display: '$875M' },
    { label: 'Q2\'25', value: 939, display: '$939M' },
    { label: 'Q3\'25', value: 1220, display: '$1.2B' },
  ];

  const marketCapData = [
    { label: 'Q1\'24', value: 2.1, display: '$2.1B' },
    { label: 'Q2\'24', value: 3.5, display: '$3.5B' },
    { label: 'Q3\'24', value: 7.2, display: '$7.2B' },
    { label: 'Q4\'24', value: 8.8, display: '$8.8B' },
    { label: 'Q1\'25', value: 6.5, display: '$6.5B' },
    { label: 'Q2\'25', value: calc.marketCap / 1000, display: `$${(calc.marketCap / 1000).toFixed(1)}B` },
  ];

  const chartData = chartType === 'constellation' ? constellationData : chartType === 'cash' ? cashData : marketCapData;
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-thesis</div>
    {/* Hero — Ive×Tesla */}
    <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Investment Thesis<UpdateIndicators sources={['PR', 'SEC']} /></div>
      <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Overview<span style={{ color: 'var(--accent)' }}>.</span></h2>
      <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}><strong style={{ color: 'var(--text2)', fontWeight: 500 }}>AST SpaceMobile:</strong> First space-based cellular broadband for standard smartphones. 53+ MNO partnerships (3.2B subs). BB6 launched Dec 24. $3.2B cash. $1B+ contracted revenue.</p>
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
          'BB6 proving D2D technology works at scale',
          '53+ MNO partners with 3.2B addressable subscribers',
          '$1B+ contracted revenue locked in',
          'First-mover advantage in direct-to-phone satellite',
          'MDA SHIELD prime contractor + DoD/SDA contracts',
          'Regulatory moat — licensed spectrum agreements',
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
          'Pre-revenue company, high execution risk',
          'Dilution risk — $3.2B raised, may need more',
          'Competition: Starlink/T-Mobile D2D partnership',
          'Satellite launch/technology failure risk',
          'Slow subscriber adoption by MNO partners',
          'MNO partnership revenue share negotiations',
        ].map(item => (
          <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--coral)', flexShrink: 0 }}>-</span>{item}
          </div>
        ))}
      </div>
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#chart</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>
            {chartType === 'constellation' ? 'Constellation Build-Out' : chartType === 'cash' ? 'Cash Position' : 'Market Cap'}
          </span>
          <UpdateIndicators sources="PR" />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'constellation', label: 'Satellites' },
            { id: 'cash', label: 'Cash' },
            { id: 'marketcap', label: 'Mkt Cap' },
          ].map(btn => {
            const isActive = chartType === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setChartType(btn.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                  background: isActive ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text3)',
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
        {chartData.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 4 }}>{d.display}</div>
            <div style={{ width: '100%', background: 'var(--accent)', borderRadius: '4px 4px 0 0', height: maxValue > 0 ? Math.round((d.value / maxValue) * 150) : 0, minHeight: d.value > 0 ? 2 : 0, transition: 'height 0.3s' }} />
            <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4, textAlign: 'center' }}>{d.label}</div>
          </div>
        ))}
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
        { metric: 'Market Cap', value: `$${(calc.marketCap / 1000).toFixed(2)}B`, desc: 'Equity value', color: 'var(--text)' },
        { metric: 'Enterprise Value', value: `$${(calc.enterpriseValue / 1000).toFixed(2)}B`, desc: 'MC + Debt - Cash', color: 'var(--text)' },
        { metric: 'Constellation', value: `${calc.totalSats}/${targetSats2026}`, desc: `${calc.constellationProgress.toFixed(0)}% complete`, color: 'var(--cyan)' },
        { metric: 'Cash Runway', value: `${calc.cashRunwayQuarters.toFixed(1)} quarters`, desc: `~${(calc.cashRunwayQuarters / 4).toFixed(1)} year runway`, color: calc.cashRunwayQuarters > 4 ? 'var(--mint)' : 'var(--gold)' },
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
        { metric: 'Shares', value: `${currentShares}M`, sub: 'Outstanding', color: 'var(--text)' },
        { metric: 'Price', value: `$${currentStockPrice}`, sub: 'Current', color: 'var(--text)' },
        { metric: 'Mkt Cap', value: `$${(calc.marketCap / 1000).toFixed(2)}B`, sub: 'Equity', color: 'var(--accent)' },
        { metric: 'Debt', value: `$${totalDebt}M`, sub: 'Total debt', color: 'var(--text)' },
        { metric: 'Cash', value: `$${(cashOnHand / 1000).toFixed(2)}B`, sub: 'On hand', color: 'var(--text)' },
        { metric: 'MNO Partners', value: '53+', sub: 'Signed', color: 'var(--text)' },
        { metric: 'Reach', value: `${(partnerReach / 1000).toFixed(1)}B`, sub: 'Subscribers', color: 'var(--accent)' },
        { metric: `@ ${penetrationRate}%`, value: `${calc.potentialSubs.toFixed(0)}M`, sub: 'Potential subs', color: 'var(--text)' },
        { metric: '$/Sub', value: `$${calc.pricePerSub.toFixed(0)}`, sub: 'Price per sub', color: 'var(--text)' },
        { metric: 'Contracted', value: `$${contractedRevenue}M+`, sub: 'Revenue', color: 'var(--text)' },
        { metric: 'Block 1', value: `${block1Sats} in orbit`, sub: 'BW3+BB1-5', color: 'var(--text)' },
        { metric: 'Block 2', value: `${block2Sats} launched`, sub: 'BB6+', color: 'var(--accent)' },
        { metric: 'Constellation', value: `${block1Sats + block2Sats} sats`, sub: 'Total deployed', color: 'var(--text)' },
        { metric: 'Target', value: targetSats2026, sub: '2026 goal', color: 'var(--text)' },
        { metric: 'Next Launch', value: "BB7-13", sub: "Q1'26", color: 'var(--text)' },
      ].map(row => (
        <div key={row.metric} style={{ background: 'var(--surface)', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{row.metric}</div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700, color: row.color, margin: '6px 0 4px' }}>{row.value}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{row.sub}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#parameters</div>
    <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <OverviewParameterCard
        title="Shares Outstanding (M)"
        explanation="Total diluted shares outstanding. Higher share count = lower per-share metrics. Increases with equity raises, stock comp, warrant exercises."
        options={[450, 400, 380, DEFAULTS.currentShares, 350, 330]}
        value={currentShares}
        onChange={setCurrentShares}
        format="M"
        currentValue={DEFAULTS.currentShares}
      />
      <OverviewParameterCard
        title="Stock Price ($)"
        explanation="Current market price per share. Determines market cap and valuation multiples. Compare to DCF intrinsic value for upside/downside."
        options={[40, 55, 65, DEFAULTS.currentStockPrice, 85, 100]}
        value={currentStockPrice}
        onChange={setCurrentStockPrice}
        format="$"
        currentValue={DEFAULTS.currentStockPrice}
      />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
      <OverviewParameterCard
        title="Cash ($M)"
        explanation="Cash & equivalents. Determines runway = Cash ÷ Burn. Critical for pre-revenue companies."
        options={[800, 1000, DEFAULTS.cashOnHand, 1500, 2000, 2500]}
        value={cashOnHand}
        onChange={setCashOnHand}
        format="B"
        currentValue={DEFAULTS.cashOnHand}
      />
      <OverviewParameterCard
        title="Burn ($M/Q)"
        explanation="Quarterly cash consumption. Lower burn extends runway and reduces dilution risk."
        options={[400, 350, DEFAULTS.quarterlyBurn, 250, 200, 150]}
        value={quarterlyBurn}
        onChange={setQuarterlyBurn}
        currentValue={DEFAULTS.quarterlyBurn}
      />
      <OverviewParameterCard
        title="Debt ($M)"
        explanation="Long-term debt obligations. Affects EV and adds financial risk. Lower is safer."
        options={[900, 800, DEFAULTS.totalDebt, 600, 500, 400]}
        value={totalDebt}
        onChange={setTotalDebt}
        currentValue={DEFAULTS.totalDebt}
      />
    </div>

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#chart-header</div>
    <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Stock Chart</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#stock-chart</div>
    <StockChart symbol="ASTS" externalRefreshKey={chartRefreshKey} onPriceUpdate={(price) => setCurrentStockPrice(price)} />

    <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
    <CFANotes title="CFA Level III — Space-Based Cellular" items={[
      { term: 'Market Cap', def: 'Stock price × shares outstanding. Current equity value assigned by market. Compare to DCF intrinsic value.' },
      { term: 'Enterprise Value (EV)', def: 'Market Cap + Total Debt - Cash. Represents total firm value to all capital providers. Used in EV/Revenue multiples.' },
      { term: 'Constellation Progress', def: 'Satellites deployed vs target. Key operational milestone. More satellites = more coverage capacity = higher revenue potential.' },
      { term: 'Cash Runway', def: 'Cash ÷ Quarterly Burn. Quarters of funding remaining at current spend rate. Critical for pre-revenue companies.' },
      { term: 'Price per Subscriber', def: 'Market Cap ÷ Potential Subscribers. Valuation metric for telecom. Lower = more attractive if execution succeeds.' },
      { term: 'MNO Partnerships', def: 'Mobile Network Operator agreements. 53+ partners with 3.2B combined subscribers. Revenue share model (typically 50/50).' },
    ]} />
  </div>
  );
};

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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#catalysts-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Event Horizon</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Catalysts<span style={{ color: 'var(--gold)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Binary events and inflection points that define AST SpaceMobile's trajectory. Near-term: BB7-13, FCC approval, US service launch.</p>
      </div>

      {/* Impact Summary — Glass cards */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#impact-summary</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { level: 'Critical', count: upcomingCatalysts.filter(c => c.impact === 'Critical').length, color: '#ef4444', desc: 'Binary outcomes' },
          { level: 'High', count: upcomingCatalysts.filter(c => c.impact === 'High').length, color: 'var(--gold)', desc: 'Significant value' },
          { level: 'Medium', count: upcomingCatalysts.filter(c => c.impact === 'Medium').length, color: 'var(--sky)', desc: 'Incremental' },
          { level: 'Low', count: upcomingCatalysts.filter(c => c.impact === 'Low').length, color: 'var(--text3)', desc: 'Nice to have' },
        ].map(s => (
          <div key={s.level} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 32, fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.color, letterSpacing: '1px', textTransform: 'uppercase', marginTop: 4 }}>{s.level}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Upcoming — Precision list */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#upcoming-catalysts</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Upcoming Catalysts</span>
        </div>
        {upcomingCatalysts.map((c, i) => {
          const impactColor = c.impact === 'Critical' ? '#ef4444' : c.impact === 'High' ? 'var(--gold)' : c.impact === 'Medium' ? 'var(--sky)' : 'var(--text3)';
          const catColor = c.category === 'Constellation' ? 'var(--cyan)' : c.category === 'Regulatory' ? 'var(--violet)' : c.category === 'Commercial' ? 'var(--gold)' : c.category === 'Service' ? 'var(--mint)' : c.category === 'Defense' || c.category === 'Government' ? 'var(--coral)' : c.category === 'Financing' ? 'var(--sky)' : 'var(--text3)';
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto auto', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)' }}>{c.timeline}</span>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{c.event}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, background: `color-mix(in srgb, ${catColor} 10%, transparent)`, color: catColor }}>{c.category}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, background: `color-mix(in srgb, ${impactColor} 12%, transparent)`, color: impactColor, minWidth: 60, textAlign: 'center' }}>{c.impact}</span>
            </div>
          );
        })}
      </div>

      {/* Completed Milestones — Achievement log */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#completed-milestones</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Completed Milestones</span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--mint)' }}>{completedMilestones.length} achieved</span>
        </div>
        {completedMilestones.slice(0, 15).map((m, i) => {
          const catColor = m.category === 'Constellation' ? 'var(--cyan)' : m.category === 'Regulatory' ? 'var(--violet)' : m.category === 'Commercial' ? 'var(--gold)' : m.category === 'Service' ? 'var(--mint)' : m.category === 'Capital' ? 'var(--sky)' : m.category === 'Defense' || m.category === 'Government' ? 'var(--coral)' : 'var(--text3)';
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)' }}>{m.date}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{m.event}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, background: `color-mix(in srgb, ${catColor} 10%, transparent)`, color: catColor }}>{m.category}</span>
            </div>
          );
        })}
        {completedMilestones.length > 15 && (
          <div style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, color: 'var(--text3)' }}>+ {completedMilestones.length - 15} earlier milestones</div>
        )}
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#constellation-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Orbital Deployment</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Constellation<span style={{ color: 'var(--cyan)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Block 1 validated the technology. Block 2 scales it 10x. Target: 45-60 satellites by end 2026 via SpaceX, Blue Origin, and ISRO.</p>
      </div>

      {/* Deployment KPIs — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#deployment-progress</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Block 1', value: block1Sats, sub: 'BW3+BB1-5 (693 sq ft)', color: 'var(--cyan)' },
          { label: 'Block 2', value: block2Sats, sub: 'BB6+ (~2,400 sq ft)', color: 'var(--gold)' },
          { label: 'Total In Orbit', value: calc.totalSats, sub: 'Operational', color: 'var(--mint)' },
          { label: 'Target 2026', value: targetSats2026, sub: '45-60 range', color: 'var(--sky)' },
          { label: 'Progress', value: `${calc.constellationProgress.toFixed(0)}%`, sub: 'vs 2026 target', color: 'var(--violet)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>
      
      {/* Satellite Generations — Side-by-side panels with accent bars */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#satellite-generations</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ background: 'var(--surface)', padding: '24px', borderLeft: '3px solid var(--cyan)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cyan)', letterSpacing: '-0.2px', marginBottom: 16 }}>Block 1: BW3 + BB1-5</div>
          {['Array size: 693 sq ft each', 'Launched: BW3 Sept 2022, BB1-5 Sept 2024', 'Status: All 6 operational in orbit', 'Purpose: Technology validation, early service'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 3 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px', borderLeft: '3px solid var(--gold)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)', letterSpacing: '-0.2px', marginBottom: 16 }}>Block 2: BB6 onwards</div>
          {['Array size: ~2,400 sq ft (3.5x larger)', 'AST5000 ASIC: Custom silicon, 120 Mbps peak', 'Capacity: 10x improvement over Block 1', 'BB6 launched Dec 23, 2025 (ISRO)', 'BB7-25: In production, 6/month by Dec 2025'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 4 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Launch Schedule — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#launch-schedule</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Launch Schedule</span>
        </div>
        <div style={{ padding: '24px 24px' }}>
          <ResponsiveContainer width="100%" height={200}><ComposedChart data={schedule}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="date" stroke="var(--text3)" fontSize={11} /><YAxis stroke="var(--text3)" /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }} formatter={(v, name, props) => [name === 'sats' ? `${v} sats (${props.payload.note})` : `${v} cumulative`, name === 'sats' ? 'Launched' : 'Total']} /><Bar dataKey="sats" fill="var(--cyan)" radius={[4, 4, 0, 0]} /><Line dataKey="cum" stroke="var(--gold)" strokeWidth={2} /></ComposedChart></ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, color: 'var(--text3)', flexWrap: 'wrap' }}>
            {['BW3 Sept 2022', 'BB1-5 Sept 2024', 'BB6 Dec 2025', 'BB7 ready'].map((m, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: i < 3 ? 'var(--mint)' : 'var(--gold)' }} />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Milestones — Thin progress bars */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#coverage-milestones</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Coverage Milestones</span>
        </div>
        <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {coverage.map(c => (
            <div key={c.r}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text2)' }}>{c.r}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 600, color: c.pct >= 100 ? 'var(--mint)' : 'var(--cyan)' }}>{c.n} sats ({c.pct.toFixed(0)}%)</span>
              </div>
              <div role="progressbar" aria-label={`${c.r} coverage progress`} aria-valuenow={Math.round(c.pct)} aria-valuemin={0} aria-valuemax={100} style={{ height: 4, borderRadius: 2, background: 'var(--surface3)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, c.pct)}%`, borderRadius: 2, background: c.pct >= 100 ? 'var(--mint)' : 'var(--cyan)', transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameters — Preset card layout */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#constellation-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Block 1 (BW3+BB1-5)" explanation="Number of Block 1 satellites. More satellites = greater initial coverage and service validation." options={[2, 4, 6, 8, 10, 12]} value={block1Sats} onChange={setBlock1Sats} currentValue={6} />
        <OverviewParameterCard title="Block 2 (BB6+)" explanation="Number of next-gen Block 2 satellites. 3.5x larger arrays, 10x capacity. Drives commercial scale." options={[0, 1, 3, 5, 8, 12]} value={block2Sats} onChange={setBlock2Sats} currentValue={1} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <OverviewParameterCard title="Target 2026" explanation="Target satellites in orbit by 2026. Higher target = faster network buildout and revenue ramp." options={[20, 30, 45, 60, 80, 100]} value={targetSats2026} onChange={setTargetSats2026} currentValue={60} />
        <OverviewParameterCard title="Failure %" explanation="Estimated satellite launch failure rate. Lower failure rate = more reliable deployment schedule." options={[20, 15, 10, 7, 3, 1]} value={launchFailureRate} onChange={setLaunchFailureRate} format="%" currentValue={7} />
      </div>
      
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#subscribers-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Adoption Analytics</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Subscribers<span style={{ color: 'var(--cyan)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>3.2B addressable reach across 53+ MNO partners. Penetration rate is the single most important variable. 1% = 32M subscribers.</p>
      </div>

      {/* KPI Dashboard — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#subscriber-metrics</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Total Reach', value: `${(partnerReach / 1000).toFixed(1)}B`, sub: '53+ MNOs', color: 'var(--sky)' },
          { label: 'Penetration', value: `${penetrationRate}%`, sub: 'Model assumption', color: 'var(--cyan)' },
          { label: 'Potential Subs', value: `${calc.potentialSubs.toFixed(0)}M`, sub: 'Reach x penetration', color: 'var(--mint)' },
          { label: 'Price / Sub', value: `$${calc.pricePerSub.toFixed(0)}`, sub: 'Market Cap / subs', color: 'var(--gold)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>
      {/* Breakdown — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#subscriber-breakdown</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Partner Breakdown</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div style={{ padding: 0 }}>
          {partners.map((p, i) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px', alignItems: 'center', padding: '12px 24px', borderBottom: i < partners.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{p.name}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--cyan)', textAlign: 'right' }}>{p.subs}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text3)', textAlign: 'right' }}>{((p.subs / partnerReach) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sensitivity — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#subscriber-sensitivity</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Penetration Sensitivity</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Pen%', 'Subs', 'Rev/yr', '$/Sub'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Pen%' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {scenarios.map((s, i) => (
            <div key={s.p} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', alignItems: 'center', padding: '12px 24px', borderBottom: i < scenarios.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', background: s.p === penetrationRate ? 'color-mix(in srgb, var(--cyan) 8%, transparent)' : 'transparent', transition: 'background 0.15s' }}
              onMouseEnter={e => { if (s.p !== penetrationRate) e.currentTarget.style.background = 'var(--surface2)'; }}
              onMouseLeave={e => { if (s.p !== penetrationRate) e.currentTarget.style.background = 'transparent'; }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: s.p === penetrationRate ? 'var(--cyan)' : 'var(--text)', fontWeight: s.p === penetrationRate ? 600 : 400 }}>{s.p}%</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{s.subs.toFixed(0)}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', textAlign: 'right' }}>${s.rev.toFixed(1)}B</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text3)', textAlign: 'right' }}>${(calc.marketCap / s.subs).toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Parameters — Preset card layout */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#subscriber-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Reach (M)" explanation="Total addressable subscribers through MNO partner networks. Larger reach = bigger revenue opportunity." options={[1000, 2000, 3200, 4500, 6000, 8000]} value={partnerReach} onChange={setPartnerReach} format="B" currentValue={3200} />
        <OverviewParameterCard title="Penetration %" explanation="Subscriber penetration rate into addressable market. 1% of 3.2B = 32M paying subscribers." options={[0.5, 1, 2, 3, 5, 8]} value={penetrationRate} onChange={setPenetrationRate} format="%" currentValue={3} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <OverviewParameterCard title="ARPU ($)" explanation="Average revenue per user per month. Higher ARPU = more revenue per subscriber. Blended across markets." options={[5, 10, 15, 18, 25, 35]} value={blendedARPU} onChange={setBlendedARPU} format="$" currentValue={18} />
      </div>
      
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Financial Engine</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Revenue<span style={{ color: 'var(--mint)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>MNO 50/50 revenue share, Gateway services, Government contracts, and spectrum. $1B+ contracted across the partnership ecosystem.</p>
      </div>

      {/* Revenue KPIs — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-metrics-kpi</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Gross Revenue', value: `$${(calc.grossAnnualRev / 1000).toFixed(1)}B`, color: 'var(--cyan)' },
          { label: 'Revenue Share', value: `${revenueShare}%`, color: 'var(--sky)' },
          { label: 'Contracted', value: `$${contractedRevenue}M+`, color: 'var(--violet)' },
          { label: 'ASTS Revenue', value: `$${(calc.astsAnnualRev / 1000).toFixed(1)}B`, color: 'var(--mint)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, marginTop: 8 }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Revenue Sources — Glass panel precision list */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-sources</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Revenue Sources</span>
          <UpdateIndicators sources={['PR', 'SEC', 'WS']} />
        </div>
        <div style={{ padding: 0 }}>
          {revenueSources.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < revenueSources.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: r.status.includes('Active') ? 'var(--mint)' : 'var(--text3)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{r.source}</span>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.description}</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, background: r.status.includes('Active') ? 'color-mix(in srgb, var(--mint) 10%, transparent)' : 'color-mix(in srgb, var(--text3) 10%, transparent)', color: r.status.includes('Active') ? 'var(--mint)' : 'var(--text3)' }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Ramp — Glass panel chart */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-ramp</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Revenue Ramp Projection</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div style={{ padding: '24px 24px' }}>
          <ResponsiveContainer width="100%" height={220}><AreaChart data={ramp}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="year" stroke="var(--text3)" fontSize={11} /><YAxis stroke="var(--text3)" tickFormatter={v => `$${v}B`} fontSize={11} /><Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }} /><Legend wrapperStyle={{ fontSize: 11 }} /><Area type="monotone" dataKey="commercial" stackId="1" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.5} /><Area type="monotone" dataKey="gov" stackId="1" stroke="var(--gold)" fill="var(--gold)" fillOpacity={0.5} /><Area type="monotone" dataKey="gateway" stackId="1" stroke="var(--violet)" fill="var(--violet)" fillOpacity={0.5} /></AreaChart></ResponsiveContainer>
          <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
            {[{ label: 'Commercial', color: 'var(--cyan)' }, { label: 'Government', color: 'var(--gold)' }, { label: 'Gateway', color: 'var(--violet)' }].map(l => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text3)' }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: l.color }} />{l.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Parameters — Preset card layout */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Revenue Share %" explanation="ASTS revenue share from MNO partnerships. Higher share = more revenue retained per subscriber." options={[20, 30, 40, 50, 60, 70]} value={revenueShare} onChange={setRevenueShare} format="%" currentValue={50} />
        <OverviewParameterCard title="Gov Revenue ($M/yr)" explanation="Annual government contract revenue from SDA, DIU, and FirstNet. Diversifies revenue beyond commercial." options={[0, 25, 50, 100, 200, 400]} value={govRevenue} onChange={setGovRevenue} format="$" currentValue={100} />
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
  // State for expandable partner news (matching BMNR adoption-events pattern)
  const [expandedPartnerNews, setExpandedPartnerNews] = useState<Set<number>>(new Set());
  // Filters for partner news timeline (matching BMNR adoption-timeline pattern)
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [partnerFilter, setPartnerFilter] = useState('All');

  // Extract unique categories and partners from PARTNER_NEWS for filters
  const categories = ['All', ...Array.from(new Set(PARTNER_NEWS.map(n => n.category)))];
  const partnerNames = ['All', ...Array.from(new Set(PARTNER_NEWS.map(n => n.partner)))];

  // Filter partner news by category and partner
  const filteredPartnerNews = PARTNER_NEWS.filter(n => {
    const categoryMatch = categoryFilter === 'All' || n.category === categoryFilter;
    const partnerMatch = partnerFilter === 'All' || n.partner === partnerFilter;
    return categoryMatch && partnerMatch;
  });

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
    { partner: 'Orange', region: 'Europe/Africa', subs: 220, status: 'MOU', spectrum: 'TBD', notes: 'MoU Mar 2022. Testing in Africa post-BW3. 220M+ mobile customers. Note: Orange launched competing SMS D2D with Skylo (Dec 2025)' },
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
    { agency: 'MDA SHIELD (Golden Dome)', value: 'IDIQ', status: 'Prime Contractor', notes: 'Awarded Jan 16, 2026 - enables future task orders' },
    { agency: 'Space Development Agency (SDA)', value: '$43M', status: 'Active', notes: 'Satellite communications' },
    { agency: 'Defense Innovation Unit (DIU)', value: 'Up to $20M', status: 'Active', notes: 'Via prime contractor' },
    { agency: 'FirstNet (Band 14)', value: 'Testing', status: 'Authorized Apr 2025', notes: 'First responder communications' },
  ];

  const totalPrepay = definitiveAgreements.reduce((s, p) => s + p.prepayment, 0);
  const totalDefinitiveSubs = definitiveAgreements.reduce((s, p) => s + p.subs, 0);
  const totalOtherSubs = otherPartners.reduce((s, p) => s + p.subs, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#partners-header</div>
      {/* Hero — Ive×Tesla */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Strategic Ecosystem</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Partners<span style={{ color: 'var(--mint)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>50+ MNO agreements covering 3.2B subscribers. $1B+ contracted. 50/50 revenue share. ~80 MHz US spectrum owned/controlled plus 60 MHz S-band global ITU priority.</p>
      </div>

      {/* KPI Dashboard — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#partner-metrics</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Contracted', value: '$1B+', sub: 'Hard commitments', color: 'var(--mint)' },
          { label: 'Prepayments', value: `$${totalPrepay}M`, sub: 'Cash received/due', color: 'var(--cyan)' },
          { label: 'MNO Partners', value: '50+', sub: 'Global agreements', color: 'var(--violet)' },
          { label: 'Addressable', value: '3.2B', sub: 'Total subscribers', color: 'var(--gold)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Stats — Side-by-side panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 16 }}>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          {[{ l: 'Definitive Partners', v: '4' }, { l: 'Definitive Subs', v: `${totalDefinitiveSubs}M` }, { l: 'Revenue Share', v: '50/50' }].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text)' }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          {[{ l: 'US Spectrum', v: '45 MHz', c: 'var(--mint)' }, { l: 'Global Tunable', v: '1,150 MHz', c: 'var(--cyan)' }, { l: 'S-band ITU', v: '60 MHz', c: 'var(--text)' }].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.c }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 24px', borderLeft: '3px solid var(--mint)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--mint)', marginBottom: 8 }}>Why This Matters</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.6 }}>More MNO partners → More spectrum → Larger TAM → Revenue share acceleration</div>
        </div>
      </div>

      {/* Definitive Agreements — Glass panel precision list */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#definitive-agreements</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Definitive Commercial Agreements</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 140px 80px 140px 100px 100px 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', minWidth: 700 }}>
            {['Partner', 'Region', 'Subs', 'Spectrum', 'Term', 'Prepay', 'Status'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>{h}</span>
            ))}
          </div>
          {definitiveAgreements.map((p, i) => (
            <div key={p.partner} style={{ display: 'grid', gridTemplateColumns: '120px 140px 80px 140px 100px 100px 1fr', alignItems: 'center', padding: '16px 24px', borderBottom: i < definitiveAgreements.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s', minWidth: 700 }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{p.partner}</span>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>{p.region}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--cyan)' }}>{p.subs}M</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, background: 'color-mix(in srgb, var(--sky) 10%, transparent)', color: 'var(--sky)', display: 'inline-block' }}>{p.spectrum}</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{p.term}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', fontWeight: 600 }}>${p.prepayment}M</span>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{p.prepayStatus}</span>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 140px 80px 140px 100px 100px 1fr', padding: '16px 24px', background: 'color-mix(in srgb, var(--mint) 5%, transparent)', borderTop: '1px solid var(--border)', minWidth: 700 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', gridColumn: 'span 2' }}>Total Definitive</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--cyan)' }}>{totalDefinitiveSubs}M</span>
            <span /><span />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--mint)' }}>${totalPrepay}M</span>
            <span />
          </div>
        </div>
      </div>

      {/* Partner Details — Accent-bar panels */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#partner-details</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {definitiveAgreements.map(p => (
          <div key={p.partner} style={{ background: 'var(--surface)', padding: '24px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{p.partner}</span>
              <UpdateIndicators sources="PR" />
            </div>
            {[
              { l: 'Signed', v: p.signDate },
              { l: 'Term', v: p.term },
              { l: 'Spectrum', v: `${p.spectrum} (${p.spectrumType})` },
              { l: 'Prepayment', v: `$${p.prepayment}M — ${p.prepayStatus}`, hl: true },
              { l: 'Revenue', v: p.revenueCommitment },
            ].map(row => (
              <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.l}</span>
                <span style={{ fontFamily: row.hl ? 'Space Mono, monospace' : 'inherit', fontSize: 12, color: row.hl ? 'var(--mint)' : 'var(--text2)', fontWeight: row.hl ? 600 : 400 }}>{row.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '12px 16px', background: 'color-mix(in srgb, var(--border) 30%, transparent)', borderRadius: 8, fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>{p.notes}</div>
          </div>
        ))}
      </div>

      {/* Spectrum Holdings — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#owned-spectrum</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ASTS-Owned Spectrum</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div style={{ padding: 0 }}>
          {ownedSpectrum.map((s, i) => (
            <div key={s.name} style={{ padding: '16px 24px', borderBottom: i < ownedSpectrum.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', borderLeft: '3px solid var(--cyan)', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.name}</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, background: 'color-mix(in srgb, var(--mint) 10%, transparent)', color: 'var(--mint)' }}>{s.status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[{ l: 'Band', v: s.band }, { l: 'Size', v: s.size }, { l: 'Coverage', v: s.coverage }, { l: 'Cost', v: s.cost }].map(d => (
                  <div key={d.l}>
                    <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{d.l}</div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{d.v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          Total owned: 45 MHz L-band (US/Canada) + 60 MHz S-band (global ITU priority). $80M/yr ongoing L-band payments.
        </div>
      </div>

      {/* Partner Spectrum — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#partner-spectrum</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Partner Spectrum (Shared)</span>
          <UpdateIndicators sources="PR" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)' }}>
          {partnerSpectrum.map(s => (
            <div key={s.partner} style={{ background: 'var(--surface)', padding: '16px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--cyan)' }}>{s.partner}</span>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, background: 'color-mix(in srgb, var(--sky) 10%, transparent)', color: 'var(--sky)' }}>{s.band}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.type} · {s.coverage}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', opacity: 0.7, marginTop: 2 }}>{s.notes}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', borderLeft: '3px solid var(--cyan)', fontSize: 11, color: 'var(--text2)' }}>
          <strong style={{ color: 'var(--cyan)' }}>Key:</strong> AT&T + Verizon 850 MHz = ~100% US geographic coverage. Platform tunable across 1,150 MHz globally.
        </div>
      </div>

      {/* Government Contracts — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#gov-contracts</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Government Contracts</span>
          <UpdateIndicators sources={['PR', 'SEC']} />
        </div>
        <div style={{ padding: 0 }}>
          {govContracts.map((g, i) => (
            <div key={g.agency} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 1fr', alignItems: 'center', padding: '16px 24px', borderBottom: i < govContracts.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{g.agency}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', fontWeight: 600 }}>{g.value}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, background: 'color-mix(in srgb, var(--sky) 10%, transparent)', color: 'var(--sky)' }}>{g.status}</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{g.notes}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          Total disclosed: $63M+ (plus SHIELD IDIQ). MDA prime contractor status enables future task orders.
        </div>
      </div>

      {/* Other Partners — Glass panel */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#other-partners</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Other Key Partners (MOUs & Agreements)</span>
          <UpdateIndicators sources="PR" />
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '130px 140px 80px 100px 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Partner', 'Region', 'Subs', 'Status', 'Notes'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)' }}>{h}</span>
            ))}
          </div>
          {otherPartners.map((p, i) => (
            <div key={p.partner} style={{ display: 'grid', gridTemplateColumns: '130px 140px 80px 100px 1fr', alignItems: 'center', padding: '12px 24px', borderBottom: i < otherPartners.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{p.partner}</span>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>{p.region}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--cyan)' }}>{p.subs}M</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, background: p.status === 'Definitive' ? 'color-mix(in srgb, var(--mint) 10%, transparent)' : 'color-mix(in srgb, var(--gold) 10%, transparent)', color: p.status === 'Definitive' ? 'var(--mint)' : 'var(--gold)' }}>{p.status}</span>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{p.notes}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Commitments — Glass grid */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-commitments</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { value: '$1B+', label: 'Total Contracted Revenue', sub: 'Hard commitments, not soft MOUs', color: 'var(--mint)' },
          { value: `$${totalPrepay}M`, label: 'Total Prepayments', sub: 'stc $175M due YE 2025', color: 'var(--cyan)' },
          { value: '50/50', label: 'Revenue Share Model', sub: 'MNOs handle billing/support', color: 'var(--violet)' },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--surface)', padding: '24px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6 }}>{c.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Partner Ecosystem Timeline — Glass panel header */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 32 }}>#partner-timeline</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Partner Ecosystem Timeline</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)', marginLeft: 12 }}>{filteredPartnerNews.length} events</span>
            </div>
            {partnerFilter !== 'All' && (
              <button onClick={() => setPartnerFilter('All')} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, background: 'color-mix(in srgb, var(--coral) 10%, transparent)', color: 'var(--coral)', border: 'none', cursor: 'pointer' }}>Clear Filter</button>
            )}
          </div>
          <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>Track news about ASTS MNO partners — IoT expansion, connected vehicles, 5G rollouts, coverage expansion</p>
        </div>

        {/* Partner Filter Pills */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {partnerNames.map(partner => {
            const isSelected = partnerFilter === partner;
            const count = PARTNER_NEWS.filter(n => n.partner === partner).length;
            return (
              <button key={partner} onClick={() => setPartnerFilter(partner)} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, border: 'none', cursor: 'pointer', background: isSelected ? 'color-mix(in srgb, var(--cyan) 15%, transparent)' : 'color-mix(in srgb, var(--border) 60%, transparent)', color: isSelected ? 'var(--cyan)' : 'var(--text3)', transition: 'all 0.15s' }}>
                {partner} ({partner === 'All' ? PARTNER_NEWS.length : count})
              </button>
            );
          })}
        </div>

        {/* Category Filter + Expand/Collapse */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, border: 'none', cursor: 'pointer', background: categoryFilter === cat ? 'color-mix(in srgb, var(--violet) 15%, transparent)' : 'color-mix(in srgb, var(--border) 60%, transparent)', color: categoryFilter === cat ? 'var(--violet)' : 'var(--text3)', transition: 'all 0.15s' }}>
                {cat === 'All' ? `All (${PARTNER_NEWS.length})` : `${cat} (${PARTNER_NEWS.filter(n => n.category === cat).length})`}
              </button>
            ))}
          </div>
          <button onClick={() => { if (expandedPartnerNews.size === filteredPartnerNews.length) { setExpandedPartnerNews(new Set()); } else { setExpandedPartnerNews(new Set(filteredPartnerNews.map((_, i) => i))); } }} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'color-mix(in srgb, var(--border) 60%, transparent)', color: 'var(--text3)', whiteSpace: 'nowrap' }}>
            {expandedPartnerNews.size === filteredPartnerNews.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Partner News Events */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#partner-news</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredPartnerNews.length > 0 ? (
          filteredPartnerNews.map((news, i) => {
            const isExpanded = expandedPartnerNews.has(i);
            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`${news.headline} — ${news.partner} ${news.date}`}
                onKeyDown={(e) => { if (e.key === 'Enter') { const next = new Set(expandedPartnerNews); if (isExpanded) next.delete(i); else next.add(i); setExpandedPartnerNews(next); } }}
                style={{ padding: 16, background: 'var(--surface2)', borderRadius: 8, cursor: 'pointer', borderLeft: `3px solid ${news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--coral)' : 'var(--sky)'}`, transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onClick={() => {
                  const next = new Set(expandedPartnerNews);
                  if (isExpanded) next.delete(i);
                  else next.add(i);
                  setExpandedPartnerNews(next);
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: 'var(--text3)' }}>{news.date}</span>
                      <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, background: 'color-mix(in srgb, var(--cyan) 20%, transparent)', color: 'var(--cyan)' }}>{news.partner}</span>
                      <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, background: 'color-mix(in srgb, var(--violet) 20%, transparent)', color: 'var(--violet)' }}>{news.category}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{news.headline}</div>
                  </div>
                  <span style={{ fontSize: 12, color: news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--coral)' : 'var(--sky)', marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {news.impact === 'Bullish' ? '↑' : news.impact === 'Bearish' ? '↓' : '→'} {news.impact}
                  </span>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    {/* Summary */}
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{news.summary}</div>

                    {/* ASTS Relevance */}
                    {news.astsRelevance && (
                      <div style={{ padding: 12, background: 'var(--surface)', borderRadius: 8, borderLeft: '3px solid var(--mint)' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--mint)' }}>📡 ASTS RELEVANCE</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.astsRelevance}</div>
                      </div>
                    )}

                    {/* Source */}
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>Source: {news.source}</div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text3)' }}>No partner news matching filters</div>
        )}
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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

// COMPETITOR INTELLIGENCE TAB - Track competitor activities in satellite D2D space
const CompetitorsTab = () => {
  // State for expandable competitor news
  const [expandedCompetitorNews, setExpandedCompetitorNews] = useState<Set<number>>(new Set());
  // Filters for competitor news timeline
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [competitorFilter, setCompetitorFilter] = useState('All');

  // Extract unique categories and competitors from COMPETITOR_NEWS for filters
  const categories = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.category)))];
  const competitorNames = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.competitor)))];

  // Filter competitor news by category and competitor, sort by date (newest first)
  const filteredCompetitorNews = COMPETITOR_NEWS.filter(n => {
    const categoryMatch = categoryFilter === 'All' || n.category === categoryFilter;
    const competitorMatch = competitorFilter === 'All' || n.competitor === competitorFilter;
    return categoryMatch && competitorMatch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Key competitors overview
  const keyCompetitors = [
    {
      name: 'SpaceX Starlink',
      type: 'LEO Broadband + D2D',
      status: 'Operational',
      focus: 'Terminal-based broadband, D2D partnership with T-Mobile',
      threat: 'High',
      notes: 'Largest LEO constellation. D2D beta with T-Mobile for texts/calls. Not full broadband D2D yet.'
    },
    {
      name: 'Amazon Leo',
      type: 'LEO Broadband',
      status: '212 Satellites (Jan 2026)',
      focus: 'Terminal-based broadband (Leo Nano/Pro/Ultra terminals)',
      threat: 'Medium',
      notes: 'Rebranded from Project Kuiper Nov 2025. 7 missions in 2025, enterprise preview live. Not D2D - different market.'
    },
    {
      name: 'Lynk Global',
      type: 'D2D (Text/IoT)',
      status: 'Limited Service',
      focus: 'Text messaging and IoT to unmodified phones',
      threat: 'Low',
      notes: 'Text-only. No voice/data. Limited satellite count. More complementary than competitive.'
    },
    {
      name: 'Apple/Globalstar',
      type: 'Emergency SOS',
      status: 'Operational',
      focus: 'Emergency messaging for iPhone only',
      threat: 'Low',
      notes: 'iPhone-only. Emergency texts only. Not commercial service. Different use case.'
    },
  ];

  return (
    <div className="tab-content">
      <style>{`
        .competitor-card {
          background: var(--bg2);
          border: 1px solid var(--stroke);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .threat-high { border-left: 3px solid var(--red); }
        .threat-medium { border-left: 3px solid var(--gold); }
        .threat-low { border-left: 3px solid var(--mint); }
        .competitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .competitor-name {
          font-weight: 600;
          font-size: 14px;
          color: var(--text1);
        }
        .competitor-type {
          font-size: 11px;
          color: var(--text3);
          padding: 2px 8px;
          background: var(--bg3);
          border-radius: 4px;
        }
        .competitor-detail {
          font-size: 12px;
          color: var(--text2);
          margin-bottom: 4px;
        }
        .competitor-notes {
          font-size: 11px;
          color: var(--text3);
          font-style: italic;
        }
        .news-entry {
          background: var(--bg2);
          border: 1px solid var(--stroke);
          border-radius: 8px;
          margin-bottom: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .news-entry:hover {
          border-color: var(--text3);
        }
        .news-header {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .news-title {
          font-size: 13px;
          color: var(--text1);
          font-weight: 500;
          flex: 1;
        }
        .news-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
        }
        .news-date {
          font-size: 11px;
          color: var(--text3);
        }
        .news-impact {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }
        .impact-bullish { background: rgba(16, 185, 129, 0.2); color: var(--mint); }
        .impact-bearish { background: rgba(239, 68, 68, 0.2); color: var(--red); }
        .impact-neutral { background: rgba(148, 163, 184, 0.2); color: var(--text3); }
        .news-body {
          padding: 0 16px 16px 16px;
          border-top: 1px solid var(--stroke);
        }
        .news-summary {
          font-size: 12px;
          color: var(--text2);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .news-implication {
          font-size: 12px;
          color: var(--sky);
          padding: 8px 12px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .news-source {
          font-size: 11px;
          color: var(--text3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .news-source a {
          color: var(--sky);
          text-decoration: none;
        }
        .news-source a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Key Competitors Overview */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-overview</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Competitors</span><span style={{ flex: 1, height: 1, background: 'var(--border)' }} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
        {keyCompetitors.map((comp, i) => (
          <div key={i} className={`competitor-card threat-${comp.threat.toLowerCase()}`}>
            <div className="competitor-header">
              <span className="competitor-name">{comp.name}</span>
              <span className="competitor-type">{comp.type}</span>
            </div>
            <div className="competitor-detail"><strong>Status:</strong> {comp.status}</div>
            <div className="competitor-detail"><strong>Focus:</strong> {comp.focus}</div>
            <div className="competitor-detail"><strong>Threat Level:</strong> <span style={{ color: comp.threat === 'High' ? 'var(--red)' : comp.threat === 'Medium' ? 'var(--gold)' : 'var(--mint)' }}>{comp.threat}</span></div>
            <div className="competitor-notes">{comp.notes}</div>
          </div>
        ))}
      </div>

      {/* Competitor News Timeline */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-timeline</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Competitor Intelligence ({filteredCompetitorNews.length} events)</span></div>

      {/* Competitor Filter */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-filter</div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--text3)', marginRight: 8 }}>Filter by Competitor:</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {competitorNames.map(comp => {
            const isSelected = competitorFilter === comp;
            const count = COMPETITOR_NEWS.filter(n => n.competitor === comp).length;
            return (
              <button
                key={comp}
                onClick={() => setCompetitorFilter(comp)}
                style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid', fontSize: 11, fontWeight: 500, cursor: 'pointer', borderColor: isSelected ? 'var(--accent)' : 'var(--border)', background: isSelected ? 'var(--accent-dim)' : 'var(--surface2)', color: isSelected ? 'var(--accent)' : 'var(--text2)' }}
              >
                {comp} ({comp === 'All' ? COMPETITOR_NEWS.length : count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#category-filter</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16, alignItems: 'center' }}>
        {categories.map(cat => {
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid', fontSize: 11, fontWeight: 500, cursor: 'pointer', borderColor: isActive ? 'var(--accent)' : 'var(--border)', background: isActive ? 'var(--accent-dim)' : 'var(--surface2)', color: isActive ? 'var(--accent)' : 'var(--text2)' }}
            >
              {cat === 'All' ? `All (${COMPETITOR_NEWS.length})` : `${cat} (${COMPETITOR_NEWS.filter(n => n.category === cat).length})`}
            </button>
          );
        })}
        <button
          style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)', fontSize: 11, fontWeight: 500, cursor: 'pointer', background: 'var(--surface2)', color: 'var(--text2)' }}
          onClick={() => {
            if (expandedCompetitorNews.size === filteredCompetitorNews.length) {
              setExpandedCompetitorNews(new Set());
            } else {
              setExpandedCompetitorNews(new Set(filteredCompetitorNews.map((_, i) => i)));
            }
          }}
        >
          {expandedCompetitorNews.size === filteredCompetitorNews.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* News Entries */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-news</div>
      {filteredCompetitorNews.map((news, i) => {
        const isExpanded = expandedCompetitorNews.has(i);
        return (
          <div key={i} className="news-entry" style={{ borderLeft: `3px solid ${news.impact === 'Bullish' ? 'var(--mint)' : news.impact === 'Bearish' ? 'var(--red)' : 'var(--text3)'}` }}>
            <div
              className="news-header"
              onClick={() => {
                const newExpanded = new Set(expandedCompetitorNews);
                if (isExpanded) {
                  newExpanded.delete(i);
                } else {
                  newExpanded.add(i);
                }
                setExpandedCompetitorNews(newExpanded);
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>
                  <span style={{ color: 'var(--gold)' }}>{news.competitor}</span> • {news.category}
                </div>
                <div className="news-title">{news.headline}</div>
              </div>
              <div className="news-meta">
                <span className="news-date">{news.date}</span>
                <span className={`news-impact impact-${news.impact.toLowerCase()}`}>
                  {news.impact === 'Bullish' ? '↑ Good for ASTS' : news.impact === 'Bearish' ? '↓ Risk for ASTS' : '— Neutral'}
                </span>
                <span style={{ color: 'var(--text3)' }}>{isExpanded ? '▼' : '▶'}</span>
              </div>
            </div>
            {isExpanded && (
              <div className="news-body">
                <div className="news-summary">{news.summary}</div>
                <div className="news-implication">
                  <strong>ASTS Implication:</strong> {news.astsImplication}
                </div>
                <div className="news-source">
                  <span>Source: {news.source}</span>
                  {news.url && (
                    <a href={news.url} target="_blank" rel="noopener noreferrer">View Original →</a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {filteredCompetitorNews.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text3)' }}>
          No competitor news matching current filters
        </div>
      )}

      {/* Competitive Moat Summary */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitive-moat</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>ASTS Competitive Advantages</span><span style={{ flex: 1, height: 1, background: 'var(--border)' }} /></div>
      <div className="competitor-card" style={{ borderLeft: '3px solid var(--mint)' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="competitor-detail"><strong>🛰️ True D2D Broadband:</strong> Only solution offering full mobile broadband (voice, data, video) to unmodified smartphones. Starlink D2D is text/voice only.</div>
          <div className="competitor-detail"><strong>📡 MNO Partnerships:</strong> 50+ carrier agreements covering 3.2B+ subscribers. Deep integration vs. Starlink's single T-Mobile deal.</div>
          <div className="competitor-detail"><strong>📶 Spectrum Access:</strong> 1,150+ MHz tunable across partners + owned L-band/S-band. Regulatory moat vs. new entrants.</div>
          <div className="competitor-detail"><strong>🎯 First Mover:</strong> First to demonstrate 5G broadband from space to standard phones. Technology lead of 2+ years.</div>
          <div className="competitor-detail"><strong>🏛️ Government Contracts:</strong> SDA, DIU, MDA SHIELD contracts validate defense use case. Additional revenue stream.</div>
        </div>
      </div>
    </div>
  );
};

// DILUTION & SHARE COUNT TAB - Dedicated dilution tracking (replaces standalone Cash Runway tab)
// Cash/liquidity content now lives in Capital tab's 'liquidity' view
const HYPOTHETICAL_RAISE_AMOUNTS = [250, 500, 750, 1000];

const ASTSDilutionTab = ({ calc, cashOnHand, setCashOnHand, quarterlyBurn, setQuarterlyBurn, totalDebt, setTotalDebt, debtRate, setDebtRate, currentShares, currentStockPrice }) => {
  const dilution = HYPOTHETICAL_RAISE_AMOUNTS.map(r => ({ r, new: r / currentStockPrice, dil: (r / currentStockPrice) / (currentShares + r / currentStockPrice) * 100, runway: (cashOnHand + r) / quarterlyBurn }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-header</div>
      {/* Hero */}
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Projection Tool</div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Future Dilution<span style={{ color: 'var(--violet)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Model the dilution impact of hypothetical equity raises at the current stock price. Adjust cash position and burn rate to see extended runway from potential raises.</p>
      </div>

      {/* Dilution Impact at Different Prices */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-at-prices</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Hypothetical Raise Dilution</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Raise Amount', 'New Shares', 'Dilution', 'Ext. Runway'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Raise Amount' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {dilution.map((d, i) => (
            <div key={d.r} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 24px', borderBottom: i < dilution.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text)' }}>${d.r}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{d.new.toFixed(1)}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--coral)', textAlign: 'right' }}>{d.dil.toFixed(1)}%</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', textAlign: 'right' }}>{d.runway.toFixed(1)}Q</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          At current price ${currentStockPrice.toFixed(2)}/share. Company states fully funded for 100+ satellites.
        </div>
      </div>

      {/* Parameters */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-params</div>
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Parameters</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <OverviewParameterCard title="Cash Position ($M)" explanation="Total cash and equivalents per 8-K. Pro forma post-Feb raises: ~$3,760M." options={[1500, 2000, 2500, 2780, 3500, 3760]} value={cashOnHand} onChange={setCashOnHand} format="$" currentValue={2780} />
        <OverviewParameterCard title="Quarterly Burn ($M)" explanation="Quarterly cash consumption (CapEx + OpEx). Driven by satellite production ramp." options={[500, 400, 350, 300, 200, 150]} value={quarterlyBurn} onChange={setQuarterlyBurn} format="$" currentValue={300} />
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Dilution Projections" items={[
        { term: 'Dilution at Different Prices', def: 'At higher stock prices, fewer shares needed to raise same amount. $500M raise at $100/share = 5M shares (1.3% dilution) vs at $50 = 10M shares (2.6%).' },
        { term: 'Runway Extension', def: 'Each raise extends runway proportionally. $500M at $300M/Q burn = +1.7Q. Consider probability-weighted scenarios for modeling.' },
        { term: 'Price Impact', def: 'Large equity raises can depress stock price, creating a feedback loop that increases dilution. Smaller, staged raises via ATM programs minimize this effect.' },
      ]} />
    </div>
  );
};

// CAPITAL TAB - Share structure, offerings, dilution
const CapitalTab = ({ currentShares, currentStockPrice }) => {
  const [capitalView, setCapitalView] = useState('structure');

  // Use imported data from @/data/asts
  const shareClasses = SHARE_CLASSES;
  const totalBasic = TOTAL_BASIC_SHARES;
  const fullyDiluted = FULLY_DILUTED_SHARES;
  const majorShareholders = MAJOR_SHAREHOLDERS;
  const equityOfferings = EQUITY_OFFERINGS;
  const dilutionHistory = DILUTION_HISTORY;
  const sbcHistory = SBC_HISTORY;
  const sbc2025YTD = sbcHistory.filter(h => h.quarter.includes('2025')).reduce((s, h) => s + h.sbc, 0);
  const sbc2025Eng = sbcHistory.filter(h => h.quarter.includes('2025')).reduce((s, h) => s + h.engineering, 0);
  const sbc2025GA = sbcHistory.filter(h => h.quarter.includes('2025')).reduce((s, h) => s + h.gAndA, 0);
  const sbcFY2024 = sbcHistory.filter(h => h.quarter.includes('2024')).reduce((s, h) => s + h.sbc, 0);
  const convertibleNotes = CONVERTIBLE_NOTES;
  const dilutionScenarios = DILUTION_SCENARIOS;
  const totalConvertDilution = convertibleNotes.reduce((sum, n) => sum + n.maxSharesOnConversion, 0);
  const dilutionRef = HYPOTHETICAL_RAISE_AMOUNTS.map(r => ({ r, new: r / currentStockPrice, dil: (r / currentStockPrice) / (currentShares + r / currentStockPrice) * 100, runway: (LIQUIDITY_POSITION.cashAndEquiv + r) / LIQUIDITY_POSITION.quarterlyBurn }));

  const marketCap = currentShares * currentStockPrice;
  const totalVotingShares = TOTAL_VOTING_SHARES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Financial Position<UpdateIndicators sources="SEC" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Capital Structure<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Three-class voting structure with founder control via Class C super-voting shares. ~$5B+ total raised since SPAC. Class A grew from 5.75M (SPAC) to ~290M (Feb 2026). Fully funded for 100+ satellites.</p>
      </div>

      {/* Summary Cards */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Metrics</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-metrics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Metrics</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { label: 'Class A Shares', value: `${shareClasses[0].shares}M`, color: 'var(--sky)' },
            { label: 'Fully Diluted', value: `${fullyDiluted}M`, color: 'var(--violet)' },
            { label: 'Basic Mkt Cap', value: `$${(marketCap / 1000).toFixed(1)}B`, color: 'var(--mint)' },
            { label: 'FD Mkt Cap', value: `$${(fullyDiluted * currentStockPrice / 1000).toFixed(1)}B`, color: 'var(--gold)' },
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
              { label: 'Stock Price', value: `$${currentStockPrice}`, color: 'var(--text)' },
              { label: 'Dilution', value: `+${((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(1)}%`, color: 'var(--coral)' },
              { label: 'Class B Shares', value: `${shareClasses[1]?.shares || 0}M`, color: 'var(--text)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--surface)', padding: '16px 24px' }}>
            {[
              { label: 'Class C Shares', value: `${shareClasses[2]?.shares || 0}M`, color: 'var(--text)' },
              { label: 'Total Basic', value: `${totalBasic}M`, color: 'var(--text)' },
              { label: 'Source', value: 'SEC', color: 'var(--text3)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '16px 24px', background: 'linear-gradient(135deg, color-mix(in srgb, var(--mint) 8%, var(--surface)), color-mix(in srgb, var(--violet) 8%, var(--surface)))', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Multi-Class Structure</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginTop: 4 }}>
            Three share classes with different voting rights. Significant dilution from warrants, RSUs, and convertible instruments.
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Navigation</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-navigation</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {[
          { id: 'structure', value: `${shareClasses.length}`, label: 'Share Classes', sub: 'Class A, B, C' },
          { id: 'shareholders', value: `${majorShareholders.length}`, label: 'Major Holders', sub: 'Strategic + founder' },
          { id: 'offerings', value: `${equityOfferings.length}`, label: 'Capital Events', sub: 'IPO to converts' },
          { id: 'incentives', value: `${sbcHistory.length}`, label: 'SBC Quarters', sub: 'Compensation data' },
          { id: 'dilution', value: `${((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(0)}%`, label: 'Total Dilution', sub: `${fullyDiluted}M FD shares` },
          { id: 'liquidity', value: `$${(LIQUIDITY_POSITION.cashAndEquiv / 1000).toFixed(1)}B`, label: 'Liquidity', sub: `~${(LIQUIDITY_POSITION.cashAndEquiv / 300).toFixed(0)}Q runway` },
        ].map(nav => (
          <div
            key={nav.id}
            onClick={() => setCapitalView(nav.id)}
            style={{
              background: 'var(--surface)',
              padding: '24px 24px',
              cursor: 'pointer',
              borderLeft: capitalView === nav.id ? '4px solid var(--sky)' : '4px solid transparent',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 600, color: capitalView === nav.id ? 'var(--sky)' : 'var(--text)' }}>{nav.value}</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{nav.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>{nav.sub}</div>
          </div>
        ))}
      </div>
      
      {/* Share Structure View */}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 120px 1fr', borderBottom: '1px solid var(--border)' }}>
              {['Class', 'Shares (M)', '% of Basic', 'Voting', 'Description'].map((h, idx) => (
                <span key={h} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: [1, 2].includes(idx) ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {shareClasses.map((sc, i) => (
              <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 120px 1fr', borderBottom: i < shareClasses.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
                <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{sc.classType}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--sky)' }}>{sc.shares}</span>
                <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{(sc.shares / totalBasic * 100).toFixed(1)}%</span>
                <span style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>{sc.votingRights}</span>
                <span style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>{sc.description}</span>
              </div>
            ))}
            {/* Total Basic */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 120px 1fr', background: 'var(--accent-dim)' }}>
              <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>Total Basic</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', fontWeight: 600 }}>{totalBasic.toFixed(1)}</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', fontWeight: 600 }}>100%</span>
              <span style={{ padding: '12px 16px' }}></span>
              <span style={{ padding: '12px 16px' }}></span>
            </div>
            {/* FD Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 120px 1fr', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <span style={{ padding: '12px 16px', fontSize: 13 }}>Fully Diluted</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right', color: 'var(--sky)' }}>{fullyDiluted.toFixed(1)}</span>
              <span style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'Space Mono, monospace', textAlign: 'right' }}>{(fullyDiluted / totalBasic * 100).toFixed(1)}%</span>
              <span style={{ padding: '12px 16px', gridColumn: 'span 2', fontSize: 13, color: 'var(--text3)', fontWeight: 400 }}>+{(fullyDiluted - totalBasic).toFixed(1)}M from converts, options, RSUs</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 12 }}>
            Multi-class structure with 10x super-voting Class C shares. NASDAQ: ASTS.
          </div>
        </div>
      </div>

      {/* Voting Power Analysis */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#voting-power</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>Economic Ownership</div>
          {[
            { l: 'Class A (Public)', v: `${(shareClasses[0].shares / totalBasic * 100).toFixed(1)}%`, color: 'var(--sky)' },
            { l: 'Class B (Insiders)', v: `${(11.2 / totalBasic * 100).toFixed(1)}%`, color: 'var(--violet)' },
            { l: 'Class C (Abel Avellan)', v: `${(78.2 / totalBasic * 100).toFixed(1)}%`, color: 'var(--gold)' },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.color, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>Voting Power (C = 10x)</div>
          {[
            { l: 'Class A (Public)', v: `${(shareClasses[0].shares / totalVotingShares * 100).toFixed(1)}%`, color: 'var(--sky)' },
            { l: 'Class B (Insiders)', v: `${(11.2 / totalVotingShares * 100).toFixed(1)}%`, color: 'var(--violet)' },
            { l: 'Class C (Abel Avellan)', v: `${(78.2 * 10 / totalVotingShares * 100).toFixed(1)}%`, color: 'var(--gold)', hl: true },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: r.hl ? 'var(--text)' : 'var(--text3)', fontWeight: r.hl ? 600 : 400 }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.color, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8, padding: '12px 24px', fontSize: 11, color: 'var(--text3)' }}>
        <strong style={{ color: 'var(--gold)' }}>Note:</strong> Abel Avellan maintains ~73% voting control despite ~22% economic ownership via Class C super-voting shares.
      </div>
      </>
      )}

      {/* Major Shareholders View */}
      {capitalView === 'shareholders' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#major-shareholders</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Major Shareholders (Known from SEC Filings)<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 90px 80px 80px 80px 1fr', borderBottom: '1px solid var(--border)' }}>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Shareholder</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Role</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Shares (M)</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Class</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>% Own</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>% Vote</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Notes</span>
          </div>
          {majorShareholders.map((sh, i) => (
            <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 90px 80px 80px 80px 1fr', padding: '12px 16px', borderBottom: i < majorShareholders.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{sh.name}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{sh.role}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{typeof sh.shares === 'number' ? sh.shares.toFixed(1) : sh.shares}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{sh.shareClass}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{sh.pct}%</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{sh.votingPct}%</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{sh.notes}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          Data from 13F (institutional) and DEF 14A (insiders). Strategic shares based on converts and PIPE disclosures.
        </div>
        </div>
      </div>
      </>
      )}

      {/* Equity Offerings View */}
      {capitalView === 'offerings' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#equity-offerings</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Equity Offerings Timeline<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 100px 80px 90px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Date</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Event</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Type</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Amount</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Price</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Shares (M)</span>
          </div>
          {equityOfferings.map((offering, i) => (
            <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 100px 80px 90px', padding: '12px 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{offering.date}</span>
              <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{offering.event}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{offering.type}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${offering.amount}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{offering.price ? `$${offering.price.toFixed(2)}` : '\u2014'}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{offering.shares ? offering.shares.toFixed(1) : '\u2014'}</span>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 100px 80px 90px', padding: '12px 16px', background: 'var(--accent-dim)' }}>
            <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600, gridColumn: 'span 3' }}>Total Capital Raised (2019-2026)</span>
            <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right', fontWeight: 600 }}>~$6.3B</span>
            <span style={{ gridColumn: 'span 2' }}></span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          Equity + Convertibles + ATM + Registered Directs. Feb 2026: $1B converts + ~$614M RDs. Fully funded for 100+ satellites.
        </div>
        </div>
      </div>
      </>
      )}

      {/* SBC View */}
      {capitalView === 'incentives' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#equity-plans</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Stock-Based Compensation (SBC)<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Quarter</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Total SBC</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Engineering</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>G&A</span>
          </div>
          {sbcHistory.map((row, i) => (
            <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px', padding: '12px 16px', borderBottom: i < sbcHistory.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{row.quarter}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${row.sbc.toFixed(1)}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${row.engineering.toFixed(1)}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${row.gAndA.toFixed(1)}M</span>
            </div>
          ))}
        </div>

        {/* SBC Chart */}
        <div style={{ height: 192 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...sbcHistory].reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
              <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `$${v}M`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v) => [`$${Number(v).toFixed(1)}M`]} />
              <Bar dataKey="engineering" stackId="a" fill="var(--violet)" name="Engineering" />
              <Bar dataKey="gAndA" stackId="a" fill="var(--sky)" name="G&A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>2025 YTD SBC</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--violet)' }}>${sbc2025YTD.toFixed(1)}M</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Q1-Q3 2025</div>
          </div>
          <div style={{ background: 'var(--surface2)', padding: 12, borderRadius: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>FY2024 Total SBC</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--violet)' }}>${sbcFY2024.toFixed(1)}M</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Full year</div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          SBC consists of RSUs and stock options. Included in GAAP OpEx but excluded from Adjusted OpEx.
        </div>
        </div>
      </div>
      </>
      )}

      {/* Dilution Analysis View */}
      {capitalView === 'dilution' && (
      <>
      {/* Dilution KPIs */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-kpis</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Basic Shares', value: `${totalBasic.toFixed(0)}M`, sub: 'A + B + C', color: 'var(--sky)' },
          { label: 'Fully Diluted', value: `${fullyDiluted}M`, sub: `+${(fullyDiluted - totalBasic).toFixed(0)}M potential`, color: 'var(--violet)' },
          { label: 'Dilution Gap', value: `${((fullyDiluted - totalBasic) / totalBasic * 100).toFixed(1)}%`, sub: 'FD vs Basic', color: 'var(--coral)' },
          { label: 'Convert Dilution', value: `${totalConvertDilution.toFixed(1)}M`, sub: `${convertibleNotes.length} note series`, color: 'var(--gold)' },
          { label: 'ATM Remaining', value: `~$${LIQUIDITY_POSITION.atmRemaining}M`, sub: 'Shelf capacity', color: 'var(--mint)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Convertible Notes Detail */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#convertible-notes</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Outstanding Convertible Notes</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', borderLeft: '3px solid var(--violet)', fontSize: 11, color: 'var(--text3)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--violet)' }}>Dilution Risk:</strong> Converts only dilute if stock price exceeds conversion price. Company may repurchase for cash instead. Total potential: +{totalConvertDilution.toFixed(1)}M shares.
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 80px 100px 80px', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Note', 'Outstanding', 'Conv. Price', 'Rate', 'Max Shares', 'Status'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Note' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {convertibleNotes.map((note, i) => (
            <div key={note.name} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 80px 100px 80px', padding: '12px 24px', borderBottom: i < convertibleNotes.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ fontSize: 12, color: 'var(--text)' }}>{note.name}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>${note.outstandingPrincipal}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>${note.conversionPrice.toFixed(2)}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{note.couponRate}%</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--coral)', textAlign: 'right' }}>+{note.maxSharesOnConversion.toFixed(1)}M</span>
              <span style={{ fontSize: 11, color: note.status === 'outstanding' ? 'var(--mint)' : 'var(--gold)', textAlign: 'right' }}>{note.status === 'partially-repurchased' ? 'partial' : note.status}</span>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 80px 100px 80px', padding: '12px 24px', background: 'var(--accent-dim)' }}>
            <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>Total</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right', fontWeight: 600 }}>${convertibleNotes.reduce((s, n) => s + n.outstandingPrincipal, 0).toFixed(1)}M</span>
            <span></span><span></span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--coral)', textAlign: 'right', fontWeight: 600 }}>+{totalConvertDilution.toFixed(1)}M</span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Fully Diluted Share Count Scenarios */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#fd-scenarios</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Fully Diluted Scenarios</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px 100px', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Scenario', 'Source', 'New Shares', 'FD Total', 'Dilution'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Scenario' || h === 'Source' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {dilutionScenarios.map((s, i) => (
            <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px 100px', padding: '12px 24px', borderBottom: i < dilutionScenarios.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', background: s.type === 'stress' ? 'color-mix(in srgb, var(--coral) 3%, transparent)' : 'transparent', transition: 'background 0.15s' }}
              onMouseEnter={e => { if (s.type !== 'stress') e.currentTarget.style.background = 'var(--surface2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = s.type === 'stress' ? 'color-mix(in srgb, var(--coral) 3%, transparent)' : 'transparent'; }}>
              <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: s.type === 'current' ? 600 : 400 }}>{s.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{s.source}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: s.newShares > 0 ? 'var(--coral)' : 'var(--text2)', textAlign: 'right' }}>{s.newShares > 0 ? `+${s.newShares.toFixed(1)}M` : '—'}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{s.resultingFD.toFixed(1)}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: s.dilutionPct > 0 ? 'var(--coral)' : 'var(--mint)', textAlign: 'right' }}>{s.dilutionPct > 0 ? `${s.dilutionPct.toFixed(1)}%` : '—'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hypothetical Raise Dilution (reference) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dilution-at-prices</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Hypothetical Raise Dilution</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Raise Amount', 'New Shares', 'Dilution', 'Ext. Runway'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Raise Amount' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {dilutionRef.map((d, i) => (
            <div key={d.r} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 24px', borderBottom: i < dilutionRef.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text)' }}>${d.r}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{d.new.toFixed(1)}M</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--coral)', textAlign: 'right' }}>{d.dil.toFixed(1)}%</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--mint)', textAlign: 'right' }}>{d.runway.toFixed(1)}Q</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          At current price ${currentStockPrice.toFixed(2)}/share using ${LIQUIDITY_POSITION.cashAndEquiv}M cash, ${LIQUIDITY_POSITION.quarterlyBurn}M/Q burn.
        </div>
      </div>

      {/* Share Count Evolution */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#share-evolution</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Share Count Evolution (2019-2026)</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div style={{ padding: '24px 24px' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 100px 120px 1fr', borderBottom: '1px solid var(--border)' }}>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Quarter</span>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Class A (M)</span>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Implied (M)</span>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Fully Diluted (M)</span>
              <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Key Event</span>
            </div>
            {dilutionHistory.map((row, i) => (
              <div key={i} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '100px 100px 100px 120px 1fr', padding: '12px 16px', borderBottom: i < dilutionHistory.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text)' }}>{row.quarter}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{row.classA.toFixed(1)}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{row.implied.toFixed(1)}</span>
                <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>{row.fullyDiluted.toFixed(1)}</span>
                <span style={{ fontSize: 13, color: 'var(--text2)' }}>{row.event}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 256, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...dilutionHistory].reverse()}>
                <defs>
                  <linearGradient id="classAGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--sky)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--sky)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="fdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="quarter" stroke="var(--text3)" fontSize={10} />
                <YAxis stroke="var(--text3)" fontSize={10} tickFormatter={v => `${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)' }} formatter={(v) => [`${Number(v).toFixed(1)}M shares`]} />
                <Area type="monotone" dataKey="fullyDiluted" stroke="var(--gold)" fill="url(#fdGrad)" name="Fully Diluted" />
                <Area type="monotone" dataKey="classA" stroke="var(--sky)" fill="url(#classAGrad)" name="Class A" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, background: 'var(--sky)', borderRadius: 4 }}></div>
              <span style={{ color: 'var(--text2)' }}>Class A (Public)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, background: 'var(--gold)', borderRadius: 4 }}></div>
              <span style={{ color: 'var(--text2)' }}>Fully Diluted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Equity / SBC */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#employee-equity</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Employee Equity Plans / SBC</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
          <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>2025 YTD SBC (Q1-Q3)</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: 'var(--violet)', marginTop: 4 }}>${sbc2025YTD.toFixed(1)}M</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Engineering ${sbc2025Eng.toFixed(1)}M + G&A ${sbc2025GA.toFixed(1)}M</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>FY2024 Total SBC</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: 'var(--violet)', marginTop: 4 }}>${sbcFY2024.toFixed(1)}M</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Full year from 10-K</div>
          </div>
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          SBC consists of RSUs and stock options. Included in GAAP OpEx but excluded from Adjusted OpEx. Creates future dilution when vested.
        </div>
      </div>
      </>
      )}

      {/* Liquidity / Cash Runway View (consolidated from former standalone tab) */}
      {capitalView === 'liquidity' && (
      <>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#liquidity-overview</div>
      {/* Treasury Dashboard KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {[
          { label: 'Cash (8-K)', value: `$${(LIQUIDITY_POSITION.cashAndEquiv / 1000).toFixed(1)}B`, sub: 'Dec 31, 2025', color: 'var(--mint)' },
          { label: 'Pro Forma Cash', value: `$${(LIQUIDITY_POSITION.cashProForma / 1000).toFixed(1)}B`, sub: 'Post-Feb 2026', color: 'var(--sky)' },
          { label: 'Quarterly Burn', value: `$${LIQUIDITY_POSITION.quarterlyBurn}M`, sub: 'CapEx + OpEx', color: 'var(--coral)' },
          { label: 'Runway (8-K)', value: `${(LIQUIDITY_POSITION.cashAndEquiv / LIQUIDITY_POSITION.quarterlyBurn).toFixed(1)}Q`, sub: `~${(LIQUIDITY_POSITION.cashAndEquiv / LIQUIDITY_POSITION.quarterlyBurn / 4).toFixed(1)} years`, color: 'var(--gold)' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: 'var(--surface)', padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 24, fontWeight: 700, color: kpi.color, margin: '8px 0 4px' }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Cash Runway Scenarios */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#runway-scenarios</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Forward-Looking Runway Scenarios</span>
          <UpdateIndicators sources="SEC" />
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            {['Scenario', 'Cash', 'Burn/Q', 'Rev/Q', 'Runway'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', textAlign: h === 'Scenario' ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {CASH_RUNWAY_SCENARIOS.map((s, i) => (
            <div key={s.label} className="hover-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px', padding: '12px 24px', borderBottom: i < CASH_RUNWAY_SCENARIOS.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none' }}>
              <span style={{ fontSize: 12, color: 'var(--text)' }}>{s.label}</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--text2)', textAlign: 'right' }}>${(s.startingCash / 1000).toFixed(1)}B</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--coral)', textAlign: 'right' }}>${s.quarterlyBurn}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--mint)', textAlign: 'right' }}>${s.quarterlyRevenue}M</span>
              <span style={{ fontSize: 12, fontFamily: 'Space Mono, monospace', color: 'var(--gold)', textAlign: 'right' }}>{s.runwayQuarters.toFixed(1)}Q</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
          Rev/Q includes projected service revenue as burn offset. Runway extends significantly once commercial service begins generating recurring revenue.
        </div>
      </div>

      {/* Debt Outstanding */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#debt-summary</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Debt Outstanding (Pro Forma Feb 2026)</span>
        </div>
        {(() => {
          const noteColors = ['var(--cyan)', 'var(--mint)', 'var(--coral)', 'var(--sky)'];
          const debtItems = [
            ...convertibleNotes
              .filter(n => n.outstandingPrincipal >= 100)
              .sort((a, b) => b.outstandingPrincipal - a.outstandingPrincipal)
              .map((n, i) => ({
                value: `$${n.outstandingPrincipal.toLocaleString()}M`,
                label: `${n.couponRate.toFixed(2)}% (${n.maturityDate.slice(0, 4)})`,
                sub: n.notes.split('.')[0],
                color: noteColors[i] || 'var(--sky)',
              })),
            { value: `$${LIQUIDITY_POSITION.ubsLoan}M`, label: 'UBS + Secured', sub: 'Ligado related', color: 'var(--violet)' },
          ];
          const totalDebt = convertibleNotes.reduce((s, n) => s + n.outstandingPrincipal, 0) + LIQUIDITY_POSITION.ubsLoan;
          return (
            <>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${debtItems.length}, 1fr)`, gap: 1, background: 'var(--border)' }}>
              {debtItems.map(d => (
                <div key={d.label} style={{ background: 'var(--surface)', padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 16, fontWeight: 700, color: d.color }}>{d.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.6 }}>{d.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)' }}>
              Total pro forma debt: ~${totalDebt.toLocaleString()}M. Sound Point ${LIQUIDITY_POSITION.soundPointFacility}M facility available for Ligado closing.
            </div>
            </>
          );
        })()}
      </div>

      {/* Position Summary */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#position-summary</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>Cash Position</div>
          {[
            { l: 'Cash & Equivalents', v: `$${(LIQUIDITY_POSITION.cashAndEquiv / 1000).toFixed(1)}B`, hl: true },
            { l: 'Pro Forma Cash', v: `$${(LIQUIDITY_POSITION.cashProForma / 1000).toFixed(1)}B` },
            { l: 'Total Debt', v: `$${(LIQUIDITY_POSITION.totalDebtProForma / 1000).toFixed(1)}B` },
            { l: 'ATM Remaining', v: `$${LIQUIDITY_POSITION.atmRemaining}M` },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.hl ? 'var(--mint)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>Debt Facilities</div>
          {[
            { l: 'Sound Point Facility', v: `$${LIQUIDITY_POSITION.soundPointFacility}M`, hl: true },
            { l: 'UBS Loan', v: `$${LIQUIDITY_POSITION.ubsLoan}M` },
            { l: 'Quarterly Burn', v: `$${LIQUIDITY_POSITION.quarterlyBurn}M` },
            { l: 'Blended Rate', v: '~2.15%' },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: r.hl ? 'var(--violet)' : 'var(--text)', fontWeight: r.hl ? 600 : 400 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Capital Activity */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#capital-activity</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '24px 24px', background: 'linear-gradient(135deg, color-mix(in srgb, var(--mint) 5%, var(--surface)), color-mix(in srgb, var(--sky) 5%, var(--surface)))' }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 8 }}>Feb 2026 Capital Activity</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            $1B 2.25% converts issued. $46.5M of 4.25% and $250M of 2.375% repurchased. ~$614M registered directs. Net new cash ~$980M.
          </div>
        </div>
      </div>
      </>
      )}

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Capital Structure" items={[
        { term: 'Dual/Multi-Class Shares', def: 'Multiple share classes with different voting rights. Class C (10x votes) allows founder to maintain control despite minority economic ownership. Common in tech/growth companies.' },
        { term: 'Fully Diluted Shares', def: 'Total shares if all options, RSUs, warrants, and convertible securities are exercised. Always higher than basic shares outstanding. Use FD for conservative valuation.' },
        { term: 'ATM (At-The-Market) Programs', def: 'Shelf offerings allowing companies to sell shares directly into the open market at prevailing prices. Less dilutive than block offerings but can create selling pressure.' },
        { term: 'SBC (Stock-Based Compensation)', def: 'Non-cash expense for employee equity compensation (options, RSUs). Reduces reported earnings but doesn\'t affect cash flow. Creates future dilution when vested.' },
        { term: 'Cash Runway', def: 'Cash ÷ Quarterly Burn = Quarters of funding. Pre-revenue companies need sufficient runway to reach profitability. ASTS fully funded for 100+ satellites.' },
        { term: 'Convertible Debt', def: 'Hybrid instruments that can convert to equity above a strike price. May not dilute if repurchased for cash. Track conversion prices vs current stock price.' },
      ]} />
    </div>
  );
};

// SCENARIO PRESETS
// 6 Scenario Presets from Worst to Moon
// Sources: ASTS investor presentations, analyst reports, management guidance
const SCENARIO_PRESETS = {
  worst: {
    label: 'Worst',
    desc: 'Tech fails, Starlink dominates, massive dilution, regulatory issues',
    icon: '💀',
    color: '#dc2626',
    penetrationRate: 0.5,
    blendedARPU: 8,
    deploymentDelay: 4,
    terminalMargin: 25,
    terminalCapex: 25,
    dilutionRate: 15,
    competitionDiscount: 75,
    discountRate: 25,
    terminalGrowth: 1,
    regulatoryRisk: 30,
    techRisk: 35,
    competitionRisk: 40,
  },
  bear: {
    label: 'Bear',
    desc: 'Significant delays, Starlink captures majority, pricing pressure',
    icon: '🐻',
    color: '#f97316',
    penetrationRate: 1,
    blendedARPU: 12,
    deploymentDelay: 2,
    terminalMargin: 40,
    terminalCapex: 18,
    dilutionRate: 10,
    competitionDiscount: 50,
    discountRate: 20,
    terminalGrowth: 2,
    regulatoryRisk: 15,
    techRisk: 20,
    competitionRisk: 25,
  },
  base: {
    label: 'Base',
    desc: 'Consensus analyst view with moderate competition adjustment',
    icon: '📊',
    color: '#eab308',
    penetrationRate: 2,
    blendedARPU: 15,
    deploymentDelay: 1,
    terminalMargin: 50,
    terminalCapex: 12,
    dilutionRate: 6,
    competitionDiscount: 30,
    discountRate: 16,
    terminalGrowth: 2.5,
    regulatoryRisk: 8,
    techRisk: 12,
    competitionRisk: 15,
  },
  mgmt: {
    label: 'Mgmt',
    desc: 'Management guidance: 5B TAM, 50/50 revenue share, 85%+ EBITDA margin',
    icon: '📈',
    color: '#22c55e',
    penetrationRate: 3,
    blendedARPU: 18,
    deploymentDelay: 0,
    terminalMargin: 60,
    terminalCapex: 10,
    dilutionRate: 4,
    competitionDiscount: 20,
    discountRate: 14,
    terminalGrowth: 3,
    regulatoryRisk: 5,
    techRisk: 8,
    competitionRisk: 10,
  },
  bull: {
    label: 'Bull',
    desc: 'Faster deployment, premium ARPU, limited competition impact',
    icon: '🐂',
    color: '#06b6d4',
    penetrationRate: 5,
    blendedARPU: 22,
    deploymentDelay: -1,
    terminalMargin: 70,
    terminalCapex: 8,
    dilutionRate: 3,
    competitionDiscount: 12,
    discountRate: 12,
    terminalGrowth: 3.5,
    regulatoryRisk: 3,
    techRisk: 5,
    competitionRisk: 5,
  },
  moon: {
    label: 'Moon',
    desc: 'Category winner: 10%+ penetration, premium pricing, minimal competition',
    icon: '🚀',
    color: '#a855f7',
    penetrationRate: 10,
    blendedARPU: 30,
    deploymentDelay: -2,
    terminalMargin: 80,
    terminalCapex: 5,
    dilutionRate: 2,
    competitionDiscount: 5,
    discountRate: 10,
    terminalGrowth: 4,
    regulatoryRisk: 2,
    techRisk: 2,
    competitionRisk: 3,
  },
};

// Parameter card with 8 options and comprehensive explanation
const ParameterCard = ({
  title,
  explanation,
  options,
  value,
  onChange,
  format = '',
  inverse = false, // true = lower values are bullish (risk, capex, dilution)
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
    if (format === 'yr') return v === 0 ? 'On-time' : v > 0 ? `+${v}yr` : `${v}yr`;
    if (format === 'M') return `${(v/1000).toFixed(1)}B`;
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

  // Colors map directly to position: idx 0 = red (bearish), idx 5 = green (bullish)
  // Options arrays are always ordered from bearish to bullish scenarios
  // (for inverse params like risk/dilution, HIGH values come first since they're bearish)
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 24px', marginBottom: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>{title}</div>
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

// MODEL TAB - Assumptions configuration
const ModelTab = ({
  partnerReach, setPartnerReach,
  penetrationRate, setPenetrationRate,
  blendedARPU, setBlendedARPU,
  revenueShare, setRevenueShare,
  deploymentDelay, setDeploymentDelay,
  terminalMargin, setTerminalMargin,
  terminalCapex, setTerminalCapex,
  dilutionRate, setDilutionRate,
  competitionDiscount, setCompetitionDiscount,
  discountRate, setDiscountRate,
  terminalGrowth, setTerminalGrowth,
  regulatoryRisk, setRegulatoryRisk,
  techRisk, setTechRisk,
  competitionRisk, setCompetitionRisk,
  selectedScenario, setSelectedScenario,
  currentShares, currentStockPrice, cashOnHand, totalDebt,
}) => {

  type ScenarioKey = 'worst' | 'bear' | 'base' | 'mgmt' | 'bull' | 'moon';

  const applyScenario = (scenario: ScenarioKey) => {
    const p = SCENARIO_PRESETS[scenario];
    setPenetrationRate(p.penetrationRate);
    setBlendedARPU(p.blendedARPU);
    setDeploymentDelay(p.deploymentDelay);
    setTerminalMargin(p.terminalMargin);
    setTerminalCapex(p.terminalCapex);
    setDilutionRate(p.dilutionRate);
    setCompetitionDiscount(p.competitionDiscount);
    setDiscountRate(p.discountRate);
    setTerminalGrowth(p.terminalGrowth);
    setRegulatoryRisk(p.regulatoryRisk);
    setTechRisk(p.techRisk);
    setCompetitionRisk(p.competitionRisk);
    setSelectedScenario(scenario);
  };

  // Get current scenario info (use preset data or custom)
  const currentPreset = SCENARIO_PRESETS[selectedScenario as ScenarioKey];
  const scenario = currentPreset
    ? { name: currentPreset.label, color: currentPreset.color, icon: currentPreset.icon }
    : { name: 'Custom', color: '#a855f7', icon: '⚙️' };

  // ============================================================================
  // DCF CALCULATION - Step by step with proper formulas
  // ============================================================================

  // STEP 1: Calculate Terminal Year Subscribers (2030)
  // Formula: Partner Reach × Penetration Rate × (1 - Competition Loss)
  const terminalSubs = partnerReach * (penetrationRate / 100) * (1 - competitionDiscount / 100);
  // Units: M subscribers

  // STEP 2: Calculate Terminal Year Gross Revenue
  // Formula: Subscribers × ARPU × 12 months
  const terminalGrossRev = terminalSubs * blendedARPU * 12 / 1000;
  // Units: $B (divided by 1000 to convert M×$ to B)

  // STEP 3: Calculate ASTS's Share of Revenue
  // Formula: Gross Revenue × Revenue Share %
  const terminalRev = terminalGrossRev * (revenueShare / 100);
  // Units: $B

  // STEP 4: Calculate Terminal EBITDA
  // Formula: Revenue × EBITDA Margin %
  const terminalEBITDA = terminalRev * (terminalMargin / 100);
  // Units: $B

  // STEP 5: Calculate Terminal Free Cash Flow
  // Formula: Revenue × (EBITDA Margin - CapEx %)
  // This is a simplification: FCF ≈ EBITDA - CapEx (ignoring taxes, working capital)
  const terminalFCF = terminalRev * ((terminalMargin - terminalCapex) / 100);
  // Units: $B

  // STEP 6: Calculate Terminal Enterprise Value using Gordon Growth Model
  // Formula: TV = FCF × (1 + g) / (r - g)  [perpetuity formula]
  // Simplified: TV = FCF / (r - g) when FCF is already terminal year
  const discountRateDecimal = discountRate / 100;
  const terminalGrowthDecimal = terminalGrowth / 100;
  const spread = discountRateDecimal - terminalGrowthDecimal;
  // Gordon Growth Model requires positive spread to avoid division by zero
  // MIN_SPREAD_FOR_GORDON_GROWTH = 0.01 (1%) threshold prevents invalid calculations
  const terminalEV = spread > 0.01 ? terminalFCF / spread : 0;
  // Units: $B
  // Note: This is the Enterprise Value AT 2030, not today

  // STEP 7: Discount Terminal Value back to Present
  // Formula: PV = FV / (1 + r)^n
  const yearsToTerminal = 5 + deploymentDelay;
  const discountYears = Math.max(yearsToTerminal, 1);
  const discountFactor = Math.pow(1 + discountRateDecimal, discountYears);
  const presentValueEV = terminalEV / discountFactor;
  // Units: $B (today's value)

  // STEP 8: Calculate Risk Factor (probability of success)
  // Formula: (1 - Risk1) × (1 - Risk2) × (1 - Risk3)
  // This represents probability that none of the risks materialize
  // 
  // ASSUMPTION: Risks are independent. If risks are correlated (e.g., regulatory delays
  // cause tech delays), this formula overestimates success probability. For correlated
  // risks, consider: riskFactor = 1 - max(risk1, risk2, risk3) or a correlation matrix.
  const riskFactor = (1 - regulatoryRisk/100) * (1 - techRisk/100) * (1 - competitionRisk/100);
  // Range: 0 to 1

  // STEP 9: Apply Risk Factor to get Probability-Weighted EV
  // Formula: PV × Probability of Success
  const riskAdjustedEV = presentValueEV * riskFactor;
  // Units: $B (risk-adjusted present value)

  // STEP 10: Calculate Net Debt
  // Formula: Total Debt - Cash
  // Positive = net debt (reduces equity), Negative = net cash (increases equity)
  // Convert from $M to $B: divide by THOUSAND (1000)
  const netDebtB = (totalDebt - cashOnHand) / 1000;
  // Units: $B

  // STEP 11: Calculate Equity Value
  // Formula: Enterprise Value - Net Debt
  // If net cash (negative net debt), this adds to equity value
  const equityValue = riskAdjustedEV - netDebtB;
  // Units: $B

  // STEP 12: Calculate Diluted Shares Outstanding at Terminal Year
  // Formula: Current Shares × (1 + Dilution Rate)^Years
  const finalDilutedShares = currentShares * Math.pow(1 + dilutionRate / 100, Math.max(discountYears, 1));
  // Units: M shares

  // STEP 13: Calculate Target Stock Price
  // Formula: Equity Value / Diluted Shares
  // Convert $B to $M: multiply by THOUSAND (1000), then divide by M shares = $/share
  const targetStockPrice = equityValue > 0 && finalDilutedShares > 0
    ? (equityValue * 1000) / finalDilutedShares // Units: $B × 1000 ÷ M shares = $/share
    : 0;
  // Units: $/share

  // STEP 14: Calculate Implied Upside/Downside
  // Formula: (Target Price - Current Price) / Current Price × 100
  const impliedUpside = currentStockPrice > 0
    ? ((targetStockPrice - currentStockPrice) / currentStockPrice) * 100
    : 0;
  // Units: %

  // STEP 15: Calculate Valuation Multiples (at Terminal Year 2030)
  // These use TERMINAL EV (before discounting) for proper comparison
  const terminalEVperRev = terminalRev > 0 ? terminalEV / terminalRev : 0;
  const terminalEVperEBITDA = terminalEBITDA > 0 ? terminalEV / terminalEBITDA : 0;
  const terminalFCFyield = terminalEV > 0 ? (terminalFCF / terminalEV) * 100 : 0;

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
              const preset = SCENARIO_PRESETS[s];
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
                    {preset.penetrationRate}%
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                    ${preset.blendedARPU}/mo
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

          {/* SUBSCRIBER & REVENUE PARAMETERS */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#revenue-model</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Subscriber & Revenue Model</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <ParameterCard
              title="Penetration Rate (%)"
              explanation="Percentage of partner MNO subscribers who adopt ASTS service. Management targets 3-5%. Analyst estimates range 1-10%. Higher penetration = more subscribers = more revenue. Depends on pricing, network quality, and Starlink competition."
              options={[0.5, 1, 2, 3, 5, 10]}
              value={penetrationRate}
              onChange={v => { setPenetrationRate(v); setSelectedScenario('custom'); }}
              format="%"
            />
            <ParameterCard
              title="Blended ARPU ($/month)"
              explanation="Average Revenue Per User per month. Blended across regions: US ~$25, LatAm ~$15, Africa/Asia ~$5-10. Management guidance: $15-20 blended. Some analysts model $2-4 for emerging markets only."
              options={[8, 12, 15, 18, 22, 30]}
              value={blendedARPU}
              onChange={v => { setBlendedARPU(v); setSelectedScenario('custom'); }}
              format="$"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <ParameterCard
              title="Revenue Share (%)"
              explanation="ASTS's share of gross subscriber revenue. Standard MNO deals: 50/50. Some partners may negotiate 60/40 in their favor. Higher share = more revenue flows to ASTS. Could vary by region."
              options={[30, 40, 50, 52, 55, 60]}
              value={revenueShare}
              onChange={v => { setRevenueShare(v); setSelectedScenario('custom'); }}
              format="%"
            />
            <ParameterCard
              title="Competition Discount (%)"
              explanation="Revenue reduction due to Starlink and competitors. 0% = ASTS monopoly. 75% = competitors capture most of market. Key risk: Starlink Direct-to-Cell has massive satellite fleet advantage."
              options={[75, 50, 30, 20, 12, 5]}
              value={competitionDiscount}
              onChange={v => { setCompetitionDiscount(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
          </div>

          {/* OPERATING PARAMETERS */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#operating-model</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Operating Assumptions</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <ParameterCard
              title="Terminal EBITDA Margin (%)"
              explanation="Operating margin at scale. Satellite businesses typically achieve 50-70% EBITDA margins. ASTS management targets 85%+. Lower margins possible if pricing pressure or higher opex. 25-30% if competition is brutal."
              options={[25, 40, 50, 60, 70, 80]}
              value={terminalMargin}
              onChange={v => { setTerminalMargin(v); setSelectedScenario('custom'); }}
              format="%"
            />
            <ParameterCard
              title="Maintenance CapEx (% Rev)"
              explanation="Ongoing capital expenditure for satellite replacement (7-10yr lifespan). 5-10% for efficient operators, 15-25% if constellation needs frequent replacement. Lower = more free cash flow."
              options={[25, 18, 12, 10, 8, 5]}
              value={terminalCapex}
              onChange={v => { setTerminalCapex(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <ParameterCard
              title="Annual Dilution (%)"
              explanation="Share count increase from stock comp, warrants, and equity raises. ASTS is capital-intensive. 2-4% = well-funded. 10-15% = ongoing raises needed. High dilution erodes per-share value."
              options={[15, 10, 6, 4, 3, 2]}
              value={dilutionRate}
              onChange={v => { setDilutionRate(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Deployment Delay (Years)"
              explanation="Schedule variance from plan. Negative = ahead of schedule. +4yr = major delays, funding issues. Delays = later revenue, more cash burn, potential dilution. ASTS now has $3.2B cash runway."
              options={[4, 2, 1, 0, -1, -2]}
              value={deploymentDelay}
              onChange={v => { setDeploymentDelay(v); setSelectedScenario('custom'); }}
              format="yr"
              inverse
            />
          </div>

          {/* VALUATION PARAMETERS */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#valuation-params</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Valuation Parameters</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <ParameterCard
              title="Discount Rate / WACC (%)"
              explanation="Required return for discounting future cash flows. 10% = blue chip. 15-20% = high-growth tech. 25%+ = speculative pre-revenue. Lower rates justified as execution de-risks."
              options={[25, 20, 16, 14, 12, 10]}
              value={discountRate}
              onChange={v => { setDiscountRate(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Terminal Growth Rate (%)"
              explanation="Perpetual growth rate for Gordon Growth Model. Should not exceed long-term GDP (~3%). 1% = conservative. 4-5% = aggressive (justified by emerging market connectivity growth)."
              options={[1, 2, 2.5, 3, 3.5, 4]}
              value={terminalGrowth}
              onChange={v => { setTerminalGrowth(v); setSelectedScenario('custom'); }}
              format="%"
            />
          </div>

          {/* RISK PARAMETERS */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#risk-factors</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Risk Probability Factors</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text3)' }}>{(riskFactor * 100).toFixed(0)}% success</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <ParameterCard
              title="Regulatory Risk (%)"
              explanation="Probability of adverse regulatory action. ASTS has FCC approval but needs country-by-country clearance. 2-5% = most approvals done. 20-30% = major regulatory uncertainty remains."
              options={[30, 15, 8, 5, 3, 2]}
              value={regulatoryRisk}
              onChange={v => { setRegulatoryRisk(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Technology Risk (%)"
              explanation="Probability of technology failure. Decreases with each successful satellite and commercial service proof. 2-5% = proven tech. 25-35% = significant unknowns remain."
              options={[35, 20, 12, 8, 5, 2]}
              value={techRisk}
              onChange={v => { setTechRisk(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
            <ParameterCard
              title="Competition Risk (%)"
              explanation="Probability competitors capture majority of market or drive pricing to unprofitable levels. Different from Competition Discount - this is binary 'existential threat' probability."
              options={[40, 25, 15, 10, 5, 3]}
              value={competitionRisk}
              onChange={v => { setCompetitionRisk(v); setSelectedScenario('custom'); }}
              format="%"
              inverse
            />
          </div>

          {/* DCF VALUATION OUTPUT */}
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#dcf-output</div>
          <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DCF Output — 2030 Terminal Year</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Primary Output — Hero KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'color-mix(in srgb, var(--accent) 30%, var(--border))', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 600 }}>Target Price</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 32, fontWeight: 700, color: 'var(--accent)', margin: '6px 0 4px' }}>{targetStockPrice > 0 ? `$${targetStockPrice.toFixed(0)}` : 'N/A'}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>vs ${currentStockPrice} current</div>
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
              { label: 'PV Enterprise Value', value: `$${riskAdjustedEV.toFixed(1)}B`, sub: `${(riskFactor * 100).toFixed(0)}% prob`, color: 'var(--text)' },
              { label: 'Equity Value', value: `$${equityValue.toFixed(1)}B`, sub: netDebtB < 0 ? `+$${Math.abs(netDebtB).toFixed(2)}B cash` : `-$${netDebtB.toFixed(2)}B debt`, color: 'var(--text)' },
              { label: '2030 Subscribers', value: `${terminalSubs.toFixed(0)}M`, sub: `${penetrationRate}% penetration`, color: 'var(--text)' },
              { label: '2030 Revenue', value: `$${terminalRev.toFixed(2)}B`, sub: `${revenueShare}% share`, color: 'var(--accent)' },
              { label: '2030 EBITDA', value: `$${terminalEBITDA.toFixed(2)}B`, sub: `${terminalMargin}% margin`, color: 'var(--text)' },
              { label: '2030 FCF', value: `$${terminalFCF.toFixed(2)}B`, sub: `${terminalMargin - terminalCapex}% FCF margin`, color: 'var(--text)' },
              { label: 'EV/Revenue', value: `${terminalEVperRev.toFixed(1)}x`, sub: '2030 terminal', color: 'var(--text)' },
              { label: 'EV/EBITDA', value: `${terminalEVperEBITDA.toFixed(1)}x`, sub: '2030 terminal', color: 'var(--text)' },
              { label: 'FCF Yield', value: `${terminalFCFyield.toFixed(1)}%`, sub: 'FCF / EV', color: 'var(--text)' },
              { label: 'Diluted Shares', value: `${finalDilutedShares.toFixed(0)}M`, sub: `${dilutionRate}%/yr × ${discountYears}yr`, color: 'var(--text)' },
              { label: 'Terminal EV', value: `$${terminalEV.toFixed(1)}B`, sub: 'Before discounting', color: 'var(--text)' },
              { label: 'Discount Factor', value: `${discountFactor.toFixed(3)}x`, sub: `${discountRate}% × ${discountYears}yr`, color: 'var(--text)' },
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
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>DCF Valuation — Gordon Growth Model</div>
              <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0, lineHeight: 1.7 }}>
                Terminal value approach with Gordon Growth Model, discounted to present value and adjusted for execution risk.
                Terminal year: {2025 + discountYears} ({discountYears} years).
              </p>
            </div>
            <div style={{ padding: '24px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { step: '1-5', title: 'Terminal Year Metrics', color: 'var(--accent)', items: [
                    { label: 'Subscribers', formula: `${(partnerReach/1000).toFixed(1)}B × ${penetrationRate}% × (1 - ${competitionDiscount}%)`, result: `${terminalSubs.toFixed(0)}M` },
                    { label: 'Gross Revenue', formula: `${terminalSubs.toFixed(0)}M × $${blendedARPU} × 12`, result: `$${terminalGrossRev.toFixed(2)}B` },
                    { label: 'ASTS Revenue', formula: `$${terminalGrossRev.toFixed(2)}B × ${revenueShare}%`, result: `$${terminalRev.toFixed(2)}B` },
                    { label: 'EBITDA', formula: `$${terminalRev.toFixed(2)}B × ${terminalMargin}%`, result: `$${terminalEBITDA.toFixed(2)}B` },
                    { label: 'FCF', formula: `$${terminalRev.toFixed(2)}B × ${terminalMargin - terminalCapex}%`, result: `$${terminalFCF.toFixed(2)}B` },
                  ]},
                  { step: '6-7', title: 'Terminal Value & Discounting', color: 'var(--sky)', items: [
                    { label: 'Gordon Growth TV', formula: `FCF ÷ (r - g) = $${terminalFCF.toFixed(2)}B ÷ ${(spread * 100).toFixed(1)}%`, result: `$${terminalEV.toFixed(1)}B` },
                    { label: 'Present Value', formula: `$${terminalEV.toFixed(1)}B ÷ (1 + ${discountRate}%)^${discountYears}`, result: `$${presentValueEV.toFixed(1)}B` },
                  ]},
                  { step: '8-9', title: 'Risk Adjustment', color: 'var(--gold)', items: [
                    { label: 'Risk Factor', formula: `(1-${regulatoryRisk}%) × (1-${techRisk}%) × (1-${competitionRisk}%)`, result: `${(riskFactor * 100).toFixed(1)}%` },
                    { label: 'Risk-Adj EV', formula: `$${presentValueEV.toFixed(1)}B × ${(riskFactor * 100).toFixed(1)}%`, result: `$${riskAdjustedEV.toFixed(1)}B` },
                  ]},
                  { step: '10-14', title: 'Equity Value & Target Price', color: 'var(--mint)', items: [
                    { label: 'Net Debt', formula: `$${(totalDebt/1000).toFixed(2)}B - $${(cashOnHand/1000).toFixed(2)}B`, result: `$${netDebtB.toFixed(2)}B` },
                    { label: 'Equity Value', formula: `$${riskAdjustedEV.toFixed(1)}B - $${netDebtB.toFixed(2)}B`, result: `$${equityValue.toFixed(1)}B` },
                    { label: 'Diluted Shares', formula: `${currentShares}M × (1+${dilutionRate}%)^${discountYears}`, result: `${finalDilutedShares.toFixed(0)}M` },
                    { label: 'Target Price', formula: `$${equityValue.toFixed(1)}B ÷ ${finalDilutedShares.toFixed(0)}M`, result: `$${targetStockPrice.toFixed(2)}` },
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
                  <li>Terminal year: {2025 + discountYears} ({discountYears} years out)</li>
                  <li>FCF margin = EBITDA margin - CapEx (simplified, ignores taxes/WC)</li>
                  <li>Risk factors are multiplicative (independent events)</li>
                  <li>Gordon Growth assumes perpetual {terminalGrowth}% growth after terminal year</li>
                </ul>
              </div>
            </div>
          </div>
        </>
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
      label: '🐻 Bear', color: '#f97316',
      desc: `Major delays, 1% penetration. ${hc.label}: $${scalePreset(anchor.bear).baseRev}B revenue.`
    },
    base: { 
      ...scalePreset(anchor.base),
      label: '📊 Base', color: '#eab308',
      desc: `Plan execution, 2.5% penetration. ${hc.label}: $${scalePreset(anchor.base).baseRev}B revenue.`
    },
    mgmt: { 
      ...scalePreset(anchor.mgmt),
      label: '🎯 Mgmt', color: '#22c55e',
      desc: `Management targets, 3.5% penetration. ${hc.label}: $${scalePreset(anchor.mgmt).baseRev}B revenue.`
    },
    bull: { 
      ...scalePreset(anchor.bull),
      label: '🐂 Bull', color: '#06b6d4',
      desc: `Outperformance, 5% penetration. ${hc.label}: $${scalePreset(anchor.bull).baseRev}B revenue.`
    },
    custom: { 
      baseRev: baseRev, margin: margin, mult: mult, revVol: revVol, launchRisk: launchRisk, regRisk: regRisk, 
      label: '⚙️ Custom', color: '#8b5cf6',
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
    // Cap simulations for performance: MAX_MONTE_CARLO_SIMULATIONS = 10,000
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
      // Log-normal distribution ensures: (a) revenue stays positive, (b) realistic right-skew
      // X = exp(μ + σZ) where Z ~ N(0,1)
      // We set μ = -σ²/2 so that E[exp(μ + σZ)] = 1 (mean of log-normal factor is 1)
      // This means: E[baseRev × multiplier × factor] = baseRev × multiplier × 1
      // Note: The multiplier accounts for binary risk events, so final revenue may differ from baseRev
      const sigma = revVol / 100;
      const mu = -0.5 * sigma * sigma; // LOG_NORMAL_ADJUSTMENT = -0.5 ensures E[exp(μ + σZ)] = 1
      const logNormalFactor = Math.exp(mu + sigma * randn());
      
      // Final revenue outcome: base revenue × risk multiplier × log-normal volatility factor
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
    const riskFreeRate = 0.04; // RISK_FREE_RATE = 4% annual (standard risk-free rate assumption)
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
    // Sortino Ratio: downside deviation uses ALL observations but only squares below-target returns
    const downsideVariance = returns.reduce((a, r) => a + (r < riskFreeRate ? Math.pow(r - riskFreeRate, 2) : 0), 0) / n;
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
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-header</div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Revenue-Based Valuation Simulation<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Monte Carlo<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>
          Runs {sim.n.toLocaleString()} simulations over {years} years with binary risk events (launch failure, regulatory)
          and log-normal revenue distribution. Terminal value discounted to present.
        </p>
      </div>

      {/* Scenario Presets */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-scenarios</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          {Object.entries(presets).filter(([key]) => key !== 'mgmt').map(([key, p]) => {
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
                  ${p.baseRev}B
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                  {p.margin}% margin
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
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Revenue Model</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>BASE REVENUE ($B)</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Expected terminal year revenue. Source: DCF model or analyst estimates.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[1.5, 2.5, 4.0, 5.5, 8.0, 12.0].map((opt, idx) => {
                const isActive = Math.abs(baseRev - opt) < 0.1;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setBaseRev)(opt)} style={{
                    padding: '12px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
                    border: isActive ? `2px solid ${colors.border}` : '1px solid var(--border)',
                    background: isActive ? colors.bg : 'var(--surface2)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? colors.text : 'var(--text3)',
                    transition: 'all 0.15s'
                  }}>${opt}</div>
                );
              })}
            </div>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>REVENUE VOLATILITY (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Log-normal std dev. 35% = outcomes range 0.7x-1.4x base revenue.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[50, 45, 40, 35, 30, 25].map((opt, idx) => {
                const isActive = revVol === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setRevVol)(opt)} style={{
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
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Operating Model</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>EBITDA MARGIN (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Terminal margin at scale. Satellite/telecom: 40-60%. Operating leverage applies.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[25, 35, 40, 45, 52, 58].map((opt, idx) => {
                const isActive = margin === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setMargin)(opt)} style={{
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
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>EV/EBITDA MULTIPLE</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Terminal valuation multiple. Growth: 10-15x, Mature telcos: 6-8x.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[6, 8, 10, 12, 14, 16].map((opt, idx) => {
                const isActive = mult === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setMult)(opt)} style={{
                    padding: '12px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', fontSize: 12,
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

        <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Risk Factors</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>LAUNCH RISK (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Prob. of constellation failure. If triggered: -40% revenue.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[30, 25, 20, 15, 10, 5].map((opt, idx) => {
                const isActive = launchRisk === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setLaunchRisk)(opt)} style={{
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
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>REGULATORY RISK (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Prob. of FCC/spectrum issues. If triggered: -30% revenue.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[25, 20, 15, 10, 8, 5].map((opt, idx) => {
                const isActive = regRisk === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => updateParam(setRegRisk)(opt)} style={{
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
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>DISCOUNT RATE (%)</span></div>
            <div style={{ padding: '24px 24px' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>
              Required return / WACC. Pre-revenue space: 12-18%.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[20, 18, 16, 15, 13, 11].map((opt, idx) => {
                const isActive = discountRate === opt;
                const colors = [
                  { border: 'var(--coral)', bg: 'rgba(248,113,113,0.2)', text: 'var(--coral)' },
                  { border: '#f97316', bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
                  { border: 'var(--gold)', bg: 'rgba(251,191,36,0.15)', text: 'var(--gold)' },
                  { border: '#a3e635', bg: 'rgba(163,230,53,0.15)', text: '#84cc16' },
                  { border: 'var(--mint)', bg: 'rgba(52,211,153,0.15)', text: 'var(--mint)' },
                  { border: '#22c55e', bg: 'rgba(34,197,94,0.2)', text: '#22c55e' },
                ][idx];
                return (
                  <div key={opt} onClick={() => setDiscountRate(opt)} style={{
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

        {/* Run Button */}
        <button onClick={() => setRunKey(k => k + 1)} style={{
          width: '100%', padding: '12px 16px', background: 'var(--accent)', color: 'var(--bg1)',
          border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14, transition: 'all 0.15s'
        }}>🎲 Run Simulation</button>
      </div>

      {/* Percentile Distribution */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-percentiles</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
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
            const pctChange = ((row.value / currentStockPrice - 1) * 100);
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: '1px solid var(--border)', background: row.highlight ? 'var(--accent-dim)' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = 'var(--surface2)'; }}
                onMouseLeave={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <span style={{ fontWeight: row.highlight ? 600 : 400, color: row.highlight ? 'var(--accent)' : 'var(--text2)' }}>{row.label}</span>
                <span style={{ textAlign: 'right', fontFamily: 'Space Mono', fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--accent)' : 'var(--text)' }}>${row.value.toFixed(2)}</span>
                <span style={{ textAlign: 'right', fontFamily: 'Space Mono', color: 'var(--text2)' }}>${(row.value - currentStockPrice).toFixed(2)}</span>
                <span style={{ textAlign: 'right', fontFamily: 'Space Mono', fontWeight: 500, color: pctChange >= 0 ? 'var(--mint)' : 'var(--red)' }}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Metrics */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-risk-metrics</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px 24px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>
            <span style={{ textAlign: 'left' }}>Risk Metric</span>
            <span style={{ textAlign: 'right' }}>Value</span>
            <span style={{ textAlign: 'left' }}>Interpretation</span>
          </div>
          {[
            { label: 'Win Probability', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.winProbability > 50 ? 'var(--mint)' : 'var(--red)' }}>{sim.winProbability.toFixed(1)}%</span>, interp: 'Prob. of exceeding current price' },
            { label: 'Expected Value', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600 }}>${sim.mean.toFixed(2)}</span>, interp: 'Mean simulated fair value' },
            { label: 'Sharpe Ratio', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.sharpe > 1 ? 'var(--mint)' : sim.sharpe > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sharpe.toFixed(2)}</span>, interp: sim.sharpe > 1 ? 'Excellent risk-adj return' : sim.sharpe > 0.5 ? 'Good risk-adj return' : 'Moderate risk-adj return' },
            { label: 'Sortino Ratio', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: sim.sortino > 1 ? 'var(--mint)' : sim.sortino > 0.5 ? 'var(--gold)' : 'var(--text2)' }}>{sim.sortino.toFixed(2)}</span>, interp: 'Downside-adjusted return' },
            { label: 'VaR (5%)', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{sim.var5.toFixed(1)}%</span>, interp: '95% confidence floor' },
            { label: 'CVaR (5%)', value: <span style={{ fontFamily: 'Space Mono', fontWeight: 600, color: 'var(--red)' }}>{sim.cvar5.toFixed(1)}%</span>, interp: 'Expected tail loss' },
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
              <ReferenceLine x={currentStockPrice} stroke="#fff" strokeDasharray="5 5" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)' }}>
            <span>White line = current price (${currentStockPrice})</span>
            <span>Simulations: {sim.n.toLocaleString()}</span>
          </div>
          </div>
        </div>
      </div>

      {/* CFA Notes */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#mc-notes</div>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — Monte Carlo Simulation" items={[
          { term: 'Monte Carlo Method', def: 'Run thousands of random simulations with input volatility. Distribution of outcomes shows probability-weighted fair values.' },
          { term: 'Revenue Volatility', def: 'Standard deviation of revenue growth assumptions. Higher volatility = wider distribution of outcomes.' },
          { term: 'Binary Risk Events', def: 'Launch failure, regulatory rejection. Model as probability of total loss in affected scenarios.' },
          { term: 'Percentile Interpretation', def: 'P5 = 5% chance of being below this. P50 = median. P95 = 5% chance of exceeding.' },
          { term: 'VaR (Value at Risk)', def: 'The loss level that won\'t be exceeded with 95% confidence. Shows downside risk.' },
          { term: 'Expected Value', def: 'Probability-weighted average of all outcomes. Compare to current price for buy/sell signal.' },
        ]} />
      </div>
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
    latestEvent: 'MDA SHIELD Contract',
    latestEventDate: 'Jan 16, 2026',

    // Last press release processed (for tracking)
    lastPressRelease: 'January 16, 2026',
    lastPressReleaseTitle: 'MDA SHIELD Prime Contract Award',
    
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

  const colorStyles: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: 'var(--sky)' },
    purple: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', text: 'var(--violet)' },
    yellow: { bg: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)', text: 'var(--gold)' },
    green: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: 'var(--mint)' },
    orange: { bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.3)', text: 'var(--gold)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)', text: 'var(--cyan)' },
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: 8, background: 'var(--surface2)', borderRadius: 4
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}><div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>SEC Filing Tracker</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: '24px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filing History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={rowStyle}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>First SEC Filing</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: 'var(--cyan)' }}>{filingData.firstFiling}</span>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{filingData.firstFilingNote}</div>
              </div>
            </div>
            <div style={rowStyle}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>Latest Event</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 13, color: 'var(--gold)' }}>{filingData.latestEvent}</span>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{filingData.latestEventDate}</div>
              </div>
            </div>
            <div style={{ ...rowStyle, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 13 }}>
            {Object.entries(filingData.filings).map(([type, info]) => {
              const style = colorStyles[info.color] || colorStyles.cyan;
              return (
                <div key={type} style={{ padding: 8, border: `1px solid ${style.border}`, borderRadius: 4, background: style.bg }}>
                  <div style={{ fontWeight: 500, color: style.text }}>{type}</div>
                  <div style={{ color: 'var(--text3)' }}>{info.date}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{info.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text3)' }}>
        CIK: {filingData.cik} | {filingData.exchange}: {filingData.ticker} | Update dates as new filings are processed
      </div>
    </div>
  );
};

// QUARTERLY METRICS PANEL - Historical data toggle extracted from 10-K filings
const QuarterlyMetricsPanel = () => {
  // Historical quarterly data from 10-K and 10-Q filings (source: SEC EDGAR)
  const quarterlyData = ASTS_QUARTERLY_DATA;

  const quarters = Object.keys(quarterlyData);
  
  // State for OpEx breakdown quarter selector
  const [opExQuarter, setOpExQuarter] = useState('Q3 2025');
  
  // Get quarters that have OpEx breakdown data
  const opExQuarters = quarters.filter(q => quarterlyData[q].opExEngineering);
  
  const metrics = [
    { label: 'Cash & Equiv.*', key: 'cashAndEquiv', tooltipKey: 'cashOnly', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, color: v => v === null ? undefined : 'var(--mint)', unit: '$M' },
    { label: 'Total Debt*', key: 'totalDebt', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, color: () => undefined, unit: '$M' },
    { label: 'Revenue', key: 'revenue', format: v => v === null ? '—' : v === 0 ? '$0' : `$${v.toFixed(1)}M`, color: v => v === null ? undefined : 'var(--mint)', unit: '$M' },
    { label: 'OpEx', key: 'opEx', format: v => v === null ? '—' : `$${v.toFixed(0)}M`, color: v => v === null ? undefined : 'var(--coral)', unit: '$M' },
    { label: 'Net Income', key: 'netLoss', format: v => v === null ? '—' : v >= 0 ? `$${v.toFixed(0)}M` : `-$${Math.abs(v).toFixed(0)}M`, color: v => v === null ? undefined : v >= 0 ? 'var(--mint)' : 'var(--coral)', unit: '$M' },
    { label: 'Stock Price', key: 'stockPrice', format: v => v === null ? '—' : v === 0 ? 'Private' : `$${v.toFixed(2)}`, color: () => undefined, unit: '$' },
    { label: 'Shares (A)', key: 'sharesOutstanding', format: v => v === null ? '—' : v === 0 ? 'Private' : `${v.toFixed(0)}M`, color: v => v === null || v === 0 ? undefined : 'var(--gold)', unit: 'M' },
    { label: 'Satellites', key: 'satellites', format: v => v === null ? '—' : v, color: v => v === null ? undefined : 'var(--cyan)', unit: '' },
    { label: 'Employees*', key: 'employees', format: v => v === null ? '—' : v === 0 ? '—' : v.toLocaleString(), color: () => undefined, unit: '' },
    { label: 'Agreements', key: 'definitiveAgreements', format: v => v === null ? '—' : v, color: () => undefined, unit: '' },
    { label: 'MOUs', key: 'mous', format: v => v === null ? '—' : v, color: () => undefined, unit: '' },
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
    <>
      {/* #quarterly-metrics */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#quarterly-metrics</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Key Metrics Evolution<UpdateIndicators sources="SEC" /></span>
      </div>
      <div style={{ padding: '24px 24px' }}>
      {/* Dynamic Summary Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid var(--cyan)', fontSize: 11, fontWeight: 500, background: 'rgba(34,211,238,0.15)', color: 'var(--cyan)' }}>
          {summaryStats.quarterCount} quarters of data ({summaryStats.firstQuarter} - {summaryStats.lastQuarter})
        </span>
        <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid var(--mint)', fontSize: 11, fontWeight: 500, background: 'rgba(34,197,94,0.15)', color: 'var(--mint)' }}>
          Cash: {summaryStats.cashRange.first !== null ? `$${summaryStats.cashRange.first.toFixed(0)}M` : 'N/A'} → {summaryStats.cashRange.last !== null ? `$${summaryStats.cashRange.last.toFixed(0)}M` : 'N/A'}
        </span>
        <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid var(--gold)', fontSize: 11, fontWeight: 500, background: 'rgba(251,146,60,0.15)', color: 'var(--gold)' }}>
          Shares: {summaryStats.sharesRange.first !== null ? `${summaryStats.sharesRange.first.toFixed(0)}M` : 'N/A'} → {summaryStats.sharesRange.last !== null ? `${summaryStats.sharesRange.last.toFixed(0)}M` : 'N/A'}
        </span>
        <span style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid var(--violet)', fontSize: 11, fontWeight: 500, background: 'rgba(168,85,247,0.15)', color: 'var(--violet)' }}>
          Satellites: {summaryStats.satellitesRange.first ?? 'N/A'} → {summaryStats.satellitesRange.last ?? 'N/A'}
        </span>
      </div>

      {/* All Quarters Table */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: `${130 + displayQuarters.length * 90}px` }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: `minmax(130px, 1fr) ${displayQuarters.map(() => '90px').join(' ')}`, borderBottom: '1px solid var(--border)' }}>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', position: 'sticky', left: 0 }}>Metric</span>
            {displayQuarters.map((q, idx) => (
              <span key={q} style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: idx === 0 ? 'var(--accent-dim)' : 'var(--surface2)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                {q.replace('Q', '').replace(' ', "'")}
              </span>
            ))}
          </div>
          {/* Data rows */}
          {metrics.map((metric, mi) => (
            <div key={metric.label} style={{ display: 'grid', gridTemplateColumns: `minmax(130px, 1fr) ${displayQuarters.map(() => '90px').join(' ')}`, borderBottom: mi < metrics.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, position: 'sticky', left: 0, background: 'var(--bg1)' }}>
                {metric.label}
              </span>
              {displayQuarters.map(q => {
                const data = quarterlyData[q];
                const val = getValue(data, metric);
                const tooltip = metric.tooltipKey && data[metric.tooltipKey] !== undefined
                  ? `Cash only: $${data[metric.tooltipKey].toFixed(1)}M`
                  : null;
                const cellColor = metric.color ? metric.color(val) : undefined;
                const isLatestQuarter = q === displayQuarters[0];
                return (
                  <span
                    key={q}
                    title={tooltip ?? undefined}
                    style={{
                      padding: '12px 16px',
                      fontSize: 12,
                      fontFamily: 'Space Mono, monospace',
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
      
      {/* Footnote */}
      <div style={{ fontSize: 11, color: 'var(--text3)' }}>
        <p style={{ }}>* Cash & Equiv. includes restricted cash (~$0.7-20M depending on quarter). Other reports might exclude restricted cash, which explains small differences between our values and theirs.</p>
        <p style={{ }}>* Total Debt shows Long-Term Debt only (balance sheet line item). Other sources may report "Total Debt" which includes current portion, accrued interest, and finance leases—explaining differences of $3-45M. Notable: Q3 2024 shows $156M here vs $201M elsewhere because the $48.5M Atlas Credit Facility was classified as current (due within 12 months) and repaid in Q4 2024.</p>
        <p>* Employees estimates from PRs/filings. Data from SEC filings (10-K, 10-Q).</p>
      </div>
      </div>
      </div>

      {/* Key Notes from Filing - Matching BMNR style */}
      <div style={{ }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#latest-quarter-summary</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Latest Quarter Summary (Q3 2025)<UpdateIndicators sources="SEC" /></span>
        </div>
        <div style={{ padding: '24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filing Source</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>{quarterlyData['Q3 2025'].filing}</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Satellites in Orbit</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>{quarterlyData['Q3 2025'].satellites} (BW3 + BB1-5)</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MNO Partnerships</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>{quarterlyData['Q3 2025'].definitiveAgreements} definitive, {quarterlyData['Q3 2025'].mous}+ MOUs/LOIs</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contracted Revenue</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>${quarterlyData['Q3 2025'].contractedRevenue}M+ committed</div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spectrum Position</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
              {quarterlyData['Q3 2025'].spectrumOwned} MHz owned | {quarterlyData['Q3 2025'].spectrumUS}+ MHz US
            </div>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Headcount</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>{quarterlyData['Q3 2025'].employees ? quarterlyData['Q3 2025'].employees.toLocaleString() : '—'} employees</div>
          </div>
        </div>
        </div>
      </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text3)' }}>
        Data sourced from SEC filings (10-K, 10-K/A, 10-Q). Latest filing: Q3 2025 10-Q (Nov 10, 2025).
      </div>

      {/* Historical Trend Charts */}
      {/* ROW 1: Cash Position & OpEx */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#charts-row-1</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 8 }}>Cash Position Evolution<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).filter(q => q.cashAndEquiv !== null).reverse().map(q => ({
              label: q.label,
              value: q.cashAndEquiv,
              display: `$${q.cashAndEquiv}M`
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
                <div style={{ padding: '0 24px 24px', fontSize: 11, color: 'var(--text3)' }}>Major raises: $462M SPAC (Apr'21), $210M equity (Jan'24), $500M ATM (Aug'25). Includes restricted cash.</div>
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
            const data = Object.values(quarterlyData).filter(q => q.opEx !== null).reverse().map(q => ({
              label: q.label,
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
          {/* OpEx Breakdown with quarter selector */}
          {opExQuarters.length > 0 && (
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
              {quarterlyData[opExQuarter]?.opExEngineering && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 11 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>Engineering:</span>
                      <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opExEngineering}M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>G&A:</span>
                      <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opExGandA}M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text3)' }}>R&D:</span>
                      <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opExRandD}M</span>
                    </div>
                    {quarterlyData[opExQuarter].opExDandA && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text3)' }}>D&A:</span>
                        <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opExDandA}M</span>
                      </div>
                    )}
                    {quarterlyData[opExQuarter].opExSBC && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text3)' }}>Stock-Based Comp:</span>
                        <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opExSBC}M</span>
                      </div>
                    )}
                    {quarterlyData[opExQuarter].opExCostOfRev && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text3)' }}>Cost of Revenue:</span>
                        <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opExCostOfRev}M</span>
                      </div>
                    )}
                  </div>
                  <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 500 }}>
                      <span style={{ color: 'var(--text2)' }}>Total OpEx (GAAP):</span>
                      <span style={{ color: 'var(--violet)' }}>${quarterlyData[opExQuarter].opEx}M</span>
                    </div>
                    {quarterlyData[opExQuarter].adjOpEx && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: 'var(--text3)' }}>Adj. OpEx (ex D&A, SBC):</span>
                        <span style={{ color: 'var(--cyan)' }}>${quarterlyData[opExQuarter].adjOpEx}M</span>
                      </div>
                    )}
                    {(quarterlyData[opExQuarter].capEx || quarterlyData[opExQuarter].capExTotal) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: 'var(--text3)' }}>CapEx:</span>
                        <span style={{ color: 'var(--gold)' }}>${quarterlyData[opExQuarter].capEx || quarterlyData[opExQuarter].capExTotal}M</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          </div>
        </div>
      </div>

      {/* ROW 2: Share Count & Market Cap */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#charts-row-2</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>Share Count (Outstanding / Implied / Fully Diluted)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).reverse().filter(d => d.sharesOutstanding > 0).map(d => ({
              label: d.label,
              value: d.sharesOutstanding,
              display: `${d.sharesOutstanding}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <>
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
                <div style={{ padding: '0 24px 24px', fontSize: 11, color: 'var(--text3)' }}>Class B (founders) + Class C (strategic partners) convert to Class A over time. Dilution from ATM, converts, RSUs.</div>
              </>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--sky)', display: 'flex', alignItems: 'center', gap: 8 }}>Market Cap Evolution ($M)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).reverse().filter(d => d.sharesOutstanding > 0 && d.stockPrice > 0).map(d => ({
              label: d.label,
              value: d.sharesOutstanding * d.stockPrice,
              display: (d.sharesOutstanding * d.stockPrice) >= 1000 ? `$${((d.sharesOutstanding * d.stockPrice) / 1000).toFixed(1)}B` : `$${(d.sharesOutstanding * d.stockPrice).toFixed(0)}M`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <>
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
                <div style={{ padding: '0 24px 24px', fontSize: 11, color: 'var(--text3)' }}>Price × shares. Rally post Block 1 launch (Sep'24). Peak ~$78 (Oct'25). Implied includes Class B/C.</div>
              </>
            );
          })()}
        </div>
      </div>

      {/* ROW 3: Company-Specific (Satellites) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#charts-row-3</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 8 }}>Satellites Deployed<UpdateIndicators sources="PR" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).reverse().map(d => ({
              label: d.label,
              value: d.satellites,
              display: `${d.satellites}`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            return (
              <>
                <div style={{ padding: '24px 24px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                    {data.map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>
                        <div style={{ width: '100%', background: 'var(--cyan)', borderRadius: '4px 4px 0 0', height: maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * 160) : 0, minHeight: d.value ? 2 : 0, transition: 'height 0.3s' }} />
                        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, textAlign: 'center', whiteSpace: 'nowrap' }}>{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '0 24px 24px', fontSize: 11, color: 'var(--text3)' }}>BW3 (test, Sep'22) → BB1-5 (Block 1, Sep'24) → BB6 (Block 2, Dec'25). Target: 168 sats for global coverage.</div>
              </>
            );
          })()}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--mint)', display: 'flex', alignItems: 'center', gap: 8 }}>Net Income/(Loss)<UpdateIndicators sources="SEC" /></span>
          </div>
          {(() => {
            const data = Object.values(quarterlyData).filter(q => q.netLoss !== null).reverse().map(q => ({
              label: q.label,
              value: q.netLoss,
              display: q.netLoss >= 0 ? `$${q.netLoss}M` : `($${Math.abs(q.netLoss)}M)`
            }));
            const maxVal = Math.max(...data.map(d => d.value != null ? Math.abs(d.value) : 0), 0);
            const hasPositive = data.some(d => d.value >= 0);
            const hasNegative = data.some(d => d.value < 0);
            return (
              <div style={{ padding: '24px 24px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                {hasPositive && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: hasNegative ? 110 : 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                    {data.map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                        {d.value >= 0 && <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginBottom: 6, whiteSpace: 'nowrap' }}>{d.display}</div>}
                        <div style={{ width: '100%', background: d.value >= 0 ? 'var(--mint)' : 'transparent', borderRadius: '4px 4px 0 0', height: d.value >= 0 && maxVal > 0 ? Math.round((d.value / maxVal) * (hasNegative ? 90 : 160)) : 0, minHeight: d.value > 0 ? 2 : 0, transition: 'height 0.3s' }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 8, overflowX: 'auto', minWidth: Math.max(data.length * 72, '100%' as any) }}>
                  {data.map((d, i) => (
                    <div key={i} style={{ flex: data.length > 8 ? '0 0 auto' : 1, textAlign: 'center', fontSize: 10, color: 'var(--text3)', padding: '4px 0', minWidth: data.length > 8 ? 64 : 'auto', whiteSpace: 'nowrap' }}>{d.label}</div>
                  ))}
                </div>
                {hasNegative && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, height: hasPositive ? 110 : 220, minWidth: Math.max(data.length * 72, '100%' as any) }}>
                    {data.map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: data.length > 8 ? '0 0 auto' : 1, minWidth: data.length > 8 ? 64 : 56, maxWidth: data.length > 8 ? 80 : 'none' }}>
                        <div style={{ width: '100%', background: d.value < 0 ? 'var(--coral)' : 'transparent', borderRadius: '0 0 4px 4px', height: d.value < 0 && maxVal > 0 ? Math.round((Math.abs(d.value) / maxVal) * (hasPositive ? 90 : 160)) : 0, minHeight: d.value < 0 ? 2 : 0, transition: 'height 0.3s' }} />
                        {d.value < 0 && <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Space Mono, monospace', color: 'var(--text)', marginTop: 6, whiteSpace: 'nowrap' }}>{d.display}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
};

// TIMELINE TAB - Historical log of assumption changes, guidance updates, and company events
const TimelineTab = () => {
  const [secFilter, setSecFilter] = useState('All');
  const [showAllFilings, setShowAllFilings] = useState(false);
  const [showAllPR, setShowAllPR] = useState(false);

  const pressReleases = [
    { date: 'Jan 22, 2026', category: 'Launch', color: '#4ade80', title: 'BlueBird 7 Launch Timing — Late Feb on New Glenn' },
    { date: 'Jan 16, 2026', category: 'Government', color: 'var(--gold)', title: 'MDA SHIELD Prime Contract Award — Golden Dome Program' },
    { date: 'Dec 24, 2025', category: 'Launch', color: '#4ade80', title: 'BlueBird 6 Successfully Deployed — First Block 2 Satellite in Orbit' },
    { date: 'Nov 2025', category: 'Earnings', color: 'var(--gold)', title: 'Q3 2025 Results: $1.22B Cash, 6 Satellites Operational' },
    { date: 'Oct 2025', category: 'Partnership', color: 'var(--cyan)', title: 'Verizon Definitive Agreement — $100M+ Commitment' },
  ];
  const displayedPR = showAllPR ? pressReleases : pressReleases.slice(0, 5);
  const hiddenPRCount = pressReleases.length - 5;

  const secFilings = ASTS_SEC_FILINGS;
  const secMeta = ASTS_SEC_META;
  const secTypeColors = ASTS_SEC_TYPE_COLORS;
  const secFilterTypes = ASTS_SEC_FILTER_TYPES;
  
  const filteredFilings = secFilings.filter(f => {
    if (secFilter === 'All') return true;
    if (secFilter === 'S-1/S-3') return f.type === 'S-1' || f.type === 'S-3';
    if (secFilter === 'Other') return !['10-K', '10-Q', '8-K', 'S-1', 'S-3', '424B5'].includes(f.type);
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
  // Last comprehensive PR review: February 2026 (PRs from 2020-2026 added)
  // ============================================================================
  
  // Timeline log - chronological record of ACTUAL COMPANY changes (not model creation notes)
  // Categories: GUIDANCE (mgmt projections), DATA (SEC filings, actuals), EVENT (catalysts/news), LAUNCH (orbital launches)
  const timelineEvents = ASTS_TIMELINE_EVENTS;

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
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#timeline-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Corporate Events<UpdateIndicators sources="PR" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Timeline<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>SEC filings, press releases, upcoming events, and key corporate milestones. Chronological record of all official communications and regulatory submissions.</p>
      </div>

      {/* Latest SEC Filings - Enhanced with filtering and pagination */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>SEC Filings</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
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

        {/* Filings Table */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 80px 1fr 100px 80px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Date</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Type</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Description</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)' }}>Period</span>
            <span style={{ padding: '12px 16px', fontSize: 10, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface2)', textAlign: 'right' }}>Link</span>
          </div>
          {displayedFilings.map((filing, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 80px 1fr 100px 80px', padding: '12px 16px', borderBottom: idx < displayedFilings.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: 13, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{filing.date}</span>
              <span style={{ fontSize: 13 }}>
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
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{filing.description}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>{filing.period}</span>
              <span style={{ fontSize: 13, textAlign: 'right' }}>
                <a
                  href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${secMeta.cik}&type=${filing.type}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--cyan)' }}
                >
                  SEC →
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
            <span style={{ display: 'flex', alignItems: 'center' }}>Last PR Processed: {secMeta.lastPR.date} — {secMeta.lastPR.title}<UpdateIndicators sources="PR" /></span>
          </div>
        </div>
        </div>
      </div>

      {/* Upcoming Events + Recent Press Releases */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Events & Press Releases</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#upcoming-events</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>Upcoming Events<UpdateIndicators sources="PR" /></span>
            </div>
            <div style={{ padding: '24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Q4 2025 Earnings</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>10-K Annual Report</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--cyan)' }}>~Mar 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Est.</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>BB7-BB11 Launches</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Block 2 constellation expansion</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: '#4ade80' }}>Q1 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>45-60 sats by EOY</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>Commercial Service Launch</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Initial revenue generation</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Mono', color: 'var(--gold)' }}>H1 2026</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Post-constellation</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 12 }}>
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
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#recent-press-releases</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
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

      {/* Event Timeline Section - CRCL Style */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Event Timeline ({filteredEntries.length} events)</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#event-timeline</div>

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
          {['ALL', ...Object.keys(categoryColors)].map(cat => (
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
              {cat === 'ALL' ? `All (${timelineEvents.length})` : `${(categoryColors as Record<string, { label: string }>)[cat]?.label || cat} (${timelineEvents.filter(p => p.category === cat).length})`}
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
                <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'right', color: entry.impact === 'Positive' ? 'var(--mint)' : entry.impact === 'Negative' ? 'var(--coral)' : 'var(--text3)' }}>
                  {entry.impact === 'Positive' && '↑ '}
                  {entry.impact === 'Negative' && '↓ '}
                  {entry.impact === 'Neutral' && '→ '}
                  {entry.impact?.toLowerCase() || 'neutral'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {isExpanded && (
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 24 }}>
                    <div>
                      {/* Summary */}
                      <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 12, fontStyle: 'italic', color: 'var(--text3)', fontSize: 12, lineHeight: 1.6 }}>
                        {entry.summary}
                      </div>
                      {/* Details */}
                      {entry.details && entry.details.length > 0 && (
                        <ul style={{ margin: '12px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {entry.details.map((detail, j) => (
                            <li key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
                              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Change indicator */}
                      {entry.prevValue && (
                        <div style={{ marginTop: 12, fontSize: 13, padding: '8px 12px', background: 'var(--surface2)', borderRadius: 8 }}>
                          <span style={{ color: '#f87171', textDecoration: 'line-through' }}>{entry.prevValue}</span>
                          <span style={{ color: 'var(--text3)', margin: '0 8px' }}>→</span>
                          <span style={{ color: '#4ade80' }}>{entry.newValue}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impact</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: entry.impact === 'Positive' ? 'var(--mint)' : entry.impact === 'Negative' ? 'var(--coral)' : 'var(--text3)' }}>
                          {entry.impact === 'Positive' && '● Bullish'}
                          {entry.impact === 'Negative' && '● Bearish'}
                          {entry.impact === 'Neutral' && '● Neutral'}
                          {!entry.impact && '● Unknown'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Source</div>
                        <div style={{ fontSize: 13, color: 'var(--cyan)' }}>{entry.sources.join(', ')}</div>
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
            <h4 style={{ color: 'var(--cyan)', fontWeight: 500, marginBottom: 8 }}>Categories Explained</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text2)', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><span style={{ color: 'var(--gold)' }}>Partnership:</span> Commercial agreements, MNO deals, government contracts</li>
              <li><span style={{ color: 'var(--mint)' }}>Product:</span> Satellite launches, tech milestones, deployments</li>
              <li><span style={{ color: 'var(--pink)' }}>Regulatory:</span> FCC approvals, spectrum licenses, authorizations</li>
              <li><span style={{ color: 'var(--green)' }}>Capital:</span> Equity offerings, convertible notes, financing</li>
              <li><span style={{ color: 'var(--violet)' }}>Guidance:</span> Management projections, targets, timelines</li>
              <li><span style={{ color: 'var(--cyan)' }}>Earnings:</span> Quarterly results, SEC filings, business updates</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--cyan)', fontWeight: 500, marginBottom: 8 }}>Updating This Log</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--text2)', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>• Add new entries chronologically at the top</li>
              <li>• Include sources for traceability</li>
              <li>• Note prev → new values for comparisons</li>
              <li>• Tag impact: Positive/Negative/Neutral/Mixed</li>
            </ul>
          </div>
        </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
      <CFANotes title="CFA Level III — SEC Filings" items={[
        { term: '10-K / 10-Q', def: 'Annual (10-K) and quarterly (10-Q) reports. 10-K is audited and comprehensive; 10-Q is unaudited. Both contain financial statements, MD&A, risk factors.' },
        { term: '8-K', def: 'Current report for material events (earnings, leadership changes, acquisitions). Filed within 4 business days. Often the first signal of important developments.' },
        { term: 'S-1 / S-3', def: 'Registration statements for securities offerings. S-1 for IPOs (requires full disclosure); S-3 for seasoned issuers (shelf registration for future offerings).' },
        { term: 'DEF 14A / DEFA14A', def: 'Proxy statements for shareholder meetings. DEF 14A is the definitive proxy; DEFA14A is additional solicitation material. Contains executive compensation, board nominees, shareholder proposals.' },
      ]} />
    </div>
  );
};

const CompsTab = ({ calc, currentStockPrice }) => {
  const [competitorFilter, setCompetitorFilter] = useState<CompetitorId | 'all'>('all');
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set());
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('All');

  // ═══════════════════════════════════════════════════════════════════════════
  // VALUATION COMPARABLES - Market metrics comparison
  // ═══════════════════════════════════════════════════════════════════════════
  const [selectedCompCategory, setSelectedCompCategory] = useState<string>('all');

  const comps = [
    { name: 'ASTS SpaceMobile', ticker: 'ASTS', category: 'd2d', mc: calc.marketCap, evRev: calc.evToRevFwd, pSub: calc.pricePerSub, subs: calc.potentialSubs, highlight: true },
    { name: 'Starlink', ticker: 'Private', category: 'd2c', mc: 175000, evRev: 17, pSub: 43750, subs: 4 },
    { name: 'Iridium', ticker: 'IRDM', category: 'satcom', mc: 6500, evRev: 3.5, pSub: 3095, subs: 2.1 },
    { name: 'Globalstar', ticker: 'GSAT', category: 'satcom', mc: 3500, evRev: 4.2, pSub: 2333, subs: 1.5 },
    { name: 'Verizon', ticker: 'VZ', category: 'telco', mc: 175000, evRev: 1.3, pSub: 1520, subs: 115 },
    { name: 'T-Mobile', ticker: 'TMUS', category: 'telco', mc: 280000, evRev: 3.4, pSub: 2240, subs: 125 },
    { name: 'AT&T', ticker: 'T', category: 'telco', mc: 165000, evRev: 1.3, pSub: 1500, subs: 110 },
  ];

  const compCategories = [
    { key: 'all', label: 'All Peers' },
    { key: 'd2d', label: 'D2D Satellite' },
    { key: 'd2c', label: 'D2C Satellite' },
    { key: 'satcom', label: 'SatCom' },
    { key: 'telco', label: 'Terrestrial Telco' },
  ];

  const filteredComps = selectedCompCategory === 'all'
    ? comps
    : comps.filter(c => c.category === selectedCompCategory || c.highlight);

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITOR PROFILES - D2D/Satellite competitors to track
  // Update capabilities and status as new information emerges
  // ═══════════════════════════════════════════════════════════════════════════
  const COMPETITOR_PROFILES: CompetitorProfile[] = [
    {
      id: 'starlink-tmobile',
      name: 'Starlink / T-Mobile',
      description: 'SpaceX Direct-to-Cell - SMS commercial in US + Europe (Ukraine), voice/data roadmap',
      technology: '650+ D2C satellites, 2.7x2.3m phased arrays, custom silicon, LTE/4G protocols',
      currentStatus: 'SMS live (US beta, Ukraine commercial Nov 2025), 8+ MNO partners, voice/data coming',
      capabilities: { voice: false, text: true, data: false, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: '650+ D2C', coverage: 'US + Europe (Ukraine first)', subscribers: 'Kyivstar 22.5M eligible', funding: 'SpaceX vertical integration' }
    },
    {
      id: 'lynk',
      name: 'Lynk Global (+ Omnispace)',
      description: 'D2D provider merging with Omnispace (Oct 2025), SES as major shareholder',
      technology: 'Small sats + Omnispace 60 MHz S-band spectrum, multi-spectrum platform',
      currentStatus: 'Merger pending, FCC US license (Apr 2025), 50+ MNO partners, 50+ countries',
      capabilities: { voice: true, text: true, data: true, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: 15, coverage: 'S-band: 1B+ people (Americas/Europe/Africa/Asia)', subscribers: 'B2B via MNOs', funding: 'SES-backed post-merger' }
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
      description: 'NB-NTN via GEO satellites - powers Google Pixel + Verizon satellite SOS/SMS',
      technology: '3GPP NB-NTN on existing GEO sats, licensed MSS L-band spectrum, cloud-native vRAN',
      currentStatus: 'Pixel 9/10 satellite SOS, Pixel Watch 4 (first smartwatch), Verizon SMS live',
      capabilities: { voice: false, text: true, data: true, video: false, unmodifiedPhones: true, globalCoverage: true },
      keyMetrics: { satellites: 'GEO partners', coverage: 'US, Canada, EU, Australia', subscribers: 'Pixel 9/10 + Verizon users', funding: '$116M raised' }
    },
    {
      id: 'iridium',
      name: 'Iridium',
      description: 'Legacy sat phone provider + NTN Direct (3GPP NB-IoT) for D2D/IoT',
      technology: '66-sat LEO constellation, L-band MSS spectrum, NB-IoT NTN via software update',
      currentStatus: 'Sat phones live, NTN Direct (Project Stardust) testing 2025, service 2026',
      capabilities: { voice: true, text: true, data: true, video: false, unmodifiedPhones: false, globalCoverage: true },
      keyMetrics: { satellites: 66, coverage: 'Truly global (incl. poles)', subscribers: '2.2M (1.7M IoT)', funding: 'Public (IRDM)' }
    },
    {
      id: 'amazon-leo',
      name: 'Amazon Leo',
      description: 'Amazon\'s LEO satellite broadband (fka Project Kuiper) - terminal-based, NOT D2D',
      technology: 'LEO constellation with Leo Nano/Pro/Ultra terminals (100Mbps-1Gbps)',
      currentStatus: '212 satellites launched (Jan 2026), enterprise preview live',
      capabilities: { voice: false, text: false, data: true, video: false, unmodifiedPhones: false, globalCoverage: false },
      keyMetrics: { satellites: 212, coverage: 'Building to 3,232', subscribers: 'Enterprise preview', funding: '$10B committed' }
    },
    {
      id: 'echostar',
      name: 'EchoStar / Hughes',
      description: 'D2D LEO constellation via MDA AURORA - broadband NTN to 5G NTN devices, 2029 service',
      technology: 'MDA AURORA software-defined LEO sats, 2GHz S-band/AWS-4 spectrum, Open RAN 5G, 3GPP NTN',
      currentStatus: 'Contract signed Aug 2025, satellites 2028, commercial service 2029',
      capabilities: { voice: true, text: true, data: true, video: true, unmodifiedPhones: true, globalCoverage: true },
      keyMetrics: { satellites: '200 initial (scalable to 1000s)', coverage: 'US + global (2GHz spectrum)', subscribers: 'Pre-launch', funding: '$5B LEO project, $18B total NTN since 2012' }
    },
    {
      id: 'oq-technology',
      name: 'OQ Technology',
      description: 'European LEO 5G NTN operator for NB-IoT and D2D — Luxembourg-based (founded 2016 by Omar Qaise, ex-SES), sovereign EU positioning',
      technology: '10 LEO 6U cubesats, 60 MHz MSS S-band + upper C-band + IMT band, 3GPP NTN NB-IoT/D2D, in-house RAN stack + 5G core',
      currentStatus: '10 sats in orbit, IoT commercial (20+ MNO roaming), D2D emergency broadcast Nov 2025, 5NETSAT mission Aug 2025, D2D messaging targeting 2026, 30 new sats planned by end 2026',
      capabilities: { voice: false, text: true, data: true, video: false, unmodifiedPhones: true, globalCoverage: false },
      keyMetrics: { satellites: '10 (30 more by end 2026, 100 target in 2-3 yrs)', coverage: 'Global IoT + expanding D2D, licensed in AU/LU/DE/SA/NG/RW', subscribers: '20+ MNO roaming (DT, KPN, Telefónica, Transatel, Emnify)', funding: '€13M Series A (Aramco) + LSSD convertible (SES) + €17.5M EIC; Series B targeting €35-40M' }
    }
  ];

  // Competitor news timeline — imported from @/data/asts/comps-timeline.ts
  // Add new entries there, not here.
  const COMPETITOR_NEWS: CompetitorNewsEntry[] = COMPS_TIMELINE;

  // Filter news by competitor, sort by date (newest first)
  const filteredNews = React.useMemo(() =>
    (competitorFilter === 'all'
      ? [...COMPETITOR_NEWS]
      : COMPETITOR_NEWS.filter(n => n.competitor === competitorFilter)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [competitorFilter]
  );

  // Compute news categories and filtered news by category
  const newsCategories = ['All', ...Array.from(new Set(COMPETITOR_NEWS.map(n => n.category)))];
  const filteredCompNews = filteredNews.filter(n => newsCategoryFilter === 'All' || n.category === newsCategoryFilter);

  // Get competitor display name
  const getCompetitorName = (id: CompetitorId): string => {
    if (id === 'other') return 'Miscellaneous';
    const profile = COMPETITOR_PROFILES.find(p => p.id === id);
    return profile?.name || id;
  };


  // Implication styling - using design tokens
  const getImplicationStyle = (impl: ASTSImplication) => {
    switch (impl) {
      case 'positive': return { bg: 'var(--mint-dim)', color: 'var(--mint)', label: '✓ Good for ASTS' };
      case 'negative': return { bg: 'var(--coral-dim)', color: 'var(--coral)', label: '⚠ Threat to ASTS' };
      default: return { bg: 'var(--surface3)', color: 'var(--text3)', label: '○ Neutral' };
    }
  };

  // Category styling - using design tokens
  const getCategoryStyle = (cat: CompetitorNewsCategory) => {
    const styles: Record<CompetitorNewsCategory, { bg: string; color: string }> = {
      'Launch': { bg: 'var(--mint-dim)', color: 'var(--mint)' },
      'Partnership': { bg: 'var(--sky-dim)', color: 'var(--sky)' },
      'Technology': { bg: 'var(--violet-dim)', color: 'var(--violet)' },
      'Regulatory': { bg: 'var(--gold-dim)', color: 'var(--gold)' },
      'Financial': { bg: 'var(--cyan-dim)', color: 'var(--cyan)' },
      'Coverage': { bg: 'var(--coral-dim)', color: 'var(--coral)' },
      'Product': { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    };
    return styles[cat] || { bg: 'var(--surface3)', color: 'var(--text3)' };
  };

  // Key competitors with threat levels for colored borders
  const keyCompetitors = [
    {
      name: 'SpaceX Starlink',
      type: 'LEO Broadband + D2D',
      status: 'Operational',
      focus: 'Terminal-based broadband, D2D partnership with T-Mobile',
      threat: 'High',
      notes: 'Largest LEO constellation. D2D beta with T-Mobile for texts/calls. Not full broadband D2D yet.'
    },
    {
      name: 'Amazon Leo',
      type: 'LEO Broadband',
      status: '212 Satellites (Jan 2026)',
      focus: 'Terminal-based broadband (Leo Nano/Pro/Ultra terminals)',
      threat: 'Medium',
      notes: 'Rebranded from Project Kuiper Nov 2025. 7 missions in 2025, enterprise preview live. Not D2D - different market.'
    },
    {
      name: 'Lynk Global',
      type: 'D2D (Text/IoT)',
      status: 'Limited Service',
      focus: 'Text messaging and IoT to unmodified phones',
      threat: 'Low',
      notes: 'Text-only. No voice/data. Limited satellite count. More complementary than competitive.'
    },
    {
      name: 'Apple/Globalstar',
      type: 'Emergency SOS',
      status: 'Operational',
      focus: 'Emergency messaging for iPhone only',
      threat: 'Low',
      notes: 'iPhone-only. Emergency texts only. Not commercial service. Different use case.'
    },
  ];

  // Map keyCompetitors to comps entries by partial name match
  const keyCompMap: Record<string, typeof keyCompetitors[0]> = {
    'Starlink': keyCompetitors[0],     // SpaceX Starlink
    'Globalstar': keyCompetitors[3],   // Apple/Globalstar
  };

  // Map COMPETITOR_PROFILES to comps entries
  const profileMap: Record<string, typeof COMPETITOR_PROFILES[0]> = {};
  COMPETITOR_PROFILES.forEach(p => {
    if (p.id === 'starlink-tmobile') profileMap['Starlink'] = p;
    else if (p.id === 'apple-globalstar') profileMap['Globalstar'] = p;
    else if (p.id === 'iridium') profileMap['Iridium'] = p;
  });

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = { d2d: 'D2D Satellite', d2c: 'D2C Satellite', satcom: 'SatCom', telco: 'Telco' };
    return labels[cat] || cat;
  };

  // keyCompetitors entries not in comps (Amazon Leo, Lynk Global)
  const extraCompetitors = keyCompetitors.filter(kc => {
    const nameMap: Record<string, boolean> = { 'SpaceX Starlink': true, 'Apple/Globalstar': true };
    return !nameMap[kc.name];
  });

  const extraProfileMap: Record<string, typeof COMPETITOR_PROFILES[0]> = {};
  COMPETITOR_PROFILES.forEach(p => {
    if (p.id === 'amazon-leo') extraProfileMap['Amazon Leo'] = p;
    else if (p.id === 'lynk') extraProfileMap['Lynk Global'] = p;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#comparables-header</div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Comparables & Competitor Intelligence<UpdateIndicators sources={['PR', 'WS']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Comparables & Competitor Intelligence<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Unified view: valuation metrics, qualitative assessment, and D2D capabilities per company. No direct comps — Starlink ~$175B private, D2C model. Telcos 1-3x rev, mature.</p>
      </div>

      {/* Peer Group Selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {compCategories.map(cat => {
          const isActive = selectedCompCategory === cat.key;
          return (
          <button
            key={cat.key}
            onClick={() => setSelectedCompCategory(cat.key)}
            style={{ padding: '8px 14px', fontSize: 13, fontWeight: isActive ? 600 : 500, borderRadius: 8, background: isActive ? 'var(--accent-dim)' : 'var(--surface2)', border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`, color: isActive ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}
          >
            {cat.label}
          </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filteredComps.map((c) => {
          const qual = keyCompMap[c.name];
          const profile = profileMap[c.name];
          const threatLevel = qual ? qual.threat.toLowerCase() : '';
          const cardBorderLeft = c.highlight ? '4px solid var(--accent)' : threatLevel === 'high' || threatLevel === 'critical' ? '4px solid var(--coral)' : threatLevel === 'medium' ? '4px solid var(--gold)' : threatLevel === 'low' ? '4px solid var(--mint)' : '4px solid var(--surface3)';
          const cardBg = c.highlight ? 'linear-gradient(135deg, var(--accent-dim) 0%, var(--surface) 100%)' : 'var(--surface)';
          return (
            <div key={c.ticker} style={{ background: cardBg, border: '1px solid var(--border)', borderRadius: 16, padding: 24, borderLeft: cardBorderLeft }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{c.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>{c.ticker} · {getCategoryLabel(c.category)}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                  {qual && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: threatLevel === 'high' || threatLevel === 'critical' ? 'rgba(255,123,114,0.15)' : threatLevel === 'medium' ? 'rgba(210,153,34,0.15)' : 'rgba(126,231,135,0.15)', color: threatLevel === 'high' || threatLevel === 'critical' ? 'var(--coral)' : threatLevel === 'medium' ? 'var(--gold)' : 'var(--mint)' }}>{qual.threat}</span>}
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: 'var(--surface3)', color: 'var(--text3)' }}>{getCategoryLabel(c.category)}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 8, padding: 12, background: 'var(--surface2)', borderRadius: 10, marginBottom: 12 }}>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>${(c.mc / 1000).toFixed(0)}B</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Mkt Cap</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{c.evRev.toFixed(1)}x</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>EV/Rev</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>${c.pSub.toLocaleString()}</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>$/Sub</div></div>
                <div style={{ textAlign: 'center', padding: '4px 0' }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{c.subs.toFixed(0)}M</div><div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Subs</div></div>
              </div>
              {c.highlight && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: 'rgba(126,231,135,0.15)', color: 'var(--mint)' }}>✓ Voice</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: 'rgba(126,231,135,0.15)', color: 'var(--mint)' }}>✓ Text</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: 'rgba(126,231,135,0.15)', color: 'var(--mint)' }}>✓ Data</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: 'rgba(126,231,135,0.15)', color: 'var(--mint)' }}>✓ Video</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: 'rgba(126,231,135,0.15)', color: 'var(--mint)' }}>✓ Unmod.</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: 'var(--surface3)', color: 'var(--text3)', opacity: 0.6 }}>Building Global</span>
                </div>
              )}
              {!c.highlight && profile && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.voice ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.voice ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.voice ? undefined : 0.6 }}>{profile.capabilities.voice ? '✓' : '✗'} Voice</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.text ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.text ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.text ? undefined : 0.6 }}>{profile.capabilities.text ? '✓' : '✗'} Text</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.data ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.data ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.data ? undefined : 0.6 }}>{profile.capabilities.data ? '✓' : '✗'} Data</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.video ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.video ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.video ? undefined : 0.6 }}>{profile.capabilities.video ? '✓' : '✗'} Video</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.unmodifiedPhones ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.unmodifiedPhones ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.unmodifiedPhones ? undefined : 0.6 }}>{profile.capabilities.unmodifiedPhones ? '✓' : '✗'} Unmod.</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.globalCoverage ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.globalCoverage ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.globalCoverage ? undefined : 0.6 }}>{profile.capabilities.globalCoverage ? '✓' : '✗'} Global</span>
                </div>
              )}
              {qual && (
                <>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Focus:</strong> {qual.focus}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>{qual.notes}</div>
                </>
              )}
            </div>
          );
        })}
        {/* Extra competitors not in comps (Amazon Leo, Lynk Global) - show when 'all' selected */}
        {selectedCompCategory === 'all' && extraCompetitors.map((kc, i) => {
          const profile = extraProfileMap[kc.name];
          const extraThreat = kc.threat.toLowerCase();
          const extraBorderLeft = extraThreat === 'high' || extraThreat === 'critical' ? '4px solid var(--coral)' : extraThreat === 'medium' ? '4px solid var(--gold)' : extraThreat === 'low' ? '4px solid var(--mint)' : '4px solid var(--surface3)';
          return (
            <div key={`extra-${i}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, borderLeft: extraBorderLeft }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{kc.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>{kc.type}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: extraThreat === 'high' || extraThreat === 'critical' ? 'rgba(255,123,114,0.15)' : extraThreat === 'medium' ? 'rgba(210,153,34,0.15)' : 'rgba(126,231,135,0.15)', color: extraThreat === 'high' || extraThreat === 'critical' ? 'var(--coral)' : extraThreat === 'medium' ? 'var(--gold)' : 'var(--mint)' }}>{kc.threat}</span>
                </div>
              </div>
              {profile && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.voice ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.voice ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.voice ? undefined : 0.6 }}>{profile.capabilities.voice ? '✓' : '✗'} Voice</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.text ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.text ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.text ? undefined : 0.6 }}>{profile.capabilities.text ? '✓' : '✗'} Text</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.data ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.data ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.data ? undefined : 0.6 }}>{profile.capabilities.data ? '✓' : '✗'} Data</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.video ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.video ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.video ? undefined : 0.6 }}>{profile.capabilities.video ? '✓' : '✗'} Video</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.unmodifiedPhones ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.unmodifiedPhones ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.unmodifiedPhones ? undefined : 0.6 }}>{profile.capabilities.unmodifiedPhones ? '✓' : '✗'} Unmod.</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500, background: profile.capabilities.globalCoverage ? 'rgba(126,231,135,0.15)' : 'var(--surface3)', color: profile.capabilities.globalCoverage ? 'var(--mint)' : 'var(--text3)', opacity: profile.capabilities.globalCoverage ? undefined : 0.6 }}>{profile.capabilities.globalCoverage ? '✓' : '✗'} Global</span>
                </div>
              )}
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 4 }}><strong>Focus:</strong> {kc.focus}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', lineHeight: 1.5 }}>{kc.notes}</div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#peer-charts</div>
      <div style={{ padding: '32px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Peer Valuation<UpdateIndicators sources="WS" /></div>
        <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>EV/Revenue & $/Subscriber<span style={{ color: 'var(--accent)' }}>.</span></h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>EV/Rev Comparison</div>
          </div>
          <div style={{ padding: '24px 24px 16px', minHeight: 280 }}>
            <ResponsiveContainer width="100%" height={Math.max(280, Math.min(filteredComps.length * 44, 500))}>
              <BarChart data={filteredComps} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis 
                  type="number" 
                  stroke="var(--text3)" 
                  tick={{ fill: 'var(--text2)', fontSize: 11, fontWeight: 500 }} 
                  axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }} 
                  tickLine={{ stroke: 'var(--border)' }}
                  tickFormatter={(v) => `${v.toFixed(1)}x`}
                />
                <YAxis 
                  dataKey="ticker" 
                  type="category" 
                  stroke="var(--text3)" 
                  width={80} 
                  tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, padding: '8px 12px' }} 
                  labelStyle={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}
                  formatter={(value: number) => [`${value.toFixed(2)}x`, 'EV/Rev']}
                />
                <Bar dataKey="evRev" fill="var(--accent)" radius={[0, 6, 6, 0]} barSize={28}>
                  {filteredComps.map((e, i) => (<Cell key={i} fill={e.highlight ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 35%, transparent)'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>$/Subscriber Comparison</div>
          </div>
          <div style={{ padding: '24px 24px 16px', minHeight: 280 }}>
            <ResponsiveContainer width="100%" height={Math.max(280, Math.min(filteredComps.length * 44, 500))}>
              <BarChart data={filteredComps} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis 
                  type="number" 
                  stroke="var(--text3)" 
                  tick={{ fill: 'var(--text2)', fontSize: 11, fontWeight: 500 }} 
                  tickFormatter={v => `$${(v/1000).toFixed(0)}k`} 
                  axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }} 
                  tickLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  dataKey="ticker" 
                  type="category" 
                  stroke="var(--text3)" 
                  width={80} 
                  tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, padding: '8px 12px' }} 
                  labelStyle={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}
                  formatter={(v: number) => [`$${(v/1000).toFixed(1)}k`, '$/Subscriber']}
                />
                <Bar dataKey="pSub" fill="var(--violet)" radius={[0, 6, 6, 0]} barSize={28}>
                  {filteredComps.map((e, i) => (<Cell key={i} fill={e.highlight ? 'var(--violet)' : 'color-mix(in srgb, var(--violet) 35%, transparent)'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Valuation Matrices */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#valuation-framework</div>
      <div style={{ padding: '32px 0 16px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Analytical Framework</div>
        <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Valuation Framework<span style={{ color: 'var(--accent)' }}>.</span></h3>
      </div>

      {/* Valuation Methodology Matrix */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#implied-valuation-matrix</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>Implied Valuation Matrix<UpdateIndicators sources="WS" /></div>
          <p style={{ color: 'var(--text3)', fontSize: 13, margin: '4px 0 0' }}>ASTS value under different peer multiples and methodologies (current: ${(calc.marketCap / 1000).toFixed(1)}B)</p>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
            {['Method', 'Peer Basis', 'Multiple/Metric', 'Implied Value', 'Premium/(Discount)'].map((label, idx) => (
              <div key={label} style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, textAlign: idx < 2 ? 'left' : 'right' }}>{label}</div>
            ))}
          </div>
          {[
            { method: '$/Subscriber', basis: 'Starlink', metric: '$43,750/sub', implied: calc.potentialSubs * 43750, premium: ((calc.potentialSubs * 43750) / calc.marketCap - 1) * 100 },
            { method: '$/Subscriber', basis: 'T-Mobile', metric: '$2,240/sub', implied: calc.potentialSubs * 2240, premium: ((calc.potentialSubs * 2240) / calc.marketCap - 1) * 100 },
            { method: '$/Subscriber', basis: 'Verizon', metric: '$1,520/sub', implied: calc.potentialSubs * 1520, premium: ((calc.potentialSubs * 1520) / calc.marketCap - 1) * 100 },
            { method: 'EV/Rev (Fwd)', basis: 'Starlink', metric: '17x', implied: calc.fwdRevenue * 17, premium: ((calc.fwdRevenue * 17) / calc.marketCap - 1) * 100 },
            { method: 'EV/Rev (Fwd)', basis: 'High-Growth SaaS', metric: '10x', implied: calc.fwdRevenue * 10, premium: ((calc.fwdRevenue * 10) / calc.marketCap - 1) * 100 },
            { method: 'EV/Rev (Fwd)', basis: 'Telco Avg', metric: '2x', implied: calc.fwdRevenue * 2, premium: ((calc.fwdRevenue * 2) / calc.marketCap - 1) * 100 },
          ].map((v, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 500 }}>{v.method}</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>{v.basis}</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{v.metric}</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${(v.implied / 1000).toFixed(1)}B</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: v.premium >= 0 ? 'var(--mint)' : 'var(--coral)' }}>
                {v.premium >= 0 ? '+' : ''}{v.premium.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* SOTP Valuation */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#sotp</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>Sum-of-the-Parts (SOTP)<UpdateIndicators sources={['WS']} /></div>
            <p style={{ color: 'var(--text3)', fontSize: 13, margin: '4px 0 0' }}>Value each business segment separately</p>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['Segment', 'Metric', 'Multiple', 'Value'].map((label, idx) => (
                <div key={label} style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, textAlign: idx === 0 ? 'left' : 'right' }}>{label}</div>
              ))}
            </div>
            {[
              { segment: 'US Commercial', basis: 'AT&T/VZ partnership', metric: `${(calc.potentialSubs * 0.4).toFixed(0)}M subs`, multiple: '$2,000/sub', value: calc.potentialSubs * 0.4 * 2000 },
              { segment: 'International', basis: 'Global MNO deals', metric: `${(calc.potentialSubs * 0.4).toFixed(0)}M subs`, multiple: '$1,500/sub', value: calc.potentialSubs * 0.4 * 1500 },
              { segment: 'Government/Defense', basis: 'DoD contracts', metric: 'Option value', multiple: '—', value: 2000 },
              { segment: 'Maritime/Aviation', basis: 'Niche verticals', metric: 'Option value', multiple: '—', value: 1000 },
              { segment: 'Spectrum Assets', basis: 'Licensed spectrum', metric: 'Strategic value', multiple: '—', value: 3000 },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
                  <div style={{ fontWeight: 500 }}>{s.segment}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.basis}</div>
                </div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{s.metric}</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{s.multiple}</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${(s.value / 1000).toFixed(1)}B</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, gridColumn: '1 / 4' }}>SOTP Total</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${((calc.potentialSubs * 0.4 * 2000 + calc.potentialSubs * 0.4 * 1500 + 6000) / 1000).toFixed(1)}B</div>
            </div>
          </div>
          </div>
        </div>

        {/* Risk-Adjusted Scenarios */}
        <div>
          <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#risk-adjusted-scenarios</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>Risk-Adjusted Scenarios<UpdateIndicators sources={['WS']} /></div>
              <p style={{ color: 'var(--text3)', fontSize: 13, margin: '4px 0 0' }}>Probability-weighted valuation outcomes</p>
            </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['Scenario', 'Prob.', 'Value', 'Weighted'].map((label, idx) => (
                <div key={label} style={{ padding: '16px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', fontWeight: 600, textAlign: idx === 0 ? 'left' : 'right' }}>{label}</div>
              ))}
            </div>
            {[
              { scenario: 'Bull Case', desc: 'Full constellation, global coverage', prob: 25, value: calc.marketCap * 3 },
              { scenario: 'Base Case', desc: 'Partial success, US + select intl', prob: 45, value: calc.marketCap * 1.5 },
              { scenario: 'Bear Case', desc: 'Delays, limited commercial traction', prob: 20, value: calc.marketCap * 0.5 },
              { scenario: 'Failure', desc: 'Technology or funding issues', prob: 10, value: calc.marketCap * 0.1 },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
                  <div style={{ fontWeight: 500 }}>{s.scenario}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.desc}</div>
                </div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>{s.prob}%</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right' }}>${(s.value / 1000).toFixed(1)}B</div>
                <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${(s.value * s.prob / 100 / 1000).toFixed(1)}B</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderTop: '2px solid var(--border)', fontWeight: 600 }}>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, gridColumn: '1 / 4' }}>Expected Value</div>
              <div style={{ padding: '16px 16px', fontFamily: "'Space Mono', monospace", fontSize: 14, textAlign: 'right', color: 'var(--mint)' }}>${((calc.marketCap * 3 * 0.25 + calc.marketCap * 1.5 * 0.45 + calc.marketCap * 0.5 * 0.20 + calc.marketCap * 0.1 * 0.10) / 1000).toFixed(1)}B</div>
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
          <h3 style={{ fontSize: 24, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.3px' }}>Competitor News<span style={{ color: 'var(--accent)' }}>.</span></h3>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-filter</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px', marginTop: 8 }}>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}>Track developments across D2D satellite and terrestrial competitors impacting ASTS SpaceMobile's market position.</p>
        <p style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', margin: '0 0 16px' }}>Filter by competitor to focus on specific threat vectors.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>Filter by Competitor</span>
          {competitorFilter !== 'all' && <button onClick={() => setCompetitorFilter('all')} style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, background: 'color-mix(in srgb, var(--coral) 15%, transparent)', color: 'var(--coral)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Clear</button>}
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
                {comp.name.split('/')[0].trim()} ({count})
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
        {competitorFilter !== 'all' && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, fontFamily: 'Space Mono, monospace' }}>{getCompetitorName(competitorFilter)} &rarr; {filteredNews.length} results</div>}
      </div>

      {/* Category Filter */}
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
          onClick={() => { if (expandedNews.size > 0) { setExpandedNews(new Set()); } else { setExpandedNews(new Set(filteredCompNews.map((_, i) => i))); } }}
          style={{ fontSize: 10, padding: '4px 12px', borderRadius: 99, background: 'color-mix(in srgb, var(--violet) 15%, transparent)', color: 'var(--violet)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
        >
          {expandedNews.size > 0 ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* News Timeline - Flat list */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginTop: 8 }}>
        {filteredCompNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
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
                style={{ padding: '16px 24px', cursor: 'pointer', borderLeft: `3px solid ${accentColor}`, borderBottom: i < filteredCompNews.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none', transition: 'background 0.15s' }}
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
                    {news.astsComparison && (
                      <div style={{ padding: '12px 16px', background: 'color-mix(in srgb, var(--mint) 5%, var(--surface))', borderRadius: 12, borderLeft: '3px solid var(--mint)', marginTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 4 }}>ASTS Comparison</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{news.astsComparison}</div>
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

      {/* Competitor Profiles (Collapsible) */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#competitor-profiles</div>
      <div style={{ background: 'color-mix(in srgb, var(--surface2) 60%, transparent)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Technology</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.technology}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Status</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.currentStatus}</div>
                </div>
                {comp.keyMetrics?.coverage && (
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Coverage</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.keyMetrics.coverage}</div>
                  </div>
                )}
                {comp.keyMetrics?.funding && (
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--text3)' }}>Funding</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{comp.keyMetrics.funding}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#cfa-notes</div>
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
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. current.date, current.source - Change date and filing reference
// 2. executiveSummary - Update headline, thesis, bottomLine, whatsNew[]
// 3. scorecard - Re-evaluate all 8 unified categories (A-F grades)
//    Categories: Financial Strength, Profitability, Growth, Valuation,
//                Competitive Position, Execution, Regulatory/External, Capital Structure
// 4. growthDrivers - Update impact levels and descriptions
// 5. moatSources/moatThreats - Adjust strength/risk if competitive position changed
// 6. risks - Re-evaluate severity, likelihood, impact
// 7. perspectives - Update CFA/HedgeFund/CIO assessments and recommendations
// 8. archive - ADD NEW ENTRY AT TOP with unified schema:
//    { date, trigger, verdict, priorVerdict, headline, rationale,
//      keyDevelopments[], forwardView }
// 9. Rating Header - Update verdict badge, price target, key metrics
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
    
    // Investment Scorecard — Unified 8-category framework (matches BMNR/CRCL)
    scorecard: [
      { category: 'Financial Strength', rating: 'A-', color: 'var(--mint)', detail: '$760M cash, runway to profitability secured' },
      { category: 'Profitability', rating: 'C+', color: 'var(--gold)', detail: 'Pre-revenue; $50-75M H2 guidance, path to FCF by 2026' },
      { category: 'Growth', rating: 'A', color: 'var(--mint)', detail: '$1B+ contracted revenue, 6 MNOs signed, 50+ pipeline' },
      { category: 'Valuation', rating: 'B', color: 'var(--sky)', detail: 'Pre-revenue multiple; execution-dependent upside' },
      { category: 'Competitive Position', rating: 'A', color: 'var(--mint)', detail: '3,000+ patents, licensed spectrum, 4yr lead, 95% vertical' },
      { category: 'Execution', rating: 'A-', color: 'var(--mint)', detail: 'Block 1 operational, ASIC proven, 6 sats/month target' },
      { category: 'Regulatory/External', rating: 'B', color: 'var(--sky)', detail: 'FCC approved, international pending, aviation concerns' },
      { category: 'Capital Structure', rating: 'B-', color: 'var(--gold)', detail: '$707M converts outstanding, potential future dilution' },
    ],
    
    // Executive Summary — Unified schema (matches BMNR/CRCL)
    executiveSummary: {
      headline: "Technology Proven. Now It's About Execution.",
      thesis: "ASTS has crossed the Rubicon. The technology works. Block 1 satellites are beaming real broadband to real phones. The only question now: can they build and launch fast enough?",
      bottomLine: "This is no longer a science experiment. It's an industrial scaling challenge—and they're winning.",
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
      { driver: 'Government Contracts', impact: 'High', description: 'MDA SHIELD prime contractor (Jan 2026). Multiple DoD/SDA/DIU contracts. Defense sees strategic value in dual-use LEO constellation.', color: 'var(--mint)' },
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
    
    // Three Perspectives — Unified schema (matches BMNR/CRCL)
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'CONSTRUCTIVE WITH VOLATILITY',
        color: 'var(--sky)',
        summary: 'Pre-revenue technology company transitioning to commercial operations. Strong balance sheet ($760M cash) and de-risked technology, but valuation assumes significant execution. Best suited for growth-oriented portfolios with 2-3 year horizon. High volatility expected.',
        ecosystemView: 'LEO satellite connectivity market inflecting. 5B people lack reliable mobile coverage. MNO economics favor wholesale spectrum leasing over CAPEX. Government/defense spending on space communications accelerating. First-mover with working technology creates optionality.',
        recommendation: 'Allocate 2-4% of growth portfolio. Rebalance on 30%+ moves.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG',
        color: 'var(--mint)',
        summary: 'Asymmetric setup: technology proven, binary execution risk remains. Event calendar stacked with launches, MNO announcements, and revenue recognition. Stock trades on sentiment — volatile but predictable patterns around catalysts.',
        ecosystemView: 'Starlink/T-Mobile partnership validates D2D market. Apple Emergency SOS adoption proves consumer demand. MNO consolidation trends favor infrastructure partners. ASTS spectrum holdings are strategic assets in capacity-constrained environment.',
        recommendation: 'Size 4-6% of book. Add on pullbacks to 50-day MA. Trim on 30%+ rips.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'SATELLITE POSITION',
        color: 'var(--violet)',
        summary: 'This is venture-style risk in a public equity wrapper. The market opportunity is massive (5B people), the technology works, and the team has executed through near-death experiences. Multi-bagger potential if thesis plays out, but size accordingly.',
        ecosystemView: 'Telecom infrastructure is a multi-decade investment theme. ASTS addresses fundamental gap in global coverage. Strategic investors (AT&T, Verizon, Vodafone, Google) validate market opportunity. Defense applications provide revenue diversification and strategic importance.',
        recommendation: '3-5% max portfolio weight. Hold for 2-3 year thesis.',
      },
      technicalAnalyst: {
        title: 'Technical Analyst',
        assessment: 'BULLISH — BREAKOUT WATCH',
        color: 'var(--sky)',
        summary: 'Classic catalyst-driven momentum stock. Price gaps on launch news create defined support/resistance zones. Currently consolidating above 50-day SMA with declining volatility — textbook bull flag formation. RSI reset from overbought provides fresh runway. Volume accumulation patterns evident on weekly timeframe.',
        ecosystemView: 'ASTS trades on sentiment cycles tied to satellite launch calendar. Key technical levels: $25-30 support zone (prior breakout), $40-45 resistance (prior highs). MACD bullish crossover on weekly chart. Relative strength vs NASDAQ positive. Watch for volume surge above 20M shares as breakout confirmation signal.',
        recommendation: 'Accumulate on pullbacks to 50-day SMA. Add on breakout above $45 with volume. Stop loss: close below $25.',
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
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 8 }}>{title}{sources && <UpdateIndicators sources={sources} />}</span>
        <span style={{ color: 'var(--text3)', fontSize: 18 }}>{investmentSections.has(id) ? '−' : '+'}</span>
      </div>
      {investmentSections.has(id) && <div style={{ padding: '24px 24px' }}>{children}</div>}
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Controls */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Due Diligence<UpdateIndicators sources={['PR', 'SEC']} /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Investment Analysis<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Multi-perspective due diligence analysis with CFA, hedge fund, and institutional frameworks. Scoring, risk assessment, and historical perspective tracking.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, alignItems: 'center', paddingTop: 12 }}>
        <button onClick={expandAll} style={{ padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 500, border: '1px solid var(--border)', cursor: 'pointer', background: 'transparent', color: 'var(--text3)', transition: 'all 0.2s' }}>Expand All</button>
        <button onClick={collapseAll} style={{ padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 500, border: '1px solid var(--border)', cursor: 'pointer', background: 'transparent', color: 'var(--text3)', transition: 'all 0.2s' }}>Collapse All</button>
      </div>

      {/* Data Refresh Indicator */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text3)' }}>
        <span>Data as of: <strong style={{ color: 'var(--text2)' }}>{current.date}</strong></span>
        <span>•</span>
        <span>Source: <strong style={{ color: 'var(--text2)' }}>{current.source}</strong></span>
      </div>

      {/* Rating Header */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Current Assessment</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', borderLeft: '4px solid var(--mint)' }}>
        <div style={{ padding: '24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '8px 20px', borderRadius: 99, fontWeight: 700, fontSize: 18 }}>CONSTRUCTIVE</span>
              <span style={{ background: 'rgba(126,231,135,0.15)', color: 'var(--mint)', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>TECHNOLOGY PROVEN</span>
            </div>
            <div style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 500 }}>
              {current.executiveSummary.thesis}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>
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
            <strong>Position Sizing:</strong> 3-5% for growth portfolios • 1-2% for balanced • Speculative allocation for conservative
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
          <strong>Moat Durability:</strong> A- (Strong). Spectrum + patents + manufacturing scale create defensible position. 4+ year technology lead is substantial. Key risk is well-funded competitors (Starlink) accelerating D2D efforts.
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
          Multi-perspective risk evaluation and strategic decision framework for space-based cellular infrastructure
        </div>

        {/* Part 1: Multi-Perspective Risk Evaluation */}
        <div style={{ paddingBottom: 8, borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)' }}>Risk Evaluation — Four Perspectives</span></div>

        {/* CFA Level III Perspective */}
        <div style={{ background: 'color-mix(in srgb, var(--cyan) 5%, transparent)', padding: '12px 16px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--cyan) 20%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--cyan)', color: 'var(--bg)', padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>CFA LEVEL III</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Portfolio Construction & Factor Analysis</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>Factor Exposures:</strong> ASTS exhibits high beta (~1.8-2.2) to growth/momentum factors with significant idiosyncratic risk from execution milestones. Low correlation to traditional telcos (~0.2) and satellite peers (~0.4). This is a binary outcome investment — success yields 5-10x, failure yields 80%+ loss. Standard MPT optimization doesn't apply; treat as venture-like allocation within public markets sleeve.
            </p>
            <p style={{ }}>
              <strong>Liquidity Analysis:</strong> Average daily volume ~$100-200M provides excellent liquidity for most institutional positions. Options market active with reasonable spreads. Convertible bonds provide additional hedging/exposure vehicles. Short interest ~15% creates squeeze potential but also overhang. Position sizing up to 3-5% of portfolio feasible without market impact.
            </p>
            <p style={{ }}>
              <strong>Governance & ESG:</strong> Founder Abel Avellan controls ~73% voting via Class C shares — concentration risk but also alignment. Board includes telecom veterans. ESG profile positive: enabling connectivity for underserved populations, reducing need for physical infrastructure. Space debris concerns manageable with LEO orbit decay. Spectrum rights secured through MNO partnerships — regulatory moat.
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
              <strong>Event Calendar Alpha:</strong> ASTS is a catalyst machine — launches, FCC approvals, MNO activations, revenue recognition events provide defined trading opportunities. Strategy: size up 2-3 weeks before known catalysts, trim 50% into strength on positive outcomes, add on "sell the news" weakness if thesis intact. Each successful launch de-risks the next.
            </p>
            <p style={{ }}>
              <strong>Short Squeeze Dynamics:</strong> ~15% short interest with high conviction longs creates squeeze potential on positive catalysts. Days to cover ~3-4. Monitor borrow rates for squeeze signals. Historical pattern: 20-40% moves on successful launches. Position accordingly — don't short this name, and size longs to benefit from squeezes.
            </p>
            <p style={{ }}>
              <strong>Convertible Arbitrage:</strong> $1.625B in converts outstanding at various strikes ($80-$180+). As stock approaches conversion prices, arbitrage flows create support. Monitor convert pricing vs equity for relative value opportunities. Converts provide downside cushion narrative but also overhang concerns — net neutral to slightly positive for equity.
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
              <strong>Strategic Thesis:</strong> ASTS represents "infrastructure for the next billion connected users" — a thematic play on global connectivity megatrend. Unlike Starlink (D2C, new devices), ASTS works with existing phones via MNO partnerships. This is picks-and-shovels for mobile connectivity expansion. The 50/50 revenue share model means MNOs are incentivized to push adoption.
            </p>
            <p style={{ }}>
              <strong>Portfolio Fit:</strong> Classify as "thematic/disruptive innovation" allocation, not traditional telecom. Appropriate for growth portfolios with 5-10 year horizons. Do not benchmark against telco index — this is a pre-revenue infrastructure buildout. Comparable to early-stage cloud or fiber investments. Size as venture-like position (1-3% max) given binary risk profile.
            </p>
            <p style={{ }}>
              <strong>Fiduciary Narrative:</strong> If questioned by stakeholders: "We own the infrastructure layer enabling mobile operators to extend coverage without building towers — backed by AT&T, Verizon, Vodafone partnerships and $1B+ in contracted revenue." The blue-chip MNO partnerships provide institutional credibility. Comparable thesis to early investments in cell tower REITs.
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
              <strong>Trend Structure:</strong> Classic catalyst-driven momentum stock. Price gaps on launch news create defined support/resistance zones. Currently consolidating above 50-day SMA with declining volatility — textbook bull flag formation. RSI reset from overbought provides fresh runway for next leg up.
            </p>
            <p style={{ }}>
              <strong>Key Levels:</strong> Support zone at $25-30 (prior breakout level, high volume node). Resistance at $40-45 (prior swing highs). MACD bullish crossover on weekly chart. Volume accumulation patterns evident — institutional buying on dips. Watch for breakout above $45 with volume &gt;20M shares as confirmation signal.
            </p>
            <p style={{ }}>
              <strong>Catalyst Trading:</strong> Satellite launch dates provide predictable volatility windows. Build position 2-3 weeks before scheduled launches. Take partial profits into strength post-launch. Use RSI divergence to identify exhaustion after catalyst-driven rallies. Relative strength vs NASDAQ positive — outperforming growth cohort.
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
            <span style={{ background: 'var(--mint)', color: 'var(--bg)', padding: '6px 16px', borderRadius: 99, fontWeight: 700, fontSize: 13 }}>YES — HIGH CONVICTION</span>
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
            <p style={{ }}>
              <strong>The Case:</strong> Constellation deployment is accelerating (6 sats/month production), commercial service imminent in 2026, $1B+ contracted revenue provides visibility, and MNO partnerships de-risk go-to-market. The technology works (BW3 proved it). Valuation at ~$300/potential subscriber is cheap vs telco M&A comps ($500+). Risk/reward is asymmetric to the upside.
            </p>
            <p style={{ }}>
              <strong>The Hesitation:</strong> Still pre-revenue with $300M+ annual burn. Execution risk on 40+ satellite launches. FCC/regulatory uncertainty in some markets. Starlink competition narrative (though different model). Stock has run significantly — buying at highs feels uncomfortable.
            </p>
            <p style={{ }}>
              <strong>The Verdict:</strong> Yes, initiate or add to position. The de-risking from successful launches justifies higher prices. Use pullbacks on "sell the news" events to add. This is a 3-5 year hold — don't trade around short-term volatility. Size appropriately for binary outcome profile (1-3% of portfolio).
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
                Catalyst-rich period: BB7-13 launches, US commercial service initiation, Q4 earnings. Expect 30-50% swings around events. Successful launches = 10-20% pops, then consolidation. Trading range likely $20-45 depending on execution. Volatility is your friend if sized correctly.
              </div>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--sky) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--sky) 20%, transparent)' }}>
              <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 13 }}>Mid-Term (6-18 months)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                Revenue recognition begins — first real P&L validation. If penetration tracks to 1%+, narrative shifts from "will it work?" to "how big can it get?" Multiple expansion potential. Target range: $50-100 if execution continues. This is where the thesis gets proven or broken.
              </div>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--cyan) 10%, transparent)', padding: 12, borderRadius: 12, border: '1px solid color-mix(in srgb, var(--cyan) 20%, transparent)' }}>
              <div style={{ fontWeight: 600, color: 'var(--cyan)', fontSize: 13 }}>Long-Term (3-5 years)</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                At scale (2%+ penetration, 60M+ subs), ASTS could generate $5-10B revenue at 50%+ EBITDA margins. At telco multiples (8-12x EBITDA), that's $40-120B EV vs ~$12B today. 3-10x return potential. But crypto-like volatility along the way — expect multiple 40%+ drawdowns.
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
              <strong style={{ color: 'var(--cyan)' }}>Position Sizing:</strong> 2-4% for aggressive growth portfolios, 1-2% for balanced growth, avoid for conservative/income. This is a high-conviction, high-volatility position. Size so you can hold through 50% drawdowns without losing sleep. Never bet the farm on binary outcomes.
            </p>
            <p style={{ }}>
              <strong style={{ color: 'var(--sky)' }}>Entry Approach:</strong> Accumulate on pullbacks, especially "sell the news" events after successful launches. Add on 15-20% dips from local highs. Don't chase parabolic moves. Use 4-8 week DCA for new positions. Options strategies (selling puts, bull call spreads) can enhance entry.
            </p>
            <p style={{ }}>
              <strong style={{ color: 'var(--gold)' }}>Exit Strategy:</strong> Trim 20% at 2x, another 20% at 3x, let 60% ride as "house money." Full exit triggers: (1) launch failure pattern (2+ consecutive), (2) major MNO partnership cancellation, (3) competitive moat erosion, (4) management credibility issues. Take profits into strength, not weakness.
            </p>
            <p style={{ }}>
              <strong style={{ color: 'var(--coral)' }}>Risk Management:</strong> No hard stop-losses — volatility will trigger them inappropriately. Instead, thesis-based exits: reassess on any launch failure, regulatory setback, or competitive threat. Maintain conviction through normal volatility. If thesis breaks, exit regardless of price. Time stops: if no commercial traction by end of 2026, reassess entire position.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Position Sizing */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-position</div>
      <CollapsibleSection id="position" title="Position Sizing & Price Targets" sources="WS">
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
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text)', display: 'block', marginBottom: 8 }}>Price Targets by Timeframe</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {current.priceTargets.map((t, i) => (
                <div key={i} style={{ transition: 'background 0.15s', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 6, fontSize: 13 }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text2)' }}>{t.period}</span>
                    <span style={{ color: 'var(--mint)', fontWeight: 600 }}>{t.range}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Context — Unified framework for multi-asset allocation */}
        <div style={{ padding: 16, background: 'color-mix(in srgb, var(--violet) 8%, transparent)', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--violet) 20%, transparent)' }}>
          <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 14 }}>Portfolio Construction Context</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>For multi-asset portfolios holding ASTS alongside other positions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 12 }}>
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Asset Class Bucket</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>Growth / Technology</div>
              <div style={{ fontSize: 11, color: 'var(--gold)' }}>Limit: 15-25% of portfolio</div>
            </div>
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Single-Name Limit</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>3-6% max</div>
              <div style={{ fontSize: 11, color: 'var(--coral)' }}>Pre-revenue, high volatility</div>
            </div>
            <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Correlation Note</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>Low correlation</div>
              <div style={{ fontSize: 11, color: 'var(--mint)' }}>Unique D2D space exposure</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8 }}>
            <strong>Sector Exposure:</strong> ASTS is uncorrelated to other model positions (BMNR, CRCL). Provides telecom infrastructure / space tech exposure. Can be sized independently within growth allocation, but account for total tech concentration if holding other growth names.
          </div>
        </div>
      </CollapsibleSection>

      {/* Analysis Archive */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#investment-archive</div>
      <CollapsibleSection id="archive" title="Analysis Archive — Complete History" sources={['PR', 'SEC']}>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Full record of all investment thesis updates. Never deleted. Tracking since Q3 2022.</div>
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
                <span style={{ color: getVerdictColor(a.verdict), fontWeight: 600, fontSize: 13 }}>{a.verdict}</span>
              </div>
              <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>{a.headline}</div>
              <div style={{ color: 'var(--text2)', fontSize: 13 }}>{a.summary}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>Filing: {a.filing}</div>
              
              {expandedArchive === i && (
                <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <div style={{ }}>
                    <div style={{ fontWeight: 600, color: 'var(--sky)', fontSize: 12 }}>Key Developments</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {a.keyDevelopments.map((d, j) => (
                        <span key={j} style={{ padding: '4px 8px', background: 'var(--surface)', borderRadius: 4, fontSize: 11, color: 'var(--text3)' }}>• {d}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div style={{ padding: 12, background: 'color-mix(in srgb, var(--mint) 10%, transparent)', borderRadius: 6 }}>
                      <div style={{ fontWeight: 600, color: 'var(--mint)', fontSize: 11 }}>Why It Mattered</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)' }}>{a.whyItMatters}</div>
                    </div>
                    <div style={{ padding: 12, background: 'color-mix(in srgb, var(--violet) 10%, transparent)', borderRadius: 6 }}>
                      <div style={{ fontWeight: 600, color: 'var(--violet)', fontSize: 11 }}>Looking Ahead (at the time)</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)' }}>{a.lookingAhead}</div>
                    </div>
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
        { term: 'Multi-Perspective Analysis', def: 'Evaluating investments through different lenses (CFA fundamentals, hedge fund catalysts, institutional risk). Each perspective reveals blind spots the others miss.' },
        { term: 'Conviction Score', def: 'Aggregate rating combining fundamental analysis, technical positioning, catalyst proximity, and risk/reward asymmetry. Higher scores indicate stronger investment thesis.' },
        { term: 'Position Sizing', def: 'Determining allocation size based on conviction, volatility, correlation to existing holdings, and maximum drawdown tolerance. Higher conviction allows larger positions.' },
        { term: 'Catalyst Calendar', def: 'Timeline of upcoming events that could move the stock (earnings, FDA decisions, product launches). Catalysts create asymmetric risk/reward opportunities.' },
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
  
  const ANALYST_COVERAGE = ASTS_ANALYST_COVERAGE;

  return (
    <>
      <SharedWallStreetTab coverage={ANALYST_COVERAGE} ticker="ASTS" />
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HEADER                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ fontSize: 10, color: 'var(--text3)', opacity: 0.5, fontFamily: 'monospace', marginTop: 24 }}>#financials-header</div>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>Quarterly Data<UpdateIndicators sources="SEC" /></div>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.5px' }}>Financials<span style={{ color: 'var(--accent)' }}>.</span></h2>
        <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 640, lineHeight: 1.7, marginTop: 12, fontWeight: 300 }}>Quarterly financial statements, key metrics, and trend analysis. Pre-revenue stage with focus on cash position, burn rate, and path to commercial service.</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: KEY METRICS EVOLUTION                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Quarterly Metrics</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <QuarterlyMetricsPanel />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8: KEY FINANCIAL MILESTONES                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ padding: '32px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)' }}>Key Financial Milestones</span>
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
            <div key={i} style={{ padding: 12, background: 'var(--surface)', borderRadius: 0 }}>
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
        { term: 'Pre-Revenue Valuation', def: 'Companies with no revenue are valued on TAM, technology readiness, and cash runway. Focus on burn rate, cash position, and path to first revenue rather than traditional multiples.' },
        { term: 'Cash Burn Rate', def: 'Quarterly operating cash outflow. Critical metric for pre-revenue companies. Divide cash on hand by quarterly burn to get runway in quarters.' },
        { term: 'SBC vs Cash Expenses', def: 'Stock-based compensation is a real expense but non-cash. Adjusted EBITDA adds back SBC, but GAAP net income includes it. Use both views for complete picture.' },
        { term: 'Operating Leverage', def: 'High fixed costs + low variable costs = operating leverage. Once revenue exceeds fixed costs, incremental margins are very high. Space/tech companies typically have extreme operating leverage.' },
      ]} />
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
