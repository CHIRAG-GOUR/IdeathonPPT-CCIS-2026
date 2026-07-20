import { motion } from "framer-motion";

export default function SceneWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden ${className}`}
    >
      <div className="min-h-full w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="relative w-full my-auto">
          <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
            <motion.div
              animate={{
                x: ["0%", "40%", "-20%", "0%"],
                y: ["0%", "30%", "-30%", "0%"],
                scale: [1, 1.3, 0.8, 1],
              }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              className="absolute -top-[20%] -left-[10%] w-full max-w-2xl aspect-square bg-pink-400/50 rounded-full blur-[100px] mix-blend-multiply"
              style={{ willChange: "transform" }}
            />
            <motion.div
              animate={{
                x: ["0%", "-35%", "25%", "0%"],
                y: ["0%", "-40%", "20%", "0%"],
                scale: [1, 0.7, 1.4, 1],
              }}
              transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-[20%] -right-[10%] w-full max-w-2xl aspect-square bg-blue-400/50 rounded-full blur-[100px] mix-blend-multiply"
              style={{ willChange: "transform" }}
            />
            <motion.div
              animate={{
                x: ["-20%", "35%", "0%", "-20%"],
                y: ["25%", "0%", "-35%", "25%"],
                scale: [0.8, 1.5, 1, 0.8],
              }}
              transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, delay: 1 }}
              className="absolute top-1/4 left-1/4 w-full max-w-xl aspect-square bg-purple-400/40 rounded-full blur-[100px] mix-blend-multiply"
              style={{ willChange: "transform" }}
            />
          </div>
          
          <div className="relative z-10 w-full bg-transparent rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
