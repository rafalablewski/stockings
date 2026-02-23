'use client';

import { useEffect, useState } from 'react';

export default function AiToggle() {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ai-enabled');
    setEnabled(stored !== 'false');
    setMounted(true);
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('ai-enabled', next ? 'true' : 'false');
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      title={enabled ? 'AI features enabled — click to disable' : 'AI features disabled — click to enable'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 9,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '2px 7px',
        borderRadius: 3,
        lineHeight: 1,
        cursor: 'pointer',
        background: enabled ? 'rgba(126,231,135,0.10)' : 'rgba(255,255,255,0.04)',
        color: enabled ? 'rgba(126,231,135,0.7)' : 'rgba(255,255,255,0.18)',
        border: `1px solid ${enabled ? 'rgba(126,231,135,0.20)' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.15s',
      }}
    >
      {/* bolt / spark icon */}
      <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
      </svg>
      AI
    </button>
  );
}
