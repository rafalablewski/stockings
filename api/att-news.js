// api/att-news.js — AT&T (T) press release proxy v4
// Sources:
//   1. QuoteMedia / AccessWire   — PR Newswire + Canada Newswire + Business Wire
//   2. about.att.com RSS feed    — AT&T Newsroom press releases (replaces JSONP)
//   3. corp.att.com/worldwide    — global business press releases 2018-2024 (SSR)
//   4. investors.att.com         — IR news releases 2024/2025/2026 (SSR table)
//   5. investors.att.com         — IR events & presentations (SSR, tight pattern)
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
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .trim();
}

function strip(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Parse corp PR date formats: '7 MARCH 2023', '20 DEC 2022', '10 APRIL 2024', 'JUNE 2019'
// Handles all-caps AND D MMMM YYYY ordering (both fail with plain new Date())
function parseDate(str) {
  if (!str) return null;
  // Normalize all-caps to title case
  const s = str.replace(/\b([A-Z]{2,})\b/g, w => w[0] + w.slice(1).toLowerCase()).trim();
  // Reorder 'D MMMM YYYY' → 'MMMM D, YYYY'
  const dmy = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmy) {
    const d = new Date(`${dmy[2]} ${dmy[1]}, ${dmy[3]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  // Handle month-only: 'June 2019' → June 1, 2019
  const my = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (my) {
    const d = new Date(`${my[1]} 1, ${my[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
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

// ─── 2. AT&T Newsroom — dropped (about.att.com blocks all server-side fetches) ──
async function fetchAllNews() {
  return { items: [], error: null, skipped: true };
}



// ─── 3. corp.att.com/worldwide/att-press-release/ ────────────────────────────
// SSR WordPress. <h3>10 APRIL 2024</h3> → next article link
// Only article links allowed (not nav links to corp.att.com)

const CORP_PR_ALLOWED = [
  'about.att.com',
  'linkedin.com/pulse',
  'cybersecurity.att.com',
  'alienvault.com',
  'frost.com',
  'business.att.com/learn',
];

async function fetchCorpPR() {
  try {
    const res = await fetch('https://www.corp.att.com/worldwide/att-press-release/', { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `Corp PR HTTP ${res.status}` };
    const html = await res.text();

    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => ({
      end: m.index + m[0].length,
      text: strip(m[1]).trim(),
    })).filter(m => {
      const t = m.text;
      return t.length > 4 && !/^\d{4}$/.test(t) && /\d/.test(t) && t.length < 40;
    });

    const anchors = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ index: m.index, href: m[1], text: strip(m[2]).trim() }))
      .filter(a => CORP_PR_ALLOWED.some(d => a.href.includes(d)) && a.text.length > 8);

    const items = [];
    for (const h3 of h3s) {
      const anchor = anchors.find(a => a.index > h3.end);
      if (!anchor) continue;
      const nextH3 = h3s.find(h => h.end > h3.end);
      if (nextH3 && anchor.index > nextH3.end) continue;

      const href = anchor.href.startsWith('http') ? anchor.href : `https://www.corp.att.com${anchor.href}`;
      const datetime = parseDate(h3.text) || new Date().toISOString();

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
// Confirmed column order from debug: Date | Title (label prefix) | Documents (has link)
// Fix: headline = strip label from each cell, pick longest non-boilerplate text
// href = first about.att.com or investors.att.com link in the row

function parseIRReleasesHtml(html) {
  const results = [];
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  const SKIP = new Set(['date', 'documents', 'title', 'pdf', 'view', '']);

  for (const row of rows) {
    const rawCells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1]);
    if (rawCells.length < 2) continue;

    const dateText = decode(strip(rawCells[0])).replace(/^Date\s*/i, '').trim();
    if (!dateText || dateText.length < 4) continue;
    const datetime = parseDate(dateText);
    if (!datetime) continue;

    let headline = '';
    let href = '';

    for (const rawCell of rawCells) {
      const linkMatch = rawCell.match(/href="(https?:\/\/(?:about|investors)\.att\.com[^"]+)"/i);
      if (linkMatch && !href) href = linkMatch[1];

      const text = decode(strip(rawCell)).replace(/^(Date|Documents|Title|PDF)\s*/i, '').trim();
      if (text.length > headline.length && !SKIP.has(text.toLowerCase())) {
        headline = text;
      }
    }

    // Fallback: derive from URL slug
    if ((!headline || headline.length < 5) && href) {
      headline = href.split('/').pop().replace(/\.html$/, '').replace(/-/g, ' ');
    }
    if (!headline || headline.length < 5) continue;

    results.push({
      newsid: `ir-${datetime.slice(0, 10)}-${headline.replace(/[^a-z0-9]/gi, '-').slice(0, 40)}`,
      datetime,
      source: 'AT&T IR',
      headline,
      qmsummary: '',
      permalink: href || '',
      storyurl: href || '',
      _source: 'ir-releases',
    });
  }
  return results;
}

async function fetchIRReleases() {
  try {
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];
    const yearResults = {};
    const batches = await Promise.all(years.map(async year => {
      try {
        const res = await fetch(
          `https://investors.att.com/news-and-events/news-releases/${year}`,
          { headers: BROWSER_HEADERS }
        );
        yearResults[year] = { status: res.status };
        if (!res.ok) return [];
        const html = await res.text();
        yearResults[year].htmlLength = html.length;
        const parsed = parseIRReleasesHtml(html);
        yearResults[year].count = parsed.length;
        yearResults[year].htmlSample = html.slice(0, 800);
        return parsed;
      } catch (e) {
        yearResults[year] = { error: e.message };
        return [];
      }
    }));
    return { items: batches.flat(), error: null, yearResults };
  } catch (e) { return { items: [], error: e.message }; }
}

// ─── 5. investors.att.com/events-and-presentations ───────────────────────────
// Previous approach produced 162 garbage items from calendar UI text.
// New approach: tight regex matching only known earnings/investor event title patterns.

async function fetchIREvents() {
  try {
    const res = await fetch(
      'https://investors.att.com/news-and-events/events-and-presentations',
      { headers: BROWSER_HEADERS }
    );
    if (!res.ok) return { items: [], error: `IR Events HTTP ${res.status}` };
    const html = await res.text();
    const items = [];
    const seen = new Set();

    // Match known AT&T event title patterns only
    const patterns = [
      /Q[1-4]\s*20\d{2}\s*AT&amp;T\s*Earnings\s*Call/gi,
      /Q[1-4]\s*20\d{2}\s*AT&T\s*Earnings\s*Call/gi,
      /AT&(?:amp;)?T\s*Analyst\s*(?:&amp;|&|and)\s*Investor\s*Day/gi,
      /AT&(?:amp;)?T\s*Investor\s*Day/gi,
    ];

    for (const pattern of patterns) {
      for (const m of html.matchAll(pattern)) {
        const title = decode(strip(m[0]));
        if (seen.has(title)) continue;
        seen.add(title);

        const surrounding = html.slice(Math.max(0, m.index - 400), m.index + 400);
        const dateMatch = surrounding.match(
          /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/i
        );
        let datetime = new Date().toISOString();
        if (dateMatch) {
          const parsed = new Date(`${dateMatch[1]} ${dateMatch[2]}, ${dateMatch[3]}`);
          if (!isNaN(parsed.getTime())) datetime = parsed.toISOString();
        }

        items.push({
          newsid: `irevent-${title.replace(/[^a-z0-9]/gi, '-').slice(0, 50)}`,
          datetime,
          source: 'AT&T IR Events',
          headline: title,
          qmsummary: '',
          permalink: 'https://investors.att.com/news-and-events/events-and-presentations',
          storyurl: 'https://investors.att.com/news-and-events/events-and-presentations',
          _source: 'ir-events',
        });
      }
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
  const version = 'v4-rss-2026-03-08';
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
          quotemedia:  { count: qm.items.length,         error: qm.error,
                         sample: qm.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source })) },
          allnews:     { count: allNews.items.length,    error: allNews.error,    strategy: allNews.strategy, sourceUrl: allNews.sourceUrl, tried: allNews.tried,
                         sample: allNews.items.slice(0, 3).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          corpPR:      { count: corpPR.items.length,     error: corpPR.error,
                         sample: corpPR.items.slice(0, 3).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          irReleases:  { count: irReleases.items.length, error: irReleases.error, yearResults: irReleases.yearResults,
                         sample: irReleases.items.slice(0, 3).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          irEvents:    { count: irEvents.items.length,   error: irEvents.error,
                         sample: irEvents.items.slice(0, 3).map(i => ({ headline: i.headline, datetime: i.datetime })) },
        },
        version,
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
