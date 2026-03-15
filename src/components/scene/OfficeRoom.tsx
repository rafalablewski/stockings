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
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[ROOM_W / 2, 0, ROOM_D / 2]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color="#18181f" />
      </mesh>

      {/* Grid */}
      <gridHelper
        args={[Math.max(ROOM_W, ROOM_D), Math.max(ROOM_W, ROOM_D), 0x252530, 0x252530]}
        position={[ROOM_W / 2, 0.01, ROOM_D / 2]}
      />

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
