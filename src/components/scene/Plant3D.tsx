'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Plant3DProps {
  position: [number, number, number];
  /** Overall scale multiplier (default 1) */
  scale?: number;
  /** Pot color */
  potColor?: string;
  /** Leaf color */
  leafColor?: string;
  /** 'bush' = round bushy plant, 'tall' = tall floor plant with multiple leaf clusters */
  variant?: 'bush' | 'tall';
}

/** Decorative potted plant with gentle leaf sway. */
export default function Plant3D({
  position,
  scale = 1,
  potColor = '#6b4c3b',
  leafColor = '#2d8a4e',
  variant = 'bush',
}: Plant3DProps) {
  const leafGroupRef = useRef<THREE.Group>(null);

  // Gentle sway animation
  useFrame(({ clock }) => {
    if (!leafGroupRef.current) return;
    const t = clock.getElapsedTime();
    leafGroupRef.current.rotation.z = Math.sin(t * 0.8 + position[0]) * 0.02;
    leafGroupRef.current.rotation.x = Math.cos(t * 0.6 + position[2]) * 0.015;
  });

  const darkLeaf = new THREE.Color(leafColor).multiplyScalar(0.7).getStyle();

  if (variant === 'tall') {
    return (
      <group position={position} scale={[scale, scale, scale]}>
        {/* Pot */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.28, 0.7, 10]} />
          <meshStandardMaterial color={potColor} roughness={0.85} />
        </mesh>
        {/* Pot rim */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.36, 0.06, 10]} />
          <meshStandardMaterial color={potColor} roughness={0.8} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.04, 10]} />
          <meshStandardMaterial color="#3a2820" roughness={1} />
        </mesh>
        {/* Trunk */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 1.8, 6]} />
          <meshStandardMaterial color="#5a3d2b" roughness={0.9} />
        </mesh>
        {/* Leaf clusters at different heights */}
        <group ref={leafGroupRef}>
          {[
            { y: 2.0, s: 0.5, xo: 0.15, zo: 0.1 },
            { y: 2.4, s: 0.65, xo: -0.1, zo: 0.15 },
            { y: 2.8, s: 0.8, xo: 0, zo: 0 },
            { y: 3.1, s: 0.55, xo: 0.1, zo: -0.1 },
          ].map((cluster, i) => (
            <mesh key={i} position={[cluster.xo, cluster.y, cluster.zo]} castShadow>
              <sphereGeometry args={[cluster.s, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? leafColor : darkLeaf}
                roughness={0.9}
              />
            </mesh>
          ))}
        </group>
      </group>
    );
  }

  // Bush variant (small desk or floor plant)
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Pot */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.2, 0.5, 10]} />
        <meshStandardMaterial color={potColor} roughness={0.85} />
      </mesh>
      {/* Pot rim */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.27, 0.26, 0.04, 10]} />
        <meshStandardMaterial color={potColor} roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 10]} />
        <meshStandardMaterial color="#3a2820" roughness={1} />
      </mesh>
      {/* Bush canopy */}
      <group ref={leafGroupRef}>
        <mesh position={[0, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.45, 8, 8]} />
          <meshStandardMaterial color={leafColor} roughness={0.9} />
        </mesh>
        {/* Secondary smaller spheres for organic look */}
        {[
          [0.2, 1.1, 0.15],
          [-0.18, 1.05, -0.12],
          [0.05, 1.2, -0.1],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <sphereGeometry args={[0.25, 7, 7]} />
            <meshStandardMaterial color={i % 2 === 0 ? leafColor : darkLeaf} roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
