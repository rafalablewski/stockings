'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface ServerRack3DProps {
  position: [number, number, number];
  /** Rotation around Y axis in radians */
  rotation?: number;
  scale?: number;
}

interface LedConfig {
  x: number;
  y: number;
  z: number;
  speed: number;
  phase: number;
  color: THREE.Color;
}

/**
 * 42U server rack with ventilation grilles, 6 server units, cable management,
 * and rows of independently blinking status LEDs.
 */
export default function ServerRack3D({
  position,
  rotation = 0,
  scale = 1,
}: ServerRack3DProps) {
  const ledsRef = useRef<THREE.InstancedMesh>(null);

  // Rack dimensions
  const rackW = 1.2;
  const rackD = 0.8;
  const rackH = 5.5;

  // Pre-compute LED configs
  const leds = useMemo<LedConfig[]>(() => {
    const arr: LedConfig[] = [];
    const ledColors = [
      new THREE.Color('#00ff88'), // green — healthy
      new THREE.Color('#00ff88'),
      new THREE.Color('#00ff88'),
      new THREE.Color('#00ccff'), // cyan — network
      new THREE.Color('#ffaa00'), // amber — activity
      new THREE.Color('#ff3333'), // red — alert (rare)
    ];

    // 6 server units
    for (let unit = 0; unit < 6; unit++) {
      const unitY = 0.6 + unit * 0.75;
      // Each unit has 8 LEDs in a row
      for (let led = 0; led < 8; led++) {
        const x = -rackW / 2 + 0.15 + led * 0.12;
        const colorIdx = led < 3 ? 0 : led < 5 ? 3 : led < 7 ? 4 : 5;
        arr.push({
          x,
          y: unitY + 0.22,
          z: rackD / 2 + 0.005,
          speed: 1.5 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2,
          color: ledColors[colorIdx],
        });
      }
    }
    return arr;
  }, [rackW, rackD]);

  // Dummy for instanced mesh transforms
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial positions of LED instances
  useMemo(() => {
    if (!ledsRef.current) return;
    leds.forEach((led, i) => {
      dummy.position.set(led.x, led.y, led.z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      ledsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    ledsRef.current.instanceMatrix.needsUpdate = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leds]);

  // Blink animation
  useFrame(({ clock }) => {
    if (!ledsRef.current) return;
    const t = clock.getElapsedTime();
    const tempColor = new THREE.Color();

    leds.forEach((led, i) => {
      // Different blink patterns per LED
      const blink = Math.sin(t * led.speed + led.phase);
      const on = blink > -0.3; // mostly on, occasional off

      // Activity LEDs (amber) flicker rapidly
      const isActivity = led.color.r > 0.8 && led.color.g > 0.5 && led.color.b < 0.1;
      const activityOn = isActivity ? Math.sin(t * 12 + led.phase) > 0 : true;

      const finalOn = on && activityOn;

      tempColor.copy(led.color);
      if (!finalOn) {
        tempColor.multiplyScalar(0.1);
      }
      ledsRef.current!.setColorAt(i, tempColor);
    });
    if (ledsRef.current.instanceColor) {
      ledsRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
      {/* ── Main cabinet frame ── */}
      <RoundedBox args={[rackW, rackH, rackD]} radius={0.03}
        position={[0, rackH / 2, 0]} castShadow>
        <meshStandardMaterial color="#1a1a20" roughness={0.7} metalness={0.5} />
      </RoundedBox>

      {/* ── Front panel (slightly inset, darker) ── */}
      <mesh position={[0, rackH / 2, rackD / 2 - 0.01]}>
        <planeGeometry args={[rackW - 0.06, rackH - 0.1]} />
        <meshStandardMaterial color="#111116" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* ── Server units (6 units, each with face plate + vents) ── */}
      {Array.from({ length: 6 }).map((_, unit) => {
        const unitY = 0.6 + unit * 0.75;
        const unitH = 0.6;
        return (
          <group key={`unit-${unit}`}>
            {/* Unit face plate */}
            <RoundedBox args={[rackW - 0.1, unitH, 0.04]} radius={0.01}
              position={[0, unitY, rackD / 2 - 0.005]} castShadow>
              <meshStandardMaterial
                color={unit % 2 === 0 ? '#252530' : '#202028'}
                roughness={0.75}
                metalness={0.4}
              />
            </RoundedBox>

            {/* Ventilation grille (horizontal slats) */}
            {Array.from({ length: 4 }).map((_, si) => (
              <mesh key={`vent-${unit}-${si}`}
                position={[0.25, unitY - 0.15 + si * 0.1, rackD / 2 + 0.002]}>
                <planeGeometry args={[0.35, 0.02]} />
                <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
              </mesh>
            ))}

            {/* Drive bay indicators (small rectangles) */}
            {Array.from({ length: 3 }).map((_, di) => (
              <mesh key={`drive-${unit}-${di}`}
                position={[-0.35 + di * 0.12, unitY - 0.1, rackD / 2 + 0.003]}>
                <planeGeometry args={[0.08, 0.12]} />
                <meshStandardMaterial color="#15151a" roughness={0.8} metalness={0.3} />
              </mesh>
            ))}

            {/* Handle/grip */}
            <mesh position={[rackW / 2 - 0.12, unitY, rackD / 2 + 0.015]}>
              <boxGeometry args={[0.04, 0.2, 0.02]} />
              <meshStandardMaterial color="#444450" roughness={0.5} metalness={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* ── LED instances (all blink independently) ── */}
      <instancedMesh ref={ledsRef} args={[undefined, undefined, leds.length]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial
          emissive="#00ff88"
          emissiveIntensity={3}
          toneMapped={false}
          roughness={0.3}
        />
      </instancedMesh>

      {/* ── Top ventilation panel ── */}
      <mesh position={[0, rackH - 0.02, 0]}>
        <boxGeometry args={[rackW - 0.06, 0.03, rackD - 0.1]} />
        <meshStandardMaterial color="#252530" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* Top vent slats */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`topvent-${i}`} position={[0, rackH - 0.01, -rackD / 4 + i * (rackD / 5)]}>
          <boxGeometry args={[rackW - 0.15, 0.005, 0.04]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
        </mesh>
      ))}

      {/* ── Side cable management (visible cables) ── */}
      {[-1, 1].map((side) => (
        <group key={`cables-${side}`} position={[side * (rackW / 2 + 0.04), 0, 0]}>
          {Array.from({ length: 4 }).map((_, ci) => {
            const cableColors = ['#2255aa', '#cc3333', '#22aa55', '#aaaa22'];
            return (
              <mesh key={`cable-${ci}`}
                position={[0, rackH * 0.3 + ci * 0.06, 0]}>
                <cylinderGeometry args={[0.015, 0.015, rackH * 0.6, 4]} />
                <meshStandardMaterial color={cableColors[ci]} roughness={0.9} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* ── Rack feet / leveling pads ── */}
      {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([sx, sz], i) => (
        <mesh key={`foot-${i}`}
          position={[sx * (rackW / 2 - 0.08), 0.03, sz * (rackD / 2 - 0.08)]}>
          <cylinderGeometry args={[0.06, 0.08, 0.06, 8]} />
          <meshStandardMaterial color="#333340" roughness={0.6} metalness={0.5} />
        </mesh>
      ))}

      {/* ── Subtle green ambient glow from the LEDs ── */}
      <pointLight
        position={[0, rackH * 0.4, rackD / 2 + 0.5]}
        color="#00ff88"
        intensity={0.3}
        distance={5}
        decay={2}
      />
    </group>
  );
}
