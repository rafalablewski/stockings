// ── Room types ────────────────────────────────────────────────────────────────

export interface RoomMessage {
  id: number;
  sender: string;
  content: string;
  channel: string;
  replyTo: number | null;
  createdAt: string;
}

export const VALID_SENDERS = ['boss', 'claude', 'cursor', 'gemini', 'ai-engineer', 'project-manager'] as const;
export type RoomSender = typeof VALID_SENDERS[number];

export const VALID_CHANNELS = ['general', 'backend', 'frontend', 'research', 'ml', 'planning'] as const;
export type RoomChannel = typeof VALID_CHANNELS[number];
