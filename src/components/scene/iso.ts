// ═══════════════════════════════════════════════════════════════════════════
// ISOMETRIC PROJECTION — Sims-style 2:1 isometric with rotation + zoom
// ═══════════════════════════════════════════════════════════════════════════

/** Half-width of one isometric tile (px) — larger = more detail */
export const TILE_HW = 48;
/** Half-height of one isometric tile (px) */
export const TILE_HH = 24;
/** Vertical scale: 1 world Z unit = this many screen pixels */
export const Z_SCALE = 24;

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
 * Draw all faces of an isometric block as SVG polygon point strings.
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
 * Compute the SVG viewBox that fits the room at the given rotation.
 * zoom > 1 crops the view for a closer look.
 */
export function computeViewBox(rotDeg: number, zoom: number = 1): { x: number; y: number; w: number; h: number } {
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

  const pad = 40;
  const fullW = maxX - minX + 2 * pad;
  const fullH = maxY - minY + 2 * pad;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const w = fullW / zoom;
  const h = fullH / zoom;

  return {
    x: cx - w / 2,
    y: cy - h / 2,
    w,
    h,
  };
}

/**
 * Determine which walls are visible at a given rotation.
 */
export function visibleWalls(rotDeg: number) {
  const r = ((rotDeg % 360) + 360) % 360;
  return {
    back:  r < 90 || r >= 270,
    right: r < 180,
    front: r >= 90 && r < 270,
    left:  r >= 180,
  };
}

/**
 * Smooth wall opacity for each rotation angle.
 * Walls fade in/out over a 15° transition zone instead of popping.
 */
export function wallOpacity(rotDeg: number): { back: number; front: number; left: number; right: number } {
  const r = ((rotDeg % 360) + 360) % 360;
  const F = 15; // fade half-width in degrees

  const fade = (peak: number) => {
    let diff = Math.abs(r - peak);
    if (diff > 180) diff = 360 - diff;
    if (diff <= 90 - F) return 1;
    if (diff >= 90 + F) return 0;
    return 1 - (diff - (90 - F)) / (2 * F);
  };

  return {
    back:  fade(0),
    right: fade(90),
    front: fade(180),
    left:  fade(270),
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
  return rx + ry;
}
