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
      {/* Trigger badge button */}
      <button
        className="nav-notes-badge"
        onClick={() => setOpen(true)}
        title="Open notes"
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
          {open && <div className="notes-backdrop" onClick={close} />}

          {/* Drawer */}
          <div
            className={`notes-drawer${open ? ' notes-drawer--open' : ''}`}
            role="dialog"
            aria-modal={open}
            aria-label="Notes panel"
          >
            {/* Header */}
            <div className="notes-header">
              <span className="notes-header-title">Notes</span>
              <button className="notes-close-btn" onClick={close}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>

            {/* Create form */}
            <div className="notes-form">
              <textarea
                className="notes-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleCreate();
                  }
                }}
              />

              {/* Category selector */}
              <div className="notes-categories">
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      className="notes-cat-btn"
                      onClick={() => setCategory(cat.value)}
                      style={{
                        border: `1px solid rgba(${cat.color}, ${isActive ? 0.3 : 0.08})`,
                        background: isActive ? `rgba(${cat.color}, 0.12)` : 'rgba(255,255,255,0.03)',
                        color: isActive ? `rgba(${cat.color}, 0.9)` : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Save button */}
              <button
                className={`notes-save-btn${saving ? ' notes-save-btn--saving' : ''}`}
                onClick={handleCreate}
                disabled={!content.trim() || saving}
              >
                {saving ? 'Saving...' : 'Save note'}
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="notes-error">
                <span>{error}</span>
                <button className="notes-error-dismiss" onClick={() => setError(null)}>
                  ×
                </button>
              </div>
            )}

            {/* Notes list */}
            <div className="notes-list">
              {loading && (
                <div className="notes-status">Loading...</div>
              )}

              {!loading && notes.length === 0 && (
                <div className="notes-status notes-status--empty">
                  No notes yet. Add your first note above.
                </div>
              )}

              {notes.map((note) => {
                const col = categoryColor(note.category);
                return (
                  <div key={note.id} className="notes-card">
                    {/* Top row: badge + timestamp + delete */}
                    <div className="notes-card-meta">
                      <span
                        className="notes-card-badge"
                        style={{
                          color: `rgba(${col}, 0.8)`,
                          background: `rgba(${col}, 0.08)`,
                          border: `1px solid rgba(${col}, 0.15)`,
                        }}
                      >
                        {note.category}
                      </span>
                      <span className="notes-card-time">
                        {timeAgo(note.createdAt)}
                      </span>
                      <button
                        className="notes-delete-btn"
                        onClick={() => handleDelete(note.id)}
                        title="Delete note"
                      >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="notes-card-content">
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
