'use client';

import React from 'react';
import { RoundedBox } from '@react-three/drei';

interface Lounge3DProps {
  position: [number, number, number];
}

/**
 * Leisure lounge area: two sofas facing each other, two armchairs on the sides,
 * a low coffee table in the center, and a decorative rug underneath.
 *
 * Layout (top-down, +X right, +Z back):
 *
 *              Sofa B (facing front)
 *   Armchair L   [Coffee Table]   Armchair R
 *              Sofa A (facing back)
 */
export default function Lounge3D({ position }: Lounge3DProps) {
  const cushionColor = '#35304a';    // dark plum-violet fabric
  const frameColor = '#28242e';      // darker frame / base
  const accentColor = '#4a3860';     // armchair accent
  const legColor = '#555060';        // metal/wood legs
  const tableTopColor = '#3a3545';   // dark table surface
  const tableLegColor = '#606068';   // metal table legs
  const rugColor = '#2a2540';        // base rug
  const rugBorderColor = '#3d3555';  // rug border accent

  return (
    <group position={position}>
      {/* ══ RUG ══ (flat rectangle on floor) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color={rugColor} roughness={0.95} />
      </mesh>
      {/* Rug border / inner pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <planeGeometry args={[12.5, 8.5]} />
        <meshStandardMaterial color={rugBorderColor} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[11, 7]} />
        <meshStandardMaterial color={rugColor} roughness={0.95} />
      </mesh>

      {/* ══ SOFA A — front side, facing back (+Z) toward coffee station ══ */}
      <group position={[0, 0, -3.5]}>
        <SofaModel color={cushionColor} frameColor={frameColor} legColor={legColor} rotation={0} />
      </group>

      {/* ══ SOFA B — back side, facing front (-Z) away from coffee station ══ */}
      <group position={[0, 0, 3.5]} rotation={[0, Math.PI, 0]}>
        <SofaModel color={cushionColor} frameColor={frameColor} legColor={legColor} rotation={0} />
      </group>

      {/* ══ ARMCHAIR LEFT — facing right (+X) ══ */}
      <group position={[-5.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ArmchairModel color={accentColor} frameColor={frameColor} legColor={legColor} />
      </group>

      {/* ══ ARMCHAIR RIGHT — facing left (-X) ══ */}
      <group position={[5.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <ArmchairModel color={accentColor} frameColor={frameColor} legColor={legColor} />
      </group>

      {/* ══ COFFEE TABLE ══ */}
      <CoffeeTable topColor={tableTopColor} legColor={tableLegColor} />
    </group>
  );
}

/* ─── Sofa sub-component ─── */
function SofaModel({ color, frameColor, legColor }: {
  color: string; frameColor: string; legColor: string; rotation: number;
}) {
  const sofaW = 5.0, sofaD = 1.8, seatH = 0.5;
  const baseH = 0.35;
  const backH = 1.2, backD = 0.3;
  const armW = 0.3, armH = 0.7;

  return (
    <group>
      {/* Legs (4 short metal cylinders) */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh key={`sleg${i}`}
          position={[sx * (sofaW / 2 - 0.25), baseH / 2, sz * (sofaD / 2 - 0.2)]}
          castShadow>
          <cylinderGeometry args={[0.06, 0.06, baseH, 6]} />
          <meshStandardMaterial color={legColor} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* Seat base / frame */}
      <RoundedBox args={[sofaW, 0.2, sofaD]} radius={0.04}
        position={[0, baseH + 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={frameColor} roughness={0.85} />
      </RoundedBox>

      {/* Seat cushions (3 sections) */}
      {[-1.55, 0, 1.55].map((cx, i) => (
        <RoundedBox key={`cush${i}`} args={[1.45, seatH, sofaD - 0.2]} radius={0.08}
          position={[cx, baseH + 0.2 + seatH / 2, 0]} castShadow>
          <meshStandardMaterial color={color} roughness={0.9} />
        </RoundedBox>
      ))}

      {/* Backrest */}
      <RoundedBox args={[sofaW - 0.1, backH, backD]} radius={0.06}
        position={[0, baseH + seatH + backH / 2, -(sofaD / 2 - backD / 2 + 0.05)]} castShadow>
        <meshStandardMaterial color={color} roughness={0.9} />
      </RoundedBox>

      {/* Back cushions (3 matching seat sections) */}
      {[-1.55, 0, 1.55].map((cx, i) => (
        <RoundedBox key={`bcush${i}`} args={[1.35, 0.8, 0.25]} radius={0.06}
          position={[cx, baseH + seatH + 0.45, -(sofaD / 2 - 0.1)]} castShadow>
          <meshStandardMaterial color={color} roughness={0.92} />
        </RoundedBox>
      ))}

      {/* Left arm */}
      <RoundedBox args={[armW, armH, sofaD]} radius={0.05}
        position={[-(sofaW / 2 - armW / 2), baseH + seatH / 2 + armH / 2 - 0.05, 0]} castShadow>
        <meshStandardMaterial color={frameColor} roughness={0.85} />
      </RoundedBox>

      {/* Right arm */}
      <RoundedBox args={[armW, armH, sofaD]} radius={0.05}
        position={[sofaW / 2 - armW / 2, baseH + seatH / 2 + armH / 2 - 0.05, 0]} castShadow>
        <meshStandardMaterial color={frameColor} roughness={0.85} />
      </RoundedBox>

      {/* Throw pillows */}
      <RoundedBox args={[0.5, 0.5, 0.15]} radius={0.06}
        position={[-1.8, baseH + seatH + 0.5, -0.35]}
        rotation={[0.15, 0.2, 0.1]} castShadow>
        <meshStandardMaterial color="#5a4070" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.5, 0.15]} radius={0.06}
        position={[1.9, baseH + seatH + 0.5, -0.3]}
        rotation={[-0.1, -0.15, -0.08]} castShadow>
        <meshStandardMaterial color="#406060" roughness={0.9} />
      </RoundedBox>
    </group>
  );
}

/* ─── Armchair sub-component ─── */
function ArmchairModel({ color, frameColor, legColor }: {
  color: string; frameColor: string; legColor: string;
}) {
  const chairW = 2.2, chairD = 2.0, seatH = 0.45;
  const baseH = 0.3;
  const backH = 1.3, backD = 0.28;
  const armW = 0.25, armH = 0.55;

  return (
    <group>
      {/* Legs (4 tapered wooden/metal) */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh key={`aleg${i}`}
          position={[sx * (chairW / 2 - 0.2), baseH / 2, sz * (chairD / 2 - 0.2)]}
          castShadow>
          <cylinderGeometry args={[0.05, 0.07, baseH, 6]} />
          <meshStandardMaterial color={legColor} metalness={0.4} roughness={0.5} />
        </mesh>
      ))}

      {/* Seat frame */}
      <RoundedBox args={[chairW, 0.15, chairD]} radius={0.03}
        position={[0, baseH + 0.075, 0]} castShadow>
        <meshStandardMaterial color={frameColor} roughness={0.85} />
      </RoundedBox>

      {/* Seat cushion */}
      <RoundedBox args={[chairW - 0.3, seatH, chairD - 0.3]} radius={0.1}
        position={[0, baseH + 0.15 + seatH / 2, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.92} />
      </RoundedBox>

      {/* Backrest */}
      <RoundedBox args={[chairW - 0.15, backH, backD]} radius={0.08}
        position={[0, baseH + seatH + backH / 2, -(chairD / 2 - backD / 2)]} castShadow>
        <meshStandardMaterial color={color} roughness={0.9} />
      </RoundedBox>

      {/* Back cushion */}
      <RoundedBox args={[chairW - 0.6, 0.85, 0.2]} radius={0.08}
        position={[0, baseH + seatH + 0.5, -(chairD / 2 - 0.2)]} castShadow>
        <meshStandardMaterial color={color} roughness={0.93} />
      </RoundedBox>

      {/* Left arm */}
      <RoundedBox args={[armW, armH, chairD - 0.1]} radius={0.06}
        position={[-(chairW / 2 - armW / 2), baseH + seatH / 2 + armH / 2, 0]} castShadow>
        <meshStandardMaterial color={frameColor} roughness={0.85} />
      </RoundedBox>

      {/* Right arm */}
      <RoundedBox args={[armW, armH, chairD - 0.1]} radius={0.06}
        position={[chairW / 2 - armW / 2, baseH + seatH / 2 + armH / 2, 0]} castShadow>
        <meshStandardMaterial color={frameColor} roughness={0.85} />
      </RoundedBox>

      {/* Accent pillow */}
      <RoundedBox args={[0.45, 0.45, 0.12]} radius={0.06}
        position={[0.1, baseH + seatH + 0.45, -0.3]}
        rotation={[0.1, 0.15, 0.05]} castShadow>
        <meshStandardMaterial color="#504565" roughness={0.9} />
      </RoundedBox>
    </group>
  );
}

/* ─── Coffee Table sub-component ─── */
function CoffeeTable({ topColor, legColor }: { topColor: string; legColor: string }) {
  const tableW = 3.0, tableD = 1.5, tableH = 0.1;
  const topY = 0.9;
  const legH = topY - tableH / 2;
  const shelfY = 0.3;

  return (
    <group>
      {/* Legs (4 thin metal rods) */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh key={`tleg${i}`}
          position={[sx * (tableW / 2 - 0.15), legH / 2, sz * (tableD / 2 - 0.12)]}
          castShadow>
          <cylinderGeometry args={[0.04, 0.04, legH, 6]} />
          <meshStandardMaterial color={legColor} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Table top */}
      <RoundedBox args={[tableW, tableH, tableD]} radius={0.02}
        position={[0, topY, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={topColor} roughness={0.6} metalness={0.05} />
      </RoundedBox>

      {/* Lower shelf */}
      <RoundedBox args={[tableW - 0.3, 0.06, tableD - 0.2]} radius={0.01}
        position={[0, shelfY, 0]} castShadow>
        <meshStandardMaterial color={topColor} roughness={0.7} />
      </RoundedBox>

      {/* Items on table: a couple of books and a small plant */}
      {/* Book stack */}
      <RoundedBox args={[0.5, 0.12, 0.35]} radius={0.01}
        position={[-0.7, topY + 0.11, 0.1]} rotation={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color="#4a3060" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.45, 0.08, 0.32]} radius={0.01}
        position={[-0.68, topY + 0.19, 0.08]} rotation={[0, -0.1, 0]} castShadow>
        <meshStandardMaterial color="#305050" roughness={0.85} />
      </RoundedBox>

      {/* Small decorative plant on table */}
      <mesh position={[0.8, topY + 0.15, -0.15]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#6b4c3b" roughness={0.85} />
      </mesh>
      <mesh position={[0.8, topY + 0.4, -0.15]} castShadow>
        <sphereGeometry args={[0.18, 7, 7]} />
        <meshStandardMaterial color="#2d8a4e" roughness={0.9} />
      </mesh>

      {/* Magazines on lower shelf */}
      <RoundedBox args={[0.6, 0.04, 0.4]} radius={0.005}
        position={[0.3, shelfY + 0.05, 0]} rotation={[0, 0.08, 0]} castShadow>
        <meshStandardMaterial color="#505060" roughness={0.8} />
      </RoundedBox>
    </group>
  );
}
