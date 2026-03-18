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

// ── Component ────────────────────────────────────────────────────────────────

export default function NotificationBell() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
      setItems(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { /* silent */ }
  }, []);

  // Auto-refresh scheduler
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

  // Close on outside click
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
      {/* ── Trigger ── */}
      <button
        onClick={handleToggle}
        className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-white/[0.04]"
        aria-label="Notifications"
      >
        {/* Minimal circle outline — the "bell" is just a dot/ring */}
        <div className={`
          w-[7px] h-[7px] rounded-full transition-all duration-500
          ${unreadCount > 0
            ? 'bg-white scale-100'
            : open
              ? 'bg-white/40 scale-100'
              : 'bg-white/20 scale-100 hover:bg-white/30'
          }
          ${refreshing ? 'animate-pulse' : ''}
        `} />

        {/* Count — appears as a tiny number to the right */}
        {unreadCount > 0 && (
          <span className="absolute -top-px -right-px text-[8px] font-mono font-medium text-white/90 leading-none tabular-nums">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          className="absolute top-full right-0 mt-3 w-[340px] max-h-[420px] overflow-hidden flex flex-col z-[100]"
          style={{
            background: 'rgba(8, 8, 8, 0.96)',
            backdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            boxShadow: '0 24px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50">
              Intelligence
            </span>
            <div className="flex items-center gap-3">
              {refreshing && (
                <span className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
              )}
              {lastRefresh && !refreshing && (
                <span className="text-[10px] font-mono text-white/20 tabular-nums">
                  {timeAgo(lastRefresh)}
                </span>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); triggerRefresh(); }}
                disabled={refreshing}
                className="text-[10px] text-white/25 hover:text-white/60 transition-colors duration-300 disabled:opacity-20"
              >
                sync
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-white/[0.04]" />

          {/* Body */}
          <div className="overflow-y-auto flex-1 py-1">
            {items.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="text-[11px] text-white/20 font-light">No activity</div>
                <div className="text-[10px] text-white/10 mt-2 font-mono">
                  auto-sync 08:00–19:00 ET / 30m
                </div>
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.label}>
                  {/* Group label */}
                  <div className="px-5 pt-3 pb-1.5">
                    <span className={`text-[9px] font-medium tracking-[0.12em] uppercase ${
                      group.label === 'TODAY' ? 'text-white/50' : 'text-white/20'
                    }`}>
                      {group.label}
                    </span>
                  </div>

                  {group.notifications.map((n) => (
                    <div
                      key={n.id}
                      className="group/n flex items-start gap-3 px-5 py-2.5 transition-colors duration-200 hover:bg-white/[0.02] cursor-default"
                    >
                      {/* Type indicator — minimal vertical line */}
                      <div className={`mt-1.5 w-px h-3 rounded-full shrink-0 ${
                        n.type === 'sec' ? 'bg-amber-500/50' : 'bg-white/20'
                      }`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-[11px] leading-tight ${
                            !n.read ? 'text-white/80 font-medium' : 'text-white/40'
                          }`}>
                            {n.title}
                          </span>
                          <span className="text-[9px] font-mono text-white/15 tabular-nums shrink-0">
                            {timeAgo(n.createdAt)}
                          </span>
                        </div>
                        {n.body && (
                          <div className="text-[10px] text-white/20 mt-0.5 truncate leading-tight">
                            {n.body}
                          </div>
                        )}
                      </div>

                      {/* Dismiss — appears on hover */}
                      <button
                        onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                        className="opacity-0 group-hover/n:opacity-100 transition-opacity duration-200 mt-0.5"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/15 hover:text-white/40 transition-colors">
                          <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
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
            <>
              <div className="mx-5 h-px bg-white/[0.04]" />
              <div className="flex items-center justify-between px-5 py-2.5">
                <span className="text-[9px] font-mono text-white/10">
                  08–19 ET / 30m
                </span>
                <div className="flex items-center gap-4">
                  <a href="/sec-intelligence" className="text-[10px] text-white/20 hover:text-white/50 transition-colors duration-300">
                    SEC
                  </a>
                  <a href="/press-intelligence" className="text-[10px] text-white/20 hover:text-white/50 transition-colors duration-300">
                    Press
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
