'use client';

import { useEffect, useState } from 'react';

type Status = 'loading' | 'open' | 'locked';

export default function PinStatus() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    fetch('/api/auth/verify-pin')
      .then(res => res.json())
      .then(data => setStatus(data.required ? 'locked' : 'open'))
      .catch(() => setStatus('open'));
  }, []);

  if (status === 'loading') return null;

  const isOpen = status === 'open';

  return (
    <span
      title={isOpen ? 'No PIN configured — open access' : 'PIN protection active'}
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
        background: isOpen ? 'rgba(255,177,66,0.10)' : 'rgba(126,231,135,0.10)',
        color: isOpen ? 'rgba(255,177,66,0.7)' : 'rgba(126,231,135,0.7)',
        border: `1px solid ${isOpen ? 'rgba(255,177,66,0.20)' : 'rgba(126,231,135,0.20)'}`,
        lineHeight: 1,
      }}
    >
      {/* lock / unlock icon */}
      <svg
        width={10}
        height={10}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isOpen ? (
          <>
            <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
          </>
        ) : (
          <>
            <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </>
        )}
      </svg>
      {isOpen ? 'Open' : 'PIN'}
    </span>
  );
}
