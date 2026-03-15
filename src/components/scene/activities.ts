// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITY SYSTEM — defines what PMs can do in the office scene
// ═══════════════════════════════════════════════════════════════════════════

export type ActivityType =
  | 'working'     // at desk, typing
  | 'idle'        // standing near desk
  | 'coffee'      // at coffee machine
  | 'reading'     // at bookshelf area
  | 'gaming'      // at PS5/TV couch
  | 'phone'       // standing, on phone call
  | 'bathroom'    // walked to bathroom (behind door)
  | 'chatting';   // near another PM, speech bubbles

export interface Activity {
  type: ActivityType;
  seated: boolean;
  leftArm: number;
  rightArm: number;
  prop?: 'coffee-cup' | 'book' | 'controller' | 'phone';
  durationRange: [number, number];
  bubble?: boolean;
}

// ── World-grid positions for zones (room is 80×50) ──
export interface WorldPos {
  x: number;
  y: number;
}

export const ZONES = {
  bathroom:    { x: 6,   y: 44 },
  coffee:      { x: 14,  y: 42 },
  couch:       { x: 64,  y: 8 },
  bookshelf:   { x: 68,  y: 42 },
  waterCooler: { x: 22,  y: 42 },
} as const;

// Desk world positions (where the desk surface is) — 80×50 room
export const DESK_POS: WorldPos[] = [
  { x: 20, y: 28 },  // Claude
  { x: 30, y: 28 },  // Gemini
  { x: 40, y: 28 },  // AI Eng
  { x: 50, y: 28 },  // Cursor
  { x: 60, y: 28 },  // PM
];

// Chair positions (where avatar sits, in front of desk)
export const CHAIR_POS: WorldPos[] = [
  { x: 20, y: 25 },
  { x: 30, y: 25 },
  { x: 40, y: 25 },
  { x: 50, y: 25 },
  { x: 60, y: 25 },
];

// ── Activity definitions ──
export const ACTIVITIES: Record<ActivityType, Activity> = {
  working: {
    type: 'working',
    seated: true,
    leftArm: -50,
    rightArm: 50,
    durationRange: [0, 0],
  },
  idle: {
    type: 'idle',
    seated: false,
    leftArm: 0,
    rightArm: 0,
    durationRange: [8000, 18000],
  },
  coffee: {
    type: 'coffee',
    seated: false,
    leftArm: -40,
    rightArm: 0,
    prop: 'coffee-cup',
    durationRange: [12000, 22000],
  },
  reading: {
    type: 'reading',
    seated: false,
    leftArm: -35,
    rightArm: 35,
    prop: 'book',
    durationRange: [15000, 30000],
  },
  gaming: {
    type: 'gaming',
    seated: true,
    leftArm: -30,
    rightArm: 30,
    prop: 'controller',
    durationRange: [18000, 35000],
  },
  phone: {
    type: 'phone',
    seated: false,
    leftArm: 0,
    rightArm: -70,
    prop: 'phone',
    durationRange: [10000, 20000],
  },
  bathroom: {
    type: 'bathroom',
    seated: false,
    leftArm: 0,
    rightArm: 0,
    durationRange: [12000, 25000],
  },
  chatting: {
    type: 'chatting',
    seated: false,
    leftArm: -20,
    rightArm: 20,
    bubble: true,
    durationRange: [12000, 24000],
  },
};

/** Default fallback when DB hasn't loaded yet — only core activities */
export const DEFAULT_IDLE_ACTIVITIES: ActivityType[] = [
  'idle', 'idle',
  'chatting',
  'phone',
];

export function randomDuration([min, max]: [number, number]): number {
  return min + Math.random() * (max - min);
}

/**
 * Pick a random activity from the given enabled list.
 * The list should contain non-working activities the avatar can transition to.
 */
export function pickRandomActivity(
  currentType: ActivityType,
  enabledActivities: ActivityType[] = DEFAULT_IDLE_ACTIVITIES,
): ActivityType {
  const choices = enabledActivities.filter(a => a !== currentType);
  if (choices.length === 0) return 'idle';
  return choices[Math.floor(Math.random() * choices.length)];
}
