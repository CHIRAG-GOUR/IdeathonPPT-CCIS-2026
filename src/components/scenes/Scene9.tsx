"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene9() {
  return (
    <SceneWrapper className="flex items-center justify-center relative overflow-hidden">
      
      {/* Spotlights Pointing towards center */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Left Spotlight */}
        <motion.div 
          initial={{ opacity: 0, rotate: -45, scaleY: 0 }}
          animate={{ opacity: 0.3, rotate: -25, scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-[10%] left-[10%] w-[40%] h-[120%] origin-top-left"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)', filter: 'blur(40px)' }}
        />
        {/* Right Spotlight */}
        <motion.div 
          initial={{ opacity: 0, rotate: 45, scaleY: 0 }}
          animate={{ opacity: 0.3, rotate: 25, scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute -top-[10%] right-[10%] w-[40%] h-[120%] origin-top-right"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)', filter: 'blur(40px)' }}
        />
      </div>

      {/* Premium Background Effects matching other slides */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="mb-12 md:mb-20 flex items-center justify-center gap-3 md:gap-5"
        >
          <h2 className="text-3xl md:text-5xl font-black text-[#FFD700] uppercase tracking-[0.1em] drop-shadow-lg heading-stroke">
            {ideathonData.scene9.title}
          </h2>
        </motion.div>

        {/* Quote / Lines */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 w-full max-w-7xl mx-auto z-10 relative mt-8">
          {ideathonData.scene9.lines.map((line, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
                className="flex flex-col items-center justify-between p-6 md:p-8 lg:p-10 bg-white/20 backdrop-blur-xl rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.15)] border max-w-[360px] lg:max-w-[420px] w-full h-[450px] lg:h-[580px]"
                style={{ borderColor: i === 2 ? 'rgba(255,215,0,0.8)' : 'rgba(255,255,255,0.4)' }}
              >
                {/* Text */}
                <h3 className={`text-2xl lg:text-3xl font-black tracking-tight leading-tight text-center mb-6 h-24 lg:h-32 flex items-center justify-center ${
                  i === 2 
                    ? 'text-brand-blue drop-shadow-md uppercase scale-105' 
                    : 'text-gray-900 drop-shadow-lg'
                }`}>
                  {line}
                </h3>

                {/* Line Image */}
                <div 
                  className="w-56 h-56 lg:w-80 lg:h-80 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 border-4 mt-auto"
                  style={{ borderColor: i === 2 ? '#FFD700' : 'rgba(255,255,255,0.8)' }}
                >
                  <img src={`/media/scene9_line${i+1}.png`} alt="Illustration" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Arrow */}
              {i < ideathonData.scene9.lines.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.2, duration: 0.3 }}
                  className="flex items-center justify-center text-gray-400/80 flex-shrink-0 rotate-90 lg:rotate-0 my-2 lg:my-0"
                >
                  <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}
