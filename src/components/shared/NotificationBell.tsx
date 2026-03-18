'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

interface Notification {
  id: number;
  type: string;
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

function isWithinNycBusinessHours(): boolean {
  const nycNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = nycNow.getHours();
  return hour >= 8 && hour < 19;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function formatDateGroup(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

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

const REFRESH_INTERVAL_MS = 30 * 60 * 1000;
const POLL_INTERVAL_MS = 60 * 1000;

// ── Hook: useNotifications ───────────────────────────────────────────────────

function useNotifications() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const lastAutoRefresh = useRef<number>(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    } catch { /* silent */ }
  }, []);

  const triggerRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/intelligence-refresh', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLastRefresh(data.refreshedAt);
        await fetchNotifications();
      }
    } catch { /* silent */ }
    finally { setRefreshing(false); }
  }, [fetchNotifications]);

  const markAllRead = useCallback(async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'read-all' }),
      });
      setItems(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch { /* silent */ }
  }, []);

  const dismissNotification = useCallback(async (id: number) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'dismiss', ids: [id] }),
      });
      setItems(prev => {
        const item = prev.find(n => n.id === id);
        if (item && !item.read) {
          setUnreadCount(c => Math.max(0, c - 1));
        }
        return prev.filter(n => n.id !== id);
      });
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const pollId = setInterval(fetchNotifications, POLL_INTERVAL_MS);
    const schedulerId = setInterval(() => {
      if (!isWithinNycBusinessHours()) return;
      const now = Date.now();
      if (now - lastAutoRefresh.current >= REFRESH_INTERVAL_MS) {
        lastAutoRefresh.current = now;
        triggerRefresh();
      }
    }, 60_000);

    if (isWithinNycBusinessHours() && Date.now() - lastAutoRefresh.current >= REFRESH_INTERVAL_MS) {
      lastAutoRefresh.current = Date.now();
      const initId = setTimeout(triggerRefresh, 5000);
      return () => { clearInterval(pollId); clearInterval(schedulerId); clearTimeout(initId); };
    }
    return () => { clearInterval(pollId); clearInterval(schedulerId); };
  }, [fetchNotifications, triggerRefresh]);

  return { items, unreadCount, refreshing, lastRefresh, triggerRefresh, markAllRead, dismissNotification };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function NotificationBell() {
  const { items, unreadCount, refreshing, lastRefresh, triggerRefresh, markAllRead, dismissNotification } = useNotifications();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleToggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && unreadCount > 0) markAllRead();
  };

  const groups = groupNotifications(items);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Badge trigger — matches nav-ai-badge / nav-pin-badge style ── */}
      <button
        onClick={handleToggle}
        className="nav-bell-badge"
        data-has-unread={unreadCount > 0 ? 'true' : undefined}
        data-open={open ? 'true' : undefined}
        title={unreadCount > 0 ? `${unreadCount} unread` : 'Intelligence notifications'}
      >
        <svg
          className="nav-bell-icon"
          width={11}
          height={11}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0
          ? <span className="nav-bell-count">{unreadCount > 99 ? '99+' : unreadCount}</span>
          : 'INTEL'
        }
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute top-full right-0 pt-3 z-[100]">
          <div className="bg-black/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl w-[320px] max-h-[420px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
                Intelligence
              </span>
              <div className="flex items-center gap-2.5">
                {refreshing && (
                  <span className="text-[9px] text-white/30 animate-pulse">syncing</span>
                )}
                {lastRefresh && !refreshing && (
                  <span className="text-[9px] font-mono text-white/20">{timeAgo(lastRefresh)}</span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); triggerRefresh(); }}
                  disabled={refreshing}
                  className="text-[9px] font-semibold uppercase tracking-[0.06em] text-white/30 hover:text-white/60 transition-colors disabled:opacity-30"
                >
                  Sync
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1">
              {items.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <div className="text-[11px] text-white/25">No notifications</div>
                  <div className="text-[9px] text-white/15 mt-1.5 font-mono">
                    auto-sync 08:00 – 19:00 ET / 30 min
                  </div>
                </div>
              ) : (
                groups.map((group) => (
                  <div key={group.label}>
                    {/* Group header */}
                    <div className="px-4 pt-2.5 pb-1">
                      <span className={`text-[9px] font-bold tracking-[0.1em] uppercase ${
                        group.label === 'TODAY' ? 'text-white/50' : 'text-white/20'
                      }`}>
                        {group.label}
                      </span>
                    </div>

                    {group.notifications.map((n) => (
                      <div
                        key={n.id}
                        className="group/n flex items-start gap-2.5 px-4 py-2 hover:bg-white/[0.03] transition-colors"
                      >
                        {/* Type dot */}
                        <div className={`mt-[5px] w-[5px] h-[5px] rounded-full shrink-0 ${
                          n.type === 'sec' ? 'bg-amber-400/60' : 'bg-blue-400/40'
                        }`} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className={`text-[11px] leading-snug truncate ${
                              !n.read ? 'text-white/80 font-medium' : 'text-white/40'
                            }`}>
                              {n.title}
                            </span>
                            <span className="text-[9px] font-mono text-white/15 shrink-0">
                              {timeAgo(n.createdAt)}
                            </span>
                          </div>
                          {n.body && (
                            <div className="text-[10px] text-white/20 mt-0.5 truncate">{n.body}</div>
                          )}
                        </div>

                        {/* Dismiss */}
                        <button
                          onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                          className="opacity-0 group-hover/n:opacity-100 transition-opacity mt-0.5 text-white/15 hover:text-white/40"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06]">
                <span className="text-[9px] font-mono text-white/15">
                  08–19 ET &middot; 30m
                </span>
                <div className="flex items-center gap-3">
                  <a href="/sec-intelligence" className="text-[9px] font-semibold uppercase tracking-[0.06em] text-white/25 hover:text-white/50 transition-colors">
                    SEC
                  </a>
                  <a href="/press-intelligence" className="text-[9px] font-semibold uppercase tracking-[0.06em] text-white/25 hover:text-white/50 transition-colors">
                    Press
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
