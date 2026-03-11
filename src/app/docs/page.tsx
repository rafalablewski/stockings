import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | ABISON",
  description:
    "ABISON documentation — app architecture, routing, component hierarchy, design system, CSS classes, and conventions",
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
  { name: ".sm-news-tag",        description: "Compact badge/tag (10px, 1×6px pad). Uses --tag-color for border + text", usage: "style={{ '--tag-color': 'var(--mint)' }}" },
  { name: ".sm-callout",         description: "Left-bordered callout panel (3px accent, 11px). Uses --callout-color",     usage: "style={{ '--callout-color': 'var(--cyan)' }}" },
  { name: ".sm-highlight-bar",   description: "Gradient accent strip. Uses --bar-accent-1 / --bar-accent-2",              usage: "style={{ '--bar-accent-1': 'var(--cyan)', '--bar-accent-2': 'var(--mint)' }}" },
  { name: ".sm-note-panel",      description: "Muted info/footnote box — surface bg, border, rounded-16, 14px padding",   usage: "className=\"sm-note-panel sm-text-11\"" },
  { name: ".sm-model-grid",      description: "Responsive grid with CSS var --cols. Auto-adjusts at breakpoints",          usage: "style={{ '--cols': 3 }}" },
  { name: ".sm-overflow-x",      description: "Horizontal scroll container (overflow-x: auto)",                            usage: "className=\"sm-overflow-x sm-scroll-hint\"" },
  // ── Stock Header (Concept 11c — Edge Markers) ──
  { name: ".hdr",                description: "11c header container — gradient bg, red accent line, HUD grid overlay",    usage: "Rendered by <StockHeader />" },
  { name: ".hdr-grid",           description: "Three-column grid (1fr auto 1fr) — identity | price | HUD spine",          usage: "grid-template-columns: 1fr auto 1fr" },
  { name: ".hdr-identity",       description: "Left column — status dot, exchange, ticker (h1), company, metadata",       usage: "Flex column, gap 4px" },
  { name: ".hdr-ticker",         description: "Big ticker symbol — Space Mono 56px/700, 0.05em tracking",                 usage: "<h1 className=\"hdr-ticker\">" },
  { name: ".hdr-meta",           description: "Metadata section — sector, industry, data date in monospace rows",         usage: "Below company name, after separator line" },
  { name: ".hdr-price",          description: "Center column — MARKET PRICE label, gauge arc, big price, change badge",   usage: "Flex column, centered, text-align center" },
  { name: ".hdr-arc-wrap",       description: "Decorative gauge arc container — 280×60px, inline SVG",                    usage: "Uses accent color via .hdr-arc-fill" },
  { name: ".hdr-price-value",    description: "Price number — Space Mono 72px/700, with refresh button",                  usage: "Flex row, gap 12px" },
  { name: ".hdr-change",         description: "Change percentage pill — .up (mint) or .down (coral)",                     usage: "className=\"hdr-change up\"" },
  { name: ".hdr-spine",          description: "Right column — vertical HUD markers with spine line (::before)",           usage: "Flex column, gap 32px, pills on mobile" },
  { name: ".hdr-marker",         description: "Individual HUD marker — label + value, tick mark via ::before",            usage: "data-sentiment=\"positive|negative|neutral\"" },
  { name: ".hdr-stats",          description: "Bottom stats row — centered, 11c style (14px values, 9px labels)",         usage: "Wraps <Stat /> children" },
];

const investmentClasses: CSSClass[] = [
  // ── Glass-Border Pattern ──
  { name: ".sm-inv-glass-list",       description: "Container with 1px gap + var(--border) bg — glass-edge dividers between items. Rounded-12, overflow hidden", usage: "className=\"sm-inv-glass-list\"" },
  { name: ".sm-inv-glass-item",       description: "Standard row — surface bg, flex space-between, hover → surface2. Drivers, moat, position sizing",            usage: "className=\"sm-inv-glass-item\"" },
  { name: ".sm-inv-glass-accent",     description: "Row with 3px left border via --inv-accent. Risk matrix items",                                                usage: "style={{ '--inv-accent': color }}" },
  { name: ".sm-inv-perspective",      description: "Perspective card — top 3px border via --inv-accent. Used in 2×2 perspectives grid",                           usage: "style={{ '--inv-accent': p.color }}" },
  { name: ".sm-inv-severity",         description: "Severity pill — --inv-accent for 20% bg tint + text color. Rounded-full, 11px",                              usage: "style={{ '--inv-accent': color }}" },
  // ── Card & Badge ──
  { name: ".sm-inv-card-accent",      description: "Left 4px border accent via --inv-accent on verdict card",                                                     usage: "style={{ '--inv-accent': 'var(--mint)' }}" },
  { name: ".sm-inv-verdict-badge",    description: "Large colored pill (verdict text) — 18px/700, bg from --inv-accent, text --bg",                               usage: "className=\"sm-inv-verdict-badge\"" },
  { name: ".sm-inv-ticker-badge",     description: "Small accent pill (ticker label) — 12px/600, 15% accent bg",                                                 usage: "className=\"sm-inv-ticker-badge\"" },
  // ── What's New ──
  { name: ".sm-inv-whats-new",        description: "Mint-tinted callout box — 5% mint bg, 20% mint border, rounded-12, 24px padding",                            usage: "className=\"sm-inv-whats-new\"" },
  { name: ".sm-inv-whats-new-list",   description: "Styled <ul> inside what's-new — padding-left 16px, line-height 1.8",                                         usage: "className=\"sm-inv-whats-new-list\"" },
  // ── Data Labels ──
  { name: ".sm-inv-impact-label",     description: "Right-aligned impact/strength label — 12px/600, color from --inv-accent",                                    usage: "style={{ '--inv-accent': d.color }}" },
  { name: ".sm-inv-likelihood",       description: "Subtle pill for risk likelihood — surface2 bg, text3, rounded-full, 11px",                                   usage: "className=\"sm-inv-likelihood\"" },
  { name: ".sm-inv-assess-badge",     description: "Small colored pill in perspectives — --inv-accent bg, 11px/600, rounded-full",                               usage: "style={{ '--inv-accent': p.color }}" },
  // ── Scorecard ──
  { name: ".sm-inv-scorecard-grid",   description: "Auto-fit responsive grid (minmax 200px) for scorecard items. 12px gap",                                      usage: "className=\"sm-inv-scorecard-grid\"" },
  { name: ".sm-inv-scorecard-item",   description: "Scorecard card — flex space-between, surface2 bg, rounded-8, 12px padding",                                  usage: "className=\"sm-inv-scorecard-item\"" },
  { name: ".sm-inv-scorecard-rating", description: "Scorecard rating number — Space Mono 20px/700, uses --rating-color",                                         usage: "style={{ '--rating-color': color }}" },
  // ── Growth Drivers ──
  { name: ".sm-inv-driver-card",      description: "Driver card — surface2, rounded-8, left 3px border via --driver-color",                                      usage: "style={{ '--driver-color': color }}" },
  { name: ".sm-inv-impact-badge",     description: "Impact badge — 11px/600, --impact-color text + 15% tinted bg, rounded-4",                                   usage: "style={{ '--impact-color': color }}" },
  // ── Moat ──
  { name: ".sm-inv-moat-card",        description: "Moat source/threat card — surface2, 12px padding, rounded-8",                                                usage: "className=\"sm-inv-moat-card\"" },
  { name: ".sm-inv-moat-strength",    description: "Moat strength label — 11px, uses --strength-color",                                                          usage: "style={{ '--strength-color': color }}" },
  // ── Risk ──
  { name: ".sm-inv-risk-card",        description: "Risk card — surface2, rounded-8, left 3px border via --severity-color",                                      usage: "style={{ '--severity-color': color }}" },
  { name: ".sm-inv-severity-badge",   description: "Severity/likelihood pill — 10px, surface bg, text3, rounded-4",                                              usage: "className=\"sm-inv-severity-badge\"" },
  // ── Perspectives ──
  { name: ".sm-inv-perspectives-grid",description: "2×2 grid (1-col on mobile) — 1px gap, var(--border) bg, rounded-12, overflow hidden",                        usage: "className=\"sm-inv-perspectives-grid\"" },
  { name: ".sm-inv-perspective-card", description: "Perspective card — surface2, rounded-8, top 3px border via --perspective-color",                              usage: "style={{ '--perspective-color': color }}" },
  { name: ".sm-inv-assessment-badge", description: "Assessment badge — 12px/600, --assess-color text + 10% tinted bg, rounded-4",                               usage: "style={{ '--assess-color': color }}" },
  { name: ".sm-inv-recommendation",   description: "Recommendation box — 12px, mint text, 10% mint bg, rounded-4",                                              usage: "className=\"sm-inv-recommendation\"" },
  // ── Archive ──
  { name: ".sm-inv-archive-row",      description: "Clickable archive entry header — 14×20px padding",                                                           usage: "className=\"sm-inv-archive-row\"" },
  { name: ".sm-inv-archive-detail",   description: "Expanded archive content — 0 20px 14px padding, top border",                                                usage: "className=\"sm-inv-archive-detail\"" },
  { name: ".sm-inv-archive-verdict",  description: "Archive verdict badge — 11px/600, data-sentiment for positive/constructive/neutral colors",                  usage: "data-sentiment=\"positive\"" },
  { name: ".sm-inv-archive-list",     description: "Archive developments list — 12px, text3, padding-left 16px",                                                 usage: "className=\"sm-inv-archive-list\"" },
  { name: ".sm-inv-dev-list",         description: "Key developments <ul> — padding-left 16px, line-height 1.7, margin-top 12px",                                usage: "className=\"sm-inv-dev-list\"" },
  // ── BMNR Ecosystem Health ──
  { name: ".sm-inv-eco-panel",        description: "Ecosystem health container — 8% violet bg, 20% violet border, rounded-12",                                  usage: "className=\"sm-inv-eco-panel\"" },
  { name: ".sm-inv-eco-grid",         description: "Responsive metric grid — 5-col (3 at 768px, 2 at 480px), 8px gap",                                          usage: "className=\"sm-inv-eco-grid\"" },
  { name: ".sm-inv-eco-metric",       description: "Individual metric cell — surface bg, 12px padding, rounded-12, centered",                                   usage: "className=\"sm-inv-eco-metric\"" },
  { name: ".sm-inv-eco-value",        description: "Metric value — Space Mono 13px/600, --inv-accent color",                                                    usage: "className=\"sm-inv-eco-value\"" },
  { name: ".sm-inv-eco-signal",       description: "Signal indicator — 10px, --inv-accent color",                                                               usage: "className=\"sm-inv-eco-signal\"" },
  { name: ".sm-inv-eco-grade",        description: "Overall grade badge — Space Mono 28px/700, --inv-accent color",                                             usage: "className=\"sm-inv-eco-grade\"" },
  { name: ".sm-inv-eco-catalyst",     description: "Catalyst callout box — 10% violet bg, border, rounded-12, 13px text2",                                     usage: "className=\"sm-inv-eco-catalyst\"" },
  // ── Interactive ──
  { name: ".sm-toggle-icon",          description: "Expand/collapse +/- indicator — 18px, text3 color",                                                         usage: "className=\"sm-toggle-icon\"" },
  { name: ".sm-toggle-header",        description: "Collapsible section header — 24px padding, pointer cursor, hover → surface2",                               usage: "className=\"sm-toggle-header\"" },
  { name: ".sm-range-input",          description: "Full-width range slider with mint accent-color",                                                             usage: "className=\"sm-range-input\"" },
  // ── Misc ──
  { name: ".sm-inv-section-sub",      description: "Section sub-header — bottom border at 50% opacity, 8px padding/margin",                                     usage: "className=\"sm-inv-section-sub\"" },
  { name: ".sm-inv-scroll",           description: "Scrollable container — max-height 500px, overflow-y auto",                                                  usage: "className=\"sm-inv-scroll\"" },
  { name: ".sm-inv-bottom-line",      description: "Bottom-line quote — italic accent, surface2 bg, rounded-8, 12px padding",                                   usage: "className=\"sm-inv-bottom-line\"" },
  { name: ".sm-inv-panel-bordered",   description: "Panel with left 4px border via --panel-border-color. 16px margin-bottom",                                   usage: "style={{ '--panel-border-color': color }}" },
  { name: ".sm-justify-end",          description: "justify-content: flex-end utility",                                                                          usage: "className=\"sm-justify-end\"" },
  { name: ".sm-ml-auto",              description: "margin-left: auto utility — push element to end of flex row",                                               usage: "className=\"sm-ml-auto\"" },
];

const navigationClasses: CSSClass[] = [
  // ── Tab Type Indicators ──
  { name: ".nav-btn.tab-tracking",           description: "Tracking tab — 6% mint bg wash (data/actuals)",                        usage: "Applied automatically via tab type" },
  { name: ".nav-btn.tab-projection",         description: "Projection tab — 6% accent bg wash (models/analysis)",                 usage: "Applied automatically via tab type" },
  { name: ".nav-btn.tab-tracking:hover",     description: "Tracking hover — 12% mint bg",                                         usage: "CSS hover" },
  { name: ".nav-btn.tab-projection:hover",   description: "Projection hover — 12% accent bg",                                     usage: "CSS hover" },
  { name: ".nav-btn.tab-tracking.active",    description: "Active tracking — solid mint bg + border",                              usage: "className=\"nav-btn tab-tracking active\"" },
  { name: ".nav-btn.tab-projection.active",  description: "Active projection — solid accent bg + border",                         usage: "className=\"nav-btn tab-projection active\"" },
  // ── Dropdown Groups ──
  { name: ".nav-dropdown",                   description: "Container for expandable tab group (position: relative)",               usage: "Wraps trigger + space" },
  { name: ".nav-dropdown-trigger",           description: "Dropdown toggle button — violet 6% bg, text2 color, chevron",          usage: "className=\"nav-dropdown-trigger\"" },
  { name: ".nav-dropdown-trigger.open",      description: "Open state — surface2 bg, text color",                                  usage: "className=\"nav-dropdown-trigger open\"" },
  { name: ".nav-dropdown-trigger.active",    description: "Active state — solid violet bg, --bg text color",                       usage: "className=\"nav-dropdown-trigger active\"" },
  { name: ".nav-dropdown-chevron",           description: "SVG chevron — rotates 180° when .open applied",                        usage: "className=\"nav-dropdown-chevron open\"" },
  { name: ".nav-dropdown-space",             description: "Collapsible container — height: 0→48px transition, overflow hidden",   usage: "Height set via max-height" },
  { name: ".nav-dropdown-menu",              description: "Inner menu — flex row, gap 2px, fadeSlideIn animation",                 usage: "Inside .nav-dropdown-space" },
  { name: ".nav-dropdown-item",              description: "Sub-tab button — text2 default, surface2 hover, accent active",        usage: "className=\"nav-dropdown-item tab-{type}\"" },
  { name: ".nav-dropdown-item.tab-tracking.active", description: "Active tracking dropdown item — mint bg instead of accent",     usage: "Automatic" },
  // ── Accessibility ──
  { name: ".tab-type-badge",                 description: "Non-color indicator SVG (triangle for projection tabs) — 10×10px",     usage: "Rendered by <ProjectionIcon />" },
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
  { attribute: "data-sentiment", values: "positive | negative | neutral",          effect: "On .hdr-marker: tick color (mint/coral/white) and value text color" },
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
  { variable: "--tag-color",      usedBy: ".sm-news-tag",          purpose: "Tag border + text color (badges, verdicts, filing types)" },
  { variable: "--callout-color",  usedBy: ".sm-callout",           purpose: "Left-border accent color for callout panels" },
  { variable: "--bar-accent-1",   usedBy: ".sm-highlight-bar",     purpose: "First gradient stop for highlight bar" },
  { variable: "--bar-accent-2",   usedBy: ".sm-highlight-bar",     purpose: "Second gradient stop for highlight bar" },
  // ── Investment Tab ──
  { variable: "--inv-accent",          usedBy: ".sm-inv-glass-accent, .sm-inv-card-accent, .sm-inv-verdict-badge, .sm-inv-impact-label, .sm-inv-assess-badge, .sm-inv-severity", purpose: "Dynamic accent for investment cards — verdict, severity, impact, perspective color (fallback: --accent or --border)" },
  { variable: "--dot-bg",             usedBy: "update indicator dots",   purpose: "Update dot background color (PR/SEC/WS sources)" },
  { variable: "--rating-color",       usedBy: ".sm-inv-scorecard-rating", purpose: "Scorecard rating number color" },
  { variable: "--driver-color",       usedBy: ".sm-inv-driver-card",     purpose: "Growth driver card left-border accent" },
  { variable: "--impact-color",       usedBy: ".sm-inv-impact-badge",    purpose: "Impact badge text + 15% tinted background" },
  { variable: "--strength-color",     usedBy: ".sm-inv-moat-strength",   purpose: "Moat strength label color" },
  { variable: "--severity-color",     usedBy: ".sm-inv-risk-card, .sm-inv-severity-badge", purpose: "Risk card left-border and severity badge color" },
  { variable: "--perspective-color",  usedBy: ".sm-inv-perspective-card", purpose: "Perspective card top-border accent" },
  { variable: "--assess-color",       usedBy: ".sm-inv-assessment-badge", purpose: "Assessment badge text + 10% tinted background" },
  { variable: "--panel-border-color", usedBy: ".sm-inv-panel-bordered",  purpose: "Left-border accent for bordered panels" },
];

interface FileEntry {
  path: string;
  type: string;
  description: string;
}

const projectStructure: FileEntry[] = [
  { path: "src/app/layout.tsx",                          type: "Layout",    description: "Root layout — Navigation, Footer, PinGate wrapper" },
  { path: "src/app/globals.css",                         type: "CSS",       description: "Global styles — Tailwind imports, design tokens, scrollbar, base reset" },
  { path: "src/app/page.tsx",                            type: "Page",      description: "Landing page — hero, stats, navigation cards, coverage universe, philosophy" },
  { path: "src/app/research/page.tsx",                  type: "Page",      description: "Research index — sector-grouped coverage, watchlist, initiate new research" },
  { path: "src/app/research/[ticker]/page.tsx",          type: "Page",      description: "Dynamic research route — loads ASTS/BMNR/CRCL components" },
  { path: "src/app/hooks/page.tsx",                      type: "Page",      description: "Agent Hooks documentation page" },
  { path: "src/app/hooks/HookCard.tsx",                  type: "Component", description: "Hook card — View/Copy prompt, config display" },
  { path: "src/app/docs/page.tsx",                       type: "Page",      description: "This documentation page" },
  { path: "src/app/audit/comprehensive-code-audit/page.tsx", type: "Page", description: "Code audit report page" },
  { path: "src/components/stocks/stock-model-styles.css", type: "Styles",    description: "Central CSS file — all sm-* utilities, design tokens, responsive breakpoints" },
  { path: "src/components/stocks/stock-model-styles.ts", type: "Types",     description: "AccentColor type export ('cyan' | 'violet' | 'mint')" },
  { path: "src/components/stocks/ASTS.tsx",              type: "Component", description: "AST SpaceMobile model — golden standard" },
  { path: "src/components/stocks/BMNR.tsx",              type: "Component", description: "BitMine model — mirrors ASTS structure" },
  { path: "src/components/stocks/CRCL.tsx",              type: "Component", description: "Circle model — mirrors ASTS structure" },
  { path: "src/components/shared/StockModelUI.tsx",      type: "Component", description: "Shared primitives: Card, Row, Input, Panel, Guide, CFANotes" },
  { path: "src/components/shared/StockNavigation.tsx",   type: "Component", description: "Tab navigation bar with dropdown support" },
  { path: "src/components/shared/StockChart.tsx",        type: "Component", description: "Interactive stock price chart" },
  { path: "src/components/shared/SharedWallStreetTab.tsx",    type: "Component", description: "Wall Street analyst research tab" },
  { path: "src/components/shared/investmentTypes.ts",         type: "Types",     description: "InvestmentCurrent, ArchiveEntry, SharedInvestmentTabProps — typed render-prop interface" },
  { path: "src/components/shared/SharedInvestmentTab.tsx",    type: "Component", description: "Investment thesis & scorecard — glass-border card pattern, zero inline styles, 10 render-prop slots for stock-specific sections" },
  { path: "src/components/shared/SharedFinancialsTab.tsx",   type: "Component", description: "Financials tab shell: hero, sm-fin-table milestones, CFA notes; children = quarterly section" },
  { path: "src/components/shared/SharedTimelineTab.tsx",     type: "Component", description: "Timeline tab shell: hero + children (SEC filings, event list)" },
  { path: "src/components/shared/SharedSecFilingsSection.tsx", type: "Component", description: "SEC Filings cards for Timeline tab — KPI strip, filter pills, description-first cards, cross-ref source dots" },
  { path: "src/components/shared/SharedEdgarTab.tsx",         type: "Component", description: "SEC EDGAR filings browser" },
  { path: "src/components/shared/SharedSourcesTab.tsx",       type: "Component", description: "Research sources / news feed tab" },
  { path: "src/components/shared/SharedAIAgentsTab.tsx",      type: "Component", description: "AI analysis agents status tab" },
  { path: "src/components/shared/UpdateIndicators.tsx",       type: "Component", description: "Colored dot indicators for data freshness" },
  { path: "src/components/shared/StockHeader.tsx",             type: "Component", description: "Concept 11c Edge Markers header — three-column cockpit layout (identity · price gauge · HUD spine), buildHudMarkers helper, responsive pills on mobile" },
  { path: "src/components/shared/LivePrice.tsx",              type: "Component", description: "Real-time stock price display + MarketData (open, dayHigh/Low, 52W high/low)" },
  { path: "src/components/shared/DisclaimerBanner.tsx",       type: "Component", description: "Collapsible legal disclaimer bar (localStorage-persisted)" },
  { path: "src/components/PinGate.tsx",                       type: "Component", description: "PIN authentication gate — wraps entire app" },
  { path: "src/components/PinUnlock.tsx",                     type: "Component", description: "iOS-style 6-digit PIN entry keypad" },
  { path: "src/components/shared/PinStatus.tsx",              type: "Component", description: "Nav badge showing PIN/Closed status" },
  { path: "src/components/shared/AiToggle.tsx",               type: "Component", description: "AI analysis on/off toggle in nav" },
  { path: "src/components/shared/NotesPanel.tsx",             type: "Component", description: "Global notes scratch-pad — slide-over drawer with create/view/delete; collapsible article preview with AI-generated title & description; zero inline styles (category colors via data-cat attribute)" },
  { path: "src/lib/stocks.ts",                                type: "Data",      description: "Stock registry — tickers, names, sectors" },
  { path: "src/lib/schema.ts",                                type: "Data",      description: "Drizzle ORM schema — DB tables" },
  { path: "src/lib/auth-fetch.ts",                            type: "Utility",   description: "PIN-authenticated fetch wrapper" },
  { path: "src/lib/ai-gate.ts",                               type: "Utility",   description: "Server-side AI feature flag" },
  { path: "src/hooks/useHashTab.ts",                           type: "Hook",      description: "URL hash-based tab state (#tab-name)" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   APP ARCHITECTURE DATA — Hierarchical structure for the Architecture section.
   ───────────────────────────────────────────────────────────────────────────── */

const routingTree = [
  { path: "/",                                     label: "Home",              file: "app/page.tsx",                          note: "Hero, stats, navigation cards, coverage universe" },
  { path: "/research",                             label: "Research",          file: "app/research/page.tsx",                 note: "Sector-grouped coverage, watchlist, initiate research" },
  { path: "/research/[ticker]",                    label: "Stock Detail",      file: "app/research/[ticker]/page.tsx",        note: "Loads ASTS / BMNR / CRCL component" },
  { path: "/docs",                                 label: "Docs",             file: "app/docs/page.tsx",                     note: "This page — design system + architecture" },
  { path: "/hooks",                                label: "Hooks",            file: "app/hooks/page.tsx",                    note: "Agent hooks documentation" },
  { path: "/audit/comprehensive-code-audit",       label: "Code Audit",       file: "app/audit/comprehensive-code-audit/page.tsx", note: "35-category audit results" },
  { path: "/press-intelligence",                    label: "Press Intelligence", file: "app/press-intelligence/page.tsx",      note: "DB-first feed: page load reads DB, Refresh fetches upstream + marks NEW + persists" },
  { path: "/db-setup",                             label: "DB Setup",         file: "app/db-setup/page.tsx",                 note: "Browser-based database initialization" },
];

const apiRoutes = [
  { group: "Auth",      routes: [
    { method: "GET/POST", path: "/api/auth/verify-pin",            auth: "—",   note: "PIN verification" },
  ]},
  { group: "EDGAR",     routes: [
    { method: "GET",  path: "/api/edgar/[ticker]",              auth: "—",   note: "Fetch SEC filings by CIK" },
    { method: "POST", path: "/api/edgar/analyze",               auth: "PIN", note: "AI analysis of filing (Claude)" },
    { method: "POST", path: "/api/edgar/refresh-local",         auth: "—",   note: "Refresh cached filings" },
  ]},
  { group: "Sources",   routes: [
    { method: "POST", path: "/api/sources/analyze",             auth: "PIN", note: "AI analysis of news article (Claude)" },
    { method: "GET",  path: "/api/news/[symbol]",               auth: "—",   note: "Press intelligence news by ticker" },
    { method: "GET",  path: "/api/press-releases/[symbol]",     auth: "—",   note: "IR press releases via RSS" },
    { method: "GET",  path: "/api/press-intelligence?ticker=&mode=",  auth: "—",   note: "Press releases: mode=db (page load, DB-only) or mode=refresh (upstream fetch, mark NEW, persist)" },
    { method: "GET",  path: "/api/competitor-feed/[company]",   auth: "—",   note: "Competitor intelligence feed" },
    { method: "GET",  path: "/api/asts-story",                  auth: "—",   note: "ASTS long-form company narrative" },
  ]},
  { group: "Data",      routes: [
    { method: "GET",  path: "/api/stock/[symbol]",              auth: "—",   note: "Live price (Yahoo Finance)" },
    { method: "POST", path: "/api/seen-articles",               auth: "—",   note: "Track viewed articles in DB" },
    { method: "POST", path: "/api/seen-filings",                auth: "—",   note: "Track viewed filings in DB" },
    { method: "GET/POST", path: "/api/analysis-cache",          auth: "—",   note: "AI analysis cache read/write" },
    { method: "GET",  path: "/api/check-analyzed",              auth: "—",   note: "Check if filing is analyzed" },
  ]},
  { group: "Infra",     routes: [
    { method: "POST", path: "/api/db/setup",                    auth: "—",   note: "Seed database from .ts data files" },
    { method: "POST", path: "/api/audit-checks",                auth: "—",   note: "Persist audit findings" },
    { method: "GET/POST/PATCH/DELETE", path: "/api/notes",      auth: "—",   note: "Global notes CRUD (PATCH updates AI title/description, hidden)" },
    { method: "POST", path: "/api/notes/generate",              auth: "PIN", note: "AI-generate title & description for a note (Claude, AI-gated)" },
    { method: "POST", path: "/api/workflow/run",                auth: "—",   note: "Execute AI agent workflow" },
    { method: "POST", path: "/api/workflow/apply",              auth: "—",   note: "Apply workflow output as patch" },
    { method: "POST", path: "/api/workflow/commit",             auth: "—",   note: "Commit applied workflow changes" },
  ]},
];

const componentHierarchy = [
  { depth: 0, name: "RootLayout",                     file: "app/layout.tsx",         note: "HTML shell, fonts, PinGate" },
  { depth: 1, name: "PinGate",                        file: "components/PinGate.tsx",  note: "Full-screen PIN auth gate" },
  { depth: 2, name: "Navigation",                     file: "app/layout.tsx",         note: "Fixed top nav — dropdowns + mobile hamburger" },
  { depth: 3, name: "PinStatus",                      file: "components/shared/PinStatus.tsx",  note: "Auth indicator badge (desktop nav; mobile → inside MobileNav drawer)" },
  { depth: 3, name: "AiToggle",                       file: "components/shared/AiToggle.tsx",   note: "AI on/off toggle (desktop nav; mobile → inside MobileNav drawer)" },
  { depth: 3, name: "NotesPanel",                     file: "components/shared/NotesPanel.tsx",  note: "Global notes drawer with collapsible AI preview cards (desktop nav; mobile → inside MobileNav drawer); portaled to document.body via createPortal; uses authFetch for AI-gated generate endpoint" },
  { depth: 3, name: "MobileNav",                      file: "components/shared/MobileNav.tsx",  note: "Drawer nav for mobile — receives badges as children; drawer portaled to document.body via createPortal" },
  { depth: 2, name: "main → [Page]",                  file: "",                       note: "Dynamic content area (pt-14)" },
  { depth: 2, name: "Footer",                         file: "app/layout.tsx",         note: "Disclaimer footer" },
];

const stockPageTree = [
  { depth: 0, name: "stocks/[ticker]/page.tsx",           note: "Resolves ticker → ASTS | BMNR | CRCL component" },
  { depth: 1, name: ".stock-model-app[data-accent]",      note: "Scoped reset + accent color (cyan/violet/mint)" },
  { depth: 2, name: "Hero",                               note: "Company name, ticker, live price, stats row" },
  { depth: 3, name: "LivePrice",                          note: "Real-time price from Yahoo Finance" },
  { depth: 2, name: "StockNavigation",                    note: "Tab bar with dropdown groups" },
  { depth: 2, name: "Tab Content (conditional)",           note: "One of the following shared tabs:" },
  { depth: 3, name: "Overview / Model / Capital / Comps",  note: "Stock-specific — rendered inline in ASTS/BMNR/CRCL" },
  { depth: 3, name: "SharedFinancialsTab",                 note: "Quarterly metrics, bar charts, CFA notes" },
  { depth: 3, name: "SharedTimelineTab",                   note: "Event timeline with topic filters" },
  { depth: 4, name: "SharedSecFilingsSection",             note: "SEC filing cards with KPI summary, cross-ref dots" },
  { depth: 3, name: "SharedInvestmentTab",                 note: "Thesis, scorecard, bull/bear, catalysts" },
  { depth: 3, name: "SharedWallStreetTab",                 note: "Analyst coverage, estimates, consensus" },
  { depth: 3, name: "SharedSourcesTab",                    note: "Press releases & news with AI analysis" },
  { depth: 3, name: "SharedEdgarTab",                      note: "SEC filings browser with DB tracking" },
  { depth: 3, name: "SharedAIAgentsTab",                   note: "Workflow execution & diff preview" },
  { depth: 2, name: "DisclaimerBanner",                    note: "Collapsible — localStorage key: disclaimer-collapsed" },
];

interface DBTable {
  name: string;
  purpose: string;
  key: string;
}

const dbTables: DBTable[] = [
  { name: "sec_filings",         purpose: "Tracked SEC filings from research .ts files",     key: "ticker + date + type" },
  { name: "filing_cross_refs",   purpose: "Cross-references linking filings → data sections", key: "ticker + filing_key" },
  { name: "timeline_events",     purpose: "Company events timeline",                          key: "ticker + date" },
  { name: "catalysts",           purpose: "Upcoming/completed milestones",                    key: "ticker + event" },
  { name: "partner_news",        purpose: "Partner & competitor activity",                    key: "ticker + date + entity" },
  { name: "seen_filings",        purpose: "User-viewed filings (NEW/SEEN badge state)",       key: "ticker + accession_number" },
  { name: "seen_articles",       purpose: "User-viewed articles (dismissed state)",           key: "ticker + cache_key" },
  { name: "analysis_cache",      purpose: "AI analysis results (EDGAR + Sources)",            key: "ticker + type + key" },
  { name: "audit_checks",        purpose: "Code audit finding verdicts",                      key: "finding_id" },
  { name: "notes",               purpose: "User notes scratch-pad (article ideas, enhancements, other)", key: "id (auto)" },
];

const dataArchitecture = [
  { layer: "Data Files",   path: "src/data/{asts,bmnr,crcl}/",       note: "Hardcoded .ts files — scaffold (5) + standard (8) + stock-specific per ticker" },
  { layer: "Shared Types", path: "src/data/shared/types.ts",          note: "Central TypeScript interfaces for all data shapes (Partner, ShareClass, Catalyst, Timeline, etc.)" },
  { layer: "Schemas",      path: "src/data/schemas/",                 note: "Zod validation schemas per stock + filing templates" },
  { layer: "DB Schema",    path: "src/lib/schema.ts",                 note: "Drizzle ORM table definitions (10 tables in Neon PostgreSQL)" },
  { layer: "Seed Path",    path: "/api/db/setup → seed-helpers.ts",   note: "Reads .ts data files → inserts into PostgreSQL tables" },
  { layer: "AI Workflows", path: "src/data/workflows.ts",             note: "Agent prompts (earnings calls, code audit, data quality)" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA FILE STRUCTURE — Canonical per-stock file layout.
   Every stock directory follows: Scaffold (5) + Standard (8) + Stock-specific.
   ───────────────────────────────────────────────────────────────────────────── */

interface DataFileEntry {
  file: string;
  tier: 'scaffold' | 'standard' | 'stock-specific';
  type: string;
  exports: string;
  unified: boolean;
  notes?: string;
}

const dataFileStructure: DataFileEntry[] = [
  // ── Scaffold (5) — created by POST /api/research/init ──
  { file: 'company.ts',           tier: 'scaffold',       type: 'DataMetadata, StockDefaults',                  exports: '{TICKER}_METADATA, COMPANY_INFO, DEFAULTS',           unified: false, notes: 'CRCL uses custom MARKET object instead of StockDefaults' },
  { file: 'catalysts.ts',         tier: 'scaffold',       type: 'Catalyst[], CompletedMilestone[]',             exports: 'CATALYSTS_METADATA, UPCOMING_CATALYSTS, COMPLETED_MILESTONES', unified: true },
  { file: 'investment.ts',        tier: 'scaffold',       type: 'InvestmentCurrent, ArchiveEntry[]',            exports: '{TICKER}_INVESTMENT_CURRENT, {TICKER}_INVESTMENT_ARCHIVE',     unified: true, notes: '8-category scorecard framework' },
  { file: 'timeline.ts',          tier: 'scaffold',       type: 'TimelineEntry[] (varies)',                     exports: '{TICKER}_TIMELINE_EVENTS or TIMELINE',                unified: false, notes: 'ASTS/BMNR use custom entry shapes; CRCL uses shared TimelineEntry' },
  { file: 'index.ts',             tier: 'scaffold',       type: 'Barrel',                                       exports: 'Re-exports all files',                                 unified: true },
  // ── Standard (8) — every stock must have ──
  { file: 'analyst-coverage.ts',  tier: 'standard',       type: 'AnalystCoverage[]',                            exports: '{TICKER}_ANALYST_COVERAGE',                            unified: true },
  { file: 'capital.ts',           tier: 'standard',       type: 'ShareClass[], MajorShareholder[], EquityOffering[]', exports: 'CAPITAL_METADATA, SHARE_CLASSES, MAJOR_SHAREHOLDERS, EQUITY_OFFERINGS', unified: false, notes: 'BMNR uses custom share class structure' },
  { file: 'competitor-news.ts',   tier: 'standard',       type: 'CompetitorNewsEntry[] (Zod schema)',           exports: '{TICKER}_COMPETITOR_NEWS or COMPS_TIMELINE',           unified: true, notes: 'All use shared competitor-schema.ts' },
  { file: 'financials.ts',        tier: 'standard',       type: 'QuarterlyFinancials (varies)',                  exports: 'FINANCIALS_METADATA, QUARTERLY_DATA',                  unified: false, notes: 'CRCL uses custom CRCLQuarterlyData interface' },
  { file: 'historical.ts',        tier: 'standard',       type: 'HistoricalPrices, Comparable[]',               exports: 'HISTORICAL_METADATA, HISTORICAL_*',                    unified: true },
  { file: 'press-releases.ts',    tier: 'standard',       type: 'PressRelease[]',                               exports: 'PRESS_RELEASES_METADATA, PRESS_RELEASES',              unified: true },
  { file: 'quarterly-metrics.ts', tier: 'standard',       type: 'Record<string, any> (custom)',                 exports: '{TICKER}_QUARTERLY_DATA',                              unified: false, notes: 'Custom inline objects, not shared type' },
  { file: 'sec-filings.ts',       tier: 'standard',       type: 'SECFiling[], CrossRefs',                       exports: '{TICKER}_SEC_FILINGS, {TICKER}_SEC_META, {TICKER}_FILING_CROSS_REFS', unified: true },
];

const stockSpecificFiles: Array<{ ticker: string; file: string; exports: string; purpose: string }> = [
  { ticker: 'ASTS', file: 'partners.ts',           exports: 'PARTNERS, PARTNER_NEWS, REVENUE_SOURCES',      purpose: 'MNO partnerships (AT&T, Vodafone, etc.) & revenue model' },
  { ticker: 'BMNR', file: 'ethereum-adoption.ts',  exports: 'BMNR_ADOPTION_TIMELINE',                       purpose: 'Institutional ETH adoption tracking' },
  { ticker: 'BMNR', file: 'purchase-history.ts',   exports: 'BMNR_PURCHASE_HISTORY, PURCHASE_HISTORY_METADATA', purpose: 'ETH purchase log with mNAV, prevDayClose, prevDayMarketCap, navPerShare per acquisition (PurchaseRecord interface)' },
  { ticker: 'CRCL', file: 'usdc.ts',               exports: 'USDC_METADATA, USDC_*',                        purpose: 'USDC stablecoin circulation, reserves, market share' },
];

const dataFileAlignment: Array<{ file: string; asts: string; bmnr: string; crcl: string }> = [
  // Scaffold
  { file: 'company.ts',           asts: '✓',       bmnr: '✓',       crcl: '✓ (divergent)' },
  { file: 'catalysts.ts',         asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'investment.ts',        asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'timeline.ts',          asts: '✓',       bmnr: '✓',       crcl: '✓ (divergent)' },
  { file: 'index.ts',             asts: '✓',       bmnr: '✓',       crcl: '✓' },
  // Standard
  { file: 'analyst-coverage.ts',  asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'capital.ts',           asts: '✓',       bmnr: '✓ (divergent)', crcl: '✓' },
  { file: 'competitor-news.ts',   asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'financials.ts',        asts: '✓',       bmnr: '✓',       crcl: '✓ (divergent)' },
  { file: 'historical.ts',        asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'press-releases.ts',    asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'quarterly-metrics.ts', asts: '✓',       bmnr: '✓',       crcl: '✓' },
  { file: 'sec-filings.ts',       asts: '✓',       bmnr: '✓',       crcl: '✓' },
];

const breakpoints = [
  { width: "1200px", label: "Desktop",          changes: "Padding reduces to 32px. g4→2col, g5→3col." },
  { width: "900px",  label: "Tablet",           changes: "Padding 24px. g3/g4/g5→2col. Cards/highlights pad 20px." },
  { width: "768px",  label: "Mobile",           changes: "All grids→1col. Hero stacks. Nav/stats horizontal scroll with fade mask. Touch targets via wider padding (not min-height). sm-* responsive overrides activate." },
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
    description: "Use data attributes instead of conditional inline styles. CSS selectors handle the visual state. For category/variant coloring, use a data-cat (or data-variant) attribute with a --cat-rgb CSS variable resolved per-value — eliminates all runtime rgba() inline styles.",
    code: `// Good — data attribute for boolean state
<div className="sm-preset-btn" data-active={isActive ? "true" : "false"}>

// Good — data-cat for category coloring (NotesPanel pattern)
<button className="notes-cat-btn" data-cat={cat.value} data-active={isActive ? "true" : "false"}>
<span className="notes-card-badge" data-cat={note.category}>

// CSS — each selector sets --cat-rgb, one rule consumes it
.notes-cat-btn[data-cat="article"]     { --cat-rgb: 34,211,238; }
.notes-cat-btn[data-cat="enhancement"] { --cat-rgb: 52,211,153; }
.notes-cat-btn[data-active="true"] {
  border-color: rgba(var(--cat-rgb), 0.3);
  background: rgba(var(--cat-rgb), 0.12);
  color: rgba(var(--cat-rgb), 0.9);
}

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
    title: "Portal Fixed Overlays Out of backdrop-filter Parents",
    description: "CSS backdrop-filter (and filter, transform, perspective) creates a new containing block — position:fixed children are trapped inside the parent's box instead of the viewport. Any full-screen overlay (drawer, backdrop, modal) rendered inside the nav bar or another backdrop-filter parent MUST use createPortal(jsx, document.body) to escape the stacking context. Both MobileNav and NotesPanel use this pattern.",
    code: `// Bad — drawer trapped inside nav's 56px height
function MobileNav() {
  return (
    <>
      <button onClick={toggle}>☰</button>
      <div className="mobile-nav-drawer">…</div>  {/* position:fixed but clipped! */}
    </>
  );
}

// Good — portal to body
import { createPortal } from 'react-dom';

function MobileNav() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const drawer = (
    <>
      <div className="mobile-nav-backdrop" />
      <div className="mobile-nav-drawer">…</div>
    </>
  );

  return (
    <>
      <button onClick={toggle}>☰</button>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}`,
  },
  {
    title: "Accent Theming via data-accent",
    description: "Each stock component sets data-accent on .stock-model-app. CSS selectors in stock-model-styles.css resolve --accent and --accent-dim automatically. All sm-accent references adopt the stock's color.",
    code: `// ASTS.tsx — cyan accent
<div className="stock-model-app" data-accent="cyan">

// BMNR.tsx — violet accent
<div className="stock-model-app" data-accent="violet">

// CRCL.tsx — mint accent
<div className="stock-model-app" data-accent="mint">

// CSS (stock-model-styles.css)
[data-accent="cyan"]  { --accent: var(--cyan);   --accent-dim: var(--cyan-dim); }
[data-accent="violet"]{ --accent: var(--violet); --accent-dim: var(--violet-dim); }
[data-accent="mint"]  { --accent: var(--mint);   --accent-dim: var(--mint-dim); }`,
  },
  {
    title: "Shared tracking tabs (stock-agentic)",
    description: "Financials, Timeline, and Investment tabs use shared components. Each stock passes its own data (from @/data/asts, @/data/bmnr, @/data/crcl). No duplication of layout or styling; gold-standard classes (sm-card, sm-toggle-header, sm-divider) applied in one place.",
    code: `// Financials: SharedFinancialsTab + config + children (quarterly panel)
<SharedFinancialsTab ticker="ASTS" sectionLabel="..." title="Financials" description="..." secFilingConfig={...} milestones={...} cfaNotes={...}>
  <QuarterlyMetricsPanel />
</SharedFinancialsTab>

// Timeline: SharedTimelineTab + children (SEC table, event list)
<SharedTimelineTab sectionLabel="Corporate Events" title="Timeline" description="...">
  {/* SEC filings card, topic filters, event list, CFA notes */}
</SharedTimelineTab>

// Investment: SharedInvestmentTab with render props for stock-specific sections
// Glass-border card pattern, zero inline styles, 10 render-prop slots
<SharedInvestmentTab
  current={investmentCurrent}  // InvestmentCurrent typed object
  archive={investmentArchive}  // ArchiveEntry[]
  ticker="ASTS"
  renderHeaderMetrics={() => <KPIColumns />}
  renderStrategicAssessment={() => <Perspectives />}
  moatDurabilityNote="A- (Strong)..."
/>`,
  },
  {
    title: "Gold-Standard Visual Patterns",
    description: "All tabs use a consistent set of sm-* classes for visual elements. Badges use sm-news-tag with --tag-color. Callout panels use sm-callout with --callout-color. Footnotes and info boxes use sm-note-panel. Data tables (milestones, quarterly metrics) use sm-fin-table-header/row with sm-fin-th/td. SEC filings in Timeline use sm-sec-* card layout (sm-sec-card, sm-sec-badge, sm-sec-desc) with KPI summary and cross-ref source dots. KPI metrics use sm-kpi-cell with sm-kpi-label/value/sub. The Capital tab is the golden standard — all other tabs mirror its visual patterns.",
    code: `// Badge — sm-news-tag
<span className="sm-news-tag" style={{ '--tag-color': 'var(--mint)' } as React.CSSProperties}>CURRENT</span>

// Callout — sm-callout
<div className="sm-callout" style={{ '--callout-color': 'var(--cyan)' } as React.CSSProperties}>Key insight here</div>

// KPI metric cell
<div className="sm-kpi-cell">
  <div className="sm-kpi-label">Revenue</div>
  <div className="sm-kpi-value" style={{ '--kpi-color': 'var(--mint)' } as React.CSSProperties}>$740M</div>
  <div className="sm-kpi-sub">Q3 2025</div>
</div>

// Financial table (milestones, quarterly)
<div className="sm-fin-table-header" style={{ gridTemplateColumns: '130px 1fr' }}>
  <span className="sm-fin-th" data-sticky="">Date</span>
  <span className="sm-fin-th">Event</span>
</div>

// SEC filing card (Timeline tab)
<div className="sm-sec-card">
  <div className="sm-sec-card-top">
    <span className="sm-sec-badge" style={{ '--badge-bg': '...', '--badge-text': '...' }}>8-K</span>
    <span className="sm-sec-desc">Q4 2025 Revenue Guidance $69M</span>
  </div>
  <div className="sm-sec-separator" />
  <div className="sm-sec-meta">
    <span className="sm-sec-date">Feb 14, 2026</span>
    <span className="sm-sec-source-tag"><span className="sm-sec-source-dot" /> financials</span>
  </div>
</div>

// Footnote
<div className="sm-note-panel sm-text-11">Data sourced from SEC filings.</div>`,
  },
  {
    title: "Stock-specific fields and extensibility",
    description: "Shared tab types are designed for many current and future stock-specific fields. Investment: add optional fields to InvestmentCurrent (e.g. priceTargets, catalysts, ecosystemHealth) and optional render props to SharedInvestmentTabProps. Financials: use extraBeforeChildren, extraAfterChildren, and optional secFilingConfig. Timeline: pass all stock-specific content as children; extend TimelineEvent union for new event shapes. Add new optional props to shared types as new stocks need them.",
    code: `// investmentTypes.ts — optional company-specific fields
priceTargets?: PriceTarget[];
catalysts?: Catalyst[];
accumulation?: AccumulationZone[];
ecosystemHealth?: EcosystemHealth;
// + 10 render-prop slots: renderHeaderMetrics, renderAfterScorecard,
// renderBeforeGrowthDrivers, renderGrowthDriversExtra, renderAfterGrowthDrivers,
// renderAfterRiskMatrix, renderStrategicAssessment, renderAccumulation,
// moatDurabilityNote, cfaNotes

// financialsTabTypes.ts — optional slots
extraBeforeChildren?: ReactNode;
extraAfterChildren?: ReactNode;
secFilingConfig?: FinancialsSECConfig;`,
  },
  {
    title: "Investment Tab: Render-Prop Architecture",
    description: "SharedInvestmentTab accepts 10 typed render props. Each injects content at a fixed point in the layout. Only CSS custom property pass-throughs allowed as inline style.",
    code: `// src/components/shared/SharedInvestmentTab.tsx — Layout injection points

Tab Hero
├── Current Assessment (verdict card)
│   └── renderHeaderMetrics()        → KPI columns (right side)
├── Scorecard Grid
│   └── renderAfterScorecard()       → e.g., BMNR Ecosystem Health
├── Executive Summary (What's New)
│   └── renderBeforeGrowthDrivers()  → e.g., CRCL Financial Health, Unit Economics
├── Growth Drivers
│   ├── renderGrowthDriversExtra()   → Extra content at bottom of section
│   └── renderAfterGrowthDrivers()   → e.g., CRCL Valuation Framework
├── Competitive Moat
│   └── moatDurabilityNote           → String appended after moat analysis
├── Risk Matrix
│   └── renderAfterRiskMatrix()      → e.g., CRCL Rate Sensitivity Calculator
├── Strategic Assessment
│   └── renderStrategicAssessment()  → Full perspectives + strategic questions
├── Position Sizing & Price Targets
│   └── renderAccumulation()         → e.g., BMNR Accumulation Zones
├── Archive (expandable entries)
└── CFA Notes
    └── cfaNotes[]                   → Custom term/definition pairs

// TypeScript interface (src/components/shared/investmentTypes.ts)
interface SharedInvestmentTabProps {
  current: InvestmentCurrent;           // Scorecard + thesis + drivers + risks + perspectives
  archive: ArchiveEntry[];              // Historical analysis entries (expandable)
  ticker: string;                       // Stock ticker for display
  renderHeaderMetrics?: () => ReactNode;
  renderAfterScorecard?: () => ReactNode;
  renderBeforeGrowthDrivers?: () => ReactNode;
  renderGrowthDriversExtra?: () => ReactNode;
  renderAfterGrowthDrivers?: () => ReactNode;
  moatDurabilityNote?: string;
  renderAfterRiskMatrix?: () => ReactNode;
  renderStrategicAssessment?: () => ReactNode;
  renderAccumulation?: () => ReactNode;
  cfaNotes?: { term: string; def: string }[];
}`,
  },
  {
    title: "Adding a New Stock — Investment Tab",
    description: "Step-by-step guide for adding a new stock with SharedInvestmentTab. All stock-specific sections use CSS classes from stock-model-styles.css; only CSS custom property pass-throughs allowed as inline style.",
    code: `// 1. Create InvestmentCurrent data object with type annotation
const current: InvestmentCurrent = {
  date: "2026-02-27", source: "PR",
  verdict: "BUY", verdictColor: "mint", tagline: "Strong growth trajectory...",
  scorecard: [/* 8 ScorecardItem objects */],
  executiveSummary: { headline: "...", thesis: "...", bottomLine: "...", whatsNew: ["..."] },
  growthDrivers: [/* GrowthDriver[] with driver, impact, color, detail */],
  moatSources: [/* MoatSource[] */], moatThreats: [/* MoatThreat[] */],
  risks: [/* Risk[] with severity, likelihood, impact, mitigation */],
  perspectives: { cfa: {...}, hedgeFund: {...}, cio: {...}, technicalAnalyst: {...} },
  positionSizing: { aggressive: {...}, growth: {...}, balanced: {...}, conservative: {...} },
};

// 2. Create ArchiveEntry[] array (can be empty initially)
const archive: ArchiveEntry[] = [];

// 3. Render SharedInvestmentTab with required props
<SharedInvestmentTab current={current} archive={archive} ticker="NEWT" />

// 4. Add render props ONLY for stock-specific sections
<SharedInvestmentTab
  current={current} archive={archive} ticker="NEWT"
  renderHeaderMetrics={() => <div className="sm-flex sm-gap-16">...</div>}
  renderAfterScorecard={() => <EcosystemHealth />}
  renderStrategicAssessment={() => <CustomPerspectives />}
  moatDurabilityNote="B+ (Building) — network effects strengthening"
  cfaNotes={[{ term: "ROIC", def: "Return on invested capital..." }]}
/>

// 5. All sm-inv-* classes work automatically — no new CSS needed
//    Only style={{}} allowed: CSS custom property pass-throughs
//    e.g. style={{ '--inv-accent': 'var(--mint)' } as React.CSSProperties}`,
  },
];

const changelogPurchaseHistory: string[][] = [
  ["1", "Purchase History Data", "Filled all 32 ETH purchase entries with mNAV, prevDayClose, prevDayMarketCap, navPerShare; renamed stockPrice→prevDayClose", "purchase-history.ts, bmnr schema"],
  ["2", "Table Columns", "Added Stock (prevDayClose) and Mkt Cap columns to purchase history table with color-coded mNAV values", "BMNR.tsx"],
  ["3", "Methodology Disclaimer", "Added ~100-line header with data sources, reliability ratings (High/Medium/Low), interpolation methodology, and mNAV bias explanation", "purchase-history.ts"],
  ["4", "Purchases Tab Type", "Changed Purchases tab from type: 'tracking' to 'projection' to match other BMNR Analysis dropdown tabs (accent color instead of mint bg)", "BMNR.tsx"],
];

const changelogHeaderFixes: string[][] = [
  ["1", "Nav Badge Heights", "Removed .nav-ai-badge/.nav-pin-badge 44px override. Badges stay 24px. Blanket button min-height removed in #10.", "stock-model-styles.css"],
  ["2", "Collapsible Disclaimer", "DisclaimerBanner now toggles collapse/expand with localStorage persistence (key: disclaimer-collapsed). New .disclaimer-collapsed, .disclaimer-toggle classes.", "DisclaimerBanner.tsx, CSS"],
  ["3", "Hero Header Spacing", "brand-block: flex column, gap 12px. price-block: flex column, align-items flex-end, gap 8px. Removed margin-bottom: 0 overrides.", "stock-model-styles.css"],
  ["4", "Unified .price-updated", "New CSS class replaces inconsistent sm-text-10/sm-mt-4 utilities and inline styles across all 3 stocks.", "ASTS, BMNR, CRCL, CSS"],
  ["5", "Accent-Aware Freshness Badge", ".sm-data-freshness uses var(--accent)/var(--accent-dim) instead of hardcoded colors. CRCL inline styles and BMNR .sm-bmnr-freshness-badge replaced.", "ASTS, BMNR, CRCL, CSS"],
  ["6", "WS Detail Button", ".sm-ws-detail-btn: added border, border-radius 99px (pill), padding 4px 12px (was 4px 0), hover state. Matches .sm-ai-gen-btn style.", "stock-model-styles.css"],
  ["7", "Ed Button Inline Styles", "SharedEdgarTab: ActionBtn refactored + Applied indicator span → data-state='done'. Zero inline styles remain on action buttons.", "SharedEdgarTab.tsx, CSS"],
  ["8", "AI Agents Inline Styles", "SharedAIAgentsTab: all action buttons converted — audit badge → data-variant (violet/gold/muted/mint), Preview/Commit/Confirm btns → data-state (previewing/done/loading/error/disabled) + data-variant (mint/violet/gold). Copy btn → data-state='success', marginLeft → .sm-ml-auto.", "SharedAIAgentsTab.tsx, CSS"],
  ["9", "Sources Tab Inline Styles", "SharedSourcesTab: 6 buttons converted from inline style objects to data-variant (sky/mint/blue), data-state (loading), data-loading, data-active, data-muted attributes. SVG spin now via CSS.", "SharedSourcesTab.tsx, CSS"],
  ["10", "Mobile Button Touch Targets", "Removed blanket min-height: 44px on all .stock-model-app buttons (caused tall narrow buttons on mobile). Replaced with per-class horizontal padding increases — buttons are now wider but short. Affects sm-ed-action-btn, sm-pill-toggle, sm-action-btn, sm-ai-gen-btn, sm-ws-detail-btn, sm-filter-pill, sm-expand-btn.", "stock-model-styles.css"],
];

const changelogDesignUnification: string[][] = [
  ["1", "Chart Spacing", "margin-top: 32px on .sm-chart-guide-card", "stock-model-styles.css"],
  ["2", "Monte Carlo Pills", ".sm-mc-horizon-btn / .sm-mc-sim-btn → .sm-pill-toggle; removed inline alignItems", "ASTS, BMNR, CRCL"],
  ["3", "Comps Filters", ".sm-cmp-filter-btn → .sm-pill-toggle; fixed CRCL data-active boolean→string bug", "ASTS, BMNR, CRCL"],
  ["4", "Bar Chart Trim", ".slice(-5) on all financials bar charts — 5 latest periods only", "ASTS, BMNR, CRCL"],
  ["5", "Milestones Layout", "Replaced 6 inline styles with .sm-fin-milestone-* CSS classes; max-width: 680px", "SharedFinancialsTab, CSS"],
  ["6", "Investment Dots", "Deleted inline UpdateIndicators (8px, hex) → canonical shared component (5px, tokens)", "SharedInvestmentTab"],
  ["7", "Verdict Badge", ".sm-inv-verdict-badge refined (13px, uppercase, tracking); removed duplicate CSS; fixed BMNR verdictColor", "CSS, BMNR"],
  ["8", "Duplicate Dividers", "Removed 4 redundant dividers matching CollapsibleSection titles; kept 5 distinct group headers", "SharedInvestmentTab"],
  ["9", "Wall Street Dots", "Canonical UpdateIndicators import (same fix as task 6)", "SharedWallStreetTab"],
  ["10", "AI Summary Btn", "New .sm-ai-gen-btn (violet pill); placed in Investment archive + Wall Street report details", "CSS, SharedInvestmentTab, SharedWallStreetTab"],
];

const changelogEarlierFixes: string[][] = [
  ["1", "Investment Page Freshness", "Fixed", "SharedInvestmentTab.tsx — all 3 stocks use unified 8-category scorecard framework"],
  ["2", "Timeline Ordering (CRCL)", "Fixed", "Events sorted newest-first; data files annotated 'Add at BEGINNING of array'"],
  ["3", "Press Releases Display", "Fixed", "Default 5 items + Show More button (styled like SEC filings section)"],
  ["4", "Methodology Section", "Fixed", "Redesigned with typography hierarchy, 24px padding, step-by-step grid layout"],
  ["5", "Peer Charts (ASTS Comps)", "Verify", "Improved scaling (280–500px), 28px bars, 35% opacity, horizontal grid lines"],
  ["6", "Financial Chart Responsiveness", "Verify", "Dynamic minWidth, touch-scroll, smart flex, 220px height, 12px bar gap"],
  ["7", "Global Spacing", "Verify", "Spacing constants in src/lib/spacing.ts — 8/16/24/32/48/64px scale"],
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
      <div className={`docs-dynamic-grid bg-white/[0.03] border-b border-white/[0.06]`} data-cols={headers.length}>
        {headers.map((h) => (
          <div key={h} className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">{h}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="docs-dynamic-grid border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors" data-cols={headers.length}>
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

function TreeRow({ depth, name, detail, mono }: { depth: number; name: string; detail: string; mono?: boolean }) {
  const connector = depth === 0 ? "" : "├─ ";
  return (
    <div className="flex items-baseline gap-2 py-1 hover:bg-white/[0.02] transition-colors docs-tree-row" data-indent={depth}>
      {depth > 0 && <span className="text-[10px] font-mono text-white/15 select-none">{connector}</span>}
      <span className={`text-[12px] ${mono ? 'font-mono text-cyan-400/70' : 'font-medium text-white/70'}`}>{name}</span>
      <span className="text-[11px] text-white/25">{detail}</span>
    </div>
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
            Documentation
          </h1>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-3xl">
            Comprehensive documentation for the ABISON platform — app architecture, routing,
            component hierarchy, data flow, design tokens, CSS utility classes, and coding
            conventions. All styles are defined in <span className="font-mono text-white/50">stock-model-styles.css</span> and
            consumed via class names, CSS custom properties, and <span className="font-mono text-white/50">data-accent</span> attributes.
          </p>
        </div>

        {/* ── Quick nav ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-white/[0.06]">
          {[
            { id: "architecture",label: "Architecture", accent: true },
            { id: "routing",     label: "Routing" },
            { id: "components",  label: "Components" },
            { id: "stock-page",  label: "Stock Page" },
            { id: "api",         label: "API Routes" },
            { id: "database",    label: "Database" },
            { id: "data-flow",   label: "Data Flow" },
            { id: "data-files",  label: "Data Files" },
            { id: "tokens",      label: "Tokens" },
            { id: "layout",      label: "Layout" },
            { id: "typography",  label: "Typography" },
            { id: "colors",      label: "Colors" },
            { id: "component-patterns", label: "Patterns" },
            { id: "navigation",  label: "Navigation" },
            { id: "bmnr-classes", label: "BMNR" },
            { id: "investment",  label: "Investment" },
            { id: "data-attrs",  label: "Data Attrs" },
            { id: "css-vars",    label: "CSS Vars" },
            { id: "responsive",  label: "Responsive" },
            { id: "conventions", label: "Conventions" },
            { id: "structure",   label: "Files" },
            { id: "fonts",       label: "Fonts" },
            { id: "theming",     label: "Theming" },
            { id: "changelog",   label: "Changelog" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                'accent' in item && item.accent
                  ? 'text-cyan-400/60 bg-cyan-400/[0.06] border-cyan-400/[0.12] hover:bg-cyan-400/[0.12] hover:text-cyan-400/80'
                  : 'text-white/30 bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:text-white/50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            APP ARCHITECTURE
            ════════════════════════════════════════════════════════════════════ */}

        <div id="architecture" className="scroll-mt-20 pt-10 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-white">App Architecture</h2>
            <span className="text-[10px] font-mono text-cyan-400/40 bg-cyan-400/[0.06] px-2 py-0.5 rounded border border-cyan-400/[0.08]">
              Next.js 16 · React 19 · TypeScript · Tailwind v4 · Drizzle ORM · Neon PostgreSQL
            </span>
          </div>
        </div>
        <p className="text-[12px] text-white/30 mt-3 mb-6">
          ABISON is an investment research platform tracking three companies (ASTS, BMNR, CRCL).
          Each stock has a dedicated financial model component backed by hardcoded data files,
          with shared tabs for EDGAR filings, sources, financials, timeline, and Wall Street coverage.
          AI analysis is powered by Claude via PIN-protected API routes. All state is persisted to Neon PostgreSQL.
        </p>

        {/* ── Routing ──────────────────────────────────────────────────────── */}
        <SectionHeader id="routing" title="Page Routes" count={routingTree.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Next.js App Router — file-based routing under <span className="font-mono text-white/40">src/app/</span>.
        </p>
        <div className="mt-4 rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[160px_180px_1fr_1fr] bg-white/[0.03] border-b border-white/[0.06]">
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Route</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Label</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">File</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Description</div>
          </div>
          {routingTree.map((r) => (
            <div key={r.path} className="grid grid-cols-[160px_180px_1fr_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="px-4 py-2.5 text-[12px] font-mono text-cyan-400/70">{r.path}</div>
              <div className="px-4 py-2.5 text-[12px] text-white/60">{r.label}</div>
              <div className="px-4 py-2.5 text-[11px] font-mono text-white/25">{r.file}</div>
              <div className="px-4 py-2.5 text-[11px] text-white/30">{r.note}</div>
            </div>
          ))}
        </div>

        {/* ── Component Hierarchy ──────────────────────────────────────────── */}
        <SectionHeader id="components" title="Component Hierarchy" />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          App shell — every page is wrapped in PinGate → Navigation → main → Footer.
        </p>
        <div className="mt-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          {componentHierarchy.map((c, i) => (
            <TreeRow key={i} depth={c.depth} name={c.name} detail={c.note} />
          ))}
        </div>

        {/* ── Stock Page Tree ──────────────────────────────────────────────── */}
        <SectionHeader id="stock-page" title="Stock Page Structure" />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Each stock page renders a monolithic component (ASTS / BMNR / CRCL) with shared tabs.
          The <span className="font-mono text-white/40">data-accent</span> attribute sets the stock&apos;s accent color.
        </p>
        <div className="mt-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          {stockPageTree.map((c, i) => (
            <TreeRow key={i} depth={c.depth} name={c.name} detail={c.note} />
          ))}
        </div>

        {/* ── API Routes ──────────────────────────────────────────────────── */}
        <SectionHeader id="api" title="API Routes" count={apiRoutes.reduce((n, g) => n + g.routes.length, 0)} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Serverless API routes under <span className="font-mono text-white/40">src/app/api/</span>.
          PIN-protected routes require <span className="font-mono text-white/40">x-auth-pin</span> header (checked in middleware.ts).
        </p>
        {apiRoutes.map((group) => (
          <div key={group.group} className="mt-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25 mb-2">{group.group}</div>
            <div className="rounded-xl border border-white/[0.06] overflow-hidden">
              {group.routes.map((r) => (
                <div key={r.path} className="grid grid-cols-[70px_1fr_50px_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                  <div className="px-4 py-2 text-[10px] font-mono text-white/20">{r.method}</div>
                  <div className="px-4 py-2 text-[12px] font-mono text-cyan-400/70">{r.path}</div>
                  <div className={`px-4 py-2 text-[10px] font-mono ${r.auth === 'PIN' ? 'text-yellow-400/50' : 'text-white/15'}`}>{r.auth}</div>
                  <div className="px-4 py-2 text-[11px] text-white/30">{r.note}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── Database ────────────────────────────────────────────────────── */}
        <SectionHeader id="database" title="Database Schema" count={dbTables.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Neon PostgreSQL (serverless, HTTP-based) via Drizzle ORM. Schema in <span className="font-mono text-white/40">src/lib/schema.ts</span>.
        </p>
        <div className="mt-4 rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[180px_1fr_1fr] bg-white/[0.03] border-b border-white/[0.06]">
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Table</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Purpose</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Primary Key</div>
          </div>
          {dbTables.map((t) => (
            <div key={t.name} className="grid grid-cols-[180px_1fr_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="px-4 py-2.5 text-[12px] font-mono text-cyan-400/70">{t.name}</div>
              <div className="px-4 py-2.5 text-[12px] text-white/40">{t.purpose}</div>
              <div className="px-4 py-2.5 text-[11px] font-mono text-white/20">{t.key}</div>
            </div>
          ))}
        </div>

        {/* ── Data Flow ──────────────────────────────────────────────────── */}
        <SectionHeader id="data-flow" title="Data Architecture" count={dataArchitecture.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Stock data flows from hardcoded TypeScript files → seeded into PostgreSQL → read by shared tab components.
          AI workflows can patch .ts files, then re-seed the database to keep them in sync.
        </p>
        <div className="mt-4 grid gap-3">
          {dataArchitecture.map((d, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/25 w-28 flex-shrink-0 pt-0.5">{d.layer}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-mono text-cyan-400/60">{d.path}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{d.note}</div>
              </div>
              {i < dataArchitecture.length - 1 && (
                <div className="text-[14px] text-white/10 flex-shrink-0 pt-0.5">↓</div>
              )}
            </div>
          ))}
        </div>

        {/* ── Data File Structure ──────────────────────────────────────── */}
        <SectionHeader id="data-files" title="Data File Structure" count={dataFileStructure.length + stockSpecificFiles.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Every stock directory follows a canonical layout: <span className="font-mono text-white/40">Scaffold (5)</span> files
          created by <span className="font-mono text-white/40">POST /api/research/init</span>,
          <span className="font-mono text-white/40"> Standard (8)</span> files every stock must have, plus optional stock-specific files.
        </p>

        {/* Directory tree */}
        <div className="mt-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-[12px] leading-[1.8]">
          <div className="text-white/50">src/data/&lt;ticker&gt;/</div>
          <div className="text-white/20 ml-4">│</div>
          <div className="text-white/20 ml-4">│   <span className="text-cyan-400/40">SCAFFOLD (5) — init creates these</span></div>
          <div className="text-white/35 ml-4">├── company.ts</div>
          <div className="text-white/35 ml-4">├── catalysts.ts</div>
          <div className="text-white/35 ml-4">├── investment.ts</div>
          <div className="text-white/35 ml-4">├── timeline.ts</div>
          <div className="text-white/35 ml-4">├── index.ts</div>
          <div className="text-white/20 ml-4">│</div>
          <div className="text-white/20 ml-4">│   <span className="text-cyan-400/40">STANDARD (8) — every stock must have</span></div>
          <div className="text-white/35 ml-4">├── analyst-coverage.ts</div>
          <div className="text-white/35 ml-4">├── capital.ts</div>
          <div className="text-white/35 ml-4">├── competitor-news.ts</div>
          <div className="text-white/35 ml-4">├── financials.ts</div>
          <div className="text-white/35 ml-4">├── historical.ts</div>
          <div className="text-white/35 ml-4">├── press-releases.ts</div>
          <div className="text-white/35 ml-4">├── quarterly-metrics.ts</div>
          <div className="text-white/35 ml-4">├── sec-filings.ts</div>
          <div className="text-white/20 ml-4">│</div>
          <div className="text-white/20 ml-4">│   <span className="text-cyan-400/40">STOCK-SPECIFIC — optional per domain</span></div>
          <div className="text-white/35 ml-4">├── partners.ts              <span className="text-white/15">ASTS only</span></div>
          <div className="text-white/35 ml-4">├── ethereum-adoption.ts     <span className="text-white/15">BMNR only</span></div>
          <div className="text-white/35 ml-4">└── usdc.ts                  <span className="text-white/15">CRCL only</span></div>
        </div>

        {/* File detail table */}
        <div className="mt-6 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">Scaffold &amp; Standard Files</h3>
          <p className="text-[11px] text-white/25 mt-1">Types, exports, and structural alignment across all three stocks.</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[140px_60px_1fr_1fr] bg-white/[0.03] border-b border-white/[0.06]">
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">File</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Tier</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Type / Interface</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Notes</div>
          </div>
          {dataFileStructure.map((f) => (
            <div key={f.file} className="grid grid-cols-[140px_60px_1fr_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="px-4 py-2.5 text-[12px] font-mono text-cyan-400/70">{f.file}</div>
              <div className="px-4 py-2.5">
                <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${f.tier === 'scaffold' ? 'text-cyan-400/50 bg-cyan-400/[0.06]' : 'text-violet-400/50 bg-violet-400/[0.06]'}`}>
                  {f.tier === 'scaffold' ? 'SCAF' : 'STD'}
                </span>
              </div>
              <div className="px-4 py-2.5 text-[11px] font-mono text-white/30">{f.type}</div>
              <div className="px-4 py-2.5 text-[11px] text-white/25">
                {f.unified ? <span className="text-emerald-400/50">Unified</span> : <span className="text-amber-400/50">Divergent</span>}
                {f.notes && <span className="text-white/20"> — {f.notes}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Stock-specific files */}
        <div className="mt-6 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">Stock-Specific Files</h3>
        </div>
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[60px_160px_1fr_1fr] bg-white/[0.03] border-b border-white/[0.06]">
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Ticker</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">File</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Exports</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Purpose</div>
          </div>
          {stockSpecificFiles.map((f) => (
            <div key={f.file} className="grid grid-cols-[60px_160px_1fr_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="px-4 py-2.5 text-[12px] font-mono text-white/50">{f.ticker}</div>
              <div className="px-4 py-2.5 text-[12px] font-mono text-cyan-400/70">{f.file}</div>
              <div className="px-4 py-2.5 text-[11px] font-mono text-white/30">{f.exports}</div>
              <div className="px-4 py-2.5 text-[11px] text-white/25">{f.purpose}</div>
            </div>
          ))}
        </div>

        {/* Per-stock alignment matrix */}
        <div className="mt-6 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">Per-Stock Alignment</h3>
          <p className="text-[11px] text-white/25 mt-1">Whether each stock has the file and uses the shared type.</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[160px_1fr_1fr_1fr] bg-white/[0.03] border-b border-white/[0.06]">
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">File</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-400/40">ASTS</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-400/40">BMNR</div>
            <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400/40">CRCL</div>
          </div>
          {dataFileAlignment.map((f) => (
            <div key={f.file} className="grid grid-cols-[160px_1fr_1fr_1fr] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="px-4 py-2.5 text-[12px] font-mono text-white/40">{f.file}</div>
              <div className={`px-4 py-2.5 text-[11px] ${f.asts.includes('divergent') ? 'text-amber-400/50' : 'text-emerald-400/40'}`}>{f.asts}</div>
              <div className={`px-4 py-2.5 text-[11px] ${f.bmnr.includes('divergent') ? 'text-amber-400/50' : 'text-emerald-400/40'}`}>{f.bmnr}</div>
              <div className={`px-4 py-2.5 text-[11px] ${f.crcl.includes('divergent') ? 'text-amber-400/50' : 'text-emerald-400/40'}`}>{f.crcl}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-4 border-t border-white/[0.06]" />
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/15 mb-8">Design System</div>

        {/* ── 1. Design Tokens ────────────────────────────────────────────── */}
        <SectionHeader id="tokens" title="Design Tokens" count={designTokens.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Defined in <span className="font-mono text-white/40">:root</span> inside <span className="font-mono text-white/40">stock-model-styles.css</span>.
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
        <SectionHeader id="component-patterns" title="Component Patterns" count={componentClasses.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Pre-built patterns for panels, grids, badges, data rows, progress bars, and more.
          Dynamic values use CSS custom properties set via <span className="font-mono text-white/40">style=&#123;&#123; &apos;--var&apos;: value &#125;&#125;</span>.
        </p>
        <ClassTable classes={componentClasses} />

        {/* ── 5b. Navigation Tab System ─────────────────────────────────── */}
        <SectionHeader id="navigation" title="Navigation Tab System" count={navigationClasses.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Tab navigation supports two visual types: <span className="font-mono text-white/40">tracking</span> (mint — actual data/tracking tabs) and{" "}
          <span className="font-mono text-white/40">projection</span> (accent — model/analysis tabs). Type is set via{" "}
          <span className="font-mono text-white/40">type: &apos;tracking&apos; | &apos;projection&apos;</span> on tab definitions in each stock component.
          Dropdown groups (e.g. &quot;BMNR Analysis&quot;) use <span className="font-mono text-white/40">.nav-dropdown</span> with animated expand/collapse.
          Projection tabs render a <span className="font-mono text-white/40">&lt;ProjectionIcon /&gt;</span> triangle badge for non-color visual differentiation.
          Background washes use <span className="font-mono text-white/40">color-mix(in srgb, ...)</span> for transparent tints.
        </p>
        <ClassTable classes={navigationClasses} />

        {/* ── 5c. Investment Tab Classes ─────────────────────────────────── */}
        <SectionHeader id="investment" title="Investment Tab Classes (sm-inv-*)" count={investmentClasses.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Glass-border card pattern for <span className="font-mono text-white/40">SharedInvestmentTab</span>. All classes in{" "}
          <span className="font-mono text-white/40">stock-model-styles.css</span>.
          Dynamic color via <span className="font-mono text-white/40">--inv-accent</span> CSS custom property.
        </p>
        <ClassTable classes={investmentClasses} />

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
          Mobile-first overrides with touch-friendly padding (wider buttons, not taller). Fade-mask scroll indicators on nav/stats.
        </p>
        <SmallTable
          headers={["Breakpoint", "Label", "Key Changes"]}
          rows={breakpoints.map((b) => [b.width, b.label, b.changes])}
        />
        <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25 mb-2">Additional Media Queries</div>
          <div className="grid gap-1.5 text-[11px] text-white/35">
            <div><span className="font-mono text-white/45">@media (pointer: coarse)</span> — Touch targets via wider horizontal padding per button class. 44px min-height only on nav-btn and nav-dropdown-item. Sliders get 44px height.</div>
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
            <div className="text-[20px] font-light text-white/80 mb-1 docs-font-outfit">Outfit</div>
            <div className="text-[11px] text-white/30">Weights: 300 (light), 400, 500, 600 (semi), 700 (bold), 800</div>
            <div className="text-[11px] text-white/25 mt-1">Used for: headings, labels, body text, buttons, navigation</div>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-3">Data Font</div>
            <div className="text-[20px] text-white/80 mb-1 docs-font-space-mono">Space Mono</div>
            <div className="text-[11px] text-white/30">Weights: 400, 700</div>
            <div className="text-[11px] text-white/25 mt-1">Used for: prices, percentages, KPIs, tickers, code, dates</div>
          </div>
        </div>

        {/* ── 12. Theming ──────────────────────────────────────────────────── */}
        <SectionHeader id="theming" title="Accent Theming" />
        <p className="text-[12px] text-white/30 mt-3 mb-4">
          Each stock component sets <span className="font-mono text-white/40">data-accent</span> on the <span className="font-mono text-white/40">.stock-model-app</span> root. CSS attribute selectors in <span className="font-mono text-white/40">stock-model-styles.css</span> resolve <span className="font-mono text-white/40">--accent</span> and <span className="font-mono text-white/40">--accent-dim</span>.
          All <span className="font-mono text-white/40">.sm-accent</span> classes, active nav buttons, and highlight boxes automatically adopt the stock&apos;s color.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { ticker: "ASTS", color: "cyan",   hex: "#22D3EE", name: "AST SpaceMobile" },
            { ticker: "BMNR", color: "violet", hex: "#A78BFA", name: "BitMine Immersion" },
            { ticker: "CRCL", color: "mint",   hex: "#7EE787", name: "Circle Internet" },
          ].map((stock) => (
            <div key={stock.ticker} className="p-4 rounded-xl border border-white/[0.06] flex items-center gap-4 docs-stock-card" data-stock-color={stock.color}>
              <div className="w-3 h-3 rounded-full flex-shrink-0 docs-stock-dot" data-stock-color={stock.color} />
              <div>
                <div className="text-[12px] font-mono font-semibold docs-stock-ticker" data-stock-color={stock.color}>{stock.ticker}</div>
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
            [".sm-ws-detail-btn", "Detail expand button — violet pill (4px 12px padding, 99px radius, border, hover state)."],
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
            [".sm-ed-action-btn", "Tiny action button (9px uppercase). Uses --ed-btn-color. data-variant: mint/coral/blue/sky/violet/gold. data-state: loading/success/error/disabled/previewing/done."],
            [".sm-ed-action-btn-sm", "Smaller inline variant. data-variant: accent/mint/blue/violet/gold/muted. data-state: loading/success. data-loading, data-active, data-muted."],
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

        {/* ── SEC Filings Timeline Classes ────────────────────────────── */}
        <SectionHeader id="sec-timeline-classes" title="SEC Filings Timeline Classes (sm-sec-*)" count={16} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Description-first filing cards for the Timeline tab — KPI summary, filter pills, cross-reference source dots.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-sec-list", "Vertical stack container for filing cards (8px gap)."],
            [".sm-sec-card", "Filing card — surface bg, 12px radius, 1px border, hover lift."],
            [".sm-sec-card-top", "Top row: badge + description (flex, gap 12px)."],
            [".sm-sec-badge", "Form type badge (9px uppercase). Uses --badge-bg, --badge-text."],
            [".sm-sec-desc", "Description text — 13px, --text, line-height 1.6."],
            [".sm-sec-separator", "Dotted line between description and meta row."],
            [".sm-sec-meta", "Meta row — flex, 10px, --text3, gap 8px."],
            [".sm-sec-date", "Date in Space Mono (10px, dim)."],
            [".sm-sec-period", "Period label (e.g. 'Q4 2025') — accent color."],
            [".sm-sec-dot-sep", "Middle-dot separator between meta items."],
            [".sm-sec-sources", "Container for cross-ref source tags."],
            [".sm-sec-source-tag", "Source tag with dot + label. Uses --src-color."],
            [".sm-sec-source-dot", "5px circle dot. Color from --src-color."],
            [".sm-sec-pill-count", "Count badge inside filter pills (9px mono)."],
            [".sm-sec-footer", "Footer with CIK/ticker/exchange + last PR."],
            [".sm-sec-footer-meta", "Meta line inside footer (flex-wrap, gap 16px)."],
          ]}
        />

        {/* ── BMNR Classes ──────────────────────────────────────────────── */}
        <SectionHeader id="bmnr-classes" title="BMNR Model Classes (sm-bmnr-*)" count={91} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          BitMine-specific classes — parameter panels, scenario selectors, staking cells, KPI values, methodology badges,
          purchase history table helpers, debt/LTV stress testing, tranche management, and extracted inline style classes
          for Comps, Monte Carlo, DCF, Sensitivity, and Capital tabs.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-bmnr-param-panel", "Parameter card wrapper — surface bg, border, rounded-16. data-disabled for dimming."],
            [".sm-bmnr-param-grid", "7-column button grid. data-disabled for pointer-events: none."],
            [".sm-bmnr-param-btn", "Preset value selector — centered, mono, 12px. data-active + --btn-color for selected state."],
            [".sm-bmnr-custom-wrap / -input", "Custom value input — flex row, surface2 bg, 13px Space Mono, rounded-8."],
            [".sm-bmnr-scale-label", "Scale endpoints (← Bearish | Bullish →) — 11px, text3, flex-between."],
            [".sm-bmnr-scenario-grid", "6-column preset grid — 1px gap, border bg (glass-edge pattern)."],
            [".sm-bmnr-scenario-cell", "Scenario card — centered, surface bg. data-active + --scenario-color for 8% tint."],
            [".sm-bmnr-scenario-btn", "Scenario toggle button — 12px mono. data-active + --btn-color for 2px border."],
            [".sm-bmnr-scenario-detail", "Expanded scenario detail card — surface bg, border, rounded-16."],
            [".sm-bmnr-custom-notice", "Custom scenario info box — 8px 12px padding, surface2 bg."],
            [".sm-bmnr-mode-card", "Mode toggle card (current/growth) — 16px pad, rounded-12. data-active + --mode-color."],
            [".sm-bmnr-mode-icon / -label", "Mode icon (20px) and label (13px/600)."],
            [".sm-bmnr-mode-status", "Mode status banner — data-mode='current' (mint 10%) or 'growth' (cyan 10%)."],
            [".sm-bmnr-mode-color", "ETH input mode color — data-active + data-mode: current=mint, growth=cyan, inactive=text."],
            [".sm-bmnr-kpi-val / -lg / -xl", "KPI values — Space Mono 18px/22px/28px, bold, --kpi-color."],
            [".sm-bmnr-kpi-val--hero / --md / --sm", "KPI size overrides — hero: 32px, md: 20px, sm: 16px + margin 4px 0 2px."],
            [".sm-bmnr-kpi-margin / -sm", "KPI margin variants — standard: 6px 0 4px, sm: 6px 0."],
            [".sm-bmnr-hero-kpi-grid / -cell", "2-col hero KPI grid — 8% accent bg cells, border, rounded-12."],
            [".sm-bmnr-assumptions", "Key assumptions box — 16px pad, surface bg, border, rounded-12."],
            [".sm-bmnr-step-badge", "Methodology step badge — --step-color bg, --bg text, 10px mono bold, rounded-4."],
            [".sm-bmnr-method-result", "Methodology result value — 13px Space Mono, bold, --result-color."],
            [".sm-bmnr-formula", "Monospace formula — 10px Space Mono, nowrap, text-ellipsis."],
            [".sm-bmnr-cell", "Table cell utility — 12px 16px padding. data-highlight for mint tint."],
            [".sm-bmnr-th", "Table header — 10px/600 uppercase, text3."],
            [".sm-bmnr-th-cell", "Table header cell — 10px/600 uppercase, text3. data-align='left'|'right', data-highlight for cyan."],
            [".sm-bmnr-mono-val", "Monospace data value — 12px Space Mono, --val-color, --align. data-align='right'."],
            [".sm-bmnr-row-item / -sm", "Flex-between rows with border-bottom — standard (12px pad) and small (6px pad)."],
            [".sm-bmnr-row-border", "Grid row border — 1px bottom, 50% opacity. data-last='true' removes border."],
            [".sm-bmnr-total-row", "Summary/total row — 2px top border, font-weight 600."],
            [".sm-bmnr-staking-cell", "Staking strategy card — surface bg, rounded-12. data-active for 8% violet tint."],
            [".sm-bmnr-active-text", "Active-state text color — text2 default, text on data-active='true'."],
            [".sm-bmnr-apy-display", "APY value — Space Mono 14px/700, --apy-color."],
            [".sm-bmnr-tranche-row / -grid", "Multi-tranche debt row — 16px 20px pad. data-enabled for 3% violet tint. Grid: 4-col."],
            [".sm-bmnr-tranche-footer", "Tranche footer — flex, justify-end, 16px vertical padding."],
            [".sm-bmnr-checkbox", "Tranche enable checkbox — 16×16px."],
            [".sm-bmnr-factor-card / -title", "Factor card — surface2, 12px 16px pad, 3px left border via --factor-color."],
            [".sm-bmnr-stress-cell", "Stress test cell — 24px 16px pad. data-safe (mint 3%) or data-danger (coral 3%)."],
            [".sm-bmnr-ltv-cell", "LTV cell — 24px 12px pad. data-breach for coral 5% tint."],
            [".sm-bmnr-breach-label", "Breach warning label — 10px bold."],
            [".sm-bmnr-year-btn", "Year selector — 12px 20px pad, mono 14px. data-active + --btn-color."],
            [".sm-bmnr-year-bg", "Projection year header — data-target='true' for 8% accent tint + bold."],
            [".sm-bmnr-analyst-card / -badge / -summary", "ETH tab analyst card — surface bg, rounded-12, 10px badge, mono summary."],
            [".sm-bmnr-invest-banner", "Investment case banner — 12px pad, accent-tinted."],
            [".sm-bmnr-capital-summary", "Capital summary banner — 16px 24px pad, accent tint."],
            [".sm-bmnr-caveats / -list", "Caveats box — surface2, rounded-8, styled list (12px, text3, 1.7 line-height)."],
            [".sm-bmnr-return-text", "Return text — 12px. data-sentiment='positive' (mint) or 'negative' (coral)."],
            [".sm-bmnr-desc-sm", "Small description text — 11px, text3, 4px margin-bottom."],
            [".sm-bmnr-micro-plain", "Micro label override — removes uppercase/letter-spacing from sm-micro-label."],
            [".sm-bmnr-tab-title", "Tab hero title — flex, center-aligned, 28px/700, letter-spacing -0.5px."],
            [".sm-bmnr-tab-accent-bar", "Tab accent bar — 6×32px, accent bg, rounded-3."],
            [".sm-bmnr-scenario-5col", "Scenario table 5-column grid — 2fr 1fr 1fr 1fr 1.5fr."],
            [".sm-bmnr-pwev-footer", "PWEV footer — grid, 2px top border (pairs with scenario-5col)."],
            [".sm-bmnr-grid-gap-24", "Model grid gap override — 24px."],
            [".sm-bmnr-crypto-badge", "Crypto type badge — 4px 12px pad, rounded-4, 11px/600. data-type='ETH' (violet) | 'BTC' (gold) | default (surface3)."],
            [".sm-bmnr-competitor-badge", "Competitor name badge — pill, 10px, sky-tinted (matches ASTS comp-badge-name)."],
            [".sm-bmnr-profile-metrics-grid", "Competitor profile metrics — auto-fit grid, minmax(150px, 1fr), 12px gap."],
            [".sm-bmnr-thesis-comparison", "Thesis comparison box — 12px 16px pad, mint 5% bg, mint left border, rounded-12."],
            [".sm-bmnr-source-line", "News source attribution — 10px mono, text3, 8px margin-top."],
            [".sm-bmnr-bullet", "News detail bullet — flex-shrink: 0 (accent color set by parent)."],
            [".sm-bmnr-ls-1", "Letter-spacing 1px utility."],
            [".sm-bmnr-cmp-5col", "Comps table 5-column grid — 1fr repeat(4, 1fr)."],
            [".sm-bmnr-cmp-6col", "Comps table 6-column grid — 1fr repeat(5, 1fr)."],
            [".sm-bmnr-col-span-3", "SOTP total label — grid-column: 1 / 4."],
            [".sm-bmnr-rounded-top", "Table header rounded top — border-radius: 10px 10px 0 0."],
            [".sm-bmnr-justify-center", "Flex justify center utility."],
            [".sm-bmnr-mc-preset", "MC scenario preset card — 16px 8px pad, surface bg, cursor pointer, transparent 2px bottom border. data-active uses --preset-color for border + 8% tint bg."],
            [".sm-bmnr-param-gap", "MC parameter grid gap override — 6px."],
            [".sm-bmnr-info-box / --sky / --mint", "DCF info callout — rounded-8, 12px pad, 16px margin-top. --sky: blue-tinted. --mint: green-tinted."],
            [".sm-bmnr-div-grid", "DCF dividend grid — 2-column, 16px gap, 14px font-size."],
            [".sm-bmnr-matrix-grid", "Sensitivity matrix grid — 180px + repeat(6, 1fr)."],
            [".sm-bmnr-matrix-cell", "Sensitivity matrix cell — 12px 8px pad, centered. data-current for bold + cyan 10% bg."],
            [".sm-bmnr-tornado-label", "Tornado chart param label — 100px width, 12px, text2, fw-500."],
            [".sm-bmnr-tornado-track", "Tornado chart bar track — flex-1, 28px height, 40% border bg, relative, overflow hidden."],
            [".sm-bmnr-tornado-center", "Tornado chart center line — absolute, 1px wide, border color."],
            [".sm-bmnr-tornado-bar-up / -down", "Tornado chart bars — absolute, coral 25% (down, right-anchored) / mint 25% (up, left-anchored)."],
            [".sm-bmnr-tornado-values", "Tornado chart value overlay — absolute, centered, 24px gap, bold, z-2."],
            [".sm-bmnr-grid-1-120-100", "Debt table grid — 1fr 120px 100px."],
            [".sm-bmnr-runway-grid", "Runway stress grid — 1fr 100px 100px 100px 100px."],
            [".sm-bmnr-insider-sales-grid", "Insider sales grid — 1.5fr 100px 100px 80px 1fr 1.5fr."],
            [".sm-bmnr-insider-grants-grid", "Insider grants grid — 1.5fr 100px 100px 100px 100px 1.5fr."],
            [".sm-bmnr-early-shareholders-grid", "Early shareholders grid — 1.5fr 100px 80px 100px 1.5fr."],
            [".sm-bmnr-color-red", "Red color utility — var(--red, #f87171)."],
            [".sm-bmnr-w-48", "Width utility — 48px."],
            [".sm-bmnr-min-w-320 / -460 / -480 / -700", "Min-width utilities for scrollable table containers."],
          ]}
        />

        {/* ── Financials Tab Classes ─────────────────────────────────────── */}
        <SectionHeader id="financials-classes" title="Financials Tab Classes (sm-fin-*)" count={9} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Quarterly metrics tables, bar charts, milestones, and scroll containers — responsive from 360px to desktop.
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

        {/* ── StockChart Classes ──────────────────────────────────────────── */}
        <SectionHeader id="chart-classes" title="StockChart Classes (sm-chart-*)" count={30} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Interactive stock chart — price display, controls, indicator toggles, guide swatches, correlation chips, volume profile, and metrics.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-chart-container", "Main chart wrapper — relative position, full width."],
            [".sm-chart-guide-card", "Indicator guide panel — surface card with margin-top 32px, rounded-16."],
            [".sm-chart-header", "Top bar with symbol + price info."],
            [".sm-chart-controls", "Controls row — flex with gap, wraps on mobile."],
            [".sm-chart-range-btn", "Time range button (1D, 1W, etc). data-active='true' highlights."],
            [".sm-chart-type-btn", "Chart type toggle (candlestick/line). data-active='true' highlights."],
            [".sm-chart-indicator-btn", "Indicator toggle button. data-active='true' for enabled state. data-indicator-color for swatch tint."],
            [".sm-chart-indicator-swatch", "Color swatch inside indicator button. data-indicator-color maps to --indicator-color."],
            [".sm-chart-toggle-section", "Collapsible section wrapper for guide content."],
            [".sm-chart-toggle-chevron", "Chevron icon — data-open='true' rotates 90°."],
            [".sm-chart-info-panel", "Metrics/info panel below chart."],
            [".sm-chart-metric-card", "Individual metric card in grid."],
            [".sm-chart-metric-positive", "Green text (#22c55e) for positive metric values."],
            [".sm-chart-metric-negative", "Red text (#ef4444) for negative metric values."],
            [".sm-chart-metric-default", "Default text color for neutral metric values."],
            [".sm-chart-corr-chip", "Correlation chip container."],
            [".sm-chart-corr-label", "Correlation label base. Modifier classes: -spy (purple), -qqq (cyan), -gold (yellow), -btc (orange)."],
            [".sm-chart-corr-value", "Correlation value. Use .sm-chart-metric-positive/negative/default for color."],
            [".sm-chart-vol-bar", "Volume profile bar. data-below='true' = green (support), 'false' = red (resistance). Width set via ref."],
            [".sm-chart-vol-track", "Volume profile bar track — surface2, 6px height, rounded."],
            [".sm-chart-guide-swatch", "Base swatch (12×12 rounded). Modifier classes for each indicator color:"],
            [" -sma20, -sma50, -sma200", "SMA swatches: amber (#f59e0b), violet (#8b5cf6), cyan (#06b6d4)."],
            [" -bb, -vwap, -rsi, -macd", "Indicator swatches: slate, orange, pink, blue."],
            [" -macd-signal, -atr", "Signal swatches: red (#ef4444), teal (#14b8a6)."],
            [" -spy, -qqq, -gold, -btc", "Compare swatches: purple, cyan, yellow, orange."],
            [" -fibonacci, -vwapband", "Pro tool swatches: violet (#a78bfa), orange (#f97316)."],
            [" -support, -resistance", "S/R swatches: green (#22c55e), red (#ef4444)."],
            [" -volprofile", "Volume profile swatch: indigo (#6366f1)."],
            [".sm-chart-price-change", "Price change text (12px Space Mono). data-direction='up|down' for mint/coral."],
            [".sm-chart-price-change-positive / -negative", "Explicit positive (green) / negative (red) price change colors."],
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

        {/* ── Hero Data Freshness & Disclaimer ──────────────────────────── */}
        <SectionHeader id="hero-freshness-classes" title="Hero Freshness & Disclaimer Classes" count={5} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Data freshness badge in hero section and collapsible legal disclaimer banner.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".sm-data-freshness", "Accent-aware freshness badge — uses var(--accent) / var(--accent-dim). Inline-flex, 11px, align-self: flex-start."],
            [".sm-data-freshness-sep", "Separator inside freshness badge — accent at 50% via color-mix."],
            [".disclaimer-banner / .disclaimer-collapsed", "Legal disclaimer bar. Flex row with wrap. .disclaimer-collapsed reduces padding for compact view."],
            [".disclaimer-toggle", "Show/Hide toggle button — auto margin-left, coral accent on hover. Uppercase 10px."],
            [".price-updated", "Updated timestamp below price — 10px, text3, letter-spacing 0.03em."],
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
            [".hero / .hero-grid / .brand-block / .price-block", "Stock page hero header. brand-block: flex column, gap 12px. price-block: flex column, align-items flex-end, gap 8px."],
            [".price-big / .price-badge / .price-updated", "Large price display, change badge, and 10px updated timestamp."],
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

        {/* ── Notes Panel Classes ─────────────────────────────────────── */}
        <SectionHeader id="notes-classes" title="Notes Panel Classes (notes-*)" count={40} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          Global notes drawer — slide-over panel portaled to document.body via createPortal.
          Collapsible article preview cards with AI-generated title &amp; description (50-word max).
          Single AI bolt button per note (in meta row) generates preview via Claude Haiku.
          Hide/unhide support with collapsible hidden section. Respects global AI toggle —
          shows .notes-ai-status bar when AI is off.
          Zero inline styles — category colors via data-cat, AI state via BEM modifiers.
        </p>
        <SmallTable
          headers={["Class", "Description"]}
          rows={[
            [".notes-backdrop", "Fixed fullscreen overlay — rgba black 0.6, z-index 110, backdrop-filter blur(4px)."],
            [".notes-drawer", "Fixed right panel — min(400px, 100vw-24px), dark glass bg, translateX(100%) hidden, z-index 120, flex column."],
            [".notes-drawer--open", "Open state — translateX(0), 0.25s cubic-bezier transition."],
            [".notes-header", "Drawer header — flex space-between, 56px min-height, bottom border, safe-area-inset-top padding."],
            [".notes-header-title", "Title text — 11px uppercase, 0.15em tracking, 50% white."],
            [".notes-close-btn", "Close button — 32x32px, centered flex, no border, 30% white."],
            [".notes-form", "Form container — 16px 20px padding, bottom border, flex-shrink: 0."],
            [".notes-textarea", "Input textarea — full width, 4% white bg, 8% white border, rounded-12, 13px, resize vertical."],
            [".notes-categories", "Category button row — flex, gap 6px, margin-top 10px."],
            [".notes-cat-btn", "Category pill button — 10px uppercase, rounded-20, --cat-rgb driven. Uses data-cat + data-active."],
            [".notes-form-actions", "Flex row for save button — gap 6px, margin-top 10px."],
            [".notes-save-btn", "Save button — flex: 1, 12px/600, violet accent bg (12%), rounded-8."],
            [".notes-save-btn:disabled", "Disabled save — 3% white bg, 20% white text."],
            [".notes-save-btn--saving", "Saving state — opacity 0.5."],
            [".notes-error", "Error banner — flex, coral text (90%), 6% coral bg, bottom border, flex-shrink: 0."],
            [".notes-error-dismiss", "Error dismiss button — no bg/border, 50% coral, 16px."],
            [".notes-ai-status", "AI-off indicator bar below form — 10px, bolt icon + message, subtle background, flex-shrink: 0."],
            [".notes-list", "Notes list container — flex: 1, overflow-y auto, safe-area-inset-bottom padding."],
            [".notes-status", "Status text — 24px 20px padding, 12px centered, 25% white."],
            [".notes-status--empty", "Empty state — 20% white text."],
            [".notes-card", "Note card — 12px 20px padding, bottom border (4% white), position relative."],
            [".notes-card-meta", "Card meta row — flex, align-center, gap 8px, margin-bottom 6px."],
            [".notes-card-badge", "Category badge — 9px/700 uppercase mono, rounded-4, --cat-rgb driven via data-cat."],
            [".notes-card-time", "Timestamp — 10px, 25% white."],
            [".notes-card-content", "Content container — 13px, line-height 1.5, 60% white, pre-wrap."],
            [".notes-card-link", "Inline link in content — sky blue, no underline, hover underline."],
            [".notes-card-title", "AI-generated title — 13px, font-weight 600, single-line ellipsis truncation."],
            [".notes-card-desc", "AI-generated description — 12px, muted (45% white), full text (no clamp). 50-word max."],
            [".notes-card-content--clamped", "3-line clamp modifier for long notes without AI preview — -webkit-line-clamp: 3."],
            [".notes-card-toggle", "Expand/collapse button — 10px uppercase, violet accent, inline-flex with chevron icon."],
            [".notes-card-chevron", "SVG chevron in toggle — transition: transform 0.2s."],
            [".notes-card-chevron--open", "Rotated state — transform: rotate(180deg)."],
            [".notes-card-body", "Expanded full text — 13px, pre-wrap, top border separator (5% white)."],
            [".notes-card-ai-btn", "Single AI bolt button in card meta row — 22x22px, mint green accent, shown for every note (generate or re-generate preview)."],
            [".notes-card-ai-btn--disabled", "Disabled state when global AI toggle is off — muted colors, cursor: not-allowed."],
            [".notes-card-generating-badge", "Generating indicator in meta row — 9px uppercase, mint pulse animation (notesPulse)."],
            [".notes-hide-btn", "Eye-off icon button — 24x24px, margin-left: auto, hidden until card :hover."],
            [".notes-unhide-btn", "Eye icon button in hidden section — 24x24px, mint green, always visible."],
            [".notes-delete-btn", "Delete (trash) icon button — 24x24px, coral on hover, hidden until card :hover."],
            [".notes-hidden-section", "Collapsible section wrapper for hidden notes — top border separator."],
            [".notes-hidden-toggle", "Section toggle button — 10px uppercase, full width, chevron + \"Hidden (N)\" label."],
            [".notes-card--hidden", "Hidden card modifier — opacity 0.5, hover 0.7."],
            [".notes-card-content--hidden", "Truncated single-line content in hidden cards — 12px, ellipsis, muted."],
            ["@keyframes notesPulse", "Pulse animation for AI generating state — opacity 0.4 ↔ 1, 1.2s ease-in-out infinite."],
            ["data-cat (on .notes-card-badge)", "Category coloring via --cat-rgb: article=cyan, enhancement=mint, other=violet."],
            ["data-cat / data-active (on .notes-cat-btn)", "Category selector buttons — same --cat-rgb pattern with active state border/bg."],
          ]}
        />

        {/* ── Changelog ─────────────────────────────────────────────────── */}
        <SectionHeader id="changelog" title="Changelog" count={changelogPurchaseHistory.length + changelogHeaderFixes.length + changelogDesignUnification.length + changelogEarlierFixes.length} />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          UI/UX fixes and design unification history. Newest first.
        </p>

        {/* Purchase History & Tab Fixes — Mar 10 2026 */}
        <div className="mt-6 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">BMNR Purchase History &amp; Tab Styling <span className="text-white/20 font-normal ml-2">Mar 10, 2026</span></h3>
          <p className="text-[11px] text-white/25 mt-1">4 changes: purchase data population with mNAV/price/market cap, new table columns, methodology disclaimer, tab type fix for BMNR Analysis group consistency.</p>
        </div>
        <SmallTable
          headers={["#", "Task", "What Changed", "Files"]}
          rows={changelogPurchaseHistory}
        />

        {/* Header & Disclaimer Fixes — Feb 28 2026 */}
        <div className="mt-6 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">Header, Disclaimer & Nav Badge Fixes <span className="text-white/20 font-normal ml-2">Feb 28, 2026</span></h3>
          <p className="text-[11px] text-white/25 mt-1">9 fixes: nav badge heights, collapsible disclaimer, hero spacing, unified price-updated class, accent-aware freshness badge, WS detail button, Ed/AI/Sources inline style cleanup.</p>
        </div>
        <SmallTable
          headers={["#", "Task", "What Changed", "Files"]}
          rows={changelogHeaderFixes}
        />

        {/* Design Unification — Feb 27 2026 */}
        <div className="mt-6 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">Design Unification — Jony Ive × Tesla Aesthetic <span className="text-white/20 font-normal ml-2">Feb 27, 2026</span></h3>
          <p className="text-[11px] text-white/25 mt-1">10 tasks across all tabs, all 3 stocks (ASTS, BMNR, CRCL).</p>
        </div>
        <SmallTable
          headers={["#", "Task", "What Changed", "Files"]}
          rows={changelogDesignUnification}
        />

        {/* Earlier UI/UX Fixes */}
        <div className="mt-8 mb-2">
          <h3 className="text-[13px] font-semibold text-white/60">Earlier UI/UX Fixes</h3>
        </div>
        <SmallTable
          headers={["#", "Fix", "Status", "Details"]}
          rows={changelogEarlierFixes}
        />
        <p className="text-[12px] text-white/30 mt-3 mb-1">
          <span className="text-white/40 font-semibold">How to verify:</span>{" "}
          Visual inspection on all 3 stock pages, responsive test at 375px (no horizontal scroll, wide touch targets),
          consistency check (ASTS / BMNR / CRCL render identically), <span className="font-mono text-white/40">npm run build</span> — zero errors.
        </p>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-6 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/15">
            This documentation is auto-generated from the design system.
            CSS source: <span className="font-mono">src/components/stocks/stock-model-styles.css</span>.
            Last updated: Mar 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
