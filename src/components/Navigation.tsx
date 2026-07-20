import { motion } from "framer-motion";

interface NavigationProps {
  activeScene: number;
  totalScenes: number;
  onNavigate: (index: number) => void;
  isAutoplaying: boolean;
  toggleAutoplay: () => void;
}

export default function Navigation({ activeScene, totalScenes, onNavigate, isAutoplaying, toggleAutoplay }: NavigationProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 items-center">
      {Array.from({ length: totalScenes }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className="relative group p-2 outline-none"
          aria-label={`Go to scene ${i + 1}`}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeScene === i ? "bg-brand-blue scale-150" : "bg-gray-300 group-hover:bg-gray-500"
            }`}
          />
          {activeScene === i && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute inset-0 rounded-full border border-brand-blue"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}

      <div className="w-px h-6 bg-gray-300 my-1" />

      <button
        onClick={toggleAutoplay}
        className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-brand-blue shadow-md border border-gray-200 hover:scale-110 transition-transform"
        title={isAutoplaying ? "Pause Autoplay" : "Start Autoplay"}
      >
        <span className="text-xl leading-none">{isAutoplaying ? "⏸" : "▶"}</span>
      </button>
    </div>
  );
}
