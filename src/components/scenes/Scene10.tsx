"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import { LettersPullUp, WordReveal, LetterBounce } from "../AnimatedTexts";

export default function Scene10() {
  const [phase, setPhase] = useState<"lines" | "finale">("lines");
  const [currentLine, setCurrentLine] = useState(0);

  const lines = ideathonData.scene10.lines;

  const lineImages = [
    null, // A year from now...
    "/images/scene10/watching_audience.png",
    "/images/scene10/winning_trophy.png",
    "/images/scene10/talking_ideas.png",
    "/images/scene10/building_ideas.png",
    "/images/scene10/stay_audience.png",
    "/images/scene10/stand_stage.png",
    "/images/scene10/choice_yours.png"
  ];

  useEffect(() => {
    if (phase === "lines") {
      if (currentLine < lines.length) {
        // Line 0 stays for 1.5s, last line stays for 5.5s, others stay for 3.5s
        const duration = currentLine === 0 ? 1500 : (currentLine === lines.length - 1 ? 5500 : 3500);
        const timer = setTimeout(() => setCurrentLine(currentLine + 1), duration);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase("finale"), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, currentLine, lines.length]);

  return (
    <SceneWrapper className="bg-gray-50/50">
      <div className="relative w-full max-w-[1000px] mx-auto">
        {/* Glowing border effect removed */}
        
        <div className="w-full p-[3rem_2rem] md:p-[5rem_4rem] text-center relative overflow-visible z-10">
          <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[500px]">

          <AnimatePresence mode="wait">
            {phase === "lines" && (
              <motion.div
                key="lines"
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 1.5 }}
                className="flex flex-col items-center justify-center gap-6 text-center w-full"
              >
                <h2 className="text-2xl md:text-4xl font-black mb-8 text-gray-900 tracking-widest uppercase">
                  {ideathonData.scene10.title}
                </h2>

                <div className="relative w-full h-[450px] mt-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {currentLine > 0 && currentLine <= lines.length && (
                      <motion.div
                        key={currentLine}
                        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                      >
                        {lineImages[currentLine - 1] && (
                          <motion.img 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            src={lineImages[currentLine - 1] || undefined} 
                            alt="Illustration" 
                            className="w-48 h-48 md:w-[300px] md:h-[300px] object-cover rounded-3xl shadow-2xl border-4 border-white/50"
                          />
                        )}
                        <LettersPullUp 
                          text={lines[currentLine - 1]} 
                          className={`font-black uppercase tracking-tight ${(currentLine - 1) % 2 !== 0 ? 'text-brand-blue drop-shadow-sm' : 'text-gray-700'}`} 
                          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', lineHeight: 1.2, justifyContent: 'center' }} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            )}

            {phase === "finale" && <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center relative z-10 w-full"
            >
              {/* Spotlight */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0.3, height: "200vh" }}
                transition={{ duration: 2 }}
                className="absolute top-[-100vh] left-1/2 -translate-x-1/2 w-96 bg-gradient-to-b from-brand-blue/30 via-brand-green/10 to-transparent blur-[50px] pointer-events-none -z-10"
                style={{ clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0% 100%)" }}
              />

              <WordReveal 
                text={ideathonData.scene10.finale.title} 
                className="font-black text-gray-900 tracking-tighter drop-shadow-sm uppercase" 
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.1 }} 
              />
              
              <LetterBounce 
                text={ideathonData.scene10.finale.subtitle} 
                className="font-bold text-brand-blue mt-4 mb-8 text-center uppercase tracking-widest" 
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)' }} 
              />

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 240, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-brand-blue rounded-full text-white font-black text-xl md:text-2xl tracking-widest uppercase transition-all duration-300 relative overflow-hidden group shadow-md"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{ideathonData.scene10.buttonText}</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12 w-64 md:w-96 rounded-2xl overflow-hidden"
              >
                <video 
                  src="/media/Ideathon_hands.mov"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover"
                />
              </motion.div>

            </motion.div>}
          </AnimatePresence>

        </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
