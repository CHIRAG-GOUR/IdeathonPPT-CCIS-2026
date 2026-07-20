import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, VolumeX, Volume2, Pause } from "lucide-react";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

function Counter({ value, suffix, label, delay }: { value: number, suffix: string, label: string, delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="flex flex-col items-center p-4 md:p-6 glass-card rounded-2xl relative overflow-hidden group hover:border-brand-blue/30 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="text-3xl md:text-5xl font-black text-brand-blue mb-2 drop-shadow-sm flex items-end">
        {count}
        <span className="text-xl md:text-3xl text-brand-gold ml-1">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-gray-600 font-bold tracking-wide text-center uppercase leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export default function Scene4() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center pt-2">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-brand-blue tracking-wide uppercase drop-shadow-sm text-center heading-stroke"
        >
          {ideathonData.scene4.title}
        </motion.h2>

        <div className="flex flex-col items-center justify-center w-full max-w-4xl mb-8 px-4">
          {/* Trailer Video (Custom Player) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-black relative group"
            ref={containerRef}
          >
            <video 
              ref={videoRef}
              src="https://firebasestorage.googleapis.com/v0/b/skillizee-products.firebasestorage.app/o/CCIS%20Video.mp4?alt=media&token=b13c59b1-4b26-4070-8bd8-c7d891c19693"
              className="w-full h-full object-cover cursor-pointer"
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
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-10 px-4">
          {ideathonData.scene4.metrics.map((metric, i) => (
            <Counter 
              key={i}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              delay={0.5 + i * 0.2}
            />
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}
