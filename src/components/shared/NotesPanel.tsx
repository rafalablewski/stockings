'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Note {
  id: number;
  content: string;
  category: string;
  createdAt: string;
}

type Category = 'article' | 'enhancement' | 'other';

const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'article', label: 'Article', color: '34,211,238' },       // cyan
  { value: 'enhancement', label: 'Enhancement', color: '52,211,153' }, // mint/emerald
  { value: 'other', label: 'Other', color: '167,139,250' },           // violet
];

function categoryColor(cat: string): string {
  return CATEGORIES.find((c) => c.value === cat)?.color ?? '167,139,250';
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function NotesPanel() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Fetch notes when drawer opens for the first time
  useEffect(() => {
    if (!open || hasFetched.current) return;
    setLoading(true);
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.notes || []);
        setError(null);
      })
      .catch(() => setError('Failed to load notes'))
      .finally(() => {
        setLoading(false);
        hasFetched.current = true;
      });
  }, [open]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  async function handleCreate() {
    if (!content.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim(), category }),
      });
      const data = await res.json();
      if (data.ok && data.note) {
        setNotes((prev) => [data.note, ...prev]);
        setContent('');
      } else {
        setError(data.error || 'Failed to save note');
      }
    } catch {
      setError('Failed to save note — check your connection');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const prev = notes;
    setNotes((cur) => cur.filter((n) => n.id !== id));
    try {
      const res = await fetch(`/api/notes?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setNotes(prev);
        setError('Failed to delete note');
      }
    } catch {
      setNotes(prev);
      setError('Failed to delete note — check your connection');
    }
  }

  return (
    <>
      <style>{`
        @keyframes navBadgeFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .nav-notes-badge {
          animation: navBadgeFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: 0.09s;
        }
        .nav-notes-badge:hover {
          background: rgba(167,139,250, 0.16) !important;
          border-color: rgba(167,139,250, 0.32) !important;
          transform: scale(1.04);
        }
        .nav-notes-badge:active {
          transform: scale(0.96);
        }
        .nav-notes-badge .nav-notes-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nav-notes-badge:hover .nav-notes-icon {
          transform: rotate(-8deg) scale(1.15);
        }
        .notes-delete-btn {
          opacity: 0;
          transition: opacity 0.15s;
        }
        .notes-card:hover .notes-delete-btn {
          opacity: 1;
        }
      `}</style>

      {/* Trigger badge button */}
      <button
        className="nav-notes-badge"
        onClick={() => setOpen(true)}
        title="Open notes"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          padding: '4px 10px',
          borderRadius: 6,
          height: 24,
          lineHeight: 1,
          cursor: 'pointer',
          background: 'rgba(167,139,250,0.08)',
          color: 'rgba(167,139,250,0.7)',
          border: '1px solid rgba(167,139,250,0.18)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <svg
          className="nav-notes-icon"
          width={11}
          height={11}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1={16} y1={13} x2={8} y2={13} />
          <line x1={16} y1={17} x2={8} y2={17} />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Notes
      </button>

      {/* Portal the backdrop + drawer to document.body so they escape
           MobileNav's stacking context (backdrop-filter creates one). */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          {open && (
            <div
              onClick={close}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 110,
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />
          )}

          {/* Drawer */}
          <div
            role="dialog"
            aria-modal={open}
            aria-label="Notes panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(400px, calc(100vw - 24px))',
              background: 'rgba(10,10,10,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              zIndex: 120,
              transform: open ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                paddingTop: 'max(20px, env(safe-area-inset-top))',
                minHeight: 56,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Notes
              </span>
              <button
                onClick={close}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)',
                  borderRadius: 6,
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>

            {/* Create form */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.8)',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.5,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleCreate();
                  }
                }}
              />

              {/* Category selector */}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.08em',
                        padding: '4px 10px',
                        borderRadius: 20,
                        cursor: 'pointer',
                        border: `1px solid rgba(${cat.color}, ${isActive ? 0.3 : 0.08})`,
                        background: isActive ? `rgba(${cat.color}, 0.12)` : 'rgba(255,255,255,0.03)',
                        color: isActive ? `rgba(${cat.color}, 0.9)` : 'rgba(255,255,255,0.35)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Save button */}
              <button
                onClick={handleCreate}
                disabled={!content.trim() || saving}
                style={{
                  marginTop: 10,
                  width: '100%',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '8px 0',
                  borderRadius: 8,
                  cursor: !content.trim() || saving ? 'default' : 'pointer',
                  border: 'none',
                  background: !content.trim() ? 'rgba(255,255,255,0.03)' : 'rgba(167,139,250,0.12)',
                  color: !content.trim() ? 'rgba(255,255,255,0.2)' : 'rgba(167,139,250,0.8)',
                  transition: 'all 0.15s',
                  opacity: saving ? 0.5 : 1,
                }}
              >
                {saving ? 'Saving...' : 'Save note'}
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  padding: '8px 20px',
                  fontSize: 12,
                  color: 'rgba(255,123,114,0.9)',
                  background: 'rgba(255,123,114,0.06)',
                  borderBottom: '1px solid rgba(255,123,114,0.1)',
                  flexShrink: 0,
                }}
              >
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,123,114,0.5)',
                    fontSize: 16,
                    lineHeight: 1,
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Notes list */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
              }}
            >
              {loading && (
                <div style={{ padding: '24px 20px', fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
                  Loading...
                </div>
              )}

              {!loading && notes.length === 0 && (
                <div style={{ padding: '24px 20px', fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                  No notes yet. Add your first note above.
                </div>
              )}

              {notes.map((note) => {
                const col = categoryColor(note.category);
                return (
                  <div
                    key={note.id}
                    className="notes-card"
                    style={{
                      padding: '12px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      position: 'relative',
                    }}
                  >
                    {/* Top row: badge + timestamp + delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.08em',
                          fontFamily: 'var(--font-mono, monospace)',
                          color: `rgba(${col}, 0.8)`,
                          background: `rgba(${col}, 0.08)`,
                          border: `1px solid rgba(${col}, 0.15)`,
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}
                      >
                        {note.category}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: 'var(--font-mono, monospace)',
                          color: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        {timeAgo(note.createdAt)}
                      </span>
                      <button
                        className="notes-delete-btn"
                        onClick={() => handleDelete(note.id)}
                        title="Delete note"
                        style={{
                          marginLeft: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 24,
                          height: 24,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(255,255,255,0.2)',
                          borderRadius: 4,
                          flexShrink: 0,
                        }}
                      >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.55,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {note.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
