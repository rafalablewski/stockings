// api/att-news.js — AT&T (T) press release proxy v3
// Sources:
//   1. QuoteMedia / AccessWire   — PR Newswire + Canada Newswire + Business Wire
//   2. services.att.com JSONP    — about.att.com/allnews.html engine (943 articles)
//   3. corp.att.com/worldwide    — global business press releases 2018-2024 (SSR)
//   4. investors.att.com         — IR news releases table (SSR)
//   5. investors.att.com         — IR events & presentations (SSR, best-effort)
// Cache: 5 min
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};
function decode(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x2013;/g, '–').replace(/&#x2014;/g, '—')
    .replace(/&#xAE;/g, '®').replace(/&#x2122;/g, '™')
    .replace(/&#x2019;/g, "'").replace(/&#x2018;/g, "'")
    .replace(/&#x201C;/g, '"').replace(/&#x201D;/g, '"')
    .trim();
}
function strip(str) { return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
// ─── 1. QuoteMedia ────────────────────────────────────────────────────────────
async function fetchQuoteMedia() {
  try {
    const url =
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=T&excludeTopics=NONCOMPANY&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true&start=1000-01-01&end=3000-01-01';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' } });
    if (!res.ok) return { items: [], error: `QM HTTP ${res.status}` };
    const raw = await res.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const items = json?.results?.news?.[0]?.newsitem ?? [];
    const official = ['pr newswire', 'canada newswire', 'business wire', 'globenewswire'];
    const filtered = items.filter(i => {
      const src = (i.source || '').toLowerCase();
      const hl = (i.headline || '').toLowerCase();
      return official.some(s => src.includes(s)) && (hl.includes('at&t') || hl.includes("at&t's"));
    });
    return { items: filtered.map(i => ({ ...i, _source: 'quotemedia' })), error: null };
  } catch (e) { return { items: [], error: e.message }; }
}
// ─── 2. services.att.com — about.att.com/allnews.html engine ─────────────────
// JSONP endpoint. The callback param is required; response: getResults({...})
// Fix: strip from first { to last } (not from first ( to last ))
async function fetchAllNews() {
  try {
    // Try plain JSON first (no callback wrapper)
    const baseUrl = 'https://services.att.com/search/v1/newsroom?app-id=attnews&fq=-rejectDoc:true&rows=1000&sort=published_date+desc';
    const res = await fetch(baseUrl + '&callback=getResults', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)',
        'Referer': 'https://about.att.com/',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    if (!res.ok) return { items: [], error: `AllNews HTTP ${res.status}` };
    const text = await res.text();
    let json = null;
    // Try plain JSON
    try { json = JSON.parse(text); } catch (_) {}
    // Try JSONP: extract from first { to last }
    if (!json) {
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        try { json = JSON.parse(text.slice(start, end + 1)); } catch (_) {}
      }
    }
    if (!json) return { items: [], error: 'Cannot parse allnews response', raw: text.slice(0, 300) };
    const docs = json?.response?.docs ?? [];
    const items = docs.map(doc => ({
      newsid: `allnews-${(doc.article_url || doc.id || '').replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
      datetime: doc.published_date || (Array.isArray(doc.SBC_SEARCH_PUBLISHDATE) ? doc.SBC_SEARCH_PUBLISHDATE[0] : doc.SBC_SEARCH_PUBLISHDATE) || new Date().toISOString(),
      source: 'AT&T Newsroom',
      headline: decode(doc.article_header || doc.title || ''),
      qmsummary: decode(doc.article_description || (Array.isArray(doc.og_description) ? doc.og_description[0] : doc.og_description) || ''),
      permalink: doc.article_url || (Array.isArray(doc.og_url) ? doc.og_url[0] : doc.og_url) || doc.id || '',
      storyurl: doc.article_url || doc.id || '',
      _source: 'allnews',
    })).filter(i => i.headline);
    return { items, error: null, total: json?.response?.numFound };
  } catch (e) { return { items: [], error: e.message }; }
}
// ─── 3. corp.att.com/worldwide/att-press-release/ ────────────────────────────
// SSR WordPress. Structure: <h3>DATE</h3> immediately followed by article link.
// Bug fix: nav links (to corp.att.com/worldwide/*, business.att.com/portfolios/*,
//   att.com/*, businesscenter.att.com/*, etc.) must be excluded.
// Only allow links to: about.att.com, linkedin.com/pulse, cybersecurity.att.com,
//   alienvault.com, frost.com, business.att.com/learn
const CORP_PR_ALLOWED = [
  'about.att.com',
  'linkedin.com/pulse',
  'cybersecurity.att.com',
  'alienvault.com',
  'frost.com/news',
  'frost.com/wp-content',
  'business.att.com/learn',
];
function isArticleLink(href) {
  return CORP_PR_ALLOWED.some(d => href.includes(d));
}
async function fetchCorpPR() {
  try {
    const res = await fetch('https://www.corp.att.com/worldwide/att-press-release/', { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `Corp PR HTTP ${res.status}` };
    const html = await res.text();
    // Find all <h3> dates and their positions
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => ({
      index: m.index + m[0].length, // position AFTER the closing </h3>
      text: strip(m[1]).trim(),
    })).filter(m => {
      const t = m.text;
      // Keep only date strings: contain a digit, not a 4-digit year alone, not empty
      return t.length > 4 && !/^\d{4}$/.test(t) && /\d/.test(t) && t.length < 40;
    });
    // Find all article anchors and their positions (article links only)
    const anchors = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ index: m.index, href: m[1], text: strip(m[2]).trim() }))
      .filter(a => isArticleLink(a.href) && a.text.length > 8);
    const items = [];
    for (const h3 of h3s) {
      // Find the first article anchor that appears after this h3
      const anchor = anchors.find(a => a.index > h3.index);
      if (!anchor) continue;
      // Ensure no other h3 date is between this h3 and the anchor
      const nextH3 = h3s.find(h => h.index > h3.index);
      if (nextH3 && anchor.index > nextH3.index) continue;
      const href = anchor.href.startsWith('http') ? anchor.href : `https://www.corp.att.com${anchor.href}`;
      let datetime = new Date().toISOString();
      try { datetime = new Date(h3.text).toISOString(); } catch (_) {}
      items.push({
        newsid: `corp-${href.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        datetime,
        source: 'AT&T Corp PR',
        headline: decode(anchor.text),
        qmsummary: '',
        permalink: href,
        storyurl: href,
        _source: 'corp-pr',
      });
    }
    return { items, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}
// ─── 4. investors.att.com/news-releases/YEAR ─────────────────────────────────
// SSR table. Actual column order: Date | Documents (with story link) | Title
// Bug fix: title is in cells[2] (strip "Title" prefix), href is in cells[1] raw HTML
// Also scrape multiple years for full archive
async function fetchIRReleasesYear(year) {
  try {
    const res = await fetch(`https://investors.att.com/news-and-events/news-releases/${year}`, { headers: BROWSER_HEADERS });
    if (!res.ok) return [];
    const html = await res.text();
    return parseIRReleasesHtml(html, year);
  } catch (_) { return []; }
}
function parseIRReleasesHtml(html, year) {
  const results = [];
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  for (const row of rows) {
    const rawCells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1]);
    if (rawCells.length < 2) continue;
    const cells = rawCells.map(c => decode(strip(c)));
    // Date is always in cells[0], strip "Date" responsive label prefix
    const dateText = cells[0].replace(/^Date\s*/i, '').trim();
    if (!dateText || dateText === 'Date' || dateText.length < 4) continue;
    let datetime = new Date().toISOString();
    try { datetime = new Date(dateText).toISOString(); } catch (_) { continue; }
    if (isNaN(new Date(datetime).getTime())) continue;
    // Title: look in cells[1] and cells[2], strip "Title"/"Documents" prefix
    // Take whichever cell has the longest meaningful text after stripping labels
    let titleText = '';
    let hrefFound = '';
    for (const rawCell of rawCells) {
      const cellText = decode(strip(rawCell)).replace(/^(Date|Documents|Title)\s*/i, '').trim();
      const hrefMatch = rawCell.match(/href="(https?:\/\/[^"]+)"/i);
      if (hrefMatch && !hrefFound) hrefFound = hrefMatch[1];
      if (cellText.length > titleText.length && cellText.length > 10 &&
          !['date', 'documents', 'title', 'pdf'].includes(cellText.toLowerCase())) {
        titleText = cellText;
      }
    }
    if (!titleText || titleText.length < 5) continue;
    // Prefer about.att.com links; fallback to any link found
    const aboutMatch = rawCells.join(' ').match(/href="(https?:\/\/(?:about|investors)\.att\.com[^"]+)"/i);
    const href = aboutMatch ? aboutMatch[1] : hrefFound;
    results.push({
      newsid: `ir-${year}-${titleText.replace(/[^a-z0-9]/gi, '-').slice(0, 50)}`,
      datetime,
      source: 'AT&T IR',
      headline: titleText,
      qmsummary: '',
      permalink: href || `https://investors.att.com/news-and-events/news-releases/${year}`,
      storyurl: href || `https://investors.att.com/news-and-events/news-releases/${year}`,
      _source: 'ir-releases',
    });
  }
  return results;
}
async function fetchIRReleases() {
  try {
    // Fetch 2024, 2025, 2026 in parallel for a useful archive
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];
    const batches = await Promise.all(years.map(y => fetchIRReleasesYear(y)));
    const items = batches.flat();
    return { items, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}
// ─── 5. investors.att.com/events-and-presentations ───────────────────────────
// Page is partially JS-rendered (Upcoming tab is client-side) but Past events
// are in SSR HTML. We parse what we can; graceful failure is acceptable.
async function fetchIREvents() {
  try {
    const res = await fetch('https://investors.att.com/news-and-events/events-and-presentations', { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `IR Events HTTP ${res.status}` };
    const html = await res.text();
    const plain = strip(html);
    const items = [];
    // Look for patterns like "January 28, 2026 Q4 2025 AT&T Earnings Call"
    // or event card blocks containing date + title
    const eventPattern = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b([^|<]{10,120}?)(?=\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d|$|\s+(?:Upcoming|Past|Tab|View))/gi;
    for (const m of plain.matchAll(eventPattern)) {
      const dateText = `${m[1]} ${m[2]}, ${m[3]}`;
      const titleText = m[4].replace(/\s+/g, ' ').trim();
      if (titleText.length < 5) continue;
      // Skip if title looks like boilerplate
      if (/^(please|check|tab|for|events|presentations|upcoming|past)/i.test(titleText)) continue;
      let datetime = new Date().toISOString();
      try { datetime = new Date(dateText).toISOString(); } catch (_) { continue; }
      items.push({
        newsid: `irevent-${titleText.replace(/[^a-z0-9]/gi, '-').slice(0, 60)}`,
        datetime,
        source: 'AT&T IR Events',
        headline: decode(titleText),
        qmsummary: '',
        permalink: 'https://investors.att.com/news-and-events/events-and-presentations',
        storyurl: 'https://investors.att.com/news-and-events/events-and-presentations',
        _source: 'ir-events',
      });
    }
    return { items, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}
// ─── Merge & deduplicate ──────────────────────────────────────────────────────
function normalizeHl(h) { return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60); }
function mergeAndDedup(allResults) {
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];
  for (const { items } of allResults) {
    for (const item of (items || [])) {
      const kh = normalizeHl(item.headline);
      const ku = item.permalink || '';
      if (!kh || kh.length < 4) continue;
      if (seenHl.has(kh) || (ku && seenUrl.has(ku))) continue;
      seenHl.add(kh);
      if (ku) seenUrl.add(ku);
      out.push(item);
    }
  }
  out.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return out;
}
// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const debug = req.query?.debug === '1';
  const now = Date.now();
  if (!debug && cache && now - cacheTime < CACHE_TTL) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cache);
  }
  try {
    const [qm, allNews, corpPR, irReleases, irEvents] = await Promise.all([
      fetchQuoteMedia(),
      fetchAllNews(),
      fetchCorpPR(),
      fetchIRReleases(),
      fetchIREvents(),
    ]);
    const merged = mergeAndDedup([qm, allNews, corpPR, irReleases, irEvents]);
    if (debug) {
      return res.status(200).json({
        sources: {
          quotemedia:  { count: qm.items.length,         error: qm.error,         sample: qm.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source })) },
          allnews:     { count: allNews.items.length,    error: allNews.error,    total: allNews.total, raw: allNews.raw, sample: allNews.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          corpPR:      { count: corpPR.items.length,     error: corpPR.error,     sample: corpPR.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          irReleases:  { count: irReleases.items.length, error: irReleases.error, sample: irReleases.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          irEvents:    { count: irEvents.items.length,   error: irEvents.error,   sample: irEvents.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime })) },
        },
        mergedCount: merged.length,
        mergedSample: merged.slice(0, 5).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source, _source: i._source })),
      });
    }
    const payload = JSON.stringify(merged);
    cache = payload;
    cacheTime = now;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-QM-Count', qm.items.length);
    res.setHeader('X-AllNews-Count', allNews.items.length);
    res.setHeader('X-CorpPR-Count', corpPR.items.length);
    res.setHeader('X-IR-Releases-Count', irReleases.items.length);
    res.setHeader('X-IR-Events-Count', irEvents.items.length);
    res.setHeader('X-Total', merged.length);
    return res.status(200).send(payload);
  } catch (e) {
    console.error('att-news error:', e);
    return res.status(500).json({ error: e.message });
  }
}
