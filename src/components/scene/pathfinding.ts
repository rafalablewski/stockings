// ═══════════════════════════════════════════════════════════════════════════
// PATHFINDING — A* grid-based obstacle avoidance for avatar movement
// ═══════════════════════════════════════════════════════════════════════════

import { ROOM_W, ROOM_D } from './iso';
import type { WorldPos } from './activities';

// ── Obstacle rectangles (world coordinates) ──
// These define the solid core of each furniture piece.
// Interaction zones (chair positions, coffee counter front) are kept clear.
const OBSTACLES: ReadonlyArray<{ x: number; y: number; w: number; d: number }> = [
  // Desk surfaces (the desk itself — chairs are in front, walkable)
  { x: 7, y: 9, w: 2, d: 2 },     // Claude
  { x: 11, y: 9, w: 2, d: 2 },    // Gemini
  { x: 15, y: 9, w: 2, d: 2 },    // AI Eng
  { x: 19, y: 9, w: 2, d: 2 },    // Cursor
  { x: 23, y: 9, w: 2, d: 2 },    // PM
  // Conference table
  { x: 4, y: 4, w: 3, d: 2 },
  // Couch back (front is accessible for sitting)
  { x: 21, y: 3, w: 5, d: 1 },
  // TV stand area
  { x: 22, y: 5, w: 3, d: 1 },
  // Server rack
  { x: 1, y: 2, w: 2, d: 2 },
  // Filing cabinets
  { x: 1, y: 11, w: 4, d: 1 },
  // Coffee counter (back wall side blocked, front accessible)
  { x: 4, y: 13, w: 3, d: 1 },
  // Bookshelf (back blocked, front accessible)
  { x: 25, y: 13, w: 3, d: 1 },
];

// ── Build occupancy grid ──
// Grid resolution: 1 cell = 1 world unit, grid[x][y] = blocked
const grid: boolean[][] = [];
for (let gx = 0; gx < ROOM_W; gx++) {
  grid[gx] = [];
  for (let gy = 0; gy < ROOM_D; gy++) {
    grid[gx][gy] = false;
  }
}
for (const obs of OBSTACLES) {
  const x0 = Math.floor(obs.x);
  const y0 = Math.floor(obs.y);
  const x1 = Math.ceil(obs.x + obs.w);
  const y1 = Math.ceil(obs.y + obs.d);
  for (let gx = Math.max(0, x0); gx < Math.min(ROOM_W, x1); gx++) {
    for (let gy = Math.max(0, y0); gy < Math.min(ROOM_D, y1); gy++) {
      grid[gx][gy] = true;
    }
  }
}

function isWalkable(gx: number, gy: number): boolean {
  if (gx < 0 || gx >= ROOM_W || gy < 0 || gy >= ROOM_D) return false;
  return !grid[gx][gy];
}

// ── A* pathfinding ──
interface PNode {
  x: number;
  y: number;
  g: number;
  f: number;
  parent: PNode | null;
}

// 8-directional movement
const DIRS: ReadonlyArray<[number, number]> = [
  [0, 1], [1, 0], [0, -1], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1],
];

function chebyshev(ax: number, ay: number, bx: number, by: number): number {
  return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
}

/**
 * Find a walkable path from `from` to `to`, avoiding obstacles.
 * Returns an array of waypoints (NOT including the start position).
 * Falls back to direct movement if no path exists.
 */
export function findPath(from: WorldPos, to: WorldPos): WorldPos[] {
  const sx = Math.round(from.x);
  const sy = Math.round(from.y);
  const ex = Math.round(to.x);
  const ey = Math.round(to.y);

  // Clamp to room bounds
  const csx = Math.max(0, Math.min(ROOM_W - 1, sx));
  const csy = Math.max(0, Math.min(ROOM_D - 1, sy));
  const cex = Math.max(0, Math.min(ROOM_W - 1, ex));
  const cey = Math.max(0, Math.min(ROOM_D - 1, ey));

  // Already there
  if (csx === cex && csy === cey) return [to];

  const open: PNode[] = [];
  const closed = new Set<number>();
  const key = (x: number, y: number) => x * ROOM_D + y;

  const h0 = chebyshev(csx, csy, cex, cey);
  open.push({ x: csx, y: csy, g: 0, f: h0, parent: null });

  let iterations = 0;
  const maxIter = ROOM_W * ROOM_D * 3;

  while (open.length > 0 && iterations++ < maxIter) {
    // Find lowest f
    let bestIdx = 0;
    for (let i = 1; i < open.length; i++) {
      if (open[i].f < open[bestIdx].f) bestIdx = i;
    }
    const cur = open[bestIdx];
    open.splice(bestIdx, 1);

    if (cur.x === cex && cur.y === cey) {
      // Reconstruct path
      const raw: WorldPos[] = [];
      let n: PNode | null = cur;
      while (n) {
        raw.unshift({ x: n.x, y: n.y });
        n = n.parent;
      }
      raw.shift(); // remove start
      // Replace last waypoint with exact destination
      if (raw.length > 0) raw[raw.length - 1] = to;
      else raw.push(to);
      return smoothPath(raw);
    }

    closed.add(key(cur.x, cur.y));

    for (const [dx, dy] of DIRS) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      if (closed.has(key(nx, ny))) continue;

      // Allow destination even if blocked (avatar interacts with furniture)
      const isEnd = nx === cex && ny === cey;
      if (!isEnd && !isWalkable(nx, ny)) continue;

      // Diagonal: both adjacent cells must be walkable (no corner cutting)
      if (dx !== 0 && dy !== 0) {
        if (!isWalkable(cur.x + dx, cur.y) && !isWalkable(cur.x, cur.y + dy)) continue;
      }

      const stepCost = dx !== 0 && dy !== 0 ? 1.414 : 1;
      const g = cur.g + stepCost;
      const h = chebyshev(nx, ny, cex, cey);

      // Check if already in open with better g
      const existIdx = open.findIndex(n => n.x === nx && n.y === ny);
      if (existIdx !== -1) {
        if (open[existIdx].g <= g) continue;
        open.splice(existIdx, 1);
      }

      open.push({ x: nx, y: ny, g, f: g + h, parent: cur });
    }
  }

  // No path found — direct fallback
  return [to];
}

/** Remove waypoints that are collinear (same direction) */
function smoothPath(path: WorldPos[]): WorldPos[] {
  if (path.length <= 2) return path;
  const result: WorldPos[] = [path[0]];
  for (let i = 1; i < path.length - 1; i++) {
    const prev = result[result.length - 1];
    const next = path[i + 1];
    const dx1 = path[i].x - prev.x;
    const dy1 = path[i].y - prev.y;
    const dx2 = next.x - path[i].x;
    const dy2 = next.y - path[i].y;
    if (dx1 !== dx2 || dy1 !== dy2) {
      result.push(path[i]);
    }
  }
  result.push(path[path.length - 1]);
  return result;
}
