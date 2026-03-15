'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

type PlantVariant = 'fiddleleaf' | 'snake' | 'monstera' | 'fern';

interface Plant3DProps {
  position: [number, number, number];
  scale?: number;
  potColor?: string;
  leafColor?: string;
  variant?: PlantVariant;
}

/** Decorative potted plant — 4 distinct 3D models. */
export default function Plant3D({
  position,
  scale = 1,
  potColor = '#6b4c3b',
  leafColor = '#2d8a4e',
  variant = 'fiddleleaf',
}: Plant3DProps) {
  const leafRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!leafRef.current) return;
    const t = clock.getElapsedTime();
    leafRef.current.rotation.z = Math.sin(t * 0.8 + position[0]) * 0.02;
    leafRef.current.rotation.x = Math.cos(t * 0.6 + position[2]) * 0.015;
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {variant === 'fiddleleaf' && (
        <FiddleLeaf potColor={potColor} leafColor={leafColor} leafRef={leafRef} />
      )}
      {variant === 'snake' && (
        <SnakePlant potColor={potColor} leafColor={leafColor} leafRef={leafRef} />
      )}
      {variant === 'monstera' && (
        <Monstera potColor={potColor} leafColor={leafColor} leafRef={leafRef} />
      )}
      {variant === 'fern' && (
        <Fern potColor={potColor} leafColor={leafColor} leafRef={leafRef} />
      )}
    </group>
  );
}

// ─── Shared pot ───
function Pot({ color, tall }: { color: string; tall?: boolean }) {
  const h = tall ? 0.7 : 0.5;
  const rTop = tall ? 0.35 : 0.25;
  const rBot = tall ? 0.28 : 0.2;
  const y = h / 2;
  return (
    <>
      <mesh position={[0, y, 0]} castShadow>
        <cylinderGeometry args={[rTop, rBot, h, 12]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0, h + 0.02, 0]} castShadow>
        <cylinderGeometry args={[rTop + 0.03, rTop, 0.05, 12]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, h, 0]}>
        <cylinderGeometry args={[rTop - 0.03, rTop - 0.03, 0.04, 12]} />
        <meshStandardMaterial color="#3a2820" roughness={1} />
      </mesh>
    </>
  );
}

// ─── 1. Fiddle Leaf Fig ───
// Tall trunk with large oval leaf paddles at different heights and angles
function FiddleLeaf({ potColor, leafColor, leafRef }: {
  potColor: string; leafColor: string; leafRef: React.RefObject<THREE.Group | null>;
}) {
  const dark = new THREE.Color(leafColor).multiplyScalar(0.75).getStyle();

  const leaves = [
    { y: 1.4, rx: 0.3, ry: 0.2, s: 0.7, c: leafColor },
    { y: 1.8, rx: -0.2, ry: 1.8, s: 0.8, c: dark },
    { y: 2.2, rx: 0.15, ry: 0.9, s: 0.85, c: leafColor },
    { y: 2.5, rx: -0.35, ry: 2.5, s: 0.75, c: dark },
    { y: 2.8, rx: 0.1, ry: 0.4, s: 0.9, c: leafColor },
    { y: 3.1, rx: -0.15, ry: 1.6, s: 0.65, c: dark },
  ];

  return (
    <>
      <Pot color={potColor} tall />
      {/* Trunk — slight curve via two segments */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 1.5, 6]} />
        <meshStandardMaterial color="#5a3d2b" roughness={0.9} />
      </mesh>
      <mesh position={[0.03, 2.2, 0.02]} rotation={[0, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 1.2, 6]} />
        <meshStandardMaterial color="#5a3d2b" roughness={0.9} />
      </mesh>
      {/* Leaves — flat oval paddles on short stems */}
      <group ref={leafRef}>
        {leaves.map((l, i) => (
          <group key={i} position={[0, l.y, 0]} rotation={[l.rx, l.ry, 0]}>
            {/* Stem */}
            <mesh position={[0.15, 0, 0]} rotation={[0, 0, -0.5]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.35, 4]} />
              <meshStandardMaterial color="#4a6a35" roughness={0.9} />
            </mesh>
            {/* Leaf paddle */}
            <RoundedBox args={[0.35 * l.s, 0.04, 0.55 * l.s]} radius={0.02}
              position={[0.3, 0.05, 0]} rotation={[0.1, 0, -0.15]} castShadow>
              <meshStandardMaterial color={l.c} roughness={0.85} />
            </RoundedBox>
          </group>
        ))}
      </group>
    </>
  );
}

// ─── 2. Snake Plant (Sansevieria) ───
// Tall sharp blades fanning out from the pot, banded coloring
function SnakePlant({ potColor, leafColor, leafRef }: {
  potColor: string; leafColor: string; leafRef: React.RefObject<THREE.Group | null>;
}) {
  const accent = new THREE.Color(leafColor).multiplyScalar(1.3).getStyle();
  const dark = new THREE.Color(leafColor).multiplyScalar(0.6).getStyle();

  const blades = [
    { x: 0, z: 0, h: 2.4, lean: 0, twist: 0 },
    { x: 0.12, z: 0.1, h: 2.1, lean: 0.12, twist: 0.5 },
    { x: -0.1, z: 0.08, h: 2.0, lean: -0.1, twist: -0.4 },
    { x: 0.08, z: -0.1, h: 1.8, lean: 0.08, twist: 1.2 },
    { x: -0.12, z: -0.05, h: 2.2, lean: -0.15, twist: -1.0 },
    { x: 0.15, z: -0.08, h: 1.6, lean: 0.18, twist: 2.0 },
    { x: -0.05, z: 0.15, h: 1.9, lean: -0.05, twist: 0.8 },
  ];

  return (
    <>
      <Pot color={potColor} />
      <group ref={leafRef}>
        {blades.map((b, i) => (
          <group key={i} position={[b.x, 0.5, b.z]} rotation={[b.lean, b.twist, 0]}>
            {/* Blade — tapered box */}
            <mesh position={[0, b.h / 2, 0]} castShadow>
              <boxGeometry args={[0.08, b.h, 0.03]} />
              <meshStandardMaterial color={i % 3 === 0 ? accent : i % 3 === 1 ? leafColor : dark} roughness={0.8} />
            </mesh>
            {/* Pointed tip */}
            <mesh position={[0, b.h + 0.06, 0]} castShadow>
              <coneGeometry args={[0.04, 0.14, 4]} />
              <meshStandardMaterial color={accent} roughness={0.8} />
            </mesh>
            {/* Horizontal band stripe */}
            <mesh position={[0, b.h * 0.6, 0.016]}>
              <planeGeometry args={[0.07, 0.06]} />
              <meshStandardMaterial color={accent} roughness={0.7} />
            </mesh>
            <mesh position={[0, b.h * 0.35, 0.016]}>
              <planeGeometry args={[0.07, 0.06]} />
              <meshStandardMaterial color={accent} roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

// ─── 3. Monstera ───
// Medium plant with large split leaves on arching stems
function Monstera({ potColor, leafColor, leafRef }: {
  potColor: string; leafColor: string; leafRef: React.RefObject<THREE.Group | null>;
}) {
  const dark = new THREE.Color(leafColor).multiplyScalar(0.7).getStyle();
  const light = new THREE.Color(leafColor).multiplyScalar(1.15).getStyle();

  const stems = [
    { angle: 0, lean: 0.4, h: 1.6, leafS: 1.0, c: leafColor },
    { angle: Math.PI * 0.4, lean: 0.35, h: 1.4, leafS: 0.85, c: dark },
    { angle: Math.PI * 0.8, lean: 0.5, h: 1.8, leafS: 1.1, c: light },
    { angle: Math.PI * 1.2, lean: 0.3, h: 1.3, leafS: 0.8, c: leafColor },
    { angle: Math.PI * 1.6, lean: 0.45, h: 1.5, leafS: 0.95, c: dark },
  ];

  return (
    <>
      <Pot color={potColor} tall />
      <group ref={leafRef}>
        {stems.map((s, i) => (
          <group key={i} rotation={[0, s.angle, 0]}>
            {/* Arching stem */}
            <group position={[0, 0.7, 0]} rotation={[s.lean, 0, 0]}>
              <mesh position={[0, s.h / 2, 0]} castShadow>
                <cylinderGeometry args={[0.025, 0.04, s.h, 5]} />
                <meshStandardMaterial color="#3d6630" roughness={0.9} />
              </mesh>
              {/* Main leaf — large flat disc, slightly cupped */}
              <group position={[0, s.h - 0.1, 0.05]} rotation={[0.6, 0, 0]}>
                <mesh castShadow>
                  <circleGeometry args={[0.4 * s.leafS, 12]} />
                  <meshStandardMaterial color={s.c} roughness={0.8} side={THREE.DoubleSide} />
                </mesh>
                {/* Split holes (darker circles to simulate fenestrations) */}
                {[0.12, -0.12].map((ox, hi) => (
                  <mesh key={hi} position={[ox, 0.05, 0.01]}>
                    <circleGeometry args={[0.08 * s.leafS, 8]} />
                    <meshStandardMaterial color={dark} roughness={0.85} side={THREE.DoubleSide} />
                  </mesh>
                ))}
                {/* Leaf vein (center line) */}
                <mesh position={[0, 0, 0.005]}>
                  <planeGeometry args={[0.02, 0.6 * s.leafS]} />
                  <meshStandardMaterial color={light} roughness={0.8} />
                </mesh>
              </group>
            </group>
          </group>
        ))}
      </group>
    </>
  );
}

// ─── 4. Fern ───
// Bushy cascading fronds radiating outward and drooping
function Fern({ potColor, leafColor, leafRef }: {
  potColor: string; leafColor: string; leafRef: React.RefObject<THREE.Group | null>;
}) {
  const dark = new THREE.Color(leafColor).multiplyScalar(0.7).getStyle();
  const light = new THREE.Color(leafColor).multiplyScalar(1.2).getStyle();

  // Fronds radiate outward at various angles
  const fronds: Array<{ angle: number; lean: number; length: number; droop: number }> = [];
  for (let i = 0; i < 12; i++) {
    fronds.push({
      angle: (i / 12) * Math.PI * 2 + (i % 2 === 0 ? 0.1 : -0.1),
      lean: 0.4 + (i % 3) * 0.15,
      length: 0.8 + (i % 4) * 0.15,
      droop: 0.2 + (i % 3) * 0.1,
    });
  }

  return (
    <>
      <Pot color={potColor} />
      <group ref={leafRef} position={[0, 0.55, 0]}>
        {/* Central tuft */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshStandardMaterial color={dark} roughness={0.9} />
        </mesh>
        {/* Fronds */}
        {fronds.map((f, i) => {
          const colors = [leafColor, dark, light];
          const c = colors[i % 3];
          return (
            <group key={i} rotation={[0, f.angle, 0]}>
              <group rotation={[f.lean, 0, 0]}>
                {/* Frond stem */}
                <mesh position={[0, f.length / 2, 0]}
                  rotation={[f.droop, 0, 0]} castShadow>
                  <cylinderGeometry args={[0.008, 0.012, f.length, 4]} />
                  <meshStandardMaterial color="#3a5a2a" roughness={0.9} />
                </mesh>
                {/* Leaflets along the frond (small flat ovals) */}
                {[0.2, 0.4, 0.6, 0.8].map((t, li) => {
                  const fy = t * f.length;
                  const leafletS = 0.08 + (1 - t) * 0.06;
                  return (
                    <group key={li} position={[0, fy, 0]} rotation={[f.droop * t, 0, 0]}>
                      {/* Left leaflet */}
                      <mesh position={[-leafletS, 0, 0]}
                        rotation={[0, 0, 0.3]} castShadow>
                        <planeGeometry args={[leafletS * 2, leafletS * 0.8]} />
                        <meshStandardMaterial color={c} roughness={0.85} side={THREE.DoubleSide} />
                      </mesh>
                      {/* Right leaflet */}
                      <mesh position={[leafletS, 0, 0]}
                        rotation={[0, 0, -0.3]} castShadow>
                        <planeGeometry args={[leafletS * 2, leafletS * 0.8]} />
                        <meshStandardMaterial color={c} roughness={0.85} side={THREE.DoubleSide} />
                      </mesh>
                    </group>
                  );
                })}
              </group>
            </group>
          );
        })}
      </group>
    </>
  );
}
