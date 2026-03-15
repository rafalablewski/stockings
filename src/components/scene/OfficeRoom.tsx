'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ROOM_W, ROOM_D, WALL_H } from './constants';

/** Dark office room: floor with grid, 4 walls that fade when facing camera. */
export default function OfficeRoom() {
  const backRef = useRef<THREE.Mesh>(null);
  const frontRef = useRef<THREE.Mesh>(null);
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  // Fade walls that face the camera so the user can always see inside
  useFrame(({ camera }) => {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);

    const fade = (ref: React.RefObject<THREE.Mesh | null>, nx: number, nz: number) => {
      if (!ref.current) return;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      // dot > 0 means camera looks toward this wall → fade it out
      const dot = dir.x * nx + dir.z * nz;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, dot > 0 ? 0.08 : 0.65, 0.08);
    };

    fade(backRef,  0,  1);  // wall at z=ROOM_D, normal +Z
    fade(frontRef, 0, -1);  // wall at z=0, normal -Z
    fade(leftRef, -1,  0);  // wall at x=0, normal -X
    fade(rightRef, 1,  0);  // wall at x=ROOM_W, normal +X
  });

  const wallMat = (color: string) => (
    <meshStandardMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} />
  );

  return (
    <group>
      {/* ══ RAISED ACCESS FLOOR ══ */}
      {(() => {
        const tileSize = 2;          // 600 mm standard raised-floor tile
        const gap = 0.04;            // pedestal / stringer gap
        const cols = Math.floor(ROOM_W / tileSize);
        const rows = Math.floor(ROOM_D / tileSize);

        // Muted trading-floor palette: light warm grays with subtle variation
        const tileShades = ['#b8b4ac', '#b0aca4', '#ada9a0', '#b5b1a8'];
        // Perforated vent tiles — every ~8th tile
        const isVentTile = (xi: number, zi: number) =>
          (xi % 8 === 3 && zi % 6 === 2);

        return (
          <group>
            {/* Sub-floor void (visible through gaps) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[ROOM_W / 2, -0.08, ROOM_D / 2]}>
              <planeGeometry args={[ROOM_W, ROOM_D]} />
              <meshStandardMaterial color="#0a0a0e" />
            </mesh>

            {/* Pedestal grid — stringers along X */}
            {Array.from({ length: rows + 1 }).map((_, i) => (
              <mesh key={`sx-${i}`} position={[ROOM_W / 2, -0.02, i * tileSize]} receiveShadow>
                <boxGeometry args={[ROOM_W, 0.06, gap]} />
                <meshStandardMaterial color="#6e6b64" metalness={0.6} roughness={0.4} />
              </mesh>
            ))}
            {/* Pedestal grid — stringers along Z */}
            {Array.from({ length: cols + 1 }).map((_, i) => (
              <mesh key={`sz-${i}`} position={[i * tileSize, -0.02, ROOM_D / 2]} receiveShadow>
                <boxGeometry args={[gap, 0.06, ROOM_D]} />
                <meshStandardMaterial color="#6e6b64" metalness={0.6} roughness={0.4} />
              </mesh>
            ))}

            {/* Floor tiles */}
            {Array.from({ length: cols }).map((_, xi) =>
              Array.from({ length: rows }).map((_, zi) => {
                const vent = isVentTile(xi, zi);
                return (
                  <mesh
                    key={`ft-${xi}-${zi}`}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[
                      xi * tileSize + tileSize / 2,
                      0,
                      zi * tileSize + tileSize / 2,
                    ]}
                    receiveShadow
                  >
                    <planeGeometry args={[tileSize - gap, tileSize - gap]} />
                    <meshStandardMaterial
                      color={vent ? '#9e9a92' : tileShades[(xi + zi) % tileShades.length]}
                      roughness={vent ? 0.7 : 0.55}
                      metalness={vent ? 0.15 : 0.05}
                    />
                  </mesh>
                );
              })
            )}
          </group>
        );
      })()}

      {/* Back wall (z = ROOM_D) */}
      <mesh ref={backRef} position={[ROOM_W / 2, WALL_H / 2, ROOM_D]}>
        <planeGeometry args={[ROOM_W, WALL_H]} />
        {wallMat('#1a1a24')}
      </mesh>

      {/* Front wall (z = 0) */}
      <mesh ref={frontRef} position={[ROOM_W / 2, WALL_H / 2, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[ROOM_W, WALL_H]} />
        {wallMat('#1a1a24')}
      </mesh>

      {/* Left wall (x = 0) */}
      <mesh ref={leftRef} position={[0, WALL_H / 2, ROOM_D / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_D, WALL_H]} />
        {wallMat('#1e1e28')}
      </mesh>

      {/* Right wall (x = ROOM_W) */}
      <mesh ref={rightRef} position={[ROOM_W, WALL_H / 2, ROOM_D / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_D, WALL_H]} />
        {wallMat('#1e1e28')}
      </mesh>
    </group>
  );
}
