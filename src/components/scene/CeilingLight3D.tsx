'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CeilingLight3DProps {
  position: [number, number, number];
  /** Light colour (default warm white) */
  color?: string;
  /** Scale multiplier */
  scale?: number;
  /** Intensity of the point light (default 1.0) */
  intensity?: number;
}

/**
 * Compact recessed-style pendant lamp for a dropped ceiling.
 * Small fixture, short cable, warm glow bulb, subtle volumetric cone.
 */
export default function CeilingLight3D({
  position,
  color = '#ffe4b5',
  scale = 1,
  intensity = 1.0,
}: CeilingLight3DProps) {
  const bulbRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowColor = new THREE.Color(color);

  // Gentle flicker / warm pulse
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1.0 + Math.sin(t * 1.8 + position[0] * 0.7) * 0.06
                      + Math.sin(t * 3.1 + position[2] * 1.2) * 0.03;

    if (bulbRef.current) {
      const mat = bulbRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 * pulse;
    }
    if (coneRef.current) {
      const mat = coneRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.06 * pulse;
    }
    if (lightRef.current) {
      lightRef.current.intensity = intensity * pulse;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* ── Flush ceiling mount ── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 10]} />
        <meshStandardMaterial color="#222228" roughness={0.85} metalness={0.3} />
      </mesh>

      {/* ── Short cable ── */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* ── Lamp shade — small cone ── */}
      <mesh position={[0, -0.52, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.22, 0.2, 12, 1, true]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.8} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Shade rim */}
      <mesh position={[0, -0.62, 0]}>
        <torusGeometry args={[0.22, 0.008, 8, 16]} />
        <meshStandardMaterial color="#333340" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* ── Inner reflector ── */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.035, 0.2, 0.16, 12, 1, true]} />
        <meshStandardMaterial color="#888880" roughness={0.3} metalness={0.7} side={THREE.BackSide} />
      </mesh>

      {/* ── Bulb ── */}
      <mesh ref={bulbRef} position={[0, -0.55, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={1.5}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>
      {/* Bulb socket */}
      <mesh position={[0, -0.47, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.05, 6]} />
        <meshStandardMaterial color="#888880" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* ── Volumetric light cone (subtle) ── */}
      <mesh ref={coneRef} position={[0, -1.8, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.4, 2.2, 16, 1, true]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── Point light ── */}
      <pointLight
        ref={lightRef}
        position={[0, -0.7, 0]}
        color={color}
        intensity={intensity}
        distance={18}
        decay={2}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
    </group>
  );
}
