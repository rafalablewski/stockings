'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface Desk3DProps {
  position: [number, number, number];
  color: string;       // division color for monitor glow
  isActive: boolean;   // whether monitors should glow
}

/** Full trading desk: table, legs, dual monitors, keyboard, mouse, and ergonomic office chair. */
export default function Desk3D({ position, color, isActive }: Desk3DProps) {
  const screenLRef = useRef<THREE.Mesh>(null);
  const screenRRef = useRef<THREE.Mesh>(null);
  const glowColor = new THREE.Color(color);

  useFrame(({ clock }) => {
    if (!isActive) return;
    const t = clock.getElapsedTime();
    const pulse = 0.6 + Math.sin(t * 2) * 0.15;
    [screenLRef, screenRRef].forEach(ref => {
      if (!ref.current) return;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = pulse;
    });
  });

  // Desk dimensions
  const deskW = 2.8, deskD = 1.4, deskH = 0.12, deskZ = 1.5;
  const legW = 0.1, legH = deskZ;

  // Chair dimensions
  const seatW = 1.0, seatD = 1.0, seatH = 0.12, seatZ = 0.7;
  const backW = 0.9, backH = 0.85, backD = 0.1;
  const armLen = 0.8, armW = 0.08, armH = 0.06;
  const poleR = 0.06, poleH = seatZ - 0.08;
  const starLeg = 0.45;

  return (
    <group position={position}>
      {/* ══ CHAIR ══ */}
      <group position={[0, 0, -1.05]}>
        {/* Star base legs */}
        {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
          <mesh key={`sl${i}`} position={[Math.cos(angle) * starLeg * 0.5, 0.04, Math.sin(angle) * starLeg * 0.5]}
            rotation={[0, angle, 0]} castShadow>
            <boxGeometry args={[starLeg, 0.06, 0.1]} />
            <meshStandardMaterial color="#555560" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* Casters (small spheres at leg ends) */}
        {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
          <mesh key={`caster${i}`} position={[Math.cos(angle) * starLeg, 0.03, Math.sin(angle) * starLeg]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
        {/* Gas lift pole */}
        <mesh position={[0, poleH / 2 + 0.08, 0]} castShadow>
          <cylinderGeometry args={[poleR, poleR, poleH, 8]} />
          <meshStandardMaterial color="#707078" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Seat cushion */}
        <RoundedBox args={[seatW, seatH, seatD]} radius={0.04} position={[0, seatZ, 0]} castShadow>
          <meshStandardMaterial color="#3a3a42" roughness={0.85} />
        </RoundedBox>
        {/* Backrest */}
        <RoundedBox args={[backW, backH, backD]} radius={0.04}
          position={[0, seatZ + seatH / 2 + backH / 2, seatD / 2 - backD / 2]} castShadow>
          <meshStandardMaterial color="#3a3a42" roughness={0.85} />
        </RoundedBox>
        {/* Left armrest + support */}
        <mesh position={[-seatW / 2 + armW / 2, seatZ - 0.02, 0.1]} castShadow>
          <boxGeometry args={[armW, 0.14, 0.08]} />
          <meshStandardMaterial color="#505058" metalness={0.4} roughness={0.5} />
        </mesh>
        <RoundedBox args={[armW, armH, armLen]} radius={0.02}
          position={[-seatW / 2 + armW / 2, seatZ + 0.18, -0.05]} castShadow>
          <meshStandardMaterial color="#48484f" roughness={0.85} />
        </RoundedBox>
        {/* Right armrest + support */}
        <mesh position={[seatW / 2 - armW / 2, seatZ - 0.02, 0.1]} castShadow>
          <boxGeometry args={[armW, 0.14, 0.08]} />
          <meshStandardMaterial color="#505058" metalness={0.4} roughness={0.5} />
        </mesh>
        <RoundedBox args={[armW, armH, armLen]} radius={0.02}
          position={[seatW / 2 - armW / 2, seatZ + 0.18, -0.05]} castShadow>
          <meshStandardMaterial color="#48484f" roughness={0.85} />
        </RoundedBox>
      </group>

      {/* ══ DESK ══ */}
      {/* Desk legs */}
      {[[-1, 0], [1, 0], [-1, 1], [1, 1]].map(([sx, sy], i) => (
        <mesh key={`leg${i}`}
          position={[sx * (deskW / 2 - 0.1), legH / 2, sy * (deskD - 0.1) - deskD / 2 + 0.05]}
          castShadow>
          <boxGeometry args={[legW, legH, legW]} />
          <meshStandardMaterial color="#5a5a64" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Desk surface */}
      <RoundedBox args={[deskW, deskH, deskD]} radius={0.02} position={[0, deskZ, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#a5845a" roughness={0.7} />
      </RoundedBox>

      {/* ══ MONITORS ══ */}
      {[-0.55, 0.55].map((mx, mi) => (
        <group key={`mon${mi}`} position={[mx, 0, 0.3]}>
          {/* Stand */}
          <mesh position={[0, deskZ + 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
            <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Stand base */}
          <mesh position={[0, deskZ + 0.01, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 12]} />
            <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Bezel */}
          <RoundedBox args={[1.0, 0.7, 0.04]} radius={0.015}
            position={[0, deskZ + 0.65, 0]} castShadow>
            <meshStandardMaterial color="#2a2a32" roughness={0.8} />
          </RoundedBox>
          {/* Screen */}
          <mesh ref={mi === 0 ? screenLRef : screenRRef}
            position={[0, deskZ + 0.65, -0.021]}>
            <planeGeometry args={[0.88, 0.58]} />
            <meshStandardMaterial
              color={isActive ? color : '#2a2a40'}
              emissive={isActive ? glowColor : new THREE.Color('#3a3a55')}
              emissiveIntensity={isActive ? 0.6 : 0.15}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* ══ KEYBOARD ══ */}
      <RoundedBox args={[0.8, 0.03, 0.25]} radius={0.01}
        position={[0, deskZ + deskH / 2 + 0.015, -0.2]} castShadow>
        <meshStandardMaterial color={isActive ? `${color}` : '#38383f'} roughness={0.9}
          emissive={isActive ? glowColor : new THREE.Color('#000')}
          emissiveIntensity={isActive ? 0.15 : 0}
        />
      </RoundedBox>

      {/* ══ MOUSE ══ */}
      <mesh position={[0.65, deskZ + deskH / 2 + 0.015, -0.2]} castShadow>
        <capsuleGeometry args={[0.03, 0.04, 4, 8]} />
        <meshStandardMaterial color="#404048" roughness={0.8} />
      </mesh>
    </group>
  );
}
