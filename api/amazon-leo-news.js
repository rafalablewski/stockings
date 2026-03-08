// api/amazon-leo-news.js
// Source: aboutamazon.com/api/search-articles (discovered from __next_f flight data)
// Paginates: count=100, from=0 then from=100 until exhausted
// Cache: 60s

const VERSION = 'v2-search-api-2026-03-08';
const CACHE_TTL = 60 * 1000;
let cache = null;
let cacheTime = 0;

const BASE = 'https://www.aboutamazon.com';
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'application/json, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.aboutamazon.com/news/amazon-leo',
  'Origin': 'https://www.aboutamazon.com',
};

function decode(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');
}

function msToIso(ms) {
  if (!ms) return null;
  try { return new Date(Number(ms)).toISOString(); } catch { return null; }
}

// Parse a single article from the aboutamazon search API format
function parseArticle(a) {
  if (!a) return null;

  // Headline: prefer promo.title, fallback to headlines[role=main]
  const headline =
    a.promo?.title ||
    a.headlines?.find(h => h.role === 'main')?.value ||
    a.seoAttributes?.title || '';

  // Subheadline / summary
  const summary =
    a.headlines?.find(h => h.role === 'subheadline')?.value ||
    a.seoAttributes?.description || '';

  const url = a.canonicalLink || (a.promo?.url ? `${BASE}${a.promo.url}` : '') || '';

  // Dates: publishDateTimestamp (ms) preferred, fallback updateTimestamp, fallback publishDate string
  const datetime =
    msToIso(a.publishDateTimestamp) ||
    msToIso(a.updateTimestamp) ||
    (a.publishDate ? new Date(a.publishDate).toISOString() : null) ||
    new Date().toISOString();

  if (!headline) return null;

  return {
    newsid: `amzleo-${a.id || url.split('/').pop()}`,
    datetime,
    source: 'Amazon Leo',
    headline: decode(headline),
    qmsummary: decode(summary).slice(0, 300),
    permalink: url.startsWith('http') ? url : `${BASE}${url}`,
    storyurl: url.startsWith('http') ? url : `${BASE}${url}`,
    category: a.category || 'Amazon Leo',
    tags: a.searchTags || [],
    _source: 'amazon-api',
  };
}

// Fetch one page
async function fetchPage(from, count = 100) {
  const url = `${BASE}/api/search-articles?category=Amazon+Leo&sortBy=updateTimestamp&count=${count}&from=${from}`;
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) return { articles: [], total: 0, error: `HTTP ${res.status}` };
    const json = await res.json();

    // Response shape: { articles: [...], metadata: { totalResults, nextPage, prevPage } }
    const articles = json?.articles || json?.searchResults?.articles || [];
    const total = json?.metadata?.totalResults || json?.searchResults?.metadata?.totalResults || 0;
    return { articles, total, error: null };
  } catch (e) {
    return { articles: [], total: 0, error: e.message };
  }
}

// Fetch all pages
async function fetchAll() {
  const first = await fetchPage(0, 100);
  if (first.error) return { items: [], total: 0, error: first.error };

  const total = first.total;
  let allArticles = [...first.articles];

  // Paginate if more
  if (total > 100) {
    const batches = [];
    for (let from = 100; from < total; from += 100) {
      batches.push(fetchPage(from, 100));
    }
    const results = await Promise.all(batches);
    for (const r of results) {
      if (!r.error) allArticles = allArticles.concat(r.articles);
    }
  }

  const items = allArticles
    .map(parseArticle)
    .filter(Boolean);

  return { items, total, error: null };
}

// Merge & dedup
function mergeAndDedup(items) {
  const now = Date.now();
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];

  items.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  for (const item of items) {
    const ku = (item.permalink || '').split('?')[0].toLowerCase().replace(/\/+$/, '');
    const kh = (item.headline || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
    if (!kh || kh.length < 4) continue;
    if (new Date(item.datetime).getTime() > now + 7 * 24 * 60 * 60 * 1000) continue;
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
    if (ku && seenUrl.has(ku)) continue;
    if (seenHl.has(kh)) continue;
    seenHl.add(kh);
    if (ku) seenUrl.add(ku);
    out.push(item);
  }
  return out;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('X-Version', VERSION);
    return res.status(200).json({ news: cache });
  }

  const { items, total, error } = await fetchAll();
  const merged = mergeAndDedup(items);
  cache = merged;
  cacheTime = now;

  if (req.query.debug === '1') {
    return res.status(200).json({
      version: VERSION,
      endpoint: `${BASE}/api/search-articles?category=Amazon+Leo&sortBy=updateTimestamp&count=100&from=0`,
      totalFromApi: total,
      rawCount: items.length,
      mergedCount: merged.length,
      error,
      sample: merged.slice(0, 5).map(i => ({
        headline: i.headline,
        datetime: i.datetime,
        permalink: i.permalink,
        tags: i.tags,
      })),
    });
  }

  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', merged.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: merged });
}
