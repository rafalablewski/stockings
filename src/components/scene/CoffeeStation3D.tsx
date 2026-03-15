'use client';

import React from 'react';
import { RoundedBox } from '@react-three/drei';

interface CoffeeStation3DProps {
  position: [number, number, number];
}

/** Coffee station: counter, espresso machine, mugs on shelf, and mini fridge. */
export default function CoffeeStation3D({ position }: CoffeeStation3DProps) {
  return (
    <group position={position}>
      {/* ══ COUNTER ══ */}
      {/* Base cabinet */}
      <RoundedBox args={[4, 1.8, 1.2]} radius={0.03} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2530" roughness={0.8} />
      </RoundedBox>
      {/* Countertop surface */}
      <RoundedBox args={[4.2, 0.1, 1.4]} radius={0.02} position={[0, 1.85, 0]} castShadow>
        <meshStandardMaterial color="#4a4050" roughness={0.5} metalness={0.1} />
      </RoundedBox>

      {/* ══ ESPRESSO MACHINE ══ */}
      <group position={[0.6, 1.9, 0]}>
        {/* Machine body */}
        <RoundedBox args={[0.8, 0.9, 0.6]} radius={0.04} position={[0, 0.45, 0]} castShadow>
          <meshStandardMaterial color="#c0c0cc" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Top cap */}
        <RoundedBox args={[0.7, 0.12, 0.5]} radius={0.03} position={[0, 0.92, 0]} castShadow>
          <meshStandardMaterial color="#888890" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {/* Drip tray */}
        <RoundedBox args={[0.5, 0.04, 0.35]} radius={0.01} position={[0, 0.02, -0.15]} castShadow>
          <meshStandardMaterial color="#555" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        {/* Portafilter handle */}
        <mesh position={[0, 0.2, -0.32]} rotation={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
          <meshStandardMaterial color="#222" roughness={0.9} />
        </mesh>
        {/* Status light */}
        <mesh position={[0.25, 0.6, -0.31]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
      </group>

      {/* ══ MUGS ON COUNTER ══ */}
      {[
        { x: -0.5, z: -0.3, color: '#e05050' },
        { x: -0.8, z: 0.1, color: '#5080e0' },
        { x: -0.3, z: 0.2, color: '#e0c040' },
      ].map((mug, i) => (
        <group key={`mug${i}`} position={[mug.x, 1.9, mug.z]}>
          {/* Cup body */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.22, 10]} />
            <meshStandardMaterial color={mug.color} roughness={0.7} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.1, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.05, 0.015, 6, 10, Math.PI]} />
            <meshStandardMaterial color={mug.color} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* ══ MINI FRIDGE ══ */}
      <group position={[2.6, 0, 0]}>
        {/* Fridge body */}
        <RoundedBox args={[1.0, 1.6, 1.0]} radius={0.03} position={[0, 0.8, 0]} castShadow>
          <meshStandardMaterial color="#e8e8ec" roughness={0.6} metalness={0.1} />
        </RoundedBox>
        {/* Door line */}
        <mesh position={[-0.001, 0.8, -0.51]}>
          <planeGeometry args={[0.9, 1.5]} />
          <meshStandardMaterial color="#d8d8dc" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.3, 1.0, -0.53]} castShadow>
          <boxGeometry args={[0.04, 0.35, 0.04]} />
          <meshStandardMaterial color="#aaa" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* ══ WALL SHELF ABOVE COUNTER ══ */}
      <RoundedBox args={[2.5, 0.08, 0.5]} radius={0.01} position={[-0.2, 3.4, 0.3]} castShadow>
        <meshStandardMaterial color="#3a3540" roughness={0.7} />
      </RoundedBox>
      {/* Extra mugs on shelf */}
      {[-0.8, -0.3, 0.2, 0.7].map((x, i) => (
        <mesh key={`smug${i}`} position={[x - 0.2, 3.55, 0.3]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.18, 8]} />
          <meshStandardMaterial color={['#d06060', '#60a0d0', '#d0a040', '#60d080'][i]} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
