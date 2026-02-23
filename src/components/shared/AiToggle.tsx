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
      className="cursor-pointer select-none transition-colors"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        fontSize: '11px',
        letterSpacing: '0.05em',
        color: enabled ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)',
      }}
    >
      AI {enabled ? '◉' : '○'}
    </button>
  );
}
