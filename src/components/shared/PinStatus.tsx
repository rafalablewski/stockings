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
  const accent = isClosed ? '255,77,79' : '126,231,135';

  return (
    <>
      <style>{`
        @keyframes navBadgeFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .nav-pin-badge {
          animation: navBadgeFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .nav-pin-badge:hover {
          background: rgba(${isClosed ? '255,77,79' : '126,231,135'}, 0.16) !important;
          border-color: rgba(${isClosed ? '255,77,79' : '126,231,135'}, 0.32) !important;
        }
        .nav-pin-badge .nav-badge-dot {
          animation: navDotPulse 3s ease-in-out infinite;
        }
        @keyframes navDotPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.35); }
        }
      `}</style>
      <span
        className="nav-pin-badge"
        title={isClosed ? 'No AUTH_PIN configured — access denied' : 'PIN protection active'}
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
          background: `rgba(${accent}, 0.08)`,
          color: `rgba(${accent}, 0.7)`,
          border: `1px solid rgba(${accent}, 0.18)`,
          lineHeight: 1,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'default',
        }}
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
          style={{ transition: 'transform 0.25s' }}
        >
          <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        {isClosed ? 'Closed' : 'PIN'}
        <span
          className="nav-badge-dot"
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: `rgba(${accent}, 0.7)`,
            marginLeft: 1,
          }}
        />
      </span>
    </>
  );
}
