"use client";

import { useEffect, useState } from "react";

const MEDIA_ASSETS = [
  "/media/Clock.gif",
  "/media/tech_kids.png",
  "/media/env_kids.png",
  "/media/edu_kids.png",
  "/media/health_kids.png",
  "/media/community_kids.png",
  "/media/future_kids.png",
  "/media/level_1.png",
  "/media/level_2.png",
  "/media/level_3.png",
  "/media/gif_1.gif",
  "/media/gif_4.gif",
  "/media/gif_5.gif",
  "/media/gif_6.gif"
];

const AUDIO_ASSETS = [
  "/sounds/whoosh.mp3",
  "/sounds/startup.mp3",
  "/sounds/car-sound.mp3",
  "/sounds/ting-sound.mp3",
  "/sounds/winner-sound.mp3"
];

export default function Preloader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Explicitly preload images into memory
    MEDIA_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Explicitly preload audio into memory
    AUDIO_ASSETS.forEach(src => {
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = src;
    });
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {/* Fallback DOM preloading just in case */}
      {MEDIA_ASSETS.map((src, i) => (
        <link key={`img-${i}`} rel="preload" href={src} as="image" />
      ))}
      {AUDIO_ASSETS.map((src, i) => (
        <link key={`audio-${i}`} rel="preload" href={src} as="audio" />
      ))}
    </div>
  );
}
