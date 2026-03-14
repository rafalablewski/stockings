// ═══════════════════════════════════════════════════════════════════════════
// ISOMETRIC PROJECTION — Sims-style 2:1 isometric with rotation support
// ═══════════════════════════════════════════════════════════════════════════

/** Half-width of one isometric tile (px) — larger = more zoomed in */
export const TILE_HW = 32;
/** Half-height of one isometric tile (px) */
export const TILE_HH = 16;
/** Vertical scale: 1 world Z unit = this many screen pixels */
export const Z_SCALE = 16;

/** Room dimensions in world-grid tiles */
export const ROOM_W = 28;
export const ROOM_D = 14;
export const WALL_H = 6;

const DEG2RAD = Math.PI / 180;

/**
 * Convert world (x, y, z) → screen (sx, sy) with rotation.
 * Rotation is in degrees, rotates the world around the room center.
 */
export function toIso(wx: number, wy: number, wz: number = 0, rotDeg: number = 0): { x: number; y: number } {
  const cx = ROOM_W / 2;
  const cy = ROOM_D / 2;
  const dx = wx - cx;
  const dy = wy - cy;

  let rx: number, ry: number;
  if (rotDeg === 0) {
    rx = dx;
    ry = dy;
  } else {
    const rad = rotDeg * DEG2RAD;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    rx = dx * cos - dy * sin;
    ry = dx * sin + dy * cos;
  }

  return {
    x: (rx - ry) * TILE_HW,
    y: (rx + ry) * TILE_HH - wz * Z_SCALE,
  };
}

/** Convert a list of iso points to an SVG polygon points string */
export function isoPoints(pts: Array<{ x: number; y: number }>): string {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

/**
 * Draw 3 visible faces of an isometric block as SVG polygon point strings.
 * The visible faces depend on the rotation angle.
 */
export function blockFaces(
  x: number, y: number, z: number,
  w: number, d: number, h: number,
  rotDeg: number = 0,
) {
  const p = (wx: number, wy: number, wz: number) => toIso(wx, wy, wz, rotDeg);

  return {
    top: isoPoints([
      p(x, y, z + h),
      p(x + w, y, z + h),
      p(x + w, y + d, z + h),
      p(x, y + d, z + h),
    ]),
    south: isoPoints([
      p(x, y, z),
      p(x + w, y, z),
      p(x + w, y, z + h),
      p(x, y, z + h),
    ]),
    east: isoPoints([
      p(x + w, y, z),
      p(x + w, y + d, z),
      p(x + w, y + d, z + h),
      p(x + w, y, z + h),
    ]),
    north: isoPoints([
      p(x, y + d, z),
      p(x + w, y + d, z),
      p(x + w, y + d, z + h),
      p(x, y + d, z + h),
    ]),
    west: isoPoints([
      p(x, y, z),
      p(x, y + d, z),
      p(x, y + d, z + h),
      p(x, y, z + h),
    ]),
  };
}

/**
 * Compute the SVG viewBox that fits the entire room at the given rotation.
 */
export function computeViewBox(rotDeg: number): { x: number; y: number; w: number; h: number } {
  const corners: Array<[number, number]> = [
    [0, 0], [ROOM_W, 0], [ROOM_W, ROOM_D], [0, ROOM_D],
  ];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  for (const [wx, wy] of corners) {
    const p0 = toIso(wx, wy, 0, rotDeg);
    const p1 = toIso(wx, wy, WALL_H, rotDeg);
    minX = Math.min(minX, p0.x, p1.x);
    maxX = Math.max(maxX, p0.x, p1.x);
    minY = Math.min(minY, p0.y, p1.y);
    maxY = Math.max(maxY, p0.y, p1.y);
  }

  const pad = 60;
  return {
    x: minX - pad,
    y: minY - pad,
    w: maxX - minX + 2 * pad,
    h: maxY - minY + 2 * pad,
  };
}

/**
 * Determine which walls are visible at a given rotation.
 * Returns { back, front, left, right } as booleans.
 */
export function visibleWalls(rotDeg: number) {
  // Normalize to 0-360
  const r = ((rotDeg % 360) + 360) % 360;
  return {
    back:  r < 90 || r >= 270,   // y=ROOM_D wall
    right: r < 180,               // x=ROOM_W wall
    front: r >= 90 && r < 270,    // y=0 wall
    left:  r >= 180,              // x=0 wall
  };
}

/**
 * Compute depth (draw order) for an element at world position.
 * Higher depth = closer to camera = drawn later.
 */
export function isoDepth(wx: number, wy: number, rotDeg: number = 0): number {
  const cx = ROOM_W / 2;
  const cy = ROOM_D / 2;
  const dx = wx - cx;
  const dy = wy - cy;
  const rad = rotDeg * DEG2RAD;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rx = dx * cos - dy * sin;
  const ry = dx * sin + dy * cos;
  return rx + ry; // depth in isometric = sum of rotated coords
}
