/**
 * Shared Monte Carlo Tab Types
 * Unified schema for ASTS, BMNR, CRCL Monte Carlo simulation tabs.
 *
 * The shared component owns the layout shell (hero, presets grid, horizon/sim controls,
 * percentile table, risk metrics, histogram, CFA notes). Stock-specific parameter UI
 * and simulation logic stay in each stock file via render props and data props.
 */

import type { ReactNode } from 'react';
import type { UpdateSource } from './stockModelTypes';

/** A single preset scenario (bear/base/bull/custom/etc.) */
export interface McPreset {
  label: string;
  color: string;
  /** Short description shown below the preset card header */
  desc?: string;
  /** The primary value shown in the preset card (e.g. "$5.5B", "+12%", "15-25%") */
  headerValue: string;
  /** The secondary label shown below the header value (e.g. "45% margin", "65% vol", "rev growth") */
  headerSub?: string;
}

/** Histogram bucket for the distribution chart */
export interface McHistogramBucket {
  price: number;
  pct: number;
}

/** Standardised simulation results that the shared component renders */
export interface McSimResults {
  n: number;
  p5: number;
  p25: number;
  p50: number;
  p75: number;
  p95: number;
  mean: number;
  winProbability: number;
  sharpe: number;
  sortino: number;
  var5: number;
  cvar5: number;
  histogram: McHistogramBucket[];
}

/** CFA note item */
export interface McCfaItem {
  term: string;
  def: string;
}

export interface SharedMonteCarloTabProps {
  // ── Hero ──
  sectionLabel: string;
  description: string;
  sources?: UpdateSource | UpdateSource[];

  // ── Current price (used for percentile table "vs Current" column) ──
  currentStockPrice: number;
  /** Label for the reference line in the chart (e.g. "current price", "current NAV") */
  referenceLabel?: string;

  // ── Presets ──
  presets: Record<string, McPreset>;
  /** Ordered keys to render (e.g. ['bear','base','bull','custom']) */
  presetOrder: string[];
  activePreset: string;
  onPresetChange: (key: string) => void;

  // ── Horizon ──
  years: number;
  yearOptions?: number[];
  onYearsChange: (y: number) => void;

  // ── Simulation count ──
  sims: number;
  simOptions?: number[];
  onSimsChange: (n: number) => void;

  // ── Run button ──
  onRun: () => void;

  // ── Results ──
  sim: McSimResults;

  // ── Render props for stock-specific sections ──
  /** Stock-specific parameter cards (sliders, buttons, etc.) */
  renderParameters: () => ReactNode;
  /** Optional content after presets (e.g. BMNR's current NAV info box) */
  renderAfterPresets?: () => ReactNode;
  /** Optional content after risk metrics (e.g. fan chart, path chart) */
  renderAfterRiskMetrics?: () => ReactNode;

  // ── CFA Notes ──
  cfaItems?: McCfaItem[];
}
