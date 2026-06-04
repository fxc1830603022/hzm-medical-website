"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/site-types";
import { Reveal } from "./Reveal";

type GalleryProps = {
  items: GalleryItem[];
};

export function Gallery({ items }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sortedItems = useMemo(() => [...items].sort((a, b) => a.sortOrder - b.sortOrder), [items]);
  const activeItem = activeIndex === null ? null : sortedItems[activeIndex];

  function move(step: number) {
    if (activeIndex === null || !sortedItems.length) return;
    setActiveIndex((activeIndex + step + sortedItems.length) % sortedItems.length);
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedItems.map((item, index) => (
          <Reveal key={`${item.image}-${index}`} delay={(index % 4) * 0.05}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-md bg-mist text-left shadow-soft"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 text-sm font-semibold text-white">
                {item.title}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-[70] bg-ink/90 p-4 backdrop-blur-sm" onClick={() => setActiveIndex(null)}>
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              move(-1);
            }}
            className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              move(1);
            }}
            className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight size={28} />
          </button>
          <div className="flex h-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[86vh] w-full max-w-5xl">
              <Image src={activeItem.image} alt={activeItem.alt} fill sizes="100vw" className="object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
