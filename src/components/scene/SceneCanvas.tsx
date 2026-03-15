'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import OfficeRoom from './OfficeRoom';
import Desk3D from './Desk3D';
import Avatar3D from './Avatar3D';
import { DESK_POS } from './activities';
import { ROOM_W, ROOM_D } from './constants';
import type { AvatarState } from './Scene';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface SceneCanvasProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export interface SceneCanvasHandle {
  zoomIn: () => void;
  zoomOut: () => void;
}

const MIN_DISTANCE = 15;
const MAX_DISTANCE = 120;
const ZOOM_STEP = 8;

/** Inner component that has access to useThree / useFrame */
function ZoomController({ controlsRef, targetDistanceRef }: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  targetDistanceRef: React.RefObject<number | null>;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const controls = controlsRef.current;
    const target = targetDistanceRef.current;
    if (!controls || target === null) return;

    // Get current distance from camera to target
    const currentDist = camera.position.distanceTo(
      controls.target as THREE.Vector3
    );

    // Lerp toward target distance
    const diff = target - currentDist;
    if (Math.abs(diff) < 0.05) {
      targetDistanceRef.current = null;
      return;
    }

    const step = diff * 0.12;
    // Move camera along its direction toward/away from target
    const dir = new THREE.Vector3()
      .subVectors(camera.position, controls.target as THREE.Vector3)
      .normalize();
    camera.position.addScaledVector(dir, step);
  });

  return null;
}

const SceneCanvas = forwardRef<SceneCanvasHandle, SceneCanvasProps>(
  function SceneCanvas({ avatars, workingState }, ref) {
    const cx = ROOM_W / 2;
    const cz = ROOM_D / 2;
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const targetDistanceRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
      zoomIn() {
        const controls = controlsRef.current;
        if (!controls) return;
        const cur = controls.getDistance();
        targetDistanceRef.current = Math.max(MIN_DISTANCE, cur - ZOOM_STEP);
      },
      zoomOut() {
        const controls = controlsRef.current;
        if (!controls) return;
        const cur = controls.getDistance();
        targetDistanceRef.current = Math.min(MAX_DISTANCE, cur + ZOOM_STEP);
      },
    }));

    return (
      <Canvas
        shadows
        camera={{
          position: [cx + 40, 45, cz + 40],
          fov: 40,
          near: 0.5,
          far: 500,
        }}
        style={{ background: '#0a0a12' }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.55} color="#c8d0ff" />
        <directionalLight
          position={[cx + 20, 40, cz - 15]}
          intensity={0.9}
          color="#eee8ff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        {/* Subtle fill from below/side */}
        <pointLight position={[cx, 2, cz]} intensity={0.5} color="#22d3ee" distance={100} />
        {/* Overhead fill to brighten the room */}
        <pointLight position={[cx, 20, cz]} intensity={0.5} color="#e0e0ff" distance={120} />

        <OrbitControls
          ref={controlsRef}
          target={[cx, 1.5, cz]}
          enablePan={false}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
          enableDamping
          dampingFactor={0.08}
        />

        <ZoomController controlsRef={controlsRef} targetDistanceRef={targetDistanceRef} />

        <OfficeRoom />

        {/* Desks */}
        {DESK_POS.map((pos, i) => (
          <Desk3D
            key={i}
            position={[pos.x, 0, pos.y]}
            color={avatars[i]?.color ?? '#888'}
            isActive={workingState[avatars[i]?.id] ?? false}
          />
        ))}

        {/* Avatars */}
        {avatars.map((avatar) => (
          <Avatar3D
            key={avatar.id}
            wx={avatar.wx}
            wy={avatar.wy}
            color={avatar.color}
            badge={avatar.badge}
            label={avatar.label}
            activity={avatar.activity}
            isWorking={avatar.isWorking}
            isWalking={avatar.walkPath.length > 0}
          />
        ))}
      </Canvas>
    );
  }
);

export default SceneCanvas;
