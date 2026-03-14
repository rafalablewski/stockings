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
  /** Whether avatar is seated */
  seated: boolean;
  /** Left arm rotation (degrees) */
  leftArm: number;
  /** Right arm rotation (degrees) */
  rightArm: number;
  /** Optional prop to render near avatar */
  prop?: 'coffee-cup' | 'book' | 'controller' | 'phone';
  /** Duration range in ms [min, max] before switching */
  durationRange: [number, number];
  /** Whether this activity shows a speech bubble */
  bubble?: boolean;
}

// ── World-grid positions for zones ──
export interface WorldPos {
  x: number;
  y: number;
}

export const ZONES = {
  bathroom:  { x: 2,    y: 9 },
  coffee:    { x: 4.5,  y: 8.5 },
  couch:     { x: 20.5, y: 2.5 },
  bookshelf: { x: 22,   y: 8.5 },
} as const;

// Desk world positions (where the desk is)
export const DESK_POS: WorldPos[] = [
  { x: 7,  y: 7 },   // Claude
  { x: 10, y: 7 },   // Gemini
  { x: 13, y: 7 },   // AI Eng
  { x: 16, y: 7 },   // Cursor
  { x: 19, y: 7 },   // PM
];

// Chair positions (where avatar sits, in front of desk)
export const CHAIR_POS: WorldPos[] = [
  { x: 7,  y: 5.5 },
  { x: 10, y: 5.5 },
  { x: 13, y: 5.5 },
  { x: 16, y: 5.5 },
  { x: 19, y: 5.5 },
];

// ── Activity definitions (with more realistic durations) ──
export const ACTIVITIES: Record<ActivityType, Activity> = {
  working: {
    type: 'working',
    seated: true,
    leftArm: -50,
    rightArm: 50,
    durationRange: [0, 0], // controlled by engineer status, not timer
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

// Idle activities that a PM can randomly pick (excludes 'working' which is data-driven)
export const IDLE_ACTIVITIES: ActivityType[] = [
  'idle', 'idle',         // weighted: more likely to be idle
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
