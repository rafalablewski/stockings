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
  return (
    <div className="sm-card-colored" data-color={color || 'blue'}>
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
      <span className="sm-subtle sm-opacity-70">📚</span>
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
