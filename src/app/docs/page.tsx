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
  { path: "src/app/page.tsx",                            type: "Page",      description: "Landing page — stock list" },
  { path: "src/app/stocks/[ticker]/page.tsx",            type: "Page",      description: "Dynamic stock route — loads ASTS/BMNR/CRCL components" },
  { path: "src/app/hooks/page.tsx",                      type: "Page",      description: "Agent Hooks documentation page" },
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

/* ─────────────────────────────────────────────────────────────────────────────
   APP ARCHITECTURE DATA — Hierarchical structure for the Architecture section.
   ───────────────────────────────────────────────────────────────────────────── */

const routingTree = [
  { path: "/",                                     label: "Home",              file: "app/page.tsx",                          note: "Coverage grid, audits, workflows" },
  { path: "/stocks",                               label: "Stock List",        file: "app/stocks/page.tsx",                   note: "Tracked companies index" },
  { path: "/stocks/[ticker]",                      label: "Stock Detail",      file: "app/stocks/[ticker]/page.tsx",          note: "Loads ASTS / BMNR / CRCL component" },
  { path: "/docs",                                 label: "Docs",             file: "app/docs/page.tsx",                     note: "This page — design system + architecture" },
  { path: "/hooks",                                label: "Hooks",            file: "app/hooks/page.tsx",                    note: "Agent hooks documentation" },
  { path: "/audit/comprehensive-code-audit",       label: "Code Audit",       file: "app/audit/comprehensive-code-audit/page.tsx", note: "35-category audit results" },
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
    { method: "GET",  path: "/api/news/[symbol]",               auth: "—",   note: "Google News RSS by ticker" },
    { method: "GET",  path: "/api/press-releases/[symbol]",     auth: "—",   note: "IR press releases via RSS" },
    { method: "GET",  path: "/api/competitor-feed/[company]",   auth: "—",   note: "Competitor intelligence feed" },
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
    { method: "POST", path: "/api/workflow/run",                auth: "—",   note: "Execute AI agent workflow" },
    { method: "POST", path: "/api/workflow/apply",              auth: "—",   note: "Apply workflow output as patch" },
    { method: "POST", path: "/api/workflow/commit",             auth: "—",   note: "Commit applied workflow changes" },
  ]},
];

const componentHierarchy = [
  { depth: 0, name: "RootLayout",                     file: "app/layout.tsx",         note: "HTML shell, fonts, PinGate" },
  { depth: 1, name: "PinGate",                        file: "components/PinGate.tsx",  note: "Full-screen PIN auth gate" },
  { depth: 2, name: "Navigation",                     file: "app/layout.tsx",         note: "Fixed top nav — dropdowns + mobile hamburger" },
  { depth: 3, name: "PinStatus",                      file: "components/shared/PinStatus.tsx",  note: "Auth indicator badge" },
  { depth: 3, name: "AiToggle",                       file: "components/shared/AiToggle.tsx",   note: "AI on/off toggle" },
  { depth: 3, name: "MobileNav",                      file: "components/shared/MobileNav.tsx",  note: "Drawer nav for mobile" },
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
  { depth: 2, name: "DisclaimerBanner",                    note: "Not financial advice" },
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
];

const dataArchitecture = [
  { layer: "Data Files",   path: "src/data/{asts,bmnr,crcl}/",       note: "Hardcoded .ts files — company, capital, financials, sec-filings, timeline, catalysts, partners, analyst-coverage, comps" },
  { layer: "Shared Types", path: "src/data/shared/types.ts",          note: "Central TypeScript interfaces for all data shapes (Partner, ShareClass, Catalyst, Timeline, etc.)" },
  { layer: "Schemas",      path: "src/data/schemas/",                 note: "Zod validation schemas per stock + filing templates" },
  { layer: "DB Schema",    path: "src/lib/schema.ts",                 note: "Drizzle ORM table definitions (9 tables in Neon PostgreSQL)" },
  { layer: "Seed Path",    path: "/api/db/setup → seed-helpers.ts",   note: "Reads .ts data files → inserts into PostgreSQL tables" },
  { layer: "AI Workflows", path: "src/data/workflows.ts",             note: "Agent prompts (earnings calls, code audit, data quality)" },
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

function TreeRow({ depth, name, detail, mono }: { depth: number; name: string; detail: string; mono?: boolean }) {
  const indent = depth * 24;
  const connector = depth === 0 ? "" : "├─ ";
  return (
    <div className="flex items-baseline gap-2 py-1 hover:bg-white/[0.02] transition-colors" style={{ paddingLeft: indent }}>
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
            { id: "tokens",      label: "Tokens" },
            { id: "layout",      label: "Layout" },
            { id: "typography",  label: "Typography" },
            { id: "colors",      label: "Colors" },
            { id: "component-patterns", label: "Patterns" },
            { id: "investment",  label: "Investment" },
            { id: "data-attrs",  label: "Data Attrs" },
            { id: "css-vars",    label: "CSS Vars" },
            { id: "responsive",  label: "Responsive" },
            { id: "conventions", label: "Conventions" },
            { id: "structure",   label: "Files" },
            { id: "fonts",       label: "Fonts" },
            { id: "theming",     label: "Theming" },
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

        {/* ── 5b. Investment Tab Classes ─────────────────────────────────── */}
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
          Each stock component sets <span className="font-mono text-white/40">data-accent</span> on the <span className="font-mono text-white/40">.stock-model-app</span> root. CSS attribute selectors in <span className="font-mono text-white/40">stock-model-styles.css</span> resolve <span className="font-mono text-white/40">--accent</span> and <span className="font-mono text-white/40">--accent-dim</span>.
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
            CSS source: <span className="font-mono">src/components/stocks/stock-model-styles.css</span>.
            Last updated: Feb 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
