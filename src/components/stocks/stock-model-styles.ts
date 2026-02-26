/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  UNIFIED STOCK MODEL STYLES — stock-model-styles.ts                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * Single source of truth for all stock component styling.
 * Golden Standard: ASTS.tsx — all other models (BMNR, CRCL) mirror its structure.
 *
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │  ARCHITECTURE                                                               │
 * │                                                                             │
 * │  1. DESIGN TOKENS (:root)       — Colors, surfaces, borders, typography     │
 * │  2. BASE COMPONENTS             — Hero, stats, nav, cards, tables, charts   │
 * │  3. INTERACTION PATTERNS        — Filters, dropdowns, sliders, pills        │
 * │  4. DISCLAIMER                  — Legal banner                              │
 * │  5. MOBILE RESPONSIVE           — Touch targets, scroll indicators          │
 * │  6. SM-* UTILITY CLASSES        — Layout, typography, color utilities       │
 * │  7. SM-* COMPONENT PATTERNS     — Grid-sep, panels, badges, data rows      │
 * │  8. SHARED PRIMITIVES           — StockModelUI components (Card, Row, etc.) │
 * │  9. WALL STREET TAB (sm-ws-*)   — Analyst research components              │
 * │  10. EDGAR TAB (sm-ed-*)        — SEC filing browser components            │
 * │  11. SHARED TAB COMPONENTS      — Sources, Investment, AI Agents           │
 * │  12. DATA ATTRIBUTE SELECTORS   — Sentiment, active state                  │
 * │  13. RESPONSIVE BREAKPOINTS     — 1200 → 900 → 768 → 480 → 360px         │
 * │  14. ACCESSIBILITY              — Reduced motion, dark mode, retina        │
 * │  15. TIMELINE SYSTEM            — Expandable event timeline                │
 * │  16. UPDATE INDICATORS          — Data freshness dots                      │
 * │  17. COMPETITOR CARDS           — Unified company comparison cards          │
 * │  18. DISCLOSURE PANELS          — Expandable company info sections         │
 * └──────────────────────────────────────────────────────────────────────────────┘
 *
 * USAGE:
 *   import { getStockModelCSS } from './stock-model-styles';
 *   const css = getStockModelCSS('cyan');   // ASTS  → --accent: var(--cyan)
 *   const css = getStockModelCSS('violet'); // BMNR  → --accent: var(--violet)
 *   const css = getStockModelCSS('mint');   // CRCL  → --accent: var(--mint)
 *
 * DYNAMIC VALUES:
 *   CSS custom properties (--var) are used for dynamic values instead of inline styles.
 *   Set via: style={{ '--badge-color': 'var(--mint)' } as React.CSSProperties}
 *   The CSS class reads the variable for background, color, or border.
 *
 * DATA ATTRIBUTES:
 *   State-driven styling via data-* attributes on elements.
 *   Example: data-sentiment="positive" → color: var(--mint)
 *   Example: data-active="true" → full opacity, accent border
 *
 * HOVER EFFECTS:
 *   All hover effects use CSS :hover on classes — never JS event handlers.
 *   Removed patterns: onMouseEnter/onMouseLeave for style manipulation.
 *
 * FONTS:
 *   Outfit — UI text (headings, labels, body, buttons)
 *   Space Mono — Data display (prices, percentages, KPIs, tickers, dates)
 *
 * RESPONSIVE:
 *   Desktop-first with breakpoints at 1200, 900, 768, 480, 360px.
 *   Touch targets minimum 44px on coarse pointer devices.
 *   Fade-mask scroll indicators on horizontal-scroll sections.
 *
 * DOCUMENTATION:
 *   Full class reference available at /docs in the application.
 *   See also: src/app/docs/page.tsx for the live documentation page.
 */

export type AccentColor = 'cyan' | 'violet' | 'mint';

/**
 * Returns the complete CSS for a stock model component.
 * The accent parameter sets --accent and --accent-dim CSS variables,
 * which cascade through all component styles automatically.
 *
 * @param accent - 'cyan' (ASTS) | 'violet' (BMNR) | 'mint' (CRCL)
 * @returns Complete CSS string to be injected via <style> tag
 */
export const getStockModelCSS = (accent: AccentColor): string => `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  /* ═══ UNIFIED DESIGN TOKENS (shared across ASTS/BMNR/CRCL) ═══
   *
   * These tokens define the entire color system. They are also mirrored
   * in globals.css for pages outside the stock-model-app scope.
   *
   * Naming convention:
   *   --bg/surface/surface2/surface3  → layered backgrounds (darkest → lightest)
   *   --text/text2/text3              → text hierarchy (brightest → dimmest)
   *   --{color}                       → full-strength semantic color
   *   --{color}-dim                   → 15% opacity tint for backgrounds
   * ═══════════════════════════════════════════════════════════════════════════ */

  /* Background & Surfaces — 4-level depth system */
  --bg: #05070A;           /* Page background — near-black */
  --surface: #0D1117;      /* Card / panel background */
  --surface2: #161B22;     /* Hover state, secondary containers */
  --surface3: #21262D;     /* Tertiary (inputs, legends, deeply nested) */
  --border: rgba(240,246,252,0.1); /* Glass-edge border — subtle white at 10% */

  /* Typography — 3-level hierarchy */
  --text: #F0F6FC;         /* Primary — high contrast headings & values */
  --text2: #8B949E;        /* Secondary — descriptions, body text */
  --text3: #6E7681;        /* Tertiary — labels, muted helpers, timestamps */

  /* Semantic Colors — each has a full and -dim (15% opacity) variant */
  --cyan: #22D3EE;         /* ASTS accent — space/tech feel */
  --cyan-dim: rgba(34,211,238,0.15);
  --mint: #7EE787;         /* CRCL accent — positive / growth */
  --mint-dim: rgba(126,231,135,0.15);
  --coral: #FF7B72;        /* Negative sentiment / errors / bearish */
  --coral-dim: rgba(255,123,114,0.15);
  --sky: #79C0FF;          /* Info / links / neutral data */
  --sky-dim: rgba(121,192,255,0.15);
  --gold: #D29922;         /* Neutral sentiment / warnings */
  --gold-dim: rgba(210,153,34,0.15);
  --violet: #A78BFA;       /* BMNR accent — Wall Street / research */
  --violet-dim: rgba(167,139,250,0.15);

  /* ═══ STOCK-SPECIFIC ACCENT ═══
   * Dynamically resolved by the accent parameter:
   *   getStockModelCSS('cyan')   → --accent: var(--cyan)    (ASTS)
   *   getStockModelCSS('violet') → --accent: var(--violet)  (BMNR)
   *   getStockModelCSS('mint')   → --accent: var(--mint)    (CRCL)
   *
   * Used by: .nav-btn.active, .sm-accent, .highlight, .price-badge,
   *          .sm-preset-btn[data-active], and many more.
   * ═══════════════════════════════════════════════════════════════════════════ */
  --accent: var(--${accent});
  --accent-dim: var(--${accent}-dim);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 2. SCOPED RESET & ROOT CONTAINER
   Scoped to .stock-model-app to avoid overriding Tailwind :where() selectors
   used by the rest of the Next.js app (nav, hooks page, docs page, etc.).
   ═══════════════════════════════════════════════════════════════════════════ */
.stock-model-app, .stock-model-app * { box-sizing: border-box; margin: 0; padding: 0; }

.stock-model-app {
  font-family: 'Outfit', sans-serif;  /* Primary UI font — all non-data text */
  background: var(--bg);
  min-height: 100vh;
  color: var(--text);
  overflow-x: hidden;
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 3. HERO HEADER
   Top section of each stock page: company name, ticker badge, price display.
   Uses a radial gradient glow (::before pseudo) for depth.
   ═══════════════════════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  padding: 48px 64px 48px;
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
  background: radial-gradient(circle, var(--accent-dim) 0%, transparent 70%);
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
  margin-bottom: 0;
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
  color: var(--accent);
  background: var(--accent-dim);
  padding: 6px 14px;
  border-radius: 6px;
  margin-bottom: 0;
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
  margin-bottom: 0;
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

/* ═══════════════════════════════════════════════════════════════════════════
   § 4. STATS ROW
   Horizontal strip below hero showing key metrics (price, market cap, etc.).
   Horizontally scrollable on mobile with fade-mask indicators.
   ═══════════════════════════════════════════════════════════════════════════ */
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
  margin-bottom: 0;
}

.stat-item .val {
  font-family: 'Space Mono', monospace;
  font-size: 22px;
  font-weight: 600;
}

.stat-item .val.accent { color: var(--accent); }
.stat-item .val.cyan { color: var(--cyan); }
.stat-item .val.mint { color: var(--mint); }
.stat-item .val.sky { color: var(--sky); }
.stat-item .val.coral { color: var(--coral); }
.stat-item .val.violet { color: var(--violet); }

/* ═══════════════════════════════════════════════════════════════════════════
   § 5. NAVIGATION
   Sticky tab bar for switching between model tabs (Overview, Chart, etc.).
   Supports both flat buttons (.nav-btn) and dropdown groups (.nav-dropdown).
   Tab type indicators: .tab-tracking (mint/data) vs .tab-projection (accent/model).
   Keyboard-navigable with :focus-visible outlines.
   ═══════════════════════════════════════════════════════════════════════════ */
.nav {
  display: flex;
  align-items: center;
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
  min-width: 100px;
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
  justify-content: center;
  gap: 6px;
}

.nav-btn:hover {
  color: var(--text);
  background: var(--surface2);
}

.nav-btn.active {
  color: var(--bg);
  background: var(--accent);
  border-color: var(--accent);
}

/* Tab Type Indicators — background wash only, pure atmosphere */
/* mint=tracking (actual data), accent color=projection (user models) */
.nav-btn.tab-tracking {
  background: color-mix(in srgb, var(--mint) 6%, transparent);
}
.nav-btn.tab-projection {
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}
.nav-btn.tab-tracking:hover {
  background: color-mix(in srgb, var(--mint) 12%, transparent);
}
.nav-btn.tab-projection:hover {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
.nav-btn.tab-tracking.active {
  background: var(--mint);
  border-color: var(--mint);
}
.nav-btn.tab-projection.active {
  background: var(--accent);
  border-color: var(--accent);
}

/* Focus styles for keyboard navigation */
.nav-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  color: var(--text);
  background: var(--surface2);
}
.nav-btn.active:focus-visible {
  outline-color: var(--text);
}
.nav-dropdown-trigger:focus-visible {
  outline: 2px solid var(--violet);
  outline-offset: 2px;
}

/* Projection tab shape indicator (accessibility — non-color differentiator) */
.tab-type-badge {
  display: inline-flex;
  align-items: center;
  opacity: 0.5;
}
.nav-btn.active .tab-type-badge {
  opacity: 0.8;
}

/* ── Filter Buttons — For inline filtering (competitor filters, peer group selectors) ── */
.filter-btn {
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 99px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text3);
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
  white-space: nowrap;
}
.filter-btn:hover {
  border-color: var(--text3);
  color: var(--text);
}
.filter-btn.active {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

/* ── Dropdown Navigation — Stock-specific tabs in expandable menu ──
   The dropdown trigger sits in the main nav; when open, a secondary bar
   (.nav-dropdown-space) slides open below the nav to show sub-tabs.
   Animation: fadeSlideIn keyframe for smooth appearance. */
.nav-dropdown {
  display: inline-flex;
}
.nav-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, var(--violet) 6%, transparent);
}
.nav-dropdown-trigger:hover {
  background: color-mix(in srgb, var(--violet) 12%, transparent);
}
.nav-dropdown-trigger.active {
  background: var(--violet);
  color: var(--bg);
  border-color: var(--violet);
}
.nav-dropdown-trigger.open {
  background: var(--surface2);
  color: var(--text);
}

/* Dropdown chevron icon */
.nav-dropdown-chevron {
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
}
.nav-dropdown-chevron.open {
  transform: rotate(180deg);
}

/* Reserved space below nav for dropdown content — collapses when closed */
.nav-dropdown-space {
  height: 0;
  padding: 0 64px;
  background: var(--bg);
  border-bottom: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  transition: height 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.nav-dropdown-space.open {
  height: 48px;
  background: var(--surface);
  border-bottom-color: var(--border);
}
.nav-dropdown-menu {
  display: flex;
  align-items: center;
  gap: 4px;
  animation: fadeSlideIn 0.15s ease-out;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.nav-dropdown-item {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text2);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
  font-family: 'Outfit', sans-serif;
}
.nav-dropdown-item:hover {
  color: var(--text);
  background: var(--surface2);
}
.nav-dropdown-item.active {
  color: var(--bg);
  background: var(--accent);
  font-weight: 600;
}
.nav-dropdown-item.tab-tracking.active {
  background: var(--mint);
  color: var(--bg);
}
.nav-dropdown-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
  color: var(--text);
  background: var(--surface2);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 6. MAIN CONTENT & CARDS
   Primary content area for each tab. Cards (.card) are the fundamental
   container unit. Highlight boxes use accent gradient backgrounds.
   Grid layouts: .g2–.g5 for responsive column grids.
   ═══════════════════════════════════════════════════════════════════════════ */
.main {
  padding: 48px 64px;
  max-width: 1400px;
}

.section-head {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-head::before {
  content: '';
  width: 6px;
  height: 32px;
  background: var(--accent);
  border-radius: 3px;
}

/* Cards */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 0;
}

.card-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--text3);
  margin-bottom: 0;
  font-weight: 600;
}

/* Grid Layouts */
.g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.g5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }

/* Highlight Boxes */
.highlight {
  background: linear-gradient(135deg, var(--accent-dim) 0%, transparent 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 0;
}

.highlight h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0;
}

.highlight p {
  color: var(--text2);
  line-height: 1.7;
  font-size: 15px;
}

/* ── Thesis Cards — Bull/bear investment thesis with sentiment-colored borders ── */
.thesis {
  padding: 24px;
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
  margin-bottom: 0;
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

/* ═══════════════════════════════════════════════════════════════════════════
   § 7. CHARTS & DATA VISUALIZATION
   Bar charts, Monte Carlo simulation, progress bars, big stats.
   Bar charts use hover effects for interactive feedback.
   ═══════════════════════════════════════════════════════════════════════════ */
.bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 220px;
  padding: 24px 0 0;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
  position: relative;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.bar-val {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3px;
  color: var(--text2);
  margin-bottom: 6px;
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.25s ease, color 0.25s ease;
}

.bar-col:hover .bar-val {
  opacity: 1;
  color: var(--text);
}

.bar {
  width: 60%;
  min-width: 18px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 60%, transparent) 100%);
  transition: width 0.25s ease, filter 0.25s ease, background 0.25s ease;
  position: relative;
}

.bar-col:hover .bar {
  width: 80%;
  filter: brightness(1.2);
  background: linear-gradient(180deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 85%, transparent) 100%);
}

.bar-label {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text3);
  margin-top: 10px;
  padding-bottom: 8px;
  font-weight: 500;
  opacity: 0.6;
  transition: opacity 0.25s ease;
}

.bar-col:hover .bar-label {
  opacity: 1;
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
  color: var(--accent);
  margin-bottom: 0;
}

.big-stat .lbl {
  font-size: 13px;
  color: var(--text3);
}

/* ── Tables — Standard data table with rounded header and hover rows ── */
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
.tbl .accent { color: var(--accent); }
.tbl .cyan { color: var(--cyan); }
.tbl .mint { color: var(--mint); }
.tbl .coral { color: var(--coral); }
.tbl .sky { color: var(--sky); }
.tbl .violet { color: var(--violet); }

/* ═══════════════════════════════════════════════════════════════════════════
   § 8. INTERACTIVE CONTROLS
   Pills (filter toggles), range sliders, and input controls.
   All use accent color for active/selected states.
   ═══════════════════════════════════════════════════════════════════════════ */
.pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 0;
}

.pill {
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 500;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 99px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text3);
  font-family: 'Outfit', sans-serif;
}

.pill:hover, .pill.active {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
  border-color: var(--accent);
}

/* Range Slider */
.slider-wrap {
  margin-bottom: 0;
}

.slider-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  font-size: 14px;
}

.slider-head span:first-child { color: var(--text2); }
.slider-head span:last-child {
  font-family: 'Space Mono', monospace;
  color: var(--accent);
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
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 0 16px var(--accent-dim);
}

/* Monte Carlo */
.mc-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 280px;
  padding: 24px 0;
}

.mc-bar {
  flex: 1;
  background: var(--accent);
  opacity: 0.6;
  border-radius: 2px 2px 0 0;
  transition: all 0.2s;
}

.mc-bar:hover { opacity: 1; }
.mc-bar.hl { background: var(--gold); opacity: 1; }

/* ═══════════════════════════════════════════════════════════════════════════
   § 9. LEGAL DISCLAIMER
   Red/gold gradient banner shown at top of stock pages.
   Responsive: single-line on desktop, stacked on mobile.
   ═══════════════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════════════
   PROFESSIONAL MOBILE RESPONSIVE STYLES
   Optimized for touch devices with excellent UX
   ═══════════════════════════════════════════════════════════════════════════ */

/* Mobile-First Table Wrapper with Scroll Indicator */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--surface3) transparent;
  position: relative;
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

/* Touch-friendly inputs - Ensure minimum 44px touch targets */
@media (pointer: coarse) {
  input[type="range"] { height: 44px; }
  input[type="range"]::-webkit-slider-thumb { width: 32px; height: 32px; }
  .nav-btn { min-height: 44px; }
  button, .btn { min-height: 44px; }
  .pill { min-height: 44px; padding: 10px 16px; }
  .nav-dropdown-item { min-height: 44px; padding: 12px 16px; }
  /* Nav badges — expand touch target while keeping visual size */
  .nav-ai-badge,
  .nav-pin-badge {
    min-height: 44px;
    min-width: 44px;
    justify-content: center;
  }
  .sm-ed-action-btn,
  .sm-ed-action-btn-sm {
    min-height: 44px;
    padding: 10px 14px;
  }
  .sm-ed-filter-pill {
    min-height: 44px;
  }
  .sm-expand-btn {
    min-height: 44px;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 11. STOCK MODEL UTILITY CLASSES (sm-*)

   These classes replace inline styles across all stock components.
   Prefixed with "sm-" (stock-model) to avoid collisions with Tailwind.

   Categories:
     - Layout:     sm-flex, sm-flex-between, sm-flex-col, sm-gap-*, sm-mt-*
     - Typography:  sm-section-label, sm-param-label, sm-mono-*, sm-subtle, sm-body
     - Color:       sm-accent, sm-mint, sm-coral, sm-sky, sm-gold, sm-violet, sm-text*
     - Components:  sm-panel, sm-grid-sep, sm-data-row, sm-badge, sm-tab-hero, etc.
     - Dynamic:     CSS custom properties (--badge-color, --kpi-color, etc.)

   Usage pattern:
     <div className="sm-section-label">SECTION TITLE</div>
     <div className="sm-badge" style={{ '--badge-color': 'var(--mint)' } as React.CSSProperties}>

   See /docs page for the complete class reference.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Layout Utilities ─────────────────────────────────────────────────────
   Composable flex/grid helpers. Combine for complex layouts:
   className="sm-flex sm-gap-16"  → flex row, align-center, 16px gap
   className="sm-flex-between"    → space-between row
   ──────────────────────────────────────────────────────────────────────── */
.sm-flex { display: flex; align-items: center; gap: 8px; }
.sm-flex-between { display: flex; justify-content: space-between; align-items: center; }
.sm-flex-col { display: flex; flex-direction: column; }
.sm-flex-col-gap { display: flex; flex-direction: column; gap: 12px; }
.sm-flex-col-gap-16 { display: flex; flex-direction: column; gap: 16px; }
.sm-flex-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.sm-gap-4 { gap: 4px; }
.sm-gap-6 { gap: 6px; }
.sm-gap-8 { gap: 8px; }
.sm-gap-12 { gap: 12px; }
.sm-gap-16 { gap: 16px; }
.sm-gap-24 { gap: 24px; }
.sm-text-center { text-align: center; }
.sm-text-right { text-align: right; }
.sm-shrink-0 { flex-shrink: 0; }
.sm-mt-8 { margin-top: 8px; }
.sm-mt-12 { margin-top: 12px; }
.sm-mt-16 { margin-top: 16px; }
.sm-mt-24 { margin-top: 24px; }
.sm-mt-32 { margin-top: 32px; }
.sm-mb-8 { margin-bottom: 8px; }
.sm-mb-12 { margin-bottom: 12px; }
.sm-mb-16 { margin-bottom: 16px; }
.sm-w-full { width: 100%; }

/* ── Typography ──────────────────────────────────────────────────────────
   Text styling hierarchy. Two font families:
   - Outfit (sans-serif): All UI text — inherited from .stock-model-app
   - Space Mono (monospace): Numbers, data, KPIs — via sm-mono-* classes

   Label hierarchy (largest → smallest):
   sm-panel-title (13px, 600) → sm-param-label (13px, 600, uppercase)
   → sm-section-label (11px, 600, uppercase, 2.5px spacing)
   → sm-micro-label (10px, 600, uppercase)
   ──────────────────────────────────────────────────────────────────────── */

/* Section header — the single most repeated pattern across the codebase (~577 instances) */
.sm-section-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Parameter / subsection label */
.sm-param-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text3);
}

/* Micro label (table headers, tiny tags) */
.sm-micro-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
}

/* Panel title */
.sm-panel-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text);
  display: flex;
  align-items: center;
}

/* Monospace number display */
.sm-mono { font-family: 'Space Mono', monospace; font-weight: 700; }
.sm-mono-sm { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 600; }
.sm-mono-md { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 600; }
.sm-mono-lg { font-family: 'Space Mono', monospace; font-size: 18px; font-weight: 700; }
.sm-mono-xl { font-family: 'Space Mono', monospace; font-size: 28px; font-weight: 700; }
.sm-mono-2xl { font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; }
.sm-mono-3xl { font-family: 'Space Mono', monospace; font-size: 42px; font-weight: 700; }

/* Text styles */
.sm-subtle { font-size: 12px; color: var(--text3); }
.sm-subtle-sm { font-size: 11px; color: var(--text3); }
.sm-body { font-size: 14px; color: var(--text2); }
.sm-body-sm { font-size: 13px; color: var(--text2); line-height: 1.5; }
.sm-body-lg { font-size: 15px; color: var(--text2); line-height: 1.7; }

/* Color utilities */
.sm-accent { color: var(--accent); }
.sm-mint { color: var(--mint); }
.sm-coral { color: var(--coral); }
.sm-sky { color: var(--sky); }
.sm-gold { color: var(--gold); }
.sm-violet { color: var(--violet); }
.sm-cyan { color: var(--cyan); }
.sm-text { color: var(--text); }
.sm-text2 { color: var(--text2); }
.sm-text3 { color: var(--text3); }

/* ── Component Patterns ──────────────────────────────────────────────────
   Pre-built UI patterns covering 90% of the stock component layouts.
   Dynamic values are injected via CSS custom properties, not inline styles.

   Key pattern: "1px gap grid" (.sm-grid-sep)
   The background color shows through the 1px gap between cells,
   creating the appearance of thin borders without actual border properties.
   Set column count via: style={{ '--cols': 4 } as React.CSSProperties}
   ──────────────────────────────────────────────────────────────────────── */

/* Grid separator — glass-card pattern with 1px gap borders */
.sm-grid-sep {
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
}

/* Inner cells of grid-sep */
.sm-grid-cell {
  background: var(--surface);
  padding: 16px 24px;
}
.sm-grid-cell-center {
  background: var(--surface);
  padding: 16px;
  text-align: center;
}

/* KPI metric cell (used inside grid-sep) */
.sm-kpi-cell {
  background: var(--surface);
  padding: 24px 16px;
  text-align: center;
}
.sm-kpi-label {
  font-size: 10px;
  color: var(--text3);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-weight: 500;
}
.sm-kpi-value {
  font-family: 'Space Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--kpi-color, var(--text));
  margin: 6px 0 4px;
}
.sm-kpi-sub {
  font-size: 11px;
  color: var(--text3);
}

/* Panel card — surface card with border */
.sm-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
}
.sm-panel-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
}
.sm-panel-body {
  padding: 24px;
}

/* Data row with CSS :hover — replaces all JS onMouseEnter/onMouseLeave handlers.
   Uses display: grid; the specific gridTemplateColumns is set inline since it
   varies per usage context (e.g., '1fr 120px 1fr' vs '200px 1fr 80px'). */
.sm-data-row {
  display: grid;
  padding: 12px 24px;
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-data-row:hover {
  background: var(--surface2);
}
.sm-data-row:last-child {
  border-bottom: none;
}

/* Badge / chip — dynamic color via --badge-color CSS custom property.
   The background is auto-generated as 10% opacity of the badge color
   using CSS color-mix(). No need to compute RGBA in JavaScript. */
.sm-badge {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  color: var(--badge-color, var(--text3));
  background: color-mix(in srgb, var(--badge-color, var(--text3)) 10%, transparent);
}
.sm-badge-impact {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  min-width: 60px;
  text-align: center;
  color: var(--badge-color, var(--text3));
  background: color-mix(in srgb, var(--badge-color, var(--text3)) 12%, transparent);
}

/* Tab hero section (used in each tab's header) */
.sm-tab-hero {
  padding: 48px 0 32px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
}
.sm-tab-hero h2 {
  font-size: 32px;
  font-weight: 300;
  color: var(--text);
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.5px;
}
.sm-tab-hero p {
  font-size: 15px;
  color: var(--text3);
  max-width: 640px;
  line-height: 1.7;
  margin-top: 12px;
  font-weight: 300;
}

/* Section divider with trailing line */
.sm-divider {
  padding: 32px 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.sm-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* Bullet list item (bull/bear case items) */
.sm-bullet-item {
  display: flex;
  gap: 8px;
  padding: 5px 0;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.5;
}

/* Small dot indicator */
.sm-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--dot-color, var(--text3));
}

/* Expand/collapse toggle button */
.sm-expand-btn {
  width: 100%;
  padding: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 99px;
  color: var(--text2);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Outfit', sans-serif;
}
.sm-expand-btn:hover {
  background: var(--surface3);
  color: var(--text);
}

/* Compact action button (Expand All / Collapse All) */
.sm-action-btn {
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid var(--border);
  font-size: 11px;
  font-weight: 500;
  background: var(--surface2);
  color: var(--text2);
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Outfit', sans-serif;
}
.sm-action-btn:hover {
  background: var(--surface3);
  color: var(--text);
}
.sm-action-btn[data-active="true"] {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
}

/* Progress bar */
.sm-progress-track {
  height: 4px;
  border-radius: 2px;
  background: var(--surface3);
  overflow: hidden;
}
.sm-progress-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--progress-color, var(--accent));
  transition: width 0.6s ease;
}

/* Bar chart column (vertical) */
.sm-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: var(--bar-color, var(--accent));
  transition: height 0.3s;
  min-height: 2px;
}

/* ── Shared Primitives (StockModelUI.tsx components) ─────────────────────
   These classes power the reusable primitives exported from StockModelUI:
   Card, Row, Input, Panel, Guide, CFANotes, Stat.
   Each uses CSS custom properties for dynamic color theming.
   ──────────────────────────────────────────────────────────────────────── */

/* Card with dynamic color — set --card-bg, --card-border, --card-text inline */
.sm-card-colored {
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(8px);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}
.sm-card-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text3);
  font-weight: 600;
  display: flex;
  align-items: center;
}
.sm-card-value {
  font-size: 28px;
  font-weight: 700;
  font-family: 'Space Mono', monospace;
  color: var(--card-text);
}

/* Row component */
.sm-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.sm-row[data-highlight="true"] {
  background: var(--accent-dim);
  padding: 12px;
  margin: 0 -12px;
  border-radius: 8px;
}
.sm-row-label {
  font-size: 14px;
  color: var(--text2);
  display: flex;
  align-items: center;
}
.sm-row-value {
  font-size: 14px;
  font-weight: 600;
  font-family: 'Space Mono', monospace;
  color: var(--text);
}
.sm-row[data-highlight="true"] .sm-row-value {
  color: var(--accent);
}

/* Input component */
.sm-input-label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text3);
  font-weight: 600;
}
.sm-input-field {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-family: 'Space Mono', monospace;
  color: var(--text);
  outline: none;
}

/* CFA Notes */
.sm-cfa-notes {
  padding-top: 16px;
  border-top: 1px solid var(--border);
  opacity: 0.75;
}
.sm-cfa-title {
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.sm-cfa-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--text3);
}
.sm-cfa-list p { margin: 0; }
.sm-cfa-list strong { color: var(--text2); }

/* Guide content */
.sm-guide-content {
  color: var(--text2);
  line-height: 1.7;
  font-size: 15px;
}

/* Preset toggle buttons (model parameter selection) */
.sm-preset-btn {
  padding: 12px 4px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface2);
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: var(--text3);
  font-family: 'Outfit', sans-serif;
}
.sm-preset-btn[data-active="true"] {
  border: 2px solid var(--preset-color);
  background: color-mix(in srgb, var(--preset-color) 15%, transparent);
  color: var(--preset-color);
  font-weight: 600;
}

/* Tinted background using dynamic CSS custom property */
.sm-tinted-bg {
  background: color-mix(in srgb, var(--tint) 10%, transparent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 12. WALL STREET TAB COMPONENTS (sm-ws-*)

   SharedWallStreetTab.tsx — analyst research, ratings, price targets.
   Components: panels, firm headers, reports, estimates, rating badges.
   Prefixed with "sm-ws-" to scope and avoid collision.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Update indicator dot (inline portability component) */
.sm-update-dots {
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
}
.sm-update-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  background: var(--dot-bg);
}

/* Panel with round-16 styling used in Wall Street cards */
.sm-ws-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.sm-ws-panel[data-active="true"] {
  border-color: var(--violet);
}

/* Panel header row (padded, bottom-bordered) */
.sm-ws-panel-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sm-ws-panel-header[data-open="false"] {
  border-bottom: none;
}

/* Panel body (padded) */
.sm-ws-panel-body {
  padding: 24px;
}

/* Grid 2-col layout for consensus */
.sm-ws-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* KPI grid with 1px gap border pattern */
.sm-ws-kpi-grid {
  display: grid;
  gap: 1px;
  background: var(--border);
  border-radius: 16px;
  overflow: hidden;
}

/* Rating distribution bar */
.sm-ws-rating-bar {
  display: flex;
  height: 24px;
  border-radius: 99px;
  overflow: hidden;
}
.sm-ws-rating-bar > [data-sentiment="positive"] { background: var(--mint); }
.sm-ws-rating-bar > [data-sentiment="neutral"] { background: var(--gold); }
.sm-ws-rating-bar > [data-sentiment="negative"] { background: var(--coral); }

/* Firm header (clickable expand trigger) */
.sm-ws-firm-header {
  padding: 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Firm name */
.sm-ws-firm-name {
  font-weight: 700;
  color: var(--text);
  font-size: 15px;
  line-height: 1.2;
}

/* Collapsed metrics grid (auto-fit) */
.sm-ws-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  padding: 12px;
  background: var(--surface2);
  border-radius: 10px;
}
.sm-ws-metric-cell {
  text-align: center;
  padding: 8px 4px;
}
.sm-ws-metric-val {
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
}
.sm-ws-metric-label {
  font-size: 9px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* Report entry row (with left border) */
.sm-ws-report {
  padding: 12px 16px;
  border-radius: 10px;
  border-left: 3px solid transparent;
  transition: background 0.15s;
}
.sm-ws-report:hover {
  background: var(--surface2);
}
.sm-ws-report[data-full="true"] {
  background: var(--surface2);
  border-left-color: var(--violet);
}
.sm-ws-report[data-full="true"]:hover {
  background: var(--surface2);
}

/* Report detail expand button */
.sm-ws-detail-btn {
  background: none;
  border: none;
  color: var(--violet);
  font-size: 11px;
  cursor: pointer;
  padding: 4px 0;
  font-family: 'Outfit', sans-serif;
}

/* Report expanded details container */
.sm-ws-details {
  padding-top: 12px;
  border-top: 1px solid var(--border);
  margin-top: 8px;
}

/* Report summary block */
.sm-ws-summary {
  background: var(--surface);
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  color: var(--text2);
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Assumption chip */
.sm-ws-assumption {
  padding: 3px 8px;
  background: var(--surface);
  border-radius: 99px;
  font-size: 11px;
  color: var(--text2);
}

/* Report section label (catalysts, risks, etc.) */
.sm-ws-section-label {
  font-size: 10px;
  margin-bottom: 6px;
}

/* Report list (catalysts/risks) */
.sm-ws-list {
  margin: 0;
  padding-left: 16px;
  color: var(--text2);
  font-size: 11px;
}

/* Estimates table */
.sm-ws-estimate-grid {
  display: grid;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-ws-estimate-grid:hover {
  background: var(--surface2);
}
.sm-ws-estimate-grid:last-child {
  border-bottom: none;
}

/* Estimate table header row */
.sm-ws-estimate-header {
  display: grid;
  border-bottom: 1px solid var(--border);
}

/* Estimate cell */
.sm-ws-estimate-cell {
  padding: 12px;
  font-size: 12px;
  color: var(--text);
}
.sm-ws-estimate-cell[data-align="right"] {
  font-family: 'Space Mono', monospace;
  color: var(--text2);
  text-align: right;
}

/* Table header cell */
.sm-ws-th {
  padding: 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
  background: var(--surface2);
}
.sm-ws-th[data-align="right"] {
  text-align: right;
}

/* Table container */
.sm-ws-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

/* KPI grid — 4 column default */
.sm-ws-kpi-4col {
  grid-template-columns: repeat(4, 1fr);
}

/* Estimates columns — 1fr + 5x80px default */
.sm-ws-est-cols {
  grid-template-columns: 1fr repeat(5, 80px);
}

/* Inline notes markdown-like block headers */
.sm-ws-block-header {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text3);
}

/* Firm notes italic */
.sm-ws-firm-notes {
  font-size: 11px;
  color: var(--text3);
  font-style: italic;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
  line-height: 1.5;
}

/* Badge used for rating with dynamic color — unified 6px radius */
.sm-ws-rating-badge {
  padding: 6px 12px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--badge-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--badge-color) 25%, transparent);
  display: inline-flex;
  align-items: center;
}
.sm-ws-rating-badge span {
  color: var(--badge-color);
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Report count badges — unified 6px radius */
.sm-ws-count-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid transparent;
  transition: all 0.15s;
}
.sm-ws-count-badge[data-type="report"] {
  background: color-mix(in srgb, var(--violet) 12%, transparent);
  border-color: color-mix(in srgb, var(--violet) 22%, transparent);
  color: var(--violet);
}
.sm-ws-count-badge[data-type="update"] {
  background: rgba(255,255,255,0.04);
  border-color: var(--border);
  color: var(--text3);
}

/* Source link */
.sm-ws-source-link {
  font-size: 10px;
  color: var(--violet);
  text-decoration: none;
}

/* Report title italic */
.sm-ws-report-title {
  color: var(--text2);
  font-size: 12px;
  font-style: italic;
}

/* PT display mono — unified badge treatment */
.sm-ws-pt {
  font-family: 'Space Mono', monospace;
  text-align: right;
  min-width: 60px;
  padding: 5px 10px;
  border-radius: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
}

/* Range text */
.sm-ws-range {
  font-size: 12px;
  color: var(--text3);
}

/* Firm meta container — right-side elements in firm header */
.sm-ws-firm-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 13. EDGAR TAB COMPONENTS (sm-ed-*)

   SharedEdgarTab.tsx + SharedSourcesTab.tsx — SEC filing browser and
   research sources tab with filtering, analysis, diffs, methodology.
   Components: filing rows, form badges, status dots, verdict badges,
   analysis panels, diff previews, methodology flowcharts, info cards.
   Prefixed with "sm-ed-" to scope and avoid collision.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Tiny action button (Ive×Tesla style) — shared by Edgar, AI Agents, etc. */
.sm-ed-action-btn {
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--ed-btn-border, var(--border));
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: inherit;
  outline: none;
  text-decoration: none;
  color: var(--ed-btn-color, var(--text3));
}
.sm-ed-action-btn[data-loading="true"] {
  cursor: wait;
  opacity: 0.5;
}
.sm-ed-action-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Small inline action button variant */
.sm-ed-action-btn-sm {
  font-size: 9px;
  font-weight: 500;
  font-family: inherit;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--ed-btn-border, var(--border));
  cursor: pointer;
  transition: all 0.15s;
  outline: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--ed-btn-color, var(--text3));
}
.sm-ed-action-btn-sm[data-loading="true"] {
  cursor: wait;
  opacity: 0.5;
}

/* Filing row — hover-highlight container */
.sm-ed-filing-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  transition: background 0.15s;
}
.sm-ed-filing-row:hover {
  background: var(--surface2);
}

/* Form type badge */
.sm-ed-form-badge {
  font-size: 10px;
  font-family: 'Space Mono', monospace;
  font-weight: 600;
  padding: 2px 0;
  border-radius: 5px;
  flex-shrink: 0;
  width: 82px;
  text-align: center;
  white-space: nowrap;
  background: var(--badge-bg, var(--surface2));
  color: var(--badge-text, var(--text3));
}

/* Status dot */
.sm-ed-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.9;
  transition: opacity 0.2s, background 0.2s;
  background: var(--dot-color, var(--text3));
}

/* Status label (fixed-width right-aligned) */
.sm-ed-status-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
  white-space: nowrap;
  width: 72px;
  text-align: right;
  color: var(--status-color, var(--text3));
}

/* Date column */
.sm-ed-date {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--text3);
  flex-shrink: 0;
  letter-spacing: -0.2px;
  width: 100px;
  text-align: right;
  white-space: nowrap;
}

/* Description (truncated) */
.sm-ed-desc {
  font-size: 13px;
  color: var(--text);
  flex: 1;
  min-width: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Chevron slot (fixed-width for alignment) */
.sm-ed-chevron-slot {
  width: 12px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* NEW/SEEN badge slot (fixed width for alignment) */
.sm-ed-badge-slot {
  width: 34px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* NEW badge */
.sm-ed-new-badge {
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--sky);
  background: var(--sky-dim);
  border: 1px solid color-mix(in srgb, var(--sky) 20%, transparent);
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: all 0.15s;
}
.sm-ed-new-badge:hover {
  background: color-mix(in srgb, var(--sky) 20%, transparent);
}

/* SEEN badge (dimmed) */
.sm-ed-seen-badge {
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--sky);
  opacity: 0.3;
  border: 1px solid transparent;
}

/* Verdict badge */
.sm-ed-verdict-badge {
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 3px;
  flex-shrink: 0;
  color: var(--verdict-color);
  background: var(--verdict-bg);
  border: 1px solid color-mix(in srgb, var(--verdict-color) 20%, transparent);
}

/* Row groups for mobile two-sub-row stacking (Sources & Edgar) */
.sm-ed-row-main {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}
.sm-ed-row-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Source name column (desktop: fixed width, mobile: auto) */
.sm-ed-source-name {
  font-size: 10px;
  color: var(--text3);
  flex-shrink: 0;
  text-align: right;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* DB tooltip */
.sm-ed-db-tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  z-index: 100;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  min-width: min(280px, calc(100vw - 3rem));
  max-width: min(380px, calc(100vw - 2rem));
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  font-size: 10px;
  font-family: 'Space Mono', monospace;
  color: var(--text);
  line-height: 1.8;
  pointer-events: none;
}

/* DB button */
.sm-ed-db-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 8px;
  font-family: 'Space Mono', monospace;
  padding: 1px 4px;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  outline: none;
  transition: all 0.15s;
  color: var(--db-color, var(--text3));
  opacity: var(--db-opacity, 0.25);
  border: 1px solid color-mix(in srgb, var(--db-color, var(--text3)) 20%, transparent);
}

/* Cross-ref lines */
.sm-ed-crossref {
  margin: 0 0 4px 19px;
  padding: 4px 0;
}
.sm-ed-crossref-line {
  font-family: 'Space Mono', monospace;
  font-size: 10.5px;
  line-height: 1.7;
  color: var(--text3);
  opacity: 0.45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Analysis panel container */
.sm-ed-analysis {
  margin: 6px 0 2px 19px;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid var(--border);
}

/* Analysis result pre block */
.sm-ed-analysis-pre {
  font-size: 12px;
  font-family: var(--font-mono, monospace);
  color: var(--text2);
  line-height: 1.8;
  white-space: pre-wrap;
  margin: 0;
}

/* Filter pill */
.sm-ed-filter-pill {
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  outline: none;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--pill-color, var(--text3));
  background: var(--pill-bg, rgba(255,255,255,0.04));
  border: 1px solid var(--pill-border, var(--border));
}

/* Year section toggle */
.sm-ed-year-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 12px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

/* Hidden filing row (ghosted) */
.sm-ed-hidden-row {
  opacity: 0.15;
  transition: opacity 0.2s;
}
.sm-ed-hidden-row:hover {
  opacity: 0.35;
}

/* Methodology flowchart box */
.sm-ed-flowbox {
  padding: 6px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 11px;
  font-family: 'Space Mono', monospace;
  color: var(--text);
  text-align: center;
}

/* Methodology flowchart accent box */
.sm-ed-flowbox-accent {
  padding: 6px 14px;
  background: var(--sky-dim);
  border: 1px solid var(--sky);
  border-radius: 8px;
  font-size: 11px;
  font-family: 'Space Mono', monospace;
  color: var(--sky);
  text-align: center;
  font-weight: 600;
}

/* Methodology vertical connector */
.sm-ed-flowline {
  width: 2px;
  background: var(--border);
}

/* Vertical line connector (generic) */
.sm-ed-vline {
  width: 2px;
  background: var(--border);
}

/* Horizontal divider */
.sm-ed-hdivider {
  height: 1px;
  background: var(--border);
  margin: 20px 0;
}

/* Methodology section header */
.sm-ed-method-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 12px;
}

/* Methodology mono description text */
.sm-ed-method-text {
  font-size: 10px;
  font-family: 'Space Mono', monospace;
  color: var(--text3);
  line-height: 2;
}

/* Methodology info card */
.sm-ed-info-card {
  flex: 1 1 160px;
  padding: 8px 12px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.sm-ed-info-card-lg {
  flex: 1 1 180px;
  padding: 10px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.sm-ed-info-card-xl {
  flex: 1 1 220px;
  padding: 10px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
}

/* Methodology separator */
.sm-ed-separator {
  height: 1px;
  background: var(--border);
  margin: 20px 0;
}

/* Diff preview panel */
.sm-ed-diff-panel {
  margin-top: 16px;
  border-radius: 8px;
  border: 1px solid rgba(234,179,8,0.2);
  background: rgba(234,179,8,0.03);
  overflow: hidden;
}

/* Diff preview pre block */
.sm-ed-diff-pre {
  font-size: 10px;
  font-family: var(--font-mono, monospace);
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
  color: var(--text3);
  max-height: 200px;
  overflow-y: auto;
}

/* Diff line coloring */
.sm-ed-diff-add {
  display: block;
  color: rgba(130,200,130,0.7);
  background: rgba(130,200,130,0.04);
}
.sm-ed-diff-del {
  display: block;
  color: rgba(255,100,100,0.5);
  background: rgba(255,100,100,0.04);
}
.sm-ed-diff-hunk {
  display: block;
  color: rgba(130,170,255,0.5);
}

/* Status bar container */
.sm-ed-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  margin-top: 8px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
}

/* Legend */
.sm-ed-legend {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 16px 4px 12px;
  font-size: 10px;
  color: var(--text3);
  letter-spacing: 0.3px;
  flex-wrap: wrap;
}

/* Error alert */
.sm-ed-error {
  font-size: 12px;
  color: var(--coral);
  margin-top: 12px;
  padding: 12px 16px;
  background: var(--coral-dim);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Loading spinner area */
.sm-ed-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 0;
  color: var(--text3);
}

/* AI disabled banner */
.sm-ed-ai-banner {
  font-size: 12px;
  color: var(--gold);
  padding: 10px 14px;
  background: color-mix(in srgb, var(--gold) 8%, transparent);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid color-mix(in srgb, var(--gold) 15%, transparent);
}

/* Copy button */
.sm-ed-copy-btn {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 11px;
  color: var(--text3);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.sm-ed-copy-btn[data-copied="true"] {
  background: color-mix(in srgb, var(--mint) 15%, transparent);
  color: var(--mint);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 14. SHARED TAB COMPONENTS (Sources, Investment, AI Agents)
   Reusable patterns shared across multiple tab views.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Article / content card */
.sm-tab-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.15s;
}
.sm-tab-card:hover {
  border-color: color-mix(in srgb, var(--border) 150%, transparent);
}

/* Compact status indicator row */
.sm-tab-status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--text3);
}

/* Toggle button (compact) */
.sm-tab-toggle {
  font-size: 10px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--text3);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  outline: none;
}
.sm-tab-toggle:hover {
  background: var(--surface3);
  color: var(--text);
}
.sm-tab-toggle[data-active="true"] {
  border-color: var(--accent);
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 15. DATA ATTRIBUTE SELECTORS

   State-driven styling via HTML data-* attributes.
   Replaces conditional inline styles like:
     style={{ color: val >= 0 ? 'var(--mint)' : 'var(--coral)' }}
   With:
     data-sentiment={val >= 0 ? 'positive' : 'negative'}
   ═══════════════════════════════════════════════════════════════════════════ */

/* Sentiment-based text colors — used on values, badges, indicators */
[data-sentiment="positive"] { color: var(--mint); }
[data-sentiment="negative"] { color: var(--coral); }
[data-sentiment="neutral"] { color: var(--gold); }
[data-sentiment="info"] { color: var(--sky); }

/* Active/inactive state */
[data-active="true"] { opacity: 1; }
[data-active="false"] { opacity: 0.5; }

/* ═══════════════════════════════════════════════════════════════════════════
   § 16. RESPONSIVE SCROLL CONTAINERS & SIZING UTILITIES

   CSS-class replacements for inline fixed dimensions.
   Media queries override these at each breakpoint — impossible with inline styles.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Scrollable containers — tall variant (analysis results, filing lists) */
.sm-scrollbox-tall {
  max-height: 600px;
  overflow-y: auto;
}

/* Scrollable containers — medium variant (diff previews, patch panels) */
.sm-scrollbox-med {
  max-height: 400px;
  overflow-y: auto;
}

/* Scrollable containers — short variant (prompts, previews) */
.sm-scrollbox-short {
  max-height: 256px;
  overflow-y: auto;
  overflow-x: auto;
}

/* Agent textarea (user data input) */
.sm-agent-textarea {
  width: 100%;
  height: 192px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text2);
  font-size: 12px;
  font-family: var(--font-mono, monospace);
  padding: 16px;
  resize: vertical;
  outline: none;
  line-height: 1.6;
}

/* Responsive grid variants — used by Investment tab and any future multi-column layouts.
   Inline gridTemplateColumns blocks media query overrides, so these CSS classes
   provide the default columns while allowing responsive breakpoints to stack them. */

/* 2-column grid (e.g., Moat Sources vs Threats) */
.sm-grid-2col-responsive {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* 3-column grid (e.g., Perspectives) */
.sm-grid-3col-responsive {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* 4-column grid (e.g., Position Sizing) */
.sm-grid-4col-responsive {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* DB tooltip — clamped width for mobile safety */
.sm-db-tooltip-responsive {
  min-width: min(260px, calc(100vw - 3rem));
  max-width: min(340px, calc(100vw - 2rem));
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 16. RESPONSIVE BREAKPOINTS

   Desktop-first approach. Each breakpoint progressively simplifies the layout:
   1200px → tighter padding, fewer grid columns
    900px → tablet, 2-col grids
    768px → mobile, single column, touch targets, scroll masks
    480px → small mobile, minimal spacing
    360px → extra small (narrow phones)

   Special media queries:
   - (pointer: coarse) → touch targets 44px min
   - (orientation: landscape) → landscape mobile grid adjustments
   - (-webkit-min-device-pixel-ratio: 2) → retina border thinning
   - (prefers-reduced-motion: reduce) → kill all animation
   - (prefers-color-scheme: dark) → subtle card shadows
   ═══════════════════════════════════════════════════════════════════════════ */
@media (max-width: 1200px) {
  .hero, .stats-row, .nav, .main, .nav-dropdown-space { padding-left: 32px; padding-right: 32px; }
  .g4 { grid-template-columns: repeat(2, 1fr); }
  .g5 { grid-template-columns: repeat(3, 1fr); }
}

/* ═══ RESPONSIVE - TABLET (900px) ═══ */
@media (max-width: 900px) {
  .hero, .stats-row, .nav, .main, .nav-dropdown-space { padding-left: 24px; padding-right: 24px; }
  .g3 { grid-template-columns: repeat(2, 1fr); }
  .g4 { grid-template-columns: repeat(2, 1fr); }
  .g5 { grid-template-columns: repeat(2, 1fr); }
  .card { padding: 20px; }
  .highlight { padding: 20px; }
}

/* ═══ RESPONSIVE - MOBILE (768px) ═══ */
@media (max-width: 768px) {
  /* Hero Section - Compact but readable */
  .hero {
    padding: 20px 16px 16px;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .price-block {
    text-align: left;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .price-big {
    font-size: 40px;
    letter-spacing: -2px;
    line-height: 1;
  }
  .price-badge {
    font-size: 12px;
    padding: 6px 12px;
  }
  .brand-block h1 {
    font-size: 26px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .brand-block .desc {
    font-size: 14px;
    line-height: 1.5;
    margin-top: 8px;
  }
  .brand-block .ticker {
    font-size: 11px;
    padding: 4px 10px;
    margin-bottom: 0;
  }

  /* Grid Layouts - Single column with proper spacing */
  .g2, .g3, .g4, .g5 {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  /* Stats Row - Horizontal scroll with momentum */
  .stats-row {
    padding: 16px;
    gap: 24px;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* Fade indicators for scroll */
    mask-image: linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 16px), transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 16px), transparent);
  }
  .stats-row::-webkit-scrollbar { display: none; }
  .stat-item {
    flex-shrink: 0;
    min-width: 80px;
    text-align: center;
  }
  .stat-item .val {
    font-size: 20px;
    font-weight: 700;
  }
  .stat-item .label {
    font-size: 9px;
    letter-spacing: 0.8px;
  }

  /* Navigation - Horizontal scroll with sticky behavior */
  .nav {
    padding: 12px 16px;
    gap: 8px;
    /* Fade indicators for scroll */
    mask-image: linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent);
  }
  .nav-btn {
    padding: 10px 16px;
    font-size: 13px;
    min-height: 44px;
    border-radius: 10px;
  }
  .nav-dropdown-space {
    padding: 0 16px;
  }
  .nav-dropdown-space.open {
    height: 44px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .nav-dropdown-item {
    font-size: 12px;
    padding: 6px 12px;
  }

  /* Main Content Area */
  .main {
    padding: 20px 16px;
  }

  /* Cards - Clean mobile design */
  .card {
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 0;
  }
  .card-title {
    font-size: 11px;
    margin-bottom: 0;
    letter-spacing: 2px;
  }

  /* Highlight boxes */
  .highlight {
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 0;
  }
  .highlight h3 {
    font-size: 16px;
    margin-bottom: 0;
  }
  .highlight p {
    font-size: 14px;
    line-height: 1.6;
  }

  /* Section Headers */
  .section-head {
    font-size: 22px;
    margin-bottom: 0;
    gap: 12px;
  }
  .section-head::before {
    width: 4px;
    height: 24px;
  }

  /* Tables - Scrollable with visual cues */
  .table-scroll table { min-width: 480px; }
  .tbl th, .tbl td {
    padding: 10px 12px;
    font-size: 12px;
  }
  .tbl th {
    font-size: 10px;
    letter-spacing: 0.8px;
  }

  /* Thesis Cards */
  .thesis {
    padding: 16px;
    border-radius: 16px;
  }
  .thesis h4 {
    font-size: 15px;
    margin-bottom: 0;
  }
  .thesis ul {
    font-size: 13px;
    line-height: 1.8;
  }
  .thesis li::before {
    margin-right: 8px;
  }

  /* Big Stats */
  .big-stat {
    padding: 16px;
    border-radius: 16px;
  }
  .big-stat .num {
    font-size: 28px;
  }
  .big-stat .lbl {
    font-size: 12px;
  }

  /* Bar Charts */
  .bars {
    height: 180px;
    gap: 4px;
    padding: 16px 0 0;
  }
  .bar-val {
    font-size: 9px;
  }
  .bar-label {
    font-size: 8px;
    margin-top: 8px;
    padding-bottom: 6px;
  }

  /* Monte Carlo Chart */
  .mc-chart {
    height: 200px;
  }

  /* Pills */
  .pills {
    gap: 6px;
    margin-bottom: 0;
  }
  .pill {
    padding: 4px 12px;
    font-size: 11px;
  }

  /* Sliders */
  .slider-wrap {
    margin-bottom: 0;
  }
  .slider-head {
    font-size: 13px;
    margin-bottom: 0;
  }

  /* Input controls - Prevent iOS zoom */
  input[type="range"] {
    height: 44px;
  }
  input[type="number"], select {
    font-size: 16px;
    padding: 12px 14px;
    border-radius: 10px;
    min-height: 44px;
  }

  /* Input rows */
  .input-row {
    flex-direction: column;
    gap: 12px;
  }
  .input-row label {
    font-size: 13px;
  }

  /* UpdateIndicators - Smaller on mobile */
  .update-dot {
    width: 6px;
    height: 6px;
  }

  /* sm-* utility responsive overrides */
  .sm-tab-hero { padding: 20px 0 16px; }
  .sm-tab-hero h2 { font-size: 24px; }
  .sm-tab-hero p { font-size: 14px; }
  .sm-section-label { font-size: 10px; letter-spacing: 2px; }
  .sm-data-row { padding: 10px 16px; }
  .sm-grid-cell { padding: 12px 16px; }
  .sm-grid-cell-center { padding: 12px; }
  .sm-kpi-cell { padding: 16px 12px; }
  .sm-kpi-value { font-size: 16px; }
  .sm-panel { padding: 16px; }
  .sm-panel-header { padding: 16px; }
  .sm-panel-body { padding: 16px; }
  .sm-mono-xl { font-size: 22px; }
  .sm-mono-2xl { font-size: 26px; }
  .sm-mono-3xl { font-size: 32px; }
  .sm-grid-sep { border-radius: 12px; }

  /* ── Wall Street Tab — Mobile ── */
  .sm-ws-grid-2col {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .sm-ws-kpi-4col {
    grid-template-columns: repeat(2, 1fr);
  }
  .sm-ws-est-cols {
    grid-template-columns: 1fr repeat(5, 56px);
  }
  .sm-ws-estimate-cell {
    padding: 8px 6px;
    font-size: 11px;
  }
  .sm-ws-th {
    padding: 8px 6px;
    font-size: 9px;
    letter-spacing: 0.5px;
  }
  .sm-ws-table {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .sm-ws-firm-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .sm-ws-firm-meta {
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;
  }
  .sm-ws-panel-header,
  .sm-ws-panel-body {
    padding: 16px;
  }
  .sm-ws-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sm-ws-report .sm-flex-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .sm-flex.sm-gap-16 {
    gap: 10px;
    flex-wrap: wrap;
  }

  /* ── Sources & Edgar — Mobile Two Sub-Rows ── */
  .sm-ed-filing-row {
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
  }
  .sm-ed-row-main {
    width: 100%;
  }
  .sm-ed-row-meta {
    width: 100%;
    flex-wrap: wrap;
    padding-left: 20px;
  }
  .sm-ed-desc {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    line-height: 1.5;
  }
  .sm-ed-date {
    width: auto;
    text-align: left;
    font-size: 10px;
  }
  .sm-ed-status-label {
    width: auto;
    text-align: left;
  }
  .sm-ed-source-name {
    width: auto;
    text-align: left;
  }

  /* ── Responsive Grids — Mobile ── */
  .sm-grid-2col-responsive { grid-template-columns: 1fr; }
  .sm-grid-3col-responsive { grid-template-columns: 1fr; }
  .sm-grid-4col-responsive { grid-template-columns: repeat(2, 1fr); }

  /* ── Scrollbox & Textarea — Mobile ── */
  .sm-scrollbox-tall { max-height: 400px; }
  .sm-scrollbox-med { max-height: 280px; }
  .sm-scrollbox-short { max-height: 180px; }
  .sm-agent-textarea { height: 150px; font-size: 13px; }

  /* ── Shared Tab Overrides — Mobile ── */
  .sm-ed-info-card-lg,
  .sm-ed-info-card-xl {
    flex-basis: 100%;
    min-width: 0;
  }
  .sm-badge,
  .sm-badge-impact {
    padding: 3px 8px;
    font-size: 9px;
  }
  .sm-expand-btn {
    padding: 6px 12px;
    font-size: 11px;
  }
  .sm-card-colored {
    padding: 16px;
  }

  /* ── Edgar / Sources Analysis Results — Mobile ── */
  .sm-ed-analysis {
    padding: 16px;
  }
  .sm-ed-analysis-pre {
    font-size: 11px;
  }
  .sm-ed-diff-panel {
    border-radius: 8px;
  }

  /* ── Typography Scaling — Mobile ── */
  .sm-mono-lg { font-size: 16px; }
  .sm-body-lg { font-size: 14px; }
  .sm-param-label { font-size: 12px; }
}

/* ═══ RESPONSIVE - SMALL MOBILE (480px) ═══ */
@media (max-width: 480px) {
  /* Hero */
  .hero {
    padding: 16px 12px 12px;
  }
  .price-big {
    font-size: 36px;
  }
  .brand-block h1 {
    font-size: 22px;
  }
  .brand-block .desc {
    font-size: 13px;
    line-height: 1.5;
  }

  /* Stats Row */
  .stats-row {
    padding: 16px 12px;
    gap: 16px;
  }
  .stat-item .val {
    font-size: 18px;
  }
  .stat-item .label {
    font-size: 8px;
    letter-spacing: 0.5px;
  }

  /* Navigation */
  .nav {
    padding: 10px 12px;
    gap: 6px;
  }
  .nav-btn {
    padding: 8px 12px;
    font-size: 12px;
    min-width: auto;
  }
  .nav-dropdown-space {
    padding: 0 12px;
  }
  .nav-dropdown-space.open {
    height: 40px;
  }
  .nav-dropdown-item {
    font-size: 11px;
    padding: 5px 8px;
  }

  /* Main Content */
  .main {
    padding: 16px 12px;
  }

  /* Cards */
  .card, .highlight {
    padding: 16px;
    border-radius: 12px;
  }
  .card-title {
    font-size: 11px;
  }

  /* Section Headers */
  .section-head {
    font-size: 20px;
    margin-bottom: 0;
  }

  /* Tables */
  .table-scroll table { min-width: 380px; }
  .tbl th, .tbl td {
    padding: 8px 10px;
    font-size: 11px;
  }
  .tbl th {
    font-size: 9px;
  }

  /* Grids */
  .g2, .g3, .g4, .g5 { gap: 12px; }

  /* Big Stats */
  .big-stat .num {
    font-size: 24px;
  }
  .big-stat .lbl {
    font-size: 11px;
  }

  /* Thesis */
  .thesis {
    padding: 16px;
  }
  .thesis h4 {
    font-size: 14px;
  }
  .thesis ul {
    font-size: 12px;
  }

  /* Pills */
  .pill {
    padding: 8px 14px;
    font-size: 11px;
  }

  /* ── Wall Street Tab — Small Mobile ── */
  .sm-ws-kpi-4col {
    grid-template-columns: 1fr;
  }
  .sm-ws-est-cols {
    grid-template-columns: 1fr repeat(3, 48px);
  }
  .sm-ws-est-cols > :nth-child(n+5) {
    display: none;
  }
  .sm-ws-estimate-cell {
    padding: 6px 4px;
    font-size: 10px;
  }
  .sm-ws-th {
    padding: 6px 4px;
    font-size: 8px;
  }
  .sm-ws-firm-header {
    padding: 12px;
    gap: 10px;
  }
  .sm-ws-firm-name {
    font-size: 14px;
  }
  .sm-ws-metrics-grid {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 10px;
  }
  .sm-ws-firm-meta {
    gap: 6px;
  }

  /* ── Sources & Edgar — Small Mobile ── */
  .sm-ed-row-meta {
    padding-left: 0;
    gap: 6px;
  }
  .sm-ed-filing-row {
    padding: 8px 10px;
  }
  .sm-ed-desc {
    font-size: 12px;
  }
  .sm-ed-form-badge {
    width: auto;
    min-width: 40px;
    font-size: 9px;
  }

  /* ── Responsive Grids — Small Mobile ── */
  .sm-grid-4col-responsive { grid-template-columns: 1fr; }

  /* ── Scrollbox & Textarea — Small Mobile ── */
  .sm-scrollbox-tall { max-height: 300px; }
  .sm-scrollbox-med { max-height: 200px; }
  .sm-scrollbox-short { max-height: 140px; }
  .sm-agent-textarea { height: 120px; padding: 12px; font-size: 12px; }

  /* ── sm-* Shared Overrides — Small Mobile ── */
  .sm-tab-hero { padding: 16px 0 12px; }
  .sm-tab-hero h2 { font-size: 20px; }
  .sm-tab-hero p { font-size: 13px; }
  .sm-section-label { font-size: 9px; letter-spacing: 1.5px; }
  .sm-data-row { padding: 8px 12px; }
  .sm-grid-cell { padding: 10px 12px; }
  .sm-kpi-cell { padding: 12px 10px; }
  .sm-kpi-value { font-size: 14px; }
  .sm-model-grid { --cols: 1 !important; border-radius: 8px; }
  .sm-panel { padding: 12px; }
  .sm-panel-header { padding: 12px; }
  .sm-panel-body { padding: 12px; }
  .sm-mono-xl { font-size: 18px; }
  .sm-mono-2xl { font-size: 22px; }
  .sm-mono-3xl { font-size: 28px; }
  .sm-mono-lg { font-size: 14px; }

  /* ── Action buttons — Small Mobile ── */
  .sm-ed-action-btn { font-size: 10px; padding: 4px 8px; }
  .sm-ed-action-btn-sm { font-size: 8px; padding: 2px 6px; }
  .sm-ed-filter-pill { font-size: 10px; padding: 4px 10px; }

  /* ── Gap/Spacing — Small Mobile ── */
  .sm-gap-16 { gap: 8px; }
  .sm-gap-12 { gap: 6px; }
  .sm-mb-16 { margin-bottom: 8px; }
  .sm-mb-12 { margin-bottom: 6px; }
  .sm-mt-16 { margin-top: 8px; }

  /* ── Edgar Tab — Small Mobile ── */
  .sm-ed-analysis { padding: 12px; }
  .sm-ed-analysis-pre { font-size: 10px; line-height: 1.6; }
  .sm-ed-diff-panel { margin: 0 -12px; border-radius: 0; }

  /* ── Comps Tab — Small Mobile ── */
  .sm-cmp-filter-btn { padding: 6px 10px; font-size: 12px; }
  .sm-cmp-peer-card { padding: 14px; border-radius: 12px; }
  .sm-cmp-card-name { font-size: 14px; }
  .sm-cmp-metrics-grid { grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 4px; padding: 8px; }
  .sm-cmp-metric-value { font-size: 11px; }
  .sm-cmp-metric-label { font-size: 8px; }
  .sm-cmp-badge { font-size: 9px; padding: 2px 6px; }
  .sm-cmp-cap-tag { font-size: 9px; padding: 2px 6px; }
  .sm-cmp-th { padding: 8px 8px; font-size: 9px; letter-spacing: 0.5px; }
  .sm-cmp-td { padding: 8px 8px; font-size: 12px; }
  .sm-cmp-td-label { padding: 8px 8px; font-size: 12px; }

  /* ── Capital Tab — Small Mobile ── */
  .sm-cap-nav-item { min-width: 120px; padding: 12px 12px; }
  .sm-cap-nav-value { font-size: 16px; }
  .sm-cap-nav-label { font-size: 11px; }
  .sm-cap-nav-sub { font-size: 10px; }
  .sm-cap-th { padding: 8px 8px; font-size: 8px; letter-spacing: 0.5px; }
  .sm-cap-td-label { padding: 8px 8px; font-size: 11px; }
  .sm-cap-td { padding: 8px 8px; font-size: 10px; }

  /* ── Financials Tab — Small Mobile ── */
  .sm-fin-th { padding: 8px 6px; font-size: 8px; letter-spacing: 0.5px; }
  .sm-fin-td-label { padding: 8px 6px; font-size: 11px; }
  .sm-fin-td { padding: 8px 6px; font-size: 10px; }
  .sm-fin-chart { height: 140px; gap: 4px; }
  .sm-fin-bar { min-width: 36px; }
  .sm-fin-bar[data-overflow="true"] { min-width: 40px; max-width: 56px; }
}

/* ═══ RESPONSIVE - EXTRA SMALL (360px) ═══ */
@media (max-width: 360px) {
  .hero { padding: 12px 12px; }
  .price-big { font-size: 32px; }
  .brand-block h1 { font-size: 20px; }
  .brand-block .desc { font-size: 12px; }

  .stats-row { padding: 12px 12px; gap: 16px; }
  .stat-item .val { font-size: 16px; }

  .nav { padding: 8px 12px; }
  .nav-btn { padding: 6px 12px; font-size: 11px; }

  .main { padding: 16px 12px; }
  .card, .highlight { padding: 12px; }
  .section-head { font-size: 18px; }

  .tbl th, .tbl td { padding: 6px 8px; font-size: 10px; }

  /* ── Scrollbox — Extra Small ── */
  .sm-scrollbox-tall { max-height: 250px; }
  .sm-scrollbox-med { max-height: 180px; }
  .sm-scrollbox-short { max-height: 120px; }
  .sm-agent-textarea { height: 100px; padding: 10px; }

  /* ── sm-* Overrides — Extra Small ── */
  .sm-tab-hero h2 { font-size: 18px; }
  .sm-tab-hero p { font-size: 12px; }
  .sm-panel, .sm-panel-header, .sm-panel-body { padding: 10px; }
  .sm-kpi-cell { padding: 10px 8px; }
  .sm-kpi-value { font-size: 12px; }
  .sm-section-label { font-size: 8px; }
  .sm-ed-action-btn { font-size: 9px; padding: 3px 6px; }

  /* ── Comps Tab — Extra Small ── */
  .sm-cmp-filter-btn { padding: 5px 8px; font-size: 11px; border-radius: 6px; }
  .sm-cmp-peer-card { padding: 12px; border-radius: 10px; }
  .sm-cmp-card-name { font-size: 13px; }
  .sm-cmp-metrics-grid { grid-template-columns: repeat(3, 1fr); }
  .sm-cmp-th { padding: 6px 6px; font-size: 8px; }
  .sm-cmp-td { padding: 6px 6px; font-size: 11px; }
  .sm-cmp-td-label { padding: 6px 6px; font-size: 11px; }

  /* ── Capital Tab — Extra Small ── */
  .sm-cap-nav-item { min-width: 100px; padding: 10px 10px; }
  .sm-cap-nav-value { font-size: 14px; }
  .sm-cap-nav-label { font-size: 10px; }
  .sm-cap-nav-sub { display: none; }
  .sm-cap-th { padding: 6px 6px; font-size: 8px; }
  .sm-cap-td-label { padding: 6px 6px; font-size: 10px; }
  .sm-cap-td { padding: 6px 6px; font-size: 9px; }

  /* ── Financials Tab — Extra Small ── */
  .sm-fin-th { padding: 6px 4px; font-size: 8px; }
  .sm-fin-td-label { padding: 6px 4px; font-size: 10px; }
  .sm-fin-td { padding: 6px 4px; font-size: 9px; }
  .sm-fin-chart { height: 120px; gap: 3px; }
  .sm-fin-bar { min-width: 32px; }
}

/* ═══ LANDSCAPE MOBILE ADJUSTMENTS ═══ */
@media (max-width: 900px) and (orientation: landscape) {
  .hero { padding: 16px 24px; }
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .stats-row { padding: 12px 24px; }
  .g2 { grid-template-columns: repeat(2, 1fr); }
  .g3 { grid-template-columns: repeat(3, 1fr); }
  .g4 { grid-template-columns: repeat(2, 1fr); }
}

/* ═══ HIGH DPI / RETINA ADJUSTMENTS ═══ */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .card, .highlight {
    border-width: 0.5px;
  }
}

/* ═══ REDUCED MOTION ═══ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .bar:hover {
    transform: none;
  }
}

/* ═══ DARK MODE OPTIMIZATION ═══ */
@media (prefers-color-scheme: dark) {
  /* Already dark, but ensure proper contrast */
  .card, .highlight {
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 17. TIMELINE SYSTEM
   Expandable event timeline with categories (guidance, data, event, launch).
   Each item has a header grid, verdict badge, and collapsible detail section.
   Responsive: collapses columns at 900px and 600px breakpoints.
   ═══════════════════════════════════════════════════════════════════════════ */
.timeline-item {
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 0;
  overflow: hidden;
  transition: all 0.2s;
  background: var(--surface);
}
.timeline-item:hover {
  border-color: var(--accent-dim);
}
.timeline-item.expanded {
  border-color: var(--accent);
  background: var(--surface2);
}
.timeline-header {
  display: grid;
  grid-template-columns: 100px 100px 1fr auto auto;
  gap: 16px;
  padding: 16px 24px;
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
  color: var(--accent);
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
  background: var(--accent);
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
  max-height: 2000px;
  padding: 24px;
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
  margin-bottom: 0;
}
.t-details-text li::before {
  content: '•';
  color: var(--accent);
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
  margin-bottom: 0;
}
.t-meta-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}
.t-meta-value.accent { color: var(--accent); }
.t-meta-value.cyan { color: var(--cyan); }
.t-meta-value.green { color: var(--mint); }
.t-meta-value.red { color: var(--coral); }
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

/* ── Stock-Model Timeline (sm-tl-*) ─────────────────────────────────────── */
/* Used by SEC Filings + Event Timeline sections in ASTS / BMNR / CRCL      */

/* Filing grid header */
.sm-tl-filing-header {
  display: grid;
  grid-template-columns: 120px 80px 1fr 100px 80px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--surface2);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
}
/* Filing grid row */
.sm-tl-filing-row {
  display: grid;
  grid-template-columns: 120px 80px 1fr 100px 80px;
  padding: 12px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
  align-items: center;
  font-size: 13px;
  color: var(--text2);
}
.sm-tl-filing-row:last-child { border-bottom: none; }
.sm-tl-filing-row:hover { background: var(--surface2); }

/* Event timeline row — expandable */
.sm-tl-event-row {
  display: grid;
  grid-template-columns: 100px 90px 1fr 80px 30px;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.15s;
  font-size: 13px;
}
.sm-tl-event-row:hover { background: var(--surface2); }

/* Expanded details — 2-col (text + sidebar) */
.sm-tl-details-grid {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 24px;
}

/* 2-column explanation grid (How to Use) */
.sm-tl-explain-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  font-size: 13px;
}

/* Event card wrapper */
.sm-tl-event-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.15s;
}
.sm-tl-event-card:hover { border-color: var(--accent-dim); }

/* Expanded detail panel inside event card */
.sm-tl-detail-panel {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
}

/* ── sm-tl responsive: 768px ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .sm-tl-filing-header,
  .sm-tl-filing-row {
    grid-template-columns: 80px 60px 1fr;
  }
  .sm-tl-filing-header > :nth-child(4),
  .sm-tl-filing-header > :nth-child(5),
  .sm-tl-filing-row > :nth-child(4),
  .sm-tl-filing-row > :nth-child(5) {
    display: none;
  }
  .sm-tl-event-row {
    grid-template-columns: 1fr auto auto;
    gap: 8px;
    padding: 12px;
  }
  .sm-tl-event-row > :nth-child(1),
  .sm-tl-event-row > :nth-child(2) {
    display: none;
  }
  .sm-tl-details-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .sm-tl-explain-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .sm-tl-detail-panel {
    padding: 12px 16px;
  }
}

/* ── sm-tl responsive: 480px ──────────────────────────────────────────── */
@media (max-width: 480px) {
  .sm-tl-event-row {
    grid-template-columns: 1fr auto;
    padding: 10px;
  }
  .sm-tl-event-row > :nth-child(4) {
    display: none;
  }
  .sm-tl-filing-header,
  .sm-tl-filing-row {
    grid-template-columns: 60px 1fr;
  }
  .sm-tl-filing-header > :nth-child(2),
  .sm-tl-filing-row > :nth-child(2) {
    display: none;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 18. UPDATE INDICATOR SYSTEM
   Tiny colored dots showing data freshness. Categories:
   .pr (press/news — gold), .sec (SEC filings — cyan),
   .ws (Wall Street — violet), .market (market data — green).
   Tooltip appears on hover via ::after pseudo-element with data-tooltip attr.
   ═══════════════════════════════════════════════════════════════════════════ */
.update-indicator-wrap {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  gap: 3px;
  flex-shrink: 0;
}
.update-indicator {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  cursor: help;
  position: relative;
  flex-shrink: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.update-indicator.hidden { opacity: 0; transform: scale(0.5); }
.update-indicator.pr { background: rgba(250, 204, 21, 0.85); }
.update-indicator.sec { background: rgba(34, 211, 238, 0.85); }
.update-indicator.ws { background: rgba(167, 139, 250, 0.85); }
.update-indicator.market { background: rgba(74, 222, 128, 0.85); }

/* Tooltip on hover - refined */
.update-indicator::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  padding: 5px 9px;
  background: rgba(30, 30, 35, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 5px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
  z-index: 1000;
  color: rgba(255,255,255,0.9);
  pointer-events: none;
  letter-spacing: 0.2px;
}
.update-indicator:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
}

/* Update Legend - minimal */
.update-legend {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  font-size: 11px;
  margin-bottom: 0;
}
.update-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text3);
}
.update-legend-item .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.update-legend-item .dot.pr { background: rgba(250, 204, 21, 0.85); }
.update-legend-item .dot.sec { background: rgba(34, 211, 238, 0.85); }
.update-legend-item .dot.ws { background: rgba(167, 139, 250, 0.85); }
.update-legend-item .dot.market { background: rgba(74, 222, 128, 0.85); }

/* ═══ REFRESH BUTTON ANIMATION ═══ */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 19. COMPETITOR CARDS
   Unified company comparison cards with threat-level indicators.
   Cards show metrics, capabilities, and optional notes.
   Threat levels: high (coral), medium (gold), low (mint).
   Self-card variant uses accent gradient background.
   ═══════════════════════════════════════════════════════════════════════════ */
.comp-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.comp-unified-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.2s;
  border-left: 4px solid var(--surface3);
}
.comp-unified-card:hover {
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
}
.comp-unified-card.threat-high { border-left-color: var(--coral); }
.comp-unified-card.threat-medium { border-left-color: var(--gold); }
.comp-unified-card.threat-low { border-left-color: var(--mint); }
.comp-unified-card.comp-self {
  border-left-color: var(--accent);
  background: linear-gradient(135deg, var(--accent-dim) 0%, var(--surface) 100%);
}

.comp-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 8px;
}
.comp-card-identity {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.comp-card-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}
.comp-card-ticker {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--text3);
}
.comp-card-badges {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}
.comp-card-badge {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.comp-card-badge.type-badge {
  background: var(--surface3);
  color: var(--text3);
}
.comp-card-badge.threat-high {
  background: rgba(255,123,114,0.15);
  color: var(--coral);
}
.comp-card-badge.threat-medium {
  background: rgba(210,153,34,0.15);
  color: var(--gold);
}
.comp-card-badge.threat-low {
  background: rgba(126,231,135,0.15);
  color: var(--mint);
}

.comp-card-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  padding: 12px;
  background: var(--surface2);
  border-radius: 10px;
  margin-bottom: 12px;
}
.comp-card-metric {
  text-align: center;
  padding: 4px 0;
}
.comp-card-metric .val {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
}
.comp-card-metric .val.mint { color: var(--mint); }
.comp-card-metric .val.coral { color: var(--coral); }
.comp-card-metric .val.accent { color: var(--accent); }
.comp-card-metric .val.sky { color: var(--sky); }
.comp-card-metric .lbl {
  font-size: 9px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.comp-card-detail {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.5;
  margin-bottom: 4px;
}
.comp-card-detail strong {
  color: var(--text);
}
.comp-card-notes {
  font-size: 11px;
  color: var(--text3);
  font-style: italic;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
  line-height: 1.5;
}

.comp-card-capabilities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}
.comp-cap {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.comp-cap.yes {
  background: rgba(126,231,135,0.15);
  color: var(--mint);
}
.comp-cap.no {
  background: var(--surface3);
  color: var(--text3);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .comp-cards-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .comp-unified-card {
    padding: 16px;
    border-radius: 14px;
  }
  .comp-card-name { font-size: 14px; }
  .comp-card-metrics { gap: 4px; padding: 8px; }
  .comp-card-metric .val { font-size: 12px; }
}
@media (max-width: 480px) {
  .comp-unified-card { padding: 14px; border-radius: 12px; }
  .comp-card-name { font-size: 13px; }
  .comp-card-badge { font-size: 9px; padding: 2px 6px; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 20. COMPANY DISCLOSURE PANELS
   Expandable <details>/<summary> panels for company information.
   Uses native HTML disclosure widget with custom styling.
   ═══════════════════════════════════════════════════════════════════════════ */
.comp-panel {
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
  background: var(--surface);
}
.comp-panel summary {
  list-style: none;
  cursor: pointer;
  user-select: none;
  padding: 0;
}
.comp-panel summary::-webkit-details-marker { display: none; }
.comp-panel summary::marker { display: none; content: ''; }
.comp-panel summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
  border-radius: 12px;
}

.comp-panel-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
}

.comp-panel-info { flex: 1; min-width: 0; }
.comp-panel-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  line-height: 1;
}
.comp-panel-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}
.comp-panel-count {
  font-size: 11px;
  color: var(--text3);
}
.comp-panel-dates {
  font-size: 11px;
  color: var(--text3);
  opacity: 0.6;
}

.comp-panel-chevron {
  flex-shrink: 0;
  transition: transform 0.25s ease;
}
.comp-panel-chevron svg {
  width: 16px;
  height: 16px;
  stroke: var(--text3);
  stroke-width: 2;
  fill: none;
}
.comp-panel[open] .comp-panel-chevron {
  transform: rotate(180deg);
}

.comp-panel-body {
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .comp-panel-bar { padding: 12px 16px; }
  .comp-panel-name { font-size: 13px; }
}
@media (max-width: 480px) {
  .comp-panel-bar { padding: 10px 14px; }
  .comp-panel-dates { display: none; }
}

/* ── Stock Model Card System (ASTS / BMNR / CRCL) ─────────────────────── */
/* Round-16 card (most common container in model files) */
.sm-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.sm-card-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sm-card-body {
  padding: 24px;
}
.sm-card-footer {
  padding: 12px 24px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text3);
}
.sm-card-section {
  padding: 24px;
  border-bottom: 1px solid var(--border);
}
.sm-card-section:last-child {
  border-bottom: none;
}

/* Table header row (surface2 background) */
.sm-table-header {
  padding: 12px 16px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
  background: var(--surface2);
}

/* Mono text alignment helpers */
.sm-mono-right {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--text2);
  text-align: right;
}

/* Divider line element (used inside sm-divider) */
.sm-divider-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* Grid layouts commonly used in model files */
.sm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sm-grid-2-lg { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.sm-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.sm-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

/* Micro label (10px uppercase) */
.sm-micro-text {
  font-size: 10px;
  color: var(--text3);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-weight: 500;
}

/* Standard text sizes reused across model */
.sm-text-11 { font-size: 11px; color: var(--text3); }
.sm-text-12 { font-size: 12px; color: var(--text2); }
.sm-text-13 { font-size: 13px; color: var(--text2); }
.sm-text-13t { font-size: 13px; color: var(--text); }

/* Empty style placeholder (intentional no-op) */
.sm-p0 { padding: 0; }

/* Collapsed toggle row (clickable header in collapsible sections) */
.sm-toggle-header {
  padding: 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s;
}
.sm-toggle-header:hover {
  background: var(--surface2);
}

/* Model overview grid (1px gap borders)
   Set column count: style={{ '--cols': 4 } as React.CSSProperties} */
.sm-model-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
}

/* ── Background utilities ── */
.sm-bg-surface { background: var(--surface); }
.sm-bg-surface2 { background: var(--surface2); }
.sm-bg-surface3 { background: var(--surface3); }

/* ── Additional layout utilities ── */
.sm-inline-flex { display: inline-flex; align-items: center; gap: 6px; }
.sm-overflow-x { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.sm-p-16 { padding: 16px; }
.sm-p-24 { padding: 24px; }
.sm-px-24 { padding-left: 24px; padding-right: 24px; }
.sm-py-12 { padding-top: 12px; padding-bottom: 12px; }

/* ── Additional border radius utilities ── */
.sm-rounded-4 { border-radius: 4px; }
.sm-rounded-8 { border-radius: 8px; }
.sm-rounded-12 { border-radius: 12px; }
.sm-rounded-16 { border-radius: 16px; }
.sm-rounded-full { border-radius: 9999px; }

/* ── Additional typography ── */
.sm-text-14 { font-size: 14px; }
.sm-text-15 { font-size: 15px; }
.sm-text-16 { font-size: 16px; }
.sm-text-18 { font-size: 18px; }
.sm-text-20 { font-size: 20px; }
.sm-text-24 { font-size: 24px; }
.sm-fw-300 { font-weight: 300; }
.sm-fw-400 { font-weight: 400; }
.sm-fw-500 { font-weight: 500; }
.sm-fw-600 { font-weight: 600; }
.sm-fw-700 { font-weight: 700; }
.sm-lh-16 { line-height: 1.6; }
.sm-lh-17 { line-height: 1.7; }
.sm-ls-wide { letter-spacing: 0.12em; }
.sm-uppercase { text-transform: uppercase; }

/* ── Cursor / Transition ── */
.sm-pointer { cursor: pointer; }
.sm-transition { transition: all 0.2s; }
.sm-transition-fast { transition: all 0.15s; }

/* ── Border utilities ── */
.sm-border { border: 1px solid var(--border); }
.sm-border-b { border-bottom: 1px solid var(--border); }
.sm-border-t { border-top: 1px solid var(--border); }

/* ── Overflow hidden / scroll containers ── */
.sm-overflow-hidden { overflow: hidden; }

/* Data table row (grid with hover) - used in model tab tables */
.sm-table-row {
  display: grid;
  padding: 12px 24px;
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-table-row:hover {
  background: var(--surface2);
}
.sm-table-row:last-child {
  border-bottom: none;
}

/* Bullet list (used in analysis/notes sections) */
.sm-note-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--text3);
  line-height: 1.5;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CAPITAL TAB CLASSES (sm-cap-*)
   Navigation strip, data tables, and responsive overrides for Capital tab
   ═══════════════════════════════════════════════════════════════════════════ */

/* Capital nav — horizontal scroll strip on mobile, grid on desktop.
   Set column count: style={{ '--cap-cols': 7 } as React.CSSProperties} */
.sm-cap-nav {
  display: grid;
  grid-template-columns: repeat(var(--cap-cols, 7), 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
  margin-bottom: 16px;
}

/* Individual nav card inside the strip */
.sm-cap-nav-item {
  background: var(--surface);
  padding: 20px 20px;
  cursor: pointer;
  border-left: 4px solid transparent;
  transition: border-color 0.2s, background 0.15s;
}
.sm-cap-nav-item[data-active="true"] {
  border-left-color: var(--accent);
}
.sm-cap-nav-value {
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
}
.sm-cap-nav-item[data-active="true"] .sm-cap-nav-value {
  color: var(--accent);
}
.sm-cap-nav-label {
  font-size: 13px;
  font-weight: 500;
  margin-top: 2px;
}
.sm-cap-nav-sub {
  font-size: 11px;
  color: var(--text3);
  margin-top: 2px;
}

/* Capital data table — header row */
.sm-cap-table-header {
  display: grid;
  border-bottom: 1px solid var(--border);
  background: var(--surface2);
}

/* Capital data table — header cell */
.sm-cap-th {
  padding: 12px 16px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
}
.sm-cap-th[data-align="right"] { text-align: right; }

/* Capital data table — data row */
.sm-cap-table-row {
  display: grid;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-cap-table-row:last-child { border-bottom: none; }
.sm-cap-table-row:hover { background: color-mix(in srgb, var(--accent) 3%, transparent); }

/* Capital table — label cell (first column, sticky on mobile scroll) */
.sm-cap-td-label {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  position: sticky;
  left: 0;
  background: var(--bg1);
  z-index: 1;
}

/* Capital table — data cell */
.sm-cap-td {
  padding: 12px 16px;
  font-size: 12px;
  font-family: 'Space Mono', monospace;
}
.sm-cap-td[data-align="right"] { text-align: right; }
.sm-cap-td[data-highlight] {
  color: var(--accent);
  font-weight: 600;
}

/* Capital table — summary/total row */
.sm-cap-table-total {
  display: grid;
  background: var(--accent-dim);
  font-weight: 600;
}

/* Capital table wrapper — enables horizontal scroll on mobile */
.sm-cap-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPS TAB CLASSES (sm-cmp-*)
   Peer cards, filter buttons, metrics grids, valuation tables, badges
   ═══════════════════════════════════════════════════════════════════════════ */

/* Peer group filter button — replaces 12-property inline style */
.sm-cmp-filter-btn {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text2);
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
  white-space: nowrap;
}
.sm-cmp-filter-btn[data-active="true"] {
  font-weight: 600;
  background: var(--accent-dim);
  border-color: var(--accent);
  color: var(--accent);
}

/* 2-column peer card grid — stacks to 1-col on mobile */
.sm-cmp-peer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Individual peer card — threat level via data-threat */
.sm-cmp-peer-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  border-left: 4px solid var(--surface3);
}
.sm-cmp-peer-card[data-threat="critical"],
.sm-cmp-peer-card[data-threat="high"] { border-left-color: var(--coral); }
.sm-cmp-peer-card[data-threat="medium"] { border-left-color: var(--gold); }
.sm-cmp-peer-card[data-threat="low"] { border-left-color: var(--mint); }
.sm-cmp-peer-card[data-self="true"] {
  background: linear-gradient(135deg, var(--accent-dim) 0%, var(--surface) 100%);
  border-left-color: var(--accent);
}

/* Card header row — name + badges */
.sm-cmp-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 8px;
}
.sm-cmp-card-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}
.sm-cmp-card-ticker {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--text3);
  margin-top: 2px;
}

/* Badge row — threat + category */
.sm-cmp-badge-row {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}

/* Threat/category badge */
.sm-cmp-badge {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  background: var(--surface3);
  color: var(--text3);
}
.sm-cmp-badge[data-level="critical"],
.sm-cmp-badge[data-level="high"] { background: rgba(255,123,114,0.15); color: var(--coral); }
.sm-cmp-badge[data-level="medium"] { background: rgba(210,153,34,0.15); color: var(--gold); }
.sm-cmp-badge[data-level="low"] { background: rgba(126,231,135,0.15); color: var(--mint); }

/* Metrics grid inside peer cards */
.sm-cmp-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  padding: 12px;
  background: var(--surface2);
  border-radius: 10px;
  margin-bottom: 12px;
}

/* Individual metric cell */
.sm-cmp-metric {
  text-align: center;
  padding: 4px 0;
}
.sm-cmp-metric-value {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
}
.sm-cmp-metric-label {
  font-size: 9px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* Capability tag — voice, text, data etc. */
.sm-cmp-cap-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  background: var(--surface3);
  color: var(--text3);
  opacity: 0.6;
}
.sm-cmp-cap-tag[data-enabled="true"] {
  background: rgba(126,231,135,0.15);
  color: var(--mint);
  opacity: 1;
}

/* Capability tag row */
.sm-cmp-cap-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

/* Valuation table — scroll wrapper */
.sm-cmp-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Valuation table — header row */
.sm-cmp-table-header {
  display: grid;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
}

/* Valuation table — header cell */
.sm-cmp-th {
  padding: 12px 16px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text3);
  font-weight: 600;
}
.sm-cmp-th[data-align="right"] { text-align: right; }

/* Valuation table — data row */
.sm-cmp-table-row {
  display: grid;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}
.sm-cmp-table-row:hover { background: color-mix(in srgb, var(--accent) 3%, transparent); }

/* Valuation table — data cell */
.sm-cmp-td {
  padding: 12px 16px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
}
.sm-cmp-td[data-align="right"] { text-align: right; }

/* Valuation table — label cell (first column, sticky on mobile) */
.sm-cmp-td-label {
  padding: 12px 16px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  position: sticky;
  left: 0;
  background: var(--bg1);
  z-index: 1;
}

/* Valuation table — total/summary row */
.sm-cmp-table-total {
  display: grid;
  border-top: 2px solid var(--border);
  font-weight: 600;
}

/* ── Financials bar chart container ──
   Wraps each bar chart section for consistent mobile scaling */
.sm-fin-chart {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 220px;
}

/* Individual bar column in financials charts */
.sm-fin-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 56px;
}
.sm-fin-bar[data-overflow="true"] {
  flex: 0 0 auto;
  min-width: 64px;
  max-width: 80px;
}

/* Scroll hint indicator for horizontally-scrollable containers */
.sm-scroll-hint {
  position: relative;
}
.sm-scroll-hint::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--surface));
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s;
  border-radius: 0 16px 16px 0;
}

/* ── Financials data table ──
   Replaces inline grid styles for quarterly metric tables */
.sm-fin-table-header,
.sm-fin-table-row {
  display: grid;
  transition: background 0.15s;
}
.sm-fin-table-header {
  border-bottom: 1px solid var(--border);
}
.sm-fin-table-row {
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
}
.sm-fin-table-row:last-child {
  border-bottom: none;
}
.sm-fin-th {
  padding: 12px 16px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
  background: var(--surface2);
  white-space: nowrap;
}
.sm-fin-th[data-sticky] {
  position: sticky;
  left: 0;
  z-index: 2;
}
.sm-fin-th[data-latest] {
  background: var(--accent-dim);
}
.sm-fin-td-label {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  position: sticky;
  left: 0;
  background: var(--bg1);
  z-index: 1;
}
.sm-fin-td {
  padding: 12px 16px;
  font-size: 12px;
  font-family: 'Space Mono', monospace;
  text-align: right;
}
.sm-fin-td[data-latest] {
  background: var(--accent-dim);
}

/* Model responsive overrides */
@media (max-width: 768px) {
  .sm-card-header { padding: 16px; }
  .sm-card-body { padding: 16px; }
  .sm-card-section { padding: 16px; }
  .sm-card-footer { padding: 10px 16px; }
  .sm-grid-2, .sm-grid-2-lg { grid-template-columns: 1fr; }
  .sm-grid-3 { grid-template-columns: 1fr; }
  .sm-grid-4 { grid-template-columns: 1fr 1fr; }
  .sm-model-grid { --cols: 2 !important; border-radius: 12px; }
  .sm-table-row { padding: 10px 16px; }

  /* Capital tab — compact nav grid on tablet */
  .sm-cap-nav {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 0;
    border-radius: 12px;
    scrollbar-width: none;
  }
  .sm-cap-nav::-webkit-scrollbar { display: none; }
  .sm-cap-nav-item {
    flex: 0 0 auto;
    min-width: 140px;
    padding: 16px 16px;
  }
  .sm-cap-nav-value { font-size: 18px; }
  .sm-cap-nav-label { font-size: 12px; }

  /* Comps tab — tablet */
  .sm-cmp-peer-grid { grid-template-columns: 1fr; }
  .sm-cmp-peer-card { padding: 16px; }
  .sm-cmp-metrics-grid { gap: 6px; padding: 10px; }
  .sm-cmp-metric-value { font-size: 12px; }
  .sm-cmp-th { padding: 10px 12px; font-size: 10px; }
  .sm-cmp-td { padding: 10px 12px; font-size: 13px; }
  .sm-cmp-td-label { padding: 10px 12px; font-size: 13px; }

  /* Capital table — tighter cells on tablet */
  .sm-cap-th { padding: 10px 12px; font-size: 9px; }
  .sm-cap-td-label { padding: 10px 12px; font-size: 12px; }
  .sm-cap-td { padding: 10px 12px; font-size: 11px; }

  /* Financials table — tighter cells on tablet */
  .sm-fin-th { padding: 10px 10px; font-size: 9px; }
  .sm-fin-td-label { padding: 10px 10px; font-size: 12px; }
  .sm-fin-td { padding: 10px 10px; font-size: 11px; }

  /* Financials bar chart — reduce height */
  .sm-fin-chart { height: 160px; gap: 6px; }
  .sm-fin-bar { min-width: 44px; }
  .sm-fin-bar[data-overflow="true"] { min-width: 48px; max-width: 64px; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   STOCK CHART COMPONENT CLASSES (sm-chart-*)
   Replaces inline styles in StockChart.tsx
   ═══════════════════════════════════════════════════════════════════════════ */

/* Main chart container */
.sm-chart-container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  padding-bottom: 16px;
}

/* Chart Guide card (separate panel below chart) */
.sm-chart-guide-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

/* Header area */
.sm-chart-header {
  margin-bottom: 12px;
  padding: 0 24px;
}

/* Symbol header with border-bottom */
.sm-chart-symbol-row {
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;
}

/* Price display row */
.sm-chart-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

/* Big price number */
.sm-chart-price {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Space Mono', monospace;
}

/* Price change text */
.sm-chart-price-change {
  font-size: 14px;
  font-family: 'Space Mono', monospace;
}

/* Controls row */
.sm-chart-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

/* Range button group container */
.sm-chart-range-group {
  display: flex;
  gap: 2px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: var(--surface2);
  border-radius: 8px;
  padding: 2px;
  flex: 1;
}
.sm-chart-range-group::-webkit-scrollbar { display: none; }

/* Individual range button */
.sm-chart-range-btn {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.3px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: var(--text3);
  transition: all 0.15s;
  min-height: 30px;
  white-space: nowrap;
  flex-shrink: 0;
  touch-action: manipulation;
  font-family: 'Space Mono', monospace;
}
.sm-chart-range-btn[data-active="true"] {
  font-weight: 600;
  background: var(--accent);
  color: white;
}

/* Refresh button */
.sm-chart-refresh-btn {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: var(--text3);
  transition: all 0.15s;
  opacity: 0.6;
  min-height: 30px;
  flex-shrink: 0;
  touch-action: manipulation;
}
.sm-chart-refresh-btn:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

/* Chart type toggle group */
.sm-chart-type-group {
  display: flex;
  gap: 0;
  background: var(--surface2);
  border-radius: 8px;
  padding: 2px;
  flex-shrink: 0;
}

/* Chart type button */
.sm-chart-type-btn {
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.5px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: var(--text3);
  transition: all 0.15s;
  min-height: 30px;
  touch-action: manipulation;
  font-family: inherit;
}
.sm-chart-type-btn[data-active="true"] {
  font-weight: 600;
  background: var(--surface);
  color: var(--text);
}

/* Indicator controls area */
.sm-chart-indicator-bar {
  border-top: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  padding: 6px 28px 0;
}

/* Indicator toggle button */
.sm-chart-indicator-btn {
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.3px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: var(--surface2);
  color: var(--text3);
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 28px;
  touch-action: manipulation;
}
.sm-chart-indicator-btn[data-active="true"] {
  font-weight: 600;
  background: color-mix(in srgb, var(--indicator-color, var(--accent)) 10%, transparent);
  color: var(--indicator-color, var(--accent));
}

/* Indicator color swatch line */
.sm-chart-indicator-swatch {
  width: 8px;
  height: 2px;
  border-radius: 1px;
  background: var(--text3);
  transition: all 0.15s;
  opacity: 0.3;
}
.sm-chart-indicator-btn[data-active="true"] .sm-chart-indicator-swatch {
  background: var(--indicator-color, var(--accent));
  opacity: 1;
}

/* Toggle section wrapper */
.sm-chart-toggle-section {
  margin-bottom: 4px;
}

/* Toggle section header button */
.sm-chart-toggle-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  touch-action: manipulation;
}

/* Toggle section chevron */
.sm-chart-toggle-chevron {
  font-size: 8px;
  transition: transform 0.2s;
  opacity: 0.5;
}
.sm-chart-toggle-chevron[data-open="true"] {
  transform: rotate(90deg);
}

/* Toggle section active count badge */
.sm-chart-toggle-count {
  font-size: 9px;
  font-family: 'Space Mono', monospace;
  padding: 1px 5px;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
  border-radius: 4px;
  font-weight: 600;
}

/* Toggle section content */
.sm-chart-toggle-content {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 6px;
}

/* Vertical separator between indicator groups */
.sm-chart-separator {
  width: 1px;
  height: 20px;
  background: var(--border);
  margin: 0 4px;
}

/* Loading state */
.sm-chart-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text3);
}

/* Error state */
.sm-chart-error {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--coral);
}

/* Sub-panel wrapper (position: relative for overlay labels) */
.sm-chart-panel-wrap {
  position: relative;
}

/* Overlay label for sub-panels (RSI, MACD, ATR, Comparison) */
.sm-chart-overlay-label {
  position: absolute;
  top: 2px;
  left: 65px;
  font-size: 9px;
  color: var(--text3);
  z-index: 1;
}

/* Overlay label with flex layout (comparison panel) */
.sm-chart-overlay-label-flex {
  position: absolute;
  top: 2px;
  left: 65px;
  font-size: 9px;
  color: var(--text3);
  z-index: 1;
  display: flex;
  gap: 8px;
}

/* OHLC tooltip container */
.sm-chart-ohlc-tooltip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  font-size: 12px;
}

/* Tooltip date header */
.sm-chart-tooltip-date {
  color: var(--text3);
  margin-bottom: 4px;
}

/* Tooltip OHLC grid */
.sm-chart-tooltip-grid {
  display: grid;
  grid-template-columns: auto auto;
  gap: 2px 12px;
}

/* Range high/low bar section */
.sm-chart-range-bar {
  margin: 12px 28px 0;
  padding: 12px 16px;
  background: var(--surface2);
  border-radius: 8px;
  font-size: 11px;
}

/* Range bar label */
.sm-chart-range-label {
  color: var(--text3);
  margin-bottom: 6px;
  font-weight: 500;
}

/* Range bar track */
.sm-chart-range-track {
  flex: 1;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  position: relative;
}

/* Range bar position dot (needs inline style for dynamic left%) */
.sm-chart-range-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid var(--surface);
}

/* Metrics/Correlation/VolumeProfile panel */
.sm-chart-info-panel {
  margin: 12px 28px 0;
  padding: 12px 14px;
  background: var(--surface2);
  border-radius: 8px;
  font-size: 11px;
}

/* Info panel title */
.sm-chart-info-title {
  color: var(--text);
  margin-bottom: 12px;
  font-weight: 600;
}

/* Metrics grid (auto-fit) */
.sm-chart-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

/* Individual metric card */
.sm-chart-metric-card {
  padding: 8px 12px;
  background: var(--surface);
  border-radius: 6px;
}

/* Metric card label */
.sm-chart-metric-label {
  color: var(--text3);
  font-size: 9px;
  margin-bottom: 2px;
}

/* Metric card value */
.sm-chart-metric-value {
  font-weight: 600;
  font-size: 14px;
}

/* Metric card sublabel */
.sm-chart-metric-sub {
  color: var(--text3);
  font-size: 9px;
}

/* Correlation chips flex wrap */
.sm-chart-corr-chips {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Single correlation chip */
.sm-chart-corr-chip {
  padding: 8px 12px;
  background: var(--surface);
  border-radius: 6px;
  min-width: 80px;
}

/* Correlation chip label */
.sm-chart-corr-label {
  font-size: 10px;
  margin-bottom: 2px;
}

/* Correlation chip value */
.sm-chart-corr-value {
  font-weight: 600;
  font-size: 16px;
}

/* Info panel footnote */
.sm-chart-footnote {
  color: var(--text3);
  font-size: 9px;
  margin-top: 8px;
}

/* Volume profile row */
.sm-chart-vol-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Volume profile price label */
.sm-chart-vol-price {
  width: 60px;
  color: var(--text);
  font-weight: 500;
}

/* Volume profile bar track */
.sm-chart-vol-track {
  flex: 1;
  height: 12px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

/* Volume profile percent label */
.sm-chart-vol-pct {
  width: 40px;
  color: var(--text3);
  text-align: right;
}

/* Chart Guide header (clickable toggle) */
.sm-chart-guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 24px;
  border-bottom: 1px solid var(--border);
}

/* Chart Guide toggle icon */
.sm-chart-guide-icon {
  color: var(--text3);
  font-size: 18px;
}

/* Chart Guide content grid */
.sm-chart-guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  padding: 24px;
  font-size: 11px;
  line-height: 1.8;
  color: var(--text3);
}

/* Guide section title */
.sm-chart-guide-section-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

/* Guide section title with margin-bottom (first in column) */
.sm-chart-guide-section-title-mb {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

/* Guide indicator entry title row */
.sm-chart-guide-entry-title {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Guide indicator entry title (no flex, text only) */
.sm-chart-guide-entry-title-text {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

/* Guide indicator color swatch */
.sm-chart-guide-swatch {
  width: 12px;
  height: 2px;
  border-radius: 1px;
}

/* Guide entries grid */
.sm-chart-guide-entries {
  display: grid;
  gap: 24px;
}

/* Guide entries grid (narrower gap) */
.sm-chart-guide-entries-sm {
  display: grid;
  gap: 16px;
}

/* Guide compare intro text */
.sm-chart-guide-intro {
  color: var(--text3);
  margin-bottom: 4px;
}

/* Volume profile column container */
.sm-chart-vol-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 25. UTILITY CLASSES — Extended
   Additional utility classes for inline style elimination.
   ═══════════════════════════════════════════════════════════════════════════ */
.sm-m-0 { margin: 0; }
.sm-p-12 { padding: 12px; }
.sm-p-12-16 { padding: 12px 16px; }
.sm-p-0-24-16 { padding: 0 24px 16px; }
.sm-p-0-12-12 { padding: 0 12px 12px; }
.sm-pl-16 { padding-left: 16px; }
.sm-pt-12 { padding: 12px 0 0; }
.sm-justify-end { justify-content: flex-end; }
.sm-items-start { align-items: flex-start; }
.sm-items-center { align-items: center; }
.sm-italic { font-style: italic; }
.sm-capitalize { text-transform: capitalize; }
.sm-uppercase { text-transform: uppercase; }
.sm-line-through { text-decoration: line-through; }
.sm-lh-15 { line-height: 1.5; }
.sm-lh-18 { line-height: 1.8; }
.sm-list-none { list-style: none; }
.sm-opacity-70 { opacity: 0.7; }
.sm-opacity-50 { opacity: 0.5; }
.sm-opacity-60 { opacity: 0.6; }
.sm-nowrap { white-space: nowrap; }
.sm-pre-line { white-space: pre-line; }
.sm-min-w-80 { min-width: 80px; }
.sm-min-w-90 { min-width: 90px; }
.sm-min-w-100 { min-width: 100px; }
.sm-inline-block { display: inline-block; }
.sm-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
.sm-pointer { cursor: pointer; }
.sm-cursor-default { cursor: default; }
.sm-rounded-4 { border-radius: 4px; }
.sm-rounded-6 { border-radius: 6px; }
.sm-rounded-12 { border-radius: 12px; }
.sm-rounded-full { border-radius: 9999px; }
.sm-text-ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sm-ls-05 { letter-spacing: 0.5px; }
.sm-ls-08 { letter-spacing: 0.8px; }
.sm-ls-neg05 { letter-spacing: -0.5px; }
.sm-ls-005em { letter-spacing: 0.05em; }
.sm-ls-008em { letter-spacing: 0.08em; }
.sm-ls-01em { letter-spacing: 0.1em; }
.sm-ls-1 { letter-spacing: 1px; }
.sm-opacity-25 { opacity: 0.25; }
.sm-opacity-30 { opacity: 0.3; }
.sm-opacity-40 { opacity: 0.4; }
.sm-opacity-80 { opacity: 0.8; }
.sm-opacity-90 { opacity: 0.9; }
.sm-text-8 { font-size: 8px; }
.sm-text-9 { font-size: 9px; }
.sm-text-10 { font-size: 10px; }
.sm-lh-14 { line-height: 1.4; }
.sm-lh-20 { line-height: 2; }
.sm-lh-22 { line-height: 2.2; }
.sm-mb-4 { margin-bottom: 4px; }
.sm-mb-6 { margin-bottom: 6px; }
.sm-ml-4 { margin-left: 4px; }
.sm-ml-12 { margin-left: 12px; }
.sm-mt-2 { margin-top: 2px; }
.sm-mt-4 { margin-top: 4px; }
.sm-mt-10 { margin-top: 10px; }
.sm-pt-8 { padding-top: 8px; }
.sm-gap-1 { gap: 1px; }
.sm-gap-20 { gap: 20px; }
.sm-gap-32 { gap: 32px; }
.sm-text-left { text-align: left; }
.sm-block { display: block; }
.sm-flex-1 { flex: 1; }
.sm-relative { position: relative; }
.sm-bg-transparent { background: transparent; }
.sm-border-none { border: none; }
.sm-text-none { text-transform: none; }
.sm-ls-0 { letter-spacing: 0; }
.sm-min-w-0 { min-width: 0; }
.sm-p-3-12 { padding: 3px 12px; }
.sm-p-4-10 { padding: 4px 10px; }
.sm-p-4-12 { padding: 4px 12px; }
.sm-p-5-12 { padding: 5px 12px; }
.sm-p-5-14 { padding: 5px 14px; }
.sm-p-10-16 { padding: 10px 16px; }
.sm-p-1-5 { padding: 1px 5px; }
.sm-p-1-6 { padding: 1px 6px; }
.sm-p-2-6 { padding: 2px 6px; }
.sm-p-3-8 { padding: 3px 8px; }
.sm-rounded-3 { border-radius: 3px; }
.sm-rounded-5 { border-radius: 5px; }

/* Edgar methodology — small colored dot */
.sm-ed-color-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--dot-color, var(--text3));
}
.sm-ed-color-dot-sm {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dot-color, var(--text3));
}

/* Edgar methodology — vertical line */
.sm-ed-vline-short { width: 1px; height: 6px; background: color-mix(in srgb, var(--text3) 25%, transparent); }
.sm-ed-vline-med { width: 1px; height: 8px; background: color-mix(in srgb, var(--text3) 25%, transparent); }

/* Edgar methodology — accent connector */
.sm-ed-connector { width: 2px; height: 10px; background: var(--sky); }

/* Edgar diff preview — file path action badge */
.sm-ed-patch-badge {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--patch-bg, rgba(130,200,130,0.1));
  color: var(--patch-color, rgba(130,200,130,0.6));
  border: 1px solid var(--patch-border, rgba(130,200,130,0.15));
}

/* Edgar diff preview — file path */
.sm-ed-patch-file {
  font-size: 10px;
  font-family: var(--font-mono, monospace);
  font-weight: 500;
  color: var(--file-color, var(--text2));
}

/* Edgar methodology — patch preview header label */
/* Error boundary */
.sm-error-boundary {
  padding: 48px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--coral) 10%, transparent) 0%, color-mix(in srgb, var(--coral) 5%, transparent) 100%);
  border: 1px solid color-mix(in srgb, var(--coral) 30%, transparent);
  border-radius: 16px;
  text-align: center;
  margin: 24px;
}
.sm-error-boundary h2 {
  color: var(--coral);
  font-family: Outfit, sans-serif;
}
.sm-error-boundary p {
  color: var(--text2);
  font-family: Outfit, sans-serif;
}
.sm-error-boundary .sm-error-detail {
  font-size: 14px;
  font-family: 'Space Mono', monospace;
}
.sm-error-boundary .sm-error-reload {
  padding: 12px 24px;
  background: var(--cyan);
  color: var(--bg);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-family: Outfit, sans-serif;
}

.sm-ed-patch-header-label {
  font-size: 11px;
  color: rgba(234,179,8,0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Edgar methodology — patch preview footer warning */
.sm-ed-patch-footer-warning {
  font-size: 9px;
  color: rgba(234,179,8,0.5);
  letter-spacing: 0.05em;
}

/* Edgar methodology — status message */
.sm-ed-status-msg {
  font-size: 10px;
  margin-left: 4px;
  color: var(--msg-color, var(--text3));
}

/* Edgar methodology — applying spinner dot */
.sm-ed-pulse-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(234,179,8,0.5);
  animation: pulse 2s infinite;
}

/* Edgar methodology — applying spinner text */
.sm-ed-spinner-text {
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Edgar filter pill count */
.sm-ed-pill-count {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
}

/* Edgar year section — divider line */
.sm-ed-year-divider {
  flex: 1;
  height: 1px;
  background: color-mix(in srgb, var(--border) 50%, transparent);
}

/* Edgar show-more/collapse hidden button */
.sm-ed-hidden-toggle {
  display: block;
  padding: 4px 12px;
  margin: 2px 0;
  font-size: 9px;
  background: transparent;
  border: none;
  opacity: 0.25;
  text-align: left;
}

/* Edgar no-filings message */
.sm-ed-empty-msg {
  font-size: 13px;
  padding: 24px 0;
  line-height: 1.6;
}

/* Edgar cross-ref info note */
.sm-ed-crossref-note {
  font-size: 9px;
  opacity: 0.4;
  padding: 0 4px 8px;
  font-family: 'Space Mono', monospace;
  line-height: 1.6;
}

/* Edgar info card title */
.sm-ed-card-title {
  font-size: 10px;
  margin-bottom: 4px;
}

/* Edgar info card body text */
.sm-ed-card-body {
  font-size: 9.5px;
  line-height: 1.7;
}

/* Edgar method info text */
.sm-ed-method-info {
  font-size: 10px;
  line-height: 1.8;
}

/* Edgar method detail text */
.sm-ed-method-detail {
  font-size: 10px;
  line-height: 2;
}

/* Edgar method small flowbox */
.sm-ed-flowbox-sm {
  padding: 5px 12px;
  font-size: 10px;
}

/* Edgar method persisted data text */
.sm-ed-persisted-text {
  font-size: 10px;
  line-height: 2.2;
}

/* Edgar diff border top (amber-tinted) */
.sm-ed-border-amber {
  border-top: 1px solid rgba(234,179,8,0.1);
}
.sm-ed-border-amber-bottom {
  border-bottom: 1px solid rgba(234,179,8,0.1);
}

/* Edgar section — margin top for methodology header */
.sm-mb-0 { margin-bottom: 0; }

/* SVG spin animation for loading states - applied via data attribute */
[data-spin="true"] { animation: spin 1s linear infinite; }
[data-spin-fast="true"] { animation: spin 0.8s linear infinite; }

/* Edgar chevron rotation via data attribute */
.sm-ed-chevron {
  transition: transform 0.2s;
}
.sm-ed-chevron[data-expanded="true"] {
  transform: rotate(90deg);
}
.sm-ed-chevron[data-expanded="false"] {
  transform: rotate(0deg);
}

/* Stroke-dasharray transition for SVG arcs */
.sm-ed-arc-transition { transition: stroke-dasharray 0.4s ease; }

/* Fixed width utilities */
.sm-w-48 { width: 48px; }

/* Padding utilities */
.sm-p-8-12-4 { padding: 8px 12px 4px; }

/* Letter-spacing — wide small (1.5px) */
.sm-ls-wide-sm { letter-spacing: 1.5px; }

/* Spin animation utility class */
.sm-spin-fast { animation: spin 0.8s linear infinite; }

/* DB tooltip header */
.sm-ed-db-tooltip-header {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

/* DB tooltip field label */
.sm-ed-db-field-label {
  min-width: 70px;
  display: inline-block;
}

/* DB tooltip field value — uses --field-color CSS variable */
.sm-ed-db-field-value {
  color: var(--field-color, var(--text3));
  font-weight: 600;
}

/* DB tooltip category value — uses --field-color CSS variable */
.sm-ed-db-category-value {
  color: var(--field-color, var(--text3));
}

/* DB status dot — uses --dot-color CSS variable */
.sm-ed-db-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dot-color, var(--text3));
}

/* Sources verdict badge (expanded) — uses --verdict-color and --verdict-bg */
.sm-ed-verdict-badge-expanded {
  margin: 12px 0 0 7px;
  display: inline-flex;
  gap: 6px;
  font-size: 9px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--verdict-bg, rgba(255,255,255,0.04));
  color: var(--verdict-color, var(--text2));
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Sources verdict explanation text */
.sm-ed-verdict-explanation {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.7;
  font-size: 10px;
}

/* Action button variants — AI and recheck */
.sm-ed-action-btn-ai,
.sm-ed-action-btn-recheck {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: var(--ed-btn-border, 1px solid var(--border));
  cursor: var(--ed-btn-cursor, pointer);
  opacity: var(--ed-btn-opacity, 1);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 26. INVESTMENT TAB (sm-inv-*)
   Shared Investment tab component classes — scorecard, drivers, moat, risks,
   perspectives, position sizing, archive.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Toggle expand/collapse icon */
.sm-inv-toggle-icon {
  font-size: 18px;
  color: var(--text3);
}

/* Verdict badge — uses --badge-bg and --badge-color CSS vars */
.sm-inv-verdict-badge {
  background: var(--badge-bg);
  color: var(--bg);
  padding: 8px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 18px;
}

/* Ticker badge — small mint-tinted pill */
.sm-inv-ticker-badge {
  background: rgba(0,212,170,0.15);
  color: var(--mint);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

/* Scorecard grid — auto-fit responsive */
.sm-inv-scorecard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

/* Scorecard item — individual card */
.sm-inv-scorecard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface2);
  border-radius: 8px;
  padding: 12px;
}

/* Scorecard rating — large mono number, uses --rating-color */
.sm-inv-scorecard-rating {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 20px;
  color: var(--rating-color);
}

/* What's New highlight box — mint-tinted */
.sm-inv-whats-new {
  background: rgba(126,231,135,0.05);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(126,231,135,0.2);
  margin-bottom: 16px;
}

/* What's New bullet list */
.sm-inv-whats-new-list {
  margin: 0;
  padding-left: 16px;
  color: var(--text2);
  font-size: 13px;
  line-height: 1.8;
}

/* Bottom line quote — italic accent */
.sm-inv-bottom-line {
  font-style: italic;
  color: var(--cyan);
  padding: 12px;
  background: var(--surface2);
  border-radius: 8px;
}

/* Growth driver card — left border uses --driver-color */
.sm-inv-driver-card {
  background: var(--surface2);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid var(--driver-color);
}

/* Impact badge — tinted background, uses --impact-color */
.sm-inv-impact-badge {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--impact-color);
  font-weight: 600;
  background: color-mix(in srgb, var(--impact-color) 15%, transparent);
}

/* Moat source/threat card */
.sm-inv-moat-card {
  background: var(--surface2);
  padding: 12px;
  border-radius: 8px;
}

/* Moat strength/risk label */
.sm-inv-moat-strength {
  font-size: 11px;
  color: var(--strength-color);
}

/* Risk card — severity border uses --severity-color */
.sm-inv-risk-card {
  background: var(--surface2);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid var(--severity-color);
}

/* Severity/likelihood pill badges */
.sm-inv-severity-badge {
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 4px;
  background: var(--surface);
  color: var(--text3);
}

/* Perspective card — top border uses --perspective-color */
.sm-inv-perspective-card {
  background: var(--surface2);
  padding: 16px;
  border-radius: 8px;
  border-top: 3px solid var(--perspective-color);
}

/* Assessment badge — tinted inline */
.sm-inv-assessment-badge {
  font-size: 12px;
  color: var(--assess-color);
  font-weight: 600;
  margin-bottom: 12px;
  padding: 4px 8px;
  background: color-mix(in srgb, var(--assess-color) 10%, transparent);
  border-radius: 4px;
  display: inline-block;
}

/* Recommendation box — mint-tinted */
.sm-inv-recommendation {
  font-size: 12px;
  color: var(--mint);
  padding: 8px;
  background: rgba(0,212,170,0.1);
  border-radius: 4px;
}

/* Archive verdict badge — uses data-sentiment for colors */
.sm-inv-archive-verdict {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.sm-inv-archive-verdict[data-sentiment="positive"] {
  background: rgba(0,212,170,0.15);
  color: var(--mint);
}
.sm-inv-archive-verdict[data-sentiment="constructive"] {
  background: rgba(100,149,237,0.15);
  color: var(--sky);
}
.sm-inv-archive-verdict[data-sentiment="neutral"] {
  background: rgba(234,179,8,0.15);
  color: var(--gold);
}

/* Archive expanded detail area */
.sm-inv-archive-detail {
  padding: 0 12px 12px;
  border-top: 1px solid var(--surface);
}

/* Archive key developments list */
.sm-inv-archive-list {
  margin: 8px 0;
  padding-left: 16px;
  font-size: 12px;
  color: var(--text3);
}

/* Panel with left-border accent — uses --panel-border-color */
.sm-inv-panel-bordered {
  border-left: 4px solid var(--panel-border-color);
  margin-bottom: 16px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 27. TIMELINE TAB ADDITIONS (sm-tl-*)
   Additional classes for Timeline tab inline style elimination.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Upcoming event card */
.sm-tl-upcoming-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--surface2);
  border-radius: 12px;
}

/* Date display — uses --date-color CSS var */
.sm-tl-upcoming-date {
  font-family: 'Space Mono', monospace;
  color: var(--date-color);
}

/* Press release card */
.sm-tl-pr-card {
  padding: 12px 16px;
  background: var(--surface2);
  border-radius: 12px;
}

/* PR category label — uses --cat-color */
.sm-tl-pr-category {
  font-size: 11px;
  color: var(--cat-color);
}

/* PR title */
.sm-tl-pr-title {
  font-weight: 500;
  color: var(--text);
  font-size: 14px;
}

/* Filing type badge — pill with --type-bg and --type-text */
.sm-tl-filing-type-badge {
  background: var(--type-bg, rgba(100,100,100,0.2));
  color: var(--type-text, var(--text2));
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
}

/* Filing link cell */
.sm-tl-filing-link {
  font-size: 13px;
  text-align: right;
}

/* Filing date cell */
.sm-tl-filing-date {
  font-size: 13px;
  color: var(--text2);
  white-space: nowrap;
}

/* SEC footer area */
.sm-tl-footer {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 12px;
  padding-top: 12px;
}

/* Footer metadata value */
.sm-tl-footer-val {
  color: var(--text2);
  margin-left: 6px;
  font-family: 'Space Mono', monospace;
}

/* Last PR indicator */
.sm-tl-last-pr {
  font-size: 11px;
  color: var(--text3);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Impact label — uses data-impact attribute for color */
.sm-tl-impact-label {
  font-size: 11px;
  font-weight: 600;
  text-align: right;
}
.sm-tl-impact-label[data-impact="Positive"] { color: var(--mint); }
.sm-tl-impact-label[data-impact="Negative"] { color: var(--coral); }
.sm-tl-impact-label[data-impact="Neutral"] { color: var(--text3); }

/* Expand chevron with rotation */
.sm-tl-chevron {
  font-size: 12px;
  color: var(--text3);
  text-align: center;
  transition: transform 0.2s;
}
.sm-tl-chevron[data-expanded="true"] {
  transform: rotate(180deg);
}

/* Summary box in expanded detail */
.sm-tl-summary-box {
  padding: 12px;
  background: var(--surface2);
  border-radius: 12px;
  font-style: italic;
  color: var(--text3);
  font-size: 12px;
  line-height: 1.6;
}

/* Detail bullet list */
.sm-tl-detail-list {
  margin: 12px 0 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Detail list item */
.sm-tl-detail-item {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text2);
  line-height: 1.6;
}

/* Accent-colored bullet */
.sm-tl-detail-bullet {
  color: var(--accent);
  font-weight: bold;
}

/* Before/after change indicator */
.sm-tl-change-indicator {
  margin-top: 12px;
  font-size: 13px;
  padding: 8px 12px;
  background: var(--surface2);
  border-radius: 8px;
}

/* Explain header */
.sm-tl-explain-header {
  color: var(--cyan);
  font-weight: 500;
  margin-bottom: 8px;
}

/* Explain list */
.sm-tl-explain-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text2);
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Topic filter card wrapper */
.sm-tl-topic-filter-wrap {
  padding: 16px;
}

/* Impact badge color */
.sm-tl-impact-badge {
  font-size: 13px;
  font-weight: 600;
}
.sm-tl-impact-badge[data-impact="Positive"] { color: var(--mint); }
.sm-tl-impact-badge[data-impact="Negative"] { color: var(--coral); }
.sm-tl-impact-badge[data-impact="Neutral"],
.sm-tl-impact-badge:not([data-impact]) { color: var(--text3); }

/* Source label in detail */
.sm-tl-source-val {
  font-size: 13px;
  color: var(--cyan);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 28. WALL STREET TAB ADDITIONS (sm-ws-*)
   Additional classes for Wall Street tab inline style elimination.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Section label without bottom margin */
.sm-ws-section-flush { margin-bottom: 0; }

/* Metrics wrapper padding */
.sm-ws-metrics-wrap { padding: 0 24px 16px; }

/* Notes wrapper padding */
.sm-ws-notes-wrap { padding: 0 24px 16px; }

/* Date cell in report row */
.sm-ws-date-cell { min-width: 90px; }

/* Firm header border when expanded — driven by data-open */
.sm-ws-firm-header[data-open="true"] {
  border-bottom: 1px solid var(--border);
}
.sm-ws-firm-header[data-open="false"] {
  border-bottom: none;
}

/* Report with expandable cursor */
.sm-ws-report[data-expandable="true"] { cursor: pointer; }
.sm-ws-report[data-expandable="false"] { cursor: default; }

/* Block header with conditional spacing */
.sm-ws-block-header-spaced {
  margin-bottom: 4px;
}
.sm-ws-block-header-spaced:not(:first-child) {
  margin-top: 12px;
}

/* Dynamic grid table — uses --ws-cols CSS var */
.sm-ws-dynamic-grid {
  display: grid;
  grid-template-columns: var(--ws-cols);
}

/* KPI value with dynamic color — uses --kpi-color */
.sm-ws-kpi-dynamic {
  color: var(--kpi-color);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 29. STOCK MODEL COMPONENT CLASSES
   Classes for Overview, Capital, and other stock-specific tab components.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Data freshness badge (hero section) */
.sm-data-freshness {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(34,211,238,0.1);
  border: 1px solid rgba(34,211,238,0.3);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  color: #22d3ee;
}
.sm-data-freshness-sep {
  color: rgba(34,211,238,0.5);
}

/* Price refresh button */
.sm-refresh-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  opacity: 0.6;
}
.sm-refresh-btn[data-loading="true"] {
  cursor: wait;
  opacity: 0.5;
}

/* Bull/bear case list item */
.sm-bull-bear-item {
  display: flex;
  gap: 8px;
  padding: 5px 0;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.5;
}

/* Bull/bear indicator prefix */
.sm-bull-prefix { color: var(--mint); flex-shrink: 0; }
.sm-bear-prefix { color: var(--coral); flex-shrink: 0; }

/* Section label with custom font-size for bull/bear headers */
.sm-section-label-sm {
  font-size: 13px;
}

/* KPI row — flex between with subtle border */
.sm-kpi-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
}

/* KPI value — mono, small, uses --kpi-color */
.sm-kpi-mono-val {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--kpi-color);
  font-weight: 600;
}

/* Model KPI cell with value and label */
.sm-model-kpi-value {
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--kpi-color);
}
.sm-model-kpi-label {
  font-size: 10px;
  color: var(--text3);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 4px;
}

/* Capital gradient footer (mint → violet) */
.sm-cap-gradient-footer {
  padding: 16px 24px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--mint) 8%, var(--surface)), color-mix(in srgb, var(--violet) 8%, var(--surface)));
  border-top: 1px solid var(--border);
}

/* Capital note box */
.sm-cap-note-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
  padding: 12px 24px;
  font-size: 11px;
  color: var(--text3);
}

/* Multi-class structure label */
.sm-cap-structure-label {
  font-size: 11px;
  color: var(--mint);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.sm-cap-structure-desc {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.5;
  margin-top: 4px;
}

/* Chart toggle button group */
.sm-chart-toggle-group {
  display: flex;
  gap: 6px;
}

/* Updated timestamp */
.sm-updated-ts {
  font-size: 10px;
  color: var(--text3);
  margin-top: 4px;
}

/* Footer value styling */
.sm-tl-footer-ticker {
  color: var(--cyan);
  margin-left: 6px;
  font-weight: 600;
}

/* Footer auto-margin link */
.sm-tl-footer-link {
  color: var(--sky);
  margin-left: auto;
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 30. AI AGENTS TAB (sm-ai-*)
   Classes for the SharedAIAgentsTab component.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Agent runner container */
.sm-ai-runner {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

/* Agent header */
.sm-ai-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

/* Agent status indicator */
.sm-ai-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

/* Agent body */
.sm-ai-body {
  padding: 16px 20px;
}

/* Diff panel */
.sm-ai-diff-panel {
  background: var(--surface2);
  border-radius: 8px;
  padding: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
}

/* Streaming output container */
.sm-ai-stream {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text2);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 31. RESPONSIVE ADDITIONS
   Responsive breakpoints for new classes.
   ═══════════════════════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  .sm-inv-scorecard-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .sm-tl-footer { flex-direction: column; gap: 8px; }
  .sm-tl-upcoming-card { flex-direction: column; gap: 8px; align-items: flex-start; }
  .sm-ws-metrics-wrap { padding: 0 16px 12px; }
  .sm-ws-notes-wrap { padding: 0 16px 12px; }
}

@media (max-width: 480px) {
  .sm-inv-verdict-badge { font-size: 14px; padding: 6px 16px; }
  .sm-inv-scorecard-grid { grid-template-columns: 1fr; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 32. LIVE PRICE & UPDATE LEGEND
   Classes for LivePrice refresh button and UpdateLegend toggle.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Price change display */
.sm-price-change {
  font-size: 12px;
  font-family: 'Space Mono', monospace;
  margin-top: 4px;
}
.sm-price-change[data-direction="up"] { color: var(--mint); }
.sm-price-change[data-direction="down"] { color: var(--coral); }

/* Price change timestamp */
.sm-price-change-ts {
  color: var(--text3);
  margin-left: 8px;
  font-size: 10px;
}

/* Price error */
.sm-price-error {
  font-size: 11px;
  color: var(--coral);
  margin-top: 4px;
}

/* Update legend sources label */
.sm-legend-label {
  font-weight: 500;
  color: var(--text3);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Update legend toggle button */
.sm-legend-toggle {
  margin-left: auto;
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 500;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  letter-spacing: 0.3px;
  color: var(--text3);
}
.sm-legend-toggle[data-active="true"] {
  color: var(--text);
  border-color: rgba(255,255,255,0.15);
}

/* SVG refresh icon spin */
.sm-refresh-icon {
  color: var(--text3);
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.sm-refresh-icon[data-loading="true"] {
  animation: spin 1s linear infinite;
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 33. STOCK-SPECIFIC COMPONENT CLASSES

   Reusable patterns extracted from inline styles in ASTS/BMNR/CRCL .tsx files.
   These classes replace the highest-frequency inline style patterns:
   table headers, data grid rows, badges, filter pills, KPI values,
   key-value pair rows, bullet items, legend items, accent-bar panels,
   and chart containers.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Table header cell (micro-label in grid header rows) ──────────────── */
.sm-th {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
}
.sm-th[data-align="right"] { text-align: right; }
.sm-th[data-align="center"] { text-align: center; }

/* ── Generic grid header row ──────────────────────────────────────────── */
.sm-grid-header {
  display: grid;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
}

/* ── Generic grid data row (hoverable, bottom-bordered) ───────────────── */
.sm-grid-row {
  display: grid;
  padding: 12px 24px;
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-grid-row:hover { background: var(--surface2); }
.sm-grid-row:last-child { border-bottom: none; }
.sm-grid-row[data-highlight="true"] {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

/* ── Padded grid data row (16px vertical padding) ─────────────────────── */
.sm-grid-row-lg {
  display: grid;
  padding: 16px 24px;
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-grid-row-lg:hover { background: var(--surface2); }
.sm-grid-row-lg:last-child { border-bottom: none; }

/* ── Dynamic badge (uses --badge-color CSS var for color) ─────────────── */
/* Already have .sm-badge — this adds .sm-badge-dynamic for inline color */
.sm-badge-dynamic {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  color: var(--badge-color, var(--text3));
  background: color-mix(in srgb, var(--badge-color, var(--text3)) 10%, transparent);
}
.sm-badge-dynamic[data-bold="true"] {
  font-weight: 700;
  min-width: 60px;
  text-align: center;
  background: color-mix(in srgb, var(--badge-color, var(--text3)) 12%, transparent);
}

/* ── Filter pill button (partner/category/competitor filters) ─────────── */
.sm-filter-pill {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Outfit', sans-serif;
  background: color-mix(in srgb, var(--border) 60%, transparent);
  color: var(--text3);
}
.sm-filter-pill[data-active="true"] {
  background: color-mix(in srgb, var(--pill-accent, var(--accent)) 15%, transparent);
  color: var(--pill-accent, var(--accent));
}

/* ── Pill toggle (chart type selector, scenario selector) ─────────────── */
.sm-pill-toggle {
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text3);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
}
.sm-pill-toggle[data-active="true"] {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
}

/* ── KPI hero value (large monospace number with dynamic color) ────────── */
.sm-kpi-hero {
  font-family: 'Space Mono', monospace;
  font-size: 24px;
  font-weight: 700;
  color: var(--kpi-color, var(--text));
  margin: 8px 0 4px;
}

/* ── KPI value medium (20px variant) ──────────────────────────────────── */
.sm-kpi-hero-md {
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--kpi-color, var(--text));
}

/* ── Key-value pair row (flex, space-between, light border) ───────────── */
.sm-kv-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
}
.sm-kv-row-lg {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
}

/* ── Monospace value with dynamic color (for kv-rows) ─────────────────── */
.sm-mono-val {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--val-color, var(--text));
}
.sm-mono-val[data-weight="600"] { font-weight: 600; }

/* ── Bull/bear case bullet item ───────────────────────────────────────── */
.sm-case-item {
  display: flex;
  gap: 8px;
  padding: 5px 0;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.5;
}
.sm-case-icon {
  flex-shrink: 0;
}

/* ── Accent-bar side panel (borderLeft colored bar) ───────────────────── */
.sm-accent-panel {
  background: var(--surface);
  padding: 24px;
  border-left: 3px solid var(--panel-accent, var(--accent));
}

/* ── Section title inside accent panel ────────────────────────────────── */
.sm-accent-panel-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--panel-accent, var(--accent));
  letter-spacing: -0.2px;
  margin-bottom: 16px;
}

/* ── Accent panel note (smaller callout box) ──────────────────────────── */
.sm-accent-note {
  background: var(--surface);
  padding: 24px;
  border-left: 3px solid var(--panel-accent, var(--accent));
}
.sm-accent-note-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--panel-accent, var(--accent));
  margin-bottom: 8px;
}
.sm-accent-note-text {
  font-size: 11px;
  color: var(--text2);
  line-height: 1.6;
}

/* ── Spectrum / status badge (letter-spacing 0.5) ─────────────────────── */
.sm-status-badge {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 100px;
  display: inline-block;
  color: var(--badge-color, var(--sky));
  background: color-mix(in srgb, var(--badge-color, var(--sky)) 10%, transparent);
}

/* ── Chart legend row ─────────────────────────────────────────────────── */
.sm-chart-legend {
  display: flex;
  gap: 24px;
  margin-top: 12px;
  font-size: 11px;
  color: var(--text3);
  flex-wrap: wrap;
}
.sm-chart-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text3);
}

/* ── Legend color swatch (small rectangle) ─────────────────────────────── */
.sm-legend-swatch {
  width: 8px;
  height: 3px;
  border-radius: 1px;
  background: var(--swatch-color, var(--accent));
}
.sm-legend-swatch-sq {
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: var(--swatch-color, var(--accent));
}

/* ── Dot indicator (4px circle) ───────────────────────────────────────── */
.sm-dot-4 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--dot-color, var(--text3));
}
.sm-dot-5 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dot-color, var(--text3));
}

/* ── Data freshness timestamp badge ───────────────────────────────────── */
.sm-data-freshness {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(34,211,238,0.1);
  border: 1px solid rgba(34,211,238,0.3);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  color: #22d3ee;
}

/* ── Refresh button (transparent icon button) ─────────────────────────── */
.sm-refresh-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  opacity: 0.6;
}
.sm-refresh-btn:disabled {
  cursor: wait;
  opacity: 0.5;
}

/* ── Grid separator (1px gap) with explicit columns ───────────────────── */
.sm-grid-sep-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
}
.sm-grid-sep-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
}

/* ── Grid cell surface (inside 1px gap grids) ─────────────────────────── */
.sm-cell-surface {
  background: var(--surface);
  padding: 16px 24px;
}
.sm-cell-surface-center {
  background: var(--surface);
  padding: 16px 12px;
  text-align: center;
}

/* ── Info note bar (borderTop + padding, subtle background) ───────────── */
.sm-info-bar {
  padding: 12px 24px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text2);
}

/* ── Highlight summary bar (gradient background, accent) ──────────────── */
.sm-highlight-bar {
  padding: 16px 24px;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--bar-accent-1, var(--mint)) 8%, var(--surface)),
    color-mix(in srgb, var(--bar-accent-2, var(--violet)) 8%, var(--surface)));
  border-top: 1px solid var(--border);
}

/* ── Partner news event card ──────────────────────────────────────────── */
.sm-news-card {
  padding: 16px;
  background: var(--surface2);
  border-radius: 8px;
  cursor: pointer;
  border-left: 3px solid var(--news-accent, var(--sky));
  transition: all 0.2s;
}

/* ── News mini badge (inline tag) ─────────────────────────────────────── */
.sm-news-tag {
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  color: var(--tag-color, var(--cyan));
  background: color-mix(in srgb, var(--tag-color, var(--cyan)) 20%, transparent);
}

/* ── Empty state (centered message) ───────────────────────────────────── */
.sm-empty-state {
  padding: 24px;
  text-align: center;
  color: var(--text3);
}

/* ── Inline note box (rounded, muted background) ─────────────────────── */
.sm-inline-note {
  margin-top: 12px;
  padding: 12px 16px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  border-radius: 8px;
  font-size: 11px;
  color: var(--text3);
  line-height: 1.5;
}

/* ── Callout panel with border-left accent ────────────────────────────── */
.sm-callout {
  padding: 16px 24px;
  border-left: 3px solid var(--callout-color, var(--violet));
  border-bottom: 1px solid var(--border);
  font-size: 11px;
  color: var(--text3);
  line-height: 1.6;
}

/* ── Chart bar column (vertical bar chart built with divs) ────────────── */
.sm-bar-chart {
  padding: 24px 24px 0;
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.sm-bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.sm-bar-col-label {
  font-size: 11px;
  font-weight: 600;
  font-family: 'Space Mono', monospace;
  color: var(--text);
  margin-bottom: 4px;
}
.sm-bar-col-foot {
  font-size: 10px;
  color: var(--text3);
  margin-top: 4px;
  text-align: center;
}

/* ── Coverage progress row ────────────────────────────────────────────── */
.sm-coverage-row {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── KPI category label (below count in catalyst cards) ───────────────── */
.sm-kpi-category {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 4px;
  color: var(--kpi-color, var(--text3));
}

/* ── Overflow auto wrapper (for tables) ───────────────────────────────── */
.sm-overflow-x {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* ── Border-left accent on spectrum/filing items ──────────────────────── */
.sm-border-l-accent {
  border-left: 3px solid var(--panel-accent, var(--accent));
  transition: background 0.15s;
}

/* ── Spectrum detail grid (4-col repeat) ──────────────────────────────── */
.sm-detail-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

/* ── Detail field label ───────────────────────────────────────────────── */
.sm-detail-label {
  font-size: 10px;
  color: var(--text3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.sm-detail-value {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--text2);
  margin-top: 2px;
}

/* ── Note panel (background + rounded + fontSize 11) ──────────────────── */
.sm-note-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
  padding: 12px 24px;
  font-size: 11px;
  color: var(--text3);
}

/* ── SBC stat card ────────────────────────────────────────────────────── */
.sm-stat-card {
  background: var(--surface2);
  padding: 12px;
  border-radius: 12px;
}
.sm-stat-card-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--stat-color, var(--accent));
}

/* ── Responsive overrides for § 33 classes ────────────────────────────── */
@media (max-width: 768px) {
  .sm-grid-header { padding: 10px 16px; }
  .sm-grid-row { padding: 10px 16px; }
  .sm-grid-row-lg { padding: 12px 16px; }
  .sm-th { font-size: 9px; letter-spacing: 0.5px; }
  .sm-kpi-hero { font-size: 20px; }
  .sm-kpi-hero-md { font-size: 16px; }
  .sm-accent-panel { padding: 16px; }
  .sm-cell-surface { padding: 12px 16px; }
  .sm-bar-chart { padding: 16px 16px 0; }
  .sm-callout { padding: 12px 16px; }
  .sm-detail-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .sm-grid-sep-2col { grid-template-columns: 1fr; }
  .sm-grid-sep-3col { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .sm-grid-header { padding: 8px 12px; }
  .sm-grid-row { padding: 8px 12px; }
  .sm-grid-row-lg { padding: 10px 12px; }
  .sm-kpi-hero { font-size: 18px; }
  .sm-kpi-hero-md { font-size: 14px; }
  .sm-accent-panel { padding: 12px; }
  .sm-filter-pill { font-size: 9px; padding: 3px 10px; }
  .sm-pill-toggle { font-size: 10px; padding: 3px 10px; }
  .sm-stat-card-value { font-size: 16px; }
}

/* ═══════════════════════════════════════════════════════════════════
   § 35. CRCL STOCK-SPECIFIC CLASSES
   ═══════════════════════════════════════════════════════════════════ */

/* Parameter preset button (6-color gradient buttons in model/MC tabs) */
.sm-param-btn {
  padding: 12px 4px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface2);
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: var(--text3);
}
.sm-param-btn[data-active="true"] {
  font-weight: 600;
  border-width: 2px;
}

/* Custom value input wrapper (violet-bordered) */
.sm-custom-input-wrap {
  display: flex;
  border-radius: 8px;
  border: 2px solid var(--violet);
  background: color-mix(in srgb, var(--violet) 15%, transparent);
  overflow: hidden;
}
.sm-custom-input-field {
  flex: 1;
  min-width: 0;
  padding: 8px 4px;
  border: none;
  background: transparent;
  color: var(--violet);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  outline: none;
}

/* 7-column parameter grid (6 presets + 1 custom) */
.sm-param-grid-7 {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

/* 6-column parameter grid (MC options) */
.sm-param-grid-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}

/* Section toggle header (collapsible panels in investment tab) */
.sm-section-toggle {
  padding: 24px;
  border-bottom: 1px solid var(--border);
}

/* Data freshness badge (hero area) */
.sm-data-freshness {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, var(--mint) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--mint) 30%, transparent);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  color: #34d399;
}

/* Tinted info box (assessment, moat, risk panels) - set --tint-color */
.sm-tinted-box {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--tint-color, var(--accent)) 20%, transparent);
  background: color-mix(in srgb, var(--tint-color, var(--accent)) 10%, transparent);
}

/* Tinted info box - no border variant */
.sm-tinted-box-nb {
  padding: 12px 16px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--tint-color, var(--accent)) 10%, transparent);
}

/* Surface2 rounded card (events, metrics) */
.sm-surface2-card {
  padding: 12px 16px;
  background: var(--surface2);
  border-radius: 12px;
}

/* Surface2 rounded card - padded variant */
.sm-surface2-card-lg {
  padding: 24px;
  background: var(--surface2);
  border-radius: 12px;
}

/* KPI separator grid (1px border grid) */
.sm-kpi-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 14px;
  overflow: hidden;
}

/* KPI separator grid - 3 col */
.sm-kpi-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 14px;
  overflow: hidden;
}

/* Perspective badge (pill on perspective cards) */
.sm-perspective-badge {
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  color: var(--bg);
}

/* Scenario preset button grid (6 columns) */
.sm-scenario-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

/* Year/sim toggle button */
.sm-toggle-btn {
  padding: 8px 16px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text3);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.sm-toggle-btn[data-active="true"] {
  border-color: var(--accent);
  background: var(--accent-dim);
  color: var(--accent);
  font-weight: 600;
}

/* MC run button */
.sm-run-btn {
  width: 100%;
  padding: 12px 16px;
  background: var(--accent);
  color: var(--bg1);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}

/* Table header row (MC percentile/risk tables) */
.sm-table-header {
  display: grid;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text3);
}

/* Table data row (MC percentile/risk tables) */
.sm-table-row {
  display: grid;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
  cursor: default;
}

/* Panel with surface2 background and border */
.sm-bordered-panel {
  background: color-mix(in srgb, var(--surface2) 60%, transparent);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
}

/* Comps section panel title (fontSize 13, fw 600) */
.sm-comps-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

/* Comps metric big number */
.sm-comps-big-num {
  font-family: 'Space Mono', monospace;
  font-size: 36px;
  font-weight: 700;
}

/* Competitor filter pill button */
.sm-pill-btn {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text3);
  cursor: pointer;
  transition: all 0.2s;
}
.sm-pill-btn[data-active="true"] {
  border-color: var(--pill-color, var(--violet));
  background: color-mix(in srgb, var(--pill-color, var(--violet)) 15%, transparent);
  color: var(--pill-color, var(--violet));
}

/* Competitor news clear button */
.sm-pill-clear-btn {
  font-size: 10px;
  padding: 4px 12px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--coral) 15%, transparent);
  color: var(--coral);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

/* Competitor news item row */
.sm-news-item {
  padding: 16px 24px;
  cursor: pointer;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.15s;
}
.sm-news-item:last-child {
  border-bottom: none;
}

/* Competitor profile card */
.sm-comp-profile-card {
  padding: 16px;
  background: var(--surface2);
  border-radius: 8px;
  border: 1px solid var(--border);
}

/* List with no default styling */
.sm-list-clean {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Expand/collapse all button (minimal style) */
.sm-expand-collapse-btn {
  font-size: 10px;
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text3);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

/* Card section header with border-bottom */
.sm-card-section-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

/* SEC filing type badge */
.sm-sec-type-badge {
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
}

/* Timeline verdict label */
.sm-verdict-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}

/* Timeline detail info cell */
.sm-tl-info-cell {
  border-radius: 8px;
  padding: 8px 12px;
}

/* Thesis comparison box */
.sm-thesis-box {
  padding: 12px 16px;
  background: color-mix(in srgb, var(--mint) 5%, var(--surface));
  border-radius: 12px;
  border-left: 3px solid var(--mint);
  margin-top: 12px;
}

/* Thesis comparison label */
.sm-thesis-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--mint);
  margin-bottom: 4px;
}

/* SM mono value with Space Mono */
.sm-mono-value {
  font-family: 'Space Mono', monospace;
  font-weight: 600;
}

/* Projection table grid rows */
.sm-proj-grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.sm-proj-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* H4-style section heading (no margin top) */
.sm-h4-heading {
  font-size: 14px;
  font-weight: 500;
  margin-top: 0;
}

/* Surface2 padded row (reserve yield, RLDC margin stats) */
.sm-surface2-row {
  padding: 16px;
  background: var(--surface2);
  border-radius: 8px;
}

/* Mono large value display */
.sm-mono-lg-value {
  font-family: 'Space Mono', monospace;
  font-size: 18px;
}

/* Compact news category/competitor micro badge */
.sm-micro-badge {
  padding: 1px 8px;
  border-radius: 99px;
  font-size: 10px;
}

/* Footer/metadata section with top border */
.sm-footer-meta {
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

/* ═══════════════════════════════════════════════════════════════════════════
   § 34. BMNR STOCK-SPECIFIC CLASSES
   Patterns extracted from BMNR.tsx inline styles for reuse.
   Prefixed with "sm-bmnr-" to avoid collision with existing classes.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Data Freshness Badge (hero header) ─────────────────────────────────── */
.sm-bmnr-freshness-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(167,139,250,0.1);
  border: 1px solid rgba(167,139,250,0.3);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  color: #a78bfa;
}
.sm-bmnr-freshness-sep { color: rgba(167,139,250,0.5); }

/* ── Refresh Button (hero price area) ───────────────────────────────────── */
.sm-bmnr-refresh-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  opacity: 0.6;
}
.sm-bmnr-refresh-btn[data-loading="true"] { cursor: wait; opacity: 0.5; }

/* ── Parameter Panel (card wrapper for BMNRParameterCard) ────────────────── */
.sm-bmnr-param-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 12px;
}
.sm-bmnr-param-panel[data-disabled="true"] { opacity: 0.6; }

/* ── Parameter Grid (7-column button row) ────────────────────────────────── */
.sm-bmnr-param-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
.sm-bmnr-param-grid[data-disabled="true"] { pointer-events: none; }

/* ── Parameter Button (preset value selector) ────────────────────────────── */
.sm-bmnr-param-btn {
  padding: 12px 4px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface2);
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: var(--text3);
  position: relative;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
}
.sm-bmnr-param-btn[data-active="true"] {
  border: 2px solid var(--btn-color, var(--violet));
  background: color-mix(in srgb, var(--btn-color, var(--violet)) 15%, transparent);
  color: var(--btn-color, var(--violet));
  font-weight: 600;
}
.sm-bmnr-param-btn[data-disabled="true"] { cursor: default; }

/* ── Custom Input Wrapper ────────────────────────────────────────────────── */
.sm-bmnr-custom-wrap {
  display: flex;
  border-radius: 8px;
  border: 2px solid var(--violet);
  background: rgba(167,139,250,0.15);
  overflow: hidden;
}
.sm-bmnr-custom-input {
  flex: 1;
  min-width: 0;
  padding: 8px 4px;
  border: none;
  background: transparent;
  color: var(--violet);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  outline: none;
}

/* ── Scale Label (← Bearish | Bullish →) ─────────────────────────────────── */
.sm-bmnr-scale-label {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
  margin-top: 8px;
}

/* ── Scenario Preset Grid (6-column) ─────────────────────────────────────── */
.sm-bmnr-scenario-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
}

/* ── Scenario Preset Cell ────────────────────────────────────────────────── */
.sm-bmnr-scenario-cell {
  padding: 16px 8px;
  background: var(--surface);
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  border-bottom: 2px solid transparent;
}
.sm-bmnr-scenario-cell[data-active="true"] {
  background: color-mix(in srgb, var(--scenario-color) 8%, var(--surface));
  border-bottom-color: var(--scenario-color);
}

/* ── Custom Scenario Notice ──────────────────────────────────────────────── */
.sm-bmnr-custom-notice {
  padding: 8px 12px;
  background: color-mix(in srgb, var(--violet) 8%, transparent);
  border-radius: 8px;
  font-size: 11px;
  color: var(--violet);
  margin-top: 8px;
}

/* ── Mode Toggle Card (current vs growth) ────────────────────────────────── */
.sm-bmnr-mode-card {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface2);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.sm-bmnr-mode-card[data-active="true"] {
  border: 2px solid var(--mode-color, var(--mint));
  background: color-mix(in srgb, var(--mode-color, var(--mint)) 10%, transparent);
}

/* ── Mode Icon / Label ───────────────────────────────────────────────────── */
.sm-bmnr-mode-icon { font-size: 20px; margin-bottom: 4px; }
.sm-bmnr-mode-label { font-weight: 600; font-size: 13px; }

/* ── Mode Status Banner ──────────────────────────────────────────────────── */
.sm-bmnr-mode-status {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 11px;
  color: var(--text3);
  border: 1px solid var(--border);
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sm-bmnr-mode-status[data-mode="current"] {
  background: rgba(52,211,153,0.1);
  border-color: rgba(52,211,153,0.3);
}
.sm-bmnr-mode-status[data-mode="growth"] {
  background: rgba(34,211,238,0.1);
  border-color: rgba(34,211,238,0.3);
}

/* ── KPI Value Sizes (Space Mono) ────────────────────────────────────────── */
.sm-bmnr-kpi-val {
  font-family: 'Space Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--kpi-color, var(--text));
  margin: 6px 0 4px;
}
.sm-bmnr-kpi-val-lg {
  font-family: 'Space Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  color: var(--kpi-color, var(--text));
  margin: 6px 0 2px;
}
.sm-bmnr-kpi-val-xl {
  font-family: 'Space Mono', monospace;
  font-size: 24px;
  font-weight: 700;
  color: var(--kpi-color, var(--text));
  margin: 8px 0 4px;
}

/* ── Accent Hero KPI Grid (2-col) ────────────────────────────────────────── */
.sm-bmnr-hero-kpi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: color-mix(in srgb, var(--accent) 30%, var(--border));
  border-radius: 16px;
  overflow: hidden;
}
.sm-bmnr-hero-kpi-cell {
  background: color-mix(in srgb, var(--accent) 8%, var(--surface));
  padding: 24px 16px;
  text-align: center;
}

/* ── Key Assumptions Box ─────────────────────────────────────────────────── */
.sm-bmnr-assumptions {
  padding: 16px;
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  border-radius: 10px;
  font-size: 12px;
  color: var(--text3);
  line-height: 1.7;
  margin-top: 16px;
  border: 1px solid color-mix(in srgb, var(--accent) 15%, transparent);
}

/* ── Step Badge (methodology) ────────────────────────────────────────────── */
.sm-bmnr-step-badge {
  color: var(--bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  font-family: 'Space Mono', monospace;
  background: var(--step-color, var(--accent));
}

/* ── Methodology Result Value ────────────────────────────────────────────── */
.sm-bmnr-method-result {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--result-color, var(--accent));
  flex-shrink: 0;
}

/* ── Method Formula ──────────────────────────────────────────────────────── */
.sm-bmnr-formula {
  font-size: 10px;
  font-family: 'Space Mono', monospace;
  color: var(--text3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── List Reset (margin:0, paddingLeft) ──────────────────────────────────── */
.sm-bmnr-list-reset { margin: 0; padding-left: 16px; }
.sm-bmnr-list-reset-20 { margin: 0; padding-left: 20px; }

/* ── Year / Scenario Selector Buttons ────────────────────────────────────── */
.sm-bmnr-year-btn {
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--text2);
  cursor: pointer;
  font-weight: 400;
  font-family: 'Space Mono', monospace;
  font-size: 16px;
  transition: all 0.15s;
  outline: none;
}
.sm-bmnr-year-btn[data-active="true"] {
  border: 2px solid var(--btn-color, var(--mint));
  background: color-mix(in srgb, var(--btn-color, var(--mint)) 15%, transparent);
  color: var(--btn-color, var(--mint));
  font-weight: 700;
}
.sm-bmnr-scenario-btn {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--text2);
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  transition: all 0.15s;
  font-family: 'Outfit', sans-serif;
  outline: none;
}
.sm-bmnr-scenario-btn[data-active="true"] {
  border: 2px solid var(--btn-color);
  background: color-mix(in srgb, var(--btn-color) 13%, transparent);
  color: var(--btn-color);
  font-weight: 700;
}

/* ── Scenario Detail Card ────────────────────────────────────────────────── */
.sm-bmnr-scenario-detail {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  border-left: 4px solid var(--scenario-color, var(--accent));
  padding: 24px;
}

/* ── Return / Sentiment Text ─────────────────────────────────────────────── */
.sm-bmnr-return-text { font-size: 12px; }
.sm-bmnr-return-text[data-sentiment="positive"] { color: var(--mint); }
.sm-bmnr-return-text[data-sentiment="negative"] { color: var(--coral); }

/* ── Staking Strategy Cell ───────────────────────────────────────────────── */
.sm-bmnr-staking-cell {
  background: var(--surface);
  padding: 24px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}
.sm-bmnr-staking-cell[data-active="true"] {
  background: color-mix(in srgb, var(--violet) 8%, var(--surface));
  border-bottom-color: var(--violet);
}

/* ── Mono APY Display ────────────────────────────────────────────────────── */
.sm-bmnr-apy-display {
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--mint);
}

/* ── Small Desc Text ─────────────────────────────────────────────────────── */
.sm-bmnr-desc-sm { font-size: 11px; color: var(--text3); margin-bottom: 4px; }

/* ── Multi-Tranche Row ───────────────────────────────────────────────────── */
.sm-bmnr-tranche-row {
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  background: var(--surface);
  opacity: 0.5;
}
.sm-bmnr-tranche-row[data-enabled="true"] {
  background: color-mix(in srgb, var(--violet) 3%, var(--surface));
  opacity: 1;
}
.sm-bmnr-tranche-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex: 1;
}

/* ── Factor Card (left-border accent) ────────────────────────────────────── */
.sm-bmnr-factor-card {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  border-left: 3px solid var(--factor-color, var(--accent));
}
.sm-bmnr-factor-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--factor-color, var(--accent));
}

/* ── Row Item (flex-between with border-bottom) ──────────────────────────── */
.sm-bmnr-row-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
}
.sm-bmnr-row-item-sm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
}

/* ── Stress Scenario Cell ────────────────────────────────────────────────── */
.sm-bmnr-stress-cell {
  padding: 24px 16px;
  text-align: center;
  background: var(--surface);
}
.sm-bmnr-stress-cell[data-safe="true"] {
  background: color-mix(in srgb, var(--mint) 3%, var(--surface));
}
.sm-bmnr-stress-cell[data-danger="true"] {
  background: color-mix(in srgb, var(--coral) 3%, var(--surface));
}

/* ── LTV Cell + Breach ───────────────────────────────────────────────────── */
.sm-bmnr-ltv-cell {
  padding: 24px 12px;
  text-align: center;
  background: var(--surface);
}
.sm-bmnr-ltv-cell[data-breach="true"] {
  background: color-mix(in srgb, var(--coral) 5%, var(--surface));
}
.sm-bmnr-breach-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--coral);
  text-transform: uppercase;
}

/* ── Micro Label Override (no uppercase/spacing) ─────────────────────────── */
.sm-bmnr-micro-plain {
  letter-spacing: normal;
  text-transform: none;
  font-weight: 400;
}

/* ── Capital Summary Banner ──────────────────────────────────────────────── */
.sm-bmnr-capital-summary {
  padding: 16px 24px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--mint) 8%, var(--surface)), color-mix(in srgb, var(--violet) 8%, var(--surface)));
  border-top: 1px solid var(--border);
}

/* ── Caveats Box ─────────────────────────────────────────────────────────── */
.sm-bmnr-caveats { padding: 16px; background: var(--surface2); border-radius: 8px; }
.sm-bmnr-caveats-list {
  margin: 0;
  padding-left: 20px;
  color: var(--text3);
  line-height: 1.8;
  font-size: 13px;
}

/* ── Analyst Card (ETH tab) ──────────────────────────────────────────────── */
.sm-bmnr-analyst-card {
  padding: 16px;
  background: var(--surface2);
  border-radius: 8px;
  border-left: 3px solid var(--card-accent, var(--mint));
}
.sm-bmnr-analyst-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--badge-accent, var(--mint)) 20%, transparent);
  color: var(--badge-accent, var(--mint));
}
.sm-bmnr-analyst-summary {
  padding: 12px;
  background: var(--surface);
  border-radius: 6px;
  font-size: 11px;
  font-family: 'Space Mono', monospace;
}

/* ── Investment Case Banner ──────────────────────────────────────────────── */
.sm-bmnr-invest-banner {
  padding: 12px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--mint) 15%, transparent), color-mix(in srgb, var(--violet) 15%, transparent));
  border-radius: 8px;
  border: 1px solid var(--border);
}

/* ── Roadmap Item ────────────────────────────────────────────────────────── */
.sm-bmnr-roadmap-item {
  padding: 16px 24px;
  border-left: 3px solid var(--impact-color, var(--sky));
  transition: background 0.15s;
}
.sm-bmnr-roadmap-item:hover { background: var(--surface2); }

/* ── Status / Date Pills ─────────────────────────────────────────────────── */
.sm-bmnr-status-pill {
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 10px;
  letter-spacing: 0.3px;
}
.sm-bmnr-status-pill[data-status="Complete"] { background: color-mix(in srgb, var(--mint) 15%, transparent); color: var(--mint); }
.sm-bmnr-status-pill[data-status="Development"] { background: color-mix(in srgb, var(--sky) 15%, transparent); color: var(--sky); }
.sm-bmnr-status-pill[data-status="Planning"],
.sm-bmnr-status-pill[data-status="Exploratory"] { background: color-mix(in srgb, var(--violet) 15%, transparent); color: var(--violet); }
.sm-bmnr-date-pill {
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 10px;
  background: color-mix(in srgb, var(--border) 60%, transparent);
  color: var(--text3);
}

/* ── News Filter Pill ────────────────────────────────────────────────────── */
.sm-bmnr-filter-pill {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text3);
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
  outline: none;
}
.sm-bmnr-filter-pill[data-active="true"] {
  border-color: var(--pill-color, var(--sky));
  background: color-mix(in srgb, var(--pill-color, var(--sky)) 15%, transparent);
  color: var(--pill-color, var(--sky));
}
.sm-bmnr-clear-btn {
  font-size: 10px;
  padding: 4px 12px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--coral) 15%, transparent);
  color: var(--coral);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
}

/* ── News Row ────────────────────────────────────────────────────────────── */
.sm-bmnr-news-row {
  padding: 16px 24px;
  cursor: pointer;
  border-left: 3px solid var(--news-accent, var(--violet));
  transition: background 0.15s;
}
.sm-bmnr-news-row:hover { background: var(--surface2); }

/* ── Category / Company Badge ────────────────────────────────────────────── */
.sm-bmnr-cat-badge[data-type="category"] {
  background: color-mix(in srgb, var(--violet) 12%, transparent);
  color: var(--violet);
}
.sm-bmnr-cat-badge[data-type="company"] {
  background: color-mix(in srgb, var(--sky) 12%, transparent);
  color: var(--sky);
}

/* ── News Impact Value ───────────────────────────────────────────────────── */
.sm-bmnr-impact-val {
  font-size: 11px;
  font-family: 'Space Mono', monospace;
  margin-left: 12px;
  white-space: nowrap;
}

/* ── News Detail Section ─────────────────────────────────────────────────── */
.sm-bmnr-news-detail {
  padding-top: 16px;
  margin-top: 12px;
  border-top: 1px solid var(--border);
}

/* ── Insight Card (significance / implication) ───────────────────────────── */
.sm-bmnr-insight-card {
  padding: 12px 16px;
  border-radius: 12px;
  border-left: 3px solid var(--insight-color, var(--violet));
  background: color-mix(in srgb, var(--insight-color, var(--violet)) 5%, var(--surface));
  margin-top: 8px;
}

/* ── Source Text ──────────────────────────────────────────────────────────── */
.sm-bmnr-source-text {
  font-size: 10px;
  color: var(--text3);
  font-family: 'Space Mono', monospace;
  margin-top: 8px;
}

/* ── SEC Meta Section ────────────────────────────────────────────────────── */
.sm-bmnr-sec-meta { padding-top: 12px; border-top: 1px solid var(--border); }
.sm-bmnr-sec-meta-row { display: flex; gap: 24px; flex-wrap: wrap; font-size: 12px; }
.sm-bmnr-sec-meta-sub { font-size: 11px; color: var(--text3); display: flex; align-items: center; gap: 8px; }

/* ── Catalyst Tracker ────────────────────────────────────────────────────── */
.sm-bmnr-catalyst-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--surface2);
}
.sm-bmnr-catalyst-row[data-complete="true"] {
  background: color-mix(in srgb, var(--mint) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--mint) 40%, transparent);
}

/* ── PR Item ─────────────────────────────────────────────────────────────── */
.sm-bmnr-pr-item {
  padding: 12px 16px;
  background: var(--surface2);
  border-radius: 12px;
}

/* ── Event Heading ───────────────────────────────────────────────────────── */
.sm-bmnr-event-heading {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 12px;
}
.sm-bmnr-event-count { font-size: 13px; font-weight: 400; color: var(--text3); }

/* ── Changes Table ───────────────────────────────────────────────────────── */
.sm-bmnr-changes-header {
  display: grid;
  grid-template-columns: 1fr 100px 100px 120px;
  border-bottom: 1px solid var(--border);
}
.sm-bmnr-changes-th {
  padding: 8px 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3);
  background: var(--surface2);
}
.sm-bmnr-changes-th[data-align="right"] { text-align: right; }
.sm-bmnr-changes-row {
  display: grid;
  grid-template-columns: 1fr 100px 100px 120px;
  transition: background 0.15s;
}
.sm-bmnr-changes-row:hover { background: var(--surface2); }
.sm-bmnr-changes-cell { padding: 8px 12px; font-size: 12px; }
.sm-bmnr-changes-cell[data-type="mono"] {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  text-align: right;
}

/* ── Event Note Box ──────────────────────────────────────────────────────── */
.sm-bmnr-event-note {
  padding: 12px;
  background: var(--surface2);
  border-radius: 12px;
  font-style: italic;
  color: var(--text3);
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.6;
}

/* ── Impact Label ────────────────────────────────────────────────────────── */
.sm-bmnr-impact-label { font-size: 11px; font-weight: 600; text-align: right; }
.sm-bmnr-impact-label[data-impact="positive"] { color: var(--mint); }
.sm-bmnr-impact-label[data-impact="negative"] { color: var(--coral); }
.sm-bmnr-impact-label[data-impact="neutral"] { color: var(--text3); }

/* ── Expand Chevron ──────────────────────────────────────────────────────── */
.sm-bmnr-chevron {
  font-size: 12px;
  color: var(--text3);
  text-align: center;
  transition: transform 0.2s;
}
.sm-bmnr-chevron[data-expanded="true"] { transform: rotate(180deg); }

/* ── Explain Section ─────────────────────────────────────────────────────── */
.sm-bmnr-explain-heading { color: var(--violet); font-weight: 500; margin-bottom: 8px; }
.sm-bmnr-explain-list {
  display: flex;
  flex-direction: column;
  color: var(--text2);
  list-style: none;
  padding: 0;
  margin: 0;
}
.sm-bmnr-explain-list[data-gap="8"] { gap: 8px; }
.sm-bmnr-explain-list[data-gap="4"] { gap: 4px; }

/* ── Bull/Bear Case Item ─────────────────────────────────────────────────── */
.sm-bmnr-case-item {
  display: flex;
  gap: 8px;
  padding: 5px 0;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.5;
}
.sm-bmnr-case-icon { flex-shrink: 0; }

/* ── Panel Header / Body (overview chart card) ───────────────────────────── */
.sm-bmnr-panel-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}
.sm-bmnr-panel-body { padding: 24px 24px 0; overflow-x: auto; }

/* ── Bar Chart ───────────────────────────────────────────────────────────── */
.sm-bmnr-bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 200px; }
.sm-bmnr-bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 56px; }
.sm-bmnr-bar { width: 100%; background: var(--accent); border-radius: 4px 4px 0 0; transition: height 0.3s; }
.sm-bmnr-bar-label { font-size: 10px; color: var(--text3); margin-top: 4px; text-align: center; }

/* ── Disabled Overlay ────────────────────────────────────────────────────── */
.sm-bmnr-disabled-overlay[data-disabled="true"] { opacity: 0.4; pointer-events: none; }

/* ── § 34 Responsive ─────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .sm-bmnr-param-grid { grid-template-columns: repeat(4, 1fr); }
  .sm-bmnr-scenario-grid { grid-template-columns: repeat(3, 1fr); }
  .sm-bmnr-hero-kpi-grid { grid-template-columns: 1fr; }
  .sm-bmnr-bar-chart { height: 160px; }
  .sm-bmnr-bar-col { min-width: 44px; }
  .sm-bmnr-panel-header { padding: 16px; }
  .sm-bmnr-panel-body { padding: 16px 16px 0; }
  .sm-bmnr-tranche-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .sm-bmnr-changes-header, .sm-bmnr-changes-row { grid-template-columns: 1fr 80px 80px 100px; }
  .sm-bmnr-kpi-val-xl { font-size: 20px; }
}
@media (max-width: 480px) {
  .sm-bmnr-param-grid { grid-template-columns: repeat(4, 1fr); gap: 4px; }
  .sm-bmnr-scenario-grid { grid-template-columns: repeat(2, 1fr); }
  .sm-bmnr-kpi-val { font-size: 16px; }
  .sm-bmnr-kpi-val-lg { font-size: 18px; }
  .sm-bmnr-kpi-val-xl { font-size: 18px; }
  .sm-bmnr-param-panel { padding: 16px; }
  .sm-bmnr-tranche-row { padding: 12px; gap: 10px; flex-direction: column; }
  .sm-bmnr-tranche-grid { grid-template-columns: 1fr 1fr; }
  .sm-bmnr-changes-header, .sm-bmnr-changes-row { grid-template-columns: 1fr 60px 60px 80px; }
  .sm-bmnr-news-row { padding: 12px 16px; }
}
`;
