"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type VideoWithSoundControlProps = {
  src: string;
  poster: string;
  type: string;
  ariaLabel: string;
  className?: string;
};

export function VideoWithSoundControl({
  src,
  poster,
  type,
  ariaLabel,
  className
}: VideoWithSoundControlProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    video.volume = nextMuted ? 0 : 0.82;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        aria-label={ariaLabel}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        poster={poster}
        className={className}
      >
        <source src={src} type={type} />
      </video>
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Play video with sound" : "Mute video"}
        className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E8D3A4] bg-[linear-gradient(135deg,#F2D58E,#C8953F)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-ink shadow-[0_14px_34px_rgba(18,16,13,0.24)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze sm:bottom-5 sm:right-5"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{isMuted ? "Sound" : "On"}</span>
      </button>
    </div>
  );
}
