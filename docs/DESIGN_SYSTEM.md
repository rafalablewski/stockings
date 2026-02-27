# Investment Tab — Design System

Reference for the shared Investment Tab glass-border card pattern, CSS class taxonomy, and render-prop architecture.

---

## Glass-Border Card Pattern

All list sections use a 1px-gap card pattern where the container's `background: var(--border)` bleeds through the gap between children, creating crisp 1px dividers without extra elements.

```
Container (.sm-inv-glass-list)
├── background: var(--border)
├── gap: 1px
├── border-radius: 12px
├── overflow: hidden
│
├── Item (.sm-inv-glass-item)
│   └── background: var(--surface)
│       hover → var(--surface2)
│
├── Accent Item (.sm-inv-glass-accent)
│   └── border-left: 3px solid var(--inv-accent)
│
└── Perspective (.sm-inv-perspective)
    └── Used in 2×2 grid layout
```

### Section Variants

| Class | Purpose |
|---|---|
| `.sm-inv-glass-list` | Container with 1px gap + border radius |
| `.sm-inv-glass-item` | Standard row — surface bg, hover effect |
| `.sm-inv-glass-accent` | Row with left accent border via `--inv-accent` |
| `.sm-inv-perspective` | Perspective card in 2×2 grid |
| `.sm-inv-severity` | Risk matrix row with `--inv-accent` left border |

---

## CSS Custom Property Protocol

Only CSS custom property pass-throughs are allowed as inline `style` attributes. No other inline styles.

| Variable | Scope | Purpose |
|---|---|---|
| `--inv-accent` | Cards, badges, labels | Dynamic color from data (e.g., severity, impact) |
| `--cols` | `.sm-model-grid` | Column count for KPI grids |
| `--kpi-color` | `.sm-kpi-cell` | KPI accent color |
| `--dot-bg` | Update indicator dots | Status dot color |
| `--callout-color` | `.sm-callout` | Callout border/accent color |
| `--tag-color` | `.sm-news-tag` | Tag accent color |
| `--bar-accent-1`, `--bar-accent-2` | `.sm-highlight-bar` | Gradient bar colors |

### Usage Example

```tsx
<div
  className="sm-inv-glass-accent"
  style={{ '--inv-accent': driver.color } as React.CSSProperties}
>
```

---

## Component Classes Reference

### Layout & Verdict

| Class | Description |
|---|---|
| `.sm-inv-card-accent` | Left border accent on verdict card |
| `.sm-inv-verdict-badge` | Large colored pill (verdict text) |
| `.sm-inv-ticker-badge` | Small accent pill (ticker label) |
| `.sm-inv-whats-new` | Callout box for "What's New" section |
| `.sm-inv-whats-new-list` | Styled `<ul>` inside what's-new |

### Data Labels

| Class | Description |
|---|---|
| `.sm-inv-impact-label` | Right-aligned impact/strength label |
| `.sm-inv-likelihood` | Subtle pill for risk likelihood |
| `.sm-inv-assess-badge` | Small colored pill in perspectives |

### Grid & Layout

| Class | Description |
|---|---|
| `.sm-inv-perspectives-grid` | 2×2 grid (1×1 on mobile) for perspectives |
| `.sm-justify-end` | `justify-content: flex-end` |

### Archive

| Class | Description |
|---|---|
| `.sm-inv-archive-row` | Clickable archive entry header |
| `.sm-inv-archive-detail` | Expanded archive content |
| `.sm-inv-dev-list` | Key developments `<ul>` |

### Interactive

| Class | Description |
|---|---|
| `.sm-toggle-icon` | Expand/collapse +/- indicator |
| `.sm-range-input` | Range slider (full width, mint accent) |
| `.sm-toggle-header[aria-expanded="true"]` | Bottom border when section is open |

### BMNR Ecosystem Health

| Class | Description |
|---|---|
| `.sm-inv-eco-panel` | Ecosystem health container |
| `.sm-inv-eco-grid` | Responsive metric grid |
| `.sm-inv-eco-metric` | Individual metric cell |
| `.sm-inv-eco-value` | Metric value text |
| `.sm-inv-eco-signal` | Signal indicator text |
| `.sm-inv-eco-grade` | Overall grade badge |
| `.sm-inv-eco-catalyst` | Catalyst callout box |

---

## Render-Prop Architecture

`SharedInvestmentTab` accepts typed render props for stock-specific sections. Each render prop injects content at a specific point in the layout:

```
Tab Hero
├── Current Assessment (rating header)
│   └── renderHeaderMetrics()        → KPI columns (right side)
├── Scorecard Grid
│   └── renderAfterScorecard()       → e.g., BMNR Ecosystem Health
├── Executive Summary
│   └── What's New
├── renderBeforeGrowthDrivers()      → e.g., CRCL Financial Health, Unit Economics
├── Growth Drivers
│   ├── renderGrowthDriversExtra()   → Extra content at bottom
│   └── renderAfterGrowthDrivers()   → e.g., CRCL Valuation Framework
├── Competitive Moat
│   └── moatDurabilityNote           → String appended after moat
├── Risk Matrix
│   └── renderAfterRiskMatrix()      → e.g., CRCL Rate Sensitivity Calculator
├── Strategic Assessment
│   └── renderStrategicAssessment()  → Full perspectives + strategic questions
├── Position Sizing & Price Targets
│   └── renderAccumulation()         → e.g., BMNR Accumulation Zones
├── Archive (expandable entries)
└── CFA Notes
    └── cfaNotes[]                   → Custom term/definition pairs
```

### Props Interface

```typescript
interface SharedInvestmentTabProps {
  current: InvestmentCurrent;
  archive: ArchiveEntry[];
  ticker: string;
  renderHeaderMetrics?: () => React.ReactNode;
  renderAfterScorecard?: () => React.ReactNode;
  renderBeforeGrowthDrivers?: () => React.ReactNode;
  renderGrowthDriversExtra?: () => React.ReactNode;
  renderAfterGrowthDrivers?: () => React.ReactNode;
  moatDurabilityNote?: string;
  renderAfterRiskMatrix?: () => React.ReactNode;
  renderStrategicAssessment?: () => React.ReactNode;
  renderAccumulation?: () => React.ReactNode;
  cfaNotes?: { term: string; def: string }[];
}
```

### Adding a New Stock

1. Create the `InvestmentCurrent` data object with type annotation
2. Create the `ArchiveEntry[]` array
3. Render `<SharedInvestmentTab>` with appropriate render props
4. All stock-specific sections use CSS classes from `stock-model-styles.css`
5. Only `style` attributes allowed are CSS custom property pass-throughs

---

## Utility Class Cheat Sheet

Commonly used utilities (all prefixed `sm-`):

- **Flex:** `sm-flex`, `sm-flex-between`, `sm-flex-1`, `sm-items-center`, `sm-gap-8/12/16`
- **Text:** `sm-text-11/12/13/18`, `sm-fw-500/600/700`, `sm-lh-17/18`
- **Color:** `sm-accent`, `sm-mint`, `sm-text`, `sm-text2`, `sm-text3`
- **Spacing:** `sm-mb-8/12`, `sm-mt-8/12/16`, `sm-pl-16`, `sm-pt-12`, `sm-p-16-20`
- **Surface:** `sm-bg-surface`, `sm-bg-surface2`
- **Misc:** `sm-capitalize`, `sm-italic`, `sm-pre-line`, `sm-inline-block`, `sm-pointer`, `sm-rounded-12`
