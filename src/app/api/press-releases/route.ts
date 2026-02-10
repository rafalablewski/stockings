import { NextRequest, NextResponse } from 'next/server';

interface PressRelease {
  date: string;   // ISO format YYYY-MM-DD
  title: string;
}

const MONTH_MAP: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
  january: '01', february: '02', march: '03', april: '04', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

/**
 * Parse a human-readable date string into YYYY-MM-DD format.
 * Handles: "Feb 5, 2026", "February 5, 2026", "2026-02-05", "02/05/2026", etc.
 */
function parseDate(raw: string): string | null {
  const trimmed = raw.trim();

  // ISO format already
  const isoMatch = trimmed.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return isoMatch[0];

  // "Mon DD, YYYY" or "Month DD, YYYY"
  const usMatch = trimmed.match(/(\w+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (usMatch) {
    const month = MONTH_MAP[usMatch[1].toLowerCase()];
    if (month) {
      return `${usMatch[3]}-${month}-${usMatch[2].padStart(2, '0')}`;
    }
  }

  return null;
}

/**
 * Parse press releases from HTML using multiple strategies.
 */
function parsePressReleasesFromHtml(html: string): PressRelease[] {
  const releases: PressRelease[] = [];

  // Strategy 1: <time datetime="..."> near headline links
  // Common on Notified/Q4 IR platforms
  const timeBlockRegex = /<time[^>]*(?:datetime=["']([^"']+)["'])?[^>]*>([\s\S]*?)<\/time>/gi;
  const blocks: { date: string; position: number }[] = [];
  let timeMatch;
  while ((timeMatch = timeBlockRegex.exec(html)) !== null) {
    const dateStr = timeMatch[1] || timeMatch[2];
    const parsed = parseDate(dateStr);
    if (parsed) {
      blocks.push({ date: parsed, position: timeMatch.index });
    }
  }

  // For each time block, find the nearest headline link after it
  if (blocks.length > 0) {
    for (const block of blocks) {
      const after = html.slice(block.position, block.position + 2000);
      // Look for a link to a press release detail page
      const linkMatch = after.match(/<a[^>]+href=["'][^"']*(?:press-releases?|news)[^"']*["'][^>]*>([\s\S]*?)<\/a>/i);
      if (linkMatch) {
        const title = linkMatch[1].replace(/<[^>]+>/g, '').trim();
        if (title.length > 10) {
          releases.push({ date: block.date, title });
        }
      }
    }
  }

  // Strategy 2: Look for date text patterns near links with press-release paths
  if (releases.length === 0) {
    const prLinkRegex = /<a[^>]+href=["']([^"']*(?:press-releases?|news-releases?)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let prMatch;
    while ((prMatch = prLinkRegex.exec(html)) !== null) {
      const title = prMatch[2].replace(/<[^>]+>/g, '').trim();
      if (title.length < 10) continue;

      // Search backward from the link for a date
      const before = html.slice(Math.max(0, prMatch.index - 500), prMatch.index);
      const datePatterns = before.match(/(\w+ \d{1,2},?\s+\d{4})/g);
      if (datePatterns) {
        const lastDate = datePatterns[datePatterns.length - 1];
        const parsed = parseDate(lastDate);
        if (parsed) {
          releases.push({ date: parsed, title });
        }
      }
    }
  }

  // Strategy 3: Broader scan — any date-like text followed by substantial link text
  if (releases.length === 0) {
    const broadRegex = /(\w{3,9}\s+\d{1,2},?\s+\d{4})[^<]*<[^>]*>[\s\S]{0,200}?<a[^>]+>([\s\S]*?)<\/a>/gi;
    let broadMatch;
    while ((broadMatch = broadRegex.exec(html)) !== null) {
      const parsed = parseDate(broadMatch[1]);
      const title = broadMatch[2].replace(/<[^>]+>/g, '').trim();
      if (parsed && title.length > 10) {
        releases.push({ date: parsed, title });
      }
    }
  }

  // Deduplicate by title similarity
  const seen = new Set<string>();
  return releases.filter(r => {
    const key = r.title.toLowerCase().slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Try to parse RSS/XML feed for press releases.
 */
function parsePressReleasesFromRss(xml: string): PressRelease[] {
  const releases: PressRelease[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const content = itemMatch[1];
    const titleMatch = content.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const dateMatch = content.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    if (titleMatch) {
      const title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      let date = '';
      if (dateMatch) {
        // RFC 2822 date: "Wed, 05 Feb 2026 08:00:00 EST"
        const rfc = dateMatch[1].trim();
        const rfcMatch = rfc.match(/\d{1,2}\s+(\w+)\s+(\d{4})/);
        if (rfcMatch) {
          const month = MONTH_MAP[rfcMatch[1].toLowerCase()];
          const day = rfc.match(/(\d{1,2})\s+\w+\s+\d{4}/)?.[1] || '01';
          if (month) date = `${rfcMatch[2]}-${month}-${day.padStart(2, '0')}`;
        }
        if (!date) {
          const parsed = parseDate(rfc);
          if (parsed) date = parsed;
        }
      }
      if (title.length > 5) {
        releases.push({ date, title });
      }
    }
  }
  return releases;
}

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const count = Math.min(parseInt(searchParams.get('count') || '3', 10), 10);

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const baseOrigin = parsedUrl.origin;

  try {
    let releases: PressRelease[] = [];

    // Attempt 1: Try RSS feed (common paths)
    const rssPaths = ['/rss/news-releases.xml', '/rss/press-releases.xml', '/feed', '/rss'];
    for (const rssPath of rssPaths) {
      if (releases.length > 0) break;
      try {
        const rssResponse = await fetch(`${baseOrigin}${rssPath}`, {
          headers: FETCH_HEADERS,
          signal: AbortSignal.timeout(5000),
        });
        if (rssResponse.ok) {
          const contentType = rssResponse.headers.get('content-type') || '';
          const text = await rssResponse.text();
          if (contentType.includes('xml') || contentType.includes('rss') || text.trimStart().startsWith('<?xml') || text.includes('<rss')) {
            releases = parsePressReleasesFromRss(text);
          }
        }
      } catch {
        // RSS path not available, continue
      }
    }

    // Attempt 2: Try HTML press releases page
    if (releases.length === 0) {
      const htmlPaths = [
        '/news-events/press-releases',
        '/press-releases',
        '/news/press-releases',
        '/news',
        '',  // try the base URL itself
      ];

      for (const htmlPath of htmlPaths) {
        if (releases.length > 0) break;
        try {
          const targetUrl = htmlPath ? `${baseOrigin}${htmlPath}` : url;
          const htmlResponse = await fetch(targetUrl, {
            headers: FETCH_HEADERS,
            signal: AbortSignal.timeout(8000),
          });
          if (htmlResponse.ok) {
            const html = await htmlResponse.text();
            releases = parsePressReleasesFromHtml(html);
          }
        } catch {
          // Path not available, continue
        }
      }
    }

    // Sort by date descending and limit
    releases.sort((a, b) => b.date.localeCompare(a.date));
    const limited = releases.slice(0, count);

    return NextResponse.json({ pressReleases: limited });
  } catch (error) {
    console.error('Press release fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}
