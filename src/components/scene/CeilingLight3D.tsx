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
  /** Intensity of the point light (default 1.2) */
  intensity?: number;
}

/**
 * Industrial pendant lamp — matte black fixture with an exposed warm-glow bulb,
 * a subtle volumetric cone, and a real pointLight for ambient contribution.
 */
export default function CeilingLight3D({
  position,
  color = '#ffe4b5',
  scale = 1,
  intensity = 1.2,
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
      mat.opacity = 0.08 * pulse;
    }
    if (lightRef.current) {
      lightRef.current.intensity = intensity * pulse;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* ── Cable from ceiling ── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* ── Canopy (ceiling rose) ── */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.06, 12]} />
        <meshStandardMaterial color="#222228" roughness={0.85} metalness={0.3} />
      </mesh>

      {/* ── Lamp shade / housing — industrial cone ── */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.5, 0.45, 16, 1, true]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.8} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Shade rim ring */}
      <mesh position={[0, -1.12, 0]}>
        <torusGeometry args={[0.5, 0.015, 8, 24]} />
        <meshStandardMaterial color="#333340" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* ── Inner reflector (shiny inside of shade) ── */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.07, 0.45, 0.35, 16, 1, true]} />
        <meshStandardMaterial color="#888880" roughness={0.3} metalness={0.7} side={THREE.BackSide} />
      </mesh>

      {/* ── Exposed filament bulb ── */}
      <mesh ref={bulbRef} position={[0, -0.95, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={1.5}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>
      {/* Bulb screw base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 8]} />
        <meshStandardMaterial color="#888880" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* ── Volumetric light cone (faked with a transparent cone mesh) ── */}
      <mesh ref={coneRef} position={[0, -2.8, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[2.8, 3.6, 24, 1, true]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── Actual point light for real illumination ── */}
      <pointLight
        ref={lightRef}
        position={[0, -1.2, 0]}
        color={color}
        intensity={intensity}
        distance={25}
        decay={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
    </group>
  );
}
