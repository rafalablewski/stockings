// api/amazon-leo-news.js
// Strategy: fetch page HTML, extract articles from __next_f RSC flight payload
// The full article list is server-rendered into the HTML as JSON inside script tags
// Cache: 60s
const VERSION = 'v3-flight-parse-2026-03-08';
const CACHE_TTL = 60 * 1000;
let cache = null;
let cacheTime = 0;
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};
function decode(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');
}
function msToIso(ms) {
  if (!ms) return null;
  try {
    const n = Number(ms);
    if (n > 1e12) return new Date(n).toISOString(); // ms timestamp
    if (n > 1e9)  return new Date(n * 1000).toISOString(); // s timestamp
    return null;
  } catch { return null; }
}
function parseArticle(a) {
  if (!a || typeof a !== 'object') return null;
  const headline =
    a.promo?.title ||
    a.headlines?.find(h => h.role === 'main')?.value ||
    a.seoAttributes?.title || '';
  const summary =
    a.headlines?.find(h => h.role === 'subheadline')?.value ||
    a.seoAttributes?.description || '';
  const rawUrl = a.canonicalLink || a.promo?.url || '';
  const url = rawUrl.startsWith('http') ? rawUrl : `https://www.aboutamazon.com${rawUrl}`;
  const datetime =
    msToIso(a.publishDateTimestamp) ||
    msToIso(a.updateTimestamp) ||
    (a.publishDate ? new Date(a.publishDate).toISOString() : null) ||
    new Date().toISOString();
  if (!headline || headline.length < 5) return null;
  return {
    newsid: `amzleo-${a.id || url.split('/').pop() || Math.random().toString(36).slice(2)}`,
    datetime,
    source: 'Amazon Leo',
    headline: decode(headline),
    qmsummary: decode(summary).slice(0, 300),
    permalink: url,
    storyurl: url,
    tags: a.searchTags || [],
    _source: 'amazon-flight',
  };
}
async function fetchArticles() {
  try {
    const res = await fetch('https://www.aboutamazon.com/news/amazon-leo', {
      headers: BROWSER_HEADERS,
    });
    if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
    const html = await res.text();
    // Collect all __next_f push payloads
    const pushRe = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
    let fullFlight = '';
    let m;
    while ((m = pushRe.exec(html)) !== null) {
      // Unescape the JS string
      try {
        fullFlight += JSON.parse(`"${m[1]}"`);
      } catch {
        fullFlight += m[1];
      }
    }
    // Look for "articles":[{...}] — the search results block
    // The pattern is "searchResults":{"articles":[...],"metadata":{...}}
    const artMatch = fullFlight.match(/"articles"\s*:\s*(\[[\s\S]*?\])\s*,\s*"metadata"/);
    if (!artMatch) {
      return { items: [], error: 'articles array not found in flight data' };
    }
    let articles;
    try {
      articles = JSON.parse(artMatch[1]);
    } catch (e) {
      return { items: [], error: `JSON parse failed: ${e.message}` };
    }
    const items = articles.map(parseArticle).filter(Boolean);
    return { items, error: null, rawCount: articles.length };
  } catch (e) {
    return { items: [], error: e.message };
  }
}
function dedupe(items) {
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
    return res.status(200).json({ news: cache });
  }
  const { items, error, rawCount } = await fetchArticles();
  const merged = dedupe(items);
  cache = merged;
  cacheTime = now;
  if (req.query.debug === '1') {
    return res.status(200).json({
      version: VERSION,
      rawCount,
      mergedCount: merged.length,
      error,
      sample: merged.slice(0, 5).map(i => ({
        headline: i.headline,
        datetime: i.datetime,
        permalink: i.permalink,
      })),
    });
  }
  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', merged.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: merged });
}
