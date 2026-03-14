// ═══════════════════════════════════════════════════════════════════════════
// ISOMETRIC PROJECTION — Sims-style 2:1 isometric helpers
// ═══════════════════════════════════════════════════════════════════════════

/** Half-width of one isometric tile on screen (px) */
export const TILE_HW = 24;
/** Half-height of one isometric tile on screen (px) */
export const TILE_HH = 12;
/** Vertical scale: 1 world Z unit = this many screen pixels */
export const Z_SCALE = 12;

/** Origin offset to keep the scene in positive SVG space */
export const ORIGIN_X = 280;
export const ORIGIN_Y = 80;

/** Room dimensions in world-grid tiles */
export const ROOM_W = 24;
export const ROOM_D = 10;
export const WALL_H = 6;

/** Convert world (x, y, z) → screen (sx, sy) */
export function toIso(wx: number, wy: number, wz: number = 0) {
  return {
    x: ORIGIN_X + (wx - wy) * TILE_HW,
    y: ORIGIN_Y + (wx + wy) * TILE_HH - wz * Z_SCALE,
  };
}

/** Convert a list of iso points to an SVG polygon points string */
export function isoPoints(pts: Array<{ x: number; y: number }>): string {
  return pts.map(p => `${p.x},${p.y}`).join(' ');
}

/**
 * Draw 3 visible faces of an isometric block as SVG polygon point strings.
 * Returns { top, south, east } — the three visible faces.
 */
export function blockFaces(
  x: number, y: number, z: number,
  w: number, d: number, h: number,
) {
  const p = (wx: number, wy: number, wz: number) => toIso(wx, wy, wz);

  return {
    // Top face: the z+h horizontal plane
    top: isoPoints([
      p(x, y, z + h),
      p(x + w, y, z + h),
      p(x + w, y + d, z + h),
      p(x, y + d, z + h),
    ]),
    // South face: y=y plane (facing toward camera-left, visible)
    south: isoPoints([
      p(x, y, z),
      p(x + w, y, z),
      p(x + w, y, z + h),
      p(x, y, z + h),
    ]),
    // East face: x+w plane (facing toward camera-right, visible)
    east: isoPoints([
      p(x + w, y, z),
      p(x + w, y + d, z),
      p(x + w, y + d, z + h),
      p(x + w, y, z + h),
    ]),
  };
}
