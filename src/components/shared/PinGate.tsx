'use client';

import React, { useState, useEffect, useRef, type ReactNode } from 'react';

interface PinGateProps {
  children: ReactNode;
}

const STORAGE_KEY = 'auth-pin';

export default function PinGate({ children }: PinGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [pinRequired, setPinRequired] = useState<boolean | null>(null); // null = loading
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // On mount: check if PIN auth is required, and if already unlocked
  useEffect(() => {
    fetch('/api/auth/verify-pin')
      .then(res => res.json())
      .then(data => {
        if (!data.required) {
          // No PIN configured on server — skip gate
          setPinRequired(false);
          setUnlocked(true);
          return;
        }
        setPinRequired(true);
        // Check if we already have a stored PIN
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          // Verify it's still valid
          fetch('/api/auth/verify-pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: stored }),
          })
            .then(res => {
              if (res.ok) {
                setUnlocked(true);
              } else {
                // Stored PIN is stale — clear it
                localStorage.removeItem(STORAGE_KEY);
              }
            })
            .catch((err) => {
              console.error('[PinGate] Stored PIN verification failed:', err);
              localStorage.removeItem(STORAGE_KEY);
            });
        }
      })
      .catch((err) => {
        console.error('[PinGate] Could not reach auth endpoint:', err);
        setPinRequired(true);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || checking) return;

    setChecking(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() }),
      });

      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, pin.trim());
        setUnlocked(true);
      } else {
        setError('Incorrect PIN');
        setPin('');
        inputRef.current?.focus();
      }
    } catch (err) {
      console.error('[PinGate] PIN submission error:', err);
      setError('Connection error');
    } finally {
      setChecking(false);
    }
  };

  // Still loading — show nothing
  if (pinRequired === null) return null;

  // No PIN required or already unlocked
  if (unlocked) return <>{children}</>;

  // Show PIN gate
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 240,
        padding: 32,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          padding: '32px 40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
          maxWidth: 280,
          width: '100%',
        }}
      >
        {/* Lock icon */}
        <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>

        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Enter PIN to unlock
        </div>

        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="••••"
          autoFocus
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Space Mono, monospace',
            letterSpacing: '0.3em',
            padding: '8px 12px',
            borderRadius: 6,
            border: `1px solid ${error ? 'rgba(255,77,79,0.4)' : 'rgba(255,255,255,0.1)'}`,
            background: 'rgba(255,255,255,0.03)',
            color: '#F0F6FC',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
        />

        {error && (
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#FF4D4F',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!pin.trim() || checking}
          style={{
            width: '100%',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '8px 16px',
            borderRadius: 5,
            background: pin.trim() ? 'rgba(121,192,255,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${pin.trim() ? 'rgba(121,192,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
            color: pin.trim() ? 'rgba(121,192,255,0.9)' : 'rgba(255,255,255,0.2)',
            cursor: pin.trim() ? 'pointer' : 'default',
            transition: 'all 0.15s',
          }}
        >
          {checking ? 'Verifying…' : 'Unlock'}
        </button>
      </form>
    </div>
  );
}
