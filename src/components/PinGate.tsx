'use client';

import { useEffect, useState, useCallback } from 'react';
import PinUnlock from './PinUnlock';

type GateState = 'loading' | 'locked' | 'unlocked';

/**
 * PinGate wraps the app and shows a full-screen PIN unlock screen
 * until the user provides a valid 6-digit PIN.
 *
 * If no AUTH_PIN is configured on the server, the gate stays locked
 * (secure by default — shows "PIN not configured" state).
 */
export default function PinGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>('loading');
  const [notConfigured, setNotConfigured] = useState(false);

  // On mount, check if we already have a valid PIN in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('auth-pin');

    if (!stored) {
      setState('locked');
      return;
    }

    // Verify the stored PIN is still valid
    fetch('/api/auth/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: stored }),
    })
      .then(res => {
        if (res.ok) {
          setState('unlocked');
        } else if (res.status === 403) {
          // No AUTH_PIN configured — stay locked
          setNotConfigured(true);
          setState('locked');
        } else {
          // PIN changed or invalid — re-prompt
          localStorage.removeItem('auth-pin');
          setState('locked');
        }
      })
      .catch(() => {
        // Network error — allow cached PIN (offline-friendly)
        setState('unlocked');
      });
  }, []);

  const handleSuccess = useCallback((pin: string) => {
    localStorage.setItem('auth-pin', pin);
    setState('unlocked');
  }, []);

  // Loading — black screen (prevents flash)
  if (state === 'loading') {
    return <div className="pin-gate-overlay" />;
  }

  // Locked — show PIN screen
  if (state === 'locked') {
    if (notConfigured) {
      return (
        <div className="pin-gate-denied">
          <svg
            width={32}
            height={32}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,100,100,0.5)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pin-gate-denied-icon"
          >
            <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <div className="pin-gate-denied-text">
            Access Denied
            <br />
            <span className="pin-gate-denied-sub">
              No AUTH_PIN configured on server
            </span>
          </div>
        </div>
      );
    }

    return <PinUnlock onSuccess={handleSuccess} />;
  }

  // Unlocked — render app
  return <>{children}</>;
}
