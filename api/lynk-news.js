// api/lynk-news.js
// Source: lynk.world/news + sub-pages (SSR WordPress)
// Articles link to both lynk.world AND external news sites (media coverage)
// Cache: 60s
const VERSION = 'v3-external-urls-2026-03-09';
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
const MONTHS = {january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
function parseDate(str) {
  if (!str) return null;
  const m = str.trim().match(/^(\w+)\s+(\d{1,2})?,?\s*(\d{4})$/i);
  if (m) {
    const mon = MONTHS[m[1].toLowerCase()];
    const day = m[2] ? parseInt(m[2]) : 1;
    const yr = parseInt(m[3]);
    if (mon && yr) return new Date(yr, mon - 1, day).toISOString();
  }
  const d = new Date(str.trim());
  return isNaN(d.getTime()) ? null : d.toISOString();
}
// Lynk nav-only paths to exclude from h5 link matching
const NAV_PATHS = new Set([
  '/', '/what-we-do/', '/how-we-do-it/', '/our-partners/', '/news/',
  '/careers/', '/our-team/', '/the-human-impact/', '/blog/', '/contact/',
  '/podcasts-and-videos/', '/op-eds/', '/press-releases/', '/media-coverage/',
  '/what-we-do', '/how-we-do-it', '/our-partners', '/news',
  '/careers', '/our-team', '/the-human-impact', '/blog', '/contact',
  '/podcasts-and-videos', '/op-eds', '/press-releases', '/media-coverage',
]);
function isValidArticleHref(href) {
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (href.startsWith('http')) return true; // any external URL is fine
  // relative path - make sure it's not a nav page
  const path = href.startsWith('/') ? href : `/${href}`;
  if (NAV_PATHS.has(path) || NAV_PATHS.has(path.replace(/\/$/, ''))) return false;
  return path.length > 2;
}
async function scrapeLynkPage(url, defaultCategory) {
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
    const html = await res.text();
    // Try to isolate main content — cut off nav and footer noise
    // Lynk uses WordPress; look for the article list container
    let body = html;
    // Try to cut between first <header> end and <footer> start
    const footerIdx = html.toLowerCase().lastIndexOf('<footer');
    if (footerIdx > 0) body = html.slice(0, footerIdx);
    const headerEnd = body.toLowerCase().indexOf('</header>');
    if (headerEnd > 0) body = body.slice(headerEnd + 9);
    const elements = [];
    let m;
    // Dates: <p>Month DD, YYYY</p>
    const re1 = /<p[^>]*>\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})\s*<\/p>/gi;
    while ((m = re1.exec(body)) !== null) {
      elements.push({ type: 'date', pos: m.index, text: m[1] });
    }
    // h5 with anchor — article headlines
    const re2 = /<h5[^>]*>([\s\S]*?)<\/h5>/gi;
    while ((m = re2.exec(body)) !== null) {
      const inner = m[1];
      const aMatch = inner.match(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
      if (!aMatch) continue;
      const href = aMatch[1];
      const text = decode(strip(aMatch[2]));
      if (!text || text.length < 8) continue;
      if (!isValidArticleHref(href)) continue;
      elements.push({ type: 'heading', pos: m.index, href, text });
    }
    // h6 source labels
    const re3 = /<h6[^>]*>([\s\S]*?)<\/h6>/gi;
    while ((m = re3.exec(body)) !== null) {
      const t = decode(strip(m[1]));
      if (t && t.length > 1 && t.length < 120) {
        elements.push({ type: 'source', pos: m.index, text: t });
      }
    }
    // Paragraph summaries
    const re4 = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    while ((m = re4.exec(body)) !== null) {
      const t = decode(strip(m[1]));
      if (t.length > 40 && !/^(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(t)) {
        elements.push({ type: 'summary', pos: m.index, text: t });
      }
    }
    elements.sort((a, b) => a.pos - b.pos);
    const headings = elements.filter(e => e.type === 'heading');
    const items = [];
    for (let i = 0; i < headings.length; i++) {
      const h = headings[i];
      const nextH = headings[i + 1];
      const nearDate = elements.filter(e => e.type === 'date' && e.pos < h.pos).pop();
      const src = elements.find(e => e.type === 'source' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
      const summary = elements.find(e => e.type === 'summary' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
      const headline = h.text;
      if (!headline || headline.length < 5) continue;
      const href = h.href.startsWith('http') ? h.href
        : `https://lynk.world${h.href.startsWith('/') ? h.href : '/' + h.href}`;
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
  // Deduplicate by permalink
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
    counts: Object.fromEntries(pages.map((p, i) => [
      p.url.split('/').filter(Boolean).pop() || 'news',
      results[i].items.length
    ])),
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
      sample: items.slice(0, 8).map(i => ({
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
