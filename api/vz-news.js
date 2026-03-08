// api/vz-news.js
// Proxy for VZ (Verizon Communications) press releases via Google News RSS + Business Wire
// AccessWire has poor coverage for mega-caps, so we aggregate from wire services directly.
// Cache: 5 minutes

let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

// ── Google News RSS filtered to wire services ──

async function fetchGoogleNewsRSS() {
  const wireSites = [
    'site:prnewswire.com',
    'site:businesswire.com',
    'site:globenewswire.com',
  ].join(' OR ');
  const query = `"Verizon" (${wireSites})`;
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const res = await fetch(rssUrl, {
      headers: { 'User-Agent': 'stockings-app/1.0 (research-tool)' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSSItems(xml);
  } catch {
    console.error('[vz-news] Google News RSS failed');
    return [];
  }
}

function decodeHTMLEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseRSSItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 30) {
    const itemXml = match[1];
    const title = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() || '';
    const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() || '';
    const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || '';
    const source = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() || '';

    if (title && title.toLowerCase().includes('verizon')) {
      items.push({
        headline: decodeHTMLEntities(title),
        source: decodeHTMLEntities(source),
        datetime: pubDate ? new Date(pubDate).toISOString() : '',
        newsid: link,
        permalink: link,
        summary: '',
      });
    }
  }

  return items;
}

// ── Business Wire direct scrape ──

async function fetchBusinessWire() {
  const urls = [
    'https://www.businesswire.com/newsroom?q=Verizon',
    'https://www.businesswire.com/newsroom?q=VZ',
  ];

  const all = [];
  const seenUrls = new Set();

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: FETCH_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const html = await res.text();

      // Extract links to press releases
      const linkRegex = /<a[^>]+href=["']((?:https?:\/\/www\.businesswire\.com)?\/news\/home\/\d+[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let match;

      while ((match = linkRegex.exec(html)) !== null && all.length < 30) {
        let href = match[1];
        const linkText = match[2].replace(/<[^>]+>/g, '').trim();

        if (!linkText || linkText.length < 10) continue;
        if (!linkText.toLowerCase().includes('verizon')) continue;

        href = href.startsWith('http') ? href : `https://www.businesswire.com${href}`;
        if (seenUrls.has(href)) continue;
        seenUrls.add(href);

        // Extract date from URL path: /news/home/YYYYMMDD...
        const dateMatch = href.match(/\/news\/home\/(\d{4})(\d{2})(\d{2})\d*/);
        const datetime = dateMatch
          ? new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`).toISOString()
          : '';

        all.push({
          headline: decodeHTMLEntities(linkText),
          source: 'Business Wire',
          datetime,
          newsid: href,
          permalink: href,
          summary: '',
        });
      }
    } catch (err) {
      console.warn('[vz-news] Business Wire fetch failed:', err.message);
    }
  }

  return all;
}

// ── Deduplication ──

function deduplicateItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const normalized = (item.headline || '')
      .toLowerCase()
      .replace(/\s*[-–—]\s*(business wire|pr newswire|globenewswire).*$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 80);
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

// ── Handler ──

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cache);
  }

  try {
    const [rssItems, bwItems] = await Promise.allSettled([
      fetchGoogleNewsRSS(),
      fetchBusinessWire(),
    ]);

    const merged = [
      ...(rssItems.status === 'fulfilled' ? rssItems.value : []),
      ...(bwItems.status === 'fulfilled' ? bwItems.value : []),
    ];

    const deduped = deduplicateItems(merged);

    // Sort newest first
    deduped.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

    const payload = JSON.stringify(deduped);
    cache = payload;
    cacheTime = now;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Total-Filtered', deduped.length);
    return res.status(200).send(payload);
  } catch (err) {
    console.error('vz-news error:', err);
    return res.status(500).json({ error: err.message });
  }
}
