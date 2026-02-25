'use client';

/**
 * Shared UI primitives for all stock model components (ASTS, BMNR, CRCL).
 *
 * Single source of truth — these components are identical across all three models.
 * Uses CSS classes from stock-model-styles.ts for theming (sm-* prefix).
 */
import React from 'react';
import type { StatProps, CardProps, RowProps, InputProps, PanelProps, GuideProps, CFANotesProps } from './stockModelTypes';
import { UpdateIndicators } from './UpdateIndicators';

// ── Card color map ──────────────────────────────────────────────────────────
// Uses CSS color-mix() with design-token variables for theme consistency.
const CARD_COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  blue:    { bg: 'color-mix(in srgb, var(--sky) 15%, transparent)',    border: 'color-mix(in srgb, var(--sky) 30%, transparent)',    text: '#60a5fa' },
  green:   { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)',   border: 'color-mix(in srgb, var(--mint) 30%, transparent)',   text: '#4ade80' },
  red:     { bg: 'color-mix(in srgb, var(--coral) 15%, transparent)',  border: 'color-mix(in srgb, var(--coral) 30%, transparent)',  text: '#f87171' },
  yellow:  { bg: 'color-mix(in srgb, var(--gold) 15%, transparent)',   border: 'color-mix(in srgb, var(--gold) 30%, transparent)',   text: '#facc15' },
  purple:  { bg: 'color-mix(in srgb, var(--violet) 15%, transparent)', border: 'color-mix(in srgb, var(--violet) 30%, transparent)', text: '#c084fc' },
  orange:  { bg: 'color-mix(in srgb, var(--gold) 15%, transparent)',  border: 'color-mix(in srgb, var(--gold) 30%, transparent)',  text: '#fb923c' },
  cyan:    { bg: 'color-mix(in srgb, var(--cyan) 15%, transparent)',   border: 'color-mix(in srgb, var(--cyan) 30%, transparent)',   text: '#22d3ee' },
  violet:  { bg: 'color-mix(in srgb, var(--violet) 15%, transparent)', border: 'color-mix(in srgb, var(--violet) 30%, transparent)', text: '#a78bfa' },
  mint:    { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)',   border: 'color-mix(in srgb, var(--mint) 30%, transparent)',   text: '#34d399' },
  emerald: { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)',   border: 'color-mix(in srgb, var(--mint) 30%, transparent)',   text: '#34d399' },
};

// ── Components ──────────────────────────────────────────────────────────────

export const Stat = React.memo<StatProps>(({ label, value, color = 'white', updateSource }) => (
  <div className="stat-item">
    <div className="label sm-flex">
      {label}
      <UpdateIndicators sources={updateSource} />
    </div>
    <div className={`val ${color}`}>{value}</div>
  </div>
));
Stat.displayName = 'Stat';

export const Card = React.memo<CardProps>(({ label, value, sub, color, updateSource }) => {
  const c = CARD_COLOR_MAP[color || 'blue'] || CARD_COLOR_MAP.blue;
  return (
    <div className="sm-card-colored" style={{ '--card-bg': c.bg, '--card-border': c.border, '--card-text': c.text } as React.CSSProperties}>
      <div className="sm-card-label">
        {label}
        <UpdateIndicators sources={updateSource} />
      </div>
      <div className="sm-card-value">{value}</div>
      {sub && <div className="sm-subtle">{sub}</div>}
    </div>
  );
});
Card.displayName = 'Card';

export const Row = React.memo<RowProps>(({ label, value, highlight = false, updateSource }) => (
  <div className="sm-row" data-highlight={highlight ? 'true' : undefined}>
    <span className="sm-row-label">
      {label}
      <UpdateIndicators sources={updateSource} />
    </span>
    <span className="sm-row-value">{value}</span>
  </div>
));
Row.displayName = 'Row';

export const Input = React.memo<InputProps>(({ label, value, onChange, step = 1, min, max }) => (
  <div>
    <label className="sm-input-label">{label}</label>
    <input
      type="number"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      step={step}
      min={min}
      max={max}
      className="sm-input-field"
    />
  </div>
));
Input.displayName = 'Input';

export const Panel = React.memo<PanelProps>(({ title, children }) => (
  <div className="sm-panel">
    {title && <div className="sm-panel-title sm-mb-12">{title}</div>}
    {children}
  </div>
));
Panel.displayName = 'Panel';

export const Guide = React.memo<GuideProps>(({ title, children }) => (
  <div className="highlight">
    <h3 className="sm-flex">
      <span>📚</span> {title}
    </h3>
    <div className="sm-guide-content">{children}</div>
  </div>
));
Guide.displayName = 'Guide';

export const CFANotes = React.memo<CFANotesProps>(({ title, items }) => (
  <div className="sm-cfa-notes">
    <div className="sm-flex sm-gap-6">
      <span className="sm-subtle" style={{ opacity: 0.7 }}>📚</span>
      <h4 className="sm-cfa-title">{title || 'CFA Level III — Key Concepts'}</h4>
    </div>
    <div className="sm-cfa-list">
      {items.map((item, i) => (
        <p key={i}>
          <strong>{item.term}:</strong> {item.def}
        </p>
      ))}
    </div>
  </div>
));
CFANotes.displayName = 'CFANotes';
