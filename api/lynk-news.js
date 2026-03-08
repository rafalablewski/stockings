// api/lynk-news.js
// Source: lynk.world/news — SSR WordPress, full content in HTML
// Tabs: Press Releases, Media Coverage, Podcasts & Videos, Op-Eds
// Cache: 60s

const VERSION = 'v1-2026-03-08';
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

function parseDate(str) {
  if (!str) return null;
  const s = str.trim();
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

// ─── Scrape a single lynk.world page ─────────────────────────────────────────
// Page structure (SSR WordPress):
//   [Date paragraph]
//   ##### [Headline with <a href>]
//   ###### [Source label]
//   [Summary paragraph]

async function scrapeLynkPage(url, defaultCategory) {
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
    const html = await res.text();

    const items = [];

    // Extract article blocks — each block anchored by an <h5> or <h6> headline link
    // Pattern: date text before heading, then heading with <a>, then optional source h6, then summary p
    const blockRe = /(<(?:h5|h6)[^>]*>[\s\S]*?<\/(?:h5|h6)>)/gi;
    const blocks = [...html.matchAll(blockRe)];

    // Build positional index of dates, headings, sources, paragraphs
    // Walk sections between article-link headings

    // Simpler approach: find all <article> or post containers, or use marker pattern
    // lynk.world renders each news item as:
    //   <p>Month DD, YYYY</p>
    //   <h5><a href="...">Headline</a></h5>
    //   <h6>Source label</h6>
    //   <p>Summary...</p>

    // Extract all <p> date-like text with position
    const dateRe = /<p[^>]*>\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4})\s*<\/p>/gi;
    const headingRe = /<h5[^>]*>\s*(?:<[^>]+>)*\s*<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*(?:<\/[^>]+>)*\s*<\/h5>/gi;
    const sourceRe = /<h6[^>]*>([\s\S]*?)<\/h6>/gi;
    const summaryRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;

    // Build ordered list of all elements with positions
    const elements = [];

    let m;
    const re1 = /<p[^>]*>\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4})\s*<\/p>/gi;
    while ((m = re1.exec(html)) !== null) {
      elements.push({ type: 'date', pos: m.index, text: m[1] });
    }
    const re2 = /<h5[^>]*>[\s\S]*?<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h5>/gi;
    while ((m = re2.exec(html)) !== null) {
      elements.push({ type: 'heading', pos: m.index, href: m[1], text: strip(m[2]) });
    }
    const re3 = /<h6[^>]*>([\s\S]*?)<\/h6>/gi;
    while ((m = re3.exec(html)) !== null) {
      elements.push({ type: 'source', pos: m.index, text: decode(strip(m[1])) });
    }
    const re4 = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    while ((m = re4.exec(html)) !== null) {
      const t = decode(strip(m[1]));
      if (t.length > 30 && !/^(January|February|March|April|May|June|July|August|September|October|November|December)/.test(t)) {
        elements.push({ type: 'summary', pos: m.index, text: t });
      }
    }

    elements.sort((a, b) => a.pos - b.pos);

    // Walk headings and collect context
    const headings = elements.filter(e => e.type === 'heading');
    for (let i = 0; i < headings.length; i++) {
      const h = headings[i];
      const nextH = headings[i + 1];

      // Find nearest date before this heading
      const nearDate = elements.filter(e => e.type === 'date' && e.pos < h.pos).pop();
      // Find source between this heading and next
      const src = elements.find(e => e.type === 'source' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
      // Find summary between this heading and next
      const summary = elements.find(e => e.type === 'summary' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));

      const headline = decode(h.text);
      if (!headline || headline.length < 5) continue;

      const href = h.href.startsWith('http') ? h.href : `https://lynk.world${h.href}`;
      const datetime = parseDate(nearDate?.text) || new Date().toISOString();
      const sourceLabel = src?.text || 'Lynk Global';

      // Determine category from URL
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

// ─── Fetch all Lynk pages ─────────────────────────────────────────────────────
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

  unique.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  const counts = Object.fromEntries(pages.map((p, i) => [p.url.split('/').filter(Boolean).pop() || 'news', results[i].items.length]));
  return { items: unique, counts, errors: results.map(r => r.error).filter(Boolean) };
}

// ─── Merge & deduplicate ──────────────────────────────────────────────────────
function mergeAndDedup(sources) {
  const now = Date.now();
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];
  const all = sources.flatMap(s => s.items || []);
  all.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  for (const item of all) {
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

  const lynk = await fetchAllLynk();
  const merged = mergeAndDedup([lynk]);
  cache = merged;
  cacheTime = now;

  if (req.query.debug === '1') {
    return res.status(200).json({
      version: VERSION,
      sources: {
        lynk: { count: lynk.items.length, counts: lynk.counts, errors: lynk.errors,
          sample: lynk.items.slice(0, 5).map(i => ({ headline: i.headline, datetime: i.datetime, category: i.category, source: i.source })) },
      },
      mergedCount: merged.length,
      mergedSample: merged.slice(0, 5).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source, category: i.category })),
    });
  }

  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', merged.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: merged });
}
