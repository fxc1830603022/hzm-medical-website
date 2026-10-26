"use client";

import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type PatientCase = {
  id?: string; image: string; alt: string; title?: string; concern: string;
  beforeLabel?: string; afterLabel?: string; photoContext?: string;
};

export function FacebookResultsGallery({ title, results, whatsappUrl }: {
  title: string; results: PatientCase[]; whatsappUrl: string;
}) {
  const count = results.length;
  const [position, setPosition] = useState(count);
  const [step, setStep] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [expandedCase, setExpandedCase] = useState<PatientCase | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gestureRef = useRef<{ x: number; y: number } | null>(null);
  const draggedRef = useRef(false);
  const activeIndex = count ? ((position - count) % count + count) % count : 0;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.firstElementChild;
      if (first) setStep(first.getBoundingClientRect().width + Number.parseFloat(getComputedStyle(track).columnGap));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const finishMove = useCallback(() => {
    setAnimate(false);
    setPosition((current) => current >= count * 2 ? current - count : current < count ? current + count : current);
    setIsMoving(false);
  }, [count]);

  useEffect(() => {
    if (!isMoving) return;
    const timeout = window.setTimeout(finishMove, 450);
    return () => window.clearTimeout(timeout);
  }, [isMoving, finishMove]);

  useEffect(() => {
    if (!expandedCase) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, [expandedCase]);

  if (!count) return null;
  const move = (direction: number) => {
    if (isMoving || count < 2) return;
    setAnimate(true); setIsMoving(true); setPosition((current) => current + direction);
  };
  const slides = [...results, ...results, ...results];

  return (
    <section id="real-results" aria-labelledby="facebook-results-heading" className="overflow-hidden border-b border-[#E5D8C4] bg-[#FBF8F1] py-14 lg:py-24">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A67B36]">Real patient stories</p>
            <h2 id="facebook-results-heading" className="mt-3 font-display text-[36px] font-semibold leading-[1.08] text-[#201D19] sm:text-5xl lg:text-[58px]">{title}</h2>
            <p className="mt-4 max-w-[680px] text-sm leading-7 text-[#70685E] sm:text-base">Explore individual before-and-after cases, with a closer look at facial contour and natural expression.</p>
          </div>
          <TrackedWhatsAppLink href={whatsappUrl} placement="middle" label="Results section WhatsApp" className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-3 rounded-md border border-[#C8A664] px-5 py-3 text-sm font-semibold text-[#30291F] transition-colors hover:bg-white">
            Ask About Results<ArrowRight className="h-4 w-4 text-[#A67B36]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </header>

        <div className="-mr-4 mt-10 overflow-hidden sm:mr-0" role="region" aria-roledescription="carousel" aria-label="Patient before and after cases" style={{ touchAction: "pan-y" }}
          onPointerDown={(event) => { gestureRef.current = { x: event.clientX, y: event.clientY }; draggedRef.current = false; }}
          onPointerMove={(event) => { if (gestureRef.current && Math.abs(event.clientX - gestureRef.current.x) > 15) draggedRef.current = true; }}
          onPointerCancel={() => { gestureRef.current = null; }}
          onPointerUp={(event) => {
            const start = gestureRef.current; gestureRef.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(event.clientY - start.y)) move(dx < 0 ? 1 : -1);
          }}>
          <div ref={trackRef} data-case-track className={`flex items-stretch gap-4 sm:gap-5 lg:gap-6 ${animate ? "transition-transform duration-300 ease-out motion-reduce:duration-0" : ""}`}
            style={{ transform: `translateX(${-position * step}px)` }} onTransitionEnd={(event) => { if (event.target === event.currentTarget) finishMove(); }}>
            {slides.map((item, index) => {
              const original = index >= count && index < count * 2;
              const number = String(index % count + 1).padStart(2, "0");
              return (
                <article key={`${index}-${item.id || item.image}`} aria-hidden={!original || undefined} data-case-number={number}
                  className="w-[86vw] max-w-[420px] shrink-0 overflow-hidden rounded-md border border-[#DDCBA9] bg-[#FFFEFB] sm:w-[68vw] lg:w-[calc((100%_-_48px)/3)] lg:max-w-none">
                  <button type="button" tabIndex={original && index === position ? 0 : -1} aria-label={`Enlarge case ${Number(number)} original photograph`}
                    onClick={(event) => { if (!draggedRef.current || event.detail === 0) setExpandedCase(item); }}
                    className="group relative block aspect-square w-full overflow-hidden bg-[#EDE7DD] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#176249]" data-case-comparison>
                    <Image src={item.image} alt={item.alt} fill draggable={false} sizes="(min-width: 1280px) 430px, (min-width: 1024px) 31vw, 86vw" className="pointer-events-none select-none object-cover object-[center_38%]" />
                    <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#5E4D32] shadow-sm"><Expand className="h-3.5 w-3.5" aria-hidden="true" /></span>
                  </button>
                  <div className="grid grid-cols-2 border-y border-[#E8DFD2] bg-[#F6F1E8] text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#756244]">
                    <span className="border-r border-[#E0D5C4] py-2.5">{item.beforeLabel || "Before"}</span><span className="bg-[#EDF1EB] py-2.5 text-[#31553E]">{item.afterLabel || "After"}</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A67B36]">Case {number}</p>
                    <h3 className="mt-2 font-display text-[23px] font-semibold leading-tight text-[#211D19]">{item.title}</h3>
                    <p className="mt-3 text-[13px] leading-6 text-[#746A5F]">{item.concern}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4 border-b border-[#E5D8C4] pb-6">
          <p className="text-[11px] text-[#897962]">Swipe to explore <span className="px-2 text-[#BEAB8C]">/</span><span data-case-counter aria-live="polite" aria-atomic="true" className="tabular-nums">{String(activeIndex + 1).padStart(2, "0")} of {String(count).padStart(2, "0")}</span></p>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous patient cases" disabled={isMoving || count < 2} onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CDB98F] text-[#806335] transition-colors hover:bg-white disabled:opacity-50"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></button>
            <button type="button" aria-label="Next patient cases" disabled={isMoving || count < 2} onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#194E39] text-white transition-colors hover:bg-[#123D2C] disabled:opacity-50"><ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        </div>
        <p className="mt-5 text-center text-[11px] leading-6 text-[#8A8073]">Individual results vary. Lighting, expression and camera angle differ between photographs. Tap a photo to view the complete original.</p>
      </div>
      <dialog ref={dialogRef} aria-labelledby="facebook-case-dialog-heading" onCancel={() => setExpandedCase(null)} onClose={() => setExpandedCase(null)} onClick={(event) => { if (event.target === event.currentTarget) setExpandedCase(null); }} className="fixed inset-0 m-auto max-h-[95svh] w-[calc(100%-24px)] max-w-[850px] overflow-y-auto rounded-md border border-[#D8CCB7] bg-[#FBF9F5] p-0 shadow-2xl backdrop:bg-[#10251D]/85 backdrop:backdrop-blur-sm">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#E1D8C9] bg-[#FBF9F5] px-4 py-3 sm:px-6">
          <h3 id="facebook-case-dialog-heading" className="text-[13px] font-semibold text-[#302B25]">{expandedCase?.title} · Original photograph</h3>
          <button type="button" autoFocus onClick={() => setExpandedCase(null)} aria-label="Close full photograph" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8CCB7] text-[#42392C]"><X className="h-5 w-5" aria-hidden="true" /></button>
        </div>
        {expandedCase ? <><div className="relative mx-auto aspect-[3/4] max-h-[76svh] w-full"><Image src={expandedCase.image} alt={expandedCase.alt} fill sizes="(min-width: 850px) 850px, 100vw" className="object-contain" /></div><p className="px-5 py-3 text-center text-[11px] leading-5 text-[#7E7365]">{expandedCase.photoContext} Individual results vary.</p></> : null}
      </dialog>
    </section>
  );
}
