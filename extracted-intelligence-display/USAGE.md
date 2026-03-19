# Press & SEC Intelligence Display — Extracted Code

Standalone extraction of the Press Intelligence and SEC Intelligence display pages
for reuse in other projects.

## Files

| File | Description |
|------|-------------|
| `PressIntelligencePage.tsx` | React client component — Bloomberg-style unified press feed for 55+ tickers. Includes feed configs, category matchers, filtering, pagination, methodology modal. |
| `press-intelligence.css` | Full CSS for press page — dark theme, ticker color coding, card layout, KPI strip, responsive breakpoints. |
| `SecIntelligencePage.tsx` | React client component — SEC EDGAR filings feed with form-type filtering, NEW badge system, per-stock counts, methodology accordion. |
| `sec-intelligence.css` | Full CSS for SEC page — form-type color coding (annual/quarterly/current/insider), filing cards, responsive layout. |
| `sec-intelligence-api-route.ts` | Next.js API route — fetches from SEC EDGAR API, persists to PostgreSQL via Drizzle ORM, supports db/refresh modes. |

## Dependencies

### NPM packages
- `react` (useState, useEffect, useCallback, useMemo)
- `next` (NextRequest, NextResponse — for the API route)
- `drizzle-orm` (for the API route's DB operations)

### Project-specific imports to replace
- `@/lib/stocks` — exports `stocks` (Record<ticker, {name, ...}>), `stockList`, `INTELLIGENCE_TICKERS` (string[])
- `@/lib/db` — Drizzle database connection
- `@/lib/schema` — `seenFilings` table definition (ticker, accessionNumber, form, filingDate, etc.)
- `@/lib/cik-map` — `CIK_MAP` and `resolveCik()` for SEC CIK lookups

### CSS Variables (design tokens)
Both CSS files expect these CSS custom properties on `:root`:
```css
:root {
  --bg: #05070a;
  --text: #f0f6fc;
  --text2: #b0b8c4;
  --text3: #6b7280;
  --surface: rgba(255,255,255,0.03);
  --surface2: rgba(255,255,255,0.06);
  --border: rgba(240,246,252,0.1);
  --cyan: #22D3EE;
  --violet: #A78BFA;
  --mint: #34D399;
  --coral: #ef4444;
  --sky: #38BDF8;
}
```

### Fonts
- `Outfit` (sans-serif — body text)
- `DM Serif Display` (serif — page titles)
- `Space Mono` (monospace — data values, ticker badges)

## Architecture

Both pages follow a **DB-first** pattern:
1. On mount → load from database only (no external API calls)
2. "Refresh" button → fetch upstream data, persist to DB, re-read from DB
3. All filtering (ticker, category/form, search, date range) is client-side
4. Shared `seen_filings` PostgreSQL table between SEC Intelligence page and per-stock Edgar tabs

## API Endpoints Expected

| Endpoint | Used By | Purpose |
|----------|---------|---------|
| `/api/press-intelligence?ticker=X&mode=db\|refresh` | Press page | Fetch press releases |
| `/api/press-intelligence?ticker=X&mode=methodology` | Press page | Methodology modal data |
| `/api/sec-intelligence?mode=db\|refresh&limit=N` | SEC page | Fetch SEC filings |
| `/api/seen-filings` (POST) | SEC page | Dismiss NEW badge on filings |
