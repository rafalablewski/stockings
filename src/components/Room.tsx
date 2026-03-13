'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  sender: string;
  content: string;
  channel: string;
  replyTo: number | null;
  createdAt: string;
}

// ── Division metadata ─────────────────────────────────────────────────────────

const DIVISIONS: Record<string, { label: string; color: string; badge: string; role: string }> = {
  boss: {
    label: 'Boss',
    color: '#f59e0b',
    badge: 'BOSS',
    role: 'Chief Executive',
  },
  claude: {
    label: 'Claude',
    color: '#22d3ee',
    badge: 'ARCH',
    role: 'Architecture & Backend',
  },
  cursor: {
    label: 'Cursor',
    color: '#a78bfa',
    badge: 'UI',
    role: 'Frontend & UI',
  },
  gemini: {
    label: 'Gemini',
    color: '#34d399',
    badge: 'R&D',
    role: 'Research & Data',
  },
  'ai-engineer': {
    label: 'AI Engineer',
    color: '#f472b6',
    badge: 'ML',
    role: 'ML & AI Systems',
  },
  'project-manager': {
    label: 'Project Manager',
    color: '#fb923c',
    badge: 'PM',
    role: 'Planning & Coordination',
  },
};

const CHANNELS = [
  { id: 'general', label: 'General' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'research', label: 'Research' },
  { id: 'ml', label: 'ML' },
  { id: 'planning', label: 'Planning' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();

  if (diffMs < 60_000) return 'just now';
  if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)}m ago`;
  if (diffMs < 86_400_000) return `${Math.floor(diffMs / 3_600_000)}h ago`;

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Room() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [channel, setChannel] = useState('general');
  const [sender, setSender] = useState('boss');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/room?channel=${channel}&limit=100`);
      if (!res.ok) return;
      const data = await res.json();
      setMessages(data.messages);
    } catch {
      // silent retry on next poll
    } finally {
      setLoading(false);
    }
  }, [channel]);

  // Fetch on channel change + poll every 5s
  useEffect(() => {
    setLoading(true);
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchMessages]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    if (!content.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender,
          content: content.trim(),
          channel,
          replyTo: replyTo?.id || null,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, data.message]);
        setContent('');
        setReplyTo(null);
      }
    } catch {
      // handle error silently
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group consecutive messages from same sender
  const grouped = messages.reduce<{ msg: Message; isFirst: boolean }[]>((acc, msg, i) => {
    const prev = i > 0 ? messages[i - 1] : null;
    const isFirst = !prev || prev.sender !== msg.sender ||
      (new Date(msg.createdAt).getTime() - new Date(prev.createdAt).getTime() > 300_000);
    acc.push({ msg, isFirst });
    return acc;
  }, []);

  const replyMessage = (id: number) => messages.find(m => m.id === id);

  return (
    <div className="room-container">
      {/* ── Sidebar: channels + online divisions ── */}
      <div className="room-sidebar">
        <div className="room-sidebar-section">
          <div className="room-sidebar-title">Channels</div>
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              className={`room-channel-btn ${channel === ch.id ? 'active' : ''}`}
              onClick={() => setChannel(ch.id)}
            >
              <span className="room-channel-hash">#</span>
              {ch.label}
            </button>
          ))}
        </div>

        <div className="room-sidebar-section">
          <div className="room-sidebar-title">Divisions</div>
          {Object.entries(DIVISIONS).map(([key, div]) => (
            <div key={key} className="room-division-item">
              <span
                className="room-division-dot"
                style={{ background: div.color }}
              />
              <span className="room-division-name">{div.label}</span>
              <span
                className="room-division-badge"
                style={{ color: div.color, borderColor: `${div.color}40` }}
              >
                {div.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main chat area ── */}
      <div className="room-main">
        {/* Channel header */}
        <div className="room-header">
          <div className="room-header-channel">
            <span className="room-header-hash">#</span>
            {CHANNELS.find(c => c.id === channel)?.label || channel}
          </div>
          <div className="room-header-desc">
            Multi-AI division communication room
          </div>
        </div>

        {/* Messages */}
        <div className="room-messages">
          {loading ? (
            <div className="room-empty">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="room-empty">
              <div className="room-empty-icon">#</div>
              <div className="room-empty-title">
                Welcome to #{CHANNELS.find(c => c.id === channel)?.label || channel}
              </div>
              <div className="room-empty-desc">
                This is the start of the channel. All divisions can communicate here.
              </div>
            </div>
          ) : (
            grouped.map(({ msg, isFirst }) => {
              const div = DIVISIONS[msg.sender] || DIVISIONS.boss;
              const replied = msg.replyTo ? replyMessage(msg.replyTo) : null;

              return (
                <div
                  key={msg.id}
                  className={`room-msg ${isFirst ? 'first' : 'continuation'}`}
                >
                  {/* Reply reference */}
                  {replied && (
                    <div className="room-msg-reply-ref">
                      <span
                        className="room-msg-reply-line"
                        style={{ borderColor: DIVISIONS[replied.sender]?.color || '#666' }}
                      />
                      <span
                        className="room-msg-reply-sender"
                        style={{ color: DIVISIONS[replied.sender]?.color || '#666' }}
                      >
                        {DIVISIONS[replied.sender]?.label || replied.sender}
                      </span>
                      <span className="room-msg-reply-text">
                        {replied.content.slice(0, 80)}{replied.content.length > 80 ? '...' : ''}
                      </span>
                    </div>
                  )}

                  {isFirst && (
                    <div className="room-msg-header">
                      <span
                        className="room-msg-avatar"
                        style={{ background: `${div.color}20`, color: div.color, borderColor: `${div.color}40` }}
                      >
                        {div.badge}
                      </span>
                      <span className="room-msg-sender" style={{ color: div.color }}>
                        {div.label}
                      </span>
                      <span className="room-msg-role">{div.role}</span>
                      <span className="room-msg-time">{formatTime(msg.createdAt)}</span>
                    </div>
                  )}

                  <div className={`room-msg-content ${isFirst ? '' : 'indented'}`}>
                    {msg.content}
                  </div>

                  {/* Hover actions */}
                  <div className="room-msg-actions">
                    <button
                      className="room-msg-action-btn"
                      onClick={() => setReplyTo(msg)}
                      title="Reply"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Composer ── */}
        <div className="room-composer">
          {replyTo && (
            <div className="room-composer-reply">
              <span style={{ color: DIVISIONS[replyTo.sender]?.color }}>
                Replying to {DIVISIONS[replyTo.sender]?.label || replyTo.sender}
              </span>
              <button className="room-composer-reply-close" onClick={() => setReplyTo(null)}>
                ×
              </button>
            </div>
          )}

          <div className="room-composer-row">
            {/* Sender selector */}
            <select
              className="room-sender-select"
              value={sender}
              onChange={e => setSender(e.target.value)}
            >
              {Object.entries(DIVISIONS).map(([key, div]) => (
                <option key={key} value={key}>
                  {div.label}
                </option>
              ))}
            </select>

            <textarea
              className="room-composer-input"
              value={content}
              onChange={e => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message #${CHANNELS.find(c => c.id === channel)?.label || channel} as ${DIVISIONS[sender]?.label || sender}...`}
              rows={1}
            />

            <button
              className="room-send-btn"
              onClick={handleSend}
              disabled={!content.trim() || sending}
            >
              {sending ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
