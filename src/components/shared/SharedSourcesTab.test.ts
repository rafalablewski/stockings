/**
 * Diagnostic tests for the sources tab save/persistence issue.
 *
 * Problem: "TELUS and AST SpaceMobile Partner..." saves OK,
 * but "AST SpaceMobile Provides Business Update and Fourth Quarter
 * and Full Year 2025 Results" disappears on refresh.
 *
 * Root cause: normalizeHeadline() and articleCacheKey() truncated to 60 chars.
 * For yearly recurrent articles (e.g., Q4 2024 vs Q4 2025 results), the year
 * falls at index 66 — AFTER the cutoff — causing false dedup collisions.
 *
 * Fix: Increase truncation to 120 chars (both client and server).
 */
import { describe, it, expect } from 'vitest';

// ── Reproduce the FIXED functions from SharedSourcesTab.tsx ──────────────

function articleCacheKey(article: { url?: string; headline?: string }): string {
  return (article.url || article.headline || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 120);
}

function normalizeHeadline(headline: string): string {
  return headline
    .toLowerCase()
    .replace(/\s*[-–—]\s*(business wire|pr newswire|globenewswire|prnewswire).*$/i, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 120);
}

interface ArticleItem {
  headline: string;
  date: string;
  url: string;
  source?: string;
  analyzed?: boolean | null;
}

function deduplicateByHeadline(articles: ArticleItem[]): ArticleItem[] {
  const seen = new Set<string>();
  return articles.filter(a => {
    const key = normalizeHeadline(a.headline);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Test articles ────────────────────────────────────────────────────────

const TELUS_HEADLINE = 'TELUS and AST SpaceMobile Partner to Bring Space-Based Cellular Broadband Connectivity to Every Corner of Canada - Business Wire';
const BIZ_UPDATE_2025_HEADLINE = 'AST SpaceMobile Provides Business Update and Fourth Quarter and Full Year 2025 Results - Business Wire';
const BIZ_UPDATE_2024_HEADLINE = 'AST SpaceMobile Provides Business Update and Fourth Quarter and Full Year 2024 Results - Business Wire';

const TELUS_BW_URL = 'https://www.businesswire.com/news/home/20260304520945/en/TELUS-and-AST-SpaceMobile-Partner-to-Bring-Space-Based-Cellular-Broadband-Connectivity-to-Every-Corner-of-Canada';
const BIZ_UPDATE_2025_BW_URL = 'https://www.businesswire.com/news/home/20260228530456/en/AST-SpaceMobile-Provides-Business-Update-and-Fourth-Quarter-and-Full-Year-2025-Results';
const BIZ_UPDATE_2024_BW_URL = 'https://www.businesswire.com/news/home/20250227520123/en/AST-SpaceMobile-Provides-Business-Update-and-Fourth-Quarter-and-Full-Year-2024-Results';

// ═══════════════════════════════════════════════════════════════════════════
// TEST 1: articleCacheKey — now uses 120 chars
// ═══════════════════════════════════════════════════════════════════════════

describe('TEST 1: articleCacheKey with 120-char limit', () => {
  it('BW direct URLs produce distinct keys', () => {
    const key1 = articleCacheKey({ url: TELUS_BW_URL });
    const key2 = articleCacheKey({ url: BIZ_UPDATE_2025_BW_URL });
    expect(key1).not.toBe(key2);
  });

  it('headline-based keys for 2024 vs 2025 results are NOW distinct at 120 chars', () => {
    const key2024 = articleCacheKey({ url: '', headline: BIZ_UPDATE_2024_HEADLINE });
    const key2025 = articleCacheKey({ url: '', headline: BIZ_UPDATE_2025_HEADLINE });
    console.log('[Test 1] Cache key (headline-based) for yearly recurrence:');
    console.log(`  2024: "${key2024}" (${key2024.length} chars)`);
    console.log(`  2025: "${key2025}" (${key2025.length} chars)`);
    // With 120-char limit, the year at index 66 is now preserved
    expect(key2024).not.toBe(key2025);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 2: normalizeHeadline — 120-char limit fixes yearly recurrence
// ═══════════════════════════════════════════════════════════════════════════

describe('TEST 2: normalizeHeadline with 120-char limit — yearly recurrence FIX', () => {
  it('2024 and 2025 "Business Update" articles now have DIFFERENT normalized headlines', () => {
    const nh2024 = normalizeHeadline(BIZ_UPDATE_2024_HEADLINE);
    const nh2025 = normalizeHeadline(BIZ_UPDATE_2025_HEADLINE);
    console.log('[Test 2a] Normalized headlines (120-char limit):');
    console.log(`  2024: "${nh2024}" (${nh2024.length} chars)`);
    console.log(`  2025: "${nh2025}" (${nh2025.length} chars)`);
    // The year is at index 66, now within the 120-char limit
    expect(nh2024).not.toBe(nh2025);
  });

  it('deduplicateByHeadline now preserves BOTH 2024 and 2025 articles', () => {
    const articles: ArticleItem[] = [
      { headline: BIZ_UPDATE_2024_HEADLINE, date: '2025-02-27', url: BIZ_UPDATE_2024_BW_URL, source: 'Business Wire' },
      { headline: BIZ_UPDATE_2025_HEADLINE, date: '2026-02-28', url: BIZ_UPDATE_2025_BW_URL, source: 'Business Wire' },
    ];
    const deduped = deduplicateByHeadline(articles);
    console.log('[Test 2b] deduplicateByHeadline preserves both yearly articles:');
    console.log(`  Input: ${articles.length}, Output: ${deduped.length}`);
    expect(deduped).toHaveLength(2);
  });

  it('true duplicates (same article from different sources) are still deduped', () => {
    const articles: ArticleItem[] = [
      { headline: 'AST SpaceMobile Provides Business Update and Fourth Quarter and Full Year 2025 Results - Business Wire',
        date: '2026-02-28', url: BIZ_UPDATE_2025_BW_URL, source: 'Business Wire' },
      { headline: 'AST SpaceMobile Provides Business Update and Fourth Quarter and Full Year 2025 Results',
        date: '2026-02-28', url: 'https://other-source.com/article', source: 'Other' },
    ];
    const deduped = deduplicateByHeadline(articles);
    console.log('[Test 2c] True duplicates (same headline, different source) still deduped:');
    console.log(`  Input: ${articles.length}, Output: ${deduped.length}`);
    expect(deduped).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 3: Full DB-init pipeline — the fix prevents article loss
// ═══════════════════════════════════════════════════════════════════════════

describe('TEST 3: Full DB-init pipeline — fix verified', () => {
  interface DbRecord {
    cacheKey: string;
    headline: string;
    date: string | null;
    url: string | null;
    source: string | null;
    articleType: string | null;
    dismissed: boolean;
    hidden: boolean;
  }

  it('accumulated DB with 2024+2025 results + TELUS — all articles now survive', () => {
    const dbArticles: DbRecord[] = [
      {
        cacheKey: articleCacheKey({ url: BIZ_UPDATE_2024_BW_URL }),
        headline: BIZ_UPDATE_2024_HEADLINE,
        date: '2025-02-27', url: BIZ_UPDATE_2024_BW_URL, source: 'Business Wire',
        articleType: 'pr', dismissed: true, hidden: false,
      },
      {
        cacheKey: articleCacheKey({ url: TELUS_BW_URL }),
        headline: TELUS_HEADLINE,
        date: '2026-03-04', url: TELUS_BW_URL, source: 'Business Wire',
        articleType: 'pr', dismissed: false, hidden: false,
      },
      {
        cacheKey: articleCacheKey({ url: BIZ_UPDATE_2025_BW_URL }),
        headline: BIZ_UPDATE_2025_HEADLINE,
        date: '2026-02-28', url: BIZ_UPDATE_2025_BW_URL, source: 'Business Wire',
        articleType: 'pr', dismissed: false, hidden: false,
      },
    ];

    // Simulate DB-init processing
    const prs: ArticleItem[] = [];
    for (const art of dbArticles) {
      prs.push({
        headline: art.headline,
        date: art.date || '',
        url: art.url || '',
        source: art.source || undefined,
        analyzed: null,
      });
    }

    const dedupedPrs = deduplicateByHeadline(prs);

    const has2024 = dedupedPrs.some(a => a.headline.includes('2024'));
    const has2025 = dedupedPrs.some(a => a.headline.includes('2025'));
    const hasTelus = dedupedPrs.some(a => a.headline.includes('TELUS'));

    console.log('[Test 3] All articles survive the pipeline:');
    console.log(`  TELUS:  ${hasTelus ? 'PRESENT' : 'MISSING'}`);
    console.log(`  2024:   ${has2024 ? 'PRESENT' : 'MISSING'}`);
    console.log(`  2025:   ${has2025 ? 'PRESENT' : 'MISSING'}`);

    expect(hasTelus).toBe(true);
    expect(has2024).toBe(true);
    expect(has2025).toBe(true);
    expect(dedupedPrs).toHaveLength(3); // All 3 articles survive
  });
});
