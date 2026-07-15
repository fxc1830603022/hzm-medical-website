"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";

type ArrivalSupportVideoProps = {
  src: string;
  poster: string;
  label?: string;
  caption?: string;
  ariaLabel?: string;
};

export function ArrivalSupportVideo({
  src,
  poster,
  label = "Real Patient Journey",
  caption = "Real arrival support for international patients traveling to Shanghai.",
  ariaLabel = "Real airport arrival support for international patients traveling to Shanghai"
}: ArrivalSupportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.35 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden rounded-[26px] bg-[#1f1c17]">
      <video
        ref={videoRef}
        className="aspect-[9/16] h-auto w-full object-cover"
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={ariaLabel}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent px-5 pb-5 pt-20 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d7bd82]">
          {label}
        </p>
        <p className="mt-2 text-sm font-semibold leading-5">
          {caption}
        </p>
      </div>
    </div>
  );
}
