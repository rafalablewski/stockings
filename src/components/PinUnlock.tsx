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
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Brand */}
      <div style={{
        marginBottom: 56,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: '0.5em',
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 40,
        }}>
          a b i s o n
        </div>

        {/* Lock icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
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

        <div style={{
          fontSize: 13,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.05em',
        }}>
          Enter your security PIN
        </div>
      </div>

      {/* PIN dots */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 48,
          animation: shake ? 'pinShake 0.5s ease-in-out' : undefined,
        }}
      >
        {Array.from({ length: PIN_LENGTH }).map((_, i) => {
          const filled = i < digits.length;
          return (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: filled ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                background: filled ? 'rgba(255,255,255,0.85)' : 'transparent',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: filled ? 'scale(1)' : 'scale(0.85)',
              }}
            />
          );
        })}
      </div>

      {/* Error message */}
      <div style={{
        height: 20,
        marginBottom: 16,
        fontSize: 12,
        fontWeight: 500,
        color: error ? 'rgba(255,100,100,0.8)' : 'transparent',
        letterSpacing: '0.05em',
        transition: 'color 0.2s',
      }}>
        {error || '\u00A0'}
      </div>

      {/* Keypad */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {KEYS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {row.map((key, ci) => {
              if (key === null) {
                return <div key={ci} style={{ width: 76, height: 76 }} />;
              }

              const isDelete = key === 'delete';

              return (
                <button
                  key={ci}
                  onClick={() => handleKey(key)}
                  disabled={verifying}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: isDelete ? 0 : 24,
                    fontWeight: 300,
                    fontFamily: 'inherit',
                    cursor: verifying ? 'default' : 'pointer',
                    opacity: verifying ? 0.4 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseDown={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = 'rgba(255,255,255,0.10)';
                    btn.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = 'rgba(255,255,255,0.03)';
                    btn.style.transform = 'scale(1)';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = 'rgba(255,255,255,0.03)';
                    btn.style.transform = 'scale(1)';
                  }}
                  onTouchStart={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = 'rgba(255,255,255,0.10)';
                    btn.style.transform = 'scale(0.95)';
                  }}
                  onTouchEnd={(e) => {
                    const btn = e.currentTarget;
                    btn.style.background = 'rgba(255,255,255,0.03)';
                    btn.style.transform = 'scale(1)';
                  }}
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

      {/* Shake animation */}
      <style>{`
        @keyframes pinShake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-8px); }
          30%, 70% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
