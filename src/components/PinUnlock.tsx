'use client';

import { useState, useCallback, useEffect } from 'react';

const PIN_LENGTH = 6;

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [null, '0', 'delete'],
] as const;

type KeyValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'delete' | null;

interface PinUnlockProps {
  onSuccess: (pin: string) => void;
}

export default function PinUnlock({ onSuccess }: PinUnlockProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKey = useCallback((key: KeyValue) => {
    if (key === null || verifying) return;

    if (key === 'delete') {
      setDigits(prev => prev.slice(0, -1));
      setError('');
      return;
    }

    setDigits(prev => {
      if (prev.length >= PIN_LENGTH) return prev;
      return [...prev, key];
    });
    setError('');
  }, [verifying]);

  // Keyboard input
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key >= '0' && e.key <= '9') {
        handleKey(e.key as KeyValue);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleKey('delete');
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (digits.length !== PIN_LENGTH) return;

    const pin = digits.join('');
    setVerifying(true);

    fetch('/api/auth/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
      .then(res => {
        if (res.ok) {
          onSuccess(pin);
        } else {
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setDigits([]);
            setVerifying(false);
            setError('Invalid PIN');
          }, 500);
        }
      })
      .catch(() => {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits([]);
          setVerifying(false);
          setError('Connection error');
        }, 500);
      });
  }, [digits, onSuccess]);

  return (
    <div className="pin-unlock">
      {/* Subtle radial glow */}
      <div className="pin-unlock-glow" />

      {/* Brand */}
      <div className="pin-unlock-brand">
        <div className="pin-unlock-title">
          a b i s o n
        </div>

        {/* Lock icon */}
        <div className="pin-unlock-icon-wrap">
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
        </div>

        <div className="pin-unlock-subtitle">
          Enter your security PIN
        </div>
      </div>

      {/* PIN dots */}
      <div className={`pin-unlock-dots${shake ? ' pin-unlock-dots--shake' : ''}`}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <div
            key={i}
            className="pin-unlock-dot"
            data-filled={i < digits.length ? 'true' : undefined}
          />
        ))}
      </div>

      {/* Error message */}
      <div className="pin-unlock-error" data-visible={error ? 'true' : undefined}>
        {error || '\u00A0'}
      </div>

      {/* Keypad */}
      <div className="pin-unlock-keypad">
        {KEYS.map((row, ri) => (
          <div key={ri} className="pin-unlock-keyrow">
            {row.map((key, ci) => {
              if (key === null) {
                return <div key={ci} className="pin-unlock-spacer" />;
              }

              const isDelete = key === 'delete';

              return (
                <button
                  key={ci}
                  onClick={() => handleKey(key)}
                  disabled={verifying}
                  className={`pin-unlock-key${isDelete ? ' pin-unlock-key--delete' : ''}`}
                >
                  {isDelete ? (
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                      <line x1={18} y1={9} x2={12} y2={15} />
                      <line x1={12} y1={9} x2={18} y2={15} />
                    </svg>
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
