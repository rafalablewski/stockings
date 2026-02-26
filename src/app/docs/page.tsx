import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | ABISON",
  description:
    "ABISON design system documentation — layout, CSS classes, components, design tokens, and UI conventions",
};

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — All documentation sections live here as typed arrays.
   Editing a section? Change the data; the JSX stays untouched.
   ───────────────────────────────────────────────────────────────────────────── */

interface Token {
  name: string;
  value: string;
  description: string;
}

const designTokens: Token[] = [
  { name: "--bg",       value: "#05070A",                description: "Page background — near-black" },
  { name: "--surface",  value: "#0D1117",                description: "Card / panel background" },
  { name: "--surface2", value: "#161B22",                description: "Hover state, secondary panel" },
  { name: "--surface3", value: "#21262D",                description: "Tertiary surface (input BG, legend)" },
  { name: "--border",   value: "rgba(240,246,252,0.1)",  description: "Default border — subtle glass edge" },
  { name: "--text",     value: "#F0F6FC",                description: "Primary text — high contrast" },
  { name: "--text2",    value: "#8B949E",                description: "Secondary text — descriptions" },
  { name: "--text3",    value: "#6E7681",                description: "Tertiary text — labels, muted" },
  { name: "--cyan",     value: "#22D3EE",                description: "ASTS accent" },
  { name: "--violet",   value: "#A78BFA",                description: "BMNR accent" },
  { name: "--mint",     value: "#7EE787",                description: "CRCL accent / positive sentiment" },
  { name: "--coral",    value: "#FF7B72",                description: "Negative sentiment / errors" },
  { name: "--sky",      value: "#79C0FF",                description: "Info / links" },
  { name: "--gold",     value: "#D29922",                description: "Neutral sentiment / warnings" },
  { name: "--accent",   value: "var(--{color})",         description: "Resolved per-stock: cyan | violet | mint" },
  { name: "--accent-dim", value: "var(--{color}-dim)",   description: "15% opacity tint of accent" },
];

interface CSSClass {
  name: string;
  description: string;
  usage?: string;
}

const layoutClasses: CSSClass[] = [
  { name: ".sm-flex",         description: "Flex row, align-center, gap 8px",           usage: "className=\"sm-flex\"" },
  { name: ".sm-flex-between", description: "Flex row, space-between, align-center",     usage: "className=\"sm-flex-between\"" },
  { name: ".sm-flex-col",     description: "Flex column",                                usage: "className=\"sm-flex-col\"" },
  { name: ".sm-flex-col-gap", description: "Flex column, gap 12px",                      usage: "className=\"sm-flex-col-gap\"" },
  { name: ".sm-flex-wrap",    description: "Flex row, wrap, gap 8px",                    usage: "className=\"sm-flex-wrap\"" },
  { name: ".sm-flex-1",       description: "flex: 1",                                    usage: "className=\"sm-flex-1\"" },
  { name: ".sm-items-center", description: "align-items: center",                        usage: "className=\"sm-items-center\"" },
  { name: ".sm-items-start",  description: "align-items: flex-start",                    usage: "className=\"sm-items-start\"" },
  { name: ".sm-gap-{n}",     description: "Gap override — 1 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32", usage: "className=\"sm-flex sm-gap-16\"" },
  { name: ".sm-text-center",  description: "text-align: center",                         usage: "className=\"sm-text-center\"" },
  { name: ".sm-text-right",   description: "text-align: right",                          usage: "className=\"sm-text-right\"" },
  { name: ".sm-text-left",    description: "text-align: left",                           usage: "className=\"sm-text-left\"" },
  { name: ".sm-shrink-0",     description: "flex-shrink: 0",                             usage: "className=\"sm-shrink-0\"" },
  { name: ".sm-w-full",       description: "width: 100%",                                usage: "className=\"sm-w-full\"" },
  { name: ".sm-w-48",         description: "width: 48px",                                usage: "className=\"sm-w-48\"" },
  { name: ".sm-min-w-0",      description: "min-width: 0 — prevents flex overflow",      usage: "className=\"sm-min-w-0\"" },
  { name: ".sm-relative",     description: "position: relative",                          usage: "className=\"sm-relative\"" },
  { name: ".sm-mt-{n}",      description: "Margin-top — 2 | 4 | 8 | 10 | 12 | 16 | 24 | 32", usage: "className=\"sm-mt-16\"" },
  { name: ".sm-mb-{n}",      description: "Margin-bottom — 0 | 4 | 6 | 8 | 12 | 16",   usage: "className=\"sm-mb-8\"" },
  { name: ".sm-ml-{n}",      description: "Margin-left — 4 | 12",                        usage: "className=\"sm-ml-4\"" },
  { name: ".sm-p-{x}-{y}",   description: "Padding shortcuts — 3-12, 4-10, 4-12, 5-12, 8-12-4, etc.", usage: "className=\"sm-p-5-12\"" },
  { name: ".sm-rounded-{n}",  description: "Border-radius — 3 | 4 | 5 | 6 | 8 | 12 | 16 | full", usage: "className=\"sm-rounded-8\"" },
  { name: ".sm-overflow-hidden", description: "overflow: hidden",                         usage: "className=\"sm-overflow-hidden\"" },
  { name: ".sm-inline-flex",  description: "display: inline-flex",                        usage: "className=\"sm-inline-flex\"" },
  { name: ".sm-block",        description: "display: block",                              usage: "className=\"sm-block\"" },
  { name: ".g2 / .g3 / .g4 / .g5", description: "Grid layouts — 2–5 equal columns, 24px gap", usage: "className=\"g3\"" },
];

const typographyClasses: CSSClass[] = [
  { name: ".sm-section-label",  description: "11px uppercase section header — the #1 most-used pattern",     usage: "className=\"sm-section-label\"" },
  { name: ".sm-param-label",    description: "13px uppercase param/subsection header",                       usage: "className=\"sm-param-label\"" },
  { name: ".sm-micro-label",    description: "10px uppercase micro label (table heads, tiny tags)",           usage: "className=\"sm-micro-label\"" },
  { name: ".sm-panel-title",    description: "13px semi-bold panel title with flex alignment",                usage: "className=\"sm-panel-title\"" },
  { name: ".sm-mono",           description: "Space Mono, bold — base monospace class",                      usage: "className=\"sm-mono\"" },
  { name: ".sm-mono-sm",        description: "Space Mono 12px / 600",                                        usage: "className=\"sm-mono-sm\"" },
  { name: ".sm-mono-md",        description: "Space Mono 14px / 600",                                        usage: "className=\"sm-mono-md\"" },
  { name: ".sm-mono-lg",        description: "Space Mono 18px / 700",                                        usage: "className=\"sm-mono-lg\"" },
  { name: ".sm-mono-xl",        description: "Space Mono 28px / 700",                                        usage: "className=\"sm-mono-xl\"" },
  { name: ".sm-mono-2xl",       description: "Space Mono 32px / 700",                                        usage: "className=\"sm-mono-2xl\"" },
  { name: ".sm-mono-3xl",       description: "Space Mono 42px / 700",                                        usage: "className=\"sm-mono-3xl\"" },
  { name: ".sm-subtle",         description: "12px text3 — muted helper text",                               usage: "className=\"sm-subtle\"" },
  { name: ".sm-subtle-sm",      description: "11px text3 — smaller muted text",                              usage: "className=\"sm-subtle-sm\"" },
  { name: ".sm-body",           description: "14px text2 — standard body text",                              usage: "className=\"sm-body\"" },
  { name: ".sm-body-sm",        description: "13px text2, line-height 1.5",                                  usage: "className=\"sm-body-sm\"" },
  { name: ".sm-body-lg",        description: "15px text2, line-height 1.7",                                  usage: "className=\"sm-body-lg\"" },
  { name: ".sm-fw-{n}",        description: "Font-weight — 300 | 400 | 500 | 600 | 700",                   usage: "className=\"sm-fw-600\"" },
  { name: ".sm-text-{n}",      description: "Font-size — 8 | 9 | 10 (px)",                                  usage: "className=\"sm-text-9\"" },
  { name: ".sm-lh-{n}",        description: "Line-height — 14 | 15 | 16 | 17 | 18 | 20 | 22 (÷10)",       usage: "className=\"sm-lh-17\"" },
  { name: ".sm-ls-{n}",        description: "Letter-spacing — 0 | 05 | 08 | 1 | wide-sm (1.5px) | 005em", usage: "className=\"sm-ls-05\"" },
  { name: ".sm-uppercase",     description: "text-transform: uppercase",                                     usage: "className=\"sm-uppercase\"" },
  { name: ".sm-italic",        description: "font-style: italic",                                            usage: "className=\"sm-italic\"" },
  { name: ".sm-line-through",  description: "text-decoration: line-through",                                 usage: "className=\"sm-line-through\"" },
  { name: ".sm-nowrap",        description: "white-space: nowrap",                                            usage: "className=\"sm-nowrap\"" },
  { name: ".sm-text-ellipsis", description: "overflow: hidden; text-overflow: ellipsis; white-space: nowrap", usage: "className=\"sm-text-ellipsis\"" },
  { name: ".sm-opacity-{n}",   description: "Opacity — 25 | 30 | 40 | 50 | 60 | 70 | 80 | 90",             usage: "className=\"sm-opacity-70\"" },
];

const colorClasses: CSSClass[] = [
  { name: ".sm-accent",  description: "color: var(--accent) — per-stock accent" },
  { name: ".sm-mint",    description: "color: var(--mint) — positive / CRCL" },
  { name: ".sm-coral",   description: "color: var(--coral) — negative / error" },
  { name: ".sm-sky",     description: "color: var(--sky) — info / link" },
  { name: ".sm-gold",    description: "color: var(--gold) — neutral / warning" },
  { name: ".sm-violet",  description: "color: var(--violet) — BMNR / WS" },
  { name: ".sm-cyan",    description: "color: var(--cyan) — ASTS" },
  { name: ".sm-text",    description: "color: var(--text) — primary text" },
  { name: ".sm-text2",   description: "color: var(--text2) — secondary text" },
  { name: ".sm-text3",   description: "color: var(--text3) — muted text" },
];

const componentClasses: CSSClass[] = [
  { name: ".sm-panel",           description: "Surface card with border, rounded-16, padding 24px",            usage: "className=\"sm-panel\"" },
  { name: ".sm-panel-header",    description: "Panel header with bottom border, padding 24px",                 usage: "className=\"sm-panel-header\"" },
  { name: ".sm-panel-body",      description: "Panel body with padding 24px",                                  usage: "className=\"sm-panel-body\"" },
  { name: ".sm-tab-hero",        description: "Tab hero section — 48px top, 32px bottom, subtle border",       usage: "className=\"sm-tab-hero\"" },
  { name: ".sm-divider",         description: "Section divider with trailing 1px line",                         usage: "className=\"sm-divider sm-section-label\"" },
  { name: ".sm-grid-sep",        description: "1px-gap grid with visible borders. Set --cols via CSS var.",     usage: "className=\"sm-grid-sep\" style={{ '--cols': 4 }}" },
  { name: ".sm-grid-cell",       description: "Grid cell inside sm-grid-sep — left-aligned, 16×24px padding",  usage: "className=\"sm-grid-cell\"" },
  { name: ".sm-grid-cell-center",description: "Grid cell — centered, 16px padding",                            usage: "className=\"sm-grid-cell-center\"" },
  { name: ".sm-kpi-cell",        description: "KPI metric cell (centered, 24×16px pad)",                        usage: "className=\"sm-kpi-cell\"" },
  { name: ".sm-kpi-label",       description: "KPI label — 10px uppercase",                                    usage: "className=\"sm-kpi-label\"" },
  { name: ".sm-kpi-value",       description: "KPI value — Space Mono 18px, uses --kpi-color",                 usage: "style={{ '--kpi-color': 'var(--mint)' }}" },
  { name: ".sm-data-row",        description: "Data row with grid layout and CSS :hover. Replaces JS hover.",   usage: "className=\"sm-data-row\"" },
  { name: ".sm-badge",           description: "Rounded chip — uses --badge-color CSS var for tint",             usage: "style={{ '--badge-color': 'var(--mint)' }}" },
  { name: ".sm-badge-impact",    description: "Impact badge — wider, bolder, centered",                         usage: "className=\"sm-badge-impact\"" },
  { name: ".sm-bullet-item",     description: "Flex row for bull/bear case list items",                         usage: "className=\"sm-bullet-item\"" },
  { name: ".sm-dot",             description: "4px circle dot — uses --dot-color CSS var",                      usage: "style={{ '--dot-color': 'var(--mint)' }}" },
  { name: ".sm-expand-btn",      description: "Full-width expand/collapse toggle button",                       usage: "className=\"sm-expand-btn\"" },
  { name: ".sm-action-btn",      description: "Compact pill action button (Expand All / Collapse All)",         usage: "className=\"sm-action-btn\"" },
  { name: ".sm-progress-track",  description: "4px progress bar track",                                         usage: "className=\"sm-progress-track\"" },
  { name: ".sm-progress-fill",   description: "Progress bar fill — uses --progress-color CSS var",              usage: "style={{ width: '75%', '--progress-color': 'var(--mint)' }}" },
  { name: ".sm-bar",             description: "Vertical bar chart column — uses --bar-color CSS var",           usage: "style={{ height: '60%' }}" },
  { name: ".sm-preset-btn",      description: "Model parameter preset toggle — uses data-active + --preset-color", usage: "data-active=\"true\" style={{ '--preset-color': 'var(--cyan)' }}" },
  { name: ".sm-card-colored",    description: "Dynamic color card — uses --card-bg, --card-border, --card-text", usage: "style={{ '--card-bg': c.bg }}" },
  { name: ".sm-tab-card",        description: "Article/content card with hover border effect",                   usage: "className=\"sm-tab-card\"" },
  { name: ".sm-tab-toggle",      description: "Compact toggle button with data-active state",                   usage: "data-active=\"true\"" },
];

interface DataAttr {
  attribute: string;
  values: string;
  effect: string;
}

const dataAttributes: DataAttr[] = [
  { attribute: "data-sentiment",  values: "positive | negative | neutral | info", effect: "Sets text color to mint/coral/gold/sky" },
  { attribute: "data-active",     values: "true | false",                          effect: "Full opacity when true, 50% when false" },
  { attribute: "data-highlight",  values: "true",                                  effect: "On .sm-row: adds accent-dim BG and value color" },
  { attribute: "data-open",       values: "true | false",                          effect: "On .sm-ws-panel-header: toggles bottom border" },
  { attribute: "data-full",       values: "true",                                  effect: "On .sm-ws-report: expanded state with left border" },
  { attribute: "data-type",       values: "report | update",                       effect: "On .sm-ws-count-badge: violet or muted style" },
  { attribute: "data-align",      values: "right",                                 effect: "On .sm-ws-estimate-cell / .sm-ws-th: right-align" },
  { attribute: "data-latest",    values: "present",                               effect: "On .sm-fin-th / .sm-fin-td: accent-dim background for latest quarter" },
  { attribute: "data-sticky",    values: "present",                               effect: "On .sm-fin-th: sticky left position with z-index for horizontal scroll" },
  { attribute: "data-overflow",  values: "true",                                  effect: "On .sm-fin-bar: switches to fixed-width (flex: 0 0 auto) for >8 bars" },
  { attribute: "data-highlight", values: "present",                               effect: "On .sm-cap-td: accent color + font-weight 600 for key values" },
  { attribute: "data-loading",   values: "true",                                  effect: "On .sm-refresh-btn: wait cursor + 50% opacity. On .sm-refresh-icon: spin animation" },
  { attribute: "data-direction", values: "up | down",                              effect: "On .sm-price-change: mint (up) or coral (down) text color" },
  { attribute: "data-expanded",  values: "true | false",                           effect: "On .sm-ed-chevron: rotates 0° ↔ 90° with transition" },
  { attribute: "data-spin",      values: "true",                                   effect: "spin animation 1s linear infinite" },
];

interface CSSVarDynamic {
  variable: string;
  usedBy: string;
  purpose: string;
}

const cssCustomProperties: CSSVarDynamic[] = [
  { variable: "--cols",           usedBy: ".sm-grid-sep",        purpose: "Number of grid columns (default 3)" },
  { variable: "--badge-color",    usedBy: ".sm-badge, .sm-badge-impact, .sm-ws-rating-badge", purpose: "Dynamic badge tint color" },
  { variable: "--kpi-color",      usedBy: ".sm-kpi-value",       purpose: "KPI number color" },
  { variable: "--dot-color",      usedBy: ".sm-dot, .sm-ed-status-dot", purpose: "Small dot indicator color" },
  { variable: "--progress-color", usedBy: ".sm-progress-fill",   purpose: "Progress bar fill color (default: accent)" },
  { variable: "--bar-color",      usedBy: ".sm-bar",             purpose: "Bar chart fill color (default: accent)" },
  { variable: "--preset-color",   usedBy: ".sm-preset-btn",      purpose: "Active preset button border + bg tint" },
  { variable: "--card-bg",        usedBy: ".sm-card-colored",    purpose: "Card background color" },
  { variable: "--card-border",    usedBy: ".sm-card-colored",    purpose: "Card border color" },
  { variable: "--card-text",      usedBy: ".sm-card-value",      purpose: "Card headline number color" },
  { variable: "--tint",           usedBy: ".sm-tinted-bg",       purpose: "10% opacity tinted background" },
  { variable: "--ed-btn-color",   usedBy: ".sm-ed-action-btn",   purpose: "EDGAR action button color" },
  { variable: "--pill-color",     usedBy: ".sm-ed-filter-pill",  purpose: "EDGAR filter pill text color" },
  { variable: "--pill-bg",        usedBy: ".sm-ed-filter-pill",  purpose: "EDGAR filter pill background" },
  { variable: "--pill-border",    usedBy: ".sm-ed-filter-pill",  purpose: "EDGAR filter pill border" },
  { variable: "--badge-bg",       usedBy: ".sm-ed-form-badge",   purpose: "EDGAR form badge background color" },
  { variable: "--badge-text",     usedBy: ".sm-ed-form-badge",   purpose: "EDGAR form badge text color" },
  { variable: "--status-color",   usedBy: ".sm-ed-status-label", purpose: "EDGAR filing status text color" },
  { variable: "--verdict-color",  usedBy: ".sm-ed-verdict-badge", purpose: "EDGAR verdict badge text color" },
  { variable: "--verdict-bg",     usedBy: ".sm-ed-verdict-badge", purpose: "EDGAR verdict badge background" },
  { variable: "--db-color",       usedBy: ".sm-ed-db-btn",       purpose: "EDGAR DB button color" },
  { variable: "--db-opacity",     usedBy: ".sm-ed-db-btn",       purpose: "EDGAR DB button opacity" },
  { variable: "--field-color",    usedBy: ".sm-ed-db-field-value", purpose: "DB tooltip field value color (status/seen)" },
  { variable: "--ed-btn-border",  usedBy: ".sm-ed-action-btn-ai, .sm-ed-action-btn-recheck", purpose: "Full border value for action button variants" },
  { variable: "--ed-btn-cursor",  usedBy: ".sm-ed-action-btn-ai, .sm-ed-action-btn-recheck", purpose: "Cursor style (pointer/wait) for action buttons" },
  { variable: "--ed-btn-opacity", usedBy: ".sm-ed-action-btn-ai, .sm-ed-action-btn-recheck", purpose: "Opacity for action buttons (analyzing state)" },
];

interface FileEntry {
  path: string;
  type: string;
  description: string;
}

const projectStructure: FileEntry[] = [
  { path: "src/app/layout.tsx",                          type: "Layout",    description: "Root layout — Navigation, Footer, PinGate wrapper" },
  { path: "src/app/globals.css",                         type: "CSS",       description: "Global styles — Tailwind imports, design tokens, scrollbar, base reset" },
  { path: "src/app/page.tsx",                            type: "Page",      description: "Landing page — stock list" },
  { path: "src/app/stocks/[ticker]/page.tsx",            type: "Page",      description: "Dynamic stock route — loads ASTS/BMNR/CRCL components" },
  { path: "src/app/hooks/page.tsx",                      type: "Page",      description: "Agent Hooks documentation page" },
  { path: "src/app/docs/page.tsx",                       type: "Page",      description: "This documentation page" },
  { path: "src/app/audit/comprehensive-code-audit/page.tsx", type: "Page", description: "Code audit report page" },
  { path: "src/components/stocks/stock-model-styles.ts", type: "Styles",    description: "Central CSS system — getStockModelCSS(accent) template" },
  { path: "src/components/stocks/ASTS.tsx",              type: "Component", description: "AST SpaceMobile model — golden standard" },
  { path: "src/components/stocks/BMNR.tsx",              type: "Component", description: "BitMine model — mirrors ASTS structure" },
  { path: "src/components/stocks/CRCL.tsx",              type: "Component", description: "Circle model — mirrors ASTS structure" },
  { path: "src/components/shared/StockModelUI.tsx",      type: "Component", description: "Shared primitives: Card, Row, Input, Panel, Guide, CFANotes" },
  { path: "src/components/shared/StockNavigation.tsx",   type: "Component", description: "Tab navigation bar with dropdown support" },
  { path: "src/components/shared/StockChart.tsx",        type: "Component", description: "Interactive stock price chart" },
  { path: "src/components/shared/SharedWallStreetTab.tsx",    type: "Component", description: "Wall Street analyst research tab" },
  { path: "src/components/shared/SharedInvestmentTab.tsx",    type: "Component", description: "Investment thesis & scoring tab" },
  { path: "src/components/shared/SharedEdgarTab.tsx",         type: "Component", description: "SEC EDGAR filings browser" },
  { path: "src/components/shared/SharedSourcesTab.tsx",       type: "Component", description: "Research sources / news feed tab" },
  { path: "src/components/shared/SharedAIAgentsTab.tsx",      type: "Component", description: "AI analysis agents status tab" },
  { path: "src/components/shared/UpdateIndicators.tsx",       type: "Component", description: "Colored dot indicators for data freshness" },
  { path: "src/components/shared/LivePrice.tsx",              type: "Component", description: "Real-time stock price display" },
  { path: "src/components/shared/DisclaimerBanner.tsx",       type: "Component", description: "Legal disclaimer bar" },
  { path: "src/components/PinGate.tsx",                       type: "Component", description: "PIN authentication gate — wraps entire app" },
  { path: "src/components/PinUnlock.tsx",                     type: "Component", description: "iOS-style 6-digit PIN entry keypad" },
  { path: "src/components/shared/PinStatus.tsx",              type: "Component", description: "Nav badge showing PIN/Closed status" },
  { path: "src/components/shared/AiToggle.tsx",               type: "Component", description: "AI analysis on/off toggle in nav" },
  { path: "src/lib/stocks.ts",                                type: "Data",      description: "Stock registry — tickers, names, sectors" },
  { path: "src/lib/schema.ts",                                type: "Data",      description: "Drizzle ORM schema — DB tables" },
  { path: "src/lib/auth-fetch.ts",                            type: "Utility",   description: "PIN-authenticated fetch wrapper" },
  { path: "src/lib/ai-gate.ts",                               type: "Utility",   description: "Server-side AI feature flag" },
  { path: "src/hooks/useHashTab.ts",                           type: "Hook",      description: "URL hash-based tab state (#tab-name)" },
];

const breakpoints = [
  { width: "1200px", label: "Desktop",          changes: "Padding reduces to 32px. g4→2col, g5→3col." },
  { width: "900px",  label: "Tablet",           changes: "Padding 24px. g3/g4/g5→2col. Cards/highlights pad 20px." },
  { width: "768px",  label: "Mobile",           changes: "All grids→1col. Hero stacks. Nav/stats horizontal scroll with fade mask. Touch targets 44px min. sm-* responsive overrides activate." },
  { width: "480px",  label: "Small mobile",     changes: "Tighter padding (12px). Smaller type sizes. Minimal spacing." },
  { width: "360px",  label: "Extra small",      changes: "Hero 12px pad. price-big 32px. nav-btn 11px." },
];

const conventions = [
  {
    title: "CSS Custom Properties for Dynamic Values",
    description: "Never use inline style for color. Instead, set a CSS custom property and let the class consume it.",
    code: `// Good — CSS variable + class
<span className="sm-badge" style={{ '--badge-color': 'var(--mint)' } as React.CSSProperties}>
  Active
</span>

// Bad — inline color
<span style={{ color: 'var(--mint)', background: '...' }}>Active</span>`,
  },
  {
    title: "data-* Attributes for State",
    description: "Use data attributes instead of conditional inline styles. CSS selectors handle the visual state.",
    code: `// Good — data attribute
<div className="sm-preset-btn" data-active={isActive ? "true" : "false"}>

// Bad — ternary in style
<div style={{ background: isActive ? '...' : '...' }}>`,
  },
  {
    title: "CSS :hover Instead of JS Handlers",
    description: "All hover effects use CSS :hover on classes. Never use onMouseEnter/onMouseLeave for styling.",
    code: `// Good — CSS hover via class
<div className="sm-data-row">  {/* :hover in CSS */}

// Bad — JS hover handlers
<div onMouseEnter={e => e.currentTarget.style.background = '...'}>`,
  },
  {
    title: "Computed Dimensions Stay Inline",
    description: "Only truly dynamic computed values (heights, widths, percentages) remain as inline styles.",
    code: `// Acceptable — computed value
<div className="sm-bar" style={{ height: \`\${percentage}%\` }} />
<div className="sm-progress-fill" style={{ width: \`\${pct}%\` }} />`,
  },
  {
    title: "Accent Theming via getStockModelCSS()",
    description: "Each stock calls getStockModelCSS('cyan' | 'violet' | 'mint'). This sets --accent and --accent-dim. All sm-accent references resolve automatically.",
    code: `// In ASTS.tsx
const css = getStockModelCSS('cyan');

// In BMNR.tsx
const css = getStockModelCSS('violet');

// In CRCL.tsx
const css = getStockModelCSS('mint');`,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTS — Small, focused presentation components.
   ───────────────────────────────────────────────────────────────────────────── */

function SectionHeader({ id, title, count }: { id: string; title: string; count?: number }) {
  return (
    <div id={id} className="scroll-mt-20 pt-10 pb-4 border-b border-white/[0.06]">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
        {count !== undefined && (
          <span className="text-[10px] font-mono text-white/20 bg-white/[0.04] px-2 py-0.5 rounded">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}

function ClassTable({ classes }: { classes: CSSClass[] }) {
  return (
    <div className="mt-4 rounded-xl border border-white/[0.06] overflow-hidden">
      <div className="grid grid-cols-[180px_1fr_1fr] bg-white/[0.03] border-b border-white/[0.06]">
        <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Class</div>
        <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Description</div>
        <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Usage</div>
      </div>
      {classes.map((c) => (
        <div key={c.name} className="grid grid-cols-[180px_1fr_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
          <div className="px-4 py-2.5 text-[12px] font-mono text-cyan-400/70">{c.name}</div>
          <div className="px-4 py-2.5 text-[12px] text-white/40">{c.description}</div>
          <div className="px-4 py-2.5 text-[11px] font-mono text-white/20">{c.usage || "—"}</div>
        </div>
      ))}
    </div>
  );
}

function SmallTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 rounded-xl border border-white/[0.06] overflow-hidden">
      <div className={`grid bg-white/[0.03] border-b border-white/[0.06]`} style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((h) => (
          <div key={h} className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">{h}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="grid border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
          {row.map((cell, j) => (
            <div key={j} className={`px-4 py-2.5 text-[12px] ${j === 0 ? 'font-mono text-cyan-400/70' : 'text-white/40'}`}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-white/50 leading-relaxed overflow-x-auto whitespace-pre">
      {code}
    </pre>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */

export default function DocsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-3">
            Design System
          </h1>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-3xl">
            Comprehensive documentation for the ABISON UI — design tokens, CSS utility classes,
            component patterns, project structure, and coding conventions. All styles are defined
            in <span className="font-mono text-white/50">stock-model-styles.ts</span> and consumed
            via class names and CSS custom properties.
          </p>
        </div>

        {/* ── Quick nav ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-white/[0.06]">
          {[
            { id: "tokens",      label: "Tokens" },
            { id: "layout",      label: "Layout" },
            { id: "typography",  label: "Typography" },
            { id: "colors",     label: "Colors" },
            { id: "components", label: "Components" },
            { id: "data-attrs", label: "Data Attrs" },
            { id: "css-vars",   label: "CSS Vars" },
            { id: "responsive", label: "Responsive" },
            { id: "conventions",label: "Conventions" },
            { id: "structure",  label: "Structure" },
            { id: "fonts",      label: "Fonts" },
            { id: "theming",    label: "Theming" },
            { id: "liveprice-classes", label: "LivePrice" },
            { id: "error-classes",     label: "Error" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[11px] font-mono text-white/30 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ── 1. Design Tokens ────────────────────────────────────────────── */}
        <SectionHeader id="tokens" title="Design Tokens" count={designTokens.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Defined in <span className="font-mono text-white/40">:root</span> inside <span className="font-mono text-white/40">getStockModelCSS()</span>.
          Also mirrored in <span className="font-mono text-white/40">globals.css</span> for non-stock pages.
        </p>
        <SmallTable
          headers={["Variable", "Value", "Description"]}
          rows={designTokens.map((t) => [t.name, t.value, t.description])}
        />

        {/* ── 2. Layout Utilities ──────────────────────────────────────────── */}
        <SectionHeader id="layout" title="Layout Utilities" count={layoutClasses.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Prefixed with <span className="font-mono text-white/40">sm-</span> (stock-model). Compose these for flex/grid layouts.
        </p>
        <ClassTable classes={layoutClasses} />

        {/* ── 3. Typography ────────────────────────────────────────────────── */}
        <SectionHeader id="typography" title="Typography" count={typographyClasses.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Two font families: <span className="font-mono text-white/40">Outfit</span> (UI text) and <span className="font-mono text-white/40">Space Mono</span> (numbers, data).
        </p>
        <ClassTable classes={typographyClasses} />

        {/* ── 4. Color Utilities ────────────────────────────────────────────── */}
        <SectionHeader id="colors" title="Color Utilities" count={colorClasses.length} />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {colorClasses.map((c) => (
            <div key={c.name} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-white/50 mb-1">{c.name}</div>
              <div className="text-[10px] text-white/25">{c.description}</div>
            </div>
          ))}
        </div>

        {/* ── 5. Component Patterns ──────────────────────────────────────── */}
        <SectionHeader id="components" title="Component Patterns" count={componentClasses.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Pre-built patterns for panels, grids, badges, data rows, progress bars, and more.
          Dynamic values use CSS custom properties set via <span className="font-mono text-white/40">style=&#123;&#123; &apos;--var&apos;: value &#125;&#125;</span>.
        </p>
        <ClassTable classes={componentClasses} />

        {/* ── 6. Data Attributes ──────────────────────────────────────────── */}
        <SectionHeader id="data-attrs" title="Data Attributes" count={dataAttributes.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          State-driven styling via <span className="font-mono text-white/40">data-*</span> attributes.
          CSS selectors handle the visual change — no JS event handlers needed.
        </p>
        <SmallTable
          headers={["Attribute", "Values", "Effect"]}
          rows={dataAttributes.map((d) => [d.attribute, d.values, d.effect])}
        />

        {/* ── 7. CSS Custom Properties ────────────────────────────────────── */}
        <SectionHeader id="css-vars" title="CSS Custom Properties (Dynamic)" count={cssCustomProperties.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Set via <span className="font-mono text-white/40">style=&#123;&#123; &apos;--var&apos;: value &#125;&#125; as React.CSSProperties</span>.
          The CSS class reads the variable for background, color, or border.
        </p>
        <SmallTable
          headers={["Variable", "Used By", "Purpose"]}
          rows={cssCustomProperties.map((v) => [v.variable, v.usedBy, v.purpose])}
        />

        {/* ── 8. Responsive Breakpoints ───────────────────────────────────── */}
        <SectionHeader id="responsive" title="Responsive Breakpoints" count={breakpoints.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Mobile-first overrides with touch-friendly 44px targets. Fade-mask scroll indicators on nav/stats.
        </p>
        <SmallTable
          headers={["Breakpoint", "Label", "Key Changes"]}
          rows={breakpoints.map((b) => [b.width, b.label, b.changes])}
        />
        <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25 mb-2">Additional Media Queries</div>
          <div className="grid gap-1.5 text-[11px] text-white/35">
            <div><span className="font-mono text-white/45">@media (pointer: coarse)</span> — Touch targets: 44px min for buttons, sliders, pills</div>
            <div><span className="font-mono text-white/45">@media (max-width: 900px) and (orientation: landscape)</span> — 2-col hero grid, tighter padding</div>
            <div><span className="font-mono text-white/45">@media (-webkit-min-device-pixel-ratio: 2)</span> — Retina: 0.5px borders</div>
            <div><span className="font-mono text-white/45">@media (prefers-reduced-motion: reduce)</span> — Kills all animation/transition</div>
            <div><span className="font-mono text-white/45">@media (prefers-color-scheme: dark)</span> — Subtle box-shadow for card depth</div>
          </div>
        </div>

        {/* ── 9. Conventions ──────────────────────────────────────────────── */}
        <SectionHeader id="conventions" title="Coding Conventions" count={conventions.length} />
        <div className="mt-4 grid gap-4">
          {conventions.map((conv) => (
            <div key={conv.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[13px] font-medium text-white/80 mb-1">{conv.title}</div>
              <p className="text-[12px] text-white/35 mb-2">{conv.description}</p>
              <CodeBlock code={conv.code} />
            </div>
          ))}
        </div>

        {/* ── 10. Project Structure ────────────────────────────────────────── */}
        <SectionHeader id="structure" title="Project Structure" count={projectStructure.length} />
        <SmallTable
          headers={["Path", "Type", "Description"]}
          rows={projectStructure.map((f) => [f.path, f.type, f.description])}
        />

        {/* ── 11. Fonts ────────────────────────────────────────────────────── */}
        <SectionHeader id="fonts" title="Font System" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-3">UI Font</div>
            <div className="text-[20px] font-light text-white/80 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Outfit</div>
            <div className="text-[11px] text-white/30">Weights: 300 (light), 400, 500, 600 (semi), 700 (bold), 800</div>
            <div className="text-[11px] text-white/25 mt-1">Used for: headings, labels, body text, buttons, navigation</div>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-3">Data Font</div>
            <div className="text-[20px] text-white/80 mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Space Mono</div>
            <div className="text-[11px] text-white/30">Weights: 400, 700</div>
            <div className="text-[11px] text-white/25 mt-1">Used for: prices, percentages, KPIs, tickers, code, dates</div>
          </div>
        </div>

        {/* ── 12. Theming ──────────────────────────────────────────────────── */}
        <SectionHeader id="theming" title="Accent Theming" />
        <p className="text-[12px] text-white/30 mt-3 mb-4">
          Each stock component calls <span className="font-mono text-white/40">getStockModelCSS(accent)</span> which sets <span className="font-mono text-white/40">--accent</span> and <span className="font-mono text-white/40">--accent-dim</span>.
          All <span className="font-mono text-white/40">.sm-accent</span> classes, active nav buttons, and highlight boxes automatically adopt the stock&apos;s color.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { ticker: "ASTS", color: "cyan",   hex: "#22D3EE", name: "AST SpaceMobile" },
            { ticker: "BMNR", color: "violet", hex: "#A78BFA", name: "BitMine Immersion" },
            { ticker: "CRCL", color: "mint",   hex: "#7EE787", name: "Circle Internet" },
          ].map((stock) => (
            <div key={stock.ticker} className="p-4 rounded-xl border border-white/[0.06] flex items-center gap-4" style={{ background: `linear-gradient(135deg, ${stock.hex}08, transparent)` }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: stock.hex }} />
              <div>
                <div className="text-[12px] font-mono font-semibold" style={{ color: stock.hex }}>{stock.ticker}</div>
                <div className="text-[11px] text-white/30">{stock.name} — {stock.color}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Wall Street Tab Classes ─────────────────────────────────────── */}
        <SectionHeader id="ws-classes" title="Wall Street Tab Classes (sm-ws-*)" count={22} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Scoped to the Wall Street analyst research tab. Panel, firm, report, estimate, and rating components.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-ws-panel", "Surface card with round-16, overflow hidden. data-active for border highlight."],
            [".sm-ws-panel-header", "Padded header row with bottom border. data-open toggles border."],
            [".sm-ws-panel-body", "Padded body container."],
            [".sm-ws-grid-2col", "2-column grid layout for consensus data."],
            [".sm-ws-kpi-grid", "1px-gap grid with visible border pattern."],
            [".sm-ws-rating-bar", "Horizontal stacked bar for rating distribution."],
            [".sm-ws-firm-header", "Clickable firm row — space-between, pointer cursor."],
            [".sm-ws-firm-name", "Firm name text — 15px bold."],
            [".sm-ws-metrics-grid", "Auto-fit metrics grid inside collapsed firm card."],
            [".sm-ws-metric-cell / -val / -label", "Individual metric display with label."],
            [".sm-ws-report", "Report entry row with left border. data-full for expanded state."],
            [".sm-ws-detail-btn", "Detail expand button — violet accent."],
            [".sm-ws-details", "Expanded details container with top border."],
            [".sm-ws-summary", "Pre-formatted summary block."],
            [".sm-ws-assumption", "Assumption chip — rounded pill."],
            [".sm-ws-estimate-grid", "Estimate data row with hover."],
            [".sm-ws-estimate-header", "Table header row for estimates."],
            [".sm-ws-estimate-cell", "Cell in estimate table. data-align='right' for numbers."],
            [".sm-ws-th", "Table header cell — uppercase, surface2 bg."],
            [".sm-ws-table", "Table container with rounded border."],
            [".sm-ws-rating-badge", "Rating badge with --badge-color tint."],
            [".sm-ws-count-badge", "Count badge — data-type='report'|'update' for color."],
          ]}
        />

        {/* ── EDGAR Tab Classes ───────────────────────────────────────────── */}
        <SectionHeader id="edgar-classes" title="EDGAR Tab Classes (sm-ed-*)" count={45} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          SEC filing browser components — filing rows, badges, status indicators, analysis panels, diff views.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-ed-action-btn", "Tiny action button (9px uppercase). Uses --ed-btn-color."],
            [".sm-ed-action-btn-sm", "Smaller inline variant of action button."],
            [".sm-ed-filing-row", "Filing row with flex layout and hover highlight."],
            [".sm-ed-form-badge", "Form type badge (10-K, 8-K etc). Uses --badge-bg, --badge-text."],
            [".sm-ed-status-dot", "7px status indicator dot. Uses --dot-color."],
            [".sm-ed-status-label", "10px uppercase status text. Uses --status-color."],
            [".sm-ed-date", "Monospace date column — right-aligned, fixed width."],
            [".sm-ed-desc", "Description text — truncated with ellipsis."],
            [".sm-ed-chevron-slot", "Fixed-width chevron alignment slot."],
            [".sm-ed-badge-slot", "Fixed-width badge alignment slot."],
            [".sm-ed-new-badge", "NEW badge — sky color with hover effect."],
            [".sm-ed-seen-badge", "SEEN badge — dimmed sky."],
            [".sm-ed-verdict-badge", "Verdict badge. Uses --verdict-color, --verdict-bg."],
            [".sm-ed-db-tooltip", "Absolute-positioned DB info tooltip."],
            [".sm-ed-db-btn", "DB action button. Uses --db-color, --db-opacity."],
            [".sm-ed-crossref", "Cross-reference line container."],
            [".sm-ed-crossref-line", "Individual cross-reference line — monospace, dimmed."],
            [".sm-ed-analysis", "Analysis panel container with top border."],
            [".sm-ed-analysis-pre", "Pre-formatted analysis result."],
            [".sm-ed-filter-pill", "Filter pill button. Uses --pill-color, --pill-bg, --pill-border."],
            [".sm-ed-year-btn", "Year section toggle button."],
            [".sm-ed-hidden-row", "Ghosted/hidden filing row (15% opacity)."],
            [".sm-ed-flowbox / -accent", "Methodology flowchart boxes."],
            [".sm-ed-flowline / .sm-ed-vline", "Vertical connector lines."],
            [".sm-ed-hdivider / .sm-ed-separator", "Horizontal dividers."],
            [".sm-ed-diff-panel / -pre / -add / -del / -hunk", "Diff preview panel with syntax coloring."],
            [".sm-ed-status-bar", "Status bar container."],
            [".sm-ed-legend / .sm-ed-error / .sm-ed-loading", "Legend, error alert, and loading spinner."],
            [".sm-ed-ai-banner", "AI disabled warning banner (gold)."],
            [".sm-ed-copy-btn", "Copy button with data-copied state."],
            [".sm-ed-method-label", "Methodology section header (10px uppercase)."],
            [".sm-ed-method-text", "Methodology mono description text."],
            [".sm-ed-info-card / -lg / -xl", "Methodology info cards (flex: 1 1 160/180/220px)."],
            [".sm-ed-action-btn-ai / -recheck", "Action button variants — uppercase, letter-spacing. Uses --ed-btn-border, --ed-btn-cursor, --ed-btn-opacity."],
            [".sm-ed-db-tooltip-header", "DB tooltip header — 9px uppercase with bottom border."],
            [".sm-ed-db-field-label", "DB tooltip field label — min-width 70px, inline-block."],
            [".sm-ed-db-field-value", "DB tooltip field value — font-weight 600. Uses --field-color."],
            [".sm-ed-db-dot", "5px dot for DB status. Uses --dot-color."],
            [".sm-ed-verdict-badge-expanded", "Expanded verdict badge — inline-flex, 9px, 3×8px padding. Uses --verdict-color, --verdict-bg."],
            [".sm-ed-verdict-explanation", "Verdict explanation text — normal weight, 10px, 70% opacity."],
            [".sm-ed-chevron", "SVG chevron with rotation transition. data-expanded='true' rotates 90°."],
            [".sm-ed-color-dot / -sm", "6px / 5px colored dot. Uses --dot-color."],
            [".sm-ed-patch-badge / -file", "Diff preview badges and file paths."],
            [".sm-ed-status-msg / -pulse-dot / -spinner-text", "Status messages and loading indicators."],
          ]}
        />

        {/* ── Financials Tab Classes ─────────────────────────────────────── */}
        <SectionHeader id="financials-classes" title="Financials Tab Classes (sm-fin-*)" count={10} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Quarterly metrics tables, bar charts, and scroll containers — responsive from 360px to desktop.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-fin-table-header", "Grid header row for quarterly data tables. Bottom border."],
            [".sm-fin-table-row", "Grid data row with subtle bottom border and hover transition."],
            [".sm-fin-th", "Table header cell (10px uppercase). data-sticky for left-pinned, data-latest for accent bg."],
            [".sm-fin-td-label", "Metric name cell — sticky left with bg1 background. 13px/500."],
            [".sm-fin-td", "Data cell — Space Mono monospace, right-aligned. data-latest for accent bg."],
            [".sm-fin-chart", "Flex container for bar charts. Height scales: 220→160→140→120px across breakpoints."],
            [".sm-fin-bar", "Individual bar column (flex: 1). data-overflow='true' for fixed-width mode (>8 bars)."],
            [".sm-scroll-hint", "Adds right-edge gradient fade (::after) to signal scrollable content."],
          ]}
        />

        {/* ── Capital Tab Classes ──────────────────────────────────────────── */}
        <SectionHeader id="capital-classes" title="Capital Tab Classes (sm-cap-*)" count={12} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Share structure, shareholders, offerings, and dilution tables — horizontal scroll nav on mobile, sticky label columns.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-cap-nav", "Navigation grid container. Grid on desktop (--cap-cols), horizontal scroll strip on ≤768px."],
            [".sm-cap-nav-item", "Individual nav card. data-active='true' sets accent border via --accent."],
            [".sm-cap-nav-value", "Large metric value (22px→14px across breakpoints)."],
            [".sm-cap-nav-label", "Nav item label (13px→10px). Below the value."],
            [".sm-cap-nav-sub", "Subtitle text. Hidden at 360px (display: none)."],
            [".sm-cap-table-scroll", "Horizontal scroll wrapper (overflow-x: auto) for data tables."],
            [".sm-cap-table-header", "Grid header row with surface2 background and bottom border."],
            [".sm-cap-table-row", "Grid data row with hover highlight and bottom border."],
            [".sm-cap-th", "Header cell (10px uppercase). data-align='right' for numbers."],
            [".sm-cap-td-label", "Label cell — sticky left on horizontal scroll. 13px/600."],
            [".sm-cap-td", "Data cell — Space Mono monospace. data-align='right', data-highlight for accent color."],
            [".sm-cap-table-total", "Summary/total row with accent-dim background."],
          ]}
        />

        {/* ── Comps Tab Classes ──────────────────────────────────────────── */}
        <SectionHeader id="comps-classes" title="Comps Tab Classes (sm-cmp-*)" count={20} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Comparable company analysis — peer group selectors, peer cards with threat-level borders, metrics grids, valuation tables with sticky labels, and capability tags.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-cmp-filter-btn", "Peer group selector button. data-active='true' sets accent highlight."],
            [".sm-cmp-peer-grid", "2-column card grid for peer cards (1-col at ≤768px)."],
            [".sm-cmp-peer-card", "Individual peer card with left border. data-threat='high|medium|low' colors border. data-self='true' for self-company gradient."],
            [".sm-cmp-card-header", "Card header row (flex-between, flex-start alignment)."],
            [".sm-cmp-card-name", "Company name text (15px, 700 weight)."],
            [".sm-cmp-card-ticker", "Ticker/type subtitle (Space Mono, 11px, text3)."],
            [".sm-cmp-badge-row", "Badge container (flex, gap-6, shrink-0)."],
            [".sm-cmp-badge", "Small badge (10px uppercase). data-level='high|medium|low' for threat colors."],
            [".sm-cmp-metrics-grid", "Auto-fit metrics grid (minmax 80px). Surface2 background, rounded."],
            [".sm-cmp-metric", "Individual metric cell (centered, padded)."],
            [".sm-cmp-metric-value", "Metric number (Space Mono, 13px, 600 weight)."],
            [".sm-cmp-metric-label", "Metric label (9px micro text)."],
            [".sm-cmp-cap-tag", "Capability tag (10px). data-enabled='true' for mint highlight."],
            [".sm-cmp-cap-row", "Capability tag row (flex-wrap, gap-4)."],
            [".sm-cmp-table-scroll", "Horizontal scroll wrapper for valuation tables."],
            [".sm-cmp-table-header", "Grid header row — surface2 bg, bottom border. Set gridTemplateColumns via style."],
            [".sm-cmp-th", "Header cell (11px uppercase, 1px letter-spacing). data-align='right' for numbers."],
            [".sm-cmp-table-row", "Grid data row with hover highlight. Set gridTemplateColumns via style."],
            [".sm-cmp-td", "Data cell (Space Mono, 14px). data-align='right' for right-alignment."],
            [".sm-cmp-td-label", "Sticky label cell — position: sticky, left: 0 for horizontal scroll."],
            [".sm-cmp-table-total", "Summary/total row with 2px top border and 600 weight."],
          ]}
        />

        {/* ── LivePrice & Legend Classes ─────────────────────────────────── */}
        <SectionHeader id="liveprice-classes" title="LivePrice & Legend Classes" count={7} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Real-time price display, refresh button, price change indicators, and update legend toggle.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-refresh-btn", "Transparent refresh button with 8px padding. data-loading='true' sets wait cursor + 50% opacity."],
            [".sm-refresh-icon", "SVG refresh icon — color: text3. data-loading='true' triggers spin animation."],
            [".sm-price-change", "Price change text (12px Space Mono). data-direction='up|down' sets mint/coral color."],
            [".sm-price-change-ts", "Timestamp within price change — text3, 10px, margin-left 8px."],
            [".sm-price-error", "Error message — 11px, coral color, margin-top 4px."],
            [".sm-legend-label", "Sources label — 10px, 500 weight, uppercase, text3."],
            [".sm-legend-toggle", "On/Off toggle button — auto margin-left, border, transition. data-active='true' for highlight."],
          ]}
        />

        {/* ── Error Boundary Classes ──────────────────────────────────────── */}
        <SectionHeader id="error-classes" title="Error Boundary Classes" count={3} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Calculation error fallback UI — coral gradient card with retry button.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-error-boundary", "Error card — coral gradient, 48px padding, centered text, rounded-16."],
            [".sm-error-detail", "Error message detail — 14px Space Mono."],
            [".sm-error-reload", "Reload button — cyan background, 600 weight, rounded-8."],
          ]}
        />

        {/* ── Legacy / Base Classes ───────────────────────────────────────── */}
        <SectionHeader id="base-classes" title="Base Component Classes" count={16} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Original class system — used in hero, stats, navigation, cards, tables, and charts.
          These predate the sm-* utilities and remain in active use.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".hero / .hero-grid / .brand-block / .price-block", "Stock page hero header with gradient background."],
            [".price-big / .price-badge", "Large price display and change badge."],
            [".stats-row / .stat-item", "Horizontal stats bar below hero."],
            [".nav / .nav-btn / .nav-btn.active", "Tab navigation with accent-colored active state."],
            [".nav-dropdown / .nav-dropdown-trigger", "Expandable dropdown tab groups."],
            [".card / .card-title", "Standard surface card with title."],
            [".highlight", "Gradient accent highlight box."],
            [".thesis / .thesis.bull / .thesis.bear", "Investment thesis cards with sentiment colors."],
            [".tbl / .tbl th / .tbl td", "Data table with hover rows and alignment classes."],
            [".bars / .bar-col / .bar / .bar-val / .bar-label", "Vertical bar chart system."],
            [".big-stat / .big-stat .num / .big-stat .lbl", "Large centered statistic display."],
            [".pills / .pill", "Filter pill buttons with active state."],
            [".slider-wrap / .slider-head", "Range slider with label and value display."],
            [".mc-chart / .mc-bar", "Monte Carlo simulation chart bars."],
            [".filter-btn / .filter-btn.active", "Inline filter buttons (competitor filters)."],
            [".g2 / .g3 / .g4 / .g5", "Grid layouts — 2 to 5 columns."],
          ]}
        />

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-6 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/15">
            This documentation is auto-generated from the design system.
            CSS source: <span className="font-mono">src/components/stocks/stock-model-styles.ts</span>.
            Last architecture: Feb 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
