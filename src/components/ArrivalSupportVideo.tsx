"use client";

import { useEffect, useRef, useState } from "react";

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
  const isVisibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
            video.play().catch(() => undefined);
          }
        } else {
          video.pause();
        }
      },
      { rootMargin: "720px 0px", threshold: 0.01 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;

    const playWhenReady = () => {
      if (isVisibleRef.current) {
        video.play().catch(() => undefined);
      }
    };

    video.load();

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      playWhenReady();
      return;
    }

    video.addEventListener("canplay", playWhenReady, { once: true });
    return () => video.removeEventListener("canplay", playWhenReady);
  }, [shouldLoad]);

  return (
    <div
      ref={wrapperRef}
      className="relative isolate overflow-hidden rounded-[26px] bg-[#1f1c17]"
      style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
    >
      <video
        ref={videoRef}
        className="block aspect-[9/16] h-auto w-full object-cover"
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={shouldLoad ? "auto" : "none"}
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
