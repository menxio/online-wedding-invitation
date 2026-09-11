"use client";

import { useRef, useState } from "react";
import type { WeddingConfig } from "@/config";

export function MusicControl({ music }: { music: WeddingConfig["music"] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!music?.src) return null;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div id="music" className="fixed right-4 bottom-4 z-50">
      <audio ref={audioRef} src={music.src} onEnded={() => setIsPlaying(false)} preload="none" />
      <button type="button" onClick={togglePlayback} className="flex min-h-12 items-center gap-3 border border-[#d7b66e]/50 bg-[#260a13]/95 px-4 font-sans text-xs text-white shadow-xl backdrop-blur" aria-label={isPlaying ? `Pause ${music.title} by ${music.artist}` : `Play ${music.title} by ${music.artist}`}>
        <span aria-hidden="true" className="text-[#d7b66e]">{isPlaying ? "Ⅱ" : "▶"}</span>
        <span>{isPlaying ? "Pause" : "Our song"}</span>
      </button>
    </div>
  );
}
