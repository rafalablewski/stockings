'use client';

import { useState } from 'react';

export default function ScraperPage() {
  const [url, setUrl] = useState('');
  const [renderJs, setRenderJs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ html: string; length: number; fetchedAt: string } | null>(null);
  const [error, setError] = useState('');

  async function handleScrape() {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), renderJs }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status})`);
        return;
      }

      setResult(data);
    } catch {
      setError('Network error — could not reach the API');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Scraper
        </h1>
        <p className="text-sm text-white/40 mb-10">
          Fetch any webpage via ScraperAPI — handles proxies, CAPTCHAs, and JS rendering.
        </p>

        {/* Input */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
            />
            <button
              onClick={handleScrape}
              disabled={loading || !url.trim()}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              {loading ? 'Scraping...' : 'Scrape'}
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={renderJs}
              onChange={(e) => setRenderJs(e.target.checked)}
              className="w-4 h-4 rounded border border-white/20 bg-white/[0.04] accent-white"
            />
            <span className="text-xs text-white/50">
              Render JavaScript (slower, needed for SPAs)
            </span>
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span>Length: {result.length.toLocaleString()} chars</span>
              <span className="text-white/10">|</span>
              <span>Fetched: {new Date(result.fetchedAt).toLocaleTimeString()}</span>
            </div>
            <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
                <span className="text-[11px] text-white/30 uppercase tracking-wider">HTML Response</span>
                <button
                  onClick={() => navigator.clipboard.writeText(result.html)}
                  className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 text-xs text-white/60 overflow-auto max-h-[600px] whitespace-pre-wrap break-words font-mono">
                {result.html}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
