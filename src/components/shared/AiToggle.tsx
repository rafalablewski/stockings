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

  const accent = enabled ? '126,231,135' : '255,255,255';

  return (
    <>
      <style>{`
        @keyframes navBadgeFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .nav-ai-badge {
          animation: navBadgeFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: 0.06s;
        }
        .nav-ai-badge:hover {
          background: rgba(${enabled ? '126,231,135' : '255,255,255'}, 0.16) !important;
          border-color: rgba(${enabled ? '126,231,135' : '255,255,255'}, 0.32) !important;
          transform: scale(1.04);
        }
        .nav-ai-badge:active {
          transform: scale(0.96);
        }
        .nav-ai-badge .nav-ai-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nav-ai-badge:hover .nav-ai-icon {
          transform: rotate(12deg) scale(1.15);
        }
      `}</style>
      <button
        className="nav-ai-badge"
        onClick={toggle}
        title={enabled ? 'AI features enabled — click to disable' : 'AI features disabled — click to enable'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          padding: '4px 10px',
          borderRadius: 6,
          height: 24,
          lineHeight: 1,
          cursor: 'pointer',
          background: enabled ? 'rgba(126,231,135,0.08)' : 'rgba(255,255,255,0.03)',
          color: `rgba(${accent}, ${enabled ? 0.7 : 0.18})`,
          border: `1px solid rgba(${accent}, ${enabled ? 0.18 : 0.06})`,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
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
    </>
  );
}
