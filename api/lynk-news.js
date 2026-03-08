// api/lynk-news.js
// Cloudflare blocks Vercel IPs on lynk.world directly.
// Solution: fetch via allorigins.win which has non-blocked IPs.
// Cache: 60s
const VERSION = 'v5-allorigins-2026-03-09';
const CACHE_TTL = 60 * 1000;
let cache = null;
let cacheTime = 0;
function proxyUrl(url) {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
}
async function fetchHtml(url) {
  try {
    const res = await fetch(proxyUrl(url));
    if (!res.ok) return { html: '', error: `allorigins HTTP ${res.status}` };
    const json = await res.json();
    // allorigins returns { contents: "<html>...", status: { http_code: 200 } }
    if (json?.status?.http_code && json.status.http_code !== 200) {
      return { html: '', error: `origin HTTP ${json.status.http_code}` };
    }
    return { html: json?.contents || '', error: null };
  } catch (e) {
    return { html: '', error: e.message };
  }
}
function strip(s) { return (s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
function decode(s) {
  return (s||'')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&nbsp;/g,' ')
    .replace(/&#8217;/g,'\u2019').replace(/&#8216;/g,'\u2018')
    .replace(/&#8220;/g,'\u201C').replace(/&#8221;/g,'\u201D')
    .replace(/&#8211;/g,'\u2013').replace(/&#8230;/g,'\u2026');
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
const NAV_EXACT = new Set([
  'https://lynk.world/','https://lynk.world/what-we-do/','https://lynk.world/how-we-do-it/',
  'https://lynk.world/our-partners/','https://lynk.world/news/','https://lynk.world/careers/',
  'https://lynk.world/our-team/','https://lynk.world/the-human-impact/','https://lynk.world/blog/',
  'https://lynk.world/contact/','https://lynk.world/podcasts-and-videos/',
  'https://lynk.world/op-eds/','https://lynk.world/press-releases/','https://lynk.world/media-coverage/',
  'https://lynk.world/news/#news_anchor','https://lynk.world/media-coverage/#news_anchor',
  'https://lynk.world/podcasts-and-videos/#news_anchor','https://lynk.world/op-eds/#news_anchor',
  'https://lynk.world/press-releases/#news_anchor',
]);
function validHref(href) {
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  const full = href.startsWith('http') ? href : `https://lynk.world${href.startsWith('/')? href : '/'+href}`;
  return !NAV_EXACT.has(full);
}
function parsePage(html, category) {
  const elements = [];
  let m;
  const reDate = /<p[^>]*>\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)[^<]{3,20})\s*<\/p>/gi;
  while ((m = reDate.exec(html)) !== null) {
    const t = m[1].trim();
    if (/\d{4}/.test(t)) elements.push({ type:'date', pos:m.index, text:t });
  }
  const reH5 = /<h5[^>]*>([\s\S]*?)<\/h5>/gi;
  while ((m = reH5.exec(html)) !== null) {
    const a = m[1].match(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!a) continue;
    const text = decode(strip(a[2]));
    if (!text || text.length < 8) continue;
    if (!validHref(a[1])) continue;
    const full = a[1].startsWith('http') ? a[1] : `https://lynk.world${a[1].startsWith('/')? a[1] : '/'+a[1]}`;
    elements.push({ type:'heading', pos:m.index, href:full, text });
  }
  const reH6 = /<h6[^>]*>([\s\S]*?)<\/h6>/gi;
  while ((m = reH6.exec(html)) !== null) {
    const t = decode(strip(m[1]));
    if (t && t.length > 1 && t.length < 120) elements.push({ type:'source', pos:m.index, text:t });
  }
  const reP = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((m = reP.exec(html)) !== null) {
    const t = decode(strip(m[1]));
    if (t.length > 40 && !/^(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(t)) {
      elements.push({ type:'summary', pos:m.index, text:t });
    }
  }
  elements.sort((a,b) => a.pos - b.pos);
  const headings = elements.filter(e => e.type === 'heading');
  const items = [];
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const nextH = headings[i+1];
    const nearDate = elements.filter(e => e.type==='date' && e.pos < h.pos).pop();
    const src = elements.find(e => e.type==='source' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
    const summary = elements.find(e => e.type==='summary' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
    items.push({
      newsid: `lynk-${h.href.replace(/[^a-z0-9]/gi,'-').slice(-60)}`,
      datetime: parseDate(nearDate?.text) || new Date().toISOString(),
      source: src?.text || 'Lynk Global',
      headline: h.text,
      qmsummary: (summary?.text || '').slice(0, 300),
      permalink: h.href,
      storyurl: h.href,
      category,
      _source: 'lynk',
    });
  }
  return items;
}
async function fetchAll() {
  const pages = [
    { url: 'https://lynk.world/news/', category: 'all' },
    { url: 'https://lynk.world/press-releases/', category: 'press-release' },
    { url: 'https://lynk.world/media-coverage/', category: 'media' },
    { url: 'https://lynk.world/podcasts-and-videos/', category: 'media' },
    { url: 'https://lynk.world/op-eds/', category: 'opinion' },
  ];
  const results = await Promise.all(pages.map(async p => {
    const { html, error } = await fetchHtml(p.url);
    if (error || !html) return { items: [], error, htmlLen: 0 };
    const items = parsePage(html, p.category);
    return { items, error: null, htmlLen: html.length };
  }));
  const allItems = results.flatMap(r => r.items);
  const seen = new Set();
  const unique = allItems.filter(item => {
    const key = item.permalink.toLowerCase().replace(/\/+$/,'');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const now = Date.now();
  for (const item of unique) {
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
  }
  unique.sort((a,b) => new Date(b.datetime) - new Date(a.datetime));
  return {
    items: unique,
    debugPages: pages.map((p,i) => ({
      url: p.url,
      count: results[i].items.length,
      htmlLen: results[i].htmlLen,
      error: results[i].error,
    })),
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
  const { items, debugPages } = await fetchAll();
  cache = items;
  cacheTime = now;
  if (req.query.debug === '1') {
    return res.status(200).json({ version: VERSION, total: items.length, pages: debugPages,
      sample: items.slice(0,5).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source })) });
  }
  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', items.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: items });
}
