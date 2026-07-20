"use client";

import { motion } from "framer-motion";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

const flyDirections = [
  { x: -300, y: -200 }, // THINK
  { x: 200, y: -300 },  // CREATE
  { x: 0, y: 300 },     // BUILD
  { x: -250, y: 200 },  // PITCH
  { x: 300, y: 150 }    // WIN
];

export default function Scene1() {
  return (
    <SceneWrapper>
      <div className="relative flex flex-col items-center justify-center w-full h-full gap-6 overflow-hidden">
        
        {/* Animated Storyset-style GIF */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-48 md:w-72 h-auto mb-0 drop-shadow-xl"
        >
          <img src="/media/Slide_1.gif" alt="Ideathon Animation" className="w-full h-full object-contain mix-blend-multiply" />
        </motion.div>

        {/* Title animates in later */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 drop-shadow-sm mt-4 heading-stroke"
        >
          {ideathonData.scene1.title}
        </motion.h1>

        {/* Subtitle animates in */}
        <motion.h2 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
          className="text-xl md:text-3xl font-bold text-gray-600 text-center max-w-4xl leading-tight -mt-2"
        >
          {ideathonData.scene1.subtitle}
        </motion.h2>

        {/* Words flying in smoothly */}
        <div className="flex gap-4 md:gap-8 mt-6 mb-4">
          {ideathonData.scene1.words.map((word, i) => {
            const dir = flyDirections[i % flyDirections.length];
            return (
              <div key={word} className="relative inline-block">
                {/* Smoke Trails */}
                {[...Array(3)].map((_, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.5, filter: "blur(15px)" }}
                    animate={{ opacity: [0, 0.3 - j * 0.1, 0], x: 0, y: 0, scale: 1.2, filter: "blur(4px)" }}
                    transition={{ delay: 2.5 + i * 0.4 + j * 0.1, duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 text-xl md:text-3xl font-black text-gray-400 tracking-widest pointer-events-none"
                  >
                    {word}
                  </motion.span>
                ))}
                
                {/* Main Word */}
                <motion.span
                  initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.5, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 2.5 + i * 0.4, duration: 1.2, type: "spring", bounce: 0.2 }}
                  className="relative text-xl md:text-3xl font-black text-brand-blue tracking-widest drop-shadow-sm inline-block"
                >
                  {word}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* Tagline animates in last */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 5.5, duration: 1, ease: "easeOut" }}
          className="mt-6 px-8 py-4 rounded-full border border-brand-blue/30 glass-card shadow-sm text-brand-blue tracking-widest text-sm uppercase text-center font-bold"
        >
          {ideathonData.scene1.tagline}
        </motion.div>
          
      </div>
    </SceneWrapper>
  );
}
