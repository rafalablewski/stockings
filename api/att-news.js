// api/att-news.js
// Proxy for T (AT&T Inc.) press releases
// Sources:
//   1. QuoteMedia/AccessWire (PR Newswire + Canada Newswire + Business Wire)
//   2. services.att.com JSONP API (powers about.att.com/allnews.html) — 943 articles
//   3. www.corp.att.com/worldwide/att-press-release/ (SSR WordPress, 2018-2024 global business PRs)
//   4. investors.att.com/news-and-events/news-releases/2026 (IR press releases table)
//   5. investors.att.com/news-and-events/events-and-presentations (earnings calls + conferences)
// All sources fetched in parallel, merged, deduplicated, sorted by date desc.
// Cache: 5 minutes
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};
function decodeHtmlEntities(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x2013;/g, '–').replace(/&#x2014;/g, '—')
    .replace(/&#xAE;/g, '®').replace(/&#x2122;/g, '™')
    .replace(/&#x2019;/g, "\u2019").replace(/&#x2018;/g, "\u2018")
    .trim();
}
// ─── 1. QuoteMedia ────────────────────────────────────────────────────────────
async function fetchQuoteMedia() {
  try {
    const url =
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=T' +
      '&excludeTopics=NONCOMPANY' +
      '&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true' +
      '&start=1000-01-01&end=3000-01-01';
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
    });
    if (!res.ok) return { items: [], error: `QM HTTP ${res.status}` };
    const raw = await res.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const items = json?.results?.news?.[0]?.newsitem ?? [];
    const officialSources = ['pr newswire', 'canada newswire', 'business wire', 'globenewswire'];
    const filtered = items.filter((item) => {
      const src = (item.source || '').toLowerCase();
      const hl = (item.headline || '').toLowerCase();
      return (
        officialSources.some((s) => src.includes(s)) &&
        (hl.includes('at&t') || hl.includes("at&t's"))
      );
    });
    return { items: filtered.map((i) => ({ ...i, _source: 'quotemedia' })), error: null };
  } catch (err) {
    return { items: [], error: err.message };
  }
}
// ─── 2. about.att.com/allnews.html via services.att.com JSONP API ─────────────
// Endpoint from page source dataSources.enhancedSearch.path
// JSONP response: getResults({ "response": { "docs": [...], "numFound": 943 } })
async function fetchAllNews() {
  try {
    const url =
      'https://services.att.com/search/v1/newsroom' +
      '?app-id=attnews' +
      '&fq=-rejectDoc:true' +
      '&rows=1000' +
      '&sort=published_date+desc' +
      '&callback=getResults';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)',
        'Referer': 'https://about.att.com/',
      },
    });
    if (!res.ok) return { items: [], error: `AllNews HTTP ${res.status}` };
    const text = await res.text();
    const jsonStart = text.indexOf('(');
    const jsonEnd = text.lastIndexOf(')');
    if (jsonStart === -1 || jsonEnd === -1) return { items: [], error: 'JSONP parse failed' };
    const json = JSON.parse(text.slice(jsonStart + 1, jsonEnd));
    const docs = json?.response?.docs ?? [];
    const items = docs.map((doc) => ({
      newsid: `attallnews-${(doc.article_url || doc.id || '').replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
      datetime: doc.published_date || doc.SBC_SEARCH_PUBLISHDATE?.[0] || new Date().toISOString(),
      source: 'AT&T Newsroom',
      headline: doc.article_header || doc.title || '',
      qmsummary: doc.article_description || doc.og_description?.[0] || doc.description || '',
      permalink: doc.article_url || doc.og_url?.[0] || doc.id || '',
      storyurl: doc.article_url || doc.id || '',
      keywords: doc.keywords || '',
      _source: 'allnews',
    }));
    return { items, error: null, total: json?.response?.numFound };
  } catch (err) {
    return { items: [], error: err.message };
  }
}
// ─── 3. corp.att.com/worldwide/att-press-release/ ────────────────────────────
// Fully SSR WordPress page — articles listed as <h3>DATE</h3> followed by <a href>TITLE</a>
// Contains AT&T Business / Global press releases 2018-2024
async function fetchCorpPR() {
  try {
    const res = await fetch('https://www.corp.att.com/worldwide/att-press-release/', {
      headers: BROWSER_HEADERS,
    });
    if (!res.ok) return { items: [], error: `Corp PR HTTP ${res.status}` };
    const html = await res.text();
    const items = [];
    // Split by <h3> tags — each h3 contains a date, followed by a link
    const blocks = html.split(/<h3[^>]*>/i);
    for (const block of blocks) {
      // Extract date from start of block before </h3>
      const dateMatch = block.match(/^([^<]{3,40})<\/h3>/i);
      if (!dateMatch) continue;
      const dateText = dateMatch[1].trim();
      // Skip year headings like "## 2024"
      if (/^\d{4}$/.test(dateText)) continue;
      // Find the first <a> link after the date
      const linkMatch = block.match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
      if (!linkMatch) continue;
      const rawHref = linkMatch[1];
      const href = rawHref.startsWith('http')
        ? rawHref
        : `https://www.corp.att.com${rawHref}`;
      const title = decodeHtmlEntities(linkMatch[2].replace(/<[^>]+>/g, '').trim());
      if (!title || title.length < 5) continue;
      let datetime = new Date().toISOString();
      try { datetime = new Date(dateText).toISOString(); } catch (_) {}
      items.push({
        newsid: `attcorp-${href.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        datetime,
        source: 'AT&T Corp PR',
        headline: title,
        qmsummary: '',
        permalink: href,
        storyurl: href,
        _source: 'corp-pr',
      });
    }
    return { items, error: null };
  } catch (err) {
    return { items: [], error: err.message };
  }
}
// ─── 4. investors.att.com/news-releases/2026 ─────────────────────────────────
function parseIRReleasesHtml(html) {
  const results = [];
  const rowMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  for (const row of rowMatches) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
    if (cells.length < 2) continue;
    const dateText = cells[0].replace(/<[^>]+>/g, '').trim();
    const titleText = decodeHtmlEntities(cells[1].replace(/<[^>]+>/g, '').trim());
    if (!titleText || titleText.length < 5) continue;
    let datetime = new Date().toISOString();
    try { datetime = new Date(dateText).toISOString(); } catch (_) {}
    const hrefMatch = cells[1].match(/href="([^"]+)"/i);
    const href = hrefMatch
      ? hrefMatch[1].startsWith('http') ? hrefMatch[1] : `https://investors.att.com${hrefMatch[1]}`
      : '';
    results.push({
      newsid: `attir-${titleText.replace(/[^a-z0-9]/gi, '-').slice(0, 60)}`,
      datetime,
      source: 'AT&T IR',
      headline: titleText,
      qmsummary: '',
      permalink: href,
      storyurl: href,
      _source: 'ir-releases',
    });
  }
  return results;
}
// ─── 5. investors.att.com/events-and-presentations ───────────────────────────
function parseIREventsHtml(html) {
  const results = [];
  const eventMatches = [...html.matchAll(
    /Date\s*([\w]+ \d{1,2},? \d{4})\s*Title\s*([\s\S]*?)(?:Details|Supporting|Date)/gi,
  )];
  for (const match of eventMatches) {
    const dateText = match[1].trim();
    const titleText = decodeHtmlEntities(match[2].replace(/<[^>]+>/g, '').trim());
    if (!titleText || titleText.length < 5) continue;
    let datetime = new Date().toISOString();
    try { datetime = new Date(dateText).toISOString(); } catch (_) {}
    results.push({
      newsid: `attirevent-${titleText.replace(/[^a-z0-9]/gi, '-').slice(0, 60)}`,
      datetime,
      source: 'AT&T IR Events',
      headline: titleText,
      qmsummary: '',
      permalink: 'https://investors.att.com/news-and-events/events-and-presentations',
      storyurl: 'https://investors.att.com/news-and-events/events-and-presentations',
      _source: 'ir-events',
    });
  }
  return results;
}
async function fetchIRPage(url, parser, label) {
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `${label} HTTP ${res.status}`, htmlLength: 0 };
    const html = await res.text();
    const items = parser(html);
    return { items, error: null, htmlLength: html.length };
  } catch (err) {
    return { items: [], error: `${label}: ${err.message}`, htmlLength: 0 };
  }
}
// ─── Merge & deduplicate ──────────────────────────────────────────────────────
function normalizeHeadline(h) {
  return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
}
function mergeAndDedup(allResults) {
  const seenPerma = new Set();
  const seenHl = new Set();
  const result = [];
  for (const { items } of allResults) {
    for (const item of (items || [])) {
      const kp = item.permalink || '';
      const kh = normalizeHeadline(item.headline);
      if (!kh || kh.length < 4) continue;
      if ((kp && seenPerma.has(kp)) || seenHl.has(kh)) continue;
      if (kp) seenPerma.add(kp);
      seenHl.add(kh);
      result.push(item);
    }
  }
  result.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return result;
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
    const [qmResult, allNewsResult, corpPRResult, irReleasesResult, irEventsResult] = await Promise.all([
      fetchQuoteMedia(),
      fetchAllNews(),
      fetchCorpPR(),
      fetchIRPage(
        'https://investors.att.com/news-and-events/news-releases/2026',
        parseIRReleasesHtml,
        'IR Releases',
      ),
      fetchIRPage(
        'https://investors.att.com/news-and-events/events-and-presentations',
        parseIREventsHtml,
        'IR Events',
      ),
    ]);
    const merged = mergeAndDedup([
      qmResult,
      allNewsResult,
      corpPRResult,
      irReleasesResult,
      irEventsResult,
    ]);
    if (debug) {
      return res.status(200).json({
        sources: {
          quotemedia: { count: qmResult.items.length,        error: qmResult.error,        sample: qmResult.items.slice(0, 2) },
          allnews:    { count: allNewsResult.items.length,   error: allNewsResult.error,   total: allNewsResult.total, sample: allNewsResult.items.slice(0, 2) },
          corpPR:     { count: corpPRResult.items.length,    error: corpPRResult.error,    sample: corpPRResult.items.slice(0, 2) },
          irReleases: { count: irReleasesResult.items.length, error: irReleasesResult.error, sample: irReleasesResult.items.slice(0, 2) },
          irEvents:   { count: irEventsResult.items.length,  error: irEventsResult.error,  sample: irEventsResult.items.slice(0, 2) },
        },
        mergedCount: merged.length,
        mergedSample: merged.slice(0, 5),
      });
    }
    const payload = JSON.stringify(merged);
    cache = payload;
    cacheTime = now;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-QM-Count', qmResult.items.length);
    res.setHeader('X-AllNews-Count', allNewsResult.items.length);
    res.setHeader('X-CorpPR-Count', corpPRResult.items.length);
    res.setHeader('X-IR-Releases-Count', irReleasesResult.items.length);
    res.setHeader('X-IR-Events-Count', irEventsResult.items.length);
    res.setHeader('X-Total', merged.length);
    return res.status(200).send(payload);
  } catch (err) {
    console.error('att-news error:', err);
    return res.status(500).json({ error: err.message });
  }
}
