/**
 * UNIFIED STOCK MODEL STYLES
 *
 * Golden Standard: ASTS
 *
 * This is the single source of truth for all stock component styles.
 * All three models (ASTS, BMNR, CRCL) share these styles.
 *
 * Usage in component:
 *   import { getStockModelCSS } from './stock-model-styles';
 *   const css = getStockModelCSS('cyan');  // ASTS
 *   const css = getStockModelCSS('violet'); // BMNR
 *   const css = getStockModelCSS('mint');   // CRCL
 */

export type AccentColor = 'cyan' | 'violet' | 'mint';

/**
 * Returns the complete CSS for a stock model component with the specified accent color.
 */
export const getStockModelCSS = (accent: AccentColor): string => `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  /* ═══ UNIFIED DESIGN TOKENS (shared across ASTS/BMNR/CRCL) ═══ */
  /* Background & Surfaces */
  --bg: #05070A;
  --surface: #0D1117;
  --surface2: #161B22;
  --surface3: #21262D;
  --border: rgba(240,246,252,0.1);

  /* Typography */
  --text: #F0F6FC;
  --text2: #8B949E;
  --text3: #6E7681;

  /* Semantic Colors */
  --cyan: #22D3EE;
  --cyan-dim: rgba(34,211,238,0.15);
  --mint: #7EE787;
  --mint-dim: rgba(126,231,135,0.15);
  --coral: #FF7B72;
  --coral-dim: rgba(255,123,114,0.15);
  --sky: #79C0FF;
  --sky-dim: rgba(121,192,255,0.15);
  --gold: #D29922;
  --gold-dim: rgba(210,153,34,0.15);
  --violet: #A78BFA;
  --violet-dim: rgba(167,139,250,0.15);

  /* ═══ STOCK-SPECIFIC ACCENT ═══ */
  --accent: var(--${accent});
  --accent-dim: var(--${accent}-dim);
}

/* Scoped reset — only applies inside model app to avoid overriding Tailwind :where() selectors */
.stock-model-app, .stock-model-app * { box-sizing: border-box; margin: 0; padding: 0; }

.stock-model-app {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  color: var(--text);
  overflow-x: hidden;
}

/* Hero Header */
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

/* Stats Row */
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

/* Navigation */
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
  border-left: 3px solid transparent;
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

/* Tab Type Indicators - Subtle left border to distinguish tracking vs projection tabs */
/* mint=tracking (actual data), accent color=projection (user models) */
.nav-btn.tab-tracking {
  border-left: 3px solid var(--mint);
}
.nav-btn.tab-projection {
  border-left: 3px solid var(--accent);
}
.nav-btn.tab-tracking.active {
  border-left-color: var(--mint);
  background: var(--mint);
  border-color: var(--mint);
}
.nav-btn.tab-projection.active {
  border-left-color: var(--accent);
  background: var(--accent);
  border-color: var(--accent);
}

/* Filter Buttons - For inline filtering (competitor filters, peer group selectors) */
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

/* Dropdown Navigation - Stock-specific tabs in expandable menu */
.nav-dropdown {
  display: inline-flex;
}
.nav-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  border-left: 3px solid var(--violet);
}
.nav-dropdown-trigger.active {
  background: var(--violet);
  color: var(--bg);
  border-color: var(--violet);
  border-left: 3px solid var(--violet);
}

/* Reserved space below nav for dropdown content - always present */
.nav-dropdown-space {
  height: 48px;
  padding: 0 64px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;
}
.nav-dropdown-space.open {
  background: var(--surface);
}
.nav-dropdown-menu {
  display: flex;
  align-items: center;
  gap: 4px;
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
  color: var(--accent);
  background: var(--accent-dim);
}

/* Main Content */
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

/* Thesis Cards */
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

/* Bar Charts — Ive×Tesla */
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

/* Tables */
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

/* Pills */
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

/* Legal Disclaimer Banner */
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
}

/* ═══ RESPONSIVE - DESKTOP (1200px) ═══ */
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
  .nav-btn {
    border-width: 3px;
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

/* Timeline - Unified Style */
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
.t-meta-value.green { color: #4ade80; }
.t-meta-value.red { color: #f87171; }
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

/* ═══ UPDATE INDICATOR SYSTEM (Ive-inspired minimal design) ═══ */
/* Tiny, subtle dots - visible but never distracting */
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

/* ═══ UNIFIED COMP CARDS - One card per company ═══ */
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

/* ═══ COMPANY DISCLOSURE PANELS ═══ */
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
`;
