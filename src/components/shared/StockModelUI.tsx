'use client';

/**
 * Shared UI primitives for all stock model components (ASTS, BMNR, CRCL).
 *
 * Single source of truth — these components are identical across all three models.
 * Uses CSS custom properties from stock-model-styles.ts for theming.
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
  orange:  { bg: 'color-mix(in srgb, var(--coral) 15%, transparent)',  border: 'color-mix(in srgb, var(--coral) 30%, transparent)',  text: '#fb923c' },
  cyan:    { bg: 'color-mix(in srgb, var(--cyan) 15%, transparent)',   border: 'color-mix(in srgb, var(--cyan) 30%, transparent)',   text: '#22d3ee' },
  violet:  { bg: 'color-mix(in srgb, var(--violet) 15%, transparent)', border: 'color-mix(in srgb, var(--violet) 30%, transparent)', text: '#a78bfa' },
  mint:    { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)',   border: 'color-mix(in srgb, var(--mint) 30%, transparent)',   text: '#34d399' },
  emerald: { bg: 'color-mix(in srgb, var(--mint) 15%, transparent)',   border: 'color-mix(in srgb, var(--mint) 30%, transparent)',   text: '#34d399' },
};

// ── Components ──────────────────────────────────────────────────────────────

export const Stat = React.memo<StatProps>(({ label, value, color = 'white', updateSource }) => (
  <div className="stat-item">
    <div className="label" style={{ display: 'flex', alignItems: 'center' }}>
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

export const Row = React.memo<RowProps>(({ label, value, highlight = false, updateSource }) => (
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

export const Input = React.memo<InputProps>(({ label, value, onChange, step = 1, min, max }) => (
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

export const Panel = React.memo<PanelProps>(({ title, children }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 24px', marginBottom: 12 }}>
    {title && <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text)', marginBottom: 12 }}>{title}</div>}
    {children}
  </div>
));
Panel.displayName = 'Panel';

export const Guide = React.memo<GuideProps>(({ title, children }) => (
  <div className="highlight">
    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>📚</span> {title}
    </h3>
    <div style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '15px' }}>{children}</div>
  </div>
));
Guide.displayName = 'Guide';

export const CFANotes = React.memo<CFANotesProps>(({ title, items }) => (
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
