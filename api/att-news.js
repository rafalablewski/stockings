// api/att-news.js — AT&T (T) press release proxy v5
// Sources:
//   1. QuoteMedia / AccessWire — PR Newswire + Canada Newswire + Business Wire (~188 items)
//   2. corp.att.com/worldwide  — global business press releases 2018-2024 SSR (~50 items)
// Dropped: about.att.com (403 all methods), investors.att.com (JS-rendered Sitecore)
// Cache: 5 min

const VERSION = 'v5-clean-2026-03-08';

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
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .trim();
}

function strip(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Handles all corp.att.com date formats:
//   '10 APRIL 2024'  → April 10, 2024
//   '20 DEC 2022'    → Dec 20, 2022
//   '7 MARCH 2023'   → March 7, 2023
//   'JUNE 2019'      → June 1, 2019
function parseCorpDate(str) {
  if (!str) return null;
  // Title-case: 'MARCH' → 'March'
  const s = str.replace(/\b([A-Z]{2,})\b/g, w => w[0] + w.slice(1).toLowerCase()).trim();
  // 'D MMMM YYYY' or 'DD MMMM YYYY'
  const dmy = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmy) {
    const d = new Date(`${dmy[2]} ${dmy[1]}, ${dmy[3]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  // 'MMMM YYYY' (no day — use 1st)
  const my = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (my) {
    const d = new Date(`${my[1]} 1, ${my[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  // Anything else
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

// ─── 1. QuoteMedia ────────────────────────────────────────────────────────────

async function fetchQuoteMedia() {
  try {
    const url =
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=T&excludeTopics=NONCOMPANY&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true&start=1000-01-01&end=3000-01-01';
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
    });
    if (!res.ok) return { items: [], error: `QM HTTP ${res.status}` };
    const raw = await res.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const items = json?.results?.news?.[0]?.newsitem ?? [];
    const official = ['pr newswire', 'canada newswire', 'business wire', 'globenewswire'];
    const filtered = items.filter(i => {
      const src = (i.source || '').toLowerCase();
      const hl = (i.headline || '').toLowerCase();
      return (
        official.some(s => src.includes(s)) &&
        (hl.includes('at&t') || hl.includes("at&t's"))
      );
    });
    return { items: filtered.map(i => ({ ...i, _source: 'quotemedia' })), error: null };
  } catch (e) {
    return { items: [], error: e.message };
  }
}

// ─── 2. corp.att.com/worldwide/att-press-release/ ────────────────────────────
// SSR WordPress. Structure: <h3>10 APRIL 2024</h3> ... <a href="about.att.com/...">TITLE</a>
// Nav links excluded — only article-domain links kept.

const ARTICLE_DOMAINS = [
  'about.att.com',
  'linkedin.com/pulse',
  'cybersecurity.att.com',
  'alienvault.com',
  'frost.com',
  'business.att.com/learn',
];

async function fetchCorpPR() {
  try {
    const res = await fetch(
      'https://www.corp.att.com/worldwide/att-press-release/',
      { headers: BROWSER_HEADERS }
    );
    if (!res.ok) return { items: [], error: `Corp PR HTTP ${res.status}` };
    const html = await res.text();

    // All date h3s (position = index after closing tag)
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)]
      .map(m => ({ end: m.index + m[0].length, text: strip(m[1]).trim() }))
      .filter(m => {
        const t = m.text;
        return t.length > 4 && !/^\d{4}$/.test(t) && /\d/.test(t) && t.length < 40;
      });

    // Article anchors only
    const anchors = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ index: m.index, href: m[1], text: strip(m[2]).trim() }))
      .filter(a => ARTICLE_DOMAINS.some(d => a.href.includes(d)) && a.text.length > 8);

    const items = [];
    for (const h3 of h3s) {
      const anchor = anchors.find(a => a.index > h3.end);
      if (!anchor) continue;
      const nextH3 = h3s.find(h => h.end > h3.end);
      if (nextH3 && anchor.index > nextH3.end) continue;

      const href = anchor.href.startsWith('http')
        ? anchor.href
        : `https://www.corp.att.com${anchor.href}`;
      const datetime = parseCorpDate(h3.text) || new Date().toISOString();

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
  } catch (e) {
    return { items: [], error: e.message };
  }
}

// ─── Merge & deduplicate ──────────────────────────────────────────────────────

function normalizeHl(h) {
  return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
}

function mergeAndDedup(sources) {
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];
  for (const { items } of sources) {
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
    const [qm, corpPR] = await Promise.all([
      fetchQuoteMedia(),
      fetchCorpPR(),
    ]);

    const merged = mergeAndDedup([qm, corpPR]);

    if (debug) {
      return res.status(200).json({
        version: VERSION,
        sources: {
          quotemedia: {
            count: qm.items.length,
            error: qm.error,
            sample: qm.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source })),
          },
          corpPR: {
            count: corpPR.items.length,
            error: corpPR.error,
            sample: corpPR.items.slice(0, 5).map(i => ({ headline: i.headline, datetime: i.datetime })),
          },
        },
        mergedCount: merged.length,
        mergedSample: merged.slice(0, 5).map(i => ({
          headline: i.headline, datetime: i.datetime, source: i.source, _source: i._source,
        })),
      });
    }

    const payload = JSON.stringify(merged);
    cache = payload;
    cacheTime = now;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Version', VERSION);
    res.setHeader('X-QM-Count', qm.items.length);
    res.setHeader('X-CorpPR-Count', corpPR.items.length);
    res.setHeader('X-Total', merged.length);

    return res.status(200).send(payload);
  } catch (e) {
    console.error('att-news error:', e);
    return res.status(500).json({ error: e.message });
  }
}
