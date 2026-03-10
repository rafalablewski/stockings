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
      className="nav-ai-badge"
      data-enabled={enabled ? 'true' : undefined}
      onClick={toggle}
      title={enabled ? 'AI features enabled — click to disable' : 'AI features disabled — click to enable'}
    >
      <svg
        className="nav-ai-icon"
        width={11}
        height={11}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
      >
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
      </svg>
      AI
    </button>
  );
}
