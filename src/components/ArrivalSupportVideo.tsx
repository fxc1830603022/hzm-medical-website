"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type ArrivalSupportVideoProps = {
  src: string;
  poster: string;
};

export function ArrivalSupportVideo({ src, poster }: ArrivalSupportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    video.volume = nextMuted ? 0 : 1;
    setMuted(nextMuted);

    if (video.paused) {
      await video.play().catch(() => undefined);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#1f1c17]">
      <video
        ref={videoRef}
        className="aspect-[9/16] h-auto w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Real airport arrival support for international patients traveling to Shanghai"
      />
      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-4 top-4 z-10 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d7bd82]/80 bg-[#f8f0df] px-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1f1c17] shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition hover:bg-white"
        aria-label={muted ? "Turn arrival video sound on" : "Turn arrival video sound off"}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        <span>{muted ? "Sound" : "On"}</span>
      </button>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent px-5 pb-5 pt-20 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d7bd82]">
          Real Patient Journey
        </p>
        <p className="mt-2 text-sm font-semibold leading-5">
          Real arrival support for international patients traveling to Shanghai.
        </p>
      </div>
    </div>
  );
}
