'use client';

import React from 'react';
import { RoundedBox } from '@react-three/drei';

interface CoffeeStation3DProps {
  position: [number, number, number];
}

/** Coffee station — Japandi style: oak counter, walnut accents, ceramic mugs. */
export default function CoffeeStation3D({ position }: CoffeeStation3DProps) {
  return (
    <group position={position}>
      {/* ══ COUNTER ══ */}
      {/* Base cabinet — walnut wood */}
      <RoundedBox args={[4, 1.8, 1.2]} radius={0.03} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#6e5540" roughness={0.7} />
      </RoundedBox>
      {/* Countertop surface — light oak */}
      <RoundedBox args={[4.2, 0.1, 1.4]} radius={0.02} position={[0, 1.85, 0]} castShadow>
        <meshStandardMaterial color="#a08c74" roughness={0.5} metalness={0.02} />
      </RoundedBox>

      {/* ══ ESPRESSO MACHINE ══ */}
      <group position={[0.6, 1.9, 0]}>
        {/* Machine body — matte black */}
        <RoundedBox args={[0.8, 0.9, 0.6]} radius={0.04} position={[0, 0.45, 0]} castShadow>
          <meshStandardMaterial color="#2a2826" metalness={0.3} roughness={0.6} />
        </RoundedBox>
        {/* Top cap — brushed metal */}
        <RoundedBox args={[0.7, 0.12, 0.5]} radius={0.03} position={[0, 0.92, 0]} castShadow>
          <meshStandardMaterial color="#8a8480" metalness={0.5} roughness={0.35} />
        </RoundedBox>
        {/* Drip tray */}
        <RoundedBox args={[0.5, 0.04, 0.35]} radius={0.01} position={[0, 0.02, -0.15]} castShadow>
          <meshStandardMaterial color="#3a3836" metalness={0.4} roughness={0.5} />
        </RoundedBox>
        {/* Portafilter handle — dark walnut */}
        <mesh position={[0, 0.2, -0.32]} rotation={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
          <meshStandardMaterial color="#4a3a2e" roughness={0.7} />
        </mesh>
        {/* Status light — warm amber */}
        <mesh position={[0.25, 0.6, -0.31]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#e8a040" emissive="#e8a040" emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
      </group>

      {/* ══ MUGS ON COUNTER — ceramic earth tones ══ */}
      {[
        { x: -0.5, z: -0.3, color: '#d4ccc0' },
        { x: -0.8, z: 0.1, color: '#8a9a7c' },
        { x: -0.3, z: 0.2, color: '#c4a882' },
      ].map((mug, i) => (
        <group key={`mug${i}`} position={[mug.x, 1.9, mug.z]}>
          {/* Cup body */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.22, 10]} />
            <meshStandardMaterial color={mug.color} roughness={0.75} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.1, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.05, 0.015, 6, 10, Math.PI]} />
            <meshStandardMaterial color={mug.color} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* ══ MINI FRIDGE — matte warm white ══ */}
      <group position={[2.6, 0, 0]}>
        {/* Fridge body */}
        <RoundedBox args={[1.0, 1.6, 1.0]} radius={0.03} position={[0, 0.8, 0]} castShadow>
          <meshStandardMaterial color="#e4ddd4" roughness={0.65} metalness={0.05} />
        </RoundedBox>
        {/* Door line */}
        <mesh position={[-0.001, 0.8, -0.51]}>
          <planeGeometry args={[0.9, 1.5]} />
          <meshStandardMaterial color="#dbd4ca" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* Handle — blackened steel */}
        <mesh position={[0.3, 1.0, -0.53]} castShadow>
          <boxGeometry args={[0.04, 0.35, 0.04]} />
          <meshStandardMaterial color="#2a2826" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* ══ WALL SHELF — natural oak ══ */}
      <RoundedBox args={[2.5, 0.08, 0.5]} radius={0.01} position={[-0.2, 3.4, 0.3]} castShadow>
        <meshStandardMaterial color="#a08c74" roughness={0.55} />
      </RoundedBox>
      {/* Mugs on shelf — muted ceramics */}
      {[
        { x: -0.8, color: '#c4a882' },
        { x: -0.3, color: '#d4ccc0' },
        { x: 0.2, color: '#8a9a7c' },
        { x: 0.7, color: '#b09878' },
      ].map((m, i) => (
        <mesh key={`smug${i}`} position={[m.x - 0.2, 3.55, 0.3]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.18, 8]} />
          <meshStandardMaterial color={m.color} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}
