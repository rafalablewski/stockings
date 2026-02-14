/**
 * Article Scraper — Extract text content from news article URLs
 *
 * Fetches article HTML and extracts the main text content.
 * Used by the analyze-news agent to provide full article context
 * to the LLM instead of headline-only analysis.
 *
 * Falls back gracefully when articles can't be fetched (paywalls,
 * JS-rendered pages, rate limits).
 */

const SCRAPE_TIMEOUT_MS = 8000;
const MAX_CONTENT_LENGTH = 3000; // chars — keeps token usage reasonable

/**
 * Fetch a URL and extract the main article text.
 * Returns empty string on failure (caller should fall back to headline-only).
 */
export async function scrapeArticle(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SCRAPE_TIMEOUT_MS);

    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) return '';

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return '';
    }

    const html = await response.text();
    return extractArticleText(html);
  } catch {
    // Network error, timeout, abort — all fine, we fall back
    return '';
  }
}

/**
 * Scrape multiple articles in parallel with concurrency control.
 * Returns array of {url, content} in the same order as input.
 */
export async function scrapeArticles(
  urls: string[],
  concurrency = 5
): Promise<{ url: string; content: string }[]> {
  const results: { url: string; content: string }[] = new Array(urls.length);

  // Process in batches to avoid overwhelming target servers
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map(url => scrapeArticle(url))
    );

    for (let j = 0; j < batch.length; j++) {
      const result = batchResults[j];
      results[i + j] = {
        url: batch[j],
        content: result.status === 'fulfilled' ? result.value : '',
      };
    }
  }

  return results;
}

// ── HTML → Text extraction ──────────────────────────────────────────────────

function extractArticleText(html: string): string {
  // Remove noise elements first
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Try to find the main article content
  let content = '';

  // Priority 1: <article> tag
  const articleMatch = cleaned.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    content = articleMatch[1];
  }

  // Priority 2: role="main" or <main>
  if (!content) {
    const mainMatch = cleaned.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i)
      || cleaned.match(/role=["']main["'][\s\S]*?>([\s\S]*?)<\/(?:div|section)>/i);
    if (mainMatch) {
      content = mainMatch[1];
    }
  }

  // Priority 3: Common article container classes
  if (!content) {
    const containerMatch = cleaned.match(
      /class=["'][^"']*(?:article-body|article-content|story-body|post-content|entry-content|content-body)[^"']*["'][\s\S]*?>([\s\S]*?)<\/(?:div|section)>/i
    );
    if (containerMatch) {
      content = containerMatch[1];
    }
  }

  // Priority 4: Largest cluster of <p> tags
  if (!content) {
    content = cleaned;
  }

  // Extract text from paragraphs
  const paragraphs: string[] = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pRegex.exec(content)) !== null) {
    const text = stripTags(match[1]).trim();
    if (text.length > 30) {
      paragraphs.push(text);
    }
  }

  // If we got good paragraph content, use it
  if (paragraphs.length >= 2) {
    return truncate(paragraphs.join('\n\n'), MAX_CONTENT_LENGTH);
  }

  // Fallback: strip all tags and return whatever we have
  const fallback = stripTags(content).replace(/\s+/g, ' ').trim();
  return truncate(fallback, MAX_CONTENT_LENGTH);
}

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  // Cut at sentence boundary if possible
  const cut = text.slice(0, maxLength);
  const lastPeriod = cut.lastIndexOf('.');
  if (lastPeriod > maxLength * 0.7) {
    return cut.slice(0, lastPeriod + 1);
  }
  return cut + '...';
}
