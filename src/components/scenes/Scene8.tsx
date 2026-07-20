"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene8() {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const targetDate = new Date("2026-08-05T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
        };
      }
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
        {/* Pulsing Urgency Background */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-200/30 via-transparent to-transparent pointer-events-none"
        />

        <div className="flex flex-col items-center gap-2 mb-8 mt-4 text-center z-10">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            src="/media/Watch.gif"
            alt="Clock"
            className="w-16 md:w-24 h-auto object-contain mix-blend-multiply drop-shadow-none"
          />
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 tracking-widest uppercase drop-shadow-sm heading-stroke"
          >
            {ideathonData.scene8.title}
          </motion.h2>
        </div>

        {/* Small Digital Timer */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex gap-2 md:gap-4 mb-10 z-10"
        >
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-red-600 px-3 py-2 md:px-5 md:py-3 rounded-xl text-2xl md:text-4xl font-mono font-black text-white shadow-md border border-red-500">
                {item.value}
              </div>
              <div className="text-red-700 font-bold tracking-wider mt-2 text-[10px] md:text-xs">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline Layout with Red Line */}
        <div className="relative w-full max-w-4xl mb-12 z-10 flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-4 px-4">
          
          {/* Connecting Red Line */}
          <div className="absolute left-8 md:left-0 md:top-1/2 w-1 md:w-full h-full md:h-1 bg-red-600 rounded-full md:-translate-y-1/2 z-[-1]" />

          {ideathonData.scene8.deadlines.map((deadline, i) => (
            <motion.div 
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
              className="relative flex flex-col items-center flex-1 ml-12 md:ml-0 group"
            >
              {/* Dot on the line removed */}
              
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 hover:-translate-y-2 transition-all shadow-xl flex flex-col items-center text-center w-full h-full min-h-[160px] justify-center relative overflow-hidden group/card">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-orange-500/5 pointer-events-none" />
                <div className="text-red-600 mb-2 shrink-0 animate-bounce">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-xl md:text-3xl font-black text-red-700 mb-2 leading-tight drop-shadow-sm">{deadline.date}</div>
                <div className="text-sm md:text-lg text-red-900 font-black uppercase tracking-widest leading-snug bg-yellow-300 px-4 py-2 rounded-lg shadow-sm group-hover/card:bg-yellow-400 transition-colors">
                  {deadline.event}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notes Highlighted in Contrast */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl z-10 max-w-xl w-full text-center mt-2"
        >
          <ul className="text-gray-800 font-bold text-sm md:text-lg flex flex-col gap-4 text-left mx-auto w-fit">
            {ideathonData.scene8.notes.map((note, i) => (
              <li key={i} className="flex items-center justify-start gap-3">
                <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0" /> {note}
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
