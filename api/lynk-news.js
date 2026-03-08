// api/lynk-news.js
// Source: lynk.world/news + sub-pages (SSR WordPress)
// Fix: only pick up <h5> anchors that are in article content, not nav
// Cache: 60s
const VERSION = 'v2-fixed-2026-03-08';
const CACHE_TTL = 60 * 1000;
let cache = null;
let cacheTime = 0;
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};
function strip(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function decode(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, '\u2019').replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C').replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013').replace(/&#8230;/g, '\u2026');
}
const MONTHS = { january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12 };
function parseDate(str) {
  if (!str) return null;
  const s = str.trim();
  // "March 02, 2026" or "March 2026"
  const m = s.match(/^(\w+)\s+(\d{1,2})?,?\s*(\d{4})$/i);
  if (m) {
    const mon = MONTHS[m[1].toLowerCase()];
    const day = m[2] ? parseInt(m[2]) : 1;
    const yr = parseInt(m[3]);
    if (mon && yr) return new Date(yr, mon - 1, day).toISOString();
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString();
}
// Valid lynk.world article domains
function isLynkArticleUrl(href) {
  if (!href) return false;
  if (href.includes('#')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  // Must be on lynk.world and deeper than top-level pages
  const navPages = ['what-we-do','how-we-do-it','our-partners','news','careers','our-team','the-human-impact','blog','contact','podcasts-and-videos','op-eds','press-releases','media-coverage'];
  try {
    const u = new URL(href.startsWith('http') ? href : `https://lynk.world${href}`);
    if (!u.hostname.includes('lynk.world') && !u.hostname.includes('lynk.global')) return false;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length < 1) return false;
    // Exclude pure nav pages (exactly /news/ etc with no slug)
    if (parts.length === 1 && navPages.includes(parts[0])) return false;
    return true;
  } catch { return false; }
}
async function scrapeLynkPage(url, defaultCategory) {
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
    const html = await res.text();
    // Cut to just the main content area — strip nav and footer to avoid false positives
    // The main article list is between <main> or the first <section class="...entry..."> and </main>
    let body = html;
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) body = mainMatch[1];
    const items = [];
    // Build element list with positions for: dates, h5 article links, h6 sources, p summaries
    const elements = [];
    // Dates: <p>Month DD, YYYY</p> — only in main body
    const re1 = /<p[^>]*>\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})\s*<\/p>/gi;
    let m;
    while ((m = re1.exec(body)) !== null) {
      elements.push({ type: 'date', pos: m.index, text: m[1] });
    }
    // h5 with an anchor link — article headings
    // ONLY pick up links to external URLs or lynk.world article paths (not nav)
    const re2 = /<h5[^>]*>([\s\S]*?)<\/h5>/gi;
    while ((m = re2.exec(body)) !== null) {
      const inner = m[1];
      const aMatch = inner.match(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
      if (!aMatch) continue;
      const href = aMatch[1];
      const text = decode(strip(aMatch[2]));
      if (!text || text.length < 8) continue;
      // Filter: must look like an article URL
      if (!isLynkArticleUrl(href)) continue;
      elements.push({ type: 'heading', pos: m.index, href, text });
    }
    // h6 source labels — between headings
    const re3 = /<h6[^>]*>([\s\S]*?)<\/h6>/gi;
    while ((m = re3.exec(body)) !== null) {
      const t = decode(strip(m[1]));
      if (t && t.length > 1 && t.length < 100) {
        elements.push({ type: 'source', pos: m.index, text: t });
      }
    }
    // Summaries: <p> with substantial content
    const re4 = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    while ((m = re4.exec(body)) !== null) {
      const t = decode(strip(m[1]));
      if (t.length > 40 && !/^(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(t)) {
        elements.push({ type: 'summary', pos: m.index, text: t });
      }
    }
    elements.sort((a, b) => a.pos - b.pos);
    const headings = elements.filter(e => e.type === 'heading');
    for (let i = 0; i < headings.length; i++) {
      const h = headings[i];
      const nextH = headings[i + 1];
      const nearDate = elements.filter(e => e.type === 'date' && e.pos < h.pos).pop();
      const src = elements.find(e => e.type === 'source' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
      const summary = elements.find(e => e.type === 'summary' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
      const headline = h.text;
      if (!headline || headline.length < 5) continue;
      const href = h.href.startsWith('http') ? h.href : `https://lynk.world${h.href}`;
      const datetime = parseDate(nearDate?.text) || new Date().toISOString();
      const sourceLabel = src?.text || 'Lynk Global';
      let category = defaultCategory;
      if (url.includes('press-releases')) category = 'press-release';
      else if (url.includes('media-coverage')) category = 'media';
      else if (url.includes('podcasts')) category = 'media';
      else if (url.includes('op-eds')) category = 'opinion';
      items.push({
        newsid: `lynk-${href.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        datetime,
        source: sourceLabel,
        headline,
        qmsummary: (summary?.text || '').slice(0, 300),
        permalink: href,
        storyurl: href,
        category,
        _source: 'lynk',
      });
    }
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e.message };
  }
}
async function fetchAllLynk() {
  const pages = [
    { url: 'https://lynk.world/news/', category: 'all' },
    { url: 'https://lynk.world/press-releases/', category: 'press-release' },
    { url: 'https://lynk.world/media-coverage/', category: 'media' },
    { url: 'https://lynk.world/podcasts-and-videos/', category: 'media' },
    { url: 'https://lynk.world/op-eds/', category: 'opinion' },
  ];
  const results = await Promise.all(pages.map(p => scrapeLynkPage(p.url, p.category)));
  const allItems = results.flatMap(r => r.items);
  const seen = new Set();
  const unique = allItems.filter(item => {
    const key = item.permalink.toLowerCase().replace(/\/+$/, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const now = Date.now();
  for (const item of unique) {
    if (new Date(item.datetime).getTime() > now + 7 * 24 * 60 * 60 * 1000) continue;
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
  }
  unique.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return {
    items: unique,
    errors: results.map((r, i) => r.error ? `${pages[i].url}: ${r.error}` : null).filter(Boolean),
    counts: Object.fromEntries(pages.map((p, i) => [p.url.split('/').filter(Boolean).pop() || 'news', results[i].items.length])),
  };
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
  const { items, errors, counts } = await fetchAllLynk();
  cache = items;
  cacheTime = now;
  if (req.query.debug === '1') {
    return res.status(200).json({
      version: VERSION,
      counts,
      errors,
      total: items.length,
      sample: items.slice(0, 5).map(i => ({
        headline: i.headline,
        datetime: i.datetime,
        source: i.source,
        category: i.category,
        permalink: i.permalink,
      })),
    });
  }
  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', items.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: items });
}
