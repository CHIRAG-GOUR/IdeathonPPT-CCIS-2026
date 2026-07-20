"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import * as THREE from "three";

/* â”€â”€â”€ MINI TROPHY for winner's hands â”€â”€â”€ */
function MiniTrophy() {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 8; i++) {
    pts.push(new THREE.Vector2(0.04 + Math.sin(i * 0.2) * 0.18, i * 0.06));
  }
  return (
    <group scale={1.2}>
      <mesh><latheGeometry args={[pts, 16]} /><meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, -0.05, 0]}><cylinderGeometry args={[0.04, 0.08, 0.15, 16]} /><meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.12, 0.12, 0.04, 16]} /><meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} /></mesh>
    </group>
  );
}

/* â”€â”€â”€ CERTIFICATE for 2nd/3rd â”€â”€â”€ */
function Certificate3D() {
  return (
    <group>
      <mesh><boxGeometry args={[0.3, 0.4, 0.01]} /><meshStandardMaterial color="#FFF8DC" /></mesh>
      <mesh position={[0, 0, 0.006]}><boxGeometry args={[0.26, 0.36, 0.002]} /><meshStandardMaterial color="#FFFFF0" /></mesh>
      <mesh position={[0, 0.12, 0.008]}><boxGeometry args={[0.18, 0.03, 0.001]} /><meshStandardMaterial color="#1D4ED8" /></mesh>
      <mesh position={[0, -0.05, 0.008]}><boxGeometry args={[0.15, 0.02, 0.001]} /><meshStandardMaterial color="#666" /></mesh>
    </group>
  );
}


/* â”€â”€â”€ SCHOOL KID 3D â”€â”€â”€ */
function SchoolKid({
  position, shirtColor = "#2563EB", scale = 1, isGirl = false,
  hasMedal = false, medalColor = "#C0C0C0", isWinner = false, hasCert = false,
  skinTone = "#D2945F", isWaving = false, isBitingMedal = false
}: {
  position: [number, number, number]; shirtColor?: string; scale?: number;
  isGirl?: boolean; hasMedal?: boolean; medalColor?: string; isWinner?: boolean;
  hasCert?: boolean; skinTone?: string; isWaving?: boolean; isBitingMedal?: boolean;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Winner jumps
    if (isWinner) {
      ref.current.position.y = position[1] + Math.abs(Math.sin(t * 3.5)) * 0.3;
    } else {
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.04;
    }
    // Arms in front
    const la = ref.current.getObjectByName("leftArm");
    const ra = ref.current.getObjectByName("rightArm");
    if (isWinner) {
      if (la) { la.rotation.z = 0; la.rotation.x = -Math.PI + 0.1; } // Straight up
      if (ra) { ra.rotation.z = 0; ra.rotation.x = -Math.PI + 0.1; }
    } else if (isWaving) {
      if (la) { la.rotation.z = 0.1; la.rotation.x = -0.5 + Math.sin(t * 4) * 0.15; }
      if (ra) { ra.rotation.z = Math.sin(t * 8) * 0.4; ra.rotation.x = -Math.PI + 0.3; } // Wave high!
    } else if (isBitingMedal) {
      if (la) { la.rotation.z = 0.1; la.rotation.x = -0.5 + Math.sin(t * 4) * 0.15; }
      if (ra) { ra.rotation.z = -0.7; ra.rotation.x = -2.2; } // Hand to mouth!
    } else {
      if (la) { la.rotation.z = 0.1; la.rotation.x = -0.5 + Math.sin(t * 4) * 0.15; } // Forward and waving slightly
      if (ra) { ra.rotation.z = -0.1; ra.rotation.x = -0.5 - Math.sin(t * 4 + 1) * 0.15; }
    }
  });

  return (
    <group position={position} scale={scale} ref={ref}>
      <group position={[0, -0.38, 0]}>
        {/* HEAD */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color={skinTone} roughness={0.45} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.07, 1.68, 0.17]}><sphereGeometry args={[0.03, 16, 16]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[0.07, 1.68, 0.17]}><sphereGeometry args={[0.03, 16, 16]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[-0.07, 1.68, 0.195]}><sphereGeometry args={[0.015, 16, 16]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[0.07, 1.68, 0.195]}><sphereGeometry args={[0.015, 16, 16]} /><meshStandardMaterial color="#222" /></mesh>
        {/* Nose */}
        <mesh position={[0, 1.63, 0.19]}><sphereGeometry args={[0.025, 12, 12]} /><meshStandardMaterial color={skinTone} roughness={0.5} /></mesh>
        {/* Mouth (smile) */}
        <mesh position={[0, 1.58, 0.17]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.04, 0.008, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#C0392B" />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.2, 1.65, 0]}><sphereGeometry args={[0.04, 12, 12]} /><meshStandardMaterial color={skinTone} roughness={0.45} /></mesh>
        <mesh position={[0.2, 1.65, 0]}><sphereGeometry args={[0.04, 12, 12]} /><meshStandardMaterial color={skinTone} roughness={0.45} /></mesh>
        {/* Hair */}
        {isGirl ? (
          <group>
            <mesh position={[0, 1.72, -0.03]}><sphereGeometry args={[0.22, 32, 32]} /><meshStandardMaterial color="#1a1a2e" /></mesh>
            <mesh position={[-0.18, 1.5, -0.05]}><capsuleGeometry args={[0.04, 0.3, 8, 8]} /><meshStandardMaterial color="#1a1a2e" /></mesh>
            <mesh position={[0.18, 1.5, -0.05]}><capsuleGeometry args={[0.04, 0.3, 8, 8]} /><meshStandardMaterial color="#1a1a2e" /></mesh>
          </group>
        ) : (
          <mesh position={[0, 1.7, -0.02]}><sphereGeometry args={[0.21, 16, 16]} /><meshStandardMaterial color="#1a1a2e" /></mesh>
        )}
        {/* TORSO â€” school shirt */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <capsuleGeometry args={[0.18, 0.55, 16, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.8} />
        </mesh>
        {/* Collar */}
        <mesh position={[0, 1.38, 0.1]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.16, 0.06, 0.06]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Tie */}
        <mesh position={[0, 1.2, 0.19]}>
          <boxGeometry args={[0.05, 0.22, 0.015]} />
          <meshStandardMaterial color="#CC0000" />
        </mesh>
        {/* LEFT ARM */}
        <group name="leftArm" position={[-0.25, 1.35, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow><capsuleGeometry args={[0.06, 0.3, 8, 8]} /><meshStandardMaterial color={shirtColor} roughness={0.8} /></mesh>
          <mesh position={[0, -0.45, 0]}><sphereGeometry args={[0.06, 12, 12]} /><meshStandardMaterial color={skinTone} /></mesh>
          {/* Winner holds trophy straight up (since arm is rotated -Math.PI on X, we rotate trophy Math.PI to fix it) */}
          {isWinner && <group position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}><MiniTrophy /></group>}
          {/* Cert in left hand for runners up */}
          {hasCert && <group position={[0, -0.5, 0.05]} rotation={[0.2, 0, 0.3]}><Certificate3D /></group>}
        </group>
        {/* RIGHT ARM */}
        <group name="rightArm" position={[0.25, 1.35, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow><capsuleGeometry args={[0.06, 0.3, 8, 8]} /><meshStandardMaterial color={shirtColor} roughness={0.8} /></mesh>
          <mesh position={[0, -0.45, 0]}><sphereGeometry args={[0.06, 12, 12]} /><meshStandardMaterial color={skinTone} /></mesh>
        </group>
        {/* LEGS â€” school shorts/skirt */}
        <mesh position={[-0.09, 0.65, 0]} castShadow><capsuleGeometry args={[0.065, 0.35, 8, 8]} /><meshStandardMaterial color="#1E3A5F" roughness={0.9} /></mesh>
        <mesh position={[0.09, 0.65, 0]} castShadow><capsuleGeometry args={[0.065, 0.35, 8, 8]} /><meshStandardMaterial color="#1E3A5F" roughness={0.9} /></mesh>
        {/* Shoes */}
        <mesh position={[-0.09, 0.38, 0.04]}><boxGeometry args={[0.1, 0.06, 0.16]} /><meshStandardMaterial color="#111" roughness={0.95} /></mesh>
        <mesh position={[0.09, 0.38, 0.04]}><boxGeometry args={[0.1, 0.06, 0.16]} /><meshStandardMaterial color="#111" roughness={0.95} /></mesh>
        {/* Medal */}
        {hasMedal && (
          <group position={isBitingMedal ? [0, 1.55, 0.18] : [0, 1.2, 0.2]}>
            <mesh position={[-0.04, 0.06, 0]} rotation={[0, 0, -0.35]}><boxGeometry args={[0.015, 0.15, 0.008]} /><meshStandardMaterial color="#EF4444" /></mesh>
            <mesh position={[0.04, 0.06, 0]} rotation={[0, 0, 0.35]}><boxGeometry args={[0.015, 0.15, 0.008]} /><meshStandardMaterial color="#EF4444" /></mesh>
            <mesh position={[0, -0.05, 0]}><cylinderGeometry args={[0.08, 0.08, 0.015, 32]} /><meshStandardMaterial color={medalColor} metalness={0.95} roughness={0.05} /></mesh>
          </group>
        )}
      </group>
    </group>
  );
}

/* â”€â”€â”€ PODIUM BLOCK â”€â”€â”€ */
function PodiumBlock({
  position, width, height, depth, rank, rewards, textColor,
  rankSize = 0.4, rewardSize = 0.16, lineSpacing = 0.25, topPadding = 0.45
}: {
  position: [number, number, number]; width: number; height: number; depth: number;
  rank: string; rewards: string[]; textColor: string;
  rankSize?: number; rewardSize?: number; lineSpacing?: number; topPadding?: number;
}) {
  return (
    <group position={position}>
      {/* White body */}
      <mesh position={[0, height / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.6} />
      </mesh>
      {/* Red carpet top */}
      <mesh position={[0, height + 0.01, 0]} receiveShadow>
        <boxGeometry args={[width * 0.7, 0.02, depth + 0.02]} />
        <meshStandardMaterial color="#CC0000" roughness={0.85} />
      </mesh>
      {/* Red carpet front face */}
      <mesh position={[0, height / 2, depth / 2 + 0.01]}>
        <boxGeometry args={[width * 0.7, height + 0.01, 0.02]} />
        <meshStandardMaterial color="#CC0000" roughness={0.85} />
      </mesh>
      {/* Premium Rank text using HTML to exactly match Scene 6 font */}
      <Html center transform position={[0, height - topPadding, depth / 2 + 0.01]} style={{ pointerEvents: 'none' }}>
        <div 
          className="font-black drop-shadow-md"
          style={{
            fontSize: `${rankSize * 75}px`,
            color: textColor,
            WebkitTextStroke: `${rankSize * 3}px #222`,
            letterSpacing: '-0.02em'
          }}
        >
          {rank}
        </div>
      </Html>
    </group>
  );
}

/* â”€â”€â”€ CAMERA FLASH LIGHTS â”€â”€â”€ */
function CameraFlashes() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const light = child as THREE.PointLight;
      const t = state.clock.elapsedTime;
      const flash = Math.sin(t * (3 + i * 1.7) + i * 2) > 0.92;
      light.intensity = flash ? 8 : 0;
    });
  });
  return (
    <group ref={ref}>
      <pointLight position={[-5, 3, 4]} color="#FFFFFF" intensity={0} distance={12} />
      <pointLight position={[5, 3, 4]} color="#FFFFFF" intensity={0} distance={12} />
      <pointLight position={[-3, 5, 5]} color="#FFFFCC" intensity={0} distance={12} />
      <pointLight position={[3, 1, 6]} color="#FFFFFF" intensity={0} distance={12} />
    </group>
  );
}

/* â”€â”€â”€ CONFETTI + FIRECRACKERS (HTML overlay) â”€â”€â”€ */
function CelebrationOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  const confettiColors = ['#ef4444', '#3b82f6', '#22c55e', '#facc15', '#a855f7', '#ec4899', '#f97316', '#FFD700', '#14b8a6'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {/* Confetti pieces */}
      {[...Array(150)].map((_, i) => {
        const c = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const startX = 10 + Math.random() * 80;
        const endX = startX + (Math.random() - 0.5) * 40;
        const dur = 3 + Math.random() * 3;
        const w = 4 + Math.random() * 8;
        const h = 4 + Math.random() * 6;
        return (
          <motion.div
            key={`c-${i}`}
            initial={{ left: `${startX}%`, top: '-5%', opacity: 1, rotate: 0 }}
            animate={{ left: `${endX}%`, top: '105%', opacity: [1, 1, 0.8, 0], rotate: Math.random() * 1080 - 540 }}
            transition={{ duration: dur, delay: Math.random() * 2, ease: "linear", repeat: Infinity, repeatDelay: Math.random() * 2 }}
            className="absolute"
            style={{ width: w, height: h, backgroundColor: c, borderRadius: Math.random() > 0.5 ? '50%' : '1px' }}
          />
        );
      })}
      {/* Firecracker sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`f-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, delay: 1 + Math.random() * 4, repeat: Infinity, repeatDelay: 2 + Math.random() * 4 }}
          className="absolute"
          style={{
            left: `${10 + Math.random() * 80}%`, top: `${5 + Math.random() * 60}%`,
            width: 6, height: 6, borderRadius: '50%',
            background: 'radial-gradient(circle, #FFD700, #FF6B00, transparent)',
            boxShadow: '0 0 8px 3px rgba(255,215,0,0.6)',
          }}
        />
      ))}
      {/* Camera flash bursts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`fl-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.15, delay: 2 + i * 0.8 + Math.random() * 3, repeat: Infinity, repeatDelay: 3 + Math.random() * 5 }}
          className="absolute rounded-full"
          style={{
            left: `${5 + Math.random() * 90}%`, top: `${60 + Math.random() * 30}%`,
            width: 20, height: 20,
            background: 'radial-gradient(circle, #fff, transparent)',
            boxShadow: '0 0 30px 15px rgba(255,255,255,0.4)',
          }}
        />
      ))}
    </div>
  );
}

/* ─── MAIN SCENE ─── */
export default function Scene7() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <SceneWrapper>
      <CelebrationOverlay show={showConfetti} />

      <div className="w-full h-full flex flex-col items-center justify-end relative z-10 pb-2">
        {/* Title — pinned to very top of the page */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 left-0 right-0 text-3xl md:text-5xl font-black text-[#D4AF37] uppercase tracking-[0.15em] text-center drop-shadow-md z-30 pointer-events-none heading-stroke"
        >
          {ideathonData.scene7.title}
        </motion.h2>

        {/* 3D Canvas */}
        <div className="w-full flex-1 relative min-h-[450px]">
          <Canvas
            camera={{ position: [0, -1, 13], fov: 40 }}
            style={{ position: "absolute", inset: 0 }}
            shadows
          >
            <ambientLight intensity={0.55} />
            <directionalLight position={[5, 10, 8]} intensity={1.3} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <directionalLight position={[-4, 6, -3]} intensity={0.5} />
            <spotLight position={[0, 8, 3]} angle={0.5} penumbra={0.5} intensity={1.5} color="#FFF8DC" castShadow />
            <Environment preset="city" />
            <CameraFlashes />

            {/* Shift group up slightly to make room for cards */}
            <group position={[0, -3.8, 0]} scale={1.3}>
              {/* Floor red carpet running toward camera */}
              <mesh position={[0, 0, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[9, 10]} />
                <meshStandardMaterial color="#CC0000" roughness={0.9} />
              </mesh>

              {/* 2nd place (left) - Wider podium (2.6) */}
              <PodiumBlock position={[-2.7, 0, 0]} width={2.6} height={2} depth={2} rank="2nd" rewards={[]} textColor="#C0C0C0" />
              <SchoolKid position={[-2.7, 2, 0]} isGirl hasMedal medalColor="#C0C0C0" shirtColor="#047857" hasCert skinTone="#C68642" scale={0.95} isWaving />

              {/* 1st place (centre) - Wider podium (2.8) */}
              <PodiumBlock position={[0, 0, 0]} width={2.8} height={3.5} depth={2} rank="1st" rewards={[]} textColor="#FFD700" />
              <SchoolKid position={[0, 3.5, 0]} shirtColor="#1D4ED8" isWinner hasMedal medalColor="#FFD700" skinTone="#D2945F" />

              {/* 3rd place (right) - Wider podium (2.6) - Compact Text! */}
              <PodiumBlock position={[2.7, 0, 0]} width={2.6} height={1.4} depth={2} rank="3rd" rewards={[]} textColor="#E89B55" rankSize={0.3} topPadding={0.5} />
              <SchoolKid position={[2.7, 1.4, 0]} shirtColor="#B91C1C" hasMedal medalColor="#CD7F32" hasCert skinTone="#E0AC69" scale={0.9} isBitingMedal />

            </group>
          </Canvas>
        </div>

        {/* PREMIUM REWARD CARDS HTML */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 relative z-20 mt-4 mb-8">
          {ideathonData.scene7.text.map((textLine, i) => {
            const premiumStyles = [
              "from-[#FFD700]/20 to-[#FFA500]/10 border-[#FFD700]/50 shadow-[0_8px_30px_rgba(255,215,0,0.15)]",
              "from-brand-blue/20 to-purple-500/10 border-brand-blue/50 shadow-[0_8px_30px_rgba(0,240,255,0.15)]",
              "from-brand-green/20 to-emerald-500/10 border-brand-green/50 shadow-[0_8px_30px_rgba(0,255,102,0.15)]",
              "from-pink-500/20 to-rose-500/10 border-pink-500/50 shadow-[0_8px_30px_rgba(236,72,153,0.15)]"
            ];
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ delay: 0.3 + (i * 0.2), type: "spring", stiffness: 100 }} 
                onAnimationComplete={() => { if (i === 3) setTimeout(() => setShowConfetti(true), 800) }}
                className={`bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 text-center hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}
              >
                {/* Premium Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${premiumStyles[i % premiumStyles.length]} pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-70`} />
                
                {/* Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                <div className="text-base md:text-xl font-black text-gray-800 flex items-center justify-center h-full relative z-10 leading-snug drop-shadow-sm">
                  {textLine}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
}

