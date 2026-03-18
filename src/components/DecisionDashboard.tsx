'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { authFetch } from '@/lib/auth-fetch';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Decision {
  id: number;
  pm: string;
  engineerId: string;
  runId: number | null;
  ticker: string;
  title: string;
  category: string;
  payload: string;
  status: string;
  pmNotes: string | null;
  bossNotes: string | null;
  createdAt: string;
  updatedAt: string;
}


const PM_META: Record<string, { label: string; color: string; badge: string }> = {
  'claude':       { label: 'Claude',      color: '#22d3ee', badge: 'ARCH' },
  'cursor':       { label: 'Cursor',      color: '#a78bfa', badge: 'UI' },
  'gemini':       { label: 'Gemini',      color: '#34d399', badge: 'R&D' },
  'maszka':       { label: 'Maszka',      color: '#f472b6', badge: 'UI' },
  'bobman':       { label: 'Bobman',      color: '#fb923c', badge: 'PM' },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'pending':        { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', label: 'Pending' },
  'pm-approved':    { bg: 'rgba(52, 211, 153, 0.15)', text: '#34d399', label: 'PM Approved' },
  'pm-rejected':    { bg: 'rgba(248, 113, 113, 0.15)', text: '#f87171', label: 'PM Rejected' },
  'boss-approved':  { bg: 'rgba(34, 211, 238, 0.15)', text: '#22d3ee', label: 'Boss Approved' },
  'boss-rejected':  { bg: 'rgba(248, 113, 113, 0.2)', text: '#ef4444', label: 'Boss Rejected' },
};

const SWIPE_THRESHOLD = 120;
const REJECT_STATUSES = ['pm-rejected', 'boss-rejected'];

// ── Gmail-style swipe hook ───────────────────────────────────────────────────

function useSwipeLeft(
  onSwipe: () => void,
  enabled: boolean,
  indicatorRef: React.RefObject<HTMLDivElement | null>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const swiping = useRef(false);
  const didSwipe = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    function applySwipeVisuals(dx: number) {
      const el = ref.current;
      if (!el) return;
      const absDx = Math.abs(dx);
      const progress = Math.min(1, absDx / SWIPE_THRESHOLD);

      el.style.transform = `translateX(${dx}px)`;

      // Update indicator
      const ind = indicatorRef.current;
      if (ind) {
        ind.style.opacity = String(Math.min(1, progress * 1.5));
        // Scale the icon like Gmail
        const iconEl = ind.querySelector('.dec-swipe-icon') as HTMLElement | null;
        if (iconEl) {
          const scale = 0.6 + progress * 0.4;
          iconEl.style.transform = `scale(${scale})`;
          iconEl.style.opacity = String(progress);
        }
        // Red bg intensifies
        const bgAlpha = Math.min(0.95, progress * 0.95);
        ind.style.background = `rgba(220, 38, 38, ${bgAlpha})`;
      }
    }

    function finishSwipe() {
      const el = ref.current;
      if (!el) return;
      swiping.current = false;
      const absDx = Math.abs(currentX.current);

      if (absDx >= SWIPE_THRESHOLD) {
        didSwipe.current = true;
        // Slide off-screen like Gmail
        el.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 1, 1)';
        el.style.transform = `translateX(-${el.offsetWidth + 20}px)`;
        setTimeout(onSwipe, 260);
      } else {
        // Snap back with spring
        el.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        el.style.transform = 'translateX(0)';
        // Fade indicator
        const ind = indicatorRef.current;
        if (ind) {
          ind.style.transition = 'opacity 0.3s ease, background 0.3s ease';
          ind.style.opacity = '0';
          ind.style.background = 'rgba(220, 38, 38, 0)';
          setTimeout(() => { ind.style.transition = ''; }, 300);
        }
        setTimeout(() => { didSwipe.current = false; }, 100);
      }
    }

    // ── Touch ──
    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      currentX.current = 0;
      swiping.current = true;
      didSwipe.current = false;
      el.style.transition = 'none';
      const ind = indicatorRef.current;
      if (ind) ind.style.transition = 'none';
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!swiping.current) return;
      const dx = e.touches[0].clientX - startX.current;
      currentX.current = Math.min(0, dx);
      applySwipeVisuals(currentX.current);
    };

    const onTouchEnd = () => {
      if (!swiping.current) return;
      finishSwipe();
    };

    // ── Mouse (desktop) ──
    const onMouseDown = (e: MouseEvent) => {
      // Only left button
      if (e.button !== 0) return;
      startX.current = e.clientX;
      currentX.current = 0;
      swiping.current = true;
      didSwipe.current = false;
      el.style.transition = 'none';
      const ind = indicatorRef.current;
      if (ind) ind.style.transition = 'none';

      const onMouseMove = (e: MouseEvent) => {
        if (!swiping.current) return;
        const dx = e.clientX - startX.current;
        currentX.current = Math.min(0, dx);
        applySwipeVisuals(currentX.current);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (!swiping.current) return;
        finishSwipe();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('mousedown', onMouseDown);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('mousedown', onMouseDown);
    };
  }, [onSwipe, enabled, indicatorRef]);

  return { ref, didSwipe };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DecisionDashboard() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [activePm, setActivePm] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRejected, setShowRejected] = useState(false);
  const [dismissingIds, setDismissingIds] = useState<Set<number>>(new Set());

  const fetchDecisions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activePm) params.set('pm', activePm);
      const res = await authFetch(`/api/decisions?${params}`);
      const data = await res.json();
      setDecisions(data.decisions || []);
    } catch {
      console.error('Failed to fetch decisions');
    } finally {
      setLoading(false);
    }
  }, [activePm]);

  useEffect(() => { fetchDecisions(); }, [fetchDecisions]);

  const updateStatus = async (id: number, status: string, notes?: string) => {
    const body: Record<string, unknown> = { id, status };
    if (status.startsWith('pm-')) body.pmNotes = notes || '';
    if (status.startsWith('boss-')) body.bossNotes = notes || '';

    await authFetch('/api/decisions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    fetchDecisions();
  };

  const handleSwipeReject = useCallback((decision: Decision) => {
    const rejectStatus = decision.status === 'pm-approved' ? 'boss-rejected' : 'pm-rejected';
    const notes = decision.status === 'pm-approved' ? 'Swiped to reject by Boss' : 'Swiped to reject by PM';

    setDismissingIds(prev => new Set(prev).add(decision.id));
    setTimeout(() => {
      updateStatus(decision.id, rejectStatus, notes);
      setDismissingIds(prev => {
        const next = new Set(prev);
        next.delete(decision.id);
        return next;
      });
    }, 50);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const parsePatchCount = (payload: string): number => {
    try {
      const jsonMatch = payload.match(/\{[\s\S]*"patches"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.patches?.length || 0;
      }
    } catch { /* ignore */ }
    return 0;
  };

  const pms = Object.keys(PM_META);
  const pendingCounts = pms.reduce<Record<string, number>>((acc, pm) => {
    acc[pm] = decisions.filter(d => d.pm === pm && d.status === 'pending').length;
    return acc;
  }, {});

  const isRejected = (d: Decision) => REJECT_STATUSES.includes(d.status);
  const rejectedCount = decisions.filter(isRejected).length;
  const visibleDecisions = showRejected ? decisions : decisions.filter(d => !isRejected(d));

  return (
    <div className="dec-dashboard">
      {/* PM filter tabs */}
      <div className="eng-view-toggle-bar">
        <button
          className={`eng-view-toggle ${!activePm ? 'active' : ''}`}
          onClick={() => setActivePm(null)}
        >
          All PMs
        </button>
        {pms.map(pm => {
          const meta = PM_META[pm];
          const count = pendingCounts[pm] || 0;
          return (
            <button
              key={pm}
              className={`eng-view-toggle ${activePm === pm ? 'active' : ''}`}
              onClick={() => setActivePm(pm)}
            >
              <span className="eng-section-dot" style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}66` }} />
              {meta.label}
              {count > 0 && <span className="dec-pm-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Rejected toggle */}
      {rejectedCount > 0 && (
        <button
          className="dec-rejected-toggle"
          onClick={() => setShowRejected(v => !v)}
        >
          <span className="dec-rejected-toggle-icon">{showRejected ? '\u25BC' : '\u25B6'}</span>
          {showRejected ? 'Hide' : 'Show'} rejected ({rejectedCount})
        </button>
      )}

      {/* Decision cards */}
      {loading ? (
        <div className="dec-empty">Loading decisions...</div>
      ) : visibleDecisions.length === 0 ? (
        <div className="dec-empty">
          {decisions.length > 0 && rejectedCount === decisions.length
            ? `All ${rejectedCount} decisions rejected. Click "Show rejected" to review.`
            : 'No decisions pending. The pipeline is clear.'}
        </div>
      ) : (
        <div className="dec-list">
          {visibleDecisions.map(d => (
            <DecisionCard
              key={d.id}
              decision={d}
              isExpanded={expandedId === d.id}
              isDismissing={dismissingIds.has(d.id)}

              onToggleExpand={() => setExpandedId(expandedId === d.id ? null : d.id)}
              onSwipeReject={handleSwipeReject}
              onUpdateStatus={updateStatus}

              parsePatchCount={parsePatchCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Trash icon SVG ───────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg className="dec-swipe-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

// ── Decision Card ────────────────────────────────────────────────────────────

interface DecisionCardProps {
  decision: Decision;
  isExpanded: boolean;
  isDismissing: boolean;

  onToggleExpand: () => void;
  onSwipeReject: (d: Decision) => void;
  onUpdateStatus: (id: number, status: string, notes?: string) => void;

  parsePatchCount: (payload: string) => number;
}

function DecisionCard({
  decision: d,
  isExpanded,
  isDismissing,

  onToggleExpand,
  onSwipeReject,
  onUpdateStatus,

  parsePatchCount,
}: DecisionCardProps) {
  const pm = PM_META[d.pm] || { label: d.pm, color: '#888', badge: '?' };
  const st = STATUS_STYLES[d.status] || STATUS_STYLES['pending'];
  const patchCount = parsePatchCount(d.payload);
  const rejected = REJECT_STATUSES.includes(d.status);

  const canSwipeReject = d.status === 'pending' || d.status === 'pm-approved';
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { ref: swipeRef, didSwipe } = useSwipeLeft(() => onSwipeReject(d), canSwipeReject, indicatorRef);

  const handleHeaderClick = useCallback(() => {
    // Skip click if it was triggered by a completed swipe
    if (didSwipe.current) return;
    onToggleExpand();
  }, [onToggleExpand, didSwipe]);

  return (
    <div
      className={`dec-card-wrapper ${isDismissing ? 'dec-dismissing' : ''} ${rejected ? 'dec-rejected-card' : ''}`}
    >
      {/* Gmail-style red rejection backdrop */}
      {canSwipeReject && (
        <div className="dec-swipe-backdrop" ref={indicatorRef}>
          <div className="dec-swipe-backdrop-content">
            <TrashIcon />
            <span className="dec-swipe-backdrop-label">Reject</span>
          </div>
        </div>
      )}

      <div
        ref={swipeRef}
        className={`dec-card ${canSwipeReject ? 'dec-card-swipeable' : ''}`}
        style={{ '--pm-color': pm.color } as React.CSSProperties}
      >
        <div className="dec-card-header" onClick={handleHeaderClick}>
          <div className="dec-card-left">
            <span className="dec-card-badge" style={{ background: pm.color }}>{pm.badge}</span>
            <div>
              <div className="dec-card-title">{d.title}</div>
              <div className="dec-card-meta">
                {d.ticker} &middot; {d.engineerId} &middot; {new Date(d.createdAt).toLocaleString()}
                {patchCount > 0 && <> &middot; {patchCount} patches</>}
              </div>
            </div>
          </div>
          <div className="dec-card-right">
            <span className="dec-status-badge" style={{ background: st.bg, color: st.text }}>{st.label}</span>
            <span className="dec-expand-icon">{isExpanded ? '\u25B2' : '\u25BC'}</span>
          </div>
        </div>


        <div className={`dec-card-body-anim ${isExpanded ? 'dec-body-open' : ''}`}>
          <div className="dec-card-body">
            <div className="dec-payload-section">
              <div className="dec-payload-label">Payload</div>
              <pre className="dec-payload-pre">{d.payload.slice(0, 3000)}{d.payload.length > 3000 ? '\n...(truncated)' : ''}</pre>
            </div>

            {d.pmNotes && (
              <div className="dec-notes">
                <strong>PM Notes:</strong> {d.pmNotes}
              </div>
            )}
            {d.bossNotes && (
              <div className="dec-notes">
                <strong>Boss Notes:</strong> {d.bossNotes}
              </div>
            )}

            <div className="dec-actions">
              {d.status === 'pending' && (
                <>
                  <button className="eng-btn" data-variant="active" onClick={() => onUpdateStatus(d.id, 'pm-approved', 'Approved by PM')}>
                    PM Approve
                  </button>
                  <button className="eng-btn eng-btn-danger" onClick={() => onUpdateStatus(d.id, 'pm-rejected', 'Rejected by PM')}>
                    PM Reject
                  </button>
                </>
              )}
              {d.status === 'pm-approved' && (
                <>
                  <button className="eng-btn" data-variant="run" onClick={() => onUpdateStatus(d.id, 'boss-approved', 'Final approval by Boss')}>
                    Boss Approve
                  </button>
                  <button className="eng-btn eng-btn-danger" onClick={() => onUpdateStatus(d.id, 'boss-rejected', 'Rejected by Boss')}>
                    Boss Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
