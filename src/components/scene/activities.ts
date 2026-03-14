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
  /** Target X in the room (avatar transitions here) */
  zoneX: number;
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

// ── Zone X positions in the 1200-wide SVG ──
export const ZONES = {
  bathroom: 55,
  coffee: 155,
  desk1: 320,
  desk2: 460,
  desk3: 600,
  desk4: 740,
  desk5: 880,
  couch: 1010,
  bookshelf: 1130,
} as const;

// Desk X per PM index
export const DESK_X = [ZONES.desk1, ZONES.desk2, ZONES.desk3, ZONES.desk4, ZONES.desk5];

// ── Activity definitions ──
export const ACTIVITIES: Record<ActivityType, Omit<Activity, 'zoneX'>> = {
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
    durationRange: [6000, 12000],
  },
  coffee: {
    type: 'coffee',
    seated: false,
    leftArm: -40,
    rightArm: 0,
    prop: 'coffee-cup',
    durationRange: [8000, 15000],
  },
  reading: {
    type: 'reading',
    seated: false,
    leftArm: -35,
    rightArm: 35,
    prop: 'book',
    durationRange: [10000, 20000],
  },
  gaming: {
    type: 'gaming',
    seated: true,
    leftArm: -30,
    rightArm: 30,
    prop: 'controller',
    durationRange: [12000, 25000],
  },
  phone: {
    type: 'phone',
    seated: false,
    leftArm: 0,
    rightArm: -70,
    prop: 'phone',
    durationRange: [6000, 14000],
  },
  bathroom: {
    type: 'bathroom',
    seated: false,
    leftArm: 0,
    rightArm: 0,
    durationRange: [5000, 10000],
  },
  chatting: {
    type: 'chatting',
    seated: false,
    leftArm: -20,
    rightArm: 20,
    bubble: true,
    durationRange: [8000, 16000],
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
