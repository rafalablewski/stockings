# ABISON Design System

Complete reference for recreating the Stockings/ABISON visual language in a new project.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.1 |
| React | React + React DOM | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS v4 + Custom CSS | 4.0 |
| Fonts | Google Fonts (Outfit, Space Mono, DM Serif Display) | — |
| Charts | Recharts | 3.6.0 |
| Markdown | react-markdown | 10.1.0 |
| 3D | Three.js + React Three Fiber + Drei | 0.183 / 9.5 / 10.7 |
| Icons | Inline SVG (no icon library) | — |
| Component Library | None — all custom-built | — |

---

## Color Palette

### Surfaces (4-Level Depth System)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#05070A` | Page background (near-black) |
| `--surface` | `#0D1117` | Card / panel background |
| `--surface2` | `#161B22` | Hover states, secondary containers |
| `--surface3` | `#21262D` | Inputs, legends, nested elements |
| `--border` | `rgba(240,246,252,0.1)` | Glass-edge borders (white at 10%) |

### Text Hierarchy (3 Levels)

| Token | Hex | Usage |
|-------|-----|-------|
| `--text` | `#F0F6FC` | Primary — headings, values, high-contrast |
| `--text2` | `#8B949E` | Secondary — body text, descriptions |
| `--text3` | `#6E7681` | Tertiary — labels, timestamps, muted helpers |

### Semantic Accent Colors

Each color has a full-strength value and a `-dim` variant at 15% opacity for tinted backgrounds.

| Token | Hex | Dim | Usage |
|-------|-----|-----|-------|
| `--cyan` | `#22D3EE` | `rgba(34,211,238,0.15)` | ASTS accent, space/tech feel |
| `--mint` | `#7EE787` | `rgba(126,231,135,0.15)` | Positive, growth, bull sentiment |
| `--coral` | `#FF7B72` | `rgba(255,123,114,0.15)` | Negative, errors, bear sentiment |
| `--sky` | `#79C0FF` | `rgba(121,192,255,0.15)` | Info, links, neutral data |
| `--gold` | `#D29922` | `rgba(210,153,34,0.15)` | Warnings, neutral sentiment |
| `--violet` | `#A78BFA` | `rgba(167,139,250,0.15)` | Wall Street/research accent |
| `--rose` | `#F9A8D4` | `rgba(249,168,212,0.15)` | Additional accent |

### Dynamic Accent System

The `--accent` variable resolves per-context via a `data-accent` HTML attribute:

```css
[data-accent="cyan"]   { --accent: var(--cyan);   --accent-dim: var(--cyan-dim);   }
[data-accent="violet"] { --accent: var(--violet); --accent-dim: var(--violet-dim); }
[data-accent="mint"]   { --accent: var(--mint);   --accent-dim: var(--mint-dim);   }
```

### Next.js Defaults

| Token | Hex |
|-------|-----|
| `--background` | `#000000` |
| `--foreground` | `#ededed` |

---

## Typography

### Font Families

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Primary (UI)** | `Outfit` | `sans-serif` | All non-data text, navigation, buttons, body |
| **Data / Numbers** | `Space Mono` | `monospace` | KPIs, metrics, code, timestamps, PIN input |
| **Display / Headings** | `DM Serif Display` | `serif` | Page titles, large headings |
| **System** | — | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Base fallback |
| **Code** | — | `'SF Mono', 'Fira Code', 'Consolas', monospace` | Logs, terminal output |

### Font Loading (Google Fonts)

```
Outfit: weights 300, 400, 500, 600, 700, 800
Space Mono: weights 400, 700
DM Serif Display: weight 400
```

### Font Size Scale

| Size | Usage |
|------|-------|
| `42px` | Brand/company name (h1 hero) |
| `36px` | Big stat numbers |
| `32px` | Tab hero h2 |
| `28px` | Section headings |
| `22px` | Page titles (DM Serif) |
| `20px` | KPI bar values |
| `18px` | Highlight h3, small page titles |
| `16px` | KPI values, stats row labels |
| `14px` | Primary body text, nav buttons, firm names |
| `13px` | Card descriptions, secondary headings |
| `12px` | Monospace numbers, card body, subtitles |
| `11px` | Section labels, card titles |
| `10px` | Micro labels, pill badges, KPI labels, button text |
| `9px` | Tiny badges, filter counts, timestamps |

### Font Weights

| Weight | Usage |
|--------|-------|
| `700` | Bold headings, KPI values |
| `600` | Section labels, card titles, strong emphasis |
| `500` | Medium emphasis |
| `400` | Regular body, serif titles |
| `300` | Light (hero h2, tab titles) |

### Letter Spacing

| Value | Usage |
|-------|-------|
| `-1.5px` to `-2px` | Very large titles (h1) |
| `-0.5px` | Section heads, hero titles |
| `0` | Most body text |
| `0.5px` / `0.08em` | Buttons, small caps |
| `1px` – `1.5px` | Uppercase labels |
| `2.5px` | Section labels (very spaced) |

### Line Heights

| Value | Usage |
|-------|-------|
| `1` | KPI/stat numbers (tight) |
| `1.15` | Hero h2 (tight display) |
| `1.2` | Page titles, headings |
| `1.3` | Card names |
| `1.5` | Body text, descriptions |
| `1.6` | Extended body (markdown, analysis) |
| `1.7` | Long-form content |

### Numeric Display

- `font-variant-numeric: tabular-nums` for aligned numeric columns
- All financial data uses `Space Mono`

---

## Spacing Scale

### Gaps / Margins / Padding

| px | Usage |
|----|-------|
| `1` | Grid separator borders |
| `3` | Badge padding (small) |
| `4` | Micro gap, button borders |
| `6` | Small gap, icon spacing |
| `8` | Base gap (most layouts) |
| `10` | Section label margin, button padding |
| `12` | Card inner padding, section margin |
| `14` | Table cell padding |
| `16` | Standard panel padding, grid gap |
| `20` | Header padding, sidebar padding |
| `24` | Large panel padding, card padding |
| `28` | KPI strip gaps |
| `32` | Hero padding, main padding |
| `48` | Hero vertical padding |
| `60–64` | Outer container padding (desktop) |

### Container Widths

| Width | Usage |
|-------|-------|
| `1200px` | Documentation, ABISON pages |
| `1400px` | Stock model, engineers dashboard |
| `640px` | Description text max-width |

---

## Border System

### Border Radius

| Radius | Usage |
|--------|-------|
| `2px` | Tiny elements (progress bar track) |
| `4px` | Badges, small buttons, code blocks |
| `6px` | Buttons, nav pills, inputs |
| `8px` | Cards, dialogs, modals |
| `10px` | Section count badges |
| `12px` | Major card borders, tables |
| `16px` | Large card borders, grid cells |
| `99px` | Pills, toggle buttons (fully rounded) |

### Border Colors

| Pattern | Usage |
|---------|-------|
| `var(--border)` | Primary (10% opacity white) |
| `rgba(..., 0.15)` | Hover/active states |
| `rgba(..., 0.25)` | Strong emphasis |
| `rgba(..., 0.30)` | Highlighted sections |

---

## Layout Architecture

### Page Shell

```
<html lang="en" class="dark">
  <body class="antialiased min-h-screen flex flex-col bg-black text-white">
    <PinGate>                        <!-- Auth overlay -->
      <Navigation />                  <!-- Fixed top bar, z-50, h-14 -->
      <main class="flex-1 pt-14">    <!-- Content (padding = nav height) -->
        {children}
      </main>
      <Footer />                      <!-- Sticky bottom -->
    </PinGate>
  </body>
</html>
```

### Navigation Bar

- **Position:** Fixed top, full width, z-50
- **Height:** 56px (`h-14`)
- **Background:** Black at 90% opacity + backdrop blur
- **Bottom border:** White gradient at 20% opacity
- **Desktop (md+):** Logo + inline badge toolbar + dropdown menus
- **Mobile (<768px):** Logo + hamburger → right-side drawer (300px, portaled)

### Navigation Badges (top bar)

Four inline badges at 24px height, 9px uppercase text, 600 weight:

| Badge | Color | Feature |
|-------|-------|---------|
| PinStatus | Mint/Red | Lock icon + "PIN" or "Closed" with pulsing dot |
| AiToggle | Mint (on) / White (off) | Lightning bolt, persists to localStorage |
| NotificationBell | Amber/Blue | Bell + unread count, dropdown with grouped notifications |
| NotesPanel | Violet | Note icon, opens 400px right drawer |

### Grid System

```css
.g2 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
.g3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
.g4 { grid-template-columns: repeat(4, 1fr); gap: 24px; }
.g5 { grid-template-columns: repeat(5, 1fr); gap: 24px; }
```

### Section Layout Pattern

```css
.main  { padding: 48px 64px; max-width: 1400px; }
.hero  { padding: 48px 64px; }
.stats-row { display: flex; gap: 32px; padding: 32px 64px; }
.nav   { padding: 16px 64px; }
```

---

## Component Primitives

### All custom-built — no external UI library.

### Glass Separator Pattern

A signature visual: `gap: 1px; background: var(--border)` on a grid creates glass-edge separator lines between cells.

```css
.sm-grid-sep {
  display: grid;
  gap: 1px;
  background: var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.sm-grid-sep > * {
  background: var(--surface);
}
```

### Panel

```css
.sm-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}
```

### Card (Colored Metric)

- Label above, monospace value below
- `data-color` attribute sets accent tint
- Background uses `color-mix(in srgb, var(--color) 8%, transparent)`

### Row (Key-Value)

- `.sm-row` — Horizontal row with label on left, value on right
- Hover: `background: var(--surface2)`
- `data-highlight` for emphasis rows

### Stat (KPI Display)

- Label (10px, uppercase, text3)
- Value (monospace, colored)
- Optional update source dot indicator

### KPI Strip

```css
.sm-kpi-cell { text-align: center; }
.sm-kpi-value { font-family: 'Space Mono'; font-size: 16px; font-weight: 700; }
.sm-kpi-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); }
```

### Buttons

| Class | Style |
|-------|-------|
| `.sm-expand-btn` | Ghost button, small text, rounded |
| `.sm-action-btn` | Action button with accent color |
| `.pill` | Capsule shape (border-radius: 99px), transparent bg |
| `.filter-btn` | Filter pill with active state (accent 15% tint) |

### Badge

```css
.sm-badge {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--badge-color) 15%, transparent);
  color: var(--badge-color);
}
```

### Progress Bar

```css
.sm-progress-track {
  height: 6px;
  background: var(--surface3);
  border-radius: 2px;
}
.sm-progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.5s ease;
}
```

### Thesis Boxes

- **Bull:** `linear-gradient(135deg, rgba(126,231,135,0.08), transparent)` with mint border
- **Bear:** `linear-gradient(135deg, rgba(255,123,114,0.08), transparent)` with coral border

### Tables

- Header: `background: var(--surface2)`, rounded corners on first/last
- Rows: Hover `background: var(--surface2)`
- Cell padding: 14px

### Bar Charts (CSS)

```css
.bar {
  background: linear-gradient(180deg, var(--accent) 0%, transparent 100%);
  border-radius: 2px 2px 0 0;
}
.bar:hover {
  width: 80%; /* expands from 60% */
  filter: brightness(1.2);
}
```

---

## Animations & Transitions

### Transition Durations

| Duration | Usage |
|----------|-------|
| `0.1s` | Quick hover feedback |
| `0.15s` | Standard UI interactions |
| `0.2s–0.25s` | Nav, dropdowns |
| `0.3s–0.35s` | Icon animations, badge appear |
| `0.5s` | Progress bars, shake |
| `2s` | Continuous loops (pulse) |

### Easing Functions

| Curve | Usage |
|-------|-------|
| `ease` | Default smoothness |
| `ease-out` | Quick start, slow end (dropdown opens) |
| `ease-in-out` | Standard animation |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Material Design easing (common) |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring-like (badge bounce) |

### Key Animations

| Name | Description | Duration |
|------|-------------|----------|
| `navBadgeFadeIn` | Badge scale 0.85→1 + opacity | 0.35s |
| `navDotPulse` | Breathing dot pulse | 3s loop |
| `fadeSlideIn` | Dropdown menu appearance | 0.15s |
| `pi-pulse` / `si-pulse` | Live indicator pulse | 2s loop |
| `pinShake` | Error shake on wrong PIN | 0.5s |

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `@media (pointer: coarse)` | Touch devices (larger tap targets) |
| `max-width: 900px` | Large tablet / small desktop |
| `max-width: 768px` | Tablet — switches to mobile nav |
| `max-width: 480px` | Phone portrait |
| `max-width: 360px` | Small phone |

### Mobile Adjustments

- Input range thumb: `32px` (vs `22px` desktop)
- Nav buttons: `min-height: 44px`
- Pills: `padding: 10px 16px`
- Mobile drawer: `min(300px, calc(100vw - 56px))`
- Safe area insets: `max(1rem, env(safe-area-inset-*))` on all edges

---

## Icon System

All icons are inline SVG, no external library:

```jsx
<svg viewBox="0 0 24 24" width={11} height={11}
     fill="none" stroke="currentColor" strokeWidth={2}
     strokeLinecap="round" strokeLinejoin="round">
  {/* path data */}
</svg>
```

Common icons: lightning bolt, bell, lock, refresh (circular arrows), chevron up/down, hamburger menu, checkmark, backspace.

---

## Scrollbar Styling

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.2);
}
```

---

## CSS Custom Utility Classes (`sm-*` Prefix)

Scoped to `.stock-model-app` to avoid Tailwind conflicts.

### Layout

```
sm-flex, sm-flex-between, sm-flex-col, sm-flex-col-gap, sm-flex-col-gap-16
sm-flex-wrap, sm-gap-4/6/8/12/16/24
sm-items-start, sm-justify-between
sm-text-center, sm-text-right, sm-text-left
sm-shrink-0, sm-w-full
sm-mt-8/12/16/24/32, sm-mb-8/12/16
```

### Typography

```
sm-section-label   /* 11px, 600, uppercase, 2.5px spacing */
sm-param-label     /* 13px, 600, uppercase, 1.5px spacing */
sm-micro-label     /* 10px, 600, uppercase, 0.8px spacing */
sm-panel-title     /* 13px, 600, 0.5px spacing */
sm-mono-sm/md/lg/xl/2xl/3xl  /* Space Mono at 12–42px */
sm-body, sm-body-sm, sm-body-lg
sm-subtle, sm-subtle-sm
```

### Color

```
sm-accent, sm-mint, sm-coral, sm-sky, sm-gold, sm-violet, sm-cyan
sm-text, sm-text2, sm-text3
sm-opacity-70
```

---

## Design Conventions & Patterns

1. **Dark-first:** `class="dark"` on `<html>`, black body, no light mode
2. **Glass aesthetic:** Blur, transparency, subtle 10% white borders throughout
3. **4-level depth:** bg → surface → surface2 → surface3 creates visual hierarchy
4. **Monospace for data:** All numbers/metrics use `Space Mono`
5. **1px gap borders:** CSS grid `gap: 1px` with border-color background = glass separators
6. **`color-mix()` for tints:** `color-mix(in srgb, var(--color) X%, transparent)` for dynamic opacity
7. **Accent theming:** `data-accent` attribute on containers switches the entire color scheme
8. **Tabular numbers:** `font-variant-numeric: tabular-nums` for aligned columns
9. **No preflight:** Tailwind v4 imports only `theme` + `utilities`, no base reset (avoids conflicts)
10. **Portal pattern:** Drawers/modals use `createPortal(document.body)` to escape stacking contexts
11. **Bloomberg/Palantir aesthetic:** Dense information displays, financial terminal inspiration

---

## File Reference

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Design tokens, Tailwind imports, nav/badge/PIN styles |
| `src/components/stocks/stock-model-styles.css` | Core stock analysis UI system (14K+ lines) |
| `src/app/abison-pages.css` | Bloomberg-style shared page CSS |
| `src/app/layout.tsx` | Root layout, Navigation, Footer |
| `src/components/shared/StockModelUI.tsx` | Core primitives (Stat, Card, Row, Input, Panel, Guide) |
| `src/components/shared/StockHeader.tsx` | Stock page header with live price + HUD |
| `src/components/shared/StockNavigation.tsx` | Tab bar with keyboard navigation |
| `src/components/shared/MobileNav.tsx` | Mobile drawer navigation |
| `src/components/shared/PinGate.tsx` | Authentication overlay |
| `src/components/shared/NotificationBell.tsx` | Notifications dropdown |
| `src/components/shared/NotesPanel.tsx` | Notes drawer panel |
| `src/components/shared/AiToggle.tsx` | AI enable/disable badge |
| `src/components/shared/PinStatus.tsx` | PIN status badge |
