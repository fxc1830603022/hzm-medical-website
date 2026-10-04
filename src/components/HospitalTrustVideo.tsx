"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HospitalTrustVideoProps = {
  mp4Src: string;
  webmSrc?: string;
  poster: string;
};

export function HospitalTrustVideo({ mp4Src, webmSrc, poster }: HospitalTrustVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (video?.readyState && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
            video.play().catch(() => undefined);
          }
        } else {
          video?.pause();
        }
      },
      { rootMargin: "280px 0px", threshold: 0.05 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || hasError) return;

    const video = videoRef.current;
    if (!video) return;

    const playWhenReady = () => {
      setIsReady(true);
      if (isVisibleRef.current) {
        video.play().catch(() => undefined);
      }
    };

    video.load();
    video.addEventListener("canplay", playWhenReady);
    return () => video.removeEventListener("canplay", playWhenReady);
  }, [hasError, shouldLoad]);

  return (
    <div
      ref={wrapperRef}
      className="group relative isolate aspect-video overflow-hidden rounded-[24px] border border-[#17393D]/15 bg-[#162B30] shadow-[0_24px_70px_rgba(20,35,35,0.12)]"
    >
      <Image
        src={poster}
        alt="Shanghai Shengya Medical Beauty Hospital in Shanghai"
        fill
        sizes="(min-width: 1024px) 700px, 100vw"
        className="object-cover"
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
          isReady && !hasError ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        poster={poster}
        aria-label="Real clinical environment at Shanghai Shengya Medical Beauty Hospital"
        onError={() => setHasError(true)}
      >
        {shouldLoad && webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        {shouldLoad ? <source src={mp4Src} type="video/mp4" /> : null}
      </video>

    </div>
  );
}
