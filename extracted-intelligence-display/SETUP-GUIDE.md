# Press & SEC Intelligence — Complete Setup Guide

This guide walks you through adding Press Intelligence and SEC Intelligence pages to a new Next.js project, step by step.

---

## Prerequisites

- Next.js 14+ (App Router)
- PostgreSQL database (we use Neon, but any Postgres works)
- Drizzle ORM

---

## Step 1: Install Dependencies

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

---

## Step 2: Add Fonts

In your root `layout.tsx`, add these Google Fonts (or load them however you prefer):

```tsx
import { Outfit, DM_Serif_Display, Space_Mono } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });

// In your <body> or <html>:
<body className={`${outfit.variable} ${dmSerif.variable} ${spaceMono.variable}`}>
```

Then update the CSS font-family references to use the variables, or just add these to your global CSS:

```css
/* If you prefer simple Google Fonts links instead of next/font: */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Serif+Display&family=Space+Mono:wght@400;700&display=swap');
```

---

## Step 3: Add CSS Design Tokens

Add these CSS variables to your global stylesheet (e.g. `globals.css`):

```css
:root {
  --bg: #05070a;
  --text: #f0f6fc;
  --text2: #b0b8c4;
  --text3: #6b7280;
  --surface: rgba(255,255,255,0.03);
  --surface2: rgba(255,255,255,0.06);
  --surface3: rgba(255,255,255,0.09);
  --border: rgba(240,246,252,0.1);
  --cyan: #22D3EE;
  --cyan-dim: rgba(34,211,238,0.15);
  --violet: #A78BFA;
  --violet-dim: rgba(167,139,250,0.15);
  --mint: #34D399;
  --coral: #ef4444;
  --sky: #38BDF8;
}
```

---

## Step 4: Create the Stocks Registry

Create `src/lib/stocks.ts`:

```ts
/** Master stock registry — add your tickers here */
export const stocks: Record<string, { name: string; sector?: string }> = {
  ASTS: { name: "AST SpaceMobile", sector: "Satellite" },
  RKLB: { name: "Rocket Lab", sector: "Space" },
  MSTR: { name: "Strategy", sector: "Bitcoin" },
  COIN: { name: "Coinbase", sector: "Crypto" },
  // ... add all tickers you want to track
};

export const stockList = Object.keys(stocks);

/**
 * Tickers tracked in Intelligence pages.
 * Both Press and SEC Intelligence use this as their single source of truth.
 */
export const INTELLIGENCE_TICKERS: string[] = [
  "ASTS", "RKLB", "MSTR", "COIN",
  // ... add all tickers you want
];
```

---

## Step 5: Create the Database Schema

Create `src/lib/db.ts`:

```ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
```

Create `src/lib/schema.ts`:

```ts
import { pgTable, text, boolean, primaryKey } from "drizzle-orm/pg-core";

export const seenFilings = pgTable(
  "seen_filings",
  {
    ticker: text("ticker").notNull(),
    accessionNumber: text("accession_number").notNull(),
    form: text("form").notNull(),
    filingDate: text("filing_date"),
    description: text("description"),
    reportDate: text("report_date"),
    fileUrl: text("file_url"),
    status: text("status"),
    crossRefs: text("cross_refs"),
    dismissed: boolean("dismissed").default(false),
    hidden: boolean("hidden").default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.ticker, table.accessionNumber] }),
  })
);
```

Run the migration to create the table:

```bash
npx drizzle-kit push
```

---

## Step 6: Create the CIK Map (for SEC Intelligence)

Create `src/lib/cik-map.ts`:

```ts
/**
 * Maps stock tickers to SEC CIK numbers (zero-padded to 10 digits).
 * Find CIKs at: https://www.sec.gov/cgi-bin/browse-edgar?company=&CIK=TICKER&action=getcompany
 */
export const CIK_MAP: Record<string, string> = {
  ASTS: "0001780312",
  RKLB: "0001819994",
  MSTR: "0001050446",
  COIN: "0001679788",
  // ... add CIKs for all your tickers
};

/** Resolve a ticker to its CIK. Returns null if not found. */
export async function resolveCik(ticker: string): Promise<string | null> {
  const upper = ticker.toUpperCase();
  if (CIK_MAP[upper]) return CIK_MAP[upper];

  // Dynamic fallback: look up from SEC
  try {
    const res = await fetch("https://www.sec.gov/files/company_tickers.json", {
      headers: { "User-Agent": "YourApp research@yourapp.com" },
    });
    const data = await res.json();
    for (const entry of Object.values(data) as any[]) {
      if (entry.ticker === upper) {
        return String(entry.cik_str).padStart(10, "0");
      }
    }
  } catch {}
  return null;
}
```

---

## Step 7: Create the SEC Intelligence API Route

Create `src/app/api/sec-intelligence/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seenFilings } from '@/lib/schema';
import { sql, inArray } from 'drizzle-orm';
import { INTELLIGENCE_TICKERS } from '@/lib/stocks';
import { CIK_MAP, resolveCik } from '@/lib/cik-map';

const PI_TICKERS: string[] = [...INTELLIGENCE_TICKERS];

const SEC_HEADERS = {
  // SEC requires a real User-Agent with contact info
  'User-Agent': 'YourApp research@yourapp.com',
  Accept: 'application/json',
};

const FORM_DISPLAY: Record<string, string> = {
  '3': 'Form 3', '3/A': 'Form 3/A',
  '4': 'Form 4', '4/A': 'Form 4/A',
  '5': 'Form 5', '5/A': 'Form 5/A',
  '144': 'Form 144', '144/A': 'Form 144/A',
  'D': 'Form D', 'D/A': 'Form D/A',
};

interface RecentFilings {
  accessionNumber: string[];
  filingDate: string[];
  form: string[];
  primaryDocument?: string[];
  primaryDocDescription?: string[];
  reportDate?: string[];
}

interface SecFiling {
  ticker: string;
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
  dismissed?: boolean;
}

function parseFilings(
  recent: RecentFilings, cik: string, ticker: string, limit: number
): SecFiling[] {
  const count = Math.min(recent.accessionNumber?.length ?? 0, limit);
  const filings: SecFiling[] = [];
  const cikBare = cik.replace(/^0+/, '');

  for (let i = 0; i < count; i++) {
    const accession = recent.accessionNumber[i] ?? '';
    const accessionNoDashes = accession.replace(/-/g, '');
    const primaryDoc = recent.primaryDocument?.[i] ?? '';

    filings.push({
      ticker,
      accessionNumber: accession,
      filingDate: recent.filingDate[i] ?? '',
      form: FORM_DISPLAY[recent.form[i] ?? ''] ?? recent.form[i] ?? '',
      primaryDocDescription: recent.primaryDocDescription?.[i] ?? '',
      reportDate: recent.reportDate?.[i] ?? '',
      fileUrl: primaryDoc
        ? `https://www.sec.gov/Archives/edgar/data/${cikBare}/${accessionNoDashes}/${primaryDoc}`
        : `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=&dateb=&owner=include&count=40`,
    });
  }
  return filings;
}

async function persistFilings(filings: SecFiling[]): Promise<Set<string>> {
  if (filings.length === 0) return new Set();

  const byTicker = new Map<string, SecFiling[]>();
  for (const f of filings) {
    const t = f.ticker.toLowerCase();
    if (!byTicker.has(t)) byTicker.set(t, []);
    byTicker.get(t)!.push(f);
  }

  const allTickers = Array.from(byTicker.keys());
  const existingAccessions = new Set<string>();

  try {
    const existingRows = await db
      .select({
        ticker: seenFilings.ticker,
        accessionNumber: seenFilings.accessionNumber,
      })
      .from(seenFilings)
      .where(inArray(seenFilings.ticker, allTickers));

    for (const row of existingRows) {
      existingAccessions.add(`${row.ticker}:${row.accessionNumber}`);
    }
  } catch (err) {
    console.error('[sec-intelligence] Failed to load existing filings:', err);
  }

  for (const [ticker, tickerFilings] of byTicker) {
    const values = tickerFilings.map(f => ({
      ticker,
      accessionNumber: f.accessionNumber,
      form: f.form,
      filingDate: f.filingDate || null,
      description: f.primaryDocDescription || null,
      reportDate: f.reportDate || null,
      fileUrl: f.fileUrl || null,
      status: null,
      crossRefs: null,
      dismissed: false,
    }));

    try {
      await db.insert(seenFilings).values(values).onConflictDoUpdate({
        target: [seenFilings.ticker, seenFilings.accessionNumber],
        set: {
          form: sql`excluded.form`,
          filingDate: sql`excluded.filing_date`,
          description: sql`excluded.description`,
          reportDate: sql`excluded.report_date`,
          fileUrl: sql`excluded.file_url`,
        },
      });
    } catch (err) {
      console.error(`[sec-intelligence] Failed to persist for ${ticker}:`, err);
    }
  }

  return existingAccessions;
}

async function loadFromDb(tickers: string[]): Promise<{
  filings: SecFiling[];
  tickerStats: Record<string, { count: number; companyName: string }>;
}> {
  const lowerTickers = tickers.map(t => t.toLowerCase());
  const filings: SecFiling[] = [];
  const tickerStats: Record<string, { count: number; companyName: string }> = {};

  try {
    const rows = await db
      .select({
        ticker: seenFilings.ticker,
        accessionNumber: seenFilings.accessionNumber,
        form: seenFilings.form,
        filingDate: seenFilings.filingDate,
        description: seenFilings.description,
        reportDate: seenFilings.reportDate,
        fileUrl: seenFilings.fileUrl,
        dismissed: seenFilings.dismissed,
        hidden: seenFilings.hidden,
      })
      .from(seenFilings)
      .where(inArray(seenFilings.ticker, lowerTickers));

    for (const row of rows) {
      if (row.hidden) continue;
      const upperTicker = row.ticker.toUpperCase();
      filings.push({
        ticker: upperTicker,
        accessionNumber: row.accessionNumber,
        filingDate: row.filingDate || '',
        form: row.form,
        primaryDocDescription: row.description || '',
        reportDate: row.reportDate || '',
        fileUrl: row.fileUrl || '',
        dismissed: row.dismissed,
      });

      if (!tickerStats[upperTicker]) {
        tickerStats[upperTicker] = { count: 0, companyName: upperTicker };
      }
      tickerStats[upperTicker].count++;
    }
  } catch (err) {
    console.error('[sec-intelligence] DB load error:', err);
  }

  filings.sort((a, b) => (b.filingDate || '').localeCompare(a.filingDate || ''));
  return { filings, tickerStats };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'db';
  const limitParam = parseInt(searchParams.get('limit') || '25', 10);
  const limit = Math.min(Math.max(limitParam, 1), 200);
  const tickerFilter = searchParams.get('ticker')?.toUpperCase().split(',').filter(Boolean) ?? [];
  const formFilter = searchParams.get('form')?.toUpperCase().split(',').filter(Boolean) ?? [];
  const daysParam = parseInt(searchParams.get('days') || '0', 10);

  const tickers = tickerFilter.length > 0
    ? tickerFilter.filter(t => PI_TICKERS.includes(t) || CIK_MAP[t])
    : PI_TICKERS;

  const cutoffDate = daysParam > 0
    ? new Date(Date.now() - daysParam * 86400000).toISOString().slice(0, 10)
    : null;

  let allFilings: SecFiling[] = [];
  const errors: Record<string, string> = {};
  let tickerStats: Record<string, { count: number; companyName: string }> = {};

  if (mode === 'db') {
    const dbResult = await loadFromDb(tickers);
    allFilings = dbResult.filings;
    tickerStats = dbResult.tickerStats;
  } else {
    const freshFilings: SecFiling[] = [];

    await Promise.allSettled(
      tickers.map(async (ticker) => {
        try {
          const cik = await resolveCik(ticker);
          if (!cik) { errors[ticker] = 'No CIK mapping found'; return; }

          const res = await fetch(
            `https://data.sec.gov/submissions/CIK${cik}.json`,
            { headers: SEC_HEADERS, next: { revalidate: 900 } }
          );

          if (!res.ok) { errors[ticker] = `SEC API returned ${res.status}`; return; }

          const data: { filings?: { recent?: RecentFilings }; name?: string } = await res.json();
          const companyName = data?.name ?? ticker;
          const recent = data?.filings?.recent;
          if (!recent) { tickerStats[ticker] = { count: 0, companyName }; return; }

          const filings = parseFilings(recent, cik, ticker, limit);
          tickerStats[ticker] = { count: filings.length, companyName };
          freshFilings.push(...filings);
        } catch (err) {
          errors[ticker] = (err as Error).message;
        }
      })
    );

    await persistFilings(freshFilings);

    const dbResult = await loadFromDb(tickers);
    allFilings = dbResult.filings;
    for (const [ticker, dbStat] of Object.entries(dbResult.tickerStats)) {
      tickerStats[ticker] = {
        count: dbStat.count,
        companyName: tickerStats[ticker]?.companyName || dbStat.companyName,
      };
    }
  }

  let filtered = allFilings;
  if (formFilter.length > 0) {
    filtered = filtered.filter(f =>
      formFilter.some(form => f.form.toUpperCase().includes(form))
    );
  }
  if (cutoffDate) {
    filtered = filtered.filter(f => f.filingDate >= cutoffDate);
  }
  filtered.sort((a, b) => (b.filingDate || '').localeCompare(a.filingDate || ''));

  return NextResponse.json({
    filings: filtered,
    totalCount: filtered.length,
    tickerStats,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    fetchedAt: new Date().toISOString(),
    mode,
  });
}
```

---

## Step 8: Create the Seen-Filings Dismiss API

Create `src/app/api/seen-filings/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seenFilings } from '@/lib/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { ticker, filings, dismiss } = body;

  if (!ticker || !filings?.length) {
    return NextResponse.json({ error: 'Missing ticker or filings' }, { status: 400 });
  }

  const lowerTicker = ticker.toLowerCase();

  for (const f of filings) {
    if (dismiss) {
      await db
        .update(seenFilings)
        .set({ dismissed: true })
        .where(
          and(
            eq(seenFilings.ticker, lowerTicker),
            eq(seenFilings.accessionNumber, f.accessionNumber)
          )
        );
    }
  }

  return NextResponse.json({ ok: true });
}
```

---

## Step 9: Create the Press Intelligence API Route

Create `src/app/api/press-intelligence/route.ts`:

You need a press data source. The original uses QuoteMedia RSS feeds. Here's a minimal version you can adapt to your data source:

```ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/press-intelligence?ticker=ASTS&mode=db|refresh
 *
 * Replace the fetch logic below with your actual press data source
 * (QuoteMedia, Benzinga, NewsAPI, RSS feeds, etc.)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker') || '';
  const mode = searchParams.get('mode') || 'db';

  if (mode === 'methodology') {
    // Return methodology info for the modal
    return NextResponse.json({
      ticker,
      grade: 'A',
      type: 'API',
      sources: [{ name: 'Your Data Source', type: 'primary', detail: 'Description here' }],
      headlineFilter: null,
      dbStats: null,
    });
  }

  // TODO: Replace with your actual data source
  // The frontend expects an array of objects like:
  // [{ newsid, headline, summary, datetime, source, permalink }]
  const newsItems: any[] = [];

  return NextResponse.json(newsItems);
}
```

---

## Step 10: Add the Press Intelligence Page

Create `src/app/press-intelligence/page.tsx` — copy the full file from `PressIntelligencePage.tsx` in this directory.

Create `src/app/press-intelligence/press-intelligence.css` — copy `press-intelligence.css` from this directory.

**Key things to customize:**
- Edit the `FEED_CONFIGS` array at the top of `page.tsx` to match your tickers
- Each config needs: `ticker`, `endpoint`, `accent` (color name), `color` (hex), `colorDim` (rgba), `grade`, `sourceFilter`, `headlineFilter`, `categories`
- The `parseResponse` function tells it how to extract the array of news items from your API response

Minimal example of one feed config:

```ts
{
  ticker: "ASTS",
  grade: "A",
  endpoint: "/api/press-intelligence?ticker=ASTS",
  accent: "cyan",
  color: "#22D3EE",
  colorDim: "rgba(34,211,238,0.15)",
  sourceFilter: () => true,
  headlineFilter: () => true,
  parseResponse: (json) => Array.isArray(json) ? json : [],
  categories: {
    Earnings: (h) => /earnings|results|revenue/i.test(h),
    Launches: (h) => /launch|satellite|orbit/i.test(h),
    Partnerships: (h) => /partner|agreement|contract/i.test(h),
  },
},
```

---

## Step 11: Add the SEC Intelligence Page

Create `src/app/sec-intelligence/page.tsx` — copy `SecIntelligencePage.tsx` from this directory.

Create `src/app/sec-intelligence/sec-intelligence.css` — copy `sec-intelligence.css` from this directory.

No customization needed beyond what's in `src/lib/stocks.ts` — the page reads `INTELLIGENCE_TICKERS` automatically.

---

## Step 12: Set Environment Variables

Add to your `.env.local`:

```
DATABASE_URL=postgresql://user:pass@host/dbname
```

---

## Step 13: Run It

```bash
npm run dev
```

Visit:
- `http://localhost:3000/press-intelligence` — press feed
- `http://localhost:3000/sec-intelligence` — SEC filings feed

On the SEC page, click **Fetch Filings** to pull data from EDGAR for the first time. After that, the page loads from the database on every visit.

---

## File Structure Summary

```
src/
├── app/
│   ├── api/
│   │   ├── press-intelligence/
│   │   │   └── route.ts              ← your press data source
│   │   ├── sec-intelligence/
│   │   │   └── route.ts              ← SEC EDGAR fetch + DB persist
│   │   └── seen-filings/
│   │       └── route.ts              ← dismiss NEW badges
│   ├── press-intelligence/
│   │   ├── page.tsx                  ← press feed UI
│   │   └── press-intelligence.css
│   └── sec-intelligence/
│       ├── page.tsx                  ← SEC filings UI
│       └── sec-intelligence.css
├── lib/
│   ├── db.ts                         ← Drizzle DB connection
│   ├── schema.ts                     ← seen_filings table
│   ├── stocks.ts                     ← ticker registry + INTELLIGENCE_TICKERS
│   └── cik-map.ts                    ← ticker → SEC CIK mapping
```
