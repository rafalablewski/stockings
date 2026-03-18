'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

interface Notification {
  id: number;
  type: string;       // 'sec' | 'press'
  title: string;
  body: string | null;
  groupKey: string | null;
  meta: string | null;
  read: boolean;
  dismissed: boolean;
  createdAt: string;
}

interface GroupedNotifications {
  label: string;
  notifications: Notification[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Check if a date string falls on today in NYC timezone */
function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const nycNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const nycDate = new Date(d.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return (
    nycDate.getFullYear() === nycNow.getFullYear() &&
    nycDate.getMonth() === nycNow.getMonth() &&
    nycDate.getDate() === nycNow.getDate()
  );
}

/** Check if current NYC time is between 8:00 and 19:00 */
function isWithinNycBusinessHours(): boolean {
  const nycNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = nycNow.getHours();
  return hour >= 8 && hour < 19;
}

/** Format relative time */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Format a date for group headers */
function formatDateGroup(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/** Group notifications into TODAY + older date groups */
function groupNotifications(items: Notification[]): GroupedNotifications[] {
  const today: Notification[] = [];
  const byDate = new Map<string, Notification[]>();

  for (const n of items) {
    if (isToday(n.createdAt)) {
      today.push(n);
    } else {
      const key = formatDateGroup(n.createdAt);
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key)!.push(n);
    }
  }

  const groups: GroupedNotifications[] = [];
  if (today.length > 0) groups.push({ label: 'TODAY', notifications: today });
  for (const [label, notifications] of byDate) {
    groups.push({ label, notifications });
  }
  return groups;
}

// ── Auto-refresh interval: 30 minutes ───────────────────────────────────────
const REFRESH_INTERVAL_MS = 30 * 60 * 1000;
const POLL_INTERVAL_MS = 60 * 1000; // check notifications every 60s

// ── Component ────────────────────────────────────────────────────────────────

export default function NotificationBell() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastAutoRefresh = useRef<number>(0);

  // ── Fetch notifications ──────────────────────────────────────────────────

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    } catch {
      // silent — network hiccup
    }
  }, []);

  // ── Trigger intelligence refresh ─────────────────────────────────────────

  const triggerRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/intelligence-refresh', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLastRefresh(data.refreshedAt);
        // Re-fetch notifications to pick up any new ones created by the refresh
        await fetchNotifications();
      }
    } catch {
      // silent
    } finally {
      setRefreshing(false);
    }
  }, [fetchNotifications]);

  // ── Mark all as read ─────────────────────────────────────────────────────

  const markAllRead = useCallback(async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'read-all' }),
      });
      setItems(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch {
      // silent
    }
  }, []);

  // ── Dismiss a single notification ────────────────────────────────────────

  const dismissNotification = useCallback(async (id: number) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'dismiss', ids: [id] }),
      });
      setItems(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {
      // silent
    }
  }, []);

  // ── Auto-refresh scheduler ───────────────────────────────────────────────
  // Runs every 30 minutes between 8:00-19:00 NYC time

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Poll for new notifications every 60s
    const pollId = setInterval(fetchNotifications, POLL_INTERVAL_MS);

    // Auto-refresh scheduler: check every minute if it's time
    const schedulerId = setInterval(() => {
      if (!isWithinNycBusinessHours()) return;

      const now = Date.now();
      if (now - lastAutoRefresh.current >= REFRESH_INTERVAL_MS) {
        lastAutoRefresh.current = now;
        triggerRefresh();
      }
    }, 60_000);

    // Trigger first refresh if within business hours and no recent refresh
    if (isWithinNycBusinessHours() && Date.now() - lastAutoRefresh.current >= REFRESH_INTERVAL_MS) {
      lastAutoRefresh.current = Date.now();
      // Delay first auto-refresh by 5s so page can load first
      const initId = setTimeout(triggerRefresh, 5000);
      return () => {
        clearInterval(pollId);
        clearInterval(schedulerId);
        clearTimeout(initId);
      };
    }

    return () => {
      clearInterval(pollId);
      clearInterval(schedulerId);
    };
  }, [fetchNotifications, triggerRefresh]);

  // ── Close dropdown on outside click ──────────────────────────────────────

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // ── When opening the dropdown, mark all as read ──────────────────────────

  const handleToggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && unreadCount > 0) {
      markAllRead();
    }
  };

  // ── Grouped data ─────────────────────────────────────────────────────────

  const groups = groupNotifications(items);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        onClick={handleToggle}
        className="relative p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
        aria-label="Notifications"
        title="Notifications"
      >
        {/* Bell SVG icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white/60 ${refreshing ? 'animate-swing' : ''}`}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-bold text-white bg-red-500 rounded-full leading-none">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-[360px] max-h-[480px] overflow-hidden bg-black/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl flex flex-col z-[100]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <span className="text-[13px] font-medium text-white/90">Notifications</span>
            <div className="flex items-center gap-2">
              {refreshing && (
                <span className="text-[10px] text-blue-400 animate-pulse">refreshing...</span>
              )}
              {lastRefresh && !refreshing && (
                <span className="text-[10px] text-white/30">
                  last: {timeAgo(lastRefresh)}
                </span>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); triggerRefresh(); }}
                disabled={refreshing}
                className="text-[10px] text-white/40 hover:text-white/70 transition-colors disabled:opacity-30"
                title="Refresh intelligence feeds now"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1">
            {items.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <div className="text-[12px] text-white/30">No notifications yet</div>
                <div className="text-[10px] text-white/20 mt-1">
                  Intelligence feeds auto-refresh every 30 min (8 AM – 7 PM NYC)
                </div>
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.label}>
                  {/* Group header */}
                  <div className="sticky top-0 px-4 py-1.5 bg-white/[0.03] border-b border-white/[0.04]">
                    <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                      group.label === 'TODAY' ? 'text-blue-400' : 'text-white/30'
                    }`}>
                      {group.label}
                    </span>
                  </div>

                  {/* Notifications in this group */}
                  {group.notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`group/notif flex items-start gap-3 px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${
                        !n.read ? 'bg-white/[0.02]' : ''
                      }`}
                    >
                      {/* Type icon */}
                      <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        n.type === 'sec'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {n.type === 'sec' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                            <path d="M18 14h-8" />
                            <path d="M15 18h-5" />
                            <path d="M10 6h8v4h-8V6Z" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[12px] font-medium ${!n.read ? 'text-white' : 'text-white/70'}`}>
                            {n.title}
                          </span>
                          {!n.read && (
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400" />
                          )}
                        </div>
                        {n.body && (
                          <div className="text-[11px] text-white/40 mt-0.5 truncate">{n.body}</div>
                        )}
                        <div className="text-[10px] text-white/25 mt-1">{timeAgo(n.createdAt)}</div>
                      </div>

                      {/* Dismiss button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                        className="opacity-0 group-hover/notif:opacity-100 transition-opacity text-white/20 hover:text-white/50 mt-1"
                        title="Dismiss"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] text-white/20">
                Auto-refresh: 8 AM – 7 PM NYC, every 30 min
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="/sec-intelligence"
                  className="text-[10px] text-amber-400/60 hover:text-amber-400 transition-colors"
                >
                  SEC
                </a>
                <a
                  href="/press-intelligence"
                  className="text-[10px] text-blue-400/60 hover:text-blue-400 transition-colors"
                >
                  Press
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Swing animation for the bell during refresh */}
      <style jsx>{`
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(12deg); }
          30% { transform: rotate(-10deg); }
          45% { transform: rotate(8deg); }
          60% { transform: rotate(-6deg); }
          75% { transform: rotate(3deg); }
        }
        :global(.animate-swing) {
          animation: swing 0.8s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>
    </div>
  );
}
