"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Deterministic pure random generator based on index to satisfy React purity rules
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function FloatingSculpture({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Lerp group rotation based on subtle mouse movement
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.current.x * 0.45 + state.clock.elapsedTime * 0.08,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.current.y * 0.35,
        0.05
      );
    }

    // Gentle orbital spins
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.15;
      ring1Ref.current.rotation.x += delta * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
      ring2Ref.current.rotation.y += delta * 0.08;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Floating Luxury Torus Knot */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef} scale={1.2}>
          <torusKnotGeometry args={[1, 0.32, 128, 32, 2, 3]} />
          <MeshDistortMaterial
            color="#d4af37"
            roughness={0.15}
            metalness={0.92}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            distort={0.18}
            speed={1.2}
          />
        </mesh>
      </Float>

      {/* Orbiting Thin Metallic Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]} scale={2.4}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#f4de86"
          metalness={0.95}
          roughness={0.1}
          emissive="#aa820a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbiting Thin Metallic Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]} scale={2.9}>
        <torusGeometry args={[1, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
          emissive="#6d28d9"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

function StarParticles({ count = 100 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 16;
      p[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 14;
      p[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#d4af37"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = -(((clientY - top) / height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D event sculpture"
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        {/* Stage Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#fff8e7" />
        <pointLight position={[-4, -3, 3]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[4, -2, -3]} intensity={1.2} color="#d4af37" />
        <spotLight
          position={[0, 7, 3]}
          angle={0.5}
          penumbra={0.9}
          intensity={2.2}
          color="#e6c255"
        />

        {/* 3D Core Elements */}
        <FloatingSculpture mouse={mouse} />
        <StarParticles count={100} />
      </Canvas>
    </div>
  );
}
