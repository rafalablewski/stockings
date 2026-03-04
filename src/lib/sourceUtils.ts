/**
 * Shared article deduplication utilities.
 *
 * Used by both the client-side SharedSourcesTab and the server-side
 * press-releases route to ensure consistent normalisation and dedup logic.
 */

import { HEADLINE_TRUNCATION_LENGTH } from './constants';

/** Minimal article shape required by the utility functions. */
export interface ArticleItemBase {
  headline: string;
  date: string;
  url: string;
  source?: string;
  analyzed?: boolean | null;
}

/** Generate a stable cache key for an article (URL-first, headline fallback). */
export function articleCacheKey(article: { url?: string; headline?: string }): string {
  return (article.url || article.headline || '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, HEADLINE_TRUNCATION_LENGTH);
}

/** Normalize headline for deduplication (matches server-side deduplicateReleases logic). */
export function normalizeHeadline(headline: string): string {
  return headline
    .toLowerCase()
    .replace(/\s*[-–—]\s*(business wire|pr newswire|globenewswire|prnewswire).*$/i, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, HEADLINE_TRUNCATION_LENGTH);
}

/** Remove duplicate articles by normalized headline, keeping first occurrence. */
export function deduplicateByHeadline<T extends { headline: string }>(articles: T[]): T[] {
  const seen = new Set<string>();
  return articles.filter(a => {
    const key = normalizeHeadline(a.headline);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
