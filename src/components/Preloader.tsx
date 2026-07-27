"use client";

import { useEffect, useState } from "react";

const MEDIA_ASSETS = [
  "./media/Clock.gif",
  "./media/tech_kids.png",
  "./media/env_kids.png",
  "./media/edu_kids.png",
  "./media/health_kids.png",
  "./media/community_kids.png",
  "./media/future_kids.png",
  "./media/level_1.png",
  "./media/level_2.png",
  "./media/level_3.png",
  "./media/level_1_new.png",
  "./media/level_2_new.png",
  "./media/level_3_new.png",
  "./media/gif_1.gif",
  "./media/gif_4.gif",
  "./media/gif_5.gif",
  "./media/gif_6.gif",
  "./media/Slide_1.gif",
  "./media/Slide_2.gif",
  "./media/Watch.gif",
  "./media/scene9_line1.png",
  "./media/scene9_line2.png",
  "./media/scene9_line3.png",
  "./media/scene9_line4.png",
  "./media/scene9_line5.png",
  "./media/scene9_line6.png"
];

const VIDEO_ASSETS = [
  "./media/Ideathon_hands.mov",
  "https://firebasestorage.googleapis.com/v0/b/skillizee-products.firebasestorage.app/o/CCIS%20Video.mp4?alt=media&token=b13c59b1-4b26-4070-8bd8-c7d891c19693",
  "https://firebasestorage.googleapis.com/v0/b/skillizee-products.firebasestorage.app/o/IdeathonPPTVideo%2FSkillizee%20Orientation.mp4?alt=media&token=05296291-f1b9-493f-9777-8a1e4e9badff"
];

const AUDIO_ASSETS = [
  "/sounds/whoosh.mp3",
  "/sounds/startup.mp3",
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
      {/* Fallback DOM preloading */}
      {MEDIA_ASSETS.map((src, i) => (
        <link key={`img-${i}`} rel="preload" href={src} as="image" />
      ))}
      {AUDIO_ASSETS.map((src, i) => (
        <link key={`audio-${i}`} rel="preload" href={src} as="audio" />
      ))}
      
      {/* Eagerly load videos in background so they are ready */}
      {VIDEO_ASSETS.map((src, i) => (
        <video key={`vid-${i}`} src={src} preload="auto" muted playsInline />
      ))}
    </div>
  );
}
