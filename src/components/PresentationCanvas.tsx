"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function NetworkGrid() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  
  const particleCount = 150;
  const maxDistance = 15;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20;
      
      velocities.push(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      );
    }
    
    return { positions, velocities };
  }, []);

  const particlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Bounce off walls
      if (Math.abs(positions[i * 3]) > 40) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 25) velocities[i * 3 + 1] *= -1;
      if (positions[i * 3 + 2] > 0 || positions[i * 3 + 2] < -40) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update lines
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx*dx + dy*dy + dz*dz;
        
        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    
    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <group>
      <points ref={pointsRef} geometry={particlesGeometry}>
        <pointsMaterial size={0.3} color="#1E3A8A" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

export default function PresentationCanvas({ activeScene }: { activeScene: number }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#F8FAFC]">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "low-power" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <ambientLight intensity={1} />
        <NetworkGrid />
      </Canvas>
      <div className="absolute inset-0 backdrop-blur-md bg-white/20 pointer-events-none z-10" />
    </div>
  );
}
