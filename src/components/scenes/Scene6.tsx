"use client";

import { motion } from "framer-motion";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

interface PodiumColumnProps {
  level: any;
  image: string;
  height: string;
  mainColor: string;
  darkColor: string;
  topColor: string;
  textColor: string;
  levelNum: number;
  delay: number;
}

const PodiumColumn = ({ level, image, height, mainColor, darkColor, topColor, textColor, levelNum, delay }: PodiumColumnProps) => {
  return (
    <motion.div 
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: "spring", bounce: 0.3, duration: 0.8 }}
      className="flex flex-col items-center justify-end w-1/3 flex-shrink-0 relative"
    >
      {/* Hovering Image (Square/Rounded) */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delay * 0.5 }}
        className="mb-6 md:mb-10 z-20"
      >
        <div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl md:rounded-3xl border-[4px] md:border-[6px] shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden bg-white/20 backdrop-blur-sm" 
             style={{ borderColor: topColor }}>
          <img src={image} alt={level.name} className="w-full h-full object-cover p-1 md:p-2 rounded-xl md:rounded-3xl" />
        </div>
      </motion.div>

      {/* Podium Block */}
      <div className="w-full relative flex flex-col items-center">
        {/* Top Cap */}
        <div className="h-6 md:h-12 w-[106%] rounded-t-lg shadow-sm z-10" style={{ backgroundColor: topColor }} />
        
        {/* Main Body */}
        <div className={`w-full flex flex-col items-center justify-start p-3 md:p-8 text-center shadow-2xl relative overflow-hidden ${height}`} 
             style={{ 
               background: `linear-gradient(135deg, ${mainColor} 50%, ${darkColor} 50%)`,
               color: textColor 
             }}>
          
          <div className="relative z-10 w-full">
            <div className="font-black text-[9px] md:text-sm uppercase tracking-widest opacity-90 mb-1 drop-shadow-sm">{level.level}</div>
            <h3 className="text-xs md:text-2xl lg:text-3xl font-black leading-tight mb-3 drop-shadow-sm">{level.name}</h3>
            <p className="text-[9px] md:text-sm lg:text-base font-bold opacity-90 hidden md:block drop-shadow-sm leading-snug">{level.desc}</p>
          </div>
          
          {/* Big Background Number */}
          <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-[120px] md:text-[220px] font-black text-white/30 leading-none pointer-events-none select-none">
            {levelNum}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Scene6() {
  const levels = ideathonData.scene6.levels; // [Level 1, Level 2, Level 3]
  const images = ["/media/level_1_new.png", "/media/level_2_new.png", "/media/level_3_new.png"];

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center justify-center min-h-[85vh] pt-4 overflow-visible">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-3xl md:text-5xl lg:text-6xl font-black mb-12 md:mb-20 uppercase tracking-wide text-center drop-shadow-sm flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center heading-stroke"
        >
          <span className="text-brand-blue">3 LEVELS.</span>
          <span className="text-[#ffd700] drop-shadow-[0_2px_10px_rgba(255,215,0,0.4)]">1 CHAMPION.</span>
        </motion.h2>

        {/* Podium Container */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center mt-auto relative">
          
          <div className="flex items-end justify-center w-full px-2 md:px-8 z-10 gap-1 md:gap-2">
            
            {/* LEFT: Level 2 (Silver) - Height Medium */}
            <PodiumColumn 
              level={levels[1]} 
              image={images[1]}
              height="h-[180px] md:h-[280px]" 
              mainColor="#cbd5e1" // slate-300
              darkColor="#94a3b8" // slate-400
              topColor="#f8fafc" // slate-50
              textColor="#0f172a"
              levelNum={2}
              delay={1.5}
            />
            
            {/* CENTER: Level 3 (Gold) - Height Tallest */}
            <PodiumColumn 
              level={levels[2]} 
              image={images[2]}
              height="h-[250px] md:h-[380px]" 
              mainColor="#facc15" // yellow-400
              darkColor="#eab308" // yellow-500
              topColor="#fef08a" // yellow-200
              textColor="#422006"
              levelNum={3}
              delay={2.5}
            />
            
            {/* RIGHT: Level 1 (Bronze) - Height Shortest */}
            <PodiumColumn 
              level={levels[0]} 
              image={images[0]}
              height="h-[120px] md:h-[200px]" 
              mainColor="#d97706" // amber-600
              darkColor="#b45309" // amber-700
              topColor="#fcd34d" // amber-300
              textColor="#ffffff"
              levelNum={1}
              delay={0.5}
            />

          </div>

          {/* Podium Base Floor (Silver) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-[105%] h-8 md:h-12 bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] rounded-sm shadow-2xl z-20 flex items-center justify-center border-t-2 border-white/60"
          >
            <span className="font-black text-gray-800 tracking-[0.3em] uppercase text-xs md:text-xl drop-shadow-sm">
              Ideathon 2026
            </span>
          </motion.div>
        </div>

      </div>
    </SceneWrapper>
  );
}
