'use client';

import { useState, useRef, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import { workflows } from '@/data/workflows';

export default function RunAuditButton() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const prompt = workflows.find(w => w.id === 'code-audit')?.variants[0]?.prompt ?? '';

  const handleRun = useCallback(async () => {
    if (!prompt) return;
    setRunning(true);
    setResult('');
    setError('');
    setExpanded(true);

    abortRef.current = new AbortController();

    try {
      const res = await authFetch('/api/workflow/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        setError(err.error || `Error ${res.status}`);
        setRunning(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setError('No response stream');
        setRunning(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') continue;
            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                setResult(prev => prev + data.text);
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setRunning(false);
    }
  }, [prompt]);

  const handleStop = () => {
    abortRef.current?.abort();
    setRunning(false);
  };

  return (
    <div>
      {!running ? (
        <button
          onClick={handleRun}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-[0.1em] bg-violet-500/10 border border-violet-500/25 text-violet-400 hover:bg-violet-500/20 transition-all cursor-pointer"
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Run Audit
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-[0.1em] bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x={6} y={6} width={12} height={12} />
          </svg>
          Stop
        </button>
      )}

      {(result || running || error) && (
        <div className="mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer"
            style={{ borderRadius: expanded ? '8px 8px 0 0' : 8 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
              Audit Results
            </span>
            <svg
              width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              style={{ color: 'rgba(255,255,255,0.3)', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          {expanded && (
            <div className="px-4 py-3 rounded-b-lg bg-white/[0.015] border border-t-0 border-white/[0.06] max-h-[600px] overflow-auto">
              {error && (
                <p className="text-[11px] text-red-400 mb-2">{error}</p>
              )}
              {result && (
                <pre className="text-[11px] leading-relaxed text-white/60 whitespace-pre-wrap font-mono">
                  {result}
                </pre>
              )}
              {running && !result && (
                <p className="text-[11px] text-white/30">Running audit...</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
