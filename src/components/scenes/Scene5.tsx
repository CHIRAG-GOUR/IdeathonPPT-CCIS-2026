"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Trophy, Flag, RotateCcw } from "lucide-react";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene5() {
  const timeline = ideathonData.scene5.timeline;
  const controls = useAnimation();
  const [currentNode, setCurrentNode] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);

  const nodes = [
    { x: 300, y: 300, cardX: 100, cardY: -10 },
    { x: 800, y: 300, cardX: 600, cardY: -10 },
    { x: 1300, y: 300, cardX: 1100, cardY: -10 },
    { x: 1300, y: 700, cardX: 1100, cardY: 390 },
    { x: 800, y: 700, cardX: 600, cardY: 390 },
    { x: 300, y: 700, cardX: 100, cardY: 390 },
    { x: 300, y: 1100, cardX: 100, cardY: 790 },
    { x: 800, y: 1100, cardX: 600, cardY: 790 },
    { x: 1300, y: 1100, cardX: 1100, cardY: 790 }
  ];

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tingAudioRef = useRef<HTMLAudioElement | null>(null);
  const winnerAudioRef = useRef<HTMLAudioElement | null>(null);
  const loopCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // const audio = new Audio("/sounds/car-sound.mp3");
    // audio.volume = 0.6;
    // audioRef.current = audio;

    const ting = new Audio("/sounds/ting-sound.mp3");
    ting.volume = 0.8;
    tingAudioRef.current = ting;

    const winner = new Audio("/sounds/winner-sound.mp3");
    winner.volume = 0.9;
    winnerAudioRef.current = winner;
    // const handleEnded = () => {
    //   if (loopCountRef.current < 2) {
    //     loopCountRef.current++;
    //     audio.currentTime = 0;
    //     audio.play().catch(() => { });

    //     if (loopCountRef.current === 2) {
    //       timeoutRef.current = setTimeout(() => {
    //         audio.pause();
    //       }, 2000);
    //     }
    //   }
    // };

    // audio.addEventListener('ended', handleEnded);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // audio.removeEventListener('ended', handleEnded);
      // audio.pause();
      audioRef.current = null;
      tingAudioRef.current = null;
      winnerAudioRef.current = null;
    };
  }, []);

  const playEngineSound = () => {
    if (audioRef.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      loopCountRef.current = 0;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }
  };

  const playTingSound = () => {
    if (tingAudioRef.current) {
      tingAudioRef.current.currentTime = 0;
      tingAudioRef.current.play().catch(() => { });
    }
  };

  const playWinnerSound = () => {
    if (winnerAudioRef.current) {
      winnerAudioRef.current.currentTime = 0;
      winnerAudioRef.current.play().catch(() => { });
    }
  };

  const stopEngineSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // SVG path geometry:
  // Row 1: M 100,300 -> L 1400,300 (y=300, left to right)
  // Turn 1: Arc center (1400,500), r=200, from (1400,300) to (1400,700) clockwise
  // Row 2: L 200,700 (y=700, right to left)
  // Turn 2: Arc center (200,900), r=200, from (200,700) to (200,1100) counter-clockwise
  // Row 3: L 1350,1100 (y=1100, left to right)

  const buildTurn1Path = () => {
    const cx = 1400, cy = 500, r = 200;
    const steps = 20;
    const arcDist = Math.PI * r;
    const totalDist = 100 + arcDist + 100;

    const xs = [1300, 1400], ys = [300, 300], rs = [0, 0], ts = [0, 100 / totalDist];

    for (let i = 1; i <= steps; i++) {
      const frac = i / steps;
      const angle = -Math.PI / 2 + Math.PI * frac; // -90° to +90°
      xs.push(cx + r * Math.cos(angle));
      ys.push(cy + r * Math.sin(angle));
      rs.push(frac * 180); // 0° to 180°
      ts.push((100 + frac * arcDist) / totalDist);
    }

    xs.push(1300); ys.push(700); rs.push(180); ts.push(1);
    const easings = Array(xs.length - 1).fill("linear");
    return { x: xs, y: ys, rotate: rs, times: ts, easings };
  };

  const buildTurn2Path = () => {
    const cx = 200, cy = 900, r = 200;
    const steps = 20;
    const arcDist = Math.PI * r;
    const totalDist = 100 + arcDist + 100;

    const xs = [300, 200], ys = [700, 700], rs = [180, 180], ts = [0, 100 / totalDist];

    for (let i = 1; i <= steps; i++) {
      const frac = i / steps;
      const angle = -Math.PI / 2 - Math.PI * frac; // -90° to -270°
      xs.push(cx + r * Math.cos(angle));
      ys.push(cy + r * Math.sin(angle));
      rs.push(180 - frac * 180); // 180° to 0°
      ts.push((100 + frac * arcDist) / totalDist);
    }

    xs.push(300); ys.push(1100); rs.push(0); ts.push(1);
    const easings = Array(xs.length - 1).fill("linear");
    return { x: xs, y: ys, rotate: rs, times: ts, easings };
  };

  const activeNodes = [0, 2, 5, 8]; // The nodes where we have data

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const startAnimation = useCallback(async () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setIsPlaying(true);
    setCurrentNode(-1);
    playEngineSound();

    const safeStart = async (args: any) => {
      if (isMountedRef.current) {
        try { await controls.start(args); } catch (e) { /* ignore */ }
      }
    };

    if (isMountedRef.current) controls.set({ x: 100, y: 300, rotate: 0 });
    await delay(800);

    if (!isMountedRef.current) return;
    await safeStart({ x: 300, y: 300, rotate: 0, transition: { duration: 1, ease: "linear" } });
    if (!isMountedRef.current) return;
    setCurrentNode(0); playTingSound(); await delay(1000);

    if (!isMountedRef.current) return;
    await safeStart({ x: 1300, y: 300, rotate: 0, transition: { duration: 2.5, ease: "linear" } });
    if (!isMountedRef.current) return;
    setCurrentNode(2); playTingSound(); await delay(1000);

    if (!isMountedRef.current) return;
    const t1 = buildTurn1Path();
    await safeStart({
      x: t1.x, y: t1.y, rotate: t1.rotate,
      transition: { duration: 2.2, times: t1.times, ease: t1.easings }
    });
    if (!isMountedRef.current) return;
    await safeStart({ x: 300, y: 700, rotate: 180, transition: { duration: 2.5, ease: "linear" } });
    if (!isMountedRef.current) return;
    setCurrentNode(5); playTingSound(); await delay(1000);

    if (!isMountedRef.current) return;
    const t2 = buildTurn2Path();
    await safeStart({
      x: t2.x, y: t2.y, rotate: t2.rotate,
      transition: { duration: 2.2, times: t2.times, ease: t2.easings }
    });
    if (!isMountedRef.current) return;
    await safeStart({ x: 1300, y: 1100, rotate: 0, transition: { duration: 2.5, ease: "linear" } });
    if (!isMountedRef.current) return;
    setCurrentNode(8); playWinnerSound();

    stopEngineSound();
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, [controls]);

  // Autoplay on mount
  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      // Slight delay to ensure motion component has bound to controls
      setTimeout(() => {
        if (isMountedRef.current) {
          controls.set({ x: 100, y: 300, rotate: 0 });
          startAnimation();
        }
      }, 50);
    }
  }, [startAnimation, controls]);

  const cardStyles = [
    "bg-red-600 text-white border-white skew-x-[-3deg]",
    "bg-yellow-400 text-black border-black skew-x-[3deg]",
    "bg-blue-600 text-white border-white skew-x-[-3deg]",
    "bg-green-500 text-white border-white skew-x-[3deg]",
    "bg-purple-600 text-white border-white skew-x-[-3deg]",
    "bg-orange-500 text-white border-white skew-x-[3deg]",
    "bg-pink-500 text-white border-white skew-x-[-3deg]",
    "bg-teal-500 text-black border-black skew-x-[3deg]",
    "bg-gray-900 text-white border-yellow-400 skew-x-0"
  ];

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center relative min-h-0">

        {/* Header */}
        <div className="w-full pt-2 md:pt-4 z-40 relative mb-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl lg:text-4xl font-black text-brand-blue tracking-widest uppercase text-center drop-shadow-sm flex items-center justify-center gap-4 heading-stroke"
          >
            {ideathonData.scene5.title}
            <button
              onClick={startAnimation}
              disabled={isPlaying}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50 text-xs md:text-sm shadow-md"
              title="Replay Race"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </motion.h2>
        </div>

        {/* Unified Scalable SVG Area */}
        <div className="flex-1 w-full flex items-center justify-center p-2 md:p-6 min-h-0">
          <svg viewBox="0 -100 1600 1350" className="w-full h-full max-h-[82vh] drop-shadow-2xl overflow-visible">

            {/* Asphalt Base */}
            <path d="M 100 300 L 1400 300 A 200 200 0 0 1 1400 700 L 200 700 A 200 200 0 0 0 200 1100 L 1350 1100"
              fill="none" stroke="#1f2937" strokeWidth="60" strokeLinecap="round" />

            {/* Road Borders */}
            <path d="M 100 300 L 1400 300 A 200 200 0 0 1 1400 700 L 200 700 A 200 200 0 0 0 200 1100 L 1350 1100"
              fill="none" stroke="#374151" strokeWidth="68" strokeLinecap="round" className="opacity-50" />

            {/* Center Dashed Line */}
            <path d="M 100 300 L 1400 300 A 200 200 0 0 1 1400 700 L 200 700 A 200 200 0 0 0 200 1100 L 1350 1100"
              fill="none" stroke="#fcd34d" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />

            {/* Finish Line Checkerboard at Node 8 */}
            <pattern id="checker" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#000" />
              <rect x="10" width="10" height="10" fill="#fff" />
              <rect y="10" width="10" height="10" fill="#fff" />
              <rect x="10" y="10" width="10" height="10" fill="#000" />
            </pattern>
            <rect x="1300" y="1070" width="50" height="60" fill="url(#checker)" />

            {/* Event Nodes & Cards */}
            {nodes.map((n, i) => {
              if (!activeNodes.includes(i)) return null;
              
              return (
              <g key={`node-${i}`}>
                {/* Node Marker */}
                <motion.circle
                  cx={n.x} cy={n.y} r={16}
                  animate={{
                    fill: currentNode >= i ? "#FFF" : "#E5E7EB",
                    stroke: currentNode >= i ? "#FCD34D" : "#9CA3AF"
                  }}
                  strokeWidth={6}
                  className="transition-colors duration-300"
                />

                {/* Event Reveal Card wrapped in foreignObject */}
                <foreignObject x={n.x - 240} y={n.y - 360} width="480" height="400" style={{ overflow: 'visible' }}>
                  <div className="w-full h-full p-2 flex items-center justify-center">
                    <AnimatePresence>
                      {currentNode >= i && timeline[i].event !== "" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", bounce: 0.4 }}
                          className={`w-[400px] p-6 rounded-3xl flex flex-col items-center text-center border-4 shadow-2xl transition-all ${cardStyles[i]}`}
                        >
                          <div className={i % 2 === 0 && i !== 8 ? "skew-x-[3deg]" : (i === 8 ? "" : "skew-x-[-3deg]")}>
                            <div className="flex items-center justify-center gap-3 mb-3">
                              <span className="flex items-center justify-center">{i === 8 ? <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-md" /> : <Flag className="w-10 h-10 text-white drop-shadow-md" />}</span>
                              {timeline[i].level && (
                                <span className="font-black text-lg uppercase bg-black/20 px-5 py-2 rounded-full">{timeline[i].level}</span>
                              )}
                            </div>
                            <h4 className="font-black text-3xl uppercase mb-2 drop-shadow-md">{timeline[i].date}</h4>
                            <h3 className="font-bold text-2xl leading-tight mb-4 drop-shadow-md">{timeline[i].event}</h3>
                            {timeline[i].desc && (
                              <>
                                <div className="w-full h-2 bg-white/30 mb-4 rounded-full" />
                                <p className="text-lg leading-snug drop-shadow-sm px-2 font-medium">{timeline[i].desc}</p>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </foreignObject>
              </g>
            )})}

            {/* Top-Down Racing Car SVG Group */}
            <motion.g animate={controls} initial={{ x: 100, y: 300, rotate: 0 }}>
              <g transform="translate(-40, -20)">
                {/* Smoke Puffs */}
                <motion.circle cx="0" cy="10" r="6" fill="#cbd5e1"
                  animate={{ x: [-10, -40], y: [10, 0], opacity: [0.8, 0], scale: [1, 3] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeOut" }} />
                <motion.circle cx="0" cy="30" r="6" fill="#cbd5e1"
                  animate={{ x: [-10, -40], y: [30, 40], opacity: [0.8, 0], scale: [1, 3] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2, ease: "easeOut" }} />
                <motion.circle cx="-5" cy="20" r="8" fill="#94a3b8"
                  animate={{ x: [-15, -50], opacity: [0.9, 0], scale: [1, 4] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: 0.1, ease: "easeOut" }} />

                {/* NOS Flames */}
                <motion.path
                  d="M 10 15 L -10 10 L 0 20 L -10 30 Z"
                  fill="#06b6d4"
                  animate={{ scaleX: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                />
                <motion.path
                  d="M 5 18 L -15 15 L -2 20 L -15 25 Z"
                  fill="#3b82f6"
                  animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                />

                {/* Tires */}
                <rect x="15" y="0" width="16" height="8" rx="2" fill="#111" />
                <rect x="15" y="32" width="16" height="8" rx="2" fill="#111" />
                <rect x="55" y="0" width="16" height="8" rx="2" fill="#111" />
                <rect x="55" y="32" width="16" height="8" rx="2" fill="#111" />

                {/* Front Wing & Nose */}
                <path d="M 65 10 L 75 14 L 75 26 L 65 30 Z" fill="#222" />
                <path d="M 40 14 L 70 17 L 70 23 L 40 26 Z" fill="#dc2626" />

                {/* Main Chassis */}
                <path d="M 10 12 C 30 8, 50 10, 60 20 C 50 30, 30 32, 10 28 Z" fill="#ef4444" />

                {/* Yellow Accents (Racing stripes) */}
                <path d="M 15 18 L 55 19 L 55 21 L 15 22 Z" fill="#facc15" />

                {/* Cockpit */}
                <ellipse cx="40" cy="20" rx="8" ry="5" fill="#000" />

                {/* Driver Helmet */}
                <circle cx="42" cy="20" r="3" fill="#fff" />

                {/* Rear Wing */}
                <rect x="5" y="6" width="8" height="28" rx="1" fill="#222" />
                <rect x="2" y="10" width="6" height="20" fill="#ef4444" />
              </g>
            </motion.g>

          </svg>
        </div>
      </div>
    </SceneWrapper>
  );
}
