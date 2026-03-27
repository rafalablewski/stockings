'use client';

/**
 * SharedMonteCarloTab - Unified Monte Carlo Simulation Tab Shell
 *
 * Stock-agnostic shared component for ASTS, BMNR, CRCL Monte Carlo tabs.
 * Owns all layout chrome: hero, preset grid, horizon/sim controls, run button,
 * percentile table, risk metrics table, histogram chart, CFA notes.
 *
 * Stock-specific content (parameter sliders, simulation engine) stays in each
 * stock file and is injected via render props.
 *
 * @version 1.0.0
 * @created 2026-03-11
 */

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { SharedMonteCarloTabProps } from './monteCarloTypes';
import { UpdateIndicators } from './UpdateIndicators';
import { CFANotes } from './StockModelUI';

export const SharedMonteCarloTab: React.FC<SharedMonteCarloTabProps> = ({
  sectionLabel,
  description,
  sources = ['PR', 'SEC'],
  currentStockPrice,
  referenceLabel = 'current price',
  presets,
  presetOrder,
  activePreset,
  onPresetChange,
  years,
  yearOptions = [3, 5, 7],
  onYearsChange,
  sims,
  simOptions = [1000, 2000, 5000],
  onSimsChange,
  onRun,
  sim,
  renderParameters,
  renderAfterPresets,
  renderAfterRiskMetrics,
  cfaItems,
}) => {
  return (
    <div className="sm-tab-stack">
      {/* ── Hero ── */}
      <div className="sm-tab-hero">
        <div className="sm-section-label">{sectionLabel}<UpdateIndicators sources={sources} /></div>
        <h2>Monte Carlo<span className="sm-accent">.</span></h2>
        <p>{description}</p>
      </div>

      {/* ── Scenario Presets ── */}
      <div>
        <div className="sm-model-grid" style={{ '--cols': presetOrder.length } as React.CSSProperties}>
          {presetOrder.map(key => {
            const p = presets[key];
            if (!p) return null;
            const isActive = activePreset === key;
            return (
              <div
                key={key}
                onClick={() => onPresetChange(key)}
                className="sm-preset-card"
                data-active={isActive || undefined}
                style={{ '--preset-color': p.color } as React.CSSProperties}
              >
                <div className="sm-micro-text">{p.label}</div>
                <div className="sm-scenario-card-header" style={{ color: isActive ? p.color : 'var(--text)' }}>
                  {p.headerValue}
                </div>
                {p.headerSub && (
                  <div className="sm-micro-text sm-scenario-subtitle">
                    {p.headerSub}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── After presets (optional stock-specific content) ── */}
      {renderAfterPresets?.()}

      {/* ── Horizon & Simulation Controls ── */}
      <div>
        <div className="sm-grid-2">
          <div className="sm-card">
            <div className="sm-card-section"><span className="sm-section-label">TIME HORIZON</span></div>
            <div className="sm-card-body">
            <div className="sm-flex sm-gap-8">
              {yearOptions.map(yr => (
                <button
                  key={yr}
                  onClick={() => onYearsChange(yr)}
                  className="sm-pill-toggle"
                  data-active={years === yr ? "true" : undefined}
                >
                  {yr}Y
                </button>
              ))}
            </div>
            </div>
          </div>
          <div className="sm-card">
            <div className="sm-card-section"><span className="sm-section-label">SIMULATIONS</span></div>
            <div className="sm-card-body">
            <div className="sm-flex sm-gap-8">
              {simOptions.map(simCount => (
                <button
                  key={simCount}
                  onClick={() => onSimsChange(simCount)}
                  className="sm-pill-toggle"
                  data-active={sims === simCount ? "true" : undefined}
                >
                  {simCount.toLocaleString()}
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stock-specific parameters ── */}
      {renderParameters()}

      {/* ── Run Button ── */}
      <button onClick={onRun} className="sm-run-btn">🎲 Run Simulation</button>

      {/* ── Percentile Distribution ── */}
      <div>
        <div className="sm-card">
          <div className="sm-table-header sm-gtc-4x1fr">
            <span className="sm-text-left">Percentile</span>
            <span className="sm-text-right">Price Target</span>
            <span className="sm-text-right">vs Current</span>
            <span className="sm-text-right">Implied Return</span>
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
              <div key={i} className="sm-table-row sm-gtc-4x1fr" data-highlight={row.highlight || undefined}>
                <span className="sm-mc-label" data-highlight={row.highlight || undefined}>{row.label}</span>
                <span className="sm-mc-value" data-highlight={row.highlight || undefined} data-weight={row.highlight ? undefined : "500"}>${row.value.toFixed(2)}</span>
                <span className="sm-mc-diff">${(row.value - currentStockPrice).toFixed(2)}</span>
                <span className="sm-mc-pct" data-positive={pctChange >= 0 || undefined} data-negative={pctChange < 0 || undefined}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Risk Metrics ── */}
      <div>
        <div className="sm-card">
          <div className="sm-table-header sm-gtc-3x1">
            <span className="sm-text-left">Risk Metric</span>
            <span className="sm-text-right">Value</span>
            <span className="sm-text-left">Interpretation</span>
          </div>
          {[
            { label: 'Win Probability', value: <span className="sm-mc-risk-val" data-color={sim.winProbability > 50 ? 'mint' : 'red'}>{sim.winProbability.toFixed(1)}%</span>, interp: 'Prob. of exceeding current price' },
            { label: 'Expected Value', value: <span className="sm-mc-risk-val">${sim.mean.toFixed(2)}</span>, interp: 'Mean simulated fair value' },
            { label: 'Sharpe Ratio', value: <span className="sm-mc-risk-val" data-color={sim.sharpe > 1 ? 'mint' : sim.sharpe > 0.5 ? 'gold' : 'text2'}>{sim.sharpe.toFixed(2)}</span>, interp: sim.sharpe > 1 ? 'Excellent risk-adj return' : sim.sharpe > 0.5 ? 'Good risk-adj return' : 'Moderate risk-adj return' },
            { label: 'Sortino Ratio', value: <span className="sm-mc-risk-val" data-color={sim.sortino > 1 ? 'mint' : sim.sortino > 0.5 ? 'gold' : 'text2'}>{sim.sortino.toFixed(2)}</span>, interp: 'Downside-adjusted return' },
            { label: 'VaR (5%)', value: <span className="sm-mc-risk-val" data-color="red">{sim.var5.toFixed(1)}%</span>, interp: '95% confidence floor' },
            { label: 'CVaR (5%)', value: <span className="sm-mc-risk-val" data-color="red">{sim.cvar5.toFixed(1)}%</span>, interp: 'Expected tail loss' },
          ].map((row, i) => (
            <div key={i} className="sm-table-row sm-gtc-3x1">
              <span className="sm-text2">{row.label}</span>
              <span className="sm-text-right">{row.value}</span>
              <span className="sm-text3">{row.interp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── After risk metrics (optional stock-specific content) ── */}
      {renderAfterRiskMetrics?.()}

      {/* ── Distribution Chart ── */}
      <div>
        <div className="sm-card">
          <div className="sm-card-section"><span className="sm-section-label">FAIR VALUE DISTRIBUTION</span></div>
          <div className="sm-card-body">
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
          <div className="sm-flex-between sm-fs-11 sm-text3">
            <span>White line = {referenceLabel} (${currentStockPrice.toFixed(0)})</span>
            <span>Simulations: {sim.n.toLocaleString()}</span>
          </div>
          </div>
        </div>
      </div>

      {/* ── CFA Notes ── */}
      {cfaItems && cfaItems.length > 0 && (
        <div>
          <CFANotes title="CFA Level III — Monte Carlo Simulation" items={cfaItems} />
        </div>
      )}
    </div>
  );
};

export default SharedMonteCarloTab;
