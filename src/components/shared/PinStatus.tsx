'use client';

import { useEffect, useState } from 'react';

type Status = 'loading' | 'closed' | 'locked';

export default function PinStatus() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    fetch('/api/auth/verify-pin')
      .then(res => res.json())
      .then(data => {
        if (data.required && data.configured) {
          setStatus('locked');  // PIN set and active
        } else {
          setStatus('closed');  // No PIN configured — access denied
        }
      })
      .catch(() => setStatus('closed'));
  }, []);

  if (status === 'loading') return null;

  const isClosed = status === 'closed';

  return (
    <span
      className="nav-pin-badge"
      data-status={isClosed ? 'closed' : undefined}
      title={isClosed ? 'No AUTH_PIN configured — access denied' : 'PIN protection active'}
    >
      <svg
        width={11}
        height={11}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      {isClosed ? 'Closed' : 'PIN'}
      <span className="nav-badge-dot" />
    </span>
  );
}
