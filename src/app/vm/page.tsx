'use client';

import { useState, useCallback } from 'react';

interface ScrapedRelease {
  title: string;
  date: string;
  url: string;
}

interface ScrapeResult {
  ok: boolean;
  url: string;
  strategy: string;
  count: number;
  results: ScrapedRelease[];
  fetchedAt: string;
  error?: string;
}

export default function VMPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<ScrapeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const scrape = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setStatus('loading');
    setData(null);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/vm/scrape?url=${encodeURIComponent(trimmed)}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        setErrorMsg(json.error || `Request failed (${res.status})`);
        setStatus('error');
        return;
      }

      setData(json);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }, [url]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && status !== 'loading') scrape();
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
          }}
        >
          VM — Press Release Scraper
        </h1>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 6,
          }}
        >
          Paste any IR or press release page URL. The server fetches the HTML and
          extracts all press releases it can find.
        </p>
      </div>

      {/* Input bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://investors.example.com/press-releases"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            color: 'rgba(255,255,255,0.85)',
            outline: 'none',
            fontFamily: "'Space Mono', monospace",
          }}
        />
        <button
          onClick={scrape}
          disabled={status === 'loading' || !url.trim()}
          style={{
            padding: '10px 20px',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            borderRadius: 8,
            border: 'none',
            cursor: status === 'loading' || !url.trim() ? 'not-allowed' : 'pointer',
            background:
              status === 'loading'
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(34,211,238,0.12)',
            color:
              status === 'loading'
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(34,211,238,0.85)',
            transition: 'all 0.15s',
          }}
        >
          {status === 'loading' ? 'Scraping…' : 'Scrape'}
        </button>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(255,123,114,0.06)',
            border: '1px solid rgba(255,123,114,0.15)',
            color: 'rgba(255,123,114,0.85)',
            fontSize: 13,
            marginBottom: '1.5rem',
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Results */}
      {data && (
        <>
          {/* Meta bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: '1rem',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <span>
              {data.count} result{data.count !== 1 ? 's' : ''}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
            <span>
              strategy: <span style={{ color: 'rgba(34,211,238,0.6)' }}>{data.strategy}</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
            <span>{new Date(data.fetchedAt).toLocaleTimeString()}</span>
          </div>

          {data.results.length === 0 ? (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: 13,
              }}
            >
              No press releases found on this page.
            </div>
          ) : (
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '10px 14px',
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '10px 14px',
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((item, i) => (
                    <tr
                      key={i}
                      className="hover-row"
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <td
                        style={{
                          padding: '10px 14px',
                          whiteSpace: 'nowrap',
                          color: 'rgba(255,255,255,0.35)',
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 11,
                          verticalAlign: 'top',
                          width: 120,
                        }}
                      >
                        {item.date || '—'}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: 'rgba(121,192,255,0.85)',
                              textDecoration: 'none',
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.textDecoration = 'underline')
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.textDecoration = 'none')
                            }
                          >
                            {item.title}
                          </a>
                        ) : (
                          <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                            {item.title}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
