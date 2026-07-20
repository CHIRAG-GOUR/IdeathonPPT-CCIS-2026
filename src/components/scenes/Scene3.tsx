"use client";

import { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Handshake, Rocket, Check, Play, VolumeX, Volume2, Pause } from "lucide-react";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene3() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const SKIP_START = 34;
  const SKIP_END = 64;
  const SKIP_AMOUNT = SKIP_END - SKIP_START;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      } else if (val === 0 && !isMuted) {
        setIsMuted(true);
        videoRef.current.muted = true;
      }
    }
  };

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime >= SKIP_START && videoRef.current.currentTime < SKIP_END) {
        videoRef.current.currentTime = SKIP_END;
      }
      
      let vTime = videoRef.current.currentTime;
      if (vTime >= SKIP_END) {
        vTime -= SKIP_AMOUNT;
      }
      
      setCurrentTime(vTime);
      setDuration(Math.max(0, (videoRef.current.duration || 0) - SKIP_AMOUNT));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      let realTime = val;
      if (val >= SKIP_START) {
        realTime += SKIP_AMOUNT;
      }
      videoRef.current.currentTime = realTime;
      setCurrentTime(val);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemSlideUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
  };

  const itemSlideRight: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
  };

  const imageVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95, x: 30 },
    show: { opacity: 1, scale: 1, x: 0, transition: { duration: 1, delay: 0.5, ease: "easeOut" } }
  };

  const checkmarkVariant: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4, type: "spring", bounce: 0.6 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 p-4 md:p-8 overflow-hidden max-w-[1400px] mx-auto">
        
        {/* Left Side: Text Content */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 w-full flex flex-col justify-center max-w-2xl"
        >
          {/* Header */}
          <motion.div variants={itemSlideUp} className="mb-8">
            <h2 className="text-3xl md:text-5xl font-black text-brand-blue uppercase tracking-widest drop-shadow-sm mb-2 heading-stroke">
              {ideathonData.scene3.title}
            </h2>
          </motion.div>

          {/* Mission */}
          <motion.div variants={itemSlideUp} className="mb-6">
            <div className="flex flex-col gap-5">
              {ideathonData.scene3.missionPoints.map((point, i) => {
                const icons = [
                  <Lightbulb key={1} className="w-6 h-6 md:w-8 md:h-8" />,
                  <Handshake key={2} className="w-6 h-6 md:w-8 md:h-8" />,
                  <Rocket key={3} className="w-6 h-6 md:w-8 md:h-8" />
                ];
                return (
                  <motion.div 
                    key={i} 
                    variants={itemSlideRight} 
                    className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <motion.div 
                      variants={checkmarkVariant}
                      className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-2xl md:text-3xl"
                    >
                      {icons[i] || <Check className="w-6 h-6 md:w-8 md:h-8" />}
                    </motion.div>
                    <span className="text-lg md:text-2xl font-bold text-gray-800">
                      {point}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Brand Video */}
        <motion.div 
          variants={imageVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 w-full flex justify-center items-center mt-8 md:mt-0"
        >
          <div 
            ref={containerRef}
            className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-black group"
          >
            <video 
              ref={videoRef}
              src="https://firebasestorage.googleapis.com/v0/b/skillizee-products.firebasestorage.app/o/IdeathonPPTVideo%2FSkillizee%20Orientation.mp4?alt=media&token=05296291-f1b9-493f-9777-8a1e4e9badff" 
              className="w-full h-full object-cover"
              onClick={togglePlay}
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              playsInline
              controlsList="nodownload"
            />
            
            {/* Custom Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
              {/* Seek Bar */}
              <div className="flex items-center gap-3 w-full px-2">
                <span className="text-xs text-white font-mono drop-shadow-md">{formatTime(currentTime)}</span>
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 100} 
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1.5 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
                <span className="text-xs text-white font-mono drop-shadow-md">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-between text-white gap-4 mt-1 px-2">
                {/* Play / Pause Button */}
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blue hover:bg-blue-600 transition-colors shadow-lg flex-shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 ml-1 fill-current" />
                  )}
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-2 flex-1">
                  <button onClick={toggleMute} className="text-xl hover:text-brand-blue transition-colors flex items-center justify-center">
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1.5 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                </div>

                {/* Fullscreen Button */}
                <button 
                  onClick={toggleFullScreen}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Big Center Play Button (shown only when paused) */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-blue/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] backdrop-blur-sm">
                  <Play className="w-8 h-8 md:w-10 md:h-10 ml-2 text-white fill-current" />
                </div>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
