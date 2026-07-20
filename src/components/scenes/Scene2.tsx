"use client";

import { motion, Variants } from "framer-motion";
import SceneWrapper from "./SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene2() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2
      }
    }
  };

  const bottomContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 3.6
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", bounce: 0.5 } }
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", bounce: 0.5 } }
  };

  const popIn: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, type: "spring", bounce: 0.6 } }
  };

  const cardColors = [
    "bg-blue-50/90 border-blue-200 hover:shadow-blue-200",
    "bg-amber-50/90 border-amber-200 hover:shadow-amber-200",
    "bg-purple-50/90 border-purple-200 hover:shadow-purple-200"
  ];

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center">

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-black text-brand-blue uppercase tracking-wide text-center mb-6 drop-shadow-sm heading-stroke"
        >
          {ideathonData.scene2.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4 md:mb-6 w-48 md:w-72 h-auto drop-shadow-xl"
        >
          <img src="/media/Slide_2.gif" alt="Mountain Animation" className="w-full h-full object-contain mix-blend-multiply" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-5xl px-4"
        >
          {/* First 3 lines as clean glass cards */}
          {ideathonData.scene2.lines.slice(0, 3).map((line, i) => {
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className={`p-4 md:p-5 rounded-3xl shadow-sm border-2 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300 w-full ${cardColors[i]}`}
              >
                <p className="text-sm md:text-base font-bold text-gray-800 leading-snug">
                  {line}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* The final dramatic lines */}
        <motion.div
          variants={bottomContainer}
          initial="hidden"
          animate="show"
          className="mt-6 md:mt-8 flex flex-col items-center text-center gap-4 px-4"
        >
          <motion.p variants={item} className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900 tracking-wide uppercase drop-shadow-sm">
            {ideathonData.scene2.lines[3]}
          </motion.p>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full justify-center mt-1 pb-4">
            <motion.div
              variants={slideLeft}
              className="px-4 py-3 glass-card flex items-center justify-center w-full md:w-auto relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gray-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              <span className="text-sm md:text-base text-gray-600 font-bold relative z-10">{ideathonData.scene2.lines[4]}</span>
            </motion.div>

            <motion.div
              variants={popIn}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center shadow-inner z-10 shrink-0"
            >
              <span className="text-xs md:text-sm font-black text-gray-500">OR</span>
            </motion.div>

            <motion.div
              variants={slideRight}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-brand-blue rounded-xl shadow-lg border-2 border-brand-blue/30 flex items-center justify-center w-full md:w-auto cursor-pointer"
            >
              <span className="text-sm md:text-base font-black text-white tracking-widest uppercase drop-shadow-md">{ideathonData.scene2.lines[5]}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
