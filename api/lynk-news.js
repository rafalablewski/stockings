// api/lynk-news.js
// lynk.world runs WordPress — use the WP REST API for clean JSON
// Endpoint: /wp-json/wp/v2/posts?per_page=100&_fields=id,title,link,date,excerpt,categories
// v9: WP REST API
const VERSION = 'v9-wp-api-2026-03-09';
const CACHE_TTL = 60 * 1000;
let cache = null;
let cacheTime = 0;
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'application/json',
};
function strip(s) { return (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function decode(s) {
  return (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, '\u2019').replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D').replace(/&#8211;/g, '\u2013')
    .replace(/&#8230;/g, '\u2026');
}
async function fetchPosts(page = 1) {
  const url = `https://lynk.world/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=id,title,link,date,excerpt,categories,tags&orderby=date&order=desc`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
    const total = parseInt(res.headers.get('X-WP-Total') || '0');
    if (!res.ok) return { posts: [], totalPages: 0, total: 0, error: `HTTP ${res.status}` };
    const posts = await res.json();
    return { posts, totalPages, total, error: null };
  } catch (e) {
    return { posts: [], totalPages: 0, total: 0, error: e.message };
  }
}
async function fetchAllPosts() {
  const first = await fetchPosts(1);
  if (first.error) return { posts: [], error: first.error };
  let all = [...first.posts];
  if (first.totalPages > 1) {
    const rest = await Promise.all(
      Array.from({ length: first.totalPages - 1 }, (_, i) => fetchPosts(i + 2))
    );
    for (const r of rest) {
      if (!r.error) all = all.concat(r.posts);
    }
  }
  return { posts: all, error: null, total: first.total, totalPages: first.totalPages };
}
function mapPost(post) {
  const title = decode(strip(post.title?.rendered || ''));
  if (!title || title.length < 5) return null;
  const summary = decode(strip(post.excerpt?.rendered || '')).slice(0, 300);
  const link = post.link || '';
  const datetime = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
  return {
    newsid: `lynk-${post.id}`,
    datetime,
    source: 'Lynk Global',
    headline: title,
    qmsummary: summary,
    permalink: link,
    storyurl: link,
    category: 'all',
    _source: 'lynk-wp-api',
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
  const { posts, error, total, totalPages } = await fetchAllPosts();
  const items = posts.map(mapPost).filter(Boolean);
  for (const item of items) {
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
  }
  items.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  cache = items;
  cacheTime = now;
  if (req.query.debug === '1') {
    return res.status(200).json({
      version: VERSION,
      total, totalPages,
      mapped: items.length,
      error,
      sample: items.slice(0, 5).map(i => ({ headline: i.headline, datetime: i.datetime, permalink: i.permalink })),
    });
  }
  res.setHeader('X-Version', VERSION);
  res.setHeader('X-Total', items.length);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ news: items });
}
