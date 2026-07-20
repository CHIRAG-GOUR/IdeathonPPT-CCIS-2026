"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import PresentationCanvas from "@/components/PresentationCanvas";
import Preloader from "@/components/Preloader";

import Scene1 from "@/components/scenes/Scene1";
import Scene2 from "@/components/scenes/Scene2";
import Scene3 from "@/components/scenes/Scene3";
import Scene4 from "@/components/scenes/Scene4";
import Scene5 from "@/components/scenes/Scene5";
import Scene6 from "@/components/scenes/Scene6";
import Scene8 from "@/components/scenes/Scene8";
import Scene9 from "@/components/scenes/Scene9";
import { playWhooshSound, playStartupSound } from "@/utils/audio";

// Define the number of steps per scene for arrow navigation
const SCENE_STEPS = [1, 1, 1, 1, 1, 1, 1, 1];
const TOTAL_SCENES = 8;

export default function Presentation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const isScrolling = useRef(false);

  // Play sound when activeScene changes (only if it has started)
  useEffect(() => {
    if (hasStarted) {
      playWhooshSound();
    }
  }, [activeScene, hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    playStartupSound();

    // Optional: Auto enter fullscreen on start for true cinematic experience
    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen().catch(err => console.log(err));
    //   setIsFullscreen(true);
    // }
  };

  const nextAction = useCallback(() => {
    if (activeStep < SCENE_STEPS[activeScene] - 1) {
      setActiveStep((prev) => prev + 1);
    } else if (activeScene < TOTAL_SCENES - 1) {
      setActiveScene((prev) => prev + 1);
      setActiveStep(0);
    }
  }, [activeScene, activeStep]);

  const prevAction = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    } else if (activeScene > 0) {
      setActiveScene((prev) => prev - 1);
      setActiveStep(SCENE_STEPS[activeScene - 1] - 1);
    }
  }, [activeScene, activeStep]);

  const getAutoplayDuration = (sceneIndex: number) => {
    switch (sceneIndex) {
      case 0: return 5000; // Scene 1: Title
      case 1: return 6500; // Scene 2: Text Heavy
      case 2: return 7000; // Scene 3: Pointers
      case 3: return 6000; // Scene 4: Numbers
      case 4: return 6000; // Scene 5: Timeline
      case 5: return 5500; // Scene 6: 3 Levels
      case 6: return 7000; // Scene 8: Deadlines
      case 7: return 5500; // Scene 9: Who Will Take the Spotlight
      default: return 5000;
    }
  };

  // Handle Autoplay
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isAutoplaying) {
      const duration = getAutoplayDuration(activeScene);
      timeout = setTimeout(() => {
        nextAction();
      }, duration);
    }
    return () => clearTimeout(timeout);
  }, [isAutoplaying, activeScene, nextAction]);

  const toggleAutoplay = () => {
    const newPlayState = !isAutoplaying;
    setIsAutoplaying(newPlayState);
    if (newPlayState && !isFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    }
  };

  // Handle Wheel Events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      isScrolling.current = true;
      if (e.deltaY > 50) {
        nextAction();
      } else if (e.deltaY < -50) {
        prevAction();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // Debounce
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextAction, prevAction]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        nextAction();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        prevAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextAction, prevAction]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderScene = () => {
    switch (activeScene) {
      case 0: return <Scene1 key="scene1" />;
      case 1: return <Scene2 key="scene2" />;
      case 2: return <Scene3 key="scene3" />;
      case 3: return <Scene4 key="scene4" />;
      case 4: return <Scene5 key="scene5" />;
      case 5: return <Scene6 key="scene6" />;
      case 6: return <Scene8 key="scene8" />;
      case 7: return <Scene9 key="scene9" />;
      default: return null;
    }
  };

  if (!hasStarted) {
    return (
      <main
        className="relative w-full h-screen bg-bg-dark text-white flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={handleStart}
      >
        <Preloader />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <PresentationCanvas activeScene={0} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="text-2xl md:text-4xl text-brand-blue tracking-[0.4em] uppercase mb-6 opacity-90 animate-pulse font-black drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            INITIALIZE
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em]">
            Click anywhere to begin experience
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-bg-dark text-white font-sans">
      <Preloader />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PresentationCanvas activeScene={activeScene} />
      </div>

      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {renderScene()}
        </AnimatePresence>
      </div>

      <Navigation
        activeScene={activeScene}
        totalScenes={TOTAL_SCENES}
        onNavigate={(idx) => {
          setActiveScene(idx);
          setActiveStep(0);
        }}
        isAutoplaying={isAutoplaying}
        toggleAutoplay={toggleAutoplay}
      />

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 z-50 p-3 bg-white/80 hover:bg-white text-gray-700 hover:text-brand-blue rounded-full transition-colors shadow-sm border border-gray-200"
      >
        <span className="text-xl leading-none">{isFullscreen ? "🗗" : "⛶"}</span>
      </button>

    </main>
  );
}
