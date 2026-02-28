'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { authFetch } from '@/lib/auth-fetch';

interface Note {
  id: number;
  content: string;
  category: string;
  title: string | null;
  description: string | null;
  hidden: boolean;
  createdAt: string;
}

type Category = 'article' | 'enhancement' | 'other';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'article', label: 'Article' },
  { value: 'enhancement', label: 'Enhancement' },
  { value: 'other', label: 'Other' },
];

/** Threshold (in chars) below which we show content inline without collapse. */
const SHORT_NOTE_THRESHOLD = 150;

function linkifyContent(text: string): (string | React.ReactElement)[] {
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[1];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="notes-card-link"
      >
        {url}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
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

function isAiEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('ai-enabled') !== 'false';
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

  // Track which note IDs are expanded
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  // Track which note IDs are currently generating AI previews
  const [generating, setGenerating] = useState<Set<number>>(new Set());
  // Whether the hidden notes section is expanded
  const [showHidden, setShowHidden] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const toggleExpanded = useCallback((id: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

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

  async function handleToggleHidden(id: number, hide: boolean) {
    const prev = notes;
    // Optimistic update
    setNotes(cur => cur.map(n => n.id === id ? { ...n, hidden: hide } : n));
    try {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hidden: hide }),
      });
      if (!res.ok) {
        setNotes(prev);
        setError('Failed to update note');
      }
    } catch {
      setNotes(prev);
      setError('Failed to update note — check your connection');
    }
  }

  async function handleGeneratePreview(note: Note) {
    if (generating.has(note.id)) return;
    if (!isAiEnabled()) {
      setError('AI features are disabled — re-enable with the AI toggle in the nav bar.');
      return;
    }

    setGenerating(prev => new Set(prev).add(note.id));
    setError(null);

    try {
      const res = await authFetch('/api/notes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note.content }),
      });

      const data = await res.json();

      if (data.disabled) {
        setError('AI features are disabled — re-enable with the AI toggle in the nav bar.');
        return;
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      const { title, description } = data;

      // Persist to DB
      const patchRes = await fetch(`/api/notes?id=${note.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!patchRes.ok) {
        setError('Generated preview but failed to save it');
        return;
      }

      // Update local state
      setNotes(prev =>
        prev.map(n => n.id === note.id ? { ...n, title, description } : n)
      );
    } catch {
      setError('Failed to generate preview — check your connection');
    } finally {
      setGenerating(prev => {
        const next = new Set(prev);
        next.delete(note.id);
        return next;
      });
    }
  }

  /** Render collapsible content for a note card */
  function renderNoteContent(note: Note) {
    const isShort = note.content.length <= SHORT_NOTE_THRESHOLD;
    const hasPreview = !!(note.title || note.description);
    const isExpanded = expanded.has(note.id);

    // Short notes without preview: show inline (no collapse)
    if (isShort && !hasPreview) {
      return (
        <div className="notes-card-content">
          {linkifyContent(note.content)}
        </div>
      );
    }

    // Notes with AI-generated preview
    if (hasPreview) {
      return (
        <>
          {note.title && (
            <div className="notes-card-title">{note.title}</div>
          )}
          {note.description && (
            <div className="notes-card-desc">{note.description}</div>
          )}
          <button
            className="notes-card-toggle"
            onClick={() => toggleExpanded(note.id)}
          >
            <svg
              className={`notes-card-chevron${isExpanded ? ' notes-card-chevron--open' : ''}`}
              width={10}
              height={6}
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 1L5 5L9 1" />
            </svg>
            {isExpanded ? 'Hide full text' : 'Show full text'}
          </button>
          {isExpanded && (
            <div className="notes-card-body">
              {linkifyContent(note.content)}
            </div>
          )}
        </>
      );
    }

    // Long notes without preview: 3-line clamp with expand toggle
    return (
      <>
        {!isExpanded ? (
          <div className="notes-card-content notes-card-content--clamped">
            {linkifyContent(note.content)}
          </div>
        ) : (
          <div className="notes-card-content">
            {linkifyContent(note.content)}
          </div>
        )}
        <button
          className="notes-card-toggle"
          onClick={() => toggleExpanded(note.id)}
        >
          <svg
            className={`notes-card-chevron${isExpanded ? ' notes-card-chevron--open' : ''}`}
            width={10}
            height={6}
            viewBox="0 0 10 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1L5 5L9 1" />
          </svg>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </>
    );
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
                      data-cat={cat.value}
                      data-active={isActive ? "true" : "false"}
                      onClick={() => setCategory(cat.value)}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Save button */}
              <div className="notes-form-actions">
                <button
                  className={`notes-save-btn${saving ? ' notes-save-btn--saving' : ''}`}
                  onClick={handleCreate}
                  disabled={!content.trim() || saving}
                >
                  {saving ? 'Saving...' : 'Save note'}
                </button>
              </div>
            </div>

            {/* AI status indicator — shown when global AI toggle is off */}
            {!isAiEnabled() && (
              <div className="notes-ai-status">
                <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                </svg>
                AI features disabled — enable via the AI toggle in the nav bar
              </div>
            )}

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

              {/* Visible notes */}
              {notes.filter(n => !n.hidden).map((note) => {
                const isGenerating = generating.has(note.id);
                const hasPreview = !!(note.title || note.description);

                return (
                  <div key={note.id} className="notes-card">
                    {/* Top row: badge + timestamp + AI + hide + delete */}
                    <div className="notes-card-meta">
                      <span
                        className="notes-card-badge"
                        data-cat={note.category}
                      >
                        {note.category}
                      </span>
                      <span className="notes-card-time">
                        {timeAgo(note.createdAt)}
                      </span>
                      {/* AI button — shown for every note without a preview */}
                      {!hasPreview && !isGenerating && (
                        <button
                          className={`notes-card-ai-btn${!isAiEnabled() ? ' notes-card-ai-btn--disabled' : ''}`}
                          onClick={() => handleGeneratePreview(note)}
                          title={isAiEnabled() ? 'Generate AI title & summary' : 'AI features are disabled'}
                        >
                          <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                          </svg>
                        </button>
                      )}
                      {isGenerating && (
                        <span className="notes-card-generating-badge">AI...</span>
                      )}
                      {/* Hide button */}
                      <button
                        className="notes-hide-btn"
                        onClick={() => handleToggleHidden(note.id, true)}
                        title="Hide note"
                      >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1={1} y1={1} x2={23} y2={23} />
                        </svg>
                      </button>
                      {/* Delete button */}
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
                    {renderNoteContent(note)}
                  </div>
                );
              })}

              {/* Hidden notes section */}
              {notes.some(n => n.hidden) && (
                <div className="notes-hidden-section">
                  <button
                    className="notes-hidden-toggle"
                    onClick={() => setShowHidden(prev => !prev)}
                  >
                    <svg
                      className={`notes-card-chevron${showHidden ? ' notes-card-chevron--open' : ''}`}
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1L5 5L9 1" />
                    </svg>
                    Hidden ({notes.filter(n => n.hidden).length})
                  </button>

                  {showHidden && notes.filter(n => n.hidden).map((note) => (
                    <div key={note.id} className="notes-card notes-card--hidden">
                      <div className="notes-card-meta">
                        <span
                          className="notes-card-badge"
                          data-cat={note.category}
                        >
                          {note.category}
                        </span>
                        <span className="notes-card-time">
                          {timeAgo(note.createdAt)}
                        </span>
                        {/* Unhide button */}
                        <button
                          className="notes-unhide-btn"
                          onClick={() => handleToggleHidden(note.id, false)}
                          title="Unhide note"
                        >
                          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx={12} cy={12} r={3} />
                          </svg>
                        </button>
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
                      <div className="notes-card-content notes-card-content--hidden">
                        {note.title || (note.content.length > 80 ? note.content.slice(0, 80) + '...' : note.content)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
