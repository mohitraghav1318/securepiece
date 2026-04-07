import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// The "Guiding Companion" is a 3D crystal that reacts to the scroll position
// It starts at the top (hero section) and gradually scrolls down,
// anchoring to the bottom right of the screen as the user reads.
function CompanionObject() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    // Rotate the object constantly for a dynamic feel
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

    // Movement logic:
    // Start at center-ish (Y: 1, X: 0)
    // Move to bottom-right as the page scrolls (Y: -2, X: 2)
    const targetX = THREE.MathUtils.lerp(0, 2.5, scrollProgress);
    const targetY = THREE.MathUtils.lerp(1, -2.5, scrollProgress);
    const targetScale = THREE.MathUtils.lerp(1.2, 0.6, scrollProgress);

    // Smoothly interpolate position and scale for buttery movement
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.05,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.05,
    );

    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05),
    );
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        {/* A sexy glass-like material that reflects the environment */}
        <MeshDistortMaterial
          color="#e2e8f0"
          envMapIntensity={1}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.2}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

export default function GuidingScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[10, 10, 5]} intensity={0.9} />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.35}
          color="#ffffff"
        />

        <CompanionObject />

        {/* Soft studio lighting environment for the glass material to reflect */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
