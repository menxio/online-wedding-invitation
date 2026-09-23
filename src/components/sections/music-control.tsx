"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSpotifyEmbedUrl } from "@/lib/spotify";

export function MusicControl({ music }: { music: WeddingConfig["music"] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const spotifyEmbedUrl = music?.spotifyUrl ? getSpotifyEmbedUrl(music.spotifyUrl) : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !music?.src) return;

    audio.volume = 0.28;

    const startMusic = () => {
      void audio.play().catch(() => setIsPlaying(false));
    };

    window.addEventListener("wedding:open-invitation", startMusic);
    return () => window.removeEventListener("wedding:open-invitation", startMusic);
  }, [music?.src]);

  if (!music || (!music.src && !spotifyEmbedUrl)) return null;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      {spotifyEmbedUrl ? (
        <section id="music" aria-labelledby="music-title" className="bg-background py-[var(--wedding-spacing-section)]">
          <Container className="max-w-4xl">
            <SectionHeading
              id="music-title"
              eyebrow="Our song"
              title={music.title}
              description={`${music.artist} — ${music.requestedVersion}`}
              align="center"
              titleStyle="script"
            />
            <iframe
              src={spotifyEmbedUrl}
              title={`${music.title} by ${music.artist} on Spotify`}
              width="100%"
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="mt-10 border-0"
            />
            <p className="mt-4 text-center font-sans text-xs leading-6 text-muted">
              Press play in Spotify to listen while you explore the invitation.
            </p>
          </Container>
        </section>
      ) : null}

      {music.src ? (
        <div className="fixed right-4 bottom-4 z-50">
          <audio
            ref={audioRef}
            src={music.src}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
            loop
          />
          <button
            type="button"
            onClick={togglePlayback}
            className="flex min-h-12 items-center gap-3 border border-[#d7b66e]/50 bg-[#260a13]/95 px-4 font-sans text-xs text-white shadow-xl backdrop-blur"
            aria-label={isPlaying ? `Pause ${music.title} by ${music.artist}` : `Play ${music.title} by ${music.artist}`}
          >
            <span aria-hidden="true" className="text-[#d7b66e]">{isPlaying ? "Pause" : "Play"}</span>
            <span>Our song</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
