'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Billboard, RoundedBox } from '@react-three/drei';
import { type ActivityType, ACTIVITIES } from './activities';

interface Avatar3DProps {
  wx: number;
  wy: number;
  color: string;
  badge: string;
  label: string;
  activity: ActivityType;
  isWorking: boolean;
  isWalking: boolean;
}

const LERP_SPEED = 0.08;

/** LEGO-style 3D avatar with activity poses, props, walking animation, and name label. */
export default function Avatar3D({ wx, wy, color, badge, label, activity, isWorking, isWalking }: Avatar3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const actDef = ACTIVITIES[activity];
  const seated = actDef.seated;
  const hidden = activity === 'bathroom';
  const threeColor = new THREE.Color(color);

  // Body metrics
  const headSize = 0.45;
  const bodyW = 0.5, bodyH = 0.6, bodyD = 0.3;
  const armW = 0.14, armH = 0.5, armD = 0.14;
  const legW = 0.18, legH = seated ? 0.25 : 0.4, legD = 0.18;

  const bodyY = seated ? 0.7 : 0.4 + legH;
  const headY = bodyY + bodyH / 2 + headSize / 2 + 0.02;

  // Target arm rotations (degrees → radians)
  const targetLeftArm = (actDef.leftArm * Math.PI) / 180;
  const targetRightArm = (actDef.rightArm * Math.PI) / 180;

  // World X → Three.js X, World Y → Three.js Z
  const targetX = wx;
  const targetZ = wy;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const pos = groupRef.current.position;
    pos.x = THREE.MathUtils.lerp(pos.x, targetX, LERP_SPEED);
    pos.z = THREE.MathUtils.lerp(pos.z, targetZ, LERP_SPEED);

    // Arm rotation (smooth)
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x, targetLeftArm, 0.06
      );
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x, targetRightArm, 0.06
      );
    }

    // Walking leg swing
    const t = clock.getElapsedTime();
    const swing = isWalking ? Math.sin(t * 8) * 0.4 : 0;
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, swing, 0.15);
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, -swing, 0.15);
    }

    // Working pulse
    if (pulseRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.3;
      pulseRef.current.scale.setScalar(scale);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[targetX, 0, targetZ]}
      visible={!hidden}
    >
      {/* Floor shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.3, 16]} />
        <meshBasicMaterial color="#000" transparent opacity={0.35} />
      </mesh>

      {/* Head */}
      <RoundedBox args={[headSize, headSize, headSize]} radius={0.08} position={[0, headY, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.7} />
      </RoundedBox>
      {/* Eyes */}
      <mesh position={[-0.08, headY, -headSize / 2 - 0.001]}>
        <circleGeometry args={[0.04, 8]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[0.08, headY, -headSize / 2 - 0.001]}>
        <circleGeometry args={[0.04, 8]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, headY - 0.1, -headSize / 2 - 0.001]}>
        <planeGeometry args={[0.12, 0.02]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.5} />
      </mesh>

      {/* Body */}
      <RoundedBox args={[bodyW, bodyH, bodyD]} radius={0.06} position={[0, bodyY, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.7} transparent opacity={0.9} />
      </RoundedBox>
      {/* Badge text */}
      <Billboard position={[0, bodyY, -bodyD / 2 - 0.01]} follow={false} lockX lockY>
        <Text fontSize={0.12} color="#0a0a0a" font="/fonts/SpaceMono-Bold.ttf"
          anchorX="center" anchorY="middle">
          {badge}
        </Text>
      </Billboard>

      {/* Left arm (pivot at shoulder) */}
      <group ref={leftArmRef} position={[-bodyW / 2 - armW / 2 - 0.02, bodyY + bodyH / 2 - 0.05, 0]}>
        <RoundedBox args={[armW, armH, armD]} radius={0.04} position={[0, -armH / 2, 0]} castShadow>
          <meshStandardMaterial color={color} roughness={0.7} transparent opacity={0.75} />
        </RoundedBox>
      </group>
      {/* Right arm (pivot at shoulder) */}
      <group ref={rightArmRef} position={[bodyW / 2 + armW / 2 + 0.02, bodyY + bodyH / 2 - 0.05, 0]}>
        <RoundedBox args={[armW, armH, armD]} radius={0.04} position={[0, -armH / 2, 0]} castShadow>
          <meshStandardMaterial color={color} roughness={0.7} transparent opacity={0.75} />
        </RoundedBox>
      </group>

      {/* Left leg (pivot at hip) */}
      <group ref={leftLegRef} position={[-0.1, bodyY - bodyH / 2, 0]}>
        <RoundedBox args={[legW, legH, legD]} radius={0.04} position={[0, -legH / 2, 0]} castShadow>
          <meshStandardMaterial color={color} roughness={0.7} transparent opacity={0.6} />
        </RoundedBox>
      </group>
      {/* Right leg (pivot at hip) */}
      <group ref={rightLegRef} position={[0.1, bodyY - bodyH / 2, 0]}>
        <RoundedBox args={[legW, legH, legD]} radius={0.04} position={[0, -legH / 2, 0]} castShadow>
          <meshStandardMaterial color={color} roughness={0.7} transparent opacity={0.6} />
        </RoundedBox>
      </group>

      {/* ── Props ── */}
      {actDef.prop === 'coffee-cup' && (
        <group position={[-0.45, bodyY + 0.1, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.15, 8]} />
            <meshStandardMaterial color="#8B6914" roughness={0.8} />
          </mesh>
        </group>
      )}
      {actDef.prop === 'book' && (
        <group position={[0, bodyY + 0.35, -0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.35, 0.25, 0.04]} />
            <meshStandardMaterial color="#6366f1" roughness={0.8} />
          </mesh>
        </group>
      )}
      {actDef.prop === 'controller' && (
        <group position={[0, bodyY - 0.1, -0.25]}>
          <RoundedBox args={[0.3, 0.08, 0.15]} radius={0.03} castShadow>
            <meshStandardMaterial color="#333" roughness={0.8} />
          </RoundedBox>
          <mesh position={[-0.07, 0.04, -0.02]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
          <mesh position={[0.07, 0.04, -0.02]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        </group>
      )}
      {actDef.prop === 'phone' && (
        <group position={[0.35, bodyY + 0.5, 0]}>
          <RoundedBox args={[0.08, 0.14, 0.02]} radius={0.01} castShadow>
            <meshStandardMaterial color="#444" roughness={0.7} />
          </RoundedBox>
        </group>
      )}

      {/* Chat bubble */}
      {actDef.bubble && (
        <Billboard position={[0, headY + 0.5, 0]}>
          <RoundedBox args={[0.6, 0.25, 0.01]} radius={0.08}>
            <meshBasicMaterial color="#fff" transparent opacity={0.08} />
          </RoundedBox>
          {[-0.1, 0, 0.1].map((dx, i) => (
            <mesh key={i} position={[dx, 0, 0.01]}>
              <circleGeometry args={[0.03, 8]} />
              <meshBasicMaterial color="#fff" transparent opacity={0.3} />
            </mesh>
          ))}
        </Billboard>
      )}

      {/* Name label (always faces camera) */}
      <Billboard position={[0, -0.15, 0]}>
        <Text fontSize={0.18} color="rgba(255,255,255,0.6)"
          anchorX="center" anchorY="top">
          {label}
        </Text>
      </Billboard>

      {/* Working status pulse */}
      {isWorking && (
        <mesh ref={pulseRef} position={[0, headY + 0.35, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={threeColor} transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}
