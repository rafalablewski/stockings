// api/lynk-news.js
// Lynk uses Bootstrap WordPress theme. h5 titles have NO inner <a> tag.
// The entire article card is wrapped in <a href="..."> OR there's a read-more link nearby.
// Strategy: find all <a href> blocks containing an <h5>, extract title + url + date + summary.
// v8: wrapper-anchor parser
const VERSION = 'v8-wrapper-anchor-2026-03-09';
const CACHE_TTL = 60 * 1000;
let cache = null;
let cacheTime = 0;
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};
function strip(s) { return (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function decode(s) {
  return (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, '\u2019').replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C').replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013').replace(/&#8230;/g, '\u2026');
}
const MONTHS = {january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
function parseDate(s) {
  if (!s) return null;
  const m = s.trim().match(/^(\w+)\s+(\d{1,2})?,?\s*(\d{4})$/i);
  if (m) {
    const mon = MONTHS[m[1].toLowerCase()];
    const day = m[2] ? parseInt(m[2]) : 1;
    const yr = parseInt(m[3]);
    if (mon && yr) return new Date(yr, mon-1, day).toISOString();
  }
  const d = new Date(s.trim());
  return isNaN(d) ? null : d.toISOString();
}
const NAV_HREFS = new Set([
  'https://lynk.world/', 'https://lynk.world/what-we-do/', 'https://lynk.world/how-we-do-it/',
  'https://lynk.world/our-partners/', 'https://lynk.world/news/', 'https://lynk.world/careers/',
  'https://lynk.world/our-team/', 'https://lynk.world/the-human-impact/', 'https://lynk.world/blog/',
  'https://lynk.world/contact/', 'https://lynk.world/podcasts-and-videos/',
  'https://lynk.world/op-eds/', 'https://lynk.world/press-releases/', 'https://lynk.world/media-coverage/',
]);
function isNavHref(href) {
  if (!href) return true;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return true;
  return NAV_HREFS.has(href);
}
function parsePage(html, category) {
  const items = [];
  // Strategy 1: find <a href="...">...<h5>TITLE</h5>...</a> — wrapper anchor cards
  // Allow up to 2000 chars between <a> and <h5> to capture date/image in between
  const wrapRe = /<a\s+href="([^"]+)"[^>]*>([\s\S]{0,2000}?)<h5[^>]*>([\s\S]*?)<\/h5>([\s\S]{0,1500}?)<\/a>/gi;
  let m;
  while ((m = wrapRe.exec(html)) !== null) {
    const href = m[1];
    const before = m[2]; // content before h5 (may contain date)
    const h5inner = m[3];
    const after = m[4];  // content after h5 (may contain source h6 + summary)
    if (isNavHref(href)) continue;
    const title = decode(strip(h5inner));
    if (!title || title.length < 8) continue;
    // Date: look in 'before' for month pattern
    const dateM = before.match(/((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})/i);
    const datetime = parseDate(dateM?.[1]) || new Date().toISOString();
    // Source: h6 in 'after'
    const srcM = after.match(/<h6[^>]*>([\s\S]*?)<\/h6>/i);
    const source = srcM ? decode(strip(srcM[1])) || 'Lynk Global' : 'Lynk Global';
    // Summary: first <p> in 'after'
    const sumM = after.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const summary = sumM ? decode(strip(sumM[1])).slice(0, 300) : '';
    const full = href.startsWith('http') ? href : `https://lynk.world${href.startsWith('/') ? href : '/' + href}`;
    items.push({
      newsid: `lynk-${title.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,50)}`,
      datetime,
      source,
      headline: title,
      qmsummary: summary,
      permalink: full,
      storyurl: full,
      category,
      _source: 'lynk',
    });
  }
  // Strategy 2 (fallback): if strategy 1 found nothing, look for <h5> with a nearby preceding <a href>
  if (items.length === 0) {
    // Find all h5 positions
    const h5Re = /<h5[^>]*>([\s\S]*?)<\/h5>/gi;
    while ((m = h5Re.exec(html)) !== null) {
      const title = decode(strip(m[1]));
      if (!title || title.length < 8) continue;
      // Look backwards up to 3000 chars for an <a href that's NOT a nav link
      const lookback = html.slice(Math.max(0, m.index - 3000), m.index);
      const aMatches = [...lookback.matchAll(/<a\s+href="([^"]+)"/gi)];
      const nearestA = aMatches.reverse().find(a => !isNavHref(a[1]));
      if (!nearestA) continue;
      const href = nearestA[1];
      const full = href.startsWith('http') ? href : `https://lynk.world${href.startsWith('/') ? href : '/' + href}`;
      // Look in surrounding 500 chars before h5 for date
      const vicinity = html.slice(Math.max(0, m.index - 500), m.index + 1000);
      const dateM = vicinity.match(/((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})/i);
      const datetime = parseDate(dateM?.[1]) || new Date().toISOString();
      const after = html.slice(m.index + m[0].length, m.index + m[0].length + 1000);
      const srcM = after.match(/<h6[^>]*>([\s\S]*?)<\/h6>/i);
      const source = srcM ? decode(strip(srcM[1])) || 'Lynk Global' : 'Lynk Global';
      const sumM = after.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const summary = sumM ? decode(strip(sumM[1])).slice(0, 300) : '';
      items.push({
        newsid: `lynk-${title.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,50)}`,
        datetime,
        source,
        headline: title,
        qmsummary: summary,
        permalink: full,
        storyurl: full,
        category,
        _source: 'lynk',
      });
    }
  }
  return items;
}
async function fetchPage(url, category) {
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `HTTP ${res.status}`, htmlLen: 0, htmlSnip: '' };
    const html = await res.text();
    const items = parsePage(html, category);
    return { items, error: null, htmlLen: html.length,
      // Debug: show raw HTML around first h5
      h5Snip: (() => { const i = html.indexOf('<h5'); return i >= 0 ? html.slice(Math.max(0,i-300), i+300) : 'NO H5 FOUND'; })()
    };
  } catch (e) {
    return { items: [], error: e.message, htmlLen: 0 };
  }
}
async function fetchAll() {
  const pages = [
    { url: 'https://lynk.world/news/', category: 'all' },
    { url: 'https://lynk.world/press-releases/', category: 'press-release' },
    { url: 'https://lynk.world/media-coverage/', category: 'media' },
    { url: 'https://lynk.world/podcasts-and-videos/', category: 'media' },
    { url: 'https://lynk.world/op-eds/', category: 'opinion' },
  ];
  const results = await Promise.all(pages.map(p => fetchPage(p.url, p.category)));
  const allItems = results.flatMap(r => r.items);
  const seen = new Set();
  const unique = allItems.filter(item => {
    const key = item.newsid;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const now = Date.now();
  for (const item of unique) {
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
  }
  unique.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return { items: unique, results, pages };
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
  const { items, results, pages } = await fetchAll();
  cache = items;
  cacheTime = now;
  if (req.query.debug === '1') {
    return res.status(200).json({
      version: VERSION,
      total: items.length,
      pages: pages.map((p, i) => ({
        url: p.url,
        status: results[i].error || 'ok',
        htmlLen: results[i].htmlLen,
        count: results[i].items.length,
        h5Snip: results[i].h5Snip,  // <-- RAW HTML around first h5
      })),
      sample: items.slice(0, 5).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source, permalink: i.permalink })),
    });
  }
  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', items.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: items });
}
