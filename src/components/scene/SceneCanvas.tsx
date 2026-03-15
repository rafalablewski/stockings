'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OfficeRoom from './OfficeRoom';
import Desk3D from './Desk3D';
import Avatar3D from './Avatar3D';
import { DESK_POS } from './activities';
import { ROOM_W, ROOM_D } from './constants';
import type { AvatarState } from './Scene';

interface SceneCanvasProps {
  avatars: AvatarState[];
  workingState: Record<string, boolean>;
}

export default function SceneCanvas({ avatars, workingState }: SceneCanvasProps) {
  const cx = ROOM_W / 2;
  const cz = ROOM_D / 2;

  return (
    <Canvas
      shadows
      camera={{
        position: [cx + 12, 14, cz - 16],
        fov: 45,
        near: 0.5,
        far: 200,
      }}
      style={{ width: '100%', height: '100%', background: '#06060a' }}
      gl={{ antialias: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.25} color="#b8c0ff" />
      <directionalLight
        position={[cx + 10, 20, cz - 8]}
        intensity={0.6}
        color="#e8e0ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* Subtle fill from below/side */}
      <pointLight position={[cx, 1, cz]} intensity={0.15} color="#22d3ee" distance={30} />

      <OrbitControls
        target={[cx, 1.5, cz]}
        enablePan={false}
        minDistance={8}
        maxDistance={40}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.2}
        enableDamping
        dampingFactor={0.08}
      />

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
