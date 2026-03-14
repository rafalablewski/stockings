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

// ── World-grid positions for zones (room is 28×14) ──
export interface WorldPos {
  x: number;
  y: number;
}

export const ZONES = {
  bathroom:   { x: 2,   y: 12.5 },
  coffee:     { x: 5,   y: 12 },
  couch:      { x: 23,  y: 3 },
  bookshelf:  { x: 25,  y: 12 },
  waterCooler: { x: 8,  y: 12 },
} as const;

// Desk world positions (where the desk surface is) — 28×14 room
export const DESK_POS: WorldPos[] = [
  { x: 8,  y: 9 },   // Claude
  { x: 12, y: 9 },   // Gemini
  { x: 16, y: 9 },   // AI Eng
  { x: 20, y: 9 },   // Cursor
  { x: 24, y: 9 },   // PM
];

// Chair positions (where avatar sits, in front of desk)
export const CHAIR_POS: WorldPos[] = [
  { x: 8,  y: 7 },
  { x: 12, y: 7 },
  { x: 16, y: 7 },
  { x: 20, y: 7 },
  { x: 24, y: 7 },
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

export const IDLE_ACTIVITIES: ActivityType[] = [
  'idle', 'idle',
  'coffee',
  'reading',
  'gaming',
  'phone',
  'bathroom',
  'chatting',
];

export function randomDuration([min, max]: [number, number]): number {
  return min + Math.random() * (max - min);
}

export function pickRandomActivity(currentType: ActivityType): ActivityType {
  const choices = IDLE_ACTIVITIES.filter(a => a !== currentType);
  return choices[Math.floor(Math.random() * choices.length)];
}
