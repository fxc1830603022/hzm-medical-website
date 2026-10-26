"use client";

import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { facebookReferenceComparisons } from "@/lib/facebook-reference-comparisons";
import styles from "./FacebookCaseCollection.module.css";

type Comparison = (typeof facebookReferenceComparisons)[number];

// Reference photographs stay separate from Dr. Xiao's patient-case data.
export function FacebookCaseCollection() {
  const comparisons = facebookReferenceComparisons;
  const [windowState, setWindowState] = useState({ index: 0, visible: 1 });
  const [expanded, setExpanded] = useState<Comparison | null>(null);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const draggedRef = useRef(false);
  const maxIndex = Math.max(0, comparisons.length - windowState.visible);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));
    const index = Math.min(comparisons.length - visible, Math.max(0, Math.round(track.scrollLeft / step)));
    setWindowState((current) => current.index === index && current.visible === visible ? current : { index, visible });
  }, [comparisons.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollTo({
      left: Math.max(0, Math.min(index, maxIndex)) * (card.getBoundingClientRect().width + gap),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 3;
    if (direction > 0 && atEnd) goTo(0);
    else if (direction < 0 && track.scrollLeft < 3) goTo(maxIndex);
    else goTo(windowState.index + direction);
  };

  const numbered = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section id="real-results" aria-labelledby="facebook-results-heading" className={styles.section} data-reference-case-preview>
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <span>The before &amp; after collection</span>
          <span className={styles.previewBadge}>Reference gallery</span>
        </p>
        <header className={styles.intro}>
          <h2 id="facebook-results-heading" className={styles.heading}>A closer look<br /><span>at the difference.</span></h2>
          <p className={styles.description}>Explore the face, jawline and neck—<br className="hidden sm:block" />one comparison at a time.</p>
        </header>
        <div className={styles.toolbar}>
          <p className={styles.collectionLabel}>Facial rejuvenation</p>
          <span className={styles.total}>{comparisons.length} comparisons</span>
        </div>

        <div className={styles.gallery} role="region" aria-roledescription="carousel" aria-label="Reference before and after comparisons">
          <div ref={trackRef} data-comparison-track className={`${styles.track} ${dragging ? styles.dragging : ""}`} onScroll={measure}
            onPointerDown={(event) => {
              draggedRef.current = false;
              if (event.pointerType === "mouse" && event.button === 0) dragRef.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
            }}
            onPointerMove={(event) => {
              const start = dragRef.current;
              if (!start) return;
              const difference = event.clientX - start.x;
              if (Math.abs(difference) > 8) {
                draggedRef.current = true;
                setDragging(true);
                event.currentTarget.setPointerCapture(event.pointerId);
                event.currentTarget.scrollLeft = start.scrollLeft - difference;
                event.preventDefault();
              }
            }}
            onPointerUp={() => { dragRef.current = null; setDragging(false); }}
            onPointerCancel={() => { dragRef.current = null; setDragging(false); }}
            onClickCapture={(event) => { if (draggedRef.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); } }}>
            {comparisons.map((comparison, index) => (
              <article key={comparison.id} className={styles.card} data-comparison-number={numbered(index)}>
                <div className={styles.cardTop}><span className={styles.number}>Comparison {numbered(index)}</span><span className={styles.view}>{comparison.view}</span></div>
                <button type="button" onClick={() => setExpanded(comparison)} className={styles.imageButton} aria-label={`Enlarge comparison ${index + 1}`}>
                  <Image src={comparison.image} alt={comparison.alt} fill draggable={false} quality={90} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 31vw, 440px" className={styles.image} />
                  <span className={styles.zoom}><Expand aria-hidden="true" /></span>
                </button>
                <div className={styles.labels}><span>Before</span><span>After</span></div>
                <div className={styles.cardFooter}><h3 className={styles.cardTitle}><button type="button" className={styles.titleButton} onClick={() => setExpanded(comparison)} aria-label={`View full comparison ${index + 1}: ${comparison.title}`}>{comparison.title}<ArrowRight aria-hidden="true" /></button></h3></div>
              </article>
            ))}
          </div>
          <button type="button" className={`${styles.navButton} ${styles.overlayButton} ${styles.previous}`} aria-label="Previous comparisons" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button>
          <button type="button" className={`${styles.navButton} ${styles.overlayButton} ${styles.next}`} aria-label="Next comparisons" onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button>
        </div>

        <div className={styles.navRow}>
          <p className={styles.status} data-comparison-window aria-live="polite" aria-atomic="true"><strong>{numbered(windowState.index)}</strong> — {String(Math.min(comparisons.length, windowState.index + windowState.visible)).padStart(2, "0")}<span className={styles.separator}>/</span>{comparisons.length}</p>
          <div className={styles.pager} role="group" aria-label="Comparison pages">{Array.from({ length: maxIndex + 1 }, (_, index) => <button key={index} type="button" className={styles.dotButton} aria-label={`Go to comparison ${index + 1}`} aria-current={windowState.index === index ? "true" : undefined} onClick={() => goTo(index)}><span className={styles.dot} /></button>)}</div>
          <span className={styles.hint}>Drag to explore</span>
          <span className={styles.progress} aria-hidden="true"><span style={{ width: `${(windowState.index + 1) / (maxIndex + 1) * 100}%` }} /></span>
          <div className={styles.mobileControls}><button type="button" className={styles.navButton} aria-label="Previous comparisons" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button><button type="button" className={styles.navButton} aria-label="Next comparisons" onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button></div>
        </div>

        <div id="case-collection-contact" className={styles.closing}>
          <div><h3 className={styles.closingTitle}>Every face starts with a different story.</h3><p className={styles.closingCopy}>A personal assessment helps you explore your next step.</p></div>
          <Link href="#private-assessment" className={styles.assessment}>Start My Private Assessment<span className={styles.assessmentIcon}><ArrowRight aria-hidden="true" /></span></Link>
        </div>
        <p className={styles.note}>Photography, expression and lighting may differ between images.<span className={styles.referenceNote}>Reference images provided for illustration. These are not Dr. Xiao's patients or treatment results.</span></p>
      </div>

      <dialog ref={dialogRef} aria-labelledby="case-collection-dialog-title" className={styles.dialog} onCancel={() => setExpanded(null)} onClose={() => setExpanded(null)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(null); }}>
        <div className={styles.dialogHeader}><div><p className={styles.dialogEyebrow}>Reference comparison · Original photograph</p><h3 id="case-collection-dialog-title" className={styles.dialogTitle}>{expanded?.title}</h3></div><button type="button" autoFocus className={styles.closeButton} aria-label="Close full comparison" onClick={() => setExpanded(null)}><X aria-hidden="true" /></button></div>
        {expanded ? <Image src={expanded.image} alt={expanded.alt} width={expanded.width} height={expanded.height} unoptimized className={styles.original} /> : null}
        <p className={styles.dialogNote}>Original reference photograph. These are not Dr. Xiao's patients or treatment results.</p>
      </dialog>
    </section>
  );
}
