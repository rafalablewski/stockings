'use client';

import { useState } from 'react';

interface Release {
  date: string;
  headline: string;
  url: string;
  source: string;
}

interface ScrapeResult {
  symbol: string;
  companyName: string;
  releases: Release[];
  fetchedAt: string;
}

export default function ScraperPage() {
  const [symbol, setSymbol] = useState('ASTS');
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleScrape() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/press-releases/${encodeURIComponent(symbol)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const data: ScrapeResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Scrape failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold text-white mb-3">Press Release Scraper</h1>
          <p className="text-[13px] text-white/40">
            Scrape press releases from Issuer Direct, Business Wire, IR pages, and Google News RSS.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-10">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Ticker (e.g. ASTS)"
            className="w-32 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
          />
          <button
            onClick={handleScrape}
            disabled={loading || !symbol.trim()}
            className="px-6 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] text-[13px] text-white/80 hover:bg-white/[0.12] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Scraping…' : 'Scrape'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-[13px] text-red-400">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[13px] font-mono text-white/60">{result.symbol}</span>
              <span className="text-[11px] text-white/30">{result.companyName}</span>
              <span className="text-[11px] text-white/20 ml-auto">
                {result.releases.length} releases · fetched {new Date(result.fetchedAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="grid gap-3">
              {result.releases.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-white/80 group-hover:text-white transition-colors leading-relaxed">
                        {r.headline}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        {r.date && (
                          <span className="text-[11px] font-mono text-white/30">{r.date}</span>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-white/20">{r.source}</span>
                      </div>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {result.releases.length === 0 && (
              <p className="text-[13px] text-white/30 text-center py-12">No press releases found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
